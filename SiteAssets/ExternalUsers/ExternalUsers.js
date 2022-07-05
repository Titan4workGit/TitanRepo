var userID=_spPageContextInfo.userId;
var CompanyId = titanForWork.getQueryStringParameter('CompanyId');
var countchat=0;
var check=false;
var Client='';
var clientId;
var guestLoginId;
var arrId;
var IntSuperID;
var SupervisorGuestId='';
var UserAuthorization;
var dataID='';
var DisplayText;
$(document).ready(function(){
	getUser();
	GetClientName();
	ValidateUser();	
	getTemplate('value');
	clickEvent();
	getCategory();
	SetCalendar();
	bindEvent();
	if(UserAuthorization==true){
	  userActivityNotificationEntry(_spPageContextInfo.userId,window.location)
	}
	
	
	$('#btnOrgAssociation').click(function(){
       $('#lblOrganization').empty()
	    $('#lblOrganization').append('Organization Name:<span class="color-red">*</span>');
	    	  })
	  
	  $('#btnIndividual').click(function(){
	   $('#lblOrganization').empty()
	    $('#lblOrganization').append('Group Name:<span class="color-red">*</span>');
	    	   

	  })
	  
	  $('#btnOrgAssociation').attr('checked',true); 
	  $('#lblOrganization').append('Organization Name:<span class="color-red">*</span>');

})



function clickEvent(){
	$('#btnSubmit').click(function(){
		addGuestUser();	
	})
	
	$('#btnCopyGuestPortal').click(function(){
      copyURL=_spPageContextInfo.webAbsoluteUrl+'/SitePages/Guesthomepage.aspx';
      var inputc = document.body.appendChild(document.createElement("input"));
      inputc.value=copyURL;
      //copyURL.focus();
	  inputc.select();
	  document.execCommand('copy');
	  var newLine = "\r\n"
	  var msg =copyURL;
            msg += newLine;
            msg += newLine
            //msg += newLine;
            msg += 'Url Copy Successfully'          
      
	  alert("URL has been copied. Press Ctrl+V to use it");
  })
	
	$('#btnUpdate').click(function(){
		UpdateItem();
	})	
	$('#btnUpdateClose').click(function(){
		clearPeoplePickerControl('upStakeholdersEmployeePicker');
		clearPeoplePickerControl('UpdateSupervisorEmployeePicker');
	})
	
	$('#closeModel').click(function(){
		clearPeoplePickerControl('upStakeholdersEmployeePicker');
		clearPeoplePickerControl('UpdateSupervisorEmployeePicker');
	
	})
	
	$('#closeModel').click(function(){
		clearTxt();
	})
	
	$('#CreateClientEntry').click(function(){
		AddClientName();
		GetClientName();
	})
	
	
	
	$('#btnCross').click(function(){
		GetClientName();
	})
	
	$('#btnCross').click(function(){
		GetClientName();
	})
	
	$('#statusAction').click(function(){
	
    var status=$( "#DDLStatus option:selected" ).text();
    if(status=='Active'){		
	  $('#DDLStatus').val('Inactive');
	 }
	 else{
	    $('#DDLStatus').val('Initiated');

	 }

		
	})
	
	$('#btnAddnew').click(function(){
		 //setPeoplePickerUsersInfoCurrentGroups("SupervisorEmployeePicker",_spPageContextInfo.userDisplayName);
		// setPeoplePickerUsersInfoCurrentGroups("addStakeholdersPicker",_spPageContextInfo.userDisplayName);	 
	
	})	
	$('#addClose').click(function(){
		clearTxt();
	})
	
	$('#searchOrg').click(function(){
		GetClientName();
	
	})
	
	$('#SearchOrg').click(function(){
	   var AssociationUpdate=$( "#ddlAssociationUpdate option:selected" ).text();
	   if(AssociationUpdate=='Single'){
		GetClientName();
		}
		else{
		alert("You can't change Organization Name!");
		$('otherOrganizationSearch').hide();
		 return false;
		}
		
	})	
	$('#btnSelect').click(function(){
	    var selectedOrg =  $('.ProjectchkList:checked').val();
	    Client=selectedOrg.split(',');   
	    $('#txtAddOrganization').prop( "disabled", true );				
		$('#txtAddOrganization').val(Client[1]);
		$('#txtAddExtSupervisor').val(Client[3]);
		$('#updateExtSupervisor').val(Client[3]);
		$('#ddlAddTemplate').val(Client[4]);	
		$('#ddlCollaborationType').val(Client[5]);
		$('#ddlCollaboration').val(Client[5]);
        $('#ddlUpdateTemplate').val(Client[4])
        $('#txtIntSupervisor').val(Client[6]);
        //$('#txtIntSupervisor').val(Client[6]);
        
        IntSuperID=Client[7];
		//alert(selectedOrg);
		SupervisorGuestId=Client[2];	
	    $('#txtUpdateOrg').prop( "disabled", true );				
		$('#txtUpdateOrg').val(Client[1]);	
		debugger;
	    arrId=[];
		var member='';
		for(var i=8; i<Client.length; i++)
		{   
		  if(i%2==0){
		    arrId.push(Client[i]);
		   }
		   else{
		         member+=Client[i]+'; ';
		       }
		}
		$('#addStakeholders').val(member); 
	
	})

}


function bindEvent(){

	var Active=$("#checkbox");
	Active.prop('checked',true)            
	$("#checkSelfCompany").prop('checked',false)
	
	$('#btnfiter').click(function(){
	  URL();
	})	
	$('#addDate').datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: "-50:+50"
		});		
	$('#addDate').datepicker("option", "dateFormat", "dd/mm/yy");
	$('#addDate').attr("readonly", "readonly");
	$('#ValidDate').attr("readonly", "readonly");
	
	
	InitializePeoplePicker("LoginNameEmployeePicker", false);
	InitializePeoplePicker("SupervisorEmployeePicker", false);
	InitializePeoplePicker("filterSupervisorEmployeePicker", false);
	InitializePeoplePicker("addStakeholdersPicker", true);
	InitializePeoplePicker("peoplePickerSale", false);
	InitializePeoplePicker("upStakeholdersEmployeePicker", true);
	InitializePeoplePicker("UpdateSupervisorEmployeePicker", false);
	InitializePeoplePicker("peoplePickerExtSupervisor", false);
	InitializePeoplePicker("filterExtSupervisor", false);
	InitializePeoplePicker("peoplePickerExtSupervisor", false);
    InitializePeoplePicker("peoplePickerIntSupervisor", false);
    InitializePeoplePicker("peoplePickerStakeholder", true);




} 

function SetCalendar()
{
	var d = new Date();	
    today = d.getMonth()+1 + ' ' + d.getDate() + ' ' + d.getFullYear();
    Validdate = d.getMonth()+1 + ' ' + d.getDate() + ' ' + (d.getFullYear()+1);

    $('#ValidDate').datepicker({
        defaultDate: 0,
        minDate: 0,
        maxDate: "+48m",
        dateFormat: 'dd/mm/yy',
    }).datepicker("setDate", new Date()) ;
    $('#addDate').datepicker({
        defaultDate: 0,
        minDate: 0,
        maxDate: "+48m",
        dateFormat: 'dd/mm/yy',
    }).datepicker("setDate", new Date(Validdate)) ;
        
    $('#ValidDate').change(function () {
        var from = $('#ValidDate').datepicker('getDate');
        var date_diff = Math.ceil((from.getTime() - Date.parse(today)) / 86400000);
        var maxDate_d = date_diff+10+'m';
        date_diff = date_diff + 'd';
        });
        
     $('#addDate').change(function () {
        var from = $('#ValidDate').datepicker('getDate');
        var date_diff = Math.ceil((from.getTime() - Date.parse(today)) / 86400000);
        var maxDate_d = date_diff+10+'m';
        date_diff = date_diff + 'd';
        });    
}


function ConvertDateTimeFormat(date, delimiter) {
    return date.split(delimiter)[1] + "" + delimiter + "" + date.split(delimiter)[0] + "" + delimiter + "" + date.split(delimiter)[2];
}


function setPeoplePickerUsersInfoCurrentGroups(controlNameID, LoginNameOrEmail) 
{
    var peoplePickerDiv = $("[id^='" + controlNameID + "']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
    peoplePicker.AddUserKeys(LoginNameOrEmail, false);
}


function InitializePeoplePicker(peoplePickerElementId, allowMultiple) {
    if (allowMultiple == null) {
        allowMultiple = false;
    }
    var schema = {};
    //schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['PrincipalAccountType'] = 'User';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = allowMultiple;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '100%';
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

function getPeopleUserInfoGroups(pickerPickerControlId) {
    DisplayText=[];
    var sharedUserArrayList = new Array();
    var pickerDiv = $("[id^='" + pickerPickerControlId + "']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
    var users = peoplePicker.GetAllUserInfo();
    if (users.length > 0) {
      //  var allUsersID = new Array();
      //  var usersEmailIDs = new Array();
        for (var i = 0; i < users.length; i++) {
            sharedUserArrayList.push(GetUserIdGroups(users[i].Key));
            DisplayText.push(users[i].DisplayText);
        }
    }
    return sharedUserArrayList;
}
function GetUserIdGroups(userName) {
    var userID = "";
    var prefix = "i:0#.f|membership|";
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var accountName = userName;// prefix+userName;       
    $.ajax({
        url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(accountName) + "'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            userID = data.d.Id;
            //$scope.UserInfoFullName = data.d.Title;
            // alert("Received UserId" + data.d.Id);
            // alert(JSON.stringify(data));
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
    return userID;
}



var OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,Client_Name/Title,Client_Name/Id,email,Association,Organization,ReferenceCode,CollaborationType,Guest_name,Status,Supervisor/Id,Supervisor/Title,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor&$filter=InternalStakeholdersId eq '"+userID+"' or Supervisor eq '"+userID+"'&$orderby=Created desc";

function URL(){
debugger;
   var ddlcategory=$('#ddlTypefilter option:selected').text();  
   var ddlOrganizor=$('#ddlOrganizor option:selected').val();
   var ddlAssociation=$('#ddlAssociation option:selected').val();
   var desination=$('#filterDesination').val();
   var ddlstatus=$('#ddlStatus').val();
   var SupervisorId= getPeopleUserInfoGroups("filterSupervisorEmployeePicker");   
   var extSupfilter=getPeopleUserInfoGroups("filterExtSupervisor");

   /*var query='';
   if(desination.length>0){
      query="and Status eq '"+ddlstatus+"' and Designation eq '"+desination+"'";
     }   
   else{
        query="and Status eq '"+ddlstatus+"'";
       }
   if(extSupfilter.length>0){
      query+=" and Supervisor_GuestId eq '"+extSupfilter+"'";
    }*/  
   if(SupervisorId.length>0&& ddlcategory =='ALL' && ddlOrganizor=='ALL' && ddlstatus=='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"' and Supervisor_GuestId eq '"+extSupfilter[0]+"'"; 
       getUser();
   }
   if(SupervisorId.length==0&& ddlcategory =='ALL' && ddlOrganizor=='ALL' && ddlstatus=='ALL' && extSupfilter.length==0 && desination==''){
      OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,Client_Name/Title,Client_Name/Id,email,Association,Organization,ReferenceCode,CollaborationType,Guest_name,Status,Supervisor/Id,Supervisor/Title,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor&$filter=InternalStakeholdersId eq '"+userID+"' or Supervisor eq '"+userID+"' ";
       getUser();
   }
   
   if(SupervisorId.length>0&& ddlcategory =='ALL' && ddlOrganizor=='ALL' && ddlstatus=='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory =='ALL' && ddlOrganizor=='ALL' && ddlstatus=='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus=='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"' and Supervisor_GuestId eq '"+extSupfilter[0]+"' and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus=='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"' and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus=='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus=='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"' and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"' and CollaborationType eq '"+ddlcategory+"' and Status eq '"+ddlstatus+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory=='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"' and Status eq '"+ddlstatus+"'"; 
       getUser();
   }
   
   /*if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus=='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"' and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }*/
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"' and CollaborationType eq '"+ddlcategory+"' and Status eq '"+ddlstatus+"' and Supervisor_GuestId eq '"+extSupfilter+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"' and CollaborationType eq '"+ddlcategory+"' and Status eq '"+ddlstatus+"' and Supervisor_GuestId eq '"+extSupfilter+"' and Designation eq '"+desination+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory=='ALL' && ddlOrganizor!='ALL' && ddlstatus=='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory=='ALL' && ddlOrganizor!='ALL' && ddlstatus=='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Client_NameId eq '"+ddlOrganizor+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus=='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Client_NameId eq '"+ddlOrganizor+"' and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus=='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"' and CollaborationType eq '"+ddlcategory+"' and Supervisor_GuestId eq '"+extSupfilter+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory=='ALL' && ddlOrganizor!='ALL' && ddlstatus=='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"' and Supervisor_GuestId eq '"+extSupfilter+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and  CollaborationType eq '"+ddlcategory+"' and Status eq '"+ddlstatus+"' Supervisor_GuestId eq '"+extSupfilter+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory=='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Status eq '"+ddlstatus+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory=='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Status eq '"+ddlstatus+"' and Supervisor_GuestId eq '"+extSupfilter+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory=='ALL' && ddlOrganizor=='ALL' && ddlstatus=='ALL' && extSupfilter.length==0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Designation eq '"+desination+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Designation eq '"+desination+"' and CollaborationType eq '"+ddlcategory+"' and Status eq '"+ddlstatus+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory=='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Client_NameId eq '"+ddlOrganizor+"' and  and Status eq '"+ddlstatus+"' "; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Client_NameId eq '"+ddlOrganizor+"'  and Status eq '"+ddlstatus+"' and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Client_NameId eq '"+ddlOrganizor+"' and Status eq '"+ddlstatus+"' and CollaborationType eq '"+ddlcategory+"' and Designation eq '"+desination+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory=='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Status eq '"+ddlstatus+"' and Designation eq '"+desination+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory=='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Status eq '"+ddlstatus+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory=='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Status eq '"+ddlstatus+"' and Designation eq '"+desination+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Status eq '"+ddlstatus+"' and Designation eq '"+desination+"' and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Status eq '"+ddlstatus+"'  and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }

   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Status eq '"+ddlstatus+"' and Designation eq '"+desination+"' and CollaborationType eq '"+ddlcategory+"' Client_NameId eq '"+ddlOrganizor+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length==0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Status eq '"+ddlstatus+"' and Designation eq '"+desination+"' and CollaborationType eq '"+ddlcategory+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"' and CollaborationType eq '"+ddlcategory+"' and  Status eq '"+ddlstatus+"' and Client_NameId eq '"+ddlOrganizor+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus=='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"' and CollaborationType eq '"+ddlcategory+"'  and Client_NameId eq '"+ddlOrganizor+"'"; 
       getUser();
   }
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"' and CollaborationType eq '"+ddlcategory+"' and  Status eq '"+ddlstatus+"' and Client_NameId eq '"+ddlOrganizor+"' and  Designation eq '"+desination+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory=='ALL' && ddlOrganizor!='ALL' && ddlstatus=='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"' and Client_NameId eq '"+ddlOrganizor+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"' and CollaborationType eq '"+ddlcategory+"' and  Status eq '"+ddlstatus+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"' and CollaborationType eq '"+ddlcategory+"' and  Status eq '"+ddlstatus+"' and Designation eq '"+desination+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory=='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"' and Status eq '"+ddlstatus+"' and Designation eq '"+desination+"'"; 
       getUser();
   }
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor=='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor_GuestId eq '"+extSupfilter[0]+"'  and  Status eq '"+ddlstatus+"'"; 
       getUser();
   }
   
   if(SupervisorId.length>0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination!=''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Supervisor eq '"+SupervisorId[0]+"'  and Client_NameId eq '"+ddlOrganizor+"' and CollaborationType eq '"+ddlcategory+"' and Supervisor_GuestId eq '"+extSupfilter+"' and Designation eq '"+desination+"'"; 
       getUser();
   }
   
   if(SupervisorId.length==0 && ddlcategory!='ALL' && ddlOrganizor!='ALL' && ddlstatus!='ALL' && extSupfilter.length>0 && desination==''){
       OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ValidUpto,ID,Designation,email,Client_Name/Title,Client_Name/Id,Association,Organization,ReferenceCode,CollaborationType,Status,Guest_name,Supervisor/Id,Supervisor/Title,Supervisor_Guest/Title,Supervisor_Guest/Id,LoginName/Id,LoginName/Title&$expand=LoginName,Client_Name/Title,Client_Name/Id,Supervisor_Guest,Supervisor&$filter=Client_NameId eq '"+ddlOrganizor+"' and CollaborationType eq '"+ddlcategory+"' and Supervisor_GuestId eq '"+extSupfilter+"'"; 
       getUser();
   }


}

function getUser()
{	debugger;
    //var ddlstatus=1;
  
   //var  OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ID,Designation,email,Organization,ReferenceCode,CollaborationType,Status,Supervisor/Id,Supervisor/Title,LoginName/Id,LoginName/Title&$expand=LoginName,Supervisor&$filter=LoginNameId eq '"+userID+"' or SupervisorId eq '"+userID+"' and Status eq 'Active'";
	
	$.ajax({
        url: OwnURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;          
            debugger;
            var tableItemsHTML = "";
            var LoginName='';
           $('#mainDivAreaGuestUser').empty();
			for (var i = 0; i < items.length; i++) 
            {
           	 	 itemId = items[i].ID;
           	 	var Status= items[i]["Status"];
           	 	if(Status=='Active'){
           	 	   LoginName=items[i].LoginName.Title;
           	 	   if(LoginName==null) {
           	 	     LoginName=items[i].Guest_name;
           	 	   }
           	 	  
           	 	}
           	 	else{
                     LoginName=items[i].Guest_name; 
                    }
                    
           	 	if(LoginName==null){
           	 	    LoginName='';
           	 	   }
           	 	var Designation= items[i]["Designation"];
           	 	if(Designation==null){
           	 	    Designation='';
           	 	   }
				
				var Title = items[i]["Title"];
				var email=items[i]["email"];
				if(email==null){
				   email=""
				   }
				var Organization=items[i].Client_Name.Title;				
				if(Organization==null){Organization=''};
				var ReferenceCode=items[i]["ReferenceCode"];
				if(ReferenceCode==null){
				    ReferenceCode=""
				  }  
				var Association=items[i]["Association"]
				if(Status==null){
				 Status='Pending';
				}
				var ValidUpto=new Date(items[i].ValidUpto);
				ValidUpto=$.datepicker.formatDate('dd-M-yy', ValidUpto);				
				var CollaborationType= items[i]["CollaborationType"];
				if(CollaborationType==null){CollaborationType=''};
				var Supervisor= items[i].Supervisor.Title;
				if(Supervisor==null){Supervisor=''};
                tableItemsHTML += "<tr class='text-center'><td>" +LoginName+ "</td><td>" + Designation+ "</td><td>" + Organization+ "</td><td>" + email+ "</td><td>" + CollaborationType+ "</td><td>" + Supervisor+ "</td><td>" +ReferenceCode+ "</td><td>" +ValidUpto+ "</td>"
                if(Status=='Inactive'){
                tableItemsHTML+='<td style="color:red">' + Status+ '</td>'; 
                }
                else if(Status=='Active'){
                tableItemsHTML+='<td>' + Status+ '</td>'; 
                }
                else{
                tableItemsHTML+='<td style="color:blue">' + Status+ '</td>'; 
                }               
                tableItemsHTML +="<td  style='text-align:center;'><div class='GuestUser-edit-lock-btn-box'>";
                if(Status=='Active' && countchat!=0){
                tableItemsHTML +="<a type='button' href='#' class='custom-edit-btn chat-tag-btn' data-toggle='modal' data-target='#mg-filter'><span class='chat-tag-count'></span><i class='fa fa-comments-o' aria-hidden='true'></i></a>"
                }
                if(Supervisor==_spPageContextInfo.userDisplayName){
                tableItemsHTML +="<a type='button' href='#' class='custom-edit-btn'  onclick='editGuestUser("+itemId+")'><span class='fa fa-pencil'></span></a>"}
                tableItemsHTML +="</div></td></tr>";
			   }          	
	            var completebody = tableItemsHTML;	          	
          	if (items.length == 0) 
            {
                $("#NoRecordFoundGuestUser").show();
            }
            else
            {
            	 $("#NoRecordFoundGuestUser").hide();
            }
            
            $('#mainDivAreaGuestUser').append(completebody);
            if (items.length > 0) 
            {
               GenerateTableMyGuestUserList();					 // GenerateTableSharedWithMe();
            }
        }, eror: function (data) {

            console.log('error');
        }
    });  
}
function GenerateTableMyGuestUserList()
{
    sorterTableGuestUserList = new TINY.table.sorter('sorterTableGuestUserList', 'TempTableGuestUser', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
       // colddid: 'columnsMyGuestUser',
        currentid: 'currentpageMyGuestUser',
        totalid: 'totalpagesMyGuestUser',
        startingrecid: 'startrecordMyGuestUser',
        endingrecid: 'endrecordMyGuestUser',
        totalrecid: 'totalrecordsMyGuestUser',
        hoverid: 'selectedrowMyGuestUser',
        pageddid: 'pagedropdownMyGuestUser',
        navid: 'tablenavMyGuestUser',
        //sortcolumn: 0,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}



function addGuestUser()
{ debugger

	var ddlCollaborationType= $( "#ddlCollaborationType option:selected" ).text();
	var guestName =$("#txtAddGuestName ").val();
    if(guestName .length==0){
	alert('Please Enter Name !')
	return false;
	}

	var Email = $("#txtAddEmail").val();
	if(Email.length==0){
	alert('Please Enter Email !')
	return false;
	}
	if(Email!=''){	
	if(checkEmail==false){
	  alert('Please Enter valid Email!')	  
	  return false}}
    var emailCheck= checkUserEmail();
	if(emailCheck==true){
	   alert('this email already exists');
	   return false;
  	}
	var Designation=$('#txtAddDesignation').val();
	var Organization=$('#txtAddOrganization').val();
    if(Organization.length==0){
	alert('Please select Organization!');
	return false;
	}

	var ReferenceCode=$('#txtAddReferenceCode').val();
	var Association=$( "#ddlAssociation option:selected" ).text();
	var StakeholdersPicker =new Array();
	    /*StakeholdersPicker=getPeopleUserInfoGroups('addStakeholdersPicker');
	    if(StakeholdersPicker.length==0){
	      alert('Please Enter Members!')
	      return false;

	    }
	 var SupervisorEmploye=getPeopleUserInfoGroups('SupervisorEmployeePicker');
	    if(SupervisorEmploye.length==0){
	      alert('Please Enter Supervisor!');
	      return false;
	    
	    }   */
	var TemplateType=$( "#ddlAddTemplate option:selected" ).val();
	var ExtSupervisor=$('#txtAddExtSupervisor').val();
	/*if(ExtSupervisor.length==0){
	alert('Please Enter External Supervisor !')
	return false;
	}*/
	var Date=$('#addDate').val();
	var date=ConvertDateTimeFormat(Date, '/')

	if(Date.length==0){
	alert('Please Enter Validity date !')
	return false;
	}
	
	var sup;   
    if(SupervisorGuestId==''){
       SupervisorGuestId=sup;
    }
    
   if(IntSuperID==''){
	 alert('Please Enter Internal Supervisor at Customers place');
	 return false;
	}
	
	/*if(arrId[0]==''){
	  alert('Please Enter Internal Stakeholder at Customers place');
	 return false;
	}*/
	if(arrId[0]==''){
	 arrId[0]=0;
	}

	var ListName='ExternalUsers';
    var Metadata;
    		Metadata = {
        __metadata: {'type': 'SP.Data.ExternalUsersListItem'},
        Title : Email,
		CollaborationType: ddlCollaborationType,
		Guest_name:guestName,
	    email:Email,
	    Designation:Designation,
	    Organization:Organization,
	    Association:Association,
	    //External_Supervisor:ExtSupervisor,
	    Client_NameId:Client[0],
	    ReferenceCode:ReferenceCode,
	    Supervisor_GuestId:SupervisorGuestId,
	    InternalStakeholdersId:{ 'results' : arrId},
	    TemplateType:TemplateType,
	    ValidUpto:date,
	    SupervisorId:IntSuperID
	    
    };       
       
    $.when(AddItemToList(ListName,Metadata)).done(function(responseIdmore)
    {   		     
	   alert('Request to add the guest user '+guestName+', has been initiated successfully');  
	   var file=$("#addFileUpload").val();
	   if(file.length>0){
	     AddAttachmentsUser(responseIdmore.d.Id)
	   }
	   getUser(); 
	   $("#add-filter").modal('hide');
	   cleartextbox();         
		    				   
	})
}




	
//Add item in list
function AddItemToList(ListName,Metadata)
{
    var dfd = $.Deferred();

    var ownURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items";
    $.ajax({    	
        url: ownURL,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data:JSON.stringify(Metadata),
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


function editGuestUser(ItemId) {  
    clearPeoplePickerControl('upStakeholdersEmployeePicker');
	clearPeoplePickerControl('UpdateSupervisorEmployeePicker');
    dataID=ItemId;
    var Picture6= $('#upGuestuserpick');
	Picture6.attr('src',"");

	$("#edit-filter").modal();
	$('#statusAction').text('');	 	
	var ListName ='ExternalUsers';
	var submitEventFired=false;	
	var upStakeholdersEmployeePicker=[];
	var Ownurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items?$select=Title,ID,Designation,email,Association,External_Supervisor,Organization,ReferenceCode,Client_Name/Title,Client_Name/Id,CollaborationType,Status,ValidUpto,TemplateType,Supervisor/Title,SupervisorId,Supervisor_Guest/Title,Supervisor_Guest/Id,InternalStakeholders/Title,InternalStakeholders/Id,LoginName/Id,LoginName/Title&$expand=LoginName,InternalStakeholders,Supervisor_Guest,Supervisor,Client_Name/Title,Client_Name/Id,AttachmentFiles&$filter=ID eq "+ItemId+"";

   // var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('"+ListName+"')/Items?select=*&$expand=LoginName,Supervisor,InternalStakeholders&$filter&$filter=ID eq "+ItemId+"";
    $.ajax({    	           
        url: Ownurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: false,
        success: function (data)
         {	debugger
           	var results=data.d.results;
           	arrId=[];
           	var status =results[0].Status;
           	var GusetUser='';
           	guestLoginId=results[0].LoginName.Id;
            
           	if(status=='Active'){
           	  // $('#DIVStatus').append('<a href="#" class="statusDiv" id="statusAction"></a>');
           	   $('#statusAction').text('Inactive this user');
           	   GusetUser= results[0].LoginName.Title;
           	   guestLoginId=results[0].LoginName.Id;
           	  }
           	else{
           	      GusetUser=results[0].Guest_name;
           	   }
           	var Supervisor= results[0].Supervisor.Title
           	if(status=='Inactive'){
           	   //$('#DIVStatus').append('<a href="#" class="statusDiv" id="statusAction"></a>');
           	   $('#statusAction').text('Initiate this user again');

           	}
           	IntSuperID=results[0].SupervisorId;
           	var Stakeholders =results[0].InternalStakeholders;
           	var Member='';
           	for(var i=0;i<Stakeholders.results.length;i++){
                Member+=Stakeholders.results[i].Title+'; '
                arrId.push(Stakeholders.results[i].Id)
              //setPeoplePickerUsersInfoCurrentGroups("upStakeholdersEmployeePicker", Stakeholders.results[i].UserName);
            }
            upStakeholdersEmployeePicker.push(Stakeholders);
           	DataId=ItemId;
            $('#txtUpdateReference').val(results[0].ReferenceCode);            
             //setPeoplePickerUsersInfoCurrentGroups("UpdateSupervisorEmployeePicker",Supervisor); 
            $('#txtUpdateSupervisor').val(Supervisor);
            $('#upStakeholders').val(Member);

           

            var date=new Date(results[0].ValidUpto);
             var ValidUpto= $.datepicker.formatDate('dd/mm/yy', date);            
				//PlanedStartDate=$.datepicker.formatDate('dd/mm/yy', date);
			$('#ValidDate').val(ValidUpto);
			$('#txtUpdateLogonName').val(GusetUser);
			$('#txtDesignation').val(results[0].Designation);
			$('#txtUpdateOrg').val(results[0].Client_Name.Title);
			clientId=results[0].Client_Name.Id;			
			$('#ddlAssociationUpdate').val(results[0].Association);
			$('#ddlCollaboration').val(results[0].CollaborationType);

			
			$('#updateExtSupervisor').val(results[0].Supervisor_Guest.Title);
			SupervisorGuestId=results[0].Supervisor_Guest.Id;
			$('#txtupdateEmail').val(results[0].email);		
						
			$('#DDLStatus').val(status);
			/*if(status=='Active'){
			 $("#DDLStatus")[0].selectedIndex = 0;
			}
			else
			{
			  $("#DDLStatus")[0].selectedIndex = 1;
			}*/
			$('#ddlUpdateTemplate').val(results[0].TemplateType);
			var img=$('#upGuestuserpick');
			if(results[0].AttachmentFiles.results.length>0){
			img.attr('src',results[0].AttachmentFiles.results[0].ServerRelativeUrl);          
           	}
			
				
				
		 }, eror: function (data)
		 		{
		      console.log('error');
		        }                   
		 });     
}




function UpdateItem()
{     debugger;
	var DDLStatus= $("#DDLStatus option:selected").text();
	if(DDLStatus=="Inactive")
	{
	  getExternaluserBySupervisor();
	  if(user==true){
	  alert('You can not Inactive this user');
	  return false;
	  }
	}
	var Designation=$('#txtDesignation').val();
	var Organization=$('#txtUpdateOrg').val();
	var ReferenceCode=$('#txtUpdateReference').val();
	var userId=_spPageContextInfo.userId;
    var check =false;
    debugger;
	/*var StakeholdersPicker =new Array();
	    StakeholdersPicker=getPeopleUserInfoGroups('upStakeholdersEmployeePicker');
	    for(var i=0;i<StakeholdersPicker.length;i++){
	        if(userId==StakeholdersPicker[i])
	          check =true;
	        }
	 /*if(check==false)  {
	   alert('You are not authorized to Update ! ');
	   return false;

	 } 
	 if(StakeholdersPicker.length==0){
	      alert('Please Enter Members!')
	      return false;

	    }*/
    
	var TemplateType=$( "#ddlUpdateTemplate option:selected" ).val();
	var association=$( "#ddlAssociationUpdate option:selected" ).text();
    var collaboration=$( "#ddlCollaboration option:selected" ).text();
    var email=$('#txtupdateEmail').val();  
	if(email.length==0){
	alert('Please Enter Email !')
	return false;
	}
    var UpdateOrg=$('#txtUpdateOrg').val();  
	if(UpdateOrg.length==0){
	alert('Select Organization Name!')
	return false;
	}
    /*var updateExtSupervisor=$('#updateExtSupervisor').val();  
	if(updateExtSupervisor.length==0){
	alert('Please enter External Supervisor email !')
	return false;
	}*/
	if(Client.length>0){
	  clientId=Client[0];	  
    } 
    var sup;   
    if(SupervisorGuestId==''){
       SupervisorGuestId=sup;
    }
	var Date=$('#ValidDate').val();
	var date=ConvertDateTimeFormat(Date, '/')
	if(Date.length==0){
	alert('Please Enter Validity date !')
	return false;
	}
	
	/*var SupervisorEmploye=getPeopleUserInfoGroups('UpdateSupervisorEmployeePicker');	
       if(SupervisorEmploye.length==0){
	      alert('Please Enter Members!')
	      return false;

	    }*/
	 if(arrId[0]==''){
	  arrId[0]=0;
	}   

     var Metadata;
    		Metadata = {
        __metadata: {'type': 'SP.Data.ExternalUsersListItem'},
        Designation:Designation,
        Title:email,
	    Status:DDLStatus,
	    Organization:Organization,
	    ReferenceCode:ReferenceCode,
	    Association:association,
	    email:email,
	    CollaborationType:collaboration,
	    //External_Supervisor:updateExtSupervisor,
	    Client_NameId:clientId,
	    Supervisor_GuestId:SupervisorGuestId,
	    InternalStakeholdersId:{ 'results' : arrId},
	    TemplateType:TemplateType,
	    ValidUpto:date,
	    SupervisorId:IntSuperID
    };  
	$.when(UpdateItemToList(Metadata)).done(function(responseIdmore)
    {
    	
	     alert('updated successfully');	     	      
	      check=false;
	      var fileUpdate=$("#guestUserPick").val();
	      if(fileUpdate.length>0){
	        AddAttachmentsUser(dataID)
	      }  
	       getUser();
			})
}

//Edit item in list
function UpdateItemToList(Metadata)
{
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items('"+DataId+"')",
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
            // console.log(data);
            dfd.resolve(data);
        },
        error: function (error) {
            alert("Error occured while updating item - " + JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


function validateEmail(){
debugger
        var GuestEmail= $('#txtAddEmail').val();
        var clientEmail= $('#txtEmail').val();
        var email;
        if(GuestEmail.length>0){
          email = document.getElementById("txtAddEmail").value;
         }
         else{
              email = document.getElementById("txtEmail").value;
             } 
        
        if(email!=""){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;
        var emails= email.split(";");
        emails.forEach(function (data) {
        if (reg.test(data) == false) 
        {
            alert('The email address '+ ' "'+data+ '"'+ ' is invalid');
            $('#txtAddEmail').val('');
            $('#txtEmail').val('');

            checkEmail=false;
            return false;
        }
        checkEmail=true;
        return true;
        //validate(email.trim());
        });
        }

}


function FillAccountName(ControlId, UsersValues) {

    try {

        for (var i = 0; i < UsersValues.length; i++) {
            var UserId = UsersValues[i];
             UserId = UserId.get_lookupId();
            GetAccountName(ControlId, UsersValues);
        }
    } catch (err) {

    }
}


function GetAccountName(userControlId, userLookUpId) {


    var context = SP.ClientContext.get_current();
    var user = context.get_web().getUserById(userLookUpId);
    context.load(user);
    context.executeQueryAsync(
        function () {

            if (user.get_email() > 0) {
                setPeoplePickerUsersInfoCurrent(userControlId, user.get_email());
            } else {
                setPeoplePickerUsersInfoCurrent(userControlId, user.get_loginName());
            }

        },
        function (sender, args) {
            //todo errorhandling
            console.log('Error while receiving the properties from the UserProfile');

        }
    );
}


function setPeoplePickerUsersInfoCurrent(id, LoginName) {

    //var fieldName = id + '_TopSpan';
    var peoplePickerDiv = $("[id$='" + id + "']");

    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];

    //var usersobject = ppobject.GetAllUserInfo();
    //var usersobject = peoplePicker.GetAllUserInfo();
    //usersobject.forEach(function (index) {
    //	peoplePicker.DeleteProcessedUser(usersobject[index]);
    //});
    peoplePicker.AddUserKeys(LoginName, false);
}




function AddAttachmentsUser(dataID)
{
    var digest = "";
    $.ajax(
        {
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
        method: "POST",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            digest = data.d.GetContextWebInformation.FormDigestValue;
        },
        error: function (data) {
        }
    }).done(function () {
               
        var guestUserPick= $("#guestUserPick").val();
        if(guestUserPick.length>0){            
          fileInput=$("#guestUserPick");
          }
        var addFileUpload=$("#addFileUpload").val();
        if(addFileUpload.length>0){
          fileInput=$("#addFileUpload");
        }  
        var fileName = fileInput[0].files[0].name;
        var fileNameSplit=fileName.split(".");
            var fileExt=fileNameSplit[fileNameSplit.length - 1];
            var fileLength=fileExt.length;
            var fileSCR=fileName.replace(/[^a-zA-Z]/g, "");
            var fileslice;
            if(fileLength==3){
            fileslice= fileSCR.slice(0,-3);
            }
            if(fileLength==4){
            fileslice= fileSCR.slice(0,-4);
            }debugger;          
            var newFileName=(fileslice+"."+fileExt);
        
        
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileData = e.target.result;
            var res11 = $.ajax(
            {
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items('" + dataID+ "')/AttachmentFiles/ add(FileName='" + newFileName+ "')",
                method: "POST",
                binaryStringRequestBody: true,
                data: fileData,
                processData: false,
                headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "X-RequestDigest": digest
                    //,
                    //"content-length": fileData.byteLength
                },
                success: function (data)
                { 
                	 $("#guestUserPick").val("");
                	                 
                },
                error: function (data) {
                    //alert("Error occured." + data.responseText);
                }
            });
        };
        reader.readAsArrayBuffer(fileInput[0].files[0]);
    });
}


function clearPeoplePickerControl(pickerId) {
    var toSpanKey = pickerId + "_TopSpan";
    var peoplePicker = null;

    // Get the people picker object from the page.
    var ClientPickerDict = this.SPClientPeoplePicker.SPClientPeoplePickerDict;
    // Get the people picker object from the page.
    for (var propertyName in ClientPickerDict) {
        if (propertyName == toSpanKey) {
            peoplePicker = ClientPickerDict[propertyName];
            break;
        }
    }

    if (peoplePicker) {
        var ResolvedUsersList = $(document.getElementById(peoplePicker.ResolvedListElementId)).find("span[class='sp-peoplepicker-userSpan']");
        $(ResolvedUsersList).each(function (index) {
            peoplePicker.DeleteProcessedUser(this);
        });
    }
}



function readURL(input) 
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e)
         {
          var ext = input.value.match(/\.([^\.]+)$/)[1];
		  switch (ext) {
		    case 'jpg':
		    case 'JPG':
		    case 'JPEG':
		    case 'jpeg':
		    case 'GIF':
		    case 'gif':
		    case 'PNG':
		    case 'png':
		    case 'BMP':
		    case 'bmp':


		
		  	var size = input.files[0].size/1024; 	
		  	
				if(size.toFixed(2)<1200)
				{
					$('#upGuestuserpick').attr('src', e.target.result);
				}
				else
				{
			        alert("Image size not more then 1200 KB");
					input.value='';	
					return false;
				}
			  
			
			break;
		    default:
		    alert('Please select image files of JPEG, JPG, GIF,BMP and PNG formatted only.');      
		    input.value = '';
		  }        

        };

        reader.readAsDataURL(input.files[0]);
    }
}

function getCategory() {
	var URL,ListName='CategoryMaster';
	$('#ddlTypefilter').append($('<option/>').val('ALL').text('ALL'));	
	   
	URL=_spPageContextInfo.webAbsoluteUrl +"/_api/web/Lists/getbytitle('CategoryMaster')/Items?$filter=CategoryType eq 'Guest Type' and Status eq 'Yes'";
	$.ajax({
		url:URL,
		headers:{ Accept:'application/json;odata=verbose'},
		async:false,
		success:function (data) {
			var items=data.d.results;
			for(var i=0;i<items.length;i++)
			{
				$('#ddlTypefilter').append($('<option/>').val(items[i].CatogeryName).text(items[i].CatogeryName));
                $('#ddlCollaborationType').append($('<option/>').val(items[i].CatogeryName).text(items[i].CatogeryName));
                $('#ddlCollaboration').append($('<option/>').val(items[i].CatogeryName).text(items[i].CatogeryName));
                $('#ddlCustTypt').append($('<option/>').val(items[i].CatogeryName).text(items[i].CatogeryName));

                				
			}
		},
		error : function (data) {
			console.log(data);
			
		}
	})
}

function checkUserEmail() {
	var URL,ListName='CategoryMaster';
	var ch;
	var Email=$("#txtAddEmail").val();  
	URL=_spPageContextInfo.webAbsoluteUrl +"/_api/web/Lists/getbytitle('ExternalUsers')/Items?$filter=email eq '"+Email+"'";
	$.ajax({
		url:URL,
		headers:{ Accept:'application/json;odata=verbose'},
		async:false,
		success:function (data) {
			var items=data.d.results;
			if(items.length>0){
			    ch=true;
				return true;
			}
			else{
			    ch=false;
				return false;
			}			
			
		},
		error : function (data) {
			console.log(data);
			
		}
	})
	return ch;
}


function clearTxt(){
	clearPeoplePickerControl('addStakeholdersPicker');
	clearPeoplePickerControl('SupervisorEmployeePicker');
	SetCalendar()
	$('#txtAddDesignation').val('');
	$('#txtAddOrganization').val('');
	$('#txtAddReferenceCode').val('');
	$('#txtAddEmail').val('');
	$('#txtAddDesignation').val('');
	$('#txtAddEmail').val('');


}


function GetClientName()
{	debugger;
    var ddlstatus=1;	
	var Ownurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=*,Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,TemplateType,IsActive,Supervisor/Id,Supervisor/Title,SalesPerson/Id,InternalMembers/Title,InternalMembers/Id,InternalSupervisor/Title,InternalSupervisor/Id,SalesPerson/Title&$expand=SalesPerson,Supervisor,InternalSupervisor,InternalMembers&$filter=CompanyID eq '"+CompanyId+"' and IsActive eq '1'&$orderby=Created desc";

	$.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;          
            var stakeholder;
            var tableItemsHTML = "";
           $('#mainDivAreaClientmaster').empty();
           $('#ddlOrganizor').append($('<option/>').val('ALL').text('ALL'));
			for (var i = 0; i < items.length; i++) 
            {
           	 	 itemId = items[i].ID;
           	 	var memberArr=[];
                $('#ddlOrganizor').append($('<option/>').val(items[i].ID).text(items[i].Title));
                var Stakeholders =items[i].InternalMembers;
                if(items[i].InternalMembersId!=null){
	           	    for(var j=0; j<Stakeholders.results.length; j++){
	           	      stakeholderNmae=Stakeholders.results[j].Title;
	           	      stakeholderId=Stakeholders.results[j].Id;
	           	      memberArr.push(stakeholderId,stakeholderNmae);    
	                }
                }
                
                var Supervisor=items[i].Supervisor.Title;
                var SupervisorId=items[i].Supervisor.Id;
           	 	var SalesPerson=items[i].SalesPerson.Title;
           	 	var TemplateType=items[i].TemplateType;
           	 	var IntSupervisor=items[i].InternalSupervisor.Title;
           	 	var IntSupvId=items[i].InternalSupervisor.Id;
           	 	if(SalesPerson==null){
           	 	    SalesPerson='';
           	 	   }
           	 	var ClientCode= items[i]["Client_Code"];
           	 	if(ClientCode==null){
           	 	   ClientCode='';
           	 	}				
				var Title = items[i]["Title"];
				var CustType=items[i]["CustType"];
				if(CustType==null){
				   CustType=""
				   }
				var AttnName =items[i]["Attn_Name"];
				if(AttnName ==null){AttnName=''};
				var BillingAddress =items[i]["City"];
				var EmailId = items[i]["EmailId"];
				if(EmailId==null){EmailId=''};
				var Country = items[i]["City"];
				if(Country==null){Country=''};

				var IsActive= items[i]["IsActive"];
				if(IsActive== true)
					IsActive= "Active";
				
				else
				IsActive="Inactive";
	             var dtl=[];
	             
				 dtl.push(itemId,Title,SupervisorId,Supervisor,TemplateType,CustType,IntSupervisor,IntSupvId,memberArr);	  		
				 
                tableItemsHTML += "<tr><td><label><input type='checkbox' class='ProjectchkList' name='TaskListchk' value='"+dtl+"' onclick='onlyOne(this)' ></label></td><td><span>"+Title+"</span></td><td><span>"+ClientCode+"</span></td><td><span>"+AttnName+"</span></td><td><span>"+CustType+"</span></td></tr>";               
                 //tableItemsHTML +="<td  style='text-align:center;'>";
                //tableItemsHTML +="<div class='Customer-edit-lock-btn-box'><a type='button' href='#' class='custom-edit-btn'  onclick='editClientName("+itemId+")'><span class='fa fa-pencil'></span></a></div></td></tr>";
                //tableItemsHTML +='<div class="Customer-edit-lock-btn-box"><a type="button"  class="custom-edit-btn"><i  onclick="editClientName("'+itemId+'")" class="fa fa-pencil"></i></a></div></td></td></tr>';
			   }          	
	            var completebody = tableItemsHTML;
	          	
          	if (items.length == 0) 
            {
                $("#NoRecordFoundclientmaster").show();
            }
            else
            {
            	 $("#NoRecordFoundclientmaster").hide();
            }
            
            $('#mainDivAreaClientmaster').append(completebody);
            if (items.length > 0) 
            {
               GenerateTableMyCustomerList();					 // GenerateTableSharedWithMe();
            }
        }, eror: function (data) {

            console.log('error');
        }
    });  
}



function GenerateTableMyCustomerList()
{
    sorterTableCustomerList = new TINY.table.sorter('sorterTableCustomerList', 'TempTableClientMaster', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
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







function onlyOneProject(checkbox) 
{
    var checkboxes = document.getElementsByName('ProjectchkList')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

function onlyOne(checkbox) 
{
    var checkboxes = document.getElementsByName('TaskListchk')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

function Association(){
  var ddlAssociation=$( "#ddlAssociationUpdate option:selected" ).text();
  if(ddlAssociation!='Group')
  {
    alert("You can't change Association !");
    $('#ddlAssociationUpdate').val('Group');
  }
     
}



function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}



//------- add new client ------------------------

function AddClientName()
{
var SelfCompany=$('#checkSelfCompany').is(":checked");
var Association=$('input[name="Association"]:checked').val();
   if(SelfCompany==true){
      getSelfCompanyId ();
     }
   if(getId.length>0){
      updatSelfCompany();
     }
	var Code=$('#txtCode').val();	
	var ClientName=$('#txtClientName').val();
	if(ClientName.length==''){
	  if(Association=='Organization'){
	   alert('Please Enter Organization');
	  }
	  else{alert('Please Enter Group Name');}
	  return false;
	}

var IntSupervisor= getPeopleUserInfoGroups("peoplePickerIntSupervisor");
   //if(IntSupervisor.length>0){
   //var intSupervisor= IntSupervisor[0].split(',');}

	if(IntSupervisor.length==0)
	 {
		alert("Please Fill the Internal Supervisor");
		return false;
	 }				
     if(IntSupervisor.length>1)
		{
		 alert("please insert only 1 Internal Supervisor");
		 return false;
		}
	

	if(IntSupervisor.length==1){
	  arryDisplayText=[];
	   var check=IsActiveUser(IntSupervisor[0]);
	   if(check==false){
	    if(userName==''){
		     var len=arryDisplayText.length;
		     userName =DisplayText[len];
	        }
	     alert('The user ' +userName + ' is not valid');
		 return false;
	   }
		        
	}
		 
				 
	var Stakeholder= getPeopleUserInfoGroups("peoplePickerStakeholder");
		//if(Stakeholder.length>0){
	    //var intStakeholder= Stakeholder[0].split(',');}
	
		if(Stakeholder.length==0)
		  {
		    alert("Please Fill the Members");
			return false;
		   }
	
    if(Stakeholder.length>0){
     arryDisplayText=[];
        for(var i=0; i < Stakeholder.length; i++){
        
          var check=IsActiveUser(Stakeholder[i]);
          if(check==false){
          
          if(userName==''){
		     var len=arryDisplayText.length;
		     userName =DisplayText[len];
	        }

            alert('The user ' +userName + ' is not valid');
            return false;
          }
         }
       }

	/*for(var u = 0;u < Stakeholder.length; u++){
		  	 
	      if(IntSupervisor[0]==Stakeholder[u]){
	       var check=IsActiveUser(Stakeholder[u]);
	      alert("Check the user "+userName + " can not be defined as both, Internal Stakeholder and Supervisor.");
	        return false;
	      }
	   }*/
		 				 	
				 		 
  var SalesPersonId = getPeopleUserInfoGroups("peoplePickerSale");
  //if(SalesPersonId.length>0){
  //var updateuser = SalesPersonId[0].split(',');}
				 if(SalesPersonId.length==0)
				 {
				     alert("Please Fill the SalesPerson");
				     return false;
				 }
				if(SalesPersonId.length==1){
				arryDisplayText=[];
		          var check=IsActiveUser(SalesPersonId[0]);
		          if(check==false){
		          if(userName==''){
				     var len=arryDisplayText.length;
				     userName =DisplayText[len];
			        }
		          
		            alert('The user ' +userName + ' is not valid');
		            return false;
		          }
		        
		        }
				 if(SalesPersonId.length>1)
				 {
				    alert("please insert only 1 SalesPerson ");
				    return false;
				 }

   
   
   				 
  if (UserAuthorization==false){
  alert('You are not authorized to access ! ');
   $("#CreateClientEntry").hide();
	  $("#modalAddNewClient").modal('hide');

   return false;
  }

	/*var check=checkExistForAdd(Code);
	if(check.length>1){
	  alert('This Code is already Exists');
	return false}*/

     
	var AttnName=$('#txtAttnName').val();
	var Address=$('#txtAddress').val();
	var Country=$('#txtContry').val();
	var Email=$('#txtEmail').val();
    var AttnName=$('#txtAttnName').val();
    var City=$('#txtCity').val();
    var State=$('#txtState').val();            
    var ZIP=$('#txtZip').val(); 
    var Number=$('#txtnumber').val();
    var BusinessDomain=$('#txtBusinessDomain').val();
    var TaxId=$('#txtTAXID').val(); 
	var CustTypt=$( "#ddlCustTypt option:selected" ).text();
	var ddlTemplate=$( "#ddlTemplate option:selected" ).val();	
	var IsActive=$('#checkbox').is(":checked")
	var Results=checkExistForClientName(ClientName);
	if(Results.length>1){
	  alert('This ClientName is already Exists');
	return false}
	//if(Email!=''){	
	//validateEmail()
	/*if(checkEmail==false){
	  //alert('Please ckech Invalid Email Address')
	  return false}}*/
	  
	 
	var ListName = "ClientMaster";
	var itemType =GetItemTypeForListName(ListName);  
      var Metadata;
	  Metadata = {
	        __metadata: {'type': 'SP.Data.ClientMasterListItem'},
	        Title : ClientName,
	        Client_Code : Code,
	        Attn_Name: AttnName,	  
		    BillingAddress :Address,
		    EmailId :Email,
		    Country :Country,
		    IsActive:IsActive,
		    City:City,
		    State:State,
		    SelfCompany:SelfCompany,
		    SalesPersonId:SalesPersonId[0],
		    InternalMembersId:{ 'results' : Stakeholder},
		    TemplateType:ddlTemplate,
		    InternalSupervisorId:IntSupervisor[0],
		    ZIP_Code:ZIP,
		    CustType:CustTypt,		    		 
		    Contact_No:Number,
		    Association:Association,
		    //BusinessDomain:BusinessDomain,
		    TAX_ID:TaxId,
		    CompanyIDId:parseInt(CompanyId)
		    
		    
    };   
    
   
       
       
    $.when(AddToList(ListName,Metadata)).done(function(responseIdmore)
    {   		     
	   alert('Submitted successfully');
	  /* var file=fileInput =$('#file_upload').val();
	   if(file.length>0){
	    AddAttachmentsSection(responseIdmore.d.Id);	
	    }  
	    */
	       GetClientName();
 	       $("#modalAddNewClient").modal('hide');           
           cleartextbox();
		    				   
	})
}
	
//Add item in list
function AddToList(ListName,Metadata)
{
    var dfd = $.Deferred();

    var ownURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('"+ListName+"')/Items";
    $.ajax({    	
        url: ownURL,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data:JSON.stringify(Metadata),
        success: function (data) {
            dfd.resolve(data);
        },
        error: function (error) {
          //Console.log(data)
           alert(JSON.stringify(error));
           dfd.reject(error);
        }
    });
    return dfd.promise();
}


//---------validation--------------------

function ValidateUser()
{   
    var companyId =titanForWork.getQueryStringParameter("CompanyId");
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$filter=WebPartName eq 'ClientMaster' and Company eq '"+companyId+"'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async:false,
        success: function (data)
        {    
            var items = data.d.results;
            if (items.length > 0)
            {
                 if(items[0].Scope =="Selective" || items[0].Scope =="SELECTIVE" || items[0].Scope == null)
                 {
                     var userlist =items[0].ContributorsId.results;
                     function checkuser(_userID)
                     {
                          return _userID== _spPageContextInfo.userId;
                    }
                    var res = userlist.filter(checkuser);
                    if(res.length>0){$("#addClient").show();$("#btnAddnewClient").show();
                      UserAuthorization=true;
                      }
                    else{
                         $("#addClient").hide();
                         $("#btnAddnewClient").hide();
                          UserAuthorization=false;

                         }
                 }
                 else if (items[0].Scope =="Everyone" || items[0].Scope =="EVERYONE")
                 {
                     $("#addClient").show();
                     $("#btnAddnewClient").show();
                     UserAuthorization=true;
                     
                }
                else
                {
                    $("#addClient").hide();
                    $("#btnAddnewClient").hide();
                    UserAuthorization=false;
                }             
            }
            else{
                 $("#addClient").hide();
                 $("#btnAddnewClient").hide();
                 UserAuthorization=false;
                }
        },
        error: function (data)
        {
            console.log(data);
        }
    });
}

var getId =[];
function getSelfCompanyId() {
if(getId.length>0){
getId.splice(0,getId.length);
}
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ClientMaster')/items?$select=ID&$filter=SelfCompany eq 1";
       $.ajax({    	           
        url: Ownurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: false,
        success: function (data)
         {
           var items=data.d.results;
           for(var i = 0;i < items.length;i++)
           {
             getId.push(items[i].Id);
           }
           
         },
         error:function(error){
         }
         	
});
}
   
function updatSelfCompany(){
var Metadata;
    Metadata= {
	        __metadata: {'type': 'SP.Data.ClientMasterListItem'},
	        SelfCompany: false
	        };
for (var i=0;i<getId.length;i++){	        
    var owlUrl=_spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('ClientMaster')/Items('"+getId[i]+"')";
		   $.ajax({
		        url:owlUrl, //_spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items('"+DataId+"')",
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
		            // console.log(data);
		            
		        },
		        error: function (error) {
		            alert("Error occured while updating item - " + JSON.stringify(error));
		            
		        }
		    });

}
} 


function checkExistForAdd() { 
  
   var result =[];
   var code=$('#txtCode').val();
   var Ownurl;   	
      Ownurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items?$filter=Client_Code eq '"+code+"'"
    $.ajax({    	           
        url: Ownurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: false,
        success: function (data)
         {  debugger;        
            var item = data.d.results;
            if(item.length>0){
               alert('This Code is already Exists');
               $('#txtCode').val('');  
            }	
		 }, eror: function (data)
		 		{
		         alert('error');
		        }                   
		 });  
		  
}

function checkExistForClientName() { 
  
   var result =[]; 
   var ClientName= $('#txtClientName').val();  
   var Ownurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items?$filter=Title eq '"+ClientName+"'"
	
    $.ajax({    	           
        url: Ownurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: false,
        success: function (data)
         {  debugger;        
            var item = data.d.results;
            if(item.length>0){
               alert('This ClientName is already Exists'); 
               $('#txtClientName').val('');   
            }	
		 }, eror: function (data)
		 		{
		         alert('error');
		        }                   
		 });  
		 return  result;  
}  

function clientEmail(){

        email = document.getElementById("txtEmail").value;
        if(email!=""){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;
        var emails= email.split(";");
        emails.forEach(function (data) {
        if (reg.test(data) == false) 
        {
            alert('The email address '+ ' "'+data+ '"'+ ' is invalid');
            $('#txtEmail').val('');
        }
        });
        }

}


function AddAttachmentsSection(responseIdmore)
{debugger;
    var digest = "";
    $.ajax(
        {
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
        method: "POST",
        headers: {
            "ACCEPT": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
        },
        success: function (data) {
            digest = data.d.GetContextWebInformation.FormDigestValue;
        },
        error: function (data) {
        }
    }).done(function () {
        var ddlSection=$("#ddlSection option:selected" ).text();
        var fileInput="";        
           fileInput =$('#file_upload')       
           
        var fileName = fileInput[0].files[0].name;
        var fileNameSplit=fileName.split(".");
            var fileExt=fileNameSplit[fileNameSplit.length - 1];
            var fileLength=fileExt.length;
            var fileSCR=fileName.replace(/[^a-zA-Z]/g, "");
            var fileslice;
            if(fileLength==3){
            fileslice= fileSCR.slice(0,-3);
            }
            if(fileLength==4){
            fileslice= fileSCR.slice(0,-4);
            }debugger;          
            var newFileName=(fileslice+"."+fileExt);
        
        
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileData = e.target.result;
            debugger;
            /*let json = {
				    "fileName":newFileName,
				    "serverUrl": "https://adaptindia.sharepoint.com",
				    "serverRelativeUrl": "/sites/Titan_2_2_1_DEV/SiteAssets/Lists/aa4e6289-e81e-4eac-b35b-680024cc60b1/"+newFileName
				  };*/
            var res11 = $.ajax(
            {
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items('" + responseIdmore+ "')/AttachmentFiles/ add(FileName='" + newFileName+ "')",
                method: "POST",
                binaryStringRequestBody: true,
                data: fileData,
                processData: false,
                headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "X-RequestDigest": digest
                    //,
                    //"content-length": fileData.byteLength
                },
                success: function (data)
                { 
                	 $("#file_upload").val("");                  
                },
                error: function (data) {
                debugger
                    alert("Error occured." + data.responseText);
                }
            });
        };
        reader.readAsArrayBuffer(fileInput[0].files[0]);
    });
}


function IsSupervisorActive(SupervisorId) {
    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
     var extSupervisorId='';
debugger;
    RestQuery = "?$select=*,LoginName/EMail,LoginName/Id,LoginName/FirstName,LoginName/LastName,LoginName/EMail&$expand=LoginName&$filter= Status eq 'Active' and Company/ID eq " + txtCompanyId + " and LoginNameId eq " + SupervisorId+ "";
    $.when(CommonFunction.getItemsWithQueryItem("ExternalUsers", RestQuery)).done(function(data) {

        try {
               //  var ManagerInfo=  ManagerName.results.length;
                 if(data.results.length>0)
                 {  
                   extSupervisorId=  data.results[0].ID;
                 }
                 else
                 {
                   extSupervisorId= false;  
                 
                 }
            
           
  


        } catch (e) {
            alert(e);
        }
    });
    return extSupervisorId;
}

function cleartextbox(){
             $('#txtCode').val('');	
             $('#txtAddGuestName').val('');         
             $('#txtAddExtSupervisor').val('');
             $('#addStakeholders').val('');
             $('#txtIntSupervisor').val('');             
		     $('#txtClientName').val('');
		     $('#txtAttnName').val('');
	         $('#txtAddress').val('');
		     $('#txtCountry').val('');
		     $('#txtEmail').val('');
		     $('#txtAddEmail').val('');
		     $('#txtAddOrganization').val('');		     		     
		     $('#txtCode').val();          
             $('#txtCity').val('');            
            $('#txtState').val('');            
            $('#txtZip').val(''); 
            $('#txtContry').val('');
            $('#txtnumber').val('');
            $('#txtBusinessDomain').val('');
            $('#txtTAXID').val('');
            clearPeoplePickerControl('peoplePickerSale');
            var Active=$("#checkbox");
         	Active.prop('checked',true)
         	$("#checkSelfCompany").prop('checked',false)            
        
}

function onlyNumberKey(evt) {
         
        // Only ASCII character in that range allowed
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }


var user;
function getExternaluserBySupervisor() {
   user =false;
   var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ExternalUsers')/items?$select=*&$filter=Supervisor_GuestId eq "+guestLoginId+" or InternalStakeholdersId eq '"+guestLoginId+"'";
       $.ajax({    	           
        url: Ownurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: false,
        success: function (data)
         {
           var items=data.d.results;
           if(items.length>0){
             user =true; 
           }
                      
         },
         error:function(error){
         }
         	
});
}


var userName;
var arryDisplayText;
var userActiveCheck= false;
function IsActiveUser(UserId) {
     userName='';
	var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
	var Ownurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Employees')/items?$select=*,LogonName/Id,LogonName/Title&$expand=LogonName&$filter=LogonNameId eq " + UserId+ " and CompanyId eq "+txtCompanyId +"";
       $.ajax({    	           
        url: Ownurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: false,
        success: function (data)
         {
           var items=data.d.results;
           
           if(items.length>0)
            { 
               userName=items[0].LogonName.Title;
               arryDisplayText.push(items[0].LogonName.Title);
               if(items[0].Status=='Active'){
                   userActiveCheck =true;
               }
               else{
                   userActiveCheck =false;
                  }

              //var Client_Name=items[0].Client_Name.Title;
             // ClientName=items[0].Client_Name.Id; 
            }
           else
              {
                userActiveCheck= false;  
                 
              }
           
         },
         error:function(error){
         }
         	
});
   
    return userActiveCheck;
}


/*-----------------------get template----------------------------*/

function getTemplate(value) {
debugger;
	var URL,ListName='TemplateMaster';
	var templatevalue;
	//$('#ddlTypefilter').append($('<option/>').val('ALL').text('ALL'));
	//$('#ddlCustomerfilter').append($('<option/>').val('ALL').text('ALL'));
	var tempate=$("#ddlTemplate option:selected" ).text();
	var title1=$("#ddlTemplate option:selected" ).val();
    var title2=$("#ddlAddTemplate option:selected" ).val();
    var title3=$("#ddlUpdateTemplate option:selected" ).val();
    if(value==1){
     templatevalue= $("#ddlTemplate option:selected" ).val();
    }
    
    if(value==2){
     templatevalue= $("#ddlAddTemplate option:selected" ).val();
    }
    
    if(value==3){
     templatevalue= $("#ddlUpdateTemplate option:selected" ).val();
    }




	$("#TempalteName").empty();
	$("#CustomName").empty();
	$("#pDescription").empty();


	if(tempate!=''){
	  	URL=_spPageContextInfo.webAbsoluteUrl +"/_api/web/Lists/getbytitle('TemplateMaster')/Items?$select=*,AttachmentFiles&$filter=Title eq '"+templatevalue+"'&$expand=AttachmentFiles";
     }
     else{		   
	   URL=_spPageContextInfo.webAbsoluteUrl +"/_api/web/Lists/getbytitle('TemplateMaster')/Items?$filter=Active eq '1'";
	}
	$.ajax({
		url:URL,
		headers:{ Accept:'application/json;odata=verbose'},
		async:false,
		success:function (data) {
			var items=data.d.results;
			for(var i=0;i<items.length;i++)
			{
				$('#TempalteName').append(items[i].Title);
				$('#CustomName').append(items[i].CustomName);
				$('#pDescription').append(items[i].Description);
				var Picture=$('#templateImg');
				if(tempate!=''){
				  Picture.attr('src',items[0].AttachmentFiles.results[0].ServerRelativeUrl);
				 } 

				if(tempate==''){
				
				 $('#ddlTemplate').append($('<option/>').val(items[i].Title).text(items[i].CustomName));
				 $('#ddlAddTemplate').append($('<option/>').val(items[i].Title).text(items[i].CustomName));
				 $('#ddlUpdateTemplate').append($('<option/>').val(items[i].Title).text(items[i].CustomName));
                } 
			}
		},
		error : function (data) {
			console.log(data);
			
		}
	})
}





