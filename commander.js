$(document).ready(function(){
	
	// Some global variables used by all functions

	window.pictures;
	// This keeps track of the picture count 
	var j = 0;
	//  blank variable that may not actually be necessary 
	var html = '';
	// You can change this to set how many photos to load each time you scroll to the bottom or click "load more". Default is 5.
	var initialSet = 5;
	// This creates something like a cookie in the browser to remember the user so they don't have to log in each time
	var personName = localStorage["name"];
	//This stands for "recent comment number", default is 5, but you can change it to whatever you like. 
	// Changing this number will change how many recent comments appear in on initial load along the side. 
	var rcnumber = 5;
	


	//Checks for a password when page first loads

	if (!localStorage["bruceroll"]) {
			$('#passwordbox').modal('show');
		} 
	else {

		for (var i=0;i<initialSet-1;i++)
			{
				printImages();

			}
		$("#navbarname").text(personName);	
		
		getCommentCharts(personName,rcnumber);
		$('#rightcolumn').slideDown();	
			
		}
	//If logout is clicked	
	$('#logoutbutton').click(function(e){
		logOut();
	});	
	//Modal operations for logging in
	$('#password').submit(function(e){
		e.preventDefault();
		var password = $("#loginpassword").val();
		personName = $("#name").val();
		
		if (personName.length === 0)
		{
			$('#message').text('Name field cannot be empty');
			$('#alert').slideDown();
		}
		else if (password.length === 0)
		{
			$('#message').text('Password field cannot be empty');
			$('#alert').slideDown();
			
		}

		else
		{
			$.getJSON('password.php?p='+password,
					function(data) {
						
						if (data.message === 'success')
						{
							localStorage["bruceroll"] = data.token;
							localStorage["name"] = personName;
							location.reload();
						}

						if (data.message === 'error')
						{
							$('#message').text('Incorrect password!');
							$('#alert').slideDown();
						}


					});
	    }
		
	});	
	
	//Listen for submit button on comment form

	$("#postswrapper").on('click', '.btn.btn-default.submit', function()
	{
		
    	var a = $(this).attr("value");
    	var b = $('#comment'+a).val();
    	var c = personName;
    	var d = $(this).attr("id");

    	if (b)
    	{
    		submitComment(a,b,c,d);
    		$('#comment'+a).val("");
    		$('#alert'+a).fadeOut();
    	}

    	if (!b)
    	{
    		$('#message'+a).text("You cannot submit an empty comment");
			$('#alert'+a).slideDown();
    	}
    	
	});

	//listen for submit button in modal
	$("#imageviewerbody").on('click', '.btn.btn-default.submit', function()
	{
		
    	var a = $(this).attr("value");
    	var b = $('#modalcomment'+a).val();
    	var c = personName;
    	var e = $('#modalimg'+a).attr('src');
    	var d = e.substr(e.lastIndexOf("/") + 1);
    	

    	if (b)
    	{
    		submitCommentModal(a,b,c,d);
    		$('#modalcomment'+a).val("");
    		$('#modalalert'+a).fadeOut();
    	}

    	if (!b)
    	{
    		$('#modalmessage'+a).text("You cannot submit an empty comment");
			$('#modalalert'+a).slideDown();
    	}
    	
	});
	
	//Handel side bar information expansions

	$('#morewelcome').click(function(){
		var link = this.id;
		var id = $('#welcomemessage').attr('id');
		moreLess(link,id);
		
	});

	//Open individual image viewer modal 

	$("#rightcolumn").on('click',"[id^=recentcomment]", function(){
		
		var a = this.id;
		var b = a.substr(a.lastIndexOf("comment") + 7);
		getIndividualImage(b);

	});

	$('#imageviewer').on('click','.close',function(){
		
		$('#imageviewer').slideUp();
	});

	$('#loadmorebruce').on('click', function(){
		for (var i=0;i<initialSet-1;i++)
			{
				printImages();
				
			}
	});

	//load more comments

	$('body').on('click','#loadmorecomments',function(){
		rcnumber += 5;
		getCommentCharts(personName,rcnumber);
	});

	//load less comments
	$('body').on('click','#loadlesscomments',function(){
		if (rcnumber>5)
		{
			rcnumber -= 5;
			getCommentCharts(personName,rcnumber);
		}
		
	});


	//The functions

	function getCommentCharts(name,number)
	{

		$("#commentcharts").html("<img src='ajax-loader.gif' />");

		$.ajax({
			url: "commentcharts.php?n="+name+"&p="+number,
			type: 'GET',
			dataType: 'json',
			async: false,
			success: function(data){
				$("#commentcharts").html(data);
			}
		});
		
	}

	function moreLess(link,id)
	{
		
			$('#'+id).slideToggle(function(){
				if ($('#'+link).text() === '...more')
				{
					$('#'+link).text('less');
				}
				else if ($('#'+link).text() === 'less')
				{
					$('#'+link).text('...more');
				}
			});
		
	}

	//Handle new comments
	function submitComment(postid,comment,name,imgloc){
		$.post("comment.php",{postid:postid, name:name, comment:comment, imgloc:imgloc}, function(data){
			if (data.message)
			{
				$('#message'+postid).text(data.message);
				$('#alert'+postid).slideDown();

			}
			else
			{
				html = $.parseJSON(data);
				$('#comments'+postid).append(html).fadeIn();
				getCommentCharts(name,rcnumber);
			}
		});
	}

	//Handle new comments from modals
	function submitCommentModal(postid,comment,name,imgloc){
		$.post("comment.php",{postid:postid, name:name, comment:comment, imgloc:imgloc}, function(data){
			if (data.message)
			{
				$('#modalmessage'+postid).text(data.message);
				$('#modalalert'+postid).slideDown();

			}
			else
			{
				html = $.parseJSON(data);
				$('#modalcomments'+postid).append(html).fadeIn();
				getCommentCharts(name,rcnumber);
			}
		});
	}

	// AJAX request to the PHP code that scans the directory and returns a json with all the filenames.png
	function printImages(){
		$.ajax({
		        url: "loadmore.php?j="+j,
		        type: "GET",
		        dataType: "json",
		        async: false,
		        success: function(imgs)
		        {
		        	
		            if(imgs)

		            {
		            	$('#postswrapper').append(imgs.html).fadeIn("slow");
		            	$('div#loadmoreajaxloader').hide();
		            	pictures = imgs;
		            	j++;
		            	
		                
		            }else
		            {
		                $('div#loadmoreajaxloader').html('Some kind of error occured');
		            }
		        }
		        });
	}
//This function is called when the individual image modal is called by clicking on a recent comment
	function getIndividualImage(postid){
		var p = postid;
		$('#imageviewer').slideDown();
		$('#imageviewerbody').html("<img src='ajax-loader.gif'/>");
		$.ajax({
			url: "getindividualimage.php?p="+p,
			type: "GET",
			dataType: "json",
			async: false,
			success: function(data)
			{
				if(data)
				{

					$("#imageviewerbody").html(data);
				}
				else
				{
					$("#imageviewerbody").html("<p class='lead'>The server didn't respond with an image.</p>");
				}
			}

		});
	}

	function logOut(){
		localStorage.removeItem("bruceroll");
		localStorage.removeItem("name");
		location.reload();
	}

	  
	   
	//scroll function to auto load more photos when you reach the end

	

	
		$(window).scroll(function()
		{
			
			if($(window).scrollTop() == $(document).height() - $(window).height())
		    	{
		    		
		    		if (pictures.count !== j)
		    		{
		    			$('div#loadmoreajaxloader').show();
			        	printImages();
			        	//j++;
		    		}
		    			
			        	
		    		
			        
		    	}
		    
		    
		});
	
	
	
	
	
//ending brackets 
	

});

