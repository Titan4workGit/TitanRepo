var currentDlg = '';
var SharedUserName = [];
$(document).ready(function () {
    //SP.SOD.executeOrDelayUntilScriptLoaded(getCurrentURL_EventEmmployeeDetals, "sp.js"); //Indramani
    getCurrentURL_EventEmmployeeDetals();
    $("#btnAddGroup").click(function () {
        AddNewGroup('Add');
        GetDepartmentConfidentialGroupUsersGroups('Add', '');
    });
    $("#btnMyFav").click(function () {
        GetFavourites();
    });
    
    $("#btnAddFavourite").click(function () {
        addMyFavourite();
    });
    $('#MyFavall').click(function (e) {    
     e.preventDefault();
     filterMyFavorate('All');
    });
    $('#MyFavtask').click(function (e) {    
     e.preventDefault();
     filterMyFavorate('Task');
    });
    $('#MyFavproject').click(function (e) {    
     e.preventDefault();
     filterMyFavorate('Project');
    });
    $('#MyFavpage').click(function (e) {    
     e.preventDefault();
     filterMyFavorate('Pages');
    });
    $('#MyFavDocument').click(function (e) {    
     e.preventDefault();
     filterMyFavorate('Document');
    });
    

});

function getCurrentURL_EventEmmployeeDetals() {
    var listName = 'Companies';
    var txtCompanyId = Logged_CompanyId;
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,SiteURL&$filter=ID eq '" + txtCompanyId + "'";
    $.ajax({
        url: siteURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                var siteURL = items[0].SiteURL;
                // var clientContext = new SP.ClientContext(siteURL);
                // GetEmployeeDetaisUser();
                getEmployeeDetails();
                // getProjectList();
            }

        },
        eror: function (data) {
            alert($('#txtSomethingWentWrong').val());
        }
    });
}

function GetEmployeeDetaisUser() {
    var txtCompanyId = Logged_CompanyId;
    var siteHostURL = window.location.protocol + "//" + window.location.host;
    var Location = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
    var siteURL = _spPageContextInfo.webAbsoluteUrl;

    var items = EmployeeDetails.filter(function (filterData) {
        return filterData.CompanyId == txtCompanyId;
    });
    var employeePicURL = '';
    if (items[0].AttachmentFiles.results.length > 0) {
        employeePicURL = siteHostURL + "/" + items[0].AttachmentFiles.results[0].ServerRelativeUrl;
    } else {
        employeePicURL = siteURL + "/_catalogs/masterpage/Titan2/Images/EmployeeDefaultIcon.png";
    }
    var EmplyoeDetails = '';
    var newItemID = items[0].ID;
    var emplyeeDesignationMain = items[0].Designation == null ? '' : items[0].Designation;
    var employeeDepartment = items[0].Department == null ? '' : items[0].Department;
    var emplyeeNameMain = _spPageContextInfo.userDisplayName;
    var employeeCity = items[0].City == null ? '' : items[0].City;
    var employeeCountry = items[0].Country == null ? '' : items[0].Country;
    var employeeManager = items[0].Manager == null ? '' : items[0].Manager;
    var employeeEmail = items[0].Email == null ? '' : items[0].Email;
    var employeeMobileNumber = items[0].MobileNumber == null ? '' : items[0].MobileNumber;
    var extensionNumber = items[0].ExtensionName == null ? '' : items[0].ExtensionName;
    var editProfile = editUrl = "<a class='fa fa-pencil-square-o' aria-hidden='true' href='" + Location + "/Pages/EmployeeDetails.aspx?WebAppId=" + txtCompanyId + "&mode=editview&department=&employeedIddetails=" + newItemID + "&sourcelocation=../Pages/mydashboard.aspx?WebAppId=1'></a>";
    EmplyoeDetails += '<h5 style="float: right; font-size: large;" >' + editProfile + '</h5>';
    EmplyoeDetails += '<div class="text-center"><h3 class="text-color2" data-localize="MyDashboard"></h3></div>';
    EmplyoeDetails += '<li class="text-center"><img src="' + employeePicURL + ' "style="width: 100px;height: 100px;"></li>';
    EmplyoeDetails += '<li><div class="text-center"><h4 class="text-color2">' + emplyeeNameMain + '</h4></div></li>';
    EmplyoeDetails += '<div class="center-text"><label data-localize="Designation"></label> : ' + emplyeeDesignationMain + '<br><label data-localize="Department"></label>  : ' + employeeDepartment.DepartmentName + '<br>';
    if (employeeCity != null && employeeCountry != null) {
        EmplyoeDetails += '<cite><i class="glyphicon glyphicon-map-marker" style="color:#428bca"></i> &nbsp;' + employeeCity + ', ' + employeeCountry + ' </cite>';
    }
    EmplyoeDetails += '<p class="mydash-p"><i class="glyphicon glyphicon-user" style="color:#428bca"></i> &nbsp;<label data-localize="ReportingManager"></label> : ' + employeeManager + '';
    EmplyoeDetails += '<br><i class="glyphicon glyphicon-envelope" style="color:#428bca"></i> &nbsp;' + employeeEmail + '';
    EmplyoeDetails += '<br><i class="glyphicon glyphicon-phone" style="color:#428bca"></i>&nbsp;' + employeeMobileNumber + '<br><label data-localize="Extension"></label> : ' + extensionNumber + '<br>';
    EmplyoeDetails += '</p></div>';

    $(".EmplyoeeAwordHTML").append(EmplyoeDetails);
    LableLoad();



}


function getEmployeeDetails() {

    var txtCompanyId = Logged_CompanyId;
    var siteHostURL = window.location.protocol + "//" + window.location.host;
    var Location = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Employees')/items?$select=LogonName/ID,Department/DepartmentName,*&$Expand=LogonName,AttachmentFiles,Department&$Filter=LogonName/ID eq '" + _spPageContextInfo.userId + "' and CompanyId eq '" + txtCompanyId + "'";
    var siteURL = _spPageContextInfo.webAbsoluteUrl;
    var picUrl;
    $.ajax({
        url: requestUri,
        type: "GET",
        async: false,
        headers: {
            "ACCEPT": "application/json;odata=verbose"
        },
        success: function (data) {
            var items = data.d.results;
            var employeePicURL = '';
            if (items[0].AttachmentFiles.results.length > 0) {
                employeePicURL = siteHostURL + "/" + items[0].AttachmentFiles.results[0].ServerRelativeUrl;
            } else {
                employeePicURL = siteURL + "/_catalogs/masterpage/Titan2/Images/EmployeeDefaultIcon.png";
            }
            var EmplyoeDetails = '';
            var newItemID = items[0].ID;
            var emplyeeDesignationMain = items[0].Designation == null ? '' : items[0].Designation;
            var employeeDepartment = items[0].Department == null ? '' : items[0].Department;
            var emplyeeNameMain = _spPageContextInfo.userDisplayName;
            var employeeCity = items[0].City == null ? '' : items[0].City;
            var employeeCountry = items[0].Country == null ? '' : items[0].Country;
            var employeeManager = items[0].Manager == null ? '' : items[0].Manager;
            var employeeEmail = items[0].Email == null ? '' : items[0].Email;
            var employeeMobileNumber = items[0].MobileNumber == null ? '' : items[0].MobileNumber;
            var extensionNumber = items[0].ExtensionName == null ? '' : items[0].ExtensionName;
            var editProfile = editUrl = "<a class='fa fa-pencil-square-o' aria-hidden='true' href='" + Location + "/Pages/EmployeeDetails.aspx?WebAppId=" + txtCompanyId + "&mode=editview&department=&employeedIddetails=" + newItemID + "&sourcelocation=../Pages/mydashboard.aspx?WebAppId=1'></a>";
            EmplyoeDetails += '<h5 style="float: right; font-size: large;" >' + editProfile + '</h5>';
            EmplyoeDetails += '<div class="text-center"><h3 class="text-color2" data-localize="MyDashboard"></h3></div>';
            EmplyoeDetails += '<li class="text-center"><img src="' + employeePicURL + ' "style="width: 100px;height: 100px;"></li>';
            EmplyoeDetails += '<li><div class="text-center"><h4 class="text-color2">' + emplyeeNameMain + '</h4></div></li>';
            EmplyoeDetails += '<div class="center-text"><label data-localize="Designation"></label> : ' + emplyeeDesignationMain + '<br><label data-localize="Department"></label>  : ' + employeeDepartment.DepartmentName + '<br>';
            if (employeeCity != null && employeeCountry != null) {
                EmplyoeDetails += '<cite><i class="glyphicon glyphicon-map-marker" style="color:#428bca"></i> &nbsp;' + employeeCity + ', ' + employeeCountry + ' </cite>';
            }
            EmplyoeDetails += '<p class="mydash-p"><i class="glyphicon glyphicon-user" style="color:#428bca"></i> &nbsp;<label data-localize="ReportingManager"></label> : ' + employeeManager + '';
            EmplyoeDetails += '<br><i class="glyphicon glyphicon-envelope" style="color:#428bca"></i> &nbsp;' + employeeEmail + '';
            EmplyoeDetails += '<br><i class="glyphicon glyphicon-phone" style="color:#428bca"></i>&nbsp;' + employeeMobileNumber + '<br><label data-localize="Extension"></label> : ' + extensionNumber + '<br>';
            EmplyoeDetails += '</p></div>';

            $(".EmplyoeeAwordHTML").append(EmplyoeDetails);
            LableLoad();


        },
        error: function () {
            alert("Error getting the Employee Aword.");
        }
    });
}

/*
function getProjectList(){
	var requestUri =_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ProjectTeamDetails')/items?$select=*&$Filter=TeamMemberId eq '"+_spPageContextInfo.userId+"'";
    var siteURL= _spPageContextInfo.webAbsoluteUrl;
	$.ajax({
            url: requestUri,
            type: "GET",
			async:false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {
					var items=data.d.results;
					for(var i = 0; i < items.length; i++)
						{
							var ProjectId=items[i].ProjectId;
							getProjectName(ProjectId);
							
						}
					},
            error: function () {
                alert("Error getting the Project List.");
            }                     
        });
}


function getProjectName(ProjectId){
	var Location= window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
	var requestUri =_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ProjectDetails')/items?$select=*&$Filter=ID eq '"+ProjectId+"' and CompanyId eq '"+txtCompanyId+"'";
    var siteURL= _spPageContextInfo.webAbsoluteUrl;
	$.ajax({
            url: requestUri,
            type: "GET",
			async:false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {
					var items=data.d.results;
					var ProjectNameHTML='';
					for(var i=0;i<items.length; i++)
					{
						var ProjectName=items[i].ProjectName;
						var ProjectID=items[i].ID;
					
						ProjectNameHTML +='<br><a style="padding:0px 10px 0px 0px;cursor:pointer;" onclick="GetProjectDetails('+ProjectID+'); return false;">'+ProjectName+'</a>';
						ProjectNameHTML +="<a class='fa fa-arrow-right' aria-hidden='true' href='"+Location+"/Pages/ViewProjectDetails.aspx?WebAppId="+txtCompanyId+"&ProjectID="+ProjectID+"&ProjectName="+ProjectName+"'></a>";
					}
					$("#ProjectList").append(ProjectNameHTML);
				},
            error: function () {
                alert("Error getting the Project Name.");
            }                     
        });
}
function GetProjectDetails(ProjectID)
{
	$("#ProjectDetailsHTML").empty();
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
	var requestUri =_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title&$expand=ManagerName&$Filter=ID eq '"+ProjectID+"'";
    var siteURL= _spPageContextInfo.webAbsoluteUrl;
	$.ajax({
            url: requestUri,
            type: "GET",
			async:false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {
					var items=data.d.results;
					var ProjectName=items[0].ProjectName;
					var ClientName=items[0].ClientName;
					var ManagerName=items[0].ManagerName.Title;
					//var TechnologyUsed=items[0].TechnologyUsed;
					var Status=items[0].Status;
					//var PartnerName=items[0].PartnerName;
					
					//var ProjectNameHTML='<table class="table"><tbody><tr><td class="left-label">Project Name : </td><td>'+ProjectName+'</td></tr><tr><td class="left-label">Client Name :</td><td>'+ClientName+'</td></tr><tr><td class="left-label">Manager Name :</td><td>'+ManagerName+'</td></tr><tr><td class="left-label">Technology Used :</td><td>'+TechnologyUsed+'</td></tr><tr><td class="left-label">Status :</td><td>'+Status+'</td></tr><tr><td>Partner Name :</td><td>'+PartnerName+'</td></tr></tbody></table>';
					var ProjectNameHTML='<table class="table"><tbody><tr><td class="left-label">Project Name : </td><td>'+ProjectName+'</td></tr><tr><td class="left-label">Client Name :</td><td>'+ClientName+'</td></tr><tr><td class="left-label">Manager Name :</td><td>'+ManagerName+'</td></tr><tr><td class="left-label">Status :</td><td>'+Status+'</td></tr></tbody></table>';
					$("#ProjectDetailsHTML").append(ProjectNameHTML);
				},
            error: function () {
                alert("Error getting the Project Name.");
            }                     
        });
		$("#modalProjectPreview").modal('show');
}
*/




$(document).ready(function () {
    GetActiveUserEmployee();
    currentCompanyid = Logged_CompanyId;


    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', readyFunctionGroups);
    SP.SOD.executeFunc('clientpeoplepicker.js', 'SPClientPeoplePicker', function () {
        //  DefaultRowGroups();
        //your code goes here    
        //  AddMoreGroups();
        SetPeoplePicker_MultiselectGroups1("customShareingPoplePicker", true);
        SetPeoplePicker_MultiselectGroups1("customShareingFolderPoplePicker", true);
    });
    RemoveRowGroups();
    $("#addgoupItems").one('click', clickHandler);
    //  $('#addgoupItems').click(function () {

    //     if (ValidateAllGroups() == true) {
    //          waitingDialog.show();
    //       $.when(AddUsersInListGroups()).done(function (MainExamListItemTemp) {
    //             window.setTimeout(function () { GetDepartmentConfidentialGroupUsersGroups(); waitingDialog.hide(); alert('Groups Updated successfully !'); $('.modal.in').modal('hide'); }, 5000);
    //        });
    //     }
    //  });




    $('.openMuSharingGroupPopup').click(function () {

        GetDepartmentConfidentialGroupUsersGroups('', '');
    });




});
var eventcounter = 0;

function clickHandler() {
    window.setTimeout(function () {
        $("#addgoupItems").one('click', clickHandler);
    }, 3000);
    if (eventcounter == 0) {
        if (CheckMediaContent()) {

            evntStuff();
        } else {
            alert(AdminWarning);
            IsActiveOrNot = true;
        }
    }
}

function evntStuff() {
    eventcounter = 1;
    //do stuff...
    if (ValidateAllGroups() == true) {
        waitingDialog.show();
        $.when(AddUsersInListGroups()).done(function (MainExamListItemTemp) {
            window.setTimeout(function () {
                // GetDepartmentConfidentialGroupUsersGroups();
                waitingDialog.hide();
                eventcounter = 0;
                alert('Groups Updated successfully !');
                $('.modal.in').modal('hide');
            }, 5000);

            // $("#addgoupItems").one('click', clickHandler);
        });
    } else {
        eventcounter = 0;
        //  $("#addgoupItems").one('click', clickHandler);
    }

}

function AddMoreGroups() {

    $('.addMore').click(function () {
        AddRowGroups();
        RemoveRowGroups();
    });
}

function DefaultRowGroups1() {
    //var defaultRows = "<tr style='vertical-align: top'><td><label style='display:none' class='itemIDClass0'></label><input type='text' class='groupName0' style='width:100%'></td> <td><div id='newPeoplePickerControl0' style='border:1px solid #EEEEEE'></div></td><td><a style='margin-left:3px;display: none;' class='addMore' href='#'>Add more</a></td></tr>";
    var defaultRows = '';
    $('#accordionGroup').append(defaultRows);
    SetPeoplePicker_MultiselectGroups1("newPeoplePickerControl0", true);
}

function AddRowGroups() {
    var rowCount = $('#myTable tbody tr').length;
    var controlSetFlag = false;
    for (var index = 1; index < rowCount + 1; index++) {
        if ($('#newPeoplePickerControl' + index).length == 0) {
            if (controlSetFlag == false) {
                $('#myTable tbody').append("<tr style='vertical-align: top'><td><label style='display:none' class='itemIDClass" + index + "'></label> <input type='text' class='groupName" + index + "' style='width:100%'></td><td><div id='newPeoplePickerControl" + index + "' style='border:1px solid #EEEEEE'></div></td><td><a style='margin-left:3px' href='#' class='removeRow'>Remove</a></td></tr>");
                SetPeoplePicker_MultiselectGroups1("newPeoplePickerControl" + index, true);
                controlSetFlag = true;
            }
        }
    }
}

function RemoveRowGroups() {
    $('.removeRow').unbind().click(function () {
        var confirMessage = confirm("Are you sure,you want to remove this group?");
        if (confirMessage == true) {
            var currentGroupItemId = $(this).closest('tr').find('td>label').attr('class');
            var itemId = $('.' + currentGroupItemId).text();
            if (itemId.length > 0) {
                $(this).closest('tr').remove();
                $.when(DeleteGroup(itemId)).done(function (MainExamListItemTemp) {

                });
            } else {
                $(this).closest('tr').remove();
            }
        }
    });
}

function DeleteGroup(currentGroupItemId, groupName) {
    if (confirm("Do you want to delete the '" + groupName + "' group?")) {
        var dfd = $.Deferred();

        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DocumentSharedGroups')/items(" + currentGroupItemId + ")",
            type: "POST",
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            success: function (data) {
                dfd.resolve(data);
                //Loader
                var dlgTitle = 'Deleting group...';
                var dlgMsg = '<br />Please wait!!';
                var dlgHeight = 200;
                var dlgWidth = 400;
                SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
                });
                setTimeout(function () {
                    GetDepartmentConfidentialGroupUsersGroups('', '');
                }, 100);
            },
            error: function (error) {
                // alert(JSON.stringify(error));
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }
}

function SetPeoplePicker_MultiselectGroups1(peoplePickerElementId, allowMultiple) {
    if (allowMultiple == null) {
        allowMultiple = false;
    }
    var schema = {};
    schema['PrincipalAccountType'] = 'User,SPGroup';
    // schema['PrincipalAccountType'] = 'User';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = allowMultiple;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '321px';
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

function readyFunctionGroups() {
    GetCurrentUserIDGroups();
}
var SharedListcurrentUserID = "";

function GetCurrentUserIDGroups() {

    $.ajax({
        url: _spPageContextInfo.webServerRelativeUrl + "/_api/web/currentUser",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            SharedListcurrentUserID = data.d.Id; //Assigning UserId Variable
            // GetDepartmentConfidentialGroupUsersGroups();
        },
        error: function (data) { }
    });

}



function GetDepartmentConfidentialGroupUsersGroups(Action, groupCount) {
    var attachmentUrl = '';
    $('#accordionGroup').html('');
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentSharedGroups')/items?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/EMail,LogonUser/ID,LogonUser/Title,LogonUser/UserName,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID asc&$filter=LogonUser/ID eq '" + SharedListcurrentUserID + "'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            var response = data;
            $('#thbodyControl').html('');
            $('#myTable tbody tr').html('');
            //DefaultRowGroups1();
            //your code goes here    
            //AddMoreGroups();
            for (var groupIndex = 0; groupIndex < response.d.results.length; groupIndex++) {
                if (groupIndex != 0) {
                    //Generate table
                    //AddRowGroups(); //Add new row
                    //RemoveRowGroups(); //Remove Event on table row
                }
                var groupName = response.d.results[groupIndex].SharingLevel;
                //$('.groupName' + groupIndex).val(groupName);
                var currentItemID = response.d.results[groupIndex].ID;
                //$('.itemIDClass' + groupIndex).text(currentItemID);
                var defaultRows = '';
                defaultRows += '<div class="panel panel-default"><div class="panel-heading custom-panel-heading"><h4 class="panel-title">';
                defaultRows += '<a class="panel-title-box collapsed" id="GroupId' + groupIndex + '" data-toggle="collapse" data-parent="#accordionGroup" href="#group' + groupIndex + '" aria-expanded="false">';
                defaultRows += '<label style="display:none;" class="itemIDClass' + groupIndex + '">' + currentItemID + '</label><span class="groupName0" style="color: black;">' + groupName + '</span><i class="fa fa-chevron-down"></i></a></h4></div>';
                defaultRows += '<div id="group' + groupIndex + '" class="panel-collapse collapse" aria-expanded="false"><div class="panel-body"><div class="row group-inner-scroll scrollbar-panel">';
                if (response.d.results[groupIndex].SharedUsers.results != null) {
                    for (var subGrroupIndex = 0; subGrroupIndex < response.d.results[groupIndex].SharedUsers.results.length; subGrroupIndex++) {
                        var userNamecurretn = response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].EMail;
                        var GroupUserId = response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].ID;
                        if (userNamecurretn != null && userNamecurretn != "") {
                            //Group User Bind
                            var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,FullName,Designation,LogonName/EMail,LogonName/FirstName,LogonName/LastName,Company/Id,Company/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Company,Department&$top=5000&$filter=Status eq 'Active' and PrimaryCompany eq 'Primary' and LogonName/EMail eq '" + userNamecurretn + "' ";
                            $.when(CommonFunction.getItemsWithQueryItem('Employees', Query)).done(function (UserResults) {
                                UResults = UserResults.results;
                                var value = UResults[0];
                                if (UResults.length > 0) {
                                    if (value.AttachmentFiles.results.length > 0) {
                                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
                                    }
                                    else {
                                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
                                    }
                                    defaultRows += '<div class="col-md-6 col-sm-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LogonName.FirstName + ' ' + value.LogonName.LastName + '</h3>';
                                    defaultRows += '<p class="member-deg text-ellipsis"><span>' + value.Designation + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>' + value.Department.Title + '</span></p>';
                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
                                    defaultRows += '<div class="text-right" onclick="DeleteUser(' + GroupUserId + ', ' + groupIndex + ');"><button type="button" class="btn remove-group-btn remove-btn close close-round"><i class="fa fa-times" aria-hidden="true"></i></button></div>';
                                    defaultRows += '</div></div></div>'; // class - row group-inner-scroll scrollbar-panel ends here

                                }
                                else {
                                	//External Users
                                	var Query = "?$select=AttachmentFiles,LoginName/EMail,email,LoginName/Title,LoginName/Id,Designation,Client_Name/Title&$expand=AttachmentFiles,LoginName,Client_Name&$filter=email eq '" + userNamecurretn + "'&$top=5000";
		                            $.when(CommonFunction.getItemsWithQueryItem('ExternalUsers', Query)).done(function (UserResults) {
		                                UResults = UserResults.results;
		                                var value = UResults[0];
		                                if (UResults.length > 0) {
		                                    if (value.AttachmentFiles.results.length > 0) {
		                                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
		                                    }
		                                    else {
		                                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.email);
		                                    }
		                                    defaultRows += '<div class="col-md-6 col-sm-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
		                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LoginName.Title+ ' </h3>';
		                                    defaultRows += '<p class="member-deg text-ellipsis"><span>' + value.Designation + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>' + value.Client_Name.Title + '</span></p>';
		                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
		                                    defaultRows += '<div class="text-right" onclick="DeleteUser(' + GroupUserId + ', ' + groupIndex + ');"><button type="button" class="btn remove-group-btn remove-btn close close-round"><i class="fa fa-times" aria-hidden="true"></i></button></div>';
		                                    defaultRows += '</div></div></div>'; // class - row group-inner-scroll scrollbar-panel ends here
		
		                                }
		                            });
                                }
                            });
                            //setPeoplePickerUsersInfoCurrentGroups("newPeoplePickerControl" + groupIndex, response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].UserName);
                        }
                    }
                }//For loop
                //Add/Delete memeber to Group
                defaultRows += '</div><div class="row"><div class="group-inner-btn-panel col-xs-12"><div class="add-menber-dropdown">';
                defaultRows += '<button type="button" class="btn custom-btn" onclick="openAddMemberPopup(' + groupIndex + ')" data-toggle="dropdown">Add</button><ul id = AddMemberPopup' + groupIndex + ' class="add-menber-menu" style="display:none;">';
                defaultRows += '<li><div class="form-group custom-form-group"><span id="newPeoplePickerControl' + groupIndex + '"></span></div></li>';
                defaultRows += '<li class="text-center"><button type="button" class="btn custom-btn" id="addMember' + groupIndex + '" onclick="getSelectedGroupUsers(' + groupIndex + ')">Submit</button></li></ul></div>';
                defaultRows += '<div class="remove-group-btn-box"><button type="button" class="btn custom-btn remove-group-btn" onclick="DeleteGroup(' + currentItemID + ', \'' + groupName + '\');">Delete</button></div></div></div>';
                defaultRows += '</div></div></div>';
                $('#accordionGroup').append(defaultRows);
                var PeoplePickerId = "newPeoplePickerControl" + groupIndex;
                SetPeoplePicker_MultiselectGroups1(PeoplePickerId, true);
            }
            if (currentDlg != "") {
                currentDlg.close();
            }
            if(Action == "Add") {
	            var IdCount = response.d.results.length - 1;
	            $("#GroupId" + IdCount ).attr('aria-expanded', "true");
				$("#GroupId" + IdCount ).removeClass('collapsed');
				$("#group" + IdCount ).removeClass('panel-collapse collapse');
				$("#group" + IdCount ).addClass('panel-collapse collapse in');
				$("#group" + IdCount ).attr('aria-expanded', "true");
			}
			else{
	            $("#GroupId" + groupCount).attr('aria-expanded', "true");
				$("#GroupId" + groupCount).removeClass('collapsed');
				$("#group" + groupCount).removeClass('panel-collapse collapse');
				$("#group" + groupCount).addClass('panel-collapse collapse in');
				$("#group" + groupCount).attr('aria-expanded', "true");

			}
        },
        error: function (data) {
            currentDlg.close();
            console.log(JSON.stringify(data));
        }
    });
}

function openAddMemberPopup(GroupIndex) {
	if($("#AddMemberPopup"+GroupIndex+"").css("display") == "none") {
		$("#AddMemberPopup"+GroupIndex+"").css("display", "block");
	}
	else {
		$("#AddMemberPopup"+GroupIndex+"").css("display", "none");
	}
}


Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function DeleteUser(GroupUserId, GroupIdCount) {
	if (confirm("Do you want to delete this user?")) {
	    var UpdateId = $(".itemIDClass" + GroupIdCount).text();
	    var arrSavedUsersId = [];
	    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentSharedGroups')/items?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/EMail,LogonUser/ID,LogonUser/Title,LogonUser/UserName,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID asc&$filter=ID eq '" + UpdateId + "'";
	    $.ajax({
	        url: Ownurl,
	        method: "GET",
	        headers: {
	            "Accept": "application/json; odata=verbose"
	        },
	        async: false,
	        success: function (data) {
	            var response = data;
	            if (response.d.results[0].SharedUsers.results != null) {
	                for (var subGrroupIndex = 0; subGrroupIndex < response.d.results[0].SharedUsers.results.length; subGrroupIndex++) {
	                    arrSavedUsersId.push(response.d.results[0].SharedUsers.results[subGrroupIndex].ID);
	                }
	            }
	            arrSavedUsersId.remove(GroupUserId);
	            //Loader
	            var dlgTitle = 'Updating groups...';
	            var dlgMsg = '<br />Please wait!!';
	            var dlgHeight = 200;
	            var dlgWidth = 400;
	            SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
	                currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
	            });
	            setTimeout(function () {
	                UpdateMember(GroupIdCount, arrSavedUsersId, GroupIdCount);
	            }, 100);
	
	        },
	        error: function (data) {
	            console.log(JSON.stringify(data));
	        }
	    });
	}
}



function getSelectedGroupUsers(groupIndex) {
    var UpdateId = $(".itemIDClass" + groupIndex).text();
    var arrSavedUsersId = [];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentSharedGroups')/items?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/EMail,LogonUser/ID,LogonUser/Title,LogonUser/UserName,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID asc&$filter=ID eq '" + UpdateId + "'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            var response = data;
            if (response.d.results[0].SharedUsers.results != null) {
                for (var subGrroupIndex = 0; subGrroupIndex < response.d.results[0].SharedUsers.results.length; subGrroupIndex++) {
                    arrSavedUsersId.push(response.d.results[0].SharedUsers.results[subGrroupIndex].ID);
                }
            }
            //Loader
            var dlgTitle = 'Updating groups...';
            var dlgMsg = '<br />Please wait!!';
            var dlgHeight = 200;
            var dlgWidth = 400;
            SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
            });
            setTimeout(function () {
                UpdateMember(groupIndex, arrSavedUsersId, groupIndex);
            }, 100);
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
}

function UpdateMember(groupIndex, arrSavedUsersId, groupIndex) {
    var UpdateId = $(".itemIDClass" + groupIndex).text();
    var sharedUserArrayList = [];
    var arrInvalidUsers = [];
    var InvalidUsersId = [];
    sharedUserArrayList = getPeopleUserMyGroups("newPeoplePickerControl" + groupIndex);
    if (sharedUserArrayList.length == 0) {
        sharedUserArrayList.push(0);
    }
    else {
        //Check if the user is valid or not
        for (var userId = 0; userId < sharedUserArrayList.length; userId++) {
            var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Employees')/items?$select=LogonName/ID,LogonName/FirstName,LogonName/LastName,Department/DepartmentName,*&$Expand=LogonName,AttachmentFiles,Department&$Filter=LogonName/ID eq '" + sharedUserArrayList[userId] + "'";
            $.ajax({
                url: requestUri,
                type: "GET",
                async: false,
                headers: {
                    "ACCEPT": "application/json;odata=verbose"
                },
                success: function (data) {
                    var items = data.d.results;
                    if (items.length > 0) {
                        if (items[0].Status == "Active" && items[0].PrimaryCompany == 'Primary') {
                            //User is valid
                        }
                        else {
	                        var Query = "?$select=Status,LoginName/Id&$expand=LoginName&$filter=LoginName/Id eq '" + sharedUserArrayList[userId] + "' and Status eq 'Active'&$top=5000";
			                url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
			                $.ajax({
				                url: url,
				                type: "GET",
				                async: false,
				                headers: {
				                    "ACCEPT": "application/json;odata=verbose"
				                },
				                success: function (data) {
				                    var ExtResults = data.d.results;
				                    if (ExtResults.length > 0) {
				                        //User is valid
				                    }
                            		else {
			                            InvalidUsersId.push(sharedUserArrayList[userId]);
			                            var FullName = items[0].LogonName.FirstName + " " + items[0].LogonName.LastName;
			                            arrInvalidUsers.push(FullName);
			                        }
			                    },
				                error: function () {
				                    alert("Error getting the Employee status.");
				                }
		                	});
                        }
                    }
                    else {
	                    var Query = "?$select=Status,LoginName/Id&$expand=LoginName&$filter=LoginName/Id eq '" + sharedUserArrayList[userId] + "' and Status eq 'Active'&$top=5000";
		                url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
		                $.ajax({
			                url: url,
			                type: "GET",
			                async: false,
			                headers: {
			                    "ACCEPT": "application/json;odata=verbose"
			                },
			                success: function (data) {
			                    var ExtResults = data.d.results;
			                    if (ExtResults.length > 0) {
			                        
			                    }
			                    else {
			                        InvalidUsersId.push(sharedUserArrayList[userId]);
			                        arrInvalidUsers.push(SharedUserName[userId]);
			                    }
		                    },
			                error: function () {
			                    alert("Error getting the Employee status.");
			                }
	                	});
                    }
                },
                error: function () {
                    alert("Error getting the Employee status.");
                }
            });
        }
    }
    sharedUserArrayList = sharedUserArrayList.filter( function( el ) {
	  return InvalidUsersId.indexOf( el ) < 0;
	} );
    arrSavedUsersId = arrSavedUsersId.concat(sharedUserArrayList);
    arrSavedUsersId = arrSavedUsersId.filter(function (item, pos) {
        return arrSavedUsersId.indexOf(item) == pos
    }); //Remove duplicate elements Array

    var Metadata;
    var ItemType = GetItemTypeForListNameDetailsGroups('DocumentSharedGroups');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        SharedUsersId: {
            'results': arrSavedUsersId
        }
    };
    updateItemWithIDGroup('DocumentSharedGroups', Metadata, UpdateId, arrInvalidUsers, groupIndex);
}

function AddNewGroup(commandTYpe) {
    if ($.trim($("#txtGroupName").val()) != "") {
        var Metadata;
        var ItemType = GetItemTypeForListNameDetailsGroups('DocumentSharedGroups');
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            SharingLevel: $("#txtGroupName").val(),
            LogonUserId: _spPageContextInfo.userId
        };
        if (commandTYpe == "Add") {
            AddItemToListGroups('DocumentSharedGroups', Metadata);
            alert('New group is created');
            $("#txtGroupName").val('');
        } else {
            updateItemWithIDGroup('DocumentSharedGroups', Metadata, itemIdToUpdate, [], '');
        }
    }
    else {
        alert("Kindly enter group name.");
        return false;
    }

}

function AddNewGroupMembersGroups(ListName, sharedUserArrayList, sharingLevel, commandTYpe, itemIdToUpdate) {
    //DocumentSharedGroups
    if (sharedUserArrayList.length == 0) {
        sharedUserArrayList.push(0);
    }
    var Metadata;
    var ItemType = GetItemTypeForListNameDetailsGroups(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        LogonUserId: SharedListcurrentUserID,
        SharedUsersId: {
            'results': sharedUserArrayList
        },
        SharingLevel: sharingLevel
    };

    if (sharedUserArrayList.length == 0) {
        delete Metadata["SharedUsersId"];
    }
    if (commandTYpe == "Add") {
        AddItemToListGroups(ListName, Metadata);
    } else {
        updateItemWithIDGroup(ListName, Metadata, itemIdToUpdate, [], '');
    }

}

function setPeoplePickerUsersInfoCurrentGroups(controlNameID, LoginNameOrEmail) {
    //var fieldName = id + '_TopSpan';
    var peoplePickerDiv = $("[id^='" + controlNameID + "']");
    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
    peoplePicker.AddUserKeys(LoginNameOrEmail, false);
}

function AddItemToListGroups(ListName, Metadata) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            // console.log(data);
            dfd.resolve(data);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

function GetItemTypeForListNameDetailsGroups(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

function updateItemWithIDGroup(ListName, Metadata, ID, arrInvalidUsers, groupIndex) {

    var dfd = $.Deferred();
    var oweburl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('" + ListName + "')/Items(" + ID + ")";
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
            dfd.resolve(true);
            if (arrInvalidUsers.length > 0) {
                if (arrInvalidUsers.length > 1) {
                    alert(arrInvalidUsers.join(", ") + " users are not valid!");
                }
                else{
                    alert(arrInvalidUsers.join(", ") + " user is not valid!");
                }
            }
            GetDepartmentConfidentialGroupUsersGroups('', groupIndex);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

function AddUsersInListGroups() {

    $('#myTable tbody tr').each(function () {
        var sharedUserArrayList = new Array();
        var inputControlClass = $(this).find('td>input').attr('class');
        var labelControlClass = $(this).find('td>label').attr('class');
        var currentItemID = $('.' + labelControlClass).text();
        var peoplePickerControlId = $(this).find('td>div').attr('id');
        sharedUserArrayList = getPeopleUserMyGroups(peoplePickerControlId);
        var groupName = $('.' + inputControlClass).val().trim();
        if (currentItemID.length == 0) {
            $.when(AddNewGroupMembersGroups("DocumentSharedGroups", sharedUserArrayList, groupName, "Add", "")).done(function (MainExamListItemTemp) {

            });
        } else {
            AddNewGroupMembersGroups("DocumentSharedGroups", sharedUserArrayList, groupName, "Update", currentItemID);
        }
    });

}

function getPeopleUserMyGroups(pickerPickerControlId) {
	SharedUserName = [];
    var sharedUserArrayList = new Array();
    var pickerDiv = $("[id^='" + pickerPickerControlId + "']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
    var users = peoplePicker.GetAllUserInfo();
    if (users.length > 0) {
        var allUsersID = new Array();

        var usersEmailIDs = new Array();
        for (var i = 0; i < users.length; i++) {
            var grpid = users[i].Key;
            var autokey = users[i].EntityType;
            if (autokey == "User") {
                sharedUserArrayList.push(GetUserIdGroups(users[i].Key));
                SharedUserName.push(users[i].DisplayText);

            } else {
                var grpid = users[i].EntityData.SPGroupID;
                var myArrays = new Array();
                myArrays.push(siteusers(grpid));
                //  var c = sharedUserArrayList.concat(myArrays);
                var c = sharedUserArrayList.concat.apply([], myArrays);
                sharedUserArrayList = sharedUserArrayList.concat(c);

            }

            //sharedUserArrayList.push(GetUserIdGroups(users[i].Key));
        }
    }
    return sharedUserArrayList;
}

function GetUserIdGroups(userName) {
    var userID = "";
    var prefix = "i:0#.f|membership|";
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var accountName = userName; // prefix+userName;       
    $.ajax({
        url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(accountName) + "'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            userID = data.d.Id;
            //$scope.UserInfoFullName = data.d.Title;
            // alert("Received UserId" + data.d.Id);
            // alert(JSON.stringify(data));
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
    return userID;
}

function ValidateAllGroups() {
    var flag = true
    var groupNameArrayList = new Array();
    $('#myTable tbody tr').each(function (currentItemINdex) {
        var sharedUserArrayList = new Array();
        var inputControlClass = $(this).find('td>input').attr('class');
        var peoplePickerControlId = $(this).find('td>div').attr('id');
        sharedUserArrayList = getPeopleUserMyGroups(peoplePickerControlId);
        var groupName = $('.' + inputControlClass).val();
        var groupNameValue = groupName.toLowerCase().trim();
        if (groupNameArrayList.indexOf(groupNameValue) == -1) {
            groupNameArrayList.push(groupNameValue);
        } else {
            alert('Group name can not be duplicate, Please enter unique group name.')
            return flag = false;
        }
        if (groupName.trim() == null || groupName.trim() == "") {
            alert('Please enter group name.')
            return flag = false;

        }
        if (sharedUserArrayList.length == 0) {
            alert('Please enter users name against all groups.')
            return flag = false;
        }

    });

    return flag;
}




function siteusers(grpid) {

    var usergroup = [];

    $.ajax({
        // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
        // You can replace this with other site URL where you want to apply the function

        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getbyid(" + grpid + ")/users",
        type: "GET",
        async: false,
        headers: {
            // Accept header: Specifies the format for response data from the server.
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            var dataresults = data.d.results;
            for (var i = 0; i < dataresults.length; i++) {

                dataresults = $.grep(dataresults, function (a) {
                    return a.Title !== "System Account";
                });
                if (dataresults.length > 0) {
                    usergroup.push(GetUserIdGroups(dataresults[i].LoginName));
                    ////accountName = dataresults[i].LoginName;
                }
            }
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
    return usergroup;
}




function CheckMediaContent() {

    AdminWarning = "";

    $('#myTable tbody tr').each(function (currentItemINdex) {

        var inputControlClass = $(this).find('td>input').attr('class');
        var peoplePickerControlId = $(this).find('td>div').attr('id');
        var pickerDiv = $("[id^=" + peoplePickerControlId + "]");
        var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
        var users = peoplePicker.GetAllUserInfo();

        for (var j = 0; j < users.length; j++) {
            var arrSubVisaLetters = ActiveEmployeeuser.filter(function (filterData) {
                return filterData.EMail == users[j].EntityData.Email;
            });

            if (arrSubVisaLetters < 1) {
                AdminWarning += users[j].DisplayText + ",";
                //alert(users[j].DisplayText + "   is not an active user. ");
                IsActiveOrNot = false;
                IscheckMessage = true;
            }

        }
        if (IscheckMessage) {
            AdminWarning += " is not an active user.\n ";
            IscheckMessage = false;
        }




    });


    return IsActiveOrNot
}



var ActiveEmployeeuser = [];
var RestQuery;

function GetActiveUserEmployee() {
    var txtCompanyId = Logged_CompanyId;


    RestQuery = "?$top=5000&$select=*,LogonName/EMail,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail&$expand=LogonName &$filter= Status eq 'Active' and Company/ID eq " + txtCompanyId + "";
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function (Employees) {

        try {
            for (var i = 0; i < Employees.results.length; i++) {
                ActiveEmployeeuser.push({
                    'UserId': Employees.results[i].LogonName.Id,
                    'EMail': Employees.results[i].LogonName.EMail
                });
            }
        } catch (e) {
            alert(e);
        }
    });
}
var AdminWarning;
var IsActiveOrNot = true;
var IscheckMessage = false;

function AddRowGroups2() {
    var rowCount = $('#myTable tbody tr').length;
    var controlSetFlag = false;
    for (var index = 1; index < rowCount + 1; index++) {
        if ($('#newPeoplePickerControl' + index).length == 0) {
            if (controlSetFlag == false) {
                $('#myTable tbody').append("<tr style='vertical-align: top'><td><label style='display:none' class='itemIDClass" + index + "'></label> <input type='text' class='groupName" + index + "' style='width:100%'></td><td><div id='newPeoplePickerControl" + index + "' style='border:1px solid #EEEEEE'></div></td><td><a style='margin-left:3px' href='#' class='removeRow'>Remove</a></td></tr>");
                SetPeoplePicker_MultiselectGroups1("newPeoplePickerControl" + index, true);
                controlSetFlag = true;
            }
        }
    }
    RemoveRowGroups()
}


//Bind, Remove, Edit Favourites --------------------->>

//Get and bind the favourites of Logged In user
var arrFav=[];
function GetFavourites() {
	var TaskHTML = '';
	var arrFavTasks = [];
	//TaskHTML += '<div class="panel panel-default my-favourites-panel my-favourite-add-edit-box">';
	//TaskHTML += '<a class="my-favourite-add-edit-btn" href="Javascript:void(0);" data-toggle="modal" data-target="#MyFavAdd"><span> Add New Favorite </span></a></div>';
	var RestQuery = "?$select=*,User/EMail,AttachmentFiles&$Expand=User,AttachmentFiles&$Filter=User/EMail eq '" + _spPageContextInfo.userEmail + "' and Category ne 'Document'&$orderby=Modified desc ";
    $.when(CommonFunction.getItemsWithQueryItem("MyFavorites", RestQuery)).done(function (MyFavorites) {
        var items = MyFavorites.results;
        arrFavTasks = items.filter(function (data) {
            return data;//.Category == 'Task';
        });
        arrFav=arrFavTasks;
        for(var fav=0;fav<arrFavTasks.length; fav++) {
	        TaskHTML += '<div class="panel panel-default my-favourites-panel"><div class="my-favourites-panel-head">';
	        TaskHTML += '<a class="my-favourites-panel-head-a" href="'+arrFavTasks[fav].Link+'">';
	        TaskHTML += '<div class="my-favourites-panel-head-left"><img class="my-favourites-panel-head-icon" src="'+arrFavTasks[fav].Icon.Url+'" alt="task icon">';
	        TaskHTML += '<div class="my-favourites-panel-head-text"><div class="my-favourites-panel-head-text1" style="color:blue;">'+arrFavTasks[fav].Name+'</div>';
	        TaskHTML += '<div class="my-favourites-panel-head-text2">'+arrFavTasks[fav].Category+'</div></div></div></a><div class="dropdown my-favourites-panel-head-right">';
	        TaskHTML += '<button class="px-0 dropdown-toggle button-ed-menu my-favourites-panel-head-icon-button" type="button" data-toggle="dropdown" aria-expanded="false">';
	        TaskHTML += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyFavorite/Images/my-fav-menu-vertical.png" alt="menu vertical"></button><ul class="dropdown-menu dropdown-menu-right">';
	        TaskHTML += '<li><a data-toggle="modal" href="Javascript:void(0);" onclick="EditFavTask(\'' + arrFavTasks[fav].Category + '\',\'' + arrFavTasks[fav].Name + '\',\'' + arrFavTasks[fav].Link + '\', '+arrFavTasks[fav].Id+');" data-target="#MyFavEdit">Edit</a></li>';
	        TaskHTML += '<li><a href="Javascript:void(0);" onclick="RemoveFav('+arrFavTasks[fav].Id+');">Remove</a></li></ul></div></div></div>';
        }
        $("#myFavouritesAcc").empty().append(TaskHTML);
	});
}

//to Edit the Meatadata of selected favourite
function EditFavTask(Type, Name, Link, FavId) {
	$("#ddlFavCategory").val(Type);
	$("#txtFavName").val(Name);
	$("#txtFavLinks").val(Link);
	$("#ParentBtnEdit").empty().append('<button type="button" class="btn custom-btn-two-cancel" data-dismiss="modal" id="btnEditFav">Submit</button>');
	$("#btnEditFav").click(function () {
        UpdateFavTask(Type, Name, Link, FavId);
    });
}

//Update Favourite Task
function UpdateFavTask(Type, Name, Link, FavId) {
	if(validURL($("#txtFavLinks").val()) == true) {
		var dfd = $.Deferred();
		Metadata = {
	        __metadata: { 'type': 'SP.Data.MyFavoritesListItem' },
	        Category: $("#DocTypesDDL").val(),
	        Name: $("#txtFavName").val(),
	        Link: $("#txtFavLinks").val()
	    };
	    $.ajax({
	        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MyFavorites')/GetItemById('" + FavId + "')",
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
	        success: function (data) {
	        	alert("Details have been updated.");
	        	GetFavourites();
	            dfd.resolve(data);
	        },
	        eror: function (data) {
	            dfd.reject(error);
	            console.log("An error occurred while updating fav. " + JSON.stringify(data));
	        }
	    }).fail(function (error) {
	        alert(error.responseJSON.error.message.value);
	        dfd.reject(error);
	    });
	    return dfd.promise();
	}
}

//to Delete any favourite
function RemoveFav(FavId) {
	if(confirm("Are you sure to remove this from favorite ?")){
		var apiPath = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MyFavorites')/items/getbyid('"+FavId+"')";
	    $.ajax({  
	        url: apiPath,  
	        type: "DELETE", 
	        headers: {
	            "accept":"application/json",
	            "X-RequestDigest":$("#__REQUESTDIGEST").val(),
	            "IF-MATCH":"*"
	        }, 
	        async: false,  
	        success: function(data) {  
	            alert("Item Deleted successfully."); 
	            GetFavourites(); 
	        },  
	        eror: function(data) {  
	            console.log("An error occurred. Please try again." + data);  
	        }  
	    }).fail(function (error) {
	        alert(error.responseJSON.error.message.value);
	        dfd.reject(error);
	    });
	}
}

function addMyFavourite(){
   if($("#txtName").val() =='') {
     alert('Enter Name');
     return false;
   }
   if(validURL($("#txtLinks").val()) == false) {
     alert('Enter valid Url');
     return false;
   }
	 var dfd = $.Deferred();
	 var ListName ='MyFavorites';
	 var link=_spPageContextInfo.webAbsoluteUrl+'/SiteAssets/MyFavorite/Images/fav-page.png';
	 Metadata = {
	   __metadata: { 'type': 'SP.Data.MyFavoritesListItem' },
	        Category: $("#DocTypesDDL").val(),
	        Name: $("#txtName").val(),
	        UserId:_spPageContextInfo.userId,
	        Title:$("#txtName").val(),	        
	        Icon:
            {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': link , //'Google',
            'Url': link //'http://google.com'
            },
	        Link: $("#txtLinks").val()
	};
	$.ajax({
	    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items",
        type: "Post",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success:function(){
         alert("Details have been Saved.");
	        	GetFavourites();
	        	$('#MyFavAdd').modal('hide');
	            dfd.resolve(data);
        },
        eror: function(data) {  
	            console.log("An error occurred. Please try again." + data);  
	        }
       
    }); 
	

}

function filterMyFavorate(Category){
    var arrFavTasks= arrFav;
    var TaskHTML = '';
    if(Category!='All'){    
	    arrFavTasks=arrFavTasks.filter(function(e){
	     return (e.Category==Category)
	    })
    }       
     for(var fav=0;fav<arrFavTasks.length; fav++) {
	        TaskHTML += '<div class="panel panel-default my-favourites-panel"><div class="my-favourites-panel-head">';
	        TaskHTML += '<a class="my-favourites-panel-head-a" href="'+arrFavTasks[fav].Link+'">';
	        TaskHTML += '<div class="my-favourites-panel-head-left"><img class="my-favourites-panel-head-icon" src="'+arrFavTasks[fav].Icon.Url+'" alt="task icon">';
	        TaskHTML += '<div class="my-favourites-panel-head-text"><div class="my-favourites-panel-head-text1" style="color:blue;">'+arrFavTasks[fav].Name+'</div>';
	        TaskHTML += '<div class="my-favourites-panel-head-text2">'+arrFavTasks[fav].Category+'</div></div></div></a><div class="dropdown my-favourites-panel-head-right">';
	        TaskHTML += '<button class="px-0 dropdown-toggle button-ed-menu my-favourites-panel-head-icon-button" type="button" data-toggle="dropdown" aria-expanded="false">';
	        TaskHTML += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyFavorite/Images/my-fav-menu-vertical.png" alt="menu vertical"></button><ul class="dropdown-menu dropdown-menu-right">';
	        TaskHTML += '<li><a data-toggle="modal" href="Javascript:void(0);" onclick="EditFavTask(\'' + arrFavTasks[fav].Category + '\',\'' + arrFavTasks[fav].Name + '\',\'' + arrFavTasks[fav].Link + '\', '+arrFavTasks[fav].Id+');" data-target="#MyFavEdit">Edit</a></li>';
	        TaskHTML += '<li><a href="Javascript:void(0);" onclick="RemoveFav('+arrFavTasks[fav].Id+');">Remove</a></li></ul></div></div></div>';
        }
        $("#myFavouritesAcc").empty().append(TaskHTML);

}



//For Link check validation 
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}