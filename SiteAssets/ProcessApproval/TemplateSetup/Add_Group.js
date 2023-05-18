$(document).ready(function(){
  $("#btnAddNewGroup").click(function() {
  var title=$("#txtGrpName").val();
  	let result = grpDuplicate.filter(obj => {
					if(obj.Title!=null){
				  		return obj.Title.toLowerCase()=== title.toLowerCase();
				  	}
				})
	if(result.length>0){alert("Duplicate group name!");return false;}			
	if ($.trim($("#txtGrpName").val()) != "") {
			addGroup('Add');
			GetGroupUsersGroups('Add',1);
	}else{
        alert("Kindly enter group name.");
        return false;
    }
			
});

});
function addGroup(commandTYpe) {
    if ($.trim($("#txtGrpName").val()) != "") {
        var Metadata;
        var ItemType = GetItemTypeForListNameDetails('ApproversGroups');
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Title: $("#txtGrpName").val(),
            //LogonUserId: _spPageContextInfo.userId
        };
        if (commandTYpe == "Add") {
            AddItemToListGroups('ApproversGroups', Metadata);
            alert('New group is created');
            $("#txtGrpName").val('');
        } else {
            updateUserWithIDGroup('ApproversGroups', Metadata, itemIdToUpdate, [], '');
        }
    }

}

function GetItemTypeForListNameDetails(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
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

function updateUserWithIDGroup(ListName, Metadata, ID, arrInvalidUsers, groupIndex) {

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
            updateSpecificGroup(groupIndex);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
function getSelectedUsers(groupIndex) {
    var UpdateId = $(".itemIDClass" + groupIndex).text();
    var arrSavedUsersId = [];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApproversGroups')/items?$select=ID,Approvers/ID,Approvers/Title,Approvers/EMail,Title&$expand=Approvers&$orderby=ID asc&$filter=ID eq '" + UpdateId + "'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            var response = data;
            if (response.d.results[0].Approvers.results != null) {
                for (var subGrroupIndex = 0; subGrroupIndex < response.d.results[0].Approvers.results.length; subGrroupIndex++) {
                    arrSavedUsersId.push(response.d.results[0].Approvers.results[subGrroupIndex].ID);
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
                UpdateGpMember(groupIndex, arrSavedUsersId, groupIndex);
            }, 100);
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
}
var arrUsers=[];
var grpDuplicate=[];
function GetGroupUsersGroups(Action, groupCount) {
    var attachmentUrl = '';arrUsers=[];
    $('#accordGroup').html('');
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApproversGroups')/items?$select=ID,Approvers/ID,Approvers/Title,Approvers/EMail,Title&$expand=Approvers&$orderby=ID asc";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            var response = data;
            grpDuplicate=response.d.results;
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
                arrUsers.push({"ID": groupIndex, "Users": response.d.results[groupIndex].Approvers.results});
                console.log(arrUsers);
                var groupName = response.d.results[groupIndex].Title;
                //$('.groupName' + groupIndex).val(groupName);
                var currentItemID = response.d.results[groupIndex].ID;
                //$('.itemIDClass' + groupIndex).text(currentItemID);
                var defaultRows = '';
                defaultRows += '<div class="panel panel-default addGrpUser"><div class="panel-heading custom-panel-heading"><h4 class="panel-title">';
                defaultRows += '<a class="panel-title-box collapsed" id="GroupId' + groupIndex + '" onclick="hidePeoplePickers(' + groupIndex + ')" data-toggle="collapse" data-parent="#accordGroup" href="#group' + groupIndex + '" aria-expanded="false">';
                defaultRows += '<label style="display:none;" class="itemIDClass' + groupIndex + '">' + currentItemID + '</label><span class="groupName0" style="color: black;">' + groupName + '</span><div class="remove-group-btn-box"><button type="button" class="remove_groupsec" onclick="DeleteGroup(' + currentItemID + ', \'' + groupName + '\');"><i class="fa fa-trash-o"></i></button></div><i class="fa fa-chevron-down"></i></a></h4></div>';
                defaultRows += '<div id="group' + groupIndex + '" class="panel-collapse collapse" aria-expanded="false"><div class="panel-body"><div class="row group-inner-scroll scrollbar-panel" id="idForUpdate' + groupIndex + '">';
                /*if (response.d.results[groupIndex].Approvers.results != null) {
                    for (var subGrroupIndex = 0; subGrroupIndex < response.d.results[groupIndex].Approvers.results.length; subGrroupIndex++) {
                        var userNamecurretn = response.d.results[groupIndex].Approvers.results[subGrroupIndex].EMail;
                        var GroupUserId = response.d.results[groupIndex].Approvers.results[subGrroupIndex].ID;
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
                                    defaultRows += '<div class="col-md-4 col-sm-6 col-xs-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LogonName.FirstName + ' ' + value.LogonName.LastName + '</h3>';
                                    defaultRows += '<p class="member-deg text-ellipsis"><span>' + value.Designation + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>' + value.Department.Title + '</span></p>';
                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
                                    defaultRows += '<div class="text-right" onclick="DeleteUserFromGrp(' + GroupUserId + ', ' + groupIndex + ');"><button type="button" class="btn remove-group-btn remove-btn close close-round"><i class="fa fa-times" aria-hidden="true"></i></button></div>';
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
		                                    defaultRows += '<div class="col-md-4 col-sm-6 col-xs-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
		                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LoginName.Title+ ' </h3>';
		                                    defaultRows += '<p class="member-deg text-ellipsis"><span>' + value.Designation + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>' + value.Client_Name.Title + '</span></p>';
		                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
		                                    defaultRows += '<div class="text-right" onclick="DeleteUserFromGrp(' + GroupUserId + ', ' + groupIndex + ');"><button type="button" class="btn remove-group-btn remove-btn close close-round"><i class="fa fa-times" aria-hidden="true"></i></button></div>';
		                                    defaultRows += '</div></div></div>'; // class - row group-inner-scroll scrollbar-panel ends here
		
		                                }
		                            });
                                }
                            });
                            //setPeoplePickerUsersInfoCurrentGroups("newPeoplePickerControl" + groupIndex, response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].UserName);
                        }
                    }
                }*///For loop
                //Add/Delete memeber to Group
                defaultRows += '</div><div class="row overflow_sec"><div class="col-xs-12"><div class="add-menber-dropdown">';
                defaultRows += '<div class="addeventcircle"> <button class="btn custom-btn tottglinbtn'+groupIndex+'" type="button" onclick="toggleClass(this ,'+groupIndex+');"> <i class="fa fa-plus tottglinbtn'+groupIndex+'" ></i> </button><span id="newPeoplePickerControl'+groupIndex+'" class="form-control increase_effect increase_effect'+groupIndex+'"></span>  </div>';

                //defaultRows += '<button type="button" class="btn custom-btn" onclick="openAddMemberPopup(' + groupIndex + ')" data-toggle="dropdown">Add</button><ul id = AddMemberPopup' + groupIndex + ' class="add-menber-menu" style="display:none;">';
                //defaultRows += '<li><div class="form-group custom-form-group" onchange="getSelectedUsers(' + groupIndex + ')"><span id="newPeoplePickerControl' + groupIndex + '" ></span></div></li>';
                //defaultRows += '<li class="text-center"><button type="button" class="btn custom-btn" id="addMember' + groupIndex + '" >Submit</button></li></ul></div>';
               // defaultRows += '</div></div>';
                defaultRows += '</div></div></div>';
                $('#accordGroup').append(defaultRows);
                var PeoplePickerId = "newPeoplePickerControl" + groupIndex;
                var addCls=PeoplePickerId+"_TopSpan_NotificationSpan";
                 
                SetPeoplePicker_MultiselectGroups1(PeoplePickerId, true);$("#"+addCls).addClass("suggestion_span");
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
            //currentDlg.close();
            console.log(JSON.stringify(data));
        }
    });
}

function DeleteGroup(currentGroupItemId, groupName) {
    if (confirm("Do you want to delete the '" + groupName + "' group?")) {
        var dfd = $.Deferred();

        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApproversGroups')/items(" + currentGroupItemId + ")",
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
                    GetGroupUsersGroups('', '');
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


function DeleteUserFromGrp(GroupUserId, GroupIdCount) {
	if (confirm("Do you want to delete this user?")) {
	    var UpdateId = $(".itemIDClass" + GroupIdCount).text();
	    var arrSavedUsersId = [];
	    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApproversGroups')/items?$select=ID,Approvers/ID,Approvers/Title,Approvers/EMail,Title&$expand=Approvers&$orderby=ID asc&$filter=ID eq '" + UpdateId + "'";
	    $.ajax({
	        url: Ownurl,
	        method: "GET",
	        headers: {
	            "Accept": "application/json; odata=verbose"
	        },
	        async: false,
	        success: function (data) {
	            var response = data;
	            if (response.d.results[0].Approvers.results != null) {
	                for (var subGrroupIndex = 0; subGrroupIndex < response.d.results[0].Approvers.results.length; subGrroupIndex++) {
	                    arrSavedUsersId.push(response.d.results[0].Approvers.results[subGrroupIndex].ID);
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
	                UpdateGpMember(GroupIdCount, arrSavedUsersId, GroupIdCount);
	            }, 100);
	
	        },
	        error: function (data) {
	            console.log(JSON.stringify(data));
	        }
	    });
	}
}

function UpdateGpMember(groupIndex, arrSavedUsersId, groupIndex) {
    var UpdateId = $(".itemIDClass" + groupIndex).text();
    var sharedUserArrayList = [];
    var arrInvalidUsers = [];
    var InvalidUsersId = [];
    sharedUserArrayList = getPeopleUserMyGroup("newPeoplePickerControl" + groupIndex);
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
                    }	$('.increase_effect').removeClass("activingss");

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
    var ItemType = GetItemTypeForListNameDetails('ApproversGroups');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        ApproversId: {
            'results': arrSavedUsersId
        }
    };
    updateUserWithIDGroup('ApproversGroups', Metadata, UpdateId, arrInvalidUsers, groupIndex);
    var PeoplePickerId = "newPeoplePickerControl" + groupIndex;
    resetPeoplePicker(PeoplePickerId);

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

var DynamicId='';
var grpIndex='';
var flag1=true;
function toggleClass(getclass,cname){
	DynamicId="newPeoplePickerControl"+cname+"_TopSpan";
	grpIndex=cname;
	
	$(".tottglinbtn"+cname).toggleClass('activingss');
	//$(".increase_effect").removeClass('activingss');
	


    $('.increase_effect'+cname).toggleClass('activingss');
    onChangeSharing1();
}

function onChangeSharing1() {
//	if(DynamicId==""){return false;}
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[DynamicId];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {    
        if (userInfo.length > 0) {getSelectedUsers(grpIndex);
		}
    };
}

function updateSpecificGroup(grpIndex) {
    var UpdateId = $(".itemIDClass" + grpIndex).text();
    var arrSavedUsersId = [];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApproversGroups')/items?$select=ID,Approvers/ID,Approvers/Title,Approvers/EMail,Title&$expand=Approvers&$orderby=ID asc&$filter=ID eq '" + UpdateId + "'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: true,
        success: function (data) {
                        var response = data;console.log(data);
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
                var groupName = response.d.results[groupIndex].Title;
                //$('.groupName' + groupIndex).val(groupName);
                var currentItemID = response.d.results[groupIndex].ID;
                //$('.itemIDClass' + groupIndex).text(currentItemID);
                var defaultRows = '';
                //defaultRows += '<div class="panel panel-default addGrpUser"><div class="panel-heading custom-panel-heading"><h4 class="panel-title">';
                //defaultRows += '<a class="panel-title-box collapsed" id="GroupId' + groupIndex + '" data-toggle="collapse" data-parent="#accordGroup" href="#group' + groupIndex + '" aria-expanded="false">';
                //defaultRows += '<label style="display:none;" class="itemIDClass' + groupIndex + '">' + currentItemID + '</label><span class="groupName0" style="color: black;">' + groupName + '</span><div class="remove-group-btn-box"><button type="button" class="remove_groupsec" onclick="DeleteGroup(' + currentItemID + ', \'' + groupName + '\');"><i class="fa fa-trash-o"></i></button></div><i class="fa fa-chevron-down"></i></a></h4></div>';
                if (response.d.results[groupIndex].Approvers.results != null) {
                    for (var subGrroupIndex = 0; subGrroupIndex < response.d.results[groupIndex].Approvers.results.length; subGrroupIndex++) {
                        var userNamecurretn = response.d.results[groupIndex].Approvers.results[subGrroupIndex].EMail;
                        var GroupUserId = response.d.results[groupIndex].Approvers.results[subGrroupIndex].ID;
                        if (userNamecurretn != null && userNamecurretn != "") {
                            //Group User Bind
                            var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,FullName,Designation,LogonName/EMail,LogonName/FirstName,LogonName/LastName,Company/Id,Company/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Company,Department&$top=5000&$filter=Status eq 'Active' and PrimaryCompany eq 'Primary' and LogonName/EMail eq '" + userNamecurretn + "' ";
                            $.when(getItemsWithQueryItems('Employees', Query)).done(function (UserResults) {
                                UResults = UserResults.results;
                                var value = UResults[0];
                                if (UResults.length > 0) {
                                    if (value.AttachmentFiles.results.length > 0) {
                                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
                                    }
                                    else {
                                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
                                    }
                                    defaultRows += '<div class="col-md-4 col-sm-6 col-xs-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LogonName.FirstName + ' ' + value.LogonName.LastName + '</h3>';
                                    defaultRows += '<p class="member-deg text-ellipsis"><span>' + value.Designation + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>' + value.Department.Title + '</span></p>';
                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
                                    defaultRows += '<div class="text-right" onclick="DeleteUserFromGrp(' + GroupUserId + ', ' + grpIndex+ ');"><button type="button" class="btn remove-group-btn remove-btn close close-round"><i class="fa fa-times" aria-hidden="true"></i></button></div>';
                                    defaultRows += '</div></div></div>'; // class - row group-inner-scroll scrollbar-panel ends here

                                }
                                else {
                                	//External Users
                                	var Query = "?$select=AttachmentFiles,LoginName/EMail,email,LoginName/Title,LoginName/Id,Designation,Client_Name/Title&$expand=AttachmentFiles,LoginName,Client_Name&$filter=email eq '" + userNamecurretn + "'&$top=5000";
		                            $.when(getItemsWithQueryItems('ExternalUsers', Query)).done(function (UserResults) {
		                                UResults = UserResults.results;
		                                var value = UResults[0];
		                                if (UResults.length > 0) {
		                                    if (value.AttachmentFiles.results.length > 0) {
		                                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
		                                    }
		                                    else {
		                                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.email);
		                                    }
		                                    defaultRows += '<div class="col-md-4 col-sm-6 col-xs-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
		                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LoginName.Title+ ' </h3>';
		                                    defaultRows += '<p class="member-deg text-ellipsis"><span>' + value.Designation + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>' + value.Client_Name.Title + '</span></p>';
		                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
		                                    defaultRows += '<div class="text-right" onclick="DeleteUserFromGrp(' + GroupUserId + ', ' + grpIndex+ ');"><button type="button" class="btn remove-group-btn remove-btn close close-round"><i class="fa fa-times" aria-hidden="true"></i></button></div>';
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
                defaultRows += '</div>';
                //<div class="row"><div class="col-xs-12"><div class="add-menber-dropdown">';
              //  defaultRows += '<div class="addeventcircle"> <button class="btn custom-btn tottglinbtn'+groupIndex+'" type="button" onclick="toggleClass(this ,'+groupIndex+');"> <i class="fa fa-plus tottglinbtn'+groupIndex+'" ></i> </button><span id="newPeoplePickerControl'+groupIndex+'" class="form-control increase_effect increase_effect'+groupIndex+'"></span>  </div>';

                //defaultRows += '<button type="button" class="btn custom-btn" onclick="openAddMemberPopup(' + groupIndex + ')" data-toggle="dropdown">Add</button><ul id = AddMemberPopup' + groupIndex + ' class="add-menber-menu" style="display:none;">';
                //defaultRows += '<li><div class="form-group custom-form-group" onchange="getSelectedUsers(' + groupIndex + ')"><span id="newPeoplePickerControl' + groupIndex + '" ></span></div></li>';
                //defaultRows += '<li class="text-center"><button type="button" class="btn custom-btn" id="addMember' + groupIndex + '" >Submit</button></li></ul></div>';
               // defaultRows += '</div></div>';
                $('#idForUpdate'+grpIndex).html(defaultRows);
                var PeoplePickerId = "newPeoplePickerControl" + groupIndex;
               // SetPeoplePicker_MultiselectGroups1(PeoplePickerId, true);
               
               
            }
        //    resetPeoplePicker(PeoplePickerId);
            if (currentDlg != "") {
                currentDlg.close();
            }
                   },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
}
function resetPeoplePicker(peoplePickerId) {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
    var usersobject = peoplePicker.GetAllUserInfo();
    usersobject.forEach(function (index) {
        peoplePicker.DeleteProcessedUser(usersobject[index]);
    });
}
function hidePeoplePickers(groupIndex){
	$('.increase_effect').removeClass("activingss");
	console.log();
	var htmlCount=$('#idForUpdate'+groupIndex).html().length;
	if(htmlCount>0){return false;}
	var defaultRows = '';
	var filtered = arrUsers.filter(function(x) { return x.ID==groupIndex; });
	if(filtered[0].Users!= undefined){
                    for (var subGrroupIndex = 0; subGrroupIndex < filtered[0].Users.length; subGrroupIndex++) {
                        var userNamecurretn = filtered[0].Users[subGrroupIndex].EMail;
                        var GroupUserId = filtered[0].Users[subGrroupIndex].ID;
                        if (userNamecurretn != null && userNamecurretn != "") {
                            //Group User Bind
                            var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,FullName,Designation,LogonName/EMail,LogonName/FirstName,LogonName/LastName,Company/Id,Company/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Company,Department&$top=5000&$filter=Status eq 'Active' and PrimaryCompany eq 'Primary' and LogonName/EMail eq '" + userNamecurretn + "' ";
                            $.when(getItemsWithQueryItems('Employees', Query)).done(function (UserResults) {
                                UResults = UserResults.results;
                                var value = UResults[0];
                                if (UResults.length > 0) {
                                    if (value.AttachmentFiles.results.length > 0) {
                                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
                                    }
                                    else {
                                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
                                    }
                                    defaultRows += '<div class="col-md-4 col-sm-6 col-xs-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LogonName.FirstName + ' ' + value.LogonName.LastName + '</h3>';
                                    defaultRows += '<p class="member-deg text-ellipsis"><span>' + value.Designation + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>' + value.Department.Title + '</span></p>';
                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
                                    defaultRows += '<div class="text-right" onclick="DeleteUserFromGrp(' + GroupUserId + ', ' + groupIndex + ');"><button type="button" class="btn remove-group-btn remove-btn close close-round"><i class="fa fa-times" aria-hidden="true"></i></button></div>';
                                    defaultRows += '</div></div></div>'; // class - row group-inner-scroll scrollbar-panel ends here

                                }
                                else {
                                	//External Users
                                	var Query = "?$select=AttachmentFiles,LoginName/EMail,email,LoginName/Title,LoginName/Id,Designation,Client_Name/Title&$expand=AttachmentFiles,LoginName,Client_Name&$filter=email eq '" + userNamecurretn + "'&$top=5000";
		                            $.when(getItemsWithQueryItems('ExternalUsers', Query)).done(function (UserResults) {
		                                UResults = UserResults.results;
		                                var value = UResults[0];
		                                if (UResults.length > 0) {
		                                    if (value.AttachmentFiles.results.length > 0) {
		                                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
		                                    }
		                                    else {
		                                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.email);
		                                    }
		                                    defaultRows += '<div class="col-md-4 col-sm-6 col-xs-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
		                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LoginName.Title+ ' </h3>';
		                                    defaultRows += '<p class="member-deg text-ellipsis"><span>' + value.Designation + '</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>' + value.Client_Name.Title + '</span></p>';
		                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
		                                    defaultRows += '<div class="text-right" onclick="DeleteUserFromGrp(' + GroupUserId + ', ' + groupIndex + ');"><button type="button" class="btn remove-group-btn remove-btn close close-round"><i class="fa fa-times" aria-hidden="true"></i></button></div>';
		                                    defaultRows += '</div></div></div>'; // class - row group-inner-scroll scrollbar-panel ends here
		
		                                }
		                            });
                                }
                            });
                            //setPeoplePickerUsersInfoCurrentGroups("newPeoplePickerControl" + groupIndex, response.d.results[groupIndex].SharedUsers.results[subGrroupIndex].UserName);
                        }
                    }
          }          
                    $('#idForUpdate'+groupIndex).html(defaultRows);
                
}

function getPeopleUserMyGroup(pickerPickerControlId) {
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
                sharedUserArrayList.push(GetUserIdGroup(users[i].Key));
                SharedUserName.push(users[i].DisplayText);

            } else {
                var grpid = users[i].EntityData.SPGroupID;
                var myArrays = new Array();
                myArrays.push(siteuser(grpid));
                var c = sharedUserArrayList.concat.apply([], myArrays);
                sharedUserArrayList = sharedUserArrayList.concat(c);

            }
        }
    }
    return sharedUserArrayList;
}
function GetUserIdGroup(userName) {
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
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
    return userID;
}
function siteuser(grpid) {
    var usergroup = [];
    $.ajax({
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
function getItemsWithQueryItems (ListName, Query) {
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
            DeferredObj.resolve(data.d);
            //   console.log();
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};