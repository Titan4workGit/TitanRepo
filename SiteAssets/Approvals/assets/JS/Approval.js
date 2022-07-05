var executionSequence=0;
var SystemIpAddress=0;
$( document ).ready(function() {
	var UrlPath = window.location.pathname;
	
	
	$.getJSON("https://api.ipify.org/?format=json", function(e) {
	SystemIpAddress = e.ip
    //console.log(e.ip);
	});
	
	if(UrlPath.indexOf('_DEV/') != -1)
	{
    	console.log("found");
	}
	else
	{
		$(".new-temp-approval-hide").css("display", "none");
	}
	
	
	/*var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$filter=WebPartName eq 'Process Admin' and Contributors eq '"+_spPageContextInfo.userId+"' and Company eq '"+Logged_CompanyId+"' ";
    var QueryResult = getdata(Query);
    if(QueryResult.length>0)
    {
    	$(".new-temp-approval-hide").css("display", "block");
    }
    else
    {
    	$(".new-temp-approval-hide").css("display", "none");
    }*/
	
    ApprovalTaskListUsageUrl = '';
    ApprovalProcessListUsageUrl ='';//DepartmentName 
    var Url = "?$select=*,DepartmentId/Title,DepartmentId/ID,ApprovedBy/Name,ApprovedBy/Title,ApprovedBy/EMail,Author/Name,Author/Title,Author/EMail,Author/ID&$expand=DepartmentId,ApprovedBy,Author&$top=5000&$filter=Approvers/EMail eq '"+_spPageContextInfo.userEmail+"' and CompanyId  eq '"+Logged_CompanyId+"'";
        	ApprovalTaskListUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTaskList')/items/" + Url;
        	setTimeout(function(){	ReadApprovalTaskListData() }, 50);
        	
    var Url1 = "?$select=*,ApprovedBy/Name,ApprovedBy/Title,ApprovedBy/EMail,Author/Name,Author/Title,Author/EMail,Author/ID&$expand=ApprovedBy,Author&$top=5000&$filter=Approvers/EMail eq '"+_spPageContextInfo.userEmail+"'";
        	ApprovalProcessListUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessList')/items/" + Url1;
        	setTimeout(function(){	ReadApprovalProcessListData() }, 100);
        	
	var Url2 = "?$select=*,LastActionby/Name,LastActionby/Title,LastActionby/EMail,Author/Name,Author/Title,Author/EMail,Author/ID&$expand=LastActionby,Author&$top=5000&$filter=NextActionby/EMail eq '"+_spPageContextInfo.userEmail+"'";
        	DocumentApprovalRequestsUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalRequests')/items/" + Url2;
        	setTimeout(function(){	ReadDocumentApprovalRequestsData() }, 150);  
        	
	initializePeoplePicker("ApprovalForward");	//NotificationMail
	initializePeoplePicker("NotificationMail");	//Requestby
	initializePeoplePicker("Requestby");	//Requestby
	
	$("#ApprovalForward_TopSpan").keyup(function () {
        onChangeTask('ApprovalForward_TopSpan','ApprovalForward','ForwardUsersList')
    });
	
	$("#NotificationMail_TopSpan").keyup(function () {
        NotificationMail('NotificationMail_TopSpan','NotificationMail','NotificationUsersList')
    });
    
    $('#CLR-TextSignature').click(function(){
		ClearTextSignature();
	});
	
    $('#CLR-ImageSignature').click(function(){
		ClearImageSignature();
		SignImage=[];
		finalImages = [];
	});
	
	$('#CLR-DrawSignature').click(function(){
		ClearDrawSignature();
	});

});

$( document ).ready(function() {
	var Url = window.location.href.split('?')[1];
	if(Url != undefined && Url != "")
	{
		var UrlType = window.atob(Url);
		if(UrlType == 'inbox')
		{
			InBoxType = 'InBox';
			$("#ApprovalOutbox").removeClass("active");
			$("#Approval-Outbox").removeClass("active in");
			$("#ApprovalInbox").addClass("active");
			$("#Approval-Inbox").addClass("active in");		
		}
		else if(UrlType == 'outbox')
		{
			InBoxType = 'OutBox';
			$("#ApprovalInbox").removeClass("active");
			$("#Approval-Inbox").removeClass("active in");
			$("#ApprovalOutbox").addClass("active");
			$("#Approval-Outbox").addClass("active in");
		
		}
		else
		{
			location.replace('../Pages/Default.aspx');
		}		
	}
	else
	{
			InBoxType = 'InBox';
			$("#ApprovalOutbox").removeClass("active");
			$("#Approval-Outbox").removeClass("active in");
			$("#ApprovalInbox").addClass("active");
			$("#Approval-Inbox").addClass("active in");
	}
});


$( window ).load(function() {
  
  	$("#LogonCompName").text(_spPageContextInfo.tenantDisplayName);
	$("#LogonCompLogo").attr("src",$('#LogoImage').attr('src'));	
	var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OfficeLocation')/items?$filter=CompanyID eq '"+Logged_CompanyId+"'&$orderby=Title asc ";
    var QueryResult = getdata(Query);
    
    $("#OfficeLoc").empty();
    $("#OfficeLoc").append($("<option     />").val('Select Office Location').text('Select Office Location'));
    if(QueryResult.length>0)
    {
    	for(var i=0; i<QueryResult.length; i++)
    	{
    		$("#OfficeLoc").append($("<option     />").val(QueryResult[i].ID).text(QueryResult[i].Title));
        }   
    } 
    
    $(function(){
		$('.newtooltip').tooltip({
			track:true,
			position: { my: "left+15 center", at: "right center" },
		});
	});  
})


function onChangeTask(HTMLID, PplPickerId, UserBoxId) 
{
	var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
    user = '';
    if (userInfo.length > 0)
    {
    	tempUserId = ensureUser($('#ApprovalForward').children().children().attr('id'));
    	var arraycontainsturtles = (ApproversList.indexOf(tempUserId) > -1);
        if(arraycontainsturtles == false)
        {
        	ApproversList.push(tempUserId);
           	var tempEmail = userInfo[0].Key.split('|')[2];
          	if (tempEmail.includes('#') == true) 
           	{
           	    tempEmail = tempEmail.replace("#ext#@adaptindia.onmicrosoft.com", '');
           	    tempEmail = tempEmail.replace("_", '@');
           	}
           	var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);           
           	var ForwardUserImg='';
            	ForwardUserImg += "<div class='col-md-6 col-sm-6 userBoxParent'>";
            	ForwardUserImg += "<div class='members-card border-0'>";
				ForwardUserImg += "<div class='members-card-head'>";
            	ForwardUserImg += "<img src='"+attachment+"'>";
            	ForwardUserImg += "</div>";
            	ForwardUserImg += "<div class='members-card-body'>";
            	ForwardUserImg += "<div class='members-card-body-info text-ellipsis'>";
            	ForwardUserImg += "<h3 class='member-name text-ellipsis'>"+userInfo[0].DisplayText+"</h3>";
            	ForwardUserImg += "<p class='member-email text-ellipsis mb0'>"+tempEmail+"</p>";
            	ForwardUserImg += "</div>";
            	ForwardUserImg += "<a class='btn remove-group-btn remove-btn close close-round' onclick='removeUserBox(this, \"" + tempEmail + "\", \"" + userInfo[0].DisplayText + "\", " + tempUserId + ")'><i class='fa fa-times'></i></a>";
            	ForwardUserImg += "</div>";
            	ForwardUserImg += "</div>";
            	ForwardUserImg += "</div>";           
            	
            	$("#" + UserBoxId).append(ForwardUserImg);
            	EmptyPeoplePicker(PplPickerId);
		}
        else if(arraycontainsturtles == true)
        {
          	EmptyPeoplePicker(PplPickerId);
           	alert("User already exists!!");
        }
	}
	};
}


var InBoxType = 'InBox';
function ActiveInboxOutbox(Type)
{
	InBoxType = Type;
}


function NotificationMail(HTMLID, PplPickerId, UserBoxId) 
{
	var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
	user = '';
	if (userInfo.length > 0)
	{
		tempUserId = ensureUser($('#NotificationMail').children().children().attr('id'));
		var arraycontainsturtles = (ApproversListNotify.indexOf(tempUserId) > -1);
        if(arraycontainsturtles == false)
        {
			ApproversListNotify.push(tempUserId);
          	var tempEmail = userInfo[0].Key.split('|')[2];
           	if (tempEmail.includes('#') == true) 
           	{
           	    tempEmail = tempEmail.replace("#ext#@adaptindia.onmicrosoft.com", '');
           	    tempEmail = tempEmail.replace("_", '@');
           	}
           	var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);           
           	var NotifyUserImg='';
            	NotifyUserImg+= "<div class='col-md-6 col-sm-6 userBoxParent'>";
            	NotifyUserImg+= "<div class='members-card border-0'>";
				NotifyUserImg+= "<div class='members-card-head'>";
            	NotifyUserImg+= "<img src='"+attachment+"'>";
            	NotifyUserImg+= "</div>";
            	NotifyUserImg+= "<div class='members-card-body'>";
            	NotifyUserImg+= "<div class='members-card-body-info text-ellipsis'>";
            	NotifyUserImg+= "<h3 class='member-name text-ellipsis'>"+userInfo[0].DisplayText+"</h3>";
            	NotifyUserImg+= "<p class='member-email text-ellipsis mb0'>"+tempEmail+"</p>";
            	NotifyUserImg+= "</div>";
            	NotifyUserImg+= "<a class='btn remove-group-btn remove-btn close close-round' onclick='removeUserBoxNotify(this, \"" + tempEmail + "\", \"" + userInfo[0].DisplayText + "\", " + tempUserId + ")'><i class='fa fa-times'></i></a>";
            	NotifyUserImg+= "</div>";
            	NotifyUserImg+= "</div>";
            	NotifyUserImg+= "</div>";           
            	
            	$("#" + UserBoxId).append(NotifyUserImg);
            	EmptyPeoplePicker(PplPickerId);
            }
            else if(arraycontainsturtles == true)
            {
            	EmptyPeoplePicker(PplPickerId);
            	alert("User already exists!!");
            }
        }
	};
}


function EmptyPeoplePicker(peoplePickerId) 
{
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
   	peoplePicker.DeleteProcessedUser();
}


function removeUserBox(Action, userEmail, UserName, UserId) {
    $(Action).parents('.col-md-6').remove();
        
    ApproversList = jQuery.grep(ApproversList, function(value) {
  		return value != UserId;
	});
}


function removeUserBoxNotify(Action, userEmail, UserName, UserId) {
    $(Action).parents('.col-md-6').remove();
        
    ApproversListNotify = jQuery.grep(ApproversListNotify, function(value) {
  		return value != UserId;
	});
}


function ForwardApproval(Action)
{	
	if($("#ForwardApprovalChkBTN").prop('checked') == true)
	{	
		if(Action.name.split(',')[1] == 'ApprovalProcessList')
		{
			var d = new Date();
			var ISODATE = d.toISOString().substring(0, 10);
			var listName="ApprovalProcessList";		
			var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'ApproversId':{'results':ApproversList},'Status':'Forwarded','ApprovedById':_spPageContextInfo.userId,'ApprovedDate':ISODATE};
   	    	var ExecutionStatus = UniversalUpdateApprovalProcessList(listName,item,Action.name.split(',')[0]);
   					if(ExecutionStatus == true)
   			{
   			  	alert("Approval Forwarded Successfully!");
   			  	$('#approvalForwardModal').modal('hide');
   	    	}		
		}
		else
		{
			var d = new Date();
			var ISODATE = d.toISOString().substring(0, 10);
			var listName="ApprovalTaskList";		
			var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'ApproversId':{'results':ApproversList},'Status':'Forwarded','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#ForwardRemark").val(),'ApprovedDate':ISODATE};
   	    	var ExecutionStatus = UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
   					if(ExecutionStatus == true)
   			{
   			  	alert("Approval Forwarded Successfully!");
   			  	$('#approvalForwardModal').modal('hide');
   	    	}
   	    }		
	}
	else
	{
		alert("Select Forwarded Checkbox!");
	}
}


function getUserInformationTeam(PeoplepickerId, multipleEmailAddress, assignUserName) {
    // Get the people picker object from the page. 
    var userIds = [];
    var uniqueValues = [];
    var useremail = [];
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
                multipleEmailAddress.push(users[i].EntityData.Email);
                assignUserName.push(users[i].DisplayText);
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


function GetUserID(logonName) {
    var item = {
        'logonName': logonName
    }

    var userId = -1;
    var UserId = $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + '/_api/web/ensureuser',
        type: 'POST',
        async: false,
        contentType: 'application/json;odata=verbose',
        data: JSON.stringify(item),
        headers: {
            'Accept': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        success: function (data) {
            userId = data.d.Id;
        },
        error: function (data) {
            console.log(data)
            if (currentDlg != "") {
                currentDlg.close();
            }
        }
    })
    return userId;

}


$(document).ready(function () {
    $("#ApprovalInboxCHK").click(function () {
        $(".ApprovalinChkBox").prop('checked', $(this).prop('checked'));
    });
    
    $(".ApprovalinChkBox").change(function(){
        if (!$(this).prop("checked")){
            $("#ApprovalInboxCHK").prop("checked",false);
        }
    });
});


function initializePeoplePicker(peoplePickerElementId) 
{
	var schema = {};
	schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
	schema['SearchPrincipalSource'] = 15;
	schema['ResolvePrincipalSource'] =15;
	schema['AllowMultipleValues'] = false;
	schema['MaximumEntitySuggestions'] =50;
	schema['Width'] = '280px';
	this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId,
	null, schema);
}


var ApprovalProcessData=[];
var ApprovalTaskListUsageData = ApprovalTaskListUsageData || [];
var ApprovalTaskListUsageUrl = '';
function ReadApprovalTaskListData() 
{
	dfds = $.Deferred(),
    $.ajax({
        url: ApprovalTaskListUsageUrl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
        	FilterState=0; // For filter load state
        	
        	ApprovalTaskListUsageData = ApprovalTaskListUsageData.concat(data.d.results);           
            if (data.d.__next) 
            {
                ApprovalTaskListUsageUrl = data.d.__next;
                ReadApprovalTaskListData();
            }
            else 
            {
            	executionSequence = executionSequence+1;	
            	for(var i=0; i<ApprovalTaskListUsageData.length; i++)
            	{
            		var Title = ApprovalTaskListUsageData[i].Title;
					var CreatedBy=ApprovalTaskListUsageData[i].Author.Title;
					var CreatedByEmail=ApprovalTaskListUsageData[i].Author.EMail;
					var CreatedByPhoto=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +ApprovalTaskListUsageData[i].Author.EMail;
					var RequestDate = moment(ApprovalTaskListUsageData[i].Created).format('DD MMM YYYY');		
					var Category = ApprovalTaskListUsageData[i].Category;
					var StatusImg = '';
						if(ApprovalTaskListUsageData[i].Status == "Rejected"){StatusImg = "../SiteAssets/Approvals/assets/images/rejected-img.png";}
						else if(ApprovalTaskListUsageData[i].Status == "Initiated"){StatusImg ="../SiteAssets/Approvals/assets/images/initiated-img.png";}
						else if(ApprovalTaskListUsageData[i].Status == "Approved"){StatusImg ="../SiteAssets/Approvals/assets/images/approved-img.png";}
						else if(ApprovalTaskListUsageData[i].Status== "Forwarded"){StatusImg ="../SiteAssets/Approvals/assets/images/forwarded-img.png";}
					var ActionByDisplay = '';
						if(ApprovalTaskListUsageData[i].Status == "Initiated")
						{
							ActionByDisplay = "display:none";
						}
						else
						{
							ActionByDisplay = "display:inline-flex";
						}
					var ApprovedBy='';
					var ApprovedByEmail='';
					var ApprovedByImage='';
					var ApprovedDate='';
				
					if(ApprovalTaskListUsageData[i].ApprovedById != null)
					{	
						ApprovedBy = ApprovalTaskListUsageData[i].ApprovedBy.Title
						ApprovedByEmail = ApprovalTaskListUsageData[i].ApprovedBy.EMail
						ApprovedByImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +ApprovalTaskListUsageData[i].ApprovedBy.EMail;
						ApprovedDate = moment(ApprovalTaskListUsageData[i].ApprovedDate).format('DD MMM YYYY');
					}					
						
					var DepartmentName =0;
					if(ApprovalTaskListUsageData[i].DepartmentIdId != null)
					{
						DepartmentName = ApprovalTaskListUsageData[i].DepartmentId.Title; 
					}
					
					var Status = ApprovalTaskListUsageData[i].Status;
					if(ApprovalTaskListUsageData[i].Status == 'Pending' || ApprovalTaskListUsageData[i].Status == 'Initiated')
					{
						Status = 'Initiated';
					}
					var NewWebpartName = '';
					if(ApprovalTaskListUsageData[i].WebpartName == 'Survey')
					{
						NewWebpartName = 'Survey';
					}
					else if(ApprovalTaskListUsageData[i].WebpartName == 'Poll')
					{
						NewWebpartName = 'Survey';
					}
					else if(ApprovalTaskListUsageData[i].WebpartName == 'Polls')
					{
						NewWebpartName = 'Survey';
					}
					else
					{
						NewWebpartName = ApprovalTaskListUsageData[i].WebpartName;
					}
					ApprovalProcessData.push({
    				Title : Title,
       				//Type : ApprovalTaskListUsageData[i].WebpartName,
       				Type : NewWebpartName, //ApprovalTaskListUsageData[i].WebpartName,
           			Category:Category,
           			CreatedBy:CreatedBy,
           			CreatedByEmail:CreatedByEmail,
           			RequestDate : RequestDate,
           			CreatedByPhoto : CreatedByPhoto,
           			ReqStatusImg : StatusImg,
           			ReqItemNo:ApprovalTaskListUsageData[i].ID,
           			ListName : 'ApprovalTaskList',
           			ListRecNo : ApprovalTaskListUsageData[i].ItemId,
           			CurrentStep:'',
           			//Status :ApprovalTaskListUsageData[i].Status,
           			Status :Status,
           			ActionByDisplay:ActionByDisplay,
           			ApprovedBy:ApprovedBy,
           			ApprovedByEmail:ApprovedByEmail,
           			ApprovedByImage:ApprovedByImage,
           			ApprovedDate:ApprovedDate,
           			DepartmentName:DepartmentName,
           			Modified : ApprovalTaskListUsageData[i].Modified          			                         
					});
				}
				
				if(executionSequence==3)
				{
            		GenerateDesign(ApprovalProcessData);
            	}
            }     
        },
        error: function (jqXhr, textStatus, errorThrown)
		{
       		console.log("Error in ReadApprovalTaskListData.");
            console.log(jqXhr.responseJSON.error.message.value);
            var msg = jqXhr.responseJSON.error.message.value;
            var MsgResult =	msg.includes("it exceeds the list view");
            if(MsgResult == true)
            {
            	 var Url = "?$select=*,Author/Name,Author/Title,Author/EMail,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title,UserID/EMail&$expand=UserID,LocationID,DepartmentId,CompanyId,Author&$top=5000";
        			AnalyticalUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTaskList')/items/" + Url;
					ReadAnalyticalUsageData();
            }
        }    
    });
    return dfds.promise();
}


var ApprovalProcessListUsageData = ApprovalProcessListUsageData || [];
function ReadApprovalProcessListData() 
{
	dfds = $.Deferred(),
    $.ajax({
        url: ApprovalProcessListUsageUrl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
        	FilterState=0; // For filter load state
        	
        	ApprovalProcessListUsageData = ApprovalProcessListUsageData.concat(data.d.results);           
            if (data.d.__next) 
            {
                ApprovalProcessListUsageUrl = data.d.__next;
                ReadApprovalProcessListData();
            }
            else 
            {	executionSequence = executionSequence + 1;	
            	for(var i=0; i<ApprovalProcessListUsageData.length; i++)
            	{
            		var Title = ApprovalProcessListUsageData[i].Title;
					var CreatedBy=ApprovalProcessListUsageData[i].Author.Title;
					var CreatedByEmail=ApprovalProcessListUsageData[i].Author.EMail;
					var CreatedByPhoto=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +ApprovalProcessListUsageData[i].Author.EMail;
					var RequestDate = moment(ApprovalProcessListUsageData[i].Created).format('DD MMM YYYY');		
					var Category = ApprovalProcessListUsageData[i].RequestFor;
					var StatusImg = '';
						if(ApprovalProcessListUsageData[i].Status == "Rejected"){StatusImg = "../SiteAssets/Approvals/assets/images/rejected-img.png";}
						else if(ApprovalProcessListUsageData[i].Status == "Initiated" || ApprovalProcessListUsageData[i].Status == 'Pending'){StatusImg ="../SiteAssets/Approvals/assets/images/initiated-img.png";}
						else if(ApprovalProcessListUsageData[i].Status == "Approved"){StatusImg ="../SiteAssets/Approvals/assets/images/approved-img.png";}
						else if(ApprovalProcessListUsageData[i].Status == "Forwarded"){StatusImg ="../SiteAssets/Approvals/assets/images/forwarded-img.png";}
					var ActionByDisplay = '';
						if(ApprovalProcessListUsageData[i].Status == "Initiated" || ApprovalProcessListUsageData[i].Status == 'Pending')
						{
							ActionByDisplay = "display:none";
						}
						else
						{
							ActionByDisplay = "display:inline-flex";
						}
					var CStep = '';
					if(ApprovalProcessListUsageData[i].CurrentStep != null)
					{
						CStep = ApprovalProcessListUsageData[i].CurrentStep;
					}	
					var ApprovedBy='';
					var ApprovedByEmail='';
					var ApprovedByImage='';
					var ApprovedDate='';
				
					if(ApprovalProcessListUsageData[i].ApprovedById != null)
					{	
						ApprovedBy = ApprovalProcessListUsageData[i].ApprovedBy.Title
						ApprovedByEmail = ApprovalProcessListUsageData[i].ApprovedBy.EMail
						ApprovedByImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +ApprovalProcessListUsageData[i].ApprovedBy.EMail;
						ApprovedDate = moment(ApprovalProcessListUsageData[i].ApprovedDate).format('DD MMM YYYY');
					}

						
					var Status = ApprovalProcessListUsageData[i].Status;
					if(ApprovalProcessListUsageData[i].Status == 'Pending' || ApprovalProcessListUsageData[i].Status == 'Initiated'){Status = 'Initiated';}
					
					
					var PriorityImg ='';
					if(ApprovalProcessListUsageData[i].Priority == 'High')
					{
						PriorityImg = '../SiteAssets/Approvals/assets/images/rd_icon.png';
					}
					
					var DueDate='';
					if(ApprovalProcessListUsageData[i].DueDate != null)
					{
						DueDate = moment(ApprovalProcessListUsageData[i].DueDate).format('DD MMM YYYY');
					}
					
					var DueDateStatus=false;
					var Due_date = Date.parse(DueDate)
					var d = new Date();
					var CurrentDate = Date.parse( moment(d).format('DD MMM YYYY'));
					
					if(DueDate != '')
					{					
						if (Due_date < CurrentDate && Status == 'Initiated') 
						{
  							DueDateStatus=true;
  						}
  					}		
					
					ApprovalProcessData.push({
    				Title : Title,
       				Type : 'Process Approval',
           			Category : Category,
           			CreatedBy : CreatedBy,
           			CreatedByEmail: CreatedByEmail,
           			RequestDate : RequestDate,
           			CreatedByPhoto : CreatedByPhoto,
           			ReqStatusImg : StatusImg,
           			ReqItemNo:ApprovalProcessListUsageData[i].ID,
           			ListName : 'ApprovalProcessList',
           			ListRecNo : '0',
           			CurrentStep:CStep,
           			//Status :ApprovalProcessListUsageData[i].Status,
           			Status :Status,
           			ActionByDisplay:ActionByDisplay,
           			ApprovedBy:ApprovedBy,
           			ApprovedByEmail:ApprovedByEmail,
           			ApprovedByImage:ApprovedByImage,
           			ApprovedDate:ApprovedDate,
           			Modified : ApprovalProcessListUsageData[i].Modified,
           			PriorityImg : PriorityImg,
           			DueDate : DueDate,
           			DueDateStatus:DueDateStatus          			                         
					});
				}
				
				if(executionSequence==3)
				{
	            	GenerateDesign(ApprovalProcessData);
	            }
            }     
        },
        error: function (jqXhr, textStatus, errorThrown)
		{
       		console.log("Error in ReadApprovalTaskListData.");
            console.log(jqXhr.responseJSON.error.message.value);
            var msg = jqXhr.responseJSON.error.message.value;
            var MsgResult =	msg.includes("it exceeds the list view");
            if(MsgResult == true)
            {
            	 var Url = "?$select=*,Author/Name,Author/Title,Author/EMail,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title,UserID/EMail&$expand=UserID,LocationID,DepartmentId,CompanyId,Author&$top=5000";
        			AnalyticalUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTaskList')/items/" + Url;
					ReadAnalyticalUsageData();
            }
        }    
    });
    return dfds.promise();
}


var DocumentApprovalRequestsUsageData = DocumentApprovalRequestsUsageData || [];
function ReadDocumentApprovalRequestsData() 
{
	dfds = $.Deferred(),
    $.ajax({
        url: DocumentApprovalRequestsUsageUrl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
        	FilterState=0; // For filter load state
        	
        	DocumentApprovalRequestsUsageData = DocumentApprovalRequestsUsageData.concat(data.d.results);           
            if (data.d.__next) 
            {
                ApprovalProcessListUsageUrl = data.d.__next;
                ReadDocumentApprovalRequestsData();
            }
            else 
            {	executionSequence = executionSequence + 1;	
            	for(var i=0; i<DocumentApprovalRequestsUsageData.length; i++)
            	{
            		var Title = DocumentApprovalRequestsUsageData[i].Title;
					var CreatedBy=DocumentApprovalRequestsUsageData[i].Author.Title;
					var CreatedByEmail=DocumentApprovalRequestsUsageData[i].Author.EMail;
					var CreatedByPhoto=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +DocumentApprovalRequestsUsageData[i].Author.EMail;
					var RequestDate = moment(DocumentApprovalRequestsUsageData[i].Created).format('DD MMM YYYY');		
					var Category = DocumentApprovalRequestsUsageData[i].DocumentType;
					var StatusImg = '';
						if(DocumentApprovalRequestsUsageData[i].Status== "Rejected"){StatusImg = "../SiteAssets/Approvals/assets/images/rejected-img.png";}
						else if(DocumentApprovalRequestsUsageData[i].Status== "Initiated" || DocumentApprovalRequestsUsageData[i].Status == 'Pending'){StatusImg ="../SiteAssets/Approvals/assets/images/initiated-img.png";}
						else if(DocumentApprovalRequestsUsageData[i].Status== "Approved"){StatusImg ="../SiteAssets/Approvals/assets/images/approved-img.png";}
						else if(DocumentApprovalRequestsUsageData[i].Status== "Forwarded"){StatusImg ="../SiteAssets/Approvals/assets/images/forwarded-img.png";}
					var ActionByDisplay = '';
						if(DocumentApprovalRequestsUsageData[i].Status == "Initiated" || DocumentApprovalRequestsUsageData[i].Status == 'Pending')
						{
							ActionByDisplay = "display:none";
						}
						else
						{
							ActionByDisplay = "display:inline-flex";
						}
						
					var ApprovedBy='';
					var ApprovedByEmail='';
					var ApprovedByImage='';
					var ApprovedDate='';
				
					if(DocumentApprovalRequestsUsageData[i].LastActionbyId != null)
					{	
						ApprovedBy = DocumentApprovalRequestsUsageData[i].LastActionby.Title
						ApprovedByEmail = DocumentApprovalRequestsUsageData[i].LastActionby.EMail
						ApprovedByImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +DocumentApprovalRequestsUsageData[i].LastActionby.EMail;
						//ApprovedDate = moment(ApprovalProcessListUsageData[i].ApprovedDate).format('DD MMM YYYY');
						ApprovedDate = '';
					}

						
					var Status = DocumentApprovalRequestsUsageData[i].Status;
					if(DocumentApprovalRequestsUsageData[i].Status == 'Pending' || DocumentApprovalRequestsUsageData[i].Status == 'Initiated'){Status = 'Initiated';}
					
					/*ApprovalProcessData.push({
    				Title : Title,
       				Type : 'Document Approval',
           			Category : Category,
           			CreatedBy : CreatedBy,
           			CreatedByEmail: CreatedByEmail,
           			RequestDate : RequestDate,
           			CreatedByPhoto : CreatedByPhoto,
           			ReqStatusImg : StatusImg,
           			ReqItemNo:DocumentApprovalRequestsUsageData[i].ID,
           			ListName : 'DocumentApprovalRequests',
           			ListRecNo : DocumentApprovalRequestsUsageData[i].DocumentID,
           			CurrentStep:'',
           			Status :Status,
           			ActionByDisplay:ActionByDisplay,
           			ApprovedBy:ApprovedBy,
           			ApprovedByEmail:ApprovedByEmail,
           			ApprovedByImage:ApprovedByImage,
           			ApprovedDate:ApprovedDate,
           			Modified : DocumentApprovalRequestsUsageData[i].Modified           			                         
					});*/
				}				
				if(executionSequence==3)
				{
            		GenerateDesign(ApprovalProcessData);
            	}
            }     
        },
        error: function (jqXhr, textStatus, errorThrown)
		{
       		console.log("Error in ReadApprovalTaskListData.");
            console.log(jqXhr.responseJSON.error.message.value);
            var msg = jqXhr.responseJSON.error.message.value;
            var MsgResult =	msg.includes("it exceeds the list view");
            if(MsgResult == true)
            {
            	 var Url = "?$select=*,Author/Name,Author/Title,Author/EMail,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title,UserID/EMail&$expand=UserID,LocationID,DepartmentId,CompanyId,Author&$top=5000";
        			AnalyticalUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTaskList')/items/" + Url;
					ReadAnalyticalUsageData();
            }
        }    
    });
    return dfds.promise();
}


function GenerateDesign(Resultdata)
{
	ShowPieChartInbox(Resultdata);	
	var FilteredRec = $.grep(Resultdata, function(v) {
		return v.Status != 'Rejected' && v.Status != 'Approved' && v.Status != 'Forwarded';
	});
	$("#TaskPending").text(FilteredRec.length)	
	$("#WebpartApprovalInbox").empty();
	var UniqueTypeItems = [...new Map(Resultdata.map(item => [item["Type"], item])).values()];
		UniqueTypeItems.sort(function(a,b){return a.Type< b.Type? -1 : 1});
	$("#WebpartApprovalInbox").append($("<option     />").val('ALL').text('ALL'));
	
	for(var i=0; i<UniqueTypeItems.length; i++)
	{
		$("#WebpartApprovalInbox").append($("<option     />").val(UniqueTypeItems[i].Type).text(UniqueTypeItems[i].Type));
	}	
	$("#categoryApprovalInbox").empty();
	var UniqueCategoryItems = [...new Map(Resultdata.map(item => [item["Category"], item])).values()];
		UniqueCategoryItems.sort(function(a,b){return a.Category< b.Category? -1 : 1});
	$("#categoryApprovalInbox").append($("<option     />").val('ALL').text('ALL'));
	for(var i=0; i<UniqueCategoryItems.length; i++)
	{
		$("#categoryApprovalInbox").append($("<option     />").val(UniqueCategoryItems[i].Category).text(UniqueCategoryItems[i].Category));
	}	
	var PendingRecords = $.grep(Resultdata, function(v) {
    	return v.Status == 'Initiated' ;
	});
	var Chips = '<div class="upload-chip">Initiated</div>';
	$('#ApprovalinboxChip').empty().append(Chips);
	PendingRecords.sort(function(a,b){return b.Modified < a.Modified ? -1 : 1});
	
	HTMLTABLEDESIGN(PendingRecords);
}


function HTMLTABLEDESIGN(Resultdata)
{
	var NewTrDesign ='';
	$("#TotalItemscountinbox").text(Resultdata.length);
	var OverDueCounts=0;
	$("#TaskOverdue").text('0');
	for(var i=0; i<Resultdata.length; i++)
	{	var ChkValues=[];
			if(Resultdata[i].ListName == 'ApprovalTaskList')
			{
				if(Resultdata[i].Type == 'Survey')
				{
					ChkValues.push(Resultdata[i].ReqItemNo,Resultdata[i].ListName,Resultdata[i].ListRecNo,Resultdata[i].Type,'0')
				}
				else
				{
					ChkValues.push(Resultdata[i].ReqItemNo,Resultdata[i].ListName,Resultdata[i].ListRecNo,Resultdata[i].Type,Resultdata[i].DepartmentName)
				}
			}
			else
			{
				ChkValues.push(Resultdata[i].ReqItemNo,Resultdata[i].ListName,Resultdata[i].ListRecNo,Resultdata[i].Type,'0')
			}
		var PassChkvalus=ChkValues.toString();	
		if(Resultdata[i].ListName == 'ApprovalTaskList')
		{
			NewTrDesign = NewTrDesign +	"<tr>"+
											"<td>"+
												"<a class='DisplayAction-Anchor' data-target='#contentsApprovalAction' onclick='ActionTaken(this,\"" +PassChkvalus+ "\")'>"+Resultdata[i].Title+"</a>"+
												//"<p class='m0 ellipsis-2'>"+Resultdata[i].Title+"</p>"+
												"<div class='dividsec'>"+
													"<div class='requtbox'>"+
														"<span class='reqtleft'>Request For</span>: <span class='reqtright'>"+Resultdata[i].Category+"</span>"+
													"</div>"+
													"<div class='privorityicon'>"+
														"<img src=''>"+
													"</div>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<p class='m0 ellipsis-2'>"+Resultdata[i].Type+"</p>"+
											"</td>"+
											"<td>"+
												"<div class='approval-dashboard-user-card-panel'>"+
													"<div class='approval-dashboard-user-card-img'>"+
														"<img src='"+Resultdata[i].CreatedByPhoto+"' alt='user' data-themekey='#'>"+
													"</div>"+
													"<div class='approval-dashboard-user-card-info'>"+
														"<div class='approval-dashboard-user-card-name ellipsis-1'>"+Resultdata[i].CreatedBy+"</div>"+
														"<div class='approval-dashboard-user-card-email ellipsis-1'>"+Resultdata[i].CreatedByEmail+"</div>"+
														"<div class='approval-dashboard-user-card-date ellipsis-1'>Date:<span class='ml5'>"+Resultdata[i].RequestDate+"</span></div>"+
													"</div>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<span class='duedatesection'><span class='datebox'></span></span>"+
											"</td>"+
											"<td>"+
												"<div class='text-center'>"+
													"<p class='mt0 mb10'id='Status"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].Status+"</p>"+
													"<img width='25px' src='"+Resultdata[i].ReqStatusImg+"' id='StatusImage"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<div class='text-center'>"+
													"<p class='stpsec'></p>"+
													"<p class='pendingprocess'></p>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<a class='btn custom-btn custom-btn-two' data-target='#contentsApprovalAction' onclick='ActionTaken(this,\"" +PassChkvalus+ "\")'>Action</a>"+
											"</td>"+
										"</tr>";
			/*NewTrDesign = NewTrDesign + "<tr>"+
										"<td>"+
											"<p class='m0 ellipsis-3'>"+Resultdata[i].Title+"</p>"+
										"</td>"+
    									"<td>"+
											"<div class=''>"+
												"<p class='m0 ellipsis-2'>"+Resultdata[i].Type+"</p>"+
											"</div>"+
    									"</td>"+
    									"<td class='text-center'>"+
        									"<p class='m-0 ellipsis-2'>"+Resultdata[i].Category+"</p>"+
    									"</td>"+
    									"<td>"+
											"<div class='approval-dashboard-user-card-panel'>"+
												"<div class='approval-dashboard-user-card-img'>"+
													"<img src='"+Resultdata[i].CreatedByPhoto+"' alt='user'>"+
            									"</div>"+
            									"<div class='approval-dashboard-user-card-info'>"+
													"<div class='approval-dashboard-user-card-name ellipsis-1'>"+Resultdata[i].CreatedBy+"</div>"+
                									"<div class='approval-dashboard-user-card-email ellipsis-1'>"+Resultdata[i].CreatedByEmail+"</div>"+
                									"<div class='approval-dashboard-user-card-date ellipsis-1'>Date:<span class='ml5'>"+Resultdata[i].RequestDate+"</span></div>"+
            									"</div>"+
        									"</div>"+
    									"</td>"+
    									"<td class='text-center'>"+
											"<div class='text-center'>"+
												"<p class='mt0 mb10' id='Status"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].Status+"</p>"+
            									"<img width='25px' src='"+Resultdata[i].ReqStatusImg+"' id='StatusImage"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
											"</div>"+
    									"</td>"+
    									"<td class='text-center'>"+
											"<div class='text-center'>"+
												"<p class='mt0 mb10' id='CurrentStep"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].CurrentStep+"</p>"+            									
												"<img width='25px' src='' id='CurrentStepStatusImage"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
											"</div>"+
    									"</td>"+
    									"<td>"+
											"<div class='approval-dashboard-user-card-panel' id='ActionDiv"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"' style='"+Resultdata[i].ActionByDisplay +"'>"+
												"<div class='approval-dashboard-user-card-img'>"+
													"<img src='"+Resultdata[i].ApprovedByImage+"' alt='user' id='Approvedby"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
												"</div>"+
												"<div class='approval-dashboard-user-card-info'>"+
													"<div class='approval-dashboard-user-card-name ellipsis-1' id='ApprovedByTitle"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].ApprovedBy+"</div>"+
                									"<div class='approval-dashboard-user-card-email ellipsis-1' id='ApprovedByEmail"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].ApprovedByEmail+"</div>"+
                									"<div class='approval-dashboard-user-card-date ellipsis-1'>Date:<span class='ml5' id='ApprovedDate"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].ApprovedDate+"</span></div>"+
            									"</div>"+
        									"</div>"+
    									"</td>"+
    									"<td class='text-center vertical-align-middle'>"+
										  //"<a class='btn custom-btn custom-btn-two' data-toggle='modal' data-target='#contentsApprovalAction' onclick='ActionTaken(this,\"" +PassChkvalus+ "\")'>Action</a>"+
											"<a class='btn custom-btn custom-btn-two' data-target='#contentsApprovalAction' onclick='ActionTaken(this,\"" +PassChkvalus+ "\")'>Action</a>"+
										"</td>"+
									"</tr>";
									*/
		}									
		else if(Resultdata[i].ListName == 'DocumentApprovalRequests1') // Change DocumentApprovalRequests1 to DocumentApprovalRequests to start.
		{
			NewTrDesign = NewTrDesign +	"<tr>"+
											"<td>"+
												"<p class='m0 ellipsis-2'>"+Resultdata[i].Title+"</p>"+
												"<div class='dividsec'>"+
													"<div class='requtbox'>"+
														"<span class='reqtleft'>Request For</span>: <span class='reqtright'>"+Resultdata[i].Category+"</span>"+
													"</div>"+
													"<div class='privorityicon'>"+
														"<img src=''>"+
													"</div>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<p class='m0 ellipsis-2'>"+Resultdata[i].Type+"</p>"+
											"</td>"+
											"<td>"+
												"<div class='approval-dashboard-user-card-panel'>"+
													"<div class='approval-dashboard-user-card-img'>"+
														"<img src='"+Resultdata[i].CreatedByPhoto+"' alt='user' data-themekey='#'>"+
													"</div>"+
													"<div class='approval-dashboard-user-card-info'>"+
														"<div class='approval-dashboard-user-card-name ellipsis-1'>"+Resultdata[i].CreatedBy+"</div>"+
														"<div class='approval-dashboard-user-card-email ellipsis-1'>"+Resultdata[i].CreatedByEmail+"</div>"+
														"<div class='approval-dashboard-user-card-date ellipsis-1'>Date:<span class='ml5'>"+Resultdata[i].RequestDate+"</span></div>"+
													"</div>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<span class='duedatesection'><span class='datebox'></span></span>"+
											"</td>"+
											"<td>"+
												"<div class='text-center'>"+
													"<p class='mt0 mb10'id='Status"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].Status+"</p>"+
													"<img width='25px' src='"+Resultdata[i].ReqStatusImg+"' id='StatusImage"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<div class='text-center'>"+
													"<p class='stpsec'></p>"+
													"<p class='pendingprocess'></p>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<a class='btn custom-btn custom-btn-two'>Action</a>"+
											"</td>"+
										"</tr>";

			/*NewTrDesign = NewTrDesign + "<tr>"+										
										"<td>"+
											"<p class='m0 ellipsis-3'>"+Resultdata[i].Title+"</p>"+
										"</td>"+
    									"<td>"+
											"<div class=''>"+
												"<p class='m0 ellipsis-2'>"+Resultdata[i].Type+"</p>"+
											"</div>"+
    									"</td>"+
    									"<td class='text-center'>"+
        									"<p class='m-0 ellipsis-2'>"+Resultdata[i].Category+"</p>"+
    									"</td>"+
    									"<td>"+
											"<div class='approval-dashboard-user-card-panel'>"+
												"<div class='approval-dashboard-user-card-img'>"+
													"<img src='"+Resultdata[i].CreatedByPhoto+"' alt='user'>"+
            									"</div>"+
            									"<div class='approval-dashboard-user-card-info'>"+
													"<div class='approval-dashboard-user-card-name ellipsis-1'>"+Resultdata[i].CreatedBy+"</div>"+
                									"<div class='approval-dashboard-user-card-email ellipsis-1'>"+Resultdata[i].CreatedByEmail+"</div>"+
                									"<div class='approval-dashboard-user-card-date ellipsis-1'>Date:<span class='ml5'>"+Resultdata[i].RequestDate+"</span></div>"+
            									"</div>"+
        									"</div>"+
    									"</td>"+
    									"<td class='text-center'>"+
											"<div class='text-center'>"+
												"<p class='mt0 mb10' id='Status"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].Status+"</p>"+
            									"<img width='25px' src='"+Resultdata[i].ReqStatusImg+"' id='StatusImage"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
											"</div>"+
    									"</td>"+
    									"<td class='text-center'>"+
											"<div class='text-center'>"+
												"<p class='mt0 mb10' id='CurrentStep"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].CurrentStep+"</p>"+
												"<img width='25px' src='' id='CurrentStepStatusImage"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+            									
											"</div>"+
    									"</td>"+
    									"<td>"+
											"<div class='approval-dashboard-user-card-panel' id='ActionDiv"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"' style='"+Resultdata[i].ActionByDisplay +"'>"+
												"<div class='approval-dashboard-user-card-img'>"+
													"<img src='"+Resultdata[i].ApprovedByImage+"' alt='user' id='Approvedby"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
												"</div>"+
												"<div class='approval-dashboard-user-card-info'>"+
													"<div class='approval-dashboard-user-card-name ellipsis-1' id='ApprovedByTitle"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].ApprovedBy+"</div>"+
                									"<div class='approval-dashboard-user-card-email ellipsis-1' id='ApprovedByEmail"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].ApprovedByEmail+"</div>"+
                									"<div class='approval-dashboard-user-card-date ellipsis-1'>Date:<span class='ml5' id='ApprovedDate"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].ApprovedDate+"</span></div>"+
            									"</div>"+
        									"</div>"+
    									"</td>"+
    									"<td class='text-center vertical-align-middle'>"+
											"<a class='btn custom-btn custom-btn-two' data-toggle='modal' data-target='#documentApprovalAction' onclick='ActionTaken(this,\"" +PassChkvalus+ "\")'>Action</a>"+
										"</td>"+
									"</tr>";*/

		}
		else if(Resultdata[i].ListName == 'ApprovalProcessList')
		{
			var dateColor = '';
			
			if(Resultdata[i].DueDateStatus == true && Resultdata[i].Status == 'Initiated')
			{
				dateColor = 'DueDate';
				OverDueCounts = OverDueCounts+1;
			}
			$("#TaskOverdue").text(OverDueCounts);

			NewTrDesign = NewTrDesign +	"<tr>"+
											"<td>"+
												"<a class='DisplayAction-Anchor' data-toggle='modal' data-target='#processApprovalAction' onclick='ActionTaken(this,\"" +PassChkvalus+ "\")'>"+Resultdata[i].Title+"</a>"+
												//"<p class='m0 ellipsis-2'>"+Resultdata[i].Title+"</p>"+
												"<div class='dividsec'>"+
													"<div class='requtbox'>"+
														"<span class='reqtleft'>Request For</span>: <span class='reqtright'>"+Resultdata[i].Category+"</span>"+
													"</div>"+
													"<div class='privorityicon'>"+
														"<img src='"+Resultdata[i].PriorityImg+"'>"+
													"</div>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<p class='m0 ellipsis-2'>"+Resultdata[i].Type+"</p>"+
											"</td>"+
											"<td>"+
												"<div class='approval-dashboard-user-card-panel'>"+
													"<div class='approval-dashboard-user-card-img'>"+
														"<img src='"+Resultdata[i].CreatedByPhoto+"' alt='user' data-themekey='#'>"+
													"</div>"+
													"<div class='approval-dashboard-user-card-info'>"+
														"<div class='approval-dashboard-user-card-name ellipsis-1'>"+Resultdata[i].CreatedBy+"</div>"+
														"<div class='approval-dashboard-user-card-email ellipsis-1'>"+Resultdata[i].CreatedByEmail+"</div>"+
														"<div class='approval-dashboard-user-card-date ellipsis-1'>Date:<span class='ml5'>"+Resultdata[i].RequestDate+"</span></div>"+
													"</div>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<span class='duedatesection "+dateColor+"'><span class='datebox'>"+Resultdata[i].DueDate+"</span></span>"+
											"</td>"+
											"<td>"+
												"<div class='text-center'>"+
													"<p class='mt0 mb10' id='Status"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].Status+"</p>"+
													"<img width='25px' src='"+Resultdata[i].ReqStatusImg+"' id='StatusImage"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<div class='text-center'>"+
													"<p class='stpsec' id='CurrentStep"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].CurrentStep+"</p>"+
													"<p class='pendingprocess'></p>"+
												"</div>"+
											"</td>"+
											"<td>"+
												"<a class='btn custom-btn custom-btn-two' data-toggle='modal' data-target='#processApprovalAction' onclick='ActionTaken(this,\"" +PassChkvalus+ "\")'>Action</a>"+
											"</td>"+
										"</tr>";

			/*NewTrDesign = NewTrDesign + "<tr>"+
										"<td>"+
											"<p class='m0 ellipsis-3'>"+Resultdata[i].Title+"</p>"+
										"</td>"+
    									"<td>"+
											"<div class=''>"+
												"<p class='m0 ellipsis-2'>"+Resultdata[i].Type+"</p>"+
											"</div>"+
    									"</td>"+
    									"<td class='text-center'>"+
        									"<p class='m-0 ellipsis-2'>"+Resultdata[i].Category+"</p>"+
    									"</td>"+
    									"<td>"+
											"<div class='approval-dashboard-user-card-panel'>"+
												"<div class='approval-dashboard-user-card-img'>"+
													"<img src='"+Resultdata[i].CreatedByPhoto+"' alt='user'>"+
            									"</div>"+
            									"<div class='approval-dashboard-user-card-info'>"+
													"<div class='approval-dashboard-user-card-name ellipsis-1'>"+Resultdata[i].CreatedBy+"</div>"+
                									"<div class='approval-dashboard-user-card-email ellipsis-1'>"+Resultdata[i].CreatedByEmail+"</div>"+
                									"<div class='approval-dashboard-user-card-date ellipsis-1'>Date:<span class='ml5'>"+Resultdata[i].RequestDate+"</span></div>"+
            									"</div>"+
        									"</div>"+
    									"</td>"+
    									"<td class='text-center'>"+
											"<div class='text-center'>"+
												"<p class='mt0 mb10' id='Status"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].Status+"</p>"+
            									"<img width='25px' src='"+Resultdata[i].ReqStatusImg+"' id='StatusImage"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
											"</div>"+
    									"</td>"+
    									"<td class='text-center'>"+
											"<div class='text-center'>"+
												"<p class='mt0 mb10' id='CurrentStep"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].CurrentStep+"</p>"+
												"<img width='25px' src='' id='CurrentStepStatusImage"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+            									
											"</div>"+
    									"</td>"+
    									"<td>"+
											"<div class='approval-dashboard-user-card-panel' id='ActionDiv"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"' style='"+Resultdata[i].ActionByDisplay +"'>"+
												"<div class='approval-dashboard-user-card-img'>"+
													"<img src='"+Resultdata[i].ApprovedByImage+"' alt='user' id='Approvedby"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+
												"</div>"+
												"<div class='approval-dashboard-user-card-info'>"+
													"<div class='approval-dashboard-user-card-name ellipsis-1' id='ApprovedByTitle"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].ApprovedBy+"</div>"+
                									"<div class='approval-dashboard-user-card-email ellipsis-1' id='ApprovedByEmail"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].ApprovedByEmail+"</div>"+
                									"<div class='approval-dashboard-user-card-date ellipsis-1'>Date:<span class='ml5' id='ApprovedDate"+Resultdata[i].ListName+""+Resultdata[i].ReqItemNo+"'>"+Resultdata[i].ApprovedDate+"</span></div>"+
            									"</div>"+
        									"</div>"+
    									"</td>"+
    									"<td class='text-center vertical-align-middle'>"+
											"<a class='btn custom-btn custom-btn-two' data-toggle='modal' data-target='#processApprovalAction' onclick='ActionTaken(this,\"" +PassChkvalus+ "\")'>Action</a>"+
										"</td>"+
									"</tr>";*/
		}
	}
	
	$(".mainDivAllInbox").empty().append(NewTrDesign);
	
	var overDueRecords = $.grep(ApprovalProcessData, function(v) {
    	return v.DueDateStatus == true ;
	});
	$("#TaskOverdue").text(overDueRecords.length);

	var PendingRecords = $.grep(ApprovalProcessData, function(v) {
    	return v.Status == 'Initiated' ;
	});
	$("#TaskPending").text(PendingRecords.length);
	$("#TaskPending").text(parseInt($("#TaskPending").text() - overDueRecords.length));
	TableConfigurationInbox();
}


function ItemExistOrNot(Action)
{
	var ListName = ListNameByProcessType(Action.split(',')[2],Action.split(',')[3]);
	if(ListName.split(',')[0] == 'Questions_Master')
	{		
        var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName.split(',')[0]+"')/items?$filter=ID eq '"+ListName.split(',')[1]+"' ";
    	var QueryResult = getdata(Query);
    	
    	if(QueryResult.length==0)
    	{
    		alert('Record has been deleted by user.');
    		$('#contentsApprovalAction').modal('hide');
    	}
    	else{$('#contentsApprovalAction').modal('show');}
    	
	}
	else if(ListName.split(',')[0] == 'MainPollsList')
	{		
        var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName.split(',')[0]+"')/items?$filter=ID eq '"+ListName.split(',')[1]+"' ";
    	var QueryResult = getdata(Query);
    	
    	if(QueryResult.length==0)
    	{
    		alert('Record has been deleted by user.');
    		$('#contentsApprovalAction').modal('hide');
    	}
    	else{$('#contentsApprovalAction').modal('show');}
    	
	}
	else if(ListName.split(',')[0] == 'Announcements')
	{		
        var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName.split(',')[0]+"')/items?$filter=ID eq '"+ListName.split(',')[1]+"' ";
    	var QueryResult = getdata(Query);
    	
    	if(QueryResult.length==0)
    	{
    		alert('Record has been deleted by user.');
    		$('#contentsApprovalAction').modal('hide');
		}
    	else{$('#contentsApprovalAction').modal('show');}
    	    
    }
    else if(ListName.split(',')[0] == 'Activity')
	{		       
		var Query =  titanForWork.getQueryStringParameter("CompanySiteUrl")+ "/_api/web/lists/getbytitle('"+ListName.split(',')[0]+"')/items?$filter=ID eq '"+ListName.split(',')[1]+"' ";
    	var QueryResult = getdata(Query);
    	
    	if(QueryResult.length==0)
    	{
    		alert('Record has been deleted by user.');
    		$('#contentsApprovalAction').modal('hide');
		}
    	else{$('#contentsApprovalAction').modal('show');}   	    
    }
    else if(ListName.split(',')[0] == 'Event')
	{			
		var Query =  titanForWork.getQueryStringParameter("CompanySiteUrl")+ "/_api/web/lists/getbytitle('"+ListName.split(',')[0]+"')/items?$filter=ID eq '"+ListName.split(',')[1]+"' ";
    	var QueryResult = getdata(Query);
    	
    	if(QueryResult.length==0)
    	{
    		alert('Record has been deleted by user.');
    		$('#contentsApprovalAction').modal('hide');
		}
    	else{$('#contentsApprovalAction').modal('show');}   	    
    }
    else if(ListName.split(',')[0] == 'DepartmentalDMS')
	{		       
		var Query =  titanForWork.getQueryStringParameter("CompanySiteUrl")+'/'+Action.split(',')[4]+ "/_api/web/lists/getbytitle('"+ListName.split(',')[0]+"')/items?$filter=ID eq '"+ListName.split(',')[1]+"' ";
    	var QueryResult = getdata(Query);
    	
    	if(QueryResult.length==0)
    	{
    		alert('Record has been deleted by user.');
    		$('#contentsApprovalAction').modal('hide');
    	} 
    	else{$('#contentsApprovalAction').modal('show');}  	    
    }
	else
	{
		alert("Defination not defined!");
	}
}


var ApproversListNotify='';
var ApproversList='';
var ActiveTemplateID=0; // For Process Approval.
function ActionTaken(Action,PassingValues)
{
	ActiveTemplateID=0;
	ApproversList ='';
	ApproversListNotify = '';
	$('#OpenWebpage').attr('src', '');
		$("#RejectApproveRemark").val('');
		$("#RemarksApprovalContent").val('');
		$("#MailText").val('');//ForwardRemark
		$("#ForwardRemark").val('');//ForwardRemark
		$('#RejectApproveChkBox').prop('checked', false);
		$('#ApprovedChkbox').prop('checked', false);
		$('#ForwardApprovalChkBTN').prop('checked', false);
	if(Action.dataset.target == "#contentsApprovalAction")
	{
		$("#SignatureBox").css("display", "none");
		if(InBoxType == 'InBox')
		{
			$("#ContentApprovalBtn").css("display", "block");
			$("#ContentRejectBtn").css("display", "block");
			$("#ContentForwardBtn").css("display", "block");
		}
		else
		{
			$("#ContentApprovalBtn").css("display", "none");
			$("#ContentRejectBtn").css("display", "none");
			$("#ContentForwardBtn").css("display", "none");
		}
		
		
		var DepartmentUrl='';
		var ListNameItemNo = ListNameByProcessType(PassingValues.split(',')[2], PassingValues.split(',')[3]);
		if(PassingValues.split(',')[3] != 'Departmental Documents')
		{
			var pageLink = PageNameByProcessType(PassingValues.split(',')[2], PassingValues.split(',')[3]);
			if(PassingValues.split(',')[3] != "Departmental Documents")
			{
				$('#OpenWebpage').attr('src', pageLink);
			}
			
			
			if(PassingValues.split(',')[3] == "Departmental Documents")
			{
				DisplayFileProperty(PassingValues,ListNameItemNo);
			}
		}
		else
		{
			var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=*&$filter=DepartmentName eq '"+PassingValues.split(',')[4]+"' and CompanyID eq '"+Logged_CompanyId+"'";
    		var QueryResult = getdata(Query);
    		
    		if(QueryResult.length>0)
    		{
    			DepartmentUrl = QueryResult[0].SiteURL;
    			var Query =  DepartmentUrl + "/_api/web/lists/getbytitle('DepartmentalDMS')/items?$select=*&$filter=ID eq '"+PassingValues.split(',')[2]+"'";
    			var QueryResult = getdata(Query);
    			if(QueryResult.length>0)
    			{
    				DocumentUrl = QueryResult[0].ServerRedirectedEmbedUrl;
    				DocumentUrl = DocumentUrl.split('interactivepreview')[0]+'embedview';
    				$('#OpenWebpage').attr('src', DocumentUrl);
				}
    		}	
		}
		$('#ApprovalSubmitBTN').attr('name', PassingValues);//RejectApproveModel
    	$('#ApprovalSubmitBTN').attr('hreflang', ListNameItemNo);
    	
    	$('#RejectApproveModel').attr('name', PassingValues);//ForwardRecordsBtn
    	$('#RejectApproveModel').attr('hreflang', ListNameItemNo);
    	
    	$('#ForwardRecordsBtn').attr('name', PassingValues);//ForwardRecordsBtn
    	$('#ForwardRecordsBtn').attr('hreflang', ListNameItemNo);
    	
    	$('#ProcessSendEmailsbtn').attr('name', PassingValues);//ForwardRecordsBtn
    	$('#ProcessSendEmailsbtn').attr('hreflang', ListNameItemNo); 	 	

		var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+PassingValues.split(',')[1]+"')/items?$select=*,Approvers/Title,Approvers/EMail,Author/Title,Author/EMail&$expand=Approvers,Author&$filter=ID eq '"+PassingValues.split(',')[0]+"' ";
    	var QueryResult = getdata(Query);
    	
    	if(QueryResult.length>0)
    	{
    		var StatusImg = '';
				if(QueryResult[0].Status== "Rejected"){StatusImg = "../SiteAssets/Approvals/assets/images/rejected-img.png";}
				else if(QueryResult[0].Status== "Initiated" || QueryResult[0].Status == 'Pending'){StatusImg ="../SiteAssets/Approvals/assets/images/initiated-img.png";}
				else if(QueryResult[0].Status== "Approved"){StatusImg ="../SiteAssets/Approvals/assets/images/approved-img.png";}
				else if(QueryResult[0].Status== "Forwarded"){StatusImg ="../SiteAssets/Approvals/assets/images/forwarded-img.png";}
			$('#StatusModelimg').attr('src', StatusImg);
			$("#RemarkModel").text('');
			
			
			if(QueryResult[0].Remarks !=null)
			{
				$("#RemarkModel").text(QueryResult[0].Remarks);
			}
			var WebPartname='';
			if(QueryResult[0].WebpartName == 'Polls')
			{
				WebPartname = 'Survey';
			}
			else if(QueryResult[0].WebpartName == 'Poll')
			{
				WebPartname = 'Survey';
			}
			else if(QueryResult[0].WebpartName == 'Survey')
			{
				WebPartname = 'Survey';
			}
			else
			{
				WebPartname = QueryResult[0].WebpartName;
			}
			
    		$("#Title").text(QueryResult[0].Title);
    		$("#Type").text(WebPartname);
    		$("#Category").text(QueryResult[0].Category);
    		$("#StatusModel").text(QueryResult[0].Status);
    		$("#AuthorName").text(QueryResult[0].Author.Title);
    		$("#AuthorEmail").text(QueryResult[0].Author.EMail);
    		$("#ReqDate").text(moment(QueryResult[0].Created).format('DD MMM YYYY'));
    		var CreatedByPhoto=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +QueryResult[0].Author.EMail;
    		$('#AuthorImage').attr('src', CreatedByPhoto);
    		
    		var ApproversDesign='';
    		ApproversList = QueryResult[0].ApproversId.results;
    		ApproversListNotify = QueryResult[0].ApproversId.results;
    		ApproversListNotify = jQuery.grep(ApproversListNotify, function(value) {
  				return value != _spPageContextInfo.userId;
			});
			
    		for(var i=0; i<QueryResult[0].Approvers.results.length; i++)
    		{    			
    			var ApproversImg=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +QueryResult[0].Approvers.results[i].EMail;
    			ApproversDesign = ApproversDesign + "<div class='col-md-6 col-sm-6'>"+
                            							"<div class='members-card border-0'>"+
							                            	"<div class='members-card-head'>"+
                                    							"<img src='"+ApproversImg+"'>"+
                                							"</div>"+
                                							"<div class='members-card-body'>"+
                                    							"<div class='members-card-body-info text-ellipsis'>"+
                                        							"<h3 class='member-name text-ellipsis'>"+QueryResult[0].Approvers.results[i].Title+"</h3>"+
                                        							"<p class='member-email text-ellipsis mb0'>"+QueryResult[0].Approvers.results[i].EMail+"</p>"+
                                    							"</div>"+
                                    							//"<button class='btn remove-group-btn remove-btn close close-round'><i class='fa fa-times'></i></button>"+
                                							"</div>"+
                            							"</div>"+
                        							"</div>";
    		}
    		$("#ForwardUsersList").empty().append(ApproversDesign);
    		
    		var ApproversDesignNotify ='';
    		for(var i=0; i<ApproversListNotify.length; i++)
    		{    
    			var UserDtls = fnGetUserProps(ApproversListNotify[i]);    						
    			var ApproversImg=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +UserDtls.d.Email;
    			ApproversDesignNotify = ApproversDesignNotify + "<div class='col-md-6 col-sm-6'>"+
                            							"<div class='members-card border-0'>"+
							                            	"<div class='members-card-head'>"+
                                    							"<img src='"+ApproversImg+"'>"+
                                							"</div>"+
                                							"<div class='members-card-body'>"+
                                    							"<div class='members-card-body-info text-ellipsis'>"+
                                        							"<h3 class='member-name text-ellipsis'>"+UserDtls.d.Title+"</h3>"+
                                        							"<p class='member-email text-ellipsis mb0'>"+UserDtls.d.Email+"</p>"+
                                    							"</div>"+
                                    							//"<button class='btn remove-group-btn remove-btn close close-round'><i class='fa fa-times'></i></button>"+
                                							"</div>"+
                            							"</div>"+
                        							"</div>";
    		}    		
    		$("#NotificationUsersList").empty().append(ApproversDesignNotify);    		
		}
		ItemExistOrNot(PassingValues);
	}
	else if(Action.dataset.target == "#processApprovalAction")
	{
		if(InBoxType == 'OutBox')
		{
			$("#ProcessApproveDiv").css("display", "none");
			$("#ProcessRejectDiv").css("display", "none");
			$("#ProcessForwardDiv").css("display", "none");
		}
		else
		{
			$("#ProcessApproveDiv").css("display", "block");
			$("#ProcessRejectDiv").css("display", "block");
			$("#ProcessForwardDiv").css("display", "block");
		}
		$("#SignatureBox").css("display", "block");
		$('#OpenWebpage').attr('src', '');
		$("#RejectApproveRemark").val('');
		$("#RemarksApprovalContent").val('');
		$("#MailText").val('');//ForwardRemark
		$("#ForwardRemark").val('');//ForwardRemark
		$('#RejectApproveChkBox').prop('checked', false);
		$('#ApprovedChkbox').prop('checked', false);
		$('#ForwardApprovalChkBTN').prop('checked', false);
		
		var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessList')/items?$select=*,AttachmentFiles,TemplateID/Title,Approvers/Title,Approvers/EMail,Author/Title,Author/EMail&$expand=AttachmentFiles,TemplateID,Approvers,Author&$filter=ID eq '"+PassingValues.split(',')[0]+"' ";
    	var QueryResult = getdata(Query); 
    	   	
    	var Title='';
    	var Template='';
    	var Priority='';
    	var DueDate='Not defined';
    	var Status = 'Initiated';
    	$("#ProcessApprovalFormSetup").empty();
		$("#ApprovalSignatureArea").empty();		    	    	 
    	if(QueryResult.length>0)
    	{
    		if(InBoxType == 'InBox')
    		{
    			if(QueryResult[0].Status == 'Approved')
    			{
    				$("#ProcessApproveDiv").css("display", "none");
					$("#ProcessRejectDiv").css("display", "none");
					$("#ProcessForwardDiv").css("display", "none");
    			}
    			else
    			{
    				$("#ProcessApproveDiv").css("display", "block");
					$("#ProcessRejectDiv").css("display", "block");
					$("#ProcessForwardDiv").css("display", "block");    			
    			}
    		}
    		$("#CurrentStep").text(QueryResult[0].CurrentStep);
    		$('#CurrentStepStatusImgProcessApproval').attr('src', '');
    		ActiveTemplateID = QueryResult[0].ID;
    		if(QueryResult[0].TemplateIDId != null)
    		{
    			
    		}
    		var AttachmentDesign='';
    		if(QueryResult[0].AttachmentFiles.results.length>0)
    		{
    			for(var j=0; j<QueryResult[0].AttachmentFiles.results.length; j++)
    			{
    				AttachmentDesign = AttachmentDesign +	"<div class='upload-chip'>"+
    															"<a href='"+QueryResult[0].AttachmentFiles.results[j].ServerRelativeUrl+"' target='_blank'>"+
																	"<i class='fa fa-paperclip'></i>"+
																	"<span>"+QueryResult[0].AttachmentFiles.results[j].FileName+"</span>"+
																	"<i class='fa fa-eye'></i>"+
																"</a>"+
															"</div>";    		
    			}
    		}
    		$("#AttachmentProcessApproval").empty().append(AttachmentDesign);
    		
    		if(QueryResult[0].TemplateIDId != null)
    		{
    			$("#LogoProcessApproval").attr("src",'');
    			$("#TitleProcessApproval").text('');
    			var QueryProcessMaster =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessMaster')/items?$select=*&$filter=ID eq '"+QueryResult[0].TemplateIDId+"' ";
    			var ResultProcessMaster = getdata(QueryProcessMaster );
    			
    			var PageColumn=0;
    			if(ResultProcessMaster.length>0)
    			{
    				$("#LogoProcessApproval").attr("src",ResultProcessMaster[0].FileIcon.Url);
    				$("#TitleProcessApproval").text(ResultProcessMaster[0].Title);
    				PageColumn = ResultProcessMaster[0].PageColumn
    			}    		
    		}
    		if(QueryResult[0].TemplateIDId != null)
    		{
    			var QueryProcessTemplateSetup =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateSetup')/items?$select=*&$filter=TemplateID eq '"+QueryResult[0].TemplateIDId+"'&$orderby=SequenceNo asc";
    			var ResultProcessTemplateSetup = getdata(QueryProcessTemplateSetup);
    			var FormDesign='';
    			var FormTableData=[];
    			if(ResultProcessTemplateSetup.length>0)
    			{    				
    				for(var i=0; i<ResultProcessTemplateSetup.length; i++)
    				{
    					var ColName = ResultProcessTemplateSetup[i].ColumnName;
    					if(ColName == "Header")
    					{
    						FormDesign = FormDesign + 	"<div class='col-md-12 col-sm-12 col-xs-12'>"+
															"<div class='section-heading-panel'>"+ResultProcessTemplateSetup[i].Title+":</div>"+
														"</div>";
						}
						else if(ColName == "Note")
						{
							FormDesign = FormDesign + 	"<div class='col-md-12 col-sm-12 col-xs-12'>"+
															"<div class='form-group custom-form-group'>"+
																"<label><strong>"+ResultProcessTemplateSetup[i].Title+":</strong></label>"+
																"<div>"+ResultProcessTemplateSetup[i].FixedText+"</div>"+
															"</div>"+
														"</div>";						
						}											
						else if(ColName == "Table")
						{	
							FormTableData.push(ResultProcessTemplateSetup[i].ID);
							FormDesign = FormDesign +	"<div class='col-md-12 col-sm-12 col-xs-12'>"+
															"<div class='table-responsive scrollbar-panel mb15'>"+
																"<table class='table custom-table custom-table-border'>"+
																	"<thead id='THEAD-"+ResultProcessTemplateSetup[i].ID+"'>"+
																	"</thead>"+
																	"<tbody id='TBODY-"+ResultProcessTemplateSetup[i].ID+"'>"+																	
																	"</tbody>"+
																"</table>"+
															"</div>"+
														"</div>";							
						}
						else
						{						   					
    						var ColumnValue = '';
    							ColumnValue = ColumnValueByColumnName(QueryResult,ColName)
    							
    						if(ColName == 'Yes/No')
    						{
    							if(ColumnValue == true)
    							{
    								ColumnValue = 'Yes';
    							}
    							else
    							{
    								ColumnValue = 'No';
    							}
    						}
    						var COLMD=12;
    						if(PageColumn == '0'){COLMD = 12 }
    						else if(PageColumn == '1'){COLMD = 12}
    						else if(PageColumn == '2'){COLMD = 6}
    						else if(PageColumn == '3'){COLMD = 4}
    						    					
					    	if(ResultProcessTemplateSetup[i].ColumnType == "Multiline")
							{
								FormDesign = FormDesign +	"<div class='col-md-12 col-sm-12 col-xs-12'>"+
																"<div class='form-group custom-form-group'>"+
																	"<label><strong>"+ResultProcessTemplateSetup[i].Title+":</strong></label>"+
																	"<div class='form-control' style='height:100% !important'>"+ColumnValue+"</div>"+
																"</div>"+
															"</div>";						
							}
							else if(ResultProcessTemplateSetup[i].ColumnType == "Checkbox")
							{
								var checkboxProp = '';
								if(ColumnValue == true)
								{
									checkboxProp  = 'checked';
								}
								FormDesign = FormDesign +	"<div class='col-md-"+COLMD+" col-sm-6 col-xs-12'>"+
																"<div class='checkbox new-req-check-box-height'>"+
						  											"<label><input type='checkbox' value='' "+checkboxProp+">"+ResultProcessTemplateSetup[i].Title+"</label>"+
																"</div>"+
															"</div>";
							}
							else
							{						         				
								FormDesign = FormDesign + 	"<div class='col-md-"+COLMD+" col-sm-6 col-xs-12'>"+
																"<div class='form-group custom-form-group'>"+
																	"<label><strong>"+ResultProcessTemplateSetup[i].Title+":</strong></label>"+
																	"<input type='text' class='form-control' name=''readonly='readonly' value='"+ColumnValue+"'>"+
																"</div>"+
															"</div>"; 
							}
						}   					
    				}    				    				
    			}
    			
    			$("#ProcessApprovalFormSetup").empty().append(FormDesign);				
    			
    			if(FormTableData.length>0)
    			{
    				for(var j=0; j<FormTableData.length; j++)
    				{    			
    					var ApprovalTemplateTableSetup =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateTable')/items?$select=*&$filter=SetupID eq '"+FormTableData[j]+"'&$orderby=SequenceNo asc";
    					var ResultApprovalTemplateTable = getdata(ApprovalTemplateTableSetup);
    					var th = "<th></th>";							
						var thead='<tr>';
						var tbody='';
						var td='';
						thead = thead + "<th>#</th>";							
						for(var x=0;x<ResultApprovalTemplateTable.length+1;x++)
						{
        					if(x < ResultApprovalTemplateTable.length)
        					{
        						if(ResultApprovalTemplateTable[x].ColumnType == 'Number')
        						{
        							thead = thead + "<th class=for-calculated-value>"+ResultApprovalTemplateTable[x].Title+"</th>";
        						}
        						else
        						{
        							thead = thead + "<th>"+ResultApprovalTemplateTable[x].Title+"</th>";
        						}
        					}
        					else
        					{
        						thead = thead + "</tr>";
        					}
        				}        				
        				$("#THEAD-"+FormTableData[j]).html(thead);

        				var ApprovalTemplateListTable =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessListTable')/items?$select=*&$filter=SetupID eq '"+FormTableData[j]+"'&$orderby=ID asc";
    					var ResultApprovalListTable = getdata(ApprovalTemplateListTable);
        				if(ResultApprovalListTable.length>0)
        				{
        					var tbody='<tr>';
							var td='';
							var ColumnValuesTotal=[];
							var CounterSeq=0;
        					for(var k=0; k<ResultApprovalListTable.length; k++)
        					{   
        						CounterSeq = CounterSeq+1;
        						tbody = tbody+ "<td>"+CounterSeq+"</td>";     						
        						for(var x=0;x<ResultApprovalTemplateTable.length+1;x++)
								{									
        							if(x < ResultApprovalTemplateTable.length)
        							{        								
        								if(ResultApprovalTemplateTable[x].ColumnName != null)
        								{
        									var ClassName = '';
        									if(ResultApprovalTemplateTable[x].ColumnType == 'Number')
        									{
        										ClassName = 'class=for-calculated-value';        										
        									}       								
        									if(ResultApprovalTemplateTable[x].NeedTotal == true && ResultApprovalTemplateTable[x].ColumnType == 'Number')
        									{
        										var ColumnName=ResultApprovalTemplateTable[x].Title;        								
        										ColumnValuesTotal.push({ Column:ColumnName, Total:ColumnValueByColumnNameforTable(ResultApprovalListTable, ResultApprovalTemplateTable[x].ColumnName,k), TableId:FormTableData[j], ColIndex:x, });
        									}       								
        									tbody = tbody+ "<td "+ClassName+">"+ColumnValueByColumnNameforTable(ResultApprovalListTable, ResultApprovalTemplateTable[x].ColumnName,k) +"</td>";
        								}
        								else
        								{
        									if(ResultApprovalTemplateTable[x].CalculatedValue == true)
        									{
        										var Condition = ResultApprovalTemplateTable[x].Formula;
        											Condition = Condition.split(',');
        										if(Condition.length>0)
        										{
        											var NewExp='';
        											for(var q=0; q<Condition.length; q++)
        											{
        												NewExp = NewExp+ColumnValueByColumnNameforTableEquation(ResultApprovalListTable,Condition[q],k)
        											}        											
        											if(isMathExpression(NewExp) == true)
        											{
        												var result = math.evaluate(NewExp);        												 
        												result = result.toFixed(2); 
        												result = result.toString();        											
        												tbody = tbody+ "<td style='text-align: right;'>"+result+"</td>";        												
        												var ColumnName=ResultApprovalTemplateTable[x].Title;        												
        												if(ResultApprovalTemplateTable[x].NeedTotal == true)
        												{
	        												ColumnValuesTotal.push({
	    														Column:ColumnName, Total:result, TableId:FormTableData[j], ColIndex:x,       				        			                         
															});
														}
        											}
        											else
        											{
        												tbody = tbody+ "<td>"+NewExp+"</td>";
													}       											
        										}       										
        									}
        									else
        									{
        										tbody = tbody+ "<td></td>";
        									}
        								}
        							}
        							else
        							{
        								tbody = tbody+ "</tr>";
        							}
        						}       						        					
        					}
        					$("#TBODY-"+FormTableData[j]).html(tbody);
        					
        					var FilteredValue = $.grep(ColumnValuesTotal, function(v) {
    							return v.TableId == FormTableData[j];
							});
        					var UniqueColumn = [...new Map(ColumnValuesTotal.map(item => [item['Column'], item])).values()];
        					var FinalColumnTotal=[];
        					if(UniqueColumn.length>0)
        					{
        						for(var w=0; w<UniqueColumn.length; w++)
        						{
        							var ColumnSum=0;
        							var FilteredValueCol = $.grep(ColumnValuesTotal, function(v) {
    									return v.Column == UniqueColumn[w].Column;
									});
									
									if(FilteredValueCol.length>0)
									{
										for(var y=0; y<FilteredValueCol.length; y++)
										{
											ColumnSum = parseFloat(ColumnSum)+parseFloat(FilteredValueCol[y].Total);
										}
										FinalColumnTotal.push({ Total:ColumnSum, ColumnIndex:FilteredValueCol[0].ColIndex, });								
									}									
        						}
        						var th = "<th></th>";							
								var TotalTr='<tr class="Total-row">';								
								var td='';
								TotalTr= TotalTr+ "<td>Total</td>";							
								for(var e=0;e<ResultApprovalTemplateTable.length+1;e++)
								{									
        							if(e < ResultApprovalTemplateTable.length)
        							{
        								var _FilteredValue = $.grep(FinalColumnTotal, function(v) { return v.ColumnIndex == e ; });
										var StatusFlag = false;
										if(_FilteredValue.length>0) { StatusFlag = true; }
										
										if(StatusFlag == true)
										{
        									TotalTr= TotalTr+ "<td style='text-align: right;'>"+_FilteredValue[0].Total.toFixed(2)+"</td>";
        								}
        								else
        								{
        									if(e == 0)
        									{
        										TotalTr= TotalTr+ "<td></td>";
        									}
        									else
        									{
        										TotalTr= TotalTr+ "<td></td>";
        									}
        								}
        							}
        							else
        							{
        								TotalTr= TotalTr+ "</tr>";
        							}
        						}        				
        						$("#TBODY-"+FormTableData[j]).append(TotalTr);        						        					
        					} 					
        				}
    				}    			
    			}
				GetDigitalSignatures();
    		}    		
    		
    		Title = QueryResult[0].Title;
    		if(QueryResult[0].TemplateIDId != null)
    		{
    			Template = 	QueryResult[0].TemplateID.Title
    		}
    		Priority = QueryResult[0].Priority;
    		if(Priority == 'Top' || Priority == 'High')
    		{
    			$("#DisplayPriorityIcon").css("display", "block");
    		}
    		else
    		{
    			$("#DisplayPriorityIcon").css("display", "none");
    		}
    		
    		if(QueryResult[0].DueDate != null)
    		{
    			DueDate = moment(QueryResult[0].DueDate).format('DD MMM YYYY');
    		}
    		$("#TitleRequest").text(Title);
    		$("#Template").text(Template);
    		$("#PriorityText").text(Priority);
    		$("#DuedateText").text(DueDate);
    		var Status='';
    		Status = QueryResult[0].Status;
    		if(QueryResult[0].Status == 'Pending'){Status = 'Initiated';}
    		var StatusImg = '';
				if(QueryResult[0].Status== "Rejected"){StatusImg = "../SiteAssets/Approvals/assets/images/rejected-img.png";}
				else if(QueryResult[0].Status== "Initiated" || QueryResult[0].Status == 'Pending'){StatusImg ="../SiteAssets/Approvals/assets/images/initiated-img.png";}
				else if(QueryResult[0].Status== "Approved"){StatusImg ="../SiteAssets/Approvals/assets/images/approved-img.png";}
				else if(QueryResult[0].Status== "Forwarded"){StatusImg ="../SiteAssets/Approvals/assets/images/forwarded-img.png";}
			$('#StatusImgProcessApproval').attr('src', StatusImg);
 
    		$("#StatusTextProcessApproval").text(Status);  		
    		
    		$("#AuthorNameProcessApproval").text(QueryResult[0].Author.Title);
    		$("#EmailprocessApproval").text(QueryResult[0].Author.EMail);
    		$("#CreatedProcessApproval").text(moment(QueryResult[0].Created).format('DD MMM YYYY'));
    		var CreatedByPhoto=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +QueryResult[0].Author.EMail;
    		$('#AuthorImgProcessApproval').attr('src', CreatedByPhoto);
    		
    		var ListNameItemNo = ListNameByProcessType(PassingValues.split(',')[0], PassingValues.split(',')[3]);
			
    		$('#ApprovalSubmitBTN').attr('name', PassingValues);//RejectApproveModel
    		$('#ApprovalSubmitBTN').attr('hreflang', ListNameItemNo);
    	
    		$('#RejectApproveModel').attr('name', PassingValues);//ForwardRecordsBtn
    		$('#RejectApproveModel').attr('hreflang', ListNameItemNo);
    	
    		$('#ForwardRecordsBtn').attr('name', PassingValues);//ForwardRecordsBtn
    		$('#ForwardRecordsBtn').attr('hreflang', ListNameItemNo);
    		
    		$('#ProcessSendEmailsbtn').attr('name', PassingValues);//ForwardRecordsBtn
    		$('#ProcessSendEmailsbtn').attr('hreflang', ListNameItemNo);
    		
    		var ApproversDesign='';
    		ApproversList = QueryResult[0].ApproversId.results;
    		ApproversListNotify = QueryResult[0].ApproversId.results;
    		ApproversListNotify = jQuery.grep(ApproversListNotify, function(value) {
  				return value != _spPageContextInfo.userId;
			});
			
    		for(var i=0; i<QueryResult[0].Approvers.results.length; i++)
    		{    			
    			var ApproversImg=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +QueryResult[0].Approvers.results[i].EMail;
    			ApproversDesign = ApproversDesign + "<div class='col-md-6 col-sm-6'>"+
                            							"<div class='members-card border-0'>"+
							                            	"<div class='members-card-head'>"+
                                    							"<img src='"+ApproversImg+"'>"+
                                							"</div>"+
                                							"<div class='members-card-body'>"+
                                    							"<div class='members-card-body-info text-ellipsis'>"+
                                        							"<h3 class='member-name text-ellipsis'>"+QueryResult[0].Approvers.results[i].Title+"</h3>"+
                                        							"<p class='member-email text-ellipsis mb0'>"+QueryResult[0].Approvers.results[i].EMail+"</p>"+
                                    							"</div>"+
                                    							//"<button class='btn remove-group-btn remove-btn close close-round'><i class='fa fa-times'></i></button>"+
                                							"</div>"+
                            							"</div>"+
                        							"</div>";
    		}
    		$("#ForwardUsersList").empty().append(ApproversDesign);
    		
    		var ApproversDesignNotify ='';
    		for(var i=0; i<ApproversListNotify.length; i++)
    		{    
    			var UserDtls = fnGetUserProps(ApproversListNotify[i]);    						
    			var ApproversImg=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +UserDtls.d.Email;
    			ApproversDesignNotify = ApproversDesignNotify + "<div class='col-md-6 col-sm-6'>"+
                            							"<div class='members-card border-0'>"+
							                            	"<div class='members-card-head'>"+
                                    							"<img src='"+ApproversImg+"'>"+
                                							"</div>"+
                                							"<div class='members-card-body'>"+
                                    							"<div class='members-card-body-info text-ellipsis'>"+
                                        							"<h3 class='member-name text-ellipsis'>"+UserDtls.d.Title+"</h3>"+
                                        							"<p class='member-email text-ellipsis mb0'>"+UserDtls.d.Email+"</p>"+
                                    							"</div>"+
                                    							//"<button class='btn remove-group-btn remove-btn close close-round'><i class='fa fa-times'></i></button>"+
                                							"</div>"+
                            							"</div>"+
                        							"</div>";
    		}    		
    		$("#NotificationUsersList").empty().append(ApproversDesignNotify); 
    	}	
	}
}


function isMathExpression (str) {
  try {
    Complex.compile(str);
  } catch (error) {
    return false;
  }
  
  return true;
}

function ColumnValueByColumnNameforTableEquation(QueryResult, ColumnName,Index) {
	var ListName;
	//var event_pop;
	switch ($.trim(ColumnName)) {
		case 'ColumnText1': ListName = 	QueryResult[Index].ColumnText1; break;
		case 'ColumnText2': ListName = 	QueryResult[Index].ColumnText2; break;
		case 'ColumnText3': ListName = 	QueryResult[Index].ColumnText3; break;
		case 'ColumnText4': ListName = 	QueryResult[Index].ColumnText4; break;
		case 'ColumnText5': ListName = 	QueryResult[Index].ColumnText5; break;
		case 'ColumnText6': ListName = 	QueryResult[Index].ColumnText6; break;
		case 'ColumnText7': ListName = 	QueryResult[Index].ColumnText7; break;
		case 'ColumnText8': ListName = 	QueryResult[Index].ColumnText8; break;
		case 'ColumnText9': ListName = 	QueryResult[Index].ColumnText9; break;
		case 'ColumnText10': ListName = QueryResult[Index].ColumnText10; break;
		case 'ColumnNumber1': ListName = QueryResult[Index].ColumnNumber1; break;
		case 'ColumnNumber2': ListName = QueryResult[Index].ColumnNumber2; break;
		case 'ColumnNumber3': ListName = QueryResult[Index].ColumnNumber3; break;
		case 'ColumnNumber4': ListName = QueryResult[Index].ColumnNumber4; break;
		case 'ColumnNumber5': ListName = QueryResult[Index].ColumnNumber5; break;		
		case 'ColumnDate1': ListName = moment(QueryResult[Index].ColumnDate1).format('LL'); break;
		case 'ColumnDate2': ListName = moment(QueryResult[Index].ColumnDate2).format('LL'); break;
		case 'ColumnDate3': ListName = moment(QueryResult[Index].ColumnDate3).format('LL'); break;
		case 'ColumnDate4': ListName = moment(QueryResult[Index].ColumnDate4).format('LL'); break;
		case 'ColumnDate5': ListName = moment(QueryResult[Index].ColumnDate5).format('LL'); break;		
		case 'ColumnMultiline1': ListName = QueryResult[Index].ColumnMultiline1; break;
		case 'ColumnMultiline2': ListName = QueryResult[Index].ColumnMultiline2; break;
		case 'Priority': ListName = QueryResult[Index].Priority; break;
		case 'YesNo': ListName = QueryResult[Index].YesNo; break;
		case 'Checkbox': ListName = QueryResult[Index].Checkbox; break;		
	}
	if(ListName == undefined)
	{
		ListName = $.trim(ColumnName);
	}
	return ListName;
}






function ColumnValueByColumnNameforTable(QueryResult, ColumnName,Index) {
	var ListName;
	//var event_pop;
	switch (ColumnName) {
		case 'ColumnText1': ListName = 	QueryResult[Index].ColumnText1; break;
		case 'ColumnText2': ListName = 	QueryResult[Index].ColumnText2; break;
		case 'ColumnText3': ListName = 	QueryResult[Index].ColumnText3; break;
		case 'ColumnText4': ListName = 	QueryResult[Index].ColumnText4; break;
		case 'ColumnText5': ListName = 	QueryResult[Index].ColumnText5; break;
		case 'ColumnText6': ListName = 	QueryResult[Index].ColumnText6; break;
		case 'ColumnText7': ListName = 	QueryResult[Index].ColumnText7; break;
		case 'ColumnText8': ListName = 	QueryResult[Index].ColumnText8; break;
		case 'ColumnText9': ListName = 	QueryResult[Index].ColumnText9; break;
		case 'ColumnText10': ListName = QueryResult[Index].ColumnText10; break;
		case 'ColumnNumber1': ListName = QueryResult[Index].ColumnNumber1; break;
		case 'ColumnNumber2': ListName = QueryResult[Index].ColumnNumber2; break;
		case 'ColumnNumber3': ListName = QueryResult[Index].ColumnNumber3; break;
		case 'ColumnNumber4': ListName = QueryResult[Index].ColumnNumber4; break;
		case 'ColumnNumber5': ListName = QueryResult[Index].ColumnNumber5; break;		
		case 'ColumnDate1': ListName = moment(QueryResult[Index].ColumnDate1).format('LL'); break;
		case 'ColumnDate2': ListName = moment(QueryResult[Index].ColumnDate2).format('LL'); break;
		case 'ColumnDate3': ListName = moment(QueryResult[Index].ColumnDate3).format('LL'); break;
		case 'ColumnDate4': ListName = moment(QueryResult[Index].ColumnDate4).format('LL'); break;
		case 'ColumnDate5': ListName = moment(QueryResult[Index].ColumnDate5).format('LL'); break;		
		case 'ColumnMultiline1': ListName = QueryResult[Index].ColumnMultiline1; break;
		case 'ColumnMultiline2': ListName = QueryResult[Index].ColumnMultiline2; break;
		case 'Priority': ListName = QueryResult[Index].Priority; break;
		case 'YesNo': ListName = QueryResult[Index].YesNo; break;
		case 'Checkbox': ListName = QueryResult[Index].Checkbox; break;		
	}
	return ListName;
}





function ColumnValueByColumnName(QueryResult, _ProcessType) {
	var ListName;
	//var event_pop;
	switch (_ProcessType) {
		case 'ColumnText1': ListName = 	QueryResult[0].ColumnText1; break;
		case 'ColumnText2': ListName = 	QueryResult[0].ColumnText2; break;
		case 'ColumnText3': ListName = 	QueryResult[0].ColumnText3; break;
		case 'ColumnText4': ListName = 	QueryResult[0].ColumnText4; break;
		case 'ColumnText5': ListName = 	QueryResult[0].ColumnText5; break;
		case 'ColumnText6': ListName = 	QueryResult[0].ColumnText6; break;
		case 'ColumnText7': ListName = 	QueryResult[0].ColumnText7; break;
		case 'ColumnText8': ListName = 	QueryResult[0].ColumnText8; break;
		case 'ColumnText9': ListName = 	QueryResult[0].ColumnText9; break;
		case 'ColumnText10': ListName = QueryResult[0].ColumnText10; break;
		case 'ColumnText11': ListName = QueryResult[0].ColumnText11; break;
		case 'ColumnText12': ListName = QueryResult[0].ColumnText12; break;
		case 'ColumnText13': ListName = QueryResult[0].ColumnText13; break;
		case 'ColumnText14': ListName = QueryResult[0].ColumnText14; break;
		case 'ColumnText15': ListName = QueryResult[0].ColumnText15; break;
		case 'ColumnText16': ListName = QueryResult[0].ColumnText16; break;
		case 'ColumnText17': ListName = QueryResult[0].ColumnText17; break;
		case 'ColumnText18': ListName = QueryResult[0].ColumnText18; break;
		case 'ColumnText19': ListName = QueryResult[0].ColumnText19; break;
		case 'ColumnText20': ListName = QueryResult[0].ColumnText20; break;
		case 'ColumnNumber1': ListName = QueryResult[0].ColumnNumber1; break;
		case 'ColumnNumber2': ListName = QueryResult[0].ColumnNumber2; break;
		case 'ColumnNumber3': ListName = QueryResult[0].ColumnNumber3; break;
		case 'ColumnNumber4': ListName = QueryResult[0].ColumnNumber4; break;
		case 'ColumnNumber5': ListName = QueryResult[0].ColumnNumber5; break;
		case 'ColumnNumber6': ListName = QueryResult[0].ColumnNumber6; break;
		case 'ColumnNumber7': ListName = QueryResult[0].ColumnNumber7; break;
		case 'ColumnNumber8': ListName = QueryResult[0].ColumnNumber8; break;
		case 'ColumnNumber9': ListName = QueryResult[0].ColumnNumber9; break;
		case 'ColumnNumber10': ListName = QueryResult[0].ColumnNumber10; break;
		case 'ColumnNumber11': ListName = QueryResult[0].ColumnNumber11; break;
		case 'ColumnNumber12': ListName = QueryResult[0].ColumnNumber12; break;
		case 'ColumnNumber13': ListName = QueryResult[0].ColumnNumber13; break;
		case 'ColumnNumber14': ListName = QueryResult[0].ColumnNumber14; break;
		case 'ColumnNumber15': ListName = QueryResult[0].ColumnNumber15; break;
		case 'ColumnNumber16': ListName = QueryResult[0].ColumnNumber16; break;
		case 'ColumnNumber17': ListName = QueryResult[0].ColumnNumber17; break;
		case 'ColumnNumber18': ListName = QueryResult[0].ColumnNumber18; break;
		case 'ColumnNumber19': ListName = QueryResult[0].ColumnNumber19; break;
		case 'ColumnNumber20': ListName = QueryResult[0].ColumnNumber20; break;
		case 'ColumnDate1': ListName = moment(QueryResult[0].ColumnDate1).format('LL'); break;
		case 'ColumnDate2': ListName = moment(QueryResult[0].ColumnDate2).format('LL'); break;
		case 'ColumnDate3': ListName = moment(QueryResult[0].ColumnDate3).format('LL'); break;
		case 'ColumnDate4': ListName = moment(QueryResult[0].ColumnDate4).format('LL'); break;
		case 'ColumnDate5': ListName = moment(QueryResult[0].ColumnDate5).format('LL'); break;
		case 'ColumnDate6': ListName = moment(QueryResult[0].ColumnDate6).format('LL'); break;
		case 'ColumnDate7': ListName = moment(QueryResult[0].ColumnDate7).format('LL'); break;
		case 'ColumnDate8': ListName = moment(QueryResult[0].ColumnDate8).format('LL'); break;
		case 'ColumnDate9': ListName = moment(QueryResult[0].ColumnDate9).format('LL'); break;
		case 'ColumnDate10': ListName = moment(QueryResult[0].ColumnDate10).format('LL'); break;
		case 'Currency': ListName = QueryResult[0].Currency; break;
		case 'DueDate': ListName = moment(QueryResult[0].DueDate).format('LL'); break;
		case 'Priority': ListName = QueryResult[0].Priority; break;
		case 'Yes/No': ListName = QueryResult[0].YesNo; break;
		case 'ColumnMultiline1': ListName = QueryResult[0].ColumnMultiline1; break;
		case 'ColumnMultiline2': ListName = QueryResult[0].ColumnMultiline2; break;
		case 'ColumnMultiline3': ListName = QueryResult[0].ColumnMultiline3; break;
		case 'ColumnMultiline4': ListName = QueryResult[0].ColumnMultiline4; break;
		case 'ColumnMultiline5': ListName = QueryResult[0].ColumnMultiline5; break;
		case 'Checkbox1': ListName = QueryResult[0].Checkbox1; break;
		case 'Checkbox2': ListName = QueryResult[0].Checkbox2; break;
		case 'Checkbox3': ListName = QueryResult[0].Checkbox3; break;
		case 'Checkbox4': ListName = QueryResult[0].Checkbox4; break;
		case 'Checkbox5': ListName = QueryResult[0].Checkbox5; break;		
	}
	return ListName;
}


function fnGetUserProps(UserID){      
    var Responce='';     
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + UserID + ")";      
    $.ajax({      
        url: requestUri,      
        type: "GET",      
        headers: {      
            "Accept": "application/json; odata=verbose"      
        },      
        async: false,      
        success: function(data) 
        { 
        	Responce=data;     
            var userName = data.d.Title;     
            var userEmail = data.d.Email;    
        },      
        error: function(error) {      
            console.log("fnGetUserProps:: " + error);      
        }      
    });
    return Responce;      
}  


var OldSignedImage='';
function ApprovedAction(Action)
{
	var d = new Date();
	var ISODATE = d.toISOString().substring(0, 10);
	if($("#ApprovedChkbox").prop('checked') == true)
	{
		if(Action.hreflang.split(',')[0] == 'Questions_Master')
		{
			var listName="Questions_Master";		
    	    var item={'__metadata': { type: 'SP.Data.Questions_x005f_MasterListItem'},'ApprovedById':_spPageContextInfo.userId,'ApprovalStatus':'Approved'};
    	    var ExecutionStatus = UniversalUpdateActiveList(listName,item,Action.hreflang.split(',')[1]);
    	    
    	    if(ExecutionStatus == true)
    	    {
    	    	var listName="ApprovalTaskList";		
            	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Approved','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RemarksApprovalContent").val(),'ApprovedDate':ISODATE};
            	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
            }
		}
		else if(Action.hreflang.split(',')[0] == 'MainPollsList')
		{
			var listName="MainPollsList";		
    	    var item={'__metadata': { type: 'SP.Data.MainPollsListListItem'},'Status':'Active'};
    	    var ExecutionStatus = UniversalUpdateActiveList(listName,item,Action.hreflang.split(',')[1]);
    	    
    	    if(ExecutionStatus == true)
    	    {
    	    	var listName="ApprovalTaskList";		
            	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Approved','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RemarksApprovalContent").val(),'ApprovedDate':ISODATE};
            	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
            }
		}
		else if(Action.hreflang.split(',')[0] == 'Announcements')
		{
			var listName="Announcements";		
    	    var item={'__metadata': { type: 'SP.Data.AnnouncementsListItem'},'ApprovedById':_spPageContextInfo.userId,'ApprovalStatus':'Approved','ApprovedDate':ISODATE};
    	    var ExecutionStatus = UniversalUpdateActiveList(listName,item,Action.hreflang.split(',')[1]);
    	    
    	    if(ExecutionStatus == true)
    	    {
    	    	var listName="ApprovalTaskList";		
            	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Approved','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RemarksApprovalContent").val(),'ApprovedDate':ISODATE};
            	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
            }
        }
        else if(Action.hreflang.split(',')[0] == 'Activity')
		{
			var listName="Activity";		
    	    var item={'__metadata': { type: 'SP.Data.ActivityListItem'},'ApprovarName':_spPageContextInfo.userDisplayName,'ApprovalStatus':'Approved'};
    	    var SiteUrl = titanForWork.getQueryStringParameter("CompanySiteUrl")+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+Action.hreflang.split(',')[1]+"')";
    	    var ExecutionStatus = UniversalUpdateActiveListCompanySite(listName,item,Action.hreflang.split(',')[1],SiteUrl);
    	    
    	    if(ExecutionStatus == true)
    	    {
    	    	var listName="ApprovalTaskList";		
            	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Approved','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RemarksApprovalContent").val(),'ApprovedDate':ISODATE};
            	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
            }
        }
        else if(Action.hreflang.split(',')[0] == 'Event')
		{
			var listName="Event";		
    	    var item={'__metadata': { type: 'SP.Data.EventListItem'},'ApprovedById':_spPageContextInfo.userId,'ApprovalStatus':'Approved','ApprovedDate':ISODATE};
    	    var SiteUrl = titanForWork.getQueryStringParameter("CompanySiteUrl")+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+Action.hreflang.split(',')[1]+"')";
    	    var ExecutionStatus = UniversalUpdateActiveListCompanySite(listName,item,Action.hreflang.split(',')[1],SiteUrl);
    	    
    	    if(ExecutionStatus == true)
    	    {
    	    	var listName="ApprovalTaskList";		
            	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Approved','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RemarksApprovalContent").val(),'ApprovedDate':ISODATE};
            	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
            }
        }
        else if(Action.hreflang.split(',')[0] == 'DepartmentalDMS')
		{
			var listName="DepartmentalDMS";	//Action.name.split(',')[4]	
    	    var item={'__metadata': { type: 'SP.Data.DepartmentalDMSItem'},'ApprovedById':_spPageContextInfo.userId,'ApprovalStatus':'Approved','Approval':'Approved','ApprovedDate':ISODATE};
    	    var SiteUrl = titanForWork.getQueryStringParameter("CompanySiteUrl")+'/'+Action.name.split(',')[4]+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+Action.hreflang.split(',')[1]+"')";
    	    var ExecutionStatus = UniversalUpdateActiveListCompanySite(listName,item,Action.hreflang.split(',')[1],SiteUrl);
    	    
    	    if(ExecutionStatus == true)
    	    {
    	    	var listName="ApprovalTaskList";		
            	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Approved','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RemarksApprovalContent").val(),'ApprovedDate':ISODATE};
            	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
            }
        }
        else if(Action.hreflang.split(',')[0] == 'ApprovalProcessList')
		{
			var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=*,AttachmentFiles&$expand=AttachmentFiles&$filter=RequestID eq '"+ActiveTemplateID+"' and Approvers eq '"+_spPageContextInfo.userId+"' and Status eq 'Pending' ";
    		var QueryResult = getdata(Query);
    		
    		if(QueryResult.length>0)
    		{
    			var StepNo=QueryResult[0].Sequence_No;
    		
    			OldSignedImage ='';
    			if(QueryResult[0].AttachmentFiles.results.length>0)
    			{
    				OldSignedImage = QueryResult[0].AttachmentFiles.results[0].FileName;
    			}
				var RequestQueID=0;
				if(QueryResult.length>0){RequestQueID = QueryResult[0].ID;}			
				var ActiveSingTypeRadio = $('input[name="SignTypeRadio"]:checked').val();
				var listName="ApprovalProcessQueue";	//Action.name.split(',')[4]
				var item='';
				if(ActiveSingTypeRadio == 'SignText')
				{
					item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Approved','SignType':'SignText','DrawSign':$("#SingTextType").val(),'Remarks':$("#RemarksApprovalContent").val(),'IPAddress':SystemIpAddress};
				}
				else if(ActiveSingTypeRadio == 'SignImage')
				{
					item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Approved','SignType':'SignImage','Remarks':$("#RemarksApprovalContent").val(),'IPAddress':SystemIpAddress};				
				}
				else if(ActiveSingTypeRadio == 'SignDraw')
				{
					var DrawSingValue = $sigdiv.jSignature('getData', "default");
					item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Approved','SignType':'SignDraw','DrawSign':DrawSingValue,'Remarks':$("#RemarksApprovalContent").val(),'IPAddress':SystemIpAddress};
				}    	    
    	    	var SiteUrl = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+RequestQueID+"')";
    	    	
    	    	var ExecutionStatus = false;
    	    	if(ActiveSingTypeRadio == 'SignText')
    	    	{
    	    		var SignText = $("#SingTextType").val();
    	    			SignText.trim();
    	    		if(SignText.length>0)
    	    		{    	    	
    	    			ExecutionStatus = UniversalUpdateApprovalProcess(listName,item,RequestQueID,SiteUrl);    	    
    	    		}
    	    		else
    	    		{
    	    			alert("Please Type Your Signature.");
    	    		}
    	    	}
    	    	else if(ActiveSingTypeRadio == 'SignImage')
    	    	{
    	    		if(SignImage.length>0)
    	    		{
    	    			ExecutionStatus = UniversalUpdateApprovalProcess(listName,item,RequestQueID,SiteUrl);    	    
    	    		}
    	    		else
    	    		{
    	    			alert("Please Select Your Signature Image.");
    	    		}
    	    	}
    	    	else if(ActiveSingTypeRadio == 'SignDraw')
    	    	{
    	    		if(DrawSingValue != "")
    	    		{
    	    			ExecutionStatus = UniversalUpdateApprovalProcess(listName,item,RequestQueID,SiteUrl);    	    
    	    		}
    	    		else
    	    		{
    	    			alert("Please Draw Your Signature.");
    	    		}
    	    	}
    	    	
    	    	if(ExecutionStatus == true)
    	    	{
    	    		if(ActiveSingTypeRadio == 'SignImage')
					{
    	    			uploadattachment(RequestQueID);
    	    		}
    	    		$('#approvalActionModal').modal('hide');
    	    		$('#approvalRejectionModal').modal('hide');										
					$('#CurrentStepStatusImgProcessApproval').attr('src', '../SiteAssets/Approvals/assets/images/approved-img.png');
					$("#CurrentStep").text('Done');
					GetDigitalSignatures();					
					var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=*,AttachmentFiles&$expand=AttachmentFiles&$filter=RequestID eq '"+ActiveTemplateID+"'&$orderby=Sequence_No asc";
	    			var QueryResult = getdata(Query);	    		
	    			var SeqArray=[];
	    			for(var i=0; i<QueryResult.length; i++)
	    			{
	    				SeqArray.push(QueryResult[i].Sequence_No);
	    			}
	    			var SeqIndex = SeqArray.indexOf(StepNo);	    				    		
	    			if(SeqArray.length>SeqIndex+1)
	    			{
						let index = [SeqIndex+1];
						let indexArr = index.map(i => SeqArray[i]);
						var NewIndexValue = indexArr.toString();					
						var FilteredRec = $.grep(QueryResult, function(v) {
							return v.Sequence_No == NewIndexValue;
						});
						var item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'Status':'Pending'};
						var SiteUrl = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/GetByTitle('ApprovalProcessQueue')/items('"+FilteredRec[0].ID+"')";
						UniversalUpdateApprovalProcess('ApprovalProcessQueue',item,FilteredRec[0].ID,SiteUrl);
						
						PushNextApprover(ActiveTemplateID,'Initiated',_spPageContextInfo.userId,FilteredRec[0].ApproversId.results.toString(),FilteredRec[0].StepName);
					}
					else
					{
						PushNextApprover(ActiveTemplateID,'Approved',_spPageContextInfo.userId,0,'Final');
					}
	
				
					var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessList')/items?$select=*,ApprovedBy/Title,ApprovedBy/EMail,Author/Title,Author/EMail&$expand=ApprovedBy,Author&$filter=ID eq '"+Action.hreflang.split(',')[1]+"' ";
    				var QueryResult = getdata(Query);
    				var listName = 'ApprovalProcessList';
    				if(QueryResult.length>0)
    				{
    					// CurrentStepApprovalProcessList12 $("#Status"+listName+Action.hreflang.split(',')[1]).text('Done');
    					//$("#CurrentStep"+listName+Action.hreflang.split(',')[1]).text(QueryResult[0].CurrentStep +'Done');
    					var StatusImg = '../SiteAssets/Approvals/assets/images/approved-img.png';						
						$('#CurrentStepStatusImage'+listName+Action.hreflang.split(',')[1]).attr('src', StatusImg);							
						$("#ActionDiv"+listName+Action.hreflang.split(',')[1]).css("display", "inline-flex");
						var ApprovedByImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +QueryResult[0].ApprovedBy.EMail;
						$('#Approvedby'+listName+Action.hreflang.split(',')[1]).attr('src', ApprovedByImage);
						$("#ApprovedByTitle"+listName+Action.hreflang.split(',')[1]).text(QueryResult[0].ApprovedBy.Title);
						$("#ApprovedByEmail"+listName+Action.hreflang.split(',')[1]).text(QueryResult[0].ApprovedBy.EMail);
						$("#ApprovedDate"+listName+Action.hreflang.split(',')[1]).text(moment(QueryResult[0].ApprovedDate).format('DD MMM YYYY'));
					}			
								
    	    	}
    	    }
    	    else
    	    {
    	    	
			}		
        }
		else
		{
			alert("Defination not defined!");
		}
	}
	else
	{
		alert("Select Approved Checkbox!");
	}
}


function RejectApproval(Action)
{
	var d = new Date();
	var ISODATE = d.toISOString().substring(0, 10);
	var RemarkText = $("#RejectApproveRemark").val();
	RemarkText = RemarkText.trim();
	if($("#RejectApproveChkBox").prop('checked') == true)
	{
		if(RemarkText.length>0)
		{
			if(Action.hreflang.split(',')[0] == 'Questions_Master')
			{
				var listName="Questions_Master";		
    		    var item={'__metadata': { type: 'SP.Data.Questions_x005f_MasterListItem'},'ApprovedById':_spPageContextInfo.userId,'ApprovalStatus':'Rejected'};
    		    var ExecutionStatus = UniversalUpdateActiveList(listName,item,Action.hreflang.split(',')[1]);
    		    
    		    if(ExecutionStatus == true)
    		    {
    		    	var listName="ApprovalTaskList";		
        	    	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Rejected','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RejectApproveRemark").val(),'ApprovedDate':ISODATE};
        	    	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
        	    }
			}
			else if(Action.hreflang.split(',')[0] == 'MainPollsList')
			{
				var listName="MainPollsList";		
    		    var item={'__metadata': { type: 'SP.Data.MainPollsListListItem'},'Status':'Rejected'};
    		    var ExecutionStatus = UniversalUpdateActiveList(listName,item,Action.hreflang.split(',')[1]);
    		    
    		    if(ExecutionStatus == true)
    		    {
    		    	var listName="ApprovalTaskList";		
        	    	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Rejected','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RejectApproveRemark").val(),'ApprovedDate':ISODATE};
        	    	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
        	    }
			}
			else if(Action.hreflang.split(',')[0] == 'Announcements')
			{
				var listName="Announcements";		
    		    var item={'__metadata': { type: 'SP.Data.AnnouncementsListItem'},'ApprovedById':_spPageContextInfo.userId,'ApprovalStatus':'Rejected','ApprovedDate':ISODATE};
    		    var ExecutionStatus = UniversalUpdateActiveList(listName,item,Action.hreflang.split(',')[1]);
    		    
    		    if(ExecutionStatus == true)
    		    {
    		    	var listName="ApprovalTaskList";		
        	    	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Rejected','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RejectApproveRemark").val(),'ApprovedDate':ISODATE};
        	    	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
        	    }
        	}
        	else if(Action.hreflang.split(',')[0] == 'Activity')
			{
				var listName="Activity";		
    		    var item={'__metadata': { type: 'SP.Data.ActivityListItem'},'ApprovarName':_spPageContextInfo.userDisplayName,'ApprovalStatus':'Rejected'};
    		    var SiteUrl = titanForWork.getQueryStringParameter("CompanySiteUrl")+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+Action.hreflang.split(',')[1]+"')";
    		    var ExecutionStatus = UniversalUpdateActiveListCompanySite(listName,item,Action.hreflang.split(',')[1],SiteUrl);
    		    
    		    if(ExecutionStatus == true)
    		    {
    		    	var listName="ApprovalTaskList";		
        	    	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Rejected','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RejectApproveRemark").val(),'ApprovedDate':ISODATE};
        	    	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
        	    }
        	}
        	else if(Action.hreflang.split(',')[0] == 'Event')
			{
				var listName="Event";		
    		    var item={'__metadata': { type: 'SP.Data.EventListItem'},'ApprovedById':_spPageContextInfo.userId,'ApprovalStatus':'Rejected','ApprovedDate':ISODATE};
    		    var SiteUrl = titanForWork.getQueryStringParameter("CompanySiteUrl")+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+Action.hreflang.split(',')[1]+"')";
    		    var ExecutionStatus = UniversalUpdateActiveListCompanySite(listName,item,Action.hreflang.split(',')[1],SiteUrl);
    		    
    		    if(ExecutionStatus == true)
    		    {
    		    	var listName="ApprovalTaskList";		
        	    	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Rejected','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RejectApproveRemark").val(),'ApprovedDate':ISODATE};
        	    	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
        	    }
        	}
        	else if(Action.hreflang.split(',')[0] == 'DepartmentalDMS')
			{
				var listName="DepartmentalDMS";	//Action.name.split(',')[4]	
    		    var item={'__metadata': { type: 'SP.Data.DepartmentalDMSItem'},'ApprovedById':_spPageContextInfo.userId,'ApprovalStatus':'Rejected','Approval':'Rejected','ApprovedDate':ISODATE};
    		    var SiteUrl = titanForWork.getQueryStringParameter("CompanySiteUrl")+'/'+Action.name.split(',')[4]+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+Action.hreflang.split(',')[1]+"')";
    		    var ExecutionStatus = UniversalUpdateActiveListCompanySite(listName,item,Action.hreflang.split(',')[1],SiteUrl);
    		    
    		    if(ExecutionStatus == true)
    		    {
    		    	var listName="ApprovalTaskList";		
        	    	var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':'Rejected','ApprovedById':_spPageContextInfo.userId,'Remarks':$("#RejectApproveRemark").val(),'ApprovedDate':ISODATE};
        	    	UniversalUpdateApprovalList(listName,item,Action.name.split(',')[0]);
        	    }
        	}
        	else if(Action.hreflang.split(',')[0] == 'ApprovalProcessList')
			{				
            	var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=*,AttachmentFiles&$expand=AttachmentFiles&$filter=RequestID eq '"+ActiveTemplateID+"' and Approvers eq '"+_spPageContextInfo.userId+"' ";
    			var QueryResult = getdata(Query);
    			
    			var RequestQueID=0;
				if(QueryResult.length>0){RequestQueID = QueryResult[0].ID;}			
				var listName="ApprovalProcessQueue";	//Action.name.split(',')[4]
				var item='';
					item={'__metadata': { type: 'SP.Data.ApprovalProcessQueueListItem'},'ActionTakenbyId':_spPageContextInfo.userId,'Status':'Rejected','Remarks':$("#RejectApproveRemark").val()};
				
    	    	var SiteUrl = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/GetByTitle('"+listName+"')/items('"+RequestQueID+"')";
    	    	var ExecutionStatus = UniversalUpdateApprovalProcess(listName,item,RequestQueID,SiteUrl);    	    
    	    	if(ExecutionStatus == true)
    	    	{  
					$("#approvalActionModal").modal('hide');//hide(); 
					$("#approvalRejectionModal").modal('hide');//hide();					
					alert('Action Taken Successfully!');
					GetDigitalSignatures();
					PushNextApprover(ActiveTemplateID,'Rejected',_spPageContextInfo.userId,0);									
    	    	}		
        	}
			else
			{
				alert("Defination not defined!");
			}
		}
		else
		{
		 alert("Enter Rejected Remark Message!")
		}
	}
	else
	{
		alert("Select Rejected Checkbox!");
	}
}


function ListNameByProcessType(ListItemId, _ProcessType) {
	var ListName;
	var event_pop;
	switch (_ProcessType) {
		case 'QuestionAnswer': ListName = 'Questions_Master'+','+ListItemId; break;
		case 'Survey': ListName = 'MainPollsList'+','+ListItemId; break;
		case 'Announcements': ListName = 'Announcements'+','+ListItemId; break;
		case 'Alert': ListName = 'Announcements'+','+ListItemId; break; //Banners
		case 'Banners': ListName = 'Announcements'+','+ListItemId; break; //General
		case 'General': ListName = 'Announcements'+','+ListItemId; break; //General
		case 'Recognition': ListName = 'Announcements'+','+ListItemId; break; //Suggesion
		case 'Suggesion': ListName = 'Activity'+','+ListItemId; break; //New Initiative
		case 'New Initiative': ListName = 'Activity'+','+ListItemId; break; //New Activity
		case 'Activity': ListName = 'Activity'+','+ListItemId; break; //New Activity
		case 'Events': ListName = 'Event'+','+ListItemId; break; //Departmental Documents
		case 'Departmental Documents': ListName = 'DepartmentalDMS'+','+ListItemId; break; //Departmental Documents
		case 'Process Approval': ListName = 'ApprovalProcessList'+','+ListItemId; break; //Departmental Documents		
	}
	return ListName;
}


function PageNameByProcessType(ListItemId, _ProcessType) {
	var PageName;
	var event_pop;
	switch (_ProcessType)
	{
		case 'QuestionAnswer': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/QuestionAnswer.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
		case 'Alert': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Alert?MODAL"; break;
		case 'Announcements': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Announcement?MODAL"; break;
		case 'Banners': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/DetailsView.aspx?WebAppId="+window.btoa(titanForWork.getQueryStringParameter('CompanyId'))+"&ItemId="+window.btoa(ListItemId)+"&type="+window.btoa('Banner')+"&Source=../Pages/Default.aspx?MODAL";break;
		case 'General': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/DetailsView.aspx?WebAppId="+window.btoa(titanForWork.getQueryStringParameter('CompanyId'))+"&ItemId="+window.btoa(ListItemId)+"&type="+window.btoa('General')+"&Source=../Pages/Default.aspx?MODAL"; break;
		case 'Recognition': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/DetailsView.aspx?WebAppId="+window.btoa(titanForWork.getQueryStringParameter('CompanyId'))+"&ItemId="+window.btoa(ListItemId)+"&type="+window.btoa('General')+"&Source=../Pages/Default.aspx?MODAL"; break;
		case 'Events': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/EventDetails.aspx?WebAppId="+titanForWork.getQueryStringParameter('CompanyId')+"&ItemsId="+ListItemId+"&Mode=View&Source=../Pages/Default.aspx?MODAL"; break;
		case 'Emergency Annoucements': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Announcements.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Alert?MODAL"; break;
		case 'New Initiative': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId')+"&ItemId=" + ListItemId + "&Mode=View&Type=Initiative&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
		case 'Suggesion': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Suggestion&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
		case 'Activity': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/Activity.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&ItemId=" + ListItemId + "&Mode=View&Type=Activities&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
		case 'Survey': PageName = _spPageContextInfo.webAbsoluteUrl + "/Pages/AddPolls.aspx?WebAppId=" + titanForWork.getQueryStringParameter('CompanyId') + "&PollId=" + window.btoa(ListItemId) + "&Mode=View&sourcelocation=../Pages/MyDashboard.aspx?MODAL"; break;
	}
	return PageName;
}


function getdata(Query)
{
    var ResultItems=[];
    var Ownurl =Query;// _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ContactCenter')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 			
            ResultItems = data.d.results;  
        },
        error: function (data) 
        {  
            console.log("Error in getdata.");
        	console.log(data); 
        }  
    });
    return ResultItems;
}


function ToGetActivityCounts(DataResult)
{
	var TempArray3 = [];
	if(DataResult.length>0)
	{
		for(var i=0; i<DataResult.length; i++)
		{
			TempArray3.push(DataResult[i].Status);
		}
	}
	
    var TempPie =[]; var ss = [];		
    if(TempArray3.length > 0)
    {
        TempArray3 = TempArray3.filter(function (x, i, a) { 
            return a.indexOf(x) === i; 
        });	
    }
    
    var TempArrayCounts = [];	
    $.each(TempArray3, function( index, value ) {
    	var filteredValue = DataResult.filter(function(obj) {
            return (obj.Status=== value);
        });
        var Tcounts = filteredValue.length; 
        filteredValue = (filteredValue.length / DataResult.length)* 100;
        TempArrayCounts.push(filteredValue.length);
        var c= Math.round(filteredValue)		
        TempPie.push({value,c,Tcounts})
    });
    	
    for(i=0; i<TempPie.length; i++)
    {
        ss.push({label: TempPie[i].value, x:TempPie[i].Tcounts, y: TempPie[i].c, legendText: TempPie[i].value});			
    }
    
    $("#dvpieChart").CanvasJSChart({ 
        axisY:{ 
        	title: "Products in %" 
        }, 
        legend : { 
            verticalAlign: "center", 
            horizontalAlign: "right" 
        }, 
        data: [ 
		{ 
		    click: function(e){	
		        /*$('#tbInstance').html('');
		        var ResultsData = '';
		        var tbodyData = '';
		        $('#thactivity').text('Activity : '+ e.dataPoint.label);	
		        $('#lbActivity').text('Activity : '+ e.dataPoint.label);
		        $('#thPeriod').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
		        $('#lbDates').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));

		        $('#thdatePeriod').text(' '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
		        $('#lbActivityCount').text('Total Visit: '+ e.dataPoint.x);

		        var filteredResult = AnalyticalUsageData.filter(function(obj) {						
		            return (obj.UserAction == e.dataPoint.label);					    	
		        });	
		        	
		        for(i=0;i< filteredResult.length; i++)
		        {		      
		              tbodyData += '<tr class="text-left"><td class="text-left" style="width: 30%;"><div class="analytical-user-image-box"><img src="'+filteredResult[i].UserImage+'" ><div class="analytical-user-image-text"><p class="mb0">'+filteredResult[i].UserID.Title+'</p><p class="mb0">'+filteredResult[i].Designation+' | '+filteredResult[i].DepartmentId.Title+' </p><p class="mb0 Emailfont">'+filteredResult[i].UserID.EMail+'</p></div></div></td><td class="text-left" style="width: 18%;">'+filteredResult[i].WebpartName+'</td><td style="width: 18%;">'+moment(filteredResult[i].Modified).format("DD-MMM-YYYY HH:mm")+'</td><td style="width: 24%;">'+filteredResult[i].Title+'</td><td style="width: 10%;">'+filteredResult[i].Application+'</td></tr>';
		        }
		        $('#tbInstance').append(tbodyData);
		        $('#List-of-Instances-modal').modal('show');  */   
		    },
		    type: "pie", 
		    showInLegend: true,
		    toolTipContent: "{label} <br/> {x}", 
		    indexLabel: "{label} ", 			
		    dataPoints: ss			
		}] 		
    }); 	
}

function UniversalUpdateActiveList(listName,item,dataid)  
{
	var ActionListStatus=false;
    var Responce="";
    $.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items('"+dataid+"')",
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
        success: function(data)
        { 	
        	ActionListStatus=true;
			alert('Action Taken Successfully!');
			$("#approvalActionModal").modal('hide');//hide(); 
			$("#approvalRejectionModal").modal('hide');//hide(); 
        },  
        error: function(data) 
        {  
            Responce=data;
            console.log("Error in UniversalUpdate.");
        	console.log(data);  
        }  
    }); 
    return ActionListStatus;    
}

function UniversalUpdateActiveListCompanySite(listName,item,dataid,SiteUrl)  
{
	var ActionListStatus=false;
    var Responce="";
    $.ajax({  
        url: SiteUrl,//_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items('"+dataid+"')",
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
        success: function(data)
        { 	
        	ActionListStatus=true;
			alert('Action Taken Successfully!');
			$("#approvalActionModal").modal('hide');//hide(); 
			$("#approvalRejectionModal").modal('hide');//hide();
        },  
        error: function(data) 
        {  
            Responce=data;
            console.log("Error in UniversalUpdate.");
        	console.log(data);  
        }  
    }); 
    return ActionListStatus;    
}



function UniversalUpdateApprovalList(listName,item,dataid)  
{
    var Responce=false;
    $.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items('"+dataid+"')",
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
        success: function(data)
        {
        	Responce = true;
        	var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,ApprovedBy/Title,ApprovedBy/EMail,Author/Title,Author/EMail&$expand=ApprovedBy,Author&$filter=ID eq '"+dataid+"' ";
    		var QueryResult = getdata(Query);
    		if(QueryResult.length>0)
    		{
    			$("#Status"+listName+dataid).text(QueryResult[0].Status);
    			var StatusImg = '';
					if(QueryResult[0].Status== "Rejected"){StatusImg = "../SiteAssets/Approvals/assets/images/rejected-img.png";}
					else if(QueryResult[0].Status== "Initiated" || QueryResult[0].Status == 'Pending'){StatusImg ="../SiteAssets/Approvals/assets/images/initiated-img.png";}
					else if(QueryResult[0].Status== "Approved"){StatusImg ="../SiteAssets/Approvals/assets/images/approved-img.png";}
					else if(QueryResult[0].Status== "Forwarded"){StatusImg ="../SiteAssets/Approvals/assets/images/forwarded-img.png";}
				$('#StatusImage'+listName+dataid).attr('src', StatusImg);	
				if(QueryResult[0].Status == "Initiated" || QueryResult[0].Status == 'Pending'){ $("#ActionDiv"+listName+dataid).css("display", "none"); }
				else {	$("#ActionDiv"+listName+dataid).css("display", "inline-flex"); }
				var ApprovedByImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +QueryResult[0].Author.EMail;
				$('#Approvedby'+listName+dataid).attr('src', ApprovedByImage);
				$("#ApprovedByTitle"+listName+dataid).text(QueryResult[0].Author.Title);
				$("#ApprovedByEmail"+listName+dataid).text(QueryResult[0].Author.EMail);
				$("#ApprovedDate"+listName+dataid).text(moment(QueryResult[0].ApprovedDate).format('DD MMM YYYY'));
				$("#StatusModel").text(QueryResult[0].Status); 
				$('#StatusModelimg').attr('src', StatusImg);
				$("#RemarkModel").text(QueryResult[0].Remarks);
				   			
			} 	
        },  
        error: function(data) 
        {  
        	Responce = false;
            Responce=data;
            console.log("Error in UniversalUpdate.");
        	console.log(data);  
        }  
    }); 
    return Responce;    
}


function UniversalUpdateApprovalProcessList(listName,item,dataid)  
{
    var Responce=false;
    $.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items('"+dataid+"')",
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
        success: function(data)
        {
        	Responce = true;
        	var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,ApprovedBy/Title,ApprovedBy/EMail,Author/Title,Author/EMail&$expand=ApprovedBy,Author&$filter=ID eq '"+dataid+"' ";
    		var QueryResult = getdata(Query);
    		if(QueryResult.length>0)
    		{
    			$("#Status"+listName+dataid).text(QueryResult[0].Status);
    			var StatusImg = '';
					if(QueryResult[0].Status== "Rejected"){StatusImg = "../SiteAssets/Approvals/assets/images/rejected-img.png";}
					else if(QueryResult[0].Status== "Initiated" || QueryResult[0].Status == 'Pending'){StatusImg ="../SiteAssets/Approvals/assets/images/initiated-img.png";}
					else if(QueryResult[0].Status== "Approved"){StatusImg ="../SiteAssets/Approvals/assets/images/approved-img.png";}
					else if(QueryResult[0].Status== "Forwarded"){StatusImg ="../SiteAssets/Approvals/assets/images/forwarded-img.png";}
				$('#StatusImage'+listName+dataid).attr('src', StatusImg);	
				if(QueryResult[0].Status == "Initiated" || QueryResult[0].Status == 'Pending'){ $("#ActionDiv"+listName+dataid).css("display", "none"); }
				else {	$("#ActionDiv"+listName+dataid).css("display", "inline-flex"); }
				var ApprovedByImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +QueryResult[0].ApprovedBy.EMail;
				$('#Approvedby'+listName+dataid).attr('src', ApprovedByImage);
				$("#ApprovedByTitle"+listName+dataid).text(QueryResult[0].ApprovedBy.Title);
				$("#ApprovedByEmail"+listName+dataid).text(QueryResult[0].ApprovedBy.EMail);
				$("#ApprovedDate"+listName+dataid).text(moment(QueryResult[0].ApprovedDate).format('DD MMM YYYY'));
				$("#StatusTextProcessApproval").text(QueryResult[0].Status); 
				$('#StatusImgProcessApproval').attr('src', StatusImg);   			
			} 	
        },  
        error: function(data) 
        {  
        	Responce = false;
            Responce=data;
            console.log("Error in UniversalUpdate.");
        	console.log(data);  
        }  
    }); 
    return Responce;    
}


function DisplayFileProperty(DeptName,ListNameItemNo) {
	$("#doc-viewer").empty();
    var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl")+'/'+DeptName.split(',')[4]+"/_api/web/Lists/GetByTitle('DepartmentalDMS')/Items?$select=Acknowledgement,ID,File_x0020_Type,ServerRedirectedEmbedUri,Department,DocumentNo,DocumentType,Regarding,Details,DocumentWrittenBy,Modified,Title,SecurityLevel,AccessLevel,Author/Title,Author/EMail,File/Name,File/ServerRelativeUrl&$top=5000&$orderby=Modified desc&$expand=Author,File&$filter=ID eq '"+ListNameItemNo.split(',')[1]+"'";
    $.ajax({
        url: Ownurl,
        headers: {Accept: "application/json;odata=verbose"},
        async: false,
        success: function (data)
        {
            var propertiesServerRelativeUrl = data.d.results[0].ServerRedirectedEmbedUri;
            $('#OpenWebpage').attr('src', propertiesServerRelativeUrl);
        },
        error: function (data) 
        {
            $('#ModalDisplayProperty').modal('show');
            console.log(JSON.stringify(data));
        }
    }).fail(function (error) {
        alert(error.responseJSON.error.message.value);
    });
}


function ensureUser(ID) 
{
	var UserId =0;    
    var peoplePickerTopDivId = ID;
    var peoplePicker = 
    this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopDivId];
    var users = peoplePicker.GetAllUserInfo();
    var arryuser = users[0];
    if(arryuser) 
    {
    	var payload = { 'logonName': arryuser.Key}; 
    	$.ajax({
    	    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/ensureuser",
    	    type: "POST",
    	    async:false,
    	    contentType: "application/json;odata=verbose",
    	    data: JSON.stringify(payload),
    	    headers: {
    	        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    	        "accept": "application/json;odata=verbose"
    	            },
        	success: function(data, status, xhr) 
        	{     
         		UserId = data.d.Id;          
        	},
        	error: function(xhr, status, error) 
        	{  
        	
        	}
    	}); 
    }   
    else 
    {
        UserId = 0;
    } 
   	return UserId;    
}


var MailCounter=0;
function processSendEmails(Action) 
{ 	
	MailCounter=0;
	var PageLink = _spPageContextInfo.webAbsoluteUrl +"/Pages/Approvals.aspx";
    var from = _spPageContextInfo.userEmail;
    if(Action.name.split(',')[1] == 'ApprovalProcessList')
    {
    	body = "<span><span>"+_spPageContextInfo.userDisplayName+" sent a notification regarding the following approval.</span><br><br>"+
				"<span><strong>Process: </strong><span>Process Approval</span></span><br>"+
				"<span><strong>Request For: </strong><span>"+$("#TitleRequest").text()+"</span></span><br>"+
				"<span><strong>Template: </strong><span>"+$("#Template").text()+"</span></span><br>"+
				"<span><strong>Priority: </strong><span>"+$("#PriorityText").text()+"</span></span><br>"+
				"<span><strong>Due Date: </strong><span>"+$("#DuedateText").text()+"</span></span><br><br>"+
				"<span><strong>Notify by: </strong><span>"+_spPageContextInfo.userDisplayName+"</span></span><br>"+
				"<span><strong>Message: </strong><span>"+$("#MailText").val()+"</span></span><br><br>"+
				"<span><a href='"+PageLink+"'>Click here</a> to open the Approval Dashboard.</span><br><br>"+
				"<span>This is an auto generated e-mail. Please do not reply.</span><br><br>";    
	}
	else
	{    
    	body = "<span><span>"+_spPageContextInfo.userDisplayName+" sent a notification regarding the following approval.</span><br><br>"+
				"<span><strong>Process: </strong><span>Content Approval</span></span><br>"+
				"<span><strong>Type: </strong><span>"+$("#Type").text()+"</span></span><br>"+
				"<span><strong>Category: </strong><span>"+$("#Category").text()+"</span></span><br>"+
				"<span><strong>Title: </strong><span>"+$("#Title").text()+"</span></span><br><br>"+
				"<span><strong>Notify by: </strong><span>"+_spPageContextInfo.userDisplayName+"</span></span><br>"+
				"<span><strong>Message: </strong><span>"+$("#MailText").val()+"</span></span><br><br>"+
				"<span><a href='"+PageLink+"'>Click here</a> to open the Approval Dashboard.</span><br><br>"+
				"<span>This is an auto generated e-mail. Please do not reply.</span><br><br>";
	}
				
    subject = 'Notification from Approval Process.';
    for(var i=0; i<ApproversListNotify.length; i++)
    {
    	var UserDtls = fnGetUserProps(ApproversListNotify[i]);
    	to = UserDtls.d.Email;
    	sendEmail(from, to, body, subject);
    }
}

function sendEmail(from, to, body, subject)
{
	try{
		var siteurl = _spPageContextInfo.webServerRelativeUrl;
    	var urlTemplate = siteurl + "/_api/SP.Utilities.Utility.SendEmail";
        $.ajax({  
    		contentType: 'application/json',  
    		url: urlTemplate,  
    		type: "POST",
    		async:false,  
    		data: JSON.stringify({  
        		'properties': {  
            		'__metadata': {  
                	'type': 'SP.Utilities.EmailProperties'  
            		},  
            		'From': from,  
            		'To': {  
                		'results': [to]  
            		},  
            		'Body': body,  
            		'Subject': subject  
        		}  
    	}),  
    	headers: {  
        	"Accept": "application/json;odata=verbose",  
        	"content-type": "application/json;odata=verbose",  
        	"X-RequestDigest": $("#__REQUESTDIGEST").val()  
    	},  
    	success: function(data) 
    	{  
    		MailCounter = MailCounter+1;
    		if(ApproversListNotify.length == MailCounter)
    		{
        		alert('Email Sent Successfully');
        	}
    	},  
    	error: function(err) 
    	{  
        	alert('Error in sending Email: ' + JSON.stringify(err));  
    	}  
	});
	}
    catch (error) 
    { }
}


function FilterApprovalInbox(ArrangedRecords)
{
	var Records2Filter='';
	if(ArrangedRecords == undefined){Records2Filter = ApprovalProcessData }
	else{Records2Filter = ArrangedRecords}
	var EmployeeID = ensureUser($('#Requestby').children().children().attr('id'));
	var RequestBy= 0;
	var Status = 0;
	var Type=0;
	var Category = 0;
	var EmpID ='';
	
	var Chips='';
	if($("#txtFilterApprovalStatusInbox").val() != "ALL")
	{
		Status = $("#txtFilterApprovalStatusInbox").val();
		Chips += '<div class="upload-chip">'+$("#txtFilterApprovalStatusInbox option:selected").text()+'</div>';
	}
	if($("#WebpartApprovalInbox").val() != "ALL")
	{
		Type= $("#WebpartApprovalInbox").val();
		Chips += '<div class="upload-chip">'+$("#WebpartApprovalInbox option:selected").text()+'</div>';
	}
	if($("#categoryApprovalInbox").val() != "ALL")
	{
		Category = $("#categoryApprovalInbox").val();
		Chips += '<div class="upload-chip">'+$("#categoryApprovalInbox option:selected").text()+'</div>';
	}	
	if(EmployeeID != 0)
	{
		var UserDtls = fnGetUserProps(EmployeeID);
    	EmpID=UserDtls.d.Email;
		Chips += '<div class="upload-chip">'+UserDtls.d.Title+'</div>';
	}	
	
	$('#ApprovalinboxChip').empty().append(Chips);	
	var TestCondition=[];
		TestCondition.push({
    		Status: Status,
       		Type: Type,
           	Category : Category,
           	CreatedByEmail: EmpID,           	                        
		});
			
	for(var i=0; i<4; i++)
	{
		if(i == 0)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.Status== 0)
				{
					var a = TestCondition;
					delete a.Status;
					TestCondition = a;						
				}					
			}
			else
			{
				if(TestCondition[0].Status== 0)
				{
					var a = TestCondition[0];
					delete a.Status;
					TestCondition = a;						
				}
			}				
		}
		if(i == 1)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.Type== 0)
				{
					var a = TestCondition;
					delete a.Type;
					TestCondition = a;							
				}					
			}
			else
			{
				if(TestCondition[0].Type== 0)
				{
					var a = TestCondition[0];
					delete a.Type;
					TestCondition = a;					
				}					
			}				
		}
		if(i == 2)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.Category== 0)
				{
					var a = TestCondition;
					delete a.Category;
					TestCondition = a;						
				}					
			}
			else
			{
				if(TestCondition[0].Category== 0)
				{
					var a = TestCondition[0];
					delete a.Category;
					TestCondition = a;
				}					
			}				
		}
		if(i == 3)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.CreatedByEmail== 0)
				{
					var a = TestCondition;
					delete a.CreatedByEmail;
					TestCondition = a;						
				}					
			}
			else
			{
				if(TestCondition[0].CreatedByEmail== 0)
				{
					var a = TestCondition[0];
					delete a.CreatedByEmail;
					TestCondition = a;						
				}					
			}				
		}
		
	}
	//ApprovalProcessData
	var filter = TestCondition;					
	var users= Records2Filter.filter(function(item) {
  		for (var key in filter){
    	if (item[key] === undefined || item[key] != filter[key])
      		return false;
  			}
  			return true;
		});
		
	var FilteredValue=users;
		console.log(FilteredValue);
	var PendingRecords = $.grep(ApprovalProcessData, function(v) {
    	return v.Status == 'Initiated' ;
	});
$("#TaskPending").text(PendingRecords.length);
	HTMLTABLEDESIGN(FilteredValue);
	
	
}


function ExcelDataReport(tableId)
{
    $("#"+tableId).tableExport({
        //type: 'excel',
        type: 'csv',
        exportHiddenCells: true,
        fileName: 'ExcelReportDetails',
        ignoreColumn: [],
    });
}

function GetPendingRecInbox()
{
	var PendingRecords = $.grep(ApprovalProcessData, function(v) {
    	return v.Status == 'Initiated' ;
	});
	
	var Chips = '<div class="upload-chip">Initiated</div>';
	$('#ApprovalinboxChip').empty().append(Chips);
	PendingRecords.sort(function(a,b){return b.Modified < a.Modified ? -1 : 1});
	
	$("#TaskPending").text(PendingRecords.length);
	
	HTMLTABLEDESIGN(PendingRecords);
}


function GetOverDueInbox()
{
	var PendingRecords = $.grep(ApprovalProcessData, function(v) {
    	return v.DueDateStatus == true ;
	});
	
	var Chips = '<div class="upload-chip">Over Due</div>';
	$('#ApprovalinboxChip').empty().append(Chips);
	PendingRecords.sort(function(a,b){return b.Modified < a.Modified ? -1 : 1});
	
	//$("#TaskPending").text(PendingRecords.length);
	
	HTMLTABLEDESIGN(PendingRecords);


}

 
function ShowPieChartInbox(DataResult)
{
	var dfds = $.Deferred(),
		Approved= [],
    	Rejected= [],
    	Forwarded= [],
    	Initiated= [];    	
    $("#pie").empty();
    if (DataResult.length > 0) 
    {
    	Approved= DataResult.filter(function (data){
            return data.Status == "Approved"
        });
        Rejected= DataResult.filter(function (data){
            return data.Status == "Rejected"
        });
        Forwarded= DataResult.filter(function (data){
            return data.Status == "Forwarded"
        });
        Initiated= DataResult.filter(function (data){
            return data.Status == "Initiated"
        });
        var pie = new d3pie("pie", {
            header: {
                title: {
                    text: "",
                    fontSize: 30
                }
            },
            data: {
                content: [
                  { label: "Approved", value: Approved.length, valueType: "percentage" },
                  { label: "Rejected", value: Rejected.length, valueType: "percentage" },
                  { label: "Forwarded", value: Forwarded.length, valueType: "percentage" },
                  { label: "Initiated", value: Initiated.length, valueType: "percentage" },
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


function clickInboxChart(Action)
{
	$("#txtFilterApprovalStatusInbox").val(Action.data.label);
	FilterApprovalInbox();

}

function ClearApprovalInboxFilter()
{	
	$("#txtFilterApprovalStatusInbox").val('ALL');
	$("#WebpartApprovalInbox").val('ALL');
	$("#categoryApprovalInbox").val('ALL');
	initializePeoplePicker("Requestby");
	FilterApprovalInbox();
}


function ArrengeData(SortData)
{
	if(SortData == 'Title')
	{
		var ArrangeType = ApprovalProcessData.sort(function(a,b){return a.Title.toLowerCase()< b.Title.toLowerCase()? -1 : 1});
		FilterApprovalInbox(ArrangeType);		
	}
	else if(SortData == 'Type')
	{
		var ArrangeType = ApprovalProcessData.sort(function(a,b){return a.Type< b.Type? -1 : 1});
		FilterApprovalInbox(ArrangeType);	
	}
	else if(SortData == 'Recent Request')
	{
		//var ArrangeType = ApprovalProcessData.sort(function(a,b){return a.ReqItemNo > b.ReqItemNo? -1 : 1});
		var ArrangeType = ApprovalProcessData.sort(function(a,b){return b.Modified < a.Modified ? -1 : 1});
		FilterApprovalInbox(ArrangeType);	
	}
}

function TableConfigurationInbox() {
    sorterInbox= new TINY.table.sorter('sorterInbox', 'TempTableInbox', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columnsInbox',
        currentid: 'currentpageinbox',
        totalid: 'totalpagesInbox',
        startingrecid: 'startrecordInbox',
        endingrecid: 'endrecordInbox',
        totalrecid: 'totalrecordsInbox',
        hoverid: 'selectedrow',
        pageddid: 'pagedropdownInbox',
        navid: 'tablenavInbox',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true

    });
}


var temp='';
function generatePDF() 
{	
	var FileName = $("#TitleProcessApproval").text();
		FileName = FileName.trim();
	var element = document.getElementById('PDFAREA');
	var opt = {
  		margin:       .5,
		//  filename:     $("#TitleProcessApproval").text()+'myfile.pdf',
  		filename:     FileName+'.pdf',
  		image:        { type: 'jpeg', quality: 1 },
  		pagebreak: 	{ before: '.beforeClass', after: ['#after1', '#after2'], avoid: 'img' },
  		html2canvas:  { scale: 2, dpi:1200, logging: true, letterRendering: true, useCORS: true },
  		jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait', putOnlyUsedFonts:true, floatPrecision: 16  }
	};
	html2pdf().set(opt).from(element).save();
}


function SetupApprovalProcess(Action,ChkValue)
{
	if(ChkValue == 'Logo')
	{
		if($("#"+Action.id).prop('checked') == true){
    		$("#LogonCompLogoDiv").css("display", "block")
		}
		else
		{
			$("#LogonCompLogoDiv").css("display", "none")
		}
	}
	else if(ChkValue == 'CompName')
	{
		if($("#"+Action.id).prop('checked') == true){
    		$("#LogonCompName").css("display", "block")
		}
		else
		{
			$("#LogonCompName").css("display", "none")
		}	
	}
}


function GetOfficeAddress(OfficeName)
{
	if(OfficeName.value != 'Select Office Location')
	{
		var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OfficeLocation')/items?$filter=ID eq '"+OfficeName.value+"'&$orderby=Title asc ";
    	var QueryResult = getdata(Query); 
    	var Address='';
    		if(QueryResult[0].Address != null){Address = QueryResult[0].Address;}
    	var City='';
    		if(QueryResult[0].City!= null){City= QueryResult[0].City;}
    	var Zip='';
    		if(QueryResult[0].PinCode!= null){Zip = QueryResult[0].PinCode;}
    	var State='';
    		if(QueryResult[0].State!= null){State = QueryResult[0].State;}
    	var Country='';
    		if(QueryResult[0].Country!= null){Country = QueryResult[0].Country;}
    	var Telephone='';
    		if(QueryResult[0].TelephoneNo!= null){Telephone = QueryResult[0].TelephoneNo;}
    	var Email='';
    		if(QueryResult[0].EmailID!= null){Email = QueryResult[0].EmailID;}
    	   
    	var AddressDesign = "<div class='checkbox mt0 mb10'>"+
                    			"<label><input type='checkbox' onchange='SetAddress()' name='Addresschkbox' checked='checked' id='AddressChkBtn' value='"+Address+"'>"+Address+"</label>"+
                     		"</div>"+
                        	"<div class='checkbox mt0 mb10'>"+
                        		"<label><input type='checkbox' onchange='SetAddress()' name='Addresschkbox' checked='checked' id='CityChkBtn' value=' City: "+City+"'>City: "+City+"</label>"+
                        	"</div>"+
                        	"<div class='checkbox mt0 mb10'>"+
                        	  	"<label><input type='checkbox' onchange='SetAddress()' name='Addresschkbox' checked='checked' id='ZipChkBtn' value=' Zip: "+Zip+"'>Zip: "+Zip+"</label>"+
                        	"</div>"+
                        	"<div class='checkbox mt0 mb10'>"+
                        	    "<label><input type='checkbox' onchange='SetAddress()' name='Addresschkbox' checked='checked' id='StateChkBtn' value=' State: "+State+"'>State: "+State+"</label>"+
                        	"</div>"+
                        	"<div class='checkbox mt0 mb10'>"+
                        		"<label><input type='checkbox' onchange='SetAddress()' name='Addresschkbox' checked='checked' id='CountryChkBtn' value=' Country: "+Country+"'>Country: "+Country+"</label>"+
                        	"</div>"+
                        	"<div class='checkbox mt0 mb10'>"+
                        	  	"<label><input type='checkbox' onchange='SetAddress()' name='Addresschkbox' checked='checked' id='TelephoneChkBtn' value=' Telephone: "+Telephone+"'>Telephone: "+Telephone+"</label>"+
                        	"</div>"+
                        	"<div class='checkbox mt0 mb10'>"+
                        	 	"<label><input type='checkbox' onchange='SetAddress()' name='Addresschkbox' checked='checked' id='EmailChkBtn' value=' Email: "+Email+"'>Email: "+Email+"</label>"+
                        	"</div>";
		$("#selectedOfficeAddress").empty().append(AddressDesign);
	}
	else
	{
		$("#selectedOfficeAddress").empty();
		$("#SelectedOfficeAddress").text('');
	}
	SetAddress();
}


function SetAddress()
{
	var selected=[];
	$("input:checkbox[name=Addresschkbox]:checked").each(function() {
		if($("#"+this.id).prop('checked') == true)
		{
    		selected.push($("#"+this.id).val());
		}		
  	});
  	$("#SelectedOfficeAddress").text('');
  	$("#SelectedOfficeAddress").text(selected.toString());
}


function SetCustomText()
{
	if($("#customText").prop('checked') == true)
	{
    	$("#CustomText").text('');
    	$("#CustomText").text($("#CustomTextInput").val());    		
	}
	else
	{
		$("#CustomText").text('');
		$("#CustomTextInput").val('');
	}
}

var SignImage=[];
var finalImages = [];

$(function() {
	$("#file").on('change', function(e) {
	SignImage=[];
  	var fileNum = this.files.length, initial = 0;
 		$.each(this.files,function(idx,elm){
    	   SignImage[finalImages .length]=elm;
		});
		console.log(SignImage);
		//custom-image-label
		$(".custom-image-label").css("display", "none");
		$(".approval_image_preview").css("display", "block");
	});
})


var GetImageBuffer = function (SignImage) 
{
	var deferred = $.Deferred();
	var reader = new FileReader();
	reader.onload = function (e) 
	{
    	deferred.resolve(e.target.result);
	}

	reader.onerror = function (e) 
	{
		deferred.reject(e.target.error);
	}
		reader.readAsArrayBuffer(SignImage);
		return deferred.promise();
};


var xRequestDigest = $("#__REQUESTDIGEST").val();
function uploadattachment(id) 
{
	if(SignImage.length>0)
	{
	    $.each(SignImage, function(index, value){
		    GetImageBuffer (value).then(function (buffer) {
		     	var OrginalFileName = value.name;
		    	var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig,"");
			    $.ajax({
					url: _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
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
    				success: function (data)
    				{ 
    					console.log("Image Upload");
    					if(OldSignedImage != '')
    					{
    						DeleteItemAttachment(id, OldSignedImage);
    					} 
    				},
    				error: function (data) 
    				{
    					console.log(data);
    		  			//alert(data.responseText);
    				}
    			});
			});
		});
   }
}


function UniversalUpdateApprovalProcess(listName,item,dataid,SiteUrl)  
{
	var ActionListStatus=false;
    var Responce="";
    $.ajax({  
        url: SiteUrl,//_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items('"+dataid+"')",
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
        success: function(data)
        { 	
        	ActionListStatus=true;        	
        },  
        error: function(data) 
        {  
            Responce=data;
            console.log("Error in UniversalUpdate.");
        	console.log(data);  
        }  
    }); 
    return ActionListStatus;    
}


function DeleteItemAttachment(ItemId, FileTitle) 
{  
	var Dfd = $.Deferred();  
    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalProcessQueue')/GetItemById(" + ItemId + ")/AttachmentFiles/getByFileName('" + FileTitle + "')  ";  
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
			console.log('Old Signed Image Delete.')  
		},  
        error: function (error) {  
			Dfd.reject(JSON.stringify(error));  
        }  
	});  
    return Dfd.promise();  
}


function GetGetogery(Value)
{
	if(Value != 'ALL')
	{
		var FilteredRec = $.grep(ApprovalProcessData, function(v) {
			return v.Type == Value;
		});
		$("#categoryApprovalInbox").empty();
		var UniqueCategoryItems = [...new Map(FilteredRec.map(item => [item["Category"], item])).values()];
			UniqueCategoryItems.sort(function(a,b){return a.Category< b.Category? -1 : 1});
		$("#categoryApprovalInbox").append($("<option     />").val('ALL').text('ALL'));
		for(var i=0; i<UniqueCategoryItems.length; i++)
		{
			$("#categoryApprovalInbox").append($("<option     />").val(UniqueCategoryItems[i].Category).text(UniqueCategoryItems[i].Category));
		}
	}
	else
	{
		$("#categoryApprovalInbox").empty();
		var UniqueCategoryItems = [...new Map(ApprovalProcessData.map(item => [item["Category"], item])).values()];
			UniqueCategoryItems.sort(function(a,b){return a.Category< b.Category? -1 : 1});
		$("#categoryApprovalInbox").append($("<option     />").val('ALL').text('ALL'));
		for(var i=0; i<UniqueCategoryItems.length; i++)
		{
			$("#categoryApprovalInbox").append($("<option     />").val(UniqueCategoryItems[i].Category).text(UniqueCategoryItems[i].Category));
		}	
	}
}


function GetDigitalSignatures()
{
	var QueryProcessSignatureSetup =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=*,AttachmentFiles,ActionTakenby/Title,ActionTakenby/EMail,Author/Title,Author/EMail&$expand=AttachmentFiles,ActionTakenby,Author&$filter=RequestID eq '"+ActiveTemplateID+"' &$orderby=Sequence_No asc";
	var ResultProcessSignatureSetup = getdata(QueryProcessSignatureSetup);
	//$('#CurrentStepStatusImgProcessApproval').attr('src', '');
	//$("#CurrentStep").text('');
	if(ResultProcessSignatureSetup.length>0)
	{
    	var CurrentUser = _spPageContextInfo.userId;
    	var FilteredRec = $.grep(ResultProcessSignatureSetup, function(v) {
			return v.ApproversId.results == CurrentUser;
		});
		if(FilteredRec.length>0)
		{
			var StatusImg = '';
				if(FilteredRec[0].Status== "Rejected"){StatusImg = "../SiteAssets/Approvals/assets/images/rejected-img.png";}
				else if(FilteredRec[0].Status== "Initiated" || FilteredRec[0].Status == 'Pending'){StatusImg ="../SiteAssets/Approvals/assets/images/initiated-img.png";}
				else if(FilteredRec[0].Status== "Approved"){StatusImg ="../SiteAssets/Approvals/assets/images/approved-img.png";}
				else if(FilteredRec[0].Status== "Forwarded"){StatusImg ="../SiteAssets/Approvals/assets/images/forwarded-img.png";}
				//$('#CurrentStepStatusImgProcessApproval').attr('src', StatusImg);
				//$("#CurrentStep").text(FilteredRec[0].Status);
		}
		
		var FilteredRec = $.grep(ResultProcessSignatureSetup, function(v) {
			return v.Status == 'Approved';
		});
		ResultProcessSignatureSetup = FilteredRec;
		
    	var SignatureDesignHTML=''
    	for(var k=0; k<ResultProcessSignatureSetup.length; k++)
    	{
    		var GMTFormate = moment(ResultProcessSignatureSetup[k].Modified).format();
    			GMTFormate = GMTFormate.slice(19);

    		var SystemIpAddress='';
    		if(ResultProcessSignatureSetup[k].IPAddress != null)
    		{
    			SystemIpAddress = ResultProcessSignatureSetup[k].IPAddress;
    		}
    		
    		var eventDateObj=new Date(ResultProcessSignatureSetup[k].Modified);
			var ActionTime = eventDateObj.toTimeString();
			var H = +ActionTime.substr(0, 2);
			var h = (H % 12) || 12;
			var ampm = H < 12 ? " AM" : " PM";
				ActionTime= h + ActionTime.substr(2, 3) + ampm;

    		var QueryEmployeeInfo =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=*,AttachmentFiles,Department/Title&$expand=AttachmentFiles,Department&$filter=LogonName/EMail eq '"+ResultProcessSignatureSetup[k].ActionTakenby.EMail+"' and PrimaryCompany eq 'Primary'";
    		var ResultEmployeeInfo = getdata(QueryEmployeeInfo);
    		
    		if(ResultProcessSignatureSetup[k].SignType == 'SignText')//SignDraw
    		{
    			SignatureDesignHTML = SignatureDesignHTML +	"<div class='col-md-4 col-sm-4 col-xs-12 mb10'>"+
        	               	    								"<div class='process-approve-signature-box'>"+                                    	        							
                           	        								"<span id='SignatureText' class='signature-front'>"+ResultProcessSignatureSetup[k].DrawSign+"</span>"+
                               	        							"<p class='process-approve-signature-name'>"+ResultProcessSignatureSetup[k].ActionTakenby.Title+"</p>"+
                               	        							//"<span><p class='process-approve-signature-designation'>"+ResultEmployeeInfo[0].Designation+"</p> , <p class='process-approve-signature-department'>"+ResultEmployeeInfo[0].Department.Title+"</p></span>"+
                               	        							"<span><span class='DesignationSpan'>"+ResultEmployeeInfo[0].Designation+"</span> , <span class='DepartmentSpan'>"+ResultEmployeeInfo[0].Department.Title+"</span></span>"+                               	        							                              	        							
                              	        							"<p class='process-approve-signature-date'>"+moment(ResultProcessSignatureSetup[k].Modified).format('DD MMM YYYY')+" "+ActionTime+" (GMT "+GMTFormate+" IST)</p>"+
                              	        							"<p class='process-approve-signature-ipaddress'>"+SystemIpAddress+"</p>"+
                               	    							"</div>"+
                                    						"</div>";    					
			}
			else if(ResultProcessSignatureSetup[k].SignType == 'SignDraw')
			{
				SignatureDesignHTML = SignatureDesignHTML +	"<div class='col-md-4 col-sm-4 col-xs-12 mb10'>"+
                           	    								"<div class='process-approve-signature-box'>"+
                          	        								"<img class='process-approve-signature-img' src='"+ResultProcessSignatureSetup[k].DrawSign+"' alt='signature'>"+                                    	        							
                           	        								"<p class='process-approve-signature-name'>"+ResultProcessSignatureSetup[k].ActionTakenby.Title+"</p>"+
                           	        								"<span><span class='DesignationSpan'>"+ResultEmployeeInfo[0].Designation+"</span> , <span class='DepartmentSpan'>"+ResultEmployeeInfo[0].Department.Title+"</span></span>"+                               	        							                              	        							
                              	        							"<p class='process-approve-signature-date'>"+moment(ResultProcessSignatureSetup[k].Modified).format('DD MMM YYYY')+" "+ActionTime+" (GMT "+GMTFormate+" IST)</p>"+
                              	        							"<p class='process-approve-signature-ipaddress'>"+SystemIpAddress+"</p>"+
                           	    								"</div>"+
                           									"</div>";    					
			}
			else if(ResultProcessSignatureSetup[k].SignType == 'SignImage')
			{
				var SignUrl='';
				if(ResultProcessSignatureSetup[k].AttachmentFiles.results.length>0)
				{
					SignUrl = ResultProcessSignatureSetup[k].AttachmentFiles.results[0].ServerRelativeUrl;
				}    						
				SignatureDesignHTML = SignatureDesignHTML +	"<div class='col-md-4 col-sm-4 col-xs-12 mb10'>"+
                           	    								"<div class='process-approve-signature-box'>"+
                           	        								"<img class='process-approve-signature-img' src='"+SignUrl+"' alt='signature'>"+                                    	        							
                           	        								"<p class='process-approve-signature-name'>"+ResultProcessSignatureSetup[k].ActionTakenby.Title+"</p>"+
                                    	        					"<span><span class='DesignationSpan'>"+ResultEmployeeInfo[0].Designation+"</span> , <span class='DepartmentSpan'>"+ResultEmployeeInfo[0].Department.Title+"</span></span>"+                               	        							                              	        							
                              	        							"<p class='process-approve-signature-date'>"+moment(ResultProcessSignatureSetup[k].Modified).format('DD MMM YYYY')+" "+ActionTime+" (GMT "+GMTFormate+" IST)</p>"+
                              	        							"<p class='process-approve-signature-ipaddress'>"+SystemIpAddress+"</p>"+
                                    	    					"</div>"+
                                    						"</div>";    					
			}    					
    	}
    }
    $("#ApprovalSignatureArea").empty().append(SignatureDesignHTML);    		
}


function ClearTextSignature()
{
	$("#SingTextType").val('');
	$("#RemarksApprovalContent").val('');
}

function ClearImageSignature()
{
	$(".approval_image_preview").css("display", "none");
	$("#file").val(null);
	$("#RemarksApprovalContent").val('');
	$(".custom-image-label").css("display", "block");
	$(".approval_image_preview").css("display", "none");
}

function ClearDrawSignature()
{
	$("#RemarksApprovalContent").val('');
	$sigdiv.jSignature('reset');
}


function PushNextApprover(RecNo,Status,ApproverID,NextApprover,NextStep)
{
	if(Status == 'Rejected')
	{
		var d = new Date();
		var ISODATE = d.toISOString().substring(0, 10);
		var listName="ApprovalProcessList";		
		var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':Status,'ApprovedById':ApproverID,'ApprovedDate':ISODATE,'CurrentStep':NextStep};
   		var ExecutionStatus = UniversalUpdateApprovalProcessList(listName,item,RecNo);
   		if(ExecutionStatus == true)
   		{
   		  	//alert("Approval Forwarded Successfully!");
   		}
   	}
   	else if(Status == 'Approved')
   	{
   		var d = new Date();
		var ISODATE = d.toISOString().substring(0, 10);
		var listName="ApprovalProcessList";		
		var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':Status,'ApprovedById':ApproverID,'ApprovedDate':ISODATE};
   		var ExecutionStatus = UniversalUpdateApprovalProcessList(listName,item,RecNo);
   		if(ExecutionStatus == true)
   		{
   		  	alert("Approved Successfully!");
   		  	$("#ProcessApproveDiv").css("display", "none");
			$("#ProcessRejectDiv").css("display", "none");
			$("#ProcessForwardDiv").css("display", "none");
   		}   	
   	}
   	else
   	{
   		if(NextApprover != '0')
   		{
   			var Test = NextApprover.split(',');   		
   			var NewApprover=[];
   			for(var i=0; i<Test.length; i++)
   			{
   				NewApprover.push(parseInt(Test[i]))
   			}
   			var d = new Date();
			var ISODATE = d.toISOString().substring(0, 10);
			var listName="ApprovalProcessList";		
			var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'ApproversId':{'results':NewApprover},'Status':Status,'ApprovedById':ApproverID,'ApprovedDate':ISODATE,'CurrentStep':NextStep};
   			var ExecutionStatus = UniversalUpdateApprovalProcessList(listName,item,RecNo);
   			if(ExecutionStatus == true)
   			{
   			  	alert("Action Taken Successfully!");
   			}
   		}
   		else
   		{
   			var d = new Date();
			var ISODATE = d.toISOString().substring(0, 10);
			var listName="ApprovalProcessList";		
			var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Status':Status,'ApprovedById':ApproverID,'ApprovedDate':ISODATE,'CurrentStep':NextStep};
   			var ExecutionStatus = UniversalUpdateApprovalProcessList(listName,item,RecNo);
   			if(ExecutionStatus == true)
   			{
   			  	alert("Action Taken Successfully!");
   			}   		
   		}
   	}
}


function GetHistory()
{
	//var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=*,Author/Title,Author/EMail,AttachmentFiles&$expand=Author,AttachmentFiles&$filter=RequestID eq '"+ActiveTemplateID+"' and Status ne 'Pending' &$orderby = Sequence_No asc ";
	var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessQueue')/items?$select=*,ActionTakenby/Title,ActionTakenby/EMail,Author/Title,Author/EMail,AttachmentFiles&$expand=ActionTakenby,Author,AttachmentFiles&$filter=RequestID eq '"+ActiveTemplateID+"'&$orderby=Sequence_No asc";
	var QueryResult = getdata(Query);
	
	var HistoryDesign='';
	if(QueryResult.length>0)
	{
		//var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessList')/items?$select=*,ActionTakenby/Title,ActionTakenby/EMail,Author/Title,Author/EMail,AttachmentFiles&$expand=ActionTakenby,Author,AttachmentFiles&$filter=RequestID eq '"+ActiveTemplateID+"'&$orderby=Sequence_No asc";
		var QueryInitialized =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessList')/items?$select=*,AttachmentFiles,TemplateID/Title,Approvers/Title,Approvers/EMail,Author/Title,Author/EMail&$expand=AttachmentFiles,TemplateID,Approvers,Author&$filter=ID eq '"+ActiveTemplateID+"'";
		var QueryResultInitialized = getdata(QueryInitialized);
		
		if(QueryResultInitialized.length>0)
		{	
			var eventDateObj=new Date(QueryResultInitialized[0].Created);
			var ActionTime = eventDateObj.toTimeString();
			var H = +ActionTime.substr(0, 2);
			var h = (H % 12) || 12;
			var ampm = H < 12 ? " AM" : " PM";
				ActionTime= h + ActionTime.substr(2, 3) + ampm;

			var RequestByPhoto=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +QueryResultInitialized[0].Author.EMail;
			HistoryDesign = HistoryDesign + "<li>"+
											"<span class='iconbox'>"+
												"<img src='../SiteAssets/Approvals/assets/images/time-icon-1.png' alt=''>"+
    										"</span>"+
											"<div class='approvelheadeing'>"+
												"<h3 class='mainheading'>Approvel Initiation</h3>"+
       											"<span  class='date-sec'>"+moment(QueryResultInitialized[0].Created).format('DD MMM YYYY')+" "+ActionTime+"</span>"+
    										"</div>"+
    										"<p class='waitsec initialize'>initialized</p>"+
    										"<div class='row'>"+
    											"<div class='col-sm-6 flexitem'>"+
													"<div class='imgsetion'>"+
														"<img src='"+RequestByPhoto+"' alt=''>"+
            										"</div>"+
            										"<div class='imagecontent'>"+
														"<h4>"+QueryResultInitialized[0].Author.Title+"</h4>"+
														"<a href='#'>"+QueryResultInitialized[0].Author.EMail+"</a>"+
            										"</div>"+
        										"</div>"+
												"<div class='col-sm-6 flexitem'>"+
													"<div class='imagecontent'>"+
														"<h4>Purpose:</h4>"+
                										"<p class='Purposetext'>"+QueryResultInitialized[0].Title+"</p>"+
            										"</div>"+
        										"</div>"+
    										"</div>"+  
										"</li>";
		}
		for(var i=0; i<QueryResult.length; i++)
		{
			if(QueryResult[i].ActionTakenbyId != null)
			{
				var eventDateObj=new Date(QueryResult[i].Modified);
				var ActionTime = eventDateObj.toTimeString();
				var H = +ActionTime.substr(0, 2);
				var h = (H % 12) || 12;
				var ampm = H < 12 ? " AM" : " PM";
				ActionTime= h + ActionTime.substr(2, 3) + ampm;
				
				var ActionByPhoto=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +QueryResult[i].ActionTakenby.EMail;
				
				var StatusImg = '';
						if(QueryResult[i].Status== "Rejected"){StatusImg = "../SiteAssets/Approvals/assets/images/rejected-img.png";}
						else if(QueryResult[i].Status== "Initiated" || QueryResult[i].Status == 'Pending'){StatusImg ="../SiteAssets/Approvals/assets/images/initiated-img.png";}
						else if(QueryResult[i].Status== "Approved"){StatusImg ="../SiteAssets/Approvals/assets/images/approved-img.png";}
						else if(QueryResult[i].Status== "Forwarded"){StatusImg ="../SiteAssets/Approvals/assets/images/forwarded-img.png";}
				
				var SignatureDesignHTML='';		
				if(QueryResult[i].SignType == 'SignText')//SignDraw
    			{
    				SignatureDesignHTML = "<span id='SignatureText' class='signature-front'>"+QueryResult[i].DrawSign+"</span>";
                               	        							
				}
				else if(QueryResult[i].SignType == 'SignDraw')
				{
					SignatureDesignHTML = "<img class='process-approve-signature-img' src='"+QueryResult[i].DrawSign+"' alt='signature'>";                                  	        							
				}
				else if(QueryResult[i].SignType == 'SignImage')
				{
					var SignUrl='';
					if(QueryResult[i].AttachmentFiles.results.length>0)
					{
						SignUrl = QueryResult[i].AttachmentFiles.results[0].ServerRelativeUrl;
					}    						
					SignatureDesignHTML = "<img class='process-approve-signature-img' src='"+SignUrl+"' alt='signature'>";                                   	        							
				}    					

										
				HistoryDesign = HistoryDesign + "<li>"+
    												"<span class='iconbox'>"+
        												"<img src='"+StatusImg+"'>"+
    												"</span>"+
													"<div class='approvelheadeing'>"+
        												"<h3 class='mainheading'>"+QueryResult[i].StepName+"</h3>"+
        												"<span  class='date-sec'>"+moment(QueryResult[i].Modified).format('DD MMM YYYY')+" "+ActionTime+"</span>"+
    												"</div>"+
    												"<p class='waitsec completed' style='color:#4e9a06'>"+QueryResult[i].Status+" by e-Signed</p>"+
    												"<div class='row'>"+
        												"<div class='col-sm-6 flexitem'>"+
            												"<div class='imgsetion'>"+
                												"<img src='"+ActionByPhoto+"'>"+
            												"</div>"+
            												"<div class='imagecontent'>"+
                												"<h4>"+QueryResult[i].ActionTakenby.Title+"</h4>"+
                												"<a href='#'>"+QueryResult[i].ActionTakenby.EMail+"</a>"+
            												"</div>"+
        												"</div>"+
														"<div class='col-sm-6 flexitem'>"+
            												"<div class='signbox'>"+
																"<div class='m-0'>"+
																	"<span class='pr-8 chip-text-box' style='color:#333; cursor:pointer;' title=''></span><span class='chip-icon-box'>"+SignatureDesignHTML+"</span>"+
                												"</div>"+
                											
            											"</div>"+
        											"</div>"+
    											"</div>"+
											"</li>";
			}
		}	
	}
	$("#HistoryList").empty().append(HistoryDesign);
}