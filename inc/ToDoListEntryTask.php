<?php
class ToDoListEntryTask
{
   private $title = NULL;
   private $done = NULL;
   private $id = NULL;

   private $allFieldsTable = NULL;

   private $errors = NULL;

   private function setError($field, $error)
   {
      $this->errors = [$field => $error];
   }

   private function hasErrors()
   {
      return isset($this->errors);
   }

   function setFields($fields)
   {
      $this->allFieldsTable = $fields;
      foreach ($fields as $field => $key) {
         $this->{$field} = $key;
      }
   }

   function getFields()
   {
      return $this->allFieldsTable;
   }
   function getErrors()
   {
      return array(
         "errors" => $this->errors
      );
   }

   function validate()
   {
      /**** Title field validation  *****/

      if (empty($this->title)) {
         $this->setError('title', "This field cannot be empty");
      } else {
         if (strlen($this->title) > 255) {
            $this->setError('title', "This field cannot be longer that 255 characters");
         }
      }

      return !$this->hasErrors();
   }
}
