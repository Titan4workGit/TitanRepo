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
	this.FilterApprovalStatusInbox = $("#txtFilterApprovalStatusInbox");
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

var existStatus ='';
var Process ='';

ApprovalInbox.prototype.InitializeControls = function InitializeControls() {
	var Handler = this;
	Handler.CompanyId = titanForWork.getQueryStringParameter('CompanyId');		// Get Company ID from QueryString
	Handler.SiteURL = titanForWork.getQueryStringParameter('CompanySiteUrl');   // Get Company Site URL
}

ApprovalInbox.prototype.SetControls = function SetControls() {
	var Handler = this;
	Handler.TaskPhase = "Initiated";		// Default Filter Value	
	Handler.FilterApprovalStatusInbox.change(function () {
		Handler.TaskPhase = $("select#txtFilterApprovalStatusInbox option:selected").text();
		objApprovalInbox.GetApprovalInboxTasks();
	});
}

ApprovalInbox.prototype.BindEvents = function BindEvents() {
	var Handler = this;
}

var itemsarray = '';
ApprovalInbox.prototype.GetApprovalInboxTasks = function GetApprovalInboxTasks() {
	var Handler = this;
	var restQuery;
	var option = "";
	var Type = "";
	var uniqueValues = [];
	$("#category").empty();
	$('#Webpart').empty();
	if (Handler.TaskPhase == "All") {
		var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ApprovalTaskList')/items?$select=ID,Title,Status,WebpartName,ApprovedDate,Remarks,ItemId,DepartmentId/ID,Details,DepartmentId/DepartmentName,ApprovedBy/Title,Author/Title,*&$Expand=ApprovedBy,Author,DepartmentId&$Filter=ApproversId eq '" + _spPageContextInfo.userId + "' and CompanyId eq '" + Handler.CompanyId + "' &$OrderBy= Modified desc";
	}
	else {
		var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('ApprovalTaskList')/items?$select=ID,Title,Status,WebpartName,ApprovedDate,Remarks,ItemId,DepartmentId/ID,Details,DepartmentId/DepartmentName,ApprovedBy/Title,Author/Title,*&$Expand=ApprovedBy,Author,DepartmentId&$Filter=ApproversId eq '" + _spPageContextInfo.userId + "' and CompanyId eq '" + Handler.CompanyId + "' and Status eq  '" + Handler.TaskPhase + "' &$OrderBy=Modified desc";
	}
	$.ajax({
		url: requestUri,
		headers: { Accept: "application/json;odata=verbose" },
		async: false,
		success: function (data) {
			var items = data.d.results;
			itemsarray = items;
			var tableItemsHTML = "";
			table = $("#TempTableApprovalInbox").DataTable();
			table.clear().draw();
			var myData = [];
			$('<option value="All">All</option>').appendTo("#category");
			$('<option value="All">All</option>').appendTo("#Webpart");
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
				tableItemsHTML += "<tr><td>" + truncate(Title, 55) + "</td><td>" + TaskAssignFrom + "</td><td>" + CurrentPhase + "</td><td>" + webpartname + "</td><td>" + ProcessTypeCategory + "</td><td style='display:none'>" + DepartmentName + "</td><td>" + approvedDate + "</td><td>" + approvedBy + "</td><td>" + truncate(remarks, 100) + "</td>";
				tableItemsHTML += "<td>" + Action + "</td></tr>";
				if (ProcessType != null) {
					if (uniqueValues.indexOf(ProcessTypeCategory) == -1) {
						uniqueValues.push(ProcessTypeCategory);
						option += "<option value='" + ProcessTypeCategory + "'title='" + ProcessTypeCategory + "'>" + ProcessTypeCategory + "</option>";
					}
				}
				if (webpartname != null) {
					if (uniqueValues.indexOf(webpartname) == -1) {
						uniqueValues.push(webpartname);
						Type += "<option value='" + webpartname + "'title='" + webpartname + "'>" + webpartname + "</option>";
					}
				}
			}
			$("#category").append(option);
			$("#Webpart").append(Type);			
			var completebody = tableItemsHTML;
			table.rows.add($(tableItemsHTML)).draw();
			//objApprovalInbox.ApprovalTaskInboxEvent();		// Bind Action Form events. //Commented by Amit kumar Not Usefull Function.   
			//objApprovalInbox.TableConfiguration();        // comment by harsh
		},
		error: function (data) { console.log(data); }
	});
}
 
//New Get Action Value function  created by Rahul Rana 

function getActionbtnValuesInbox(ItemID)
{
   
   existStatus = ''; 
   Process ='';
	var Ownurl = _spPageContextInfo.webAbsoluteUrl  + "/_api/web/lists/getbytitle('ApprovalTaskList')/items?$filter=ID eq ('"+ ItemID +"')";  
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
				existStatus = SatusId;
				Process = ProcessType ;
				$('#txtApprovalAction').val(SatusId);		
	            objApprovalInbox.ApprovedTask(ItemID, title, Category, ListItemId, DepartmentId, ProcessType, Remarks, SatusId);

            } 
        },
		error: function (data) 
		{  
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
ApprovalInbox.prototype.ApprovedTask = function ApprovedTask(ItemID, title, Category, ListItemId, DepartmentId, ProcessType, Remarks, SatusId) {
 
	var Handler = this;
	Handler.ModalPopupApproval.modal('show');
	Handler.SuggestionDetails.html('');
	globalEventId = ListItemId;
	if (ProcessType == "Events") {
		//Handler.SuggestionDetails.append( <a class="projectGridInboxTaskEvent1444" style="cursor:pointer" onclick=" ">Action</a> );//text(details);
		if (SatusId=="Approved"){
		      $('#show').show();
		      $('#suggestionDetails').hide();
		      $('#EventCancel').show();		
	    }
		else{
		   $('#show').show();
		   $('#suggestionDetails').hide();
		   $('#EventCancel').hide();	

		}
	}
	else {
		$('#suggestionDetails').show();
		$('#show').hide();
		$('#EventCancel').hide();
		Handler.SuggestionDetails.append('<a href=' + PageNameByProcessType(ListItemId, ProcessType) + ' target="_blank">Details</a>');//text(details);
	}
	Handler.SuggestionTitle.text(title);
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
				objApprovalInbox.GetApprovalInboxTasks();
  
	   
	});  
	   
	
	
	Handler.ActionSubmit.unbind().click(function () {
		var ActionTaken = $("#txtApprovalAction option:selected").text();
		var Remarks = Handler.Remarks.val();
		if (ActionTaken != '' || Remarks != '') {
			if (ActionTaken == "Rejected" || ActionTaken == "Approved") 
			{
				if (Remarks.trim() == "") 
				{
					alert('Please enter remarks.');
					return false;
				}
				else 
				{
					objApprovalInbox.updateApprovalDetails("ApprovalTaskList", ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType);
					Handler.ModalPopupApproval.modal('hide');
					objApprovalInbox.GetApprovalInboxTasks();
				}
			}
			else {
				objApprovalInbox.updateApprovalDetails("ApprovalTaskList", ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType);
				Handler.ModalPopupApproval.modal('hide');
				objApprovalInbox.GetApprovalInboxTasks();
			}
		}
		else {
			alert("Please enter remarks.")
		}
	});
}

ApprovalInbox.prototype.updateApprovalDetails = function updateApprovalDetails(ListName, ActionTaken, Remarks, ItemID, ListItemId, DepartmentId, ProcessType) {
	try {
		var currentUserID = _spPageContextInfo.userId;
		var currentDate = new Date();
		var Metadata;
		var ItemType = GetItemTypeForListName(ListName);
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
		success: function (data) {debugger;
			dfd.resolve(data);

			if (ProcessType == "Announcements" || ProcessType == "General" || ProcessType == "Recognition" || ProcessType == "Events" || ProcessType == "Idea Bank") {
				objApprovalInbox.UpdateCompanyMainList(ListItemId, DepartmentId, ActionTaken, ProcessType);
			}
			else if (ProcessType == "Banners") 
			{
				UpdateApprovalStatus(ListItemId, ActionTaken, ProcessType);
			}
			else if(ProcessType == "New Initiative" || ProcessType == "Activity" || ProcessType == "Suggestion" || ProcessType == "Suggesion")
			{
				var Siteurl = titanForWork.getQueryStringParameter("CompanySiteUrl");
				var listName="Activity";
				var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'ApprovalStatus':ActionTaken,'ApprovarName':_spPageContextInfo.userDisplayName};
				UniversalUpdate(Siteurl,listName,item,ListItemId);	 
			}
			else if(ProcessType == "QuestionAnswer")
			{
				var Siteurl = _spPageContextInfo.webAbsoluteUrl;
				var listName="Questions_Master";
				var item={'__metadata': { type: 'SP.Data.Questions_x005f_MasterListItem'},'ApprovalStatus':ActionTaken,'ApprovedById':_spPageContextInfo.userId};
				UniversalUpdate(Siteurl,listName,item,ListItemId);	 
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
	objApprovalInbox.updateMainList(ListItemId, siteURL, ActionTaken, ProcessType);
}

//////// For Departmental Level Approvals
ApprovalInbox.prototype.UpdateDepartmentalMainList = function UpdateDepartmentalMainList(ListItemId, DepartmentId, ActionTaken, ProcessType) {
debugger;
	var listName = 'Departments';
	var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,SiteURL&$filter=ID eq '" + DepartmentId + "'";
	$.ajax({
		url: siteURL,
		headers: { Accept: "application/json;odata=verbose" },
		async: false,
		success: function (data) {
		debugger;
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


ApprovalInbox.prototype.updateMainList = function updateMainList(ListItemId, siteURL, ActionTaken, ProcessType) {
debugger;
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
		else if (ProcessType == "Banners") {
			contentListName = "BannerImages";
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
		ItemType = objApprovalInbox.GetItemTypeForListName(contentListName);
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
			objApprovalInbox.GetApprovalInboxTasks();		// Get Announcements
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
	objApprovalInbox = new ApprovalInbox();
	objApprovalInbox.InitializeControls();
	objApprovalInbox.SetControls();
	objApprovalInbox.GetApprovalInboxTasks();

	$("#txtApprovalAction").change(function () {
		var Action = $("#txtApprovalAction option:selected").text();
	/*	if (Action == 'Approved') {
			$('#lblRemarks').removeClass('required')
			$('.action').show()
			$('#btnAction').removeClass('hide')
		}
		else if (Action == 'Rejected'){
			$('#lblRemarks').addClass('required')
			$('.action').show()
			$('#btnAction').removeClass('hide')
		}
		else{
		 $('#lblRemarks').addClass('required')
			$('.action').hide()		
		} */
		 
		if (Action == existStatus ) {
		   
			$('#lblRemarks').removeClass('required')
			$('.action').hide()
			$('#btnAction').addClass('hide')
			 
		}		
		else{		  	
			$('.action').show()
			$('#btnAction').removeClass('hide')
			$('#EventCancel').hide();
	 
			 
		}
	})
});

$("#category").change(function () {
	var categoryvalue = $(this).val();
	categoryfilter(categoryvalue)
});
$("#Webpart").change(function () {
	var webpartvalue = $(this).val();
	Webpartfilter(webpartvalue)
});


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

function categoryfilter(categoryvalue) {
	var itemCollection;
	var titemResults = itemsarray;
	if (categoryvalue != "All") {
		itemCollection = $.grep(titemResults, function (item) {
			if (item.Category == null) {
				return item.Category == categoryvalue;
			}
			else {
				return item.Category == categoryvalue;
			}
		});
		titemResults = itemCollection;
	}
	var items = titemResults
	var tableItemsHTML = "";
	table = $("#TempTableApprovalInbox").DataTable();
	table.clear().draw();
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
		var ItemDtlList1 = [];
		ItemDtlList1.push(itemId, Title, remarks, ListItemId, CurrentPhase, DepartmentId, ProcessType);
		var Action = "";
	//	Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='projectGridInboxTaskEventfsdfdsf' onclick='getActionbtnValuesInbox(\"" + ItemDtlList1 + "\")' style='cursor:pointer' >Action</a>";   // commented by harsh
		Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='projectGridInboxTaskEventfsdfdsf' onclick='getActionbtnValuesInbox(\"" + itemId+ "\")' style='cursor:pointer' >Action</a>";

        tableItemsHTML += "<tr><td>" + truncate(Title, 55) + "</td><td>" + TaskAssignFrom + "</td><td>" + CurrentPhase + "</td><td>" + webpartname + "</td><td>" + ProcessTypeCategory + "</td><td style='display:none'>" + DepartmentName + "</td><td>" + approvedDate + "</td><td>" + approvedBy + "</td><td>" + truncate(remarks, 100) + "</td>";
		tableItemsHTML += "<td>" + Action + "</td></tr>";
	}
	var completebody = tableItemsHTML;
	table.rows.add($(tableItemsHTML)).draw();
	//objApprovalInbox.ApprovalTaskInboxEvent() //Commented by Amit kumar Not Usefull Function
}

function Webpartfilter(webpartvalue) {
	var itemCollection;
	var titemResults = itemsarray;
	if (webpartvalue!= "All") {
		itemCollection = $.grep(titemResults, function (item) {
			if (item.WebpartName == null) {
				return item.WebpartName == webpartvalue;
			}
			else {
				return item.WebpartName == webpartvalue;
			}
		});
		titemResults = itemCollection;
	}
	var items = titemResults
	var tableItemsHTML = "";
	var uniqueValues = [];
	var option = '';
	$('#category').empty();
	table = $("#TempTableApprovalInbox").DataTable();
	table.clear().draw();
	$('<option value="All">All</option>').appendTo("#category");
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
		var ItemDtlList1 = [];
		ItemDtlList1.push(itemId, Title, remarks, ListItemId, CurrentPhase, DepartmentId, ProcessType);
		var Action = "";
	//	Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='projectGridInboxTaskEventfsdfdsf' onclick='getActionbtnValuesInbox(\"" + ItemDtlList1 + "\")' style='cursor:pointer' >Action</a>";   // commented by harsh
		Action = "<input style='display:none' type='text' class='cssItemID' value='" + itemId + "'><div style='display:none' class='cssTitle'>" + Title + "</div><div style='display:none' class='cssRemarks'>" + remarks + "</div><div style='display:none' class='cssdetails' >" + details + "</div><input style='display:none' type='text' class='cssListItemId' value='" + ListItemId + "'><input style='display:none' type='text' class='cssStausId' value='" + CurrentPhase + "'><input style='display:none' type='text' class='cssDepartmentId' value='" + DepartmentId + "'><input style='display:none' type='text' class='cssProcessType' value='" + ProcessType + "'><a class='projectGridInboxTaskEventfsdfdsf' onclick='getActionbtnValuesInbox(\"" + itemId+ "\")' style='cursor:pointer' >Action</a>";

        tableItemsHTML += "<tr><td>" + truncate(Title, 55) + "</td><td>" + TaskAssignFrom + "</td><td>" + CurrentPhase + "</td><td>" + webpartname + "</td><td>" + ProcessTypeCategory + "</td><td style='display:none'>" + DepartmentName + "</td><td>" + approvedDate + "</td><td>" + approvedBy + "</td><td>" + truncate(remarks, 100) + "</td>";
		tableItemsHTML += "<td>" + Action + "</td></tr>";
		if (ProcessTypeCategory != null) {
				if (uniqueValues.indexOf(ProcessTypeCategory) == -1) {
					uniqueValues.push(ProcessTypeCategory);
					option += "<option value='" + ProcessTypeCategory + "'title='" + ProcessTypeCategory + "'>" + ProcessTypeCategory + "</option>";
				}
		 }
	}
	$("#category").append(option);
	var completebody = tableItemsHTML;
	table.rows.add($(tableItemsHTML)).draw();
	//objApprovalInbox.ApprovalTaskInboxEvent() //Commented by Amit kumar Not Usefull Function
}


function PageNameByProcessType(ListItemId, _ProcessType) {debugger;
	var PageName;
	var event_pop;
	switch (_ProcessType) {
		case 'Alert': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Alert"; break;
		case 'Announcements': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Announcement"; break;
		case 'Banners': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/AddSlider.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View"; break;
		case 'Department Banners': PageName = "Department Banners"; break;
		case 'Department MediaGallary': PageName = "Department MediaGallary"; break;
		case 'Departmental Events': PageName = "Departmental Events"; break;
		case 'DepartmentDocument_Access': PageName = "DepartmentDocument_Access"; break;
		case 'Discussion': PageName = "Discussion"; break;
		case 'Documents': PageName = "Documents"; break;
		case 'Emergency Annoucements': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Alert"; break;

		case 'General': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/BiographyWebpart.aspx?itemId=" + ListItemId + "&WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&Mode=View"; break;
		case 'HR Admin': PageName = "HR Admin"; break;
		case 'Knowledge': PageName = "Knowledge"; break;
		case 'Media': PageName = "Media"; break;
		case 'Media Gallery': PageName = "Media Gallery"; break;
		case 'New Initiative': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId')+"&ItemId=" + ListItemId + "&Mode=View&Type=Initiative&sourcelocation=../Pages/MyDashboard.aspx"; break;
		case 'Occasion': PageName = "Occasion"; break;
		case 'Polls': PageName = "Polls"; break;
		case 'Project Admin': PageName = "Project Admin"; break;
		case 'QuestionAnswer': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/QuestionAnswer.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&sourcelocation=../Pages/MyDashboard.aspx"; break;
		case 'Recognition': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Empofthemonth.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&itemId=" + ListItemId + "&Mode=View&sourcelocation=../Pages/MyDashboard.aspx"; break;
		case 'Suggesion': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Suggestion&sourcelocation=../Pages/MyDashboard.aspx"; break;
		case 'Activity': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Activities&sourcelocation=../Pages/MyDashboard.aspx"; break;
		case 'Tech Admin': PageName = "Tech Admin"; break;
		case 'Trello Board': PageName = "Trello Board";
	}
	return PageName;
}




//Add to event popup   

function EventPopup(globalEventId) {debugger;
	 
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
                if (txtDescription.match("https"))
                {
                   var strsplit = txtDescription.split("https");
                   var removespl = strsplit [1].slice(5);
                   var txtDescription=strsplit[0] +"https:"+removespl;
                   $('#lblNewEventDescription').text(txtDescription);
                }
                else{
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
 /*
ApprovalInbox.prototype.TableConfiguration = function TableConfiguration()   //comment by harsh
{
    sorter = new TINY.table.sorter('sorter', 'TempTableApprovalInbox', {
        headclass: 'head',
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
        pageddid: 'pagedropdown',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
                
    });
} */  


function UniversalUpdate(Siteurl,listName,item,dataid)  
{
	$.ajax({  
	url: Siteurl+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+dataid+"')",
    type: "POST",  
    async:false,
    data: JSON.stringify(item),         
    headers:  
    {  
		"Accept": "application/json;odata=verbose",  
        "Content-Type": "application/json;odata=verbose",  
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        "IF-MATCH": "*",  
        "X-HTTP-Method": "MERGE"  
	},  
    success: function(data, status, xhr)  { alert("Action taken successfully."); },  
    error: function(data) 
    {        	
    	alert ("An error occurred. Please contact your system administrator / Refresh a WebPage !");
    	console.log(data);
    }  
    });
}
