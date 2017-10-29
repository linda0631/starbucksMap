function initMap(){
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert('the browser does not support geolocation!');
	}

	function showPosition(position) {
		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 2,
			center: latlng,
			gestureHandling: 'cooperative'
		});
		
		var clientWidth = document.body.clientWidth;
		if (clientWidth<450) {
			map.panBy(0,100);
		} else if (clientWidth<800){
			map.panBy(-80,0);
		} else {
			map.panBy(-150,0);
		}
		
		myMarker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: './assets/blue_MarkerA.png'
		});
		
		starbucks_list(map);
	}

	function starbucks_list(map){ 
		$.getJSON('starbucks_new_york.json',function(json){ 
			$('#starbucks').append("starbucks(NYC)");
			
			var meters;
			var starbucksMaker = new Array();
			var array = new Array();
			
			for(var i=0; i<json.starbucks.length; i++){ 
				starbucksMaker[i] = new google.maps.Marker({
					position: new google.maps.LatLng(json.starbucks[i].location.latitude,json.starbucks[i].location.longitude),
					map: map,
					title: 'starbucks id:' + json.starbucks[i].id,
					content: json.starbucks[i].street + ',' + json.starbucks[i].city
				});
				
				meters = google.maps.geometry.spherical.computeDistanceBetween(myMarker.getPosition(), starbucksMaker[i].getPosition());
				array[i] = new Array();
				array[i][0] = json.starbucks[i].id;
				array[i][1] = json.starbucks[i].name;
				array[i][2] = meters;
			}
			array.sort(function(a, b) {
				return a[2] - b[2];
			});
			
			var items="<dl>"; 
			for(var j=0; j<array.length; j++){
				items+="<dt>"+(j+1)+".&nbsp&nbspStarbucks</dt>"; 
				items+="<dd>id&nbsp"+array[j][0]+"&nbsp`&nbsp"+array[j][1]+"</dd>";
				items+="<dd>distance:&nbsp"+array[j][2].toFixed(2)+"m</dd>";
				for(var k=0; k<array.length; k++){
					if(json.starbucks[j].id == array[k][0])
						starbucksMaker[j].set('label', k+1);
				}
			}
			items+="</dl>"; 
			$('#list').append(items); 					
		}); 
	}
}
