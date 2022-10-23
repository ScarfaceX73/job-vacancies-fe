import axios from 'axios';
import JobCard from './job';


export const Show = ({ jobData, handleUpdate, fetchData }) => {
    const confirmDelete = async (_id) => {
        try {
            await axios.put(`http://localhost:3002/update/${_id}`, { isDeleted: true })
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='grid-container text-center'>
            {jobData.map((item) => {
                return (
                    <div key={item._id} className="card-div grid-item">
                        <JobCard item={item} handleUpdate={handleUpdate} confirmDelete={confirmDelete} />
                    </div>
                )
            })}
        </div>
    )
}
