var HeaderTextColor = 'rgb(255 158 32) !important';
var MediatextColor = 'rgb(255 255 255) !important';
var titanDepartmentName = '';
var navigationsArray = [];
var companyIdNavigation = 0;
var titanThemeName = '';
var BusinessDomain = '';
var txtCompanyName = '';

$(document).ready(function () {
    $("#navbarLogoLink").click(function (event) {
        if (BusinessDomain == '') {
            event.preventDefault();
        }
    });
    var welcomePageCalled = titanForWork.getQueryStringParameter('WelcomePageCalled');
    $("#right2").hide();
    $("#right").show();
    $("#right1").show();

    // Change Copyright and version
    // the bellow line must be commented for hide copyright  --Dipankar
    $("#footerCopyright").show();
    $("#footerCopyright").html("");
    $("#footerCopyright").html("Copyright: TFW Labs, Inc.");
    // to change the version, edit the following line
    $("#footerVersion").html("");
    $("#footerVersion").html("Version 3.0.0");

    if (welcomePageCalled != undefined) {
        SetCompanyLogoAndNavigations()
    }

    try {
        //titanForWork.titanLicenced(); Indramani 01/08/2022
    } catch (ex) {
        console.log('Please check you have removed licennce file');
    }

    if (_spPageContextInfo.isSiteAdmin != true) {
        $("a[title|='Site Content']").hide(); //.css("display", "none");});
    }
    LoadMasterPageLogics();
    $(".home-toggle").click(function () {
        $(".search-area").removeClass("search-open");
        $(".menu-area").removeClass("menu-open");
    });

    $(".back-toggle").click(function () {
        $(".search-area").removeClass("search-open");
        $(".menu-area").removeClass("menu-open");
    });

    $(".search-toggle").click(function () {
        $(".search-area").toggleClass("search-open");
        $(".menu-area").removeClass("menu-open");
    });

    $(".menu-toggle").click(function () {
        $(".menu-area").toggleClass("menu-open");
        $(".search-area").removeClass("search-open");
    });
});

$(document).on("click", function (event) {
    var $trigger = $(".SideTabMenu");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".search-area").removeClass("search-open");
        $(".menu-area").removeClass("menu-open");
    }
});

$(document).load(function () {
    checkTopItems();
});

$(window).load(function () {
    SetStoredTheme(); //get PageName and Apply Mode (Dark and Light)- Priyanshu
    waitingDialog.hide();
});
$(window).resize(function () {
    setHeight1();
});


var g_pageLoadAnimationParams = {
    elementSlideIn: "sideNavBox",
    elementSlideInPhase2: "contentBox"
};

// for ipad 
(function () {

    if ("-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
    }
})
();
function SetCompanyLogoAndNavigations() {
    if ($.cookie.length > 0 && $.cookie("Language") != undefined) {
        var preferredLanguageValue = $.cookie("Language");
        var preferredLanguage = $.cookie("Language").split('#'); // Index : [0]  => e.g. Language3rd     [1] e.g. Hindi;
        // Show Navigations
        GetNavigationsDetails(preferredLanguage[0]);
        // Show Company Logo
        GetLogoUrl(preferredLanguage[0]);
    } else {
        // Show Navigations
        GetNavigationsDetails('DefaultLanguage');

        // Show Company Logo
        GetLogoUrl('DefaultLanguage');
    }

    if ($.cookie.length > 0 && $.cookie("Language") != undefined) {
        var preferredLanguageValue = $.cookie("Language");
        var preferredLanguage = $.cookie("Language").split('#'); // Index : [0]  => e.g. Language3rd     [1] e.g. Hindi;

        if (preferredLanguageValue.indexOf('Arabic') > 0) {
            //$('body').append('<link rel="stylesheet" href="_catalogs/masterpage/Titan2/Styles/Ar/Intranet-Styles.css" type="text/css" />');
            $('body').append('<link rel="stylesheet" href="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/_catalogs/masterpage/Titan2/Styles/Ar/Intranet-Styles.css" type="text/css" />');
        }
    }
}

function LoadMasterPageLogics() {
    var companyID = Logged_CompanyId;//titanForWork.getQueryStringParameter("CompanyId");
    GetThemeNameByCompany(companyID).done(function (themeName) {
        if ($.cookie.length > 0 && $.cookie("Language") != undefined) {
            var preferredLanguageValue = $.cookie("Language");
            var preferredLanguage = $.cookie("Language").split('#'); // Index : [0]  => e.g. Language3rd     [1] e.g. Hindi;

            // Show Emergency Annoucement
            //getEmergencyAnnouncment(preferredLanguage[0]);

            if (themeName != "Default") {
                // Apply Theme
                SetTheme()
                setTimeout(SetThemeDelayed, 1000);
            }
        } else {
            // Show Emergency Annoucement
            //getEmergencyAnnouncment('DefaultLanguage');

            if (themeName != "Default") {
                // Apply Theme
                SetTheme()
                setTimeout(SetThemeDelayed, 1000);
            }
        }
    })

    GetEmployeeCompanies();     
    $('#ddlCompany').val(Logged_CompanyId);
    $('#ddlCompanyNavTeams').val(Logged_CompanyId);
    txtCompanyName = Logged_CompanyName;
    //getCompanyName();

    $('#ddlCompany').change(function () {
        var companyId = Logged_CompanyId;//titanForWork.getQueryStringParameter("CompanyId");

        //clear theme, language,navigation and logo local storage
        localStorage.setItem("TitanNavigation_" + _spPageContextInfo.siteId + "_" + companyId, null);
        localStorage.setItem("TitanLogo_" + _spPageContextInfo.siteId + "_" + companyId, null);
        localStorage.setItem("TitanLanguage_" + _spPageContextInfo.siteId, null);
        localStorage.setItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + companyId, null);
        //change companyid
        var currentCompanyUrl = titanForWork.currentCompanyUrl(this.value); //Get Current Company url
        var querystringcompanyvalues = '{"CompanyId":"' + this.value + '","DepartmentId":"","DepartmentSiteUrl":"","CompanySiteUrl":"' + currentCompanyUrl + '","CurrentDomainSite":"' + _spPageContextInfo.webAbsoluteUrl + '","WelcomePageCalled":' + true + '}';
        titanForWork.createCookie(_spPageContextInfo.siteId, querystringcompanyvalues, 10);
        location.reload(true);
    });
    // TEAM dropdown 
    $('#ddlCompanyNavTeams').change(function () {
        var companyId = Logged_CompanyId;//titanForWork.getQueryStringParameter("CompanyId");

        //clear theme, language,navigation and logo local storage
        localStorage.setItem("TitanNavigation_" + _spPageContextInfo.siteId + "_" + companyId, null);
        localStorage.setItem("TitanLogo_" + _spPageContextInfo.siteId + "_" + companyId, null);
        localStorage.setItem("TitanLanguage_" + _spPageContextInfo.siteId, null);
        localStorage.setItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + companyId, null);
        //change companyid
        var currentCompanyUrl = titanForWork.currentCompanyUrl(this.value); //Get Current Company url
        var querystringcompanyvalues = '{"CompanyId":"' + this.value + '","DepartmentId":"","DepartmentSiteUrl":"","CompanySiteUrl":"' + currentCompanyUrl + '","CurrentDomainSite":"' + _spPageContextInfo.webAbsoluteUrl + '","WelcomePageCalled":' + true + '}';
        titanForWork.createCookie(_spPageContextInfo.siteId, querystringcompanyvalues, 10);
        location.reload(true);
    });
}

function SetTheme() {
    var localStorageLanguage = localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId);
    if (localStorageLanguage == null || localStorageLanguage == "" || localStorageLanguage == "null") {
        // Check browser support   
        var TableName = "Table1";
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('ThemeSettings')/items?$select=ID,ThemeName,ThemeClassName,Area,FillingType,Value,Orientation&$filter= ThemeName eq '" + titanThemeName + "'",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            dataType: "json",
            success: function (data) {

                var items = data.d.results;
                localStorage.setItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId, JSON.stringify(LocalStorageThemeData(items)));
                localStorageLanguage = JSON.parse(localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId));
                ThemeCommonFunction(localStorageLanguage.data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    } else {
        var localStorageData = JSON.parse(localStorageLanguage);
        ThemeCommonFunction(localStorageData.data);
        var storageDateTimeStamp = new Date(localStorageData.TimeStamp);
        storageDateTimeStamp.setHours(0, 0, 0, 0);
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (currentDate.getTime() != storageDateTimeStamp.getTime()) {
            localStorage.setItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId, null);
        }
    }
}

function LocalStorageThemeData(jsonString) {
    var localStorageLanguage = {};
    localStorageLanguage.data = jsonString;
    localStorageLanguage.TimeStamp = new Date();
    return localStorageLanguage;
}

function ThemeCommonFunction(items) {
    $.each(items, function (i, item) {
        ////////////////////////// Page Background ///////////////////////////////////////
        var value = item.Value;
        if (item.Area == "IconColor") {
            HeaderTextColor = value + " !important";
            var ThemeClassName = item.ThemeClassName;
            $('#DeltaPlaceHolderMain .panel-heading-bg-txt-clr').each(function () {
                this.style.setProperty('background', value, 'important');
            });

            $('.SideTabMenu .panel-heading-bg-clr').each(function () {
                this.style.setProperty('background', value, 'important');
            });
        }

        if (item.Area == "PageBackground" && item.FillingType == 'BGColour') {
            // Apply Theme on Body Background (Solid Color)
            $('body').each(function () {
            	if(getCookie("LightDarkMode") == 'DarkMode') { 
            		$(document.body).attr('style', 'background-color: hsla(228, 5%, 22%, 1) !important');
            	}
            	else {
                	this.style.setProperty('background-color', value, 'important');
                }
            });

            $('.get-oc-c').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
        } else if (item.Area == "PageBackground" && item.FillingType == 'TexturedPicture') {
            // Apply Theme on Body Background (Textured Picture)
            //$('#s4-bodyContainer').each(function () 
            $('body').each(function () {
                this.style.setProperty("background-image", "url(" + value + ")", "important");
                //this.style.setProperty('background-image', 'url("https://adaptindia.sharepoint.com/sites/TITAN2-DEV/ThemePictures/texture14.jpg")' , 'important');
            });

            $('.get-oc-c').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
        } else if (item.Area == "PageBackground" && item.FillingType == 'StretchedPicture') {
            // Apply Theme on Body Background (Stretched Picture)
            var orientation = item.Orientation;
            //$('#s4-bodyContainer').each(function () 
            $('body').each(function () {
                if (orientation == "Original") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                    this.style.setProperty("background-repeat", "no-repeat", "important");
                } else if (orientation == "Stretched") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                    this.style.setProperty("background-size", "cover", "important");
                } else if (orientation == "Tiled") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                }
            });

            $('.get-oc-c').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
        }


            ////////////////////////// Navigation ///////////////////////////////////////
        else if (item.Area == "Navigation" && item.FillingType == 'BGColour') {
            // Apply Theme on Navigation
            $('.header-nav').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });

        } else if (item.Area == "Navigation" && item.FillingType == 'TexturedPicture') {
            // Apply Theme on Navigation
            $('.header-nav').each(function () {
                this.style.setProperty("background-image", "url(" + value + ")", "important");
            });

            $('nav').each(function () {
                this.style.setProperty("background-image", "url(" + value + ")", "important");
            });

            // Apply Theme on Navigations 
            $('nav .dropdown-menu').each(function () {
                this.style.setProperty("background-image", "url(" + value + ")", "important");
            });
        } else if (item.Area == "Navigation" && item.FillingType == 'StretchedPicture') {
            // Apply Theme on Body Background (Textured Picture)
            var orientation = item.Orientation;
            $('.header-nav').each(function () {
                if (orientation == "Original") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                    this.style.setProperty("background-repeat", "no-repeat", "important");
                } else if (orientation == "Stretched") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                    this.style.setProperty("background-size", "cover", "important");
                } else if (orientation == "Tiled") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                }
            });

            $('nav').each(function () {
                if (orientation == "Original") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                    this.style.setProperty("background-repeat", "no-repeat", "important");
                } else if (orientation == "Stretched") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                    this.style.setProperty("background-size", "cover", "important");
                } else if (orientation == "Tiled") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                }
            });

            $('nav .dropdown-menu').each(function () {
                if (orientation == "Original") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                    this.style.setProperty("background-repeat", "no-repeat", "important");
                } else if (orientation == "Stretched") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                    this.style.setProperty("background-size", "cover", "important");
                } else if (orientation == "Tiled") {
                    this.style.setProperty("background-image", "url(" + value + ")", "important");
                }
            });
        }

            ///////////////////////New Text clor for 09/aug/2019/////////////////////
        else if (item.Area == "WebPartHeaderTextColor" && item.FillingType == 'BGColour') {
            MediatextColor = value + " !important";
            // Apply Theme on Font Text Color (Headers)
            $('.panel-head-4 .h4-color').each(function () {
                this.style.setProperty('color', value, 'important');
            });
            $('.panel-head-4 .h4-color a').each(function () {
                this.style.setProperty('color', value, 'important');
            });
            $('.ticker-container .ticker-caption').each(function () {
                this.style.setProperty('color', value, 'important');
            });
            $('.panel-heading-bg-txt-clr').each(function () {
                this.style.setProperty('color', value, 'important');
            });

        }
            ////////////////////////// WebParts ///////////////////////////////////////
        else if (item.Area == "WebPartHeaderBandColor" && item.FillingType == 'BGColour') {
            $('.ticker-container .ticker-caption').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
            $('.panel-head-4').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
            $('.Spotlight-NewJoinee-Biography .head-bg2').each(function () {
                this.style.setProperty('border-color', value, 'important');
            });
            $('.soc-tab-div-right ul .head-bg3').each(function () {
                this.style.setProperty('border-color', value, 'important');
            });
            $('.Media-magzine-right .head-bg2').each(function () {
                this.style.setProperty('border-color', value, 'important');
            });
            $('.link-color-new').each(function () {
                this.style.setProperty('color', value, 'important');
            });
            $('#sliderDiv .slider-caption a .slider-border').each(function () {
                //this.style.setProperty('border-right-color', value , 'important');
            });
            $('#sliderDiv .slider-caption a .slider-border .slider-text').each(function () {
                //this.style.setProperty('color', value , 'important');
            });
            $('.buraq-pad-rignt-none .text-gall2').each(function () {
                this.style.setProperty('color', value, 'important');
            });
            $('.quicklinks').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
            $('#tabdata li.tab-active').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });

            // Org. Chart
            $('.get-oc-tb').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });

            $('.get-org-chart .get-text').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
        } else if (item.Area == "WebPartContentBackground" && item.FillingType == 'BGColour') {
            // Apply Theme on WebPart Content Background
            $('.panel-height-2').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
            $('.panel-default-new').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
            $('#EmplyoeeAwordHTML div.item.active').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });

            $('.event-ocassion').each(function () {
                this.style.setProperty('background-color', value, 'important');
            });
        } else if (item.Area == "WebPartContentBackground" && item.FillingType == 'TexturedPicture') {
            // Apply Theme on WebPart Content Background
            $('.panel-height-2').each(function () {
                this.style.setProperty("background-image", "url(" + value + ")", "important");
            });
            $('.panel-default-new').each(function () {
                this.style.setProperty("background-image", "url(" + value + ")", "important");
            });

            $('.news-box').each(function () {
                this.style.setProperty("background-image", "url(" + value + ")", "important");
            });

            $('#EmplyoeeAwordHTML .item').each(function () {
                this.style.setProperty("background-image", "url(" + value + ")", "important");
            });
            $('.event-ocassion').each(function () {
                this.style.setProperty("background-image", "url(" + value + ")", "important");
            });
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////
/////////////// Apply Theme on Titan Portal once Loading All Required Content/Text. (Delayed, Apply after 2 seconds)
////////////////////////////////////////////////////////////////////////////////////////////

function SetThemeDelayed() {
    var localStorageLanguage = localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId);
    if (localStorageLanguage != null && localStorageLanguage != "" && localStorageLanguage != "null") {
        var localStorageData = JSON.parse(localStorageLanguage);
        ThemeCommonFunction(localStorageData.data);
        var storageDateTimeStamp = new Date(localStorageData.TimeStamp);
        storageDateTimeStamp.setHours(0, 0, 0, 0);
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (currentDate.getTime() != storageDateTimeStamp.getTime()) {
            localStorage.setItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId, null);
        }
    }


    // -------- New Code For Icons Color / Background Color on  Homepage / Department page -------- 

    // This is the dynamic color for icon/icon-background/header-text-color that the user has choosen.
    var dynamic_icon_clr = "";
    if ($('.headicon').attr('style') != null) {
        dynamic_icon_clr = $('.headicon').attr('style').split(';')[0];
    }
    var dynamic_bkg_icon_clr = "";
    if ($('.headicon').attr('style') != null) {
        dynamic_bkg_icon_clr = $('.headicon').attr('style').split(';')[0].split(':')[1];
    }
    var dynamic_head_text_clr = "";
    if ($('.h4-color').attr('style') != null) {
        dynamic_head_text_clr = $('.h4-color').attr('style').split(';')[0];
    }

    // For all other icons on homepage excluding combo webpart & Media webpart --------START--------
    $(".nav-custom li:first").find("a").css('background-color', HeaderTextColor, 'important');
    $(".nav-custom-gallery li:first").find("a").css('background-color', HeaderTextColor, 'important');

    $(".nav-custom li").click(function () {
        $(".nav-custom").find("li").find("a").removeAttr("style");
        $(this).find("a").css('background-color', HeaderTextColor, 'important');
    });

    $(".nav-custom-gallery li").click(function () {
        $(".nav-custom-gallery").find("li").find("a").removeAttr("style");
        $(this).find("a").css('background-color', HeaderTextColor, 'important');
        $(this).find("a").css('color', MediatextColor + ' !important');
    });
}

// Get Theme Name by Company ID
function GetThemeNameByCompany(companyID) {
    if (companyID != undefined) {
        var deferred = $.Deferred();
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CompanyThemes')/items?$select=ID,CompanyName/ID,ThemeName&$expand=CompanyName&$filter=CompanyName/ID eq " + companyID + "&$top=1";

        $.ajax({
            url: requestUri,
            type: "GET",
            headers: {
                "ACCEPT": "application/json;odata=verbose"
            },
            success: function (data) {
                var results = data.d.results;
                if (results != null && results != '') {
                    titanThemeName = results[0].ThemeName;
                    deferred.resolve(titanThemeName);
                }
            },
            error: function () {
                console.log("Error in Get Theme Name By Company");
            }
        });
    }
    return deferred;
}

/// Get Langauges and binds Languages Dropdown list
function BindLanguages() {
    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('LanguageSetting')/Items?$select=Language,Title,DisplayLanguage&$filter=Status eq 'Active'";

    $.ajax({
        url: requestURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        success: function (data) {
            var ddlLanguages = document.getElementById("ddlLanguages");

            var results = data.d.results;
            $.each(results, function (i, value) {
                var option = document.createElement("option");
                option.value = value.Title + '#' + value.Language;
                option.text = value.DisplayLanguage;
                ddlLanguages.appendChild(option);
            });

            //// Select Language ///////////
            if ($.cookie.length > 0 && $.cookie("Language") != undefined) {
                var preferredLanguage = $.cookie("Language");
                $("#ddlLanguages").val(preferredLanguage);
            } else {
                $("#ddlLanguages").val("DefaultLanguage#English");
            }
        },
        error: function (error) {

        }
    })
}

///New navigation Method//////////////////////
function GetNavigationsDetails(currentLanguage) {
    companyIdNavigation = Logged_CompanyId;
    if (currentLanguage == 'DefaultLanguage') {
        currentLanguage = 'Menu';
    }
    var localStorageLanguage = localStorage.getItem("TitanNavigation_" + _spPageContextInfo.siteId + "_" + companyIdNavigation);
    //if (localStorageLanguage == null || localStorageLanguage == "" || localStorageLanguage == "null") {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Navigation')/items?select=ParentId,Status,Postion,Menu,URL,Language2nd,Language3rd,Language4th,Language5th,Language6th,Language7th,Language8th,Language9th,Language10th,DepartmentID,ID&$orderby=Postion asc&$filter=CompanyId  eq '" + companyIdNavigation + "' and Status eq 1";
    $.ajax({
        url: Ownurl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        success: function (data) {

            localStorage.setItem("TitanNavigation_" + _spPageContextInfo.siteId + "_" + companyIdNavigation, JSON.stringify(LocalStorageLogo(data.d.results)));
            localStorageLanguage = localStorage.getItem("TitanNavigation_" + _spPageContextInfo.siteId + "_" + companyIdNavigation);
            var localStorageData = JSON.parse(localStorageLanguage);
            //call function
            CommonNavigation(localStorageData.data, currentLanguage);

        },
        error: function (data) {
            console.log(data.responseText);
        }
    });
    //} 

    /*else {
        var localStorageData = JSON.parse(localStorageLanguage);
        CommonNavigation(localStorageData.data, currentLanguage);
        var storageDateTimeStamp = new Date(localStorageData.TimeStamp);
        storageDateTimeStamp.setHours(0, 0, 0, 0);
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (currentDate.getTime() != storageDateTimeStamp.getTime()) {
            localStorage.setItem("TitanNavigation_" + _spPageContextInfo.siteId + "_" + companyIdNavigation, null);
        }
    }*/
}

function ShowMyGroup() {
    $("#myModalGroup").modal();
    GetDepartmentConfidentialGroupUsersGroups();
}

function logout() {
    var Istrue = confirm("Are you sure to logout SharePoint?")
    if (Istrue) {
        ///_layouts/15/closeConnection.aspx?loginasanotheruser=true
        window.location.href = _spPageContextInfo.webServerRelativeUrl + "/_layouts/signout.aspx";
    }
}


function CommonNavigation(items, currentLanguage) {
    var CompanyId = Logged_CompanyId;
    var Subarr = EmployeeDetails.filter(function(filterData) {
        return filterData.CompanyId == CompanyId;
    });
    var newItemID = Subarr[0].ID;
    var MyProfile = _spPageContextInfo.webServerRelativeUrl + "/Pages/EmployeeDetails.aspx?WebAppId=" + CompanyId + "&mode=editview&department=&employeedIddetails=" + newItemID + "&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl + "";
    $("#myCurrentProfile").attr("href", MyProfile)
    $("#myCurrentProfileTeams").attr("href", MyProfile);
    var mainContent = '<ul class="nav navbar-nav">';
    var siteURL = _spPageContextInfo.webAbsoluteUrl;
    for(var index = 0; index < items.length; index++) {
        var navigationItem = {};
        var ItemID = items[index].ID;
        items[index].URL = items[index].URL ? items[index].URL : '';
        var ParentUrl = siteURL + "/" + items[index].URL;
        var ParentMenu = items[index][currentLanguage];
        navigationItem.ItemID = items[index].ID;
        navigationItem.ParentId = items[index].ParentId;
        navigationItem.DepartmentID = items[index].DepartmentID;
        navigationItem.Status = items[index].Status;
        navigationItem.Postion = items[index].Postion;
        navigationItem.Menu = items[index].Menu;
        navigationItem.URL = items[index].URL ? items[index].URL : '';
        navigationItem.Language2nd = items[index].Language2nd;
        navigationItem.Language3rd = items[index].Language3rd;
        navigationItem.Language4th = items[index].Language4th;
        navigationItem.Language5th = items[index].Language5th;
        navigationItem.Language6th = items[index].Language6th;
        navigationItem.Language7th = items[index].Language7th;
        navigationItem.Language8th = items[index].Language8th;
        navigationItem.Language9th = items[index].Language9th;
        navigationItem.Language10th = items[index].Language10th;
        navigationItem.Title = items[index].Title;
        if(my_custm_val == '?TEAM' || sessionStorage.getItem("key") == "?TEAM") {
            ParentUrl = ParentUrl + "?TEAM";
        }
        navigationItem.ParentUrl = ParentUrl;
        navigationItem.ParentMenu = ParentMenu;
        if(ParentMenu == null || ParentMenu.trim() == "") {
            navigationItem.ParentMenu = items[index].Menu;
        }
        navigationsArray.push(navigationItem);
        if(items[index].ParentId == 0) {
            /*          
              if(ParentUrl.indexOf("MyDashboard.aspx") != -1) {
                            mainContent += '<li class="navItem">';
                            mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                            mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                            mainContent += "</li>";
                        } else {
                        */
            if(items[index].Title == "Always") {
                mainContent += '<li class="navItem">';
                mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                mainContent += "</li>";
            } else if(items[index].Title == "DMS") {
                if(LicDMS == "All") {
                    mainContent += '<li class="navItem">';
                    mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                    mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                    mainContent += "</li>";
                }
                if(LicDMS > 0) {
                    if(EmpLinceseEncript.search(/DMS/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //also check email address in the license
                    {
                        mainContent += '<li class="navItem">';
                        mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                        mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                        mainContent += "</li>";
                    }
                }
            } else if(items[index].Title == "Task&Project") {
                if(LicProjectTask == "All") {
                    mainContent += '<li class="navItem">';
                    mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                    mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                    mainContent += "</li>";
                }
                if(LicProjectTask > 0) {
                    if(EmpLinceseEncript.search(/Project/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                    {
                        mainContent += '<li class="navItem">';
                        mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                        mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                        mainContent += "</li>";
                    }
                }
            } else if(items[index].Title == "Intranet") {
                if(LicIntranet == "All") {
                    mainContent += '<li class="navItem">';
                    mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                    mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                    mainContent += "</li>";
                }
                if(LicIntranet > 0) {
                    if(EmpLinceseEncript.search(/Internet/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                    {
                        mainContent += '<li class="navItem">';
                        mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                        mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                        mainContent += "</li>";
                    }
                }
            } else if(items[index].Title == "Process") {
                if(LicBPaas > 0) {
                    mainContent += '<li class="navItem">';
                    mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                    mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                    mainContent += "</li>";
                }
            } else if(items[index].Title == "Process and Intranet") {
                if(LicBPaas > 0 || LicIntranet == "All") {
                    mainContent += '<li class="navItem">';
                    mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                    mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                    mainContent += "</li>";
                } else if(LicIntranet > 0 || LicBPaas > 0) {
                    if(EmpLinceseEncript.search(/Internet/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                    {
                        mainContent += '<li class="navItem">';
                        mainContent += "<a href='" + ParentUrl + "' title='" + ParentMenu + "'>" + ParentMenu + "  </a>";
                        mainContent += "<span class=\"spanMenu\" style=\"display:none\" >" + ItemID + "</span>";
                        mainContent += "</li>";
                    }
                }
            }
            //  }
        }
    }
    mainContent += "</ul>";
    $("#myNavbar").empty();
    $("#myNavbar").append(mainContent);
    BindChildMenus(currentLanguage); // Bind Child Menus
}
function redirectMyDashboard(Action) {
    //localStorage.removeItem("FilterLocalStorage");
    //localStorage.removeItem("FilterLocalOutStorage");
    location.href = Action.name;
}

///////////////////End New Navigation Method//////////////////////////
function BindChildMenus(currentLanguage) {
    $(".navItem").each(function () {
        var parentID = $(this).find(".spanMenu").text();
        var thisControl = $(this);
        BuildChildMenusHTML(thisControl, parentID, currentLanguage);
    });
}

function BuildChildMenusHTML(parentThisControl, PresentID, currentLanguage) {
    var siteURL = _spPageContextInfo.webAbsoluteUrl;

    var childMenusCollection = jQuery.grep(navigationsArray, function (item, i) {
        return (item.ParentId == PresentID);
    });

    if (childMenusCollection.length > 0) {

        var childHTML = '<ul id="company" class="dropdown-menu dropdown-custom">';
        $('#company').empty();
        var option = '';
        for (var index = 0; index < childMenusCollection.length; index++) {
            var DepartmentID = childMenusCollection[index].DepartmentID;
            var ChildUrl = siteURL + "/" + childMenusCollection[index].URL;
            if(my_custm_val=='?TEAM' || sessionStorage.getItem("key")=="?TEAM")
            {
                ChildUrl+"?TEAM";
            }   
            var ChildMenu = childMenusCollection[index][currentLanguage];
            if (ChildMenu == null || ChildMenu.trim() == "") {
                ChildMenu = childMenusCollection[index].Menu;
            }
            if(childMenusCollection[index].Title == "Intranet") {
                if(LicIntranet == "All") {
                    childHTML += "<li style=\"padding: 8px 0 0 0;\"><a title=" + ChildMenu + " href=" + ChildUrl + " onclick='SetDepartmentDetailsInCookies(" + companyIdNavigation + "," + DepartmentID + ")' >" + ChildMenu + "</a></li>";
                }
                if(LicIntranet > 0) {
                    if(EmpLinceseEncript.search(/Internet/i) > 0 && EmpLinceseEncript.split("|")[0].toLowerCase() == _spPageContextInfo.userLoginName.toLowerCase()) //now go to empolyee list to check license of loged user
                    {
                        childHTML += "<li style=\"padding: 8px 0 0 0;\"><a title=" + ChildMenu + " href=" + ChildUrl + " onclick='SetDepartmentDetailsInCookies(" + companyIdNavigation + "," + DepartmentID + ")' >" + ChildMenu + "</a></li>";
                    }
                }
            } else {
                        childHTML += "<li style=\"padding: 8px 0 0 0;\"><a title=" + ChildMenu + " href=" + ChildUrl + " onclick='SetDepartmentDetailsInCookies(" + companyIdNavigation + "," + DepartmentID + ")' >" + ChildMenu + "</a></li>";
                   }
            if (DepartmentID !== null) {
                option += "<li><a title=" + ChildMenu + " href=" + ChildUrl + " onclick='SetDepartmentDetailsInCookies(" + companyIdNavigation + "," + DepartmentID + ")' >" + ChildMenu + "</a><li/>";

            }
        }

        childHTML += "</ul>";
        parentThisControl.append(childHTML);
        $('#teamdrp').append(option)
        parentThisControl.addClass("dropdown");
        parentThisControl.find("a:eq(0)").addClass("dropdown-toggle");
        parentThisControl.find("a:eq(0)").attr("data-toggle", "dropdown");
        parentThisControl.find("a:eq(0)").append("<b class=\"caret\"></b>");
        parentThisControl.addClass("open");
		parentThisControl.find("a:eq(0)").prop("aria-expanded", "true");
        if($("#company").isOnScreen() == false){
        	$("#company").addClass('OutOfScreen');
        }
        parentThisControl.removeClass("open");
		parentThisControl.find("a:eq(0)").prop("aria-expanded", "false");
    }
}


//to check if SubMenu is out of Screen Window
$.fn.isOnScreen = function(partial){

    //let's be sure we're checking only one element (in case function is called on set)
    var t = $(this).first();

    //we're using getBoundingClientRect to get position of element relative to viewport
    //so we dont need to care about scroll position
    var box = t[0].getBoundingClientRect();

    //let's save window size
    var win = {
        h : $(window).height(),
        w : $(window).width()
    };

    //now we check against edges of element

    //firstly we check one axis
    //for example we check if left edge of element is between left and right edge of scree (still might be above/below)
    var topEdgeInRange = box.top >= 0 && box.top <= win.h;
    var bottomEdgeInRange = box.bottom >= 0 && box.bottom <= win.h;

    var leftEdgeInRange = box.left >= 0 && box.left <= win.w;
    var rightEdgeInRange = box.right >= 0 && box.right <= win.w;


    //here we check if element is bigger then window and 'covers' the screen in given axis
    var coverScreenHorizontally = box.left <= 0 && box.right >= win.w;
    var coverScreenVertically = box.top <= 0 && box.bottom >= win.h;

    //now we check 2nd axis
    var topEdgeInScreen = topEdgeInRange && ( leftEdgeInRange || rightEdgeInRange || coverScreenHorizontally );
    var bottomEdgeInScreen = bottomEdgeInRange && ( leftEdgeInRange || rightEdgeInRange || coverScreenHorizontally );

    var leftEdgeInScreen = leftEdgeInRange && ( topEdgeInRange || bottomEdgeInRange || coverScreenVertically );
    var rightEdgeInScreen = rightEdgeInRange && ( topEdgeInRange || bottomEdgeInRange || coverScreenVertically );

    //now knowing presence of each edge on screen, we check if element is partially or entirely present on screen
    var isPartiallyOnScreen = topEdgeInScreen || bottomEdgeInScreen || leftEdgeInScreen || rightEdgeInScreen;
    var isEntirelyOnScreen = topEdgeInScreen && bottomEdgeInScreen && leftEdgeInScreen && rightEdgeInScreen;

    return partial ? isPartiallyOnScreen : isEntirelyOnScreen;

};

$.expr.filters.onscreen = function(elem) {
  return $(elem).isOnScreen(true);
};

$.expr.filters.entireonscreen = function(elem) {
  return $(elem).isOnScreen(true);
};

// Get Department Site URL and then Set in Cookie.
function SetDepartmentDetailsInCookies(companyId, departmentID) {
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=SiteURL&$filter=ID eq '" + departmentID + "'";
    $.ajax({
        url: siteURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                var departmentSiteURL = items[0].SiteURL;

                var currentCompanyUrl = titanForWork.getQueryStringParameter("CompanySiteUrl");
                var queryStringCompanyValues = '{"CompanyId":"' + companyId + '","DepartmentId":"' + departmentID + '","DepartmentSiteUrl":"' + departmentSiteURL + '","CompanySiteUrl":"' + currentCompanyUrl + '","CurrentDomainSite":"' + _spPageContextInfo.webAbsoluteUrl + '","WelcomePageCalled":' + false + '}';
                titanForWork.createCookie(_spPageContextInfo.siteId, queryStringCompanyValues, 10);
            }
        },
        error: function (data) {
            console.log("Error occured in CreateCookieToSetDepartmentSiteURL()");
        }
    });
}

function GetLogoUrl(currentLanguage) {
    var txtCompanyId = Logged_CompanyId;
    var localStorageLanguage = localStorage.getItem("TitanLogo_" + _spPageContextInfo.siteId + "_" + txtCompanyId);
    if (localStorageLanguage == null || localStorageLanguage == "" || localStorageLanguage == "null") {
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Companies')/items?select=ID,CompanyLogo,BusinessDomain,Language2nd_Logo,Language3rd_Logo,Language7th_Logo,Language8th_Logo,Language9th_Logo,Language10th_Logo,Language5th_Logo,Language6th_Logo,SmallLogo,Language4th_Logo&$filter=ID eq '" + txtCompanyId + "'";
        $.ajax({
            url: Ownurl,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            async: true,
            success: function (data) {
                var items = data.d.results;
                if (items.length > 0) {
                    for (var index = 0; index < items.length; index++) {
                        var companyLogo = GetCompanyLogo_CurrentLanguage(currentLanguage);
                        if (data.d.results[index][companyLogo] != null) {
                            var LogoUrl = data.d.results[index][companyLogo].Url; //oListItem.get_item(companyLogo).get_url();

                            $("#LogoImage").attr("src", LogoUrl);
                            var g_BusinessDomain = items[index].BusinessDomain;
                            if (g_BusinessDomain != null || g_BusinessDomain != '') {
                                $('.navbar-brand').addClass('navbarPointer');
                                $("#navbarLogoLink").attr("href", g_BusinessDomain);
                            }

                            localStorage.setItem("TitanLogo_" + _spPageContextInfo.siteId + "_" + txtCompanyId, JSON.stringify(LocalStorageLogo(LogoUrl)));
                            convertImgToBase64URL(LogoUrl, function (base64Img) {
                                if (base64Img != null) {
                                    localStorage.setItem("TitanLogo_" + _spPageContextInfo.siteId + "_" + txtCompanyId, JSON.stringify(LocalStorageLogo(base64Img)));
                                    $("#LogoImage").attr("src", base64Img);
                                }
                            });
                        } else {
                            $('#LogoImage').attr("src", 'https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/_catalogs/masterpage/Titan2/Images/Titan-Logo.png');
                        }
                    }
                }
            },
            eror: function (data) {
                console.log('error');
            }
        });
    } else {
        var localStorageData = JSON.parse(localStorageLanguage);
        $("#LogoImage").attr("src", localStorageData.data);
        var storageDateTimeStamp = new Date(localStorageData.TimeStamp);
        storageDateTimeStamp.setHours(0, 0, 0, 0);
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (currentDate.getTime() != storageDateTimeStamp.getTime()) {
            localStorage.setItem("TitanLogo_" + _spPageContextInfo.siteId + "_" + txtCompanyId, null);
        }
    }
}

function convertImgToBase64URL(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

function LocalStorageLogo(jsonString) {
    var localStorageLanguage = {};
    localStorageLanguage.data = jsonString;
    localStorageLanguage.TimeStamp = new Date();
    return localStorageLanguage;
}

function GetCompanyLogo_CurrentLanguage(currentLanguage) {
    var companyLogo = '';

    switch (currentLanguage) {
        case 'Language2nd':
            companyLogo = "Language2nd_Logo";
            break;
        case 'Language3rd':
            companyLogo = "Language3rd_Logo";
            break;
        case 'Language4th':
            companyLogo = "Language4th_Logo";
            break;
        case 'Language5th':
            companyLogo = "Language5th_Logo";
            break;
        case 'Language6th':
            companyLogo = "Language6th_Logo";
            break;
        case 'Language7th':
            companyLogo = "Language7th_Logo";
            break;
        case 'Language8th':
            companyLogo = "Language8th_Logo";
            break;
        case 'Language9th':
            companyLogo = "Language9th_Logo";
            break;
        case 'Language10th':
            companyLogo = "Language10th_Logo";
            break;
        default:
            companyLogo = "CompanyLogo";
    }
    return companyLogo;
}

function GetEmployeeCompaniesDetails() {
    var obj = document.getElementById("ddlCompany");
    for (var i = 0; i < EmployeeDetails.length; i++) {
        var companyName = EmployeeDetails[i].Company.Title;
        var companyMainId = EmployeeDetails[i].Company.ID;
        opt = document.createElement("option");
        opt.value = companyMainId;
        opt.text = companyName;
        obj.appendChild(opt);
    }
    /*$('#ddlCompanyNavTeams option').filter(function () {
        return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
    }).remove();*/
    /*$("#ddlCompanyNavTeams  option").val(function(idx, val) {
	  $(this).siblings('[value="'+ val +'"]').remove();
	});*/
    var txtCompanyId = Logged_CompanyId;
    $('#ddlCompany').val(txtCompanyId);
    $('#ddlCompanyNavTeams').val(txtCompanyId);
}

//get company name for Org chart
/*function getCompanyName() {
    var RestQuery = "?$select=ID,CompanyName,BusinessDomain&$filter=ID eq " + Logged_CompanyId;
    var ListName = "Companies";

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + RestQuery,
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            txtCompanyName = data.d.results[0].CompanyName;
            BusinessDomain = data.d.results[0].BusinessDomain;
            if (BusinessDomain == null) {
                BusinessDomain = '';
            }
            if (BusinessDomain != '') {
                $('.navbar-brand').addClass('navbarPointer');
                //$('.navbar-brand a').attr('href').replace('#',LogoUrl);
                $("#navbarLogoLink").attr("href", BusinessDomain);
            }
            else {
                $('.navbar-brand').removeClass('navbarPointer');
            }
        },
        error: function (error) {

        }
    });
}*/

function GetEmployeeCompanies() {
	var obj = document.getElementById("ddlCompany");    
    opt = document.createElement("option");
    opt.value = parseInt(Logged_CompanyId);
    opt.text = Logged_CompanyName;
    obj.appendChild(opt);
    $("#ddlCompanyNavTeams").append('<option value="' + Logged_CompanyId + '">' + Logged_CompanyName +'</option>');    
    $('#ddlCompanyNavTeams option')
               .filter(function () {
                   return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
               })
               .remove();
    var txtCompanyId = Logged_CompanyId;

    var RestQuery = "?$select=*,Company/Title,Company/ID&$expand=Company &$filter=LogonName/ID eq " + _spPageContextInfo.userId + " and Status eq 'Active' and Company/ID ne "+Logged_CompanyId+" ";
    var ListName = "Employees";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + RestQuery,
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            var obj = document.getElementById("ddlCompany");
            for (var i = 0; i < data.d.results.length; i++) {
                var companyName = data.d.results[i].Company.Title;
                var companyMainId = data.d.results[i].Company.ID;
                opt = document.createElement("option");
                opt.value = companyMainId;
                opt.text = companyName;
                obj.appendChild(opt);
                $("#ddlCompanyNavTeams").append('<option value="' + companyMainId + '">' + companyName +'</option>');

            }            
            $('#ddlCompanyNavTeams option')
                .filter(function () {
                    return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
                })
                .remove();
            var txtCompanyId = Logged_CompanyId;



        },
        error: function (error) {

        }
    });
}

function setHeight1() {
    windowHeight = $(window).innerHeight();
    header = $('#ms-designer-ribbon').innerHeight();
    try {
        if ($("#ms-designer-ribbon").html() == "") {
            $('#s4-workspace').css('min-height', windowHeight);
        } else {
            $('#s4-workspace').css('min-height', (windowHeight - header));
        }
    } catch (e) {
        $('#s4-workspace').css('min-height', (windowHeight - header));

    }
}


function ReadAlert() {
    var companyID = Logged_CompanyId;
    var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 10);
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,Departments/Title,Company/Title&$filter=(Announcement_Type eq 'Alert' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "' and ApprovalStatus eq 'Approved' ) and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + companyID + "') or (Audience eq 'Department' and Company/ID eq '" + companyID + "' and Departments/ID eq '" + Logged_DepartmentId + "')) &$expand=Departments,Company&$orderby=Modified desc";
    $.ajax({
        url: Ownurl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                var mainContent = '<marquee>';
                for (var x = 0; x < items.length; x++) {
                    mainContent += items[x].Title + "<span style='padding:0 10px 0 10px;'> | </span>";
                }
                var test = mainContent.slice(0, -47);
                mainContent = test;
                mainContent += '</marquee>';
                $("#emergencyAnnouncment").empty();
                $("#emergencyAnnouncment").append(mainContent);
            } else {
                $('#tickerDiv').hide();
            }

            $("marquee").hover(function () {
                this.stop();
            }, function () {
                this.start();
            });
        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
}


// For dark theme apply 19/4/2022 START
function ApplyDarkThemes() {
    if ($("#dark-theme-btn").is(":checked")) {
        $(document.body).addClass('dark-theme');
        $("#dark-light-side-opt .dark-theme-btn-label").text("Light Mode");
        $("#dark-light-side-opt span.material-icons").html("light_mode");
        $(document.body).attr('style', 'background-color: hsla(228, 5%, 22%, 1) !important');
        // $(".dark-theme .panel-heading-bg-txt-clr").attr("style","background: #494948 !important;color: #fff !important;");
        //Priyanshu - To store Mode in Cookies -----------------------Starts
        document.cookie = "LightDarkMode" + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //Delete the cookie first
        titanForWork.createCookie("LightDarkMode", "DarkMode", 1000);
        //-----------------------------------------------------------Ends
    }
    else {
        $(document.body).removeClass('dark-theme');
        $("#dark-light-side-opt .dark-theme-btn-label").text("Dark Mode");
        $("#dark-light-side-opt span.material-icons").html("dark_mode");
        $(document.body).attr('style', 'background-color: hsla(0, 0%, 97%, 1) !important');
        //Priyanshu - To store Mode in Cookies -----------------------Starts
        document.cookie = "LightDarkMode" + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';//Delete the cookie first
        titanForWork.createCookie("LightDarkMode", "LightMode", 1000);
        //-----------------------------------------------------------Ends
    }
}

//to get the stored cookie value -- Priyanshu
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//to set the stored cookie value -- Priyanshu
function SetStoredTheme() {
    var SetMode = getCookie("LightDarkMode");
    var path = window.location.pathname;
    var Logged_InPageName = path.split("/").pop();
    //if (Logged_InPageName == "Myworkplace.aspx" || Logged_InPageName == "Document.aspx") {
        if (SetMode == "DarkMode") {
            $("#dark-theme-btn").prop('checked', true);
            $(document.body).addClass('dark-theme');
            $("#dark-light-side-opt .dark-theme-btn-label").text("Light Mode");
            $("#dark-light-side-opt span.material-icons").html("light_mode");
            $(document.body).attr('style', 'background-color: hsla(228, 5%, 22%, 1) !important');
        }
        else {
            $(document.body).removeClass('dark-theme');
            $("#dark-light-side-opt .dark-theme-btn-label").text("Dark Mode");
            $("#dark-light-side-opt span.material-icons").html("dark_mode");
            $(document.body).attr('style', 'background-color: hsla(0, 0%, 97%, 1) !important');
        }
    //}
    /*else {
        $(document.body).removeClass('dark-theme');
        $("#dark-light-side-opt .dark-theme-btn-label").text("Light Mode");
        $("#dark-light-side-opt span.material-icons").html("light_mode");
        $(document.body).attr('style', 'background-color: hsla(0, 0%, 97%, 1) !important');
    }*/
}

// For dark theme apply 19/4/2022 END

