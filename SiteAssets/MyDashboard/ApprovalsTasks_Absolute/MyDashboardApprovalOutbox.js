//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS
var ApprovalOutbox = function () {
    this.Mode;					// Add, Update, View
    this.SiteURL;
    this.CompanyId;
    this.TaskPhase;
    this.SuggestionTitle = $("#suggestionTitlebox");
    this.SuggestionType = $("#suggestionTypeoutbox");
    this.SuggestionCategory = $("#suggestionCategoryoutbox");
    this.SuggestionDetails = $("#suggestionDetailsbox");
    this.ApprovalAction = $("#txtApprovalActionbox");
    this.Remarks = $("#txtRemarksbox");
    this.ActionSubmit = $("#btnAction");
    this.ModalPopupApproval = $("#modalApprovaloutbox");
    this.FilterApprovalStatusOutbox = $("#txtFilterApprovalStatusOutbox");
    this.AllApprovalOutboxTasks = $(".mainDivApprovalOutbox"); //$("#mainDivApprovalOutbox");
    this.NoRecordFound = $(".NoRecordFound");
    this.columns = $("#columnsApprovalOutbox");
    this.currentpage = $("#currentpageApprovalOutbox");
    this.totalpages = $("#totalpagesApprovalOutbox");
    this.startrecord = $("#startrecordApprovalOutbox");
    this.endrecord = $("#endrecordApprovalOutbox");
    this.totalrecords = $("#totalrecordsApprovalOutbox");
    this.selectedrow = $("#selectedrowApprovalOutbox");
    this.pagedropdown = $("#pagedropdownApprovalOutbox");
    this.tablenav = $("#tablenavApprovalOutbox");
};

ApprovalOutbox.prototype.InitializeControls = function InitializeControls() {
    var Handler = this;
    Handler.CompanyId = titanForWork.getQueryStringParameter('CompanyId');		// Get Company ID from QueryString
    Handler.SiteURL = titanForWork.getQueryStringParameter('CompanySiteUrl');   // Get Company Site URL
}

ApprovalOutbox.prototype.SetControls = function SetControls() {
    var Handler = this;
    Handler.TaskPhase = "Initiated";		// Default Filter Value	
    Handler.FilterApprovalStatusOutbox.change(function () {
        Handler.TaskPhase = $("select#txtFilterApprovalStatusOutbox option:selected").text();
        objApprovalOutbox.GetApprovalOutboxTasks();
    });
}

ApprovalOutbox.prototype.BindEvents = function BindEvents() {
    var Handler = this;
}

var itemsarrayoutbox = '';
ApprovalOutbox.prototype.GetApprovalOutboxTasks = function GetApprovalOutboxTasks() {
    var Handler = this;
    var restQuery;
    var option = "";
    var Type= "";
    var uniqueValues = [];
    $("#categoryapprovaloutbox").empty();
    $('#WebpartOutbox').empty();
    if (Handler.TaskPhase == "All") {
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ApprovalTaskList')/items?$select=ID,Title,Status,WebpartName,ApprovedDate,Remarks,ItemId,DepartmentId/ID,Details,DepartmentId/DepartmentName,Approvers/Title,Author/Title,ApprovedBy/Title,*&$Expand=Approvers,Author,ApprovedBy,DepartmentId&$Filter=AuthorId eq '" + _spPageContextInfo.userId + "' and CompanyId eq '" + Handler.CompanyId + "' &$OrderBy=Modified desc";
    }
    else {
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ApprovalTaskList')/items?$select=ID,Title,Status,WebpartName,ApprovedDate,Remarks,ItemId,DepartmentId/ID,Details,DepartmentId/DepartmentName,Approvers/Title,Author/Title,ApprovedBy/Title,*&$Expand=Approvers,Author,ApprovedBy,DepartmentId&$Filter=AuthorId eq '" + _spPageContextInfo.userId + "' and CompanyId eq '" + Handler.CompanyId + "' and Status eq  '" + Handler.TaskPhase + "' &$OrderBy=Modified desc";
    }
    $.ajax({
        url: requestUri,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            
            var items = data.d.results;
            itemsarrayoutbox = items;
            var tableItemsHTML = "";
            table = $("#TempTableApprovalOutbox").DataTable();
            table.clear().draw();
            var myData = [];
            $('<option value="All">All</option>').appendTo("#categoryapprovaloutbox");
            $('<option value="All">All</option>').appendTo("#WebpartOutbox");
            for (var i = 0; i < items.length; i++) {
                var itemId = items[i].ID;
                var Title = items[i].Title;
                var TaskAssignFrom = items[i].Author.Title;
                var CurrentPhase = items[i].Status;
                var ProcessType = items[i].WebpartName;
                var ProcessTypeCategory = items[i].Category;
                var DepartmentName = items[i].DepartmentId.DepartmentName == undefined ? '' : items[i].DepartmentId.DepartmentName;
                var approvedDate = items[i].ApprovedDate;
                var Approvers = items[i].Approvers;
                var ApprovedBy = items[i].ApprovedBy.Title;
                var allApprovers = '';
                if (Approvers.results != null) {
                    for (var j = 0; j < Approvers.results.length; j++) {
                        var username = Approvers.results[j].Title;
                        allApprovers += username + ";";
                    }
                }

                if (allApprovers.length > 0) {
                    allApprovers = allApprovers.substring(0, allApprovers.length - 1);
                }

                var remarks = items[i].Remarks;
                var details = items[i].Details;
                var ListItemId = items[i].ItemId;
                var DepartmentId = items[i].DepartmentId.ID;

                if (remarks == null) {
                    remarks = '';
                }
                if (approvedDate == null) {
                    approvedDate = '';
                    ApprovedBy = ''
                }
                else {
                    approvedDate = new Date(approvedDate);
                    approvedDate = titanForWork.ShowCommonStandardDateFormat(approvedDate);//.toLocaleDateString();
                }
                var ItemDtlList = [];
                ItemDtlList.push(itemId, Title, remarks, ListItemId, CurrentPhase, DepartmentId, ProcessType);

                var Action = "";
                Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='projectGridOutboxTaskEvent1' style='cursor:pointer' onclick='getActionbtnValues(\"" + itemId + "\")'>Action</a>";

                tableItemsHTML += "<tr><td>" + truncate(Title, 55) + "</td><td>" + allApprovers + "</td><td>" + CurrentPhase + "</td><td>" + ProcessType + "</td><td>" + ProcessTypeCategory + "</td><td style='display:none'>" + DepartmentName + "</td><td>" + approvedDate + "</td><td>" + ApprovedBy + "</td><td>" + truncate(remarks, 55) + "</td>";
                tableItemsHTML += "<td>" + Action + "</td></tr>";
                if (ProcessType != null) {
                    if (uniqueValues.indexOf(ProcessType) == -1) {
                        uniqueValues.push(ProcessType);
                        Type += "<option value='" + ProcessType + "'title='" + ProcessType + "'>" + ProcessType + "</option>";
                    }
                }
                if (ProcessTypeCategory != null) {
                    if (uniqueValues.indexOf(ProcessTypeCategory ) == -1) {
                        uniqueValues.push(ProcessTypeCategory );
                        option += "<option value='" + ProcessTypeCategory + "'title='" + ProcessTypeCategory + "'>" + ProcessTypeCategory + "</option>";
                    }
                }
            }
            $("#categoryapprovaloutbox").append(option);
            $("#WebpartOutbox").append(Type);
            var completebody = tableItemsHTML;
            table.rows.add($(tableItemsHTML)).draw();
            // getActionbtnValues();
            // objApprovalOutbox.ApprovalTaskOutboxEvent(); // Bind Action Form events. //Commented by Amit kumar Not Usefull Function.

        },
        error: function (data) {

            console.log(data);
        }
    });
}

function truncate(source, size) {
    if (source != null) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    }
}

//New Get Action Value function  created by Rahul Rana  
function getActionbtnValues(Itemid)
{
      
	var Ownurl = _spPageContextInfo.webAbsoluteUrl  + "/_api/web/lists/getbytitle('ApprovalTaskList')/items?$filter=ID eq ('"+ Itemid+"')";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) { 
			 
            var items = data.d.results;  
            if (items.length > 0) 
			{  
				var ItemID = items[0].ID;
				var title = items[0].Title;
				var ListItemId = items[0].ItemId;
				var Remarks= items[0].Remarks;
				var DepartmentId = items[0].DepartmentIdId;				 
				var ProcessType = items[0].WebpartName;
				var Category = items[0].Category;
				var SatusId	= items[0].Status;	
                 $('#txtApprovalActionbox').val(SatusId);
                 if (Remarks== null) {
                    Remarks= '';
                }

                objApprovalOutbox.ApprovedTask(ItemID, title,Category, ListItemId, DepartmentId, ProcessType, Remarks, SatusId);

            } 
        },
		error: function (data) 
		{  
        	console.log(data);  
		}  
    }); 
}    

/*
function getActionbtnValues(_ItemDtlList) {

    var Handler = this;
    var DataListitem = _ItemDtlList.split(',');
    var ItemID = DataListitem[0];
    var title = DataListitem[1];
    var ListItemId = DataListitem[3];
    var DepartmentId = DataListitem[5];
    var ProcessType = DataListitem[6];
    Remarks = DataListitem[2];
    SatusId = DataListitem[4];
    $('#txtApprovalActionbox').val(SatusId);
    objApprovalOutbox.ApprovedTask(ItemID, title, ListItemId, DepartmentId, ProcessType, Remarks, SatusId);
}
*/

//Commented by Amit kumar Not Usefull Function.
/*
ApprovalOutbox.prototype.ApprovalTaskOutboxEvent = function ApprovalTaskOutboxEvent()
{ 
	var Handler=this;
	
    $('.projectGridOutboxTaskEvent').click(function ()
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
		var  details = jQuery(this).closest('tr').find('.cssdetails').text();
		ListItemId = jQuery(this).closest('tr').find('.cssListItemId').val();
		DepartmentId = jQuery(this).closest('tr').find('.cssDepartmentId').val();
		ProcessType = jQuery(this).closest('tr').find('.cssProcessType').val();
		Remarks = jQuery(this).closest('tr').find('.cssRemarks').text();
		SatusId= jQuery(this).closest('tr').find('.cssStausId').val();
		//objApprovalOutbox.ApprovedTask(ItemID, title, details, ListItemId, DepartmentId, ProcessType,Remarks,SatusId);
		
    });
}*/

var globalEventId = "";
var DatalistArray = [];
ApprovalOutbox.prototype.ApprovedTask = function ApprovedTask(ItemID, title, Category, ListItemId, DepartmentId, ProcessType, Remarks, SatusId) {
    DatalistArray = [];
    var Handler = this;
    Handler.SuggestionDetails.empty();
    Handler.ModalPopupApproval.modal('show');
    globalEventId = ListItemId;
    if (ProcessType == "Events") {
        //Handler.SuggestionDetails.append( <a class="projectGridInboxTaskEvent1444" style="cursor:pointer" onclick=" ">Action</a> );//text(details);
        $('#btnshow').show();
        $('#suggestionDetails').hide();
    }
    else {
         $('#btnshow').hide();
         $('#suggestionDetails').show();
        Handler.SuggestionDetails.append('<a href=' + ListNameByProcessType(ListItemId, ProcessType) + ' target="_blank">Details</a>');
    }
    Handler.SuggestionTitle.text(title);
    Handler.SuggestionType.text(ProcessType);
	Handler.SuggestionCategory.text(Category);	
    Handler.Remarks.text(Remarks);
    $("#btnAction").show();
    $("#OutboxSubmit").hide();
    $("#txtApprovalActionbox").attr("disabled", true);
    $("#txtRemarksbox").attr("disabled", true);
    Handler.ActionSubmit.unbind().click(function () {
        var ActionTaken = $("select#txtApprovalActionbox option:selected").text();
        var Remarks = Handler.Remarks.val();
        if (ActionTaken != '' || Remarks != '') {
            if (ActionTaken == "Rejected") {
                if (Remarks.trim() == "") {
                    alert('Please enter remarks.');
                    return false;
                }
                else {
                    Handler.ActionSubmit.attr("disabled", true);
                    objApprovalOutbox.updateApprovalDetails("ApprovalTaskList", ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType);
                }
            }
            else {
                Handler.ActionSubmit.attr("disabled", true);
                objApprovalOutbox.updateApprovalDetails("ApprovalTaskList", ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType);
            }
        }
        else {
            alert("Please Enter Remarks.")
        }
    });
}

ApprovalOutbox.prototype.updateApprovalDetails = function updateApprovalDetails(ListName, ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType) {
    try {
        var currentUserID = _spPageContextInfo.userId;
        var currentDate = new Date();

        var Metadata;
        var ItemType = objApprovalOutbox.GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Remarks: Remarks,
            Status: ActionTaken,
            ApprovedById: currentUserID,
            ApprovedDate: currentDate
        };
        objApprovalOutbox.UpdateApprovalToList(ListName, Metadata, ItemID, ListItemId, DepartmentId, ActionTaken, ProcessType);
    }
    catch (error) {
        console.log(error.message);
    }
}

ApprovalOutbox.prototype.UpdateApprovalToList = function UpdateApprovalToList(ListName, Metadata, ItemID, ListItemId, DepartmentId, ActionTaken, ProcessType) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + ItemID + "')",
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
            objApprovalOutbox.getDepartmentURL(ListItemId, DepartmentId, ActionTaken, ProcessType);
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


ApprovalOutbox.prototype.getDepartmentURL = function getDepartmentURL(ListItemId, DepartmentId, ActionTaken, ProcessType) {
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
                objApprovalOutbox.updateMainList(ListItemId, siteURL, ActionTaken, ProcessType);
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

ApprovalOutbox.prototype.updateMainList = function updateMainList(ListItemId, siteURL, ActionTaken, ProcessType) {
    try {
        var currentUserID = _spPageContextInfo.userId;
        var currentDate = new Date();
        var activeStatus = '';
        var contentListName = '';
        if (ActionTaken == "Approved") {
            activeStatus = true;
        }
        else {
            activeStatus = false;
        }
        if (ProcessType == "Discussion") {
            contentListName = "Discussions";
        }
        else {
            contentListName = "Suggestions";
        }

        var Metadata;
        var ItemType = objApprovalOutbox.GetItemTypeForListName(contentListName);
        Metadata = {
            __metadata: {
                'type': ItemType
            },

            Active: activeStatus,
            ApprovedById: currentUserID,
            ApprovedDate: currentDate

        };
        objApprovalOutbox.UpdateMainListItem(contentListName, Metadata, ListItemId, siteURL);

    }
    catch (error) {
        console.log(error.message);
    }
}


ApprovalOutbox.prototype.UpdateMainListItem = function UpdateMainListItem(contentListName, Metadata, ListItemId, siteURL) {
    var Handler = this;

    var dfd = $.Deferred();
    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('" + contentListName + "')/GetItemById('" + ListItemId + "')",
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
            alert("Action Taken Sucsessfully");
            Handler.ModalPopupApproval.modal('hide');

            objApprovalOutbox.GetApprovalOutboxTasks();		// Get Announcements
        },
        error: function (error) {

            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


ApprovalOutbox.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

$(document).ready(function () {
    objApprovalOutbox = new ApprovalOutbox();
    objApprovalOutbox.InitializeControls();
    objApprovalOutbox.SetControls();
    objApprovalOutbox.GetApprovalOutboxTasks();
});

$("#categoryapprovaloutbox").change(function () {
    var categoryoutboxvalue = $(this).val();
    categorfilteroutbox(categoryoutboxvalue)
});

$("#WebpartOutbox").change(function () {
	var webpartoutboxvalue = $(this).val();
	WebpartOutboxfilter(webpartoutboxvalue)
});


function categorfilteroutbox(categoryoutboxvalue) {
    var itemCollectionoutbox;
    var titemResultsoutbox = itemsarrayoutbox;
    if (categoryoutboxvalue != "All") {
        itemCollectionoutbox = $.grep(titemResultsoutbox, function (item) {
            if (item.Category == null) {
                return item.WebpartName == categoryoutboxvalue;
            }
            else {
                return item.Category == categoryoutboxvalue;
            }
        });
        titemResultsoutbox = itemCollectionoutbox;
    }
    var items = titemResultsoutbox;
    var tableItemsHTML = "";
    table = $("#TempTableApprovalOutbox").DataTable();
    table.clear().draw();
    var myData = [];
    for (var i = 0; i < items.length; i++) {
        var itemId = items[i].ID;
        var Title = items[i].Title;
        var TaskAssignFrom = items[i].Author.Title;
        var CurrentPhase = items[i].Status;
        var ProcessType = items[i].WebpartName;
        var ProcessTypeCategory = items[i].Category;
        var DepartmentName = items[i].DepartmentId.DepartmentName == undefined ? '' : items[i].DepartmentId.DepartmentName;
        var approvedDate = items[i].ApprovedDate;
        var Approvers = items[i].Approvers;
        var ApprovedBy = items[i].ApprovedBy.Title;
        var allApprovers = '';
        if (Approvers.results != null) {
            for (var j = 0; j < Approvers.results.length; j++) {
                var username = Approvers.results[j].Title;
                allApprovers += username + ";";
            }
        }
        if (allApprovers.length > 0) {
            allApprovers = allApprovers.substring(0, allApprovers.length - 1);
        }
        var remarks = items[i].Remarks;
        var details = items[i].Details;
        var ListItemId = items[i].ItemId;
        var DepartmentId = items[i].DepartmentId.ID;
        if (remarks == null) {
            remarks = '';
        }
        if (approvedDate == null) {
            approvedDate = '';
            ApprovedBy = ''
        }
        else {
            approvedDate = new Date(approvedDate);
            approvedDate = titanForWork.ShowCommonStandardDateFormat(approvedDate);//.toLocaleDateString();
        }
        var ItemDtlList = [];
        ItemDtlList.push(itemId, Title, remarks, ListItemId, CurrentPhase, DepartmentId, ProcessType);

        var Action = "";
        //Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='' style='cursor:pointer' onclick='getActionbtnValues(\"" + ItemDtlList + "\")' >Action</a> // commented by harsh";
        Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='' style='cursor:pointer' onclick='getActionbtnValues(\"" + itemId + "\")' >Action</a>";

        tableItemsHTML += "<tr><td>" + Title + "</td><td>" + allApprovers + "</td><td>" + CurrentPhase + "</td><td>" + ProcessType + "</td><td>" + ProcessTypeCategory + "</td><td style='display:none'>" + DepartmentName + "</td><td>" + approvedDate + "</td><td>" + ApprovedBy + "</td><td>" + remarks + "</td>";
        tableItemsHTML += "<td>" + Action + "</td></tr>";
    }
    var completebody = tableItemsHTML;
    table.rows.add($(tableItemsHTML)).draw();
    //objApprovalOutbox.ApprovalTaskOutboxEvent();		// Bind Action Form events. //Commented by Amit kumar Not Usefull Function.
}


function WebpartOutboxfilter(webpartoutboxvalue) {
    var itemCollectionoutbox;
    var titemResultsoutbox = itemsarrayoutbox;
    if (webpartoutboxvalue!= "All") {
        itemCollectionoutbox = $.grep(titemResultsoutbox, function (item) {
            if (item.WebpartName == null) {
                return item.WebpartName == webpartoutboxvalue;
            }
            else {
                return item.WebpartName == webpartoutboxvalue;
            }
        });
        titemResultsoutbox = itemCollectionoutbox;
    }
    var items = titemResultsoutbox;
    var tableItemsHTML = "";
    var uniqueValues = [];
	var option = '';
	$('#categoryapprovaloutbox').empty();
    table = $("#TempTableApprovalOutbox").DataTable();
    $('<option value="All">All</option>').appendTo("#categoryapprovaloutbox");
    table.clear().draw();
    var myData = [];
    for (var i = 0; i < items.length; i++) {
        var itemId = items[i].ID;
        var Title = items[i].Title;
        var TaskAssignFrom = items[i].Author.Title;
        var CurrentPhase = items[i].Status;
        var ProcessType = items[i].WebpartName;
        var ProcessTypeCategory = items[i].Category;
        var DepartmentName = items[i].DepartmentId.DepartmentName == undefined ? '' : items[i].DepartmentId.DepartmentName;
        var approvedDate = items[i].ApprovedDate;
        var Approvers = items[i].Approvers;
        var ApprovedBy = items[i].ApprovedBy.Title;
        var allApprovers = '';
        if (Approvers.results != null) {
            for (var j = 0; j < Approvers.results.length; j++) {
                var username = Approvers.results[j].Title;
                allApprovers += username + ";";
            }
        }
        if (allApprovers.length > 0) {
            allApprovers = allApprovers.substring(0, allApprovers.length - 1);
        }
        var remarks = items[i].Remarks;
        var details = items[i].Details;
        var ListItemId = items[i].ItemId;
        var DepartmentId = items[i].DepartmentId.ID;
        if (remarks == null) {
            remarks = '';
        }
        if (approvedDate == null) {
            approvedDate = '';
            ApprovedBy = ''
        }
        else {
            approvedDate = new Date(approvedDate);
            approvedDate = titanForWork.ShowCommonStandardDateFormat(approvedDate);//.toLocaleDateString();
        }
        var ItemDtlList = [];
        ItemDtlList.push(itemId, Title, remarks, ListItemId, CurrentPhase, DepartmentId, ProcessType);

        var Action = "";
        //Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='' style='cursor:pointer' onclick='getActionbtnValues(\"" + ItemDtlList + "\")' >Action</a> // commented by harsh";
        Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='' style='cursor:pointer' onclick='getActionbtnValues(\"" + itemId + "\")' >Action</a>";

        tableItemsHTML += "<tr><td>" + Title + "</td><td>" + allApprovers + "</td><td>" + CurrentPhase + "</td><td>" + ProcessType + "</td><td>" + ProcessTypeCategory + "</td><td style='display:none'>" + DepartmentName + "</td><td>" + approvedDate + "</td><td>" + ApprovedBy + "</td><td>" + remarks + "</td>";
        tableItemsHTML += "<td>" + Action + "</td></tr>";
        if (ProcessTypeCategory != null) {
				if (uniqueValues.indexOf(ProcessTypeCategory) == -1) {
					uniqueValues.push(ProcessTypeCategory);
					option += "<option value='" + ProcessTypeCategory + "'title='" + ProcessTypeCategory + "'>" + ProcessTypeCategory + "</option>";
				}
		 }
    }
    $("#categoryapprovaloutbox").append(option);
    var completebody = tableItemsHTML;
    table.rows.add($(tableItemsHTML)).draw();
    //objApprovalOutbox.ApprovalTaskOutboxEvent();		// Bind Action Form events. //Commented by Amit kumar Not Usefull Function.
}


function ListNameByProcessType(ListItemId, _ProcessType) {
    var ListName;
    switch (_ProcessType) {
        case 'Alert': ListName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=Update&Type=Alert"; break;
        case 'Announcements': ListName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=Update&Type=Announcement"; break;
        case 'Banners': ListName = _spPageContextInfo.webAbsoluteUrl + "/Pages/AddSlider.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=Update"; break;
        case 'Department Banners': ListName = "Department Banners"; break;
        case 'Department MediaGallary': ListName = "Department MediaGallary"; break;
        case 'Departmental Events': ListName = "Departmental Events"; break;
        case 'DepartmentDocument_Access': ListName = "DepartmentDocument_Access"; break;
        case 'Discussion': ListName = "Discussion"; break;
        case 'Documents': ListName = "Documents"; break;
        case 'Emergency Annoucements': ListName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=Update&Type=Alert"; break;
        case 'General': ListName = _spPageContextInfo.webAbsoluteUrl + "/Pages/BiographyWebpart.aspx?itemId=" + ListItemId + "&WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + ""; break;
        case 'HR Admin': ListName = "HR Admin"; break;
        case 'Knowledge': ListName = "Knowledge"; break;
        case 'Media': ListName = "Media"; break;
        case 'Media Gallery': ListName = "Media Gallery"; break;
       
        case 'Occasion': ListName = "Occasion"; break;
        case 'Polls': ListName = "Polls"; break;
        case 'Project Admin': ListName = "Project Admin"; break;
        case 'QuestionAnswer': ListName = "QuestionAnswer"; break;
        case 'Recognition': ListName = "https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV/Pages/Empofthemonth.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&itemId=" + ListItemId + "&sourcelocation=../Pages/MyDashboard.aspx"; break;
        case 'Suggesion': ListName =  _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId')+"&ItemId=" + ListItemId + "&Mode=Update&Type=Suggestion&sourcelocation=../Pages/MyDashboard.aspx"; break;
        case 'New Initiative': ListName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId')+"&ItemId=" + ListItemId + "&Mode=Update&Type=Initiative&sourcelocation=../Pages/MyDashboard.aspx"; break;
        case 'Activity': ListName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId')+"&ItemId=" + ListItemId + "&Mode=Update&Type=Activity&sourcelocation=../Pages/MyDashboard.aspx"; break;
        case 'Tech Admin': ListName = "Tech Admin"; break;
        case 'Trello Board': ListName = "Trello Board";
    }
    return ListName;
}





//Add event view and update function
var ApprovalStatus = '';
function LoadCurrentEventFunction(globalEventId) {

    $('.addClickEditCompanyEvent').hide();
    $('.deleteClickEditCompanyEvent').hide();
    //globalEventId = curenntMeetingId;

    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var listName = 'Event';
    var siteURL = companySiteUrlLink + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,Title,Location,EventDate,EndDate,Description,Category,Department,ChooseImage ,ImageURL,Author/ID,ApprovalStatus&$expand=Author&$filter=ID eq '" + globalEventId + "'&$expand=AttachmentFiles";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {


            $("#OutboxViewEventModal").modal('show');
            var items = data.d.results;
            if (items.length > 0) {
                var title = items[0].Title;
                if (title == null) {
                    title = "";
                }
                $('#OutboxlabelEventTitle').text(title);
                var txtLocation = items[0].Location;
                if (txtLocation == null) {
                    txtLocation = "";
                }
                $('#OutboxlabelLocation').text(txtLocation);

                var txtEventDate = items[0].EventDate;
                if (txtEventDate != null) {
                    $('#OutboxlabelStartDateTime').text(convertJSONDateAMPMWithDate(txtEventDate));
                }
                var txtEndDate = items[0].EndDate;
                if (txtEndDate != null) {
                    $('#OutboxlabelEndDateTime').text(convertJSONDateAMPMWithDate(txtEndDate));
                }
                var txtDescription = items[0].Description;
                if (txtDescription == null) {
                    txtDescription = "";
                }
                if (txtDescription.match("https"))
                {
                   var strsplit = txtDescription.split("https");
                   var removespl = strsplit [1].slice(5);
                   var txtDescription=strsplit[0] +"https:"+removespl;
                   $('#OutboxlblNewEventDescription').text(txtDescription);
                }
                else{
                      $('#OutboxlblNewEventDescription').text(txtDescription);
                }
               
                var txtCategory = items[0].Category;
                if (txtCategory == null) {
                    txtCategory = "";
                }
                $('#OutboxlabelNewEventCategory').text(txtCategory);
                var txtDepartment = items[0].Department;
                if (txtDepartment == null) {
                    txtDepartment = "";
                }
                $('#OutboxlabelDepartment').text(txtDepartment);
                var ChooseImage = items[0].ChooseImage;
                $('#Outboxslctimage').text(txtDepartment);

                if (ChooseImage == "Upload") {
                    var Picture = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    var image = $('#OutboxlabelImageURL');
                    if (txtImageURL == null) {
                        txtImageURL = "";
                    }
                    // $('#labelImageURL').text(txtImageURL);
                    image[0].src = Picture;
                }
                else {
                    var txtImageURL = items[0].ImageURL;
                    var image = $('#OutboxlabelImageURL');

                    if (txtImageURL == null) {
                        txtImageURL = "";
                    }
                    // $('#labelImageURL').text(txtImageURL);
                    image[0].src = txtImageURL;
                }
                ApprovalStatus = items[0].ApprovalStatus;
                $('#OutboxlabelStatus').text(ApprovalStatus);




                // if(compareStartDateEndDateCurrentTimeCompare(txtEventDate)==true)

                if (ApprovalStatus == "Pending"||ApprovalStatus == "Initiated") {
                    $('.addClickEditCompanyEvent').show();
                    $('.deleteClickEditCompanyEvent').show();
                }
                if (ApprovalStatus == "Rejected") {

                    $('.deleteClickEditCompanyEvent').show();
                }

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


//Bind DatePicker on TextBox 
function BindDatePicker() {
    $('#txtEditEventStartDate').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 0,
        yearRange: "0:+2"

    });
    $('#txtEditEventStartDate').datepicker("option", "dateFormat", "dd/mm/yy").datepicker("setDate", "0");

    $('#txtEditEventEndDate').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 0,
        yearRange: "0:+2"

    });
    $('#txtEditEventEndDate').datepicker("option", "dateFormat", "dd/mm/yy").datepicker("setDate", "0");

}

function dateTimeFormat(dateTimeValue) {
    var dt = new Date(dateTimeValue);
    var dateTimeFormat = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
    return dateTimeFormat;
}

function GetDateFromHHSS(fromDateTime) {
    var getDateinFormat = fromDateTime;
    var datesplit = getDateinFormat.split(' ');
    var fullTime = datesplit[3];
    var dateTimeSplitValue = fullTime.split(':');
    var timeInHH = dateTimeSplitValue[0];
    var timeInSS = dateTimeSplitValue[1];
    if (dateTimeSplitValue[1].length == 1) {
        timeInSS = "0" + timeInSS;
    }
    var amPM = datesplit[4];
    var completeTimeINHH = timeInHH + " " + amPM;
    $('#ddlEditEvetStartTime').val(completeTimeINHH);
    $('#ddlEditEvetStartMinutes').val(timeInSS);
}
function GetDateToHHSS(toDateTime) {
    var getDateinFormat = toDateTime;
    var datesplit = getDateinFormat.split(' ');
    var fullTime = datesplit[3];
    var dateTimeSplitValue = fullTime.split(':');
    var timeInHH = dateTimeSplitValue[0];
    var timeInSS = dateTimeSplitValue[1];
    if (dateTimeSplitValue[1].length == 1) {
        timeInSS = "0" + timeInSS;
    }
    var amPM = datesplit[4];
    var completeTimeINHH = timeInHH + " " + amPM;
    $('#ddlEditEvetEndTime').val(completeTimeINHH);
    $('#ddlEditEvetEndMinutes').val(timeInSS);
}
function ConvertMMDDYYYY(datestringDDMMYYYY) {
    var dateDays = datestringDDMMYYYY.split('/')[0];
    var dateMonth = datestringDDMMYYYY.split('/')[1];
    var dateYear = datestringDDMMYYYY.split('/')[2];
    var mmddyyyFormat = dateMonth + "/" + dateDays + "/" + dateYear;
    return mmddyyyFormat;
}
function compareStartDateEndDate(startDate, endDate) {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var currentdateandTime = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    var datec = new Date(currentdateandTime);
    var kdate = new Date(startDate);
    var txtstartdate = new Date(startDate);
    var txtenddate = new Date(endDate);

    if (kdate < datec) {
        alert("StartTime can't be less than the current time.");
        return false;
    }
    if (txtenddate <= txtstartdate) {
        alert('Please change event Start DateTime or End DateTime.');
        return false
    }
    return true;
}



//For update event
$(document).ready(function () {
    BindEvents();
    BindDatePicker();
    getEventDepartment("", "dropdown");//Get Departments
    getEventCategory("", "dropdown"); //Get Event Category Master data

    UpdateSelectedEvent();//Update selected Event
    LoadMyPicture();   //Load gallary Pictures

    $("#selctimage1").change(function () {
        var imageText = $(this).find("option:selected").text();
        var imageValue = $(this).val();

        if (imageValue == "Choose from Gallery") {
            $("#imageeditSliderDiv").show();
            $("#fileeditUpload").hide();
        }
        else if (imageValue == "Upload") {
            $("#fileeditUpload").show();
            $("#imageeditSliderDiv").hide();
        }
    });
    var fileedit = document.getElementById('fileupload1');
    fileedit.onchange = function (e) {
        var ext = this.value.match(/\.([^\.]+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'JPG':
            case 'JPEG':
            case 'jpeg':
            case 'GIF':
            case 'gif':
            case 'PNG':
            case 'png':

                var size = this.files[0].size / 1024;
                if (size.toFixed(2) > 50) {
                    alert("Image size not more then 50 KB");
                    this.value = '';
                }
                else {
                    document.getElementById('blah1').src = window.URL.createObjectURL(this.files[0]);

                }
                break;
            default:
                alert('Please select image files of JPEG, JPG, GIF and PNG formatted only.');
                this.value = '';
        }
    };

});

//Bind Events Event
function BindEvents() {
    $('.closeEventForm').click(function () {
        $('#OutboxViewEventModal').modal('hide');
    });

    $('.deleteClickEditCompanyEvent').click(function () {
        DeleteEventListItem(globalEventId);
    });

    $('.addClickEditCompanyEvent').click(function () {
        // $('#myEditEventModal').modal('show');
        LoadEventDetailsEditForm();
    });
    $('.closeEditEventForm').click(function () {
        $('#myEditEventModal').modal('hide');
    });

}
function getEventCategory(categorName, databind) {
    var listName = 'CategoryMaster';
    var lengt = 0;
    var Categorytype = "";
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,CategoryType,CatogeryName&$filter=CatogeryName eq '" + categorName + "'";
    if (databind == "dropdown") {
        $('#ddlEditEventCategory').empty();
        siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,CategoryType,CatogeryName"
    }
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            var items = data.d.results;
            Categorytype = "Event";
            $("#ddlEditEventCategory").append($("<option>Select Category</option>").attr("value", ""));


            for (var index = 0; index < items.length; index++) {
                if (categorName.toLowerCase() == items[index].CatogeryName.toLowerCase()) {
                    lengt = 1;
                }
                if (databind == "dropdown") {
                    if (Categorytype == items[index].CategoryType) {
                        $("#ddlEditEventCategory").append($("<option></option>").attr("value", items[index].CatogeryName).text(items[index].CatogeryName));

                    }
                }
            }

        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
    return lengt;
}

function getEventDepartment(DepartmentsName, databind) {
    var companyId = titanForWork.getQueryStringParameter('CompanyId');
    var listName = 'Departments';
    var lengt = 0;
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,DepartmentName&$filter=DepartmentName eq '" + DepartmentsName + "' and  CompanyID eq '" + companyId + "' ";
    if (databind == "dropdown") {
        $('#ddlNewEditEventDepartment').val();
        siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=*&$filter=CompanyID eq '" + companyId + "' ";
    }

    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            var items = data.d.results;
            $("#ddlNewEditEventDepartment").append($("<option>  Department</option>").attr("value", ""));

            for (var index = 0; index < items.length; index++) {
                if (DepartmentsName.toLowerCase() == items[index].DepartmentName.toLowerCase()) {
                    lengt = 1;
                }
                if (databind == "dropdown") {
                    $("#ddlNewEditEventDepartment").append($("<option></option>").attr("value", items[index].DepartmentName).text(items[index].DepartmentName));

                }

            }

        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
    return lengt;
}

function LoadMyPicture() {

    $.when(RetrieveImageAsync()).then(function (imageInfo) {
        var len = imageInfo.results;
        var DivTr;
        var src;
        var count = 0;
        src = $("#mySliderDiv");
        //var div;
        for (var i = 0; i < len.length; i++) {
            var imagefile = imageInfo.results[i].EncodedAbsUrl;
            var Title = imageInfo.results[i].Title;

            //$('#ImageUrl').prop('src', imagefile);Keywords
            //var img = new Image(100,50);
            //var img = document.createElement('img');
            //img.className="slider-img-height panel-default";
            ///var img = new Image(100,50);
            //img.src = imagefile; 
            if (Title == "EVENT") {
                if (i == 0) {
                    src.append('<img  width="100%"  src="' + imagefile + '">');
                }
                else {
                    src.append('<img  width="100%" src="' + imagefile + '">');
                }
            }
        }
        $('#mySliderDiv img').click(function () {
            // alert($(this).attr('src'));
            $('#txtEditEventUrl').val($(this).attr('src'));
            $(this).toggleClass('my_event_active').siblings().removeClass('my_event_active');
        });
    });
}
function RetrieveImageAsync() {
    var dfd = new jQuery.Deferred(); //deferred object

    var siteurl = _spPageContextInfo.webServerRelativeUrl;
    var executor = new SP.RequestExecutor(siteurl);
    executor.executeAsync(
        {
            url: siteurl + "//_api/Web/Lists/GetByTitle('ImageGallery')/items?$select=EncodedAbsUrl,Title&$top=500",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: successHandler,
            error: errorHandler
        });
    function successHandler(data) {

        var jsonObject = JSON.parse(data.body);
        var data = jsonObject.d;
        dfd.resolve(data);
    }

    function errorHandler(data, errorCode, errorMessage) {
        alert(errorMessage);
        dfd.reject(errorMessage);

    }

    // Return the Promise so caller can't change the Deferred
    return dfd.promise();

}




function UpdateSelectedEvent() {

    $(".addEditCompanyEvent").click(function () {

        var startHoursWithMinutes = $('#ddlEditEvetStartTime').val().split(' ')[0] + ":" + $('#ddlEditEvetStartMinutes').val() + " " + $('#ddlEditEvetStartTime').val().split(' ')[1];
        var endHoursWithMinutes = $('#ddlEditEvetEndTime').val().split(' ')[0] + ":" + $('#ddlEditEvetEndMinutes').val() + " " + $('#ddlEditEvetEndTime').val().split(' ')[1];
        //newVar = ed+" 20:00:00";
        var txtEventItemTitle = $('#txtEditEventItemTitle').val().trim();
        if (txtEventItemTitle.length == 0) {
            alert('Please enter event title.');
            return false;
        }
        else if (txtEventItemTitle.length > 250) {
            alert('Event title maximum 250 characters allowed.');
            return false;
        }
        var txtEventItemLocation = $('#txtEditEventItemLocation').val().trim();
        if (txtEventItemLocation.length == 0) {
            alert('Please enter event Location.');

            return false;
        }
        else if (txtEventItemLocation.length > 250) {
            alert('Event Location maximum 250 characters allowed.');
            return false;
        }
        var txtEventStartDate = ConvertMMDDYYYY($('#txtEditEventStartDate').val()) + " " + startHoursWithMinutes;
        var txtEventEndDate = ConvertMMDDYYYY($('#txtEditEventEndDate').val()) + " " + endHoursWithMinutes;
        var txtNewEventDescription = $('#txtEditEventDescription').val().trim();
        if (txtNewEventDescription.length == 0) {
            alert('Please enter Description');
            return false;
        }


        var ddlNewEventCategory = $('#ddlEditEventCategory').val();
        if (ddlNewEventCategory == "Select Category" || ddlNewEventCategory == null || ddlNewEventCategory == "") {
            alert('Please select event category.');
            return false;
        }
        var ddlNewEditEventDepartment = $('#ddlNewEditEventDepartment').val();
        if (ddlNewEditEventDepartment == "Select Department" || ddlNewEditEventDepartment == null || ddlNewEditEventDepartment == "Select Department") {
            alert('Please select event Department.');
            return false;
        }
        var ChooseImage = $('#selctimage1').val();
        if (ChooseImage == null || ChooseImage == "") {
            alert('Please select event Choose Image.');
            return false;
        }


        if (compareStartDateEndDate(txtEventStartDate, txtEventEndDate) == false) {
            return false;
        }
        UpdateEventsMetadata(txtEventItemTitle, txtEventItemLocation, txtEventStartDate, txtEventEndDate, txtNewEventDescription, ddlNewEventCategory, ddlNewEditEventDepartment, txtEditEventUrl, ChooseImage);
    });
}
function GetItemTypeForListNameDetails(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}
function UpdateEventsMetadata(evetTitle, txtEventItemLocation, thisEventDate, thisEventEndDate, eventDescription, eventCategory, eventDepartment, eventImageURL, ChooseImage) {
    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var ListName = "Event";
    var Metadata;
    var ItemType = GetItemTypeForListNameDetails(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: evetTitle,
        Location: txtEventItemLocation,
        EventDate: thisEventDate,
        EndDate: thisEventEndDate,
        Description: eventDescription,
        Category: eventCategory,
        Department: eventDepartment,
        ImageURL: eventImageURL.value,
        ChooseImage: ChooseImage
    };

    if (evetTitle == null || evetTitle == "") {
        delete Metadata["Title"];
    }
    if (thisEventDate == null || thisEventDate == "") {
        delete Metadata["EventDate"];
    }
    if (thisEventEndDate == null || thisEventEndDate == "") {
        delete Metadata["EndDate"];
    }
    if (eventDescription == null || eventDescription == "") {
        delete Metadata["Description"];
    }
    if (eventCategory == null || eventCategory == "") {
        delete Metadata["Category"];
    }
    if (eventDepartment == null || eventDepartment == "") {
        delete Metadata["Department"];
    }
    if (eventImageURL == null || eventImageURL == "") {
        delete Metadata["ImageURL"];
    }
    $.when(updateItemWithIDGroups(ListName, Metadata)).done(function (itemresponse) {

        if (document.getElementById("fileupload1").files.length > 0) {
            checkFileExists(globalEventId);
            UpdateAttachments(globalEventId);
        }

        alert("Event Updated successfully!");
        NotificationCenter(evetTitle, eventDescription, "Events", eventCategory, thisEventDate, thisEventEndDate, false);
        var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
        var clientContext = new SP.ClientContext(companySiteUrlLink);
        var itemID = globalEventId;
        var companyId = titanForWork.getQueryStringParameter('CompanyId');
        
        titanForWork.GetItemIDOfApprovalTaskList(itemID, titanForWork.getQueryStringParameter('CompanyId'), "Events").done(function (requestItemID) {
            titanForWork.DeleteTaskItem(requestItemID);				// Delete Approval Task Item As Well.
            })


        titanForWork.CreateWorkflowTaskForApproval(itemID, companyId, 0, "Events", evetTitle, eventDescription, eventCategory, eventDepartment).done(function (response) {
            console.log("Response from titanForWork.CreateWorkflowTaskForApproval : " + response);
            if (response == "ApprovalNotRequired")			// Approval Not Required.
            {
                AutoApproveAnnouncement(companySiteUrlLink, itemID);		// Automatically approved. No approval required.
            }


            location.reload();

        });




    });
}
function updateItemWithIDGroups(ListName, Metadata) {
    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var dfd = $.Deferred();
    var oweburl = companySiteUrlLink + "/_api/Web/Lists/getByTitle('" + ListName + "')/Items(" + globalEventId + ")";
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

            // alert("Event Updated successfully!");

            //location.reload();
            dfd.resolve(true);

        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
function checkFileExists(globalEventId) {

    var ListName = "Event";
    $.ajax({
        url: titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/Lists/GetByTitle('" + ListName + "')/Items('" + globalEventId + "')?$select=*&$expand=AttachmentFiles",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            if (data.d.Attachments == true) {
                //delete file if it already exists
                for (var index = 0; index < data.d.AttachmentFiles.results.length; index++) {
                    DeleteFile(globalEventId, data.d.AttachmentFiles.results[index].FileName);
                }
            }
            UpdateAttachments(globalEventId);
        },
        error: function (data) {
            //check if file not found error                      
        }
    });
}
function DeleteFile(globalEventId, FileTitle) {

    var ListName = "Event";
    $.ajax({
        url: titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/GetByTitle('" + ListName + "')/GetItemById(" + globalEventId + ")/AttachmentFiles/getByFileName('" + FileTitle + "')  ",
        method: 'DELETE',
        async: false,
        headers: {
            'X-RequestDigest': document.getElementById("__REQUESTDIGEST").value
        },
        success: function (data) {
            UpdateAttachments(globalEventId);
        },
        error: function (data) {
            //  console.log(data);      
        }
    });
}
var uploadfinalImages = [];
var UploadeditImage = [];

$(function () {
    $("#fileupload1").on('change', function (e) {
        UploadeditImage = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            UploadeditImage[uploadfinalImages.length] = elm;
        });
        console.log(UploadeditImage);
    });
})

var GeteditImage = function (UploadeditImage) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }
    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(UploadeditImage);
    return deferred.promise();
};

var xRequestDigest = $("#__REQUESTDIGEST").val();
function UpdateAttachments(globalEventId) {

    if (UploadeditImage.length > 0) {
        $.each(UploadeditImage, function (index, value) {
              
            var fileName=value.name;                        //Remove Special characts from filename
            var fileNameSplit=fileName.split('.');
            var fileExt=fileNameSplit[fileNameSplit.length - 1];
            var fileLength=fileExt.length;
            var fileSCR=fileName.replace(/[^a-zA-Z]/g, "");
            var fileslice;
           
            if(fileLength==3){
            fileslice= fileSCR.slice(0,-3);
            }
            if(fileLength==4){
            fileslice= fileSCR.slice(0,-4);
            }          
            var newFileName=(fileslice+"."+fileExt);

            GeteditImage(value).then(function (buffer) {
                $.ajax({
                    url: titanForWork.getQueryStringParameter("CompanySiteUrl") + "/_api/web/lists/getbytitle('Event')/items(" + globalEventId + ")/AttachmentFiles/add( FileName='" + newFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
                    {
                        "Accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose",
                        "X-RequestDigest": xRequestDigest
                    },
                    success: function (data) { console.log("Image Upload"); },
                    error: function (data) {
                        console.log(data.responseText.error);
                        //alert(data.responseText);
                    }
                });
            });
        });
    }
}



//Delete Event 
function DeleteEventListItem(eventId) {
    if (confirm("Do you want to delete this Event ?")) {
        var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
        var apiPath = companySiteUrlLink + "/_api/lists/getbytitle('Event')/items/getbyid(" + eventId + ")";
        $.ajax({
            url: apiPath,
            type: "POST",
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            async: true,
            success: function (data) {
                $("#myViewEventModal").modal('hide');
                alert("Event Deleted successfully");
                location.reload();
            },
            eror: function (data) {
                console.log("An error occurred. Please try again.");
            }
        });
    }
}


function LoadEventDetailsEditForm() {
    $('#OutboxViewEventModal').modal('hide');
    var companySiteUrlLink = titanForWork.getQueryStringParameter("CompanySiteUrl");
    var listName = 'Event';
    var siteURL = companySiteUrlLink + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,Title,Location,EventDate,EndDate,Description,Category,ChooseImage,Department,ImageURL &$filter=ID eq '" + globalEventId + "'&$expand=AttachmentFiles";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            $("#myEditEventModal").modal('show');
            var items = data.d.results;

            if (items.length > 0) {
                var title = items[0].Title;
                if (title == null) {
                    title = "";
                }
                $('#txtEditEventItemTitle').val(title);
                var txtLocation = items[0].Location;
                if (txtLocation == null) {
                    txtLocation = "";
                }
                $('#txtEditEventItemLocation').val(txtLocation);

                var txtEventDate = items[0].EventDate;
                if (txtEventDate != null) {
                    $('#txtEditEventStartDate').val(dateTimeFormat(txtEventDate));
                    GetDateFromHHSS(titanForWork.convertJSONDateAMPMWithDate(txtEventDate));
                }
                var txtEndDate = items[0].EndDate;
                if (txtEndDate != null) {
                    $('#txtEditEventEndDate').val(dateTimeFormat(txtEndDate));
                    GetDateToHHSS(titanForWork.convertJSONDateAMPMWithDate(txtEndDate));
                }
                var txtDescription = items[0].Description;
                if (txtDescription == null) {
                    txtDescription = "";
                }
                if (txtDescription.match("https"))
                {
                   var strsplit = txtDescription.split("https");
                   var removespl = strsplit [1].slice(5);
                   var txtDescription=strsplit[0] +"https:"+removespl;
                   $('#txtEditEventDescription').text(txtDescription);
                }
                else{
                      $('#txtEditEventDescription').text(txtDescription);
                }
 
                var txtCategory = items[0].Category;
                if (txtCategory == null) {
                    txtCategory = "";
                }
                $('#ddlEditEventCategory').val(txtCategory);
                var txtDepartment = items[0].Department;
                if (txtDepartment == null) {
                    Department = "";
                }
                $('#ddlNewEditEventDepartment').val(txtDepartment);
                var ChooseImage = items[0].ChooseImage;
                if (ChooseImage == "Upload") {
                    $("#fileeditUpload").show();
                    $("#imageeditSliderDiv").hide();
                    $("#check1").show();
                    $("#selctimage1").val(ChooseImage);
                    var Picture = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    $('#blah1').attr('src', Picture);
                    $("#selctimage1").change(function () {
                        var imageText = $(this).find("option:selected").text();
                        var imageValue = $(this).val();
                        if (imageValue == "Choose from Gallery") {
                            $("#imageeditSliderDiv").show();
                            $("#fileeditUpload").hide();
                        }
                        else if (imageValue == "Upload") {
                            $("#fileeditUpload").show();
                            $("#imageeditSliderDiv").hide();
                        }
                    });
                }
                if (ChooseImage == "Choose from Gallery") {
                    $("#imageeditSliderDiv").show();
                    $("#fileeditUpload").hide();
                    $("#check1").show();
                    $("#selctimage1").val(ChooseImage);
                    var txtImageURL = items[0].ImageURL;
                    $('#txtEditEventUrl').val(txtImageURL);
                    $("#selctimage1").change(function () {
                        var imageText = $(this).find("option:selected").text();
                        var imageValue = $(this).val();
                        if (imageValue == "Choose from Gallery") {
                            $("#imageeditSliderDiv").show();
                            $("#fileeditUpload").hide();
                        }
                        else if (imageValue == "Upload") {
                            $("#fileeditUpload").show();
                            $("#imageeditSliderDiv").hide();
                        }
                    });
                }

            }
        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
}

 
function AutoApproveAnnouncement(companySiteUrlLink, itemID) {
    var Handler = this;
    var deferred = $.Deferred();

    var ListName = 'Event';

    var itemType = GetItemTypeForListName(ListName);

    var Metadata = { "__metadata": { 'type': itemType } };
    Metadata["ApprovalStatus"] = "Approved";

    var requestURL = companySiteUrlLink + "/_api/web/lists/getbytitle('" + ListName + "')/items(" + itemID + ")";
    var headersData = {
        "accept": "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        "content-Type": "application/json;odata=verbose",
        "X-Http-Method": "PATCH",
        "If-Match": '*'
    };

    $.ajax({
        url: requestURL,
        type: "POST",
        async: false,
        headers: headersData,
        data: JSON.stringify(Metadata),
        success: function (dataD) {
            deferred.resolve(dataD);
        },
        error: function (error) {
            deferred.reject(error);
        }
    });
    return deferred.promise();
}

