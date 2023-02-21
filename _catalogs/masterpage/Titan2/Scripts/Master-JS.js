 $(window).load(function() {
		// Animate loader off screen
		//&& strHref.indexOf(_spPageContextInfo.currentUICultureName.toLowerCase())==-1 
		$(".se-pre-con").fadeOut("slow");;
		//getLocatiozation();
	});
	
	var strLang;
	function getLocatiozation(){
		var lang = _spPageContextInfo.currentUICultureName.toLowerCase();
		
		if(lang=="en-us"){
			strLang="eng";
		}
		else if(lang==""){
			strLang="eng";
		}
		else if(lang==""){
			strLang="eng";
		}
			
	}
	
	
	
$(document).ready(function(){
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', getCurrentUser);
    
    	
$("[text='My Settings']").remove();
$("[text='Personalize this Page']").remove();
$("[text='About Me']").remove();

	$('#twitter-widget-0').contents().find('div.timeline-Viewport').css('max-height','200px')
	//$('#SearchBox >div>input').val('');
	$('#SearchBox >div>input').attr('title','');
	$('#SearchBox >div>input').attr('placeholder','Search...');
	$("ul.navbar-nav li:visible>a" ).last().css('background','none');
	$(".ms-core-listMenu-item:contains('Recent')").parent().hide();
	$(".ms-core-listMenu-item:contains('Récents')").parent().hide();
	$("iframe").contents().find(".timeline").css("background",'rgba(0,0,0,0)');
	
	

	
		
$('#img01').mouseout(function() {
 var abc= $('#myModal').css('display');

 if(abc=='block'){
 	
 		onhoverOut();
 		
	    	}
	    });
	    



$('img[alt="Previous Image"]').parent('a').parent('td').parent('tr').css('display','none')
$('#twitter-widget-0').contents().find('div.timeline-Viewport').css('max-height','200px');

try{
//var meetingID=$('#WebPartWPQ6').find('div.cbq-layout-main').html();
var meetingID=$( "label:contains('Meeting Room')" ).parent().parent('div').parent('div').next('div').find('.cbq-layout-main');
if(meetingID!=null && meetingID.html().indexOf("<!--empty-->")>=0){
                meetingID.html(' <div class="col-sm-12 img-padding-top1 img-padding-top2" style="text-align:center;padding-top:3%; "><img class="noitem-img" src="https://adaptindia.sharepoint.com/sites/Titan-Dev/Shared%20Documents/Vacant.jpg"  /></div>');
              //  $( "h4:contains('Meeting Room')" ).parent('div').parent('div').next('div').next('div').children('span').hide();
}
}catch(e){
}

try{
//var pollID=$('#WebPartWPQ9').find('div.cbq-layout-main').html();
var pollID=$( "label:contains('Poll')" ).parent().parent('div').parent('div').next('div').find('.cbq-layout-main');
if(pollID!=null && pollID.html().indexOf("<!--empty-->")>=0){
                pollID.html(' <div class="col-sm-12 img-padding-top1 img-padding-top2" style="text-align:center;padding-top:7%;"><div class="col-sm-12" ><img class="noitem-img" src="https://adaptindia.sharepoint.com/sites/Titan-Dev/Shared%20Documents/polls.jpg"  /></div></div>');
              //  $( "h4:contains('Poll')" ).parent('div').parent('div').next('div').next('div').children('span').hide();
}
}catch(e){}

try{
//var announcementID=$('#WebPartWPQ3').find('div.cbq-layout-main').html();
var announcementID=$( "label:contains('Announcements')" ).parent().parent('div').parent('div').next('div').find('.cbq-layout-main');
if(announcementID!=null && announcementID.html().indexOf("<!--empty-->")>=0){
                announcementID.html(' <div class="col-sm-12 img-padding-top1 img-padding-top2" style="text-align:center;padding-top:3%;"><img class="noitem-img" src="https://adaptindia.sharepoint.com/sites/Titan-Dev/Shared%20Documents/announcement.jpg" /></div>');
              //  $( "h4:contains('Announcements')" ).parent('div').parent('div').next('div').next('div').children('div').children('span').hide();
}
}catch(e)
{}

try{

var newjoneeID=$( "label:contains('New Joinee')" ).parent().parent('div').parent('div').next('div').find('.cbq-layout-main');

if(newjoneeID!=null && newjoneeID.html().indexOf("<!--empty-->")>=0){
                newjoneeID.html(' <div class="col-sm-12 img-padding-top1 img-padding-top2" style="text-align:center;padding-top:3%;"><img class="noitem-img" src="https://adaptindia.sharepoint.com/sites/Titan-Dev/Shared%20Documents/new%20joinee.jpg" /></div>');
              // $("h4:contains('New Joinee')" ).parent('div').parent('div').next('div').next('div').children('div').show();
                
}
}catch(e)
{}


try{

var suggestionID=$( "label:contains('Suggestions')" ).parent().parent('div').parent('div').next('div').find('.cbq-layout-main');

if(suggestionID!=null && suggestionID.html().indexOf("<!--empty-->")>=0){
                suggestionID.html(' <div class="col-sm-12 img-padding-top1 img-padding-top2" style="text-align:center;padding-top:3%;"><label>Wait for new suggestions.</label></div>');
              // $("h4:contains('Suggestions')" ).parent('div').parent('div').next('div').next('div').children('div').hide();
                
}
}catch(e)
{}

try{

var initiativeID=$( "label:contains('New Initiatives')" ).parent().parent('div').parent('div').next('div').find('.cbq-layout-main');

if(initiativeID!=null && initiativeID.html().indexOf("<!--empty-->")>=0){
                initiativeID.html(' <div class="col-sm-12 img-padding-top1 img-padding-top2" style="text-align:center;padding-top:3%;"><label>Wait for new initiatives.</label></div>');
             //  $("h4:contains('New Initiatives')" ).parent('div').parent('div').next('div').next('div').children('div').hide();
                
}
}catch(e)
{}

try{

var documentID=$( "label:contains('Documents')" ).parent().parent('div').parent('div').next('div').find('.cbq-layout-main');

if(documentID!=null && documentID.html().indexOf("<!--empty-->")>=0){
                documentID.html(' <div class="col-sm-12 img-padding-top1 img-padding-top2" style="text-align:center;padding-top:3%;"><label>Wait for new documents.</label></div>');
             //  $("h4:contains('Documents')" ).parent('div').parent('div').next('div').next('div').children('div').hide();
                
}
}catch(e)
{}


		
});


/*$('iframe').load( function() {
    $('iframe').contents().find("head")
      .append($("<style type='text/css'>  div.timeline-Viewport{display:none !important;}  </style>"));
});*/

function getCurrentUser() {

    try {
        var clientContext = new SP.ClientContext.get_current();
        var tempcurrentUser = clientContext.get_web().get_currentUser();
        clientContext.load(tempcurrentUser); 
        clientContext.executeQueryAsync(function () {
        	var strName = tempcurrentUser.get_title();
        	//$('#aUser').html('').append('<span class="glyphicon glyphicon-user" style="font-size:18px;"></span>'+' '+'Welcome'+' '+strName)
            //var index = tempcurrentUser.get_loginName().indexOf('|') + 1;
            //var currentUser = tempcurrentUser.get_loginName().substring(index);
            //alert('Hello ' + currentUser); // Here you will get name of the user
            
            if(tempcurrentUser.get_isSiteAdmin())
            {
            	$('#dvUser').html('');
            }
            else{
            	$('#ms-designer-ribbon').html('');
				try{
            		setHeight1();
            		setHeight();
            	}catch(e)
            	{
            	
            	}
            }

        }, queryFailure);
    }
    catch (err) {
        queryFailure();
    }
}

function queryFailure () {
    //alert('error');
}


function enlargeImage(this1){

	/*var modal = document.getElementById('myModal');

	
	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var img = document.getElementById('myImg');
	
	var modalImg = document.getElementById("img01");
	var captionText = document.getElementById("caption");
	
	    modal.style.display = "block";
	    modalImg.src = this1.src;
	    captionText.innerHTML = this1.alt;
	*/
	var img=this1.src;
	
	
	$('#imagepreview1').attr('src', img); // here asign the image to the modal when the user click the enlarge link
   $('#imagemodal1').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function

	
}
// Get the <span> element that closes the modal
function onhoverOut(){
//alert('out');
	var modal = document.getElementById('myModal');

	var img = document.getElementById('myImg');
	var modalImg = document.getElementById("img01");
	var captionText = document.getElementById("caption");
	
	   modal.style.display = "none";
	    modalImg.src = '';
	    captionText.innerHTML = 'none';
}

function popupimg(img)
{
 $('#imagepreview').attr('src', img); // here asign the image to the modal when the user click the enlarge link
   $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function

}

$(document).ready(function(){

$(".static.dynamic-children").hover(function()
{
	$(".static.dynamic-children").children('ul').attr('style','left: 141px ; top:6px !important; z-index:1100');
	
	
});

$(".static.dynamic-children").mouseout(function()
{
	if($("#zz17_V4QuickLaunchMenu_FrameID_0").html()=="")
	{
		$("#zz17_V4QuickLaunchMenu_FrameID_0").hide();
	}
	//alert($(".static.dynamic-children").children('ul').siblings('iframe').html());
	
});


addLoadEvent(preloader);

});



function preloader() {
	//if (document.images) {
		//var img1 = new Image();
		//var img2 = new Image();
		//var img3 = new Image();
		//var img4 = new Image();

		//img1.src = _spPageContextInfo.webAbsoluteUrl +"/_catalogs/masterpage/img/face-hover.jpg";
		//img2.src = _spPageContextInfo.webAbsoluteUrl +"/_catalogs/masterpage/img/tweet-hover.jpg";
		//img3.src = _spPageContextInfo.webAbsoluteUrl +"/_catalogs/masterpage/img/in-hover.jpg";
		//img4.src = _spPageContextInfo.webAbsoluteUrl +"/_catalogs/masterpage/img/yout-hover.jpg";
	//}
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

$(document).ready(function(){

$(".top-margin").click(function(){
//$("#twitter-widget-0").attr("style","margin-bottom: -6px; margin-top: 2px");
$("#twitter-widget-0").attr("style","padding: 0px; border: currentColor; width: 100%; height: 272px; margin-top: 2px; margin-bottom: -5px; display: inline-block; visibility: visible; position: static; min-height: 200px; min-width: 180px; max-width: 100%;");
});
});




