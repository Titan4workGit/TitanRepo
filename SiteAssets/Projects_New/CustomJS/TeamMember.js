var selectedTeamMemberItemId = "";
var callGetViewAllTeamMemberMethod = true;
var projectStartDateValidation;
var itemCollectionRange = new Array();
var currentUserTeamPermission = false;
var currentUserHaveDocumentPermission = false;
var currentProjectSiteURL = "";
var MyGoupUserIdArray = new Array();
var ExisitngTeamMemberArray = new Array();
projectItemDetails = [];
projecttouser = "";
projectManage = [];
var AdminWarning = '';
var activeusers = '';
var selectedgroupUserName = [];
var CanAddMember = false;
var currentDlg = '';
var multipleEmailAddress = [];
var assignUserName = [];
var EmpIds = [];
var IsEmpBinded = false;
$(document).ready(function () {
    $("#tabTeam").click(function () {
    	if(IsEmpBinded == false) {
    		SetPeoplePicker_MultiselectGroups("AssaginTaskTeam", true);
    		PeoplePickerChangeEmp();
	    	GetAllTeamMemberDetailsByProjectId();
			SortTeamTable();
			IsEmpBinded = true;
		}
	});
    $("#MemberStatus").change(function () {
        var Status = $("#MemberStatus").val();
        if (Status != "Active") {
            $("#divReleasedDate").show();
            var todaysDate = new Date();
            todaysDate = $.datepicker.formatDate('dd/mm/yy', todaysDate);
            $("#ReleaseDate").val(todaysDate);
        }
        else {
            $("#divReleasedDate").hide();
            $("#ReleaseDate").val("");
        }
        if (Status == "Released") {

            $('#ManageTeams').prop('checked', false);
            $("#ManageTeams").prop("disabled", true);

            $('#ManageDocuments').prop('checked', false);
            $("#ManageDocuments").prop("disabled", true);

            $('#ManageTasks').prop('checked', false);
            $("#ManageTasks").prop("disabled", true);
        }
        else {
            $("#ManageTeams").prop("disabled", false);
            $("#ManageDocuments").prop("disabled", false);
            $("#ManageTasks").prop("disabled", false);

        }

    });

/*-----------add by lakhan-------------------------------------*/
     $("#TabDocument").click(function () {
        getActiveTeamMamber();
     
     });
     
    $("#btnupdate").click(function () {
        //Loader
        var dlgTitle = 'Updating...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        setTimeout(function () {
            callGetViewAllTeamMemberMethod = true;
            UpdateEmployeeData(selectedTeamMemberItemId);
            $("#add-team-modal").modal("hide");
        }, 100);
    });

    $("#btnsubmit").click(function () {
        //Loader
        var dlgTitle = 'Adding...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        setTimeout(function () {
            AddEmployeeData("");
        }, 100);
    });


    $("#btnAddNewTeamMember").click(function () {
        if (CanAddMember == true) {
            $("#groupselection1").hide();
            $("#userHTMLBox").empty();
            $("#userList").hide();
            $("#drpuser").val('0');
            $("#TeamMemberHeader").text("Add team member");
            $("#editmodeaccount").hide();
            ResetAllControls();
            $("#btnsubmit").show();
            $("#divReleasedDate").hide();
            $("#groupselce").show();
            $("#editmodeaccount").hide();
            $("#add-team-modal").modal('show');
            var ProjectEndDate = new Date($("#PlanedEndDate").text());
            todayDate = new Date();
            todayDate = todayDate.setHours(0, 0, 0, 0);
            todayDate = new Date(todayDate);
            if (ProjectEndDate >= todayDate) {
                $("#ExpectedReleaseDate").val($.datepicker.formatDate('dd/mm/yy', ProjectEndDate));
            }

            FetchAllTeammembersList();
            selectedTeamMemberItemId = "";
            callGetViewAllTeamMemberMethod = false;
            var standardDateFormatt = new Date(ConvertddmmyyTommddyy(projectStartDateValidation));
            var todaysDate = new Date();
            EnableDisableControl(false);
            $("#btnupdate").hide();
            if (standardDateFormatt > todaysDate) {
                $("#EngageDate").val(projectStartDateValidation);
            }
            else {
                todaysDate = $.datepicker.formatDate('dd/mm/yy', todaysDate);
                $("#EngageDate").val(todaysDate);
            }
            $("#MemberStatus").prop("disabled", "disabled");
        }
        else {
            alert("You are not authorized to perform this action.");
            return false;
        }
    });
    $("#ExpectedReleaseDate").datepicker({
        dateFormat: 'dd/mm/yy',
    }).keypress(function (event) { event.preventDefault(); });

    $("#EngageDate").datepicker({
        dateFormat: 'dd/mm/yy',
    }).keypress(function (event) { event.preventDefault(); });

    $("#ReleaseDate").datepicker({
        dateFormat: 'dd/mm/yy',
    }).keypress(function (event) { event.preventDefault(); });


    $('#drpuser').change(function () {
        multipleEmailAddress = [];
        assignUserName = [];
        EmpIds = [];
        $("#userHTMLBox").empty();
        $("#btnProjectName").text("Select");
        var userGroupSelection = $("#drpuser").val();
        if(this.value == "Group") {
	        if ($('#MySharedGroup option').length == 0) {
	            GetDepartmentConfidentialGroupUsersGroups();
	        }
        }
        if (userGroupSelection != '0') {
            UserSelectionHideShowGroupSection(userGroupSelection)
        }
        else {
            $("#groupselection1").hide();
            $("#projectteams").hide();
            $("#userList").hide();
        }
    });
    $("#MySharedGroup").change(function () {
        var teamMemberId = $("#MySharedGroup").val();
        assignUserName = [];
        EmpIds = [];
        multipleEmailAddress = [];
        $("#userHTMLBox").empty();
        if (teamMemberId != 0) {
            $("#userList").show();
            GetMyGroupUsers(teamMemberId);
        }
        else {
            $("#userList").hide();
            //$("#GroupUserList").hide();
        }
    });
    $("#btnCancelTeam").click(function () {
        $("#drpuser").val('0');
        $("#MemberRole").val('');
        $("#MemberStatus").val('Active');
        $("#ExpectedReleaseDate").val('');
        $("#ManageTeams").prop("checked", false);
        $("#ManageDocuments").prop("checked", false);
        $("#ManageTasks").prop("checked", false);
        $("#groupselection1").hide();
    });
    $('#addingsec').click(function (e) {
        e.preventDefault();
        $('.searchingbox input').toggleClass('effecting');
    });
});

//convert date into suitable format
function ConvertddmmyyTommddyy(ddmmyyyString) {
    return ddmmyyyString.split('/')[1] + "/" + ddmmyyyString.split('/')[0] + "/" + ddmmyyyString.split('/')[2];
}

//get users of selected group
function GetMyGroupUsers(itemId) {
    //MyGoupUserIdArray = [];
    //assignToUser = [];
    assignUserName = [];
    EmpIds = [];
    multipleEmailAddress = [];
    //$("#GroupUserList").show();
    var attachment = '',
        user = '',
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentSharedGroups')/items?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/EMail,LogonUser/ID,LogonUser/Title,LogonUser/EMail,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID asc&$filter=ID eq '" + itemId + "'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            var response = data;
            for (var groupIndex = 0; groupIndex < response.d.results.length; groupIndex++) {
                if (response.d.results[groupIndex].SharedUsers.results != null) {
                    for (var subGrroupIndex = 0; subGrroupIndex < response.d.results[groupIndex].SharedUsers.results.length; subGrroupIndex++) {
                        var userNamecurretn = response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].EMail;
                        if (userNamecurretn != null && userNamecurretn != "") {
                            if (userNamecurretn.includes('#') == true) {
                                userNamecurretn = userNamecurretn.split('#ext')[0];
                                userNamecurretn = userNamecurretn.replace("_", '@');
                            }
                            if (ExisitngTeamMemberArray.indexOf(response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].ID) == -1) {
                                multipleEmailAddress.push(userNamecurretn);
                                assignUserName.push(response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].Title);
                                EmpIds.push(response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].ID);
                                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(userNamecurretn);
                                user += '<div class="col-sm-6 parentremove"><div class="employeesection"><span class="crosebox" onclick="removeUser(this, \'' + userNamecurretn + '\', \'' + response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].Title + '\', ' + response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].ID + ');"><i class="fa fa-times"></i></span>';
                                user += '<div class="empoyeeimg"><img src="' + attachment + '"></div>';
                                user += '<div class="employeeinfo"><h3>' + response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].Title + '</h3><span onclick="OpenEmail(\'' + userNamecurretn + '\');">' + userNamecurretn + '</span></div></div></div>';

                                //MyGoupUserIdArray.push(response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].ID);
                                //selectedgroupUserName.push(response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].Title);
                                //assignToUser.push(response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].EMail);
                            }
                        }
                    }
                    $("#userHTMLBox").append(user);
                }
            }
        },
        error: function (data) {
            console.log(JSON.stringify(data));
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    });
}

//get all groups
function GetDepartmentConfidentialGroupUsersGroups() {
    $("#MySharedGroup").empty();
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentSharedGroups')/items?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/UserName,LogonUser/ID,LogonUser/Title,LogonUser/UserName,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID asc&$filter=LogonUser/ID eq '" + _spPageContextInfo.userId + "'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            var response = data;
            $('<option value="0">--Select--</option>').appendTo("#MySharedGroup");
            var option = "";
            for (var groupIndex = 0; groupIndex < response.d.results.length; groupIndex++) {
                var groupName = response.d.results[groupIndex].SharingLevel;
                var currentItemID = response.d.results[groupIndex].ID;
                option += "<option value='" + currentItemID + "'title='Group'>" + groupName + "</option>";


            }
            $("#MySharedGroup").append(option);
        },
        error: function (data) {
            console.log(JSON.stringify(data));
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    });
}

// Multiple people picker
function SetPeoplePicker_MultiselectGroups(peoplePickerElementId, allowMultiple) {
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
    schema['Width'] = '100%';
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);

}

//Hide and show Group option or user option
function UserSelectionHideShowGroupSection(showhidecontrol) {
    if (showhidecontrol == "Group") {
        $("#groupselection1").show();
        $("#userHTMLBox").empty();
        $("#projectteams").hide();
        $("#userList").hide();
    }
    else if (showhidecontrol == "Employee" || showhidecontrol == "GuestUsers") {
        $("#groupselection1").hide();
        $("#userHTMLBox").empty();
        $("#projectteams").hide();
        $("#userList").show();
    }
    else if (showhidecontrol == "OtherProject") {
        $("#userList").hide();
        if ($("#AllProjectsList").html() == "") {
            loadProjects();
        }
        $("#groupselection1").hide();
        $("#userHTMLBox").empty();
        $("#projectteams").show();
    }
}

//get all Team members list
function FetchAllTeammembersList() {
    var itemId = txtProjectID; //titanForWork.getQueryStringParameter("ProjectID");
    ExisitngTeamMemberArray = [];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items?&$top=300&$select=*,TeamMember/Title&$expand=TeamMember&$Filter=ProjectId eq '" + itemId + "'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var results = data.d.results;
            $.each(results, function (i, item) {
                ExisitngTeamMemberArray.push(item.TeamMemberId);
            })
        }, eror: function (data) {
            console.log('error');
        }
    });
}


//get details of selected Team member
function GetAllTeamMemberDetailsByProjectId() {
    ExisitngTeamMemberArray = [];
    var itemId = txtProjectID;//titanForWork.getQueryStringParameter("ProjectID");
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items?$select=*,TeamMember/Id,TeamMember/EMail,TeamMember/Title&$expand=TeamMember&$Filter=ProjectId eq '" + itemId + "'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var dvTable = $("#viewALLTealMemberes");
            
            if (TeamTable != '') {
	        	TeamTable.destroy();
	    	}
		    dvTable.empty();
            var items = data.d.results;
            if(items.length > 0) {
	            for (var i = 0; i < items.length; i++) {
	
	                var StatusActive = items[i].Status;
	                
	                var TeamPermission = items[i].TeamPermission;
	                if (items[i].TeamMember.EMail == _spPageContextInfo.userEmail && StatusActive == "Active" && TeamPermission == true) {
	                    $("#btnAddNewTeamMember").show();
	                    CanAddMember = true;
	                    //$("#btnAddNewTeamMembersPopup").show();
	                    currentUserTeamPermission = true;
	                    currentUserHaveDocumentPermission = true;
	                }
	                var tr = "";
	                var TeamMemberId = items[i].TeamMember.Title;
	                if (TeamMemberId == null || TeamMemberId == "") {
	                    TeamMemberId = "";
	                }
	                else {
	                    ExisitngTeamMemberArray.push(items[i].TeamMember.Id)
	                }
	
	                var Role = items[i].Role;
	                if (Role == null || Role == "") {
	                    Role = "";
	                }
	
	                var Status = items[i].Status;
	                if (Status == null || Status == "") {
	                    Status = "";
	                }
	                var StatusColor = "red !important"
	                if (Status == "Active") {
	                    StatusColor = "green !important";
	                }
	
	                var EngageDate = items[i].EngageDate;
	
	                if (EngageDate == null || EngageDate == "") {
	                    EngageDate = "";
	                }
	                else {
	                    EngageDate = new Date(items[i].EngageDate);
	                    EngageDate = $.datepicker.formatDate('dd-M-yy', EngageDate);
	                }
	
	                var ExpectedReleseDate = items[i].ExpectedReleseDate
	
	                if (ExpectedReleseDate == null || ExpectedReleseDate == "") {
	                    ExpectedReleseDate = "";
	                }
	                else {
	                    ExpectedReleseDate = new Date(items[i].ExpectedReleseDate);
	                    ExpectedReleseDate = $.datepicker.formatDate('dd-M-yy', ExpectedReleseDate);
	                }
	
	                var ReleseDate = items[i].ReleseDate;
	                if (ReleseDate == null || ReleseDate == "") {
	                    ReleseDate = "";
	                }
	                else {
	                    ReleseDate = new Date(ReleseDate);
	                    ReleseDate = $.datepicker.formatDate('dd-M-yy', ReleseDate);
	                }
	
	                var TeamPermission = items[i].TeamPermission;
	                var DocumentPermission = items[i].DocumentPermission;
	                var TaskPermission = items[i].TaskPermission;
	                var DepartmentName = ""
	                var Designation = "";
	                var MemberEmails = "";
	                //get employee image
	                var attachmentUrl = '';
	                var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,FullName,LogonName/EMail,Company/Id,Company/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Company,Department&$top=5000&$filter=LogonName/EMail eq '" + items[i].TeamMember.EMail + "' ";
	                dfds = $.Deferred();
	                url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + Query;
	                $.when(getItems(url, dfds)).done(function (Results) {
	                    response = [];
	                    UResults = Results;
	                    if (UResults.length > 0) {
	                        var value = UResults[0];
	                        if (value.AttachmentFiles.results.length > 0) {
	                            attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
	                        }
	                        else {
	                            attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
	                        }
	                        DepartmentName = value.Department.Title;
	                        Designation = value.Designation;
	                        MemberEmails = value.LogonName.EMail;
	                    }
	                    else { //check for external users
	                        var Query = "?$select=AttachmentFiles,LoginName/EMail,Designation,Client_Name/Title&$expand=LoginName,Client_Name,AttachmentFiles&$top=5000&$filter=LoginName/EMail eq '" + items[i].TeamMember.EMail + "' ";
	                        dfds = $.Deferred();
	                        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
	                        $.when(getItems(url, dfds)).done(function (Results) {
	                            response = [];
	                            UResults = Results;
	                            if (UResults.length > 0) {
	                                var value = UResults[0];
	                                if (value.AttachmentFiles.results.length > 0) {
	                                    attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
	                                }
	                                else {
	                                    attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LoginName.EMail);
	                                }
	                                DepartmentName = value.Client_Name.Title;
	                                if (DepartmentName.length > 11) {
	                                    DepartmentName = DepartmentName.substring(0, 10) + "...";
	                                }
	                                Designation = value.Designation;
	                                MemberEmails = value.LoginName.EMail;
	
	                            }
	                            else {
	                                attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[i].TeamMember.EMail);
	                            }
	                        });
	                    }
	                });
	
	                tr += '<tr class="text-left">';
	                tr += '<td><div class="team-img-box"><img src="' + attachmentUrl + '" alt="user img"></div></td>';
	                tr += '<td><p class="color-blue"><b>' + TeamMemberId + '</b></p><span class="m-0 mt-4"><label class="m-0 b-400">' + Designation + ' | ' + DepartmentName + '</label>';
	                tr += '</span><br><span style="cursor:pointer;color:blue;" onclick="OpenEmail(this);">' + MemberEmails + '</span></td>';
	                tr += '<td class="text-center">' + Role + '</td>';
	                tr += '<td class="text-center" style="color:' + StatusColor + ' ">' + Status + '</td>';
	                tr += '<td class="text-center">' + EngageDate + '</td>';
	                tr += '<td class="text-center">' + ExpectedReleseDate + '</td>';
	                tr += '<td class="text-center">' + ReleseDate + '</td>';
	                if (TeamPermission == true) {
	                    tr += '<td class="text-center"><span class="fa fa-check checked"></span></td>';
	                }
	                else {
	                    tr += '<td class="text-center"><span class="fa fa-minus greyed-out"></span></td>';
	                }
	
	                if (DocumentPermission == true) {
	                    tr += '<td class="text-center"><span class="fa fa-check checked"></span></td>';
	                }
	                else {
	                    tr += '<td class="text-center"><span class="fa fa-minus greyed-out"></span></td>';
	                }
	
	                if (TaskPermission == true) {
	                    tr += '<td class="text-center"><span class="fa fa-check checked"></span></td>';
	                }
	                else {
	                    tr += '<td class="text-center"><span class="fa fa-minus greyed-out"></span></td>';
	                }
	                tr += '<td><div class="attendance-view-btn-box text-center"><a href="javascript:GetMemberDetailsById(' + items[i].Id + ')" class="custom-view-btn"><i class="fa fa-pencil"></i></a></div></td>';
	                tr += '</tr>';
	                dvTable.append(tr);
	            }
	            
                TableTeamPagination();
	        }
        }, eror: function (data) {
            console.log('error');
        }
    });
}

var TeamTable = '';
//method for pagination of Team
function TableTeamPagination() {
    TeamTable = $('#tblTeamTable').DataTable({
        'columnDefs': [{ 'orderable': false, 'targets': 0 }, { 'orderable': false, 'targets': 10 }], // hide sort icon on header of first column
        "bPaginate": true,
        "bJQueryUI": true, // ThemeRoller-stöd
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bProcessing": true,
        "iDisplayLength": 10,
        "dom": 'Rlfrtip',
        "colReorder": {
            'allowReorder': true
        },
        "language": {
            "searchPlaceholder": "Type to find....",
            "sSearch": ""
        }
    });
    $("#tblTeamTable_filter").hide();
    $('#SearchTeamTable').keyup(function () {
        TeamTable.search($(this).val()).draw();
    });
}

//to sort table as per the selected option
function SortTeamTable() {
    $(".ClickUserName").click(function () {
    	$(".SortName").trigger('click');
    });
	$(".ClickUserRole").click(function () {
    	$(".SortUserRole").trigger('click');
    });
	$(".ClickUserStatus").click(function () {
    	$(".SortStatus").trigger('click');
    });
	$(".ClickUserEngage").click(function () {
    	$(".SortEngagedate").trigger('click');
    });
}


function OpenEmail(Email) {
    window.location = "mailto:" + Email.textContent;
}

//get user information from people picker
function getUserInformationTeam(PeoplepickerId, multipleEmailAddress, assignUserName) {
    // Get the people picker object from the page. 
    var userIds = [];
    var uniqueValues = [];
    var useremail = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if (!peoplePicker.IsEmpty()) {
        if (peoplePicker.HasInputError) return false; // if any error  
        else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users  
        else if (peoplePicker.TotalUserCount > 0) {
            // Get information about all users.  
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            var promise = '';
            var UsersID = '';
            for (var i = 0; i < users.length; i++) {
                // UsersID += GetUserID(users[i].Key);
                var accountName = users[i].Key;
                multipleEmailAddress.push(users[i].EntityData.Email);
                assignUserName.push(users[i].DisplayText);
                var userId = GetUserID(accountName);
                if (userId != -1) {
                    if (uniqueValues.indexOf(userId) == -1) {
                        uniqueValues.push(userId);
                        userIds.push(userId);
                    }
                }
            }
            return userIds;
        }
    } else {
        return UsersID;
    }
}

//check if user is active 
function IsUserActive(userEmail) {
    var IsActiveFlag = false;
    var RestQuery = "?$top=5000&$select=Email,Status&$filter= Status eq 'Active' and Email eq '" + userEmail + "' ",
        dfds = $.Deferred(),
        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + RestQuery;
    $.when(getItems(url, dfds)).done(function (Employees) {
        response = [];
        if (Employees.length > 0) {
            IsActiveFlag = true;
        }
        else {
            var today = new Date();
            //Set the hours for Today
            today = today.setUTCHours(0, 0, 0, 0); //This will reset today to start from today at 12:00am UTC
            today = new Date(today);
            today = today.toISOString(); //this will return to UTC string
            var RestQuery = "?$top=5000&$select=LoginName/EMail,ValidUpto,Status&$expand=LoginName&$filter= Status eq 'Active' and LoginName/EMail eq '" + userEmail + "' and ValidUpto gt '" + today + "' ",
		        dfds = $.Deferred(),
		        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + RestQuery;
            $.when(getItems(url, dfds)).done(function (Employees) {
                response = [];
                if (Employees.length > 0) {
                    IsActiveFlag = true;
                }
            });
        }
    });
    return IsActiveFlag;
}

//get details of team member
function OnTeamMemberSelection(teamMemberId, messageFlag, Action) {
    itemCollectionRange = [];
    IsAddedName = '';
    var itemId = txtProjectID;//titanForWork.getQueryStringParameter("ProjectID");
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items?$select=*,TeamMember/Title&$expand=TeamMember&$Filter=ProjectId eq '" + itemId + "' and TeamMemberId eq '" + teamMemberId + "'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                var tr = "";
                var TeamMemberId = items[i].TeamMember.Title;
                if (TeamMemberId == null || TeamMemberId == "") {
                    TeamMemberId = "";
                }

                var Role = items[i].Role;
                if (Role == null || Role == "") {
                    Role = "";
                }

                var Status = items[i].Status;
                var drpvalue = $("#drpuser").val();
                if (drpvalue == "MultipleUsers") {
                    if (Status == "Active" && messageFlag == true) {
                        activeusers += items[i].TeamMember.Title + ",";
                        AdminWarning = true;
                    }
                }
                else {
                    if (Status == "Active" && messageFlag == true) {
                        if (Action != "NoPopup") {
                            alert("Team Member is already in Active mode. Please select other team member !")
                        }
                        $("#ProjectTeamMemmers").val(0);
                        IsAddedName = TeamMemberId;
                        break;
                    }
                }
            }

        }, eror: function (data) {
            console.log('error');
        }
    });
    return IsAddedName;
}

//check if guest-user is active 
function IsGuestUserActive(userEmail) {
    var IsActiveFlag = false;
    var today = new Date();
    //Set the hours for Today
    today = today.setUTCHours(0, 0, 0, 0); //This will reset today to start from today at 12:00am UTC
    today = new Date(today);
    today = today.toISOString(); //this will return to UTC string
    var RestQuery = "?$top=5000&$select=LoginName/EMail,ValidUpto,Status&$expand=LoginName&$filter= Status eq 'Active' and LoginName/EMail eq '" + userEmail + "' and ValidUpto gt '" + today + "' ",
        dfds = $.Deferred(),
        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + RestQuery;
    $.when(getItems(url, dfds)).done(function (Employees) {
        response = [];
        if (Employees.length > 0) {
            IsActiveFlag = true;
        }
    });
    return IsActiveFlag;
}

//Add Team member in list
function AddEmployeeData(currentItemId) {
    var arrAddedEmp = [];
    var arrInactiveEmps = [];
    var AlreadyAssignUser = "";
    var InactiveUser = '';
    var groupsel = $("#drpuser").val();
    if (groupsel == "0") {
        alert("Please select any option to submit.");
        currentDlg.close();
        return false;
    }
        //for Employee tab
    else if (groupsel == "Employee" || groupsel == "OtherProject") {
        if (EmpIds.length == 0) {
            alert("Please enter team members.");
            currentDlg.close();
            return false;
        }
        else {
            arrAddedEmp = [];
            AlreadyAssignUser = "";
            InactiveUser = ''; arrInactiveEmps = [];
            AdminWarning = false;
            activeusers = "";
            for (var k = 0; k < EmpIds.length; k++) {
                if (IsUserActive(multipleEmailAddress[k]) == true) {
                    Result = OnTeamMemberSelection(EmpIds[k], true, "NoPopup");
                    if (Result != "") {
                        arrAddedEmp.push({
                            AddedUser: Result,
                            AddedUserId: EmpIds[k]
                        });
                        AlreadyAssignUser += Result + ", "
                    }
                }
                else {
                    arrInactiveEmps.push({
                        AddedUser: assignUserName[k],
                        AddedUserId: EmpIds[k]
                    });
                    InactiveUser += assignUserName[k] + ", "
                }
            }
            if (AdminWarning == true) {
                alert(activeusers + "Team Member is already in active mode");
                if (currentDlg != "") {
                    currentDlg.close();
                }
                return false;
            }
        }
    }

        //for Group
    else if (groupsel == "Group") {
        InactiveUser = ''; arrInactiveEmps = [];
        if ($('#MySharedGroup').val() != 0) {
            MyGoupUserIdArray = EmpIds.filter(function (f) { return f; });
        }
        else {
            alert("Please select Team Member/Group");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return false;
        }

        for (var k = 0; k < multipleEmailAddress.length; k++) {
            if (IsUserActive(multipleEmailAddress[k]) != true) {
                arrInactiveEmps.push({
                    AddedUser: selectedgroupUserName[k],
                    AddedUserId: MyGoupUserIdArray[k]
                });
                InactiveUser += selectedgroupUserName[k] + ", "
            }
        }
    }
        //for guest users
    else if (groupsel == "GuestUsers") {
        if (EmpIds.length == 0) {
            alert("Please enter external user.");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return false;
        } else {
            arrAddedEmp = [];
            AlreadyAssignUser = "";
            InactiveUser = ''; arrInactiveEmps = [];
            AdminWarning = false;
            activeusers = "";

            for (var k = 0; k < EmpIds.length; k++) {
                if (IsGuestUserActive(multipleEmailAddress[k]) == true) {
                    Result = OnTeamMemberSelection(EmpIds[k], true, "NoPopup");
                    if (Result != "") {
                        arrAddedEmp.push({
                            AddedUser: Result,
                            AddedUserId: EmpIds[k]
                        });
                        AlreadyAssignUser += Result + ", "
                    }
                }
                else {
                    arrInactiveEmps.push({
                        AddedUser: assignUserName[k],
                        AddedUserId: EmpIds[k]
                    });
                    InactiveUser += assignUserName[k] + ", "
                }
            }
            AdminWarning = false;
            activeusers = "";
        }
    }

    for (user = 0; user < arrAddedEmp.length; user++) {
        removeItemAll(EmpIds, arrAddedEmp[user].AddedUserId);
    }
    for (user = 0; user < arrInactiveEmps.length; user++) {
        removeItemAll(EmpIds, arrInactiveEmps[user].AddedUserId);
    }
    var txtCompanyId = Logged_CompanyId;
    var ProjectName = $("#txtProjectName").text();
    var projectID = txtProjectID;
    var fullName = EmpIds;
    var role = $("#MemberRole").val().trim();
    var memberststus = $("#MemberStatus").val();
    var dob = $("#EngageDate").val();
    var doa = $("#ExpectedReleaseDate").val();
    var doj = $("#ReleaseDate").val();
    var TeamPermission = $("#ManageTeams").prop("checked");
    var DocumentPermission = $("#ManageDocuments").prop("checked");
    var TaskPermission = $("#ManageTasks").prop("checked");
    var engageDate = "";
    if (dob != null && dob != "") {
        engageDate = GetDateStandardFormat(dob);
    }
    var expectedReleseDate = "";
    if (doa != null && doa != "") {
        expectedReleseDate = GetDateStandardFormat(doa);
    }
    else {
        expectedReleseDate = null;
    }
    var releseDate = "";
    if (doj != null && doj != "") {
        releseDate = GetDateStandardFormat(doj);
    }
    else {
        releseDate = null;
    }

    if (expectedReleseDate != null) {
        if (expectedReleseDate < engageDate) {
            alert("Expected release date can't be less than the engaged date !");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return;
        }
    }
    if (memberststus != "Active") {
        if (releseDate == null) {
            alert("Please enter release date !");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return;
        }
        if (releseDate < engageDate) {
            alert("Release date can't be less than the engaged date!");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return;
        }
    }
    if (role != '' && fullName.length != 0) {
        for (var i = 0; i < EmpIds.length; i++) {
            if (currentItemId == "") {
                $("#AddUpdateModal").modal("hide");
                AddNewEmployee("ProjectTeamDetails", EmpIds[i], role, memberststus, engageDate, expectedReleseDate, releseDate, parseInt(projectID), TeamPermission, DocumentPermission, TaskPermission, txtCompanyId);
                // GetProjectForTeamDetails()
                if (i == (EmpIds.length - 1)) {
                    $("#drpuser").val('0');
                    $("#MemberRole").val('');
                    $("#MemberStatus").val('Active');
                    $("#ExpectedReleaseDate").val('');
                    $("#ManageTeams").prop("checked", false);
                    $("#ManageDocuments").prop("checked", false);
                    $("#ManageTasks").prop("checked", false);
                    $("#groupselection1").hide();
                    $("#add-team-modal").modal("hide");
                    if (currentDlg != "") {
                        currentDlg.close();
                    }
                    GetAllTeamMemberDetailsByProjectId();
                    alert("Team member(s) has been added successfully.");
                    $("#drpuser").val('0');
                    $("#drpuser").trigger("change");
                }
            }
            else {
                var ItemId = currentItemId;
                updateTeamMemberDetails("ProjectTeamDetails", EmpIds[i], role, memberststus, engageDate, expectedReleseDate, releseDate, parseInt(projectID), ItemId, TeamPermission, DocumentPermission, TaskPermission, txtCompanyId);
                if (i == (EmpIds.length - 1)) {
                    $("#AddUpdateModal").modal("hide");
                    alert("Item updated successfully !");
                }
            }
        }
    }
    else {
        if (role == "") {
            alert("Please fill all required fields.");
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    }
    if (AlreadyAssignUser != "") {
        alert(AlreadyAssignUser.substring(0, AlreadyAssignUser.length - 2) + " team member(s) are already in active mode. Please select other team member!");
        $("#userHTMLBox").empty();
        multipleEmailAddress = [];
        assignUserName = [];

        if (currentDlg != "") {
            currentDlg.close();
        }
    }
    if (InactiveUser != "") {
        alert(InactiveUser.substring(0, InactiveUser.length - 2) + " team member(s) are not valid!");
        $("#userHTMLBox").empty();
        multipleEmailAddress = [];
        assignUserName = [];
        if (currentDlg != "") {
            currentDlg.close();
        }
    }
    if (currentDlg != "") {
        currentDlg.close();
    }
}


//remove all element in array by value
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

// Add data in SP list
function AddNewEmployee(ListName, fullName, role, memberststus, dateOfBirth, dateOfAnniversary, joiningDate, projectID, TeamPermission, DocumentPermission, TaskPermission, txtCompanyId) {
    try {
        var Metadata;
        var ItemType = GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            TeamMemberId: fullName,
            Status: memberststus,
            Role: role,
            EngageDate: dateOfBirth,
            ExpectedReleseDate: dateOfAnniversary,
            ReleseDate: joiningDate,
            ProjectId: projectID,
            TaskPermission: TaskPermission,
            DocumentPermission: DocumentPermission,
            CompanyId: txtCompanyId,
            TeamPermission: TeamPermission
        };

        if (dateOfBirth == null || dateOfBirth == "") {
            delete Metadata["EngageDate"];
        }

        $.when(AddItemToList(ListName, Metadata)).done(function (MainExamListItemTemp) {

            if (DocumentPermission == true) {
                BreakInheritePermissionDMSLibrary(fullName, "1073741830", "Add");//full permission
            }
            else {
                BreakInheritePermissionDMSLibrary(fullName, "1073741826", "Remove");//reduce permmission
            }
        });
    }
    catch (error) {
        console.log(error.message);
        if (currentDlg != "") {
            currentDlg.close();
        }
    }

}

function AddItemToList(ListName, Metadata) {
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
            if (currentDlg != "") {
                currentDlg.close();
            }
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Update Team member data in List
function updateTeamMemberDetails(ListName, fullName, role, memberststus, engageDate, expectedReleseDate, releseDate, projectID, ItemId, TeamPermission, DocumentPermission, TaskPermission, txtCompanyId) {
    try {
        var Metadata;
        var ItemType = GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: {
                'type': ItemType
            },

            TeamMemberId: fullName,
            Status: memberststus,
            Role: role,
            EngageDate: engageDate,
            ExpectedReleseDate: expectedReleseDate,
            ReleseDate: releseDate,
            ProjectId: projectID,
            TaskPermission: TaskPermission,
            DocumentPermission: DocumentPermission,
            CompanyId: txtCompanyId,
            TeamPermission: TeamPermission
        };

        if (engageDate == null || engageDate == "") {
            delete Metadata["EngageDate"];
        }

        $.when(updateItemToList(ListName, Metadata, ItemId)).done(function (MainExamListItemTemp) {
            if (DocumentPermission == true) {
                BreakInheritePermissionDMSLibrary(fullName, "1073741830", "Add");//full permission
            }
            else {
                BreakInheritePermissionDMSLibrary(fullName, "1073741826", "Remove");//reduce permission
            }

            CheckCreateTaskAuthorization();

            if (callGetViewAllTeamMemberMethod == true) {
                GetAllTeamMemberDetailsByProjectId();
            }

        });

    }
    catch (error) {
        console.log(error.message);
        if (currentDlg != "") {
            currentDlg.close();
        }
    }
}

function updateItemToList(ListName, Metadata, ID) {
    var dfd = $.Deferred();

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + ID + "')",
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(Metadata),
        async: false,
        success: function (RESULT) {
            // console.log();
            dfd.resolve(true);

        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    });
    return dfd.promise();
}

//get date in SP list format
function GetDateStandardFormat(date) {
    var dateS = ConvertDateFormatToddMMyyyy(date);
    var startDate = new Date(dateS);
    var day = 60 * 60 * 24 * 1000;
    var endDate = new Date(startDate.getTime());
    var newDate = endDate.toISOString();
    return newDate;
}

//Convert date format into 01/12/2021
function ConvertDateFormatToddMMyyyy(date) {
    var formatedDate = stringToDate(date, 'dd/MM/yyyy', "/")
    return formatedDate;
}

//convert string date format to date
function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}

function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

// Assign suitable permission in library
function AssignPermissiononDMSLibary(userPrincpleId, permissionLevel) {
    var dmsSiteURL = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/DMS/" + currentProjectSiteURL;
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var webUrl = dmsSiteURL + "/_api/web/lists/getByTitle('Documents')/roleassignments/addroleassignment(principalid=" + userPrincpleId + ",roleDefId=" + permissionLevel + ")";
    $.ajax(
    {
        url: webUrl,
        type: "POST",
        headers: headers,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log("User has been assigned permission .");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    });
}

// Delete permission in DMS library
function DeleteUserPermissionOnDMSLibrary(userPrincipleId) {
    var dmsSiteURL = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/DMS/" + currentProjectSiteURL;
    var headers = {
        'X-RequestDigest': $('#__REQUESTDIGEST').val(),
        'X-HTTP-Method': 'DELETE'
    }
    var endPointUrl = dmsSiteURL + "/_api/web/lists/getByTitle('Documents')/roleassignments/getbyprincipalid(" + userPrincipleId + ")";
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json', success: function (data) {
            console.log(userPrincipleId + ' Successfully removed Permission !');
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    });

}

function BreakInheritePermissionDMSLibrary(userPrincipleId, permissionLevel, commandAddRemove) {
    var dmsSiteURL = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/DMS/" + currentProjectSiteURL;
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var endPointUrl = dmsSiteURL + "/_api/web/lists/getByTitle('Documents')/breakroleinheritance(copyRoleAssignments=false, clearSubscopes=true)";
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json', success: function (data) {
            console.log("Permission has been breaked successfully!");
            if (commandAddRemove == "Add") {
                $.when(AssignPermissiononDMSLibary(userPrincipleId, permissionLevel)).done(function (MainExamListItemTemp) {
                    console.log("Permission has been assigned successfully!");
                });
            }
            else {
                $.when(DeleteUserPermissionOnDMSLibrary(userPrincipleId)).done(function (MainExamListItemTemp) {
                    console.log("Permission has been removed successfully!");
                    $.when(AssignPermissiononDMSLibary(userPrincipleId, permissionLevel)).done(function (MainExamListItemTemp) {
                        console.log("Permission has been assigned successfully!");
                    });

                });
            }
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    });
}

//Get template of emails
function GetTaskEmailTemplate(filterItemId) {
    var resturl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/Lists/GetByTitle('EmailTemplate')/Items?$select=ID,Body,Subject,EmailType,Title&$filter=Title eq '" + filterItemId + "'";
    $.ajax({
        url: resturl,
        headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        async: false,
        success: function (data) {
            var items = data.d.results;
            for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
                if (items[itemIndex].Body != null) {
                    emailBodyContent = items[itemIndex].Body;
                }
                if (items[itemIndex].Subject != null) {
                    taskEmailSubject = items[itemIndex].Subject;
                }

            }
        }, eror: function (data) {
            console.log('error');
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    });
}

// Send email to users
function SendTaskEmail(fullNamee, role, date, datee, status) {
    engagedate = new Date(date);
    engagedate = $.datepicker.formatDate('dd-M-yy', engagedate);
    if (datee != null) {
        releasedatee = new Date(datee);
        releasedatee = $.datepicker.formatDate('dd-M-yy', releasedatee);
    }
    else {
        releasedatee = '';
    }


    var commonBodyContentsNotification = emailBodyContent;
    var emailSubject = taskEmailSubject;

    projectItemDetails.forEach(function (item) {

        commonBodyContentsNotification = commonBodyContentsNotification.replace("{{ProjectManager}}", item.projecttouser);
        commonBodyContentsNotification = commonBodyContentsNotification.replace("{{ProjectCode}}", item.ProjectCode);
        commonBodyContentsNotification = commonBodyContentsNotification.replace("{{ProjectName}}", item.ProjectName);
        commonBodyContentsNotification = commonBodyContentsNotification.replace("{{Role}}", role);
        commonBodyContentsNotification = commonBodyContentsNotification.replace("{{ProjectClientName}}", item.ClientName);
        commonBodyContentsNotification = commonBodyContentsNotification.replace("{{ConcerneadDepartment}}", item.DepartmentName);
        commonBodyContentsNotification = commonBodyContentsNotification.replace("{{EngagetDate}}", engagedate);
        commonBodyContentsNotification = commonBodyContentsNotification.replace("{{ExpReleaseDate}}", releasedatee);
        if (status != "Released") {
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{Projectlink}}", _spPageContextInfo.webAbsoluteUrl + "/Pages/ViewProjectDetails.aspx?WebAppId=" + companyID + "&ProjectID=" + item.ID + "&ProjectName=" + item.ProjectName + "");
        }
        emailSubject = emailSubject.replace("{{ProjectName}}", item.ProjectName);

    });


    var from = _spPageContextInfo.userEmail;
    var Metadata;
    Metadata = {
        'properties': {
            '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
            'From': from,
            //   'To': { 'results': stackToUsers, sponsorToUsers},
            'To': { 'results': fullNamee },

            'CC': { 'results': projectManage },
            'Body': commonBodyContentsNotification,
            'Subject': emailSubject
        }
    };
    var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: sitetemplateurl,
        type: "POST",
        data: JSON.stringify(Metadata),
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            console.log("Message has been sent.");
        },
        error: function (err) {
            waitingDialog.hide();
            console.log("SendEmailSharedNotification  " + JSON.stringify(err));
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    });
}


// Get the user ID.
function GetUserID(logonName) {
    var item = {
        'logonName': logonName
    }

    var userId = -1;
    var UserId = $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + '/_api/web/ensureuser',
        type: 'POST',
        async: false,
        contentType: 'application/json;odata=verbose',
        data: JSON.stringify(item),
        headers: {
            'Accept': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        success: function (data) {
            userId = data.d.Id;
        },
        error: function (data) {
            console.log(data)
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    })
    return userId;

}

//empty the people picker
function EmptyPeoplePicker(peoplePickerId) {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
    var usersobject = peoplePicker.GetAllUserInfo();
    usersobject.forEach(function (index) {
        peoplePicker.DeleteProcessedUser(usersobject[index]);
    });
}


function GetMemberDetailsById(currentItemId) {
    $("#groupselection1").hide();
    //$("#AssaginTaskTeam").hide();
    $("#userHTMLBox").empty();
    $("#userList").hide();
    $("#editmodeaccount").show();
    $("#btnupdate").show();
    $("#btnsubmit").hide();
    $("#groupselce").hide();
    $("#editmodeaccount").show();
    $("#TeamMemberHeader").text("Edit team member");
    selectedTeamMemberItemId = currentItemId;
    MyGoupUserIdArray = [];
    assignToUser = [];
    //assignToUser="";
    var itemId = txtProjectID;//titanForWork.getQueryStringParameter("ProjectID");
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items?$select=*,TeamMember/Title,TeamMember/EMail,TeamMember/UserName&$expand=TeamMember&$top=5000&$Filter=Id eq '" + currentItemId + "'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            $("#MemberStatus").prop("disabled", false);
            $("#add-team-modal").modal("show");
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                var TeamMemberId = items[i].TeamMemberId;
                if (TeamMemberId != null && TeamMemberId != "") {
                    //$("#ProjectTeamMemmers").val(TeamMemberId);
                    MyGoupUserIdArray.push(TeamMemberId);
                    assignToUser.push(items[i].TeamMember.EMail);
                    //  assignToUser = items[i].TeamMember.UserName;
                    $("#selectedUserName").text(items[i].TeamMember.Title);
                }

                OnTeamMemberSelection(TeamMemberId, false);

                var RoleName = items[i].Role;
                if (RoleName != null && RoleName != "") {
                    $("#MemberRole").val(RoleName);
                }

                var Status = items[i].Status;
                if (Status != null && Status != "") {


                    $("#MemberStatus").val(Status);
                }

                if (Status != "Active") {
                    $("#divReleasedDate").show();
                    EnableDisableControl(true);
                }
                else {
                    $("#divReleasedDate").hide();
                    EnableDisableControl(false);
                }

                var EngageDate = items[i].EngageDate;

                if (EngageDate != null && EngageDate != "") {
                    EngageDate = new Date(items[i].EngageDate);
                    EngageDate = $.datepicker.formatDate('dd/mm/yy', EngageDate);
                    $("#EngageDate").val(EngageDate);
                }

                var ExpectedReleseDate = items[i].ExpectedReleseDate;

                if (ExpectedReleseDate != null && ExpectedReleseDate != "") {
                    ExpectedReleseDate = new Date(items[i].ExpectedReleseDate);
                    ExpectedReleseDate = $.datepicker.formatDate('dd/mm/yy', ExpectedReleseDate);
                    $("#ExpectedReleaseDate").val(ExpectedReleseDate);
                }

                var ReleseDate = items[i].ReleseDate;

                if (ReleseDate != null && ReleseDate != "") {
                    ReleseDate = new Date(ReleseDate);
                    ReleseDate = $.datepicker.formatDate('dd/mm/yy', ReleseDate);
                    $("#ReleaseDate").val(ReleseDate);
                }

                var TeamPermission = items[i].TeamPermission;
                if (TeamPermission == true) {
                    TeamPermission = "checked";
                    $('#ManageTeams').prop('checked', true);
                }
                else {
                    $('#ManageTeams').prop('checked', false);
                }

                var DocumentPermission = items[i].DocumentPermission;

                if (DocumentPermission == true) {
                    DocumentPermission = "checked";
                    $('#ManageDocuments').prop('checked', true);
                }
                else {
                    $('#ManageDocuments').prop('checked', false);
                }

                var TaskPermission = items[i].TaskPermission;

                if (TaskPermission == true) {
                    TaskPermission = "checked";
                    $('#ManageTasks').prop('checked', true);
                }
                else {
                    $('#ManageTasks').prop('checked', false);
                }
            }
            $("#ProjectTeamMemmers").prop("disabled", true);

        }, eror: function (data) {
            console.log('error');
        }
    });
}

//Enable and disable control accrding to ADD/EDIT popup
function EnableDisableControl(flagEnableDisable) {
    $("#ProjectTeamMemmers").prop("disabled", flagEnableDisable);
    $("#MemberRole").prop("disabled", flagEnableDisable);
    $("#MemberStatus").prop("disabled", flagEnableDisable);
    $("#EngageDate").prop("disabled", flagEnableDisable);
    $("#ExpectedReleaseDate").prop("disabled", flagEnableDisable);
    $("#ReleaseDate").prop("disabled", flagEnableDisable);
    $("#ManageTeams").prop("disabled", flagEnableDisable);
    if (currentUserHaveDocumentPermission == true) {
        $("#ManageDocuments").prop("disabled", flagEnableDisable);
    }
    else {
        $("#ManageDocuments").prop("disabled", true);
    }
    $("#ManageTasks").prop("disabled", flagEnableDisable);
    if (flagEnableDisable == true) {
        $("#btnupdate").hide();
    }
    else {
        if (currentUserTeamPermission == true) {
            $("#btnupdate").show();
        }
        else {
            $("#btnupdate").hide();
        }
    }

}

//Reset all control in popup
function ResetAllControls() {
    EmptyPeoplePicker("AssaginTaskTeam");
    $("#ProjectTeamMemmers").val(0);
    $("#MySharedGroup").val(0);
    $("#groupUserLists1").text("");
    $("#MemberStatus").val('Active');
    $("#MemberRole").val('');
    var Status = $("#MemberStatus").val();
    if (Status != "Active") {
        $("#divReleasedDate").show();
    }
    else {
        $("#divReleasedDate").hide();
    }
    var standardDateFormatt = new Date(ConvertddmmyyTommddyy(projectStartDateValidation));
    var todaysDate = new Date();

    if (standardDateFormatt > todaysDate) {
        $("#EngageDate").val(projectStartDateValidation);
    }
    else {
        todaysDate = $.datepicker.formatDate('dd/mm/yy', todaysDate);
        $("#EngageDate").val(todaysDate);
    }

    $("#ExpectedReleaseDate").val('');
    $("#ReleaseDate").val('');
    $("#ManageTeams").prop("checked", false);
    $("#ManageDocuments").prop("checked", false);
    $("#ManageTasks").prop("checked", false);
}

//Team Member - Employee people picker change method
function PeoplePickerChangeEmp() {
    assignUserName = [];
    EmpIds = [];
    multipleEmailAddress = [];
    var user = '',
    	tempUserId = '',
		picker = SPClientPeoplePicker.SPClientPeoplePickerDict["AssaginTaskTeam_TopSpan"];
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        user = '';
        if (userInfo.length > 0) {
            tempUserId = parseInt(getUserInformationTeam('AssaginTaskTeam', multipleEmailAddress, assignUserName));
            EmpIds.push(tempUserId);
            var tempEmail = userInfo[0].Key.split('|')[2];
            if (tempEmail.includes('#') == true) {
                tempEmail = tempEmail.split('#ext')[0];
                tempEmail = tempEmail.replace("_", '@');
            }

            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
            user += '<div class="col-sm-6 parentremove"><div class="employeesection"><span class="crosebox" onclick="removeUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');"><i class="fa fa-times"></i></span>';
            user += '<div class="empoyeeimg"><img src="' + attachment + '"></div>';
            user += '<div class="employeeinfo"><h3>' + userInfo[0].DisplayText + '</h3><span onclick="OpenEmail(\'' + tempEmail + '\');">' + tempEmail + '</span></div></div></div>';
            $("#userHTMLBox").append(user);
            EmptyPeoplePicker("AssaginTaskTeam");
        }
        else {
            //$("#userList").hide();
        }
    };
}

//function remove user details box
function removeUser(Action, userEmail, UserName, UserId) {
    $(Action).parents('.parentremove').remove();
    multipleEmailAddress = multipleEmailAddress.filter(function (obj) {
        return obj.toLowerCase() !== userEmail.toLowerCase();
    });
    assignUserName = assignUserName.filter(function (obj) {
        return obj.toLowerCase() !== UserName.toLowerCase();
    });
    EmpIds = EmpIds.filter(function (obj) {
        return obj != UserId;
    });
    if (multipleEmailAddress.length == 0) {
        $(".userBox").hide();
    }
}

//get project Name 
function SelectProjectName(ProjectName, ProjectID) {
    $("#userHTMLBox").empty();
    assignUserName = [];
    EmpIds = [];
    multipleEmailAddress = [];
    var user = '';
    var Query = "?$select=Id,Project/Id,TeamMember/EMail,TeamMember/Title,TeamMember/Id,Status&$top=5000&$expand=Project,TeamMember&$filter=Project/Id eq '" + ProjectID + "' ";
    $.when(getLimitedItems('ProjectTeamDetails', Query)).done(function (TeamResult) {
        if (TeamResult.length > 0) {
            for (var i = 0; i < TeamResult.length; i++) {

                var tempEmail = TeamResult[i].TeamMember.EMail;
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#ext')[0];
                    tempEmail = tempEmail.replace("_", '@');
                }
                multipleEmailAddress.push(tempEmail);
                EmpIds.push(TeamResult[i].TeamMember.Id);
                assignUserName.push(TeamResult[i].TeamMember.Title);

                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                user += '<div class="col-sm-6 parentremove"><div class="employeesection"><span class="crosebox" onclick="removeUser(this, \'' + tempEmail + '\', \'' + TeamResult[i].TeamMember.Title + '\', ' + TeamResult[i].TeamMember.Id + ');"><i class="fa fa-times"></i></span>';
                user += '<div class="empoyeeimg"><img src="' + attachment + '"></div>';
                user += '<div class="employeeinfo"><h3>' + TeamResult[i].TeamMember.Title + '</h3><span onclick="OpenEmail(\'' + tempEmail + '\');">' + tempEmail + '</span></div></div></div>';
            }
            $("#userHTMLBox").append(user);
        }
    });

    $("#userList").show();
    $("#btnProjectName").text(ProjectName);
}

//bind projects
function loadProjects() {
    var tableItemsHTML = "",
    	Query = "?$select=Id,ProjectName,DepartmentName,ClientID/Title,ManagerName/EMail&$top=5000&$expand=ClientID,ManagerName&$filter=ManagerName/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $("#AllProjectsList").empty();
    $.when(getLimitedItems('ProjectDetails', Query)).done(function (ProjectResults) {
        if (ProjectResults.length > 0) {
            for (var i = 0; i < ProjectResults.length; i++) {
                //tableItemsHTML += '<li onclick="SelectProjectName(\'' + ProjectResults[i].ProjectName + '\', ' + ProjectResults[i].Id + ');"><div class="teaminfos"><h3>' + ProjectResults[i].ProjectName + '</h3><span>' + ProjectResults[i].ClientID.Title + '</span> |';
                //tableItemsHTML += '<span>' + ProjectResults[i].DepartmentName + '</span></div></li>';
                tableItemsHTML += '<li onclick="SelectProjectName(\'' + ProjectResults[i].ProjectName + '\', ' + ProjectResults[i].Id + ');"><div class="teaminfos"><h3>' + ProjectResults[i].ProjectName + '</h3></div></li>';
            }
            $("#AllProjectsList").append(tableItemsHTML);
        }
        else {
            tableItemsHTML += '<li><div class="teaminfos"><h3>No project found.</h3></div></li>';
            $("#AllProjectsList").append(tableItemsHTML);
        }
    });
}

//get list-items from list upto 5000 only
function getLimitedItems(ListName, Query) {
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
            DeferredObj.resolve(data.d.results);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};






function UpdateEmployeeData(currentItemId) {
    var userCollection = [];
    userAssign = [];
    //var multipleEmailAddress = [];
    //var assignUserName = [];
    var arrAddedEmp = [];
    var arrInactiveEmps = [];
    var AlreadyAssignUser = "";
    var InactiveUser = '';
    //userAssign='';
    var groupsel = $("#drpuser").val();
    if (groupsel == "User") {
        if ($("#ProjectTeamMemmers").val() != 0) {
            userCollection.push($("#ProjectTeamMemmers").val());
            userAssign.push($('#ProjectTeamMemmers option:selected').attr('title'));
        }
        else {
            alert("Please enter team members.");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return false;
        }

    }
    else if (groupsel == "Group" || groupsel == null || groupsel == "0") {
        InactiveUser = ''; arrInactiveEmps = [];
        if ($("#btnsubmit").is(":visible") == true) {
            if ($('#MySharedGroup').val() != 0) {
                userCollection = MyGoupUserIdArray;
                userAssign = assignToUser;
            }
            else {
                alert("Please select Team Member/Group");
                if (currentDlg != "") {
                    currentDlg.close();
                }
                return false;
            }
        }
        else {
            userCollection = MyGoupUserIdArray;
            userAssign = assignToUser;
        }
        if ($("#MemberStatus").val() != "Released") {
            for (var k = 0; k < assignToUser.length; k++) {
                if (IsUserActive(assignToUser[k]) != true) {
                    arrInactiveEmps.push({
                        AddedUser: selectedgroupUserName[k],
                        AddedUserId: MyGoupUserIdArray[k]
                    });
                    InactiveUser += selectedgroupUserName[k] + ", "
                }
            }
        }

    }
    else if (currentItemId != "" && groupsel == "Employee") {
        userCollection = MyGoupUserIdArray;
        userAssign = assignToUser;
    }
    else if ($("#btnsubmit").is(":visible") && groupsel == "Employee") {
        userCollection = getUserInformationTeam('AssaginTaskTeam', multipleEmailAddress, assignUserName);
        userAssign = multipleEmailAddress;

        if (userCollection == undefined || userCollection == "") {
            userCollection = null;
            alert("Please enter team members.");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return false;
        }
        else {
            arrAddedEmp = [];
            AlreadyAssignUser = "";
            InactiveUser = ''; arrInactiveEmps = [];
            AdminWarning = false;
            activeusers = "";
            if ($("#MemberStatus").val() != "Released") {
                for (var k = 0; k < userCollection.length; k++) {
                    if (IsUserActive(multipleEmailAddress[k]) == true) {
                        Result = OnTeamMemberSelection(userCollection[k], true, "NoPopup");
                        if (Result != "") {
                            arrAddedEmp.push({
                                AddedUser: Result,
                                AddedUserId: userCollection[k]
                            });
                            AlreadyAssignUser += Result + ", "
                        }
                    }
                    else {
                        arrInactiveEmps.push({
                            AddedUser: assignUserName[k],
                            AddedUserId: userCollection[k]
                        });
                        InactiveUser += assignUserName[k] + ", "
                    }
                }
            }
            if (AdminWarning == true) {
                alert(activeusers + "Team Member is already in active mode");
                if (currentDlg != "") {
                    currentDlg.close();
                }
                return false;
            }
        }
    }
    else if ($("#btnsubmit").is(":visible") && groupsel == "GuestUsers") {
        userCollection = getUserInformationTeam('AssaginTaskTeam', multipleEmailAddress, assignUserName);
        userAssign = multipleEmailAddress;

        if (userCollection == undefined || userCollection == "") {
            userCollection = null;
            alert("Please Enter External User.");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return false;
        } else {
            arrAddedEmp = [];
            AlreadyAssignUser = "";
            InactiveUser = ''; arrInactiveEmps = [];
            AdminWarning = false;
            activeusers = "";
            if ($("#MemberStatus").val() != "Released") {
                for (var k = 0; k < userCollection.length; k++) {
                    if (IsGuestUserActive(multipleEmailAddress[k]) == true) {
                        Result = OnTeamMemberSelection(userCollection[k], true, "NoPopup");
                        if (Result != "") {
                            arrAddedEmp.push({
                                AddedUser: Result,
                                AddedUserId: userCollection[k]
                            });
                            AlreadyAssignUser += Result + ", "
                        }
                    }
                    else {
                        arrInactiveEmps.push({
                            AddedUser: assignUserName[k],
                            AddedUserId: userCollection[k]
                        });
                        InactiveUser += assignUserName[k] + ", "
                    }
                }
            }
            AdminWarning = false;
            activeusers = "";
        }
    }

    for (user = 0; user < arrAddedEmp.length; user++) {
        removeItemAll(userCollection, arrAddedEmp[user].AddedUserId);
    }
    for (user = 0; user < arrInactiveEmps.length; user++) {
        removeItemAll(userCollection, arrInactiveEmps[user].AddedUserId);
    }
    var txtCompanyId = Logged_CompanyId;//titanForWork.getQueryStringParameter("CompanyId");
    var ProjectName = titanForWork.getQueryStringParameter("ProjectName");
    var projectID = txtProjectID;//titanForWork.getQueryStringParameter("ProjectID");
    var fullName = userCollection;
    var role = $("#MemberRole").val().trim();
    var memberststus = $("#MemberStatus").val();
    var dob = $("#EngageDate").val();
    var doa = $("#ExpectedReleaseDate").val();
    var doj = $("#ReleaseDate").val();
    var TeamPermission = $("#ManageTeams").prop("checked");
    var DocumentPermission = $("#ManageDocuments").prop("checked");
    var TaskPermission = $("#ManageTasks").prop("checked");
    var engageDate = "";
    if (dob != null && dob != "") {
        engageDate = GetDateStandardFormat(dob);
    }
    var expectedReleseDate = "";
    if (doa != null && doa != "") {
        expectedReleseDate = GetDateStandardFormat(doa);
    }
    else {
        expectedReleseDate = null;
    }
    var releseDate = "";
    if (doj != null && doj != "") {
        releseDate = GetDateStandardFormat(doj);
    }
    else {
        releseDate = null;
    }

    if (expectedReleseDate != null) {
        if (expectedReleseDate < engageDate) {
            alert("Expected release date can't be less than the engaged date !");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return;
        }
    }
    if (memberststus != "Active") {
        if (releseDate == null) {
            alert("Please enter release date !");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return;
        }
        if (releseDate < engageDate) {
            alert("Release date can't be less than the engaged date!");
            if (currentDlg != "") {
                currentDlg.close();
            }
            return;
        }
    }
    if (role != '' && fullName.length != 0) {
        for (var i = 0; i < userCollection.length; i++) {
            if (currentItemId == "") {
                $("#AddUpdateModal").modal("hide");
                AddNewEmployee("ProjectTeamDetails", userCollection[i], role, memberststus, engageDate, expectedReleseDate, releseDate, parseInt(projectID), TeamPermission, DocumentPermission, TaskPermission, txtCompanyId);
                // GetProjectForTeamDetails()
                if (i == (userCollection.length - 1)) {
                    $("#drpuser").val('0');
                    $("#MemberRole").val('');
                    $("#MemberStatus").val('Active');
                    $("#ExpectedReleaseDate").val('');
                    $("#ManageTeams").prop("checked", false);
                    $("#ManageDocuments").prop("checked", false);
                    $("#ManageTasks").prop("checked", false);
                    $("#groupselection1").hide();
                    $("#add-team-modal").modal("hide");
                    if (currentDlg != "") {
                        currentDlg.close();
                    }
                    GetAllTeamMemberDetailsByProjectId();
                    alert("Team member(s) has been added successfully.");
                }
            }
            else {
                var ItemId = currentItemId;
                updateTeamMemberDetails("ProjectTeamDetails", userCollection[i], role, memberststus, engageDate, expectedReleseDate, releseDate, parseInt(projectID), ItemId, TeamPermission, DocumentPermission, TaskPermission, txtCompanyId);
                if (i == (userCollection.length - 1)) {
                    $("#AddUpdateModal").modal("hide");
                    alert("Item updated successfully !");
                }
            }
        }
    }
    else {
        if (role == "") {
            alert("Please fill all required fields.");
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    }
    if (AlreadyAssignUser != "") {
        alert(AlreadyAssignUser.substring(0, AlreadyAssignUser.length - 2) + " team member(s) are already in active mode. Please select other team member!");
        if (currentDlg != "") {
            currentDlg.close();
        }
    }
    if (InactiveUser != "") {
        alert(InactiveUser.substring(0, InactiveUser.length - 2) + " team member(s) are not valid!");
        if (currentDlg != "") {
            currentDlg.close();
        }
    }
    if (currentDlg != "") {
        currentDlg.close();
    }
}


function OpenEmail(Email) {
    var dlgTitle = 'Loading...';
    var dlgMsg = '<br />Please wait!!';
    var dlgHeight = 200;
    var dlgWidth = 400;
    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
    setTimeout(function () {
        window.location = "mailto:" + Email;
        currentDlg.close();
    }, 100);
}


//get all Active Team members list
function getActiveTeamMamber() {
    var itemId = txtProjectID; //titanForWork.getQueryStringParameter("ProjectID");
    ExisitngTeamMemberArray = [];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items?&$select=Id&$Filter=ProjectId eq '" + itemId + "' and Status eq 'Active' and TeamMemberId eq '"+_spPageContextInfo.userId+"'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var results = data.d.results;
            if(results.length>0){
             $('#divAdvanceSearch').show();
            
            }
            else
            {
              $('#divAdvanceSearch').hide();
            }
            
        }, eror: function (data) {
            console.log('error');
        }
    });
}