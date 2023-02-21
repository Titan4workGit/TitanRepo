var FinalFiles4Upload = [];
var arrDependencyEmail = [];
var arrDependencyName = [];
var arrDependencyId = [];
var SelfCompanyId = '';
var DependencyFileUpload = [];
var AllAddedAssignee=[];
$(window).load(function () {
	$('.newtooltip').tooltip({ //Show Percentage ToolTip in Pie chart
		track:true,
		position: { my: "left+15 center", at: "right center" },
	});
});

$(document).ready(function () {
	if(window.location.href.search(/\bTEAM\b/) >= 0) {
		$(".HideTeamTask").hide();
	}
    initializePeoplePicker("SendNotiPicker");
    initializePeoplePicker("AssaginToDependency");
    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };
    $(".hideSelective").click(function () {
        if(this.value == "Selective") {
            $("#SendNotiPicker").show();
        }
        else {
            $("#SendNotiPicker").hide();
        }
    });
    $(".btnTaskImport").click(function () {
        location.href = "../Pages/TaskImport.aspx?source=" + $('ul#myTabs').find('li.active').attr('id') + "&WebAppId=" + Logged_CompanyId;
    });
    $(".btnRecursiveTask").click(function () {
        location.href = "../Pages/TaskDetails.aspx?source=" + $('ul#myTabs').find('li.active').attr('id') + "&WebAppId=" + Logged_CompanyId + "&Type=Recursive";
    });

    $(".btnQuickTask").click(function () {
        $("#quicktask").modal('show');
        $("#QTaskDueDate").datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: 0
        });
        $('#QTaskDueDate').datepicker("option", "dateFormat", "MM dd, yy");
        initializePeoplePicker('PplPickerQuickAssign');
    });
    $("#btnAddQTask").click(function () {
        if (QuickTaskValidate() == true) {
            getMetadataQuickTask();
        }
    });

    $("#closeQuickTask").click(function () {
        $("#quicktask").modal('hide');
        $("#txtQTaskName").val("");
        $("#QTaskDueDate").val("");
        $("#txtQWorkType").val("Devlopment");
        $("#ddlQPriority").val("Medium");
        clearPeoplePickerControl("PplPickerQuickAssign");
        $("#QTaskBindArea").hide();
        if ($("#tbdyQuickTasks").html() != "  \n\t\t  " && $("#tbdyQuickTasks").html() != "") {
            waitingDialog.show();
            setTimeout(function () {
                //GetTasksInboxTasks("Open", _spPageContextInfo.userEmail, "PageLoad");
                //GetTasksOutboxTasks("Open", "PageLoad");
                getLastestTasks();
                $("#tbdyQuickTasks").html("  \n\t\t  ");
            }, 100);
        }
        else {
            $("#tbdyQuickTasks").html("  \n\t\t  ");
        }
    });
    $("#btnCloseMeeting").click(function () {
        waitingDialog.show();
        $("#TeamTask-viewer").empty();
        setTimeout(function () {
            getLastestTasks();
        }, 100);
    });
    $('.CompletionDate').datepicker({
        changeMonth: true,
        maxDate: new Date(),
        changeYear: true,
        yearRange: "-50:+50"
    });
    $('.CompletionDate').datepicker("option", "dateFormat", "MM dd, yy");
    $('#ReminderOnDate').datepicker({
        minDate: 1
    });
    $('#ReminderOnDate').datepicker("option", "dateFormat", "MM dd, yy");

    $("#btnCompletion").click(function () {
        ChangeCompletionStatus();
    });
    $("#Taskprogression").change(function () {
        if (this.value == '100') {
            $("#CompletionDateArea").show();
        }
        else {
            $("#CompletionDateArea").hide();
        }
    });
    /*$("#btnAddMsg").click(function () {
        updateTaskMeatdata('Add Message');
    });*/
    $("#btnAddFlag").click(function () {
        updateTaskMeatdata('SetFlag');
    });
    $("#btnSetReminder").click(function () {
        updateTaskMeatdata('SetReminder');
    }); 
       
    // upload file in Add Message Popup
    $("#AttachAddMessage").on('change', function (e) {
        //FinalFiles4Upload = [];
        var finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        finalFiles = ReinitializeArray(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.concat(finalFiles);
        //$('#filename').empty();
        var ChangedfileName = '';
        var Tcounter = $("#filename").find('.MessageFile').length;
        for (initial; initial < finalFiles.length; initial++) {
            if (finalFiles[initial].name.length > 15) {
                Tcounter = Tcounter + 1;
                ChangedfileName = finalFiles[initial].name.substring(0, 15) + "...";
                $('#filename').append('<div class="MessageFile" title="' + finalFiles[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + finalFiles[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#filename').append('<div class="MessageFile" title="' + finalFiles[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + finalFiles[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + finalFiles[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
        }
        $("#AttachAddMessage").val('');
    });


    // upload file in Add Message Popup
    $("#DependencyFileUpload").on('change', function (e) {
        var finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        finalFiles = ReinitializeArray(finalFiles);
        DependencyFileUpload = DependencyFileUpload.concat(finalFiles);
        var ChangedfileName = '';
        var Tcounter = $("#DepFileName").find('.DepdncyFile').length;
        for (initial; initial < finalFiles.length; initial++) {
            if (finalFiles[initial].name.length > 15) {
                Tcounter = Tcounter + 1;
                ChangedfileName = finalFiles[initial].name.substring(0, 15) + "...";
                $('#DepFileName').append('<div class="DepdncyFile" title="' + finalFiles[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLineDep(this.id, \'' + finalFiles[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#DepFileName').append('<div class="DepdncyFile" title="' + finalFiles[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + finalFiles[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLineDep(this.id, \'' + finalFiles[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
        }
        $("#DependencyFileUpload").val('');
    });
	$(".liNotify").click(function () {
        if(arrTaskInIds.length == 0 && arrTaskIds.length == 0) {
	    	alert("Kindly select any task first.");
	    	return false;
        }
	    else {
	    	$("#Notificationlist").modal('show');
	    }
    });
    $(".liSetRemnindr").click(function () {
        if(arrTaskInIds.length == 0 && arrTaskIds.length == 0) {
	    	alert("Kindly select any task first.");
	    	return false;
        }
	    else {
	    	$("#setreminder").modal('show');
	    }
    });
    $("#btnSendNotify").click(function () {
        if($.trim($("#txtTaskNotify").val()) != "") {
            updateTaskMeatdata('NotifyByMail');
        }
        else {
            alert("Kindly enter message first");
            return false;
        }
    });
    $("#TaskInbox").click(function () {
        arrTaskIds = [];
        $(".taskchk").prop("checked", '');//OutBox
    });
    $("#TaskOutbox").click(function () {
        arrTaskInIds = [];
        $(".taskchkIn").prop("checked", '');//Inbox
    });
    $("#board").click(function () {
        arrTaskInIds = [];
        $(".taskchkIn").prop("checked", '');//Inbox
        arrTaskIds = [];
        $(".taskchk").prop("checked", '');//OutBox
    });
    $("#ganttchat").click(function () {
        arrTaskInIds = [];
        $(".taskchkIn").prop("checked", '');//Inbox
        arrTaskIds = [];
        $(".taskchk").prop("checked", '');//OutBox
    });
    $("#btnAddDependency").click(function () {
        if($.trim($("#txtTitle").val()) != '' && $.trim($("#txtDetails").val()) != '' && $("#AssaginToDependency_TopSpan_ResolvedList").text() != '') {
            updateTaskMeatdata('AddDependency');
        }
        else {
            alert("Kindly fill all the mandatory fields.");
            return false;
        }
    });
    $('.StartDependecyDate').datepicker();
    $('.StartDependecyDate').datepicker("option", "dateFormat", "MM dd, yy");
    $('.DueDependecyDate').datepicker();
    $('.DueDependecyDate').datepicker("option", "dateFormat", "MM dd, yy");
    $("#StartDateAsTask").click(function () {
        if(this.checked == true) {
            $(".StartDependecyDate").val('');
            $(".StartDependecyDate").prop('disabled', 'disabled');
        }
        else {
            $(".StartDependecyDate").prop('disabled', '');
        }
    });
    $(".ModalAddMessageParent").click(function () {
    	//to check if logged_In user is external or not; -9 == External User
		if(EmployeeDetails[0].ParentId != -9) {
			if(arrTaskInIds.length == 0 && arrTaskIds.length == 0) {
	    	    alert("Kindly select any task first.");
	            return false;
    		}	
    	}
	    else {
	    	alert("You are not authorized to perform this operation.");
	            return false;
    	}
    });
    
    $(".AddDepedncy").click(function () {
        if(arrTaskInIds.length == 0 && arrTaskIds.length == 0){
            alert("Kindly select any task first.");
            return false;
        }
        else {
            if(arrTaskInIds.length == 1){
                $("#DueDateHTML").show();  
                $("#StartDateHTML").show();
            }
            else {
                if(arrTaskIds.length == 1){
                    $("#DueDateHTML").show();  
                    $("#StartDateHTML").show();
                }
                else {
                    $("#DueDateHTML").hide();  
                    $("#StartDateHTML").hide();
                }
            }
            $("#dependenciesmodl").modal('show');
        }
    });
    $("#DueDateAsTask").click(function () {
        if(this.checked == true) {
            $(".DueDependecyDate").val('');
            $(".DueDependecyDate").prop('disabled', 'disabled');
        }
        else {
            $(".DueDependecyDate").prop('disabled', '');
        }
    });
    $(".btnCloseDependency").click(function () {
        DependencyFileUpload = [];
        AllAddedAssignee = [];
        $('#DepFileName').empty();
        $('#txtTitle').val('');
        $('#txtDetails').val('');
        $('.StartDependecyDate').val('');
        $('.DueDependecyDate').val('');
        $('#StartDateAsTask').prop('checked', '');
        $('#DueDateAsTask').prop('checked', '');
        $('#chkIsMandatory').prop('checked', '');
        $('#DependencyFileUpload').val('');
        $(".DueDependecyDate").prop('disabled', '');
        $(".StartDependecyDate").prop('disabled', '');
        clearPeoplePickerControl('AssaginToDependency');
    });
    $(".btnMeetingTask").click(function () {
        if(SelfCompanyId == "") {
            GetSelfCompanyID();
        }
        if(SelfCompanyId != '' && SelfCompanyId != 'null' && SelfCompanyId != null && SelfCompanyId != 'undefined') {
            src = _spPageContextInfo.webAbsoluteUrl + "/SitePages/TeamsMeeting.aspx?companyid="+Logged_CompanyId+"&clientid="+SelfCompanyId;
            var container = $("#TeamTask-viewer").empty();
            $('<iframe>', {
                src: src,
                id: 'TeamTaskIframe-viewer',
                frameborder: 0,
                scrolling: 'yes',
                width: '100%',
                height: '98%'
            }).appendTo(container);
            $("#MeetingTaskPopup").modal("show");
        }
        else {
            alert("Self Company is not definned.");
            return false;
        }
    });
    $(".btnTeamChannelTask").click(function () {
        if(SelfCompanyId == "") {
            GetSelfCompanyID();
        }
        if(SelfCompanyId != '' && SelfCompanyId != 'null' && SelfCompanyId != null && SelfCompanyId != 'undefined') {
            src = _spPageContextInfo.webAbsoluteUrl + "/SitePages/My-Team.aspx?companyid="+Logged_CompanyId+"&clientid="+SelfCompanyId;
            var container = $("#TeamTask-viewer").empty();
            $('<iframe>', {
                src: src,
                id: 'TeamTaskIframe-viewer',
                frameborder: 0,
                scrolling: 'yes',
                width: '100%',
                height: '98%'
            }).appendTo(container);
            $("#MeetingTaskPopup").modal("show");
        }
        else {
            alert("Self Company is not definned.");
            return false;
        }
    });
    
         $("#fromDatetaskIn").datepicker();
          $("#toDatetaskIn").datepicker();
        $('#fromDatetaskIn').datepicker("option", "dateFormat", "MM dd, yy");
        $('#toDatetaskIn').datepicker("option", "dateFormat", "MM dd, yy");
         $("#fromDatetaskout").datepicker();
         $("#toDatetaskout").datepicker();
        $('#fromDatetaskout').datepicker("option", "dateFormat", "MM dd, yy");
        $('#toDatetaskout').datepicker("option", "dateFormat", "MM dd, yy");

    
});

//Get Self CompanyID for Team-Meeting Task
function GetSelfCompanyID() {
    var RestQuery = "?$select=SelfCompany,Title,ID,Client_Code&$filter=SelfCompany eq 1&$top=5000",
    	dfds = $.Deferred(),
    	url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items/" + RestQuery;
    $.when(getAllItems(url, dfds)).done(function (ClientDetails) {
        response = [];
        if (ClientDetails.length > 0) {
            SelfCompanyId = ClientDetails[0].ID;
        }
        else {
            SelfCompanyId = 'null';
        }
    });
}


//remove the attachment for Add Message
function removeLine(id, FileName) {
    var index = id.split('_')[1];
    $("#" + id).remove();
    FinalFiles4Upload = FinalFiles4Upload.filter(function( obj ) {
        return obj.name !== FileName;
    });
    $("#AttachAddMessage").val('');
}

//remove the attachment for Dependency
function removeLineDep(id, FileName) {
    var index = id.split('_')[1];
    $("#" + id).remove();
    DependencyFileUpload = DependencyFileUpload.filter(function( obj ) {
        return obj.name !== FileName;
    });
    $("#DependencyFileUpload").val('');
}

function ReinitializeArray(arr) {
    var newArr = [];
    var count = 0;
    for(var i=0; i < arr.length; i++) {
        newArr[count++] = arr[i];
    }
    return newArr;
}
//to change the completion percentage and Completion date and Status
function ChangeCompletionStatus() {
    if ($("#txtCompletionHeader").text() == "Completion") { // for completion Popup
        if ($(".CompletionDate").val() != "") {
            updateTaskMeatdata("Completion");
        }
        else {
            alert("Kindly fill completion date.");
            return false;
        }
    }
    else {
        updateTaskMeatdata('Progression');
    }
}

//update the selected Tasks metadata
function updateTaskMeatdata(Action) {
    var Metdata;
    var arrTempTaskId = [];
    var arrDataBind = [];
    var arrTaskTemp = [];
    var updateTab = '';
    if (arrTaskInIds.length > 0) { //first check Inbox array
        updateTab = 'Inbox';
        arrTempTaskId = arrTaskInIds.filter(function (f) { return f; });
    }
    else if (arrTaskIds.length > 0) { //then check Outbox array
        updateTab = 'Outbox';
        arrTempTaskId = arrTaskIds.filter(function (f) { return f; });
    }
    if (arrTaskInIds.length != 0 || arrTaskIds.length != 0) {
        var ItemType = GetItemTypeForListName('EmployeeTaskDetails');
        if (Action == "Completion") { //for Completion popup
            var SucceedCount = 0;
            var FailedCount = 0;
            var arrFailedIds = [];
            var FinalCompletionDate = GetDateStandardFormat(moment($('.CompletionDate').val()).format('DD/MM/YYYY'));
            arrTempTaskId.forEach(function (value, i) {
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    CompletionDate: FinalCompletionDate,
                    CurrentPhase: "Completed",
                    CompletionPersent: "100"
                };
                //before completing check - All the Mandatory Dependencies should be completed
                if(checkDependency(value) == true){
                    SucceedCount++;
                    UpdateTaskList('EmployeeTaskDetails', Metadata, value);
                    arrFailedIds.push(value);
                }
                else {
                    FailedCount++;
                }

                if (arrTempTaskId.length == (i + 1)) {
                    //arrFailedIds = arrTempTaskId.diff( arrFailedIds ); //removed the failed Ids
                    if(arrFailedIds.length > 0){
                        arrAllTaskInbox.forEach(function (value, i) {   
                            for (id = 0; id < arrFailedIds.length; id++) {
                                if (value.Id == arrFailedIds[id]) {
                                    value.CurrentPhase = "Completed";
                                    value.CompletionPersent = "100";
                                    value.CompletionDate = titanForWork.ShowCommonStandardDateFormat(new Date(FinalCompletionDate));
                                }
                            }
                        });
                        arrLimitTaskInbox = arrDataBind = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                            return obj.CurrentPhase == "Open";
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
                        $(".mainDivAllAnnouncements").empty();
                        BindInboxTasks(arrDataBind);
                    }
                    else {
                        $(".taskchkIn").prop("checked", '');//Inbox
                        $(".taskchk").prop("checked", '');//OutBox
                    }
                    $(".CompletionDate").val('');
                    $("#progression").modal('hide');
                    if(SucceedCount == 0){
                        alert("No task(s) have been updated.");
                    }
                    else if(SucceedCount == arrTempTaskId.length){
                        alert("All task(s) have been updated.");
                    }
                    else {
                        alert("Task(s) have been updated for " + SucceedCount + " and not set for " + FailedCount + " tasks.");
                    }
                    arrTaskInIds = [];
                    arrTaskIds = [];
                }
            });
        }
        else if (Action == "Progression") {
            if ($("#Taskprogression").val() == "100" && $(".CompletionDate").val() == "") {
                alert("Kindly enter Completion date.");
                return false;
            }
            else {
                if ($(".CompletionDate").val() != "") {
                    var FinalCompletionDate = GetDateStandardFormat(moment($('.CompletionDate').val()).format('DD/MM/YYYY'));
                }
                var SucceedCount = 0;
                var FailedCount = 0;
                var arrFailedIds = [];
                arrTempTaskId.forEach(function (value, i) {
                    Metadata = {
                        __metadata: {
                            'type': ItemType
                        },
                        CompletionPersent: $("#Taskprogression").val()
                    };
                    if ($(".CompletionDate").val() != "") {
                        Metadata["CompletionDate"] = FinalCompletionDate;
                        Metadata["CurrentPhase"] = "Completed";
                        //before completing check - All the Mandatory Dependencies should be completed
                        if(checkDependency(value) == true){
                            SucceedCount++;
                            arrFailedIds.push(value);
                            UpdateTaskList('EmployeeTaskDetails', Metadata, value);
                        }
                        else {
                            FailedCount++;
                            //arrFailedIds.push(value);
                        }
                    }
                    else {
                        SucceedCount++;
                        arrFailedIds.push(value);
                        UpdateTaskList('EmployeeTaskDetails', Metadata, value);
                    }

                    if (arrTempTaskId.length == (i + 1)) {
                        if ($(".CompletionDate").val() != "") {
                            //arrFailedIds = arrTempTaskId.diff( arrFailedIds ); //removed the failed Ids
                            if(arrFailedIds.length > 0){
                                arrAllTaskInbox.forEach(function (value, i) {
                                    for (id = 0; id < arrFailedIds.length; id++) {
                                        if (value.Id == arrFailedIds[id]) {
                                            value.CurrentPhase = "Completed";
                                            value.CompletionDate = titanForWork.ShowCommonStandardDateFormat(new Date(FinalCompletionDate));
                                            value.CompletionPersent = $("#Taskprogression").val();
                                        }
                                    }
                                });
                            }
                            else {
                                $(".taskchkIn").prop("checked", '');//Inbox
                                $(".taskchk").prop("checked", '');//OutBox
                            }
                        }
                        else {
                            arrAllTaskInbox.forEach(function (value, i) {
                                for (id = 0; id < arrTempTaskId.length; id++) {
                                    if (value.Id == arrTempTaskId[id]) {
                                        value.CompletionPersent = $("#Taskprogression").val();
                                    }
                                }
                            });
                        }
                        var IsDatatoUpdate = true;
                        if ($(".CompletionDate").val() != "") {
                            if(SucceedCount == 0){
                                alert("No task(s) have been updated.");
                                IsDatatoUpdate = false;
                            }
                            else if(SucceedCount == arrTempTaskId.length){
                                alert("All task(s) have been updated.");
                            }
                            else {
                                alert("Task(s) have been updated for " + SucceedCount + " and not set for " + FailedCount + " tasks.");
                            }
                        }
                        else {
                            alert("All task(s) have been updated.");
                        }
                        if(IsDatatoUpdate == true){
                            arrLimitTaskInbox = arrDataBind = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                                return obj.CurrentPhase == "Open";
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
                            $(".mainDivAllAnnouncements").empty();
                            BindInboxTasks(arrDataBind);
                        }
                        $(".CompletionDate").val('');
                        $("#progression").modal('hide');
                        
                        arrTaskInIds = [];
                        arrTaskIds = [];
                    }
                });
            }
        }
        else if (Action == "Add Message") {
            if(arrTempTaskId.length > 1) {
                alert("Kindly select any one task.");
                return false;
            }
            else {
                OpenTeamChat(arrTempTaskId[0]);
            }
            /*if ($("#_TextComment_").val().trim().length > 0) {
                arrTempTaskId.forEach(function (value, i) {
                    var listName = "TasksComments";
                    var comment = $("#_TextComment_").val().trim();
                    Metadata = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Comments': comment, 'TaskID': parseInt(value), 'ReplierID': _spPageContextInfo.userId.toString() };
                    AddMessagetoList(listName, Metadata);
                    if (arrTempTaskId.length == (i + 1)) {
                        //$(".emojionearea-editor").empty();
                        $("#addmessage").modal("hide");
                        $("#_TextComment_").val("");
                        alert("Message has been added to all the selected task(s).");
                        arrTaskInIds = [];
                        arrTaskIds = [];
                        $('#filename').empty();
                        FinalFiles4Upload = [];
                        $("#AttachAddMessage").val("");
                        $(".taskchkIn").prop("checked", '');//Inbox
                        $(".taskchk").prop("checked", '');//OutBox
                    }
                });
            }
            else {
                alert("Please fill comment.");
                return false;
		
            }*/
        }
        else if(Action == "NotifyByMail"){
            getAssignTo(arrTempTaskId);
        }
        else if(Action == "SetFlag"){
            arrTempTaskId.forEach(function (value, i) {
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    SetFlag: $('.taskFlag:checked').val()
                };
                UpdateTaskList('EmployeeTaskDetails', Metadata, value);
                if (arrTempTaskId.length == (i + 1)) {
                    updateArrayFlag(arrTempTaskId);
                    alert("Flag has been set to selected tasks.");
                    $("#flagmodal").modal("hide");
                    arrTaskInIds = [];
                    arrTaskIds = [];
                }
            });
        }
        else if(Action == "SetReminder") {
            var ReminderItemType = GetItemTypeForListName('Reminders');
            var arrDays = [];
            var SucceedCount = 0;
            var FailedCount = 0;
            var arrTemp = [];
            var IsReminderActive = true;
            if($("#ReminderStatus").text() == "OFF") {
                IsReminderActive = false;
            }
            
            Metadata = {
                __metadata: {
                    'type': ReminderItemType
                },
                AtTime: $('#AtTime').val(),
                Active: IsReminderActive,
                ReminderOn: 'Task',
                Message: $('#txtReminderMsg').val(),
                WeekDays:  {
                    'results': arrDays
                }
            };
            if($("#OnceTime").prop('checked') == true) {
                if($("#ReminderOnDate").val() != "") {
                    Metadata["OnDate"] = GetDateStandardFormat(moment($('#ReminderOnDate').val()).format('DD/MM/YYYY'));
                }
                else {
                    alert("Kindly select date.");
                    return false;
                }
            }
            else if($("#MonthlyTime").prop('checked') == true) {
                Metadata["DayOfEveryMonth"] = parseInt($("#multdy").val());
            }
            else if($("#WeeklyTime").prop('checked') == true) {
                $(".Days:checked").each(function(){
                    arrDays.push($(this).val());
                });
                if(arrDays.length == 0) {
                    alert("Kindly select any day.");
                    return false;
                }           
            }
            
            if($("#WeeklyTime").prop('checked') != true) {
                delete Metadata["WeekDays"];
            }
            arrTempTaskId.forEach(function (value, i) {
                arrTemp = [];
                if(updateTab == "Inbox") {
                    arrTemp = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                        return obj.Id == value;
                    });
                }
                else{
                    arrTemp = arrAllTaskOutbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                        return obj.Id == value;
                    });
                }
                if(arrTemp[0].CurrentPhase == "Open") {
                    Metadata["ItemId"] = parseInt(value);
                    Metadata["ReminderType"] = $('.ReminderType:checked').val();
                    Metadata["Title"] = arrTemp[0].Title;
                    Metadata["RemiderSetFor"] = $('.ReminderTo:checked').val();
                    //first check if Reminder is already set or not
                    SucceedCount++;
                    requestUri = "?$top=5000&$select=Id,Title,ReminderOn,ItemId,ReminderType,OnDate,WeekDays,DayOfEveryMonth,AtTime,Active&$Filter=ItemId eq '" + value + "' ";
                    $.when(getLimitedItems('Reminders', requestUri)).done(function (Reminders) {
                        var RemiderResult = Reminders.results;
                        if(RemiderResult.length > 0) {
                            DeleteReminder(RemiderResult[0].Id, Metadata)
                        }
                        else {
                            AddToSPList('Reminders', Metadata);
                        }
                    });
                }
                else {
                    FailedCount++;
                }
                if (arrTempTaskId.length == (i + 1)) {
                    if(SucceedCount == 0){
                        alert("No reminder has been set.");
                    }
                    else if(SucceedCount == arrTempTaskId.length){
                        alert("Reminder has been set to all selected tasks.");
                    }
                    else {
                        alert("Reminder has been set for " + SucceedCount + " tasks and not set for " + FailedCount + " tasks.");
                    }
                    $("#setreminder").modal("hide");
                    $("#OnceTime").prop("checked", "checked");
                    $("#OnceTime").trigger('click');
                    $("#ReminderOnDate").val('');
                    $("#AtTime").val('Early Morning');
                    $(".Days").prop("checked", '');
                    $("#multdy").val('1');
                    if($("#ReminderStatus").text() == "OFF") {
                        $("#ReminderStatus").trigger("click");
                        $("#ReminderStatus").text("ON");
                        $("#ReminderStatus").css("text-align", "left");
                    }
                    $(".taskchkIn").prop("checked", '');//Inbox
                    $(".taskchk").prop("checked", '');//OutBox
                    arrTaskInIds = [];
                    arrTaskIds = [];
                    $('#txtReminderMsg').val('');
                }
            });
        }
        else if(Action == "AddDependency") { 
            arrTaskTemp = [];
            var IsDepValidateOk = true;
            var ItemType = GetItemTypeForListName('TaskDependencies');
            var ItemTypeTaskist = GetItemTypeForListName('EmployeeTaskDetails');
            getDependencyUserInfo('AssaginToDependency');
            arrTempTaskId.forEach(function (value, i) {
                var arrFinalAssigneeIds = [];
                //AllAddedAssignee = [];
                IsDepValidateOk = true;
                if(updateTab == "Inbox") {
                    arrTaskTemp = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                        return obj.Id == value;
                    });
                }
                else{
                    arrTaskTemp = arrAllTaskOutbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                        return obj.Id == value;
                    });
                }
                var AlreadyDepenedency = [];
                
                if(arrTaskTemp[0].DependencyCount != 0 && arrTaskTemp[0].DependencyCount != null) {
                    for(var usr=0;usr<arrTaskTemp[0].DependencyTo.results.length;usr++) {
                        AlreadyDepenedency.push({
                            email: arrTaskTemp[0].DependencyTo.results[usr].EMail,
                            userId: arrTaskTemp[0].DependencyToId.results[usr]
                        });
                    }
                }
                AllAddedAssignee = AllAddedAssignee.concat(AlreadyDepenedency);
                
                arrFinalAssigneeIds = checkUserValid();
                //Remove duplicate elements Azure Array
                arrFinalAssigneeIds = arrFinalAssigneeIds.filter(function (item, pos) { 
                    return arrFinalAssigneeIds.indexOf(item) == pos 
                });
                //Add in EmployeeTaskDetails list
                
                /*MetadataforDependencyTask = {
                    __metadata: {
                        'type': ItemTypeTaskist
                    },
                    DependencyCount: arrFinalAssigneeIds.length + parseInt(arrTaskTemp[0].DependencyCount ? arrTaskTemp[0].DependencyCount: 0),
                    DependencyToId: { 'results': arrFinalAssigneeIds }
                };*/	
                
                
                //remove those dependency which are already added.
                arrDepIds = [];
                arrTemp = [];
                if($("#btnAddDependency").text() == "Add"){
                    if(AlreadyDepenedency.length > 0) {
                        /*for(var u=0;u<AlreadyDepenedency.length;u++){
                            arrTemp = arrFinalAssigneeIds.filter(function( obj ) {
                                return obj != AlreadyDepenedency[u].userId;
                            });
                            arrDepIds.push(arrTemp[0]);
                        }*/
                        arrDepIds = getUserInformation('AssaginToDependency');
                    }
                    else {
                        arrDepIds = arrFinalAssigneeIds.filter(function(f){return f;})
                    }
                }
                else {
                    AllAddedAssignee = [];
                    getDependencyUserInfo('AssaginToDependency');
                    arrDepIds = [];
                    for(var u=0;u<AllAddedAssignee.length;u++){
                        arrDepIds.push(AllAddedAssignee[u].userId);
                    }
                }
	            
                //return;
                if(arrDepIds.length > 0){
                    Metadata = {
                        __metadata: {
                            'type': ItemType
                        },
                        Title: $('#txtTitle').val(),
                        Details: $('#txtDetails').val(),
                        Status: 'Inactive',
                        CompanyIDId: Logged_CompanyId,
                        AssignedToId: {
                            'results': arrDepIds 
                        },
                        TaskIdId: value
                    };
                    if($('.StartDependecyDate').val() != ""){
                    	FormattedStartDate = new Date(arrTaskTemp[0].StartDate).setHours(0, 0, 0, 0);
                    	FormattedStartDate = new Date(FormattedStartDate);
                    	FormattedEndDate = new Date(arrTaskTemp[0].DueDate).setHours(0, 0, 0, 0);
                    	FormattedEndDate = new Date(FormattedEndDate);

                        if(arrTempTaskId.length == 1){
                            if (FormattedStartDate <= new Date(GetDateStandardFormat(moment($('.StartDependecyDate').val()).format('DD/MM/YYYY'))) && FormattedEndDate >= new Date(GetDateStandardFormat(moment($('.StartDependecyDate').val()).format('DD/MM/YYYY')))) {
                                Metadata["StartDate"] = GetDateStandardFormat(moment($('.StartDependecyDate').val()).format('DD/MM/YYYY'));
                            }
                            else {
                                AllAddedAssignee = [];
                                IsDepValidateOk == false;
                                alert('Start date should be in-between task"s start date and due Date.');
                                return false;
                            }
                        }
                        else {
                            Metadata["StartDate"] = GetDateStandardFormat(moment($('.StartDependecyDate').val()).format('DD/MM/YYYY'));
                        }
                    }
                    else {
                        if($("#StartDateAsTask").prop('checked') == true){
                            Metadata["StartDate"] = GetDateStandardFormat(moment(arrTaskTemp[0].StartDate.split('T')[0]).format("DD/MM/YYYY"));
                        }
                    }

                    if($('.DueDependecyDate').val() != ""){
                    	FormattedStartDate = new Date(arrTaskTemp[0].StartDate).setHours(0, 0, 0, 0);
                    	FormattedStartDate = new Date(FormattedStartDate);
                    	FormattedEndDate = new Date(arrTaskTemp[0].DueDate).setHours(0, 0, 0, 0);
                    	FormattedEndDate = new Date(FormattedEndDate);
                        if(arrTempTaskId.length == 1){
                            if (FormattedStartDate <= new Date(GetDateStandardFormat(moment($('.DueDependecyDate').val()).format('DD/MM/YYYY'))) && FormattedEndDate >= new Date(GetDateStandardFormat(moment($('.DueDependecyDate').val()).format('DD/MM/YYYY')))) {
                                Metadata["EndDate"] = GetDateStandardFormat(moment($('.DueDependecyDate').val()).format('DD/MM/YYYY'));
                            }
                            else {
                                IsDepValidateOk == false;
                                AllAddedAssignee = [];
                                alert('End date should be in-between task"s start date and due Date.');
                                return false;
                            }
                        }
                        else {
                            Metadata["EndDate"] = GetDateStandardFormat(moment($('.DueDependecyDate').val()).format('DD/MM/YYYY'));
                        }
                    }
                    else {
                        if($("#DueDateAsTask").prop('checked') == true){
                        	var TempDate = new Date(new Date(arrTaskTemp[0].DueDate.split('T')[0]).setDate(new Date(arrTaskTemp[0].DueDate.split('T')[0]).getDate() + 1));
                            Metadata["EndDate"] = GetDateStandardFormat(moment(TempDate).format("DD/MM/YYYY"));
                        }
                    }
                    Metadata["MandatoryCompletion"] = $('#chkIsMandatory').prop('checked');                    
                    if(IsDepValidateOk == true) {
                        if($("#btnAddDependency").text() == "Add"){
                            AddDependyList('TaskDependencies', Metadata, value, updateTab, arrFinalAssigneeIds.length);
                        }
                        else {
                            delete Metadata["Status"];
                            UpdateDependyList('TaskDependencies', Metadata, value, updateTab, arrFinalAssigneeIds.length);
                        }
                    }
                    var userCount=getDependencyCountByTaskId(arrTaskTemp[0].ID);
                    MetadataforDependencyTask = {
	                    __metadata: {
	                        'type': ItemTypeTaskist
	                    },
	                    DependencyCount:userCount,// arrFinalAssigneeIds.length + parseInt(arrTaskTemp[0].DependencyCount ? arrTaskTemp[0].DependencyCount: 0),
	                    DependencyToId: { 'results': arrFinalAssigneeIds }
	                };
                    UpdateTaskList('EmployeeTaskDetails', MetadataforDependencyTask, value);
                }
                //else {
                if (arrTempTaskId.length == (i + 1)) {
                    arrTaskIds = [];
                    arrTaskInIds = [];
                    $(".btnCloseDependency").trigger('click');
                    if($("#btnAddDependency").text() == "Update"){
                        taskDependency(arrTempTaskId[0], true);
                    }
                    else {
                        if(arrTempTaskId.length == 1){
                            taskDependency(arrTempTaskId[0], false);
                        }
                    }
                    if(updateTab == "Inbox") {
                        GetTasksInboxTasks("Open", _spPageContextInfo.userEmail, "PageLoad");
                    }
                    else {
                        GetTasksOutboxTasks("Open", "PageLoad");
                    }
                    alert("All the dependencies are submitted for selected task(s).");
                }
                //}
            });
        }
        else if(Action == "AddFavorite"){
            var arrTaskTemp = [];
            var linkForTask = '';
            var Metadata;
            arrTempTaskId.forEach(function (value, i) {
                if(updateTab == "Inbox") {
                    arrTaskTemp = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                        return obj.Id == value;
                    });
                }
                else{
                    arrTaskTemp = arrAllTaskOutbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                        return obj.Id == value;
                    });
                }
                if(IsAlreadyInFavorite(arrTaskTemp[0].Title) == false) {
                    if(updateTab == "Inbox") {
                        linkForTask = _spPageContextInfo.webAbsoluteUrl + '/Pages/TaskDetails.aspx?WebAppId='+Logged_CompanyId+'&TaskId='+window.btoa(arrTaskTemp[0].Id)+'&EditMode='+window.btoa('False')+'&source=TaskInbox';
                    }
                    else {
                        linkForTask = _spPageContextInfo.webAbsoluteUrl + '/Pages/TaskDetails.aspx?WebAppId='+Logged_CompanyId+'&TaskId='+window.btoa(arrTaskTemp[0].Id)+'&EditMode='+window.btoa('True')+'&source=TaskOutbox';
                    }
                    Metadata = {
                        __metadata: { 'type': 'SP.Data.MyFavoritesListItem' },
                        'Title': arrTaskTemp[0].Title,
                        'Name': arrTaskTemp[0].Title,
                        'Category': 'Task',
                        'Link': linkForTask,
                        'UserId': _spPageContextInfo.userId,
                        'Icon': {
                            '__metadata': { 'type': 'SP.FieldUrlValue' },
                            'Description': '',
                            'Url': _spPageContextInfo.webAbsoluteUrl + '/SiteAssets/MyFavorite/Images/fav-tasks.png'
                        },
                        'Active': true
                    };
                    AddToSPList('MyFavorites', Metadata);
                }
                if (arrTempTaskId.length == (i + 1)) {
                    arrTaskIds = [];
                    arrTaskInIds = [];
                    $(".taskchkIn").prop("checked", '');//Inbox
                    $(".taskchk").prop("checked", '');//OutBox
                    alert("Task(s) have been added to favorite.");
                }
            });
        }
    }
    else {
        alert("Kindly select any task first.");
        return false;
    }
}



//Check if it is already a favourite Task
function IsAlreadyInFavorite(TaskName){
    var IsFavorite = false;
    var Query = "?$select=Id,Title,Category,Name,Link,Icon,Active,User/Id,User/EMail&$expand=User&$filter=Category eq 'Task' and Name eq '" + TaskName + "' and User/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getLimitedItems('MyFavorites', Query)).done(function (FavResults) {
        FavResults = FavResults.results;
        if (FavResults.length > 0) {
            IsFavorite = true;
        }
    });
    return IsFavorite;
}
//Add data in SharePOint list
function AddDependyList(ListName, Metadata, txtTaskId, UpdatedTab, DependencyCount) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName+"')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            //Update the Dependency count
            if (DependencyFileUpload.length > 0) {
                uploadDependcyFiles(data.d.ID, ListName)
            }
            
            dfd.resolve(data);
        },
        eror: function (data) {
            dfd.reject(error);
            console.log("An error occurred while deleting task. " + JSON.stringify(data));
        }
    });
    return dfd.promise();
}


//Update data in SharePOint list
function UpdateDependyList(ListName, Metadata, txtTaskId, UpdatedTab, DependencyCount) {
    var dfd = $.Deferred();
    var DependecyID = $("#SelectedDepId").text();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName+"')/GetItemById('" + DependecyID + "')",
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
            if (DependencyFileUpload.length > 0) {
                uploadDependcyFiles(DependecyID, ListName)
            }
            dfd.resolve(data);
        },
        eror: function (data) {
            dfd.reject(error);
            console.log("An error occurred while updating Dependency. " + JSON.stringify(data));
        }
    });
    return dfd.promise();
}


function uploadDependcyFiles(id, ListName) {
    $.each(DependencyFileUpload, function (index, value) {
        getFileBuffer(value).then(function (buffer) {
            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName+"')/items(" + id + ")/AttachmentFiles/add( FileName='" + value.name + "')",
                method: 'POST',
                data: buffer,
                async: false,
                processData: false,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                        
                },
                error: function (data) {
                    console.log(data.responseText.error);
                }
            });
        });
    });
}

//get User-Emails of people picker for Dependency
function getDependencyUserInfo(PeoplepickerId) {
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
                AllAddedAssignee.push({
                    email: users[i].Key.split('|')[2],
                    userId: GetUserID(users[i].Key)
                });
            }
            //return userIds;
        }
    }
    else {
        //return userIds;
    }
}




//Delete the reminder if availble
function DeleteReminder(Id, Metadata) {
    var apiPath = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Reminders')/items/getbyid('"+Id+"')";
    $.ajax({  
        url: apiPath,  
        type: "DELETE", 
        headers: {
            "accept":"application/json",
            "X-RequestDigest":$("#__REQUESTDIGEST").val(),
            "IF-MATCH":"*"
        }, 
        async: false,  
        success: function(data) {  
            AddToSPList('Reminders', Metadata);
            //alert("Item Deleted successfully");  
        },  
        eror: function(data) {  
            console.log("An error occurred. Please try again." + data);  
        }  
    });
}


//Add Details to LIst
function AddToSPList(ListName, Metadata) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName+"')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            //alert("The tasks has been added into the board.");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}



//get Assigned to of all selected task to send mail
function getAssignTo(array) {
    var arrAllAssignTo = [];
    var arrAllAssignToName = [];
    var arrDependency = [];
    var arrDependencyName = [];
    var arrAssignedBy = [];
    var arrSendUser = [];
    var EmailDesign = '';
    var arrTemp = [];
    var TaskType = '';
    var DashboardURL = _spPageContextInfo.webAbsoluteUrl + "/Pages/mydashboard.aspx?WebAppId=" + Logged_CompanyId;
    array.forEach(function (value, count) {
        arrTemp = [];
        arrAllAssignTo = [];
        arrAllAssignToName = [];
        arrDependency = [];
        arrDependencyName = [];
        arrTemp = arrAllTaskInbox.filter(function (data) {
            return data.Id == value;
        });
        if (arrTemp.length == 0) {
            arrTemp = arrAllTaskOutbox.filter(function (data) {
                return data.Id == value;
            });
        }
        for (var i = 0; i < arrTemp[0].TaskAssignTo.results.length; i++) {
            arrAllAssignTo.push(arrTemp[0].TaskAssignTo.results[i].EMail);
            arrAllAssignToName.push(arrTemp[0].TaskAssignTo.results[i].Title);
        }
        if (arrTemp[0].DependencyTo.results != null) {
            for (var j = 0; j < arrTemp[0].DependencyTo.results.length; j++) {
                arrDependency.push(arrTemp[0].DependencyTo.results[j].EMail);
                arrDependencyName.push(arrTemp[0].DependencyTo.results[j].Title);
            }
        }
        if (arrTemp[0].AssignedBy != null && arrTemp[0].AssignedBy != null) {
            arrAssignedBy.push(arrTemp[0].AssignedBy.EMail);
        }

        if ($('.hideSelective:checked').val() == "All") {
            arrSendUser = arrAllAssignTo.concat(arrDependency);
            arrSendUser = arrSendUser.concat(arrAssignedBy);
        }
        else if ($('.hideSelective:checked').val() == "All Assignee") {
            arrSendUser = arrAllAssignTo.filter(function (f) { return f; });
        }
        else if ($('.hideSelective:checked').val() == "All Dependency") {
            arrSendUser = arrDependency.filter(function (f) { return f; });
        }
        else {
            arrSendUser = getUserInformationEmail("SendNotiPicker");
        }
        if (arrTemp[0].TaskType == "1") {
            TaskType = "Project Task";
        }
        else {
            TaskType = "General Task";
        }
        if (arrSendUser.length > 0) {
            var EmailDesign = '';
            var mailDesc = arrTemp[0].Description ? arrTemp[0].Description : "";
            EmailDesign = "Dear User,<br/><br/>" + _spPageContextInfo.userDisplayName + ", has shared the following message regarding a task with you.<br/><br/>";
            EmailDesign = EmailDesign + "<div><strong>Message :</strong> " + $("#txtTaskNotify").val().replaceAll('\n', '</br>') + "</div></br></br>" +
							            "<div><strong>Task Detail</strong></div><div><strong>---------------</strong></div>" +
            							"<div><strong>Assigned To :</strong>" + arrAllAssignToName.toString() + "</div>" +
                					    "<div><strong>Assigned By :</strong> " + arrTemp[0].Author.Title + "</div>" +
                					    "<div><strong>Modify On :</strong> " + titanForWork.ShowCommonStandardDateFormat(new Date(arrTemp[0].Modified)) + "</div>" +
                    				    "<div><strong>Status :</strong> " + arrTemp[0].CurrentPhase + "</div>" +
                    				    "<div><strong>Task Name:</strong> " + arrTemp[0].Title + "</div>" +
                    				    "<div><strong>Type:</strong> " + TaskType + "</div>" +
                    				    "<div><strong>Priority :</strong> " + arrTemp[0].TaskPriority + "</div>" +
                    				    "<div><strong>Starting Date :</strong> " + titanForWork.ShowCommonStandardDateFormat(new Date(arrTemp[0].StartDate)) + "</div>" +
                    				    "<div><strong>Due Date :</strong> " + titanForWork.ShowCommonStandardDateFormat(new Date(arrTemp[0].DueDate)) + "</div>" +
                    				    "<div><strong>Description :</strong> " + mailDesc + "</div><br/>" +
		        					    "<div><a href=" + DashboardURL + ">Click here</a> to open the Task.</div>" + "<br/><br/>";

            EmailDesign += "This is an auto generated email. Please don't reply.";
            var Metadata;
            Metadata = {
                'properties': {
                    '__metadata': {
                        'type': 'SP.Utilities.EmailProperties'
                    },
                    'From': _spPageContextInfo.userEmail,
                    'To': {
                        'results': arrSendUser
                    },
                    'Body': EmailDesign,
                    'Subject': "Task notification"
                }
            };
            var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
            $.ajax({
                contentType: 'application/json',
                url: sitetemplateurl,
                type: "POST",
                data: JSON.stringify(Metadata),
                async: false,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    if (array.length == (count + 1)) {
                        alert("Notification has been sent.");
                        $("#Notificationlist").modal("hide");
                        $("#txtTaskNotify").val('');
                        $("#chkAllUser").prop("checked", "checked");
                        $("#SendNotiPicker").hide();
                        $(".taskchkIn").prop("checked", '');//Inbox
                        $(".taskchk").prop("checked", '');//OutBox
                        clearPeoplePickerControl("SendNotiPicker");
                        arrTaskInIds = [];
                        arrTaskIds = [];
                    }
                },
                error: function (err) {
                    console.log("SendEmailSharedNotification  " + JSON.stringify(err));
                }
            });
        }
        else {
            alert("Kindly select any user to send mail.");
            if (array.length == (count + 1)) {
                alert("Notification has been sent.");
                $("#Notificationlist").modal("hide");
                $("#txtTaskNotify").val('');
                $("#chkAllUser").prop("checked", "checked");
                $("#SendNotiPicker").hide();
                $(".taskchkIn").prop("checked", '');//Inbox
                $(".taskchk").prop("checked", '');//OutBox
                clearPeoplePickerControl("SendNotiPicker");
                arrTaskInIds = [];
                arrTaskIds = [];
            }
        }
    });
}


//Add message to selected tasks
function AddMessagetoList(listName,item) 
{
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        async: false,
        headers: 
		{
		    "Accept": "application/json;odata=verbose",
		    "X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
        success: function (data) {
            console.log("add success"); 
            var item = data.d;
            var ItemId = item.ID;
            if (FinalFiles4Upload.length > 0) {
                uploadCommentattachment(ItemId, listName)
            }		 
        },
        error: function (data) { 
            console.log(data); 
        }
    });
}


// comment attachments
function uploadCommentattachment(id, ListName) {
    if (FinalFiles4Upload.length > 0) {
        $.each(FinalFiles4Upload, function (index, value) {
            getFileBuffer(value).then(function (buffer) {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName+"')/items(" + id + ")/AttachmentFiles/add( FileName='" + value.name + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                    },
                    success: function (data) {
                        
                    },
                    error: function (data) {
                        console.log(data.responseText.error);
                    }
                });
            });
        });
    }
}


var getFileBuffer = function (FinalFiles4Upload) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }

    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(FinalFiles4Upload);
    return deferred.promise();
};


//update array of TaskInbox or Outbox
function updateArrayFlag(arrTempTaskId) {
    arrAllTaskInbox.forEach(function (value, i) {
        for (id = 0; id < arrTempTaskId.length; id++) {
            if (value.Id == arrTempTaskId[id]) {
                value.SetFlag = $('.taskFlag:checked').val();
            }
        }
    });
    arrLimitTaskInbox = arrDataBind = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
        return obj.CurrentPhase == "Open";
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
    $(".mainDivAllAnnouncements").empty();
    BindInboxTasks(arrDataBind);
    arrAllTaskOutbox.forEach(function (value, i) {
        for (id = 0; id < arrTempTaskId.length; id++) {
            if (value.Id == arrTempTaskId[id]) {
                value.SetFlag = $('.taskFlag:checked').val();
            }
        }
    });
    arrDataBind = arrLimitTaskOutbox = arrAllTaskOutbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
        return obj.CurrentPhase == "Open";
    });
    //Showing data out of total
    if (arrDataBind.length >= 500) {
        $("#TotaloutBoxCount").text(arrDataBind.length);
        arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
        $("#ShowTotalItemsOutbox").hide();
        $("#ShowItemsOutbox").show();
        $("#DiplayOutboxCount").text("500");
        $("#SeeMoreOutbox").show();
    }
    else {
        $("#ShowTotalItemsOutbox").show();
        $("#ShowItemsOutbox").hide();
        $("#TotalItemscountfortaskOutBox").text(arrDataBind.length);
        $("#SeeMoreOutbox").hide();
    }
    $("#mainDivAreaTaskOutBox").empty();
    BindOutboxTasks(arrDataBind);
}

//update data in SharePOint list
function UpdateTaskList(ListName, Metadata, txtTaskId) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName+"')/GetItemById('" + txtTaskId + "')",
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
        eror: function (data) {
            dfd.reject(error);
            console.log("An error occurred while deleting task. " + JSON.stringify(data));
        }
    });
    return dfd.promise();
}

//to add quick task
function getMetadataQuickTask() {
    //get the self company for quick(general) task
    var RestQuery = "?$select=SelfCompany,Title,ID,Client_Code&$filter=SelfCompany eq 1&$top=5000",
    	dfds = $.Deferred(),
    	arrAssignTo = [],
    	arrMembersId = [],
    	url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items/" + RestQuery;
    $.when(getAllItems(url, dfds)).done(function (ClientDetails) {
        response = [];
        if (ClientDetails.length > 0) {
            ClientID = ClientDetails[0].ID;
            arrAssignTo = getPplPickerEmails('PplPickerQuickAssign');
            for (var assignTo = 0; assignTo < arrAssignTo.length; assignTo++) {
                var IsValid = checkUserValidQTask(arrAssignTo[assignTo]);
                if (IsValid == "" || IsValid == null) {
                    arrMembersId = [];
                    break;
                }
                else {
                    arrMembersId.push(IsValid);
                }
            }
            AddQuickTask(ClientID, arrMembersId, arrAssignTo);
        }
        else {
            alert("There is not self company assigned.");
            return false;
        }
    });
}

//To get List's Item Type
function GetItemTypeForQTask(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

//to validate manadatory fields
function QuickTaskValidate() {
    if ($.trim($("#txtQTaskName").val()) == "" || $("#ddlQPriority").val() == "" || $("#QTaskDueDate").val() == "" || $("#txtQWorkType").val() == "" || $("#PplPickerQuickAssign_TopSpan_ResolvedList").text() == "") {
        alert("Kindly fill all the fields.");
        return false;
    }
    else {
        return true;
    }
}

function AddQuickTask(cutsomer, arrMembersId, arrAssignToEmail) {
    var Metadata;
    var taskType = "2";
    var FinalDueDate = GetDateStandardFormat(moment($('#QTaskDueDate').val()).format('DD/MM/YYYY'));

    var ItemType = GetItemTypeForQTask('EmployeeTaskDetails');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $.trim($("#txtQTaskName").val()),
        TaskType: "2",
        ProjectName: "",
        ProjectFullName: "",
        ProjectIDId: 0,
        TaskAssignToId: {
            'results': arrMembersId
        },
        AssignedById: _spPageContextInfo.userId,
        Description: $.trim($("#txtQTaskName").val()),
        StartDate: new Date().toISOString(),
        DueDate: FinalDueDate,
        TaskPriority: $("#ddlQPriority").val(),
        CurrentPhase: "Open",
        CompletionPersent: '0',
        CompanyId: Logged_CompanyId,
        Distribution: "Consolidated",
        ClientIDId: cutsomer,
        ModuleId: 0,
        Worktype: $("#txtQWorkType").val(),
        ReferenceLink: {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': "",
            'Url': ""
        }
    };
    AddQuickTaskToList(Metadata, arrAssignToEmail);
}

//add task in SharePoint list
function AddQuickTaskToList(Metadata, arrAssignToEmail) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items",
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
            bindQTaskDetails(arrAssignToEmail);
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Add Task at Quick task modal
function bindQTaskDetails(arrAssignToEmail) {
    var QuickTask = '';
    QuickTask += "<tr><td>" + $.trim($("#txtQTaskName").val()) + "</td>";
    QuickTask += "<td>Due: " + $("#QTaskDueDate").val() + ",<span class='workshow'>" + $("#txtQWorkType").val() + "</span>";
    if ($("#ddlQPriority").val() == "Top") {
        QuickTask += "<img src='https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/i_icon.png' alt='' class='prioritysec' data-themekey='#'>"
    }
    QuickTask += "</td><td>";
    for (var assignTo = 0; assignTo < arrAssignToEmail.length; assignTo++) {
        var attachmentURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrAssignToEmail[assignTo])
        QuickTask += "<img src='" + attachmentURL + "' alt='' class='smll_img' data-themekey='#'>";
    }
    QuickTask += "</td></tr>";
    $("#tbdyQuickTasks").append(QuickTask);
    $("#QTaskBindArea").show();
    $("#txtQTaskName").val("");
    $("#QTaskDueDate").val("");
    //$("#txtQWorkType").val("Devlopment");
    //$("#ddlQPriority").val("Medium");
    //clearPeoplePickerControl("PplPickerQuickAssign");
}

//check if user id valid or not
function checkUserValidQTask(Email) {
    var userId = "";
    RestQuery = "?$select=Status,LogonName/Id,LogonName/EMail&$expand=LogonName&$filter= Status eq 'Active' and LogonName/EMail eq '" + Email + "'&$top=5000";
    dfds = $.Deferred(),
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + RestQuery;
    $.when(getAllItems(url, dfds)).done(function (Employees) {
        response = [];
        if (Employees.length > 0) {
            userId = Employees[0].LogonName.Id;
        }
        else {
            //Check in External Users list
            var Query = "?$select=LoginName/EMail,LoginName/Id&$expand=LoginName&$filter=LoginName/EMail eq '" + Email + "'&$top=5000";
            dfds = $.Deferred();
            url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
            $.when(getAllItems(url, dfds)).done(function (ExtResults) {
                response = [];
                if (ExtResults.length > 0) {
                    userId = ExtResults[0].LoginName.Id;
                }
            });
        }
    });
    return userId;
}
//get user Ids from People picker
function getPplPickerEmails(pickerPickerControlId) {
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
                var tempEmail = users[i].Key.split('|')[2];
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#')[0];
                    tempEmail = tempEmail.replace("_", "@");
                }
                UserArrayList.push(tempEmail);
            }
        }
    }
    return UserArrayList;
}

//to change in correct format
function GetDateStandardFormat(date) {
    var dateS = ConvertDateFormatToddMMyyyy(date);
    var startDate = new Date(dateS);
    // seconds * minutes * hours * milliseconds = 1 day
    var day = 60 * 60 * 24 * 1000;
    //var endDate = new Date(startDate.getTime() + day);
    var endDate = new Date(startDate.getTime());
    var newDate = endDate.toISOString();
    return newDate;
}

function ConvertDateFormatToddMMyyyy(date) {
    var formatedDate = stringToDate(date, 'dd/MM/yyyy', "/")
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
            else if (Action == "TaskOutbox") {
                NextURLOutbox = data.d.__next;
            }
            else if (Action == "ApprovalIn") {
                NextURLApprovalIn = data.d.__next;
            }
            else if (Action == "ApprovalOut") {
                NextURLApprovalOut = data.d.__next;
            }
            else {
                //Do nothing
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


//get list-items from list upto 5000 only
function getLimitedItems(ListName, Query) {
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
        },
        error: function (error) {
            HandleError(JSON.stringify(error));
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};

function HandleError(ErrorData) {
    if (currentDlg != "") {
        currentDlg.close();
    }
    console.log(ErrorData);
}

var response = response || [];
//Get details from SP list above 5000 without any filter
function getAllItems(url, dfds) {
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
                getAllItems(url, dfds);
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

function getClientMaster(TableHTMLId) {
    var listName = 'ClientMaster';
    var ClientHTML = '';
    RestQuery = "?$select=SelfCompany,Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,TemplateType,IsActive,Supervisor/Id,Supervisor/Title,SalesPerson/Id,InternalMembers/Title,InternalMembers/Id,InternalSupervisor/Title,InternalSupervisor/Id,SalesPerson/Title&$expand=SalesPerson,Supervisor,InternalSupervisor,InternalMembers&$orderby=Title asc";
    $('#' + TableHTMLId).html('');
    var dfds = $.Deferred();
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items" + RestQuery;
    $.when(getAllItems(url, dfds)).done(function (CalientDetails) {
        response = [];
        ActiveCustomers = CalientDetails;
        for (var i = 0; i < CalientDetails.length; i++) {
            var ClientID = CalientDetails[i].ID;
            var ClientTitle = CalientDetails[i].Title;
            var selfCompany = CalientDetails[i].SelfCompany;
            CalientDetails[i].Client_Code = CalientDetails[i].Client_Code ? CalientDetails[i].Client_Code : "";
            CalientDetails[i].Attn_Name = CalientDetails[i].Attn_Name ? CalientDetails[i].Attn_Name : "";
            CalientDetails[i].CustType = CalientDetails[i].CustType ? CalientDetails[i].CustType : "";

            ClientHTML += "<tr><td><label><input type='radio' name='Customer' title='" + ClientTitle + "' value='" + ClientID + "' class='CustomerchkList'></label></td>";
            ClientHTML += "<td><span>" + ClientTitle + "</span></td><td style='display:none;'><span>" + ClientID + "</span></td>";
            ClientHTML += "<td><span>" + CalientDetails[i].Client_Code + "</span></td><td><span>" + CalientDetails[i].Attn_Name + "</span></td><td><span>" + CalientDetails[i].CustType + "</span></td></tr>";

        }
        //ClientHTML +='</select>';
        $('#' + TableHTMLId).append(ClientHTML);
        GenerateTableMyCustomerList();
        IsInboxClientBind = true;
        IsOutboxClientBind = true;
    });
    if (currentDlg != "") {
        currentDlg.close();
    }
    $("#otherCustomerSearch").modal("show");
}

function GenerateTableMyCustomerList() {
    sorterTableCustomerList = new TINY.table.sorter('sorterTableCustomerList', 'TempTableClientMaster', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
        // colddid: 'columnsMyCustomer',
        currentid: 'currentpageMyCustomer',
        totalid: 'totalpagesMyCustomer',
        startingrecid: 'startrecordMyCustomer',
        endingrecid: 'endrecordMyCustomer',
        totalrecid: 'totalrecordsMyCustomer',
        hoverid: 'selectedrowMyCustomer',
        pageddid: 'pagedropdownMyCustomer',
        navid: 'tablenavMyCustomer',
        //sortcolumn: 1,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

//get user-Ids of people picker
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

//get User-Emails of people picker
function getUserInformationEmail(PeoplepickerId) {
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
                userIds.push(users[i].Key.split('|')[2]);
            }
            return userIds;
        }
    }
    else {
        return userIds;
    }
}


function initializePeoplePicker(peoplePickerElementId) {
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL';//,SecGroup,SPGroup
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '280px';
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
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
            failure(data)
        }
    })
    return userId;
}

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

//get all the mandatory Ids for selected task
function checkDependency(TaskId) {
    var IsMandatory = true;
    var Query = "?$top=5000&$select=*,ID,Status,TaskId/ID,TaskId/Title&$Expand=TaskId&$filter=TaskId eq'" + TaskId + "'  and MandatoryCompletion eq 1 and Status eq 'Inactive'";
    $.when(getLimitedItems('TaskDependencies', Query)).done(function (TaskDependency) {
        var items = TaskDependency.results;
        if (items.length > 0) {
            IsMandatory = false;
        }
    });
    return IsMandatory;
}

//show Successor and Predecessor Tasks
function ShowSucPredTasks(TaskId, Action) {
    var arrSelectedTask = [],
        arrSelectedTaskSucc = [],
        arrSelectedTaskPred = [],
        DisablePredTask = false,
        DisableSuccTask = false,
        LinkTaskHTML = '';
    if (Action == "Inbox") {
        arrSelectedTask = arrAllTaskInbox.filter(function (data) {
            return data.Id == TaskId;
        });
    }
    else {
        arrSelectedTask = arrAllTaskOutbox.filter(function (data) {
            return data.Id == TaskId;
        });
    }
    
    LinkTaskHTML += '<tr><td colspan="3"><h3 class="linkheading">Predecessor Task:</h3></td></tr>';
    if (arrSelectedTask[0].PredecessorTask.Id != null && arrSelectedTask[0].PredecessorTask.Id != 0) {
        arrSelectedTaskPred = arrAllTaskInbox.filter(function (data) {
            return data.Id == arrSelectedTask[0].PredecessorTask.Id;
        });
        if(arrSelectedTaskPred.length == 0){
            arrSelectedTaskPred = arrAllTaskOutbox.filter(function (data) {
                return data.Id == arrSelectedTask[0].PredecessorTask.Id;
            });
        }
        if(arrSelectedTaskPred.length == 0){
        	DisablePredTask = true;
        	restQuery = "&$filter=Id eq '" + arrSelectedTask[0].PredecessorTask.Id + "' ";
        	var Query = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,ClientID/ID,ClientID/Title,Module/Title,Module/ID,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,ClientID,Module,Author,AssignedBy,AttachmentFiles,TaskAssignTo,DependencyTo" + restQuery;
        	$.when(getLimitedItems('EmployeeTaskDetails', Query)).done(function (PredTask) {
        		arrSelectedTaskPred = PredTask.results;
        	});
		}
        var DateText = "Due";
        var attachment = '';
        if(arrSelectedTaskPred.length > 0) {
            var TaskUrl = _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(arrSelectedTask[0].PredecessorTask.Id) + "&EditMode=" + window.btoa('True') + "' ";
            var TaskAssignToUsers = '';
            var DueDate = arrSelectedTaskPred[0].DueDate;
            var CurrentPhase = arrSelectedTaskPred[0].CurrentPhase;
            if (DueDate != null && CurrentPhase != "Completed" && CurrentPhase != "Close") {
                DueDate = new Date(DueDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
            }
            var CompletionPersent = arrSelectedTaskPred[0].CompletionPersent;
            if (CurrentPhase == "Completed" || CurrentPhase == "Close") {
                DateText = "Completed";
                DueDate = new Date(arrSelectedTaskPred[0].CompletionDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
            }
            var TaskMethod = '';
            var ProjectFullName = arrSelectedTaskPred[0].ProjectFullName;
            if (ProjectFullName == null) {
                TaskMethod = "General task";
                ProjectFullName = "<b>Client:</b> <span>" + arrSelectedTaskPred[0].ClientID.Title + "</span>";
            }
            else {
                TaskMethod = "Project task";
                ProjectFullName = "<b>Project:</b> <span>" + ProjectFullName + "</span>";
            }
            var TaskAssignTo = arrSelectedTaskPred[0].TaskAssignTo;
            if (TaskAssignTo.results.length > 0) {
                for (assignto = 0; assignto < TaskAssignTo.results.length; assignto++) {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[assignto].EMail);
                    TaskAssignToUsers += '<img title="' + TaskAssignTo.results[assignto].Title + '" src="' + attachment + '" alt="">';
                }
            }
            var StartDate = new Date(arrSelectedTaskPred[0].StartDate);
            StartDate = titanForWork.ShowCommonStandardDateFormat(StartDate);
			if(DisablePredTask == false) {
            	LinkTaskHTML += '<tr><td><a href="javascript:void(0);" onclick="redirectModifyTask(this);" name="'+TaskUrl+'" class="ellipsis-2">' + arrSelectedTaskPred[0].Title + '</a><p>' + ProjectFullName + '</p></td>';
            }
            else {
            	LinkTaskHTML += '<tr><td><a href="javascript:void(0);" name="'+TaskUrl+'" class="ellipsis-2">' + arrSelectedTaskPred[0].Title + '</a><p>' + ProjectFullName + '</p></td>';
            }
            LinkTaskHTML += '<td><div class="linkimgsec">' + TaskAssignToUsers + '</div>';
            LinkTaskHTML += '<p class="linkdated">Date: ' + StartDate + '</p></td><td><p class="statussec">' + CurrentPhase + '</p>';
            LinkTaskHTML += '<p class="linkdated">' + DateText + ': ' + DueDate + '</p><div class="progress custom-progress">';
            LinkTaskHTML += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + arrSelectedTaskPred[0].CompletionPersent + '%"></div>';
            LinkTaskHTML += '</div></td></tr>';
        }
        else {
            LinkTaskHTML += '<tr><td>No Predcessor Task added.</td></tr>';
        }
    }
    else {
        LinkTaskHTML += '<tr><td>No Predcessor Task added.</td></tr>';
    }
    LinkTaskHTML += '<tr><td colspan="3"><h3 class="linkheading">Successor Task:</h3></td></tr>';
    if (arrSelectedTask[0].SuccessorTask.Id != null && arrSelectedTask[0].SuccessorTask.Id != 0) {
        arrSelectedTaskSucc = arrAllTaskInbox.filter(function (data) {
            return data.Id == arrSelectedTask[0].SuccessorTask.Id;
        });
        if(arrSelectedTaskSucc.length == 0){
            arrSelectedTaskSucc = arrAllTaskOutbox.filter(function (data) {
                return data.Id == arrSelectedTask[0].SuccessorTask.Id;
            });
        }
        if(arrSelectedTaskSucc.length == 0){
        	DisableSuccTask = true;
        	restQuery = "&$filter=Id eq '" + arrSelectedTask[0].SuccessorTask.Id + "' ";
        	var Query = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,ClientID/ID,ClientID/Title,Module/Title,Module/ID,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,ClientID,Module,Author,AssignedBy,AttachmentFiles,TaskAssignTo,DependencyTo" + restQuery;
        	$.when(getLimitedItems('EmployeeTaskDetails', Query)).done(function (SuccTask) {
        		arrSelectedTaskSucc = SuccTask.results;
        	});
		}

        var DateText = "Due";
        var attachment = '';
        var TaskAssignToUsers = '';
        if(arrSelectedTaskSucc.length > 0) { 
            var TaskUrl = _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(arrSelectedTask[0].SuccessorTask.Id) + "&EditMode=" + window.btoa('True') + "' ";
            var DueDate = arrSelectedTaskSucc[0].DueDate;
            var CurrentPhase = arrSelectedTaskSucc[0].CurrentPhase;
            if (DueDate != null && CurrentPhase != "Completed" && CurrentPhase != "Close") {
                DueDate = new Date(DueDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
            }
            var CompletionPersent = arrSelectedTaskSucc[0].CompletionPersent;
            if (CurrentPhase == "Completed" || CurrentPhase == "Close") {
                DateText = "Completed";
                DueDate = new Date(arrSelectedTaskSucc[0].CompletionDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
            }
            var TaskMethod = '';
            var ProjectFullName = arrSelectedTaskSucc[0].ProjectFullName;
            if (ProjectFullName == null) {
                TaskMethod = "General task";
                ProjectFullName = "<b>Client:</b> <span>" + arrSelectedTaskSucc[0].ClientID.Title + "</span>";
            }
            else {
                TaskMethod = "Project task";
                ProjectFullName = "<b>Project:</b> <span>" + ProjectFullName + "</span>";
            }
            var TaskAssignTo = arrSelectedTaskSucc[0].TaskAssignTo;
            if (TaskAssignTo.results.length > 0) {
                for (assignto = 0; assignto < TaskAssignTo.results.length; assignto++) {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[assignto].EMail);
                    TaskAssignToUsers += '<img title="' + TaskAssignTo.results[assignto].Title + '" src="' + attachment + '" alt="">';
                }
            }
            var StartDate = new Date(arrSelectedTaskSucc[0].StartDate);
            StartDate = titanForWork.ShowCommonStandardDateFormat(StartDate);
			if(DisableSuccTask == false) {
            	LinkTaskHTML += '<tr><td><a href="javascript:void(0);" onclick="redirectModifyTask(this);" name="'+TaskUrl+'" class="ellipsis-2">' + arrSelectedTaskSucc[0].Title + '</a><p>' + ProjectFullName + '</p></td>';
            }
            else {
            	LinkTaskHTML += '<tr><td><a href="javascript:void(0);" name="'+TaskUrl+'" class="ellipsis-2">' + arrSelectedTaskSucc[0].Title + '</a><p>' + ProjectFullName + '</p></td>';
            }
            LinkTaskHTML += '<td><div class="linkimgsec">' + TaskAssignToUsers + '</div>';
            LinkTaskHTML += '<p class="linkdated">Date: ' + StartDate + '</p></td><td><p class="statussec">' + CurrentPhase + '</p>';
            LinkTaskHTML += '<p class="linkdated">' + DateText + ': ' + DueDate + '</p><div class="progress custom-progress">';
            LinkTaskHTML += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + arrSelectedTaskSucc[0].CompletionPersent + '%"></div>';
            LinkTaskHTML += '</div></td></tr>';
        }
        else {
            LinkTaskHTML += '<tr><td>No Successor Task added.</td></tr>';
        }
    }
    else {
        LinkTaskHTML += '<tr><td>No Successor Task added.</td></tr>';
    }
    $("#tbdyLinkTask").empty().append(LinkTaskHTML);
    $("#linkedtask").modal('show');
}

//Open Teams chat in IFrame
function OpenTeamChat(TaskId) {
    src = _spPageContextInfo.webAbsoluteUrl + "/SitePages/TeamsChat.aspx?TaskId=" + TaskId;
    var container = $("#chat-viewer").empty();
    $('<iframe>', {
        src: src,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#addmessage").modal("show");
}


//Get SharePoint list data through Pnp JS
function getAllDataByPnp(SelectQuery, ExpandQuery, FilterQuery, ListName, OrderByCol, Order){
    pnp.Logger.subscribe(new pnp.ConsoleListener());
    pnp.Logger.activeLogLevel = pnp.LogLevel.Info;

    pnp.sp.web.get().then(w => {
        console.log(JSON.stringify(w, null, 4));
});
try{
    result = pnp.sp.web.lists
    .getByTitle(ListName)
    .items
        .select(SelectQuery)
        .expand(ExpandQuery)
        .filter(FilterQuery)
        .orderBy(OrderByCol,Order)
        .getAll()
        .then(d => {
            AllTaskInbox = d.filter(function(f){return f;})
            checkHOD();
    $(".firstSubordinate").trigger("click");
        
    console.log(d.length);
});
}
    catch(e){
        console.log(e);
    }
}
//and ManagerLoginName/EMail eq '"+_spPageContextInfo.userEmail+"' 
//get All the Employees of Selected Department
async function getDeptEmployee(DeptId) {
    var arrDeptEmps = [];
    pnp.Logger.subscribe(new pnp.ConsoleListener());
    pnp.Logger.activeLogLevel = pnp.LogLevel.Info;

    pnp.sp.web.get().then(w => {
        console.log(JSON.stringify(w, null, 4));
});
try{
    result=await pnp.sp.web.lists
    .getByTitle('Employees')
    .items
        .select("Id,FullName,Company/Id,ManagerLoginName/EMail,Department/Id,Email,PrimaryCompany,Status")
        .expand("Company,ManagerLoginName,Department")
        .filter("Department/Id eq '"+DeptId+"' and Company/Id eq '"+Logged_CompanyId+"' ")
        .getAll()
        .then(d => {
            arrDeptEmps = d.filter(function(f){
                return f.Email;
            });
    DeptEmpTasks("PageLoad", arrDeptEmps);
});			
}
    catch(e){
        console.log(e);
    }
}

//Get the lastest added Tasks for logged-In user only(Assign-To, Dependency, Assign-By)
function getLastestTasks(){
	if(arrAllTaskInbox.length > 0) {
	    var SearchTaskId = arrAllTaskInbox[0].Id,
	        arrNewInboxTasks = [],
	        arrNewOutBoxTasks = [],
	        AssigntoQuery = true,
	        AssigneByQuery = true;
	
	    if(arrAllTaskOutbox[0].Id > arrAllTaskInbox[0].Id){
	        SearchTaskId = arrAllTaskOutbox[0].Id;
	    }
	    var restQuery = "&$filter=((TaskAssignTo/EMail eq '" + _spPageContextInfo.userEmail + "' or DependencyTo/EMail eq '" + _spPageContextInfo.userEmail + "' or AssignedBy/EMail eq '" + _spPageContextInfo.userEmail + "') and  Id gt '" + SearchTaskId + "')";
	    var Query = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,ClientID/ID,ClientID/Title,Module/Title,Module/ID,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,ClientID,Module,Author,AssignedBy,AttachmentFiles,TaskAssignTo,DependencyTo&$OrderBy=Modified desc" + restQuery;
	    $.when(getLimitedItems('EmployeeTaskDetails', Query)).done(function (TaskResults) {
	        var items = TaskResults.results;
	        if(items.length > 0) {    
	            AssigntoQuery = false;
	            //to check if added task(s) are belong to InBox (Assign to)
	            arrNewInboxTasks = items.filter(function (obj) {
	            	if (obj.TaskAssignTo.results.length > 0) {
		                for (var i = 0; i < obj.TaskAssignTo.results.length; i++) {
		                    if (obj.TaskAssignTo.results[i].EMail.indexOf("#") != -1) {
		                        obj.TaskAssignTo.results[i].EMail = obj.TaskAssignTo.results[i].EMail.split("#")[0];
		                        obj.TaskAssignTo.results[i].EMail = obj.TaskAssignTo.results[i].EMail.replace("_", "@");
		                    }
		                    if (obj.TaskAssignTo.results[i].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
		                        AssigntoQuery = true;
		                        break;
		                    }
		                }
		            }
	                return AssigntoQuery;
	            });
	            //to check if added task(s) are belong to InBox (Depenedency)
	            if (arrNewInboxTasks.length == 0) {
	                AssigntoQuery = false;
	                arrNewInboxTasks = items.filter(function (obj) {
	                    if (obj.DependencyTo.results != null) {
	                        for (var i = 0; i < obj.DependencyTo.results.length; i++) {
	                            if (obj.DependencyTo.results[i].EMail.indexOf("#") != -1) {
	                                obj.DependencyTo.results[i].EMail = obj.DependencyTo.results[i].EMail.split("#")[0];
	                                obj.DependencyTo.results[i].EMail = obj.DependencyTo.results[i].EMail.replace("_", "@");
	                            }
	                            if (obj.DependencyTo.results[i].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
	                                AssigntoQuery = true;
	                                break;
	                            }
	                        }
	                        return AssigntoQuery;
	                    }
	                });
	            }
	            //to check if added task(s) are belong to OutBox
	            AssigneByQuery = false;
	            arrNewOutBoxTasks = items.filter(function (obj) {
	                if (obj.AssignedBy.EMail.indexOf("#") != -1) {
	                    obj.AssignedBy.EMail = obj.AssignedBy.EMail.split("#")[0];
	                    obj.AssignedBy.EMail = obj.AssignedBy.EMail.replace("_", "@");
	                }
		
	                return obj.AssignedBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase();
	            });
	            //merging Arrays
	            arrAllTaskInbox = arrNewInboxTasks.concat(arrAllTaskInbox);
	            arrLimitTaskInbox = arrNewInboxTasks.concat(arrLimitTaskInbox);
	            arrAllTaskOutbox = arrNewOutBoxTasks.concat(arrAllTaskOutbox);
	            arrLimitTaskOutbox = arrNewOutBoxTasks.concat(arrLimitTaskOutbox);
		        
	            //Bind Inbox TAsks
	            if (arrNewInboxTasks.length > 0) {
	            	$(".mainDivAllAnnouncements").empty();
	                BindInboxTasks(arrLimitTaskInbox);
	                CreateTaskGanttChart(arrLimitTaskInbox);
	                //Showing data out of total
	                if (arrLimitTaskOutbox.length >= 500) {
	                    $("#TotalTaskCount").text(arrLimitTaskOutbox.length);
	                    arrLimitTaskOutbox = arrLimitTaskOutbox.slice(0, 500); //get 500 elements at first call
	                    $("#ShowTotalItemsInbox").hide();
	                    $("#ShowItemsInbox").show();
	                    $("#DiplayTaskCount").text("500");
	                    $("#SeeMoreInbox").show();
	                }
	                else {
	                    $("#ShowTotalItemsInbox").show();
	                    $("#ShowItemsInbox").hide();
	                    $("#TotalItemscount").text(arrLimitTaskOutbox.length);
	                    $("#SeeMoreInbox").hide();
	                }
	                ShowPieChartInbox();
	                GetTaskInboxCount();
	            }
	            //Bind Outbox Tasks
	            if (arrNewOutBoxTasks.length > 0) {
	            	$("#mainDivAreaTaskOutBox").empty();
	                BindOutboxTasks(arrLimitTaskOutbox);
	                GetTaskOutboxCount();
	                //Showing data out of total
	                if (arrLimitTaskOutbox.length >= 500) {
	                    $("#TotaloutBoxCount").text(arrLimitTaskOutbox.length);
	                    arrLimitTaskOutbox = arrLimitTaskOutbox.slice(0, 500); //get 500 elements at first call
	                    $("#ShowTotalItemsOutbox").hide();
	                    $("#ShowItemsOutbox").show();
	                    $("#DiplayOutboxCount").text("500");
	                    $("#SeeMoreOutbox").show();
	                }
	                else {
	                    $("#ShowTotalItemsOutbox").show();
	                    $("#ShowItemsOutbox").hide();
	                    $("#TotalItemscountfortaskOutBox").text(arrLimitTaskOutbox.length);
	                    $("#SeeMoreOutbox").hide();
	                }
	            }
	            waitingDialog.hide();
	        }
	        else{
	            waitingDialog.hide();
	        }
	    }).fail(function (error) {
	        if (error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1) {
	            $("#ThresholdError").modal('show');
	            $("#btnContinue").show();
	            $("#btnContinueOutBox").hide();
	            $("#btnLeave").click(function () {
	                location.href = _spPageContextInfo.webAbsoluteUrl;
	            });
	            LoadAllDataInbox = true;
	            LoadAllLocalData = false;
	            $("#btnContinue").click(function () {
	                $("#ThresholdError").modal('hide');
	                var dlgTitle = 'Loading all data...';
	                var dlgMsg = '<br />Please wait!!';
	                var dlgHeight = 200;
	                var dlgWidth = 400;
	                SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
	                    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
	                });
	                setTimeout(function () {
	                    $("#parentbtnContinue").empty();
	                    $("#parentbtnContinue").append('<button type="button" class="btn btn-primary" id="btnContinue">Continue</button>');
	                    GetAllInboxTasks(currentPhase, AssignTo, Action);
	                    waitingDialog.hide();
	                }, 100);
	            });
	        }
	        else {
	            HandleError(error);
	            waitingDialog.hide();
	        }
	    });
	}
    waitingDialog.hide();
}


//Remove duplicate elements from object array
function removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }
 
 /*----------------------------------------------------------------------*/
var getDependencyCountByTaskId= (taskID) =>{
	var items=0;
	var Query = "?$top=5000&$select=*,ID,Status,TaskId/ID,TaskId/Title&$Expand=TaskId&$filter=TaskId eq'" + taskID+ "'";
    $.when(getLimitedItems('TaskDependencies', Query)).done(function (TaskDependency) {
        items = TaskDependency.results.length;        
    });
	return items;
}

/******************************Change History lakhan******************************************-*/

function getOnChangeHistory(TaskId) {
    var CurrentDate = new Date();
    CurrentDate = CurrentDate.setHours(0, 0, 0, 0);
    CurrentDate = new Date(CurrentDate);
    var Query = "?$top=5000&$select=*,LastActionby/ID,LastActionby/Title&$Expand=LastActionby&$filter=TaskID eq '" + TaskId + "'";
    $.when(getLimitedItems('TaskAuditTrail', Query)).done(function (TaskAuditTrail) {
        $('#bodyChangeHistory').html('');
        var tblHTML='';
        TaskAuditTrail=TaskAuditTrail.results;
        if(TaskAuditTrail.length>0)
        {
            
            for(var i=0;i<TaskAuditTrail.length;i++)
            {
                var Modified=TaskAuditTrail[i].Modified;
                Modified=changeDateFormate(Modified);
                var Activity=TaskAuditTrail[i].Activity;
                var OnChange=TaskAuditTrail[i].OnChange;
                if(OnChange==null)OnChange='';
                var OldValues=TaskAuditTrail[i].OldValues;
                if(OldValues==null)OldValues='';
                var CurrentValues=TaskAuditTrail[i].CurrentValues;
                if(CurrentValues==null)CurrentValues='';
                var LastActionby=TaskAuditTrail[i].LastActionby.Title;
                tblHTML+='<tr>'
                    tblHTML+='<td><span class="date_dfine">'+Modified+'</span></td>'
                    tblHTML+='<td><div  class="modify_dfine">'+Activity+'</div ></td>'
                    tblHTML+='<td><div  class="task_dName ellipsis-2">'+OnChange+'</div ></td>'
                    tblHTML+='<td><div  class="task_OName ellipsis-2">'+OldValues+'</div ></td>'
                    tblHTML+='<td><div  class="task_newName ellipsis-2">'+CurrentValues+'</div ></td>'
                    tblHTML+='<td>'+LastActionby+'</td>'
               tblHTML+='</tr>';
            }
        }
        else
        {
            tblHTML+='<tr><td style="text-align:center">No record founds</td></tr>';
        }
        $('#bodyChangeHistory').append(tblHTML);
       
    });
} 
function changeDateFormate(modified)
{
    var modified=new Date(modified);
    var tempTime=new Date(modified).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).toLocaleUpperCase();

    tempDate=$.datepicker.formatDate('MM dd, yy', modified);
    var finalDateTime=(tempDate+ " " + tempTime);

    return finalDateTime;
}    