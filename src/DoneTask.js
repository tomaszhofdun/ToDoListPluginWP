import React from 'react'
import axios from 'axios';

function DoneTask(props) {

   const { task, setTasks, tasks } = props

   function handleClickDone() {
      var newTasksArray = tasks.filter(item => {
         if (item.id == task.id) {

            if (item.done == "yes") {
               item.done = "no"
            }
            else {
               item.done = "yes"
            }
         }
         return item;
      })

      setTasks(newTasksArray)

      handleDoneRequest()
   }

   function handleDoneRequest() {
      async function markAsDoneAjax() {
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
            else {
            }
         } catch (error) {
            setErrors("Failed to update")
         }
      }
      markAsDoneAjax();
   }

   return (
      <button onClick={handleClickDone} style={task.done == "no" ? {
         padding: "5px 14px",
         backgroundColor: "#14578b",
         borderColor: "#14578b"
      } : {
         padding: "5px 14px",
         backgroundColor: "#198754",
         borderColor: "#198754"
      }} className="btn btn-success " type="button">{task.done == "no" ? "Not completed" : "Completed"}</button>
   )
}

export default DoneTask