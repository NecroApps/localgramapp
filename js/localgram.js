

var accessToken = "$INSTAGRAM_ACCESS_KEY";
var distance = "5000";

function newPhotos(townName,lat,long){

	$('.instagram').html('');

    $.ajax({
    	type: "GET",
        dataType: "jsonp",
        cache: false,
		url: "https://api.instagram.com/v1/media/search?lat="+lat+"&lng="+long+"&distance="+distance+"&access_token="+accessToken,
		success: function(data) { for (var i = 0; i < 30; i++) {
		if (data.data[i]==undefined){break;};
		if (data.data[i].caption==null){
			var escapedCaption="Untitled";
		} else {
			var escapedCaption=escape(data.data[i].caption.text);
		};
        $(".instagram").append("<div class='instagram-placeholder'><a href='#viewer' onclick='viewBigPhoto(\""+data.data[i].images.standard_resolution.url+"\",\""+data.data[i].user.username+"\",\""+escapedCaption+"\",\""+data.data[i].link+"\",\""+data.data[i].filter+"\",\""+data.data[i].location.name+"\",\""+data.data[i].location.latitude+"\",\""+data.data[i].location.longitude+"\")'><img class='instagram-image' src='" + data.data[i].images.thumbnail.url +"' /></a></div>");  
 
      		}     
        }
    });

	$('#titlebarLabel').html(townName);

}

function geoPhotos(townName,lat,long){

	navigator.geolocation.getCurrentPosition(foundLocation,noLocation,{ enableHighAccuracy: true });

}

function noLocation() {

	alert('Location services not available');

}

function foundLocation(position) {
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
 	//alert('Found location: ' + lat + ', ' + long);

	$('.instagram').html('');

    $.ajax({
    	type: "GET",
        dataType: "jsonp",
        cache: false,
		url: "https://api.instagram.com/v1/media/search?lat="+lat+"&lng="+long+"&distance="+distance+"&access_token="+accessToken,
		success: function(data) { for (var i = 0; i < 30; i++) {
		if (data.data[i]==undefined){break;};
		if (data.data[i].caption==null){
			var escapedCaption="Untitled";
		} else {
			var escapedCaption=escape(data.data[i].caption.text);
		};
        $(".instagram").append("<div class='instagram-placeholder'><a href='#viewer' onclick='viewBigPhoto(\""+data.data[i].images.standard_resolution.url+"\",\""+data.data[i].user.username+"\",\""+escapedCaption+"\",\""+data.data[i].link+"\",\""+data.data[i].filter+"\",\""+data.data[i].location.name+"\",\""+data.data[i].location.latitude+"\",\""+data.data[i].location.longitude+"\")'><img class='instagram-image' src='" + data.data[i].images.thumbnail.url +"' /></a></div>");  

      		}     
        }
    });

	$('#titlebarLabel').html('Near Me');

}

function viewBigPhoto(photoURL,username,caption,link,filter,venue,latitude,longitude){

		if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)){
			$('#followlink').css('display', 'block');
			$('#venue').css('display', 'none');
		}

		//alert("so this happened");
        $("#bigPhoto").html("<div class='instagram-placeholder'><img class='instagram-image-large' src='"+photoURL+"' /></a></div>");   
		$('#phototitlebarLabel').html(username);
		$('#caption').html(unescape(caption));
		$('#filter').html('Using the ' + filter + ' filter');
		$('#followlink').html('<a class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-a" href="instagram://user?username='+username+'" data-role="button" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all" aria-hidden="true"><span class="ui-btn-text">Follow '+username+' on Instagram</span></span></a>');
		$('#venue').html('<a class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-a" href="instagram://location?id=' + venue + '" data-role="button" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all" aria-hidden="true"><span class="ui-btn-text">Other photos from ' + venue + '</span></span></a>');
		$('#map').html('<a class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-a" href="http://maps.google.com/maps?z=19&ll=' +latitude+','+longitude+'" data-role="button" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all" aria-hidden="true"><span class="ui-btn-text">Show location on Google Maps</span></span></a>');
		$('#link').html('<a class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-a" target="_blank" href="'+link+'" data-role="button" data-theme="a"><span class="ui-btn-inner ui-btn-corner-all" aria-hidden="true"><span class="ui-btn-text">Show photo on instagr.am</span></span></a>');


	}