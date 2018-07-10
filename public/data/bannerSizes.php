<?php
include_once '../auth_die.php';
include_once 'data.php';
// error_reporting(E_ALL);
$clr = true;

$conf = $request['request'];

$conf['type'] = isset($conf['type']) ? intval($conf['type'],10) : 0;
$conf['sites'] = isset($conf['sites']) ? $conf['sites'] : array();
// var_dump($conf);
  
if($conf['type']!=4 && $conf['type']!=6){
  $query="SELECT DISTINCT tblBanners.Width, tblBanners.Height ";
  $query.="FROM tblBannerTypes INNER JOIN (tblPaysites INNER JOIN (tblCategories INNER JOIN tblBanners ON tblCategories.CategoryID = tblBanners.CategoryID) ON tblPaysites.PaysiteID = tblBanners.PaysiteID) ON tblBannerTypes.BannerTypeID = tblBanners.BannerTypeID ";
  $query.="WHERE (tblPaysites.Flag_inAdmin = 1) ";//

  $siteFilter = implode(' OR ', array_map(queryBannerSiteWrap, $conf['sites']));
  if($siteFilter!=''){
    $query.="AND ($siteFilter) ";
  }

  if($conf['type']!=0){
    $query.="AND (tblBanners.BannerTypeID={$conf['type']}) ";
  }

  $query.="GROUP BY tblBanners.Width, tblBanners.Height ";
  $query.="ORDER BY tblBanners.Width ASC ";
  // var_dump($query); 
  $cachekey = md5($query);
  $sizeList = array();

  $data = getCache($cache,$cachekey);
  if(!$clr && $data !== false){
    $sizeList  = json_decode($data,true);
  }else{
    __DBopen();
    @mysql_select_db($database);
    $result=mysql_query($query);
    while ($row=mysql_fetch_assoc($result)) {
      $size = array(
        'id' => "{$row['Width']}x{$row['Height']}",
        'display'=> "{$row['Width']} x {$row['Height']}",
        'width'=> intval($row['Width'],10), 
        'height'=> intval($row['Height'],10)
      );
      $sizeList[] = $size;
    }
    mysql_free_result($result);
    __DBclose();

    setCache($cache,json_encode($sizeList), $cachekey);
  }


  header('Content-type: application/json');
  echo json_encode(array(
    'sizes'=>$sizeList
  ));

  exit;

}else{
  header('Content-type: application/json');
  echo json_encode(array(
    'sizes'=>array()
  ));

  exit;
}



function queryBannerSiteWrap($siteId){
  return "tblBanners.PaysiteID = $siteId";
}

