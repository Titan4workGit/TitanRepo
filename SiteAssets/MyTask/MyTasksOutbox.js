var FilterLocalOutStorage = [];
var IsOutboxProjectBind = false;
var arrOutFilterDataBind = [];
var IsOutboxClientBind = false;
var arrAllTaskOutbox = [];
var arrLimitTaskOutbox = [];
var Location = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
var arrTaskIds = [];
var multipleEmailAddress = [];
var AllAddedAssignee = [];

$(document).ready(function () {
    initializePeoplePicker("pplassigntoOutbox");
    initializePeoplePicker("AddAssigneePicker");
    onChangeAssignee();
    //to check if page is refreshed or redirected.
    $("#txtFilterStatusOutbox").val('Open');
    if (performance.navigation.type == 1 || titanForWork.getQueryStringParameter("LocalStorage") == "Off") {
        localStorage.removeItem("FilterLocalOutStorage");
    } else {
        //console.info( "This page is not reloaded");
    }

    //if data saved in localstorage at page redirection then don't run this function
    if (localStorage.getItem("FilterLocalOutStorage") == null || localStorage.getItem("FilterLocalOutStorage") == "") {
        GetTasksOutboxTasks("Open", "PageLoad");
    }
    else {
        //run code only to get data in array
        GetOutboxLocaldata("Open", "PageLoad");
    }
    //Besides run this
    ShowOutBoxLocalData();

    $('#ProjectModuleTaskOutBox').attr('disabled', true);
    $("#btnOutSelectCustomer").click(function () {
        setCustomerOutBoxValue();
    });
    $("#selectAllOut").click(function (e) {
        waitingDialog.show();
        if (this.checked == true) {
            $('.taskchk').prop("checked", "");
            $('.taskchk').trigger('click');
        }
        else {
            $('.taskchk').prop("checked", "");
            arrTaskIds = [];
        }
        waitingDialog.hide();
    });
    $('.taskchk').change(function () {
        if (this.checked == false) {
            $('#selectAllOut').prop("checked", "")
        }
    });

    $("#TaskExportOutbox").click(function () {
        var dlgTitle = 'Generating excelsheet...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        setTimeout(function () {
            generateTaskOutExcel();
        }, 100);
    });

    $('#taskoutboxFilterModal').click(function () {
        $("#Outbox").modal("show");
        if ($('#WorkTypeOfProjectOutbox option').length == 0) {
            bindAllWorkType();
        }
        $("#taskOut").datepicker();
        $('#taskOut').datepicker("option", "dateFormat", "MM dd, yy");
    });
    $("#SeeMoreOutbox").click(function () {
        var lastPage = $("#pageDropDownOutbox").val();
        GetTasksOutboxTasks("Open", "");
        $("#pageDropDownOutbox").val(lastPage);
        $("#pageDropDownOutbox").trigger("change");
    });
    $("#liChangeStatus").click(function () {
        if (arrTaskIds.length == 0) {
            alert("Kindly select any task first.");
            return false;
        }
        else {
            $("#changestatus").modal('show');
        }
    });
    $("#LiChangeDue").click(function () {
        if (arrTaskIds.length == 0) {
            alert("Kindly select any task first.");
            return false;
        }
        else {
            $("#changeduedate").modal('show');
        }
    })
    $("#SeeMoreFilterOutbox").click(function () {
        var lastPage = $("#pageDropDownOutbox").val();
        var arrDataBind = [];
        arrDataBind = arrOutFilterDataBind.slice(parseInt($("#DiplayOutboxCount").text()), (parseInt($("#DiplayOutboxCount").text()) + 500)); //get 500 elements at first call
        BindOutboxTasks(arrDataBind);
        if (arrOutFilterDataBind.length <= (parseInt($("#DiplayOutboxCount").text()) + 500)) {
            $("#ShowTotalItemsOutbox").show();
            $("#ShowItemsOutbox").hide();
            $("#TotalItemscountfortaskOutBox").text(arrFilterDataBind.length);
            $("#SeeMoreFilterOutbox").hide();
        }
        else {
            var currentDisplayCOunt = parseInt($("#DiplayOutboxCount").text()) + 500;
            $("#ShowTotalItemsOutbox").hide();
            $("#ShowItemsOutbox").show();
            $("#DiplayOutboxCount").text(currentDisplayCOunt.toString());
            $("#TotalItemscountfortaskOutBox").text(arrFilterDataBind.length);
            $("#SeeMoreFilterOutbox").show();
        }
        $("#pageDropDownOutbox").val(lastPage);
        $("#pageDropDownOutbox").trigger("change");
    });
    $("#addNewTaskoutbox").click(function () {
        localStorage.setItem("FilterLocalOutStorage", FilterLocalOutStorage.toString());
        localStorage.setItem("FilterLocalStorage", FilterLocalStorage.toString());
        var newTaskURL = _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&source=" + $('ul#myTabs').find('li.active').attr('id');
        location.href = newTaskURL;
    });
    //Pending count click
    $("#TaskPendingOutbox").click(function () {
        SetOutTaskPending();
    });
    //Overdue count click
    $("#TaskOverdueOutbox").click(function () {
        SetOutTaskOverdue();
    });

    $("#searchOutProject").click(function () {
        if (IsOutboxProjectBind == false) {
            var dlgTitle = 'Loading projects...';
            var dlgMsg = '<br />Please wait!!';
            var dlgHeight = 200;
            var dlgWidth = 400;
            SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
            });
            setTimeout(function () {
                ReadOutDepartment();
                loadprojectOutsearch();
            }, 100);
        }
        $("#ProjectOutboxSearch").modal('show')
    });
    $("#FilterOutProject").click(function () {
        var dlgTitle = 'Filtering projects...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
            currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        });
        setTimeout(function () {
            loadprojectOutsearch();
        }, 100);
    });
    $("#btnOutProject").click(function () {
        setOutboxProjectValue();
    });

    $("#UserAllProjectTaskOutBox").change(function () {
        $('#ddlOutboxClient').empty().append("<option value='All'>All</option>");
        $('#ddlOutboxProject').empty().append("<option value='All'>All</option>");
        if (this.value == "General Task") {
            $(".ClientOutDiv").show();
            $(".projectOutDiv").hide();
        }
        else if (this.value == "Projects") {
            $(".ClientOutDiv").hide();
            $(".projectOutDiv").show();
        }
        else { //"All" select
            $(".projectOutDiv").hide();
            $(".ClientOutDiv").hide();
        }
    });
    $("#searchOutClient").click(function () {
        if (IsOutboxClientBind == false) {
            var dlgTitle = 'Loading clients...';
            var dlgMsg = '<br />Please wait!!';
            var dlgHeight = 200;
            var dlgWidth = 400;
            SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
            });
            setTimeout(function () {
                $("#btnSelectCustomer").hide();
                $("#btnOutSelectCustomer").show();
                getClientMaster('mainDivAreaClientmaster');
            }, 100);
        }
        else {
            $("#otherCustomerSearch").modal("show");
        }
    });
    $(".SortOutClass").click(function () {
        $('#tableTempTaskOutBox').tablesort();
        SortOutTable(this.textContent);
    });
    $(".SortOutProject").click(function () {
        $('#TableOutProjects').tablesort();
        SortProjectOutTable(this.textContent);
    });
    $(".btnDeleteTask").click(function () {
        if (arrTaskIds.length > 0) {
            var arrLength = arrTaskIds.length;
            if (confirm("Are you sure, to delete the selected task(s)?\nNote: Those task(s) which are already started will not be deleted.") == true) {
                var dlgTitle = 'Deleting task(s)...';
                var dlgMsg = '<br />Please wait!!';
                var dlgHeight = 200;
                var dlgWidth = 400;
                SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
                });
                setTimeout(function () {
                    arrTaskIds.forEach(function (value, i) {
                        if (ReviewTimeSheet(value) == false && DeleteTaskValidation(value) == true) {
                            UpdateTaskStatus(i, value);
                        }
                        if (i == (arrLength - 1)) {
                            arrTaskIds = [];
                            alert("Delete operation has been excuted.");
                            $("#mainDivAreaTaskOutBox").empty();
                            if (arrOutFilterDataBind.length > 0) {
                                BindOutboxTasks(arrOutFilterDataBind);
                            }
                            else {
                                BindOutboxTasks(arrLimitTaskOutbox);
                            }
                            currentDlg.close();
                        }
                    });
                }, 100);
            }
        }
        else {
            alert("Kindly select any task to delete.");
            return false;
        }
    });

    $("#btnChangeStatus").click(function () {
        UpdateOutboxData('ChangeStatus');
    });
    $('#DueDatePicker').datepicker();
    $('#DueDatePicker').datepicker("option", "dateFormat", "MM dd, yy")
    $("#btnChangeDueDate").click(function () {
        if ($('#DueDatePicker').val() != "") {
            UpdateOutboxData('ChangeDueDate');
        }
        else {
            alert("Kindly enter date first.");
            return false;
        }
    });
    $("#btnChangePriority").click(function () {
        UpdateOutboxData('ChangePriority');
    });
    $("#liAddAssignee").click(function () {
        if (arrTaskIds.length > 0) {
            OpenAssigneeModal();
            $("#addsssignee").modal('show');
        }
        else {
            alert("Kindly select any task first.");
            return false;
        }
    });
    $("#liChangePririoty").click(function () {
        if (arrTaskIds.length == 0) {
            alert("Kindly select any task first.");
            return false;
        }
        else {
            $("#changepriority").modal('show');
        }
    });
    $("#btnChangeAssignee").click(function () {
        UpdateOutboxData("AddAssignee");
    });
    $(".progressChart").click(function () {
        $('#progresschat').modal('show');
    });
    $("#btnShowRecurrence").click(function () {
        BindRecurrence();
    });
    $('.StartDateRecursive').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 1,
        onSelect: function (date) {
            var tempDate = GetDateStandardFormat(moment(date).format('DD/MM/YYYY'));
            var selectedDate = new Date(tempDate);
            var msecsInADay = 86400000;
            var endDate = new Date(selectedDate.getTime() + msecsInADay);

            //Set Minimum Date of EndDatePicker After Selected Date of StartDatePicker
            $(".EndDateRecursive").datepicker("option", "dateFormat", "MM dd, yy");
            $(".EndDateRecursive").datepicker("option", "minDate", endDate);
        }
        //dateFormat: "dd/mm/yy",
    });
    $('.StartDateRecursive').datepicker("option", "dateFormat", "MM dd, yy");
    $('.EndDateRecursive').datepicker();
    $("#everymonths").change(function () {
        var NumOfDays = daysInMonth($(this).val(), new Date().getFullYear());
        for (var day = 0; day < NumOfDays; day++) {
            $('.multidays').append('<option>' + [day + 1] + '</option>');
        }
    });
    $("#YearlyBox").click(function () {
        $("#everymonths").val('1');
        $("#everymonths").trigger('change');
    });
    $('#disabledate').click(function () {
        if ($(this).is(':checked')) {
            $('.EndDateRecursive').attr('disabled', true);
            $('.EndDateRecursive').val('');
        }
        else {
            $('.EndDateRecursive').attr('disabled', false);
        }
    });

});

// Month in JavaScript is 0-indexed (January is 0, February is 1, etc), 
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

//on change people picker
function onChangeAssignee() {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict['AddAssigneePicker_TopSpan'];
    var StringId = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        user = '';
        if (userInfo.length > 0) {
            tempUserId = parseInt(getAssigneeInformation("AddAssigneePicker"));
            $("#AssigneeDIV").show();
            var tempEmail = userInfo[0].Key.split('|')[2];
            if (tempEmail.includes('#') == true) {
                tempEmail = tempEmail.replace("#ext#@adaptindia.onmicrosoft.com", '');
                tempEmail = tempEmail.replace("_", '@');
            }
            multipleEmailAddress.push(tempEmail);
            //assignUserName.push(userInfo[0].DisplayText);
            AllAddedAssignee.push({
                email: tempEmail,
                userId: tempUserId
            });
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
            user += '<div class="col-sm-6 parentremove">';
            user += '<div class="employeesection"><span class="crosebox" onclick="removeUserBox(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');">';
            user += '<i class="fa fa-times"></i></span><div class="empoyeeimg"><img src="' + attachment + '" alt="">';
            user += '</div><div class="employeeinfo"><h3>' + userInfo[0].DisplayText + '</h3>';
            user += '<span class="employeeemail" style="cursor:pointer;" onclick="OpenEmail(this);">' + tempEmail + '</span></div></div></div>';
            $("#AddAssigneeArea").append(user);
            EmptyPeoplePicker('AddAssigneePicker');
        }
        else {
            //$("#userList").hide();
        }
    };
}

//get user information from people picker
function getAssigneeInformation(PeoplepickerId) {
    // Get the people picker object from the page. 
    var userIds = [];
    var uniqueValues = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if (!peoplePicker.IsEmpty()) {
        if (peoplePicker.HasInputError) return false; // if any error  
        else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users  
        else if (peoplePicker.TotalUserCount > 0) {
            // Get information about all users.  
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            var promise = '';
            var UsersID = '';
            for (var i = 0; i < users.length; i++) {
                // UsersID += GetUserID(users[i].Key);
                var accountName = users[i].Key;
                users[i].EntityData.Email; users[i].DisplayText;
                var userId = GetUserID(accountName);
                if (userId != -1) {
                    if (uniqueValues.indexOf(userId) == -1) {
                        uniqueValues.push(userId);
                        userIds.push(userId);
                    }
                }
            }
            return userIds;
        }
    } else {
        return UsersID;
    }
}


//empty the people picker
function EmptyPeoplePicker(peoplePickerId) {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
    var usersobject = peoplePicker.GetAllUserInfo();
    usersobject.forEach(function (index) {
        peoplePicker.DeleteProcessedUser(usersobject[index]);
    });
}

//open modal to add assignee
function OpenAssigneeModal() {
    var arrSignleTask = [];
    multipleEmailAddress = [];
    var AssigneeHTML = '';
    if (arrTaskIds.length == 1) {
        arrSignleTask = arrAllTaskOutbox.filter(function (data) {
            return data.Id == arrTaskIds[0];
        });
        if (arrSignleTask[0].TaskAssignTo.results != null) {
            for (var usr = 0; usr < arrSignleTask[0].TaskAssignTo.results.length; usr++) {
                multipleEmailAddress.push(arrSignleTask[0].TaskAssignTo.results[usr].EMail);
                AllAddedAssignee.push({
                    email: arrSignleTask[0].TaskAssignTo.results[usr].EMail,
                    userId: arrSignleTask[0].TaskAssignTo.results[usr].Id
                });
                //assignUserName.push(arrSignleTask[0].TaskAssignTo.results[usr].Title);
                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrSignleTask[0].TaskAssignTo.results[usr].EMail);
                AssigneeHTML += '<div class="col-sm-6 parentremove"><div class="employeesection"><span class="crosebox" onclick="removeUserBox(this, \'' + arrSignleTask[0].TaskAssignTo.results[usr].EMail + '\', \'' + arrSignleTask[0].TaskAssignTo.results[usr].Title + '\', ' + arrSignleTask[0].TaskAssignTo.results[usr].Id + ');">';
                AssigneeHTML += '<i class="fa fa-times"></i></span><div class="empoyeeimg"><img src="' + attachment + '" alt=""></div>';
                AssigneeHTML += '<div class="employeeinfo"><h3>' + arrSignleTask[0].TaskAssignTo.results[usr].Title + '</h3>';
                AssigneeHTML += '<a href="javascript.void(0);" onclick="OpenEmail(this);">' + arrSignleTask[0].TaskAssignTo.results[usr].EMail + '</a></div></div></div>';
            }
            $("#AddAssigneeArea").empty().append(AssigneeHTML);
            $("#AssigneeDIV").show();
        }
    }
    else {
        $("#AddAssigneeArea").empty();
    }
}

//remove user from Add assignee
function removeUserBox(Action, Email, DisplayName, EmpId, count) {
    $(Action).parents('.parentremove').remove();
    var arrTemp = [];
    var IndexId = count - 1;
    multipleEmailAddress = multipleEmailAddress.filter(function (obj) {
        return obj.toLowerCase() !== Email.toLowerCase();
    });
    AllAddedAssignee = AllAddedAssignee.filter(function (obj) {
        return obj.email.toLowerCase() !== Email.toLowerCase();
    });

    if (multipleEmailAddress.length == 0) {
        $("#AssigneeDIV").hide();
    }
}

// to check if user have filled timesheet in a project
function ReviewTimeSheet(txtTaskId) {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpTimeSheet')/items?$select=TaskID/Id,Employee/EMail&$expand=TaskID,Employee&$filter=TaskID/Id eq '" + txtTaskId + "' ",
        dfds = $.Deferred(),
        IsCheck = false;

    $.when(getAllItems(Ownurl, dfds)).done(function (TimesheetResults) {
        response = [];
        if (TimesheetResults.length > 0) {
            IsCheck = true;
        }
    });
    return IsCheck;
}

//validation before deleting task
function DeleteTaskValidation(ItemId) {
    var IsValidate = false;
    if (arrOutFilterDataBind.length > 0) {
        arrselectedTask = arrOutFilterDataBind.filter(function (data) {
            return data.Id == ItemId;
        });
    }
    else {
        arrselectedTask = arrLimitTaskOutbox.filter(function (data) {
            return data.Id == ItemId;
        });
    }
    if (arrselectedTask.length > 0) {
        if (arrselectedTask[0].DependencyCount != null) {
            var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaskDependencies')/items?$top=5000&$select=ID,Status,TaskId/Id&$Expand=TaskId&$filter=TaskId/Id eq'" + ItemId + "' and Status eq 'Active'",
            	dfds = $.Deferred();
            $.when(getAllItems(Ownurl, dfds)).done(function (Results) {
                response = [];
                if (Results.length == 0) {
                    IsValidate = true;
                }
            });
        }
        else {
            IsValidate = true;
        }
        if (parseInt(arrselectedTask[0].CompletionPersent) == 0) {
            IsValidate = true;
        }
        else {
            return IsValidate;
        }
        if (arrselectedTask[0].CurrentPhase != "Close" && arrselectedTask[0].CurrentPhase != "Completed") {
            IsValidate = true;
        }
        else {
            return false;
        }
    }
    return IsValidate;
}

//update task status for deletion
function UpdateTaskStatus(Index, txtTaskId) {
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
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/GetItemById('" + txtTaskId + "')",
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
            if (arrOutFilterDataBind.length > 0) {
                arrOutFilterDataBind = arrOutFilterDataBind.filter(function (data) {
                    return data.Id != txtTaskId;
                });
                arrLimitTaskOutbox = arrLimitTaskOutbox.filter(function (data) {
                    return data.Id != txtTaskId;
                });
                arrAllTaskOutbox = arrAllTaskOutbox.filter(function (data) {
                    return data.Id != txtTaskId;
                });
            }
            else {
                arrLimitTaskOutbox = arrLimitTaskOutbox.filter(function (data) {
                    return data.Id != txtTaskId;
                });
                arrAllTaskOutbox = arrAllTaskOutbox.filter(function (data) {
                    return data.Id != txtTaskId;
                });
            }
        },
        eror: function (data) {
            dfd.reject(error);
            currentDlg.close();
            console.log("An error occurred while deleting task. " + JSON.stringify(data));
        }
    });
    return dfd.promise();
}
//set name in People picker
function SetAndResolveOutPeoplePicker(controlNameID, LoginNameOrEmail, peoplePickerDisable) {
    var peoplePickerDiv = $("[id^='" + controlNameID + "']");
    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
    peoplePicker.AddUserKeys(LoginNameOrEmail);
    if (peoplePickerDisable == true) {
        $('#' + controlNameID + '_TopSpan_EditorInput').attr('disabled', true);
        $('.sp-peoplepicker-delImage').hide();
    }
}

function GetTasksOutboxTasks(TaskPhase, Action) {
    $("#SeeMoreFilterOutbox").hide();
    if (Action == "PageLoad") {
        arrOutFilterDataBind = [];
        $("#mainDivAreaTaskOutBox").empty();
        var dateFilter = new Date();
        dateFilter = dateFilter.setFullYear(dateFilter.getFullYear() - 1);
        dateFilter = new Date(dateFilter);
        requestUri = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,ClientID/ID,ClientID/Title,Module/Title,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/Title,TaskAssignTo/EMail,TaskAssignTo/Id,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,AssignedBy,ClientID,Module,AttachmentFiles,Author,TaskAssignTo,DependencyTo&$orderby=Modified desc&$Filter=(Author/EMail eq '" + _spPageContextInfo.userEmail + "' or AssignedBy/EMail eq '" + _spPageContextInfo.userEmail + "') and (CurrentPhase eq 'Open' or CurrentPhase eq 'Hold' or (CurrentPhase eq 'Completed' and Created ge datetime'" + dateFilter.toISOString() + "') or (CurrentPhase eq 'Cancelled' and Created ge datetime'" + dateFilter.toISOString() + "')or (CurrentPhase eq 'Close' and Created ge datetime'" + dateFilter.toISOString() + "')) ";
        $.when(getLimitedItems('EmployeeTaskDetails', requestUri)).done(function (TaskResults) {
            var TaskOutboxChip = '';
            TaskOutboxChip += "<div class='upload-chip'>" + TaskPhase + "</div>";
            $("#myTaskOutboxChip").empty();
            $("#myTaskOutboxChip").append(TaskOutboxChip);
            var items = TaskResults.results;
            arrAllTaskOutbox = items;
            arrDataBind = arrLimitTaskOutbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
                return obj.CurrentPhase == TaskPhase;
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
            BindOutboxTasks(arrDataBind);

            if (arrDataBind.length == 0) {
                $("#NoRecordFoundTaskOutBox").show();
                $("#SeeMoreOutbox").hide();
            }
            else {
                $("#NoRecordFoundTaskOutBox").hide();
            }
            GetTaskOutboxCount();
        }).fail(function (error) {
            if (error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1) {
                $("#ThresholdError").modal('show');
                $("#btnContinue").hide();
                $("#btnContinueOutBox").show();
                $("#btnLeave").click(function () {
                    location.href = _spPageContextInfo.webAbsoluteUrl;
                });
                $("#btnContinueOutBox").click(function () {
                    $("#ThresholdError").modal('hide');
                    var dlgTitle = 'Loading all data...';
                    var dlgMsg = '<br />Please wait!!';
                    var dlgHeight = 200;
                    var dlgWidth = 400;
                    SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                        currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
                    });
                    setTimeout(function () {
                        $("#parentbtnContinueOut").empty();
                        $("#parentbtnContinueOut").append('<button type="button" class="btn btn-primary" id="btnContinueOutBox">Continue</button>');
                        if (LoadAllDataInbox == true) {
                            $("#parentbtnContinue").empty();
                            $("#parentbtnContinue").append('<button type="button" class="btn btn-primary" id="btnContinue">Continue</button>');
                            GetAllInboxTasks("Open", _spPageContextInfo.userEmail, Action);
                        }
                        else if (LoadAllLocalData == true) {
                            $("#parentbtnContinue").empty();
                            $("#parentbtnContinue").append('<button type="button" class="btn btn-primary" id="btnContinue">Continue</button>');
                            GetAlldataLocal("Open", _spPageContextInfo.userEmail, Action);
                        }
                        GetAllOutboxTasks(TaskPhase, Action);
                    }, 100);
                });
            }
            else {
                HandleError(error);
            }
        });
    }
    else {
        arrDataBind = arrLimitTaskOutbox.slice(parseInt($("#DiplayTaskCount").text()), (parseInt($("#DiplayTaskCount").text()) + 500)); //get 500 elements at first call
        BindOutboxTasks(arrDataBind);

        if (arrLimitTaskOutbox.length <= (parseInt($("#DiplayTaskCount").text()) + 500)) {
            $("#ShowTotalItemsOutbox").show();
            $("#ShowItemsOutbox").hide();
            $("#TotalItemscountfortaskOutBox").text(arrLimitTaskOutbox.length);
            $("#SeeMoreOutbox").hide();
        }
        else {
            var currentDisplayCOunt = parseInt($("#DiplayTaskCount").text()) + 500;
            $("#ShowTotalItemsOutbox").hide();
            $("#ShowItemsOutbox").show();
            $("#DiplayOutboxCount").text(currentDisplayCOunt.toString());
            $("#TotaloutBoxCount").text(arrLimitTaskOutbox.length);
            $("#SeeMoreOutbox").show();
        }
    }
}

//get all recaords when the threshold limit is crossed then filter
function GetAllOutboxTasks(currentPhase, Action) {//
    var Query = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,ClientID/ID,ClientID/Title,Module/Title,Module/ID,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/Id,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,AssignedBy,ClientID,Module,Author,AttachmentFiles,TaskAssignTo,DependencyTo&$OrderBy=Modified desc",
        dfds = $.Deferred(),
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items" + Query;

    $.when(getAllItems(Ownurl, dfds)).done(function (TaskResults) {
        response = [];
        var TaskOutboxChip = '';
        TaskOutboxChip += "<div class='upload-chip'>" + currentPhase + "</div>";
        $("#myTaskOutboxChip").empty();
        $("#myTaskOutboxChip").append(TaskOutboxChip);
        var items = TaskResults;
        arrAllTaskOutbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase

            if (obj.AssignedBy.EMail.indexOf("#") != -1) {
                obj.AssignedBy.EMail = obj.AssignedBy.EMail.split("#")[0];
                obj.AssignedBy.EMail = obj.AssignedBy.EMail.replace("_", "@");
            }
            return (obj.AssignedBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase());
        });
        arrDataBind = arrLimitTaskOutbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
            if (obj.AssignedBy.EMail.indexOf("#") != -1) {
                obj.AssignedBy.EMail = obj.AssignedBy.EMail.split("#")[0];
                obj.AssignedBy.EMail = obj.AssignedBy.EMail.replace("_", "@");
            }
            return (obj.CurrentPhase == currentPhase && obj.AssignedBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase());
        });

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
        BindOutboxTasks(arrDataBind);
        if (arrDataBind.length == 0) {
            $("#NoRecordFoundTaskOutBox").show();
            $("#SeeMoreOutbox").hide();
        }
        else {
            $("#NoRecordFoundTaskOutBox").hide();
        }
        GetTaskOutboxCount();
        if (currentDlg != "") {
            currentDlg.close();
        }
    }).fail(function (error) {
        HandleError(error);
    });
}

//get data only for localstorage
function GetOutboxLocaldata(currentPhase, Action) {
    var restQuery;
    restQuery = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,ClientID/ID,ClientID/Title,Module/Title,Author/Title,Author/EMail,TaskAssignTo/Title,TaskAssignTo/Id,DependencyTo/EMail,DependencyTo/Title,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,AssignedBy,ClientID,Module,DependencyTo,AttachmentFiles,Author,TaskAssignTo&$orderby=Modified desc&$Filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $("#mainDivAreaTaskOutBox").empty();
    $.when(getLimitedItems('EmployeeTaskDetails', restQuery)).done(function (TaskResults) {
        var items = TaskResults.results;
        arrAllTaskOutbox = items;
        arrDataBind = arrLimitTaskOutbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
            return obj.CurrentPhase == currentPhase;
        });
        if (arrDataBind.length == 0) {
            $("#NoRecordFoundTaskOutBox").show();
            $("#SeeMoreOutbox").hide();
        }
        else {
            $("#NoRecordFoundTaskOutBox").hide();
        }
        GetTaskOutboxCount();
    }).fail(function (error) {
        if (error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1) {
            $("#ThresholdError").modal('show');
            $("#btnContinue").hide();
            $("#btnContinueOutBox").show();
            $("#btnContinueOutBox").click(function () {
                var dlgTitle = 'Loading all data...';
                var dlgMsg = '<br />Please wait!!';
                var dlgHeight = 200;
                var dlgWidth = 400;
                SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
                });
                setTimeout(function () {
                    $("#ThresholdError").modal('hide');
                    $("#parentbtnContinueOut").empty();
                    $("#parentbtnContinueOut").append('<button type="button" class="btn btn-primary" id="btnContinueOutBox">Continue</button>');
                    if (LoadAllDataInbox == true) {
                        $("#parentbtnContinue").empty();
                        $("#parentbtnContinue").append('<button type="button" class="btn btn-primary" id="btnContinue">Continue</button>');
                        GetAllInboxTasks("Open", _spPageContextInfo.userEmail, Action);
                    }
                    else if (LoadAllLocalData == true) {
                        $("#parentbtnContinue").empty();
                        $("#parentbtnContinue").append('<button type="button" class="btn btn-primary" id="btnContinue">Continue</button>');
                        GetAlldataLocal("Open", _spPageContextInfo.userEmail, Action);
                    }
                    GetAllOutdataLocal(currentPhase, _spPageContextInfo.userEmail, Action);
                }, 100);
            });
            return false;
        }
        else {
            HandleError(error);
        }
    });
}

//get data only for localstorage when data is more than 5000
function GetAllOutdataLocal(currentPhase, AssignTo, Action) {
    $("#mainDivAreaTaskOutBox").empty();
    var dfds = $.Deferred(),
        Query = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,ClientID/ID,ClientID/Title,Module/Title,Module/ID,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/Id,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,AssignedBy,ClientID,Module,Author,AttachmentFiles,TaskAssignTo,DependencyTo&$OrderBy=Modified desc",
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items" + Query;

    $.when(getAllItems(Ownurl, dfds)).done(function (TaskResults) {
        response = [];
        var items = TaskResults;
        arrAllTaskOutbox = items;
        arrAllTaskOutbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
            if (obj.AssignedBy.EMail.indexOf("#") != -1) {
                obj.AssignedBy.EMail = obj.AssignedBy.EMail.split("#")[0];
                obj.AssignedBy.EMail = obj.AssignedBy.EMail.replace("_", "@");
            }
            return (obj.AssignedBy.EMail.toLowerCase() == AssignTo.toLowerCase());
        });
        arrDataBind = arrLimitTaskOutbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
            if (obj.AssignedBy.EMail.indexOf("#") != -1) {
                obj.AssignedBy.EMail = obj.AssignedBy.EMail.split("#")[0];
                obj.AssignedBy.EMail = obj.AssignedBy.EMail.replace("_", "@");
            }
            return (obj.CurrentPhase == currentPhase && obj.AssignedBy.EMail.toLowerCase() == AssignTo.toLowerCase())
        });
        if (arrDataBind.length == 0) {
            $("#NoRecordFoundTaskOutBox").show();
            $("#SeeMoreOutbox").hide();
        }
        else {
            $("#NoRecordFoundTaskOutBox").hide();
        }
        ShowOutBoxLocalData();
        GetTaskOutboxCount();
        if (currentDlg != "") {
            currentDlg.close();
        }

    }).fail(function (error) {
        HandleError(error);
    });
}


//bind Outbox tasks as per given data
function BindOutboxTasks(items) {
    var tableOutboxHtml = "";
    if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            var CompletionDate = '';
            var StarRating = '';
            var Title = items[i].Title;
            var ItemID = items[i].ID;
            var taskType = items[i].TaskType;
            var TaskAssignFrom = items[i].AssignedBy.Title;
            var TaskPriority = items[i].TaskPriority;
            var itemid = items[i].ID;
            var DueDate = items[i].DueDate;
            var modifiedDate = new Date(DueDate);
            var ExcelAssignTo = '';
            var ExcelDependencies = '';
            modifiedDate = new Date(modifiedDate);
            var todayDate = new Date;
            var diffDaysServices = Math.round(todayDate.getTime() - modifiedDate.getTime()) / (todayDate);
            if (DueDate != null) {
                DueDate = new Date(DueDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
            }
            else {
                DueDate = '';
            }
            var TaskAssignTo = items[i].TaskAssignTo;
            var TaskAssignToUsers = '';

            var CompletionPersent = items[i].CompletionPersent;
            var CurrentPhase = items[i].CurrentPhase;
            if (CurrentPhase == "Completed" || CurrentPhase == "Close") {
                CompletionDate = new Date(items[i].CompletionDate);
                CompletionDate = titanForWork.ShowCommonStandardDateFormat(CompletionDate);//.toLocaleDateString();
            }
            else {
                CompletionDate = "";
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
                ClientModuleType = "";
            }
            if (taskType == "1") {
                if (ModuleTitle != "" && ModuleTitle != null) {
                    ClientModuleType = "<label class='m-0 b-400'>Module:</label><span class='ml-4 my-task-names'>" + ModuleTitle + "</span>";
                }
            }

            var TaskMethod = '';
            var ProjectFullName = items[i].ProjectFullName;
            var ProjectFullNameExcel = "";
            if (ProjectFullName == null) {
                TaskMethod = "General task";
                if (items[i].TaskCategory == "TeamChannel") {
                    ProjectFullName = "<b>Team Channel:</b> " + items[i].TeamItemName;
                    ProjectFullNameExcel = "Team Channel (" + items[i].TeamItemName + ")";
                }
                else if (items[i].TaskCategory == "TeamMeeting") {
                    ProjectFullName = "<b>Team Meeting:</b> " + items[i].TeamItemName;
                    ProjectFullNameExcel = "Team Meeting (" + items[i].TeamItemName + ")";
                }
                else {
                    ProjectFullName = "<b>Client:</b> " + ClientTitle;
                    ProjectFullNameExcel = "Client (" + ClientTitle + ")";
                }
            }
            else {
                TaskMethod = "Project task";
                ProjectFullNameExcel = "Project (" + ProjectFullName + ")";
                ProjectFullName = "<b>Project:</b> " + ProjectFullName;
            }

            var Worktype = items[i].Worktype;
            if (Worktype == null) {
                Worktype = '';
            }

            var DependencyCount = items[i].DependencyCount;
            if (DependencyCount == null || DependencyCount == 0) {
                DependencyCount = '';
            }

            var dependencyActionButton = '';
            var ExcelDependenciesName = "";
            if (DependencyCount > 0) {
                dependencyActionButton = "<button type='button' class='btn custom-btn custom-btn-two mt-16' onclick=taskDependency('" + ItemID + "');SelectArrayOutBox('" + ItemID + "');>Action</button>";
                ExcelDependencies = DependencyCount;
                for (depency = 0; depency < items[i].DependencyTo.results.length; depency++) {
                    ExcelDependenciesName += items[i].DependencyTo.results[depency].Title + ", ";
                }
                ExcelDependenciesName = ExcelDependenciesName.substring(0, ExcelDependenciesName.length - 2);
            }
            var taskStartDate = items[i].StartDate;
            var TaskAssignToButton = '';
            if (TaskAssignTo.results != undefined) {
                //var TaskAssignToUsers = TaskAssignTo.results[0].Title;
                for (assignto = 0; assignto < TaskAssignTo.results.length; assignto++) {
                    ExcelAssignTo += TaskAssignTo.results[assignto].Title + ", ";
                    if (TaskAssignTo.results.length == 1) {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[assignto].EMail);
                        TaskAssignToUsers += '<div class="employeesection"><div class="empoyeeimg"><img title="' + TaskAssignTo.results[assignto].Title + '" src="' + attachment + '" alt="" data-themekey="#">';
                        TaskAssignToUsers += '</div><div class="employeeinfo"><h3>' + TaskAssignTo.results[assignto].Title + '</h3></div></div>';
                    }
                    else {
                        if (assignto < 3) {
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[assignto].EMail);
                            TaskAssignToUsers += '<div class="empoyeeimg"><img title="' + TaskAssignTo.results[assignto].Title + '" src="' + attachment + '" alt="" data-themekey="#"></div>';
                        }
                    }
                }
                ExcelAssignTo = ExcelAssignTo.substring(0, ExcelAssignTo.length - 2);
                if (TaskAssignTo.results.length >= 4) {
                    TaskAssignToButton = "<button type='button' class='btn custom-btn custom-btn-two groupmultisec' onclick=taskAssignToUsersModalOutBox('" + ItemID + "')><i class='fa fa-angle-double-right' aria-hidden='true'></i></button>";
                }
            }
            var PriorityHTML = '';
            if (items[i].TaskPriority == "High" || items[i].TaskPriority == "Top") {
                PriorityHTML = '<i class="fa fa-exclamation-circle" style="font-size: 23px;color:red;"></i>&nbsp&nbsp';
            }

            var FlagHTML = '';
            if (items[i].SetFlag == "Red") {
                FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:red"></i>';
            }
            else if (items[i].SetFlag == "Blue") {
                FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:blue"></i>';
            }
            else if (items[i].SetFlag == "Green") {
                FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:green"></i>';
            }
            else if (items[i].SetFlag == "Yellow") {
                FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:#ffa500"></i>';
            }
            else {
                FlagHTML = '';
            }
            var LinkedTaskHTML = '';
            var MethodBox = "Outbox";
            if (items[i].SuccessorTask.Id != null && items[i].SuccessorTask.Id != 0) {
                LinkedTaskHTML = '<i class="fa fa-link" onclick="ShowSucPredTasks(' + ItemID + ', \'' + MethodBox + '\');" aria-hidden="true" style="font-size:23px;"></i>';
            }
            else if (items[i].PredecessorTask.Id != null && items[i].PredecessorTask.Id != 0) {
                LinkedTaskHTML = '<i class="fa fa-link" onclick="ShowSucPredTasks(' + ItemID + ', \'' + MethodBox + '\');" aria-hidden="true" style="font-size:23px;"></i>';
            }
            else {
                LinkedTaskHTML = '';
            }
            var TaskCatHTML = '';
            //var RecurranceHTML = '';
            //var TeamMeetingHTML = "";
            //var TeamChannelHTML = '';
            //var OutlookHTML = '';
            if (items[i].TaskCategory == "Recurrence") {
                TaskCatHTML = '<div class="TaskTypeClass" style="float:left;padding-right:10px;"><i class="fa fa-registered" aria-hidden="true" style="font-size:20px;"></i></div>'
            }
            else if (items[i].TaskCategory == "TeamMeeting") {
                TaskCatHTML = '<div class="TaskTypeClass" style="float:left;padding-right:10px;"><img class="dashboard-icon-info mr2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/business-meeting.png"></div>';
            }
            else if (items[i].TaskCategory == "TeamChannel") {
                TaskCatHTML = '<div class="TaskTypeClass" style="float:left;padding-right:10px;"><img class="dashboard-icon-info mr2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/team_icon.png"></div>';
            }
            else if (items[i].TaskCategory == "Outlook") {
                TaskCatHTML = '<div class="TaskTypeClass" style="float:left;padding-right:10px;"><i class="fa fa-envelope-o"></i></div>';
            }
            var StartDate = new Date(items[i].StartDate);
            StartDate = titanForWork.ShowCommonStandardDateFormat(StartDate);
            var ThreeDotMenu = '';
            ThreeDotMenu += '<div class="dropdown-container dropdown" tabindex="-1" onclick=SelectArrayOutBox("' + ItemID + '")><div class="three-dots dropdown-toggle" data-toggle="dropdown" aria-expanded="false"></div>';

            ThreeDotMenu += '<ul class="dropdown-menu dropdown-color-menu-icon"><li class="parentlist"><ul><li><a href="javascript:void(0);" data-toggle="modal" data-target="#changestatus">';
            ThreeDotMenu += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/check_icon_1.png" alt=""><span>Change Status</span></a></li>';
            ThreeDotMenu += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#changeduedate"><img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/planning.png" alt="">';
            ThreeDotMenu += '<span>Change Due Date</span></a></li><li class="AddAssigneModal"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsssignee">';
            ThreeDotMenu += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/assignee.png" alt=""><span>Add Assignee</span></a></li>';
            if(items[i].CurrentPhase=='Open')
            {
	            ThreeDotMenu += '<li class="AddDepedncy"><a href="javascript:void(0);" data-toggle="modal" data-target="#dependenciesmodl"><img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/dependency-icon.png" alt="">';
	            ThreeDotMenu += '<span>Add Dependency</span></a></li>';
            }
            ThreeDotMenu +='<li onclick="getOnChangeHistory('+ItemID+')"><a href=javascript:void(0);" data-toggle="modal" data-target="#change_History">';
            ThreeDotMenu +='<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/change_history.png" alt="" data-themekey="#"><span>Change History</span></a></li>';
            
            ThreeDotMenu += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#changepriority"><img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/priority.png" alt="">';
            ThreeDotMenu += '<span>Change Priority</span></a></li></ul></li><li class="parentlist"><ul><li class="ModalAddMessage"><a href="javascript:void(0);">';
            ThreeDotMenu += '<i class="fa fa-comments-o"></i><span>Add a Message</span></a></li><li><a href="javascript:void(0);" data-toggle="modal" data-target="#Notificationlist">';
            ThreeDotMenu += '<i class="fa fa-envelope-o"></i><span>Notify by Mail</span></a></li></ul></li><li class="parentlist"><ul><li><a href="javascript:void(0);" class="btnCopyTask"><i class="fa fa-files-o"></i>';
            ThreeDotMenu += '<span>Copy Task</span></a></li><li><a href="javascript:void(0);" class="btnDeleteTask"><i class="fa fa-trash-o" style="font-size:19.5px !important"></i>';
            ThreeDotMenu += '<span>Delete Task</span></a></li></ul></li><li class="parentlist"><ul><li><a href="javascript:void(0);" data-toggle="modal" data-target="#setreminder">';
            ThreeDotMenu += '<i class="fa fa-bell-o"></i><span>Set Reminder</span></a></li><li class="ParentAddFavorite"><a class="btnAddFavorite" href="javascript:void(0);"><img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/favorite_new-icon.png" alt="">';
            ThreeDotMenu += '<span>Add to Favorite</span></a></li></ul></li><li class="parentlist"><ul><li style="display:none;"><a href="javascript:void(0);">';
            ThreeDotMenu += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/team_icon.png" alt=""><span>Post in Team Channel</span></a></li>';
            ThreeDotMenu += '<li style="display:none;"><a href="javascript:void(0);"><img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/post_outlook.png" alt=""><span>Post to Outlook</span>';
            ThreeDotMenu += '</a></li></ul></li></ul>';

            ThreeDotMenu += '</div>';
            //If status is 'Hold' or 'Cancelled'
            var StatusColor = 'black';
            if (CurrentPhase == "Hold") {
                StatusColor = '#ff9933';
            }
            else if (CurrentPhase == "Cancelled") {
                StatusColor = '#db4035';
            }
            else if(CurrentPhase == "Open")
			{
				if(new Date(items[i].DueDate)< new Date())
                {
                   StatusColor='#ff0000'
                }
			}
            var Titleurl = "<div class='alignSection'><input type='checkbox' value='" + ItemID + "' class='taskchk'><a class='task-name-box' href='javascript:void(0);' onclick='redirectModifyOutTask(this);' name='" + _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(ItemID) + "&EditMode=" + window.btoa('True') + "'><b class='ellipsis-2'>" + Title + "</b></a>" + ThreeDotMenu + "</div>"
            if (diffDaysServices > 1 && CurrentPhase == "Open") {
                tableOutboxHtml += "<tr>" +
                "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
                "<span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p>" + TaskCatHTML + "</td>" +
                "<td style='display:none;'>" + Title + "<p class='m-0 mt-4 ellipsis-1'></td>" +
	            "<td style='display:none;'>" + ProjectFullNameExcel + "<p class='m-0 mt-4 ellipsis-1'></td>" +
                "<td class='text-center'>" +
                "<div class=''>" +
                "<p class='m-0 ellipsis-1'>" + Worktype + "</p>" +
                "<p class='m-0 ellipsis-1'>" + ClientModuleType + "</p></div><div class='TaskIcons'>" + PriorityHTML + FlagHTML + LinkedTaskHTML + "</div></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + Worktype + "</p></td>" +
                "<td class='text-center'>" +
                "<p class='m-0 ellipsis-2'><div class='GroupImage'>" + TaskAssignToUsers + "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div></div></p>" +
                "<div class='OutBoxStartDate'>Date: " + StartDate + "</div></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelAssignTo + "</p></td>" +
                "<td class='text-center'>" +
                "<p class='m-0 mb-10' style='color:" + StatusColor + "'>" + CurrentPhase + "</p>" +
                "<p class='m-0 font-12'><span style='font-weight: bold;color: red;'>Due:" + DueDate + "</span></p>" +
                "<div class='progress custom-progress progress-danger m-0 mt-4'><div class='progress-bar progress-bar-danger' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
                "<td class='text-center'>" +
                "<h4 class='m-0'>" + DependencyCount + "</h4>" + dependencyActionButton + "</td>" +
                "<td class='text-center vertical-align-middle'><div class='TaskCompletionDate'>" + CompletionDate + "</div><button type='button' class='btn custom-btn custom-btn-two mt-16 progressChart' onclick='ShowProgress(" + ItemID + ");'>Progress</button></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].Created + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].DueDate + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + DueDate + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + CurrentPhase + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].TaskPriority + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependencies + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependenciesName + "</p></td>" +
                "</tr>"
            }
            else {
                tableOutboxHtml += "<tr>" +
                "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
                "<span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p>" + TaskCatHTML + "</td>" +
                "<td style='display:none;'>" + Title + "<p class='m-0 mt-4 ellipsis-1'></td>" +
	            "<td style='display:none;'>" + ProjectFullNameExcel + "<p class='m-0 mt-4 ellipsis-1'></td>" +
                "<td class='text-center'>" +
                "<div class=''>" +
                "<p class='m-0 ellipsis-1'>" + Worktype + "</p>" +
                "<p class='m-0 ellipsis-1'>" + ClientModuleType + "</p></div><div class='TaskIcons'>" + PriorityHTML + FlagHTML + LinkedTaskHTML + "</div></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + Worktype + "</p></td>" +
                "<td class='text-center'>" +
                "<p class='m-0 ellipsis-2'><div class='GroupImage'>" + TaskAssignToUsers + "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div></div></p>" +
                "<div class='OutBoxStartDate'>Date: " + StartDate + "</div></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelAssignTo + "</p></td>" +
                "<td class='text-center'>" +
                "<p class='m-0 mb-10'>" + CurrentPhase + "</p>" +
                "<p class='m-0 font-12' style='color:" + StatusColor + "'>Due:<span>" + DueDate + "</span></p>" +
                "<div class='progress custom-progress progress-success m-0 mt-4'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
                "<td class='text-center'>" +
                "<h4 class='m-0'>" + DependencyCount + "</h4>" + dependencyActionButton + "</td>" +
                "<td class='text-center vertical-align-middle'><div class='TaskCompletionDate'>" + CompletionDate + "</div><button type='button' class='btn custom-btn custom-btn-two mt-16 progressChart' onclick='ShowProgress(" + ItemID + ");'>Progress</button></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].Created + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].DueDate + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + DueDate + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + CurrentPhase + "</p></td>"
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + items[i].TaskPriority + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependencies + "</p></td>" +
                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependenciesName + "</p></td>" +
                "</tr>";
            }
        }
        $("#mainDivAreaTaskOutBox").append(tableOutboxHtml);
        GenerateTableTaskOutBox();
        $(".taskchk").click(function () {
            if (this.checked == true) {
                if ($(".taskchk:checked").length == 1) {
                    arrTaskIds = [];
                }
                arrTaskIds.push(this.value);
            }
            else {
                var selected = this.value;
                arrTaskIds = arrTaskIds.filter(function (obj) {
                    return obj !== selected;
                });
            }
        });
        $(".progressChart").click(function () {
            $('#progresschat').modal('show');
        });
        $(".AddDepedncy").click(function () {
            if (arrTaskInIds.length == 0 && arrTaskIds.length == 0) {
                //alert("Kindly select any task first."); 
            }
            else {
                if (arrTaskInIds.length == 1) {
                    $("#DueDateHTML").show();
                    $("#StartDateHTML").show();
                }
                else {
                    if (arrTaskIds.length == 1) {
                        $("#DueDateHTML").show();
                        $("#StartDateHTML").show();
                    }
                    else {
                        $("#DueDateHTML").hide();
                        $("#StartDateHTML").hide();
                    }
                }
            }
        });
        $(".btnCopyTask").click(function () {
            if (arrTaskIds.length > 0) {
                if (arrTaskIds.length == 1) {
                    location.href = "../Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(arrTaskIds[0]) + "&source=" + $('ul#myTabs').find('li.active').attr('id') + "&Action=CopyTask";
                }
                else {
                    alert("Kindly select atmost one task to copy.");
                    return false;
                }
            }
            else {
                alert("Kindly select any one task to copy.");
                return false;
            }
        });
        $(".ModalAddMessageParent").empty().append('<a href="javascript:void(0);" class="ModalAddMessage"><i class="fa fa-comments-o"></i><span>Add a Message</span></a>');
        $(".ModalAddMessage").click(function () {
        	//to check if logged_In user is external or not; -9 == External User
			if(EmployeeDetails[0].ParentId != -9) {
	            if (arrTaskInIds.length == 0 && arrTaskIds.length == 0) {
	                alert("Kindly select any task first.");
	                return false;
	            }
	            else {
	                updateTaskMeatdata('Add Message');
	            }
            }
		    else {
		    	alert("You are not authorized to perform this operation.");
		            return false;
	    	}
        });
        $(".AddAssigneModal").click(function () {
            OpenAssigneeModal();
        });
        $(".ParentAddFavorite").empty().append('<a href="javascript:void(0);" class="btnAddFavorite"><img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/favorite_new-icon.png" alt=""><span>Add to Favorite</span></a>');
        $(".btnAddFavorite").click(function () {
            updateTaskMeatdata('AddFavorite');
        });
    }
    else {
        tableItemsHTML = "<tr><td colspan=7 style='text-align: center'>No record found!!</td></tr>";
        $("#mainDivAreaTaskOutBox").append(tableItemsHTML);
    }
}

//insert ItemId in array
function SelectArrayOutBox(Id) {
    arrTaskIds = [];
    $(".taskchk").prop("checked", '');
    $("#selectAllOut").prop("checked", '');
    arrTaskIds.push(Id);
}



function GenerateTableTaskOutBox() {
    sorterTaskOutBox = new TINY.table.sorter('sorterTaskOutBox', 'tableTempTaskOutBox', {
        // headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columnsOutBox',
        currentid: 'currentpageTaskOutBox',
        totalid: 'totalpagesTaskOutBox',
        startingrecid: 'startrecordTaskOutBox',
        endingrecid: 'endrecordTaskOutBox',
        totalrecid: 'totalrecordsTaskOutBox',
        // hoverid: 'selectedrowSharedWithMe',
        pageddid: 'pagedropdownOutBox',
        navid: 'tablenavTaskOutBox',
        //sortcolumn: 1,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

function CurrentProjectModuleForOutBox(projectidOutBox) {
    $('#ProjectModuleTaskOutBox').attr('disabled', false);
    $("#ProjectModuleTaskOutBox").empty();
    $('<option value="All">All</option>').appendTo("#ProjectModuleTaskOutBox");
    var listName = 'ProjectModules';
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,Title,Project/ID,Project/ProjectName&$expand=Project&$filter= ProjectId eq '" + projectidOutBox + "'";
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
            $("#ProjectModuleTaskOutBox").append(option);
        },
        error: function (data) {
            console.log(data.responseJSON.error);
        }
    });
}

function MutipleBaseFilterOnOutBox(TaskOutCome) {
    $("#SeeMoreOutbox").hide();
    arrTaskIds = [];
    $("#SeeMoreFilterOutbox").show();
    //var restquery = "";
    arrOutFilterDataBind = [];
    FilterLocalOutStorage = [];
    var TaskOutboxChip = "",
         FilterQuery = "",
        assigntoQuery = '',
        assigntobyme = [];

    if ($('#UserAllProjectTaskOutBox').val() != "All") {
        if ($('#UserAllProjectTaskOutBox').val() == "General Task") {
            TaskOutboxChip += "<div class='upload-chip'>General Task</div>";
        }
        else {
            if ($('#ddlOutboxProject').val() != "All") {
                TaskOutboxChip += "<div class='upload-chip'>" + $('#ddlOutboxProject option:selected').text() + "</div>";
            }
            else {
                TaskOutboxChip += "<div class='upload-chip'>" + $('#ddlOutboxProject option:selected').text() + "</div>";
            }
        }
    }
    FilterLocalOutStorage.push($('#UserAllProjectTaskOutBox').val() + '|' + $('#ddlOutboxProject').val() + '|' + $('#ddlOutboxProject option:selected').text());

    if ($('#ProjectModuleTaskOutBox').val() != "All") {
        TaskOutboxChip += "<div class='upload-chip'>" + $('#ProjectModuleTaskOutBox option:selected').text() + "</div>";
    }
    FilterLocalOutStorage.push($('#ProjectModuleTaskOutBox').val());

    if ($('#ddlOutboxClient').val() != "All") {
        TaskOutboxChip += "<div class='upload-chip'>" + $('#ddlOutboxClient option:selected').text() + "</div>";
    }
    FilterLocalOutStorage.push($('#ddlOutboxClient').val() + '|' + $('#ddlOutboxClient option:selected').text());

    if ($('#WorkTypeOfProjectOutbox').val() != "All") {
        TaskOutboxChip += "<div class='upload-chip'>" + $('#WorkTypeOfProjectOutbox option:selected').text() + "</div>";
    }
    FilterLocalOutStorage.push($('#WorkTypeOfProjectOutbox').val());

    if ($('#txtPriorityOutBox').val() != "All") {
        TaskOutboxChip += "<div class='upload-chip'>" + $('#txtPriorityOutBox option:selected').text() + "</div>";
    }
    FilterLocalOutStorage.push($('#txtPriorityOutBox').val());

    if ($('#txtFilterStatusOutbox').val() != "All") {
        TaskOutboxChip += "<div class='upload-chip'>" + $('#txtFilterStatusOutbox option:selected').text() + "</div>";
    }
    FilterLocalOutStorage.push($('#txtFilterStatusOutbox').val());

    if ($('#taskOut').val() != null && $('#taskOut').val() != "") {
        if (TaskOutCome == "TaskPending") {
            TaskOutboxChip += "<div class='upload-chip'>Pending</div>";
            FilterLocalOutStorage.push(moment($("#taskOut").val()).format("DD/MMM/YYYY") + '|' + TaskOutCome);
        }
        else if (TaskOutCome == "TaskOverdue") {
            TaskOutboxChip += "<div class='upload-chip'>Overdue</div>";
            FilterLocalOutStorage.push(moment($("#taskOut").val()).format("DD/MMM/YYYY") + '|' + TaskOutCome);
        }
        else {
            TaskOutboxChip += "<div class='upload-chip'>" + moment($("#taskOut").val()).format("DD/MMM/YYYY") + "</div>";
            FilterLocalOutStorage.push(moment($("#taskOut").val()).format("DD/MMM/YYYY") + '|' + TaskOutCome);
        }
    }

    if ($("#pplassigntoOutbox_TopSpan_ResolvedList").text() != "") {
        getUserInformation('pplassigntoOutbox');
        TaskOutboxChip += "<div class='upload-chip'>" + assignBy.join(', ') + "</div>";
        FilterLocalOutStorage.push(assignByEmail);
    }
    else {
        FilterLocalOutStorage.push([]);
        TaskOutboxChip += "<div class='upload-chip'>" + _spPageContextInfo.userDisplayName + "</div>";
        assignByEmail = "";
    }
    
         var StartDate = $('#fromDatetaskout').val();
         if(StartDate != "") {
             StartDate = moment(StartDate).format("MM/DD/YYYY");
             TaskOutboxChip += "<div class='upload-chip'>" + StartDate + "</div>";
         }
         var toDate = $('#toDatetaskout').val();
         if(toDate != "") {
             toDate = moment(toDate).format("MM/DD/YYYY");
             TaskOutboxChip += "<div class='upload-chip'>" + toDate + "</div>";
             
         }
         if(StartDate > toDate) {
             alert("Assigned Date From is greater than Assigned Date To");
             return false;
         }

    
    //Filter value display ends
    
    
     
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    arrOutFilterDataBind = arrAllTaskOutbox.filter(function (obj, index) { //Filter array
        FilterQuery = '';
        if ($('#UserAllProjectTaskOutBox').val() != "All") {
            if ($('#UserAllProjectTaskOutBox').val() == "General Task") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.ProjectFullName != "" : obj.ProjectFullName == ProjectValue);
            }
            else if ($('#UserAllProjectTaskOutBox').val() == "TeamMeeting") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.TaskCategory != "" : obj.TaskCategory == $('#UserAllProjectTaskOutBox').val());
            }
            else if ($('#UserAllProjectTaskOutBox').val() == "TeamChannel") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.TaskCategory != "" : obj.TaskCategory == $('#UserAllProjectTaskOutBox').val());
            }
            else {
                if ($('#ddlOutboxProject').val() != "All") {
                    var ProjectFilter = (ProjectValue == "All" ? obj.ProjectName != "" : obj.ProjectName == $('#ddlOutboxProject').val());
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

        if ($('#ProjectModuleTaskOutBox').val() != "All") {
            var ModuleValue = $('#ProjectModuleTaskOutBox').val();
        }
        else {
            var ModuleValue = "All";
        }

        if ($('#ddlOutboxClient').val() != "All") {
            var ClientValue = $('#ddlOutboxClient').val();
        }
        else {
            var ClientValue = "All";
        }

        if ($('#WorkTypeOfProjectOutbox').val() != "All") {
            var WorkTypeValue = $('#WorkTypeOfProjectOutbox').val()
        }
        else {
            var WorkTypeValue = "All"
        }

        if ($('#txtPriorityOutBox').val() != "All") {
            var PriorityValue = $('#txtPriorityOutBox').val();
        }
        else {
            var PriorityValue = "All";
        }

        if ($('#txtFilterStatusOutbox').val() != "All") {
            var CurrentPhaseValue = $('#txtFilterStatusOutbox').val();
        }
        else {
            var CurrentPhaseValue = "All";
        }

        if ($('#taskOut').val() != null && $('#taskOut').val() != "") {
            var DueDate = $("#taskOut").val();
            var dateDueDate = new Date($("#taskOut").val()).setHours(0, 0, 0, 0);//moment($("#taskOut").val()).format('MM/DD/YYYY');
            dateDueDate = new Date(dateDueDate);
            var arrDueDate = new Date(moment(obj.DueDate.split('T')[0]).format("MM/DD/YYYY"));//moment(obj.DueDate).format('MM/DD/YYYY');
            arrDueDate.setDate(arrDueDate.getDate() + 1);
            arrDueDate = new Date(arrDueDate);
            if (TaskOutCome == "") {
                var DueDateFilter = (dateDueDate == "" ? arrDueDate != "" : arrDueDate <= dateDueDate);
            }
            else if (TaskOutCome == "TaskOverdue") {
                var DueDateFilter = (dateDueDate == "" ? arrDueDate != "" : arrDueDate < dateDueDate);
            }
            else {
                var DueDateFilter = (dateDueDate == "" ? arrDueDate != "" : arrDueDate >= dateDueDate);
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
                (assigntoQuery)&&(StartDate == "" ? obj.StartDate != "" : moment(obj.StartDate).isAfter(moment(StartDate)) || moment(obj.StartDate).isSame(moment(StartDate))) && (toDate == "" ? obj.StartDate != "" : moment(obj.StartDate).isBefore(moment(toDate)) || moment(obj.StartDate).isSame(moment(toDate)))
    });

    var arrDataBind = [];
    //Cloning array
    arrDataBind = arrOutFilterDataBind.filter(function (f) { return f; })
    $("#myTaskOutboxChip").empty();
    $("#myTaskOutboxChip").append(TaskOutboxChip);
    if (arrDataBind.length >= 500) {
        $("#TotaloutBoxCount").text(arrDataBind.length);
        arrDataBind = arrDataBind.slice(0, 500); //get 500 elements at first call
        $("#ShowTotalItemsOutbox").hide();
        $("#ShowItemsOutbox").show();
        $("#DiplayOutboxCount").text("500");
        $("#SeeMoreFilterOutbox").show();
    }
    else {
        $("#ShowTotalItemsOutbox").show();
        $("#ShowItemsOutbox").hide();
        $("#TotalItemscountfortaskOutBox").text(arrDataBind.length);
        $("#SeeMoreFilterOutbox").hide();
    }
    $("#mainDivAreaTaskOutBox").empty();
    BindOutboxTasks(arrDataBind);
}

function redirectModifyOutTask(Action) {
    localStorage.setItem("FilterLocalOutStorage", FilterLocalOutStorage.toString());
    localStorage.setItem("FilterLocalStorage", FilterLocalStorage.toString());
    location.href = Action.name + "&source=" + $('ul#myTabs').find('li.active').attr('id');
}

function ClearFilterForOutbox() {
    $('#UserAllProjectTaskOutBox').val("All");
    $("#UserAllProjectTaskOutBox").trigger("change");
    $('#ProjectModuleTaskOutBox').val("All");
    $('#WorkTypeOfProjectOutbox').val("All");
    $('#ddlOutboxClient').empty().append("<option value='All'>All</option>");
    $('#ddlOutboxProject').empty().append("<option value='All'>All</option>");
    $('#txtPriorityOutBox').val("All");
    localStorage.removeItem("FilterLocalOutStorage");
    $('#taskOut').val('');
          $('#fromDatetaskout').val('');
          $('#toDatetaskout').val('');


    $('#txtFilterStatusOutbox').val("Open");
    clearPeoplePickerControl("pplassigntoOutbox");
    $("#myTaskOutboxChip").empty();
    var Phase = "Open";

    //Bind the page load data
    $("#mainDivAreaTaskOutBox").empty();
    $("#SeeMoreFilterOutbox").hide();
    var TaskOutboxChip = '';
    TaskOutboxChip += "<div class='upload-chip'>Open</div>";
    $("#myTaskOutboxChip").empty();
    $("#myTaskOutboxChip").append(TaskOutboxChip);
    var arrDataBind = [];
    arrOutFilterDataBind = [];
    //Cloning array
    arrDataBind = arrLimitTaskOutbox.filter(function (f) { return f; });
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
    BindOutboxTasks(arrDataBind);

    if (arrDataBind.length == 0) {
        $("#NoRecordFoundTaskOutBox").show();
        $("#SeeMoreOutbox").hide();
    }
    else {
        $("#NoRecordFoundTaskOutBox").hide();
    }
}

//to genrate excel of Task In table
function generateTaskOutExcel() {
    $('#tableTempTaskOutBox').tableExport({
        //type: 'excel',
        type: 'csv',
        exportHiddenCells: true,
        fileName: "Task-Out",
        ignoreColumn: [0, 3, 5, 7, 8, 10, 11, 14],
    });
    currentDlg.close();
}
function GetTaskOutboxCount() {
    ShowPieChartOutbox();
    for (var i = 0; i < arrLimitTaskOutbox.length; i++) {
        var myData = [];
        var items = arrLimitTaskOutbox;
        var InboxHtmlPending = '';
        var InboxHtmlOverDue = '';
        var pendingCounter = 0;
        var overdueCounter = 0;
        for (var i = 0; i < items.length; i++) {
            var DueDate = new Date(items[i].DueDate);
            var CurrentDate = new Date();
            CurrentDate.setHours(0, 0, 0, 0);
            if (CurrentDate > DueDate) {
                overdueCounter++;
            }
            else {
                pendingCounter++;
            }
        }
        InboxHtmlOverDue += overdueCounter;
        InboxHtmlPending += pendingCounter;
        $("#TaskOverdueOutbox").text(InboxHtmlOverDue);
        $("#TaskPendingOutbox").text(InboxHtmlPending);
    }
}

function ShowPieChartOutbox() {
    var dfds = $.Deferred(),
		arrComplatedTasks = [],
    	arrOpenTasks = [],
    	arrHoldTasks = [],
    	arrCancelTasks = [],
    	arrCloseTasks = [],
    	TaskAssigneeMail = "",
    	TaskDependencyMail = "";
    $("#pieOutbox").empty();
    if (arrAllTaskOutbox.length > 0) {
        arrComplatedTasks = arrAllTaskOutbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "completed"
        });
        arrOpenTasks = arrAllTaskOutbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "open"
        });
        arrHoldTasks = arrAllTaskOutbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "hold"
        });
        arrCancelTasks = arrAllTaskOutbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "cancelled"
        });
        arrCloseTasks = arrAllTaskOutbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "close"
        });
        if (arrComplatedTasks.length == 0 && arrOpenTasks.length == 0 && arrHoldTasks.length == 0 && arrCancelTasks.length == 0 && arrCloseTasks.length == 0) {
            $("#pieOutbox").hide();
        }
        var pie = new d3pie("pieOutbox", {
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
                    clickOutboxChart(evt);
                }
            }
        });
    }
}

//get data on 'Task Pending' click
function SetOutTaskPending() {
    if ($('#WorkTypeOfProjectOutbox option').length == 0) {
        bindAllWorkType();
    }
    //clear all the filters
    $('#UserAllProjectTaskOutBox').val("All");
    $("#UserAllProjectTaskOutBox").trigger("change");
    $('#ProjectModuleTaskOutBox').val("All");
    $('#WorkTypeOfProjectOutbox').val("All");
    $('#ddlOutboxClient').empty().append("<option value='All'>All</option>");
    $('#ddlOutboxProject').empty().append("<option value='All'>All</option>");
    $('#txtPriorityOutBox').val("All");
    localStorage.removeItem("FilterLocalOutStorage");
    $('#taskOut').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusOutbox').val("Open");
    clearPeoplePickerControl("pplassigntoOutbox");
    $("#myTaskOutboxChip").empty();

    $('#txtFilterStatusOutbox option').filter(function () {
        return ($(this).text() == "Open"); //To select Blue
    }).prop('selected', true)
    document.getElementById("taskOut").valueAsDate = new Date();
    MutipleBaseFilterOnOutBox("TaskPending");
}

//get data on 'Task Overdue' click
function SetOutTaskOverdue() {
    if ($('#WorkTypeOfProjectOutbox option').length == 0) {
        bindAllWorkType();
    }
    //clear all the filters
    $('#UserAllProjectTaskOutBox').val("All");
    $("#UserAllProjectTaskOutBox").trigger("change");
    $('#ProjectModuleTaskOutBox').val("All");
    $('#WorkTypeOfProjectOutbox').val("All");
    $('#ddlOutboxClient').empty().append("<option value='All'>All</option>");
    $('#ddlOutboxProject').empty().append("<option value='All'>All</option>");
    $('#txtPriorityOutBox').val("All");
    localStorage.removeItem("FilterLocalOutStorage");
    $('#taskOut').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusOutbox').val("Open");
    clearPeoplePickerControl("pplassigntoOutbox");
    $("#myTaskOutboxChip").empty();

    $('#txtFilterStatusOutbox option').filter(function () {
        return ($(this).text() == "Open"); //To select Blue
    }).prop('selected', true)
    document.getElementById("taskOut").valueAsDate = new Date();
    MutipleBaseFilterOnOutBox("TaskOverdue");
}

//filter data on status when data click and chat segment
function clickOutboxChart(Action) {
    if ($('#WorkTypeOfProjectOutbox option').length == 0) {
        bindAllWorkType();
    }
    //clear all the filters
    $('#UserAllProjectTaskOutBox').val("All");
    $("#UserAllProjectTaskOutBox").trigger("change");
    $('#ProjectModuleTaskOutBox').val("All");
    $('#WorkTypeOfProjectOutbox').val("All");
    $('#ddlOutboxClient').empty().append("<option value='All'>All</option>");
    $('#ddlOutboxProject').empty().append("<option value='All'>All</option>");
    $('#txtPriorityOutBox').val("All");
    localStorage.removeItem("FilterLocalOutStorage");
    $('#taskOut').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusOutbox').val("Open");
    clearPeoplePickerControl("pplassigntoOutbox");
    $("#myTaskOutboxChip").empty();

    $('#txtFilterStatusOutbox option').filter(function () {
        return ($(this).text() == Action.data.label); //To select Blue
    }).prop('selected', true)
    MutipleBaseFilterOnOutBox("");
}

//Read department for projects Outbox
function ReadOutDepartment() {
    var splittedDeptName = "";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?select=ID,Title&$top=5000&$orderby=Title asc";//&$filter=CompanyID eq '" + Logged_CompanyId + "'
    $.ajax({
        url: Ownurl,
        async: false,
        headers: { Accept: "application/json;odata=verbose" },
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                //$("#SelectedItems").text("All");  
                $('#DeptsOutboxProject').empty();
                $("#DeptsOutboxProject").append($("<option></option>").val("All").html("All"));
                for (i = 0; i < items.length; i++) {
                    if (parseInt(items[i].Title.length) > 34) {
                        splittedDeptName = items[i].Title.substring(0, 34) + "...";
                    }
                    else {
                        splittedDeptName = items[i].Title;
                    }
                    $("#DeptsOutboxProject").append('<option value="' + items[i].Title + '" title="' + items[i].Title + '">' + splittedDeptName + '</option>');
                }
                $("#DeptsOutboxProject").val("All");

            }
        },
        error: function (data) {
            if (currentDlg != "") {
                currentDlg.close();
            }
            console.log("An error occurred in ReadOutDepartment method." + data);
        }
    });
}


//get list of projects for Outbox
function loadprojectOutsearch() {
    var ProjectsListunique = '';
    var ProjectsList = [];
    var tableItemsHTML = '';
    var CountProject = 0;
    $(".ProjectOutTables").empty();
    var Projecturl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items?$select=*,TeamMember/EMail&$top=5000&$expand=TeamMember&$filter=TeamMember/EMail eq ('" + _spPageContextInfo.userEmail + "') and Status eq 'Active' and TaskPermission eq '1'&$orderby=Project asc";
    $.ajax({
        url: Projecturl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            for (var x = 0; x < items.length; x++) {
                ProjectsList.push(items[x].ProjectId);
            }
            ProjectsListunique = ProjectsList.filter(function (itm, i, ProjectsList) {
                return i == ProjectsList.indexOf(itm);
            });
        },
        error: function (data) {
            if (currentDlg != "") {
                currentDlg.close();
            }
            console.log(data);
        }
    });

    var UserProjectList = [];
    for (var K = 0; K < ProjectsListunique.length; K++) {
        var PROJID = ProjectsListunique[K];
        var sTatuS = $('select#StatusOutProj option:selected').val();
        var Department = $('select#DeptsOutboxProject option:selected').val();

        if (sTatuS != "All") {
            if (Department != "All") {
                var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title,ManagerName/EMail,ClientID/Title,Office_Location_Id/Title&$expand=ManagerName,ClientID,Office_Location_Id&$filter=Status eq ('" + sTatuS + "') and DepartmentName eq ('" + Department + "')and ID eq '" + PROJID + "' ";
            }
            else {
                var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title,ManagerName/EMail,ClientID/Title,Office_Location_Id/Title&$expand=ManagerName,ClientID,Office_Location_Id&$filter=Status eq ('" + sTatuS + "') and ID eq '" + PROJID + "' ";
            }
        }
        else {
            if (Department != "All") {
                var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title,ManagerName/EMail,ClientID/Title,Office_Location_Id/Title&$expand=ManagerName,ClientID,Office_Location_Id&$filter=DepartmentName eq ('" + Department + "')and ID eq '" + PROJID + "'";
            }
            else {
                var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title,ManagerName/EMail,ClientID/Title,Office_Location_Id/Title&$expand=ManagerName,ClientID,Office_Location_Id&$filter=ID eq '" + PROJID + "'";
            }
        }

        $.ajax({
            url: Ownurl,
            headers: { Accept: "application/json;odata=verbose" },
            async: false,
            success: function (data) {
                var items = data.d.results;
                IsInboxProjectBind = true;

                if (items.length > 0) {
                    var ProjList = [];
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
                        var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,LogonName/EMail,LogonName/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Department&$top=5000&$filter=Status eq 'Active' and LogonName/EMail eq '" + items[i].ManagerName.EMail + "' ";
                        $.when(getLimitedItems('Employees', Query)).done(function (UserResults) {
                            UResults = UserResults.results;
                            if (UResults.length > 0) {
                                var value = UResults[0];
                                if (value.AttachmentFiles.results.length > 0) {
                                    var attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
                                }
                                else {
                                    var attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
                                }

                                tableItemsHTML += "<tr><td><input type='radio' class='ProjectOutchkList' name='TaskOutListchk' title='" + items[i].ProjectName + "' value='" + itemId + "'></td>";
                                tableItemsHTML += "<td><p class='pjecname'>" + ProjectName + "</p><span class='spanmg'>Ref:</span><span class='spanmg projectlg'>" + ProjectCode + "</span></td>";
                                tableItemsHTML += "<td><p class='customernamshow'>" + ClientName + "</p><span class='spanmg'>Status:</span> <span class='spanmg " + colorCss + "'>" + items[i].Status + "</span></td>";
                                tableItemsHTML += "<td><div class='managersec'><div class='mangimg'><img src=" + attachmentUrl + " alt=''></div><div class='managerdetails'>";
                                tableItemsHTML += "<h4>" + value.LogonName.Title + "</h4><div class='mailsec'><span onclick='OpenEmail(this)'>" + items[i].ManagerName.EMail + "</span></div>";
                                tableItemsHTML += "<span class='spanmg'>" + value.Department.Title + "</span> | <span class='spanmg complete'>" + value.Designation + "</span></div></div></td>";
                                //tableItemsHTML += "<td style='display:none'>" + items[i].Office_Location_Id.Title + "</td><td style='display:none'>" + items[i].DepartmentName + "</td>";
                                tableItemsHTML += '</tr>';
                            }
                        });
                    }
                    $(".ProjectOutTables").append(tableItemsHTML);
                    $("#tableOutLocation").show();
                    TableConfigOutboxProject();
                }

                if (currentDlg != "") {
                    currentDlg.close();
                }
            },
            error: function (data) {
                if (currentDlg != "") {
                    currentDlg.close();
                }
                console.log(data);
            }
        });
    }
    if (CountProject == 0) {
        tableItemsHTML += "<tr><td class='NoRecordFound' colspan='4' style='text-align: center;font-size:14px;' data-localize='NoRecordFound'>No record found!!</td></tr>"
        $(".ProjectOutTables").append(tableItemsHTML);
        $("#tableOutLocation").hide();
    }
    else {
        $("#TotalOutCountProject").text(CountProject);
    }
}

function TableConfigOutboxProject() {
    sorter = new TINY.table.sorter('sorter', 'TableOutProjects', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
        colddid: 'columnsOutbox',
        currentid: 'currentOutProj',
        totalid: 'totalOutProj',
        startingrecid: 'startOutrecord',
        endingrecid: 'endOutrecord',
        totalrecid: 'totalOutrecords',
        hoverid: 'selectedrow',
        pageddid: 'pageddlOutProject',
        navid: 'tableOutnav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

function setOutboxProjectValue() {
    if ($('input[name="TaskOutListchk"]:checked')[0] != null) {
        $("#ddlOutboxProject").html('');
        var customerValue = $('input[name="TaskOutListchk"]:checked')[0].attributes.title.value;
        var value = '<option value="' + $('input[name="TaskOutListchk"]:checked').val() + '" Selected>' + customerValue + '</option>';
        $("#ddlOutboxProject").append(value);
        $("#ProjectOutboxSearch").modal('hide');
        var projectidOutBox = $('input[name="TaskOutListchk"]:checked').val();
        if (projectidOutBox != "General Task" && projectidOutBox != "All") {
            CurrentProjectModuleForOutBox(projectidOutBox);
        }
        else {
            $('#ProjectModuleTaskOutBox').attr('disabled', true);
            $("#ProjectModuleTaskOutBox").empty();
            $('<option value="All">All</option>').appendTo("#ProjectModuleTaskOutBox");
        }
    }
}

function ShowOutBoxLocalData() {
    if (localStorage.getItem("FilterLocalOutStorage") != null && localStorage.getItem("FilterLocalOutStorage") != "") {
        if ($('#WorkTypeOfProjectOutbox option').length == 0) {
            bindAllWorkType();
        }
        var StorageTaskOutcome = '';
        var filterVal = localStorage.getItem("FilterLocalOutStorage");
        filterVal = filterVal.split(',');
        if (filterVal[0] != null && filterVal[0] != "null") {
            var ProjFilter = filterVal[0].split("|");
            $("#UserAllProjectTaskOutBox").val(ProjFilter[0]);
            $("#UserAllProjectTaskOutBox").trigger("change");
            if (ProjFilter[0] == "Projects") {
                $(".projectOutDiv").show();
                $("#ddlOutboxProject").html('');
                if (ProjFilter[1] != "All") {
                    $("#ddlOutboxProject").empty().append('<option value="' + ProjFilter[1] + '" Selected>' + ProjFilter[2] + '</option>');
                }
                else {
                    $('#ddlOutboxProject').empty().append("<option value='All'>All</option>");
                }
            }
            else {
                $(".projectOutDiv").hide();
            }
        }

        $('#ProjectModuleTaskOutBox').val(filterVal[1]);

        if (filterVal[2] != null && filterVal[2] != "null") {
            var ClientFilter = filterVal[2].split("|");
            if (ClientFilter[0] != "All") {
                $(".ClientOutDiv").show();
                $("#ddlOutboxClient").html('');
                $("#ddlOutboxClient").empty().append('<option value="' + ClientFilter[0] + '" Selected>' + ClientFilter[1] + '</option>');
            }
            else {
                $('#ddlOutboxClient').empty().append("<option value='All'>All</option>");
            }
        }

        $('#WorkTypeOfProjectOutbox').val(filterVal[3]);
        $('#txtPriorityOutBox').val(filterVal[4]);
        $('#txtFilterStatusOutbox').val(filterVal[5])

        if (filterVal[6] != null && filterVal[6] != "null" && filterVal[6] != "") {
		    var DueDateFilter = filterVal[6].split("|");
		    $('#taskOut').val(moment(new Date(DueDateFilter[0])).format("MMMM D, yy"));
		    StorageTaskOutcome = DueDateFilter[1];
		}

        if (filterVal[7] != null && filterVal[7] != "null" && filterVal[7] != "") {
            var assignByFilter = filterVal[7].split("|");
            for (var user = 0; user < (assignByFilter.length - 1) ; user++) {
                SetAndResolveOutPeoplePicker('pplassigntoOutbox', assignByFilter[user], false);
            }
            $(window).load(function () {
                var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict["pplassigntoOutbox_TopSpan"];
                if (peoplePicker.HasResolvedUsers()) {
                    MutipleBaseFilterOnOutBox(StorageTaskOutcome);
                }
                else {
                    var interval = setInterval(function () {
                        var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict["pplassigntoOutbox_TopSpan"];
                        if (peoplePicker.HasResolvedUsers()) {
                            clearInterval(interval);
                            MutipleBaseFilterOnOutBox(StorageTaskOutcome);
                        }
                    }, 1000);
                }
            });
        }
        else {
            MutipleBaseFilterOnOutBox(StorageTaskOutcome);
        }
    }
}

//set client value and ID
function setCustomerOutBoxValue() {
    $("#ddlOutboxClient").html('');
    var customerValue = $('input[name="Customer"]:checked')[0].attributes.title.value;
    var value = '<option value="' + $('input[name="Customer"]:checked').val() + '" Selected>' + customerValue + '</option>';
    $("#ddlOutboxClient").append(value);
    $("#otherCustomerSearch").modal('hide');
}

//to sort table as per the selected option
function SortOutTable(Name) {
    if (Name == "Task Name") {
        $(".TaskOutSort").trigger("click");
    }
    else if (Name == "Recent Task") {
        $(".RecentTaskOutSort").trigger("click");
    }
    else if (Name == "Due Date") {
        $(".DueDateOutSort").trigger("click");
    }
    else if (Name == "Priority") {
        $(".PriorityOutSort").trigger("click");
    }
}

//Project table sort
function SortProjectOutTable(Name) {
    if (Name == "Project Name") {
        $(".ProjectSortOut").trigger("click");
    }
    else if (Name == "Customer") {
        $(".CustomerProjSortOut").trigger("click");
    }
}

//update the multiple/single table data in OutBox --> Status, DueDate
function UpdateOutboxData(Action) {
    var Metdata;
    var arrDataBind = [];
    if (arrTaskIds.length != 0) {
        var ItemType = GetItemTypeForListName('EmployeeTaskDetails');
        if (Action == "ChangeStatus") { //for Completion popup
            arrTaskIds.forEach(function (value, i) {
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    CurrentPhase: $("#ddlChangeStatus").val()
                };
                if ($("#ddlChangeStatus").val() == "Close") {
                    Metadata['CompletionDate'] = new Date().toISOString();
                    //Metadata['CompletionPersent'] = "100";
                }
                UpdateTaskList('EmployeeTaskDetails', Metadata, value);
                if (arrTaskIds.length == (i + 1)) {
                    arrAllTaskOutbox.forEach(function (value, i) {
                        for (id = 0; id < arrTaskIds.length; id++) {
                            if (value.Id == arrTaskIds[id]) {
                                value.CurrentPhase = $("#ddlChangeStatus").val();
                                if ($("#ddlChangeStatus").val() == "Close") {
                                    //value.CompletionPersent = "100";
                                    value.CompletionDate = titanForWork.ShowCommonStandardDateFormat(new Date());
                                }
                            }
                        }
                    });
                    $("#ddlChangeStatus").val('Open');
                    $("#changestatus").modal('hide');
                    alert("All selected task's status has been updated.");
                }
            });
        }
        else if (Action == "ChangeDueDate") {
            arrTaskIds.forEach(function (value, i) {
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    DueDate: GetDateStandardFormat(moment($('#DueDatePicker').val()).format('DD/MM/YYYY'))
                };
                UpdateTaskList('EmployeeTaskDetails', Metadata, value);
                if (arrTaskIds.length == (i + 1)) {
                    arrAllTaskOutbox.forEach(function (value, i) {
                        for (id = 0; id < arrTaskIds.length; id++) {
                            if (value.Id == arrTaskIds[id]) {
                                value.DueDate = titanForWork.ShowCommonStandardDateFormat(new Date(GetDateStandardFormat(moment($('#DueDatePicker').val()).format('DD/MM/YYYY'))));
                            }
                        }
                    });
                    $('#DueDatePicker').val('');
                    $("#changeduedate").modal('hide');
                    alert("All selected task's due date has been updated.");
                }
            });
        }
        else if (Action == "ChangePriority") {
            arrTaskIds.forEach(function (value, i) {
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    TaskPriority: $('#ddlChangePriority').val()
                };
                UpdateTaskList('EmployeeTaskDetails', Metadata, value);
                if (arrTaskIds.length == (i + 1)) {
                    arrAllTaskOutbox.forEach(function (value, i) {
                        for (id = 0; id < arrTaskIds.length; id++) {
                            if (value.Id == arrTaskIds[id]) {
                                value.TaskPriority = $('#ddlChangePriority').val();
                            }
                        }
                    });
                    $('#ddlChangePriority').val('Top');
                    $("#changepriority").modal('hide');
                    alert("All selected task's priority has been updated.");
                }
            });
        }

        else if (Action == "AddAssignee") {
            var arrNewAssignee = [];
            var EmpIds = [];
            var arrFinalAssigneeIds = [];
            arrTaskIds.forEach(function (value, i) {
                arrFinalAssigneeIds = [];
                arrNewAssignee = arrAllTaskOutbox.filter(function (data) {
                    return data.Id == value;
                });
                if (arrTaskIds.length > 1) {
                    for (var usr = 0; usr < arrNewAssignee[0].TaskAssignTo.results.length; usr++) {
                        multipleEmailAddress.push(arrNewAssignee[0].TaskAssignTo.results[usr].EMail);
                        AllAddedAssignee.push({
                            email: arrNewAssignee[0].TaskAssignTo.results[usr].EMail,
                            userId: arrNewAssignee[0].TaskAssignTo.results[usr].Id
                        });
                    }
                }
                if (arrNewAssignee[0].TaskType == "1") { //Project Task
                    arrFinalAssigneeIds = GetProjectTeamMembers(arrNewAssignee[0].ProjectIDId);
                }
                else {                                    //General Task
                    arrFinalAssigneeIds = checkUserValid();
                }

                //Remove Duplicate array 
                arrFinalAssigneeIds = arrFinalAssigneeIds.filter(function (item, pos) {
                    return arrFinalAssigneeIds.indexOf(item) == pos
                });
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    TaskAssignToId: {
                        'results': arrFinalAssigneeIds
                    },
                };
                UpdateTaskList('EmployeeTaskDetails', Metadata, value);
                if (arrTaskIds.length == (i + 1)) {
                    AllAddedAssignee = [];
                    multipleEmailAddress = [];
                    $('#AddAssigneeArea').empty();
                    $("#AssigneeDIV").hide();
                    $("#addsssignee").modal('hide');
                    alert("All selected task's assignees has been updated.");
                }
            });
        }
        arrTaskIds = [];
        if (Action == "AddAssignee") {
            $("#mainDivAreaTaskOutBox").empty();
            GetTasksOutboxTasks("Open", "PageLoad");
        }
        else {
            arrLimitTaskOutbox = arrDataBind = arrAllTaskOutbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                return obj.CurrentPhase == "Open";
            });
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

            if (arrDataBind.length == 0) {
                $("#NoRecordFoundTaskOutBox").show();
                $("#SeeMoreOutbox").hide();
            }
            else {
                $("#NoRecordFoundTaskOutBox").hide();
            }
            GetTaskOutboxCount();
        }
    }
    else {
        alert("Kindly select any task first.");
        return false;
    }
}

function taskAssignToUsersModalOutBox(itemid) {
    $('#assignToUserList').html('')
    var items = arrAllTaskOutbox.filter(function (data) {
        return data.ID == itemid
    });

    var li = '';
    //li += '<li class="text-right sticky-box px-0"><span class="my-task-group-modal">Assigned To</span><span id="taskGroupCrs" class="glyphicon glyphicon-remove close-round" class="close" data-dismiss="modal"></span></li>'
    if (items.length > 0) {
        var attachment = '';
        var TaskAssignTo = items[0].TaskAssignTo;
        for (var m = 0; m < TaskAssignTo.results.length; m++) {
            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[m].EMail);
            li += '<li><div class="employeesection"><img class="empoyeeimg" src="' + attachment + '" data-themekey="#">';
            li += '<div class="Assignedcontents"><p class="txtAssignedName">' + TaskAssignTo.results[m].Title + '</p>';
            li += '<a class="txtAssignedEmail" href="javascript:void(0);" onclick="OpenOutLook(\'' + TaskAssignTo.results[m].EMail + '\')">' + TaskAssignTo.results[m].EMail + '</a></div></div></li>';
            //li += '<li>' + TaskAssignTo.results[m].Title + '</li>';
        }
        $('#assignToUserList').append(li);
    }
    $("#taskGroup1").modal("show");
}
//check if user id valid or not - Internal and External both
function checkUserValid(Email) {
    var arrFinalMembers = [];
    var arrTemp = [];
    var IsExternalUserBind = false;
    var arrExternal = [];
    var RestQuery = "?$select=*,AttachmentFiles,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID&$expand=AttachmentFiles,LogonName,Department,Company&$top=5000";
    $.when(getLimitedItems("Employees", RestQuery)).done(function (Employees) {
        Employees = Employees.results;
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
                    $.when(getLimitedItems("ExternalUsers", RestQuery)).done(function (ExtEmployees) {
                        ExtEmployees = ExtEmployees.results;
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


//get Project Team members
function GetProjectTeamMembers(ProjectId) {
    var RestQuery = "?$select=*,TeamMember/Id,TeamMember/Name,TeamMember/Title,TeamMember/EMail&$expand=TeamMember&$top=100&$filter=ProjectId eq '" + ProjectId + "'";
    var arrFinalMembers = [];
    var arrTemp = [];
    $.when(getLimitedItems("ProjectTeamDetails", RestQuery)).done(function (ProjectTeamDetails) {
        ProjectTeamDetails = ProjectTeamDetails.results;
        for (var i = 0; i < ProjectTeamDetails.length; i++) {
            arrTemp = AllAddedAssignee.filter(function (obj) { //Filter array on the basis of CurrentPhase
                return obj.email.toLowerCase() == ProjectTeamDetails[i].TeamMember.EMail.toLowerCase();
            });
            if (arrTemp.length > 0) {
                arrFinalMembers.push(arrTemp[0].userId);
            }
        }
    });
    return arrFinalMembers;
}


//to show Timesheet hours of all the assigned to users of selected task
function ShowProgress(TaskItemId) {
    var alreadyBindUsers = [];
    var arrCurrentUser = [];
    var CurrentUserEmail = '';
    var ProgressHTML = '';
    var ChartArray = [];
    var ChartUser = [];
    $('#line-chart').empty();
    $("#ulProgresUsers").empty();
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpTimeSheet')/items?$select=*,TaskID/Title,TaskID/Id,Employee/EMail,Employee/Title&$orderby=DateOfWork asc&$expand=TaskID,Employee&$filter=TaskID/Id eq '" + TaskItemId + "' ",
        dfds = $.Deferred();
    $.when(getAllItems(Ownurl, dfds)).done(function (items) {
        response = [];
        if (items.length > 0) {
            var TotalLoginMinutes = 0;
            for (var i = 0; i < items.length; i++) {
                TotalLoginHours = 0;
                if (jQuery.inArray(items[i].Employee.EMail, alreadyBindUsers) != '-1') {
                    //Do Nothing. Elements contains this already
                }
                else {
                    alreadyBindUsers.push(items[i].Employee.EMail);
                    CurrentUserEmail = items[i].Employee.EMail;
                    arrCurrentUser = items.filter(function (data) {
                        return data.Employee.EMail == CurrentUserEmail;
                    });
                    var ValuesArray = [];
                    var currentWorkHours = 0;
                    var DisplayLoginHours = 0;
                    $.each(arrCurrentUser, function (i, current) {
                        currentWorkHours = parseFloat((current.WorkHours / 60).toFixed(2));
                        TotalLoginHours = parseInt(TotalLoginHours) + currentWorkHours;
                        DisplayLoginHours += parseInt(current.WorkHours);
                        ValuesArray.push({
                            x: moment(current.DateOfWork).format("MM-DD"),
                            y: TotalLoginHours
                        });
                    });

                    if (arrCurrentUser.length > 0) {
                        ChartArray.push({
                            name: items[i].Employee.Title,
                            values: ValuesArray
                        });
                    }

                    DisplayLoginHours = ConvertHHMM(DisplayLoginHours); //+ " (H:M)";
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[i].Employee.EMail);
                    ProgressHTML += '<li><div class="flexitem"><img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/user-circle.png" class="notificationimg" alt="">';
                    ProgressHTML += '<div class="imagecontent"><h4 class="NameHeader">' + items[i].Employee.Title + '</h4>';
                    ProgressHTML += '<a href="javascript:void(0);" onclick="OpenOutLook(\'' + items[i].Employee.EMail + '\')">' + items[i].Employee.EMail + '</a>';
                    ProgressHTML += '</div></div><div class="TimeSheetHour"><h4 class="TimeHeader">HH:MM</h4><span class="timebox">' + DisplayLoginHours + '</span></div></li>';
                }
            }
            $("#ulProgresUsers").append(ProgressHTML);
            ShowProgressChart(ChartArray);
        }
        else {
            $("#ulProgresUsers").append('<li><div class="flexitem noTimeSheet">No timesheet filled</div>');
        }
    });
}

//open mail on Email click
function OpenOutLook(Email) {
    window.location = "mailto:" + Email;
}

//show Line chart for Progress
function ShowProgressChart(Array) {
    $('#line-chart').empty();
    var d3chart = [];
    $('#line-chart').lineChart({
        jsonUrl: { "d3chart": [Array] }
    });
}


//Bind Recurrence task made by you.
function BindRecurrence() {
    var RecHTML = '',
		assignto = '',
		endDate = '',
		attachment = '',
	    RestQuery = "?$select=*,TaskAssignTo/Title,TaskAssignTo/EMail,Author/EMail&$expand=TaskAssignTo,Author&$top=5000&$filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getLimitedItems("RecurringTaskSetup", RestQuery)).done(function (RecurrenceTask) {
        RecurrenceTask = RecurrenceTask.results;
        for (var i = 0; i < RecurrenceTask.length; i++) {
            assignto = '';
            if (RecurrenceTask[i].TaskAssignTo.results.length > 1) {
                for (var j = 0; j < RecurrenceTask[i].TaskAssignTo.results.length; j++) {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(RecurrenceTask[i].TaskAssignTo.results[j].EMail);
                    assignto += '<img src=' + attachment + ' data-themekey="#">';
                }
            }
            else {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(RecurrenceTask[i].TaskAssignTo.results[0].EMail);
                assignto += '<span class="userimgsec"><img src=' + attachment + ' data-themekey="#"></span>' + RecurrenceTask[i].TaskAssignTo.results[0].Title;
            }

            if (RecurrenceTask[i].EndDate != null) {
                endDate = titanForWork.ShowCommonStandardDateFormat(new Date(RecurrenceTask[i].EndDate));
            }
            else {
                endDate = 'No end';
            }

            RecHTML += '<tr><td>' + RecurrenceTask[i].Title + '</td><td><span class="userimgsec">' + assignto + '</span></td>';
            RecHTML += '<td><div class="datebox">' + titanForWork.ShowCommonStandardDateFormat(new Date(RecurrenceTask[i].StartDate)) + '</div></td>';
            RecHTML += '<td><span class="noend">' + endDate + '</span></td><td>' + RecurrenceTask[i].RecurrenceType + '</td>';
            RecHTML += '<td>' + RecurrenceTask[i].DueDays + '</td><td><span class="activesec">' + RecurrenceTask[i].Status + '</span></td>';
            RecHTML += '<td><button type="button" class="editcircle" data-toggle="modal" onclick="EditRecurrence(' + RecurrenceTask[i].Id + ');" data-target="#editmodal"><i class="fa fa-pencil"></i></button>';
            RecHTML += '<button type="button" class="editcircle" onclick="OpenRecurrence(' + RecurrenceTask[i].Id + ');"><i class="fa fa-edit"></i></button></tr>';
        }
        $("#tbdyRecurrences").empty().append(RecHTML);
    });
}

//open 'New-Task' page to edit Reccurance task
function OpenRecurrence(ItemId) {
	location.href = _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&source=" + $('ul#myTabs').find('li.active').attr('id') + "&Type=RecursiveUpdate&RecursiveId=" + window.btoa(ItemId) + "&undefined=undefined";
}

//Bind the selected recurrence in modal
function EditRecurrence(ItemId) {
    $(".chkDayName").prop('checked', '');
    $(".EndDateRecursive").val('');
    $("#disabledate").prop('checked', '');
    var RecId = '';
    var RestQuery = "?$select=*,TaskAssignTo/Title,TaskAssignTo/EMail,Author/EMail&$expand=TaskAssignTo,Author&$top=5000&$filter=Id eq '" + ItemId + "' ";
    $.when(getLimitedItems("RecurringTaskSetup", RestQuery)).done(function (RecurrenceTask) {
        RecurrenceTask = RecurrenceTask.results;
        $(".StartDateRecursive").val(moment(new Date(RecurrenceTask[0].StartDate)).format("MMMM D, yy"));
        if (RecurrenceTask[0].EndDate != null) {
            $(".EndDateRecursive").val(moment(new Date(RecurrenceTask[0].EndDate)).format("MMMM D, yy"));
            $('.EndDateRecursive').attr('disabled', false);
        }
        else {
            //$("#disabledate").prop('checked', 'checked');
            $("#disabledate").trigger("click");
        }

        if (RecurrenceTask[0].Status == "Active") {
            $("#chkRecuStatus").prop('checked', 'checked');
        }
        else {
            $("#chkRecuStatus").prop('checked', '');
        }
        $("#txtDueDay").val(RecurrenceTask[0].DueDays);
        if (RecurrenceTask[0].RecurrenceType == "Daily") {
            $("#DailyBox").trigger('click');
            $("#DailyBox").trigger('click');
        }
        else if (RecurrenceTask[0].RecurrenceType == "Weekly") {
            $("#WeeklyBox").trigger('click');
            $("#WeeklyBox").trigger('click');
            if (RecurrenceTask[0].WeekDays != null) {
                for (var day = 0; day < RecurrenceTask[0].WeekDays.results.length; day++) {
                    $("#" + RecurrenceTask[0].WeekDays.results[day]).prop('checked', 'checked');
                }
            }
        }
        else if (RecurrenceTask[0].RecurrenceType == "Monthly") {
            $("#MonthlyBox").trigger('click');
            $("#MonthlyBox").trigger('click');
            $("#MonthlyDays").val(RecurrenceTask[0].DayOfEveryMonth);
        }
        else { //Yearly
            $("#YearlyBox").trigger('click');
            $("#YearlyBox").trigger('click');
            $('#everymonths option').filter(function () {
                return ($(this).text() == RecurrenceTask[0].MonthOfYear); //To select Blue
            }).prop('selected', true);
            $("#everymonths").trigger('change');
            $("#DayOfYear").val(RecurrenceTask[0].DayOfYear);
        }
        RecId = RecurrenceTask[0].Id;
    });
    $("#parenrRecButton").empty().append('<button type="button" class="btn custom-btn" id="btnEditRecTask">Submit</button>');
    $("#btnEditRecTask").click(function () {
        if (RecTaskValidate() == true) {
            UpdateRecurrence(RecId);
        }
    });
}

//Delete the Recurrence if availble
function UpdateRecurrence(Id) {
    var Metadata;
    var arrDays = [];
    var ItemType = GetItemTypeForListName('RecurringTaskSetup');
    $boxes = $('.chkDayName:checked');
    $boxes.each(function (val) {
        arrDays.push(this.value);
    });
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        DueDays: parseInt($('#txtDueDay').val()),
        WeekDays: {
            'results': arrDays
        }
    }
    var RecurrenceType = '';
    if ($("#DailyBox").prop("checked") == true) {
        RecurrenceType = 'Daily';
        //delete Metadata["WeekDays"];
        Metadata["DayOfEveryMonth"] = 0;
        Metadata["DayOfYear"] = 0;
        Metadata["MonthOfYear"] = '';
    }
    else if ($("#WeeklyBox").prop("checked") == true) {
        RecurrenceType = 'Weekly';
        if (arrDays == []) {
            delete Metadata["WeekDays"];
        }
        Metadata["DayOfEveryMonth"] = 0;
        Metadata["DayOfYear"] = 0;
        Metadata["MonthOfYear"] = '';
    }
    else if ($("#MonthlyBox").prop("checked") == true) {
        RecurrenceType = 'Monthly';
        Metadata["DayOfEveryMonth"] = parseInt($("#MonthlyDays").val());
        Metadata["DayOfYear"] = 0;
        Metadata["MonthOfYear"] = '';
        //delete Metadata["WeekDays"];
    }
    else if ($("#YearlyBox").prop("checked") == true) {
        Metadata["DayOfYear"] = parseInt($("#DayOfYear").val());
        Metadata["MonthOfYear"] = $("#everymonths :selected").text();
        RecurrenceType = 'Yearly';
        //delete Metadata["WeekDays"];
        Metadata["DayOfEveryMonth"] = 0;
    }
    Metadata["RecurrenceType"] = RecurrenceType;
    if ($('.StartDateRecursive').val() != null && $('.StartDateRecursive').val() != "") {
        Metadata["StartDate"] = GetDateStandardFormat(moment($('.StartDateRecursive').val()).format('DD/MM/YYYY'));
    }
    if ($('.EndDateRecursive').val() != null && $('.EndDateRecursive').val() != "") {
        Metadata["EndDate"] = GetDateStandardFormat(moment($('.EndDateRecursive').val()).format('DD/MM/YYYY'));
    }
    else {
    	Metadata["EndDate"] = null;
    }
    if ($("#chkRecuStatus").prop("checked") == true) {
        Metadata["Status"] = 'Active';
    }
    else {
        Metadata["Status"] = 'Inactive';
    }
    updateSPList('RecurringTaskSetup', Metadata, Id);
}

//update data in SP list 
function updateSPList(ListName, Metadata, Id) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + Id + "')",
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
            alert("Details has been updated.");
            BindRecurrence();
            $("#editmodal").modal('hide');
        },
        eror: function (data) {
            dfd.reject(error);
            alert("An error occurred while updating data. " + JSON.stringify(data));
        }
    });
    return dfd.promise();
}

//EditRecursive task Validation
function RecTaskValidate() {
	if ($(".StartDateRecursive").val() == '') {
        alert("Please specify Start and End date.");
        return false;
    }
	else if($(".EndDateRecursive").val() == '' && $("#disabledate").prop('checked') == false){
        alert("Please specify Start and End date.");
        return false;
    }
    else if ($("#txtDueDay").val() == '') {
        alert("Due Days cannot be empty.");
        return false;
    }
    else if ($("#WeeklyBox").prop("checked") == true) {
        if ($(".chkDayName:checked").length == 0) {
            alert("Kindly select any day.");
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
