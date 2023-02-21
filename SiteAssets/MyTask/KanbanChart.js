var SelectedBoard = '';
$(document).ready(function () {
    $("#btnBoardSubmit").click(function () {
        if (arrTaskInIds.length > 0) {
            var BoardName = '';
            if ($("#existingbucket").prop('checked') == true) {
                BoardName = $("#ddlExistingBoards").val();
            }
            else if ($("#newboardname").prop('checked') == true) {
            	var tempBoard = [];
            	tempBoard = allBoardName.filter(function( obj ) {
				    return obj.toLowerCase() == $("#txtBoardName").val().toLowerCase();
				});
				if(tempBoard.length == 0) {
					BoardName = $("#txtBoardName").val().trim();
				}
				else {
                	BoardName = tempBoard[0];
				}
            }
            //return false;
            if (BoardName != "") {
                updateBoardName(BoardName);
            }
            else {
                alert("Kindly select/write any board name.");
                return false;
            }
        }
        else {
            alert("Kindly select any task to add in board.");
            return false;
        }
    });
    SortKanbanTasks();
    $(".KanbanClass").click(function () {
        $("#BoardPopupHeader").text("Set Board");
        $("#btnBoardSubmit").show();
        $("#btnBoardOnly").hide();
    });
    $('#btnAddBoard').click(function () {
        $('#board-box .panel-body').css('min-height', '560px');
        $("#BoardPopupHeader").text("Add Board");
        $("#btnBoardSubmit").hide();
        $("#btnBoardOnly").show();
        $("#bucketbox").modal("show");
    });
    $('#btnBoardOnly').click(function () {
        var BoardName = '';
        if ($("#existingbucket").prop('checked') == true) {
            BoardName = $("#ddlExistingBoards").val();
        }
        else if ($("#newboardname").prop('checked') == true) {
            BoardName = $("#txtBoardName").val();
        }
        if (BoardName != "") {
            AddKanbanBoard(BoardName);
        }
        else {
            alert("Kindly select/write any board name.");
            return false;
        }
    });
    $("#btnKanbanFilter").click(function () {
        FilterKanban();
    });
    $("#inboxcalling").click(function () {
        $('.callinginbox').modal('show');
        $('.botheventwork').hide();
        $('#btnTaskInFilter').hide();
        $('#btnTaskInClear').hide();
        $('#btnKanbanFilter').show();
        $('#btnClearKanban').show();
        $('#btnGanttFilter').hide();
        $('#btnGanttClear').hide();
        $("#txtFilterAssignBy").text("Assigned By:");
        if ($('#WorkTypeOfProject option').length == 0) {
            bindAllWorkType();
        }
        $("#taskIn").datepicker();
        $('#taskIn').datepicker("option", "dateFormat", "MM dd, yy");
    });
    $("#btnClearKanban").click(function () {
        ClearKanbanFilter();
    });
    $(".chkAllKanbanTsk").click(function () {
        if (this.checked == true) {
            $(".kanbanOpenTsk").prop('checked', 'checked');
            arrTaskInIds = [];
            arrTaskInIds = arrOpenKanbanTask.filter(function(f){return f;});
        }
        else {
            $(".kanbanOpenTsk").prop('checked', '');
            arrTaskInIds = [];
        }
    });
});

var arrOpenKanbanTask = [];
//bind task while click on 'Add task' - Status with 'Open' and No Board Name
function BindTaskToBoard() {
    var TaskHTML = '',
        TaskName = '',
        TaskMethod = '',
        DueDate = '',
        Priority = '',
        array = [];
    taskchkIn = [];
    arrOpenKanbanTask = [];
    array = arrLimitTaskInbox.filter(function (obj) { //Filter array on the basis of Board Name
        return obj.BoardName == null || obj.BoardName == '';
    });
    for (var i = 0; i < array.length; i++) {
        if (array[i].ProjectFullName == null) {
            TaskMethod = "Client: ";
            TaskName = array[i].ClientID.Title;
        }
        else {
            TaskMethod = "Project: ";
            TaskName = array[i].ProjectFullName;
        }
        if (array[i].DueDate != null) {
            DueDate = new Date(array[i].DueDate);
            DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
        }
        else {
            DueDate = '';
        }
        if (array[i].TaskPriority == "High" || array[i].TaskPriority == "Top") {
            Priority = "block";
        }
        else {
            Priority = "none";
        }
        arrOpenKanbanTask.push(array[i].ID.toString());
        TaskHTML += '<tr><td><input type="checkbox" value="' + array[i].ID + '" class="chbox taskchkIn kanbanOpenTsk"></td><td>';
        TaskHTML += '<div class="dvids"><img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/repeat_circle.png" style="display:none;" alt=""><h3>' + array[i].Title + '</h3></div>';
        TaskHTML += '<div class="dvids"><img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/flag-red.png" style="display:none;" alt="" class="redflg"><div class="wapbox">';
        TaskHTML += '<div class="asigsec"><span class="assignby">Assign by:</span><span class="assignprson">' + array[i].AssignedBy.Title + '</span></div>';
        TaskHTML += '<div class="prosec"><span class="prosecby">' + TaskMethod + '</span><span class="prosecprson">' + TaskName + '</span>';
        TaskHTML += '</div></div></div></td>';
        TaskHTML += '<td><img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/rd_icon.png" alt="" style="display:' + Priority + '" class="redcirle_icon"></td><td><div class="duedatebox">';
        TaskHTML += '<span>Due:</span><span>' + DueDate + '</span></div><div class="progress custom-progress progress-success m-0 mt-4" style="width:124px;">';
        TaskHTML += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + array[i].CompletionPersent + '%"></div></div></td></tr>';
    }
    $("#tbdyOpenTasks").empty().append(TaskHTML);
    $(".taskchkIn").click(function () {
        if (this.checked == true) {
            arrTaskInIds.push(this.value);
        }
        else {
            var selected = this.value;
            $(".chkAllKanbanTsk").prop('checked', '');
            arrTaskInIds = arrTaskInIds.filter(function (obj) {
                return obj !== selected;
            });
        }
    });
}


//to update the board name for tasks
function updateBoardName(BoardName) {
    var Metadata;
    var arrBoards = [];
    var ItemType = GetItemTypeForListName('EmployeeTaskDetails');
    arrTaskInIds.forEach(function (value, i) {
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            BoardName: BoardName
        }
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/GetItemById('" + value + "')",
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
                if ((i + 1) == arrTaskInIds.length) {

                    $(".taskchkIn").prop("checked", '');
                    if ($("#newboardname").prop('checked') == true) {
                    	if (BoardName.toLowerCase() == 'to do' || jQuery.inArray(BoardName.toLowerCase(), allBoardName) != '-1') {
                    		//Do nothing
                		}
                		else {
                        	AddBoard(BoardName);
                		}
                    }
                    else {
                        $("#txtBoardName").val('');
                        $("#ddlExistingBoards").val('To do');
                    }
                    arrLimitTaskInbox.forEach(function (value, i) {
                        for (id = 0; id < arrTaskInIds.length; id++) {
                            if (value.Id == arrTaskInIds[id]) {
                                value.BoardName = BoardName;
                                value.Modified = new Date().toISOString();
                            }
                        }
                    });
                    arrBoards = arrSortBoard = arrLimitTaskInbox.filter(function (obj) { //Filter array on the basis of Board Name
                        return obj.BoardName != null && obj.BoardName != '';
                    });
                    BindBucketName(arrBoards, '');
                    arrTaskInIds = [];
                    alert("The task(s) have been added to the board.");
                }
                dfd.resolve(data);
            },
            eror: function (data) {
                dfd.reject(error);
                console.log("An error occurred while deleting task. " + JSON.stringify(data));
            }
        });
        return dfd.promise();
    });
}


//get the latestBoardName's sequence number and add new one
function AddBoard(BoardName) {
    var NewSeqNumber = 1;
    //get the latest added board Squence_No
    var Query = "?$top=5000&$select=ID,Title,Sequence_No,Author/EMail&$Expand=Author&$filter=Author/EMail eq'" + _spPageContextInfo.userEmail + "'&$orderby=Created desc";
    $.when(getLimitedItems('PlannerBoardList', Query)).done(function (Board) {
        var items = Board.results;
        if (items.length > 0) {
            NewSeqNumber = items[0].Sequence_No;
            NewSeqNumber++;
        }
    });
    //Add the board
    var Metadata;
    var ItemType = GetItemTypeForListName('PlannerBoardList');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: BoardName,
        Sequence_No: NewSeqNumber
    };

    // Add metedata to defined SP list
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PlannerBoardList')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            $("#txtBoardName").val('');
            $("#ddlExistingBoards").val('To do');
            //alert("The tasks has been added into the board.");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}

var allBoardName = [];
//Bind the Bucket name
function BindBucketName(array, Action) {
    var option = '';
    $("#ddlExistingBoards").empty();
    //$("#positionlist").empty();
    $('<option value="To do">To do</option>').appendTo("#ddlExistingBoards");
    var FirstArray = [];
    var Query = "?$top=5000&$select=ID,Title,Author/EMail,Sequence_No&$Expand=Author&$orderby=Sequence_No asc";
    $.when(getLimitedItems('PlannerBoardList', Query)).done(function (Board) {
        var items = FirstArray = Board.results;
        items = removeDuplicates(items, "Title");
        items.pop();
        if (items.length > 0) {
            $.each(items, function (i, value) {
                option += "<option value='" + value.Title + "'>" + value.Title + "</option>";
                //$("#positionlist").append("<option value='" + value.Title + "'>" + value.Sequence_No + "</option>");
                allBoardName.push(value.Title);
            });
            
        }
    });
    //difference = items.filter(x => !array.includes(x));
    var IsDuplicate = [];
    $.each(array, function (i, value) {
        IsDuplicate = FirstArray.filter(function (obj) {
            return obj.Title == value.BoardName;
        });
        if (IsDuplicate.length == [] && value.BoardName != "To do" && value.BoardName != "Doing" && value.BoardName != "Done") {
            option += "<option value='" + value.BoardName + "'>" + value.BoardName + "</option>";
            allBoardName.push(value.Title);
        }
        else {
            IsDuplicate = [];
        }
    });
    $("#ddlExistingBoards").append(option);
    PrepareBoards(array, FirstArray, Action);
}

var bindBoardNames = [];

//Bind Boards
function PrepareBoards(array, BucketArray, Action) {
    var Board = '',
        AlreadyBindBoard = [],
        CurrentBindBoard = [],
        TaskMethod = '',
        TaskName = '',
        DateText = '',
        Priority = '',
        IsToDoBlank = false,
        listRow = [];
    listClass = 1,
    DueDate = '';
    $("#fullydrag").empty();
    
    bindBoardNames = [];
    //Bind 'To do' option first
    CurrentBindBoard = array.filter(function (obj) { //Filter array on the basis of Board Name's Sequence number
        return obj.BoardName == "To do";
    });
    bindBoardNames.push("To do");
    Board += '<div class="dragbox KanbanList" id="todoKanban"><div class="row addtasksec"><div class="col-md-6 KanbanName" style="font-size:12px; color:#1a80d7; font-weight: 600;">To do</div>';
    Board += '<div class="col-md-6" style="text-align: right;"><div class="dropsec" style="display: inline-block; position: relative;">';
    Board += '<button type="button" class="addtaskbutton" name="list' + listClass + '" value="To do"><i class="fa fa-plus"></i> Add Task</button>';
    Board += '</div></div></div>';
    Board += '<ul id="list' + listClass + '" class="listshow" data-value="connect">'; listRow.push("#list" + listClass); listClass++;
    if(CurrentBindBoard.length > 0){
        if(Action == '') {
            CurrentBindBoard.sort(function (a, b) {
                var dateA = new Date(a.Modified), dateB = new Date(b.Modified)
                return dateB - dateA;
            });
        }

        $.each(CurrentBindBoard, function (i, value) {
            if (jQuery.inArray(value.BoardName, AlreadyBindBoard) != '-1') {
                //Do Nothing. Elements contains this already
            }
            else {
                DateText = "Due";
                AlreadyBindBoard.push(value.BoardName);
                for (var i = 0; i < CurrentBindBoard.length; i++) {
                    if (CurrentBindBoard[i].ProjectFullName == null) {
	                    if(CurrentBindBoard[i].TaskCategory == "TeamChannel") {
	                        TaskMethod = "Team Channel: ";
	                        TaskName = CurrentBindBoard[i].TeamItemName;
		                }
		                else if(CurrentBindBoard[i].TaskCategory == "TeamMeeting"){
	                        TaskMethod = "Team Meeting: ";
	                        TaskName = CurrentBindBoard[i].TeamItemName;
		                }
		                else {
	                        TaskMethod = "Client: ";
	                        TaskName = CurrentBindBoard[i].ClientID.Title;
	                    }
                    }
                    
                    else {
                        TaskMethod = "Project: ";
                        TaskName = CurrentBindBoard[i].ProjectFullName;
                    }
                    if (CurrentBindBoard[i].DueDate != null) {
                        DueDate = new Date(CurrentBindBoard[i].DueDate);
                        DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
                    }
                    if (CurrentBindBoard[i].TaskPriority == "High" || CurrentBindBoard[i].TaskPriority == "Top") {
                        Priority = "block";
                    }
                    else {
                        Priority = "none";
                    }
                    if (CurrentBindBoard[i].Title.length > 88) {
                        CurrentBindBoard[i].Title = CurrentBindBoard[i].Title.substr(0, 88) + '...';
                    }
                    if (CurrentBindBoard[i].CurrentPhase == 'Completed') {
                        var color = '#afb83b';
                        DateText = "Completed";
                        DueDate = new Date(CurrentBindBoard[i].CompletionDate);
                        DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);
                    }
                    else if (CurrentBindBoard[i].CurrentPhase == 'Open') {
                        var color = '#14aaf5';
                    }
                    else if (CurrentBindBoard[i].CurrentPhase == 'Hold') {
                        var color = '#ff9933';
                    }
                    else if (CurrentBindBoard[i].CurrentPhase == 'Close') {
                        var color = '#299438';
                        DateText = "Completed";
                        DueDate = new Date(CurrentBindBoard[i].CompletionDate);
                        DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);
                    }
                    else { //Cancelled
                        var color = '#db4035';
                    }
                    var FlagHTML = '';
                    if (CurrentBindBoard[i].SetFlag == "Red") {
                        FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:red"></i>';
                    }
                    else if (CurrentBindBoard[i].SetFlag == "Blue") {
                        FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:blue"></i>';
                    }
                    else if (CurrentBindBoard[i].SetFlag == "Green") {
                        FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:green"></i>';
                    }
                    else if (CurrentBindBoard[i].SetFlag == "Yellow") {
                        FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:#ffa500"></i>';
                    }
                    else {
                        FlagHTML = '';
                    }
                    var dependency="none";
                    if(CurrentBindBoard[i].CurrentPhase=='Open')
                    {
                       dependency="block";
                    }                  

                    CurrentBindBoard[i].CompletionPersent = CurrentBindBoard[i].CompletionPersent ? CurrentBindBoard[i].CompletionPersent : "0";
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(CurrentBindBoard[i].AssignedBy.EMail);
                    Board += '<li id="' + CurrentBindBoard[i].Id + '" style ="border-left: 5px solid ' + color + '"><div class="twopart"><div class="righttpart"><div class="divtwosec" style=""><h3>' + CurrentBindBoard[i].Title + '</h3>';
                    Board += '<div class="dropdown dashboard-table-btn" style="margin-left: auto"><button class="btn dropdown-toggle btnmange ui-KanbanButton" onclick=SelectArray("' + CurrentBindBoard[i].ID + '") type="button" data-toggle="dropdown" aria-expanded="false">';
                    Board += '<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/dotting.png" alt=""></button>';

                    Board += '<ul class="dropdown-menu dropdown-color-menu-icon"><li class="parentlist"><ul>';
                    Board += '<li class="clsCompletion"><a class="dropdown-toggle" id="">';
                    Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/check_icon_1.png" alt=""><span>Mark as Completed</span></a></li>';
                    Board += '<li class="clsProgression"><a href="javascript:void(0);">';
                    Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/percentage-icon.png" alt=""><span>Update Progress</span>';
                    Board += '</a></li></ul></li><li class="parentlist"><ul><li class="AddDepedncy" style="display:' +dependency+ '"><a href="javascript:void(0);" data-toggle="modal" data-target="#dependenciesmodl">';
                    Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/dependency-icon.png" alt=""><span>Add Dependency</span>';
                    Board += '</a></li><li><a class="ModalAddMessage" href="javascript:void(0);"><i class="fa fa-comments-o"></i>';
                    Board += '<span>Add a Message</span></a></li><li><a href="javascript:void(0);" data-toggle="modal" data-target="#Notificationlist">';
                    Board += '<i class="fa fa-envelope-o" aria-hidden="true" style="margin:0px 8px 0 0px !important"></i><span>Notify by mail</span></a></li></ul></li>';
                    Board += '<li class="parentlist"><ul><li id="InboxAddBoard" class="KanbanClass"><a href="javascript:void(0);" data-toggle="modal" data-target="#bucketbox">';
                    Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/collect.png" alt=""><span>Set Board</span></a></li>';
                    Board += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#flagmodal">';
                    Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/flag-icon.png" alt=""><span>Set Flag</span></a></li>';
                    Board += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#setreminder"><i class="fa fa-bell-o" style="margin:0px 8px 0 0px !important"></i>';
                    Board += '<span>Set Reminder</span></a></li><li><a href="javascript:void(0);">';
                    Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/favorite_new-icon.png" alt=""><span>Add to Favorite</span></a></li></ul></li></ul>';

                    Board += '</div></div><div class="assignbynow"><img src="' + attachment + '" alt="" class="assignimg">';
                    Board += '<div class="assignbx"><span class="assignby">Assign by:-</span><span class="clientname">' + CurrentBindBoard[i].AssignedBy.Title + '</span></div></div>';
                    Board += '<div class="projectsec" style="display:block;"><span><span class="pojectdefine">' + TaskMethod + '</span> <span class="projectdefine">' + TaskName + '</span>';
                    Board += '</span></div><div class="flgndprogress"><div class="duedatesec" style="display:inline-block;"><span class="duedate"><span>'+DateText+': </span>' + DueDate + '</span>';
                    Board += '<div class="progress custom-progress progress-success m-0 mt-4" style="width:124px;"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + CurrentBindBoard[i].CompletionPersent + '%"></div></div>';
                    Board += '  </span></span></div><div class="smalliconbox" style="display:inline-block; text-align: right;">';
                    Board += '<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/red_circle.png" alt="" style="display:' + Priority + '">' + FlagHTML + '</div></div></div></div>';
                    Board += '</li>';
                }
            }
        });
    }
    else {
        bindBoardNames = [];
        IsToDoBlank = true;
    }
    Board += '</ul></div>';

    for (seq = 0; seq < BucketArray.length; seq++) {
        CurrentBindBoard = array.filter(function (obj) { //Filter array on the basis of Board Name's Sequence number
            return obj.BoardName == BucketArray[seq].Title;
        });
        if(Action == '') {
            CurrentBindBoard.sort(function (a, b) {
                var dateA = new Date(a.Modified), dateB = new Date(b.Modified)
                return dateB - dateA;
            });
        }

        // after finding the board details on the basis of sequence number bind the the board
        if (CurrentBindBoard.length > 0) {
            $.each(CurrentBindBoard, function (i, value) {
                if (jQuery.inArray(value.BoardName, AlreadyBindBoard) != '-1') {
                    //Do Nothing. Elements contains this already
                }
                else {
                    DateText = "Due";
                    AlreadyBindBoard.push(value.BoardName);
                    Board += '<div class="dragbox KanbanList"><div class="row addtasksec"><div class="col-md-6 KanbanName" style="font-size:12px; color:#1a80d7; font-weight: 600;">' + value.BoardName + '</div>';
                    Board += '<div class="col-md-6" style="text-align: right;"><div class="dropsec" style="display: inline-block; position: relative;">';
                    Board += '<button type="button" class="addtaskbutton" value="' + value.BoardName + '" name="list' + listClass + '"><i class="fa fa-plus"></i> Add Task</button>';
                    Board += '</div><button type="button" onclick="OpenEditKanban(\'' + value.BoardName + '\', \'' + BucketArray[seq].Sequence_No + '\');" class="editbutton"><i class="fa fa-edit"></i> Edit</button></div></div>';
                    bindBoardNames.push(value.BoardName);
                    Board += '<ul id="list' + listClass + '" class="listshow" data-value="connect">'; listRow.push("#list" + listClass); listClass++;
                    for (var i = 0; i < CurrentBindBoard.length; i++) {
                        if (CurrentBindBoard[i].ProjectFullName == null) {
	                        if(CurrentBindBoard[i].TaskCategory == "TeamChannel") {
		                        TaskMethod = "Team Channel: ";
		                        TaskName = CurrentBindBoard[i].TeamItemName;
			                }
			                else if(CurrentBindBoard[i].TaskCategory == "TeamMeeting"){
		                        TaskMethod = "Team Meeting: ";
		                        TaskName = CurrentBindBoard[i].TeamItemName;
			                }
			                else {
                            	TaskMethod = "Client: ";
                            	TaskName = CurrentBindBoard[i].ClientID.Title;
                            }
                        }
                        else {
                            TaskMethod = "Project: ";
                            TaskName = CurrentBindBoard[i].ProjectFullName;
                        }
                        if (CurrentBindBoard[i].DueDate != null) {
                            DueDate = new Date(CurrentBindBoard[i].DueDate);
                            DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
                        }
                        if (CurrentBindBoard[i].TaskPriority == "High" || CurrentBindBoard[i].TaskPriority == "Top") {
                            Priority = "block";
                        }
                        else {
                            Priority = "none";
                        }
                        if (CurrentBindBoard[i].Title.length > 88) {
                            CurrentBindBoard[i].Title = CurrentBindBoard[i].Title.substr(0, 88) + '...';
                        }
                        if (CurrentBindBoard[i].CurrentPhase == 'Completed') {
                            var color = '#afb83b';
                            DateText = "Completed";
                            DueDate = new Date(CurrentBindBoard[i].CompletionDate);
                            DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);
                        }
                        else if (CurrentBindBoard[i].CurrentPhase == 'Open') {
                            var color = '#14aaf5';
                        }
                        else if (CurrentBindBoard[i].CurrentPhase == 'Hold') {
                            var color = '#ff9933';
                        }
                        else if (CurrentBindBoard[i].CurrentPhase == 'Close') {
                            var color = '#299438';
                            DateText = "Completed";
                            DueDate = new Date(CurrentBindBoard[i].CompletionDate);
                            DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);
                        }
                        else { //Cancelled
                            var color = '#db4035';
                        }
                        var FlagHTML = '';
                        if (CurrentBindBoard[i].SetFlag == "Red") {
                            FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:red"></i>';
                        }
                        else if (CurrentBindBoard[i].SetFlag == "Blue") {
                            FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:blue"></i>';
                        }
                        else if (CurrentBindBoard[i].SetFlag == "Green") {
                            FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:green"></i>';
                        }
                        else if (CurrentBindBoard[i].SetFlag == "Yellow") {
                            FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:yellow"></i>';
                        }
                        else {
                            FlagHTML = '';
                        }
                        CurrentBindBoard[i].CompletionPersent = CurrentBindBoard[i].CompletionPersent ? CurrentBindBoard[i].CompletionPersent : "0";
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(CurrentBindBoard[i].AssignedBy.EMail);
                        Board += '<li id="' + CurrentBindBoard[i].Id + '" style ="border-left: 5px solid ' + color + '"><div class="twopart"><div class="righttpart"><div class="divtwosec" style=""><h3>' + CurrentBindBoard[i].Title + '</h3>';
                        Board += '<div class="dropdown dashboard-table-btn" style="margin-left: auto"><button class="btn dropdown-toggle btnmange ui-KanbanButton" onclick=SelectArray("' + CurrentBindBoard[i].ID + '") type="button" data-toggle="dropdown" aria-expanded="false">';
                        Board += '<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/dotting.png" alt=""></button>';

                        Board += '<ul class="dropdown-menu dropdown-color-menu-icon"><li class="parentlist"><ul>';
                        Board += '<li class="clsCompletion"><a class="dropdown-toggle" id="">';
                        Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/check_icon_1.png" alt=""><span>Mark as Completed</span></a></li>';
                        Board += '<li class="clsProgression"><a href="javascript:void(0);">';
                        Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/percentage-icon.png" alt=""><span>Update Progress</span>';
                        Board += '</a></li></ul></li><li class="parentlist"><ul><li><a href="javascript:void(0);" data-toggle="modal" data-target="#dependenciesmodl">';
                        Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/dependency-icon.png" alt=""><span>Add Dependency</span>';
                        Board += '</a></li><li><a class="ModalAddMessage" href="javascript:void(0);" data-toggle="modal" data-target="#addmessage"><i class="fa fa-comments-o"></i>';
                        Board += '<span>Add a Message</span></a></li><li><a href="javascript:void(0);" data-toggle="modal" data-target="#Notificationlist">';
                        Board += '<i class="fa fa-envelope-o" aria-hidden="true" style="margin:0px 8px 0 0px !important"></i><span>Notify by mail</span></a></li></ul></li>';
                        Board += '<li class="parentlist"><ul><li id="InboxAddBoard" class="KanbanClass"><a href="javascript:void(0);" data-toggle="modal" data-target="#bucketbox">';
                        Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/collect.png" alt=""><span>Set Board</span></a></li>';
                        Board += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#flagmodal">';
                        Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/flag-icon.png" alt=""><span>Set Flag</span></a></li>';
                        Board += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#setreminder"><i class="fa fa-bell-o" style="margin:0px 8px 0 0px !important"></i>';
                        Board += '<span>Set Reminder</span></a></li><li><a href="javascript:void(0);">';
                        Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/favorite_new-icon.png" alt=""><span>Add to Favorite</span></a></li></ul></li></ul>';

                        Board += '</div></div><div class="assignbynow"><img src="' + attachment + '" alt="" class="assignimg">';
                        Board += '<div class="assignbx"><span class="assignby">Assign by:-</span><span class="clientname">' + CurrentBindBoard[i].AssignedBy.Title + '</span></div></div>';
                        Board += '<div class="projectsec" style="display:block;"><span><span class="pojectdefine">' + TaskMethod + '</span> <span class="projectdefine">' + TaskName + '</span>';
                        Board += '</span></div><div class="flgndprogress"><div class="duedatesec" style="display:inline-block;"><span class="duedate"><span>'+DateText+': </span>' + DueDate + '</span>';
                        Board += '<div class="progress custom-progress progress-success m-0 mt-4" style="width:124px;"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + CurrentBindBoard[i].CompletionPersent + '%"></div></div>';
                        Board += '  </span></span></div><div class="smalliconbox" style="display:inline-block; text-align: right;">';
                        Board += '<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/red_circle.png" alt="" style="display:' + Priority + '">' + FlagHTML + '</div></div></div></div>';
                        Board += '</li>';
                    }
                    Board += '</ul></div>';
                }

            });
        }
    }

    //now bind boards in which you are added by other users
    $.each(array, function (i, value) {
        if (jQuery.inArray(value.BoardName, AlreadyBindBoard) != '-1') {
            //Do Nothing. Elements contains this already
        }
        else {
            AlreadyBindBoard.push(value.BoardName);
            Board += '<div class="dragbox KanbanList"><div class="row addtasksec"><div class="col-md-6 KanbanName" style="font-size:12px; color:#1a80d7; font-weight: 600;">' + value.BoardName + '</div>';
            Board += '<div class="col-md-6" style="text-align: right;"><div class="dropsec" style="display: inline-block; position: relative;">';
            Board += '<button type="button" class="addtaskbutton" value="' + value.BoardName + '" name="list' + listClass + '"><i class="fa fa-plus"></i> Add Task</button>';
            Board += '</div><button type="button" onclick="OpenEditKanban(\'' + value.BoardName + '\', \'' + BucketArray[seq].Sequence_No + '\');" class="editbutton"><i class="fa fa-edit"></i> Edit</button></div></div>';
            bindBoardNames.push(value.BoardName);
            CurrentBindBoard = array.filter(function (obj) { //Filter array on the basis of CurrentPhase
                return obj.BoardName == value.BoardName;
            });
            if(Action == '') {
                CurrentBindBoard.sort(function (a, b) {
                    var dateA = new Date(a.Modified), dateB = new Date(b.Modified)
                    return dateB - dateA;
                });
            }

            Board += '<ul id="list' + listClass + '" class="listshow" data-value="connect">'; listRow.push("#list" + listClass); listClass++;
            for (var i = 0; i < CurrentBindBoard.length; i++) {
                DateText = "Due";
                if (CurrentBindBoard[i].ProjectFullName == null) {
                	if(CurrentBindBoard[i].TaskCategory == "TeamChannel") {
                        TaskMethod = "Team Channel: ";
                        TaskName = CurrentBindBoard[i].TeamItemName;
	                }
	                else if(CurrentBindBoard[i].TaskCategory == "TeamMeeting"){
                        TaskMethod = "Team Meeting: ";
                        TaskName = CurrentBindBoard[i].TeamItemName;
	                }
	                else {
                    	TaskMethod = "Client: ";
                    	TaskName = CurrentBindBoard[i].ClientID.Title;
                    }
                }
                else {
                    TaskMethod = "Project: ";
                    TaskName = CurrentBindBoard[i].ProjectFullName;
                }
                if (CurrentBindBoard[i].DueDate != null) {
                    DueDate = new Date(CurrentBindBoard[i].DueDate);
                    DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
                }

                if (CurrentBindBoard[i].TaskPriority == "High" || CurrentBindBoard[i].TaskPriority == "Top") {
                    Priority = "block";
                }
                else {
                    Priority = "none";
                }
                if (CurrentBindBoard[i].Title.length > 88) {
                    CurrentBindBoard[i].Title = CurrentBindBoard[i].Title.substr(0, 88) + '...';
                }
                if (CurrentBindBoard[i].CurrentPhase == 'Completed') {
                    var color = '#afb83b';
                    DateText = "Completed";
                    DueDate = new Date(CurrentBindBoard[i].CompletionDate);
                    DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);
                }
                else if (CurrentBindBoard[i].CurrentPhase == 'Open') {
                    var color = '#14aaf5';
                }
                else if (CurrentBindBoard[i].CurrentPhase == 'Hold') {
                    var color = '#ff9933';
                }
                else if (CurrentBindBoard[i].CurrentPhase == 'Close') {
                    var color = '#299438';
                    DateText = "Completed";
                    DueDate = new Date(CurrentBindBoard[i].CompletionDate);
                    DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);
                }
                else { //Cancelled
                    var color = '#db4035';
                }
                var FlagHTML = '';
                if (CurrentBindBoard[i].SetFlag == "Red") {
                    FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:red"></i>';
                }
                else if (CurrentBindBoard[i].SetFlag == "Blue") {
                    FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:blue"></i>';
                }
                else if (CurrentBindBoard[i].SetFlag == "Green") {
                    FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:green"></i>';
                }
                else if (CurrentBindBoard[i].SetFlag == "Yellow") {
                    FlagHTML = '<i class="fa fa-flag-o" style="font-size:23px;color:yellow"></i>';
                }
                else {
                    FlagHTML = '';
                }
                CurrentBindBoard[i].CompletionPersent = CurrentBindBoard[i].CompletionPersent ? CurrentBindBoard[i].CompletionPersent : "0";
                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(CurrentBindBoard[i].AssignedBy.EMail);
                Board += '<li id="' + CurrentBindBoard[i].Id + '" style ="border-left: 5px solid ' + color + '"><div class="twopart"><div class="righttpart"><div class="divtwosec" style=""><h3>' + CurrentBindBoard[i].Title + '</h3>';
                Board += '<div class="dropdown dashboard-table-btn" style="margin-left: auto"><button class="btn dropdown-toggle btnmange ui-KanbanButton" onclick=SelectArray("' + CurrentBindBoard[i].ID + '") type="button" data-toggle="dropdown" aria-expanded="false">';
                Board += '<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/dotting.png" alt=""></button>';

                Board += '<ul class="dropdown-menu dropdown-color-menu-icon"><li class="parentlist"><ul>';
                Board += '<li class="clsCompletion"><a class="dropdown-toggle" id="">';
                Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/check_icon_1.png" alt=""><span>Mark as Completed</span></a></li>';
                Board += '<li class="clsProgression"><a href="javascript:void(0);">';
                Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/percentage-icon.png" alt=""><span>Update Progress</span>';
                Board += '</a></li></ul></li><li class="parentlist"><ul><li><a href="javascript:void(0);" data-toggle="modal" data-target="#dependenciesmodl">';
                Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/dependency-icon.png" alt=""><span>Add Dependency</span>';
                Board += '</a></li><li><a class="ModalAddMessage" href="javascript:void(0);" data-toggle="modal" data-target="#addmessage"><i class="fa fa-comments-o"></i>';
                Board += '<span>Add a Message</span></a></li><li><a href="javascript:void(0);" data-toggle="modal" data-target="#Notificationlist">';
                Board += '<i class="fa fa-envelope-o" aria-hidden="true" style="margin:0px 8px 0 0px !important"></i><span>Notify by mail</span></a></li></ul></li>';
                Board += '<li class="parentlist"><ul><li id="InboxAddBoard" class="KanbanClass"><a href="javascript:void(0);" data-toggle="modal" data-target="#bucketbox">';
                Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/collect.png" alt=""><span>Set Board</span></a></li>';
                Board += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#flagmodal">';
                Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/flag-icon.png" alt=""><span>Set Flag</span></a></li>';
                Board += '<li><a href="javascript:void(0);" data-toggle="modal" data-target="#setreminder"><i class="fa fa-bell-o" style="margin:0px 8px 0 0px !important"></i>';
                Board += '<span>Set Reminder</span></a></li><li><a href="javascript:void(0);">';
                Board += '<img class="dashboard-icon-info ml2" src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/favorite_new-icon.png" alt=""><span>Add to Favorite</span></a></li></ul></li></ul>';

                Board += '</div></div><div class="assignbynow"><img src="' + attachment + '" alt="" class="assignimg">';
                Board += '<div class="assignbx"><span class="assignby">Assign by:-</span><span class="clientname">' + CurrentBindBoard[i].AssignedBy.Title + '</span></div></div>';
                Board += '<div class="projectsec" style="display:block;"><span><span class="pojectdefine">' + TaskMethod + '</span> <span class="projectdefine">' + TaskName + '</span>';
                Board += '</span></div><div class="flgndprogress"><div class="duedatesec" style="display:inline-block;"><span class="duedate"><span>'+DateText+': </span>' + DueDate + '</span>';
                Board += '<div class="progress custom-progress progress-success m-0 mt-4" style="width:124px;"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + CurrentBindBoard[i].CompletionPersent + '%"></div></div>';
                Board += '  </span></span></div><div class="smalliconbox" style="display:inline-block; text-align: right;">';
                Board += '<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyTask/assets/images/red_circle.png" alt="" style="display:' + Priority + '">' + FlagHTML + '</div></div></div></div>';
                Board += '</li>';
            }
            Board += '</ul></div>';
        }
    });
    $("#fullydrag").append(Board);
    if($("#fullydrag").html() != "" && IsToDoBlank == true){
        $("#todoKanban").remove();
    }
    //console.log(listRow.toString());
    $(listRow.toString()).sortable({
        connectWith: listRow.toString(),
        opacity: 0.5,
        cursor: 'move',
        delay: 200,
        receive: function (event, ui) {
            updateTaskBoard(ui.item[0].attributes[0].nodeValue, event.target.parentElement.childNodes[0].childNodes[0].innerText); //Dropped task Id, Target bucket name
        }
    });
    $(".addtaskbutton").click(function () {
        BindTaskToBoard();
        $(".chkAllKanbanTsk").prop('checked', '');
        arrTaskInIds = [];
        SelectedBoard = this.value;
        $("#opentasksec").modal('show');
    });
    $(".KanbanClass").click(function () {
        $("#BoardPopupHeader").text("Set Board");
        $("#btnBoardSubmit").show();
        $("#btnBoardOnly").hide();
    });
    $(".AddDepedncy").click(function () {
    	$("#btnAddDependency").text('Add');
        if (arrTaskInIds.length == 0 && arrTaskIds.length == 0) {
            //alert("Kindly select any task first.");
        }
        else {
            if (arrTaskInIds.length == 1) {
                $("#DueDateHTML").hide();
                $("#StartDateHTML").hide();
            }
            else {
                if (arrTaskIds.length == 1) {
                    $("#DueDateHTML").hide();
                    $("#StartDateHTML").hide();
                }
                else {
                    $("#DueDateHTML").show();
                    $("#StartDateHTML").show();
                }
            }
        }
    });

    $(".ModalAddMessageParent").empty().append('<a href="javascript:void(0);" class="ModalAddMessage"><i class="fa fa-comments-o"></i><span>Add a Message</span></a>');
    $(".ModalAddMessage").click(function () {
    	//to check if logged_In user is external or not; -9 == External User
		if(EmployeeDetails[0].ParentId != -9) {
			updateTaskMeatdata('Add Message');
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
	
    $("#addTaskToSetBoard").click(function () {
        updateBoardName(SelectedBoard);
    });
    $("#positionlist").empty();
    for(var buckCount=0;buckCount < ($("#fullydrag .KanbanList").length + 1);buckCount++) {
    	$("#positionlist").append("<option value='"+(parseInt(buckCount)+1)+"'>" + (parseInt(buckCount)+1) + "</option>");
    }
}

//update Board name of task while dropping to other area
function updateTaskBoard(TaskId, NewBoardName) {
    var ItemType = GetItemTypeForListName('EmployeeTaskDetails');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        BoardName: NewBoardName
    }
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/GetItemById('" + TaskId + "')",
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
            //alert("dropped");
            arrAllTaskInbox.forEach(function (value, i) {
                if (value.Id == TaskId) {
                    value.BoardName = NewBoardName;
                }
            });
            dfd.resolve(data);
        },
        eror: function (data) {
            dfd.reject(error);
            console.log("Error while update bucket name of task. " + JSON.stringify(data));
        }
    });
    return dfd.promise();
}


// add kanban board without any task
function AddKanbanBoard(BoardName) {
    if ($("#newboardname").prop('checked') == true) {
    	if (BoardName.toLowerCase() == 'to do' || jQuery.inArray(BoardName.toLowerCase(), allBoardName) != '-1') {
            //Do nothing
        }
        else {
        	AddBoard(BoardName);
        }
    }
    else {
        $("#txtBoardName").val('');
        $("#ddlExistingBoards").val('To do');
    }
    var listRow = [];
    var NewUlListId = "list" + ($("#fullydrag .dragbox").length + 1);
    var Board = '';
    if (jQuery.inArray(BoardName, bindBoardNames) == '-1') {
        Board += '<div class="dragbox"><div class="row addtasksec"><div class="col-md-6 KanbanName" style="font-size:12px; color:#1a80d7; font-weight: 600;">' + BoardName + '</div>';
        Board += '<div class="col-md-6" style="text-align: right;"><div class="dropsec" style="display: inline-block; position: relative;">';
        Board += '<button type="button" class="addtaskbutton" name="' + NewUlListId + '" value="' + BoardName + '"><i class="fa fa-plus"></i> Add Task</button>';
        Board += '</div></div></div>';
        Board += '<ul id="' + NewUlListId + '" class="listshow" data-value="connect">';
        Board += '</ul></div>';
        $("#fullydrag").append(Board);
        bindBoardNames.push(BoardName);
    }

    for (var list = 0; list < $("#fullydrag .dragbox").length; list++) {
        listRow.push("#list" + (list + 1));
    }
    $(listRow.toString()).sortable({
        connectWith: listRow.toString(),
        opacity: 0.5,
        cursor: 'move',
        delay: 200,
        receive: function (event, ui) {
            updateTaskBoard(ui.item[0].attributes[0].nodeValue, event.target.parentElement.childNodes[0].childNodes[0].innerText); //Dropped task Id, Target bucket name
        }
    });
    $(".addtaskbutton").click(function () {
        BindTaskToBoard();
        SelectedBoard = this.value;
        $("#opentasksec").modal('show');

    });
    $("#addTaskToSetBoard").click(function () {
        updateBoardName(SelectedBoard);
    });
}

//Filter Kanban chart
function FilterKanban() {
    arrTaskInIds = [];
    arrFilterDataBind = [];
    var TaskKanbanChip = "",
        assigntoQuery = '',
        arrBoards = [];
    assigntobyme = [];

    //Filter value display starts
    if ($('#UserAllProject').val() != "All") {
        if ($('#UserAllProject').val() == "General Task") {
            TaskKanbanChip += "<div class='upload-chip'>General Task</div>";
        }
        else {
            if ($('#ddlInboxProject').val() != "All") {
                TaskKanbanChip += "<div class='upload-chip'>" + $('#ddlInboxProject option:selected').text() + "</div>";
            }
            else {
                TaskKanbanChip += "<div class='upload-chip'>" + $('#ddlInboxProject option:selected').text() + "</div>";
            }
        }
    }

    if ($('#ProjectModule').val() != "All") {
        var ModuleValue2 = $('#ProjectModule').val();
        TaskKanbanChip += "<div class='upload-chip'>" + $('#ProjectModule option:selected').text() + "</div>";
    }

    if ($('#ddlInboxClient').val() != "All") {
        TaskKanbanChip += "<div class='upload-chip'>" + $('#ddlInboxClient option:selected').text() + "</div>";
    }

    if ($('#WorkTypeOfProject').val() != "All") {
        TaskKanbanChip += "<div class='upload-chip'>" + $('#WorkTypeOfProject option:selected').text() + "</div>";
    }

    if ($('#txtPriority').val() != "All") {
        TaskKanbanChip += "<div class='upload-chip'>" + $('#txtPriority option:selected').text() + "</div>";
    }

    if ($('#txtFilterStatusInbox').val() != "All") {
        TaskKanbanChip += "<div class='upload-chip'>" + $('#txtFilterStatusInbox option:selected').text() + "</div>";
    }

    if ($('#taskIn').val() != null && $('#taskIn').val() != "") {
        if (TaskOutCome == "TaskPending") {
            TaskKanbanChip += "<div class='upload-chip'>Pending</div>";
        }
        else if (TaskOutCome == "TaskOverdue") {
            TaskKanbanChip += "<div class='upload-chip'>Overdue</div>";
        }
        else {
            TaskKanbanChip += "<div class='upload-chip'>" + moment($("#taskIn").val()).format("DD/MMM/YYYY") + "</div>";
        }
    }

    if ($("#pplassigntoInbox_TopSpan_ResolvedList").text() != "") {
        getUserInformation('pplassigntoInbox');
        TaskKanbanChip += "<div class='upload-chip'>" + assignBy.join(', ') + "</div>";
    }
    else {
        TaskKanbanChip += "<div class='upload-chip'>" + _spPageContextInfo.userDisplayName + "</div>";
        assignByEmail = "";
    }
    //Filter value display ends
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    arrBoards = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of Board Name
        return obj.BoardName != null && obj.BoardName != '';
    });
    arrFilterDataBind = arrBoards.filter(function (obj, index) { //Filter array
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

    $("#myKanbanChip").empty();
    $("#myKanbanChip").append(TaskKanbanChip);
    arrSortBoard = arrFilterDataBind.filter(function (f) { return f; });
    BindBucketName(arrFilterDataBind, '');
}

//Clear Kanban filter
function ClearKanbanFilter() {
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
    $("#myKanbanChip").empty();

    var TaskinboxChip = '';
    TaskinboxChip += "<div class='upload-chip'>Open</div>";
    $("#myKanbanChip").empty();
    $("#myKanbanChip").append(TaskinboxChip);
    var arrDataBind = [];
    var arrBoards = [];
    //Cloning array
    arrDataBind = arrLimitTaskInbox.filter(function (f) { return f; });
    arrBoards = arrSortBoard = arrDataBind.filter(function (obj) { //Filter array on the basis of Board Name
        return obj.BoardName != null && obj.BoardName != '';
    });

    BindBucketName(arrBoards, '');
}

//Sort the Kanban tasks
function SortKanbanTasks() {
    $("#NameSortKanban").click(function () {
        arrSortBoard.sort((a, b) => {
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
    BindBucketName(arrSortBoard, "Sort");
});
$("#RecentSortKanban").click(function () {
    arrSortBoard.sort(function (a, b) {
        var dateA = new Date(a.Created), dateB = new Date(b.Created)
        return dateB - dateA;
    });
    BindBucketName(arrSortBoard, "Sort");
});
$("#DateSortKanban").click(function () {
    arrSortBoard.sort(function (a, b) {
        var dateA = new Date(a.DueDate), dateB = new Date(b.DueDate)
        return dateB - dateA;
    });
    BindBucketName(arrSortBoard, "Sort");
});
$("#PrioritySortKanban").click(function () {
    const order = ['Top', 'Medium', 'Low'];
    arrSortBoard.sort((x, y) => order.indexOf(x.TaskPriority) - order.indexOf(y.TaskPriority));
    BindBucketName(arrSortBoard, "Sort");
});
}


//Open Modal to edit Kanban data
function OpenEditKanban(ChangedBoard, SequenceNumber) {
    $("#txtEditBoardName").val(ChangedBoard);
    $("#positionlist").val(SequenceNumber);
    $("#renameboard").modal('show');
    $(".parentEditKambnan").empty().append('<button type="button" class="btn custom-btn mr-8" id="btnEditKanban">Submit</button>');
    var PreviousName = $("#txtEditBoardName").val();
    var PreviousSeq = $("#positionlist :selected").text();
    $("#btnEditKanban").click(function () {
        var arrAllBoardTemp = [];
        arrAllBoardTemp = allBoardName.filter(function(f){return f;})
        arrAllBoardTemp = arrAllBoardTemp.filter(function (obj) {
            return obj.toLowerCase() != PreviousName.toLowerCase();
        });
        UpdateKanban(PreviousName, PreviousSeq);
    });
}

//update kanban Sequence Number and Name
function UpdateKanban(PreviousName, PreviousSeq) {
    //get updated Kanban item id
    var currentItemId = '';
    var TaskUpdateId = [];
    var ItemType = GetItemTypeForListName('PlannerBoardList');
    var Query = "?$top=5000&$select=Id,Title,Author/EMail,Sequence_No&$Expand=Author&$orderby=Sequence_No asc&$filter=Title eq '" + PreviousName + "' ";
    $.when(getLimitedItems('PlannerBoardList', Query)).done(function (Board) {
        var items = Board.results;
        if (items.length > 0) {
            currentItemId = items[0].Id;
            if (PreviousSeq == $("#positionlist :selected").text()) { //if previous_sequence is same as current_sequence
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Title: $("#txtEditBoardName").val()
                }
                UpdateTaskList('PlannerBoardList', Metadata, currentItemId); 
            }
            else {
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Title: $("#txtEditBoardName").val(),
                    Sequence_No: parseInt($("#positionlist").val())
                }
                //Swap the sequeunce number
                var Query = "?$top=5000&$select=Id,Title,Author/EMail,Sequence_No&$Expand=Author&$orderby=Sequence_No asc&$filter=Sequence_No eq '" + $("#positionlist").val() + "' ";
                $.when(getLimitedItems('PlannerBoardList', Query)).done(function (SwapBoard) {
                    var itemSwap = SwapBoard.results;
                    if (itemSwap.length > 0) {
                        currentItemIdSwap = itemSwap[0].Id;
                        SwapMetadata = {
                            __metadata: {
                                'type': ItemType
                            },
                            Sequence_No: parseInt(PreviousSeq)
                        }
                        UpdateTaskList('PlannerBoardList', SwapMetadata, currentItemIdSwap);
                    }
                });
                UpdateTaskList('PlannerBoardList', Metadata, currentItemId); 
            }
        }
        if(PreviousName.trim() != $.trim($("#txtEditBoardName").val())){
            var TQuery = "?$top=5000&$select=Id,Title,BoardName&$filter=BoardName eq '" + PreviousName.trim() + "' ";
            var TaskItemType = GetItemTypeForListName('EmployeeTaskDetails'); 
            $.when(getLimitedItems('EmployeeTaskDetails', TQuery)).done(function (Tasksres) {
                var TasksRes = Tasksres.results;
                $.each(TasksRes, function (i, value) {
                    Metadata = {
                        __metadata: {
                            'type': TaskItemType
                        },
                        BoardName: $.trim($("#txtEditBoardName").val())
                    }
                    TaskUpdateId.push(value.Id);
                    UpdateTaskList('EmployeeTaskDetails', Metadata, value.Id);
                    if(TasksRes.length == (i+1)){
                        alert("Details has been updated.");
                        $("#renameboard").modal('hide');
                    }
                });
            });
        }
        else {
            alert("Details has been updated.");
            $("#renameboard").modal('hide');
        }
    });
    arrAllTaskInbox.forEach(function (value, i) {
    	for (id = 0; id < TaskUpdateId.length; id++) {
		    if (value.Id == TaskUpdateId[id]) {
		        value.BoardName = $.trim($("#txtEditBoardName").val());
		    }
        }
    });
	arrLimitTaskInbox = arrAllTaskInbox.filter(function (obj) { //Filter array on the basis of CurrentPhase
	    return obj.CurrentPhase == "Open";
	});
	arrBoards= [];
	arrSortBoard = arrBoards =  arrLimitTaskInbox.filter(function (obj) { //Filter array on the basis of Board Name
        return obj.BoardName != null && obj.BoardName != '';
    });
	BindBucketName(arrBoards, '');
}

//update kanban Sequence Number and Name
/*function UpdateKanban(PreviousName, PreviousSeq) {
    //get updated Kanban item id
    var currentItemId = '';
    var ItemType = GetItemTypeForListName('PlannerBoardList');
    var Query = "?$top=5000&$select=Id,Title,Author/EMail,Sequence_No&$Expand=Author&$orderby=Sequence_No asc&$filter=Title eq '" + PreviousName + "' ";
    $.when(getLimitedItems('PlannerBoardList', Query)).done(function (Board) {
        var items = Board.results;
        if (items.length > 0) {
            currentItemId = items[0].Id;
            if(PreviousSeq == $("#positionlist :selected").text()) { //if previous_sequence is same as current_sequence
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Title: $("#txtEditBoardName").val()
                }
            }
            else {
                //re-shuffle the other sequence number
                if($('#positionlist option:last-child').text() != $("#positionlist :selected").text()) { //if user does not pick the last/new sequence number
                    if((parseInt($('#positionlist :selected').text()) > parseInt(PreviousSeq))) { //if user increases the sequence
                        var PlannerQuery = "?$top=5000&$select=Id,Title,Author/EMail,Sequence_No&$Expand=Author&$orderby=Sequence_No asc&$filter=Sequence_No ge " + parseInt($('#positionlist :selected').text());
                        $.when(getLimitedItems('PlannerBoardList', PlannerQuery )).done(function (Board) {
                            var BoardResults = Board.results;
                            $.each(BoardResults, function (i, value) {
                                var newSequence = parseInt(value.Sequence_No + 1);
                                Metadata = {
                                    __metadata: {
                                        'type': ItemType
                                    },
                                    Sequence_No: newSequence
                                }
                                UpdateTaskList('PlannerBoardList', Metadata, value.Id);
                            });
                        });
                        
                    }
                    else { //if user decreases the sequence
                        var PlannerQuery = "?$top=5000&$select=Id,Title,Author/EMail,Sequence_No&$Expand=Author&$orderby=Sequence_No asc&$filter=Sequence_No le " + parseInt($('#positionlist :selected').text());
                        $.when(getLimitedItems('PlannerBoardList', PlannerQuery )).done(function (Board) {
                            var BoardResults = Board.results;
                            $.each(BoardResults, function (i, value) {
                                var newSequence = parseInt(value.Sequence_No - 1);
                                Metadata = {
                                    __metadata: {
                                        'type': ItemType
                                    },
                                    Sequence_No: newSequence
                                }
                                UpdateTaskList('PlannerBoardList', Metadata, value.Id);
                            });
                        });
                    }
                }
                else {
                    $("#positionlist").append("<option value=''>" + (parseInt($('#positionlist option:last-child').text()) + 1) + "</option>");
                }
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Title: $("#txtEditBoardName").val(),
                    Sequence_No: parseInt($("#positionlist :selected").text())
                }
            
            }
            UpdateTaskList('PlannerBoardList', Metadata, currentItemId);// update the sequence number of the selected kanban

            //if title of Kanban changes then all tasks with this kanban also changes
            $.each(arrAllTaskInbox, function (i, obj) {
                if(obj.BoardName == PreviousName) {
                    obj.BoardName = $.trim($("#txtEditBoardName").val());
                }
            });
			
            if(PreviousName.trim() != $.trim($("#txtEditBoardName").val())){
                var TQuery = "?$top=5000&$select=Id,Title,BoardName&$filter=BoardName eq '" + PreviousName.trim() + "' ";
                var TaskItemType = GetItemTypeForListName('EmployeeTaskDetails'); 
                $.when(getLimitedItems('EmployeeTaskDetails', TQuery)).done(function (Tasksres) {
                    var TasksRes = Tasksres.results;
                    $.each(TasksRes, function (i, value) {
                        Metadata = {
                            __metadata: {
                                'type': TaskItemType
                            },
                            BoardName: $.trim($("#txtEditBoardName").val())
                        }
                        UpdateTaskList('EmployeeTaskDetails', Metadata, value.Id);
                        if(TasksRes.length == (i+1)){
                            BindBucketName(arrSortBoard);
                            alert("Details has been updated.");
                            $("#renameboard").modal('hide');
                        }
                    });
                });
            }
            else {
                BindBucketName(arrSortBoard);
                alert("Details has been updated.");
                $("#renameboard").modal('hide');
            }
        }
    });
}*/
