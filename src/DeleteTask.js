import axios from "axios"
import React, { useState } from "react"


function DeleteTask(props) {

   const { setErrorDelete, setTasks, task, tasks } = props

   const [isDeleting, setIsDeleting] = useState(false)

   const handleDelete = (id) => {
      console.log(id);
      setIsDeleting(true)
      async function handleDeleteAjax() {
         try {
            const response = await axios.delete(
               toDoData.root_url + "/wp-json/to-do-list/v1/task",
               {
                  data: {
                     id: id
                  },
                  headers: {
                     "X-WP-Nonce": toDoData.nonce
                  }
               }
            );
            setIsDeleting(false)

            if (response.data) {
               var newArray = tasks.filter((item) => {
                  return item.id != id
               })
               setTasks(newArray)
            }
            else {
               setErrorDelete("Failed to delete the task, please refresh the page and try again")
            }

         } catch (error) {
            setErrorDelete("Failed to delete the task, please refresh the page and try again")

         }
      }
      handleDeleteAjax();
   }

   return (
         <input onClick={() => handleDelete(task.id)} className="btn btn-danger" type="button" disabled={isDeleting} value="Delete"/>
   )
}

export default DeleteTask