var lastLogin = _spPageContextInfo;
var UserItemid, FileTitle, IsprofilePic = false;
var todayDate = new Date();
var UserEmail;
var userDocumenturl;
var TemplateType;
// One day Time in ms (milliseconds) 
var one_day = 1000 * 60 * 60 * 24;
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

onloadGetItem();

$(document).ready(function() {
    // Add minus icon for collapse element which is open by default
    $(".collapse.in").each(function() {
        $(this)
            .siblings(".panel-heading")
            .find(".glyphicon-chevron-right")
            .addClass("rotate");
    });

    // Toggle plus minus icon on show hide of collapse element
    $(".collapse")
        .on("show.bs.collapse", function() {
            $(this)
                .parent()
                .find(".glyphicon-chevron-right")
                .addClass("rotate");
        })
        .on("hide.bs.collapse", function() {
            $(this)
                .parent()
                .find(".glyphicon-chevron-right")
                .removeClass("rotate");
        });



    $("#userDisplayName").text("");
    $("#userDisplayName").text(_spPageContextInfo.userDisplayName);


    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    $("#ChangeUploadPic").change(function() {
        readURL(this);
    });

$("#ancclick").click(function() {
 
 var UrlguestPortal=_spPageContextInfo.webAbsoluteUrl;
   if(TemplateType=="Template2") {
   	window.location.replace(UrlguestPortal+"/SitePages/Guestportal2.aspx");
   }
   else if(TemplateType=="Template3") {
   		window.location.replace(UrlguestPortal+"/SitePages/Guestportal3.aspx");
   }
   else if(TemplateType=="Property Documents") {//Bhawana
   		window.location.replace(UrlguestPortal+"/SitePages/Guestportal4.aspx");
   }
    else if(TemplateType=="Adapt Marketing") {//Bhawana
   		window.location.replace(UrlguestPortal+"/SitePages/Guestportal3.aspx");
   }
   else {
      	window.location.replace(UrlguestPortal+"/SitePages/Guestportal1.aspx");
   }
});


});

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
        time = hour + ":" + minutes + ":" + suffix;

    } else {
        time = "";
    }

    return cur_day + " " + time;

}

function onloadGetItem() {

    $.when(GetExtrenalEmployees(), GetCompanyName()).done(function(ExtreanlEmployees, CompanyName) {

        if (ExtreanlEmployees.length > 0) {
            $("#userDisplayName").text("");
            $("#userDisplayName").text(_spPageContextInfo.userDisplayName);
            $("#s4-ribbonrow").hide();
            userDocumenturl = ExtreanlEmployees[0].DocumentLibrary;
            $("#Userdocumentlib").append('<iframe width="100%" id="" style="min-height:650px;" src="' + userDocumenturl + '"></iframe>');
            dateTime = ShortDateTime(todayDate, true);
            $("#date").text(dateTime);
            var IsValidUpto = ExtreanlEmployees[0].ValidUpto;
            var modifiedDate = new Date(IsValidUpto);
            modifiedDate = new Date(modifiedDate);
            var diffDaysServices = Math.round(modifiedDate.getTime() - todayDate.getTime()) / (one_day);
            if (diffDaysServices > 0) {

                UserItemid = ExtreanlEmployees[0].ID;
                $("#txtType").text("");
                $("#txtType").text(ExtreanlEmployees[0].Designation);
                $("#txtTypehtml").text(ExtreanlEmployees[0].CollaborationType + "");
                //$("#txtTypehtml").text(ExtreanlEmployees[0].CollaborationType + " Portal");
                $("#txtCompanyhtml").text("" + CompanyName[0].CorporateName);
                var Association = getAssociationName(ExtreanlEmployees[0].Client_Name.Title.trim());
                if(Association == "Individual"){
                	$("#txtCompany").text("");
                }
                else {
                	$("#txtCompany").text(" " + ExtreanlEmployees[0].Client_Name.Title.trim());
                }
                
                TemplateType=ExtreanlEmployees[0].TemplateType;
                
                /*--------Start Emage coding----------*/
                if(TemplateType=="Template1") {
                    $("#guestUserImage").attr('src','https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/ImageGallery/GuestPortal_Home_Template1.png')
                }
                else if(TemplateType=="Template2") {
                    $("#guestUserImage").attr('src', 'https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/ImageGallery/GuestPortal_Home_Template2.png')
                }
                else if(TemplateType=="Template3") {
                    $("#guestUserImage").attr('src','https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/ImageGallery/GuestPortal_Home_Template3.png')
                }
                else if(TemplateType=="Real Estate") {
                    $("#guestUserImage").attr('src','https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/ImageGallery/GuestPortal_Home_Real_Estate.png')
                }
                else if(TemplateType=="TFW Partner Portal") {
                    $("#guestUserImage").attr('src','https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/ImageGallery/GuestPortal_Home_TFW_Partner.png')
                }
                
                else {
                    $("#guestUserImage").attr('src','https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/Titan-ExternalUserPortal/images/GuestUser_Home_Background.png')
                    
                }
                
                /*-------------------end-----------------------*/
                
                $("#Logoimg").attr('src', CompanyName[0].CompanyLogo.Url)
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

            }



        } else {

            $("#contentBox").text("");
            $("#titlerow").hide();
            $("#s4-ribbonrow").hide();
            alert("Access Denied.You are not an authorized user.");



        }



    });

}


function getAssociationName(Association) {
	var AssociatioName = '';
	 var GetQueryURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ClientMaster')/items?$top=5000&$select=ID,Title,Association&$filter=Title eq '" + Association + "' ";
    var dfd = $.Deferred();

    $.ajax({
        url: GetQueryURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function(data) {
            //dfd.resolve(data.d.results[0].Association);
            AssociatioName = data.d.results[0].Association;
        },
        error: function(data) {
            console.log(data);
            dfd.reject(data);
        }
    });

    return AssociatioName ;
}

function GetExtrenalEmployees() {
   
       var ValidUptodate = new Date();
      ValidUptodate.setDate(ValidUptodate.getDate() - 1);
   
    var GetQueryURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ExternalUsers')/items?$top=1&$select=*,ID,LoginName/Title,InternalStakeholders/Title,Supervisor/Title,AttachmentFiles,Client_Name/Title&$expand=LoginName,Client_Name,InternalStakeholders,Supervisor,AttachmentFiles &$filter= email eq '" + _spPageContextInfo.userLoginName + "' ";

    var dfd = $.Deferred();

    $.ajax({
        url: GetQueryURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function(data) {
            dfd.resolve(data.d.results);

        },
        error: function(data) {
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
        success: function(data) {
            dfd.resolve(data.d.results);

        },
        error: function(data) {
            console.log(data);
            dfd.reject(data);
        }
    });

    return dfd.promise();


}

function logout() {

    var Istrue = confirm("Are you sure to logout SharePoint?")
    if (Istrue) {
        ///_layouts/15/closeConnection.aspx?loginasanotheruser=true
        window.location.href = _spPageContextInfo.webServerRelativeUrl + "/_layouts/signout.aspx";
    }
}

