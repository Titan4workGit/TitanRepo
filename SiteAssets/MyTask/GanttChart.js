var TaskdemoSource = '';
var arrCurrentGantt = [];
var FirstGanttRun = false;
$(document).ready(function () {
    $("#ganchatevent").click(function () {
        $('.callinginbox').modal('show');
        $('.botheventwork').show();
        if ($('#WorkTypeOfProject option').length == 0) {
            bindAllWorkType();
        }
        $('#btnTaskInFilter').hide();
        $('#btnTaskInClear').hide();
        $('#btnKanbanFilter').hide();
        $('#btnClearKanban').hide();
        $('#btnGanttFilter').show();
        $('#btnGanttClear').show();
        $("#taskIn").datepicker();
        $('#taskIn').datepicker("option", "dateFormat", "MM dd, yy");
    });
    $("#ganttchat").click(function () {
    	if(FirstGanttRun == false) {
    		FirstGanttRun = true;
        	CreateTaskGanttChart(arrLimitTaskInbox);
    	}
    });
    $("#btnGanttFilter").click(function () {
        FilterGantt();
    });
    $("#btnGanttClear").click(function () {
        ClearGantt();
    });
    $("#rdoGanttTaskIn").change(function () {
        $("#txtFilterAssignBy").text("Assigned By:");
    });
    $("#rdoGanttTaskOut").change(function () {
        $("#txtFilterAssignBy").text("Assigned To:");
    });
    SortGanttTasks();
});

//Filter method for gantt
function FilterGantt() {
    if ($("#rdoGanttTaskIn").prop('checked') == true) {
        TaskInGantt();
    }
    else {
        TaskOutGantt();
    }
}


//a. Gantt Filter TaskIn
function TaskInGantt() {
    arrFilterDataBind = [];
    var TaskGanttChip = "",
        assigntoQuery = '';
    assigntobyme = [];

    //Filter value display starts
    if ($('#UserAllProject').val() != "All") {
        if ($('#UserAllProject').val() == "General Task") {
            TaskGanttChip += "<div class='upload-chip'>General Task</div>";
        }
        else {
            if ($('#ddlInboxProject').val() != "All") {
                TaskGanttChip += "<div class='upload-chip'>" + $('#ddlInboxProject option:selected').text() + "</div>";
            }
            else {
                TaskGanttChip += "<div class='upload-chip'>" + $('#ddlInboxProject option:selected').text() + "</div>";
            }
        }
    }

    if ($('#ProjectModule').val() != "All") {
        var ModuleValue2 = $('#ProjectModule').val();
        TaskGanttChip += "<div class='upload-chip'>" + $('#ProjectModule option:selected').text() + "</div>";
    }

    if ($('#ddlInboxClient').val() != "All") {
        TaskGanttChip += "<div class='upload-chip'>" + $('#ddlInboxClient option:selected').text() + "</div>";
    }

    if ($('#WorkTypeOfProject').val() != "All") {
        TaskGanttChip += "<div class='upload-chip'>" + $('#WorkTypeOfProject option:selected').text() + "</div>";
    }

    if ($('#txtPriority').val() != "All") {
        TaskGanttChip += "<div class='upload-chip'>" + $('#txtPriority option:selected').text() + "</div>";
    }

    if ($('#txtFilterStatusInbox').val() != "All") {
        TaskGanttChip += "<div class='upload-chip'>" + $('#txtFilterStatusInbox option:selected').text() + "</div>";
    }

    if ($('#taskIn').val() != null && $('#taskIn').val() != "") {
        if (TaskOutCome == "TaskPending") {
            TaskGanttChip += "<div class='upload-chip'>Pending</div>";
        }
        else if (TaskOutCome == "TaskOverdue") {
            TaskGanttChip += "<div class='upload-chip'>Overdue</div>";
        }
        else {
            TaskGanttChip += "<div class='upload-chip'>" + moment($("#taskIn").val()).format("DD/MMM/YYYY") + "</div>";
        }
    }

    if ($("#pplassigntoInbox_TopSpan_ResolvedList").text() != "") {
        getUserInformation('pplassigntoInbox');
        TaskGanttChip += "<div class='upload-chip'>" + assignBy.join(', ') + "</div>";
    }
    else {
        TaskGanttChip += "<div class='upload-chip'>" + _spPageContextInfo.userDisplayName + "</div>";
        assignByEmail = "";
    }
    //Filter value display ends
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    arrFilterDataBind = arrAllTaskInbox.filter(function (obj, index) { //Filter array
        if ($('#UserAllProject').val() != "All") {
            if ($('#UserAllProject').val() == "General Task") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.ProjectFullName != "" : obj.ProjectFullName == ProjectValue);
            }
            else if($('#UserAllProject').val() == "TeamMeeting") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.TaskCategory != "" : obj.TaskCategory == $('#UserAllProject').val());
            }
            else if($('#UserAllProject').val() == "TeamChannel") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.TaskCategory != "" : obj.TaskCategory == $('#UserAllProject').val());
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
            var DueDateFilter = (dateDueDate == "" ? arrDueDate != "" : arrDueDate <= dateDueDate);
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
        obj.Module.ID = obj.Module.ID ? obj.Module.ID : "";
        return (ProjectFilter) &&
                (ClientValue == "All" ? obj.ClientID.ID != "null" : obj.ClientID.ID == ClientValue) &&
                (ModuleValue == "All" ? obj.Module.ID != "null" : obj.Module.ID == ModuleValue) &&
                (WorkTypeValue == "All" ? obj.Worktype != "" : obj.Worktype == WorkTypeValue) &&
                (CurrentPhaseValue == "All" ? obj.CurrentPhase != "" : obj.CurrentPhase == CurrentPhaseValue) &&
                (PriorityValue == "All" ? obj.TaskPriority != "" : obj.TaskPriority == PriorityValue) &&
                (DueDateFilter) &&
                (assigntoQuery)
    });

    $("#myGanttChip").empty();
    $("#myGanttChip").append(TaskGanttChip);
    arrCurrentGantt = arrFilterDataBind.filter(function(f){return f;})
    CreateTaskGanttChart(arrFilterDataBind);
}


//a. Gantt Filter TaskOut
function TaskOutGantt() {
    arrFilterDataBind = [];
    var TaskGanttChip = "",
        assigntoQuery = '';
    assigntobyme = [];

    //Filter value display starts
    if ($('#UserAllProject').val() != "All") {
        if ($('#UserAllProject').val() == "General Task") {
            TaskGanttChip += "<div class='upload-chip'>General Task</div>";
        }
        else {
            if ($('#ddlInboxProject').val() != "All") {
                TaskGanttChip += "<div class='upload-chip'>" + $('#ddlInboxProject option:selected').text() + "</div>";
            }
            else {
                TaskGanttChip += "<div class='upload-chip'>" + $('#ddlInboxProject option:selected').text() + "</div>";
            }
        }
    }

    if ($('#ProjectModule').val() != "All") {
        var ModuleValue2 = $('#ProjectModule').val();
        TaskGanttChip += "<div class='upload-chip'>" + $('#ProjectModule option:selected').text() + "</div>";
    }

    if ($('#ddlInboxClient').val() != "All") {
        TaskGanttChip += "<div class='upload-chip'>" + $('#ddlInboxClient option:selected').text() + "</div>";
    }

    if ($('#WorkTypeOfProject').val() != "All") {
        TaskGanttChip += "<div class='upload-chip'>" + $('#WorkTypeOfProject option:selected').text() + "</div>";
    }

    if ($('#txtPriority').val() != "All") {
        TaskGanttChip += "<div class='upload-chip'>" + $('#txtPriority option:selected').text() + "</div>";
    }

    if ($('#txtFilterStatusInbox').val() != "All") {
        TaskGanttChip += "<div class='upload-chip'>" + $('#txtFilterStatusInbox option:selected').text() + "</div>";
    }

    if ($('#taskIn').val() != null && $('#taskIn').val() != "") {
        if (TaskOutCome == "TaskPending") {
            TaskGanttChip += "<div class='upload-chip'>Pending</div>";
        }
        else if (TaskOutCome == "TaskOverdue") {
            TaskGanttChip += "<div class='upload-chip'>Overdue</div>";
        }
        else {
            TaskGanttChip += "<div class='upload-chip'>" + moment($("#taskIn").val()).format("DD/MMM/YYYY") + "</div>";
        }
    }

    if ($("#pplassigntoInbox_TopSpan_ResolvedList").text() != "") {
        getUserInformation('pplassigntoInbox');
        TaskGanttChip += "<div class='upload-chip'>" + assignBy.join(', ') + "</div>";
    }
    else {
        TaskGanttChip += "<div class='upload-chip'>" + _spPageContextInfo.userDisplayName + "</div>";
        assignByEmail = "";
    }

    //Filter value display ends
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    arrFilterDataBind = arrAllTaskOutbox.filter(function (obj, index) { //Filter array
        if ($('#UserAllProject').val() != "All") {
            if ($('#UserAllProject').val() == "General Task") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.ProjectFullName != "" : obj.ProjectFullName == ProjectValue);
            }
            else if($('#UserAllProject').val() == "TeamMeeting") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.TaskCategory != "" : obj.TaskCategory == $('#UserAllProject').val());
            }
            else if($('#UserAllProject').val() == "TeamChannel") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.TaskCategory != "" : obj.TaskCategory == $('#UserAllProject').val());
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
            var DueDateFilter = (dateDueDate == "" ? arrDueDate != "" : arrDueDate <= dateDueDate);
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
                    for (var usr = 0; usr < obj.TaskAssignTo.results.length; usr++) {
                        StringAssigntoQuery.push(obj.TaskAssignTo.results[usr].EMail.toLowerCase() == FilterAssignByEmail[i].toLowerCase());
                    }
                }
                else {
                    for (var usr = 0; usr < obj.TaskAssignTo.results.length; usr++) {
                        StringAssigntoQuery.push(obj.TaskAssignTo.results[usr].EMail.toLowerCase() == FilterAssignByEmail[i].toLowerCase());
                    }
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
        obj.Module.ID = obj.Module.ID ? obj.Module.ID : "";
        return (ProjectFilter) &&
                (ClientValue == "All" ? obj.ClientID.ID != "null" : obj.ClientID.ID == ClientValue) &&
                (ModuleValue == "All" ? obj.Module.ID != "null" : obj.Module.ID == ModuleValue) &&
                (WorkTypeValue == "All" ? obj.Worktype != "" : obj.Worktype == WorkTypeValue) &&
                (CurrentPhaseValue == "All" ? obj.CurrentPhase != "" : obj.CurrentPhase == CurrentPhaseValue) &&
                (PriorityValue == "All" ? obj.TaskPriority != "" : obj.TaskPriority == PriorityValue) &&
                (DueDateFilter) &&
                (assigntoQuery)
    });

    $("#myGanttChip").empty();
    $("#myGanttChip").append(TaskGanttChip);
    arrCurrentGantt = arrFilterDataBind.filter(function(f){return f;})
    CreateTaskGanttChart(arrFilterDataBind);
}

//to colled the data for gantt chart
function CreateTaskGanttChart(array) {
    $(".TaskGantt").empty();
    var arrGanttBind = [];
    var TempModule = [];
    TaskdemoSource = [];
    var IsAssignBy = false;
    var TaskTitle = '';
    var IsAssinTo = [];
    if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].Module != 0) {
                if (jQuery.inArray(array[i].Module.Title, TempModule) != '-1') {
                    //Do Nothing. Elements contains this already
                }
                else {
                    arrGanttBind = [];
                    var currentModule = array[i].Module.Title;
                    currentModule = currentModule ? currentModule : "";
                    arrGanttBind = array.filter(function (obj) { //Filter array on the basis of CurrentPhase
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

                        if (arrGanttBind[module].AssignedBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                            IsAssignBy = true;
                        }
                        if (IsAssinTo == [] && IsAssignBy == false) {
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

                        if (arrGanttBind[module].Title.length > 20) {
                            TaskTitle = arrGanttBind[module].Title.substring(0, 20) + "...";
                        }
                        else {
                            TaskTitle = arrGanttBind[module].Title;
                        }
						if(new Date(arrGanttBind[module].DueDate) < new Date(new Date().setHours(0, 0, 0, 0)) && arrGanttBind[module].CurrentPhase == "Open") {
							customClass = 'ganttBlueBorder';
							fullTitle = arrGanttBind[module].Title+ " (Overdue)";
                        }
						else {
	                        if (arrGanttBind[module].CurrentPhase == "Open") {
	                            customClass = 'ganttBlueBorder';
	                            fullTitle = arrGanttBind[module].Title + " (Open)";
	                        }
	                        else if (arrGanttBind[module].CurrentPhase == "Completed") {
	                            customClass = 'ganttOliveBorder';
	                            fullTitle = arrGanttBind[module].Title + " (Completed)";
	                        }
	                        else if (arrGanttBind[module].CurrentPhase == "Hold") {
	                            customClass = 'ganttOrangeBorder';//ganttOrange
	                            TaskTitle = TaskTitle + " (Hold)";
	                            fullTitle = arrGanttBind[module].Title + " (Hold)";
	                        }
	                        else if (arrGanttBind[module].CurrentPhase == "Cancelled") {
	                            customClass = 'ganttRedBorder';
	                            TaskTitle = TaskTitle + " (Cancelled)";
	                            fullTitle = arrGanttBind[module].Title + " (Cancelled)";
	                        }
	                        else { //Close
	                            customClass = 'ganttGreenBorder';
	                            TaskTitle = TaskTitle + " (Close)";
	                            fullTitle = arrGanttBind[module].Title + " (Close)";

	                        }
	                    }
                        
                        var completeTaskHTML = fullTitle + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].StartDate)) + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].DueDate)) + ";" + arrGanttBind[module].CompletionPersent;
                        if (module == 0) {
                            TaskdemoSource.push({
                                name: currentModule,
                                desc: TaskTitle,
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
                                desc: TaskTitle,
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
                    TempModule.push(array[i].Module.Title);
                }
            }
        }
        //Array for General Task
        arrGanttBind = [];
        IsAssinTo = [];
        IsAssignBy = false
        var Filter = null;
        currentModule = null;
        arrGanttBind = array.filter(function (obj) { //Filter array on the basis of Module and Project Name
            return ((obj.ProjectFullName == Filter || obj.ProjectFullName == "") && (obj.Module.Title != currentModule || obj.Module.Title != ""));
        });
        for (var module = 0; module < arrGanttBind.length; module++) {
            var fromDate = new Date(arrGanttBind[module].StartDate).setHours(0, 0, 0, 0);
            fromDate = new Date(fromDate);
            var endDate = new Date(arrGanttBind[module].DueDate).setHours(0, 0, 0, 0);
            endDate = new Date(endDate);
            IsAssinTo = arrGanttBind[module].TaskAssignTo.results.filter(function (obj) {
                return obj.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase();
            });

            if (arrGanttBind[module].AssignedBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                IsAssignBy = true;
            }
            if (IsAssinTo == [] && IsAssignBy == false) {
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
            if (arrGanttBind[module].Title.length > 20) {
                TaskTitle = arrGanttBind[module].Title.substring(0, 20) + "...";
            }
            else {
                TaskTitle = arrGanttBind[module].Title;
            }
			if(new Date(arrGanttBind[module].DueDate) < new Date(new Date().setHours(0, 0, 0, 0)) && arrGanttBind[module].CurrentPhase == "Open") {
				customClass = 'ganttBlueBorder';
				fullTitle = arrGanttBind[module].Title+ " (Overdue)";
	        }
			else {
	            if (arrGanttBind[module].CurrentPhase == "Open") {
	                customClass = 'ganttBlueBorder';
	                TaskTitle = TaskTitle + " (Open)";
	                fullTitle = arrGanttBind[module].Title + " (Open)";
	            }
	            else if (arrGanttBind[module].CurrentPhase == "Completed") {
	                customClass = 'ganttOliveBorder';
	                TaskTitle = TaskTitle + " (Completed)";
	                fullTitle = arrGanttBind[module].Title + " (Completed)";
	            }
	            else if (arrGanttBind[module].CurrentPhase == "Hold") {
	                customClass = 'ganttOrangeBorder';//ganttOrange
	                TaskTitle = TaskTitle + " (Hold)";
	                fullTitle = arrGanttBind[module].Title + " (Hold)";
	            }
	            else if (arrGanttBind[module].CurrentPhase == "Cancelled") {
	                customClass = 'ganttRedBorder';
	                TaskTitle = TaskTitle + " (Cancelled)";
	                fullTitle = arrGanttBind[module].Title + " (Cancelled)";
	            }
	            else { //Close
	                customClass = 'ganttGreenBorder';
	                TaskTitle = TaskTitle + " (Close)";
	                fullTitle = arrGanttBind[module].Title + " (Close)";
	            }
            }
            var completeTaskHTML = fullTitle + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].StartDate)) + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].DueDate)) + ";" + arrGanttBind[module].CompletionPersent;
            if (module == 0) {
                TaskdemoSource.push({
                    name: "General Task",
                    desc: TaskTitle,
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
                    desc: TaskTitle,
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

        //If Module is Null
        arrGanttBind = [];
        IsAssinTo = [];
        IsAssignBy = false
        var currentModule = null;
        Filter = null;
        arrGanttBind = array.filter(function (obj) { //Filter array on the basis of Module
            return ((obj.Module.Title == currentModule || obj.Module.Title == "") && (obj.ProjectFullName != Filter && obj.ProjectFullName != ""));
        });
        for (var module = 0; module < arrGanttBind.length; module++) {
            var fromDate = new Date(arrGanttBind[module].StartDate).setHours(0, 0, 0, 0);
            fromDate = new Date(fromDate);
            var endDate = new Date(arrGanttBind[module].DueDate).setHours(0, 0, 0, 0);
            endDate = new Date(endDate);
            IsAssinTo = arrGanttBind[module].TaskAssignTo.results.filter(function (obj) {
                return obj.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase();
            });

            if (arrGanttBind[module].AssignedBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                IsAssignBy = true;
            }
            if (IsAssinTo == [] && IsAssignBy == false) {
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
            if (arrGanttBind[module].Title.length > 20) {
                TaskTitle = arrGanttBind[module].Title.substring(0, 20) + "...";
            }
            else {
                TaskTitle = arrGanttBind[module].Title;
            }
			if(new Date(arrGanttBind[module].DueDate) < new Date(new Date().setHours(0, 0, 0, 0)) && arrGanttBind[module].CurrentPhase == "Open") {
				customClass = 'ganttBlueBorder';
				fullTitle = arrGanttBind[module].Title+ " (Overdue)";
            }
			else {
	            if (arrGanttBind[module].CurrentPhase == "Open") {
	                customClass = 'ganttBlueBorder';
	                TaskTitle = TaskTitle + " (Open)";
	                fullTitle = arrGanttBind[module].Title + " (Open)";
	            }
	            else if (arrGanttBind[module].CurrentPhase == "Completed") {
	                customClass = 'ganttOliveBorder';
	                TaskTitle = TaskTitle + " (Completed)";
	                fullTitle = arrGanttBind[module].Title + " (Completed)";
	            }
	            else if (arrGanttBind[module].CurrentPhase == "Hold") {
	                customClass = 'ganttOrangeBorder';//ganttOrange
	                TaskTitle = TaskTitle + " (Hold)";
	                fullTitle = arrGanttBind[module].Title + " (Hold)";
	            }
	            else if (arrGanttBind[module].CurrentPhase == "Cancelled") {
	                customClass = 'ganttRedBorder';
	                TaskTitle = TaskTitle + " (Cancelled)";
	                fullTitle = arrGanttBind[module].Title + " (Cancelled)";
	            }
	            else { //Close
	                customClass = 'ganttGreenBorder';
	                TaskTitle = TaskTitle + " (Close)";
	                fullTitle = arrGanttBind[module].Title + " (Close)";
	            }
	        }
            var completeTaskHTML = fullTitle + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].StartDate)) + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrGanttBind[module].DueDate)) + ";" + arrGanttBind[module].CompletionPersent;
            if (module == 0) {
                TaskdemoSource.push({
                    name: "Undefined",
                    desc: TaskTitle,
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
                    desc: TaskTitle,
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
    BindGanttTaskChart();
}

//bind gantt chart
function BindGanttTaskChart() {
    if (TaskdemoSource.length > 0) {
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

//clear filter of Gantt
function ClearGantt() {
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
    var Current = "Open";
    var AssignTodata = _spPageContextInfo.userEmail;

    //Bind the page load data
    var TaskinboxChip = '';
    TaskinboxChip += "<div class='upload-chip'>Open</div>";
    $("#myGanttChip").empty();
    $("#myGanttChip").append(TaskinboxChip);
    CreateTaskGanttChart(arrLimitTaskInbox);
}

//Sort the Kanban tasks
function SortGanttTasks() {
    $("#NameSortGantt").click(function () {
        arrCurrentGantt.sort((a, b) => {
            let fa = a.Title.toLowerCase(),
            fb = b.Title.toLowerCase();
		
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });        
    CreateTaskGanttChart(arrCurrentGantt);
});
$("#RecentSortGantt").click(function () {
    arrCurrentGantt.sort(function (a, b) {
        var dateA = new Date(a.Created), dateB = new Date(b.Created)
        return dateB - dateA;
    });
    CreateTaskGanttChart(arrCurrentGantt);
});
$("#DateSortGantt").click(function () {
    arrCurrentGantt.sort(function (a, b) {
        var dateA = new Date(a.DueDate), dateB = new Date(b.DueDate)
        return dateB - dateA;
    });
    CreateTaskGanttChart(arrCurrentGantt);
});
$("#PrioritySortGantt").click(function () {
    const order = ['Top', 'Medium', 'Low'];
    arrCurrentGantt.sort((x, y) => order.indexOf(x.TaskPriority) - order.indexOf(y.TaskPriority));
    CreateTaskGanttChart(arrCurrentGantt);
});
}
