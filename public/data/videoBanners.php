<?php
include_once '../auth_die.php';
include_once 'data.php';
// error_reporting(E_ALL);
// $clr=true;

$conf = $request['request'];

$conf['descSearch'] = isset($conf['descSearch']) ? $conf['descSearch'] : '';
$conf['type'] = isset($conf['type']) ? intval($conf['type'],10) : 0;
$conf['sites'] = isset($conf['sites']) ? $conf['sites'] : array();
$conf['tagLine'] = isset($conf['tagLine']) ? $conf['tagLine'] : '';

$conf['pack'] = isset($conf['pack'])?$conf['pack']:array('id'=>null,'paysite'=>null);
$conf['pack']['id'] = isset($conf['pack']['id'])?$conf['pack']['id']:'';
$conf['pack']['paysite'] = isset($conf['pack']['paysite'])?$conf['pack']['paysite']:array('id'=>'');


$conf['size'] = isset($conf['size'])?$conf['size']:array('width'=>'','height'=>'');
$conf['size']['width'] = isset($conf['size']['width'])?$conf['size']['width']:'';
$conf['size']['height'] = isset($conf['size']['height'])?$conf['size']['height']:'';

$query="SELECT DISTINCT tblBanners.BannerID,tblBanners.TagLine, tblBanners.PaysiteID, tblPaysites.DomainID, tblPaysites.PaysiteName, tblBanners.CategoryID, tblCategories.Category, tblBanners.BannerTypeID, tblBannerTypes.BannerType, tblBanners.Width, tblBanners.Height, tblBanners.BannerContent, tblBanners.AddDate, tblBanners.FolderSuffix ";
$query.="FROM tblBannerTypes INNER JOIN (tblPaysites INNER JOIN (tblCategories INNER JOIN tblBanners ON tblCategories.CategoryID = tblBanners.CategoryID) ON tblPaysites.PaysiteID = tblBanners.PaysiteID) ON tblBannerTypes.BannerTypeID = tblBanners.BannerTypeID ";
$query.="WHERE (tblPaysites.Flag_inAdmin = 1)  ";//
$query.="AND (tblBanners.BannerTypeID=5) ";
if($conf['pack']['paysite']['id']!=''){
  $query.="AND (".queryBannerSiteWrap($conf['pack']['paysite']['id']).") ";
}else{
  $siteFilter = implode(' OR ', array_map(queryBannerSiteWrap, $conf['sites']));
  if($siteFilter!=''){
    $query.="AND ($siteFilter) ";
  }
}
if($conf['tagLine']!=''){
  $query.="AND (tblBanners.TagLine=\"{$conf['tagLine']}\") ";
}

if($conf['size']['width']!='' && $conf['size']['height']!=''){
  $query.="AND (tblBanners.Width={$conf['size']['width']} AND tblBanners.Height={$conf['size']['height']}) ";
}else{
  $query.="AND ((tblBanners.Width = 160 AND tblBanners.Height = 600) OR (tblBanners.Width = 300 AND tblBanners.Height = 250)) ";
}

$query.="ORDER BY tblBanners.AddDate DESC ";


$cachekey = md5($query);
$bannerList = array();
// var_dump($query);
$data = getCache($cache,$cachekey);
if(!$clr && $data !== false){
  $bannerList  = json_decode($data,true);
}else{
  __DBopen();
  @mysql_select_db($database);
  $result=mysql_query($query);
  while ($row=mysql_fetch_assoc($result)) {
    $bannerURLs = getBannerURLs($row);
    if(count($bannerURLs) > 0){
      $banner = array(
        'id' => $row['BannerID'],
        'tagline'=>$row['TagLine'],
        'type' => array('id'=>$row['BannerTypeID'],'display'=>$row['BannerType']),
        'date'=>$row['AddDate'],
        'timestamp'=>strtotime($row['AddDate']),
        'urls' => $bannerURLs,
        'filesize' => getBannerFilesize($row, $bannerURL),
        'size'=> array('width'=>$row['Width'],'height'=>$row['Height']),
        'content' => $row['BannerContent'],
        'paysite'=> array(
          'id' => $row['PaysiteID'],
          'domain'=>$row['DomainID'],
          'name'=>$row['PaysiteName']
          )
      );

      $bannerList[] = $banner;
    }
  }
  mysql_free_result($result);
  __DBclose();

  setCache($cache,json_encode($bannerList), $cachekey);
}

$totalBanners = count($bannerList);



header('Content-type: application/json');
echo json_encode(array(
  'totalCount'=>$totalBanners,
  'banners'=>$bannerList
));

exit;

function queryBannerSiteWrap($siteId){
  return "tblBanners.PaysiteID = $siteId";
}
function queryPackSiteWrap($siteId){
  return "tblPacks.PaysiteID = $siteId";
}

function getBannerFilesize($banner, $bannerURLs){
  switch($banner['BannerType']){
    case 'Image':
    case 'Flash':
    case 'Flash Video':
    case 'FPA':
      return filesize($_SERVER[DOCUMENT_ROOT].$bannerURLs['local'])/1024;
    default:
      return null;
  }
}

function getBannerURLs($banner){
  switch($banner['BannerType']){
    case 'Image':
    case 'Flash':
    case 'Flash Video':
      $url = "/webmasters/promo/banners".$banner['FolderSuffix']."/" . $banner['BannerID'];
      if(file_exists($_SERVER[DOCUMENT_ROOT].$url)){
        return array(
          'local'=>$url,
          'remote'=>'https://secure.gunzblazing.com'.$url
        );
      }
      break;
    case 'FPA':
      $url = "/webmasters/promo/fpa/" . $banner['BannerID'] . ".zip";
      if(file_exists($_SERVER[DOCUMENT_ROOT].$url)){
        return array(
          'local'=>$url,
          'preview'=>"/webmasters/promo/fpa/" . $banner['BannerID'] . ".jpg",
          'remote'=>'https://secure.gunzblazing.com'.$url
        );
      }
      break;
    case "Collage Image":
      return array(
        'local'=>"https://secure.gunzblazingpromo.com/rss_image/images/{$banner['BannerID']}.jpg",
        'remote'=>"https://secure.gunzblazingpromo.com/rss_image/images/{$banner['BannerID']}.jpg"
      );
  }
  return array();
}
