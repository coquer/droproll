<?PHP

require("commander.php");

$a = $_POST["postid"];
$b = addslashes(utf8_decode($_POST["name"]));
$c = addslashes(utf8_decode($_POST["comment"]));
$d = $_POST["imgloc"];


$insert = query("INSERT INTO comments (postid, name, comment, imgloc) VALUES('$a', '$b', '$c', '$d')");

    if ($insert)
    {
        $response_array['message'] = 'There was an error with your comment. Try making it shorter or removing weird characters.';   /* add custom message */ 
    	
    	echo json_encode($response_array);
    }

    else
    {
    	$justcommented = query("SELECT * FROM comments WHERE postid = '$a' and name = '$b' and comment = '$c'");
    	$x = $justcommented[0];
    	$json = "<div class='media'><h4 class='media-body'><div class='media-heading'>" . $x['name'] . "<small> " . $x['time'] . "</small></h4>" . $x['comment'] . "</div>";
    	echo json_encode(utf8_encode($json));
    }


?>