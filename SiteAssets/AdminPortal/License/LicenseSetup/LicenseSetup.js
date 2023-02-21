$(document).ready(function () {
    UserAuthorization();
    GetClientName();
    $("#closeLicenceManager").click(function () {
        location.href = '../Pages/AdminPortal.aspx?WebAppId=' + Logged_CompanyId;
    });
    $("#LiceneceAgreement").prop("href", "../Pages/LicenceAgreement.aspx?WebAppId=" + Logged_CompanyId + "");
    LicenseDetails();
    $("#Accept").click(function () {
        if ($(this).is(':checked')) {
            document.getElementById("btnApply").disabled = false;
        }
        else {
            document.getElementById("btnApply").disabled = true;
        }
    });
    $("#rdoEnterprise").click(function () {
        $("#rdoCustomize").prop("checked", false);
        $(".chkAllCustom").prop("checked", false);
    });
    $("#rdoCustomize").click(function () {
        $("#rdoEnterprise").prop("checked", false);
    });
    $("#btnSubModules").click(function () {
        if (ModulesChangeValidate() == true) {
            if ($("#rdoCustomize").prop("checked") == true) {
                if ($("#chkDMSVersion").prop("checked") == true || $("#chkBusProcVersion").prop("checked") == true) {  //Set modules
                    waitingDialog.show();
                    setTimeout(function () {
                        setModules();
                    }, 100);
                }
            }
            else {
                waitingDialog.show();
                setTimeout(function () {
                    setModules();
                }, 100);
            }
        }
        else {
            alert("Kindly select any modules first.");
            return false;
        }

    });
});

//to check authorization of the page - Either SiteAdmin or TechAdmin
function UserAuthorization() {
    titanForWork.PageAuthorization("ManageCompany", Logged_CompanyId).done(function (currentUserRights, message) {
        if (currentUserRights.length > 0) {
            if ((currentUserRights[0].SiteAdmin == "SiteAdmin") || (currentUserRights[0].TechAdmin == "TechAdmin")) {
                if (TitanLicenseFormat == 'Enterprise' || TitanLicenseFormat == null) {
                    $("#rdoEnterprise").prop("checked", true);
                }
                else if (TitanLicenseFormat == 'DMS') {
                    $("#rdoCustomize").prop("checked", true);
                    $("#chkDMSVersion").prop("checked", true);
                }
            }
            else {
                alert(message);
                window.location.href = _spPageContextInfo.webAbsoluteUrl;
            }
        }
    });
}

//get total external Users
function GetClientName() {
    var ddlstatus = 1;
    var Ownurl = "";
    Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$filter=Status eq 'Active'&$top=5000";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            $('#licenseActiveGuestUser').text(items.length);
        },
        error: function (msg) {
            alert(msg.responseText);
            deferred.reject(msg.responseText);
        }
    });
}

function LicenseDetails() {
    licenseValidTill = $.datepicker.formatDate('dd M yy', licenseValidTill);
    GetActiveUsersLicense().done(function (activeUsersLicense) {
        $("#licenseActiveUsers").text(activeUsersLicense);
    });

    $("#totalUserLicenses").text(UsersLicenceRequired);
    var Accept = document.getElementById('Accept');
    if (activeCheck == true) {
        Accept.checked = true;
    }
    else {
        Accept.checked = false;
        Accept.disabled = false;
        document.getElementById("btnApply").disabled = false;
    }
    $("#licenseValidTill").text(licenseValidTill);
    $("#adUser").text(UsersLicenceRequired);

}

function GetActiveUsersLicense() {
    var deferred = $.Deferred();
    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employees')/Items?$select=ID,Email&$filter=PrimaryCompany eq 'Primary' and Status eq 'Active'&$top=5000";
    $.ajax({
        url: requestURL,
        type: 'GET',
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            var results = data.d.results;
            if (results.length > 0) {
                var newArray = [];
                $.each(results, function (key, value) {
                    var exists = false;
                    $.each(newArray, function (k, val2) {
                        if (value.Email == val2.Email) { exists = true };
                    });
                    if (exists == false && value.Email != "") { newArray.push(value); }
                });
                var activeUsersLicense = results.length;
                deferred.resolve(activeUsersLicense);
            }
        },
        error: function (msg) {
            BootstrapDialog.alert(msg.responseText);
            deferred.reject(msg.responseText);
        }
    })
    return deferred;
}

//check validation before submitting modules
function ModulesChangeValidate() {
    if ($("#rdoCustomize").prop("checked") == true) {
        if ($("#chkDMSVersion").prop("checked") == false) {
        	if ($("#chkBusProcVersion").prop("checked") == false) {
            	return false;
        	}
			else {
            	return true;
			}
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

//set module as Main 
function setModules() {
    if ($("#rdoEnterprise").prop("checked") == true) {
        ChangeHomepage("Default.aspx");
    }
    else if ($("#rdoCustomize").prop("checked") == true) {
        if ($("#chkDMSVersion").prop("checked") == true) {  //Set only DMS module
            ChangeHomepage("Document.aspx");
        }
        else if ($("#chkBusProcVersion").prop("checked") == true) {
            ChangeHomepage("approvals.aspx");
        }
    }
}

//Change Homepage as per selection
function ChangeHomepage(PageName) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/rootfolder",
        type: "POST",
        data: JSON.stringify({
            '__metadata': {
                'type': 'SP.Folder'
            },
            'WelcomePage': 'Pages/' + PageName
        }),
        headers:{
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "IF-MATCH": "*",
            "X-HTTP-Method": "PATCH",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data, status, xhr) {
            if ($("#rdoEnterprise").prop("checked") == true) {
                changeTitanFormat('Enterprise');
                ChangeTitanNavigation();
            }
            else if ($("#rdoCustomize").prop("checked") == true) {
                if ($("#chkDMSVersion").prop("checked") == true) {  //Set only DMS module
                    changeTitanFormat('DMS');
                    ChangeDMSNavigation();
                }
                else if ($("#chkBusProcVersion").prop("checked") == true) {
                    changeTitanFormat('Business Process');
                    ChangeBusProcNavigation();
                }
            }

        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
            waitingDialog.hide();
            return false;
        }
    });
}

//change Titan format as selected
function changeTitanFormat(FormatName) {
    var Query = "?$select=Title,Id,Formats&$top=5000&$filter=Title eq 'License'";
    var EnvMetadata = '';
    $.when(getItemsWithQuery("EnvironmentalSettings", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (value) {
        if (value.length > 0) {
            EnvMetadata = {
                __metadata: { 'type': 'SP.Data.EnvironmentalSettingsListItem' },
                Formats: FormatName
            }
            updateItemInList(EnvMetadata, "EnvironmentalSettings", value[0].Id);
        }
    });
}

//change Navigation as definition - DMS
function ChangeDMSNavigation() {
    var Query = "?$select=Title,ParentId,Status,Postion,Menu,URL,DepartmentID,ID,Company/Id&$top=5000&$expand=Company";
    $.when(getItemsWithQuery("Navigation", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (NavArray) {
        if (NavArray.length > 0) {
            var NavMetadata = '';
            NavArray.forEach(function (entry, index) {
                NavMetadata = '';
                if (entry.Title == "Org. Chart" || entry.Title == "Employee Directory" || entry.Title == "Admin Portal" || entry.Title == "My Documents" || entry.Title == "Company Documents" || entry.Title == "Clients" || entry.Title == "Guest Users" || entry.Title == "More" || entry.Title == "Office Locations") { //Change Status
                    NavMetadata = {
                        __metadata: { 'type': 'SP.Data.NavigationListItem' },
                        Status: true
                    }
                }
                else if (entry.Title == "Approval Template") {
                    NavMetadata = {
                        __metadata: { 'type': 'SP.Data.NavigationListItem' },
                        Status: true,
                        URL: "Pages/ApprovalFormSetup.aspx?RG9jdW1lbnRz"
                    }
                }
                else { //Hide rest of them
                    NavMetadata = {
                        __metadata: { 'type': 'SP.Data.NavigationListItem' },
                        Status: false,
                    }
                }
                updateItemInList(NavMetadata, "Navigation", entry.ID);
            });

            //update GuestPortal templates
            var Query = "?$select=Title,Id,TemplateType&$top=5000&$filter=TemplateType ne 'Template3' ";
            $.when(getItemsWithQuery("ExternalUsers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ExtArray) {
                if (ExtArray.length > 0) {
                    var ExtMetadata = '';
                    ExtArray.forEach(function (entry, index) {
                        ExtMetadata = {
                            __metadata: { 'type': 'SP.Data.ExternalUsersListItem' },
                            TemplateType: 'Template3'
                        }
                        updateItemInList(ExtMetadata, "ExternalUsers", entry.Id);
                    });
                }
                ChangeDMSAdminPortal();
            });
        }
        else {
            alert("Navigation is blank. Kindly contact administrator.");
            return false
        }
    });
}

//change Admin portal for DMS
function ChangeDMSAdminPortal() {
    var Query = "?$select=Title,Active,PageURL,Id&$top=5000";
    $.when(getItemsWithQuery("AdminPortal", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (AdminArray) {
        if (AdminArray.length > 0) {
            AdminArray.forEach(function (entry, index) {
                AdminMetadata = '';
                if (entry.Title == "ManageCompanies" || entry.Title == "ManageOfficeLocations" || entry.Title == "ManageDepartments" || entry.Title == "ManageEmployees" || entry.Title == "Manage Guest Users" || entry.Title == "Categories" || entry.Title == "Licence Manager" || entry.Title == "WebAnalytics") {
                    AdminMetadata = {
                        __metadata: { 'type': 'SP.Data.AdminPortalListItem' },
                        Active: true
                    }
                }
                else if (entry.Title == "Permissions") {
                    AdminMetadata = {
                        __metadata: { 'type': 'SP.Data.AdminPortalListItem' },
                        Active: true,
                        PageURL: "../Pages/ManagePermissionDMS.aspx"
                    }
                }
                else {
                    AdminMetadata = {
                        __metadata: { 'type': 'SP.Data.AdminPortalListItem' },
                        Active: false
                    }
                }
                updateItemInList(AdminMetadata, "AdminPortal", entry.Id);
            });
        }
        alert("Process has been completed");
        location.reload(true);
    });
}


//change Navigation as definition - Enterprise
function ChangeTitanNavigation() {
    var Query = "?$select=Title,ParentId,Status,Postion,Menu,URL,DepartmentID,ID,Company/Id&$top=5000&$expand=Company";
    $.when(getItemsWithQuery("Navigation", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (NavArray) {
        if (NavArray.length > 0) {
            var NavMetadata = '';
            NavArray.forEach(function (entry, index) {
                NavMetadata = '';
                if (entry.Title == "Approval Template") {
                    NavMetadata = {
                        __metadata: { 'type': 'SP.Data.NavigationListItem' },
                        Status: false,
                        URL: "Pages/ApprovalFormSetup.aspx?Qm90aA=="
                    }
                }
                else if (entry.Title == "Clients" || entry.Title == "Guest Users" || entry.Title == "Department") {
                    NavMetadata = {
                        __metadata: { 'type': 'SP.Data.NavigationListItem' },
                        Status: false,
                    }
                }
                else { //Hide rest of them
                    NavMetadata = {
                        __metadata: { 'type': 'SP.Data.NavigationListItem' },
                        Status: true,
                    }
                }
                updateItemInList(NavMetadata, "Navigation", entry.ID);
            });

            //update GuestPortal templates
            var Query = "?$select=Title,Id,TemplateType&$top=5000&$filter=TemplateType ne 'Template3' ";
            $.when(getItemsWithQuery("ExternalUsers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ExtArray) {
                if (ExtArray.length > 0) {
                    var ExtMetadata = '';
                    ExtArray.forEach(function (entry, index) {
                        ExtMetadata = {
                            __metadata: { 'type': 'SP.Data.ExternalUsersListItem' },
                            TemplateType: 'Template1'
                        }
                        updateItemInList(ExtMetadata, "ExternalUsers", entry.Id);
                    });
                }
                ChangeTitanAdminPortal();
            });
        }
        else {
            alert("Navigation is blank. Kindly contact administrator.");
            return false
        }
    });
}

//change Admin portal for Enterprise
function ChangeTitanAdminPortal() {
    var Query = "?$select=Title,Active,PageURL,Id&$top=5000";
    $.when(getItemsWithQuery("AdminPortal", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (AdminArray) {
        if (AdminArray.length > 0) {
            AdminArray.forEach(function (entry, index) {
                AdminMetadata = '';
                if (entry.Title == "Permissions") {
                    AdminMetadata = {
                        __metadata: { 'type': 'SP.Data.AdminPortalListItem' },
                        Active: true,
                        PageURL: "../Pages/ManagePermissions.aspx"
                    }
                }
                else {
                    AdminMetadata = {
                        __metadata: { 'type': 'SP.Data.AdminPortalListItem' },
                        Active: true
                    }
                }
                updateItemInList(AdminMetadata, "AdminPortal", entry.Id);
            });
        }
        alert("Process has been completed");
        location.reload(true);
    });
}


//change the Navigaton for Business process
function ChangeBusProcNavigation() {
    var Query = "?$select=Title,ParentId,Status,Postion,Menu,URL,DepartmentID,ID,Company/Id&$top=5000&$expand=Company";
    $.when(getItemsWithQuery("Navigation", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (NavArray) {
        if (NavArray.length > 0) {
            var NavMetadata = '';
            NavArray.forEach(function (entry, index) {
                NavMetadata = '';
                if (entry.Title == "Org. Chart" || entry.Title == "Employee Directory" || entry.Title == "Admin Portal" || entry.Title == "Approvals" || entry.Title == "More" || entry.Title == "Office Locations") { //Change Status
                    NavMetadata = {
                        __metadata: { 'type': 'SP.Data.NavigationListItem' },
                        Status: true
                    }
                }
                else if (entry.Title == "Approval Template") {
                    NavMetadata = {
                        __metadata: { 'type': 'SP.Data.NavigationListItem' },
                        Status: true,
                        URL: "Pages/ApprovalFormSetup.aspx?UHJvY2Vzcw=="
                    }
                }
                else { //Hide rest of them
                    NavMetadata = {
                        __metadata: { 'type': 'SP.Data.NavigationListItem' },
                        Status: false,
                    }
                }
                updateItemInList(NavMetadata, "Navigation", entry.ID);
            });

            ChangeBusProcAdminPortal();
        }
        else {
            alert("Navigation is blank. Kindly contact administrator.");
            return false
        }
    });
}


//change Admin portal for Business Process
function ChangeBusProcAdminPortal() {
    var Query = "?$select=Title,Active,PageURL,Id&$top=5000";
    $.when(getItemsWithQuery("AdminPortal", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (AdminArray) {
        if (AdminArray.length > 0) {
            AdminArray.forEach(function (entry, index) {
                AdminMetadata = '';
                if (entry.Title == "ManageCompanies" || entry.Title == "ManageOfficeLocations" || entry.Title == "ManageDepartments" || entry.Title == "ManageEmployees" || entry.Title == "Manage Guest Users" || entry.Title == "Categories" || entry.Title == "Licence Manager" || entry.Title == "WebAnalytics") {
                    AdminMetadata = {
                        __metadata: { 'type': 'SP.Data.AdminPortalListItem' },
                        Active: true
                    }
                }
                else if (entry.Title == "Permissions") {
                    AdminMetadata = {
                        __metadata: { 'type': 'SP.Data.AdminPortalListItem' },
                        Active: true,
                        PageURL: "../Pages/ManagePermissionDMS.aspx"
                    }
                }
                else {
                    AdminMetadata = {
                        __metadata: { 'type': 'SP.Data.AdminPortalListItem' },
                        Active: false
                    }
                }
                updateItemInList(AdminMetadata, "AdminPortal", entry.Id);
            });
        }
        alert("Process has been completed");
        location.reload(true);
    });
}

//update data when revoking permission
function updateItemInList(Metadata, ListName, ItemId) {
    var dfd = $.Deferred();
    var oweburl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('" + ListName + "')/Items(" + ItemId + ")";
    $.ajax({
        url: oweburl,
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
        success: function (RESULT) {
            dfd.resolve(true);
        },
        error: function (error) {
            waitingDialog.hide();
            alert(JSON.stringify(err));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//get Items for SP list
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
        success: function (data) {
            dfd.resolve(data.d.results);
        },
        error: function (error) {
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

function declinedLicense() {
    var DataId = $('#txtLicenseId').val();
    var Metadata;
    Metadata = {
        __metadata: { 'type': 'SP.Data.EnvironmentalSettingsListItem' },
        Active: false,
    }
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('EnvironmentalSettings')/Items('" + DataId + "')",
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
        success: function (data) {
            alert('License Declined Successfully');
            dfd.resolve(data);
        },
        error: function (error) {
            alert("Error occured while updating item - " + JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}