<?php

require("commander.php");

$password = $_GET["p"];

if ($password == "password")
{
	echo $success_json;
}

else
{
	
    echo(json_encode(array('message' => 'error', 'code' => 1337)));
}


?>