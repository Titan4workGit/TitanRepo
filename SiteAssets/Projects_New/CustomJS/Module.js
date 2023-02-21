var txtProjectID = titanForWork.getQueryStringParameter("ProjectID");
var demoSource = [];
var arrSprint = [];
var UpdatePercentage = 0;
var ModuleTable = '';
$(document).ready(function () {
	GetAllModuleByProjectId();
    $("#txtCompletionEdit").change(function (value) {
        if (this.value == "100") {
            $("#updateStatus").val("Completed");
        }
    });
    $("#Progress_Status").change(function (value) {
        if (this.value == "Manual") {
            $("#txtCompletion").prop('disabled', false);
        }
        else {
        	$("#txtCompletion").val('');
        	$("#txtCompletion").prop('disabled', true);
        }
    });

    
    $("#updateStatus").change(function (value) {
        if (this.value == "Completed") {
            $("#txtCompletionEdit").val("100");
        }
    });
    $("#txtCompletion").change(function (value) {
        if (this.value == "100") {
            $("#ProjectSatus").val("Completed");
        }
    });
    $("#ProjectSatus").change(function (value) {
        if (this.value == "Completed") {
            $("#txtCompletion").val("100");
        }
    });

    $(".fromdate").datepicker({
        dateFormat: 'MM dd, yy',
    }).keypress(function (event) { event.preventDefault(); });

    $(".endingdate").datepicker({
        dateFormat: 'MM dd, yy',
    }).keypress(function (event) { event.preventDefault(); });

    $("#tabGanttChart").click(function () {
        CreateGanttModule();
    });
    $("#ModuleGanttTab").click(function () {
        $("#gantt").show();
        $(".TaskGantt").hide();
    });
    $("#TaskGanttTab").click(function () {
        $(".TaskGantt").show();
        $("#gantt").hide();
        if ($(".TaskGantt").html() == '') {
            BindGanttTaskChart();
        }
    });

    $("#btnsubmitModule").click(function () {
        if (ModuleValidation($('#txtTitlemodule').val(), $('#txtBiomodule').val(), $("#ProjectWeightage").val(), $("#txtCompletion").val(), $("#ProjectSatus option:selected").text(), $('#PlannedFromDate').val(), $('#PlannedToDate').val()) == true) {
            var PlannedFromDate = $('#PlannedFromDate').val();
            var txtPlannedStartDate = null;
            if (PlannedFromDate != null && PlannedFromDate != "") {
                var d=new Date(PlannedFromDate);
                PlannedFromDate=d.format('dd/MM/yyyy');
                txtPlannedStartDate = GetDateStandardFormat(PlannedFromDate);
            }
            var PlannedToDate = $('#PlannedToDate').val();
            var txtPlannedToDate = null;
            if (PlannedToDate != null && PlannedToDate != "") {
                var d=new Date(PlannedToDate );
                PlannedToDate =d.format('dd/MM/yyyy');
                txtPlannedToDate = GetDateStandardFormat(PlannedToDate);
            }
            var Metadata;
            var Completion = $("#txtCompletion").val()
            if (Completion == '' || Completion == null) {
                Completion = '0';
            }
            if (txtPlannedToDate >= txtPlannedStartDate || (txtPlannedToDate == null || txtPlannedStartDate == null)) {
                var ItemType = GetItemTypeForListName('ProjectModules');
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Title: $('#txtTitlemodule').val(),
                    Description: $('#txtBiomodule').val(),
                    ProjectId: txtProjectID,
                    ProjectName: $("#txtProjectName").text(),
                    Status: $("#ProjectSatus option:selected").text(),
                    weightage: $("#ProjectWeightage").val(),
                    CompletionPercentage: Completion,
                    PlannedStartDate: txtPlannedStartDate,
                    PlannedEndDate: txtPlannedToDate,
                    Sprint: $("#txtSprint").val(),
                    ProgressStatus: $("#Progress_Status").val()
                };
                AddModule(Metadata, 'ProjectModules');
                $("#add-module-modal").modal('hide');
            }
            else {
                alert('Planned End Date can not be less than Planned Start Date');
                return false;
            }
        }
    });
    $("#btnupdateModule").click(function () {
        if (ModuleValidation($('#updateModuleName').val(), $('#updadteDescription').val(), $("#EditProjectWeightage").val(), $("#txtCompletionEdit").val(), $("#updateStatus option:selected").text(), $('#EditFromDate').val(), $('#EditToDate').val()) == true) {
            var PlannedFromDate = $('#EditFromDate').val();
            var txtPlannedStartDate = null;
            if (PlannedFromDate != null && PlannedFromDate != "") {
                var d= new Date(PlannedFromDate);
                PlannedFromDate=d.format('dd/MM/yyyy');
                txtPlannedStartDate = GetDateStandardFormat(PlannedFromDate);
            }
            var PlannedToDate = $('#EditToDate').val();
            var txtPlannedToDate = null;
            if (PlannedToDate != null && PlannedToDate != "") {
                var d= new Date(PlannedToDate );
                PlannedToDate =d.format('dd/MM/yyyy');
                txtPlannedToDate = GetDateStandardFormat(PlannedToDate);
            }
            var Completion = $("#txtCompletionEdit").val();
            if (Completion == '' || Completion == null) {
                Completion = '0';
            }

            if (txtPlannedToDate >= txtPlannedStartDate || (txtPlannedToDate == null || txtPlannedStartDate == null)) {
                var Metadata;
                var ItemType = GetItemTypeForListName('ProjectModules');
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    Title: $('#updateModuleName').val(),
                    Description: $('#updadteDescription').val(),
                    Status: $("#updateStatus option:selected").text(),
                    weightage: $("#EditProjectWeightage").val(),
                    CompletionPercentage: Completion,
                    PlannedStartDate: txtPlannedStartDate,
                    PlannedEndDate: txtPlannedToDate,
                    Sprint: $("#EditTxtSprint").val()
                };
                UpdateModule(Metadata, 'ProjectModules');
                $("#edit-module-modal").modal('hide');
            }
            else {
                alert('Planned End Date can not less than Planned From Date');
                return false;
            }
        }
    });
    $("#btnaddModule").click(function () {
        if (CanAddModule == true) {
            $('#add-module-modal').modal('show');
        }
        else {
            alert("You are not authorized to perform this action.");
            return false;
        }
    });
    $("#btnCancelModule").click(function () {
        $("#txtTitlemodule").val("");
        $("#txtBiomodule").val("");
        $("#ProjectWeightage").val("1");
        $("#txtCompletion").val("");
        $("#ProjectSatus").val("Active");
        $('.fromdate').val('');
        $('.endingdate').val('');
        $('#txtSprint').val('');
    });
});


//Validation for Module add and update lakhan
function ModuleValidation(ModuleName, Description, Weightage, Completion, Status, fromDate, ToDate) {
    var ChangedFromDate = ''
    var ChangedToDate = '';
    var tempfromDate=fromDate;
    var tempToDate=ToDate;
    var PStartDate = new Date($("#PlannedStartDate").text());
    PStartDate = $.datepicker.formatDate('MM dd, yy', PStartDate);
    
    var PEndDate = new Date($("#PlanedEndDate").text());
    PEndDate = $.datepicker.formatDate('MM dd, yy', PEndDate);
    fromDate =new Date(fromDate)
    if (tempfromDate!= '') {
        fromDate=fromDate.format('dd/MM/yyyy');
        ChangedFromDate = GetDateStandardFormat(fromDate);
    }
    ToDate =new Date(ToDate)
    if (tempToDate!= '') {
        ToDate=ToDate.format('dd/MM/yyyy');
        ChangedToDate = GetDateStandardFormat(ToDate);
    }
    if (ModuleName == '' || ModuleName == null) {
        alert('Kindly fill module name.');
        return false;
    }
    else if (Description == '' || Description == null) {
        alert('Kindly fill module description.')
        return false;
    }
        /*else if (Completion == '' || Completion == null) {
            alert('Kindly fill module completion.');
            return false;
        }*/
    else if (parseFloat(Completion) > 100 || parseFloat(Completion) < 0) {
        alert('Completion percentage cannot be greater than hundered or less than zero.')
        return false;
    }
    else if (tempfromDate== "" || ToDate == "") {
        if (tempfromDate== "" && tempToDate== "") {
            return true;
        }
        else {
            alert('Kindly enter both dates.')
            return false;
        }
    }
    else {
        if (new Date(ChangedFromDate) >= new Date($("#PlannedStartDate").text()) && new Date(ChangedToDate) <= new Date($("#PlanedEndDate").text())) {
            return true;
        }
        else {
            alert('Module planned dates should be in-between ' + PStartDate + ' to ' + PEndDate +'.');
            return false;
        }
    }
}

// update module
function UpdateModule(Metadata, ListName) {
    var dfd = $.Deferred();
    var apiPath = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('" + ListName + "')/items('" + EditId + "')";
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
            dfd.resolve(data);
            alert("Module updated successfully");
            $('#edit-module-modal').modal('hide');
            updateCompletionPercent();
            $('#updateModuleName').val('');
            $('#updateStatus ').val('Active');
            $('.fromdate').val('');
            $('.endingdate').val('');
            $('#EditTxtSprint').val('');
            $("#gantt").empty();
            demoSource = [];
            demoSource = ProjectDemoSource.filter(function (f) { return f; });
            GetAllModuleByProjectId();
        }, eror: function (data) {
            dfd.reject(data);
            console.log("An error occurred. Please try again.");
        }
    });
    return dfd.promise();
}

//Add data in SP list
function AddModule(Metadata, ListName) {
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
            // console.log(data);
            dfd.resolve(data);
            alert('Project module submitted.')
            $('#add-module-modal').modal('hide');
            updateCompletionPercent();
            $('#txtTitlemodule').val('');
            $('#txtBiomodule').val('');
            $('.fromdate').val('');
            $('.endingdate').val('');
            $('#txtSprint').val('');
            $("#txtCompletion").val('');
            $("#gantt").empty();
            demoSource = [];
            demoSource = ProjectDemoSource.filter(function (f) { return f; });
            GetAllModuleByProjectId();
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//to update the CompletionPercentage value in list
function updateCompletionPercent() {
    var Metadata;
    var ItemType = GetItemTypeForListName('ProjectDetails');
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        CompletionPercentage: parseInt(UpdatePercentage)
    };

    var dfd = $.Deferred();
    var apiPath = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ProjectDetails')/items('" + ProjectId + "')";
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
            dfd.resolve(data);
        }, eror: function (data) {
            dfd.reject(data);
            console.log("An error occurred. Please try again.");
        }
    });
    return dfd.promise();
}

// get All module on page load
function GetAllModuleByProjectId() {
    demoSource = ProjectDemoSource.filter(function (f) { return f; });
    ExisitngTeamMemberArray = [];
    var weightageCompl = 0;
    var SumweightageCompl = 0;
    var weightageSum = 0;
    var CompletionPercent = 0;
    var TempSprint = [];
    var firstRun = false;
    var RunCount = 0;
    var fullTitle = '';
    var CustomTitle = '';
    var arrAlreadyAddedSp = [];
    var MStartDate = '';
    var MEndDate = '';
    $("#parentEditSprint").html('');
    $("#parentEditSprint").append('<select class="form-control" id="EditTxtSprint"></select>');
    $("#ParentSprint").html('');
    $("#ParentSprint").append('<select class="form-control" id="txtSprint"></select>');
    var itemId = txtProjectID;//titanForWork.getQueryStringParameter("ProjectID");
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectModules')/items?$select=*&$Filter=ProjectId eq '" + itemId + "'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var dvTable = $("#viewALLModule");
            if (ModuleTable != '') {
		        ModuleTable.destroy();
		    }
            dvTable.html("");
            var items = data.d.results;
            var tr;
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                	MStartDate = '';
    				MEndDate = '';
                	if (items[i].PlannedStartDate != null && items[i].PlannedStartDate != "null") {
						MStartDate = new Date(items[i].PlannedStartDate);
		                MStartDate = $.datepicker.formatDate('MM dd, yy', MStartDate);
		            }
                	if (items[i].PlannedEndDate != null && items[i].PlannedEndDate != "null") {
						MEndDate = new Date(items[i].PlannedEndDate);
                		MEndDate = $.datepicker.formatDate('MM dd, yy', MEndDate);
                	}
                    if (items[i].Status != "Inactive") {
                        weightageCompl = items[i].weightage * items[i].CompletionPercentage;
                        SumweightageCompl = SumweightageCompl + weightageCompl;
                        weightageSum = items[i].weightage + weightageSum;
                    }

                    if (items[i].Sprint != null) {
                    	if(jQuery.inArray(items[i].Sprint, arrAlreadyAddedSp) == '-1'){
	                    	arrAlreadyAddedSp.push(items[i].Sprint);
	                        $("#txtSprint").append('<option value="' + items[i].Sprint + '">' + items[i].Sprint + '</option>');
	                        $("#EditTxtSprint").append('<option value="' + items[i].Sprint + '">' + items[i].Sprint + '</option>');
                    	}
                    	
                        //Find Duplicate in Array
                        if (jQuery.inArray(items[i].Sprint, TempSprint) != '-1') {
                            //Do Nothing. Elements contains this already

                        }
                        else {
                            //Array creatin for GanttChart
                            arrDataBind = [];
                            firstRun = false;
                            var currentSprint = items[i].Sprint;
                            arrDataBind = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
                                return obj.Sprint == currentSprint;
                            });
                            for (var sprnt = 0; sprnt < arrDataBind.length; sprnt++) {
                            	modulePlannedStart = '';
                            	modulePlannedEnd = ''
                                if ((arrDataBind[sprnt].PlannedStartDate != null && arrDataBind[sprnt].PlannedStartDate != "") || (arrDataBind[sprnt].PlannedEndDate != null && arrDataBind[sprnt].PlannedEndDate != "")) {
                                    var fromDate = new Date(arrDataBind[sprnt].PlannedStartDate).setHours(0, 0, 0, 0);
                                    fromDate = new Date(fromDate);
                                    var endDate = new Date(arrDataBind[sprnt].PlannedEndDate).setHours(0, 0, 0, 0);
                                    endDate = new Date(endDate);
                                    firstRun = true;
                                    var customClass = '';
                                    
                                    if (arrDataBind[sprnt].Title.length > 20) {
                                        fullTitle = arrDataBind[sprnt].Title;
                                        arrDataBind[sprnt].Title = arrDataBind[sprnt].Title.substring(0, 20) + "...";
                                    }
                                    else {
                                        fullTitle = arrDataBind[sprnt].Title;
                                    }
                                    if (arrDataBind[sprnt].Status == "Active") {
                                        if (new Date(arrDataBind[sprnt].PlannedEndDate) > new Date($("#PlanedEndDate").text())) {
                                            customClass = 'ganttOrangeBorder';
                                        }
                                        else {
                                            customClass = 'ganttBlueBorder';
                                        }
                                        CustomTitle = arrDataBind[sprnt].Title;
                                    }
                                    else if (arrDataBind[sprnt].Status == "Completed") {
                                        customClass = 'ganttGreenBorder';
                                        CustomTitle = arrDataBind[sprnt].Title;
                                    }
                                    else if (arrDataBind[sprnt].Status == "Inactive") {
                                        customClass = 'ganttRedBorder';
                                        CustomTitle = arrDataBind[sprnt].Title + " (Inactive)";
                                        fullTitle = fullTitle + " (Inactive)";
                                    }
                                    else {
                                        customClass = 'ganttOrangeBorder';
                                        CustomTitle = arrDataBind[sprnt].Title + " (Hold)";
                                        fullTitle = fullTitle + " (Hold)";
                                    }
                                    var HTMLTilte = fullTitle;
		                            var completeTaskHTML = HTMLTilte + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrDataBind[sprnt].PlannedStartDate)) + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrDataBind[sprnt].PlannedEndDate)) + ";" + arrDataBind[sprnt].CompletionPercentage ;
                                    if (sprnt == RunCount && firstRun == true) {
                                        demoSource.push({
                                            name: arrDataBind[sprnt].Sprint,
                                            desc: arrDataBind[sprnt].Title,
                                            values: [{
                                                from: fromDate,
                                                to: endDate,
                                                label: CustomTitle,
                                                customClass: customClass,
                                                fullTitle: fullTitle,
                                                dataObj: [arrDataBind[sprnt].Id, parseInt(arrDataBind[sprnt].CompletionPercentage), arrDataBind[sprnt].Status, completeTaskHTML]
                                            }]
                                        });
                                    }
                                    else {
                                        demoSource.push({
                                            desc: arrDataBind[sprnt].Title,
                                            values: [{
                                                from: fromDate,
                                                to: endDate,
                                                label: CustomTitle,
                                                customClass: customClass,
                                                fullTitle: fullTitle,
                                                dataObj: [arrDataBind[sprnt].Id, parseInt(arrDataBind[sprnt].CompletionPercentage), arrDataBind[sprnt].Status, completeTaskHTML]
                                            }]
                                        });
                                    }
                                }
                                else {
                                    if (firstRun == false) {
                                        RunCount = sprnt + 1;
                                    }
                                }
                            }
                            TempSprint.push(currentSprint);
                        }
                    }

                    tr += '<tr class="text-left">';
                    tr += '<td><span>' + items[i].Title + '</span></td>';
                    tr += '<td><span>' + MStartDate + '</span></td>';
                    tr += '<td><span>' + MEndDate + '</span></td>';
                    if (items[i].weightage == null) {
                        tr += '<td class="text-center">1</td>';
                    }
                    else {
                        tr += '<td class="text-center">' + items[i].weightage + '</td>';
                    }
                    if (items[i].CompletionPercentage == null) {
                        tr += '<td class="text-center">0%</td>';
                    }
                    else {
                        var Percentage=String(items[i].CompletionPercentage).slice(0,5) 
                        tr += '<td class="text-center">' +Percentage+ '%</td>';
                    }

                    if (items[i].Status == "Active") {
                        tr += '<td class="text-center"><span class=" color-blue">' + items[i].Status + '</span></td>';
                    }
                    else if (items[i].Status == "Completed") {
                        tr += '<td class="text-center"><span class=" color-green">' + items[i].Status + '</span></td>';
                    }
                    else if (items[i].Status == "Hold") {
                        tr += '<td class="text-center"><span class=" color-orange">' + items[i].Status + '</span></td>';
                    }
                    else { //Inactive
                        tr += '<td class="text-center"><span class=" color-red2">' + items[i].Status + '</span></td>';
                    }
                    tr += '<td><div class="attendance-view-btn-box text-center">';
                    tr += '<a href="javascript:void(0);" onclick="BindProjectModule(' + items[i].Id + ');" class="custom-view-btn"><i class="fa fa-pencil"></i></a></div></td>';
                    tr += '<td class="text-center" style="display:none;"><span class="">' + items[i].Sprint + '</span></td>';
                    tr += '<td class="text-center" style="display:none;"><span class="">' + items[i].PlannedStartDate + '</span></td>';
                    tr += '</tr>';
                }
                
	            dvTable.append(tr);
	            TableModulePagination();
                //for empty Sprint
                arrDataBind = [];
                firstRun = false;
                var currentSprint = null;
                arrDataBind = items.filter(function (obj) { //Filter array on the basis of CurrentPhase
                    return obj.Sprint == currentSprint || obj.Sprint == "";
                });
                for (var sprnt = 0; sprnt < arrDataBind.length; sprnt++) {
                    if ((arrDataBind[sprnt].PlannedStartDate != null && arrDataBind[sprnt].PlannedStartDate != "") || (arrDataBind[sprnt].PlannedEndDate != null && arrDataBind[sprnt].PlannedEndDate != "")) {
                        var fromDate = new Date(arrDataBind[sprnt].PlannedStartDate).setHours(0, 0, 0, 0);
                        fromDate = new Date(fromDate);
                        var endDate = new Date(arrDataBind[sprnt].PlannedEndDate).setHours(0, 0, 0, 0);
                        endDate = new Date(endDate);
                        firstRun = true;
                        if (arrDataBind[sprnt].Title.length > 20) {
                            fullTitle = arrDataBind[sprnt].Title;
                            arrDataBind[sprnt].Title = arrDataBind[sprnt].Title.substring(0, 20) + "...";
                        }
                        else {
                            fullTitle = arrDataBind[sprnt].Title;
                        }
                        if (arrDataBind[sprnt].Status == "Active") {
                            if (new Date(arrDataBind[sprnt].PlannedEndDate) > new Date($("#PlanedEndDate").text())) {
                                customClass = 'ganttBlueBorder';
                            }
                            else {
                                customClass = 'ganttBlueBorder';
                            }
                            CustomTitle = arrDataBind[sprnt].Title;
                        }
                        else if (arrDataBind[sprnt].Status == "Completed") {
                            customClass = 'ganttGreenBorder';
                            CustomTitle = arrDataBind[sprnt].Title;
                        }
                        else if (arrDataBind[sprnt].Status == "Inactive") {
                            customClass = 'ganttRedBorder';
                            CustomTitle = arrDataBind[sprnt].Title + " (Inactive)";
                            fullTitle = fullTitle + " (Inactive)";
                        }
                        else {
                            customClass = 'ganttOrangeBorder';
                            CustomTitle = arrDataBind[sprnt].Title + " (Hold)";
                            fullTitle = fullTitle + " (Hold)";
                        }
                        var HTMLTilte = fullTitle;
                        var completeTaskHTML = HTMLTilte + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrDataBind[sprnt].PlannedStartDate)) + ";" + titanForWork.ShowCommonStandardDateFormat(new Date(arrDataBind[sprnt].PlannedEndDate)) + ";" + arrDataBind[sprnt].CompletionPercentage ;

                        if (sprnt == RunCount && firstRun == true) {
                            demoSource.push({
                                name: "Undefined",
                                desc: arrDataBind[sprnt].Title,
                                values: [{
                                    from: fromDate,
                                    to: endDate,
                                    label: CustomTitle,
                                    customClass: customClass,
                                    dataObj: [arrDataBind[sprnt].Id, parseInt(arrDataBind[sprnt].CompletionPercentage), arrDataBind[sprnt].Status, completeTaskHTML]
                                }]
                            });
                        }
                        else {
                            demoSource.push({
                                desc: arrDataBind[sprnt].Title,
                                values: [{
                                    from: fromDate,
                                    to: endDate,
                                    label: CustomTitle,
                                    customClass: customClass,
                                    fullTitle: fullTitle,
                                    dataObj: [arrDataBind[sprnt].Id, parseInt(arrDataBind[sprnt].CompletionPercentage), arrDataBind[sprnt].Status, completeTaskHTML]
                                }]
                            });
                        }
                    }
                    else {
                        if (firstRun == false) {
                            RunCount = sprnt + 1;
                        }
                    }
                }

            }
            else {
                tr += '<tr>';
                tr += '<td colspan="8" style="text-align: center;">No modules are found...!</td>';
                tr += '</tr>';
                dvTable.append(tr);
            }
            
            CompletionPercent = (SumweightageCompl / weightageSum);
            UpdatePercentage = CompletionPercent;
            displayCompletionChart(CompletionPercent);
            $("#txtSprint").editableSelect();
            $("#EditTxtSprint").editableSelect();
            SortModuleTable();
            //BindProjectsForProjectsDashboard();
        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }

    });
}

//method for pagination of tblModules
function TableModulePagination() {
    ModuleTable = $('#tblModules').DataTable({
    	'columnDefs': [{ 'orderable': false, 'targets': 5 }], // hide sort icon on header of first column
        "bPaginate": true,
        "bJQueryUI": true, // ThemeRoller-stöd
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bProcessing": true,
        "iDisplayLength": 10,
        "dom": 'Rlfrtip',
        "colReorder": {
            'allowReorder': true
        },
        "language": {
            "searchPlaceholder": "Type to find....",
            "sSearch": ""
        }
    });
    $("#tblModules_filter").hide();
    $('#SearchModule').keyup(function () {
        ModuleTable.search($(this).val()).draw();
    });
}


//get module when user want to update
function BindProjectModule(ItemId) {
    var listName = 'ProjectModules';
    siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=*&$Filter=Id eq '" + ItemId + "'";
    $.ajax({
        url: siteURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            $('#edit-module-modal').modal('show');
            var items = data.d.results;
            if (items.length > 0) {
                $('#updateModuleName').val(items[0].Title)
                var description = $(items[0].Description).text();
                $('#updadteDescription').val(description)
                $('#updateStatus').val(items[0].Status);
                if (items[0].weightage == null) {
                    $("#EditProjectWeightage").val(1);
                }
                else {
                    $("#EditProjectWeightage").val(items[0].weightage);
                }
                if (items[0].CompletionPercentage == null) {
                    $("#txtCompletionEdit").val('');
                }
                else {
                    $("#txtCompletionEdit").val(String(items[0].CompletionPercentage).slice(0,5));
                }
                $("#EditProgress_Status").val(items[0].ProgressStatus);
                if(items[0].ProgressStatus == "Task Driven") {
                	$("#txtCompletionEdit").attr("disabled", "disabled");
                }
                $("#EditTxtSprint").val(items[0].Sprint);
                var EditFromDate = items[0].PlannedStartDate;
                if (EditFromDate != null && EditFromDate != "") {
                    EditFromDate = new Date(items[0].PlannedStartDate);
                    EditFromDate = $.datepicker.formatDate('MM dd, yy', EditFromDate);//lakhan
                    $("#EditFromDate").val(EditFromDate);
                }
                else {
                    $("#EditFromDate").val('');
                }
                var EditToDate = items[0].PlannedEndDate;
                if (EditToDate != null && EditToDate != "") {
                    EditToDate = new Date(items[0].PlannedEndDate);
                    EditToDate = $.datepicker.formatDate('MM dd, yy', EditToDate);//lakhan
                    $("#EditToDate").val(EditToDate);
                }
                else {
                    $("#EditToDate").val('');
                }

                EditId = ItemId;
                DisbledControls();
            }
        },
        error: function (data) {
            alert($('#txtSomethingWentWrong').val());
        }
    });
}
//to show completion chart
function displayCompletionChart(Value) {
    $("#CompletionPercent").html('');
    $("#CompletionPercent").append('<p id="percent" style="display:none;"></p>');
    if (isNaN(Value)) {
        Value = 0;
    }
    Value = Value + "%";
    $("#percent").text(Value);
    $("#CompletionPercent").percentageLoader({
        strokeWidth: 17,
        bgColor: '#d9d9d9',
        ringColor: '#338AFF',
        textColor: '#9a9a9a',
        valElement: 'p',
        fontSize: '20px',
        fontWeight: 'normal'
    });
    $("tspan").attr("dy", "5");
    $("svg").attr("viewBox", "0 0 200 200");
}

//Disable controls if user is not project admin/owner
function DisbledControls() {
    if (CanAddModule == false) {
        $("#updateModuleName").attr("disabled", "disabled");
        $("#updadteDescription").attr("disabled", "disabled");
        $("#EditProjectWeightage").attr("disabled", "disabled");
        $("#txtCompletionEdit").attr("disabled", "disabled");
        $("#updateStatus").attr("disabled", "disabled");
        $("#EditFromDate").attr("disabled", "disabled");
        $("#EditToDate").attr("disabled", "disabled");
        $("#EditTxtSprint").attr("disabled", "disabled");
        $("#btnupdateModule").remove();
    }
}

//Ganntt Chart code
function CreateGanttModule() {
    var ExtraGantDataCount = 0;
    if (demoSource.length < 10) {
        ExtraGantDataCount = 10 - demoSource.length;
        for (i = 0; i < ExtraGantDataCount;i++){
            demoSource.push(ProjectDemoSource[0]);
        }
    }
    "use strict";
    // shifts dates closer to Date.now()
    /*var offset = new Date().setHours(0, 0, 0, 0) -
	    new Date(demoSource[0].values[0].from).setDate(35);*/
	var offset = new Date().setHours(0, 0, 0, 0) -
	    new Date(tempDate).setDate(35);    
	if(new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1].indexOf('India Standard Time') != -1) {
	    for (var i = 0, len = demoSource.length, value; i < len; i++) {
	        value = demoSource[i].values[0];
	        value.from += offset;
	        value.to += offset;
	    }
	}

    $("#gantt").gantt({
        source: demoSource,
        navigate: "scroll",
        scale: "months",
        maxScale: "months",
        minScale: "hours",
        itemsPerPage: 10,
        scrollToToday: false,
        useCookie: true,
        onItemClick: function (data) {
            if (data[0] != '') {
                BindProjectModule(data[0]);
            }
        }
    });

    $("#gantt").popover({
        selector: ".bar",
        title: function _getItemText(value) {
			var tempVar = this.id.split(';');
        	tempVar = 'Module Name: '+tempVar[0];
            return tempVar            
        },
        container: '#gantt',
        content: function _getItemText(value) {
        	var tempVar = this.id.split(';');
        	var completeTaskHTML = '';
        	if(tempVar[3] == "null" || tempVar[3] == null) {
        		tempVar[3] = '0';
        	}
            completeTaskHTML = 'Start Date: '+tempVar[1] +'\n; End Date: '+tempVar[2]+'; Completion: ' + tempVar[3] + ' %';
            return completeTaskHTML;   
		},
        trigger: "hover",
        placement: "auto right"
    });
}

//to sort table as per the selected option
function SortModuleTable(Name) {
    $(".clickModuleSort").click(function () {
    	$(".sortModule").trigger('click');
    });
	$(".clickPhaseSort").click(function () {
    	$(".sortModPhase").trigger('click');
    });
	$(".clickStartSort").click(function () {
    	$(".sortModStart").trigger('click');
    });
	$(".clickStatusSort").click(function () {
    	$(".sortModStatus").trigger('click');
    });
	$(".clickCompSort").click(function () {
    	$(".sortModComp").trigger('click');
    });
	$(".clickWgtSort").click(function () {
    	$(".sortModWgt").trigger('click');
    });
}
