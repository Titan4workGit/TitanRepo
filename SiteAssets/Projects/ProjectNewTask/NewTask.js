var currentTaskItemId = "";
var taskToUsers = [];
var DependecyId = '';
var taskCCUsersUsers = [];
var taskItemDetails = [];
var emailBodyContent = "";
var taskEmailSubject = "";
var ProjectType = "";
var currentDlgTask = '';
var CurrentPhase = '';
var TaskAssignID = '';
var Audience = '';
var DependecyRecrd = '';
var DependecyToUser = [];
var GuestUser = [];
var arrAlreadyAssinEmp = [];
var IsOwner = false;
var IsCustomerBind = false;
var IsProjectBind = false;
var ActiveCustomers = [];
var InactiveCustomers = [];
var AllTaskUsersEmployeeuser = [];
var arrGeneralTask = [];
var NextURLGeneral = '';
var NextURLGuestTeam = '';
var IsModal = "";
var DependenciesNames = '';
var TabId = titanForWork.getQueryStringParameter("source");
var DeleteCheck = true;
var TaskAction = titanForWork.getQueryStringParameter("Action");
var IsProjectAdmin = false;
var TaskKind = '';
var selectedText;
var CommentUserImage = '';
var LoginUserID = '';
var TaskusersProjectTeam = [];
var IsCheckUser = false;
var NextURLProject = ""
var NextUrlGuest = '';
var ClientName = '';
var NextUrlDept = '';
var arrDeptTask = [];
var finalFiles = [];
var FinalFiles4Upload = [];
var Tcounter = 0;
var RemoveDuplicate = [];
var UpdateItemID = '';
var arrMyGroup = [];
var IsTaskRecursive = titanForWork.getQueryStringParameter('Type'); //Value will be Recursive or blank('')
var RecursiveTaskId = '';
var IsEditMode = titanForWork.getQueryStringParameter("EditMode");
var IntervalId = '';
var LibraryTreeBind = false;
$(window).load(function () {
    /*var $select = $("#MonthlyDays");
    for (i = 1; i <= 28; i++) {
        $select.append($('<option></option>').val(i).html(i))
    }*/
    if (IsTaskRecursive == "RecursiveUpdate") {
        waitingDialog.show();
        setTimeout(function () {
            PageLoadRecTask();
        }, 500);
    }
});
$(document).ready(function () {
	$("#reminderTask").hide();
	$("#DeleteTask").hide();
    IsModal = window.atob($.urlParam('IsModal'));
    RecursiveTaskId = window.atob($.urlParam('RecursiveId'));
    currentTaskItemId = titanForWork.getQueryStringParameter("TaskId");
    if (currentTaskItemId != undefined) {
        currentTaskItemId = window.atob(currentTaskItemId);
        $('#btnchangeHistorys').show();
    }
    
    $("#btnchangeHistorys").click(function () {
        getOnChangeHistory(currentTaskItemId);
    });
    var prmProjectID = titanForWork.getQueryStringParameter("ProjectID");
    if(prmProjectID!='undefined' || prmProjectID!=null)
    {
       GetAllModule(prmProjectID);
    }
    $('.StartDate').keypress(function (e) {
        return false
    });
    $('.DueDate').keypress(function (e) {
        return false
    });
    $('.StartDateRecursive').keypress(function (e) {
        return false
    });
    $('.EndDateRecursive').keypress(function (e) {
        return false
    });
    if (IsModal == "true") {
        getExternalClient();
    }
    else {
        //myShareDepartmentCopy();
    }
    $("#Audience").change(function () {
        Audience = $("#Audience").val();
        IsCustomerBind = false;
    });
    $("#everymonths").change(function () {
        var NumOfDays = daysInMonth($(this).val(), new Date().getFullYear());
        for (var day = 0; day < NumOfDays; day++) {
            $('.multidays').append('<option>' + [day + 1] + '</option>');
        }
    });
    $('#txtDueDay').keypress(function (event) {
        if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
            event.preventDefault();
        }
    });
    $('#txtDueDay').on('mouseleave', function (event) {
        var minLength = 1;
        var maxLength = 999;
        if (parseInt($(this).val()) < minLength) {
            alert("value should be greater than zero.");
            $(this).val('');
        } else if (parseInt($(this).val()) > maxLength) {
            alert("value should be smaller than 999.");
            $(this).val('');
        } else {

        }
    });

    $("#rdioYearly").click(function () {
        $("#everymonths").val('1');
        $("#everymonths").trigger('change');
    });

    $("#searchCustomer").click(function () {
        if (IsCustomerBind == false) {
            getClientMaster([]);
        }
    });

    $("#CustomerStatus").change(function () {
        if ($("#CustomerStatus").val() == 'Active') {
            getClientMaster(ActiveCustomers);
        }
        else {
            getClientMasterInActive(InactiveCustomers);
        }
    });
    $("#ddlClients").change(function () {
        getGuestUsers("Onchange", $("#ddlClients").val());
    });
    $("#StatusProj,#DepartmentsProject").change(function () {
        var dlgTitle = 'Filtering projects...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
            currentDlgTask = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        });
        setTimeout(function () {
            loadprojectinsearch();
        }, 100);
    });

    $("#btnSelectCustomer").click(function () {
        setCustomerValue();
    });
    $("#btnProjectSelect").click(function () {
        setProjectValue();
    });

    //to open Reassignee button
    $("#linkReassignee").click(function () {
        if (IsOwner == true) {
            if (IsReassigneeClicked == false) {
                $("#tempPpl").html('');
                IsReassigneeClicked = true;
                $("#tempPpl").append('<div id="txtReassignee"></div>');
                initializePeoplePicker_AssaginTaskTeam("txtReassignee");//For Employee
                onChangeTask("txtReassignee_TopSpan", "txtReassignee", 'ReassigneeUserBox');
                var user = '';
                //EmpIds = [];
                //multipleEmailAddress = [];
                //assignUserName = [];
                for (var j = 0; j < arrAlreadyAssinEmp.length; j++) {
                    //EmpIds.push(arrAlreadyAssinEmp[j].userId);
                    //assignUserName.push(arrAlreadyAssinEmp[j].DisplayName);
                    var tempEmail = arrAlreadyAssinEmp[j].Email;
                    if (tempEmail.includes('#') == true) {
                        tempEmail = tempEmail.replace("#ext#@adaptindia.onmicrosoft.com", '');
                        tempEmail = tempEmail.replace("_", '@');
                    }
                    //multipleEmailAddress.push(tempEmail);
                    user = '';
                    var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                    user += '<div class="col-sm-6 userBoxParent"><div class="gridbox"><img src="' + attachment + '"><div class="peopleinfo">';
                    user += '<h5>' + arrAlreadyAssinEmp[j].DisplayName + '</h5><span onclick="OpenEmail(\'' + tempEmail + '\');">' + tempEmail + '</span></div>';
                    user += '<span class="crosebox" onclick="removeUserBox(this, \'' + tempEmail + '\', \'' + arrAlreadyAssinEmp[j].DisplayName + '\', ' + arrAlreadyAssinEmp[j].userId + ');"><i class="fa fa-times"></i></span></div></div>';
                    $("#ReassigneeUserBox").append(user);
                    //SetAndResolvePeoplePicker('txtReassignee', arrAlreadyAssinEmp[j].Email, false); //set People picker in Reassignee popup
                }
            }
            $("#Reassignee-Popup").modal('show');
        }
        else {
            alert("You are not authorized to perform this action.");
            return false;
        }
    });

    $("#btnOkReassign").click(function () {
        SaveReassignee();
    });

    SP.SOD.executeOrDelayUntilScriptLoaded(getCurrentURL_EventManageTaskCreation, "sp.js");

    if (currentTaskItemId == null || TaskAction == "CopyTask") {
        PageLoadAddTask();
    }

    $(".SortProject").click(function () {
        SortProjectTable(this.textContent);
    });
    $(".SortPredSucc").click(function () {
        SortPredSuccTable(this.textContent);
    });

    $('#createNewTask').click(function () {
        CreateNewTask();
    });

    $("#cancelTaskCreation").click(function () {
        if (IsModal != "true") {
            var txtProjectID = titanForWork.getQueryStringParameter("ProjectID");
            var txtCompanyId = Logged_CompanyId;
            var ProjectName = titanForWork.getQueryStringParameter("ProjectName");

            var url = _spPageContextInfo.webServerRelativeUrl;
            var redirectedPage = '';
            if (txtProjectID != '' && txtProjectID != null && txtProjectID != undefined) {
                redirectedPage = url + "/Pages/ViewProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + txtProjectID + "&Source=" + window.btoa('Tasks');
            } else {
                redirectedPage = url + "/Pages/mydashboard.aspx?WebAppId=" + txtCompanyId + "&Source=" + window.btoa('Tasks') + "&Location=" + TabId;
            }

            location.href = redirectedPage;
        }
        else {
            var locationPage = $.urlParam('sourceLocation');
            if (locationPage.includes("Guestportal") == true) {
                location.href = $.urlParam('sourceLocation');
            }
            else {
                if ($("#ProjectNameDetails :selected").text() == "-Select-") {
                    location.href = $.urlParam('sourceLocation') + "&ProjectName=" + $("#ProjectName").val();
                }
                else {
                    location.href = $.urlParam('sourceLocation') + "&ProjectName=" + $("#ProjectNameDetails :selected").text();
                }
            }
        }
    });

    $("#aTaskTeam").click(function () {
        if (IsModal != "true") { //If not guest user
            $("#myModal").modal();
            $("#txtserch").val('');
            $("#ddlShowUser option").remove();
            $("#ddlShowUser").append('<option value="2">My Subordinates</option>');
            $("#ddlShowUser").append('<option value="6">Department</option>');
            $("#ddlShowUser").append('<option value="7">Guest User</option>');
            $("#ddlShowUser").append('<option value="8">My group</option>');
            selectedText = "Having Name Like";
            $("#lblShowuser").show();
            $("#txtserchdiv").show();
            $("#lblDepartment").hide();
            $("#ddlDepartment").hide();
            $("#ddlClients").hide();
            $("#lblShowuser").html('');
            $("#lblShowuser").append("Name like:");
            GetGeneralTaskEmps('Onchange');
        }
        else {
            $("#myModal").modal();
            $("#txtserch").val('');
            $("#ddlShowUser option").remove();
            $("#ddlShowUser").append('<option value="2">Guest team members</option>');
            selectedText = "Having Name Like";
            $("#lblShowuser").show();
            $("#txtserchdiv").show();
            $("#lblDepartment").hide();
            $("#ddlDepartment").hide();
            $("#ddlClients").hide();
            $("#lblShowuser").html('');
            $("#lblShowuser").append("Name like:");
            getGuestTeamMembrs('Onchange', true);
        }
    });

    $("#aTaskProjectTeam").click(function () {
        $("#myModal").modal();
        $("#ddlShowUser option").remove();
        $("#ddlShowUser").prepend('<option value="1">All Team Members</option>');
        $("#lblShowuser").hide();
        $("#txtserchdiv").show();
        $("#lblDepartment").hide();
        $("#ddlDepartment").hide();
        $("#ddlClients").hide();
        $("#ddlMyGroup").hide();
        var projectvalue = $("#ProjectName :selected").val();
        GetProjectTeamMembers(projectvalue, "Onchange");
        LoadShowUser(TaskusersProjectTeam);
        $("#txtserch").val('');
    });

    //MY group Change Name
    $("#ddlMyGroup").change(function () {
        if ($("#ddlMyGroup").val() != "0") {
            getSelectedGroupMembers();
        }
        else {
            LoadShowUser([]);
        }
    });
    $("#ddlShowUser").change(function () {
        showUserChange(this);
    });

    $("#AssaginTaskTeam_TopSpan").keyup(function () {
        console.log('inside OnUserResolvedClientScript');
        var users = peoplePicker.GetAllUserInfo();
        for (var i = 0; i < users.length - 1; i++) {
            if (users[users.length - 1].Key == users[i].Key) {
                alert("User already exists!!");
            }

        }
    });
    //calling function to see more team members (load 100 at a time)
    $("#SeeMoreTeam").click(function () {
        var projectvalue = $("#ProjectName :selected").val();
        GetProjectTeamMembers(projectvalue, '');
    });
    //calling function to see more employee(General Task) (load 100 at a time)
    $("#SeeMoreGeneral").click(function () {
        GetGeneralTaskEmps('');
    });

    $("#SeeMoreDept").click(function () {
        Departmentfilter('');
    });
    $("#SeeMoreGuest").click(function () {
        getGuestUsers('', $("#ddlClients").val());
    });
    $("#txtserch").keyup(function () {
        SearchAssigneeTable();
    });
    $("#btnSuccTasks").click(function () {
        $("#txtModalTaskHeader").text('Successor Task');
        PredSuccTaskValidate();
    });
    $("#btnPredTasks").click(function () {
        $("#txtModalTaskHeader").text("Predecessor Task");
        PredSuccTaskValidate();
    });
    $("#btnSelectPredSuccTask").click(function () {
        SelectSuccPredTask();
    });
    $("#btnClearPredSuccTask").click(function () {
        $(".PredSuccTasks").prop('checked', '');
    });
    
    LoadShowUser(AllTaskUsersEmployeeuser);

    $("#FileUpload").on('change', function () {
        FinalFiles4Upload = [];
        var fileNum = this.files.length,
            initial = 0;
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
        $('#filename').empty();
        for (initial; initial < FinalFiles4Upload.length; initial++) {
            $('#filename').append('<div id="file_' + Tcounter + '"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF;display:none; font-size:12px; margin-top:2px;">' + Tcounter + '</strong></span> ' + RemoveDuplicate[initial] + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeLine(this.id);" id="file_' + Tcounter + '"" title="remove"></span></div>');
            Tcounter = Tcounter + 1;
        }
    });

    //to hide master page
    if (IsModal == "true") {
        $("#s4-bodyContainer .navbar-custom").hide();
        $(".SideTabMenu").hide();
        $("#ms-designer-ribbon").hide();
        $("#masterFooter").hide();
        $("#Audience").attr("disabled", "disabled");
        $("#searchCustomer").remove();
        if (Logged_CompanyId == "" || Logged_CompanyId == null || Logged_CompanyId == "null") {
            Logged_CompanyId = $.urlParam('WebAppId');
        }
        //$("#cancelTaskCreation").remove();
    }
    userActivityNotificationEntry(_spPageContextInfo.userId, window.location);
    //if type is not recursive hide the some control boxes 
    if (IsTaskRecursive == "Recursive" || IsTaskRecursive == "RecursiveUpdate") {
        $(".AssignDateHide").remove();
        $(".CurrentPhaseHide").remove();
        $(".AttachmentHide").remove();
        $("#ParentSuccessorTask").remove();
        $("#ParentPredecessorTask").remove();
        $('.EndDateRecursive').datepicker();
        $("#DeleteTask").hide();
        //$('.EndDateRecursive').datepicker("option", "dateFormat", "dd/mm/yy");
        //$('.DueDate').datepicker("destroy");
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
        //
    }
    else {
        $(".RecursiveHide").remove();
    }
    $(".LibTreeStruct").click(function () {
    	if(LibraryTreeBind == false) {
	    	TreeStructure();
	        myShareDepartmentCopy();
	        LibraryTreeBind = true;
        }
    });
});

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) { return results = "null"; }
    else {
        return results[1] || 0;
    }
}

//to make a table of Assign to
function LoadShowUser(AllTaskUsersEmployeeuser) {
    //Build Tabulator
    tabledata = new Tabulator("#example-table", {
        height: "253px",
        pagination: "local",
        paginationSize: 6,
        layout: "fitColumns",
        placeholder: "No user found.",
        data: AllTaskUsersEmployeeuser, //set initial table data
        columns: [{
            formatter: "rowSelection",
            titleFormatter: "rowSelection",
            align: "center",
            field: "UserId",
            width: 15,
            headerSort: false,
            cellClick: function (e, cell) {
                cell.getRow().toggleSelect();
            }
        },
        {
            title: "Name",
            field: "FullName",
            formatter: "html",
            width: 230,
            height: 37,
        },
        {
            title: "Designation",
            field: "Designation",
            width: 200,
            align: "left",
            sorter: "number"
        },
        {
            title: "Department",
            field: "Department",
            align: "left",
            width: 180
        },
        {
            title: "Manager",
            field: "Manager",
            align: "left",
            width: 190
        },
        {
            title: "Email",
            field: "EMail",
            width: 283
        },
        ],
    });
    $("#Rowcount").html("Total Row Count: " + AllTaskUsersEmployeeuser.length)
}

// Task creation according to project ID
function getCurrentURL_EventManageTaskCreation() {
    var txtProjectID = titanForWork.getQueryStringParameter("ProjectID");
    if (txtProjectID == undefined) {
        var ProjectNameHTML = '<select name="projectName" id="ProjectNameDetails" class="form-control" disabled=disabled>';
        ProjectNameHTML += '<option value="0">-Select-</option>';
        ProjectNameHTML += '</select>';
        ProjectNameHTML += '<button type="button" class="btn custom-btn ml-8 w-87" id="searchProject"><i class="fa fa-search" aria-hidden="true"></i></button>';
        $("#ProjectName").append(ProjectNameHTML);
        $("#searchProject").click(function () {
            if (IsProjectBind == false) {
                var dlgTitle = 'Loading Projects...';
                var dlgMsg = '<br />Please wait!!';
                var dlgHeight = 200;
                var dlgWidth = 400;
                SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                    currentDlgTask = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
                });
                setTimeout(function () {
                    ReadDepartment();
                    loadprojectinsearch();
                }, 100);
            }
            $("#otherProjectSearch").modal('show');
        });

    } else {
        BindProjectsForProjectsDashboard();
        TaskforProjectOnly(txtProjectID, currentTaskItemId);
        //CheckProjectStatus(txtProjectID);
        GetAllModule(txtProjectID);
        
    }
    if (TaskAction == "CopyTask") {
        //GetTaskEmailTemplate(3);
        getCopiedTaskDetails();
        GetAllModule(txtProjectID)      //lakhan
    }
    else {
        setDefaultClientMaster();
    }
    waitingDialog.hide();
}

//Read Department for Project list
function ReadDepartment() {
    var splittedDeptName = "";
    var RestQuery = "?$select=ID,Title&$filter=CompanyID eq '" + Logged_CompanyId + "'&$orderby=Title asc";
    $.when(getItemsWithQueryItem("Departments", RestQuery, "")).done(function (DeptResults) {
        var items = DeptResults.results;
        if (items.length > 0) {
            $("#SelectedItems").text("All");
            $('#DepartmentsProject').empty();
            $("#DepartmentsProject").append($("<option></option>").val("All").html("All"));
            for (i = 0; i < items.length; i++) {
                if (parseInt(items[i].Title.length) > 34) {
                    splittedDeptName = items[i].Title.substring(0, 34) + "...";
                }
                else {
                    splittedDeptName = items[i].Title;
                }
                $("#DepartmentsProject").append('<option value="' + items[i].Title + '" title="' + items[i].Title + '">' + splittedDeptName + '</option>');
            }
            $("#DepartmentsProject").val("All");
        }
    });
}

//get list of projects
function loadprojectinsearch() {
    var ProjectsListunique = '';
    var ProjectsList = [];
    var tableItemsHTML = '';
    $("#ProjectTables").empty();
    var CountProject = 0;
    var RestQuery = "?$select=*,TeamMember/EMail&$expand=TeamMember&$filter=TeamMember/EMail eq ('" + _spPageContextInfo.userEmail + "') and Status eq 'Active' and TaskPermission eq '1'&$orderby=Modified desc";
    $.when(getItemsWithQueryItem("ProjectTeamDetails", RestQuery, "")).done(function (ProjResults) {
        var items = ProjResults.results;
        for (var x = 0; x < items.length; x++) {
            ProjectsList.push(items[x].ProjectId);
        }
        ProjectsListunique = ProjectsList.filter(function (itm, i, ProjectsList) {
            return i == ProjectsList.indexOf(itm);
        });
    });

    var UserProjectList = [];
    if (ProjectsListunique.length > 0) {
        for (var K = 0; K < ProjectsListunique.length; K++) {
            var PROJID = ProjectsListunique[K];
            var sTatuS = $('select#StatusProj option:selected').val();
            var Department = $('select#DepartmentsProject option:selected').val();

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
            $.when(getItemsWithQueryItem("ProjectDetails", RestQuery, "")).done(function (ProjDetails) {
                var items = ProjDetails.results;
                IsProjectBind = true;
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
                        tableItemsHTML += "<tr><td><input type='radio' class='ProjectchkList' name='TaskListchk' title='" + items[i].ProjectName + "' value='" + itemId + "'></td>";
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
        $("#ProjectTables").append(tableItemsHTML);
        if (CountProject == 0) {
            tableItemsHTML += "<tr><td class='NoRecordFound' colspan='4' style='text-align: center;font-size:14px;' data-localize='NoRecordFound'>No record found!!</td></tr>"
            $("#ProjectTables").append(tableItemsHTML);
            $("#tablelocation").hide()
        }
        else {
            TableConfigurationProject();
            $("#tablelocation").show();
        }
        $("#TotalItemscountProject").text(CountProject);
    }
    if (currentDlgTask != "") {
        currentDlgTask.close();
    }
}

//Table configuration of projects
function TableConfigurationProject() {
    sorter = new TINY.table.sorter('sorter', 'TableProjects', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
        colddid: 'columns',
        currentid: 'currentpageProj',
        totalid: 'totalpagesProj',
        startingrecid: 'startrecord',
        endingrecid: 'endrecord',
        totalrecid: 'totalrecords',
        hoverid: 'selectedrow',
        pageddid: 'pagedropdownProject',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

//Set project value on radio button selection
function setProjectValue() {
    if ($('input[name="TaskListchk"]:checked')[0] != null) {
        $("#ProjectNameDetails").html('');
        var customerValue = $('input[name="TaskListchk"]:checked')[0].attributes.title.value;
        var value = '<option value="' + $('input[name="TaskListchk"]:checked').val() + '" Selected>' + customerValue + '</option>';
        $("#ProjectNameDetails").append(value);
        $("#otherProjectSearch").modal('hide');
        //show assign to
        $("#ProjectTeam").empty();
        $("#aTaskButton").show();
        $(".moduleName").show();
        initializePeoplePicker('AssaginTaskProjectTeam');
        peoplePickerDiv = $("[id$='AssaginTaskProjectTeam_TopSpan']");
        var projectvalue = $("#ProjectName :selected").val();
        onChangeTask("AssaginTaskProjectTeam_TopSpan", "AssaginTaskProjectTeam", "userHTMLBox");
        getProjectPlanedDate(projectvalue);
        GetAllModule(projectvalue);
    }
}

//get Client master list
function getClientMaster(array) {
    var listName = 'ClientMaster';
    var ClientHTML = '';
    if (array.length == 0) {
        if (Audience == 2) {
            RestQuery = "?$select=*&$filter=IsActive eq 1&$top=5000&$orderby=Title asc";
        }
        else {
            RestQuery = "?$select=SelfCompany,Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,TemplateType,IsActive,Supervisor/Id,Supervisor/Title,SalesPerson/Id,InternalMembers/Title,InternalMembers/Id,InternalSupervisor/Title,InternalSupervisor/Id,SalesPerson/Title&$expand=SalesPerson,Supervisor,InternalSupervisor,InternalMembers&$filter=CompanyID eq '" + Logged_CompanyId + "' and IsActive eq 1&$top=5000&$orderby=Title asc";
        }
        $('#mainDivAreaClientmaster').html('');
        var dfds = $.Deferred();
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items/" + RestQuery;
        $.when(getItems(url, dfds)).done(function (CalientDetails) {
            response = [];
            ActiveCustomers = CalientDetails;
            for (var i = 0; i < CalientDetails.length; i++) {

                var ClientID = CalientDetails[i].ID;
                var ClientTitle = CalientDetails[i].Title;
                var selfCompany = CalientDetails[i].SelfCompany;
                CalientDetails[i].Client_Code = CalientDetails[i].Client_Code ? CalientDetails[i].Client_Code : "";
                CalientDetails[i].Attn_Name = CalientDetails[i].Attn_Name ? CalientDetails[i].Attn_Name : "";
                CalientDetails[i].CustType = CalientDetails[i].CustType ? CalientDetails[i].CustType : "";
                if (selfCompany == true) {
                    ClientHTML += "<tr><td><label><input type='radio' class='radioCust' name='Customer' title='" + ClientTitle + "' value='" + ClientID + "' class='CustomerchkList' checked></label></td>";
                    ClientHTML += "<td><span>" + ClientTitle + "</span></td><td style='display:none;'><span>" + ClientID + "</span></td>";
                    ClientHTML += "<td><span>" + CalientDetails[i].Client_Code + "</span></td><td><span>" + CalientDetails[i].Attn_Name + "</span></td><td><span>" + CalientDetails[i].CustType + "</span></td></tr>";
                }
                else {
                    ClientHTML += "<tr><td><label><input type='radio' name='Customer' title='" + ClientTitle + "' value='" + ClientID + "' class='CustomerchkList'></label></td>";
                    ClientHTML += "<td><span>" + ClientTitle + "</span></td><td style='display:none;'><span>" + ClientID + "</span></td>";
                    ClientHTML += "<td><span>" + CalientDetails[i].Client_Code + "</span></td><td><span>" + CalientDetails[i].Attn_Name + "</span></td><td><span>" + CalientDetails[i].CustType + "</span></td></tr>";
                }
            }
            $('#mainDivAreaClientmaster').append(ClientHTML);
            GenerateTableMyCustomerList();
            IsCustomerBind = true;
        });
    }
    else {
        $('#mainDivAreaClientmaster').html('');
        for (var i = 0; i < array.length; i++) {
            var ClientID = array[i].ID;
            var ClientTitle = array[i].Title;
            var selfCompany = array[i].SelfCompany;
            if (selfCompany == true) {
                ClientHTML += "<tr><td><label><input type='radio' class='radioCust' name='Customer' title='" + ClientTitle + "' value='" + ClientID + "' class='CustomerchkList' checked></label></td>";
                ClientHTML += "<td><span>" + ClientTitle + "</span></td><td style='display:none;'><span>" + ClientID + "</span></td>";
                ClientHTML += "<td><span>" + array[i].Client_Code + "</span></td><td><span>" + array[i].Attn_Name + "</span></td><td><span>" + array[i].CustType + "</span></td></tr>";
            }
            else {
                ClientHTML += "<tr><td><label><input type='radio' name='Customer' title='" + ClientTitle + "' value='" + ClientID + "' class='CustomerchkList'></label></td>";
                ClientHTML += "<td><span>" + ClientTitle + "</span></td><td style='display:none;'><span>" + ClientID + "</span></td>";
                ClientHTML += "<td><span>" + array[i].Client_Code + "</span></td><td><span>" + array[i].Attn_Name + "</span></td><td><span>" + array[i].CustType + "</span></td></tr>";
            }
        }
        $('#mainDivAreaClientmaster').append(ClientHTML);
        GenerateTableMyCustomerList();
    }
}

//get All clients - Active and Inactive
function getClientMasterInActive(array) {
    var listName = 'ClientMaster';
    var ClientHTML = '';
    if (array.length == 0) {
        if (Audience == 2) {
            RestQuery = "?$select=*&$filter=IsActive eq 0&$top=5000&$orderby=Title asc";
        }
        else {
            RestQuery = "?$select=SelfCompany,Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,TemplateType,IsActive,Supervisor/Id,Supervisor/Title,SalesPerson/Id,InternalMembers/Title,InternalMembers/Id,InternalSupervisor/Title,InternalSupervisor/Id,SalesPerson/Title&$expand=SalesPerson,Supervisor,InternalSupervisor,InternalMembers&$filter=CompanyID eq '" + Logged_CompanyId + "' and IsActive eq 0&$top=5000&$orderby=Title asc";
        }
        $('#mainDivAreaClientmaster').html('');
        var dfds = $.Deferred();
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items/" + RestQuery;
        $.when(getItems(url, dfds)).done(function (CalientDetails) {
            response = [];
            InactiveCustomers = CalientDetails;
            for (var i = 0; i < CalientDetails.length; i++) {

                var ClientID = CalientDetails[i].ID;
                var ClientTitle = CalientDetails[i].Title;
                var selfCompany = CalientDetails[i].SelfCompany;
                if (selfCompany == true) {
                    ClientHTML += "<tr><td><label><input type='radio' class='radioCust' name='Customer' title='" + ClientTitle + "' value='" + ClientID + "' class='CustomerchkList' checked></label></td>";
                    ClientHTML += "<td><span>" + ClientTitle + "</span></td><td style='display:none;'><span>" + ClientID + "</span></td>";
                    ClientHTML += "<td><span>" + CalientDetails[i].Client_Code + "</span></td><td><span>" + CalientDetails[i].Attn_Name + "</span></td><td><span>" + CalientDetails[i].CustType + "</span></td></tr>";
                }
                else {
                    ClientHTML += "<tr><td><label><input type='radio' name='Customer' title='" + ClientTitle + "' value='" + ClientID + "' class='CustomerchkList'></label></td>";
                    ClientHTML += "<td><span>" + ClientTitle + "</span></td><td style='display:none;'><span>" + ClientID + "</span></td>";
                    ClientHTML += "<td><span>" + CalientDetails[i].Client_Code + "</span></td><td><span>" + CalientDetails[i].Attn_Name + "</span></td><td><span>" + CalientDetails[i].CustType + "</span></td></tr>";
                }
            }
            $('#mainDivAreaClientmaster').append(ClientHTML);
            GenerateTableMyCustomerList();
            IsCustomerBind = true;
        });
    }
    else {
        $('#mainDivAreaClientmaster').html('');
        for (var i = 0; i < array.length; i++) {
            var ClientID = array[i].ID;
            var ClientTitle = array[i].Title;
            var selfCompany = array[i].SelfCompany;
            if (selfCompany == true) {
                ClientHTML += "<tr><td><label><input type='radio' class='radioCust' name='Customer' title='" + ClientTitle + "' value='" + ClientID + "' class='CustomerchkList' checked></label></td>";
                ClientHTML += "<td><span>" + ClientTitle + "</span></td><td style='display:none;'><span>" + ClientID + "</span></td>";
                ClientHTML += "<td><span>" + array[i].Client_Code + "</span></td><td><span>" + array[i].Attn_Name + "</span></td><td><span>" + array[i].CustType + "</span></td></tr>";
            }
            else {
                ClientHTML += "<tr><td><label><input type='radio' name='Customer' title='" + ClientTitle + "' value='" + ClientID + "' class='CustomerchkList'></label></td>";
                ClientHTML += "<td><span>" + ClientTitle + "</span></td><td style='display:none;'><span>" + ClientID + "</span></td>";
                ClientHTML += "<td><span>" + array[i].Client_Code + "</span></td><td><span>" + array[i].Attn_Name + "</span></td><td><span>" + array[i].CustType + "</span></td></tr>";
            }
        }
        $('#mainDivAreaClientmaster').append(ClientHTML);
        GenerateTableMyCustomerList();
    }
}

////Set customer value on radio button selection
function setCustomerValue() {
    $("#categoryType").html('');
    var customerValue = $('input[name="Customer"]:checked')[0].attributes.title.value;
    var value = '<option value="' + $('input[name="Customer"]:checked').val() + '" Selected>' + customerValue + '</option>';
    $("#categoryType").append(value);
    $("#otherCustomerSearch").modal('hide');
}

//set Default value of customer
function setDefaultClientMaster() {
    var listName = 'ClientMaster';
    var ClientHTML = '';
    if (Audience == 2) {
        RestQuery = "?$select=*&$filter=IsActive eq 1 and SelfCompany eq 1&$top=5000";
    }
    else {
        RestQuery = "?$select=SelfCompany,Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,TemplateType,IsActive,Supervisor/Id,Supervisor/Title,SalesPerson/Id,InternalMembers/Title,InternalMembers/Id,InternalSupervisor/Title,InternalSupervisor/Id,SalesPerson/Title&$expand=SalesPerson,Supervisor,InternalSupervisor,InternalMembers&$filter=CompanyID eq '" + Logged_CompanyId + "' and IsActive eq 1 and SelfCompany eq 1&$top=5000";
    }
    $('#mainDivAreaClientmaster').html('');

    var dfds = $.Deferred();
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items/" + RestQuery;
    $.when(getItems(url, dfds)).done(function (CalientDetails) {
        response = [];
        if (CalientDetails.length > 0) {
            var ClientID = CalientDetails[0].ID;
            var ClientTitle = CalientDetails[0].Title;
            $("#categoryType").html('');
            var value = '<option value="' + ClientID + '" Selected>' + ClientTitle + '</option>';
            $("#categoryType").append(value);
        }
    });
}

//Table configuration of customers
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

//get all worktype list and bind
function getWorkType() {
    var txtCompanyId = Logged_CompanyId;
    var listName = 'CategoryMaster';
    var txtCompanyId = Logged_CompanyId
    //debugger;
    RestQuery = "?$select=*&$filter=CategoryType eq 'Work Type' and Status eq 'Yes'&$orderby= CatogeryName asc";
    $.when(CommonFunction.getItemsWithQueryItem("CategoryMaster", RestQuery)).done(function (CategoryDetails) {
        var CategoryHTML = '<select name="CategogryType" id="category" class="form-control">';
        CategoryHTML += '<option value="0">-Select-</option>';

        for (var i = 0; i < CategoryDetails.results.length; i++) {

            var CategoryID = CategoryDetails.results[i].ID;
            var Category = CategoryDetails.results[i].CatogeryName;
            CategoryHTML += '<option value="' + Category + '">' + Category + '</option>';
        }
        CategoryHTML += '</select>';
        $("#WorkType").append(CategoryHTML);
    });
}


function TaskforProjectOnly(txtProjectID, TaskId) {
    initializePeoplePicker('AssaginTaskProjectTeam');
    onChangeTask('AssaginTaskProjectTeam_TopSpan', 'AssaginTaskProjectTeam', 'userHTMLBox');
    peoplePickerDiv = $("[id$='AssaginTaskProjectTeam_TopSpan']");

    $('#TaskType option[value="1"]').attr('selected', 'selected');
    $('#TaskType').attr("disabled", true);
    $('#ProjectName').attr("disabled", true);
    $(".projectName").show();
    $('#ProjectName').find('select#ProjectNameDetails option[value="' + txtProjectID + '"]').attr('selected', 'selected');
    $('#ProjectNameDetails').attr("disabled", true);
	if(TaskId == "" || TaskId == "null" || TaskId == null) {
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
	
	
	    $('.StartDate').datepicker("setDate", new Date());
	}

    var projectvalue = $("#ProjectName :selected").val();
    if (TaskId != undefined) {
        $(".ProjectTeam").hide();
        $(".IntimateProjectTeam").hide();
    } else {
        $("#aTaskButton").show();
        $(".ProjectTeam").show();
        //$(".IntimateProjectTeam").show();
        $(".IntimateProjectTeam").hide(); //hide

    }
    getProjectPlanedDate(txtProjectID);
}

//get metadata of copied task
function getCopiedTaskDetails() {
    var RestQuery = "?$select=*,Module/Title,ClientID/ID,ClientID/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/Id,TaskAssignToId,Author/Title,Author/EMail,AttachmentFiles&$top=5000&$expand=AttachmentFiles,ClientID,Module,TaskAssignTo,Author&$filter=ID eq '" + currentTaskItemId + "'";
    $.when(getItemsWithQueryItem("EmployeeTaskDetails", RestQuery, "")).done(function (TaskResults) {
        var items = TaskResults.results;
        //getWorkType();
        $("#TaskName").val("Copy of " + items[0].Title);
        $("#TaskType").val(items[0].TaskType);
        $("#TaskType").trigger("change");
        $('#category').val(items[0].Worktype);
        if ($("#TaskType").val() == "2") {
            var PeoplePickId = "AssaginTaskTeam";
            $("#categoryType").empty();
            var value = '<option value="' + items[0].ClientID.ID + '" Selected>' + items[0].ClientID.Title + '</option>';
            $("#categoryType").append(value);
        }
        else {
            var PeoplePickId = "AssaginTaskProjectTeam";
            $("#ProjectNameDetails").empty();
            var value = '<option value="' + items[0].ProjectIDId + '" Selected>' + items[0].ProjectFullName + '</option>';
            $("#ProjectNameDetails").append(value);
            //show assign to
            $("#ProjectTeam").empty();
            $("#aTaskButton").show();
            $(".moduleName").show();
            initializePeoplePicker('AssaginTaskProjectTeam');
            peoplePickerDiv = $("[id$='AssaginTaskProjectTeam_TopSpan']");
            var projectvalue = $("#ProjectName :selected").val();
            getProjectPlanedDate(projectvalue);
            GetAllModule(projectvalue);
            $("#projectModule").val(items[0].ModuleId);
        }
        var user = '';
        for (var usr = 0; usr < items[0].TaskAssignTo.results.length; usr++) {
            $(".peoplepickerbox").show();
            EmpIds.push(items[0].TaskAssignTo.results[usr].Id);
            multipleEmailAddress.push(items[0].TaskAssignTo.results[usr].EMail.toLowerCase());
            assignUserName.push(items[0].TaskAssignTo.results[usr].Title);
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].TaskAssignTo.results[usr].EMail);
            user += '<div class="col-md-6 userBoxParent"><div class="gridbox"><img src="' + attachment + '"><div class="peopleinfo">';
            user += '<h5>' + items[0].TaskAssignTo.results[usr].Title + '</h5><span onclick="OpenEmail(\'' + items[0].TaskAssignTo.results[usr].EMail + '\');">' + items[0].TaskAssignTo.results[usr].EMail + '</span></div>';
            user += '<span class="crosebox" onclick="removeUserBox(this, \'' + items[0].TaskAssignTo.results[usr].EMail + '\', \'' + items[0].TaskAssignTo.results[usr].Title + '\', ' + items[0].TaskAssignTo.results[usr].Id + ');"><i class="fa fa-times"></i></span></div></div>';
            //SetAndResolvePeoplePicker(PeoplePickId, items[0].TaskAssignTo.results[usr].EMail, false);
        }
        $("#userHTMLBox").append(user);
        $("#comment").val(items[0].Description);
        var FinalStartDate = new Date();
        FinalStartDate = $.datepicker.formatDate('MM dd, yy', FinalStartDate);
        $('.StartDate').val(FinalStartDate);
        //var FinalDueDate = new Date(items[0].DueDate);
        //FinalDueDate = $.datepicker.formatDate('dd/mm/yy', FinalDueDate);
        //$('.DueDate').val(FinalDueDate);
        $("#Priority").val(items[0].TaskPriority);
        $("#TaskDistribution").val(items[0].Distribution);
        if (items[0].ReferenceLink != null) {
            $("#RefURL").val(items[0].ReferenceLink.Url ? items[0].ReferenceLink.Url : "");
        }
        onChangeTask('AssaginTaskProjectTeam_TopSpan', 'AssaginTaskProjectTeam', 'userHTMLBox');
    });
}

//check if any assignee filled the timesheet
function checkProjTimeSheet() {
    IsCheck = false;
    var RestQuery = "?$select=TaskID/Id,Employee/EMail&$expand=TaskID,Employee&$filter=TaskID/Id eq '" + currentTaskItemId + "' ";
    $.when(getItemsWithQueryItem("EmpTimeSheet", RestQuery, "")).done(function (TimeSheetResults) {
        if (TimeSheetResults.results.length > 0) {
            IsCheck = true;
        }
    });
    return IsCheck;
}

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

//get userName by user ID
function getUserName(createdBy) {
    var items = '';
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + createdBy + ")";
    $.ajax({
        url: siteURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            items = data.d.Title;
        },
        eror: function (data) {
            alert($('#txtSomethingWentWrong').val());
        }
    });
    return items;
}


function BindProjectsForProjectsDashboard() {
    var projectID = titanForWork.getQueryStringParameter("ProjectID");
    RestQuery = "?$select=*,ID,ProjectName&$filter=ID eq '" + projectID + "'&$orderby = Title asc";
    $.when(getItemsWithQueryItem("ProjectDetails", RestQuery, "")).done(function (ProjResults) {
        var items = ProjResults.results;

        if (items.length > 0) {
            var ProjectNameHTML = '<select name="projectName" id="ProjectNameDetails" class="form-control">';
            ProjectNameHTML += '<option value="0">-Select-</option>';
            var projectStatus = items[0]['Status'];
            if (projectStatus != "Live") {
                $("#createNewTask").hide();
                $(".CompletionDate").attr('disabled', 'disabled');
                $("#ProjectCurrentPhase").attr('disabled', 'disabled');
            }
            for (i = 0; i < items.length; i++) {
                var ProjectID = items[i].ID;
                var ProjectName = items[i].ProjectName;
                ProjectNameHTML += '<option value="' + ProjectID + '">' + ProjectName + '</option>';
            }
            ProjectNameHTML += '</select>';
            $("#ProjectName").html('');
            $("#ProjectName").append(ProjectNameHTML);
            
        }
    });
}

//get team members of selected project
function GetProjectTeamMembers(ProjectId, Action) {
    var totalTeamUsers = 0;
    $("#SeeMoreGeneral").hide();
    $("#SeeMoreDept").hide();
    $("#SeeMoreGuest").hide();
    $(".ProjectSeeView").show();
    $("#SeeMoreGuestTeam").hide();
    if (Action == "Onchange") {
        Taskusers = [];
        TaskusersProjectTeam = [];
        RestQuery = "?$select=*,TeamMember/Id,TeamMember/Name,TeamMember/Title,TeamMember/EMail&$expand=TeamMember&$top=100&$filter= Status eq 'Active' and ProjectId eq '" + ProjectId + "'&$orderby = Title asc ";
        var dfds = $.Deferred();
        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items/" + RestQuery;
        $.when(getItems(url, dfds)).done(function (EmpResults) {
            response = [];
            if (EmpResults.length > 0) {
                totalTeamUsers = EmpResults.length;
            }
            $("#TotalProject").text(totalTeamUsers);
        });
    }
    else {
        if (NextURLProject != null) {
            var RestQuery = "?" + NextURLProject.split('?')[1];
        }
        else {
            $(".ProjectSeeView").hide();
            return;
        }
    }
    $.when(getItemsWithQueryItem("ProjectTeamDetails", RestQuery, "Project")).done(function (ProjectTeamDetails) {
        var TeamMembers;
        IsNotTeamMember = "";

        if (NextURLProject == null) {
            $(".ProjectSeeView").hide();
        }

        for (var i = 0; i < ProjectTeamDetails.results.length; i++) {
            TeamMembers = checkUserValid(ProjectTeamDetails.results[i].TeamMember.EMail);
            if (TeamMembers.length == 0) {
                IsNotTeamMember += ProjectTeamDetails.results[i].TeamMember.Title + ",";
                IsCheckUser = true;
            } else {
                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TeamMembers[0].EMail);
                var FullAttachmentURL = '<div><img style="width:30px;height:30px;border-radius:50%;" src=' + employeePicURL + '><span>' + TeamMembers[0].FullName + '</span></div>';
                TaskusersProjectTeam.push({
                    'UserId': TeamMembers[0].EmployeeID,
                    'EMail': TeamMembers[0].EMail,
                    'LoginName': TeamMembers[0].FullName,
                    'Designation': TeamMembers[0].Designation,
                    'Manager': TeamMembers[0].Manager,
                    'DepartmentId': TeamMembers[0].DepartmentId,
                    'Department': TeamMembers[0].Department,
                    'FullName': FullAttachmentURL,
                    'CompanyID': TeamMembers[0].CompanyID,
                    'EmployeeID': TeamMembers[0].EmployeeID,
                    'Skill': ""
                })
            }
        }

        LoadShowUser(TaskusersProjectTeam);

        if (Action == "") {
            totalTeamUsers = TaskusersProjectTeam.length;
        }

        //Showing data out of total
        if (totalTeamUsers > 100 && NextURLProject != null) {
            $("#Rowcount").hide();
            $("#ShowProject").show();
            $(".ProjectSeeView").show();
            $("#DiplayProject").text(TaskusersProjectTeam.length);
        }
        else {
            $("#Rowcount").show();
            $("#ShowProject").hide();
            $(".ProjectSeeView").hide();
        }

        if (IsCheckUser) {
            IsCheckUser = false;
            if (IsNotTeamMember[IsNotTeamMember.length - 1] == ",") {
                IsNotTeamMember = IsNotTeamMember.replace(',', ' ');
            }
            IsNotTeamMember += "is not a valid user.";
            alert(IsNotTeamMember);
        }
    });
}

//check if user id valid or not - Internal and External both
function checkUserValid(Email) {
    var userValid = [];
    var txtCompanyId = Logged_CompanyId;//Logged_CompanyId
    if (Audience == 2) {
        RestQuery = "?$select=*,AttachmentFiles,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID&$orderby= FullName asc &$expand=AttachmentFiles,LogonName,Department,Company &$filter= Status eq 'Active' and (LogonName/EMail eq '" + Email + "' or Email eq '" + Email + "')&$top=5000";
    } else {
        RestQuery = "?$select=*,AttachmentFiles,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID&$orderby= FullName asc &$expand=AttachmentFiles,LogonName,Department,Company &$filter= Status eq 'Active' and Company/ID eq '" + txtCompanyId + "' and (LogonName/EMail eq '" + Email + "' or Email eq '" + Email + "')&$top=5000";
    }
    dfds = $.Deferred(),
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + RestQuery;
    $.when(getItems(url, dfds)).done(function (Employees) {
        try {
            response = [];
            if (Employees.length > 0) {
                for (k = 0; k < Employees.length; k++) {
                    userValid.push({
                        EMail: Employees[0].Email,
                        //LoginName: Employees[0].LoginName,
                        Designation: Employees[0].Designation ? Employees[0].Designation : "N/A",
                        Manager: Employees[0].Manager,
                        DepartmentId: Employees[0].DepartmentId ? Employees[0].DepartmentId : "N/A",
                        Department: Employees[0].Department.DepartmentName ? Employees[0].Department.DepartmentName : "N/A",
                        FullName: Employees[0].FullName,
                        CompanyID: Employees[0].Company.ID,
                        EmployeeID: Employees[0].LogonName.Id,
                        Skill: "",
                        AttachmentFiles: Employees[0].AttachmentFiles
                    });
                }
            }
            else {
                //Check in External Users list
                var Query = "?$select=*,AttachmentFiles,LoginName/EMail,LoginName/Title,LoginName/Id,Supervisor/Title,Designation,Client_Name/Title,Client_Name/Id&$expand=AttachmentFiles,LoginName,Client_Name,Supervisor&$filter=LoginName/EMail eq '" + Email + "' or email eq '" + Email + "'&$top=5000";
                dfds = $.Deferred();
                url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
                $.when(getItems(url, dfds)).done(function (ExtResults) {
                    response = [];
                    if (ExtResults.length > 0) {
                        userValid.push({
                            EMail: ExtResults[0].LoginName.EMail,
                            //LoginName: Employees[0].LoginName,
                            Designation: ExtResults[0].Designation ? ExtResults[0].Designation : "N/A",
                            Manager: ExtResults[0].Supervisor.Title,
                            DepartmentId: "",
                            Department: "",
                            FullName: ExtResults[0].LoginName.Title,
                            CompanyID: Logged_CompanyId,
                            EmployeeID: ExtResults[0].LoginName.Id,
                            Skill: "",
                            AttachmentFiles: ExtResults[0].AttachmentFiles
                        });
                    }
                });
            }
        } catch (e) {
            alert(e);
        }
    });
    return userValid;
}


//get client name 
function getClientNames() {
    $("#SeeMoreGeneral").hide();
    $("#SeeMoreDept").hide();
    $("#SeeMoreGuest").show();
    $(".ProjectSeeView").hide();
    $("#SeeMoreGuestTeam").hide();
    $("#SeeMoreGuest").hide();
    var RestQuery = "?$select=*,InternalSupervisor/EMail,InternalMembers/EMail&$expand=InternalMembers,InternalSupervisor&$top=5000&$filter=(InternalSupervisor/EMail eq '" + _spPageContextInfo.userEmail + "' or InternalMembers/EMail eq '" + _spPageContextInfo.userEmail + "') and IsActive eq 1&$orderby = Title asc ",
        dfds = $.Deferred(),
        Client = '';
    $.when(getItemsWithQueryItem("ClientMaster", RestQuery, "")).done(function (ClientName) {
        Client += "<option value=\"0\">-dropdown of clients-</option>"
        $.each(ClientName.results, function (i, item) {
            var ID = item.Id;
            var ClientTitle = item.Title;
            Client += "<option value=\"" + ID + "\">" + ClientTitle + "</option>";
        });
        $("#ddlClients").html('');
        $("#ddlClients").append(Client);
    });
}




//get guest users list
function getGuestUsers(Action, ClientID) {
    var totalTeamUsers = 0;
    if (Action == "Onchange") {
        RestQuery = "?$select=*,AttachmentFiles,InternalStakeholders/EMail,Supervisor/EMail,Supervisor/Title,Client_Name/Title,Client_Name/Id,LoginName/Title&$expand=AttachmentFiles,InternalStakeholders,LoginName,Supervisor,Client_Name&$top=100&$filter=Client_Name/Id eq '" + ClientID + "' and Status eq 'Active'&$orderby = Title asc ";
        var AllQuery = "?$select=*,AttachmentFiles,InternalStakeholders/EMail,Supervisor/EMail,Supervisor/Title,Client_Name/Title,Client_Name/Id,LoginName/Title&$expand=AttachmentFiles,InternalStakeholders,LoginName,Supervisor,Client_Name&$top=100&$filter=Client_Name/Id eq '" + ClientID + "' and Status eq 'Active'&$orderby = Title asc ";
        TaskusersProjectTeam = [];
        var dfds = $.Deferred(),
    	url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + AllQuery;
        $.when(getItems(url, dfds)).done(function (EmpResults) {
            response = [];
            if (EmpResults.length > 0) {
                totalTeamUsers = EmpResults.length;
            }
            $("#TotalProject").text(totalTeamUsers);
        });
    }
    else {
        if (NextUrlGuest != null) {
            var RestQuery = "?" + NextUrlGuest.split('?')[1];
        }
        else {
            $("#SeeMoreGuest").hide();
            return;
        }
    }

    $.when(getItemsWithQueryItem("ExternalUsers", RestQuery, "GuestTask")).done(function (ProjectTeamDetails) {
        var Exrernal = '';
        IsNotExrernal = "";

        if (NextUrlGuest == null) {
            $("#SeeMoreGuest").hide();
        }
        for (var i = 0; i < ProjectTeamDetails.results.length; i++) {
            Exrernal = ProjectTeamDetails.results;
            if (Exrernal[i].AttachmentFiles.results.length > 0) {
                var employeePicURL = Exrernal[i].AttachmentFiles.results[0].ServerRelativeUrl;
            }
            else {
                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Exrernal[i].email)
            }
            TaskusersProjectTeam.push({
                'UserId': Exrernal[i].LoginNameId,
                'EMail': Exrernal[i].email,
                'LoginName': Exrernal[i].LoginName.Title,
                'Designation': Exrernal[i].Designation ? Exrernal[i].Designation : "NA",
                'Manager': Exrernal[i].Supervisor.Title,
                'DepartmentId': Exrernal[i].DepartmentId,
                'Department': Exrernal[i].Department,
                'FullName': '<div><img style="width:30px;height:30px;border-radius:50%;" src=' + employeePicURL + '><span>' + Exrernal[i].LoginName.Title + '</span></div>', //Exrernal[i].FullName,
                'CompanyID': Exrernal[i].CompanyID,
                'EmployeeID': Exrernal[i].EmployeeID,
                'Skill': Exrernal[i].Skill ? Exrernal[i].Skill : "NA"
            })
        }
        LoadShowUser(TaskusersProjectTeam);
        if (Action == "") {
            totalTeamUsers = TaskusersProjectTeam.length;
        }
        //Showing data out of total
        if (totalTeamUsers > 100 && NextUrlDept != null) {
            $("#Rowcount").hide();
            $("#ShowProject").show();
            $("#SeeMoreGuest").show();
            $("#DiplayProject").text(TaskusersProjectTeam.length);

        }
        else {
            $("#Rowcount").show();
            $("#ShowProject").hide();
            $("#SeeMoreGuest").hide();
        }

        if (IsCheckUser) {
            IsCheckUser = false;
            IsNotExrernal += "is not a valid user";
            alert(IsNotExrernal);
        }
    });
}

//get project planned date by ID 
function getProjectPlanedDate(projectvalue) {
    var RestQuery = "?$select=*&$filter=ID eq '" + projectvalue + "'";
    $.when(getItemsWithQueryItem("ProjectDetails", RestQuery, "")).done(function (ProjectDetails) {
        var items = ProjectDetails.results;
        var PlanedStartDateGlobal1 = new Date(items[0].PlanedStartDate);
        var PlanedEndDateGlobal1 = new Date(items[0].PlanedEndDate);
    });
}

//save Task in SP list
function saveEmployeeTask() {
    var validation = false;
    var cutomervalidate = false;
    var ProjectNameDetails = '';
    var ProjectFullName = '';
    var TaskAssignTo = new Array();
    var TaskManager = new Array();
    var completionInPersent = '';
    var cutsomer = '';
    var txtCompanyId = Logged_CompanyId

    var TaskName = $('#TaskName').val();
    if (TaskName == '') {
        validation = true;
    }

    var TaskType = $('#TaskType').val();
    if (TaskType == 0) {
        validation = true;
    }
    var Discription = $('#comment').val();
    var DoesNotexietuser = "";
    var IsTrue = false;
    for (var j = 0; j < multipleEmailAddress.length; j++) {
        var arrSubVisaLetters = checkUserValid(multipleEmailAddress[j]);

        if (arrSubVisaLetters.length == 0) {
            for (k = 0; k < GuestUser.length; k++) {
                if (GuestUser[k].email.toLowerCase() == multipleEmailAddress[j].toLowerCase()) {
                    TaskAssignTo.push(GuestUser[k].LoginNameId)
                }
            }
        }
        else {
            TaskAssignTo.push(arrSubVisaLetters[0].EmployeeID);
        }
    }
    if (TaskType == 1) {
        ProjectNameDetails = $('#ProjectName').find('#ProjectNameDetails').val(); //$(this).find('.ddlGeneralInfo_TypeOfProgram').val();
        ProjectFullName = $('#ProjectName').find("select#ProjectNameDetails option:selected").text();

        if (ProjectNameDetails == 0 || TaskAssignTo.length == 0) {
            validation = true;
        }
        RestQuery = "?$Select=*,ClientID/ID,ClientID/Title&$expand=ClientID/ID&$filter=ID eq '" + ProjectNameDetails + "'";
        $.when(CommonFunction.getItemsWithQueryItem("ProjectDetails", RestQuery)).done(function (ProjectDetails) {
            cutsomer = ProjectDetails.results[0].ClientIDId;
            if (cutsomer == null) {
                validation = true;
                cutomervalidate = true;
            }
        })
    } else if (TaskType == 2) {

        if (TaskAssignTo.length == 0) {
            validation = true;
        }
        // cutsomer = $('#clientName').val()
        cutsomer = $('#categoryType').val()
        if (cutsomer == 0) {
            validation = true;
        }
    }

    var StartDate = $('.StartDate').val();
    if (StartDate == '') {
        validation = true;
    }
    var FinalStartDate = "";
    if (StartDate != null && StartDate != "") {
        FinalStartDate = GetDateStandardFormat(moment(StartDate).format('DD/MM/YYYY'));
    }
    var Module = $('#projectModule').val(); //$('#projectModule option:selected' ).text()
    if (Module == '') {

    }
    var Worktype = $('#category').val();
    if (Worktype == 0) {
        validation = true;
    }

    var DueDate = $('.DueDate').val();
    if (DueDate == '') {
        validation = true;
    }
    var FinalDueDate = "";
    if (DueDate != null && DueDate != "") {
        FinalDueDate = GetDateStandardFormat(moment(DueDate).format('DD/MM/YYYY'));
    }
    var Priority = $('#Priority').val();

    var CompletionDate = $('.CompletionDate').val();
    var FinalCompletionDate = "";
    if (CompletionDate < StartDate) {
        alert('Completion Date should not be less then Assign Date.');
    }
    else {
        if (CompletionDate != null && CompletionDate != "") {
            FinalCompletionDate = GetDateStandardFormat(moment(CompletionDate).format('DD/MM/YYYY'));
        }
    }
    var Distribution = $('#TaskDistribution').val();
    var ProjectCurrentPhase = $('#ProjectCurrentPhase').val();
    if (FinalDueDate >= FinalStartDate && validation == false) {
        if (Distribution == 'Individual') {
            for (i = 0; i < TaskAssignTo.length; i++) {

                var taskAssignTo = new Array();
                taskAssignTo.push(TaskAssignTo[i]);
                AddNewTak("EmployeeTaskDetails", TaskName, TaskType, Discription, cutsomer, Module, Worktype, FinalStartDate, FinalDueDate, completionInPersent, ProjectCurrentPhase, ProjectNameDetails, ProjectFullName, taskAssignTo, Priority, txtCompanyId, Distribution, TaskAssignTo.length, i);
            }
        } else if (Distribution == 'Consolidated') {
            AddNewTak("EmployeeTaskDetails", TaskName, TaskType, Discription, cutsomer, Module, Worktype, FinalStartDate, FinalDueDate, completionInPersent, ProjectCurrentPhase, ProjectNameDetails, ProjectFullName, TaskAssignTo, Priority, txtCompanyId, Distribution, '', '');
        }

    } else if (validation == true) {
        if (validation == true && cutomervalidate == true) {
            alert("This Project does not defined with any Client.\n Please update this Project with a valid Client first.");
            currentDlgTask.close();
        }
        else {
            alert("Please fill all mandatory field.");
            currentDlgTask.close();
        }
    }
    else {
        alert("Due Date can not less than Start Date");
        currentDlgTask.close();
    }
}

//colled metadata for task
function AddNewTak(ListName, TaskName, TaskType, Discription, cutsomer, Module, Worktype, FinalStartDate, FinalDueDate, completionInPersent, ProjectCurrentPhase, ProjectNameDetails, ProjectFullName, TaskAssignTo, Priority, txtCompanyId, Distribution, TotalUsers, currentIndex) {
    try {
        var Metadata;
        var arrDays = [];
        if (IsTaskRecursive == "Recursive" || IsTaskRecursive == "RecursiveUpdate") {
            ListName = 'RecurringTaskSetup';
            $boxes = $('.chkDayName:checked');
            $boxes.each(function (val) {
                arrDays.push(this.value);
            });
        }
        var ItemType = GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: {
                'type': ItemType
            },

            Title: TaskName,
            TaskType: TaskType,
            ProjectName: ProjectNameDetails,
            ProjectFullName: ProjectFullName,
            ProjectIDId: ProjectNameDetails,
            TaskAssignToId: {
                'results': TaskAssignTo
            },
            WeekDays: {
                'results': arrDays
            },
            Description: Discription,
            StartDate: FinalStartDate,
            DueDate: FinalDueDate,
            TaskPriority: Priority,
            CurrentPhase: ProjectCurrentPhase,
            CompletionPersent: completionInPersent,
            CompanyId: txtCompanyId,
            Distribution: Distribution,
            ClientIDId: cutsomer,
            ModuleId: Module,
            AssignedById: _spPageContextInfo.userId,
            SuccessorTaskId: $("#txtSuccTask").attr("name"),
            PredecessorTaskId: $("#txtPredTask").attr("name"),
            Worktype: Worktype,
            DocumentLink: $("#txtDocLink").val(),
            ReferenceLink: {
                '__metadata': { 'type': 'SP.FieldUrlValue' },
                'Description': $("#RefURL").val(),
                'Url': $("#RefURL").val()
            }
        };

        if ($("#txtSuccTask").attr("name") == "") {
            Metadata["SuccessorTaskId"] = 0;
        }
        if ($("#txtPredTask").attr("name") == "") {
            Metadata["PredecessorTaskId"] = 0;
        }

        if (IsTaskRecursive == "Recursive" || IsTaskRecursive == "RecursiveUpdate") {
            delete Metadata["SuccessorTaskId"];
            delete Metadata["PredecessorTaskId"];
            var RecurrenceType = '';
            if ($("#DailyBox").prop("checked") == true) {
                RecurrenceType = 'Daily';
            }
            else if ($("#WeeklyBox").prop("checked") == true) {
                RecurrenceType = 'Weekly';
                if (arrDays == []) {
                    delete Metadata["WeekDays"];
                }

            }
            else if ($("#MonthlyBox").prop("checked") == true) {
                RecurrenceType = 'Monthly';
                Metadata["DayOfEveryMonth"] = parseInt($("#MonthlyDays").val());
            }
            else if ($("#YearlyBox").prop("checked") == true) {
                Metadata["DayOfYear"] = parseInt($("#DayOfYear").val());
                Metadata["MonthOfYear"] = $("#everymonths :selected").text();
                RecurrenceType = 'Yearly';
            }
            Metadata["RecurrenceType"] = RecurrenceType;
            Metadata["CompanyId"] = parseInt(txtCompanyId);
            Metadata["StartDate"] = GetDateStandardFormat(moment($('.StartDateRecursive').val()).format('DD/MM/YYYY'));
            if ($('.EndDateRecursive').val() != null && $('.EndDateRecursive').val() != "") {
                Metadata["EndDate"] = GetDateStandardFormat(moment($('.EndDateRecursive').val()).format('DD/MM/YYYY'));
            }
            Metadata["DueDays"] = $('#txtDueDay').val();
            Metadata["Status"] = 'Active';
            delete Metadata["ProjectName"];
            //delete Metadata["ProjectFullName"];
            delete Metadata["CompletionPersent"];
        }
        else {
            if (FinalStartDate == null || FinalStartDate == "") {
                delete Metadata["StartDate"];
            }
            delete Metadata["WeekDays"];
        }

        if (FinalDueDate == null || FinalDueDate == "") {
            delete Metadata["DueDate"];
        }

        if (ProjectNameDetails == null || ProjectNameDetails == "") {
            delete Metadata["ProjectIDId"];
        }
        if (IsTaskRecursive == "RecursiveUpdate") {
            delete Metadata["Status"];
            $.when(UpdateTaskList('RecurringTaskSetup', Metadata, RecursiveTaskId)).done(function (data) {
                if (currentDlgTask != "") {
                    currentDlgTask.close();
                }
                alert("Recursive task has been updated.");
                redirectedPage = "../Pages/mydashboard.aspx?WebAppId=" + txtCompanyId + "&Source=" + window.btoa('Tasks') + "&Location=" + TabId;
                location.href = redirectedPage;
            });
        }
        else {
            AddItemToList(ListName, Metadata, TotalUsers, currentIndex);
        }
    } catch (error) {
        console.log(error.message);
        currentDlgTask.close();
    }
}

//add item in list
function AddItemToList(ListName, Metadata, TotalUsers, currentIndex) {
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
            dfd.resolve(data);
            $('#createNewTask').attr("disabled", true);
            if (currentDlgTask != "") {
                currentDlgTask.close();
            }
            if (IsTaskRecursive == "Recursive") {
                alert("Recursive task has been created successfully.");
                redirectedPage = "../Pages/mydashboard.aspx?WebAppId=" + txtCompanyId + "&Source=" + window.btoa('Tasks') + "&Location=" + TabId;
                location.href = redirectedPage;
            }
            else {
                taskItemDetails = [];
                var item = data.d;
                currentTaskItemId = item.ID;
                if (FinalFiles4Upload.length > 0) {
                    uploadattachment(currentTaskItemId);
                }
                else {
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
                }
                if (TotalUsers != '') {
                    if (currentIndex == (TotalUsers - 1)) {
                        alert("New task created successfully.");
                        if (IsModal == "true") {
                            if ($.urlParam('sourceLocation').includes("../SitePages/ProjectDetails.aspx?") == true) {
                                location.href = $.urlParam('sourceLocation') + "&ProjectName=" + $("#ProjectNameDetails :selected").text();
                            }
                            else {
                                location.href = $.urlParam('sourceLocation');
                            }
                        }
                        else {
                            location.href = redirectedPage;
                        }
                    }
                }
                else {
                    alert("New task created successfully.");
                    if (IsModal == "true") {
                        if ($.urlParam('sourceLocation').includes("../SitePages/ProjectDetails.aspx?") == true) {
                            location.href = $.urlParam('sourceLocation') + "&ProjectName=" + $("#ProjectNameDetails :selected").text();
                        }
                        else {
                            location.href = $.urlParam('sourceLocation');
                        }
                    }
                    else {
                        location.href = redirectedPage;
                    }
                }
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

function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

function GetDateStandardFormat(date) {
    var dateS = ConvertDateFormatToddMMyyyy(date);
    var startDate = new Date(dateS);
    var day = 60 * 60 * 24 * 1000;
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

//Add Attachments in SharePoint list.
function AddAttachments(itemId) {
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
        var fileInput = $('#uploadFile');
        var fileName = fileInput[0].files[0].name;
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileData = e.target.result;
            var res11 = $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items('" + itemId + "')/AttachmentFiles/ add(FileName='" + fileName + "')",
                method: "POST",
                binaryStringRequestBody: true,
                data: fileData,
                processData: false,
                headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "X-RequestDigest": digest
                },
                success: function (data) {
                    //GetAttachments(itemId);
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

//get email template to send mail
function GetTaskEmailTemplate(filterItemId) {
    var RestQuery = "?$select=ID,Body,Subject,EmailType,Title&$filter=Title eq '" + filterItemId + "'";
    $.when(getItemsWithQueryItem("EmailTemplate", RestQuery, "")).done(function (EmailTemplate) {
        var items = EmailTemplate.results;
        for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
            if (items[itemIndex].Body != null) {
                emailBodyContent = items[itemIndex].Body;
            }
            if (items[itemIndex].Subject != null) {
                taskEmailSubject = items[itemIndex].Subject;
            }

        }
    });
}

//This code runs when task created by External users to find Client name of logged in guest user
function getExternalClient() {
    var Query = "?$select=email,LoginName/EMail,Client_Name/Title,Client_Name/Id&$expand=LoginName,Client_Name&$filter=LoginName/EMail eq '" + _spPageContextInfo.userEmail + "' or email eq '" + _spPageContextInfo.userEmail + "'&$top=5000";
    dfds = $.Deferred();
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
    $.when(getItems(url, dfds)).done(function (ExtResults) {
        response = [];
        if (ExtResults.length > 0) {
            ClientName = ExtResults[0].Client_Name.Title.trim();
            $("#categoryType").html('');
            var value = '<option value="' + ExtResults[0].Client_Name.Id + '" Selected>' + ExtResults[0].Client_Name.Title.trim() + '</option>';
            $("#categoryType").append(value);

            //Bind Guest client Library
            var DocLibraries = '';
            var Query = "?$select=Id,Title,IsActive,CompanyID/Id,DocumentLibrary,InternalMembers/EMail,InternalSupervisor/EMail&$orderby=Title asc&$expand=CompanyID,InternalMembers,InternalSupervisor&$top=5000&$filter=DocumentLibrary ne null and IsActive eq '1' and Id eq '" + ExtResults[0].Client_Name.Id + "' ";
            $.when(getItemsWithQuery("ClientMaster", Query)).done(function (Clients) {
                if (Clients.length > 0) {
                    for (var i = 0; i < Clients.length; i++) {
                        var value = Clients[i];
                        if (value.DocumentLibrary != null) {
                            DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkClientMaster' + i + '" value=""></label></div></td>';
                            DocLibraries += '<td class="text-left">Guest Client</td>';
                            DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + value.DocumentLibrary + '>' + value.Title + '</a></td></tr>';
                        }
                    }
                }
                $("#tbdyCopyFileLib").append(DocLibraries);
            });
        }
    });
}

function getGuestTeamMembrs(Action, IsBind) {
    $("#SeeMoreGeneral").hide();
    $(".ProjectSeeView").hide();
    $("#SeeMoreDept").hide();
    $("#SeeMoreGuest").hide();
    $("#ShowProject").hide();
    $("#SeeMoreGuestTeam").hide();
    var totalTeamUsers = 0;
    var arrTempEmail = [];
    var arrUserDetails = [];
    if (Action == "Onchange") {
        arrGeneralTask = [];
        var txtCompanyId = Logged_CompanyId;//Logged_CompanyId
        RestQuery = "?$select=*,AttachmentFiles,LoginName/EMail,LoginName/Id,LoginName/Title,Client_Name/Title,InternalStakeholders/EMail,InternalStakeholders/Id,InternalStakeholders/Title,Supervisor/EMail,Supervisor/Title,Supervisor_Guest/EMail,Supervisor_Guest/Title&$orderby= Title asc &$expand=LoginName,Client_Name,InternalStakeholders,Supervisor,Supervisor_Guest,AttachmentFiles&$filter=Client_Name/Title eq '" + encodeURIComponent(ClientName) + "' and Status eq 'Active'&$top=5000";
    }
    $.when(getItemsWithQueryItem("ExternalUsers", RestQuery, "GuestTeam")).done(function (GuestTeam) {
        try {
            //Internal StakeHolders
            if (GuestTeam.results[0].InternalStakeholders.results != null && GuestTeam.results[0].InternalStakeholders.results != "") {
                for (var stakeh = 0; stakeh < GuestTeam.results[0].InternalStakeholders.results.length; stakeh++) {
                    if (jQuery.inArray(GuestTeam.results[0].InternalStakeholders.results[stakeh].EMail, arrTempEmail) != '-1') {
                        //Do Nothing. Array contains this already
                    }
                    else {
                        arrUserDetails = [];
                        //getting details of Stakeholders from External users or Employees list  
                        arrUserDetails = getGuestTeamDetails(GuestTeam.results[0].InternalStakeholders.results[stakeh].EMail);
                        if (arrUserDetails.length > 0) {
                            if (arrUserDetails[0].AttachmentFiles.results.length > 0) {
                                var employeePicURL = arrUserDetails[0].AttachmentFiles.results[0].ServerRelativeUrl;
                            }
                            else {
                                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrUserDetails[0].Email)
                            }
                            var FullAttachmentURL = '<div><img style="width:30px;height:30px;border-radius:50%;" src=' + employeePicURL + '><span>' + arrUserDetails[0].FullName + '</span></div>';
                            arrGeneralTask.push({
                                'UserId': arrUserDetails[0].UserId,
                                'EMail': arrUserDetails[0].Email,
                                'LoginName': arrUserDetails[0].DisplayName ? arrUserDetails[0].DisplayName : "NA",
                                'Designation': arrUserDetails[0].Designation,
                                'Manager': arrUserDetails[0].Manager,
                                'DepartmentId': arrUserDetails[0].DepartmentId,
                                'Department': arrUserDetails[0].Department,
                                'FullName': FullAttachmentURL,
                                'CompanyID': arrUserDetails[0].CompanyId,
                                'EmployeeID': arrUserDetails[0].EmployeeId,
                                'Skill': arrUserDetails[0].Skill
                            });
                        }
                        arrTempEmail.push(GuestTeam.results[0].InternalStakeholders.results[stakeh].EMail);
                    }
                }
            }
            //Internal Supervisor
            if (GuestTeam.results[0].Supervisor != null && GuestTeam.results[0].Supervisor != "") {
                {
                    if (jQuery.inArray(GuestTeam.results[0].Supervisor.EMail, arrTempEmail) != '-1') {
                        //Do Nothing. Array contains this already
                    }
                    else {
                        arrUserDetails = [];
                        //getting details of Internal Supervisor from External users or Employees list  
                        arrUserDetails = getGuestTeamDetails(GuestTeam.results[0].Supervisor.EMail);
                        if (arrUserDetails.length > 0) {
                            if (arrUserDetails[0].AttachmentFiles.results.length > 0) {
                                var employeePicURL = arrUserDetails[0].AttachmentFiles.results[0].ServerRelativeUrl;
                            }
                            else {
                                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrUserDetails[0].Email)
                            }
                            var FullAttachmentURL = '<div><img style="width:30px;height:30px;border-radius:50%;" src=' + employeePicURL + '><span>' + arrUserDetails[0].FullName + '</span></div>';
                            arrGeneralTask.push({
                                'UserId': arrUserDetails[0].UserId,
                                'EMail': arrUserDetails[0].Email,
                                'LoginName': arrUserDetails[0].DisplayName ? arrUserDetails[0].DisplayName : "NA",
                                'Designation': arrUserDetails[0].Designation,
                                'Manager': arrUserDetails[0].Manager,
                                'DepartmentId': arrUserDetails[0].DepartmentId,
                                'Department': arrUserDetails[0].Department,
                                'FullName': FullAttachmentURL,
                                'CompanyID': arrUserDetails[0].CompanyId,
                                'EmployeeID': arrUserDetails[0].EmployeeId,
                                'Skill': arrUserDetails[0].Skill
                            });
                        }

                        arrTempEmail.push(GuestTeam.results[0].Supervisor.EMail);
                    }
                }
            }
            //External Supervisor
            if (GuestTeam.results[0].Supervisor_Guest != null && GuestTeam.results[0].Supervisor_Guest != "") {
                {
                    if (jQuery.inArray(GuestTeam.results[0].Supervisor_Guest.EMail, arrTempEmail) != '-1') {
                        //Do Nothing. Array contains this already
                    }
                    else {
                        arrUserDetails = [];
                        //getting details of External Supervisor from External users or Employees list  
                        arrUserDetails = getGuestTeamDetails(GuestTeam.results[0].Supervisor_Guest.EMail);
                        if (arrUserDetails.length > 0) {
                            if (arrUserDetails[0].AttachmentFiles.results.length > 0) {
                                var employeePicURL = arrUserDetails[0].AttachmentFiles.results[0].ServerRelativeUrl;
                            }
                            else {
                                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrUserDetails[0].Email)
                            }
                            var FullAttachmentURL = '<div><img style="width:30px;height:30px;border-radius:50%;" src=' + employeePicURL + '><span>' + arrUserDetails[0].FullName + '</span></div>';
                            arrGeneralTask.push({
                                'UserId': arrUserDetails[0].UserId,
                                'EMail': arrUserDetails[0].Email,
                                'LoginName': arrUserDetails[0].DisplayName ? arrUserDetails[0].DisplayName : "NA",
                                'Designation': arrUserDetails[0].Designation,
                                'Manager': arrUserDetails[0].Manager,
                                'DepartmentId': arrUserDetails[0].DepartmentId,
                                'Department': arrUserDetails[0].Department,
                                'FullName': FullAttachmentURL,
                                'CompanyID': arrUserDetails[0].CompanyId,
                                'EmployeeID': arrUserDetails[0].EmployeeId,
                                'Skill': arrUserDetails[0].Skill
                            });
                        }
                        arrTempEmail.push(GuestTeam.results[0].Supervisor_Guest.EMail);
                    }
                }
            }
            //External Employees
            if (GuestTeam.results != null && GuestTeam.results != "") {
                for (var Emp = 0; Emp < GuestTeam.results.length; Emp++) {
                    if (jQuery.inArray(GuestTeam.results[Emp].LoginName.EMail, arrTempEmail) != '-1') {
                        //Do Nothing. Array contains this already
                    }
                    else {
                        arrUserDetails = [];
                        if (GuestTeam.results[Emp].AttachmentFiles.results.length > 0) {
                            var employeePicURL = GuestTeam.results[Emp].AttachmentFiles.results[0].ServerRelativeUrl;
                        }
                        else {
                            var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(GuestTeam.results[Emp].LoginName.EMail)
                        }
                        var FullAttachmentURL = '<div><img style="width:30px;height:30px;border-radius:50%;" src=' + employeePicURL + '><span>' + GuestTeam.results[Emp].LoginName.Title + '</span></div>';

                        arrGeneralTask.push({
                            'UserId': GuestTeam.results[Emp].LoginName.Id,
                            'EMail': GuestTeam.results[Emp].LoginName.EMail,
                            'LoginName': GuestTeam.results[Emp].LoginName.Title ? GuestTeam.results[Emp].LoginName.Title : "NA",
                            'Designation': GuestTeam.results[Emp].Designation,
                            'Manager': GuestTeam.results[Emp].Supervisor.Title,
                            'DepartmentId': '',
                            'Department': '',
                            'FullName': FullAttachmentURL,
                            'CompanyID': '',
                            'EmployeeID': GuestTeam.results[Emp].Id,
                            'Skill': GuestTeam.results[Emp].SkillSet ? GuestTeam.results[Emp].SkillSet : "NA"
                        });
                        arrTempEmail.push(GuestTeam.results[Emp].LoginName.EMail);
                    }
                }
            }
            if (IsBind == true) {
                LoadShowUser(arrGeneralTask);
            }
        } catch (e) {
            alert(e);
        }
    });
}

//get guest Team members metadata
function getGuestTeamDetails(Email) {
    var arrMetadata = [];
    var Query = "?$select=Email,AttachmentFiles,Id,Title,PrimaryCompany,Status,FullName,LogonName/EMail,LogonName/Id,Company/Id,Department/Id,Department/Title,Manager,Designation&$expand=LogonName,Company,Department,AttachmentFiles&$top=5000&$filter=(LogonName/EMail eq '" + Email + "' or Email eq '" + Email + "') and PrimaryCompany eq 'Primary' ";
    dfds = $.Deferred();
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + Query;
    $.when(getItems(url, dfds)).done(function (IntResults) {
        response = [];
        if (IntResults.length > 0) {
            arrMetadata.push({
                UserId: IntResults[0].LogonName.Id,
                Email: IntResults[0].LogonName.EMail,
                DisplayName: IntResults[0].FullName,
                Designation: IntResults[0].Designation,
                Manager: IntResults[0].Manager,
                DepartmentId: IntResults[0].Department.Id,
                Department: IntResults[0].Department.Title,
                FullName: IntResults[0].FullName,
                CompanyId: IntResults[0].Company.Id,
                EmployeeId: IntResults[0].Id,
                Skill: IntResults[0].SkillSet ? IntResults[0].SkillSet : "NA",
                AttachmentFiles: IntResults[0].AttachmentFiles
            });
        }
        else {
            var Query = "?$select=*,LoginName/EMail,LoginName/Id,LoginName/Title,Client_Name/Title,InternalStakeholders/EMail,InternalStakeholders/Id,InternalStakeholders/Title,Supervisor/EMail,Supervisor/Title,Supervisor_Guest/EMail,Supervisor_Guest/Title&$orderby= Title asc &$expand=LoginName,Client_Name,InternalStakeholders,Supervisor,Supervisor_Guest,AttachmentFiles&$filter=LoginName/EMail eq '" + Email + "' or email eq '" + Email + "'&$top=5000";
            dfds = $.Deferred();
            url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
            $.when(getItems(url, dfds)).done(function (ExtResults) {
                response = [];
                if (ExtResults.length > 0) {
                    arrMetadata.push({
                        UserId: ExtResults[0].LoginName.Id,
                        Email: ExtResults[0].LoginName.EMail,
                        DisplayName: ExtResults[0].Title,
                        Designation: ExtResults[0].Designation,
                        Manager: ExtResults[0].Supervisor.Title,
                        DepartmentId: '',
                        Department: '',
                        FullName: ExtResults[0].Title,
                        CompanyId: '',
                        EmployeeId: ExtResults[0].Id,
                        Skill: ExtResults[0].SkillSet ? IntResults[0].SkillSet : "NA",
                        AttachmentFiles: ExtResults[0].AttachmentFiles
                    });
                }
            });
        }
    });
    return arrMetadata;
}

function GetGeneralTaskEmps(Action) {
    $("#SeeMoreGeneral").show();
    $(".ProjectSeeView").hide();
    $("#SeeMoreDept").hide();
    $("#SeeMoreGuest").hide();
    $("#SeeMoreGuestTeam").hide();
    var totalTeamUsers = 0;
    if (Action == "Onchange") {
        arrGeneralTask = [];
        var txtCompanyId = Logged_CompanyId;//Logged_CompanyId
        RestQuery = "?$select=*,AttachmentFiles,ManagerLoginName/EMail,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID,Department/DepartmentName,Company/ID&$orderby= FullName asc &$expand=AttachmentFiles,LogonName,Department,Company,ManagerLoginName&$filter=Status eq 'Active' and Company/ID eq '" + txtCompanyId + "' and ManagerLoginName/EMail eq '" + _spPageContextInfo.userEmail + "'&$top=100";
        AllQuery = "?$select=*,AttachmentFiles,ManagerLoginName/EMail,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID,Department/DepartmentName,Company/ID&$orderby= FullName asc &$expand=AttachmentFiles,LogonName,Department,Company,ManagerLoginName&$filter=Status eq 'Active' and Company/ID eq '" + txtCompanyId + "' and ManagerLoginName/EMail eq '" + _spPageContextInfo.userEmail + "'&$top=5000";

        dfds = $.Deferred(),
    	url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + AllQuery;
        $.when(getItems(url, dfds)).done(function (EmpResults) {
            response = [];
            if (EmpResults.length > 0) {
                totalTeamUsers = EmpResults.length;
            }
            $("#TotalProject").text(totalTeamUsers);
        });
    }
    else {
        if (NextURLGeneral != null) {
            var RestQuery = "?" + NextURLGeneral.split('?')[1];
        }
        else {
            $("#SeeMoreGeneral").hide();
            return;
        }
    }
    $.when(getItemsWithQueryItem("Employees", RestQuery, "GeneralTask")).done(function (Employees) {

        try {
            if (NextURLGeneral == null) {
                $("#SeeMoreGeneral").hide();
            }

            for (var i = 0; i < Employees.results.length; i++) {
                if (Employees.results[i].AttachmentFiles.results.length > 0) {
                    var employeePicURL = Employees.results[i].AttachmentFiles.results[0].ServerRelativeUrl;
                }
                else {
                    var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Employees.results[i].LogonName.EMail)
                }
                var FullAttachmentURL = '<div><img style="width:30px;height:30px;border-radius:50%;" src=' + employeePicURL + '><span>' + Employees.results[i].FullName + '</span></div>';
                arrGeneralTask.push({
                    'UserId': Employees.results[i].LogonName.Id,
                    'EMail': Employees.results[i].LogonName.EMail,
                    'LoginName': Employees.results[i].LogonName.Title ? Employees.results[i].LogonName.Title : "NA",
                    'Designation': Employees.results[i].Designation ? Employees.results[i].Designation : "NA",
                    'Manager': Employees.results[i].Manager,
                    'DepartmentId': Employees.results[i].Department.ID,
                    'Department': Employees.results[i].Department.DepartmentName,
                    'FullName': FullAttachmentURL,
                    'CompanyID': Employees.results[i].Company.ID,
                    'EmployeeID': Employees.results[i].Id,
                    'Skill': Employees.results[i].SkillSet ? Employees.results[i].SkillSet : "NA"
                });
            }

            LoadShowUser(arrGeneralTask);
            if (Action == "") {
                totalTeamUsers = arrGeneralTask.length;
            }
            //Showing data out of total
            if (totalTeamUsers > 100 && NextURLGeneral != null) {
                $("#Rowcount").hide();
                $("#ShowProject").show();
                $("#SeeMoreGeneral").show();
                $("#DiplayProject").text(arrGeneralTask.length);

            }
            else {
                $("#Rowcount").show();
                $("#ShowProject").hide();
                $(".ProjectSeeView").hide();
            }
        } catch (e) {
            alert(e);
        }
    });
}

function Departmentfilter(Action) {
    $("#SeeMoreGeneral").hide();
    $(".ProjectSeeView").hide();
    $("#SeeMoreDept").show();
    $("#SeeMoreGuest").hide();

    var totalTeamUsers = 0;
    if (Action == "Onchange") {
        arrDeptTask = [];
        var txtCompanyId = Logged_CompanyId;//Logged_CompanyId
        RestQuery = "?$select=*,AttachmentFiles,ManagerLoginName/EMail,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID,Department/DepartmentName,Company/ID&$orderby= FullName asc &$expand=AttachmentFiles,LogonName,Department,Company,ManagerLoginName&$filter=Status eq 'Active' and Company/ID eq '" + txtCompanyId + "' and Department/ID eq '" + $("#ddlDepartment").val() + "'&$top=100";
        AllQuery = "?$select=*,AttachmentFiles,ManagerLoginName/EMail,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID,Department/DepartmentName,Company/ID&$orderby= FullName asc &$expand=AttachmentFiles,LogonName,Department,Company,ManagerLoginName&$filter=Status eq 'Active' and Company/ID eq '" + txtCompanyId + "' and Department/ID eq '" + $("#ddlDepartment").val() + "'&$top=5000";

        dfds = $.Deferred(),
    	url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + AllQuery;
        $.when(getItems(url, dfds)).done(function (EmpResults) {
            response = [];
            if (EmpResults.length > 0) {
                totalTeamUsers = EmpResults.length;
            }
            $("#TotalProject").text(totalTeamUsers);
        });
    }
    else {
        if (NextUrlDept != null) {
            var RestQuery = "?" + NextUrlDept.split('?')[1];
        }
        else {
            $("#SeeMoreDept").hide();
            return;
        }
    }
    $.when(getItemsWithQueryItem("Employees", RestQuery, "DeptTask")).done(function (Employees) {

        try {
            if (NextUrlDept == null) {
                $("#SeeMoreDept").hide();
            }

            for (var i = 0; i < Employees.results.length; i++) {
                if (Employees.results[i].AttachmentFiles.results.length > 0) {
                    var employeePicURL = Employees.results[i].AttachmentFiles.results[0].ServerRelativeUrl;
                }
                else {
                    var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Employees.results[i].LogonName.EMail)
                }
                var FullAttachmentURL = '<div><img style="width:30px;height:30px;border-radius:50%;" src=' + employeePicURL + '><span>' + Employees.results[i].FullName + '</span></div>';
                arrDeptTask.push({
                    'UserId': Employees.results[i].LogonName.Id,
                    'EMail': Employees.results[i].LogonName.EMail,
                    'LoginName': Employees.results[i].LogonName.Title ? Employees.results[i].LogonName.Title : "NA",
                    'Designation': Employees.results[i].Designation ? Employees.results[i].Designation : "NA",
                    'Manager': Employees.results[i].Manager,
                    'DepartmentId': Employees.results[i].Department.ID,
                    'Department': Employees.results[i].Department.DepartmentName,
                    'FullName': FullAttachmentURL,
                    'CompanyID': Employees.results[i].Company.ID,
                    'EmployeeID': Employees.results[i].Id,
                    'Skill': Employees.results[i].SkillSet ? Employees.results[i].SkillSet : "NA"
                })
            }

            LoadShowUser(arrDeptTask);
            if (Action == "") {
                totalTeamUsers = arrDeptTask.length;
            }
            //Showing data out of total
            if (totalTeamUsers > 100 && NextUrlDept != null) {
                $("#Rowcount").hide();
                $("#ShowProject").show();
                $("#SeeMoreDept").show();
                $("#DiplayProject").text(arrDeptTask.length);

            }
            else {
                $("#Rowcount").show();
                $("#ShowProject").hide();
                $("#SeeMoreDept").hide();
                //$("#TotalItemscount").text(items.length);
            }
        } catch (e) {
            alert(e);
        }
    });
}

function uploadattachment(id) {
    if (FinalFiles4Upload.length > 0) {
        $.each(FinalFiles4Upload, function (index, value) {
            getFileBuffer(value).then(function (buffer) {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items(" + id + ")/AttachmentFiles/add( FileName='" + value.name + "')",
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
                        // alert('file uploaded') 
                        var txtProjectID = titanForWork.getQueryStringParameter("ProjectID");
                        var txtCompanyId = Logged_CompanyId;
                        var IsProject = titanForWork.getQueryStringParameter("IsProject");
                        var url = _spPageContextInfo.webServerRelativeUrl;
                        var redirectedPage = '';
                        if (txtProjectID != '' && txtProjectID != null && txtProjectID != undefined) {
                            redirectedPage = url + "/Pages/ViewProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + txtProjectID + "&Source=" + window.btoa('Tasks');
                        } else {
                            redirectedPage = url + "/Pages/mydashboard.aspx?WebAppId=" + txtCompanyId + "&Source=" + window.btoa('Tasks') + "&Location=" + TabId;
                        }
                        location.href = redirectedPage;
                    },
                    error: function (data) {
                        console.log(data.responseText.error);
                        alert(data.responseText.error)
                        //alert(data.responseText);
                    }
                });
            });
        });
    }
}

//open the attachments in Iframe
function priviewfile(Action) {
    ServerSrc = Action.name;
    if (Action.name == null) {
        ServerSrc = Action.title;
    }
    var docExt = Action.dataset.filename.split('.').pop();
    if (docExt == 'doc' || docExt == 'docx' || docExt == 'xls' || docExt == 'xlsx' || docExt == 'ppt' || docExt == 'pptx' || docExt == 'pdf') {
        iframeUrl1 = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/WopiFrame.aspx?sourcedoc=' + Action.dataset.fileurl + '&action=interactivepreview';
    }
    else {
        iframeUrl1 = Action.dataset.fileurl;
    }
    var container = $("#doc-viewer").empty();
    if (ServerSrc.match(/\.(docx|xlsx)$/) != null) {
        src = _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/Doc.aspx?sourcedoc=" + ServerSrc + "&action=view&mobileredirect=true";
    }
    else {
        src = ServerSrc + "?web=1";
    }
    $('<iframe>', {
        src: iframeUrl1,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);

    IntervalId = setInterval(function () {
        $("#iframe-viewer").contents().find("#AppHeaderPanel").hide();
        $("#iframe-viewer").contents().find("#AppHeaderPanel").remove();
    }, 2000);
    $("#AttachmentView").modal("show");
}

function ClosedIframe() {
    clearInterval(IntervalId);
}

// Get Project Modules
function GetAllModule(itemId) {
    var RestQuery = "?$select=*&$Filter=ProjectId eq '" + itemId + "' and Status eq 'Active'";
    $.when(getItemsWithQueryItem("ProjectModules", RestQuery, "")).done(function (ProjectModules) {
        var items = ProjectModules.results;
        $("#ViewAllTeamModule").modal("show");
        var dvTable = $("#viewALLModule");
        var counter = 1;
        $('.moduleName').show();
        $('#ModuleName').html('');
        var ModuleHTML = '<select name="ProjectModule" id="projectModule" class="form-control">';
        ModuleHTML += '<option value="0">-Select-</option>';
        var moduleTitle = '';
        for (var i = 0; i < items.length; i++) {
            if (items[i].Title.length > 50) {
                moduleTitle = items[i].Title.substring(0, 50) + '...';
            }
            else {
                moduleTitle = items[i].Title;
            }
            ModuleHTML += '<option value="' + items[i].Id + '" title="' + items[i].Title + '">' + moduleTitle + '</option>';
        }
        ModuleHTML += '</select>';
        $("#ModuleName").append(ModuleHTML);
    });
}

function timeSheetEntry(taskid,DependencyId) {
    if (taskid == null || taskid == '') {
        taskid = currentTaskItemId
    }
    var txtCompanyId = Logged_CompanyId;
    if (IsModal == "true") {
        var url = _spPageContextInfo.webAbsoluteUrl + "/Pages/TimeSheetEntry.aspx?WebAppId=" + txtCompanyId + "&Dependency=" + window.btoa(DependencyId) + "&TaskId=" + window.btoa(taskid) + "&Mode=" + window.btoa('Add') + "&IsModal=dHJ1ZQ==&sourceLocation=TaskDetails";
    }
    else {
        var url = _spPageContextInfo.webAbsoluteUrl + "/Pages/TimeSheetEntry.aspx?WebAppId=" + txtCompanyId + "&Dependency=" + window.btoa(DependencyId) + "&TaskId=" + window.btoa(taskid) + "&Mode=" + window.btoa('Add') + "&sourcelocation=../Pages/timesheet.aspx";
    }
    window.location.href = url;
}

function taskDepTimeSheetEntry(taskid, itemid) {
    if (taskid == null || taskid == '') {
        taskid = currentTaskItemId
    }

    var txtCompanyId = Logged_CompanyId;
    var url = _spPageContextInfo.webAbsoluteUrl + "/Pages/TimeSheetEntry.aspx?WebAppId=" + txtCompanyId + "&Dependency=" + window.btoa(itemid) + "&TaskId=" + window.btoa(taskid) + "&Mode=" + window.btoa('Add') + "&sourcelocation=../Pages/timesheet.aspx";
    window.location.href = url;
}

function ConvertddmmyyTommddyyForDateCheck(ddmmyyyString) {
    return ddmmyyyString.split('/')[1] + "/" + ddmmyyyString.split('/')[0] + "/" + ddmmyyyString.split('/')[2];
}

function getExternalusers(Audience) {
    GuestUser = [];
    var todayDate = new Date();
    todayDate = todayDate.setDate(todayDate.getDate() - 1);
    todayDate = new Date(todayDate);
    if (Audience == "Company") {
        var RestQuery = "?$top=5000&$select=*&$filter=(InternalStakeholdersId eq '" + _spPageContextInfo.userId + "' or SupervisorId eq '" + _spPageContextInfo.userId + "') and Status eq 'Active' and ValidUpto ge datetime'" + todayDate.toISOString() + "'";
    }
    else { //Corporate
        var RestQuery = "?$top=5000&$select=*&$filter=Status eq 'Active' and ValidUpto ge datetime'" + todayDate.toISOString() + "'";
    }
    $.when(getItemsWithQueryItem("ExternalUsers", RestQuery, "")).done(function (ExternalUsers) {
        var items = ExternalUsers.results;
        if (items.length > 0) {
            for (i = 0; i < items.length; i++) {
                GuestUser.push(items[i]);
                taskToUsers.push({
                    userEmail: items[i].email,
                    userId: items[i].LoginNameId
                });
            }
        }
    });
}

function GetGuestEmployee() {
    var txtCompanyId = Logged_CompanyId;
    var todaysDate = new Date();
    todaysDate = $.datepicker.formatDate('dd/mm/yy', todaysDate);

    RestQuery = "?$top=5000&$select=*&$filter=Status eq 'Active' ";
    $.when(CommonFunction.getItemsWithQueryItem("ExternalUsers", RestQuery)).done(function (Guests) {
        try {
            for (var i = 0; i < Guests.results.length; i++) {
                AllGuestUsers.push({
                    'UserId': Guests.results[i].LoginNameId,
                    'EMail': Guests.results[i].email
                })
            }

        } catch (e) {
            alert(e);
        }
    });
}

// to check Employee Active in Internal user and check validUpto & Internalmember/Supervisor in External user case
function checkEmployeeStatus(UserEmail) {
    var IsValid = false;
    var todayDate = new Date();
    todayDate = todayDate.setDate(todayDate.getDate() - 1);
    todayDate = new Date(todayDate);

    //checking for Internal employee
    var Query = "?$top=5000&$select=ID,Status,Email&$filter=Status eq 'Active' and Email eq '" + UserEmail + "' ";
    dfds = $.Deferred();
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + Query;
    $.when(getItems(url, dfds)).done(function (Results) {
        response = [];
        if (Results.length == 0) {
            //checking for External user
            var Query = "?$top=5000&$select=email,Status,ValidUpto,Supervisor/EMail,InternalStakeholders/EMail,LoginName/EMail&$expand=Supervisor,InternalStakeholders,LoginName&$filter=(InternalStakeholders/EMail eq '" + _spPageContextInfo.userEmail + "' or Supervisor/EMail eq '" + _spPageContextInfo.userEmail + "') and Status eq 'Active' and ValidUpto ge datetime'" + todayDate.toISOString() + "' and (LoginName/EMail eq '" + UserEmail + "' or email eq '" + UserEmail + "') ";
            dfds = $.Deferred();
            url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
            $.when(getItems(url, dfds)).done(function (Results) {
                response = [];
                if (Results.length == 0) {
                    IsValid = false;
                }
                else {
                    IsValid = true;
                }
            });
        }
        else {
            IsValid = true;
        }
    });
    return IsValid;
}

// check if the user is project team member or not
function checkProjectMember(UserEmail) {
    RestQuery = "?$select=*,TeamMember/Id,TeamMember/Name,TeamMember/Title,TeamMember/EMail&$expand=TeamMember&$top=100&$filter=Status eq 'Active' and ProjectId eq '" + ProjectId + "' and TeamMember/EMail eq '" + UserEmail + "' ";
    var dfds = $.Deferred();
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items/" + RestQuery;
    $.when(getItems(url, dfds)).done(function (EmpResults) {
        response = [];
        if (EmpResults.length == 0) {
            IsValid = false;
        }
        else {
            IsValid = true;
        }
    });
    return IsValid;
}

// to check if user have filled timesheet in a project
function checkTimeSheet(EmpEmail) {
    IsCheck = false;
    var RestQuery = "?$select=TaskID/Id,Employee/EMail&$expand=TaskID,Employee&$filter=TaskID/Id eq '" + currentTaskItemId + "' and Employee/EMail eq '" + EmpEmail + "' ";
    $.when(getItemsWithQueryItem("EmpTimeSheet", RestQuery, "")).done(function (EmpTimeSheet) {
        if (EmpTimeSheet.results.length > 0) {
            IsCheck = true;
        }
    });
    return IsCheck;
}

//My-Group functionality 
function BindMyGroup() {
    var Group = '';
    var RestQuery = "?$select=ID,LogonUser/ID,LogonUser/Title,LogonUser/EMail,SharingLevel&$expand=LogonUser&$orderby=ID asc&$top=5000&$filter=LogonUser/EMail eq '" + _spPageContextInfo.userEmail + "'";
    $.when(getItemsWithQueryItem("DocumentSharedGroups", RestQuery, "")).done(function (DocumentSharedGroups) {
        if (DocumentSharedGroups.results.length > 0) {
            Group += "<option value=\"0\">-Select-</option>";
            $.each(DocumentSharedGroups.results, function (i, item) {
                var ID = item.ID;
                var GroupName = item.SharingLevel;
                Group += "<option value=\"" + ID + "\">" + GroupName + "</option>";
            });
            $("#ddlMyGroup").html('');
            $("#ddlMyGroup").append(Group);
        }
    });
}

//get selected group members and bind it to table
function getSelectedGroupMembers() {
    var MyGroupUser = [];
    arrMyGroup = [];
    $("#Rowcount").show();
    $("#ShowProject").hide();
    var RestQuery = "?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/EMail,LogonUser/ID,LogonUser/Title,LogonUser/UserName,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID asc&$top=5000&$filter=ID eq '" + $("#ddlMyGroup").val() + "'";
    $.when(getItemsWithQueryItem("DocumentSharedGroups", RestQuery, "")).done(function (DocumentSharedGroups) {
        var item = DocumentSharedGroups.results;
        if (item[0].SharedUsers.results != null) {
            for (var subGrroupIndex = 0; subGrroupIndex < item[0].SharedUsers.results.length; subGrroupIndex++) {
                MyGroupUser = checkUserValid(item[0].SharedUsers.results[subGrroupIndex].EMail);
                if (MyGroupUser.length != 0) {
                    if (MyGroupUser[0].AttachmentFiles.results.length > 0) {
                        var employeePicURL = MyGroupUser[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(MyGroupUser[0].EMail)
                    }
                    var FullAttachmentURL = '<div><img style="width:30px;height:30px;border-radius:50%;" src=' + employeePicURL + '><span>' + MyGroupUser[0].FullName + '</span></div>';

                    arrMyGroup.push({
                        'UserId': MyGroupUser[0].EmployeeID,
                        'EMail': MyGroupUser[0].EMail,
                        'LoginName': MyGroupUser[0].FullName,
                        'Designation': MyGroupUser[0].Designation,
                        'Manager': MyGroupUser[0].Manager,
                        'DepartmentId': MyGroupUser[0].DepartmentId,
                        'Department': MyGroupUser[0].Department,
                        'FullName': FullAttachmentURL,
                        'CompanyID': MyGroupUser[0].CompanyID,
                        'EmployeeID': MyGroupUser[0].EmployeeID,
                        'Skill': ""
                    });
                }
            }
            LoadShowUser(arrMyGroup);
        }
        else {
            LoadShowUser(arrMyGroup);
        }
    });
}

// to check if user have filled timesheet in a project
function ReviewTimeSheet() {
    IsCheck = false;
    var RestQuery = "?$select=TaskID/Id,Employee/EMail&$expand=TaskID,Employee&$filter=TaskID/Id eq '" + currentTaskItemId + "' ";
    $.when(getItemsWithQueryItem("EmpTimeSheet", RestQuery, "")).done(function (EmpTimeSheet) {
        if (EmpTimeSheet.results.length > 0) {
            IsCheck = true;
        }
    });
    return IsCheck;
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

//on change people picker
function onChangeTask(HTMLID, PplPickerId, UserBoxId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        user = '';
        if (userInfo.length > 0) {
        	if (jQuery.inArray(userInfo[0].Key.split('|')[2].toLowerCase(), multipleEmailAddress) != '-1') {
            	//Do Nothing. Elements contains this already
            }
            else {
	            $(".peoplepickerbox").show();
	            tempUserId = parseInt(getUserInformationTeam(PplPickerId, multipleEmailAddress, assignUserName));
	            EmpIds.push(tempUserId);
	            var tempEmail = userInfo[0].Key.split('|')[2];
	            if (tempEmail.includes('#') == true) {
	                tempEmail = tempEmail.replace("#ext#@adaptindia.onmicrosoft.com", '');
	                tempEmail = tempEmail.replace("_", '@');
	            }
	            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
	            user += '<div class="col-sm-6 userBoxParent"><div class="gridbox"><img src="' + attachment + '"><div class="peopleinfo">';
	            user += '<h5>' + userInfo[0].DisplayText + '</h5><span onclick="OpenEmail(\'' + tempEmail + '\');">' + tempEmail + '</span></div>';
	            user += '<span class="crosebox" onclick="removeUserBox(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');"><i class="fa fa-times"></i></span></div></div>';
	            $("#" + UserBoxId).append(user);
	        }
	        EmptyPeoplePicker(PplPickerId);
        }
        else {
            //$("#userList").hide();
        }
    };
}

//Load task details to update Recursive task
function PageLoadRecTask() {
    var RestQuery = "?$select=*,Module/Title,ClientID/ID,ClientID/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/Id,TaskAssignToId,Author/Title,Author/EMail&$expand=Module,ClientID,TaskAssignTo,Author&$top=5000&$filter=Id eq '" + RecursiveTaskId + "' ";
    $.when(getItemsWithQueryItem("RecurringTaskSetup", RestQuery, "")).done(function (TaskResults) {
        RecurrenceTask = TaskResults.results;
        $("#TaskName").val(RecurrenceTask[0].Title);
        $("#TaskType").val(RecurrenceTask[0].TaskType);
        $("#TaskType").trigger("change");
        $('#category').val(RecurrenceTask[0].Worktype);
        if (RecurrenceTask[0].DocumentLink != "" && RecurrenceTask[0].DocumentLink != "null" && RecurrenceTask[0].DocumentLink != null) {
            $("#txtDocLink").val(RecurrenceTask[0].DocumentLink);
        }
        if ($("#TaskType").val() == "2") {
            var PeoplePickId = "AssaginTaskTeam";
            $("#categoryType").empty();
            var value = '<option value="' + RecurrenceTask[0].ClientID.ID + '" Selected>' + RecurrenceTask[0].ClientID.Title + '</option>';
            $("#categoryType").append(value);
        }
        else {
            var PeoplePickId = "AssaginTaskProjectTeam";
            $("#ProjectNameDetails").empty();
            var value = '<option value="' + RecurrenceTask[0].ProjectIDId + '" Selected>' + RecurrenceTask[0].ProjectFullName + '</option>';
            $("#ProjectNameDetails").append(value);
            //show assign to
            $("#ProjectTeam").empty();
            $("#aTaskButton").show();
            $(".moduleName").show();
            initializePeoplePicker('AssaginTaskProjectTeam');
            peoplePickerDiv = $("[id$='AssaginTaskProjectTeam_TopSpan']");
            var projectvalue = $("#ProjectName :selected").val();
            getProjectPlanedDate(projectvalue);
            GetAllModule(projectvalue);
            $("#projectModule").val(RecurrenceTask[0].ModuleId);
        }
        var user = '';
        for (var usr = 0; usr < RecurrenceTask[0].TaskAssignTo.results.length; usr++) {
            $(".peoplepickerbox").show();
            EmpIds.push(RecurrenceTask[0].TaskAssignTo.results[usr].Id);
            multipleEmailAddress.push(RecurrenceTask[0].TaskAssignTo.results[usr].EMail.toLowerCase());
            assignUserName.push(RecurrenceTask[0].TaskAssignTo.results[usr].Title);
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(RecurrenceTask[0].TaskAssignTo.results[usr].EMail);
            user += '<div class="col-md-6 userBoxParent"><div class="gridbox"><img src="' + attachment + '"><div class="peopleinfo">';
            user += '<h5>' + RecurrenceTask[0].TaskAssignTo.results[usr].Title + '</h5><span onclick="OpenEmail(\'' + RecurrenceTask[0].TaskAssignTo.results[usr].EMail + '\');">' + RecurrenceTask[0].TaskAssignTo.results[usr].EMail + '</span></div>';
            user += '<span class="crosebox" onclick="removeUserBox(this, \'' + RecurrenceTask[0].TaskAssignTo.results[usr].EMail + '\', \'' + RecurrenceTask[0].TaskAssignTo.results[usr].Title + '\', ' + RecurrenceTask[0].TaskAssignTo.results[usr].Id + ');"><i class="fa fa-times"></i></span></div></div>';
            //SetAndResolvePeoplePicker(PeoplePickId, items[0].TaskAssignTo.results[usr].EMail, false);
        }
        $("#userHTMLBox").append(user);
        $("#comment").val(RecurrenceTask[0].Description);
        $("#Priority").val(RecurrenceTask[0].TaskPriority);
        $("#TaskDistribution").val(RecurrenceTask[0].Distribution);
        if (RecurrenceTask[0].ReferenceLink != null) {
            $("#RefURL").val(RecurrenceTask[0].ReferenceLink.Url ? RecurrenceTask[0].ReferenceLink.Url : "");
        }

        $(".StartDateRecursive").val(moment(new Date(RecurrenceTask[0].StartDate)).format("MM dd, yy"));
        if (RecurrenceTask[0].EndDate != null) {
            $(".EndDateRecursive").val(moment(new Date(RecurrenceTask[0].EndDate)).format("MM dd, yy"));
            $('.EndDateRecursive').attr('disabled', false);
        }
        else {
            $(".EndDateRecursive").prop('disabled', 'disabled');
            $("#noenddate").prop('checked', 'checked');
        }
        $("#txtDueDay").val(RecurrenceTask[0].DueDays);
        if (RecurrenceTask[0].RecurrenceType == "Daily") {
            $("#DailyBox").prop('checked', 'checked');
            $("#DailyBox").trigger('click');
        }
        else if (RecurrenceTask[0].RecurrenceType == "Weekly") {
            $("#WeeklyBox").prop('checked', 'checked');
            $("#WeeklyBox").trigger('click');
            if (RecurrenceTask[0].WeekDays != null) {
                for (var day = 0; day < RecurrenceTask[0].WeekDays.results.length; day++) {
                    if (RecurrenceTask[0].WeekDays.results[day] == "Mon") {
                        $("#" + RecurrenceTask[0].WeekDays.results[day].toLowerCase() + "day").prop('checked', 'checked');
                    }
                    else if (RecurrenceTask[0].WeekDays.results[day] == "Tue" || RecurrenceTask[0].WeekDays.results[day] == "Wed" || RecurrenceTask[0].WeekDays.results[day] == "Thu") {
                        $("#" + RecurrenceTask[0].WeekDays.results[day].toLowerCase()).prop('checked', 'checked');
                    }
                    else {
                        $("#" + RecurrenceTask[0].WeekDays.results[day]).prop('checked', 'checked');
                    }
                }
            }
        }
        else if (RecurrenceTask[0].RecurrenceType == "Monthly") {
            $("#MonthlyBox").prop('checked', 'checked');
            $("#MonthlyBox").trigger('click');
            $("#MonthlyDays").val(RecurrenceTask[0].DayOfEveryMonth);
        }
        else { //Yearly
            $("#YearlyBox").prop('checked', 'checked');
            $("#YearlyBox").trigger('click');
            $('#everymonths option').filter(function () {
                return ($(this).text() == RecurrenceTask[0].MonthOfYear); //To select Blue
            }).prop('selected', true);
            $("#everymonths").trigger('change');
            $("#DayOfYear").val(RecurrenceTask[0].DayOfYear);
        }
        waitingDialog.hide();
        onChangeTask('AssaginTaskProjectTeam_TopSpan', 'AssaginTaskProjectTeam', 'userHTMLBox');
    });
}


//Load task details for copy task
function PageLoadAddTask() {
    $("#btnAttchmentsView").hide();
    $("#btn2CloseAttachmentForm").hide();
    $('#create_task_without_comts').show();
    $('#create_task_with_comts').remove();
    //$('#reminderTask').hide(); 
    $(".projectName").hide();
    $(".ProjectTeam").hide();
    $(".clientNameDiv").hide();
    $(".moduleName").hide();
    $(".AssignTo").hide();
    $(".IntimationCompletion").hide();
    $(".TaskTeam").hide();
    $(".IntimateProjectTeam").hide();
    $(".IntimateTaskTeam").hide();
    $("#completionInPersent").prop("disabled", true);
    $("#rateYo").hide();
    $('.CompletionDateButton').find('button').attr("disabled", true);
    //$('.CompletionDate').prop('disabled','disabled');
    $('.taskCompletionDetails').hide();
    $('#ProjectCurrentPhase').attr('disabled', 'disabled');
    $("#TaskStatus").hide();
    getWorkType();

    $("#TaskType").change(function () {
        $("#ProjectTeam").empty();
        $('.StartDate').datepicker("destroy");
        $('.DueDate').datepicker("destroy");
        $('.StartDate').datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "-50:+50",
            //maxDate: new Date()
        });
        $('.StartDate').datepicker("option", "dateFormat", "MM dd, yy");

        $('.DueDate').datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "-50:+50"
        });
        $('.DueDate').datepicker("option", "dateFormat", "MM dd, yy");

        var value = this.value;
        EmpIds = [];
        multipleEmailAddress = [];
        assignUserName = [];
        $(".peoplepickerbox").hide();
        $("#txtSuccTask").val('');
        $("#txtSuccTask").attr("name", '');
        $("#txtPredTask").attr("name", '');
        $("#txtPredTask").val('');
        if (value == 1) {
            $("#userHTMLBox").empty();
            //$(".peoplepickerbox").show();
            $(".projectName").show();
            $(".ProjectTeam").show();
            $(".clientNameDiv").hide();
            $(".IntimateProjectTeam").hide(); //Hide 
            $(".TaskTeam").hide();
            ProjectType = "Projecttask";
            $(".IntimateTaskTeam").hide();
            $(".Audience").hide();
            $("#ProjectName").unbind().change(function () {
                $("#ProjectTeam").empty();
                $("#aTaskButton").show();
                $(".moduleName").show();
                initializePeoplePicker('AssaginTaskProjectTeam');
                peoplePickerDiv = $("[id$='AssaginTaskProjectTeam_TopSpan']");
                var projectvalue = $("#ProjectName :selected").val();
                getProjectPlanedDate(projectvalue);
                GetAllModule(projectvalue);
            });
            $('.StartDate').datepicker("setDate", new Date());

        } else if (value == 2) {
            $("#userHTMLBox").empty();
            //$(".peoplepickerbox").show();
            $(".projectName").hide();
            $(".ProjectTeam").hide();
            $(".clientNameDiv").show();
            $(".moduleName").hide();
            $(".Audience").show();
            $(".IntimateProjectTeam").hide();
            $(".TaskTeam").show();
            $(".IntimateTaskTeam").hide();
            $(".moduleName").hide()
            ProjectType = "GenaralTask";
            initializePeoplePicker_AssaginTaskTeam('AssaginTaskTeam');
            onChangeTask("AssaginTaskTeam_TopSpan", "AssaginTaskTeam", "userHTMLBox");
            peoplePickerDiv = $("[id$='AssaginTaskTeam_TopSpan']");
            $('.StartDate').datepicker("setDate", new Date());
        } else {
            $(".peoplepickerbox").hide();
            $(".projectName").hide();
            $(".ProjectTeam").hide();
            $(".TaskTeam").hide();
            $(".IntimateProjectTeam").hide();
            $(".IntimateTaskTeam").hide();
        }
    });
}

function CreateNewTask() {

    var EditMode = IsEditMode;
    if (EditMode != undefined) {
        EditMode = window.atob(EditMode);
    }
    if (EditMode == null || EditMode == "undefined") {
        // Get the people picker object from the page.
        if (multipleEmailAddress.length == 0) {
            alert("Kindly fill all the mandatory fields.");
            return false;
        }
        var DoesNotexietuser = "";
        var Notexietuser = "";
        var IsTrue = false;
        var IsUser = false;
        var IsGuestRequired = false;
        var OtherUsers = [];
        var OtherUserName = [];
        if (multipleEmailAddress.length > 200) {
            multipleEmailAddress.length = 200;
        }
        for (var j = 0; j < multipleEmailAddress.length; j++) {
            var arrSubVisaLetters = checkUserValid(multipleEmailAddress[j]);
            if (arrSubVisaLetters.length == 0 && $("#Audience option:selected").text() == "Corporate") {
                DoesNotexietuser += assignUserName[j] + ",";
                IsTrue = true;
                IsGuestRequired = true;
                OtherUsers.push(multipleEmailAddress[j]);
                OtherUserName.push(assignUserName[j]);
            }
            else { //For Company
                if (arrSubVisaLetters.length == 0) {
                    DoesNotexietuser += assignUserName[j] + ",";
                    IsTrue = true;
                    IsGuestRequired = true;
                    OtherUsers.push(multipleEmailAddress[j]);
                    OtherUserName.push(assignUserName[j]);
                }
            }
        }
        if ($('#TaskType').val() == 1) {
            if (TaskusersProjectTeam.length == 0) {
                GetProjectTeamMembers($("#ProjectName :selected").val(), "Onchange");
            }
            for (var j = 0; j < multipleEmailAddress.length; j++) {
                var arrSubVisaLetters = TaskusersProjectTeam.filter(function (filterData) {
                    return filterData.EMail.toLowerCase().trim() == multipleEmailAddress[j].toLowerCase().trim();
                });
                if (arrSubVisaLetters.length == 0) {
                    Notexietuser += assignUserName[j] + ",";
                    IsUser = true;
                }
            }
            if (IsUser) {
                Notexietuser += " is not a valid Team member";
                alert(Notexietuser);
                return false;
            }
        }
        else if ($('#TaskType').val() == 2) {
            Notexietuser = '';
            if (IsModal != "true") {
                if ($("#Audience option:selected").text() == "Company") {
                    getExternalusers("Company");
                }
                else {
                    getExternalusers("Corporate");
                }
                if (IsGuestRequired) {
                    for (var j = 0; j < OtherUsers.length; j++) {
                        if (GuestUser.length > 0) {
                            for (k = 0; k < GuestUser.length; k++) {
                                if (GuestUser[k].email.toLowerCase() != OtherUsers[j].toLowerCase()) {
                                    if (Notexietuser.includes(OtherUserName[j]) == false && GuestUser.length == (k + 1)) {
                                        Notexietuser += OtherUserName[j] + " ,";
                                    }
                                    IsUser = true;
                                }
                                else {
                                    IsUser = false;
                                    break;
                                }
                            }
                        } else {
                            IsUser = true;
                            if (OtherUserName[j].indexOf(Notexietuser) !== -1) {
                                Notexietuser += OtherUserName[j] + ",";
                            }
                        }
                    }
                    if (IsUser || Notexietuser != "") {
                        Notexietuser = Notexietuser.substring(0, Notexietuser.length - 2);
                        if (Notexietuser.includes(',') == true) {
                            Notexietuser += " are not a valid user.";
                        }
                        else {
                            Notexietuser += " is not a valid user.";
                        }
                        alert(Notexietuser);
                        return false;
                    }
                }
            }
            else {
                var NotValidGuest = '';
                getGuestTeamMembrs("Onchange", false);
                for (var j = 0; j < multipleEmailAddress.length; j++) {
                    var arrNotValid = arrGeneralTask.filter(function (filterData) {
                        return filterData.EMail.toLowerCase().trim() == multipleEmailAddress[j].toLowerCase().trim();
                    });
                    if (arrNotValid.length == 0) {
                        NotValidGuest += assignUserName[j] + ", ";
                    }
                }
                if (NotValidGuest != "") {
                    NotValidGuest = NotValidGuest.substring(0, NotValidGuest.length - 2);
                    alert(NotValidGuest + " user(s) are not a valid.");
                    return;
                }
            }
        }
        else {
            if (IsTrue) {
                DoesNotexietuser += " is not a valid user in the company";
                alert(DoesNotexietuser);
                return false;
            }
        }
        //Recursive Task Validation
        if (IsTaskRecursive == "Recursive" || IsTaskRecursive == "RecursiveUpdate") {
            if ($(".StartDateRecursive").val() == '') {
                alert("Please specify Start and End date.");
                return false;
            }
            else if ($(".EndDateRecursive").val() == '' && $("#noenddate").prop('checked') == false) {
                alert("Please specify Start and End date.");
                return false;
            }

            else if ($("#txtDueDay").val() == '') {
                alert("Due Days cannot be empty.");
                return false;
            }
                /*else if(parseInt($("#txtDueDay").val()) < 0){
                }*/
            else if ($("#WeeklyBox").prop("checked") == true) {
                if ($(".chkDayName:checked").length == 0) {
                    alert("Kindly select any day.");
                    return false;
                }
            }
        }
        else {
            if ($("#txtSuccTask").attr("name") != "" && $("#txtPredTask").attr("name") != "" && $("#txtSuccTask").attr("name") != null && $("#txtPredTask").attr("name") != null) {
                if ($("#txtPredTask").attr("name") == $("#txtSuccTask").attr("name")) {
                    alert("Successor and Predecessor can't be same.");
                    return false;
                }
            }
        }
        if ($("#txtDocLink").val() != '') {
            if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#txtDocLink").val()) == false) {
                alert("Document Link is not valid.");
                return false;
            }
        }
        if ($("#RefURL").val() != '') {
            if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#RefURL").val())) {
                currentDlgTask = SP.UI.ModalDialog.showWaitScreenWithNoClose("Adding", "Please wait...");
                setTimeout(function () {
                    saveEmployeeTask();
                }, 1000);
            }
            else {
                alert("Reference URL is invalid.");
                return false;
            }
        }
        else {
            currentDlgTask = SP.UI.ModalDialog.showWaitScreenWithNoClose("Adding", "Please wait...");
            setTimeout(function () {
                saveEmployeeTask();
            }, 1000);
        }

    }
    else if (EditMode == "True" || EditMode == "False") {
        if ($("#txtSuccTaskEdit").attr("name") != "" && $("#txtPredTaskEdit").attr("name") != "" && $("#txtSuccTaskEdit").attr("name") != null && $("#txtPredTaskEdit").attr("name") != null) {
            if ($("#txtPredTaskEdit").attr("name") == $("#txtSuccTaskEdit").attr("name")) {
                alert("Successor and Predecessor can't be same.");
                return false;
            }
        }
        if ($("#txtDocLinkEdit").text() != 'Select Document Link') {
            if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#txtDocLinkEdit").attr('href')) == false) {
                alert("Document Link is not valid.");
                return false;
            }
        }
        if ($("#AssignTo").html() != "") {
            if ($("#RefURLUpdate").val() != '') {
                if (/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test($("#RefURLUpdate").val())) {
                    currentDlgTask = SP.UI.ModalDialog.showWaitScreenWithNoClose("Updating", "Please wait...");
                    setTimeout(function () {
                        updateCurrentTaskStatus();
                    }, 1000);
                }
                else {
                    alert("Reference URL is invalid.");
                    return false;
                }
            }
            else {
                currentDlgTask = SP.UI.ModalDialog.showWaitScreenWithNoClose("Updating", "Please wait...");
                setTimeout(function () {
                    updateCurrentTaskStatus();
                }, 1000);
            }
        }
        else {
            alert("Kindly fill atleast one assign to.");
            return false;
        }
    }
}

function showUserChange(Action) {
    selectedText = $(Action).find("option:selected").text();
    $("#txtserch").val('');
    if ("My Subordinates" == selectedText) {
        $("#lblShowuser").show();
        $("#SeeMoreMyGroup").hide();
        $("#txtserchdiv").show();
        $("#lblShowuser").html('');
        $("#lblShowuser").append("Designation like:");
        $("#lblDepartment").hide();
        $("#ddlDepartment").hide();
        $("#ddlMyGroup").hide();
        $("#ddlClients").hide();
        $("#SeeMoreDept").hide();
        $("#SeeMoreGuest").hide();
        $("#SeeMoreGuestTeam").hide();
        LoadShowUser(arrGeneralTask);
        //Showing data out of total
        if (NextURLGeneral != null) {
            $("#Rowcount").hide();
            $("#ShowProject").show();
            $("#SeeMoreGeneral").show();
            $("#DiplayProject").text(arrGeneralTask.length);
        }
        else {
            $("#Rowcount").show();
            $("#ShowProject").hide();
            $(".ProjectSeeView").hide();
        }
    }
    else if ("Department" == selectedText) {
        $("#lblShowuser").hide();
        $("#SeeMoreMyGroup").hide();
        $("#txtserchdiv").show();
        $("#lblDepartment").show();
        $("#ddlDepartment").show();
        $("#ddlMyGroup").hide();
        $("#ddlClients").hide();
        $("#SeeMoreDept").hide();
        $("#SeeMoreGuest").hide();
        $("#SeeMoreGuestTeam").hide();
        LoadShowUser([]);
        var ids = [];
        var clean = [];
        var dropdown = $('#ddlDepartment');
        dropdown.empty();
        $("#ShowProject").hide();
        $("#SeeMoreGeneral").hide();
        $("#Rowcount").show();

        var requestURI = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Departments')/items?$select=ID,DepartmentName&$Filter=CompanyID eq " + Logged_CompanyId + "";
        $.ajax({
            url: requestURI,
            type: "GET",
            async: false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {

                var Deptlocations;
                Deptlocations += "<option value=\"0\">-Select-</option>";
                $.each(data.d.results, function (i, item) {
                    var ID = item.ID;
                    var Department = item.DepartmentName;
                    Deptlocations += "<option value=\"" + ID + "\">" + Department + "</option>";
                });
                $("#ddlDepartment").html('');
                $("#ddlDepartment").append(Deptlocations);
            },
            error: function (error) {
                alert("Error in binding departments -- " + error);
                return false;
            }
        });

    }
    else if ("All Team Members" == selectedText) {
        LoadShowUser(TaskusersProjectTeam);
        $("#lblShowuser").hide();
        $("#txtserchdiv").show();
        $("#txtserch").val("");
        $("#lblDepartment").hide();
        $("#ddlDepartment").hide();
        $("#ddlMyGroup").hide();
        $("#ddlClients").hide();
        $("#SeeMoreMyGroup").hide();

    }
    else if ("Guest User" == selectedText) {
        $("#SeeMoreDept").hide();
        $("#SeeMoreGeneral").hide();
        LoadShowUser([]);
        getClientNames();
        $("#lblShowuser").hide();
        $("#txtserchdiv").show();
        $("#txtserch").val("");
        $("#lblDepartment").hide();
        $("#ddlDepartment").hide();
        $("#ddlMyGroup").hide();
        $("#ddlClients").show();
        $("#SeeMoreGuestTeam").hide();
        $("#SeeMoreMyGroup").hide();

    }
    else if ("My group" == selectedText) {
        $("#SeeMoreDept").hide();
        $("#SeeMoreGeneral").hide();
        $("#SeeMoreGuestTeam").hide();
        $("#SeeMoreTeam").hide();
        $("#SeeMoreGuest").hide();
        $("#SeeMoreMyGroup").show();
        BindMyGroup();
        $("#lblShowuser").hide();
        $("#txtserchdiv").show();
        $("#txtserch").val("");
        $("#lblDepartment").hide();
        $("#ddlDepartment").hide();
        $("#ddlMyGroup").show();
        $("#ddlClients").hide();
        $("#ddlMyGroup").trigger("change");
    }

    else {
        $("#lblShowuser").hide();
        $("#txtserchdiv").show();
        $("#lblDepartment").hide();
        $("#ddlDepartment").hide();
        $("#ddlMyGroup").hide();
        $("#ddlClients").hide();
        $("#SeeMoreMyGroup").hide();
        LoadShowUser(TaskusersProjectTeam);

    }
}

function SearchAssigneeTable() {
    if (ProjectType == "GenaralTask") {
        if ($("#ddlShowUser").val() == "2") { //My-Subordinates
            if ($("#txtserch").val().trim() != '') {
                var textfilterdata = arrGeneralTask.filter(function (user) {
                    // returns true or false
                    if (user.Designation == null) {
                        user.Designation = "";
                    }
                    if (user.Department == null) {
                        user.Department = "";
                    }
                    return user.Designation.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.FullName.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.EMail.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.Department.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.Manager.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1;
                });
                LoadShowUser(textfilterdata);
                $("#ShowProject").hide();
                $("#SeeMoreGeneral").hide();
                $("#Rowcount").show();
            }
            else {
                LoadShowUser(arrGeneralTask);
                if (arrGeneralTask.length > 99 && NextURLGeneral != null) {
                    $("#Rowcount").hide();
                    $("#ShowProject").show();
                    $("#SeeMoreGeneral").show();
                    $("#DiplayProject").text(arrGeneralTask.length);
                }
                else {
                    $("#Rowcount").show();
                    $("#ShowProject").hide();
                    $("#SeeMoreGeneral").hide();
                    //$("#TotalItemscount").text(items.length);
                }
            }
        }
        else if ($("#ddlShowUser").val() == "6") { //Department
            if ($("#txtserch").val().trim() != '') {
                var textfilterdata = arrDeptTask.filter(function (user) {
                    // returns true or false
                    return user.Designation.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.FullName.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.EMail.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.Department.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.Manager.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1;
                    //user.Skill.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1;
                });
                LoadShowUser(textfilterdata);
                $("#ShowProject").hide();
                $("#SeeMoreDept").hide();
                $("#Rowcount").show();
            }
            else {
                LoadShowUser(arrDeptTask);
                if (arrDeptTask.length > 99 && NextUrlDept != null) {
                    $("#Rowcount").hide();
                    $("#ShowProject").show();
                    $("#SeeMoreDept").show();
                    $("#DiplayProject").text(arrDeptTask.length);
                }
                else {
                    $("#Rowcount").show();
                    $("#ShowProject").hide();
                    $("#SeeMoreDept").hide();
                    //$("#TotalItemscount").text(items.length);
                }
            }
        }
        else if ($("#ddlShowUser").val() == "8") { //My-Group
            if ($("#txtserch").val().trim() != '') {
                var textfilterdata = arrMyGroup.filter(function (user) {
                    // returns true or false
                    return user.Designation.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.FullName.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.EMail.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.Department.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.Manager.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1;
                    //user.Skill.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1;
                });
                LoadShowUser(textfilterdata);
                $("#Rowcount").show();
            }
            else {
                LoadShowUser(arrMyGroup);
            }
        }
        else { //Guest
            if ($("#txtserch").val().trim() != '') {
                var textfilterdata = TaskusersProjectTeam.filter(function (user) {
                    // returns true or false
                    return user.Designation.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.FullName.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.EMail.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                            user.Manager.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1;
                    //user.Skill.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1;
                });
                LoadShowUser(textfilterdata);
                $("#ShowProject").hide();
                $("#SeeMoreGuest").hide();
                $("#Rowcount").show();
            }
            else {
                LoadShowUser(TaskusersProjectTeam);
                if (TaskusersProjectTeam.length > 99 && NextUrlGuest != null) {
                    $("#Rowcount").hide();
                    $("#ShowProject").show();
                    $("#SeeMoreGuest").show();
                    $("#DiplayProject").text(TaskusersProjectTeam.length);
                }
                else {
                    $("#Rowcount").show();
                    $("#ShowProject").hide();
                    $("#SeeMoreGuest").hide();
                }
            }
        }
    }
    if (ProjectType == "Projecttask") {
        if ($("#txtserch").val().trim() != '') {
            var textfilterdata = TaskusersProjectTeam.filter(function (user) {
                // returns true or false
                return user.Designation.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                        user.FullName.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                        user.EMail.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                        user.Department.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1 ||
                        user.Manager.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1;
                //user.Skill.toLowerCase().indexOf($("#txtserch").val().toLowerCase()) != -1;
            });
            LoadShowUser(textfilterdata);
            $("#ShowProject").hide();
            $("#SeeMoreTeam").hide();
            $("#Rowcount").show();
        }
        else {
            LoadShowUser(TaskusersProjectTeam);
            if (TaskusersProjectTeam.length > 99 && NextURLProject != null) {
                $("#Rowcount").hide();
                $("#ShowProject").show();
                $(".ProjectSeeView").show();
                $("#DiplayProject").text(TaskusersProjectTeam.length);
            }
            else {
                $("#Rowcount").show();
                $("#ShowProject").hide();
                $(",ProjectSeeView").hide();
            }
        }
    }
}

function GetSelectItem() {
    var selectedRows = tabledata.getSelectedRows(); //get array of currently selected row components.
    var tempLength = selectedRows.length;
    if (selectedRows.length > 200) {
        selectedRows.length = 200;
    }
    $(".peoplepickerbox").show();
    var user = '';
    if (selectedRows.length > 0) {
        for (var i = 0; i < selectedRows.length; i++) {
            if (jQuery.inArray(selectedRows[i]._row.data.EMail.toLowerCase(), multipleEmailAddress) != '-1') {
                //Do Nothing. Elements contains this already
            }
            else {
                var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
                var allUserInfo = peoplePicker.GetAllUserInfo()
                var IsUser = allUserInfo.filter(function (users) {
                    return users.Description == selectedRows[i]._row.data.EMail;
                });
                /*if (IsUser.length == 0) {
                    peoplePicker.AddUserKeys(selectedRows[i]._row.data.EMail, false);
                }*/
                EmpIds.push(selectedRows[i]._row.data.UserId);
                multipleEmailAddress.push(selectedRows[i]._row.data.EMail.toLowerCase());
                assignUserName.push(selectedRows[i]._row.data.LoginName);
                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(selectedRows[i]._row.data.EMail);
                user += '<div class="col-md-6 userBoxParent"><div class="gridbox"><img src="' + attachment + '"><div class="peopleinfo">';
                user += '<h5>' + selectedRows[i]._row.data.LoginName + '</h5><span onclick="OpenEmail(\'' + selectedRows[i]._row.data.EMail + '\');">' + selectedRows[i]._row.data.EMail + '</span></div>';
                user += '<span class="crosebox" onclick="removeUserBox(this, \'' + selectedRows[i]._row.data.EMail + '\', \'' + selectedRows[i]._row.data.LoginName + '\', ' + selectedRows[i]._row.data.UserId + ');"><i class="fa fa-times"></i></span></div></div>';           
			}
        }
        $("#userHTMLBox").append(user);
        $('#myModal').modal('hide');
        if (tempLength > 200) {
            alert("You can't assign task to more that 200 employees at once.");
        }
    }
    else {
        if (multipleEmailAddress.length == 0) {
            $(".peoplepickerbox").hide();
        }
        alert("Kindly select atleast one employee.");
        return false;
    }
}

//function remove user details box
function removeUserBox(Action, userEmail, UserName, UserId) {
    $(Action).parents('.userBoxParent').remove();
    multipleEmailAddress = multipleEmailAddress.filter(function (obj) {
        return obj.toLowerCase() !== userEmail.toLowerCase();
    });
    assignUserName = assignUserName.filter(function (obj) {
        return obj.toLowerCase() !== UserName.toLowerCase();
    });
    EmpIds = EmpIds.filter(function (obj) {
        return obj != UserId;
    });
    if (multipleEmailAddress.length == 0) {
        $(".peoplepickerbox").hide();
    }
}

// Month in JavaScript is 0-indexed (January is 0, February is 1, etc), 
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function OpenEmail(Email) {
    window.location = "mailto:" + Email.textContent;
}

//Validation check before opening tasks
function PredSuccTaskValidate() {
    if ($("#TaskType").val() != '0') {
        if ($("#TaskType").val() == '1') {
            if ($("#ProjectNameDetails").val() != "0") {
                LoadPredSuccecessorTasks("Add");
            }
            else {
                alert("Kindly select the project first");
                return false;
            }
        }
        else {
            LoadPredSuccecessorTasks("Add");
        }
    }
    else {
        alert("Kindly select the task type first.");
        return false;
    }
}

//Get all the Predecessor tasks
function LoadPredSuccecessorTasks(Action) {
    var TaskHTML = '';
    if (Action == "Add") {
        if ($("#TaskType").val() == '1') {
            var RestQuery = "?$select=*,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Module/Title,ClientID/ID,ClientID/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/Id,TaskAssignToId,Author/Title,Author/EMail,AttachmentFiles,ProjectID/Id&$top=5000&$expand=ProjectID,AssignedBy,AttachmentFiles,ClientID,Module,TaskAssignTo,Author&$filter=AssignedBy/EMail eq '" + _spPageContextInfo.userEmail + "' and ProjectID/Id eq '" + $("#ProjectNameDetails").val() + "' and (CurrentPhase eq 'Open' or CurrentPhase eq 'Close' or CurrentPhase eq 'Completed')";
        }
        else {
            var RestQuery = "?$select=*,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Module/Title,ClientID/ID,ClientID/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/Id,TaskAssignToId,Author/Title,Author/EMail,AttachmentFiles&$top=5000&$expand=AssignedBy,AttachmentFiles,ClientID,Module,TaskAssignTo,Author&$filter=AssignedBy/EMail eq '" + _spPageContextInfo.userEmail + "' and TaskType eq '2' and (CurrentPhase eq 'Open' or CurrentPhase eq 'Close' or CurrentPhase eq 'Completed')";
        }
    }
    else {
        if (TaskKind == '1') {
            var RestQuery = "?$select=*,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Module/Title,ClientID/ID,ClientID/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/Id,TaskAssignToId,Author/Title,Author/EMail,AttachmentFiles,ProjectID/Id&$top=5000&$expand=ProjectID,AssignedBy,AttachmentFiles,ClientID,Module,TaskAssignTo,Author&$filter=AssignedBy/EMail eq '" + _spPageContextInfo.userEmail + "' and ProjectID/Id eq '" + $("#ProjectNameDetails").val() + "' and (CurrentPhase eq 'Open' or CurrentPhase eq 'Close' or CurrentPhase eq 'Completed')";
        }
        else {
            var RestQuery = "?$select=*,AssignedBy/EMail,AssignedBy/Title,AssignedBy/Id,Module/Title,ClientID/ID,ClientID/Title,TaskAssignTo/EMail,TaskAssignTo/Title,TaskAssignTo/Id,TaskAssignToId,Author/Title,Author/EMail,AttachmentFiles&$top=5000&$expand=AssignedBy,AttachmentFiles,ClientID,Module,TaskAssignTo,Author&$filter=AssignedBy/EMail eq '" + _spPageContextInfo.userEmail + "' and TaskType eq '2' and (CurrentPhase eq 'Open' or CurrentPhase eq 'Close' or CurrentPhase eq 'Completed')";
        }
    }
    var DateText = "Due";
    var attachment = '';
    var StartDate = '';
    var TaskAssignToUsers = '';
    var SelectPSTask = '';
    if (Action == "Add") {
        if ($("#txtModalTaskHeader").text() == 'Predecessor Task') {
            SelectPSTask = $("#txtPredTask").attr('name');
        }
        else if ($("#txtModalTaskHeader").text() == 'Successor Task') {
            SelectPSTask = $("#txtSuccTask").attr('name');
        }
        else {
            SelectPSTask = '';
        }
    }
    else {
        if ($("#txtModalTaskHeader").text() == 'Predecessor Task') {
            SelectPSTask = $("#txtPredTaskEdit").attr('name');
        }
        else if ($("#txtModalTaskHeader").text() == 'Successor Task') {
            SelectPSTask = $("#txtSuccTaskEdit").attr('name');
        }
        else {
            SelectPSTask = '';
        }
    }
    $.when(getItemsWithQueryItem("EmployeeTaskDetails", RestQuery, "")).done(function (Tasks) {
        var items = Tasks.results;
        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                TaskAssignToUsers = '';
                var ProjectFullName = items[i].ProjectFullName;
                if (ProjectFullName == null) {
                    ProjectFullName = "<b>Client:</b> <span>" + items[i].ClientID.Title + "</span>";
                }
                else {
                    ProjectFullName = "<b>Project:</b> <span>" + ProjectFullName + "</span>";
                }
                var TaskAssignTo = items[i].TaskAssignTo;
                if (TaskAssignTo.results.length >= 4) {
                    for (assignto = 0; assignto < 4; assignto++) {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[assignto].EMail);
                        TaskAssignToUsers += '<img title="' + TaskAssignTo.results[assignto].Title + '" src="' + attachment + '" alt="">';
                    }
                }
                else {
                    for (assignto = 0; assignto < TaskAssignTo.results.length; assignto++) {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TaskAssignTo.results[assignto].EMail);
                        TaskAssignToUsers += '<img title="' + TaskAssignTo.results[assignto].Title + ' \n' + TaskAssignTo.results[assignto].EMail + '" src="' + attachment + '" alt="">';
                    }
                }
                if (TaskAssignTo.results.length > 4) {
                    TaskAssignToUsers += '<button type="button" class="seemorebox">+' + (TaskAssignTo.results.length - 4) + '</button>';
                }
                var StartDate = new Date(items[i].StartDate);
                StartDate = titanForWork.ShowCommonStandardDateFormat(StartDate);
                var DueDate = items[i].DueDate;
                var CurrentPhase = items[i].CurrentPhase;
                DateText = "Due";
                if (DueDate != null && CurrentPhase != "Completed" && CurrentPhase != "Close") {
                    DueDate = new Date(DueDate);
                    DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
                }

                var CompletionPersent = items[i].CompletionPersent;
                if (CurrentPhase == "Completed" || CurrentPhase == "Close") {
                    DateText = "Completed";
                    DueDate = new Date(items[i].CompletionDate);
                    DueDate = titanForWork.ShowCommonStandardDateFormat(DueDate);//.toLocaleDateString();
                }
                DueDateClass = '';
                if (new Date() > new Date(items[i].DueDate)) {
                    DueDateClass = "reddate"
                }

                if (SelectPSTask == items[i].Id) {
                    TaskHTML += '<tr><td><div class="dividorbox"><div class="checkboxinside"><input class="PredSuccTasks" type="radio" value="' + items[i].Id + '" title="' + items[i].Title + '" name="mutlradio" checked="checked"></div>';
                }
                else {
                    TaskHTML += '<tr><td><div class="dividorbox"><div class="checkboxinside"><input class="PredSuccTasks" type="radio" value="' + items[i].Id + '" title="' + items[i].Title + '" name="mutlradio"></div>';
                }
                TaskHTML += '<div class="daskboxsec"><h4>' + items[i].Title + '</h4><div class="projectsec">' + ProjectFullName + '</div></div></div></td>';
                TaskHTML += '<td><div class="assignprimg">' + TaskAssignToUsers + '</div><div class="dutesection">';
                TaskHTML += '<span>Date: </span><span>' + StartDate + '</span></div></td><td><div class="multeventbox">' + CurrentPhase + '</div>';
                TaskHTML += '<div class="dutesection ' + DueDateClass + '"><span>' + DateText + ': </span><span>' + DueDate + '</span></div></td>';
                TaskHTML += '<td style="display:none;">' + new Date(items[i].Created) + '</td><td style="display:none;">' + new Date(items[i].DueDate) + '</td><td style="display:none;">' + CurrentPhase + '</td>';
                TaskHTML += '</tr>';
            }
            $(".SuccPredTaskTables").empty().append(TaskHTML);
        }
        else {
            $(".SuccPredTaskTables").empty().append('<tr><td colspan="3"><div style="text-align:center;"> No task found.</div></td></tr>');
        }
        if (TaskHTML != '') {
            TableConfSuccPredTask();
        }
        $("#successortask").modal("show");
    });
}

//Table configuration of projects
function TableConfSuccPredTask() {
    sorter = new TINY.table.sorter('sorter', 'SuccTableTask', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
        colddid: 'Succcolumns',
        currentid: 'currentpageSucc',
        totalid: 'totalpagesSucc',
        startingrecid: 'SuccStartrecord',
        endingrecid: 'Succendrecord',
        totalrecid: 'Succtotalrecords',
        hoverid: 'selectedrow',
        pageddid: 'pagedropdownSucc',
        navid: 'Succtablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

//Select Successor or Predecessor task
function SelectSuccPredTask() {
    EditMode = IsEditMode;
    if (EditMode != undefined) {
        EditMode = window.atob(EditMode);
    }
    /*$("#txtSuccTask").val('');
    $("#txtSuccTask").attr("name", '');
    $("#txtSuccTaskEdit").val('');
    $("#txtSuccTaskEdit").attr("name", '');
    $("#txtPredTaskEdit").val('');
    $("#txtPredTaskEdit").attr("name", '');
    $("#txtPredTask").val('');
    $("#txtPredTask").attr("name", '');*/
    if ($('input[name="mutlradio"]:checked')[0] != null) {
        if ($("#txtModalTaskHeader").text() == "Successor Task") {
            if (EditMode == "True") {
                $("#txtSuccTaskEdit").val($('input[name="mutlradio"]:checked')[0].attributes.title.value);
                $("#txtSuccTaskEdit").attr("name", $('input[name="mutlradio"]:checked').val());
            }
            else {
                $("#txtSuccTask").val($('input[name="mutlradio"]:checked')[0].attributes.title.value);
                $("#txtSuccTask").attr("name", $('input[name="mutlradio"]:checked').val());
            }
        }
        else {
            if (EditMode == "True") {
                $("#txtPredTaskEdit").val($('input[name="mutlradio"]:checked')[0].attributes.title.value);
                $("#txtPredTaskEdit").attr("name", $('input[name="mutlradio"]:checked').val());
            }
            else {
                $("#txtPredTask").val($('input[name="mutlradio"]:checked')[0].attributes.title.value);
                $("#txtPredTask").attr("name", $('input[name="mutlradio"]:checked').val());
            }
        }
    }
    else {
        if ($("#txtModalTaskHeader").text() == "Successor Task") {
            $("#txtSuccTask").val('');
            $("#txtSuccTask").attr("name", '');
            $("#txtSuccTaskEdit").val('');
            $("#txtSuccTaskEdit").attr("name", '');
        }
        else {
            $("#txtPredTask").val('');
            $("#txtPredTask").attr("name", '');
            $("#txtPredTaskEdit").val('');
            $("#txtPredTaskEdit").attr("name", '');
        }
    }
    $("#successortask").modal("hide");
}

//Sort Succ/Pred tasks
function SortPredSuccTable(Name) {
    if (Name == "Task Name") {
        $("#SortTaskTitle").trigger("click");
    }
    else if (Name == "Recent Task") {
        $("#SortTaskRecent").trigger("click");
    }
    else if (Name == "Due Date") {
        $("#SortTaskDue").trigger("click");
    }
    else {
        $("#SortTaskPhase").trigger("click");
    }

}
/******************************Change History lakhan******************************************-*/

function getOnChangeHistory(TaskId) {
    var CurrentDate = new Date();
    CurrentDate = CurrentDate.setHours(0, 0, 0, 0);
    CurrentDate = new Date(CurrentDate);
    var Query = "?$top=5000&$select=*,LastActionby/ID,LastActionby/Title&$Expand=LastActionby&$filter=TaskID eq '" + TaskId + "'";
    $.when(getItemsWithQuery('TaskAuditTrail', Query)).done(function (TaskAuditTrail) {
        $('#bodyChangeHistory').html('');
        var tblHTML='';
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