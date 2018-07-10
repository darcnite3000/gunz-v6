<?php
global $username;
global $password;
global $dbhost;
global $database;

function __DBopen(){
	global $username;
	global $password;
  global $dbhost;

  return mysql_connect($dbhost,$username,$password);

}

function __DBclose(){
	return mysql_close();
}
