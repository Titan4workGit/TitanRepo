var app = angular.module('myApp', []);
var departmentID = "";
var companyID = "";
var sourcelocation = "";
var itemID = "";
var fileName = "";
var arrMetadata=[];
var commonserverRedirectedEmbedUri = "";
var currentUserIsDepartmentOwner = false;
var approvelRequiredForDocuments = "Approved";
var documentApproverUserIdArrayList = [];
var emailBodyContent = "";
var sharedEmailSubject = "";
var myemailBodyContent = "";
var myEmailSubject = "";
var DocUrlCollection = [];
var massmailid = [];
var countermail = 0;
function SetPeoplePicker_Multiselect(peoplePickerElementId, allowMultiple) {

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
function GetEmailTemplate() {
    var resturl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/Lists/GetByTitle('EmailTemplate')/Items?$select=ID,Body,Subject,EmailType&$filter=EmailType eq 'SharedDocument' or EmailType eq 'MyDocuments'";
    $.ajax({
        url: resturl,
        headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        async: true,
        success: function (data) {
            var items = data.d.results;
            for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {

                if (items[itemIndex].EmailType == "SharedDocument") {
                    if (items[itemIndex].Body != null) {
                        emailBodyContent = items[itemIndex].Body;
                    }
                    if (items[itemIndex].Subject != null) {
                        sharedEmailSubject = items[itemIndex].Subject;
                    }
                }
                else if (items[itemIndex].EmailType == "MyDocuments") {
                    if (items[itemIndex].Body != null) {
                        myemailBodyContent = items[itemIndex].Body;
                    }
                    if (items[itemIndex].Subject != null) {
                        myEmailSubject = items[itemIndex].Subject;
                    }

                }
            }
        }, eror: function (data) {
            console.log('error');
        }
    });
}

function ApprovalRequired() {

    var requiredCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    // var requireDepartmentId = titanForWork.GetValueFromQueryString("DepartmentId");//titanForWork.getQueryStringParameter("DepartmentId");
    var requireDepartmentId = DeptId;
    var resturl = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/Lists/GetByTitle('ProcessApprovers')/Items?$select=ID,ApproverRequired,Owner/Id,Approver/UserName,Approver/EMail,Approver/Id,WebPartName&$expand=Approver,Owner&$filter=WebPartName eq 'Documents' and DepartmentId eq '" + requireDepartmentId + "' and CompanyId eq '" + requiredCompanyId + "'";
    $.ajax({
        url: resturl,
        headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        async: true,
        success: function (data) {
            var items = data.d.results;
            for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
                if (items[itemIndex].ApproverRequired == true) {
                    approvelRequiredForDocuments = "Pending";
                }
                var pplApprovervalue = items[itemIndex].Approver.results;//Approvar

                if (pplApprovervalue != null) {
                    for (var pplIndex = 0; pplIndex < pplApprovervalue.length; pplIndex++) {
                        documentApproverUserIdArrayList.push(pplApprovervalue[pplIndex].Id);
                        if (pplApprovervalue[pplIndex].Id == _spPageContextInfo.userId) {
                            currentUserIsDepartmentOwner = true;
                            approvelRequiredForDocuments = "Approved";
                        }
                    }
                }
                var pplOwnervalue = items[itemIndex].Owner.results;//Owner
                if (pplOwnervalue != null) {
                    for (var pplIndex = 0; pplIndex < pplOwnervalue.length; pplIndex++) {
                        if (pplOwnervalue[pplIndex].Id == _spPageContextInfo.userId) {
                            currentUserIsDepartmentOwner = true;
                            approvelRequiredForDocuments = "Approved";
                        }
                    }
                }
            }

        }, eror: function (data) {
            console.log('error');
        }
    });

}

function checkSpecialCharaters(string) {

    // var specialChars = "<>@!#$%^&*()+[]{}?:;|'\"\\,/~`-=";
    var specialChars = "<>#%&*{}?:|\"\\/~`'";


    for (i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            return true
        }
    }
    return false;
}
function readTargetUrlCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function DeleteSharedLink(filesFolderId) {

    var resturl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('SharedDocument')/Items?$select=ID,DocumentID&$filter=DocumentID eq '" + filesFolderId + "'"
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
            for (var index = 0; index < items.length; index++) {
                DeleteSharedLinks(items[index].ID);//delete link
            }
        }, eror: function (data) {
            console.log('error');
        }
    });
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
function createJSONMetadata(emailIdCollection, roleId) {
    var jsonObj = [];
    var commonObj = {};
    commonObj['type'] = 'SP.Sharing.UserRoleAssignment';
    for (var index = 0; index < emailIdCollection.length; index++) {
        var item = {}
        item['__metadata'] = commonObj;
        item['Role'] = parseInt(roleId);
        item['UserId'] = emailIdCollection[index];
        jsonObj.push(item);
    }
    return jsonObj;
}

function DeleteSharedLinks(filesFolderId) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SharedDocument')/items('" + filesFolderId + "')",
        type: "POST",
        async: false,
        headers:
        {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data, status, xhr) {
            console.log("Shared link has been removed.");
        },
        error: function (xhr, status, error) {
            console.log(data.responseJSON.error);
        }
    });
}

app.controller('myCtrl', function ($scope, $http) {
    myFunc = function (DMSType, DeptId, itemID, fileName) {
        var IsMailSent = false;
        try {
            departmentID = DeptId;
            // itemID = titanForWork.getQueryStringParameter("itemID");
            itemID = itemID;

        }
        catch (e) {
        }
        try {
            fileName = fileName;
            itemID = itemID;
        }
        catch (e) {
        }
        companyID = titanForWork.getQueryStringParameter("CompanyId");
        GetEmailTemplate()//GetEmail Template on page load
        if (departmentID != null && departmentID != "") {
            $scope.departmenalDocuments = "Yes";
            $scope.departmentID = departmentID;
            ApprovalRequired();
        }
        else {
            $scope.departmenalDocuments = "No";
            $scope.departmentID = "";
        }

        if (itemID != "" && itemID != null) {
            $scope.showhideUploader = "Hide";
            $scope.currentUploadedDocumentItemId = itemID;
            $("#drop-zone2").hide();

            if ($scope.departmenalDocuments == "No") {
                $("#sharedwith").hide();
                $("#changeProperties").hide();
                $("#permissionlevel").hide();
                $scope.deptDocEditMode = false;
            }
            else {
                $("#sharedwith").show();
                $("#changeProperties").show();
                $scope.deptDocEditMode = true;

            }

        }
        else {
            $scope.showhideUploader = "Show";
            $scope.currentUploadedDocumentItemId = "";
            $("#drop-zone2").show();
            $("#sharedwith").show();
            $("#changeProperties").show();
            $("#permissionlevel").show();
            $scope.deptDocEditMode = false;

        }

        //var currentDlg;
        sourcelocation = titanForWork.getQueryStringParameter("sourcelocation");
        $scope.title = "";
        $scope.documentNo = "";
        $scope.documentType = "--select--";
        $scope.author = _spPageContextInfo.userDisplayName;
        $scope.regarding = "";
        $scope.details = "";
        $scope.accessLevel = "--select--";
        // $scope.accessLevel = "Department Only";
        $scope.secirityLevel = "--select--";
        $scope.secirityLevel = "Private";
        $scope.permissionLevel = "--select--";
        $scope.documentUrl = "";
        $scope.companyID = companyID;
        $scope.FileExist = false;
        if (fileName != null && fileName != "") {
            $scope.fileName = decodeURIComponent((fileName + '').replace(/\+/g, '%20'));
            //  $('#documentNo').attr('disabled', 'disabled');
        }
        else {
            $scope.fileName = "";
        }
        $scope.GetDocumentType = function () {
            var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$select=CategoryType,CatogeryName&$filter=CategoryType eq 'Document'";
            $http({
                url: Ownurl,
                method: "GET",
                async: false,
                headers: { "Accept": "application/json;odata=verbose" }
            }).then(function mySuccess(response) {
                var arrayListItems = new Array();
                arrayListItems.push('--select--');
                for (var index = 0; index < response.data.d.results.length; index++) {
                    arrayListItems.push(response.data.d.results[index].CatogeryName);
                }
                $scope.DocumentTYpesBind = arrayListItems;

            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });

        }
        $scope.CreateApprovalTask = function () {
            try {
                var linkurlForDocuments = encodeURI($scope.documentUrl);
                var taskDetails = $scope.details + "<br/>To open document, please <a target='_blank' download href='" + linkurlForDocuments + "'>click here</a>.<br/>Document uploaded by '" + _spPageContextInfo.userDisplayName + "'";
                var Metadata;
                var ItemType = GetItemTypeForListNameDetailsGroups("ApprovalTaskList");
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Title: $scope.title,
                    Details: taskDetails,
                    CompanyId: $scope.companyID,
                    DepartmentIdId: $scope.departmentID,
                    ApproversId: { 'results': documentApproverUserIdArrayList },
                    WebpartName: "Departmental Documents",
                    Category: "Departmental Documents",
                    Status: "Initiated",
                    ItemId: $scope.currentUploadedDocumentItemId
                };
                AddItemToListGroups("ApprovalTaskList", Metadata);
            }
            catch (error) {
                console.log(error.message);
            }
        }
        $scope.AddNewDocumentType = function () {
            if ($scope.DocumentTypeEntry != "" && $scope.DocumentTypeEntry != null) {
                var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentType')/items?$select=ID,Title&$filter=Title eq '" + $scope.DocumentTypeEntry + "'";
                $http({
                    url: Ownurl,
                    method: "GET",
                    async: true,
                    headers: { "Accept": "application/json;odata=verbose" }
                }).then(function mySuccess(response) {
                    if (response.data.d.results.length > 0) {
                        alert('Document Type must be Unique.')
                    }
                    else {
                        $scope.AddNewEmployee();
                    }
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            }
            else {
                alert('Please enter document type.');
            }
        }
        $scope.AddNewEmployee = function () {
            var listName = "DocumentType";
            var ItemType = $scope.GetItemTypeForListNameDetails(listName);
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Title: $scope.DocumentTypeEntry
            };

            $.when($scope.AddItemToList(listName, Metadata)).done(function (MainExamListItemTemp) {
                $scope.GetDocumentType();
                $('.modal.in').modal('hide');
                alert('Successfully Added.');
                $scope.DocumentTypeEntry = "";
            });
        }
        $scope.saveAttachment = function () {
            if (!$scope.validated()) {
                alert("Please Select a File.");
                return;
            }
            if (!$scope.FormMetadataValidation()) {
                return;
            }

            var file = jQuery("#AttachmentUploadField")[0].files[0];
            var txtfilename = $('#AttachmentUploadField').val().replace(/.*(\/|\\)/, '');
            waitingDialog.show();
            for (var k = 0; k < FinalFiles4Upload.length; k++) {
                $scope.uploadingFileName = FinalFiles4Upload[k].name;
                $scope.uploadFile(FinalFiles4Upload[k]);
            }
        }
        $scope.deleteDocuments = function () {
            var confirmmessage = confirm("Do You Want to Delete this File?")
            if (confirmmessage == true) {
                var dmsLibraryNamee = "";
                if ($scope.departmenalDocuments == "Yes") {
                    dmsLibraryNamee = "DepartmentalDMS";
                }
                else {
                    dmsLibraryNamee = "DocumentManagementSystem";
                }


                $.ajax({
                    url: $scope.siteURL + "/_api/web/lists/GetByTitle('" + dmsLibraryNamee + "')/items('" + $scope.currentUploadedDocumentItemId + "')",
                    type: "POST",
                    headers:
                    {
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        "IF-MATCH": "*",
                        "X-HTTP-Method": "DELETE"
                    },
                    success: function (data, status, xhr) {
                        alert('Successfully Deleted.');
                        //  $scope.redirectCancel();
                        $("#myModalupload").modal("hide");
                        if ($scope.departmenalDocuments == "Yes") {
                            folderName = readTargetUrlCookie("MyDepartmentDocumentCurrentFolder" + _spPageContextInfo.siteId);
                            departmentDoc.GetDepartmentDocuments(folderName)
                            // departmentDoc.GetDepartmentDocuments(departmentDoc.BaseURL + "/DepartmentalDMS");
                        }
                        else {
                            var folderUrl = readTargetUrlCookie("UploadedDocumentTargetFolderURl");
                            GetMyDocumentsWithFilesFolder(folderUrl);

                        }

                    },
                    error: function (xhr, status, error) {
                        console.log(data.responseJSON.error);
                    }
                });
            }
        }
        $scope.resetAllControl = function () {

            $scope.documentType = "--select--";
            $scope.accessLevel = "--select--";
            // $scope.accessLevel = "Department Only";
            $scope.secirityLevel = "--select--";
            $scope.secirityLevel = "Private";
            $scope.permissionLevel = "--select--";
            $scope.documentUrl = "";

            $('#titlle').val("");
            $('#documentNo').val("");
            $('#author').val("");
            $('#regarding').val("");
            $('#comment').val("");

            $scope.title = "";
            $scope.documentNo = "";

            $scope.author = "";
            $scope.regarding = "";
            $scope.details = "";

            document.getElementById('AttachmentUploadField').value = null;
        }


        $scope.redirectCancel = function () {
            $scope.RedirectPage(sourcelocation);
        }
        $scope.RedirectPage = function (urllink) {
            //   var linkredi = titanForWork.getQueryStringParameter("DMSType");
            var linkredi = DMSType;
            var departmentLink = "";
            if ($scope.departmenalDocuments == "Yes") {
                // departmentLink = "&DepartmentId=" + $scope.departmentID;
                if (linkredi != null && linkredi != "") {
                    if (linkredi == "D") {
                        departmentLink = "";
                    }
                }
            }
            var url = urllink + "?WebAppId=" + $scope.companyID + "&closedaction=close&undifined=undefined" + departmentLink;
            $(location).attr('href', url);
        }
        $scope.validated = function () {
            var file = jQuery("#AttachmentUploadField")[0].files[0];
            var dragdropfile = jQuery("#file2")[0].files[0];

            if (file == null && dragdropfile == null) {
                return false;
            }
            else {
                return true;
            }
        }
        $scope.FormMetadataValidation = function () {
            var flag = true
            if ($scope.departmenalDocuments == "Yes") {
                if ($scope.documentType == "--select--" || $scope.documentType == null) {
                    alert('Please Select a Document Type.')
                    return flag = false;
                }
            }
            if ($scope.departmenalDocuments == "Yes") {
                if ($scope.accessLevel == "--select--" || $scope.accessLevel == null) {
                    alert('Please select Share With.')
                    return flag = false;
                }
            }
            else {
                if ($scope.secirityLevel == "--select--" || $scope.secirityLevel == null) {
                    alert('Please select share with.')
                    return flag = false;
                }
                else {
                    if ($scope.secirityLevel == "Organization") {
                        if ($(".multiBox").text().indexOf("Select") == 0) {
                            alert("Kindly select any organization.");
                            return flag = false;
                        }
                        if (sharedUsersIdArrayListItemCollection.length == 0) {
                            alert("Guest users are not available in selected organization(s).");
                            return flag = false;
                        }

                    }
                    else if ($scope.secirityLevel != "Private") {
                        if (!$scope.getUserInfo('newEmployeePicker')) {
                            if (itemID == "" || itemID == null) {
                                if ($scope.groupuserIds != null) {
                                    if ($scope.groupuserIds.length == 0) {
                                        alert("Please add users for sharing.");
                                        return flag = false;
                                    }
                                }
                                else {
                                    alert("Please add users for sharing.");
                                    return flag = false;
                                }
                            }
                        }
                        if ($scope.permissionLevel == "--select--" || $scope.permissionLevel == null) {
                            alert('Please select permission level.')
                            return flag = false;
                        }

                    }
                }
            }
            return flag;
        }
        $scope.GetCurrentUserID = function () {

            $.ajax({
                url: _spPageContextInfo.webServerRelativeUrl + "/_api/web/currentUser",
                method: "GET",
                headers: {
                    "Accept": "application/json; odata=verbose"
                },
                async: false,
                success: function (data) {
                    $scope.currentUserId = data.d.Id; //Assigning UserId Variable
                    $scope.currentUserDisplayName = data.d.Title;
                    if (data.d.Email != "" && data.d.Email != null) {
                        $scope.currentUserEmailID = data.d.Email;

                    }
                    else {
                        $scope.currentUserEmailID = "";
                    }


                },
                error: function (data) { }
            });

        }
        // Query the picker for user information.
        $scope.getUserInfo = function (pickerPickerControlId) {
            var pickerDiv = $("[id^='" + pickerPickerControlId + "']");
            var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
            var users = peoplePicker.GetAllUserInfo();
            if (users.length > 0) {
                var allUsersID = new Array();
                var usersEmailIDs = new Array();
                for (var i = 0; i < users.length; i++) {
                    allUsersID.push($scope.GetUserId(users[i].Key));
                    if (users[i].EntityData.Email.length > 0) {
                        if (usersEmailIDs.indexOf(users[i].EntityData.Email) == -1) {
                            usersEmailIDs.push(users[i].EntityData.Email);
                        }
                    }
                }
                $scope.groupuserIds = allUsersID;
                $scope.usersEmailIDs = usersEmailIDs;
                return true;
            }
            return false;
        }
        $scope.GetUserId = function (userName) {
            var userID = "";
            var prefix = "i:0#.f|membership|";
            var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
            var accountName = userName;// prefix+userName;       
            $.ajax({
                url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
                    encodeURIComponent(accountName) + "'",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                async: false,
                success: function (data) {
                    userID = data.d.Id;
                    $scope.UserInfoFullName = data.d.Title;
                },
                error: function (data) {
                    console.log(JSON.stringify(data));
                }
            });
            return userID;
        }
        $scope.GetDepartmentOnlyAccessLevelUsers = function () {
            //$("#usersList").html("");
            if ($scope.accessLevel == "Department Only") {
                var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ID,DepartmentId,LogonName/ID,LogonName/Title,LogonName/UserName,Company/ID&$expand=LogonName,Company&$filter=CompanyId eq '" + $scope.companyID + "' and DepartmentId eq '" + $scope.departmentID + "'";
                $http({
                    url: Ownurl,
                    method: "GET",
                    async: false,
                    headers: { "Accept": "application/json;odata=verbose" }
                }).then(function mySuccess(response) {
                    var allUsersID = new Array();
                    var usersEmailIDs = new Array();
                    var usersDisplayName = "";
                    for (var groupIndex = 0; groupIndex < response.data.d.results.length; groupIndex++) {
                        if (allUsersID.indexOf(response.data.d.results[groupIndex].LogonName.ID) == -1) {
                            allUsersID.push(response.data.d.results[groupIndex].LogonName.ID);
                            usersEmailIDs.push(response.data.d.results[groupIndex].LogonName.UserName)
                            usersDisplayName = response.data.d.results[groupIndex].LogonName.Title + ";  " + usersDisplayName;
                        }
                    }
                    $scope.groupuserIds = allUsersID;
                    $scope.usersEmailIDs = usersEmailIDs;
                    if (usersDisplayName.length > 0) {
                        $scope.usersDisplayName = usersDisplayName;
                        // $("#usersList").append(usersDisplayName);
                    }
                    else {
                        $scope.usersDisplayName = "No User Found .";
                    }

                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            }

        }
        $scope.GetAllAccessLevelUsers = function () {
            clearPeoplePickerControl("newEmployeePicker");
            if ($scope.secirityLevel == "Organization") {
                if ($("#ddlOrgNameUpload").val() == null) {
                    getGuestClients('ddlOrgNameUpload');
                }
                else {
                    $(".mulinput").prop("checked", false);
                    $(".multiBox").text("Select");
                }
            }
            else {
                var Ownurl = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getbytitle('DocumentSharedGroups')/items?$select=ID,SharingLevel,SharedUsers/Title,SharedUsers/UserName,SharedUsers/ID,LogonUser/ID,LogonUser/UserName&$expand=SharedUsers,LogonUser&$filter=SharingLevel eq '" + $scope.secirityLevel + "' and LogonUser/ID eq '" + $scope.currentUserId + "'"
                $http({
                    url: Ownurl,
                    method: "GET",
                    async: false,
                    headers: { "Accept": "application/json;odata=verbose" }
                }).then(function mySuccess(response) {
                    var allUsersID = new Array();
                    for (var groupIndex = 0; groupIndex < response.data.d.results.length; groupIndex++) {
                        for (var subGroupIndex = 0; subGroupIndex < response.data.d.results[groupIndex].SharedUsers.results.length; subGroupIndex++) {
                            if (allUsersID.indexOf(response.data.d.results[groupIndex].SharedUsers.results[subGroupIndex].ID) == -1) {
                                allUsersID.push(response.data.d.results[groupIndex].SharedUsers.results[subGroupIndex].ID);
                                SetAndResolvePeoplePicker('newEmployeePicker', response.data.d.results[groupIndex].SharedUsers.results[subGroupIndex].UserName, false);
                            }
                        }
                    }
                    $scope.groupuserIds = allUsersID;
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
            }
        }
        $scope.GetAllGroupsID = function () {

            var dmsLibraryNamee = "";
            if ($scope.departmenalDocuments == "Yes") {
                dmsLibraryNamee = "DepartmentalDMS";
            }
            else {
                dmsLibraryNamee = "DocumentManagementSystem";
            }
            var currentdate = new Date();
            var msec = Date.parse(currentdate);

            $.ajax({
                url: $scope.siteURL + "/_api/Web/Lists/getByTitle('" + dmsLibraryNamee + "')/Items(" + $scope.currentUploadedDocumentItemId + ")?$expand=RoleAssignments/Member/Users" + msec,
                method: "GET",
                async: false,
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    $scope.AssignPermission($scope.currentUserId, "1073741829");//Full permission for Current User 
                    for (var i = 0; i < data.d.RoleAssignments.results.length; i++) {
                        if (data.d.RoleAssignments.results[i].PrincipalId != $scope.currentUserId) {
                            $scope.DeletePrinciple(data.d.RoleAssignments.results[i].PrincipalId);
                        }
                    }
                },
                error: function (errorMessage) {
                    console.log('error not found users');
                }
            });
        }
        $scope.BreakInheritePermissionOnItem = function () {

            var dmsLibraryNamee = "";
            if ($scope.departmenalDocuments == "Yes") {
                dmsLibraryNamee = "DepartmentalDMS";
            }
            else {
                dmsLibraryNamee = "DocumentManagementSystem";
            }

            var headers = {
                "Accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            }
            var endPointUrl = $scope.siteURL + "/_api/web/lists/getByTitle('" + dmsLibraryNamee + "')/getItemById(" + $scope.currentUploadedDocumentItemId + ")/breakroleinheritance(copyRoleAssignments=false, clearSubscopes=true)";
            $.ajax({
                url: endPointUrl,
                type: "POST",
                headers: headers,
                async: false,
                dataType: 'json', success: function (data) {
                    $.when($scope.GetAllGroupsID()).done(function (MainExamListItemTemp) {
                        if ($scope.groupuserIds != null) {
                            for (var itemIndex = 0; itemIndex < $scope.groupuserIds.length; itemIndex++) {
                                //Assign permission to other users
                                $scope.AssignPermission($scope.groupuserIds[itemIndex], $scope.permissionLevelId);// permission for other users
                            }
                        }
                    });
                },
                error: function (error) {
                    console.log(JSON.stringify(error));
                }
            });

        }
        $scope.DeletePrinciple = function (groupID) {
            var dmsLibraryNamee = "";
            if ($scope.departmenalDocuments == "Yes") {
                dmsLibraryNamee = "DepartmentalDMS";
            }
            else {
                dmsLibraryNamee = "DocumentManagementSystem";
            }

            var headers = {
                'X-RequestDigest': $('#__REQUESTDIGEST').val(),
                'X-HTTP-Method': 'DELETE'
            }
            var endPointUrl = $scope.siteURL + "/_api/web/lists/getByTitle('" + dmsLibraryNamee + "')/getItemById(" + $scope.currentUploadedDocumentItemId + ")/roleassignments/getbyprincipalid(" + groupID + ")";
            $.ajax({
                url: endPointUrl,
                type: "POST",
                headers: headers,
                async: false,
                dataType: 'json', success: function (data) {
                    console.log(groupID + ' Successfully removed Permission !');
                },
                error: function (error) {
                    console.log(JSON.stringify(error));
                }
            });

        }
        $scope.AssignPermission = function (userPrincpleId, permissionLevel) {
            var dmsLibraryNamee = "";
            if ($scope.departmenalDocuments == "Yes") {
                dmsLibraryNamee = "DepartmentalDMS";
            }
            else {
                dmsLibraryNamee = "DocumentManagementSystem";
            }
            var headers = {
                "Accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            }
            var webUrl = $scope.siteURL + "/_api/web/lists/getByTitle('" + dmsLibraryNamee + "')/getItemById(" + $scope.currentUploadedDocumentItemId + ")/roleassignments/addroleassignment(principalid=" + userPrincpleId + ",roleDefId=" + permissionLevel + ")";
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
                }
            });
        }
        $scope.GetDocumentProperties = function () {
            //waitingDialog.show();
            var dmsLibraryNamee = "";
            if ($scope.departmenalDocuments == "Yes") {
                dmsLibraryNamee = "DepartmentalDMS";
                $scope.OldDeptValue = "";
            }
            else {
                dmsLibraryNamee = "DocumentManagementSystem";
                $scope.OldDeptValue = "";
            }

            $http({
                url: $scope.siteURL + "/_api/web/lists/GetByTitle('" + dmsLibraryNamee + "')/items?$select=ID,PermissionLevelId,PermissionLevel,Department,Shared/ID,Shared/Title,Shared/UserName,Title,DocumentNo,DocumentType,Regarding,Details,AccessLevel,SecurityLevel,DocumentWrittenBy&$expand=Shared&$filter=ID  eq '" + $scope.currentUploadedDocumentItemId + "'",
                method: "GET",
                headers: { "Accept": "application/json;odata=verbose" }
            }).then(function mySuccess(response) {
                if (response.data.d.results.length > 0) {

                    $scope.title = response.data.d.results[0].Title;
                    $scope.documentNo = response.data.d.results[0].DocumentNo;
                    if ($scope.documentNo == null || $scope.documentNo == "") {
                        //$('#documentNo').prop('disabled', false);
                    }
                    $scope.documentType = response.data.d.results[0].DocumentType;
                    $scope.author = response.data.d.results[0].DocumentWrittenBy;
                    $scope.regarding = response.data.d.results[0].Regarding;
                    $scope.details = response.data.d.results[0].Details;
                    $scope.departmentID = response.data.d.results[0].Department;
                    $scope.permissionLevelId = response.data.d.results[0].PermissionLevelId;
                    $scope.permissionLevel = response.data.d.results[0].PermissionLevel;
                    if (response.data.d.results[0].AccessLevel != null && response.data.d.results[0].AccessLevel != "") {
                        $scope.accessLevel = response.data.d.results[0].AccessLevel;
                        $scope.OldDeptValue = response.data.d.results[0].AccessLevel;
                    }
                    if (response.data.d.results[0].SecurityLevel != null && response.data.d.results[0].SecurityLevel != "") {
                        $scope.secirityLevel = response.data.d.results[0].SecurityLevel;
                    }
                    if ($scope.secirityLevel != "Private") {
                        if (response.data.d.results[0].Shared.results != null) {
                            var allUsersID = new Array();
                            var usersEmailIDs = new Array();
                            var usersDisplayName = "";
                            for (var subGrroupIndex = 0; subGrroupIndex < response.data.d.results[0].Shared.results.length; subGrroupIndex++) {
                                var userNamecurretn = response.data.d.results[0].Shared.results[subGrroupIndex].UserName;
                                if ($scope.secirityLevel != "Private") {
                                    // $scope.setPeoplePickerUsersInfoCurrent("newEmployeePicker", userNamecurretn);
                                }
                                else {
                                    allUsersID.push(response.data.d.results[0].Shared.results[subGrroupIndex].ID);
                                    usersEmailIDs.push(response.data.d.results[0].Shared.results[subGrroupIndex].UserName);
                                }
                                usersDisplayName = response.data.d.results[0].Shared.results[subGrroupIndex].Title + ";  " + usersDisplayName;
                            }
                            if ($scope.secirityLevel == "Private") {
                                $scope.usersDisplayName = usersDisplayName;
                                $scope.groupuserIds = allUsersID;
                                $scope.usersEmailIDs = usersEmailIDs;
                            }
                        }
                    }
                }

            }, function myError(response) {
                $scope.myWelcome = response.statusText;
                // waitingDialog.hide();
                $("#myModalupload").modal("hide");
            });
        }
        $scope.setPeoplePickerUsersInfoCurrent = function (controlNameID, LoginNameOrEmail) {
            //var fieldName = id + '_TopSpan';
            var peoplePickerDiv = $("[id^='" + controlNameID + "']");
            // Get the people picker object from the page.
            var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
            peoplePicker.AddUserKeys(LoginNameOrEmail, false);
        }
        $scope.uploadFile = function (file) {
            proposalSiteUrl = $scope.siteURL;//jQuery('#ProposalSiteUrl option:selected').val();
            $scope.createFolder(file);
        }
        $scope.updateItemWithID = function (ListName, Metadata, ID, webUrl, IsDuplicate) {

            var dfd = $.Deferred();
            var oweburl = webUrl + "/_api/Web/Lists/getByTitle('" + ListName + "')/Items(" + ID + ")";
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
                    if ($scope.secirityLevel != "--select--" || $scope.accessLevel != "--select--") {
                        var touserArrayList = [];
                        var ccUsers = [];
                        if ($scope.currentUserEmailID != "" && $scope.currentUserEmailID != null) {
                            ccUsers.push($scope.currentUserEmailID);
                        }

                        if ($scope.secirityLevel != "--select--" || $scope.accessLevel == "Department Only") {
                            var sharedWith = "";
                            if ($scope.usersEmailIDs != null) {
                                for (var itemEmailIndex = 0; itemEmailIndex < $scope.usersEmailIDs.length; itemEmailIndex++) {
                                    touserArrayList.push($scope.usersEmailIDs[itemEmailIndex]);
                                    sharedWith = $scope.usersEmailIDs[itemEmailIndex] + ";" + sharedWith;
                                }
                            }
                            if ($scope.accessLevel != "Department Only" && $scope.secirityLevel != "Private") {
                                //Add Notfication document link in list
                                if (sharedWith != "") {
                                    // $scope.AddNewNotification("SharedDocument", ID, sharedWith, $scope.documentUrl);
                                    //NotificationCenter($scope.title,$scope.details,"Documents")
                                }
                            }
                            if ($('#chkKeepExist').is(':checked') == false || IsDuplicate == false) { // if user select to keep existing metadata for duplicate file only
	                            if ($scope.secirityLevel == "Private") {
	                                DeleteSharedLink(ID);//Delete already shared link
	                                //stop inherit permission on current uploaded document
	                            }
	                            else if ($scope.secirityLevel == "Organization") {
	                                $scope.ShareFilesFolder(ID, sharedUsersIdArrayListItemCollection, $scope.sharingLink, $scope.uploadedFileName);
	                                if (touserArrayList.length == 0) {
	                                    for (var itemEmailIndex = 0; itemEmailIndex < sharedUsersEmailIDsArrayListItemCollection.length; itemEmailIndex++) {
	                                        touserArrayList.push(sharedUsersEmailIDsArrayListItemCollection[itemEmailIndex]);
	                                    }
	                                }
	                            }
	                            else if ($scope.secirityLevel != "--select--" && $scope.secirityLevel != "Private") {
	                                //shared link method to call
	                                if (itemID == "" || itemID == null) {
	                                    $scope.ShareFilesFolder(ID, $scope.groupuserIds, $scope.sharingLink, $scope.uploadedFileName);
	                                }
	                                else {
	                                    touserArrayList = [];     //donot send mail when edit my document in selective mode
	                                    $("#myModalupload").modal("hide");
	                                    $('#AttachAttachmentButton').prop('disabled', false);
	                                    alert($scope.messageAfterSuccess);
	                                    $(".mulinput").prop("checked", false);
	                                    $(".multiBox").text("Select");
	                                    var folderUrl = readTargetUrlCookie("UploadedDocumentTargetFolderURl");
	                                    GetMyDocumentsWithFilesFolder(folderUrl);
	                                }
	                            }
	                        }
                            //send email to all shared users
                            if ($scope.accessLevel == "Department Only" || $scope.secirityLevel == "Private") {
                                if ($scope.OldDeptValue == null) {
                                    $scope.OldDeptValue = '';
                                }
                                if ($scope.deptDocEditMode = true && $scope.accessLevel == "Department Only" && $scope.OldDeptValue.indexOf("Everyone") != -1) {
                                    $scope.ResetBreakInheriteOnDepartment()              //removeBreakinheritance
                                }

                                touserArrayList = [];
                                touserArrayList.push($scope.currentUserEmailID);
                                if ($scope.currentUserEmailID != "" && $scope.currentUserEmailID != null) {
                                    if (IsMailSent == false) {
                                        if (touserArrayList.length > 0) {
                                            if (FinalFiles4Upload.length == countermail) {
                                                $scope.EmailProperties(touserArrayList, ccUsers, "me", ID, webUrl);
                                                IsMailSent = true;
                                                countermail = 0;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if ($scope.currentUserEmailID != "" && $scope.currentUserEmailID != null) {
                                    if (IsMailSent == false) {
                                        if (touserArrayList.length > 0) {
                                            if (FinalFiles4Upload.length == countermail) {
                                                $scope.EmailProperties(touserArrayList, ccUsers, "sharedwith", ID, webUrl);
                                                IsMailSent = true;
                                                countermail = 0;
                                            }
                                        }
                                    }
                                }
                            }
                        }


                        else {

                            if ($scope.secirityLevel == "--select--" && $scope.accessLevel.indexOf("Everyone") != -1) {
                                $scope.ResetBreakInheriteOnDepartment();
                                $scope.BreakInheritePermissionOnEveryOneDepartment();

                            }

                            touserArrayList = [];
                            touserArrayList.push($scope.currentUserEmailID);
                            if ($scope.currentUserEmailID != "" && $scope.currentUserEmailID != null) {
                                if (IsMailSent == false) {
                                    if (FinalFiles4Upload.length == countermail) {
                                        $scope.EmailProperties(touserArrayList, ccUsers, "me", ID, webUrl);
                                        IsMailSent = true;
                                        countermail = 0;
                                    }

                                }
                            }
                        }
                    }
                    dfd.resolve(true);

                },
                error: function (error) {
                    //waitingDialog.hide();
                    $("#myModalupload").modal("hide");
                    alert(JSON.stringify(error));
                    dfd.reject(error);

                }
            });
            return dfd.promise();
        }
        $scope.ShareFilesFolder = function (ID, arraayListOfUserd, siteurl, currentfilename) {
            var userRole = 0;
            if ($scope.permissionLevel == "Read") {
                userRole = 1;
            }
            else if ($scope.permissionLevel == "Contribute") {
                userRole = 2;
            }
            else if ($scope.permissionLevel == "Restricted View") {
                userRole = 7;
            }
            if ($scope.secirityLevel == "Organization") {
                var userRoleAssignments = createJSONMetadata(sharedUsersEmailIDsArrayListItemCollection, userRole);
            }
            else {
                var userRoleAssignments = createJSONMetadata($scope.usersEmailIDs, userRole);
            }
            var restSource = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.Sharing.DocumentSharingManager.UpdateDocumentSharingInfo";
            $.ajax(
            {
                'url': restSource,
                'method': 'POST',
                'data': JSON.stringify({
                    'resourceAddress': document.location.origin + $scope.sharingLink,
                    'userRoleAssignments': userRoleAssignments,
                    'validateExistingPermissions': false,
                    'additiveMode': true,
                    'sendServerManagedNotification': false,
                    'customMessage': "Please look at the following File/Folder.",
                    'includeAnonymousLinksInNotification': false
                }),
                'headers': {
                    'accept': 'application/json;odata=verbose',
                    'content-type': 'application/json;odata=verbose',
                    'X-RequestDigest': $('#__REQUESTDIGEST').val()
                },
                'success': function (data) {
                    var fileFolderSharedWith = $scope.secirityLevel;
                    var sharedWithFolderPermission = $scope.permissionLevel;
                    //   DeleteSharedLink(ID);//Delete already shared link
                    /* var sharedFileFullName = $scope.fileName;
                     if (sharedFileFullName == "" || sharedFileFullName == null) {
                         sharedFileFullName = $scope.uploadedFileName;
                     }*/

                    if (itemID == "" || itemID == null) {
                        if ($scope.secirityLevel == "Organization") {
                            AddSharedLinkToListOrg(currentfilename, siteurl, arrUserClientWise, ID.toString(), "File", fileFolderSharedWith, sharedWithFolderPermission, "Personal");
                        }
                        else {
                            AddSharedLinkToList22(currentfilename, siteurl, arraayListOfUserd, ID.toString(), "File", fileFolderSharedWith, sharedWithFolderPermission, "Personal");
                        }

                    }
                },
                'error': function (err) {
                    alert(JSON.stringify(err));
                    //  waitingDialog.hide();

                }
            });
        }
        $scope.GetItemTypeForListName = function (ListName) {
            return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "Item";//"SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
        }
        $scope.updateFromDashBoard = function () {
            if (!$scope.FormMetadataValidation()) {
                return;
            }
            $('#AttachAttachmentButton').prop('disabled', true);

            // waitingDialog.show();
            $scope.messageAfterSuccess = "Document has been updated successfully !";
            var dmsLibraryNamee = "";
            if ($scope.departmenalDocuments == "Yes") {
                dmsLibraryNamee = "DepartmentalDMS";
            }
            else {
                dmsLibraryNamee = "DocumentManagementSystem";
                $scope.GetFileServerRelativeUrlById(itemID);
            }
            $scope.updateDocumentProperties(dmsLibraryNamee, itemID, $scope.siteURL)
        }
        $scope.GetFileServerRelativeUrlById = function (shareDocumentitemIdd) {
            var resturl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('DocumentManagementSystem')/getItemById(" + shareDocumentitemIdd + ")?$select=ServerRedirectedEmbedUri,File/Name,File/ServerRelativeUrl,Folder/Name,Folder/ServerRelativeUrl&$expand=File,Folder"
            $.ajax({
                url: resturl,
                headers: {
                    'accept': 'application/json;odata=verbose',
                    'content-type': 'application/json;odata=verbose',
                    'X-RequestDigest': $('#__REQUESTDIGEST').val()
                },
                async: false,
                success: function (data) {
                    $scope.sharingLink = data.d.File.ServerRelativeUrl;
                    commonserverRedirectedEmbedUri = data.d.ServerRedirectedEmbedUri;
                    if (commonserverRedirectedEmbedUri == null || commonserverRedirectedEmbedUri == "") {
                        commonserverRedirectedEmbedUri = "";
                    }

                }, eror: function (data) {

                    console.log('error');
                }
            });
        }
        $scope.updateDocumentProperties = function (ListName, currentitemId, webUrl, arrMetadata) {
            var IsDuplicateFile = false;
            if ($scope.departmenalDocuments == "Yes") {
                $scope.secirityLevel = "--select--"
            }

            var acessLevel = $scope.accessLevel;
            var sharedUserArrayList = new Array();
            if ($scope.accessLevel == "--select--") {
                acessLevel = "";

                if ($scope.secirityLevel != "Private" && $scope.secirityLevel != "Organization") {
                    sharedUserArrayList = $scope.getPeopleUserInfo("newEmployeePicker");
                }
                else if ($scope.secirityLevel == "Organization") {
                    sharedUserArrayList = sharedUsersIdArrayListItemCollection;
                }

            }
            var securityLevle = $scope.secirityLevel;
            if ($scope.secirityLevel == "--select--") {
                securityLevle = "";
            }
            var permissionLevelId = "";
            if ($scope.permissionLevelId != null) {
                permissionLevelId = $scope.permissionLevelId.toString();
            }
            var permissionLevel = $scope.permissionLevel;
            if ($scope.permissionLevel == "--select--") {
                permissionLevel = "";
            }
            var documentNofile = $scope.documentNo;
            var Metadata;
            var ItemType = $scope.GetItemTypeForListName(ListName);
            if (arrMetadata.length == 0) {
            	IsDuplicateFile = false;
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Title: $scope.title,
                    DocumentNo: documentNofile,
                    DocumentType: $scope.documentType,
                    DocumentWrittenBy: $scope.author,
                    Regarding: $scope.regarding,
                    Details: $scope.details,
                    Department: $scope.departmentID,
                    AccessLevel: acessLevel,
                    SecurityLevel: securityLevle,
                    PermissionLevel: permissionLevel,
                    PermissionLevelId: permissionLevelId,
                    SharedId: { 'results': sharedUserArrayList },
                    ApprovalStatus: approvelRequiredForDocuments

                };
                if (sharedUserArrayList.length == 0) {
                    delete Metadata["SharedId"];
                }
            }
            else {
            	IsDuplicateFile = true;
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },

                    Title: arrMetadata.Title ? arrMetadata.Title : "",
                    DocumentNo: arrMetadata.DocumentNo ? arrMetadata.DocumentNo : "",
                    DocumentType: arrMetadata.DocumentType ? arrMetadata.DocumentType : "",
                    DocumentWrittenBy: arrMetadata.DocumentWrittenBy ? arrMetadata.DocumentWrittenBy : "",
                    Regarding: arrMetadata.Regarding ? arrMetadata.Regarding : "",
                    Details: arrMetadata.Details ? arrMetadata.Details : "",
                    Department: arrMetadata.Title ? arrMetadata.Title : "",
                    AccessLevel: arrMetadata.AccessLevel ? arrMetadata.AccessLevel : "",
                    SecurityLevel: arrMetadata.SecurityLevel ? arrMetadata.SecurityLevel : "",
                    PermissionLevel: arrMetadata.PermissionLevel ? arrMetadata.PermissionLevel : "",
                    PermissionLevelId: arrMetadata.PermissionLevelId ? arrMetadata.PermissionLevelId : "",
                    ApprovalStatus: approvelRequiredForDocuments
                };
                if (arrMetadata.SharedId != null) {
                    Metadata.SharedId = { 'results': arrMetadata.SharedId.results };
                }
            }
            if (ListName != "DepartmentalDMS") {
                delete Metadata["ApprovalStatus"];
            }
            else {
                // var notSendApproverOnMetadataChange = titanForWork.getQueryStringParameter('DMSType');
                var notSendApproverOnMetadataChange = DMSType;
                if (notSendApproverOnMetadataChange != null) {
                    delete Metadata["ApprovalStatus"];
                }
                else {
                    if (approvelRequiredForDocuments == "Pending") {
                        if ($scope.accessLevel != "Department Only") {
                            //Create Approval Task to approve this document
                            $scope.CreateApprovalTask();
                        }
                    }
                }
            }
            $scope.updateItemWithID(ListName, Metadata, currentitemId, webUrl, IsDuplicateFile);
        }
        $scope.getPeopleUserInfo = function (pickerPickerControlId) {
            var sharedUserArrayList = new Array();
            var pickerDiv = $("[id^='" + pickerPickerControlId + "']");
            var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
            var users = peoplePicker.GetAllUserInfo();
            if (users.length > 0) {
                for (var i = 0; i < users.length; i++) {
                    var currentUserIdFromList = $scope.GetUserId(users[i].Key);
                    if (currentUserIdFromList != "" && currentUserIdFromList != null) {
                        sharedUserArrayList.push($scope.GetUserId(users[i].Key));
                    }
                    else {
                        alert("You can't share this file to this user " + users[i].Key + ", Please add user on this site then share.");
                    }
                }
            }
            return sharedUserArrayList;
        }
        $scope.SendEmailNotification = function (emailProperties) {

            var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
            $.ajax({
                contentType: 'application/json',
                url: sitetemplateurl,
                type: "POST",
                data: JSON.stringify(emailProperties),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    if ($scope.messageAfterSuccess == "Successfully Uploaded.") {
                    }
                    $('#chkReplaceVer').trigger('click');
                    $("#myModalupload").modal("hide");
                    $(".mulinput").prop("checked", false);
                    $(".multiBox").text("Select");
                    $('#AttachAttachmentButton').prop('disabled', false);
                    waitingDialog.hide();
                    alert($scope.messageAfterSuccess);
                    if ($scope.departmenalDocuments == "Yes") {
                        folderName = readTargetUrlCookie("MyDepartmentDocumentCurrentFolder" + _spPageContextInfo.siteId);
                        departmentDoc.GetDepartmentDocuments(folderName)
                        // departmentDoc.GetDepartmentDocuments(departmentDoc.BaseURL + "/DepartmentalDMS");
                    }
                    else {
                        var folderUrl = readTargetUrlCookie("UploadedDocumentTargetFolderURl");
                        GetMyDocumentsWithFilesFolder(folderUrl);

                    }
                    //   $scope.redirectCancel();


                },
                error: function (xhr, data, error) {
                    $("#myModalupload").modal("hide");
                    var err = JSON.parse(xhr.responseText);
                    var errorType = xhr.status;
                    var errorMessage = err.error.message.value;
                    alert(errorMessage);
                    location.reload(true);
                    // alert(JSON.stringify(err));
                }
            });
        }
        $scope.GetDocumentUrl = function (documentID, siteURL) {
            var dmsLibraryNamee = "";
            if ($scope.departmenalDocuments == "Yes") {
                dmsLibraryNamee = "DepartmentalDMS";
            }
            else {
                dmsLibraryNamee = "DocumentManagementSystem";
            }

            var requestUri = siteURL + "/_api/web/lists/getByTitle('" + dmsLibraryNamee + "')/items?$select=Id,EncodedAbsUrl&$filter=Id eq '" + documentID + "'";
            var requestHeaders = {
                "accept": "application/json;odata=verbose"
            }
            $.ajax({
                url: requestUri,
                type: 'GET',
                dataType: 'json',
                headers: requestHeaders,
                async: false,
                success: function (data) {
                    $.each(data.d.results, function (i, result) {
                        var path = result.EncodedAbsUrl;
                        $scope.documentUrl = path;
                    });
                },
                error: function ajaxError(response) {
                    alert(response.status + ' ' + response.statusText);
                }
            });
        }
        $scope.EmailProperties = function (toUsers, ccUsers, flagTemplateEmail, documentID, siteURL) {
			var Permission = $(".uploadMyDocs :selected").text();
			if(Permission == "--select--"){
				Permission = "";
			}
            var emailCommonSubject = "";
            var sharedWithTitle = "";
            if ($scope.accessLevel == "--select--") {
                sharedWithTitle = $scope.secirityLevel;
            }
            else {
                sharedWithTitle = $scope.accessLevel;
            }

            if ($scope.uploadingFileName == null || $scope.uploadingFileName == undefined) {

                $scope.uploadingFileName = $scope.fileName;
            }
            if ($scope.documentUrl == null || $scope.documentUrl == undefined || $scope.documentUrl == "") {
                var documenturlforindex = $scope.GetDocumentUrl(documentID, siteURL);
            }
            var msg = "";
            

            if (flagTemplateEmail == "me") {
                if ($scope.departmenalDocuments == "Yes") {
					Permission = $("#ddlShareWith :selected").text();
					if(Permission == "--select--"){
						Permission = "";
					}
                    toUsers = massmailid;
                }
                var UploadDocDesign = '';
                UploadDocDesign = "Dear User,<br/><br/>" + _spPageContextInfo.userDisplayName + ", shared the following document with you.<br/><br/>";
                for (var i = 0; i < DocUrlCollection.length; i++) {
                	var MailLink = '';
		            var FileServerURL = DocUrlCollection[i].FileUrl;
		            if(DocUrlCollection[i].FileName.indexOf("xml") != -1 || DocUrlCollection[i].FileName.indexOf("rar") != -1 || DocUrlCollection[i].FileName.indexOf("png") != -1 || DocUrlCollection[i].FileName.indexOf("jpg") != -1 || DocUrlCollection[i].FileName.indexOf("jpeg") != -1) {
			            if (FileServerURL.includes("DocumentManagementSystem") == true || FileServerURL.includes("DepartmentalDMS") == true) {
						    if (FileServerURL.includes("DocumentManagementSystem") == true) {
						        MailLink = siteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(FileServerURL) + "&parent=" + encodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
						    } else {
						        MailLink = siteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(FileServerURL) + "&parent=" + encodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
						    }
						} else {
						    var HostName = window.location.origin + FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0);
						    MailLink = HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(FileServerURL) + "&parent=" + encodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
						}
					}
					else {
						MailLink = encodeURI(DocUrlCollection[i].FileUrl);
					}
                	UploadDocDesign = UploadDocDesign + "<div><strong>File Name :</strong>" + DocUrlCollection[i].FileName + "</div>" +
                                                    "<div><strong>Reference No :</strong> " + $("#documentNo").val() + "</div>" +
                                                    "<div><strong>Title:</strong> " + $("#titlle").val() + "</div>" +
                                                     "<div><strong>Type:</strong> " + $("#documentType").val() + "</div>" +
                                                     "<div><strong>Permission:</strong> " + Permission + "</div>" +
                                                     //"<div><a href=" + encodeURI(DocUrlCollection[i].FileUrl) + ">Click here</a> to open the document.</div>" + "<br/><br/>";
                                                     "<div><a href=" + MailLink + ">Click here</a> to open the document.</div>" + "<br/><br/>";


                }
                UploadDocDesign += "This is an auto generated email. Please don't reply.";
                msg = UploadDocDesign;
                DocUrlCollection = [];   //empty array

                emailCommonSubject = myEmailSubject;
            }
            else if (flagTemplateEmail == "sharedwith") {
                if ($scope.departmenalDocuments == "No") {
                    var UploadDocDesign = '';
                    UploadDocDesign = "Dear User,<br/><br/>" + _spPageContextInfo.userDisplayName + ", shared the following document with you.<br/><br/>";
                    for (var i = 0; i < DocUrlCollection.length; i++) {
                    
	                    var MailLink = '';
			            var FileServerURL = DocUrlCollection[i].FileUrl;
			            if(DocUrlCollection[i].FileName.indexOf("xml") != -1 || DocUrlCollection[i].FileName.indexOf("rar") != -1 || DocUrlCollection[i].FileName.indexOf("png") != -1 || DocUrlCollection[i].FileName.indexOf("jpg") != -1 || DocUrlCollection[i].FileName.indexOf("jpeg") != -1) {
				            if (FileServerURL.includes("DocumentManagementSystem") == true || FileServerURL.includes("DepartmentalDMS") == true) {
							    if (FileServerURL.includes("DocumentManagementSystem") == true) {
							        MailLink = siteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(FileServerURL) + "&parent=" + encodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
							    } else {
							        MailLink = siteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(FileServerURL) + "&parent=" + encodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
							    }
							} else {
							    var HostName = window.location.origin + FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0);
							    MailLink = HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(FileServerURL) + "&parent=" + encodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
							}
						}
						else {
							MailLink = encodeURI(DocUrlCollection[i].FileUrl);
						}

                        UploadDocDesign = UploadDocDesign + "<div><strong>File Name :</strong>" + DocUrlCollection[i].FileName + "</div>" +
                                                        "<div><strong>Reference No :</strong> " + $("#documentNo").val() + "</div>" +
                                                        "<div><strong>Title:</strong> " + $("#titlle").val() + "</div>" +
                                                         "<div><strong>Type:</strong> " + $("#documentType").val() + "</div>" +
                                                         "<div><strong>Permission:</strong> " + Permission  + "</div>" +
                                                        // "<div><a href="+encodeURI(document.location.origin+"/"+DocUrlCollection[i])+">Click here</a> to open the document.</div>" +"<br/><br/>"; 
                                                         "<div><a href=" + MailLink + ">Click here</a> to open the document.</div>" + "<br/><br/>";


                    }
                    UploadDocDesign += "This is an auto generated email. Please don't reply.";
                    msg = UploadDocDesign;
                    emailCommonSubject = sharedEmailSubject;
                    DocUrlCollection = [];   //empty array
                }
                else {

                    emailBodyContent = emailBodyContent.replace("{{sharedby}}", $scope.currentUserDisplayName);
                    emailBodyContent = emailBodyContent.replace("{{filename}}", $scope.uploadingFileName);
                    emailBodyContent = emailBodyContent.replace("{{fileype}}", $scope.documentType);
                    emailBodyContent = emailBodyContent.replace("{{details}}", $scope.details);
                    emailBodyContent = emailBodyContent.replace("{{doclink}}", $scope.documentUrl);
                    emailBodyContent = emailBodyContent.replace("{{Permission}}", $scope.permissionLevel);
                    emailCommonSubject = sharedEmailSubject;
                    msg = emailBodyContent;
                }
            }

            var from = $scope.currentUserEmailID;
            var Metadata;
            Metadata = {
                'properties': {
                    '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                    'From': from,
                    'To': { 'results': toUsers },
                    'CC': { 'results': ccUsers },
                    'Body': msg,
                    'Subject': emailCommonSubject
                }
            };
            $scope.SendEmailNotification(Metadata);
        }
        GetSiteUrlf = function () {

            $scope.GetDocumentType();
            $scope.GetCurrentUserID();

            $scope.BindGroupsWithDropdownList();
            var Ownurl = "";
            if ($scope.departmentID == "null") {
                $scope.departmentID = Logged_DepartmentId.toString();
            }
            if ($scope.departmenalDocuments == "Yes") {
                Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=ID,MassMailID,CompanyIDId/ID,SiteURL&$filter=ID eq '" + $scope.departmentID + "' and CompanyIDId eq '" + $scope.companyID + "'"
            }
            else {
                Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Companies')/items?$select=ID,SiteURL&$filter=ID eq '" + $scope.companyID + "'"
            }

            $http({
                url: Ownurl,
                method: "GET",
                async: false,
                headers: { "Accept": "application/json;odata=verbose" }
            }).then(function mySuccess(response) {

                if ($scope.departmenalDocuments == "Yes") {
                    $scope.siteURL = response.data.d.results[0].SiteURL;//Departmental URL for DMS
                    $(".doc-type-div label").addClass("required");       //for add css for label 
                    massmailid = [];
                    var mailid = response.data.d.results[0].MassMailID;
                    if (mailid != null) {
                        if (mailid.indexOf(",") > -1) {
                            massmailid = mailid.split(',');
                        }
                        else {
                            massmailid.push(mailid);
                        }
                    }

                }
                else {
                    $scope.siteURL = _spPageContextInfo.webAbsoluteUrl;//Root Site URL Form DMS
                    $(".doc-type-div label").removeClass("required");
                }


                if ($scope.currentUploadedDocumentItemId != null && $scope.currentUploadedDocumentItemId != "") {
                    $scope.GetDocumentProperties();
                }

            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });
        }
        $scope.AddNewNotification = function (ListName, documentID, sharedWith, documentURL) {

            var Metadata;
            var ItemType = $scope.GetItemTypeForListNameDetails(ListName);
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                DocumentID: documentID.toString(),
                SharedWith: sharedWith,
                DocumentURL: documentURL
            };

            $scope.AddItemToList(ListName, Metadata);
        }
        $scope.GetItemTypeForListNameDetails = function (ListName) {
            return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
        }
        $scope.AddItemToList = function (ListName, Metadata) {
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
        //use this method for access level documents only
        $scope.GetAllCurrentDepartmentsFiles = function (siteURL, accessLevel) {
            var Ownurl = $scope.siteURL + "/_api/web/Lists/GetByTitle('DepartmentalDMS')/Items?$select=ID,DocumentNo,DocumentType,Regarding,Details,DocumentWrittenBy,Title,SecurityLevel,AccessLevel,File/Name,File/ServerRelativeUrl&$expand=File&$filter=AccessLevel eq '" + accessLevel + "'";
            $http({
                url: Ownurl,
                method: "GET",
                async: false,
                headers: { "Accept": "application/json;odata=verbose" }
            }).then(function mySuccess(response) {
                $scope.evryOneDocument = response.data.d.results;
            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });
        }
        $scope.CheckFileExist = function (folderName, siteURLs, textFileUrLLink) {
            var dmsLibraryNamee = "";
            if ($scope.departmenalDocuments == "Yes") {
                dmsLibraryNamee = "DepartmentalDMS";
            }
            else {
                dmsLibraryNamee = "DocumentManagementSystem";
            }

            var urllink = "";
            if (folderName == "") {
                urllink = siteURLs + "/_api/web/getFolderByServerRelativeUrl('" + dmsLibraryNamee + "')/files?$filter=Name eq '" + textFileUrLLink + "'";
            }

            else {
                urllink = siteURLs + "/_api/web/getFolderByServerRelativeUrl('" + dmsLibraryNamee + "/" + folderName + "')/files?$filter=Name eq '" + textFileUrLLink + "'";
            }
            $.ajax({
                url: urllink,
                type: "GET",
                headers: {
                    "accept": "application/json;odata=verbose"
                },
                async: false,
                success: function (data) {
                    if (data.d.results.length > 0) {
                        $scope.FileExist = true;
                    }
                    else {
                        $scope.FileExist = false;
                    }
                    console.log("file exists");
                },
                error: function (error) {
                    if (error.status == 404) {
                        $scope.FileExist = false;
                        console.log("file doesnt exist");
                    }

                }
            });
            return $scope.FileExist;
        }
        $scope.uploadFileCrossSiteCompany = function (folderName, file, webUrl) {
            //sites/site/library/filename.extenstion
            var textFileUrLLink = file.name;
            var arrMetadata = [];
            if ($('#chkKeepExist').is(':checked') == true) { //Keep Existing metadata
                arrMetadata = IsFileExist(folderName, textFileUrLLink, webUrl);
                $scope.uploadDocuments(folderName, file, webUrl, arrMetadata);
            }
            else if ($('#chkUploadNew').is(':checked') == true) { //upload new metadata
                arrMetadata = [];
                $scope.uploadDocuments(folderName, file, webUrl, arrMetadata);
            }
            else if ($('#chkNotUpload').is(':checked') == true) { //Do not upload duplicate particular file
                arrMetadata = IsFileExist(folderName, textFileUrLLink, webUrl);
                if (arrMetadata.length == 0) {
                    //No file with this name exists in given path
                    $scope.uploadDocuments(folderName, file, webUrl, arrMetadata);
                }
                else {
                    countermail++;
                    if (FinalFiles4Upload[FinalFiles4Upload.length - 1].name == textFileUrLLink) {
                        alert("Successfully uploaded.");
                        waitingDialog.hide();
                        $("#myModalupload").modal("hide");
                        $('#chkReplaceVer').trigger('click');
                    }
                    //Do not upload
                }
            }
            else {
                //Do Nothing
            }
            /*if (!$scope.CheckFileExist(folderName, webUrl, textFileUrLLink)) {
                $scope.uploadDocuments(folderName, file, webUrl);
            }
            else {
                var txt;
                var r = confirm("File Name Exists Already. Do You Wish to Continue?");
                if (r == true) {
                    // waitingDialog.show();
                    $scope.uploadDocuments(folderName, file, webUrl);
                }
            }*/
        }
        $scope.uploadFileCrossSiteDepartment = function (folderName, file, webUrl) {
            var textFileUrLLink = file.name;
            var arrMetadata = [];
            if ($('#chkKeepExist').is(':checked') == true) { //Keep Existing metadata
                arrMetadata = IsFileExist(folderName, textFileUrLLink, webUrl);
                $scope.uploadDocumentsDepartment(folderName, file, webUrl, arrMetadata);
            }
            else if ($('#chkUploadNew').is(':checked') == true) { //upload new metadata
                arrMetadata = [];
                $scope.uploadDocumentsDepartment(folderName, file, webUrl, arrMetadata);
            }
            else if ($('#chkNotUpload').is(':checked') == true) { //Do not upload duplicate particular file
                arrMetadata = IsFileExist(folderName, textFileUrLLink, webUrl);
                if (arrMetadata.length == 0) {
                    //No file with this name exists in given path
                    $scope.uploadDocumentsDepartment(folderName, file, webUrl, arrMetadata);
                }
                else {
                    countermail++;
                    if (FinalFiles4Upload[FinalFiles4Upload.length - 1].name == textFileUrLLink) {
                        alert("Successfully uploaded.");
                        waitingDialog.hide();
                        $("#myModalupload").modal("hide");
                        $('#chkReplaceVer').trigger('click');
                    }
                    //Do not upload
                }
            }
            else {
                //Do Nothing
            }

            /*if (!$scope.CheckFileExist(folderName, webUrl, textFileUrLLink)) {
                // waitingDialog.show();
                $scope.uploadDocumentsDepartment(folderName, file, webUrl);
            }
            else {
                var txt;
                var r = confirm("File Name Exists Already. Do You Wish to Continue?");
                if (r == true) {
                    //  waitingDialog.show();
                    $scope.uploadDocumentsDepartment(folderName, file, webUrl);
                }
            }*/
        }
        $scope.uploadDocuments = function (folderName, file, webUrl, ExistFileMetadata) {

            url = webUrl + "/_api/contextinfo";
            $.ajax({
                url: url,
                type: "POST",
                headers: {
                    "Accept": "application/json; odata=verbose"
                },
                contentType: "application/json;odata=verbose",
                success: function (data) {
                    var digest = data.d.GetContextWebInformation.FormDigestValue;
                    var libraryName = "DocumentManagementSystem";

                    var reader = new FileReader();
                    var arrayBuffer;

                    reader.onload = function (e) {
                        arrayBuffer = reader.result;

                        var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + libraryName;
                        if (checkSpecialCharaters(file.name) == true)
                        {
                            var changedFileName = file.name.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
                        }
                        else {
                            var changedFileName = file.name;
                        }
                        url = webUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderName + "')/Files/add(url='" + changedFileName + "',overwrite=true)?@target='" + targetUrl + "'&$expand=ListItemAllFields";
                        try {
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: arrayBuffer,
                                headers: {
                                    "Accept": "application/json; odata=verbose",
                                    "X-RequestDigest": digest
                                },
                                contentType: "application/json;odata=verbose",
                                processData: false,
                                success: function (response) {
                                    $scope.uploadedFileName = response.d.Name
                                    $scope.sharingLink = response.d.ServerRelativeUrl;
                                    var propertiesServerRelativeUrl = '';
                                    //$scope.documentUrl = document.location.origin + response.d.ServerRelativeUrl;
                                    propertiesServerRelativeUrl = response.d.ListItemAllFields.ServerRedirectedEmbedUri;
                                    if (propertiesServerRelativeUrl == null || propertiesServerRelativeUrl == "") {
                                        propertiesServerRelativeUrl = encodeURI(response.d.ServerRelativeUrl);
                                    }
                                    if (response.d.Name.includes(".pdf") == false) {//to check if it's PDF
                                        propertiesServerRelativeUrl = propertiesServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
                                    }
                                    DocUrlCollection.push({ FileUrl: propertiesServerRelativeUrl, FileName: response.d.Name });
                                    // DocUrlCollection.push(document.location.origin + response.d.ServerRelativeUrl);
                                    $scope.messageAfterSuccess = "Successfully Uploaded.";
                                    countermail++;
                                    $.when($scope.getTargetIDByUrl(webUrl, response.d.ServerRelativeUrl)).done(function (responsecurrentItemId) {
                                        var documentItemID = responsecurrentItemId;//response.d.ListItemAllFields.ID;
                                        $scope.currentUploadedDocumentItemId = documentItemID;
                                        $scope.updateDocumentProperties(libraryName, documentItemID, webUrl, ExistFileMetadata);
                                    });
                                },
                                error: function (errorr) {
                                	$("#overlaysearch").fadeOut();
                                    alert("Please try again something went wrong.<br/>" + JSON.stringify(errorr));
                                    $("#myModalupload").modal("hide");

                                }
                            }).fail(function (error) {
                                $("#overlaysearch").fadeOut();
                                alert(error.responseJSON.error.message.value);
                            });
                        }
                        catch (error) {
                            $("#overlaysearch").fadeOut();
                            console.log(error);
                        }
                    };
                    reader.readAsArrayBuffer(file);
                },
                error: function (errorr) {
                	$("#overlaysearch").fadeOut();
                    alert("Please try again something went wrong.<br/>" + JSON.stringify(errorr));
                    // waitingDialog.hide();
                    $("#myModalupload").modal("hide");
                }

            });

        }
        $scope.getTargetIDByUrl = function (siteUrl, targetFileUrl) {
            $.ajax({
                url: siteUrl + "/_api/Web/GetFileByServerRelativeUrl('" + targetFileUrl + "')/ListItemAllFields",
                type: 'GET',
                async: false,
                headers: { 'accept': 'application/json;odata=verbose' },
                success: function (responseData) {
                    commonserverRedirectedEmbedUri = responseData.d.ServerRedirectedEmbedUri;
                    if (commonserverRedirectedEmbedUri == null || commonserverRedirectedEmbedUri == "") {
                        commonserverRedirectedEmbedUri = "";
                    }
                    targetRoleDefinitionId = responseData.d.Id;
                },
                error: function (errorMessage) {
                    $("#myModalupload").modal("hide");
                    //  waitingDialog.hide();
                    console.log('error  targetFileUrl');
                }
            });
            return targetRoleDefinitionId;
        }
        $scope.uploadDocumentsDepartment = function (folderName, file, webUrl, ExistFileMetadata) {

            url = webUrl + "/_api/contextinfo";
            $.ajax({
                url: url,
                type: "POST",
                headers: {
                    "Accept": "application/json; odata=verbose"
                },
                contentType: "application/json;odata=verbose",
                success: function (data) {
                    var digest = data.d.GetContextWebInformation.FormDigestValue;
                    var libraryName = "DepartmentalDMS";

                    var reader = new FileReader();
                    var arrayBuffer;

                    reader.onload = function (e) {
                        arrayBuffer = reader.result;
                        var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + libraryName;
                        if (checkSpecialCharaters(file.name) == true)
						{
							var changedFileName = file.name.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
						}
						else {
							var changedFileName = file.name;
						}

                        url = webUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderName + "')/Files/add(url='" + changedFileName + "',overwrite=true)?@target='" + targetUrl + "'&$expand=ListItemAllFields";

                        $.ajax({
                            url: url,
                            type: "POST",
                            data: arrayBuffer,
                            headers: {
                                "Accept": "application/json; odata=verbose",
                                "X-RequestDigest": digest
                            },
                            contentType: "application/json;odata=verbose",
                            processData: false,
                            success: function (response) {
                                //$scope.documentUrl = document.location.origin + response.d.ServerRelativeUrl;
                                var propertiesServerRelativeUrl = '';
                                //$scope.documentUrl = document.location.origin + response.d.ServerRelativeUrl;
                                propertiesServerRelativeUrl = response.d.ListItemAllFields.ServerRedirectedEmbedUri;
                                if (propertiesServerRelativeUrl == null || propertiesServerRelativeUrl == "") {
                                    propertiesServerRelativeUrl = encodeURI(response.d.ServerRelativeUrl);
                                }
                                if (response.d.Name.includes(".pdf") == false) {//to check if it's PDF
                                    propertiesServerRelativeUrl = propertiesServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
                                }
                                DocUrlCollection.push({ FileUrl: propertiesServerRelativeUrl, FileName: response.d.Name });
                                // DocUrlCollection.push(document.location.origin + response.d.ServerRelativeUrl);

                                $scope.messageAfterSuccess = "Successfully Uploaded.";
                                countermail++;
                                $.when($scope.getTargetIDByUrl(webUrl, response.d.ServerRelativeUrl)).done(function (responsecurrentItemId) {
                                    var documentItemID = responsecurrentItemId;//response.d.ListItemAllFields.ID;
                                    $scope.currentUploadedDocumentItemId = documentItemID;
                                    $scope.updateDocumentProperties(libraryName, documentItemID, webUrl, ExistFileMetadata);
                                });
                            },
                            error: function (errorr) {
                                alert("Please try again something went wrong.<br/>" + JSON.stringify(errorr));
                                // waitingDialog.hide();
                                //  $("#myModalupload").modal("hide");

                            }
                        });
                    };
                    reader.readAsArrayBuffer(file);
                },
                error: function (errorr) {
                    alert("Please try again something went wrong.<br/>" + JSON.stringify(errorr));
                    // waitingDialog.hide();
                    $("#myModalupload").modal("hide");
                }

            });



        }
        $scope.createFolder = function (file) {
            var siteUrl = $scope.siteURL;
            if ($scope.accessLevel.indexOf("Everyone") != -1 || $scope.accessLevel == "Department Only") {
                folderName = readTargetUrlCookie("MyDepartmentDocumentCurrentFolder" + _spPageContextInfo.siteId);
                if (approvelRequiredForDocuments == "Pending") {
                    if (documentApproverUserIdArrayList.length == 0) {
                        alert("Document Approver is not defined ,Please contact site administrator !");
                        return false;
                    }
                }


                $scope.uploadFileCrossSiteDepartment(folderName, file, siteUrl);
            }
            else {
                //company Documents Uploading
                if ($scope.currentUserEmailID != null && $scope.currentUserEmailID != "") {
                    folderName = readTargetUrlCookie("UploadedDocumentTargetFolderURl");

                    $scope.uploadFileCrossSiteCompany(folderName, file, $scope.siteURL);

                }
                else {
                    alert("It seems your email id doesn't exist .Please contact site administrator to check your email id!");
                }
            }
        }
        $scope.CheckDocumentNoExist = function (siteURLs, folderName) {
            $scope.compareFileDocumentNo = false;

            if ($scope.documentNo == null || $scope.documentNo == "") {
                return $scope.compareFileDocumentNo;
            }

            var urllink = "";
            if (folderName == "") {
                urllink = siteURLs + "/_api/web/getFolderByServerRelativeUrl('DepartmentalDMS')/files?select=ID,ListItemAllFields/DocumentNo&$expand=ListItemAllFields&$filter=ListItemAllFields/DocumentNo eq '" + $scope.documentNo.toUpperCase() + "'";
            }
            else {
                urllink = siteURLs + "/_api/web/getFolderByServerRelativeUrl('" + folderName + "')/files?select=ID,ListItemAllFields/DocumentNo&$expand=ListItemAllFields&$filter=ListItemAllFields/DocumentNo eq '" + $scope.documentNo.toUpperCase() + "'";
            }

            $.ajax({
                url: urllink,
                type: "GET",
                headers: {
                    "accept": "application/json;odata=verbose"
                },
                async: false,
                success: function (data) {
                    if (data.d.results.length > 0) {
                        $scope.compareFileDocumentNo = true;
                    }
                },
                error: function (error) {
                    if (error.status == 404) {
                        //  fileDocumentNo = false;
                        console.log("file doesnt exist");
                    }

                }
            });
            //return fileDocumentNo;
        }

        $scope.BindGroupsWithDropdownList = function () {

            var Ownurl = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getbytitle('DocumentSharedGroups')/items?$select=ID,SharingLevel,SharedUsers/Title,SharedUsers/UserName,SharedUsers/ID,LogonUser/ID,LogonUser/UserName&$expand=SharedUsers,LogonUser&$filter=LogonUser/ID eq '" + $scope.currentUserId + "'"
            $http({
                url: Ownurl,
                method: "GET",
                async: false,
                headers: { "Accept": "application/json;odata=verbose" }
            }).then(function mySuccess(response) {
                var groupsNameArray = new Array();
                // groupsNameArray.push("--select--")
                groupsNameArray.push("Private");
                groupsNameArray.push("Selective");
                groupsNameArray.push("Organization");
                for (var groupIndex = 0; groupIndex < response.data.d.results.length; groupIndex++) {
                    groupsNameArray.push(response.data.d.results[groupIndex].SharingLevel);
                }
                $scope.secirityLevelCollection = groupsNameArray;

            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });

        }
        //Get Custom Permission Level ID by Name
        $scope.getTargetRoleDefinitionId = function () {

            var permissioLevelName = $scope.permissionLevel;
            if (permissioLevelName != "--select--") {
                $.ajax({
                    url: $scope.siteURL + '/_api/web/roledefinitions/getbyname(\'' + permissioLevelName + '\')/id',
                    type: 'GET',
                    headers: { 'accept': 'application/json;odata=verbose' },
                    success: function (responseData) {
                        $scope.permissionLevelId = responseData.d.Id;
                    },
                    error: function (errorMessage) {
                        console.log('error permissionLevel.');
                    }
                });
            }

        }
    }

    $scope.BreakInheritePermissionOnEveryOneDepartment = function () {
        var dmsLibraryNamee = "";
        dmsLibraryNamee = "DepartmentalDMS";
        var headers = {
            "Accept": "application/json;odata=verbose",
            "content-Type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        }
        var endPointUrl = $scope.siteURL + "/_api/web/lists/getByTitle('" + dmsLibraryNamee + "')/getItemById(" + $scope.currentUploadedDocumentItemId + ")/breakroleinheritance(copyRoleAssignments=true, clearSubscopes=true)";
        $.ajax({
            url: endPointUrl,
            type: "POST",
            headers: headers,
            async: false,
            dataType: 'json',
            success: function (data) {
                // var EverOneGroupId= 17;
                //  var EverOneGroupId= 14;
                $.when(getTargetGroupId()).done(function (response) {
                    var EverOneGroupId = groupIdofEveryone;
                    if (EverOneGroupId != null || EverOneGroupId != '') {
                        //Assign permission to other users
                        if ($("#ddlShareWith :selected").text() == "Everyone (View, Download)") {
                            $scope.AssignPermission(EverOneGroupId, "1073741826");// permission for other users - Read
                        }
                        else {
                            $scope.AssignPermission(EverOneGroupId, "1073741937");// permission of restricted view
                        }
                    }
                });
            },

            error: function (error) {
                console.log(JSON.stringify(error));
            }
        });

    }


    $scope.ResetBreakInheriteOnDepartment = function () {
        var dmsLibraryNamee = "";
        dmsLibraryNamee = "DepartmentalDMS";
        var headers = {
            "Accept": "application/json;odata=verbose",
            "content-Type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        }
        var endPointUrl = $scope.siteURL + "/_api/web/lists/getByTitle('" + dmsLibraryNamee + "')/getItemById(" + $scope.currentUploadedDocumentItemId + ")/ResetRoleInheritance()";
        $.ajax({
            url: endPointUrl,
            type: "POST",
            headers: headers,
            async: false,
            dataType: 'json',
            success: function (data) {
                console.log("Success");
            },

            error: function (error) {
                console.log(JSON.stringify(error));
            }
        });
    }
});

function ValidFiles(fileName) {
    var fileName_flag = true;
    var ext = fileName.split('.').pop().toLowerCase();
    if ($.inArray(ext, ['exe', 'msi', 'dll']) == -1) {
        fileName_flag = true
    }
    else {
        fileName_flag = false;
    }
    return fileName_flag
}

function SharedHistoryToList(sharedUsersId, documentId, permissionType) {
    var ListName = "SharingHistory";
    CurrentUserName = [];
    CurrentUserName.push(_spPageContextInfo.userId);
    var Metadata;
    var ItemType = GetItemTypeForListNameDetailsGroups(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        SharedToId: { "results": sharedUsersId },//Shared users
        DocumentID: documentId,//Shared file/folder id
        PermissionType: permissionType,//1 for readonly 2 for editor
        DMSOfId: { "results": CurrentUserName },
    };

    $.when(AddItemToListGroups(ListName, Metadata)).done(function (response) {
        // alert("Document has been shared successfully.");   
    });
}

var groupIdofEveryone = ''
function getTargetGroupId() {
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/siteusers?$filter=PrincipalType eq 4 and Title eq 'Everyone'";

    $.ajax({
        url: siteurl,
        type: 'GET',
        headers: { 'accept': 'application/json;odata=verbose' },
        async: false,
        success: function (data, status, xhr) {
            groupIdofEveryone = data.d.results[0].Id;
            return groupIdofEveryone;
        },
        error: function (data, status, error) {
            console.log(data.responseJSON.error);
        }

    });
}

//to check if file exists at given path
function IsFileExist(FolderName, FileName, WebURL) {
    var serverRelativeURL = "/" + WebURL.substring(WebURL.indexOf('/s') + 1);
    var Checkpath = serverRelativeURL + "/" + FolderName + FileName;
    var arrFileData = [];
    jQuery.ajax({
        url: WebURL + "/_api/web/getfilebyserverrelativeurl('" + Checkpath + "')?$expand=ListItemAllFields&$select=ListItemAllFields/AccessLevel,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentNo," +
            "ListItemAllFields/DocumentType,ListItemAllFields/SharedId,ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Title",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function (data) {
            arrFileData = data.d.ListItemAllFields;
        },
        error: function (error) {
            if (error.status == 404) {
                console.log(FileName + " file doesnt exist");
            }

        }
    });
    return arrFileData;

}

//get Existed file Metadata 
function updateDeptDocMetadata(FilePath, FileName, arrMetadata, ItemId) {
    var dfd = $.Deferred();

    var Metadata;
    var ItemType = GetItemTypeForListName('DocumentManagementSystem');

    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: arrMetadata.Title ? arrMetadata.Title : "",
        DocumentNo: arrMetadata.DocumentNo ? arrMetadata.DocumentNo : "",
        DocumentType: arrMetadata.DocumentType ? arrMetadata.DocumentType : "",
        DocumentWrittenBy: arrMetadata.DocumentWrittenBy ? arrMetadata.DocumentWrittenBy : "",
        Regarding: arrMetadata.Regarding ? arrMetadata.Regarding : "",
        Details: arrMetadata.Details ? arrMetadata.Details : "",
        Department: arrMetadata.Title ? arrMetadata.Title : "",
        AccessLevel: arrMetadata.AccessLevel ? arrMetadata.AccessLevel : "",
        SecurityLevel: arrMetadata.SecurityLevel ? arrMetadata.SecurityLevel : "",
        PermissionLevel: arrMetadata.PermissionLevel ? arrMetadata.PermissionLevel : "",
        PermissionLevelId: arrMetadata.PermissionLevelId ? arrMetadata.PermissionLevelId : "",
        //SharedId: { 'results': arrMetadata.SharedId.results ? arrMetadata.SharedId.results : [] },
        //ApprovalStatus: arrMetadata.ApprovalStatus ? arrMetadata.ApprovalStatus : ""

    };
    if (arrMetadata.SharedId != null) {
        Metadata.SharedId = { 'results': arrMetadata.SharedId.results };
    }
    var oweburl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('DocumentManagementSystem')/Items(" + ItemId + ")";
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
            console.log(FileName + " duplicate uploaded");;
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);

        }

    });
    return dfd.promise();
}