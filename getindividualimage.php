<?PHP

require("commander.php");

$postid = $_GET["p"];
$result = array();




if (isset($postid))
{
	

	$comments = query("SELECT * FROM comments WHERE postid = ? ORDER BY time DESC", $postid);
	$imgloc = $comments[0]["imgloc"];



	$html = '<div class="center-block"><div class="thumbnail"><a name="'.$postid.'"><img id = "modalimg'.$postid.'" src="images/' . $imgloc . '"></a><div class="commentsection"><h3>Comments</h3><span id="modalcomments'.$postid.'">';
	

	foreach ($comments as $comment)
         {

            $html .= "<div class='media'><h4 class='media-body'><div class='media-heading'>" . $comment["name"] . "<small>  " . $comment["time"] . "</small></h4>" . $comment["comment"]. "</div>";
		 }

	$html .= '</span><br><div id="modalalert'.$postid.'" class="alert alert-warning" role="alert" style="display:none;"><span id="modalmessage'.$postid.'" class="message">I think that is correct</span></div><div class="form-group"><textarea id="modalcomment'.$postid.'" class="form-control" rows="3" placeholder="Enter comments here..."></textarea></br><button type="submit" id= "modal'.$postid.'" value="'.$postid.'"class="btn btn-default submit">Submit</button></div></div>';	
	$imagesjson = json_encode(utf8_encode($html));
	echo $imagesjson; 
}

else
{
	$nomorejson = json_encode('<p class="lead">There was an error getting the postID</p>', JSON_FORCE_OBJECT);
	echo $nomorejson;
}
 

?>
