var ws = new WebSocket('ws://' + location.hostname + ':8080/');
var map, markers = [];
var currentLocation;
var iconBase = '/assets/';
var iconTweet = iconBase + 'tweet__.png';
var count = 0;
var play = true;
var censor = window.location.search.indexOf("censor=true") > -1;
var infoWindow = new google.maps.InfoWindow();
var audioOne = new Audio('http://maxwellzirbel.com/beats/HighA.wav');
var audioTwo = new Audio('http://maxwellzirbel.com/beats/HighF.wav');
var audioThree = new Audio('http://maxwellzirbel.com/beats/HighD.wav');
var audioFour = new Audio('http://maxwellzirbel.com/beats/LowA.wav');
var audioFive = new Audio('http://maxwellzirbel.com/beats/ReallyHighD.wav');
var audioSix = new Audio('http://maxwellzirbel.com/beats/MidA.wav');
var audioSeven = new Audio('http://maxwellzirbel.com/beats/MidD.wav');
var audioEight = new Audio('http://maxwellzirbel.com/beats/MidF.wav');
var audioNine = new Audio('http://maxwellzirbel.com/beats/LowD.wav');


// Socket open event
ws.onopen = function () {
    console.log('Socket connection established.');
}

// Socket message
ws.onmessage = function (message) {
    handleTweet(message);
}

// Log errors
ws.onerror = function (error) {
    console.log('WebSocket Error ' + error);
};

// Socket close event
ws.onclose = function () {
    console.log('Socket connection interrupted.');
}

// Handle tweet
function handleTweet(message) {
    if (play) {
        var tweet = JSON.parse(message.data);

        if (censor && tweet.obscene) {
            return;
        }

        var geo = tweet.coordinates;

        // Check if the geo type is a Point (it can also be a Polygon).
        if (geo && geo.type === 'Point') {
            var lat_lon = new google.maps.LatLng(geo.coordinates[1], geo.coordinates[0]);
            var bounds = map.getBounds();
            if (bounds && bounds.contains(lat_lon)) {

                //find ne and sw of bounds
                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();
                var y1 = ne.lat();
                var y2 = sw.lat();
                var x1 = ne.lng();
                var x2 = sw.lng();


                //divide map into thirds
                var y3rd = (y1 - y2) / 3;
                var x3rd = (x1 - x2) / 3;

                var oneNE = new google.maps.LatLng((y2 + y3rd), (x2 + x3rd));
                var oneSW = new google.maps.LatLng(y2, x2);
                var twoNE = new google.maps.LatLng((y1 - y3rd), (x2 + x3rd));
                var twoSW = new google.maps.LatLng((y2 + y3rd), x2 );
                var threeNE = new google.maps.LatLng(y1, (x2 + x3rd));
                var threeSW = new google.maps.LatLng((y1 - y3rd), x2 );

                var fourNE = new google.maps.LatLng((y2 + y3rd), (x1 - x3rd));
                var fourSW = new google.maps.LatLng(y2, (x2 + x3rd));
                var fiveNE = new google.maps.LatLng((y1 - y3rd),(x1 - x3rd));
                var fiveSW = new google.maps.LatLng((y2 + y3rd), (x2 + x3rd));
                var sixNE = new google.maps.LatLng(y1,(x1 - x3rd));
                var sixSW = new google.maps.LatLng((y1 - y3rd), (x2 + x3rd));

                var sevenNE = new google.maps.LatLng((y2 + y3rd), x1);
                var sevenSW = new google.maps.LatLng(y2, (x1 - x3rd));
                var eightNE = new google.maps.LatLng((y1 - y3rd),x1);
                var eightSW = new google.maps.LatLng((y2 + y3rd), (x1 - x3rd));
                var nineNE = new google.maps.LatLng(y1,x1);
                var nineSW = new google.maps.LatLng((y1 - y3rd), (x1 - x3rd));

                var one = new google.maps.LatLngBounds(oneSW, oneNE);
                var two = new google.maps.LatLngBounds(twoSW, twoNE);
                var three = new google.maps.LatLngBounds(threeSW, threeNE);
                var four = new google.maps.LatLngBounds(fourSW, fourNE);
                var five = new google.maps.LatLngBounds(fiveSW, fiveNE);
                var six = new google.maps.LatLngBounds(sixSW, sixNE);
                var seven = new google.maps.LatLngBounds(sevenSW, sevenNE);
                var eight = new google.maps.LatLngBounds(eightSW, eightNE);
                var nine = new google.maps.LatLngBounds(nineSW, nineNE);


//                TEST Block
//                console.log("NorthEast :" + ne);
//                console.log("SouthWest :" + sw);
//                console.log("one: " + one.getCenter());
//                console.log("two: " + two.getCenter());
//                console.log("three: " + three.getCenter());
//                console.log("four: " + four.getCenter());
//                console.log("five: " + five.getCenter());
//                console.log("six: " + six.getCenter());
//                console.log("seven: " + seven.getCenter());
//                console.log("eight: " + eight.getCenter());
//                console.log("nine: " + nine.getCenter());
//
//                debugger;

//                mySound.play()
//                    .fadeIn()
//                    .loop()
//                    .bind( "timeupdate", function() {
//                        var timer = buzz.toTimer( this.getTime() );
//                        document.getElementById( "timer" ).innerHTML = timer;
//                    });

                if(one.contains(lat_lon)){
                    audioOne.play();

                } else if(two.contains(lat_lon)){
                    audioTwo.play();
                } else if(three.contains(lat_lon)){
                    audioThree.play();
                } else if(four.contains(lat_lon)){
                    audioFour.play();
                } else if(five.contains(lat_lon)){
                    audioFive.play();
                } else if(six.contains(lat_lon)){
                    audioSix.play();
                } else if(seven.contains(lat_lon)) {
                    audioSeven.play();
                } else if(eight.contains(lat_lon)) {
                    audioEight.play();
                } else if(nine.contains(lat_lon)) {
                    audioNine.play();
                } else {
                    console.log("NOT ON MAP!?!?!");
                }
                    // Place marker
                var marker = new google.maps.Marker({
                    position: lat_lon,
                    map: map,
                    title: tweet["text"],
                    icon: iconTweet,
                    animation: google.maps.Animation.DROP
                });

                markers.push(marker);

                // Remove old markers when there are more than 300 on the map.
                if (markers.length > 300) {
                    markers[0].setMap(null);
                    markers.shift();
                }

                marker.set('tweet', tweet);

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.setContent(twt.tweet(marker.get('tweet')).html());
                    infoWindow.open(map, marker);
                });

                // Increment counter for TPM
                count = count + 1;

                // Append to list
                twt.timeline(tweet).prependTo("#list");

                // Only keep last 30 tweets in list
                if ($("#list .twt-standard").size() > 30) {
                    $('#list .twt-standard:last-child').remove();
                }
            }
        }
    }
}

// Callback function when the geolocation is retrieved.
function geolocationSuccess(position) {
    if (currentLocation) {
        return;
    }

    currentLocation = position;
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;

    // Position the map.
    var centerPosition = new google.maps.LatLng(latitude, longitude);

    map.setCenter(centerPosition);
}

// Callback function when the geolocation is not supported.
function geolocationError() {
    // Center and show the US
    var centerPosition = new google.maps.LatLng(39.159, -100.518);
    map.setCenter(centerPosition);
    map.setZoom(4);
}

// Initialize the map.
function initializeMap() {
    var mapOptions = {
        zoom: 7
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Request the user geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    } else {
        geolocationError();
    }

    google.maps.event.addListener(map, "click", function () {
        infoWindow.close();
    });
}

$("#btn").click(function () {
    $("#pause").toggle();
    $("#play").toggle();
    play = play ? false : true;
});

// Calculate a TPM every 4s
setInterval(function () {
    var tpm = count * 15 + " TPM";
    $("#tpm").html(tpm);
    count = 0;
}, 4000);

// Listen to the load event.
google.maps.event.addDomListener(window, 'load', initializeMap);