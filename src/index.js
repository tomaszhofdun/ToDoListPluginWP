import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactDom from "react-dom"

import "./styles/style.scss"
import "./styles/style-admin.scss"

import AddTask from "./AddTask"
import Task from "./Task"


function ToDoApp() {

   const [tasks, setTasks] = useState([])
   const [countTasks, setCountTasks] = useState(undefined)
   const [countFinishedTasks, setCountFinishedTasks] = useState(undefined)
   const [countUnfinishedTasks, setCountUnfinishedTasks] = useState(undefined)

   useEffect(() => {
      async function getTasksAjax() {
         try {
            const response = await axios.get(
               toDoData.root_url + "/wp-json/to-do-list/v1/tasks", {
               headers: {
                  "X-WP-Nonce": toDoData.nonce
               }
            }
            );
            setTasks(response.data)
         } catch (error) {
            console.log(error);

         }
      }
      getTasksAjax();

   }, []);

   useEffect(() => {
      setCountTasks(tasks.length)
      updateCountFinishedTasks()
      updateCountUnfinishedTasks()

   }, [tasks])

   function updateCountFinishedTasks() {
      var finishedTasks = tasks.filter((task) => {
         return task.done == "yes"
      })
      setCountFinishedTasks(finishedTasks.length)
   }

   function updateCountUnfinishedTasks() {
      var finishedTasks = tasks.filter((task) => {
         return task.done == "no"
      })
      setCountUnfinishedTasks(finishedTasks.length)
   }

   return (
      <div class="container">
         <h5>All tasks: {countTasks}</h5>
         <h5>Need to be finished: {countUnfinishedTasks}</h5>
         <h5 className="mb-4">Tasks completed: {countFinishedTasks}</h5>
         <AddTask setTasks={setTasks} />
         {tasks.map((task) => {
            return (
               <Task setTasks={setTasks} tasks={tasks} task={task} />
            )
         })}
         {tasks.length == 0 ? (<div class="alert alert-primary mt-3" role="alert">
            You don't have any tasks at this moment. Create one if you want
         </div>) : ""}
      </div>

   )
}

ReactDom.render(<ToDoApp />, document.getElementById("ToDoListApp"));

