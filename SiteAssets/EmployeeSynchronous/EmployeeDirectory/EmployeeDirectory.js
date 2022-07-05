var currentCompanyid = "";
var app = angular.module('myApp', []);
var IsHRAdmin = false;

function GetOfficelocations(companyID) {
    $('#sel1').empty().append('<option  selected="selected" value="">All Location</option>');
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OfficeLocation')/items?$select=ID,OfficeName,CompanyID/ID&$expand=CompanyID&$filter=OfficeLocationId eq '0' and CompanyID/ID eq '" + companyID + "'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                $("#sel1").append($("<option></option>").attr("value", data.d.results[i].ID).text(data.d.results[i].OfficeName));
            }
        }, eror: function (data) {
            console.log('error');
        }
    });
}


function GetDepartment(companyID) {
    $('#selDept').empty();
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Departments')/items?$select=ID,DepartmentName,CompanyID/ID&$expand=CompanyID&$filter= CompanyID/ID eq '" + companyID + "'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            $('#selDept').append('<option  selected="selected" value="">All Department</option>');
            for (var i = 0; i < items.length; i++) {
                $("#selDept").append($("<option></option>").attr("value", data.d.results[i].DepartmentName).text(data.d.results[i].DepartmentName));
            }
        }, eror: function (data) {
            console.log('error');
        }
    });
}


app.controller('myCtrl', function ($scope, $http) {

    $scope.search = {};
    $scope.search.OfficeLocation = {};
    $('#langClickEvent').click(function () {

        // $scope.landDepartment= $('#landDepartment').text();
        //  $scope.langExtension= $('#langExtension').text();
        // $scope.langManager= $('#langManager').text();
        //  $scope.lanlmoreInformation= $('#lanlmoreInformation').text();
        $("[data-localize]").each(function (i, el) {
            try {
                var controlLabelText = $(this).attr('data-localize');
                if (controlLabelText == "Department") {
                    $(this).html($('#landDepartment').text());
                }
                else if (controlLabelText == "Extension") {
                    $(this).html($('#langExtension').text());

                }
                else if (controlLabelText == "Manager") {
                    $(this).html($('#langManager').text());

                }
                else if (controlLabelText == "MoreInformation") {
                    $(this).html($('#lanlmoreInformation').text());

                }

            }
            catch (ex)
            { }
        });

    });

    setInterval(function () { $('#langClickEvent').trigger('click'); }, 3000);

    currentCompanyid = titanForWork.getQueryStringParameter("CompanyId");
    //GetOfficelocations(currentCompanyid);
    $scope.selectedCompanyId = currentCompanyid;
    $scope.mycustomModel = "All";
    $scope.GetEmployees = function () {
        var restQuery = "";
        if ($scope.selectedCompanyId == "0") {
            $('#sel1').hide();
            restQuery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,AttachmentFiles,FullName,Designation,Manager,MobileNumber,ExtensionName,Email,LogonName/UserName,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department,AttachmentFiles&$filter=Status eq 'Active' and PrimaryCompany  eq 'Primary'";
        }
        else {
            $('#sel1').show();
            restQuery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,AttachmentFiles,FullName,Designation,Manager,MobileNumber,ExtensionName,Email,LogonName/UserName,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department,AttachmentFiles&$filter=Status eq 'Active' and Company/ID  eq '" + $scope.selectedCompanyId + "'";
        }

        $http({
            url: restQuery,
            method: "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        }).then(function mySuccess(response) {
            $scope.showData = response.data.d.results;
            $scope.disableNotFoundKeyWord(response.data.d.results);

        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    $scope.MoreInformationDetails = function (itemID) {
        if (IsHRAdmin == true) {
            var departmentLink = "../Pages/EmployeeDetails.aspx?WebAppId=" + currentCompanyid + "&mode=edit&department=&employeedIddetails=" + itemID + "&sourcelocation=../Pages/EmployeeDirectory.aspx?WebAppId=" + currentCompanyid;
        }
        else {
            var departmentLink = "../Pages/EmployeeDetails.aspx?WebAppId=" + currentCompanyid + "&mode=editview&department=&employeedIddetails=" + itemID + "&sourcelocation=../Pages/EmployeeDirectory.aspx?WebAppId=" + currentCompanyid;
        }
        $(location).attr('href', departmentLink);
    }
    $scope.mychangeValue = function () {
        if ($scope.myCheckbox == true) {
            // $("#sel1 option").remove();
            // $scope.GetOfficeLocation ();
            // $scope.GetEmployees();
        }
    }
    $scope.GetOfficeLocation = function () {
        if ($scope.selectedCompanyId != 0) {
            GetDepartment($scope.selectedCompanyId)
            $("#selDept").show();
        }
        else {
            $("#selDept").hide();
        }
        $scope.search.OfficeLocation.ID = "";
        $http({
            //url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('OfficeLocation')/items?$select=ID,OfficeName",
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OfficeLocation')/items?$select=ID,OfficeName,CompanyID/ID&$expand=CompanyID&$filter=OfficeLocationId eq '0' and CompanyID/ID eq '" + $scope.selectedCompanyId + "'",
            method: "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        }).then(function mySuccess(response) {
            var officeLocationLIst = new Array();
            var item1 = {};
            item1.ID = "";
            item1.OfficeName = "All Location";
            officeLocationLIst.push(item1);


            for (var s = 0; s < response.data.d.results.length; s++) {
                var item = {};
                item.ID = response.data.d.results[s].ID.toString();
                item.OfficeName = response.data.d.results[s].OfficeName;
                officeLocationLIst.push(item);
            }

            $scope.showOffice = officeLocationLIst;
            $scope.GetEmployees();

        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    $scope.GetCompaniesList = function () {
        $http({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Companies')/items?$select=ID,CompanyName",
            method: "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        }).then(function mySuccess(response) {
            var companiesListArray = new Array();
            var item1 = {};
            item1.ID = "0";
            item1.CompanyName = "All Comapnies";
            companiesListArray.push(item1);
            for (var s = 0; s < response.data.d.results.length; s++) {
                var item = {};
                item.ID = response.data.d.results[s].ID.toString();
                item.CompanyName = response.data.d.results[s].CompanyName;
                companiesListArray.push(item);
            }
            $scope.companiesListArray = companiesListArray;

        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    $scope.startsWith = function (actual, expected) {
        $("#selDept").val("");
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    }
    $scope.officeName = function (actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    }


    $scope.GetAttachment = function (attachmentcollection, Email) {
        var attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Email)//"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
        if (attachmentcollection.results.length > 0) {
            attachmentUrl = attachmentcollection.results[0].ServerRelativeUrl
        }
        return attachmentUrl;
    }
    $scope.disableNotFoundKeyWord = function (dataresult) {
        var arrayitems = new Array();
        for (var i = 0; i < dataresult.length; i++) {
            var tempName = dataresult[i].FullName;
            if (tempName != "" && tempName != null) {
                var x = dataresult[i].FullName.toUpperCase();
                if (arrayitems.indexOf(x.charAt(0)) == -1) {
                    arrayitems.push(x.charAt(0));
                }
            }
        }
        var wkeyords = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (var j = 0; j < wkeyords.length; j++) {
            if (arrayitems.indexOf(wkeyords[j]) == -1) {
                $('.hideItem' + wkeyords[j]).hide();
            }
            else {
                $('.hideItem' + wkeyords[j]).show();
            }
        }
    }




    $scope.IsCurrentUserInEinv = function () {

        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getByName('Employee_info_not_visible')/Users?$filter=Id eq " + _spPageContextInfo.userId,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                var title = data.d.results.length;

                if (data.d.results.length == 0) {
                    //  alert("User not in group : Employee_info_not_visible"); 
                    //  $("#emailcheck").show();
                    debugger;
                    $scope.emailcheck = true;

                } else {
                    // alert("User in group : Employee_info_not_visible");
                    //  $("#emailcheck").hide("fast");             

                }
            },
            error: function (err) {
                console.log("Error while checking user in Owner's group");
            }
        });
    }



});

$("#selDept").change(function () {
    var g = $(this).val()
    $(".my_recognation .tile_box .my_rec_content .my_rec_dept").each(function () {
        var s = $(this).text();
        if (s.indexOf(g) != -1) {
            $(this).parent().parent().parent().parent().show();
        }
        else {
            $(this).parent().parent().parent().parent().hide();
        }
    });
});

setTimeout(function () { $('#selDept').prepend('<option  selected="selected" value="">All Department</option>'); }, 3000);



//////////////////////////////////
var token;
var ClientId = '';
var ClentSecret = '';
var ClientUrl = '';


function requestToken() {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": ClientUrl, // Pass your tenant name instead of sharepointtechie  
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "grant_type": "client_credentials",
            "client_id ": ClientId, //Provide your app id  
            "client_secret": ClentSecret, //Provide your secret  
            "scope ": "https://graph.microsoft.com/.default"
        },
        success: function (response) {
            console.log(response);
            token = response.access_token;

            getEmployee();

            //     console.log(token);
            //     RetrieveCalendarEvents();
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    })
}

function getEmployee() {
    $("#divemployee").html("");

    var employeehtml = "";

    $.ajax({
        method: 'GET',
        url: "https://graph.microsoft.com/v1.0/users",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },

        success: function (response) {


            if (response != null) {
                for (var i = 0; i < response.value.length; i++) {

                    employeehtml = employeehtml + "Name:" + response.value[i].displayName + "<br>";

                }

                $("#divemployee").html(employeehtml);
            }


        },
        error: function (error) {
            alert("error1" + JSON.stringify(error));
        },
    });

}

function ClientCredentials() {
    var Listname = "EnvironmentalSettings";
    var currentCompanyid = titanForWork.getQueryStringParameter("CompanyId");
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + Listname + "')/items?$filter=Title eq 'Client_Credentials' ";
    $.ajax({
        url: siteurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            ClientId = items[0].ClientName;
            ClentSecret = items[0].ChangeFileName;
            ClientUrl = items[0].Description;
        },
        error: function (data) {
            console.log(data);
        }
    });
}

// to check if user is HR admin or not
function checkHR_Admin() {
    var Query = "?$select=Id,WebPartName,Contributors/EMail&$expand=Contributors&$top=5000&$filter=WebPartName eq 'HR Admin' and Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(CommonFunction.getItemsWithQueryItem('ProcessApprovers', Query)).done(function (UserResults) {
        UResults = UserResults.results;
        if (UResults.length > 0) {
            IsHRAdmin = true;
        }
    });
}


$(document).ready(function () {
    //ClientCredentials();

    //requestToken();
    checkHR_Admin();
});
