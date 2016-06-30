
	//Link back to html element
	var canvas = document.getElementById('panel');
	var context = canvas.getContext('2d');


	//Prefix
	var black = "#000000";
	var size = 20;
	var img = new Image();
	var org_image;
	var ini_misMatch;

	//Image array
	var org_pic = new Array();
	var complete_pic = new Array();
	var index = 0;


	//Global var
	var paint;
	var path = new Array();
	var Dragging = new Array();

	init();

	console.log("Alright");

/*
	Listener emthod for mouse event handling (within panel)
*/
	canvas.addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        paint = true;
        addClick(mousePos);
        /*
        //Test script
        var message = 'Mouse Down: ' + mousePos.x + ',' + mousePos.y;
        console.log(message);
        */
        draw();

     }, false);

	canvas.addEventListener('mousemove', function(evt) {
		if (paint) {
			var mousePos = getMousePos(canvas, evt);
        	addClick(mousePos,true);
        	draw();
		}
	},false);

	canvas.addEventListener('mouseup', function(evt) {
		paint = false;
	}, false);

	canvas.addEventListener('mouseleave', function(evt) {
		paint = false;
	}, false);


/*
	Normal listener for other button (html)
*/	
    function Compare () {
	    // save canvas image as data url (png format by default)
	    var dataURL = canvas.toDataURL();
	    setTimeout(function () { 
	    	resemble(dataURL).compareTo(complete_pic[index]).onComplete(function(data){
				//return data;
				var result = ( (ini_misMatch - data.misMatchPercentage) / ini_misMatch ) *100 ;
				console.log(result);
				result = result *1.7;
				
				//Bound of the score
				if (result > 100) result = 100;
				if (result < 0) result = 0;
				//Pop up to inform user
				window.alert("Score: " + parseInt(result) );
				
				//  	console.log(data);
			},  'ignoreColors');
		}, 1500);
    }


/*
	Utility method for modularization
*/
 	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

    function addClick (MousePos, drag) {
    	path.push(MousePos);
    	Dragging.push(drag);
    //	console.log("Number of element: ", path.length);
    }

    function init () {

    	//Set up property
    	context.strokeStyle = black;
		context.lineJoin = "round";
		context.lineWidth = size;

		//Fetch pciture filename by XML
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4 && xhttp.status == 200) {

  		  	load_img_name(xhttp);
  		  	setup_q_by_index();
	 		} 
		}
		xhttp.open("GET", "Questions.xml",true);
		xhttp.send();
	
    }



    function next_q () {
    	index++;
    	if (index > org_pic.length-1) {
    		console.log("Exceed");
    		index = 0;
    	}
    	setup_q_by_index();
    }

    //Callback method for image loading
    function loadImage (src, callback) {
    	
    	img.onload = callback;
    	img.src = src;
    }

    //Fetch img filename from XML node
    function load_img_name (xhttp){
    	var xmlDoc = xhttp.responseXML;

    	var root = xmlDoc.documentElement.childNodes;
    	console.log (root.length);

    	for (var i=0 ; i<root.length; i++) {
    		
    		if (root[i].nodeName != "#text") {

    			var org = root[i].getAttribute('Orignal');
    			var completed = root[i].getAttribute('Completed');
    			console.log (root[i].nodeName  + org);

    		//	var pic = new Array();
    			org_pic.push(org);
    			complete_pic.push(completed);
    		}
    	}
    	console.log(org_pic);
    	
    	/*
   		document.getElementById("demo").innerHTML =
  		xmlDoc.getElementsByTagName("title")[0].childNodes.nodeValue;
		*/
    }

    function draw() {
		var i = path.length-1;	
		context.beginPath();

	    if(Dragging[i] && i){
	      context.moveTo(path[i-1].x, path[i-1].y);
	     }else{
	       context.moveTo(path[i].x-1, path[i].y);
	     }

	    context.lineTo(path[i].x, path[i].y);
	    context.closePath();
	    context.stroke();		  
    }

    function setup_q_by_index() {
		//Load bg image
		loadImage(org_pic[index], function () {
			//Draw background
			context.drawImage(img,0,0);
			//Take a snapshot for comparation
			org_image = canvas.toDataURL();
		})

		//Calculate the diff %
		resemble(org_pic[index]).compareTo(complete_pic[index]).onComplete(function(data){
		 console.log(data.misMatchPercentage);
		 ini_misMatch = data.misMatchPercentage;
		});
    }

