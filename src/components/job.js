import { useState } from "react"

import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';

const JobCard = (props) => {
    const { item, handleUpdate, confirmDelete } = props
    const [isOpen, setIsOpen] = useState(false)


    return (
        <>
            <div className='title info-lg info'>
                <span>{item.jobTitle}<BsThreeDotsVertical className="three-dots" onClick={(e) => { setIsOpen(!isOpen) }} /></span>
            </div>
            {(isOpen) && (<div className='dropdown-content'>
                <div className="">
                    <button className='dropdown-item btn' onClick={(e) => handleUpdate(item._id)}>
                        <AiOutlineEdit />Edit
                    </button>
                    <button className='dropdown-item btn' onClick={(e) => confirmDelete(item._id)}><MdDeleteOutline />Delete</button>
                </div>
            </div>)}

            <div className='info info-lg company-name'>
                <div className='logo'></div>
                <span>{item.companyName}</span>
            </div>
            <div className='info info-lg'>
                <span className="info info-sm-sal">Salary: {item.salary}</span>
                <span className="info info-sm-date">Joining Date: {item.joiningDataTime}</span>
            </div>
            <div className="info info-lg description">{item.description}</div>
        </>
    )
}

export default JobCard;