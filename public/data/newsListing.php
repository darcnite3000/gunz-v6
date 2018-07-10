<?php
include '../auth.php';

include("/usr/www/virtual/virtual/convergentmedia/include/CmInclude.inc.php");
include("/usr/www/virtual/virtual/convergentmedia/include/CmDb.inc.php");
$traffic = (isset($_GET['niche']))?intval($_GET['niche']):3;
$posts = array();

$sql="SELECT * FROM cm_news WHERE cm_news.deleted <> 1 AND cm_news.category = $traffic ORDER BY id DESC LIMIT 10";
//echo $sql;exit;
$query=mysql_query($sql) or die(mysql_error());
while ($r=mysql_fetch_array($query)) {
  extract($r);
  if($authorized && $mailer != ''){
    $link = "http://www.gunzblazingpromo.com/mailout/onlineview.php?w=".$webmaster->id."&d=".$mailer;
  }else{
    $link = null;
  }
  $post = array(
    'content'=>($content),
    'title'=>$title,
    'link'=>$link
  );
  $posts[] = $post;
}
header('Content-type: application/json');
echo json_encode(array('posts'=>$posts));
?>