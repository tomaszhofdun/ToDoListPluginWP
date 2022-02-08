<?php
function __log($arg)
{
   file_put_contents(__DIR__ . DIRECTORY_SEPARATOR . 'log.txt', "\n******************************\n" . print_r($arg, true), FILE_APPEND);
}
