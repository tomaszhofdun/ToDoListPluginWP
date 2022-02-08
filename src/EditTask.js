import React, { useState } from 'react'

function Edit(props) {

   const [isSave, setIsSave] = useState(false)

   const { task, setTasks, tasks, handleSave, inputRef } = props

   function handleClick(e) {
      setIsSave(!isSave)

      const newTasksArray = tasks.filter(item => {
         if (item.id == task.id) {
            item.disabled = !item.disabled
         }
         return item;
      })
      setTasks(newTasksArray)

      if (!isSave) {
         e.preventDefault()
         setTimeout(() => {
            inputRef.current.focus()
         }, 100)
      }
      else {
         handleSave
      }
   }

   return (
      <input style={{
         padding: "5px 14px",
         backgroundColor: "#0d6efd",
         borderColor: "#0d6efd"
      }} onClick={handleClick} className="btn btn-primary" type="submit" value={isSave ? "Save" : "Edit"} />
   )
}



export default Edit