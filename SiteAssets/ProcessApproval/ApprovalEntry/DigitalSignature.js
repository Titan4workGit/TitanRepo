

function GetSignature()
{
	var data = $sigdiv.jSignature('getData', "default")
			$.publish(pubsubprefix + 'formatchanged')
			if (typeof data === 'string'){
				$('textarea', $tools).val(data)
			}
			

}

(function($) {
	var topics = {};
	$.publish = function(topic, args) {
	    if (topics[topic]) {
	        var currentTopic = topics[topic],
	        args = args || {};
	
	        for (var i = 0, j = currentTopic.length; i < j; i++) {
	            currentTopic[i].call($, args);
	        }
	    }
	};
	$.subscribe = function(topic, callback) {
	    if (!topics[topic]) {
	        topics[topic] = [];
	    }
	    topics[topic].push(callback);
	    return {
	        "topic": topic,
	        "callback": callback
	    };
	};
	$.unsubscribe = function(handle) {
	    var topic = handle.topic;
	    if (topics[topic]) {
	        var currentTopic = topics[topic];
	
	        for (var i = 0, j = currentTopic.length; i < j; i++) {
	            if (currentTopic[i] === handle.callback) {
	                currentTopic.splice(i, 1);
	            }
	        }
	    }
	};
})(jQuery);


var $sigdiv='';
$(document).ready(function() {
	
	// This is the part where jSignature is initialized.
	$sigdiv = $("#signature").jSignature({'UndoButton':false})
	
	// All the code below is just code driving the demo. 
	, $tools = $('#tools')
	, $extraarea = $('#displayarea')
	, pubsubprefix = 'jSignature.demo.'
	
	var export_plugins = $sigdiv.jSignature('listPlugins','export')
	, chops = ['<span><b>Extract signature data as: </b></span><select>','<option value="">(select export format)</option>']
	, name
	for(var i in export_plugins){
		if (export_plugins.hasOwnProperty(i)){
			name = export_plugins[i]
			chops.push('<option value="' + name + '">' + name + '</option>')
		}
	}
	chops.push('</select><span><b> or: </b></span>')
	
	$(chops.join('')).bind('change', function(e){
		if (e.target.value !== ''){
			var data = $sigdiv.jSignature('getData', e.target.value)
			$.publish(pubsubprefix + 'formatchanged')
			if (typeof data === 'string'){
				$('textarea', $tools).val(data)
			} else if($.isArray(data) && data.length === 2){
				$('textarea', $tools).val(data.join(','))
				$.publish(pubsubprefix + data[0], data);
			} else {
				try {
					$('textarea', $tools).val(JSON.stringify(data))
				} catch (ex) {
					$('textarea', $tools).val('Not sure how to stringify this, likely binary, format.')
				}
			}
		}
	}).appendTo($tools)

	
	$('<input type="button" value="Reset">').bind('click', function(e){
		$sigdiv.jSignature('reset')
	}).appendTo($tools)
	
	$('<div><textarea style="width:100%;height:7em;"></textarea></div>').appendTo($tools)
	
	$.subscribe(pubsubprefix + 'formatchanged', function(){
		$extraarea.html('')
	})

	$.subscribe(pubsubprefix + 'image/svg+xml', function(data) {

		try{
			var i = new Image()
			i.src = 'data:' + data[0] + ';base64,' + btoa( data[1] )
			$(i).appendTo($extraarea)
		} catch (ex) {

		}
		
		var message = [
			"If you don't see an image immediately above, it means your browser is unable to display in-line (data-url-formatted) SVG."
			, "This is NOT an issue with jSignature, as we can export proper SVG document regardless of browser's ability to display it."
			, "Try this page in a modern browser to see the SVG on the page, or export data as plain SVG, save to disk as text file and view in any SVG-capabale viewer."
           ]
		$( "<div>" + message.join("<br/>") + "</div>" ).appendTo( $extraarea )
	});

	$.subscribe(pubsubprefix + 'image/svg+xml;base64', function(data) {
		var i = new Image()
		i.src = 'data:' + data[0] + ',' + data[1]
		$(i).appendTo($extraarea)
		
		var message = [
			"If you don't see an image immediately above, it means your browser is unable to display in-line (data-url-formatted) SVG."
			, "This is NOT an issue with jSignature, as we can export proper SVG document regardless of browser's ability to display it."
			, "Try this page in a modern browser to see the SVG on the page, or export data as plain SVG, save to disk as text file and view in any SVG-capabale viewer."
           ]
		$( "<div>" + message.join("<br/>") + "</div>" ).appendTo( $extraarea )
	});
	
	$.subscribe(pubsubprefix + 'image/png;base64', function(data) {
		var i = new Image()
		i.src = 'data:' + data[0] + ',' + data[1]
		$('<span><b>As you can see, one of the problems of "image" extraction (besides not working on some old Androids, elsewhere) is that it extracts A LOT OF DATA and includes all the decoration that is not part of the signature.</b></span>').appendTo($extraarea)
		$(i).appendTo($extraarea)
	});
	
	$.subscribe(pubsubprefix + 'image/jsignature;base30', function(data) {
		$('<span><b>This is a vector format not natively render-able by browsers. Format is a compressed "movement coordinates arrays" structure tuned for use server-side. The bonus of this format is its tiny storage footprint and ease of deriving rendering instructions in programmatic, iterative manner.</b></span>').appendTo($extraarea)
	});

	if (Modernizr.touch){
		$('#scrollgrabber').height($('#content').height())		
	}
	


});


$(document).ready(function(){
    $(".jSignature").width(200);
    $(".jSignature").height(200);
    var c = $(".jSignature")[0].getContext("2d");
   //c.fillStyle = "#000";
    //c.fillRect(0,0,40,40);   
    $(".jSignature").width();
    $(".jSignature").height();
    //c.fillRect(100,0,40,40);  
});


