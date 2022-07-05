var dropZoneAnnId = "drop-zone-Anncmnt";
var dropZoneAnn = $("#" + dropZoneAnnId);
var inputFileAnn = $("#AnnoncmntUpload");
var finalFilesAnn = [];
var Files4UploadAnn = [];
var TcounterAnn = 0;
var RemoveDuplicateAnn = [];
var xRequestDigest = $("#__REQUESTDIGEST").val();
var AnnItemID = ''
var AnnType = '';
var ModifyAnnRecId = 0;
var CommentTypeAnn = "Parent";
var AnncmntURL = '';
var getLatestAnnId = '';
$(document).ready(function () {
    $("#AnnoncmntUpload").on('change', function (e) {
        Files4UploadAnn = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            finalFilesAnn[finalFilesAnn.length] = elm;
        });

        RemoveDuplicateAnn = [];
        var arr = finalFilesAnn.filter(function (el) {
            if (RemoveDuplicateAnn.indexOf(el.name) == -1) {
                RemoveDuplicateAnn.push(el.name);
                return true;
            }
            return false;
        });

        Files4UploadAnn = ReinitializeAnnArray(arr);
        $('#NewAttachmentFilesAnncmnt').empty();
        var ChangedfileName = '';

        for (initial; initial < Files4UploadAnn.length; initial++) {
            if (RemoveDuplicateAnn[initial].length > 15) {
                ChangedfileName = RemoveDuplicateAnn[initial].substring(0, 15) + "...";
                $('#NewAttachmentFilesAnncmnt').append('<div class="comment-upload-chip" title="' + RemoveDuplicateAnn[initial] + '" id="file_' + TcounterAnn + '"> <span class="comment-box-chip-text-box">' + ChangedfileName + ' </span> <span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeAnnLine(this.id);" id="file_' + TcounterAnn + '"" title="remove"></span></div>');
            }
            else {
                $('#NewAttachmentFilesAnncmnt').append('<div class="comment-upload-chip" title="' + RemoveDuplicateAnn[initial] + '" id="file_' + TcounterAnn + '"> <span class="comment-box-chip-text-box">' + RemoveDuplicateAnn[initial] + '</span> <span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeAnnLine(this.id);" id="file_' + TcounterAnn + '"" title="remove"></span></div>');
            }
            TcounterAnn = TcounterAnn + 1;
        }
        inputFileAnn.val('');
    });

    $("#scrollChatAnn").click(function () {
        $("#ToastPopupAnn").hide();
        $('#hideCommentScrollAnncmnt').scrollTop($('#reply_areaAnncmnt')[0].scrollHeight);
    });

    $("#saveAnncmntChat").click(function () {
        PushAnnRootComment();
    });


    setInterval(function () {
        if ($("#Announcement_Alert").css("display") != "none") {
            setTimeout(function () {
                AutoRefreshAnnComments('GetAll', '');
            }, 2000);
        }
    }, 5000);

    $("#TotalCommentsAnncmnt").click(function () {
        GetAnnComments('GetAll', ''); 
        $("#commentsAnncmnt").addClass("active in");
		$("#viewsAnncmnt").removeClass("active in");
		$("#likesAnncmnt").removeClass("active in");      
    });

    $("#TotalLikesAnncmnt").click(function () {
        getAnnLikedUsers();
        $("#commentsAnncmnt").removeClass("active in");
		$("#viewsAnncmnt").removeClass("active in");
		$("#likesAnncmnt").addClass("active in");
    });

    $("#likeCloseBox").click(function () {
        $("#showInnerLikesAnncmnt").addClass("show-inner-likes-box-hide");
    });

    $("#TotalHitsAnncmnt").click(function () {
        getAnnViewedUsers();
        $("#commentsAnncmnt").removeClass("active in");
		$("#viewsAnncmnt").addClass("active in");
		$("#likesAnncmnt").removeClass("active in");
    });
    $("#replyHideAnncmnt").click(function () {
        $("#replyTextareaAnncmnt").hide();
    });
    $("#like-Img-color-Anncmnt").click(function () {
        TriggerAnnLikes();
    });
    $("#seemorebtnGeneralAnncmnt").click(function () {
        ReadAnnComment('GetAll', 'Logged_InUser', AnncmntURL, 'ViewMore');
    });
    $("#likeCloseBoxAnncmnt").click(function(){ 
		$("#showInnerLikesAnncmnt").toggleClass("show-inner-likes-box-hide"); 
	});
	$(".like-img").click(function () {
		var src = $(this).attr('src');
		var newsrc = (src == '../SiteAssets/Biography/Experience/assets/images/like-icon.png') ? '../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' : '../SiteAssets/Biography/Experience/assets/images/like-icon.png';
	});

});

function ReinitializeAnnArray(arr) 
{
    var newArr = [];
    var count = 0;
    for (var i=0; i<arr.length; i++) 
    {
        newArr[count++] = arr[i];
    }
    return newArr;	
}
function removeAnnLine(id)
{
    var index = id.split('_')[1];
    $("#"+id).remove();
    delete finalFilesAnn[parseInt(index)]; 
    RemoveDuplicateAnn = [];
    var arr = finalFilesAnn.filter(function(el) {
        if (RemoveDuplicateAnn.indexOf(el.name) == -1) {
            RemoveDuplicateAnn.push(el.name);
            return true;
        }
        return false;
    });
    Files4UploadAnn = ReinitializeAnnArray(arr);
    if(arr.length == 0) {
        inputFileAnn.val('');
    }
}


//get all the users info who viewed the post
function getAnnViewedUsers() {
    var Html_Design = '';
    var Query = "?$top=5000&$filter= WebPartName eq '"+AnnType+"' and Item_ID eq '"+AnnItemID+"' and Views eq 'Yes' &$select=UserImage,ViewsBy/Title,ViewsBy/EMail,ViewsBy/ID&$expand=ViewsBy";
    var dfds = $.Deferred(),
		url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items" + Query;
    var QueryResult = getAllRecords(url, dfds);
    AnnResponse = [];
    $("#ViewHitListAnncmnt").html("");
    $("#TotalHitsAnncmnt").text(QueryResult.length);
    if(QueryResult.length>0){
        for(var i=0; i<QueryResult.length; i++)
        {
            Html_Design = Html_Design + "<li class='likes-box'>" +
    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='"+QueryResult[i].UserImage+"'></div>"+
										"<div class='like-user-name'>"+
										"<h4>"+QueryResult[i].ViewsBy.Title+"</h4>"+
										"</div>"+
										"</li>";
        }
        $("#ViewHitListAnncmnt").append(Html_Design);
    }
    else {
        Html_Design = Html_Design + "<li class='likes-box'>" +
                                           "<div class='comment-reply-user-name' style='width:212px !important;border-radius:3% !important'>"+
                                           "<h4>No users viewed!!</h4>"+
                                           "</div>"+
                                           "</li>";
        $("#ViewHitListAnncmnt").append(Html_Design);
    }
}

//get all the users info who liked the post
function getAnnLikedUsers() {
    var Html_Design = '';
    var Query = "?$top=5000&$filter= WebPartName eq '"+AnnType+"' and Item_ID eq '"+AnnItemID+"' and Like eq 'Yes' &$select=UserImage,LikeBy/Title,LikeBy/EMail,LikeBy/ID&$expand=LikeBy";;
    var dfds = $.Deferred(),
		url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items" + Query;
    var QueryResult = getAllRecords(url, dfds);
    AnnResponse = [];
    $("#LikeshitlistAnncmnt").html("");
    $("#TotalLikesAnncmnt").text(QueryResult.length);
    if(QueryResult.length>0){
        //$('#like-Img-color-Anncmnt').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png");
        for(var i=0; i<QueryResult.length; i++)
        {
        	if(QueryResult[i].LikeBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()){
        		$('#like-Img-color-Anncmnt').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png");
        	}
            Html_Design = Html_Design + "<li class='likes-box'>" +
    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='"+QueryResult[i].UserImage+"'></div>"+
										"<div class='like-user-name'>"+
										"<h4>"+QueryResult[i].LikeBy.Title+"</h4>"+
										"</div>"+
										"</li>";
        }
        $("#LikeshitlistAnncmnt").append(Html_Design);
    }
    else {
        $('#like-Img-color-Anncmnt').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon.png");
        Html_Design = Html_Design + "<li class='likes-box'>" +
                                           "<div class='comment-reply-user-name' style='width:212px !important;border-radius:3% !important'>"+
                                           "<h4>No users liked!!</h4>"+
                                           "</div>"+
                                           "</li>";
        $("#LikeshitlistAnncmnt").append(Html_Design);
    }
}


//Load chatting for Alert/Announcement
function LoadChatting(WebPart, ItemId, ViewCount, LikeCount, ComentsCount) {
	//make textbox to chat box
	$("#commentTextAnncmnt").emojioneArea({
        pickerPosition: "right",
        tonesStyle: "bullet",
        events: {
            keyup: function (editor, event) {

            }
        }
    });
	$("#replyTextareaAnncmnt").hide();
	$("#commentsAnncmnt").addClass("active in");
	$("#viewsAnncmnt").removeClass("active in");
	$("#likesAnncmnt").removeClass("active in");
    AnnItemID = ItemId.toString();
    AnnType = WebPart;
    if (LikeCount != null && LikeCount != "" && LikeCount != "null") {
        //$('#like-Img-color-Anncmnt').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png");
        if(IsUserLikedAnn() == true){
        	$('#like-Img-color-Anncmnt').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png")
    	}
    	else{
        	$('#like-Img-color-Anncmnt').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon.png")
    	}
    }
    else {
        $('#like-Img-color-Anncmnt').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon.png")
    }

    $("#TotalHitsAnncmnt").text(ViewCount ? ViewCount : "0");
    $("#TotalLikesAnncmnt").text(LikeCount ? LikeCount : "0");
    $("#TotalCommentsAnncmnt").text(ComentsCount ? ComentsCount : "0");
    $(".emojionearea-editor").empty();
    $("#CommentsAreaAnncmnt").empty();
    $("#oldfilenameAnncmnt").empty();
    AddAnnViewCount(WebPart, ItemId);
}

//Increase View Count when open the popup for first time
function AddAnnViewCount(Type, ItemId) {
    var Query = "?$expand=Author&$top=5000&$select=*,Author/EMail&$filter=(Author/EMail eq ('" + _spPageContextInfo.userEmail + "') and WebPartName eq '" + Type + "' and Item_ID eq '" + ItemId + "' and (Views eq 'Yes' or Views eq 'No'))",
        dfds = $.Deferred(),
        listName = "AnnouncementsChild",
        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items" + Query;
    var FilterResult = getAllRecords(url, dfds);
    AnnResponse = [];
    if (FilterResult.length > 0) {
        if (FilterResult[0].Views == "No") {
            var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Item_ID': ItemId.toString(), 'WebPartName': Type, 'Views': 'Yes', 'ViewsById': parseInt(_spPageContextInfo.userId), 'UserImage': currentUserProfileData[0].ProfilePic };
            var Res = AnnouncmntUpdate(listName, item, FilterResult[0].ID);
        }
    }
    else if (FilterResult.length == 0) {
        var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Item_ID': ItemId.toString(), 'WebPartName': Type, 'Views': 'Yes', 'ViewsById': parseInt(_spPageContextInfo.userId), 'UserImage': currentUserProfileData[0].ProfilePic };
        AnnouncmntInsert(listName, item);
        $("#TotalHitsAnncmnt").text(parseInt($("#TotalHitsAnncmnt").text()) + 1);
    }
    GetAnnComments("PageLoad", '');
}


//Add Like/View/Chat-Msg in list for Alert/Announcement chatting
function AnnouncmntInsert(listName, item, ControlID) {
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
        success: function (data) {
            if (Files4UploadAnn.length > 0) {
				uploadattachmentAnn(data.d.ID);            
			}
            else if (ControlID == undefined) {

            }
            else {
                AutoRefreshAnnComments('GetAll', 'Logged_InUser');
	            Files4UploadAnn = [];
	            $('.emojionearea-editor').empty();
	            $("#replyTextareaAnncmnt").hide();
	            $("#NewAttachmentFilesAnncmnt").empty();
	            inputFileAnn.val('');
	            finalFilesAnn = [];

            }
        },
        error: function (data) { console.log(data); }
    });
}

//Update Like/View/Chat-Msg in list for Alert/Announcement chatting
function AnnouncmntUpdate(listName, item, dataid) {
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

//upload attachment in Alert/Announcement chatting
function uploadattachmentAnn(id, ControlID) {
    var counter = 0;
    if (Files4UploadAnn.length > 0) {
        $.each(Files4UploadAnn, function (index, value) {
            getFileBufferAnn(value).then(function (buffer) {
                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig, "");
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": xRequestDigest
    				},
                    success: function (data) {
                        counter = counter + 1;
                        if (Files4UploadAnn.length == counter) {
                            AutoRefreshAnnComments('GetAll', 'Logged_InUser');
				            Files4UploadAnn = [];
				            $('.emojionearea-editor').empty();
				            $("#replyTextareaAnncmnt").hide();
				            $("#NewAttachmentFilesAnncmnt").empty();
				            inputFileAnn.val('');
				            finalFilesAnn = [];
                        }
                    },
                    error: function (data) {
                        console.log(data.responseText.error);
                    }
                });
            });
        });
    }
    else {
        //GetComments('', "Logged_InUser");
    }
}

var getFileBufferAnn = function (Files4UploadAnn) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }

    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(Files4UploadAnn);
    return deferred.promise();
};

//Add msg to chatbox and list
function PushAnnRootComment() {
    var comment = $(".emojionearea-editor").html();
    comment = comment.trim();
    var listName = "AnnouncementsChild";
    if (comment != "") {
        if (CommentTypeAnn == "Parent") {
            var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Item_ID': AnnItemID, 'WebPartName': AnnType, 'ReplierId': parseInt(_spPageContextInfo.userId), 'Comment': $(".emojionearea-editor").html(), 'Initials': "Parent", 'ReplyforId': parseInt(_spPageContextInfo.userId), 'UserImage': currentUserProfileData[0].ProfilePic };
            AnnouncmntInsert(listName, item, '0');
        }
        else if (CommentTypeAnn == "Reply") {
            var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Item_ID': AnnItemID, 'WebPartName': AnnType, 'ReplierId': parseInt(_spPageContextInfo.userId), 'Comment': $(".emojionearea-editor").html(), 'Initials': "Reply", 'ReplyTo': $("#replyforuserAnncmnt").text(), 'ReplyAgainst': $("#ReplyforMsgAnncmnt").attr('value'), 'UserImage': currentUserProfileData[0].ProfilePic };
            AnnouncmntInsert(listName, item, '0');
            CommentTypeAnn = "Parent";
        }
        else if (CommentTypeAnn == "Modify") {
            UpdateEditAnnComment(ModifyAnnRecId);
        }
        $('#hideCommentScrollAnncmnt').scrollTop($('#reply_areaAnncmnt')[0].scrollHeight);
    }
    else {
        alert("Please type a message to continue.");
    }
}

function UpdateEditAnnComment(RecID) {
    var Comment = $(".emojionearea-editor").html();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/items(" + RecID + ")",
        type: "POST",
        async: false,
        data: JSON.stringify
        ({
            __metadata:
            {
                type: "SP.Data.AnnouncementsChildListItem"
            },
            Comment: Comment
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
            if (Files4UploadAnn.length > 0) {
                EditAnnAttachment(RecID);
            }
            else {
                RetriveAnnUpdateData(RecID);
                Files4UploadAnn = [];
            }
            $("#CommentTextAnn" + RecID).html($(".emojionearea-editor").html());
            CommentTypeAnn = "Parent";
            $("#NewAttachmentFilesAnncmnt").empty();
            finalFilesAnn = [];
            $("#oldfilenameAnncmnt").empty();
            $('.emojionearea-editor').empty();
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
}

function EditAnnAttachment(id) {
    var xRequestDigest = $("#__REQUESTDIGEST").val();
    var counter = 0;
    if (Files4UploadAnn.length > 0) {
        $.each(Files4UploadAnn, function (index, value) {
            getFileBufferAnn(value).then(function (buffer) {
                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig, "");
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": xRequestDigest
    				},
                    success: function (data) {
                        counter = counter + 1;
                        if (counter == Files4UploadAnn.length) {
                            RetriveAnnUpdateData(id);
                        }
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            });
        });
    }
}

function RetriveAnnUpdateData(RecID) {
    var Query = "$filter=ID eq '" + RecID + "'&$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?" + Query + "";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var Items = "";
            Items = data.d.results;
            if (Items.length > 0) {
                $('#CommentTextAnn' + Items[0].ID).html(Items[0].Comment);
                $("#AttachmentlistAnn" + Items[0].ID).empty();
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
                            Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Image'> <span class='pr-8 chip-text-box'><img src='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' title=" + Items[0].AttachmentFiles.results[y].FileName + " onclick='previewImage(this);'></img></div>";
                        }
                        else {
                            Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Others'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/file.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                        }
                    }
                    $("#AttachmentlistAnn" + Items[0].ID).append(Attachmentdesign);
                }
            }
        },
        error: function (data) {
            console.log("An error occurred. Please try again.");
        }
    });
}


function getdata(Query)
{
    var ResultItems=[];
    var Ownurl = Query;//_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ContactCenter')/items?"+Query+"";  
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
            console.log("Error in getdata.");
        	console.log(data); 
        }  
    });
    return ResultItems;
}


function AutoRefreshAnnComments(Action, Source) {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('AnnouncementsChild')/Items?$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=Created desc&$top=50&$skipToken=Paged=TRUE%26p_ID=" + getLatestAnnId + "&$filter= (WebPartName eq '"+AnnType +"' and Item_ID eq '"+AnnItemID +"' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    var QueryResult = ExecuteAnnFilter(Ownurl, Action, Source);
}

function GetAnnComments(Action, Source) {
	var OwnurlAnnouncements = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,Author/Title,TeamMembers/Title,TeamMembers/EMail,AttachmentFiles,category/CatogeryName&$expand=Author,TeamMembers/ID,AttachmentFiles,category&$filter=ID eq ('" + AnnItemID + "')";
	var ResultOwnurlAnnouncements = getdata(OwnurlAnnouncements);
	
	if(ResultOwnurlAnnouncements.length>0)
	{
		var AllowComments = ResultOwnurlAnnouncements[0].Related_Word;
        if(AllowComments == "Allowed")
        {
        	$(".main-chat-text-area").css("display", "block");
           	$(".home-announce-alert-chat-area").css("display", "block");
        }
        else if(AllowComments == "Not Allowed")
        {
           	$(".home-announce-alert-chat-area").css("display", "none");
        }
        else if(AllowComments == "Stop")
        {
          	$(".main-chat-text-area").css("display", "none");
           	$(".home-announce-alert-chat-area").css("display", "block");
        }
        else
        {
          	$(".home-announce-alert-chat-area").css("display", "none");
        }
    }
	else
	{
	
	}
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('AnnouncementsChild')/Items?$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=Created desc&$top=50&$filter= (WebPartName eq '" + AnnType + "' and Item_ID eq '" + AnnItemID + "' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    var QueryResult = ExecuteAnnFilter(Ownurl, Action, Source);
}

function ExecuteAnnFilter(_query, Action, Source) {
    AnnResponse = [];
    var tempURL = '';
    if (_query.indexOf("$skipToken") != -1) {
        tempURL = _query;
    }
    else {
        AnncmntURL = tempURL = _query;
    }
    ReadAnnComment(Action, Source, tempURL, '');
}

function ReadAnnComment(Action, Source, URL, IsViewMore) 
{
    $.ajax({
        url: URL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {	
            CommentTypeAnn == "Parent";
            AnnResponse= AnnResponse.concat(data.d.results);
            AnnResponse.sort((a, b) => a.ID - b.ID);                      
            if(AnnResponse.length > 0){ 
                if(getLatestAnnId != AnnResponse[(AnnResponse.length -1)].Id && Action == "GetAll" && $("#hideCommentScrollAnncmnt").scrollTop() < -5 && Source != "Logged_InUser") {
                    $("#ToastPopupAnn").show();
                }
                if(IsViewMore != "ViewMore"){
                    getLatestAnnId = AnnResponse[(AnnResponse.length -1)].Id;  
                }
            }     
            if(AnnResponse.length>0)
            {      
                if(URL.indexOf("$skipToken") != -1) {
                    //'skiptoken' substring found
                    DesignAnnChatting(AnnResponse, 'refreshMode');
                }
                else {
                    //no 'skiptoken' substring
                    DesignAnnChatting(AnnResponse, '');
                }
            }
            else
            {
                //$("#CommentsData").empty();
            }

            if (data.d.__next) 
            {
                AnncmntURL = data.d.__next;
                $("#seemorebtnGeneralAnncmnt").css("display", "block");
            }
            else 
            {
                if(URL.indexOf("$skipToken") == -1) {
                    $("#seemorebtnGeneralAnncmnt").css("display", "none");
                }
            }
            if(Action != "PageLoad"){
                GetTotalAnnComments(Action);
            }
            AnnResponse = [];
        },
        error: function (data) 
        {
            console.log(data);
        }
    });
}










function DesignAnnChatting(QueryResult, Mode)
{
    var Commenthtmldesign='';
    var Attachmnetlist=[];
    var AttachmnetIDs=[];
    var CommentLikeValue = 'Like';
    for(var i=0; i<QueryResult.length; i++)
    {
        var likesCount = QueryResult[i].LikeCount;
        var DisplayLikeDiv = "inline-block";
        if(likesCount == null || likesCount == '0')
        {
            likesCount = 0;
            DisplayLikeDiv = "none";
        }
        else
        {
            likesCount = QueryResult[i].LikeCount;
            DisplayLikeDiv = "inline-block";
        }
        if(Mode != "refreshMode"){
            CommentLikeValue = checkLikeAnnCommentUser(QueryResult[i].Id);
        }
        var eventDateObj=new Date(QueryResult[i].Created);
        var Event_time = eventDateObj.toTimeString();
        var H = +Event_time.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? " AM" : " PM";
        Event_time= h + Event_time.substr(2, 3) + ampm;	
        if(AnnResponse[i].Initials == "Parent")
        {			
            if(_spPageContextInfo.userEmail.toLowerCase() == AnnResponse[i].Author.EMail.toLowerCase())
            {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-my' id='CommentDivRecNoAnn"+QueryResult[i].ID+"'>"+
	                    								"<div class='col-md-12 col-sm-12 pl0 pr0 pb10'>"+
	                      									"<span>"+formatDateComment(QueryResult[i].Created)+"</span> at <span> "+Event_time+"</span><span id='LikeSpanAnn"+QueryResult[i].ID+"' style='display:"+DisplayLikeDiv+"'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCountAnn"+QueryResult[i].ID+"' onclick='GetAllAnnLikesComment("+QueryResult[i].ID+")'>"+likesCount+"</span></span>"+
	                    								"</div>"+
	                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>"+
	                      									"<div>"+
	                        									"<div id='editMenuOpen2' class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>"+
	                          										"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>"+
	                        									"</div>"+
	                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>"+
	                          										"<li><a type='button' onclick='EditAnnComment("+QueryResult[i].ID+")'>Edit</a></li>"+
	                          										"<li><a type='button' class='logout' onclick='DeleteAnnComments("+QueryResult[i].ID+")' >Delete</a></li>"+
	                        									"</ul>"+
	                      									"</div>"+
	                      									"<div class='my-chat-edit-delete-panel-inside' id='CommentTextAnn"+QueryResult[i].ID+"'>"+QueryResult[i].Comment+"</div>"+
	                    								"</h4>"+
	                    								"<div class='col-md-12 col-sm-12 p0'>"+
	                      									"<div class='attachment-badge chip-box' id='AttachmentlistAnn"+QueryResult[i].ID+"'>"+
	                      									"</div>"+
	                    								"</div>"+
	                    								"<div class='clearfix'></div>"+
	                  								"</div>";
            }
            else
            {
                Commenthtmldesign = Commenthtmldesign +	"<div class='col-md-12 col-sm-12 reply-box-ext' id='CommentDivRecNoAnn"+QueryResult[i].ID+"'>"+
	                    								"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'> <span class='mr10'><img src='"+QueryResult[i].UserImage+"' class='img-circle chat-user-image' width='30' height='30' data-themekey='#'></span><span class='b-500' id='UsernameAnn"+QueryResult[i].ID+"'>"+QueryResult[i].Author.Title+"</span><span class='pl5 pr5'>-</span><span>"+formatDateComment(QueryResult[i].Created)+"</span> at <span> "+Event_time+"</span><span id='LikeSpanAnn"+QueryResult[i].ID+"' style='display:"+DisplayLikeDiv+"'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCountAnn"+QueryResult[i].ID+"' onclick='GetAllAnnLikesComment("+QueryResult[i].ID+")'>"+likesCount+"</span></span> </div>"+
	                    									"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>"+
	                      										"<div class='mt-4 my-chat-edit-delete-panel-inside' id='CommentTextAnn"+QueryResult[i].ID+"'>"+QueryResult[i].Comment+"</div>"+
	                      											"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>"+
	                          											"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>"+
	                        										"</div>"+
	                        										"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>"+
	                          											"<li><button id='messageEdit' type='button' class='btn LikeCmntAnn"+QueryResult[i].ID+"' data-toggle='collapse' data-target='#messageReplyBox' aria-expanded='false' onclick='PushlikeforAnnComment("+QueryResult[i].ID+")'>"+CommentLikeValue+"</button></li>"+
	                          											"<li><a class='logout' onclick='ActiveAnnReplyCtrl("+QueryResult[i].ID+")'>Reply</a></li>"+
	                        										"</ul>"+
	                    									"</h4>"+
	                    									"<div class='col-md-12 col-sm-12 p0'>"+
	                      										"<div class='attachment-badge chip-box' id='AttachmentlistAnn"+QueryResult[i].ID+"'>"+
	                      										"</div>"+
	                    									"</div>"+
	                    									"<div class='clearfix'></div>"+
														"</div>";		
            }
        }
        else if(AnnResponse[i].Initials == "Reply")
        {
            if(_spPageContextInfo.userEmail.toLowerCase() == AnnResponse[i].Author.EMail.toLowerCase())
            {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-my' id='CommentDivRecNoAnn"+QueryResult[i].ID+"'>"+
	                    								"<div class='col-md-12 col-sm-12 pl0 pr0 pb10'>"+
	                      									"<span>"+formatDateComment(QueryResult[i].Created)+"</span> at <span> "+Event_time+"</span><span id='LikeSpanAnn"+QueryResult[i].ID+"' style='display:"+DisplayLikeDiv+"'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCountAnn"+QueryResult[i].ID+"' onclick='GetAllAnnLikesComment("+QueryResult[i].ID+")'>"+likesCount+"</span></span>"+
	                    								"</div>"+
	                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel others-reply-text-box'>"+
	                      									"<div class='reply-text-line'>"+
	                        									"<a href='#' class='comment-reply-user-name-info'>@<span >"+AnnResponse[i].ReplyTo+"</span> :</a>"+
	                        									"<span class='replymsgAnn'>"+AnnResponse[i].ReplyAgainst+"</span>"+
	                        									"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>"+
	                          										"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>"+
	                        									"</div>"+
	                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>"+
	                          										"<li><a type='button' onclick='EditAnnComment("+QueryResult[i].ID+")'>Edit</a></li>"+
	                          										"<li><a class='logout' onclick='DeleteAnnComments("+QueryResult[i].ID+")'>Delete</a></li>"+
	                        									"</ul>"+
	                      									"</div>"+
	                      									"<div class='mt-14'>"+
	                        									"<div class='reply-text-box my-chat-edit-delete-panel-inside reply-inside-text-box' id='CommentTextAnn"+QueryResult[i].ID+"'>"+
	                          										""+AnnResponse[i].Comment+""+
	                        									"</div>"+
	                      									"</div>"+
	                    								"</h4>"+
	                    								"<div class='col-md-12 col-sm-12 p0'>"+
	                      									"<div class='attachment-badge chip-box' id='AttachmentlistAnn"+QueryResult[i].ID+"'>"+
	                      									"</div>"+
	                    								"</div>"+
	                    								"<div class='clearfix'></div>"+
	                  								"</div>";		
		
            }
            else
            {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-ext'>"+
		                    								"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'> <span class='mr10'><img src='"+QueryResult[i].UserImage+"' class='img-circle chat-user-image' width='30' height='30'></span> <span class='b-500' id='UsernameAnn"+QueryResult[i].ID+"'>"+QueryResult[i].Author.Title+"</span><span class='pl5 pr5'>-</span><span>"+formatDateComment(QueryResult[i].Created)+"</span> at <span> "+Event_time+"</span><span id='LikeSpanAnn"+QueryResult[i].ID+"' style='display:"+DisplayLikeDiv+"'><span><img class='msg-like-img' src='../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png'></span><span class='countInnerLikes' id='LikesCountAnn"+QueryResult[i].ID+"' onclick='GetAllAnnLikesComment("+QueryResult[i].ID+")'>"+likesCount+"</span></span> </div>"+
		                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>"+
		                      									"<div class='reply-text-line'><a href='javascript:void(0);' class='comment-reply-user-name-info'>@<span >"+AnnResponse[i].ReplyTo+"</span> :</a><span class='replymsgAnn'>"+AnnResponse[i].ReplyAgainst+"</span>"+
		                      										"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>"+
		                          										"<img src='../SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz'>"+
		                        									"</div>"+
		                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>"+
		                          										"<li><a type='button' class='LikeCmntAnn"+QueryResult[i].ID+"' onclick='PushlikeforAnnComment("+QueryResult[i].ID+")'>"+CommentLikeValue+"</a></li>"+
		                          										"<li><a type='button' onclick='ActiveAnnReplyCtrl("+QueryResult[i].ID+")'>Reply</a></li>"+
		                        									"</ul>"+
		                        								"</div>"+
		                        								"<div class='mt-14'>"+
			                        								"<div class='reply-text-box my-chat-edit-delete-panel-inside reply-inside-text-box' id='CommentTextAnn"+QueryResult[i].ID+"'>"+
			                          									""+AnnResponse[i].Comment+""+
			                        								"</div>"+
		                      									"</div>"+
		                    								"</h4>"+
		                    								"<div class='col-md-12 col-sm-12 p0'>"+
		                      									"<div class='attachment-badge chip-box' id='AttachmentlistAnn"+QueryResult[i].ID+"'>"+
		                      									"</div>"+
		                    								"</div>"+
		                    								"<div class='clearfix'></div>"+
	                  									"</div>";					  
			
            }
        }
		
        if(QueryResult[i].AttachmentFiles.results.length>0)
        {
            AttachmnetIDs.push(QueryResult[i].ID);
            for(var j=0; j<QueryResult[i].AttachmentFiles.results.length; j++)
            {
                Attachmnetlist.push({
                    RecordId: QueryResult[i].ID,
                    FileName: QueryResult[i].AttachmentFiles.results[j].FileName,
                    ServerRelativeUrl: QueryResult[i].AttachmentFiles.results[j].ServerRelativeUrl,
                });
            }		
        }
	
    }
    //$("#CommentsArea").empty();
    if(Mode == "refreshMode"){
        $("#CommentsAreaAnncmnt").append(Commenthtmldesign);
    }
    else {
        $("#CommentsAreaAnncmnt").empty().append(Commenthtmldesign);
    }
    for(var k=0; k<AttachmnetIDs.length; k++)
    {	var RecId= AttachmnetIDs[k];
        var FilterResult = $.grep(Attachmnetlist, function(e){ return e.RecordId == AttachmnetIDs[k]; });
        var Attachmentdesign='';
        $("#AttachmentlistAnn"+RecId).empty();
        for(var p=0; p<FilterResult.length; p++)
        {
            if(FilterResult[p].FileName.indexOf("docx") != -1){
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Docx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/doc.png'></img><a name='" +FilterResult[p].ServerRelativeUrl+ "' onclick='previewfile(this);' href='javascript:void(0)'>"+FilterResult[p].FileName+"</a></span> <span class='chip-icon-box'> <a href='" +FilterResult[p].ServerRelativeUrl+ "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";		
            }
            else if(FilterResult[p].FileName.indexOf("pdf") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_PDF'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/pdf.png'></img><a name='" +FilterResult[p].ServerRelativeUrl+ "' onclick='previewfile(this);' href='javascript:void(0)'>"+FilterResult[p].FileName+"</a></span> <span class='chip-icon-box'> <a href='" +FilterResult[p].ServerRelativeUrl+ "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";		
            }
            else if(FilterResult[p].FileName.indexOf("xlsx") != -1 || FilterResult[p].FileName.indexOf("csv") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_xlsx'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/xls.png'></img><a name='" +FilterResult[p].ServerRelativeUrl+ "' onclick='previewfile(this);' href='javascript:void(0)'>"+FilterResult[p].FileName+"</a></span> <span class='chip-icon-box'> <a href='" +FilterResult[p].ServerRelativeUrl+ "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";		
            }

            else if(FilterResult[p].FileName.indexOf("jpg") != -1 || FilterResult[p].FileName.indexOf("jpeg") != -1 || FilterResult[p].FileName.indexOf("JPEG") != -1 || FilterResult[p].FileName.indexOf("png") != -1 || FilterResult[p].FileName.indexOf("PNG") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Image'> <span class='pr-8 chip-text-box'><img src='" +FilterResult[p].ServerRelativeUrl+ "' title="+FilterResult[p].FileName+" onclick='previewImage(this);'></img></div>";		
            }
						
            else {
                Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Others'> <span class='pr-8 chip-text-box'><img src='../SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/file.png'></img><a name='" +FilterResult[p].ServerRelativeUrl+ "' onclick='previewfile(this);' href='javascript:void(0)'>"+FilterResult[p].FileName+"</a></span> <span class='chip-icon-box'> <a href='" +FilterResult[p].ServerRelativeUrl+ "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";		
            }
        }
        
        $("#AttachmentlistAnn"+RecId).append(Attachmentdesign);
    }
	
    $(".countInnerLikes").click(function(){
        $("#showInnerLikesAnncmnt").toggleClass("show-inner-likes-box-hide");
    });
}


function ActiveAnnReplyCtrl(ControlId)
{
    CommentTypeAnn = "Reply";
    $("#replyforuserAnncmnt").text($("#UsernameAnn"+ControlId).text());
    var Query = "$filter=ID eq '"+ControlId+"'&$select=*";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            if(Items.length>0)
            {
                $("#ReplyforMsgAnncmnt").html(Items[0].Comment);
                $("#ReplyforMsgAnncmnt").attr('value', Items[0].Comment);    	
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
    $("#replyTextareaAnncmnt").show();
}














function PushlikeforAnnComment(RecordID)
{
    var Query = "?$top=5000&$filter= (AuthorId eq ('"+_spPageContextInfo.userId+"') and WebPartName eq '"+AnnType+"' and LikeCommentID eq '"+RecordID+"') and (LikeComment eq 'Yes' or LikeComment eq 'No')";
    var dfds = $.Deferred(),
		url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items" + Query;
    var QueryResult = getAllRecords(url, dfds);
    AnnResponse = [];
    if(QueryResult.length>0)
    {
        if(QueryResult[0].LikeComment == "No")
        {
            var OldLikes = $("#LikesCountAnn"+RecordID).text();
            $("#LikesCountAnn"+RecordID).text(parseInt(OldLikes)+1);
            if(parseInt(OldLikes)+1>0)
            {
                $("#LikeSpanAnn"+RecordID).css("display", "inline-block");
                $(".LikeCmntAnn"+RecordID).text("Unlike");
            }
            else
            {			
                $("#LikeSpanAnn"+RecordID).css("display", "none");
                $(".LikeCmntAnn"+RecordID).text("Like");
                
            }

            var listName="AnnouncementsChild";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'LikeComment':'Yes','UserImage':currentUserProfileData[0].ProfilePic};
            AnnouncmntUpdate(listName,item,QueryResult[0].ID);
        }
        else if(QueryResult[0].LikeComment == "Yes")
        {
            var OldLikes = $("#LikesCountAnn"+RecordID).text();
            $("#LikesCountAnn"+RecordID).text(parseInt(OldLikes)-1);
            if(parseInt(OldLikes)-1>0)
            {
                $("#LikeSpanAnn"+RecordID).css("display", "inline-block");
                $(".LikeCmntAnn"+RecordID).text("Like");
            }
            else
            {			
                $("#LikeSpanAnn"+RecordID).css("display", "none");
                $(".LikeCmntAnn"+RecordID).text("Like");
            }

            var listName="AnnouncementsChild";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'LikeComment':'No','UserImage':currentUserProfileData[0].ProfilePic };
            var Res = AnnouncmntUpdate(listName,item,QueryResult[0].ID);   
        }
        else if(QueryResult[0].LikeComment == null)
        {
            var OldLikes = $("#LikesCountAnn"+RecordID).text();
            $("#LikesCountAnn"+RecordID).text(parseInt(OldLikes)+1);
            if(parseInt(OldLikes)+1>0)
            {
                $("#LikeSpanAnn"+RecordID).css("display", "inline-block");
                $(".LikeCmntAnn"+RecordID).text("Unlike");
            }
            else
            {			
                $("#LikeSpanAnn"+RecordID).css("display", "none");
                $(".LikeCmntAnn"+RecordID).text("Like");
            }

            var listName="AnnouncementsChild";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'LikeComment':'Yes','UserImage':currentUserProfileData[0].ProfilePic};
            var Res = AnnouncmntUpdate(listName,item,QueryResult[0].ID);  
        }
    }
    else
    {	
        var OldLikes = $("#LikesCountAnn"+RecordID).text();
        $("#LikesCountAnn"+RecordID).text(parseInt(OldLikes)+1);
        if(parseInt(OldLikes)+1>0)
        {
            $("#LikeSpanAnn"+RecordID).css("display", "inline-block");
            $(".LikeCmntAnn"+RecordID).text("Unlike");
        }
        else
        {			
            $("#LikeSpanAnn"+RecordID).css("display", "none");
            $(".LikeCmntAnn"+RecordID).text("Like");
        }

        var listName="AnnouncementsChild";
        var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':RecordID.toString(),'WebPartName':AnnType,'LikeComment':'Yes','LikeCommentID':RecordID.toString(),'UserImage':currentUserProfileData[0].ProfilePic};
        AnnouncmntInsert(listName,item);    
    }
}


function DeleteAnnComments(RecordID)
{
    if (confirm('Are you sure to delete this comment ?')) 
    {
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/items("+RecordID+")",  
            type: "POST",
            async: true,  
            headers:  
        	{  
        	    "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        	    "IF-MATCH": "*",  
        	    "X-HTTP-Method": "DELETE"  
        	},  
            success: function(data, status, xhr)  
            {  
                $('#CommentDivRecNoAnn'+RecordID).hide();           	  
            },  
            error: function(xhr, status, error)  
            {  
                console.log(xhr.responseText);  
            }  
        });  
    } 
}


function EditAnnComment(RecID)
{
    CommentTypeAnn ="Modify";
    ModifyAnnRecId = RecID;
    var Query = "$filter=ID eq '"+RecID+"'&$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            if(Items.length>0)
            {
                $('.emojionearea-editor').html(Items[0].Comment);
                $("#oldfilenameAnncmnt").empty(); 
                if(Items[0].AttachmentFiles.results.length>0)
                {
                    var AttachmentDesign ='';
                    for(var y=0; y<Items[0].AttachmentFiles.results.length; y++)
                    {
                        AttachmentDesign = AttachmentDesign +"<div class='comment-upload-chip "+Items[0].ID+"-"+y+"'><span class='attachment-badge-name comment-box-chip-text-box'><a onclick='previewfile(this);' href='javascript:void(0)' name='" +Items[0].AttachmentFiles.results[y].ServerRelativeUrl+ "'><span>"+Items[0].AttachmentFiles.results[y].FileName+"</span></a></span><span class='Closebtn' id='ClosebtnAnn"+Items[0].ID+"'><i class='fa fa-close "+Items[0].ID+"' style='color:red;' id='"+Items[0].ID+"-"+y+"' value='"+Items[0].AttachmentFiles.results[y].FileName+"' onclick='DeleteAnnAttachment(this.id)'></i></span></div>";    	
                    }
                    $("#oldfilenameAnncmnt").append(AttachmentDesign); 
                } 	
            }
            else
            {
                $('.emojionearea-editor').empty();    		
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
}



function DeleteAnnAttachment(ItemId,filename) 
{
    var Dfd = $.Deferred();
    var dataID = ItemId.split("-");
    var DocumentName =$("#"+ItemId).attr('value');
    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/GetItemById(" + dataID[0]+ ")/AttachmentFiles/getByFileName('" + DocumentName+ "')  ";
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
            GetTotalAnnComments();          
        },
        error: function (error) 
        {
            Dfd.reject(JSON.stringify(error));
            console.log(error);
        }
    });
    return Dfd.promise();
}




function GetTotalAnnComments(Action)
{
    if(Action == "GetAll"){
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('AnnouncementsChild')/Items?$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=ID asc&$top=5000&$filter= (WebPartName eq '"+AnnType+"' and Item_ID eq '"+AnnItemID+"' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    }
    else {
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('AnnouncementsChild')/Items?$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=ID asc&$top=50&$filter= (WebPartName eq '"+AnnType+"' and Item_ID eq '"+AnnItemID+"' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    }
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:true,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            if(Items.length>0)
            {
                $("#TotalCommentsAnncmnt").text(Items.length);
            }
            else
            {
                $("#TotalCommentsAnncmnt").text("0");    		
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
}

















function GetAllAnnLikesComment(RecId)
{
    var Query = "$filter= WebPartName eq '"+AnnType+"' and LikeComment eq 'Yes' and LikeCommentID eq '"+RecId+"'  &$select=UserImage,Author/Title,Author/Id&$expand=Author";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            $("#LikesCountAnn" + RecId).text(Items.length);
            if(Items.length>0)
            {
                $("#CommentLikeListAnncmnt").empty();
                var Html_Design="";
                for(var i=0; i<Items.length; i++)
                {	
                    Html_Design = Html_Design + "<li class='likes-box'>" +
    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' src='"+Items[i].UserImage+"'></div>"+
										"<div class='like-user-name'>"+
										"<h4>"+Items[i].Author.Title+"</h4>"+
										"</div>"+
										"</li>";
                }
                $("#CommentLikeListAnncmnt").append(Html_Design);
            }
            else
            {
                $("#CommentLikeListAnncmnt").empty();
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
}


function checkLikeAnnCommentUser(RecId)
{
    var textValue = "Like";
    //var Query = "$filter= WebPartName eq '"+Type+"' and Item_ID eq '"+ItemId +"' and LikeComment eq 'Yes' and LikeCommentID eq '"+RecId+"'  &$select=UserImage,Author/Title,Author/Id&$expand=Author";
    var Query = "$filter= WebPartName eq '"+AnnType+"' and LikeComment eq 'Yes' and LikeCommentID eq '"+RecId+"' and Author/EMail eq '"+_spPageContextInfo.userEmail+"' &$select=UserImage,Author/Title,Author/Id,Author/EMail&$expand=Author";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var Items="";
            Items = data.d.results;
            if(Items.length>0)
            {
                textValue = "Unlike";
            }
        },
        error: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });
    return textValue;
}






























//get limited number of records
function getAnnocmntdata(Query) {
    var ResultItems = [];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?" + Query + "";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            ResultItems = data.d.results;
        },
        error: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
    return ResultItems;
}

var AnnResponse = AnnResponse || [];
//Get details from SP list above 5000
function getAllRecords(url, dfds) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            AnnResponse = AnnResponse.concat(data.d.results);
            if (data.d.__next) {
                //url = data.d.__next;
                getAllRecords(url, dfds);
            }
            else {
                dfds.resolve(AnnResponse);
            }
        },
        error: function (error) {
            dfds.reject(error)
            console.log(error);
        }
    })
    return AnnResponse;
}


function TriggerAnnLikes()
{	
    var listName="AnnouncementsChild";
    var Query = "$filter= (AuthorId eq ('"+_spPageContextInfo.userId+"') and WebPartName eq '"+AnnType+"' and Item_ID eq '"+AnnItemID +"') and (Like eq 'Yes' or Like eq 'No')&$top=1";
    var QueryResult = getAnnocmntdata(Query);
    AnnResponse = [];
    if(QueryResult[0].Like == "No")
    {
        var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':AnnItemID,'WebPartName':AnnType,'Like':'Yes','LikeById':parseInt(_spPageContextInfo.userId),'UserImage':currentUserProfileData[0].ProfilePic};
        var Res = AnnouncmntUpdate(listName,item,QueryResult[0].ID);    
    }
    else if(QueryResult[0].Like == "Yes")
    {
        var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Item_ID':AnnItemID,'WebPartName':AnnType,'Like':'No','LikeById':parseInt(_spPageContextInfo.userId),'UserImage':currentUserProfileData[0].ProfilePic};
        var Res = AnnouncmntUpdate(listName,item,QueryResult[0].ID);
    }
    if($(".like-img-Ann").attr("src") == "../SiteAssets/Biography/Experience/assets/images/like-icon.png"){
        $('#like-Img-color-Anncmnt').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon-fill.png");
        $("#TotalLikesAnncmnt").text(parseInt($("#TotalLikesAnncmnt").text()) + 1);
    }
    else {
        $('#like-Img-color-Anncmnt').attr('src', "../SiteAssets/Biography/Experience/assets/images/like-icon.png");
        $("#TotalLikesAnncmnt").text(parseInt($("#TotalLikesAnncmnt").text()) - 1);
    }
    if($("#likesAnncmnt").hasClass("active") == true){
    	$('#TotalLikesAnncmnt').trigger('click');
    }
}

//to open file in Iframe
function previewfile(Action) {
    src = Action.name + "?web=1";
    if (Action.name == null) {
        src = Action.title + "?web=1";
    }
    var container = $("#doc-viewer").empty();
    $('<iframe>', {
        src: src,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
    setTimeout(function () {
        if($('#iframe-viewer').contents().find('body').html() == ""){
            $("#AttachmentView").modal("hide");
        }
    }, 2000);
}

//Preview Image in Iframe
function previewImage(Action) {
    src = Action.src + "?web=1";
    var container = $("#doc-viewer").empty();
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

function formatDateComment(d) 
{
    var date = new Date(d);
    if ( isNaN( date .getTime())){ return d; }
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
        if(day < 10){day = "0"+day; }
        return    day  + " " +month[date.getMonth()];
    }
}

function IsUserLikedAnn() {
	var LikedValue = false,
		dfds = $.Deferred(),
    	Query = "?$top=5000&$filter= WebPartName eq '"+AnnType+"' and Item_ID eq '"+AnnItemID+"' and Like eq 'Yes' and LikeBy/EMail eq '"+_spPageContextInfo.userEmail+"' &$select=UserImage,LikeBy/Title,LikeBy/EMail,LikeBy/ID&$expand=LikeBy",
    	url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items" + Query;
    var QueryResult = getAllRecords(url, dfds);
    AnnResponse = [];
    if(QueryResult.length>0){
    	LikedValue = true;
    }
	return LikedValue;
}
