var Type = window.atob(titanForWork.getQueryStringParameter("type"));
var ItemId = window.atob(titanForWork.getQueryStringParameter("ItemId"));
$(document).ready(function () {
    //var Type = window.atob(titanForWork.getQueryStringParameter("type"));
    if (Type == "Banner") {
        $("#LinkArea").hide();
    }
    else {
        $("#LinkArea").show();
    }
    DisplayBannerss();

});


function DisplayBannerss() {
    //var ItemId = window.atob(titanForWork.getQueryStringParameter("ItemId"));
    var CompanySiteUrl = _spPageContextInfo.webAbsoluteUrl;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/EMail,TeamMembers/Title,category/CatogeryName,Author/EMail,Departments/Title,Company/Title&$filter=ID eq '" + ItemId + "' &$expand=AttachmentFiles,Departments,Author,Company,category,TeamMembers";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {debugger;
            var items = data.d.results;
            if (items.length > 0) {
                var results = data.d.results;
                var authorDisplayName = "";
                if (results[0].LikeCount != null && results[0].LikeCount != "" && results[0].LikeCount != "null")
                {
                    if (IsUserLikedPost() == true) 
                    {
                        $('#like-Img-color').attr('src', "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/Biography/Experience/assets/images/like-icon-fill.png")
                    }
                    else
                    {
                        $('#like-Img-color').attr('src', "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/Biography/Experience/assets/images/like-icon.png")
                    }
                }
                else
                {
                    $('#like-Img-color').attr('src', "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/Biography/Experience/assets/images/like-icon.png")
                }
                $("#TotalHits").text(results[0].ViewCount ? results[0].ViewCount : "0");
                $("#TotalLikes").text(results[0].LikeCount ? results[0].LikeCount : "0");
                $("#TotalComments").text(results[0].ComentsCount ? results[0].ComentsCount : "0");
                if (results[0].WebPartName == "Banners") {
                    authorDisplayName = results[0].EmployeeName;
                }
                else if (results[0].WebPartName == "Recognition") {
                    if (results[0].UserType == "Employee") 
                    {
                        if (results[0].TeamMembersId != null) 
                        {
                            authorDisplayName = results[0].TeamMembers.results[0].Title;
                        }

                        if (results[0].AttachmentFiles.results.length > 0) 
                        {
                            $('#UserProfile').attr("src", results[0].AttachmentFiles.results[0].ServerRelativeUrl);
                        }
                        else 
                        {
                            var UserInfoDtl = [];
                            if (results[0].TeamMembersId != null) {
                                UserInfoDtl = GetEmployeeDetails(results[0].TeamMembers.results[0].EMail);
                            }
                            if (UserInfoDtl.length > 0) {
                                if (UserInfoDtl[0].AttachmentFiles.results.length > 0) {
                                    $('#UserProfile').attr("src", UserInfoDtl[0].AttachmentFiles.results[0].ServerRelativeUrl);
                                }
                                else {
                                    $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');
                                }
                            }
                            else {
                                $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');

                            }
                        }
                    }
                    else if (results[0].UserType == "Other" || results[0].UserType == "Team")
                    {
                        authorDisplayName = results[0].EmployeeName;
                        if (results[0].Related_Word == "Gallery") {
                            $('#UserProfile').attr("src", results[0].ImageUrl);
                        }
                        else if (results[0].Related_Word == "Upload") {
                            if (results[0].AttachmentFiles.results.length > 0) {
                                $('#UserProfile').attr("src", results[0].AttachmentFiles.results[0].ServerRelativeUrl);
                            }
                            else {
                                $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');
                            }
                        }
                        else {
                            $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');
                        }
                    }
                }

                var SliderHTML = '';
                var nextpreview = '';
                var itemId = results[0].ID;
                var sliderType = '';
                if (items[0].WebPartName == "Recognition") {
                    sliderType = results[0].WebPartName;
                }
                else {
                    sliderType = results[0].category.CatogeryName;
                }
                var titleSlider = results[0].Title;
                var Description = results[0].Description;
                var Newsdate = results[0].Publish_Date;
                var Relatedword = results[0].Related_Word;
                var newsdate = new Date(Newsdate);
                newsdate = $.datepicker.formatDate('dd M yy', newsdate);
                var strTarget = '';
                if (items[0].WebPartName == "Recognition") {
                    strTarget = _spPageContextInfo.webAbsoluteUrl + "/ImageGallery/Recognition-cover.png";
                }
                else {
                    if (results[0].AttachmentFiles.results.length > 0) {
                        strTarget = results[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                }

                if (Type == "General") {
                    //strTarget  = GetDocuments(results[0].ID, results[0].WebPartName);
                    if (results[0].AttachmentFiles.results.length > 0) {
                        var CoverImage = '';
                        for (var k = 0; k < results[0].AttachmentFiles.results.length; k++) {
                            var Filename = results[0].AttachmentFiles.results[k].FileName;
                            var n = Filename.startsWith("CoverImage")
                            if (n == true) {
                                CoverImage = results[0].AttachmentFiles.results[k].ServerRelativeUrl;
                                break;
                            }
                        }
                        if (CoverImage == "") {
                            CoverImage = _spPageContextInfo.webAbsoluteUrl + "/ImageGallery/DefaultExperience.png";
                        }
                    }
                    else {
                        CoverImage = _spPageContextInfo.webAbsoluteUrl + "/ImageGallery/DefaultExperience.png";
                    }
                    strTarget = CoverImage;


                    //$("#video_media_area").hide();   					
                }
                if (results[0].WebLinks != null) {
                    $("#LinkArea").show();
                    $("#weblinkUrl").attr("href", results[0].WebLinks.Description);
                    $("#weblinkUrl").text(results[0].WebLinks.Description)
                }
                else {
                    $("#LinkArea").hide();
                }
                $("#sliderimg").attr("src", strTarget);
                $("#slidertype").html(sliderType);
                $("#slidertitle").html(titleSlider);
                if (results[0].Related_Word != null && results[0].Related_Word != "null" && results[0].Related_Word != "" && results[0].Announcement_Type != "Recognition") {
                    $(".relatedWord").show();
                    $("#RelatedWordArea").text(results[0].Related_Word);
                }
                $("#description").html(Description);
                //$("#mykeywork").html(Relatedword);
                $("#username").html(authorDisplayName);
                $("#mydate").html(newsdate);
                var videolinks = results[0].videolink;



                if (results[0].WebPartName == "General") {
                    var postbyimg = "";
                    if (results[0].UserType == "External Users" || results[0].UserType == "Other") {
                        if (results[0].AttachmentFiles.results.length > 0) {
                            for (var k = 0; k < results[0].AttachmentFiles.results.length; k++) {
                                var Filename = results[0].AttachmentFiles.results[k].FileName;
                                var n = Filename.startsWith("CoverImage")
                                if (n == false) {
                                    postbyimg = results[0].AttachmentFiles.results[k].ServerRelativeUrl;
                                    break;
                                }
                            }
                            if (postbyimg != "") {
                                $('#UserProfile').attr("src", postbyimg);
                            }
                            else {
                                $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');
                            }

                        }
                        else {
                            //postbyimg = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeOftheMonth/NewRecognition/assets/images/user_pic.jpg";
                            $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');

                        }


                        $("#username").html(results[0].EmployeeName);
                        $("#TitleDepartment").html(results[0].Department);//TitleDesignation
                        $("#TitleDesignation").html(results[0].Designation);//						
                    }
                    else if (results[0].UserType == "Internal Users" || results[0].UserType == "Employee") {
                        $("#username").html(results[0].EmployeeName);
                        var UserInfoDtl = GetEmployeeDetails(results[0].TeamMembers.results[0].EMail);
                        $("#TitleDepartment").html(UserInfoDtl[0].Department.Title);//TitleDesignation
                        $("#TitleDesignation").html(UserInfoDtl[0].Designation);//
                        if (results[0].ImageUrl != null) {
                            $('#UserProfile').attr("src", results[0].ImageUrl);
                        }
                        else {
                            $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');
                        }
                    }
                }
                else if (results[0].WebPartName == "Recognition") {
                    $("#TitleDepartment").html(results[0].Department);//TitleDesignation
                    $("#TitleDesignation").html(results[0].Designation);//
                    if (results[0].UserType == "Team") {
                        $("#TitleDesignation").html("Team");
                        $("#TeamMembersBtn").css("display", "block");
                    }
                    else {
                        $("#TeamMembersBtn").css("display", "none");
                    }
                }
                else {
                    var UserInfoDtl = GetEmployeeDetails(items[0].Author.EMail);
                    $("#TitleDepartment").html(UserInfoDtl[0].Department.Title);//TitleDesignation
                    $("#TitleDesignation").html(UserInfoDtl[0].Designation);//
					var IsImageAvailble = false;
                    if (results[0].WebPartName == "Banners") {
                        if (results[0].AttachmentFiles.results.length > 0) {
                            for (var k = 0; k < results[0].AttachmentFiles.results.length; k++) {
                                var Filename = results[0].AttachmentFiles.results[k].FileName;
                                var n = Filename.startsWith("CoverImage")
                                if (n == false) {
                                	IsImageAvailble = true;
                                    postbyimg = results[0].AttachmentFiles.results[k].ServerRelativeUrl;
                                    $('#UserProfile').attr("src", postbyimg);
                                    break;
                                }
                            }
							if(IsImageAvailble == false) {
								if (UserInfoDtl[0].AttachmentFiles.results.length > 0) {
                            		$('#UserProfile').attr("src", UserInfoDtl[0].AttachmentFiles.results[0].ServerRelativeUrl);
		                        }
		                        else {
		                            $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');
		                        }
							}
                        }
                        else {
                            $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');
                        }
                    }
                    else {
                        if (UserInfoDtl[0].AttachmentFiles.results.length > 0) {
                            $('#UserProfile').attr("src", UserInfoDtl[0].AttachmentFiles.results[0].ServerRelativeUrl);
                        }
                        else {
                            $('#UserProfile').attr("src", 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg');
                        }
                    }
                }
                if (videolinks != null) {

                    if (videolinks.indexOf(",") > -1) {
                        var strarray = videolinks.split(',');
                    }
                    else {
                        var strarray = [];
                        strarray.push(results[0].videolink);
                    }
                    if (strarray.length > 1) {
                        $("#RightArrowSign").show();
                        $("#LeftArrowSign").show();
                        $("#video_media_area").show();
                        //$("#image_media_area").removeClass('image-media-area-p-alone');
                    }
                    else {
                        //$("#video_media_area").hide();
                        //$("#image_media_area").addClass('image-media-area-p-alone');
                        $("#RightArrowSign").hide();
                        $("#LeftArrowSign").hide();
                    }

                    for (var i = 0; i < strarray.length; i++) {
                        if (i == 0) {
                            UrlExists(strarray[i], function (status) {
                                if (status != 404) {
                                    SliderHTML += '<div class="item active">';
                                    SliderHTML += '<iframe width="100%" height="315" src=' + strarray[i] + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                                    SliderHTML += '</div>';
                                }
                                else {
                                    SliderHTML += '<div class="item active">' +
                                                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                                                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                                                '<span><h2 class="text-center">Video URL is broken. Please contact administrator.</h2></span>' +
                                                '</div></div></div></div>';
                                    //$("#allvideolink1").append(SliderHTML);
                                }
                            });
                        }
                        else {
                            UrlExists(strarray[i], function (status) {
                                if (status != 404) {
                                    SliderHTML += '<div class="item">';
                                    SliderHTML += '<iframe width="100%" height="315" src=' + strarray[i] + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                                    SliderHTML += '</div>';
                                }
                                else {
                                    SliderHTML += '<div class="item">' +
                                                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                                                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                                                '<span><h2 class="text-center">Video URL is broken. Please contact administrator.</h2></span>' +
                                                '</div></div></div></div>';
                                    //$("#allvideolink1").append(SliderHTML);
                                }
                            });
                        }
                    }
                    $("#allvideolink1").empty();
                    $("#allvideolink1").append(SliderHTML);
                }
                else {
                    $("#RightArrowSign").hide();
                    $("#LeftArrowSign").hide();
                    $("#video_media_area").hide();
                    //$("#image_media_area").addClass('image-media-area-p-alone');

                }
                GetDocuments(results[0].ID, results[0].WebPartName);
                if (strarray == null) {
                    strarray = [];
                }
                getattachment("GeneralPicturesGallery", itemId, strarray); //GeneralPicturesGallery
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

//to check video link is broken or not
function UrlExists(url, cb) {
    jQuery.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        async: false,
        complete: function (xhr) {
            if (typeof cb === 'function')
                cb.apply(this, [xhr.status]);
        }
    });
}
function getattachment(ListName, itemId, VideoCount) {
    var dfd = $.Deferred();
    var SliderImage = "Slider_Image",
    AwardImage = "Award_Image",
    SliderDocument = "Slider_Document";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('" + ListName + "')/items?$select=*,DocType,File/Name,File/ServerRelativeUrl&$Filter=DataID eq " + itemId + "&$expand=File",
        type: "GET",
        async: false,
        headers: { "accept": "application/json;odata=verbose", },
        success: function (data) {
            dfd.resolve(data.d.results);
            items = data.d.results;
            var Attachmenthtml = '';
            var ImageHtml = '';
            var counter = 0;
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    var dataid = items[i].DataID;
                    var doctype = items[i].DocType;
                    var title = items[i].Title;
                    var Targetloc = items[i].File.ServerRelativeUrl;
                    var filename = items[i].File.Name;
                    if (SliderDocument.indexOf(doctype) != -1) {
                        Attachmenthtml += '<a href="' + Targetloc + '"><span>' + filename + '</span> <span><i class="fa fa-times-circle-o"></i></span></a>';
                    }

                    if (SliderImage.indexOf(doctype) != -1 || AwardImage.indexOf(doctype) != -1) {
                        if (counter == 0) {
                            ImageHtml += '<div class="item active">';
                            ImageHtml += '<img src="' + Targetloc + '" alt="">';
                            ImageHtml += '</div>';
                        }
                        else {

                            ImageHtml += '<div class="item">';
                            ImageHtml += '<img src="' + Targetloc + '" alt="">';
                            ImageHtml += '</div>';
                        }
                        ++counter;
                    }
                }
                $("#fileattach").empty();
                $("#mediaimg").empty();
                $("#image_media_area").show();

                $("#fileattach").append(Attachmenthtml);
                $("#mediaimg").append(ImageHtml);

                if (counter < 2) {
                    $("a.arrow-custom.carousel-control.left").hide();
                    $("a.arrow-custom.carousel-control.right").hide();
                }
                else {
                    $("a.arrow-custom.carousel-control.left").show();
                    $("a.arrow-custom.carousel-control.right").show();

                }
            }
            else {
                $("#image_media_area").hide();
                $("a.arrow-custom.carousel-control.left").hide();
                $("a.arrow-custom.carousel-control.right").hide();

            }
            AddRemoveClass(items.length, VideoCount.length);
        },
        error: function (error) {
            dfd.reject(error);
        }
    });
    return dfd.promise();
};


function AddRemoveClass(ImageCount, VideoCount) {
    if (ImageCount > 0) {
        $("#image_media_area").addClass("image-media-area-p-alone");
    }
    else {
        $("#image_media_area").removeClass("image-media-area-p-alone");
    }
    if (VideoCount > 0) {
        $("#video_media_area").addClass('video-media-area-p-alone');
    }
    else {
        $("#video_media_area").removeClass('video-media-area-p-alone');
    }
    if (VideoCount > 0 && ImageCount > 0) {
        $("#video_media_area").removeClass('video-media-area-p-alone');
        $("#image_media_area").removeClass("image-media-area-p-alone");
    }
}


//var Resultresponse = Resultresponse || [];  
function GetEmployeeDetails(Email) {
    var ItemsRecord = '';
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$top=5000&$select=*,ManagerLoginName/Title,OfficeLocation/Title,LogonName/Title,Department/Title,AttachmentFiles,Email&$expand=AttachmentFiles,LogonName/ID,Department,OfficeLocation,ManagerLoginName&$filter=Company eq ('" + titanForWork.getQueryStringParameter('CompanyId') + "') and Email eq '" + Email + "'";
    $.ajax({
        url: url,
        method: "GET",
        async: false,
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            //response =[];
            ItemsRecord = data.d.results;

        },
        error: function (error) {
            alert("Failed")
        }
    });
    return ItemsRecord;
}


var tempStore = [];
function GetDocuments(filename, webpartname) {
    var DocType = '';
    var ImgType = '';
    var imagesStore = [];
    //if (webpartname == "General") { 
    DocType = "Award_Image";
    ImgType = "Award_Document";
    //} 
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'" + filename + "')";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        async: false,
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            var res = data.d.results;

            if (res.length > 0) {
                var x = 0;
                for (x; x < res.length; x++) {
                    if (res[x].Title == ImgType) {
                        var Docname = res[x].Name;
                        $('#AttachDoc').append('<div id="_file_' + x + '"><a name="' + document.location.origin + res[x].ServerRelativeUrl + '" onclick="previewfile(this);" href="javascript:void(0)"  data-filename="' + Docname +'" data-fileUrl="' + res[x].ServerRelativeUrl +'"  ><span>' + Docname.substring(Docname.indexOf('-') + 1) + '</span>' +
                        '<span><a href="' + document.location.origin + res[x].ServerRelativeUrl + '" download><i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></a></div>');
                    }
                }
            }
        },
        error: function ajaxError(response) {
            alert(response.status + ' ' + response.statusText);
        }
    });
    return imagesStore[0]
}

function previewfile(Action) {

var iframeUrl1 ="";
    var docExt = Action.dataset.filename.split('.').pop();
    if (docExt == 'doc' || docExt == 'docx' || docExt == 'xls' || docExt == 'xlsx' || docExt == 'ppt' || docExt == 'pptx' || docExt == 'pdf' ) {
           iframeUrl1 = _spPageContextInfo.webAbsoluteUrl +'/_layouts/15/WopiFrame.aspx?sourcedoc=' + Action.dataset.fileurl + '&action=interactivepreview';
       }else
       {
       iframeUrl1= Action.dataset.fileurl;
       }

    src = Action.name + "?web=1";
    if (Action.name == null) {
        src = Action.title + "?web=1";
        iframeUrl1 = Action.title + "?web=1";
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
            $("#AttachmentView").modal("hide");
        }
    }, 2000);
}


function GetAllTeamMembers() {
    //var ItemId = window.atob(titanForWork.getQueryStringParameter("ItemId"));
    var CompanySiteUrl = _spPageContextInfo.webAbsoluteUrl;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/EMail,TeamMembers/ID,TeamMembers/Title,category/CatogeryName,Author/EMail,Departments/Title,Company/Title&$filter=ID eq '" + ItemId + "' &$expand=AttachmentFiles,Departments,Author,Company,category,TeamMembers";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            var Html_Design = '';
            $("#TeamLists").empty();
            if (items.length > 0) {
                for (var i = 0; i < items[0].TeamMembers.results.length; i++) {
                    var UserInfoDtl = GetEmployeeDetails(items[0].TeamMembers.results[i].EMail);
                    if (UserInfoDtl.length > 0) {
                        if (UserInfoDtl[0].AttachmentFiles.results.length > 0) {
                            var Img = UserInfoDtl[0].AttachmentFiles.results[0].ServerRelativeUrl;
                        }
                        else {
                            var Img = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].TeamMembers.results[i].EMail);
                        }
                        Html_Design = Html_Design + "<li class='likes-box'>" +
    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='" + Img + "'></div>" +
										"<div class='like-user-name'>" +
										"<h4>" + items[0].TeamMembers.results[i].Title + "</h4>" +
										"<p class='member-deg text-ellipsis'><span>" + UserInfoDtl[0].Designation + "</span>, " + "<span>" + UserInfoDtl[0].Department.Title + "</span>" +
										"</p></div>" +
										"</li>";
                    }
                }
                $("#TeamLists").append(Html_Design);

            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function IsUserLikedPost() {
    var LikedValue = false;
    var Query = "$filter=  WebPartName eq '" + Type + "' and Item_ID eq '" + ItemId + "' and Like eq 'Yes' and LikeBy/EMail eq '" + _spPageContextInfo.userEmail + "' &$select=UserImage,LikeBy/Title,LikeBy/EMail,LikeBy/ID&$expand=LikeBy";;
    var QueryResult = getdata(Query);
    if (QueryResult.length > 0) {
        LikedValue = true;
    }
    return LikedValue;
}
