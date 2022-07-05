$( document ).ready(function() {
    console.log( "TimeLine Function Trigger!" );
});
function formatDate(d) 
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
         return    day  + " " +month[date.getMonth()] + " " + date.getFullYear();
         }
}
var Ownurl = "";
function ExecuteFilter(_query)
{
	debugger;
	response = [];
	Ownurl= _query;
	ReadTimeLine();

}

var response = response || []; 
function ReadTimeLine()
{  debugger;
    $.ajax({  
    url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
        	response = response.concat(data.d.results);
            $(".TimelineDesign").html('');
				$(".TimelineDesign").empty(); 
				Html_Design='';
 
            if (response.length > 0) 
			{  	
				var x=0;
            	for(x; x<response.length; x++)
            	{
            		var _itemID= response[x].ID;
            		var _Type = response[x].WebPartName;
            		var _EmpID = response[x].EmployeeID;
            		if(response[x].category.CatogeryName != undefined){var _Category = response[x].category.CatogeryName;}
            		
            		if(response[x].Title != null){var _Title_text = response[x].Title.slice(0,52);}
            		if(response[x].Description != null){var _Description = response[x].Description.slice(0,210);}
            		var _Modified = formatDate(response[x].Modified);
            		var Dept_NameforAlert_Announcement='';
            		if(response[x].Audience == "Department")
            		{ var Dept_name=[];
            			if(response[x].Departments.results.length>0)
            			{
            				for(var k=0; k<response[x].Departments.results.length; k++)
            				{
            					Dept_name.push(response[x].Departments.results[k].Title);
            				}            				
            				Dept_NameforAlert_Announcement = " | "+Dept_name;
            			}
            		}
            		else{Dept_NameforAlert_Announcement ="";}
            		if(response[x].EmployeeName != null){var _EmployeeName = response[x].EmployeeName;}            		
            		if(response[x].Designation != null && response[x].Designation != ""){var _Designation= response[x].Designation;}else{_Designation = "";}
            		if(response[x].Department != null && response[x].Department != ""){var _Department = response[x].Department;}else{_Department = ""; $("#pipesymbol").css("display", "none"); }//$("#id").css("display", "none");
            		if(response[x].OfficeLocation != null && response[x].OfficeLocation != ""){var _OfficeLocation = response[x].OfficeLocation;}else {_OfficeLocation = ""; $("#pipesymbol").css("display", "none"); }            		
            		if(response[x].UserType == "Employee" || response[x].UserType == "Internal Users" ){if(response[x].EmployeeID != null){GetEmployeeImg(response[x].EmployeeID,emptype="Employee");}}
            		else if(response[x].UserType == "Others" || response[x].UserType == "External Users" ){GetEmployeeImg(response[x].ID,emptype="Others")}
	           		else if(response[x].UserType == "Team"){GetFixedImages(filename="TEAM");  _Department = "";  _Designation= "";}
					else if(response[x].UserType == "Department"){GetFixedImages(filename="DEPARTMENT"); _Department = "";  _Designation= ""; }				
					
            		GenerateHtml(_itemID,_Type,_Title_text,_Description,_Modified,_EmployeeName,_Designation,_Department,_OfficeLocation,employeePicURL,_Category,Dept_NameforAlert_Announcement,_EmpID);
            	}
            	$(".TimelineDesign").append(Html_Design);            	 		
           	}         	

           	var LinkRecognition =  _spPageContextInfo.webServerRelativeUrl + "/Pages/ViewEmployeeOftheMonth.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/Default.aspx";
  			$('.Btn_Recognition').attr('href', LinkRecognition);
  	
  			var LinkGeneral =  _spPageContextInfo.webServerRelativeUrl + "/Pages/BioView.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/Default.aspx";
  			$('.Btn_General').attr('href', LinkGeneral );
  	
  			var LinkAnnouncement_Alert =  _spPageContextInfo.webServerRelativeUrl + "/Pages/ViewAnnouncements.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/Default.aspx";
  			$('.Btn_Announcement').attr('href', LinkAnnouncement_Alert);
  			$('.Btn_Alert').attr('href', LinkAnnouncement_Alert);
  			
  			if (data.d.__next) 
           	{
            	Ownurl= data.d.__next;
            	$("#seemorebtn").css("display", "block");
            }
            else
            {
            	$("#seemorebtn").css("display", "none");
            }  	 
        },
		error: function (data) 
		{  
        	console.log(data);
		}  
    });  
}

var Html_Design='';
function GenerateHtml(_itemID,_Type,_Title_text,_Description,_Modified,_EmployeeName,_Designation,_Department,_OfficeLocation,employeePicURL,_Category,Dept_NameforAlert_Announcement,_EmpID)
{
	if(_Type == "Announcement")
	{
		Html_Design= Html_Design+"<div class='col-md-12 mt5 p0 Announcement '>"+
									"<div class='panel panel-default panel-mb5'>" +
    	     							"<div class='panel-heading panel-heading-announcements panel-head-4'><span class='announcement-head-text head-back-color h4-color'>Announcement</span></div>" +
    	  								"<div class='panel-body panel-body-announcements'>" +
    	  									"<p class='announcement-title event-text-head-new'>"+_Title_text+" ....</p>" +
    	  									"<p>"+_Description+" ....</p>" +
    	  									"<div class='col-sm-12 col-xs-12 pl0 pr0 pb5'>"+
    	  										"<a href='#' class='announcements-button' data-toggle='modal' data-target='#Announcement_Alert' onclick='GetdatainModel("+_itemID+");'>Read More</a>"+
    	  									"</div>"+
    	  									"<ul class='list-inline list-unstyled'>"+
    	  										"<li class='pull-right'><span>"+_Modified+"</span><span>"+Dept_NameforAlert_Announcement+"</span></li>"+
    	  										"<li><a href='#' class='view Btn_Announcement' id='Btn_Announcement' target='_blank'></a></li>"+
    	  									"</ul>"+
    	  								"</div>"+
    	  							"</div>"+
    	  						"</div>";
	}
	
	else if(_Type == "Alert")
	{
		Html_Design= Html_Design+"<div class='col-md-12 p0 Alert'>"+
      								"<div class='panel panel-default panel-mb5'>"+
        								"<div class='panel-heading panel-heading-announcements-alert panel-head-4'><span class='announcement-head-text-alert head-back-color h4-color'>Alert</span></div>"+
            							"<div class='panel-body panel-body-announcements-alert'>"+
          									"<p class='announcement-title-alert event-text-head-new'>"+_Title_text+" ....</p>"+
          									"<p>"+_Description+" ....</p>"+
											"<div class='col-sm-12 col-xs-12 pl0 pr0 pb5'>"+
												"<a class='announcements-alert-button' data-toggle='modal' data-target='#Announcement_Alert' onclick='GetdatainModel("+_itemID+");'>Read More</a>"+
											"</div>"+
          									"<ul class='list-inline list-unstyled'>"+
            									"<li class='pull-right'><span>"+_Modified+"</span><span>"+Dept_NameforAlert_Announcement+"</span></li>"+
            									"<li><a href='#' class='view Btn_Alert' id='Btn_Alert' target='_blank'></a></li>"+
          									"</ul>"+
        								"</div>"+
      								"</div>"+
    							"</div>";    
	}
	
	else if(_Type == "Recognition")
	{
		Html_Design= Html_Design+"<div class='col-md-12 p0 Recognition'>"+
									"<div class='panel panel-default panel-mb5'>" +
    	     							"<div class='panel-heading panel-heading-recognition panel-head-4'><span class='recognition-head-text head-back-color h4-color'>Recognition</span></div>" +
    	  								"<div class='panel-body panel-body-recognition'>" +
    	  									"<p class='recognition-title event-text-head-new'>"+_EmployeeName+"</p>" +
    	  									"<p class='recognition-type'>"+_Title_text+"</p>" +
    	  									"<div class='recognition-bg-area'></div>"+
    	  									"<div class='recognition-image-div p0'> <a href='#'> <img class='' src="+employeePicURL+" alt=''> </a> </div>"+
    	  									"<div class='col-md-6 col-xs-6 p0 z3 pull-right'>"+
    	  										"<div class='recognition-content'>"+
    	  											"<p>"+_Designation+"</p>"+
    	  											"<p>"+_Department+"</p>"+
    	  											"<p>"+_OfficeLocation+"</p>"+
    	  											"<div class='recognition-view p0'><a href='#' class='Btn_Recognition' target='_blank'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/DevelopersCode/Amit/images/view.png' width='31' height='11' alt=''></a>"+
    	  												"<span class='recognition-button-area'><a data-toggle='modal' data-target='#myModal' class='recognition-button' onclick='GetdatainModel("+_itemID+");'>Details</a></span>"+
    	  											"</div>"+
    	  										"</div>"+
    	  									"</div>"+
    	  								"</div>"+
    	  							"</div>"+
    	  						"</div>";
	}
	
	else if(_Type == "General")
	{
		Html_Design= Html_Design+"<div class='col-md-12 p0 General'>"+
									"<div class='panel panel-default panel-mb5'>" +
    	     							"<div class='panel-heading panel-heading-general panel-head-4'><span class='recognition-head-text head-back-color h4-color'>"+_Category+"</span></div>"+
    	  								"<div class='panel-body panel-body-general'>" +
    	  									"<img class='center-block img-responsive image-general' src="+employeePicURL+"  alt=''>" +
    	  									"<p class='general-title event-text-head-new'>"+_EmployeeName+"</p>" +
    	  									"<p class='general-type'>"+_Designation+"</p>"+
    	  									"<div class='col-md-12 p0'>"+
    	  										"<div class='general-content'>"+
    	  											"<p><span>"+_Department+"</span> <span id='pipesymbol'>|</span> <span>"+_OfficeLocation+"</span></p>"+
    	  												"<div class='col-sm-12 col-xs-12'>"+
    	  													"<div class='col-sm-12 col-xs-4 ma0'>"+
    	  														"<a href='#' class='general-button' onclick='GetdatainModel("+_itemID+");' data-toggle='modal' data-target='#myModal'><span>Details</span></a>"+
    	  													"</div>"+
    	  												"</div>"+
						    	  						"<div class='general-view p0'><a href='#' class='Btn_General' target='_blank'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/DevelopersCode/Amit/images/view.png' width='31' height='11' alt=''/></a></div>"+
						    	  				"</div>"+
						    	  			"</div>"+
            							"</div>"+
          							"</div>"+
        						"</div>";
	}
	
	else if(_Type == "Welcome")
	{
		Html_Design= Html_Design+"<div class='col-md-12 p0 Welcome'>"+
          							"<div class='panel panel-default panel-mb5'>"+
            							"<div class='panel-heading panel-heading-welcome panel-head-4'><span class='welcome-head-text head-back-color h4-color'>Welcome</span></div>"+
        								"<div class='panel-body panel-body-welcome'>"+
                							"<p class='welcome-title event-text-head-new'>"+_EmployeeName+"</p>"+
                							"<p class='welcome-type'>"+_Title_text+"</p>"+
                							"<div class='welcome-bg-area'></div>"+
                							"<div class='col-md-6 col-sm-4 col-xs-8 p0 z3'>"+
                    							"<div class='welcome-content'>"+
                    								"<p>"+_Designation+"</p>"+
                    								"<p>"+_Department+"</p>"+
                    								"<p>"+_OfficeLocation+"</p>"+
                    								"<div class='welcome-view p0'><a href='#'><img src='images/view.png' width='31' height='11' alt=''></a>"+
                    									"<span class='welcome-button-area'><a href="+_spPageContextInfo.webAbsoluteUrl+ "/Pages/EmployeeDetails.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId")+ "&mode=editview&department=&employeedIddetails=" +_EmpID+ "&sourcelocation=../Pages/Default.aspx"+" class='welcome-button' target='_blank'>Details</a></span>"+
                    								"</div>"+
                    							"</div>"+
                							"</div>"+
                							"<div class='welcome-image-div p0'> <a href='#'> <img class='' src="+employeePicURL+" alt=''> </a> </div>"+
            							"</div>"+
          							"</div>"+
        						"</div>";
	}
}


var employeePicURL = "";
function GetEmployeeImg(EmpID,emptype)
{
	var listname,id;
 	var restQuery = "";
	if(emptype == "Employee")
	{
		listname = "Employees";
		id = EmpID;
		restQuery = "AttachmentFiles&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
	}
	else if (emptype == "Others")
	{
		listname = "Announcements";
		id = EmpID;
		restQuery = "AttachmentFiles&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
	}
	else if (emptype == "Alert/Announcement")
	{
		listname = "Announcements";
		id = EmpID;
		restQuery = "AttachmentFiles&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
	}
	    
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
        	var items = data.d.results;
            employeePicURL = "";
            if(emptype != "Alert/Announcement")
            {
            	if (items.length > 0)
            	{
            		if(items[0].AttachmentFiles.results.length>0)
            		{
            			employeePicURL = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
            		}
            		else
            		{
            			employeePicURL = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
            		}
            	}
            	else
            	{
            		employeePicURL = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
            	}
            }
            else
            {
            	$("#_AttachDocument").html('');
            	if(items[0].AttachmentFiles.results.length != 0)
            	{
            		for(var x=0; x < items[0].AttachmentFiles.results.length; x++)
            		{            		
            			$("#_AttachDocument").append('<span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><a target="_blank" href=' + items[0].AttachmentFiles.results[x].ServerRelativeUrl + '> '+ items[0].AttachmentFiles.results[x].FileName + '</a>');
               		}            		
            	}            
            }
        }, 
        error: function (data)
        {
            console.log(data);
        }
    });
}


function GetFixedImages(filename)
{
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('ImageGallery')/files?Select=*,ServerRelativeUrl&$filter=Title eq '"+filename+"'";
	var requestHeaders = { "accept": "application/json;odata=verbose" }
	$.ajax({
    	url: requestUri,
    	type: 'GET',
    	async: true,
    	dataType: 'json',
    	headers: requestHeaders,
        success: function (data) 
    	{
    		employeePicURL='';
    		var res = data.d.results;
    	    if(res.length>0)
    	    {
    	    	employeePicURL = _spPageContextInfo.webAbsoluteUrl+"/ImageGallery/"+res[0].Name;
				return employeePicURL;
    	    }	
		},
    	error: function (data) 
    	{
        	console.log(data);
    	}
	});	
}

var ItemID='';
function GetdatainModel(id)
{
	ItemID=id;
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,category/CatogeryName&$expand=category&$filter=ID eq ('"+ id +"')";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:true,  
        success: function (data) 
        {
        	$("#ModelHeading").text('');
        	$("#EmpName").text('');
        	$("#EmpDesignation").text('');
        	$("#EmpDepartment").text('');
        	$("#EmpLocation").text('');
        	$("#DtlDescription").text('');
        	$("#TextTitle").text('');
        	$("#WebLinkText").text('');
        	
        	var items = data.d.results;
        	$("#ModelHeading").text(items[0].Title);
        	$("#EmpName").text(items[0].EmployeeName);
        	if(items[0].WebPartName == "General"){ if(items[0].WebLinks != null){$("#WebLinkText").text(items[0].WebLinks.Url); $("#linkdiv").css("display", "block");}} else {$("#linkdiv").css("display", "none");}
        	if(items[0].Designation != null){$("#EmpDesignation").text(items[0].Designation);}
        	if(items[0].Department != null){$("#EmpDepartment").text(items[0].Department);}else{$("#spSymbol").css("display", "none");}
        	if(items[0].OfficeLocation != null){$("#EmpLocation").text(items[0].OfficeLocation);}else{$("#spSymbol").css("display", "none");}
        	if(items[0].Description != null){$("#DtlDescription").text(items[0].Description);}
        	
        	if(items[0].WebPartName == "Alert" || items[0].WebPartName == "Announcement")
        	{
        		$("#_ModelHeading").text(items[0].WebPartName);
        		if(items[0].Title != null){$("#_TextTitle").text(items[0].Title);}        	
	        	if(items[0].Description != null){$("#_DtlDescription").text(items[0].Description);}	        	
	        	//GetAttachments
	        	GetEmployeeImg(ItemID,emptype="Alert/Announcement");        	
        	}       	
  
        	if(items[0].UserType == "Employee" || items[0].UserType == "Internal Users" )
        	{
        		if(items[0].EmployeeID != null)
        		{
        			GetEmployeeImg(items[0].EmployeeID,emptype="Employee");
        			$('#profile-image').prop('src', employeePicURL);
        		}
        	}
       		else if(items[0].UserType == "Others" || items[0].UserType == "External Users" )
       		{
       			GetEmployeeImg(items[0].ID,emptype="Others");
       			$('#profile-image').prop('src', employeePicURL);
       		}
        	else if(items[0].UserType == "Team")
            {
            	GetFixedImages(filename="TEAM");
				$('#profile-image').prop('src', employeePicURL);
			}													
            else if(items[0].UserType == "Department")
            {
            	$("#EmpDepartment").text('');
           		GetFixedImages(filename="DEPARTMENT");
				$('#profile-image').prop('src', employeePicURL);
            }
            GetDocuments(ItemID,items[0].WebPartName);            
			ReadCommentOnPost(ItemID); // Read Comments on selected Post....  
        },
		error: function (data) 
		{  
        	console.log(data);
		}  
    });  
}


var tempStore=[];
function GetDocuments(filename,webpartname)
{
	var DocType='';
	var ImgType='';
	if(webpartname == "General"){DocType = "Image";}else if(webpartname == "Recognition"){DocType = "Award_Image";}
	if(webpartname == "General"){ImgType= "Document";}else if(webpartname == "Recognition"){ImgType= "Award_Document";}
	
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'"+filename+"')";
	var requestHeaders = { "accept": "application/json;odata=verbose" }
	$.ajax({
    	url: requestUri,
    	type: 'GET',
    	dataType: 'json',
    	headers: requestHeaders,
        success: function (data) 
    	{ 	    		
    		$("#AttachDoc").empty();
    	    var res = data.d.results;
    	    var imagesStore=[];
    	    if(res.length>0)
    	    {
    	    	var x=0;    	    	
    	    	for(x; x<res.length; x++)
    	    	{	
					if(res[x].Title == DocType)
					{							
						var imgname=_spPageContextInfo.webAbsoluteUrl+"/GeneralPicturesGallery/"+res[x].Name;
						imagesStore.push(imgname);
					}
					else if (res[x].Title == ImgType)
					{	
						var Docname= res[x].Name;		
						$('#AttachDoc').append('<div id="_file_'+ x +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + x + '</strong></span><a href="'+document.location.origin+res[x].ServerRelativeUrl+'" target="_blank"><span class="play"></span><span class="">' + res[x].Name + '</span></a> </div>');
					}
				}				
			}
			if(imagesStore.length>0)
			{	
				$("#1stImg").empty();
				$("#carousel-example-generic").show();	
				for(k=0; k<imagesStore.length; k++)
				{
					if(k==0){ $('#1stImg').append('<div class="item active"><img src="'+imagesStore[k]+'" id="sliderImage'+k+'"  alt=""></div>'); }
					else{ $('#1stImg').append('<div class="item"><img src="'+imagesStore[k]+'" id="sliderImage'+k+'"  alt=""></div>'); }				
				}			
			}
			else
			{
				for(k=0; k<2; k++)
				{
					if(k==0){ $('#1stImg').append('<div class="item active"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/Biography/images/i1.jpeg" id="sliderImage'+k+'"  alt=""></div>'); }
					else { $('#1stImg').append('<div class="item"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/Biography/images/i2.jpg" id="sliderImage'+k+'"  alt=""></div>'); }				
				}
				$("#carousel-example-generic").hide();						
			}	
		},
    	error: function ajaxError(response) 
    	{
        	alert(response.status + ' ' + response.statusText);
    	}
	});	
}

function Universalinsert(listName,item) 
{
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items",
		type: "POST",
		contentType: "application/json;odata=verbose",
		data: JSON.stringify(item),
		async: false,
		headers: 
		{
			"Accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		success: function (data) { console.log("add success"); },
		error: function (data) { console.log(data); }
	});
}

function AddComment()
{
	var d = new Date();
	var strDate = d.getDate() + "-";
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var Currentdate=strDate.concat(monthNames[d.getMonth()]);
	if($("#TextComment").val().trim().length>0)
	{
		var DataID=ItemID.toString();
		var listName="AnnouncementsChild";
		var Webpartname="General";
		var comment=$("#TextComment").val().trim();
		var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Title':comment ,'WebPartName':Webpartname, 'Item_ID':DataID, 'CreateDate':Currentdate};
		Universalinsert(listName,item);
		$(".emojionearea-editor").empty();
		ReadCommentOnPost(DataID);	
	}
}

function ReadCommentOnPost(ItmID)
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?$filter= Item_ID eq ('"+ ItmID +"')&$expand=Author/Id&$select=*,Author/Name,Author/Title";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:true,  
        success: function (data)
        {
        $("#AllComents").empty();
        	var items = data.d.results;  
        	var likeCount=[];
        	var AuthorList=[];
            if (items.length > 0) 
			{	
            	for (var i = 0; i < data.d.results.length; i++)   
           		{                      
               		var value = data.d.results[i]; 
               		var Tempdate = value.Created.slice(0, 10);
               		var TempTime = value.Created.slice(11, 16);
               		if(value.Title != null)
               		{
			        	$('#AllComents').append( '<tr><td style="width: 90%;"><a href="'+ _spPageContextInfo.webAbsoluteUrl+ "/Pages/EmployeeDetails.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId")+ "&mode=editview&department=&employeedIddetails=" + value.AuthorId + "&sourcelocation=../Pages/ViewEmployeeOftheMonth.aspx"+'" target="_blank">'+ value.Author.Title+'</a><br>' + value.Title +'</td><br><td style="width: 10%;">' +value.CreateDate+ '<br>' + TempTime  +'</td></tr>' );
			        }
			        
			        if(value.Like == "Yes")
			        {
			        	likeCount.push(value.Like);
			        	AuthorList.push(value.Author.Title);
			        }
               	}
               	if(likeCount.length == 0)
               	{
               		$("#TotalLike").text("");
               		$("#AuthorList").text("");
               	
               	}
               	else
               	{               	
	               	$("#TotalLike").text(likeCount.length);
	               	$("#AuthorList").text(AuthorList);             
               	}
        	}
        	else
        	{
        	$("#TotalLike").text("");
        	$("#AuthorList").text(""); 
        	} 
        	SetLikeBtnValue(ItmID);
 
  		},
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });  
}


var LikeVal='';
var LikeID='';
function SetLikeBtnValue(ItmID)
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?$filter= Item_ID eq '"+ ItmID +"' and AuthorId eq '"+_spPageContextInfo.userId+"' and Like eq 'Yes' or Like eq 'No'";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:true,  
        success: function (data)
        {debugger;
        	var items = data.d.results;
            if (items.length > 0) 
			{	
            	 LikeVal = items[0].Like;
            	 LikeID = items[0].ID;             
        	}
        	else
        	{
        		LikeVal ="New";
			}        	
  		},
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });  
}

function AddLike()
{
	if(LikeVal=="New")
	{
		var listName="AnnouncementsChild";
		var DataID=ItemID.toString();	
		var Webpartname="General";
		var Like="Yes";
		var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Like':Like,'WebPartName':Webpartname, 'Item_ID':DataID};
		Universalinsert(listName,item);	
		ReadCommentOnPost(DataID);
	}
	else if (LikeVal=="Yes" || LikeVal=="No")
	{
		update();
	}
}

function update()  
{ 	
	var likebtnvalue='';
	if(LikeVal == "Yes")
	{
		likebtnvalue ="No";
	}
	else if (LikeVal == "No")
	{
		likebtnvalue="Yes";
	}	
    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/items('"+LikeID+"')",
        type: "POST",  
        data: JSON.stringify  
        ({  
            __metadata:  
            {  
                type: "SP.Data.AnnouncementsChildListItem"  
            },  
            Like: likebtnvalue,
            WebPartName: "General",
            Item_ID:ItemID.toString()
        }),  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr)  
        { 
           console.log("Data Updated!"); 
           ReadCommentOnPost(ItemID);
        },  
        error: function(xhr, status, error)  
        {  
            $("#ResultDiv").empty().text(data.responseJSON.error);  
        }  
    });
 }
 
 function GetCategory()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$filter=CategoryType eq 'Recognition' and Status eq 'Yes' ";  
    $.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:true,  
        success: function (data) 
        { 
        	var items = data.d.results;  
            if (items.length > 0) 
			{  				
				$('#ddlcategory').append($("<option     />").val('All').text('All'));
				for (i = 0; i < items.length; i++) 
				{
   					$('#ddlcategory').append($("<option     />").val(items[i].ID).text(items[i].CatogeryName));
  				}
            }    
        },
		eror: function (data) 
		{  
			console.log(data);		
		}  
    });  
}

function ReadDepartment()
{	
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$filter=CompanyID eq '"+titanForWork.getQueryStringParameter('CompanyId')+"'"; 
    $.ajax({  
        url: Ownurl,
        async:true,  
        headers: { Accept: "application/json;odata=verbose" },
        success: function (data) 
        { 
        	var items = data.d.results;  
            if (items.length > 0) 
			{
				$('#ddldepartment').append($("<option     />").val('All').text('All'));
				for (i = 0; i < items.length; i++) 
				{
   					$('#ddldepartment').append($("<option     />").val(items[i].DepartmentName).text(items[i].DepartmentName));
  				}
            }  
        },
		eror: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });  
}

$(window).load(function() {

	(function(){
		var today = new Date();
		var CurrentDate=today.toISOString().substring(0, 10);
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and Publish_Date le '"+CurrentDate+"' and Expires ge '"+CurrentDate+"') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"') or (Audience eq 'Department' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"' and Departments/ID eq '"+Logged_DepartmentId+"')) &$expand=Departments,Company,category&$orderby=Modified desc&$top=10";
		ExecuteFilter(Ownurl);
	})();
		
  	/* Show Likes*/
  	$('#my_custom_popup_like').hover(function () {debugger;
        $("#AuthorList").css("display", "block");
    }, function () {
        $("#AuthorList").css("display", "none");
    });    
    
    /*Menu Links*/
    var Menu_announcement_link=  _spPageContextInfo.webServerRelativeUrl + "/Pages/Announcements.aspx?Mode=Add&WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&Type=Announcement&sourcelocation=../Pages/Default.aspx";
  	$('#Menu_announcement').attr('href', Menu_announcement_link);
  	
  	var Menu_alert_link=  _spPageContextInfo.webServerRelativeUrl + "/Pages/Announcements.aspx?Mode=Add&WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&Type=Alert&sourcelocation=../Pages/Default.aspx";
  	$('#Menu_Alert').attr('href', Menu_alert_link);
  	
  	var Menu_welcome_link=  _spPageContextInfo.webServerRelativeUrl + "/Pages/EmployeeDetails.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&mode=add&department=&employeedIddetails=&sourcelocation=../Pages/Default.aspx";
  	$('#Menu_welcome').attr('href', Menu_welcome_link);
	
	var Menu_recognition_link=  _spPageContextInfo.webServerRelativeUrl + "/Pages/Empofthemonth.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/Default.aspx";
  	$('#Menu_recognition').attr('href', Menu_recognition_link);
  	
  	var Menu_general_link=  _spPageContextInfo.webServerRelativeUrl + "/Pages/BiographyWebpart.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/Default.aspx";
  	$('#Menu_general').attr('href', Menu_general_link);
  	
  	var today = new Date();
	var CurrentDate=today.toISOString().substring(0, 10);
  	
  	$("#F_All").click(function(){
		var today = new Date();
		var CurrentDate=today.toISOString().substring(0, 10);
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and Publish_Date le '"+CurrentDate+"' and Expires ge '"+CurrentDate+"') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"') or (Audience eq 'Department' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"' and Departments/ID eq '"+Logged_DepartmentId+"')) &$expand=Departments,Company,category&$orderby=Modified desc&$top=10";
		ExecuteFilter(Ownurl);  	
  	});
  	
  	$("#F_Announcement").click(function(){  	
    	var Filterquery =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,category/CatogeryName,Departments/Title,Company/Title&$filter=(WebPartName eq 'Announcement' and ApprovalStatus eq 'Approved' and Publish_Date le '"+CurrentDate+"' and Expires ge '"+CurrentDate+"') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"') or (Audience eq 'Department' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"' and Departments/ID eq '"+Logged_DepartmentId+"')) &$expand=Departments,Company,category&$orderby=Modified desc&$top=10";
    	ExecuteFilter(Filterquery);
  	});
	
	$("#F_General").click(function(){
    	var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,ID,ApprovalStatus,Departments/Title,Company/Title,category/CatogeryName,EmployeeName,Department,Title,Designation,Publish_Date,Expires&$top=10&$expand=category/CatogeryName&$filter=(WebPartName eq 'General' and Publish_Date le '"+CurrentDate+"' and Expires ge '"+CurrentDate+"') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"') or (Audience eq 'Department' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"' and Departments/ID eq '"+Logged_DepartmentId+"') and (ApprovalStatus eq 'Approved')) &$expand=Departments,Company&$orderby=Modified desc";
    	ExecuteFilter(Filterquery);
  	});
	
	$("#F_Recognition").click(function(){
	   	var d = new Date();
    	var CurrentYear = d.getFullYear();
    	var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,category/CatogeryName&$expand=category&$Top=10&$OrderBy=Modified desc&$filter=(WebPartName eq 'Recognition' and ApprovalStatus eq 'Approved' and (Audience eq 'Corporate' or Audience eq 'Company' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"')) and Year eq '"+CurrentYear +"' ";  
    	ExecuteFilter(Filterquery);
  	});
  	
  	$("#F_Welcome").click(function(){
  		var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,category/CatogeryName&$expand=category&$OrderBy=Modified desc&$top=10&$filter=(WebPartName eq 'Welcome' and ApprovalStatus eq 'Approved' and (Audience eq 'Corporate' or Audience eq 'Company' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"'))";  
    	ExecuteFilter(Filterquery);
  	
  	});
  	
  	$("#F_Alert").click(function(){
    	var Filterquery =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,category/CatogeryName,Departments/Title,Company/Title&$filter=(WebPartName eq 'Alert' and ApprovalStatus eq 'Approved' and Publish_Date le '"+CurrentDate+"' and Expires ge '"+CurrentDate+"') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"') or (Audience eq 'Department' and Company/ID eq '"+titanForWork.getQueryStringParameter("CompanyId")+"' and Departments/ID eq '"+Logged_DepartmentId+"')) &$expand=Departments,Company,category&$orderby=Modified desc&$top=10";
    	ExecuteFilter(Filterquery );    	
  	});

});