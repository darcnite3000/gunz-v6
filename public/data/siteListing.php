<?php
include_once '../auth.php';
include_once 'data.php';
// $clr=true;

$query="SELECT tblPaysites.* ";
$query.="FROM tblPaysites ";
$query.="WHERE (tblPaysites.PaysiteID <> 0) AND (tblPaysites.Flag_inAdmin = 1) ";
if ($traffic == 2) {
  $query.="AND ( tblPaysites.Niche=2 ) ";
}
if ($traffic == 1) {
  $query.="AND ( tblPaysites.Niche=1 ) ";
}
$query.="ORDER BY tblPaysites.PaysiteName;";

$niches = array(
  'Brazillian',
  'Shemale',
  'Twinks',
  'Black',
  'Hardcore',
  'Hunk',
  'Video',
  'Affiliate',
  'Straight'
);

$siteNiches = array(
  17 => 0,
  47 => 1,
  36 => 2,
  39 => 3,
  6 => 4,
  7 => 5,
  56 => 5,
  16 => 4,
  44 => 6,
  10 => 6,
  101 => 4,
  2 => 5,
  53 => 1,
  41 => 3,
  51 => 1,
  31 => 2,
  49 => 1,
  14 => 5,
  33 => 5,
  13 => 6,
  57 => 6,
  1 => 7,
  66 => 4,
  69 => 4,
  71 => 8,
  72 => 8,
  73 => 8,
  74 => 8,
  81 => 8,
  83 => 8,
  86 => 8,
  88 => 8,
  91 => 8,
  92 => 8,
  93 => 4,
  94 => 8,
  75 => 2,
  104 => 8,
  105 => 8,
  90 => 6,
  106 => 4,
  110 => 8,
  124 => 5,
  125 => 5,
  126 => 5,
  129 => 5,
  142 => 4
);

$cachekey = md5($query);
$siteList = array();

$data = getCache($cache,$cachekey);
if(!$clr && $data !== false){
  $siteList  = json_decode($data,true);
}else{
  __DBopen();
  @mysql_select_db($database);
  $result=mysql_query($query);
  __DBclose();

  while($row = mysql_fetch_assoc($result)){
    $namedisplay = $row['PaysiteName'];
    switch($row['PaysiteID']){
      case '10':
        $namedisplay = "RagingStallion DVDs";
        break;
      case '4':case '101':
        $namedisplay = "RagingStallion Paysite";
        break;
    }
    $niche_id = $siteNiches[$row['PaysiteID']];
    $site = array(
      'id'=>$row['PaysiteID'],
      'name'=>$row['PaysiteName'],
      'display'=>$namedisplay,
      'short'=>$row['ShortName'],
      'isPublic'=>!!$row['Flag_Public'],
      'inAdmin'=>!!$row['Flag_inAdmin'],
      'hasRSS'=>!!$row['Flag_HasRSS'],
      'nicheId'=>$niche_id
    );
    $siteList[] = $site;
  }
  setCache($cache,json_encode($siteList), $cachekey);
}


header('Content-type: application/json');
echo json_encode(array(
  'sites'=>$siteList,
  'niches'=>$niches
));