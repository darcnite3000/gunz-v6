<?php
include_once '../auth_die.php';
include_once 'data.php';
// error_reporting(E_ALL);
// $clr=true;

$conf['size'] = isset($conf['size'])?$conf['size']:array('width'=>null,'height'=>null);
$conf['size']['width'] = isset($conf['size']['width'])?$conf['size']['width']:'';
$conf['size']['height'] = isset($conf['size']['height'])?$conf['size']['height']:'';

$query ="SELECT DISTINCT tblBanners.TagLine, tblBanners.PaysiteID ";
$query.="FROM tblPaysites INNER JOIN tblBanners ON tblBanners.PaysiteID = tblPaysites.PaysiteID ";
$query.="WHERE tblPaysites.Flag_inAdmin = 1 ";
$query.="AND tblBanners.BannerTypeID = 5 ";

if($conf['size']['width']!='' && $conf['size']['height']!=''){
  $query.="AND (tblBanners.Width={$conf['size']['width']} AND tblBanners.Height={$conf['size']['height']}) ";
}else{
  $query.="AND ((tblBanners.Width = 160 AND tblBanners.Height = 600) OR (tblBanners.Width = 300 AND tblBanners.Height = 250)) ";
}
$query.="GROUP BY tblBanners.TagLine ";
$query.="ORDER BY tblBanners.TagLine DESC";
// var_dump($query);
$cachekey = md5($query);
$tagLineList = array();

$data = getCache($cache,$cachekey);
if(!$clr && $data !== false){
  $tagLineList  = json_decode($data,true);
}else{
  __DBopen();
  @mysql_select_db($database);
  $result=mysql_query($query);
  while ($row=mysql_fetch_assoc($result)) {
    if($row['TagLine']!=null){
      $tagLine = array(
        'id'=>urlencode($row['TagLine']),
        'value'=>$row['TagLine'],
        'display'=>$row['TagLine'],
        'tagLine'=>$row['TagLine'],
        'paysiteId'=> $row['PaysiteID']
      );

      $tagLineList[] = $tagLine;
    }
  }
  mysql_free_result($result);
  __DBclose();

  setCache($cache,json_encode($tagLineList), $cachekey);
}


header('Content-type: application/json');
echo json_encode(array(
  'tagLines'=>$tagLineList
));
exit;
