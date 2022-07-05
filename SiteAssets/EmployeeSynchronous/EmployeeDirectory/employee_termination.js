var currentCompanyid="";
var employeedIddetails="";
var departmentID="";
var sourcelocation="";
var openTaskID=new Array();
var app = angular.module('myApp', []);
function updateItemWithID(ListName, Metadata, ID) 
{
	
    var dfd = $.Deferred();

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + ID + "')",
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
           // console.log();
            dfd.resolve(true);

        },
        error: function (error) {
			
            alert(JSON.stringify(error));
            dfd.reject(error);

        }
    });
    return dfd.promise();
}

function GetItemTypeForListName (ListName) 
{
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

function GetDateStandardFormat(datek)
{	
var newDate="";
if(datek!=null && datek!="")
{
	  var dateS=ConvertDateFormatToddMMyyyy(datek);
      var startDate = new Date(dateS);
     // seconds * minutes * hours * milliseconds = 1 day
			var day = 60 * 60 * 24 * 1000;
			//var endDate = new Date(startDate.getTime() + day);
            var endDate = new Date(startDate.getTime());
             newDate =endDate.toISOString();
}
			return newDate; 
}
function ConvertDateFormatToddMMyyyy(date1) {
        var formatedDate = stringToDate(date1, 'dd/MM/yyyy', "/")
        // var year = formatedDate.getFullYear();
        // var month = (1 + formatedDate.getMonth()).toString();
        // month = month.length > 1 ? month : '0' + month;
        // var day = formatedDate.getDate().toString()   
        // day = day.length > 1 ? day : '0' + day;
        return formatedDate;
    }
    function stringToDate(_date, _format, _delimiter) 
	{
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
app.controller('myCtrl', function($scope,$http) 
{
	 currentCompanyid=titanForWork.getQueryStringParameter("CompanyId");	
	 departmentID=titanForWork.getQueryStringParameter("department");	
	 employeedIddetails=titanForWork.getQueryStringParameter("employeedIddetails");	 

	 sourcelocation=titanForWork.getQueryStringParameter("sourcelocation");
	 $scope.currentitemId=employeedIddetails;
	
	 $scope.teamporaryImageUrl="";
	 $scope.imageUrl="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
	 $scope.company=currentCompanyid;
	 $scope.managerObject=false;
	 $scope.accountObjecttion=false;
	 $scope.itObjecttion=false;
	 $scope.hraObjecttion=false;
	 $scope.allTaskClosed=false;
	 $scope.dateofTermination="";
	 $scope.EmployeeCheckListValidation=function ()
	{			
		try
		{        		
		     var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ID,DepartmentId,LogonName/UserName,Company/ID&$expand=LogonName,Company&$filter=LogonName/UserName  eq '" + $scope.userID +"'";				 
             $http({
				url: Ownurl,
				method: "GET",
				async: false,
				headers: { "Accept": "application/json;odata=verbose" }
			}).then(function mySuccess(response) 
		    {			
                for(var i=0;i<response.data.d.results.length;i++)
				{
					$scope.updateInformation(response.data.d.results[i].ID,"Terminated","Employees");
				}
               				
		    }, function myError(response) 
		   {
		     $scope.myWelcome = response.statusText;
		   });
		}
		catch(e)
		{waitingDialog.hide();
			alert('LogonName is not in valid format !');	
		}		 
	}
	
	$scope.updateTerminationInformation=function()
	{	
	
         try 
			{
		//if($scope.managerObject==true && $scope.accountObjecttion==true && $scope.itObjecttion==true && $scope.hraObjecttion==true && $scope.allTaskClosed==true)
		//{	
	             waitingDialog.show();
				 $.when($scope.EmployeeCheckListValidation()).done(function (MainExamListItemTemp) 
				 {					
					 for(var k=0;k<openTaskID.length;k++)
					 {					   
					   $scope.closeAllOpenTasks(openTaskID[k],"Cancelled","EmployeeTaskDetails");
					 }
					 $scope.GetEmployeeTeamList();//Terminate team memeber	
                     setTimeout(function(){alert('Successfully Terminated.');waitingDialog.hide();},10000);					 
				 });
		//}
		/*else
		{
			alert("Please agree and check-out all declaration points.");
		}*/
			}
			catch(e)
			{
				alert('Please try again, something went wrong .');
				$scope.mystatus="Active";
				waitingDialog.hide();
			}
	}
	$scope.confirmation=function () 
	{
		var txt;
		var r = confirm("Do You Want to Terminate this Employee?");
		if (r == true) 
		{
			if($scope.dateofTermination!="" && $scope.dateofTermination!=null)
			{				
			  var ProjectManager=getPeopleUserInfoGroups('ProjectManagerPicker');
			    if(ProjectManager.length==0){
			      alert('Please Enter personal documents reassigned to Project Mamber Name!')
			      return false;
			    }
			    var subordinatesManager=getPeopleUserInfoGroups('subordinatesManagerPicker');
			    if(subordinatesManager.length==0){
			      alert('Please Enter personal documents reassigned to subordinates Project Mamber Name!')
			      return false;
			    }
			    var Delegated_UserId=getPeopleUserInfoGroups('managerPicker');
			    if(Delegated_UserId.length==0){
			      alert('Please Enter personal documents reassigned to Mamber Name!')
			      return false;
			    }

			  
			  $scope.updateTerminationInformation();
			  
			  addDMS_Access_Delegation($scope.eMail,$scope.LogonNameId);
			  
			}
			else
			{
				alert('Please Enter the Termination Date of the Employee.');				
			}			
		} else 
		{
			
		}
    }
	$scope.redirectCancel=function()
	{
		 $scope.RedirectPage(sourcelocation);
	}
	$scope.RedirectPage=function(urllink)
	{
		var departmentLink="";
		if(departmentID!=null && departmentID!="")
		{
			
			departmentLink="&DepartmentId="+departmentID;
		}
		var url = urllink+"?WebAppId="+$scope.company+departmentLink;
		$(location).attr('href',url);	
	}
    $scope.updateInformation=function(currentitemId,status,ListName)
	{		
			try 
			{
				$scope.mystatus="Terminated";
			var Metadata;
			var ItemType =GetItemTypeForListName(ListName);

					Metadata = {
						__metadata: {
							'type': ItemType
						},
						Status:status,
						DateofTermination:GetDateStandardFormat($scope.dateofTermination)					 
					};
				
				updateItemWithID(ListName, Metadata,currentitemId);							
		} 
		catch (error)
		{waitingDialog.hide();
			$scope.mystatus="Active";
			console.log(error.message);
		}
	}
    $scope.GetEmployees = function ()
    {		
			$http({
				url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$select=ID,Email,LogonNameId,DateofTermination,Gender,EmployeeID,GroupName,HomeAddress,HomePhone,JoiningDate,PostalAddresses,OtherEMailAddress,StateProvince,Status,ZIPPostalCode,Country,DateOfAnniversary,DateOfBirth,City,AttachmentFiles,FullName,Designation,Manager,MobileNumber,ExtensionName,LogonName/UserName,Department/ID,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName,ManagerLoginName/EMail&$orderby=FullName&$expand=LogonName,ManagerLoginName,OfficeLocation,Company,Department,AttachmentFiles&$filter=ID  eq '" + $scope.currentitemId +"'",
				method: "GET",				
				headers: { "Accept": "application/json;odata=verbose" }
			}).then(function mySuccess(response) 
		    {
				
				if(response.data.d.results.length>0)
				{			                  
					 $scope.SetEmployeeDetails(response.data.d.results[0]);
					 console.log(response.data.d.results[0]);                   					 
				}			  			 
		    }, function myError(response) 
		   {
		     $scope.myWelcome = response.statusText;
		   });		
    }
	 $scope.closeAllOpenTasks=function(currentitemId,status,ListName)
		{		
				try 
				{
				$scope.mystatus="Terminated";
				var Metadata;
				var ItemType =GetItemTypeForListName(ListName);

						Metadata = {
							__metadata: {
								'type': ItemType
							},
							CurrentPhase:status					 
						};
					
					updateItemWithID(ListName, Metadata,currentitemId);							
			} 
			catch (error)
			{waitingDialog.hide();
				console.log(error.message);
				$scope.mystatus="Active";
			}
		}	
    $scope.GetEmployeeTasks = function ()
    {	
           openTaskID=[];	
			$http({
				url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('EmployeeTaskDetails')/items?$select=ID,ProjectName,TaskAssignTo,CurrentPhase,TaskAssignTo/UserName&$expand=TaskAssignTo&$filter=TaskAssignTo/UserName  eq '" + $scope.userID +"' and CurrentPhase eq 'Open'",
				method: "GET",
				headers: { "Accept": "application/json;odata=verbose" }
			}).then(function mySuccess(response) 
		    {
				var generalOpenTask=0;
				var projectTask=0;
				for(var j=0;j<response.data.d.results.length;j++)
				{
					var projectName=response.data.d.results[j].ProjectName;
					if(projectName==null || projectName=="")
					{
						generalOpenTask++;
					}
					else
					{
						projectTask++;
					}
					openTaskID.push(response.data.d.results[j].ID);
				}
				$scope.generalOpenTask=generalOpenTask;
				$scope.projectTask=projectTask;
				
		    }, function myError(response) 
		   {
		     $scope.myWelcome = response.statusText;
		   });		
    }


$scope.GetEmployeeTeamList = function ()
    {	
       	
			$http({
				url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('ProjectTeamDetails')/items?$select=ID,TeamMember,TeamMember/UserName&$expand=TeamMember&$filter=TeamMember/UserName  eq '" + $scope.userID +"' and Status eq 'Active'",
				method: "GET",
				headers: { "Accept": "application/json;odata=verbose" }
			}).then(function mySuccess(response) 
		    {
			
				for(var j=0;j<response.data.d.results.length;j++)
				{
					  $scope.updateTeamStatusInformation(response.data.d.results[j].ID,"Terminated","ProjectTeamDetails");
				}
		    }, function myError(response) 
		   {
		     $scope.myWelcome = response.statusText;
		   });		
    }	
    
    $scope.updateTeamStatusInformation=function(currentitemId,status,ListName)
	{		
			try 
			{
				$scope.mystatus="Terminated";
			var Metadata;
			var ItemType =GetItemTypeForListName(ListName);

					Metadata = {
						__metadata: {
							'type': ItemType
						},
						Status:status				 
					};
				
				updateItemWithID(ListName, Metadata,currentitemId);							
		} 
		catch (error)
		{waitingDialog.hide();
			$scope.mystatus="Active";
			console.log(error.message);
		}
	}
    	
	$scope.SetEmployeeDetails=function(employeeInformation)
	{		
		$scope.currentitemId=employeeInformation.ID;
		$scope.employeeName=employeeInformation.FullName;
		$scope.imageUrl=$scope.GetAttachment(employeeInformation.AttachmentFiles,employeeInformation.Email);
		$scope.designation=employeeInformation.Designation;
		$scope.eMail=employeeInformation.Email;
		$scope.LogonNameId=employeeInformation.LogonNameId;
		$scope.officeLocation=employeeInformation.OfficeLocation.OfficeName;
		$scope.department=employeeInformation.Department.DepartmentName;	
        $scope.userID=employeeInformation.LogonName.UserName;
		$scope.mystatus=employeeInformation.Status;
		
		var joiningDate=new Date(employeeInformation.JoiningDate);
		        $('#date').datepicker({ 
					  changeMonth: true,
					  changeYear: true,
					  minDate:joiningDate,
					 maxDate: 0, 
					 yearRange: "-10:+0"
				 }); 
			    $('#date').datepicker("option", "dateFormat", "dd/mm/yy");
		setPeoplePickerUsersInfoCurrentGroups('managerPicker',employeeInformation.ManagerLoginName.EMail);
		setPeoplePickerUsersInfoCurrentGroups('ProjectManagerPicker',employeeInformation.ManagerLoginName.EMail);
		setPeoplePickerUsersInfoCurrentGroups('subordinatesManagerPicker',employeeInformation.ManagerLoginName.EMail);
		
		$scope.GetEmployeeTasks();
	}
	$scope.GetAttachment=function(attachmentcollection,EMail)
	{
		var attachmentUrl=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(EMail)    //"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
		if(attachmentcollection.results.length>0)
		{
			attachmentUrl=attachmentcollection.results[0].ServerRelativeUrl;
			$scope.teamporaryImageUrl=attachmentcollection.results[0].ServerRelativeUrl
		}
	    return attachmentUrl;
	}
});



/*----------18/09/2021--Lakhan --------*/


$(document).ready(function(){

InitializePeoplePicker("managerPicker", true);
InitializePeoplePicker("ProjectManagerPicker", false);
InitializePeoplePicker("subordinatesManagerPicker", false);
});


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




function setPeoplePickerUsersInfoCurrentGroups(controlNameID, LoginNameOrEmail) 
{
    var peoplePickerDiv = $("[id^='" + controlNameID + "']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
    peoplePicker.AddUserKeys(LoginNameOrEmail, false);
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


function addDMS_Access_Delegation(UserEMail,UserId){   
   
	var ProjectManager=getPeopleUserInfoGroups('ProjectManagerPicker');
	    if(ProjectManager.length==0){
	      alert('Please Enter reassigned to Project Mamber!')
	      return false;
	    }
	var subordinatesManager=getPeopleUserInfoGroups('subordinatesManagerPicker');
	    if(subordinatesManager.length==0){
	      alert('Please Enter reassigned to subordinates Mamber!')
	      return false;
	    }
	var Delegated_UserId=getPeopleUserInfoGroups('managerPicker');
	    if(Delegated_UserId.length==0){
	      alert('Please Enter reassigned to Mamber!')
	      return false;
	    }            

   
    var DMS_Link="https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV/DocumentManagementSystem/Forms/AllItems.aspx";
    var ListName='DMS_Access_Delegation';
    var Metadata;
       //itemType=GetItemTypeForListName(ListName)
    		Metadata = {
        __metadata: {'type': 'SP.Data.DMS_x005f_Access_x005f_DelegationListItem'},
        Title : 'Access shifted due to termination',
		Original_UserId:UserId,
		SubordinatesManagerId:subordinatesManager[0],
		ProjectManagerId:ProjectManager[0],
		Delegated_UserId:{ 'results' : Delegated_UserId},
	    DMS_Name:'MY DMS',
	    DMS_Folder:UserEMail,
	    DMS_Link:
        {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': DMS_Link,
            'Url': DMS_Link
        },	    
	    Reason:'Termination'
	    	    
    };       
       
    $.when(AddItemToList(ListName,Metadata)).done(function(responseIdmore)
    {   		     
	    console.log('add DMS_Access_Delegation !')        
		    				   
	})
  }


function AddItemToList(ListName,Metadata)
{
    var dfd = $.Deferred();

    var ownURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('DMS_Access_Delegation')/Items";
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


