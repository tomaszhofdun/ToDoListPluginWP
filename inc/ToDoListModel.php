<?php
class ToDoListModel
{

   function __construct()
   {
      global $wpdb;
      $this->wpdb = $wpdb;
      $this->charset = $wpdb->get_charset_collate();
      $this->tablename = $wpdb->prefix . "th_to_do_list";
      $this->userId = get_current_user_id();
   }

   function getList()
   {
      $query = "SELECT * FROM $this->tablename WHERE user_id = %d ORDER BY id DESC";
      $listOfTasks = $this->wpdb->get_results($this->wpdb->prepare($query, $this->userId));

      foreach ($listOfTasks as $key => $value) {
         $listOfTasks[$key]->title = html_entity_decode($listOfTasks[$key]->title);
      }

      return $listOfTasks;
   }

   function addTask($task)
   {
      $newTask = $this->wpdb->insert($this->tablename, array(
         "title" => $task['title'],
         "user_id" => $this->userId,
         "done" => "no"
      ));
      $insertedId = $this->wpdb->insert_id;
      $taskInfo = $this->getTask($insertedId);
      return $taskInfo;
   }

   function updateTask($task)
   {

      $this->wpdb->update(
         $this->tablename,
         array(
            "title" => $task['title'],
            "done" => $task['done']
         ),
         array("id" => $task['id'])
      );
      return $task;
   }

   function getTask($id)
   {
      $query = "SELECT * FROM $this->tablename WHERE user_id = %d AND id = %d";

      $task = $this->wpdb->get_results($this->wpdb->prepare($query, $this->userId, $id));;
      /****   Converting all entities from database to their corresponding characters   ****/
      $task[0]->title = html_entity_decode($task[0]->title);
      return $task;
   }

   function deleteTask($id)
   {
      $task = $this->wpdb->delete($this->tablename, array("id" => $id), array('%d'));

      return $task;
   }
}
