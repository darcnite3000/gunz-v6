<?php
include_once 'config.php';
if(!$request['local_referer']){
  header('HTTP/1.0 403 Forbidden');
  header('Content-type: application/json');
  echo json_encode(array('error'=>array('message'=>'Only Local Requests are allowed')));
  exit;
}
// error_reporting(E_ALL);

global $conn, $dbh;
if($_SESSION['cmid']){
  $webmaster = new Webmaster($_SESSION['cmid']);
  $site_globals['wm_username'] = $webmaster->username;
  $site_globals['wm_password'] = $webmaster->password;
  $login = new Login($dbh, $site_globals, $conn);
  $check = authCheck($webmaster, $login);
  $authorized = $check['auth'];
}elseif($_COOKIE['wm_id']){
  $webmaster = new Webmaster($_COOKIE['wm_id']);
  $site_globals['wm_username'] = $webmaster->username;
  $site_globals['wm_password'] = $webmaster->password;
  $login = new Login($dbh, $site_globals, $conn);
  $check = authCheck($webmaster, $login);
  $authorized = $check['auth'];
}else{
  $authorized = 0;
}

if($authorized){
  $wm = new CmWebmasterArea();
  $_SESSION['cmid'] = $webmaster->id;
  $traffic = $wm->getTraffic($_SESSION['cmid']);
}


function getLogData(){
  $wmid = $_COOKIE[wm_id];
  $req = $_SERVER['REQUEST_URI'];
  $post_str = urlencode(print_r($_POST,true));
  $get_str = urlencode(print_r($_GET,true));
  return array('wmid'=>$wmid,'request'=>$req,'post_string'=>$post_str,'post_array'=>$_POST,'get_string'=>$get_str,'get_array'=>$_GET);
}


function logToFile($filename, $msg){ 
  // open file
  $fd = fopen($filename, "a");  
  // append date/time to message
  $str = "[" . date("Y/m/d h:i:s", mktime()) . "]" . $msg;  
  // write string
  fwrite($fd, $str . "\n"); 
  // close file
  fclose($fd);
}
function isURL($url){
  $pattern='|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i';
  if(preg_match($pattern, $url) > 0) return true;
  else return false;
}
function url_exists($url) {
   $a_url = parse_url($url);
   if (!isset($a_url['port'])) $a_url['port'] = 80;
   $errno = 0;
   $errstr = '';
   $timeout = 30;
   if(isset($a_url['host']) && $a_url['host']!=gethostbyname($a_url['host'])){
       $fid = fsockopen($a_url['host'], $a_url['port'], $errno, $errstr, $timeout);
       if (!$fid) return false;
       $page = isset($a_url['path'])  ?$a_url['path']:'';
       $page .= isset($a_url['query'])?'?'.$a_url['query']:'';
       fputs($fid, 'HEAD '.$page.' HTTP/1.0'."\r\n".'Host: '.$a_url['host']."\r\n\r\n");
       $head = fread($fid, 4096);
       fclose($fid);
       if (preg_match('#^HTTP/.*\s+[(200|301|302)]+\s#i', $head)) {
         return true;
       } else {
         return false;
       }
   } else {
       return false;
   }
}

function submitLog($toolId, $siteIds, $unique)
{
  global $webmaster;
  global $vslinput;

  $toolId = intval($toolId);

  if (is_array($siteIds)) {
    foreach ($siteIds as $k => $v) {
      $v = intval($v);
      if ($v == 0) {
        unset($siteIds[$k]);
      }
    }
  }

  if (count($siteIds) > 0 && $toolId > 0 && $unique != '') {
    if (is_array($unique)) {
      $unique = serialize($unique);
    }
    $userId = mysql_real_escape_string($webmaster->id);
    $userName = mysql_real_escape_string($webmaster->username);
    $userEmail = mysql_real_escape_string($webmaster->email);

    $fields = base64_encode(serialize($vslinput));

    $fingerprint = md5($unique . date('dmY') . $userId . $toolId);

    $query = "
      INSERT IGNORE INTO
        `tblSubmitLogging`
      SET
        `tool_id` = '{$toolId}',
        `user_id` = '{$userId}',
        `user_name` = '{$userName}',
        `user_mail` = '{$userEmail}',
        `fields` = '{$fields}',
        `date` = NOW(),
        `fingerprint` = '{$fingerprint}'
    ";
    
    mysql_query($query);

    $id = mysql_insert_id();

    if ($id > 0) {
      foreach ($siteIds as $v) {
        $v = intval($v);
        $query = "
          INSERT INTO
            `tblSubmitLoggingSites`
          SET
            `site_id` = '{$v}',
            `log_id` = '{$id}'
        ";
        mysql_query($query);
      }
    }
  }
}
