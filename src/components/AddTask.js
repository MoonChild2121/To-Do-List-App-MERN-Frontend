import React, { useState } from "react";
import axios from "axios";
import ToDos from "./ToDos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddTask() {

    const [text, setText] = useState()

    const Submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/addtask', {text})
        .then(result => {
            console.log(result)
            window.location.reload()
            
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="addtask" >
            <div className="inputbar">
                <input class="inputthing" type="text"  placeholder="Enter task"
                onChange={(e)=> setText(e.target.value)}/>
            <button type="submit" className="add" onClick={Submit}><FontAwesomeIcon icon={faPlus}  />
</button>
            </div>
            <ToDos/>
    </div>
    )
}

export default AddTask;