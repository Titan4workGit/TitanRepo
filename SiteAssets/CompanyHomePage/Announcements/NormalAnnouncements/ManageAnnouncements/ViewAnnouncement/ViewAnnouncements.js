var IsAnnouncementAdmin = false;
var response = response || [];
var scrollPosition = '';
var arrAnouncAlert = [];
var NextURL = '';
var currentDlg = "";
$(document).ready(function () {
    InitializeControls();
    $("#_btnaddviewAlert").click(function () {
        location.href = "../Pages/Announcements.aspx?Mode=Add&WebAppId=" + Logged_CompanyId + "&Type=Alert&sourcelocation=../Pages/ViewAnnouncements.aspx?sourcelocation=../Pages/Default.aspx"
    });
    $("#_btnaddviewAnnouncement").click(function () {
        location.href = "../Pages/Announcements.aspx?Mode=Add&WebAppId=" + Logged_CompanyId + "&Type=Announcement&sourcelocation=../Pages/ViewAnnouncements.aspx?sourcelocation=../Pages/Default.aspx"
    });
    $("#btnCloseViewModal").click(function () {
        $("#Announcement_Alert").modal('hide');
        $("#showInnerLikesAnncmnt").addClass("show-inner-likes-box-hide");
    });
    $("#btnApply").click(function () {
        //Loader
        $("#SearchInput").val('');
        var dlgTitle = 'Searching data...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
            currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        });
        setTimeout(function () {
            arrAnouncAlert = [];
            filterAlertAnnouncment("Filter");
            if (MediatextColor != null && HeaderTextColor != null) {
                $('.panel-heading-bg-txt-clr').each(function () {                 //For Theme
                    this.style.setProperty('color', MediatextColor, 'important');
                    this.style.setProperty('background', HeaderTextColor, 'important');
                });
            }
        }, 100);
    });
    $("#btnClear").click(function () {//Clear for filter popup
        clearSelection();
    });
    $("#btnSeeMore").click(function () {//See more of pageLoad
        //Loader
        $("#SearchInput").val('');
        var dlgTitle = 'Loading data...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 220;
        var dlgWidth = 400;
        SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
            currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        });
        setTimeout(function () {
            $("#SearchInput").val('');
            getAlertAnnouncments('SeeMore');
            if (MediatextColor != null && HeaderTextColor != null) {
                $('.panel-heading-bg-txt-clr').each(function () {                 //For Theme
                    this.style.setProperty('color', MediatextColor, 'important');
                    this.style.setProperty('background', HeaderTextColor, 'important');
                });
            }
        }, 100);
    });
    $("#btnSeeMoreFilter").click(function () {//See more of pageLoad
        //Loader
        $("#SearchInput").val('');
        var dlgTitle = 'Loading data...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 220;
        var dlgWidth = 400;
        SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
            currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        });
        setTimeout(function () {
            $("#SearchInput").val('');
            filterAlertAnnouncment('SeeMore');
            if (MediatextColor != null && HeaderTextColor != null) {
                $('.panel-heading-bg-txt-clr').each(function () {                 //For Theme
                    this.style.setProperty('color', MediatextColor, 'important');
                    this.style.setProperty('background', HeaderTextColor, 'important');
                });
            }
        }, 100);
    });
    $("#btnSearchtxt").click(function () {
        var dlgTitle = 'Searching data...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
            currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        });
        setTimeout(function () {
            SearchOnClick();
        }, 100);
    });

});

//to search within the visible data - AuthorName, Designation, Title, Description columns
function SearchOnClick() {
    try {
        var SearchValue = '';
        SearchValue = $("#SearchInput").val().trim();
        var arrTempFiles = [];
        if (SearchValue != "") {
            arrTempFiles = arrAnouncAlert.filter(function (data) {
                if (data.Designation == null || data.Designation == '') {
                    data.Designation = 'null';
                }
                return (SearchValue.trim() == "null" ? data.Author.Title != "null" : (data.Author.Title.toLowerCase() == SearchValue.toLowerCase() || data.Author.Title.toLowerCase().indexOf(SearchValue.toLowerCase()) != -1)) ||
						(SearchValue.trim() == "null" ? data.Designation != "null" : (data.Designation.toLowerCase() == SearchValue.toLowerCase() || data.Designation.toLowerCase().indexOf(SearchValue.toLowerCase()) != -1)) ||
	                    (SearchValue.trim() == "null" ? data.Title != "null" : (data.Title.toLowerCase() == SearchValue.toLowerCase() || data.Title.toLowerCase().indexOf(SearchValue.toLowerCase()) != -1)) ||
	                    (SearchValue.trim() == "null" ? data.Description != "null" : (data.Description.toLowerCase() == SearchValue.toLowerCase() || data.Description.toLowerCase().indexOf(SearchValue.toLowerCase()) != -1))
            });
            bindSearchFiles(arrTempFiles);
        }
        else {
            bindSearchFiles(arrAnouncAlert);
            $("#btnSeeMore").show();
        }
    }
    catch (Error) {
        if (currentDlg != "") {
            currentDlg.close();
        }
        console.log(Error);
    }
}

//bind search result after Search control box (Keyup filter)
function bindSearchFiles(Announecemnts) {
    var bindEmp = '';
    var AlertAnnouncment = '';
    var splittedTitle = '';
    $("#allAnnouncements").html('');
    $("#btnSeeMore").hide();
    $("#btnSeeMoreFilter").hide();
    if (Announecemnts.length > 0) {
        for (var i = 0; i < Announecemnts.length; i++) {
            AlertAnnouncment += '<div class="announcement-card-panel">';
            if (Announecemnts[i].Announcement_Type == "Announcement") {
                AlertAnnouncment += '<div class="row announcement-card-panel-row announcement-card-panel-row-bg mx-0">';
            }
            else { //Alert
                AlertAnnouncment += '<div class="row announcement-card-panel-row alert-card-panel-row-bg mx-0">';
            }
            AlertAnnouncment += '<div class="col-xs-12">';
            AlertAnnouncment += '<div class="announcement-card-body"><div class="row announcement-inner-card-row">';
            AlertAnnouncment += '<div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">';
            if (Announecemnts[i].Announcement_Type == "Announcement") {
                AlertAnnouncment += '<div class="panel-img-heading-announcement panel-heading-bg-txt-clr">Announcement</div>';
            }
            else { //Alert
                AlertAnnouncment += '<div class="panel-img-heading-alert">Alert</div>';
            }
           
            AlertAnnouncment += '<div class="announcement-inner-card"><div class="announcement-inner-card-head">';
            //EmployeeDetails = getEmployeeMetadata(Announecemnts[i].Author.EMail);
            var userImage = Announecemnts[i].ImageUrl ? Announecemnts[i].ImageUrl : _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Announecemnts[i].Author.EMail);
            AlertAnnouncment += '<img src="' + userImage + '" alt="user"></div><div class="announcement-inner-card-body text-ellipsis">';
            AlertAnnouncment += '<div class="announcement-inner-card-body-info text-ellipsis">';
            var EmpName = Announecemnts[i].EmployeeName ? Announecemnts[i].EmployeeName : "";
            AlertAnnouncment += '<h3 class="member-name text-ellipsis">' + EmpName + '</h3>';
            var Designation = Announecemnts[i].Designation ? Announecemnts[i].Designation : "";
            AlertAnnouncment += '<p class="member-deg text-ellipsis"><span>' + Designation + '</span></p>';
            var DeptName = Announecemnts[i].Department ? Announecemnts[i].Department : "";
            AlertAnnouncment += '<p class="member-date text-ellipsis"><span>' + DeptName + '</span></p>';

            var Publishing = new Date(Announecemnts[i].Publish_Date);
            Publishing = $.datepicker.formatDate('dd-M-yy', Publishing);
            AlertAnnouncment += '</div></div></div><p class="posted-date text-ellipsis"><span>Posted on: ' + Publishing + '</span></p></div>';
            AlertAnnouncment += '<div class="col-lg-9 col-md-8 col-sm-7 col-xs-12">';
            
            AlertAnnouncment += '<div class="announcement-card-body-head">';
            
            if(Announecemnts[i].Title.length > 90){
            	splittedTitle = Announecemnts[i].Title.substring(0, 90) + "...";
            }
            else {
            	splittedTitle = Announecemnts[i].Title;
            }
            AlertAnnouncment += '<h3 class="m-0 announcement-card-body-head-text"><a href="javascript:void(0);" title="'+Announecemnts[i].Title+'" onclick="event.preventDefault();objShowAnnouncements.ShowAnnouncement(' + Announecemnts[i].Id + ');">' + splittedTitle + '</a></h3>';

            var editItem = "../Pages/Announcements.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + Announecemnts[i].Id + "&Mode=Update&Type=" + Announecemnts[i].Announcement_Type + "";
            if (Announecemnts[i].Author.EMail == _spPageContextInfo.userEmail) {
                AlertAnnouncment += '<div class="dropdown custom-card-menu"><button class="px-0 dropdown-toggle button-ed-menu" type="button" data-toggle="dropdown" aria-expanded="false">';
                AlertAnnouncment += '<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/CompanyHomePage/Announcements/NormalAnnouncements/ManageAnnouncements/ViewAnnouncement/assets/images/more-horiz.png"></button>';
                AlertAnnouncment += '<ul class="dropdown-menu dropdown-menu-right">';
                AlertAnnouncment += '<li><a href="' + editItem + '">Edit</a></li>';
                AlertAnnouncment += '<li><a href="javascript:void(0);" onclick="DeleteAnnouncement(\'' + Announecemnts[i].Id + '\', \'' + Announecemnts[i].ApprovalStatus + '\')">Delete</a></li></ul></div>';
            }
            AlertAnnouncment += '</div>';
            var splittedDescription = '';
            Announecemnts[i].Description = stripHtml(Announecemnts[i].Description);
            if (Announecemnts[i].Description.length > 350) {
                splittedDescription = jQuery.trim(Announecemnts[i].Description).substring(0, 350) + "........";
            }
            else {
                splittedDescription = Announecemnts[i].Description;
            }
            AlertAnnouncment += '<div class="mb10"><p class="audience-name text-ellipsis"><span>Audience: <span>' + Announecemnts[i].Audience + '</span></span></p></div>';
            AlertAnnouncment += '<div class="announcement-card-body-dec" title="' + Announecemnts[i].Description + '">' + splittedDescription + '</div>';
            if (Announecemnts[i].Author.EMail == _spPageContextInfo.userEmail && Announecemnts[i].ApprovalStatus == "Pending") {
                AlertAnnouncment += '<div class="announcement-inner-card-btn-panel announcement-inner-card-btn-panel-isTab"><div class="draft-info">Draft</div>';
            }
            else {
                //AlertAnnouncment += '<div class="announcement-inner-card-btn-panel announcement-inner-card-btn-panel-isTab">';
            }
            AlertAnnouncment += '</div></div></div></div></div></div></div>';
        }
        $("#allAnnouncements").append(AlertAnnouncment);
        if (currentDlg != "") {
            currentDlg.close();
        }
    }
    else {
        if ($("#allAnnouncements").html() == "") {
            AlertAnnouncment = '<span>No result found.</span>';
            $("#allAnnouncements").append(AlertAnnouncment);
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    }
}

//to hide or show add announcemnt button
function InitializeControls() {
    var users = checkUserPermission();
    if (users.length == 0) {
        IsAnnouncementAdmin = true;
        $("#").remove();
    }
    else {
        IsAnnouncementAdmin = true;
    }
    initializePeoplePicker("PostedByPplPicker");
    getAlertAnnouncments("PageLoad");
}

//to get Alert/Announcments from "Announcments" list
function getAlertAnnouncments(Action) {
    $("#btnSeeMore").show();
    $("#btnSeeMoreFilter").hide();
    var splittedTitle = '';
    var AlertAnnouncment = '';
    var EmployeeDetails = '';
    if (Action == "PageLoad") {
        arrAnouncAlert = [];
        $("#allAnnouncements").html("");
        var today = new Date();
        var CurrentDate = today.toISOString().substring(0, 10);
        var Query = "?$select=*,Departments/Title,Company/Title,Company/Id,OfficeLocations/Id,OfficeLocations/Title,TeamMembers/Title,Author/EMail,Author/Title&$top=10&$filter=(WebPartName eq 'Announcement' or WebPartName eq 'Alert'  and (ApprovalStatus eq 'Approved' or (Author/EMail eq '" + _spPageContextInfo.userEmail + "' and Company/ID eq '" + Logged_CompanyId + "'))  and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "') or Author/EMail eq '" + _spPageContextInfo.userEmail + "') &$expand=Departments,Company,OfficeLocations,TeamMembers,Author&$orderby=Publish_Date desc,Modified desc";
    }
    else {
        var Query = "?" + NextURL.split('?')[1];
    }
    $.when(getItemsWithQueryItem('Announcements', Query)).done(function (Announecemnts) {
        Announecemnts = Announecemnts.results;
        if (Announecemnts.length > 0) {
            arrAnouncAlert = arrAnouncAlert.concat(Announecemnts);
            for (var i = 0; i < Announecemnts.length; i++) {
                AlertAnnouncment += '<div class="announcement-card-panel">';
                if (Announecemnts[i].Announcement_Type == "Announcement") {
                    AlertAnnouncment += '<div class="row announcement-card-panel-row announcement-card-panel-row-bg mx-0">';
                }
                else { //Alert
                    AlertAnnouncment += '<div class="row announcement-card-panel-row alert-card-panel-row-bg mx-0">';
                }
                AlertAnnouncment += '<div class="col-xs-12">';
                AlertAnnouncment += '<div class="announcement-card-body"><div class="row announcement-inner-card-row">';
                AlertAnnouncment += '<div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">';
                if (Announecemnts[i].Announcement_Type == "Announcement") {
                    AlertAnnouncment += '<div class="panel-img-heading-announcement panel-heading-bg-txt-clr">Announcement</div>';
                }
                else { //Alert
                    AlertAnnouncment += '<div class="panel-img-heading-alert">Alert</div>';
                }
                
                AlertAnnouncment += '<div class="announcement-inner-card"><div class="announcement-inner-card-head">';
                //EmployeeDetails = getEmployeeMetadata(Announecemnts[i].Author.EMail);
                arrAnouncAlert[i].Designation = Announecemnts[i].Designation ? Announecemnts[i].Designation : "";
                var userImage = Announecemnts[i].ImageUrl ? Announecemnts[i].ImageUrl : _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Announecemnts[i].Author.EMail);
                AlertAnnouncment += '<img src="' + userImage + '" alt="user"></div><div class="announcement-inner-card-body text-ellipsis">';
                AlertAnnouncment += '<div class="announcement-inner-card-body-info text-ellipsis">';
                var EmpName = Announecemnts[i].EmployeeName ? Announecemnts[i].EmployeeName : "";
                AlertAnnouncment += '<h3 class="member-name text-ellipsis">' + EmpName + '</h3>';
                var Designation = Announecemnts[i].Designation ? Announecemnts[i].Designation : "";
                AlertAnnouncment += '<p class="member-deg text-ellipsis"><span>' + Designation + '</span></p>';
                var DeptName = Announecemnts[i].Department ? Announecemnts[i].Department : "";
                AlertAnnouncment += '<p class="member-date text-ellipsis"><span>' + DeptName + '</span></p>';
                var Publishing = new Date(Announecemnts[i].Publish_Date);
            	Publishing = $.datepicker.formatDate('dd-M-yy', Publishing);
                AlertAnnouncment += '</div></div></div><p class="posted-date text-ellipsis"><span>Posted on: ' + Publishing + '</span></p></div>';
                AlertAnnouncment += '<div class="col-lg-9 col-md-8 col-sm-7 col-xs-12"><div class="announcement-card-body-head">';
                if(Announecemnts[i].Title.length > 90){
					splittedTitle = Announecemnts[i].Title.substring(0, 90) + "...";
				}
				else {
					splittedTitle = Announecemnts[i].Title;
				}
                AlertAnnouncment += '<h3 class="m-0 announcement-card-body-head-text"><a href="javascript:void(0);" title="'+Announecemnts[i].Title+'" onclick="event.preventDefault();objShowAnnouncements.ShowAnnouncement(' + Announecemnts[i].Id + ');">' + splittedTitle + '</a></h3>';

                var editItem = "../Pages/Announcements.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + Announecemnts[i].Id + "&Mode=Update&Type=" + Announecemnts[i].Announcement_Type + "";
                if (Announecemnts[i].Author.EMail == _spPageContextInfo.userEmail) {
                    AlertAnnouncment += '<div class="dropdown custom-card-menu"><button class="px-0 dropdown-toggle button-ed-menu" type="button" data-toggle="dropdown" aria-expanded="false">';
                    AlertAnnouncment += '<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/CompanyHomePage/Announcements/NormalAnnouncements/ManageAnnouncements/ViewAnnouncement/assets/images/more-horiz.png"></button>';
                    AlertAnnouncment += '<ul class="dropdown-menu dropdown-menu-right">';
                    AlertAnnouncment += '<li><a href="' + editItem + '">Edit</a></li>';
                    AlertAnnouncment += '<li><a href="javascript:void(0);" onclick="DeleteAnnouncement(\'' + Announecemnts[i].Id + '\', \'' + Announecemnts[i].ApprovalStatus + '\')">Delete</a></li></ul></div>';
                }
                AlertAnnouncment += '</div>';
                var splittedDescription = '';
                Announecemnts[i].Description = stripHtml(Announecemnts[i].Description);
                if (Announecemnts[i].Description.length > 350) {
                    splittedDescription = jQuery.trim(Announecemnts[i].Description).substring(0, 350) + "........";
                }
                else {
                    splittedDescription = Announecemnts[i].Description;
                }
                AlertAnnouncment += '<div class="mb10"><p class="audience-name text-ellipsis"><span>Audience: <span>' + Announecemnts[i].Audience + '</span></span></p>';
                AlertAnnouncment += '</div>';

                AlertAnnouncment += '<div class="announcement-card-body-dec" title="' + Announecemnts[i].Description + '">' + splittedDescription + '</div>';
                if (Announecemnts[i].Author.EMail == _spPageContextInfo.userEmail && Announecemnts[i].ApprovalStatus == "Pending") {
                    AlertAnnouncment += '<div class="announcement-inner-card-btn-panel announcement-inner-card-btn-panel-isTab"><div class="draft-info">Draft</div>';
                }
                else {
                    //AlertAnnouncment += '<div class="announcement-inner-card-btn-panel announcement-inner-card-btn-panel-isTab">';
                }
                AlertAnnouncment += '</div></div></div></div></div></div></div>';
            }
            $("#allAnnouncements").append(AlertAnnouncment);
            if (currentDlg != "") {
                currentDlg.close();
            }
            if (NextURL == null) {
                $("#btnSeeMore").hide();
                if ($("#allAnnouncements").html() == "") {
                    AlertAnnouncment = '<span>No record found.</span>';
                    $("#allAnnouncements").append(AlertAnnouncment);
                }
            }
        }
        else {
            $("#btnSeeMore").hide();
            if ($("#allAnnouncements").html() == "") {
                AlertAnnouncment = '<span>No record found.</span>';
                $("#allAnnouncements").append(AlertAnnouncment);
            }
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    });
    
}

//find people picker user's emails
function getUserInformation(PeoplepickerId) {
    var userIds = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if (!peoplePicker.IsEmpty()) {
        if (peoplePicker.HasInputError) return false; // if any error  
        else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users  
        else if (peoplePicker.TotalUserCount > 0) {
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            var promise = '';
            var UsersID = '';
            for (var i = 0; i < users.length; i++) {
                var accountName = users[i].Key.split('|')[2];
                var userId = accountName;//GetUserID(accountName);
                if (userId != -1) {
                    userIds.push(userId);
                }
            }
            return userIds;
        }
    }
    else {
        return UsersID;
    }
}


//method to filter the Alert/Announcemts
function filterAlertAnnouncment(Action) {
    try {
        $("#btnSeeMore").hide();
        $("#btnSeeMoreFilter").show();
        var AlertAnnouncment = '';
        var EmployeeDetails = '';
        var splittedTitle = '';
        var restquery = '';
        var queryAuthor = "";
        var PostedBy = '';
        if (Action == "Filter") {
            //getting values of filter options
            if ($('#fromPublishDate').val() != "" || $('#ToPublishDate').val() != "") {
                var FormattedFromDate = moment($("#fromPublishDate").val()).format('yy-MM-DD');
                var FormattedtoDate = moment($("#ToPublishDate").val()).format('yy-MM-DD');
                restquery += "and (Publish_Date ge '" + FormattedFromDate + "' and Publish_Date le '" + FormattedtoDate + "')";
                //TaskOutboxChip += "<div class='upload-chip'>" + $('#taskOut').val() + "</div>";
            }

            /*if ($('#ddlCategory').val() != "All") {
	            if(restquery == ""){
	                restquery += "Announcement_Type eq '" + $('#ddlCategory').val() + "' ";
	            }
	            else {
	                restquery += "and Announcement_Type eq '" + $('#ddlCategory').val() + "' ";
	            }
	        }*/

            if ($("#PostedByPplPicker_TopSpan_ResolvedList").text() != "") {
                PostedBy = getUserInformation('PostedByPplPicker');
                if (PostedBy.length > 0) {
                    //if(queryAuthor == ""){
                    queryAuthor += "(Author/EMail eq '" + PostedBy[0] + "' ";
                    for (var i = 0; i < PostedBy.length; i++) {
                        if (PostedBy[i] != PostedBy[0]) {
                            queryAuthor += "or Author/EMail eq '" + PostedBy[i] + "'";
                        }
                    }
                    queryAuthor += ")";
                }
                OtherAudience = queryAuthor + " and ";
            }
            else {
                queryAuthor = "Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
                OtherAudience = '';
            }
            arrAnouncAlert = [];
            $("#allAnnouncements").html("");
            var today = new Date();
            var CurrentDate = today.toISOString().substring(0, 10);
            var AuthorQuery = '';
            var arrCmp = PostedBy.toString().toLowerCase();
            if(arrCmp.indexOf(_spPageContextInfo.userEmail.toLowerCase()) > -1 || arrCmp == ''){
            	AuthorQuery = " or Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
            }
            
            if ($('#ddlCategory').val() != "All") {
                var Query = "?$select=*,Departments/Title,Company/Title,Company/Id,OfficeLocations/Id,OfficeLocations/Title,TeamMembers/Title,Author/EMail,Author/Title&$top=10&$filter=(WebPartName eq '" + $('#ddlCategory').val() + "'  and (ApprovalStatus eq 'Approved' or (" + queryAuthor + " and Company/ID eq '" + Logged_CompanyId + "'))  and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (" + OtherAudience + "Audience eq 'Corporate' or (" + OtherAudience + "Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (" + OtherAudience + "Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (" + OtherAudience + "Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (" + OtherAudience + "Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')" + AuthorQuery + ") " + restquery + "&$expand=Departments,Company,OfficeLocations,TeamMembers,Author&$orderby=Publish_Date desc,Modified desc";
            }
            else {
                var Query = "?$select=*,Departments/Title,Company/Title,Company/Id,OfficeLocations/Id,OfficeLocations/Title,TeamMembers/Title,Author/EMail,Author/Title&$top=10&$filter=(WebPartName eq 'Announcement' or WebPartName eq 'Alert'  and (ApprovalStatus eq 'Approved' or (" + queryAuthor + " and Company/ID eq '" + Logged_CompanyId + "'))  and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (" + OtherAudience + "Audience eq 'Corporate' or (" + OtherAudience + "Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (" + OtherAudience + "Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (" + OtherAudience + "Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (" + OtherAudience + "Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')" + AuthorQuery + ") " + restquery + "&$expand=Departments,Company,OfficeLocations,TeamMembers,Author&$orderby=Publish_Date desc,Modified desc";
            }
        }
        else {
            var Query = "?" + NextURL.split('?')[1];
        }
        $.when(getItemsWithQueryItem('Announcements', Query)).done(function (Announecemnts) {
            Announecemnts = Announecemnts.results;
            if (Announecemnts.length > 0) {debugger;
                arrAnouncAlert = arrAnouncAlert.concat(Announecemnts);
                for (var i = 0; i < Announecemnts.length; i++) {
                    AlertAnnouncment += '<div class="announcement-card-panel">';
                    if (Announecemnts[i].Announcement_Type == "Announcement") {
                        AlertAnnouncment += '<div class="row announcement-card-panel-row announcement-card-panel-row-bg mx-0">';
                    }
                    else { //Alert
                        AlertAnnouncment += '<div class="row announcement-card-panel-row alert-card-panel-row-bg mx-0">';
                    }
                    AlertAnnouncment += '<div class="col-xs-12">';
                    AlertAnnouncment += '<div class="announcement-card-body"><div class="row announcement-inner-card-row">';
                    AlertAnnouncment += '<div class="col-lg-3 col-md-4 col-sm-5 col-xs-12">';
                    if (Announecemnts[i].Announcement_Type == "Announcement") {
                        AlertAnnouncment += '<div class="panel-img-heading-announcement panel-heading-bg-txt-clr">Announcement</div>';
                    }
                    else { //Alert
                        AlertAnnouncment += '<div class="panel-img-heading-alert">Alert</div>';
                    }
                   
                    AlertAnnouncment += '<div class="announcement-inner-card"><div class="announcement-inner-card-head">';
                    //EmployeeDetails = getEmployeeMetadata(Announecemnts[i].Author.EMail);
                    arrAnouncAlert[i].Designation = Announecemnts[i].Designation ? Announecemnts[i].Designation : "";
	                var userImage = Announecemnts[i].ImageUrl ? Announecemnts[i].ImageUrl : _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Announecemnts[i].Author.EMail);
	                AlertAnnouncment += '<img src="' + userImage + '" alt="user"></div><div class="announcement-inner-card-body text-ellipsis">';
	                AlertAnnouncment += '<div class="announcement-inner-card-body-info text-ellipsis">';
	                var EmpName = Announecemnts[i].EmployeeName ? Announecemnts[i].EmployeeName : "";
	                AlertAnnouncment += '<h3 class="member-name text-ellipsis">' + EmpName + '</h3>';
	                var Designation = Announecemnts[i].Designation ? Announecemnts[i].Designation : "";
	                AlertAnnouncment += '<p class="member-deg text-ellipsis"><span>' + Designation + '</span></p>';
	                var DeptName = Announecemnts[i].Department ? Announecemnts[i].Department : "";
	                AlertAnnouncment += '<p class="member-date text-ellipsis"><span>' + DeptName + '</span></p>';

                    var Publishing = new Date(Announecemnts[i].Publish_Date);
                    Publishing = $.datepicker.formatDate('dd-M-yy', Publishing);
                    AlertAnnouncment += '</div></div></div><p class="posted-date text-ellipsis"><span>Posted on: ' + Publishing + '</span></p></div>';
                    AlertAnnouncment += '<div class="col-lg-9 col-md-8 col-sm-7 col-xs-12"><div class="announcement-card-body-head">';
                    if(Announecemnts[i].Title.length > 90){
						splittedTitle = Announecemnts[i].Title.substring(0, 90) + "...";
					}
					else {
						splittedTitle = Announecemnts[i].Title;
					}
                    AlertAnnouncment += '<h3 class="m-0 announcement-card-body-head-text"><a href="javascript:void(0);" title="'+Announecemnts[i].Title+'" onclick="event.preventDefault();objShowAnnouncements.ShowAnnouncement(' + Announecemnts[i].Id + ');">' + splittedTitle + '</a></h3>';

                    var editItem = "../Pages/Announcements.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + Announecemnts[i].Id + "&Mode=Update&Type=" + Announecemnts[i].Announcement_Type + "";
                    if (Announecemnts[i].Author.EMail == _spPageContextInfo.userEmail) {
                        AlertAnnouncment += '<div class="dropdown custom-card-menu"><button class="px-0 dropdown-toggle button-ed-menu" type="button" data-toggle="dropdown" aria-expanded="false">';
                        AlertAnnouncment += '<img src="https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/CompanyHomePage/Announcements/NormalAnnouncements/ManageAnnouncements/ViewAnnouncement/assets/images/more-horiz.png"></button>';
                        AlertAnnouncment += '<ul class="dropdown-menu dropdown-menu-right">';
                        AlertAnnouncment += '<li><a href="' + editItem + '">Edit</a></li>';
                        AlertAnnouncment += '<li><a href="javascript:void(0);" onclick="DeleteAnnouncement(\'' + Announecemnts[i].Id + '\', \'' + Announecemnts[i].ApprovalStatus + '\')">Delete</a></li></ul></div>';
                    }
                    AlertAnnouncment += '</div>';
                    var splittedDescription = '';
                    Announecemnts[i].Description = stripHtml(Announecemnts[i].Description);
                    if (Announecemnts[i].Description.length > 350) {
                        splittedDescription = jQuery.trim(Announecemnts[i].Description).substring(0, 350) + "........";
                    }
                    else {
                        splittedDescription = Announecemnts[i].Description;
                    }
                    AlertAnnouncment += '<div class="mb10"><p class="audience-name text-ellipsis"><span>Audience: <span>' + Announecemnts[i].Audience + '</span></span></p>';
                    AlertAnnouncment += '</div>';
                    AlertAnnouncment += '<div class="announcement-card-body-dec" title="' + Announecemnts[i].Description + '">' + splittedDescription + '</div>';
                    if (Announecemnts[i].Author.EMail == _spPageContextInfo.userEmail && Announecemnts[i].ApprovalStatus == "Pending") {
                        AlertAnnouncment += '<div class="announcement-inner-card-btn-panel announcement-inner-card-btn-panel-isTab"><div class="draft-info">Draft</div>';
                    }
                    else {
                        //AlertAnnouncment += '<div class="announcement-inner-card-btn-panel announcement-inner-card-btn-panel-isTab">';
                    }
                    AlertAnnouncment += '</div></div></div></div></div></div></div>';
                }
                $("#allAnnouncements").append(AlertAnnouncment);
                if (currentDlg != "") {
                    currentDlg.close();
                }
                if (NextURL == null) {
                    $("#btnSeeMoreFilter").hide();
                    if ($("#allAnnouncements").html() == "") {
                        AlertAnnouncment = '<span>No record found.</span>';
                        $("#allAnnouncements").append(AlertAnnouncment);
                    }
                }
            }
            else {
                if (currentDlg != "") {
                    currentDlg.close();
                }
                $("#btnSeeMoreFilter").hide();
                if ($("#allAnnouncements").html() == "") {
                    AlertAnnouncment = '<span>No record found.</span>';
                    $("#allAnnouncements").append(AlertAnnouncment);
                }
            }
        });
    }
    catch (Error) {
        if (currentDlg != "") {
            currentDlg.close();
        }
        console.log(Error);
    }
}

// to delete Announcement and Alert
function DeleteAnnouncement(ItemId, ApprovalStatus) {
    var ListName = 'Announcements';
    var deleteConfirmation = confirm("Do you want to delete this record?");
    if (deleteConfirmation) {
        var URL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items(" + ItemId + ")";
        $.ajax({
            url: URL,
            type: "DELETE",
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*"
            },
            success: function (data) {
                alert("Data has been deleted successfully.");
                getAlertAnnouncments("PageLoad");
                $("#SearchInput").val('');
                if (ApprovalStatus == "Pending") {
                    titanForWork.GetItemIDOfApprovalTaskList(ItemId, Logged_CompanyId, 'Announcements').done(function (requestItemID) {
                        titanForWork.DeleteTaskItem(requestItemID);				// Delete Approval Task Item As Well.
                    });
                }
                $('.panel-heading-bg-txt-clr').each(function () {                 //For Theme
                    this.style.setProperty('color', MediatextColor, 'important');
                    this.style.setProperty('background', HeaderTextColor, 'important');
                });
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
}


//get Employee details whoever created the Announcement/Alert
function getEmployeeMetadata(userEmail) {
    var arrEmp = [];
    var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,FullName,LogonName/EMail,Company/Id,Company/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Company,Department&$top=5000&$filter=LogonName/EMail eq '" + userEmail + "' ";
    dfds = $.Deferred();
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + Query;
    $.when(getItems(url, dfds)).done(function (Results) {
        response = [];
        UResults = Results;
        if (UResults.length > 0) {
            var value = UResults[0];
            arrEmp.push({
                userName: value.FullName,
                Designation: value.Designation,
                Department: value.Department.Title
            });
            if (value.AttachmentFiles.results.length > 0) {
                arrEmp[0].AttachmentURL = value.AttachmentFiles.results[0].ServerRelativeUrl;

            }
            else {
                arrEmp[0].AttachmentURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
            }
        }
    });
    return arrEmp;
}

//Get details from SP list above 5000
function getItems(url, dfds) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            response = response.concat(data.d.results);
            if (data.d.__next) {
                url = data.d.__next;
                getItems(url, dfds);
            }
            else {
                dfds.resolve(response);
            }
        },
        error: function (error) {
            dfds.reject(error)
            console.log(error);
        }
    })
    return dfds.promise()
}


//get items when list items are less than 5000
function getItemsWithQueryItem(ListName, Query) {
    DeferredObj = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query,
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            NextURL = data.d.__next;
            DeferredObj.resolve(data.d);
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};

//to check logged_In user permission
function checkUserPermission(webPartCollection) {
    var usersQuery = "";
    var webPartCollectionResult = [];
    usersQuery = "&$filter=CompanyId eq '" + Logged_CompanyId + "' and WebPartName eq 'Announcements' ";

    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=ID,Scope,Contributors/EMail,WebPartName,CompanyId,DepartmentId&$expand=Contributors" + usersQuery;
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            var response = data;
            if (response.d.results[0].Contributors != null && response.d.results[0].Contributors.results.length > 0)////Contribute Access
            {
                webPartCollectionResult = response.d.results[0].Contributors.results.filter(function (data) {
                    return data.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase();

                });
            }
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
    return webPartCollectionResult;
}

function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}


// Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId) {
    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '245px';
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

//to reset all the controlboxes in filter popup
function clearSelection() {
    $("#fromPublishDate").val('');
    $("#ToPublishDate").val('');
    $("#ddlCategory").val('All');
    clearPeoplePickerControl("PostedByPplPicker");
}

//to clear people picker
function clearPeoplePickerControl(pickerId) {
    var toSpanKey = pickerId + "_TopSpan";
    var peoplePicker = null;

    // Get the people picker object from the page.
    var ClientPickerDict = this.SPClientPeoplePicker.SPClientPeoplePickerDict;
    for (var propertyName in ClientPickerDict) {
        if (propertyName == toSpanKey) {
            peoplePicker = ClientPickerDict[propertyName];
            break;
        }
    }
    if (peoplePicker) {
        var ResolvedUsersList = $(document.getElementById(peoplePicker.ResolvedListElementId)).find("span[class='sp-peoplepicker-userSpan']");
        $(ResolvedUsersList).each(function (index) {
            peoplePicker.DeleteProcessedUser(this);
        });
    }
}

