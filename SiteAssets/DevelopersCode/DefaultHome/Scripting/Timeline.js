function Executess() {

    var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 10);
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/Title,TeamMembers/EMail,TeamMembers/ID,TeamMembers/Title,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and WebPartName ne 'Banners' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "') or (Audience eq 'Department' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=TeamMembers/ID,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified desc&$top=10";
    ExecuteFilter(Ownurl);
}

waitingDialog.show();


$(document).ready(function () {

    $("#SaveBTN").hide()
    console.log("TimeLine Function Trigger!");
    Executess();
    /* Show Likes*/
    $('#my_custom_popup_like').hover(function () {
        $("#AuthorList").css("display", "block");
    }, function () {
        $("#AuthorList").css("display", "none");
    });

    /*Menu Links*/
    var Menu_announcement_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/Announcements.aspx?Mode=Add&WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&Type=Announcement&sourcelocation=../Pages/Default.aspx";
    $('#Menu_announcement').attr('href', Menu_announcement_link);

    var Menu_alert_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/Announcements.aspx?Mode=Add&WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&Type=Alert&sourcelocation=../Pages/Default.aspx";
    $('#Menu_Alert').attr('href', Menu_alert_link);

    var Menu_welcome_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/EmployeeDetails.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&mode=add&department=&employeedIddetails=&sourcelocation=../Pages/Default.aspx";
    $('#Menu_welcome').attr('href', Menu_welcome_link);

    var Menu_recognition_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/RecognitionEntry.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&Mode="+window.btoa('New')+"&sourcelocation=../Pages/Default.aspx";
    $('#Menu_recognition').attr('href', Menu_recognition_link);

    var Menu_general_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/ExperienceEntry.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&Mode="+window.btoa('New')+"&sourcelocation=../Pages/Default.aspx";
    $('#Menu_general').attr('href', Menu_general_link);


    $('.timeline-filter div div div').on('click', function () {
        // $(this).siblings().css('background-color', HeaderTextColor, 'important');
        $(this).siblings().find("a").removeAttr("style");
        $(this).find("a").css('background-color', HeaderTextColor, 'important');
        $(this).find("a").css('color', MediatextColor, 'important');
    });

    var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 10);

    $("#F_All").click(function () {
        var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 10);
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,TeamMembers/Title,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and WebPartName ne 'Banners' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "') or (Audience eq 'Department' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=TeamMembers/ID,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified  desc&$top=10";
        ExecuteFilter(Ownurl);
    });

    $("#F_Announcement").click(function () {
        var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,category/CatogeryName,Departments/Title,Company/Title&$filter=(WebPartName eq 'Announcement' and ApprovalStatus eq 'Approved' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "') or (Audience eq 'Department' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified desc&$top=10";
        ExecuteFilter(Filterquery);
    });

    $("#F_General").click(function () {
        var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,TeamMembers/Title,TeamMembers/EMail,AttachmentFiles,ID,ApprovalStatus,Departments/Title,Company/Title,category/CatogeryName,EmployeeName,Department,Title,Designation,Publish_Date,Expires&$top=10&$filter=(ApprovalStatus eq 'Approved' and WebPartName eq 'General' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "') or (Audience eq 'Department' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and Departments/ID eq '" + Logged_DepartmentId + "')) &$expand=TeamMembers/ID,AttachmentFiles,Departments,Company,category/CatogeryName&$orderby=Publish_Date desc,Modified desc";
        ExecuteFilter(Filterquery);
    });

    $("#F_Recognition").click(function () {
        var d = new Date();
        var CurrentYear = d.getFullYear();
        var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,TeamMembers/Title,category/CatogeryName&$expand=AttachmentFiles,category,TeamMembers&$Top=10&$OrderBy=Publish_Date desc,Modified desc&$filter=(WebPartName eq 'Recognition' and ApprovalStatus eq 'Approved' and (Audience eq 'Corporate' or Audience eq 'Company' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "')) and Year eq '" + CurrentYear + "' ";
        ExecuteFilter(Filterquery);
    });

    $("#F_Welcome").click(function () {
        var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,AttachmentFiles,category/CatogeryName&$expand=AttachmentFiles,category&$OrderBy=Publish_Date desc,Modified desc&$top=10&$filter=(WebPartName eq 'Welcome' and ApprovalStatus eq 'Approved' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "' and (Audience eq 'Corporate' or Audience eq 'Company' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "'))";
        ExecuteFilter(Filterquery);

    });

    $("#F_Alert").click(function () {
        var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,category/CatogeryName,Departments/Title,Company/Title&$filter=(WebPartName eq 'Alert' and ApprovalStatus eq 'Approved' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "') or (Audience eq 'Department' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + titanForWork.getQueryStringParameter("CompanyId") + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified desc&$top=10";
        ExecuteFilter(Filterquery);
    });




});

function add3Dots(string, limit) {
    var dots = " ...";
    if (string.length > limit) {
        string = string.substring(0, limit) + dots;  // you can also use substr instead of substring
    }
    return string;
}


function formatDate(d) {
    var date = new Date(d);
    if (isNaN(date.getTime())) { return d; }
    else {
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
        if (day < 10) { day = "0" + day; }
        return day + " " + month[date.getMonth()] + " " + date.getFullYear();
    }
}


function CustomformatDate(d) {
    var date = new Date(d);
    if (isNaN(date.getTime())) { return d; }
    else {
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
        if (day < 10) { day = "0" + day; }
        return day + " " + month[date.getMonth()];
    }
}

function removetag(HTMLWithTags) {
    var txtHTML = HTMLWithTags;
    var t1 = stripHtml(txtHTML);
    return t1;
}

function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}


var Ownurl = "";
function ExecuteFilter(_query) {
    response = [];
    Ownurl = _query;
    ReadTimeLine();
}

var response = response || [];
function ReadTimeLine() {
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            response = response.concat(data.d.results);
            $(".TimelineDesign").html('');
            $(".TimelineDesign").empty();
            Html_Design = '';
            if (response.length > 0) {
                var x = 0;
                for (x; x < response.length; x++) {
                    var _itemID = response[x].ID;
                    var _Type = response[x].WebPartName;
                    var _Created = formatDate(response[x].Created);
                    var _Publishdate = formatDate(response[x].Publish_Date);
                    
                    if (_Type == "General") 
                    {
                    	if(response[x].AttachmentFiles.results.length>0)
						{	
						var CoverImage='';
						for(var k=0; k<response[x].AttachmentFiles.results.length; k++)
						{
							var Filename=response[x].AttachmentFiles.results[k].FileName;
							var n = Filename.startsWith("CoverImage")
							if(n == true)
							{
								CoverImage = response[x].AttachmentFiles.results[k].ServerRelativeUrl;
								break;
							}		
						}
						if(CoverImage == "")
						{
							CoverImage = _spPageContextInfo.webAbsoluteUrl+"/ImageGallery/DefaultExperience.png";
						}
					}
					else
					{
						CoverImage = _spPageContextInfo.webAbsoluteUrl+"/ImageGallery/DefaultExperience.png";
					}
					G_Exp_BackImage = CoverImage;


                    //G_Exp_BackImage
                    
                        //SetbackImage(_itemID, _Type);
                    }
                    var DOJ = formatDate(response[x].Publish_Date);
                    var _EmpID = response[x].EmployeeID;
                    if (response[x].category.CatogeryName != undefined) { var _Category = response[x].category.CatogeryName; }

                    if (response[x].Title != null) {
                        if (response[x].Title.length > 52) {
                            var _Title_text = add3Dots(response[x].Title, 52);
                        }
                        else {
                            var _Title_text = response[x].Title;
                        }
                    }//.slice(0,52);}
                    if (response[x].Description != null) {
                        var TextDescription = removetag(response[x].Description)
                        if (TextDescription.length > 210) {
                            var _Description = add3Dots(TextDescription, 210);
                        }
                        else {
                            var _Description = TextDescription;
                        }
                    }
                    //var _Modified = formatDate(response[x].Modified);
                    var PublishDate = formatDate(response[x].Publish_Date);
                    var Dept_NameforAlert_Announcement = '';
                    if (response[x].Audience == "Department") {
                        var Dept_name = [];
                        if (response[x].Departments.results.length > 0) {
                            for (var k = 0; k < response[x].Departments.results.length; k++) {
                                Dept_name.push(response[x].Departments.results[k].Title);
                            }
                            Dept_NameforAlert_Announcement = " | " + Dept_name;
                        }
                    }

                    else { Dept_NameforAlert_Announcement = ""; }
                    if(response[x].WebPartName == "General")
                    {
                    	if(response[x].UserType == "Internal Users")
                    	{
                    		if(response[x].TeamMembersId != null)
                    		{
                    			var _EmployeeName = response[x].TeamMembers.results[0].Title;
                    		}
                    	}
                    	else
                    	{
                    		if (response[x].EmployeeName != null) { var _EmployeeName = response[x].EmployeeName; }
                    	}
                    
                    }
                    else
                    {
                    	 if (response[x].EmployeeName != null) { var _EmployeeName = response[x].EmployeeName; }                    
                    }
                   
                    if (response[x].Designation != null && response[x].Designation != "") { var _Designation = response[x].Designation; } else { _Designation = ""; }
                    if (response[x].Department != null && response[x].Department != "") { var _Department = response[x].Department; } else { _Department = ""; $("#pipesymbol").css("display", "none"); }//$("#id").css("display", "none");
                    if (response[x].OfficeLocation != null && response[x].OfficeLocation != "") { var _OfficeLocation = response[x].OfficeLocation; } else { _OfficeLocation = ""; $("#pipesymbol").css("display", "none"); }
                    if (response[x].UserType == "Employee" || response[x].UserType == "Internal Users") { if (response[x].EmployeeID != null) { GetEmployeeImg(response[x].EmployeeID, emptype = "Employee"); } }
                    else if (response[x].UserType == "Others" || response[x].UserType == "External Users") {
                        if (response[x].WebLinks != null) {
                            employeePicURL = response[x].WebLinks.Description;
                            //$('#profile-image1').prop('src', attachmentUrl);
                        }
                        else if (response[x].AttachmentFiles.results.length > 0) {
                            employeePicURL = response[x].AttachmentFiles.results[0].ServerRelativeUrl;
                            //$('#profile-image1').prop('src', attachmentUrl);
                        }

                        //GetEmployeeImg(response[x].ID,emptype="Others")

                    }
                    else if (response[x].UserType == "Team") {
                        if (response[x].WebLinks != null) {
                            employeePicURL = response[x].WebLinks.Description;
                            //$('#profile-image1').prop('src', attachmentUrl);
                        }
                        else if (response[x].AttachmentFiles.results.length > 0) {
                            employeePicURL = response[x].AttachmentFiles.results[0].ServerRelativeUrl;
                            //$('#profile-image1').prop('src', attachmentUrl);
                        }
                        //GetFixedImagesTimeline(filename="TEAM");  
                        _Department = "";
                        _Designation = "";
                    }
                    else if (response[x].UserType == "Department") { GetFixedImagesTimeline(filename = "DEPARTMENT"); _Department = ""; _Designation = ""; }
                    
                    if( _Type == "Recognition")
                    {
                    	if(response[x].Related_Word == "Gallery")
						{
							//$("#userImage").attr("src",response[x].ImageUrl);
							employeePicURL  = response[x].ImageUrl;
							//$('input[name="UpdateEmp"][value="' +QueryResult[0].Related_Word+ '"]').prop('checked', 'checked');		
						}
						else
						{
							if(response[x].UserType == "Employee")
							{
								if(response[x].AttachmentFiles.results.length>0)
								{
									//$("#userImage").attr("src",response[x].AttachmentFiles.results[0].ServerRelativeUrl);
									employeePicURL  = response[x].AttachmentFiles.results[0].ServerRelativeUrl;
								}
								else
								{
									if(response[x].TeamMembersId != null)
									{
										var Query = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$filter= LogonName/ID eq ('"+response[x].TeamMembers.results[0].ID+"') and PrimaryCompany eq 'Primary'&$select=*,OfficeLocation/Title&$expand=AttachmentFiles,OfficeLocation";
									}
									else
									{
										var Query = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$filter= LogonName/ID eq ('"+response[x].EmployeeID+"') and PrimaryCompany eq 'Primary'&$select=*,OfficeLocation/Title&$expand=AttachmentFiles,OfficeLocation";
									}	
									var QueryResult = FilterGetdata(Query);
									if(QueryResult.length>0)
									{
										if(QueryResult[0].AttachmentFiles.results.length >0)
										{
											//$("#userImage").attr("src",QueryResult[0].AttachmentFiles.results[0].ServerRelativeUrl);
											employeePicURL  = QueryResult[0].AttachmentFiles.results[0].ServerRelativeUrl;
						   				}
									}
								}	
							}
							else
							{
								if(response[x].AttachmentFiles.results.length>0)
								{
									//$("#userImage").attr("src",QueryResult[0].AttachmentFiles.results[0].ServerRelativeUrl);
									employeePicURL = response[x].AttachmentFiles.results[0].ServerRelativeUrl;
								}    		
							}  
						}  

                    
                    
                    
                    
                    }

                    GenerateHtml(_itemID, _Type, _Title_text, _Description, PublishDate, _EmployeeName, _Designation, _Department, _OfficeLocation, employeePicURL, _Category, Dept_NameforAlert_Announcement, _EmpID, G_Exp_BackImage, _Created, DOJ, G_Exp_Display,_Publishdate);
                }
                $(".TimelineDesign").append(Html_Design);

                if (MediatextColor != null && HeaderTextColor != null) {
                    $('.panel-heading-bg-txt-clr').each(function () {                 //For Theame
                        this.style.setProperty('color', MediatextColor, 'important');
                    });

                    $('#DeltaPlaceHolderMain .panel-heading-bg-txt-clr').each(function () {    // For Theame
                        this.style.setProperty('background', HeaderTextColor, 'important');
                    });

                    /*  $('.fa-chevron-circle-right').each(function() {                           // For Theame
                       this.style.setProperty('color', HeaderTextColor, 'important');
                   });*/
                }



            }

            var LinkRecognition = _spPageContextInfo.webServerRelativeUrl + "/Pages/ViewEmployeeOftheMonth.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&sourcelocation=../Pages/Default.aspx";
            $('.Btn_Recognition').attr('href', LinkRecognition);

            var LinkGeneral = _spPageContextInfo.webServerRelativeUrl + "/Pages/ExperienceView.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&Type="+window.btoa('General')+"&sourcelocation=../Pages/Default.aspx";
            $('.Btn_General').attr('href', LinkGeneral);

            var LinkAnnouncement_Alert = _spPageContextInfo.webServerRelativeUrl + "/Pages/ViewAnnouncements.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&sourcelocation=../Pages/Default.aspx";
            $('.Btn_Announcement').attr('href', LinkAnnouncement_Alert);
            $('.Btn_Alert').attr('href', LinkAnnouncement_Alert);

            if (data.d.__next) {
                Ownurl = data.d.__next;
                $("#seemorebtn").css("display", "block");
            }
            else {
                $("#seemorebtn").css("display", "none");
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}


var Html_Design = '';
function GenerateHtml(_itemID, _Type, _Title_text, _Description, PublishDate, _EmployeeName, _Designation, _Department, _OfficeLocation, employeePicURL, _Category, Dept_NameforAlert_Announcement, _EmpID, G_Exp_BackImage, _Created, DOJ, G_Exp_Display,_Publishdate) {
    if (_Type == "Announcement") {
        Html_Design = Html_Design + "<div class='col-md-12 pl0 pr5'>" +
      		"<div class='panel panel-default panel-mb10'>" +
        		"<div class='panel-heading panel-heading-announcements  '><span class='announcement-head-text panel-heading-bg-txt-clr'>Announcement</span></div>" +
            		"<div class='panel-body panel-body-announcements'>" +
          				"<p class='announcement-title event-text-head-new'>" + _Title_text + "</p>" +
          				"<p>" + _Description + "</p>" +
						"<div class='col-sm-12 col-xs-12 pl0 pr0 pb5'>" +
							"<a href='#' class='announcements-button' data-toggle='modal' data-target='#Announcement_Alert' onclick='GetdatainModel(" + _itemID + ");'>Details</a>" +
						"</div>" +
          				"<ul class='list-inline list-unstyled'>" +
            				"<li class='pull-right  date-time-card'><span>" + PublishDate + "</span></li>" +
            				"<li><a href='#' class='Btn_Announcement  my_view_arrow_w' id='Btn_Announcement'><i class='fa fa-chevron-right'></i></a></li>" +
          				"</ul>" +
        			"</div>" +
      			"</div>" +
    		"</div>";
    }

    else if (_Type == "Alert") {
        Html_Design = Html_Design + "<div class='col-md-12 pl0 pr5'>" +
      		"<div class='panel panel-default panel-mb10'>" +
        		"<div class='panel-heading panel-heading-announcements-alert  '><span class='announcement-head-text-alert'>Alert</span></div>" +
            	"<div class='panel-body panel-body-announcements-alert'>" +
          			"<p class='announcement-title-alert event-text-head-new'>" + _Title_text + "</p>" +
          			"<p>" + _Description + "</p>" +
					"<div class='col-sm-12 col-xs-12 pl0 pr0 pb5'>" +
						"<a href='#' class='announcements-alert-button' data-toggle='modal' data-target='#Announcement_Alert' onclick='GetdatainModel(" + _itemID + ");'>Details</a>" +
					"</div>" +
          			"<ul class='list-inline list-unstyled'>" +
            			"<li class='pull-right date-time-card'><span> " + PublishDate + " </span></li>" +
            			"<li><a href='#' class='view-alert Btn_Alert my_view_arrow_w' id='Btn_Alert'><i class='fa fa-chevron-right'></i></a></li>" +
          			"</ul>" +
        		"</div>" +
      		"</div>" +
    	"</div>";
    }

    else if (_Type == "Recognition") 
    {
    	var LinkAddress =  "../Pages/DetailsView.aspx?WebAppId="+window.btoa(Logged_CompanyId)+"&ItemId="+window.btoa(_itemID)+"&type="+window.btoa('Recognition')+"&Source=../Pages/Default.aspx";
        Html_Design = Html_Design + "<div class='col-md-12 pl0 pr5'>" +
        	"<div class='panel panel-default panel-mb10'>" +
            	"<div class='panel-heading panel-heading-recognition '><span class='recognition-head-text panel-heading-bg-txt-clr'>Recognition</span></div>" +
        		"<div class='panel-body panel-body-recognition'>" +
                	"<p class='recognition-title event-text-head-new'>" + _EmployeeName + "</p>" +
                	"<p class='recognition-type'>" + _Title_text + "</p>" +
                	"<div class='col-md-6 col-sm-6 col-xs-6 pl0 pr10'>" +
                    	"<div class='recognition-content'>" +
                    		"<p>" + _Designation + "</p>" +
                    		"<p>" + _Department + "</p>" +
                    		"<p>" + _OfficeLocation + "</p>" +
                    		"<p class=''>" +_Publishdate+ "</p>" +
                    	"</div>" +
                	"</div>" +
					"<div class='col-md-6 col-sm-6 col-xs-6 p0 recognition-image-div'> <a> <img class='img-responsive' src=" + employeePicURL + "> </a> </div>" +
					"<div class='col-md-12 col-sm-12 col-xs-12 pl0 pr0 pt5 '>" +
						"<div class='recognition-view p0 mt10'><a href='#' class='Btn_Recognition my_view_arrow_w'><i class='fa fa-chevron-right'></i></a>" +
                    	"</div>" +
                    	"<a class='recognition-button' href='"+LinkAddress+"'>Details</a>" +
						//"<a data-toggle='modal' data-target='#MyRecognitionModel' class='recognition-button' onclick='GetdatainModel(" + _itemID + ");'>Details</a>" +
					"</div>" +
            	"</div>" +
          	"</div>" +
        "</div>";
    }

    else if (_Type == "General") 
    {
    	var LinkAddress =  "../Pages/DetailsView.aspx?WebAppId="+window.btoa(Logged_CompanyId)+"&ItemId="+window.btoa(_itemID)+"&type="+window.btoa('General')+"&Source=../Pages/Default.aspx";
        Html_Design = Html_Design + "<div class='col-md-12 pl0 pr5'>" +
			"<div class='panel panel-default panel-mb10'>" +
				"<div class='panel-body panel-body-general'>" +
					"<a href='#' data-toggle='modal' data-target=''>" +
						"<div class='panel-heading panel-heading-general  '>" +
							"<span class='general-head-text panel-heading-bg-txt-clr'>" + _Category + "</span>" +
						"</div>" +
						"<div class='general-image-section'><img src='" + G_Exp_BackImage + "' class='img-responsive' alt='' style='display: " + G_Exp_Display + "'>" +
							"<div class='shade-general'></div>" +
                        "</div>" +
						"<div class='col-md-12 general-content p0'>" +
							"<div class='pl10 pr10'>" +
								//"<p class='general-title'><a href='#' class='' onclick='GetdatainModel(" + _itemID + ");' data-toggle='modal' data-target='#MyRecognitionModel'>" + _Title_text + "</a></p>" +
								"<p class='general-title'><a href='"+LinkAddress+"' class=''>" + _Title_text + "</a></p>" +
								"<p class='general-name event-text-head-new'>" + _EmployeeName + "</p>" +
							"</div>" +
							"<div class='general-view pl10 pr10'>" +
							"<a href='#' class='Btn_General'><i class='fa fa-chevron-circle-right'></i></a><span class='pull-right date-time-card'> " + PublishDate + " </span>" +
							"</div>" +
						"</div>" +
					"</a>" +
				"</div>" +
			"</div>" +
		"</div>";
    }

    else if (_Type == "Welcome") {
        Html_Design = Html_Design + "<div class='col-md-12 pl0 pr5'>" +
        	"<div class='panel panel-default panel-mb10'>" +
            	"<div class='panel-heading panel-heading-welcome '><span class='welcome-head-text panel-heading-bg-txt-clr'>Welcome</span></div>" +
        		"<div class='panel-body panel-body-welcome'>" +
                	"<p class='welcome-title event-text-head-new'>" + _EmployeeName + "</p>" +
                	"<p class='welcome-type'>" + _Title_text + "</p>" +
                	"<div class='col-md-6 col-sm-6 col-xs-6 p0 welcome-image-div'> <a> <img class='img-responsive' src=" + employeePicURL + " alt=''> </a> </div>" +
					"<div class='col-md-6 col-sm-6 col-xs-6 pl10 pr0'>" +
                    	"<div class='welcome-content'>" +
                    		"<p>" + _Designation + "</p>" +
                    		"<p>" + _Department + "</p>" +
                    		"<p>" + _OfficeLocation + "</p>" +
                    		"<p>" + _Description + "</p>" +
                    	"</div>" +
                	"</div>" +
					"<div class='col-md-12 col-sm-12 col-xs-12 pl0 pr0 pt5'>" +
						"<a href=" + _spPageContextInfo.webAbsoluteUrl + "/Pages/EmployeeDetails.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&mode=editview&department=&employeedIddetails=" + _EmpID + "&sourcelocation=../Pages/Default.aspx" + " class='welcome-button' class='welcome-button'>Details</a>" +
					"</div>" +
            	"</div>" +
          	"</div>" +
		"</div> ";
    }
}


var employeePicURL = "";
function GetEmployeeImg(EmpID, emptype) {
    var listname, id;
    var restQuery = "";
    if (emptype == "Employee") {
        listname = "Employees";
        id = EmpID;
        restQuery = "AttachmentFiles,Email&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
    }
    else if (emptype == "EmployeeGeneral") {
        listname = "Employees";
        id = EmpID;
        restQuery = "AttachmentFiles,Email&$expand=AttachmentFiles&$filter=Email eq '" + id + "'";
    }

    else if (emptype == "Others") {
        listname = "Announcements";
        id = EmpID;
        restQuery = "AttachmentFiles,Email&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
    }
    else if (emptype == "Alert/Announcement") {
        listname = "Announcements";
        id = EmpID;
        restQuery = "AttachmentFiles,Email&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
    }

    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listname + "')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            employeePicURL = "";
            if (emptype != "Alert/Announcement") {
                if (items.length > 0) {
                    if (items[0].AttachmentFiles.results.length > 0) {
                        employeePicURL = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                    	if(items[0].Email != null && items[0].Email != "null" && items[0].Email != ""){
                        	employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].Email)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                    	}
                    	else {
                    		employeePicURL = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                    	}
                    }
                }
                else {
                    employeePicURL = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                }
            }
            else {
                $("#_AttachDocument").html('');
                if (items[0].AttachmentFiles.results.length != 0) {
                    for (var x = 0; x < items[0].AttachmentFiles.results.length; x++) {
                    	if (emptype == "Alert/Announcement") {
                        	$("#_AttachDocument").append('<a onclick="priviewfile(this);" href="javascript:void(0)" data-filename="' + items[0].AttachmentFiles.results[x].FileName +'" data-fileUrl="' + items[0].AttachmentFiles.results[x].ServerRelativeUrl +'" name=' + items[0].AttachmentFiles.results[x].ServerRelativeUrl + '> ' + items[0].AttachmentFiles.results[x].FileName + '<i class="fa fa-eye"></i></a>');
                    	}
                    	else {
                        	$("#_AttachDocument").append('<a onclick="priviewfile(this);" href="javascript:void(0)" data-filename="' + items[0].AttachmentFiles.results[x].FileName +'" data-fileUrl="' + items[0].AttachmentFiles.results[x].ServerRelativeUrl +'" name=' + items[0].AttachmentFiles.results[x].ServerRelativeUrl + '> ' + items[0].AttachmentFiles.results[x].FileName + '</a>');
                        }
                    }
                }
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}
function priviewfile(Action) {


     var iframeUrl1 ="";
    var docExt = Action.dataset.filename.split('.').pop();
    if (docExt == 'doc' || docExt == 'docx' || docExt == 'xls' || docExt == 'xlsx' || docExt == 'ppt' || docExt == 'pptx' || docExt == 'pdf' ) {
           iframeUrl1 = _spPageContextInfo.webAbsoluteUrl +'/_layouts/15/WopiFrame.aspx?sourcedoc=' + Action.dataset.fileurl + '&action=interactivepreview';
       }else
       {
       iframeUrl1= Action.dataset.fileurl;
       }

    src = Action.name + "?web=1";
    if (Action.name == null) {
        src = Action.title + "?web=1";
        iframeUrl1 = Action.title + "?web=1";
    }
    $("#DownloadDocs").prop("href", window.location.origin + Action.dataset.fileurl);
    var container = $("#doc-viewer").empty();
    $('<iframe>', {
        src: iframeUrl1,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
    
     setTimeout(function () {
    if ($('#iframe-viewer').contents().find('body').html() == "") {
     $("#doc-viewer").empty();
    var htmlse = '<div class="col-md-12">' +
                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                '<span><h2 class="text-center">No preview available. File has been downloaded.</h2></span>';
            $('#doc-viewer').append('<div width="100%" id="viewMyDocuments" style="padding-top:0px">' + htmlse + '</div>');

    }
    }, 2000);

}

function GetFixedImagesTimeline(filename) {
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('ImageGallery')/files?Select=*,ServerRelativeUrl&$filter=Title eq '" + filename + "'";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        async: false,
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            employeePicURL = '';
            var res = data.d.results;
            if (res.length > 0) {
                if (filename == "Recognition") {
                    G_PopUpBackImage = _spPageContextInfo.webAbsoluteUrl + "/ImageGallery/" + res[0].Name;
                }
                else {
                    employeePicURL = _spPageContextInfo.webAbsoluteUrl + "/ImageGallery/" + res[0].Name;
                    return employeePicURL;
                }
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

//Bind Images of Announcements
function bindImages(AnnouncemntId){
	$("#imagesgeneral").show();
	var Image = '';
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'" + AnnouncemntId + "') ";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            $("#AnnouncemntImages").empty();
            var res = data.d.results;
            var imagesStore = [];
            if (res.length > 0) {
            	Image += '<div class="item active">';
            	Image += '<img src='+encodeURI(res[0].ServerRelativeUrl)+' alt="">';
            	Image += '</div>';

	            for (x=1; x < res.length; x++) {
	            	Image += '<div class="item">';
	            	Image += '<img src='+encodeURI(res[x].ServerRelativeUrl)+' alt="">';
	            	Image += '</div>';
	            }
	            $("#AnnouncemntImages").append(Image);
	            if (res.length == 1) {
            		$(".ImageArrow").hide();
				}
				else {
					$(".ImageArrow").show();
				}
	        }
	        else {
	        	$("#imagesgeneral").hide();
	        }
	    },
        error: function ajaxError(response) {
            alert(response.status + ' ' + response.statusText);
        }
    });
}



var G_PopUpBackImage = '';
var G_PopUpBackImageDisplay = '';
var ItemID = '';
var G_ItemId = '';
function GetdatainModel(id) {
    G_ItemId = id;
    ItemID = id;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,Author/Title,TeamMembers/Title,TeamMembers/EMail,AttachmentFiles,category/CatogeryName&$expand=Author,TeamMembers/ID,AttachmentFiles,category&$filter=ID eq ('" + id + "')";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            //GetEmployeeImages();
            $("#RecTitle").text('');
            $("#EmpName").text('');
            $("#EmpDesignation").text('');
            $("#EmpDepartment").text('');
            $("#EmpLocation").text('');
            $("#DtlDescription").text('');
            $("#TextTitle").text('');
            $("#WebLinkText").text('');

            var items = data.d.results;
             $("#EmpName").text(items[0].EmployeeName);
            if (items[0].WebPartName == "General") {
                $("#ModelHeading").text(items[0].category.CatogeryName);
                $("#RecTitle").text(items[0].Title);
                $("#PopType").text("Experience");
                if(items[0].UserType == "Internal Users")
            	{
            		$("#EmpName").text(items[0].TeamMembers.results[0].Title);                	
            	}
            }
            if (items[0].WebPartName == "Recognition") {
                $("#RecTitle").text(items[0].Title);
                var ImgTitle = "Recognition";
                GetFixedImagesTimeline(ImgTitle);
                $("#BannerImagePopUp").attr("src", G_PopUpBackImage);
                $("#PopType").text("Recognition");
            }
            $("#Itemdate").text(formatDate(items[0].Created));
           
            if (items[0].WebPartName == "General") {
                if (items[0].WebLinks != null) {
                    $("#WebLinkText").text(items[0].WebLinks.Url);
                    $("#linkdiv").css("display", "block");
                    $("#WebLink").attr("href", items[0].WebLinks.Url);
                }
            }
            else {
                $("#linkdiv").css("display", "none");
            }
            if (items[0].Designation != null) {
                $("#EmpDesignation").text(items[0].Designation);
            }

            if (items[0].Department != null) {
                $("#EmpDepartment").text(items[0].Department);
            }
            else {
                $("#spSymbol").css("display", "none");
            }

            if (items[0].OfficeLocation != null) {
                $("#EmpLocation").text(items[0].OfficeLocation);
            }
            else {
                $("#spSymbol").css("display", "none");
            }

            if (items[0].Description != null) {
                $("#DtlDescription").html(items[0].Description);
            }


            if (items[0].WebPartName == "Alert" || items[0].WebPartName == "Announcement") {
	          
                $("#_ModelHeading").text(items[0].WebPartName);
                
                var AllowComments = items[0].Related_Word;
                if(AllowComments == "Allowed")
                {
                	$(".Allow-Comments").css("display", "block");
                	$(".Stop-Allow-Comments").css("display", "block");
                }
                else if(AllowComments == "Not Allowed")
                {
                	$(".Allow-Comments").css("display", "none");
                }
                else if(AllowComments == "Stop")
                {
                	$(".Allow-Comments").css("display", "block");
                	$(".Stop-Allow-Comments").css("display", "none");
                }
                else
                {
                	$(".Allow-Comments").css("display", "none");
                }
                
                
                
                if (items[0].Title != null) { $("#_TextTitle").text(items[0].Title); }
                $("#AnnouncmntAuthor").text(items[0].Author.Title);
				$("#AnnouncmntCreated").text(formatDate(items[0].Created));
                if (items[0].Description != null) {
                    var AnnouncementDescription = removetag(items[0].Description);
                    if (AnnouncementDescription.length > 980) {
                    	if(items[0].WebPartName == "Alert"){
                        	$("#_DtlDescription").html(jQuery.trim(AnnouncementDescription).substring(0, 980) + '...<a class="common-popup-description-more" href="javascript:void(0);" id="annReadMore">Read More</a>');
                        }
                        else {
                        	$("#_DtlDescription").html(jQuery.trim(AnnouncementDescription).substring(0, 980) + '...<a class="common-popup-description-more panel-heading-bg-txt-clr" href="javascript:void(0);" id="annReadMore">Read More</a>');
                        }
                         $("#annReadMore").click(function () {
                            $("#_DtlDescription").html(items[0].Description);
                        });
                    }
                    else {
                        $("#_DtlDescription").html(items[0].Description);
                    }
                }
                if(items[0].WebPartName == "Alert"){
                	$("#_ModelHeading").removeClass("common-head-text-popup");
                	$("#_ModelHeading").removeClass("panel-heading-bg-txt-clr");
                	$("#_ModelHeading").removeAttr("style");
                	$("#_ModelHeading").addClass("common-head-text-popup-Alert");
                	$("#NoticeBgImage").attr("src","https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/DevelopersCode/DefaultHome/images/alert-popup.png");
                	$('#annReadMore').attr('style', 'background: #f00 !important');
                }
                else {
                	$("#_ModelHeading").removeClass("common-head-text-popup-Alert");
                	$("#_ModelHeading").addClass("common-head-text-popup");
                	$("#_ModelHeading").addClass("panel-heading-bg-txt-clr");
                	$("#NoticeBgImage").attr("src","https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/DevelopersCode/DefaultHome/images/announcement-popup.png");
                	$('#annReadMore').attr('style', 'background: #ff9e20 !important');
                }

                if (items[0].WebLinks != null) {
                    //$("#_WebLinkText").text(items[0].WebLinks.Url);
                    //$("#linkdiv").css("display", "block");
                    $("#divLink").show();
                    $("#_WebLink").text(items[0].WebLinks.Url);
                    $("#_WebLink").attr("href", items[0].WebLinks.Url);
                }
                else {
                    //$("#linkdiv").css("display", "none");
                    //$("#_WebLinkText").text("");
                    //$("#linkdiv").css("display", "block");
                    $("#divLink").hide();
                    $("#_WebLink").text("");
                    $("#_WebLink").attr("href", "");
                }
                //GetAttachments
                GetEmployeeImg(ItemID, emptype = "Alert/Announcement");
            }
            
            if (items[0].UserType == "Employee" || items[0].UserType == "Internal Users") {
                if(items[0].WebPartName == "Recognition")
                {
                	GetEmployeeImg(items[0].EmployeeID, emptype = "Employee");
                    $('#profile-image').prop('src', employeePicURL);
                }
               
                else if (items[0].TeamMembers.results != null && items[0].TeamMembersId != null)
                {
                	if(items[0].UserType == "Internal Users")
                	{
                		GetEmployeeImg(items[0].TeamMembers.results[0].EMail, emptype = "EmployeeGeneral");
                    	$('#profile-image').prop('src', employeePicURL);
                	
                	}
                	else
                	{
                    	GetEmployeeImg(items[0].EmployeeID, emptype = "Employee");
                    	$('#profile-image').prop('src', employeePicURL);
                    }
                }
            }
            else if (items[0].UserType == "Others" || items[0].UserType == "External Users") {
                if (items[0].AttachmentFiles.results.length > 0) {
                    //GetEmployeeImg(items[0].ID,emptype="Others");
                    //$('#profile-image').prop('src', employeePicURL);
                    var attachmentUrl = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    $('#profile-image').prop('src', attachmentUrl);
                }
                else if (items[0].WebLinks != null) {
                    var attachmentUrl = items[0].WebLinks.Description;
                    $('#profile-image').prop('src', attachmentUrl);
                }

            }
            else if (items[0].UserType == "Team") {
                if (items[0].AttachmentFiles.results.length > 0) {
                    var attachmentUrl = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    $('#profile-image').prop('src', attachmentUrl);
                }
                else if (items[0].WebLinks != null) {
                    var attachmentUrl = items[0].WebLinks.Description;
                    $('#profile-image').prop('src', attachmentUrl);
                }
                //GetFixedImagesTimeline(filename="TEAM");
                //$('#profile-image').prop('src', employeePicURL);
            }
            else if (items[0].UserType == "Department") {
                $("#EmpDepartment").text('');
                GetFixedImagesTimeline(filename = "DEPARTMENT");
                $('#profile-image').prop('src', employeePicURL);
            }
			if(items[0].WebPartName == "Announcement" || items[0].WebPartName == "Alert"){
				//Bind Images of Announcements/Alert
				bindImages(ItemID);
				if (MediatextColor != null && HeaderTextColor != null) {
	                $('.panel-heading-bg-txt-clr').each(function () {                 //For Theme
	                    this.style.setProperty('color', MediatextColor, 'important');
	                    this.style.setProperty('background', HeaderTextColor, 'important');
	                });
            	}

			}
			else {
            	GetDocuments(ItemID, items[0].WebPartName);
			}
            ReadCommentOnPost(ItemID); // Read Comments on selected Post....  
            LoadChatting(items[0].WebPartName, items[0].Id, items[0].ViewCount, items[0].LikeCount, items[0].ComentsCount);
        },
        error: function (data) {
            console.log(data);
        }
    });
}


var tempStore = [];
function GetDocuments(filename, webpartname) {
    var DocType = '';
    var ImgType = '';
    if (webpartname == "General") { DocType = "Image"; } else if (webpartname == "Recognition") { DocType = "Award_Image"; }
    if (webpartname == "General") { ImgType = "Document"; } else if (webpartname == "Recognition") { ImgType = "Award_Document"; }

    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'" + filename + "')";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            $("#AttachDoc").empty();
            var res = data.d.results;
            var imagesStore = [];
            if (res.length > 0) {
                var x = 0;
                for (x; x < res.length; x++) {
                    if (res[x].Title == DocType) {
                        var imgname = _spPageContextInfo.webAbsoluteUrl + "/GeneralPicturesGallery/" + res[x].Name;
                        imagesStore.push(imgname);
                    }
                    else if (res[x].Title == ImgType) {
                        var Docname = res[x].Name;
                        $('#AttachDoc').append('<div id="_file_' + x + '"><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + x + '</strong><a name="' + document.location.origin + res[x].ServerRelativeUrl + '" onclick="priviewfile(this);" href="javascript:void(0)" data-filename="' + res[x].Name +'" data-fileUrl="' + res[x].ServerRelativeUrl +'"><span class="play"></span><span class="">' + res[x].Name + '</span></a> </div>');
                    }
                }
            }
            $("#1stImg").empty();
            if (webpartname == "General") {
                if (imagesStore.length > 0) { $("#BannerImagePopUp").attr("src", imagesStore[0]); $("#BannerImagePopUp").css("display", "block"); }
                else { $("#BannerImagePopUp").attr("src", ''); $("#BannerImagePopUp").css("display", "none"); }

                if (imagesStore.length < 2) { $(".my_experience_controls").hide(); }
                else { $(".my_experience_controls").show(); }

                if (imagesStore.length > 0) {
                    $("#carousel-example-generic").show();
                    for (k = 1; k < imagesStore.length; k++) {
                        if (k == 1) { $('#1stImg').append('<div class="item active"><img src="' + imagesStore[k] + '" id="sliderImage' + k + '"  alt=""></div>'); }
                        else { $('#1stImg').append('<div class="item"><img src="' + imagesStore[k] + '" id="sliderImage' + k + '"  alt=""></div>'); }
                    }
                }
                else {
                    for (k = 0; k < 2; k++) {
                        if (k == 0) { $('#1stImg').append('<div class="item active"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/Biography/images/i1.jpeg" id="sliderImage' + k + '"  alt=""></div>'); }
                        else { $('#1stImg').append('<div class="item"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/Biography/images/i2.jpg" id="sliderImage' + k + '"  alt=""></div>'); }
                    }
                    $("#carousel-example-generic").hide();
                }
            }
            else {
                if (imagesStore.length <= 1) { $(".my_experience_controls").hide(); }
                else { $(".my_experience_controls").show(); }
                if (imagesStore.length > 0) {
                    $("#carousel-example-generic").show();
                    for (k = 0; k < imagesStore.length; k++) {
                        if (k == 0) { $('#1stImg').append('<div class="item active"><img src="' + imagesStore[k] + '" id="sliderImage' + k + '"  alt=""></div>'); }
                        else { $('#1stImg').append('<div class="item"><img src="' + imagesStore[k] + '" id="sliderImage' + k + '"  alt=""></div>'); }
                    }
                }
                else {
                    for (k = 0; k < 2; k++) {
                        if (k == 0) { $('#1stImg').append('<div class="item active"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/Biography/images/i1.jpeg" id="sliderImage' + k + '"  alt=""></div>'); }
                        else { $('#1stImg').append('<div class="item"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/Biography/images/i2.jpg" id="sliderImage' + k + '"  alt=""></div>'); }
                    }
                    $("#carousel-example-generic").hide();
                }
            }
        },
        error: function ajaxError(response) {
            alert(response.status + ' ' + response.statusText);
        }
    });
}


function Universalinsert(listName, item) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items",
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


var LoginUserImage = '';
var CommentUserImage = '';
var LoginUserID = '';
function GetEmployeeImages(EmpID) {
    var Ownurl = '';
    if (EmpID == undefined || EmpID == null) {
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ID,AttachmentFiles,Designation,City,Department/DepartmentName,OfficeLocation/OfficeName,DateOfBirth,DayOfBirth,MonthOfBirth,DateOfAnniversary,DayOfAnniversary,MonthOfAnniversary,LogonName/Title,Email&$orderby=FullName&$top=5000&$expand=LogonName,OfficeLocation,AttachmentFiles,Department&$filter=Email eq ('" + _spPageContextInfo.userEmail + "')";
    }
    else {
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ID,AttachmentFiles,Designation,City,Department/DepartmentName,OfficeLocation/OfficeName,DateOfBirth,DayOfBirth,MonthOfBirth,DateOfAnniversary,DayOfAnniversary,MonthOfAnniversary,LogonName/Title,Email&$orderby=FullName&$top=5000&$expand=LogonName,OfficeLocation,AttachmentFiles,Department&$filter=ID eq ('" + EmpID + "')";
    }
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                if (EmpID == undefined || EmpID == null) {
                    LoginUserID = items[0].ID;
                    if (items[0].AttachmentFiles.results.length > 0) {
                        LoginUserImage = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        LoginUserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].Email)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                    }
                    $('#LoginUserImage').attr("src", LoginUserImage);
                }
                else {
                    if (items[0].AttachmentFiles.results.length > 0) {
                        CommentUserImage = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        CommentUserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].Email)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                    }
                }
            }
        },
        error: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
}


function PushComment() {
    var d = new Date();
    var strDate = d.getDate() + "-";
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var Currentdate = strDate.concat(monthNames[d.getMonth()]);
    if ($("#TextComment").val().trim().length > 0) {
        var comment = $("#TextComment").val().trim();
        if (comment.length < 251) {
            var DataID = ItemID.toString();
            var listName = "AnnouncementsChild";
            var Webpartname = "General";
            var itemComment = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Title': comment, 'WebPartName': Webpartname, 'Item_ID': DataID, 'ReplierID': LoginUserID.toString() };
            Universalinsert(listName, itemComment);
            $(".emojionearea-editor").empty();
            ReadCommentOnPost(DataID);
        }
        else {
            alert("Maximum length 250 characters.");
        }
    }
}


var G_ID_FOR_ReadComment = '';
function ReadCommentOnPost(ItmID) {
    $(".emojionearea-editor").empty();
    $("#SaveBTN").hide();
    $("#PostBTN").show();

    G_ID_FOR_ReadComment = ItmID;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?$filter= Item_ID eq ('" + ItmID + "')&$expand=Author/Id&$select=*,Author/Name,Author/Title";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            $("#AllComents").empty();
            var items = data.d.results;
            var likeCount = [];
            var AuthorList = [];
            var HtmlDesign = '';
            if (items.length > 0) {
                for (var i = 0; i < data.d.results.length; i++) {
                    var value = data.d.results[i];
                    var ReplyDateObj = new Date(value.Created);
                    var Replytime = ReplyDateObj.toTimeString();
                    GetEmployeeImages(value.ReplierID);
                    var H = +Replytime.substr(0, 2);
                    var h = (H % 12) || 12;
                    var ampm = H < 12 ? " AM" : " PM";
                    Replytime = h + Replytime.substr(2, 3) + ampm;

                    if (parseInt(value.AuthorId) == _spPageContextInfo.userId) { setdisplay = "display: block"; } else { setdisplay = "display: none"; }

                    if (value.Title != null) {
                        HtmlDesign = HtmlDesign + "<div class='col-md-12 col-sm-12 reply-box'>" +
                            "<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'>" +
                                "<span class='mr10'><img src=" + CommentUserImage + " class='img-circle' width='36' height='36' alt=''></span>" +
                                "<span>" + value.Author.Title + "</span> - <span>" + CustomformatDate(value.Created) + "</span> at <span> " + Replytime + " </span>" +
                            "</div>" +
                            //"<h4 id='Comment"+value.ID+"'>"+value.Title+"</h4>"+
                            "<h4 id='Comment" + value.ID + "'>" + value.Title + "</h4>" +
                            "<div class='clearfix'></div>" +
                            "<div class='col-md-12 col-md-12 pt0 pl0 pr0' style='" + setdisplay + "'>" +
                                "<span class='cmt-edit-button'><a href='#' id='" + value.ID + "' onclick='DisplayEditBox(" + value.ID + ")' ><i class='fa fa-pencil'></i><p>Edit</p></a> </span>" +
                                "<span class='cmt-delete-button mml5 ml20'><a href='#' onclick='DeleteComments(" + value.ID + ")'><i class='fa fa-trash'></i><p> Delete</p> </span></a>" +
                            "</div>" +
                            "<div class='EditBox' id='EditBox" + value.ID + "' style='display:none;'>" +
                                "<div class='col-md-12 col-sm-12 comment-box-in mt5 p0'>" +
                                    //"<div class='col-lg-10 col-md-10 col-sm-10 col-xs-12 p0 tpl0'><span id='CommentEditDiv"+value.ID+"'><textarea class='form-control custom-control EditTextArea' rows='2' id='commenttext"+value.ID+"' style='resize:none;'></textarea></span></div>"+
                                    //"<button type='button' id='save2'  class='btn btn-post pull-right pt10' onclick='UpdateEditComment()' ><label>Save</label></button>"+
                                    "<div class='clearfix'></div>" +
                                "</div>" +
                            "</div>" +
                        "</div>";
                    }

                    if (value.Like == "Yes") {
                        likeCount.push(value.Like);
                        AuthorList.push(value.Author.Title);
                    }
                }
                $('#AllComents').append(HtmlDesign);

                if (likeCount.length == 0) {
                    $("#TotalLike").text("");
                    $("#AuthorList").text("");
                }
                else {
                    $("#TotalLike").text(likeCount.length);
                    $("#AuthorList").text(AuthorList);
                }
            }
            else {
                $("#TotalLike").text("");
                $("#AuthorList").text("");
            }
            // SetLikeBtnValueTimeline(ItmID); 

            $(".EditTextArea").emojioneArea({
                ickerPosition: "right",
                tonesStyle: "bullet",
                events: {
                    keyup: function (editor, event) {
                        //console.log(editor.html());
                        //console.log(this.getText());
                    }
                }
            });
        },
        error: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
}

var G_CommentID = '';
function DisplayEditBox(DisplayID) {
    $("#PostBTN").hide();
    $("#SaveBTN").show();
    var ExistingComment = $("#Comment" + DisplayID).html();
    //	$(".EditBox").css("display", "none");
    //$("#EditBox"+DisplayID).css("display", "block");
    //$('.emojionearea-editor').html(ExistingComment);
    $(".emojionearea-editor").html(ExistingComment);
    //	$('#TopCommentArea').find('.emojionearea-editor').html(ExistingComment);
    G_CommentID = DisplayID;
}


function UpdateEditComment() {
    //var NewComment = $('#TopCommentArea').find('.emojionearea-editor').html();
    var NewComment = $("#TextComment").val().trim();
    var StrLength = NewComment.trim().length;
    if (StrLength > 0) {
        if (StrLength < 251) {
            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/items(" + G_CommentID + ")",
                type: "POST",
                data: JSON.stringify({
                    __metadata: { type: "SP.Data.AnnouncementsChildListItem" },
                    Title: NewComment
                }),
                headers:
                {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "IF-MATCH": "*",
                    "X-HTTP-Method": "MERGE"
                },
                success: function (data, status, xhr) {
                    console.log("Comment Updated");
                    //GetdatainModel(ItemID);
                    ReadCommentOnPost(ItemID);
                },
                error: function (data) {
                    console.log("UpdateEditComment Failed");
                    console.log(data);
                }
            });
        }
        else {
            alert("Maximum length 250 characters.");
        }
    }
}


function DeleteComments(_ItemID) {
    if (confirm('Are you sure to delete this record?')) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/items(" + _ItemID + ")",
            type: "POST",
            headers:
            {
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            success: function (data) {
                alert("Selected record deleted successfully.");
                ReadCommentOnPost(ItemID);
            },
            error: function (data) { $("#ResultDiv").empty().text(data.responseJSON.error); }
        });
    }
}


var LikeVal = '';
var LikeID = '';
function SetLikeBtnValueTimeline(ItmID) {
    //var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?$filter= (Item_ID eq '"+ ItmID +"' and AuthorId eq '"+_spPageContextInfo.userId+"' and  Like eq 'Yes' and ReplierID eq '' or Like eq 'No')";  
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?$filter= (Item_ID eq '" + ItmID + "' and AuthorId eq '" + _spPageContextInfo.userId + "' and  ReplierID eq null)";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                LikeVal = items[0].Like;
                LikeID = items[0].ID;
            }
            else {
                LikeVal = "New";
            }

            if (LikeVal == "New") {
                var listName = "AnnouncementsChild";
                var DataID = ItemID.toString();
                var Webpartname = "General";
                var Like = "Yes";
                var itemLikes = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Like': Like, 'WebPartName': Webpartname, 'Item_ID': DataID };
                Universalinsert(listName, itemLikes);
                ReadCommentOnPost(DataID);
            }
            else if (LikeVal == "Yes" || LikeVal == "No") {
                updateLikes();
            }

        },
        error: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
}


function AddLike() {
    SetLikeBtnValueTimeline(G_ItemId);
}

function updateLikes() {
    var likebtnvalue = '';
    if (LikeVal == "Yes") {
        likebtnvalue = "No";
    }
    else if (LikeVal == "No") {
        likebtnvalue = "Yes";
    }
    $.ajax
    ({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/items('" + LikeID + "')",
        type: "POST",
        data: JSON.stringify
        ({
            __metadata:
            {
                type: "SP.Data.AnnouncementsChildListItem"
            },
            Like: likebtnvalue,
            WebPartName: "General",
            Item_ID: ItemID.toString()
        }),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data, status, xhr) {
            console.log("Data Updated!");
            ReadCommentOnPost(ItemID);
        },
        error: function (xhr, status, error) {
            $("#ResultDiv").empty().text(data.responseJSON.error);
        }
    });
}

function GetCategory() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$filter=CategoryType eq 'Recognition' and Status eq 'Yes'&$orderby=DepartmentName asc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                $('#ddlcategory').append($("<option     />").val('All').text('All'));
                for (i = 0; i < items.length; i++) {
                    $('#ddlcategory').append($("<option     />").val(items[i].ID).text(items[i].CatogeryName));
                }
            }
        },
        eror: function (data) {
            console.log(data);
        }
    });
}

function ReadDepartment() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$filter=CompanyID eq '" + titanForWork.getQueryStringParameter('CompanyId') + "'&$orderby=DepartmentName asc";
    $.ajax({
        url: Ownurl,
        async: true,
        headers: { Accept: "application/json;odata=verbose" },
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                $('#ddldepartment').append($("<option     />").val('All').text('All'));
                for (i = 0; i < items.length; i++) {
                    $('#ddldepartment').append($("<option     />").val(items[i].DepartmentName).text(items[i].DepartmentName));
                }
            }
        },
        eror: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
}

var G_Exp_BackImage = '';
var G_Exp_Display = '';
function SetbackImage(filename, webpartname) {
    var ImgType = '';
    G_Exp_BackImage = '';
    G_Exp_Display = '';
    if (webpartname == "General") { DocType = "Image"; }
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'" + filename + "')";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        async: false,
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            var res = data.d.results;
            var imagesStore = [];
            if (res.length > 0) {
                var x = 0;
                for (x; x < res.length; x++) {
                    if (res[x].Title == DocType) {
                        var imgname = _spPageContextInfo.webAbsoluteUrl + "/GeneralPicturesGallery/" + res[x].Name;
                        imagesStore.push(imgname);
                    }
                }
            }
            if (imagesStore.length > 0) {
                G_Exp_BackImage = imagesStore[0];
                G_Exp_Display = 'block';
            }
            else {
                G_Exp_Display = 'none';
            }
        },
        error: function ajaxError(response) {
            alert(response.status + ' ' + response.statusText);
        }
    });
}

$(window).load(function () {
    $("#F_All").css('background-color', HeaderTextColor).css('color', MediatextColor);
});


function FilterGetdata(Query)
{
	var ResultItems=[];
	var Ownurl = Query;
	$.ajax({  
  		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 			
           ResultItems = data.d.results;  
        },
		error: function (data) 
		{  
			console.log(data);
        	alert("An error occurred. Please try again.");  
		}  
    });
    return ResultItems;
}

