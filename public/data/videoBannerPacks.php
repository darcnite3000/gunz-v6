<?php
include_once '../auth_die.php';
include_once 'data.php';
// error_reporting(E_ALL);
// $clr=true;

$conf['sites'] = isset($conf['sites']) ? $conf['sites'] : array();

$conf['size'] = isset($conf['size'])?$conf['size']:array('width'=>null,'height'=>null);
$conf['size']['width'] = isset($conf['size']['width'])?$conf['size']['width']:'';
$conf['size']['height'] = isset($conf['size']['height'])?$conf['size']['height']:'';

$query ="SELECT DISTINCT tblPacks.Desc, tblPacks.Title, tblPacks.PackID,tblPacks.PaysiteID, tblPaysites.DomainID, tblPaysites.PaysiteName, tblPacks.PackDate, tblPacks.MPA_FHG, tblPacks.MPA_VA ";
$query.="FROM tblPaysites INNER JOIN (tblPacks INNER JOIN tblBannerVideos ON tblBannerVideos.PackID = tblPacks.PackID) ON tblPaysites.PaysiteID = tblPacks.PaysiteID ";
$query.="WHERE (tblPacks.Flag_Pub = 1) AND (tblPaysites.Flag_inAdmin = 1) AND (tblPacks.Flag_HasFLV = 1) AND (tblPacks.Flag_isTG = 0) ";

$siteFilter = implode(' OR ', array_map(queryPackSiteWrap, $conf['sites']));
if($siteFilter!=''){
  $query.="AND ($siteFilter) ";
}
if($conf['size']['width']!='' && $conf['size']['height']!=''){
  $query.="AND (tblBannerVideos.Width={$conf['size']['width']} AND tblBannerVideos.Height={$conf['size']['height']}) ";
}else{
  $query.="AND ((tblBannerVideos.Width = 160 AND tblBannerVideos.Height = 600) OR (tblBannerVideos.Width = 300 AND tblBannerVideos.Height = 250)) ";
}
$query.="GROUP BY tblPacks.PackID ";
$query.="ORDER BY tblPacks.PackDate DESC";
// var_dump($query);
$cachekey = md5($query);
$galleryList = array();

$data = getCache($cache,$cachekey);
if(!$clr && $data !== false){
  $galleryList  = json_decode($data,true);
}else{
  __DBopen();
  @mysql_select_db($database);
  $result=mysql_query($query);
  while ($row=mysql_fetch_assoc($result)) {
    $gallery = array(
      'id'=>$row['PackID'],
      'title'=>$row['Title'],
      'description'=>$row['Desc'],
      'date'=>$row['PackDate'],
      'timestamp'=>strtotime($row['PackDate']),
      'imgUrl' => getPackImageUrl($row),
      'paysite'=> array(
        'id' => $row['PaysiteID'],
        'domain'=>$row['DomainID'],
        'name'=>$row['PaysiteName']
        )
    );

    $galleryList[] = $gallery;
  }
  mysql_free_result($result);
  __DBclose();

  setCache($cache,json_encode($galleryList), $cachekey);
}


header('Content-type: application/json');
echo json_encode(array(
  'packs'=>$galleryList
));
exit;

function queryPackSiteWrap($siteId){
  return "tblPacks.PaysiteID = $siteId";
}

function getPackImageUrl($pack){
  $imgurl = "";
  $local = false;
  if (file_exists($_SERVER[DOCUMENT_ROOT] . "/webmasters/promo/va/" . $pack['PackID'] . ".jpg")) {
    $local = true;
    $imgurl = "/webmasters/promo/va/" . $pack['PackID'] . ".jpg";
  } elseif(file_exists($_SERVER[DOCUMENT_ROOT] . "/webmasters/content/". $pack['PackID'] . ".jpg")) {
    $local = true;
    $imgurl = "/webmasters/content/". $pack['PackID'] . ".jpg";
  }else{
    if($pack['MPA_FHG']!=""){
      $ipath= "http://galleries." . $pack['DomainID'] . "/" . $pack['PackID'] . "/images/tn_01.jpg";
      $uexist=url_exists($ipath);
      if(!$uexist && $pack['MPA_VA']!=""){
        $ipath= "http://galleries." . $pack['DomainID'] . "/va/" . $pack['PackID'] . "/images/tn_01.jpg";
      }elseif(!$uexist){
        $ipath= "http://galleries." . $pack['DomainID'] . "/" . $pack['PackID'] . "/tn_01.jpg";
      }
    }elseif($pack['MPA_VA']!=""){
      $ipath= "http://galleries." . $pack['DomainID'] . "/" . $pack['PackID'] . "/images/tn_01.jpg";
    }  
    $imgurl= ($ipath);
  }
  return ($local)?$imgurl:"https://secure.gunzblazingpromo.com/secimages/?t={$pack['PackID']}&u=".urlencode($imgurl);
}