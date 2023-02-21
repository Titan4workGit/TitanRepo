var assignBy = []; //for showing search result
var assignByEmail = "";
var FilterLocalStorage = [];
var pendingCountForDependency = 0;
var overdueCountForDependency = 0;
var IsInboxProjectBind = false;
var arrAllTaskInbox = [];   //filter = Assignto = LoggedIN user and Dependency = LoggedIN user
var arrLimitTaskInbox = []; //filter = Assignto = LoggedIN user and Dependency = LoggedIN user and CompanyId = LoggedIN and Status = open
var arrFilterDataBind = []; //Filtered data
var IsInboxClientBind = false;
var LoadAllDataInbox = false;
var LoadAllLocalData = false;
var arrTaskInIds = [];
$(document).ready(function () {
    txtCompanyId = Logged_CompanyId;
    var CurrentPase = "Open";
    var AssignTo = _spPageContextInfo.userEmail;
    initializePeoplePicker("pplassigntoInbox");

    //to check if page is refreshed or redirected.
    if (performance.navigation.type == 1 || titanForWork.getQueryStringParameter("LocalStorage") == "Off") {
        localStorage.removeItem("FilterLocalStorage");
    } else {
        //console.info( "This page is not reloaded");
    }
    $("#txtFilterStatusInbox").val(CurrentPase);
    //if data saved in localstorage at page redirection then don't run this function
    if (localStorage.getItem("FilterLocalStorage") == null || localStorage.getItem("FilterLocalStorage") == "") {
        GetTasksInboxTasks(CurrentPase, AssignTo, "PageLoad");
    }
    else {
        //run code only to get data in array
        GetdataLocalStore(CurrentPase, AssignTo, "PageLoad");
    }
    //Besides run this
    ShowLocalStorageData();
    var Location = titanForWork.getQueryStringParameter("Location");
    $("#myTabs").find("#" + Location + " a").trigger("click");
    $('#ProjectModule').attr('disabled', true);
    $("#FilterInbox").click(function () {
        $("#Inbox").modal("show");
        $('#btnTaskInFilter').show();
        $('#btnTaskInClear').show();
        $('#btnKanbanFilter').hide();
        $('#btnClearKanban').hide();
        $('#btnGanttFilter').hide();
        $('#btnGanttClear').hide();
        $("#txtFilterAssignBy").text("Assigned By:");
        if ($('#WorkTypeOfProject option').length == 0) {
            bindAllWorkType();
        }
        $("#taskIn").datepicker();
        $('#taskIn').datepicker("option", "dateFormat", "MM dd, yy");
    });
    $("#selectAllIn").click(function (e) {
        waitingDialog.show();
        if (this.checked == true) {
            $('.taskchkIn').prop("checked", "");
            $('.taskchkIn').trigger('click');
        }
        else {
            $('.taskchkIn').prop("checked", "");
            arrTaskInIds = [];
        }
        waitingDialog.hide();
    });
    $('.taskchkIn').change(function () {
        if (this.checked == false) {
            $('#selectAllIn').prop("checked", "")
        }
    });
    $(".liAddBoard").click(function () {
        if (arrTaskInIds.length == 0) {
            alert("Kindly select any task first.");
            return false;
        }
        else {
            $("#bucketbox").modal('show');
        }
    });
    $("#liAddFlag").click(function () {
        if (arrTaskInIds.length == 0) {
            alert("Kindly select any task first.");
            return false;
        }
        else {
            $("#flagmodal").modal('show');
        }
    });


    $("#searchInProject").click(function () {
        if (IsInboxProjectBind == false) {
            waitingDialog.show();
            setTimeout(function () {
                ReadInDepartment();
                loadprojectInsearch();
            }, 100);
        }
        $("#ProjectInboxSearch").modal('show');
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

    $("#SeeMoreInbox").click(function () {
        var lastPage = $("#pageDropDownInbox").val();
        GetTasksInboxTasks("Open", _spPageContextInfo.userEmail, "");
        $("#pageDropDownInbox").val(lastPage);
        $("#pageDropDownInbox").trigger("change");
    });

    $("#SeeMoreFilterInbox").click(function () {
        var lastPage = $("#pageDropDownInbox").val();
        var arrDataBind = [];
        arrDataBind = arrFilterDataBind.slice(parseInt($("#DiplayTaskCount").text()), (parseInt($("#DiplayTaskCount").text()) + 500)); //get 500 elements at first call
        BindInboxTasks(arrDataBind);
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
    $("#addNewTask").click(function () {
        localStorage.setItem("FilterLocalStorage", FilterLocalStorage.toString());
        localStorage.setItem("FilterLocalOutStorage", FilterLocalOutStorage.toString());
        var newTaskURL = _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&source=" + $('ul#myTabs').find('li.active').attr('id');
        location.href = newTaskURL;
    });
    $("#TaskExport").click(function () {
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
    $("#TaskPending").click(function () {
        SetTaskPending();
    });
    //Overdue count click
    $("#TaskOverdue").click(function () {
        SetTaskOverdue();
    });
    $(".SortClass").click(function () {
        $('#TempTableQuestions').tablesort();
        SortTable(this.textContent);
    });
    $(".SortProject").click(function () {
        $('#TableInProjects').tablesort();
        SortProjectTable(this.textContent);
    });

    $(".btnMIS").click(function () {
        location.href = "../Pages/MySubordinateTasks.aspx";
    });
    $("#btnShowReminder").click(function () {
        getReminders();
    });
    $(".btnCloseActionInbox").click(function () {
        arrTaskIds = [];
        arrTaskInIds = [];
    });
    $(".btncloseRem").click(function () {
        arrTaskIds = [];
        arrTaskInIds = [];
    });
});
//set name in People picker
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

//Bind tasks when data is less than 5000
function GetTasksInboxTasks(currentPhase, AssignTo, Action) {
    $("#SeeMoreFilterInbox").hide();
    var restQuery,
    	arrBoards = [],
        arrDataBind = [];
    if (Action == "PageLoad") {
        arrFilterDataBind = [];
        var dateFilter = new Date();
        dateFilter = dateFilter.setFullYear(dateFilter.getFullYear() - 1);
        dateFilter = new Date(dateFilter);
        restQuery = "&$filter=(TaskAssignTo/EMail eq '" + AssignTo + "' or DependencyTo/EMail eq '" + AssignTo + "') and (CurrentPhase eq 'Open' or CurrentPhase eq 'Hold' or (CurrentPhase eq 'Completed' and Created ge datetime'" + dateFilter.toISOString() + "') or (CurrentPhase eq 'Cancelled' and Created ge datetime'" + dateFilter.toISOString() + "')or (CurrentPhase eq 'Close' and Created ge datetime'" + dateFilter.toISOString() + "'))";
        $(".mainDivAllAnnouncements").empty();
        var Query = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,ClientID/ID,ClientID/Title,Module/Title,Module/ID,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,ClientID,Module,Author,AssignedBy,AttachmentFiles,TaskAssignTo,DependencyTo&$OrderBy=Modified desc" + restQuery;
        $.when(getLimitedItems('EmployeeTaskDetails', Query)).done(function (TaskResults) {
            var TaskinboxChip = '';
            TaskinboxChip += "<div class='upload-chip'>" + currentPhase + "</div>";
            $("#myTaskInboxChip").empty();
            $("#myTaskInboxChip").append(TaskinboxChip);
            var items = TaskResults.results;
            arrAllTaskInbox = items;
            arrDataBind = arrLimitTaskInbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
                return obj.CurrentPhase == currentPhase;
            });
            arrBoards = arrSortBoard = arrLimitTaskInbox.filter(function (obj) { //Filter array on the basis of Board Name
                return obj.BoardName != null && obj.BoardName != '';
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
            BindBucketName(arrBoards, '');
            BindInboxTasks(arrDataBind);
            arrCurrentGantt = arrLimitTaskInbox.filter(function (f) { return f; })
            //CreateTaskGanttChart(arrLimitTaskInbox);
            if (arrDataBind.length == 0) {
                $(".NoRecordFound").show();
                $("#SeeMoreInbox").hide();
            }
            else {
                $(".NoRecordFound").hide();
            }
            ShowPieChartInbox();
            GetTaskInboxCount();
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
                    }, 100);
                });
            }
            else {
                HandleError(error);
            }
        });
    }
    else {
        arrDataBind = arrLimitTaskInbox.slice(parseInt($("#DiplayTaskCount").text()), (parseInt($("#DiplayTaskCount").text()) + 500)); //get 500 elements at first call
        BindInboxTasks(arrDataBind);

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
    if (currentDlg != "") {
        currentDlg.close();
    }
}

//get all recaords when the threshold limit is crossed then filter
function GetAllInboxTasks(currentPhase, AssignTo, Action) {//
    var Query = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,ClientID/ID,ClientID/Title,Module/Title,Module/ID,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,AssignedBy,ClientID,Module,Author,AttachmentFiles,TaskAssignTo,DependencyTo&$OrderBy=Modified desc",
        dfds = $.Deferred(),
        arrBoards = [],
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items" + Query;

    $.when(getAllItems(Ownurl, dfds)).done(function (TaskResults) {
        response = [];
        var TaskinboxChip = '';
        TaskinboxChip += "<div class='upload-chip'>" + currentPhase + "</div>";
        $("#myTaskInboxChip").empty();
        $("#myTaskInboxChip").append(TaskinboxChip);
        var items = TaskResults;
        arrAllTaskInbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
            var arrAssigntoQuery = [];
            var arrDependencyQuery = [];
            var AssigntoQuery = true;
            var DependencyQuery = true;
            for (var i = 0; i < obj.TaskAssignTo.results.length; i++) {
                if (obj.TaskAssignTo.results[i].EMail.indexOf("#") != -1) {
                    obj.TaskAssignTo.results[i].EMail = obj.TaskAssignTo.results[i].EMail.split("#")[0];
                    obj.TaskAssignTo.results[i].EMail = obj.TaskAssignTo.results[i].EMail.replace("_", "@");
                }
                arrAssigntoQuery.push(obj.TaskAssignTo.results[i].EMail.toLowerCase() == AssignTo.toLowerCase());
            }
            arrAssigntoQuery.forEach(function (entry, index) {
                if (index == 0) {
                    AssigntoQuery = entry;
                }
                else {
                    AssigntoQuery = entry || AssigntoQuery;
                }
            });
            if (obj.DependencyTo.results != null) {
                for (var j = 0; j < obj.DependencyTo.results.length; j++) {
                    if (obj.DependencyTo.results[j].EMail.indexOf("#") != -1) {
                        obj.DependencyTo.results[j].EMail = obj.DependencyTo.results[j].EMail.split("#")[0];
                        obj.DependencyTo.results[j].EMail = obj.DependencyTo.results[j].EMail.replace("_", "@");
                    }
                    arrDependencyQuery.push(obj.DependencyTo.results[j].EMail.toLowerCase() == AssignTo.toLowerCase());
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
        arrDataBind = arrLimitTaskInbox = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
            return (obj.CurrentPhase == currentPhase);
        });
        arrBoards = arrSortBoard = arrLimitTaskInbox.filter(function (obj) { //Filter array on the basis of Board Name
            return obj.BoardName != null && obj.BoardName != '';
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
        BindInboxTasks(arrDataBind);
        BindBucketName(arrBoards, '');
        arrCurrentGantt = arrLimitTaskInbox.filter(function (f) { return f; })
        //CreateTaskGanttChart(arrLimitTaskInbox);
        if (arrDataBind.length == 0) {
            $(".NoRecordFound").show();
            $("#SeeMoreInbox").hide();
        }
        else {
            $(".NoRecordFound").hide();
        }
        ShowPieChartInbox();
        GetTaskInboxCount();
        if (currentDlg != "") {
            currentDlg.close();
        }
    }).fail(function (error) {
        HandleError(error);
    });

}

//get data only for localstorage
function GetdataLocalStore(currentPhase, AssignTo, Action) {
    var restQuery;
    var arrBoards = [];
    restQuery = "&$filter=(TaskAssignTo/EMail eq '" + AssignTo + "' or DependencyTo/EMail eq '" + AssignTo + "')";
    $(".mainDivAllAnnouncements").empty();
    var Query = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,ClientID/ID,ClientID/Title,Module/Title,Module/ID,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,AssignedBy,ClientID,Module,Author,AttachmentFiles,TaskAssignTo,DependencyTo&$OrderBy=Modified desc" + restQuery;
    $.when(getLimitedItems('EmployeeTaskDetails', Query)).done(function (TaskResults) {
        var items = TaskResults.results;
        arrAllTaskInbox = items;
        arrDataBind = arrLimitTaskInbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
            return obj.CurrentPhase == currentPhase;
        });
        arrBoards = arrSortBoard = arrLimitTaskInbox.filter(function (obj) { //Filter array on the basis of Board Name
            return obj.BoardName != null && obj.BoardName != '';
        });
        if (arrDataBind.length == 0) {
            $(".NoRecordFound").show();
            $("#SeeMoreInbox").hide();
        }
        else {
            $(".NoRecordFound").hide();
        }
        ShowPieChartInbox();
        GetTaskInboxCount();
        BindBucketName(arrBoards, '');
        arrCurrentGantt = arrLimitTaskInbox.filter(function (f) { return f; })
        //CreateTaskGanttChart(arrLimitTaskInbox);
    }).fail(function (error) {
        if (error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1) {
            $("#ThresholdError").modal('show');
            $("#btnContinue").show();
            $("#btnContinueOutBox").hide();
            LoadAllDataInbox = false;
            LoadAllLocalData = true;
            $("#btnContinue").click(function () {
                var dlgTitle = 'Loading all data...';
                var dlgMsg = '<br />Please wait!!';
                var dlgHeight = 200;
                var dlgWidth = 400;
                SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
                });
                setTimeout(function () {
                    $("#ThresholdError").modal('hide');
                    GetAlldataLocal(currentPhase, AssignTo, Action);
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
function GetAlldataLocal(currentPhase, AssignTo, Action) {
    $(".mainDivAllAnnouncements").empty();
    var dfds = $.Deferred(),
    	arrBoards = [],
        Query = "?$top=5000&$select=*,PredecessorTask/Id,PredecessorTask/Title,SuccessorTask/Id,SuccessorTask/Title,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,ClientID/ID,ClientID/Title,Module/Title,Module/ID,Author/Title,Author/EMail,DependencyTo/EMail,DependencyTo/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/ID,AttachmentFiles&$Expand=PredecessorTask,SuccessorTask,AssignedBy,ClientID,Module,Author,AttachmentFiles,TaskAssignTo,DependencyTo&$OrderBy=Modified desc",
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items" + Query;

    $.when(getAllItems(Ownurl, dfds)).done(function (TaskResults) {
        response = [];
        var items = TaskResults;
        arrAllTaskInbox = items;
        arrAllTaskInbox = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
            var arrAssigntoQuery = [];
            var arrDependencyQuery = [];
            var AssigntoQuery = true;
            var DependencyQuery = true;
            for (var i = 0; i < obj.TaskAssignTo.results.length; i++) {
                if (obj.TaskAssignTo.results[i].EMail.indexOf("#") != -1) {
                    obj.TaskAssignTo.results[i].EMail = obj.TaskAssignTo.results[i].EMail.split("#")[0];
                    obj.TaskAssignTo.results[i].EMail = obj.TaskAssignTo.results[i].EMail.replace("_", "@");
                }
                arrAssigntoQuery.push(obj.TaskAssignTo.results[i].EMail.toLowerCase() == AssignTo.toLowerCase());
            }
            arrAssigntoQuery.forEach(function (entry, index) {
                if (index == 0) {
                    AssigntoQuery = entry;
                }
                else {
                    AssigntoQuery = entry || AssigntoQuery;
                }
            });
            if (obj.DependencyTo.results != null) {
                for (var j = 0; j < obj.DependencyTo.results.length; j++) {
                    if (obj.DependencyTo.results[j].EMail.indexOf("#") != -1) {
                        obj.DependencyTo.results[j].EMail = obj.DependencyTo.results[j].EMail.split("#")[0];
                        obj.DependencyTo.results[j].EMail = obj.DependencyTo.results[j].EMail.replace("_", "@");
                    }
                    arrDependencyQuery.push(obj.DependencyTo.results[j].EMail.toLowerCase() == AssignTo.toLowerCase());
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
        arrDataBind = arrLimitTaskInbox = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
            return (obj.CurrentPhase == currentPhase);
        });
        arrBoards = arrSortBoard = arrLimitTaskInbox.filter(function (obj) { //Filter array on the basis of Board Name
            return obj.BoardName != null && obj.BoardName != '';
        });
        if (arrDataBind.length == 0) {
            $(".NoRecordFound").show();
            $("#SeeMoreInbox").hide();
        }
        else {
            $(".NoRecordFound").hide();
        }
        ShowLocalStorageData();
        ShowPieChartInbox();
        GetTaskInboxCount();
        BindBucketName(arrBoards, '');
        arrCurrentGantt = arrLimitTaskInbox.filter(function (f) { return f; })
        //CreateTaskGanttChart(arrLimitTaskInbox);
        if (currentDlg != "") {
            currentDlg.close();
        }

    }).fail(function (error) {
        HandleError(error);
    });
}


//bind inbox tasks as per given data
function BindInboxTasks(arrDataBind) {
    var tableItemsHTML = "";
    var TaskAssignFrom = '';
    var DateText = '';
    var IsTimeSheetHide = false;
    if (arrDataBind.length > 0) {
        for (var i = 0; i < arrDataBind.length; i++) {
            var CompletionDate = '';
            var ItemID = arrDataBind[i].ID;
            var Title = arrDataBind[i].Title;
            var taskType = arrDataBind[i].TaskType;
            TaskAssignFrom = '';
            var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrDataBind[i].AssignedBy.EMail);
            TaskAssignFrom += '<div class="employeesection"><div class="empoyeeimg" style="float:left;"><img title="' + arrDataBind[i].AssignedBy.Title + '" src="' + Authorattachment + '" alt="" data-themekey="#">';
            TaskAssignFrom += '</div><div class="employeeinfo"><h3>' + arrDataBind[i].AssignedBy.Title + '</h3></div></div>';
            var TaskPriority = arrDataBind[i].TaskPriority;
            var DueDate = arrDataBind[i].DueDate;
            var modifiedDate = new Date(DueDate);
            var ExcelAssignTo = '';
            var ExcelDependencies = '';
            modifiedDate = new Date(modifiedDate);
            var todayDate = new Date;
            var diffDaysServices = Math.round(todayDate.getTime() - modifiedDate.getTime()) / (todayDate);
            var OverDueDate = "";
            DateText = "Due";
            var CurrentPhase = arrDataBind[i].CurrentPhase;
            if (DueDate != null && CurrentPhase != "Completed" && CurrentPhase != "Close") {
                DueDate = new Date(DueDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
            }
            var CompletionPersent = arrDataBind[i].CompletionPersent;
            if (CurrentPhase == "Completed" || CurrentPhase == "Close") {
                DateText = "Completed";
                DueDate = new Date(arrDataBind[i].CompletionDate);
                DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
            }

            var ModuleTitle = '';
            if (arrDataBind[i].Module != 0) {
                var ModuleTitle = arrDataBind[i].Module.Title;
                if (ModuleTitle == null) {
                    ModuleTitle = "";
                }
            }
            var ClientTitle = '';
            if (arrDataBind[i].ClientID != 0) {
                var ClientTitle = arrDataBind[i].ClientID.Title;
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
            var ProjectFullName = arrDataBind[i].ProjectFullName;
            var ProjectFullNameExcel = "";
            if (ProjectFullName == null) {
                TaskMethod = "General task";
                if (arrDataBind[i].TaskCategory == "TeamChannel") {
                    ProjectFullName = "<b>Team Channel:</b> " + arrDataBind[i].TeamItemName;
                    ProjectFullNameExcel = "Team Channel (" + arrDataBind[i].TeamItemName + ")";
                }
                else if (arrDataBind[i].TaskCategory == "TeamMeeting") {
                    ProjectFullName = "<b>Team Meeting:</b> " + arrDataBind[i].TeamItemName;
                    ProjectFullNameExcel = "Team Meeting (" + arrDataBind[i].TeamItemName + ")";
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
            var Worktype = arrDataBind[i].Worktype;
            if (Worktype == null) {
                Worktype = '';
            }

            var DependencyCount = arrDataBind[i].DependencyCount;
            if (DependencyCount == null || DependencyCount == 0) {
                DependencyCount = '';
            }
            var Status=1;
            if(CurrentPhase=="Open")
            {
              Status=0;
            }                       

            var dependencyActionButton = '';
            var ExcelDependenciesName = "";
            if (DependencyCount > 0) {
                dependencyActionButton = "<button type='button' class='btn custom-btn custom-btn-two mt-16' onclick=taskDependency('" + ItemID + "',true,'"+Status+"');SelectArray('" + ItemID + "');>Action</button>";
                ExcelDependencies = DependencyCount;
                for (depency = 0; depency < arrDataBind[i].DependencyTo.results.length; depency++) {
                    ExcelDependenciesName += arrDataBind[i].DependencyTo.results[depency].Title + ", ";
                }
                ExcelDependenciesName = ExcelDependenciesName.substring(0, ExcelDependenciesName.length - 2);
            }
            var taskStartDate = arrDataBind[i].StartDate;
            var TaskAssignTo = arrDataBind[i].TaskAssignTo;
            var TaskAssignToUsers = '';
            if (TaskAssignTo.results.length > 0) {
                //var TaskAssignToUsers = TaskAssignTo.results[0].Title;
                for (assignto = 0; assignto < TaskAssignTo.results.length; assignto++) {
                    ExcelAssignTo += TaskAssignTo.results[assignto].Title + ", ";
                    if (TaskAssignTo.results.length == 1) {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[assignto].EMail);
                        TaskAssignToUsers += '<div class="employeesection"><div class="empoyeeimg" style="float:left;"><img title="' + TaskAssignTo.results[assignto].Title + '" src="' + attachment + '" alt="" data-themekey="#">';
                        TaskAssignToUsers += '</div><div class="employeeinfo"><h3>' + TaskAssignTo.results[assignto].Title + '</h3></div></div>';
                    }
                    else {
                        if (assignto < 3) {
                            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[assignto].EMail);
                            TaskAssignToUsers += '<div class="employeesection"><div class="empoyeeimg" style="float:left;"><img title="' + TaskAssignTo.results[assignto].Title + '" src="' + attachment + '" alt="" data-themekey="#"></div></div>';
                        }
                    }
                }
                ExcelAssignTo = ExcelAssignTo.substring(0, ExcelAssignTo.length - 2);
            }

            var TaskAssignToButton = '';
            if (TaskAssignTo.results.length >= 4) {
                TaskAssignToButton = "<button type='button' class='btn custom-btn custom-btn-two groupmultisec' onclick=taskAssignToUsersModal('" + ItemID + "')><i class='fa fa-angle-double-right' aria-hidden='true'></i></button>";
            }
            var currentuserID = _spPageContextInfo.userId;
            var IsUserInAssigntoGroup = TaskAssignTo.results.map(function (e) { return e.ID; }).indexOf(currentuserID);
            var timeSheetFillButton = '';
            if (IsUserInAssigntoGroup != -1) {
                if (IsTimesheetInvisible == false) {
                    IsTimeSheetHide = false;
                    var timeSheetFillButton = '<button type="button" class="btn custom-btn custom-btn-two mt-16 hourbtn" name="' + encodeURI(Title) + '" onclick="timeSheetHours(this,' + ItemID + ')">Hours</button><button type="button" class="btn btn-danger custom-btn-two custom-btn-two-danger mt-16" onclick="timeSheetEntry(' + ItemID + ')">Fill</button>';
                }
                else {
                    var timeSheetFillButton = "";
                    IsTimeSheetHide = true;
                }
            }
            var PriorityHTML = '';
            if (arrDataBind[i].TaskPriority == "High" || arrDataBind[i].TaskPriority == "Top") {
                PriorityHTML = '<i class="fa fa-exclamation-circle" style="font-size: 23px;color:red;"></i>&nbsp&nbsp'
            }
            var FlagHTML = '';
            if (arrDataBind[i].SetFlag == "Red") {
                FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:red"></i>';
            }
            else if (arrDataBind[i].SetFlag == "Blue") {
                FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:blue"></i>';
            }
            else if (arrDataBind[i].SetFlag == "Green") {
                FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:green"></i>';
            }
            else if (arrDataBind[i].SetFlag == "Yellow") {
                FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:#ffa500"></i>';
            }
            else {
                FlagHTML = '';
            }
            var LinkedTaskHTML = '';
            var MethodBox = "Inbox";
            if (arrDataBind[i].SuccessorTask.Id != null && arrDataBind[i].SuccessorTask.Id != 0) {
                LinkedTaskHTML = '<i class="fa fa-link" onclick="ShowSucPredTasks(' + ItemID + ', \'' + MethodBox + '\');" aria-hidden="true" style="font-size:23px;"></i>';
            }
            else if (arrDataBind[i].PredecessorTask.Id != null && arrDataBind[i].PredecessorTask.Id != 0) {
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
            if (arrDataBind[i].TaskCategory == "Recurrence") {
                TaskCatHTML = '<div class="TaskTypeClass" style="float:left;padding-right:10px;"><i class="fa fa-registered" aria-hidden="true" style="font-size:20px;"></i></div>'
            }
            else if (arrDataBind[i].TaskCategory == "TeamMeeting") {
                TaskCatHTML = '<div class="TaskTypeClass" style="float:left;padding-right:10px;"><img class="dashboard-icon-info mr2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/business-meeting.png"></div>';
            }
            else if (arrDataBind[i].TaskCategory == "TeamChannel") {
                TaskCatHTML = '<div class="TaskTypeClass" style="float:left;padding-right:10px;"><img class="dashboard-icon-info mr2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/team_icon.png"></div>';
            }
            else if (arrDataBind[i].TaskCategory == "Outlook") {
                TaskCatHTML = '<div class="TaskTypeClass" style="float:left;padding-right:10px;"><i class="fa fa-envelope-o"></i></div>';
            }

            var ThreeDotMenu = '';
            var StartDate = new Date(arrDataBind[i].StartDate);
            StartDate = titanForWork.ShowCommonStandardDateFormat(StartDate);
            ThreeDotMenu += '<div class="dropdown-container dropdown" onclick=SelectArray("' + ItemID + '") tabindex="-1"><div class="three-dots dropdown-toggle" data-toggle="dropdown" aria-expanded="false"></div>';

            ThreeDotMenu += '<ul class="dropdown-menu dropdown-color-menu-icon"><li class="parentlist"><ul>';
            ThreeDotMenu += '<li class="clsCompletion"><a class="dropdown-toggle" id="">';
            ThreeDotMenu += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/check_icon_1.png" alt=""><span>Mark as Completed</span></a></li>';
            ThreeDotMenu += '<li class="clsProgression"><a href="javascript:void(0);">';
            ThreeDotMenu += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/percentage-icon.png" alt=""><span>Update Progress</span>';
            ThreeDotMenu += '</a></li></ul></li class="AddDepedncy"><li class="parentlist"><ul>'
            if(CurrentPhase == "Open"){
	            ThreeDotMenu += '<li class="AddDepedncy"><a href="javascript:void(0);" data-toggle="modal" data-target="#dependenciesmodl">';
	            ThreeDotMenu += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/dependency-icon.png" alt=""><span>Add Dependency</span>';
	            ThreeDotMenu += '</a></li>'
            }
            ThreeDotMenu +='<li onclick="getOnChangeHistory('+ItemID+')"><a href=javascript:void(0);" data-toggle="modal" data-target="#change_History">'
            ThreeDotMenu +='<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/change_history.png" alt="" data-themekey="#"><span>Change History</span></a></li>'
            ThreeDotMenu += '<li class="ModalAddMessage"><a href="javascript:void(0);"><i class="fa fa-comments-o"></i>';
            ThreeDotMenu += '<span>Add a Message</span></a></li><li><a href="javascript:void(0);" data-toggle="modal" data-target="#Notificationlist">';
            ThreeDotMenu += '<i class="fa fa-envelope-o" aria-hidden="true" style="margin:0px 8px 0 0px !important"></i><span>Notify by mail</span></a></li></ul></li>';
            ThreeDotMenu += '<li class="parentlist"><ul><li id="InboxAddBoard" class="KanbanClass"><a href="javascript:void(0);" data-toggle="modal" data-target="#bucketbox">';
            ThreeDotMenu += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/collect.png" alt=""><span>Set Board</span></a></li>';
            ThreeDotMenu += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#flagmodal">';
            ThreeDotMenu += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/flag-icon.png" alt=""><span>Set Flag</span></a></li>';
            ThreeDotMenu += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#setreminder"><i class="fa fa-bell-o" style="margin:0px 8px 0 0px !important"></i>';
            ThreeDotMenu += '<span>Set Reminder</span></a></li><li class="ParentAddFavorite"><a class="btnAddFavorite" href="javascript:void(0);">';
            ThreeDotMenu += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/favorite_new-icon.png" alt=""><span>Add to Favorite</span></a></li></ul></li></ul>';

            ThreeDotMenu += '</div></div>';
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
				if(new Date(arrDataBind[i].DueDate)< new Date())
                {
                   StatusColor='#ff0000'
                }
			}

            var Titleurl = "<div class='alignSection'><input type='checkbox' value='" + ItemID + "' class='taskchkIn'><a class='task-name-box' href='javascript:void(0);' onclick='redirectModifyTask(this);' name='" + _spPageContextInfo.webAbsoluteUrl + "/Pages/TaskDetails.aspx?WebAppId=" + Logged_CompanyId + "&TaskId=" + window.btoa(ItemID) + "&EditMode=" + window.btoa('False') + "'><b class='ellipsis-2'>" + Title + "</b></a>" + ThreeDotMenu + "</div>";
            // Generate Dynamic HTML
            if (diffDaysServices > 1 && CurrentPhase == "Open") {
                if(new Date(arrDataBind[i].DueDate)< new Date())
                {
                   StatusColor='#ff0000'
                }
                tableItemsHTML += "<tr>" +
	                "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
                    "<span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p>" + TaskCatHTML + "</td>" +
                    "<td style='display:none;'>" + Title + "<p class='m-0 mt-4 ellipsis-1'></td>" +
	                "<td style='display:none;'>" + ProjectFullNameExcel + "<p class='m-0 mt-4 ellipsis-1'></td>" +
	                "<td class='text-center'>" +
	                "<div class=''>" +
	                "<p class='m-0 ellipsis-1'>" + Worktype + "</p>" +
	                "<p class='m-0 ellipsis-1'>" + ClientModuleType + "</p><div class='TaskIcons'>" + PriorityHTML + FlagHTML + LinkedTaskHTML +
	                "</div></div>" +
	                "</td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + Worktype + "</p></td>" +
	                "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p><div class='InboxStartDate'>Date: " + StartDate + "</div></td>" +
	                "<td class='text-center'><p class='m-0 ellipsis-2'><div class='GroupImage'>" + TaskAssignToUsers + "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div></div></p>" +
	                "</td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + " (" + StartDate + ")</p></td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelAssignTo + "</p></td>" +
	                "<td class='text-center'><p class='m-0 mb-10' style='color:" + StatusColor + "'>" + CurrentPhase + "</p>" +
	                "<p class='m-0 font-12' style='font-weight: bold;color: red;'>" + DateText + ": <span>" + DueDate + "</span></p>" +
	                "<div class='progress custom-progress progress-danger m-0 mt-4'>" +
	                "<div class='progress-bar progress-bar-danger' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
	                "<td class='text-center'><h4 class='m-0'>" + DependencyCount + "</h4>" + dependencyActionButton + "</td>" +
	                "<td class='text-center myTask-timesheet-col TimeSheetTHead'>" + timeSheetFillButton + "</td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].Created + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + CurrentPhase + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].TaskPriority + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependencies + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependenciesName + "</p></td>" +
	            "</tr>";
            }
            else {
                tableItemsHTML += "<tr>" +
	                "<td>" + Titleurl + "<p class='m-0 mt-4 ellipsis-1'>" +
                    "<span class='ml-4 my-task-names'>" + ProjectFullName + "</span></p>" + TaskCatHTML + "</td>" +
                    "<td style='display:none;'>" + Title + "<p class='m-0 mt-4 ellipsis-1'>" +
	                "<td style='display:none;'>" + ProjectFullNameExcel + "<p class='m-0 mt-4 ellipsis-1'>" +
	                "<td class='text-center'>" +
	                "<div class=''>" +
	                "<p class='m-0 ellipsis-1'>" + Worktype + "</p>" +
	                "<p class='m-0 ellipsis-1'>" + ClientModuleType + "</p><div class='TaskIcons'>" + PriorityHTML + FlagHTML + LinkedTaskHTML +
	                "</div></div></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + Worktype + "</p></td>" +
	                "<td class='text-center'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p><div class='InboxStartDate'>Date: " + StartDate + "</div></td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + TaskAssignFrom + " (" + StartDate + ")</p></td>" +
	                "<td class='text-center'><p class='m-0 ellipsis-2'><div class='GroupImage'>" + TaskAssignToUsers + "<div class='text-center mt-4 position-relative'>" + TaskAssignToButton + "</div></div></p>" +
	                "</td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelAssignTo + "</p></td>" +
	                "<td class='text-center'><p class='m-0 mb-10'>" + CurrentPhase + "</p>" +
	                "<p class='m-0 font-12' style='color:" + StatusColor + "'>" + DateText + ": <span>" + DueDate + "</span></p>" +
	                "<div class='progress custom-progress progress-success m-0 mt-4'>" +
	                "<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width:" + CompletionPersent + "%'></div></div></td>" +
	                "<td class='text-center'><h4 class='m-0'>" + DependencyCount + "</h4>" + dependencyActionButton + "</td>" +
	                "<td class='text-center myTask-timesheet-col TimeSheetTHead'>" + timeSheetFillButton + "</td>" +
	                "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].Created + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + DueDate + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + CurrentPhase + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + arrDataBind[i].TaskPriority + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependencies + "</p></td>" +
                    "<td class='text-center' style='display:none;'><p class='m-0 ellipsis-2'>" + ExcelDependenciesName + "</p></td>" +

	            "</tr>";
            }
        }
        $(".mainDivAllAnnouncements").append(tableItemsHTML);
        if (IsTimeSheetHide == true) {
            $(".TimeSheetTHead").hide();
        }
        TableConfiguration();
        $(".taskchkIn").click(function () {
            if (this.checked == true) {
                if ($(".taskchkIn:checked").length == 1) {
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
        $(".KanbanClass").click(function () {
	        $("#BoardPopupHeader").text("Set Board");
	        $("#btnBoardSubmit").show();
	        $("#btnBoardOnly").hide();
	    });
        $(".AddDepedncy").click(function () {
            $("#btnAddDependency").text('Add');
            $("#StartDateAsTask").prop("checked", "checked");
            $(".StartDependecyDate").prop("disabled", "disabled");
            $("#DueDateAsTask").prop("checked", "checked");
            $(".DueDependecyDate").prop("disabled", "disabled");
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
        $(".ParentAddFavorite").empty().append('<a href="javascript:void(0);" class="btnAddFavorite"><img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/favorite_new-icon.png" alt=""><span>Add to Favorite</span></a>');
        $(".btnAddFavorite").click(function () {
            updateTaskMeatdata('AddFavorite');
        });
        $(".clsCompletion").click(function () {
            if (arrTaskInIds.length > 0) {
                $("#CompletionPercentArea").hide();
                $("#txtCompletionHeader").text("Completion");
                $("#CompletionDateArea").show();
                $("#progression").modal('show');
            }
            else {
                alert("Kindly select any task first.");
                return false;
            }
        });
        $(".clsProgression").click(function () {
            if (arrTaskInIds.length > 0) {
                $("#CompletionPercentArea").show();
                $("#txtCompletionHeader").text("Progression");
                $("#CompletionDateArea").hide();
                if (arrTaskInIds.length == 1) {
                    var arrSingleTask = [];
                    arrSingleTask = arrAllTaskInbox.filter(function (data) {
                        return data.Id == arrTaskInIds[0];
                    });
                    if (arrSingleTask[0].CompletionPersent == null || arrSingleTask[0].CompletionPersent == "") {
                        arrSingleTask[0].CompletionPersent = '0';
                    }
                    $("#Taskprogression").val(arrSingleTask[0].CompletionPersent);
                    $("#barVal").text(arrSingleTask[0].CompletionPersent + "%");
                }
                else {
                    $("#Taskprogression").val('0');
                    $("#barVal").text('0' + "%");
                }
                $("#progression").modal('show');
            }
            else {
                alert("Kindly select any task first.");
                return false;
            }
        });
    }
    else {
        tableItemsHTML = "<tr><td colspan=7 style='text-align: center'>No record found!!</td></tr>";
        $(".mainDivAllAnnouncements").append(tableItemsHTML);
    }
}

//insert ItemId in array
function SelectArray(Id) {
    arrTaskInIds = [];
    $(".taskchkIn").prop("checked", '');
    $("#selectAllIn").prop("checked", '');
    arrTaskInIds.push(Id);
}

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
        pageddid: 'pageDropDownInbox',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}


function taskAssignToUsersModal(itemid) {
    $('#assignToUserList').html('')
    var items = arrAllTaskInbox.filter(function (data) {
        return data.ID == itemid
    });

    var li = '';
    //li += '<li class="text-right sticky-box px-0"><span class="my-task-group-modal">Assigned To</span><span id="taskGroupCrs" class="glyphicon glyphicon-remove close-round" class="close" data-dismiss="modal"></span></li>'
    if (items.length > 0) {
        var TaskAssignTo = items[0].TaskAssignTo;
        var attachment = '';
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

//Bind Task Dependency for Inbox
function taskDependency(TaskId, OpenModal,check) {
    var CurrentDate = new Date();
    CurrentDate = CurrentDate.setHours(0, 0, 0, 0);
    CurrentDate = new Date(CurrentDate);
    var Query = "?$top=5000&$select=*,ID,Title,Details,Status,AssignedTo/Title,AssignedTo/EMail,Author/Title,Author/EMail,AssignedTo/ID,TaskId/ID,TaskId/Title,AttachmentFiles&$Expand=Author,AttachmentFiles,AssignedTo,TaskId&$filter=TaskId eq'" + TaskId + "'";
    $.when(getLimitedItems('TaskDependencies', Query)).done(function (TaskDependency) {
        $('#taskDependencyTaskInbox').html('')
        if (OpenModal != false) {
            $("#ActionInbox").modal("show");
        }
        if(check=='0')
        {
          $(".btncolormanage ").show();
          $("#btnAddDependency").show();
        }
        else
        {
           $(".btncolormanage ").hide();
           $("#btnAddDependency").hide()
        }
        var tr = '';
        var StartDateHTML = '';
        var MandatoryHTML = '';
        var DueDateHTML = '';
        var Visibility = '';
        var arrTaskMdata = [];
        var IsFillVisible = '';
        var IsStatusDisable = '';
        var items = TaskDependency.results;
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                tr = '';
                var Title = items[i].Title;
                $("#taskTitleForLnbox").text(items[i].TaskId.Title);
                var Detail = items[i].Details;
                var status = items[i].Status;
                var itemId = items[i].ID;
                var taskTitle = items[i].TaskId.Title;
                var TaskAssignTo = items[i].AssignedTo;
                var allAssignUser = '';
                var userId = [];

                if (items[i].Status == 'Inactive') {
                    arrTaskMdata = arrAllTaskInbox.filter(function (data) {
                        return data.Id == TaskId;
                    });
                    if (arrTaskMdata.length == 0) {
                        arrTaskMdata = arrAllTaskOutbox.filter(function (data) {
                            return data.Id == TaskId;
                        });
                    }
                    if (items[i].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase() || arrTaskMdata[0].AssignedBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                        Visibility = 'inline-block';
                    }
                    else {
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
                        if (TaskAssignTo.results[0].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase() || items[i].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                            IsStatusDisable = "";
                        }
                        else {
                            IsStatusDisable = "disabled";
                        }
                        if (TaskAssignTo.results[0].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                            IsFillVisible = 'inline-block';
                        }
                        var UserAttachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[0].EMail);
                        tr += '<div class="flexitem"><img src="' + UserAttachment + '" class="notificationimg" alt=""><div class="imagecontent">';
                        tr += '<h4>' + TaskAssignTo.results[0].Title + '</h4><a href="javascript:void(0);" onclick="OpenOutLook(\'' + TaskAssignTo.results[0].EMail + '\')">' + TaskAssignTo.results[0].EMail + '</a></div>';
                    }
                    else {
                        IsStatusDisable = "disabled";

                        for (var j = 0; j < TaskAssignTo.results.length; j++) {
                            if (TaskAssignTo.results[j].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase() || items[i].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                                IsStatusDisable = "";
                            }
                            if (TaskAssignTo.results[j].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                                IsFillVisible = 'inline-block';
                            }
                            var UserAttachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[j].EMail);
                            tr += '<div class="flexitem" style="float:left;"><img src="' + UserAttachment + '" title="' + TaskAssignTo.results[j].Title + '" class="notificationimg" alt=""></div>';
                        }
                    }
                }
                if (items[i].StartDate != null) {
                    StartDateHTML = '<span class="datenow">Date:&nbsp</span><span class="">' + titanForWork.ShowCommonStandardDateFormat(new Date(items[i].StartDate)) + '</span>';
                }
                else {
                    StartDateHTML = '';
                }
                if (items[i].Status == 'Active') {//Completed
                    if (items[i].CompletionDate != null) {
                        DueDateHTML = '<span class="datenow">Completed:&nbsp</span><span>' + titanForWork.ShowCommonStandardDateFormat(new Date(items[i].CompletionDate)) + '</span>';
                    }
                    else {
                        DueDateHTML = '';
                    }
                }
                else {
                    if (items[i].EndDate != null) {
                        var classTitle = '';
                        var EndDate = new Date(items[i].EndDate);
                        EndDate.setDate(EndDate.getDate());
                        EndDate = new Date(EndDate);
                        if (CurrentDate > EndDate) {
                            classTitle = 'redcolorshow';
                        }
                        DueDateHTML = '<span class="datenow ' + classTitle + '">Due:&nbsp</span><span class="' + classTitle + '">' + titanForWork.ShowCommonStandardDateFormat(new Date(items[i].EndDate)) + '</span>';
                    }
                    else {
                        DueDateHTML = '';
                    }
                }

                if (items[i].MandatoryCompletion != null && items[i].MandatoryCompletion != false) {
                    MandatoryHTML = '&nbsp&nbsp<span class="MandatoryToComplete"><i class="fa fa-exclamation-circle" style="font-size: 23px;color: maroon;"></i></span>';
                }
                else {
                    MandatoryHTML = '';
                }

                var CompletionPercent = items[i].Completion ? items[i].Completion : '0';
                tr += '</div></td><td><div class="assignbybox"><h4>' + items[i].Author.Title + '</h4>';
                tr += StartDateHTML + '</div></td><td><div class="statussetion">';
                tr += DueDateHTML + MandatoryHTML + ' </div><select class="form-control mangewidth" id="ddlDepStatus' + i + '" onchange="UpdateDepdncyStatus(' + i + ', \'' + itemId + '\', ' + TaskId + ')" ' + IsStatusDisable + '>';
                tr += '<option value="Inactive">Open</option><option value="Active">Completed</option><option value="Canceled">Canceled</option><option value="Hold">Hold</option></select>';
                tr += '<div class="flexrange" onmouseover="SlideCompPercent(' + i + ')">';
                tr += '<input type="range" min="0" max="100" value="' + CompletionPercent + '" class="slider" id="progressetion' + i + '" onchange="UpdateCompletionPercent(' + i + ', \'' + itemId + '\', ' + TaskId + ')" ' + IsStatusDisable + '>';
                tr += '<h2 class="m-0 md-8"><span id="barvalue' + i + '" class="slider-txt-green">' + CompletionPercent + '%</span></h2></div></td><td>';
                tr += '<div class="actiondefine"><button type="button" style="display:' + IsFillVisible + '" class="btn btn-danger custom-btn-two custom-btn-two-danger mt-16" onclick="timeSheetEntry(' + TaskId + ',' + itemId+ ')">Fill';
                tr += '</button><button type="button" style="display:' + Visibility + '" class="editcircle" onclick="EditDependency(\'' + itemId + '\', ' + TaskId + ');"><i class="fa fa-pencil"></i></button></div></td></tr>';

                $('#taskDependencyTaskInbox').append(tr);
                $("#ddlDepStatus" + i).val(items[i].Status);
            }

            //$('#taskTitleForLnbox').text(taskTitle);
        }
    });
}


//Edit dependency details
function EditDependency(DependencyId, TaskId) {
    var arrTaskTemp = [];
    $("#btnAddDependency").text('Update');
    $("#StartDateAsTask").prop("checked", "");
    $(".StartDependecyDate").prop("disabled", "");
    $("#DueDateAsTask").prop("checked", "");
    $(".DueDependecyDate").prop("disabled", "");
    $("#SelectedDepId").text(DependencyId);
    var Query = "?$top=5000&$select=*,ID,Title,Details,Status,AssignedTo/Title,AssignedTo/EMail,Author/Title,AssignedTo/ID,TaskId/ID,TaskId/Title,AttachmentFiles&$Expand=Author,AttachmentFiles,AssignedTo,TaskId&$filter=ID eq'" + DependencyId + "'";
    $.when(getLimitedItems('TaskDependencies', Query)).done(function (TaskDependency) {
        var items = TaskDependency.results;
        if (items.length > 0) {
            $("#StartDateHTML").show();
            $("#DueDateHTML").show();
            $("#txtTitle").val(items[0].Title);
            if (items[0].AssignedTo.results != null) {
                for (var j = 0; j < items[0].AssignedTo.results.length; j++) {
                    SetAndResolvePeoplePicker('AssaginToDependency', items[0].AssignedTo.results[j].EMail, false);
                }
            }

            //check if the Task belongs to Inbox or outbox
            arrTaskTemp = arrAllTaskInbox.filter(function (obj) {
                return obj.Id == TaskId;
            });
            if (arrTaskTemp.length == 0) {
                arrTaskTemp = arrAllTaskOutbox.filter(function (obj) {
                    return obj.Id == TaskId;
                });
            }
            $("#txtDetails").val(items[0].Details);
            if (items[0].StartDate != null) {
                if (new Date(items[0].StartDate) == new Date(arrTaskTemp[0].StartDate)) {
                    $("#StartDateAsTask").prop("checked", "checked");
                    $(".StartDependecyDate").val('');
                    $(".StartDependecyDate").prop("disabled", "disabled");
                }
                else {
                    $(".StartDependecyDate").prop("disabled", "");
                    $(".StartDependecyDate").val(moment(new Date(items[0].StartDate)).format("MMMM D, yy"));
                    $("#StartDateAsTask").prop("checked", "");
                }
            }
            else {
                $(".StartDependecyDate").prop("disabled", "");
                $("#StartDateAsTask").prop("checked", "");
            }
            if (items[0].EndDate != null) {
                if (new Date(items[0].EndDate) == new Date(arrTaskTemp[0].DueDate)) {
                    $("#DueDateAsTask").prop("checked", "checked");
                    $(".DueDependecyDate").val('');
                    $(".DueDependecyDate").prop("disabled", "disabled");
                }
                else {
                    $(".DueDependecyDate").prop("disabled", "");
                    $(".DueDependecyDate").val(moment(new Date(items[0].EndDate)).format("MMMM D, yy"));
                    $("#DueDateAsTask").prop("checked", "");
                }
            }
            else {
                $(".DueDependecyDate").prop("disabled", "");
                $("#DueDateAsTask").prop("checked", "");
            }
            if (items[0].MandatoryCompletion == true) {
                $("#chkIsMandatory").prop("checked", "checked");
            }
            else {
                $("#chkIsMandatory").prop("checked", "");
            }
            //Bind attachments
            if (items[0].AttachmentFiles.results.length > 0) {
                var savedAttach = '';
                for (var attach = 0; attach < items[0].AttachmentFiles.results.length; attach++) {
                    savedAttach += '<span class="minattachmentbox" id="UploadedFile' + attach + '"><a style="color: black;" class="DependencyAttach" href="' + items[0].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>' + items[0].AttachmentFiles.results[attach].FileName + '</a>';
                    savedAttach += '<span class="fa fa-close fa-lg" style="color:red;" onclick="DeleteAttachment(' + items[0].Id + ', \'' + items[0].AttachmentFiles.results[attach].FileName + '\', ' + attach + ', ' + TaskId + ');" title="Delete"></span></span>';
                }
                $('#DepFileName').empty().append(savedAttach);
            }
            $("#dependenciesmodl").modal('show');
        }
    });
}

//Delete the Dependecy attachment
function DeleteAttachment(ItemId, fileName, HTMLCount, TaskId) {
    if (confirm("Are you sure, you want to delete this attachment?")) {
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
                $('#UploadedFile' + HTMLCount).remove();
                taskDependency(TaskId, true);
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
    if ($("#ddlDepStatus" + IdCOunt).val() == "Hold" || $("#ddlDepStatus" + IdCOunt).val() == "Canceled") {
        Metadata["MandatoryCompletion"] = false;
    }
    UpdateTaskList('TaskDependencies', Metadata, DependencyId);
    taskDependency(TaskId, true);
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
    taskDependency(TaskId, true);
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


function timeSheetHours(currentrow, itemid) {
    $('#TaskTitleOfTimeSheet').text("");
    if ($(currentrow).hasClass('hourbtn')) {
        //$(currentrow).hide();
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
                $('#TaskTitleOfTimeSheet').text(decodeURI(currentrow.name));
                var currenth4 = $(currentrow).parent().closest(":has(.hourbtn)").find('.hourbtn');
                currenth4[0].outerHTML = "<h4><strong>" + ConvertHHMM(TotalLoginMinutes) + " (H:M)" + "</strong></h4>";
                //currenth4[0].innerHTML = ConvertHHMM(TotalLoginMinutes) + " (H:M)";
            }
            else {
                tr += "<div class='col-md-12 col-sm-12 timesheet-entry-reply-box'><div class='timesheet-entry-reply-author-detail px-0'><span><span >No Logged hour Found</span>" +
                        "<span class='ml-4'><span></span></span> <span><span></span></span></span> <span></span></div><h4></h4></div>";

                $('#timeSheetAllHours').append(tr);
                var currenth4 = $(currentrow).parent().closest(":has(.hourbtn)").find('.hourbtn');
                currenth4[0].outerHTML = "<h4><strong>00:00 (H:M)" + "</strong></h4>";

                var taskTitelText = $(currentrow).parent().parent().find("td:eq(0) a").text();
                $('#TaskTitleOfTimeSheet').text(decodeURI(currentrow.name));
            }
        },
        error: function (error) {
            console.log("Error occured");
        }
    })
}

function myAllProject() {
    $("#UserAllProject").empty();
    $("#UserAllProjectTaskOutBox").empty();
    var uniqueValues = [];
    var result,
    	splittedProjectName = '';
    $('<option value="All">All</option>').appendTo("#UserAllProject");
    $('<option value="General Task">General Task</option>').appendTo("#UserAllProject");
    $('<option value="All">All</option>').appendTo("#UserAllProjectTaskOutBox");
    $('<option value="General Task">General Task</option>').appendTo("#UserAllProjectTaskOutBox");

    var listName = 'ProjectTeamDetails';
    var Logged_CompanyId = Logged_CompanyId;
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=DocumentPermission,TeamMember/Id,Project/Id,Project/ProjectName&$expand=TeamMember,Project&$filter=TeamMemberId eq '" + _spPageContextInfo.userId + "' and Status eq 'Active'"; //CompanyId eq '" + Logged_CompanyId + "' and 
    $.ajax({
        url: siteURL,
        type: "get",
        async: false,
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;

            $.each(valuesArray, function (i, el) {
                if (uniqueValues.indexOf(el.Project.Id) == -1) {
                    uniqueValues.push(el.Project.Id);
                    if (parseInt(el.Project.ProjectName.length) > 34) {
                        splittedProjectName = el.Project.ProjectName.substring(0, 34) + "...";
                    }
                    else {
                        splittedProjectName = el.Project.ProjectName;
                    }
                    option += "<option value='" + el.Project.Id + "' title='" + el.Project.ProjectName + "'>" + splittedProjectName + "</option>";
                }
            });
            $("#UserAllProject").append(option);
            $("#UserAllProjectTaskOutBox").append(option);
        },
        error: function (data) {
            console.log(data.responseJSON.error);
        }
    });
}

function bindAllWorkType() {
    $("#WorkTypeOfProject").empty();
    $("#WorkTypeOfProjectOutbox").empty();

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
                $("#WorkTypeOfProjectOutbox").append('<option value="' + response.d.results[index].CatogeryName + '">' + response.d.results[index].CatogeryName + '</option>');
            }
        }, myError: function (response) {
            waitingDialog.hide();
        }
    });
}

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

function timeSheetEntry(taskid,DependencyId) {
    var url = _spPageContextInfo.webAbsoluteUrl + "/Pages/TimeSheetEntry.aspx?WebAppId=" + Logged_CompanyId + "&Dependency=" + window.btoa(DependencyId) + "&TaskId=" + window.btoa(taskid) + "&Mode=" + window.btoa('Add') + "&sourcelocation=../Pages/timesheet.aspx";
    window.location.href = url;
}
function taskDepTimeSheetEntry(taskid, itemid) {
    var url = _spPageContextInfo.webAbsoluteUrl + "/Pages/TimeSheetEntry.aspx?WebAppId=" + Logged_CompanyId + "&Dependency=" + window.btoa(itemid) + "&TaskId=" + window.btoa(taskid) + "&Mode=" + window.btoa('Add') + "&sourcelocation=../Pages/timesheet.aspx";
    window.location.href = url;
}

function GetOwnerUser() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Employees')/Items?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID &$expand=LogonName,Department,Company &$filter= LogonName eq '" + _spPageContextInfo.userId + "' and CompanyId eq '" + Logged_CompanyId + "'";
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

function assigntouser(id) {
    $("#assigntodrp").empty();
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Employees')/Items?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID&$orderby= FullName asc &$expand=LogonName,Department,Company&$top=5000&$Filter=ParentId eq " + id + " and Status eq 'Active' and CompanyId eq '" + Logged_CompanyId + "'";
    $.ajax({
        url: Ownurl,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;
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


function MutipleBaseFilter(TaskOutCome) {
    $("#SeeMoreInbox").hide();
    arrTaskInIds = [];
    $("#SeeMoreFilterInbox").show();
    arrFilterDataBind = [];
    var TaskinboxChip = "",
        FilterQuery = "",
        assigntoQuery = '',
        assigntobyme = [];
    FilterLocalStorage = [];

    //Filter value display starts
    if ($('#UserAllProject').val() != "All") {
        if ($('#UserAllProject').val() == "General Task") {
            TaskinboxChip += "<div class='upload-chip'>General Task</div>";
        }
        else {
            if ($('#ddlInboxProject').val() != "All") {
                TaskinboxChip += "<div class='upload-chip'>" + $('#ddlInboxProject option:selected').text() + "</div>";
            }
            else {
                TaskinboxChip += "<div class='upload-chip'>" + $('#ddlInboxProject option:selected').text() + "</div>";
            }
        }
    }
    FilterLocalStorage.push($('#UserAllProject').val() + '|' + $('#ddlInboxProject').val() + '|' + $('#ddlInboxProject option:selected').text());

    if ($('#ProjectModule').val() != "All") {
        var ModuleValue2 = $('#ProjectModule').val();
        TaskinboxChip += "<div class='upload-chip'>" + $('#ProjectModule option:selected').text() + "</div>";
    }
    FilterLocalStorage.push($('#ProjectModule').val());

    if ($('#ddlInboxClient').val() != "All") {
        TaskinboxChip += "<div class='upload-chip'>" + $('#ddlInboxClient option:selected').text() + "</div>";
    }
    FilterLocalStorage.push($('#ddlInboxClient').val() + '|' + $('#ddlInboxClient option:selected').text());

    if ($('#WorkTypeOfProject').val() != "All") {
        TaskinboxChip += "<div class='upload-chip'>" + $('#WorkTypeOfProject option:selected').text() + "</div>";
    }
    FilterLocalStorage.push($('#WorkTypeOfProject').val());

    if ($('#txtPriority').val() != "All") {
        TaskinboxChip += "<div class='upload-chip'>" + $('#txtPriority option:selected').text() + "</div>";
    }
    FilterLocalStorage.push($('#txtPriority').val());

    if ($('#txtFilterStatusInbox').val() != "All") {
        TaskinboxChip += "<div class='upload-chip'>" + $('#txtFilterStatusInbox option:selected').text() + "</div>";
    }
    FilterLocalStorage.push($('#txtFilterStatusInbox').val());

    if ($('#taskIn').val() != null && $('#taskIn').val() != "") {
        if (TaskOutCome == "TaskPending") {
            TaskinboxChip += "<div class='upload-chip'>Pending</div>";
            FilterLocalStorage.push(moment($("#taskIn").val()).format("DD/MMM/YYYY") + '|' + TaskOutCome);
        }
        else if (TaskOutCome == "TaskOverdue") {
            TaskinboxChip += "<div class='upload-chip'>Overdue</div>";
            FilterLocalStorage.push(moment($("#taskIn").val()).format("DD/MMM/YYYY") + '|' + TaskOutCome);
        }
        else {
            TaskinboxChip += "<div class='upload-chip'>" + moment($("#taskIn").val()).format("DD/MMM/YYYY") + "</div>";
            FilterLocalStorage.push(moment($("#taskIn").val()).format("DD/MMM/YYYY") + '|' + TaskOutCome);
        }
    }
    else {
    	FilterLocalStorage.push("null");
    }

    if ($("#pplassigntoInbox_TopSpan_ResolvedList").text() != "") {
        getUserInformation('pplassigntoInbox');
        TaskinboxChip += "<div class='upload-chip'>" + assignBy.join(', ') + "</div>";
        FilterLocalStorage.push(assignByEmail);
    }
    else {
        FilterLocalStorage.push([]);
        TaskinboxChip += "<div class='upload-chip'>" + _spPageContextInfo.userDisplayName + "</div>";
        assignByEmail = "";
    }
    
         var StartDate = $('#fromDatetaskIn').val();
         if(StartDate != "") {
             StartDate = moment(StartDate).format("MM/DD/YYYY");
             TaskinboxChip += "<div class='upload-chip'>" + StartDate + "</div>";
         }
         var toDate = $('#toDatetaskIn').val();
         if(toDate != "") {
             toDate = moment(toDate).format("MM/DD/YYYY");
             TaskinboxChip += "<div class='upload-chip'>" + toDate + "</div>";
         }
         if(StartDate > toDate) {
             alert("Assigned Date From is greater than Assigned Date To");
             return false;
         }

    
    
    //Filter value display ends
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    arrFilterDataBind = arrAllTaskInbox.filter(function (obj, index) { //Filter array
        FilterQuery = '';

        if ($('#UserAllProject').val() != "All") {
            if ($('#UserAllProject').val() == "General Task") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.ProjectFullName != "" : obj.ProjectFullName == ProjectValue);
            }
            else if ($('#UserAllProject').val() == "TeamMeeting") {
                var ProjectValue = null;
                var ProjectFilter = (ProjectValue == "All" ? obj.TaskCategory != "" : obj.TaskCategory == $('#UserAllProject').val());
            }
            else if ($('#UserAllProject').val() == "TeamChannel") {
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
    arrDataBind = arrFilterDataBind.filter(function (f) { return f; })

    $("#myTaskInboxChip").empty();
    $("#myTaskInboxChip").append(TaskinboxChip);
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
    $(".mainDivAllAnnouncements").empty();
    BindInboxTasks(arrDataBind);
}

function redirectModifyTask(Action) {
    localStorage.setItem("FilterLocalOutStorage", FilterLocalOutStorage.toString());
    localStorage.setItem("FilterLocalStorage", FilterLocalStorage.toString());
    location.href = Action.name + "&source=" + $('ul#myTabs').find('li.active').attr('id');
}

function ClearFilter() {
    $('#UserAllProject').val("All");
    $("#UserAllProject").trigger("change");
    $('#ProjectModule').val("All");
    $('#WorkTypeOfProject').val("All");
    $('#txtPriority').val("All");

    $('#ddlInboxClient').empty().append("<option value='All'>All</option>");
    $('#ddlInboxProject').empty().append("<option value='All'>All</option>");
    localStorage.removeItem("FilterLocalStorage");
    $('#taskIn').val('');
      
    $('#fromDatetaskIn').val('');
    $('#toDatetaskIn').val('');


    $('#txtFilterStatusInbox').val("Open");
    clearPeoplePickerControl("pplassigntoInbox");
    var Current = "Open";
    var AssignTodata = _spPageContextInfo.userEmail;
    $("#myTaskInboxChip").empty();

    //Bind the page load data
    $(".mainDivAllAnnouncements").empty();
    $("#SeeMoreFilterInbox").hide();
    var TaskinboxChip = '';
    TaskinboxChip += "<div class='upload-chip'>Open</div>";
    $("#myTaskInboxChip").empty();
    $("#myTaskInboxChip").append(TaskinboxChip);
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

    BindInboxTasks(arrDataBind);
    if (arrDataBind.length == 0) {
        $(".NoRecordFound").show();
        $("#SeeMoreInbox").hide();
    }
    else {
        $(".NoRecordFound").hide();
    }
}

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

//to genrate excel of Task In table
function generateTaskInExcel() {
    $('#TempTableQuestions').tableExport({
        //type: 'excel',
        type: 'csv',
        exportHiddenCells: true,
        fileName: "Task-In",
        ignoreColumn: [0, 3, 5, 7, 9, 10, 11, 12, 13, 16],
    });
    currentDlg.close();
}

//get Pending and Overdue tasks count
function GetTaskInboxCount() {
    var InboxHtmlPending = '';
    var InboxHtmlOverDue = '';
    var pendingCounter = 0;
    var overdueCounter = 0;
    var CurrentDate = new Date();
    CurrentDate = CurrentDate.setHours(0, 0, 0, 0);
    CurrentDate = new Date(CurrentDate);
    for (var i = 0; i < arrLimitTaskInbox.length; i++) {
        var DueDate = new Date(moment(arrLimitTaskInbox[i].DueDate.split('T')[0]).format("MM/DD/YYYY"));
        DueDate.setDate(DueDate.getDate());
        DueDate = new Date(DueDate);
        if (DueDate >= CurrentDate) {
            pendingCounter++;
        }
        else {
            overdueCounter++;
        }
    }
    InboxHtmlOverDue += parseInt(overdueCounter) + parseInt(overdueCountForDependency);
    InboxHtmlPending += parseInt(pendingCounter) + parseInt(pendingCountForDependency);

    $("#TaskOverdue").text(InboxHtmlOverDue);
    $("#TaskPending").text(InboxHtmlPending);
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

    if (arrAllTaskInbox.length > 0) {
        arrComplatedTasks = arrAllTaskInbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "completed"
        });
        arrOpenTasks = arrAllTaskInbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "open"
        });
        arrHoldTasks = arrAllTaskInbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "hold"
        });
        arrCancelTasks = arrAllTaskInbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "cancelled"
        });
        arrCloseTasks = arrAllTaskInbox.filter(function (data) {
            return data.CurrentPhase.toLowerCase() == "close"
        });
        if (arrComplatedTasks.length == 0 && arrOpenTasks.length == 0 && arrHoldTasks.length == 0 && arrCancelTasks.length == 0 && arrCloseTasks.length == 0) {
            $("#pie").hide();
        }

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
    localStorage.removeItem("FilterLocalStorage");
    $('#taskIn').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusInbox').val("Open");
    clearPeoplePickerControl("pplassigntoInbox");
    var Current = "Open";
    var AssignTodata = _spPageContextInfo.userId;
    $("#myTaskInboxChip").empty();

    $('#txtFilterStatusInbox option').filter(function () {
        return ($(this).text() == "Open"); //To select text wise
    }).prop('selected', true)
    document.getElementById("taskIn").valueAsDate = new Date();
    MutipleBaseFilter("TaskPending");

}

//get data on 'Task Overdue' click
function SetTaskOverdue() {
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
    localStorage.removeItem("FilterLocalStorage");
    $('#taskIn').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusInbox').val("Open");
    clearPeoplePickerControl("pplassigntoInbox");
    var Current = "Open";
    var AssignTodata = _spPageContextInfo.userId;
    $("#myTaskInboxChip").empty();

    $('#txtFilterStatusInbox option').filter(function () {
        return ($(this).text() == "Open"); //To select text wise
    }).prop('selected', true)
    document.getElementById("taskIn").valueAsDate = new Date();
    MutipleBaseFilter("TaskOverdue");

}


//filter data on status when data click and chat segment
function clickInboxChart(Action) {
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
    localStorage.removeItem("FilterLocalStorage");
    $('#taskIn').val('')
      .attr('type', 'text')
      .attr('type', 'date');

    $('#txtFilterStatusInbox').val("Open");
    clearPeoplePickerControl("pplassigntoInbox");
    var Current = "Open";
    var AssignTodata = _spPageContextInfo.userId;
    $("#myTaskInboxChip").empty();

    $('#txtFilterStatusInbox option').filter(function () {
        return ($(this).text() == Action.data.label); //To select Blue
    }).prop('selected', true)
    MutipleBaseFilter("PieChart");
    //console.log(Action.data.label);
}

//Read department for projects Inbox
function ReadInDepartment() {
    var splittedDeptName = "";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?select=ID,Title&$top=5000&$orderby=Title asc";//&$filter=CompanyID eq '" + Logged_CompanyId + "'
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
            else {
                waitingDialog.hide();
            }
        },
        error: function (data) {
            waitingDialog.hide();
            console.log("An error occurred in ReadInDepartment method." + data);
        }
    });
}


//get list of projects for Inbox
function loadprojectInsearch() {
    var ProjectsListunique = '';
    var ProjectsList = [];
    var tableItemsHTML = '';
    $(".ProjectInTables").empty();
    var CountProject = 0;
    var Projecturl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items?$select=*,TeamMember/EMail&$top=5000&$expand=TeamMember&$filter=TeamMember/EMail eq ('" + _spPageContextInfo.userEmail + "') and Status eq 'Active' and TaskPermission eq '1'&$orderby=Project asc";
    $.ajax({
        url: Projecturl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                for (var x = 0; x < items.length; x++) {
                    ProjectsList.push(items[x].ProjectId);
                }
                ProjectsListunique = ProjectsList.filter(function (itm, i, ProjectsList) {
                    return i == ProjectsList.indexOf(itm);
                });
            }
            else {
                waitingDialog.hide();
            }
        },
        error: function (data) {
            waitingDialog.hide();
            console.log(data);
        }
    });

    var UserProjectList = [];
    for (var K = 0; K < ProjectsListunique.length; K++) {
        var PROJID = ProjectsListunique[K];
        var sTatuS = $('select#StatusInProj option:selected').val();
        var Department = $('select#DeptsInboxProject option:selected').val();

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

                                tableItemsHTML += "<tr><td><input type='radio' class='ProjectInchkList' name='TaskInListchk' title='" + items[i].ProjectName + "' value='" + itemId + "'></td>";
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
                    $(".ProjectInTables").append(tableItemsHTML);
                    $("#tableInLocation").show();
                    TableConfigInboxProject();
                }
                waitingDialog.hide();
            },
            error: function (data) {
                waitingDialog.hide();
                console.log(data);
            }
        });
    }
    if (CountProject == 0) {
        tableItemsHTML += "<tr><td class='NoRecordFound' colspan='4' style='text-align: center;font-size:14px;' data-localize='NoRecordFound'>No record found!!</td></tr>"
        $(".ProjectInTables").append(tableItemsHTML);
        $("#tableInLocation").hide();
        waitingDialog.hide();
    }
    else {
        $("#TotalInCountProject").text(CountProject);
    }

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

function ShowLocalStorageData() {
    if (localStorage.getItem("FilterLocalStorage") != null && localStorage.getItem("FilterLocalStorage") != "") {
        if ($('#WorkTypeOfProject option').length == 0) {
            bindAllWorkType();
        }
        var StorageTaskOutcome = '';
        var filterVal = localStorage.getItem("FilterLocalStorage");

        filterVal = filterVal.split(',');
        if (filterVal[0] != null && filterVal[0] != "null") {
            var ProjFilter = filterVal[0].split("|");
            $("#UserAllProject").val(ProjFilter[0]);
            $("#UserAllProject").trigger("change");
            if (ProjFilter[0] == "Projects") {
                $(".projectDiv").show();
                $("#ddlInboxProject").html('');
                if (ProjFilter[1] != "All") {
                    $("#ddlInboxProject").empty().append('<option value="' + ProjFilter[1] + '" Selected>' + ProjFilter[2] + '</option>');
                }
                else {
                    $('#ddlInboxProject').empty().append("<option value='All'>All</option>");
                }
            }
            else {
                $(".projectDiv").hide();
            }
        }
        $('#ProjectModule').val(filterVal[1]);

        if (filterVal[2] != null && filterVal[2] != "null") {
            var ClientFilter = filterVal[2].split("|");
            if (ClientFilter[0] != "All") {
                $(".ClientDiv").show();
                $("#ddlInboxClient").html('');
                $("#ddlInboxClient").empty().append('<option value="' + ClientFilter[0] + '" Selected>' + ClientFilter[1] + '</option>');
            }
            else {
                $('#ddlInboxClient').empty().append("<option value='All'>All</option>");
            }
        }

        $('#WorkTypeOfProject').val(filterVal[3]);
        $('#txtPriority').val(filterVal[4]);
        $('#txtFilterStatusInbox').val(filterVal[5]);
        if (filterVal[6] != null && filterVal[6] != "null" && filterVal[6] != "") {
            var DueDateFilter = filterVal[6].split("|");
            $('#taskIn').val(moment(new Date(DueDateFilter[0])).format("MMMM D, yy"));
            StorageTaskOutcome = DueDateFilter[1];
        }

        if (filterVal[7] != null && filterVal[7] != "null" && filterVal[7] != "") {
            var assignByFilter = filterVal[7].split("|");
            for (var user = 0; user < (assignByFilter.length - 1) ; user++) {
                SetAndResolvePeoplePicker('pplassigntoInbox', assignByFilter[user], false);
            }
            $(window).load(function () {
                var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict["pplassigntoInbox_TopSpan"];
                if (peoplePicker.HasResolvedUsers()) {
                    MutipleBaseFilter(StorageTaskOutcome);
                }
                else {
                    var interval = setInterval(function () {
                        var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict["pplassigntoInbox_TopSpan"];
                        if (peoplePicker.HasResolvedUsers()) {
                            clearInterval(interval);
                            MutipleBaseFilter(StorageTaskOutcome);
                        }
                    }, 1000);
                }
            });
        }
        else {
            MutipleBaseFilter(StorageTaskOutcome);
        }
    }
}

//to sort table as per the selected option
function SortTable(Name) {
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

//Project table sort
function SortProjectTable(Name) {
    if (Name == "Project Name") {
        $(".ProjectSort").trigger("click");
    }
    else if (Name == "Customer") {
        $(".CustomerProjSort").trigger("click");
    }
}

//get reminders created by Logged_In user
function getReminders() {
    var RemHTML = '',
		arrRemind = [],
		TaskDes = '',
		DueDate = '',
		ReminderValue = '',
		DateText = '';
    var Query = "?$top=5000&$select=*,Author/EMail&$expand=Author&$filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getLimitedItems('Reminders', Query)).done(function (ReminderResults) {
        var items = ReminderResults.results;
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                arrRemind = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of ItemId
                    return obj.Id == items[i].ItemId;
                });
                if (arrRemind.length == 0) {
                    arrRemind = arrAllTaskOutbox.filter(function (obj) { //Filter array on the basis of ItemId
                        return obj.Id == items[i].ItemId;
                    });
                }
                //set task - type
                if (arrRemind.length > 0) {
                    RemHTML += '<tr><td><h4 class="taskse">' + items[i].Title + '</h4><div class="prjectdivide">';
                    if (arrRemind[0].ProjectFullName == null) {
                        TaskDes = "<b>Client:</b> " + arrRemind[0].ClientID.Title;
                    }
                    else {
                        TaskDes = "<b>Project:</b> " + arrRemind[0].ProjectFullName;
                    }
                    if (arrRemind[0].CurrentPhase == "Completed" || arrRemind[0].CurrentPhase == "Close") {
                        DateText = "Completed";
                        DueDate = new Date(arrDataBind[i].CompletionDate);
                        DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);
                    }
                    else {
                        DateText = "Due";
                        DueDate = new Date(arrRemind[0].DueDate);
                        DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);
                    }
                    if (items[i].ReminderType == "Once") {
                        ReminderValue = titanForWork.ShowCommonStandardDateFormat(new Date(items[i].OnDate));
                    }
                    else if (items[i].ReminderType == "Monthly") {
                        ReminderValue = "Day Of Every Month: " + items[i].DayOfEveryMonth;
                    }
                    else if (items[i].ReminderType == "Weekly") {
                        ReminderValue = items[i].WeekDays.results.toString();
                    }
                    else {
                        ReminderValue = 'Daily';
                    }
                    if (items[i].Active == true) {
                        Active = 'ON';
                        IsChecked = 'checked';
                        //$("#ReminderStatus").css("text-align", "right");
                    }
                    else {
                        Active = 'OFF';
                        IsChecked = '';
                        //$("#ReminderStatus").css("text-align", "left");
                    }
                    RemHTML += '<span class="projectdescription">' + TaskDes + '</span></div><div class="prjectdivide">';
                    RemHTML += '<span class="projectdescription">Status:</span><span class="descriptionboxhere">' + arrRemind[0].CurrentPhase + ', ' + DateText + ':<span>' + DueDate + '</span></span>';
                    RemHTML += '</div></td><td><div class="totaltime">' + ReminderValue + '</div><div class="dailyschedule">' + items[i].AtTime + '</div></td><td>';
                    RemHTML += '<div class="switchboxsec"><label class="switch"><input type="checkbox" class="texcopy" ' + IsChecked + '>';
                    RemHTML += '<span class="slider round onsec EditRemStatus" id="' + items[i].Id + '" style="text-align: left; padding: 3px 5px; font-size: 11px;">' + Active + '</span></label></div></td>';
                    RemHTML += '<td><button type="button"class="editcircle" onclick="EditReminder(' + items[i].Id + ', ' + items[i].ItemId + ')" data-toggle="modal" data-target="#setreminder"><i class="fa fa-pencil"></i></button></td></tr>';
                }
            }
            $("#tbdyReminder").empty().append(RemHTML);

            $('.EditRemStatus').click(function () {
                var Metadata;
                var ReminderActive = false;
                if (this.textContent.toLowerCase() == "off") {
                    ReminderActive = true;
                }
                var ItemType = GetItemTypeForListName('Reminders');
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Active: ReminderActive
                };
                UpdateTaskList('Reminders', Metadata, this.id);
                //alert("Task's reminder has been updated.");
            });

            $('.texcopy[type="checkbox"]').click(function () {
                if ($(this).is(':checked')) {
                    $(this).siblings('.onsec').text('ON').css('text-align', 'left');
                }
                else {
                    $(this).siblings('.onsec').text('OFF').css('text-align', 'right');
                }
            });
            $("#reminders").modal('show');
        }
        else {
            alert("No reminder created.");
            return false;
        }
    });
}

//set reminder metadata in modal to update
function EditReminder(ReminderId, TaskId) {
    //$("#btnSetReminder").hide();
    //$("#btnUpdateReminder").show();
    var arrtemp = [];
    //$("#ReminderStatus").trigger("click");
    var Query = "?$top=5000&$select=*,Author/EMail&$expand=Author&$filter=Id eq '" + ReminderId + "' ";
    $.when(getLimitedItems('Reminders', Query)).done(function (ReminderResults) {
        var items = ReminderResults.results;
        if (items.length > 0) {
        	$("#txtReminderMsg").val(items[0].Message);
            $("#AtTime").val(items[0].AtTime);
            if (items[0].ReminderType == "Once") {
                $("#OnceTime").prop('checked', 'checked');
                $("#OnceTime").trigger('click');
                $("#ReminderOnDate").val(moment(new Date(items[0].OnDate)).format("MMMM D, yy"));
            }
            else if (items[0].ReminderType == "Monthly") {
                $("#MonthlyTime").prop('checked', 'checked');
                $("#multdy").val(items[0].DayOfEveryMonth);
                $("#MonthlyTime").trigger('click');
            }
            else if (items[0].ReminderType == "Weekly") {
                for (var day = 0; day < items[0].WeekDays.results.length; day++) {
                    $("#" + items[0].WeekDays.results[day]).prop('checked', 'checked');
                }
                $("#WeeklyTime").prop('checked', 'checked');
                $("#WeeklyTime").trigger('click');
            }
            else {
                $("#DailyTime").prop('checked', 'checked');
                $("#DailyTime").trigger('click');
            }

            if (items[0].RemiderSetFor == "Assignee") {
                $("#chkAssigneeReminder").prop('checked', 'checked');
            }
            else if (items[0].RemiderSetFor == "Assignee") {
                $("#chkDependReminder").prop('checked', 'checked');
            }
            else {
                $("input[value='" + items[0].RemiderSetFor + "']").prop('checked', 'checked');
            }

            if (items[0].Active == true) {
                $("#ReminderStatus").text("ON");
                $("#ReminderStatus").css("text-align", "left");
                $("#ReminderStatus").css("background-color", "#2196F3");
                //$("#ReminderStatus").trigger("click");
            }
            else {
                $("#ReminderStatus").text("OFF");
                $("#ReminderStatus").css("text-align", "right");
                $("#ReminderStatus").css("background-color", "#ccc");
                //$("#ReminderStatus").trigger("click");
            }
            arrtemp = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
                return obj.Id == TaskId;
            });
            if (arrtemp.length > 0) {
                arrTaskInIds.push(TaskId);
            }
            else {
                arrTaskIds.push(TaskId);
            }
        }
    });

}