$(document).ready(function (){
	  var myVar = $("#btnSubmit").find('.panel-heading-bg-txt-clr').val();
	  //alert(myVar);

		$('#btnCreateCustomColumn').click(function (){
		 debugger;
		 //Create_List()
		 var ProjectSiteURL='https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV/TITAN/DMS/0f68d9b1-067e-4f8e-af96-a99bf6408b5b';
		 createNewCustomColumn();
		 //getGUID()
		//addEmployeeTaskDetails();
		
		});
		
		$('#btncustomer').click(function (){
		 debugger;
		AddCustomer();
		
		});
		
		$('#btnCreateCustomColumns').click(function (){
		 debugger;
		CreateListColumns();
		
		});
		
		
		$('#btnAddEmployee').click(function (){
		 debugger;
		Addemployee ();
		
		});
		
		$('#btnaddComment').click(function (){
		 debugger;
		AddCommentInAnnouncement();
		
		});
		
		$('#btnaddProject').click(function (){
		 debugger;
		addProjectkDetails();
		
		});
		
		

	});
	
var TaskAssignTo=[116,20,32];

function addEmployeeTaskDetails(){
 var ListName='EmployeeTaskDetails';
  
  var today = new Date();
var CurrentDate=today.toISOString().substring(0, 50);

 
	for(var i=1;i<=500; i++){
	  var TaskName='TestTask'+i;
	  
		var Metadata;
			   Metadata = {
			    __metadata: {'type': 'SP.Data.EmployeeTaskDetailsListItem'},
			    TaskAssignToId: {
	                'results': TaskAssignTo
	            },
	            Title: TaskName,
	            CurrentPhase:'Open',
	            TaskType:'General task',
	            //Description: Discription,
	            StartDate: CurrentDate,
	            DueDate: '01/01/2023',
	            TaskPriority: 'Medium',
	            Worktype :'Fixed Bugs',
	            Distribution:'Consolidated',
	           	CompanyId:Logged_CompanyId  
             };  
			$.when(AddItemEmp(ListName,Metadata)).done(function(responseIdmore)
		    {
		    	if(i==500){
			     alert('Submit successfully');	
			     
                 }   	      
			     //console.log(i)	;       
			       
		   })
		}
	
	}
	
function addProjectkDetails(){
 var ListName='ProjectDetails';
var Description='A pie chart (or a circle chart) is a circular statistical graphic, which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice (and consequently its central angle and area), is proportional to the quantity it represents. While it is named for its resemblance to a pie which has been sliced, there are variations on the way it can be presented. The earliest known pie chart is generally credited to William Playfair ie charts are very widely used in the business world and the mass media.[3] However, they have been criticized,[4] and many experts recommend avoiding them,[5][6][7][8]'  
var today = new Date();
var endDate=new Date('26/5/2022');
var CurrentDate=today.toISOString().substring(0, 50);

 
	for(var i=3000;i<=5000; i++){
	  var ProjectName='TestProject'+i;	  
	  var Metadata;
      Metadata = {
     __metadata: {
        'type': 'SP.Data.ProjectDetailsListItem'
     },
	    Title: ProjectName,
	    ProjectCode: '2540D',
	    ProjectName: ProjectName,
	    ProjectDescription: Description,
	    ProjectSiteURL: '',
	    DepartmentId: '50',
	    Department_IDId: Logged_DepartmentId,
	    //ClientName:'ABC',
	    ActualStartDate: CurrentDate,
	    PlanedStartDate:CurrentDate ,
	    PlanedEndDate:'2022-10-26T12:10:10.641Z',
	    TechnologyUsed: '',
	    Status: 'Live',
	    DepartmentName: '50',
	   // ConsultantName: '',
	    ManagerNameId: 32,
	    //StackeholderId:{ 'results': 20},
	    //SponsorId:116,
	    OfficeLocation: 'Gurgaon Main Office',
	    Domain: 'ABC',
	    //OfficeLocationID: '',
	    Office_Location_IdId: Logged_Location,
	    CompanyId:'2',
	    /*MultipleStackeholderId: { 'results': 20},
	    MultipleSponsorId: { 'results': 116},
	    ProjectInternalName: ProjectName,*/
	    ClientIDId:3,
	    ProgramIDId:2
	    //HoursPerDay: HoursPerDay,
	    //EstimatedWorkHours: 2
    };
			   
  
			$.when(AddItemEmp(ListName,Metadata)).done(function(responseIdmore)
		    {
		    	if(i==5000){
			     alert('Submit successfully');	
			     
                 }   	      
			     //console.log(i)	;       
			       
		   })
		}
	
}	
	







function AddItemEmp(ListName,Metadata)
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
           alert(JSON.stringify(error));
           dfd.reject(error);
        }
    });
    return dfd.promise();
}

/*-----------add Customer -------*/
function AddCustomer(){
debugger;
var ClientName=''
for(var i=1;i<=500; i++){

	var Address='';
	var Country='';
	 ClientName='Adapt'+i;
	var Email='Demo'+i+'@x.com';
    var AttnName='Lakhan'+i;
    var City='New York';
    var State='';            
    var ZIP=''; 
    var Number='';
    var BusinessDomain='Adapt';
    var TaxId=''; 
	var CustTypt='Gust';
	var ddlTemplate='';	
	//var IsActive=$('#checkbox').is(":checked");		 
	var ListName = "ClientMaster";	 
      var Metadata;
	  Metadata = {
	        __metadata: {'type': 'SP.Data.ClientMasterListItem'},
	        Title : ClientName,
	        Client_Code : '205',
	        Attn_Name: AttnName,	  
		    BillingAddress :Address,
		    EmailId :Email,
		    Country :Country,
		    IsActive:true,
		    City:City,
		    State:'Up',
		    //SelfCompany:'No',
		    SalesPersonId:TaskAssignTo[0],
		    InternalMembersId:{ 'results' :TaskAssignTo},
		    TemplateType:'Template1',
		    InternalSupervisorId:TaskAssignTo[1],
		    //ZIP_Code:ZIP,
		    CustType:'Guest',		    		 
		    Contact_No:'02546580',
		    //Association:Association,
		    //BusinessDomain:BusinessDomain,
		    //TAX_ID:TaxId,
		    CompanyIDId:Logged_CompanyId
		    
		    
    };  
       
       
    $.when(AddItemEmp(ListName,Metadata)).done(function(responseIdmore)
    {   		     
	   if(i==500){
			     alert('Submit successfully');
			     
			     
	  }	  		    				   
	})
}
}


function Create_List(){
  createList('Test by lakhan')
  }
  
function createList(listName) {
	var siteUrl = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists";
	$.ajax({
		url: siteUrl,
		type: "POST",
		data: JSON.stringify({
		'__metadata': { 'type': 'SP.List' },
		'BaseTemplate': 101,
		
		'Title': listName
		}),
		headers: {
		"accept": "application/json;odata=verbose",
		"content-type": "application/json;odata=verbose",
		"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		success: onQuerySucceeded,
		error: onQueryFailed
	});
}

function onQuerySucceeded(data) {
   alert(data.d.Title + " successfully created!");
}

function onQueryFailed() {
    alert('Error!');
}  






function Addemployee (){
	var ListName='Employees';
	var today = new Date();
	var CurrentDate=today.toISOString().substring(0, 50);
	
	//var Title=Tom Patrick;
	var Metadata;
	for(var i=4806; i<=4900; i++){
	  Metadata = {
                __metadata: {
                    'type': 'SP.Data.EmployeesListItem'
                },
                LogonNameId: 116,
                FullName:'Lakhan sharma'+i ,
                Title: 'Lakhan sharma'+i,
                ParentId: 400,
                Designation:'BA',
                //GroupName: $scope.groupName,
                Manager:'Dipankar Goswami' ,
                ManagerLoginNameId:20,
                //MobileNumber: ,
                //ExtensionName: ,
                Email: 'lakhan.sharma@adapt-india.com',
                //DateOfBirth: GetDateStandardFormat($scope.dateofBirth),
                //DateOfAnniversary: GetDateStandardFormat($scope.dateofAnniversary),
                Gender: 'Male',
                //EmployeeID:1255,
                CompanyId: Logged_CompanyId,
                DepartmentId:Logged_DepartmentId,
                OfficeLocationId: Logged_Location,
                Status: 'Active',
                JoiningDate:CurrentDate ,
                //DateofTermination: GetDateStandardFormat($scope.dateofTermination),
                //PostalAddresses: $scope.currentAddress,
                //City: $scope.city,
                //StateProvince: $scope.state,
                //ZIPPostalCode: $scope.zip,
                //Country: $scope.country,
                //HomePhone: $scope.homePhone,
                //OtherEMailAddress: $scope.otherEmail,
                //HomeAddress: $scope.parmanentAddress,
                //Introduction: $(".richText-editor").html(),
                PrimaryCompany: 'Primary'
            };
            
	    $.when(AddItemEmp(ListName,Metadata)).done(function(responseIdmore)
	    {   		     
		   if(i==4900){
				     alert('Submit successfully');			     
				     
		  }	  		    				   
		}) 
        
  }
} 


function AddCommentInAnnouncement(){
   	var Metadata;
	for(var i=1; i<=1000; i++){

    var userid = _spPageContextInfo.userId;
    var Employeeprofilepic='/sites/Titan_2_2_1_DEV/Lists/Employees/Attachments/400/dipankar1.jpg';
    
            var listName="AnnouncementsChild";		
            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},
            
           'Item_ID':'1357',
           'WebPartName':'Banner',
           'Comment':'test'+i,
           'ReplierId':parseInt(userid),
           'Initials':"Parent",
           'ReplyforId':parseInt(userid),
           'UserImage':Employeeprofilepic
           
           };
     $.when(AddItemEmp(listName,item)).done(function(responseIdmore)
	    {   		     
		   if(i==1000){
				     alert('Submit successfully');			     
				     
		  }	  		    				   
		}) 
       
   }
}

var arrMeta=[
	{FieldTypeKind:2,Title:'DocumentNo'},
	{FieldTypeKind:2,Title:'DocumentType'},
	{FieldTypeKind:2,Title:'DocumentWrittenBy'},
	{FieldTypeKind:3,Title:'Details'},
	//{FieldTypeKind:20,Title:'Checked Out To'},
	{FieldTypeKind:20,Title:'Shared'},
	{FieldTypeKind:20,Title:'Shared With'},
	{FieldTypeKind:2,Title:'AccessLevel'},
	{FieldTypeKind:2,Title:'SecurityLevel'},
	{FieldTypeKind:2,Title:'PermissionLevel'},
	{FieldTypeKind:2,Title:'PermissionLevelId'},
	{FieldTypeKind:6,Title:'Acknowledgement'},
	{FieldTypeKind:2,Title:'Approval'},
	{FieldTypeKind:20,Title:'ApprovedBy'},
	{FieldTypeKind:4,Title:'ApprovedDate'},
	{FieldTypeKind:2,Title:'ApprovedVersion'},
	{FieldTypeKind:2,Title:'ApprovedByOutsider'}
	//{FieldTypeKind:2,Title:'test'}
	
]

function CreateListColumn() {
   console.log(arrMeta);
   //if()
   
  for(var i=0;i<arrMeta.length;i++){
  var Metadata;
     Metadata={__metadata:{'type': 'SP.FieldUser','addToDefaultView':'true'},
     'FieldTypeKind':arrMeta[i].FieldTypeKind,
     'Title':arrMeta[i].Title,
     //"Required": "true",
     'SelectionMode': 0,     
     //'Mult':'TRUE'
     //'EnforceUniqueValues': 1,
     'AllowMultipleValues':true
     //"Choices": { 'results': ['Draft', 'Approved', 'Pending','Rejected'] }
     }

    $.ajax
        ({
            // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
            // You can replace this with other site URL where you want to apply the function
 
            url: _spPageContextInfo.webAbsoluteUrl+  "/Titan/InformationTechnology22255/_api/web/lists/getByTitle('DepartmentalDMS')/fields",
            type: "POST",
            async:false,
            //'DefaultView': true, 
            // 'FieldTypeKind' value in below line decide the datatype of the column.
            // Some 'FieldTypeKind' values are listed below, after the method, for reference.
            data:JSON.stringify(Metadata),
            headers:
               {
                   // Accept header: Specifies the format for response data from the server.
                   "Accept": "application/json;odata=verbose",
                   //Content-Type header: Specifies the format of the data that the client is sending to the server
                   "Content-Type": "application/json;odata=verbose",
                   // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
                   "X-RequestDigest": $("#__REQUESTDIGEST").val()
               },
            success: function (data, status, xhr) {
                console.log("Success"+ Title);
                alert('Created')
            },
            error: function (xhr, status, error) {
                alert(xhr.responseText);
            }
        });
      }  
}
function getGUID(){
var Ownurl=_spPageContextInfo.webAbsoluteUrl+  "/Titan/IT/_api/web/lists/getByTitle('KnowledgeBaseCategory')/Items?$select=GUID";
$.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results[0].__metadata;
            console.log(data.d.results[0].__metadata.uri);
            items.uri.split("guid'")[1].split("')")[0];
            return items;
            
        },
        error:function (dada){
         console.log('Guid Field');
        }
    

 });
}


function createNewCustomColumn(){
   var SiteURl =$('#txtSubsiteURL').val().trim();
   if(SiteURl.length==0){
     alert('Please Enter DMS site URl');
     return false;
   }
   var ListName=SiteURl.split('/');
   ListName=ListName[ListName.length-1];
   if(ListName=='/'){
     ListName=ListName[ListName.length-2];
   }
   
   
   
    for(var i=0;i<arrMeta.length;i++){
       var Metadata;
       GetAllFieldsFromList(SiteURl.split(ListName),ListName,arrMeta[i].Title);
       if(urlValidation==false){
        return false;
       }
       if(arrColumn==''){ 
	   var ownURL='';
       ownURL=SiteURl.split(ListName)[0]+ "/_api/web/lists/getByTitle('"+ListName+"')/fields"
       if(arrMeta[i].FieldTypeKind==6){
            if(arrMeta[i].Title=='Acknowledgement'){
                 Metadata={__metadata:{'type': 'SP.FieldChoice','addToDefaultView':'true'},
                 'FieldTypeKind':arrMeta[i].FieldTypeKind,
                 'Title':arrMeta[i].Title,
                 "Choices": { 'results': ['Required', 'Not Required', 'N/A'] }
                 }
            }
            else{ 
            
                 Metadata={__metadata:{'type': 'SP.FieldChoice','addToDefaultView':'true'},
                 'FieldTypeKind':arrMeta[i].FieldTypeKind,
                 'Title':arrMeta[i].Title,
                 "Choices": { 'results': ['Draft', 'Approved', 'Pending','Rejected'] }
                 }
       }  
       }
       else{
            if(arrMeta[i].FieldTypeKind!=7){
                 Metadata={__metadata:{'type': 'SP.Field','addToDefaultView':'true'},
                      'FieldTypeKind':arrMeta[i].FieldTypeKind,
                      'Title':arrMeta[i].Title
                      //"Choices": { 'results': ['Draft', 'Approved', 'Pending','Rejected'] }
                 }
            }
       }
       
       if(arrMeta[i].Title=='Shared'){ 
                 ownURL= SiteURl.split(ListName)[0]+ "/_api/web/lists/getByTitle('"+ListName+"')/fields";                 
                 Metadata={__metadata:{'type': 'SP.FieldUser','addToDefaultView':'true'},
                 'FieldTypeKind':arrMeta[i].FieldTypeKind,
                 'Title':arrMeta[i].Title,                 
                 'AllowMultipleValues':true
                 //"Choices": { 'results': ['Draft', 'Approved', 'Pending','Rejected'] }
            }     
       }     
       
       
       if(arrMeta[i].Title=='Shared With'){ 
                 ownURL= SiteURl.split(ListName)[0]+ "/_api/web/lists/getByTitle('"+ListName+"')/fields";           
                 Metadata={__metadata:{'type': 'SP.FieldUser','addToDefaultView':'true'},
                 'FieldTypeKind':arrMeta[i].FieldTypeKind,
                 'Title':arrMeta[i].Title,
              }              
                 
       }
       if(arrMeta[i].Title=='ApprovedBy'){ 
                 ownURL= SiteURl.split(ListName)[0]+ "/_api/web/lists/getByTitle('"+ListName+"')/fields";                
                 Metadata={__metadata:{'type': 'SP.FieldUser','addToDefaultView':'true'},
                 'FieldTypeKind':arrMeta[i].FieldTypeKind,
                 'Title':arrMeta[i].Title,
                 'SelectionMode': 0,         
               }      
       
       }    
       $.ajax
            ({      
                 url:ownURL ,
                 type: "POST",
                 async:false,            
                 data:JSON.stringify(Metadata),
                 headers:
                      {
                      // Accept header: Specifies the format for response data from the server.
                      "Accept": "application/json;odata=verbose",
                      //Content-Type header: Specifies the format of the data that the client is sending to the server
                      "Content-Type": "application/json;odata=verbose",
                      // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
                      "X-RequestDigest": $("#__REQUESTDIGEST").val()
                      },
                 success: function (data, status, xhr) {
                      console.log("Success"+ arrMeta[i].Title);
                      if(arrMeta.length-1==i){
                        alert('Created successfully !');
                      }
                      
                      },
                 error: function (xhr, status, error) {
                      console.log("Failed");
                 }
            });
            }
            else{
              console.log('All ready Add ' + arrMeta[i].Title);
              if(arrMeta.length-1==i){
                        alert('All ready Added!');
                      }
              if(arrMeta[i].Title=='Shared'){
                UpdateFieldFromList(SiteURl.split(ListName),ListName,arrMeta[i].Title)
              }
            }
     }  
  }   
var arrColumn='test';
var urlValidation=true;
function GetAllFieldsFromList(siteURL,ListName,Title) {
arrColumn='';
    $.ajax
        ({
            // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
            // You can replace this with other site URL where you want to apply the function
            
 
            url:  siteURL[0]+ "/_api/web/lists/getByTitle('"+ListName+"')/fields?$filter=Title eq '"+Title+"'",
            method: "GET",
            async:false,
            headers:
               {
                   // Accept header: Specifies the format for response data from the server.
                   "Accept": "application/json;odata=verbose"
               },
            success: function (data, status, xhr) {
                var dataresults = data.d.results;
                for (var i = 0; i < dataresults.length; i++) {
                    arrColumn=dataresults[i]["Title"];
 
                    // Title is one of the field properties, the same way you can get other properties just by specifying the property name here.
                    console.log(dataresults[i]["Title"]);
                }
            },
            error: function (xhr, status, error) {
                alert(xhr.responseText);
                urlValidation=false;
                
            }
        });
}

function UpdateFieldFromList(siteURL,ListName,Title) {
    $.ajax
        ({
            // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
            // You can replace this with other site URL where you want to apply the function
 
            url: siteURL[0] + "/_api/web/lists/getByTitle('"+ListName+"')/fields/getbytitle("+Title+")",
            method: "POST",
            data: JSON.stringify({
                '__metadata': {
                    // Type that you are modifying.
                   'type': 'SP.FieldUser','addToDefaultView':'true'                    
                },
                'Description': 'Updated Description of the field',
                'FieldTypeKind':20,
	            'Title':Title,                 
	            'AllowMultipleValues':true
            }),           
           headers:
               {
                   // IF-MATCH header: Provides a way to verify that the object being changed has not been changed since it was last retrieved.
                   // "IF-MATCH":"*", will overwrite any modification in the object, since it was last retrieved.
                   "IF-MATCH": "*",
                   "X-HTTP-Method": "PATCH",
                   // Accept header: Specifies the format for response data from the server.
                   "Accept": "application/json;odata=verbose",
                   //Content-Type header: Specifies the format of the data that the client is sending to the server
                   "Content-Type": "application/json;odata=verbose",
                   // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
                   "X-RequestDigest": $("#__REQUESTDIGEST").val()
               },
            success: function (data, status, xhr) {
                console.log("Updated " +Title);
            },
            error: function (xhr, status, error) {
                console.log("Failed");
            }
        });
}
