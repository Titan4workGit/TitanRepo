var ele = [];
var globalEventId = 0;
var IsEventsAdmin = false;
var userid = _spPageContextInfo.userId; //Check Login User
var ClientId ='';
var ClentSecret='';
var ClientUrl ='';
    
$(document).ready(function () {
    ClientCredentials();                               //Get Client Credentials
    //requestToken(); //not required
    //GetEventsAdmin();
    CheckUserInProcessApprover().done(function () {		//Chek user permission for Event Update and Delete
        // TODO
    });
    
    userActivityNotificationEntry(_spPageContextInfo.userId,window.location);
    ValidateUser();                              //Validation for user add events according to Event Webpart
    getEventDepartment("", "dropdown");          //Get Departments
    Retreive();                                  //Get Event data
    getEventCategory("Event", "dropdown");            //Get Event Category Master data
    BindEvents();                                //Bind Event Button Click
    BindDatePicker();                            //Bind DatePicker Control
    UpdateSelectedEvent();                       //Update selected Event
    LoadEditMyPicture();                             //Load gallary Pictures

    $("#selctimage1").change(function () {
        var imageText = $(this).find("option:selected").text();
        var imageValue = $(this).val();
        
        if (imageValue == "Choose from Gallery") {
            $("#imageeditSliderDiv").show();
            $("#fileeditUpload").hide();
        }
        else if (imageValue == "Upload") {
            $("#fileeditUpload").show();
            $("#imageeditSliderDiv").hide();
        }
    });
   
     var fileedit = document.getElementById('fileupload1');
    fileedit.onchange = function (e) {
        var ext = this.value.match(/\.([^\.]+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'JPG':
            case 'JPEG':
            case 'jpeg':
            case 'GIF':
            case 'gif':
            case 'PNG':
            case 'png':

                var size = this.files[0].size / 1024;
                if (size.toFixed(2) > 50) {
                    alert("Image size not more then 50 KB");
                    this.value = '';
                }
                else {
                    document.getElementById('blah1').src = window.URL.createObjectURL(this.files[0]);

                }
                break;
            default:
                alert('Please select image files of JPEG, JPG, GIF and PNG formatted only.');
                this.value = '';
        }
    };

});

//Bind Events Event
function BindEvents() {
    $('.closeEventForm').click(function () {
        $('#myViewEventModal').modal('hide');
    });

    $('.deleteClickEditCompanyEvent').click(function () {
        DeleteEventListItem(globalEventId);
    });

    $('.addClickEditCompanyEvent').click(function () {
        // $('#myEditEventModal').modal('show');
        LoadEventDetailsEditForm();
    });
    $('.closeEditEventForm').click(function () {
        $('#myEditEventModal').modal('hide');
    });
    
    $('.addToCalender').click(function () {
       Addto_outlook(globalEventId);
    });
    
    $('.revokeFromCalender').click(function () {
       Remove_outlook(globalEventId);
    });

}
 var UserAuthorization;
// Validate users for Add new Eveny
function ValidateUser() 
{    
    var companyId =titanForWork.getQueryStringParameter("CompanyId");
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$filter=WebPartName eq 'Events' and Company eq '"+companyId+"'";  
    $.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data)
		{	 
            var items = data.d.results;  
            if (items.length > 0) 
			{  
             	if(items[0].Scope =="Selective" || items[0].Scope =="SELECTIVE" || items[0].Scope == null)
             	{
             		var userlist =items[0].ContributorsId.results;
             		function checkuser(_userID)
             		{
  						return _userID== _spPageContextInfo.userId;
					}
					var res = userlist.filter(checkuser);
					if(res.length>0){$("#ctl00_PlaceHolderMain_SPSecurityTrimmedControl3").show();
					 UserAuthorization=true;
					}
					else{$("#ctl00_PlaceHolderMain_SPSecurityTrimmedControl3").hide();
					 UserAuthorization=false;
					}
             	}
             	else if (items[0].Scope =="Everyone" || items[0].Scope =="EVERYONE")
             	{
             		$("#ctl00_PlaceHolderMain_SPSecurityTrimmedControl3").show();
             		UserAuthorization=true;
				}
				else
				{
					$("#ctl00_PlaceHolderMain_SPSecurityTrimmedControl3").hide();
					UserAuthorization=false;
				}  			
            }
            else{$("#ctl00_PlaceHolderMain_SPSecurityTrimmedControl3").hide();
                UserAuthorization=false;
            }  
		},
		error: function (data) 
		{  
        	console.log(data);
		}  
    });  
}
function ClientCredentials()
{  
   var Listname= "EnvironmentalSettings";
   var currentCompanyid = titanForWork.getQueryStringParameter("CompanyId");
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + Listname+ "')/items?$filter=Title eq 'Client_Credentials' ";
    $.ajax({  
		url: siteurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data)
		{	  
		    var items = data.d.results;  
            ClientId =items[0].ClientName; 
            ClentSecret = items[0].ChangeFileName; 
            ClientUrl =items[0].Description; 
            requestToken();
        },
		error: function (data) 
		{  
        	console.log(data);
		}  
    });  
}
 
//outlook calender

var token;

function requestToken() {
  $.ajax({
        "async": true,
        "crossDomain": true,
        "url":  ClientUrl, // Pass your tenant name instead of sharepointtechie  
        "method": "POST",
        "headers": {
            "Authorization": "Bearer",
				"Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "grant_type": "client_credentials",
            "client_id": ClientId, //Provide your app id  
            "client_secret": ClentSecret, //Provide your secret  
            "scope": "https://graph.microsoft.com/.default"
        },
        success: function (response) {
            console.log(response);
            token = response.access_token;
            //     console.log(token);
            //     RetrieveCalendarEvents();
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    })
}

//New Add to outlook Calander Code By Rahul Rana on 01/07/2020
function Addto_outlook(globalEventId)
{
	var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/getbytitle('Event')/items?$filter=ID eq ('"+ globalEventId+"')";  
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

//Old Add to outlook code
/*
function CreateCalendarEvents() {
      
     var evsdate=$("#labelStartDateTime").val();
     var evddate=$("#labelEndDateTime").val()
    var sdate = new Date($("#labelStartDateTime").text()); //new Date($('#txtstartdate').val())
    var edate = new Date($("#labelEndDateTime").text());//new Date($('#txtenddate').val())

    var emailid = _spPageContextInfo.userLoginName;


    var subject = $('#labelEventTitle').text();
    //var body ='<img src='+encodeURI($("#labelImageURL").attr('src'))+'><br>Category: '+$("#labelNewEventCategory").text()+'<br>Department: '+$("#labelDepartment").text()+'<br>Description: '+$("#lblNewEventDescription").text();
    var body = 'Category: ' + $("#labelNewEventCategory").text() + '<br>Department: ' + $("#labelDepartment").text() + '<br>Description: ' + $("#lblNewEventDescription").text();
    var loc = $("#labelLocation").text();

    var data = {
        "subject": subject, "start": {
            "dateTime": sdate, "timeZone": "UTC"
        }, "end": { "dateTime": edate, "timeZone": "UTC" }, body: { contentType: "HTML", content: body }, "location": { "displayName": loc }
    }


    $.ajax({
        method: 'GET',
        // url: "https://graph.microsoft.com/v1.0/users/"+emailid+"/calendarview?startdatetime="+$("#labelStartDateTime").text()+"&enddatetime="+$("#labelEndDateTime").text(),
        url: "https://graph.microsoft.com/v1.0/users/" + emailid + "/calendarview?startdatetime=" + sdate.toUTCString() + "&enddatetime=" + edate.toUTCString(),
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },

        success: function (response) {
                
            var isExists = 0;
            if (response != null) {
                for (var i = 0; i < response.value.length; i++) {
                    if (response.value[i].subject == subject) {
                        isExists = 1;
                    }
                }
            }
            if (isExists == 1) {
                alert("Event Already Added");
            } else {
                $.ajax({
                    method: 'POST',
                    url: "https://graph.microsoft.com/v1.0/users/" + emailid + "/events",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(data),
                    success: function (response) {
                        alert("Event Added In Outlook")
                    },
                    error: function (error) {
                        alert("error2" + JSON.stringify(error));
                    },
                })
            }

        },
        error: function (error) {
            alert("error1" + JSON.stringify(error));
        },
    })

}*/

function Remove_outlook(globalEventId)
{
	var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/getbytitle('Event')/items?$filter=ID eq ('"+ globalEventId+"')";  
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
								
				RemoveCalendarEvents(Startdate,EndDate,Title,Category,Department,Description,Location);			               				
            } 
        },
		error: function (data) 
		{  
        	console.log(data);  
		}  
    }); 
} 

function RemoveCalendarEvents(Startdate,EndDate,Title,Category,Department,Description,Location) {
  
     var sdate =new Date(Startdate);
     var edate =new Date(EndDate) ;

	var emailid=_spPageContextInfo.userLoginName;


     var subject =Title;
     var body ='Category: '+Title+'<br>Department: '+Department+'<br>Description: '+Description;
     var loc=Location;

	var data = { "subject": subject, "start": { "dateTime": sdate, "timeZone": "UTC"
	}, "end": { "dateTime": edate, "timeZone": "UTC" }, body: {contentType: "HTML", content: body}, "location": { "displayName": loc}}
		
		
		var data1={};
		
		$.ajax({
            method: 'GET',
            url: "https://graph.microsoft.com/v1.0/users/"+emailid+"/calendarview?startdatetime="+Startdate+"&enddatetime="+EndDate,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            
            success: function(response) {
            
            	var isExists=0;
            	var calid="";
            	if(response!=null){
	              for(var i=0; i<response.value.length;i++){
	                if(response.value[i].subject==subject)
	                {	
	                	isExists=1;
	                	calid=response.value[i].id;
	                }
	              }
	            }
	           // alert(isExists);
	            //alert(calid);
	            if(isExists==1)
	            {
	            
	            //alert("https://graph.microsoft.com/v1.0/users/"+emailid+"/events/"+calid+"/cancel");
	            	
	            	$.ajax({
			            method: 'POST',
			            url: "https://graph.microsoft.com/v1.0/users/"+emailid+"/events/"+calid+"/cancel",
			            headers: {
			                'Authorization': 'Bearer ' + token,
			                'Content-Type': 'application/json'
			            },
			             data: JSON.stringify({}),
			             success: function(response) {
			              alert("Event Removed From Outlook")
			            },
			            error: function(error) {
			            	alert("error2"+ JSON.stringify(error));
			             },
			        });
	            }else{
	            	alert("Event not exists in Outlook");
	            
	            }
	            
            },
            error: function(error) {
            	alert("error1"+ JSON.stringify(error));
            },
        });

    } 


//window.addeventasync = function(){
//addeventatc.settings({
//appleical  : {show:true, text:"Apple Calendar"},
//google     : {show:true, text:"Google <em>(online)</em>"},
//office365  : {show:true, text:"Office 365 <em>(online)</em>"},
//outlook    : {show:true, text:"Outlook"},
//outlookcom : {show:true, text:"Outlook.com <em>(online)</em>"},
//yahoo      : {show:true, text:"Yahoo <em>(online)</em>"}
//});
//};

//function download() {
//var cal = ics();
//cal.addEvent('Demo Event', 'This is an all day event', 'Nome, AK', '20/4/2020', '20/4/2020');
//cal.addEvent('Demo Event', 'This is thirty minute event', 'Nome, AK', '20/4/2020 5:30 pm', '20/4/2020 6:00 pm');
//cal.download();
//}	

//Update Event
function UpdateSelectedEvent() {
      debugger;
    $(".addEditCompanyEvent").click(function () {
 
        var startHoursWithMinutes = $('#ddlEditEvetStartTime').val().split(' ')[0] + ":" + $('#ddlEditEvetStartMinutes').val() + " " + $('#ddlEditEvetStartTime').val().split(' ')[1];
        var endHoursWithMinutes = $('#ddlEditEvetEndTime').val().split(' ')[0] + ":" + $('#ddlEditEvetEndMinutes').val() + " " + $('#ddlEditEvetEndTime').val().split(' ')[1];
       //newVar = ed+" 20:00:00";
        var txtEventItemTitle = $('#txtEditEventItemTitle').val().trim();
        if (txtEventItemTitle.length == 0) {
            alert('Please enter event title.');
            return false;
        }
        else if (txtEventItemTitle.length > 250) {
            alert('Event title maximum 250 characters allowed.');
            return false;
        }
        var txtEventItemLocation = $('#txtEditEventItemLocation').val().trim();
        if (txtEventItemLocation.length == 0) {
            alert('Please enter event Location.');

            return false;
        }
        else if (txtEventItemLocation.length > 250) {
            alert('Event Location maximum 250 characters allowed.');
            return false;
        }
        var txtEventStartDate = ConvertMMDDYYYY($('#txtEditEventStartDate').val()) + " " + startHoursWithMinutes;
        var txtEventEndDate = ConvertMMDDYYYY($('#txtEditEventEndDate').val()) + " " + endHoursWithMinutes  ;
        var txtNewEventDescription = $('#txtEditEventDescription').val().trim();
        if (txtNewEventDescription.length == 0) {
            alert('Please enter Description');
            return false;
        }

        
        var ddlNewEventCategory = $('#ddlEditEventCategory').val();
        if (ddlNewEventCategory == "Select Category" || ddlNewEventCategory == null || ddlNewEventCategory == "") {
            alert('Please select event category.');
            return false;
        }
        var ddlNewEditEventDepartment = $('#ddlNewEditEventDepartment').val();
        if (ddlNewEditEventDepartment == "Select Department" || ddlNewEditEventDepartment == null || ddlNewEditEventDepartment == "Select Department") {
            alert('Please select event Department.');
            return false;
        }
        

        var ChooseImage = $('#selctimage1').val();
        if (ChooseImage  =="--Choose Option--" || ChooseImage == null || ChooseImage == "" ) {
            alert('Please Choose Image.');
            return false;
        }
        var txtEditEventUrl = $('#txtEditEventUrl').val().trim();
        if (ChooseImage == "Choose from Gallery") {
            if (txtEditEventUrl.length == 0) {
                alert('Please select event Image.');
                return false;
            }
        }
         

         
        
        if (compareStartDateEndDate(txtEventStartDate, txtEventEndDate) == false) {
            return false;
        }
        UpdateEventsMetadata(txtEventItemTitle, txtEventItemLocation, txtEventStartDate, txtEventEndDate, txtNewEventDescription, ddlNewEventCategory, ddlNewEditEventDepartment, txtEditEventUrl, ChooseImage);
    });
}
function GetItemTypeForListNameDetails(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}
function UpdateEventsMetadata(evetTitle, txtEventItemLocation, thisEventDate, thisEventEndDate, eventDescription, eventCategory, eventDepartment, eventImageURL, ChooseImage) {
    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var ListName = "Event";
    var Metadata;
    var ItemType = GetItemTypeForListNameDetails(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: evetTitle,
        Location: txtEventItemLocation,
        EventDate: thisEventDate,
        EndDate: thisEventEndDate,
        Description: eventDescription,
        Category: eventCategory,
        Department: eventDepartment,
        ImageURL: eventImageURL,
        ChooseImage: ChooseImage,
        ApprovalStatus:"Pending"
    };

    if (evetTitle == null || evetTitle == "") {
        delete Metadata["Title"];
    }
    if (thisEventDate == null || thisEventDate == "") {
        delete Metadata["EventDate"];
    }
    if (thisEventEndDate == null || thisEventEndDate == "") {
        delete Metadata["EndDate"];
    }
    if (eventDescription == null || eventDescription == "") {
        delete Metadata["Description"];
    }
    if (eventCategory == null || eventCategory == "") {
        delete Metadata["Category"];
    }
    if (eventDepartment == null || eventDepartment == "") {
        delete Metadata["Department"];
    }
    if (eventImageURL == null || eventImageURL == "") {
        delete Metadata["ImageURL"];
    }
    $.when(updateItemWithIDGroups(ListName, Metadata)).done(function (itemresponse) {
         
           if (document.getElementById("fileupload1").files.length > 0) {
                checkFileExists(globalEventId);
                UpdateAttachments(globalEventId);
           }
               
          alert("Event Updated successfully!");
          NotificationCenter (evetTitle, eventDescription, txtEventItemLocation, eventCategory, thisEventDate, thisEventEndDate, false);
          var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
          var clientContext = new SP.ClientContext(companySiteUrlLink);
          var itemID = globalEventId ;
          var companyId = titanForWork.getQueryStringParameter('CompanyId');
          
         titanForWork.GetItemIDOfApprovalTaskList(itemID, titanForWork.getQueryStringParameter('CompanyId'), "Events").done(function (requestItemID) {
            titanForWork.DeleteTaskItem(requestItemID);				// Delete Approval Task Item As Well.
            })

        titanForWork.CreateWorkflowTaskForApproval(itemID, companyId, 0, "Events", evetTitle, eventDescription,eventCategory).done(function (response) {
            console.log("Response from titanForWork.CreateWorkflowTaskForApproval : " + response);
            if (response == "ApprovalNotRequired")			// Approval Not Required.
            {
                AutoApproveAnnouncement(companySiteUrlLink, itemID);		// Automatically approved. No approval required.
            } 

            BindCalendarEvents(clientContext);
            location.reload();

        });


        // Add Notification into Notification List.
        //	NotificationCenter(evetTitle,eventDescription,txtEventItemLocation,eventCategory,thisEventDate,thisEventEndDate,false);
    });
}
function updateItemWithIDGroups(ListName, Metadata) {
    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var dfd = $.Deferred();
    var oweburl = companySiteUrlLink + "/_api/Web/Lists/getByTitle('" + ListName + "')/Items(" + globalEventId + ")";
    $.ajax({
        url: oweburl,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(Metadata),
        success: function (RESULT) {
             
           // alert("Event Updated successfully!");
            
            //location.reload();
            dfd.resolve(true);




        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
function checkFileExists(globalEventId) {

    var ListName = "Event";
    $.ajax({
        url: titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/Lists/GetByTitle('" + ListName + "')/Items('" + globalEventId + "')?$select=*&$expand=AttachmentFiles",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            if (data.d.Attachments == true) {
                //delete file if it already exists
                for (var index = 0; index < data.d.AttachmentFiles.results.length; index++) {
                    DeleteFile(globalEventId , data.d.AttachmentFiles.results[index].FileName);
                }
            }
            UpdateAttachments(globalEventId);
        },
        error: function (data) {
            //check if file not found error                      
        }
    });
}
function DeleteFile(globalEventId, FileTitle) {

    var ListName = "Event";
    $.ajax({
        url: titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/GetByTitle('" + ListName + "')/GetItemById(" + globalEventId + ")/AttachmentFiles/getByFileName('" + FileTitle + "')  ",
        method: 'DELETE',
        async: false,
        headers: {
            'X-RequestDigest': document.getElementById("__REQUESTDIGEST").value
        },
        success: function (data) {
            UpdateAttachments(globalEventId);
        },
        error: function (data) {
            //  console.log(data);      
        }
    });
}
var uploadfinalImages = [];
var UploadeditImage = [];

$(function () {
    $("#fileupload1").on('change', function (e) {
        UploadeditImage = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            UploadeditImage[uploadfinalImages.length] = elm;
        });
        console.log(UploadeditImage);
    });
})

var GeteditImage = function (UploadeditImage) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }
    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(UploadeditImage);
    return deferred.promise();
};

var xRequestDigest = $("#__REQUESTDIGEST").val();
function UpdateAttachments(globalEventId) {

    if (UploadeditImage.length > 0) {
        $.each(UploadeditImage, function (index, value) {
   
            var fileName=value.name;                        //Remove Special characts from filename
            var fileNameSplit=fileName.split('.');
            var fileExt=fileNameSplit[fileNameSplit.length - 1];
            var fileLength=fileExt.length;
            var fileSCR=fileName.replace(/[^a-zA-Z]/g, "");
            var fileslice;
           
            if(fileLength==3){
            fileslice= fileSCR.slice(0,-3);
            }
            if(fileLength==4){
            fileslice= fileSCR.slice(0,-4);
            }          
            var newFileName=(fileslice+"."+fileExt);

            GeteditImage(value).then(function (buffer) {
                $.ajax({
                    url: titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/getbytitle('Event')/items(" + globalEventId + ")/AttachmentFiles/add( FileName='" + newFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
                    {
                        "Accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose",
                        "X-RequestDigest": xRequestDigest
                    },
                    success: function (data) { console.log("Image Upload"); },
                    error: function (data) {
                        console.log(data.responseText.error);
                        //alert(data.responseText);
                    }
                });
            });
        });
    }
}


function compareStartDateEndDate(startDate, endDate) {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var currentdateandTime = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    var datec = new Date(currentdateandTime);
    var kdate = new Date(startDate);
    var txtstartdate = new Date(startDate);
    var txtenddate = new Date(endDate);

    if (kdate < datec) {
        alert("StartTime can't be less than the current time.");
        return false;
    }
    if (txtenddate <= txtstartdate) {
        alert('Please change event Start DateTime or End DateTime.');
        return false
    }
    return true;
}


function ConvertMMDDYYYY(datestringDDMMYYYY) {
    var dateDays = datestringDDMMYYYY.split('/')[0];
    var dateMonth = datestringDDMMYYYY.split('/')[1];
    var dateYear = datestringDDMMYYYY.split('/')[2];
    var mmddyyyFormat = dateMonth + "/" + dateDays + "/" + dateYear;
    return mmddyyyFormat;
}
//Bind DatePicker on TextBox 
function BindDatePicker() {
    $('#txtEditEventStartDate').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 0,
        yearRange: "0:+2"

    });
    $('#txtEditEventStartDate').datepicker("option", "dateFormat", "dd/mm/yy").datepicker("setDate", "0");

    $('#txtEditEventEndDate').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 0,
        yearRange: "0:+2"

    });
    $('#txtEditEventEndDate').datepicker("option", "dateFormat", "dd/mm/yy").datepicker("setDate", "0");

}
function LoadEventDetailsEditForm() {
    $('#myViewEventModal').modal('hide');
    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var listName = 'Event';
    var siteURL = companySiteUrlLink + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,Title,Location,EventDate,EndDate,Description,Category,ChooseImage,Department,ImageURL &$filter=ID eq '" + globalEventId + "'&$expand=AttachmentFiles";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
              
            $("#myEditEventModal").modal('show');
            var items = data.d.results;
     
            if (items.length > 0) {
                var title = items[0].Title;
                if (title == null) {
                    title = "";
                }
                $('#txtEditEventItemTitle').val(title);
                var txtLocation = items[0].Location;
                if (txtLocation == null) {
                    txtLocation = "";
                }
                $('#txtEditEventItemLocation').val(txtLocation);

                var txtEventDate = items[0].EventDate;
                if (txtEventDate != null) {
                    $('#txtEditEventStartDate').val(dateTimeFormat(txtEventDate));
                    GetDateFromHHSS(titanForWork.convertJSONDateAMPMWithDate(txtEventDate));
                }
                var txtEndDate = items[0].EndDate;
                if (txtEndDate != null) {
                    $('#txtEditEventEndDate').val(dateTimeFormat(txtEndDate));
                    GetDateToHHSS(titanForWork.convertJSONDateAMPMWithDate(txtEndDate));
                }
                var txtDescription = items[0].Description;
                if (txtDescription == null) {
                    txtDescription = "";
                }
                if (txtDescription.match("https"))
                {
                   var strsplit = txtDescription.split("https");
                   var removespl = strsplit [1].slice(5);
                   var txtDescription=strsplit[0] +"https:"+removespl;
                   $('#txtEditEventDescription').text(txtDescription);
                }
                else{
                      $('#txtEditEventDescription').text(txtDescription);
                }

                  
                var txtCategory = items[0].Category;
                if (txtCategory == null) {
                    txtCategory = "";
                }
                $('#ddlEditEventCategory').val(txtCategory);
                var txtDepartment = items[0].Department;
                if (txtDepartment == null) {
                    Department = "";
                }
                $('#ddlNewEditEventDepartment').val(txtDepartment);
                var ChooseImage = items[0].ChooseImage;
                if (ChooseImage == "Upload") {
                    $("#fileeditUpload").show();
                    $("#imageeditSliderDiv").hide();
                    $("#check1").show();
                    $("#selctimage1").val(ChooseImage);
                    var Picture = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    $('#blah1').attr('src', Picture);
                    $("#selctimage1").change(function () {
                        var imageText = $(this).find("option:selected").text();
                        var imageValue = $(this).val();
                        if (imageValue == "Choose from Gallery") {
                            $("#imageeditSliderDiv").show();
                            $("#fileeditUpload").hide();
                        }
                        else if (imageValue == "Upload") {
                            $("#fileeditUpload").show();
                            $("#imageeditSliderDiv").hide();
                        }
                    });
                }
                if (ChooseImage == "Choose from Gallery") {
                    $("#imageeditSliderDiv").show();
                    $("#fileeditUpload").hide();
                    $("#check1").show();
                    $("#selctimage1").val(ChooseImage);
                    var txtImageURL = items[0].ImageURL;
                    $('#txtEditEventUrl').val(txtImageURL);
                    $("#selctimage1").change(function () {
                        var imageText = $(this).find("option:selected").text();
                        var imageValue = $(this).val();
                        if (imageValue == "Choose from Gallery") {
                            $("#imageeditSliderDiv").show();
                            $("#fileeditUpload").hide();
                        }
                        else if (imageValue == "Upload") {
                            $("#fileeditUpload").show();
                            $("#imageeditSliderDiv").hide();
                        }
                    });
                }

            }
        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
}

function GetDateFromHHSS(fromDateTime) {
    var getDateinFormat = fromDateTime;
    var datesplit = getDateinFormat.split(' ');
    var fullTime = datesplit[3];
    var dateTimeSplitValue = fullTime.split(':');
    var timeInHH = dateTimeSplitValue[0];
    var timeInSS = dateTimeSplitValue[1];
    if (dateTimeSplitValue[1].length == 1) {
        timeInSS = "0" + timeInSS;
    }
    var amPM = datesplit[4];
    var completeTimeINHH = timeInHH + " " + amPM;
    $('#ddlEditEvetStartTime').val(completeTimeINHH);
    $('#ddlEditEvetStartMinutes').val(timeInSS);
}
function GetDateToHHSS(toDateTime) {
    var getDateinFormat = toDateTime;
    var datesplit = getDateinFormat.split(' ');
    var fullTime = datesplit[3];
    var dateTimeSplitValue = fullTime.split(':');
    var timeInHH = dateTimeSplitValue[0];
    var timeInSS = dateTimeSplitValue[1];
    if (dateTimeSplitValue[1].length == 1) {
        timeInSS = "0" + timeInSS;
    }
    var amPM = datesplit[4];
    var completeTimeINHH = timeInHH + " " + amPM;
    $('#ddlEditEvetEndTime').val(completeTimeINHH);
    $('#ddlEditEvetEndMinutes').val(timeInSS);
}

function dateTimeFormat(dateTimeValue) {
    var dt = new Date(dateTimeValue);
    var dateTimeFormat = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
    return dateTimeFormat;
}

function getEventCategory(categorName, databind) {
    var listName = 'CategoryMaster';
    var lengt = 0;
    var Categorytype = "";
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$filter=CategoryType eq '" + categorName + "' and Status eq 'Yes' &$orderBy=CatogeryName asc";
    if (databind == "dropdown") {
        $('#ddlEditEventCategory').empty();
       siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$filter=CategoryType eq '" + categorName + "' and Status eq 'Yes' &$orderBy=CatogeryName asc";   
        }
    if (databind == "dropdown") {
        $('#FilterEditEventCateory').empty();
       siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$filter=CategoryType eq '" + categorName + "' and Status eq 'Yes' &$orderBy=CatogeryName asc";
     }
    if (databind == "dropdown") {
        $('#ddlNewEventCategory').empty();
       siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$filter=CategoryType eq '" + categorName + "' and Status eq 'Yes'&$orderBy=CatogeryName asc";    
     }


    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            var items = data.d.results;
            Categorytype = "Event";
            $("#ddlEditEventCategory").append($("<option>Select Category</option>").attr("value", ""));
            $("#FilterEditEventCateory").append($("<option>For All</option>").attr("value", "all"));
            $("#ddlNewEventCategory").append($("<option>Select Category</option>").attr("value", "Select Category"));
            for (var index = 0; index < items.length; index++) {
                if (categorName.toLowerCase() == items[index].CatogeryName.toLowerCase()) {
                    lengt = 1;
                }
                if (databind == "dropdown") {
                    if (Categorytype == items[index].CategoryType) {
                        $("#ddlEditEventCategory").append($("<option></option>").attr("value", items[index].CatogeryName).text(items[index].CatogeryName));
                        $("#FilterEditEventCateory").append($("<option></option>").attr("value", items[index].CatogeryName).text(items[index].CatogeryName));
                        $("#ddlNewEventCategory").append($("<option></option>").attr("value", items[index].CatogeryName).text(items[index].CatogeryName));

                    }
                }
            }

        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
    return lengt;
}
 


//Delete Event 
function DeleteEventListItem(eventId) {
    if (confirm("Do you want to delete this Event ?")) {
        var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
        var apiPath = companySiteUrlLink + "/_api/lists/getbytitle('Event')/items/getbyid(" + eventId + ")";
        $.ajax({
            url: apiPath,
            type: "POST",
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            async: true,
            success: function (data) {
            titanForWork.GetItemIDOfApprovalTaskList(eventId, titanForWork.getQueryStringParameter('CompanyId'), "Events").done(function (requestItemID) {
            titanForWork.DeleteTaskItem(requestItemID);				// Delete Approval Task Item As Well.
            })

                 
                $("#myViewEventModal").modal('hide');
                alert("Event Deleted successfully");
                location.reload();
            },
            eror: function (data) {
                console.log("An error occurred. Please try again.");
            }
        });
    }
}
var filterCategoryType = "";
function Retreive() {
    
    var companySiteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
      
    var requestURI = companySiteURL + "/_api/Web/Lists/GetByTitle('Event')/Items?$select=Title,Id,Description,Department,Category,Location,EventDate,EndDate,fAllDayEvent,Author/ID,ApprovalStatus&$expand=Author&,fRecurrence&$top=500";
        // var requestURI =  companySiteURL + "/_api/Web/Lists/GetByTitle('Event')/Items?select=Author/ID&$filter=Department eq '"+filterCategoryType+"'&$orderby=ID desc ";
    $.ajax({
        url: requestURI,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
              
            var items = data.d.results;
            for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
                var fADE = items[itemIndex].fAllDayEvent;
                var thisADE;
                if (fADE != null) {
                    if (fADE == 0) {
                        thisADE = false
                    }
                    else {
                        thisADE = true;
                    }
                }
                var thisID = items[itemIndex].Id;
                var thisTitle = items[itemIndex].Title;
                var thisRecurrence = items[itemIndex].fRecurrence;
                var thisDesc = items[itemIndex].Description;
               

                 //For end event with exact date 
                 var x = new Date(items[itemIndex].EventDate);
                 var enddate=new Date(items[itemIndex].EndDate);
                  var currentDate = enddate.getDate()
                 var fina=enddate.setDate(currentDate + 1)
                 var hr = enddate.toLocaleString();
                 var local_time=hr.split(',');
                 var time_y=local_time[1];
                 var t="12:00:00AM";
                 if(time_y.match("AM"))
                  {
                  //var y= u.setDate(u.getDate() + 1);
                  var y=enddate.setDate(currentDate + 1)

                  }
                  else if (time_y.match("PM")){
                     var y=new Date(items[itemIndex].EndDate);
                  }
                var aproval = items[itemIndex].ApprovalStatus;
                var author = items[itemIndex].Author.ID;
                   
                var eventColor;
                
                if (aproval == "Pending"|| aproval =="Initiated") {
                    eventColor = 'blue';
                } else if (aproval == "Approved") {
                    eventColor = 'green';
                }
                else if (aproval == "Rejected") {
                    eventColor = 'red';
                }
                else if (aproval == "Cancelled") {
                    eventColor = 'Orange';
                }


                if (aproval == "Approved" || aproval == "Cancelled"  || ((aproval == "Pending"|| aproval =="Initiated") && author == userid ) || (aproval == "Rejected" && author == userid )) {
                    ele.push({
                        title: items[itemIndex].Title,
                        id: items[itemIndex].Id,
                        start: x ,
                        department: items[itemIndex].Department,
                        category: items[itemIndex].Category,
                        description: items[itemIndex].Description,
                        location: items[itemIndex].Location,
                        end: y ,
                        url: 'javascript:LoadCurrentEventFunction(' + thisID + ')',
                        backgroundColor: eventColor,
                        allDay: thisADE,
                    });
                }

            }
            BindCalendar();
        },
        error: function (data) { }
    });
}
function BindCalendar() {
    var calendarioDiv = $('#calendar');
    var fullCalendar = calendarioDiv.fullCalendar({

        events: ele,
        timeFormat: 'hh:mm a' + ",",

        error: function () {
            alert('Error');
        },
         //Filters for calander events
        eventRender: function (event, element, view) {
            var showDepartmanet, showCategory, showSearchTerms = true, showSearchLocation = true;
            var Category = $('#FilterEditEventCateory').val();
            var Department = $('#FilterEditEventDepartment').val();
            var search = $('#searchTerm').val();
            var searchTerms = search.toLowerCase(); 
            var searchLoc  = $('#searchLocation').val();
            var searchLocation = searchLoc.toLowerCase();  
            
            if (searchTerms.length > 0) {
                showSearchTerms = event.title.toLowerCase().indexOf(searchTerms) >= 0 || event.description.toLowerCase().indexOf(searchTerms) >= 0;
            }
            if (searchLocation.length > 0) {
                showSearchLocation = event.location.toLowerCase().indexOf(searchLocation) >= 0;
            }

 
            if (Category && Category.length > 0) {
                if (Category === "all") {
                    showCategory = true;
                }
                else {
                    showCategory = Category.indexOf(event.category) >= 0;
                }
            }
            if (Department && Department.length > 0) {
                if (Department === "all") {
                    showDepartmanet = true;
                }
                else {
                    showDepartmanet = Department.indexOf(event.department) >= 0;
                }
            }
            return showCategory && showDepartmanet && showSearchLocation && showSearchTerms;
        },
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
        },
        editable: true,
        firstDay: 1,
        monthNames: ['JANUARY', 'FEBRUARY',
            'MARCH', 'APRIL', 'MAY',
            'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER',
            'OCTOBER', 'NOVEMBER', 'DECEMBER'
        ],
        dayNames: ['Sunday', 'Monday', 'Tuesday',
            'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ],
        dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        allDay: false
    });

    $('#FilterEditEventDepartment').on('change', function () {
        var filter = $('#FilterEditEventDepartment').val();
        $('#calendar').fullCalendar('rerenderEvents');
    })
    $('#FilterEditEventCateory').on('change', function () {

        var filter = $('#FilterEditEventDepartment').val();
        $('#calendar').fullCalendar('rerenderEvents');
    })
    $('#searchTerm').on('input', function () {

        $('#calendar').fullCalendar('rerenderEvents');
    });
    $('#searchLocation').on('input', function () {
        $('#calendar').fullCalendar('rerenderEvents');
    });

}


var ApprovalStatus = '';
function LoadCurrentEventFunction(curenntMeetingId) {

    $('.addClickEditCompanyEvent').hide();
    $('.deleteClickEditCompanyEvent').hide();
    globalEventId = curenntMeetingId;

    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var listName = 'Event';
    var siteURL = companySiteUrlLink + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,Title,Location,EventDate,EndDate,Description,Category,Department,ChooseImage ,ImageURL,Author/ID,ApprovalStatus&$expand=Author&$filter=ID eq '" + curenntMeetingId + "'&$expand=AttachmentFiles";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
           

            $("#myViewEventModal").modal('show');
            var items = data.d.results;
            if (items.length > 0) {
                var title = items[0].Title;
                if (title == null) {
                    title = "";
                }
                $('#labelEventTitle').text(title);
                var txtLocation = items[0].Location;
                if (txtLocation == null) {
                    txtLocation = "";
                }
                $('#labelLocation').text(txtLocation);

                var txtEventDate = items[0].EventDate;
                if (txtEventDate != null) {
                    $('#labelStartDateTime').text(convertJSONDateAMPMWithDate(txtEventDate));
                }
                var txtEndDate = items[0].EndDate;
                if (txtEndDate != null) {
                    $('#labelEndDateTime').text(convertJSONDateAMPMWithDate(txtEndDate));
                }
                var txtDescription = items[0].Description;
                if (txtDescription == null) {
                    txtDescription = "";
                }
                if (txtDescription.match("https"))
                {
                   var strsplit = txtDescription.split("https");
                   var removespl = strsplit [1].slice(5);
                   var txtDescription=strsplit[0] +"https:"+removespl;
                   $('#lblNewEventDescription').text(txtDescription);
                }
                else{
                      $('#lblNewEventDescription').text(txtDescription);
                }
                var txtCategory = items[0].Category;
                if (txtCategory == null) {
                    txtCategory = "";
                }
                $('#labelNewEventCategory').text(txtCategory);
                var txtDepartment = items[0].Department;
                if (txtDepartment == null) {
                    txtDepartment = "";
                }
                $('#labelDepartment').text(txtDepartment);
                var ChooseImage = items[0].ChooseImage;
                $('#slctimage').text(txtDepartment);

                if (ChooseImage == "Upload") {
                    var Picture = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    var image = $('#labelImageURL');
                    if (txtImageURL == null) {
                        txtImageURL = "";
                    }
                    // $('#labelImageURL').text(txtImageURL);
                    image[0].src = Picture;
                }
                else {
                    var txtImageURL = items[0].ImageURL;
                    var image = $('#labelImageURL');

                    if (txtImageURL == null) {
                        txtImageURL = "";
                    }
                    // $('#labelImageURL').text(txtImageURL);
                    image[0].src = txtImageURL;
                }
                ApprovalStatus = items[0].ApprovalStatus;
               var author = items[0].Author.ID;
                $('#labelStatus').text(ApprovalStatus);
                
                
              if (ApprovalStatus == "Approved" && userid == author) {
              			//if(teamsapp==0)
                        	$(".addToCalender").show();
                       // $(".revokeFromCalender").show();
                        $('.addClickEditCompanyEvent').show();
                       $('.deleteClickEditCompanyEvent').show();

               }
                if (ApprovalStatus == "Approved")
                {
                	//if(teamsapp==0)
	                    $(".addToCalender").show();
                    $(".revokeFromCalender").hide();
                 }   
             
                if (ApprovalStatus == "Cancelled"){
                   $(".revokeFromCalender").show();
                }

           
                // if(compareStartDateEndDateCurrentTimeCompare(txtEventDate)==true)
                {
                    if ((ApprovalStatus == "Pending"||ApprovalStatus =="Initiated") && userid == author) {
                        $(".addToCalender").hide();
                        $(".revokeFromCalender").hide();
                        $('.addClickEditCompanyEvent').show();
                        $('.deleteClickEditCompanyEvent').show();
                    }
                    if (ApprovalStatus == "Rejected" && userid == author) {
                        $(".addToCalender").hide();
                        $(".revokeFromCalender").hide();
                        $('.deleteClickEditCompanyEvent').show();
                    }
                }
            }
        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });

}

function CheckUserInProcessApprover() {
    var deferred = $.Deferred();
    var companyId = titanForWork.getQueryStringParameter('CompanyId');
    var webPartCollection = new Array();
    webPartCollection.push("Events");

    var users = UserExistInProcessApprover(companyId, "", webPartCollection);
    for (var collectionIndex = 0; collectionIndex < users.length; collectionIndex++) {
        if (users[collectionIndex].webPartName == "Events" && users[collectionIndex].permissionLevel == "Contribution") {
            IsEventsAdmin = true;
            deferred.resolve();
        }
    }
    return deferred;
}
function compareStartDateEndDateCurrentTimeCompare(startDate) {

    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var currentdateandTime = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    var datec = new Date(currentdateandTime);
    var kdate = new Date(startDate);

    if (kdate < datec) {
        // alert("StartTime can't be less than the current time.");
        return false;
    }

    return true;
}

function convertJSONDateAMPMWithDate(jsonDateTime) {

    var date = new Date(jsonDateTime);
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear() + " " + strTime;
    // return monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + strTime;
}

function getEventDepartment(DepartmentsName, databind) {
    var companyId = titanForWork.getQueryStringParameter('CompanyId');
    var listName = 'Departments';
    var lengt = 0;
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,DepartmentName&$filter=DepartmentName eq '" + DepartmentsName + "' and  CompanyID eq '" + companyId + "' &$orderBy=DepartmentName asc";
    if (databind == "dropdown") {
        $('#ddlNewEditEventDepartment').val();
        siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=*&$filter=CompanyID eq '" + companyId + "' &$orderBy=DepartmentName asc";
    }
    if (databind == "dropdown") {
        $('#FilterEditEventDepartment').empty();
        siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=*&$filter=CompanyID eq '" + companyId + "' &$orderBy=DepartmentName asc";

    }
    if (databind == "dropdown") {
        $('#ddlNewEventDepartment').empty();
        siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=*&$filter=CompanyID eq '" + currentCompanyid + "' &$orderBy=DepartmentName asc";
    }


    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            var items = data.d.results;
            $("#ddlNewEditEventDepartment").append($("<option>  Department</option>").attr("value", ""));
            $("#FilterEditEventDepartment").append($("<option>For All</option>").attr("value", "all"));
            $("#ddlNewEventDepartment").append($("<option> Select Department </option>").attr("value", "Select Department"));


            for (var index = 0; index < items.length; index++) {
                if (DepartmentsName.toLowerCase() == items[index].DepartmentName.toLowerCase()) {
                    lengt = 1;
                }
                if (databind == "dropdown") {
                    $("#ddlNewEditEventDepartment").append($("<option></option>").attr("value", items[index].DepartmentName).text(items[index].DepartmentName));
                    $("#FilterEditEventDepartment").append($("<option></option>").attr("value", items[index].DepartmentName).text(items[index].DepartmentName));
                    $("#ddlNewEventDepartment").append($("<option></option>").attr("value", items[index].DepartmentName).text(items[index].DepartmentName));

                }

            }

        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
    return lengt;
}

function LoadEditMyPicture() {

     $.when(RetrieveImageAsync()).then(function (imageInfo) {
        var len = imageInfo.results;
        var DivTr;
        var src;
        var count = 0;
        src = $("#mySliderDiv");
        //var div;
        for (var i = 0; i < len.length; i++) {
            var imagefile = imageInfo.results[i].EncodedAbsUrl;
            var Title = imageInfo.results[i].Title;

            //$('#ImageUrl').prop('src', imagefile);Keywords
            //var img = new Image(100,50);
            //var img = document.createElement('img');
            //img.className="slider-img-height panel-default";
            ///var img = new Image(100,50);
            //img.src = imagefile; 
            if (Title == "EVENT") {
                if (i == 0) {
                    src.append('<img  width="100%"  src="' + imagefile + '">');
                }
                else {
                    src.append('<img  width="100%" src="' + imagefile + '">');
                }
            }
        }
        $('#mySliderDiv img').click(function () {
            // alert($(this).attr('src'));
            $('#txtEditEventUrl').val($(this).attr('src'));
            $(this).toggleClass('my_event_active').siblings().removeClass('my_event_active');
        });
    });
}
function RetrieveImageAsync() {
    var dfd = new jQuery.Deferred(); //deferred object

    var siteurl = _spPageContextInfo.webServerRelativeUrl;
    var executor = new SP.RequestExecutor(siteurl);
    executor.executeAsync(
        {
            url: siteurl + "//_api/Web/Lists/GetByTitle('ImageGallery')/items?$select=EncodedAbsUrl,Title&$top=500",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: successHandler,
            error: errorHandler
        });
    function successHandler(data) {

        var jsonObject = JSON.parse(data.body);
        var data = jsonObject.d;
        dfd.resolve(data);
    }

    function errorHandler(data, errorCode, errorMessage) {
        alert(errorMessage);
        dfd.reject(errorMessage);

    }

    // Return the Promise so caller can't change the Deferred
    return dfd.promise();

}







$(window).load(function () {
    
    
    LoadMyPictures();
    $("#selctimage").change(function () {
        var imageText = $(this).find("option:selected").text();
        var imageValue = $(this).val();
        if (imageValue == "Choose from Gallery") {
            $("#imageSliderDiv").show();
            $("#fileUpload1").hide();
        }
        else if (imageValue == "Upload") {
            $("#fileUpload1").show();
            $("#imageSliderDiv").hide();
        }
    });
    //Add Attachements
    var file = document.getElementById('fileupload');
    file.onchange = function (e) {

        var ext = this.value.match(/\.([^\.]+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'JPG':
            case 'JPEG':
            case 'jpeg':
            case 'GIF':
            case 'gif':
            case 'PNG':
            case 'png':

                var size = this.files[0].size / 1024;
                if (size.toFixed(2) > 50) {
                    alert("Image size not more then 50 KB");
                    this.value = '';
                }
                else {
                    document.getElementById('blah').src = window.URL.createObjectURL(this.files[0]);

                }
                break;
            default:
                alert('Please select image files of JPEG, JPG, GIF and PNG formatted only.');
                this.value = '';
        }
    };




    $('#txtEventStartDate').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 0,
        yearRange: "0:+2"

    });
    $('#txtEventStartDate').datepicker("option", "dateFormat", "dd/mm/yy").datepicker("setDate", "0");
    $('#txtEventEndDate').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 0,
        yearRange: "0:+2"

    });
    $('#txtEventEndDate').datepicker("option", "dateFormat", "dd/mm/yy").datepicker("setDate", "0");

    $(".EventAdd").unbind().click(function () {
       if(UserAuthorization==false){
         alert("You are not authorised to add Event");
           return false;
       }
        
        $("#myAddNewEventModal").modal('show');
        var dropDownCategory = document.getElementById("ddlNewEventCategory");
        dropDownCategory.selectedIndex = 0;
        var dropDownDepartment = document.getElementById("ddlNewEventDepartment");
        dropDownDepartment.selectedIndex = 0;
        var ddlEvetStartTime = document.getElementById("ddlEvetStartTime");
        ddlEvetStartTime.selectedIndex = 0;
        var ddlEvetEndTime = document.getElementById("ddlEvetEndTime");
        ddlEvetEndTime.selectedIndex = 0;
        var ddlEvetStartMinutes = document.getElementById("ddlEvetStartMinutes");
        ddlEvetStartMinutes.selectedIndex = 0;
        var ddlEvetEndMinutes = document.getElementById("ddlEvetEndMinutes");
        ddlEvetEndMinutes.selectedIndex = 0;


        $('#txtEventItemTitle').val('');
        $('#txtEventItemLocation').val('');
        $('#selctimage').val('--Choose Option--');
        $('#fileupload').val('');
        $('#txtEventUrl').val('');
        $('#txtNewEventDescription').val('');
        $('#txtEventUrl').val('');
        $('#txtEventStartDate').datepicker("option", "dateFormat", "dd/mm/yy").datepicker("setDate", "0");
        $('#txtEventEndDate').datepicker("option", "dateFormat", "dd/mm/yy").datepicker("setDate", "0");
        $("#imageSliderDiv").hide();
        $("#fileUpload1").hide();
    });

    $(".addnewCategoryModel").unbind().click(function () {

        $("#myEventCategoryModal").modal('show');
        $('#txtcategory').val('');

    });
    $(".addnewCategory").click(function () {

        $("#myEventCategoryModal").modal('show');
        var txtcategory = $('#txtcategory').val().trim();
        if (txtcategory.length == 0) {
            alert('Please enter category name.');
            return false;
        }
        var categoryCounts = getEventCategory(txtcategory, "");
        if (categoryCounts > 0) {
            alert('Category name already exist.');
            return false;
        }
        AddEventCategory(txtcategory);
    });


     $(".addNewCompanyEvent").click(function () {
           
        var ListName = "Event";
        var startHoursWithMinutes = $('#ddlEvetStartTime').val().split(' ')[0] + ":" + $('#ddlEvetStartMinutes').val() + " " + $('#ddlEvetStartTime').val().split(' ')[1];
        var endHoursWithMinutes = $('#ddlEvetEndTime').val().split(' ')[0] + ":" + $('#ddlEvetEndMinutes').val() + " " + $('#ddlEvetEndTime').val().split(' ')[1];
        var txtEventItemTitle = $('#txtEventItemTitle').val().trim();
        var txtEventUrl = $('#txtEventUrl').val().trim();
         
        
        
        var ddlNewEventCategory = $('#ddlNewEventCategory').val();
        if (ddlNewEventCategory == "Select Category" || ddlNewEventCategory == null || ddlNewEventCategory == "") {
            alert('Please select event category.');
            return false;
        }
        if (txtEventItemTitle.length == 0) {
            alert('Please enter Title');
            return false;
        }


        else if (txtEventItemTitle.length > 250) {
            alert('Event title maximum 250 characters allowed.');
            return false;
        }

        var txtEventItemLocation = $('#txtEventItemLocation').val().trim();
        if (txtEventItemLocation.length == 0) {
            alert('Please enter Location');

            return false;
        }
        else if (txtEventItemLocation.length > 250) {
            alert('Event Location maximum 250 characters allowed.');
            return false;

        }
        var txtEventStartDate = ConvertMMDDYYYY($('#txtEventStartDate').val()) + " " + startHoursWithMinutes;
        var txtEventEndDate = ConvertMMDDYYYY($('#txtEventEndDate').val()) + " " + endHoursWithMinutes;
        var txtNewEventDescription = $('#txtNewEventDescription').val().trim();
        if (txtNewEventDescription.length == 0) {
            alert('Please enter Description');
            return false;
        }
        



        var ddlEvetStartTime = $('#ddlEvetStartTime').val();
        var ddlEvetEndTime = $('#ddlEvetEndTime').val();

        if (ddlEvetStartTime == 00) {
            alert('Please select start Time.');
            return false;
        }
        if (ddlEvetEndTime == 00) {
            alert('Please select End Time.');
            return false;
        }
        var ddlNewEventDepartment = $('#ddlNewEventDepartment').val();
        if (ddlNewEventDepartment == "Select Department" || ddlNewEventDepartment == null || ddlNewEventDepartment == "Select Department") {
            alert('Please select event Department.');
            return false;
        }
        var ChooseImage = $('#selctimage').val();
        if (ChooseImage  =="--Choose Option--" || ChooseImage == null || ChooseImage == "") {
            alert('Please Choose Image.');
            return false;
        }
        if (ChooseImage == "Choose from Gallery") {
            if (txtEventUrl.length == 0) {
                alert('Please select event Image.');
                return false;
            }
        }
        if (ChooseImage == "Upload") { 
            if (document.getElementById("fileupload").files.length <= 0){
                alert('Please select event upload Image.');
                return false;
            }
        }

        if (compareStartDateEndDate(txtEventStartDate, txtEventEndDate) == false) {
            return false;
        }
        AddNewEventsMetadata(txtEventItemTitle, txtEventItemLocation, txtEventStartDate, txtEventEndDate, txtNewEventDescription, ddlNewEventCategory, ddlNewEventDepartment, ChooseImage, txtEventUrl);

    });
    $(".closeEventForm").click(function () {

        $("#myAddNewEventModal").modal('hide');
    });


});

function AddNewEventsMetadata(evetTitle, txtEventItemLocation, thisEventDate, thisEventEndDate, eventDescription, eventCategory, eventDepartment, ChooseImage, eventImageURL) {

    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var ListName = "Event";
    var Metadata;
    var ItemType = GetItemTypeForListNameDetails(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: evetTitle,
        Location: txtEventItemLocation,
        EventDate: thisEventDate,
        EndDate: thisEventEndDate,
        Description: eventDescription,
        Category: eventCategory,
        ChooseImage: ChooseImage,
        Department: eventDepartment,
        ImageURL: eventImageURL,

    };

    if (evetTitle == null || evetTitle == "") {
        delete Metadata["Title"];
    }
    if (txtEventItemLocation == null || txtEventItemLocation == "") {
        delete Metadata["Location"];
    }
    if (thisEventDate == null || thisEventDate == "") {
        delete Metadata["EventDate"];
    }
    if (thisEventEndDate == null || thisEventEndDate == "") {
        delete Metadata["EndDate"];
    }
    if (eventDescription == null || eventDescription == "") {
        delete Metadata["Description"];
    }
    if (eventCategory == null || eventCategory == "") {
        delete Metadata["Category"];
    }
    if (eventDepartment == null || eventDepartment == "") {
        delete Metadata["Department"];
    }
    if (eventImageURL == null || eventImageURL == "") {
        delete Metadata["ImageURL"];
    }


    $.when(AddNewEvents(ListName, Metadata, companySiteUrlLink)).done(function (itemresponse) {

        if (document.getElementById("fileupload").files.length > 0) {

            AddAttachments(itemresponse.d.Id);
        } else {
        }
        $("#myAddNewEventModal").modal('hide');
        var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
        var clientContext = new SP.ClientContext(companySiteUrlLink);

        alert('Event created successfully');
        // Add Notification into Notification List.
        NotificationCenter(evetTitle, eventDescription, txtEventItemLocation, eventCategory, thisEventDate, thisEventEndDate, false);

        var itemID = itemresponse.d.Id;
        var companyId = titanForWork.getQueryStringParameter('CompanyId');

        titanForWork.CreateWorkflowTaskForApproval(itemID, companyId, 0, "Events", evetTitle, eventDescription, eventCategory).done(function (response) {
            console.log("Response from titanForWork.CreateWorkflowTaskForApproval : " + response);
            if (response == "ApprovalNotRequired")			// Approval Not Required.
            {
                AutoApproveAnnouncement(companySiteUrlLink, itemID);		// Automatically approved. No approval required.
            }

            BindCalendarEvents(clientContext);
            location.reload();

        });

    });
}
var Images = [];
var AddImage = [];

$(function () {
    $("#fileupload").on('change', function (e) {
        ProfileImage = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            AddImage[Images.length] = elm;
        });

    });
})

var GetImageBuffer = function (AddImage) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }

    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(AddImage);
    return deferred.promise();
};

var xRequestDigest = $("#__REQUESTDIGEST").val();
function AddAttachments(itemresponse) {
    if (AddImage.length > 0) {
        $.each(AddImage, function (index, value) {
           
            var fileName=value.name;                        //Remove Special characts from filename
            var fileNameSplit=fileName.split('.');
            var fileExt=fileNameSplit[fileNameSplit.length - 1];
            var fileLength=fileExt.length;
            var fileSCR=fileName.replace(/[^a-zA-Z]/g, "");
            var fileslice;
           
            if(fileLength==3){
            fileslice= fileSCR.slice(0,-3);
            }
            if(fileLength==4){
            fileslice= fileSCR.slice(0,-4);
            }          
            var newFileName=(fileslice+"."+fileExt);
            GetImageBuffer(value).then(function (buffer) {
                $.ajax({
                    url: titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/getbytitle('Event')/items(" + itemresponse + ")/AttachmentFiles/add( FileName='" + newFileName+ "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
                    {
                        "Accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose",
                        "X-RequestDigest": xRequestDigest
                    },
                    success: function (data) { console.log("Image Upload"); },
                    error: function (data) {
                        console.log(data.responseText.error);
                        //alert(data.responseText);
                    }
                });
            });
        });
    }
}


 
var curreWbeurl = "";
function getCurrentURL_Event() {

    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    //var listName = 'Companies';
    //var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    //var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,SiteURL&$filter=ID eq '" + txtCompanyId + "'";
    //$.ajax({
    //    url: siteURL,
    //    headers: { Accept: "application/json;odata=verbose" },
    //    async: false,
    //    success: function (data) {
    //        var items = data.d.results;
    //        if (items.length > 0) {
    var siteURL = companySiteUrlLink;// items[0].SiteURL;
    var clientContext = new SP.ClientContext(siteURL);
    curreWbeurl = siteURL;
    BindCalendarEvents(clientContext);
    //        }

    //    }, eror: function (data) {
    //        console.log($('#txtSomethingWentWrong').val());
    //    }
    //});   

}

///////// Choose any image function////////


function LoadMyPictures() {

    //var image = $("#ImageUrl");
    //var slider=$("#ImageDiv").lightSlider(); 


    $.when(RetrieveImageAsyncs()).then(function (imageInfo) {
        var len = imageInfo.results;
        var DivTr;
        var src;
        var count = 0;
        src = $("#mySliderDivs");
        //var div;
        for (var i = 0; i < len.length; i++) {
            var imagefile = imageInfo.results[i].EncodedAbsUrl;
            var Title = imageInfo.results[i].Title;

            //$('#ImageUrl').prop('src', imagefile);Keywords
            //var img = new Image(100,50);
            //var img = document.createElement('img');
            //img.className="slider-img-height panel-default";
            ///var img = new Image(100,50);
            //img.src = imagefile; 
            if (Title == "EVENT") {
                if (i == 0) {
                    src.append('<img  width="100%"  src="' + imagefile + '">');
                }
                else {
                    src.append('<img  width="100%" src="' + imagefile + '">');
                }
            }
        }
        $('#mySliderDivs img').click(function () {
            // alert($(this).attr('src'));
            $('#txtEventUrl').val($(this).attr('src'));
            $(this).toggleClass('my_event_active').siblings().removeClass('my_event_active');
        });
    });
}

function RetrieveImageAsyncs() {
    var dfd = new jQuery.Deferred(); //deferred object

    var siteurl = _spPageContextInfo.webServerRelativeUrl;
    var executor = new SP.RequestExecutor(siteurl);
    executor.executeAsync(
        {
            url: siteurl + "//_api/Web/Lists/GetByTitle('ImageGallery')/items?$select=EncodedAbsUrl,Title&$top=500",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: successHandler,
            error: errorHandler
        });
    function successHandler(data) {

        var jsonObject = JSON.parse(data.body);
        var data = jsonObject.d;
        dfd.resolve(data);
    }

    function errorHandler(data, errorCode, errorMessage) {
        alert(errorMessage);
        dfd.reject(errorMessage);

    }

    // Return the Promise so caller can't change the Deferred
    return dfd.promise();

}



 

function AutoApproveAnnouncement(companySiteUrlLink, itemID) {
    var Handler = this;
    var deferred = $.Deferred();

    var ListName = 'Event';

    var itemType = GetItemTypeForListName(ListName);

    var Metadata = { "__metadata": { 'type': itemType } };
    Metadata["ApprovalStatus"] = "Approved";

    var requestURL = companySiteUrlLink + "/_api/web/lists/getbytitle('" + ListName + "')/items(" + itemID + ")";
    var headersData = {
        "accept": "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        "content-Type": "application/json;odata=verbose",
        "X-Http-Method": "PATCH",
        "If-Match": '*'
    };

    $.ajax({
        url: requestURL,
        type: "POST",
        async: false,
        headers: headersData,
        data: JSON.stringify(Metadata),
        success: function (dataD) {
            deferred.resolve(dataD);
        },
        error: function (error) {
            deferred.reject(error);
        }
    });
    return deferred.promise();
}


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Add Notification into Notification Center List  //////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function NotificationCenter(title, description, location, category, eventStartDate, eventEndDate, itemUpdated) {
    try {
        var webPartName, description;
        if (itemUpdated == false) {
            description = "New event " + title + " has been posted.<br/><br/>"
            webPartName = "Events";
        }
        else {
            description = "Event " + title + " has been modified.<br/><br/>"
            webPartName = "Events (Revised)";
        }

        description += "Event start date : " + eventStartDate + "<br/>";
        description += "Event end date : " + eventEndDate + "<br/>";
        description += "Location : " + location + "<br/>";
        description += "Category : " + category + "<br/>";
        description += "Posted by : " + _spPageContextInfo.userDisplayName + "";

        var companyId = titanForWork.getQueryStringParameter('CompanyId');
        var Metadata;
        var ItemType = GetItemTypeForListName("NotificationCenter");
        Metadata = {
            __metadata: {
                'type': ItemType
            },

            Title: title,
            Details: description,
            WebpartName: webPartName,
            CompanyIdId: companyId
        };
        AddItemIntoNotificationCenter("NotificationCenter", Metadata);
    }
    catch (error) {
        console.log(error.message);
    }
}

function AddItemIntoNotificationCenter(ListName, Metadata) {
    var requestURI = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items";

    var dfd = $.Deferred();
    $.ajax({
        url: requestURI,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            dfd.resolve(data);
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
/////////////////////////////////////////////////////////////////////



function AddEventCategory(eventCategory) {
    var companySiteUrlLink = _spPageContextInfo.webAbsoluteUrl;
    var ListName = "EventCategory";
    var Metadata;
    var ItemType = GetItemTypeForListNameDetails(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: eventCategory
    };

    if (eventCategory == null || eventCategory == "") {
        delete Metadata["Title"];
    }

    $.when(AddNewEvents(ListName, Metadata, companySiteUrlLink)).done(function (itemresponse) {
        alert('Event category created.');
        $("#myEventCategoryModal").modal('hide');
        getEventCategory("Event", "dropdown");
        getMeetingCategory("", "dropdown");
    });
}
function AddNewEvents(ListName, Metadata, companySitesURL) {
    var dfd = $.Deferred();
    $.ajax({
        url: companySitesURL + "/_api/web/lists/getbytitle('" + ListName + "')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {

            dfd.resolve(data);

        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
function GetItemTypeForListNameDetails(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}


function BindCalendarEvents(clientContext) {
    //var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");

    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    //var clientContext = new SP.ClientContext.get_current();

    var oList = clientContext.get_web().get_lists().getByTitle('Event');
    var camlQuery = new SP.CamlQuery();
    var camlXML = "<View><Query><Where><And><Or><Geq><FieldRef Name='EventDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + today + "</Value></Geq><Geq><FieldRef Name='EndDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + today + "</Value></Geq></Or><Eq><FieldRef Name='ApprovalStatus' /><Value Type='Choice'>Approved</Value></Eq></And></Where><OrderBy><FieldRef Name='EventDate' Ascending='TRUE'/><FieldRef Name='ID' Ascending='False'/></OrderBy></Query><RowLimit>2</RowLimit></View>";
    camlQuery.set_viewXml(camlXML);
    var collListItem = oList.getItems(camlQuery);
    clientContext.load(collListItem);
    clientContext.executeQueryAsync(function () {
        var AnnouncmentHTML = '<div>';
        var listItemEnumerator = collListItem.getEnumerator();
        var ItemCount = collListItem.get_count();

        var ItemCount = collListItem.get_count();
        if (ItemCount == 0) {
            //$("#announcmentDiv").empty();
            $("#eventDiv").html("");
            AnnouncmentHTML = "<div class=\"norecordfound col-sm-8 col-xs-8 col-md-8\">";
            //AnnouncmentHTML +="<h3 data-localize='NoRecord_Events' class=\"top5\"></h3>";
            AnnouncmentHTML += "<h3 class=\"top5\" data-localize='NoRecord_Events'>Events coming up shortly</h3>";
            AnnouncmentHTML += "</div>";

            $("#eventDiv").append(AnnouncmentHTML);
            return;
        }

        var counter = 1;
        while (listItemEnumerator.moveNext()) {
            var oListItem = listItemEnumerator.get_current();

            var eventTitle = oListItem.get_item('Title');
            var ItemID = oListItem.get_item('ID');

            if (eventTitle.length > 23) {					//alert(eventTitle);
                eventTitle = eventTitle.substring(0, 20);
                eventTitle += '...';
            }
            //var linkurlDispEvent="javascript:OpenPopUpPageWithTitle('"+curreWbeurl+"/Lists/Event/DispForm.aspx?ID="+ItemID+"',null,null,null,'Event')";
            var linkurlDispEvent = "javascript:showEventsonDemand('" + ItemID + "')";
            var eventDescription = oListItem.get_item('Description');
            if (eventDescription.length > 41) {
                //	alert(eventDescription);
                eventDescription = eventDescription.substring(0, 38);
                eventDescription += '...';
            }
            var eventStartDate = oListItem.get_item('EventDate');
            var eventDateObj = new Date(eventStartDate);

            var eventDate = eventDateObj.getDate();
            //var eventMonth=eventDateObj.getMonth();
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var eventMonth = monthNames[eventDateObj.getMonth()];
            eventMonth = eventMonth.substring(0, 3);

            var eventStratedHour = eventDateObj.getHours();
            var eventStratedMin = eventDateObj.getMinutes();


            var eventEndDate = oListItem.get_item('EndDate');
            

            var eventEndDateObj = new Date(eventEndDate);

            var eventEndHours = eventEndDateObj.getHours();
            var eventEndMin = eventEndDateObj.getMinutes();

            //alert(eventDescription);

            if (counter == 1) {
                AnnouncmentHTML += '<div class="row mb-10">';
                AnnouncmentHTML += '<div class="col-sm-3 col-xs-3 event-border">';
                //AnnouncmentHTML +='<div class="date-text">';
                AnnouncmentHTML += '<p class="date-text pull-left">' + eventDate + '</p>';
                AnnouncmentHTML += '<p class="month-text pull-left ">' + eventMonth + '</p>';
                AnnouncmentHTML += '<p class="time-text pull-left ">' + eventStratedHour + ':' + eventStratedMin + '-' + eventEndHours + ':' + eventEndMin + '</p>';
                //AnnouncmentHTML +='</div>';
                AnnouncmentHTML += '</div>';
                AnnouncmentHTML += '<div class="col-sm-9 col-xs-9">';
                AnnouncmentHTML += '<a href=' + linkurlDispEvent + '><h4 class="event-text-head-new bottom7">' + eventTitle + '</h4></a>';
                //	AnnouncmentHTML +='<p class="event-text">'+eventDescription+'<small>'+eventStratedHour+':'+eventStratedMin+'-'+eventEndHours+':'+eventEndMin+'</small></p>';
                AnnouncmentHTML += '<span class="event-text">' + eventDescription + '</span>';
                AnnouncmentHTML += '</div>';
                AnnouncmentHTML += '</div>';
                AnnouncmentHTML += '<hr class="mb-10"></hr>';
            }
            else {
                AnnouncmentHTML += '<div class="row mb-10">';
                AnnouncmentHTML += '<div class="col-sm-3 col-xs-3 event-border">';
                //AnnouncmentHTML +='<div class="date-text">';
                AnnouncmentHTML += '<p class="date-text pull-left">' + eventDate + '</p>';
                AnnouncmentHTML += '<p class="pull-left month-text">' + eventMonth + '</p>';
                AnnouncmentHTML += '<p class="pull-left time-text">' + eventStratedHour + ':' + eventStratedMin + '-' + eventEndHours + ':' + eventEndMin + '</p>';
                //AnnouncmentHTML +='</div>';
                AnnouncmentHTML += '</div>';
                AnnouncmentHTML += '<div class="col-sm-9 col-xs-9">';
                AnnouncmentHTML += '<a href=' + linkurlDispEvent + '><h4 class="event-text-head-new bottom7">' + eventTitle + '</h4></a>';
                //AnnouncmentHTML +='<p class="event-text"><small>'+eventStratedHour+':'+eventStratedMin+'-'+eventEndHours+':'+eventEndMin+'</small>'+eventDescription+'</p>';
                //AnnouncmentHTML +='<p class="event-text">'+eventDescription+'</p>';
                AnnouncmentHTML += '<span class="event-text">' + eventDescription + '</span>';
                AnnouncmentHTML += '</div>';
                AnnouncmentHTML += '</div>';
            }

            counter++;
        }

        AnnouncmentHTML += '</div>';

        //alert(AnnouncmentHTML);
        $("#eventDiv").html('');
        $("#eventDiv").append(AnnouncmentHTML);
    },

        function () {
            console.log('error: Event web part');
        });
}

 













