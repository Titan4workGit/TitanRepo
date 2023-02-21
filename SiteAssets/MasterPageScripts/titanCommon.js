var CommonFunction = [];
var GetAllUserOwner = [];
var AllEmployeeuser = [],
OwnersUser = [],
AdministratorUser = [];
var IsNewsEvenryOne = false;
var IsTechadmin = true;
var DeferredObj;
var RestQuery;
var EmployeeDetails;
var Employeeprofilepic;
var Logged_DepartmentId = '';
var Logged_DepartmentName = '';
var Logged_Location = '';
var Logged_Designation = '';
var Logged_CompanyId = ''
var Logged_CompanyName = ''
var Logged_DepartmentName = ''
var Logged_EmpLicense='';
var currentUserProfileData = [];
var Metadata;
var ckTableRows='';
var my_custm_val='';
$(document).ready(function() {
    var my_url = $(location).attr('href');
    var PageName = my_url.split('/');
    PageName = PageName[PageName.length - 1];
    my_custm_val = my_url.slice(-5);
    
    TeamsOpenGearMenu();
    checkTimeSheetVisibility();
    homePageFilter();
    if(my_custm_val === "?TEAM") {
        //  $('#right3').show();
        //  $('.TeamTab').show();
        if(location.href.split("/").pop().split("?").shift() == "Document.aspx") {
            $('.tab-col').addClass('main-menu-panel increase_width');
            $('.deta-col').addClass('main-deta-panel increase_width');
             $('#accordion').addClass('showning_name');//Bhawana
            $("#AddTeamDoc").hide();
            $('#liSync').hide();//Bhawana 
             $('#liEmails').hide();
            $("#TopToggleArrw").hide();
        }

        $('.TeamTab').hide();
        //$(".SideTabMenu").addClass("TeamTopTabMenu");
        //$('.BrowserTab').hide();
       	// $("#SideTabIdMenu").addClass("TeamTopTabMenu");
        $("#s4-ribbonrow").hide();
        $("#navbarLogoLink").hide(); //Swapnil
        $("#global-menu-gear").show(); //Swapnil
        //$("#s4-bodyContainer .navbar-custom").hide(); //Swapnil
        $("#s4-bodyContainer .navbar-custom").show(); //Swapnil
        $('#s4-bodyContainer .navbar-custom').addClass('navbar-custom-for-teams'); //Swapnil
        //$("#myNavbar").hide(); //Swapnil
        $("#below-navigation-control-strip").hide(); //Swapnil
        $("#suiteBarTop").hide();
        $("#tickerDiv").hide();
        window.sessionStorage
        sessionStorage.setItem("key", "TEAM");
    }
    if(my_custm_val === "MODAL") {
        $('.TeamTab').hide();
        $('.titan-footer').hide();
        $('.SideTabMenu').hide();
        $('.BrowserTab').hide();
        $("#s4-ribbonrow").hide();
        $("#s4-bodyContainer .navbar-custom").hide();
        $("#myNavbar").hide();
        $("#suiteBarTop").hide();
        $("#tickerDiv").hide();
        if(PageName.split('?')[0] == 'Announcements.aspx') {
            $('.entry_screen_dropzone_images').remove();
            $('.entry_screen_dropzone_attachments').remove();
        }
    }
    var MyTeamValue = sessionStorage.getItem("key");
    if(MyTeamValue === "TEAM") {
        // $('.TeamTab').show();
        if(location.href.split("/").pop().split("?").shift() == "Document.aspx") {
            $('.tab-col').addClass('main-menu-panel increase_width');
            $('.deta-col').addClass('main-deta-panel increase_width');
           $('#accordion').addClass('showning_name');//Bhawana
           $('#liSync').hide();//Bhawana 
            $('#liEmails').hide();
            $("#AddTeamDoc").hide();
            $("#TopToggleArrw").hide();
        }
        $('.TeamTab').hide();
        //$('.BrowserTab').hide();
        $("#s4-ribbonrow").hide();
        $("#navbarLogoLink").hide(); //Swapnil
        $("#global-menu-gear").show(); //Swapnil
		//$("#s4-bodyContainer .navbar-custom").hide(); //Swapnil
        $("#s4-bodyContainer .navbar-custom").show(); //Swapnil
        $('#s4-bodyContainer .navbar-custom').addClass('navbar-custom-for-teams'); //Swapnil
        //$("#myNavbar").hide(); //Swapnil
        $("#below-navigation-control-strip").hide(); //Swapnil

        $("#suiteBarTop").hide();
        $("#tickerDiv").hide();
    }
    if(MyTeamValue === "MODAL") {
        // $('.TeamTab').show();
        if(location.href.split("/").pop().split("?").shift() == "Document.aspx") {
            $('.tab-col').addClass('main-menu-panel increase_width');
            $('.deta-col').addClass('main-deta-panel increase_width');
            $("#AddTeamDoc").hide();
            $("#TopToggleArrw").hide();
        }
        $('.TeamTab').hide();
        $('.BrowserTab').hide();
        $("#s4-ribbonrow").hide();
        $("#s4-bodyContainer .navbar-custom").hide();
        $("#suiteBarTop").hide();
        $("#tickerDiv").hide();
    }
    GetEmployeeDetailsUser();
    $('#TitanQR').click(function(e) { //Priyanshu change - 19/May/2021
        createQRCodeForTitan();
    });
   
    TeamGearIconOverlap();
    //getTechAdminPermission();
    ckTableRows = titanForWork.readTargetUrlCookie("TableRows");//Bhawana

});


var waitingDialog = waitingDialog || (function ($) {
    'use strict';

    // Creating modal dialog's DOM
    var $dialog = $(
        '<div class="modal fade page-load-outer-div" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="overflow-y:visible;opacity: 1 !important;">' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content" style="box-shadow: 0 0px 0px;border:0px solid #999;background-color: rgba(255, 255, 255, .15);">' +
        '<div class="modal-header page-load-header" style="padding:0px !important;"><div class="loader"><div class="la-ball-pulse la-2x" style="margin-left:auto;margin-right:auto;"><div style="background-color:#d85757"></div><div style="background-color:#d85757"></div><div style="background-color:#d85757"></div></div></div><h3 style="margin:0;margin-left:15px;float:left;margin-top:6px;display:none;"></h3></div>' +
        '<div class="modal-body" style="display:none;">' +
        '<div class="progress progress-striped active" style="margin-bottom:0;display:none"><div class="progress-bar" style="width: 100%"></div></div>' +
        '</div>' +
        '</div></div></div>');

    return {
        /**
         * Opens our dialog
         * @param message Custom message
         * @param options Custom options:
         * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
         * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
         */
        show: function (message, options) {
            // Assigning defaults

            if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Processing...please wait';
            }
            var settings = $.extend({
                dialogSize: 'm',
                progressType: '',
                onHide: null // This callback runs after the dialog was hidden
            }, options);

            // Configuring dialog
            //$('.hidding-y-scroll').css('overflow-y','hidden');
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    settings.onHide.call($dialog);
                });
            }
            $("#overlaysearch").fadeIn();
        },
        /**
         * Closes dialog
         */
        hide: function () {
            $("#overlaysearch").fadeOut();
        }
    };

})(jQuery);


$("#suiteBarTop").hide();
$("#RibbonContainer").hide();
$("#s4-ribbonrow").hide();
$("#ms-designer-ribbon").hide();
$("#suiteBarDelta").hide();


var titanForWork = [];
titanForWork.getQueryStringParameter = function (paramToRetrieve) {
    if (paramToRetrieve == "CompanyId" || paramToRetrieve == "CompanySiteUrl" || paramToRetrieve == "DepartmentId" || paramToRetrieve == "DepartmentSiteUrl" || paramToRetrieve == "WelcomePageCalled") {
        var cookiesCollection = titanForWork.readTargetUrlCookie(_spPageContextInfo.siteId);
        var jsonobj = JSON.parse(cookiesCollection);
        if (cookiesCollection != null) {
            if (paramToRetrieve == "CompanyId") {
                return jsonobj.CompanyId;
            } else if (paramToRetrieve == "CompanySiteUrl") {
                return jsonobj.CompanySiteUrl;
            } else if (paramToRetrieve == "DepartmentId") {
                return jsonobj.DepartmentId;
            } else if (paramToRetrieve == "DepartmentSiteUrl") {
                return jsonobj.DepartmentSiteUrl;
            } else if (paramToRetrieve == "WelcomePageCalled") {
                return jsonobj.WelcomePageCalled;
            }
        }
        else {
            if (EmployeeDetails == null) {
                var DeptSite = '';
                RestQuery = "?$select=*,OfficeLocation/Title,LogonName/EMail,ManagerLoginName/Title,ManagerLoginName/Id,ManagerLoginName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/Title,Company/ID &$expand=OfficeLocation,LogonName,Department,Company,AttachmentFiles,ManagerLoginName&$filter=LogonName/ID eq " + _spPageContextInfo.userId + " and Status eq 'Active' ";
                $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function (Employees) {
                    if (Employees.results.length > 0) {
                        EmployeeDetails = Employees.results;
                        if(EmployeeDetails.length==1)
                        {
                          var MyTeamValue = sessionStorage.getItem("key");
                          if(MyTeamValue=='?TEAM' || my_custm_val=='?TEAM')
                          {
                             $('#teamsNavDiv').attr('display','none');
                          }   
                        }
                        
                        if (paramToRetrieve == "CompanyId") {
                            return EmployeeDetails[0].CompanyId.toString();
                        } else if (paramToRetrieve == "CompanySiteUrl") {
                            return titanForWork.currentCompanyUrl(EmployeeDetails[0].CompanyId);
                        } else if (paramToRetrieve == "DepartmentId") {
                            return EmployeeDetails[0].Department.ID;
                        } else if (paramToRetrieve == "DepartmentSiteUrl") {
                            return DeptSite;
                        } else if (paramToRetrieve == "WelcomePageCalled") {
                            return true;
                        }
                    }
                });
            }
            else {
                if (paramToRetrieve == "CompanyId") {
                    return EmployeeDetails[0].CompanyId.toString();
                } else if (paramToRetrieve == "CompanySiteUrl") {
                    return titanForWork.currentCompanyUrl(EmployeeDetails[0].CompanyId);
                } else if (paramToRetrieve == "DepartmentId") {
                    return EmployeeDetails[0].Department.ID;
                } else if (paramToRetrieve == "DepartmentSiteUrl") {
                    return DeptSite;
                } else if (paramToRetrieve == "WelcomePageCalled") {
                    return true;
                }
            }
        }
    }
    else {
        if (document.URL.split("?")[1] != null) {
            var params =
                document.URL.split("?")[1].split("&");
            var strParams = "";
            for (var i = 0; i < params.length; i = i + 1) {
                var singleParam = params[i].split("=");
                if (singleParam[0] == paramToRetrieve)
                    return singleParam[1];
            }

        }


    }
};

titanForWork.createCookie = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};

titanForWork.readTargetUrlCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

titanForWork.deletequeryStringCookies = function () {
    //Delete cookie by passing null as value:
    document.cookie = _spPageContextInfo.siteId + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};


titanForWork.currentCompanyUrl = function (currentComapnyId) {
    //MyCurrentDepartment(currentComapnyId);
    var companyWiseURls = "";
    var listName = 'Companies';
    var titansiteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,SiteURL&$filter=ID eq '" + currentComapnyId + "'";
    $.ajax({
        url: titansiteURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                return companyWiseURls = items[0].SiteURL;
            }

        },
        eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
    return companyWiseURls
};


var IsTimesheetInvisible = true;
var IsAttendanceInvisible = true;
//get EnviorMental settings for Timesheet and Attendance feature
function checkTimeSheetVisibility() {
    RestQuery = "?$select=ID,Title,Invisibility&$filter=Title eq 'Timesheet Entry' and Invisibility eq '0' ";
    $.when(CommonFunction.getItemsWithQueryItem("EnvironmentalSettings", RestQuery)).done(function (EnvironmentalSettings) {
        if (EnvironmentalSettings.results.length) {
            IsTimesheetInvisible = false;
        }
    });
    RestQuery = "?$select=ID,Title,Invisibility&$filter= Title eq 'Attendance Entry' and Invisibility eq '0' ";
    $.when(CommonFunction.getItemsWithQueryItem("EnvironmentalSettings", RestQuery)).done(function (EnvironmentalSettings) {
        if (EnvironmentalSettings.results.length) {
            IsAttendanceInvisible = false;
        }
    });

};

///////////////////////////////////////// TITAN Total Users Licences Required and License Valid Till /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Licensingprotocol() {
    try {
        if (UsersLicenceRequired) {

        }
    } catch (e) {
        $(".header-container").html('');
        alert("Licensing protocol not setup properly please contact titan support team");
    }

}
Licensingprotocol();

var htmlNotAuthorized = "";

function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

titanForWork.titanLicenced = function () {
    var currentDate = new Date();
    htmlNotAuthorized = '<div class="col-md-12">';
    htmlNotAuthorized += '<div class="panel panel-default shadow2" style="margin:100px;">';
    htmlNotAuthorized += '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>';
    htmlNotAuthorized += '<span><h2 class="text-center">You are not authorized to access Digital Workplace </h2></span>';

    var Istrue = false;
    if (window.location.host.toLowerCase() != domainName.toLowerCase()) {
        $(".header-container").html('');
        Istrue = true;
        htmlNotAuthorized += '<span><h2 class="text-center">Invalid Domain </h2></span>';
    }
    if (licenseValidTill < currentDate) {
        $(".header-container").html('');
        Istrue = true;
        htmlNotAuthorized += '<span><h2 class="text-center">License Date has been expired </h2></span>';
    }
    htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
    htmlNotAuthorized += '<div class="form-group" id="LicnseActivelink" style="display:block">' +
        '<div class="col-sm-5 col-xs-6"><a href="javascript:void(0)" style="font-size:24px" onclick="License.HideShow();">Click here for enter License</a> </div>' +
        '</div>' +

        '<div class="form-group" id="ActiveLicense" style="display:none">' +
        '<div class="col-sm-5 col-xs-6">License Key : </div>' +
        '<div class="col-sm-7 col-xs-6">' +
        '<textarea id="LicenseDescription" placeholder="enter license key then click on License Submit button" class="form-control" rows="8"></textarea>' +
        '</div>' +
        '<input id="LicenseSubmit" style="display:none" onclick="License.LicenseSubmit();" type="button" style="font-size: 13px;" class="btn btn-outline-success button pull-right"  value="License Submit">';
    htmlNotAuthorized += '</div></div></div></div>';
    if (Istrue) {
        $('.wrapper').append(htmlNotAuthorized);
    }

}


titanForWork.convertJSONDateAMPMWithDate = function (jsonDateTime) {

    var date = new Date(jsonDateTime);
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + strTime;
}

titanForWork.GetValueFromQueryString = function (paramToRetrieve) {

    if (document.URL.split("?")[1] != null) {
        var params =
            document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve)
                return singleParam[1];
        }

    }


}
titanForWork.ShowCommonStandardDateFormat = function (datestring) {

    var dateFormatLocal = datestring.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).split(' ').join('-');

    return dateFormatLocal;
}

function ShowCommonDateFormat(datestring) {
    var dateFormatLocal = datestring.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).split(' ').join(' ');

    return dateFormatLocal;

}



//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Add Notification into Notification Center List  //////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function NotificationCenter(title, description, webPartName) {
    try {
        var Metadata;
        var ItemType = GetItemTypeForList("NotificationCenter");
        Metadata = {
            __metadata: {
                'type': ItemType
            },

            Title: title,
            Details: description,
            WebpartName: webPartName
        };
        AddItemIntoNotificationCenter("NotificationCenter", Metadata);

    } catch (error) {
        console.log(error.message);
    }
}

function AddItemIntoNotificationCenter(ListName, Metadata) {
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
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

function GetItemTypeForList(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// Pages Authorization ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
titanForWork.PageAuthorization = function (WebPartName, companyId) {
    var deferred = $.Deferred();
    var currentUserRights = [];
    var message = "You are not authorized to access this page."

    if ($.cookie("CurrentUserRights") != undefined) // If Current User Rights found in Cookies then don't need to make a call to get data from list.
    {
        currentUserRights = JSON.parse($.cookie("CurrentUserRights"));
        if (currentUserRights.length > 0 && currentUserRights[0].UserId == _spPageContextInfo.userId && currentUserRights[0].CompanyId == companyId) {
            deferred.resolve(currentUserRights, message);
        } else // If Current User Rights don't find in Cookies (For appropriate company) then make a call to get data from list.
        {
            GetUserRights(companyId).done(function (userRights) {
                titanForWork.createCookie("CurrentUserRights", JSON.stringify(userRights), 10);

                deferred.resolve(userRights, message);
            });
        }
    } else // If Current User Rights don't find in Cookies then make a call to get data from list.
    {
        GetUserRights(companyId).done(function (userRights) {
            titanForWork.createCookie("CurrentUserRights", JSON.stringify(userRights), 10);

            deferred.resolve(userRights, message);
        });
    }

    return deferred;
}
titanForWork.PageAuthorization = function (WebPartName, companyId) {
    var deferred = $.Deferred();
    var currentUserRights = [];
    var message = "You are not authorized to access this page."

    GetUserRights(companyId).done(function (userRights) {
        deferred.resolve(userRights, message);
    });

    return deferred;
}

///////////////////////////////////////////////////////////////
/////// Get Tech Admin, HR Admin and SiteAdmin
///////////////////////////////////////////////////////////////
function GetUserRights(companyId) {
    var deferred = $.Deferred();

    var currentUserRights = [];
    var currentUserRight = {};

    if (_spPageContextInfo.isSiteAdmin == true) {
        currentUserRight.SiteAdmin = "SiteAdmin";
        currentUserRights.push(currentUserRight);

        deferred.resolve(currentUserRights);
    } else {
        var rightsCollections = new Array();
        rightsCollections.push("Tech Admin");
        rightsCollections.push("HR Admin");

        var users = GetCurrentUserRights(companyId, "", rightsCollections);
        for (var index = 0; index < users.length; index++) {
            if (users[index].webPartName == "Tech Admin") {
                currentUserRight.TechAdmin = "TechAdmin";
                break;
            } else if (users[index].webPartName == "HR Admin") {
                currentUserRight.HRAdmin = "HRAdmin";
            }
        }
        currentUserRights.push(currentUserRight);

        deferred.resolve(currentUserRights);
    }

    return deferred;
}

function GetCurrentUserRights(company, department, webPartCollection) {
    var webPartCollectionResult = new Array();
    var currentUserID = GetLoggedUserID();
    var usersQuery = "";
    if (department == null || department == "") {
        usersQuery = "&$filter=CompanyId eq '" + company + "' and DepartmentId eq null";
    } else {
        usersQuery = "&$filter=CompanyId eq '" + company + "' and DepartmentId eq '" + department + "'";
    }
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=ID,LimitedAccessId,ApproverId,ContributorsId,WebPartName,CompanyId,DepartmentId" + usersQuery;
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            var response = data;
            for (var groupIndex = 0; groupIndex < response.d.results.length; groupIndex++) {
                if (webPartCollection.indexOf(response.d.results[groupIndex].WebPartName) != -1) {
                    if (response.d.results[groupIndex].ContributorsId != null) ////Contribute Access
                    {
                        for (var subGrroupIndex = 0; subGrroupIndex < response.d.results[groupIndex].ContributorsId.results.length; subGrroupIndex++) {
                            var userId = response.d.results[groupIndex].ContributorsId.results[subGrroupIndex];
                            if (userId == currentUserID) {
                                webPartCollectionResult.push(GetUserPermissionClass(response.d.results[groupIndex].WebPartName, "Contribution"));
                            }
                        }
                    }
                }
            }
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
    return webPartCollectionResult;
}

function GetUserPermissionClass(webPartName, permissionLevel) {
    var userinfopermission = {};
    userinfopermission.webPartName = webPartName;
    userinfopermission.permissionLevel = permissionLevel;
    return userinfopermission;
}

function GetLoggedUserID() {
    var currentUserId = "";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/currentUser",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            currentUserId = data.d.Id; //Assigning UserId Variable          
        },
        error: function (data) { }
    });
    return currentUserId;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// File Icon Finder //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var arrayLinksDoctypeGlobal = new Array();
titanForWork.GetDocumentTypeIcon = function (FileName) {
    var urlLink = "";

    for (var index = 0; index < arrayLinksDoctypeGlobal.length; index++) {
        if (arrayLinksDoctypeGlobal[index].iconType.split('.')[0].indexOf(FileName.split('.')[1]) != -1) {
            urlLink = arrayLinksDoctypeGlobal[index].image;
        }
    }
    if (urlLink.length == 0) {

        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/maptoicon(filename='" + FileName + "',progid='',size=0)";
        $.ajax({
            url: url,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            async: false,
            success: function (data) {
                var icon = "<img src='" + _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/images/" + data.d.MapToIcon + "'/>";
                urlLink = icon;
                arrayLinksDoctypeGlobal.push(titanForWork.IconProperties(data.d.MapToIcon, icon)); //Add new document type url
            },
            eror: function (data) {
                console.log('error');
            }
        });
    }
    return urlLink;
}

titanForWork.IconProperties = function (iconType, imagePath) {
    var icoProp = [];
    icoProp.iconType = iconType;
    icoProp.image = imagePath;
    return icoProp;
}
/////////////////////////////////////////////////////////// End ///////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Workflow Approvers Logics (Create Task for Approval) ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
titanForWork.CreateWorkflowTaskForApproval = function CreateWorkflowTaskForApproval(itemId, companyId, departmentId, webpartName, title, description, Category) {

    var dfd = $.Deferred();
    if (companyId > 0 && departmentId == 0) {
        var webURI = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=*&$filter=CompanyId eq '" + companyId + "' and WebPartName eq '" + webpartName + "'";
    } else if (companyId > 0 && departmentId > 0) {
        var webURI = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=*&$filter=CompanyId eq '" + companyId + "' and DepartmentId eq '" + departmentId + "' and WebPartName eq '" + webpartName + "'";
    }

    $.ajax({
        url: webURI,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                if (items[0].ApproverRequired == true) {
                    var allUsersID = new Array();
                    var requestorAndApproverBothAreSame = false;

                    for (var groupIndex = 0; groupIndex < items.length; groupIndex++) {
                        for (var subGroupIndex = 0; subGroupIndex < items[groupIndex].ApproverId.results.length; subGroupIndex++) {
                            if (items[groupIndex].ApproverId.results[subGroupIndex] == _spPageContextInfo.userId) {
                                requestorAndApproverBothAreSame = true;
                                break;
                            } else if (allUsersID.indexOf(items[groupIndex].ApproverId.results[subGroupIndex]) == -1) {
                                allUsersID.push(items[groupIndex].ApproverId.results[subGroupIndex]);
                            }
                        }
                    }
                    if (allUsersID.length > 0 && requestorAndApproverBothAreSame == false) {
                        titanForWork.CreateApprovalTask(allUsersID, itemId, companyId, departmentId, webpartName, title, description, Category);
                        dfd.resolve("ApprovalRequired");
                        console.log("Approver Required for " + webpartName);
                    } else {
                        dfd.resolve("ApprovalNotRequired");
                        console.log("Approver Not Required for " + webpartName);
                    }
                } else {
                    dfd.resolve("ApprovalNotRequired");
                    console.log("Approver Not Required for " + webpartName);
                }
            }

        },
        eror: function (data) {
            //console.log($('#txtSomethingWentWrong').val());
            dfd.reject("Error occured");
        }
    });
    return dfd;
}


titanForWork.CreateApprovalTask = function CreateApprovalTask(allUsersID, itemId, companyId, departmentId, webpartName, title, description, Category) {

    try {
        var CategoryType = '';
        if (Category == null || Category == undefined) {
            CategoryType = webpartName;
        } else {
            CategoryType = Category;
        }

        var dfd = $.Deferred();
        var ItemType = GetItemTypeForList("ApprovalTaskList");
        var Metadata = {
            __metadata: {
                'type': ItemType
            },

            Title: title,
            Details: description,
            CompanyId: companyId,
            DepartmentIdId: departmentId,
            ApproversId: {
                'results': allUsersID
            },
            WebpartName: webpartName,
            Status: "Initiated",
            Category: CategoryType,
            ItemId: itemId
        };

        if (departmentId == 0) // Delete DepartmentId metadata if Tasks Creation for Company Level Webparts.
        {
            delete Metadata["DepartmentId"];
        }

        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTaskList')/items",
            type: "POST",
            async: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose"
            },
            data: JSON.stringify(Metadata),
            success: function (data) {
                dfd.resolve("Success");
            },
            error: function (error) {
                console.log(JSON.stringify(error));
                dfd.reject("Failure");
            }
        });
        return dfd.promise();
    } catch (error) {
        console.log(error.message);
    }
}
//////////////////////////////////////////////////// End ////////////////////////////////////////////////////////


////////////////////////////////////////////// Get Item ID of Approval Task List //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
titanForWork.GetItemIDOfApprovalTaskList = function GetItemIDOfApprovalTaskList(requestItemID, CompanyId, WebPartName) {
    var deferred = $.Deferred();
    var listName = "ApprovalTaskList";
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/Items?$select=ID&$filter=ItemId eq " + requestItemID + " and CompanyId eq " + CompanyId + " and WebpartName eq '" + WebPartName + "'";

    $.ajax({
        url: requestUri,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                deferred.resolve(items[0].ID);
            }
        }
    })
    return deferred;
}

titanForWork.GetItemIDOfApprovalTaskListasync = function GetItemIDOfApprovalTaskList(requestItemID, CompanyId, WebPartName) {
    var deferred = $.Deferred();
    var listName = "ApprovalTaskList";
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/Items?$select=ID&$filter=ItemId eq " + requestItemID + " and CompanyId eq " + CompanyId + " and WebpartName eq '" + WebPartName + "'";

    $.ajax({
        url: requestUri,
        async: false,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                deferred.resolve(items[0].ID);
            }
        }
    })
    return deferred;
}


titanForWork.DeleteTaskItem = function DeleteTaskItem(taskItemID) {
    var listName = "ApprovalTaskList";
    var ItemType = GetItemTypeForList(listName);

    var webURI = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/GetItemByID(" + taskItemID + ")";
    $.ajax({
        url: webURI,
        type: "DELETE",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*"
        },
        success: function (data) {
            //dfd.resolve(data);
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            //dfd.reject(error);
        }
    });
}
titanForWork.DeleteTaskItemasync = function DeleteTaskItem(taskItemID) {
    var listName = "ApprovalTaskList";
    var ItemType = GetItemTypeForList(listName);

    var webURI = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/GetItemByID(" + taskItemID + ")";
    $.ajax({
        url: webURI,
        type: "DELETE",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*"
        },
        success: function (data) {
            //dfd.resolve(data);
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            //dfd.reject(error);
        }
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// TEAM's Js For hiding Ribbon & Headers //////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

var License = {
    HideShow: function () {
        $("#ActiveLicense").show();
        $("#LicenseSubmit").show();
        $("#LicnseActivelink").hide();
    },
    LicenseSubmit: function () {
        if ($("#LicenseDescription").val() != "") {
            var ItemType = CommonJS.GetItemTypeForListName("EnvironmentalSettings");
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Description: $("#LicenseDescription").val()
            };
            RestQuery = "?$select=*&$filter= Title eq 'License' &$orderby=Order asc";
            $.when(CommonJS.getItemsWithQueryItem("EnvironmentalSettings", RestQuery)).done(function (EnvironmentalSettings) {
                $.when(CommonJS.updateItemWithID("EnvironmentalSettings", Metadata, EnvironmentalSettings.results[0].Id)).done(function (EnvironmentalSettings) {
                    var rst = EnvironmentalSettings;
                    alert("Done")
                    location.reload();
                });
                //License.UpdateListItem("EnvironmentalSettings",  EnvironmentalSettings.results[0].Id);
            });
        } else {
            alert("enter license key then click on License Submit button");
            $("#LicenseDescription").focus();
        }
    },
    UpdateListItem: function (Listname, id) {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(Listname);
        this.oListItem = oList.getItemById(id);
        oListItem.set_item('Description', $("#LicenseDescription").val());
        oListItem.update();
        clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
    },

    onQuerySucceeded: function () {
        alert('Item updated!');
    },

    onQueryFailed: function (sender, args) {
        alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }
}

function MyCurrentDepartment(CompanyId) {
    var CompanyId = Logged_CompanyId;//titanForWork.getQueryStringParameter('CompanyId');
    if (CompanyId == null) {
        CompanyId = EmployeeDetails[0].Company.ID.toString();
    }
    var Subarr = EmployeeDetails.filter(function (filterData) {
        return filterData.CompanyId == CompanyId;
    });
    Logged_DepartmentId = Subarr[0].DepartmentId;
    Logged_DepartmentName = Subarr[0].Department.DepartmentName;
    Logged_Location = Subarr[0].OfficeLocationId;
    //Add new var for Designation filter on 07-Jan-2021 -- Priyanshu
    Logged_Designation = Subarr[0].Designation;
    Logged_CompanyId = CompanyId;
    Logged_DepartmentName = Subarr[0].Department.DepartmentName;
    Logged_CompanyName = Subarr[0].Company.Title;
    Logged_EmpLicense=Subarr[0].EmpLicense;
    if (Subarr[0].AttachmentFiles.results.length > 0) {
        currentUserProfileData.push({
            ProfilePic: Subarr[0].AttachmentFiles.results[0].ServerRelativeUrl
        });
    }
    else {
        currentUserProfileData.push({
            ProfilePic: _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Subarr[0].LogonName.EMail)
        });
    }
    currentUserProfileData["Logged_OfficeName"] = Subarr[0].OfficeLocation.Title;
   
  if (GetLicenseDetials() == false) {
    
        $(".header-container").html('');
        htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">'+warning+'</h3></span><br>';
        htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
        htmlNotAuthorized += '</div></div></div></div>';
        $('.wrapper').append(htmlNotAuthorized);
        return false;
    }
}

function GetEmployeeDetailsUser() {
    RestQuery = "?$select=*,OfficeLocation/Title,LogonName/EMail,ManagerLoginName/Title,ManagerLoginName/Id,ManagerLoginName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/Title,Company/ID &$expand=OfficeLocation,LogonName,Department,Company,AttachmentFiles,ManagerLoginName&$filter=LogonName/ID eq " + _spPageContextInfo.userId + " and Status eq 'Active' ";
    var CompanyId = Logged_CompanyId = titanForWork.getQueryStringParameter('CompanyId');
    //Add CompanyId filter on 07-Jan-2021 -- Priyanshu
    if (CompanyId != null && CompanyId != "null") {
        RestQuery = "?$select=*,OfficeLocation/Title,ManagerLoginName/Title,ManagerLoginName/Id,ManagerLoginName/EMail,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/Title,Company/ID &$expand=OfficeLocation,LogonName,Department,Company,AttachmentFiles,ManagerLoginName&$filter=LogonName/ID eq " + _spPageContextInfo.userId + " and Status eq 'Active' and Company/ID eq " + CompanyId + " ";
    }
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function (Employees) {
        try {
            if (Employees.results.length > 0) {

                EmployeeDetails = Employees.results;
                Employeeprofilepic = "";

                var Subarr = EmployeeDetails.filter(function (filterData) {
                    return filterData.PrimaryCompany == "Primary";
                });

                if (Subarr.length > 0) {
                	Logged_CompanyId = Subarr[0].CompanyId.toString();
                    if (Subarr[0].AttachmentFiles.results.length > 0) {
                        Employeeprofilepic = Subarr[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    } else {
                        Employeeprofilepic = "../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                    }
                } else {
                    Employeeprofilepic = "../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                }

                var companyids = Logged_CompanyId;//titanForWork.getQueryStringParameter("CompanyId");
                if (companyids == null || companyids == "") {
                    var currentCompanyUrl = titanForWork.currentCompanyUrl(Subarr[0].Company.ID); //Get Current Company url
                    var querystringcompanyvalues = '{"CompanyId":"' + Subarr[0].Company.ID + '","DepartmentId":"' + Subarr[0].Department.ID + '","DepartmentSiteUrl":"","CompanySiteUrl":"' + currentCompanyUrl + '","CurrentDomainSite":"' + _spPageContextInfo.webAbsoluteUrl + '","WelcomePageCalled":' + true + '}';
                    titanForWork.createCookie(_spPageContextInfo.siteId, querystringcompanyvalues, 10);

                }

                GetScope();
                CheckPermissiontechAdmin();
                MyCurrentDepartment();
                //GetAllEmployeeDetails();

            } else {
                var UrlforGeust = window.location.href.split("Pages")[1].split('.')[0];
                if (UrlforGeust == "/TaskDetails" || UrlforGeust == "/TimeSheetEntry" || UrlforGeust == "/EditProjectDetails") {

                    $.when(GetExtrenalEmployees()).done(function (ExtreanlEmployees) {

                        if (ExtreanlEmployees.length > 0) {


                            if (window.atob($.urlParam('IsModal')) == "true") {

                                //Licensing function should not be called. “true” means it is a guest user.

                                var IsValidUpto = ExtreanlEmployees[0].ValidUpto;
                                var modifiedDate = new Date(IsValidUpto);
                                modifiedDate = new Date(modifiedDate);
                                var diffDaysServices = Math.round(modifiedDate.getTime() - todayDate.getTime()) / (one_day);
                                if (diffDaysServices > 0) {
                                    // GetlicenseListItem(false);
                                } else {
                                    alert("Access Denied.\n The access period has expired.");
                                    GetlicenseListItem(true);
                                    return false;
                                }
                            } else {
                                alert(" Access Denied.\n You are not an authorized user.");
                                GetlicenseListItem(true);
                                return false;
                            }
                        } else {

                            alert(" Access Denied.\n You are not an authorized user.");
                            GetlicenseListItem(true);
                            return false;
                        }
                    });
                } else {
                    alert(" Access Denied.\n You are not an authorized user.");
                    GetlicenseListItem(true);
                }
            }
        } catch (e) {
            alert(e);
        }
    });
}

function GetScope() {
    var companyId = Logged_CompanyId;//titanForWork.getQueryStringParameter("CompanyId");
    RestQuery = "?$select=* &$filter= CompanyId eq '" + companyId + "' and ((WebPartName eq 'Media Gallery')or (WebPartName eq 'HR Admin') or (WebPartName eq 'Tech Admin') or (WebPartName eq 'Announcements') or (WebPartName eq 'Emergency Annoucements') or (WebPartName eq 'Polls') or (WebPartName eq 'Events') or (WebPartName eq 'Media') or (WebPartName eq 'Banners')) &$orderby=Order asc";
    $.when(CommonFunction.getItemsWithQueryItem("ProcessApprovers", RestQuery)).done(function (ProcessApprovers) {
        try {

            for (var i = 0; i < ProcessApprovers.results.length; i++) {
                if ((ProcessApprovers.results[i].WebPartName == "Banners") && (ProcessApprovers.results[i].Scope == "EVERYONE")) {
                    IsNewsEvenryOne = true;
                    $("#addSlider").show();

                } else if ((ProcessApprovers.results[i].WebPartName == "Media Gallery") && (ProcessApprovers.results[i].Scope == "EVERYONE")) {
                    $(".MediaGallery_Add").show();

                } else if ((ProcessApprovers.results[i].WebPartName == "Announcements") && (ProcessApprovers.results[i].Scope == "EVERYONE")) {
                    $(".addAnnouncement").show();
                    $(".btn-outline-success").show();

                } else if ((ProcessApprovers.results[i].WebPartName == "Emergency Annoucements") && (ProcessApprovers.results[i].Scope == "EVERYONE")) {
                    $("#emergencyAnnouncementid").show();

                } else if ((ProcessApprovers.results[i].WebPartName == "Polls") && (ProcessApprovers.results[i].Scope == "EVERYONE")) {
                    $(".Poll_Add").show();

                } else if ((ProcessApprovers.results[i].WebPartName == "Events") && (ProcessApprovers.results[i].Scope == "EVERYONE")) {
                    $(".EventAdd").show();

                } else if ((ProcessApprovers.results[i].WebPartName == "Media") && (ProcessApprovers.results[i].Scope == "EVERYONE")) {
                    $(".AddNewMagazine").show();
                } else if (ProcessApprovers.results[i].WebPartName == "Tech Admin") {
                    for (var j = 0; j < ProcessApprovers.results[i].ContributorsId.results.length; j++) {
                        if (_spPageContextInfo.userId == ProcessApprovers.results[i].ContributorsId.results[j]) {

                            IsTechadmin = false;
                            j = ProcessApprovers.results[i].ContributorsId.results.length;
                        }
                    }
                }

            }


            $.when(CommonFunction.getSharePointGroupUsers("Owners")).done(function (Owners) {

                for (var i = 0; i < Owners.length; i++) {
                    OwnersUser.push({
                        'UserId': Owners[i].Id

                    })
                }


            });


            $.when(CommonFunction.AdministratorUsers()).done(function (Administrator) {

                if (Administrator) {
                    IsTechadmin = false;

                    var Url = window.location.href.split("Pages")[1].split('.')[0];
                    if (Url == "/AdminPortal") {
                        $("#suiteBarTop").show();
                        $("#RibbonContainer").show();
                        $("#s4-ribbonrow").show();
                        $("#ms-designer-ribbon").show();
                        $("#suiteBarDelta").show();

                    }
                    else {
                        $("#suiteBarTop").hide();
                        $("#RibbonContainer").hide();
                        $("#s4-ribbonrow").hide();
                        $("#ms-designer-ribbon").hide();
                        $("#suiteBarDelta").hide();
                    }
                } else {
                    $("#suiteBarTop").hide();
                    $("#RibbonContainer").hide();
                    $("#s4-ribbonrow").hide();
                    $("#ms-designer-ribbon").hide();
                    $("#suiteBarDelta").hide();
                }
            });
        } catch (e) {

        }
    });
}

CommonFunction.getItemsWithQueryItem = function (ListName, Query) {
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
            DeferredObj.resolve(data.d);
            //   console.log();
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};

CommonFunction.getSharePointGroupUsers = function (GroupName) {
    DeferredObj = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getbyname('" + GroupName + "')/users",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {

            DeferredObj.resolve(data.d.results);
            //   console.log();
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};

CommonFunction.AdministratorUsers = function () {
    DeferredObj = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/currentUser/issiteadmin",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {

            DeferredObj.resolve(data.d.IsSiteAdmin);
            //   console.log();
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};

function CheckPermissiontechAdmin() {
    var Url = window.location.href.split("Pages")[1].split('.')[0];
    if (IsTechadmin) {

        if (Url == "/ManageCompanyDetails") {
            $(".row").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.row').append(htmlNotAuthorized);

        } else if (Url == "/DepartmentDetails") {
            $(".row").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.row').append(htmlNotAuthorized);

        } else if (Url == "/AddOfficeLocation") {
            $(".row").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.row').append(htmlNotAuthorized);

        } else if (Url == "/TipsOfTheDay") {
            $("#tablewrapper").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('#tablewrapper').append(htmlNotAuthorized);

        } else if (Url == "/ThoughtsOfTheDay") {
            $(".row").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.row').append(htmlNotAuthorized);

        } else if (Url == "/ManageTitanTheme") {
            $(".card").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.card').append(htmlNotAuthorized);

        } else if (Url == "/SocialMedia") {
            $("#SocialMedia").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('#SocialMedia').append(htmlNotAuthorized);

        } else if (Url == "/ViewManagementMessage") {
            $("#tablewrapper").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('#tablewrapper').append(htmlNotAuthorized);

        } else if (Url == "/AdminPortal") {
            $("#adminmanagepermissionIDS").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('#adminmanagepermissionIDS').append(htmlNotAuthorized);

        } else if (Url == "/GuestPortalAdmin") {
            $(".row").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Only Tech-Admin with site-collection admin permission can access this page. </h3></span><br>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.row').append(htmlNotAuthorized);

        }
        else if (Url == "/LicenceManager") {
            $(".row").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.row').append(htmlNotAuthorized);

        } else if (Url == "/EnvironmentSetting") {
            $("#my_environmental_main_box").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('#my_environmental_main_box').append(htmlNotAuthorized);

        } else if (Url == "/Show_Employee") {
            $(".row").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.row').append(htmlNotAuthorized);

        }

        else if (Url == "/ManageQuickLinks") {
            $(".row").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.row').append(htmlNotAuthorized);

        } else if (Url == "/Category") {
            $(".row").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">You are not authorized to access ! </h3></span>';
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            htmlNotAuthorized += '</div></div></div></div>';
            $('.row').append(htmlNotAuthorized);

        }
    }
}


function GetExtrenalEmployees() {
    var ValidUptodate = new Date();
    ValidUptodate.setDate(ValidUptodate.getDate() - 1);
    var GetQueryURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ExternalUsers')/items?$top=1&$select=*,ID,LoginName/Title,InternalStakeholders/Title,Supervisor/Title,AttachmentFiles,Client_Name/Title&$expand=LoginName,Client_Name,InternalStakeholders,Supervisor,AttachmentFiles &$filter= email eq '" + _spPageContextInfo.userLoginName + "' and Status eq 'Active'";
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
            console.log(data);
            dfd.reject(data);
        }
    });
    return dfd.promise();
}

function createQRCodeForTitan() {
	 $('#qr-CodeForTitan').empty();
    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AppConfig')/Items?$select=ID,Title,clientid&$top=1";
    $.ajax({
        url: requestURL,
        type: 'GET',
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            var results = data.d.results;
            if (results.length > 0) {
                var clientId = results[0].clientid;
                var currentUrl = _spPageContextInfo.webAbsoluteUrl;
                var QRCodeValue = currentUrl + "|" + clientId;
                if (QRCodeValue) {
                    $('#qr-CodeForTitan').qrcode(QRCodeValue);
                }
            }
            else {
                var noRecordFound = "<h3>Issue Occur in Creating QR COde.Please try agin later.</h3>";
                BootstrapDialog.alert(noRecordFound);
            }
        },
        error: function (msg) {
            BootstrapDialog.alert(msg.responseText);
        }
    })
}



/*-------------------------Filter button 25/08/2022---------------------------------------------------------*/

var homePageFilter = ()=> 
{
    
    var homePageName=window.location.href.toLowerCase().search('home');
    var defualtPageName=window.location.href.toLowerCase().search('default');
    var urlPage=window.location.href.split('?')[0];
    var companyId=titanForWork.getQueryStringParameter("ComID");	
	var deparmentId=titanForWork.getQueryStringParameter("DeptID");
	var Corporate=titanForWork.getQueryStringParameter("Corporate");
	if(Corporate!=null)
	{
	   $('#filter-audience').val('Corporate');
	}
	else if (companyId!=null)
	{
	   $('#filter-audience').val('My Company');
	}
	else if (deparmentId!=null)
	{
	   $('#filter-audience').val('My Department');
	}
	else
	{
	   $('#filter-audience').val('All');
	}

    
    
    if(homePageName!=-1){
        $('.myTopMenuFilter').show();
    }
    if(defualtPageName!=-1){
        $('.myTopMenuFilter').show();
    }
    $('#btnFilterSubmit').click(function(){
        var Audiance=$('#filter-audience').val();
        if(Audiance=='Corporate')
        {
            window.location.href=urlPage+'?&Corporate='+window.btoa(1);
        }
        else if(Audiance=='My Company')
        {
            window.location.href=urlPage+'?&ComID='+window.btoa(1);
        }
        else if(Audiance=='My Department')
        {
            window.location.href=urlPage+'?&DeptID='+window.btoa(1);
        }
        else
        {
            window.location.href=urlPage;
        }


    })

}

/*------------------------- new code added for safari teams app gear icon overlap issue 31/10/2022-------------------*/

function TeamGearIconOverlap(){

    if($(".navbar-custom").is(":visible")) {
        $('#s4-bodyContainer').removeClass("my-s4-teams-body");
    } else {
        $('#s4-bodyContainer').addClass("my-s4-teams-body");
    }
    // js for sharepoint top ribbon hide/show in case of sp-admin and other users  
    if($("#ms-designer-ribbon").is(":visible")) {
       // $('.SideTabMenu').removeClass("my-sp-designer-ribbon-hide");
      //  $('.SideTabMenu').addClass("my-sp-designer-ribbon-show");
    } else {
      //  $('.SideTabMenu').removeClass("my-sp-designer-ribbon-show");
       // $('.SideTabMenu').addClass("my-sp-designer-ribbon-hide");
    }

}


const myData=[{extension:"EXE"},{extension:"DLL"},{extension:"PHP"},{extension:"LNK"},{extension:"SYS"},{extension:"SWF"},{extension:"JAR"},{extension:"SCR"},{extension:"GZQUAR"},{extension:"ZIX"},{extension:"COM"},{extension:"BAT"},{extension:"OCX"},{extension:"VBS"},{extension:"CLASS"},{extension:"BIN"},{extension:"WS"},{extension:"DRV"},{extension:"OZD"},{extension:"WMF"},{extension:"ARU"},{extension:"SHS"},{extension:"DEV"},{extension:"CHM"},{extension:"PGM"},{extension:"XNXX"},{extension:"PIF"},{extension:"XLM"},{extension:"VXD"},{extension:"VBE"},{extension:"TPS"},{extension:"PCX"},{extension:"VBA"},{extension:"BOO"},{extension:"DXZ"},{extension:"SOP"},{extension:"TSA"},{extension:"HLP"},{extension:"VB"},{extension:"EXE1"},{extension:"BKD"},{extension:"RHK"},{extension:"VBX"},{extension:"LIK"},{extension:"OSA"},{extension:"CIH"},{extension:"MJZ"},{extension:"DLB"},{extension:"PHP3"},{extension:"DYZ"},{extension:"WSC"},{extension:"DOM"},{extension:"HLW"},{extension:"S7P"},{extension:"MJG"},{extension:"CLA"},{extension:"SPAM"},{extension:"MFU"},{extension:"DYV"},{extension:"KCD"},{extension:"BUP"},{extension:"MCQ"},{extension:"WSH"},
{extension:"BXZ"},{extension:"UPA"},{extension:"XIR"},{extension:"BHX"},{extension:"DLI"},{extension:"TXS"},{extension:"CXQ"},{extension:"FNR"},
{extension:"XDU"},{extension:"XLV"},{extension:"SKA"},{extension:"DLLX"},{extension:"TTI"},{extension:"VEXE"},{extension:"QRN"},{extension:"XTBL"},
{extension:"FAG"},{extension:"OAR"},{extension:"CEO"},{extension:"TKO"},{extension:"UZY"},{extension:"BLL"},{extension:"DBD"},{extension:"PLC"},
{extension:"SSY"},{extension:"BLF"},{extension:"ZVZ"},{extension:"CC"},{extension:"CE0"},{extension:"NLS"},{extension:"CTBL"},{extension:"HSQ"},
{extension:"IWS"},{extension:"VZR"},{extension:"LKH"},{extension:"EZT"},{extension:"RNA"},{extension:"HTS"},{extension:"ATM"},{extension:"AEPL"},
{extension:"LET"},{extension:"FUJ"},{extension:"AU"},{extension:"FJL"},{extension:"BUK"},{extension:"DELF"},{extension:"BMW"},{extension:"CYW"},
{extension:"BPS"},{extension:"IVA"},{extension:"PID"},{extension:"DZ"},{extension:"QIT"},{extension:"LOK"},{extension:"XNT"}];

var Istrue=false;
function returnExtension(input) {
    let filteredNames = myData.filter(e => e.extension.toLowerCase() === input.toLowerCase());
    if(filteredNames.length > 0) {
        Istrue = true;
    } else {
        Istrue = false;
    }
    return Istrue;
}


var browserName = (function () {
          
          var agent =window.navigator.userAgent.toLowerCase();
        switch (true) {
            case agent.indexOf("edge") > -1: return "MS Edge";
            case agent.indexOf("edg/") > -1: return "Edge (chromium based)";
            case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
            case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
            case agent.indexOf("trident") > -1: return "MS IE";
            case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
            case agent.indexOf("safari") > -1: return "Safari";
            default: return "other";
        }
    })(window.navigator.userAgent.toLowerCase());
    
    //alert(browserName);


/*------------add by lakhan--------------------------*/
//to check logged_In user permission
var isTechAdmins=false;
function getTechAdminPermissions() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=Contributors/EMail,ID&$expand=Contributors&$filter=CompanyId eq '" + Logged_CompanyId + "' and WebPartName eq 'Tech Admin'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            var response = data;
            if (response.d.results[0].Contributors != null && response.d.results[0].Contributors.results.length > 0)////Contribute Access
            {
                webPartCollectionResult = response.d.results[0].Contributors.results.filter(function (data) {
                   if(data.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase())
                   {
                      isTechAdmins=true;
                   }

                });
            }
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
}
var arr=[0];
function changesAnnouncementStatus(ItemId,webpartName) {
    if (confirm('Do you want to delete this record?')){
	    var ListName = 'Announcements';
	    var itemType ="SP.Data.AnnouncementsListItem"//GetItemTypeForListName(ListName);
	    var Metadata = { "__metadata": { 'type': itemType } };
	    Metadata["ApprovalStatus"] = "Deleted";
	    Metadata["ApprovedById"] = _spPageContextInfo.userId;
	    Metadata["WebPartName"]=webpartName+'1';
	    Metadata["CompanyId"] ={ "results": [parseInt(arr)]};
		Metadata["ApprovedDate"] = new Date();    
	    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items(" +ItemId+ ")";
	    var headersData = {
	        "accept": "application/json;odata=verbose",
	        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	        "content-Type": "application/json;odata=verbose",
	        "X-Http-Method": "PATCH",
	        "If-Match": '*'
	    };
	
	    $.ajax({
	        url: requestURL,
	        type: "POST",
	        async: false,
	        headers: headersData,
	        data: JSON.stringify(Metadata),
	        success: function (dataD) {
	            var Query = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTaskList')/items?$filter= ItemId eq ('" + ItemId+ "') and WebpartName eq '"+webpartName+"'&$select=*";
	            var QueryResult = getdataFromAnnouncement(Query);
	            if(QueryResult.length>0)
	            {
	            	//QueryResult[0].ID;
	            	updateApprovalDetails('ApprovalTaskList',QueryResult[0].ID);
	            
	            }
	            alert("Data has been deleted successfully.");
	            window.location.href=_spPageContextInfo.webAbsoluteUrl;
	        },
	        error: function (error) {
	            alert(error);
	        }
	    });
	}    
}
function updateApprovalDetails(ListName,ItemID) {
    try {
        var currentUserID = _spPageContextInfo.userId;
        var currentDate = new Date();

        var Metadata;
        var ItemType ="SP.Data.ApprovalTaskListListItem"//GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            
            Status:'Deleted',
            ApprovedById:currentUserID,
            ApprovedDate:currentDate
            
        };
        UpdateApprovalToList(ListName, Metadata,ItemID);
    }
    catch (error) {
        console.log(error.message);
    }
}

function UpdateApprovalToList(ListName, Metadata, ItemID) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + ItemID + "')",
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
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
function getdataFromAnnouncement(Query) {
    var ResultItems = [];
    var Ownurl = Query;
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

function TeamsOpenGearMenu() { //Swapnil
	 $(".navbar-logo-menu-toggle").click(function () {
        $(".navbar-logo-menu-area").toggleClass("navbar-logo-menu-open"); 
	 });
}