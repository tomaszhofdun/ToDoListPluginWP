import axios from "axios"
import React, { useState } from 'react'
import { useImmer } from "use-immer";


function AddTask(props) {

   const [task, setTask] = useImmer({
      title: "",
      done: "no"
   })

   const [errors, setErrors] = useState([])


   const { setTasks } = props;

   const addTask = (e) => {
      e.preventDefault()
      setErrors([])
      async function addTaskAjax() {
         try {
            const response = await axios.post(
               toDoData.root_url + "/wp-json/to-do-list/v1/task",
               {
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
               setTasks(prevState => {
                  return [response.data[0], ...prevState]
               })
               setTask(draft => { draft.title = "" })

            }

            console.log(response);

         } catch (error) {
            //obsłużyc błąd
            console.log(error);

         }
      }
      addTaskAjax();
   }

   function handleChange(name) {

      setTask(draft => {
         draft.title = name;
      });
      setErrors([])

   }

   return (
      <form onSubmit={addTask} style={{ display: 'flex', alignItems: 'center' }} class="form-floating">
         <input onChange={e => {
            handleChange(e.target.value);
         }} style={{ height: "58px" }} type="text" class={"form-control " + (errors.title ? "is-invalid" : "")} id="floatingInputInvalid" placeholder="Type the name of your task" value={task.title} />
         <label for="floatingInputInvalid">{errors.title}</label>
         <input style={{ background: "#198754" }} className="btn btn-success" type="submit" value="Add Task " />

      </form>
   )
}

export default AddTask