# droproll
Secure, private facebook-like image feed with commenting

Instructions

DropRoll is a website that I developed when my first son was born. People kept asking me for photos, every day, and it got aggravating. I considered creating a Facebook account for my son, and simply posting photos there, but I really dislike Facebook on principle, namely because of their invasiveness and privacy issues, not to mention the fact that its just far too public. I don’t want pictures of my son to be publicly accessible and marketable by large corporations. So I developed DropRoll which allows you to host your own Facebook-like feed of photos with commenting features. The whole website is password protected so only people with the password will be able to access it and comment on photots. There are no usernames or user accounts, people are somewhat on the honor system with regards to entering their name and not someone else’s. I’ve been using this for my family and friends with great success for many months now, and I wanted to share it with you. 

I’d like to add the disclaimer that I am a beginner developer/coder. In fact, this was my final project for a course I took on computer programming. So, if you’re experienced with jQuery etc. you’ll probably find things that could be improved. I encourage you to find better, faster, more efficient ways to do what is posted here. 

The first thing you’ll need to do is create a SQL database on your web server. I used mySQL and phpMyAdmin to set it up. Create a database called “DropRoll” or whatever you like. The only required table is “comments”. In this table, you’ll want the following configuration:

	#	Name	 Type	Collation	Attributes	Null	Default	Extra	
	1	row  Primary	int(8)		UNSIGNED	No	None	AUTO_INCREMENT	
	2	postid	varchar(40)	latin1_swedish_ci		No	None		

	3	name	varchar(22)	latin1_swedish_ci		No	None		

	4	comment	text	latin1_swedish_ci		No	None		

	5	time	timestamp			No	CURRENT_TIMESTAMP		
	6	imgloc	varchar(100)	latin1_swedish_ci		No	None		

Once you have that setup. You’ll next need an images directory where your pictures will live. I strongly recommend using only .pngs.  I setup a process on my Mac where any picture I add to a specific drop box folder (i.e. from my phone) get automatically converted to .png and seriously downscaled so that the file is less than 1mb. If your photos are full rez, your website will be VERY slow. You can use whatever clever solution works for you to get your photos into the images directory on your web server. 

Below is a look at all the code that the site uses, and anything you should change. Note that the page won’t load unless your sql queries are working. Fortunately, there is very little that you’ll have to change in the code below. Some highlights:
1) username/login and name of your SQL DB
2) password you want to use for the site
3) location of images directory if you don’t want it to be in the root folder
4) Cosmetic things that shouldn’t prevent the site from loading

Pay special attention to the includes in the HTML like Bootstrap and jQuery. 

index.html

The first thing you’ll want to do is name your site. On line 25 you can change “DropRoll” to whatever you’d like. And again on line 54 and line 80.

The side bar is obviously very customizable. For my initial implementation, I put an animated gif at the top, followed by a description of the site. 

The side bar is also where the recent comments chart and the top commenters chart appear. 

commander.js

This is where all of the custom javascript exists. It is commented so you should be able to follow it pretty well. There really isn’t anything you’ll want to change here unless you want to add features or fundamentally alter how the site works. 

commander.php

This is the server side script that gives all the other php files their necessary functions and other important things. On line 7 a fixed random string is used as a token. Feel free to actually add a random generator for this to make things a bit more secure. 

The only thing you’ll want to change is the SQL database information on line 45. Swap out DBNAME, USERNAME and PASSWORD with the ones you set up for your database in MyAdmin. 

comment.php

This generates the comment that was created in the form on the website, stores it in the DB and also prints it out immediately to the html. Nothing should be changed here unless your sql table isn’t called “comments”. 

commentcharts.php

This generates the recent and top commenter tables in the side bar. You can change how many top commenters are displayed by altering the number ‘5’ at the end of the query on line 9. Nothing else needs to be changed unless your sql table isn’t called “comments”. 

getindividualimage.php

This generates the individual image modal for when someone clicks on a recent comment. Nothing here should be changed. 

loadmore.php

This is called when the website requests more images. This occurs when the page first loads (5 times), and again when you scroll to the bottom or click load more. The only thing here that you can change is on line 8, the location/director of the images you wish to post. The default is for the images folder to be in the same directory as index.html and this php file. This will also only catch images that have the following extensions .jpg, .jpeg, .png, .gif 

password.php

This is where you set the password for the site when someone first logs in. Default is “password” and should absolutely be changed. 
