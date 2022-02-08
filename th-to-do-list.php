<?php
// Plugin Name: TH To Do List
// Author: Tomasz Hofdun 
// Version: 1.0

if (!defined('ABSPATH')) exit;

require_once plugin_dir_path(__FILE__) . 'inc/ToDoListRoute.php';


class ToDoList
{
   function __construct()
   {
      global $wpdb;
      $this->charset = $wpdb->get_charset_collate();
      $this->tablename = $wpdb->prefix . "th_to_do_list";

      add_action('activate_th-to-do-list/th-to-do-list.php', array($this, 'onActivate'));
      add_filter('template_include', array($this, 'loadTemplate'), 99);
      add_action('wp_enqueue_scripts', array($this, 'loadAssets'));
      add_action("admin_menu", array($this, "thToDoMenu"));
      add_action('admin_bar_menu', array($this, "admin_bar_item"), 500);
      add_action('admin_head', array($this, "adminAssets"), 500);
   }



   function onActivate()
   {
      /**** Insert page with the slug to-do-list ****/
      $my_post = array(
         'post_title' => 'To Do List',
         'post_content' => 'To Do List',
         'post_status' => 'publish',
         'post_type' => 'page'
      );

      wp_insert_post($my_post);

      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
      dbDelta("CREATE TABLE $this->tablename (
        id smallint(5) unsigned NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL DEFAULT '',
        user_id smallint(5) NOT NULL,
        done varchar(10) NOT NULL DEFAULT 'no',
        PRIMARY KEY  (id)
      ) $this->charset;");
   }

   function loadTemplate($template)
   {
      /**** On page to-do-list render To Do List template ****/
      if (is_page('to-do-list')) {
         return plugin_dir_path(__FILE__) . 'inc/ToDoListTemplate.php';
      }
      return $template;
   }

   function thToDoMenu()
   {
      add_menu_page("TH To Do List", "To Do List", "edit_posts", "to-do-list-options-menu", array($this, "toDoListPage"), "dashicons-editor-ul", 99);
   }
   function toDoListPage()
   {
?>
      <a href="/to-do-list"><button class="btn btn-primary">Check your list</button></a>
<?php
   }

   function admin_bar_item(WP_Admin_Bar $admin_bar)
   {

      $admin_bar->add_menu(array(
         'id'    => 'menu-id',
         'parent' => null,
         'group'  => null,
         'title' => 'TODO List',
         'href'  => site_url('/to-do-list'),
         'meta' => [
            'title' => 'TODO List'
         ]
      ));
   }

   function loadAssets()
   {
      if (is_page('to-do-list')) {

         wp_enqueue_script('to-do-list-script',  plugin_dir_url(__FILE__) . 'build/index.js', array('wp-element'), '1.0.0', true);
         wp_enqueue_style('to-do-list-style', "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css");
         wp_enqueue_style('to-do-list-fonts', "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
         wp_enqueue_style('to-do-list-our-style', plugin_dir_url(__FILE__) . 'build/style-index.css');

         wp_localize_script('to-do-list-script', 'toDoData', array(
            'root_url' => get_site_url(),
            'nonce' => wp_create_nonce('wp_rest')
         ));
      }
   }

   function adminAssets()
   {
      wp_enqueue_style('to-do-list-style-admin', plugin_dir_url(__FILE__) . 'build/index.css');
   }
}

$toDoList = new ToDoList();
