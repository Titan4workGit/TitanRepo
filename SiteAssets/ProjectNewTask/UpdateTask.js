var DependencyFileUpload = [];
var AllAddedAssignee = [];
var arrTaskTemp = [];
var IsReassigneeClicked = false;
$(document).ready(function () {
    if (currentTaskItemId != null && TaskAction != "CopyTask") {
        if (IsTimesheetInvisible == true) {
            $("#TimeHourseArea").remove();
        }
        else {
            $("#btntimesheet").show();
            timeSheetHours(currentTaskItemId);
        }

        initializePeoplePicker_AssaginTaskTeam('AssaginToTaskProjectTeam');
        peoplePickerDiv = $("[id$='AssaginToTaskProjectTeam_TopSpan']");
        $("#btnAttchmentsView").click(function () {
            GetAttachments(currentTaskItemId);
            $("#modalTitanUploadFile").modal("show");

        });
        PageLoadUpdateTask();
        $("#btnDependencies").click(function () {
            GetAttachments(currentTaskItemId);
            $("#Dependencies").modal("show");

        })
        $("#btnSave").click(function () {
            SaveDependency();
        });
        $("#btnaddDependencies").click(function () {
            $('#dependenciesmodl').modal('show');
            $("#DueDateHTML").hide();  
            $("#StartDateHTML").hide();
        })
        $("#btnSendNotify").click(function () {
            if($.trim($("#txtTaskNotify").val()) != "") {
                SendNotify();
            }
            else {
                alert("Kindly enter message first");
                return false;
            }
        });
        $("#DeleteTask").click(function () {
            if (ReviewTimeSheet() == false && DeleteTaskValidation() == true) {
                if (confirm("Are you sure, you want to delete this task?") == true) {
                    var dlgTitle = 'Deleting task...';
                    var dlgMsg = '<br />Please wait!!';
                    var dlgHeight = 200;
                    var dlgWidth = 400;
                    SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                        currentDlgTask = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
                    });
                    setTimeout(function () {
                        UpdateTaskStatus();
                    }, 100);
                }
            }
            else {
                alert("You cannot delete this task, because it is in progress.");
                return false;
            }
        });
        $("#timehours").click(function () {
            var timeSheetHour = $("#timehours").text();
            if (timeSheetHour != "h:m") {
                $("#timeSheet").modal("show");
            }
        });
        $("#btnAddDependncy").click(function () {
            if($.trim($("#txtTitle").val()) != '' && $.trim($("#txtDetails").val()) != '' && $("#AssaginToDependency_TopSpan_ResolvedList").text() != '') {
                updateTaskMeatdata();
            }
            else {
                alert("Kindly fill all the mandatory fields.");
                return false;
            }
        });
        $(".hideSelective").click(function () {
            if(this.value == "Selective") {
                $("#SendNotiPicker").show();
            }
            else {
                $("#SendNotiPicker").hide();
            }
        });
        $('#ProjectCurrentPhase').change(function () {
            if ($(this).val() == "Completed") {
                $("#rateYo").show();
                $('.CompletionDateButton').find('button').attr("disabled", false);
                $('.CompletionDate').prop('disabled', false);
                $("#completionInPersent").val(100);
                $('#barVal').text(100 + "%");
                $(".taskCompletionDetailsDate").show();
                $('#barVal').addClass("slider-txt-green");
                $('#barVal').removeClass("slider-txt-red");
            } else if ($(this).val() == "Close") {
                $("#rateYo").hide();
                $("#completionInPersent").val(100);
                $('#barVal').addClass("slider-txt-green");
                $('#barVal').removeClass("slider-txt-red");
                $('.CompletionDate').prop('disabled', false);
                $('.CompletionDateButton').find('button').attr("disabled", true);
                $('.CompletionDate').prop('disabled', false);
                $(".taskCompletionDetailsDate").hide();
                $('#barVal').text(100 + "%");
            }
            else {
                $("#rateYo").hide();
                $('.CompletionDateButton').find('button').attr("disabled", true);
                $('.CompletionDate').prop('disabled', 'disabled');
                $(".taskCompletionDetailsDate").hide();
                $('.CompletionDate').val('');
                $("#completionInPersent").prop("disabled", false);
            }
            if ($(this).val() == "Open" && CurrentPhase == "Completed") {
                $('#barVal').text(0 + "%");
                $("#completionInPersent").val(0);
            }
        });

        $('#completionInPersent').change(function () {
            if ($(this).val() == "100") {
                $("#ProjectCurrentPhase ").val('Completed');
                $('.CompletionDate').prop('disabled', false);
            }
            else {
                $("#ProjectCurrentPhase").val(CurrentPhase);
                $('.CompletionDate').val('');
                $('.CompletionDate').prop('disabled', true);
            }
        });

        $('#completionInPersent').keyup(function () {
            if ($(this).val() > 100 || $(this).val() < 0) {
                alert("No numbers above 100 and below 0");
                $(this).val('');
            }
        });
        // upload file in Add Message Popup
        $("#DependencyFileUpload").on('change', function (e) {
            var finalFilesDepd = [];
            var fileNum = this.files.length, initial = 0;
            $.each(this.files, function (idx, elm) {
                if(finalFilesDepd.filter( vendor => vendor['name'] === elm.name).length == 0){
                    finalFilesDepd[finalFilesDepd.length] = elm;
                }
            });
            finalFilesDepd = ReinitializeArray(finalFilesDepd);
            DependencyFileUpload = DependencyFileUpload.concat(finalFilesDepd);
            var ChangedfileName = '';
            var Tcounter = $("#DepFileName").find('.DepdncyFile').length;
            for (initial; initial < finalFilesDepd.length; initial++) {
                if (finalFilesDepd[initial].name.length > 15) {
                    Tcounter = Tcounter + 1;
                    ChangedfileName = finalFilesDepd[initial].name.substring(0, 15) + "...";
                    $('#DepFileName').append('<div class="DepdncyFile" title="' + finalFilesDepd[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLineDep(this.id, \'' + finalFilesDepd[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
                }
                else {
                    $('#DepFileName').append('<div class="DepdncyFile" title="' + finalFilesDepd[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + finalFilesDepd[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLineDep(this.id, \'' + finalFilesDepd[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
                }
            }
            $("#DependencyFileUpload").val('');
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
        $('.CompletionDate').datepicker({
            changeMonth: true,
            maxDate: new Date(),
            changeYear: true,
            yearRange: "-50:+50"
        });
        $('.CompletionDate').datepicker("option", "dateFormat", "MM dd, yy");
        getTaskDetails();
        
        $("#AttachmentUploadField").on('change', function () {
            FinalFiles4Upload = [];
            var fileNum = this.files.length, initial = 0;
            $.each(this.files, function (idx, elm) {
                finalFiles[finalFiles.length] = elm;
            });
            RemoveDuplicate = [];
            var arr = finalFiles.filter(function (el) {
                if (RemoveDuplicate.indexOf(el.name) == -1) {
                    RemoveDuplicate.push(el.name);
                    return true;
                }
                return false;
            });
            FinalFiles4Upload = ReinitializeArray(arr);
            $('#filename1').empty();
            var ChangedfileName = '';

            for (var i = 0; i < FinalFiles4Upload.length; i++) {
                if (RemoveDuplicate[i].length > 15) {
                    ChangedfileName = RemoveDuplicate[i].substring(0, 15) + "...";
                    $('#filename1').append('<div id="file_' + Tcounter + '"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; display:none; font-size:12px; margin-top:2px;">' + Tcounter + '</strong></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeLine(this.id, \'' + RemoveDuplicate[i] + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
                }
                else {
                    $('#filename1').append('<div id="file_' + Tcounter + '"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; display:none; font-size:12px; margin-top:2px;">' + Tcounter + '</strong></span> ' + RemoveDuplicate[i] + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeLine(this.id, \'' + RemoveDuplicate[i] + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
                }
                Tcounter = Tcounter + 1;
            }
            $("#AttachmentUploadField").val('');
        });
    }
    $("#btnSuccTasksEdit").click(function () {
        $("#txtModalTaskHeader").text('Successor Task');
        LoadPredSuccecessorTasks('Edit');
    });
    $("#btnPredTasksEdit").click(function () {
        $("#txtModalTaskHeader").text("Predecessor Task");
        LoadPredSuccecessorTasks('Edit');
    });
    $("#btnAddDependency").click(function () {
        taskDependency(currentTaskItemId);
    });
    $(".AddDepedncy").click(function () {
        $("#btnAddDependncy").text('Add');
        $("#DueDateHTML").show();
        $("#StartDateHTML").show();
    });
    $("#StartDateAsTask").click(function () {
        if(this.checked == true) {
            $(".StartDependecyDate").val('');
            $(".StartDependecyDate").prop('disabled', 'disabled');
        }
        else {
            $(".StartDependecyDate").prop('disabled', '');
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

});

//remove the attachment for Dependency
function removeLineDep(id, FileName) {
    var index = id.split('_')[1];
    $("#" + id).remove();
    DependencyFileUpload = DependencyFileUpload.filter(function( obj ) {
        return obj.name !== FileName;
    });
    $("#DependencyFileUpload").val('');
}
function PageLoadUpdateTask() {
    $("#btn1CloseAttachmentForm").hide();
    $('#create_task_without_comts').remove()
    $('#create_task_with_comts').show()
    $('#AssaginTaskProjectTeam').hide()
    // GetTaskEmailTemplate(4);
    $("#UpdateComment").hide();
    var slider = document.getElementById("completionInPersent");
    var output = document.getElementById("barVal");
    output.innerHTML = slider.value;
    $('#barVal').text('');
    slider.oninput = function () {
        output.innerHTML = this.value;
        if (this.value < 50) {
            slider.classList.add("slider-red");
            output.classList.add("slider-txt-red");
            output.classList.remove("slider-txt-green");
            output.textContent = output.textContent + "%";
        }
        else {
            slider.classList.add("slider");
            slider.classList.remove("slider-red");
            output.classList.remove("slider-txt-red");
            output.classList.add("slider-txt-green");
            output.textContent = output.textContent + "%";
        }
    }
    //GetTaskEmailTemplate(10);
    if(IsModal == 'true') {
    	GetEmployeeImages();
    }
    else {
	    LoginUserID = EmployeeDetails[0].Id;
	    LoginUserImage = CommentUserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail);
	    $('#LoginUserImage').attr("src", LoginUserImage);
	}
    //ReadComments_LikesOnPost(currentTaskItemId);

}


function timeSheetHours(itemid) {
    $('#timehours').html('')
    var requestURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmpTimeSheet')/items?$top=100&$select=*,TaskID/Title&$expand=TaskID&$orderby=DateOfWork,StartTimeMM asc&$filter=EmployeeId eq '" + _spPageContextInfo.userId + "' and TaskID eq'" + itemid + "'";
    $.ajax({
        url: requestURL,
        type: 'GET',
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            var items = data.d.results;
            var tr = '';

            if (items.length > 0) {
                // $("#timeSheet").modal("show");
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
                    var hours = Math.floor(TotalTime / 60);
                    var minutes = TotalTime % 60;
                    var TotalTime = hours + ":" + minutes;

                    tr += "<div class='col-md-12 col-sm-12 timesheet-entry-reply-box'>" +
                 "<div class='timesheet-entry-reply-author-detail px-0'><span><span >" + DateOfWork + "</span>" +
                 "<span class='ml-4'><span>(</span>" + startTime + "</span> - <span>" + endTime + "<span>)</span></span></span>" +
                 "<span>" + TotalTime + " (H:M)</span></div><h4>" + Details + "</h4></div>";


                }
                $('#timeSheetAllHours').append(tr);
                $('#TaskTitleOfTimeSheet').text(tileOfTask);

                var hours = Math.floor(TotalLoginMinutes / 60);
                var minutes = TotalLoginMinutes % 60;
                var taskTotalHous = hours + ":" + minutes + " (H:M)";
                $('#timehours').html(taskTotalHous);
            }
            else {
                tr += "<div class='col-md-12 col-sm-12 timesheet-entry-reply-box'><div class='timesheet-entry-reply-author-detail px-0'><span><span >No Logged hour Found</span>" +
               "<span class='ml-4'><span></span></span> <span><span></span></span></span> <span></span></div><h4></h4></div>";

                $('#timeSheetAllHours').append(tr);
                $('#TaskTitleOfTimeSheet').text(tileOfTask);

                $('#timehours').html('00:00 (H:M)');
            }
        },
        error: function (error) {
            console.log("Error occured");
        }
    })
}
function getTaskDetails() {
    try {
        //For Dependency modal
        initializePeoplePicker("AssaginToDependency");
        initializePeoplePicker("SendNotiPicker");
        $('.StartDependecyDate').datepicker();
        $('.StartDependecyDate').datepicker("option", "dateFormat", "dd/mm/yy");
        $('.DueDependecyDate').datepicker();
        $('.DueDependecyDate').datepicker("option", "dateFormat", "dd/mm/yy");
        var EditMode = titanForWork.getQueryStringParameter("EditMode");
        $("#reminderTask").show();
        EditMode = window.atob(EditMode);
        siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Module/Title,Module/Id,ClientID/ID,ClientID/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignToId,TaskManager/EMail,TaskManager/Title,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,AttachmentFiles&$expand=AttachmentFiles,DependencyTo,PredecessorTask,SuccessorTask,ClientID,Module,AssignedBy,TaskAssignTo,TaskManager,Author&$filter=ID eq '" + currentTaskItemId + "'";
        $.ajax({
            url: siteURL,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            async: false,
            success: function (data) {
                var items = data.d.results;
                arrTaskTemp  = items.filter(function(f){return f;});
                /*if (items[0].TaskManager.results != null) {
                    for (var subGrroupIndex = 0; subGrroupIndex < items[0].TaskManager.results.length; subGrroupIndex++) {
                        taskCCUsersUsers.push(items[0].TaskManager.results[subGrroupIndex].EMail);
                    }
                }*/
                OpenTeamChat(items[0].Id);
                var taskType = items[0].TaskType;
                TaskKind = items[0].TaskType; //GLobal varieble
                if (taskType == "2") {
                    $("#moduleTitleDetail").hide();
                    $("#projectTitleName").hide();
                    var ClientTitle = '';
                    if (items[0].ClientID != null) {
                        var ClientTitle = items[0].ClientID.Title;
                        if (ClientTitle == null) {
                            ClientTitle = "";
                        }
                    }
                    $('#ClientTitle').val(ClientTitle);
                }


                var TaskName = items[0].Title;
                $('#TaskName').val(TaskName);

                if (items[0].SuccessorTask.Id != null && items[0].SuccessorTask.Id != 0) {
                    $("#txtSuccTaskEdit").val(items[0].SuccessorTask.Title);
                    $("#txtSuccTaskEdit").attr("name", items[0].SuccessorTask.Id);;
                }
                else{
                    $("#txtSuccTaskEdit").val('');
                    $("#txtSuccTaskEdit").attr("name", '');
                }
                if (items[0].PredecessorTask.Id != null && items[0].PredecessorTask.Id != 0) {
                    $("#txtPredTaskEdit").val(items[0].PredecessorTask.Title);
                    $("#txtPredTaskEdit").attr("name", items[0].PredecessorTask.Id);
                }
                else {
                    $("#txtPredTaskEdit").val('');
                    $("#txtPredTaskEdit").attr("name", '');
                }
                if (items[0].DocumentLink != null) {
                    $("#txtDocLinkEdit").attr('href', items[0].DocumentLink);
                    $("#txtDocLinkEdit").text(items[0].DocumentLink.substring(0, 40) + "...");
                    $("#txtDocLinkEdit").attr('data-toggle', "");
        			$("#txtDocLinkEdit").attr('data-target', "");
                }
                else {
					$("#txtDocLinkEdit").attr('data-toggle', "modal");
        			$("#txtDocLinkEdit").attr('data-target', "#copymove");
                    $("#txtDocLinkEdit").prop('target', '');
                }
                var Discription = items[0].Description;
                $('#comment').val(Discription);
                var FinalCompletionDate = items[0].CompletionDate;
                if (FinalCompletionDate != null) {
                    FinalCompletionDate = new Date(items[0].CompletionDate);
                    FinalCompletionDate = $.datepicker.formatDate('MM dd, yy', FinalCompletionDate);
                    $('.CompletionDate').val(FinalCompletionDate);
                }
                var Projectname = items[0].ProjectFullName;
                if (taskType == "1") {
                    ProjectId = items[0].ProjectIDId; //global varieble
                    GetAllModule(ProjectId);
                    $("#ClientTitleName").hide();
                    $('#ProjectName').val(Projectname);
                    $("#ProjectNameDetails").val(ProjectId);
                }
                var completionInPersent = items[0].CompletionPersent ? items[0].CompletionPersent : 0;
                if (completionInPersent < 50) {
                    $('#completionInPersent').addClass("slider-red");
                    $('#barVal').removeClass("slider-txt-green");
                    $('#barVal').addClass("slider-txt-red");
                }
                $('#completionInPersent').val(completionInPersent);
                if (completionInPersent > 0) {
                    DeleteCheck = false;
                }
                $('#barVal').text(completionInPersent + "%");
                var TaskType = items[0].TaskType;
                $('#TaskType option[value=' + TaskType + ']').attr('selected', 'selected');
                CurrentPhase = items[0].CurrentPhase;
                // $('#ProjectCurrentPhase option[value=' + CurrentPhase + ']').attr('selected', 'selected');                
                $("#ProjectCurrentPhase ").val(CurrentPhase);
                TaskAssignID = items[0].AuthorId;
                var TaskAssignBy = items[0].AssignedBy.Title;//getUserName(items[0].AuthorId);
                $('#AssignedBy').text(items[0].AssignedBy.Title);
                $("#txtDependencyCount").text(items[0].DependencyCount ? items[0].DependencyCount : "0");
                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].AssignedBy.EMail);
                $('#ImgAssignedBy').attr("src", attachment);
                var Worktype = items[0].Worktype;
                //  Worktype = parseInt(Worktype)
                $('#updateCategory').val(Worktype);
                $('#projectModule').val(items[0].Module.Id);
                var TaskPriority = items[0].TaskPriority;
                $('#Priority option[value=' + TaskPriority + ']').attr('selected', 'selected');
                //$("#Priority option:selected").text(TaskPriority);
                $(".AssignTo").show();
                var TaskAssignTo = '';

                for (var j = 0; j < items[0].TaskAssignToId.results.length; j++) {
                    EmpIds.push(items[0].TaskAssignToId.results[j]);
                    assignUserName.push(items[0].TaskAssignTo.results[j].Title);
                    multipleEmailAddress.push(items[0].TaskAssignTo.results[j].EMail);
                    UserName = items[0].TaskAssignTo.results[j].Title;//getUserName(items[0].TaskAssignToId.results[j]);
                    arrAlreadyAssinEmp.push({
                        Email: items[0].TaskAssignTo.results[j].EMail,
                        DisplayName: UserName,
                        userId: items[0].TaskAssignToId.results[j]
                    });
                    if (j <= 4) {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].TaskAssignTo.results[j].EMail);
                        TaskAssignTo += '<img title="' + items[0].TaskAssignTo.results[j].Title + '" src="' + attachment + '" alt="">';
                    }
                    //TaskAssignTo += UserName + ";";
                    if (items[0].TaskAssignToId.results[j] == _spPageContextInfo.userId) {
                        IsProjectAdmin = true;
                        $('#btntimesheet').show();
                        $('#btnaddDependencies').show();
                    }
                }
                //   $("#AssignTo").html(TaskAssignTo);
                //$("#AssignTo").text(TaskAssignTo);
                if (items[0].TaskAssignToId.results.length > 4) {
                    TaskAssignTo += '<button type="button" class="seemorebox" id="btnAllAssignee">+' + (items[0].TaskAssignToId.results.length - 4) + '</button>';
                }
                $("#AssignTo").append(TaskAssignTo);
                $("#btnAllAssignee").click(function () {
                    OpenAllAssigneeModal(items[0].TaskAssignTo);
                });
                //$(".IntimationCompletion").show();
                $(".IntimationCompletion").hide(); //hide
                var TaskManager = '';
                /*if (items[0].TaskManagerId != null) {
                    for (var i = 0; i < items[0].TaskManagerId.results.length; i++) {
                        UserName = getUserName(items[0].TaskManagerId.results[i]);
                        TaskManager += UserName + ";";
                    }
                }*/
                //$("#IntimationCompletion").html(TaskManager);
                var ProjectName = items[0].ProjectName;
                if (TaskType == 1) {
                    $(".projectName").show();
                    $('#ProjectName').find('select#ProjectNameDetails option[value="' + ProjectName + '"]').attr('selected', 'selected');
                }
                //GetAllModule(parseInt(ProjectName));

                var Module = items[0].ModuleId;
                $('#updateModuleName').val(items[0].Module.Title);

                var rating = items[0].TaskRating;
                if (EditMode == "False") {
                    $(".EditSuccPred").remove();
                    $("#txtDocLinkEdit").attr('data-toggle', "");
        			$("#txtDocLinkEdit").attr('data-target', "");
                    $('#TaskType').attr('disabled', 'disabled');
                    $('#ProjectName').attr("disabled", true);
                    $('#ClientTitle').attr("disabled", true);
                    $('#ProjectNameDetails').attr('disabled', 'disabled');
                    $('#ProjectCurrentPhase').attr('disabled', 'disabled');
                    $('.CompletionDate').attr('disabled', 'disabled');
                    $('#Priority').attr('disabled', 'disabled');
                    $('#ProjectCurrentPhase').attr('disabled', 'disabled');
                    // $('#taskRevised').attr('disabled', 'disabled');
                    $("#completionInPersent").prop("disabled", false);
                    $('#comment').attr('disabled', 'disabled');
                    $('#TaskName').attr('disabled', 'disabled');
                    $('.StartDateButton').find('button').attr("disabled", true);
                    $('.DueDateButton').find('button').attr("disabled", true);
                    $('.StartDate').prop('disabled', 'disabled');
                    $('.DueDate').prop('disabled', 'disabled');
                    $('.CompletionDateButton').find('button').attr("disabled", true);
                    $('.CompletionDate').prop('disabled', 'disabled');
                    //  $("#FileUpload").hide();
                    $('#projectModule').prop('disabled', 'disabled');
                    $('#categoryType').prop('disabled', 'disabled');
                    $('#category').prop('disabled', 'disabled');
                    $('.taskCompletionDetails').show();
                    $("#btnAttchmentsView").hide();
                    TaskAttachments(items);
                    $("#spanAttachmentCollection").show();
                    if (CurrentPhase == "Completed") {
                        $("#rateYo").show();
                        //	$("#rateYo").rateYo("rating", rating);
                    }
                    $("#TaskStatus").show();
                }
                $(".clientNameDiv").hide();
                if (EditMode == "True") {
                    $("#TaskStatus").show();
                    $('#ProjectName').attr("disabled", true);
                    $('#ClientTitle').attr("disabled", true);
                    $('#ProjectCurrentPhase').attr('disabled', false);
                    $("#completionInPersent").prop("disabled", false);
                    $('.CompletionDate').attr('disabled', 'disabled');
                    $('#projectModule').prop('disabled', 'disabled');
                    $('#categoryType').prop('disabled', 'disabled');
                    $('#category').prop('disabled', 'disabled');
                    $('.StartDate').prop('disabled', 'disabled');
                    $('.taskCompletionDetails').show();
                    $("#btnAttchmentsView").hide();
                    TaskAttachments(items);
                    if (CurrentPhase == "Completed") {
                        if (IsProjectAdmin) {

                        }
                        else {
                            if (items[0].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                                if (checkProjTimeSheet() == false) {
                                    $('#ProjectCurrentPhase').attr('disabled', "disabled");
                                }
                            }
                            else {
                                $('#ProjectCurrentPhase').attr('disabled', "disabled");
                            }

                        }
                    } else {
                        $(".taskCompletionDetailsDate").hide();
                    }

                    $('.StartDateButton').find('button').attr("disabled", true);
                    $('.DueDateButton').find('button').attr("disabled", true);
                    $('#TaskType').attr('disabled', 'disabled');
                    $('#ProjectNameDetails').attr('disabled', 'disabled');
                    //New Changed on 16-August-2019
                    $('.StartDate').datepicker("destroy");
                    $('.DueDate').datepicker("destroy");
                    $('.StartDate').datepicker({
                        changeMonth: true,
                        changeYear: true,
                        yearRange: "-50:+50"
                    });
                    $('.StartDate').datepicker("option", "dateFormat", "MM dd, yy");

                    $('.DueDate').datepicker({
                        changeMonth: true,
                        changeYear: true,
                        yearRange: "-50:+50"
                    });
                    $('.DueDate').datepicker("option", "dateFormat", "MM dd, yy");
                }
                //to close dependency when status is Close, Cancelled, Completed
                if (CurrentPhase == "Completed" || CurrentPhase == "Cancelled" || CurrentPhase == "Close") {
                    $("#btnAddDependency").remove();
                    $(".EditSuccPred").remove();
                    $("#txtDocLinkEdit").attr('data-toggle', "");
        			$("#txtDocLinkEdit").attr('data-target', "");
                }
                var FinalStartDate = new Date(items[0].StartDate);
                FinalStartDate = $.datepicker.formatDate('MM dd, yy', FinalStartDate);
                $('.StartDate').val(FinalStartDate);

                var FinalDueDate = new Date(items[0].DueDate);
                FinalDueDate = $.datepicker.formatDate('MM dd, yy', FinalDueDate);
                $('.DueDate').val(FinalDueDate);
                if (items[0].AuthorId == _spPageContextInfo.userId && (CurrentPhase != "Close" && CurrentPhase != "Completed")) {
                    $('#btnaddDependencies').show();
                    $('#btnSave').hide();
                    $("#DeleteTask").show();
                } else {
                    $('#btnSave').hide();
                    $("#DeleteTask").hide();
                    $(".EditSuccPred").remove();
                    $("#txtDocLinkEdit").attr('data-toggle', "");
        			$("#txtDocLinkEdit").attr('data-target', "");
                }
                taskItemDetails.push(TaskMetadata(items[0], "", "NA"));
                if (EditMode == "True" || EditMode == "False") {
                    if (CurrentPhase == "Completed") {
                        $("#rateYo").show();
                        $("#rateYo").rateYo("rating", rating);
                    }
                }
                if (EditMode == "True" && _spPageContextInfo.userEmail.toLowerCase() == items[0].Author.EMail.toLowerCase() && CurrentPhase == "Open") {
                    $("#linkReassignee").show();
                    IsOwner = true;
                    $('#RefURLUpdate').prop('disabled', '');
                }
                else {
                    $("#RefLinkUpdate").show();
                    $('#RefURLUpdate').hide();
                }

                if (items[0].ReferenceLink != null) {
                    $("#RefURLUpdate").val(items[0].ReferenceLink.Url);
                    $("#RefLinkUpdate").attr("href", items[0].ReferenceLink.Url);
                    $("#RefLinkUpdate").text(items[0].ReferenceLink.Url);
                }
                else {
                    $("#RefLinkUpdate").text("");
                    $("#RefLinkUpdate").css("cursor", "text");
                }
                if (CurrentPhase == "Close") {
                    $("#linkReassignee").hide();
                    $('#RefURLUpdate').attr('disabled', 'disabled');
                    $('#TaskName').attr('disabled', 'disabled');
                    $('#comment').attr('disabled', 'disabled');
                    $('.DueDate').prop('disabled', 'disabled');
                    $("#FileUpload").hide();
                    $('#Priority').attr('disabled', 'disabled');
                    $('#Priority').attr('disabled', 'disabled');
                    $("#completionInPersent").prop("disabled", true);
                    $('#btnaddDependencies').hide();
                    $('.custom-delete-btn').hide();
                    $('.custom-edit-btn').hide();
                }
				if (jQuery.inArray(_spPageContextInfo.userEmail, multipleEmailAddress) == '-1') {// If it is not is array, then disabled Completion %
				    $("#completionInPersent").prop("disabled", true);
				}
            },
            eror: function (data) {
                alert($('#txtSomethingWentWrong').val());
            }
        });
    } catch (error) {
        //alert(error.message);
    }
}
//Get Attachments from SharePoint list.
function TaskAttachments(items) {
    var formViewEditMode = titanForWork.GetValueFromQueryString("EditMode");
    formViewEditMode = window.atob(formViewEditMode);
    var FileServerRelativeUrl = "";
    if (items[0].AttachmentFiles.results.length > 0) {
        $('#spanAttachmentCollection').show();
        $('#attachmentlabel').show();
        for (var indexitem = 0; indexitem < items[0].AttachmentFiles.results.length; indexitem++) {
            FileServerRelativeUrl += "<div class='m-0  upload-chip' ><span class='pr-8 chip-text-box' title='" + items[0].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' data-filename='" + items[0].AttachmentFiles.results[indexitem].FileName + "' data-fileUrl='" + items[0].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' onclick='priviewfile(this);' id='btnLinkAttachment'>" + items[0].AttachmentFiles.results[indexitem].FileName + "</span>";
            FileServerRelativeUrl += "<span class='chip-icon-box'><a href='" + items[0].AttachmentFiles.results[indexitem].ServerRelativeUrl + "' name='" + items[0].AttachmentFiles.results[indexitem].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a>" +
                                        "<a class='LinkView' id='btnLinkView' onclick='priviewfile(this);' name='" + items[0].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' data-filename='" + items[0].AttachmentFiles.results[indexitem].FileName + "' data-fileUrl='" + items[0].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "'  href='javascript:void(0)' > <i class='fa fa-eye cursor-pointer'></i></a>";
            if (formViewEditMode == "False") {
            } else {
                FileServerRelativeUrl += "<i class='fa fa-times cursor-pointer'> <a class='hideOnViewUploadRemovebtn' style='' aria-hidden='true' id='btnDeleteAttachment' style='cursor: pointer;margin-left: 36px;'onclick=DeleteItemAttachment('" + currentTaskItemId+ "','" + escape(items[0].AttachmentFiles.results[indexitem].FileName) + "');></a></i></label></span>";
            }
            FileServerRelativeUrl += "</span></div>";
        }
        $('#spanAttachmentCollection').append(FileServerRelativeUrl);
    } else {
        $('#spanAttachmentCollection').hide();

        if (formViewEditMode != "True") {
            $('#attachmentlabel').hide();
        }
    }
    if (formViewEditMode == "undefined") {
        formViewEditMode = "";
    } else {
        formViewEditMode = formViewEditMode.split('#')[0];
    }
    if (formViewEditMode == "False") {
        $('.hideOnViewUploadRemovebtn').each(function () {
            $(this).hide();
        });
    }
}


//show all the Assigned details
function OpenAllAssigneeModal(TaskAssignTo) {
    var li = '';
    var attachment = '';
    for (var m = 0; m < TaskAssignTo.results.length; m++) {
        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[m].EMail);
        li += '<li><div class="employeesection"><img class="empoyeeimg" src="' + attachment + '" data-themekey="#">';
        li += '<div class="Assignedcontents"><p class="txtAssignedName">' + TaskAssignTo.results[m].Title + '</p>';
        li += '<a class="txtAssignedEmail" href="javascript:void(0);" onclick="OpenOutLook(\'' + TaskAssignTo.results[m].EMail + '\')">' + TaskAssignTo.results[m].EMail + '</a></div></div></li>';
    }
    $('#assignToUserList').append(li);
    $("#AssignedToModal").modal("show");
}

function updateCurrentTaskStatus() {
    var currentTaskItemId = titanForWork.getQueryStringParameter("TaskId");
    var currentTaskItemId = window.atob(currentTaskItemId);
    var FinalCompletionDate = "";
    var completionInPersent = '';
    var rating = '';
    var emailNotificationStatus = '';
    var ProjectCurrentPhase = $('#ProjectCurrentPhase').val();
    completionInPersent = $('#completionInPersent').val();

    var validation = false;
    var TaskName = $('#TaskName').val();
    if (TaskName == '') {
        validation = true;
    }
    var Discription = $('#comment').val();
    /*if (Discription.trim().length == 0) {
        validation = true;
    }*/
    var Module = $('#projectModule').val(); //$('#projectModule option:selected' ).text()
    if (Module == '') {

    }
    var Worktype = $('#category').val()
    if (Worktype == 0) {
        validation = true;
    }
    //new code added here
    var StartDate = $('.StartDate').val();
    if (StartDate == '') {
        validation = true;
    }
    var FinalStartDate = "";
    if (StartDate != null && StartDate != "") {
    	StartDate = new Date(StartDate);
    	StartDate = StartDate.format('dd/MM/yyyy');
        FinalStartDate = GetDateStandardFormat(StartDate);
    }
    var DueDate = $('.DueDate').val();
    if (DueDate == '') {
        validation = true;
    }
    var FinalDueDate = "";
    if (DueDate != null && DueDate != "") {
    	DueDate = new Date(DueDate);
    	DueDate = DueDate.format('dd/MM/yyyy');
        FinalDueDate = GetDateStandardFormat(DueDate);
    }
    var ProjectCurrentPhase = $('#ProjectCurrentPhase').val();

    //when Status selected - 'Completed'
    if (ProjectCurrentPhase == "Completed") {
        var CompletionDate = $('.CompletionDate').val();
        if (CompletionDate != "") {
	        CompletionDate = new Date(CompletionDate);
	    	CompletionDate = CompletionDate.format('dd/MM/yyyy');
	    }
        if (CompletionDate == "") {
            alert('Completion date should not be blank.')
            currentDlgTask.close();
            return false;
        }
        else if (new Date(ConvertddmmyyTommddyyForDateCheck(CompletionDate)) < new Date(ConvertddmmyyTommddyyForDateCheck(StartDate))) {
            alert('Completion Date should not be less than Assign Date.')
            currentDlgTask.close();
            return false;
        }
        else {
            if (CompletionDate != null && CompletionDate != "") {
                FinalCompletionDate = GetDateStandardFormat(CompletionDate);
            } else {
                alert("Please enter Completion Date.");
                $(".CompletionDate").focus();
                currentDlgTask.close();
                return false;
            }
        }
        rating = $("#rateYo").rateYo("rating");
        emailNotificationStatus = "Updated";
    }


    //when Status selected - 'Close'
    if (ProjectCurrentPhase == "Close") {
        var CompletionDate = $('.CompletionDate').val();
        if (CompletionDate != "") {
	        CompletionDate = new Date(CompletionDate);
	    	CompletionDate = CompletionDate.format('dd/MM/yyyy');
	    }
        if (CompletionDate == "") {
            alert('Completion date should not be blank.')
            currentDlgTask.close();
            return false;
        }
        else if (new Date(ConvertddmmyyTommddyyForDateCheck(CompletionDate)) < new Date(ConvertddmmyyTommddyyForDateCheck(StartDate))) {
            alert('Completion Date should not be less than Assign Date.')
            currentDlgTask.close();
            return false;
        }
        else {
            if (CompletionDate != null && CompletionDate != "") {
                FinalCompletionDate = GetDateStandardFormat(CompletionDate);
            } else {
                alert("Please enter Completion Date.");
                $(".CompletionDate").focus();
                currentDlgTask.close();
                return false;
            }
        }
        rating = $("#rateYo").rateYo("rating");
    }

    if (ProjectCurrentPhase == "Open" || ProjectCurrentPhase == "Hold" || ProjectCurrentPhase == "Cancelled") {
        if (completionInPersent == "100") {
            alert("Completion (%) can't be 100% when status is '" + ProjectCurrentPhase + "'.");
            currentDlgTask.close();
            return false;
        }
    }
    var Priority = $('#Priority').val();
    if (EmpIds.length == 0) {
        alert("Assign to cannot be empty.");
        currentDlgTask.close();
    }
    if (FinalDueDate >= FinalStartDate && validation == false) {
        //medthod will go here
        updateExistingTask("EmployeeTaskDetails", currentTaskItemId, Module, Worktype, FinalCompletionDate, ProjectCurrentPhase, completionInPersent, rating, emailNotificationStatus, TaskName, Discription, FinalStartDate, FinalDueDate, Priority);
    }

    else if (validation == true) {
        alert("Please fill all mandatory field.");
        currentDlgTask.close();
    }

    else {
        alert("Due Date can not less than Start Date");
        currentDlgTask.close();
    }
}

function updateExistingTask(ListName, currentTaskItemId, Module, Worktype, FinalCompletionDate, ProjectCurrentPhase, completionInPersent, rating, emailNotificationStatus, TaskName, Discription, FinalStartDate, FinalDueDate, Priority) {
    try {
        var Metadata;
        if($("#txtDocLinkEdit").attr('href') == "#" || $("#txtDocLinkEdit").attr('href') == "undefined" || $("#txtDocLinkEdit").attr('href') == "javascript:void(0)" || $("#txtDocLinkEdit").attr('href') == "javascript:void(0);") {
            $("#txtDocLinkEdit").attr('href', '');
        }
        var ItemType = GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: {
                'type': ItemType
            },

            CompletionDate: FinalCompletionDate,
            CurrentPhase: ProjectCurrentPhase,
            CompletionPersent: completionInPersent,
            //  TaskRating: rating,
            TaskAssignToId: {
                'results': EmpIds
            },
            EmailSent: emailNotificationStatus,
            Title: TaskName,
            Description: Discription,
            StartDate: FinalStartDate,
            DueDate: FinalDueDate,
            TaskPriority: Priority,
            Worktype: Worktype,
            ModuleId: Module,
            SuccessorTaskId: $("#txtSuccTaskEdit").attr("name"),
            PredecessorTaskId: $("#txtPredTaskEdit").attr("name"),
            DependencyCount: DependecyRecrd.length,
            DependencyToId: {
                'results': DependecyToUser
            },
            DocumentLink: $("#txtDocLinkEdit").attr('href'),
            ReferenceLink: {
                '__metadata': { 'type': 'SP.FieldUrlValue' },
                'Description': $("#RefURLUpdate").val(),
                'Url': $("#RefURLUpdate").val()
            }
        };
        if ($("#txtSuccTaskEdit").attr("name") == "") {
            Metadata["SuccessorTaskId"] = 0;
        }
        if ($("#txtPredTaskEdit").attr("name") == "") {
            Metadata["PredecessorTaskId"] = 0;
        }

        if (FinalCompletionDate == null || FinalCompletionDate == "") {
            if (ProjectCurrentPhase == "Close") {
                Metadata["CompletionDate"] = new Date().toISOString();
            }
            else {
                delete Metadata["CompletionDate"];
            }
        }
        if (completionInPersent == null || completionInPersent == "") {
            delete Metadata["CompletionPersent"];
        }
        if (rating == null || rating == "") {
            delete Metadata["TaskRating"];
        }
        if (emailNotificationStatus == null || emailNotificationStatus == "") {
            delete Metadata["EmailSent"];
        }
        UpdateItemToList(ListName, Metadata, currentTaskItemId, ProjectCurrentPhase);

    } catch (error) {
        console.log(error.message);
        currentDlgTask.close();
    }

}

function UpdateItemToList(ListName, Metadata, currentTaskItemId, CurrentPhase) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + currentTaskItemId + "')",
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
            EmpIds = [];
            multipleEmailAddress = [];
            assignUserName = [];
            $('#createNewTask').attr("disabled", true);

            uploadattachment(currentTaskItemId);
            currentDlgTask.close();

            var txtProjectID = titanForWork.getQueryStringParameter("ProjectID");
            var txtCompanyId = Logged_CompanyId
            var IsProject = titanForWork.getQueryStringParameter("IsProject");
            var url = _spPageContextInfo.webServerRelativeUrl;
            var redirectedPage = '';
            if (txtProjectID != '' && txtProjectID != null && txtProjectID != undefined) {
                redirectedPage = url + "/Pages/ViewProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + txtProjectID + "&Source=" + window.btoa('Tasks');
            } else {
                redirectedPage = url + "/Pages/mydashboard.aspx?WebAppId=" + txtCompanyId + "&Source=" + window.btoa('Tasks') + "&Location=" + TabId;
            }
            alert("Task Updated Successfully.");
            if (IsModal == "true") {
                if ($.urlParam('sourceLocation').includes("../SitePages/ProjectDetails.aspx?") == true) {
                    location.href = $.urlParam('sourceLocation') + "&ProjectName=" + $("#ProjectName").val();
                }
                else {
                    location.href = $.urlParam('sourceLocation');
                }
            }
            else {
                location.href = redirectedPage;
            }
        },
        error: function (error) {

            alert(JSON.stringify(error));
            dfd.reject(error);
            currentDlgTask.close();
        }
    });
    return dfd.promise();
}

function UpdateTaskStatus() {
    //GetTaskItemDetails(currentTaskItemId);
    var ListName = "EmployeeTaskDetails";
    var Metadata;
    var ItemType = GetItemTypeForListName(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        CurrentPhase: "Deleted"
    }
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/GetItemById('" + currentTaskItemId + "')",
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
            alert("Item Deleted successfully.");
            currentDlgTask.close();
            location.href = _spPageContextInfo.webAbsoluteUrl + "/Pages/MyDashboard.aspx?WebAppId=" + Logged_CompanyId;
            dfd.resolve(data);
        },
        eror: function (data) {
            dfd.reject(error);
            currentDlgTask.close();
            console.log("An error occurred while deleting task. " + JSON.stringify(data));
        }
    });
    return dfd.promise();
}


function AddCommentAttachments(itemId) {
    var digest = "";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
        method: "POST",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            digest = data.d.GetContextWebInformation.FormDigestValue;
        },
        error: function (data) { }
    }).done(function () {
        var fileInput = $('#AttachmentUploadField');
        if (fileInput != null || fileInput != '') {
            var fileName = fileInput[0].files[0].name;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileData = e.target.result;
            var res11 = $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TasksComments')/items('" + itemId + "')/AttachmentFiles/ add(FileName='" + fileName + "')",
                method: "POST",
                binaryStringRequestBody: true,
                data: fileData,
                processData: false,
                headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "X-RequestDigest": digest
                },
                success: function (data) {
                    GetAttachments(itemId);
                    $("#spanAttachmentCollection").show();
                    $("#uploadFile").val(null);
                },
                error: function (data) {
                    alert("The file name is already exist.");
                }
            });
        };
        reader.readAsArrayBuffer(fileInput[0].files[0]);
    });
}

//Get Attachments from SharePoint list.
function GetAttachments(currentItemId) {
    var RestQuery = "?$select=ID,AttachmentFiles&$expand=AttachmentFiles&$filter=ID eq '" + currentItemId + "'";
    $.when(getItemsWithQueryItem("EmployeeTaskDetails", RestQuery, "")).done(function (EmployeeTaskDetails) {
        var items = EmployeeTaskDetails.results;
        var formViewEditMode = titanForWork.GetValueFromQueryString("EditMode");
        formViewEditMode = window.atob(formViewEditMode);

        for (var i = 0; i < items.length; i++) {
            var FileServerRelativeUrl = "";
            if (items[i].AttachmentFiles.results.length > 0) {
                $('#spanAttachmentCollection').show();
                $('#attachmentlabel').show();
                for (var indexitem = 0; indexitem < items[i].AttachmentFiles.results.length; indexitem++) {
                    FileServerRelativeUrl += "<div class='m-0  upload-chip' ><span class='pr-8 chip-text-box' title='" + items[i].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' data-filename='" + items[i].AttachmentFiles.results[indexitem].FileName + "' data-fileUrl='" + items[i].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' onclick='priviewfile(this);' id='btnLinkAttachment'>" + items[i].AttachmentFiles.results[indexitem].FileName + "</span>";
                    FileServerRelativeUrl += "<span class='chip-icon-box'><a href='" + items[i].AttachmentFiles.results[indexitem].ServerRelativeUrl + "' name='" + items[i].AttachmentFiles.results[indexitem].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a>" +
                                             "<a class='LinkView' id='btnLinkView' onclick='priviewfile(this);' name='" + items[i].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' data-filename='" + items[i].AttachmentFiles.results[indexitem].FileName + "' data-fileUrl='" + items[i].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "'  href='javascript:void(0)' > <i class='fa fa-eye cursor-pointer'></i></a>";
                    if (formViewEditMode == "False") {
                    } else {
                        FileServerRelativeUrl += "<i class='fa fa-times cursor-pointer'> <a class='hideOnViewUploadRemovebtn' style='' aria-hidden='true' id='btnDeleteAttachment' style='cursor: pointer;margin-left: 36px;'onclick=DeleteItemAttachment('" + currentItemId + "','" + escape(items[i].AttachmentFiles.results[indexitem].FileName) + "');></a></i></label></span>";
                    }
                    FileServerRelativeUrl += "</span></div>";
                }
                $('#spanAttachmentCollection').append(FileServerRelativeUrl);
            } else {
                $('#spanAttachmentCollection').hide();

                if (formViewEditMode != "True") {
                    $('#attachmentlabel').hide();
                }
            }
        }
        if (formViewEditMode == "undefined") {
            formViewEditMode = "";
        } else {
            formViewEditMode = formViewEditMode.split('#')[0];
        }
        if (formViewEditMode == "False") {
            $('.hideOnViewUploadRemovebtn').each(function () {
                $(this).hide();
            });
        }
    });
}


function GetCommentsAttachments(currentItemId) {
    var restQuery = "ID,AttachmentFiles&$expand=AttachmentFiles&$filter=ID eq '" + currentItemId + "'";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TasksComments')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var formViewEditMode = titanForWork.GetValueFromQueryString("EditMode");
            formViewEditMode = window.atob(formViewEditMode);
            //debugger;        
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                var FileServerRelativeUrl = "";
                if (items[i].AttachmentFiles.results.length > 0) {
                    $('#spanAttachmentCollection' + currentItemId).show();
                    $('#attachmentlabel').show();
                    for (var indexitem = 0; indexitem < items[i].AttachmentFiles.results.length; indexitem++) {
                        FileServerRelativeUrl += "<div class='m-0  upload-chip'><span class='' id='btnLinkAttachment' title='" + items[i].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' data-filename='" + items[i].AttachmentFiles.results[indexitem].FileName + "' data-fileUrl='" + items[i].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' onclick='priviewfile(this);'>" + items[i].AttachmentFiles.results[indexitem].FileName + "&nbsp";
                        FileServerRelativeUrl += "<a href='" + items[i].AttachmentFiles.results[indexitem].ServerRelativeUrl + "' download>" +
                            " <span class='fa fa-download' aria-hidden='true'></span></a> <a class='LinkView' id='btnLinkView' name='" + items[i].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' data-filename='" + items[i].AttachmentFiles.results[indexitem].FileName + "' data-fileUrl='" + items[i].AttachmentFiles.results[indexitem].ServerRelativePath.DecodedUrl + "' onclick='priviewfile(this)'  href='javascript:void(0)' > <span class='fa fa-eye'></span> </a>";
                        if (formViewEditMode == "False") {
                            // if (items[i].ApprovalStatus != "Approved") 
                        } else {
                            FileServerRelativeUrl += "<a class='hideOnViewUploadRemovebtn fa fa-times cursor-pointer' style='' aria-hidden='true' id='btnDeleteAttachment' style='cursor: pointer;margin-left: 36px;'onclick=DeleteItemAttachment('" + currentItemId + "','" + escape(items[i].AttachmentFiles.results[indexitem].FileName) + "');></a></label>";
                        }
                        FileServerRelativeUrl += "</span></div>";
                    }
                    $('#spanAttachmentCollection' + currentItemId).html('');
                    $('#spanAttachmentCollection' + currentItemId).append(FileServerRelativeUrl);
                } else {
                    $('#spanAttachmentCollection' + currentItemId).hide();
                    if (formViewEditMode != "True") {
                        $('#attachmentlabel').hide();
                    }
                }
            }
            if (formViewEditMode == "undefined") {
                formViewEditMode = "";
            } else {
                formViewEditMode = formViewEditMode.split('#')[0];
            }
            if (formViewEditMode == "False") {
                $('.hideOnViewUploadRemovebtn').each(function () {
                    $(this).hide();
                });
            }
        },
        eror: function (data) {
            console.log('error');
        }
    });
}

//Delete Attachments from SharePoint list.
function DeleteItemAttachment(ItemId, FileTitle) {
    FileTitle = unescape(FileTitle);
    var Dfd = $.Deferred();
    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmployeeTaskDetails')/GetItemById(" + ItemId + ")/AttachmentFiles/getByFileName('" + FileTitle + "')";
    $.ajax({
        url: Url,
        type: 'DELETE',
        contentType: 'application/json;odata=verbose',
        headers: {
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'X-HTTP-Method': 'DELETE',
            'Accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            GetAttachments(ItemId);
            Dfd.resolve(data);
        },
        error: function (error) {
            Dfd.reject(JSON.stringify(error));
        }
    });
    return Dfd.promise();
}

function DeleteCommentAttachment(ItemId, FileTitle) {
    FileTitle = unescape(FileTitle);
    var Dfd = $.Deferred();
    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('TasksComments')/GetItemById(" + ItemId + ")/AttachmentFiles/getByFileName('" + FileTitle + "')";
    $.ajax({
        url: Url,
        type: 'DELETE',
        contentType: 'application/json;odata=verbose',
        headers: {
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'X-HTTP-Method': 'DELETE',
            'Accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            GetCommentsAttachments(ItemId);
            EditComment(ItemId);
            Dfd.resolve(data);
        },
        error: function (error) {
            Dfd.reject(JSON.stringify(error));
        }
    });
    return Dfd.promise();
}

function TaskMetadata(item, assignedToUser, DependencyUsers) {

    if (item.TaskType == "1") {
        item.TaskType = "Project Task"
    } else {
        item.TaskType = "General Task"
    }

    var itm = {};
    itm.taskname = item.Title == null ? '' : item.Title;
    itm.tasktype = item.TaskType == null ? '' : item.TaskType;
    itm.priority = item.TaskPriority == null ? '' : item.TaskPriority;
    itm.description = item.Description == null ? '' : item.Description;
    itm.ProjectName = item.ProjectFullName == null ? '' : item.ProjectFullName;

    itm.assignedtouser = assignedToUser;
    if (DependencyUsers != "NA") {
        itm.DependenciesNames = DependencyUsers == null ? '' : DependencyUsers;
    }
    itm.StartDate = item.StartDate;
    itm.StartDate = new Date(itm.StartDate);
    itm.StartDate = $.datepicker.formatDate('dd-M-yy', itm.StartDate);

    itm.DueDate = item.DueDate;
    itm.DueDate = new Date(itm.DueDate);
    itm.DueDate = $.datepicker.formatDate('dd-M-yy', itm.DueDate);

    itm.createdBy = item.Author.Title == null ? '' : item.Author.Title;

    if (item.CompletionDate != null && item.CompletionDate != '') {
        itm.CompletionDate = item.CompletionDate;
        itm.CompletionDate = new Date(itm.CompletionDate);
        itm.CompletionDate = $.datepicker.formatDate('dd-M-yy', itm.CompletionDate);

        itm.CompletedBy = _spPageContextInfo.userDisplayName;
    }

    return itm;
}

// comment attachments
function uploadCommentattachment(id) {
    if (FinalFiles4Upload.length > 0) {
        $.each(FinalFiles4Upload, function (index, value) {
            getFileBuffer(value).then(function (buffer) {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TasksComments')/items(" + id + ")/AttachmentFiles/add( FileName='" + value.name + "')",
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
                        $('#filename1').hide();
                        $('#filename1').empty();
                        FinalFiles4Upload = [];
                        finalFiles = [];
                        RemoveDuplicate = [];
                        $("#AttachmentUploadField").val("");
                        //ReadComments_LikesOnPost(currentTaskItemId);
                    },
                    error: function (data) {
                        console.log(data.responseText.error);
                        $('#filename1').empty();
                        finalFiles = [];
                        RemoveDuplicate = [];
                        $("#AttachmentUploadField").val("");

                    }
                });
            });
        });
    }
}


function AddComments() {
    var d = new Date();
    var strDate = d.getDate() + "-";
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var Currentdate = strDate.concat(monthNames[d.getMonth()]);
    if ($("#_TextComment_").val().trim().length > 0) {
        //var DataID=ItemID.toString();LoginUserID   
        currentTaskItemId = titanForWork.getQueryStringParameter("TaskId");
        currentTaskItemId = window.atob(currentTaskItemId)
        var listName = "TasksComments";
        var comment = $("#_TextComment_").val().trim();
        //	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'}, 'Message':comment ,'OccasionType':OccasionType, 'EmployeeCode':EmployeeID,'ReplierID':LoginUserID.toString()};
        var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Comments': comment, 'TaskID': currentTaskItemId, 'ReplierID': LoginUserID.toString() };
        Universalinsert(listName, item);
        $(".emojionearea-editor").empty();
        $("#_TextComment_").val("");
        //ReadComments_LikesOnPost(currentTaskItemId);
    }
    else {
        alert("Please fill comment.");
        return false;

    }
}

function UpdateComments() {
    if ($(".emojionearea-editor").text().trim() != "") {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('TasksComments')/items(" + UpdateItemID + ")",
            type: "POST",
            data: JSON.stringify
	        ({
	            __metadata: { type: "SP.Data.TasksCommentsListItem" },
	            Comments: $(".emojionearea-editor").text().trim()
	        }),
            headers:
	        {
	            "Accept": "application/json;odata=verbose",
	            "Content-Type": "application/json;odata=verbose",
	            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	            "IF-MATCH": "*",
	            "X-HTTP-Method": "MERGE"
	        },
            success: function (data, status, xhr) {
                $(".emojionearea-editor").empty();
                $("#UpdateComment").hide();
                $("#AddComment").show();
                if (FinalFiles4Upload.length > 0) {
                    uploadCommentattachment(UpdateItemID);
                }
                else {
                    //ReadComments_LikesOnPost(currentTaskItemId);
                    $('#filename1').hide();
                    $('#filename1').empty();
                }
            },
            error: function (error, xhr, status, data) {
                $("#ResultDiv").empty().text(error.responseJSON.error);
            }
        });
    }
    else {
        alert("Please fill comment.");
        return false;
    }

}


function DeleteComment(ItemID) {
    if (confirm('Are you sure to delete this record?')) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('TasksComments')/items(" + ItemID + ")",
            type: "POST",
            headers:
                {
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "IF-MATCH": "*",
                    "X-HTTP-Method": "DELETE"
                },
            success: function (data) {
                alert("Selected record deleted successfully.");
                ReadComments_LikesOnPost(currentTaskItemId);
            },
            error: function (data) { $("#ResultDiv").empty().text(data.responseJSON.error); }
        });
    }
}


function EditComment(MessageID) {
    UpdateItemID = MessageID;
    var RestQuery = "?$select=ID,Comments,AttachmentFiles&$expand=AttachmentFiles&$filter=ID eq '" + UpdateItemID + "'";
    $.when(getItemsWithQueryItem("TasksComments", RestQuery, "")).done(function (TasksComments) {
        var items = TasksComments.results;
        itemsAttachments = items[0].AttachmentFiles.results
        if (items.length > 0) {
            $("#AddComment").hide();
            $("#UpdateComment").show();
            $(".emojionearea-editor").html(items[0].Comments);
            $('#filename1').empty()
            $('#filename1').show()
            FinalFiles4Upload = []
            if (itemsAttachments.length > 0) {
                for (i = 0; i < itemsAttachments.length; i++) {
                    var filename = itemsAttachments[i].FileName;
                    $('#filename1').append('<div id="file_' + Tcounter + '"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; display:none; font-size:12px; margin-top:2px;">' + Tcounter + '</strong></span> ' + itemsAttachments[i].FileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn" style="color:red;" onclick="DeleteCommentAttachment(' + items[0].ID + ',\'' + escape(filename) + '\');" id="file_' + Tcounter + '" title="remove"></span></div>');
                    Tcounter = Tcounter + 1;
                }
            }
        }
    });
}

function ReadComments_LikesOnPost(ItmID) {
    var RestQuery = "?$filter= TaskID eq ('" + ItmID + "')&$expand=Author/Id&$select=*,Author/Name,Author/Title";
    $.when(getItemsWithQueryItem("TasksComments", RestQuery, "")).done(function (TasksComments) {
        var items = TasksComments.results;
        $("#ReplyHere").empty();
        var likeCount = [];
        var AuthorList = [];
        if (items.length > 0) {
            var HtmlDesign = '';
            var i = 0;
            for (i; i < items.length; i++) {
                var deleteHtml = '';
                var value = items[i];
                if (value.Comments != null) {
                    var PerameterArray = [];
                    GetEmployeeImages(value.ReplierID);
                    var ReplyDateObj = new Date(value.Created);
                    var Replytime = ReplyDateObj.toTimeString();
                    var H = +Replytime.substr(0, 2);
                    var h = (H % 12) || 12;
                    var ampm = H < 12 ? " AM" : " PM";
                    Replytime = h + Replytime.substr(2, 3) + ampm;
                    var setdisplay = '';
                    if (parseInt(value.AuthorId) == _spPageContextInfo.userId) {
                        setdisplay = "display: block";
                        deleteHtml += '<span class="question-delete-button" id="">' + '<a href="#" onclick="DeleteComment(' + value.ID + ')">' + '<i class="fa fa-times cursor-pointer"></i>' + '<p>Delete</p></a>' + '</span>';
                        deleteHtml += '<span class="question-edit-button" id="" style="">' + '<a href="#" onclick="EditComment(' + value.ID + ')">' + '<i class="fa fa-pencil"></i><p>Edit</p>' + '</a>' + '</span>'
                    }
                    else {
                        setdisplay = "display: none";
                    }
                    PerameterArray.push(value.ID, value.Message);

                    HtmlDesign = HtmlDesign + '<div class="col-md-12 col-sm-12 reply-box" style="margin-bottom:5px">' +
                                          '<div class="col-md-12 col-sm-12 reply-author-detail pb10 px-0">' +
                                          '<span class="mr10">' +
                                          '<img src=' + CommentUserImage + ' class="img-circle" width="36" height="36">' +
                                          '</span>' +
                                          '<span>' + value.Author.Title + '</span> - <span>' + formatDateEvent(value.Created) + '</span> at <span>' + Replytime + '</span>' +
                                          '</div>' +
                                           '<div class="col-md-12 col-sm-12">' + value.Comments + '</div>' +
                                            '<div class="col-md-12 col-sm-12 px-0"><div class="attachment-badge mt-10 chip-box" id="spanAttachmentCollection' + value.ID + '"><span class="pr-8 chip-text-box"></span></div></div>' +
                                           '<div class="clearfix"></div>' +
                                           '<div class="col-md-12 pt0 pl0 pr0 reply_btns_box" style="display: block">' +
                                           deleteHtml +
                                           '</div><div class="clearfix"></div>' +
                                           '</div>';
                }
            }
            $("#ReplyHere").append(HtmlDesign);
            for (j = 0; j < items.length; j++) {
                GetCommentsAttachments(items[j].ID);
            }
        }
        else {
            $("#TotalLikes").text("");
            $("#Likesonpost").text("");
        }
    });
}


function GetEmployeeImages(EmpID) {
    var RestQuery = '';
    if (EmpID == undefined || EmpID == null) {
        RestQuery = "?$select=ID,AttachmentFiles,Designation,City,Department/DepartmentName,OfficeLocation/OfficeName,DateOfBirth,DayOfBirth,MonthOfBirth,DateOfAnniversary,DayOfAnniversary,MonthOfAnniversary,LogonName/Title,LogonName/EMail&$orderby=FullName&$top=5000&$expand=LogonName,OfficeLocation,AttachmentFiles,Department&$filter=LogonName/EMail eq '" + _spPageContextInfo.userEmail + "' or Email eq '" + _spPageContextInfo.userEmail + "'";
    }
    else {
        RestQuery = "?$select=ID,AttachmentFiles,Designation,City,Department/DepartmentName,OfficeLocation/OfficeName,DateOfBirth,DayOfBirth,MonthOfBirth,DateOfAnniversary,DayOfAnniversary,MonthOfAnniversary,LogonName/Title,LogonName/EMail&$orderby=FullName&$top=5000&$expand=LogonName,OfficeLocation,AttachmentFiles,Department&$filter=ID eq ('" + EmpID + "')";
    }
    $.when(getItemsWithQueryItem("Employees", RestQuery, "")).done(function (Employees) {
        var items = Employees.results;
        if (items.length > 0) {
            if (EmpID == undefined || EmpID == null) {
                LoginUserID = items[0].ID;

                if (items[0].AttachmentFiles.results.length > 0) {
                    LoginUserImage = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                }
                else {
                    LoginUserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].LogonName.EMail);
                }
                $('#LoginUserImage').attr("src", LoginUserImage);
                if (items[0].AttachmentFiles.results.length > 0) {
                    CommentUserImage = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                }
                else {
                    CommentUserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].LogonName.EMail);
                }
            }
            else {
                if (items[0].AttachmentFiles.results.length > 0) {
                    CommentUserImage = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                }
                else {
                    CommentUserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].LogonName.EMail);
                }
            }

        }
    });
}

// save and set new Reassignee to 
function SaveReassignee() {
    var allUser = '';
    var tempUserArray = [];
    var notvalidUsers = '';
    var TimeSheetAllUser = '';
    var notValidIndex = [];
    var AssigneeCount = 0;
    //checkEmployee Active in INternal user and check validUpto & Internalmember/Supervisor in External user case
    for (var k = 0; k < multipleEmailAddress.length; k++) {
        if (checkTimeSheet(multipleEmailAddress[k]) == false) { //First check timesheet, if not filled then...
            if (TaskKind == "1") { //it means Project task, It should check for project team members
                if (checkProjectMember(multipleEmailAddress[k]) == false) {     //... check user's status based on Internal/External
                    notvalidUsers += assignUserName[k] + ", ";
                    notValidIndex.push(multipleEmailAddress[k]);

                    multipleEmailAddress = multipleEmailAddress.filter(function (obj) {
                        return obj.toLowerCase() !== multipleEmailAddress[k].toLowerCase();
                    });
                    assignUserName = assignUserName.filter(function (obj) {
                        return obj.toLowerCase() !== assignUserName[k].toLowerCase();
                    });
                    EmpIds = EmpIds.filter(function (obj) {
                        return obj != EmpIds[k];
                    });

                }
                else {
                    if(AssigneeCount <= 4) {
                        AssigneeCount++;
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(multipleEmailAddress[k]);
                        allUser += '<img title="' + assignUserName[k] + '" src="' + attachment + '" alt="">';
                    }
                    else{
                        AssigneeCount++;
                    }
                }
            }
            else { //general task, means user will be checked for Internal active users and External (Internal Stakeholder and Supervisor)
                if (checkEmployeeStatus(multipleEmailAddress[k]) == false) {     //... check user's status based on Internal/External
                    notvalidUsers += assignUserName[k] + ", ";
                    notValidIndex.push(multipleEmailAddress[k]);
                    multipleEmailAddress = multipleEmailAddress.filter(function (obj) {
                        return obj.toLowerCase() !== multipleEmailAddress[k].toLowerCase();
                    });
                    assignUserName = assignUserName.filter(function (obj) {
                        return obj.toLowerCase() !== assignUserName[k].toLowerCase();
                    });
                    EmpIds = EmpIds.filter(function (obj) {
                        return obj != EmpIds[k];
                    });
                }
                else {
                    if(AssigneeCount <= 4) {
                        AssigneeCount++;
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(multipleEmailAddress[k]);
                        allUser += '<img title="' + assignUserName[k] + '" src="' + attachment + '" alt="">';
                    }
                    else{
                        AssigneeCount++;
                    }
                }
            }
        }
    }
    if(AssigneeCount > 4) {
        allUser += '<button type="button" class="seemorebox" id="btnAllAssigneeTemp">+' + (AssigneeCount - 4) + '</button>';
    }
    $("#AssignTo").empty().append(allUser);
    $("#btnAllAssigneeTemp").click(function () {
        OpenAllAssigneeChange(multipleEmailAddress, assignUserName);
    });
    $("#Reassignee-Popup").modal('hide');
    if (notvalidUsers != "") {
        alert(notvalidUsers.slice(0, -2) + " user(s) are not valid.");
    }
    for (var t = 0; t < tempUserArray.length; t++) {
        TimeSheetAllUser += tempUserArray[t].DisplayName + ", "
    }
    if (TimeSheetAllUser != "") {
        alert(TimeSheetAllUser.slice(0, -2) + " user(s) have already filled the timesheet so you can't remove them.");
    }
}

//show all the Assigned details after change
function OpenAllAssigneeChange(AssigneeEmail, UserNames) {
    var li = '';
    var attachment = '';
    for (var m = 0; m < AssigneeEmail.length; m++) {
        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(AssigneeEmail[m]);
        li += '<li><div class="employeesection"><img class="empoyeeimg" src="' + attachment + '" data-themekey="#">';
        li += '<div class="Assignedcontents"><p class="txtAssignedName">' + UserNames[m] + '</p>';
        li += '<a class="txtAssignedEmail" href="javascript:void(0);" onclick="OpenOutLook(\'' + AssigneeEmail[m] + '\')">' + AssigneeEmail[m] + '</a></div></div></li>';
    }
    $('#assignToUserList').append(li);
    $("#AssignedToModal").modal("show");
}


//get user Ids from People picker
function getPeopleUserInfoGroups(pickerPickerControlId) {
    //SharedUserName = [];
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
                var userId = GetUserIdForManager(users[i].Key);
                var tempEmail = users[i].Key.split('|')[2];
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.split('#')[0];
                    tempEmail = tempEmail.replace("_", "@");
                }
                UserArrayList.push({
                    Email: tempEmail,//users[i].Key.split('|')[2],
                    DisplayName: users[i].DisplayText,
                    userId: userId
                });
            } else {
                var grpid = users[i].EntityData.SPGroupID;
                var myArrays = new Array();
                myArrays.push(siteusers(grpid));
                //  var c = UserArrayList.concat(myArrays);
                var c = UserArrayList.concat.apply([], myArrays);
                UserArrayList = UserArrayList.concat(c);
            }
        }
    }
    return UserArrayList;
}

//get userId from Email
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
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
    return userID;
}

//validation before deleting task
function DeleteTaskValidation() {
    var IsValidate = true;
    if (DeleteCheck == false) { //Status check and percent check and Dependency check
        IsValidate = false;
    }
    return IsValidate;
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
                userPickerId.push(GetUserID(users[i].Key));
            }
            //return userIds;
        }
    }
    else {
        //return userIds;
    }
}
//check if user id valid or not - Internal and External both
function checkUserValidDepd() {
    var arrFinalMembers = [];
    var arrTemp = [];
    var IsExternalUserBind = false;
    var arrExternal = [];
    var RestQuery = "?$select=*,AttachmentFiles,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID&$expand=AttachmentFiles,LogonName,Department,Company&$top=5000";
    $.when(getItemsWithQuery("Employees", RestQuery)).done(function (Employees) {
        Employees = Employees.filter(function (obj) { //Filter array on the basis of Status == "Active"
            return obj.Status.toLowerCase() == 'active';
        });
        for (var i = 0; i < AllAddedAssignee.length; i++) {
            arrTemp = Employees.filter(function (obj) { //Filter array on the basis of CurrentPhase
                return obj.Email.toLowerCase() == AllAddedAssignee[i].email.toLowerCase();
            });

            if (arrTemp.length > 0) {
                arrFinalMembers.push(arrTemp[0].LogonName.Id);
            }
            else {
                //Check in External Users list
                if (IsExternalUserBind == false) {
                    IsExternalUserBind = true;
                    var RestQuery = "?$select=LoginName/Id,email&$expand=LoginName&$top=5000";
                    $.when(getItemsWithQuery("ExternalUsers", RestQuery)).done(function (ExtEmployees) {
                        arrExternal = ExtEmployees;
                        //for (var j = 0; j < ExtEmployees.length; j++) {
                        arrTemp = ExtEmployees.filter(function (obj) { //Filter array on the basis of email
                            return AllAddedAssignee[i].email.toLowerCase() == obj.email.toLowerCase();
                        });
                        if (arrTemp.length > 0) {
                            arrFinalMembers.push(arrTemp[0].LoginName.Id);
                        }
                        //}
                    });
                }
                else {
                    //for (var j = 0; j < arrExternal.length; j++) {
                    arrTemp = arrExternal.filter(function (obj) { //Filter array on the basis of email
                        return AllAddedAssignee[i].email.toLowerCase() == obj.email.toLowerCase();
                    });
                    //}
                    if (arrTemp.length > 0) {
                        arrFinalMembers.push(arrTemp[0].LoginName.Id);
                    }
                }
            }
        }

    });
    return arrFinalMembers;
}


//Add Dependency
var userPickerId=[];
function updateTaskMeatdata() {
    var IsDepValidateOk = true;
    var ItemType = GetItemTypeForListName('TaskDependencies');
    var ItemTypeTaskist = GetItemTypeForListName('EmployeeTaskDetails');
    userPickerId=[];
    getDependencyUserInfo('AssaginToDependency');
    arrTempTaskId = [];
    arrTempTaskId.push(currentTaskItemId);
    arrTempTaskId.forEach(function (value, i) {
        var arrFinalAssigneeIds = [];
        //AllAddedAssignee = [];
        IsDepValidateOk = true;
        var AlreadyDepenedency = [];
        /*if(arrTaskTemp[0].DependencyCount != 0 && arrTaskTemp[0].DependencyCount != null) {
            for(var usr=0;usr<arrTaskTemp[0].DependencyTo.results.length;usr++) {
                AlreadyDepenedency.push({
                    email: arrTaskTemp[0].DependencyTo.results[usr].EMail,
                    userId: arrTaskTemp[0].DependencyToId.results[usr]
                });
            }
        }*/ //hide by lakhan
        AlreadyDepenedency=g_TaskDependency;
        if($("#btnAddDependncy").text() == "Add"){
            var Depenedencycount=(AlreadyDepenedency.length + AllAddedAssignee.length);
        }
        else
        {
           var Depenedencycount=(AlreadyDepenedency.length);
        }    
        AllAddedAssignee = AllAddedAssignee.concat(AlreadyDepenedency);        
        arrFinalAssigneeIds = checkUserValidDepd();
        //Remove duplicate elements Azure Array
        arrFinalAssigneeIds = arrFinalAssigneeIds.filter(function (item, pos) { 
            return arrFinalAssigneeIds.indexOf(item) == pos 
        });
        //Add in EmployeeTaskDetails list
        
        MetadataforDependencyTask = {
            __metadata: {
                'type': ItemTypeTaskist
            },
            DependencyCount:Depenedencycount, //arrFinalAssigneeIds.length + parseInt(arrTaskTemp[0].DependencyCount ? arrTaskTemp[0].DependencyCount: 0),
            DependencyToId: { 'results': arrFinalAssigneeIds }
        };	
        
        
        //remove those dependency which are already added.
        arrDepIds = [];
        arrTemp = [];
        if($("#btnAddDependncy").text() == "Add"){
            if(AlreadyDepenedency.length > 0) {
                for(var u=0;u<AlreadyDepenedency.length;u++){
                    arrTemp = arrFinalAssigneeIds.filter(function( obj ) {
                        return obj != AlreadyDepenedency[u].userId;
                    });
                    arrDepIds.push(arrTemp[0]);
                }
            	
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
                    'results': userPickerId
                },
                TaskIdId: value
            };
            
            if($('.StartDependecyDate').val() != ""){
                if (new Date(arrTaskTemp[0].StartDate) <= new Date(GetDateStandardFormat($('.StartDependecyDate').val())) && new Date(arrTaskTemp[0].DueDate) >= new Date(GetDateStandardFormat($('.StartDependecyDate').val()))) {
                    Metadata["StartDate"] = GetDateStandardFormat($('.StartDependecyDate').val())
                }
                else {
                    AllAddedAssignee = [];
                    IsDepValidateOk == false;
                    alert('Start date should be in-between task"s start date and due Date.');
                    return false;
                }
            }
            else {
                if($("#StartDateAsTask").prop('checked') == true){
                    var tempDate=new Date(arrTaskTemp[0].StartDate);
                    var startDate=tempDate.format('yyyy-MM-dd');
                    Metadata["StartDate"] =GetDateStandardFormat(moment(startDate).format("DD/MM/YYYY")); //startDate;//GetDateStandardFormat(tempDate);
                }
            }
			
            if($('.DueDependecyDate').val() != ""){
                if (new Date(arrTaskTemp[0].StartDate) <= new Date(GetDateStandardFormat($('.DueDependecyDate').val())) && new Date(arrTaskTemp[0].DueDate) >= new Date(GetDateStandardFormat($('.DueDependecyDate').val()))) {
                    Metadata["EndDate"] = GetDateStandardFormat($('.DueDependecyDate').val());
                }
                else {
                    IsDepValidateOk == false;
                    AllAddedAssignee = [];
                    alert('End date should be in-between task"s start date and due Date.');
                    return false;
                }
            }
            else {
                if($("#DueDateAsTask").prop('checked') == true){
                    var tempDate=new Date(arrTaskTemp[0].DueDate);
                    var DueDate=tempDate.format('yyyy-MM-dd');
                    Metadata["EndDate"] =GetDateStandardFormat(moment(DueDate).format("DD/MM/YYYY"));                    
                    //Metadata["EndDate"] =GetDateStandardFormat(moment(arrTaskTemp[0].DueDate.split('T')[0]).format("DD/MM/YYYY"));
                }
            }            

            Metadata["MandatoryCompletion"] = $('#chkIsMandatory').prop('checked');
            UpdateTaskList('EmployeeTaskDetails', MetadataforDependencyTask, value);
            if(IsDepValidateOk == true) {
                if($("#btnAddDependncy").text() == "Add"){
                    AddDependyList('TaskDependencies', Metadata, value, arrFinalAssigneeIds.length);
                }
                else {
                    delete Metadata["Status"];
                    UpdateDependyList('TaskDependencies', Metadata, value, arrFinalAssigneeIds.length);
                }
            }
        }
        $(".btnCloseDependency").trigger('click');
        taskDependency(arrTempTaskId[0]);
        $("#txtDependencyCount").text(Depenedencycount);
        alert("All the dependencies are submitted for selected task(s).");
    });

}
//Add data in SharePOint list
function AddDependyList(ListName, Metadata, txtTaskId, DependencyCount) {
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


//Update data in SharePOint list
function UpdateDependyList(ListName, Metadata, txtTaskId, DependencyCount) {
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

var g_TaskDependency=[];
//Bind Task Dependency for Inbox
function taskDependency(TaskId) {
    var CurrentDate = new Date();
    CurrentDate = CurrentDate.setHours(0, 0, 0, 0);
    CurrentDate = new Date(CurrentDate);
    var Query = "?$top=5000&$select=*,ID,Title,Details,Status,AssignedTo/Title,AssignedTo/EMail,Author/Title,Author/EMail,AssignedTo/ID,TaskId/ID,TaskId/Title,AttachmentFiles&$Expand=Author,AttachmentFiles,AssignedTo,TaskId&$filter=TaskId eq'" + TaskId + "'";
    $.when(getItemsWithQuery('TaskDependencies', Query)).done(function (TaskDependency) {
        $('#taskDependencyTaskInbox').html('')
        $("#ActionInbox").modal("show");
        var tr = '';
        var StartDateHTML = '';
        var MandatoryHTML = '';
        var DueDateHTML = '';
        var Visibility = '';
        var IsFillVisible = '';
        var IsStatusDisable = '';
        var items = TaskDependency;
        g_TaskDependency=[];
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                tr = '';
                var Title = items[i].Title;
                $("#taskTitleForLnbox").text(Title);
                var Detail = items[i].Details;
                var status = items[i].Status;
                var itemId = items[i].ID;
                var taskTitle = items[i].TaskId.Title;
                var TaskAssignTo = items[i].AssignedTo;
                var allAssignUser = '';
                var userId = [];
                                
                if (items[i].Status == 'Inactive') {
                    if(items[i].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase() || arrTaskTemp[0].AssignedBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                        Visibility = 'inline-block';
                    }
                    else{
                        Visibility = 'none';
                    }
                }
                else {
                    Visibility = 'none';
                }
                tr += '<tr><td><div class="detailnow ellipsis-2">' + Title + '</div>';
                if (items[i].AttachmentFiles.results.length > 0) {
                    for (var attach = 0; attach < items[i].AttachmentFiles.results.length; attach++) {
                        tr += '<span class="minattachmentbox"><a style="color: black;" class="DependencyAttach" href="' + items[i].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>' + items[i].AttachmentFiles.results[attach].FileName + '</a></span>';
                    }
                }
                tr += '</td><td>';
                if (TaskAssignTo.results != null) {
                    IsFillVisible = 'none';
                    if (TaskAssignTo.results.length == 1) {
                        if(TaskAssignTo.results[0].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase() || items[i].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()){
                            IsStatusDisable = "";
                        }
                        else {
                            IsStatusDisable = "disabled";
                        }
                        if(TaskAssignTo.results[0].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()){
                            IsFillVisible = 'inline-block';
                        }
                        g_TaskDependency.push({
			                  userId:TaskAssignTo.results[0].ID,
			                  email:TaskAssignTo.results[0].EMail
			            });
                        var UserAttachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[0].EMail);
                        tr += '<div class="flexitem"><img src="' + UserAttachment + '" class="notificationimg" alt=""><div class="imagecontent">';
                        tr += '<h4>' + TaskAssignTo.results[0].Title + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + TaskAssignTo.results[0].EMail + '\')">' + TaskAssignTo.results[0].EMail + '</a></div>';
                    }
                    else {
                        IsStatusDisable = "disabled";
                    	
                        for (var j = 0; j < TaskAssignTo.results.length; j++) {
                            if(TaskAssignTo.results[j].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase() || items[i].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()){
                                IsStatusDisable = "";
                            }
                            if(TaskAssignTo.results[j].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()){
                                IsFillVisible = 'inline-block';
                            }
                            g_TaskDependency.push({
			                  userId:TaskAssignTo.results[j].ID,
			                  email:TaskAssignTo.results[j].EMail
			                });
                            var UserAttachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[j].EMail);
                            tr += '<div class="flexitem" style="float:left;"><img src="' + UserAttachment + '" title="' + TaskAssignTo.results[j].Title + '" class="notificationimg" alt=""></div>';
                        }
                    }
                }
                if (items[i].StartDate != null) {
                    StartDateHTML = '<span class="datenow">Date:&nbsp</span><span>' + titanForWork.ShowCommonStandardDateFormat(new Date(items[i].StartDate)) + '</span>';
                }
                else {
                    StartDateHTML = '';
                }
                if(items[i].Status == 'Active'){//Completed
                    if (items[i].CompletionDate != null) {
                        DueDateHTML = '<span class="datenow">Completed:&nbsp</span><span>' + titanForWork.ShowCommonStandardDateFormat(new Date(items[i].CompletionDate)) + '</span>';
                    }
                    else {
                        DueDateHTML = '';
                    }
                } 
                else{
                    if (items[i].EndDate != null) {
                        var classTitle = '';
                        var EndDate = new Date(items[i].EndDate);
                        EndDate.setDate(EndDate.getDate());
                        EndDate = new Date(EndDate);
                        if(CurrentDate > EndDate){
                            classTitle = 'redcolorshow';
                        }

                        DueDateHTML = '<span class="datenow '+classTitle+'">Due:&nbsp</span><span class="'+classTitle+'">' + titanForWork.ShowCommonStandardDateFormat(new Date(items[i].EndDate)) + '</span>';
                    }
                    else {
                        DueDateHTML = '';
                    }
                }
                
                if(items[i].MandatoryCompletion != null && items[i].MandatoryCompletion != false){
                    MandatoryHTML = '<span class="MandatoryToComplete"><i class="fa fa-exclamation-circle" style="font-size: 23px;color: maroon;"></i></span>';
                }
                else {
                    MandatoryHTML = '';
                }
                
                var CompletionPercent = items[i].Completion ? items[i].Completion : '0';
                tr += '</div></td><td><div class="assignbybox"><h4>' + items[i].Author.Title + '</h4>';
                tr += StartDateHTML + '</div></td><td><div class="statussetion">';
                tr += DueDateHTML + MandatoryHTML + ' </div><select class="form-control mangewidth" id="ddlDepStatus' + i + '" onchange="UpdateDepdncyStatus(' + i + ', \'' + itemId + '\', '+TaskId+')" '+IsStatusDisable+'>';
                tr += '<option value="Inactive">Open</option><option value="Active">Completed</option><option value="Canceled">Canceled</option><option value="Hold">Hold</option></select>';
                tr += '<div class="flexrange" onmouseover="SlideCompPercent(' + i + ')">';
                tr += '<input type="range" min="0" max="100" value="' + CompletionPercent + '" class="slider" id="progressetion' + i + '" onchange="UpdateCompletionPercent(' + i + ', \'' + itemId + '\', '+TaskId+')" '+IsStatusDisable+'>';
                tr += '<h2 class="m-0 md-8"><span id="barvalue' + i + '" class="slider-txt-green">' + CompletionPercent + '%</span></h2></div></td><td>';
                tr += '<div class="actiondefine"><button type="button" style="display:'+IsFillVisible +'" class="btn btn-danger custom-btn-two custom-btn-two-danger mt-16" onclick="timeSheetEntry('+TaskId+')">Fill';
                tr += '</button><button type="button" style="display:'+Visibility+'" class="editcircle" onclick="EditDependency(\'' + itemId + '\', '+TaskId+');"><i class="fa fa-pencil"></i></button></div></td></tr>';

                $('#taskDependencyTaskInbox').append(tr);
                $("#ddlDepStatus" + i).val(items[i].Status);
            }
        }
    });
}

//Edit dependency details
function EditDependency(DependencyId, TaskId){
    $("#btnAddDependncy").text('Update');
    $("#SelectedDepId").text(DependencyId);
    $("#DueDateHTML").show();
    $("#StartDateHTML").show();
    var Query = "?$top=5000&$select=*,ID,Title,Details,Status,AssignedTo/Title,AssignedTo/EMail,Author/Title,AssignedTo/ID,TaskId/ID,TaskId/Title,AttachmentFiles&$Expand=Author,AttachmentFiles,AssignedTo,TaskId&$filter=ID eq'" + DependencyId + "'";
    $.when(getItemsWithQuery('TaskDependencies', Query)).done(function (TaskDependency) {
        var items = TaskDependency;
        if (items.length > 0) {
            $("#txtTitle").val(items[0].Title);
            if (items[0].AssignedTo.results != null) {
                for (var j = 0; j < items[0].AssignedTo.results.length; j++) {
                    SetAndResolvePeoplePicker('AssaginToDependency', items[0].AssignedTo.results[j].EMail, false);
                }
            }
            
            $("#txtDetails").val(items[0].Details);
            if(items[0].StartDate != null){
                if(new Date(items[0].StartDate) == new Date(arrTaskTemp[0].StartDate)){
                    $("#StartDateAsTask").prop("checked", "checked");
                    $(".StartDependecyDate").val('');
                    $(".StartDependecyDate").prop("disabled", "disabled");
                }
                else {
                    $(".StartDependecyDate").prop("disabled", "");
                    $(".StartDependecyDate").val(moment(new Date(items[0].StartDate)).format("DD/MM/YYYY"));
                    $("#StartDateAsTask").prop("checked", "");
                }
            }
            else {
                $(".StartDependecyDate").prop("disabled", "");
                $("#StartDateAsTask").prop("checked", "");
            }
            if(items[0].EndDate != null){
                if(new Date(items[0].EndDate) == new Date(arrTaskTemp[0].DueDate)){
                    $("#DueDateAsTask").prop("checked", "checked");
                    $(".DueDependecyDate").val('');
                    $(".DueDependecyDate").prop("disabled", "disabled");
                }
                else {
                    $(".DueDependecyDate").prop("disabled", "");
                    $(".DueDependecyDate").val(moment(new Date(items[0].EndDate)).format("DD/MM/YYYY"));
                    $("#DueDateAsTask").prop("checked", "");
                }
            }
            else{
                $(".DueDependecyDate").prop("disabled", "");
                $("#DueDateAsTask").prop("checked", "");
            }
            if(items[0].MandatoryCompletion == true){
                $("#chkIsMandatory").prop("checked", "checked");
            }
            else{
                $("#chkIsMandatory").prop("checked", "");
            }
            //Bind attachments
            if (items[0].AttachmentFiles.results.length > 0) {
                var savedAttach = '';
                for (var attach = 0; attach < items[0].AttachmentFiles.results.length; attach++) {
                    savedAttach += '<span class="minattachmentbox" id="UploadedFile'+attach+'"><a style="color: black;" class="DependencyAttach" href="' + items[0].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>' + items[0].AttachmentFiles.results[attach].FileName + '</a>';
                    savedAttach += '<span class="fa fa-close fa-lg" style="color:red;" onclick="DeleteAttachment('+items[0].Id+', \'' + items[0].AttachmentFiles.results[attach].FileName + '\', '+attach+', '+TaskId+');" title="Delete"></span></span>';
                }
                $('#DepFileName').empty().append(savedAttach);
            }
            $("#dependenciesmodl").modal('show');
        }
    });
}

//Delete the Dependecy attachment
function DeleteAttachment(ItemId, fileName, HTMLCount, TaskId) {
    if(confirm("Are you sure, you want to delete this attachment?")){
        var Dfd = $.Deferred();
        var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('TaskDependencies')/GetItemById(" + ItemId + ")/AttachmentFiles/getByFileName('" + fileName + "')  ";
        $.ajax({
            url: Url,
            type: 'DELETE',
            contentType: 'application/json;odata=verbose',
            headers: {
                'X-RequestDigest': $('#__REQUESTDIGEST').val(),
                'X-HTTP-Method': 'DELETE',
                'Accept': 'application/json;odata=verbose'
            },
            success: function (data) {
                Dfd.resolve(data);
                $('#UploadedFile'+HTMLCount).remove();
                taskDependency(TaskId);
            },
            error: function (error) {
                Dfd.reject(JSON.stringify(error));
                console.log(error);
            }
        });
    }
}

//update completeion percent
function UpdateDepdncyStatus(IdCOunt, DependencyId, TaskId) {
    var ItemType = GetItemTypeForListName('TaskDependencies');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Status: $("#ddlDepStatus" + IdCOunt).val(),
        Completion: 100,
        CompletionDate: new Date().toISOString()
    };
    if ($("#ddlDepStatus" + IdCOunt).val() != "Active") {
        delete Metadata["CompletionDate"];
        delete Metadata["Completion"];
    }
    if($("#ddlDepStatus" + IdCOunt).val() == "Hold" || $("#ddlDepStatus" + IdCOunt).val() == "Canceled") {
        Metadata["MandatoryCompletion"] = false;
    } 
    UpdateTaskList('TaskDependencies', Metadata, DependencyId);
    taskDependency(TaskId);
}
//update completeion percent
function UpdateCompletionPercent(IdCOunt, DependencyId, TaskId) {
    var ItemType = GetItemTypeForListName('TaskDependencies');
    var CompletionDate = new Date().toISOString();
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        CompletionDate: CompletionDate,
        Completion: parseInt($("#barvalue" + IdCOunt).text()),
        Status: "Active"
    };
    if (parseInt($("#barvalue" + IdCOunt).text()) != 100) {
        Metadata["CompletionDate"] = null;
        Metadata["Status"] = "Inactive";
    }
    else {
        //$("#ddlDepStatus" + IdCOunt).val('Active');
    }
    UpdateTaskList('TaskDependencies', Metadata, DependencyId);
    taskDependency(TaskId);
}

//SLider Moouse-Hover
function SlideCompPercent(IdCOunt) {
    var slider = document.getElementById("progressetion" + IdCOunt);
    var output = document.getElementById("barvalue" + IdCOunt);
    output.innerHTML = slider.value + '%';
    slider.oninput = function () {
        output.innerHTML = this.value + '%';
    }
}

//get Assigned to of all selected task to send mail
function SendNotify() {
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
    arrTemp  = arrTaskTemp.filter(function(f){return f;});
    for(var i=0;i<arrTemp[0].TaskAssignTo.results.length;i++) {
        arrAllAssignTo.push(arrTemp[0].TaskAssignTo.results[i].EMail);
        arrAllAssignToName.push(arrTemp[0].TaskAssignTo.results[i].Title);
    }
    if(arrTemp[0].DependencyTo.results != null) {
        for(var j=0;j<arrTemp[0].DependencyTo.results.length;j++) {
            arrDependency.push(arrTemp[0].DependencyTo.results[j].EMail);
            arrDependencyName.push(arrTemp[0].DependencyTo.results[j].Title);
        }
    }
    if (arrTemp[0].AssignedBy != null && arrTemp[0].AssignedBy != null) {
        arrAssignedBy.push(arrTemp[0].AssignedBy.EMail);
    }
        
    if($('.hideSelective:checked').val() == "All") {
        arrSendUser = arrAllAssignTo.concat(arrDependency);
        arrSendUser = arrSendUser.concat(arrAssignedBy);
    }
    else if($('.hideSelective:checked').val() == "All Assignee") {
        arrSendUser = arrAllAssignTo.filter(function(f){return f;});
    }
    else if($('.hideSelective:checked').val() == "All Dependency") {
        arrSendUser = arrDependency.filter(function(f){return f;});
    }
    else {
        arrSendUser = getUserInformationEmail("SendNotiPicker");
    }
    if(arrTemp[0].TaskType == "1") {
        TaskType = "Project Task";
    }
    else {
        TaskType = "General Task";
    }
    if(arrSendUser.length > 0) 
    {
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
                alert("Notification has been sent.");
                $("#Notificationlist").modal("hide");
                $("#txtTaskNotify").val('');
                $("#chkAllUser").prop("checked", "checked");
                $("#SendNotiPicker").hide();
                clearPeoplePickerControl("SendNotiPicker");
            },
            error: function (err) {
                console.log("SendEmailSharedNotification  " + JSON.stringify(err));
            }
        });
    }
    else {
        alert("Kindly select any user to send mail.");
        return false;
    }
}

//get User-Emails of people picker
function getUserInformationEmail(PeoplepickerId) {
    var userIds = [];
    var assignBy = [];
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
}
