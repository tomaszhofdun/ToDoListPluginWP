<?php

require_once plugin_dir_path(__FILE__) . 'ToDoListModel.php';
require_once plugin_dir_path(__FILE__) . 'ToDoListEntryTask.php';

add_action('rest_api_init', 'toDoRegisterRoutes');

function toDoRegisterRoutes()
{
   /**** Get all tasks for the specified user *****/
   register_rest_route('to-do-list/v1', 'tasks', array(
      'methods' => WP_REST_SERVER::READABLE,
      'callback' => 'getResults',
      'permission_callback' => function () {
         return current_user_can('edit_posts');
      }
   ));

   /**** Add new task *****/
   register_rest_route('to-do-list/v1', 'task', array(
      'methods' => "POST",
      'callback' => 'addTask',
      'permission_callback' => function () {
         return current_user_can('edit_posts');
      }
   ));

   /**** Update task *****/
   register_rest_route('to-do-list/v1', 'task', array(
      'methods' => "PUT",
      'callback' => 'updateTask',
      'permission_callback' => function () {
         return current_user_can('edit_posts');
      }
   ));

   /**** Delete task *****/
   register_rest_route('to-do-list/v1', 'task', array(
      'methods' => WP_REST_Server::DELETABLE,
      'callback' => 'deleteTask',
      'permission_callback' => function () {
         return current_user_can('delete_posts');
      }
   ));
}



/**** CRUD FUNCTIONS ****/

function getResults()
{
   $listModel = new ToDoListModel();
   return $listModel->getList();
}

function addTask($task)
{
   $arrayFields = array(
      'title' => esc_html($task['title']),
      'done' => esc_html($task['done'])
   );
   $fields = new ToDoListEntryTask();
   $fields->setFields($arrayFields);

   if ($fields->validate()) {
      $listModel = new ToDoListModel();
      return $listModel->addTask($fields->getFields());
   } else {
      return $fields->getErrors();
   }
}

function updateTask($task)
{
   $arrayFields = array(
      'id' => esc_html($task['id']),
      'title' => esc_html($task['title']),
      'done' => $task['done']
   );
   $fields = new ToDoListEntryTask();
   $fields->setFields($arrayFields);

   if ($fields->validate()) {
      $listModel = new ToDoListModel();
      return $listModel->updateTask($fields->getFields());
   } else {
      return $fields->getErrors();
   }
}

function deleteTask($data)
{
   $taskId = $data['id'];
   $listModel = new ToDoListModel();
   return $listModel->deleteTask($taskId);
}
