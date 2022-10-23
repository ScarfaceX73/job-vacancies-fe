import axios from 'axios';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';


export const Show = ({ jobData, handleUpdate, fetchData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = (_id) => {
        const selectedData = jobData.filter((e) => e._id === _id)[0];
        const index = jobData.indexOf(selectedData);
        if (index) {
            setIsOpen(!isOpen);
        }

    }

    const handleDelete = async (_id) => {
        try {
            await axios.put(`http://localhost:3002/update/${_id}`, { isDeleted: true })
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=''>
            {jobData.map((item) => {
                return (
                    <div key={item._id} className="">
                        <div className='dropdown'>
                            <span>{item.jobTitle}<BsThreeDotsVertical onClick={(e) => toggle(item._id)} /></span>
                        </div>
                        {(isOpen) && (<div className='dropdown-content'>
                            <button className='dropdown-item' onClick={(e) => handleUpdate(item._id)}>
                                <AiOutlineEdit />Edit
                            </button>
                            <button className='dropdown-item' onClick={(e) => handleDelete(item._id)}><MdDeleteOutline />Delete</button>
                        </div>)}

                        <div className=''>
                            <div className=''></div>
                            <span>{item.companyName}</span>
                        </div>
                        <div className=''>
                            <span>Salary: {item.salary}</span>
                            <span>Joining Date: {item.joiningDataTime}</span>
                        </div>
                        <h5>{item.description}</h5>

                    </div>
                )
            })}
        </div>
    )
}
