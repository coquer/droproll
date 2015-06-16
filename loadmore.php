<?PHP

require("commander.php");

$counter = intval($_GET["j"]);
$result = array();
$trimmedfiles = array(); 
$files = scan_dir('images');
        
foreach($files as $file)
  {
    switch(ltrim(strstr($file, '.'), '.'))
       {
         case "jpg": case"jpeg": case "png" : case"gif":
            
         $trimmedfiles[] = $file;

            
       }
   }

$directorysize = count($trimmedfiles);



if (isset($trimmedfiles[$counter]))
{
	$postid = preg_replace("/[^A-Za-z0-9]/",'',$trimmedfiles[$counter]);

	

	$comments = query("SELECT * FROM comments WHERE postid = ?", $postid);

	$html = '<div class="center-block"><div class="thumbnail"><a name='.$postid.'><img src="images/' . $trimmedfiles[$counter] . '"></a><div class="commentsection"><h3>Comments</h3><span id="comments'.$postid.'">';

	foreach ($comments as $comment)
         {

            $html .= "<div class='media'><h4 class='media-body'><div class='media-heading'>" . $comment["name"] . "<small>  " . $comment["time"] . "</small></h4>" . $comment["comment"]. "</div>";
		 }

	$html .= '</span><br><div id="alert'.$postid.'" class="alert alert-warning" role="alert" style="display:none;"><span id="message'.$postid.'" class="message">I think that is correct</span></div><div class="form-group"><textarea id="comment'.$postid.'" class="form-control" rows="3" placeholder="Enter comments here..."></textarea></br><button id="'.$trimmedfiles[$counter].'" type="submit" value="'.$postid.'"class="btn btn-default submit">Submit</button></div></div>';	
	$imagesjson = json_encode(array('html' => utf8_encode($html), 'count' => $directorysize), JSON_FORCE_OBJECT);
	echo $imagesjson; 
}

else
{
	$nomorejson = json_encode(array('html' => '<p class="lead">You have the reached the begining of BruceRoll</p>', 'count' => $directorysize), JSON_FORCE_OBJECT);
	echo $nomorejson;
}
 

?>
