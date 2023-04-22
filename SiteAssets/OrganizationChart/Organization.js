$(document).ready(function () {
        try {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', PageLoad);
            userActivityNotificationEntry(_spPageContextInfo.userId,window.location);
        }
        catch (exception) {
            console.log(exception);
        }
        setInterval(function () {
            $('.get-oc-tb').attr('style', 'background-color: transparent !important');
            $('.get-oc-c').attr('style', 'background-color: transparent !important');
        }, 1000);
        $("#btnApply").click(function () {
            GetOrgChartEmployeesAjaxCall();
            $("#txtComp").text(txtCompanyName);
            $("#txtDept").text($("#Department :selected").text());
            $("#txtLoc").text($("#OfficeLocation :selected").text());
            $("#txtComp").text($("#ddlFilterCompany :selected").text());
            $('clipPath rect').attr('rx', '100');
			//$('.get-oc-c').attr('style', 'background-color: '' !important');
        });

        $("#btnClear").click(function () {
            clearSelection();
        });
        $("#ddlFilterCompany").change(function () {
            BindOfficeLocations($(this).val());
            BindOfficeDepartment($(this).val());
    	});
    });

    //to change the org chart according to Logged_In user details
    $(window).on("load", function () {
        //Change Dept
        $('#Department option').filter(function () {
            return ($(this).text() == Logged_DepartmentName);
        }).prop('selected', true);
        $("#OfficeLocation").val(Logged_Location);
        $("#btnApply").trigger("click");
    });
    function PageLoad() {
        setTimeout(function () {
            //GetOrgChartEmployeesAjaxCall();
            GetCompanies();
            initializePeoplePicker("spnPplManager");//For Manager
            getAllEmplCount();
			setTimeout(function()
			{
				$("#btnApply").trigger("click");
				
			},5000);
        }, 500);
		
		
    }

    //Clear all selection in filter popup
    function clearSelection() {
    	$("#ddlFilterCompany").val(Logged_CompanyId);
    	$("#ddlFilterCompany").trigger("change");
        $("#Department").val('0');
        $("#Department").trigger("change");
        $("#OfficeLocation").val('0');
        $("#OfficeLocation").trigger("change");
        $("#ParentPplManager").html('');
        $("#ParentPplManager").append('<span id="spnPplManager"></span>');
        initializePeoplePicker("spnPplManager");//For Manager
    }

    //get user Ids from People picker
    function getPeopleUserInfoGroups(pickerPickerControlId) {
        SharedUserName = [];
        var UserArrayList = new Array();
        var pickerDiv = $("[id^='" + pickerPickerControlId + "']");
        var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
        var users = peoplePicker.GetAllUserInfo();
        if (users.length > 0) {
            var allUsersID = new Array();

            var usersEmailIDs = new Array();
            for (var i = 0; i < users.length; i++) {
                var grpid = users[i].Key;
                var autokey = users[i].EntityType;
                if (autokey == "User") {
                    //UserArrayList.push(GetUserIdGroups(users[i].Key));
                    UserArrayList.push(users[i].Key.split('|')[2]);
                    SharedUserName.push(users[i].DisplayText);

                } else {
                    var grpid = users[i].EntityData.SPGroupID;
                    var myArrays = new Array();
                    myArrays.push(siteusers(grpid));
                    //  var c = UserArrayList.concat(myArrays);
                    var c = UserArrayList.concat.apply([], myArrays);
                    UserArrayList = UserArrayList.concat(c);

                }
                //UserArrayList.push(GetUserIdGroups(users[i].Key));
            }
        }
        return UserArrayList;
    }

    // Render and initialize the client-side People Picker.
    function initializePeoplePicker(peoplePickerElementId) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = false;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '245px';
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
    }
    
    function GetOrgChartEmployeesAjaxCall() {
        $("#orgniation-filter").modal('hide');
        var companyID = Logged_CompanyId;
        var siteHostURL = window.location.protocol + "//" + window.location.host;
        var requestURI = '';
        var ManagerId = [];
        //var departmentName = $("#Department :selected").text();
        if ($("#spnPplManager_TopSpan_ResolvedList").text() != '') {
            ManagerId = getPeopleUserInfoGroups("spnPplManager");
        }
        var filter = '';
        if ($("#Department").val() != "0" && $("#Department").val() != null) {
            filter += " and Department/ID eq " + $("#Department").val() + " ";
        }
        if ($("#OfficeLocation").val() != "0" && $("#OfficeLocation").val() != null) {
            filter += " and OfficeLocation/ID eq " + $("#OfficeLocation").val() + " ";
        }
        if (ManagerId.length > 0) {
            filter += " and (ManagerLoginName/EMail eq '" + ManagerId[0] + "' or Email eq '" + ManagerId[0] + "')";
            //filter += " and ManagerLoginName/EMail eq '" + ManagerId[0] + "' ";
        }
        filter += " and CompanyId eq '" + $("#ddlFilterCompany").val() + "' ";

        requestURI = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('employees')/items?$select=Title,ID,Visible_in_directory,ParentId,FullName,Designation,MobileNumber,Email," +
                    "Department/DepartmentName,Department/ID,OfficeLocation/ID,OfficeLocation/OfficeName,ManagerLoginName/EMail&$expand=AttachmentFiles,Department," +
                    "OfficeLocation,ManagerLoginName&$Filter=Visible_in_directory ne 'No' and Status eq 'Active' " + filter + "&$top=5000 &$orderBy=Title desc";

        $.ajax({
            url: requestURI,
            type: "GET",
            async: false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {
                var employeess = [];
                var employee = {};

                // Default Top Node
                employee.id = -1
                employee.parentId = 0;
                employee.name = txtCompanyName; //$("#ddlCompany :selected").text();
                employee.title = "";
                employee.phone = "";
                employee.mail = "";
                employee.image = $("#LogoImage").attr("src");
                employeess.push(employee);
                // End
                var employeeList = [];
                var results= data.d.results;
                results.sort(function(a, b){
			  let x = a.Title;
			  let y = b.Title;
			  if (x < y) {return -1;}
			  if (x > y) {return 1;}
			  return 0;
		    });
                $.each(results, function (i, item) {
                    employee = {};
                    
                    var employeePicURL = '';
                    if (item.AttachmentFiles.results.length > 0) {
                        employeePicURL = siteHostURL + "/" + item.AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(item.Email);
                    }

                    employee.id = item.ID;
                    if (item.ParentId) {
                        employee.parentId = item.ParentId;
                    }
                    else {
                        employee.parentId = null;
                    }
                    employee.name = item.FullName;

                    if (item.Designation) {
                    	if(item.Designation.length > 27){
                    		item.Designation = item.Designation.substring(0, 27) + "...";
                    	}
                        employee.title = item.Designation;
                    } else {
                        employee.title = "";
                    }
                    if (item.Department.DepartmentName) {
                    	if(item.Department.DepartmentName.length > 21){
                    		item.Department.DepartmentName = item.Department.DepartmentName.substring(0, 21) + "...";
                    	}
                        employee.phone = ("Dept: " + item.Department.DepartmentName);
                    } else {
                        employee.phone = "";
                    }
                    if (item.Email) {
                        employee.mail = item.Email;
                    } else {
                        employee.mail = "";
                    }

                    employee.image = employeePicURL;

                    employeess.push(employee);

                    employeeList.push(item.Id);

                });


                //if parentId does not exist
                for (var index = 0; index < employeess.length; index++) {
                    if (employeeList.indexOf(employeess[index].parentId) == -1) {
                        if (employeess[index].parentId != 0) {
                            employeess[index].parentId = -1;
                        }
                    }
                }
                if (employeess.length == 1) {
                    employeess[0].parentId = -1;
                }

                /// Show Employee Org. Chart
                try {
                    ShowOrgChart(employeess);
                }
                catch (e) {
                    alert(e.message);
                }
            },
            error: function () {
                alert("Error getting employee details.");
            }
        });
    }

    function ShowOrgChart(employeess) {
        var peopleElement = document.getElementById("people");

        document.getElementById("people").innerHTML = "";


        var orgChart = new getOrgChart(peopleElement, {
            primaryFields: ["name", "title", "phone", "mail"],
            photoFields: ["image"],
            expandToLevel: 100,
            enableZoom: true,
            enableEdit: false,
            enableDetailsView: false,
            layout: getOrgChart.MIXED_HIERARCHY_RIGHT_LINKS,
            dataSource: employeess

        });

    }

	//Bind company filter dropdown
	function GetCompanies() {
	    //$('#ddlFilterCompany').empty().append('<option value="0">-Select Company-</option>');
	    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Companies')/items?$select=ID,CompanyName";
	    $.ajax({
	        url: Ownurl,
	        headers: { Accept: "application/json;odata=verbose" },
	        async: false,
	        success: function (data) {
	            var items = data.d.results;
	            for (var i = 0; i < items.length; i++) {
	                $("#ddlFilterCompany").append($("<option></option>").attr("value", data.d.results[i].ID).text(data.d.results[i].CompanyName));
	            }
	            $("#ddlFilterCompany").val(Logged_CompanyId);
	            $("#ddlFilterCompany").trigger("change");
	        }, eror: function (data) {
	            console.log('error');
	        }
	    });
	}
	    //////////////////////////////////// Bind Office Locations ///////////////////////////////
    function BindOfficeLocations(companyID) {
        //var companyID = Logged_CompanyId;
        var requestURI = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OfficeLocation')/items?$select=ID,OfficeName&$Filter=LanguageId eq 0 and CompanyID eq " + companyID + "";

        $.ajax({
            url: requestURI,
            type: "GET",
            async: false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {
                var locations;
                locations += "<option value=\"0\">All</option>";
                $.each(data.d.results, function (i, item) {
                    var ID = item.ID;
                    var officeName = item.OfficeName;
                    locations += "<option value=\"" + ID + "\">" + officeName + "</option>";
                });
                $("#OfficeLocation").html('');
                $("#OfficeLocation").append(locations);

            },
            error: function (error) {
                alert("Error in getting records -- " + error);
                return false;
            }
        });
    }

    /////////////////// Bind Department ///////////////
    var check = false;
    var check1 = false;
    function BindOfficeDepartment(companyID) {
        //var companyID = titanForWork.getQueryStringParameter('CompanyId');
        var requestURI = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Departments')/items?$select=ID,DepartmentName&$Filter=CompanyID eq " + companyID + "";

        $.ajax({
            url: requestURI,
            type: "GET",
            async: false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {
                var Deptlocations;
                Deptlocations += "<option value=\"0\">All</option>";
                $.each(data.d.results, function (i, item) {
                    var ID = item.ID;
                    var Department = item.DepartmentName;

                    Deptlocations += "<option value=\"" + ID + "\">" + Department + "</option>";
                });
                $("#Department").html('');
                $("#Department").append(Deptlocations);
            },
            error: function (error) {
                alert("Error in getting records -- " + error);
                return false;
            }
        });
    }


    //get all users count 
    function getAllEmplCount() {
        var Query = "?$top=100&$select=ID,Company/ID,Status,Visible_in_directory&$expand=Company&$orderBy=Title desc&$filter=Visible_in_directory ne 'No' and Status eq 'Active' and Company/ID eq " + Logged_CompanyId,
         dfds = $.Deferred(),
         url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + Query;
        $.when(getItems(url, dfds)).done(function (Results) {
            response = [];
            $("#TotalEmpCount").text(Results.length);
        });
    }
    var response = response || [];
    //Get details from SP list above 5000
    function getItems(url, dfds) {
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            headers: {
                'accept': 'application/json;odata=verbose'
            },
            success: function (data) {

                response = response.concat(data.d.results);
                if (data.d.__next) {
                    url = data.d.__next;
                    getItems(url, dfds);
                }
                else {
                    dfds.resolve(response);
                }
            },
            error: function (error) {
                dfds.reject(error);
                console.log(error);
            }
        })
        return dfds.promise();
    }