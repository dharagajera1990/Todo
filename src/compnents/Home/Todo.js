import React, { useState } from 'react';
import './style.css';
import CreateTask from "./CreateTask";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft,faTrash } from '@fortawesome/free-solid-svg-icons';
    
   
   function Todo() {
        const [tasks, setTasks] = useState([
            {
                title: "First Item",
                completed: true,
                checkname:false
            },
            {
                title: "Second Item",
                completed: true,
                checkname:false
            },
            {
                title: "Third Item",
                completed: false,
                checkname:false
            }
        ]);
    
        const addTask = title => {
            const newTasks = [...tasks, { title, completed: false,checkname:false }];
            setTasks(newTasks);
        };

        const completeTask = index => {
            const newTasks = [...tasks];
            newTasks[index].completed = true;
            setTasks(newTasks);
        };
    
        const removeTask = index => {
            const newTasks = [...tasks];
            newTasks.splice(index, 1);
            setTasks(newTasks);
        };

        const updateFieldChanged = index => e => {
          let newArr = [...tasks]; 
          newArr[index] = e.target.value;
          setTasks(newArr);
        }

        const handleOnChange = (e,index) => { 
            if (e.target.type === 'checkbox' && e.target.checked) {
                let newArr = [...tasks]; 
                  newArr[index]['checkname'] = e.target.checked; 
                  setTasks(newArr);
            }
        };
        
        const deleteAllSelected = () => { 
            setTasks(prevProducts => {
                return prevProducts.filter(p => ! p.checkname);
            });
        }

        return (
            <div className="todo-container">
                <div className="header">ToDo List</div>
                <div className="create-task" >
                    <CreateTask addTask={addTask} />
                </div>
                <div className="tasks"> 
                    {tasks.map((task, index) => (
                        
                        <div key={index}
                            className="task"
                            style={{ textDecoration: task.completed ? "line-through" : "" }}
                        >
                            <input className="selectionBox" type="checkbox" id={`custom-checkbox-${index}`} name={task.checkname} value={task.checkname} onChange={(e) => handleOnChange(e,index)}/>
                            <input type="text" name="title" value={task.title} onChange={updateFieldChanged(index)}  />
                            <FontAwesomeIcon className="iconRemove" icon={faTrash} color="red" onClick={() => removeTask(index)} />
                        </div>
                    ))}
                    
                    <button onClick={() => deleteAllSelected()}>Delete Selected</button>
                </div>
                
            </div>
        );
    }
export default Todo;