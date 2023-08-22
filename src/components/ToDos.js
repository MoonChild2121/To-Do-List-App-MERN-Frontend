import React, { useEffect, useState } from "react";
import axios from "axios";


function ToDos() {
    const [task, setTask] = useState([])
    const [editingTask, setEditingTask] = useState({ id: null, text: "" }); 

    useEffect(()=> {
        axios.get('http://localhost:3001')
        .then(result => setTask(result.data))
        .catch(err => console.log(err))
    },[])

    const handleEdit = (task) => {
      setEditingTask({ id: task._id, text: task.text });
    };
    
    const handleUpdate = (taskId, newText) => {
      axios.put('http://localhost:3001/updatetask/'+taskId, { text: newText })
        .then(result => {
          console.log(result);
          const updatedTasks = task.map(t => t._id === taskId ? { ...t, text: newText } : t);
          setTask(updatedTasks);
          setEditingTask({ id: null, text: "" }); // Clear editing mode
        })
        .catch(err => console.log(err));
    };
    

    const handleDelete = (id) => {
      axios.delete('http://localhost:3001/deletetask/'+id)
      .then(result => {console.log(result)
          window.location.reload()})
      .catch(err => console.log(err))
  }

        return(
        <div className="todolist">
            {task.map(task => (
        <div className='todos' key={task._id}>
          <div className="todo-text">
          {task._id === editingTask.id ? (
            <input
              type="text"
              value={editingTask.text}
              onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUpdate(task._id, editingTask.text);
                }
              }}
            />
          ) : (
            task.text
          )}
          </div>
          <div className="todo-buttons">
          {task._id === editingTask.id ? (
            <>
              <button className=" save" onClick={() => handleUpdate(task._id, editingTask.text)}>Save</button>
              <button className=" cancel" onClick={() => setEditingTask({ id: null, text: "" })}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn edit" onClick={() => handleEdit(task)}><i className="fas fa-edit"></i></button>
              <button className="btn delete" onClick={() => handleDelete(task._id)}><i className="fas fa-trash-alt"></i></button>
            </>
          )}
        </div>
        </div>
      ))}
    </div>
    )
}

export default ToDos;