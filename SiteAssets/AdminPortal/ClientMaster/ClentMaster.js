var DataId="";
var filter='All';
var UserAuthorization;
var ClientName;
var CompanyId = titanForWork.getQueryStringParameter('CompanyId');
var userId=_spPageContextInfo.userId;
var editIntSupervisor,editExtSupervisor;
var editStakeholder=[];
var checkUser=false;
$(document).ready(function () {	
 InitializePeoplePicker('peoplePickerSale', true);
 InitializePeoplePicker('SalesPersonfilter', false);
 InitializePeoplePicker("peoplePickerExtSupervisor", false);
 InitializePeoplePicker("peoplePickerIntSupervisor", false);
 InitializePeoplePicker("peoplePickerStakeholder", true);
 //InitializePeoplePicker("peoplePickerExtSupervisor", false);
 
 getTemplate();
 
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


 	ValidateUser();
 	getCategory();
 	if(UserAuthorization==false){
 	   alert('You are not authorized to access this page ! ');
 	   	window.location.href = "../Pages/Default.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"";
 	   
 	   }
 	   else{
 	      var url=window.location;
 	     userActivityNotificationEntry(userId,url)
 	     }
    GetClientName();
    //ExecuteOrDelayUntilScriptLoaded(GetClientName, "sp.js");
    BindEvents();
    //ValidateUser();
    
    
    $('#CreateClientEntry').click(function(){
          debugger;
          if(DataId==''){
	 	 	 AddClientName(); 
			 GetClientName();
			 }
			 else{
			      UpdateClientName();
			      GetClientName();
			     }
		  });
    
        $('#closeClientMaster').click(function(){
		window.location.href="../Pages/Default.aspx?WebAppId=232SHDFGHJF22B2526DF4";
	});
	
	$('#closemodal').click(function(){
	  $("#modalAddNewClient").modal('hide');
	});
	$('#getClientRecord').click(function(){
	URL();
	var ddlfilter=$('#ddlCustomerfilter option:selected').text();
	var status=$('#ddlStatus option:selected').text();
	$("#CustomerChip").empty();	
	customerchip='<div class="upload-chip">'+ddlfilter+'</div>';
    customerchip+='<div class="upload-chip">'+status+'</div>';	
	$("#CustomerChip").append(customerchip);
	});
	$("#ddlClientMaster").change(function () {
    var ddlClientMaster= $(this).find("option:selected").text();
    filter=ddlClientMaster;
    if(ddlClientMaster=='Active'){filter=1}
    if(ddlClientMaster=='InActive'){filter=0}
    if(ddlClientMaster=='All'){filter='All'}  
              
    GetClientName();   
       
 });
     
}); 

/*function IsUserActive(userName) {
    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
     var mangerInfoItemId='';

    RestQuery = "?$select=*,LogonName/EMail,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail&$expand=LogonName &$filter= Status eq 'Active' and Company/ID eq " + txtCompanyId + " and LogonNameId eq " + userName+ "";
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function(UserName) {

        try {
               
                 if(UserName.results.length>0)
                 {  
                   mangerInfoItemId  =  UserName.results[0].ID;
                 }
                 else
                 {
                   mangerInfoItemId  = false;  
                 
                 }
            


        } catch (e) {
            alert(e);
        }
    });
    return mangerInfoItemId ;
}

*/

function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
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
var DisplayText;
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
            sharedUserArrayList.push(GetUserID(users[i].Key));
            DisplayText.push(users[i].DisplayText);
        }
    }
    return sharedUserArrayList;
}
var commonEmail;
function GetUserIdGroups(userName) {
    var userID = "";
    commonEmail='';
    var prefix = "i:0#.f|membership|";
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var accountName = userName;// prefix+userName;  
    //var accountName = "i:0#.f|membership|chiragdhingra337@gmail.com"     
    $.ajax({
        url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(accountName) + "'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            userID = data.d.Id;
            commonEmail=data.d.Email;
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




var checkEmail;
function validateEmail(){

        email = document.getElementById("txtEmail").value;
        if(email!=""){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;
        var emails= email.split(";");
        emails.forEach(function (data) {
        if (reg.test(data) == false) 
        {
            alert('The email address '+ ' "'+data+ '"'+ ' is invalid');
            checkEmail=false;
            return false;
        }
        checkEmail=true;
        return true;
        //validate(email.trim());
        });
        }

}
var OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,Country,No_Of_GuestUsers,IsActive,SalesPerson/Id,SalesPerson/Title&$expand=SalesPerson&$filter=IsActive eq 1 and CompanyID eq '"+CompanyId+"'&$orderby=Created desc &$top=4000";

function URL(){
debugger;
   var ddlfilter=$('#ddlCustomerfilter option:selected').text();
   var ddlstatus=$('#ddlStatus').val();
   
   if(ddlstatus!='ALL'){
	   if(ddlstatus=='Active'){
	      ddlstatus=1;
	   }   
	   else{
	       ddlstatus=0;
	   }
	}   
   var SalesPersonId = getPeopleUserInfoGroups("SalesPersonfilter");
   if(SalesPersonId.length>1){
     alert('Please enter only one SalesPerson');
     return false;
   }
   if(SalesPersonId.length>0){
   var person =SalesPersonId[0]; //SalesPersonId[0].split(',');
   }
   
   if(ddlfilter=='ALL' && SalesPersonId.length==0 && ddlstatus=='ALL'){
    OwnURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,Country,No_Of_GuestUsers,IsActive,SalesPerson/Id,SalesPerson/Title&$expand=SalesPerson&$filter=CompanyID eq '"+CompanyId+"'&$orderby=Created desc &$top=5000";
    GetClientName();
   }
   
   if(ddlfilter=='ALL' && SalesPersonId.length==0 && ddlstatus!='ALL'){
    OwnURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,Country,No_Of_GuestUsers,IsActive,SalesPerson/Id,SalesPerson/Title&$expand=SalesPerson&$filter=IsActive eq '"+ddlstatus+"' and CompanyID eq '"+CompanyId+"'&$orderby=Created desc &$top=5000"; 
    GetClientName();
   }
   
   if(ddlfilter!='ALL' && SalesPersonId.length==0 && ddlstatus!='ALL'){
    OwnURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,Country,No_Of_GuestUsers,IsActive,SalesPerson/Id,SalesPerson/Title&$expand=SalesPerson&$filter=CustType eq '"+ddlfilter+"' and IsActive eq '"+ddlstatus+"' and CompanyID eq '"+CompanyId+"'&$orderby=Created desc &$top=5000"; 
    GetClientName();
   }

   
   if(ddlfilter!='ALL' && SalesPersonId.length==0 && ddlstatus=='ALL'){
    OwnURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,Country,No_Of_GuestUsers,IsActive,SalesPerson/Id,SalesPerson/Title&$expand=SalesPerson&$filter=CustType eq '"+ddlfilter+"' and CompanyID eq '"+CompanyId+"'&$orderby=Created desc &$top=5000"; 
    GetClientName();
   }
   
   
   
   if(ddlfilter=='ALL' && SalesPersonId.length>0 && ddlstatus=='ALL'){
    OwnURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,Country,No_Of_GuestUsers,IsActive,SalesPerson/Id,SalesPerson/Title&$expand=SalesPerson&$filter=SalesPersonId eq '"+SalesPersonId[0]+"' and CompanyID eq '"+CompanyId+"'&$orderby=Created desc  &$top=5000"; 
    GetClientName();
   }

   
   if(ddlfilter!='ALL' && SalesPersonId.length>0 && ddlstatus=='ALL'){
       OwnURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,Country,No_Of_GuestUsers,IsActive,SalesPerson/Id,SalesPerson/Title&$expand=SalesPerson&$filter=CustType eq '"+ddlfilter+"' and SalesPersonId eq '"+SalesPersonId[0]+"' and CompanyID eq '"+CompanyId+"'&$orderby=Created desc &$top=5000";
       GetClientName();
   }
   
   if(ddlfilter!='ALL' && SalesPersonId.length>0 && ddlstatus!='ALL'){
       OwnURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,Country,No_Of_GuestUsers,IsActive,SalesPerson/Id,SalesPerson/Title&$expand=SalesPerson&$filter=IsActive eq '"+ddlstatus+"'and CustType eq '"+ddlfilter+"' and SalesPersonId eq '"+SalesPersonId[0]+"' and CompanyID eq '"+CompanyId+"'&$orderby=Created desc &$top=5000";
       GetClientName();
   }
   
   if(ddlfilter=='ALL' && SalesPersonId.length>0 && ddlstatus!='ALL'){
       OwnURL= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,ID,Client_Code,Attn_Name,EmailId,CustType,City,Country,No_Of_GuestUsers,IsActive,SalesPerson/Id,SalesPerson/Title&$expand=SalesPerson&$filter=IsActive eq '"+ddlstatus+"' and SalesPersonId eq '"+SalesPersonId[0]+"' and CompanyID eq '"+CompanyId+"'&$orderby=Created desc &$top=5000";
       GetClientName();
   }
    
}
 
var itemId;
function GetClientName()
{	debugger;
    var ddlstatus=1;
	var Ownurl="";
	//if(filter=='All'){
	//else{
	//Ownurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$filter=IsActive eq '"+filter+"'&$expand=SalesPerson"}
	$.ajax({
        url: OwnURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;          
            
            var tableItemsHTML = "";
            //table = $("#TempTableClientMaster").DataTable();
            //table.clear().draw();
           $('#mainDivAreaClientmaster').empty();
			for (var i = 0; i < items.length; i++) 
            {
           	 	 itemId = items[i].ID;
           	 	var SalesPerson=items[i].SalesPerson.Title;
           	 	if(SalesPerson==null){
           	 	    SalesPerson='';
           	 	   }
           	 	var ClientCode= items[i]["Client_Code"];				
				var Title = items[i]["Title"];
				var CustType=items[i]["CustType"];
				if(CustType==null){
				   CustType=""
				   }
				var AttnName =items[i]["Attn_Name"];
				if(AttnName ==null){AttnName=''};
				//var BillingAddress =items[i]["City"];
				var EmailId = items[i]["EmailId"];
				if(EmailId==null){EmailId=''};
				var City= items[i]["City"];
				if(City==null){City=''};
				var Country = items[i]["Country"];
				if(Country==null){Country=''};
				
				var No_Of_GuestUsers= items[i]["No_Of_GuestUsers"];
				if(No_Of_GuestUsers==null){No_Of_GuestUsers=''};

				var IsActive= items[i]["IsActive"];
				if(IsActive== true)
					IsActive= "Active";
				
				else
				IsActive="Inactive";
	               		
				 
                tableItemsHTML += "<tr><td>" +Title+ "</td><td>" + AttnName + "</td><td>"+City+"</td><td>" + Country + "</td><td>" +CustType + "</td><td>" +SalesPerson + "</td><td style='text-align: center;'>" +No_Of_GuestUsers+ "</td>"
                if(IsActive=='Inactive'){
                 tableItemsHTML +="<td style='color:red'>" + IsActive+ "</td> "; 
                }
                else{
                     tableItemsHTML +="<td style='color:blue'>" + IsActive+ "</td> ";
                    }
              
                tableItemsHTML +="<td  style='text-align:center;'>";
                tableItemsHTML +="<div class='Customer-edit-lock-btn-box'><a type='button' href='#' class='custom-edit-btn'  onclick='editClientName("+itemId+")'><span class='fa fa-pencil'></span></a></div></td></tr>";
                //tableItemsHTML +='<div class="Customer-edit-lock-btn-box"><a type="button"  class="custom-edit-btn"><i  onclick="editClientName("'+itemId+'")" class="fa fa-pencil"></i></a></div></td></td></tr>';
			   }          	
	            var completebody = tableItemsHTML;
	            //table.rows.add($(tableItemsHTML)).draw();

	            //var dvTable = $(".mainDivClientName");;
	            //dvTable.html("");
	          	
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
        //sortcolumn: 0,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}




//function TableConfiguration()
//{
 //   sorter = new TINY.table.sorter('sorter', 'TempTableClient', {
   //     headclass: 'head',
   //     ascclass: 'asc',
    //    descclass: 'desc',
     //   evenclass: 'evenrow',
     //   oddclass: 'oddrow',
      //  evenselclass: 'evenselected',
       // oddselclass: 'oddselected',
       // paginate: true,
       // size: 10,
       // colddid: 'columns',
       // currentid: 'currentpage',
       // totalid: 'totalpages',
        //startingrecid: 'startrecord',
       // endingrecid: 'endrecord',
     //   totalrecid: 'totalrecords',
     //   hoverid: 'selectedrow',
     //   pageddid: 'pagedropdown',
     //   navid: 'tablenav',
     //   //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
     //   sortdir: 1,
     //   init: true
   // });
//}

function checkExistForAdd(code,ClientName) { 
  
   var result =[];
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
            result.push(item[0].Code);
            result.push(item[0].Title);        
            }	
		 }, eror: function (data)
		 		{
		         alert('error');
		        }                   
		 });  
		 return  result;  
}

function checkExistForClientName(ClientName) { 
  
   var result =[];   
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
            result.push(item[0].Code);
            result.push(item[0].Title);
            alert('This ClientName is already Exists');
            return false;        
            }	
		 }, eror: function (data)
		 		{
		         alert('error');
		        }                   
		 });  
		 return  result;  
}  

function checkExistForUpdate(DataId,ClientName) {  
   var result =[];		 	
      var Ownurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items?$filter=(ID ne '"+DataId+"') and Title eq '"+ClientName+"'"
    $.ajax({    	           
        url: Ownurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: false,
        success: function (data)
         {     
               
            var item = data.d.results;
            if(item.length>0){
            result.push(item[0].Title);
            result.push(item[0].Code);        
            }	
		 }, eror: function (data)
		 		{
		         alert('error');
		        }                   
		 });  
		 return  result;  
} 



function BindEvents() {       
	  	
	    $("#addClient").click(function(){
		DataId="";
		/*$('#txtCode:input').each(function() {
          $(this).attr('disabled',false);})	*/	
	   $("#CreateClientEntry").text("Submit");
	   $('#divExtSupervisor').hide();		   
	         $('#txtCode').val('');	
		     $('#txtClientName').val('');
		     $('#txtAttnName').val('');
	         $('#txtAddress').val('');
		     $('#txtCountry').val('');
		     $('#txtEmail').val('');
		     $('#txtCode').val();          
             $('#txtCity').val('');            
            $('#txtState').val('');            
            $('#txtZip').val(''); 
            $('#txtContry').val('');
            $('#txtnumber').val('');
            $('#txtBusinessDomain').val('');
            $('#txtTAXID').val('');
            $('#divExtSupervisor').hide();
            clearPeoplePickerControl('peoplePickerSale');
            clearPeoplePickerControl('peoplePickerStakeholder');
            clearPeoplePickerControl('peoplePickerIntSupervisor');
            var Active=$("#checkbox");
         	Active.prop('checked',true)            
           	$("#checkSelfCompany").prop('checked',false)		 
		
	  });
	  
	  
	  

	
	
	
}

function cleartextbox(){
             $('#txtCode').val('');	
		     $('#txtClientName').val('');
		     $('#txtAttnName').val('');
	         $('#txtAddress').val('');
		     $('#txtCountry').val('');
		     $('#txtEmail').val('');
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

function editClientName(ItemId) {
     
    clearPeoplePickerControl('peoplePickerSale');
	$("#modalAddNewClient").modal();
	//editStakeholder.empty();
	$('#divExtSupervisor').show();
	clearPeoplePickerControl('peoplePickerExtSupervisor');
	clearPeoplePickerControl('peoplePickerStakeholder');
	clearPeoplePickerControl('peoplePickerIntSupervisor');
	var peoplePickerStakeholder=[];
	$('#divExtSupervisor').show(); 	 	
	var ListName ='ClientMaster';
	var submitEventFired=false;	
	var Code=$('#txtCode').val();	
	var ClientName=$('#txtClientName').val();
	var AttnName=$('#txtAttnName').val();
	var Address=$('#txtAddress').val();
	var Country=$('#txtCountry').val();
	var Email=$('#txtEmail').val();
	/*$('#txtCode:input').each(function() {
    $(this).attr('disabled',true);})*/

    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ClientMaster')/items?$select=*,SalesPerson/UserName,Supervisor/UserName,InternalSupervisor/UserName,InternalMembers/UserName&$expand=InternalMembers,InternalSupervisor,Supervisor,SalesPerson&$filter=ID eq '"+ItemId+"'";


	    //Ownurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items?$select=Title,CustType,Country,TAX_ID,ID,ZIP_Code,Contact_No,BillingAddress,State,BusinessDomain,Client_Code,Attn_Name,EmailId,City,SalesPerson/Id,IsActive,SalesPerson/FirstName,SalesPerson/LastName&$expand=SalesPerson/Id&$filter=ID eq '"+ItemId+"'"; 

    //var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('"+ListName+"')/Items$select=Title,ID,ZIP_Code,Client_Code,Attn_Name,EmailId,City,IsActive,SalesPerson/FirstName,SalesPerson/LastName&$expand=SalesPerson/Id&$filter=ID eq 1";
    $.ajax({    	           
        url: Ownurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: false,
        success: function (data)
         {	
           	var results=data.d.results;
           	DataId=ItemId;
           	
           	  var users = results[0].SalesPerson.UserName;
           	  var ExtSupervisorId=results[0].Supervisor.UserName;
           	  //var InternalMembers=results[0].InternalMembersId;
           	  var InternalSupervisor=results[0].InternalSupervisor.UserName;
           	  
           	  var Stakeholders =results[0].InternalMembers;
           	  if(results[0].InternalMembersId!=null){
           	  for(var i=0;i<Stakeholders.results.length;i++){
           	    var stakeholder=Stakeholders.results[i].UserName;
                setPeoplePickerUsersInfoCurrentGroups("peoplePickerStakeholder",stakeholder);
                //editStakeholder.push(results[i].InternalMembersId);
               }
                peoplePickerStakeholder.push(Stakeholders);
                
           	  }
                setPeoplePickerUsersInfoCurrentGroups("peoplePickerSale", users);
                setPeoplePickerUsersInfoCurrentGroups("peoplePickerExtSupervisor", ExtSupervisorId);
                setPeoplePickerUsersInfoCurrentGroups("peoplePickerIntSupervisor", InternalSupervisor);
                //setPeoplePickerUsersInfoCurrentGroups("peoplePickerStakeholder", InternalMembers);                

         	       
            $('#txtCode').val(results[0].Client_Code);
            ClientName= results[0].Id;
            $('#txtClientName').val(results[0].Title);
            $('#txtAttnName').val(results[0].Attn_Name);
            $('#txtAddress').val(results[0].BillingAddress);
            $('#txtCity').val(results[0].City);
            var Association=results[0].Association;
            
            if (Association=='Individual'){
              $('#btnIndividual').attr('checked',true);
              $('#lblOrganization').empty();
	          $('#lblOrganization').append('Group Name:<span class="color-red">*</span>');

            }
            
            else{
               $('#btnOrgAssociation').attr('checked',true);
               $('#lblOrganization').empty(); 
	           $('#lblOrganization').append('Organization Name:<span class="color-red">*</span>');

            }
            
            $('#ddlTemplate').val(results[0].TemplateType);
            $('#ddlCustTypt').val(results[0].CustType)
            $('#txtState').val(results[0].State);            
            $('#checkSelfCompany').prop('checked',results[0].SelfCompany);
            $('#txtZip').val(results[0].ZIP_Code); 
            $('#txtContry').val(results[0].Country);
            $('#txtnumber').val(results[0].Contact_No);
            $('#txtBusinessDomain').val(results[0].BusinessDomain);
            $('#txtTAXID').val(results[0].TAX_ID);
            $('#txtEmail').val(results[0].EmailId);         	            
           	$("#CreateClientEntry").text("Update");
           	var Active=$("#checkbox");  
           	var IsActive=results[0].IsActive;
           	if(IsActive==true){         	
            Active.prop('checked',true);}
            else{Active.prop('checked',false);}          

               				
				
		 }, eror: function (data)
		 		{
		      console.log('error');
		        }                   
		 });     
}


function AddClientName()
{
var SelfCompany=$('#checkSelfCompany').is(":checked");
var Association=$('input[name="Association"]:checked').val();
if (UserAuthorization==false){
  alert('You are not authorized to access ! ');
   $("#CreateClientEntry").hide();
	  $("#modalAddNewClient").modal('hide');

   return false;
  }
   if(SelfCompany==true){
      getSelfCompanyId ();
     }
   if(getId.length>0){
      updatSelfCompany();
     }
	var Code=$('#txtCode').val();	
	var ClientName=$('#txtClientName').val().trim();
	if(ClientName.length==''){
	  if(Association=='Organization'){
	   alert('Please Enter Organization');
	  }
	  else{alert('Please Enter Group Name');}
	  return false;
	}

var SalesPersonId = getPeopleUserInfoGroups("peoplePickerSale");
  //if(SalesPersonId.length>0){
  //var updateuser = SalesPersonId[0].split(',');}
				 if(SalesPersonId.length==0)
				 {
				     alert("Please Fill the SalesPerson");
				     return false;
				 }
				if(SalesPersonId.length>1)
				 {
				    alert("please insert only 1 SalesPerson ");
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
	      alert(userName + " cannot be assigned as both, Mambers and Supervisor.");
	        return false;
	      }
	   }*/

   
  
     
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
	if(Email!=''){	
	//validateEmail()
	if(checkEmail==false){
	  //alert('Please ckech Invalid Email Address')
	  return false}}
	  
     
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
		    Association:Association,
		    SelfCompany:SelfCompany,
		    SalesPersonId:SalesPersonId[0],
		    InternalMembersId:{ 'results' :Stakeholder},
		    TemplateType:ddlTemplate,
		    InternalSupervisorId:IntSupervisor[0],
		    ZIP_Code:ZIP,
		    CustType:CustTypt,		    		 
		    Contact_No:Number,
		    //BusinessDomain:BusinessDomain,
		    TAX_ID:TaxId,
		    CompanyIDId:parseInt(CompanyId)
		    
		    
    };   
    
   
       
       
    $.when(AddItemToList(ListName,Metadata)).done(function(responseIdmore)
    {   		     
	   alert('Submitted successfully!');
	   /*var file=fileInput =$('#file_upload').val();
	   if(file.length>0){
	    AddAttachment(responseIdmore.d.Id);	
	    }*/  
 	       $("#modalAddNewClient").modal('hide');           
           cleartextbox();
		    				   
	})
}
	
//Add item in list
function AddItemToList(ListName,Metadata)
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


/*---------------Update Client-----------*/
var guestSupervisorID;
var IntSupervisor;
var Stakeholder;
function UpdateClientName()
{
    if(UserAuthorization==false){
	  alert('You are not authorized to access ! ');
	  $("#CreateClientEntry").hide();
	  $("#modalAddNewClient").modal('hide');
	  
	   return false;
	  }
	  
	  
	  
	 var Code=$('#txtCode').val();
	/*if(Code.length==''){
	  alert('Please Enter Code');
	  return false;
	}*/
	var Association=$('input[name="Association"]:checked').val();

	var ClientName=$('#txtClientName').val().trim();
	if(ClientName.length==''){
	  if(Association=='Organization'){
	   alert('Please Enter Organization');
	  }
	  else{alert('Please Enter Group Name');}
	  return false;
	}
  
	var SelfCompany=$('#checkSelfCompany').is(":checked");
    if(SelfCompany==true){
	 getSelfCompanyId ();}
	if(getId.length>0){
     updatSelfCompany();
     }


	
	
	
	
	var SalesPersonId = getPeopleUserInfoGroups("peoplePickerSale");
    

	  if(SalesPersonId.length==0)
	    {
	      alert("Please Fill the SalesPerson");
		  return false;
		}
	 if(SalesPersonId.length>1)
	   {
		alert("please insert only 1 SalesPerson ");
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
  
    
	 IntSupervisor= getPeopleUserInfoGroups("peoplePickerIntSupervisor");   
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
        
  Stakeholder= getPeopleUserInfoGroups("peoplePickerStakeholder");
	
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

    
    

var SupGuest= getPeopleUserInfoGroups("peoplePickerExtSupervisor");
    guestSupervisorID=SupGuest;
   	
   	if(guestSupervisorID.length==1)
	   {
	     var supervisorid= IsSupervisorActive(guestSupervisorID[0]);
		 if(!supervisorid)
          {   
             var GuestDisplayName=$('#peoplePickerExtSupervisor_TopSpan_HiddenInput').val().split('DisplayText":"')[1].split(',"')[0];
             alert(GuestDisplayName+" does not belong to "+ClientName);
             supervisorid="";
             return false;
          }				 
				  
	    }
    if(guestSupervisorID.length==0)
	   {
	    getCompany();	     
		 if(countOfUser>0)
          {   
             alert("Please Enter Supervisor on Guest Users");
             return false;
          }				 
				  
	    }
	 

   
	if(guestSupervisorID.length>1)
	  {
	    alert("please insert only 1 Supervisor ");
		return false;
	  }

 
     
 
	var AttnName=$('#txtAttnName').val();
	var Address=$('#txtAddress').val();
	var Country=$('#txtContry').val();
	var Email=$('#txtEmail').val();
    var AttnName=$('#txtAttnName').val();
    var City=$('#txtCity').val();
    var State=$('#txtState').val();            
    var ZIP=$('#txtZip').val(); 
    var Number=$('#txtnumber').val();
    var ddlTemplate=$( "#ddlTemplate option:selected" ).val();
    var BusinessDomain=$('#txtBusinessDomain').val();
    var TaxId=$('#txtTAXID').val(); 
	var IsActive=$('#checkbox').is(":checked")
    var CustTypt=$( "#ddlCustTypt option:selected" ).text()
	var Email=$('#txtEmail').val();
	var Results=checkExistForUpdate(DataId,ClientName);
	if(Results.length>1){
	 alert('This ClientName is already Exists');
	return false}
	var emailV=$('#txtEmail');
	if(Email!=''){
	//var emailva=validateEmail()
	if(checkEmail==false){
	  //alert('Please ckech Invalid Email Address')
	  return false}}
	  
	  
	/*for(var u = 0;u < Stakeholder.length; u++){
	  	 
      if(IntSupervisor[0]==Stakeholder[u]){
       var check=IsActiveUser(Stakeholder[u]);
      alert("Check the user "+userName + " can not be defined as both, Mambers and Supervisor.");
        return false;
      }
   }*/
  

    waitingDialog.show();
    var Association =$('input[name="Association"]:checked').val();
    getCompany();
    if(countOfUser>0 && IsActive==false){
     alert('You can not Inactive because some active guest Users exists under this Customer !');
     waitingDialog.hide();
     return false;
    }
	    var Metadata;
	    		Metadata = {
	        __metadata: {'type': 'SP.Data.ClientMasterListItem'},
	        Title : ClientName,
	        Client_Code : Code,
	        Attn_Name: AttnName,	  
		    BillingAddress :Address,
		    EmailId :Email,
		    SelfCompany:SelfCompany,
		    Country :Country,
		    Association:Association,
		    IsActive:IsActive,
		    City:City,
		    State:State,
		    //SalesPersonId:updateuser[0],
		    SupervisorId:SupGuest[0],
		    SalesPersonId:SalesPersonId[0],
		    InternalMembersId:{ 'results' :Stakeholder },
		    TemplateType:ddlTemplate,
		    InternalSupervisorId:IntSupervisor[0],
		    
		    CustType:CustTypt,
		    ZIP_Code:ZIP,
		    Contact_No:Number,
		    //BusinessDomain:BusinessDomain,
		    TAX_ID:TaxId,
		    CompanyIDId:parseInt(CompanyId)

		    
		    
    };       
       
    $.when(UpdateItemToList(Metadata)).done(function(responseIdmore)
    {   		     
	   if(getExtSup!=''){	   
	    UpdateExternal();
	   }
	   alert('Updated successfully');
	   waitingDialog.hide();	   	     
	   $("#modalAddNewClient").modal('hide');
	   /*var file=$('#file_upload').val();
	   if(file.length>0){
	   AddAttachment(DataId);}*/
	    cleartextbox();            
          

		    				   
	})
}



//$.when(UpdateItemToList(Metadata)).done(function(responseIdmore)
function UpdateItemToList(Metadata)
{
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ClientMaster')/Items('"+DataId+"')",
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
                    if(res.length>0){$("#addClient").show();$("#CreateClientEntry").show();
                      UserAuthorization=true;
                      }
                    else{
                         $("#addClient").hide();
                         $("#CreateClientEntry").hide();
                          UserAuthorization=false;

                         }
                 }
                 else if (items[0].Scope =="Everyone" || items[0].Scope =="EVERYONE")
                 {
                     $("#addClient").show();
                     $("#CreateClientEntry").show();
                     UserAuthorization=true;
                     
                }
                else
                {
                    $("#addClient").hide();
                    $("#CreateClientEntry").hide();
                    UserAuthorization=false;
                }             
            }
            else{
                 $("#addClient").hide();
                 $("#CreateClientEntry").hide();
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



function AddAttachment(responseIdmore)
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
    var txtClientName=$("#txtClientName").val().trim();
     var extSupervisorId='';
debugger;

var clientOwnurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ExternalUsers')/items?$select=*,Client_Name/Title,Client_Name/Id,LoginName/Id&$expand=LoginName,Client_Name/Title,Client_Name/Id&$filter= Status eq 'Active' and LoginNameId eq " + SupervisorId+ "";
       $.ajax({    	           
        url: clientOwnurl,
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
              var Client_Name=items[0].Client_Name.Title;
              ClientName=items[0].Client_Name.Id; 
              if(Client_Name==txtClientName){                     
                 extSupervisorId=items[0].Id;
                }
            }
           else
              {
                extSupervisorId= false;  
                 
              }
           
         },
         error:function(error){
         }
         	
});
   
    return extSupervisorId;
}


function getCategory() {
	var URL,ListName='CategoryMaster';
	$('#ddlTypefilter').append($('<option/>').val('ALL').text('ALL'));
	$('#ddlCustomerfilter').append($('<option/>').val('ALL').text('ALL'));	   
	URL=_spPageContextInfo.webAbsoluteUrl +"/_api/web/Lists/getbytitle('CategoryMaster')/Items?$filter=CategoryType eq 'Guest Type' and Status eq 'Yes'";
	$.ajax({
		url:URL,
		headers:{ Accept:'application/json;odata=verbose'},
		async:false,
		success:function (data) {
			var items=data.d.results;
			for(var i=0;i<items.length;i++)
			{
				$('#ddlCustTypt').append($('<option/>').val(items[i].CatogeryName).text(items[i].CatogeryName));
                $('#ddlCustomerfilter').append($('<option/>').val(items[i].CatogeryName).text(items[i].CatogeryName));
               // $('#ddlCollaboration').append($('<option/>').val(items[i].CatogeryName).text(items[i].CatogeryName));

                				
			}
		},
		error : function (data) {
			console.log(data);
			
		}
	})
}


/*-----------------------get template----------------------------*/

function getTemplate() {
debugger;
	var URL,ListName='TemplateMaster';
	//$('#ddlTypefilter').append($('<option/>').val('ALL').text('ALL'));
	//$('#ddlCustomerfilter').append($('<option/>').val('ALL').text('ALL'));
	var tempate=$("#ddlTemplate option:selected" ).text();
	var title=$("#ddlTemplate option:selected" ).val();
	$("#TempalteName").empty();
	$("#CustomName").empty();
	$("#pDescription").empty();


	if(tempate!=''){
	  	URL=_spPageContextInfo.webAbsoluteUrl +"/_api/web/Lists/getbytitle('TemplateMaster')/Items?$select=*,AttachmentFiles&$filter=Title eq '"+title+"'&$expand=AttachmentFiles";
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
                } 
			}
		},
		error : function (data) {
			console.log(data);
			
		}
	})
}




/* -----------------------Get Company --------------------------------*/
var comArray=[];
var getExtSup='';
var countOfUser;
function getCompany() {
  var txtClientName=$("#txtClientName").val().trim();
  getExtSup='';
  countOfUser=0;
  if(guestSupervisorID.length==0){
     ClientName=DataId;
    }
  var clientOwnurl= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ExternalUsers')/items?$select=*,Client_Name/Title,Client_Name/Id,LoginName/Id&$expand=LoginName,Client_Name/Title,Client_Name/Id&$filter=Client_NameId eq " +ClientName+ "";
       $.ajax({    	           
        url: clientOwnurl,
        headers: { "accept": "application/json;odata=verbose",
        			"X-RequestDigest": $("#__REQUESTDIGEST").val(), 
	    		    "IF-MATCH": "*",  
	    		 },
        async: false,
        success: function (data)
         {
           var items=data.d.results;
           for(var i=0; i<items.length; i++){
             getExtSup=items[i].Supervisor_GuestId;
             comArray.push(items[i].Id);
             if(items[i].Status=='Active'){
               countOfUser++;
             }
           }
           
                      
         },
         error:function(error){
         }
         	
});

}

/*-------------update External list ---------------------------------*/

function UpdateExternal()
{   debugger;
 var Status=$('#checkbox').is(":checked");
 var ddlTemplate=$( "#ddlTemplate option:selected" ).val();
 var CustTypt=$( "#ddlCustTypt option:selected" ).text()
 var InterSup =getPeopleUserInfoGroups("peoplePickerIntSupervisor");
 var mamber=getPeopleUserInfoGroups("peoplePickerStakeholder");
 var ExternalSup=getPeopleUserInfoGroups("peoplePickerExtSupervisor");  
  for (var i=0;i<comArray.length;i++){
	 var id=comArray[i];
     var Metadata;
    		Metadata = {
        __metadata: {'type': 'SP.Data.ExternalUsersListItem'},  
	    Supervisor_GuestId:ExternalSup[0],
	    CollaborationType:CustTypt,
	    TemplateType:ddlTemplate,
	      
	    InternalStakeholdersId:{ 'results' : mamber}, 
        SupervisorId:InterSup[0]
    };
      
    /* if(Status==false){
      Metadata["Status"]="Inactive";
     }*/
    
  
	$.when(updateExternalusers(Metadata,id)).done(function(responseIdmore)
    {
    	console.log('External user update');
	})
  }
}

//Edit item in list
function updateExternalusers(Metadata,id)
{
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ExternalUsers')/Items('"+id+"')",
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



var userName;
var arryDisplayText;
var userActiveCheck= false;
function IsActiveUser(UserId) {
     userName='';
     userActiveCheck= false;
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

function blockSpecialChar(e) {
    var k = e.keyCode;
       return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k==32 || k==45  || (k >= 48 && k <= 57));
}