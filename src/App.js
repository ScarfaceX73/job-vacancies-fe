import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { fetchJob, createJob } from './service';
import { Show } from './components/show';
import { useAppContext } from "../src/context/AppContext"

function App() {
  const [addbtn, setAddBtn] = useState(false);
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
        setAddBtn(false);
        fetchData()
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await createJob(state);
        clear();
        setAddBtn(false);
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
    setAddBtn(true);
    setJobId(_id);
  };

  const handleClick = () => {
    setAddBtn(current => !current);
    clear();
  }




  if (addbtn === true) {
    return (
      <div>
        <div>
          <div>
            <div>
              <div>
                <hr />
                <button onClick={handleClick}>back</button>
                <hr />
              </div>
              <div style={{ width: "50%" }}>
                <div className="">
                  <div className="">
                    <input type="text" className="" id="floatingInputGroup1" placeholder="Job title" value={jobTitle} onChange={(e) => {
                      handleInputChange({ jobTitle: e?.target?.value })
                    }} />
                    <label for="floatingInputGroup1">Job Title</label>
                  </div>
                </div>
                <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => {
                  handleInputChange({ companyName: e?.target?.value })
                }} />
                <input type="text" placeholder="Salary" value={salary} onChange={(e) => {
                  handleInputChange({ salary: e?.target?.value })
                }} />
                <input type="text" placeholder="date & time" value={joiningDataTime} onChange={(e) => {
                  handleInputChange({ joiningDataTime: e?.target?.value })
                }} />
                <input type="textarea" placeholder="Description" value={description} onChange={(e) => {
                  handleInputChange({ description: e?.target?.value })
                }} />
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="">
        <div>
          <hr />
          <button onClick={handleClick}>add</button>
          <hr />
        </div>
        <div className=''>
          <div className=''>
            <Show jobData={jobData} handleUpdate={handleUpdate} fetchData={fetchData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
