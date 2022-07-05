
$( window ).on( "load", function() {
	ReadEvents();

	var _linkViewEvents=  _spPageContextInfo.webServerRelativeUrl + "/Pages/AllEvents.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"";
  	$('#_ViewEvents').attr('href', _linkViewEvents);
  	
  	requestToken();
  	
});

function formatDateEvent(d) 
{
	var date = new Date(d);
	if ( isNaN( date .getTime())){ return d; }
    else{
         var month = new Array();
         month[0] = "Jan";
         month[1] = "Feb";
         month[2] = "Mar";
         month[3] = "Apr";
         month[4] = "May";
         month[5] = "Jun";
         month[6] = "Jul";
         month[7] = "Aug";
         month[8] = "Sept";
         month[9] = "Oct";
         month[10] = "Nov";
         month[11] = "Dec";
         day = date.getDate();
         if(day < 10){day = "0"+day; }
         return    day  + " " +month[date.getMonth()];
         }
}
/*
function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}*/

function ReadEvents()
{
	var today = new Date();
	var CurrentDate=today.toISOString();
	var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl")+"/_api/web/lists/getbytitle('Event')/items?$filter=EventDate ge '"+CurrentDate+"' and ApprovalStatus eq 'Approved'&$top=10"; 
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) { 
            var items = data.d.results;  
            if (items.length > 0) 
			{  $("#EventData").empty();
				for(var p=0; p<items.length; p++)
				{
					if(items[p].ApprovalStatus == "Approved")
					{
						var _ItemID = items[p].ID;
						var _Category = items[p].Category;
						var _Location = items[p].Location;
						var _Title = items[p].Title;
						var _Department = items[p].Department;
						var _Todate = items[p].EventDate;
						var _Fromdate = items[p].EndDate;
						var EventDt = formatDateEvent(_Todate)+" - "+ formatDateEvent(_Fromdate);
						var _Coverimage = items[p].ImageURL;
						var eventDateObj=new Date(items[p].EventDate);
						var Event_time = eventDateObj.toTimeString();
						var H = +Event_time.substr(0, 2);
						var h = (H % 12) || 12;
						var ampm = H < 12 ? " AM" : " PM";
						Event_time= h + Event_time.substr(2, 3) + ampm;					
						Design(_ItemID,_Category,_Location,_Title,_Department,EventDt,_Coverimage,Event_time);
					}
				}				
				$("#EventData").append(_htmldesign); 
            } 
            $('.events').owlCarousel({
				loop:true,
        		smartSpeed:1000,
				margin:10,
				nav:false,
				dots:true,
				responsive:{
					0:{ items:1 },
					600:{ items:1 },
					1000:{ items:2 }
				}
			})  
        },
		error: function (data) 
		{  
        	console.log(data);  
		}  
    });  
}


var _htmldesign='';
function Design(_ItemID,_Category,_Location,_Title,_Department,EventDt,_Coverimage,Event_time)
{
	_htmldesign = _htmldesign+ "<div class='item'>"+ 
									"<img src="+_Coverimage+" class='img-responsive' alt=''>"+
                                	"<h5 class='event-text-head-new'>"+_Title+"</h5>"+
                                	"<p class='text-bold'><span>"+EventDt+"</span> | <span>"+_Location+"</span> | <span>"+_Department+"</span></p>"+
                                	"<p><span class='event-time'>Starts at "+Event_time+"</span><span class='event-button'><a onclick='Addto_outlook("+_ItemID+");'>Add to Outlook</a></span></p>"+
                                		"<div class='panel-heading panel-heading-event-catgry-lg'><span class='event-head-catgry-text-lg head-back-color h4-color'>"+_Category+"</span>"+
                                    "</div>"+
                            	"</div>";
}


var token;
function requestToken() 
{
	$.ajax({
    	"async": true,
    	"crossDomain": true,
        "url": "https://howling-crypt-47129.herokuapp.com/https://login.microsoftonline.com/adaptindia.onmicrosoft.com/oauth2/v2.0/token", // Pass your tenant name instead of sharepointtechie  
        "method": "POST",
        "headers": {
        	"content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "grant_type": "client_credentials",
                "client_id ": "895e6de8-6dbb-47e1-a171-af9b8ad5f5c2", //Provide your app id  
                "client_secret":"w251TPgVMsXRm.TU[G7ilE.SdpNrnkq=", //Provide your secret  
                "scope ": "https://graph.microsoft.com/.default"
            },
            success: function(response) 
            {
                console.log(response);
                token = response.access_token;
             },
            error: function(error) 
            {
                console.log(JSON.stringify(error));
            }
        })
    }
    
function Addto_outlook(ItemID)
{
	var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/getbytitle('Event')/items?$filter=ID eq ('"+ ItemID +"')";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) { 
			 
            var items = data.d.results;  
            if (items.length > 0) 
			{  
				var Startdate = items[0].EventDate;
				var EndDate = items[0].EndDate;
				var Title = items[0].Title;
				var Category = items[0].Category;
				var Department = items[0].Department;
				var Description = items[0].Description;
				var Location = items[0].Location;
								
				CreateCalendarEvents(Startdate,EndDate,Title,Category,Department,Description,Location);			               				
            } 
        },
		error: function (data) 
		{  
        	console.log(data);  
		}  
    }); 
}    

function CreateCalendarEvents(Startdate,EndDate,Title,Category,Department,Description,Location) {
  
     var sdate =new Date(Startdate); //new Date($('#txtstartdate').val())
     var edate =new Date(EndDate) ;//new Date($('#txtenddate').val())

	var emailid=_spPageContextInfo.userLoginName;


     var subject =Title;
    //var body ='<img src='+encodeURI($("#labelImageURL").attr('src'))+'><br>Category: '+$("#labelNewEventCategory").text()+'<br>Department: '+$("#labelDepartment").text()+'<br>Description: '+$("#lblNewEventDescription").text();
     var body ='Category: '+Title+'<br>Department: '+Department+'<br>Description: '+Description;
     var loc=Location;

	var data = { "subject": subject, "start": { "dateTime": sdate, "timeZone": "UTC"
	}, "end": { "dateTime": edate, "timeZone": "UTC" }, body: {contentType: "HTML", content: body}, "location": { "displayName": loc}}
		
		
		$.ajax({
            method: 'GET',
            url: "https://graph.microsoft.com/v1.0/users/"+emailid+"/calendarview?startdatetime="+Startdate+"&enddatetime="+EndDate,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            
            success: function(response) {
            
            	var isExists=0;
            	if(response!=null){
	              for(var i=0; i<response.value.length;i++){
	                if(response.value[i].subject==subject)
	                {	
	                	isExists=1;
	                }
	              }
	            }
	            if(isExists==1)
	            {
	            	alert("Event Already Added");
	            }else{
	            	$.ajax({
			            method: 'POST',
			            url: "https://graph.microsoft.com/v1.0/users/"+emailid+"/events",
			            headers: {
			                'Authorization': 'Bearer ' + token,
			                'Content-Type': 'application/json'
			            },
			            data: JSON.stringify(data),
			            success: function(response) {
			              alert("Event Added In Outlook")
			            },
			            error: function(error) {
			            	alert("error2"+ JSON.stringify(error));
			             },
			        })
	            }
	            
            },
            error: function(error) {
            	alert("error1"+ JSON.stringify(error));
            },
        })

    }  

/*


var DepartmentList = [];
function Createfilter(_url)
{
	var Ownurl = _url + "/_api/web/lists/getbytitle('Event')/items?$orderby=Modified desc";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) { 
			debugger; 
            var items = data.d.results;  
            if (items.length > 0) 
			{  
				for(var p=0; p<items.length; p++)
				{
					if(items[p].Department != null){DepartmentList.push(items[p].Department);}					
				}				
				var Deptlist = unique(DepartmentList);
				//Createfilter(Deptlist);
				
				$("#EventDeptList").empty();
				var Req= "ALL";
				$("#EventDeptList").append('<a id="ALL" onclick="onrequestdata(this.id)"><span >All</span></a>');
				for(var j=0; j<Deptlist.length; j++)
				{
					$("#EventDeptList").append('<a id="'+Deptlist[j]+'" onclick="onrequestdata(this.id)"><span>'+Deptlist[j]+'</span></a>');
				}
				
            } 
        },
		error: function (data) 
		{  
        	console.log(data);  
		}  
    });  

				


}




*/


 
  	

//https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV/Pages/AllEvents.aspx?WebAppId=2

//_ViewEvents
