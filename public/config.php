<?php
$request = parseRequest();

ini_set('session.save_path', '/www/virtual/sessions');
ini_set('session.gc_maxlifetime', 30*60);
ini_set('session.cookie_domain', '.gunzblazing.com');
session_start();
require_once "/www/virtual/gunzblazing.com/includes.php";
ini_set('display_errors', 1);
include_once CLASSES_PATH.'webmasters/login.class.php';
require_once $classes_path."webmaster.class.php";
include_once('/usr/www/virtual/virtual/convergentmedia/class/CmWebmasterArea.class.php');

require_once('Cache/Lite.php');
$daily_cacheConfig = array(
  'cacheDir' => $_SERVER['DOCUMENT_ROOT'].'/cache/',
  'caching' => true,
  'lifetime' => 86400,
  'fileLocking' => true,
  'writeControl' => true,
  'readControl' => true,
  'readControlType' => 'crc32',
  'memoryCaching' => false,
  'onlyMemoryCaching' => false,
  'memoryCachingLimit' => 1000,
  'fileNameProtection' => true,
  'automaticSerialization' => false,
  'automaticCleaningFactor' => 1,
  'hashedDirectoryLevel' => 2,
  'hashedDirectoryUmask' => 0700
);
$hourly_cacheConfig = array(
  'cacheDir' => $_SERVER['DOCUMENT_ROOT'].'/cache/',
  'caching' => true,
  'lifetime' => 3600,
  'fileLocking' => true,
  'writeControl' => true,
  'readControl' => true,
  'readControlType' => 'crc32',
  'memoryCaching' => false,
  'onlyMemoryCaching' => false,
  'memoryCachingLimit' => 1000,
  'fileNameProtection' => true,
  'automaticSerialization' => false,
  'automaticCleaningFactor' => 1,
  'hashedDirectoryLevel' => 2,
  'hashedDirectoryUmask' => 0700
);

global $cache;
global $cache_hourly;
$clr = false;
$cache = &new Cache_Lite($daily_cacheConfig);
$cache_hourly = &new Cache_Lite($hourly_cacheConfig);

function getCache($cache, $cacheID, $region = 'Gunz_V6'){
  if(isset($cache) && $data = $cache->get($cacheID,$region)){
    return $data;
  }
  return false;
}

function setCache($cache, $data, $cacheID, $region = 'Gunz_V6'){
  $cache->save($data,$cacheID,$region);
}


function parseRequest(){
  $method = $_SERVER['REQUEST_METHOD'];
  if ($method == 'POST' && array_key_exists('HTTP_X_HTTP_METHOD', $_SERVER)) {
    if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'DELETE') {
      $method = 'DELETE';
    }elseif ($_SERVER['HTTP_X_HTTP_METHOD'] == 'PUT') {
      $method = 'PUT';
    }else{
      throw new Exception("Unexpected Header");
    }
  }
  $request = array();
  $json = json_decode(file_get_contents('php://input'), true);
  $json = ($json && isset($json['data']))?$json['data']:array();
  switch ($method) {
    case 'DELETE':
    case 'POST':
      $request = cleanInputs(array_merge($_POST,$json));
      break;
    case 'GET':
      $request = cleanInputs(array_merge($_GET,$json));
      break;
    case 'PUT':
      $request = cleanInputs(array_merge($_GET,$json));
      break;
  }

  return array(
    'method'=>$method,
    'request'=>$request,
    'local_referer'=>(strpos($_SERVER['HTTP_REFERER'],'https://secure.gunzblazing.com/v6/')==0)
  );
}

function cleanInputs($data){
  $clean_input = Array();
  if (is_array($data)) {
    foreach ($data as $key => $value) {
      $clean_input[$key] = cleanInputs($value);
    }
  }else{
    $clean_input = trim(strip_tags($data));
  }
  return $clean_input;
}

function authCheck(&$webmaster, &$login){
  $authorized = $login->authenticate(0);
  $reason_deny = "";
  
  if($authorized && !$webmaster->id) {
    $authorized = 0;
  }
  if(!$webmaster->approved && $webmaster->id) {
    $authorized = 0;
    $reason_deny= "Your account is not yet approved";
  } elseif (!$authorized) {
    $reason_deny= "The username and/or password you entered is invalid or your account was disabled or rejected";
  }
  if($authorized && $remember) {
    $webmaster->remember("set");
  } else {
    $webmaster->remember("drop");
  }
  
  return array('reason'=>$reason_deny,'auth'=>$authorized);
}