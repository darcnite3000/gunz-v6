<?php
include_once '../auth_die.php';
include_once 'data.php';
// error_reporting(E_ALL);

$conf = $request['request'];

$conf['modelSearch'] = isset($conf['modelSearch']) ? $conf['modelSearch'] : '';
$conf['descSearch'] = isset($conf['descSearch']) ? $conf['descSearch'] : '';
$conf['sites'] = isset($conf['sites']) ? $conf['sites'] : array();
$conf['packList'] = isset($conf['packList'])?$conf['packList']:array();

if($conf['modelSearch']!='' && count($conf['packList']) == 0){
  $query="SELECT brgPackModel.PackID FROM brgPackModel WHERE brgPackModel.ModelID = '{$conf['modelSearch']}' ";
  
  $cachekey = md5($query);
  $packList = array();

  $data = getCache($cache,$cachekey);
  if(!$clr && $data !== false){
    $packList  = json_decode($data,true);
  }else{
    __DBopen();
    @mysql_select_db($database);
    $result=mysql_query($query);

    while($row = mysql_fetch_assoc($result)){
      $packList[]=$row['PackID'];
    }
    __DBclose();

    setCache($cache,json_encode($packList), $cachekey);
  }
  $conf['packList'] = $packList;
}

$query="SELECT DISTINCT tblPacks.PackID, tblPacks.CategoryID, tblCategories.Category, tblPacks.PaysiteID, tblPaysites.PaysiteName, tblPaysites.DomainID, tblPacks.PackDate, tblPacks.Title, tblPacks.Desc, tblPacks.Marketing, tblPacks.Notes, tblPacks.MPA_FHG, tblPacks.MPA_VA, tblPacks.MPA_PIC, tblPacks.VIST_ID, tblPacks.Flag_Pub, tblPacks.Flag_HasFLV, tblPacks.Flag_HasTube, tblPacks.Flag_MP4Only, tblPacks.Flag_isTG ";
$query.="FROM tblPaysites INNER JOIN (tblCategories INNER JOIN tblPacks ON tblCategories.CategoryID = tblPacks.CategoryID) ON tblPaysites.PaysiteID = tblPacks.PaysiteID ";
$query.="WHERE (((tblPacks.Flag_Pub)=1)) AND ( (NOT(tblPacks.MPA_FHG)='') OR (NOT(tblPacks.MPA_VA)='') OR (NOT(tblPacks.MPA_PIC)=''))  AND (tblPaysites.Flag_inAdmin = 1) ";//


$siteFilter = implode(' OR ', array_map(querySiteWrap, $conf['sites']));
if($siteFilter!=''){
  $query.="AND ($siteFilter) ";
}

if($conf['descSearch']!=''){
  $query.="AND (tblPacks.Title LIKE '%{$conf['descSearch']}%' OR tblPacks.Desc LIKE '%{$conf['descSearch']}%') ";
}

$packFilter = implode(' OR ', array_map(queryPackWrap, $conf['packList']));
if($packFilter!=''){
  $query.="AND ($packFilter) ";
}

$query.="AND ((tblPacks.Flag_isTG)=0) AND (NOT(tblPacks.MPA_VA)='') ";

$query.="ORDER BY tblPacks.PackDate DESC ";

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
      'extraImgs'=>getExtraImages($row),
      'models' => getPackModelNames($row),
      'isTG' => ($row['Flag_isTG'] == 1),
      'gals' => getGetGalIds($row),
      'zips' => getZips($row),
      'hasTube'=> ($row['Flag_HasTube']==1),
      'mp4Only'=> ($row['Flag_MP4Only']==1),
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
$zipList = array();
foreach ($galleryList as $gallery) {
  if(zipFilter($gallery)){
    $zipList[] = $gallery;
  }
}
$galleryList = $zipList;

$totalGalleries = count($galleryList);

header('Content-type: application/json');
echo json_encode(array(
  'totalCount'=>$totalGalleries,
  'galleries'=>$galleryList
));

exit;

function zipFilter($pack){
  return count($pack['zips']) > 0;
}

function queryPackWrap($packId){
  return "tblPacks.PackID = $packId";
}

function querySiteWrap($siteId){
  return "tblPacks.PaysiteID = $siteId";
}

function getGetGalIds($pack){
  if($pack['Flag_isTG'] == 1)
    return array(array(
      'type'=>'pic',
      'title'=>'Pic Gallery',
      'id'=>$pack['MPA_FHG']
    ));
  $ids = array();
  if($pack['MPA_FHG']!="")
    $ids[] = array(
      'type'=>'movie',
      'title'=>'Movie Gallery',
      'id'=>$pack['MPA_FHG']
    );

  if($pack['MPA_VA']!="")
    $ids[] = array(
      'type'=>'tube',
      'title'=>'Tube Gallery',
      'id'=>$pack['MPA_VA']
    );

  if($pack['MPA_PIC']!="")
    $ids[] = array(
      'type'=>'pic',
      'title'=>'Pic Gallery',
      'id'=>$pack['MPA_PIC']
    );
  return $ids;
}

function getExtraImages($pack){
  $extraImgs = array();

  if($pack['MPA_FHG']!=""){
    $extraImgs[] = "https://secure.gunzblazingpromo.com/secimages/?t=". $pack['PackID'] ."_t2&u=http://galleries." . $pack['DomainID'] . "/" . $pack['PackID'] . "/images/tn_02.jpg";
    $extraImgs[] = "https://secure.gunzblazingpromo.com/secimages/?t=". $pack['PackID'] ."_t3&u=http://galleries." . $pack['DomainID'] . "/" . $pack['PackID'] . "/images/tn_03.jpg";
  }

  return $extraImgs;
}

function getZips($pack){
  $zips = array();

  $contentZip = "/webmasters/content{$pack['ContentFolderSuffix']}/{$pack['PackID']}.zip";
  if(file_exists($_SERVER['DOCUMENT_ROOT'].$contentZip)){
    $zips[] = array(
      'title' => 'Content Zip',
      'type' => 'content',
      'zip' => $contentZip
      );
  }
  $imgZip = "/webmasters/content{$pack['ContentFolderSuffix']}/{$pack['PackID']}_img.zip";
  if(file_exists($_SERVER['DOCUMENT_ROOT'].$imgZip)){
    $zips[] = array(
      'title'=>'Image Zip',
      'type'=>'image',
      'zip'=>$imgZip
      );
  }

  return $zips;
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

function getPackModelNames($pack){
  $query="SELECT brgPackModel.PackID, tblModels.ModelName ";
  $query.="FROM tblModels INNER JOIN brgPackModel ON tblModels.ModelID = brgPackModel.ModelID ";
  $query.="WHERE (((brgPackModel.PackID)='{$pack['PackID']}')) ";
  $query.="ORDER BY tblModels.ModelName;";

  // __DBopen();
  // @mysql_select_db($database);
  $resultmodel=mysql_query($query);
  // __DBclose();
  $modelList=array();
  while($rowmodel = mysql_fetch_assoc($resultmodel)){
    $modelList[] = $rowmodel['ModelName'];
  }
  return $modelList;
}