<?php
if (!is_user_logged_in()) {
   wp_redirect(site_url('/'));
   exit;
}
get_header();
?>

<div id="ToDoListApp"></div>

<?php get_footer(); ?>