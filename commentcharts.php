<?php

require("commander.php");

$name = $_GET["n"];
$number = intval($_GET["p"]);

$recentcomments = query("SELECT * FROM comments ORDER BY time DESC LIMIT $number");
$topcommenters = query("SELECT name, count(name) as cnt FROM comments group by name order by cnt desc limit 5");

$html = "<h4>Recent Comments</h4><table class = 'table table-striped'><tr><th>Name</th><th>Comment</th></tr>";

foreach ($recentcomments as $recentcomment)
    {
        $html .= "<tr><td><small>" . $recentcomment['name'] . "</small></td><td><small><a href=# id='recentcomment" . $recentcomment['postid'] . "'>" . $recentcomment['comment'] . "</a><br>" . $recentcomment['time'] . "</small></td></tr>";
    }
$html .= "</table></div></div><button type='button' id='loadmorecomments' class='btn btn-default btn-xs'>Load More Comments</button>   <button type='button' id='loadlesscomments' class='btn btn-default btn-xs'>Load Less Comments</button><br><h4>Top Commenters</h4><table class = 'table table-striped'><tr><th>Name</th><th>Comments</th></tr>";

foreach ($topcommenters as $topcommenter)
    {
        $html .= "<tr><td><small>" . $topcommenter['name'] . "</small></td><td>" . $topcommenter['cnt'] . "</td></tr>";
    }
$html .= "</table></div></div>";


$json = utf8_encode($html);
echo json_encode($json);



?>

