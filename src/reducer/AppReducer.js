import { useReducer } from "react"
import React from 'react'

const initState = {
    jobTitle: "",
    companyName: "",
    salary: 0,
    joiningDataTime: "",
    description: ""
}

const useApp = () => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "input":
                return { ...state, ...action.payload }
            case "clear":
                return { ...initState }
            default: return <></>
        }
    }
    const [state, dispatch] = useReducer(reducer, initState);
    return [state, dispatch];
}

export default useApp;