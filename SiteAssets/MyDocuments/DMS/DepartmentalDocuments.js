var arrPermission = [];
var FileCommentType = "Parent";
var FileCommentResponse= FileCommentResponse || [];
var getLatestMsgId = '';
var ModifyRecId = '';
var finalFiles = [];
var Tcounter = 0;
var RemoveDuplicate = [];

function myShareDepartment() {
    var DocLibraries = '';
    $("#liRemoveGroup").hide();
    $("#divNew").show();
    $("#divUpload").show();
    $("#liEmails").show();
    $("#btnAppMore").show();
    arrFileFolder = [];
    $("#liAlert").hide();
    HeadingTitle = "Department"
    //  $(".headdingLinks").html("");
    //   $(".headdingLinks").html(HeadingTitle);

    $("#accordioninner").html("");
    var Query = "?$select=*,Department/DepartmentName,Department/ID,Contributors/EMail,Owner/EMail&$top=5000&$orderby=Department/DepartmentName asc&$expand=Department,Contributors,Owner&$filter=(CompanyId eq '" + Logged_CompanyId + "' and Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' and WebPartName eq 'DepartmentDocument_Access') or (CompanyId eq '" + Logged_CompanyId + "' and (Owner/EMail eq '" + _spPageContextInfo.userEmail + "' or Contributors/EMail eq '" + _spPageContextInfo.userEmail + "') and WebPartName eq 'Documents') or (CompanyId eq '" + Logged_CompanyId + "' and Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' and WebPartName eq 'Head of the Department') ";
    $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {
        //LOgged_In department
        var DeptURL = getDepartmentURL(Logged_DepartmentId);
        DeptURL = DeptURL + "/DepartmentalDMS/Forms/AllItems.aspx";
        var DepartmentName = Logged_DepartmentName;
        tempTitle = DepartmentName.replace(/[^A-Z0-9]/ig, "");
        var GetLib = "javascript:GetLibarayDetails(this,'" + DeptURL + "','" + DepartmentName + "','" + Logged_DepartmentId + "','"+HeadingTitle+"')";

        DocLibraries += '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<h4 class="panel-title">' +
            '<a href="javascript:void(0)" id="'+tempTitle +Logged_DepartmentId+'" onclick="' + GetLib + '" class="dms-left-panel-tab-inner" data-toggle="pill">' +
            '<div class="d-flex align-items-center">' +
            '<img src="../SiteAssets/MyDocuments/DMS/assets/images/depart-ico.png" alt="Departmental Documents">' +
            '<span class="mobile-hide-tabs-name mt3 ml10">' + Logged_DepartmentName + '</span>' +
            '</div>' +
            '</a>' +
            '</h4>' +
            '</div>' +
            '</div>';
        //Remove Duplicate objects
        valuesArray = valuesArray.filter((v,i,a)=>a.findIndex(t=>(t.Department.ID===v.Department.ID))===i);
        valuesArray = valuesArray.filter(function (el) {
		  return el.Department.DepartmentName != null;
		});
        $.each(valuesArray, function(i, el) {
            if(el.Department.DepartmentName.toLowerCase() != Logged_DepartmentName.toLowerCase()){
                var DeptURL = getDepartmentURL(el.Department.ID);
                DeptURL = DeptURL + "/DepartmentalDMS/Forms/AllItems.aspx";
                var DepartmentName =el.Department.DepartmentName;
                tempTitle = DepartmentName.replace(/[^A-Z0-9]/ig, "");
                var GetLib = "javascript:GetLibarayDetails(this,'" + DeptURL + "','" + DepartmentName + "','" + el.Department.ID+ "','"+HeadingTitle+"')";
	
                DocLibraries += '<div class="panel panel-default">' +
	                '<div class="panel-heading">' +
	                '<h4 class="panel-title">' +
	                '<a href="#groupDocuments_tab" id="'+ tempTitle + el.Department.ID +'" onclick="' + GetLib + '" class="dms-left-panel-tab-inner" data-toggle="pill">' +
	                '<div class="d-flex align-items-center">' +
	                '<img src="../SiteAssets/MyDocuments/DMS/assets/images/depart-ico.png" alt="Departmental Documents">' +
	                '<span class="mobile-hide-tabs-name mt3 ml10">' + el.Department.DepartmentName + '</span>' +
	                '</div>' +
	                '</a>' +
	                '</h4>' +
	                '</div>' +
	                '</div>';
            }

        });




        $("#accordioninner").append(DocLibraries);

    });
}


//to get dept URL 
function getDepartmentURL(ItemId) {
    var DeptDocumentsUrl = '';
    var restQueryPersonalDMS = "?$select=ID,SiteURL,CompanyID/ID&$expand=CompanyID&$top=5000&$filter=CompanyID/ID eq '" + Logged_CompanyId + "' and ID eq '" + ItemId + "'";
    $.when(getItemsWithQuery("Departments", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function(ProjectDetailData) {
        if (ProjectDetailData.length > 0) {
            var siteURL = ProjectDetailData[0].SiteURL;
            if (siteURL != null && siteURL != "") {
                DeptDocumentsUrl = siteURL;
            }
        }
    });
    return DeptDocumentsUrl;

}


//on click of department get Logged_In Roles - Full Owner, Contributor, Reader
function getUserRoles_Dept(DeptName) {
    arrPermission = [];
    var Query = "?$select=*,Department/DepartmentName,Contributors/EMail&$top=5000&$expand=Department,Contributors&$filter=CompanyId eq '" + Logged_CompanyId + "' and Department/DepartmentName eq '" + DeptName + "' and WebPartName eq 'Head of the department' and Contributors/EMail eq '" + _spPageContextInfo.userEmail + "'";
    $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            arrPermission.push({ //User is HOD
                UserFullAccess: true,
                UserContri: false,
                UserReader: false
            });
        }
        else { //check for Contributor
            //var Query = "?$select=*,Department/DepartmentName,Department/ID,Contributors/EMail&$top=5000&$expand=Department,Contributors&$filter=(CompanyId eq '" + Logged_CompanyId + "' and Department/DepartmentName eq '" + DeptName + "' and Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' and (WebPartName eq 'DepartmentDocument_Access' or WebPartName eq 'Documents')) ";
            var Query = "?$select=*,Department/DepartmentName,Department/ID,Contributors/EMail,Owner/EMail&$top=5000&$expand=Owner,Department,Contributors&$filter=(CompanyId eq '" + Logged_CompanyId + "' and Department/DepartmentName eq '" + DeptName + "' and (Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' or Owner/EMail eq '" + _spPageContextInfo.userEmail + "') and WebPartName eq 'Documents') ";
            $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function(valuesArray) {
                if (valuesArray.length > 0) {
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    //$("#liSahringRule").hide();//Bhawana
                    arrPermission.push({ //User is HOD
                        UserFullAccess: false,
                        UserContri: true,
                        UserReader: false
                    });
                }
                else {//Reader
                    //$("#liSahringRule").hide();//Bhawana
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    $("#divNew").hide();
                    $("#divUpload").hide();
                    $("#liEmails").hide();
                    $("#divProperties").hide();
                    $("#btnMultiMove").hide();
                    $("#liAlert").hide();
                    $("#divDelete").hide();
                    $("#LiLeavethegroup").hide();
                    $("#liRemoveGroup").hide();
                    $("#divShare").hide();
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


//on click of Projects get Logged_In Roles - Full Owner, Contributor, Reader
function getUserRoles_Project(ProjectName) {
    arrPermission = [];
    var Query = "?$select=Title,CompanyId,ManagerName/EMail&$top=5000&$expand=ManagerName&$filter=CompanyId eq '" + Logged_CompanyId + "' and Title eq '" + encodeURIComponent(ProjectName) + "' and ManagerName/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("ProjectDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            arrPermission.push({ //User has Full control
                UserFullAccess: true,
                UserContri: false,
                UserReader: false
            });
        }
        else { //check for Contributor
            var Query = "?$select=Title,CompanyId,TeamMember/EMail,Project/Title,DocumentPermission&$top=5000&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and Project/Title eq '" + ProjectName + "' and TeamMember/EMail eq '" + _spPageContextInfo.userEmail + "' and DocumentPermission eq '1' ";
            $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                if (valuesArray.length > 0) {
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    //$("#liSahringRule").hide();//Bhawana
                    arrPermission.push({ //User is HOD
                        UserFullAccess: false,
                        UserContri: true,
                        UserReader: false
                    });
                }
                else {
                   // $("#liSahringRule").hide();//Bhawana
                    $("#liPermission").hide();
                    $("#liSettings").hide();
                    $("#liMembers").hide();
                    $("#divNew").hide();
                    $("#divUpload").hide();
                    $("#liEmails").hide();
                    $("#divProperties").hide();
                    $("#btnMultiMove").hide();
                    $("#liAlert").hide();
                    $("#divDelete").hide();
                    $("#LiLeavethegroup").hide();
                    $("#liRemoveGroup").hide();
                    $("#divShare").hide();
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

//on click of Guest-Clients get Logged_In Roles - Full Owner, Contributor, Reader
function getUserRoles_Client(ClientName) {
    arrPermission = [];
    var Query = "?$select=Title,CompanyID/Id,InternalSupervisor/EMail,Supervisor/EMail&$top=5000&$expand=CompanyID,InternalSupervisor,Supervisor&$filter=(CompanyID/Id eq '" + Logged_CompanyId + "' and Title eq '" + ClientName + "' and (Supervisor/EMail eq '" + _spPageContextInfo.userEmail + "' or InternalSupervisor/EMail eq '" + _spPageContextInfo.userEmail + "')) ";
    $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            arrPermission.push({ //User has Full control
                UserFullAccess: true,
                UserContri: false,
                UserReader: false
            });
        }
        else { //check for Contributor
            $("#liPermission").hide();
            $("#liSettings").hide();
            $("#liMembers").hide();
            //$("#liSahringRule").hide();//Bhawana
            arrPermission.push({ //User is HOD
                UserFullAccess: false,
                UserContri: true,
                UserReader: false
            });
        }
    });
}


//-------------------------------------------Document Comments code starts---------------------------------

//Add File View-Count
function AddFileViewCount() {
    var listName = "DocumentComments";
    var LibraryName = CopyLibrary;
    if($("#ModalDisplayProperty").css('display') == 'none') {
    	LibraryName = CheckLibary;
	}
    var Query = "?$select=*,Author/EMail&$expand=Author&$filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' and DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and (Views eq 'Yes' or Views eq 'No')";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (FilterResult) {
        if (FilterResult.length > 0) {
            if (FilterResult[0].Views == "No") {
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Views': 'Yes', 'ViewsById': parseInt(_spPageContextInfo.userId) };
                updateItemWithIDItemListDocuments(listName, item, FilterResult[0].ID, _spPageContextInfo.webAbsoluteUrl, false);
            }
        }
        else if (FilterResult.length == 0) {
            var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 
                'Title': $("#FileName").text(),
                'EmployeeId': parseInt(_spPageContextInfo.userId), 
                'Views': 'Yes', 
                'ViewsById': parseInt(_spPageContextInfo.userId), 
                'DocumentId': parseInt(DocumentId), 
                'FileName': $("#FileName").text(), 
                'DocumentTitle': $("#FileTitle").text(), 
                'FileCategory': $("#FileDocType").text(), 
                'LibraryURL': CommentSiteURL, 
                'ServerSiteURL': $("#FilePath").text(),
                'LibraryName': LibraryName
            };
            AddItemToListGroups(listName, item);
        }
    });
}

//to add comments on file
function PushRootComment() { 
    var listName="DocumentComments";
    var comment = $("#FileCommArea .emojionearea-editor").html().trim();
    var LibraryName = CopyLibrary;
    if($("#ModalDisplayProperty").css('display') == 'none') {
    	LibraryName = CheckLibary;
	}
    if(comment != "") {
        if(FileCommentType == "Parent") {
            var item = {
                '__metadata': { type: 'SP.Data.' + listName + 'ListItem' },
                'EmployeeId': _spPageContextInfo.userId,
                'ReplierId': _spPageContextInfo.userId,
                'Comments': comment,
                'Initials': "Parent",
                'ReplyforId': _spPageContextInfo.userId,
                'Title': $("#FileName").text(),
                'DocumentId': parseInt(DocumentId), 
                'FileName': $("#FileName").text(), 
                'DocumentTitle': $("#FileTitle").text(), 
                'FileCategory': $("#FileDocType").text(), 
                'LibraryURL': CommentSiteURL, 
                'ServerSiteURL': $("#FilePath").text(),
                'LibraryName': LibraryName
            }
            AddDocComments(listName, item, '0'); 
            $("#FileCommArea .emojionearea-editor").html(''); 	
        }
        else if(FileCommentType == "Reply") {
            var item = {
                '__metadata': { type: 'SP.Data.' + listName + 'ListItem' },
                'EmployeeId': _spPageContextInfo.userId,
                'ReplierId': _spPageContextInfo.userId,
                'Comments': comment,
                'Initials': "Reply",
                'ReplyTo': $("#replyforuser").text(),
                'ReplyAgainst': $("#ReplyforMsg").attr('value'),
                'Title': $("#FileName").text(),
                'DocumentId': parseInt(DocumentId), 
                'FileName': $("#FileName").text(), 
                'DocumentTitle': $("#FileTitle").text(), 
                'FileCategory': $("#FileDocType").text(), 
                'LibraryURL': CommentSiteURL, 
                'ServerSiteURL': $("#FilePath").text(),
                'LibraryName': LibraryName
            }
            AddDocComments(listName, item, '0');
            $("#FileCommArea .emojionearea-editor").html('');
            FileCommentType = "Parent";
        }
        else if (FileCommentType == "Modify") {
            UpdateEditComment(ModifyRecId);
        }
        //6 April 23
        if(cmntIcon!=""&&cmntIcon!=undefined&&cmntIcon!=null&&cmntIcon!='undefined'&&cmntIcon!='null')
        $(cmntIcon).find('img:first').prop('src',"../SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png");
    }
    else {
        alert("Please type a message to continue.");
        return false;
    }
}

function AddDocComments(listName,item,ControlID) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) { 	
            $("#TotalComments").text(parseInt($("#TotalComments").text()) + 1);
            if(FinalFiles4Upload.length>0) {
                uploadattachment(data.d.ID);
                $("#NewAttachmentFiles").empty();
                $('.emojionearea-editor').empty(); 
            }
            else {
                AutoRefreshComments('GetAll', 'Logged_InUser');
                $('.emojionearea-editor').empty();
                FinalFiles4Upload=[];
                finalFiles = [];
            }
            $("#replyTextarea").hide();
            $("#NewAttachmentFiles").empty();
            $("#CommentFileAttach").val('');
        },
        error: function (data) { 
            console.log(data); 
        }
    });
}

//Auto refresh the Chat box
function AutoRefreshComments(Action, Source) {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('DocumentComments')/Items?$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=Created desc&$top=10&$skipToken=Paged=TRUE%26p_ID=" + getLatestMsgId + "&$filter= (DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    var QueryResult = OccasionExecuteFilter(Ownurl, Action, Source);
}

//to open file in Iframe
function previewfile(Action) {
    ServerSrc = Action.name;
    if (Action.name == null) {
        ServerSrc = Action.title;
    }
    var docExt = Action.dataset.filename.split('.').pop();
    if (docExt == 'doc' || docExt == 'docx' || docExt == 'xls' || docExt == 'xlsx' || docExt == 'ppt' || docExt == 'pptx' || docExt == 'pdf') {
        iframeUrl1 = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/WopiFrame.aspx?sourcedoc=' + Action.dataset.fileurl + '&action=interactivepreview';
    }
    else {
        iframeUrl1 = Action.dataset.fileurl;
    }
    /*if (ServerSrc.match(/\.(docx|xlsx)$/) != null) {
        iframeUrl1 = _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/Doc.aspx?sourcedoc=" + ServerSrc + "&action=view&mobileredirect=true";
    }
    else {
        iframeUrl1 = ServerSrc + "?web=1";
    }*/
    
    var container = $("#sign-viewer").empty();
    $('<iframe>', {
        src: iframeUrl1,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
    setInterval(function () {
    	$("#iframe-viewer").contents().find("#AppHeaderPanel").hide();
        $("#iframe-viewer").contents().find("#AppHeaderPanel").remove();
        if($('#iframe-viewer').contents().find('body').html() == ""){
            $("#AttachmentView").modal("hide");
        }
    }, 3000);
}

//Preview Image in Iframe
function previewImage(Action) {
    src = Action.src + "?web=1";
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
//upload Attachment of the comments
function uploadattachment(id) {
    var counter = 0;
    if (FinalFiles4Upload.length > 0) {
        $.each(FinalFiles4Upload, function (index, value) {
            getFileBuffer(value).then(function (buffer) {

                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig, "");
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentComments')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
    				},
                    success: function (data) {
                        counter = counter + 1;
                        if (FinalFiles4Upload.length == counter) {
                            AutoRefreshComments('GetAll', 'Logged_InUser');
                            finalFiles = [];
                            FinalFiles4Upload = [];
                        }
                    },
                    error: function (data) {
                        console.log(data.responseText.error);
                    }
                });
            });
        });
    }
}

//get Documents comments list
function GetComments(Action, Source){
    getTotalViewCount();
    Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('DocumentComments')/Items?$select=*,ID,Author/Title,Author/Id,Author/EMail,AttachmentFiles&$expand=Author,AttachmentFiles&$orderby=Created desc&$top=5000&$filter=(DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    var QueryResult = OccasionExecuteFilter(Ownurl, Action, Source);
}

function OccasionExecuteFilter(_query, Action, Source) {
    FileCommentResponse = [];
    var tempURL = '';
    if(_query.indexOf("$skipToken") != -1) {
        tempURL = _query;
    }
    else {
        Ownurl = tempURL = _query;
    }	
    ReadOccasionComment(Action, Source, tempURL, '');
}

//get Document commets
function ReadOccasionComment(Action, Source, URL, IsViewMore) {
    $.ajax({
        url: URL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            FileCommentResponse= FileCommentResponse.concat(data.d.results);
            FileCommentResponse.sort((a, b) => a.ID - b.ID);   
            
            if(FileCommentResponse.length > 0){ 
                if(getLatestMsgId != FileCommentResponse[(FileCommentResponse.length -1)].Id && Action == "GetAll" && $("#hideCommentScroll").scrollTop() < -5 && Source != "Logged_InUser") {
                    $("#ToastPopup").show();
                }
                if(IsViewMore != "ViewMore"){
                    getLatestMsgId = FileCommentResponse[(FileCommentResponse.length -1)].Id;  
                }
            }     

            if(FileCommentResponse.length > 0) {            	
                if(URL.indexOf("$skipToken") != -1) {
                    //'skiptoken' substring found
                    DesignChatting(FileCommentResponse, 'refreshMode');
                }
                else {
                    //no 'skiptoken' substring
                    DesignChatting(FileCommentResponse, '');
                }
            }
            else {
                $("#CommentsArea").empty();
                $("#TotalComments").text('0');
            }
            if (data.d.__next) {
                Ownurl = data.d.__next;
                $("#seemorebtnGeneral").css("display", "block");
            }
            else {
                if(URL.indexOf("$skipToken") == -1) {
                    $("#seemorebtnGeneral").css("display", "none");
                }
            }
            /*if(Action != "PageLoad"){
                AutoRefreshComments('GetAll', 'Logged_InUser');
            }*/
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function OccasionCommentCount(Action) {
    if(Action == "GetAll"){
        UrlCommentTotal = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('OccasionReplies')/Items?$select=ID&$orderby=Created desc&$top=5000&$filter= (Year eq '"+CurrentYear+"' and EmployeeCode eq '"+EmployeeID+"' and OccasionType  eq '"+OccasionType+"' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    }
    OccasionresponseComment= [];
    ReadOccasionCommentTotal();
}

//HTML design for Chatting
function DesignChatting(FileCommentResponse, Mode) {
    if(Mode == '') {
        $("#TotalComments").text(FileCommentResponse.length);
    }
    var Commenthtmldesign = '';
    var Attachmnetlist = [];
    var AttachmnetIDs = [];
    var CommentLikeValue = 'Like';
    //$("#CommentsArea").empty();	
    for (var i = 0; i < FileCommentResponse.length; i++) {
        var likesCount = FileCommentResponse[i].LikeCount;
        var DisplayLikeDiv = "inline-block";
        if (Mode != "refreshMode") {
            likesCount = checkLikeCommentUser(FileCommentResponse[i].Id);
            if(likesCount > 0) {
                CommentLikeValue = 'Unlike';
                DisplayLikeDiv = "inline-block";
            }
            else {
                likesCount = 0;
                DisplayLikeDiv = "none";
            }
        }
        else {
            if(likesCount == null) {
                likesCount = 0;
                DisplayLikeDiv = "none";
            }
        }
        var eventDateObj = new Date(FileCommentResponse[i].Created);
        var Event_time = eventDateObj.toTimeString();
        var H = +Event_time.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? " AM" : " PM";
        Event_time = h + Event_time.substr(2, 3) + ampm;
        if (FileCommentResponse[i].Initials == "Parent") {
            if (_spPageContextInfo.userEmail.toLowerCase() == FileCommentResponse[i].Author.EMail.toLowerCase()) {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-my' id='CommentDivRecNo" + FileCommentResponse[i].ID + "'>" +
	                    								"<div class='col-md-12 col-sm-12 pl0 pr0 pb10'>" +
	                      									"<span>" + formatDateComment(FileCommentResponse[i].Created) + "</span> at <span> " + Event_time + "</span><span id='LikeSpan" + FileCommentResponse[i].ID + "' style='display:" + DisplayLikeDiv + "'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCount" + FileCommentResponse[i].ID + "' onclick='GetAllLikesComment(" + FileCommentResponse[i].ID + ")'>" + likesCount + "</span></span>" +
	                    								"</div>" +
	                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>" +
	                      									"<div>" +
	                        									"<div id='editMenuOpen2' class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>" +
	                          										"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>" +
	                        									"</div>" +
	                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>" +
	                          										"<li><a type='button' onclick='EditComment(" + FileCommentResponse[i].ID + ")'>Edit</a></li>" +
	                          										"<li><a type='button' class='logout' onclick='DeleteComments(" + FileCommentResponse[i].ID + ")' >Delete</a></li>" +
	                        									"</ul>" +
	                      									"</div>" +
	                      									"<div class='my-chat-edit-delete-panel-inside' id='CommentText" + FileCommentResponse[i].ID + "'>" + FileCommentResponse[i].Comments + "</div>" +
	                    								"</h4>" +
	                    								"<div class='col-md-12 col-sm-12 p0'>" +
	                      									"<div class='attachment-badge chip-box' id='Attachmentlist" + FileCommentResponse[i].ID + "'>" +
	                      									"</div>" +
	                    								"</div>" +
	                    								"<div class='clearfix'></div>" +
	                  								"</div>";
            }
            else {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(FileCommentResponse[i].Author.EMail)
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-ext' id='CommentDivRecNo" + FileCommentResponse[i].ID + "'>" +

	                    								"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'> <span class='mr10'><img src='" + attachment + "' class='img-circle chat-user-image' width='30' height='30' data-themekey='#'></span><span class='b-500' id='Username" + FileCommentResponse[i].ID + "'>" + FileCommentResponse[i].Author.Title + "</span><span class='pl5 pr5'>-</span><span>" + formatDateComment(FileCommentResponse[i].Created) + "</span> at <span> " + Event_time + "</span><span id='LikeSpan" + FileCommentResponse[i].ID + "' style='display:" + DisplayLikeDiv + "'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCount" + FileCommentResponse[i].ID + "' onclick='GetAllLikesComment(" + FileCommentResponse[i].ID + ")'>" + likesCount + "</span></span> </div>" +
	                    									"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>" +
	                      										"<div class='mt-4 my-chat-edit-delete-panel-inside' id='CommentText" + FileCommentResponse[i].ID + "'>" + FileCommentResponse[i].Comments + "</div>" +
	                      											"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>" +
	                          											"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>" +
	                        										"</div>" +
	                        										"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>" +
	                          											"<li><button id='messageEdit' type='button' class='btn LikeCmnt" + FileCommentResponse[i].ID + "' data-toggle='collapse' data-target='#messageReplyBox' aria-expanded='false' onclick='Pushlikeforcomment(" + FileCommentResponse[i].ID + ")'>" + CommentLikeValue + "</button></li>" +
	                          											"<li><a class='logout' onclick='ActiveReplyCtrl(" + FileCommentResponse[i].ID + ")'>Reply</a></li>" +
	                        										"</ul>" +
	                    									"</h4>" +
	                    									"<div class='col-md-12 col-sm-12 p0'>" +
	                      										"<div class='attachment-badge chip-box' id='Attachmentlist" + FileCommentResponse[i].ID + "'>" +
	                      										"</div>" +
	                    									"</div>" +
	                    									"<div class='clearfix'></div>" +
														"</div>";
            }
        }
        else if (FileCommentResponse[i].Initials == "Reply") {
            if (_spPageContextInfo.userId == FileCommentResponse[i].AuthorId) {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-my' id='CommentDivRecNo" + FileCommentResponse[i].ID + "'>" +
	                    								"<div class='col-md-12 col-sm-12 pl0 pr0 pb10'>" +
	                      									"<span>" + formatDateComment(FileCommentResponse[i].Created) + "</span> at <span> " + Event_time + "</span><span id='LikeSpan" + FileCommentResponse[i].ID + "' style='display:" + DisplayLikeDiv + "'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCount" + FileCommentResponse[i].ID + "' onclick='GetAllLikesComment(" + FileCommentResponse[i].ID + ")' >" + likesCount + "</span></span>" +
	                    								"</div>" +
	                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel others-reply-text-box'>" +
	                      									"<div class='reply-text-line'>" +
	                        									"<a href='#' class='comment-reply-user-name-info'>@<span >" + FileCommentResponse[i].ReplyTo + "</span> :</a>" +
	                        									"<span class='replymsg'>" + FileCommentResponse[i].ReplyAgainst + "</span>" +
	                        									"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>" +
	                          										"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>" +
	                        									"</div>" +
	                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>" +
	                          										"<li><a type='button' onclick='EditComment(" + FileCommentResponse[i].ID + ")'>Edit</a></li>" +
	                          										"<li><a class='logout' onclick='DeleteComments(" + FileCommentResponse[i].ID + ")'>Delete</a></li>" +
	                        									"</ul>" +
	                      									"</div>" +
	                      									"<div class='mt-14'>" +
	                        									"<div class='reply-text-box my-chat-edit-delete-panel-inside reply-inside-text-box' id='CommentText" + FileCommentResponse[i].ID + "'>" +
	                          										"" + FileCommentResponse[i].Comments + "" +
	                        									"</div>" +
	                      									"</div>" +
	                    								"</h4>" +
	                    								"<div class='col-md-12 col-sm-12 p0'>" +
	                      									"<div class='attachment-badge chip-box' id='Attachmentlist" + FileCommentResponse[i].ID + "'>" +
	                      									"</div>" +
	                    								"</div>" +
	                    								"<div class='clearfix'></div>" +
	                  								"</div>";

            }
            else {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(FileCommentResponse[i].Author.EMail)
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-ext'>" +
		                    								"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'> <span class='mr10'><img src='" + attachment + "' class='img-circle chat-user-image' width='30' height='30'></span> <span class='b-500'>" + FileCommentResponse[i].Author.Title + "</span><span class='pl5 pr5'>-</span><span>" + formatDateComment(FileCommentResponse[i].Created) + "</span> at <span> " + Event_time + "</span><span id='LikeSpan" + FileCommentResponse[i].ID + "' style='display:" + DisplayLikeDiv + "'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png'></span><span class='countInnerLikes' id='LikesCount" + FileCommentResponse[i].ID + "' onclick='GetAllLikesComment(" + FileCommentResponse[i].ID + ")'>" + likesCount + "</span></span> </div>" +
		                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>" +
		                      									"<div class='reply-text-line'><a href='#' class='comment-reply-user-name-info'>@<span >" + FileCommentResponse[i].ReplyTo + "</span> :</a><span class='replymsg'>" + FileCommentResponse[i].ReplyAgainst + "</span>" +
		                      										"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>" +
		                          										"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz'>" +
		                        									"</div>" +
		                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>" +
		                          										"<li><a type='button' class='LikeCmnt" + FileCommentResponse[i].ID + "' onclick='Pushlikeforcomment(" + FileCommentResponse[i].ID + ")'>" + CommentLikeValue + "</a></li>" +
		                          										"<li><a type='button' onclick='ActiveReplyCtrl(" + FileCommentResponse[i].ID + ")'>Reply</a></li>" +
		                        									"</ul>" +
		                        								"</div>" +
		                        								"<div class='mt-14'>" +
			                        								"<div class='reply-text-box my-chat-edit-delete-panel-inside reply-inside-text-box' id='CommentText" + FileCommentResponse[i].ID + "'>" +
			                          									"" + FileCommentResponse[i].Comments + "" +
			                        								"</div>" +
		                      									"</div>" +
		                    								"</h4>" +
		                    								"<div class='col-md-12 col-sm-12 p0'>" +
		                      									"<div class='attachment-badge chip-box' id='Attachmentlist" + FileCommentResponse[i].ID + "'>" +
		                      									"</div>" +
		                    								"</div>" +
		                    								"<div class='clearfix'></div>" +
	                  									"</div>";

            }
        }

        if (FileCommentResponse[i].AttachmentFiles.results.length > 0) {
            AttachmnetIDs.push(FileCommentResponse[i].ID);
            for (var j = 0; j < FileCommentResponse[i].AttachmentFiles.results.length; j++) {
                Attachmnetlist.push({
                    RecordId: FileCommentResponse[i].ID,
                    FileName: FileCommentResponse[i].AttachmentFiles.results[j].FileName,
                    ServerRelativeUrl: FileCommentResponse[i].AttachmentFiles.results[j].ServerRelativeUrl,
                });
            }
        }

    }
    if (Mode == "refreshMode") {
        $("#CommentsArea").append(Commenthtmldesign);
    }
    else {
        $("#CommentsArea").empty().append(Commenthtmldesign);
    }

    for (var k = 0; k < AttachmnetIDs.length; k++) {
        var RecId = AttachmnetIDs[k];
        var FilterResult = $.grep(Attachmnetlist, function (e) { return e.RecordId == AttachmnetIDs[k]; });
        var Attachmentdesign = '';
        $("#Attachmentlist" + RecId).empty();
        for (var p = 0; p < FilterResult.length; p++) {
            if (FilterResult[p].FileName.indexOf("docx") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Docx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/doc.png'></img><span title='" + FilterResult[p].ServerRelativeUrl + "' data-filename='" + FilterResult[p].FileName + "' onclick='previewfile(this);' data-fileurl='" + FilterResult[p].ServerRelativeUrl + "'>" + FilterResult[p].FileName + "</span></span> <span class='chip-icon-box'> <a href='" + FilterResult[p].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
            }
            else if (FilterResult[p].FileName.indexOf("pdf") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_PDF'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/pdf.png'></img><span title='" + FilterResult[p].ServerRelativeUrl + "' data-filename='" + FilterResult[p].FileName + "' onclick='previewfile(this);' data-fileurl='" + FilterResult[p].ServerRelativeUrl + "'>" + FilterResult[p].FileName + "</span></span> <span class='chip-icon-box'> <a href='" + FilterResult[p].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
            }
            else if (FilterResult[p].FileName.indexOf("xlsx") != -1 || FilterResult[p].FileName.indexOf("csv") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_xlsx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/xls.png'></img><span title='" + FilterResult[p].ServerRelativeUrl + "' data-filename='" + FilterResult[p].FileName + "' onclick='previewfile(this);' data-fileurl='" + FilterResult[p].ServerRelativeUrl + "'>" + FilterResult[p].FileName + "</span></span> <span class='chip-icon-box'> <a href='" + FilterResult[p].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
            }

            else if (FilterResult[p].FileName.indexOf("jpg") != -1 || FilterResult[p].FileName.indexOf("jpeg") != -1 || FilterResult[p].FileName.indexOf("JPEG") != -1 || FilterResult[p].FileName.indexOf("png") != -1 || FilterResult[p].FileName.indexOf("PNG") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Image'> <span class='pr-8 chip-text-box'><img src='" + FilterResult[p].ServerRelativeUrl + "' title=" + FilterResult[p].FileName + " onclick='previewImage(this);'></img></div>";
            }
            else {
                Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Others'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/file.png'></img><span title='" + FilterResult[p].ServerRelativeUrl + "' data-filename='" + FilterResult[p].FileName + "' onclick='previewfile(this);' data-fileurl='" + FilterResult[p].ServerRelativeUrl + "'>" + FilterResult[p].FileName + "</span></span> <span class='chip-icon-box'> <a href='" + FilterResult[p].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
            }
        }
        $("#Attachmentlist" + RecId).append(Attachmentdesign);
    }
}
//to update any comment of any file
function EditComment(RecID){
    FileCommentType="Modify";
    ModifyRecId = RecID;
    var Query = "?$filter=ID eq '"+RecID+"'&$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Items) {
        if(Items.length>0) {
            $('.emojionearea-editor').html(Items[0].Comments);
            $("#oldfilename").empty(); 
            if(Items[0].AttachmentFiles.results.length>0)
            {
                var AttachmentDesign ='';
                for(var y=0; y<Items[0].AttachmentFiles.results.length; y++)
                {
                    AttachmentDesign = AttachmentDesign +"<div class='comment-upload-chip "+Items[0].ID+"-"+y+"'><span class='attachment-badge-name comment-box-chip-text-box'><a target='_blank' href='" +Items[0].AttachmentFiles.results[y].ServerRelativeUrl+ "'><span>"+Items[0].AttachmentFiles.results[y].FileName+"</span></a></span><span class='Closebtn' id='Closebtn"+Items[0].ID+"'><i class='fa fa-close "+Items[0].ID+"' style='color:red;' id='"+Items[0].ID+"-"+y+"' value='"+Items[0].AttachmentFiles.results[y].FileName+"' onclick='DeleteAttachment(this.id)'></i></span></div>";    	
                }
                $("#oldfilename").append(AttachmentDesign); 
            } 	
        }
        else
        {
            $('.emojionearea-editor').empty();    		
        }
    });
}
//to delete the comment attachement
function DeleteAttachment(ItemId,filename) 
{
    var Dfd = $.Deferred();
    var dataID = ItemId.split("-");
    var DocumentName =$("#"+ItemId).attr('value');
    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DocumentComments')/GetItemById(" + dataID[0]+ ")/AttachmentFiles/getByFileName('" + DocumentName+ "')  ";
    $.ajax({
        url: Url,
        type: 'DELETE',
        contentType: 'application/json;odata=verbose',
        headers: {
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'X-HTTP-Method': 'DELETE',
            'Accept': 'application/json;odata=verbose'
        },
        success: function (data) 
        {
            Dfd.resolve(data);
            $("."+ItemId).hide();
            $("#"+ItemId).hide();            
            //TotalCommentsCounts=[];
            //GetTotalComments();          
        },
        error: function (error) 
        {
            Dfd.reject(JSON.stringify(error));
            console.log(error);
        }
    });
    return Dfd.promise();
}

//Update comment of any user
function UpdateEditComment(RecID) {
    var item = {
        __metadata:{
            type: "SP.Data.DocumentCommentsListItem"
        },
        Comments: $("#FileCommArea .emojionearea-editor").html()
    }
    $.when(updateItemWithIDItemListDocuments('DocumentComments', item, RecID, _spPageContextInfo.webAbsoluteUrl, false)).done(function (FilterResult) {
        if (FinalFiles4Upload.length > 0) {
            Edituploadattachment(RecID);
        }
        else {
            RetriveUpdateData(RecID);
        }
        alert("Comment has been updated.");
        $("#CommentText" + RecID).html($("#FileCommArea .emojionearea-editor").html());
        FileCommentType = "Parent";
        $("#NewAttachmentFiles").empty();
        $("#oldfilename").empty();
        $('.emojionearea-editor').empty();
    });
}

function Edituploadattachment(id) 
{	
    var xRequestDigest = $("#__REQUESTDIGEST").val();	
    var counter = 0;
    if(FinalFiles4Upload.length>0)
    {
        $.each(FinalFiles4Upload, function(index, value){
            getFileBuffer(value).then(function (buffer) {                
                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig,"");		  
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('DocumentComments')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: true,
                    processData: false,
                    headers: 
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": xRequestDigest
    				},
                    success: function (data)
                    {
                        counter  = counter + 1;    					
                        if(counter == FinalFiles4Upload.length)
                        {
                            RetriveUpdateData(id);		    					 
                        }
                    },
                    error: function (data) 
                    {
                        console.log(data.responseText.error);
                    }
                });
            });
        });
    }	
}

//To delete the comment
function DeleteComments(RecordID) {
    if (confirm('Are you sure to delete this comment ?')) {
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DocumentComments')/items("+RecordID+")",  
            type: "POST",
            async: true,  
            headers: {  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "DELETE"  
            },  
            success: function(data, status, xhr) {  
                $('#CommentDivRecNo'+RecordID).hide();
                $("#TotalComments").text(parseInt($("#TotalComments").text()) - 1);
            },  
            error: function(xhr, status, error) {  
                alert(data.responseJSON.error); 
                return false; 
            }  
        });  
    } 
}

//bind updated comment
function RetriveUpdateData(RecID) {
    var Query = "?$filter=ID eq '" + RecID + "'&$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Items) {
        if (Items.length > 0) {
            $('#CommentText' + Items[0].ID).html(Items[0].Comment);
            $("#Attachmentlist" + Items[0].ID).empty();
            if (Items[0].AttachmentFiles.results.length > 0) {
                var Attachmentdesign = '';
                for (var y = 0; y < Items[0].AttachmentFiles.results.length; y++) {
                    if (Items[0].AttachmentFiles.results[y].FileName.indexOf("docx") != -1) {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Docx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/doc.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                    }
                    else if (Items[0].AttachmentFiles.results[y].FileName.indexOf("pdf") != -1) {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_PDF'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/pdf.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                    }
                    else if (Items[0].AttachmentFiles.results[y].FileName.indexOf("xlsx") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("csv") != -1) {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_xlsx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/xls.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                    }

                    else if (Items[0].AttachmentFiles.results[y].FileName.indexOf("jpg") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("jpeg") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("JPEG") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("png") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("PNG") != -1) {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Image'> <span class='pr-8 chip-text-box'><img src='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' title=" + Items[0].AttachmentFiles.results[y].FileName + " onclick='previewImage(this);'></img></div>";
                    }
                    else {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Others'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/file.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                    }
                }
                $("#Attachmentlist" + Items[0].ID).append(Attachmentdesign);
            }
        }
    });
}
//to decide text - Unlike or Like
function checkLikeCommentUser(RecId) {
    var LikeCount = 0;
    var Query = "?$select=*,Author/Title,Author/Id,Author/EMail&$expand=Author&$filter=DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and LikeComment eq 'Yes' and LikeCommentID eq '" + RecId + "' and Author/EMail eq '" + _spPageContextInfo.userEmail + "'";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (FilterResult) {
        LikeCount = FilterResult.length;
        if (FilterResult.length > 0) {
            textValue = "Unlike";
        }
    });
    return LikeCount;
}

//To add or remove comment like
function Pushlikeforcomment(RecordID) {
    var d = new Date();
    var CurrentYear = d.getFullYear();
    var LibraryName = CopyLibrary;
    if($("#ModalDisplayProperty").css('display') == 'none') {
    	LibraryName = CheckLibary;
	}
    var Query = "?$select=*,Author/Title,Author/Id,Author/EMail&$expand=Author&$filter= (Author/EMail eq ('" + _spPageContextInfo.userEmail + "') and DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and LikeCommentID eq '" + RecordID + "') and (LikeComment eq 'Yes' or LikeComment eq 'No')";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (QueryResult) {
        if (QueryResult.length > 0) {
            if (QueryResult[0].LikeComment == "No") {
                var OldLikes = $("#LikesCount" + RecordID).text();
                $("#LikesCount" + RecordID).text(parseInt(OldLikes) + 1);
                if (parseInt(OldLikes) + 1 > 0) {
                    $("#LikeSpan" + RecordID).css("display", "inline-block");
                }
                else {
                    $("#LikeSpan" + RecordID).css("display", "none");
                }

                var listName = "DocumentComments";
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'LikeComment': 'Yes', 'LikeCount': parseInt(QueryResult[0].LikeCount) + 1};
                DocCommentUpdate(listName, item, QueryResult[0].ID);
            }
            else if (QueryResult[0].LikeComment == "Yes") {
                var OldLikes = $("#LikesCount" + RecordID).text();
                $("#LikesCount" + RecordID).text(parseInt(OldLikes) - 1);
                if (parseInt(OldLikes) - 1 > 0) {
                    $("#LikeSpan" + RecordID).css("display", "inline-block");
                }
                else {
                    $("#LikeSpan" + RecordID).css("display", "none");
                }

                var listName = "DocumentComments";
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'LikeComment': 'No', 'LikeCount': parseInt(QueryResult[0].LikeCount) - 1};
                var Res = DocCommentUpdate(listName, item, QueryResult[0].ID);
            }
            else if (QueryResult[0].LikeComment == null) {
                var OldLikes = $("#LikesCount" + RecordID).text();
                $("#LikesCount" + RecordID).text(parseInt(OldLikes) + 1);
                if (parseInt(OldLikes) + 1 > 0) {
                    $("#LikeSpan" + RecordID).css("display", "inline-block");
                }
                else {
                    $("#LikeSpan" + RecordID).css("display", "none");
                }
                var listName = "DocumentComments";
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'LikeComment': 'Yes', 'LikeCount': parseInt(QueryResult[0].LikeCount) + 1};
                var Res = DocCommentUpdate(listName, item, QueryResult[0].ID);
            }
        }
        else {
            var OldLikes = $("#LikesCount" + RecordID).text();
            $("#LikesCount" + RecordID).text(parseInt(OldLikes) + 1);
            if (parseInt(OldLikes) + 1 > 0) {
                $("#LikeSpan" + RecordID).css("display", "inline-block");
            }
            else {
                $("#LikeSpan" + RecordID).css("display", "none");
            }

            var listName = "DocumentComments";
            var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 
                'LikeComment': 'Yes', 
                'LikeCommentID': RecordID.toString(),
                'Title': $("#FileName").text(),
                'EmployeeId': parseInt(_spPageContextInfo.userId), 
                'DocumentId': parseInt(DocumentId), 
                'FileName': $("#FileName").text(), 
                'DocumentTitle': $("#FileTitle").text(), 
                'FileCategory': $("#FileDocType").text(), 
                'LibraryURL': CommentSiteURL, 
                'ServerSiteURL': $("#FilePath").text(),
                'LikeCount': 1,
                'LibraryName': LibraryName
            };
            AddDocComments(listName, item);
        }
    });
}

function formatDateComment(d) {
    var date = new Date(d);
    if (isNaN(date.getTime())) { return d; }
    else
    {
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


//get Total View Count of any document
function getTotalViewCount() {
    getTotalLikes();
    var Html_Design = '';
    var Query = "?$filter=DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and Views eq 'Yes'&$select=*,ViewsBy/Title,ViewsBy/EMail,ViewsBy/ID&$expand=ViewsBy";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (QueryResult) {
        $("#TotalHits").text(QueryResult.length);
        if(QueryResult.length > 0) {
            for(var i=0; i < QueryResult.length; i++) {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(QueryResult[i].ViewsBy.EMail);
                Html_Design = Html_Design + "<li class='likes-box'>" +
	    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='"+attachment+"'></div>"+
											"<div class='like-user-name'>"+
											"<h4>"+QueryResult[i].ViewsBy.Title+"</h4>"+
											"</div>"+
											"</li>";
            }
            $("#ViewHitList").empty().append(Html_Design);
        }
        else {
            Html_Design = Html_Design + "<li class='likes-box'>" +
	                                           "<div class='comment-reply-user-name' style='width:212px !important;border-radius:3% !important'>"+
	                                           "<h4>No views!!</h4>"+
	                                           "</div>"+
	                                           "</li>";
            $("#ViewHitList").empty().append(Html_Design);
        }
    });
}

//to get Total likes of any Document
function getTotalLikes() {
    var Html_Design = '';
    var Query = "?$filter= DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and Like eq 'Yes' &$select=LikeBy/Title,LikeBy/EMail,LikeBy/ID&$expand=LikeBy";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TotalLike) {
        $("#TotalLikes").text(TotalLike.length);
        if(TotalLike.length > 0) {
            for(var i=0; i<TotalLike.length; i++){ 		
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TotalLike[i].LikeBy.EMail);
                Html_Design = Html_Design + "<li class='likes-box'>" +
    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='"+attachment+"'></div>"+
										"<div class='like-user-name'>"+
										"<h4>"+TotalLike[i].LikeBy.Title+"</h4>"+
										"</div>"+
										"</li>";
            }
            $("#Likeshitlist").empty().append(Html_Design);
        }
        else {
            Html_Design = Html_Design + "<li class='likes-box'>" +
	                                       "<div class='comment-reply-user-name' style='width:212px !important;border-radius:3% !important'>"+
	                                       "<h4>No Likes!!</h4>"+
	                                       "</div>"+
	                                       "</li>";
            $("#Likeshitlist").empty().append(Html_Design);
        }
    });
}

//to like any Document
function TriggerLikes() {
    var Query = "?$filter=((Author/EMail eq ('" + _spPageContextInfo.userEmail + "') and DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "') and (Like eq 'Yes' or Like eq 'No'))&$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (QueryResult) {
        var listName = "DocumentComments";
        if (QueryResult.length > 0) {
            if (QueryResult[0].Like == "No") {
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Like': 'Yes', 'LikeById': parseInt(_spPageContextInfo.userId) };
                var Res = DocCommentUpdate(listName, item, QueryResult[0].ID);
            }
            else if (QueryResult[0].Like == "Yes") {
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Like': 'No', 'LikeById': parseInt(_spPageContextInfo.userId) };
                var Res = DocCommentUpdate(listName, item, QueryResult[0].ID);
            }

            var Query = "?$filter= DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and Like eq 'Yes' &$select=LikeBy/Title,LikeBy/EMail,LikeBy/ID&$expand=LikeBy";
            $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TotalLike) {
                if (TotalLike.length > 0) {
                    $("#TotalLikes").text(TotalLike.length);
                    $("#Likeshitlist").empty();
                    var Html_Design = "";
                    for (var i = 0; i < TotalLike.length; i++) {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TotalLike[i].LikeBy.EMail);
                        Html_Design = Html_Design + "<li class='likes-box'>" +
                                                "<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='" + attachment + "'></div>" +
                                                "<div class='like-user-name'>" +
                                                "<h4>" + TotalLike[i].LikeBy.Title + "</h4>" +
                                                "</div>" +
                                                "</li>";
                    }
                    $("#Likeshitlist").append(Html_Design);
                }
                else {
                    $("#TotalLikes").text("0");
                    $("#Likeshitlist").empty();
                }
            });
        }
        if ($(".like-img").attr("src") == "../SiteAssets/Biography/Experience/assets/images/like-icon.png" || $(".like-img").attr("src").includes('like-icon.png') == true) {
            $('#like-Img-color').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png");
        }
        else {
            $('#like-Img-color').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon.png");
        }
        if ($("#likes").hasClass("active") == true) {
            $('#TotalLikes').trigger('click');
        }
    });
}

//Open Comment Reply mode
function ActiveReplyCtrl(ControlId) {
    FileCommentType = "Reply";
    var Query = "?$select=*&$filter=ID eq '" + ControlId + "'";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Items) {
        if (Items.length > 0) {
            $("#ReplyforMsg").html(Items[0].Comments);
            $("#ReplyforMsg").attr('value', Items[0].Comments);

            if (Items[0].Initials == "Reply") {
                $("#replyforuser").text(Items[0].ReplyTo);
            }
            else {
                $("#replyforuser").text($("#Username" + ControlId).text());
            }
        }
    });
    $("#replyTextarea").show();
}

//Close Comment Reply mode
function DeActiveReplyControl() {
    FileCommentType= "Parent";
    $("#replyTextarea").hide();
    $(".emojionearea-editor").empty();
    $("#NewAttachmentFiles").empty();
}

//get all the users who likes the comment
function GetAllLikesComment(RecId) {
    var Query = "?$select=*,Author/EMail,Author/Title,Author/Id&$expand=Author&$filter= DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and LikeComment eq 'Yes' and LikeCommentID eq '" + RecId + "'";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Items) {
        if (Items.length > 0) {
            $("#CommentLikeList").empty();
            var Html_Design = "";
            for (var i = 0; i < Items.length; i++) {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Items[i].Author.EMail);
                Html_Design = Html_Design + "<li class='likes-box'>" +
                                    "<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='" + attachment + "'></div>" +
                                    "<div class='like-user-name'>" +
                                    "<h4>" + Items[i].Author.Title + "</h4>" +
                                    "</div>" +
                                    "</li>";
            }
            $("#CommentLikeList").append(Html_Design);
        }
        else {
            $("#CommentLikeList").empty();
        }
        $("#showInnerLikes").removeClass("show-inner-likes-box-hide");
    });
}

//update Document comments list metadata
function DocCommentUpdate(listName, item, dataid) {
    var Responce = "";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + dataid + "')",
        type: "POST",
        async: false,
        data: JSON.stringify(item),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data) {
            console.log("Done");
            Responce = data;

        },
        error: function (data) {
            Responce = data;
            console.log(data);
            alert("An error occurred. Please contact your system administrator / Refresh a WebPage !");
        }
    });
    return Responce;
}
//-------------------------------------------Document Comments code ends---------------------------------

