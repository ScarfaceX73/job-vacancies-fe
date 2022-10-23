import axios from "axios";

const fetchJob = async () => {
    const job = await axios({
        url: "http://localhost:3002/get",
        method: "GET",
    });
    return job?.data ?? [];
};

const createJob = async (payload) => {
    const job = await axios({
        url: "http://localhost:3002/add",
        method: "POST",
        data: payload,
    });
    return job;
};

// As it is not recommended to use the delete function, I wont't be using delete functions
const deleteJob = async (_id) => {
    const job = await axios({
        url: `http://localhost:3002/delete/${_id}`,
        method: "DELETE",
    });
    return job;
};

export { fetchJob, createJob, deleteJob };