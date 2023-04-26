var lastLogin = _spPageContextInfo;
var UserItemid, FileTitle, IsprofilePic = false;
var todayDate = new Date();
var UserEmail;
var userDocumenturl;
// One day Time in ms (milliseconds) 
var one_day = 1000 * 60 * 60 * 24;
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var currentClientName = '';
var Logged_CompanyId = '';
var LabelDefaultLangauge = [];
var labels = [];

function ShortDateTime(date, IsTime) {

    var date = new Date(date);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth());

    if (gg < 10)
        gg = "0" + gg;

    var cur_day = gg + "-" + months[mm] + "-" + aaaa;

    var hours = date.getHours()
    var suffix = hours >= 12 ? "PM" : "AM";
    var hour = hours > 12 ? hours - 12 : hours;
    var hour = hour < 10 ? "0" + hour : hour;
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    var time = "";
    if (IsTime) {
        time = hour + ":" + minutes + " " + suffix;

    } else {
        time = "";
    }

    return cur_day + " " + time;

}

$(document).ready(function () {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    $("#ChangeUploadPic").change(function () {
        readURL(this);
        if (IsprofilePic) {
            $.when(DeleteItemAttachment(UserItemid, FileTitle)).done(function (response) {
                UploadAttachement(UserItemid);

            });
        } else {
            UploadAttachement(UserItemid);
        }
    });
    
    onloadGetItem();
   
    SetStoredTheme();
});



//get EmailIds of peoplePicker
function getUserInformationProject(PeoplepickerId) {
    // Get the people picker object from the page. 
    var userIds = [];
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
                //var userId = GetUserID_Project(accountName);
                if (accountName != null) {
                    userIds.push(accountName.split('|')[2]);
                }
            }
            return userIds;
        }
    } else {
        return UsersID;
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#extuserPic').attr('src', e.target.result);
            $('#headerimageprofile').attr('src', e.target.result);

        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}


function UploadAttachement(UserItemid) {

    try {
        var fileInput = $('#ChangeUploadPic');
        if (fileInput[0].files.length == 0) {
            alert("please Upload file");
        } else {
            //File Upload
            var itemId = UserItemid;

            var fileCount = fileInput[0].files.length;
            var fileArray = [];
            var fileName = fileInput[0].files[0].name;
            fileName = fileInput[0].files[0].name.replace(/[^a-zA-Z0-9-. ]/g, ""); //Remove Special Char
            fileName = fileName.replace(/\s/g, ""); //Remove space

            // var reader = new FileReader();

            for (var i = 0; i < fileCount; i++) {
                fileArray.push(fileInput[0].files[i]);
            }
            uploadFileSP("ExternalUsers", itemId, fileArray, fileCount, fileName);
        }

    } catch (error) {
        alert("Your Picture has not been update");
        waitingDialog.hide();
    }
}

function getFileBuffer(file) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }
    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(file);
    return deferred.promise();
}



function DeleteItemAttachment(ItemId, FileTitle) {
    var Dfd = $.Deferred();
    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ExternalUsers')/GetItemById(" + ItemId + ")/AttachmentFiles/getByFileName('" + FileTitle + "')  ";
    $.ajax({
        url: Url,
        type: 'DELETE',
        contentType: 'application/json;odata=verbose',
        headers: {
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'X-HTTP-Method': 'DELETE',
            'Accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            Dfd.resolve(data);
        },
        error: function (error) {
            waitingDialog.hide();
            Dfd.reject(JSON.stringify(error));
        }
    });
    return Dfd.promise();
}



function uploadFileSP(listName, id, fileArray, fileCount, fileName) {
    var FilesCount = 0;
    var deferred = $.Deferred();
    var uploadStatus = "";
    var file = fileArray[0];
    var getFile = getFileBuffer(file);

    getFile.done(function (buffer, status, xhr) {
        var bytes = new Uint8Array(buffer);
        var content = new SP.Base64EncodedByteArray();
        var queryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/GetByTitle('" + listName + "')/items(" + id + ")/AttachmentFiles/add(FileName='" + fileName + "')";
        var uploadCount = 0;
        $.ajax({
            url: queryUrl,
            type: "POST",
            processData: false,
            contentType: "application/json;odata=verbose",
            data: buffer,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-length": buffer.byteLength
            },
            success: function (data) {
                FilesCount++;
                uploadStatus = FilesCount;
                fileArray.shift();
                if (fileArray.length > 0) {
                    uploadFileSP("ExternalUsers", id, fileArray, fileArray.length);
                } else {
                    alert("Your picture has been update successfully!");
                    $('#modal_profile').modal('toggle');
                }
            },
            error: function (err) {
                waitingDialog.hide();
                alert("Idea has been submitted but some files failed to upload.");
            }
        });
        deferred.resolve(uploadStatus);
    });

    getFile.fail(function (err) {
        waitingDialog.hide();
        deferred.reject(err);
    });
    return deferred.promise();
}


function logout() {

    var Istrue = confirm("Are you sure to logout SharePoint?")
    if (Istrue) {
        ///_layouts/15/closeConnection.aspx?loginasanotheruser=true
        window.location.href = _spPageContextInfo.webServerRelativeUrl + "/_layouts/signout.aspx";
    }
}



function GetExtrenalEmployees() {
    var GetQueryURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ExternalUsers')/items?$top=1&$select=*,Client_Name/Title,Client_Name/Id,ID,LoginName/Title,InternalStakeholders/Title,Supervisor/Title,AttachmentFiles &$expand=LoginName,InternalStakeholders,Supervisor,AttachmentFiles,Client_Name&$filter= email eq '" + _spPageContextInfo.userLoginName + "' and Status eq 'Active' ";

    var dfd = $.Deferred();

    $.ajax({
        url: GetQueryURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            dfd.resolve(data.d.results);
        },
        error: function (data) {
            waitingDialog.hide();
            console.log(data);
            dfd.reject(data);
        }
    });

    return dfd.promise();


}

function GetCompanyName() {
    var GetQueryURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CompanySettings')/items";
    var dfd = $.Deferred();

    $.ajax({
        url: GetQueryURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            dfd.resolve(data.d.results);

        },
        error: function (data) {
            waitingDialog.hide();
            console.log(data);
            dfd.reject(data);
        }
    });

    return dfd.promise();
}

function onloadGetItem() {
    $(".headdingLinks").text('My Documents');
    $.when(GetExtrenalEmployees(), GetCompanyName()).done(function (ExtreanlEmployees, CompanyName) {

        if (ExtreanlEmployees.length > 0) {
            var path = window.location.pathname;
            var LoggedInPage = path.split("/").pop();
            var CorrectPageName = '';
            if (ExtreanlEmployees[0].TemplateType == "Template2") {
                CorrectPageName = "Guestportal2.aspx";
            }
            else if (ExtreanlEmployees[0].TemplateType == "Template3"||ExtreanlEmployees[0].TemplateType == "TFW Partner Portal") {
                CorrectPageName = "Guestportal3.aspx";
            }
            else if (ExtreanlEmployees[0].TemplateType == "Real Estate") {
                CorrectPageName = "Guestportal4.aspx";
            }
            else {
                CorrectPageName = "Guestportal1.aspx";
            }
            if (LoggedInPage.toLowerCase() == CorrectPageName.toLowerCase())
            //if (LoggedInPage.toLowerCase() == "guestportal4.aspx.aspx")//Bhawana
             {
                $("#userDisplayName").text("");
                $("#userDisplayName").text(_spPageContextInfo.userDisplayName);
                $("#s4-ribbonrow").hide();
                userDocumenturl = ExtreanlEmployees[0].DocumentLibrary;
                currentClientName = ExtreanlEmployees[0].Client_Name.Title;
                getCompanyId(ExtreanlEmployees[0].Client_Name.Id);
                if (userDocumenturl == null) {
                    waitingDialog.hide();
                    $(".HeaderArea").hide();
                    var htmlNotAuthorized = '<div class="col-md-12">' +
                    '<div class="panel panel-default shadow2" style="margin:100px;">' +
                    '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                    '<span><h2 class="text-center">Project site has been deleted. Please contact administrator.</h2></span>';
                    $("#DMSTable").empty().html(htmlNotAuthorized);
                    /*setTimeout(function () { $('#Userdocumentlib').append('<div width="100%" id="viewMyDocuments" style="min-height:500px;">' + htmlNotAuthorized + '</div>'); }, 2000);*/
                }
                else {
                    UrlExists(userDocumenturl, function (status) {
                        if (status === 200) {
                            $(".HeaderArea").show();
                            //GetLibarayDetails('', userDocumenturl, ExtreanlEmployees[0].Client_Name.Title, '', 'GuestDocuments');
                            //Bhawana START To get shared with me
                            $('#btnAddToArchive').hide();
                               arrPermission = [];
                                $(".advance_setion").hide();
                                $("#DMSTable,#ButtonArea,#SearchArea").show();
                                waitingDialog.show();
                                $("#FilterShareType").val("All");
                                $("#ShareFilterRef").val("");
                                $("#FilterShareDocType").val("All");
                                $("#ddlShare").val("Shared");
                                $("#ddlAckFilter").val("All");
                                setTimeout(function () {
                                    $(".headdingLinks").text('Property Documents');
                                    currentSectionType = "SharedWithMe";
                                    DMS_Type = 'Shared with Me';
                                    $("#divRevokeSharedTbl").hide();
                                    //ActionBtnControls();
                                    GetDocumentsSharedWithMe('SharedWithMe');
                                }, 100);
                            //Bhawana END To get shared with me
                            //
                        }
                        else {
                            waitingDialog.hide();
                            $(".HeaderArea").hide();
                            $("#groupDocumentGridtbody").append("<tr><td colspan='8' style='text-align: center;'>Project site has been deleted. Please contact administrator.</td></tr>");
                            var htmlNotAuthorized = '<div class="col-md-12">' +
                                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                                '<span><h2 class="text-center">Project site has been deleted. Please contact administrator.</h2></span>';
                            $("#DMSTable").empty().html(htmlNotAuthorized);
                            /*setTimeout(function () { $('#Userdocumentlib').append('<div width="100%" id="viewMyDocuments" style="min-height:500px;">' + htmlNotAuthorized + '</div>'); }, 2000);*/
                        }
                    });
                }

                dateTime = ShowCommonStandardDateFormat(todayDate);
                $("#LastLogin").text(dateTime);
                var IsValidUpto = ExtreanlEmployees[0].ValidUpto;
                var modifiedDate = new Date(IsValidUpto);
                modifiedDate = new Date(modifiedDate);
                var diffDaysServices = Math.round(modifiedDate.getTime() - todayDate.getTime()) / (one_day);
                if (diffDaysServices > 0) {

                    UserItemid = ExtreanlEmployees[0].ID;
                    $("#txtType").text("");
                    $("#txtType").text(ExtreanlEmployees[0].CollaborationType);
                    $("#txtCompany").text(CompanyName[0].CorporateName);
                    $("#Logoimg").attr('src', CompanyName[0].CompanyLogo.Url);
                    $("#UserOrganization").text(ExtreanlEmployees[0].Client_Name.Title);
                    $("#userVendor").text(ExtreanlEmployees[0].Organization);
                    if (ExtreanlEmployees[0].AttachmentFiles.results.length > 0) {
                        var imageUrl = ExtreanlEmployees[0].AttachmentFiles.results[0].ServerRelativeUrl;
                        FileTitle = ExtreanlEmployees[0].AttachmentFiles.results[0].FileName;
                        IsprofilePic = true;
                        $('#extuserPic').attr('src', imageUrl);
                        $("#headerimageprofile").attr('src', imageUrl);
                    } else {
                        $('#extuserPic').attr('src', _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(ExtreanlEmployees[0].email));
                        $("#headerimageprofile").attr('src', _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(ExtreanlEmployees[0].email));

                    }
                    var txtMember = "";
                    for (var i = 0; i < ExtreanlEmployees[0].InternalStakeholders.results.length; i++) {
                        if (i == 0) {
                            txtMember = ExtreanlEmployees[0].InternalStakeholders.results[i].Title;
                        } else {
                            txtMember += " , " + ExtreanlEmployees[0].InternalStakeholders.results[i].Title;
                        }
                    }
                    $("#txtReferenceNumber").val(ExtreanlEmployees[0].ReferenceCode);
                    $("#txtMembers").val(txtMember);
                    $("#txtName").val(ExtreanlEmployees[0].LoginName.Title);
                    $("#txtEmail").val(ExtreanlEmployees[0].email);
                    $("#txtDesignation").val(ExtreanlEmployees[0].Designation);
                    $("#txtSupervisor").val(ExtreanlEmployees[0].Supervisor.Title);
                    $("#txtOrganization").val(ExtreanlEmployees[0].Organization);
                } else {
                    $("#contentBox").text("");
                    $("#titlerow").hide();
                    alert(" Access Denied.\n The access period has expired.");
                    waitingDialog.hide();
                }
            }
            else {
                alert("You are not authorized to access Digital Workplace");
                window.location.replace(_spPageContextInfo.webAbsoluteUrl+ "/SitePages/GuestHomepage.aspx");
            }
        }
        else {
            $("#contentBox").text("");
            $("#titlerow").hide();
            $("#s4-ribbonrow").hide();
            alert(" Access Denied.\n You are not an authorized user.");
            waitingDialog.hide();
        }

    });
   

}

//to check if UrL exists or not
function UrlExists(url, cb) {
    jQuery.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        complete: function (xhr) {
            if (typeof cb === 'function')
                cb.apply(this, [xhr.status]);
        }
    });
}

//Show hide the buttons section-wise
function ActionBtnControls() {
    arrPermission = [];
    $("#divNew").show();
    $("#divUpload").show();
    $("#divProperties").show();
    $("#AddArchiveBox").hide();
    $("#removeArchiveBox").hide();   
    $("#DivAppExport").hide(); 
    if (currentSectionType == 'GuestDocuments' || currentSectionType == 'Reassigned') {
        $("#divNew").show();
       // $("#divShare").show();//4 April 23
        $("#divUpload").show();
        $("#divDownload").show();
        $("#divProperties").show();
        $("#divDelete").show();
        $("#divFilter").show();
        $(".ShareSectionAct").hide();
        $(".otherSectAct").show();
        $(".fixed-table-footer").hide();
        $("#divPendingAck").hide();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#divDownloadApp").hide();
        $(".btnAppFilter").hide();
        $("#SharedFilterBox").hide();
        $("#divRevokeSharedTbl").hide();
    } 
    else if (currentSectionType == 'ApprovalInbox' || currentSectionType == 'ApprovalOutbox') {
        $("#divDownloadApp").show();
        $("#DivAppInCount").show();
        $(".btnAppFilter").show();
        $(".otherSectAct").show();
        $("#DivAppExport").show(); 
        $("#divNew").hide();
        $("#divUpload").hide();
        $("#divDownload").hide();
        $("#divProperties").hide();
        $("#divDelete").hide();
        $(".ShareSectionAct").hide();
        $(".fixed-table-footer").show();
        $("#divPendingAck").hide();
        $("#DivAppOutCount").hide();
        $("#SharedFilterBox").hide();
        $("#divRevokeSharedTbl").hide();
        $("#divFilter").hide();
       // $("#divShare").hide();//4 April 23

        if (currentSectionType == 'ApprovalInbox'){
        	$("#DivAppInCount").show();
        	$("#DivAppOutCount").hide();
        }
        else {
        	$("#DivAppInCount").hide();
        	$("#DivAppOutCount").show();
        }
    } 
    else if (currentSectionType == 'SharedWithMe' || currentSectionType == 'SharedByMe' || currentSectionType == 'Archive' || $('ul#accordion').find('li.active').attr('id') == 'liSharedDocs') {
        $("#divNew").hide();
        $("#divDownloadApp").hide();
        $(".btnAppFilter").hide()
        $("#divUpload").hide();
        $("#divDownload").show();
        $("#divProperties").hide();
        $("#divDelete").hide();
        $("#btnAdduser").hide();
        //$("#divShare").hide();//4 April 23

        $("#divFilter").hide();
        $("#SharedFilterBox").show();
        $("#divRefreshSharedTbl").show();
        $("#divRevokeSharedTbl").hide();
        $("#DivAppFilter").hide();
        $(".ShareSectionAct").show();
        $(".otherSectAct").hide();
        $(".fixed-table-footer").show();
        $("#DivAppInCount").hide();
        $("#DivAppOutCount").hide();
        $("#onlyforGroup").hide();
        $("#removeArchiveBox").hide();
        if (currentSectionType == 'SharedWithMe') {
            $("#divPendingAck").show();
            $("#AddArchiveBox").show();
        }
        else if (currentSectionType == 'Archive') { //Archiving will work only in Shared With Me section
            $("#AddArchiveBox").hide();
            $("#removeArchiveBox").show();
        }
        else { //Shared By Me
            $("#AddArchiveBox").hide();
            $("#divPendingAck").hide();
            $("#divRevokeSharedTbl").show();
        }
    } 
}

//get companyId of an employee
function getCompanyId(ClientId){
    var Query = "?$select=*,CompanyID/Id&$expand=CompanyID&$top=5000&$filter=Id eq '" + ClientId + "' ";
    $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
    	if(valuesArray.length > 0){
    		Logged_CompanyId = valuesArray[0].CompanyID.Id;
    	}
	});
}

// For dark theme apply 19/4/2022 START
function ApplyDarkThemes(){
	if ($("#dark-theme-btn").is(":checked")) { 
		$(document.body).addClass('dark-theme');
		$("#dark-light-side-opt .dark-theme-btn-label").text("Dark Mode");
		$("#dark-light-side-opt span.material-icons").html("dark_mode");
		$(document.body).attr('style', 'background-color: hsla(228, 5%, 22%, 1) !important');
		// $(".dark-theme .panel-heading-bg-txt-clr").attr("style","background: #494948 !important;color: #fff !important;");
		//Priyanshu - To store Mode in Cookies -----------------------Starts
		document.cookie = "LightDarkMode" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //Delete the cookie first
		createCookie("LightDarkMode", "DarkMode", 1000);
		//-----------------------------------------------------------Ends
	}
	else {
		$(document.body).removeClass('dark-theme');
		$("#dark-light-side-opt .dark-theme-btn-label").text("Light Mode");
		$("#dark-light-side-opt span.material-icons").html("light_mode");
		$(document.body).attr('style', 'background-color: hsla(0, 0%, 100%, 1) !important');
		//Priyanshu - To store Mode in Cookies -----------------------Starts
		document.cookie = "LightDarkMode" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';//Delete the cookie first
		createCookie("LightDarkMode", "LightMode", 1000);
		//-----------------------------------------------------------Ends
	}
}

//Create cookie
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};

//to get the stored cookie value -- Priyanshu
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//to set the stored cookie value -- Priyanshu
function SetStoredTheme() {
    var SetMode = getCookie("LightDarkMode");
    var path = window.location.pathname;
    var Logged_InPageName = path.split("/").pop();
    if (SetMode == "DarkMode") {
    	$("#dark-theme-btn").prop('checked', true);
        $(document.body).addClass('dark-theme');
        $("#dark-light-side-opt .dark-theme-btn-label").text("Dark Mode");
        $("#dark-light-side-opt span.material-icons").html("dark_mode");
        $(document.body).attr('style', 'background-color: hsla(228, 5%, 22%, 1) !important');
    }
    else {
        $(document.body).removeClass('dark-theme');
        $("#dark-light-side-opt .dark-theme-btn-label").text("Light Mode");
        $("#dark-light-side-opt span.material-icons").html("light_mode");
        $(document.body).attr('style', 'background-color: hsla(0, 0%, 100%, 1) !important');
    }
}

// For dark theme apply 19/4/2022 END

//change label as per the 'LabelSettings' list
function ChangeLabels() {
	var preferredLanguage = 'DefaultLanguage';
    if (LabelDefaultLangauge.length == 0) {
        var RestQuery = "?$select=Title,Key,DefaultLanguage&$top=5000&$filter=Title eq 'DMS' ";
        $.when(getItemsWithQuery("LabelsSettings", RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (LabelsSettings) {
            try {
                //alert("test");
                LabelDefaultLangauge = LabelsSettings;
                SetDMSText(LabelsSettings, preferredLanguage);

            } catch (e) {
                alert(e);
            }

        });
    }
    else {
        SetDMSText(LabelDefaultLangauge, preferredLanguage);
    }
}

function SetDMSText(results, preferredLanguage) {
    labels = [];
    $.each(results, function (i, value) {
        var actualText = value['Key'];
        var convertedText = value[preferredLanguage];
        if (convertedText == null || convertedText == "" || convertedText == undefined)
            convertedText = value['DefaultLanguage'];

        var label = {
            labelText_Actual: actualText,
            lableText_Converted: convertedText
        };
        labels.push(label);
    });

    DetectBrowser(); // First Detect Browser then Change All Headings as per selected language.
}

function DetectBrowser() {
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    if (isSafari || isIE) {
        ChangeWebPartsHeadings_OldBrowser();
    } else {
        ChangeWebPartsHeadings();
    }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////// For Latest Browser //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function ChangeWebPartsHeadings() {
    try {
        $("[data-localize]").each(function (i, el) {
            try {
                var controlLabelText = $(this).attr('data-localize');
                var convertedText = labels.find(function (e) {
                    return e.labelText_Actual.trim() === controlLabelText;
                }).lableText_Converted;

                if ($(this).find('a').length > 0) {
                    $(this).find('a').html(convertedText);
                } else if ($(this).find('b').length > 0) {
                    $(this).find('b').html(convertedText);
                } else if ($(this).find('p').length > 0) {
                    $(this).find('p').html(convertedText);
                } else if ($(this).hasClass("button")) {
                    $(this).attr('value', convertedText);
                } else {
                    $(this).html(convertedText);
                }
            } catch (ex) {
                console.log("Multilingual : " + controlLabelText + " key not found.");
                $(this).attr("value", $(this).val());
            }
        });
    } catch (error) {
        console.log("Multilingual : " + error);
    }
}

//////////////////////////////////////////////////////////////////////
////////////////// IE Browser and Windows Safar 5.1.7 ////////////////
//////////////////////////////////////////////////////////////////////
function ChangeWebPartsHeadings_OldBrowser() {
    try {
        $("[data-localize]").each(function (i, el) {
            try {
                var controlLabelText = $(this).attr('data-localize');
                var convertedText = findObjectByKey(labels, controlLabelText, controlLabelText);

                if ($(this).find('a').length > 0) {
                    $(this).find('a').html(convertedText);
                }
                else if ($(this).find('b').length > 0) {
                    $(this).find('b').html(convertedText);
                }
                else if ($(this).find('p').length > 0) {
                    $(this).find('p').html(convertedText);
                }
                else if ($(this).hasClass("button")) {
                    if (convertedText != null && convertedText != "null" && convertedText != "") {
                        $(this).attr('value', convertedText);
                    }
                    else {
                        $(this).attr("value", $(this).val());
                    }
                } else {
                    if (convertedText != null && convertedText != "null" && convertedText != "") {
                        $(this).html(convertedText);
                    }
                    else {
                        $(this).html($(this).text());
                    }
                }
            } catch (ex) {
                console.log("Multilingual : " + controlLabelText + " key not found.");
                $(this).attr("value", $(this).val());
            }
        });
    } catch (error) {
        console.log("Multilingual : " + error);
    }
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].labelText_Actual == value) {
            //alert(array[i].labelText_Actual);

            return array[i].lableText_Converted;
        }
    }
    return null;
}
