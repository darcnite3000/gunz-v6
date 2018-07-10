<?php
include_once '../auth_die.php';
include_once 'data.php';
// error_reporting(E_ALL);
// $clr=true;

$conf = $request['request'];

$conf['descSearch'] = isset($conf['descSearch']) ? $conf['descSearch'] : '';
$conf['type'] = isset($conf['type']) ? intval($conf['type'],10) : 0;
$conf['sites'] = isset($conf['sites']) ? $conf['sites'] : array();
$conf['packList'] = isset($conf['packList'])?$conf['packList']:array();
$conf['size'] = isset($conf['size'])?$conf['size']:array('width'=>'','height'=>'');
$conf['size']['width'] = isset($conf['size']['width'])?$conf['size']['width']:'';
$conf['size']['height'] = isset($conf['size']['height'])?$conf['size']['height']:'';
  
if($conf['type']!=6){
  $query="SELECT DISTINCT tblBanners.BannerID,tblBanners.TagLine, tblBanners.PaysiteID, tblPaysites.DomainID, tblPaysites.PaysiteName, tblBanners.CategoryID, tblCategories.Category, tblBanners.BannerTypeID, tblBannerTypes.BannerType, tblBanners.Width, tblBanners.Height, tblBanners.BannerContent, tblBanners.AddDate, tblBanners.FolderSuffix ";
  $query.="FROM tblBannerTypes INNER JOIN (tblPaysites INNER JOIN (tblCategories INNER JOIN tblBanners ON tblCategories.CategoryID = tblBanners.CategoryID) ON tblPaysites.PaysiteID = tblBanners.PaysiteID) ON tblBannerTypes.BannerTypeID = tblBanners.BannerTypeID ";
  $query.="WHERE (tblPaysites.Flag_inAdmin = 1)  ";//

  $siteFilter = implode(' OR ', array_map(queryBannerSiteWrap, $conf['sites']));
  if($siteFilter!=''){
    $query.="AND ($siteFilter) ";
  }

  if($conf['type']!=0){
    $query.="AND (tblBanners.BannerTypeID={$conf['type']}) ";
  }

  if($conf['size']['width']!='' && $conf['size']['height']!=''){
    $query.="AND (tblBanners.Width={$conf['size']['width']} AND tblBanners.Height={$conf['size']['height']}) ";
  }

  $query.="ORDER BY tblBanners.AddDate DESC ";
}else{
  $query="SELECT DISTINCT tblPacks.PackID AS BannerID, tblPacks.CategoryID, tblCategories.Category, tblPacks.PaysiteID, tblPaysites.DomainID, tblPaysites.PaysiteName, tblPaysites.DomainID, tblPacks.PackDate AS AddDate, tblPacks.Title as TagLine, tblPacks.Desc, tblPacks.Marketing, tblPacks.Notes, tblPacks.MPA_FHG, tblPacks.MPA_VA, tblPacks.VIST_ID, tblPacks.Flag_Pub, tblPacks.Flag_HasFLV,('Collage Image') AS BannerType,(6) AS BannerTypeID ";
  $query.="FROM tblPaysites INNER JOIN (tblCategories INNER JOIN (tblPacks) ON tblCategories.CategoryID = tblPacks.CategoryID) ON tblPaysites.PaysiteID = tblPacks.PaysiteID ";
  $query.="WHERE (((tblPacks.Flag_Pub)=1)) AND (tblPaysites.Flag_inAdmin = 1) ";

  $siteFilter = implode(' OR ', array_map(queryPackSiteWrap, $conf['sites']));
  if($siteFilter!=''){
    $query.="AND ($siteFilter) ";
  }

  if($conf['descSearch']!=''){
    $query.="AND (tblPacks.Title LIKE '%{$conf['descSearch']}%' OR tblPacks.Desc LIKE '%{$conf['descSearch']}%') ";
  }

  $query.= "AND ( (NOT(tblPacks.MPA_FHG)='') OR (NOT(tblPacks.MPA_VA)='') OR (NOT(tblPacks.VIST_ID)='')) ";
  $query.="ORDER BY tblPacks.PackDate DESC ";
}

$cachekey = md5($query);
$bannerList = array();

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
