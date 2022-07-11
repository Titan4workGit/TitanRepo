//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS
var ShowAnnouncements = function () {
    this.companySiteURL = '';
    this.AnnouncementId = 0;
    this.CloseAnnouncement = $("#CloseAnnouncement");

    // Attachments
    this.Attachments = $(".attachments");
    this.AttachmentLabel = $(".attachmentLabel");
    this.ModalManageAnnouncements = $("#modalManageAnnouncements");
    this.btnAttachmentClose = $("#btnAttachmentClose");
    this.AnnouncementsAttachments = $(".announcementsAttachments");
    this.AttachmentsDiv = $(".attachmentsDiv");
};

ShowAnnouncements.prototype.InitializeControls = function () {
    var Handler = this;
    var welcomePageCalled = titanForWork.getQueryStringParameter('WelcomePageCalled');
    if (welcomePageCalled != undefined) {
        objShowAnnouncements.GetAnnouncements();
        objShowAnnouncements.BindEvents();
    }
}


ShowAnnouncements.prototype.BindEvents = function () {
    var Handler = this;
    Handler.AnnouncementId = titanForWork.getQueryStringParameter("AnnouncementId");
    if (Handler.AnnouncementId != undefined && Handler.AnnouncementId != '') {
        objShowAnnouncements.ShowAnnouncement(Handler.AnnouncementId);
        Handler.CloseAnnouncement.click(function () {
            var titanSiteURL = window.location.href.lastIndexOf('&');
            var titanNewURL = window.location.href.substring(0, titanSiteURL);
            window.history.pushState("html", "pageTitle", titanNewURL);
        })
    }
    Handler.btnAttachmentClose.click(function () {
        Handler.ModalManageAnnouncements.modal('hide');
    })
};


ShowAnnouncements.prototype.ShowAnnouncement = function ShowAnnouncement(itemId) {
    var Handler = this;
    Handler.Attachments.html('');		// Blank Attachments Div
    $("#_AttachDocument").empty();
    $("#AnnouncemntImages").empty();
    //$("#_AttachDocument").empty();
    scrollPosition = $(window).scrollTop();
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('Announcements')/items?$select=*,Author/Title&$expand=Author&$Filter=ID eq " + itemId + "";
    $.ajax({
        url: requestUri,
        type: "GET",
        async: true,
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            //$("#_AttachDocument").html('');
            

            var title, description;
            var results = data.d.results;
            var currentLanguage = objShowAnnouncements.GetCurrentLanguage();
            if ((currentLanguage == 'DefaultLanguage') || (currentLanguage != 'DefaultLanguage' && results[0][currentLanguage + "_Title"] == null)) {
                title = results[0]['Title'];
                description = results[0]['Description'];
            }
            else {
                title = currentLanguage + "_Title";
                description = currentLanguage + '_Description';
                title = results[0][title] == null ? results[0]['Title'] : results[0][title];
                description = results[0][description] == null ? results[0]['Description'] : results[0][description];
            }
            if (results[0].WebLinks != null) {
            	$("#divLink").show();
                $("#_WebLink").text(results[0].WebLinks.Url);
                $("#_WebLink").attr("href", results[0].WebLinks.Url);
            }
            else {
            	$("#divLink").hide();
                $("#_WebLink").text("");
                $("#_WebLink").attr("href", "");
            }
            var expiryDate = new Date(results[0]['Expires']);
            expiryDate = $.datepicker.formatDate('dd/mm/yy', expiryDate);
            $("#_ModelHeading").text(results[0]['Announcement_Type']);
            $("#_TextTitle").text(title);
            $("#AnnouncmntAuthor").text(results[0].Author.Title);
            $("#AnnouncmntCreated").text($.datepicker.formatDate('dd MM yy', new Date(results[0].Created)));

            if (description != null) {
                var AnnouncementDescription = description;
                var removeTags = stripHtml(AnnouncementDescription);
                if ((removeTags.length) > 980) {
                	if(results[0].WebPartName == "Alert"){
                    	$("#_DtlDescription").html((jQuery.trim(removeTags).substring(0, 980)) + '...<a class="common-popup-description-more" href="javascript:void(0);" id="annReadMore">Read More</a>');
                    }
                    else {
                    	$("#_DtlDescription").html((jQuery.trim(removeTags).substring(0, 980)) + '...<a class="common-popup-description-more panel-heading-bg-txt-clr" href="javascript:void(0);" id="annReadMore">Read More</a>');
                    }
                    $("#annReadMore").click(function () {
                        $("#_DtlDescription").html(description);
                    });
                }
                else {
                    $("#_DtlDescription").html(description);
                }
            }
			if(results[0].WebPartName == "Alert"){
            	$("#_ModelHeading").removeClass("common-head-text-popup");
            	$("#_ModelHeading").removeClass("panel-heading-bg-txt-clr");
            	$("#_ModelHeading").addClass("common-head-text-popup-Alert");
            	$("#_ModelHeading").removeAttr("style");
            	$("#NoticeBgImage").attr("src","https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/DevelopersCode/DefaultHome/images/alert-popup.png");
            	$('#annReadMore').attr('style', 'background: #f00 !important');
            }
            else {
            	$("#_ModelHeading").removeClass("common-head-text-popup-Alert");
            	$("#_ModelHeading").addClass("common-head-text-popup");
            	$("#_ModelHeading").addClass("panel-heading-bg-txt-clr");
            	$("#NoticeBgImage").attr("src","https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/DevelopersCode/DefaultHome/images/announcement-popup.png");
            	$('#annReadMore').attr('style', 'background: #ff9e20 !important');
            }
            //$("#_DtlDescription").html(description);
            objShowAnnouncements.GetAttachmentsOnReadMore(itemId);
            bindImages(itemId);
            if (MediatextColor != null && HeaderTextColor != null) {
                $('.panel-heading-bg-txt-clr').each(function () {                 //For Theme
                    this.style.setProperty('color', MediatextColor, 'important');
                    this.style.setProperty('background', HeaderTextColor, 'important');
                });
            }
            LoadChatting(results[0].WebPartName, results[0].Id, results[0].ViewCount, results[0].LikeCount, results[0].ComentsCount);
            $("#Announcement_Alert").modal('show');
        },
        error: function (data) {
            console.log(data);
        }
    })
}

//Bind Images of Announcements
function bindImages(AnnouncemntId) {
    var Image = '';
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'" + AnnouncemntId + "') ";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            $("#AnnouncemntImages").empty();
            var res = data.d.results;
            var imagesStore = [];
            if (res.length > 0) {
            	$("#imagesgeneral").show();
                Image += '<div class="item active">';
                Image += '<img src=' + encodeURI(res[0].ServerRelativeUrl) + ' alt="">';
                Image += '</div>';

                for (x = 1; x < res.length; x++) {
                    Image += '<div class="item">';
                    Image += '<img src=' + encodeURI(res[x].ServerRelativeUrl) + ' alt="">';
                    Image += '</div>';
                }
                $("#AnnouncemntImages").append(Image);
            }
            if (res.length == 1) {
            	$(".ImageArrow").hide();
			}
			else {
				$(".ImageArrow").show();
			}
        },
        error: function ajaxError(response) {
            alert(response.status + ' ' + response.statusText);
        }
    });
}


ShowAnnouncements.prototype.GetCurrentLanguage = function GetCurrentLanguage() {
    var preferredLanguage;
    if ($.cookie.length > 0 && $.cookie("Language") != undefined && $.cookie("Language") != undefined) {
        var preferredLanguageValue = $.cookie("Language");
        preferredLanguage = $.cookie("Language").split('#')[0];	// Index : [0]  => e.g. Language3rd     [1] e.g. Hindi;
    }
    else {
        preferredLanguage = 'DefaultLanguage';
    }

    return preferredLanguage;
}


ShowAnnouncements.prototype.GetAnnouncements = function () {
    var Handler = this;
    var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 10);

    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    var requestURI = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('Announcements')/items?$select*&$filter=((Announcement_Type eq 'Announcement' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + txtCompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + txtCompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "')) and ApprovalStatus eq 'Approved')&$expand=AttachmentFiles &$orderby=Modified desc &$top=3";
    $.ajax({
        url: requestURI,
        type: "GET",
        async: true,
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var results = data.d.results;

            var AnnouncmentHTML = '';
            if (results.length == 0) {
                AnnouncmentHTML = "<div class=\"norecordfound col-sm-8 col-xs-8 col-md-8\">";
                AnnouncmentHTML += "<h3 class=\"top5\" data-localize='NoRecord_Announcements'>Company Announcements Awaited</h3>";
                AnnouncmentHTML += "</div>";

                $("#announcmentDiv").append(AnnouncmentHTML);
                return;
            }
            AnnouncmentHTML = '<ul class="dfwp-column dfwp-list" style="width:100%">';

            $.each(results, function (index, item) {
                var currentLanguage = objShowAnnouncements.GetCurrentLanguage();
                var announcmentTitleLang, announcmentDescriptionLang;

                if (currentLanguage == 'DefaultLanguage') {
                    announcmentTitleLang = 'Title';
                    announcmentDescriptionLang = 'Description';
                }
                else {
                    announcmentTitleLang = currentLanguage + "_Title";
                    announcmentDescriptionLang = currentLanguage + '_Description';
                }

                var ItemID = item['ID'];
                var announcmentTitle = item[announcmentTitleLang] == undefined ? item['Title'] : item[announcmentTitleLang];
                var announcmentDescription = item[announcmentDescriptionLang] == undefined ? item['Description'] : item[announcmentDescriptionLang];
                var announcmentModified = new Date(item['Modified']);

                if (announcmentTitle.length > 36) {
                    announcmentTitle = announcmentTitle.substring(0, 33) + "...";
                }
                if (announcmentDescription.length > 78) {
                    announcmentDescription = announcmentDescription.substring(0, 75) + "...";
                }

                announcmentModified = $.datepicker.formatDate('dd-M-yy', announcmentModified);
                var viewItem = "../Pages/Announcements.aspx?CompanyId=" + txtCompanyId + "&ItemId=" + ItemID + "&Mode=View&Source=Home";

                AnnouncmentHTML += '<div class="media top5"><div class="media-body"><h4 class="event-text-head-new bottom7">';
                AnnouncmentHTML += '<a style="cursor:pointer;" onclick="objShowAnnouncements.ShowAnnouncement(' + ItemID + ')" title="">' + announcmentTitle + '</a>';
                if (item.AttachmentFiles.results.length > 0) {
                    AnnouncmentHTML += '<span class="pull-right attach-span"><a class="attach-color" onclick="objShowAnnouncements.ShowAttachmentModal(' + ItemID + ')"><i class="glyphicon glyphicon-paperclip "></i></a></span>';
                }
                AnnouncmentHTML += '</h4><p><span>' + announcmentDescription + '</span>';
                AnnouncmentHTML += '<a class="read-more" style="cursor:pointer;padding-left:5px;" onclick="objShowAnnouncements.ShowAnnouncement(' + ItemID + ')">Read More</a>';
                AnnouncmentHTML += '</p><ul class="list-inline list-unstyled  text-3">';
                AnnouncmentHTML += '<li class="pad-left0"><span>' + announcmentModified + '</span></li>';
                AnnouncmentHTML += '</ul></div><hr class="margin10"></div>'
            })
            AnnouncmentHTML += '</ul>';
            $("#announcmentDiv").append(AnnouncmentHTML);
        },
        error: function (data) {
            console.log(data);
        }
    });
}


ShowAnnouncements.prototype.GetSiteURL = function GetSiteURL(listName) {

    var Handler = this;
    var companyID = titanForWork.getQueryStringParameter('CompanyId');
    var URL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,SiteURL&$filter=ID eq '" + companyID + "'";
    $.ajax({
        url: URL,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                Handler.SiteURL = items[0].SiteURL;
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}



///////////////////////////////////////// Attachments /////////////////////////////////
ShowAnnouncements.prototype.ShowAttachmentModal = function ShowAttachmentModal(ItemId) {
    var Handler = this;
    Handler.ModalManageAnnouncements.modal("show");

    // Show Attachments
    objShowAnnouncements.GetAttachments(ItemId);
}

ShowAnnouncements.prototype.GenerateAttachmentTable = function GenerateAttachmentTable(ItemId, response) {
    var Handler = this;

    var itemHTML = "<tr>";
    itemHTML += "<th scope=\"row\">" + titanForWork.GetDocumentTypeIcon(response.FileName) + "</th>";
    itemHTML += "<th scope=\"row\">" + response.FileName + "</th>";
    itemHTML += "<th><a target='_blank' href='" + response.ServerRelativeUrl + "'><span class=\"glyphicon glyphicon-download-alt\"></span></a></th>";
    itemHTML += "</tr>";

    Handler.AnnouncementsAttachments.append(itemHTML);
    Handler.AttachmentsDiv.show();
}

ShowAnnouncements.prototype.GetAttachments = function GetAttachments(ItemId) {
    var Handler = this;

    //	var Ownurl = Handler.companySiteURL + "/_api/web/Lists/GetByTitle('Announcements')/Items?select=*&$filter=ID eq "+ItemId+"&$expand=AttachmentFiles";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?select=*&$filter=ID eq " + ItemId + "&$expand=AttachmentFiles";

    $.ajax({
        url: Ownurl,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
        },
        async: true,
        success: function (data) {
            var results = data.d.results;
            var totalAttachments = results[0].AttachmentFiles.results.length;
            Handler.AnnouncementsAttachments.html('');
            if (results[0].AttachmentFiles.results.length > 0) {
                $.each(results[0].AttachmentFiles.results, function (i, item) {
                    objShowAnnouncements.GenerateAttachmentTable(ItemId, item);
                });
            }
            else {
                Handler.AnnouncementsAttachments.append("<br/>No file found.");
            }
        },
        eror: function (data) {
            console.log('error');
        }
    });
}


ShowAnnouncements.prototype.GetAttachmentsOnReadMore = function GetAttachmentsOnReadMore(ItemId) {
    var Handler = this;
    //var Ownurl = Handler.companySiteURL + "/_api/web/Lists/GetByTitle('Announcements')/Items?select=*&$filter=ID eq "+ItemId+"&$expand=AttachmentFiles";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?select=*&$filter=ID eq " + ItemId + "&$expand=AttachmentFiles";

    $.ajax({
        url: Ownurl,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
        },
        async: true,
        success: function (data) {
            var results = data.d.results;
            $("#_AttachDocument").empty();

            var attachmentHTML = '';
            if (results[0].AttachmentFiles.results.length > 0) {
                Handler.AttachmentLabel.show();
                $.each(results[0].AttachmentFiles.results, function (i, item) {
                var fileUrl=item.ServerRelativeUrl;
                    $("#_AttachDocument").append('<a onclick="priviewfile(this);" href="javascript:void(0)" data-filename="' + item.FileName +'" data-fileUrl="' + fileUrl +'" name=' + item.ServerRelativeUrl + '> ' + item.FileName + '<i class="fa fa-eye"></i></a>');
                });
                Handler.Attachments.append(attachmentHTML);
            }
            else {
                Handler.AttachmentLabel.hide();
            }
        },
        eror: function (data) {
            console.log('error');
        }
    });
}


ShowAnnouncements.prototype.propertiesServerRelativeUrl = function propertiesServerRelativeUrl(Action) {
    var Handler = this;
    //var Ownurl = Handler.companySiteURL + "/_api/web/Lists/GetByTitle('Announcements')/Items?select=*&$filter=ID eq "+ItemId+"&$expand=AttachmentFiles";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/getItemById(" + Action + ")?$select=ServerRedirectedEmbedUri,File/Name,File/ServerRelativeUrl,Folder/Name,Folder/ServerRelativeUrl,Shared/Title,SharedId&$expand=File,Folder,SharedId"
     $.ajax({
        url: Ownurl,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
        },
        async: false,
        success: function (data) {
            
        },
        eror: function (data) {
            console.log('error');
        }
    });
}



function priviewfile(Action) {

    src = Action.name + "?web=1";
    var iframeUrl1 ="";
    var docExt = Action.dataset.filename.split('.').pop();
    if (docExt == 'doc' || docExt == 'docx' || docExt == 'xls' || docExt == 'xlsx' || docExt == 'ppt' || docExt == 'pptx' || docExt == 'pdf' ) {
           iframeUrl1 = _spPageContextInfo.webAbsoluteUrl +'/_layouts/15/WopiFrame.aspx?sourcedoc=' + Action.dataset.fileurl + '&action=interactivepreview';
       }else
       {
       iframeUrl1= Action.dataset.fileurl;
       }
       $("#DownloadDocs").prop("href", window.location.origin + Action.dataset.fileurl);
    if (Action.name == null) {
        src = Action.title + "?web=1";
        iframeUrl1= Action.title + "?web=1";

    }
    var container = $("#doc-viewer").empty();
    $('<iframe>', {
        src: iframeUrl1,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
    setTimeout(function () {
    if ($('#iframe-viewer').contents().find('body').html() == "") {
     $("#doc-viewer").empty();
    var htmlse = '<div class="col-md-12">' +
                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                '<span><h2 class="text-center">No preview available. File has been downloaded.</h2></span>';
            $('#doc-viewer').append('<div width="100%" id="viewMyDocuments" style="padding-top:0px">' + htmlse + '</div>');

    }
    }, 1000);

}

$(document).ready(function () {
    objShowAnnouncements = new ShowAnnouncements();
    objShowAnnouncements.InitializeControls();

    //ExecuteOrDelayUntilScriptLoaded(objShowAnnouncements.ExecuteOrDelayUntilScriptLoad, "sp.js");
});


