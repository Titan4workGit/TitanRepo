var withoutLastChunk;
var Documentname;
var DMS_Type = '';
var DMS_Link = '';
var HeadingTitle = "My Documents"
var RequestDigest = $("#__REQUESTDIGEST").val();
var Visibility = "";
var ColumnName = "";
var ColumnType = "";
var Position = "";
var Datatype = "";
var RowCount = 0;
var DefaultColumnName = [];
var SetColumnName = [];
var CheckLibary = "";
var peoplePickerDiv = "";
var MyFavoritedata = [];
var IsMyfavorate = false;
var SiteUrl = "";
var arrFileFolder = [];
var siteName = "";
var Departmental = "";
var AllTable = "";
var IsFullControl = false;
var IsContributor = false;
var IsdeleteListItems = false;
var IsRestrictedContribute = false;
var IsmanagePermissions = false;
var IsRestrictedView = false;
var arrFilterTable = [];
var DynamicTable = "";
var currentSectionType = '';
var IsNotpermission = false;
var currentSharedItemId = '';
var LibraryType = "";
var listTitle = "";
var GlobalAnchorObj = "";
var IsTeamLibary = false;
var MsTeamId = "";


$(document).ready(function() {
    var allSelect = [];
    var beforeSelect = '';
    if(EmployeeDetails[0].ParentId == -9) {
        $("#LinkExistLib").remove();
    }
    userActivityNotificationEntry(_spPageContextInfo.userId,window.location);
    $(".panel").click(function() {
        $(".panel").removeClass("active");
        $(this).addClass("active");
        if ($('ul#accordion').find('li.active').attr('id') != 'liSharedDocs') {
            ActionBtnControls();
        }
    });
    $("#linkAllowPerm").click(function() {
        SetAdminForTeam();
    });

    function updateArray() {
        allSelect = [];
        $('.numbers').each(function(index, element) {
            allSelect.push(element.id + '_' + element.value);

        });
    }
    $("#ddlGroupUserRoles").change(function() {
        $("#chkPermissionSelectAll").prop('disabled', '');
        $("#btnsubmituser").prop('disabled', '');
        if (currentSectionType == 'Group Documents') {
            BindUserRoles_Gp(this);
        }
        else if (currentSectionType == 'Department') {
            BindUserRoles_Dept(this);
        }
        else if (currentSectionType == 'ProjectDocuments') {
            BindUserRoles_Proj(this);
        }
        else if (currentSectionType == 'GuestDocuments') {
            BindUserRoles_Guest(this);
        }

    });
    $(".closePermissionModal").change(function() {
        arrUserAssignPermission = [];
    });
    $("#chkPermissionSelectAll").click(function() {
        if (this.checked == true) {
            $('.Permissionchk').prop("checked", "");
            $('.Permissionchk').trigger('click');
        }
        else {
            $('.Permissionchk').prop("checked", "");
            arrUserAssignPermission = [];
        }
    });

    
    $('#Settings').on('shown.bs.modal', function(e) {
        updateArray();
    });

    $('.numbers').on('focusin', function() {
        beforeSelect = $(this).val();
        console.log("before  value " + beforeSelect);
    });

    $('.numbers').on('change', function() {
        //console.error('on change value'+ this.value );

        //console.log(allSelect);
        for (var i = 0; i < allSelect.length; i++) {
            var slitStr = 0;
            slitStr = allSelect[i].split('_');
            if (slitStr[1] == this.value && this.value != '1') {
                console.log('match');
                $("#" + slitStr[0]).val(beforeSelect);
            } 
            else {
            }
        } // end for loop

        setTimeout(function() {
            updateArray();
        }, 2000);
    });
    $("#btnRemoveFavorite").click(function() {
        if (arrFileFolder.length > 0) {
            waitingDialog.show();
            setTimeout(function() {
                DeleteMultiFavourite();
            }, 100);
        } else {
            alert("Kindly select any file first.");
            return false;
        }
    });
    $("#btnsubmituser").click(function (v) {
        if($("#DMembers").css('display') != "none"){
            AddMemberToLibrary();
        }
        else { //Add Permission
            AddPermissionsToFileFolder();
        }
    	
    });
    //on Keyup search of Members popup
    $('#txtMembersSearch').on('input', function () {
	    var value = $(this).val();
	    if ($('#txtMembersSearch').val().trim() != '') {
	        $("#divPermissionsmember > .col-md-6").each(function () {    // loop through divs
	            debugger;
	            var TextValue = $(this).find(".member-name").text() + $(this).find(".member-email").text() + $(this).find(".internal-members-dropdown :selected").text();
	            TextValue = TextValue.toLowerCase();
	            if (TextValue.indexOf(value.toLowerCase()) > -1) { // if this div contains value
	                $(this).addClass('highlight');
	            } else {  // if not contains the value
	                $(this).removeClass('highlight');
	            }
	        });
	        $("#divPermissions > .col-md-6").each(function () {    // loop through divs
	            debugger;
	            var TextValue = $(this).find(".member-name").text() + $(this).find(".member-email").text() + $(this).find(".internal-members-dropdown :selected").text();
	            TextValue = TextValue.toLowerCase();
	            if (TextValue.indexOf(value.toLowerCase()) > -1) { // if this div contains value
	                $(this).addClass('highlight');
	            } else {  // if not contains the value
	                $(this).removeClass('highlight');
	            }
	        });
	    }
	    else {
	        $("#divPermissionsmember > .col-md-6").removeClass('highlight');
	        $("#divPermissions > .col-md-6").removeClass('highlight');
	    }
	});
    getProjectCount();
});
// Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId, AllowMultipleValues) {
	
    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = AllowMultipleValues;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '351px';

    // Render and initialize the picker. 
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);

    $(".sp-peoplepicker-editorInput").width(250);
}

if(titanForWork.getQueryStringParameter('Section') == "ApprovalInbox") {
    $("#toggleAppInbox").trigger("click");
    arrAppIds = [];
    arrPermission = [];
    currentSectionType = "ApprovalInbox";
    $(".AppTabShow").show();
    $(".AppTabHide").hide();
    $(".chkAppOut").prop('checked', '');
    waitingDialog.show();
    setTimeout(function () {
        $("#tabApprovalInbox").trigger("click");
    }, 100);
    $(window).load(function() {
        var getTriggerId = window.atob(GetQueryStringValue("File"));
        $("#"+getTriggerId).trigger('click');	
    });
}
else {
    MyFavoriteDocument();
}


function MyFavoriteDocument() {
    var SiteUrl = "";
    currentSectionType = "MyFavorite";
    var restQueryPersonalDMS = "?$top=50&$select=*,User/Id&$expand=User&$orderby=Modified desc&$filter= User/Id eq '" + _spPageContextInfo.userId + "' and Category  eq 'Document' and Active eq '1'";
    $.when(getItemsWithQuery("MyFavorites", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function(MyFavorites) {

        if (MyFavorites.length > 0) {
            $("#liFavoriteDocuments").show();
            $(".cont_breadcrumbs_1").hide();
            $('#liFavoriteDocuments').addClass('active');
            $("#fordive").show();
            $("#StorageDrive").hide();
			
            currentSectionType == 'MyFavorite'
            ActionBtnControls();
            $(".breadcrumb").html('');
            HeadingTitle = "My Favorite Documents"
            $(".headdingLinks").html("");
            $(".headdingLinks").html(HeadingTitle);
            SiteUrl = "";
            var Library = "";
            var DocId = "";
            MyFavoritedata = [];
            IsMyfavorate = true;
            var FavItemId = '';
            arrFilterTable = [];
            arrFileFolder = [];
            $(".btnFilterClear").trigger('click');
            for (var i = 0; i < MyFavorites.length; i++) {
                SiteUrl = MyFavorites[i].SiteLink;
                Library = MyFavorites[i].DMSName;
                DocId = MyFavorites[i].DocumentID;
                FavFrom = MyFavorites[i].LibraryName;
                FavItemId = MyFavorites[i].Id;
                var RestQuery = "?$select=*,ApprovedBy/Title&$expand=file,folder,ApprovedBy";
                var QueryLibraryName = Library;
                if(QueryLibraryName == "Shared Documents" || QueryLibraryName == "Shared%20Documents") {
                    QueryLibraryName = "Documents";
                }
                $.when(getDocItemsWithQueryItemById(QueryLibraryName, RestQuery, SiteUrl, DocId)).done(function(docsresults) {
                    if (docsresults.Title == null || docsresults.Title == "null" || docsresults.Title == "--select--" || docsresults.Title == "-Select-") {
                        docsresults.Title = '';
                    }
                    if(docsresults.DocumentType == null || docsresults.DocumentType == "null" || docsresults.DocumentType == "--select--" || docsresults.DocumentType == "-Select-" ) {
                        docsresults.DocumentType = '';              
                    }
                    MyFavoritedata.push({
                        'Name': docsresults.File.Name,
                        'Title': docsresults.Title,
                        'Modified': docsresults.Modified,
                        'ApprovedBy': docsresults.ApprovedBy.Title,
                        'DocumentNo': docsresults.DocumentNo,
                        'ApprovedDate': docsresults.ApprovedDate,
                        'ApprovalStatus': docsresults.Approval,
                        'ServerRelativeUrl': docsresults.File.ServerRelativeUrl,
                        'ItemId': FavItemId,
                        'AccessLevel': docsresults.AccessLevel,
                        'SecurityLevel': docsresults.SecurityLevel,
                        'DocId': docsresults.Id,
                        'SharedId': docsresults.SharedId,
                        'CheckOutType': docsresults.File.CheckOutType,
                        'SiteURL': SiteUrl,
                        'DocumentType': docsresults.DocumentType,
                        'DocumentWrittenBy': docsresults.DocumentWrittenBy,
                        'PermissionLevel': docsresults.PermissionLevel,
                        'SharedWithUsersId': docsresults.SharedWithUsersId,
                        'FavoriteFrom': FavFrom,
                        'Titan_Permission': docsresults.Titan_Permission
                    });
                });
            }

            DefaultColumnName = ['Name', 'Title', 'DocumentType', 'DocumentNo', 'Modified', 'Library', 'Shared', 'ApprovedBy']
            SetColumnName = [];
            for (var i = 0; i < DefaultColumnName.length; i++) {
                SetColumnName.push({
                    'ColumnName': DefaultColumnName[i],
                });
            }
            GenrateHtmlGrid(SetColumnName, IsMyfavorate, MyFavoritedata);
            IsMyfavorate = false;

        } else {
            $("#liFavoriteDocuments").hide();
            $("#liFavoriteDocuments").removeClass("active");
            //$("#divNew").show();
            //$("#divUpload").show();
            //$("#btnAppMore").show();
            $('#liMyDocuments').addClass('active');
            currentSectionType = "My Documents";
            ActionBtnControls();
            GetLibrayDetails();
        }
    });

}




function getIsCurrentUserInGroup(siteUrl, groupId) {

    const UrlLink = siteUrl.split('/Forms')[0];
    SiteUrl = UrlLink.slice(0, UrlLink.lastIndexOf("/"));

    var isMember = false;
    $.ajax({
        url: SiteUrl + "/_api/web/sitegroups/getbyname('" + groupId + "')/Users", //?$filter=Email eq " + _spPageContextInfo.userEmail,
        method: "GET",
        async: false,
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function(data) {
            if (data.d.results.length > 0) {

                var IsMemberGroup = data.d.results.filter(function(filterData) {

                    return filterData.UserPrincipalName == _spPageContextInfo.userEmail;
                });

                if (IsMemberGroup.length > 0) {
                    isMember = true;
                } else {
                    isMember = false;
                }
            }

        },
        error: function(err) {
            console.log("Error while checking user in Owner's group");
        }
    });

    return isMember;
}

function MyDocumentEnv() {

    HeadingTitle = "Group Documents"
    // $(".headdingLinks").html("");
    // $(".headdingLinks").html(HeadingTitle);
    arrFileFolder = [];
    arrFilterTable = [];
    $(".btnFilterClear").trigger('click');
    companyID = titanForWork.getQueryStringParameter("CompanyId");
    var restQueryPersonalDMS = "?$top=5000&$select=*,RestrictedContributor/Title,Author/Id,CompanyID/Id&$expand=Author,RestrictedContributor,CompanyID&$orderby=Title asc&$filter= ((EmployeeName/Id eq '" + _spPageContextInfo.userId + "') or (Contributors/Id eq '" + _spPageContextInfo.userId + "') or (Readers/Id eq '" + _spPageContextInfo.userId + "')or (Viewers/Id eq '" + _spPageContextInfo.userId + "')or (RestrictedContributor/Id eq '" + _spPageContextInfo.userId + "')) and Status eq 'Active' ";
    $.when(getItemsWithQuery("PersonalDMS_Setting", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function(PersonalDMSData) {
        $("#accordioninner3").html("");
        var GroupLimk = "";

        if (PersonalDMSData.length > 0) {


            for (var j = 0; j < PersonalDMSData.length; j++) {
                var IsMemberInGroup = false;
                title = PersonalDMSData[j].Title;
                status = PersonalDMSData[j].Status;
                myOwnDocumentsUrl = PersonalDMSData[j].DMS_Link;


                if (PersonalDMSData[j].LibraryType == "Team") {
                    if (PersonalDMSData[j].RestrictedContributorId != null) {
                        // IsMemberInGroup = getIsCurrentUserInGroup(PersonalDMSData[j].DMS_Link, PersonalDMSData[j].RestrictedContributor.results[0].Title);
                    }
                }


                var GetLib = "javascript:GetLibarayDetails(this,'" + myOwnDocumentsUrl + "','" + title + "','" + PersonalDMSData[j].LibraryType + "','Group Documents')";

                if (status == "Active") {

                    GroupLimk += '<div class="panel panel-default">' +
                        '<div class="panel-heading">' +
                        '<h4 class="panel-title">' +
                        '<a data-toggle="pill" href="#" data-LibraryType="' + PersonalDMSData[j].LibraryType + '" data-MSTeamID="' + PersonalDMSData[j].MSTeamID + '" data-PrivateChID="' + PersonalDMSData[j].PrivateChannelName + '" onclick="' + GetLib + '"  class="dms-left-panel-tab-inner" name="' + myOwnDocumentsUrl + '">' +
                        '<div class="d-flex align-items-center">' +
                        '<img src="../SiteAssets/MyDocuments/DMS/assets/images/group-ico.png" alt="Group Documents">' +
                        '<span class="mobile-hide-tabs-name mt3 ml10">' + title + '</span>' +
                        '</div>' +
                        '</a>' +
                        '</h4>' +
                        '</div>' +
                        '</div>';

                }


            }

            GroupLimk += '<div class="panel panel-default" id="AddNewLibBox">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title">' +
                '<a href="#" data-toggle="modal" data-target="#add-new-group-dms" onclick="cleartextbox()" class="dms-left-panel-tab-inner">' +
                '<div class="d-flex align-items-center">' +
                '<img src="../SiteAssets/MyDocuments/DMS/assets/images/add-group.png" alt="add group">' +
                '<span class="mobile-hide-tabs-name mt3 ml10">  Add New Library </span>' +
                '</div>' +
                '</a>' +
                '</h4>' +
                '</div>' +
                '</div>';

            $("#accordioninner3").append(GroupLimk);

        } else {
            GroupLimk += '<div class="panel panel-default" id="AddNewLibBox">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title">' +
                '<a href="#" data-toggle="modal" data-target="#add-new-group-dms" onclick="cleartextbox()" class="dms-left-panel-tab-inner">' +
                '<div class="d-flex align-items-center">' +
                '<img src="../SiteAssets/MyDocuments/DMS/assets/images/add-group.png" alt="add group">' +
                '<span class="mobile-hide-tabs-name mt3 ml10">  Add New Library </span>' +
                '</div>' +
                '</a>' +
                '</h4>' +
                '</div>' +
                '</div>';

            $('#accordioninner3').append(GroupLimk);

        }
        /*if(window.location.href.search(/\bTEAM\b/) >= 0) { //If page opens from Team the hide 'Add new library section'
            $("#AddNewLibBox").hide();
        }*/
    });
}



function cleartextbox() {

    $("#txtgroupTitle").val('');
    $("#txtlibraryname").val('');
    $("#txtlibaddress").val('');
    $('#ddlAction').prop('selectedIndex', 0);
    $("#txtAddDescription").val('');
    $("#divLibadd").hide();
    $("#divradioshow").hide();


}

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
        success: function(data) {
            var FormDigestValue = data.d.GetContextWebInformation.FormDigestValue;
            dfd.resolve(FormDigestValue);
            console.log(FormDigestValue);
        },
        error: function(xhr, status, error) {
            console.log("Failed");
        }
    });
    return dfd.promise();
}



function Getfileds(LibraryName, SiteUrl) {
    //_api/lists/getbytitle('DocumentManagementSystem')/fields
    var Siteurl = SiteUrl;
    var Customcolumn = ['DocumentNo', 'DocumentType', 'DocumentWrittenBy', 'Details', 'AccessLevel', 'SecurityLevel', 'PermissionLevel', 'PermissionLevelId', 'Acknowledgement', 'ApprovalStatus', 'ApprovedBy', 'ApprovedDate', 'ApprovedVersion']
    $.when(getItemsWithfields(LibraryName, SiteUrl)).done(function(fields) {

        var settextuser = "";
        var metadata = "";
        for (var j = 0; j < Customcolumn.length; j++) {
            settextuser = fields.filter(function(filterData) {

                return filterData.Title == Customcolumn[j];
            });

            //"{'__metadata':{'type': 'SP.Field'},'FieldTypeKind': " + FieldType + ",'Title':'" + NewColumn + "'}"
            if (settextuser.length == 0) {
                if (Customcolumn[j] == "Acknowledgement") {
                    metadata = {
                        "__metadata": {
                            "type": "SP.FieldChoice"
                        },
                        "FieldTypeKind": 6,
                        "Title": Customcolumn[j],
                        "Required": "false",
                        "Hidden": false,
                        "Description": "CreateByTitan",
                        "EnforceUniqueValues": "false",
                        "Choices": {
                            'results': ['Required', 'Not Required', 'N/A']
                        }
                    };
                    CreateListColumn(LibraryName, metadata, Siteurl)
                } else if (Customcolumn[j] == "ApprovalStatus") {
                    metadata = {
                        "__metadata": {
                            "type": "SP.FieldChoice"
                        },
                        "FieldTypeKind": 6,
                        "Title": Customcolumn[j],
                        "Required": "false",
                        "Hidden": "false",
                        "Description": "CreateByTitan",
                        "EnforceUniqueValues": "false",
                        "Choices": {
                            'results': ['Pending', 'Approved', 'Rejected', 'Revert', 'Forwarded']
                        }
                    };
                    CreateListColumn(LibraryName, metadata, Siteurl)
                } else if (Customcolumn[j] == "ApprovedBy") {
                    metadata = {
                        "__metadata": {
                            "type": "SP.Field"
                        },
                        "FieldTypeKind": 20,
                        "Title": Customcolumn[j],
                        "Hidden": "false",
                        "Description": "CreateByTitan",
                        "Required": "false",
                        "EnforceUniqueValues": "false"
                        //'SchemaXml': '<Field Type=\"UserMulti\" Required=\"False\" UserSelectionMode=\"PeopleAndGroups\" UserSelectionScope=\"0\" Mult=\"TRUE\" />'
                    };
                    CreateListColumn(LibraryName, metadata, Siteurl)
                } else if (Customcolumn[j] == "ApprovedDate") {
                    metadata = {
                        "__metadata": {
                            "type": "SP.Field"
                        },
                        "FieldTypeKind": 4,
                        "Title": Customcolumn[j],
                        "Required": "false",
                        "Hidden": "false",
                        "Description": "CreateByTitan",
                        "EnforceUniqueValues": "false"
                    };
                    CreateListColumn(LibraryName, metadata, Siteurl)
                } else {
                    metadata = {
                        "__metadata": {
                            "type": "SP.Field"
                        },
                        "FieldTypeKind": 9,
                        "Title": Customcolumn[j],
                        "Required": "false",
                        "Hidden": "false",
                        "Description": "CreateByTitan",
                        "EnforceUniqueValues": "false"
                    };
                    CreateListColumn(LibraryName, metadata, Siteurl)


                }



            }

        }

    });

}



//get all the Group details - Owners/Members/Visitor
function GetAllSiteGroups(SiteUrl) {
    var dfd = $.Deferred();
    var dataresults = [];
    $.ajax({
        // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
        // You can replace this with other site URL where you want to apply the function

        url: SiteUrl + "/_api/web/sitegroups",
        type: "GET",
        async: false,
        headers: {
            // Accept header: Specifies the format for response data from the server.
            "Accept": "application/json;odata=verbose"
        },
        success: function(data, status, xhr) {
            dataresults = data.d.results;
            dfd.resolve(dataresults);
        },
        error: function(xhr, status, error) {
            console.log("Failed");
        }
    });

    return dataresults;
}



function CreateListColumn(LibraryName, metadata, Siteurl) {

    var dfd = $.Deferred();
    $.ajax({
        // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
        // You can replace this with other site URL where you want to apply the function

        url: Siteurl + "/_api/web/lists/getByTitle('" + LibraryName + "')/fields",
        type: "POST",
        async: false,

        // 'FieldTypeKind' value in below line decide the datatype of the column.
        // Some 'FieldTypeKind' values are listed below, after the method, for reference.
        data: JSON.stringify(metadata),
        headers: {
            // Accept header: Specifies the format for response data from the server.
            "Accept": "application/json;odata=verbose",
            //Content-Type header: Specifies the format of the data that the client is sending to the server
            "Content-Type": "application/json;odata=verbose",
            // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
            "X-RequestDigest": RequestDigest
        },
        success: function(data, status, xhr) {
            console.log("Success");
            dfd.resolve("Success");
        },
        error: function(xhr, status, error) {
            console.log("Failed");
            dfd.reject("Failed");

        }
    });




    /* 'FieldTypeKind' values and their description mentioned below. You can use these values in above method to create column using REST API     
    Invalid - Must not be used. The value = 0.
    Integer - Specifies that the field contains an integer value. The value = 1.
    Text - Specifies that the field contains a single line of text. The value = 2.
    Note - Specifies that the field contains multiple lines of text. The value = 3.
    DateTime - Specifies that the field contains a date and time value or a date-only value. The value = 4.
    Counter - Specifies that the field contains a monotonically increasing integer. The value = 5.
    Choice - Specifies that the field contains a single value from a set of specified values. The value = 6.
    Lookup - Specifies that the field is a lookup field. The value = 7.
    Boolean - Specifies that the field contains a Boolean value. The value = 8.
    Number - Specifies that the field contains a floating-point number value. The value = 9.
    Currency - Specifies that the field contains a currency value. The value = 10.
    URL - Specifies that the field contains a URI and an optional description of the URI. The value = 11.
    Computed - Specifies that the field is a computed field. The value = 12.
    Threading - Specifies that the field indicates the thread for a discussion item in a threaded view of a discussion board. The value = 13.
    Guid - Specifies that the field contains a GUID value. The value = 14.
    MultiChoice - Specifies that the field contains one or more values from a set of specified values. The value = 15.
    GridChoice - Specifies that the field contains rating scale values for a survey list. The value = 16.
    Calculated - Specifies that the field is a calculated field. The value = 17.
    File - Specifies that the field contains the leaf name of a document as a value. The value = 18.
    Attachments - Specifies that the field indicates whether the list item has attachments. The value = 19.
    User - Specifies that the field contains one or more users and groups as values. The value = 20.
    Recurrence - Specifies that the field indicates whether a meeting in a calendar list recurs. The value = 21.
    CrossProjectLink - Specifies that the field contains a link between projects in a Meeting Workspace site. The value = 22.
    ModStat - Specifies that the field indicates moderation status. The value = 23.
    Error - Specifies that the type of the field was set to an invalid value. The value = 24.
    ContentTypeId - Specifies that the field contains a content type identifier as a value. The value = 25.
    PageSeparator - Specifies that the field separates questions in a survey list onto multiple pages. The value = 26.
    ThreadIndex - Specifies that the field indicates the position of a discussion item in a threaded view of a discussion board. The value = 27.
    WorkflowStatus - Specifies that the field indicates the status of a workflow instance on a list item. The value = 28.
    AllDayEvent - Specifies that the field indicates whether a meeting in a calendar list is an all-day event. The value = 29.
    WorkflowEventType - Specifies that the field contains the most recent event in a workflow instance. The value = 30.
    MaxItems - Must not be used. The value = 31.
     
    */

    return dfd.promise();
}



function getItemsWithQuery(ListName, Query, SiteUrl) {
    var dfd = $.Deferred();
    var siteurl = SiteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query;
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function(data) {
            dfd.resolve(data.d.results);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
//ListItemAllFields,Author,ListItemAllFields/RoleAssignments/Member,ListItemAllFields/RoleAssignments/RoleDefinitionBindings,ListItemAllFields/RoleAssignments/Member/Users,ListItemAllFields/RoleAssignments/Member/Title,Files/Author,Editor&$select= LockedByUser,CheckedOutByUser,DocumentWrittenBy,ListItemAllFields/RoleAssignments,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentType,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," +
// "ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Title,ListItemAllFields/Approval,ListItemAllFields/FileLeafRef,ListItemAllFields/ServerRedirectedEmbedUri,ListItemAllFields/Modified_x0020_By
function getItemsWithQueryUsersDocuments(ListName, Siteurl) {
    var dfd = $.Deferred();
    var siteurl = Siteurl + "/_api/Web/GetFolderByServerRelativeUrl('" + ListName + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields/HasUniqueRoleAssignments,Files/ModifiedBy/Title,Files/ListItemAllFields/HasUniqueRoleAssignments,Folders/ListItemAllFields,Files,Files/ListItemAllFields,Files/ListItemAllFields/FileSizeDisplay&$orderby=Modified desc";
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function(data) {
            dfd.resolve(data.d);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
            alert(error.responseJSON.error.message.value);
        }
    });
    return dfd.promise();
}

function getItemsWithQueryUsersDocumentsQuery(ListName, Siteurl,Query) {
    var dfd = $.Deferred();
    var siteurl = Siteurl + "/_api/Web/GetFolderByServerRelativeUrl('" + ListName + "')" + Query;
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function(data) {
            dfd.resolve(data.d);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
            alert(error.responseJSON.error.message.value);
        }
    });
    return dfd.promise();
}



function updateItemWithID(Id, ListName, Metadata) {

    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListName + "')/items(" + Id + ")",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        data: JSON.stringify(Metadata),
        success: function(data) {
            console.log("success");
            dfd.resolve(data);
        },
        error: function(error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

function updateItemWithIDTeam(Id, ListName, Metadata, SiteUrl) {

    var dfd = $.Deferred();
    $.ajax({
        url: SiteUrl + "/_api/web/lists/GetByTitle('" + ListName + "')/items(" + Id + ")",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        data: JSON.stringify(Metadata),
        success: function(data) {
            console.log("success");
            dfd.resolve(data);
        },
        error: function(error) {
            if(JSON.stringify(error).includes('Titan_Permission') == true){
                Adhistory = '';
                alert("Titan_Permission column is missing from the library.");
                //return false;
            }
            else {
                alert(JSON.stringify(error));
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}



function getItemsWithfields(ListName, SiteUrl) {
    var dfd = $.Deferred();
    var siteurl = SiteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/fields";
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function(data) {
            dfd.resolve(data.d.results);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


function Getlibrarypermissionsuser(SiteUrl, ListName) {
    ///ListItemAllFields/RoleAssignments?$expand=Member,RoleDefinitionBindings
    var lastChar = ListName.substr(-1); // Selects the last character
    if (lastChar == '/') {         // If the last character is not a slash
        ListName = ListName.split('/')[0];
    }
    if(ListName == "Shared%20Documents" || ListName == "Shared Documents") {
        ListName = "Documents";
    }
    var dfd = $.Deferred();
    var siteurl = SiteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/RoleAssignments?$expand=Member,RoleDefinitionBindings" //RoleAssignments?$expand=Member,RoleAssignments,RoleAssignments/Member/Users/Email,RoleAssignments/Member/Users/Title,RoleDefinitionBindings";
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose"

        },
        success: function(data) {
            dfd.resolve(data.d.results);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            dfd.resolve(error);
        }
    });
    return dfd.promise();
}



function GetLibrayDetails() {
    $("#divNew").show();
    $("#divUpload").show();
    $("#btnAppMore").show();

    $("#liRemoveGroup").hide();
    $("#liAlert").hide();
    $("#liMembers").hide();
    $('#btnRemoveFavorite').hide()
    //$("#LiAbouttheLibrary").hide();
    HeadingTitle = "My Documents"
    $(".headdingLinks").html("");
    $(".headdingLinks").html(HeadingTitle);



    GetLibarayDetails(this, _spPageContextInfo.webAbsoluteUrl + "/DocumentManagementSystem/Forms/AllItems.aspx", HeadingTitle, _spPageContextInfo.userEmail, HeadingTitle);
}

$("#chkBreakRoleInheritance").click(function() {
    var ischecked = $(this).is(':checked');
    if (ischecked) {
        $("#Allexistingmemebers").prop('checked', false);
    } else {
        $("#Allexistingmemebers").prop("checked", true);
        $("#meberdefinelater").prop("checked", false);
    }
});



$("#Allexistingmemebers").click(function() {
    var ischecked = $(this).is(':checked');
    if (ischecked) {
        $("#chkBreakRoleInheritance").prop('checked', false);
    }
});

//ro create Permission History
$("#chkStopInheritancePermissions").click(function() {
    RequestDigest = $("#__REQUESTDIGEST").val();

    if (SiteUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteUrl)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    Adhistory += "<br>" + moment().format('MMM D, YYYY hh:mm:s A');
    Adhistory += "," + "Inheritance Stopped by " + _spPageContextInfo.userDisplayName;

    if (currentSectionType == 'Department' || currentSectionType == 'Group Documents' || currentSectionType == 'ProjectDocuments' || currentSectionType == 'GuestDocuments') {
        if (Documentname.includes('/') == true) {
            var LibraryName = Documentname.split('/')[0];
        }
        else {
            var LibraryName = Documentname;
        }

        var Metadata;
        if (LibraryName.search(/\bDocuments\b/) >= 0 || LibraryName.search(/\bShared%20Documents\b/) >= 0 || LibraryName.search(/\bShared Documents\b/) >= 0) {
            var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
        }
        else {
            var ItemType = GetItemTypeForLibraryName(LibraryName);
        }
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Titan_Permission: Adhistory
        };

        $.when(updateItemWithIDTeam(DocFileFolderId, LibraryName, Metadata, SiteUrl)).done(function(data) {
        	Adhistory = '';
            breakRoleInheritanceOfFolder(SiteUrl, Filepath, RequestDigest, true)
            getFolderspermision(true);
            $("#PermHisParent").show();
			var tempDocName = Documentname;
            if (Documentname.search(/\bDocuments\b/) >= 0) {
                tempDocName = "Shared%20Documents";
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
        });
    }
    
});


$("#chkStopInheritancePermissionsSite").click(function() {

    RequestDigest = $("#__REQUESTDIGEST").val();

    if (SiteUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteUrl)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });

    }

    BreakRoleInheritancekeepallexistingusers(listTitle, SiteUrl)
    GetListusers()



});



$("#btnGroupDocumentLibrary").click(function() {
    //alert("The paragraph was clicked.");
    if ($("#txtgroupTitle").val() == "") {
        alert("Please fill Title Name")
        return false;
    }
    if ($("#txtlibraryname").val() == "") {
        alert("Please fill Library Name")
        return false;

    }
    var libraryname="";
    var txtlibraryname = $("#txtgroupTitle").val();
    libraryname = $.trim(txtlibraryname).replace(/_|-|\s/g, "");

    SiteUrl = "";
    FullControl = [];
    if ($('#ddlAction :selected').text() == "Create a new Library") {
        SiteUrl = _spPageContextInfo.webAbsoluteUrl + "/UsersDocuments";

        FullControl.push(_spPageContextInfo.userId);
        LibraryType = "Customs";
        createNewLibraryByRest(libraryname, SiteUrl);

    } else {
        SiteUrl = _spPageContextInfo.webAbsoluteUrl;
        if ($("#txtlibaddress").val() == "") {
            alert("Select the library type")
            return false;

        }
        var IsUnabletolink = false;
        UrlExists($("#txtlibaddress").val(), function(status) {
            if (status === 200) {
                // file was found
                IsUnabletolink = true;
            } else if (status === 404) {
                // 404 not found

                IsUnabletolink = false;
            }
        });
        if (IsUnabletolink) {
            const UrlLink = $("#txtlibaddress").val().split('/Forms')[0];
            Documentname = UrlLink.split('/')[UrlLink.split('/').length - 1];

            withoutLastChunk = UrlLink.slice(0, UrlLink.lastIndexOf("/"));
            FullControl.push(_spPageContextInfo.userId);
            LibraryType = "Linked";

            //GloblSiteurl = withoutLastChunk;

            var Query = "?$select=DMS_Link,Title,Author/Title,Created&$expand=Author&$top=5000";
            $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {
                RequestDigest = $("#__REQUESTDIGEST").val();
                if (valuesArray.length > 0) { 
                    var arrTemp = [];
                    valuesArray = valuesArray.filter(function (obj) {
                        return obj.Title == Documentname || obj.DMS_Link == $("#txtlibaddress").val().trim();
                    });
                }
                if (valuesArray.length == 0) {
                    var chkLibraryName = $("#txtlibaddress").val().trim().split('/Forms')[0].substring($("#txtlibaddress").val().trim().split('/Forms')[0].lastIndexOf('/') + 1);
                    var chkURL = $("#txtlibaddress").val().trim().split('/Forms')[0].substr(0, $("#txtlibaddress").val().trim().split('/Forms')[0].lastIndexOf("/"));
                    HasFullPermission = chkLoggedInUserLib(chkLibraryName, chkURL);//check if user has full control on the particular library
                    if(HasFullPermission == true){
                        if (withoutLastChunk != SiteUrl) {
                            $.when(GetFormDigestValue(withoutLastChunk)).done(function(GetFormDigestValue) {
                                RequestDigest = GetFormDigestValue
                            });

                        }

                        if ($("#chkBreakRoleInheritance").is(":checked")) {
                            BreakRoleInheritance(Documentname, withoutLastChunk);
                            $("#Allexistingmemebers").prop('checked', false);
                        }
                        if ($("#Allexistingmemebers").is(":checked")) {

                            BreakRoleInheritancekeepallexistingusers(Documentname, withoutLastChunk);

                            //GetAllEmployeeDetailsUser();
                            $.when(Getlibrarypermissionsuser(withoutLastChunk, Documentname)).done(function(Getlibrarypermissionsuser) {

                                if (Getlibrarypermissionsuser.length > 0) {
                                    FullControl = [];
                                    Contributor = [];
                                    RestrictedContribute = [];
                                    Reader = [];
                                    RestrictedView = [];

                                    FullControl.push(_spPageContextInfo.userId);
                                    var Iscreatecolumn = true;

                                    for (var i = 0; i < Getlibrarypermissionsuser.length; i++) {

                                        if (Getlibrarypermissionsuser[i].RoleDefinitionBindings.results[0].Name == "Full Control") {
                                            TempUserEmail = Getlibrarypermissionsuser[i].Member.Email;
                                            if (TempUserEmail.includes('#') == true) {
                                                TempUserEmail = TempUserEmail.split('#ext')[0];
                                                TempUserEmail = TempUserEmail.replace("_", '@');
                                            }
                                            tempUserId = GetUserId(TempUserEmail, _spPageContextInfo.webAbsoluteUrl);
                                            if(tempUserId != "" && tempUserId != null) {
                                                FullControl.push(tempUserId);
                                            }
                                            SetId = GetUserId(_spPageContextInfo.userEmail, $("#txtlibaddress").val().trim().split('/Forms')[0].substr(0, $("#txtlibaddress").val().trim().split('/Forms')[0].lastIndexOf("/")));
                                            if (Getlibrarypermissionsuser[i].PrincipalId == SetId) {
                                                if (Iscreatecolumn){
                                                    // Getfileds(Documentname, withoutLastChunk);
                                                    Iscreatecolumn = false;
                                                }
                                            }
                                            //}
                                            if (Getlibrarypermissionsuser[i].Member.LoginName == "Owners") {

                                                for (var j = 0; j < Getlibrarypermissionsuser[i].Member.Users.results.length; j++) {

                                                    if(Getlibrarypermissionsuser[i].Member.Users.results[j].Email != undefined && Getlibrarypermissionsuser[i].Member.Users.results[j].Email != null) {
                                                        TempUserEmail = Getlibrarypermissionsuser[i].Member.Users.results[j].Email;
                                                        if (TempUserEmail.includes('#') == true) {
                                                            TempUserEmail = TempUserEmail.split('#ext')[0];
                                                            TempUserEmail = TempUserEmail.replace("_", '@');
                                                        }
                                                        tempUserId = GetUserId(TempUserEmail, _spPageContextInfo.webAbsoluteUrl);
                                                        if(tempUserId != "" && tempUserId != null) {
                                                            FullControl.push(tempUserId);
                                                        }
                                                    }
                                                }
                                            }
                                        } else if (Getlibrarypermissionsuser[i].RoleDefinitionBindings.results[0].Name == "Limited Access" || Getlibrarypermissionsuser[i].RoleDefinitionBindings.results[0].Name == "View Only") {
                                            TempUserEmail = Getlibrarypermissionsuser[i].Member.Email;
                                            if (TempUserEmail.includes('#') == true) {
                                                TempUserEmail = TempUserEmail.split('#ext')[0];
                                                TempUserEmail = TempUserEmail.replace("_", '@');
                                            }
                                            tempUserId = GetUserId(TempUserEmail, _spPageContextInfo.webAbsoluteUrl);
                                            if(tempUserId != "" && tempUserId != null) {
                                                RestrictedView.push(tempUserId);
                                            }
                                            //}
                                        } else if (Getlibrarypermissionsuser[i].RoleDefinitionBindings.results[0].Name == "Read") {

                                            TempUserEmail = Getlibrarypermissionsuser[i].Member.Email;
                                            if (TempUserEmail.includes('#') == true) {
                                                TempUserEmail = TempUserEmail.split('#ext')[0];
                                                TempUserEmail = TempUserEmail.replace("_", '@');
                                            }
                                            tempUserId = GetUserId(TempUserEmail, _spPageContextInfo.webAbsoluteUrl);
                                            if(tempUserId != "" && tempUserId != null) {
                                                Reader.push(tempUserId);
                                            }
                                            if (Getlibrarypermissionsuser[i].Member.Title == _spPageContextInfo.userDisplayName) {
                                                FilePermissions = "Reader"
                                            }

                                        } else if (Getlibrarypermissionsuser[i].RoleDefinitionBindings.results[0].Name == "Contribute" || Getlibrarypermissionsuser[i].RoleDefinitionBindings.results[0].Name == "Edit") {

                                            TempUserEmail = Getlibrarypermissionsuser[i].Member.Email;
                                            if (TempUserEmail.includes('#') == true) {
                                                TempUserEmail = TempUserEmail.split('#ext')[0];
                                                TempUserEmail = TempUserEmail.replace("_", '@');
                                            }
                                            tempUserId = GetUserId(TempUserEmail, _spPageContextInfo.webAbsoluteUrl);
                                            if(tempUserId != "" && tempUserId != null) {
                                                Contributor.push(tempUserId);
                                            }
                                            if (Getlibrarypermissionsuser[i].Member.LoginName == "Contributors") {

                                                for (var j = 0; j < Getlibrarypermissionsuser[i].Member.Users.results.length; j++) {

                                                    TempUserEmail = Getlibrarypermissionsuser[i].Member.Users.results[j].Email;
                                                    if (TempUserEmail.includes('#') == true) {
                                                        TempUserEmail = TempUserEmail.split('#ext')[0];
                                                        TempUserEmail = TempUserEmail.replace("_", '@');
                                                    }
                                                    tempUserId = GetUserId(TempUserEmail, _spPageContextInfo.webAbsoluteUrl);
                                                    if(tempUserId != "" && tempUserId != null) {
                                                        Contributor.push(tempUserId);
                                                    }

                                                }
                                            }

                                        } 
                                        
                                    }
                                }



                            });

                        }

                        insertDMS($("#txtlibaddress").val());
                    }
                    else {
                        alertbox("You should have full control permission to link this library.", "Access denied");
                        return false;
                    }
                } 
                else {
                    alertbox("This library is already added by "+valuesArray[0].Author.Title+" on "+titanForWork.convertJSONDateAMPMWithDate(valuesArray[0].Created)+" .", "Library Name");
                }

            });
        } else {
            alertbox("Unable to link this library", "Unable to link");
        }



    }

});


function GetAllEmployeeDetailsUser() {
    //RestQuery = "?$select=*,OfficeLocation/Title,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/Title,Company/ID &$expand=OfficeLocation,LogonName,Department,Company,AttachmentFiles &$filter=LogonName/ID eq " + _spPageContextInfo.userId + " and Status eq 'Active' ";
    var CompanyId = titanForWork.getQueryStringParameter('CompanyId');

    if (CompanyId != null && CompanyId != "null") {
        RestQuery = "?$top=900&$select=*,OfficeLocation/Title,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/Title,Company/ID &$expand=OfficeLocation,LogonName,Department,Company,AttachmentFiles &$filter=Status eq 'Active' and Company/ID eq " + CompanyId + " ";
    }
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function(Employees) {

        try {



            if (Employees.results.length > 0) {

                AllEmployeeuser = Employees.results;


                var Subarr = AllEmployeeuser.filter(function(filterData) {
                    return filterData.PrimaryCompany == "Primary";
                });
            }


        } catch (e) {
            alert(e);
        }
    });
}



$("#btncreatecolumn").click(function() {

    var metadata = "";
    var ddltypeval = $('#ddlType').val();
    var culomnname = $('#txtCreatecolumn').val().replace(/\s/g, '');
    var CustomRow = ""
    var IsMatchCulomn = true;
    var NewColumnId = '';
    $('#tblColumnsSettings > tbody  > tr').each(function(i, row) {
        var ColumnName = $(this).children("td:eq(1)").text();
        if (culomnname == ColumnName) {
            alertbox("This column is already exists. Please define a proper unique column name. ", "Wrong Columan Name");
            $('#txtCreatecolumn').focus()
            IsMatchCulomn = false;
        }

    });

    var ColumnNamearr = ['Name', 'Title', 'DocumentType', 'DocumentNo', 'Modified', 'Shared', 'ApprovedByOutsider', 'Description']
    SetColumnName = [];
    for (var i = 0; i < ColumnNamearr.length; i++) {

        if (culomnname == ColumnNamearr[i]) {
            alertbox("This column is already exists. Please define a proper unique column name.", "Wrong Columan Name");
            $('#txtCreatecolumn').focus()
            IsMatchCulomn = false;
        }


    }
    if (IsMatchCulomn) {

        SiteUrl = _spPageContextInfo.webAbsoluteUrl;
        RequestDigest = $("#__REQUESTDIGEST").val();

        const UrlLink = DMS_Link.split('/Forms')[0];
        Documentname = UrlLink.split('/')[UrlLink.split('/').length - 1];

        SiteUrl = UrlLink.slice(0, UrlLink.lastIndexOf("/"));
        var getfields = "";


        if (Documentname == "Shared%20Documents") {
            Documentname = "Documents";
        }
        $.when(getItemsWithfields(Documentname, SiteUrl)).done(function(fields) {

            getfields = fields.filter(function(filterData) {
                return filterData.Title == culomnname;
            });

        });

        if (getfields.length > 0) {
            DMSColumnSetting = [];
            DMSColumnSetting.push({
                'Visibility': true,
                'ColumnName': culomnname,
                'DataType': $('#ddlType option:selected').text(),
                'ColumnType': "Custom",
                'Position': $('#ddlCustomCol1').val(),
                'Title': HeadingTitle, //AzureUsrlist[i].department,
                'DMS_Type': DMS_Type, //AzureUsrlist[i].companyName,
                'DMS_Link': DMS_Link,

            })


            //Visibility eq '" + Visibility + "' and 
            var Query = "?$select=Title,Author/Id,ColumnName,ColumnType,Position,DMS_Type,DMS_Link,Visibility &$top=5000 &$expand=Author &$filter=(ColumnName eq '" + culomnname + "' and DMS_Type eq '" + DMS_Type + "' and Author/Id eq '" + _spPageContextInfo.userId + "'  ) ";
            $.when(getItemsWithQuery("DMSColumnSetting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {
                //alert(valuesArray);
                /*
                if (valuesArray.length == 0) {
                            if (_spPageContextInfo.webAbsoluteUrl != SiteUrl) {
                    $.when(GetFormDigestValue(SiteUrl)).done(function(GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                }
                */

                var NewColumnId = insertDMSColumnSetting(DMSColumnSetting[0]);
                addCustomRow(DMSColumnSetting)
                $("#overlaysearch").fadeOut();


                //}
            });



        } else {

            if (HeadingTitle != "My Documents" || DMS_Type == "Add New Library" || HeadingTitle != "Group Documents") {

                if (_spPageContextInfo.webAbsoluteUrl != SiteUrl) {
                    $.when(GetFormDigestValue(SiteUrl)).done(function(GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                }




                metadata = {
                    "__metadata": {
                        "type": "SP.Field"
                    },
                    "FieldTypeKind": ddltypeval,
                    "Title": culomnname,
                    "Required": "false",
                    "EnforceUniqueValues": "false"
                };

                if (ddltypeval != "" && culomnname != "" && RowCount < 5) {
                    $.when(CreateListColumn(Documentname, metadata, SiteUrl)).done(function(CreateListColumn) {


                        if (CreateListColumn == "Success") {

                            CustomRow = '<tr class="dummyRow customRowCol '+culomnname + RowCount+'">' +
                                '<td class="vertical-align-middle">' +
                                '<div class="checkbox mt0 checkbox-space-align">' +
                                '<label><input type="checkbox" class="checkbox" value="" id="ckbCustomCol1" ></label>' +
                                '</div>' +
                                '</td>' +
                                '<td>' + culomnname + '</td>' +
                                '<td>' + $('#ddlType option:selected').text() + '</td>' +
                                '<td style="display:none">Custom</td>' +
                                '<td>' +
                                '<div class="form-group custom-form-group mb0">' +
                                '<select class="form-control numbers" id="ddlCustomCol1' + RowCount + '">' +

                                '<option>2</option>' +
                                '<option>3</option>' +
                                '<option>4</option>' +
                                '<option>5</option>' +
                                '<option>6</option>' +
                                '<option>7</option>' +
                                '<option>8</option>' +
                                '<option>9</option>' +
                                '<option>10</option>' +
                                '<option>11</option>' +
                                '<option >12</option>' +
                                '<option>13</option>' +
                                '<option selected="selected">13</option>' +
                                '<option>14</option>' +
                                '<option>15</option>' +
                                '<option>16</option>' +
                                '<option>17</option>' +

                                '</select>' +
                                '</div>' +
                                '</td>' +
                                '<td><a class="delete" href="javascript:void(0);" onclick="DeleteListColumnLocal(\'' + culomnname + RowCount + '\');">Delete</a></td>' +
                                '</tr>';

                            $("#tblColumnsSettings tr:last").before(CustomRow);
                            $('#tblColumnsSettings').scrollTop($('#tblColumnsSettings').height());


                            $('#ddlCustomCol1' + RowCount + '').val($('#ddlCustomCol1 option:selected').text()).attr("selected", "selected");
                            RowCount++;
                            $('#txtCreatecolumn').val("")


                        } else {


                        }



                    });
                } else {

                    alertbox("please fill the custom column name", "warnning");

                }


            } else {

                alertbox("Please select another libray", "warnning");
            }
        }

    }



});

$(".dms-left-panel-tab").click(function(v) {

    HeadingTitle = v.currentTarget.innerText;

    var GetAnchor = $(this).next().find("div");


});

$("#ddlpermission").on("change", function() {
    var val = $(this).find('option:selected').text();

    if (val == 'Full Control' || val == "Owner") {
        $(".full-control-img").addClass('d-block');
        $(".full-control-img").removeClass('d-none');

        $(".contributor-img, .reader-img, .restricted-view-img").addClass('d-none');
        $(".contributor-img, .reader-img, .restricted-view-img").removeClass('d-block');
    } else if (val == 'Contributor' || val == "Member" || val == 'Contribute' || val == "Edit") {
        $(".contributor-img").addClass('d-block');
        $(".contributor-img").removeClass('d-none');

        $(".reader-img, .restricted-view-img, .full-control-img").addClass('d-none');
        $(".reader-img, .restricted-view-img, .full-control-img").removeClass('d-block');
    } else if (val == 'Reader' || val == "Guest" || val == "Read") {
        $(".reader-img").addClass('d-block');
        $(".reader-img").removeClass('d-none');

        $(".restricted-view-img, .full-control-img, .contributor-img").addClass('d-none');
        $(".restricted-view-img, .full-control-img, .contributor-img").removeClass('d-block');
    } else if (val == 'Restricted View') {
        $(".restricted-view-img").addClass('d-block');
        $(".restricted-view-img").removeClass('d-none');

        $(".full-control-img, .contributor-img, .reader-img").addClass('d-none');
        $(".full-control-img, .contributor-img, .reader-img").removeClass('d-block');
    }
});


function DeleteChildItems(DMS_Type) {
    // and Author/Id eq '"+_spPageContextInfo.userId+"'
    getItems("/_api/Web/Lists/GetByTitle('DMSColumnSetting')/items?$filter=DMS_Type eq " + "'" + DMS_Type + "'").done(function(data) {
        var noChildItems = data.d.results.length; //number of child items to be deleted
        data.d.results.forEach(function(item) {
            var childId = item.ID;
            deleteItem("/_api/Web/Lists/GetByTitle('DMSColumnSetting')/getItemById(" + childId + ")", item).done(function(d_data) {
                //deleted child item.
            });
        });
    });
}



//Get items
function getItems(url) {
    return $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        }
    });
}

//Delete Item
function deleteItem(url, oldItem) {
    return $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,
        type: "DELETE",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "If-Match": oldItem.__metadata.etag
        }
    });
}



function DeleteListItemUsingItemId(Id) {
    $.ajax({

        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('DMSColumnSetting')/items(" + Id + ")",
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('list name1')/items?$filter=Title eq 'new title'&$top=1",
        type: "POST",
        headers: {
            // Accept header: Specifies the format for response data from the server.
            "Accept": "application/json;odata=verbose",
            //Content-Type header: Specifies the format of the data that the client is sending to the server
            "Content-Type": "application/json;odata=verbose",
            // IF-MATCH header: Provides a way to verify that the object being changed has not been changed since it was last retrieved.
            // "IF-MATCH":"*", will overwrite any modification in the object, since it was last retrieved.
            "IF-MATCH": "*",
            //X-HTTP-Method:  The MERGE method updates only the properties of the entity , while the PUT method replaces the existing entity with a new one that you supply in the body of the POST
            "X-HTTP-Method": "DELETE",
            // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },

        success: function(data, status, xhr) {
            console.log("Success");
        },
        error: function(xhr, status, error) {
            console.log("Failed");
        }
    });
}



$("#txtgroupTitle").focusout(function() {



    var str = $("#txtgroupTitle").val();
    str = $.trim(str).replace(/\s/g, '');
    $("#txtlibraryname").val(str.replace(/\s/g, ''));


});



$("#syncClick").click(function() {
    var siteId = "";
    var webId = "";
    var email = "";
    var webUrl = "";
    var listId = "8aaab423-bead-4ca1-b6df-eac10e9d9dca";
    siteId = encodeURIComponent(_spPageContextInfo.siteId);
    webId = encodeURIComponent(_spPageContextInfo.webId);
    email = _spPageContextInfo.userLoginName;
    webUrl = SiteUrl; //encodeURIComponent(_spPageContextInfo.webAbsoluteUrl);
    listId = "8aaab423-bead-4ca1-b6df-eac10e9d9dca";
    siteName = SiteUrl.split('sites')[1].split('/')[1] + "_" + DMS_Type;
    $.when(GetSiteWebListId(SiteUrl + "/_api/site/id"), GetSiteWebListId(SiteUrl + "/_api/web/id"), GetSiteWebListId(SiteUrl + "/_api/web/lists/getByTitle('" + Documentname + "')/Id")).done(function(SiteId, WebId, ListId) {
        siteId = SiteId;
        webId = WebId;
        listId = ListId;

    });

    var NewLink = "odopen://sync/?siteId=" + siteId + " &amp;webId=" + webId + "&amp;listId=" + listId + "&amp;userEmail=" + email + "&amp;webUrl=" + webUrl + "&amp;listTitle=" + Documentname + "&webTitle=" + siteName + "";

    window.location = NewLink;
    //$("#syncClick").attr("href", NewLink );

});


function SyncMyDocumentfolder() {
    var siteId = "";
    var webId = "";
    var email = "";
    var webUrl = "";
    var folderIds=""
    var folderName="";
    var folderUrl=""
    var listId = "8aaab423-bead-4ca1-b6df-eac10e9d9dca";
    siteId = encodeURIComponent(_spPageContextInfo.siteId);
    webId = encodeURIComponent(_spPageContextInfo.webId);
    email = _spPageContextInfo.userLoginName;
    webUrl = SiteUrl; //encodeURIComponent(_spPageContextInfo.webAbsoluteUrl);
    listId = "8aaab423-bead-4ca1-b6df-eac10e9d9dca";
    siteName = SiteUrl.split('sites')[1].split('/')[1] + "_" + DMS_Type;
    $.when(GetSiteWebListId(SiteUrl + "/_api/site/id"), GetSiteWebListId(SiteUrl + "/_api/web/id"), GetSiteWebListId(SiteUrl + "/_api/web/lists/getByTitle('" + CheckLibary + "')/Id"), GetFolderByServerRelativePath(SiteUrl, Documentname)).done(function(SiteId, WebId, ListId, folderId) {
        siteId = SiteId;
        webId = WebId;
        listId = ListId;
        folderUrl=folderId.ServerRelativeUrl
        folderName=_spPageContextInfo.userLoginName;
        folderIds=folderId.UniqueId;

    });

    // var NewLink = "odopen://sync/?siteId=" + siteId + " &amp;webId=" + webId + "&amp;listId=" + listId + "&amp;userEmail=" + email + "&amp;webUrl=" + webUrl + "&amp;listTitle=" + Documentname + "&webTitle=" + siteName + "";

    // window.location = NewLink;
    //$("#syncClick").attr("href", NewLink );

    var NewLink = "odopen://sync?" +
        "&userEmail="+email+"" +
        //"&isSiteAdmin=1" +
        "&siteId={" + siteId + "}" +
        "&webId={" + webId + "}" +
        "&webTitle=" + siteName + "" +
        "&webLogoUrl=" + SiteUrl + " /_catalogs/masterpage/Titan2/Images/Titan-Logo.png" +
        "&webUrl=" + SiteUrl + "" +
        "&onPrem=0" +
        "&listId={" + listId + "}" +
        "&listTitle=My Documents" +
        "&folderId="+folderIds+"" +
        "&folderName="+folderName+"" +
        "&folderUrl="+folderUrl+""+
        "&scope=OPENFOLDER";

    window.location = NewLink;


}



function GetFolderByServerRelativePath(SiteUrl, Folderurl)
{


    var dfd = $.Deferred();
    var siteurl = SiteUrl + "/_api/Web/GetFolderByServerRelativePath(decodedurl='"+Folderurl+"')";
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function(data) {
            dfd.resolve(data.d);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();


}



var FullControl = [],
    Contributor = [],
    RestrictedContribute = [],
    Reader = [],
    RestrictedView = [];

var GetLibarayRefresh = [];

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

//on click of Group get Logged_In Roles - Full Owner, Contributor, Reader
function getUserRoles_Group() {
    arrPermission = [];
    var Query = "?$select=IsAllowFeature,Title,Status,DMS_Link,EmployeeName/EMail&$top=5000&$expand=EmployeeName&$filter=Title eq '" + DMS_Type + "' and Status eq 'Active' and EmployeeName/EMail eq '" + _spPageContextInfo.userEmail + "'";
    $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            if(LibraryType == "Team" && valuesArray[0].IsAllowFeature == "Pending") {
                $("#BoxAllowPermission").show();
            }
            else {
                $("#BoxAllowPermission").hide();
            }
            arrPermission.push({ //User is HOD
                UserFullAccess: true,
                UserContri: false,
                UserReader: false
            });
        }
        else { //check for Contributor
            var Query = "?$select=Title,Status,DMS_Link,Contributors/EMail&$top=5000&$expand=Contributors&$filter=Title eq '" + DMS_Type + "' and Status eq 'Active' and Contributors/EMail eq '" + _spPageContextInfo.userEmail + "'";
            $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                if (valuesArray.length > 0) {
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    $("#onlyforGroup").hide();
                    $("#liRemoveGroup").hide();
                    $(".fixed-table-footer").hide();
                    $("#btnaboutthegroup").hide();

                    arrPermission.push({ //User is HOD
                        UserFullAccess: false,
                        UserContri: true,
                        UserReader: false
                    });
                }
                else {//Reader
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    $("#divNew").hide();
                    $("#divUpload").hide();
                    $("#divProperties").hide();
                    $("#btnMultiMove").hide();
                    $("#liAlert").hide();
                    $("#divDelete").hide();
                    $("#liRemoveGroup").hide();
                    $("#divShare").hide();
                    $("#onlyforGroup").hide();
                    $(".fixed-table-footer").hide();
                    $("#btnaboutthegroup").hide();
                    arrPermission.push({ //User is HOD
                        UserFullAccess: false,
                        UserContri: false,
                        UserReader: true
                    });
                }
            });
        }
    });
}

var SeletedDeptId = '';
function GetLibarayDetails(obj, url, Title, Folder, Type) {
    GetLibarayRefresh = [];
    GetLibarayRefresh.push({
        Obj: obj,
        Url: url,
        Title: Title,
        Folder: Folder,
        Type: Type
    });

    GlobalAnchorObj = obj;
    LibraryType = Folder;
    $("#generateBradCumbNew").empty();
    currentSectionType = Type;
    if(currentSectionType == "Department") {
        SeletedDeptId = Folder;
    }
    IsMyfavorate = false;
    DMS_Type = Title;
    DMS_Link = url;
    arrFileFolder = [];
    $(".btnFilterClear").trigger('click');
    arrFilterTable = [];
    $("#fordive").show();
    $("#StorageDrive").hide();
    $('#btnRemoveFavorite').hide()
    $(".dms-left-panel-tab-inner").removeClass("dms-left-panel-tab-active-inner");
    $(obj).siblings().removeClass('dms-left-panel-tab-active-inner');
    $(obj).addClass('dms-left-panel-tab-active-inner')


    //waitingDialog.show();
    if (DMS_Type != "Add New Library") {
        $(".headdingLinks").html("");
        $(".headdingLinks").html(DMS_Type);
    } else {
        //return false;
    }

    var Visibility = 1;

    const UrlLink = DMS_Link.split('/Forms')[0];
    Documentname = UrlLink.split('/')[UrlLink.split('/').length - 1];
    CheckLibary = Documentname;
    SiteUrl = UrlLink.slice(0, UrlLink.lastIndexOf("/"));
    
    var breadcrumb = "javascript:GetSubFoldersChild('" + Documentname + "')";
    $(".breadcrumb").html('');
    $(".cont_breadcrumbs_1").show();

    if (Type == "My Documents" || Type == "Reassigned") {
        Documentname += "/" + Folder;
        breadcrumb = "javascript:GetSubFoldersChild('" + Documentname + "')";
        $(".breadcrumb").append('<li class="breadcrumb-item"><a href="' + breadcrumb + '"> Root</a></li>');
    } else {
        $(".breadcrumb").append('<li class="breadcrumb-item"><a href="' + breadcrumb + '">' + Documentname + '</a></li>');
    }



    DefaultColumnName = ['Name', 'Title', 'DocumentType', 'DocumentNo', 'Modified', 'Shared', 'ApprovedByOutsider']
    SetColumnName = [];
    for (var i = 0; i < DefaultColumnName.length; i++) {
        SetColumnName.push({
            'ColumnName': DefaultColumnName[i],
        });
    }

    // if (Documentname == "Shared%20Documents") {
    //  Documentname = "Documents";
    //   }



    var Query = "";
    if (Type != "My Documents") {
        var SharedDocuments = Documentname;
        if (Documentname == "Shared%20Documents") {
            SharedDocuments = "Documents";
        }

        listTitle = SharedDocuments;
        Query = "?$select=Title,ColumnName,ColumnType,DataType,Position,DMS_Type,DMS_Link,Visibility,Id &$top=5000 &$filter=(Visibility eq '" + Visibility + "' and DMS_Type eq '" + DMS_Type + "' )&$orderby= Position asc ";
        if (getListUserEffectivePermissions(SiteUrl, SharedDocuments, false, '', 'i:0#.f|membership|' + _spPageContextInfo.userLoginName + '')) {
            // Topmenuhideshow(Type);
            // console.log(roles);
        } else {
            if(IsNotpermission == false && currentSectionType == 'Group Documents') {
                ActionBtnControls();
            }
        }
    } else {
        Query = "?$select=Title,ColumnName,ColumnType,DataType,Position,DMS_Type,DMS_Link,Visibility,Id &$top=5000 &$filter=(Visibility eq '" + Visibility + "' and DMS_Type eq '" + DMS_Type + "' and Author/Id eq '" + _spPageContextInfo.userId + "' )&$orderby= Position asc ";
    }




    //Visibility eq '" + Visibility + "' and 
    // var Query = "?$select=Title,ColumnName,ColumnType,DataType,Position,DMS_Type,DMS_Link,Visibility,Id &$top=5000 &$filter=(Visibility eq '" + Visibility + "' and DMS_Type eq '" + DMS_Type + "' and Author/Id eq '"+_spPageContextInfo.userId+"' )&$orderby= Position asc ";
    $.when(getItemsWithQuery("DMSColumnSetting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {



        //alert(valuesArray);
        $('.customTr').remove();
        $(".checkbox").prop('checked', false);
        $("#ckbFileName").prop('checked', true);



        if (valuesArray.length > 0) {
            valuesArray = getUniqueListBy(valuesArray, "ColumnName");
            valuesArray.sort(function(a, b) {
                return a.Position - b.Position
            });

            var IsfileName = "";
            SetColumnName = [];
            var customColumn = "";
            var DefaultRowcolumn = "";

            IsfileName = valuesArray.filter(function(filterData) {

                return filterData.ColumnName == "Name";
            });

            DefaultRowcolumn = valuesArray.filter(function(filterData) {

                return filterData.ColumnType == "Default";
            })

            if (DefaultRowcolumn.length > 0) {
                DefaultRow(DefaultRowcolumn);
            }

            customColumn = valuesArray.filter(function(filterData) {

                return filterData.ColumnType == "Custom";
            });




            if (customColumn.length > 0) {
                addCustomRow(customColumn);
            }


            if (IsfileName.length == 0) {
                SetColumnName.push({
                    'ColumnName': "Name",
                });

                for (var i = 0; i < valuesArray.length; i++) {

                    SetColumnName.push({
                        'ColumnName': valuesArray[i].ColumnName,
                        'DataType': valuesArray[i].DataType,
                    });


                }

            } else {

                for (var i = 0; i < valuesArray.length; i++) {

                    SetColumnName.push({
                        'ColumnName': valuesArray[i].ColumnName,
                        'DataType': valuesArray[i].DataType,
                    });


                }

            }



            GenrateHtmlGrid(SetColumnName, IsMyfavorate, "");
        } else {
            GenrateHtmlGrid(SetColumnName, IsMyfavorate, "");

        }
    });


    return null

}

var MemberUserPermissions = [];

function GetListusers() {
	$("#txtMembersSearch").val('');
    if (currentSectionType == 'Group Documents') {
        $(".NotGpMember").show();
    }
    else {
        $(".NotGpMember").hide();
    }
    DocFileFolderId = '';
    if (IsTeamLibary) {
        $('#Team').show();
        $('#DMembers').modal('hide');
        $('#Team').html("");

        $.when(getGraphAccessToken()).done(function(GetFormDigestValue) {

            GetTeamMember(MsTeamId, "", GetFormDigestValue);
        });
        $('#Team').append($('<iframe id="myIframeTeam" height="600" width="800" title="Teams"></iframe>'));
        if(PrivateChId == "null" || PrivateChId == null){
            PrivateChId = '';
        }
        $('#myIframeTeam').attr('src', _spPageContextInfo.webAbsoluteUrl + "/SitePages/MyTeamMembers.aspx?teamid=" + MsTeamId + "&privateChannelid=" + PrivateChId);
        popup("Team Members");
    } else {
        $('#DMembers').modal('show');
        $('#Team').hide();

        if (Documentname == "Shared%20Documents") {
            Documentname = "Documents";
        }
        RequestDigest = $("#__REQUESTDIGEST").val();

        if (_spPageContextInfo.webAbsoluteUrl != SiteUrl) {
            $.when(GetFormDigestValue(withoutLastChunk)).done(function(GetFormDigestValue) {
                RequestDigest = GetFormDigestValue
            });

        }


        $("#divPermissionsmember").html('');
        $("#divPermissions").html('');

        if (HasUniqueRoleAssignments(SiteUrl, Documentname)) {
            $("#chkStopInheritancePermissionsSite").hide();
        } else {
            $("#chkStopInheritancePermissionsSite").hide();
        }

        $.when(Getlibrarypermissionsuser(SiteUrl, Documentname)).done(function(Getlibrarypermissionsuser) {

            MemberUserPermissions = [];
            var Query = "?$select=EmployeeName/UserName,EmployeeName/Title,EmployeeName/EMail,EmployeeName/Id,RestrictedContributor/UserName,RestrictedContributor/Title,RestrictedContributor/EMail,Contributors/UserName,Readers/UserName,Viewers/UserName,Contributors/EMail,Readers/EMail,Viewers/EMail,Contributors/Id,Readers/Id,Viewers/Id,Contributors/Title,Readers/Title,Viewers/Title,ID &$top=1&$expand=Contributors,Viewers,Readers,RestrictedContributor,EmployeeName &$filter=Title eq '" + DMS_Type + "'";
            $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {

                if (valuesArray.length > 0) {

                    if (valuesArray[0].Contributors.results != undefined) {

                        for (var j = 0; j < valuesArray[0].Contributors.results.length; j++) {
                            if (valuesArray[0].Contributors.results[j].UserName.includes('#') == true) {
                            	valuesArray[0].Contributors.results[j].UserName= valuesArray[0].Contributors.results[j].UserName.split('#ext')[0];
                            	valuesArray[0].Contributors.results[j].UserName= valuesArray[0].Contributors.results[j].UserName.split('#EXT')[0];
                        		valuesArray[0].Contributors.results[j].UserName= valuesArray[0].Contributors.results[j].UserName.replace("_", '@');

                                //valuesArray[0].Contributors.results[j].UserName = valuesArray[0].Contributors.results[j].UserName.replace("#ext#@adaptindia.onmicrosoft.com", '');
                                //valuesArray[0].Contributors.results[j].UserName = valuesArray[0].Contributors.results[j].UserName.replace("#EXT#@adaptindia.onmicrosoft.com", '');
                                //valuesArray[0].Contributors.results[j].UserName = valuesArray[0].Contributors.results[j].UserName.replace("_", '@');
                            }
                            MemberUserPermissions.push({
                                'UserId': valuesArray[0].Contributors.results[j].Id,
                                'UserEmail': valuesArray[0].Contributors.results[j].UserName,
                                'userAccessControl': "Contributor",
                                'Title': valuesArray[0].Contributors.results[j].Title,
                                'disabled': '',
                                'Delete': '',
                                'PermissionImage': 'Contributor-m'


                            })


                        }
                    }

                    if (valuesArray[0].EmployeeName.results != undefined) {

                        for (var j = 0; j < valuesArray[0].EmployeeName.results.length; j++) {
                            if (valuesArray[0].EmployeeName.results[j].EMail.includes('#') == true) {
                                valuesArray[0].EmployeeName.results[j].EMail= valuesArray[0].EmployeeName.results[j].EMail.split('#ext')[0];
                                valuesArray[0].EmployeeName.results[j].EMail= valuesArray[0].EmployeeName.results[j].EMail.split('#EXT')[0];
                                valuesArray[0].EmployeeName.results[j].EMail= valuesArray[0].EmployeeName.results[j].EMail.replace("_", '@');
                            }
                            MemberUserPermissions.push({
                                'UserId': valuesArray[0].EmployeeName.results[j].Id,
                                'UserEmail': valuesArray[0].EmployeeName.results[j].EMail,
                                'userAccessControl': "Full_control",
                                'Title': valuesArray[0].EmployeeName.results[j].Title,
                                'disabled': 'disabled',
                                'Delete': '',
                                'PermissionImage': 'Full-control-m'


                            })
                            //  }


                        }
                    }

                    if (valuesArray[0].RestrictedContributor.results != undefined) {
						
                        for (var j = 0; j < valuesArray[0].RestrictedContributor.results.length; j++) {
                            if (valuesArray[0].RestrictedContributor.results[j].UserName.includes('#') == true) {
                                valuesArray[0].RestrictedContributor.results[j].UserName = valuesArray[0].RestrictedContributor.results[j].UserName.split('#ext')[0];
                                valuesArray[0].RestrictedContributor.results[j].UserName = valuesArray[0].RestrictedContributor.results[j].UserName.split('#EXT')[0];
                                valuesArray[0].RestrictedContributor.results[j].UserName = valuesArray[0].RestrictedContributor.results[j].UserName.replace("_", '@');
                            }
                            MemberUserPermissions.push({
                                'UserId': valuesArray[0].RestrictedContributor.results[j].Id,
                                'UserEmail': valuesArray[0].RestrictedContributor.results[j].UserName,
                                'userAccessControl': "Restricted_Contributor",
                                'Title': valuesArray[0].RestrictedContributor.results[j].Title,
                                'disabled': '',
                                'Delete': '',
                                'PermissionImage': 'Contributor-m'


                            })


                        }
                    }
                    if (valuesArray[0].Viewers.results != undefined) {
	                    
                        for (var j = 0; j < valuesArray[0].Viewers.results.length; j++) {
                            if (valuesArray[0].Viewers.results[j].UserName.includes('#') == true) {
                                valuesArray[0].Viewers.results[j].UserName = valuesArray[0].Viewers.results[j].UserName.split('#ext')[0]
                                valuesArray[0].Viewers.results[j].UserName = valuesArray[0].Viewers.results[j].UserName.split('#EXT')[0];
                                valuesArray[0].Viewers.results[j].UserName = valuesArray[0].Viewers.results[j].UserName.replace("_", '@');
                            }
                            MemberUserPermissions.push({
                                'UserId': valuesArray[0].Viewers.results[j].Id,
                                'UserEmail': valuesArray[0].Viewers.results[j].UserName,
                                'userAccessControl': "Restricted",
                                'Title': valuesArray[0].Viewers.results[j].Title,
                                'disabled': '',
                                'Delete': '',
                                'PermissionImage': 'Restricted-m'


                            })


                        }
                    }
                    if (valuesArray[0].Readers.results != undefined) {
						
                        for (var j = 0; j < valuesArray[0].Readers.results.length; j++) {
                            if (valuesArray[0].Readers.results[j].UserName.includes('#') == true) {
                                valuesArray[0].Readers.results[j].UserName = valuesArray[0].Readers.results[j].UserName.split('#ext')[0];
                                valuesArray[0].Readers.results[j].UserName = valuesArray[0].Readers.results[j].UserName.split('#EXT')[0];
                                valuesArray[0].Readers.results[j].UserName = valuesArray[0].Readers.results[j].UserName.replace("_", '@');
                            }
                            MemberUserPermissions.push({
                                'UserId': valuesArray[0].Readers.results[j].Id,
                                'UserEmail': valuesArray[0].Readers.results[j].UserName,
                                'userAccessControl': "Reader",
                                'Title': valuesArray[0].Readers.results[j].Title,
                                'disabled': '',
                                'Delete': '',
                                'PermissionImage': 'Reader-m'



                            })

                        }
                    }
                }

            });

            PermissionsControlGD(Getlibrarypermissionsuser);


        });
    }

}


function effectiveBasePermissions(SiteUrl, Listname) {


    $.ajax({

        type: "GET",
        url: SiteUrl + "/_api/web/lists/getByTitle('" + Listname + "')/effectiveBasePermissions",

        headers: {
            "accept": "application/json; odata=verbose"
        },

        success: function(data) {

            var perm = new SP.BasePermissions();

            perm.fromJson(data.d.EffectiveBasePermissions);

            var hasPermission = perm.has(SP.PermissionKind.editListItems);

            if (hasPermission) {
                alert("User has permission to Edit the List");
            } else {
                alert("User has no permission to Edit the List");
            }

        },

        error: function(error) {
            alert("Error");
            console.log(error);
        }

    })

}


function PermissionsControlGD(data) {

    var OwnersUserPermissions = [];


    var Acsesscontrol = "Restricted"
    FilePermissions = "";
    GetAllEmployeeDetailsUser();
    for (var i = 0; i < data.length; i++) {
        if (data[i].RoleDefinitionBindings.results[0].Hidden == false) 
        {
            if (data[i].RoleDefinitionBindings.results[0].Name == "Full Control") {

                if (data[i].Member.Users != undefined) {
                    if (data[i].Member.LoginName == "Owners") {
                        if (data[i].Member.Users.results != undefined) {
                            for (var j = 0; j < data[i].Member.Users.results.length; j++) {

                                var IsUser = AllEmployeeuser.filter(function(filterData) {
                                    return filterData.Email == data[i].Member.Users.results[j].Email;
                                });

                                if (IsUser.length > 0) {
                                    OwnersUserPermissions.push({
                                        'UserId': IsUser[0].LogonNameId,
                                        'UserEmail': data[i].Member.Users.results[j].Email,
                                        'userAccessControl': "Full_control",
                                        'Title': data[i].Member.Users.results[j].Title,
                                        'disabled': 'disabled',
                                        'Delete': '',
                                        'PermissionImage': 'Full-control-m'



                                    })
                                }


                            }
                        } else {}
                    }
                } else {
                    OwnersUserPermissions.push({
                        'UserId': data[i].PrincipalId,
                        'UserEmail': data[i].Member.Email,
                        'userAccessControl': "Full_control",
                        'Title': data[i].Member.Title,
                        'disabled': 'disabled',
                        'Delete': '',
                        'PermissionImage': 'Full-control-m'



                    })

                }



                //alert(FileOwner);
            } else if (data[i].RoleDefinitionBindings.results[0].Name == "Limited Access") {
                Acsesscontrol = "Reader";
                if (data[i].Member.Users != undefined) {
                    if (data[i].Member.LoginName == "Read") {

                        for (var j = 0; j < data[i].Member.Users.results.length; j++) {

                            var IsUser = AllEmployeeuser.filter(function(filterData) {
                                return filterData.Email == data[i].Member.Users.results[j].Email;
                            });

                            if (IsUser.length > 0) {
                                OwnersUserPermissions.push({
                                    'UserId': IsUser[0].LogonNameId,
                                    'UserEmail': data[i].Member.Users.results[j].Email,
                                    'userAccessControl': "Viewers",
                                    'Title': data[i].Member.Users.results[j].Title,
                                    'disabled': 'disabled',
                                    'Delete': '',
                                    'PermissionImage': 'Reader-m'



                                })
                            }


                        }
                    }
                } else {
                    OwnersUserPermissions.push({
                        'UserId': data[i].PrincipalId,
                        'UserEmail': data[i].Member.Email,
                        'userAccessControl': "Viewers",
                        'Title': data[i].Member.Title,
                        'disabled': 'disabled',
                        'Delete': '',
                        'PermissionImage': 'Reader-m'



                    })

                }

            } else if (data[i].RoleDefinitionBindings.results[0].Name == "Read") {
                if (data[i].Member.Users != undefined) {
                    if (data[i].Member.LoginName == "Read") {

                        for (var j = 0; j < data[i].Member.Users.results.length; j++) {

                            var IsUser = AllEmployeeuser.filter(function(filterData) {
                                return filterData.Email == data[i].Member.Users.results[j].Email;
                            });

                            if (IsUser.length > 0) {
                                OwnersUserPermissions.push({
                                    'UserId': IsUser[0].LogonNameId,
                                    'UserEmail': data[i].Member.Users.results[j].Email,
                                    'userAccessControl': "Viewers",
                                    'Title': data[i].Member.Users.results[j].Title,
                                    'disabled': 'disabled',
                                    'Delete': '',
                                    'PermissionImage': 'Reader-m'



                                })
                            }


                        }
                    }
                } else {
                    OwnersUserPermissions.push({
                        'UserId': data[i].PrincipalId,
                        'UserEmail': data[i].Member.Email,
                        'userAccessControl': "Viewers",
                        'Title': data[i].Member.Title,
                        'disabled': 'disabled',
                        'Delete': '',
                        'PermissionImage': 'Reader-m'



                    })

                }

            } else if (data[i].RoleDefinitionBindings.results[0].Name == "Contribute" || data[i].RoleDefinitionBindings.results[0].Name == "Edit") {


                if (data[i].Member.Users != undefined) {
                    if (data[i].Member.LoginName == "Contributors") {
                        if (data[i].Member.Users.results != undefined) {


                            for (var j = 0; j < data[i].Member.Users.results.length; j++) {

                                var IsUser = AllEmployeeuser.filter(function(filterData) {
                                    return filterData.Email == data[i].Member.Users.results[j].Email;
                                });

                                if (IsUser.length > 0) {
                                    OwnersUserPermissions.push({
                                        'UserId': IsUser[0].LogonNameId,
                                        'UserEmail': data[i].Member.Users.results[j].Email,
                                        'userAccessControl': "Contributor",
                                        'Title': data[i].Member.Users.results[j].Title,
                                        'disabled': 'disabled',
                                        'Delete': '',
                                        'PermissionImage': 'Contributor-m'



                                    })
                                }


                            }
                        } else {}
                    }
                } else {
                    OwnersUserPermissions.push({
                        'UserId': data[i].PrincipalId,
                        'UserEmail': data[i].Member.Email,
                        'userAccessControl': "Contributor",
                        'Title': data[i].Member.Title,
                        'disabled': 'disabled',
                        'Delete': '',
                        'PermissionImage': 'Contributor-m'



                    })

                }



            } else if (data[i].RoleDefinitionBindings.results[0].Name == "Restricted View") {
                if (data[i].Member.Users != undefined) {
                    if (data[i].Member.LoginName == "Contributors") {

                        for (var j = 0; j < data[i].Member.Users.results.length; j++) {

                            var IsUser = AllEmployeeuser.filter(function(filterData) {
                                return filterData.Email == data[i].Member.Users.results[j].Email;
                            });

                            if (IsUser.length > 0) {
                                OwnersUserPermissions.push({
                                    'UserId': IsUser[0].LogonNameId,
                                    'UserEmail': data[i].Member.Users.results[j].Email,
                                    'userAccessControl': "Contributor",
                                    'Title': data[i].Member.Users.results[j].Title,
                                    'disabled': 'disabled',
                                    'Delete': '',
                                    'PermissionImage': 'Contributor-m'
                                });
                            }
                        }
                    }
                } else {
                    OwnersUserPermissions.push({
                        'UserId': data[i].PrincipalId,
                        'UserEmail': data[i].Member.Email,
                        'userAccessControl': "Contributor",
                        'Title': data[i].Member.Title,
                        'disabled': 'disabled',
                        'Delete': '',
                        'PermissionImage': 'Contributor-m'
                    })

                }


            }
        }
    }
    MemberUserPermissions = MemberUserPermissions.reduce(
        (accumulator, current) => {
            if (!accumulator.some(x => x.UserId === current.UserId)) {
                accumulator.push(current)
}
return accumulator;
}, []
    )
    for (var i = 0; i < MemberUserPermissions.length; i++) {


        if (MemberUserPermissions[i].Title == _spPageContextInfo.userDisplayName) {
            MemberUserPermissions[i].disabled = "disabled"

        }


        var IsUser = OwnersUserPermissions.filter(function(filterData) {
            return filterData.UserEmail == MemberUserPermissions[i].UserEmail;
        });

        if (IsUser.length > 0) {

            OwnersUserPermissions = OwnersUserPermissions.filter(function(obj) {
                return obj.UserEmail !== IsUser[0].UserEmail;
            });


        } else {
            MemberUserPermissions[i].Title = MemberUserPermissions[i].Title + " ( Access revoked )";
            MemberUserPermissions[i].Delete = "access_revoked"
        }
    }
    if (currentSectionType == 'Group Documents') { //this method is for Group-Documents only
        GenratepermissionHtml(MemberUserPermissions, "divPermissionsmember")
        GenratepermissionHtml(OwnersUserPermissions, "divPermissions");
    }
    else { // this method is for other sections like Dept, Project, Guest Users
    	if (currentSectionType == 'Department') {
            BindDefinitionDept(OwnersUserPermissions);
        }
        else if (currentSectionType == 'ProjectDocuments') {
            BindDefinitionProj(OwnersUserPermissions);
        }
        else {
        	$("#divPermissions").html("");
    		$("#divPermissionsmember").html("");
    		arrEmps = [];
            GenratepermissionHtmlOthers(OwnersUserPermissions, arrEmps);
        }
    }
if($("#divPermissions").html() == "") {
    $(".NotGpMember").hide();
}
else {
    $(".NotGpMember").show();
}
}

// this method is for other sections like Dept, Project, Guest Users
function GenratepermissionHtmlOthers(data, arrEmps) {
    var Divrow = "";
    for (var i = 0; i < data.length; i++) {
        if (jQuery.inArray(data[i].UserEmail.toLowerCase(), arrEmps) == '-1') {
            Divrow = '';
            Divrow += '<div class="col-md-6 ">';
            Divrow += '<div class="members-card' + data[i].Delete + '">';
            Divrow += '<div class="members-card-head">';
            Divrow += '<img src="../_layouts/15/userphoto.aspx?size=M&username=' + data[i].UserEmail + '" alt="">' + '</div>';
            Divrow += '<div class="members-card-body">';
            if (data[i].UserEmail.toLowerCase() != _spPageContextInfo.userEmail.toLowerCase()) {
                Divrow += '<span class="removesection remove_group" onclick="DeleteMemberPermission(\'' + data[i].Title + '\', \'' + data[i].UserEmail + '\', \'' + data[i].UserId + '\');"><i class="fa fa-times" aria-hidden="true"></i></span>';
            }
            Divrow += '<div class="members-card-body-info text-ellipsis">';
            Divrow += '<h3 class="member-name text-ellipsis">' + data[i].Title + '</h3>';
            Divrow += '<p class="member-email text-ellipsis">' + data[i].UserEmail + '</p>';
            Divrow += '<div class="member-dropdown text-ellipsis member-status-panel">';
            Divrow += '<p id="principalid' + i + '" style="display:none">' + data[i].UserId + '</p>';

            if (data[i].userAccessControl == "Full_control") {
                Divrow += '<select class="form-control internal-members-dropdown" onchange="PermissionsChange(' + data[i].UserId + ',this)" ' + data[i].disabled + ' >' +
                    '<option value="1073741829" selected>Owner</option>' +
                    '<option value="1073741830" >Member</option>' +
                    '<option value="1073741826">Guest</option>' +
                    '<option value="1073741826" style="display:none;">Restricted View</option>' +
                    '</select>';
            } else if (data[i].userAccessControl == "Contributor" || data[i].userAccessControl == "Edit" || data[i].userAccessControl == "Contribute" || data[i].userAccessControl == "Edit") {
                Divrow += '<select class="form-control internal-members-dropdown" onchange="PermissionsChange(' + data[i].UserId + ',this)" ' + data[i].disabled + ' >' +
                    '<option value="1073741829">Owner</option>' +
                    '<option value="1073741830" selected>Member</option>' +
                    '<option value="1073741826" >Guest</option>' +
                    '<option value="1073741826" style="display:none;">Restricted View</option>' +
                    '</select>';


            } else if (data[i].userAccessControl == "Reader" || data[i].userAccessControl == "Viewers" || data[i].userAccessControl == "Read") {
                Divrow += '<select class="form-control internal-members-dropdown" onchange="PermissionsChange(' + data[i].UserId + ',this)" ' + data[i].disabled + ' >' +
                    '<option value="1073741829">Owner</option>' +
                    '<option value="1073741830">Member</option>' +
                    '<option value="1073741826" selected>Guest</option>' +
                    '<option value="1073741826" style="display:none;">Restricted View</option>' +
                    '</select>';


            } else if (data[i].userAccessControl == "Restricted") {
                Divrow += '<select class="form-control internal-members-dropdown" onchange="PermissionsChange(' + data[i].UserId + ',this)" ' + data[i].disabled + ' >' +
                    '<option value="1073741829">Owner</option>' +
                    '<option value="1073741830">Member</option>' +
                    '<option value="1073741826">Guest</option>' +
                    '<option value="1073741826" style="display:none;" selected>Restricted View</option>' +
                    '</select>';
            }


            Divrow += '<div class="member-status-image-box">' +
                '<img src="../SiteAssets/MyDocuments/DMS/assets/images/' + data[i].PermissionImage + '.png" alt="">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        	if(currentSectionType == 'GuestDocuments'){
	        	if(checkUserGuest(data[i].UserEmail) == true) {
	                $("#divPermissionsmember").append(Divrow);
	            }
	            else {
	                $("#divPermissions").append(Divrow);
	            }
        	}
        	else {
            	$("#divPermissions").append(Divrow);
            }
        }
    }
    if (currentSectionType != 'Group Documents') {
        $(".remove_group").hide();
    }

}

// this method is for other sections like Dept, Project, Guest Users
function BindDefinitionDept(data) {
    var Divrow = "";
    $("#divPermissions").html("");
    $("#divPermissionsmember").html("");
    var arrEmps = [];
    //For Department-Defination (HOD - Owner; Contributor/Approvers - Member; else - Readers)
    var Query = "?$select=*,Department/ID,Contributors/EMail,Contributors/Title,Contributors/Id,Approver/EMail,Approver/Title,Approver/Id&$top=5000&$expand=Department,Contributors,Approver&$filter=CompanyId eq '" + Logged_CompanyId + "' and Department/ID eq '" + LibraryType + "' and (WebPartName eq 'Head of the department' or WebPartName eq 'Documents' or WebPartName eq 'DepartmentDocument_Access') ";
    $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            for (var proc = 0; proc < valuesArray.length; proc++) {
                if (valuesArray[proc].Contributors.results != null) {
                    for (var pplIndex = 0; pplIndex < valuesArray[proc].Contributors.results.length; pplIndex++) {
                        arrEmps.push(valuesArray[proc].Contributors.results[pplIndex].EMail.toLowerCase());
                        Divrow += '<div class="col-md-6 ">';
                        Divrow += '<div class="members-card">';
                        Divrow += '<div class="members-card-head">';
                        Divrow += '<img src="../_layouts/15/userphoto.aspx?size=M&username=' + valuesArray[proc].Contributors.results[pplIndex].EMail + '" alt="">' + '</div>';
                        Divrow += '<div class="members-card-body">';
                        Divrow += '<div class="members-card-body-info text-ellipsis">';
                        Divrow += '<h3 class="member-name text-ellipsis">' + valuesArray[proc].Contributors.results[pplIndex].Title + '</h3>';
                        Divrow += '<p class="member-email text-ellipsis">' + valuesArray[proc].Contributors.results[pplIndex].EMail + '</p>';
                        Divrow += '<div class="member-dropdown text-ellipsis member-status-panel">';
                        Divrow += '<p style="display:none">' + valuesArray[proc].Contributors.results[pplIndex].Id + '</p>';
                        if (valuesArray[proc].WebPartName == "Head of the department") {
                            Divrow += '<select class="form-control internal-members-dropdown" disabled="disabled" >' +
                                '<option value="1073741829" selected>Owner</option>' +
                           '</select>';
                           Divrow += '<div class="member-status-image-box">' +
                            '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Full-control-m.png" alt="">' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        }
                        else {
                            Divrow += '<select class="form-control internal-members-dropdown" disabled="disabled" >' +
                                '<option value="1073741830" selected>Member</option>' +
                           '</select>';
                           Divrow += '<div class="member-status-image-box">' +
                            '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Contributor-m.png" alt="">' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        }
                    }

                }
                //Approvers
                if (valuesArray[proc].Approver.results != null) {
                    for (var pplIndex = 0; pplIndex < valuesArray[proc].Approver.results.length; pplIndex++) {
                        if (jQuery.inArray(valuesArray[proc].Contributors.results[pplIndex].EMail.toLowerCase(), arrEmps) == '-1') {
                            arrEmps.push(valuesArray[proc].Contributors.results[pplIndex].EMail.toLowerCase());
                            Divrow += '<div class="col-md-6 ">';
                            Divrow += '<div class="members-card">';
                            Divrow += '<div class="members-card-head">';
                            Divrow += '<img src="../_layouts/15/userphoto.aspx?size=M&username=' + valuesArray[proc].Approver.results[pplIndex].EMail + '" alt="">' + '</div>';
                            Divrow += '<div class="members-card-body">';
                            Divrow += '<div class="members-card-body-info text-ellipsis">';
                            Divrow += '<h3 class="member-name text-ellipsis">' + valuesArray[proc].Approver.results[pplIndex].Title + '</h3>';
                            Divrow += '<p class="member-email text-ellipsis">' + valuesArray[proc].Approver.results[pplIndex].EMail + '</p>';
                            Divrow += '<div class="member-dropdown text-ellipsis member-status-panel">';
                            Divrow += '<p id="principalid' + i + '" style="display:none">' + valuesArray[proc].Approver.results[pplIndex].Id + '</p>';
                            Divrow += '<select class="form-control internal-members-dropdown" disabled="disabled" >' +
                                '<option value="1073741830" selected>Member</option>' +
                            '</select>';
                            Divrow += '<div class="member-status-image-box">' +
                                '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Contributor-m.png" alt="">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                    }

                }
            }
        }
    });
    //now get employees list 
    RestQuery = "?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,Department/ID,Department/DepartmentName,Company/ID&$expand=LogonName,Department,Company &$filter=Company/ID eq '" + Logged_CompanyId + "' and Department/ID eq '" + LibraryType + "' and Status eq 'Active'&$top=5000";
    $.when(getItemsWithQuery("Employees", RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            for (var proc= 0; proc< valuesArray.length; proc++) {
                if (jQuery.inArray(valuesArray[proc].LogonName.EMail.toLowerCase(), arrEmps) == '-1') {
                    arrEmps.push(valuesArray[proc].LogonName.EMail.toLowerCase());
                    Divrow += '<div class="col-md-6 ">';
                    Divrow += '<div class="members-card">';
                    Divrow += '<div class="members-card-head">';
                    Divrow += '<img src="../_layouts/15/userphoto.aspx?size=M&username=' + valuesArray[proc].LogonName.EMail + '" alt="">' + '</div>';
                    Divrow += '<div class="members-card-body">';
                    Divrow += '<div class="members-card-body-info text-ellipsis">';
                    Divrow += '<h3 class="member-name text-ellipsis">' + valuesArray[proc].LogonName.Title + '</h3>';
                    Divrow += '<p class="member-email text-ellipsis">' + valuesArray[proc].LogonName.EMail + '</p>';
                    Divrow += '<div class="member-dropdown text-ellipsis member-status-panel">';
                    Divrow += '<p style="display:none">' + valuesArray[proc].LogonName.Id + '</p>';
                    Divrow += '<select class="form-control internal-members-dropdown" disabled="disabled" >' +
                        '<option value="1073741826" selected>Reader</option>' +
                    '</select>';
                    Divrow += '<div class="member-status-image-box">' +
                        '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Reader-m.png" alt="">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
            }
        }
    });
    $("#divPermissionsmember").append(Divrow);
    GenratepermissionHtmlOthers(data, arrEmps);
}

// this method is for other sections like Dept, Project, Guest Users
function BindDefinitionProj(data) {
    var Divrow = "";
    $("#divPermissions").html("");
    $("#divPermissionsmember").html("");
    var arrEmps = [];
    //For Project-Defination (Project Manager - Owner; (Team Members + DocumentPermission == true) - Contributors; else - Readers)
    var Query = "?$select=Title,CompanyId,ManagerName/EMail,ManagerName/Title,ManagerName/Id&$top=5000&$expand=ManagerName&$filter=CompanyId eq '" + Logged_CompanyId + "' and Title eq '" + encodeURIComponent($(".headdingLinks").text().trim()) + "' ";
    $.when(getItemsWithQuery("ProjectDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            arrEmps.push(valuesArray[0].ManagerName.EMail.toLowerCase());
            Divrow += '<div class="col-md-6 ">';
            Divrow += '<div class="members-card">';
            Divrow += '<div class="members-card-head">';
            Divrow += '<img src="../_layouts/15/userphoto.aspx?size=M&username=' + valuesArray[0].ManagerName.EMail + '" alt="">' + '</div>';
            Divrow += '<div class="members-card-body">';
            Divrow += '<div class="members-card-body-info text-ellipsis">';
            Divrow += '<h3 class="member-name text-ellipsis">' + valuesArray[0].ManagerName.Title + '</h3>';
            Divrow += '<p class="member-email text-ellipsis">' + valuesArray[0].ManagerName.EMail + '</p>';
            Divrow += '<div class="member-dropdown text-ellipsis member-status-panel">';
            Divrow += '<p style="display:none">' + valuesArray[0].ManagerName.Id + '</p>';
            Divrow += '<select class="form-control internal-members-dropdown" disabled="disabled" >' +
                '<option value="1073741829" selected>Owner</option>' +
            '</select>';
            Divrow += '<div class="member-status-image-box">' +
                '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Full-control-m.png" alt="">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

    });
    //Team Members and REaders
    RestQuery = "?$select=*,Project/ProjectName,TeamMember/EMail,TeamMember/Title,TeamMember/Id&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and Project/ProjectName eq '" + $(".headdingLinks").text().trim() + "' and Status eq 'Active'&$top=5000";
    $.when(getItemsWithQuery('ProjectTeamDetails', RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            //if (valuesArray[proc].TeamMember.results != null) 
            {
                for (var proc= 0; proc< valuesArray.length; proc++) {
                    if (jQuery.inArray(valuesArray[proc].TeamMember.EMail.toLowerCase(), arrEmps) == '-1') {
                        arrEmps.push(valuesArray[proc].TeamMember.EMail.toLowerCase());
                        Divrow += '<div class="col-md-6 ">';
                        Divrow += '<div class="members-card">';
                        Divrow += '<div class="members-card-head">';
                        Divrow += '<img src="../_layouts/15/userphoto.aspx?size=M&username=' + valuesArray[proc].TeamMember.EMail + '" alt="">' + '</div>';
                        Divrow += '<div class="members-card-body">';
                        Divrow += '<div class="members-card-body-info text-ellipsis">';
                        Divrow += '<h3 class="member-name text-ellipsis">' + valuesArray[proc].TeamMember.Title + '</h3>';
                        Divrow += '<p class="member-email text-ellipsis">' + valuesArray[proc].TeamMember.EMail + '</p>';
                        Divrow += '<div class="member-dropdown text-ellipsis member-status-panel">';
                        Divrow += '<p style="display:none">' + valuesArray[proc].TeamMember.Id + '</p>';
                        if (valuesArray[proc].DocumentPermission == true) {
                            Divrow += '<select class="form-control internal-members-dropdown" disabled="disabled" >' +
                                '<option value="1073741830" selected>Member</option>' +
                           '</select>';
                            Divrow += '<div class="member-status-image-box">' +
                             '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Contributor-m.png" alt="">' +
                             '</div>' +
                             '</div>' +
                             '</div>' +
                             '</div>' +
                             '</div>' +
                             '</div>';
                        }
                        else {
                            Divrow += '<select class="form-control internal-members-dropdown" disabled="disabled" >' +
                                '<option value="1073741826" selected>Reader</option>' +
                           '</select>';
                            Divrow += '<div class="member-status-image-box">' +
                             '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Reader-m.png" alt="">' +
                             '</div>' +
                             '</div>' +
                             '</div>' +
                             '</div>' +
                             '</div>' +
                             '</div>';
                        }

                    }
                }
            }
        }
    });
    $("#divPermissionsmember").append(Divrow);
    GenratepermissionHtmlOthers(data, arrEmps);
}

//to check if User is Valid or not
function checkUserGuest(Email) {
    var IsUserInGuest = false;
    var Query = "?$select=Title,CompanyID/Id,InternalSupervisor/EMail,Supervisor/EMail,InternalMembers/EMail&$top=5000&$expand=CompanyID,InternalSupervisor,Supervisor,InternalMembers&$filter=(CompanyID/Id eq '" + Logged_CompanyId + "' and Title eq '" + $(".headdingLinks").text().trim() + "' and (Supervisor/EMail eq '" + Email + "' or InternalSupervisor/EMail eq '" + Email + "'or InternalMembers/EMail eq '" + Email + "')) ";
    $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        try {
            if (valuesArray.length > 0) {
                IsUserInGuest = true;
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
    });
    return IsUserInGuest;
}

//to check if User is Valid or not
function checkUserProject(Email) {
    var IsUserInProj = false;
    RestQuery = "?$select=*,Project/ProjectName,TeamMember/EMail&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and Project/ProjectName eq '" + $(".headdingLinks").text().trim() + "' and Status eq 'Active' and TeamMember/EMail eq '" + Email + "'&$top=5000";
    $.when(getItemsWithQuery('ProjectTeamDetails', RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (Employees) {
        try {
            if (Employees.length > 0) {
                IsUserInProj = true;
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
    });
    return IsUserInProj;
}

//to check if User'Dept is Valid or not
function checkUserDept(Email) {
    var IsUserInDept = false;
    RestQuery = "?$select=*,LogonName/EMail,LogonName/EMail,Department/ID,Department/DepartmentName,Company/ID&$expand=LogonName,Department,Company &$filter=Company/ID eq '" + Logged_CompanyId + "' and Department/ID eq '" + LibraryType + "' and Status eq 'Active' and LogonName/EMail eq '" + Email + "'&$top=5000";
    $.when(getItemsWithQuery('Employees', RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (Employees) {
        try {
            if (Employees.length > 0) {
                IsUserInDept = true;
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
    });
    return IsUserInDept;
}

function GenratepermissionHtml(data, DivId) {
    var Divrow = "";
    var Is
    for (var i = 0; i < data.length; i++) {
    	
    	
        Divrow += '<div class="col-md-6 ">';
        Divrow += '<div class="members-card' + data[i].Delete + '">' ;
        Divrow += '<div class="members-card-head">';
        Divrow += '<img src="../_layouts/15/userphoto.aspx?size=M&username=' + data[i].UserEmail + '" alt="">' + '</div>';
        Divrow += '<div class="members-card-body">';
        if(data[i].UserEmail.toLowerCase() != _spPageContextInfo.userEmail.toLowerCase()){
            Divrow += '<span class="removesection remove_group" onclick="DeleteMemberPermission(\'' + data[i].Title + '\', \'' + data[i].UserEmail + '\', \'' + data[i].UserId + '\');"><i class="fa fa-times" aria-hidden="true"></i></span>';
        }
        Divrow += '<div class="members-card-body-info text-ellipsis">' ;
        Divrow += '<h3 class="member-name text-ellipsis">' + data[i].Title + '</h3>' ;
        Divrow += '<p class="member-email text-ellipsis">' + data[i].UserEmail + '</p>' ;
        Divrow += '<div class="member-dropdown text-ellipsis member-status-panel">';
        Divrow += '<p id="principalid' + i + '" style="display:none">' + data[i].UserId + '</p>';

        if (data[i].userAccessControl == "Full_control") {
            Divrow += '<select class="form-control internal-members-dropdown" onchange="PermissionsChange(' + data[i].UserId + ',this)" ' + data[i].disabled + ' >' +
                '<option value="1073741829" selected>Owner</option>' +
                '<option value="1073741830" >Member</option>' +
                '<option value="1073741826">Guest</option>' +
                '<option value="1073741826" style="display:none;">Restricted View</option>' +
                '</select>';
        } else if (data[i].userAccessControl == "Contributor" || data[i].userAccessControl == "Edit" || data[i].userAccessControl == "Contribute" || data[i].userAccessControl == "Edit") {
            Divrow += '<select class="form-control internal-members-dropdown" onchange="PermissionsChange(' + data[i].UserId + ',this)" ' + data[i].disabled + ' >' +
                '<option value="1073741829">Owner</option>' +
                '<option value="1073741830" selected>Member</option>' +
                '<option value="1073741826" >Guest</option>' +
                '<option value="1073741826" style="display:none;">Restricted View</option>' +
                '</select>';


        } else if (data[i].userAccessControl == "Reader" || data[i].userAccessControl == "Viewers" || data[i].userAccessControl == "Read") {
            Divrow += '<select class="form-control internal-members-dropdown" onchange="PermissionsChange(' + data[i].UserId + ',this)" ' + data[i].disabled + ' >' +
                '<option value="1073741829">Owner</option>' +
                '<option value="1073741830">Member</option>' +
                '<option value="1073741826" selected>Guest</option>' +
                '<option value="1073741826" style="display:none;">Restricted View</option>' +
                '</select>';


        } else if (data[i].userAccessControl == "Restricted") {
            Divrow += '<select class="form-control internal-members-dropdown" onchange="PermissionsChange(' + data[i].UserId + ',this)" ' + data[i].disabled + ' >' +
                '<option value="1073741829">Owner</option>' +
                '<option value="1073741830">Member</option>' +
                '<option value="1073741826">Guest</option>' +
                '<option value="1073741826" style="display:none;" selected>Restricted View</option>' +
                '</select>';
        }


        Divrow += '<div class="member-status-image-box">' +
            '<img src="../SiteAssets/MyDocuments/DMS/assets/images/' + data[i].PermissionImage + '.png" alt="">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +


            '</div>';
    }


    //$(".internal-members-dropdown > [value=" + Acsesscontrol + "]").attr("selected", "true");

    $("#" + DivId + "").html("");
    $("#" + DivId + "").append(Divrow);
    
    if (currentSectionType != 'Group Documents') {
        $(".remove_group").hide();
    }

}


function PermissionsChange(userId, Id) {

    var Permissions = $(Id).children("option:selected").val();
    // alert("You have selected the country - " + selectedCountry);

    if (_spPageContextInfo.webAbsoluteUrl != SiteUrl) {
        $.when(GetFormDigestValue(SiteUrl)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }


    if (DeleteUserPermissionOnDMSLibrary(SiteUrl, Documentname, userId, Permissions, RequestDigest)) {
        AssignTheEditRole(SiteUrl, Documentname, userId, Permissions, RequestDigest);
        
    } else {
        alert("This operation is not allowed on an object that inherits permissions");
        return false;

    }


    var Query = "?$select=RestrictedContributor/UserName,RestrictedContributor/Title,RestrictedContributor/EMail,Contributors/UserName,Readers/UserName,Viewers/UserName,Contributors/EMail,Readers/EMail,Viewers/EMail,Contributors/Id,Readers/Id,Viewers/Id,Contributors/Title,Readers/Title,Viewers/Title,EmployeeName/EMail,EmployeeName/Id,EmployeeName/Title,ID&$top=1&$expand=EmployeeName,Contributors,Viewers,Readers,RestrictedContributor &$filter=Title eq '" + DMS_Type + "'";
    $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {


        Permissions = $(Id).children("option:selected").text();

        //GetAllEmployeeDetailsUser();
        userListIdfilterd = [];
        Contributors = [];
        RestrictedContributor = [];
        RestrictedView = [];
        Readers = [];
        arrEmployeeName = [];
        userListIdfilterd.push(userId);


        for (var i = 0; i < userListIdfilterd.length; i++) {
            if (valuesArray[0].EmployeeName.results != undefined) {
                for (var j = 0; j < valuesArray[0].EmployeeName.results.length; j++) {
                    arrEmployeeName.push(valuesArray[0].EmployeeName.results[j].Id)
                }
				
            }
            
            arrEmployeeName= arrEmployeeName.filter(function (obj) {
                return obj !== userListIdfilterd[i];
            });
            
            
            if (valuesArray[0].Viewers.results != undefined) {
                for (var j = 0; j < valuesArray[0].Viewers.results.length; j++) {
                    RestrictedView.push(valuesArray[0].Viewers.results[j].Id)
                }

            }


            RestrictedView = RestrictedView.filter(function(obj) {
                return obj !== userListIdfilterd[i];
            });



            if (valuesArray[0].Contributors.results != undefined) {
                for (var j = 0; j < valuesArray[0].Contributors.results.length; j++) {
                    Contributors.push(valuesArray[0].Contributors.results[j].Id)
                }

            }

            Contributors = Contributors.filter(function(obj) {
                return obj !== userListIdfilterd[i];
            });




            if (valuesArray[0].Readers.results != undefined) {
                for (var j = 0; j < valuesArray[0].Readers.results.length; j++) {
                    Readers.push(valuesArray[0].Readers.results[j].Id)
                }

            }

            Readers = Readers.filter(function(obj) {
                return obj !== userListIdfilterd[i];
            });




        }

        if (Permissions == "Full Control" || Permissions == "Owner") {
            var Metadata;
            var ItemType = GetItemTypeForListName("PersonalDMSSetting");
            const UserIdArray = getUniqueAfterMerge(arrEmployeeName, userListIdfilterd);

            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                EmployeeNameId: {
                    "results": UserIdArray
                },
                ContributorsId: {
                    "results": Contributors
                },

                ViewersId: {
                    "results": RestrictedView
                },
                ReadersId: {
                    "results": Readers
                },
                RestrictedContributorId: {
                    "results": RestrictedContributor
                }



            };

        } else if (Permissions == "Contributor" || Permissions == "Member" || Permissions == "Contribute" || Permissions == "Edit") {
            var Metadata;
            var ItemType = GetItemTypeForListName("PersonalDMSSetting");
            const UserIdArray = getUniqueAfterMerge(Contributors, userListIdfilterd);

            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                EmployeeNameId: {
                    "results": arrEmployeeName
                },
                ContributorsId: {
                    "results": UserIdArray
                },
                ViewersId: {
                    "results": RestrictedView
                },
                ReadersId: {
                    "results": Readers
                },
                RestrictedContributorId: {
                    "results": RestrictedContributor
                }


            };

        } else if (Permissions == "Reader" || Permissions == "Guest" || Permissions == "Read") {
            var Metadata;
            var ItemType = GetItemTypeForListName("PersonalDMSSetting");
            const UserIdArray = getUniqueAfterMerge(Readers, userListIdfilterd);
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                EmployeeNameId: {
                    "results": arrEmployeeName
                },
                ContributorsId: {
                    "results": Contributors
                },

                ViewersId: {
                    "results": RestrictedView
                },
                ReadersId: {
                    "results": UserIdArray
                },
                RestrictedContributorId: {
                    "results": RestrictedContributor
                }


            };




        } else if (Permissions == "Restricted View") {
            var Metadata;
            var ItemType = GetItemTypeForListName("PersonalDMSSetting");
            //RestrictedView= RestrictedView.concat(userListIdfilterd);

            const UserIdArray = getUniqueAfterMerge(RestrictedView, userListIdfilterd);

            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                EmployeeNameId: {
                    "results": arrEmployeeName
                },
                ContributorsId: {
                    "results": Contributors
                },

                ViewersId: {
                    "results": UserIdArray
                },
                ReadersId: {
                    "results": Readers
                },
                RestrictedContributorId: {
                    "results": RestrictedContributor
                }


            };



        }
        $.when(updateItemWithID(valuesArray[0].ID, "PersonalDMS_Setting", Metadata)).done(function(valuesArray) {

            GetListusers();
            // $("#adduserpopup1").modal('hide');

        });

    });




}

var Isfolderpermision = false;

//Masking of dropdown, as per the selected section - Departments/Group/Project/Guest
function ChangeRolesSectionBase(){
    if (currentSectionType == 'Department') {
        $('#ddlGroupUserRoles option[value=Owner]').text('HOD');
        $('#ddlGroupUserRoles option[value=Member]').text('Edit');
        $('#ddlGroupUserRoles option[value=Guest]').text('Reader');
    }
    else if (currentSectionType == 'Group Documents') {
        $('#ddlGroupUserRoles option[value=Owner]').text('Owner');
        $('#ddlGroupUserRoles option[value=Member]').text('Member');
        $('#ddlGroupUserRoles option[value=Guest]').text('Guest');
    }
    else if (currentSectionType == 'ProjectDocuments') {
        $('#ddlGroupUserRoles option[value=Owner]').text('Project Manager');
        $('#ddlGroupUserRoles option[value=Member]').text('Edit');
        $('#ddlGroupUserRoles option[value=Guest]').text('Guest');
    }
    else if (currentSectionType == 'GuestDocuments') {
        $('#ddlGroupUserRoles option[value=Owner]').text('Owner');
        $('#ddlGroupUserRoles option[value=Member]').text('Edit');
        $('#ddlGroupUserRoles option[value=Guest]').text('Guest');
    }
}

//Click to add User in Members
$("#btnAdduser").click(function(v) {
    $("#AddMemberBox").show();
    $("#Adduser").show();
    $(".PermissionControl").hide();
    $('#ddlpermission option[value=1073741937]').hide();
    initializePeoplePicker('Adduser', true);
    peoplePickerDiv = $("[id$='Adduser_TopSpan']");
    Isfolderpermision = false;
    $('#ddlpermission option[value=1073741829]').text('Owner');
    $('#ddlpermission option[value=1073741830]').text('Member');
    $('#ddlpermission option[value=1073741826]').text('Guest');
    $("#txtPermission").text("Role");
});

//Assigne permission to Owners/Membbers/Guest
$("#btnaddpermision").click(function (v) {
    $("#chkPermissionSelectAll").prop('disabled', '');
    $("#btnsubmituser").prop('disabled', '');
    //Masking of dropdown, as per the selected section - Departments/Group/Project/Guest
    ChangeRolesSectionBase();
    $("#AddMemberBox").hide();
    $("#Adduser").hide();
    $("#txtPermission").text("Permission");
    $(".PermissionControl").show();
    $('#ddlpermission option[value=1073741829]').text('Full Control');
    $('#ddlpermission option[value=1073741830]').text('Edit');
    $('#ddlpermission option[value=1073741826]').text('Read');
    $("#ddlpermission").val('1073741829');
    $("#ddlpermission").trigger('change');
    $("#ddlGroupUserRoles").val('Owner');
    $('#ddlpermission option[value=1073741937]').show();
    arrNotReaderEmp = [];
    $("#chkPermissionSelectAll").prop('checked', '');
    if ($(".InheritanceLabel").text() != '*Special permission is applied.') {
        //Break the permission if it is not broken already
        confirmation("Inherited Permissions will be stopped. Are you sure ?", "Manage permission").then(function (answer) {
            var ansbool = Boolean.parse(answer.toString());
            if (ansbool) {
                RequestDigest = $("#__REQUESTDIGEST").val();
                if (SiteUrl != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(SiteUrl)).done(function (GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                }
                Adhistory += "<br>" + moment().format('MMM D, YYYY hh:mm:s A');
                Adhistory += "," + "Inheritance Stopped by " + _spPageContextInfo.userDisplayName;

                if (currentSectionType == 'Department' || currentSectionType == 'Group Documents' || currentSectionType == 'ProjectDocuments' || currentSectionType == 'GuestDocuments') {
                    if (Documentname.includes('/') == true) {
                        var LibraryName = Documentname.split('/')[0];
                    }
                    else {
                        var LibraryName = Documentname;
                    }

                    var Metadata;
                    if (LibraryName.search(/\bDocuments\b/) >= 0 || LibraryName.search(/\bShared%20Documents\b/) >= 0 || LibraryName.search(/\bShared Documents\b/) >= 0) {
                        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
                    }
                    else {
                        var ItemType = GetItemTypeForLibraryName(LibraryName);
                    }
                    if(LibraryName == "Shared Documents" || LibraryName == "Shared%20Documents") {
                        LibraryName = "Documents";
                    }
                    Metadata = {
                        __metadata: {
                            'type': ItemType
                        },
                        Titan_Permission: Adhistory
                    };

                    $.when(updateItemWithIDTeam(DocFileFolderId, LibraryName, Metadata, SiteUrl)).done(function (data) {
                    	Adhistory = '';
                        breakRoleInheritanceOfFolder(SiteUrl, Filepath, RequestDigest, false);
                        Isfolderpermision = true;
                        //initializePeoplePicker('Adduser', true);
                        getDMSSettingRoles();
                        peoplePickerDiv = $("[id$='Adduser_TopSpan']");
                        $('#ddlpermission').prop('selectedIndex', 0);
                        $("#radioselecvtive").prop("checked", true);
                        $("#adduserpopup1").modal('show');
                        $(".InheritanceLabel").text("*Special permission is applied.");
                        $("#PermHisParent").show();
var tempDocName = Documentname;
                if (Documentname.search(/\bDocuments\b/) >= 0) {
                    tempDocName = "Shared%20Documents";
                }
                GetMyDocumentsWithFilesFolder(tempDocName);
                    });
                }
            }
        });
    }
    else {
        Isfolderpermision = true;
        //initializePeoplePicker('Adduser', true);
        getDMSSettingRoles();
        peoplePickerDiv = $("[id$='Adduser_TopSpan']");
        $('#ddlpermission').prop('selectedIndex', 0);
        $("#radioselecvtive").prop("checked", true);
        $("#adduserpopup1").modal('show');
    }
});

var arrDMSSettingRoles = [];

//get Owner/Contributor/Reader for the selected Team
function getDMSSettingRoles() {
    var user = '';
    arrDMSSettingRoles = [];
    var disabledHTML = '';
    arrUserAssignPermission = [];
    if (currentSectionType == 'Group Documents') {
        if(MsTeamId != ""){
            var Query = "?$select=*,EmployeeName/EMail,EmployeeName/Title,EmployeeName/Id,Contributors/EMail,Contributors/Title,Contributors/Id,Readers/EMail," +
               "Readers/Title,Readers/Id,Author/EMail&$expand=EmployeeName,Contributors,Readers,Author&$filter=MSTeamID eq '" + MsTeamId + "' and Status eq 'Active' ";
        }
        else {
            var Query = "?$select=*,EmployeeName/EMail,EmployeeName/Title,EmployeeName/Id,Contributors/EMail,Contributors/Title,Contributors/Id,Readers/EMail," +
           "Readers/Title,Readers/Id,Author/EMail&$expand=EmployeeName,Contributors,Readers,Author&$filter=Title eq '" + DMS_Type + "' and Status eq 'Active' ";

        }
        $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            arrDMSSettingRoles = valuesArray.filter(function (f) { return f; });
            if (valuesArray.length > 0) {
                if (valuesArray[0].EmployeeName.results != undefined) {
                    for (var j = 0; j < valuesArray[0].EmployeeName.results.length; j++) {
                        if (valuesArray[0].Author.EMail.toLowerCase() == valuesArray[0].EmployeeName.results[j].EMail) {
                            disabledHTML = 'disabled="disabled"';
                        }
                        else {
                            disabledHTML = '';
                        }
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].EmployeeName.results[j].EMail);
                        user += '<tr><td><input type="checkbox" class="Permissionchk" ' + disabledHTML + ' onclick="getUserTopermission(\'' + valuesArray[0].EmployeeName.results[j].Id + '\', \'' + valuesArray[0].EmployeeName.results[j].EMail + '\', \'' + valuesArray[0].EmployeeName.results[j].Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                        user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].EmployeeName.results[j].Title + '</h3>';
                        user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].EmployeeName.results[j].EMail + '\')">' + valuesArray[0].EmployeeName.results[j].EMail + '</a></div></div></td></tr>';
                    }
                    $("#tbdyUserRole").empty().append(user);
                }
            }
            else {
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
    else if (currentSectionType == 'Department') {
        arrPermission = [];
        var Query = "?$select=*,Department/DepartmentName,Contributors/EMail,Contributors/Title,Contributors/Id&$top=5000&$expand=Department,Contributors&$filter=CompanyId eq '" + Logged_CompanyId + "' and Department/DepartmentName eq '" + $(".headdingLinks").text() + "' and WebPartName eq 'Head of the department'";
        $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                if (valuesArray[0].Contributors.results != undefined) {
                    for (var j = 0; j < valuesArray[0].Contributors.results.length; j++) {
                        if (jQuery.inArray(valuesArray[0].Contributors.results[j].EMail, arrNotReaderEmp) != '-1') {
                            //Do Nothing. Elements contains this already
                        }
                        else {
                            arrNotReaderEmp.push(valuesArray[0].Contributors.results[j].EMail);
                        }
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].Contributors.results[j].EMail);
                        user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[0].Contributors.results[j].Id + '\', \'' + valuesArray[0].Contributors.results[j].EMail + '\', \'' + valuesArray[0].Contributors.results[j].Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                        user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].Contributors.results[j].Title + '</h3>';
                        user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].Contributors.results[j].EMail + '\')">' + valuesArray[0].Contributors.results[j].EMail + '</a></div></div></td></tr>';
                    }
                    $("#tbdyUserRole").empty().append(user);
                }
            }
            else {
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
    else if (currentSectionType == 'ProjectDocuments') {
        arrPermission = [];
        var Query = "?$select=Title,CompanyId,ManagerName/EMail,ManagerName/Title,ManagerName/Id&$top=5000&$expand=ManagerName&$filter=CompanyId eq '" + Logged_CompanyId + "' and Title eq '" + $(".headdingLinks").text() + "' ";
        $.when(getItemsWithQuery("ProjectDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                for (var j = 0; j < valuesArray.length; j++) {
                    if (jQuery.inArray(valuesArray[j].ManagerName.EMail, arrNotReaderEmp) != '-1') {
                        //Do Nothing. Elements contains this already
                    }
                    else {
                        arrNotReaderEmp.push(valuesArray[j].ManagerName.EMail);
                    }

                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[j].ManagerName.EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[j].ManagerName.Id + '\', \'' + valuesArray[j].ManagerName.EMail + '\', \'' + valuesArray[j].ManagerName.Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + valuesArray[j].ManagerName.Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[j].ManagerName.EMail + '\')">' + valuesArray[j].ManagerName.EMail + '</a></div></div></td></tr>';
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
    else if (currentSectionType == 'GuestDocuments') {
        var Query = "?$select=Title,CompanyID/Id,InternalSupervisor/EMail,InternalSupervisor/Title,InternalSupervisor/Id,Supervisor/EMail,Supervisor/Title,Supervisor/Id&$top=5000&$expand=CompanyID,InternalSupervisor,Supervisor&$filter=CompanyID/Id eq '" + Logged_CompanyId + "' and Title eq '" + $(".headdingLinks").text() + "'";
        $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                if (valuesArray[0].Supervisor.EMail != undefined && valuesArray[0].Supervisor.EMail != null) {
                    if (jQuery.inArray(valuesArray[0].Supervisor.EMail, arrNotReaderEmp) != '-1') {
                        //Do Nothing. Elements contains this already
                    }
                    else {
                        arrNotReaderEmp.push(valuesArray[0].Supervisor.EMail);
                    }

                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].Supervisor.EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[0].Supervisor.Id + '\', \'' + valuesArray[0].Supervisor.EMail + '\', \'' + valuesArray[0].Supervisor.Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].Supervisor.Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].Supervisor.EMail + '\')">' + valuesArray[0].Supervisor.EMail + '</a></div></div></td></tr>';
                }
                if (valuesArray[0].InternalSupervisor.EMail != undefined && valuesArray[0].InternalSupervisor.EMail != null) {
                    if (jQuery.inArray(valuesArray[0].InternalSupervisor.EMail, arrNotReaderEmp) != '-1') {
                        //Do Nothing. Elements contains this already
                    }
                    else {
                        arrNotReaderEmp.push(valuesArray[0].InternalSupervisor.EMail);
                    }
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].InternalSupervisor.EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[0].InternalSupervisor.Id + '\', \'' + valuesArray[0].InternalSupervisor.EMail + '\', \'' + valuesArray[0].InternalSupervisor.Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].InternalSupervisor.Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].InternalSupervisor.EMail + '\')">' + valuesArray[0].InternalSupervisor.EMail + '</a></div></div></td></tr>';
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
}


var arrUserAssignPermission = [];
//on select of checkbox get UserId,Email, and Name
function getUserTopermission(UserId, UserEmail, UserName, Action){
    if (Action.checked == true) {
        arrUserAssignPermission.push({
            UserEmail: UserEmail,
            UserName: UserName,
            UserId: UserId
        });
    }
    else {
        $('#chkPermissionSelectAll').prop("checked", "");
        arrUserAssignPermission = arrUserAssignPermission.filter(function(obj) {
            return obj.UserEmail != UserEmail;
        });
    }
}

//on change of User Roles bind the assigned users
function BindUserRoles_Gp(Action) {
    arrUserAssignPermission = [];
    if (arrDMSSettingRoles.length > 0) {
        var user = '';
        var disabledHTML = '';
        if (Action.value == "Owner") {
            if (arrDMSSettingRoles[0].EmployeeName.results != undefined) {
                for (var j = 0; j < arrDMSSettingRoles[0].EmployeeName.results.length; j++) {
                    if (arrDMSSettingRoles[0].Author.EMail.toLowerCase() == arrDMSSettingRoles[0].EmployeeName.results[j].EMail) {
                        disabledHTML = 'disabled="disabled"';
                    }
                    else {
                        disabledHTML = '';
                    }
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrDMSSettingRoles[0].EmployeeName.results[j].EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" ' + disabledHTML + ' onclick="getUserTopermission(\'' + arrDMSSettingRoles[0].EmployeeName.results[j].Id + '\', \'' + arrDMSSettingRoles[0].EmployeeName.results[j].EMail + '\', \'' + arrDMSSettingRoles[0].EmployeeName.results[j].Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + arrDMSSettingRoles[0].EmployeeName.results[j].Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + arrDMSSettingRoles[0].EmployeeName.results[j].EMail + '\')">' + arrDMSSettingRoles[0].EmployeeName.results[j].EMail + '</a></div></div></td></tr>';
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled')
            }
        }
        else if (Action.value == "Member") {
            if (arrDMSSettingRoles[0].Contributors.results != undefined) {
                for (var j = 0; j < arrDMSSettingRoles[0].Contributors.results.length; j++) {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrDMSSettingRoles[0].Contributors.results[j].EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + arrDMSSettingRoles[0].Contributors.results[j].Id + '\', \'' + arrDMSSettingRoles[0].Contributors.results[j].EMail + '\', \'' + arrDMSSettingRoles[0].Contributors.results[j].Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + arrDMSSettingRoles[0].Contributors.results[j].Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + arrDMSSettingRoles[0].Contributors.results[j].EMail + '\')">' + arrDMSSettingRoles[0].Contributors.results[j].EMail + '</a></div></div></td></tr>';
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled')
            }
        }
        else {
            if (arrDMSSettingRoles[0].Readers.results != undefined) {
                for (var j = 0; j < arrDMSSettingRoles[0].Readers.results.length; j++) {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrDMSSettingRoles[0].Readers.results[j].EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + arrDMSSettingRoles[0].Readers.results[j].Id + '\', \'' + arrDMSSettingRoles[0].Readers.results[j].EMail + '\', \'' + arrDMSSettingRoles[0].Readers.results[j].Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + arrDMSSettingRoles[0].Readers.results[j].Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + arrDMSSettingRoles[0].Readers.results[j].EMail + '\')">' + arrDMSSettingRoles[0].Readers.results[j].EMail + '</a></div></div></td></tr>';
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled')
            }
        }
    }
}
     

var arrNotReaderEmp = [];
//on change of User Roles bind the assigned users
function BindUserRoles_Dept(Action) {
    arrUserAssignPermission = [];
    var user = '';
    var disabledHTML = '';
    if (Action.value == "Owner") {
        var Query = "?$select=*,Department/DepartmentName,Contributors/EMail,Contributors/Title,Contributors/Id&$top=5000&$expand=Department,Contributors&$filter=CompanyId eq '" + Logged_CompanyId + "' and Department/DepartmentName eq '" + $(".headdingLinks").text() + "' and WebPartName eq 'Head of the department'";
        $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                if (valuesArray[0].Contributors.results != undefined) {
                    for (var j = 0; j < valuesArray[0].Contributors.results.length; j++) {
                        if (jQuery.inArray(valuesArray[0].Contributors.results[j].EMail, arrNotReaderEmp) != '-1') {
                            //Do Nothing. Elements contains this already
                        }
                        else {
                            arrNotReaderEmp.push(valuesArray[0].Contributors.results[j].EMail);
                        }
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].Contributors.results[j].EMail);
                        user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[0].Contributors.results[j].Id + '\', \'' + valuesArray[0].Contributors.results[j].EMail + '\', \'' + valuesArray[0].Contributors.results[j].Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                        user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].Contributors.results[j].Title + '</h3>';
                        user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].Contributors.results[j].EMail + '\')">' + valuesArray[0].Contributors.results[j].EMail + '</a></div></div></td></tr>';
                    }
                    $("#tbdyUserRole").empty().append(user);
                }
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
    else if (Action.value == "Member") {
        var Query = "?$select=*,Department/DepartmentName,Department/ID,Contributors/EMail,Contributors/Title,Contributors/Id,Owner/EMail,Owner/Title,Owner/Id&$top=5000&$expand=Owner,Department,Contributors&$filter=(CompanyId eq '" + Logged_CompanyId + "' and Department/DepartmentName eq '" + $(".headdingLinks").text() + "' and WebPartName eq 'Documents') ";
        $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                if (valuesArray[0].Contributors.results != undefined) {
                    for (var j = 0; j < valuesArray[0].Contributors.results.length; j++) {
                  
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].Contributors.results[j].EMail);
                        user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[0].Contributors.results[j].Id + '\', \'' + valuesArray[0].Contributors.results[j].EMail + '\', \'' + valuesArray[0].Contributors.results[j].Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                        user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].Contributors.results[j].Title + '</h3>';
                        user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].Contributors.results[j].EMail + '\')">' + valuesArray[0].Contributors.results[j].EMail + '</a></div></div></td></tr>';
                    }
                }
                if (valuesArray[0].Owner.results != undefined) {
                    for (var j = 0; j < valuesArray[0].Owner.results.length; j++) {
                    	
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].Owner.results[j].EMail);
                        user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[0].Owner.results[j].Id + '\', \'' + valuesArray[0].Owner.results[j].EMail + '\', \'' + valuesArray[0].Owner.results[j].Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                        user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].Owner.results[j].Title + '</h3>';
                        user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].Owner.results[j].EMail + '\')">' + valuesArray[0].Owner.results[j].EMail + '</a></div></div></td></tr>';
                    }
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
    else {
        //First get Members to exclude them from Readers
        var Query = "?$select=*,Department/DepartmentName,Department/ID,Contributors/EMail,Contributors/Title,Contributors/Id,Owner/EMail,Owner/Title,Owner/Id&$top=5000&$expand=Owner,Department,Contributors&$filter=(CompanyId eq '" + Logged_CompanyId + "' and Department/DepartmentName eq '" + $(".headdingLinks").text() + "' and WebPartName eq 'Documents') ";
        $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                if (valuesArray[0].Contributors.results != undefined) {
                    for (var j = 0; j < valuesArray[0].Contributors.results.length; j++) {
                        if (jQuery.inArray(valuesArray[0].Contributors.results[j].EMail, arrNotReaderEmp) != '-1') {
                            //Do Nothing. Elements contains this already
                        }
                        else {
                            arrNotReaderEmp.push(valuesArray[0].Contributors.results[j].EMail);
                        }
                    }
                }
                if (valuesArray[0].Owner.results != undefined) {
                    for (var j = 0; j < valuesArray[0].Owner.results.length; j++) {
                        if (jQuery.inArray(valuesArray[0].Owner.results[j].EMail, arrNotReaderEmp) != '-1') {
                            //Do Nothing. Elements contains this already
                        }
                        else {
                            arrNotReaderEmp.push(valuesArray[0].Owner.results[j].EMail);
                        }
                    }
                }
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
        Query = "?$top=5000&$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/Title,LogonName/EMail,Department/ID,Department/DepartmentName,Company/Title,Company/Id&$orderby=FullName asc&$expand=LogonName,Department,Company&$filter=Department/DepartmentName eq '" + $(".headdingLinks").text() + "' and Status eq 'Active' and Company/Id eq '" + Logged_CompanyId + "' ";
        $.when(getItemsWithQuery("Employees", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                for (var j = 0; j < valuesArray.length; j++) {
                    if (jQuery.inArray(valuesArray[j].LogonName.EMail, arrNotReaderEmp) != '-1') {
                        //Do Nothing. Elements contains this already
                    }
                    else {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[j].LogonName.EMail);
                        user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[j].LogonName.Id + '\', \'' + valuesArray[j].LogonName.EMail + '\', \'' + valuesArray[j].LogonName.Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                        user += '</div><div class="userdetailsbox"><h3>' + valuesArray[j].LogonName.Title + '</h3>';
                        user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[j].LogonName.EMail + '\')">' + valuesArray[j].LogonName.EMail + '</a></div></div></td></tr>';
                    }
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
}

//on change of User Roles bind the assigned users
function BindUserRoles_Proj(Action) {
    arrUserAssignPermission = [];
    var user = '';
    var disabledHTML = '';
    if (Action.value == "Owner") {
        var Query = "?$select=Title,CompanyId,ManagerName/EMail,ManagerName/Title,ManagerName/Id&$top=5000&$expand=ManagerName&$filter=CompanyId eq '" + Logged_CompanyId + "' and Title eq '" + $(".headdingLinks").text() + "' ";
        $.when(getItemsWithQuery("ProjectDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                arrNotReaderEmp = [];
                for (var j = 0; j < valuesArray.length; j++) {
                    if (jQuery.inArray(valuesArray[j].ManagerName.EMail, arrNotReaderEmp) != '-1') {
                        //Do Nothing. Elements contains this already
                    }
                    else {
                        arrNotReaderEmp.push(valuesArray[j].ManagerName.EMail);
                    }

                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[j].ManagerName.EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[j].ManagerName.Id + '\', \'' + valuesArray[j].ManagerName.EMail + '\', \'' + valuesArray[j].ManagerName.Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + valuesArray[j].ManagerName.Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[j].ManagerName.EMail + '\')">' + valuesArray[j].ManagerName.EMail + '</a></div></div></td></tr>';
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
    else if (Action.value == "Member") {
        var Query = "?$select=Title,CompanyId,TeamMember/EMail,TeamMember/Title,TeamMember/Id,Project/Title,DocumentPermission&$top=5000&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and Project/Title eq '" + $(".headdingLinks").text() + "' and DocumentPermission eq '1' ";
        $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                for (var j = 0; j < valuesArray.length; j++) {
                    if (jQuery.inArray(valuesArray[j].TeamMember.EMail, arrNotReaderEmp) != '-1') {
                        //Do Nothing. Elements contains this already
                    }
                    else {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[j].TeamMember.EMail);
                        user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[j].TeamMember.Id + '\', \'' + valuesArray[j].TeamMember.EMail + '\', \'' + valuesArray[j].TeamMember.Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                        user += '</div><div class="userdetailsbox"><h3>' + valuesArray[j].TeamMember.Title + '</h3>';
                        user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[j].TeamMember.EMail + '\')">' + valuesArray[j].TeamMember.EMail + '</a></div></div></td></tr>';
                    }
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
    else {
        var Query = "?$select=Title,CompanyId,TeamMember/EMail,Project/Title,DocumentPermission&$top=5000&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and Project/Title eq '" + $(".headdingLinks").text() + "' and DocumentPermission ne '1' ";
        $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                for (var j = 0; j < valuesArray.length; j++) {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[j].TeamMember.EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[j].TeamMember.Id + '\', \'' + valuesArray[j].TeamMember.EMail + '\', \'' + valuesArray[j].TeamMember.Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + valuesArray[j].TeamMember.Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[j].TeamMember.EMail + '\')">' + valuesArray[j].TeamMember.EMail + '</a></div></div></td></tr>';
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
}
     
//on change of User Roles bind the assigned users
function BindUserRoles_Guest(Action) {
    arrUserAssignPermission = [];
    var user = '';
    var disabledHTML = '';
    if (Action.value == "Owner") {
        var Query = "?$select=Title,CompanyID/Id,InternalSupervisor/EMail,InternalSupervisor/Title,InternalSupervisor/Id,Supervisor/EMail,Supervisor/Title,Supervisor/Id&$top=5000&$expand=CompanyID,InternalSupervisor,Supervisor&$filter=CompanyID/Id eq '" + Logged_CompanyId + "' and Title eq '" + $(".headdingLinks").text() + "'";
        $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                arrNotReaderEmp = [];
                if (valuesArray[0].Supervisor.EMail != undefined && valuesArray[0].Supervisor.EMail != null) {
                    if (jQuery.inArray(valuesArray[0].Supervisor.EMail, arrNotReaderEmp) != '-1') {
                        //Do Nothing. Elements contains this already
                    }
                    else {
                        arrNotReaderEmp.push(valuesArray[0].Supervisor.EMail);
                    }
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].Supervisor.EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[0].Supervisor.Id + '\', \'' + valuesArray[0].Supervisor.EMail + '\', \'' + valuesArray[0].Supervisor.Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].Supervisor.Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].Supervisor.EMail + '\')">' + valuesArray[0].Supervisor.EMail + '</a></div></div></td></tr>';
                }
                if (TeamMember[0].InternalSupervisor.EMail != undefined && TeamMember[0].InternalSupervisor.EMail != null) {
                    if (jQuery.inArray(valuesArray[0].InternalSupervisor.EMail, arrNotReaderEmp) != '-1') {
                        //Do Nothing. Elements contains this already
                    }
                    else {
                        arrNotReaderEmp.push(valuesArray[0].InternalSupervisor.EMail);
                    }
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].InternalSupervisor.EMail);
                    user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[0].InternalSupervisor.Id + '\', \'' + valuesArray[0].InternalSupervisor.EMail + '\', \'' + valuesArray[0].InternalSupervisor.Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                    user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].InternalSupervisor.Title + '</h3>';
                    user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].InternalSupervisor.EMail + '\')">' + valuesArray[0].InternalSupervisor.EMail + '</a></div></div></td></tr>';
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
    else if (Action.value == "Member") {
        var Query = "?$select=Title,CompanyID/Id,InternalMembers/EMail,InternalMembers/Title,InternalMembers/Id&$top=5000&$expand=CompanyID,InternalMembers&$filter=CompanyID/Id eq '" + Logged_CompanyId + "' and Title eq '" + $(".headdingLinks").text() + "'";
        $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray[0].InternalMembers.results != undefined) {
                for (var j = 0; j < valuesArray[0].InternalMembers.results.length; j++) {
                    if (jQuery.inArray(valuesArray[0].InternalMembers.EMail, arrNotReaderEmp) != '-1') {
                        //Do Nothing. Elements contains this already
                    }
                    else {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].InternalMembers.results[j].EMail);
                        user += '<tr><td><input type="checkbox" class="Permissionchk" onclick="getUserTopermission(\'' + valuesArray[0].InternalMembers.results[j].Id + '\', \'' + valuesArray[0].InternalMembers.results[j].EMail + '\', \'' + valuesArray[0].InternalMembers.results[j].Title + '\', this);"></td><td><div class="userboxsection"><div class="userimgbox"><img src="' + attachment + '" alt="">';
                        user += '</div><div class="userdetailsbox"><h3>' + valuesArray[0].InternalMembers.results[j].Title + '</h3>';
                        user += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].InternalMembers.results[j].EMail + '\')">' + valuesArray[0].InternalMembers.results[j].EMail + '</a></div></div></td></tr>';
                    }
                }
                $("#tbdyUserRole").empty().append(user);
            }
            else {
                $("#tbdyUserRole").empty();
                $("#chkPermissionSelectAll").prop('disabled', 'disabled');
                $("#btnsubmituser").prop('disabled', 'disabled');
            }
        });
    }
    else {
        $("#tbdyUserRole").empty();
        $("#chkPermissionSelectAll").prop('disabled', 'disabled');
        $("#btnsubmituser").prop('disabled', 'disabled');
    }
}
      

var Contributors = [];
var RestrictedContributor = [];
var RestrictedView = [];
var Readers = [];


function getUniqueAfterMerge(arr1, arr2) {

    let arr = [...arr1, ...arr2];

    // removing duplicate
    let uniqueArr = [...new Set(arr)];

    return uniqueArr;
}




var Adhistory = "";
var getAddHistory="";
//check if user is availble in 'Personal_DMS settings' list
function checkPersonalDMSSettings(sharingLink, typeOfFileFolder, arrRestrictedUser, Permission) {
    var NotValidUsers = [];
    var IsValid = false;
    var AllEmpty = true;
    var arrEmails = [];
    var returnValue = false;
    for (var user = 0; user < arrRestrictedUser.length; user++) {
        if (arrRestrictedUser[user].UserEmail.includes('#') == true) {
            arrRestrictedUser[user].UserEmail = arrRestrictedUser[user].UserEmail.split('#ext')[0];
            arrRestrictedUser[user].UserEmail = arrRestrictedUser[user].UserEmail.replace("_", '@');
        }
        if(MsTeamId == ""){
            var Query = "?$select=Title,Status,DMS_Link,EmployeeName/EMail,EmployeeName/Title,Contributors/EMail,Contributors/Title,Readers/EMail," +
	       "Readers/Title,Viewers/EMail,Viewers/Title,RestrictedContributor/EMail,RestrictedContributor/Title,RestrictedView/EMail,RestrictedView/Title" +
	       "&$expand=EmployeeName,Contributors,Readers,Viewers,RestrictedContributor,RestrictedView&$" +
	        "filter=(Title eq '" + DMS_Type + "' and Status eq 'Active' and (EmployeeName/EMail eq '" + arrRestrictedUser[user].UserEmail + "' " +
	        "or Contributors/EMail eq '" + arrRestrictedUser[user].UserEmail + "' or Readers/EMail eq '" + arrRestrictedUser[user].UserEmail + "' or Viewers/EMail eq '" + arrRestrictedUser[user].UserEmail + "' or RestrictedContributor/EMail eq '" + arrRestrictedUser[user].UserEmail + "' or RestrictedView/EMail eq '" + arrRestrictedUser[user].UserEmail + "')) ";

        }
        else {
            var Query = "?$select=Status,DMS_Link,EmployeeName/EMail,EmployeeName/Title,Contributors/EMail,Contributors/Title,Readers/EMail," +
	       "Readers/Title,Viewers/EMail,Viewers/Title,RestrictedContributor/EMail,RestrictedContributor/Title,RestrictedView/EMail,RestrictedView/Title" +
	       "&$expand=EmployeeName,Contributors,Readers,Viewers,RestrictedContributor,RestrictedView&$" +
	        "filter=(MSTeamID eq '" + MsTeamId + "' and Status eq 'Active' and (EmployeeName/EMail eq '" + arrRestrictedUser[user].UserEmail + "' " +
	        "or Contributors/EMail eq '" + arrRestrictedUser[user].UserEmail + "' or Readers/EMail eq '" + arrRestrictedUser[user].UserEmail + "' or Viewers/EMail eq '" + arrRestrictedUser[user].UserEmail + "' or RestrictedContributor/EMail eq '" + arrRestrictedUser[user].UserEmail + "' or RestrictedView/EMail eq '" + arrRestrictedUser[user].UserEmail + "')) ";
        }
        $.when(getItemsWithQuery('PersonalDMS_Setting', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (DMSSettings) {
            if (DMSSettings.length == 0) {
                NotValidUsers.push(arrRestrictedUser[user].UserName.toLowerCase());
            }
        });
    }
    
    if (NotValidUsers.length > 0) {
        alert(NotValidUsers.join(', ') + " user(s) are not valid.");
        return false;
    }
    else {
        for (var emp = 0; emp < arrRestrictedUser.length; emp++) {
            arrEmails.push(arrRestrictedUser[emp].UserEmail);
        }
        returnValue = true;
        
    }
    return returnValue;
}


//remove already added members of any group
function RemoveAddedGroupMemb(SiteUrl, Documentname, Permissions, RequestDigest, Filepath) {
    if ($("#ddlGroupUserRoles").val() == "Owner") {
        if (arrDMSSettingRoles[0].EmployeeName.results != undefined) {
            for (var j = 0; j < arrDMSSettingRoles[0].EmployeeName.results.length; j++) {
                if (arrDMSSettingRoles[0].EmployeeName.results[j].EMail.includes('#') == true) {
                    arrDMSSettingRoles[0].EmployeeName.results[j].EMail = arrDMSSettingRoles[0].EmployeeName.results[j].EMail.split('#ext')[0];
                    arrDMSSettingRoles[0].EmployeeName.results[j].EMail = arrDMSSettingRoles[0].EmployeeName.results[j].EMail.replace("_", '@');
                }

                SetId = GetUserId(arrDMSSettingRoles[0].EmployeeName.results[j].EMail, SiteUrl);
                RemoverUsermemberOfFolder(SiteUrl, Filepath, RequestDigest, SetId , false);
            }
        }
    }
    else if ($("#ddlGroupUserRoles").val() == "Member") {
        if (arrDMSSettingRoles[0].Contributors.results != undefined) {
            for (var j = 0; j < arrDMSSettingRoles[0].Contributors.results.length; j++) {
                if (arrDMSSettingRoles[0].Contributors.results[j].EMail.includes('#') == true) {
                    arrDMSSettingRoles[0].Contributors.results[j].EMail = arrDMSSettingRoles[0].Contributors.results[j].EMail.split('#ext')[0];
                    arrDMSSettingRoles[0].Contributors.results[j].EMail = arrDMSSettingRoles[0].Contributors.results[j].EMail.replace("_", '@');
                }

                SetId = GetUserId(arrDMSSettingRoles[0].Contributors.results[j].EMail, SiteUrl);
                RemoverUsermemberOfFolder(SiteUrl, Filepath, RequestDigest, SetId , false);
            }
        }
    }
    else {
        if (arrDMSSettingRoles[0].Readers.results != undefined) {
            for (var j = 0; j < arrDMSSettingRoles[0].Readers.results.length; j++) {
                if (arrDMSSettingRoles[0].Readers.results[j].EMail.includes('#') == true) {
                    arrDMSSettingRoles[0].Readers.results[j].EMail = arrDMSSettingRoles[0].Readers.results[j].EMail.split('#ext')[0];
                    arrDMSSettingRoles[0].Readers.results[j].EMail = arrDMSSettingRoles[0].Readers.results[j].EMail.replace("_", '@');
                }

                SetId = GetUserId(arrDMSSettingRoles[0].Readers.results[j].EMail, SiteUrl);
                RemoverUsermemberOfFolder(SiteUrl, Filepath, RequestDigest, SetId , false);
            }
            $("#tbdyUserRole").empty().append(user);
        }
    }

}

$("#btnRemoveLib").click(function(v) {
    var confirmationMsg = '';
    if($("#RadioremoveLink").prop('checked') == true){
        confirmationMsg = "Are you sure to remove the link?";
    }
    else {
        confirmationMsg = "Are you sure to delete the library?";
    }
    var result = confirm(confirmationMsg);
    if (result) {
        if ($("#RadioremoveLink").is(":checked")) {
            var Query = "?$select=ID &$top=5 &$filter=Title eq '" + DMS_Type + "' and ((EmployeeName/Id eq '" + _spPageContextInfo.userId + "') or (Contributors/Id eq '" + _spPageContextInfo.userId + "') or (Readers/Id eq '" + _spPageContextInfo.userId + "')or (Viewers/Id eq '" + _spPageContextInfo.userId + "')or (RestrictedContributor/Id eq '" + _spPageContextInfo.userId + "'))";
            $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {

                if (valuesArray.length > 0) {
                    deleteItem("/_api/Web/Lists/GetByTitle('PersonalDMS_Setting')/getItemById(" + valuesArray[0].ID + ")", valuesArray[0]).done(function(d_data) {
                        $("#removeLibary").modal('hide');
                        $("#fordive").css('display', 'none');
                        $(".headdingLinks").text('');
                        MyDocumentEnv();
                        //deleted child item.
                    });

                }

            });

        } else if ($("#RadioDeletelib").is(":checked")) {

            var Query = "?$select=ID,Author/Id &$expand=Author &$top=5 &$filter=Title eq '" + DMS_Type + "' and LibraryType eq 'Customs' and Author/Id eq '" + _spPageContextInfo.userId + "' ";
            $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {


                if (valuesArray.length > 0) {
                    deleteItem("/_api/Web/Lists/GetByTitle('PersonalDMS_Setting')/getItemById(" + valuesArray[0].ID + ")", valuesArray[0]).done(function(d_data) {

                        RequestDigest = $("#__REQUESTDIGEST").val();



                        if (_spPageContextInfo.webAbsoluteUrl != SiteUrl) {
                            $.when(GetFormDigestValue(withoutLastChunk)).done(function(GetFormDigestValue) {
                                RequestDigest = GetFormDigestValue
                            });

                        }

                        DeleteLibrary(SiteUrl, listTitle, RequestDigest)


                    });
                } else {
                    alertbox("You are not authorized to delete this Library.", "Warning")
                }


            });
        }

    }



});


function LeavethisGroup() {

    var Query = "?$select=Author/Id,EmployeeName/UserName,EmployeeName/Id,RestrictedContributor/UserName,RestrictedContributor/Id,RestrictedContributor/Title,RestrictedContributor/EMail,Contributors/UserName,Readers/UserName,Viewers/UserName,Contributors/EMail,Readers/EMail,Viewers/EMail,Contributors/Id,Readers/Id,Viewers/Id,Contributors/Title,Readers/Title,Viewers/Title,ID &$top=1&$expand=Author,Contributors,Viewers,Readers,RestrictedContributor,EmployeeName &$filter=Title eq '" + DMS_Type + "' and Author/Id ne '" + _spPageContextInfo.userId + "'";
    $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {


        //GetAllEmployeeDetailsUser();
        if (valuesArray.length > 0) {
            Contributors = [];
            EmployeeName = []
            RestrictedContributor = [];
            RestrictedView = [];
            Readers = [];


            if (valuesArray[0].Viewers.results != undefined) {
                for (var j = 0; j < valuesArray[0].Viewers.results.length; j++) {
                    if (valuesArray[0].Viewers.results[j].Id != _spPageContextInfo.userId) {
                        RestrictedView.push(valuesArray[0].Viewers.results[j].Id)
                    }
                }

            }

            if (valuesArray[0].RestrictedContributor.results != undefined) {
                for (var j = 0; j < valuesArray[0].RestrictedContributor.results.length; j++) {
                    if (valuesArray[0].RestrictedContributor.results[j].Id != _spPageContextInfo.userId) {
                        RestrictedContributor.push(valuesArray[0].RestrictedContributor.results[j].Id)
                    }
                }

            }


            if (valuesArray[0].EmployeeName.results != undefined) {
                for (var j = 0; j < valuesArray[0].EmployeeName.results.length; j++) {
                    if (valuesArray[0].EmployeeName.results[j].Id != _spPageContextInfo.userId) {
                        EmployeeName.push(valuesArray[0].EmployeeName.results[j].Id)
                    }
                }

            }




            if (valuesArray[0].Contributors.results != undefined) {
                for (var j = 0; j < valuesArray[0].Contributors.results.length; j++) {
                    if (valuesArray[0].Contributors.results[j].Id != _spPageContextInfo.userId) {

                        Contributors.push(valuesArray[0].Contributors.results[j].Id)
                    }
                }

            }


            if (valuesArray[0].Readers.results != undefined) {
                for (var j = 0; j < valuesArray[0].Readers.results.length; j++) {
                    if (valuesArray[0].Readers.results[j].Id != _spPageContextInfo.userId) {
                        Readers.push(valuesArray[0].Readers.results[j].Id)
                    }
                }

            }




            var Metadata;
            var ItemType = GetItemTypeForListName("PersonalDMSSetting");
            Metadata = {
                __metadata: {
                    'type': ItemType
                },

                ViewersId: {
                    "results": RestrictedView
                },
                ReadersId: {
                    "results": Readers
                },
                RestrictedContributorId: {
                    "results": RestrictedContributor
                },
                EmployeeNameId: {
                    "results": EmployeeName
                },
                ContributorsId: {
                    "results": Contributors
                }




            };


            confirmation("Are you sure to leave this group?", "Leave Group").then(function(answer) {

                var ansbool = Boolean.parse(answer.toString());
                if (ansbool) {
                    $.when(updateItemWithID(valuesArray[0].ID, "PersonalDMS_Setting", Metadata)).done(function(valuesArray) {
                        $("#fordive").css('display', 'none');
                        $(".headdingLinks").text('');
                        MyDocumentEnv();
                    });

                }
            });



        } else {
            alertbox("Group creator cannot leave the group.", "Leave Group")
        }

    });




}



function DeleteLibrary(SiteUrl, Libraryname, REQUESTDIGEST) {
    $.ajax({
        // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
        // You can replace this will other site URL where you want to apply the function
        url: SiteUrl + "/_api/web/lists/getByTitle('" + Libraryname + "')",
        type: "DELETE",
        headers: {
            // Accept header: Specifies the format for response data from the server.
            "Accept": "application/json;odata=verbose",
            //Content-Type header: Specifies the format of the data that the client is sending to the server
            "Content-Type": "application/json;odata=verbose",
            // IF-MATCH header: Provides a way to verify that the object being changed has not been changed since it was last retrieved.
            // "IF-MATCH":"*", will overwrite any modification in the object, since it was last retrieved.
            "IF-MATCH": "*",
            // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
            "X-RequestDigest": REQUESTDIGEST
        },
        success: function(data, status, xhr) {
            alert("Library has been deleted successfully.");
            $("#removeLibary").modal('hide');
            $("#fordive").css('display', 'none');
            $(".headdingLinks").text('');
            MyDocumentEnv();
        },
        error: function(xhr, status, error) {
            console.log("Failed");
        }
    });
}


$("#tblColumnsSettings").on('click', '.deletecustomTr', function() {
    var ItemId = parseInt(this.id)


    var msg = "Are you sure you want to remove  of this <b style='text-align:center'> column </b> from grid <b>";
    confirmation(msg).then(function(answer) {

        var ansbool = Boolean.parse(answer.toString());
        if (ansbool) {
            // DeleteListItemUsingItemId(ItemId);
            $(this).closest('tr').remove();

        }
    });




});



function DefaultRow(valuesArray) {


    for (var i = 0; i < valuesArray.length; i++) {
        if ("Title" == valuesArray[i].ColumnName) {
            $("#ckbTitle").prop('checked', true);
        } else if ("Type" == valuesArray[i].ColumnName || "DocumentType" == valuesArray[i].ColumnName) {
            $("#ckbDocumentType").prop('checked', true);
        } else if ("Reference" == valuesArray[i].ColumnName || "DocumentNo" == valuesArray[i].ColumnName) {
            $("#ckbReferenceNumber").prop('checked', true);
        } else if ("Author" == valuesArray[i].ColumnName) {
            $("#ckbAuthor").prop('checked', true);
        } else if ("Details" == valuesArray[i].ColumnName) {
            $("#ckbDetails").prop('checked', true);
        } else if ("Modified" == valuesArray[i].ColumnName) {
            $("#ckbModifiedDate").prop('checked', true);
        } else if ("Modified By" == valuesArray[i].ColumnName) {
            $("#ckbModifiedBy").prop('checked', true);
        } else if ("Sharing" == valuesArray[i].ColumnName || "Shared" == valuesArray[i].ColumnName) {
            $("#ckbSharing").prop('checked', true);
        } else if ("Approval" == valuesArray[i].ColumnName || "ApprovedByOutsider" == valuesArray[i].ColumnName) {
            $("#ckbApproval").prop('checked', true);
        } else if ("File Size" == valuesArray[i].ColumnName) {
            $("#ckbFileSize").prop('checked', true);
        } else {
            //$("#ckbTitle").prop('checked', true);
        }
    }
}

function addCustomRow(valuesArray) {


    $('.dummyRow').remove();
    for (var i = 0; i < valuesArray.length; i++) {

        CustomRow = '<tr class="customTr">' +
            '<td class="vertical-align-middle">' +
            '<div class="checkbox mt0 checkbox-space-align">' +
            '<label><input type="checkbox" class="checkbox" value="" id="ckbCustomCol' + i + '" ></label>' +
            '</div>' +
            '</td>' +
            '<td>' + valuesArray[i].ColumnName + '</td>' +
            '<td>' + valuesArray[i].DataType + '</td>' +
            '<td style="display:none">Custom</td>' +
            '<td>' +
            '<div class="form-group custom-form-group mb0">' +
            '<select class="form-control numbers" id="ddlCustomCol' + i + '">' +

            '<option>2</option>' +
            '<option>3</option>' +
            '<option>4</option>' +
            '<option>5</option>' +
            '<option>6</option>' +
            '<option>7</option>' +
            '<option>8</option>' +
            '<option>9</option>' +
            '<option>10</option>' +
            '<option>11</option>' +
            '<option >12</option>' +
            '<option>13</option>' +
            '<option>14</option>' +
            '<option>15</option>' +
            '<option>16</option>' +
            '<option>17</option>' +

            '</select>' +
            '</div>' +
            '</td>' +
            '<td><a class="deletecustomTr"   id="' + valuesArray[i].Id + '" href="#">Delete</a></td>' +
            '</tr>';

        $("#tblColumnsSettings tr:last").before(CustomRow);

        $("#ddlCustomCol" + i + " option:selected").text(valuesArray[i].Position);
        $("#ckbCustomCol" + i + "").prop('checked', valuesArray[i].Visibility);

    }

}


var arrCurrentColumns = [];

function GenrateHtmlGrid(results, IsMyfavorate, files) {
    var html = "";
    // $("#SearchResultsGridTbody").html("");
    //$(".custom-table").html("");
    var ColumnName = ""
    arrCurrentColumns = results.filter(function(f) {
        return f;
    })
    ColumnName += '<th class="text-center border-bottom-0 w-2">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label>' +
        '</th>';
    //['Name', 'Title', 'DocumentType', 'DocumentNo', 'Modified', 'ApprovedBy',  'Shared', 'ApprovalStatus']
    for (var i = 0; i < results.length; i++) {

        if (results[i].ColumnName == "DocumentNo") {
            ColumnName += '<th>Reference</th>';

        } else if (results[i].ColumnName == "DocumentType") {
            ColumnName += '<th>Type</th>';

        } else if (results[i].ColumnName == "ApprovedByOutsider" || results[i].ColumnName == "ApprovedBy") {
            ColumnName += '<th>Approval</th>';

        } else if (results[i].ColumnName == "Shared") {
            ColumnName += '<th>Sharing</th>';

        } else {
            ColumnName += '<th>' + results[i].ColumnName + '</th>';

        }


    }
    //thead
    $("#DMSTable").empty().html('<table class="table mb-0 custom-table" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    $("#theadItem").html("");
    $("#theadItem").append(ColumnName);
    var rowCount = 0;
    $("#groupDocumentGridtbody").html("");

    var Isdata = false;
    arrFilterTable = [];
    if (!IsMyfavorate) {

        $.when(getItemsWithQueryUsersDocuments(Documentname, SiteUrl)).done(function(DocumentGroup) {

            var files = DocumentGroup.Files.results;
            var folders = DocumentGroup.Folders.results;
            folders.sort(function(a, b) {
                var dateA = new Date(a.TimeLastModified),
                    dateB = new Date(b.TimeLastModified);
                return dateB - dateA;
            });
            files.sort(function(a, b) {
                var dateA = new Date(a.TimeLastModified),
                    dateB = new Date(b.TimeLastModified);
                return dateB - dateA;
            });

            var tabledynamichtml = ""
            $("#liPermission").hide();



            var Icon = "folder.png";
            var NoFile = false;
            for (var i = 0; i < folders.length; i++) {
                rowCount++;

                if (folders[i].Name != "Forms") {

                    NoFile = true;
                    if(currentSectionType != 'My Documents') {
                        $("#liPermission").show();
                    }
                    genrateHtmlgrid(Icon, results, folders[i], rowCount, "folder", "");
                }

            }

            for (var i = 0; i < files.length; i++) {
                rowCount++
                var FileExtension = files[i].Name.split('.')[1];
                Icon = "file.png";
                if ("docx" == FileExtension || "doc" == FileExtension) {
                    Icon = "docx.png";
                } else if ("pdf" == FileExtension) {
                    Icon = "pdf.png";
                } else if ("jpg" == FileExtension || "psd" == FileExtension || "tiff" == FileExtension || "gif" == FileExtension || "bmp" == FileExtension || "jpeg" == FileExtension || "png" == FileExtension) {
                    Icon = "image-icon.png";
                } else if ("xlsx" == FileExtension || "xls" == FileExtension) {
                    Icon = "xlsx.png";
                } else if ("pptx" == FileExtension || "ppt" == FileExtension) {
                    Icon = "pptx.png";
                } else if ("txt" == FileExtension) {
                    Icon = "txt.png";
                } else if ("csv" == FileExtension) {
                    Icon = "CSV.png";

                } else if ("zip" == FileExtension || "rar" == FileExtension || "7z" == FileExtension || "arz" == FileExtension || "cab" == FileExtension || "rpm" == FileExtension || "wim" == FileExtension) {
                    Icon = "ZIP.png";

                } else if ("mp4" == FileExtension || "wmv" == FileExtension || "avi" == FileExtension || "mpeg" == FileExtension || "flv" == FileExtension || "mov" == FileExtension || "wav" == FileExtension || "ogv" == FileExtension) {
                    Icon = "video-files.png";

                } else if ("mp3" == FileExtension || "wma" == FileExtension || "aac" == FileExtension || "pcm" == FileExtension) {
                    Icon = "audio.png";

                }
                Isdata = true;
                genrateHtmlgrid(Icon, results, files[i], rowCount, "file", "");




            }
            if (files.length == 0 && NoFile == false) {
                Isdata = false;
                var tr = $('<tr>');
                var cell = $("<td colspan='8' style='text-align: center;'>");
                cell.html("No record found.");
                tr.append(cell);
                waitingDialog.hide();
                $("#groupDocumentGridtbody").append(tr);


            }




        });
    } else {
        for (var i = 0; i < files.length; i++) {
            rowCount++
            var FileExtension = files[i].Name.split('.')[1];
            Icon = "file.png";
            if ("docx" == FileExtension || "doc" == FileExtension) {
                Icon = "docx.png";
            } else if ("pdf" == FileExtension) {
                Icon = "pdf.png";
            } else if ("jpg" == FileExtension || "psd" == FileExtension || "tiff" == FileExtension || "gif" == FileExtension || "bmp" == FileExtension || "jpeg" == FileExtension || "png" == FileExtension) {
                Icon = "image-icon.png";
            } else if ("xlsx" == FileExtension || "xls" == FileExtension) {
                Icon = "xlsx.png";
            } else if ("pptx" == FileExtension || "ppt" == FileExtension) {
                Icon = "pptx.png";
            } else if ("txt" == FileExtension) {
                Icon = "txt.png";
            } else if ("csv" == FileExtension) {
                Icon = "CSV.png";

            } else if ("zip" == FileExtension || "rar" == FileExtension || "7z" == FileExtension || "arz" == FileExtension || "cab" == FileExtension || "rpm" == FileExtension || "wim" == FileExtension) {
                Icon = "ZIP.png";

            } else if ("mp4" == FileExtension || "wmv" == FileExtension || "avi" == FileExtension || "mpeg" == FileExtension || "flv" == FileExtension || "mov" == FileExtension || "wav" == FileExtension || "ogv" == FileExtension) {
                Icon = "video-files.png";

            } else if ("mp3" == FileExtension || "wma" == FileExtension || "aac" == FileExtension || "pcm" == FileExtension) {
                Icon = "audio.png";

            }

            genrateHtmlgrid(Icon, results, files[i], rowCount, "file", "");
            Isdata = true;
        }

    }
    $(".chkFileFolder").click(function() {
        var Properties = this.value.split(',');
        if (this.checked == true) {
            arrFileFolder.push({
                type: Properties[0].trim(),
                ServerURL: Properties[1].trim(),
                DocumentId: Properties[2].trim(),
                SiteURL: Properties[3].trim(),
                SelectedLibrary: Properties[4].trim(),
                FileFolderName: Properties[5].trim(),
                CopyFileLink: Properties[6].trim(),
                FileTitle: Properties[7].trim(),
                FileRef: Properties[8].trim(),
                FileType: Properties[9].trim(),
                DocType: Properties[10].trim(),
                fileFilderInheritance: $(this).data('inherit')
            });
        } else {
            var selected = this.value;
            arrFileFolder = arrFileFolder.filter(function(obj) {
                return obj.DocumentId != Properties[2].trim();
            });
        }
    });
    $("#selectAllChk").click(function(e) {
        waitingDialog.show();
        if (this.checked == true) {
            $('.chkFileFolder').prop("checked", "");
            $('.chkFileFolder').trigger('click');
        } else {
            $('.chkFileFolder').prop("checked", "");
            arrFileFolder = [];
        }
        waitingDialog.hide();
    });

    // $("#groupDocumentGrid").append(html);
    if (Isdata) {
        Tableagination();
    }

}

//to check if array contains any duplicate substring
function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length
}

function GetSubFolders(subFolderlLink) {
    var encodedeUrl = decodeURI(subFolderlLink)
    var surFoldersArray = new Array();
    var subFolders = encodedeUrl.split('/');
    var folderurls = "";
    if(checkIfDuplicateExists(subFolders) == true) {
        var onTimeLibraryCheck = false
        for (var subFolderIndex = 0; subFolderIndex < subFolders.length; subFolderIndex++) {
            if (subFolders[subFolderIndex] == "Documents") {
                subFolders[subFolderIndex] = "Shared%20Documents";
            }
            if(surFoldersArray.length == 0){
                if (subFolders[subFolderIndex] == CheckLibary) {
                    onTimeLibraryCheck = true;	
                    folderurls += subFolders[subFolderIndex] + "/";
                    if (subFolders[subFolderIndex] != null && subFolders[subFolderIndex] != "") {
                        surFoldersArray.push(SubFolderProperties(folderurls, subFolders[subFolderIndex]));
                    }
                }
            }
            else {
                if (subFolders[subFolderIndex] != CheckLibary) {
                    folderurls += subFolders[subFolderIndex] + "/";
                    if (subFolders[subFolderIndex] != null && subFolders[subFolderIndex] != "") {
                        surFoldersArray.push(SubFolderProperties(folderurls, subFolders[subFolderIndex]));
                    }
                }
            }
        }
    }
    else {
        for (var subFolderIndex = 0; subFolderIndex < subFolders.length; subFolderIndex++) {
            if (subFolders[subFolderIndex] == "Documents") {
                subFolders[subFolderIndex] = "Shared%20Documents";
            }
            if (subFolders[subFolderIndex] == CheckLibary || surFoldersArray.length > 0) {
                folderurls += subFolders[subFolderIndex] + "/";
                if (subFolders[subFolderIndex] != null && subFolders[subFolderIndex] != "") {
                    surFoldersArray.push(SubFolderProperties(folderurls, subFolders[subFolderIndex]));
                }
            }
        }
    }
    GenerateFolderNavigation(surFoldersArray);
    //GenerateBradCumNavigation(surFoldersArray);
}

function SubFolderProperties(folderUrl, folderName) {
    var folderProperties = [];
    folderProperties.folderUrl = folderUrl;
    folderProperties.folderName = folderName;
    return folderProperties;
}

function GetSubFoldersChild(GetSubFoldersChild) {
    Documentname = GetSubFoldersChild;
    GenrateHtmlGrid(SetColumnName, false, "");

}

/*
function GenerateBradCumNavigation(surFoldersArray) {
    var braCummHtml = "";
    var targetServerRaltiveUrl = "";
    for (var index = 0; index < surFoldersArray.length; index++) {
        if (index != 0) {

            var targetUrl = "javascript:GetMyDocumentsWithFilesFolder('" + surFoldersArray[index].folderName + "')";

            braCummHtml += '<li title="My DMS" class="mybradcumb"><a href="' + targetUrl + '">Root</a></li>';
        } else {
            var subfolderLengthCheck = surFoldersArray[index].folderName;
            if (subfolderLengthCheck.length > 15) {
                subfolderLengthCheck = subfolderLengthCheck.substring(0, 14) + "...";
            }

            if (subfolderLengthCheck.length > 0) {
                targetUrl = "javascript:GetSubFolders('" + surFoldersArray[index].folderUrl + "')";
                braCummHtml += '<li title="' + surFoldersArray[index].folderName + '" class="mybradcumb"><a href="' + targetUrl + '">' + subfolderLengthCheck + '</a></li>';
            }
        }
        if (index == surFoldersArray.length - 1) {
            targetServerRaltiveUrl = surFoldersArray[index].folderUrl;
            GetMyDocumentsWithFilesFolder(targetServerRaltiveUrl);
        }
    }

    var bradCumDiv = $(".breadcrumb");
    bradCumDiv.html("");
    bradCumDiv.append(braCummHtml);
    // ClickEventBradCumb();
}
*/
function GetMyDocumentsWithFilesFolder(folderUrl) {
    Documentname = folderUrl;
    GenrateHtmlGrid(SetColumnName, false, "");

}

//get check out by name on hover
function getcheckOutName(Action, ServerURL) {
    if (ServerURL.includes('/Documents/') == true) {
        ServerURL = ServerURL.replace('/Documents/', '/Shared%20Documents/');
    }
    var ServerRelativeUrlofFile = SiteUrl+ "/_api/web/GetFileByServerRelativeUrl('" + ServerURL+ "')/CheckedOutByUser/Title"
    $.ajax({
        url: ServerRelativeUrlofFile,
        type: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function(data, status, xhr) {
            Action.title = "Locked by " + data.d.Title;
        },
        error: function(xhr, status, error) {
            console.log(SelectedFileServerURL + "Not checked out");
        }
    });
}

function genrateHtmlgrid(Icon, ColumnCount, files, rowCount, Type, MethodAction) {
    if (MethodAction == "") {
        //Preparing array for Filter
        arrFilterTable.push({
            Icon: Icon,
            ColumnCount: ColumnCount,
            files: files,
            rowCount: rowCount,
            Type: Type
        });
    }
    var currentFilePermission = 'null';
    var SiteURL = DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/"));
    if (DMS_Link == '' && IsMyfavorate == true) {
        SiteURL = SiteUrl = files.SiteURL;
        if (files.ServerRelativeUrl.includes("DocumentManagementSystem") == true) {
            DMS_Type = 'My Documents';
        } else {
            DMS_Type = /[^/]*$/.exec(SiteUrl)[0];
        }
    }
    var SelectedLibrary = '';
    var CopyFileLink = '';
    var FileServerRelativeUrl = files.ServerRelativeUrl;
    if (files.ServerRelativeUrl.indexOf("Shared Documents") != -1) {
        FileServerRelativeUrl = files.ServerRelativeUrl;
        files.ServerRelativeUrl = files.ServerRelativeUrl.replace('Shared Documents', "Documents");
    } else if (files.ServerRelativeUrl.indexOf("Shared%20Documents") != -1) {
        FileServerRelativeUrl = files.ServerRelativeUrl;
        files.ServerRelativeUrl = files.ServerRelativeUrl.replace('Shared%20Documents', "Documents");
    }
    if (Documentname == "Shared%20Documents") {
        Documentname = "Documents";
    }
    if(Documentname == undefined || Documentname == null || Documentname == "null") {
        Documentname = '';
    }
    if (files.ServerRelativeUrl.includes("DocumentManagementSystem") == true || files.ServerRelativeUrl.includes("DepartmentalDMS") == true) {
        if (files.ServerRelativeUrl.includes("DocumentManagementSystem") == true) {
            SelectedLibrary = "DocumentManagementSystem";
            CopyFileLink = SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(files.ServerRelativeUrl) + "&parent=" + encodeURIComponent(files.ServerRelativeUrl.substr(0, files.ServerRelativeUrl.lastIndexOf("/") + 0));
        } else {
            SelectedLibrary = "DepartmentalDMS";
            CopyFileLink = SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(files.ServerRelativeUrl) + "&parent=" + encodeURIComponent(files.ServerRelativeUrl.substr(0, files.ServerRelativeUrl.lastIndexOf("/") + 0));
        }
    } else {
        if (Documentname.indexOf('/') != -1) {
            SelectedLibrary = Documentname.split('/')[0];
        } else {
            SelectedLibrary = Documentname;
        }
        var HostName = window.location.origin + files.ServerRelativeUrl.substr(0, files.ServerRelativeUrl.lastIndexOf("/") + 0);
        CopyFileLink = HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(files.ServerRelativeUrl) + "&parent=" + encodeURIComponent(files.ServerRelativeUrl.substr(0, files.ServerRelativeUrl.lastIndexOf("/") + 0));
    }

    var DocumentId = '';
    var FileTitle = "";
    var FileRef = "";
    var FileType = '';
    var DocType = '';
    var Isinherit = '';
    var PermissionHisHTML = '';
    if (files.ListItemAllFields != undefined) {
        if(files.ListItemAllFields.Titan_Permission != undefined) {
            PermissionHisHTML = '<div class="clsPermHis" onclick="ShowPermissionHistory(\'' + files.ServerRelativeUrl + '\', \'' + Type + '\');"><img src="../SiteAssets/MyDocuments/DMS/assets/images/user_permission.png" alt="#"></div>';
        }
        DocumentId = files.ListItemAllFields.ID;
        Isinherit = files.ListItemAllFields.HasUniqueRoleAssignments
        if (files.ListItemAllFields.Title == null || files.ListItemAllFields.Title == undefined || files.ListItemAllFields.Title == "null" || files.ListItemAllFields.Title == "--select--" || files.ListItemAllFields.Title == "-Select-") {
            files.ListItemAllFields.Title = '';
        }
        if (files.ListItemAllFields.DocumentType == null || files.ListItemAllFields.DocumentType == undefined || files.ListItemAllFields.DocumentType == "null" || files.ListItemAllFields.DocumentType == "--select--" || files.ListItemAllFields.DocumentType == "-Select-") {
            files.ListItemAllFields.DocumentType = '';
        }
        FileTitle = files.ListItemAllFields.Title ? files.ListItemAllFields.Title : "";
        FileRef = files.ListItemAllFields.DocumentNo ? files.ListItemAllFields.DocumentNo : "";
        FileType = files.ListItemAllFields.DocumentType;
        DocType = files.ListItemAllFields.DocumentType;
        if (files.ListItemAllFields.DocumentType == null || files.ListItemAllFields.DocumentType == "null" || files.ListItemAllFields.DocumentType == "-Select-" || files.ListItemAllFields.DocumentType == "--select--") {
            DocType = '';
        }
    } else { //For My favorite
        if (files.Title != null && files.Title != undefined && files.Title != "undefined ") {
            FileTitle = files.Title;
        }
        if (files.Title != null && files.Title != undefined && files.Title != "undefined ") {
            FileRef = files.DocumentNo;
        }
        var FavoriteFrom = files.FavoriteFrom;
        if (FavoriteFrom == null || FavoriteFrom == undefined || FavoriteFrom == "null") {
            FavoriteFrom = "";
        }
        DocType = '';
        if (files.ItemId != null && files.ItemId != undefined) {
            DocumentId = files.ItemId;
        }
        if(files.Titan_Permission != undefined) {
            PermissionHisHTML = '<div class="clsPermHis" onclick="ShowPermissionHistory(\'' + files.ServerRelativeUrl + '\', \'' + Type + '\');"><img src="../SiteAssets/MyDocuments/DMS/assets/images/user_permission.png" alt="#"></div>';
        }
    }
    var checkOutHTML = '';
    if (files.CheckOutType == "0") {
        checkOutHTML = '<div class="checkTypeClass" tile="" onmouseover="getcheckOutName(this, \'' + files.ServerRelativeUrl + '\');"><i class="fa fa-lock" style="font-size:24px"></i></div>';
    }
    var tr = $('<tr>' +
        '<td class="text-center">' +
        '<div class="chexbox_mg">' +PermissionHisHTML +
        '<input type="checkbox" data-FileServerRelativeUrl="' + FileServerRelativeUrl + '" data-inherit="' + Isinherit + '" class="chkFileFolder" value="' + Type + ', ' + files.ServerRelativeUrl + ', ' + DocumentId + ', ' + SiteURL + ', ' + SelectedLibrary + ', ' + files.Name + ', ' + CopyFileLink + ', ' + FileTitle + ', ' + FileRef + ', ' + FileType + ', ' + DocType + '" id="myCheckboxgd' + rowCount + '">' +
        '<label for="myCheckboxgd' + rowCount + '">' +
        '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '">' + checkOutHTML + 
        '</label>' +
        '</div>' +
        '</td>');
    for (var j = 0; j < ColumnCount.length; j++) {
        var cell = "";
        if (ColumnCount[j].ColumnName == "Reference") {
            ColumnCount[j].ColumnName = "DocumentNo"
        }
        if (ColumnCount[j].ColumnName == "Author") {
            ColumnCount[j].ColumnName = "DocumentWrittenBy";
        }
        if ("Name" == ColumnCount[j].ColumnName) {

            if (Type == "folder") {
                var encodeURILink = encodeURI(files.ServerRelativeUrl)
                var documentLink = "javascript:GetSubFolders('" + encodeURILink + "')";
                cell = $('<td class="text-left">' +
                    '<a href="' + documentLink + '">' +
                    '<span class="ml-4 dms-table-ellipsis-2">' + files[ColumnCount[j].ColumnName] + '</span>' +
                    '</a>' +
                    '</td>');

            } else {
                cell = $('<td class="text-left">' +
                    '<a href="javascript:void(0);"  data-FileServerRelativeUrl="' + FileServerRelativeUrl + '" data-inherit="' + Isinherit + '"   name="' + files.ServerRelativeUrl + '" onclick="DisplayFileProperty(this, \'' + SiteUrl + '\', \'' + DMS_Type + '\', \'' + currentFilePermission + '\');">' +
                    '<span class="ml-4 dms-table-ellipsis-2">' + files[ColumnCount[j].ColumnName] + '</span>' +
                    '</a>' +
                    '</td>');

            }
        } else if ("Title" == ColumnCount[j].ColumnName) {
            if (IsMyfavorate != true) {
                if (files.ListItemAllFields[ColumnCount[j].ColumnName] == null || files.ListItemAllFields[ColumnCount[j].ColumnName] == undefined || files.ListItemAllFields[ColumnCount[j].ColumnName] == "null" || files.ListItemAllFields[ColumnCount[j].ColumnName] == "--select--" || files.ListItemAllFields[ColumnCount[j].ColumnName] == "-Select-") {
                    files.ListItemAllFields[ColumnCount[j].ColumnName] = '';
                }

                cell = $('<td class="text-left">' +
                    '<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +

                    '</td>');
            } else {
                if (files[ColumnCount[j].ColumnName] == null || files[ColumnCount[j].ColumnName] == undefined || files[ColumnCount[j].ColumnName] == "null" || files[ColumnCount[j].ColumnName] == "--select--" || files[ColumnCount[j].ColumnName] == "-Select-") {
                    files[ColumnCount[j].ColumnName] = '';
                }
                cell = $('<td class="text-left">' +
                    '<div class="dms-table-ellipsis-2">' + files[ColumnCount[j].ColumnName] + '</div>' +

                    '</td>');
            }

        } else if ('Modified By' == ColumnCount[j].ColumnName) {
            if (IsMyfavorate != true) {
                if (Type == "folder") {
                    var ModBy = getModifiedBy(files.ListItemAllFields.EditorId);
                } else {
                    var ModBy = files.ModifiedBy.Title;
                }
                cell = $('<td class="text-left">' +
                    '<div class="dms-table-ellipsis-2">' + ModBy + '</div>' +

                    '</td>');
            } else {
                cell = $('<td class="text-left">' +
                    '<div class="dms-table-ellipsis-2"></div>' +
                    '</td>');
            }
        } else if ('File Size' == ColumnCount[j].ColumnName) {
            if (IsMyfavorate != true) {
                if (files.ListItemAllFields.FileSizeDisplay == "null" || files.ListItemAllFields.FileSizeDisplay == null || files.ListItemAllFields.FileSizeDisplay == undefined) {
                    files.ListItemAllFields.FileSizeDisplay = '';
                } else {
                    files.ListItemAllFields.FileSizeDisplay = files.ListItemAllFields.FileSizeDisplay; //+ " KB";
                }
                cell = $('<td class="text-left">' +
                    '<div class="dms-table-ellipsis-2">' + bytesToSize(files.ListItemAllFields.FileSizeDisplay) + '</div>' +
                    '</td>');
            } else {
                cell = $('<td class="text-left">' +
                    '<div class="dms-table-ellipsis-2"></div>' +
                    '</td>');
            }
        } else if ("ApprovedByOutsider" == ColumnCount[j].ColumnName || "ApprovedBy" == ColumnCount[j].ColumnName) {

            var ApprovedById = "Approval";

            if (files.ListItemAllFields == undefined && IsMyfavorate == true) {
                var ApprovedDate = files.ApprovedDate;
                var DateHTML = '';
                if (ApprovedDate != null && ApprovedDate != "null" && ApprovedDate != undefined) {
                    DateHTML = '<span class="ActionDate">' + titanForWork.convertJSONDateAMPMWithDate(ApprovedDate) + '</span>';
                } else {
                    ApprovedDate = ''
                }
                if (files.ApprovalStatus == "Approved") {
                    cell = $('<td class="text-left">' + 
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.DocId + ', \'' + files.Name + '\');" title="Approved by ' + files.ApprovedBy + '" style="color: rgb(0, 128, 0);">' +
                        '<img style="height:17px;" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt="" data-themekey="#">' +
                        DateHTML + '</div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } else if (files.ApprovalStatus == "Reject" || files.ApprovalStatus == "Rejected") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.DocId + ', \'' + files.Name + '\');" title="Rejected by ' + files.ApprovedBy + '" style="color: rgb(255, 0, 0);">' +
                        DateHTML + '<img style="height:17px;" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#"></div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } else if (files.ApprovalStatus == "Pending") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.DocId + ', \'' + files.Name + '\');" style="color: rgb(0, 128, 0);" title="Pending">' +
                        '<img style="height:17px;" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt="" data-themekey="#"></div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } else {
                    cell = $('<td>' +
                        '</td>');
                }

            } else if (files.ListItemAllFields['Approval'] != undefined) {
                var ApprovedDate = files.ListItemAllFields.ApprovedDate;
                var DateHTML = '';
                if (ApprovedDate != null && ApprovedDate != "null" && ApprovedDate != undefined) {
                    DateHTML = '<span class="ActionDate">' + titanForWork.convertJSONDateAMPMWithDate(ApprovedDate) + '</span>';
                } else {
                    ApprovedDate = ''
                }
                if (files.ListItemAllFields[ApprovedById] == "Approved") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + DocumentId + ', \'' + files.Name + '\');" title="Approved by ' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '" style="color: rgb(0, 128, 0);">' +
                        '<img style="height:17px;" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt="" data-themekey="#">' +
                        DateHTML + '</div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } else if (files.ListItemAllFields[ApprovedById] == "Reject") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + DocumentId + ', \'' + files.Name + '\');" title="Rejected by ' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '" style="color: rgb(255, 0, 0);">' +
                        '<img style="height:17px;" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#">' +
                        DateHTML + '</div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } else {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + DocumentId + ', \'' + files.Name + '\');" style="color: rgb(0, 128, 0);" title="Pending">' +
                        '<img style="height:17px;" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt="" data-themekey="#"></div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                }

            } else {
                cell = $("<td />");
            }


        } else if ((("Modified" == ColumnCount[j].ColumnName || "Modified Date" == ColumnCount[j].ColumnName) && IsMyfavorate == false)) {
            var Modified = "Modified";
            cell = $('<td class="text-left">' +
                '<div class="dms-table-ellipsis-2">' + titanForWork.convertJSONDateAMPMWithDate(files.ListItemAllFields[Modified]) + '</div>' +
                '</td>');
        } 
        else if ("Library" == ColumnCount[j].ColumnName && IsMyfavorate == true) {//for My Favorite - LibraryName
            cell = $('<td class="text-left">' +
                '<div class="dms-table-ellipsis-2">' + FavoriteFrom + '</div>' +
                '</td>');
        }
        else if (('Shared' == ColumnCount[j].ColumnName || 'Sharing' == ColumnCount[j].ColumnName)) {
            var HistoryAction = "PageLoad";
            var EveryonceHTML = '';
            if (files.ListItemAllFields == undefined && IsMyfavorate == true) {
                if (files.SharedId != null && files.SharedId != "null") {
                    if (files.SharedId == null && files.AccessLevel == "Everyone") {
                        cell = $('<td class="text-left" onclick="GetSharedHistory(\'' + files.DocId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' + EveryonceHTML +
                            '</td>');
                    } else {
                        if (files.AccessLevel == "Everyone") {
                            EveryonceHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';
                        }
                        else if(files.AccessLevel == "Revoked"){
                            EveryonceHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Everyone_Revoked.png" style="width:20px; margin:0 2px;">';
                        }
                        cell = $('<td class="text-left">' +
                            '<div class="dms-table-ellipsis-2 shardHist" onclick="GetSharedHistory(\'' + files.DocId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' +
                            '<img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + files.DocId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' + EveryonceHTML + '</div>' +
                            '</td>');
                    }
                } 
                else {
                    if (files.AccessLevel == "Everyone") {
                        EveryonceHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';
                    }
                    else if(files.AccessLevel == "Revoked"){
                        EveryonceHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Everyone_Revoked.png" style="width:20px; margin:0 2px;">';
                    }
                    if(files.SecurityLevel == "Revoked"){
                        EveryonceHTML += '<img src="../SiteAssets/MyDocuments/DMS/assets/images/no_shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + files.DocId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">';
                    }
                    cell = $('<td class="text-left">' + EveryonceHTML +
                        '</td>');
                }
                
            } 
            else if (files.ListItemAllFields.SharedId != null) {
                if (files.ListItemAllFields.SharedId == null && files.ListItemAllFields.AccessLevel == "Everyone") {
                    EveryonceHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';;
                    cell = $('<td class="text-left" onclick="GetSharedHistory(\'' + DocumentId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' + EveryonceHTML +
                        '</td>');
                } 
                
                else {
                    if (files.ListItemAllFields.AccessLevel == "Everyone") {
                        EveryonceHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';
                    }
                    else if(files.ListItemAllFields.AccessLevel == "Revoked"){
                        EveryonceHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Everyone_Revoked.png" style="width:20px; margin:0 2px;">';
                    }
                    cell = $('<td class="text-left">' +
                        '<div class="dms-table-ellipsis-2 shardHist" onclick="GetSharedHistory(\'' + DocumentId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' +
                        '<img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + DocumentId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' + EveryonceHTML + '</div>' +
                        '</td>');
                }
            } else {
                if (files.ListItemAllFields.AccessLevel == "Everyone") {
                    EveryonceHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';
                }
                else if(files.ListItemAllFields.AccessLevel == "Revoked"){
                    EveryonceHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/Everyone_Revoked.png" style="width:20px; margin:0 2px;">';
                }
                if(files.ListItemAllFields.SecurityLevel == "Revoked"){
                    EveryonceHTML += '<img src="../SiteAssets/MyDocuments/DMS/assets/images/no_shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + DocumentId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">';
                }
                cell = $('<td class="text-left">' + EveryonceHTML +
                    '</td>');
            }
        } else {
            cell = $("<td />");

            if (!IsMyfavorate) {
                if (files.ListItemAllFields[ColumnCount[j].ColumnName] != undefined) {
                    var ApprovedDate = files.ListItemAllFields.ApprovedDate;
                    var DateHTML = '';
                    if (ApprovedDate != null && ApprovedDate != "null" && ApprovedDate != undefined) {
                        DateHTML = '<span class="ActionDate">' + titanForWork.convertJSONDateAMPMWithDate(ApprovedDate) + '</span>';
                    } else {
                        ApprovedDate = ''
                    }
                    if (files.ListItemAllFields[ColumnCount[j].ColumnName] == "Approved") {
                        cell = $('<td class="text-left">' +
                            '<div class="detail-title ellipsis-2" title="Approved by ' + files.ListItemAllFields["ApprovedByOutsider"] + '" style="color: rgb(0, 128, 0);">' +
                            '<img style="height:17px;" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt="" data-themekey="#" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.ListItemAllFields.ID + ', \'' + files.Name + '\');">' +
                            DateHTML + '</div>' +
                            //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                            '</td>');
                    } else if (files.ListItemAllFields[ColumnCount[j].ColumnName] == "Rejected" || files.ListItemAllFields[ColumnCount[j].ColumnName] == "Reject") {
                        cell = $('<td class="text-left">' +
                            '<div class="detail-title ellipsis-2" title="Rejected by ' + files.ListItemAllFields["ApprovedByOutsider"] + '" style="color: rgb(255, 0, 0);">' +
                            '<img style="height:17px;" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.ListItemAllFields.ID + ', \'' + files.Name + '\');">' +
                            DateHTML + '</div>' +
                            '</td>');
                    } else if (files.ListItemAllFields[ColumnCount[j].ColumnName] == "Pending") {
                        cell = $('<td class="text-left">' +
                            '<div class="detail-title ellipsis-2" style="color: rgb(0, 128, 0);" title="Pending">' +
                            '<img style="height:17px;" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt="" data-themekey="#" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.ListItemAllFields.ID + ', \'' + files.Name + '\');">' +
                            DateHTML + '</div>' +
                            '</td>')
                    } else {

                        if (ColumnCount[j].DataType == "Date") {
                            cell.html(moment(files.ListItemAllFields[ColumnCount[j].ColumnName]).format('MMM D, YYYY'));
                        } else {

                            cell.html(files.ListItemAllFields[ColumnCount[j].ColumnName]);
                        }
                    }
                }

            } else {
                if ("Modified" == ColumnCount[j].ColumnName) {
                    cell.html(titanForWork.convertJSONDateAMPMWithDate(files[ColumnCount[j].ColumnName]));
                } else {
                    if (files[ColumnCount[j].ColumnName] != undefined) {
                        cell.html(files[ColumnCount[j].ColumnName]);
                    }

                }
            }
        }
        tr.append(cell);
    }
    //waitingDialog.hide();
    $("#groupDocumentGridtbody").append(tr);


}

var AbouttheGroupId = "";

function GetAboutgroups() {
    $("#txtaboutDescreption").val("");
    $("#txtabouttitle").val("");
    $("#LastModified").text("");
    $("#TotalFileCount").text("");
    $("#TotalFileStreamSize").text("");
    $("#TotalSize").text("");
    $("#LastModifiedFile").text("");
    $("#LastModifiedTitle").text("");
    $("#LastModifiedTitle").show();
    $("#LastModifiedFile").show();
    $("#LastModified").show();
    //$("#onlyforGroup").hide();
    
    
    

    var restQueryPersonalDMS = "?$top=1&$select=*,RestrictedContributor/Title,Author/Id,CompanyID/Id&$expand=Author,RestrictedContributor,CompanyID&$orderby=Title asc&$filter=Title eq '" + DMS_Type + "'";
    if (currentSectionType == 'Group Documents')
    {
        //$("#onlyforGroup").show();
        $.when(getItemsWithQuery("PersonalDMS_Setting", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function(PersonalDMSData) {

            $("#txtabouttitle").val(PersonalDMSData[0].Title);
            AbouttheGroupId = PersonalDMSData[0].Id;
            var newOption = $('<option>');
            newOption.attr('value', PersonalDMSData[0].LibraryType).text(PersonalDMSData[0].LibraryType);
            // Append that to the DropDownList.
            $('#ddlabout').append(newOption);

            $("#ddlabout option:contains(" + PersonalDMSData[0].LibraryType + ")").attr('selected', 'selected');
            $("#txtaboutLiraryAddress").val(PersonalDMSData[0].DMS_Link);
            $("#txtaboutDescreption").val(PersonalDMSData[0].Description);

        });
    }

    var getItemQuery = "?$select=*,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,StorageMetrics&$expand=Folders,Files,ListItemAllFields,StorageMetrics";
    var ItemQuery = "?$select=FileLeafRef,Modified,Last_x0020_Modified,Modified_x0020_By%20,Editor/Title&$expand=Editor&$orderby=Modified%20desc%20&$top=1";
    $.when(getItemsWithQueryUsersDocumentsQuery(CheckLibary, SiteUrl, getItemQuery), getItemsWithQuery(listTitle, ItemQuery, SiteUrl)).done(function(getItems, ItemQuery) {


        $("#TotalFileCount").text(getItems.StorageMetrics.TotalFileCount);
        $("#TotalFileStreamSize").text(bytesToSize(getItems.StorageMetrics.TotalFileStreamSize));
        $("#TotalSize").text(bytesToSize(getItems.StorageMetrics.TotalSize));
        if (ItemQuery.length > 0) {
            $("#LastModified").text(moment(ItemQuery[0].Modified).format('MMM D, YYYY hh:mm:s A'));
            $("#LastModifiedFile").text(ItemQuery[0].FileLeafRef);
            $("#LastModifiedTitle").text(ItemQuery[0].Editor.Title);
        } else {
            $("#LastModifiedTitle").hide();
            $("#LastModifiedFile").hide();
            $("#LastModified").hide();
        }


    });


}




$("#btnaboutthegroup").click(function() {

    if (IsmanagePermissions) {
    
        if($("#txtabouttitle").val() == "" || $("#txtaboutDescreption").val() == "")
        {
            alertbox("fill input box ", "Not null Input box");
            return false;
        }

        var ItemType = GetItemTypeForListName("PersonalDMSSetting");
        var Metadata;
        Metadata = {
            __metadata: {
                'type': ItemType
            },

            Title: $("#txtabouttitle").val(),
            Description: $("#txtaboutDescreption").val()

        };


        $.when(updateItemWithID(AbouttheGroupId, "PersonalDMS_Setting", Metadata)).done(function(valuesArray) {
            MyDocumentEnv();
            alertbox("updated successfully", "Updated");

        });
    } else {
        alertbox("You don't have permission to change", "Not permission ");
    }
});

//get MOdified by User Id
function getModifiedBy(userid) {
    var ModBy = '';
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
    var requestHeaders = {
        "accept": "application/json;odata=verbose"
    };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        async: false,
        success: function(data) {
            ModBy = data.d.Title
        },
        error: function(result) {
            console.log(JSON.stringify(result));
        }
    });
    return ModBy;
}


//method for pagination of Shared with me
function Tableagination() {
    table = $('#groupDocumentGrid').DataTable({
        'columnDefs': [{ 'orderable': false, 'targets': 0 }], // hide sort icon on header of first column
        "bPaginate": true,
        "bJQueryUI": true, // ThemeRoller-stöd
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "responsive": true,
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

    $("#groupDocumentGrid_filter").hide();
    $('#CustomSearchText').keyup(function() {
        table.search($(this).val()).draw();
    });
    $('#groupDocumentGrid').on( 'page.dt', function () {
        $('.chkFileFolder').prop("checked", "");
        arrFileFolder = [];
        $("#selectAllChk").prop("checked", "");
    });
}



$('#btnsubmitcolumn').click(function(v) {

    var DMSColumnSetting = [];
    var ControlLength = $("#tblColumnsSettings > tbody  > tr").length - 1;

    if (DMS_Link != "" && DMS_Type != "") {

        $('#tblColumnsSettings > tbody  > tr').each(function(i, row) {

            if (i < ControlLength) {
                if (i == 0) {
                    Visibility = true;
                    ColumnName = "Name";
                    ColumnType = "Default";
                    Position = 1;
                    Datatype = "Text"


                } else {

                    Visibility = $('#' + $(this).children("td:eq(0)").find(".checkbox")[1].id).is(":checked");
                    ColumnName = $(this).children("td:eq(1)").text();
                    Datatype = $(this).children("td:eq(2)").text();
                    ColumnType = $(this).children("td:eq(3)").text();
                    Position = $('#' + $(this).children("td:eq(4)").find(".numbers")[0].id).val();

                }



                DMSColumnSetting.push({
                    'Visibility': Visibility,
                    'ColumnName': ColumnName,
                    'DataType': Datatype,
                    'ColumnType': ColumnType,
                    'Position': Position,
                    'Title': HeadingTitle, //AzureUsrlist[i].department,
                    'DMS_Type': DMS_Type, //AzureUsrlist[i].companyName,
                    'DMS_Link': DMS_Link,

                })
            } else {
                //alert(i);
            }



        });
        waitingDialog.show();
        DeleteChildItems(DMS_Type);
        for (var i = 0; i < DMSColumnSetting.length; i++) {
            insertDMSColumnSetting(DMSColumnSetting[i]);
        }


        setTimeout(function() {
            GetLibarayDetails(GetLibarayRefresh[0].Obj, GetLibarayRefresh[0].Url, GetLibarayRefresh[0].Title, GetLibarayRefresh[0].Folder, GetLibarayRefresh[0].Type);
        }, 100);
        waitingDialog.hide();

    } else {
        alert("please click on the left navigation menu");
        return false;
    }



});

$("#ddlAction").change(function() {
    $('#ddlAction :selected').text();

    if ($('#ddlAction :selected').text() == "Create a new Library") {
        $("#divLibadd").hide();
        $("#divradioshow").hide();
    } else if ($('#ddlAction :selected').text() == "Linked with existing Library") {

        $("#divLibadd").show()
        $("#divradioshow").show()
        $("#txtlibaddress").val("");

    } else if ($('#ddlAction :selected').text() == "Microsoft Teams Document") {
        $("#add-new-group-dms").modal('hide');
        $('#ddlAction').prop('selectedIndex', 0);
        $('#Team').show();
        $('#Team').html("");
        $('#Team').append($('<iframe id="myIframeTeam" height="600" width="800" title="Teams"></iframe>'));
        $('#myIframeTeam').attr('src', _spPageContextInfo.webAbsoluteUrl + "/SitePages/MyTeamsLibrary.aspx?companyid=2");

        popup("Microsoft Teams Document");
    }

});

function Numberofrow() {
    // $(".checkbox").prop('checked', false);
    $("#ckbFileName").prop('checked', true);
    $("#txtCreatecolumn").val('');


    DefaultRow(SetColumnName);
    getCustomColumns();
}



//////////////////////////////////////////////// Insert Social Media Settigns //////////////////////////////////////////
function insertDMSColumnSetting(items) {
    var ColumnCreateId = '';
    var dfd = $.Deferred();
    var ListName = 'DMSColumnSetting';
    var webURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DMSColumnSetting')/items";
    var itemType = "SP.Data.DMS_x005f_Column_x005f_SettingListItem" //+ ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";

    var Metadata;
    Metadata = {
        __metadata: {
            'type': itemType
        },


        Title: items.Title,
        DMS_Link: items.DMS_Link,
        ColumnName: items.ColumnName,
        ColumnType: items.ColumnType,
        DataType: items.DataType,
        DMS_Type: items.DMS_Type,
        Position: items.Position,
        Visibility: items.Visibility


    };

    $.ajax({
        url: webURL,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        beforeSend: function() {

            $("#overlaysearch").fadeIn();

        },

        success: function(result) {
            ColumnCreateId = result.d.Id;
            dfd.resolve(true);

        },
        error: function(result) {
            ColumnCreateId = '';
            console.log(JSON.stringify(result));
            dfd.reject(result);

        }
    })
    return ColumnCreateId;
}




//////////////////////////////////////////////// Insert Social Media Settigns //////////////////////////////////////////
function insertDMS(DmsLink) {

    var companyID = titanForWork.getQueryStringParameter("CompanyId");
    // companyID=parseInt(companyID);
    var dfd = $.Deferred();
    var ListName = 'PersonalDMSSetting';
    var webURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('PersonalDMS_Setting')/items";

    var itemType = "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";

    var Metadata;
    Metadata = {
        __metadata: {
            'type': itemType
        },

        Title: $("#txtgroupTitle").val(),
        DMS_Link: DmsLink,
        LibraryType: LibraryType,
        Description: $("#txtAddDescription").val(),
        Status: 'Active',
        CompanyIDId: {
            "results": [companyID]
        },
        EmployeeNameId: {
            "results": FullControl
        },
        ContributorsId: {
            "results": Contributor
        },
        ReadersId: {
            "results": Reader
        },
        ViewersId: {
            "results": RestrictedView
        },
        RestrictedContributorId: {
            "results": RestrictedContribute
        }




    };

    $.ajax({
        url: webURL,
        type: "POST",
        async: true,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function(result) {

            MyDocumentEnv();
            dfd.resolve(true);

        },
        error: function(result) {
            console.log(JSON.stringify(result));
            dfd.reject(result);

        }
    })
    return dfd.promise();
}



// create new document library for Guest user

function createNewLibraryByRest(newLibraryName, SiteUrl) {
    var libraryName = newLibraryName;
    var Siteurl = SiteUrl;
    var listEndPoint = SiteUrl + "/_api/Web/Lists/";
    $.ajax({
        url: listEndPoint,
        method: "POST",
        async: false,
        data: JSON.stringify({
            '__metadata': {
                'type': 'SP.List'
            },
            'AllowContentTypes': true,
            'BaseTemplate': 101, //101 for document library
            'ContentTypesEnabled': true,
            'Description': 'Description',
            'OnQuickLaunch': true,
            'Title': newLibraryName
        }),
        headers: {
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function(data) {
            //alert('Library Created!');
            // Getfileds(libraryName, Siteurl);
            var DmsLink = Siteurl + "/" + libraryName + "/Forms/AllItems.aspx";
            insertDMS(DmsLink);
            BreakRoleInheritance(libraryName, Siteurl);

        },
        error: function(err) {
            if(err.responseText.includes("already exists") == true) {
                alert("Library with same name already exists. Kindly change the name.");
            }
            else {
                alert(err.responseText);
            }        
        }
    });

}
// break role inheritance
function BreakRoleInheritance(documentlibrary, SiteUrl) {
    ///breakroleinheritance(copyRoleAssignments=true, clearSubscopes=true)
    url = SiteUrl + "/_api/web/lists/getbytitle('" + documentlibrary + "')/breakroleinheritance(false)";
    $.ajax({
        url: url,
        type: 'POST',
        async: false,
        headers: {
            'accept': 'application/json;odata=nometadata',
            'X-RequestDigest': RequestDigest
        },
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });
}


// break role inheritance
function BreakRoleInheritancekeepallexistingusers(documentlibrary, SiteUrl) {
    ///
    url = SiteUrl + "/_api/web/lists/getbytitle('" + documentlibrary + "')/breakroleinheritance(copyRoleAssignments=true, clearSubscopes=true)";
    $.ajax({
        url: url,
        type: 'POST',
        async: false,
        headers: {
            'accept': 'application/json;odata=nometadata',
            'X-RequestDigest': RequestDigest
        },
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });
}


// assign the Edit role to User Members or group 
function AssignTheEditRoles(SiteUrl, documentlibrary, UserIdOrGroupID, roledefid) {
    var IsPemissionsadd = false;
    for (var i = 0; i < UserIdOrGroupID.length; i++) {

        //if(DeleteUserPermissionOnDMSLibrary(SiteUrl, documentlibrary, UserIdOrGroupID[i], Permissions,RequestDigest))
        // {
        url = SiteUrl + "/_api/web/lists/getbytitle('" + documentlibrary + "')/roleassignments/addroleassignment(principalid='" + UserIdOrGroupID[i] + "',roledefid='" + roledefid + "')";
        $.ajax({
            url: url,
            type: 'POST',
            async: false,
            headers: {
                'accept': 'application/json;odata=nometadata',
                'X-RequestDigest': RequestDigest
            },
            success: function(data) {
                console.log(data);
                IsPemissionsadd = true;

            },
            error: function(error) {
                console.log(error);
                IsPemissionsadd = false;
                alert("This operation is not allowed on an object that inherits permissions");

            }
        });

        //}else
        // {
        // i=UserIdOrGroupID.length;
        // IsPemissionsadd=false;
        //  alert("This operation is not allowed on an object that inherits permissions");
        //  return false;

        // }

    }

    return IsPemissionsadd;


}


// assign the Edit role to User Members or group 
function AssignTheEditRole(SiteUrl, documentlibrary, UserIdOrGroupID, roledefid, REQUESTDIGEST) {


    url = SiteUrl + "/_api/web/lists/getbytitle('" + documentlibrary + "')/roleassignments/addroleassignment(principalid='" + UserIdOrGroupID + "',roledefid='" + roledefid + "')";
    $.ajax({
        url: url,
        type: 'POST',
        async: false,
        headers: {
            'accept': 'application/json;odata=nometadata',
            'X-RequestDigest': REQUESTDIGEST
        },
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });


}


function DeleteUserPermissionOnDMSLibrary(SiteUrl, documentlibrary, UserIdOrGroupID, roledefid, REQUESTDIGEST) {

    url = SiteUrl + "/_api/web/lists/getbytitle('" + documentlibrary + "')/roleassignments/getbyprincipalid(" + UserIdOrGroupID + ")";
    var Retrunvalue = "";
    $.ajax({
        url: url,
        type: "POST",
        headers: {
            'accept': 'application/json;odata=nometadata',
            'X-RequestDigest': REQUESTDIGEST,
            'X-HTTP-Method': 'DELETE'
        },

        async: false,
        //   dataType: 'json',
        success: function(data) {
            console.log(UserIdOrGroupID + ' Permission has been removed.');

            Retrunvalue = true;
        },
        error: function(error) {
            console.log(JSON.stringify(error));
            Retrunvalue = false;

        }
    });

    return Retrunvalue;

}

function IsExistOrNotLibrary(documentlibrary) {

    var IsExistLibrary = "";
    url = _spPageContextInfo.webAbsoluteUrl + "/UsersDocuments/_api/web/lists/?$filter=Title eq '" + documentlibrary + "'";
    $.ajax({
        url: url,
        type: 'get',
        async: false,
        headers: {
            'accept': 'application/json;odata=nometadata',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        success: function(data) {
            if (data.value.length > 0) {
                IsExistLibrary = true;
            } else {
                IsExistLibrary = false;
            }
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });
    return IsExistLibrary;

}

function GetUserId(userName, SiteUrl) {
    var userID = "";
    var prefix = "i:0#.f|membership|";
    var siteUrl = SiteUrl;
    var accountName = prefix + userName;
    $.ajax({
        url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(accountName) + "'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function(data) {
            userID = data.d.Id;
            // alert("Received UserId" + data.d.Id);
            // alert(JSON.stringify(data));
        },
        error: function(data) {
            console.log(JSON.stringify(data));
            console.log(JSON.stringify("This user:-" + userName));

        }
    });
    return userID;
}


function GetUserIdEmail(userName, SiteUrl) {
    var userID = "";

    var siteUrl = SiteUrl;
    var accountName = userName;
    $.ajax({
        url: siteUrl + "/_api/Web/SiteUsers?$filter=Email eq '" + encodeURIComponent(accountName) + "'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function(data) {
            userID = data.d.Id;
            // alert("Received UserId" + data.d.Id);
            // alert(JSON.stringify(data));
        },
        error: function(data) {
            console.log(JSON.stringify(data));
            console.log(JSON.stringify("This user:-" + userName));

        }
    });
    return userID;
}



function GetUserNameById(Id) {
    var userName = "";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + Id + ")",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function(data) {
            userName = data.d.Title;
        },
        error: function(data) {
            userName = "";
            console.log(JSON.stringify(data));
            console.log(JSON.stringify("This user:-" + userName));

        }
    });
    return userName;
}



function GetSiteWebListId(url) {
    var SiteWebListId = "";
    $.ajax({
        url: url,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function(data) {
            SiteWebListId = data.d.Id;
            // alert("Received UserId" + data.d.Id);
            // alert(JSON.stringify(data));
        },
        error: function(data) {
            console.log(JSON.stringify(data));

        }
    });
    return SiteWebListId;
}

function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

function UrlExists(url, cb) {
    jQuery.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        async: false,
        complete: function(xhr) {
            if (typeof cb === 'function')
                cb.apply(this, [xhr.status]);
        }
    });
}


function getDocItemsWithQueryItemById(ListName, Query, SiteUrl, Id) {
    DeferredObj = $.Deferred();
    $.ajax({
        url: SiteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items(" + Id + ")/" + Query,
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function(data) {
            DeferredObj.resolve(data.d);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
}




function OpenAdvanceSearch() {

    //window.open(_spPageContextInfo.webAbsoluteUrl + "/Pages/AdvancedSearch.aspx", '_blank');
    location.href = _spPageContextInfo.webAbsoluteUrl + "/Pages/AdvancedSearch.aspx";
}


function GetOneDrive() {
    $(".headdingLinks").html("");
    $(".headdingLinks").html("Storage");

    $("#fordive").hide();
    $("#StorageDrive").show();
    waitingDialog.show();
    GetOneDriveApplicationId();
    getGraphAccessToken();
    waitingDialog.hide();

}



function getListUserEffectivePermissions(webUrl, listTitle, Isfiles, ItemId, accountName) {

    try {

        RequestDigest = $("#__REQUESTDIGEST").val();

        if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
            $.when(GetFormDigestValue(webUrl)).done(function(GetFormDigestValue) {
                RequestDigest = GetFormDigestValue
            });

        }


        var endpointUrl = "";
        if (Isfiles) {
            endpointUrl = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items('" + ItemId + "')/getusereffectivepermissions(@u)?@u='" + encodeURIComponent(accountName) + "'";
        } else {
            endpointUrl = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/getusereffectivepermissions(@u)?@u='" + encodeURIComponent(accountName) + "'";
        }
        // return $.getJSON(endpointUrl);
        getJson(endpointUrl).done(function(data) {
            IsNotpermission = true;
            parseBasePermissions(data.d.GetUserEffectivePermissions);
        })
            .fail(function(error) {
                IsNotpermission = false;
                console.log(JSON.stringify(error));
            });
    } catch (err) {
        alert(err);

    }
    return IsNotpermission;
}

function parseBasePermissions(value) {
    var permissions = new SP.BasePermissions();
    permissions.initPropertiesFromJson(value);


    IsFullControl = permissions.has(SP.PermissionKind.manageLists);
    IsContributor = permissions.has(SP.PermissionKind.addListItems);
    IsdeleteListItems = permissions.has(SP.PermissionKind.deleteListItems);
    IsmanagePermissions = permissions.has(SP.PermissionKind.managePermissions);

    var permLevels = [];
    for (var permLevelName in SP.PermissionKind.prototype) {
        if (SP.PermissionKind.hasOwnProperty(permLevelName)) {
            var permLevel = SP.PermissionKind.parse(permLevelName);
            if (permissions.has(permLevel)) {
                permLevels.push(permLevelName);
            }
        }
    }
    return permLevels;
}

//code for Folder-Navigation 
function GenerateFolderNavigation(surFoldersArray) {
    var braCummHtml = "";
    var targetServerRaltiveUrl = "";
    if (DMS_Type == "My Documents") {
        for (var index = 0; index < surFoldersArray.length; index++) {
            if (index != 0) {
                var targetUrl = "javascript:GetMyDocumentsWithFilesFolder('" + surFoldersArray[index].folderUrl + "')";
                if (index == 1) {
                    braCummHtml += '<li title="' + DMS_Type + '" class="mybradcumb first"><a href="' + targetUrl + '">' + DMS_Type + '</a></li>';
                } else {
                    var subfolderLengthCheck = surFoldersArray[index].folderName;
                    if (subfolderLengthCheck.length > 15) {
                        subfolderLengthCheck = subfolderLengthCheck.substring(0, 14) + "...";
                    }

                    if (subfolderLengthCheck.length > 0) {
                        braCummHtml += '<li title="' + surFoldersArray[index].folderName + '" class="mybradcumb first"><a href="' + targetUrl + '">' + subfolderLengthCheck + '</a></li>';
                    }
                }
                if (index == surFoldersArray.length - 1) {
                    targetServerRaltiveUrl = surFoldersArray[index].folderUrl;
                    GetMyDocumentsWithFilesFolder(targetServerRaltiveUrl);
                }
            }
        }
    } else {
        for (var index = 0; index < surFoldersArray.length; index++) {
            //if (index != 0)
            {
                var targetUrl = "javascript:GetMyDocumentsWithFilesFolder('" + surFoldersArray[index].folderUrl + "')";
                if (index == 0) {
                    braCummHtml += '<li title="Root" class="mybradcumb first"><a href="' + targetUrl + '">Root</a></li>';
                } else {
                    var subfolderLengthCheck = surFoldersArray[index].folderName;
                    if (subfolderLengthCheck.length > 15) {
                        subfolderLengthCheck = subfolderLengthCheck.substring(0, 14) + "...";
                    }

                    if (subfolderLengthCheck.length > 0) {
                        braCummHtml += '<li title="' + surFoldersArray[index].folderName + '" class="mybradcumb first"><a href="' + targetUrl + '">' + subfolderLengthCheck + '</a></li>';
                    }
                }
                if (index == surFoldersArray.length - 1) {
                    targetServerRaltiveUrl = surFoldersArray[index].folderUrl;
                    GetMyDocumentsWithFilesFolder(targetServerRaltiveUrl);
                }
            }
        }
    }

    var bradCumDiv = $("#generateBradCumbNew");
    bradCumDiv.html("");
    bradCumDiv.append(braCummHtml);
    ClickEventBradCumb();
}

//Delete all other Navigation when click on predecessor folder.
function ClickEventBradCumb() {
    $(".mybradcumb ").unbind().click(function() {
        $(this).nextAll().remove(".mybradcumb ");
        //Create Cookies for Target Folder
    });
}

//delete the files from favorite 
function DeleteMultiFavourite() {
    arrFileFolder.forEach(function(entry, index) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MyFavorites')/items(" + entry.DocumentId + ")",
            type: "POST",
            headers: {
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            success: function(data) {
                if (arrFileFolder.length == (index + 1)) {
                    //alert("All permissions are revoked.");
                    MyFavoriteDocument();
                    arrFileFolder = [];
                    waitingDialog.hide();
                };
            },
            error: function(data) {
                console.log(data.responseJSON.error);
                waitingDialog.hide();
            }
        });
    });
}


var PrivateChId = '';
function Topmenuhideshow(category) {

    if (category == "Group Documents") {
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
        if (GlobalAnchorObj.dataset.librarytype == "Customs") {
            $("#divRadioDeletelib").show();
            $("#divRadioremoveLink").hide();
        } else {
            $("#divRadioDeletelib").hide();
            $("#divRadioremoveLink").show();
        }
        if (GlobalAnchorObj.dataset.librarytype == "Team") {

            IsTeamLibary = true;
            MsTeamId = GlobalAnchorObj.dataset.msteamid;
            PrivateChId = GlobalAnchorObj.dataset.PrivateChID;
        } else {
            IsTeamLibary = false;
            MsTeamId = "";
            PrivateChId ='';
            $("#forTeams").hide()
        }
        if (IsNotpermission) {

            if (IsFullControl) {
                $("#liMembers").show();
                $("#liSettings").show();
                $("#liRemoveGroup").show();
                $("#liPermission").show();
                $(".fixed-table-footer").show();
                $("#btnaboutthegroup").show();
                $("#onlyforGroup").show();

            } else {
                $("#liMembers").hide();
                $("#liSettings").hide();
                $("#liRemoveGroup").hide();
                $("#liPermission").hide();
                $(".fixed-table-footer").hide();
            }
            if (IsdeleteListItems) {

                $("#divDelete").show();
            } else {
                $("#divDelete").hide();
            }
            if (IsContributor) {
                $("#divNew").show();
                $("#divUpload").show();
                $(".fixed-table-footer").show();
                $("#btnMultiCopy").show();
                $("#btnMultiMove").show();

            } else {
                $("#divNew").hide();
                $("#divUpload").hide();
                $("#divShare").hide();
                $("#divProperties").hide();
                $("#btnMultiCopy").hide();
                $("#btnMultiMove").hide();
                $(".fixed-table-footer").hide();

            }

            if (IsmanagePermissions) {
                $("#liMembers").show();
                $("#liSettings").show();
                $("#liRemoveGroup").show();
                $("#liPermission").show();
                //$("#onlyforGroup").show();
            } else {
                $("#liMembers").hide();
                $("#liSettings").hide();
                $("#liRemoveGroup").hide();
                $("#liPermission").hide();

            }

        } 
    }
}

//OpenApproval Histroy on 'Approved', 'Reject', 'Pending' Sign
function OpenApprovalHistry(DocId, FileName) {
    DocumentId = DocId;
    ShowAllAppHistory(FileName);
    //BindApprovalHistory();
}

//Show hide the buttons section-wise
function ActionBtnControls() {
    IsTeamLibary = false;
    arrPermission = [];
    $("#liSettings").show();
    $("#liMembers").show();
    $("#divNew").show();
    $("#divUpload").show();
    $("#liSync").show();
    $("#SyncMyDocumentfolders").hide();
    $("#syncClick").show();
    $("#divProperties").show();
    $("#LiLeavethegroup").hide();
    $("#btnAppMore").show();
    $("#divShare").show();
    $("#liAlert").hide();
    $("#AddArchiveBox").hide();
    $("#BoxAllowPermission").hide();
    $("#removeArchiveBox").hide();
    if (currentSectionType == 'MyFavorite') {
        $("#divNew").hide();
        $("#btnAdduser").hide();
        $("#divUpload").hide();
        $("#divDownload").show();
        $("#divProperties").hide();
        $("#divDelete").hide();
        $("#divShare").hide();
        $("#divFilter").show();
        $("#SharedFilterBox").hide();
        $("#divRefreshSharedTbl").hide();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").hide();
        $("#btnRemoveFavorite").show();
        $("#btnAppMore").hide();
        $(".ShareSectionAct").hide();
        $(".otherSectAct").show();
        $("#liSharedGuest").hide();
        $(".fixed-table-footer").hide();
        $("#divPendingAck").hide();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#LiAbouttheLibrary").hide();
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
    } else if (currentSectionType == 'My Documents' || currentSectionType == 'Reassigned') {
        $("#divNew").show();
        $("#btnAdduser").hide();
        $("#liMembers").hide();
        $("#liSync").show();
        $("#SyncMyDocumentfolders").show();
        $("#syncClick").hide();
        $("#liPermission").hide();
        $("#divUpload").show();
        $("#divDownload").show();
        $("#divProperties").show();
        $("#divDelete").show();
        $("#divShare").show();
        $("#divFilter").show();
        $("#SharedFilterBox").hide();
        $("#divRefreshSharedTbl").hide();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").hide();
        $("#btnRemoveFavorite").hide();
        $("#btnAppMore").show();
        $(".ShareSectionAct").hide();
        $(".otherSectAct").show();
        $("#liSharedGuest").hide();
        $(".fixed-table-footer").hide();
        $("#divPendingAck").hide();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#LiAbouttheLibrary").hide();
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
    } else if (currentSectionType == 'Department') {
        $("#divNew").show();
        $("#btnAdduser").hide();
        $("#liPermission").show();
        $("#divUpload").show();
        $("#divDownload").show();
        $("#divProperties").show();
        $("#divDelete").show();
        $("#divShare").show();
        $("#divFilter").show();
        $("#SharedFilterBox").hide();
        $("#divRefreshSharedTbl").hide();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").hide();
        $("#btnRemoveFavorite").hide();
        $("#btnAppMore").show();
        $(".ShareSectionAct").hide();
        $(".otherSectAct").show();
        $(".fixed-table-footer").show();
        $("#liSharedGuest").hide();
        $("#LiLeavethegroup").hide();
        $("#divPendingAck").hide();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#LiAbouttheLibrary").show();
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
        getUserRoles_Dept($(".headdingLinks").text());
    } else if (currentSectionType == 'SharedWithMe' || currentSectionType == 'SharedByMe' || $('ul#accordion').find('li.active').attr('id') == 'liSharedDocs') {
        $("#divNew").hide();
        $("#btnAdduser").hide();
        $("#divUpload").hide();
        $("#liPermission").show();
        $("#divDownload").show();
        $("#divProperties").hide();
        $("#divDelete").hide();
        $("#btnAdduser").hide();
        $("#divShare").hide();
        $("#divFilter").hide();
        $("#SharedFilterBox").show();
        $("#divRefreshSharedTbl").show();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").hide();
        $("#btnRemoveFavorite").hide();
        $("#btnAppMore").hide();
        $(".ShareSectionAct").show();
        $(".otherSectAct").hide();
        $("#liSharedGuest").hide();
        $(".fixed-table-footer").show();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#LiAbouttheLibrary").hide();
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
        $("#removeArchiveBox").hide();
        if (currentSectionType == 'SharedWithMe') {
            $("#divPendingAck").show();
            $("#AddArchiveBox").show();
        } 
        else if(currentSectionType == 'Archive'){ //Archiving will work only in Shared With Me section
            $("#AddArchiveBox").hide();
            $("#removeArchiveBox").show();
        }
        else { //Shared By Me
            $("#AddArchiveBox").hide();
            $("#divPendingAck").hide();
            $("#divRevokeSharedTbl").show();
        }
    } else if (currentSectionType == 'ApprovalInbox' || currentSectionType == 'ApprovalOutbox') {
        $("#divNew").hide();
        $("#divUpload").hide();
        $("#btnAdduser").hide();
        $("#divDownload").show();
        $("#divProperties").hide();
        $("#divDelete").hide();
        $("#divShare").hide();
        $("#divFilter").hide();
        $("#SharedFilterBox").hide();
        $("#divRefreshSharedTbl").hide();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").show();
        $("#btnRemoveFavorite").hide();
        $("#btnAppMore").hide();
        $(".ShareSectionAct").hide();
        $(".otherSectAct").show();
        $(".fixed-table-footer").show();
        $("#liSharedGuest").hide();
        $("#divPendingAck").hide();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#LiAbouttheLibrary").hide();
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
    } else if (currentSectionType == 'Group Documents') {
        $("#divNew").show();
        $("#btnAdduser").show();
        $("#divUpload").show();
        $("#liPermission").show();
        $("#divDownload").show();
        $("#divProperties").show();
        $("#divDelete").show();
        $("#divShare").show();
        $("#divFilter").show();
        $("#SharedFilterBox").hide();
        $("#divRefreshSharedTbl").hide();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").hide();
        $("#btnRemoveFavorite").hide();
        $("#btnAppMore").show();
        $(".ShareSectionAct").hide();
        $(".otherSectAct").show();
        $(".fixed-table-footer").show();
        $("#liSharedGuest").hide();
        $("#divPendingAck").hide();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#LiAbouttheLibrary").show();
        $("#onlyforGroup").show();
        $("#LiLeavethegroup").show();
        $("#liRemoveGroup").show();
        $(".fixed-table-footer").show();
        $("#btnaboutthegroup").show();
        //Topmenuhideshow('Group Documents');
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
        if (GlobalAnchorObj.dataset.librarytype == "Customs") {
            $("#divRadioDeletelib").show();
            $("#divRadioremoveLink").hide();
        } else {
            $("#divRadioDeletelib").hide();
            $("#divRadioremoveLink").show();
        }
        if (GlobalAnchorObj.dataset.librarytype == "Team") {
            IsTeamLibary = true;
            MsTeamId = GlobalAnchorObj.dataset.msteamid;
            PrivateChId = GlobalAnchorObj.dataset.PrivateChID;
        } else {
            IsTeamLibary = false;
            MsTeamId = "";
            PrivateChId ='';
            $("#forTeams").hide()
        }
        getUserRoles_Group();    
    } 
    else if (currentSectionType == 'ProjectDocuments') {
        $("#divNew").show();
        $("#btnAdduser").hide();
        $("#divUpload").show();
        $("#liPermission").show();
        $("#divDownload").show();
        $("#divProperties").show();
        $("#divDelete").show();
        $("#divShare").show();
        $("#divFilter").show();
        $("#SharedFilterBox").hide();
        $("#divRefreshSharedTbl").hide();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").hide();
        $("#btnRemoveFavorite").hide();
        $("#btnAppMore").show();
        $(".ShareSectionAct").hide();
        $(".otherSectAct").show();
        $(".fixed-table-footer").show();
        $("#liSharedGuest").hide();
        $("#divPendingAck").hide();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#LiAbouttheLibrary").show();
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
        getUserRoles_Project($(".headdingLinks").text());
    } else if (currentSectionType == "GuestDocuments") {
        $("#divNew").show();
        $("#btnAdduser").hide();
        $("#divUpload").show();
        $("#liPermission").show();
        $("#divDownload").show();
        $("#divProperties").show();
        $("#divDelete").show();
        $("#divShare").show();
        $("#divFilter").show();
        $("#SharedFilterBox").hide();
        $("#divRefreshSharedTbl").hide();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").hide();
        $("#btnRemoveFavorite").hide();
        $("#btnAppMore").show();
        $(".ShareSectionAct").hide();
        $(".otherSectAct").show();
        $(".fixed-table-footer").show();
        $("#liSharedGuest").show();
        $("#divPendingAck").hide();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#LiAbouttheLibrary").show();
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
        getUserRoles_Client($(".headdingLinks").text());
    } else if ($('ul#accordion').find('li.active').attr('id') == "liStorage") {
        $("#divNew").hide();
        $("#btnAdduser").hide();
        $("#divUpload").hide();
        $("#divDownload").hide();
        $("#divProperties").hide();
        $("#divDelete").hide();
        $("#divShare").hide();
        $("#divFilter").hide();
        $("#SharedFilterBox").hide();
        $("#divRefreshSharedTbl").hide();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").hide();
        $("#btnRemoveFavorite").hide();
        $("#btnAppMore").hide();
        $(".ShareSectionAct").hide();
        $(".otherSectAct").show();
        $("#liSharedGuest").hide();
        $("#divPendingAck").hide();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#LiAbouttheLibrary").hide();
        $("#btnaboutthegroup").hide();
        $("#onlyforGroup").hide();
    }
}

var folderRelativeUrl = "";
var Filepath = ""
var IsStopInheritancePermissions = false;
var radioMembers = "";
var TeamMembergroupId;
var DocFileFolderId = "";


$("input:radio[name=radioMembers]").change(function() {
    radioMembers = $(this).val();
    if (radioMembers == "Selective") {
        //Do nothing
    } else {
        $("#AddMemberBox").hide();
        $("#Adduser").hide();
        $.when(GetAllSiteGroups(SiteUrl)).done(function(GetAllSiteGrou) {

            for (var i = 0; i < GetAllSiteGrou.length; i++) {
                
                var Ismember = GetAllSiteGrou[i]["Title"].search("Members")

                if (Ismember != -1) {

                    TeamMembergroupId = GetAllSiteGrou[i].Id;

                    i = GetAllSiteGrou.length;

                }

            }

        });
    }

});

function getFolderspermision(IsNotMoreAction) {
    $("#chkStopInheritancePermissions").hide();
    $("#btnaddpermision").hide();
    $("#divPermissionsFile").html('');
    if (!IsNotMoreAction) {
        if ($('input[class="chkFileFolder"]:checked').length == 1) {
            folderRelativeUrl = $('input[class="chkFileFolder"]:checked')[0].defaultValue.split(',')[3];
            Filepath = $('input[class="chkFileFolder"]:checked')[0].dataset.fileserverrelativeurl;
            IsStopInheritancePermissions = Boolean.parse($('input[class="chkFileFolder"]:checked')[0].dataset.inherit);

        } else {

            $("#divPermissionsFile").html("Kindly select any one folder/files.");
            return false;
        }
    }
    else {
        //Do nothing
    }
    if (Filepath != "") {
        var webURL = SiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + Filepath + "')?$expand=ListItemAllFields,ListItemAllFields.HasUniqueRoleAssignments,ListItemAllFields/RoleAssignments/Member,ListItemAllFields/RoleAssignments/RoleDefinitionBindings&$select=ListItemAllFields/RoleAssignments,ListItemAllFields.HasUniqueRoleAssignments,ListItemAllFields/Id,ListItemAllFields/Titan_Permission" //?$expand=ListItemAllFields,Author,ListItemAllFields/RoleAssignments/Member,ListItemAllFields/RoleAssignments/RoleDefinitionBindings,ListItemAllFields/RoleAssignments/Member/Users,ListItemAllFields/RoleAssignments/Member/Title,Files/Author,Editor&$select= LockedByUser,CheckedOutByUser,DocumentWrittenBy,ListItemAllFields/RoleAssignments,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentType,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," +

        $.ajax({
            url: webURL,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            async: false,
            success: function (data) {
                //Bind File in Iframe
                var FileValue = data.d.ListItemAllFields;
                DocFileFolderId = FileValue.Id;
                if (FileValue.Titan_Permission != null) {
                    getAddHistory = FileValue.Titan_Permission
                }
                if (!IsStopInheritancePermissions) {
                    $(".InheritanceLabel").text('*Default permission is applied.');
                    $("#chkStopInheritancePermissions").hide();
                    $("#btnaddpermision").show();

                } else {
                    $("#btnaddpermision").show();
                    $(".InheritanceLabel").text('*Special permission is applied.');
                    $("#chkStopInheritancePermissions").hide();
                }

                if (IsTeamLibary) {
                    $("#forTeams").show();
                } else {
                    $("#forTeams").hide();
                }

                PermissionsControlOffolder(FileValue, IsStopInheritancePermissions);

            },
            eror: function (data) {
                alert(data)
            }
        }).fail(function (error) {
            $("#divPermissionsFile").html(error.responseJSON.error.message.value);
            return false;
        });
    } else { }

}

//Bind Permission control Popup
function PermissionsControlOffolder(data, Isinherit) {
    var Divrow = "";
    var Acsesscontrol = "Restricted"
    FilePermissions = "";
    for (var i = 0; i < data.RoleAssignments.results.length; i++) {
        if (data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name == 'System.LimitedView') {
            data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name = 'Restricted View';
        }
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

        } else if (data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name == "Contribute" || data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name == "Edit") {
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
        if (data.RoleAssignments.results[i].Member.Email == null || data.RoleAssignments.results[i].Member.Email == "undefined" || data.RoleAssignments.results[i].Member.Email == "null") {
            data.RoleAssignments.results[i].Member.Email = '';
        }

        if (data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name != "Limited Access") {

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
                '<button type="button" class="close close-round removelistperm" data-inherit="' + Isinherit + '"  id="' + data.RoleAssignments.results[i].PrincipalId + '" data-Title="' + data.RoleAssignments.results[i].Member.Title + '" ><span class="close-icon">×</span></button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-4">' +
                '<div class="control_img">' +
                '<h3 title="' + data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Description + '">' + data.RoleAssignments.results[i].RoleDefinitionBindings.results[0].Name + '</h3>' +
                '<img src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/' + Acsesscontrol + '.png" alt="">' +
                '</div>' +
                '</div>' +

                '</div>';

        }
    }
    $("#divPermissionsFile").html("");
    $("#divPermissionsFile").append(Divrow);
    // NotifyEmail(data)

}


function breakRoleInheritanceOfFolder(SiteURL, folderRelativeUrl, REQUESTDIGEST, IsModal) {
    // begin work to call across network
    var requestUri = SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + folderRelativeUrl + "')/ListItemAllFields/breakroleinheritance(copyRoleAssignments=true, clearSubscopes=true)";

    // execute AJAX request
    $.ajax({
        url: requestUri,
        type: "POST",
        async: false,
        contentType: "application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": REQUESTDIGEST
        },
        success: function(data) {
            if(IsModal == true) {
                alert("Successfully completed");
            }
            IsStopInheritancePermissions = true;
        },
        error: function() {
            alert("Failed to get details");
        }
    });
}


function HasUniqueRoleAssignments(SiteURL, ListName) {
    // begin work to call across network
    var requestUri = SiteURL + "/_api/Web/lists?$select=Title,HasUniqueRoleAssignments,LastItemModifiedDate,Id,RootFolder/ServerRelativeUrl&$expand=RootFolder&$filter=Hidden eq false and Title eq '" + ListName + "' ";
    var Isinharited = false;
    // execute AJAX request
    $.ajax({
        url: requestUri,
        type: "GET",
        async: false,
        contentType: "application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose"
            //"X-RequestDigest": REQUESTDIGEST
        },
        success: function(data) {
            if (data.d.results.length > 0) {
                Isinharited = data.d.results[0].HasUniqueRoleAssignments
            }
        },
        error: function() {
            alert("Failed to get details");
        }
    });

    return Isinharited;
}




function RemoverUsermemberOfFolder(SiteURL, folderRelativeUrl, REQUESTDIGEST, roleid, IsAlert) {
    // begin work to call across network
    var requestUri = SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + folderRelativeUrl + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + roleid + ")";

    // execute AJAX request
    $.ajax({
        url: requestUri,
        type: "POST",
        async: false,
        contentType: "application/json;odata=verbose",
        headers: {

            "X-RequestDigest": REQUESTDIGEST,
            'X-HTTP-Method': 'DELETE'
        },
        success: function(data) {
            if(IsAlert == true) {
                alertbox("Successfully completed", "Revoke Permission");
            }
        },
        error: function(err) {
            console.log("Failed to get details");
        }
    });
}



// assign the Edit role to User Members or group 
function AssignTheEditRoleOfFolder(SiteUrl, folderRelativeUrl, UserIdOrGroupID, roledefid, REQUESTDIGEST) {


    url = SiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderRelativeUrl + "')/ListItemAllFields/roleassignments/addroleassignment(principalid=" + UserIdOrGroupID + ",roledefid=" + roledefid + ")";
    //url = SiteUrl + "/_api/web/GetFileByServerRelativeUrl('" + folderRelativeUrl + "')/ListItemAllFields/roleassignments/addroleassignment(principalid='" + UserIdOrGroupID + "',roledefid='" + roledefid + "')";
    $.ajax({
        url: url,
        type: 'POST',
        async: false,
        headers: {
            'accept': 'application/json;odata=nometadata',
            'X-RequestDigest': REQUESTDIGEST
        },
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });


}


/*Remove list permission*/
$(document).on('click', '.removelistperm', function() {
    var roleid = parseInt(this.id);
    var inherit = $(this).data('inherit');
    $(this).data('title');
    var IsbreakRole = false;
    Adhistory += "<br>" + moment().format('MMM D, YYYY hh:mm:s A');
    Adhistory += " , " + "Revoke:";
    Adhistory += " " + $(this).data('title');



    RequestDigest = $("#__REQUESTDIGEST").val();

    if (SiteUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteUrl)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });

    }


    var msg = ""
    if (!inherit) {
        msg = "Are you sure to remove this user ? Recommended to stop inherited permission for proper effect.";
        IsbreakRole = true;
    } else {
        msg = "Are you sure to remove this user ?";
        IsbreakRole = false;
    }


    confirmation(msg, "Revoke Permission").then(function(answer) {
        var ansbool = Boolean.parse(answer.toString());
        if (ansbool) {
            var PermissionHistory = false;
            if (currentSectionType == 'Department' || currentSectionType == 'Group Documents' || currentSectionType == 'ProjectDocuments' || currentSectionType == 'GuestDocuments') {
                if (Documentname.includes('/') == true) {
                    var LibraryName = Documentname.split('/')[0];
                }
                else {
                    var LibraryName = Documentname;
                }
		
                var Metadata;
                if (LibraryName.search(/\bDocuments\b/) >= 0 || LibraryName.search(/\bShared%20Documents\b/) >= 0 || LibraryName.search(/\bShared Documents\b/) >= 0) {
                    var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
                }
                else {
                    var ItemType = GetItemTypeForLibraryName(LibraryName);
                }                
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Titan_Permission: Adhistory
                };

                $.when(updateItemWithIDTeam(DocFileFolderId, listTitle, Metadata, SiteUrl)).done(function(data) {
                	Adhistory = '';
                    PermissionHistory = true;
                    var tempDocName = Documentname;
	                if (Documentname.search(/\bDocuments\b/) >= 0) {
	                    tempDocName = "Shared%20Documents";
	                }
	                GetMyDocumentsWithFilesFolder(tempDocName);
                });
            }
            if(PermissionHistory == true) {
                if (IsbreakRole) {
                    breakRoleInheritanceOfFolder(SiteUrl, Filepath, RequestDigest, true);
                }
                RemoverUsermemberOfFolder(SiteUrl, Filepath, RequestDigest, roleid, true);
                Adhistory = "";
                getFolderspermision(true);
                $("#PermHisParent").show();
            }
            else {
                Adhistory = "";
                return false
            }

        }
    });




    // });

});

/* calling the function to  remove the group from site collection*/

/*$(document).on('click', '.remove_group', function() {
    var groupid = $(this).data('groupid');
    var groupname = $(this).data('groupname');
    // var siteUrl = checkvalues();
    var msg = "Are you sure to remove this member ?";
    confirmation(msg).then(function(answer) {
        var ansbool = Boolean.parse(answer.toString());
        alert(ansbool)
        if (ansbool) {

        } else {}
    });
});*/

//to delete the member permission
function DeleteMemberPermission(UserName, UserEmail, UserId) {
    var msg = "Are you sure to remove "+UserName+" ?";
    $.when(GetFormDigestValue(SiteUrl)).done(function(GetFormDigestValue) {
        RequestDigest = GetFormDigestValue
    });
    var LibraryName = CheckLibary;
    confirmation(msg, "Revoke Permission").then(function(answer) {
        var ansbool = Boolean.parse(answer.toString());
        if (ansbool) {
            if(LibraryName == "Shared Documents" || LibraryName == "Shared%20Documents") {
                LibraryName = "Documents";
            }
			
            if(UserId != undefined && UserId != "undefined") {
                RemoveFromDMSSetting(UserEmail, SiteUrl, LibraryName, UserId, '', RequestDigest); //First remove users from 'PersonalDMS_Settings'
            }
            else {
                alert(UserName + " user's Id is not defined. Kindly contact administrator.");
                return false;
            }
        }
    });
}

//while removing member, remove from Personal_DMSSetting list also
function RemoveFromDMSSetting(DeletedUserEmail, SiteUrl, LibraryName, UserId, RoleId, RequestDigest) {
    var Query = "?$select=RestrictedContributor/Title,RestrictedContributor/EMail,Contributors/UserName,Contributors/EMail,Readers/EMail,Viewers/EMail,Contributors/Id,Readers/Id,Viewers/Id,Contributors/Title,Readers/Title,Viewers/Title,ID,EmployeeName/EMail,EmployeeName/Title,EmployeeName/Id,RestrictedView/EMail,RestrictedView/Title,RestrictedView/Id&$top=1&$expand=Contributors,Viewers,Readers,RestrictedContributor,EmployeeName,RestrictedView&$filter=Title eq '" + DMS_Type + "'";
    $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        Contributors = [];
        RestrictedContributor = [];
        RestrictedView = [];
        Readers = [];
        Viewers = [];
        EmployeeName = [];
        if (valuesArray[0].EmployeeName.results != undefined) {
            EmployeeName = valuesArray[0].EmployeeName.results.filter(function (obj) {
                return obj.EMail.toLowerCase() !== DeletedUserEmail.toLowerCase();
            });
        }
        if (valuesArray[0].Contributors.results != undefined) {
            Contributors = valuesArray[0].Contributors.results.filter(function (obj) {
                return obj.EMail.toLowerCase() !== DeletedUserEmail.toLowerCase();
            });
        }
        if (valuesArray[0].Viewers.results != undefined) {
            Viewers = valuesArray[0].Viewers.results.filter(function (obj) {
                return obj.EMail.toLowerCase() !== DeletedUserEmail.toLowerCase();
            });
        }
        if (valuesArray[0].Readers.results != undefined) {
            Readers = valuesArray[0].Readers.results.filter(function (obj) {
                return obj.EMail.toLowerCase() !== DeletedUserEmail.toLowerCase();
            });
        }
        if (valuesArray[0].RestrictedContributor.results != undefined) {
            RestrictedContributor = valuesArray[0].RestrictedContributor.results.filter(function (obj) {
                return obj.EMail.toLowerCase() !== DeletedUserEmail.toLowerCase();
            });
        }
        if (valuesArray[0].RestrictedView.results != undefined) {
            RestrictedView = valuesArray[0].RestrictedView.results.filter(function (obj) {
                return obj.EMail.toLowerCase() !== DeletedUserEmail.toLowerCase();
            });
        }
        var arrEmplIds = [];
        if (EmployeeName.length > 0) { //EmployeeName
            for (var emp = 0; emp < EmployeeName.length; emp++) {
                arrEmplIds.push(EmployeeName[emp].Id);
            }
        }
        var arrContriIds = [];
        if (Contributors.length > 0) { //Contributors
            for (var emp = 0; emp < Contributors.length; emp++) {
                arrContriIds.push(Contributors[emp].Id);
            }
        }
        var arrViewIds = [];
        if (Viewers.length > 0) { //Viewers
            for (var emp = 0; emp < Viewers.length; emp++) {
                arrViewIds.push(Viewers[emp].Id);
            }
        }
        var arrReadersIds = [];
        if (Readers.length > 0) { //EmployeeName
            for (var emp = 0; emp < Readers.length; emp++) {
                arrReadersIds.push(Readers[emp].Id);
            }
        }
        var arrResContriIds = [];
        if (RestrictedContributor.length > 0) { //EmployeeName
            for (var emp = 0; emp < RestrictedContributor.length; emp++) {
                arrResContriIds.push(RestrictedContributor[emp].Id);
            }
        }
        var arrResViewIds = [];
        if (RestrictedView.length > 0) { //EmployeeName
            for (var emp = 0; emp < RestrictedView.length; emp++) {
                arrResViewIds.push(RestrictedView[emp].Id);
            }
        }
        var Metadata;
        var ItemType = GetItemTypeForListName("PersonalDMSSetting");
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            EmployeeNameId: {
                "results": arrEmplIds
            },
            ContributorsId: {
                "results": arrContriIds
            },
            ViewersId: {
                "results": arrViewIds
            },
            ReadersId: {
                "results": arrReadersIds
            },
            RestrictedContributorId: {
                "results": arrResContriIds
            },
            RestrictedViewId: {
                "results": arrResViewIds
            }
        };
        $.when(updateItemWithID(valuesArray[0].ID, "PersonalDMS_Setting", Metadata)).done(function (valuesArray) {
            Retrunvalue = DeleteUserPermissionOnDMSLibrary(SiteUrl, LibraryName, UserId, '', RequestDigest);
            if(Retrunvalue == true) {
                GetListusers();
            }
        });
    });
}

/* start function to call  dialog for confirmation*/
function confirmation(question, Title) {
    var defer = $.Deferred();
    $('<div></div>')
        .html(question)
        .dialog({
            autoOpen: true,
            modal: true,
            title: Title,
            buttons: {
                "Yes": function() {
                    defer.resolve("true"); /*this text 'true' can be anything. But for this usage, it should be true or false.*/
                    $(this).dialog("close");
                },
                "No": function() {
                    defer.resolve("false"); /*this text 'false' can be anything. But for this usage, it should be true or false.*/
                    $(this).dialog("close");
                }
            },
            close: function() {
                $(this).remove();
            }
        });

    $(".ui-dialog").addClass("ui-dialog_costom");
    $(".ui-widget-overlay").addClass("ui-dialog_cost");

    return defer.promise();
}


/*start function for an alert box in a nice dialog*/
function alertbox(message, Title) {
    $('<div></div>')
        .html(message)
        .dialog({
            autoOpen: true,
            modal: true,
            title: Title,
            buttons: {
                "Ok": function() {
                    $(this).dialog("close");
                }

            },
            close: function() {
                $(this).remove();
            }
        });
    $(".ui-dialog").addClass("ui-dialog_costom");
    $(".ui-widget-overlay").addClass("ui-dialog_cost");

}


/*start json call function*/

function getJson(url) {
    return $.ajax({
        url: url,
        type: "GET",
        async: false,
        contentType: "application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest
        }
    });
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    //bytes=parseInt(bytes);
    if (bytes == 0) return '';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
/*popup function*/

function popup(popuptitle) {
    $('#Team').dialog({
        width: 850,
        height: 600,
        modal: true,
        class: 'popup',
        title: popuptitle,
        overlay: {
            backgroundColor: "#000",
            opacity: 0.9
        }
    });
    $(".ui-dialog").addClass("ui-dialog_costom");
    $(".ui-widget-overlay").addClass("ui-dialog_cost");
    
    
    $(".ui-dialog-titlebar-close").empty().append('<span class="ui-button-icon ui-icon ui-icon-closethick"></span><span class="ui-button-icon-space"> </span>');
    $(".ui-icon-closethick").click(function() {
        MyDocumentEnv();
    });	
}

function GetTeamMember(TeamId, email, token) {

    var url = 'https://graph.microsoft.com/v1.0/groups/' + TeamId + '/drive/items/5/permissions';
    $.ajax({
        url: url,
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        },
        async: false,
        success: function(data) {

        },
        eror: function(data) {
            console.log('error');
        }
    });

}


function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
}

//Share the selected file
function ShareRestricted(sharingLink, typeOfFileFolder, UserArray, Permission) {
    var UsersId = [];
    var userRole = 3; //FullControl
    if (Permission == "Reader" || Permission == "Read") {
        userRole = 1;
    }
    else if(Permission == "Contributor" || Permission == "Contribute" || Permission == "Edit"){
        userRole = 9;//Edit
    }
    else if (Permission == "Restricted View") {
        userRole = 7;
    }
    if(sharingLink.includes('Shared Documents') == true || sharingLink.includes('Shared%20Documents') == true){
        //Do Nothing  
    }
    else {
        if (sharingLink.search(/\bDocuments\b/) >= 0) {
            sharingLink = sharingLink.replace('Documents', 'Shared%20Documents');
        }
    }
    var userRoleAssignments = createJSONMetadata(UserArray, userRole);
    var restSource = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.Sharing.DocumentSharingManager.UpdateDocumentSharingInfo";
    $.ajax(
    {
        'url': restSource,
        'method': 'POST',
        async: false,
        'data': JSON.stringify({
            'resourceAddress': document.location.origin + sharingLink,
            'userRoleAssignments': userRoleAssignments,
            'validateExistingPermissions': false,
            'additiveMode': false,
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
            console.log("Assigned");
        },
        'error': function (err) {
            if (err.responseText.includes("The caller has no permissions to grant permission") == true) {
                alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
                return false;
            }
            else {
                alert(err.responseText);
                return false;
            }
        }
    });
}

//Add Permissions to file and folder
function AddPermissionsToFileFolder() {
    var userListId = [];
    var userListIdfilterd = [];
    Adhistory += "<br>" + moment().format('MMM D, YYYY hh:mm:s A');
    Adhistory += " " + $("#ddlpermission").children("option:selected").text();
    var arrAllGroups = [];
    arrAllGroups = GetAllSiteGroups(SiteUrl);
    if ($("#ddlGroupUserRoles").val() == "Owner") {
        for (var i = 0; i < arrAllGroups.length; i++) {
            var IsOwners = arrAllGroups[i]["Title"].search("Owners")
            if (IsOwners != -1) {
                TeamMembergroupId = arrAllGroups[i].Id;
                break;
            }
        }
    }
    else if ($("#ddlGroupUserRoles").val() == "Member") {
        for (var i = 0; i < arrAllGroups.length; i++) {
            var IsMembers = arrAllGroups[i]["Title"].search("Members")
            if (IsMembers != -1) {
                TeamMembergroupId = arrAllGroups[i].Id;
                break;
            }
        }
    }
    else {//Guest
        for (var i = 0; i < arrAllGroups.length; i++) {
            var IsVisitors = arrAllGroups[i]["Title"].search("Visitors")
            if (IsVisitors != -1) {
                TeamMembergroupId = arrAllGroups[i].Id;
                break;
            }
        }
    }
    if ($('#chkPermissionSelectAll').prop("checked") == true) {
        userListId.push(TeamMembergroupId);
        Adhistory += " : ";
        Adhistory += "All " + $("#ddlGroupUserRoles").children("option:selected").text();
    }
    else {
        for (var i = 0; i < arrUserAssignPermission.length; i++) {
            if (i == 0) {
                Adhistory += " : ";
                Adhistory += arrUserAssignPermission[i].UserName;
            } else {
                Adhistory += ",";
                Adhistory += arrUserAssignPermission[i].UserName;
            }
            userListId.push(parseInt(arrUserAssignPermission[i].UserId));
        }
    }
    if (userListId.length > 0) {
        var PermissionHistory = false;
        if (((currentSectionType == 'Department' || currentSectionType == 'Group Documents' || currentSectionType == 'ProjectDocuments' || currentSectionType == 'GuestDocuments') && (DocFileFolderId != "" && DocFileFolderId != null && DocFileFolderId != "null"))) {
            Adhistory += "  " + getAddHistory;
            if (Documentname.includes('/') == true) {
                var LibraryName = Documentname.split('/')[0];
            }
            else {
                var LibraryName = Documentname;
            }

            var Metadata;
            if (LibraryName.search(/\bDocuments\b/) >= 0 || LibraryName.search(/\bShared%20Documents\b/) >= 0 || LibraryName.search(/\bShared Documents\b/) >= 0) {
                var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
            }
            else {
                var ItemType = GetItemTypeForLibraryName(LibraryName);
            }

            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Titan_Permission: Adhistory
            };
            //Adding History to Titan_Permission column in case of Permissions
            $.when(updateItemWithIDTeam(DocFileFolderId, listTitle, Metadata, SiteUrl)).done(function (data) {
            	Adhistory = '';
                PermissionHistory = true;
                $("#PermHisParent").show();
				var tempDocName = Documentname;
                if (Documentname.search(/\bDocuments\b/) >= 0) {
                    tempDocName = "Shared%20Documents";
                }
                GetMyDocumentsWithFilesFolder(tempDocName);
            });
        }
        else {
            PermissionHistory = true;
        }
        if (PermissionHistory == false) { //If Permission History is not created stop the flow.
            return false;
        }
        $.when(GetFormDigestValue(SiteUrl)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });

        var Permissions = $("#ddlpermission").children("option:selected").val();
        arrEmails = [];
        if ($('#chkPermissionSelectAll').prop("checked") == true && currentSectionType == 'Group Documents') {
            //Remove already assigned users who is in the group
            var RemoveLIb = CheckLibary;
            if (CheckLibary == "Shared%20Documents" || CheckLibary == "Shared Documents") {
                RemoveLIb = "Documents";
            }
            RemoveAddedGroupMemb(SiteUrl, RemoveLIb, Permissions, RequestDigest, Filepath);
            RemoverUsermemberOfFolder(SiteUrl, Filepath, RequestDigest, TeamMembergroupId, false);
            AssignTheEditRoleOfFolder(SiteUrl, Filepath, TeamMembergroupId, Permissions, RequestDigest);
        }
        else {
            for (var emp = 0; emp < arrUserAssignPermission.length; emp++) {
                arrEmails.push(arrUserAssignPermission[emp].UserEmail);
            }
            RemoverUsermemberOfFolder(SiteUrl, Filepath, RequestDigest, TeamMembergroupId, false);
            ShareRestricted(Filepath, "File", arrEmails, $("#ddlpermission").children("option:selected").text());
        }
        $("#adduserpopup1").modal('hide');
        Isfolderpermision = false;
        Adhistory = "";
        getFolderspermision(true);
    }
    else {
        alert("Kindly select any member first.");
    }
}

//Add Members to LIbrary
function AddMemberToLibrary() {
    var arrRestrictedUser = [];
    var allUserInfo = [];
    peoplePickerDiv = $("[id$='Adduser_TopSpan']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
    var allUserInfo = peoplePicker.GetAllUserInfo();
    var userListId = [];
    var userListIdfilterd = [];
    Adhistory += "<br>" + moment().format('MMM D, YYYY hh:mm:s A');
    Adhistory += " " + $("#ddlpermission").children("option:selected").text();
    for (var i = 0; i < allUserInfo.length; i++) {
        arrRestrictedUser.push({
            UserEmail: allUserInfo[i].EntityData.Email,
            UserName: allUserInfo[i].DisplayText
        });
        var SetId = GetUserId(allUserInfo[i].EntityData.Email, SiteUrl);
        if (SetId == "") {
            arrRestrictedUser.pop();
            arrRestrictedUser.push({
                UserEmail: allUserInfo[i].Key.split('|')[2],
                UserName: allUserInfo[i].DisplayText
            });
            SetId = GetUserId(allUserInfo[i].Key.split('|')[2], SiteUrl);
        }
        if (i == 0) {
            Adhistory += " : ";
            Adhistory += allUserInfo[i].DisplayText;
        } else {
            Adhistory += ",";
            Adhistory += allUserInfo[i].DisplayText;
        }
        userListId.push(SetId);
    }
    if (radioMembers == "All Members") {
        userListId.push(TeamMembergroupId)
    }
    if (userListId.length > 0) {
        //Add Permission History
        var PermissionHistory = false;
        if (((currentSectionType == 'Department' || currentSectionType == 'Group Documents' || currentSectionType == 'ProjectDocuments' || currentSectionType == 'GuestDocuments') && (DocFileFolderId != "" && DocFileFolderId != null && DocFileFolderId != "null"))) {
            Adhistory += "  " + getAddHistory;
            if (Documentname.includes('/') == true) {
                var LibraryName = Documentname.split('/')[0];
            }
            else {
                var LibraryName = Documentname;
            }

            var Metadata;
            if (LibraryName.search(/\bDocuments\b/) >= 0 || LibraryName.search(/\bShared%20Documents\b/) >= 0 || LibraryName.search(/\bShared Documents\b/) >= 0) {
                var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
            }
            else {
                var ItemType = GetItemTypeForLibraryName(LibraryName);
            }

            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Titan_Permission: Adhistory
            };

            $.when(updateItemWithIDTeam(DocFileFolderId, listTitle, Metadata, SiteUrl)).done(function (data) {
            	$("#PermHisParent").show();
				var tempDocName = Documentname;
                if (Documentname.search(/\bDocuments\b/) >= 0) {
                    tempDocName = "Shared%20Documents";
                }
                GetMyDocumentsWithFilesFolder(tempDocName);
                PermissionHistory = true;
                Adhistory = '';
            });
        }
        else {
            PermissionHistory = true;
        }
        if (PermissionHistory == false) { //If Permission History is not created stop the flow.
            return false;
        }
        if (_spPageContextInfo.webAbsoluteUrl != SiteUrl) {
            $.when(GetFormDigestValue(SiteUrl)).done(function (GetFormDigestValue) {
                RequestDigest = GetFormDigestValue
            });
        }

        var Permissions = $("#ddlpermission").children("option:selected").val();
        for (var i = 0; i < userListId.length; i++) {
            DeleteUserPermissionOnDMSLibrary(SiteUrl, Documentname, userListId[i], Permissions, RequestDigest);
            if (true) {
                if (userListId[i] == "") {
                    alert(arrRestrictedUser[i].UserName + " is not active user.");
                }
                else {
                    AssignTheEditRole(SiteUrl, Documentname, userListId[i], Permissions, RequestDigest);
                }

            } else {
                alert("This operation is not allowed on an object that inherits permissions");
                $("#adduserpopup1").modal('hide');
                return false;

            }

        }

        // if (AssignTheEditRoles(SiteUrl, Documentname, userListId, Permissions)) {

        var Query = "?$select=RestrictedContributor/Title,RestrictedContributor/EMail,Contributors/EMail,Readers/EMail,Viewers/EMail,Contributors/Id,Readers/Id,Viewers/Id,Contributors/Title,Readers/Title,Viewers/Title,EmployeeName/EMail,EmployeeName/Title,EmployeeName/Id,ID&$top=1&$expand=Contributors,Viewers,Readers,RestrictedContributor,EmployeeName&$filter=Title eq '" + DMS_Type + "'";
        $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            Permissions = $("#ddlpermission").children("option:selected").text();
            GetAllEmployeeDetailsUser();
            userListIdfilterd = [];
            arrEmployeeName = [];
            Contributors = [];
            RestrictedContributor = [];
            RestrictedView = [];
            Readers = [];


            for (var i = 0; i < userListId.length; i++) {
                if (LibraryType != "Linked") {
                    var IsUser = AllEmployeeuser.filter(function (filterData) {
                        return filterData.LogonNameId == userListId[i];
                    });
                    if (IsUser.length > 0) {
                        userListIdfilterd.push(IsUser[0].LogonNameId);
                    }
                    else {
                    	userListIdfilterd.push(GetUserId(allUserInfo[i].Key.split('|')[2], _spPageContextInfo.webAbsoluteUrl));
                    }
                }
                else {
                    userListIdfilterd.push(GetUserId(allUserInfo[i].Key.split('|')[2], _spPageContextInfo.webAbsoluteUrl));
                }

                if (valuesArray[0].EmployeeName.results != undefined) {
                    for (var j = 0; j < valuesArray[0].EmployeeName.results.length; j++) {
                        arrEmployeeName.push(valuesArray[0].EmployeeName.results[j].Id)
                    }

                }
                arrEmployeeName = arrEmployeeName.filter(function (obj) {
                    return obj !== userListId[i];
                });


                if (valuesArray[0].Viewers.results != undefined) {
                    for (var j = 0; j < valuesArray[0].Viewers.results.length; j++) {
                        RestrictedView.push(valuesArray[0].Viewers.results[j].Id)
                    }

                }


                RestrictedView = RestrictedView.filter(function (obj) {
                    return obj !== userListId[i];
                });



                if (valuesArray[0].Contributors.results != undefined) {
                    for (var j = 0; j < valuesArray[0].Contributors.results.length; j++) {
                        Contributors.push(valuesArray[0].Contributors.results[j].Id)
                    }

                }

                Contributors = Contributors.filter(function (obj) {
                    return obj !== userListId[i];
                });


                if (valuesArray[0].Readers.results != undefined) {
                    for (var j = 0; j < valuesArray[0].Readers.results.length; j++) {
                        Readers.push(valuesArray[0].Readers.results[j].Id)
                    }

                }

                Readers = Readers.filter(function (obj) {
                    return obj !== userListId[i];
                });
            }

            if (Permissions == "Full Control" || Permissions == "Owner") {
                var Metadata;
                var ItemType = GetItemTypeForListName("PersonalDMSSetting");
                const UserIdArray = getUniqueAfterMerge(arrEmployeeName, userListIdfilterd);

                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    EmployeeNameId: {
                        "results": UserIdArray
                    },
                    ContributorsId: {
                        "results": Contributors
                    },
                    ViewersId: {
                        "results": RestrictedView
                    },
                    ReadersId: {
                        "results": Readers
                    },
                    RestrictedContributorId: {
                        "results": RestrictedContributor
                    }
                };

            } else if (Permissions == "Contributor" || Permissions == "Member" || Permissions == "Contribute" || Permissions == "Edit") {
                var Metadata;
                var ItemType = GetItemTypeForListName("PersonalDMSSetting");
                const UserIdArray = getUniqueAfterMerge(Contributors, userListIdfilterd);

                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    EmployeeNameId: {
                        "results": arrEmployeeName
                    },
                    ContributorsId: {
                        "results": UserIdArray
                    },
                    ViewersId: {
                        "results": RestrictedView
                    },
                    ReadersId: {
                        "results": Readers
                    },
                    RestrictedContributorId: {
                        "results": RestrictedContributor
                    }
                };

            } else if (Permissions == "Reader" || Permissions == "Guest" || Permissions == "Read") {
                var Metadata;
                var ItemType = GetItemTypeForListName("PersonalDMSSetting");
                const UserIdArray = getUniqueAfterMerge(Readers, userListIdfilterd);
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    EmployeeNameId: {
                        "results": arrEmployeeName
                    },
                    ContributorsId: {
                        "results": Contributors
                    },

                    ViewersId: {
                        "results": RestrictedView
                    },
                    ReadersId: {
                        "results": UserIdArray
                    },
                    RestrictedContributorId: {
                        "results": RestrictedContributor
                    }
                };
            } else if (Permissions == "Restricted View") {
                var Metadata;
                var ItemType = GetItemTypeForListName("PersonalDMSSetting");
                //RestrictedView= RestrictedView.concat(userListIdfilterd);

                const UserIdArray = getUniqueAfterMerge(RestrictedView, userListIdfilterd);

                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    EmployeeNameId: {
                        "results": arrEmployeeName
                    },
                    ContributorsId: {
                        "results": Contributors
                    },

                    ViewersId: {
                        "results": UserIdArray
                    },
                    ReadersId: {
                        "results": Readers
                    },
                    RestrictedContributorId: {
                        "results": RestrictedContributor
                    }
                };
            }
            $.when(updateItemWithID(valuesArray[0].ID, "PersonalDMS_Setting", Metadata)).done(function (valuesArray) {
                GetListusers();
                $("#adduserpopup1").modal('hide');

            });

        });
    } else {
        alert("fill add users");
    }
}

//check if user has full control on the particular library
function chkLoggedInUserLib(LibraryName, webUrl) {
    var HasFullPermission = false;
    $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
        RequestDigest = GetFormDigestValue
    });
    if (LibraryName == "Shared%20Documents" || LibraryName == "Shared Documents") {
        LibraryName = "Documents";
    }
    var endpointUrl = webUrl + "/_api/Web/lists/getByTitle('" + LibraryName + "')/RoleAssignments?$expand=Member,RoleDefinitionBindings&$filter=Member/Email eq '" + _spPageContextInfo.userEmail + "'";
    getJson(endpointUrl).done(function (data) {
        if (data.d.results[0].RoleDefinitionBindings.results[0].Name == 'Full Control') {
            HasFullPermission = true;
        }
    });
    return HasFullPermission;
}


//get Project count for Logged_In user
function getProjectCount() {
    var Query = "?$select=DocumentPermission,TeamMember/Id,Project/Id,Project/ProjectName,TeamMember/EMail&$top=5000&$orderby=Project/ProjectName asc&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and TeamMember/EMail eq '" + _spPageContextInfo.userEmail + "' and Status eq 'Active'";
    $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {
        if(valuesArray.length == 0) {
            $(".HideProjectSection").remove();
        }
        getGuestCount();
    });
}

//get guest count for Logged_In user
function getGuestCount(){
    var Query = "?$select=Id,Title,IsActive,CompanyID/Id,DocumentLibrary,InternalMembers/EMail,InternalSupervisor/EMail&$orderby=Title asc&$expand=CompanyID,InternalMembers,InternalSupervisor&$top=5000&$filter=DocumentLibrary ne null and IsActive eq '1' and InternalMembers/EMail eq '" + _spPageContextInfo.userEmail + "' or InternalSupervisor/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("ClientMaster", Query,_spPageContextInfo.webAbsoluteUrl)).done(function(Clients) {
        if (Clients.length == 0) {
            $(".HideGuestSection").remove();
        }
    });
}

//get user name to set as admin
function SetAdminForTeam() {
    var Query = "?$select=Id,Title,ListOfUsers/EMail,ListOfUsers/Title&$expand=ListOfUsers&$top=5000&$filter=Title eq 'DMS Flow' ";
    $.when(getItemsWithQuery("EnvironmentalSettings", Query,_spPageContextInfo.webAbsoluteUrl)).done(function(User) {
        if (User.length > 0) {
            if(User[0].ListOfUsers.results != null) {
                for (var u = 0; u < User[0].ListOfUsers.results.length; u++) {
                    var loginName = 'i:0#.f|membership|'+User[0].ListOfUsers.results[u].EMail;
                    ensureUser(SiteUrl, loginName)
					.done(function (data) {
					    console.log('User has been added.');
					    setSiteAdmin(SiteUrl, data.d.Id)
					    .done(function (response) {
					        var Query = "?$select=MSTeamID,RestrictedContributor/Title,RestrictedContributor/EMail,Contributors/EMail,Readers/EMail,Viewers/EMail,Contributors/Id,Readers/Id,Viewers/Id,Contributors/Title,Readers/Title,Viewers/Title,EmployeeName/EMail,EmployeeName/Title,EmployeeName/Id,ID&$top=1&$expand=Contributors,Viewers,Readers,RestrictedContributor,EmployeeName&$filter=MSTeamID eq '" + MsTeamId + "' and LibraryType eq 'Team'";
					        $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
					            var Metadata;
					            var ItemType = GetItemTypeForListName("PersonalDMSSetting");
					            Metadata = {
					                __metadata: {
					                    'type': ItemType
					                },
					                IsAllowFeature: "Started"
					            };
					            $.when(updateItemWithID(valuesArray[0].ID, "PersonalDMS_Setting", Metadata)).done(function (valuesArray) {
					                alert("Your request has been submitted. It will take few minutes to activate.");
					                $("#BoxAllowPermission").hide();
					            });
					        });
					    }).fail(function (error) {
					        console.log(error);
					    });
					}).fail(function (error) {
					    console.log('An error occured while adding user');
					});
                }
            }
            else {
                alert("Your request has not been submitted. No user has been found.");
            }
        }
        else {
            alert("Your request has not been submitted. No user has been found.");
        }
    });
}


//to ensure user is valid
function ensureUser(webUrl, loginName) {
    var payload = {
        'logonName': loginName,
    };
    $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
        RequestDigest = GetFormDigestValue
    });
    return $.ajax({
        url: webUrl + "/_api/web/ensureuser",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(payload),
        headers: {
            "X-RequestDigest": RequestDigest,
            "accept": "application/json;odata=verbose"
        },
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
            return false;
        }
    });
}

//ToCreate site collection admin
function setSiteAdmin(webUrl, userId) {
    var payload = {
        "__metadata": { "type": "SP.User" },
        "IsSiteAdmin": true
    };
    $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
        RequestDigest = GetFormDigestValue
    });
    return $.ajax({
        url: webUrl + "/_api/web/getuserbyid(" + userId + ")",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(payload),
        headers: {
            "X-RequestDigest": RequestDigest,
            "accept": "application/json;odata=verbose",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
            return false;
        }
    });
}

//Delete column from LOcally
function DeleteListColumnLocal(Action){
    $("."+Action).remove();
}

//to delete a library column
function DeleteListColumn(LibraryName, SiteURL, columnName, ListId) {
    if (confirm("Are you sure,you want to delete this column?") == true) {
        if (LibraryName == "Shared%20Documents" || LibraryName == "Shared Documents") {
            LibraryName = "Documents";
        }
        $.when(GetFormDigestValue(SiteURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
        $.ajax({
            url: SiteURL + "/_api/web/lists/getByTitle('" + LibraryName + "')/fields/getbytitle('" + columnName + "')",
            type: "POST",
            headers: {
                // Accept header: Specifies the format for response data from the server.
                "Accept": "application/json;odata=verbose",
                //Content-Type header: Specifies the format of the data that the client is sending to the server
                "Content-Type": "application/json;odata=verbose",
                // IF-MATCH header: Provides a way to verify that the object being changed has not been changed since it was last retrieved.
                // "IF-MATCH":"*", will overwrite any modification in the object, since it was last retrieved.
                "IF-MATCH": "*",
                //X-HTTP-Method:  The MERGE method updates only the properties of the entity, while the PUT method replaces the existing entity with a new one that you supply in the body of the POST
                "X-HTTP-Method": "DELETE",
                // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
                "X-RequestDigest": RequestDigest
            },
            success: function (data, status, xhr) {
                DeleteColuFromList(ListId);            
            },
            error: function (xhr, status, error) {
                alert(xhr.responseText);
                return false;        
            }
        });
    }
}

//delete the column from list
function DeleteColuFromList(ItemId){
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DMSColumnSetting')/items(" + ItemId + ")",
        type: "POST",
        headers: {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function(data) {
            getCustomColumns();
            alert("Column has been deleted successfully.");
        },
        error: function(data) {
            alert(data.responseJSON.error);
        }
    });
}

//get and bind Custom columns
function getCustomColumns() {
    var Title = '';
    $("#tblColumnsSettings .customRowCol").remove();
    if (currentSectionType == "Department") {
        Title = 'Department';
    }
    else if (currentSectionType == 'Group Documents') {
        Title = 'Group Documents';
    }
    else if (currentSectionType == "ProjectDocuments") {
        Title = 'Project Documents';
    }
    else if (currentSectionType == "GuestDocuments") {
        Title = 'Guest Portal Documents';
    }
    var Query = "?$select=*&$top=5&$filter=Title eq '" + Title + "' and DMS_Type eq '" + DMS_Type + "' and ColumnType eq 'Custom' ";
    $.when(getItemsWithQuery("DMSColumnSetting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (CustomCols) {
        if (CustomCols.length > 0) {

            for (var index = 0; index < CustomCols.length; index++) {
                CustomRow = '<tr class="dummyRow customRowCol">' +
                                '<td class="vertical-align-middle">' +
                                '<div class="checkbox mt0 checkbox-space-align">' +
                                '<label><input type="checkbox" class="checkbox" value="" id="ckbCustomCol1" ></label>' +
                                '</div>' +
                                '</td>' +
                                '<td>' + CustomCols[index].ColumnName + '</td>' +
                                '<td>' + CustomCols[index].DataType + '</td>' +
                                '<td style="display:none">Custom</td>' +
                                '<td>' +
                                '<div class="form-group custom-form-group mb0">' +
                                '<select class="form-control numbers" id="ddlCustomCol1' + RowCount + '">' +

                                '<option>2</option>' +
                                '<option>3</option>' +
                                '<option>4</option>' +
                                '<option>5</option>' +
                                '<option>6</option>' +
                                '<option>7</option>' +
                                '<option>8</option>' +
                                '<option>9</option>' +
                                '<option>10</option>' +
                                '<option>11</option>' +
                                '<option >12</option>' +
                                '<option>13</option>' +
                                '<option selected="selected">13</option>' +
                                '<option>14</option>' +
                                '<option>15</option>' +
                                '<option>16</option>' +
                                '<option>17</option>' +

                                '</select>' +
                                '</div>' +
                                '</td>' +
                                '<td><a class="delete" href="javascript:void(0);" onclick="DeleteListColumn(\'' + CheckLibary + '\', \'' + SiteUrl + '\', \'' + CustomCols[index].ColumnName + '\', \'' + CustomCols[index].Id + '\')">Delete</a></td>' +
                                '</tr>';

                $("#tblColumnsSettings tr:last").before(CustomRow);
                $('#tblColumnsSettings').scrollTop($('#tblColumnsSettings').height());


                $('#ddlCustomCol1' + RowCount + '').val($('#ddlCustomCol1 option:selected').text()).attr("selected", "selected");
                RowCount++;
                $('#txtCreatecolumn').val("")
            }

        }
    });
}