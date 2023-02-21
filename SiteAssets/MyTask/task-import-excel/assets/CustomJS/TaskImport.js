var currentDlg = "";
$(document).ready(function () {
    $('#ExcelUpload').click(function () {
        this.value = null;
    });

    $('#ExcelUpload').change(function () {
        $("#txtAddedCount").text('0');
        $("#txtFailedTasks").text('0');
        ReadExcel();
    });
    $('#selectAllChk').click(function (e) {
        var table = $(e.target).closest('table');
        $('td input:checkbox', table).prop('checked', this.checked);
        if (this.checked == true) {
            $('tr', table).addClass("selected");
        }
        else {
            $('tr', table).removeClass("selected");
        }
        if (this.checked == true) {
            $('#txtSelectedRows').text($('td .ExcelRow:checkbox:checked').length);
        }
        else {
            $('#txtSelectedRows').text('0');
        }
    });
    $('#btnCloseTasks').click(function (e) {
        location.href = "../Pages/MyDashboard.aspx?Location=" +titanForWork.getQueryStringParameter("source");
    });
});

//Read the uploaded excel
function ReadExcel() {
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
    /*Checks whether the file is a valid excel file*/
    if (regex.test($("#ExcelUpload").val().toLowerCase())) {
        var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
        if ($("#ExcelUpload").val().toLowerCase().indexOf(".xlsx") > 0) {
            xlsxflag = true;
        }
        /*Checks whether the browser supports HTML5*/
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                /*Converts the excel data in to object*/
                if (xlsxflag) {
                    var workbook = XLSX.read(data, { type: 'binary' });
                }
                else {
                    var workbook = XLS.read(data, { type: 'binary' });
                }
                /*Gets all the sheetnames of excel in to a variable*/
                var sheet_name_list = workbook.SheetNames;

                var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
                sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/
                    /*Convert the cell value to Json*/
                    if (xlsxflag) {
                        var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    }
                    else {
                        var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                    }
                    if (exceljson.length > 0 && cnt == 0) {
                        if (ValidateExcel(exceljson) == true) {
                            BindExcelToTable(exceljson);
                        }
                        else {
                            $("#ExcelUpload").val("");
                        }
                        cnt++;
                    }
                });
            }
            if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/
                reader.readAsArrayBuffer($("#ExcelUpload")[0].files[0]);
            }
            else {
                reader.readAsBinaryString($("#ExcelUpload")[0].files[0]);
            }
        }
        else {
            alert("Sorry! Your browser does not support HTML5!");
        }
    }
    else {
        alert("Please upload a valid excel file!");
    }
}


//to validate the uploaded excel
function ValidateExcel(array) {
    IsAllCorrect = true;
    if (array.length > 0) {
        for (var rows = 0; rows < (array.length - 1) ; rows++) {
            //mandatory fields check
            var value = array[rows];
            if ($.trim(value["Task"]) == "" || $.trim(value["Type"]) == "" || $.trim(value["Assigned To"]) == "" || $.trim(value["Due Date"]) == "") {
                alert("Kindly fill all the mandatory fields.");
                IsAllCorrect = false;
                return false;
            }
                //Assigned By email check
            else if (validateEmail($.trim(value["Assigned By"])) == false) {
                alert("Assigned By email Id is not in correct format.");
                IsAllCorrect = false;
                return false;
            }
                //Assigned To email check
            else if ($.trim(value["Assigned To"]) != "") {
                var arrAssignTo = $.trim(value["Assigned To"]).split(";");
                for (var assignTo = 0; assignTo < arrAssignTo.length; assignTo++) {
                    if (validateEmail($.trim(arrAssignTo[assignTo].trim())) == false || $.trim(arrAssignTo[assignTo].trim()).includes(";") == true) {
                        alert("Assigned To email Id is not in correct format.");
                        IsAllCorrect = false;
                        return false;
                    }
                }
            }
            else {
                IsAllCorrect = true;
            }
            //change undefined value to blank
            if (value["Assigned By"] == null) {
                value["Assigned By"] = "";
            }
            if (value["Project"] == null) {
                value["Project"] = "";
            }
            if (value["Module"] == null) {
                value["Module"] = "";
            }
            if (value["Customer"] == null) {
                value["Customer"] = "";
            }
            if (value["Work Type"] == null) {
                value["Work Type"] = "";
            }
            if (value["Priority"] == null) {
                value["Priority"] = "";
            }
        }
        return IsAllCorrect;
    }
    else {
        return false;
    }

}

//Bind excel rows in table and Pagination
function BindExcelToTable(array) {
    var excelRow = "";
    var value = '';
    $(".tbdyImportTasks").empty();
    if (array.length > 0) {
        $("#btnViewAll").show();
        //$('#selectAllChk').prop('checked', 'checked');
        for (var rows = 0; rows < array.length ; rows++) {
            value = array[rows];
            excelRow += '<tr><td><div class="checkbox task-import-thead-checkbox m-0"><input type="checkbox" class="ExcelRow"></div></td>';
            excelRow += '<td>Ready</td>';
            excelRow += '<td>' + value["Task"] + '</td>';
            excelRow += '<td>' + value["Type"] + '</td>';
            excelRow += '<td>' + value["Project"] + '</td>';
            excelRow += '<td>' + value["Module"] + '</td>';
            excelRow += '<td>' + value["Customer"] + '</td>';
            excelRow += '<td>' + value["Work Type"] + '</td>';
            excelRow += '<td>' + value["Assigned By"] + '</td>';
            excelRow += '<td>' + value["Assigned To"] + '</td>';
            excelRow += '<td>' + value["Due Date"] + '</td>';
            excelRow += '<td>' + value["Priority"] + '</td>';
            excelRow += '<td></td></tr>';
        }
        $(".tbdyImportTasks").append(excelRow);
        TableConfiguration();
        $("#selectAllChk").trigger("click");
        $("#parentSubmit").empty().append('<button type="button" class="btn custom-btn mr-8 w-87" data-toggle="modal" data-target="#template-modal">Template</button><button type="button" class="btn custom-btn mr-8 w-87" id="btnSubmitTasks">Submit</button><button type="button" class="btn custom-btn-two-danger w-87" id="btnCloseTasks">Close</button>');
        $('#btnSubmitTasks').click(function (e) {
            var dlgTitle = 'Adding...';
            var dlgMsg = '<br />Please wait!!';
            var dlgHeight = 200;
            var dlgWidth = 400;
            SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function () {
                currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
            });
            setTimeout(function () {
                SubmitTasks(array);
            });
        });
        $('#btnCloseTasks').click(function (e) {
            location.href = "../Pages/MyDashboard.aspx?Location=" +titanForWork.getQueryStringParameter("source");
        });
    }
    else {
        $("#btnViewAll").hide();
    }
    
}
var sorter = '';
function TableConfiguration() {
    sorter = new TINY.table.sorter('sorter', 'tblImportTasks', {
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
        pageddid: 'pageDropDown',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
    $('#txtSelectedRows').text($('td .ExcelRow:checkbox:checked').length);
    $('.ExcelRow').change(function () {
        if (this.checked == false) {
            $('#selectAllChk').prop("checked", "");
        }
        else {
            if ($('.tbdyImportTasks').find('tr').length == $('td .ExcelRow:checkbox:checked').length) {
                $('#selectAllChk').prop("checked", "checked");
            }
            else {
                $('#selectAllChk').prop("checked", "");
            }
        }
        if ($(this).closest("tr").hasClass("selected") == true) {
            $(this).closest("tr").removeClass("selected");
        }
        else {
            $(this).closest("tr").addClass("selected");
        }
        $('#txtSelectedRows').text($('td .ExcelRow:checkbox:checked').length);
    });
}

//Submission of selected tasks
function SubmitTasks(array) {
    var ProjectID = '';
    var IsShowAlert = false;
    if (array.length > 0) {
        $('#selectAllChk').prop('checked', 'checked');
        //$.each(array, function (index, value) {
        $("#btnExpandAll").trigger("click");
        if($(".tbdyImportTasks tr.selected").length > 0) {
        	IsShowAlert = true;
        }
        $(".tbdyImportTasks tr.selected").each(function (index, value) {
            var arrAssignTo = $.trim(value.children[9].innerText).split(";");
            if (value.children[3].innerText.toLowerCase() == "project task") {
            	getProjectID(value.children[4].innerText, arrAssignTo, value.children, index, value);
            }
            else { //General task
                getCustomerID(value.children[6].innerText, arrAssignTo, value.children, index, value);
            }
        });
        if(IsShowAlert == true) {
            alert("Process has been completed.");
        }
    }
    currentDlg.close();
}

//to find project item id from Project name and reference number
        function getProjectID(Project, arrAssignTo, TaskDetails, index, TableRow) {
            var RestQuery = "?$select=Id,ProjectCode,Title&$orderby=Modified desc&$expand=&$filter=ProjectCode eq '" + Project + "' or Title eq '" + Project + "' or ProjectName eq '" + Project + "'&$top=5000",
                dfds = $.Deferred(),
                IsTeamMember = false,
                arrMembersId = [],
                url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items/" + RestQuery;
            $.when(getItems(url, dfds)).done(function (ProjectResult) {
                response = [];
                if (ProjectResult.length > 0) {
                    
                        //to check if User who is assigned by has rights to create task
                        var AssignedBy = '';
                        if (TaskDetails[8].innerText != "" && TaskDetails[8].innerText != null) {
                            AssignedBy = TaskDetails[8].innerText;
                        }
                        else {
                            AssignedBy = _spPageContextInfo.userEmail;
                        }
                        RestQuery = "?$select=*,TeamMember/EMail,TeamMember/Id&$expand=TeamMember&$top=100&$filter= Status eq 'Active' and TeamMember/EMail eq '" + AssignedBy + "' and ProjectId eq '" + ProjectResult[0].Id + "' ",
                        dfds = $.Deferred();
                        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items/" + RestQuery;
                        $.when(getItems(url, dfds)).done(function (TeamMember) {
                            response = [];
                            if (TeamMember.length > 0) {
                                if (TeamMember[0].TaskPermission == true) {
                                	for (var assignTo = 0; assignTo < arrAssignTo.length; assignTo++) {
	                                    IsTeamMember = IsProjectTeamMembers(ProjectResult[0].Id, arrAssignTo[assignTo].trim(), TaskDetails, TableRow);
	                                    if (IsTeamMember == false || IsTeamMember == null) {
	                                        TaskDetails[1].innerText = "Failed";
	                                        TaskDetails[12].innerText = arrAssignTo[assignTo].trim() + " is not a valid team member.";
	                                        $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
	                                        TableRow.style.color = "#ff0000";
	                                        break;
	                                    }
	                                    else {
	                                        arrMembersId.push(IsTeamMember);
	                                    }
	                                }
                                }
                                else {
                                    TaskDetails[1].innerText = "Failed";
                                    TaskDetails[12].innerText = 'You do not have the permission to create Task.';
                                    $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                                    TableRow.style.color = "#ff0000";
                                }
                            }
                        });                       
                    if (IsTeamMember != false && IsTeamMember != null && IsTeamMember != "") {
                        GetModule(ProjectResult[0].Id, TaskDetails[5].innerText, TaskDetails, arrMembersId, ProjectResult[0].Title, index, TableRow);
                    }
                }
                else {
                    TaskDetails[1].innerText = "Failed";
                    TaskDetails[12].innerText = Project + " is not a project name/project code.";
                    $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                    TableRow.style.color = "#ff0000";
                }
            }).fail(function (error) {
                if (error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1) {
                    TaskDetails[1].innerText = "Failed";
                    TaskDetails[12].innerText = "The attempted operation is prohibited because it exceeds the list view threshold.";
                    $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                    TableRow.style.color = "#ff0000";
                }
            });
        }

        //check for Project team members
        function IsProjectTeamMembers(ProjectId, AssignTo, TaskDetails, TableRow) {
            var IsTeamMember = false,
                RestQuery = "?$select=*,TeamMember/EMail,TeamMember/Id&$expand=TeamMember&$top=100&$filter= Status eq 'Active' and TeamMember/EMail eq '" + AssignTo + "' and ProjectId eq '" + ProjectId + "' ",
                dfds = $.Deferred();
            url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items/" + RestQuery;
            $.when(getItems(url, dfds)).done(function (TeamMember) {
                response = [];
                if (TeamMember.length > 0) {
                    IsTeamMember = TeamMember[0].TeamMember.Id;
                }
                else {
                    //TaskDetails[1].innerText = "Failed";
                    //TaskDetails[12].innerText = AssignTo + " is not a valid team member.";
                    //$("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                    //TableRow.style.color = "#ff0000";
                }
            }).fail(function (error) {
                if (error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1) {
                    TaskDetails[1].innerText = "Failed";
                    TaskDetails[12].innerText = "The attempted operation is prohibited because it exceeds the list view threshold.";
                    $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                    TableRow.style.color = "#ff0000";
                }
            });
            return IsTeamMember;
        }

        //get module details
        function GetModule(ProjectId, ModuleName, TaskDetails, arrMembersId, ProjectTitle, index, TableRow) {
            var RestQuery = "?$select=*&$Filter=ProjectId eq '" + ProjectId + "' and Status eq 'Active' and Title eq '" + ModuleName + "' ";
            $.when(getItemsWithQueryItem("ProjectModules", RestQuery)).done(function (Module) {
                if (Module.length > 0) {
                    AddProjectTask(ProjectId, TaskDetails, ProjectTitle, arrMembersId, Module[0].Id, index, TableRow);
                }
                else {
                    AddProjectTask(ProjectId, TaskDetails, ProjectTitle, arrMembersId, '', index, TableRow);
                    /*TaskDetails[1].innerText = "Failed";
                    TaskDetails[12].innerText = ModuleName + " is not a valid module name.";
                    $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                    TableRow.style.color = "#ff0000";*/
                }
            });
        }

        // Add Task if all conditions are fulfilled
        function AddProjectTask(ProjectId, TaskDetails, ProjectName, arrMembersId, ModuleId, currentIndex, TableRow) {
            var Metadata;
            var taskType = "1";
            var Priority = "Medium";
            var AssignedBy = "";
            if (TaskDetails[8].innerText != "" && TaskDetails[8].innerText != null) {
                AssignedBy = GetUserId(TaskDetails[8].innerText);
            }
            else {
                AssignedBy = _spPageContextInfo.userId;
            }
            var FinalDueDate = GetDateStandardFormat(moment(TaskDetails[10].innerText).format('DD/MM/YYYY'));
            if (TaskDetails[11].innerText != "" && TaskDetails[11].innerText != null) {
                Priority = TaskDetails[11].innerText;
            }
            var cutsomer = 0;
            if(ModuleId == '') {
                ModuleId = 0;
            }
            var ItemType = GetItemTypeForListName('EmployeeTaskDetails');
            Metadata = {
                __metadata: {
                    'type': ItemType
                },

                Title: $.trim(TaskDetails[2].innerText),
                TaskType: taskType,
                ProjectName: ProjectId.toString(),
                ProjectFullName: ProjectName,
                ProjectIDId: ProjectId,
                TaskAssignToId: {
                    'results': arrMembersId
                },
                AssignedById: AssignedBy,
                Description: "",
                StartDate: new Date().toISOString(),
                DueDate: FinalDueDate,
                TaskPriority: Priority,
                CurrentPhase: "Open",
                CompletionPersent: '0',
                CompanyId: Logged_CompanyId,
                Distribution: "Consolidated",
                ClientIDId: cutsomer,
                ModuleId: ModuleId,
                Worktype: $.trim(TaskDetails[7].innerText),
                ReferenceLink: {
                    '__metadata': { 'type': 'SP.FieldUrlValue' },
                    'Description': "",
                    'Url': ""
                }
            };
            AddItemToList(Metadata, currentIndex, TaskDetails, TableRow);
        }

        //add task in SharePoint list
        function AddItemToList(Metadata, currentIndex, TaskDetails, TableRow) {
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
                    TaskDetails[1].innerText = "Done";
                    TaskDetails[0].children[0].children[0].remove();
                    $("#txtAddedCount").text(parseInt($("#txtAddedCount").text()) + 1);
                    TableRow.style.color = "#039203";
                    $(TableRow).removeClass("selected");
                    dfd.resolve(data);
                },
                error: function (error) {
                    TaskDetails[1].innerText = "Failed";
                    TaskDetails[12].innerText = JSON.stringify(error) + " Error while adding.";
                    $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                    TableRow.style.color = "#ff0000";
                    console.log(JSON.stringify(error));
                    dfd.reject(error);
                }
            });
            return dfd.promise();
        }

        //to get user id from email
        function GetUserId(userEmail) {
            var userID = "";
            var prefix = "i:0#.f|membership|";
            var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
            var accountName = prefix + userEmail; // prefix+userName;       
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

        //to get Customer Id and check if user is valid or not
        function getCustomerID(Customer, arrAssignTo, TaskDetails, index, TableRow) {
            var IsValid = 0;
            var arrMembersId = [];
            var listName = 'ClientMaster';
            if (Customer != null && Customer != null && Customer != "") {
                RestQuery = "?$select=SelfCompany,Title,ID,Client_Code&$filter=IsActive eq 1 and (Title eq '" + Customer + "' or Client_Code eq '" + Customer + "')&$top=5000";
                var dfds = $.Deferred();
                var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items/" + RestQuery;
                $.when(getItems(url, dfds)).done(function (ClientDetails) {
                    response = [];
                    if (ClientDetails.length > 0) {
                        ClientID = ClientDetails[0].ID;
                        for (var assignTo = 0; assignTo < arrAssignTo.length; assignTo++) {
                            IsValid = checkUserValid(arrAssignTo[assignTo].trim());
                            if (IsValid == "" || IsValid == null) {
                                TaskDetails[1].innerText = "Failed";
                                TaskDetails[12].innerText = arrAssignTo[assignTo].trim() + " is not a valid user.";
                                $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                                TableRow.style.color = "#ff0000";
                                arrMembersId = [];
                                break;
                            }
                            else {
                                arrMembersId.push(IsValid);
                            }
                        }
                        AddGeneralTask(ClientID, TaskDetails, arrMembersId, index, TableRow);
                    }
                    else {
                        TaskDetails[1].innerText = "Failed";
                        TaskDetails[12].innerText = Customer + " is not a valid ClientName/ClientCode.";
                        $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                        TableRow.style.color = "#ff0000";
                    }
                });
            }
            else {
                RestQuery = "?$select=SelfCompany,Title,ID,Client_Code&$filter=SelfCompany eq 1&$top=5000";
                var dfds = $.Deferred();
                var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items/" + RestQuery;
                $.when(getItems(url, dfds)).done(function (ClientDetails) {
                    response = [];
                    if (ClientDetails.length > 0) {
                        ClientID = ClientDetails[0].ID;
                        for (var assignTo = 0; assignTo < arrAssignTo.length; assignTo++) {
                            IsValid = checkUserValid(arrAssignTo[assignTo].trim());
                            if (IsValid == "" || IsValid == null) {
                                arrMembersId = [];
                                TaskDetails[1].innerText = "Failed";
                                TaskDetails[12].innerText = arrAssignTo[assignTo].trim() + " is not a valid user.";
                                $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                                TableRow.style.color = "#ff0000";
                                break;
                            }
                            else {
                                arrMembersId.push(IsValid);
                            }
                        }
                        AddGeneralTask(ClientID, TaskDetails, arrMembersId, index, TableRow);
                    }
                    else {
                        TaskDetails[1].innerText = "Failed";
                        TaskDetails[12].innerText = "There is not self company assigned.";
                        $("#txtFailedTasks").text(parseInt($("#txtFailedTasks").text()) + 1);
                        TableRow.style.color = "#ff0000";
                    }
                });
            }
        }

        function AddGeneralTask(cutsomer, TaskDetails, arrMembersId, currentIndex, TableRow) {
            var Metadata;
            var taskType = "2";
            var Priority = "Medium";
            TaskDetails[10].innerText = moment(new Date(TaskDetails[10].innerText)).format("MM/DD/YYYY");
            var FinalDueDate = GetDateStandardFormat(TaskDetails[10].innerText);
            var AssignedBy = "";
            if (TaskDetails[8].innerText != "" && TaskDetails[8].innerText != null) {
                AssignedBy = GetUserId(TaskDetails[8].innerText);
            }
            else {
                AssignedBy = _spPageContextInfo.userId;
            }
            if (TaskDetails[11].innerText != "" && TaskDetails[11].innerText != null) {
                Priority = TaskDetails[11].innerText;
            }
            var ItemType = GetItemTypeForListName('EmployeeTaskDetails');
            Metadata = {
                __metadata: {
                    'type': ItemType
                },

                Title: $.trim(TaskDetails[2].innerText),
                TaskType: taskType,
                ProjectName: "",
                ProjectFullName: "",
                ProjectIDId: 0,
                TaskAssignToId: {
                    'results': arrMembersId
                },
                AssignedById: AssignedBy,
                Description: "",
                StartDate: new Date().toISOString(),
                DueDate: FinalDueDate,
                TaskPriority: Priority,
                CurrentPhase: "Open",
                CompletionPersent: '0',
                CompanyId: Logged_CompanyId,
                Distribution: "Consolidated",
                ClientIDId: cutsomer,
                ModuleId: 0,
                Worktype: $.trim(TaskDetails[7].innerText),
                ReferenceLink: {
                    '__metadata': { 'type': 'SP.FieldUrlValue' },
                    'Description': "",
                    'Url': ""
                }
            };
            if(AssignedBy == "" || AssignedBy == "null" || AssignedBy == null || AssignedBy == "undefined") {
                delete Metadata["AssignedById"];
            }
            if(Priority == "" || Priority == "null" || Priority == null || Priority == "undefined") {
                Metadata["TaskPriority"] = "Low";
            }

            AddItemToList(Metadata, currentIndex, TaskDetails, TableRow);
        }




        //check if user id valid or not
        function checkUserValid(Email) {
            var userId = "";
            RestQuery = "?$select=Status,LogonName/Id,LogonName/EMail&$expand=LogonName&$filter= Status eq 'Active' and LogonName/EMail eq '" + Email + "'&$top=5000";
            dfds = $.Deferred(),
            url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + RestQuery;
            $.when(getItems(url, dfds)).done(function (Employees) {
                response = [];
                if (Employees.length > 0) {
                    userId = Employees[0].LogonName.Id;
                }
                else {
                    //Check in External Users list
                    var Query = "?$select=LoginName/EMail,LoginName/Id&$expand=LoginName&$filter=LoginName/EMail eq '" + Email + "'&$top=5000";
                    dfds = $.Deferred();
                    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
                    $.when(getItems(url, dfds)).done(function (ExtResults) {
                        response = [];
                        if (ExtResults.length > 0) {
                            userId = ExtResults[0].LoginName.Id;
                        }
                    });
                }
            });
            return userId;
        }

        //to validate email format
        function validateEmail(email) {
            result = false;
            if (email != "") {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                result = re.test(String(email).toLowerCase());
            }
            else {
                result = true;
            }
            return result;
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
                    dfds.reject(error)
                    console.log(error);
                }
            })
            return dfds.promise()
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


        //To get List's Item Type
        function GetItemTypeForListName(ListName) {
            return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
        }


        //get list-items from SP list 
        function getItemsWithQueryItem(ListName, Query) {
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
                    DeferredObj.reject(error);
                }
            });
            return DeferredObj.promise();
        }
