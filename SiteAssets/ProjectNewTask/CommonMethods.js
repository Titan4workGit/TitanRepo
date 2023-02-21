var multipleEmailAddress = [];
var assignUserName = [];
var EmpIds = [];
var CopyLibrary = '';
var CopyDestURL = '';
var CopyFolderName = '';

$(document).ready(function () {
	$('#nextbtn').click(function (e) {
        if ($("#tbdyCopyFileLib input[type=radio]:checked").length == 1) {
            $("#txtPleaseWait").show();
            setTimeout(function () {
                $('.treesec').fadeIn();
                $("#TreeArea").fadeIn();
                $('#copyfilesnow').fadeOut();
                $('.hidesection').fadeOut();
                $('#nextbtn').hide();
                $('#Backbtn').show();
                $(".FolderCaption").show();
                var row = $("#tbdyCopyFileLib input[type=radio]:checked").closest("tr")[0];
                getTreeView(row);
                $(".treesec").filetree();
                $('.treesec li').each(function () {
                    if ($(this).children('ul').length > 0) {
                        $(this).addClass('parent');
                    }
                });
                $('.treesec li.DmsTree').on('click', function (e) {
                    $(this).jstree(true).toggle_node(e.target);

                });
                $('.treesec li.parent > a').click(function (e) {
                    e.preventDefault();
                    $(this).parent().toggleClass('closed').toggleClass('open');
                    $('.tree li.parent > a').removeClass('selected');
                    $(this).addClass('selected');

                });

                $('.treesec li').click(function (e) {
                    e.preventDefault();
                    $(this).parent(e.target).toggleClass('closed').toggleClass('open');

                });
            }, 100);

        } else {
            alert("Kindly select any library first.");
            return false;
        }
    });
    $('#Backbtn').click(function (e) {
        $('.treesec').fadeOut();
        $("#TreeArea").fadeOut();
        $('#copyfilesnow').fadeIn();
        $('.hidesection').fadeIn();
        $('#nextbtn').show();
        $('#btnSubmitLink').hide();
        //$("#btnSelect").hide();
        $('#Backbtn').hide();
        $(".FolderCaption").hide();
        //$(".treesec").show();
        $("#tblFiles").hide();
        CopyDestURL = '';
        CopyFolderName = '';
    });
    $('#btnSelect').click(function (e) {
    	getAllFiles();
	});
	$('#btnSubmitLink').click(function (e) {
		$("#Backbtn").trigger('click');
		$("#copymove").modal('hide');
		EditMode = IsEditMode;
	    if (EditMode != undefined) {
	        EditMode = window.atob(EditMode);
	    }
	    if($('.FolderFile:checked').val() != null && $('.FolderFile:checked').val() != ""){
		    if (EditMode != "" && EditMode != null) {
		    	$("#txtDocLinkEdit").attr('href', $('.FolderFile:checked').val());
		    	$("#txtDocLinkEdit").text($('.FolderFile:checked').parent().next('td').text());
	        }
	        else {
		    	$("#txtDocLink").val($('.FolderFile:checked').val());
	        }
	        $("#txtDocLinkEdit").prop('target', '_blank');
	        $("#txtDocLinkEdit").attr('data-toggle', "");
        	$("#txtDocLinkEdit").attr('data-target', "");
	    }
	    else {
	    	$("#txtDocLinkEdit").attr('href', "javascript:void(0)");
		    $("#txtDocLinkEdit").text("Select Document Link");
        	$("#txtDocLinkEdit").attr('data-toggle', "modal");
        	$("#txtDocLinkEdit").attr('data-target', "#copymove");
		    $("#txtDocLink").val('');
		    $("#txtDocLinkEdit").prop('target', '');
	    }
    });
});

// Render and initialize the client-side People Picker.//Priyanshu - 11-Feb-2021
function initializePeoplePicker_AssaginTaskTeam(peoplePickerElementId) {

    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '390';
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
    $(".sp-peoplepicker-editorInput").width(320);
}

// Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId) {

    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '390';
    // picker properties.
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

var response = response || [];
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

//get list-items from SP list and NextURL 
function getItemsWithQueryItem(ListName, Query, Action) {
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
            if (Action == "Project") {
                NextURLProject = data.d.__next;
            }
            else if(Action == "GeneralTask"){
                NextURLGeneral = data.d.__next;
            }
            else if(Action == "DeptTask"){
                NextUrlDept = data.d.__next;
            }
            else if(Action == "GuestTask"){
                NextUrlGuest = data.d.__next;
            }
            else if(Action == "GuestTeam"){
                NextURLGuestTeam = data.d.__next;
            }
            DeferredObj.resolve(data.d);
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
}


function removeLine(id, FileName) {
    var index = id.split('_')[1];
    $("#" + id).remove();
    finalFiles = finalFiles.filter(function( obj ) {
        return obj.name !== FileName;
    });

    RemoveDuplicate = [];
    var arr = finalFiles.filter(function (el) {
        if (RemoveDuplicate.indexOf(el.name) == -1) {
            RemoveDuplicate.push(el.name);
            return true;
        }
        return false;
    });
    FinalFiles4Upload = ReinitializeArray(arr);
    if(arr.length == 0) {
        $("#AttachmentUploadField").val('');
    }
}
function ReinitializeArray(arr) {
    var newArr = [];
    var count = 0;
    for(var i=0; i < arr.length; i++) {
        newArr[count++] = arr[i];
    }
    return newArr;
}


var getFileBuffer = function (FinalFiles4Upload) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }

    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(FinalFiles4Upload);
    return deferred.promise();
};


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
        success: function (data) {
            console.log("add success"); 
            var item = data.d;
            var ItemId = item.ID;
            if (FinalFiles4Upload.length > 0) {
                uploadCommentattachment(ItemId)
            }		 
        },
        error: function (data) { console.log(data); }
    });
}

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

function AddItemToDependenciesList(ListName, Metadata) {
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
            dfd.resolve(data);
            alert('Task Dependency submitted..!')
            $('#AddDependencies').modal('hide');
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

function UpdateDependencybytoList(ListName, Metadata, itemId) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + itemId+ "')",
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
            dfd.resolve(data);
            $('#AddDependencies').modal('hide');
            alert('Updated..!');           
        },
        error: function (error) {

            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

commonUpdateItemWithID = function (ListName, Metadata, ID) {
    var dfd = $.Deferred()
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl  + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + ID + "')",
        type: 'POST',
        async:false,
        headers: {
            'accept': 'application/json;odata=verbose',
            'X-RequestDigest': $("#__REQUESTDIGEST").val(),
            'content-Type': 'application/json;odata=verbose',
            'X-Http-Method': 'PATCH',
            'If-Match': '*'
        },
        data: JSON.stringify(Metadata),
        async: false,
        success: function (RESULT) {
            dfd.resolve(true)
        },
        error: function (error) {
            //alert(JSON.stringify(error))
            dfd.reject(error)
        }
    })
    
    return dfd.promise()
}

//empty the people picker
function EmptyPeoplePicker(peoplePickerId) {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
    var usersobject = peoplePicker.GetAllUserInfo();
    usersobject.forEach(function (index) {
        peoplePicker.DeleteProcessedUser(usersobject[index]);
    });
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
                var accountName = users[i].Key;
                multipleEmailAddress.push(users[i].EntityData.Email.toLowerCase());
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
//function remove user details box
function removeUserBox(Action, userEmail, UserName, UserId) {
    $(Action).parents('.col-md-6').remove();
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
        $(".peoplepickerbox").hide();
    }
}

//Document Link code.
//to bind the all the departments to which Logged_In user can access
function myShareDepartmentCopy() {
	var DocLibraries = '';
    var Query = "?$select=*,Department/DepartmentName,Department/ID&$top=5000&$expand=Department&$filter=(CompanyId eq '" + Logged_CompanyId + "' and ContributorsId eq '" + _spPageContextInfo.userId + "' and WebPartName eq 'DepartmentDocument_Access') or (CompanyId eq '" + Logged_CompanyId + "' and Owner eq '" + _spPageContextInfo.userId + "' and WebPartName eq 'Documents') ";
    $.when(getItemsWithQuery("ProcessApprovers", Query)).done(function (valuesArray) {
        DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" value=""></label></div></td>';
        DocLibraries += '<td class="text-left">My Documents</td><td class="text-left"></td></tr>';
        //Logged_In department
        var DeptURL = getDepartmentURL(Logged_DepartmentId);
        DeptURL = DeptURL + "/DepartmentalDMS/Forms/AllItems.aspx";
        DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkDepartments" value=""></label></div></td>';
        DocLibraries += '<td class="text-left">Department</td>';
        DocLibraries += '<td class="text-left"><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + DeptURL + '>' + Logged_DepartmentName + '</a></td></tr>';
        $.each(valuesArray, function (i, el) {
            var DeptURL = getDepartmentURL(el.Department.ID);
            DeptURL = DeptURL + "/DepartmentalDMS/Forms/AllItems.aspx";
            DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkProcessApprovers' + i + '" value=""></label></div></td>';
            DocLibraries += '<td class="text-left">Department</td>';
            DocLibraries += '<td class="text-left"><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + DeptURL + '>' + el.Department.DepartmentName + '</a></td></tr>';
        });
        $("#tbdyCopyFileLib").append(DocLibraries);
        BindProjectsCopy();
    });		
}

//to get dept URL 
function getDepartmentURL(ItemId) {
    var DeptDocumentsUrl = '';
    var restQueryPersonalDMS = "?$select=ID,SiteURL,CompanyID/ID&$expand=CompanyID&$top=5000&$filter=CompanyID/ID eq '" + Logged_CompanyId + "' and ID eq '" + ItemId + "'";
    $.when(getItemsWithQuery("Departments", restQueryPersonalDMS)).done(function (ProjectDetailData) {
        if (ProjectDetailData.length > 0) {
            var siteURL = ProjectDetailData[0].SiteURL;
            if (siteURL != null && siteURL != "") {
                DeptDocumentsUrl = siteURL;
            }
        }
    });
    return DeptDocumentsUrl;
}

//to bind the all the Project with DMS URL to which Logged_In user can access
function BindProjectsCopy() {
    var DocLibraries = '';
    var uniqueValues = [];
    var Query = "?$select=DocumentPermission,TeamMember/Id,Project/Id,Project/ProjectName&$top=5000&$orderby=Project/ProjectName asc&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and TeamMemberId eq '" + _spPageContextInfo.userId + "' and Status eq 'Active'";
    $.when(getItemsWithQuery("ProjectTeamDetails", Query)).done(function (valuesArray) {
        $.each(valuesArray, function (i, el) {
            if (uniqueValues.indexOf(el.Project.Id) == -1) {
                var ProjectURL = getProjectDMS(el.Project.Id);
                uniqueValues.push(el.Project.Id);
                DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkProjectTeamDetails' + i + '" value=""></label></div></td>';
                DocLibraries += '<td class="text-left">Project</td>';
                DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + ProjectURL + '>' + el.Project.ProjectName + '</a></td></tr>';
            }
        });
        $("#tbdyCopyFileLib").append(DocLibraries);
    });
    getGuestClientsCopy();
}
//to get the DMS URL of given project
function getProjectDMS(ItemId) {
    var myProjectDocumentsUrl = '';
    var restQueryPersonalDMS = "?$select=ID,ProjectName,ProjectSiteURL,ProjectInternalName&$top=5000&$filter=ID eq '" + ItemId + "'";
    $.when(getItemsWithQuery("ProjectDetails", restQueryPersonalDMS)).done(function (ProjectDetailData) {
        if (ProjectDetailData.length > 0) {
            var siteURL = ProjectDetailData[0].ProjectName;
            if (ProjectDetailData[0].ProjectInternalName != null && ProjectDetailData[0].ProjectInternalName != "") {
                siteURL = ProjectDetailData[0].ProjectInternalName;
                myProjectDocumentsUrl = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/DMS/" + siteURL + "/Documents/Forms/AllItems.aspx";
            }
        }
    });
    return myProjectDocumentsUrl;
}
//get all client in which Logged_In user is Internal member or Internal Supervisor
function getGuestClientsCopy() {
    var DocLibraries = '';
    var Query = "?$select=Id,Title,IsActive,CompanyID/Id,DocumentLibrary,InternalMembers/EMail,InternalSupervisor/EMail&$orderby=Title asc&$expand=CompanyID,InternalMembers,InternalSupervisor&$top=5000&$filter=DocumentLibrary ne null and IsActive eq '1' and InternalMembers/EMail eq '" + _spPageContextInfo.userEmail + "' or InternalSupervisor/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("ClientMaster", Query)).done(function (Clients) {
        if (Clients.length > 0) {
            for (var i = 0; i < Clients.length; i++) {
                var value = Clients[i];
                if (value.DocumentLibrary != null) {
                    DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkClientMaster' + i + '" value=""></label></div></td>';
                    DocLibraries += '<td class="text-left">Guest Client</td>';
                    DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + value.DocumentLibrary + '>' + value.Title + '</a></td></tr>';
                }
            }
        }
        $("#tbdyCopyFileLib").append(DocLibraries);
    });
    getCustomDMSCopy();
}

//get list of custom DMS
function getCustomDMSCopy() {
    var DocLibraries = '';
    var Query = "?$top=5000&$select=*,Author/Id,CompanyID/Id&$expand=Author,CompanyID&$orderby=Title asc&$filter=CompanyID/ID eq '" + Logged_CompanyId + "' and EmployeeName/Id eq '" + _spPageContextInfo.userId + "' and Status eq 'Active'";
    $.when(getItemsWithQuery("PersonalDMS_Setting", Query)).done(function (PersonalDMSData) {
        if (PersonalDMSData.length > 0) {
            for (var j = 0; j < PersonalDMSData.length; j++) {
                if (PersonalDMSData[j].Status == "Active") {

                    DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkPersonalDMS' + j + '" value=""></label></div></td>';
                    DocLibraries += '<td class="text-left">Custom</td>';
                    DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + PersonalDMSData[j].DMS_Link + '>' + PersonalDMSData[j].Title + '</a></td></tr>';
                }
            }
            $("#tbdyCopyFileLib").append(DocLibraries);
        }
    });
}


function getTreeView(Action) {
    var SiteURL = '';
    var LibraryName = '';
    var FolderName = '';
    var SelectedLibrary = '';
    if (Action.cells[1].innerHTML == "My Documents") {
        SiteURL = _spPageContextInfo.webAbsoluteUrl;
        FolderName = "DocumentManagementSystem/" + _spPageContextInfo.userEmail.toLowerCase() + "/";
        LibraryName = "DocumentManagementSystem";
        SelectedLibrary = 'My Documents';
    }
    else {
        var strLink = Action.cells[2].innerHTML.split('name="')[1].split('">')[0];
        const UrlLink = strLink.split('/Forms')[0];
        SiteURL = UrlLink.slice(0, UrlLink.lastIndexOf("/"));;
        FolderName = UrlLink.split('/')[UrlLink.split('/').length - 1] + "/";
        if (FolderName == "Documents/") {
            FolderName = "Shared Documents/";
        }
        LibraryName = FolderName.substring(0, FolderName.length - 1);
        SelectedLibrary = Action.cells[1].innerHTML + " : " + Action.cells[2].innerHTML.split('name="')[1].split('">')[1].split('</a>')[0];
    }
    bindTreeView(SiteURL, FolderName, LibraryName, SelectedLibrary);
}

function bindTreeView(SiteURL, folderUrl, library, SelectedLibrary) {
    $(".treesec").empty();
    $("#FolderNameCopy").text(SelectedLibrary);
    var FolderHTML = '';
    var Ownurl = SiteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + folderUrl + "')?$select=ID,File_x0020_Type,FSObjType,FileLeafRef,EncodedAbsUrl,FileRef&$top=5000&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields";
    $.ajax({
        url: Ownurl,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var folders = data.d.Folders.results;
            if (folders.length > 0) {
                FolderHTML += "<ul>";
                FolderHTML += '<li class="parent"><a class="DmsTree" onclick="ClickFolder(this, \'' + SiteURL + '\', \'' + folderUrl + '\', \'' + library + '\');" href="javascript:void(0);">Root</a>';
                FolderHTML += "<ul>";
                for (var i = 0; i < folders.length; i++) {
                    if (folders[i].Name != "Forms") {
                        FolderHTML += '<li class="parent" id="treeNode_' + folders[i].ListItemAllFields.Id + '"><a class="DmsTree" onclick="ClickFolder(this, \'' + SiteURL + '\', \'' + folderUrl + folders[i].Name + '\', \'' + library + '\');" href="javascript:void(0);">' + folders[i].Name + '</a>';
                        FolderHTML += "<ul>";
                        FolderHTML += BindSubFolders(SiteURL, folderUrl + folders[i].Name + "/", library);
                        FolderHTML += "</ul>";
                        FolderHTML += "</li>";
                    }

                }
                FolderHTML += "</ul>";
                FolderHTML += "</ul>";
                $(".treesec").append(FolderHTML);

            }
            else {
            	FolderHTML += "<ul>";
                FolderHTML += '<li class="parent"><a class="DmsTree" onclick="ClickFolder(this, \'' + SiteURL + '\', \'' + folderUrl + '\', \'' + library + '\');" href="javascript:void(0);">Root</a>';
                FolderHTML += "<ul></ul></ul>";
                $(".treesec").append(FolderHTML);
            }
        }
    }).fail(function (error) {
        FolderHTML += '<div class="">Document library cannot be found.</div>';
        $(".treesec").append(FolderHTML);
        $("#txtPleaseWait").hide();
    });
    $("#txtPleaseWait").hide();
}


function BindSubFolders(SiteURL, folderUrl, library) {
    try {
        var SubFolderHTML = '';
        var Ownurl = SiteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + folderUrl + "')?$select=ID,File_x0020_Type,FSObjType,FileLeafRef,EncodedAbsUrl,FileRef&$top=5000&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields";
        $.ajax({
            url: Ownurl,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" },
            async: false,
            success: function (data) {
                var folders = data.d.Folders.results;
                if (folders.length > 0) {
                    SubFolderHTML += "<ul>";
                    for (var i = 0; i < folders.length; i++) {
                        if (folders[i].Name != "Forms") {
                            SubFolderHTML += '<li class="parent" id="treeNode_' + folders[i].ListItemAllFields.Id + '"><a class="DmsTree" onclick="ClickFolder(this, \'' + SiteURL + '\', \'' + folderUrl + folders[i].Name + '\', \'' + library + '\');" href="javascript:void(0);">' + folders[i].Name + '</a>';
                            SubFolderHTML += "<ul>";
                            SubFolderHTML += BindSubFolders(SiteURL, folderUrl + folders[i].Name + "/", library);
                            SubFolderHTML += "</ul>";
                            SubFolderHTML += "</li>";
                        }
                    }
                    SubFolderHTML += "</ul>";

                }
            }
        });
        return SubFolderHTML;
    } catch (e) {
        alert(e.message);
        $("#txtPleaseWait").hide();
    }
}

function ClickFolder(Action, DestURL, Folder, library) {
    CopyDestURL = DestURL;
    CopyFolderName = Folder;
    CopyLibrary = library;
    $("#tblFiles").show();
    $("#btnSelect").trigger("click");
    //$('#btnSelect').show();
    $(".DmsTree").css({ 'text-shadow': '' });
    $(Action).css("text-shadow", "2px 0px 5px #1e90ff");
}

function TreeStructure() {
    $.fn.filetree = function (method) {

        var settings = { // settings to expose
            //     animationSpeed      : 'fast',            
            collapsed: true,
            console: false
        }
        var methods = {
            init: function (options) {
                // Get standard settings and merge with passed in values
                var options = $.extend(settings, options);
                // Do this for every file tree found in the document
                return this.each(function () {
                    var $fileList = $(this);
                    $fileList.addClass('file-list').find('li')
                        //.has('ul') // Any li that has a list inside is a folder root
                            .addClass('folder-root closed')
                            .on('click', 'a[href="#"]', function (e) { // Add a click override for the folder root links
                                e.preventDefault();
                                $(this).parent().toggleClass('closed').toggleClass('open');

                                return false;
                            });
                    //alert(options.animationSpeed); Are the settings coming in
                });
            }
        }

        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.on("error", function () {
                console.log(method + " does not exist in the file exploerer plugin");
            });
        }
    }
}

//get all the files of the selected folders
function getAllFiles() {
	var FileHTML = '';
	var Ownurl = CopyDestURL+ "/_api/Web/GetFolderByServerRelativeUrl('" + CopyFolderName + "')?$select=*,ID,EncodedAbsUrl,File_x0020_Type&$expand=Files,Files/ListItemAllFields&$orderby=Modified desc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
        	var files = data.d.Files.results;
        	if(files.length > 0){
        		$("#btnSubmitLink").show();
        		//$(".treesec").hide();
        		//$("#btnSelect").hide();
        		//$("#tblFiles").show();
        		for (var i = 0; i < files.length; i++) {
        			var DocumentType = files[i].ListItemAllFields.DocumentType;
                    if (DocumentType == null || DocumentType == "--select--") {
                        DocumentType = "";
                    }
                    var Title = files[i].ListItemAllFields.Title;
                    if (Title == null) {
                        Title = "";// FileName;
                    }
                    var DocumentNo = files[i].ListItemAllFields.DocumentNo;
                    if (DocumentNo == null) {
                        DocumentNo = "";
                    }
                    var propertiesServerRelativeUrl = files[i].ListItemAllFields.ServerRedirectedEmbedUri;
                    if (propertiesServerRelativeUrl == null || propertiesServerRelativeUrl == "") {
                    	propertiesServerRelativeUrl = CopyDestURL + "/"+CopyLibrary+"/Forms/AllItems.aspx?id=" + encodeURIComponent(files[i].ServerRelativeUrl) + "&parent=" + encodeURIComponent(files[i].ServerRelativeUrl.substr(0, files[i].ServerRelativeUrl.lastIndexOf("/") + 0));
                    }
        			FileHTML += '<tr><td><input class="FolderFile" name="File" type="radio" value="'+propertiesServerRelativeUrl +'"></td>';
        			FileHTML += '<td><a href="'+propertiesServerRelativeUrl +'" alt="" target="_blank"> '+files[i].Name+'</a></td><td>'+Title+'</td>';
        			FileHTML += '<td>'+DocumentType+'</td>';
        			FileHTML += '<td>'+DocumentNo +'</td></tr>';
        		}
        		$("#tbdyFiles").empty().append(FileHTML);
        	}
        	else{
        		FileHTML += '<tr><td colspan="5" style="text-align:center;">No document</td></tr>';
        		$("#tbdyFiles").empty().append(FileHTML);
        	}
     }, eror: function (data) {
            console.log('error');
        }
    });
}

//to get data from SP list
getItemsWithQuery = function (ListName, Query) {
    var dfd = $.Deferred();
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query;
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
            dfd.resolve(data.d.results);
            //   console.log();
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//to clear people picker
function clearPeoplePickerControl(pickerId) {
    var toSpanKey = pickerId + "_TopSpan";
    var peoplePicker = null;
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