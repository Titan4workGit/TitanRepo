var assignBy = []; //for showing search result
var assignByEmail = "";
var FilterLocalStorage = [];
var IsInboxProjectBind = false;
var arrAllTaskUserWise = []; //filter = Assignto = LoggedIN user and Dependency = LoggedIN user
var AllTaskInbox = []; //all the Employee list tasks
var arrLimitTaskInbox = []; //filter = Assignto = LoggedIN user and Dependency = LoggedIN user and CompanyId = LoggedIN and Status = open
var arrFilterDataBind = []; //Filtered data
var IsInboxClientBind = false;
var LoadAllData = false;
var currentPhase = "Open";
var TaskAction = "PageLoad";
var currentDlg = '';
var IsThresholdLimitCorssed = false;
var arrFilterDeptProj = []; //Filtered data for Departmental Projects
var arrLimitTaskDeptProj = []; //Contains Department-wise Project's tasks (Selected Department)
var arrFilterDeptEmp = []; //Filtered data for Departmental Employees
var arrLimitTaskDeptEmp = []; //Contains Department-wise tasks (Selected Department)
var arrTaskInIds = [];

$(document).ready(function () {
    initializePeoplePicker("pplassigntoInbox");
    initializePeoplePicker("SendNotiPicker");
    getSubordinatesLoad();
    getAllDataByPnp('*,ProjectID/DepartmentId,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,ClientID/ID,ClientID/Title,Module/Title,Module/ID,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles', 'PredecessorTask,SuccessorTask,ClientID,Module,Author,AssignedBy,AttachmentFiles,TaskAssignTo,DependencyTo,ProjectID', '', 'EmployeeTaskDetails', 'Modified', '');
    $('#ProjectModule').attr('disabled', true);
    $(".FilterInbox").click(function () {
        $("#Inbox").modal("show");
        if ($('#WorkTypeOfProject option').length == 0) {
            bindAllWorkType();
        }
        $("#taskIn").datepicker();
        $('#taskIn').datepicker("option", "dateFormat", "MM dd, yy");
        if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptProj") {
            $("#UserAllProject").val("Projects");
            $("#UserAllProject").trigger("change");
            $("#UserAllProject").attr('disabled', 'disabled');

        }
        else if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptEmp") {
            $("#UserAllProject").val("All");
            $("#UserAllProject").trigger("change");
            $("#UserAllProject").prop('disabled', '');

        }
        else {
            $("#UserAllProject").val("All");
            $("#UserAllProject").trigger("change");
            $("#UserAllProject").prop('disabled', '');

        }
    });
    $(".SortProject").click(function () {
        SortProjectTable(this.textContent);
    });

    $(".MISTab").click(function () {
        $('.taskchkIn').prop("checked", "");
        $('.selectAllIn').prop("checked", "");
        arrTaskInIds = [];
    });

    $("#UserAllProject").change(function () {
        $('#ddlInboxClient').empty().append("<option value='All'>All</option>");
        $('#ddlInboxProject').empty().append("<option value='All'>All</option>");

        if (this.value == "General Task") {
            $(".ClientDiv").show();
            $(".projectDiv").hide();
        }
        else if (this.value == "Projects") {
            $(".ClientDiv").hide();
            $(".projectDiv").show();
        }
        else { //"All" select
            $(".projectDiv").hide();
            $(".ClientDiv").hide();
        }
        var storenow = $('#UserAllProject').val();
        if (storenow == "Projects") {
            $('.removing_box').addClass('activnating');
        }
        else {
            $('.removing_box').removeClass('activnating');
        }
    });
    $("#searchInProject").click(function () {
        if (IsInboxProjectBind == false) {
            var dlgTitle = 'Loading projects...';
            var dlgMsg = '<br />Please wait!!';
            var dlgHeight = 200;
            var dlgWidth = 400;
            SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
            });
            setTimeout(function () {
                ReadInDepartment();
                loadprojectInsearch();
            }, 100);
        }
        $("#ProjectInboxSearch").modal('show');
    });
    $("#Clientid").change(function () {
        if (this.value == "Clients") {
            $(".ClientDiv").show();
        }
        else {
            $(".ClientDiv").hide();
        }
    });
    $("#searchInClient").click(function () {
        if (IsInboxClientBind == false) {
            var dlgTitle = 'Loading clients...';
            var dlgMsg = '<br />Please wait!!';
            var dlgHeight = 200;
            var dlgWidth = 400;
            SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
            });
            setTimeout(function () {
                $("#btnSelectCustomer").show();
                $("#btnOutSelectCustomer").hide();
                getClientMaster('mainDivAreaClientmaster');
            }, 100);
        }
        else {
            $("#otherCustomerSearch").modal("show");
        }
    });
    $("#btnSelectCustomer").click(function () {
        setCustomerValue();
    });

    $("#FilterInProject").click(function () {
        var dlgTitle = 'Filtering projects...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
            currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        });
        setTimeout(function () {
            loadprojectInsearch();
        }, 100);
    });
    $("#btnInProject").click(function () {
        setInboxProjectValue();
    });

    $("#SeeMoreInbox").click(function () { ////See more for Page load content
        currentPhase = "Open";
        TaskAction = "";
        var lastPage = $("#pageDropDownInbox").val();
        getSelectedEmpTasks($("#SelectedEmpEmail").text());
        $("#pageDropDownInbox").val(lastPage);
        $("#pageDropDownInbox").trigger("change");
    });
    $("#SeeMoreDeptProj").click(function () { ////See more for Page load content
        var lastPage = $("#pageDropDownDeptProj").val();
        DepartmentalProjTasks("", $("#ddlDeptProj").val());;
        $("#pageDropDownDeptProj").val(lastPage);
        $("#pageDropDownDeptProj").trigger("change");
    });
    $("#SeeMoreDeptEmp").click(function () { ////See more for Page load content
        var lastPage = $("#pageDropDownDeptEmp").val();
        DeptEmpTasks('', []);
        $("#pageDropDownDeptEmp").val(lastPage);
        $("#pageDropDownDeptEmp").trigger("change");
    });

    $("#SeeMoreFilterInbox").click(function () { //See more for filtered data
        var lastPage = $("#pageDropDownInbox").val();
        var arrDataBind = [];
        arrDataBind = arrFilterDataBind.slice(parseInt($("#DiplayTaskCount").text()), (parseInt($("#DiplayTaskCount").text()) + 500)); //get 500 elements at first call
        BindInboxTasks(arrDataBind, 'mainDivAllAnnouncements', 'MySubordinate');
        if (arrFilterDataBind.length <= (parseInt($("#DiplayTaskCount").text()) + 500)) {
            $("#ShowTotalItemsInbox").show();
            $("#ShowItemsInbox").hide();
            $("#TotalItemscount").text(arrFilterDataBind.length);
            $("#SeeMoreFilterInbox").hide();
        }
        else {
            var currentDisplayCOunt = parseInt($("#DiplayTaskCount").text()) + 500;
            $("#ShowTotalItemsInbox").hide();
            $("#ShowItemsInbox").show();
            $("#DiplayTaskCount").text(currentDisplayCOunt.toString());
            $("#TotalTaskCount").text(arrFilterDataBind.length);
            $("#SeeMoreFilterInbox").show();
        }
        //FilterTaskData(Query, "SeeMore");
        $("#pageDropDownInbox").val(lastPage);
        $("#pageDropDownInbox").trigger("change");
    });

    $("#SeeMoreFilterDeptProj").click(function () { //See more for filtered data
        var lastPage = $("#pageDropDownDeptProj").val();
        var arrDataBind = [];
        arrDataBind = arrFilterDeptProj.slice(parseInt($("#TaskCountDeptProj").text()), (parseInt($("#TaskCountDeptProj").text()) + 500)); //get 500 elements at first call
        BindInboxTasks(arrDataBind, 'mainDivAllDeptProj', 'DeptProjects');
        if (arrFilterDeptProj.length <= (parseInt($("#TaskCountDeptProj").text()) + 500)) {
            $("#ShowTotalItemsDeptProj").show();
            $("#ShowItemsDeptProj").hide();
            $("#TotalItemscountDeptProj").text(arrFilterDeptProj.length);
            $("#SeeMoreFilterDeptProj").hide();
        }
        else {
            var currentDisplayCOunt = parseInt($("#TaskCountDeptProj").text()) + 500;
            $("#ShowTotalItemsDeptProj").hide();
            $("#ShowItemsDeptProj").show();
            $("#TaskCountDeptProj").text(currentDisplayCOunt.toString());
            $("#TotalTaskCountDeptProj").text(arrFilterDeptProj.length);
            $("#SeeMoreFilterDeptProj").show();
        }
        //FilterTaskData(Query, "SeeMore");
        $("#pageDropDownDeptProj").val(lastPage);
        $("#pageDropDownDeptProj").trigger("change");
    });

    $("#SeeMoreFilterDeptEmp").click(function () { //See more for filtered data
        var lastPage = $("#pageDropDownDeptProj").val();
        var arrDataBind = [];
        arrDataBind = arrFilterDeptEmp.slice(parseInt($("#TaskCountDeptEmp").text()), (parseInt($("#TaskCountDeptEmp").text()) + 500)); //get 500 elements at first call
        BindInboxTasks(arrDataBind, 'mainDivAllDeptEmp', 'DeptEmps');
        if (arrFilterDeptEmp.length <= (parseInt($("#TaskCountDeptEmp").text()) + 500)) {
            $("#ShowTotalItemsDeptEmp").show();
            $("#ShowItemsDeptEmp").hide();
            $("#TotalItemscountDeptEmp").text(arrFilterDeptEmp.length);
            $("#SeeMoreFilterDeptEmp").hide();
        }
        else {
            var currentDisplayCOunt = parseInt($("#TaskCountDeptEmp").text()) + 500;
            $("#ShowTotalItemsDeptEmp").hide();
            $("#ShowItemsDeptEmp").show();
            $("#TaskCountDeptEmp").text(currentDisplayCOunt.toString());
            $("#TaskCountDeptEmp").text(arrFilterDeptEmp.length);
            $("#SeeMoreFilterDeptEmp").show();
        }
        //FilterTaskData(Query, "SeeMore");
        $("#pageDropDownDeptEmp").val(lastPage);
        $("#pageDropDownDeptEmp").trigger("change");
    });

    $(".TaskExport").click(function () {
        var dlgTitle = 'Generating excelsheet...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        setTimeout(function () {
            generateTaskInExcel();
        }, 100);
    });

    //Pending count click
    $(".PendingTask").click(function () {
        SetTaskPending();
    });
    //Overdue count click
    $(".OverDueTask").click(function () {
        SetTaskOverdue();
    });
    $(".SortClass").click(function () {
        SortTable(this.textContent);
    });
    $(".ddlDeptHOD").change(function () {
        if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptProj") {
            DepartmentalProjTasks("PageLoad", $("#ddlDeptProj").val());
            getDeptEmployee($("#ddlDeptProj").val());
        }
        else {
            //DepartmentalProjTasks("PageLoad", $("#ddlDeptEmp").val());
            getDeptEmployee($("#ddlDeptEmp").val());
        }
    });
    $("#btnSendNotifyMIS").click(function () {
        if ($.trim($("#txtTaskNotify").val()) != "") {
            updateMISMeatdata('NotifyByMail');
        }
        else {
            alert("Kindly enter message first");
            return false;
        }
    });
    $(".selectAllIn").click(function (e) {
        currentTab = '';
        if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptProj") {
            currentTab = "TempTableDeptProj";
        }
        else if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptEmp") {
            currentTab = "TempTableDeptEmp";
        }
        else {
            currentTab = "TempTableQuestions";
        }
        if (this.checked == true) {
            $('#' + currentTab + ' .taskchkIn').prop("checked", "");
            $('#' + currentTab + ' .taskchkIn').trigger('click');
        }
        else {
            $('#' + currentTab + ' .taskchkIn').prop("checked", "");
            arrTaskInIds = [];
        }
    });
    $('#TempTableDeptProj .taskchkIn').change(function () {
        if (this.checked == false) {
            $('#TempTableDeptProj .selectAllIn').prop("checked", "")
        }
    });
    $('#TempTableDeptEmp .taskchkIn').change(function () {
        if (this.checked == false) {
            $('#TempTableDeptEmp .selectAllIn').prop("checked", "")
        }
    });
    $('#TempTableQuestions .taskchkIn').change(function () {
        if (this.checked == false) {
            $('#TempTableQuestions .selectAllIn').prop("checked", "")
        }
    });
    $(".AddDepedncySub").click(function () {
        if(arrTaskInIds.length == 0){
            alert("Kindly select any task first.");
            return false;
        }
        else {
        	$("#dependenciesmodl").modal('show');
        }
    });
    $(".liNotifySub").click(function () {
        if(arrTaskInIds.length == 0) {
	    	alert("Kindly select any task first.");
	    	return false;
        }
	    else {
	    	$("#Notificationlist").modal('show');
	    }
    });
});


//show subordinates on page load
function getSubordinatesLoad() {
    //checkHOD();
    var subordinates = '';
    var PendingOverdueCounts = [];
    //var TargetCount = 0;
    var CurrentPase = "Open";
    var PendingCount = "0";
    var OverDueCOunt = "0";
    var Query = "?$top=5000&$select=ID,Status,AttachmentFiles,LogonName/EMail,LogonName/ID,Designation,FullName,ManagerLoginName/EMail,Department/DepartmentName,Company/Id&$expand=Company,Department,ManagerLoginName,LogonName,AttachmentFiles&$OrderBy=FullName asc&$filter=ManagerLoginName/EMail eq '" + _spPageContextInfo.userEmail + "' and Status eq 'Active' and Company/Id eq '" + Logged_CompanyId + "' ";
    $.when(getLimitedEmployeess('Employees', Query)).done(function (Subordinates) {
        for (var sub = 0; sub < Subordinates.length; sub++) {
            if (Subordinates[sub].AttachmentFiles.results.length > 0) {
                var employeePicURL = Subordinates[sub].AttachmentFiles.results[0].ServerRelativeUrl;
            }
            else {
                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Subordinates[sub].LogonName.EMail)
            }
            PendingOverdueCounts = getSelectedEmpTaskCount(Subordinates[sub].LogonName.EMail);
            if (PendingOverdueCounts.length > 0) {
                PendingCount = PendingOverdueCounts[0].OpenTasksCount ? PendingOverdueCounts[0].OpenTasksCount : "0";
                OverDueCOunt = PendingOverdueCounts[0].OverdueCount ? PendingOverdueCounts[0].OverdueCount : "0";
                $("#TotalPending").text(parseInt($("#TotalPending").text()) + parseInt(PendingCount));
                $("#TotalOverdue").text(parseInt($("#TotalOverdue").text()) + parseInt(OverDueCOunt));
            }
            else {
                PendingCount = "0";
                OverDueCOunt = "0";
            }
            if (sub == 0) {
                subordinates += '<li class="panel active"><div class="my-sub-arrow">';
                var HasSubordinates = checkForSubordinates(Subordinates[sub].LogonName.EMail);
                if (HasSubordinates == true) {
                    subordinates += '<i class="fa fa-angle-right my-sub-arrow-icon" data-toggle="collapse" data-target="#Subrdinate' + Subordinates[sub].LogonName.ID + '" aria-expanded="true"></i>';
                }
                else {
                    subordinates += '';
                }
                subordinates += '<a class="cursor-pointer" data-toggle="pill">';
                subordinates += '<div class="d-flex align-items-center side-bar-icon-center">';
                subordinates += '<img src="' + employeePicURL + '" alt="EmpImage">';
                subordinates += '<div class="user-details-panel mt3 ml10">';
                subordinates += '<h4 class="tab-user-name"><span class="mr-4 ellipsis-2 firstSubordinate" onclick=getSelectedEmpTasks(\'' + Subordinates[sub].LogonName.EMail + '\');>' + Subordinates[sub].FullName + '</span><span class="d-flex color-black"><span>' + PendingCount + '</span>, <span class="color-red ml-4">' + OverDueCOunt + '</span></span></h4>';
                subordinates += '<p class="tab-user-deg"><span class="ellipsis-2">' + Subordinates[sub].Designation + ' | ' + Subordinates[sub].Department.DepartmentName + '</span></p>';
                subordinates += '<p class="tab-user-email ellipsis-2"><span onclick="OpenEmail(this);">' + Subordinates[sub].LogonName.EMail + '</span></p></div></div></a></div>';

                //Finding Sub-SubOrdinates and so on
                var Query = "?$top=5000&$select=ID,Status,AttachmentFiles,LogonName/ID,LogonName/EMail,Designation,FullName,ManagerLoginName/EMail,Department/DepartmentName,Company/Id&$expand=Company,Department,ManagerLoginName,LogonName,AttachmentFiles&$OrderBy=FullName asc&$filter=ManagerLoginName/EMail eq '" + Subordinates[sub].LogonName.EMail + "' and Status eq 'Active' and Company/Id eq '" + Logged_CompanyId + "' ";
                $.when(getLimitedEmployeess('Employees', Query)).done(function (SubSubordinates) {
                    if (SubSubordinates.length > 0) {
                        subordinates += '<div id="Subrdinate' + Subordinates[sub].LogonName.ID + '" class="inner-collapse-panel-mobile collapse in" aria-expanded="true" style="">';
                        subordinates += '<div class=" inner-collapse-panel"><div class="panel-group">';
                        for (var sub1 = 0; sub1 < SubSubordinates.length; sub1++) {
                            PendingOverdueCounts = getSelectedEmpTaskCount(SubSubordinates[sub1].LogonName.EMail);
                            if (PendingOverdueCounts.length > 0) {
                                PendingCount = PendingOverdueCounts[0].OpenTasksCount ? PendingOverdueCounts[0].OpenTasksCount : "0";
                                OverDueCOunt = PendingOverdueCounts[0].OverdueCount ? PendingOverdueCounts[0].OverdueCount : "0";
                                $("#TotalPending").text(parseInt($("#TotalPending").text()) + parseInt(PendingCount));
                                $("#TotalOverdue").text(parseInt($("#TotalOverdue").text()) + parseInt(OverDueCOunt));
                            }
                            else {
                                PendingCount = "0";
                                OverDueCOunt = "0";
                            }

                            if (SubSubordinates[sub1].AttachmentFiles.results.length > 0) {
                                var SubemployeePicURL = SubSubordinates[sub1].AttachmentFiles.results[0].ServerRelativeUrl;
                            }
                            else {
                                var SubemployeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(SubSubordinates[sub1].LogonName.EMail)
                            }
                            //check if employee has subordinates
                            var HasSubordinates = checkForSubordinates(SubSubordinates[sub1].LogonName.EMail);
                            subordinates += '<div class="panel panel-default" id="Manager' + SubSubordinates[sub1].LogonName.ID + '"><div class="panel-heading"><h4 class="panel-title"><div class="my-sub-arrow">';
                            if (HasSubordinates == true) {
                                subordinates += '<i class="fa fa-angle-right my-sub-arrow-icon collapsed" onclick="getSubordinatesOnClick(' + SubSubordinates[sub1].LogonName.ID + ', \'' + SubSubordinates[sub1].LogonName.EMail + '\');openToggle(this, ' + SubSubordinates[sub1].LogonName.ID + ');" data-target="#Subrdinate' + SubSubordinates[sub1].LogonName.ID + '" aria-expanded="false"></i>';
                            }
                            else {
                                subordinates += '';

                            }
                            subordinates += '<a href="javascript:void(0);"><div class="d-flex align-items-center"><img src="' + SubemployeePicURL + '" alt="EmpImage">';
                            subordinates += '<div class="user-details-panel mt3 ml10"><h4 class="tab-user-name"><span class="mr-4 ellipsis-2" onclick=getSelectedEmpTasks(\'' + SubSubordinates[sub1].LogonName.EMail + '\')>' + SubSubordinates[sub1].FullName + '</span>';
                            subordinates += '<span class="d-flex color-black"><span>' + PendingCount + '</span>, <span class="color-red ml-4">' + OverDueCOunt + '</span></span></h4>';
                            subordinates += '<p class="tab-user-deg"><span class="ellipsis-2">' + SubSubordinates[sub1].Designation + ' | ' + SubSubordinates[sub1].Department.DepartmentName + '</span></p>';
                            subordinates += '<p class="tab-user-email ellipsis-2"><span onclick="OpenEmail(this);">' + SubSubordinates[sub1].LogonName.EMail + '</span></p></div></div>';
                            subordinates += '</a></div></div></h4></div>';
                        }
                        subordinates += '</div></div></div>';
                    }
                });
                //subordinates += '';
            }
            else {
                subordinates += '</li><li class="panel" id="Manager' + Subordinates[sub].LogonName.ID + '"><div class="my-sub-arrow">';
                var HasSubordinates = checkForSubordinates(Subordinates[sub].LogonName.EMail);
                if (HasSubordinates == true) {
                    subordinates += '<i class="fa fa-angle-right my-sub-arrow-icon collapsed" data-target="#Subrdinate' + Subordinates[sub].LogonName.ID + '" onclick="getParentSubrdinate(' + Subordinates[sub].LogonName.ID + ', \'' + Subordinates[sub].LogonName.EMail + '\');openToggle(this, ' + Subordinates[sub].LogonName.ID + ');" aria-expanded="false"></i>';
                }
                else {
                    subordinates += '';
                }
                subordinates += '<a class="cursor-pointer" data-toggle="pill">';
                subordinates += '<div class="d-flex align-items-center side-bar-icon-center">';
                subordinates += '<img src="' + employeePicURL + '" alt="EmpImage">';
                subordinates += '<div class="user-details-panel mt3 ml10">';
                subordinates += '<h4 class="tab-user-name"><span class="mr-4 ellipsis-2" onclick=getSelectedEmpTasks(\'' + Subordinates[sub].LogonName.EMail + '\')>' + Subordinates[sub].FullName + '</span><span class="d-flex color-black"><span>' + PendingCount + '</span>, <span class="color-red ml-4">' + OverDueCOunt + '</span></span></h4>';
                subordinates += '<p class="tab-user-deg"><span class="ellipsis-2">' + Subordinates[sub].Designation + ' | ' + Subordinates[sub].Department.DepartmentName + '</span></p>';
                subordinates += '<p class="tab-user-email ellipsis-2"><span onclick="OpenEmail(this);">' + Subordinates[sub].LogonName.EMail + '</span></p></div></div></a></div></li>';
            }

        }
        $("#SubordinatesList").append(subordinates);
    });
}

//get Pending and Overdue task count of selected employee
function getSelectedEmpTaskCount(UserEmail) {
    var PendingOverdue = [];
    var Query = "?$top=5000&$select=ID,OpenTasksCount,OverdueCount,UserId/EMail&$expand=UserId&$filter=UserId/EMail eq '" + UserEmail + "' ";
    $.when(getLimitedEmployeess('EmployeeTaskCounter', Query)).done(function (TasksCount) {
        PendingOverdue = TasksCount;
    });
    return PendingOverdue;
}

//To open subordinates list
function openToggle(Action, ID) {
    if ($(Action).hasClass("collapsed") == true) {
        setTimeout(function () {
            $(Action).attr('aria-expanded', 'true'); $(Action).removeClass("collapsed");
            $("#Subrdinate" + ID).attr('aria-expanded', 'true'); $("#Subrdinate" + ID).addClass("in"); $("#Subrdinate" + ID).css("height", "");
        }, 100);
    }
    else {
        $(Action).attr('aria-expanded', 'false'); $(Action).addClass("collapsed");
        $("#Subrdinate" + ID).attr('aria-expanded', 'false'); $("#Subrdinate" + ID).removeClass("in"); $("#Subrdinate" + ID).css("height", "0px");
    }
}

//get sub-subordinates employee's tasks on click
function getSubordinatesOnClick(ManagerLogonId, ManagerEmail) {
    var subordinates = '';
    var PendingOverdueCounts = [];

    if ($("#Manager" + ManagerLogonId).html().includes("panel panel-default") == false) {
        var Query = "?$top=5000&$select=ID,Status,AttachmentFiles,LogonName/EMail,LogonName/ID,Designation,FullName,ManagerLoginName/EMail,Department/DepartmentName,Company/Id&$expand=Company,Department,ManagerLoginName,LogonName,AttachmentFiles&$OrderBy=FullName asc&$filter=ManagerLoginName/EMail eq '" + ManagerEmail + "' and Status eq 'Active' and Company/Id eq '" + Logged_CompanyId + "' ";
        $.when(getLimitedEmployeess('Employees', Query)).done(function (Subordinates) {
            if (Subordinates.length > 0) {
                subordinates += '<div id="Subrdinate' + ManagerLogonId + '" class="panel-collapse collapse in" aria-expanded="true"><div class="panel-body p0">';
                subordinates += '<div class=" inner-collapse-panel"><div class="panel-group">';

                for (var sub = 0; sub < Subordinates.length; sub++) {
                    PendingOverdueCounts = getSelectedEmpTaskCount(Subordinates[sub].LogonName.EMail);
                    if (PendingOverdueCounts.length > 0) {
                        PendingCount = PendingOverdueCounts[0].OpenTasksCount ? PendingOverdueCounts[0].OpenTasksCount : "0";
                        OverDueCOunt = PendingOverdueCounts[0].OverdueCount ? PendingOverdueCounts[0].OverdueCount : "0";
                        $("#TotalPending").text(parseInt($("#TotalPending").text()) + parseInt(PendingCount));
                        $("#TotalOverdue").text(parseInt($("#TotalOverdue").text()) + parseInt(OverDueCOunt));
                    }
                    else {
                        PendingCount = "0";
                        OverDueCOunt = "0";
                    }

                    if (Subordinates[sub].AttachmentFiles.results.length > 0) {
                        var employeePicURL = Subordinates[sub].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Subordinates[sub].LogonName.EMail)
                    }
                    subordinates += '<div class="panel panel-default" id="Manager' + Subordinates[sub].LogonName.ID + '"><div class="panel-heading"><h4 class="panel-title"><div class="my-sub-arrow">';
                    var HasSubordinates = checkForSubordinates(Subordinates[sub].LogonName.EMail);
                    if (HasSubordinates == true) {
                        subordinates += '<i class="fa fa-angle-right my-sub-arrow-icon collapsed" onclick="getSubordinatesOnClick(' + Subordinates[sub].LogonName.ID + ', \'' + Subordinates[sub].LogonName.EMail + '\');openToggle(this, ' + Subordinates[sub].LogonName.ID + ');" data-target="#Subrdinate' + Subordinates[sub].LogonName.ID + '" aria-expanded="false"></i>';
                    }
                    else {
                        subordinates += '';
                    }
                    subordinates += '<a href="javascript:void(0);"><div class="d-flex align-items-center"><img src="' + employeePicURL + '" alt="EmpImage">';
                    subordinates += '<div class="user-details-panel mt3 ml10"><h4 class="tab-user-name"><span class="mr-4 ellipsis-2" onclick=getSelectedEmpTasks(\'' + Subordinates[sub].LogonName.EMail + '\')>' + Subordinates[sub].FullName + '</span>';
                    subordinates += '<span class="d-flex color-black"><span>' + PendingCount + '</span>, <span class="color-red ml-4">' + OverDueCOunt + '</span></span></h4>';
                    subordinates += '<p class="tab-user-deg"><span class="ellipsis-2">' + Subordinates[sub].Designation + ' | ' + Subordinates[sub].Department.DepartmentName + '</span></p>';
                    subordinates += '<p class="tab-user-email ellipsis-2"><span onclick="OpenEmail(this);">' + Subordinates[sub].LogonName.EMail + '</span></p></div></div>';
                    subordinates += '</a></div></div></h4></div>'
                }
                subordinates += '</div></div></div>';
                $("#Manager" + ManagerLogonId).append(subordinates);
            }
        });
    }
}

//get subordinates employee's tasks on click
function getParentSubrdinate(ManagerLogonId, ManagerEmail) {
    var subordinates = '';
    //var CurrentPase = "Open";
    var PendingOverdueCounts = [];
    //$("#Manager" + ManagerLogonId).empty();
    if ($("#Manager" + ManagerLogonId).html().includes("panel panel-default") == false) {
        var Query = "?$top=5000&$select=ID,Status,AttachmentFiles,LogonName/ID,LogonName/EMail,Designation,FullName,ManagerLoginName/EMail,Department/DepartmentName,Company/Id&$expand=Company,Department,ManagerLoginName,LogonName,AttachmentFiles&$OrderBy=FullName asc&$filter=ManagerLoginName/EMail eq '" + ManagerEmail + "' and Status eq 'Active' and Company/Id eq '" + Logged_CompanyId + "' ";
        $.when(getLimitedEmployeess('Employees', Query)).done(function (SubSubordinates) {
            if (SubSubordinates.length > 0) {
                subordinates += '<div id="Subrdinate' + ManagerLogonId + '" class="inner-collapse-panel-mobile collapse in" aria-expanded="true" style="">';
                subordinates += '<div class=" inner-collapse-panel"><div class="panel-group">';
                for (var sub1 = 0; sub1 < SubSubordinates.length; sub1++) {
                    PendingOverdueCounts = getSelectedEmpTaskCount(SubSubordinates[sub1].LogonName.EMail);
                    if (PendingOverdueCounts.length > 0) {
                        PendingCount = PendingOverdueCounts[0].OpenTasksCount ? PendingOverdueCounts[0].OpenTasksCount : "0";
                        OverDueCOunt = PendingOverdueCounts[0].OverdueCount ? PendingOverdueCounts[0].OverdueCount : "0";
                        $("#TotalPending").text(parseInt($("#TotalPending").text()) + parseInt(PendingCount));
                        $("#TotalOverdue").text(parseInt($("#TotalOverdue").text()) + parseInt(OverDueCOunt));
                    }
                    else {
                        PendingCount = "0";
                        OverDueCOunt = "0";
                    }

                    if (SubSubordinates[sub1].AttachmentFiles.results.length > 0) {
                        var SubemployeePicURL = SubSubordinates[sub1].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        var SubemployeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(SubSubordinates[sub1].LogonName.EMail)
                    }
                    subordinates += '<div class="panel panel-default" id="Manager' + SubSubordinates[sub1].LogonName.ID + '"><div class="panel-heading"><h4 class="panel-title"><div class="my-sub-arrow">';
                    var HasSubordinates = checkForSubordinates(SubSubordinates[sub1].LogonName.EMail);
                    if (HasSubordinates == true) {
                        subordinates += '<i class="fa fa-angle-right my-sub-arrow-icon collapsed" onclick="getSubordinatesOnClick(' + SubSubordinates[sub1].LogonName.ID + ', \'' + SubSubordinates[sub1].LogonName.EMail + '\');openToggle(this, ' + SubSubordinates[sub1].LogonName.ID + ');" data-target="#Subrdinate' + SubSubordinates[sub1].LogonName.ID + '" aria-expanded="false"></i>';
                    }
                    else {
                        subordinates += '';
                    }
                    subordinates += '<a href="javascript:void(0);"><div class="d-flex align-items-center"><img src="' + SubemployeePicURL + '" alt="EmpImage">';
                    subordinates += '<div class="user-details-panel mt3 ml10"><h4 class="tab-user-name"><span class="mr-4 ellipsis-2" onclick=getSelectedEmpTasks(\'' + SubSubordinates[sub1].LogonName.EMail + '\')>' + SubSubordinates[sub1].FullName + '</span>';
                    subordinates += '<span class="d-flex color-black"><span>' + PendingCount + '</span>, <span class="color-red ml-4">' + OverDueCOunt + '</span></span></h4>';
                    subordinates += '<p class="tab-user-deg"><span class="ellipsis-2">' + SubSubordinates[sub1].Designation + ' | ' + SubSubordinates[sub1].Department.DepartmentName + '</span></p>';
                    subordinates += '<p class="tab-user-email ellipsis-2"><span onclick="OpenEmail(this);">' + SubSubordinates[sub1].LogonName.EMail + '</span></p></div></div>';
                    subordinates += '</a></div></div></h4></div>';
                }
                subordinates += '</div></div></div>';
                $("#Manager" + ManagerLogonId).append(subordinates);
            }
        });
    }
}

//get selected user Inbox tasks
function getSelectedEmpTasks(AssignTo) {
    waitingDialog.show();
    setTimeout(function () {
        $("#DetailsArea").show();
        $("#SeeMoreFilterInbox").hide();
        var restQuery,
	        arrDataBind = [];
        if (TaskAction == "PageLoad") {
            arrFilterDataBind = [];
            var dateFilter = new Date();
            dateFilter = dateFilter.setFullYear(dateFilter.getFullYear() - 1);
            dateFilter = new Date(dateFilter);

            //get Employee Details
            var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,FullName,LogonName/EMail,Company/Id,Company/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Company,Department&$top=5000&$filter=Status eq 'Active' and LogonName/EMail eq '" + AssignTo + "' and Company/Id eq '" + Logged_CompanyId + "' ";
            $.when(getLimitedEmployeess('Employees', Query)).done(function (UserResults) {
                if (UserResults.length > 0) {
                    var value = UserResults[0];
                    if (value.AttachmentFiles.results.length > 0) {
                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
                    }

                    $("#SelectedEmpImage").attr("src", attachmentUrl);
                    $("#SelectedEmpName").text(value.FullName);
                    $("#SelectedEmpData").text(value.Designation + " | " + value.Department.Title);
                    $("#SelectedEmpEmail").text(AssignTo);
                }
            });
            //Start getting tasks 
            $("#mainDivAllAnnouncements").empty();
            arrAllTaskUserWise = AllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                var arrAssigntoQuery = [];
                var arrDependencyQuery = [];
                var AssigntoQuery = true;
                var DependencyQuery = true;
                for (var i = 0; i < obj.TaskAssignTo.length; i++) {
                    if (obj.TaskAssignTo[i].EMail.indexOf("#") != -1) {
                        obj.TaskAssignTo[i].EMail = obj.TaskAssignTo[i].EMail.split("#")[0];
                        obj.TaskAssignTo[i].EMail = obj.TaskAssignTo[i].EMail.replace("_", "@");
                    }
                    arrAssigntoQuery.push(obj.TaskAssignTo[i].EMail.toLowerCase() == AssignTo.toLowerCase());
                }
                arrAssigntoQuery.forEach(function (entry, index) {
                    if (index == 0) {
                        AssigntoQuery = entry;
                    }
                    else {
                        AssigntoQuery = entry || AssigntoQuery;
                    }
                });
                if (obj.DependencyTo != null) {
                    for (var j = 0; j < obj.DependencyTo.length; j++) {
                        if (obj.DependencyTo[j].EMail.indexOf("#") != -1) {
                            obj.DependencyTo[j].EMail = obj.DependencyTo[j].EMail.split("#")[0];
                            obj.DependencyTo[j].EMail = obj.DependencyTo[j].EMail.replace("_", "@");
                        }
                        arrDependencyQuery.push(obj.DependencyTo[j].EMail.toLowerCase() == AssignTo.toLowerCase());
                    }
                }
                else {
                    DependencyQuery = false;
                }
                arrDependencyQuery.forEach(function (entry, index) {
                    if (index == 0) {
                        DependencyQuery = entry;
                    }
                    else {
                        DependencyQuery = entry || DependencyQuery;
                    }
                });
                return (AssigntoQuery || DependencyQuery);//(obj.CompanyId ==  Logged_CompanyId && 
            });
            arrDataBind = arrLimitTaskInbox = arrAllTaskUserWise.filter(function (obj) { //Filter array on the basis of CurrentPhase    
                return (obj.CurrentPhase == currentPhase)
            });
            //Showing data out of total
            if (arrDataBind.length >= 500) {
                $("#TotalTaskCount").text(arrDataBind.length);
                arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
                $("#ShowTotalItemsInbox").hide();
                $("#ShowItemsInbox").show();
                $("#DiplayTaskCount").text("500");
                $("#SeeMoreInbox").show();
            }
            else {
                $("#ShowTotalItemsInbox").show();
                $("#ShowItemsInbox").hide();
                $("#TotalItemscount").text(arrDataBind.length);
                $("#SeeMoreInbox").hide();
            }
            BindInboxTasks(arrDataBind, 'mainDivAllAnnouncements', 'MySubordinate');

            if (arrDataBind.length == 0) {
                $(".NoRecordFound").show();
                $("#SeeMoreInbox").hide();
            }
            else {
                $(".NoRecordFound").hide();

            }
            ShowPieChartInbox();
            GetTaskInboxCount();
            waitingDialog.hide();

        }
        else {
            arrDataBind = arrLimitTaskInbox.slice(parseInt($("#DiplayTaskCount").text()), (parseInt($("#DiplayTaskCount").text()) + 500)); //get 500 elements at first call
            BindInboxTasks(arrDataBind, 'mainDivAllAnnouncements', 'MySubordinate');

            if (arrLimitTaskInbox.length <= (parseInt($("#DiplayTaskCount").text()) + 500)) {
                $("#ShowTotalItemsInbox").show();
                $("#ShowItemsInbox").hide();
                $("#TotalItemscount").text(arrLimitTaskInbox.length);
                $("#SeeMoreInbox").hide();
            }
            else {
                var currentDisplayCOunt = parseInt($("#DiplayTaskCount").text()) + 500;
                $("#ShowTotalItemsInbox").hide();
                $("#ShowItemsInbox").show();
                $("#DiplayTaskCount").text(currentDisplayCOunt.toString());
                $("#TotalTaskCount").text(arrLimitTaskInbox.length);
                $("#SeeMoreInbox").show();
            }
        }
    }, 100);
}


//bind inbox tasks as per given data
function BindInboxTasks(arrDataBind, HTMLID, TabName) {
    var tableItemsHTML = "";
    if (arrDataBind.length > 0) {
        for (var i = 0; i < arrDataBind.length; i++) {
            var CompletionDate = '';
            var ItemID = arrDataBind[i].ID;
            var Title = arrDataBind[i].Title;
            var taskType = arrDataBind[i].TaskType;
            var TaskAssignFrom = arrDataBind[i].AssignedBy.Title;
            var TaskPriority = arrDataBind[i].TaskPriority;
            var DueDate = arrDataBind[i].DueDate;
            var modifiedDate = new Date(DueDate);
            var ExcelAssignTo = '';
            var ExcelDependencies = '';
            modifiedDate = new Date(modifiedDate);
            var diffDaysServices = Math.round(todayDate.getTime() - modifiedDate.getTime()) / (one_day);
            var OverDueDate = ""
            if (DueDate != null) {
                DueDate = new Date(DueDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
            }
            else {
                DueDate = 'N/A';
            }
            var CompletionPersent = arrDataBind[i].CompletionPersent;
            var CurrentPhase = arrDataBind[i].CurrentPhase;
            if (CurrentPhase == "Completed") {
                CompletionDate = new Date(arrDataBind[i].CompletionDate);
                CompletionDate = titanForWork.ShowCommonStandardDateFormat(CompletionDate);//.toLocaleDateString();
            }
            else {
                CompletionDate = "";
            }

            var ModuleTitle = '';
            if (arrDataBind[i].Module != null) {
                var ModuleTitle = arrDataBind[i].Module.Title;
                if (ModuleTitle == null) {
                    ModuleTitle = "";
                }
            }
            var ClientTitle = '';
            if (arrDataBind[i].ClientID != null) {
                var ClientTitle = arrDataBind[i].ClientID.Title;
                if (ClientTitle == null) {
                    ClientTitle = "";
                }
            }

            var ClientModuleType = '';
            if (taskType == "2") {
                ClientModuleType = "<label class='m-0 b-400'>Client:</label><span class='ml-4 my-task-names'>" + ClientTitle + "</span>";
            }

            if (taskType == "1") {
                ClientModuleType = "<label class='m-0 b-400'>Module:</label><span class='ml-4 my-task-names'>" + ModuleTitle + "</span>";
            }
            var TaskMethod = '';
            var ProjectFullName = arrDataBind[i].ProjectFullName;
            var ProjectFullNameExcel = "";
            if (ProjectFullName == null) {
                TaskMethod = "General task";
                ProjectFullName = "<b>Client:</b> " + ClientTitle;
                ProjectFullNameExcel = "Client (" + ClientTitle + ")";
            }
            else {
                TaskMethod = "Project task";
                ProjectFullNameExcel = "Project (" + ProjectFullName + ")";
                ProjectFullName = "<b>Project:</b> " + ProjectFullName;
            }
            var Worktype = arrDataBind[i].Worktype;
            if (Worktype == null) {
                Worktype = '';
            }

            var DependencyCount = arrDataBind[i].DependencyCount;
            if (DependencyCount == null || DependencyCount == 0) {
                DependencyCount = '';
            }

            var ExcelDependenciesName = "";
            if (DependencyCount > 0) {
                DependencyCount = arrDataBind[i].DependencyTo.length;
                //dependencyActionButton = "<button type='button' class='btn custom-btn custom-btn-two mt-16' onclick=taskDependency('" + ItemID + "') >Action</button>";
                for (depency = 0; depency < arrDataBind[i].DependencyTo.length; depency++) {
                    ExcelDependenciesName += arrDataBind[i].DependencyTo[depency].Title + ", ";
                }
                ExcelDependenciesName = ExcelDependenciesName.substring(0, ExcelDependenciesName.length - 2);
            }
            var taskStartDate = arrDataBind[i].StartDate;
            var TaskAssignTo = arrDataBind[i].TaskAssignTo;
            var TaskAssignToUsers = '';
            if (TaskAssignTo.length > 0) {
                var TaskAssignToUsers = TaskAssignTo[0].Title;
                for (assignto = 0; assignto < TaskAssignTo.length; assignto++) {
                    ExcelAssignTo += TaskAssignTo[assignto].Title + ", ";
                }
                ExcelAssignTo = ExcelAssignTo.substring(0, ExcelAssignTo.length - 2);
            }

            var TaskAssignToButton = '';
            if (TaskAssignTo.length > 1) {
                TaskAssignToButton = "<button type='button' class='btn custom-btn custom-btn-two mt10' onclick=taskAssignToUsersModal('" + ItemID + "')>Group</button>";
            }
            var currentuserID = _spPageContextInfo.userId;
            var IsUserInAssigntoGroup = TaskAssignTo.map(function (e) { return e.ID; }).indexOf(currentuserID);
            var timeSheetFillButton = '';
            if (IsUserInAssigntoGroup != -1) {
                var timeSheetFillButton = "<button type='button' class='btn btn-danger custom-btn-two custom-btn-two-danger mt-16' onclick=\'timeSheetEntry(" + ItemID + ")\'>Fill</button>";
            }

            var Titleurl = "<a class='task-name-box' href='javascript:void(0);' onclick='OpenIframeTask(this);' name='" + _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(ItemID) + "&EditMode=" + window.btoa('False') + "'><b class='ellipsis-2'>" + Title + "</b></a>";
            // Generate Dynamic HTML
            if (diffDaysServices > 1 && CurrentPhase == "Open") {
                tableItemsHTML += "<tr>" +
                	"<td class='text-center vertical-align-middle'><label class='checkbox-inline hpx-20'><input type='checkbox' value='" + ItemID + "' class='taskchkIn'></label></td>" +
	                "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
                    "<span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p></td>" +
                    "<td style='display:none;'>" + Title + "<p class='m-0 mt-4 ellipsis-1'></td>" +
	                "<td style='display:none;'>" + ProjectFullNameExcel + "<p class='m-0 mt-4 ellipsis-1'></td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + Worktype + "</p></td>" +
	                "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p></td>" +
	                "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignToUsers + "</p>" +
	                "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div>" +
	                "</td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelAssignTo + "</p></td>" +
	                "<td class='text-center'><p class='m-0 mb-10'>" + CurrentPhase + "</p>" +
	                "<p class='m-0 font-12' style='font-weight: bold;color: red;'>Due:<span>" + DueDate + "</span></p>" +
	                "<div class='progress custom-progress progress-danger m-0 mt-4'>" +
	                "<div class='progress-bar progress-bar-danger' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].Created + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + CurrentPhase + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].TaskPriority + "</p></td>" +
                    "<td class='text-center'><h4 class='m-0'>" + DependencyCount + "</h4></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependenciesName + "</p></td>" +
	                //"<td class='text-center myTask-timesheet-col'><h4 class='m-0 cursor-pointer' id='timehrs" + ItemID + "' onclick=\'timeSheetHours(this," + ItemID + ")\'></h4><button type='button' class='btn custom-btn custom-btn-two mt-16 hourbtn' onclick=\'timeSheetHours(this," + ItemID + ")\'>Hours</button>" + timeSheetFillButton + "</td>" +
	            "</tr>";
            }
            else {
                tableItemsHTML += "<tr>" +
                	"<td class='text-center vertical-align-middle'><label class='checkbox-inline hpx-20'><input type='checkbox' value='" + ItemID + "' class='taskchkIn'></label></td>" +
	                "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
                    "<span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p></td>" +
                    "<td style='display:none;'>" + Title + "<p class='m-0 mt-4 ellipsis-1'></td>" +
	                "<td style='display:none;'>" + ProjectFullNameExcel + "<p class='m-0 mt-4 ellipsis-1'></td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + Worktype + "</p></td>" +
	                "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p></td>" +
	                "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignToUsers + "</p>" +
	                "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div>" +
	                "</td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelAssignTo + "</p></td>" +
	                "<td class='text-center'><p class='m-0 mb-10'>" + CurrentPhase + "</p>" +
	                "<p class='m-0 font-12'>Due:<span>" + DueDate + "</span></p>" +
	                "<div class='progress custom-progress progress-success m-0 mt-4'>" +
	                "<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].Created + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + CurrentPhase + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].TaskPriority + "</p></td>" +
                    "<td class='text-center'><h4 class='m-0'>" + DependencyCount + "</h4></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependenciesName + "</p></td>" +
	                //"<td class='text-center myTask-timesheet-col'><h4 class='m-0 cursor-pointer' id='timehrs" + ItemID + "' onclick=\'timeSheetHours(this," + ItemID + ")\'></h4><button type='button' class='btn custom-btn custom-btn-two mt-16 hourbtn' onclick=\'timeSheetHours(this," + ItemID + ")\'>Hours</button>" + timeSheetFillButton + "</td>" +
	            "</tr>";
            }
        }
        $("#" + HTMLID).append(tableItemsHTML);
        if (TabName == "MySubordinate") {
            TableConfiguration();
        }
        else if (TabName == "DeptProjects") {
            TableConfigurationDeptProj();
        }
        else {
            TableConfigDeptEmp();
        }
        $(".taskchkIn").click(function () {
            currentTab = '';
            if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptProj") {
                currentTab = "TempTableDeptProj";
            }
            else if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptEmp") {
                currentTab = "TempTableDeptEmp";
            }
            else {
                currentTab = "TempTableQuestions";
            }
            if (this.checked == true) {
                if ($("#" + currentTab + " .taskchkIn:checked").length == 1) {
                    arrTaskInIds = [];
                }
                arrTaskInIds.push(this.value);
            }
            else {
                var selected = this.value;
                arrTaskInIds = arrTaskInIds.filter(function (obj) {
                    return obj !== selected;
                });
            }
        });
    }
    else {
        tableItemsHTML = "<tr><td colspan=7 style='text-align: center'>No record found!!</td></tr>";
        $("#" + HTMLID).append(tableItemsHTML);
    }
    if (currentDlg != "") {
        currentDlg.close();
    }
    waitingDialog.hide();
}


//Render list of assign to 
function taskAssignToUsersModal(itemid) {
    $('#assignToUserList').html('')
    var items = AllTaskInbox.filter(function (data) {
        return data.ID == itemid
    });
    var arrEmpData = [];
    var AssignTo = '';

    if (items.length > 0) {
        var TaskAssignTo = items[0].TaskAssignTo;
        for (var m = 0; m < TaskAssignTo.length; m++) {
            var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,FullName,LogonName/EMail,Company/Id,Company/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Company,Department&$top=5000&$filter=Status eq 'Active' and LogonName/EMail eq '" + TaskAssignTo[m].EMail + "' and Company/Id eq '" + Logged_CompanyId + "' ";
            $.when(getLimitedEmployeess('Employees', Query)).done(function (UserResults) {
                if (UserResults.length > 0) {
                    var value = UserResults[0];
                    if (value.AttachmentFiles.length > 0) {
                        attachmentUrl = value.AttachmentFiles[0].ServerRelativeUrl;
                    }
                    else {
                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
                    }
                    AssignTo += '<div class="d-flex align-items-center user-detail-panel">';
                    AssignTo += '<img src=' + attachmentUrl + ' alt="EmpImage">';
                    AssignTo += '<div class="user-details-panel mt3 ml10"><h4 class="tab-user-name"><span>' + value.FullName + '</span></h4>';
                    AssignTo += '<p class="tab-user-deg"><span>' + value.Designation + ' </span><span class="ml5 mr5">|</span><span> ' + value.Department.Title + '</span></p>';
                    AssignTo += '<p class="tab-user-email"><span>' + TaskAssignTo[m].EMail + '</span></p></div></div>';
                }
            });
        }
        $('#assignToUserList').append(AssignTo);
    }
    $("#taskGroup1").modal("show");
}

//make percentage wise pie chart 
function ShowPieChartInbox() {
    var dfds = $.Deferred(),
		arrComplatedTasks = [],
    	arrOpenTasks = [],
    	arrHoldTasks = [],
    	arrCancelTasks = [],
    	arrCloseTasks = [],
    	TaskAssigneeMail = "",
    	TaskDependencyMail = "";
    $("#pie").empty();

    if (arrAllTaskUserWise.length > 0) {
        $("#pie").show();
        $(".blankcircle").hide();
        arrComplatedTasks = arrAllTaskUserWise.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "completed"
        });
        arrOpenTasks = arrAllTaskUserWise.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "open"
        });
        arrHoldTasks = arrAllTaskUserWise.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "hold"
        });
        arrCancelTasks = arrAllTaskUserWise.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "cancelled"
        });
        arrCloseTasks = arrAllTaskUserWise.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "close"
        });
        if (arrComplatedTasks.length == 0 && arrOpenTasks.length == 0 && arrHoldTasks.length == 0 && arrCancelTasks.length == 0 && arrCloseTasks.length == 0) {
            $("#pie").hide();
        }

        //});
        var pie = new d3pie("pie", {
            header: {
                title: {
                    text: "",
                    fontSize: 30
                }
            },
            data: {
                content: [
                  { label: "Completed", value: arrComplatedTasks.length, valueType: "percentage" },
                  { label: "Open", value: arrOpenTasks.length, valueType: "percentage" },
                  { label: "Hold", value: arrHoldTasks.length, valueType: "percentage" },
                  { label: "Cancelled", value: arrCancelTasks.length, valueType: "percentage" },
                  { label: "Close", value: arrCloseTasks.length, valueType: "percentage" }
                ]
            },
            callbacks: {
                onload: null,
                onMouseoverSegment: null,
                onMouseoutSegment: null,
                onClickSegment: function (evt, item) {
                    clickInboxChart(evt);
                }
            }
        });
    }
    else {
        $("#pie").hide();
        $(".blankcircle").show();
    }
}

//get Pending and Overdue tasks count
function GetTaskInboxCount() {
    var pendingCounter = 0;
    var overdueCounter = 0;
    var CurrentDate = new Date();
    CurrentDate = CurrentDate.setHours(0, 0, 0, 0);
    CurrentDate = new Date(CurrentDate)

    for (var i = 0; i < arrLimitTaskInbox.length; i++) {
        var DueDate = new Date(moment(arrLimitTaskInbox[i].DueDate.split('T')[0]).format("MM/DD/YYYY"));
        DueDate.setDate(DueDate.getDate());
        DueDate = new Date(DueDate);

        if (arrLimitTaskInbox[i].CurrentPhase == "Open") {
            if (DueDate >= CurrentDate) {
                pendingCounter++;
            }
            else {
                overdueCounter++;
            }
        }
    }
    $("#TaskOverdue").text(overdueCounter);
    $("#TaskPending").text(pendingCounter);
}

//get Pending and Overdue tasks count
function GetDeptProjCount() {
    var pendingCounter = 0;
    var overdueCounter = 0;
    var CurrentDate = new Date();
    CurrentDate = CurrentDate.setHours(0, 0, 0, 0);
    CurrentDate = new Date(CurrentDate)
    for (var i = 0; i < arrLimitTaskDeptProj.length; i++) {
        var DueDate = new Date(moment(arrLimitTaskDeptProj[i].DueDate.split('T')[0]).format("MM/DD/YYYY"));
        DueDate.setDate(DueDate.getDate());
        DueDate = new Date(DueDate);

        if (arrLimitTaskDeptProj[i].CurrentPhase == "Open") {
            if (DueDate >= CurrentDate) {
                pendingCounter++;
            }
            else {
                overdueCounter++;
            }
        }
    }

    $("#TaskOverdueDeptProj").text(overdueCounter);
    $("#TaskPendingDeptProj").text(pendingCounter);
}

//get Pending and Overdue tasks count
function GetDeptEmpCount() {
    var pendingCounter = 0;
    var overdueCounter = 0;
    var CurrentDate = new Date();
    CurrentDate = CurrentDate.setHours(0, 0, 0, 0);
    CurrentDate = new Date(CurrentDate);
    for (var i = 0; i < arrLimitTaskDeptEmp.length; i++) {
        var DueDate = new Date(moment(arrLimitTaskDeptEmp[i].DueDate.split('T')[0]).format("MM/DD/YYYY"));
        DueDate.setDate(DueDate.getDate());
        DueDate = new Date(DueDate);
        if (arrLimitTaskDeptEmp[i].CurrentPhase == "Open") {
            if (DueDate >= CurrentDate) {
                pendingCounter++;
            }
            else {
                overdueCounter++;
            }
        }
    }
    $("#TaskOverdueDeptEmp").text(overdueCounter);
    $("#TaskPendingDeptEmp").text(pendingCounter);
}


//to bind all project type in Filter Popup
function bindAllWorkType() {
    $("#WorkTypeOfProject").empty();
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$select=CategoryType,CatogeryName&$orderby=CatogeryName asc&$filter=CategoryType eq 'Work Type'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (response) {
            $('<option value="All">All</option>').appendTo("#WorkTypeOfProject");
            $('<option value="All">All</option>').appendTo("#WorkTypeOfProjectOutbox");
            for (var index = 0; index < response.d.results.length; index++) {
                $("#WorkTypeOfProject").append('<option value="' + response.d.results[index].CatogeryName + '">' + response.d.results[index].CatogeryName + '</option>');
            }
        }, myError: function (response) {
            waitingDialog.hide();
        }
    });
}

//get modules for project
function CurrentProjectModule(projectid) {
    $('#ProjectModule').attr('disabled', false);
    $("#ProjectModule").empty();
    $('<option value="All">All</option>').appendTo("#ProjectModule");
    var listName = 'ProjectModules';
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,Title,Project/ID,Project/ProjectName&$expand=Project&$filter= ProjectId eq '" + projectid + "'";
    $.ajax({
        url: siteURL,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;

            $.each(valuesArray, function (i, el) {
                option += "<option value='" + el.ID + "'>" + el.Title + "</option>";
            });

            $("#ProjectModule").append(option);
        },
        error: function (data) {
            console.log(data.responseJSON.error);
        }
    });
}

//Filter the data through array
function MutipleBaseFilter(TaskOutCome) {
    var arrTemp = [];
    var arrFiltered = [];
    if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptProj") {
        $("#SeeMoreDeptProj").hide();
        $("#SeeMoreFilterDeptProj").show();
        arrFilterDeptProj = [];
        arrFiltered = arrLimitTaskDeptProj.filter(function (f) { return f; });
    }
    else if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptEmp") {
        $("#SeeMoreDeptEmp").hide();
        $("#SeeMoreFilterDeptEmp").show();
        arrFilterDeptEmp = [];
        arrFiltered = arrLimitTaskDeptEmp.filter(function (f) { return f; });
    }
    else {
        $("#SeeMoreInbox").hide();
        $("#SeeMoreFilterInbox").show();
        arrFilterDataBind = [];
        arrFiltered = arrAllTaskUserWise.filter(function (f) { return f; });
    }

    var TaskinboxChip = "",
    	ModuleId = '',
    	ClientId = '',
        FilterQuery = "",
        assigntoQuery = '',
        assigntobyme = [];

    if ($("#pplassigntoInbox_TopSpan_ResolvedList").text() != "") {
        getUserInformation('pplassigntoInbox');
    }
    else {
        assignByEmail = "";
    }

    //Filter value display ends
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    arrTemp = arrFiltered.filter(function (obj, index) { //Filter array
        FilterQuery = '';

        if ($('#UserAllProject').val() != "All") {
            if ($('#UserAllProject').val() == "General Task") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.ProjectFullName != "" : obj.ProjectFullName == ProjectValue);
            }
            else {
                if ($('#ddlInboxProject').val() != "All") {
                    var ProjectFilter = (ProjectValue == "All" ? obj.ProjectName != "" : obj.ProjectName == $('#ddlInboxProject').val());
                }
                else {
                    var ProjectValue = null;
                    var ProjectFilter = (ProjectValue == "All" ? obj.ProjectFullName != "" : obj.ProjectFullName != ProjectValue);
                }
            }
        }
        else {
            var ProjectValue = "All";
            var ProjectFilter = (ProjectValue == "All" ? obj.ProjectFullName != "" : obj.ProjectFullName == ProjectValue);
        }

        if ($('#ProjectModule').val() != "All") {
            var ModuleValue = $('#ProjectModule').val();
        }
        else {
            var ModuleValue = "All";
        }

        if ($('#ddlInboxClient').val() != "All") {
            var ClientValue = $('#ddlInboxClient').val();
        }
        else {
            var ClientValue = "All";
        }

        if ($('#WorkTypeOfProject').val() != "All") {
            var WorkTypeValue = $('#WorkTypeOfProject').val()
        }
        else {
            var WorkTypeValue = "All"
        }

        if ($('#txtPriority').val() != "All") {
            var PriorityValue = $('#txtPriority').val();
        }
        else {
            var PriorityValue = "All";
        }
        if ($('#txtFilterStatusInbox').val() != "All") {
            var CurrentPhaseValue = $('#txtFilterStatusInbox').val();
        }
        else {
            var CurrentPhaseValue = "All";
        }

        if ($('#taskIn').val() != null && $('#taskIn').val() != "") {
            var DueDate = $("#taskIn").val();
            var dateDueDate = new Date($("#taskIn").val()).setHours(0, 0, 0, 0);//moment($("#taskIn").val()).format('MM/DD/YYYY');
            dateDueDate = new Date(dateDueDate);
            var arrDueDate = new Date(moment(obj.DueDate.split('T')[0]).format("MM/DD/YYYY"));//moment(obj.DueDate).format('MM/DD/YYYY');
            arrDueDate.setDate(arrDueDate.getDate() + 1);
            arrDueDate = new Date(arrDueDate);
            if (TaskOutCome == "TaskPending") {
                var DueDateFilter = (dateDueDate == "" ? arrDueDate != "" : arrDueDate >= dateDueDate);
            }
            else if (TaskOutCome == "TaskOverdue") {
                var DueDateFilter = (dateDueDate == "" ? arrDueDate != "" : arrDueDate < dateDueDate);
            }
            else {
                var DueDateFilter = (dateDueDate == "" ? arrDueDate != "" : arrDueDate <= dateDueDate);
            }
        }
        else {
            var DueDateFilter = true;
        }

        assigntoQuery = '';
        var StringAssigntoQuery = [];

        if (assignByEmail != "") {
            var FilterAssignByEmail = assignByEmail.split('|');
            FilterAssignByEmail.pop(); //remove last element of array.
            for (var i = 0; i < FilterAssignByEmail.length; i++) {
                if (FilterAssignByEmail[i].indexOf("#") != -1) {
                    FilterAssignByEmail[i] = FilterAssignByEmail[i].split("#")[0];
                    FilterAssignByEmail[i] = FilterAssignByEmail[i].replace("_", "@");
                }
                if (i == 0) {
                    StringAssigntoQuery.push(obj.AssignedBy.EMail.toLowerCase() == FilterAssignByEmail[i].toLowerCase());
                }
                else {
                    StringAssigntoQuery.push(obj.AssignedBy.EMail.toLowerCase() == FilterAssignByEmail[i].toLowerCase());
                }
            }
        }
        else {
            var assigntobyme = [];
            StringAssigntoQuery.push(true);
        }

        StringAssigntoQuery.forEach(function (entry, index) {
            if (index == 0) {
                assigntoQuery = entry;
            }
            else {
                assigntoQuery = entry || assigntoQuery;
            }
        });
        if (obj.Module != null) {
            ModuleId = obj.Module.ID ? obj.Module.ID : "";
        }
        else {
            ModuleId = ''
        }
        if (obj.ClientID != null) {
            ClientId = obj.ClientID.ID;
        }
        else {
            ClientId = '';
        }
        return (ProjectFilter) &&
                (ClientValue == "All" ? ClientId != "null" : ClientId == ClientValue) &&
                (ModuleValue == "All" ? ModuleId != "null" : ModuleId == ModuleValue) &&
                (WorkTypeValue == "All" ? obj.Worktype != "" : obj.Worktype == WorkTypeValue) &&
                (CurrentPhaseValue == "All" ? obj.CurrentPhase != "" : obj.CurrentPhase == CurrentPhaseValue) &&
                (PriorityValue == "All" ? obj.TaskPriority != "" : obj.TaskPriority == PriorityValue) &&
                (DueDateFilter) &&
                (assigntoQuery)
    });

    var arrDataBind = [];
    $("#myTaskInboxChip").empty();
    $("#myTaskInboxChip").append(TaskinboxChip);
    //Cloning array
    if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptProj") {
        arrDataBind = arrFilterDeptProj = arrTemp.filter(function (f) { return f; });
        if (arrDataBind.length >= 500) {
            $("#TotalTaskCountDeptProj").text(arrDataBind.length);
            arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
            $("#ShowTotalItemsDeptProj").hide();
            $("#ShowItemsDeptProj").show();
            $("#TaskCountDeptProj").text("500");
            $("#SeeMoreFilterDeptProj").show();
        }
        else {
            $("#ShowTotalItemsDeptProj").show();
            $("#ShowItemsDeptProj").hide();
            $("#TotalItemscountDeptProj").text(arrDataBind.length);
            $("#SeeMoreFilterDeptProj").hide();
        }
        $("#mainDivAllDeptProj").empty();
        BindInboxTasks(arrDataBind, 'mainDivAllDeptProj', 'DeptProjects');
    }
    else if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptEmp") {
        arrDataBind = arrFilterDeptEmp = arrTemp.filter(function (f) { return f; });

        if (arrDataBind.length >= 500) {
            $("#TotalTaskCountDeptEmp").text(arrDataBind.length);
            arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
            $("#ShowTotalItemsDeptEmp").hide();
            $("#ShowItemsDeptEmp").show();
            $("#TaskCountDeptEmp").text("500");
            $("#SeeMoreFilterDeptEmp").show();
        }
        else {
            $("#ShowTotalItemsDeptEmp").show();
            $("#ShowItemsDeptEmp").hide();
            $("#TotalItemscountDeptEmp").text(arrDataBind.length);
            $("#SeeMoreFilterDeptEmp").hide();
        }
        $("#mainDivAllDeptEmp").empty();
        BindInboxTasks(arrDataBind, 'mainDivAllDeptEmp', 'DeptEmps');
    }
    else {
        arrDataBind = arrFilterDataBind = arrTemp.filter(function (f) { return f; });
        if (arrDataBind.length >= 500) {
            $("#TotalTaskCount").text(arrDataBind.length);
            arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
            $("#ShowTotalItemsInbox").hide();
            $("#ShowItemsInbox").show();
            $("#DiplayTaskCount").text("500");

            $("#SeeMoreFilterInbox").show();
        }
        else {
            $("#ShowTotalItemsInbox").show();
            $("#ShowItemsInbox").hide();
            $("#TotalItemscount").text(arrDataBind.length);
            $("#SeeMoreFilterInbox").hide();
        }
        $("#mainDivAllAnnouncements").empty();
        BindInboxTasks(arrDataBind, 'mainDivAllAnnouncements', 'MySubordinate');
    }
}


function OpenIframeTask(Action) {
    src = Action.name;
    var container = $("#doc-viewer").empty();
    $('<iframe>', {
        src: src,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
}


//reset the table data and clear the FIlter modal boxes value
function ClearFilter() {
    $('#UserAllProject').val("All");
    $("#UserAllProject").trigger("change");
    $('#ProjectModule').val("All");
    $('#WorkTypeOfProject').val("All");
    $('#txtPriority').val("All");
    $('#ddlInboxClient').empty().append("<option value='All'>All</option>");
    $('#ddlInboxProject').empty().append("<option value='All'>All</option>");
    $('#taskIn').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusInbox').val("Open");
    clearPeoplePickerControl("pplassigntoInbox");
    currentPhase = "Open";
    TaskAction = "PageLoad";

    //Bind the page load data


    if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptProj") {
        $("#mainDivAllDeptProj").empty();
        $("#SeeMoreFilterDeptProj").hide();
        var arrDataBind = [];
        //Cloning array
        arrDataBind = arrLimitTaskDeptProj.filter(function (f) { return f; });
        //Showing data out of total
        if (arrDataBind.length >= 500) {
            $("#TotalTaskCountDeptProj").text(arrDataBind.length);
            arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
            $("#ShowTotalItemsDeptProj").hide();
            $("#ShowItemsDeptProj").show();
            $("#TaskCountDeptProj").text("500");
            $("#SeeMoreDeptProj").show();
        }
        else {
            $("#ShowTotalItemsDeptProj").show();
            $("#ShowItemsDeptProj").hide();
            $("#TotalItemscountDeptProj").text(arrDataBind.length);
            $("#SeeMoreDeptProj").hide();
        }
        BindInboxTasks(arrDataBind, 'mainDivAllDeptProj', 'DeptProjects');

        if (arrDataBind.length == 0) {
            $(".NoRecordFound").show();
            $("#SeeMoreDeptProj").hide();
        }
        else {
            $(".NoRecordFound").hide();
        }
    }
    else if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptEmp") {
        $("#mainDivAllDeptEmp").empty();
        $("#SeeMoreFilterDeptEmp").hide();
        var arrDataBind = [];
        //Cloning array
        arrDataBind = arrLimitTaskDeptEmp.filter(function (f) { return f; });
        //Showing data out of total
        if (arrDataBind.length >= 500) {
            $("#TotalTaskCountDeptEmp").text(arrDataBind.length);
            arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
            $("#ShowTotalItemsDeptEmp").hide();
            $("#ShowItemsDeptEmp").show();
            $("#TaskCountDeptEmp").text("500");
            $("#SeeMoreDeptEmp").show();
        }
        else {
            $("#ShowTotalItemsDeptEmp").show();
            $("#ShowItemsDeptEmp").hide();
            $("#TotalItemscountDeptEmp").text(arrDataBind.length);
            $("#SeeMoreDeptEmp").hide();
        }
        BindInboxTasks(arrDataBind, 'mainDivAllDeptEmp', 'DeptEmps');
        if (arrDataBind.length == 0) {
            $(".NoRecordFound").show();
            $("#SeeMoreDeptEmp").hide();
        }
        else {
            $(".NoRecordFound").hide();
        }
    }
    else {
        $("#mainDivAllAnnouncements").empty();
        $("#SeeMoreFilterInbox").hide();
        var arrDataBind = [];
        //Cloning array
        arrDataBind = arrLimitTaskInbox.filter(function (f) { return f; });
        //Showing data out of total
        if (arrDataBind.length >= 500) {
            $("#TotalTaskCount").text(arrDataBind.length);
            arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
            $("#ShowTotalItemsInbox").hide();
            $("#ShowItemsInbox").show();
            $("#DiplayTaskCount").text("500");
            $("#SeeMoreInbox").show();
        }
        else {
            $("#ShowTotalItemsInbox").show();
            $("#ShowItemsInbox").hide();
            $("#TotalItemscount").text(arrDataBind.length);
            $("#SeeMoreInbox").hide();
        }

        BindInboxTasks(arrDataBind, 'mainDivAllAnnouncements', 'MySubordinate');

        if (arrDataBind.length == 0) {
            $(".NoRecordFound").show();
            $("#SeeMoreInbox").hide();
        }
        else {
            $(".NoRecordFound").hide();
        }
    }
}

//to genrate excel of Task In table
function generateTaskInExcel() {
    var FileName = '';
    var HTMLId = '';
    if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptProj") {
        FileName = "Departmental-Projects";
        HTMLId = "TempTableDeptProj";
    }
    else if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptEmp") {
        FileName = "Departmental-Employees";
        HTMLId = "TempTableDeptEmp";
    }
    else {
        FileName = "Subordinate-Tasks_" + $("#SelectedEmpName").text();
        HTMLId = "TempTableQuestions";
    }

    $('#' + HTMLId).tableExport({
        //type: 'excel',
        type: 'csv',
        exportHiddenCells: true,
        fileName: FileName,
        ignoreColumn: [0, 1, 6, 8, 9, 10, 13],
    });
    currentDlg.close();
}

//get data on 'Task Pending' click
function SetTaskPending() {
    if ($('#WorkTypeOfProject option').length == 0) {
        bindAllWorkType();
    }
    $('#UserAllProject').val("All");
    $("#UserAllProject").trigger("change");
    $('#ProjectModule').val("All");
    $('#WorkTypeOfProject').val("All");
    $('#txtPriority').val("All");
    $('#ddlInboxClient').empty().append("<option value='All'>All</option>");
    $('#ddlInboxProject').empty().append("<option value='All'>All</option>");
    $('#taskIn').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusInbox').val("Open");
    clearPeoplePickerControl("pplassigntoInbox");
    currentPhase = "Open";
    TaskAction = "PageLoad";
    $('#txtFilterStatusInbox option').filter(function () {
        return ($(this).text() == "Open"); //To select text wise
    }).prop('selected', true)
    document.getElementById("taskIn").valueAsDate = new Date();
    MutipleBaseFilter("TaskPending");
}

//get data on 'Task Overdue' click
function SetTaskOverdue(TabName) {
    if ($('#WorkTypeOfProject option').length == 0) {
        bindAllWorkType();
    }
    $('#UserAllProject').val("All");
    $("#UserAllProject").trigger("change");
    $('#ProjectModule').val("All");
    $('#WorkTypeOfProject').val("All");
    $('#txtPriority').val("All");
    $('#ddlInboxClient').empty().append("<option value='All'>All</option>");
    $('#ddlInboxProject').empty().append("<option value='All'>All</option>");
    $('#taskIn').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusInbox').val("Open");
    //$('#assigntodrp').val(_spPageContextInfo.userId);
    clearPeoplePickerControl("pplassigntoInbox");
    currentPhase = "Open";
    TaskAction = "PageLoad";

    $('#txtFilterStatusInbox option').filter(function () {
        return ($(this).text() == "Open"); //To select text wise
    }).prop('selected', true)
    document.getElementById("taskIn").valueAsDate = new Date();
    MutipleBaseFilter("TaskOverdue");

}


//filter data on status when data click and chat segment
function clickInboxChart(Action, TabName) {
    if ($('#WorkTypeOfProject option').length == 0) {
        bindAllWorkType();
    }
    $('#UserAllProject').val("All");
    $("#UserAllProject").trigger("change");
    $('#ProjectModule').val("All");
    $('#WorkTypeOfProject').val("All");
    $('#txtPriority').val("All");
    $('#ddlInboxClient').empty().append("<option value='All'>All</option>");
    $('#ddlInboxProject').empty().append("<option value='All'>All</option>");
    $('#taskIn').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusInbox').val("Open");
    clearPeoplePickerControl("pplassigntoInbox");
    currentPhase = "Open";
    TaskAction = "PageLoad";

    $('#txtFilterStatusInbox option').filter(function () {
        return ($(this).text() == Action.data.label); //To select Blue
    }).prop('selected', true)
    MutipleBaseFilter("PieChart");
}

//Read department for projects Inbox
function ReadInDepartment() {
    var splittedDeptName = "";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?select=ID,Title&$filter=CompanyID eq '" + Logged_CompanyId + "'&$top=5000&$orderby=Title asc";
    $.ajax({
        url: Ownurl,
        async: false,
        headers: { Accept: "application/json;odata=verbose" },
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                $('#DeptsInboxProject').empty();
                $("#DeptsInboxProject").append($("<option></option>").val("All").html("All"));
                for (i = 0; i < items.length; i++) {
                    if (parseInt(items[i].Title.length) > 34) {
                        splittedDeptName = items[i].Title.substring(0, 34) + "...";
                    }
                    else {
                        splittedDeptName = items[i].Title;
                    }
                    $("#DeptsInboxProject").append('<option value="' + items[i].Title + '" title="' + items[i].Title + '">' + splittedDeptName + '</option>');
                }
                $("#DeptsInboxProject").val("All");

            }
        },
        error: function (data) {
            if (currentDlg != "") {
                currentDlg.close();
            }
            console.log("An error occurred in ReadInDepartment method." + data);
        }
    });
}


//get list of projects for Inbox
function loadprojectInsearch() {
    var ProjectsListunique = '';
    var ProjectsList = [];
    var tableItemsHTML = '';
    var CountProject = 0;
    var RestQuery = "?$select=*,TeamMember/EMail&$top=5000&$expand=TeamMember&$filter=TeamMember/EMail eq ('" + _spPageContextInfo.userEmail + "') and Status eq 'Active' and TaskPermission eq '1'&$orderby=Project asc";
    $.when(getLimitedItems("ProjectTeamDetails", RestQuery)).done(function (Results) {
        var items = Results.results;
        for (var x = 0; x < items.length; x++) {
            ProjectsList.push(items[x].ProjectId);
        }
        ProjectsListunique = ProjectsList.filter(function (itm, i, ProjectsList) {
            return i == ProjectsList.indexOf(itm);
        });
    });
    if (ProjectsListunique.length > 0) {
        var UserProjectList = [];
        for (var K = 0; K < ProjectsListunique.length; K++) {
            var PROJID = ProjectsListunique[K];
            var sTatuS = $('select#StatusInProj option:selected').val();
            var Department = $('select#DeptsInboxProject option:selected').val();

            if (sTatuS != "All") {
                if (Department != "All") {
                    var RestQuery = "?$select=*,ManagerName/Title,ManagerName/EMail,ClientID/Title,Office_Location_Id/Title&$expand=ManagerName,ClientID,Office_Location_Id&$filter=Status eq ('" + sTatuS + "') and DepartmentName eq ('" + Department + "')and ID eq '" + PROJID + "' ";
                }
                else {
                    var RestQuery = "?$select=*,ManagerName/Title,ManagerName/EMail,ClientID/Title,Office_Location_Id/Title&$expand=ManagerName,ClientID,Office_Location_Id&$filter=Status eq ('" + sTatuS + "') and ID eq '" + PROJID + "' ";
                }
            }
            else {
                if (Department != "All") {
                    var RestQuery = "?$select=*,ManagerName/Title,ManagerName/EMail,ClientID/Title,Office_Location_Id/Title&$expand=ManagerName,ClientID,Office_Location_Id&$filter=DepartmentName eq ('" + Department + "')and ID eq '" + PROJID + "'";
                }
                else {
                    var RestQuery = "?$select=*,ManagerName/Title,ManagerName/EMail,ClientID/Title,Office_Location_Id/Title&$expand=ManagerName,ClientID,Office_Location_Id&$filter=ID eq '" + PROJID + "'";
                }
            }

            $.when(getLimitedItems("ProjectDetails", RestQuery)).done(function (ProjDetails) {
                var items = ProjDetails.results;
                IsInboxProjectBind = true;
                if (items.length > 0) {
                    for (var i = 0; i < items.length; i++) {
                        var itemId = items[i].ID;
                        if (items[i].Status == "Live") {
                            colorCss = "livcolor";
                        }
                        else if (items[i].Status == "OnHold") {
                            colorCss = "holdcolor";
                        }
                        else if (items[i].Status == "Completed") {
                            colorCss = "Completecolor";
                        }
                        else {
                            colorCss = "Terminatedcolor";
                        }
                        var ProjectName = items[i].ProjectName;
                        if (items[i].ProjectName.length > 120) {
                            ProjectName = ProjectName.substring(0, 120);
                        }
                        var ClientName = items[i].ClientID.Title;
                        if (items[i].ClientID.Title.length > 120) {
                            ClientName = ClientName.substring(0, 120);
                        }
                        var ProjectCode = (items[i].ProjectCode ? items[i].ProjectCode : '');
                        if (ProjectCode.length > 30) {
                            ProjectCode = ProjectCode.substring(0, 30);
                        }
                        //get Employee Details
                        CountProject++;
                        var attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[i].ManagerName.EMail);
                        tableItemsHTML += "<tr><td><input type='radio' class='ProjectInchkList' name='TaskInListchk' title='" + items[i].ProjectName + "' value='" + itemId + "'></td>";
                        tableItemsHTML += "<td><p class='pjecname'>" + ProjectName + "</p><span class='spanmg'>Ref:</span><span class='spanmg projectlg'>" + ProjectCode + "</span></td>";
                        tableItemsHTML += "<td><p class='customernamshow'>" + ClientName + "</p><span class='spanmg'>Status:</span> <span class='spanmg " + colorCss + "'>" + items[i].Status + "</span></td>";
                        tableItemsHTML += "<td><div class='managersec'><div class='mangimg'><img src=" + attachmentUrl + " alt=''></div><div class='managerdetails'>";
                        tableItemsHTML += "<h4>" + items[i].ManagerName.Title + "</h4><div class='mailsec'><span onclick='OpenEmail(this)'>" + items[i].ManagerName.EMail + "</span></div>";
                        tableItemsHTML += "</div></div></td>";
                        tableItemsHTML += '</tr>';
                    }
                }
            });
        }
        $("#ProjectInTables").empty().append(tableItemsHTML);
        $("#tablelocation").show();
        if (CountProject == 0) {
            tableItemsHTML += "<tr><td class='NoRecordFound' colspan='4' style='text-align: center;font-size:14px;' data-localize='NoRecordFound'>No record found!!</td></tr>"
            $("#ProjectInTables").empty().append(tableItemsHTML);
            $("#tableInLocation").hide()
        }
        else {
            TableConfigInboxProject();
            $("#tableInLocation").show();
        }
    }
    if (currentDlg != "") {
        currentDlg.close();
    }
}

function TableConfigInboxProject() {
    sorter = new TINY.table.sorter('sorter', 'TableInProjects', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
        colddid: 'columnsInbox',
        currentid: 'currentInProj',
        totalid: 'totalInProj',
        startingrecid: 'startInrecord',
        endingrecid: 'endInrecord',
        totalrecid: 'totalInrecords',
        hoverid: 'selectedrow',
        pageddid: 'pageddlInProject',
        navid: 'tableInnav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

function setInboxProjectValue() {
    if ($('input[name="TaskInListchk"]:checked')[0] != null) {
        $("#ddlInboxProject").html('');
        var customerValue = $('input[name="TaskInListchk"]:checked')[0].attributes.title.value;
        var value = '<option value="' + $('input[name="TaskInListchk"]:checked').val() + '" Selected>' + customerValue + '</option>';
        $("#ddlInboxProject").append(value);
        $("#ProjectInboxSearch").modal('hide');
        projectid = $('input[name="TaskInListchk"]:checked').val();
        if (projectid != "General Task" && projectid != "All") {
            CurrentProjectModule(projectid);
        }
        else {
            $('#ProjectModule').attr('disabled', true);
            $("#ProjectModule").empty();
            $('<option value="All">All</option>').appendTo("#ProjectModule");
        }
    }
}

//set client value and ID
function setCustomerValue() {
    $("#ddlInboxClient").html('');
    var customerValue = $('input[name="Customer"]:checked')[0].attributes.title.value;
    var value = '<option value="' + $('input[name="Customer"]:checked').val() + '" Selected>' + customerValue + '</option>';
    $("#ddlInboxClient").append(value);
    $("#otherCustomerSearch").modal('hide');
}


//get list-items from list upto 5000 only
function getLimitedEmployeess(ListName, Query) {
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
            DeferredObj.resolve(data.d.results);
        },
        error: function (error) {
            HandleError(JSON.stringify(error));
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};
function TableConfiguration() {
    sorter = new TINY.table.sorter('sorter', 'TempTableQuestions', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columns',
        currentid: 'currentpage',
        totalid: 'totalpages',
        startingrecid: 'startrecord',
        endingrecid: 'endrecord',
        totalrecid: 'totalrecords',
        hoverid: 'selectedrow',
        pageddid: 'pageDropDownInbox',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true

    });
}

function TableConfigurationDeptProj() {
    sorterDept = new TINY.table.sorter('sorterDept', 'TempTableDeptProj', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columnsDeptProj',
        currentid: 'currentpageDeptProj',
        totalid: 'totalpagesDeptProj',
        startingrecid: 'startrecordDeptProj',
        endingrecid: 'endrecordDeptProj',
        totalrecid: 'totalrecordsDeptProj',
        hoverid: 'selectedrow',
        pageddid: 'pageDropDownDeptProj',
        navid: 'tablenavDeptProj',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

function TableConfigDeptEmp() {
    sorterDeptEmp = new TINY.table.sorter('sorterDeptEmp', 'TempTableDeptEmp', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columnsDeptEmp',
        currentid: 'currentpageDeptEmp',
        totalid: 'totalpagesDeptEmp',
        startingrecid: 'startrecordDeptEmp',
        endingrecid: 'endrecordDeptEmp',
        totalrecid: 'totalrecordsDeptEmp',
        hoverid: 'selectedrow',
        pageddid: 'pageDropDownDeptEmp',
        navid: 'tablenavDeptEmp',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

function OpenEmail(Email) {
    var dlgTitle = 'Loading...';
    var dlgMsg = '<br />Please wait!!';
    var dlgHeight = 200;
    var dlgWidth = 400;
    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
    setTimeout(function () {
        window.location = "mailto:" + Email.textContent;
        currentDlg.close();
    }, 100);
}

//to check if user has subordinates 
function checkForSubordinates(userEmail) {
    var HasSubordinates = false;
    var Query = "?$top=5000&$select=Status,ManagerLoginName/EMail,Company/Id&$expand=Company,ManagerLoginName&$filter=ManagerLoginName/EMail eq '" + userEmail + "' and Status eq 'Active' and Company/Id eq '" + Logged_CompanyId + "' ";
    $.when(getLimitedEmployeess('Employees', Query)).done(function (Subordinates) {
        if (Subordinates.length > 0) {
            HasSubordinates = true;
        }
    });
    return HasSubordinates;
}


//Check if logged-In user is HOD or not
function checkHOD() {
    var Query = "?$top=5000&$select=Id,Title,WebPartName,Contributors/EMail,Contributors/Id,Contributors/Title,Company/Id,Department/Id,Department/Title&$expand=Contributors,Company,Department&$filter=Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' and WebPartName eq 'Head of the department' and Company/Id eq '" + Logged_CompanyId + "' ";
    $.when(getLimitedItems('ProcessApprovers', Query)).done(function (ProcessApprovers) {
        ProcessApprovers = ProcessApprovers.results;
        if (ProcessApprovers.length) {
            for (var dept = 0; dept < ProcessApprovers.length; dept++) {
                $(".ddlDeptHOD").append('<option value="' + ProcessApprovers[dept].Department.Id + '">' + ProcessApprovers[dept].Department.Title + '</option>')
            }
            DepartmentalProjTasks("PageLoad", ProcessApprovers[0].Department.Id);
            getDeptEmployee(ProcessApprovers[0].Department.Id);
        }
        else {
            $("#ParentDeptProj").empty().append('<a href="javscript:void(0);">Departmental Projects</a>');
            $("#ParentDeptEmp").empty().append('<a href="javscript:void(0);">Departmental Employees</a>');
        }
    });
}

//Project table sort
function SortProjectTable(Name) {
    if (Name == "Project Name") {
        $("#ProjectSort").trigger("click");
    }
    else if (Name == "Customer") {
        $("#CustomerProjSort").trigger("click");
    }
}

//Get Departmental Projects
function DepartmentalProjTasks(TaskAction, DeptId) {
    $("#SeeMoreDeptProj").hide();
    var ProjDeptId = '';
    var restQuery,
	    arrDataBind = [];
    if (TaskAction == "PageLoad") {
        arrFilterDeptProj = [];
        //Start getting tasks 
        $("#mainDivAllDeptProj").empty();
        arrLimitTaskDeptProj = AllTaskInbox.filter(function (obj) { //Filter array on the basis of Department Id
            if (obj.ProjectID != null) {
                ProjDeptId = obj.ProjectID.DepartmentId;
            }
            else {
                ProjDeptId = '';
            }
            return DeptId == "" ? ProjDeptId != "null" : ProjDeptId == DeptId
            //return obj.ProjectID.DepartmentId == DeptId;
        });
        arrDataBind = arrLimitTaskDeptProj.filter(function (obj) { //Filter array on the basis of CurrentPhase - Open   
            return (obj.CurrentPhase == "Open")
        });
        //Showing data out of total
        if (arrDataBind.length >= 500) {
            $("#TotalTaskCountDeptProj").text(arrDataBind.length);
            arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
            $("#ShowTotalItemsDeptProj").hide();
            $("#ShowItemsDeptProj").show();
            $("#TaskCountDeptProj").text("500");
            $("#SeeMoreDeptProj").show();
        }
        else {
            $("#ShowTotalItemsDeptProj").show();
            $("#ShowItemsDeptProj").hide();
            $("#TotalItemscountDeptProj").text(arrDataBind.length);
            $("#SeeMoreDeptProj").hide();
        }
        BindInboxTasks(arrDataBind, 'mainDivAllDeptProj', 'DeptProjects');

        if (arrDataBind.length == 0) {
            $("#SeeMoreDeptProj").hide();
        }
        else {
            //$(".NoRecordFound").hide();
        }
        ShowPieChartDeptProj();
        GetDeptProjCount();
    }
    else {
        arrDataBind = arrLimitTaskDeptProj.slice(parseInt($("#TaskCountDeptProj").text()), (parseInt($("#TaskCountDeptProj").text()) + 500)); //get 500 elements at first call
        BindInboxTasks(arrDataBind, 'mainDivAllDeptProj', 'DeptProjects');

        if (arrLimitTaskDeptProj.length <= (parseInt($("#TaskCountDeptProj").text()) + 500)) {
            $("#ShowTotalItemsDeptProj").show();
            $("#ShowItemsDeptProj").hide();
            $("#TotalItemscountDeptProj").text(arrLimitTaskDeptProj.length);
            $("#SeeMoreDeptProj").hide();
        }
        else {
            var currentDisplayCOunt = parseInt($("#TaskCountDeptProj").text()) + 500;
            $("#ShowTotalItemsDeptProj").hide();
            $("#ShowItemsDeptProj").show();
            $("#TaskCountDeptProj").text(currentDisplayCOunt.toString());
            $("#TotalTaskCountDeptProj").text(arrLimitTaskDeptProj.length);
            $("#SeeMoreDeptProj").show();
        }
    }
}


//Get Tasks of all Current Department's
function DeptEmpTasks(TaskAction, arrEmps) {
    $("#SeeMoreDeptEmp").hide();
    //var ProjDeptId = '';
    var restQuery,
        arrTemp = [];
	    
    if (TaskAction == "PageLoad") {
        arrFilterDeptEmp = [];
        arrLimitTaskDeptEmp = [];
        //Start getting tasks 
        $("#mainDivAllDeptEmp").empty();
        for (var emp = 0; emp < arrEmps.length; emp++) {
            arrTemp = AllTaskInbox.filter(function (obj) { //Filter array on the basis of Department Id
                var arrAssigntoQuery = [];
                var arrDependencyQuery = [];
                var AssigntoQuery = true;
                var DependencyQuery = true;
                for (var i = 0; i < obj.TaskAssignTo.length; i++) {
                    if (obj.TaskAssignTo[i].EMail.indexOf("#") != -1) {
                        obj.TaskAssignTo[i].EMail = obj.TaskAssignTo[i].EMail.split("#")[0];
                        obj.TaskAssignTo[i].EMail = obj.TaskAssignTo[i].EMail.replace("_", "@");
                    }
                    arrAssigntoQuery.push(obj.TaskAssignTo[i].EMail.toLowerCase().trim() == arrEmps[emp].Email.toLowerCase().trim());
                }
                arrAssigntoQuery.forEach(function (entry, index) {
                    if (index == 0) {
                        AssigntoQuery = entry;
                    }
                    else {
                        AssigntoQuery = entry || AssigntoQuery;
                    }
                });
                if (obj.DependencyTo != null) {
                    for (var j = 0; j < obj.DependencyTo.length; j++) {
                        if (obj.DependencyTo[j].EMail.indexOf("#") != -1) {
                            obj.DependencyTo[j].EMail = obj.DependencyTo[j].EMail.split("#")[0];
                            obj.DependencyTo[j].EMail = obj.DependencyTo[j].EMail.replace("_", "@");
                        }
                        arrDependencyQuery.push(obj.DependencyTo[j].EMail.toLowerCase().trim() == arrEmps[emp].Email.toLowerCase().trim());
                    }
                }
                else {
                    DependencyQuery = false;
                }
                arrDependencyQuery.forEach(function (entry, index) {
                    if (index == 0) {
                        DependencyQuery = entry;
                    }
                    else {
                        DependencyQuery = entry || DependencyQuery;
                    }
                });
                return (AssigntoQuery || DependencyQuery);
            });
            arrLimitTaskDeptEmp = arrLimitTaskDeptEmp.concat(arrTemp);
            arrTemp = [];
        }
        arrDataBind = arrLimitTaskDeptEmp.filter(function (obj) { //Filter array on the basis of CurrentPhase - Open   
            return (obj.CurrentPhase == "Open")
        });
        //Showing data out of total
        if (arrDataBind.length >= 500) {
            $("#TotalTaskCountDeptEmp").text(arrDataBind.length);
            arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
            $("#ShowTotalItemsDeptEmp").hide();
            $("#ShowItemsDeptEmp").show();
            $("#TaskCountDeptEmp").text("500");
            $("#SeeMoreDeptEmp").show();
        }
        else {
            $("#ShowTotalItemsDeptEmp").show();
            $("#ShowItemsDeptEmp").hide();
            $("#TotalItemscountDeptEmp").text(arrDataBind.length);
            $("#SeeMoreDeptEmp").hide();
        }
        BindInboxTasks(arrDataBind, 'mainDivAllDeptEmp', 'DeptEmps');

        if (arrDataBind.length == 0) {
            $("#SeeMoreDeptEmp").hide();
        }
        else {
            //$(".NoRecordFound").hide();
        }
        ShowPieChartDeptEmp();
        GetDeptEmpCount();
    }
    else {
        arrDataBind = arrLimitTaskDeptEmp.slice(parseInt($("#TaskCountDeptEmp").text()), (parseInt($("#TaskCountDeptEmp").text()) + 500)); //get 500 elements at first call
        BindInboxTasks(arrDataBind, 'mainDivAllDeptEmp', 'DeptEmps');

        if (arrLimitTaskDeptEmp.length <= (parseInt($("#TaskCountDeptEmp").text()) + 500)) {
            $("#ShowTotalItemsDeptEmp").show();
            $("#ShowItemsDeptEmp").hide();
            $("#TotalItemscountDeptEmp").text(arrLimitTaskDeptEmp.length);
            $("#SeeMoreDeptEmp").hide();
        }
        else {
            var currentDisplayCOunt = parseInt($("#TaskCountDeptEmp").text()) + 500;
            $("#ShowTotalItemsDeptEmp").hide();
            $("#ShowItemsDeptEmp").show();
            $("#TaskCountDeptEmp").text(currentDisplayCOunt.toString());
            $("#TotalTaskCountDeptEmp").text(arrLimitTaskDeptEmp.length);
            $("#SeeMoreDeptEmp").show();
        }
    }
}

//make percentage wise pie chart for Dept-Projects
function ShowPieChartDeptProj() {
    var dfds = $.Deferred(),
		arrComplatedTasks = [],
    	arrOpenTasks = [],
    	arrHoldTasks = [],
    	arrCancelTasks = [],
    	arrCloseTasks = [],
    	TaskAssigneeMail = "",
    	TaskDependencyMail = "";
    $("#PieDeptProj").empty();

    if (arrLimitTaskDeptProj.length > 0) {
        $("#PieDeptProj").show();
        $(".blankcircleDeptProj").hide();
        arrComplatedTasks = arrLimitTaskDeptProj.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "completed"
        });
        arrOpenTasks = arrLimitTaskDeptProj.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "open"
        });
        arrHoldTasks = arrLimitTaskDeptProj.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "hold"
        });
        arrCancelTasks = arrLimitTaskDeptProj.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "cancelled"
        });
        arrCloseTasks = arrLimitTaskDeptProj.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "close"
        });
        if (arrComplatedTasks.length == 0 && arrOpenTasks.length == 0 && arrHoldTasks.length == 0 && arrCancelTasks.length == 0 && arrCloseTasks.length == 0) {
            $("#PieDeptProj").hide();
        }

        //});
        var pie = new d3pie("PieDeptProj", {
            header: {
                title: {
                    text: "",
                    fontSize: 30
                }
            },
            data: {
                content: [
                  { label: "Completed", value: arrComplatedTasks.length, valueType: "percentage" },
                  { label: "Open", value: arrOpenTasks.length, valueType: "percentage" },
                  { label: "Hold", value: arrHoldTasks.length, valueType: "percentage" },
                  { label: "Cancelled", value: arrCancelTasks.length, valueType: "percentage" },
                  { label: "Close", value: arrCloseTasks.length, valueType: "percentage" }
                ]
            },
            callbacks: {
                onload: null,
                onMouseoverSegment: null,
                onMouseoutSegment: null,
                onClickSegment: function (evt, item) {
                    clickInboxChart(evt);
                }
            }
        });
    }
    else {
        $("#PieDeptProj").hide();
        $(".blankcircleDeptProj").show();
    }
}


//make percentage wise pie chart for Dept-Employees
function ShowPieChartDeptEmp() {
    var dfds = $.Deferred(),
		arrComplatedTasks = [],
    	arrOpenTasks = [],
    	arrHoldTasks = [],
    	arrCancelTasks = [],
    	arrCloseTasks = [],
    	TaskAssigneeMail = "",
    	TaskDependencyMail = "";
    $("#PieDeptEmp").empty();

    if (arrLimitTaskDeptEmp.length > 0) {
        $("#PieDeptEmp").show();
        $(".blankcircleDeptEmp").hide();
        arrComplatedTasks = arrLimitTaskDeptEmp.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "completed"
        });
        arrOpenTasks = arrLimitTaskDeptEmp.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "open"
        });
        arrHoldTasks = arrLimitTaskDeptEmp.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "hold"
        });
        arrCancelTasks = arrLimitTaskDeptEmp.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "cancelled"
        });
        arrCloseTasks = arrLimitTaskDeptEmp.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "close"
        });
        if (arrComplatedTasks.length == 0 && arrOpenTasks.length == 0 && arrHoldTasks.length == 0 && arrCancelTasks.length == 0 && arrCloseTasks.length == 0) {
            $("#PieDeptEmp").hide();
        }

        //});
        var pie = new d3pie("PieDeptEmp", {
            header: {
                title: {
                    text: "",
                    fontSize: 30
                }
            },
            data: {
                content: [
                  { label: "Completed", value: arrComplatedTasks.length, valueType: "percentage" },
                  { label: "Open", value: arrOpenTasks.length, valueType: "percentage" },
                  { label: "Hold", value: arrHoldTasks.length, valueType: "percentage" },
                  { label: "Cancelled", value: arrCancelTasks.length, valueType: "percentage" },
                  { label: "Close", value: arrCloseTasks.length, valueType: "percentage" }
                ]
            },
            callbacks: {
                onload: null,
                onMouseoverSegment: null,
                onMouseoutSegment: null,
                onClickSegment: function (evt, item) {
                    clickInboxChart(evt);
                }
            }
        });
    }
    else {
        $("#PieDeptEmp").hide();
        $(".blankcircleDeptEmp").show();
    }
}

//function Sort 'MySubordinate', "Departmental Projects" and Departmental Employees Table
function SortTable(Name) {
    if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptProj") {
        if (Name == "Task Name") {
            $("#TaskNameDeptProj").trigger("click");
        }
        else if (Name == "Recent Task") {
            $("#RecentDeptProj").trigger("click");
        }
        else if (Name == "Due Date") {
            $("#DueDeptProj").trigger("click");
        }
        else if (Name == "Priority") {
            $("#PriorityDeptProj").trigger("click");
        }
    }
    else if ($('ul#myTabs').find('li.active').attr('id') == "ParentDeptEmp") {
        if (Name == "Task Name") {
            $("#TaskNameDeptEmp").trigger("click");
        }
        else if (Name == "Recent Task") {
            $("#RecentDeptEmp").trigger("click");
        }
        else if (Name == "Due Date") {
            $("#DueDeptEmp").trigger("click");
        }
        else if (Name == "Priority") {
            $("#PriorityDeptEmp").trigger("click");
        }
    }
    else {
        if (Name == "Task Name") {
            $("#TaskNameSub").trigger("click");
        }
        else if (Name == "Recent Task") {
            $("#RecentSub").trigger("click");
        }
        else if (Name == "Due Date") {
            $("#DueSub").trigger("click");
        }
        else if (Name == "Priority") {
            $("#PrioritySub").trigger("click");
        }
    }
}

