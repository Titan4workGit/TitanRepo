var to = [];
var DocumentId;
var CopySourceURL = "";
var IsMoving = false;
var CopyDestURL = "";
var CopyFolderName = '';
var SelectedFileServerURL = '';
var FileCheckOutBy = '';
var FilePermissions = '';
var FileOwner = '';
var multipleEmailAddress = [];
var assignUserName = [];
var EmpIds = [];
var FavouriteId = '';
var IntervalId = '';
var AllApprovers = [];
var currentRequestId = '';
var LoggedIn_TimeZone = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
var OldFileName = '';
var RequestDigest = $("#__REQUESTDIGEST").val();
$(document).ready(function () {
    BindDocLibrary();
    TreeStructure();
    InitializePeoplePicker("ApproverName", true);
    InitializePeoplePicker("NotifyMailPicker", true);
    $('#dueDateField').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: new Date()
    });
    $('#dueDateField').datepicker("option", "dateFormat", "MM dd, yy");
    $("#btnAddStep").click(function () {
        $("#addsuccessor").modal('show');
        $("#SuccessorStepHeader").text("Add Step");
        multipleEmailAddress = [];
        assignUserName = [];
        EmpIds = [];
        $("#AddSuccStep").hide();
        $("#AddEditStep").show();
        $("#btnChangeApprovers").hide();
        onChangeTask('ApproverName_TopSpan', 'ApproverName', 'userHTMLBox', 1);
        if ($("#ddlSign").val() == "Adobe Sign") {
            $("#OutsideSection").show();
            $("#UserSection").show();
        }
        else {
            $("#OutsideSection").hide();
            $("#UserSection").hide();
        }
    });
    $("#AddEditStep").click(function () {
        if ($.trim($("#AddEditStepName").val()) != "") {
            if ($("#userHTMLBox").html() != "") {
                if ($("#SuccessorStepHeader").text() == "Edit Step") {
                    EditAddedStep(multipleEmailAddress, assignUserName, EmpIds);
                }
                else {
                    AddMoreStep(multipleEmailAddress, assignUserName, EmpIds);
                }
            }
            else {
                if ($.trim($("#OutsiderName").val()) != "" && $.trim($("#OutsiderEmail").val()) && isEmail($("#OutsiderEmail").val()) != false) {
                    if ($("#SuccessorStepHeader").text() == "Edit Step") {
                        EditAddedStep(multipleEmailAddress, assignUserName, EmpIds);
                    }
                    else {
                        AddMoreStep(multipleEmailAddress, assignUserName, EmpIds);
                    }
                }
                else {
                    alert("Kindly fill the approver's name or correct the email format.");
                    return false;
                }
            }
            $(".closeAddEditModal").trigger('click');
        }
        else {
            alert("Kindly enter the Step Name.");
            return false;
        }
    });
    $(".closeAddEditModal").click(function () {
        $("#AddEditStepName").val("");
        multipleEmailAddress = [];
        assignUserName = [];
        EmpIds = [];
        $("#userHTMLBox").empty();
        $("#OutsiderName").val('');
        $("#OutsiderEmail").val('');
        $(".userBox").hide();
    });
    $(".radioEmp").change(function () {
        multipleEmailAddress = [];
        assignUserName = [];
        EmpIds = [];
        $(".userBox").hide();
        if (this.value == 'Outsider') {
            $("#userbox-1").hide();
            $("#userbox-2").show();
            $("#userHTMLBox").empty();
        }
        else {
            $("#userbox-1").show();
            $("#userbox-2").hide();
            $("#OutsiderName").val('');
            $("#OutsiderEmail").val('');
        }
    });
    $('#btnSubmitApproval').click(function (e) {
        if ($.trim($("#accordionapprovers").html()) == "") {
            alert("Kindly add approval steps first.");
            return false;
        }
        else {
            if ($("#noDueDate").prop('checked') == false && $("#dueDateField").val() == '') {
                alert("Kindly enter due date.");
                return false;
            }
            else {
                $("#overlaysearch").fadeIn();
                setTimeout(function () {
                    UpdateDocumentStatus();
                }, 100);
            }
        }
    });
    $("input[id$='dueDate']").click(function () {
        $('#dueDateField').removeAttr("disabled");
    });
    $("#btnChangeProp").click(function () {
        if ($("#txtUpdateType").html() == '') {
            bindDocumentType();
        }
        $("#txtUpdateTitle").val($("#FileTitle").text());
        $("#txtUpdateRef").val($("#FileReference").text());
        $("#txtUpdateType").val($("#FileDocType").text());
        $("#txtUpdateAuthor").val($("#FileAuthor").text());
        $("#txtUpdateDetails").val($("#FileDetalis").text());
    });
    $("input[id$='noDueDate']").click(function () {
        $('#dueDateField').attr('disabled', 'disabled');
    });
    //$('#dueDateField').datepicker("option", "dateFormat", "dd/mm/yy");
    $('#selectAll').click(function (e) {
        var table = $(e.target).closest('table');
        $('td input:checkbox', table).prop('checked', this.checked);

    });
    $('.DocLib').change(function () {
        if (this.checked == false) {
            $('#selectAll').prop("checked", "")

        }
    });
    $('td input:checkbox:checked').each(function () {
        var count = 0;
        var lenghtOfChecked = count++;
    });
    $('#lockeffect').click(function () {
        if (FileCheckOutBy == "") {
            Checkoutfile('');

        } else {
            CheckInfile('');
            FileCheckOutBy = '';
            $("#LockStatus").hide();
            $("#lockeffect .texthere").text("Lock");
            $('#lockeffect .unlock').hide();
            $('#lockeffect .lock').show();
        }
    });
    $('#btnUndoLock').click(function () {
        UndoCheckOutfile();
    });
    $('#btnClear').click(function () {
        clearAll();
    });
    $('#btnCopyFile').click(function () {
        if ($('#tbdyCopyFileLib td').length == 0) {
            waitingDialog.show();
            setTimeout(function () {
                myShareDepartmentCopy();
                TreeStructure();
                $("#CpyMoveModalTitle").text('Copy Files');
                $("#btnCopyHere").html('Copy Here');
                IsMoving = false;
            }, 100);
        }
        else {
            $("#CpyMoveModalTitle").text('Copy Files');
            $("#btnCopyHere").html('Copy Here');
            IsMoving = false;
        }

    });
    $('#btnMoveFile').click(function () {

        if ($('#tbdyCopyFileLib td').length == 0) {
            waitingDialog.show();
            setTimeout(function () {
                myShareDepartmentCopy();
                TreeStructure();
                $("#CpyMoveModalTitle").text('Move Files');
                $("#btnCopyHere").html('Move Here');
                IsMoving = true;
            }, 100);
        }
        else {
            $("#CpyMoveModalTitle").text('Move Files');
            $("#btnCopyHere").html('Move Here');
            IsMoving = true;
        }
    });
    $('.DocLibCopy').change(function () {
        if (this.checked == false) {
            $('#selectAll').prop("checked", "")
        }
    });
    $('#nextbtn').click(function (e) {
        if ($("#tbdyCopyFileLib input[type=radio]:checked").length == 1) {
            $("#txtPleaseWait").show();
            setTimeout(function () {
                $('.treesec').fadeIn();
                $('#copyfilesnow').fadeOut();
                $('.hidesection').fadeOut();
                $('#nextbtn').hide();
                $('#btnCopyHere').show();
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
                $(".RootFolder").trigger("click");
            }, 100);

        } else {
            alert("Kindly select any library first.");
            return false;
        }
    });
    $('#btnApproval').click(function (e) {
        $("#approval-modal").modal('show');
    });
    $('#Backbtn').click(function (e) {
        $('.treesec').fadeOut();
        $('#copyfilesnow').fadeIn();
        $('.hidesection').fadeIn();
        $('#nextbtn').show();
        $('#btnCopyHere').hide();
        $('#Backbtn').hide();
        $(".FolderCaption").hide();
        CopyDestURL = '';
        CopyFolderName = '';
    });
    $('#btnCopyHere').click(function (e) {
        if (CopyDestURL != '') {
            copyFile();
        } else {
            alert("Select any folder to copy/move");
            return false;
        }
    });
    $('#btnDeleteFile').click(function (e) {
        if (confirm("Are you sure, you want to delete this file?")) {
            DeleteFileFromSource("DeleteFile");
        }
    });
    $("#ddlAppStep").change(function () {
        $("#accordionapprovers").empty();
        $("#ApprovalStepBox").hide();
        if (this.value == 'Customize') {
            $('.customizedSteps').show();
        }
        else {
            $('.customizedSteps').hide();
        }
    });
    $("#ddlSign").change(function () {
        $("#accordionapprovers").empty();
        $("#ApprovalStepBox").hide();
    });
    $('.btnCloseApproval').click(function (e) {
        ClearAprovalControls();
        $("#approval-modal").modal('hide');
    });
    $('#btnUpdateProp').click(function (e) {
        $("#btnUpdateProp").attr('disabled', 'disabled');
        if ($("#chkUpdateTitle").prop('checked') == false && $("#chkUpdateRef").prop('checked') == false && $("#chkUpdateType").prop('checked') == false && $("#chkUpdateAuthor").prop('checked') == false && $("#chkUpdateDetails").prop('checked') == false) {
            $("#btnUpdateProp").prop('disabled', '');
            alert("Please select at-least one property to update.");
            return false;
        }
        else {
            UpdateFileProperties();
        }
    });
    $('.btnCloseProp').click(function (e) {
        $(".clearPropBox").val('');
        $("#txtUpdateType").val('Technical');
        $(".chkProperty").prop('checked', 'checked');
    });
    $('#btnApprovalHistry').click(function (e) {
        BindApprovalHistory();
    });
    $("#starffect").click(function () {
        if ($("#txtFavorite").text() == "Add to Favorite") {
            AddFavoriteFile();
        }
        else {
            DeleteFromFavourite();
        }
    });
    $("#btnRenameFile").click(function (e) {
    	OldFileName = $("#txtRenamefile").val().trim() + $("#txtFileExt").text();
    });
});

function BindDocLibrary() {
    myShareDepartment();
    //myShareDepartmentCopy();
}

//to bind the all the departments to which Logged_In user can access
function myShareDepartment() {
    var DocLibraries = '';
    var Query = "?$select=*,Department/DepartmentName,Department/ID&$top=5000&$expand=Department&$filter=(CompanyId eq '" + Logged_CompanyId + "' and ContributorsId eq '" + _spPageContextInfo.userId + "' and WebPartName eq 'DepartmentDocument_Access') or (CompanyId eq '" + Logged_CompanyId + "' and Owner eq '" + _spPageContextInfo.userId + "' and WebPartName eq 'Documents') ";
    $.when(getItemsWithQuery("ProcessApprovers", Query)).done(function (valuesArray) {
        DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" type="checkbox" value=""></label></div></td>';
        DocLibraries += '<td class="text-left">My Documents</td><td class="text-left"></td></tr>';
        //LOgged_In department
        var DeptURL = getDepartmentURL(Logged_DepartmentId);
        DeptURL = DeptURL + "/DepartmentalDMS/Forms/AllItems.aspx";
        DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" type="checkbox" id="chkDepartments" value=""></label></div></td>';
        DocLibraries += '<td class="text-left">Department</td>';
        DocLibraries += '<td class="text-left"><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + DeptURL + '>' + Logged_DepartmentName + '</a></td></tr>';
        $.each(valuesArray, function (i, el) {
            var DeptURL = getDepartmentURL(el.Department.ID);
            DeptURL = DeptURL + "/DepartmentalDMS/Forms/AllItems.aspx";
            DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" type="checkbox" id="chkProcessApprovers' + i + '" value=""></label></div></td>';
            DocLibraries += '<td class="text-left">Department</td>';
            DocLibraries += '<td class="text-left"><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + DeptURL + '>' + el.Department.DepartmentName + '</a></td></tr>';
        });
        $("#tbodyDocLibraries").append(DocLibraries);
        BindProjects();
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
function BindProjects() {
    var DocLibraries = '';
    var uniqueValues = [];
    var Query = "?$select=DocumentPermission,TeamMember/Id,Project/Id,Project/ProjectName&$top=5000&$orderby=Project/ProjectName asc&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and TeamMemberId eq '" + _spPageContextInfo.userId + "' and Status eq 'Active'";
    $.when(getItemsWithQuery("ProjectTeamDetails", Query)).done(function (valuesArray) {
        $.each(valuesArray, function (i, el) {
            if (uniqueValues.indexOf(el.Project.Id) == -1) {
                var ProjectURL = getProjectDMS(el.Project.Id);
                uniqueValues.push(el.Project.Id);
                DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" type="checkbox" id="chkProjectTeamDetails' + i + '" value=""></label></div></td>';
                DocLibraries += '<td class="text-left">Project</td>';
                DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + ProjectURL + '>' + el.Project.ProjectName + '</a></td></tr>';
            }
        });
        $("#tbodyDocLibraries").append(DocLibraries);
    });
    getGuestClients();
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
function getGuestClients() {
    var DocLibraries = '';
    var Query = "?$select=Id,Title,IsActive,CompanyID/Id,DocumentLibrary,InternalMembers/EMail,InternalSupervisor/EMail&$orderby=Title asc&$expand=CompanyID,InternalMembers,InternalSupervisor&$top=5000&$filter=DocumentLibrary ne null and IsActive eq '1' and InternalMembers/EMail eq '" + _spPageContextInfo.userEmail + "' or InternalSupervisor/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("ClientMaster", Query)).done(function (Clients) {
        if (Clients.length > 0) {
            for (var i = 0; i < Clients.length; i++) {
                var value = Clients[i];
                if (value.DocumentLibrary != null) {
                    DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" type="checkbox" id="chkClientMaster' + i + '" value=""></label></div></td>';
                    DocLibraries += '<td class="text-left">Guest Client</td>';
                    DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + value.DocumentLibrary + '>' + value.Title + '</a></td></tr>';
                }
                //$("<option value='" + value.Id + "'>" + value.Title + "</option>").appendTo("#ddlGuestClient");
            }
        }
        $("#tbodyDocLibraries").append(DocLibraries);
    });
    getCustomDMS();
}

//get list of custom DMS
function getCustomDMS() {
    var DocLibraries = '';
    var Query = "?$top=5000&$select=*,Author/Id,CompanyID/Id&$expand=Author,CompanyID&$orderby=Title asc&$filter=EmployeeName/Id eq '" + _spPageContextInfo.userId + "' and Status eq 'Active'";//CompanyID/ID eq '" + Logged_CompanyId + "' and 
    $.when(getItemsWithQuery("PersonalDMS_Setting", Query)).done(function (PersonalDMSData) {
        if (PersonalDMSData.length > 0) {
            for (var j = 0; j < PersonalDMSData.length; j++) {
                if (PersonalDMSData[j].Status == "Active") {

                    DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" type="checkbox" id="chkPersonalDMS' + j + '" value=""></label></div></td>';
                    DocLibraries += '<td class="text-left">Custom</td>';
                    DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + PersonalDMSData[j].DMS_Link + '>' + PersonalDMSData[j].Title + '</a></td></tr>';
                }
            }
            $("#tbodyDocLibraries").append(DocLibraries);
        }
    });
    
   // getShareWithme();
}



//get list of custom DMS
function getShareWithme() {
    var DocLibraries = '';
        
                    DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" type="checkbox" id="chkShareWithme" value=""></label></div></td>';
                    DocLibraries += '<td class="text-left">Shared Documents</td>';
                    DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name ="ShareWithme"> Shared Documents </a></td></tr>';
               
            $("#tbodyDocLibraries").append(DocLibraries);
        
    
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

//Open modal for display the file properties //getfilebyserverrelativeurl
function DisplayFileProperty(Action, SiteURL, Library) {
    CopySourceURL = SiteURL;
    $("#txtFavorite").text("Add to Favorite");
    $('.unfillstar').show();
    $('.fillstar').hide();
    $("#btnApproval").show();
    FavouriteId = '';
    var webURL = SiteURL + "/_api/web/GetFileByServerRelativeUrl('" + Action.name + "')?$expand=ListItemAllFields,Author,Files/Author,Editor&$select= LockedByUser,CheckedOutByUser,DocumentWrittenBy,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentType,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," +
	    "ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Title,ListItemAllFields/Approval,ListItemAllFields/FileLeafRef,ListItemAllFields/ServerRedirectedEmbedUri,ListItemAllFields/Modified_x0020_By";
    $.ajax({
        url: webURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            //Bind File in Iframe
            var FileValue = data.d.ListItemAllFields;
            var propertiesServerRelativeUrl = FileValue.ServerRedirectedEmbedUri;
            DocumentId = data.d.ListItemAllFields.Id;
            SelectedFileServerURL = Action.name;
            FileCheckOutBy = getCheckedOutBy();
            if (_spPageContextInfo.userDisplayName != FileCheckOutBy && FileCheckOutBy != "" && FileCheckOutBy != null) {
                $("#lockeffect .texthere").text("Unlock");
                $("#lockeffect").hide();
                $("#LockStatus").show();
                $("#LockStatus").text("Locked by: " + FileCheckOutBy);
                $('#lockeffect .unlock').hide();
                $('#lockeffect .lock').show();
                $("#lockeffect").attr("disabled", "disabled");
                $(".LockDisable").attr("disabled", "disabled");
                $("#lockeffect").attr("disabled", "disabled");
                $("#btnApproval").hide();
                if (FilePermissions == 'Full Control') {
                    $("#btnUndoLock").show();
                }
            } else {
                if (_spPageContextInfo.userDisplayName == FileCheckOutBy) {
                    $("#LockStatus").show();
                    $("#LockStatus").text("Locked by me");
                    $("#lockeffect .texthere").text("Unlock");
                    $(".LockDisable").attr("disabled", "disabled");
                    $("#btnApproval").hide();
                } else {
                    $("#lockeffect .texthere").text("Lock");
                    $("#LockStatus").hide();
                    $(".LockDisable").prop("disabled", "");
                }
                $("#lockeffect").prop("disabled", "");
            }

            if (propertiesServerRelativeUrl == null) {
                propertiesServerRelativeUrl = window.location.origin + Action.name;

                if (Action.name.includes("DocumentManagementSystem") == true || Action.name.includes("DepartmentalDMS") == true) {
                    if (Action.name.includes("DocumentManagementSystem") == true) {
                        CopyLibrary = "DocumentManagementSystem";
                        $(".txtCopyLink").val(SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(Action.name) + "&parent=" + encodeURIComponent(Action.name.substr(0, Action.name.lastIndexOf("/") + 0)));
                    } else {
                        CopyLibrary = "DepartmentalDMS";
                        $(".txtCopyLink").val(SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(Action.name) + "&parent=" + encodeURIComponent(Action.name.substr(0, Action.name.lastIndexOf("/") + 0)));
                    }
                } else {
                    CopyLibrary = "Documents";
                    var HostName = window.location.origin + Action.name.substr(0, Action.name.lastIndexOf("/") + 0);
                    $(".txtCopyLink").val(HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(Action.name) + "&parent=" + encodeURIComponent(Action.name.substr(0, Action.name.lastIndexOf("/") + 0)));
                }
                //window.location.origin + Action.name;
            } else {
                if (Action.name.includes("DocumentManagementSystem") == true) {
                    CopyLibrary = "DocumentManagementSystem";
                } else if (Action.name.includes("DepartmentalDMS") == true) {
                    CopyLibrary = "DepartmentalDMS";
                } else {
                    CopyLibrary = "Documents";
                }
                $(".txtCopyLink").val(propertiesServerRelativeUrl);
            }
            if (FileValue.FileLeafRef.includes(".pdf") == false) { //to check if it's PDF
                //propertiesServerRelativeUrl = propertiesServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
            }
            $("#DownloadFile").prop("href", window.location.origin + Action.name);
            $("#btnFullView").prop("href", propertiesServerRelativeUrl);
            var container = $("#doc-viewer").empty();
            if (FileValue.FileLeafRef.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                $('#doc-viewer').html("<div class='FlexingBox'><img class='AdjustingSize' src='" + propertiesServerRelativeUrl + "'/></div>");
            }
            else {
                var Extension = FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1);//data.d.ListItemAllFields.FileLeafRef.substr(data.d.ListItemAllFields.FileLeafRef.length - 3)
                if (Extension == "csv" || Extension == "wmv" || Extension == "avi" || Extension == "mp3" || Extension == "mp4" || Extension == "webm" || Extension == "wma" || Extension == "one" || Extension == "tif" || Extension == "tiff") {
                    propertiesServerRelativeUrl = $(".txtCopyLink").val();
                }

                /*if (data.d.ListItemAllFields.FileLeafRef.substr(data.d.ListItemAllFields.FileLeafRef.length - 3) == "csv") {
                    CsvViewer(propertiesServerRelativeUrl);
                } 
                else */
                {
                    $('<iframe>', {
                        src: propertiesServerRelativeUrl,
                        id: 'iframe-viewer',
                        frameborder: 0,
                        scrolling: 'yes',
                        width: '100%',
                        height: '98%'
                    }).appendTo(container);
                }
            }
            if (FileValue.SecurityLevel == null || FileValue.SecurityLevel == "Private") {
                if (FileValue.AccessLevel == 'Everyone') {
                    $('#FileSharing').text("Shared with Everyone");
                    $("#txtSharingHistoy").show();
                }
                else {
                    FileValue.SecurityLevel = "Not shared";
                    $('#FileSharing').text(FileValue.SecurityLevel);
                    $("#txtSharingHistoy").hide();
                }
            }
            else {
                $('#FileSharing').text("Shared with " + FileValue.SecurityLevel);
                $("#txtSharingHistoy").show();
            }
            $('#FileTitle').text(FileValue.Title ? FileValue.Title : "");
            if (FileValue.DocumentType != "--select--" && FileValue.DocumentType != null && FileValue.DocumentType != "-Select-") {
                $('#FileDocType').text(FileValue.DocumentType);
            }
            $('#FileReference').text(FileValue.DocumentNo ? FileValue.DocumentNo : "");
            $('#FileAuthor').text(data.d.DocumentWrittenBy);
            $('#FileDetalis').text(FileValue.Details ? FileValue.Details : "");

            $('#FileApproval').text(FileValue.Approval ? FileValue.Approval : "");
            if (FileValue.Approval == "Approved") {
                FinalApprovalFile();
                $(".ApproveSign").show();
                $(".RejectSign").hide();
                $("#FileApproval").css('color', 'Green');
            }
            else if (FileValue.Approval == "Reject" || FileValue.Approval == "Rejected") {
                $(".RejectSign").show();
                $(".ApproveSign").hide();
                $("#FileApproval").css('color', 'Red');
            }
            else {
                $(".RejectSign").hide();
                $(".ApproveSign").hide();
                $("#FileApproval").css('color', 'Black');
            }

            if (FileValue.Approval != "" && FileValue.Approval != null) {
            	if ($("#btnChangeProp").css('display') != "none") {
                	$("#btnApproval").hide();
                }
                $("#btnApprovalHistry").show();
            }
            else {
            	if ($("#btnChangeProp").css('display') != "none") {
                	$("#btnApproval").show();
            	}
                $("#btnApprovalHistry").hide();
            }
            if (Action.name.indexOf("Shared Documents") != -1) {
                Action.name = Action.name.replace("Shared Documents", "Shared%20Documents");
            }
            $('#FilePath').text(Action.name);
            $('#FileName').text(FileValue.FileLeafRef);
            $('#txtRenamefile').val(FileValue.FileLeafRef.split('.').slice(0, -1).join('.'));
            $("#txtFileExt").text("." + FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1));
            $('#FileLastModified').text(moment(FileValue.Last_x0020_Modified).format('DD-MM-YYYY HH:MM:SS'));
            $('#FileLastModifiedBy').text(GetUserFullName(FileValue.Modified_x0020_By));
            $('#FileSize').text(FileValue.FileSizeDisplay + " KB");
            $('#LibProject').text(Library);
            //PermissionsControl(FileValue);
            IntervalId = setInterval(function () {
                $("#iframe-viewer").contents().find(".OneUp-commandBar").remove();
            }, 2000);
            GetFileVersion(Action.name, SiteURL, FileValue.FileLeafRef, FileValue.Title ? FileValue.Title : "");
        },
        eror: function (data) {
            $('#ModalDisplayProperty').modal('show');
            console.log(JSON.stringify(data));
        }
    }).fail(function (error) {
        if (Action.name.indexOf("Documents") != -1) {
            alert('Attempted to perform an unauthorized operation');
        }
        else {
            alert(error.responseJSON.error.message.value);
        }
    });
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

//to get file version
function GetFileVersion(itemURL, SiteURL, FileName, Title) {
    var webURL = SiteURL + "/_api/Web/GetFileByServerRelativeUrl('" + itemURL + "')/Versions?$select=*,CreatedBy/Title,CreatedBy/EMail&$expand=CreatedBy";
    $.ajax({
        url: webURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var itemsVersion = data.d.results;
            $("#VerHisParent").empty().append('<a class="detail-panel-inner-link" href="javascript:void(0);" id="btnVerHist">Version History</a>');
            $('#btnVerHist').click(function (e) {
                BindVersionHistory(itemsVersion, FileName, Title, SiteURL);
            });
			$("#AuditHisParent").empty().append('<a class="detail-panel-inner-link" href="javascript:void(0);" id="btnAuditHist">Audit History</a');
			$('#btnAuditHist').click(function (e) {
		        GetAuditHistory(itemURL, SiteURL, FileName, Title);
		    });
            if (itemsVersion.length > 0) {
                $('#FileVersion').text(itemsVersion[itemsVersion.length - 1].VersionLabel);
            }
            $('#ModalDisplayProperty').modal('show');
            checkFavoriteFile();
        },
        eror: function (data) {
            if (error.responseJSON.error.message.value == "Access denied.") {
                $("#VerHisParent").empty().append('<a class="detail-panel-inner-link" href="javascript:void(0);" id="btnVerHist">Version History</a>');
                $('#btnVerHist').click(function (e) {
                    alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
                    return false;
                });
            }
            else {
                $('#ModalDisplayProperty').modal('show');
                console.log(JSON.stringify(data));
            }
        }
    });
    setTimeout(function () {
        var storing = $(".AdjustingSize").width();
        if (storing >= 600) {
            $(".AdjustingSize").css('width', '100%');
        } else {
            $(".AdjustingSize").css('width', 'auto');
        }
        if ($('#iframe-viewer').contents().find('body').html() == "") {
            $("#doc-viewer").empty();
            var htmlNotAuthorized = '<div class="col-md-12">' +
                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                '<span><h2 class="text-center">No preview availble. File has been downloaded.</h2></span>';
            $('#doc-viewer').append('<div width="100%" id="viewMyDocuments" style="min-height:750px;padding-top:0px">' + htmlNotAuthorized + '</div>');
        }
    }, 2000);
}

//get Audit File History
function GetAuditHistory(itemURL, SiteURL, FileName, Title) {
    var container = $("#bdyAuditHist").empty();
    var tempLib = CopyLibrary;
    if (tempLib == "Shared%20Documents" || tempLib == "Shared Documents") {
        tempLib = "Documents";
    }
    jQuery.ajax(
    {
        url: SiteURL + "/_api/web/lists/getbytitle('" + tempLib + "')?$select=Id",
        type: "GET",
        async: false,
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data, textStatus, xhr) {
            var versionsUrl = SiteURL + '/_layouts/versions.aspx?list=' + data.d.Id + '&ID=' + DocumentId;
            $('<iframe>', {
                src: versionsUrl,
                id: 'Audit-viewer',
                frameborder: 0,
                scrolling: 'yes',
                width: '100%',
                height: '98%'
            }).appendTo(container);
            $("#AuditHistory").modal('show');
            setInterval(function () {
            	$("#Audit-viewer").contents().find("#titlerow").remove();
            	$("#Audit-viewer").contents().find(".ms-belltown-anonShow").remove();
            }, 1000);
        },
        error: function (data, textStatus, xhr) {
            console.error("Error.");
        }
    });

}

function BindVersionHistory(array, FileName, Title, URL) {
    var Version = '';
    $("#VerHisFile").text(FileName);
    $("#VerHisTitle").text(Title);
    $("#tbdyVerHis").empty();
    if (array.length > 0) {
        for (ver = 0; ver < array.length; ver++) {
            var DownloadURL = URL + "/" + array[ver].Url;
            dateObj = new Date(array[ver].Created);
            var DateTime = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
            var H = +DateTime.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? "AM" : "PM";
            DateTime = h + DateTime.substr(2, 3) + ampm;
            var FinalDateTime = $.datepicker.formatDate("dd-M-yy", new Date(array[ver].Created)) + " " + DateTime;

            //get Employee Details
            var EmpDept = '';
            var EmpDesg = '';
            var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(array[ver].CreatedBy.Email);
            RestQuery = "?$select=LogonName/EMail,Designation,Department/Title,AttachmentFiles&$expand=LogonName,Department,AttachmentFiles&$filter=LogonName/EMail eq '" + array[ver].CreatedBy.Email + "'&$top=5000";
            $.when(getItemsWithQuery('Employees', RestQuery)).done(function (Employees) {
                if (Employees.length > 0) {
                    EmpDept = Employees[0].Department.Title;
                    EmpDesg = Employees[0].Designation;
                    if (Employees[0].AttachmentFiles.results.length > 0) {
                        employeePicURL = Employees[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                }
            });

            Version += '<tr><td>' + array[ver].VersionLabel + '</td><td><div class="flexingtwo"><img src="' + employeePicURL + '">';
            Version += '<div class="designationtype"><h3 class="namesection">' + array[ver].CreatedBy.Title + '</h3><span>' + EmpDesg + '</span>, <span>' + EmpDept + '</span></div></div></td>';
            Version += '<td><span class="datearea">' + FinalDateTime + '</span></td><td><a href="' + DownloadURL + '" class="downloadsec" download="' + $("#VerHisFile").text().substr(0, $("#VerHisFile").text().lastIndexOf(".")) + '">';
            Version += '<i class="fa fa-download"></i>Download</a></td></tr>';
        }
        $("#tbdyVerHis").append(Version);
    } else {
        Version += '<div colspan=4>No version found</div>';
        $("#tbdyVerHis").append(Version);
    }
    $("#versionhistory").modal('show');
}


//to get Full name from email
function GetUserFullName(userName) {
    var userID = "";
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var accountName = userName;
    $.ajax({
        url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(accountName) + "'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            userID = data.d.Title;
        },
        error: function (data) {
            $('#ModalDisplayProperty').modal('show');
            console.log(JSON.stringify(data));
        }
    });
    return userID;
}

//to clear all control boxes
function clearAll() {
    $("#txtTitlesearchBox").val("");
    $("#txtContentsearchBox").val("");
    $("#txtReference").val("");
    $("#ddlDocumentType").val("ALL");
    $('.DocLib').removeAttr('checked');
    $('#selectAll').removeAttr('checked');
}


function PermissionsControl(data) {

    var Divrow = "";
    var Acsesscontrol = "Restricted"
    FilePermissions = "";
    for (var i = 0; i < data.RoleAssignments.results.length; i++) {

        if (data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name == "Full Control") {
            Acsesscontrol = "Full_control";

            if (data.RoleAssignments.results[i].Member.Title == _spPageContextInfo.userDisplayName) {
                FilePermissions = "Full Control"
            }
            //alert(FileOwner);
        } else if (data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name == "Limited Access") {
            Acsesscontrol = "Reader";
            if (data.RoleAssignments.results[i].Member.Title == _spPageContextInfo.userDisplayName) {
                FilePermissions = "Reader"
            }

        } else if (data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name == "Read") {
            Acsesscontrol = "Reader";
            if (data.RoleAssignments.results[i].Member.Title == _spPageContextInfo.userDisplayName) {
                FilePermissions = "Reader"
            }

        } else if (data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name == "Contribute") {
            Acsesscontrol = "Contributor";
            if (data.RoleAssignments.results[i].Member.Title == _spPageContextInfo.userDisplayName) {
                FilePermissions = "Contributor"
            }

        } else if (data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name == "Restricted View") {
            Acsesscontrol = "Restricted";

            if (data.RoleAssignments.results[i].Member.Title == _spPageContextInfo.userDisplayName) {
                FilePermissions = "RestrictedViewer"
            }

        }


        //../_layouts/15/userphoto.aspx?size=L&username=indramani.gautam@adapt-india.com

        Divrow += '<div class="row">' +
            '<div class="col-md-8">' +
            '<div class="row">' +
            '<div class="col-sm-2 img_box">' +
            '<img src="../_layouts/15/userphoto.aspx?size=M&username=' + data.RoleAssignments.results[i].Member.Email + '" alt="">' +
            '</div>' +
            '<div class="col-sm-10 permissons_detail">' +
            '<a href="#" class="emplyeename" data-toggle="modal" data-target="#adduser">' + data.RoleAssignments.results[i].Member.Title + '</a>' +
            '<div class="emilbox">' +
            '<h4>' + data.RoleAssignments.results[i].Member.Email + '</h4>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<div class="control_img">' +
            '<h3>' + data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name + '</h3>' +
            '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/' + Acsesscontrol + '.png" alt="">' +
            '</div>' +
            '</div>' +

            '</div>';
    }

    $("#divPermissions").html("");
    $("#divPermissions").append(Divrow);

    NotifyEmail(data)

}



function NotifyEmail(data) {
    var Notifyhtml = "";



    for (var i = 0; i < data.RoleAssignments.results.length; i++) {

        Notifyhtml += '<div class="listofemployee" >' +
            '<input type="checkbox" name="" Id="checkbox' + i + '" class="checkse">' +
            '<div class="row">' +

            '<div class="listimg col-md-2">' +
            '<img src="../_layouts/15/userphoto.aspx?size=M&username=' + data.RoleAssignments.results[i].Member.Email + '" alt="">' +
            '</div>' +

            '<div class="col-sm-10 user_detail_box">' +
            '<a href="#" class="emplyeename_new">' + data.RoleAssignments.results[i].Member.Title + '</a>' +
            '<div class="emilbox">' +
            '<h4>' + data.RoleAssignments.results[i].Member.Email + '</h4>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

    }

    $("#divlistofemployee").html("");
    $("#divlistofemployee").append(Notifyhtml);


}

function SendNotifyEmail() {
    $(".listofemployee input[type=checkbox]:checked").each(function () {
        var row = $(this).closest("div")[0];
        to = [];
        to.push($($(this).closest("div")[0]).find('.emilbox')[0].innerText)

    });

    processSendEmails()
    alert("Notification has been sent.");
    $('.checkse').prop('checked', false); // Unchecks it
    $('#txtMessage').val("");
    $("#notify").modal("hide");


}


function processSendEmails() {

    var body = '<table>' +
        '<tr>' +
        '<td colspan="2"><p style="margin:15px 0; padding:0;">Notification from <span>' + _spPageContextInfo.userDisplayName + '</span> regarding the below document</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b>Name: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileName').text() + '</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b>Title: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileTitle').text() + '</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b>Type: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileDocType').text() + '</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b>Link: </b></p></td>' +
        '<td><a href="' + $('#linkdoc').val() + '">Link here</a></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b>Message: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#txtMessage').val() + '</p></td>' +
        '</tr>' +

        '</table>' +
        '<p style="margin:15px 0; padding:0;">This is an auto generated e-mail. Please do not reply.</p>';

    var subject = "Notification from " + _spPageContextInfo.userDisplayName + " regarding a document";
    var from = "no-reply@sharepointonline.com"; //_spPageContextInfo.userEmail;
    var Metadata;
    Metadata = {
        'properties': {
            '__metadata': {
                'type': 'SP.Utilities.EmailProperties'
            },
            'From': from,
            'To': {
                'results': to
            },

            'Body': body,
            'Subject': subject
        }
    };



    var taMailBody = {
        properties: {
            __metadata: {
                'type': 'SP.Utilities.EmailProperties'
            },
            From: "From: no-reply@sharepointonline.com",
            To: {
                'results': to
            },
            Body: body,
            Subject: subject,
        }
    };



    var sitetemplateurl = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: sitetemplateurl,
        type: "POST",
        data: JSON.stringify(taMailBody),
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            console.log("Message has been sent.");
            //sendEmail(from, to, body, subject);
        },
        error: function (err) {
            //  sendEmail(from, to, body, subject);
            console.log("SendEmailSharedNotification  " + JSON.stringify(err));
        }
    });
}


function RenameFile() {
    var webUrl = withoutLastChunk; // web url
    var listTitle = Documentname; //list title
    var itemId = DocumentId; //list item id
    var fileName = $('#txtRenamefile').val(); //new file name
    rename(webUrl, listTitle, itemId, fileName).done(function (item) {
    	$.when(getSharedDocLinks()).done(function (results) {
	        $.when(getApprovalDocLinks()).done(function (results) {
	        	$("#ModalDisplayProperty").modal('hide');
		        $("#rename").modal('hide');
	        	alert('File has been renamed.');
	        });
        });
    }).fail(function (error) {
        if (error.responseText.includes("Access is denied") == true) {
            alert("You don't have the required permission to perform this operation.");
            return false;
        }
        else {
            alert(error.responseText);
            return false;
        }
    });
}

//get the SharedDoc links Id
function getSharedDocLinks() {
    var Query = "?$select=Id,DocumentURL,DocumentID&$filter=DocumentID eq '" + DocumentId.toString() + "' ";
    $.when(getItemsWithQuery('SharedDocument', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SharingInfo) {
        if (SharingInfo.length > 0) {
            for (var i = 0; i < SharingInfo.length; i++) {
                updateShareLinks(SharingInfo[i].Id, SharingInfo[i].DocumentURL);
            }
        }
    });
}

//update the SharedDocument URL
function updateShareLinks(UpdateId, DocURL) {
    var ListName = "SharedDocument";
    var Metadata;
    var ItemType = GetItemTypeForListName(ListName);
    var UpdateDocURL = '';
    UpdateDocURL = DocURL.substr(0, DocURL.lastIndexOf("/")) + "/" + $("#txtRenamefile").val().trim() + $("#txtFileExt").text();
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#txtRenamefile").val().trim() + $("#txtFileExt").text(),
        DocumentURL: UpdateDocURL
    }
    $.when(updateItemWithIDItemListDocuments(ListName, Metadata, UpdateId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
        console.log("sucessfully URL changed");
    });
}

//get the ApprovalDoc links Id
function getApprovalDocLinks() {
    var Query = "?$select=Title,Id,FileServerURL,FileName,DocumentID&$filter=DocumentID eq '" + DocumentId.toString() + "' and FileName eq '" + OldFileName + "'  ";
    $.when(getItemsWithQuery('DocumentApprovalRequests', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalInfo) {
        if (ApprovalInfo.length > 0) {
            for (var i = 0; i < ApprovalInfo.length; i++) {
                updateApprovalLinks(ApprovalInfo[i].Id, ApprovalInfo[i].FileServerURL);
            }
        }
    });
}

//update the ApprovalDocument URL
function updateApprovalLinks(UpdateId, DocURL) {
    var ListName = "DocumentApprovalRequests";
    var Metadata;
    var ItemType = GetItemTypeForListName(ListName);
    var UpdateDocURL = '';
    UpdateDocURL = DocURL.substr(0, DocURL.lastIndexOf("/")) + "/" + $("#txtRenamefile").val().trim() + $("#txtFileExt").text();
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#txtRenamefile").val().trim() + $("#txtFileExt").text(),
        FileName: $("#txtRenamefile").val().trim() + $("#txtFileExt").text(),
        FileServerURL: UpdateDocURL
    }
    $.when(updateItemWithIDItemListDocuments(ListName, Metadata, UpdateId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
        var Query = "?$select=Title,Id,RequestID&$filter=RequestID eq '" + UpdateId + "' ";
        $.when(getItemsWithQuery('DocumentApprovalQueue', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Approvals) {
            if (Approvals.length > 0) {
                for (var j = 0; j < Approvals.length; j++) {
                    var ListName = "DocumentApprovalQueue";
                    var Metadata;
                    var ItemType = GetItemTypeForListName(ListName);
                    Metadata = {
                        __metadata: {
                            'type': ItemType
                        },
                        Title: $("#txtRenamefile").val().trim() + $("#txtFileExt").text()
                    }
                    $.when(updateItemWithIDItemListDocuments(ListName, Metadata, Approvals[j].Id, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
                        console.log("Approval list link has been updated.");
                    });
                }
            }
        });
    });
}

function rename(webUrl, listTitle, itemId, fileName) {
    if (listTitle == "Shared%20Documents") {
        listTitle = "Documents";
    }
    if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var endpointUrl = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")";
    return executeJson(endpointUrl).then(function (data) {
        var itemPayload = {};
        RequestDigest = $("#__REQUESTDIGEST").val();
        itemPayload['__metadata'] = {
            'type': data.d['__metadata']['type']
        };
        itemPayload['Title'] = fileName;
        itemPayload['FileLeafRef'] = fileName;
        var itemUrl = data.d['__metadata']['uri'];
        var headers = {};
        headers["X-HTTP-Method"] = "MERGE";
        headers["If-Match"] = "*";
        return executeJson(itemUrl, "POST", headers, itemPayload);
    });
}


function moveTo(webUrl, sourceFileUrl, targetFileUrl) {
    if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var endpointUrl = webUrl + "/_api/web/getfilebyserverrelativeurl('" + sourceFileUrl + "')/moveto(newurl='" + targetFileUrl + "',flags=1)";
    return executeJson(endpointUrl, "POST");
}

function Movefile() {
    var webUrl = _spPageContextInfo.webAbsoluteUrl; // web url
    var sourceFileUrl = "/Documents/SP2010.docx";
    var targetFileUrl = "/Documents/SP2013.docx";
    moveTo(webUrl, sourceFileUrl, targetFileUrl).done(function (item) {
        console.log('Done');
    }).fail(function (error) {
        console.log(error);
    });
}


function executeJson(url, method, headers, payload) {
    headers = headers || {};
    method = method || 'GET';
    headers["Accept"] = "application/json;odata=verbose";
    if (method == "POST") {
        headers["X-RequestDigest"] = RequestDigest;
    }
    var ajaxOptions = {
        url: url,
        type: method,
        contentType: "application/json;odata=verbose",
        headers: headers
    };
    if (method == "POST") {
        ajaxOptions.data = JSON.stringify(payload);
        RequestDigest = $("#__REQUESTDIGEST").val();
    }
    return $.ajax(ajaxOptions);
}

function CsvViewer(Url) {
    var data;
    $.ajax({
        type: "GET",
        url: Url,
        dataType: "text",
        success: function (response) {
            generateHtmlTable(response);

        }
    });
}

function generateHtmlTable(data) {
    var allRows = data.split(/\r?\n|\r/);
    var table = '<table>';
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (singleRow === 0) {
            table += '<thead>';
            table += '<tr>';
        } else {
            table += '<tr>';
        }
        var rowCells = allRows[singleRow].split(',');
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            if (singleRow === 0) {
                table += '<th>';
                table += rowCells[rowCell];
                table += '</th>';
            } else {
                table += '<td>';
                table += rowCells[rowCell];
                table += '</td>';
            }
        }
        if (singleRow === 0) {
            table += '</tr>';
            table += '</thead>';
            table += '<tbody>';
        } else {
            table += '</tr>';
        }
    }
    table += '</tbody>';
    table += '</table>';
    $('#doc-viewer').append(table);
}


function Closepopup() {
    clearInterval(IntervalId);
    $("#doc-viewer").empty();
}

//check out any file
function Checkoutfile(Action) {
    var dfd = $.Deferred();
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    $.ajax({
        url: CopySourceURL + "/_api/web/getfilebyserverrelativeurl('" + SelectedFileServerURL + "')/checkout",
        method: "POST",
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest': RequestDigest
        },
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (Action == "") {
                FileCheckOutBy = _spPageContextInfo.userDisplayName;
                alert("File has been locked.");
                $(".LockDisable").attr("disabled", "disabled");
                $("#LockStatus").show();
                $("#btnApproval").hide();
                $("#LockStatus").text("Locked by me");
                $("#lockeffect .texthere").text("Unlock");
                $('#lockeffect .unlock').show();
                $('#lockeffect .lock').hide();
            }
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (Action == "") {
                if (error.responseText.includes("Access denied") == true) {
                    alert("You don't have the required permission to perform this operation.");
                    return false;
                }
                else {
                    alert(error.responseText);
                    return false;
                }
            }
            else {
                console.log(error.responseText);
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Publish the file
function CheckInfile(Action) {
    var dfd = $.Deferred();
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    $.ajax({
        url: CopySourceURL + "/_api/web/GetFileByServerRelativeUrl('" + SelectedFileServerURL + "')/CheckIn()",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (Action == "") {
                FileCheckOutBy = '';
                alert("File has been unlocked.");
                $(".LockDisable").prop("disabled", "");
                if($("#FileApproval").text() == '') {
                	$("#btnApproval").show();
                }
            }
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (Action == "") {
                if (error.responseText.includes("Access denied") == true) {
                    alert("You don't have the required permission to perform this operation.");
                    return false;
                }
                else {
                    alert(error.responseText);
                    return false;
                }
            }
            else {
                console.log(error.responseText);
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
//Publish the file
function UndoCheckOutfile() {
    var dfd = $.Deferred();
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    $.ajax({
        url: CopySourceURL + "/_api/web/GetFileByServerRelativeUrl('" + SelectedFileServerURL + "')/undocheckout()",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            FileCheckOutBy = '';
            alert("File has been unlocked.");
            $(".LockDisable").prop("disabled", "");
            $("#lockeffect").prop("disabled", "");
            $("#lockeffect").show();
            $("#LockStatus").hide();
            $("#btnUndoLock").hide();
            $("#lockeffect .texthere").text("Lock");
            $('#lockeffect .unlock').hide();
            $('#lockeffect .lock').show();
            $("#btnDeleteFile").prop("disabled", "");
            $("#LoackMove").prop("disabled", "");
            $("#btnShareFile").prop("disabled", "");
            $("#btnRenameFile").prop("disabled", "");
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.includes("Access denied") == true) {
                alert("You don't have the required permission to perform this operation.");
                return false;
            }
            else {
                alert(error.responseText);
                return false;
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


//get check out by user name
function getCheckedOutBy() {
    var checkOutBy = '';
    var ServerRelativeUrlofFile = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFileByServerRelativeUrl('" + SelectedFileServerURL + "')/CheckedOutByUser/Title"
    $.ajax({
        url: ServerRelativeUrlofFile,
        type: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            checkOutBy = data.d.Title;
            $("#LockStatus").show();
            $("#LockStatus").text("Locked by me");
            $("#lockeffect .texthere").text("Unlock");
            $('#lockeffect .unlock').show();
            $('#lockeffect .lock').hide();
        },
        error: function (xhr, status, error) {
            $("#LockStatus").hide();
            $("#lockeffect .texthere").text("Lock");
            $('#lockeffect .unlock').hide();
            $('#lockeffect .lock').show();
            console.log(SelectedFileServerURL + "Not checked out");
        }
    });
    return checkOutBy;
}

//get Itemtype of list name 
function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}
function GetItemTypeForLibraryName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "Item";
}

//submit the details in 'DocumentApprovalRequests' list
function AddDocApproval() {
    var Metadata;
    var ItemType = GetItemTypeForListName('DocumentApprovalRequests');
    var FileTitle = $("#FileTitle").text();
    if (FileTitle == "") {
        FileTitle = $("#FileName").text();
    }
    var NextActionAppId = [];
    var arrTempApprovers = [];
    var DueDate = null;
    if ($("#noDueDate").prop('checked') == false) {
        DueDate = GetDateStandardFormat(moment($('#dueDateField').val()).format('DD/MM/YYYY'));
    }

    Metadata = {
        __metadata: {
            'type': ItemType
        },
        OriginDMS: CopyLibrary,
        LibraryLink: CopySourceURL,
        DocumentID: DocumentId,
        FileName: $("#FileName").text(),
        Title: FileTitle,
        DocumentType: $("#FileDocType").text(),
        Reference: $("#FileReference").text(),
        Purpose: $("#txtPurpose").val(),
        ApprovalFileTitle: $("#FileTitle").text(),
        Remarks: $("#txtNote").val(),
        Priority: $("#ddlPriority").val(),
        DueDate: DueDate,
        SigningApp: $("#ddlSign").val(),
        ApprovalSteps: $("#ddlAppStep").val(),
        Status: "Pending",
        FileServerURL: $("#FilePath").text(),
        NextActionbyId: {
            'results': arrTempApprovers
        },
        NextActionApprover: '',
        NextAction: $("#StepName1").text(),
        ApprovedVersion: $("#FileVersion").text(),
        ActionByTimeZone: LoggedIn_TimeZone
    };

    if ($("#ddlSign").val() == "E-Sign") {
        NextActionAppId = $("#EmpIdStep1").text().split(',');
        if (NextActionAppId[0] == "NA") {
            arrTempApprovers = [];
            Metadata["NextActionApprover"] = $("#EmailStep1").text().split(',')[0];
            delete Metadata["NextActionbyId"];
            //ApproverType = "Outsider";
        }
        else {
            //ApproverType = "User";
            NextActionAppId.filter(function (data) {
                arrTempApprovers.push(parseInt(data));
            });
            Metadata["NextActionbyId"].results = arrTempApprovers;
            delete Metadata["NextActionApprover"];
        }
    }
    else {
        delete Metadata["NextAction"];
        delete Metadata["NextActionbyId"];
        delete Metadata["NextActionApprover"];
    }

    // Add metedata to defined SP list
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalRequests')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
        	UploadDocAsAttachment(data.d.ID, DocumentId, parseInt($("#FileVersion").text()).toString());
            AddApprovalSteps(data.d.ID);
        },
        error: function (error) {
            $("#overlaysearch").fadeOut();
            console.log(JSON.stringify(error));
        }
    });
}

//Upload Document library as attachment in 'DocumentApprovalRequests' list
function UploadDocAsAttachment(UploadItemId, DocId, FileVer) {
    // Create XHR, Blob and FileReader objects
    var xhr = new XMLHttpRequest(),
        blob,
        fileReader = new FileReader();

    xhr.open("GET", window.location.origin + $("#FilePath").text(), true);
    // Set the responseType to arraybuffer. "blob" is an option too, rendering manual Blob creation unnecessary, but the support for "blob" is not widespread enough yet
    xhr.responseType = "arraybuffer";
    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            // Create a blob from the response
            var fileName = $("#FileName").text();
            fileName = fileName.replace(/[^a-zA-Z0-9-. ]/g, "");    //Remove Special Char
            fileName = fileName.replace(/\s/g, ""); 
            var FileExt = fileName.substring(fileName.lastIndexOf('.') + 1);
            fileName = encodeURI(fileName.split('.').slice(0, -1).join('.').substring(0, 20) + "_" + DocId + "_V" + FileVer + "_" + UploadItemId + "_Original") + "." + FileExt;
            //blob = new Blob([xhr.response], { type: "image/png" });
            // onload needed since Google Chrome doesn't support addEventListener for FileReader
            //fileReader.onload = function (evt) {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalRequests')/items('" + UploadItemId + "')/AttachmentFiles/ add(FileName='" + fileName + "')",
                    method: "POST",
                    binaryStringRequestBody: true,
                    data: xhr.response,
                    processData: false,
                    headers: {
                        "ACCEPT": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                        //,
                        //"content-length": fileData.byteLength
                    },
                    success: function (data) {
                        AddApprovalSteps(UploadItemId);
                    },
                    error: function (data) {
                    	AddApprovalSteps(UploadItemId);
                        alert("Error occured." + data.responseText);
                    }
                });
            //};
            //fileReader.readAsDataURL(blob);
        }
    }, false);
    // Send XHR
    xhr.send();
}

// Add approval steps in the list - 'DocumentApprovalQueue'
function AddApprovalSteps(ReqID) {
    var arrTempApprovers = [];
    var Metadata;
    var ApproverType = '';
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    var currentStepCount = '';
    $('#accordionapprovers .StepClass').each(function (i) {
        multipleEmailAddress = [];
        assignUserName = [];
        EmpIds = [];
        currentStepCount = this.classList[2].replace("NewStep", "");
        multipleEmailAddress = $("#EmailStep" + currentStepCount).text().split(',');
        assignUserName = $("#NameStep" + currentStepCount).text().split(',');
        EmpIds = $("#EmpIdStep" + currentStepCount).text().split(',');

        arrTempApprovers = [];

        if (EmpIds[0] == "NA") {
            arrTempApprovers = [];
            ApproverType = "Outsider";
        }
        else {
            ApproverType = "User";
            EmpIds.filter(function (data) {
                arrTempApprovers.push(parseInt(data));
            });
        }
        if (i == 0) {
            if ($("#ddlSign").val() == "E-Sign") {
                Status = "Started";
            }
            else {
                Status = "Pending";
            }
        }
        else {
            Status = "Not Started";
        }
        AllApprovers = AllApprovers.concat(arrTempApprovers);
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            RequestID: ReqID,
            Title: $("#FileName").text(),
            Sequence_No: parseInt(i + 1),
            StepName: $("#StepName" + currentStepCount).text(),
            ApproversId: { 'results': arrTempApprovers },
            OriginDMS: CopyLibrary,
            LibraryLink: CopySourceURL,
            DocumentID: DocumentId,
            ApproverType: ApproverType,
            Status: Status
        };
        if (EmpIds[0] == "NA") {
            Metadata["ApproversEmail"] = multipleEmailAddress[0];
            Metadata["ApproversName"] = assignUserName[0];
        }
        AddApprovalToList('DocumentApprovalQueue', Metadata, i, ReqID);
    });
}

// add metedata in SP list
function AddApprovalToList(ListName, Metadata, LoopCount, ReqID) {
    if (ListName == "Shared%20Documents") {
        ListName = "Documents";
    }

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
            if ((LoopCount + 1) == $('#accordionapprovers .StepClass').length) {
                ClearAprovalControls();
                $("#btnApproval").hide();
                $("#btnApprovalHistry").show();
                $("#FileApproval").text("Pending");
                $("#approval-modal").modal('hide');
                UpdateAllApprovers(ReqID);
                dfd.resolve(data);
            }
        },
        error: function (error) {
            $("#overlaysearch").fadeOut();
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

function UpdateDocumentStatus() {
    var dfd = $.Deferred();
    if (CopyLibrary.includes('Documents') == true) {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var ItemType = GetItemTypeForLibraryName(CopyLibrary);
    }
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Approval: "Pending",
        ApprovedVersion: $("#FileVersion").text()
    };
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    $.ajax({
        url: CopySourceURL + "/_api/web/lists/getbytitle('" + CopyLibrary + "')/items(" + DocumentId + ")",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "IF-MATCH": "*",             //Overrite the changes in the sharepoint list item
            "X-HTTP-Method": "MERGE"      // Specifies the update operation in sharepoint list
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            AddDocApproval();
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            $("#overlaysearch").fadeOut();
            if (error.responseText.includes("Access is denied") == true) {
                alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
            }
            else {
                console.log(error.responseText);
            }
            dfd.reject(error);
        }
    });

    return dfd.promise();
}

//Update 'AllApprovers' column while adding steps
function UpdateAllApprovers(ReqId) {
    AllApprovers = AllApprovers.filter(function (item, pos) {
        return AllApprovers.indexOf(item) == pos
    }); //Remove duplicate elements Azure Array

    var ItemType = GetItemTypeForListName('DocumentApprovalRequests');
    var fileName = $("#FileName").text();
    fileName = fileName.replace(/[^a-zA-Z0-9-. ]/g, "");    //Remove Special Char
    fileName = fileName.replace(/\s/g, ""); 
    var FileExt = fileName.substring(fileName.lastIndexOf('.') + 1);
    FileVer = parseInt($("#FileVersion").text()).toString();
    fileName = encodeURI(fileName.split('.').slice(0, -1).join('.').substring(0, 20) + "_" + DocumentId + "_V" + FileVer + "_" + ReqId + "_Original") + "." + FileExt;

    Metadata = {
        __metadata: {
            'type': ItemType
        },
        FileNameWithPrefix: fileName,
        AllApproversId: { 'results': AllApprovers }
    }
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalRequests')/GetItemById('" + ReqId + "')",
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
            AllApprovers = [];
            $("#overlaysearch").fadeOut();
        },
        eror: function (data) {
            console.log("An error occurred while add all Approvers. " + JSON.stringify(data));
        }
    }).fail(function (error) {
        alert(error.responseJSON.error.message.value);
    });
}


function ClearAprovalControls() {
    $("#accordionapprovers .removeDiv").remove();
    $("#userHTMLBox").empty();
    $("#txtPurpose").val('');
    $("#ddlPriority").val('Medium');
    $("#txtNote").val('');
    $("#noDueDate").prop('checked', 'checked');
    $("#dueDateField").prop('disabled', 'disabled');
    $("#dueDateField").val('');
    $("#ddlSign").val('Adobe Sign');
    $("#ddlAppStep").val('Customize');
    $("#ddlAppStep").trigger('change');
    multipleEmailAddress = [];
    assignUserName = [];
    EmpIds = [];
}

function GetDateStandardFormat(date) {
    var dateS = ConvertDateFormatToddMMyyyy(date);
    var startDate = new Date(dateS);
    var day = 60 * 60 * 24 * 1000;
    var endDate = new Date(startDate.getTime());
    var newDate = endDate.toISOString();
    return newDate;
}

function ConvertDateFormatToddMMyyyy(date) {
    var formatedDate = stringToDate(date, 'dd/MM/yyyy', "/")
    return formatedDate;
}

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

//on change people picker
function onChangeTask(HTMLID, PplPickerId, userHTMLId, StepCount) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var StringId = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        user = '';
        if (userInfo.length > 0) {
            $(".userBox").show();
            //$(".peoplepickerbox").show();
            tempUserId = parseInt(getUserInformation(PplPickerId, multipleEmailAddress, assignUserName));
            EmpIds.push(tempUserId);
            var tempEmail = userInfo[0].Key.split('|')[2];
            if (tempEmail.includes('#') == true) {
                tempEmail = tempEmail.replace("#ext#@adaptindia.onmicrosoft.com", '');
                tempEmail = tempEmail.replace("_", '@');
            }
            multipleEmailAddress.push(tempEmail);
            assignUserName.push(userInfo[0].DisplayText);
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
            user += '<div class="col-sm-6 parentremove">';
            user += '<div class="employeesection"><span class="crosebox" onclick="removeUserBox(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');">';
            user += '<i class="fa fa-times"></i></span><div class="empoyeeimg"><img src="' + attachment + '" alt="">';
            user += '</div><div class="employeeinfo"><h3>' + userInfo[0].DisplayText + '</h3>';
            user += '<span class="employeeemail" style="cursor:pointer;" onclick="OpenEmail(\'' + tempEmail + '\');">' + tempEmail + '</span></div></div></div>';
            $("#" + userHTMLId).append(user);
            EmptyPeoplePicker(PplPickerId);
        }
        else {
            //$("#userList").hide();
        }
    };
}


//remove user from each step
function removeUserBox(Action, Email, DisplayName, EmpId, count) {
    $(Action).parents('.parentremove').remove();
    var arrTemp = [];
    var IndexId = count - 1;
    multipleEmailAddress = multipleEmailAddress.filter(function (obj) {
        return obj.toLowerCase() !== Email.toLowerCase();
    });
    assignUserName = assignUserName.filter(function (obj) {
        return obj.toLowerCase() !== DisplayName.toLowerCase();
    });
    EmpIds = EmpIds.filter(function (obj) {
        return obj != EmpId;
    });
    if (multipleEmailAddress.length == 0) {
        $(".userBox").hide();
    }
}

//empty the people picker
function EmptyPeoplePicker(peoplePickerId) {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
    var usersobject = peoplePicker.GetAllUserInfo();
    usersobject.forEach(function (index) {
        peoplePicker.DeleteProcessedUser(usersobject[index]);
    });
}

//to make people picker
function InitializePeoplePicker(peoplePickerElementId, allowMultiple) {
    if (allowMultiple == null) {
        allowMultiple = false;
    }
    var schema = {};
    //schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['PrincipalAccountType'] = 'User';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = allowMultiple;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '100%';
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

//to add more Approval step
function AddMoreStep(EmpEmail, DisplayNames, EmpIds) {
    var StepCount = $('#accordionapprovers .StepClass').length + 1;
    var ApprovalStep = '';
    var StepName = $("#AddEditStepName").val();
    var TypeValue = '';
    var UserValid = true;
    var ValidCount = 0;
    var InValidUser = [];
    if ($("#userselection").prop('checked')) {

        if ($("#ddlSign").val() != "Adobe Sign") {
            for (var usr = 0; usr < EmpIds.length; usr++) {
                UserValid = checkUserValid(EmpEmail[usr]);
                if (UserValid == false) {
                    InValidUser.push(DisplayNames[usr]);
                    EmpEmail = EmpEmail.filter(function (obj) {
                        return obj.toLowerCase() !== EmpEmail[usr].toLowerCase();
                    });
                    DisplayNames = DisplayNames.filter(function (obj) {
                        return obj.toLowerCase() !== DisplayNames[usr].toLowerCase();
                    });
                    EmpIds = EmpIds.filter(function (obj) {
                        return obj != EmpIds[usr];
                    });
                }
            }
        }

        TypeValue = "userselection";
        ApprovalStep += '<li class="StepClass removeDiv NewStep' + StepCount + '">';
        ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">' + EmpEmail.toString() + '</span><span id="EmpIdStep' + StepCount + '">' + EmpIds.toString() + '</span><span id="NameStep' + StepCount + '">' + DisplayNames.toString() + '</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span></div>';
        ApprovalStep += '<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
        ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
        ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
        ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';

        for (var usr = 0; usr < EmpIds.length; usr++) {
            ValidCount++;
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(EmpEmail[usr]);
            ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
            ApprovalStep += '<h4>' + DisplayNames[usr] + '</h4><a href="javascript:void(0);" style="cursor:pointer;" onclick="OpenEmail(\'' + EmpEmail[usr] + '\');">' + EmpEmail[usr] + '</a></div></div>';
        }
        ApprovalStep += '</div></li>';
    }
    else {
        ValidCount++;
        TypeValue = "outsidesetion";
        ApprovalStep += '<li class="StepClass removeDiv NewStep' + StepCount + '">';
        ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">' + $("#OutsiderEmail").val() + '</span><span id="EmpIdStep' + StepCount + '">NA</span><span id="NameStep' + StepCount + '">' + $("#OutsiderName").val() + '</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span></div>';
        ApprovalStep += '<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
        ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
        ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
        ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';
        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly($("#OutsiderEmail").val());
        ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
        ApprovalStep += '<h4>' + $("#OutsiderName").val() + '</h4><a href="javascript:void(0);" style="cursor:pointer;" onclick="OpenEmail(\'' + $("#OutsiderEmail").val() + '\');">' + $("#OutsiderEmail").val() + '</a></div></div>';
        ApprovalStep += '</div></li>';
    }
    if (ValidCount > 0) {
        $("#accordionapprovers").append(ApprovalStep);
        $("#ApprovalStepBox").show();
        $(".userBox").hide();
    }
    if ($("#ddlSign").val() != "Adobe Sign") {
        if (InValidUser.length > 0) {
            alert(InValidUser.join(', ') + " user(s) are not valid.");
        }
    }
}

//Edit the already added step
function EditAddedStep(EmpEmail, DisplayNames, EmpIds) {
    var StepCount = $('#LiCount').text();
    var ApprovalStep = '';
    var StepName = $("#AddEditStepName").val();
    var TypeValue = '';
    var UserValid = true;
    var ValidCount = 0;
    var InValidUser = [];
    if ($("#userselection").prop('checked')) {
        TypeValue = "userselection";
        if ($("#ddlSign").val() != "Adobe Sign") {
            for (var usr = 0; usr < EmpIds.length; usr++) {
                UserValid = checkUserValid(EmpEmail[usr]);
                if (UserValid == false) {
                    InValidUser.push(DisplayNames[usr]);
                    EmpEmail = EmpEmail.filter(function (obj) {
                        return obj.toLowerCase() !== EmpEmail[usr].toLowerCase();
                    });
                    DisplayNames = DisplayNames.filter(function (obj) {
                        return obj.toLowerCase() !== DisplayNames[usr].toLowerCase();
                    });
                    EmpIds = EmpIds.filter(function (obj) {
                        return obj != EmpIds[usr];
                    });
                }
            }
        }

        ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">' + EmpEmail.toString() + '</span><span id="EmpIdStep' + StepCount + '">' + EmpIds.toString() + '</span><span id="NameStep' + StepCount + '">' + DisplayNames.toString() + '</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span></div>';
        ApprovalStep += '<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
        ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
        ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
        ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';

        for (var usr = 0; usr < EmpIds.length; usr++) {
            ValidCount++;
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(EmpEmail[usr]);
            ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
            ApprovalStep += '<h4>' + DisplayNames[usr] + '</h4><a href="javascript:void(0);" style="cursor:pointer;" onclick="OpenEmail(\'' + EmpEmail[usr] + '\');">' + EmpEmail[usr] + '</a></div></div>';
        }
        ApprovalStep += '</div>';
    }
    else {
        ValidCount++;
        TypeValue = "outsidesetion";
        ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">' + $("#OutsiderEmail").val() + '</span><span id="EmpIdStep' + StepCount + '">NA</span><span id="NameStep' + StepCount + '">' + DisplayNames.toString() + '</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span></div>';
        ApprovalStep += '<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
        ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
        ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
        ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';

        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly($("#OutsiderEmail").val());
        ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
        ApprovalStep += '<h4>' + $("#OutsiderName").val() + '</h4><a href="javascript:void(0);" style="cursor:pointer;" onclick="OpenEmail(\'' + $("#OutsiderEmail").val() + '\');">' + $("#OutsiderEmail").val() + '</a></div></div>';
        ApprovalStep += '</div>';
    }
    multipleEmailAddress = [];
    assignUserName = [];
    EmpIds = [];
    if (ValidCount > 0) {
        $('.NewStep' + $("#LiCount").text()).empty().html(ApprovalStep);
        $("#userHTMLBox").empty();
        $("#AddEditStepName").val('');
        $(".userBox").hide();
    }
    if ($("#ddlSign").val() != "Adobe Sign") {
        if (InValidUser.length > 0) {
            alert(InValidUser.join(', ') + " user(s) are not valid.");
        }
    }
}

//to change the approver names and Step name 
function EditStep(StepCount) {
    $("#SuccessorStepHeader").text("Edit Step");
    $("#LiCount").text(StepCount);
    var user = '';
    multipleEmailAddress = [];
    assignUserName = [];
    EmpIds = [];
    multipleEmailAddress = $("#EmailStep" + StepCount).text().split(',');
    assignUserName = $("#NameStep" + StepCount).text().split(',');
    EmpIds = $("#EmpIdStep" + StepCount).text().split(',');
    $("#AddEditStepName").val($("#StepName" + StepCount).text());
    $("#" + $("#TypeStep" + StepCount).text()).prop("checked", "checked");
    if ($("#TypeStep" + StepCount).text() == "outsidesetion") {
        $("#OutsiderName").val(assignUserName[0]);
        $("#OutsiderEmail").val(multipleEmailAddress[0]);
        $("#userbox-1").hide();
        $("#userbox-2").show();
        $("#userHTMLBox").empty();
    }
    else {
        $("#userbox-1").show();
        $("#userbox-2").hide();
        $(".userBox").show();
        $("#OutsiderName").val('');
        $("#OutsiderEmail").val('');
        for (var usr = 0; usr < EmpIds.length ; usr++) {
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(multipleEmailAddress[usr]);
            user += '<div class="col-sm-6 parentremove">';
            user += '<div class="employeesection"><span class="crosebox" onclick="removeUserBox(this, \'' + multipleEmailAddress[usr] + '\', \'' + assignUserName[usr] + '\', ' + EmpIds[usr] + ');">';
            user += '<i class="fa fa-times"></i></span><div class="empoyeeimg"><img src="' + attachment + '" alt="">';
            user += '</div><div class="employeeinfo"><h3>' + assignUserName[usr] + '</h3>';
            user += '<span class="employeeemail" style="cursor:pointer;" onclick="OpenEmail(\'' + multipleEmailAddress[usr] + '\');">' + multipleEmailAddress[usr] + '</span></div></div></div>';
        }
        $("#userHTMLBox").append(user);
    }

}
//to delete the selected step
function DeleteSeletedStep(StepCount) {
    $(".NewStep" + StepCount).remove();
    if ($.trim($("#accordionapprovers").html()) == "") {
        $("#ApprovalStepBox").hide();
    }
}

//get user information from people picker
function getUserInformation(PeoplepickerId, multipleEmailAddress, assignUserName, StepCount) {
    // Get the people picker object from the page. 
    var userIds = [];
    var uniqueValues = [];
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
                users[i].EntityData.Email; users[i].DisplayText;
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



//get user information from people picker
function getApproverEmailIds(PeoplepickerId, arrApproversName) {
    // Get the people picker object from the page.
    var arrEmails = [];
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
                arrEmails.push(users[i].EntityData.Email);
                arrApproversName.push(users[i].DisplayText);
            }
            return arrEmails;
        }
    } else {
        return arrEmails;
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

function OpenEmail(Email) {
    window.location = "mailto:" + Email;
}


//to update the selected properties of the file
function UpdateFileProperties() {
    var dfd = $.Deferred();
    if (CopyLibrary.includes('Documents') == true) {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var ItemType = GetItemTypeForLibraryName(CopyLibrary);
    }
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#txtUpdateTitle").val(),
        DocumentNo: $("#txtUpdateRef").val(),//Reference
        DocumentType: $("#txtUpdateType").val(),
        DocumentWrittenBy: $("#txtUpdateAuthor").val(),
        Details: $("#txtUpdateDetails").val()
    };
    if ($("#chkUpdateTitle").prop('checked') == false) {
        delete Metadata["Title"];
    }
    else {
        $("#FileTitle").text($("#txtUpdateTitle").val());
    }

    if ($("#chkUpdateRef").prop('checked') == false) {
        delete Metadata["DocumentNo"];
    }
    else {
        $("#FileReference").text($("#txtUpdateRef").val());
    }

    if ($("#chkUpdateType").prop('checked') == false) {
        delete Metadata["DocumentType"];
    }
    else {
        $("#FileDocType").text($("#txtUpdateType").val());
    }
    if ($("#chkUpdateAuthor").prop('checked') == false) {
        delete Metadata["DocumentWrittenBy"];
    }
    else {
        $("#FileAuthor").text($("#txtUpdateAuthor").val());
    }

    if ($("#chkUpdateDetails").prop('checked') == false) {
        delete Metadata["Details"];
    }
    else {
        $("#FileDetalis").text($("#txtUpdateDetails").val());
    }
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    $.ajax({
        url: CopySourceURL + "/_api/web/lists/getbytitle('" + CopyLibrary + "')/items(" + DocumentId + ")",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "IF-MATCH": "*",             //Overrite the changes in the sharepoint list item
            "X-HTTP-Method": "MERGE"      // Specifies the update operation in sharepoint list
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            $('.btnCloseProp').trigger('click');
            alert("Properties have been updated.");
            //$("#ModalDisplayProperty").modal('hide');
            $("#btnUpdateProp").prop('disabled', '');
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.indexOf('does not exist on type') != -1 || error.responseText.indexOf('The security validation for this page is i') != -1) {
                alert("Required columns does not exists. Kindly contact administrator.");
            }
            else if (error.responseText.indexOf("Access is denied") != -1) {
                alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
            }
            $("#btnUpdateProp").prop('disabled', '');
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


//bind document type
function bindDocumentType() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$select=CategoryType,CatogeryName&$filter=CategoryType eq 'Document'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        async: false,
        headers: { "Accept": "application/json;odata=verbose" }
    }).then(function mySuccess(response) {
        for (var index = 0; index < response.d.results.length; index++) {
            $("<option value='" + response.d.results[index].CatogeryName + "'>" + response.d.results[index].CatogeryName + "</option>").appendTo("#txtUpdateType");
        }

    }, function myError(response) {
        JSON.stringify(response)
    });
}
var arrayCopy = '';
var currentSigningApp = '';
//Make approval history
function BindApprovalHistory() {
    var AppHistory = '';
    var attachment = '';
    var Visibility = "none";
    AllApprovers = [];
    //Initial Step
    var Query = "?$select=*,Author/EMail,Author/Title&$expand=Author&$top=5000&$filter=DocumentID eq '" + DocumentId + "' ";
    $.when(getItemsWithQuery("DocumentApprovalRequests", Query)).done(function (valuesArray) {
        var PurposeHTML = '<div class="imagecontent"><h4>Purpose:</h4><p class="Purposetext" id="txtPurposeHistory">' + valuesArray[0].Purpose + '</p></div>';
        if (valuesArray[0].Purpose == "" || valuesArray[0].Purpose == null) {
            PurposeHTML = '';
        }
        if (valuesArray[0].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
            Visibility = "block";
        }

        currentSigningApp = valuesArray[0].SigningApp;
        currentRequestId = valuesArray[0].Id;
        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].Author.EMail);
        AppHistory += '<li><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-1.png" alt=""></span>';
        AppHistory += '<div class="approvelheadeing"><h3 class="mainheading">Approval Initiation</h3><h3 class="SignType">Signing Type: ' + valuesArray[0].SigningApp + '</h3><span class="date-sec">' + moment(valuesArray[0].Created).format('DD-MMM-YYYY hh:mm A') + '</span><p class="StanderedTimeZone"> ' + (valuesArray[0].ActionByTimeZone ? valuesArray[0].ActionByTimeZone : "") + '</p></div>';
        AppHistory += '<p class="waitsec initialize">Initiated</p><div class="row"><div class="col-sm-6 flexitem"><div class="imgsetion">';
        AppHistory += '<img src="' + attachment + '" alt=""></div><div class="imagecontent">';
        AppHistory += '<h4 id=InitiatorDisplayName>' + valuesArray[0].Author.Title + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].Author.EMail + '\');">' + valuesArray[0].Author.EMail + '</a>';
        AppHistory += '</div></div><div class="col-sm-6 flexitem">' + PurposeHTML + '</div></div></li>';
    });

    //Approver's Steps
    var Query = "?$select=*,Author/EMail,Author/Title,AttachmentFiles,Approvers/EMail,Approvers/Title,Approvers/Id,ActionTakenby/EMail,ActionTakenby/Title&$expand=Author,Approvers,ActionTakenby,AttachmentFiles&$top=5000&$filter=DocumentID eq '" + DocumentId + "'&$orderby=Sequence_No asc";
    $.when(getItemsWithQuery("DocumentApprovalQueue", Query)).done(function (valuesArray) {
        arrayCopy = valuesArray.filter(function (f) { return f; });
        for (var step = 0; step < valuesArray.length; step++) {
            if (valuesArray[step].Status == "Started") {
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt=""></span>';
                AppHistory += '<div class="dropdown"><button class="dropdown-toggle" type="button" style="display:' + Visibility + '" data-toggle="dropdown">';
                AppHistory += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt=""></button><ul class="dropdown-menu pull-right">';
                AppHistory += '<li><a href="javascript:void(0);" onclick="OpenNotifyPopup(' + step + ', ' + valuesArray[step].Id + ');"><i class="fa fa-envelope-o" aria-hidden="true"></i> Send Notification';
                AppHistory += '</a></li><li style="display:none;"><a href="javascript:void(0);" onclick="DeleteStep(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i> Remove this Step</a></li><li>';
                AppHistory += '<a href="javascript:void(0);" onclick="OpenSuccessorModal(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-plus" aria-hidden="true"></i> Add a successor step</a></li>';
                AppHistory += '<li style="display:none;"><a href="javascript:void(0);" onclick="AddApprovers(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-users" aria-hidden="true"></i> Change Approvers </a>';
                AppHistory += '</li></ul></div><div class="approvelheadeing"><h3 class="mainheading">' + valuesArray[step].StepName + '</h3></div>';
                AppHistory += '<p class="waitsec waitprocess" style="color:#e79406">Started, waiting for e-sign</p><div class="row">';

                if (valuesArray[step].Approvers.results != null) {
                    for (Appr = 0; Appr < valuesArray[step].Approvers.results.length; Appr++) {
                        AllApprovers.push(valuesArray[step].Approvers.results[Appr].Id);
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].Approvers.results[Appr].EMail);
                        AppHistory += '<div class="col-sm-6 flexitem">';
                        AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                        AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].Approvers.results[Appr].Title + '</h4>';
                        AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].Approvers.results[Appr].EMail + '\');">' + valuesArray[step].Approvers.results[Appr].EMail + '</a></div></div>';
                    }
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ApproversEmail);
                    AppHistory += '<div class="col-sm-6 flexitem">';
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                    AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].ApproversName + '</h4>';
                    AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ApproversEmail + '\');">' + valuesArray[step].ApproversEmail + '</a></div></div>';
                }
                AppHistory += '</div></li>';
            }
            else if (valuesArray[step].Status == "Pending") {
                arrayCopy = valuesArray.filter(function (f) { return f; });
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-2.png" alt=""></span>';
                AppHistory += '<div class="dropdown"><button class="dropdown-toggle"  style="display:' + Visibility + '" type="button" data-toggle="dropdown">';
                AppHistory += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt=""></button><ul class="dropdown-menu pull-right">';
                AppHistory += '<li><a href="javascript:void(0);" onclick="OpenNotifyPopup(' + step + ', ' + valuesArray[step].Id + ');"><i class="fa fa-envelope-o" aria-hidden="true"></i> Send Notification';
                AppHistory += '</a></li><li style="display:none;"><a href="javascript:void(0);" onclick="DeleteStep(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i> Remove this Step</a></li><li>';
                AppHistory += '<a href="javascript:void(0);" onclick="OpenSuccessorModal(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-plus" aria-hidden="true"></i> Add a successor step</a></li>';
                AppHistory += '<li style="display:none;"><a href="javascript:void(0);" onclick="AddApprovers(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-users" aria-hidden="true"></i> Change Approvers </a>';
                AppHistory += '</li></ul></div><div class="approvelheadeing"><h3 class="mainheading">' + valuesArray[step].StepName + '</h3></div>';
                AppHistory += '<p class="waitsec nostart">Pending</p><div class="row">';
                if (valuesArray[step].Approvers.results != null) {
                    for (Appr = 0; Appr < valuesArray[step].Approvers.results.length; Appr++) {
                        AllApprovers.push(valuesArray[step].Approvers.results[Appr].Id);
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].Approvers.results[Appr].EMail);
                        AppHistory += '<div class="col-sm-6 flexitem">';
                        AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                        AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].Approvers.results[Appr].Title + '</h4>';
                        AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].Approvers.results[Appr].EMail + '\');">' + valuesArray[step].Approvers.results[Appr].EMail + '</a></div></div>';
                    }
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ApproversEmail);
                    AppHistory += '<div class="col-sm-6 flexitem">';
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                    AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].ApproversName + '</h4>';
                    AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ApproversEmail + '\');">' + valuesArray[step].ApproversEmail + '</a></div></div>';
                }
                AppHistory += '</div></li>';
            }

            else if (valuesArray[step].Status == "Not Started") {
                arrayCopy = valuesArray.filter(function (f) { return f; });
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-2.png" alt=""></span>';
                AppHistory += '<div class="dropdown"><button class="dropdown-toggle"  style="display:' + Visibility + '" type="button" data-toggle="dropdown">';
                AppHistory += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt=""></button><ul class="dropdown-menu pull-right">';
                AppHistory += '<li><a href="javascript:void(0);" onclick="OpenNotifyPopup(' + step + ', ' + valuesArray[step].Id + ');"><i class="fa fa-envelope-o" aria-hidden="true"></i> Send Notification';
                AppHistory += '</a></li><li><a href="javascript:void(0);" onclick="DeleteStep(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i> Remove this Step</a></li><li>';
                AppHistory += '<a href="javascript:void(0);" onclick="OpenSuccessorModal(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-plus" aria-hidden="true"></i> Add a successor step</a></li>';
                AppHistory += '<li><a href="javascript:void(0);" onclick="AddApprovers(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-users" aria-hidden="true"></i> Change Approvers </a>';
                AppHistory += '</li></ul></div><div class="approvelheadeing"><h3 class="mainheading">' + valuesArray[step].StepName + '</h3></div>';
                AppHistory += '<p class="waitsec nostart">Not Started</p><div class="row">';
                if (valuesArray[step].Approvers.results != null) {
                    for (Appr = 0; Appr < valuesArray[step].Approvers.results.length; Appr++) {
                        AllApprovers.push(valuesArray[step].Approvers.results[Appr].Id);
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].Approvers.results[Appr].EMail);
                        AppHistory += '<div class="col-sm-6 flexitem">';
                        AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                        AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].Approvers.results[Appr].Title + '</h4>';
                        AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].Approvers.results[Appr].EMail + '\');">' + valuesArray[step].Approvers.results[Appr].EMail + '</a></div></div>';
                    }
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ApproversEmail);
                    AppHistory += '<div class="col-sm-6 flexitem">';
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                    AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].ApproversName + '</h4>';
                    AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ApproversEmail + '\');">' + valuesArray[step].ApproversEmail + '</a></div></div>';
                }
                AppHistory += '</div></li>';
            }
            else if (valuesArray[step].Status == "Approved") {
                var SignLinkHTML = '';
                if (valuesArray[step].AttachmentFiles.results.length > 0) {
                    for (var attach = 0; attach < valuesArray[step].AttachmentFiles.results.length; attach++) {
                        if (valuesArray[step].AttachmentFiles.results[attach].FileName.includes(".pdf") == true) { //to check if it's PDF
                            SignLinkHTML += '<div class="m-0  upload-chip" style="float:right;">';
                            SignLinkHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;" title="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);" id="btnLinkAttachment">' + valuesArray[step].AttachmentFiles.results[attach].FileName + '</span>';
                            SignLinkHTML += '<span class="chip-icon-box"><a href="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" name="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>';
                            SignLinkHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
                        }
                        else {
                            SignLinkHTML += '<img class="ApproveSignImage" style="width:310px;float:right;" src="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativePath.DecodedUrl + '" title="' + valuesArray[step].AttachmentFiles.results[attach].FileName + '">';
                        }
                    }
                }
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt=""></span>';
                AppHistory += '<div class="approvelheadeing"><h3 class="mainheading">' + valuesArray[step].StepName + '</h3><span class="date-sec">' + moment(valuesArray[step].Modified).format('DD-MMM-YYYY hh:mm A') + '<p> ' + (valuesArray[step].ActionByTimeZone ? valuesArray[step].ActionByTimeZone : "") + '</p></span>';
                AppHistory += '</div><p class="waitsec completed" style="color:#4e9a06">Approved by e-Signed</p><div class="row"><div class="col-sm-6 flexitem">';
                if (valuesArray[step].ApproverType == "User") {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ActionTakenby.EMail);
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                    AppHistory += '<h4>' + valuesArray[step].ActionTakenby.Title + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ActionTakenby.EMail + '\');">' + valuesArray[step].ActionTakenby.EMail + '</a></div></div>';
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ActionTakenbyApprover);
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                    AppHistory += '<h4>' + valuesArray[step].ApproversName + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ActionTakenbyApprover + '\');">' + valuesArray[step].ActionTakenbyApprover + '</a></div></div>';
                }
                if (valuesArray[step].Remarks != "" && valuesArray[step].Remarks != null) {
                    AppHistory += '<div class="col-sm-6 flexitem ApproveAttach"><div class="remarkBox">Remarks: <span class="ActionRemarks">' + valuesArray[step].Remarks + '</div><div class="signbox">' + SignLinkHTML + '<img src="reference/sign.png" alt=""></div></div></div></li>';
                }
                else {
                    AppHistory += '<div class="col-sm-6 flexitem ApproveAttach"><div class="signbox">' + SignLinkHTML + '</div></div></div></li>';
                }
            }
            else if (valuesArray[step].Status == "Reject") {
                var SignLinkHTML = '';
                if (valuesArray[step].AttachmentFiles.results.length > 0) {
                    SignLinkHTML += '<div class="m-0  upload-chip" style="float:right;">';
                    SignLinkHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;" title="' + valuesArray[step].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);" id="btnLinkAttachment">' + valuesArray[step].AttachmentFiles.results[0].FileName + '</span>';
                    SignLinkHTML += '<span class="chip-icon-box"><a href="' + valuesArray[step].AttachmentFiles.results[0].ServerRelativeUrl + '" name="' + valuesArray[step].AttachmentFiles.results[0].ServerRelativeUrl + '" download>';
                    SignLinkHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
                }
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt=""></span>';
                AppHistory += '<div class="approvelheadeing"><h3 class="mainheading">' + valuesArray[step].StepName + '</h3><span class="date-sec">' + moment(valuesArray[step].Modified).format('DD-MMM-YYYY hh:mm A') + '<p> ' + (valuesArray[step].ActionByTimeZone ? valuesArray[step].ActionByTimeZone : "") + '</p></span>';
                AppHistory += '</div><p class="waitsec completed" style="color:red">Rejected by e-Signed</p>' + SignLinkHTML + '<div class="row"><div class="col-sm-6 flexitem">';
                if (valuesArray[step].ApproverType == "User") {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ActionTakenby.EMail);
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                    AppHistory += '<h4>' + valuesArray[step].ActionTakenby.Title + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ActionTakenby.EMail + '\');">' + valuesArray[step].ActionTakenby.EMail + '</a></div></div>';
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ActionTakenbyApprover);
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                    AppHistory += '<h4>' + valuesArray[step].ApproversName + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ActionTakenbyApprover + '\');">' + valuesArray[step].ActionTakenbyApprover + '</a></div></div>';
                }
                AppHistory += '<div class="col-sm-6 flexitem"><div class="signbox"><img src="reference/sign.png" alt=""></div></div>';
                AppHistory += '<div class="col-sm-6 flexitem"><div class="imagecontent"><h4>Purpose:</h4>';
                AppHistory += '<p class="Purposetext">' + valuesArray[step].Remarks + '</p></div></div>';
                AppHistory += '</div></li>';
            }
        }
    });
    $("#ApprovalHistoryArea").empty().append(AppHistory);
}

function priviewfile(Action) {
    src = Action.name + "?web=1";
    if (Action.name == null) {
        src = Action.title + "?web=1";
    }
    var container = $("#sign-viewer").empty();
    $('<iframe>', {
        src: src,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
}

function AddApprovers(Index, currentSequence) {
    $("#AddSuccStep").hide();
    $("#AddEditStep").hide();
    $("#btnChangeApprovers").show();
    onChangeTask('ApproverName_TopSpan', 'ApproverName', 'userHTMLBox', 1);
    $("#addsuccessor").modal("show");
    BindApprovers(arrayCopy[Index], Index, currentSequence, arrayCopy);
}


function BindApprovers(valuesArray, Index, currentSequence, CompleteArray) {
    $("#SuccessorStepHeader").text("Edit Step");
    var user = '';
    multipleEmailAddress = [];
    assignUserName = [];
    EmpIds = [];
    $("#AddEditStepName").val(valuesArray.StepName);
    if (valuesArray.Approvers.results != null) {//User value
        $("#userselection").prop("checked", "checked");
        $("#userbox-1").show();
        $("#userbox-2").hide();
        $(".userBox").show();
        $("#OutsiderName").val('');
        $("#OutsiderEmail").val('');
        for (var usr = 0; usr < valuesArray.Approvers.results.length; usr++) {
            multipleEmailAddress.push(valuesArray.Approvers.results[usr].EMail);
            assignUserName.push(valuesArray.Approvers.results[usr].Title);
            EmpIds.push(valuesArray.Approvers.results[usr].Id);
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray.Approvers.results[usr].EMail);
            user += '<div class="col-sm-6 parentremove">';
            user += '<div class="employeesection"><span class="crosebox" onclick="removeUserBox(this, \'' + valuesArray.Approvers.results[usr].EMail + '\', \'' + valuesArray.Approvers.results[usr].Title + '\', ' + valuesArray.Approvers.results[usr].Id + ');">';
            user += '<i class="fa fa-times"></i></span><div class="empoyeeimg"><img src="' + attachment + '" alt="">';
            user += '</div><div class="employeeinfo"><h3>' + valuesArray.Approvers.results[usr].Title + '</h3>';
            user += '<span class="employeeemail" style="cursor:pointer;" onclick="OpenEmail(\'' + valuesArray.Approvers.results[usr].EMail + '\');">' + valuesArray.Approvers.results[usr].EMail + '</span></div></div></div>';
        }
        $("#userHTMLBox").empty().append(user);
    }
    else { //OutsiderValue
        $("#outsidesetion").prop("checked", "checked");
        $("#OutsiderName").val(valuesArray.ApproversName);
        $("#OutsiderEmail").val(valuesArray.ApproversEmail);
        $("#userbox-1").hide();
        $("#userbox-2").show();
        $("#userHTMLBox").empty();
        multipleEmailAddress.push(valuesArray.ApproversEmail);
        assignUserName.push(valuesArray.ApproversName);
        EmpIds.push("NA");
    }
    $("#parentChangeApp").empty().append('<button type="button" class="btn custom-btn" id="btnChangeApprovers">Change Approvers</button>');
    $("#btnChangeApprovers").click(function () {
        if ($.trim($("#AddEditStepName").val()) != "") {
            if ($("#userHTMLBox").html() != "") {
                updateApprovers(valuesArray.Id);
            }
            else {
                if ($.trim($("#OutsiderName").val()) != "" && $.trim($("#OutsiderEmail").val()) && isEmail($("#OutsiderEmail").val()) != false) {
                    updateApprovers(valuesArray.Id);
                }
                else {
                    alert("Kindly fill the approver's name or correct the email format.");
                    return false;
                }
            }
            $(".closeAddEditModal").trigger('click');
        }
        else {
            alert("Kindly enter the Step Name.");
            return false;
        }
    });
}


//Change approvers functionality
function updateApprovers(UpdateId, ChangedType) {
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    var arrTempApprovers = [];
    var ChangedType = '';
    var InValidUser = [];
    if (currentSigningApp != "Adobe Sign") {
        for (var usr = 0; usr < EmpIds.length; usr++) {
            UserValid = checkUserValid(multipleEmailAddress[usr]);
            if (UserValid == false) {
                InValidUser.push(assignUserName[usr]);
                multipleEmailAddress = multipleEmailAddress.filter(function (obj) {
                    return obj.toLowerCase() !== multipleEmailAddress[usr].toLowerCase();
                });
                assignUserName = assignUserName.filter(function (obj) {
                    return obj.toLowerCase() !== assignUserName[usr].toLowerCase();
                });
                EmpIds = EmpIds.filter(function (obj) {
                    return obj != EmpIds[usr];
                });
            }
        }
    }
    if (currentSigningApp != "Adobe Sign") {
        if (InValidUser.length > 0) {
            alert(InValidUser.join(', ') + " user(s) are not valid.");
        }
    }

    if (EmpIds.length > 0) {
        if (EmpIds[0] != "NA" && EmpIds[0] != null) {
            ChangedType = 'User';
            EmpIds.filter(function (data) {
                arrTempApprovers.push(parseInt(data));
            });
        }
        else {
            ChangedType = 'Outsider';
        }
        AllApprovers = AllApprovers.concat(arrTempApprovers);
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            StepName: $("#AddEditStepName").val(),
            ApproversId: { 'results': arrTempApprovers },
            ApproverType: ChangedType
        }
        if (EmpIds[0] == "NA" || EmpIds[0] == null) {
            Metadata["ApproversEmail"] = $("#OutsiderEmail").val();
            Metadata["ApproversName"] = $("#OutsiderEmail").val();
        }

        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalQueue')/GetItemById('" + UpdateId + "')",
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
                alert("Approver(s) has been changed.");
                $("#addsuccessor").modal('hide');
                UpdateAllApprovers(currentRequestId);
                BindApprovalHistory();
            },
            eror: function (data) {
                console.log("An error occurred while changing approvers. " + JSON.stringify(data));
            }
        });
    }
    else {
        alert("Kindly fill the approver's name or correct the email format.");
        return false;
    }
}

//delete the Step
function DeleteStep(Index, currentSequence) {
    if (confirm('Are you sure to delete this step?')) {
        if (arrayCopy[Index].Approvers.results != null) {
            for (usr = 0; usr < arrayCopy[Index].Approvers.results.length; usr++) {
                AllApprovers = AllApprovers.filter(function (item, index, inputArray) {
                    return inputArray.indexOf(item) == index;
                });
            }
        }
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DocumentApprovalQueue')/items(" + arrayCopy[Index].Id + ")",
            type: "POST",
            headers: {
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            success: function (data) {
                var arrUpdateIds = [];
                var arrSeq = [];
                for (var j = Index + 1; j < arrayCopy.length; j++) {
                    arrUpdateIds.push(arrayCopy[j].Id);
                    arrSeq.push(arrayCopy[j].Sequence_No);
                }
                ChangeSequenceSumber("Subtract", arrSeq, arrUpdateIds);
                UpdateAllApprovers(arrayCopy[0].RequestID);
                BindApprovalHistory();
                alert("Selected step has been deleted successfully.");
            },
            error: function (data) {
                alert(data.responseJSON.error);
            }
        });
    }
}



//Add a successor step
function OpenSuccessorModal(Index, currentSequence) {
    $("#AddSuccStep").show();
    $("#AddEditStep").hide();
    $("#btnChangeApprovers").hide();
    onChangeTask('ApproverName_TopSpan', 'ApproverName', 'userHTMLBox', 1);
    $("#parentAddSuccStep").empty().append('<button type="button" class="btn custom-btn" id="AddSuccStep">Add Successor step</button>');
    $("#addsuccessor").modal("show");
    $("#AddSuccStep").click(function () {
        if ($.trim($("#AddEditStepName").val()) != "") {
            if ($("#userHTMLBox").html() != "") {
                AddSuccessorStep(arrayCopy[Index], Index, currentSequence, arrayCopy);
            }
            else {
                if ($.trim($("#OutsiderName").val()) != "" && $.trim($("#OutsiderEmail").val()) && isEmail($("#OutsiderEmail").val()) != false) {
                    AddSuccessorStep(arrayCopy[Index], Index, currentSequence, arrayCopy);
                }
                else {
                    alert("Kindly fill the approver's name or correct the email format.");
                    return false;
                }
            }
            $(".closeAddEditModal").trigger('click');
        }
        else {
            alert("Kindly enter the Step Name.");
            return false;
        }
    });
}

//to add SuccesorStep 
function AddSuccessorStep(valuesArray, Index, currentSequence, CompleteArray) {
    //var StepCount = $('#accordionapprovers .StepClass').length + 1;
    var ApprovalStep = '',
        AppHistory = '',
        ApproverType = '',
        arrTempApprovers = [],
        step = parseInt(Index) + 1,
        AddedSequence = parseInt(currentSequence) + 1,
        StepName = $("#AddEditStepName").val();

    //Add new Sequence in list starts
    if (EmpIds[0] == "NA" || EmpIds[0] == null) {
        arrTempApprovers = [];
        ApproverType = "Outsider";
    }
    else {
        ApproverType = "User";
        EmpIds.filter(function (data) {
            arrTempApprovers.push(parseInt(data));
        });
    }
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    AllApprovers = AllApprovers.concat(arrTempApprovers);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        RequestID: valuesArray.RequestID,
        Title: $("#FileName").text(),
        Sequence_No: AddedSequence,
        StepName: StepName,
        ApproversId: { 'results': arrTempApprovers },
        OriginDMS: CopyLibrary,
        LibraryLink: CopySourceURL,
        DocumentID: DocumentId,
        ApproverType: ApproverType,
        Status: "Not Started"
    };
    if (EmpIds[0] == "NA" || EmpIds[0] == null) {
        Metadata["ApproversEmail"] = $("#OutsiderEmail").val();
        Metadata["ApproversName"] = $("#OutsiderName").val();
    }
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalQueue')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            var arrUpdateIds = [];
            var arrSeq = [];
            for (var j = Index + 1; j < CompleteArray.length; j++) {
                arrUpdateIds.push(CompleteArray[j].Id);
                arrSeq.push(CompleteArray[j].Sequence_No);
            }
            ChangeSequenceSumber("Add", arrSeq, arrUpdateIds);
            UpdateAllApprovers(CompleteArray[0].RequestID);
            $("#addsuccessor").modal('hide');
            BindApprovalHistory();
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    $(".closeAddEditModal").trigger('click');
}


//update Sequence number when adding/removing any step
function ChangeSequenceSumber(Action, arrSeq, UpdateIds) {
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    var NewSeqNo = 0;
    for (var id = 0; id < UpdateIds.length; id++) {
        if (Action == "Add") {
            NewSeqNo = arrSeq[id] + 1;
        }
        else {
            NewSeqNo = arrSeq[id] - 1;
        }
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Sequence_No: parseInt(NewSeqNo)
        }
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalQueue')/GetItemById('" + UpdateIds[id] + "')",
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
                //DO nothing
            },
            eror: function (data) {
                console.log("An error occurred while deleting task. " + JSON.stringify(data));
            }
        });
    }
}

//to open and pass values for sending mail
function OpenNotifyPopup(Index, ItemId) {
    $("#notificationbtn").modal("show");
    EmptyPeoplePicker("NotifyMailPicker");
    $("#SendMailFooter").empty().append('<button type="button" class="btn custom-btn" id="btnSendNotify">Submit</button>');
    if (arrayCopy[Index].Approvers.results != null) {
        for (Appr = 0; Appr < arrayCopy[Index].Approvers.results.length; Appr++) {
            SetAndResolvePeoplePicker('NotifyMailPicker', arrayCopy[Index].Approvers.results[Appr].EMail, false); //set Approvers in Send Notify modal
        }
    }
    $("#btnSendNotify").click(function () {
        if ($.trim($("#txtNotifyMsg").val()) != "") {
            SendEmail(arrayCopy[Index], ItemId);
        }
        else {
            alert("Kindly enter your message.");
            return false;
        }
    });
}

//get email template to send mail
function GetEmailTemplate(filterItemId) {
    var items = [];
    var RestQuery = "?$select=ID,Body,Subject,EmailType,Title&$filter=Title eq '" + filterItemId + "'";
    $.when(getItemsWithQuery("EmailTemplate", RestQuery)).done(function (EmailTemplate) {
        items = EmailTemplate;
    });
    return items;
}


//send email notification to Approvers
function SendEmail(valuesArray, ItemId) {
    var arrToUserEmail = [];
    var arrApproversName = [];
    var arrTempEmail = [];
    DashboardLink = _spPageContextInfo.webAbsoluteUrl + "/Pages/Document.aspx";
    arrToUserEmail = getApproverEmailIds("NotifyMailPicker", arrApproversName);
    if (arrToUserEmail.length != 0) {
        //get Adobe sign URL for approververs
        for (var appr = 0; appr < arrToUserEmail.length; appr++) {
            var arrTemplate = GetEmailTemplate(12);
            var commonBodyContentsNotification = arrTemplate[0].Body;
            var emailSubject = arrTemplate[0].Subject;
            emailSubject = emailSubject.replace("{{InitiatorName}}", $("#InitiatorDisplayName").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{FileName}}", $("#FileName").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{DocType}}", $("#FileDocType").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{Purpose}}", $("#txtPurposeHistory").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{Approvers}}", arrApproversName.toString());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{StepName}}", valuesArray.StepName);
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{InitiatorName}}", $("#InitiatorDisplayName").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{InitiatorName}}", $("#InitiatorDisplayName").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{description}}", $("#txtNotifyMsg").val());
            var AdobeSignLink = getSignLink(arrToUserEmail[appr], ItemId);
            arrTempEmail = [];
            arrTempEmail.push(arrToUserEmail[appr]);
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{FilePath}}", DashboardLink);
            /*if (AdobeSignLink != "" && AdobeSignLink != null) {
                commonBodyContentsNotification = commonBodyContentsNotification.replace("{{FilePath}}", AdobeSignLink);
            }
            else {
                commonBodyContentsNotification = commonBodyContentsNotification.replace('<div><a href="{{FilePath}}">Click here</a> to approve this request.</div>', "");
            }*/
            var Metadata;
            Metadata = {
                'properties': {
                    '__metadata': {
                        'type': 'SP.Utilities.EmailProperties'
                    },
                    'From': _spPageContextInfo.userEmail,
                    'To': {
                        'results': arrTempEmail
                    },
                    /*'CC': {
                        'results': taskCCUsersUsers
                    },*/
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
                    if (arrToUserEmail.length == (appr + 1)) {
                        alert("Message has been sent.");
                        $("#notificationbtn").modal("hide");
                        $("#txtNotifyMsg").val('');
                    }
                },
                error: function (err) {
                    console.log("SendEmailSharedNotification  " + JSON.stringify(err));
                }
            });
        }
    }
    else {
        alert("Kindly enter approver's name.");
        return false;
    }
}

//get Adobe sign link for approvers
function getSignLink(ApproverEmail, ItemId) {
    var SignLink = '';
    var Query = "?$select=ItemID,ApproverSignLink,ApproversEmail&$filter=ItemID eq '" + ItemId + "' and ApproversEmail eq '" + ApproverEmail + "' ";
    $.when(getItemsWithQuery("DocumentSigningLink", Query)).done(function (AdobeLink) {
        if (AdobeLink.length > 0) {
            SignLink = AdobeLink[0].ApproverSignLink.Url;
        }
    });
    return SignLink;
}

//set name in People picker
function SetAndResolvePeoplePicker(controlNameID, LoginNameOrEmail, peoplePickerDisable) {
    var peoplePickerDiv = $("[id^='" + controlNameID + "']");
    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
    peoplePicker.AddUserKeys(LoginNameOrEmail);
    if (peoplePickerDisable == true) {
        $('#' + controlNameID + '_TopSpan_EditorInput').attr('disabled', true);
        $('.sp-peoplepicker-delImage').hide();
    }
}


//Check if Document is added to favorite
function checkFavoriteFile() {
    var Query = "?$select=*,Id,Title,User/Id,User/EMail&$expand=User&$filter=Category eq 'Document' and FileName eq '" + $("#FileName").text() + "' and User/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery('MyFavorites', Query)).done(function (FavResults) {
        if (FavResults.length > 0) {
            FavouriteId = FavResults[0].Id;
            $("#txtFavorite").text("Delete from Favorite");
            $('.unfillstar').hide();
            $('.fillstar').show();
        }
    });
}

//Get Librray Name of Favorite files
function getfavoriteType() {
    var ShareType = '';
    if ($('#LibProject').text() == "My Documents") {
    	ShareType = "My-DMS: " + _spPageContextInfo.userDisplayName;
    }
    else if ($('#LibProject').text().indexOf('Department') != -1) {
    	ShareType = "Department: " + $('#LibProject').text().split(': ')[1];
    }
    else if ($('#LibProject').text().indexOf('Custom') != -1) {
    	ShareType = "Group: " + $('#LibProject').text().split(': ')[1];
    }
    else if ($('#LibProject').text().indexOf('Project') != -1) {
    	ShareType = "Project: " + $('#LibProject').text().split(': ')[1];
    }
    else if ($('#LibProject').text().indexOf('Guest Client') != -1) {
    	ShareType = "Guest: " + $('#LibProject').text().split(': ')[1];
    }
    return ShareType;
}


//Add to favorite
function AddFavoriteFile() {
	var ShareType = getfavoriteType();
    var Metadata;
    Metadata = {
        __metadata: { 'type': 'SP.Data.MyFavoritesListItem' },
        'Title': $("#FileName").text(),
        'Name': $("#FileName").text(),
        'FileName': $("#FileName").text(),
        'Category': 'Document',
        'Link': '',
        'UserId': _spPageContextInfo.userId,
        'SiteLink': CopySourceURL,
        'DMSName': CopyLibrary,
        'DocumentID': DocumentId,
        'DocumentLink': $(".txtCopyLink").val(),
        'LibraryName': ShareType,
        'Icon': {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': '',
            'Url': _spPageContextInfo.webAbsoluteUrl + '/SiteAssets/MyFavorite/Images/fav-document.png'
        },
        'Active': true
    };
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MyFavorites')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            FavouriteId = data.d.Id;
            $('.unfillstar').hide();
            $('.fillstar').show();
            $("#txtFavorite").text("Delete from Favorite");
            //alert("Added to favorite.");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


function DeleteFromFavourite() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MyFavorites')/items(" + FavouriteId + ")",
        type: "POST",
        headers: {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data) {
            $('.unfillstar').show();
            $('.fillstar').hide();
            $("#txtFavorite").text("Add to Favorite");
        },
        error: function (data) {
            alert(data.responseJSON.error);
        }
    });
}

//get PDF of Final Approved version
function FinalApprovalFile() {
    var FileHTML = '';
    var Query = "?$select=*,Author/EMail,Author/Title,AttachmentFiles&$expand=Author,AttachmentFiles&$top=5000&$filter=DocumentID eq '" + DocumentId + "' ";
    $.when(getItemsWithQuery("DocumentApprovalRequests", Query)).done(function (valuesArray) {
        if(valuesArray.length > 0) {
	        if (valuesArray[0].AttachmentFiles.results.length > 0) {
	        	for (var k = 0; k < valuesArray[0].AttachmentFiles.results.length; k++) {
	        		Filename = valuesArray[0].AttachmentFiles.results[k].FileName;
	        		if(Filename.indexOf("_Approved") !== -1) {
			            FileHTML += '<div class="m-0  upload-chip" style="float:right;">';
			            FileHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;" title="' + valuesArray[0].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);" id="btnLinkAttachment">' + valuesArray[0].AttachmentFiles.results[k].FileName + '</span>';
			            FileHTML += '<span class="chip-icon-box"><a href="' + valuesArray[0].AttachmentFiles.results[k].ServerRelativeUrl + '" name="' + valuesArray[0].AttachmentFiles.results[k].ServerRelativeUrl + '" download>';
			            FileHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
			        }
		        }
	        }
	    }
        $("#FileApprovalPDF").empty().append(FileHTML);
    });
}

//check if user is valid or not
function checkUserValid(Email) {
    var IsUserValid = false;
    var RestQuery = "?$select=Status,LogonName/EMail&$expand=LogonName&$filter= Status eq 'Active' and LogonName/EMail eq '" + Email + "'&$top=5000";
    $.when(getItemsWithQuery("Employees", RestQuery)).done(function (Employees) {
        try {
            if (Employees.length > 0) {
                IsUserValid = true;
            }
        }
        catch (e) {
            alert(e);
        }
    });
    return IsUserValid;
}

//get Request_Digest for different Sites
function GetFormDigestValue(SiteUrl) {
    // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
    // You can replace this with other site URL where you want to apply the function
    var dfd = $.Deferred();
    $.ajax({
        url: SiteUrl + "/_api/contextinfo",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function (data) {
            var FormDigestValue = data.d.GetContextWebInformation.FormDigestValue;
            dfd.resolve(FormDigestValue);
            console.log(FormDigestValue);
        },
        error: function (xhr, status, error) {
            console.log("Failed");
        }
    });
    return dfd.promise();
}
