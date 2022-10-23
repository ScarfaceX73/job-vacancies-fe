import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { fetchJob, createJob } from './service';
import { Show } from './components/show';
import { useAppContext } from "../src/context/AppContext"
import { BiArrowBack } from "react-icons/bi"

function App() {
  const [toggle, setToggle] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [jobId, setJobId] = useState("");

  const [state, dispatch] = useAppContext()
  const { jobTitle, companyName, salary, joiningDataTime, description } = state
  const handleInputChange = (obj) => {
    dispatch({ type: "input", payload: obj });
  }

  const clear = () => {
    dispatch({ type: "clear" });
  }

  const fetchData = async () => {
    try {
      const jobDetails = await fetchJob();
      const tempData = [...(jobDetails ?? [])];
      setJobData(tempData);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async () => {
    if (jobId) {
      try {
        await axios.put(`http://localhost:3002/update/${jobId}`, { ...state });
        clear();
        setJobId('');
        setToggle(false);
        fetchData()
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await createJob(state);
        clear();
        setToggle(false);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleUpdate = (_id) => {
    const selectedData = jobData.filter((e) => e._id === _id)[0];
    handleInputChange({
      jobTitle: selectedData.jobTitle,
      companyName: selectedData.companyName,
      salary: selectedData.salary,
      joiningDataTime: selectedData.joiningDataTime,
      description: selectedData.description,
    });
    setToggle(true);
    setJobId(_id);
  };

  const handleClick = () => {
    setToggle(current => !current);
    clear();
  }




  if (toggle === true) {
    return (
      <div className='container-main'>
        <div>
          <div className='hr-div'>
            <hr />
            <button className='back-btn' onClick={handleClick}><BiArrowBack /></button>
          </div>
          <div className='container-form'>
            <h3>Add Job</h3>

            <div className="job-title-in">
              <label>Job Title</label>
              <input type="text" className="" id="floatingInputGroup1" value={jobTitle} onChange={(e) => {
                handleInputChange({ jobTitle: e?.target?.value })
              }} />
            </div>
            <div className="company-name-in">
              <label>Company Name</label>
              <input type="text" value={companyName} onChange={(e) => {
                handleInputChange({ companyName: e?.target?.value })
              }} />
            </div>
            <div className='input-sm'>
              <div className='salary-in'>
                <label>Salary</label>
                <input type="text" value={salary} onChange={(e) => {
                  handleInputChange({ salary: e?.target?.value })
                }} />
              </div>
              <div className='date-in'>
                <label>Date & Time</label>
                <input type="text" value={joiningDataTime} onChange={(e) => {
                  handleInputChange({ joiningDataTime: e?.target?.value })
                }} />
              </div>
            </div>
            <div className='description-in'>
              <label>Description</label>
              <input type="textarea" value={description} onChange={(e) => {
                handleInputChange({ description: e?.target?.value })
              }} />
            </div>
            <button className='submit-btn -btn' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container-main">
        <div className='container'>
          <hr />
          <div className="justify-content-end d-flex" >
            <button className='btn add-btn' onClick={handleClick}>Add Job</button>
          </div>
          <div className='card-container'>
            <div className='show-div'>
              <Show jobData={jobData} handleUpdate={handleUpdate} fetchData={fetchData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
