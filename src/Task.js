import React, { useRef, useState } from 'react'
import axios from 'axios'

import DeleteTask from "./DeleteTask"
import Edit from "./EditTask"
import DoneTask from './DoneTask'

function Task(props) {

   const { tasks, setTasks, task } = props

   const [errorDelete, setErrorDelete] = useState("")
   const [errors, setErrors] = useState([])

   const inputRef = useRef()
   const spanRef = useRef()

   function handleChange(e, id) {

      const newTasksArray = tasks.filter(item => {
         if (item.id == id) {
            item.title = e.target.value
         }
         return item;
      })
      setTasks(newTasksArray)
   }

   function handleSave(e) {
      e.preventDefault()
      spanRef.current.focus()

      async function updateTaskAjax() {
         try {
            const response = await axios.put(
               toDoData.root_url + "/wp-json/to-do-list/v1/task",
               {
                  id: task.id,
                  title: task.title,
                  done: task.done
               },
               {
                  headers: {
                     "X-WP-Nonce": toDoData.nonce
                  }
               }
            );

            if (response.data.errors) {
               setErrors(response.data.errors)
            }

         } catch (error) {
            setErrors("Failed to update")
         }
      }
      updateTaskAjax();

   }

   return (
      <>
         {errorDelete.length==0 ? (<h5 style={{ top: "46px" }} className=' position-relative text-danger'>{errorDelete}</h5>) : ""}
         {errors.length==0 ? (<h5 style={{ top: "46px" }} className=' position-relative text-danger'>{errors}</h5>) : ""}
         <form onSubmit={handleSave} action="">
            <div id="task-form" className="input-group mt-5 mb-5">
               <input ref={spanRef} id="superuniqueid" />
               <input
                  ref={inputRef}
                  id="floatingInputInvalid"
                  onChange={(e) => handleChange(e, task.id)}
                  type="text"
                  className="form-control"
                  placeholder="Task name"
                  value={task.title}
                  disabled={!task.disabled}
                  readOnly={!task.disabled}
               />
               <DoneTask task={task} tasks={tasks} setTasks={setTasks} setErrors={setErrors}/>
               <Edit inputRef={inputRef} spanRef={spanRef} task={task} setTasks={setTasks} tasks={tasks} />
               <DeleteTask setErrorDelete={setErrorDelete} setTasks={setTasks} task={task} tasks={tasks} />
            </div>
         </form>
      </>
   )
}

export default Task