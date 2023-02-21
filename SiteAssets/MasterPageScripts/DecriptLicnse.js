'use strict';
var todayDate = new Date();
// One day Time in ms (milliseconds) 
//var one_day = 1000 * 60 * 60 * 24
var UsersLicenceRequired = 40;
var activeCheck = true;
var licenseValidTill = new Date("01/01/1990"); // MM/dd/yyyy format
var domainName = 'xccxcxcvcx.sharepoint.com'
var RestQuery;
var htmlNotAuthorized = "";
var Istrue = false;
var IsNotUser = false;
var diffDaysServicesContent;
var DeferredObj = $.Deferred();
var Metadata;
var TitanLicenseFormat = ''; //THIS IS FOR FORMATTING THE APP
var LicIntranet = '';
var LicDMS = '';
var LicProjectTask = '';
var LicBPaas = '';
var IsDateValid = false;
var IsDomainValid = false;
var todayDate, licenseValidDate;
var TypeofLincnse = "";
var IsEnterprise = false;
var warning = "";
var IsDMSModules = false;
var IsIntranetModules = false;
var IsTaskModules = false;
var IsBpassModules = false;
var Message = "";
var EmpLinceseEncript = "";
var permissionUrl = "";
var IsPemssionLebal = false;
var Modules = ""
htmlNotAuthorized = '<div class="col-md-12">' + '<div class="panel panel-default shadow2" style="margin:100px;">' + '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' + '<span><h2 class="text-center">You are not authorized to access Digital Workplace </h2></span>';
const Licensed = ["adaptindia.sharepoint.com", "08/02/2023", "Users=70", "Enterprisef", "All", "20", "All", "7"];
$(function() {
    // startDate = new Date("07/27/2022").datepicker({ dateFormat: 'mm/dd/yy' });
    // endDate = new Date(License[1]).datepicker({ dateFormat: 'mm/dd/yy' });
});
/*

TitanLicenseFormat =""

if IsIntranetModules = true;
	TitanLicenseFormat = Intranet+
end if

if IsDMSModules = true;
	TitanLicenseFormat = TitanLicenseFormat  + "DMS+"
end if

if IsTaskModules = true;
	TitanLicenseFormat = TitanLicenseFormat  + "ProjectTask+"
end if

if IsBpassModules = true;
	TitanLicenseFormat = TitanLicenseFormat  + "BPAAS+"
end if

*/
//       All combination, like  Enterprize, DMS Only, Intranet Only, BPASS Only, Project&Task Only, DMS+Intranet, DMS+Task etc.
//      According different different combination, Titan option and screen will be change.
//      No need to get value from Environmrntal List, all will be according License
//      Manage all combination by four True/False variable   but not according variable TitanLicenseFormat  
//       ---  dipankar
/*
                
                TitanLicenseFormat = EnvironmentalSettings.results[0].Formats;
               
				 if (TitanLicenseFormat == "DMS") {
                } else if (TitanLicenseFormat == 'Business Process') {
                } else { //Enterprise
;
                }
                activeCheck = EnvironmentalSettings.results[0].Active;
             


function ModulesType() {
    if (TitanLicenseFormat == "Intranet+") {
        
    } else if (TitanLicenseFormat == "DMS+") {
             $("#myFavLi").hide();
             $("#TranslateBox").hide();

    } else if (TitanLicenseFormat == "ProjectTask+") {
        
    } else if (TitanLicenseFormat == "BPAAS+") {
              $("#myFavLi").hide();
              $("#TranslateBox").hide();
              $("#myGpMaster").hide();
       
    } else if (TitanLicenseFormat == "Intranet+DMS+") {
        
    } else if (TitanLicenseFormat == "Intranet+ProjectTask+") {
        
    }else if (TitanLicenseFormat == "Intranet+ProjectTask+BPAAS+") {
        
    } else if (TitanLicenseFormat == "Intranet+DMS+ProjectTask+") {
        
    } else if (TitanLicenseFormat == "Intranet+DMS+BPAAS+") {
        
    } else if (TitanLicenseFormat == "Intranet+BPAAS+") {
        
    } else if (TitanLicenseFormat == "DMS+ProjectTask+") {
        
    } else if (TitanLicenseFormat == "DMS+ProjectTask+BPAAS+") {
        
    } else if (TitanLicenseFormat == "DMS+BPAAS+") {
        
    } else if (TitanLicenseFormat == "ProjectTask+BPAAS+") {
        
    } else {
                    $("#myFavLi").show();
                    $("#TranslateBox").show();
        
    }
}

*/
function GetLicenseDetials() {
    var LicensedDecript = "";
    var Licensed = "";
    RestQuery = "?$select=*,Description&$filter= Title eq 'License' &$orderby=Order asc";
    $.when(webdevLicenced.getItemsWithQueryItem("EnvironmentalSettings", RestQuery)).done(function(EnvironmentalSettings) {
        try {
            LicensedDecript = CryptoJS.AES.decrypt(EnvironmentalSettings.results[0].Description, "@d@ptT!t@n");
            Licensed = LicensedDecript.toString(CryptoJS.enc.Utf8).split('|');
            activeCheck = EnvironmentalSettings.results[0].Active
        } catch (e) {}
    });
    todayDate = new Date();
    licenseValidDate = new Date(Licensed[1]);
    licenseValidDate.setDate(licenseValidDate.getDate() + 1);
    TypeofLincnse = Licensed[3];
    LicBPaas = Licensed[7].split("=")[1];
    UsersLicenceRequired = Licensed[2].split("=")[1];
    if(LicBPaas > 0) {
        IsBpassModules = true;
    } else {
        IsBpassModules = false;
    }
    LicIntranet = Licensed[4].split("=")[1];
    if(LicIntranet == "All" || LicIntranet > 0) {
        IsIntranetModules = true;
    } else {
        IsIntranetModules = false;
    }
    LicDMS = Licensed[5].split("=")[1];
    if(LicDMS == "All" || LicDMS > 0) {
        IsDMSModules = true;
    } else {
        IsDMSModules = false;
    }
    LicProjectTask = Licensed[6].split("=")[1];
    if(LicProjectTask == "All" || LicProjectTask > 0) {
        IsTaskModules = true;
    } else {
        IsTaskModules = false;
    }
    //alert(_spPageContextInfo.userId);
    if(window.location.host.toLowerCase() == Licensed[0].toLowerCase()) {
        IsDomainValid = true;
    } else {
        IsDomainValid = false;
        Message = "License is not valid for this Domain";
        WarningMessage("Access	Denied", Message, "")
        return false;
    }
    if((Date.parse(todayDate) < Date.parse(licenseValidDate))) {
        IsDateValid = true;
    } else {
        IsDateValid = false;
        Message = "Your subscription has expired";
        WarningMessage("Access	Denied", Message, "")
        return false;
    }
    if(TypeofLincnse == "Enterprise") {
        IsEnterprise = true;
        return true;
    } else {
        IsEnterprise = false;
        permissionUrl = [];
        IsPemssionLebal = false;
        if(Logged_EmpLicense != null) {
            var EmpLicense = CryptoJS.AES.decrypt(Logged_EmpLicense, "@d@ptT!t@n");
            EmpLinceseEncript = EmpLicense.toString(CryptoJS.enc.Utf8);
            RestQuery = "?$select=Comments,Title,FileRef&$filter= FileRef eq '" + _spPageContextInfo.serverRequestPath + "' &$orderby=Order asc";
            $.when(webdevLicenced.getItemsWithQueryItem("Pages", RestQuery)).done(function(PagesDetails) {
                Modules = PagesDetails.results[0].Comments;
            });
        } else {
            /// Without Lincesed users
            return true;
        }
        if(Modules == "Intranet") {
            if(LicIntranet == "All") {
                return true
            } else if(LicIntranet == 0 || LicIntranet == "" || LicIntranet == null) {
                if(IsDMSModules) {
                    IsPemssionLebal = true;
                    permissionUrl.push({
                        Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Document.aspx',
                        Title: "Document"
                    });
                    permissionUrl.push({
                        Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/DocumentTypesCounter.aspx',
                        Title: "Comp Documents"
                    });
                }
                
                    if(IsTaskModules) {
                            permissionUrl.push({
                                Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/ViewAllProjects.aspx?WebAppId=232SHDFGHJF22B2526DFG',
                                Title: "Projects"
                            })
                    }

                Message = "Your subscription activation seems to have a	problem";
                WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature")
                return false;
            }
            if(LicIntranet > 0) {
                if(EmpLinceseEncript.search(/Internet/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                {
                    return true;
                } else {
                    if(EmpLinceseEncript.search(/DMS/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                    {
                        IsPemssionLebal = true;
                        permissionUrl.push({
                            Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Document.aspx',
                            Title: "Document"
                        });
                        permissionUrl.push({
                            Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/DocumentTypesCounter.aspx',
                            Title: "Comp Documents"
                        });
                    }
                    if(EmpLinceseEncript.search(/Project/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                    {
                        IsPemssionLebal = true;
                        permissionUrl.push({
                            Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/ViewAllProjects.aspx?WebAppId=232SHDFGHJF22B2526DFG',
                            Title: "Projects"
                        })
                    }
                    Message = "Your subscription activation seems to have a	problem";
                    WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature")
                    return false;
                }
            }
        } else if(Modules == "DMS") {
            if(LicDMS == "All") {
                return true;
            } else if(LicDMS == 0 || LicDMS == "" || LicDMS == null) {
                  
                    IsPemssionLebal = true;
                    if(IsTaskModules) {
                            permissionUrl.push({
                                Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/ViewAllProjects.aspx?WebAppId=232SHDFGHJF22B2526DFG',
                                Title: "Projects"
                            })
                    }
                    if(IsIntranetModules) {
                        permissionUrl.push({
                            Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Home.aspx',
                            Title: "Internet"
                        });
                        permissionUrl.push({
                            Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Myworkplace.aspx?WebAppId=232SHDFGHJF22B2526DFG',
                            Title: "My Workplace"
                        });
                    }

                
                
                 Message = "Your subscription activation seems to have a problem";
                 WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature");
                 return false;
                }
                if(LicDMS > 0) {
                    if(EmpLinceseEncript.search(/DMS/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //also check email address in the license
                    {
                        return true;
                    } else {
                        if(EmpLinceseEncript.search(/Internet/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                        {
                            IsPemssionLebal = true;
                            permissionUrl.push({
                                Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Home.aspx',
                                Title: "Internet"
                            });
                            permissionUrl.push({
                                Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Myworkplace.aspx?WebAppId=232SHDFGHJF22B2526DFG',
                                Title: "My Workplace"
                            })
                        }
                        if(EmpLinceseEncript.search(/Project/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                        {
                            IsPemssionLebal = true;
                            permissionUrl.push({
                                Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/ViewAllProjects.aspx?WebAppId=232SHDFGHJF22B2526DFG',
                                Title: "Projects"
                            })
                        }
                        Message = "Your subscription activation seems to have a	problem";
                        WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature")
                        return false;
                    }
                }
            } else if(Modules == "Project") {
                if(LicProjectTask == "All") {
                    return true;
                } else if(LicProjectTask == 0 || LicProjectTask == "" || LicProjectTask == null) {
                    IsPemssionLebal = true;
                    if(IsDMSModules) {
                        permissionUrl.push({
                            Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Document.aspx',
                            Title: "Document"
                        });
                        permissionUrl.push({
                            Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/DocumentTypesCounter.aspx',
                            Title: "Comp Documents"
                        });
                    }
                    if(IsIntranetModules) {
                        permissionUrl.push({
                            Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Home.aspx',
                            Title: "Internet"
                        });
                        permissionUrl.push({
                            Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Myworkplace.aspx?WebAppId=232SHDFGHJF22B2526DFG',
                            Title: "My Workplace"
                        });
                    }
                    Message = "Your subscription activation seems to have a	problem";
                    WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature")
                    return false;
                }
                if(LicProjectTask > 0) {
                    if(EmpLinceseEncript.search(/Project/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                    {
                        return true;
                    } else {
                        if(EmpLinceseEncript.search(/Internet/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                        {
                            IsPemssionLebal = true;
                            permissionUrl.push({
                                Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Home.aspx',
                                Title: "Internet"
                            });
                            permissionUrl.push({
                                Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Myworkplace.aspx?WebAppId=232SHDFGHJF22B2526DFG',
                                Title: "My Workplace"
                            });
                        }
                        if(EmpLinceseEncript.search(/DMS/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                        {
                            IsPemssionLebal = true;
                            permissionUrl.push({
                                Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/Document.aspx',
                                Title: "Document"
                            });
                            permissionUrl.push({
                                Url: _spPageContextInfo.webAbsoluteUrl + '/Pages/DocumentTypesCounter.aspx',
                                Title: "Comp Documents"
                            });
                        }
                        Message = "Your subscription activation seems to have a	problem";
                        WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature")
                    }
                }
            } else if(Modules == "IntranetProject") {
                if(LicProjectTask == "All" || LicIntranet == "All") {
                    return true;
                } else if(LicProjectTask == 0 || LicProjectTask == "" || LicProjectTask == null || LicIntranet == 0 || LicIntranet == "" || LicIntranet == null) {
                    Message = "Your subscription activation seems to have a	problem";
                    WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature")
                    return false;
                }
                if(LicProjectTask > 0 || LicIntranet > 0) {
                    if(EmpLinceseEncript.search(/Project/i) > 0 || EmpLinceseEncript.search(/Internet/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                    {
                        return true;
                    } else {
                        Message = "Your subscription activation seems to have a	problem";
                        WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature")
                    }
                }
            } else if(Modules == "BPAAS") {
                if(LicBPaas == 0 || LicBPaas == "" || LicBPaas == null) {
                    Message = "Your subscription activation seems to have a problem";
                    WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature")
                    return false
                }
                if(LicBPaas > 0) {
                    return true;
                } else {
                    Message = "Your subscription activation seems to have a problem";
                    // webdevLicenced.IsNotDomain();
                    WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature");
                    return false;
                }
            } else if(Modules == "NotApplicable") {
                return true;
            } else {
                Message = "This page is not under the Intranet, DMS, Project tasks, BPass and Admin Portal module. Please tell me (Indramani) this page belongs to which module.";
                // webdevLicenced.IsNotDomain();
                WarningMessage("Access to this Features is not permitted", Message, "Your subscription does not include this feature");
                //return false; /// Not complite code Deepankar  Sir
            }
        }
    }

    function GetlicenseListItem(IsNotEmployeeuser, Istrue) {
        // Get saved data from sessionStorage
        var diffDaysServices = Math.round(sessionStorage.getItem('modifiedDate') - todayDate.getTime()) / (one_day);
        if(((diffDaysServices < 0) || (diffDaysServices == NaN) || (window.location.host.toLowerCase() != domainName.toLowerCase()))) {
            RestQuery = "?$select=*,Description&$filter= Title eq 'License' &$orderby=Order asc";
            $.when(webdevLicenced.getItemsWithQueryItem("EnvironmentalSettings", RestQuery)).done(function(EnvironmentalSettings) {
                try {
                    $('#txtLicenseId').val(EnvironmentalSettings.results[0].Id);
                    RestQuery = "?$select=*&$filter= WebPartName eq 'Tech Admin' &$orderby=Order asc";
                    $.when(webdevLicenced.getItemsWithQueryItem("ProcessApprovers", RestQuery)).done(function(Employees) {
                        var getEmployee = [];
                        for(var i = 0; i < Employees.results.length; i++) {
                            for(var j = 0; j < Employees.results[i].ContributorsId.results.length; j++) {
                                getEmployee.push(Employees.results[i].ContributorsId.results[j]);
                            }
                        }
                        var CompanyNameDetails = getEmployee.filter(function(User) {
                            return User == _spPageContextInfo.userId;
                        });
                        if(CompanyNameDetails.length > 0) {
                            IsNotUser = true;
                        } else {
                            IsNotUser = false;
                        }
                    });
                    // "@d@ptT!t@n" is PASSCODE, it is used for generating License.
                    // If change in future then, this also need to change accordingly as you change in Encrypted JS in License Generator Site
                    // ---  Dipankar  20 Feb 2020
                    //EnvironmentalSettings.results[0].Description
                    //"U2FsdGVkX1/HC0gEM5TXeo7D1jjoYM0zcahYhr8OHwraz2vIcT/q1JkumiPsfqvgXKi99lytElWDLDgnW9yjfI94o2J4NJa0SQDwSUwRo/kwz5J511I5tAc/DCdsT9y1+Di2e9fqvFaFY6ODmmx/qQ=="
                    var decrypted = CryptoJS.AES.decrypt(EnvironmentalSettings.results[0].Description, "@d@ptT!t@n"); //this.decryptCodes(document.getElementById('encryptedContent').value, document.getElementById('passcode').value);
                    /*
                       var GetItem = decrypted.toString(CryptoJS.enc.Utf8);
                    if (GetItem != "") {
                        GetItem = GetItem.split('|');
                        if (GetItem.length == 8) {
                            var modifiedDate = new Date(GetItem[1]);
                            modifiedDate = new Date(modifiedDate);
                            diffDaysServicesContent = Math.round(modifiedDate.getTime() - todayDate.getTime()) / (one_day);
                            sessionStorage.setItem('License', GetItem);
                            localStorage.removeItem('modifiedDate');
                            sessionStorage.setItem('modifiedDate', modifiedDate.getTime());
                            if (diffDaysServicesContent >= 1) {
                                UsersLicenceRequired = GetItem[2].split("=")[1];
                                licenseValidTill = new Date(GetItem[1]);
                                LicBPaas = GetItem[7].split("=")[1];
                                domainName = GetItem[0];
                                if (window.location.host.toLowerCase() != domainName.toLowerCase()) {
                                    webdevLicenced.IsNotDomain();
                                }
                            } else {
                                webdevLicenced.ExpairedDate();
                            }
                        }
                    } else {
                        webdevLicenced.IsNotDomain();
                        webdevLicenced.ExpairedDate();
                    }*/
                } catch (e) {
                    alert("You are not authorized to access" + e); // error in the above string (in this case, yes)!
                    $(".header-container").html('');
                    htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">License Not Found ! </h3></span>';
                    htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
                    if(IsNotUser) {
                        webdevLicenced.IsCheckLicenced()
                    }
                    htmlNotAuthorized += '</div></div></div></div>';
                    $('.wrapper').append(htmlNotAuthorized);
                }
            });
        } else {
            var License = sessionStorage.getItem('License').split(',');
            UsersLicenceRequired = License[0];
            licenseValidTill = new Date(License[1]);
            domainName = License[2];
        }
        if(Istrue) {
            $(".header-container").html('');
            htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
            if(IsNotUser) {
                webdevLicenced.IsCheckLicenced()
            }
            htmlNotAuthorized += '</div></div></div></div>';
            $('.wrapper').append(htmlNotAuthorized);
            return false;
        } else if(IsNotEmployeeuser) {
            $(".header-container").html('');
            webdevLicenced.IsNotUser();
            htmlNotAuthorized += '</div></div></div></div>';
            $('.wrapper').append(htmlNotAuthorized);
            $("#s4-bodyContainer").hide();
            return false;
            //alert("testd");
        }
    }
    var webdevLicenced = {
        IsCheckLicenced: function() {
            htmlNotAuthorized += '<div class="form-group" id="LicnseActivelink" style="display:block">' + 
            '<div class="col-sm-5 col-xs-6"><a href="javascript:void(0)" style="font-size:24px" onclick="webdevLicenced.HideShow();">Click here for enter License</a> </div>' + 
            '</div>' + 
            '<div class="form-group" id="ActiveLicense" style="display:none">' + 
            '<div class="col-sm-5 col-xs-6">License Key : </div>' + 
            '<div class="col-sm-7 col-xs-6">' + 
            '<textarea id="LicenseDescription" placeholder="enter license key then click on License Submit button" class="form-control" rows="8"></textarea>' + 
            '</div>' + 
            '<input id="LicenseSubmit" style="display:none" onclick="webdevLicenced.LicenseSubmit();" type="button" style="font-size: 13px;" class="btn btn-outline-success button pull-right"  value="License Submit">';
        },
        ExpairedDate: function() {
            htmlNotAuthorized += '<span><h2 class="text-center">License has been expaired </h2></span>';
            Istrue = true;
        },
        IsNotDomain: function() {
            Istrue = true;
            htmlNotAuthorized += '<span><h2 class="text-center">License is not valid for this Domain </h2></span>';
        },
        IsNotUser: function() {
            htmlNotAuthorized += '<span><h2 class="text-center"> Access Denied. <br>This is not an active user </h2></span>';
        },
        getItemsWithQueryItem: function(ListName, Query) {
            DeferredObj = $.Deferred();
            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query,
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
        },
        HideShow: function() {
            $("#ActiveLicense").show();
            $("#LicenseSubmit").show();
            $("#LicnseActivelink").hide();
        },
        LicenseSubmit: function() {
            if($("#LicenseDescription").val() != "") {
                //   var decrypted = CryptoJS.AES.decrypt($("#LicenseDescription").val(), "@d@ptT!t@n"); //this.decryptCodes(document.getElementById('encryptedContent').value, document.getElementById('passcode').value);
                /*          
                  var GetItem = decrypted.toString(CryptoJS.enc.Utf8);
                            if (GetItem != "") {
                                GetItem = GetItem.split('|');
                                if (parseInt(GetItem[0]) < ActiveEmployeeuser.length) {
                                    alert("This license cannot be applied. \n The number of active users is more than this subscription.");
                                    return false;
                                }
                            }
                            */
                var ItemType = this.GetItemTypeForListName("EnvironmentalSettings");
                //var Active=chekrbdclick(n)
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Description: $("#LicenseDescription").val(),
                    Active: Active
                };
                RestQuery = "?$select=*&$filter= Title eq 'License' &$orderby=Order asc";
                var Id;
                $.when(this.getItemsWithQueryItem("EnvironmentalSettings", RestQuery)).done(function(EnvironmentalSettings) {
                    $.when(webdevLicenced.updateItemWithIDMerge("EnvironmentalSettings", Metadata, EnvironmentalSettings.results[0].Id)).done(function(EnvironmentalSettings) {
                        // localStorage.removeItem('modifiedDate');
                        //  sessionStorage.setItem('modifiedDate', -1);
                        let timeout;
                        if(SetNewInternet) {
                            timeout = setTimeout(SetDefaultPage("Pages/Home.aspx", false), 200);
                        } else if(SetNewProject) {
                            timeout = setTimeout(SetDefaultPage("Pages/ViewAllProjects.aspx", false), 200);
                        } else if(SetNewDMS) {
                            timeout = setTimeout(SetDefaultPage("Pages/Document.aspx", false), 200);
                        } else if(SetNewBpass) {
                            timeout = setTimeout(SetDefaultPage("Pages/approvals.aspx", false), 200);
                        }
                        location.reload();
                    });
                });
            } else {
                alert("enter license key then click on License Submit button");
                $("#LicenseDescription").focus();
            }
        },
        GetItemTypeForListName: function(ListName) {
            return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
        },
        updateItemWithIDMerge: function(ListName, Metadata, ID) {
            DeferredObj = $.Deferred();
            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + ID + "')",
                type: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "content-Type": "application/json;odata=verbose",
                    "X-Http-Method": "PATCH",
                    "If-Match": '*'
                },
                data: JSON.stringify(Metadata),
                async: false,
                success: function(RESULT) {
                    console.log();
                    DeferredObj.resolve(true);
                },
                error: function(error) {
                    alert(JSON.stringify(error));
                    DeferredObj.reject(error);
                }
            });
            return DeferredObj.promise();
        }
    }
    var Active = true;
    jQuery(document).ready(function() {
        // Check for FileReader API (HTML5) support.
        if(!window.FileReader) {
            alert('This browser does not support the FileReader API.');
        }
        //GetlicenseListItem(false);
        //chekrbdclick(0)
    });

    function chekrbdclick(n) {
        if(n == 0) {
            Active = true;
            document.getElementById("btnApply").disabled = false;
        } else {
            Active = false;
            document.getElementById("btnApply").disabled = true;
        }
    }

    function WarningMessage(Warning, Message, Abouts) {
        htmlNotAuthorized = '<div class="alert_msg_boxsec" style="min-width:320px;max-width:655px;display: block; margin: 70px auto;font-family: sans-serif;padding:0; border: 1px solid #d9d9d9;border-radius: 10px;box-shadow: 0px 0px 5px #ccc;">' + '<div class="logosec" style="padding:15px 15px 10px 15px; border-bottom:1px solid #ccc;">' + '<div class="logo_box" style="display: -webkit-box; display: -moz-box; display: -webkit-flex;display: -ms-flexbox;  display: flex; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center;  align-items: center;">' + '<img style="margin-right:10px; max-width: 110px;" src="img/company_name.png" alt=""  id="LogoImage"><span> <h4 style=" margin: 0;color: #3a3a3a;font-weight: 400;font-size: 21px;">' + Logged_CompanyName + ' </h4></span>' + '</div>' + ' </div>' + ' <div class="wrap_covering" style="padding:10px 20px 20px 20px;">' + '<h2 style="margin: 0;color: #333; font-weight: 400;font-size: 28px; margin-bottom: 15px;float:left">' + Warning + '</h2>' + '<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/TitanLicenceManager/assets/images/i_icon.png" alt="" style="float:right; display: inline-block;">' + '<div style="clear:both;"></div> ' + '<h4 style=" margin: 0;color: #3a3a3a;font-weight: 400;font-size: 21px;">' + Message + '</h4>' + '<p style="line-height: 1.6;color: #333;font-size: 14px;"> ' + Abouts + ' <br> Please contact your Office365 administrator or your IT helpdesk </p>' + '<h3 style="    margin: 0;color: #3a3a3a;font-weight: 400;font-size: 21px;">  <a href="' + _spPageContextInfo.webAbsoluteUrl + '/Pages/TitanLicenseManager.aspx">Manage your subscription</a> </h3>' + ' </div>' + '<div id="permissionUrl" style="padding:5px 0; border-top:1px solid #cccc; margin-top:10px; font-weight:400; color:#3a3a3a;display:none;">' + '<h4 style="color:#3a3a3a;">You have access to below features. Click any one to open.</h4>' + '<div id="divPermissionUrl" style="display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;align-items: center;-webkit-align-items: center;justify-content: center;-webkit-justify-content: center; ">' + ' <a href="#" style="color: #548fcc;padding:8px;text-decoration: none;font-size: 13px;width:100px;text-align:center;font-weight: 600;">Project</a>' + '<a href="#" style="color: #548fcc;padding:8px;text-decoration: none;font-size: 13px;width:100px;text-align:center;font-weight: 600;">Tasks</a>' + '<a href="#" style="color: #548fcc;padding:8px;text-decoration: none;font-size: 13px;width:100px;text-align:center;font-weight: 600;">Documents</a>' + '</div>' + '</div>' + '</div>';
        //htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">'+warning+'</h3></span><br>';
        // htmlNotAuthorized += '<span><h3 class="red-color text-center mt-25">Please contact your administrator! </h3></span><br>';
        // htmlNotAuthorized += '</div></div></div></div>';
        $("#s4-workspace").html('');
        $(".SideTabMenu").html('');
        $("#s4-workspace").append(htmlNotAuthorized);
        if(permissionUrl.length > 0 && IsPemssionLebal == true) {
            $("#divPermissionUrl").html("");
            var anchorhtml = "";
            for(var i = 0; i < permissionUrl.length; i++) {
                anchorhtml += '<a href="' + permissionUrl[i].Url + '" style="color: #548fcc;padding:8px;text-decoration: none;font-size: 13px;width:100px;text-align:center;font-weight: 600;">' + permissionUrl[i].Title + '</a>';
            }
            $("#divPermissionUrl").append(anchorhtml);
            $("#permissionUrl").show();
        }
        GetMainLogoUrl('DefaultLanguage');
        return false;
    }

    function GetMainLogoUrl(currentLanguage) {
        var txtCompanyId = Logged_CompanyId;
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Companies')/items?select=ID,CompanyLogo,BusinessDomain,Language2nd_Logo,Language3rd_Logo,Language7th_Logo,Language8th_Logo,Language9th_Logo,Language10th_Logo,Language5th_Logo,Language6th_Logo,SmallLogo,Language4th_Logo&$filter=ID eq '" + txtCompanyId + "'";
        $.ajax({
            url: Ownurl,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            async: false,
            success: function(data) {
                var items = data.d.results;
                if(items.length > 0) {
                    for(var index = 0; index < items.length; index++) {
                        var companyLogo = GetCompanyLogo_CurrentLanguage(currentLanguage);
                        if(data.d.results[index][companyLogo] != null) {
                            var LogoUrl = data.d.results[index][companyLogo].Url; //oListItem.get_item(companyLogo).get_url();
                            $("#LogoImage").attr("src", LogoUrl);
                        } else {
                            $('#LogoImage').attr("src", 'https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/_catalogs/masterpage/Titan2/Images/Titan-Logo.png');
                        }
                    }
                }
            },
            eror: function(data) {
                console.log('error');
            }
        });
    }
