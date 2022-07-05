//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS
var sorterApprovalInbox;
var ApprovalInbox = function () {
    this.Mode;					// Add, Update, View
    this.SiteURL;
    this.CompanyId;
    this.TaskPhase;
    this.SuggestionTitle = $("#suggestionTitle");
    this.SuggestionType = $("#suggestionType");
    this.SuggestionCategory = $("#suggestionCategory");
    this.SuggestionDetails = $("#suggestionDetails");
    this.ApprovalAction = $("#txtApprovalAction");
    this.Remarks = $("#txtRemarks");
    this.ActionSubmit = $("#btnAction");
    this.ActionCancel = $("#EventCancel");
    this.ModalPopupApproval = $("#modalApproval");
    this.AllApprovalInboxTasks = $(".mainDivApprovalInbox"); //$("#mainDivApprovalInbox");
    this.NoRecordFound = $(".NoRecordFound");
    this.columns = $("#columnsApprovalInbox");
    this.currentpage = $("#currentpageApprovalInbox");
    this.totalpages = $("#totalpagesApprovalInbox");
    this.startrecord = $("#startrecordApprovalInbox");
    this.endrecord = $("#endrecordApprovalInbox");
    this.totalrecords = $("#totalrecordsApprovalInbox");
    this.selectedrow = $("#selectedrowApprovalInbox");
    this.pagedropdown = $("#pagedropdownApprovalInbox");
    this.tablenav = $("#tablenavApprovalInbox");
};

var existStatus = '';
var Process = '';

ApprovalInbox.prototype.InitializeControls = function InitializeControls() {
    var Handler = this;
    Handler.CompanyId = Logged_CompanyId;		// Get Company ID from QueryString
    Handler.SiteURL = titanForWork.getQueryStringParameter('CompanySiteUrl');   // Get Company Site URL
}

ApprovalInbox.prototype.SetControls = function SetControls() {
    var Handler = this;
    Handler.TaskPhase = "Initiated";		// Default Filter Value	
}

ApprovalInbox.prototype.BindEvents = function BindEvents() {
    var Handler = this;
}

var itemsarray = '';
var NextURLApprovalIn = '';
ApprovalInbox.prototype.GetApprovalInboxTasks = function GetApprovalInboxTasks(Action) {
    $("#SeeMoreFilterApprovalIn").hide();
    var dateFilter = new Date();
    dateFilter = dateFilter.setFullYear(dateFilter.getFullYear() - 1);
    dateFilter = new Date(dateFilter);
    var Handler = this;
    if (Action == "PageLoad") {
        var restQuery;
        $("#mainDivAreaApprovalInbox").empty();
        var Type = "";
        if (Handler.TaskPhase == "All") {
            var Query = "?$select=ID,Title,Status,WebpartName,ApprovedDate,Remarks,ItemId,DepartmentId/ID,Details,DepartmentId/DepartmentName,ApprovedBy/Title,Author/Title,*&$Expand=ApprovedBy,Author,DepartmentId&$Filter=ApproversId eq '" + _spPageContextInfo.userId + "' and Created ge datetime'" + dateFilter.toISOString() + "'&$OrderBy= Modified desc";
        }
        else {
            var Query = "?$select=ID,Title,Status,WebpartName,ApprovedDate,Remarks,ItemId,DepartmentId/ID,Details,DepartmentId/DepartmentName,ApprovedBy/Title,Author/Title,*&$Expand=ApprovedBy,Author,DepartmentId&$Filter=ApproversId eq '" + _spPageContextInfo.userId + "' and Status eq  '" + Handler.TaskPhase + "' and Created ge datetime'" + dateFilter.toISOString() + "' &$OrderBy=Modified desc";
        }
    }
    else {
        if (NextURLApprovalIn != null) {
            var Query = "?" + NextURLApprovalIn.split('?')[1];
        }
        else {
            $("#SeeMoreApprovalIn").hide();
            return;
        }
    }
    $.when(getItemsWithQueryItem('ApprovalTaskList', Query, "ApprovalIn")).done(function (TaskResults) {
        var ApprovalinboxChip = '';
        ApprovalinboxChip += "<div class='upload-chip'>" + Handler.TaskPhase + "</div>";
        $("#ApprovalinboxChip").empty();
        $("#ApprovalinboxChip").append(ApprovalinboxChip);
        if (NextURLApprovalIn == null) {
            $("#SeeMoreApprovalIn").hide();
        }
        var items = TaskResults.results;

        itemsarray = items;
        var tableItemsHTML = "";
        for (var i = 0; i < items.length; i++) {
            var itemId = items[i].ID;
            var Title = items[i].Title;
            var TaskAssignFrom = items[i].Author.Title;
            //TaskAssignFrom=getUserName(TaskAssignFrom);			// Need to change this piece of code.
            var CurrentPhase = items[i].Status;
            var ProcessType = items[i].WebpartName;
            var ProcessTypeCategory = items[i].Category;
            var DepartmentName = items[i].DepartmentId.DepartmentName == undefined ? '' : items[i].DepartmentId.DepartmentName;
            var approvedDate = items[i].ApprovedDate;
            var approvedBy = items[i].ApprovedBy.Title;
            var remarks = items[i].Remarks;
            var webpartname = items[i].WebpartName;
            if(webpartname == "Banners"){
            	webpartname = "Information"
            }
            var details = items[i].Details;
            var ListItemId = items[i].ItemId;
            var DepartmentId = items[i].DepartmentId.ID;
            if (remarks == null) { remarks = ''; }
            if (approvedDate == null) { approvedDate = ''; }
            else {
                approvedDate = new Date(approvedDate);
                approvedDate = titanForWork.ShowCommonStandardDateFormat(approvedDate);//.toLocaleDateString();
            }

            if (approvedBy == null) { approvedBy = ''; }
            if (ProcessTypeCategory == null) { ProcessTypeCategory = webpartname; }
            var ItemDtlList = [];
            ItemDtlList.push(itemId, Title, remarks, ListItemId, CurrentPhase, DepartmentId, ProcessType);


            var Action = "";
            Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='projectGridInboxTaskEvent1444' style='cursor:pointer' onclick='getActionbtnValuesInbox(\"" + itemId + "\")'>Action</a>";
            //tableItemsHTML += "<tr><td>" + truncate(Title, 55) + "</td><td>" + TaskAssignFrom + "</td><td>" + CurrentPhase + "</td><td>" + webpartname + "</td><td>" + ProcessTypeCategory + "</td><td>" + approvedDate + "</td><td>" + approvedBy + "</td><td>" + truncate(remarks, 100) + "</td>";
            //tableItemsHTML += "<td>" + Action + "</td></tr>";
            tableItemsHTML += "<tr>" +
            "<td><p class='m-0 ellipsis-2'>" + truncate(Title, 55) + "</p></td>" +
            "<td class='text-center'><div class=''><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p></div></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + CurrentPhase + "</p></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + webpartname + "</p></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + ProcessTypeCategory + "</p></td>" +
            "<td class='text-center'><p class='m-0 mb-10'>" + approvedDate + "</p></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + approvedBy + "</p></td>" +
            "<td class='text-center vertical-align-middle'><button type='button' class='btn custom-btn custom-btn-two'  onclick='getActionbtnValuesInbox(\"" + itemId + "\")'>Action</button></td>" +
            "</tr>";
        }

        if (items.length == 0) {
            $('#NoRecordFoundApprovalInbox').show();
        }
        else {
            $('#NoRecordFoundApprovalInbox').hide();
        }

        // $(".TaskOutBoxTable").append(tableOutboxHtml);
        $("#mainDivAreaApprovalInbox").append(tableItemsHTML);
        //Showing data out of total
        if ($('#tableTempApprovalInbox>tbody tr').length > 100 && NextURLApprovalIn != null) {
            $("#ShowTotalApprovalIn").hide();
            $("#ShowApprovalIn").show();
            $("#ApprovalInCount").text($('#tableTempApprovalInbox>tbody tr').length);
        }
        else {
            $("#ShowTotalApprovalIn").show();
            $("#ShowApprovalIn").hide();
            $("#TotalItemsApprovalIn").text(items.length);
        }
        if ($('#tableTempApprovalInbox>tbody tr').length == 5000) {
            NextURLApprovalIn = null;
            $("#SeeMoreApprovalIn").hide();
        }
        if (items.length > 0) {
            GenerateTableApprovalInbox()
        }
        //table.rows.add($(tableItemsHTML)).draw();
        //objApprovalInbox.ApprovalTaskInboxEvent();		// Bind Action Form events. //Commented by Amit kumar Not Usefull Function.   
        //objApprovalInbox.TableConfiguration();        // comment by harsh
    }).fail(function (error) {
            if(error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1){
                $("#ThresholdError").modal('show');
                $("#btnContinue").hide();
                $("#btnContinueOutBox").hide();
            }
            else {
                HandleError(error);
            }
        });
}

//New Get Action Value function  created by Rahul Rana 

function getActionbtnValuesInbox(ItemID) {

    existStatus = '';
    Process = '';
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTaskList')/items?$filter=ID eq ('" + ItemID + "')";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            var items = data.d.results;
            if (items.length > 0) {
                var ItemID = items[0].ID;
                var title = items[0].Title;
                var ListItemId = items[0].ItemId;
                var Remarks = items[0].Remarks;
                var DepartmentId = items[0].DepartmentIdId;
                var ProcessType = items[0].WebpartName;
                var Category = items[0].Category;
                var detail = items[0].Details;
                var SatusId = items[0].Status;
                existStatus = SatusId;
                Process = ProcessType;
                $('#txtApprovalAction').val(SatusId);
                objApprovalInbox.ApprovedTask(ItemID, title, Category, ListItemId, DepartmentId, ProcessType, Remarks, SatusId, detail, items[0].CompanyId);

            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

/*
function getActionbtnValuesInbox(_ItemDtlList) {
 
	var Handler = this;
	  
	var ItemID = _ItemDtlList[0];
	var title = _ItemDtlList[1];
	var ListItemId = _ItemDtlList[3];
	var DepartmentId = _ItemDtlList[5];
	var ProcessType = _ItemDtlList[6];
	Remarks = _ItemDtlList[2];
	SatusId = _ItemDtlList[4];
	$('#txtApprovalAction').val(SatusId);
	objApprovalInbox.ApprovedTask(ItemID, title, ListItemId, DepartmentId, ProcessType, Remarks, SatusId);

}*/


// Commented by Amit kumar Not Usefull Function.
/*
ApprovalInbox.prototype.ApprovalTaskInboxEvent = function ApprovalTaskInboxEvent()
{
	var Handler=this;	
    $('.projectGridInboxTaskEvent_ghghjgj').unbind().click(function ()
    {
    	//Handler.Remarks.val('');
    	Handler.ApprovalAction.val(0);
    	Handler.ActionSubmit.attr('disabled',false);
    	
		var $row = jQuery(this).closest('tr');
		var $columns = $row.find('td');
		var ItemID="";
		
		var ListItemId="";
		var DepartmentId="";
		var ProcessType = "";
		
		ItemID = jQuery(this).closest('tr').find('.cssItemID').val();
		var  title = jQuery(this).closest('tr').find('.cssTitle').text();
		var  details = jQuery(this).closest('tr').find('.cssdetails').html();//text();
		ListItemId = jQuery(this).closest('tr').find('.cssListItemId').val();
		DepartmentId = jQuery(this).closest('tr').find('.cssDepartmentId').val();
		SatusId= jQuery(this).closest('tr').find('.cssStausId').val();
		Remarks = jQuery(this).closest('tr').find('.cssRemarks').text();
		ProcessType = jQuery(this).closest('tr').find('.cssProcessType').val();
		
		//objApprovalInbox.ApprovedTask(ItemID, title, details, ListItemId, DepartmentId, $.trim(ProcessType),Remarks,SatusId);
    });
}
*/
var globalEventId = "";
var webUrlDeptSite = '';
ApprovalInbox.prototype.ApprovedTask = function ApprovedTask(ItemID, title, Category, ListItemId, DepartmentId, ProcessType, Remarks, SatusId, detail, CompanyId) {
	
    var Handler = this;
    Handler.ModalPopupApproval.modal('show');
    Handler.SuggestionDetails.html('');
    globalEventId = ListItemId;
    if (ProcessType == "Events") {
        //Handler.SuggestionDetails.append( <a class="projectGridInboxTaskEvent1444" style="cursor:pointer" onclick=" ">Action</a> );//text(details);
        if (SatusId == "Approved") {
            $('#show').show();
            $('#suggestionDetails').hide();
            $('#EventCancel').show();
        }
        else {
            $('#show').show();
            $('#suggestionDetails').hide();
            $('#EventCancel').hide();

        }
    }
    else {
        $('#suggestionDetails').show();
        $('#show').hide();
        $('#EventCancel').hide();
        if (ProcessType == "Departmental Documents") {
            //var link=  $(detail).closest('a').attr('href');
            var html = $.parseHTML(detail);
            var nodeNames = [];
            $.each(html, function (i, el) {
                if (el.nodeName == "A") {
                    link = el.attributes.href.value;
                }
            });
            webUrlDeptSite = getDeptSiteURL(CompanyId, DepartmentId);
            Handler.SuggestionDetails.append('<a class="btn custom-btn w-70" href=' + link + ' target="_blank">Details</a>');//text(details);
        }
        else {
            //   Handler.SuggestionDetails.append('<a class="btn custom-btn w-70" href=' + PageNameByProcessType(ListItemId, ProcessType) + ' target="_blank">Details</a>');//text(details);''
            Handler.SuggestionDetails.append('<a class="btn custom-btn w-70" target="" data-toggle="modal" data-target="#modalDetails" id="btnDetails" onclick="ViewApprovalDetails(\'' + ListItemId + '\', \'' + ProcessType + '\')">Details</a>');   //text(details);
        }
    }
    Handler.SuggestionTitle.text(title);
    if(ProcessType == "Banners"){
        ProcessType = "Information";
    }
    Handler.SuggestionType.text(ProcessType);
    Handler.SuggestionCategory.text(Category);
    Handler.Remarks.text(Remarks);
    /*	if (SatusId != "Initiated") {            // commneted by harsh
            Han`dler.Remarks.val(Remarks);
            $("#btnAction").show();
            $("#txtApprovalAction").attr("disabled", false);
            $("#txtRemarks").attr("disabled", false);
        }
        else {
            Handler.Remarks.val('');
            $("#btnAction").show();
            $("#txtApprovalAction").attr("disabled", false);
            $("#txtRemarks").attr("disabled", false);
        }   */

    if (SatusId != existStatus) {
        Handler.Remarks.val(Remarks);
        $("#btnAction").show();
        $("#txtApprovalAction").attr("disabled", false);
        $("#txtRemarks").attr("disabled", false);
    }

    else {
        Handler.Remarks.val('');
        $("#btnAction").hide();
        $("#txtApprovalAction").attr("disabled", false);
        $("#txtRemarks").attr("disabled", false);
        $(".action").hide()
    }
    //For Cancel an Approved Event Added By Rahul Rana
    Handler.ActionCancel.unbind().click(function () {
        var ActionTaken = "Cancelled";
        objApprovalInbox.updateApprovalDetails("ApprovalTaskList", ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType);
        Handler.ModalPopupApproval.modal('hide');
        objApprovalInbox.GetApprovalInboxTasks("PageLoad");


    });



    Handler.ActionSubmit.unbind().click(function () {

        var ActionTaken = $("#txtApprovalAction option:selected").text();
        var Remarks = Handler.Remarks.val();
        if (ActionTaken != '' && Remarks.trim() != '') {
            if (ActionTaken == "Rejected" || ActionTaken == "Approved") {
                if (Remarks.trim() == "") {
                    alert('Kindly enter remarks.');
                    return false;
                }
                else {
                    objApprovalInbox.updateApprovalDetails("ApprovalTaskList", ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType);
                    Handler.ModalPopupApproval.modal('hide');
                    objApprovalInbox.GetApprovalInboxTasks("PageLoad");
                    //update the file's Status in Department site in case of Departmental Documents only
                    if (webUrlDeptSite != "" && $("#suggestionType").text() == "Departmental Documents") {
                        UpdateFileStatus(ListItemId);
                    }
                    else if($("#suggestionType").text() == "Announcements" || $("#suggestionType").text() == "General" || $("#suggestionType").text() == "Recognition" || $("#suggestionType").text() == "Information") {
                    	updateAnnouncementsStatus(ListItemId, $("#suggestionType").text());
                    }
                }
            }
            else {
                objApprovalInbox.updateApprovalDetails("ApprovalTaskList", ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType);
                Handler.ModalPopupApproval.modal('hide');
                objApprovalInbox.GetApprovalInboxTasks("PageLoad");
            }
        }
        else {
            alert("Kindly enter remarks.")
        }
    });
}

//Update file status in Department site
function UpdateFileStatus(ID) {
	var Metadata;
	var ItemType = GetItemTypeForListNameLibrary('DepartmentalDMS');

	Metadata = {
	    __metadata: {
	        'type': ItemType
	    },
	    ApprovalStatus: $("#txtApprovalAction").val()
	};
	var dfd = $.Deferred();
	var oweburl = webUrlDeptSite + "/_api/Web/Lists/getByTitle('DepartmentalDMS')/Items(" + ID + ")";
    $.ajax({
        url: oweburl,
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
        success: function (RESULT) {
            webUrlDeptSite = '';
            dfd.resolve(true);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
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
            dfds.reject(error);
            console.log(error);
        }
    })
    return dfds.promise();
}
//Update Approved_by and Approved_Date in Announcements list
function updateAnnouncementsStatus(updateId, Type){
	var updatePublishDate = false;
	//get publish Date if the Publish Date is less than current date
	var dfds = $.Deferred(),
		currentDate = new Date(),
		currentDate = currentDate.setHours(0,0,0,0);
    	currentDate = new Date(currentDate);
	var Query = "?$top=5000&$select=ID,Publish_Date&$filter=ID eq " + updateId + " and Publish_Date lt '" + currentDate.toISOString() + "' ";
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items/" + Query;
    $.when(getItems(url, dfds)).done(function (Results) {
        response = [];
        if (Results.length > 0) {
        	updatePublishDate = true;
        }
    });
	var Metadata;
	var ItemType = GetItemTypeForList('Announcements');

	Metadata = {
	    __metadata: {
	        'type': ItemType
	    },
	    ApprovedById: _spPageContextInfo.userId,
	    ApprovedDate: new Date(),
	    Publish_Date: new Date()
	};
	if(updatePublishDate == false){
		delete Metadata["Publish_Date"];
	}
	var dfd = $.Deferred();
    var webURI = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/GetItemById('" + updateId+ "')";
    $.ajax({
        url: webURI,
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

function GetItemTypeForListNameLibrary(Library) {
    return "SP.Data." + Library.charAt(0).toUpperCase() + Library.split(" ").join("").slice(1) + "Item";//"SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

ApprovalInbox.prototype.updateApprovalDetails = function updateApprovalDetails(ListName, ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType) {
    try {
        var currentUserID = _spPageContextInfo.userId;
        var currentDate = new Date();
        var Metadata;
        var ItemType = GetItemTypeForList(ListName);
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Remarks: Remarks,
            Status: ActionTaken,
            ApprovedById: currentUserID,
            ApprovedDate: currentDate
        };
        objApprovalInbox.UpdateApprovalToList(ListName, Metadata, ItemID, ListItemId, DepartmentId, ActionTaken, ProcessType);
    }
    catch (error) {
        console.log(error.message);
    }
}

//get Department site URL to update Status
function getDeptSiteURL(Company, Department){
	var WebURL = '';
	var Query = "?$select=ID,MassMailID,CompanyIDId/ID,SiteURL&$top=5000&$filter=ID eq '" + Department + "' and CompanyIDId eq '" + Company + "'"
	$.when(getItemsWithQueryItem('Departments', Query, "")).done(function (TaskResults) {    	
	 	WebURL  = TaskResults.results[0].SiteURL;
    });
    return WebURL ;
}



ApprovalInbox.prototype.UpdateApprovalToList = function UpdateApprovalToList(ListName, Metadata, ItemID, ListItemId, DepartmentId, ActionTaken, ProcessType) {
    var dfd = $.Deferred();
    var webURI = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + ItemID + "')"; //_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items?$select=ID,DepartmentId/ID&$expand=DepartmentId&$filter=DepartmentId/ID eq "+ItemID+"";
    $.ajax({
        url: webURI,
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

            if (ProcessType == "Announcements" || ProcessType == "Banners" || ProcessType == "Information" || ProcessType == "General" || ProcessType == "Recognition" || ProcessType == "Events" || ProcessType == "Idea Bank" || ProcessType == "Polls") {
                objApprovalInbox.UpdateCompanyMainList(ListItemId, DepartmentId, ActionTaken, ProcessType);
            }
                //else if (ProcessType == "Banners") 
                //{
                //	UpdateApprovalStatus(ListItemId, ActionTaken, ProcessType);
                //}
            else if (ProcessType == "New Initiative" || ProcessType == "Activity" || ProcessType == "Suggestion" || ProcessType == "Suggesion") {
                var Siteurl = titanForWork.getQueryStringParameter("CompanySiteUrl");
                var listName = "Activity";
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'ApprovalStatus': ActionTaken, 'ApprovarName': _spPageContextInfo.userDisplayName };
                UniversalUpdate(Siteurl, listName, item, ListItemId);
            }
            else if (ProcessType == "QuestionAnswer") {
                var Siteurl = _spPageContextInfo.webAbsoluteUrl;
                var listName = "Questions_Master";
                var item = { '__metadata': { type: 'SP.Data.Questions_x005f_MasterListItem' }, 'ApprovalStatus': ActionTaken, 'ApprovedById': _spPageContextInfo.userId };
                UniversalUpdate(Siteurl, listName, item, ListItemId);
            }

            else {
                objApprovalInbox.UpdateDepartmentalMainList(ListItemId, DepartmentId, ActionTaken, ProcessType);
            }
        },
        error: function (error) {

            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//////// For Company Level Approvals
ApprovalInbox.prototype.UpdateCompanyMainList = function UpdateCompanyMainList(ListItemId, DepartmentId, ActionTaken, ProcessType) {
    //objApprovalInbox.updateMainList(ListItemId, siteURL, ActionTaken, ProcessType);
    objApprovalInbox.updateMainList(ListItemId, ActionTaken, ProcessType);
}

//////// For Departmental Level Approvals
ApprovalInbox.prototype.UpdateDepartmentalMainList = function UpdateDepartmentalMainList(ListItemId, DepartmentId, ActionTaken, ProcessType) {
    var listName = 'Departments';
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,SiteURL&$filter=ID eq '" + DepartmentId + "'";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                var siteURL = items[0].SiteURL;
                objApprovalInbox.updateMainList(ListItemId, siteURL, ActionTaken, ProcessType);
            }

        },
        error: function (data) {
            console.log(data);
        }
    });
}


//ApprovalInbox.prototype.updateMainList = function updateMainList(ListItemId, siteURL, ActionTaken, ProcessType) {
ApprovalInbox.prototype.updateMainList = function updateMainList(ListItemId, ActionTaken, ProcessType) {
    var Handler = this;
    try {
        var currentUserID = _spPageContextInfo.userId;
        var currentDate = new Date();
        var activeStatus = '';
        var contentListName = '';
        var ItemType;
        if (ActionTaken == "Approved") {
            activeStatus = true;
        }
        else {
            activeStatus = false;
        }
        if (ProcessType == "Discussion") {
            contentListName = "Discussions";
        }
        else if (ProcessType == "Suggestion") {
            contentListName = "Activity";
            siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
        }
        else if (ProcessType == "Activity") {
            contentListName = "Activity";
            siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
        }
        else if (ProcessType == "New Initiative") {
            contentListName = "Activity";
            siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");
        }
        else if (ProcessType == "Banners" || ProcessType == "Information") {
            contentListName = "Announcements";
            siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");		// Announcemnets List exists on Company Level
        }
        else if (ProcessType == "Announcements") {
            contentListName = "Announcements";
            siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");		// Announcemnets List exists on Company Level
        }
        else if (ProcessType == "General") {
            contentListName = "Announcements";
            siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");		// Announcemnets List exists on Company Level
        }
        else if (ProcessType == "Recognition") {
            contentListName = "Announcements";
            siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");		// Announcemnets List exists on Company Level
        }
        else if (ProcessType == "Polls") {
            contentListName = "MainPollsList";
            //siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");		// MainPollsList List exists on Company Level
            siteURL = _spPageContextInfo.webAbsoluteUrl;
        }

        else if (ProcessType == "Idea Bank") {
            contentListName = "IdeaBank";
            siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");		// Events List exists on Company Level
        }
        else if (ProcessType == "Events") {
            contentListName = "Event";
            siteURL = titanForWork.getQueryStringParameter("CompanySiteUrl");		// Events List exists on Company Level
        }
        else if (ProcessType == "Departmental Events")				// Events List exists on Departmental Level
        {
            contentListName = "Events";
        }
        ItemType = GetItemTypeForList(contentListName);
        if (ProcessType == "Departmental Documents") {
            contentListName = "DepartmentalDMS";
            ItemType = "SP.Data." + contentListName.charAt(0).toUpperCase() + contentListName.split(" ").join("").slice(1) + "Item";
        }
        var Metadata;
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Active: activeStatus,
            ApprovalStatus: ActionTaken,
            ApprovedById: currentUserID,
            ApprovedDate: currentDate
        };
        if (ProcessType == "Polls") {
            if (ActionTaken == "Approved") {
                ActionTaken = "Active";
            }
            Metadata = '';
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                //Active: activeStatus,
                Status: ActionTaken,
                //ApprovedById: currentUserID,
                //ApprovedDate: currentDate
            };
        }
        if (ProcessType == "Discussion" || ProcessType == "Suggestion")		// For Discussions and Suggestions, Active Column is used but for All Others Lists and Libraries, ApprovalStatus column will be used.
        {
            delete Metadata["ApprovalStatus"];
        }
        else {
            delete Metadata["Active"];
        }
        if (ProcessType == "Idea Bank") {
            Metadata.ApproverComments = Handler.Remarks.val();
        }
        objApprovalInbox.UpdateMainListItem(contentListName, Metadata, ListItemId, siteURL);

    }
    catch (error) {
        console.log(error.message);
    }
}

ApprovalInbox.prototype.UpdateMainListItem = function UpdateMainListItem(contentListName, Metadata, ListItemId, siteURL) {
    var Handler = this;
    if (contentListName == "Announcements") {
        var webURI = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + contentListName + "')/GetItemById('" + ListItemId + "')";
    }
    else {
        var webURI = siteURL + "/_api/web/lists/getbytitle('" + contentListName + "')/GetItemById('" + ListItemId + "')";
    }
    if (contentListName == "BannerImages") { alert("Process identify"); }
    var dfd = $.Deferred();
    $.ajax({
        url: webURI,
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
            //getDepartmentURL(ListItemId,DepartmentId,ActionTaken);
            alert("Action taken successfully.");
            Handler.ModalPopupApproval.modal('hide');
            objApprovalInbox.GetApprovalInboxTasks("PageLoad");		// Get Announcements
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

ApprovalInbox.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

$(document).ready(function () {
	GetApprovalInboxCount();
    objApprovalInbox = new ApprovalInbox();
    objApprovalInbox.InitializeControls();
    objApprovalInbox.SetControls();
    objApprovalInbox.GetApprovalInboxTasks("PageLoad");

    $("#txtApprovalAction").change(function () {
        var Action = $("#txtApprovalAction option:selected").text();

        if (Action == existStatus) {

            $('#lblRemarks').removeClass('required')
            $('.action').hide()
            $('#btnAction').addClass('hide')

        }
        else {
            $('.action').show()
            $('#btnAction').removeClass('hide')
            $('#EventCancel').hide();
        }
    });
    $("#SeeMoreApprovalIn").click(function () {
        var lastPage = $("#ddlApprovalIn").val();
        objApprovalInbox.GetApprovalInboxTasks("");
        $("#ddlApprovalIn").val(lastPage);
        $("#ddlApprovalIn").trigger("change");
    });
    $("#ApprovalPendingTask").click(function () {
        objApprovalInbox.GetApprovalInboxTasks("PageLoad");
    });

    $("#SeeMoreFilterApprovalIn").click(function () {
        var lastPage = $("#ddlApprovalIn").val();
        if (NextURLApprovalIn != null) {
            var Query = "?" + NextURLApprovalIn.split('?')[1];
        }
        FilterApprovalData(Query, "");
        $("#ddlApprovalIn").val(lastPage);
        $("#ddlApprovalIn").trigger("change");
    });
});

function ViewApprovalDetails(ListItemId, ProcessType) {
    var Url = PageNameByProcessType(ListItemId, ProcessType);
    $('#siteViewmodal').attr('src', Url);
    setInterval(function () {
        $('#siteViewmodal').contents().find('html').css({ "overflow-y": "unset" });
        $('#siteViewmodal').contents().find('body').css({ "overflow-y": "scroll" });
    }, 1000);
}

function truncate(source, size) {
    if (source != null) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
}

function UpdateApprovalStatus(ListItemId, ActionTaken, ProcessType) {
    var documentLibraryName = "BannerImages";
    var _url = titanForWork.getQueryStringParameter('CompanySiteUrl') + "/_api/Web/Lists/getByTitle('" + documentLibraryName + "')/Items(" + ListItemId + ")";
    $.ajax
		({
		    url: _url,
		    type: "POST",
		    async: false,
		    data: JSON.stringify
				({
				    __metadata:
					{
					    type: "SP.Data.BannerImagesItem"
					},
				    ApprovalStatus: ActionTaken
				}),
		    headers: {
		        "accept": "application/json;odata=verbose",
		        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
		        "content-Type": "application/json;odata=verbose",
		        "X-Http-Method": "PATCH",
		        "If-Match": '*'
		    },
		    success: function (data, status, xhr) { console.log("Approved Success!"); },
		    error: function (error) { console.log(error); }
		});
}



function PageNameByProcessType(ListItemId, _ProcessType) {
    var PageName;
    var event_pop;
    switch (_ProcessType) {
        case 'Alert': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + ListItemId + "&Mode=View&Type=Alert?MODAL"; break;
        case 'Announcements': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + ListItemId + "&Mode=View&Type=Announcement?MODAL"; break;
            //case 'Banners': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/AddSlider.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + ListItemId + "&Mode=View?MODAL"; break;
        case 'Banners': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/AddSlider.aspx?WebAppId=" + Logged_CompanyId + "&Rec=" + window.btoa(ListItemId) + "&Mode="+window.btoa('Edit')+"&sourcelocation=../Pages/TaskDashboard.aspx?MODAL"; break;
        case 'Department Banners': PageName = "Department Banners"; break;
        case 'Department MediaGallary': PageName = "Department MediaGallary"; break;
        case 'Departmental Events': PageName = "Departmental Events"; break;
        case 'DepartmentDocument_Access': PageName = "DepartmentDocument_Access"; break;
        case 'Discussion': PageName = "Discussion"; break;
        case 'Documents': PageName = "Documents"; break;
        case 'Emergency Annoucements': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + ListItemId + "&Mode=View&Type=Alert?MODAL"; break;

        //case 'General': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/BiographyWebpart.aspx?itemId=" + ListItemId + "&WebAppId=" + Logged_CompanyId + "&Mode=View?MODAL"; break;
        case 'General': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/ExperienceEntry.aspx?itemId=" + ListItemId + "&WebAppId=" + Logged_CompanyId + "&Rec=" + window.btoa(ListItemId) + "&Mode="+window.btoa('Edit')+"&sourcelocation=../Pages/TaskDashboard.aspx?MODAL"; break;
        case 'HR Admin': PageName = "HR Admin"; break;
        case 'Knowledge': PageName = "Knowledge"; break;
        case 'Media': PageName = "Media"; break;
        case 'Media Gallery': PageName = "Media Gallery"; break;
        case 'New Initiative': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + ListItemId + "&Mode=View&Type=Initiative&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
        case 'Occasion': PageName = "Occasion"; break;
        case 'Polls': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/AddPolls.aspx?WebAppId=" + Logged_CompanyId + "&PollId=" + window.btoa(ListItemId) + "&Mode=View&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
        case 'Project Admin': PageName = "Project Admin"; break;
        case 'QuestionAnswer': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/QuestionAnswer.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + ListItemId + "&Mode=View&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
        //case 'Recognition': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Empofthemonth.aspx?WebAppId=" + Logged_CompanyId + "&itemId=" + ListItemId + "&Mode=View&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
        case 'Recognition': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/RecognitionEntry.aspx?WebAppId=" + Logged_CompanyId + "&Rec=" + window.btoa(ListItemId) + "&Mode="+window.btoa('Edit')+"&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
        case 'Suggesion': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + ListItemId + "&Mode=View&Type=Suggestion&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
        case 'Activity': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + Logged_CompanyId + "&ItemId=" + ListItemId + "&Mode=View&Type=Activities&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
        case 'Tech Admin': PageName = "Tech Admin"; break;
        case 'Trello Board': PageName = "Trello Board";
    }
    return PageName;
}




//Add to event popup   

function EventPopup(globalEventId) {

    $('.addClickEditCompanyEvent').hide();
    $('.deleteClickEditCompanyEvent').hide();
    // globalEventId = ListItemId;

    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var listName = 'Event';
    var siteURL = companySiteUrlLink + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,Title,Location,EventDate,EndDate,Description,Category,Department,ChooseImage ,ImageURL,Author/ID,ApprovalStatus&$expand=Author&$filter=ID eq '" + globalEventId + "'&$expand=AttachmentFiles";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {


            $("#myViewEventModal").modal('show');
            var items = data.d.results;
            if (items.length > 0) {
                var title = items[0].Title;
                if (title == null) {
                    title = "";
                }
                $('#labelEventTitle').text(title);
                var txtLocation = items[0].Location;
                if (txtLocation == null) {
                    txtLocation = "";
                }
                $('#labelLocation').text(txtLocation);

                var txtEventDate = items[0].EventDate;
                if (txtEventDate != null) {
                    $('#labelStartDateTime').text(convertJSONDateAMPMWithDate(txtEventDate));
                }
                var txtEndDate = items[0].EndDate;
                if (txtEndDate != null) {
                    $('#labelEndDateTime').text(convertJSONDateAMPMWithDate(txtEndDate));
                }
                var txtDescription = items[0].Description;
                if (txtDescription == null) {
                    txtDescription = "";
                }
                if (txtDescription.match("https")) {
                    var strsplit = txtDescription.split("https");
                    var removespl = strsplit[1].slice(5);
                    var txtDescription = strsplit[0] + "https:" + removespl;
                    $('#lblNewEventDescription').text(txtDescription);
                }
                else {
                    $('#lblNewEventDescription').text(txtDescription);
                }
                var txtCategory = items[0].Category;
                if (txtCategory == null) {
                    txtCategory = "";
                }
                $('#labelNewEventCategory').text(txtCategory);
                var txtDepartment = items[0].Department;
                if (txtDepartment == null) {
                    txtDepartment = "";
                }
                $('#labelDepartment').text(txtDepartment);
                var ChooseImage = items[0].ChooseImage;
                $('#slctimage').text(txtDepartment);

                if (ChooseImage == "Upload") {
                    var Picture = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    var image = $('#labelImageURL');
                    if (txtImageURL == null) {
                        txtImageURL = "";
                    }
                    // $('#labelImageURL').text(txtImageURL);
                    image[0].src = Picture;
                }
                else {
                    var txtImageURL = items[0].ImageURL;
                    var image = $('#labelImageURL');

                    if (txtImageURL == null) {
                        txtImageURL = "";
                    }
                    // $('#labelImageURL').text(txtImageURL);
                    image[0].src = txtImageURL;
                }
                ApprovalStatus = items[0].ApprovalStatus;
                $('#labelStatus').text(ApprovalStatus);

            }
        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });

}
function convertJSONDateAMPMWithDate(jsonDateTime) {

    var date = new Date(jsonDateTime);
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear() + " " + strTime;
    // return monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + strTime;
}

function UniversalUpdate(Siteurl, listName, item, dataid) {
    $.ajax({
        url: Siteurl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + dataid + "')",
        type: "POST",
        async: false,
        data: JSON.stringify(item),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data, status, xhr) { alert("Action taken successfully."); },
        error: function (data) {
            alert("An error occurred. Please contact your system administrator / Refresh a WebPage !");
            console.log(data);
        }
    });
}



function GenerateTableApprovalInbox() {
    sorterApprovalInbox = new TINY.table.sorter('sorterApprovalInbox', 'tableTempApprovalInbox', {
        // headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columnsApprovalInbox',
        currentid: 'currentpageApprovalInbox',
        totalid: 'totalpagesApprovalInbox',
        startingrecid: 'startrecordApprovalInbox',
        endingrecid: 'endrecordApprovalInbox',
        totalrecid: 'totalrecordsApprovalInbox',
        //hoverid: 'selectedrowSharedWithMe',
        pageddid: 'pagedropdownApprovalInbox',
        navid: 'tablenavApprovalInbox',
        //sortcolumn: 1,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}

$(document).ready(function () {
    initializePeoplePicker("ApprovalInboxPeople");
    $("#WebpartApprovalInbox").change(function () {
        var webpartName = this.value;
        if (webpartName != "All") {
            catagoryBasedOnWebPartName(webpartName);
        }
        else {
            // $('#ProjectModule').attr('disabled', true);
            // $("#ProjectModule").empty();
            //   $('<option value="All">All</option>').appendTo("#ProjectModule");
        }
    });
});


function catagoryBasedOnWebPartName(webpartName) {
    //  $('#ProjectModule').attr('disabled', false);
    $("#categoryApprovalInbox").empty()
    //  var uniqueValues = [];
    //  var result;
    $('<option value="All">All</option>').appendTo("#categoryApprovalInbox");
    var listName = 'ProjectModules';
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$select=CategoryType,CatogeryName&$filter=CategoryType eq '" + webpartName + "'";
    $.ajax({
        url: siteURL,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var option = "";
            var valuesArray = data.d.results;

            $.each(valuesArray, function (i, el) {
                option += "<option value='" + el.CatogeryName + "'>" + el.CatogeryName + "</option>";
            });

            $("#categoryApprovalInbox").append(option);
        },
        error: function (data) {
            console.log(data.responseJSON.error);

        }

    });
}

function FilterApprovalInbox() {
    $("#SeeMoreApprovalIn").hide();
    $("#SeeMoreFilterApprovalIn").show();
    var restquery = "";
    var ApprovalinboxChip = "";

    if ($('#txtFilterApprovalStatusInbox').val() != "All") {
        restquery += "and Status eq '" + $('#txtFilterApprovalStatusInbox').val() + "' ";
        ApprovalinboxChip += "<div class='upload-chip'>" + $('#txtFilterApprovalStatusInbox option:selected').text() + "</div>";


    }
    if ($('#WebpartApprovalInbox').val() != "All") {
        restquery += "and WebpartName eq '" + $('#WebpartApprovalInbox').val() + "' ";
        ApprovalinboxChip += "<div class='upload-chip'>" + $('#WebpartApprovalInbox option:selected').text() + "</div>";

    }

    if ($('#categoryApprovalInbox').val() != "All") {
        restquery += "and Category eq '" + $('#categoryApprovalInbox').val() + "' ";
        ApprovalinboxChip += "<div class='upload-chip'>" + $('#categoryApprovalInbox option:selected').text() + "</div>";

    }
    if ($("#ApprovalInboxPeople_TopSpan_ResolvedList").text() != "") {
        var assigntobyme = getUserInformation('ApprovalInboxPeople');
        ApprovalinboxChip += "<div class='upload-chip'>" + assignBy.join(', ') + "</div>";
        if (assigntobyme.length > 0) {
            restquery += "and (AuthorId eq '" + assigntobyme[0] + "' ";
            for (var i = 0; i < assigntobyme.length; i++) {
                if (assigntobyme[i] != assigntobyme[0]) {
                    restquery += "or AuthorId eq '" + assigntobyme[i] + "'";
                    //ApprovalinboxChip +="<div class='upload-chip'>"+assigntobyme[i]+"</div>"; 
                }
            }
            restquery += ")";
        }
    }
    $("#ApprovalinboxChip").empty();
    $("#ApprovalinboxChip").append(ApprovalinboxChip);
	var dateFilter = new Date();
    dateFilter = dateFilter.setFullYear(dateFilter.getFullYear() - 1);
    dateFilter = new Date(dateFilter);
    var requestUri = "?$select=ID,Title,Status,WebpartName,ApprovedDate,Remarks,ItemId,DepartmentId/ID,Details,DepartmentId/DepartmentName,ApprovedBy/Title,Author/Title,*&$Expand=ApprovedBy,Author,DepartmentId&$OrderBy=Modified desc&$top=5000&$Filter=ApproversId eq '" + _spPageContextInfo.userId + "' and Created ge datetime'" + dateFilter.toISOString() + "' " + restquery;

    FilterApprovalData(requestUri, "Filter");
}


function FilterApprovalData(Query, Action) {
	var EmptyAction = Action;
    $.when(getItemsWithQueryItem('ApprovalTaskList', Query, "ApprovalIn")).done(function (TaskResults) {

        if (EmptyAction == "Filter") { // Empty the table
            $("#mainDivAreaApprovalInbox").empty();
        }
        if (NextURLApprovalIn == null) {
            $("#SeeMoreFilterApprovalIn").hide();
        }
        else {
            $("#SeeMoreFilterApprovalIn").show();
        }
        var items = TaskResults.results;


        itemsarray = items;
        var tableItemsHTML = "";
        for (var i = 0; i < items.length; i++) {
            var itemId = items[i].ID;
            var Title = items[i].Title;
            var TaskAssignFrom = items[i].Author.Title;
            //TaskAssignFrom=getUserName(TaskAssignFrom);			// Need to change this piece of code.
            var CurrentPhase = items[i].Status;
            var ProcessType = items[i].WebpartName;
            var ProcessTypeCategory = items[i].Category;
            var DepartmentName = items[i].DepartmentId.DepartmentName == undefined ? '' : items[i].DepartmentId.DepartmentName;
            var approvedDate = items[i].ApprovedDate;
            var approvedBy = items[i].ApprovedBy.Title;
            var remarks = items[i].Remarks;
            var webpartname = items[i].WebpartName;
            if(webpartname == "Banners"){
            	webpartname = "Information";
            }
            var details = items[i].Details;
            var ListItemId = items[i].ItemId;
            var DepartmentId = items[i].DepartmentId.ID;
            if (remarks == null) { remarks = ''; }
            if (approvedDate == null) { approvedDate = ''; }
            else {
                approvedDate = new Date(approvedDate);
                approvedDate = titanForWork.ShowCommonStandardDateFormat(approvedDate);//.toLocaleDateString();
            }

            if (approvedBy == null) { approvedBy = ''; }
            if (ProcessTypeCategory == null) { ProcessTypeCategory = webpartname; }
            var ItemDtlList = [];
            ItemDtlList.push(itemId, Title, remarks, ListItemId, CurrentPhase, DepartmentId, ProcessType);


            var Action = "";
            Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='projectGridInboxTaskEvent1444' style='cursor:pointer' onclick='getActionbtnValuesInbox(\"" + itemId + "\")'>Action</a>";
            //tableItemsHTML += "<tr><td>" + truncate(Title, 55) + "</td><td>" + TaskAssignFrom + "</td><td>" + CurrentPhase + "</td><td>" + webpartname + "</td><td>" + ProcessTypeCategory + "</td><td>" + approvedDate + "</td><td>" + approvedBy + "</td><td>" + truncate(remarks, 100) + "</td>";
            //tableItemsHTML += "<td>" + Action + "</td></tr>";
            tableItemsHTML += "<tr>" +
            "<td><p class='m-0 ellipsis-2'>" + truncate(Title, 55) + "</p></td>" +
            "<td class='text-center'><div class=''><p class='m-0 ellipsis-2'>" + TaskAssignFrom + "</p></div></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + CurrentPhase + "</p></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + webpartname + "</p></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + ProcessTypeCategory + "</p></td>" +
            "<td class='text-center'><p class='m-0 mb-10'>" + approvedDate + "</p></td>" +
            "<td class='text-center'><p class='m-0 ellipsis-2'>" + approvedBy + "</p></td>" +
            "<td class='text-center vertical-align-middle'><button type='button' class='btn custom-btn custom-btn-two'  onclick='getActionbtnValuesInbox(\"" + itemId + "\")'>Action</button></td>" +
            "</tr>";



        }

        if (items.length == 0) {
            $('#NoRecordFoundApprovalInbox').show();
        }
        else {
            $('#NoRecordFoundApprovalInbox').hide();
        }

        // $(".TaskOutBoxTable").append(tableOutboxHtml);
        $("#mainDivAreaApprovalInbox").append(tableItemsHTML);

        //Showing data out of total
        if ($('#tableTempApprovalInbox>tbody tr').length > 100 && NextURLApprovalIn != null) {
            $("#ShowTotalApprovalIn").hide();
            $("#ShowApprovalIn").show();
            $("#ApprovalInCount").text($('#tableTempApprovalInbox>tbody tr').length);
        }
        else {
            $("#ShowTotalApprovalIn").show();
            $("#ShowApprovalIn").hide();
            $("#TotalItemsApprovalIn").text(items.length);
        }
        if ($('#tableTempApprovalInbox>tbody tr').length == 5000) {
            NextURLApprovalIn = null;
            $("#SeeMoreFilterApprovalIn").hide();
        }
        if (items.length > 0) {

            GenerateTableApprovalInbox()
        }

        //table.rows.add($(tableItemsHTML)).draw();
        //objApprovalInbox.ApprovalTaskInboxEvent();		// Bind Action Form events. //Commented by Amit kumar Not Usefull Function.   
        //objApprovalInbox.TableConfiguration();        // comment by harsh

    }).fail(function (error) {
            if(error.responseJSON.error.message.value.indexOf("The attempted operation is prohibited because it exceeds the list view threshold.") != -1){
                $("#ThresholdError").modal('show');
                $("#btnContinue").hide();
                $("#btnContinueOutBox").hide();
            }
            else {
                HandleError(error);
            }
        });
}

function GetApprovalInboxCount(){
	//var requestUri =_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ApprovalTaskList')/items?$select=*,Author/EMail&$expand=Author&$Filter=Author/EMail eq '"+_spPageContextInfo.userEmail+"' and CompanyId eq '"+Logged_CompanyId+"' and Status eq 'Initiated'";
	var requestUri =_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ApprovalTaskList')/items?$select=*,Approvers/EMail&$top=5000&$expand=Approvers&$Filter=ApproversId/EMail eq '"+_spPageContextInfo.userEmail+"' and Status eq 'Initiated'";
	$.ajax({
            url: requestUri,
            type: "GET",
			async:false,
            headers: { "ACCEPT": "application/json;odata=verbose" },
            success: function (data) {
				var items=data.d.results;
				$("#ApprovalPendingTask").append(items.length);
				
			},
			error: function () {
                alert("Error getting the Approver Inbox Count .");
            } 
	});
}

function ClearApprovalInboxFilter() {
    $('#txtFilterApprovalStatusInbox').val("Initiated");
    $('#WebpartApprovalInbox').val("All");
    $('#categoryApprovalInbox').val("All");
    $("#ApprovalinboxChip").empty();
    clearPeoplePickerControl("ApprovalInboxPeople");
    var Handler = this;
    Handler.TaskPhase = "Initiated";
    objApprovalInbox.GetApprovalInboxTasks("PageLoad");
}