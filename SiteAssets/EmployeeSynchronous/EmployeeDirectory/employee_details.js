var currentCompanyid = "";
var employeedIddetails = "";
var modeofrequest = "";
var departmentID = "";
var sourcelocation = "";
var newUserEmailIdGlobalVariable = "";
var _UserfullName = '';
var oldDateOfJoin = '';
var olddeptname = "";
var DepartnemtUrl = "";
var currentDlg = "";
///Validation//////////////////
var specialKeys = new Array();
specialKeys.push(8); //Backspace
/*function IsNumeric(e) {
    var keyCode = e.which ? e.which : e.keyCode
    var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
    if (ret == false) {
        alert('Only numbers allowed.');
    }
    //   document.getElementById("error").style.display = ret ? "none" : "inline";
    return ret;
}*/
$('.Number').keyup(function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

function validateEmail(emailField) {
    if (emailField != "") {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(emailField) == false) {
            $("#inputEmail").val("");
            alert('Invalid Email Address');
            $("#inputEmail").focus();
            return false;
        }
        return true;
    }
}


function GetLicencedUsersCount(newUserName) {
    debugger;
    var licencedCount = 0;
    var restQuery = "?$top=5000&$expand=LogonName&$select=ID,FullName,LogonName/UserName&$filter=Status eq 'Active' and PrimaryCompany eq 'Primary'";
    var methodURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items" + restQuery;
    $.ajax({
        url: methodURL,
        data: {
            format: 'json'
        },
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            licencedCount = data.value.length;
        }
    });
    return licencedCount;
}
//////////Validation end here/////////////

/*function GetLicencedUsersCount(newUserName) {
    var cont = true;
    var licencedCount = 0;
    var restQuery = "?$top=5000&$expand=LogonName&$select=ID,FullName,LogonName/UserName&$filter=Status eq 'Active'";
    var methodURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items" + restQuery;
    $.ajax({
        url: methodURL,
        data: {
            format: 'json'
        },
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            var items = data;
            var licencedemployeeList = [];
            var newUserFlag = 0;

            for (var i = 0; i < items.value.length; i++) {
                var empName = items.value[i].FullName;
                if (items.value[i].LogonName != null) {
                    var userLoginName = items.value[i].LogonName.UserName;
                    if (userLoginName != null) {
                        if (userLoginName.toLowerCase() == newUserName.toLowerCase()) {
                            newUserFlag = 1;
                        }
                        else {
                            if (licencedemployeeList.indexOf(userLoginName.toLowerCase()) == -1) {
                                licencedemployeeList.push(userLoginName.toLowerCase());
                            }
                        }
                    }

                    else {
                        cont = false;
                        alert("Employee " + empName + " Logon Name is not define Properly");
                        return false;
                    }
                }

                else {
                    cont = false;
                    alert("Employee " + empName + " Logon Name is not define");
                    return false;
                }

            }


            if (newUserFlag == 1) {
                licencedCount = 0;
            }
            else {
                licencedCount = licencedemployeeList.length;
            }

        }
    });
    if (cont === false) {
        return false;
    }
    else {
        return licencedCount;
    }
}*/


var app = angular.module('myApp', []);

function updateItemWithID(ListName, Metadata, ID) {

    var dfd = $.Deferred();

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + ID + "')",
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(Metadata),
        async: false,
        success: function (RESULT) {
            // console.log();
            dfd.resolve(true);

        },
        error: function (error) {

            alert(JSON.stringify(error));
            dfd.reject(error);

        }
    });
    return dfd.promise();
}
function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}
function GetDateStandardFormat(date) {
    var newDate = "";
    if (date != null && date != "") {
        var dateS = ConvertDateFormatToddMMyyyy(date);
        var startDate = new Date(dateS);
        // seconds * minutes * hours * milliseconds = 1 day
        var day = 60 * 60 * 24 * 1000;
        //var endDate = new Date(startDate.getTime() + day);
        var endDate = new Date(startDate.getTime());
        newDate = endDate.toISOString();
    }
    return newDate;
}
function ConvertDateFormatToddMMyyyy(date) {
    var formatedDate = stringToDate(date, 'dd/MM/yyyy', "/")
    // var year = formatedDate.getFullYear();
    // var month = (1 + formatedDate.getMonth()).toString();
    // month = month.length > 1 ? month : '0' + month;
    // var day = formatedDate.getDate().toString();
    // day = day.length > 1 ? day : '0' + day;
    return formatedDate;
}
function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}
function SetFormatedDateToDDMMYYYY(dateValue) {
    var valueDate = "";
    if (dateValue != "" && dateValue != null) {
        var ReleseDate = new Date(dateValue);
        valueDate = $.datepicker.formatDate('dd/mm/yy', ReleseDate);
    }
    return valueDate;
}
// Query the picker for user information.
function getUserInfo(pickerPickerControlId) {
    var pickerDiv = $("[id^='" + pickerPickerControlId + "']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];

    var users = peoplePicker.GetAllUserInfo();
    var returnValue = "";
    if (users.length > 0) {
        returnValue = users[0].Key
    }
    // Get the first user's ID by using the login name.
    return returnValue;        // return username
}

function SetPeoplePicker_Multiselect(peoplePickerElementId, allowMultiple) {
    if (allowMultiple == null) {
        allowMultiple = false;
    }
    var schema = {};
    //schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['PrincipalAccountType'] = 'User';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = allowMultiple;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '';
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

function PeoplePickerChangeEvent() {
    this.SPClientPeoplePicker.SPClientPeoplePickerDict.newEmployeePicker_TopSpan.OnValueChangedClientScript = function (peoplePickerId, selectedUsersInfo) {
        if (selectedUsersInfo.length > 0) {
            console.log(selectedUsersInfo[0].EntityData.Email);
            newUserEmailIdGlobalVariable = selectedUsersInfo[0].EntityData.Email;
        }
        else {
            newUserEmailIdGlobalVariable = "";
        }
        $('#txtNewUseremail').val(newUserEmailIdGlobalVariable);

    };

}


app.directive('datepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(function () {
                element.datepicker({
                    dateFormat: 'dd/mm/yy',
                    onSelect: function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});
app.controller('myCtrl', function ($scope, $http, $window) {
    currentCompanyid = titanForWork.getQueryStringParameter("CompanyId");
    departmentID = titanForWork.getQueryStringParameter("department");
    employeedIddetails = titanForWork.getQueryStringParameter("employeedIddetails");
    modeofrequest = titanForWork.getQueryStringParameter("mode");
    sourcelocation = titanForWork.getQueryStringParameter("sourcelocation");
    $scope.currentitemId = employeedIddetails;
    $scope.mode = modeofrequest;
    $scope.teamporaryImageUrl = "";
    $scope.imageUrl = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
    $scope.company = currentCompanyid;
    $scope.gender = "---Select---";
    if (departmentID != "" && departmentID != null) {
        try {
            $scope.department = parseInt(departmentID);
        }
        catch (e) {

        }
    }
    SetPeoplePicker_Multiselect("newEmployeePicker", false);

    SetPeoplePicker_Multiselect("managerLoginName", false);


    setTimeout(function () { PeoplePickerChangeEvent() }, 3000);
    if ($scope.mode == "edit" || $scope.mode == "add") {
        CheckUserPermissionToShowButton();
        $("#managerLoginName").show();
        $("#managerFullName").hide();
        $("#ChiefExecute").show();



    }

    if ($scope.mode == "editview") {
        $scope.editViewDisable = "all";
        $scope.allcontrols = "all";

        $("#managerLoginName").hide();
        $("#managerFullName").show();
        $("#ChiefExecute").hide();

    }
    else {
        $scope.editViewDisable = "No";
    }

    $scope.PageLod = function () {
        if ($scope.mode == "editview") {
            $scope.getCurrentUserREST();
        }
        $scope.status = "Active";
        $scope.GetCompany();
        $scope.GetOfficeLocation($scope.company);
        //  $scope.GetManagerList(currentCompanyid);
        $.when($scope.GetEmployees()).done(function (MainExamListItemTemp) {
            $scope.GetDepartment($scope.company);
        });
    }
    $scope.getCurrentUserREST = function () {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/currentUser",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                $scope.CurrentUSerIDForCheck = data.d.Id; //Assigning UserId Variable  
                ///alert("Current User Id= " + UserId);  
            },
            error: function (data) { }
        });
    }
    $scope.RedirectPage = function (urllink) {
        var departmentLink = "";
        if (departmentID != null && departmentID != "") {

            departmentLink = "&DepartmentId=" + departmentID;
        }
        var url = urllink + "?WebAppId=" + $scope.company + departmentLink;
        $(location).attr('href', url);
    }
    $scope.clickTerminateButton = function () {
        var urllinkk = "../Pages/employee_termination.aspx";
        var departmentLink = "";
        if (departmentID != null && departmentID != "") {
            departmentLink = "&DepartmentId=" + departmentID;
        }
        var url = urllinkk + "?WebAppId=" + $scope.company + "&employeedIddetails=" + $scope.currentitemId + departmentLink + "&sourcelocation=../Pages/Show_Employee.aspx";
        $(location).attr('href', url);
    }
    $scope.redirectCancel = function () {
        $scope.RedirectPage(sourcelocation);
    }
    $scope.modePopup = function () {
        $("#modalTitanPreview").modal('show');

    }
    $scope.clearFileControl = function () {
        var control = $("#uploadFile");
        control.replaceWith(control = control.clone(true));
    }
    $scope.ValidFiles = function (fileName) {
        var fileName_flag = true;
        var ext = fileName.split('.').pop().toLowerCase();
        if ($.inArray(ext, ['jpeg', 'jpg', 'png']) != -1) {
            fileName_flag = true
        }
        else {
            fileName_flag = false;
        }
        return fileName_flag
    }
    /*
    $scope.GetManagerList = function (companyID) {

        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ID,FullName,LogonName/UserName,Email&$expand=LogonName&$top=5000&$orderby= FullName asc&$filter=CompanyId  eq '" + companyID + "' and Status eq 'Active'";
        $http({
            url: Ownurl,
            method: "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        }).then(function mySuccess(response) {
            var managerListsItems = new Array();
            var managerValue1 = {};
            managerValue1.value = 0;
            managerValue1.label = "---Select---";
            managerListsItems.push(managerValue1);
            
            var managerValue2 = {};
            managerValue2.value = -1;
            managerValue2.label = "Top Leader";
            managerListsItems.push(managerValue2);
            
            
            for (var i = 0; i < response.data.d.results.length; i++) 
            {
                var managerValue = {};
                managerValue.value = response.data.d.results[i].ID;
                managerValue.label = response.data.d.results[i].FullName;
                managerListsItems.push(managerValue);
            }
            $scope.showManagerList = managerListsItems;
            $scope.hostSelectedManager = managerListsItems[0];
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }*/
    $scope.checkFileExists = function () {
        if ($scope.teamporaryImageUrl.length > 0) {

            var txtfilename = $('#uploadFile').val().replace(/.*(\/|\\)/, '');
            if ($scope.ValidFiles(txtfilename) == true) {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/getFileByServerRelativeUrl('" + $scope.teamporaryImageUrl + "')",//sitecollectionurl/Lists/Employees/Attachments/"+$scope.urlNo+"/"+$scope.fileNameIs+"')",
                    method: "GET",
                    headers: { "Accept": "application/json; odata=verbose" },
                    success: function (data) {
                        if (data.d.Exists) {
                            //delete file if it already exists
                            $scope.DeleteFile();
                        }
                    },
                    error: function (data) {
                        //check if file not found error
                        $scope.AddAttachments($('#uploadFile'));
                    }
                });
            }
            else {
                alert('Picture is not in valid format.');
            }
        }
        else {
            $scope.AddAttachments($('#uploadFile'));
        }
    }
    $scope.DeleteFile = function () {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/getFileByServerRelativeUrl('" + $scope.teamporaryImageUrl + "')",//sitecollectionurl/Lists/Employees/Attachments/"+$scope.urlNo+"/"+$scope.fileNameIs+"')",
            method: 'DELETE',
            headers: {
                'X-RequestDigest': document.getElementById("__REQUESTDIGEST").value
            },
            success: function (data) {
                $scope.AddAttachments($('#uploadFile'));
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
    $scope.AddFileAttachmmentOnNewEmployeeAddtion = function () {
        $scope.AddAttachments($('#uploadFile1'));
    }
    $scope.AddAttachments = function (fileControl, formAction) {
        var digest = "";
        $.ajax(
		{
		    url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
		    method: "POST",
		    headers: {
		        "ACCEPT": "application/json;odata=verbose",
		        "content-type": "application/json;odata=verbose"
		    },
		    success: function (data) {
		        digest = data.d.GetContextWebInformation.FormDigestValue;
		    },
		    error: function (data) {

		    }
		}).done(function () {
		    var fileInput = fileControl;// $('#uploadFile');
		    var fileName = fileInput[0].files[0].name;
		    fileName = fileInput[0].files[0].name.replace(/[^a-zA-Z0-9-. ]/g, "");    //Remove Special Char
		    fileName = fileName.replace(/\s/g, "");                                    //Remove space

		    var reader = new FileReader();
		    reader.onload = function (e) {
		        var fileData = e.target.result;
		        var res11 = $.ajax(
                {
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items('" + $scope.currentitemId + "')/AttachmentFiles/ add(FileName='" + fileName + "')",
                    method: "POST",
                    binaryStringRequestBody: true,
                    data: fileData,
                    processData: false,
                    headers: {
                        "ACCEPT": "application/json;odata=verbose",
                        "X-RequestDigest": digest
                        //,
                        //"content-length": fileData.byteLength
                    },
                    success: function (data) {
                        if ($scope.mode == "add") {
                            alert("Employee is added successfully .");
                            $scope.RedirectPage(sourcelocation);
                        }
                        else {
                            $scope.clearFileControl();
                            $scope.GetEmployees();
                            alert('Picture is updated successfully.');
                            $("#modalTitanPreview").modal('hide');
                            $("#uploadFile").val(null);
                        }
                    },
                    error: function (data) {
                        alert("Error occured." + data.responseText);
                    }
                });
		    };
		    reader.readAsArrayBuffer(fileInput[0].files[0]);

		});
    }
    $scope.GetEmployees = function () {
        $http({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employees')/items?$select=ID,Email,LinkedIn_Account,LogonNameId,DateofTermination,Gender,EmployeeID,GroupName,HomeAddress,HomePhone,JoiningDate,PostalAddresses,OtherEMailAddress,StateProvince,Status,ZIPPostalCode,Country,DateOfAnniversary,DateOfBirth,City,AttachmentFiles,FullName,Designation,Manager,MobileNumber,ExtensionName,LogonName/UserName,ManagerLoginName/UserName,Department/ID,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,ManagerLoginName,OfficeLocation,Company,Department,AttachmentFiles&$top=5000&$filter=ID  eq '" + $scope.currentitemId + "'",
            method: "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        }).then(function mySuccess(response) {
            $scope.company = parseInt(currentCompanyid);
            if (response.data.d.results.length > 0) {
                $scope.showData = response.data.d.results[0];
                oldDateOfJoin = response.data.d.results[0].JoiningDate;
                olddeptname = response.data.d.results[0].Department.ID;

                var MangerLoginName = response.data.d.results[0].ManagerLoginName.UserName;
                if (MangerLoginName != null && MangerLoginName != "") {
                    SetAndResolvePeoplePicker("managerLoginName", MangerLoginName);
                }
                $scope.SetEmployeeDetails(response.data.d.results[0]);
                $scope.GetDepartment($scope.company);

            }

        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    $scope.GetCompany = function () {
        $http({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Companies')/items?$select=ID,CompanyName",
            method: "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        }).then(function mySuccess(response) {
            $scope.showCompany = response.data.d.results;
            $scope.company = currentCompanyid;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    $scope.onCompanyChange = function () {
        $scope.GetDepartment($scope.company);
        $scope.GetOfficeLocation($scope.company)
    }
    $scope.GetDepartment = function (companyChangedId) {
        if (companyChangedId == "" || companyChangedId == null) {

            companyChangedId = currentCompanyid;
        }
        $http({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Departments')/items?$select=ID,DepartmentName,CompanyIDId&$filter=CompanyIDId eq '" + companyChangedId + "'",
            method: "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        }).then(function mySuccess(response) {
            $scope.showDepartment = response.data.d.results;

        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    $scope.GetOfficeLocation = function (officeLocationID) {
        $http({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OfficeLocation')/items?$select=ID,OfficeName,CompanyID/ID&$expand=CompanyID&$top=5000&$filter=OfficeLocationId eq '0' and CompanyID/ID eq '" + officeLocationID + "'",
            method: "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        }).then(function mySuccess(response) {


            var managerListsItemss = new Array();
            var office1 = {};
            office1.ID = 0;
            office1.OfficeName = "---Select---";
            managerListsItemss.push(office1);

            for (var i = 0; i < response.data.d.results.length; i++) {
                var office = {};
                office.ID = response.data.d.results[i].ID;
                office.OfficeName = response.data.d.results[i].OfficeName;
                managerListsItemss.push(office);
            }
            $scope.showOffice = managerListsItemss;//response.data.d.results;
            $scope.officeLocation = 0;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
    $scope.SetEmployeeDetails = function (employeeInformation) {
        $scope.curreLogonLookkpuID = employeeInformation.LogonNameId;
        $scope.currentitemId = employeeInformation.ID;
        $scope.employeeName = employeeInformation.FullName;
        $scope.imageUrl = $scope.GetAttachment(employeeInformation.AttachmentFiles);
        $scope.designation = employeeInformation.Designation;
        $scope.groupName = employeeInformation.GroupName;

        $scope.manager = employeeInformation.Manager;
        if (employeeInformation.Manager == "Chief Executive") {
            $("#chiefexecutive").prop('checked', true);

        }

        $scope.mobileNo = employeeInformation.MobileNumber;
        $scope.extension = employeeInformation.ExtensionName;
        $scope.email = employeeInformation.Email;
        $scope.dateofBirth = SetFormatedDateToDDMMYYYY(employeeInformation.DateOfBirth);
        $scope.dateofAnniversary = SetFormatedDateToDDMMYYYY(employeeInformation.DateOfAnniversary);
        $scope.gender = employeeInformation.Gender;
        $scope.employeeCode = employeeInformation.EmployeeID;
        $scope.company = employeeInformation.Company.ID;
        $scope.department = employeeInformation.Department.ID;
        $scope.officeLocation = employeeInformation.OfficeLocation.ID;
        $scope.status = employeeInformation.Status;
        $scope.dateofJoining = SetFormatedDateToDDMMYYYY(employeeInformation.JoiningDate);
        $scope.dateofTermination = SetFormatedDateToDDMMYYYY(employeeInformation.DateofTermination);
        $scope.currentAddress = employeeInformation.PostalAddresses;
        if (employeeInformation.LinkedIn_Account != null) {
            $scope.LinkedlnAccount = employeeInformation.LinkedIn_Account.Url;
            if ($scope.mode == "editview") {
                $("#linkedAccunt").attr("href", employeeInformation.LinkedIn_Account.Url);
                $('#Linkedln').css('cursor', 'pointer');
            }
        }
        $scope.city = employeeInformation.City;
        $scope.state = employeeInformation.StateProvince;
        $scope.zip = employeeInformation.ZIPPostalCode;
        $scope.country = employeeInformation.Country;
        $scope.homePhone = employeeInformation.HomePhone;
        $scope.otherEmail = employeeInformation.OtherEMailAddress;
        $scope.parmanentAddress = employeeInformation.HomeAddress;
        if ($scope.mode == "editview") {
            if ($scope.CurrentUSerIDForCheck == employeeInformation.LogonNameId) {
                $scope.editViewDisable = "currentUser";
            }
        }
        $scope.terminatestatus = employeeInformation.Status;
    }

    $scope.updateInformation = function (ListName, MangerLoginId, ManagerItemid) {

        try {

            if ($('#chiefexecutive').is(':checked') == true) {
                ManagerItemid = -1;
                $scope.ManagerFullName = "Chief Executive";
                MangerLoginId = null;
            }

            var Metadata;
            var ItemType = GetItemTypeForListName(ListName);

            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                FullName: $scope.employeeName,
                Title: $scope.employeeName,
                Designation: $scope.designation,
                GroupName: $scope.groupName,
                ParentId: ManagerItemid,
                Manager: $scope.ManagerFullName,
                ManagerLoginNameId: MangerLoginId,
                MobileNumber: $scope.mobileNo,
                ExtensionName: $scope.extension,
                Email: $scope.email,
                DateOfBirth: GetDateStandardFormat($scope.dateofBirth),
                DateOfAnniversary: GetDateStandardFormat($scope.dateofAnniversary),
                Gender: $scope.gender,
                EmployeeID: $scope.employeeCode,
                CompanyId: $scope.company,
                DepartmentId: $scope.department,
                OfficeLocationId: $scope.officeLocation,
                Status: $scope.status,
                JoiningDate: GetDateStandardFormat($scope.dateofJoining),
                DateofTermination: GetDateStandardFormat($scope.dateofTermination),
                PostalAddresses: $scope.currentAddress,
                City: $scope.city,
                StateProvince: $scope.state,
                ZIPPostalCode: $scope.zip,
                Country: $scope.country,
                HomePhone: $scope.homePhone,
                OtherEMailAddress: $scope.otherEmail,
                HomeAddress: $scope.parmanentAddress
            };

            Metadata["LinkedIn_Account"] = {
                '__metadata': { 'type': 'SP.FieldUrlValue' },
                'Description': $scope.LinkedlnAccount,
                'Url': $scope.LinkedlnAccount
            }

            if ($scope.employeeName == null || $scope.employeeName == "") {
                delete Metadata["FullName"];
            }

            if (ManagerItemid == null || ManagerItemid == "") {
                delete Metadata["ParentId"];
            }
            /*   if (MangerLoginId == null || MangerLoginId == "") {
                  delete Metadata["ManagerLoginNameId"];
              }*/
            if ($scope.ManagerFullName == null || $scope.ManagerFullName == "") {
                delete Metadata["Manager"];
            }


            if ($scope.designation == null || $scope.designation == "") {
                delete Metadata["Designation"];
            }


            if ($scope.groupName == null || $scope.groupName == "") {
                delete Metadata["GroupName"];
            }

            if ($scope.dateofBirth == null || $scope.dateofBirth == "") {
                delete Metadata["DateOfBirth"];
            }
            if ($scope.dateofAnniversary == null || $scope.dateofAnniversary == "") {
                delete Metadata["DateOfAnniversary"];
            }
            if ($scope.gender == null || $scope.gender == "") {
                delete Metadata["Gender"];
            }
            if ($scope.employeeCode == null || $scope.employeeCode == "") {
                delete Metadata["EmployeeID"];
            }
            if ($scope.company == null || $scope.company == "" || $scope.company == "0") {
                delete Metadata["CompanyId"];
            }
            if ($scope.department == null || $scope.department == "" || $scope.department == "0") {
                delete Metadata["DepartmentId"];
            }
            if ($scope.officeLocation == null || $scope.officeLocation == "" || $scope.officeLocation == "0") {
                delete Metadata["OfficeLocationId"];
            }
            if ($scope.dateofJoining == null || $scope.dateofJoining == "") {
                delete Metadata["JoiningDate"];
            }
            if ($scope.dateofTermination == null || $scope.dateofTermination == "") {
                delete Metadata["DateofTermination"];
            }

            $.when(updateItemWithID(ListName, Metadata, $scope.currentitemId)).done(function (MainExamListItemTemp) {
                if ($scope.mode == "edit") {
                    if ($scope.department != olddeptname) {
                        BreakInheritePermissionDMSLibrary($scope.curreLogonLookkpuID, "1073741826", "Add");
                    }
                    var restQueryPersonalDMS = "?$select=ID,EmployeeName,EmployeeID,Publish_Date,Company/CompanyName&$expand=Company&$top=1&$orderby=Created desc&$filter=WebPartName eq 'Welcome'and Announcement_Type eq 'Welcome' and EmployeeID eq '" + $scope.currentitemId + "'";
                    $.when(getItemsWithQuery("Announcements", restQueryPersonalDMS)).done(function (AnnouncementData) {
                        if (AnnouncementData.length > 0) {

                            var dateofjoin = oldDateOfJoin;

                            var dateofjoin = new Date(dateofjoin);
                            dateofjoin.setDate(dateofjoin.getDate());
                            //var todayDate = todaydate.getDate() +'/'+ ((todaydate.getMonth() + 1) < 10 ? '0' : '') + (todaydate.getMonth() + 1) +'/'+ todaydate.getFullYear();
                            var dateofjoin = ((dateofjoin.getDate()) < 10 ? '0' : '') + (dateofjoin.getDate()) + '/' + ((dateofjoin.getMonth() + 1) < 10 ? '0' : '') + (dateofjoin.getMonth() + 1) + '/' + dateofjoin.getFullYear();



                            var newdateofjoin = $("#dateofJoining").val();
                            if (GetDateStandardFormat(dateofjoin) != GetDateStandardFormat(newdateofjoin)) {

                                var currentitemid = AnnouncementData[0].ID;
                                var ListName = "Announcements";

                                var today = new Date();
                                today = $.datepicker.formatDate('mm/dd/yy', today);

                                var expiredate = new Date();
                                expiredate.setMonth(expiredate.getMonth() + 3);
                                expiredate = $.datepicker.formatDate('mm/dd/yy', expiredate);

                                var doj = ConvertddmmyyTommddyy($("#dateofJoining").val());
                                doj = new Date(doj);
                                doj = $.datepicker.formatDate('dd M yy', doj);


                                var Metadata;
                                var itemType = GetItemTypeForListName(ListName);

                                Metadata = {
                                    __metadata: {
                                        'type': itemType
                                    },


                                    Designation: $("#designation").val(),
                                    Department: $("#department option:selected").text(),
                                    OfficeLocation: $("#officeLocation option:selected").text(),
                                    Publish_Date: today,
                                    Expires: expiredate,
                                    Description: "DOJ: " + doj

                                };
                                $.when(updateItemWithID("Announcements", Metadata, currentitemid)).done(function (MainExamList) {
                                    $scope.ShowAlert('1');
                                    $scope.RedirectPage(sourcelocation);

                                });
                            }
                            else {
                                $scope.ShowAlert('1');
                                $scope.RedirectPage(sourcelocation);

                            }

                        }
                        else {
                            var dateofjoin = $("#dateofJoining").val();

                            var todaydate = new Date();
                            todaydate.setDate(todaydate.getDate());
                            //var todayDate = todaydate.getDate() +'/'+ ((todaydate.getMonth() + 1) < 10 ? '0' : '') + (todaydate.getMonth() + 1) +'/'+ todaydate.getFullYear();
                            var todayDate = ((todaydate.getDate()) < 10 ? '0' : '') + (todaydate.getDate()) + '/' + ((todaydate.getMonth() + 1) < 10 ? '0' : '') + (todaydate.getMonth() + 1) + '/' + todaydate.getFullYear();
                            //var todayDate = ((todaydate.getMonth() + 1) < 10 ? '0' : '') + (todaydate.getMonth() + 1) +'/'+ ((todaydate.getDate()) < 10 ? '0' : '') + (todaydate.getDate()) +'/'+ todaydate.getFullYear();


                            console.log(todayDate);

                            var pastdate = new Date(); // get today date
                            pastdate.setDate(pastdate.getDate() - 7); // sub 7 days
                            var finalDate = ((pastdate.getDate()) < 10 ? '0' : '') + (pastdate.getDate()) + '/' + ((pastdate.getMonth() + 1) < 10 ? '0' : '') + (pastdate.getMonth() + 1) + '/' + pastdate.getFullYear();
                            //var finalDate = ((pastdate.getMonth() + 1) < 10 ? '0' : '') + (pastdate.getMonth() + 1) +'/'+ ((pastdate.getDate()) < 10 ? '0' : '') + (pastdate.getDate()) +'/'+ pastdate.getFullYear();




                            console.log(finalDate);
                            //if(dateofjoin <= todayDate && dateofjoin >= finalDate)
                            if (GetDateStandardFormat(dateofjoin) <= GetDateStandardFormat(todayDate) && GetDateStandardFormat(dateofjoin) >= GetDateStandardFormat(finalDate)) {
                                _UserfullName = $scope.employeeName;
                                $.when(InsertWelcomeInAnnouncementList($scope.currentitemId)).done(function (MainExamList) {

                                    $scope.ShowAlert('1');
                                    $scope.RedirectPage(sourcelocation);

                                });
                            }
                            else {
                                $scope.ShowAlert('1');
                                $scope.RedirectPage(sourcelocation);
                            }

                        }

                    });
                }
                else {
                    $scope.ShowAlert('1');
                    $scope.RedirectPage(sourcelocation);
                }

            });

        }
        catch (error) {
            console.log(error.message);
        }
    }


    $scope.GetGroupIDByGroupName = function (loginnameWithDomain) {
        var groupID = "";
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getbyname('Contributors')?$select=id";
        $.ajax({
            url: url,
            method: "GET",
            async: false,
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {

                groupID = data.d.Id;
                $scope.AddUserinSharePointGroup(groupID, loginnameWithDomain)
            },
            error: function (data) {
                console.log(data);

            }
        });
        return groupID;
    }

    $scope.AddUserinSharePointGroup = function (groupId, loginnameWithDomain) {

        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups(" + groupId + ")/users";
        $.ajax({
            url: requestUri,
            type: "POST",
            async: false,
            data: JSON.stringify({ '__metadata': { 'type': 'SP.User' }, 'LoginName': loginnameWithDomain }),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: onSuccess,
            error: onError
        });
        function onSuccess(data) {
            console.log('User Added');
        }
        function onError(error) {
            console.log(JSON.stringify(error));
        }

    }

    $scope.addNewEmployeeLoder = function () {

        //waitingDialog.show();
        var dlgTitle = 'Adding...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        setTimeout(function () {
            $scope.AddNewEmployeeDetails();
        }, 1000);


    }


    $scope.AddNewEmployeeDetails = function () {
        var logonName = getUserInfo('newEmployeePicker');
        var ManagerLoginName = getUserInfo('managerLoginName');
        if (logonName != "") {
            $scope.GetGroupIDByGroupName(logonName);
            var userId = $scope.GetUserId(logonName);

            if ($('#chiefexecutive').is(':checked') != true) {
                if (ManagerLoginName != "") {
                    var MangerLoginId = GetUserIdForManager(ManagerLoginName);
                    var ManagerItemid = IsMangerActive(MangerLoginId);
                    if (!ManagerItemid) {
                        alert("Employee is not active ");
                        ManagerItemid = "";
                        currentDlg.close();
                        //waitingDialog.hide();
                        return false;
                    }
                }
                else {
                    alert("Please fill ManagerName");
                    currentDlg.close();
                    //waitingDialog.hide();
                    return false;
                }
            }

            if (userId == null || userId == "" || $scope.email == "" || $scope.email == null ||
                $scope.company == "" || $scope.company == null || $scope.department == "" || $scope.department == null || $scope.officeLocation == 0 || $scope.officeLocation == null || $scope.dateofJoining == "" || $scope.dateofJoining == null) {
                alert("Please fill all require fields.\nCompany\nDepartment\nOffice Location\nDate of Joining\nName\nEmail.");
                currentDlg.close();
                //waitingDialog.hide();
            }
            else {
                ///User liceneced Section/////////////////////
                var newUserValidation = logonName.split('|')[2];
                var consumedusersLicenced = GetLicencedUsersCount(newUserValidation);
                /*if (consumedusersLicenced === false) {
                    waitingDialog.hide();
                    return false;

                }*/
                var usersLicenced = UsersLicenceRequired;
                if (usersLicenced < consumedusersLicenced + 1) {
                    alert("You don't have enough licence");
                    currentDlg.close();
                    //waitingDialog.hide();
                    return false;

                }
                //////////////////////////////////////////


                var prefix = "";
                if (userId != "" && userId != null) {
                    prefix = logonName.split('|')[2];
                }

                if ($scope.EmployeeCheckListValidation(prefix, $scope.company) == false) {
                    if ($scope.EmployeeCheckListValidation(prefix, "") == false) {
                        $scope.AddNewEmployee("Employees", userId, MangerLoginId, ManagerItemid, "Primary");
                        //waitingDialog.hide();
                    }
                    else {
                        $scope.AddNewEmployee("Employees", userId, MangerLoginId, ManagerItemid, "");
                        // waitingDialog.hide();
                    }
                }
                else {
                    alert("User is already added in this company");
                    currentDlg.close();
                    //waitingDialog.hide();
                }



            }
        }
        else {
            alert("Employee Name can't be blank .");
            currentDlg.close();
            //waitingDialog.hide();

        }

    }
    $scope.EmployeeCheckListValidation = function (userId, companyId) {
        var validationEmployeeExist = false;
        try {

            var restQuery = "";
            if (companyId == "") {
                restQuery = "&$top=5000&$filter=LogonName/UserName  eq '" + userId + "'";
            }
            else {
                restQuery = "&$top=5000&$filter=LogonName/UserName  eq '" + userId + "' and CompanyId eq '" + companyId + "'";
            }
            var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ID,DepartmentId,LogonName/UserName,Company/ID&$expand=LogonName,Company" + restQuery;
            $.ajax({
                url: Ownurl,
                headers: { Accept: "application/json;odata=verbose" },
                async: false,
                success: function (data) {
                    var items = data.d.results;
                    if (items.length > 0) {
                        validationEmployeeExist = true;
                    }
                }, eror: function (data) {
                    console.log('error');
                }
            });
        }
        catch (e) {
            alert('LogonName is not in valid format !');
        }
        return validationEmployeeExist;
    }
    $scope.AddNewEmployee = function (ListName, userId, MangerLoginId, ManagerItemid, primaryCompany) {
        try {

            if ($('#chiefexecutive').is(':checked') == true) {
                ManagerItemid = -1;
                $scope.ManagerFullName = "Chief Executive";
                // MangerLoginId = null;  
            }
            _UserfullName = $scope.UserInfoFullName;

            var Metadata;
            var ItemType = GetItemTypeForListName(ListName);

            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                LogonNameId: userId,
                FullName: $scope.UserInfoFullName,
                Title: $scope.UserInfoFullName,
                // ParentId: $scope.hostSelectedManager.value,
                ParentId: ManagerItemid,
                Designation: $scope.designation,
                GroupName: $scope.groupName,
                Manager: $scope.ManagerFullName,
                ManagerLoginNameId: MangerLoginId,
                MobileNumber: $scope.mobileNo,
                ExtensionName: $scope.extension,
                Email: $scope.email,
                DateOfBirth: GetDateStandardFormat($scope.dateofBirth),
                DateOfAnniversary: GetDateStandardFormat($scope.dateofAnniversary),
                Gender: $scope.gender,
                EmployeeID: $scope.employeeCode,
                CompanyId: $scope.company,
                DepartmentId: $scope.department,
                OfficeLocationId: $scope.officeLocation,
                Status: $scope.status,
                JoiningDate: GetDateStandardFormat($scope.dateofJoining),
                DateofTermination: GetDateStandardFormat($scope.dateofTermination),
                PostalAddresses: $scope.currentAddress,
                City: $scope.city,
                StateProvince: $scope.state,
                ZIPPostalCode: $scope.zip,
                Country: $scope.country,
                HomePhone: $scope.homePhone,
                OtherEMailAddress: $scope.otherEmail,
                HomeAddress: $scope.parmanentAddress,
                Introduction: $(".richText-editor").html(),
                PrimaryCompany: primaryCompany
            };

            Metadata["LinkedIn_Account"] = {
                '__metadata': { 'type': 'SP.FieldUrlValue' },
                'Description': $scope.LinkedlnAccount,
                'Url': $scope.LinkedlnAccount
            }

            if (primaryCompany == null || primaryCompany == "") {
                delete Metadata["PrimaryCompany"];
            }

            if ($scope.designation == null || $scope.designation == "") {
                delete Metadata["Designation"];
            }

            if ($scope.groupName == null || $scope.groupName == "") {
                delete Metadata["GroupName"];
            }
            if ($scope.ManagerFullName == null || $scope.ManagerFullName == "") {
                delete Metadata["Manager"];
            }

            if (MangerLoginId == null || MangerLoginId == "") {
                delete Metadata["ManagerLoginNameId"];
            }


            if ($scope.dateofBirth == null || $scope.dateofBirth == "") {
                delete Metadata["DateOfBirth"];
            }
            if ($scope.dateofAnniversary == null || $scope.dateofAnniversary == "") {
                delete Metadata["DateOfAnniversary"];
            }
            if ($scope.gender == null || $scope.gender == "") {
                delete Metadata["Gender"];
            }
            if ($scope.employeeCode == null || $scope.employeeCode == "") {
                delete Metadata["EmployeeID"];
            }
            if ($scope.company == null || $scope.company == "" || $scope.company == "0") {
                delete Metadata["CompanyId"];
            }
            if ($scope.department == null || $scope.department == "" || $scope.department == "0") {
                delete Metadata["DepartmentId"];
            }
            if ($scope.officeLocation == null || $scope.officeLocation == "" || $scope.officeLocation == "0") {
                delete Metadata["OfficeLocationId"];
            }
            if ($scope.dateofJoining == null || $scope.dateofJoining == "") {
                delete Metadata["JoiningDate"];
            }
            if ($scope.dateofTermination == null || $scope.dateofTermination == "") {
                delete Metadata["DateofTermination"];
            }

            $.when($scope.AddItemToList(ListName, Metadata)).done(function (MainExamListItemTemp) {
                var urlmode = $.urlParam('mode');
                $scope.currentitemId = MainExamListItemTemp.d.ID;
                var _ItemId = MainExamListItemTemp.d.ID;
                var fileImageexist = $('#uploadFile1').val();
                //if joining date is before 7 days, announcement will not be saved
                doj = ConvertddmmyyTommddyy($("#dateofJoining").val());
                doj = new Date(doj);
                var beforeDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                beforeDate = beforeDate.setHours(0, 0, 0, 0);
                beforeDate = new Date(beforeDate);
                if (fileImageexist.length > 0) {
                    if (urlmode == "add" && doj >= beforeDate) {
                        InsertWelcomeInAnnouncementList(_ItemId);
                    }
                    $scope.AddFileAttachmmentOnNewEmployeeAddtion();

                }
                else {

                    alert("Employee is added successfully .");
                    currentDlg.close();
                    var dlgTitle = 'Redirecting...';
                    var dlgMsg = '<br />Please wait!!';
                    var dlgHeight = 200;
                    var dlgWidth = 400;
                    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
                    setTimeout(function () {
                        if (urlmode == "add" && doj >= beforeDate) {
                            InsertWelcomeInAnnouncementList(_ItemId);
                        }
                        BreakInheritePermissionDMSLibrary(userId, "1073741826", "Add");//read permission

                        $scope.RedirectPage(sourcelocation);
                    }, 100);

                }
            });
        }
        catch (error) {
            alert(error.message);
            // console.log(error.message);
            currentDlg.close();
            //waitingDialog.hide();
        }
    }

    //this Function Only for New Employee Name,email
    var _Username = '';
    $scope.GetUserId = function (userName) {
        var userID = "";
        var prefix = "i:0#.f|membership|";
        var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
        var accountName = userName;// prefix+userName;       
        $.ajax({
            url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
                encodeURIComponent(accountName) + "'",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            async: false,
            success: function (data) {
                userID = data.d.Id;
                _Username = data.d.Title;
                $scope.UserInfoFullName = data.d.Title;
                $scope.email = data.d.Email;
                //alert("Received UserId" + data.d.Id);
                // alert(JSON.stringify(data));
            },
            error: function (data) {
                console.log(JSON.stringify(data));
                alert('This user is not added on this site,Please add this user on this site.');
            }
        });
        return userID;
    }

    //This Function Only Use For Manager
    function GetUserIdForManager(userName) {
        var userID = "";
        var prefix = "i:0#.f|membership|";
        var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
        var accountName = userName; // prefix+userName;       
        $.ajax({
            url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
                encodeURIComponent(accountName) + "'",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            async: false,
            success: function (data) {
                userID = data.d.Id;
                $scope.ManagerFullName = data.d.Title;
            },
            error: function (data) {
                console.log(JSON.stringify(data));
            }
        });
        return userID;
    }





    $scope.ShowAlert = function (validationValue) {
        // if (typeof ($scope.Name) == "undefined" || $scope.Name == "") 
        // {
        // $window.alert("Please enter your name!");
        // return;
        // }
        $window.alert("Employee is updated successfully .");
    }
    $scope.updateInformationButton = function () {
        if ($('#chiefexecutive').is(':checked') != true) {
            var ManagerLoginName = getUserInfo('managerLoginName');
            if (ManagerLoginName != "") {
                var MangerLoginId = GetUserIdForManager(ManagerLoginName);
                var ManagerItemid = IsMangerActive(MangerLoginId);
                if (!ManagerItemid) {
                    alert("Employee is not active ");
                    ManagerItemid = "";
                    currentDlg.close();
                    //waitingDialog.hide();
                    return false;
                }

            }
            else {
                alert("Please fill ManagerName");
                currentDlg.close();
                //waitingDialog.hide();
                return false;

            }
        }

        if ($scope.employeeName == "" || $scope.employeeName == null || $scope.email == "" || $scope.email == null || $scope.company == "" || $scope.company == null || $scope.department == "" || $scope.department == null || $scope.officeLocation == "" || $scope.officeLocation == null) {
            alert("Employee Name\nEmail\nCompany\nDepartment\nOffice Location can not be blank .");
        }
        else {
            $scope.updateInformation("Employees", MangerLoginId, ManagerItemid);
        }



    }
    $scope.GetAttachment = function (attachmentcollection) {
        var attachmentUrl = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
        if (attachmentcollection.results.length > 0) {
            attachmentUrl = attachmentcollection.results[0].ServerRelativeUrl;
            $scope.teamporaryImageUrl = attachmentcollection.results[0].ServerRelativeUrl
        }
        return attachmentUrl;
    }

    $("#department").click(function () {
        if ($scope.department != null) {
            GetUserDepartmentUrl("Departments", $scope.department)
        }
    })


    $scope.UpdateEmployeeInfo = function () {
        var ListName = "Employees";
        var Metadata;
        var ItemType = GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Introduction: $(".richText-editor").html()

        }

        $.when(updateItemWithID(ListName, Metadata, $scope.currentitemId)).done(function (MainExamListItemTemp) {
            alert("Information Updated Sucessfully");
            $('#EmployeeIntro').modal('hide');


        });
    }

    $scope.getEmployeeInfo = function () {
        if ($scope.mode == 'edit' || $scope.mode == 'add') {
            $('.richText-editor').attr("contenteditable", "true");
            $('.richText-toolbar').show();
            if ($scope.mode == 'edit') {
                $('#UpdateInfo').show();
            }

        }
        else {
            $('.richText-editor').attr("contenteditable", "false");
            $('#UpdateInfo').hide();
            $('.richText-toolbar').hide();
        }
        $('#EmployeeIntro').modal('show');
        if ($scope.currentitemId != "") {
            var restQueryPersonalDMS = "?$select=Introduction&$filter=ID  eq '" + $scope.currentitemId + "'";
            $.when(getItemsWithQuery("Employees", restQueryPersonalDMS)).done(function (EmpInfoData) {
                var EmpDataInfo = EmpInfoData[0].Introduction;
                $(".richText-editor").html(EmpDataInfo);
            });
        }
    }





    $scope.AddItemToList = function (ListName, Metadata) {
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
                // console.log(data);
                dfd.resolve(data);
            },
            error: function (xhr, data, error) {
                var err = JSON.parse(xhr.responseText);
                var errorType = xhr.status;
                var errorMessage = err.error.message.value;
                alert(errorMessage);
                currentDlg.close();
                //waitingDialog.hide();
                //dfd.reject(error);
            }
        });
        return dfd.promise();
    }
});







$(document).ready(function () {
    IsCurrentUserInEinv();
    $("#uploadFile1").on('change', function () {
        if (typeof ($("#uploadFile1")[0].files) != "undefined") {
            var size = parseFloat($("#uploadFile1")[0].files[0].size / 1024).toFixed(2);
            console.log(size + " KB.");
            if (size <= 50) {
                document.getElementById('profile-image1').src = window.URL.createObjectURL(this.files[0]);
                return true;
            }

            else {
                alert("The file you are trying to upload is too large (max 50KB)");
                $("#uploadFile1").val(null);
                $('#profile-image1').attr("src", "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg");
                return false;
            }
        }

    });



    $("#uploadFile").on('change', function () {
        if (typeof ($("#uploadFile")[0].files) != "undefined") {
            var size = parseFloat($("#uploadFile")[0].files[0].size / 1024).toFixed(2);
            console.log(size + " KB.");
            if (size <= 50) {
                return true;
            }

            else {
                alert("The file you are trying to upload is too large (max 50KB)");
                $("#uploadFile").val(null);
                return false;
            }
        }

    });


    $("#chiefexecutive").change(function (event) {
        if (this.checked) {
            $("#managerDiv").hide();
        } else {
            $("#managerDiv").show();
        }
    });

});


function IsCurrentUserInEinv() {
    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EnvironmentalSettings')/Items?$select=Title,Active,scope,ListOfUsers/ID&$expand=ListOfUsers&$filter=Title eq 'EmployeePersonalInfo'";

    $.ajax({
        url: requestURL,
        type: 'GET',
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            var results = data.d.results;
            var ActiveVlaue = results[0].Active;
            var Scope = results[0].scope
            if (ActiveVlaue == true) {
                if (ActiveVlaue == true && Scope == "Selective") {

                    var ListOfUser = results[0].ListOfUsers.results;
                    if (ListOfUser != null) {
                        for (var index = 0; index < ListOfUser.length; index++) {
                            if (ListOfUser[index].ID == _spPageContextInfo.userId) {
                                $("#addInfo").show();
                                $("#MobNo").show();
                                $("#DOB").show();
                                $("#DateOfAnniversary").show();
                                $("#Gender").show();

                                return;
                            }
                            else {
                                $("#addInfo").hide();
                                $("#MobNo").hide();
                                $("#DOB").hide();
                                $("#DateOfAnniversary").hide();
                                $("#Gender").hide();

                            }
                        }

                    }


                }
                else if (ActiveVlaue == true && Scope == "Everyone") {
                    $("#addInfo").show();

                }

            }
            else {
                $("#addInfo").hide();
                $("#MobNo").hide();
                $("#DOB").hide();
                $("#DateOfAnniversary").hide();
                $("#Gender").hide();

            }
        },
        error: function (error) {
            console.log("Error occured in GetEnvironmentalSettings()");
        }
    })
}









function InsertWelcomeInAnnouncementList(_ItemID) {

    var today = new Date();
    today = $.datepicker.formatDate('mm/dd/yy', today);

    var expiredate = new Date();
    expiredate.setMonth(expiredate.getMonth() + 3);
    expiredate = $.datepicker.formatDate('mm/dd/yy', expiredate);

    var doj = ConvertddmmyyTommddyy($("#dateofJoining").val());
    doj = new Date(doj);
    doj = $.datepicker.formatDate('dd M yy', doj);

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Announcements')/items",
        type: "POST",
        async: false,
        data: JSON.stringify
        ({
            __metadata:
            {
                type: "SP.Data.AnnouncementsListItem"
            },
            Announcement_Type: "Welcome",
            EmployeeID: _ItemID.toString(),
            Title: "New Joinee",
            EmployeeName: _UserfullName,
            Designation: $("#designation").val(),
            Department: $("#department option:selected").text(),
            OfficeLocation: $("#officeLocation option:selected").text(),
            UserType: "Internal Users",
            WebPartName: "Welcome",
            Audience: "Corporate",
            ApprovalStatus: "Approved",
            Publish_Date: today,
            Expires: expiredate,
            // Publish_Date:GetDateStandardFormat($("#dateofJoining").val()),
            // Expires:GetDateStandardFormat($("#dateofJoining").val()),
            Description: "DOJ: " + doj
        }),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "X-HTTP-Method": "POST"
        },
        success: function (data, status, xhr) {
            console.log("Data Send to Announcements");
        },
        error: function (data) {
            console.log(data);
            console.log("Data Send to Announcements Failed");
            currentDlg.close();
            //waitingDialog.hide();
        }
    });
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) { return results = "null"; }
    else {
        return results[1] || 0;
    }
}




getItemsWithQuery = function (ListName, Query) {
    var dfd = $.Deferred();
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query;
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
            dfd.resolve(data.d.results);
            //   console.log();
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}




function CheckUserPermissionToShowButton() {

    var listName = 'ProcessApprovers';
    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=CompanyId eq '" + txtCompanyId + "' and ContributorsId eq '" + _spPageContextInfo.userId + "' and (WebPartName eq 'HR Admin' or WebPartName  eq 'Tech Admin')";
    //  var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=(CompanyId eq '" + txtCompanyId + "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and WebPartName eq 'DepartmentDocument_Access') or (CompanyId eq '" + txtCompanyId + "' and Owner eq '"+_spPageContextInfo.userId+"' and WebPartName eq 'Documents') ";
    $.ajax({
        url: siteURL,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;
            if (valuesArray.length > 0) {
            }
            else {
                window.location.href = "../Pages/AdminPortal.aspx?WebAppId=" + txtCompanyId + "";

                alert("Unauthorized access");


            }

        },
        error: function (data) {
            console.log(data.responseJSON.error);

        }

    });


}


function ConvertddmmyyTommddyy(ddmmyyyString) {
    return ddmmyyyString.split('/')[1] + "/" + ddmmyyyString.split('/')[0] + "/" + ddmmyyyString.split('/')[2];
}



function BreakInheritePermissionDMSLibrary(userPrincipleId, permissionLevel, commandAddRemove) {
    var deptSiteURL = DepartnemtUrl;
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var endPointUrl = deptSiteURL + "/_api/web/lists/getByTitle('DepartmentalDMS')/breakroleinheritance(copyRoleAssignments=false, clearSubscopes=true)";
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json', success: function (data) {
            console.log("Permission has been breaked successfully!");
            if (commandAddRemove == "Add") {
                $.when(AssignPermissiononDMSLibary(userPrincipleId, permissionLevel)).done(function (MainExamListItemTemp) {
                    console.log("Permission has been assigned successfully!");
                });
            }

        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}
function AssignPermissiononDMSLibary(userPrincpleId, permissionLevel) {
    var deptSiteURL = DepartnemtUrl
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    }
    var webUrl = deptSiteURL + "/_api/web/lists/getByTitle('DepartmentalDMS')/roleassignments/addroleassignment(principalid=" + userPrincpleId + ",roleDefId=" + permissionLevel + ")";
    $.ajax(
    {
        url: webUrl,
        type: "POST",
        headers: headers,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log("User has been assigned permission .");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}



function GetUserDepartmentUrl(listName, ItemID) {
    var siteURL1 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=ID,SiteURL,DepartmentName&$filter=ID eq '" + ItemID + "'";
    $.ajax({
        url: siteURL1,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                DepartnemtUrl = items[0].SiteURL;
                console.log(ItemID);
                console.log(DepartnemtUrl);

            }

        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
}





function IsMangerActive(managerName) {
    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    var mangerInfoItemId = '';

    RestQuery = "?$select=*,LogonName/EMail,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail&$expand=LogonName &$filter= Status eq 'Active' and Company/ID eq " + txtCompanyId + " and LogonNameId eq " + managerName + "";
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function (ManagerName) {

        try {
            //  var ManagerInfo=  ManagerName.results.length;
            if (ManagerName.results.length > 0) {
                mangerInfoItemId = ManagerName.results[0].ID;
            }
            else {
                mangerInfoItemId = false;

            }





        } catch (e) {
            alert(e);
        }
    });
    return mangerInfoItemId;
}





function SetAndResolvePeoplePicker(controlNameID, LoginNameOrEmail) {

    var peoplePickerDiv = $("[id^='" + controlNameID + "']");

    // Get the people picker object from the page.

    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];

    peoplePicker.AddUserKeys(LoginNameOrEmail, false);
}