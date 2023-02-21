var NextURLInbox = "";
var CanCreateTask = false;
var CanAddModule = false;
var projectStartDateValidation = '';
var Q_Title = '';
var ProjectId = 0;
var pName = '';
var txtProjectID = titanForWork.getQueryStringParameter("ProjectID");
var TaskdemoSource = [];
var tempDate='';
var IsThresholdErrorTask = false;
var ProjectDemoSource = [];
var FilterProjTStorage = [];
var assignBy = []; //for showing search result
var assignByEmail = "";
var IsTaskBinded = false;
var typeofDocument="";
var typeofLibName="";

$(document).ready(function () {
    initializePeoplePicker("assigntodrp");
    getCurrentProjectDetails();
    $("#taskIn").datepicker();
    $('#taskIn').datepicker("option", "dateFormat", "MM dd, yy");
    if (performance.navigation.type == 1 || titanForWork.getQueryStringParameter("LocalStorage") == "Off") {
        localStorage.removeItem("FilterProjTStorage");
    } else {
        //console.info( "This page is not reloaded");
    }
    //if data saved in localstorage at page redirection then don't run this function
    /*if (localStorage.getItem("FilterProjTStorage") == null || localStorage.getItem("FilterProjTStorage") == "") {
    	GetTasksInOutBox("Open", "All", "PageLoad", "");
    }*/
    $("#TabTasks").click(function () {
    	if (localStorage.getItem("FilterProjTStorage") == null || localStorage.getItem("FilterProjTStorage") == "") {
	    	if(IsTaskBinded == false) {
	    		GetTasksInOutBox("Open", "All", "PageLoad", "");
	    		IsTaskBinded = true;
	    	}
    	}
    });
    ShowLocalStorageData();    
    $(".TaskGantt").hide();
    $("#FilterInbox").click(function () {
        if ($('#WorkTypeOfProject option').length == 0) {
            bindAllWorkType();
        }
        if ($('#Clientid option').length == 0) {
            bindAllClient();
        }
    });
    $("#btnApply").click(function () {
        MutipleBaseFilter();
    });
    $("#btnCopyProject").click(function () {
        location.href = "../Pages/ProjectDetails.aspx?WebAppId=" + Logged_CompanyId + "&CopyID=" + txtProjectID + "&Action=CopyProject";
    });
    $("#EditProject").click(function () {
        location.href = "../Pages/EditProjectDetails.aspx?WebAppId=" + Logged_CompanyId + "&ProjectID=" + txtProjectID + "&ProjectName=" + titanForWork.getQueryStringParameter("ProjectName");
    });
    $("#btnClear").click(function () {
        ClearFilter();
    });
    $("#NewTask").click(function () {
        if (CanCreateTask == true) {
        	localStorage.setItem("FilterProjTStorage", FilterProjTStorage.toString());
            var webAbsoluteURL = _spPageContextInfo.webAbsoluteUrl; //window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
            location.href = webAbsoluteURL + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&ProjectID=" + txtProjectID;
        }
        else {
            alert("You are not authorized to perform this action.");
            return false;
        }
    });
    $("#SeeMoreInbox").click(function () {
        var lastPage = $("#pageDropDownInbox").val();
        GetTasksInOutBox("Open", _spPageContextInfo.userId, "", "");
        $("#pageDropDownInbox").val(lastPage);
        $("#pageDropDownInbox").trigger("change");
    });
    $("#SeeMoreFilterInbox").click(function () {
        var lastPage = $("#pageDropDownInbox").val();
        if (NextURLInbox != null) {
            var Query = "?" + NextURLInbox.split('?')[1];
        }
        FilterTaskData(Query, "SeeMore");
        $("#pageDropDownInbox").val(lastPage);
        $("#pageDropDownInbox").trigger("change");
    });
    $(".SortClass").click(function () {
        $('#TempTableQuestions').tablesort();
        SortTaskTable(this.textContent);
    });
});

$(window).load(function () {
    $(".canvasjs-chart-credit").hide();
});

//to sort table as per the selected option
function SortTaskTable(Name) {
    if (Name == "Task Name") {
        $(".TaskSort").trigger("click");
    }
    else if (Name == "Recent Task") {
        $(".RecentTaskSort").trigger("click");
    }
    else if (Name == "Due Date") {
        $(".DueDateSort").trigger("click");
    }
    else if (Name == "Priority") {
        $(".PrioritySort").trigger("click");
    }
}
//check if user is autorized to create task in 'Task' tab
function CheckCreateTaskAuthorization() {
    var listName = 'ProjectTeamDetails';
    siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID&$filter=ProjectId eq '" + txtProjectID + "' and TeamMemberId eq '" + _spPageContextInfo.userId + "' and Status eq 'Active' and TaskPermission eq '1'";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                $("#NewTask").show();
                CanCreateTask = true;
            }
            else {
                $("#NewTask").hide();
                CanCreateTask = false;
                //CheckProjectAdminRights_ProjecTask()
            }
        }, eror: function (data) {
            alert($('#txtSomethingWentWrong').val());
        }
    });
}

//Bind assign to control box in Filter in 'Task' tab
function assigntouser(id) {
    $("#assigntodrp").empty();
    var txtCompanyId = Logged_CompanyId;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Employees')/Items?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID&$orderby= FullName asc &$expand=LogonName,Department,Company&$top=5000&$Filter=ParentId eq " + id + " and Status eq 'Active' and CompanyId eq '" + txtCompanyId + "'";
    $.ajax({
        url: Ownurl,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;
            // var subodinatdata =[];
            var currentusername = _spPageContextInfo.userDisplayName;
            var currentid = _spPageContextInfo.userId;
            $('<option value="' + currentid + '">' + currentusername + '</option>').appendTo("#assigntodrp");
            $.each(valuesArray, function (i, el) {
                option += "<option value='" + el.LogonNameId + "'title='" + el.FullName + "'>" + el.FullName + "</option>";
            });
            $("#assigntodrp").append(option);

        },
        error: function (data) {
            console.log(data.responseJSON.error);

        }
    });
}

//check if user is Active or not
function GetOwnerUser() {
    var txtCompanyId = Logged_CompanyId;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Employees')/Items?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID &$expand=LogonName,Department,Company &$filter= LogonName eq '" + _spPageContextInfo.userId + "' and CompanyId eq '" + txtCompanyId + "'";
    $.ajax({
        url: Ownurl,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;
            var id = valuesArray[0].ID;
            assigntouser(id);
        },
        error: function (data) {
            console.log(data.responseJSON.error);

        }
    });
}


//get Inbox and OUt box tasks 
function GetTasksInOutBox(currentPase, AssignTo, Action, Error) {
    var IsAssignBy = false;
    var IsAssinTo = false;
    var IsTimeSheetHide = false;
    var arrAssignTo = [];
    $("#tablefooter").show();
    $("#SeeMoreFilterInbox").hide();
    if (Action == "PageLoad") {
        $(".mainDivAllAnnouncements").empty();
        var restQuery;
        if (Error == "") {
            if (currentPase == "All" && AssignTo !== "All") {
                restQuery = "&$filter=CompanyId eq '" + txtCompanyId + "' and ProjectID/Id eq '" + txtProjectID + "' and TaskAssignToId eq '" + AssignTo + "'";
            }
            else if (AssignTo == "All" && currentPase != "All") {
                restQuery = "&$filter=CurrentPhase eq '" + currentPase + "' and CompanyId eq '" + Logged_CompanyId + "' and ProjectID/Id eq '" + txtProjectID + "'";
            }
            else if (AssignTo != "All" && currentPase != "All") {
                restQuery = "&$filter=TaskAssignToId eq '" + AssignTo + "' and CompanyId eq '" + Logged_CompanyId + "' and CurrentPhase eq '" + currentPase + "' and ProjectID/Id eq '" + txtProjectID + "'";
            }
            else {
                restQuery = "&$filter=CompanyId eq '" + Logged_CompanyId + "' and ProjectID/Id eq '" + txtProjectID + "'";
            }
        }
        else {
            var dateFilter = new Date();
            dateFilter = dateFilter.setMonth(dateFilter.getMonth() - 6);
            dateFilter = new Date(dateFilter);
            restQuery = "&$filter=CurrentPhase eq '" + currentPase + "' and CompanyId eq '" + Logged_CompanyId + "' and ProjectName eq '" + txtProjectID + "' and Created ge datetime'" + dateFilter.toISOString() + "' ";
        }
        var Query = "?$top=100&$select=*,ClientID/ID,ClientID/Title,Module/Title,Author/Title,AssignedBy/Title,Author/EMail,TaskAssignTo/Title,TaskAssignTo/EMail,TaskAssignTo/ID,AttachmentFiles,ProjectID/Id&$Expand=ClientID,Module,Author,AttachmentFiles,AssignedBy,ProjectID,TaskAssignTo&$orderby=DueDate asc" + restQuery;

    }
    else {
        if (NextURLInbox != null) {
            var Query = "?" + NextURLInbox.split('?')[1];
        }
        else {
            $("#SeeMoreInbox").hide();
            return;
        }
    }
    $.when(getItemsWithQueryItem('EmployeeTaskDetails', Query, "TaskInbox")).done(function (TaskResults) {
        var TaskinboxChip = '';
        TaskinboxChip += "<div class='upload-chip'>" + currentPase + "</div>";
        $("#myTaskInboxChip").empty();
        $("#myTaskInboxChip").append(TaskinboxChip);
        var items = TaskResults.results;
        var tableItemsHTML = "";
        if (NextURLInbox == null || NextURLInbox == "") {
            $("#SeeMoreInbox").hide();
        }
        for (var i = 0; i < items.length; i++) {
            var CompletionDate = '';
            var ItemID = items[i].ID;
            var Title = items[i].Title;

            var taskType = items[i].TaskType;
            var TaskAssignFrom = items[i].AssignedBy.Title;
            if (items[i].Author.EMail == _spPageContextInfo.userEmail) {
                IsAssignBy = true;
            }
            var TaskPriority = items[i].TaskPriority;
            var DueDate = items[i].DueDate;
            var modifiedDate = new Date(DueDate);
            modifiedDate = new Date(modifiedDate);
            var todayDate = new Date;
            var diffDaysServices = Math.round(todayDate.getTime() - modifiedDate.getTime()) / (todayDate);
            var OverDueDate = ""
            if (DueDate != null) {
                DueDate = new Date(DueDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
            }
            else {
                DueDate = '';
            }
            var CompletionPersent = items[i].CompletionPersent;
            var CurrentPhase = items[i].CurrentPhase;
            if (CurrentPhase == "Completed") {
                CompletionDate = new Date(items[i].CompletionDate);
                CompletionDate = titanForWork.ShowCommonStandardDateFormat(CompletionDate);//.toLocaleDateString();
            }
            else {
                CompletionDate = "";
            }
            var ProjectFullName = items[i].ProjectFullName;
            if (ProjectFullName == null) {
                ProjectFullName = "General Task";
            }

            var ModuleTitle = '';
            if (items[i].Module != 0) {
                var ModuleTitle = items[i].Module.Title;
                if (ModuleTitle == null) {
                    ModuleTitle = "";
                }
            }

            var ClientTitle = '';
            if (items[i].ClientID != 0) {
                var ClientTitle = items[i].ClientID.Title;
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

            var Worktype = items[i].Worktype;
            if (Worktype == null) {
                Worktype = '';
            }

            var DependencyCount = items[i].DependencyCount;
            if (DependencyCount == null || DependencyCount == 0) {
                DependencyCount = '';
            }

            var TaskAssignTo = items[i].TaskAssignTo;
            var TaskAssignToUsers = '';
            arrAssignTo = [];
            if (TaskAssignTo.results.length > 0) {
                var TaskAssignToUsers = TaskAssignTo.results[0].Title;
                for (var t = 0; t < TaskAssignTo.results.length; t++) {
                    arrAssignTo.push(TaskAssignTo.results[t].EMail.toLowerCase());
                }
            }
            if (jQuery.inArray(_spPageContextInfo.userEmail.toLowerCase(), arrAssignTo) != '-1') {
                IsAssinTo = true;
            }
            else {
                IsAssinTo = false;
            }

            var IsInBox = false;
            TaskAssignTo.results.filter(function (data) {
                if (data.EMail == _spPageContextInfo.userEmail) {
                    IsInBox = true;
                    return;
                }
            });

            var dependencyActionButton = '';
            if (DependencyCount > 0) {
                if (IsInBox == true) {
                    dependencyActionButton = "<button type='button' class='btn custom-btn custom-btn-two mt-16' onclick=taskDependency('" + ItemID + "') >Action</button>";
                }
                else {
                    dependencyActionButton = "<button type='button' class='btn custom-btn custom-btn-two mt-16' onclick=taskDependencyOutbox('" + ItemID + "') >Action</button>";
                }

            }
			 var PriorityHTML = '';
            if (items[i].TaskPriority == "High" || items[i].TaskPriority == "Top") {
                PriorityHTML = '<i class="fa fa-exclamation-circle" style="font-size: 23px;color:red;"></i>&nbsp&nbsp'
            }

            var taskStartDate = items[i].StartDate;

            var TaskAssignToButton = '';
            if (TaskAssignTo.results.length > 1) {
                TaskAssignToButton = "<button type='button' class='btn custom-btn custom-btn-two' onclick=taskAssignToUsersModal('" + ItemID + "')>Group</button>";
            }
            var currentuserID = _spPageContextInfo.userId;
            var IsUserInAssigntoGroup = TaskAssignTo.results.map(function (e) { return e.ID; }).indexOf(currentuserID);
            var timeSheetFillButton = '';
            if (IsUserInAssigntoGroup != -1) {
            	if (IsTimesheetInvisible == false) {
                	IsTimeSheetHide = false;
                	var timeSheetFillButton = "<button type='button' class='btn btn-danger custom-btn-two custom-btn-two-danger mt-16' onclick=\'timeSheetEntry(" + ItemID + ")\'>Fill</button>";
                }
                else {
                    var timeSheetFillButton = "";
                    IsTimeSheetHide = true;
                }
            }
            if (IsAssinTo == false && IsAssignBy == false) {
                var Titleurl = "<div class='task-name-box'><b class='ellipsis-2'>" + Title + "</b></div>";
            }
            else {
                if (IsAssignBy == true) {
                    var Titleurl = "<a class='task-name-box' href='javascript:void(0);' onclick='redirectModifyTask(this);' name='" + _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(ItemID) + "&EditMode=" + window.btoa('True') + "&ProjectID=" + txtProjectID + "'><b class='ellipsis-2'>" + Title + "</b></a>";
                }
                else {
                    var Titleurl = "<a class='task-name-box' href='javascript:void(0);' onclick='redirectModifyTask(this);' name='" + _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(ItemID) + "&EditMode=" + window.btoa('False') + "&ProjectID=" + txtProjectID + "'><b class='ellipsis-2'>" + Title + "</b></a>";
                }
            }
            // Generate Dynamic HTML
            if (IsInBox == true) {
                var TimesheetHtml = "<td class='text-center TimeSheetTHead myTask-timesheet-col'><h4 class='m-0 cursor-pointer' id='timehrs" + ItemID + "' onclick=\'timeSheetHours(this," + ItemID + ")\'></h4><button type='button' class='btn custom-btn custom-btn-two mt-16 hourbtn' onclick=\'timeSheetHours(this," + ItemID + ")\'>Hours</button>" + timeSheetFillButton + "</td>";
            }
            else {
                var TimesheetHtml = "<td class='text-center TimeSheetTHead myTask-timesheet-col'><h4 class='m-0 cursor-pointer' id='timehrs" + ItemID + "' onclick=\'timeSheetHours(this," + ItemID + ")\'></h4>" + timeSheetFillButton + "</td>";
            }
            if (diffDaysServices > 1 && CurrentPhase == "Open") {
                tableItemsHTML += "<tr>" +
                    "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
                    "<label class='m-0 b-400'>Project:</label><span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p></td>" +
                    "<td class='text-center'>" +
                    "<div class=''>" +
                    "<p class='m-0 ellipsis-1'>" + Worktype + "</p>" +
                    "<p class='m-0 ellipsis-1 mt-29'>" + ClientModuleType + "</p><div class='TaskIcons'>" + PriorityHTML +
                    "</div></div>" +
                    "</td>" +
                    "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p></td>" +
                    "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignToUsers + "</p>" +
                    "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div>" +
                    "</td>" +
                    "<td class='text-center'><p class='m-0 mb-10'>" + CurrentPhase + "</p>" +
                    "<p class='m-0 font-12 DueDateTask' style='font-weight: bold;color: red;'>Due: <span>" + DueDate + "</span></p>" +
                    "<div class='progress custom-progress progress-danger m-0 mt-4'>" +
                    "<div class='progress-bar progress-bar-danger' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
                    "<td class='text-center'><h4 class='m-0'>" + DependencyCount + "</h4>" + dependencyActionButton + "</td>" +
                    TimesheetHtml +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].Created + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].TaskPriority + "</p></td>" +
                "</tr>";
            }
            else {

                tableItemsHTML += "<tr>" +
                    "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
                    "<label class='m-0 b-400'>Project:</label><span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p></td>" +
                    "<td class='text-center'>" +
                    "<div class=''>" +
                    "<p class='m-0 ellipsis-1'>" + Worktype + "</p>" +
                    "<p class='m-0 ellipsis-1 mt-29'>" + ClientModuleType + "</p><div class='TaskIcons'>" + PriorityHTML +
                    "</div></div></td>" +
                    "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p></td>" +
                    "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignToUsers + "</p>" +
                    "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div>" +
                    "</td>" +
                    "<td class='text-center'><p class='m-0 mb-10'>" + CurrentPhase + "</p>" +
                    "<p class='m-0 font-12 DueDateTask'>Due: <span>" + DueDate + "</span></p>" +
                    "<div class='progress custom-progress progress-success m-0 mt-4'>" +
                    "<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
                    "<td class='text-center'><h4 class='m-0'>" + DependencyCount + "</h4>" + dependencyActionButton + "</td>" +
                    TimesheetHtml +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].Created + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].TaskPriority + "</p></td>" +
                "</tr>";
            }
        }
        if (items.length == 0) {
            $(".NoRecordFound").show();
            $("#SeeMoreInbox").hide();
        }
        else {
            $(".NoRecordFound").hide();
        }
        $(".mainDivAllAnnouncements").append(tableItemsHTML);
		if(IsTimeSheetHide == true){
			$(".TimeSheetTHead").hide();
		}

        //Showing data out of total
        if ($('#TempTableQuestions>tbody tr').length > 100 && NextURLInbox != null) {
            $("#ShowTotalItemsInbox").hide();
            $("#ShowItemsInbox").show();
            $("#DiplayTaskCount").text($('#TempTableQuestions>tbody tr').length);
        }
        else {
            $("#ShowTotalItemsInbox").show();
            $("#ShowItemsInbox").hide();
            $("#TotalItemscount").text(items.length);
        }
        if ($('#TempTableQuestions>tbody tr').length == 5000) {
            NextURLInbox = null;
            $("#SeeMoreInbox").hide();
        }
        if (items.length > 0) {
            TableConfiguration();// Table pagination configuration
        }
    }).fail(function (error) {
        if (error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1) {
            if (IsThresholdErrorTask == false) {
                IsThresholdErrorTask = true;
                GetTasksInOutBox("Open", "All", "PageLoad", "Threshold Error");
            }
            else {
                $("#tablefooter").hide();
                $("#SeeMoreInbox").hide();
            }
        }
    });
}

function redirectModifyTask(Action) {
	localStorage.removeItem("FilterProjTStorage");
    localStorage.setItem("FilterProjTStorage", FilterProjTStorage.toString());
    location.href = Action.name + "&Source=Tasks&undefined=undefined";
}

//to get hours in Timesheet
function timeSheetHours(currentrow, itemid) {
    $('#TaskTitleOfTimeSheet').text("");

    if ($(currentrow).hasClass('hourbtn')) {
        $(currentrow).hide();
    }
    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmpTimeSheet')/items?$top=5000&$select=*,TaskID/Title&$expand=TaskID&$orderby=DateOfWork,StartTimeMM asc&$filter=EmployeeId eq '" + _spPageContextInfo.userId + "' and TaskID eq'" + itemid + "'";

    $.ajax({
        url: requestURL,
        type: 'GET',
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {

            $('#timeSheetAllHours').html('')
            var items = data.d.results;
            $("#timeSheet").modal("show");
            var tr = '';
            if (items.length > 0) {
                var TotalLoginMinutes = 0;
                for (var i = 0; i < items.length; i++) {
                    TotalLoginMinutes = parseInt(TotalLoginMinutes) + parseInt(items[i].WorkHours);

                    var startTime = items[i].StartTime
                    var endTime = items[i].EndTime;
                    var DateOfWork = items[i].DateOfWork;
                    var tileOfTask = items[i].TaskID.Title;

                    DateOfWork = new Date(DateOfWork);
                    DateOfWork = titanForWork.ShowCommonStandardDateFormat(DateOfWork);

                    if (items[i].Details != null) { var Details = items[i].Details; } else { var Details = ""; }

                    var TotalTime = items[i].WorkHours;
                    tr += "<div class='col-md-12 col-sm-12 timesheet-entry-reply-box'>" +
                 "<div class='timesheet-entry-reply-author-detail px-0'><span><span >" + DateOfWork + "</span>" +
                 "<span class='ml-4'><span>(</span>" + startTime + "</span> - <span>" + endTime + "<span>)</span></span></span>" +
                 "<span>" + ConvertHHMM(TotalTime) + " (H:M)</span></div><h4>" + Details + "</h4></div>";
                }

                $('#timeSheetAllHours').append(tr);
                $('#TaskTitleOfTimeSheet').text(tileOfTask);

                var currenth4 = $(currentrow).parent().closest(":has(h4)").find('h4');
                currenth4[0].innerHTML = ConvertHHMM(TotalLoginMinutes) + " (H:M)";
            }

            else {
                tr += "<div class='col-md-12 col-sm-12 timesheet-entry-reply-box'><div class='timesheet-entry-reply-author-detail px-0'><span><span >No Logged hour Found</span>" +
                        "<span class='ml-4'><span></span></span> <span><span></span></span></span> <span></span></div><h4></h4></div>";

                $('#timeSheetAllHours').append(tr);
                var currenth4 = $(currentrow).parent().closest(":has(h4)").find('h4');
                currenth4[0].innerHTML = '00:00 (H:M)';

                var taskTitelText = $(currentrow).parent().parent().find("td:eq(0) a").text();
                $('#TaskTitleOfTimeSheet').text(taskTitelText);
            }
        },
        error: function (error) {
            console.log("Error occured");
        }
    })
}

//get the users list to whom task in assigned
function taskAssignToUsersModal(itemid) {
    $('#assignToUserList').html('');
    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?$top=5000&$select=TaskAssignTo/Title,TaskAssignTo/EMail&$Expand=TaskAssignTo&$filter=ID eq'" + itemid + "'";
    $.ajax({
        url: requestURL,
        type: 'GET',
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            $("#taskGroup1").modal("show");
            var items = data.d.results;
            var li = '';
            li += '<li class="text-right sticky-box px-0"><span class="my-task-group-modal">Assigned to</span><span id="taskGroupCrs" class="glyphicon glyphicon-remove close-round" class="close" data-dismiss="modal"></span></li>'
            if (items.length > 0) {
                var TaskAssignTo = items[0].TaskAssignTo;
                for (var m = 0; m < TaskAssignTo.results.length; m++) {
                    var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,FullName,LogonName/EMail,Company/Id,Company/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Company,Department&$top=5000&$filter=LogonName/EMail eq '" + TaskAssignTo.results[m].EMail + "' ";
                    dfds = $.Deferred();
                    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + Query; //Internal employee
                    $.when(getItems(url, dfds)).done(function (Results) {
                        response = [];
                        UResults = Results;
                        if (UResults.length > 0) {
                            var value = UResults[0];
                            if (value.AttachmentFiles.results.length > 0) {
                                attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
                            }
                            else {
                                attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
                            }
                            //var fullName = GetUserFullName(value.LogonName.EMail);
                            li += '<li><div class="coverbox"><div class="lefbox">';
                            li += '<img src=' + attachmentUrl + ' alt="" style="width:30px;border-radius:50%;width:43px;height:43px;"></div>';
                            li += '<div class="rightbox">';
                            li += '<h4>' + TaskAssignTo.results[m].Title + '</h4>';
                            li += '<span>' + value.Designation + '</span><span class="line">' + value.Department.Title + '</span>';
                            li += '</div></div></li>';
                        }
                        else {
                            //External Employee
                            var Query = "?$select=Id,Title,AttachmentFiles,LoginName/EMail,Client_Name/Title,Designation&$expand=LoginName,AttachmentFiles,Client_Name&$top=5000&$filter=LoginName/EMail eq '" + TaskAssignTo.results[m].EMail + "' ";
                            dfds = $.Deferred();
                            url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query; //Internal employee
                            $.when(getItems(url, dfds)).done(function (Results) {
                                response = [];
                                UResults = Results;
                                if (UResults.length > 0) {
                                    var value = UResults[0];
                                    if (value.AttachmentFiles.results.length > 0) {
                                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
                                    }
                                    else {
                                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LoginName.EMail);
                                    }
                                    //var fullName = GetUserFullName(value.LogonName.EMail);
                                    li += '<li><div class="coverbox"><div class="lefbox">';
                                    li += '<img src=' + attachmentUrl + ' alt="" style="width:30px;border-radius:50%;width:43px;height:43px;"></div>';
                                    li += '<div class="rightbox">';
                                    li += '<h4>' + TaskAssignTo.results[m].Title + '</h4>';
                                    li += '<span>' + value.Designation + '</span></span><span class="line">' + value.Client_Name.Title + '</span>';
                                    li += '</div></div></li>';
                                }
                            });
                        }
                    });
                }
                $('#assignToUserList').append(li);
            }
        },
        error: function (error) {
            console.log("Error occured");
        }
    })
}


//get the users list to whom task in dependency if the Inbox users
function taskDependency(TaskId) {
    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaskDependencies')/items?$top=5000&$select=ID,Title,Details,Status,AssignedTo/Title,AssignedTo/ID,TaskId/ID,TaskId/Title&$Expand=AssignedTo,TaskId&$filter=TaskId eq'" + TaskId + "'";
    $.ajax({
        url: requestURL,
        type: 'GET',
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            $('#taskDependencyTaskInbox').html('')
            $("#ActionInbox").modal("show");
            var items = data.d.results;
            var tr = '';
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    var Title = items[i].Title;
                    var Detail = items[i].Details;
                    var status = items[i].Status;
                    var itemId = items[i].ID;
                    var taskTitle = items[i].TaskId.Title;
                    var TaskAssignTo = items[i].AssignedTo;
                    var allAssignUser = '';
                    var userId = [];
                    if (TaskAssignTo.results != null) {
                        for (var j = 0; j < TaskAssignTo.results.length; j++) {
                            var username = TaskAssignTo.results[j].Title;
                            userId.push(TaskAssignTo.results[j].ID);
                            allAssignUser += username + ";";
                        }
                    }
                    if (allAssignUser.length > 0) {
                        allAssignUser = allAssignUser.substring(0, allAssignUser.length - 1);
                    }
                    var currentuser = _spPageContextInfo.userId;
                    if (userId.indexOf(currentuser) != -1) {
                        if (status == "Active") {
                            tr += "<tr>" +
								"<td class='text-left'><div>" + Title + "</div></td>" +
								"<td class='text-center'>" + allAssignUser + "</td>" +
								"<td class='text-center'><label class='switch'><input type='checkbox' checked id='btnToggleTask" + items[i].ID + "' onclick=\'UpdatTaskDependency(this," + items[i].ID + ")\'><span class='slider round'></span></label></td>" +
								"<td class='text-center'><button type='button' class='btn btn-danger custom-btn-two custom-btn-two-danger' onclick=\'taskDepTimeSheetEntry(" + TaskId + "," + itemId + ")\'>Fill</button></td>" +
							"</tr>";
                        }
                        else {
                            tr += "<tr>" +
 								"<td class='text-left'><div>" + Title + "</div></td>" +
								"<td class='text-center'>" + allAssignUser + "</td>" +
								"<td class='text-center'><label class='switch'><input type='checkbox' id='btnToggleTask" + items[i].ID + "' onclick=\'UpdatTaskDependency(this," + items[i].ID + ")\'><span class='slider round'></span></label></td>" +
								"<td class='text-center'><button type='button' class='btn btn-danger custom-btn-two custom-btn-two-danger' onclick=\'taskDepTimeSheetEntry(" + TaskId + "," + itemId + ")\'>Fill</button></td>" +
							"</tr>";
                        }
                    }
                    else {
                        if (status == "Active") {
                            tr += "<tr>" +
 								"<td class='text-left'><div>" + Title + "</div></td>" +
								"<td class='text-center'>" + allAssignUser + "</td>" +
								"<td class='text-center'><label class='switch'><input type='checkbox' checked id='btnToggleTask" + items[i].ID + "' disabled><span class='slider round'></span></label></td>" +
								"<td class='text-center'><button type='button' class='btn btn-danger custom-btn-two custom-btn-two-danger mt-16' disabled >Fill</button></td>" +
							"</tr>";
                        }
                        else {
                            tr += "<tr>" +
 								"<td class='text-left'><div>" + Title + "</div></td>" +
								"<td class='text-center'>" + allAssignUser + "</td>" +
								"<td class='text-center'><label class='switch'><input type='checkbox' id='btnToggleTask" + items[i].ID + "' disabled><span class='slider round'></span></label></td>" +
								"<td class='text-center'><button type='button' class='btn btn-danger custom-btn-two custom-btn-two-danger mt-16' disabled>Fill</button></td>" +
							"</tr>";
                        }
                    }
                }
                $('#taskDependencyTaskInbox').append(tr);
                $('#taskTitleForLnbox').text(taskTitle);
            }
        },
        error: function (error) {
            console.log("Error occured");
        }
    })
}

//get the users list to whom task in dependency if the Outbox users
function taskDependencyOutbox(itemid) {
    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaskDependencies')/items?$top=5000&$select=ID,Title,Details,Status,AssignedTo/Title,TaskId/ID,TaskId/Title&$Expand=AssignedTo,TaskId&$filter=TaskId eq'" + itemid + "'";
    $.ajax({
        url: requestURL,
        type: 'GET',
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            $('#taskDependencyOutbox').html('');
            $("#ActionOutbox").modal("show");
            var items = data.d.results;
            var tr = '';
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    var Title = items[i].Title;
                    var Detail = items[i].Details;
                    var status = items[i].Status;
                    var itemId = items[i].ID;
                    var taskTitle = items[i].TaskId.Title;
                    var TaskAssignTo = items[i].AssignedTo;
                    var allAssignUser = '';
                    if (TaskAssignTo.results != null) {
                        for (var j = 0; j < TaskAssignTo.results.length; j++) {
                            var username = TaskAssignTo.results[j].Title;
                            allAssignUser += username + ";";
                        }
                    }

                    if (allAssignUser.length > 0) {
                        allAssignUser = allAssignUser.substring(0, allAssignUser.length - 1);
                    }
                    if (status == "Active") {
                        tr += "<tr>" +
                        "<td class='text-left'><div>" + Title + "</div></td>" +
                        "<td class='text-center'>" + allAssignUser + "</td>" +
                        "<td class='text-center'><label class='switch'><input type='checkbox' checked id='btnToggle" + items[i].ID + "' onclick=\'UpdatTaskDependency(this," + items[i].ID + ")\'><span class='slider round'></span></label></td>" +
                        "</tr>";
                    }
                    else {
                        tr += "<tr>" +
                        "<td class='text-left'><div>" + Title + "</div></td>" +
                        "<td class='text-center'>" + allAssignUser + "</td>" +
                        "<td class='text-center'><div> <label class='switch'><input type='checkbox' id='btnToggle" + items[i].ID + "' onclick=\'UpdatTaskDependency(this," + items[i].ID + ")\'><span class='slider round'></span></label></td>" +
                        "</tr>";
                    }
                }
                $('#taskDependencyOutbox').append(tr);
                $('#titleForOutboxTask').text(taskTitle);
            }
        },
        error: function (error) {
            console.log("Error occured");
        }
    })
}

//page redirection when user want to fill timesheet 
function timeSheetEntry(taskid) {
    var url = _spPageContextInfo.webAbsoluteUrl + "/Pages/TimeSheetEntry.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(taskid) + "&Mode=" + window.btoa('Add') + "&sourcelocation=../Pages/timesheet.aspx";
    window.location.href = url;
}

//page redirection when user want to fill timesheet for dependency users
function taskDepTimeSheetEntry(taskid, itemid) {
    var url = _spPageContextInfo.webAbsoluteUrl + "/Pages/TimeSheetEntry.aspx?WebAppId=" + Logged_CompanyId + "&Dependency=" + window.btoa(itemid) + "&TaskId=" + window.btoa(taskid) + "&Mode=" + window.btoa('Add') + "&sourcelocation=../Pages/timesheet.aspx";
    window.location.href = url;
}

//to update Task dependency
function UpdatTaskDependency(currentdata, itemId) {
    currentrowid = $(currentdata).attr('id')
    var ListName = 'TaskDependencies';
    var DepSatus = $("#" + currentrowid).prop("checked");
    if (DepSatus) {
        DepSatus = 'Active'
    }
    else {
        DepSatus = 'Inactive'
    }
    var Metadata;
    var ItemType = GetItemTypeForListName(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Status: DepSatus,
    };
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + itemId + "')",
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
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Convert time for calculating timesheet
function ConvertHHMM(TotalMinutes) {
    var hours = Math.floor(TotalMinutes / 60);
    var minutes = TotalMinutes % 60;
    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var TimeFormat = hours + ":" + minutes;

    return TimeFormat;
}

//Table configuration - Pagination
function TableConfiguration() {
    sorter = new TINY.table.sorter('sorter', 'TempTableQuestions', {
        // headclass: 'head',
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
        pageddid: 'pagedropdown',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true

    });
}

//get list-items from SP list and NextURL 
function getItemsWithQueryItem(ListName, Query, Action) {
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
            if (Action == "TaskInbox") {
                NextURLInbox = data.d.__next;
            }
            DeferredObj.resolve(data.d);
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};


//get current projects details
function getCurrentProjectDetails() {
    CheckCreateTaskAuthorization();
    var StakeHolders = '';
    var Sponsers = '';
    var Query = "?$top=5000&$select=*,ProgramID/Id,ProgramID/Title,MultipleStackeholder/EMail,MultipleSponsor/EMail,ClientID/Title,ClientID/Id,Department_ID/Title,Office_Location_Id/Title,ManagerName/EMail,ManagerName/Title&$expand=ProgramID,MultipleSponsor,ManagerName,ClientID,Department_ID,Office_Location_Id,MultipleStackeholder&$filter=ID eq '" + txtProjectID + "' ";
    dfds = $.Deferred();
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items/" + Query;
    $.when(getItems(url, dfds)).done(function (Results) {
        response = [];
        var items = Results;
        displayBarChart(items[0].EstimatedWorkHours, items[0].LoggedHours, items[0].VerifiedHours, items[0].BillableHours);
        typeofLibName=items[0].ProjectName
        $("#txtProjectName").text(items[0].ProjectName);
        ProjectId = items[0].Id;
        pName = items[0].ProjectName;
        currentProjectSiteURL = items[0].ProjectInternalName;

        $("#UserAllProject").append('<option value="' + items[0].ID + '">' + items[0].ProjectName + '</option>');
        if (items[0].Status == "Live") {
            $(".StatusIcon").attr("src", "https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/Projects_New/assets/images/youtube-live.png");
        }
        else if (items[0].Status == "Completed") {
            $(".StatusIcon").attr("src", "https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/Projects_New/assets/images/Completed.png");
        }
        else if (items[0].Status == "Terminated") {
            $(".StatusIcon").attr("src", "https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/Projects_New/assets/images/Terminated.png");
        }


        todayDate = new Date();
        todayDate = $.datepicker.formatDate('dd-M-yy', todayDate);
        $("#txtStatus").text(items[0].Status);
        var PlanedStartDate = new Date(items[0].PlanedStartDate);
        PlanedStartDateGlobal = new Date(items[0].PlanedStartDate);
        PlanedStartDate = $.datepicker.formatDate('dd-M-yy', PlanedStartDate);

        var PlanedEndDate = new Date(items[0].PlanedEndDate);
        PlanedEndDateGlobal = new Date(items[0].PlanedEndDate);
        PlanedEndDate = $.datepicker.formatDate('dd-M-yy', PlanedEndDate);
        var ActualStartDate = '';
        if (items[0].ActualStartDate != null) {
            var ActualStartDate = new Date(items[0].ActualStartDate);
            ActualStartDateGlobal = new Date(items[0].ActualStartDate);
            ActualStartDate = $.datepicker.formatDate('dd-M-yy', ActualStartDate);
        }
        var ActualEndDate = '';
        if (items[0].ActualEndDate != null) {
            ActualEndDate = new Date(items[0].ActualEndDate);
            ActualEndDateGlobal = new Date(items[0].ActualEndDate);
            ActualEndDate = $.datepicker.formatDate('dd-M-yy', ActualEndDate);
        }
        //Timesheet URL
        var URLSD = window.btoa($.datepicker.formatDate('dd/mm/yy', new Date(items[0].PlanedStartDate)));
        var URLTD = window.btoa($.datepicker.formatDate('dd/mm/yy', new Date(items[0].PlanedEndDate)));
        $("#btnTimeSheet").click(function () {
            location.href = "../Pages/TimesheetReport.aspx?WebAppId=" + Logged_CompanyId + "&Proj=" + window.btoa(ProjectId) + "&Client=" + window.btoa(items[0].ClientID.Id) + "&SD=" + URLSD + "&ED=" + URLTD + "&sourcelocation=../Pages/Myworkplace.aspx"
        });
        if (ActualStartDate == "" || ActualStartDate == null) {
            projectStartDateValidation = $.datepicker.formatDate('dd/mm/yy', new Date(items[0].PlanedStartDate));
        }
        else {
            projectStartDateValidation = $.datepicker.formatDate('dd/mm/yy', new Date(items[0].ActualStartDate));
        }

        //Creating Array for gantt chart w.r.t. project
        var ChartFromDate = new Date(items[0].PlanedStartDate).setHours(0, 0, 0, 0);
        ChartFromDate = new Date(ChartFromDate);
        tempDate=ChartFromDate;
        //ChartFromDate = new Date(ChartFromDate.setDate(ChartFromDate.getDate() + 4)).setHours(0, 0, 0, 0);
        var ChartToDate = new Date(items[0].PlanedEndDate).setHours(0, 0, 0, 0);
        ChartToDate = new Date(ChartToDate);
        //ChartToDate = new Date(ChartToDate.setDate(ChartToDate.getDate() + 4)).setHours(0, 0, 0, 0);

        ProjectDemoSource.push({
            name: '',
            desc: '',
            values: [{
                from: ChartFromDate,
                to: ChartToDate,
                label: '',
                customClass: 'HideProject',
                dataObj: ''
            }]
        });

        dislayPieChart();
        $("#PlannedStartDate").text(PlanedStartDate);
        $("#PlanedEndDate").text(PlanedEndDate);
        $("#ActualStartDate").text(ActualStartDate);
        $("#ActualEndDate").text(ActualEndDate);
        var DateWithNoTime = new Date();
        DateWithNoTime = DateWithNoTime.setHours(0, 0, 0, 0);
        DateWithNoTime = new Date(DateWithNoTime);
        if (DateWithNoTime <= new Date(items[0].PlanedEndDate) && items[0].Status == "Live") {
            $("#PlanedEndDate").addClass("color-blue");
            $("#PlanedEndDate").removeClass("color-red");
            $("#imgPlanedEndDate").addClass("blue-icon");
            $("#imgPlanedEndDate").removeClass("red-icon");
        }
        else {
            $("#PlanedEndDate").removeClass("color-blue");
            $("#PlanedEndDate").addClass("color-red");
            $("#imgPlanedEndDate").removeClass("blue-icon");
            $("#imgPlanedEndDate").addClass("red-icon");
        }
        if (DateWithNoTime < new Date(ActualEndDate) && items[0].Status == "Live") {
            $("#ActualEndDate").removeClass("color-blue");
            $("#ActualEndDate").addClass("color-red");
            $("#imgActualEndDate").removeClass("blue-icon");
            $("#imgActualEndDate").addClass("red-icon");
        }

        $("#txtCustomerName").text(items[0].ClientID.Title);
        $("#txtDepartment").text(items[0].Department_ID.Title);
        $("#txtLocation").text(items[0].Office_Location_Id.Title ? items[0].Office_Location_Id.Title : "");
        $("#txtManagerName").text(items[0].ManagerName.Title);
        $("#txtManagerEmail").text(items[0].ManagerName.EMail);
        var ManagerAttach = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].ManagerName.EMail);
        $("#txtManagerPic").attr('src', ManagerAttach);
        $("#txtManagerEmail").click(function () {
            OpenEmail(items[0].ManagerName.EMail);
        });		
        if (items[0].MultipleStackeholder.results != null && items[0].MultipleStackeholder.results.length > 0) {
            for (var ind = 0; ind < items[0].MultipleStackeholder.results.length; ind++) {
                StakeHolders += GetUserDisplayName(items[0].MultipleStackeholder.results[ind].EMail) + ", ";
            }
            $("#txtStakeholder").text(StakeHolders.substring(0, StakeHolders.length - 2));
        }
        else {
            $("#txtStakeholder").text("");
        }
        if (items[0].MultipleSponsor.results != null && items[0].MultipleSponsor.results.length > 0) {
            for (var ind = 0; ind < items[0].MultipleSponsor.results.length; ind++) {
                Sponsers += GetUserDisplayName(items[0].MultipleSponsor.results[ind].EMail) + ", ";
            }
            $("#txtSponsers").text(Sponsers.substring(0, Sponsers.length - 2));

        }
        else {
            $("#txtSponsers").text("");
        }
        if (items[0].TechnologyUsed == '0') {
            items[0].TechnologyUsed = '';
        }
        $("#txtProjectType").text(items[0].TechnologyUsed);
        if (items[0].Domain != null) {
            $("#txtDomain").text(items[0].Domain);
        }
        else {
            $("#txtDomain").text("");
        }

        if (items[0].ProjectDescription != null) {
            $("#txtProjectDetails").text(items[0].ProjectDescription);
        }
        else {
            $("#txtProjectDetails").text("");
        }
        if(items[0].ProgramID.Id != null && items[0].ProgramID.Id != 0) {
            $("#txtProgram").text(items[0].ProgramID.Title);
        }
        //--------------Bind Project Documents Iframe------------------
        var siteURL = items[0].ProjectName;
        if (items[0].ProjectInternalName != null && items[0].ProjectInternalName != "") {
            siteURL = items[0].ProjectInternalName;
        }
        if (items[0].ManagerName.EMail == _spPageContextInfo.userEmail) {
            CanAddModule = true;
            CanAddMember = true;
            currentUserTeamPermission = true;
            currentUserHaveDocumentPermission = true;
            $("#btnaddModule").show();
            $("#btnCopyProject").show();
        }
        else {
            $("#btnCopyProject").remove();
            $("#EditProject").remove();
            $("#btnTimeSheet").remove();
        }
        //var clientContext = new SP.ClientContext(siteURL);
        myOwnDocumentsUrl = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/DMS/" + siteURL + "/Shared%20Documents/Forms/AllItems.aspx";
        UrlExists(myOwnDocumentsUrl, function (status) {
            if (status === 200) {
                setTimeout(function () { $('#myDocumentsIframe').append('<iframe width="100%" id="viewMyDocuments" style="min-height:500px;" src="' + myOwnDocumentsUrl + '"></iframe>'); }, 2000);
            }
            else {
                var htmlNotAuthorized = '<div class="col-md-12">' +
                    '<div class="panel panel-default shadow2" style="margin:100px;">' +
                    '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                    '<span><h2 class="text-center">Project site has been deleted. Please contact administrator.</h2></span>';
                setTimeout(function () { $('#myDocumentsIframe').append('<div width="100%" id="viewMyDocuments" style="min-height:500px;">' + htmlNotAuthorized + '</div>'); }, 2000);
            }
        });
        checkFavoriteProject();
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


// get display name from USer Email Id
function GetUserDisplayName(userLoginName) {
    var userDisplayName = "";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|" + userLoginName + "'",
        type: "GET",
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        async: false,
        success: function (data, textStatus, xhr) {
            return userDisplayName = data.d.DisplayName;
        },
        error: function (xhr, textStatus, errorThrown) {

        }
    });

    return userDisplayName;
}


// get and filter list data for more that 5000
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
            dfds.reject(error)
            console.log(error);
        }
    })
    return dfds.promise()
}

//Bind workType in Filter popup
function bindAllWorkType() {
    $("#WorkTypeOfProject").empty();
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$select=CategoryType,CatogeryName&$filter=CategoryType eq 'Work Type'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            $('<option value="All">All</option>').appendTo("#WorkTypeOfProject");
            for (var index = 0; index < response.d.results.length; index++) {
                $("#WorkTypeOfProject").append('<option value="' + response.d.results[index].CatogeryName + '">' + response.d.results[index].CatogeryName + '</option>');
            }
        }, myError: function (response) {
            waitingDialog.hide();
        }
    });
}

//Bind Client in Filter popup
function bindAllClient() {
    $("#Clientid").empty();

    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items?$select=ID,Title&$filter=CompanyID eq '" + Logged_CompanyId + "'&$orderby=Title asc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response) {
            $('<option value="All">All</option>').appendTo("#Clientid");
            $('<option value="All">All</option>').appendTo("#ClientOutboxId");

            for (var index = 0; index < response.d.results.length; index++) {
                $("#Clientid").append('<option value="' + response.d.results[index].ID + '">' + response.d.results[index].Title + '</option>');
            }
        }, myError: function (response) {
            waitingDialog.hide();
        }
    });
}


function ShowLocalStorageData() {
    if (localStorage.getItem("FilterProjTStorage") != null && localStorage.getItem("FilterProjTStorage") != "") {
        if ($('#WorkTypeOfProject option').length == 0) {
            bindAllWorkType();
        }
        if ($('#Clientid option').length == 0) {
            bindAllClient();
        }
        var StorageTaskOutcome = '';
        var filterVal = localStorage.getItem("FilterProjTStorage");

        filterVal = filterVal.split(',');
        if (filterVal[0] != null && filterVal[0] != "null") {
            var ProjFilter = filterVal[0].split("|");
            if (ProjFilter[0] == "Projects") {
                if (ProjFilter[1] != "All") {
                    $("#UserAllProject").empty().append('<option value="' + ProjFilter[1] + '">' + ProjFilter[2] + '</option>');
                }
                else {
                    $('#UserAllProject').empty().append("<option value='All'>All</option>");
                }
            }
        }
        $('#ProjectModule').val(filterVal[1]);

        if (filterVal[2] != null && filterVal[2] != "null") {
            var ClientFilter = filterVal[2].split("|");
            if (ClientFilter[0] != "All") {
                $("#Clientid").empty().append('<option value="' + ClientFilter[0] + '" Selected>' + ClientFilter[1] + '</option>');
            }
            else {
                $('#Clientid').empty().append("<option value='All'>All</option>");
            }
        }
		document.getElementById('TabTasks').click();
        $('#WorkTypeOfProject').val(filterVal[3]);
        $('#txtPriority').val(filterVal[4]);
        $('#txtFilterStatusInbox').val(filterVal[5]);
        if (filterVal[6] != null && filterVal[6] != "null" && filterVal[6] != "") {
            var DueDateFilter = filterVal[6];
            $('#taskIn').val(moment(new Date(DueDateFilter)).format("MMMM D, yy"));
            StorageTaskOutcome = DueDateFilter[1];
        }

        if (filterVal[7] != null && filterVal[7] != "null" && filterVal[7] != "") {
            var assignByFilter = filterVal[7].split("|");
            for (var user = 0; user < (assignByFilter.length - 1) ; user++) {
                SetAndResolvePeoplePicker('assigntodrp', assignByFilter[user], false);
            }
            $(window).load(function () {
                var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict["assigntodrp_TopSpan"];
                if (peoplePicker.HasResolvedUsers()) {
                    MutipleBaseFilter();
                }
                else {
                    var interval = setInterval(function () {
                        var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict["assigntodrp_TopSpan"];
                        if (peoplePicker.HasResolvedUsers()) {
                            clearInterval(interval);
                            MutipleBaseFilter();
                        }
                    }, 1000);
                }
            });
        }
        else {
            MutipleBaseFilter();
        }
    }
}

function SetAndResolvePeoplePicker(controlNameID, LoginNameOrEmail, peoplePickerDisable) {
    var peoplePickerDiv = $("[id^='" + controlNameID + "']");
    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
    peoplePicker.AddUserKeys(LoginNameOrEmail);
    if (peoplePickerDisable == true) {
        $('#' + controlNameID + '_TopSpan_EditorInput').attr('disabled', true);
        $('.sp-peoplepicker-delImage').hide();
    }
}
//Prepare query for Filter function
function MutipleBaseFilter() {
    $("#SeeMoreInbox").hide();
    $("#SeeMoreFilterInbox").show();
    $("#tablefooter").show();
    FilterProjTStorage = [];
    var restquery = "";
    var TaskinboxChip = "";
    restquery += "and ProjectName eq '" + $('#UserAllProject').val() + "' ";
    TaskinboxChip += "<div class='upload-chip'>" + $('#UserAllProject option:selected').text() + "</div>";
    FilterProjTStorage.push('Projects|' + $('#UserAllProject').val() + '|' + $('#UserAllProject option:selected').text());
    
    if ($('#ProjectModule').val() != "All") {
        restquery += "and Module/Id eq '" + $('#ProjectModule').val() + "' ";
        TaskinboxChip += "<div class='upload-chip'>" + $('#ProjectModule option:selected').text() + "</div>";
    }
	FilterProjTStorage.push($('#ProjectModule').val());
	
    if ($('#Clientid').val() != "All") {
        restquery += "and ClientID/Id eq '" + $('#Clientid').val() + "' ";
        TaskinboxChip += "<div class='upload-chip'>" + $('#Clientid option:selected').text() + "</div>";
    }
    FilterProjTStorage.push($('#Clientid').val() + '|' + $('#Clientid option:selected').text());

    if ($('#WorkTypeOfProject').val() != "All" && $('#WorkTypeOfProject').val() != null) {
        restquery += "and Worktype eq '" + $('#WorkTypeOfProject').val() + "' ";
        TaskinboxChip += "<div class='upload-chip'>" + $('#WorkTypeOfProject option:selected').text() + "</div>";
        FilterProjTStorage.push($('#WorkTypeOfProject').val());
    }
    else {
    	FilterProjTStorage.push('All');
    }

    if ($('#txtPriority').val() != "All") {
        restquery += "and TaskPriority eq '" + $('#txtPriority').val() + "' ";
        TaskinboxChip += "<div class='upload-chip'>" + $('#txtPriority option:selected').text() + "</div>";
    }
    FilterProjTStorage.push($('#txtPriority').val());

    if ($('#txtFilterStatusInbox').val() != "All") {
        restquery += "and CurrentPhase eq '" + $('#txtFilterStatusInbox').val() + "' ";
        TaskinboxChip += "<div class='upload-chip'>" + $('#txtFilterStatusInbox option:selected').text() + "</div>";
    }
    FilterProjTStorage.push($('#txtFilterStatusInbox').val());

    if ($('#taskIn').val() != null && $('#taskIn').val() != "") {
        var DueDate = $("#taskIn").val();
        var dateDueDate = moment($("#taskIn").val()).format('yy-MM-DD');
        restquery += "and DueDate le '" + dateDueDate + "' ";
        TaskinboxChip += "<div class='upload-chip'>" + $('#taskIn').val() + "</div>";
        FilterProjTStorage.push(moment($("#taskIn").val()).format("DD/MMM/YYYY"));
    }
    else {
    	FilterProjTStorage.push("null");
    }

    if ($("#assigntodrp_TopSpan_ResolvedList").text() != "") {
        getUserInformation('assigntodrp');
        if (assignBy.length > 0) {
            for (var i = 0; i < assignByEmail.split('|').length; i++) {
            	if(assignByEmail.split('|')[i] != "") {
            		if(i == 0){
                		restquery += "and (TaskAssignTo/EMail eq '" + assignByEmail.split('|')[i] + "' or DependencyTo/EMail eq '" + assignByEmail.split('|')[i] + "' ";
                	}
                	else {
                		restquery += "or TaskAssignTo/EMail eq '" + assignByEmail.split('|')[i] + "' or DependencyTo/EMail eq '" + assignByEmail.split('|')[i] + "' ";
                	}
                }
            }
            restquery += ")";
            FilterProjTStorage.push(assignByEmail);
        }
    }
    else {
        FilterProjTStorage.push([]);
        assignByEmail = "";
    }

    $("#myTaskInboxChip").empty();
    $("#myTaskInboxChip").append(TaskinboxChip);
    var projectQuery = "?$top=100&$select=*,ClientID/ID,ClientID/Title,ProjectName,Module/Title,Author/Title,Author/EMail,TaskAssignTo/Title,TaskAssignTo/ID,TaskAssignTo/EMail,DependencyTo/EMail,AttachmentFiles&$Expand=DependencyTo,ClientID,Module,Author,AttachmentFiles,TaskAssignTo&$OrderBy=Modified desc&$filter=CompanyId  eq '" + Logged_CompanyId + "'" + restquery;

    FilterTaskData(projectQuery, "Filter");
}

//Run the query for filter
function FilterTaskData(Query, Action) {
    var IsAssignBy = false;

    $.when(getItemsWithQueryItem('EmployeeTaskDetails', Query, "TaskInbox")).done(function (TaskResults) {
        if (Action == "Filter") {
            $(".mainDivAllAnnouncements").empty();
        }
        var items = TaskResults.results;

        var tableItemsHTML = "";
        if (NextURLInbox == null || NextURLInbox == "") {
            $("#SeeMoreFilterInbox").hide();
        }
        else {
            $("#SeeMoreFilterInbox").show();
        }

        for (var i = 0; i < items.length; i++) {
            var CompletionDate = '';

            var ItemID = items[i].ID;
            var Title = items[i].Title;
            var taskType = items[i].TaskType;
            var TaskAssignFrom = items[i].Author.Title;
            var TaskPriority = items[i].TaskPriority;
            var DueDate = items[i].DueDate;
            var modifiedDate = new Date(DueDate);
            modifiedDate = new Date(modifiedDate);
            if (items[i].Author.EMail == _spPageContextInfo.userEmail) {
                IsAssignBy = true;
            }
            todayDate = new Date();
            var diffDaysServices = Math.round(todayDate.getTime() - modifiedDate.getTime()) / (todayDate);
            var OverDueDate = ""
            if (DueDate != null) {
                DueDate = new Date(DueDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();

            }
            else {
                DueDate = '';
            }
            //var DueDate=new Date(items[i].DueDate);
            //DueDate=$.datepicker.formatDate('dd-mm-yy', DueDate);
            var CompletionPersent = items[i].CompletionPersent;
            var CurrentPhase = items[i].CurrentPhase;
            if (CurrentPhase == "Completed") {
                CompletionDate = new Date(items[i].CompletionDate);
                CompletionDate = titanForWork.ShowCommonStandardDateFormat(CompletionDate);//.toLocaleDateString();
                //CompletionDate=$.datepicker.formatDate('dd-mm-yy', CompletionDate);
            }
            else {
                CompletionDate = "";
            }

            var ProjectFullName = items[i].ProjectFullName;
            if (ProjectFullName == null) {
                ProjectFullName = "General Task";
            }

            var ModuleTitle = '';
            if (items[i].Module != 0) {
                var ModuleTitle = items[i].Module.Title;
                if (ModuleTitle == null) {
                    ModuleTitle = "";
                }
            }

            var ClientTitle = '';
            if (items[i].ClientID != 0) {
                var ClientTitle = items[i].ClientID.Title;
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


            var Worktype = items[i].Worktype;
            if (Worktype == null) {
                Worktype = '';
            }

            var DependencyCount = items[i].DependencyCount;
            if (DependencyCount == null || DependencyCount == 0) {
                DependencyCount = '';
            }
            var TaskAssignTo = items[i].TaskAssignTo;
            var TaskAssignToUsers = '';
            if (TaskAssignTo.results.length > 0) {
                var TaskAssignToUsers = TaskAssignTo.results[0].Title;
            }
            var IsInBox = false;
            TaskAssignTo.results.filter(function (data) {
                if (data.EMail == _spPageContextInfo.userEmail) {
                    IsInBox = true;
                    return;
                }
            });

            var dependencyActionButton = '';
            if (DependencyCount > 0) {
                if (IsInBox == true) {
                    dependencyActionButton = "<button type='button' class='btn custom-btn custom-btn-two mt-16' onclick=taskDependency('" + ItemID + "') >Action</button>";
                }
                else {
                    dependencyActionButton = "<button type='button' class='btn custom-btn custom-btn-two mt-16' onclick=taskDependencyOutbox('" + ItemID + "') >Action</button>";
                }
            }


            var taskStartDate = items[i].StartDate;

            var TaskAssignToButton = '';
            if (TaskAssignTo.results.length > 1) {

                TaskAssignToButton = "<button type='button' class='btn custom-btn custom-btn-two' onclick=taskAssignToUsersModal('" + ItemID + "')>Group</button>";
            }



            var currentuserID = _spPageContextInfo.userId;
            var IsUserInAssigntoGroup = TaskAssignTo.results.map(function (e) { return e.ID; }).indexOf(currentuserID);
            var timeSheetFillButton = '';
            if (IsUserInAssigntoGroup != -1) {
                timeSheetFillButton = "<button type='button' class='btn btn-danger custom-btn-two custom-btn-two-danger mt-16' onclick=\'timeSheetEntry(" + ItemID + ")\'>Fill</button>";
            }
            /////////////////////////////////////
            if (IsAssignBy == true) {

                var Titleurl = "<a class='task-name-box' href='javascript:void(0);' onclick='redirectModifyTask(this);' name='" + _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(ItemID) + "&EditMode=" + window.btoa('True') + "&ProjectID=" + txtProjectID + "'><b class='ellipsis-2'>" + Title + "</b></a>";
            }
            else {
                var Titleurl = "<a class='task-name-box' href='javascript:void(0);' onclick='redirectModifyTask(this);' name='" + _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(ItemID) + "&EditMode=" + window.btoa('False') + "&ProjectID=" + txtProjectID + "'><b class='ellipsis-2'>" + Title + "</b></a>";
            }
            if (IsInBox == true) {
                var TimesheetHtml = "<td class='text-center myTask-timesheet-col'><h4 class='m-0 cursor-pointer' id='timehrs" + ItemID + "' onclick=\'timeSheetHours(this," + ItemID + ")\'></h4><button type='button' class='btn custom-btn custom-btn-two mt-16 hourbtn' onclick=\'timeSheetHours(this," + ItemID + ")\'>Hours</button>" + timeSheetFillButton + "</td>";
            }
            else {
                var TimesheetHtml = "<td class='text-center myTask-timesheet-col'><h4 class='m-0 cursor-pointer' id='timehrs" + ItemID + "' onclick=\'timeSheetHours(this," + ItemID + ")\'></h4>" + timeSheetFillButton + "</td>";
            }


            // Generate Dynamic HTML
            if (diffDaysServices > 1 && CurrentPhase == "Open") {
                //tableItemsHTML += "<tr><td>" + Titleurl + "</td><td>" + ProjectFullName+ "</td><td>" + TaskAssignToUsers + "</td><td>" + TaskAssignFrom + "</td><td>" + TaskPriority+ "</td><td style='font-weight: bold;color: red;'>" +DueDate+ "</td><td>" + CurrentPhase+ "</td><td>" + CompletionPersent+ "</td></tr>";
                tableItemsHTML += "<tr>" +
                     "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
                     "<label class='m-0 b-400'>Project:</label><span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p></td>" +
                     "<td class='text-center'>" +
                     "<div class=''>" +
                     "<p class='m-0 ellipsis-1'>" + Worktype + "</p>" +
                    "<p class='m-0 ellipsis-1 mt-29'>" + ClientModuleType + "</p>" +
                    "</div></td>" +
                    "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p></td>" +
                    "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignToUsers + "</p>" +
                    "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div>" +
                    "</td>" +
                    "<td class='text-center'><p class='m-0 mb-10'>" + CurrentPhase + "</p>" +
                    "<p class='m-0 font-12 DueDateTask' style='font-weight: bold;color: red;'>Due: <span>" + DueDate + "</span></p>" +
                    "<div class='progress custom-progress progress-danger m-0 mt-4'>" +
                    "<div class='progress-bar progress-bar-danger' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
                    "<td class='text-center'><h4 class='m-0'>" + DependencyCount + "</h4>" + dependencyActionButton + "</td>" +
                    TimesheetHtml +
                    "</tr>";
                //$("#allProject").append(option);

            } else {
                //tableItemsHTML += "<tr><td>" + Titleurl + "</td><td>" + ProjectFullName+ "</td><td>" + TaskAssignToUsers + "</td><td>" + TaskAssignFrom + "</td><td>" + TaskPriority+ "</td><td>" +DueDate+ "</td><td>" + CurrentPhase+ "</td><td>" + CompletionPersent+ "</td></tr>";	
                tableItemsHTML += "<tr>" +
             "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
             "<label class='m-0 b-400'>Project:</label><span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p></td>" +
             "<td class='text-center'>" +
             "<div class=''>" +
             "<p class='m-0 ellipsis-1'>" + Worktype + "</p>" +
            "<p class='m-0 ellipsis-1 mt-29'>" + ClientModuleType + "</p>" +
            "</div></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignToUsers + "</p>" +
            "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div>" +
            "</td>" +
            "<td class='text-center'><p class='m-0 mb-10'>" + CurrentPhase + "</p>" +
            "<p class='m-0 font-12 DueDateTask'>Due: <span>" + DueDate + "</span></p>" +
            "<div class='progress custom-progress progress-success m-0 mt-4'>" +
            "<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
            "<td class='text-center'><h4 class='m-0'>" + DependencyCount + "</h4>" + dependencyActionButton + "</td>" +
            TimesheetHtml +
            "</tr>";
            }
        }

        if (items.length == 0) {
            $(".NoRecordFound").show();
        }
        else {
            $(".NoRecordFound").hide();
        }

        $(".mainDivAllAnnouncements").append(tableItemsHTML);


        //Showing data out of total
        if ($('#TempTableQuestions>tbody tr').length > 100 && NextURLInbox != null) {
            $("#ShowTotalItemsInbox").hide();
            $("#ShowItemsInbox").show();
            $("#DiplayTaskCount").text($('#TempTableQuestions>tbody tr').length);
        }
        else {
            $("#ShowTotalItemsInbox").show();
            $("#ShowItemsInbox").hide();
            $("#TotalItemscount").text(items.length);
        }
        if ($('#TempTableQuestions>tbody tr').length == 5000) {
            NextURLInbox = null;
            $("#SeeMoreFilterInbox").hide();
        }
        if (items.length > 0) {
            TableConfiguration();
        }

    }).fail(function (error) {
        if (error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1) {
            alert("System found too many tasks, which crossed the threshold limit. Recommended to define the specific filter.");
            $("#tablefooter").hide();
            $("#SeeMoreInbox").hide();
            $("#SeeMoreFilterInbox").hide();
            return false;
        }
    });
}

//to clear the people picker
function clearPeoplePickerControl(pickerId) {
    var toSpanKey = pickerId + "_TopSpan";
    var peoplePicker = null;
    var ClientPickerDict = this.SPClientPeoplePicker.SPClientPeoplePickerDict;
    for (var propertyName in ClientPickerDict) {
        if (propertyName == toSpanKey) {
            peoplePicker = ClientPickerDict[propertyName];
            break;
        }
    }

    if (peoplePicker) {
        var ResolvedUsersList = $(document.getElementById(peoplePicker.ResolvedListElementId)).find("span[class='sp-peoplepicker-userSpan']");
        $(ResolvedUsersList).each(function (index) {
            peoplePicker.DeleteProcessedUser(this);
        });
    }
}


//Clear filter control box
function ClearFilter() {
    //$('#UserAllProject').val("All");
    $('#ProjectModule').val("All");
    $('#WorkTypeOfProject').val("All");
    $('#txtPriority').val("All");
    $('#Clientid').val("All");
	localStorage.removeItem("FilterProjTStorage");
    $('#taskIn').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusInbox').val("Open");
    //$('#assigntodrp').val(_spPageContextInfo.userId);
    clearPeoplePickerControl("assigntodrp");
    var Current = "Open";
    var AssignTodata = _spPageContextInfo.userId;
    $("#myTaskInboxChip").empty();
    GetTasksInOutBox("Open", "All", "PageLoad", ""); // get tasks as page load
}


//display piechart (Completed and Open task)
function dislayPieChart() {
    var dfds = $.Deferred();
    var arrComplatedTasks = [];
    var arrOpenTasks = [];
    var arrHoldTasks = [];
    var arrCancelTasks = [];
    var arrCloseTasks = [];
    var Query = "?$top=5000&$select=Id,OpenTasks,CompletedTasks,OnHoldTasks,CancelledTasks,CloseTasks,CompanyId&$filter=CompanyId eq '" + Logged_CompanyId + "' and Id eq '" + txtProjectID + "' ";
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items/" + Query;
    $.when(getItems(url, dfds)).done(function (Results) {
        response = [];

        arrComplatedTasks = Results[0].CompletedTasks ? Results[0].CompletedTasks : 0;
        arrOpenTasks = Results[0].OpenTasks ? Results[0].OpenTasks : 0;
        arrHoldTasks = Results[0].OnHoldTasks ? Results[0].OnHoldTasks : 0;
        arrCancelTasks = Results[0].CancelledTasks ? Results[0].CancelledTasks : 0;
        arrCloseTasks = Results[0].CloseTasks ? Results[0].CloseTasks : 0;

        //PieChart
        var chartDiv = $("#PieChart");

        if (arrComplatedTasks == 0 && arrOpenTasks == 0 && arrHoldTasks == 0 && arrCancelTasks == 0 && arrCloseTasks == 0) {
            $(".Chartcircle").show();
            $("#PieChart").hide();
        }
        else {
            var myChart = new Chart(chartDiv, {
                type: 'pie',
                data: {
                    labels: ["Completed", "Open", "Hold", "Cancelled", "Close"],
                    datasets: [
	                {
	                    data: [arrComplatedTasks, arrOpenTasks, arrHoldTasks, arrCancelTasks, arrCloseTasks],
	                    backgroundColor: [
	                       "#afb83b",
			                "#14aaf5",
			                "#ff9933",
			                "#db4035",
			                "#299438"
	                    ]
	                }]
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    },
                    legend: {
                        position: 'right',
                        maxHeight: 122,
                        display: true,
                        padding: 0,
                        pointStyle: true,
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                }
            });
        }
    });
}

//to display bar chart 
function displayBarChart(EstimatedWorkHours, LoggedHours, VerifiedHours, BillableHours) {

    if (EstimatedWorkHours == null) {
        EstimatedWorkHours = 0;
    }
    if (LoggedHours == null) {
        LoggedHours = 0;
    }
    if (VerifiedHours == null) {
        VerifiedHours = 0;
    }
    if (BillableHours == null) {
        BillableHours = 0;
    }
    if (EstimatedWorkHours == 0 && LoggedHours == 0 && VerifiedHours == 0 && BillableHours == 0) {
        EstimatedWorkHours = LoggedHours = VerifiedHours = BillableHours = 20;
    }

    let data = [
	    ['Estimated', EstimatedWorkHours],
	    ['Logged', LoggedHours],
	    ['Verified', VerifiedHours],
	    ['Billed', BillableHours],
    ];
    const options = {
        width: 320,
        height: 227,
        title: '',
        titleFontSize: 18,
        titleBG: '#f7f7f7',
        titleColor: 'black',
        barColors: ['blue'],
        labelColors: ['black'],
        labelPos: 'center',
        axisColor: 'black',
        axisWidth: 3,
        barSpacing: 0.6,
        ticks: 4
    };
    // createBarChart(data, element, options);
    const chart = document.getElementById('BarChart');
    createBarChart(data, chart, options);
    if (EstimatedWorkHours == 20 && LoggedHours == 20 && VerifiedHours == 20 && BillableHours == 20) {
        $("#chart-1-bar-1").hide();
        $("#chart-1-bar-2").hide();
        $("#chart-1-bar-3").hide();
        $("#chart-1-bar-4").hide();
    }
    else {
        if ($("#chart-1-bar-1").text() == '0') {
            $("#chart-1-bar-1").hide();
        }
        if ($("#chart-1-bar-2").text() == '0') {
            $("#chart-1-bar-2").hide();
        }
        if ($("#chart-1-bar-3").text() == '0') {
            $("#chart-1-bar-3").hide();
        }
        if ($("#chart-1-bar-4").text() == '0') {
            $("#chart-1-bar-4").hide();
        }

        $("#chart-1-bar-1").css({ "background": "#338AFF" });
        $("#chart-1-bar-2").css({ "background": "#9932CC" });
        $("#chart-1-bar-3").css({ "background": "#9ACD32" });
        $("#chart-1-bar-4").css({ "background": "##00CED1" });
    }
}

//to make people picker - multiple
function initializePeoplePicker(peoplePickerElementId) {
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '280px';
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

function getUserInformation(PeoplepickerId) {
    assignBy = [];
    assignByEmail = "";
    var userIds = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if (!peoplePicker.IsEmpty()) {
        if (peoplePicker.HasInputError) return false; // if any error  
        else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users  
        else if (peoplePicker.TotalUserCount > 0) {
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            var promise = '';
            var UsersID = '';
            for (var i = 0; i < users.length; i++) {
                assignBy.push(users[i].DisplayText);
                var accountName = users[i].Key;
                assignByEmail += users[i].Key.split('|')[2] + "|";
                var userId = GetUserID(accountName);
                if (userId != -1) {
                    userIds.push(userId);
                }
            }
            return userIds;
        }
    }
    else {
        return UsersID;
    }
}

// Get the user ID.
function GetUserID(logonName) {
    var item = {
        'logonName': logonName
    }
    var userId = -1;
    var UserId = $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + '/_api/web/ensureuser',
        type: 'POST',
        async: false,
        contentType: 'application/json;odata=verbose',
        data: JSON.stringify(item),
        headers: {
            'Accept': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        success: function (data) {
            userId = data.d.Id;
        },
        error: function (data) {
            console.log(data);
        }
    })
    return userId
}

function userActivityNotificationEntry() {
    var ProjectName = titanForWork.getQueryStringParameter("ProjectName");
    var ListName = "NotificationCenter";
    var Metadata;
    Metadata = {
        __metadata: { 'type': 'SP.Data.NotificationCenterListItem' },
        'Title': ProjectName,
        'WebpartName': 'ProjectDetails',
        'UserAction': 'Content Read',
        'Details': window.location.href,
        'LocationIDId': parseInt(Logged_Location),
        'Designation': Logged_Designation,
        'AppVersion': '2.7',
        'ItemId': txtProjectID,
        'UserIDId': _spPageContextInfo.userId,
        'Application': 'Website',
        'ContentCategory': 'ViewProjectDetails',
        'Environment': 'Windows',
        'DepartmentIdId': parseInt(Logged_DepartmentId),
        'CompanyIdId': parseInt(Logged_CompanyId)
    };


    $.when(AddItemNotification(ListName, Metadata)).done(function (responseIdmore) {

    })

}

//to colled the data for gantt chart
function CreateTaskGanttChart() {
    $(".TaskGantt").empty();
    var arrGanttBind = [];
    var TempModule = [];
    TaskdemoSource = [];
    var IsAssignBy = false;
    var IsAssinTo = [];
    var Query = "?$top=1000&$select=*,Module/Title,Author/Title,Author/EMail,ProjectID/Id,TaskAssignTo/Title,TaskAssignTo/EMail,TaskAssignTo/ID&$Expand=Module,Author,TaskAssignTo,ProjectID&$filter=CompanyId eq '" + Logged_CompanyId + "' and ProjectID/Id eq '" + txtProjectID + "' ";
    $.when(getItemsWithQueryItem('EmployeeTaskDetails', Query, "")).done(function (TaskResults) {
        var items = TaskResults.results;
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].Module != 0) {
                    if (jQuery.inArray(items[i].Module.Title, TempModule) != '-1') {
                        //Do Nothing. Elements contains this already

                    }
                    else {
                        arrGanttBind = [];
                        var currentModule = items[i].Module.Title;
                        if(currentModule == null){
                        	currentModule = "";
                        }
                        arrGanttBind = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
                            return obj.Module.Title == currentModule;
                        });
                        for (var module = 0; module < arrGanttBind.length; module++) {
                            var fromDate = new Date(arrGanttBind[module].StartDate).setHours(0, 0, 0, 0);
                            fromDate = new Date(fromDate);
                            var endDate = new Date(arrGanttBind[module].DueDate).setHours(0, 0, 0, 0);
                            endDate = new Date(endDate);

                            IsAssinTo = arrGanttBind[module].TaskAssignTo.results.filter(function (obj) { //Filter array on the basis of CurrentPhase
                                return obj.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase();
                            });

                            if (arrGanttBind[module].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                                IsAssignBy = true;
                            }
                            if (IsAssinTo.length == 0 && IsAssignBy == false) {
                                var LocationURL = "";
                            }
                            else {
                                if (IsAssignBy == true) {
                                    var LocationURL = _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(arrGanttBind[module].Id) + "&EditMode=" + window.btoa('True');
                                }
                                else {
                                    var LocationURL = _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(arrGanttBind[module].Id) + "&EditMode=" + window.btoa('False');
                                }
                            }
                            var customClass = '';
                            var fullTitle = arrGanttBind[module].Title;
                            if (arrGanttBind[module].Title.length > 22) {
                                arrGanttBind[module].Title = arrGanttBind[module].Title.substring(0, 22) + "...";
                            }
                            
                            if(new Date(arrGanttBind[module].DueDate) < new Date(new Date().setHours(0, 0, 0, 0)) && arrGanttBind[module].CurrentPhase == "Open") {
                                fullTitle = fullTitle + " (Overdue)";
                                customClass = 'ganttBlueBorder';
                            }
							else {
	                            if (arrGanttBind[module].CurrentPhase == "Open") {
	                                customClass = 'ganttBlueBorder';
	                                fullTitle = fullTitle + " (Open)";
	                            }
	                            else if (arrGanttBind[module].CurrentPhase == "Completed") {
	                                customClass = 'ganttOliveBorder';
	                                fullTitle = fullTitle + " (Completed)";
	                            }
	                            else if (arrGanttBind[module].CurrentPhase == "Hold") {
	                                customClass = 'ganttOrangeBorder';//ganttOrange
	                                fullTitle = fullTitle + " (Hold)";
	                            }
	                            else if (arrGanttBind[module].CurrentPhase == "Cancelled") {
	                                customClass = 'ganttRedBorder';
	                                fullTitle = fullTitle + " (Cancelled)";
	                            }
	                            else { //Close
	                                customClass = 'ganttGreenBorder';
	                                fullTitle = fullTitle + " (Close)";
	                            } 
	                        }   
	                        var HTMLTilte = fullTitle;
                            var completeTaskHTML = HTMLTilte + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].StartDate)) + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].DueDate)) + ";" + arrGanttBind[module].CompletionPersent ;
                            if (module == 0) {
                                TaskdemoSource.push({
                                    name: currentModule,
                                    desc: arrGanttBind[module].Title,
                                    values: [{
                                        from: fromDate,
                                        to: endDate,
                                        label: fullTitle,
                                        customClass: customClass,
                                        fullTitle: fullTitle,
                                        dataObj: [arrGanttBind[module].Id, parseInt(arrGanttBind[module].CompletionPersent), arrGanttBind[module].CurrentPhase, completeTaskHTML, LocationURL]
                                    }]
                                });
                            }
                            else {
                                TaskdemoSource.push({
                                    desc: arrGanttBind[module].Title,
                                    values: [{
                                        from: fromDate,
                                        to: endDate,
                                        label: fullTitle,
                                        customClass: customClass,
                                        fullTitle: fullTitle,
                                        dataObj: [arrGanttBind[module].Id, parseInt(arrGanttBind[module].CompletionPersent), arrGanttBind[module].CurrentPhase, completeTaskHTML, LocationURL]
                                    }]
                                });
                            }
                        }
                        TempModule.push(items[i].Module.Title);
                    }
                }
            }
            arrGanttBind = [];
            IsAssinTo = [];
            IsAssignBy = false
            var currentModule = null;
            arrGanttBind = items.filter(function (obj) { //Filter array on the basis of Module
                return obj.Module.Title == currentModule || obj.Module.Title == "";
            });
            for (var module = 0; module < arrGanttBind.length; module++) {
                var fromDate = new Date(arrGanttBind[module].StartDate).setHours(0, 0, 0, 0);
                fromDate = new Date(fromDate);
                var endDate = new Date(arrGanttBind[module].DueDate).setHours(0, 0, 0, 0);
                endDate = new Date(endDate);

                /*var fromDate = new Date(arrGanttBind[module].StartDate);
                fromDate = new Date(fromDate.setDate(fromDate.getDate() + 4)).setHours(0, 0, 0, 0);
                var endDate = new Date(arrGanttBind[module].DueDate);
                endDate = new Date(endDate.setDate(endDate.getDate() + 4)).setHours(0, 0, 0, 0);*/
                IsAssinTo = arrGanttBind[module].TaskAssignTo.results.filter(function (obj) {
                    return obj.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase();
                });

                if (arrGanttBind[module].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                    IsAssignBy = true;
                }
                if (IsAssinTo.length == 0 && IsAssignBy == false) {
                    var LocationURL = "";
                }
                else {
                    if (IsAssignBy == true) {
                        var LocationURL = _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(arrGanttBind[module].Id) + "&EditMode=" + window.btoa('True');
                    }
                    else {
                        var LocationURL = _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(arrGanttBind[module].Id) + "&EditMode=" + window.btoa('False');
                    }
                }
                var fullTitle = arrGanttBind[module].Title;
                if (arrGanttBind[module].Title.length > 22) {
                    arrGanttBind[module].Title = arrGanttBind[module].Title.substring(0, 22) + "...";
                }
                
                if(new Date(arrGanttBind[module].DueDate) < new Date(new Date().setHours(0, 0, 0, 0)) && arrGanttBind[module].CurrentPhase == "Open") {
                	customClass = 'ganttBlueBorder';
                    fullTitle = fullTitle + " (Overdue)";
                }
                else {
	                if (arrGanttBind[module].CurrentPhase == "Open") {
	                    customClass = 'ganttBlueBorder';
	                    fullTitle = fullTitle + " (Open)";
	                }
	                else if (arrGanttBind[module].CurrentPhase == "Completed") {
	                    customClass = 'ganttOliveBorder';
	                    fullTitle = fullTitle + " (Completed)";
	                }
	                else if (arrGanttBind[module].CurrentPhase == "Hold") {
	                    customClass = 'ganttOrangeBorder';//ganttOrange
	                    fullTitle = fullTitle + " (Hold)";
	                }
	                else if (arrGanttBind[module].CurrentPhase == "Cancelled") {
	                    customClass = 'ganttRedBorder';
	                    fullTitle = fullTitle + " (Cancelled)";
	                }
	                else { //Close
	                    customClass = 'ganttGreenBorder';
	                    fullTitle = fullTitle + " (Close)";
	                }
	            }
	            var HTMLTilte = fullTitle;
                var completeTaskHTML = HTMLTilte + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].StartDate)) + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].DueDate)) + ";" + arrGanttBind[module].CompletionPersent ;
                if (module == 0) {
                    TaskdemoSource.push({
                        name: "Undefined",
                        desc: arrGanttBind[module].Title,
                        values: [{
                            from: fromDate,
                            to: endDate,
                            label: fullTitle,
                            customClass: customClass,
                            fullTitle: fullTitle,
                            dataObj: [arrGanttBind[module].Id, parseInt(arrGanttBind[module].CompletionPersent), arrGanttBind[module].CurrentPhase, completeTaskHTML, LocationURL]
                        }]
                    });
                }
                else {
                    TaskdemoSource.push({
                        desc: arrGanttBind[module].Title,
                        values: [{
                            from: fromDate,
                            to: endDate,
                            label: fullTitle,
                            customClass: customClass,
                            fullTitle: fullTitle,
                            dataObj: [arrGanttBind[module].Id, parseInt(arrGanttBind[module].CompletionPersent), arrGanttBind[module].CurrentPhase, completeTaskHTML, LocationURL]
                        }]
                    });
                }
            }
        }
    }).fail(function (error) {
        if (error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1) {
            var htmlNotAuthorized = '<div class="col-md-12">' +
                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                '<span><h2 class="text-center">Tasks are too much. Cannot display in Gantt chart.</h2></span>';
            $(".TaskGantt").html(htmlNotAuthorized);
        }
    });

}

//bind gantt chart
function BindGanttTaskChart() {
	CreateTaskGanttChart();
    if (TaskdemoSource.length > 0 && IsThresholdErrorTask == false) {
        "use strict";
        // shifts dates closer to Date.now()
        var offset = new Date().setHours(0, 0, 0, 0) -
	        new Date(TaskdemoSource[0].values[0].from).setDate(35);
	        if(new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1].indexOf('India Standard Time') != -1) {
		        for (var i = 0, len = TaskdemoSource.length, value; i < len; i++) {
		            value = TaskdemoSource[i].values[0];
		            value.from += offset;
		            value.to += offset;
		        }
		    }

        $(".TaskGantt").gantt({
            source: TaskdemoSource,
            navigate: "scroll",
            scale: "weeks",
            maxScale: "months",
            minScale: "hours",
            itemsPerPage: 10,
            scrollToToday: false,
            useCookie: true,
            onItemClick: function (data) {
                if (data[4] != "") {
                    location.href = data[4];
                }
            }
        });

        $(".TaskGantt").popover({
            selector: ".bar",
            title: function _getItemText(value) {
            	var tempVar = this.id.split(';');
            	tempVar = 'Task Name: '+tempVar[0];
                return tempVar;
            },
            container: '.TaskGantt',
            content: function _getItemText(value) {
            	var tempVar = this.id.split(';');
            	var completeTaskHTML = '';
            	if(tempVar[3] == "null" || tempVar[3] == null) {
            		tempVar[3] = '0';
            	}
                completeTaskHTML = 'Start Date: '+tempVar[1] +'; Due Date: '+tempVar[2]+'; Completion: ' + tempVar[3] + ' %';
                return completeTaskHTML;
            },
            trigger: "hover",
            placement: "auto right"
        });
    }
    else {
        var htmlNotAuthorized = '<div class="col-md-12">' +
                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                '<span><h2 class="text-center">No task created.</h2></span>';
        $(".TaskGantt").html(htmlNotAuthorized);
    }
}


//check if current project is already added to Favorite project
function checkFavoriteProject() {
    $("#btnAddToFavorite").html('');
    var Query = "?$select=Id,Title,Category,Name,Link,Icon,Active,User/Id,User/EMail&$expand=User&$filter=Category eq 'Project' and Name eq '" + $("#txtProjectName").text() + "' and User/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQueryItem('MyFavorites', Query)).done(function (FavResults) {
        if (FavResults.results.length > 0) {
            if (FavResults.results[0].Active == true) {
                $("#btnAddToFavorite").append('<a href="javascript:void(0);" id="txtFavorite"><img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/Projects_New/assets/images/favourite-icon.png">Delete from Favorite</a>');
                $("#txtFavorite").click(function () {
                    UpdateFavoriteProject(FavResults.results[0].Id, false);
                });
            }
            else {
                $("#btnAddToFavorite").append('<a href="javascript:void(0);" id="txtFavorite"><img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/Projects_New/assets/images/favourite-icon.png">Add to Favorite</a>');
                $("#txtFavorite").click(function () {
                    UpdateFavoriteProject(FavResults.results[0].Id, true);
                });
            }
        }
        else {
            $("#btnAddToFavorite").append('<a href="javascript:void(0);" id="txtFavorite"><img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/Projects_New/assets/images/favourite-icon.png">Add to Favorite</a>');
            $("#txtFavorite").click(function () {
                AddFavoriteProject();
            });
        }
    });

}

//Update to favorite
function UpdateFavoriteProject(ItemId, IsActive) {
    var Metadata;
    Metadata = {
        __metadata: { 'type': 'SP.Data.MyFavoritesListItem' },
        'Title': $("#txtProjectName").text(),
        'Name': $("#txtProjectName").text(),
        'Category': 'Project',
        'Link': window.location.href,
        'UserId': _spPageContextInfo.userId,
        'Icon': {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': '',
            'Url': _spPageContextInfo.webAbsoluteUrl + '/SiteAssets/MyFavorite/Images/fav-project.png'
        },
        'Active': IsActive
    };
    var dfd = $.Deferred();
    var apiPath = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MyFavorites')/items('" + ItemId + "')";
    $.ajax({
        url: apiPath,
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
            checkFavoriteProject();
            if($("#txtFavorite").text() == "Add to Favorite") {
                alert("Deleted from favorite.");
            }
            else{
                alert("Add to favorite.");
            }
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Add to favorite
function AddFavoriteProject() {
    var Metadata;
    Metadata = {
        __metadata: { 'type': 'SP.Data.MyFavoritesListItem' },
        'Title': $("#txtProjectName").text(),
        'Name': $("#txtProjectName").text(),
        'Category': 'Project',
        'Link': window.location.href,
        'UserId': _spPageContextInfo.userId,
        'Icon': {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': '',
            'Url': _spPageContextInfo.webAbsoluteUrl + '/SiteAssets/MyFavorite/Images/fav-project.png'
        },
        'Active': true
    };
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MyFavorites')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            checkFavoriteProject();
            alert("Added to favorite.");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


function OpenAdvanceSearch() {


	location.href = _spPageContextInfo.webAbsoluteUrl + "/Pages/AdvancedSearch.aspx?typeofDocument=" + btoa(typeofDocument) + "&typeofLibName="+btoa(typeofLibName) +"&Modular="+btoa(IsDMSModules)+"" ;
}



