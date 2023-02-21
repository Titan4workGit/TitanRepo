var IsdeptAdmin=false;
var IsProjectAdmin=false;
var Location = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
var today = new Date();
var CurrentDate=today.toISOString().substring(0, 10);
var filterArr=[];
var txtCompanyId=Logged_CompanyId;
var sorterTableMyProjectList;
var currentDlg='';
var clientContext='';
var PrjectgridInitiated=false;
var member=false;



$(document).ready(function(){
 var Query='?$expand=ProgramID,Department_ID,ClientID,ManagerName,Office_Location_Id&$select=*,ProgramID/Title,ProgramID/Id,ManagerName/Title,ManagerName/EMail,ManagerName/Id,ClientID/Title,ClientID/Id,Department_ID/Title,Department_ID/Id,Office_Location_Id/Id,Office_Location_Id/Title&$top=5000'
debugger
	getItemsWithQueryItem(Query);
	nextItem();	
	getProjectRights();
	bindEvent();
    getProjectByGroup(projectListItemArr);
	getRight(IsProjectAdmin);	
	initializePeoplePicker("managerPicker");
    SP.SOD.executeOrDelayUntilScriptLoaded(getCurrentURL_GetProjectGridEvent,"sp.js");   
    getCustomer();
    getPrograms();
    getLocation();
    ChangeLabels();
    filter();
    
    $( "#CreateProject" ).click(function() {	  
	    var url = _spPageContextInfo.webServerRelativeUrl;
		var participatePage= url+"/Pages/ProjectDetails.aspx?WebAppId="+Logged_CompanyId;
		location.href=participatePage;
	 
	});
    
    $('#RecentProject').click(function (){
        projectListItemArr.sort(function(a, b) {
	      var keyA = new Date(a.Modified),
		  keyB = new Date(b.Modified);
				  // Compare the 2 dates
		  if (keyB < keyA) return -1;
	      if (keyB > keyA) return 1;
		    return 0;
		});

     BindProjectGrid();
    });
	
	
});

var projectListItemArr=[];
function getItemsWithQueryItem(Query) {
  var ListName ='ProjectDetails';
    DeferredObj = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query,
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
              beforeSend: function() {
                $("#overlaysearch").fadeIn();   
            },

        success: function (data) {
             var response=data.d.results;
              response.sort(function(a, b) {
	           var keyA = new Date(a.Modified),
		       keyB = new Date(b.Modified);
				  // Compare the 2 dates
		       if (keyB < keyA) return -1;
	           if (keyB > keyA) return 1;
		       return 0;
		      });
             
             //console.log(response);
             for(var i=0; i<response.length;i++){
                var ProjectName = response[i].ProjectName;
                var ProjectCode = response[i].ProjectCode;
                if(ProjectCode ==null || ProjectCode =='' || ProjectCode ==undefined)
				{
					ProjectCode ="";
				}
                
                
                var ProjectDescription = response[i].ProjectDescription;
                if(ProjectDescription ==null){
                   ProjectDescription ='';
                }
             
             	var ClientName = response[i].ClientID.Title;
                if(ClientName==null || ClientName=='' || ClientName==undefined)
				{
					ClientName="";
				}
				
				var Program=response[i].ProgramID.Title	
				if(Program==null || Program=='' || Program==undefined)
				{
					Program="";
				}

				
                // var OfficeLocation= response[i].OfficeLocation;
                var OfficeLocation= response[i].Office_Location_Id.Title;
                var OfficeLocationId= response[i].Office_Location_Id.Id;

                
                 if(OfficeLocation==null || OfficeLocation=='' || OfficeLocation==undefined|| OfficeLocation=="-Select-")
				{
					OfficeLocation="";
				}
                 			
                var PartnerName = response[i].PartnerName;
                var ActualStartDate = response[i].ActualStartDate;//new Date(response[i].ActualStartDate'));
                if (ActualStartDate != '' && ActualStartDate != null) {
                    ActualStartDate = new Date(ActualStartDate);
                    ActualStartDate = $.datepicker.formatDate('dd-M-yy', ActualStartDate);
                }
                else {
                    ActualStartDate = "";
                }
                //ActualStartDate= $.datepicker.formatDate('dd-mm-yy', ActualStartDate);

                var ActualEndDate = response[i].ActualEndDate;
                if (ActualEndDate != '' && ActualEndDate != null) {
                    ActualEndDate = new Date(ActualEndDate);
                    ActualEndDate = $.datepicker.formatDate('dd-M-yy', ActualEndDate);
                }
                else {
                    ActualEndDate = "";
                }
                
                

                var PlanedStartDate = new Date(response[i].PlanedStartDate);
                PlanedStartDate = $.datepicker.formatDate('dd-M-yy', PlanedStartDate);
                //PlanedStartDate = PlanedStartDate.getDay() +"/"+(PlanedStartDate.getMonth()+1 )+"/"+ PlanedStartDate.getFullYear();

                var PlanedEndDate = new Date(response[i].PlanedEndDate);
                //alert(response[i].PlanedEndDate)                
                PlanedEndDate = $.datepicker.formatDate('dd-M-yy', PlanedEndDate);
                //PlanedEndDate = PlanedEndDate.getDay() +"/"+(PlanedEndDate.getMonth()+1 )+"/"+ PlanedEndDate.getFullYear();

                var ManagerDetails = response[i].ManagerName;
                
                var ManagerName =response[i].ManagerName.Title// ManagerDetails.get_lookupValue();
                
                var ManagerId =response[i].ManagerName.Id;// ManagerDetails.get_lookupId();
                var TechnologyUsed = response[i].TechnologyUsed;
                var Status = response[i].Status;
               var Percentage= response[i].CompletionPercentage;
               var TechnologyUsed=response[i].TechnologyUsed;
               if(TechnologyUsed==null)TechnologyUsed='';
               var DepartmentName = response[i].Department_ID.Title;
               var ProjectCode=response[i].ProjectCode;
               if(ProjectCode==null){               
                ProjectCode='';
               }

                
                 if(DepartmentName ==null || DepartmentName =='' || DepartmentName ==undefined|| DepartmentName =="-Select-")
				{
					DepartmentName ="";
				}        
                
                var ItemID = response[i].ID;
                var ManagerEMail =response[i].ManagerName.EMail;         
                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(ManagerEMail)//"https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/QuestionAnswer/images/user_pic.jpg";
                var Department_ID=response[i].Department_ID.Id;
                var ProgramID=response[i].ProgramID.Id;
                var Modified=response[i].Modified;
                if(ProgramID==null){               
                   ProgramID='';
                  }

                var ClientID=response[i].ClientID.Id;
                var CompanyId =response[i].CompanyId;
			projectListItemArr.push({
			
			  ProjectName :ProjectName,
			  PlanedEndDate1:response[i].PlanedEndDate,
			  ProjectCode  :ProjectCode,
			  Modified:Modified,
			  ProjectDescription :ProjectDescription ,
			  ClientName:ClientName,
			  ProgramName:Program,
			  TechnologyUsed:TechnologyUsed,
			  OfficeLocation:OfficeLocation,
			  ActualStartDate:ActualStartDate,
			  ActualEndDate :ActualEndDate ,
			  ActualEndDate1 :response[i].ActualEndDate,
			  PlanedStartDate :PlanedStartDate ,
			  PlanedEndDate :PlanedEndDate ,			  
			  ManagerName :ManagerName ,
			  ManagerId :ManagerId ,
			  OfficeLocationId:OfficeLocationId,
			  Status :Status ,
			  Percentage:Percentage,
			  DepartmentName :DepartmentName ,
			  ProjectCode:ProjectCode,
			  ItemID :ItemID ,
			  ManagerEMail :ManagerEMail ,
			  employeePicURL :employeePicURL ,
			  Department_ID:Department_ID,
			  ProgramID:ProgramID,
			  ClientID:ClientID,
			  CompanyId:CompanyId     
			}) 
        
        
                        
         }  
            
            NextURL = data.d.__next;
            //console.log(projectListItemArr);
            DeferredObj.resolve(data.d);
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};


function nextItem(){
  
  if(NextURL!=null){
    var Query = "?" + NextURL.split('?')[1];
	        if (Query.includes('5000') == true) {
	            //Query = Query.replace("5000", "5000");
	        }
    getItemsWithQueryItem(Query)
  }
  
  

}




function getProjectRights()
{
	var deffered= $.Deferred();

	var result;
	var listName='ProcessApprovers';
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*&$filter=CompanyId eq '" + Logged_CompanyId+ "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and WebPartName eq 'Project Admin'";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
            var items = data.d.results;
            if (items.length>0)
            {
                $("#CreateProject").show();
                $("#btnViewProgram").show();
                $("#btnCreateProgram").show();
                deffered.resolve(true);
                $("#hdnIsProjectAdmin").val(true);
                IsProjectAdmin=true;
            }
			else
			{
			      IsDepartmentAdmin();
			    
			    if(IsdeptAdmin==true){
			     
			     $("#btnViewProgram").show();
			     $("#btnCreateProgram").hide();
			     $("#CreateProject").show();

			    }
			    else{
			       member=true;
			       $("#btnCreateProgram").hide();
			        
			    }
				
				$("#hdnIsProjectAdmin").val(false);
				//$("#CreateProject").hide();
				deffered.resolve(false);
				IsProjectAdmin=false;
			}

        }, eror: function (data)
        {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
    return deffered.promise();
}


function IsDepartmentAdmin()
{
var departmentID = Logged_DepartmentId;
var listName='ProcessApprovers';
   var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=CompanyId eq '" + Logged_CompanyId+ "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and Department/ID eq '"+departmentID+"' and (WebPartName eq 'Project')";
    $.ajax({
        url: siteURL,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
         async: false,
        success: function (data) {
          var items = data.d.results;
          if(items.length>0)
          {
          IsdeptAdmin=true;
          $("#CreateProject").show();       
          }
          else
          {
             IsdeptAdmin=false;
             $("#CreateProject").hide();
          }
         
        
        },
          error: function (data) {
            console.log(data.responseJSON);

        }
        
    });

 return IsdeptAdmin;
}

var liveCheck=true;
function BindProjectGrid() {
  var departmentID = Logged_DepartmentId;
  var excelHtml='';
  var itemsCount =0;
   debugger;
            var response = projectListItemArr;
            var projectHTML='';
            if(liveCheck==true){ 
	            projectListItemArr=projectListItemArr.filter(function(items) {
					  return items.Status=='Live';
				});
			}		
           if(projectListItemArr.length>0){
            for(var i=0;i<projectListItemArr.length;i++)
            {             
              itemsCount ++;
                var Status=projectListItemArr[i].Status;
                projectHTML+='<tr><td>';
				projectHTML+="<a href='" + Location + "/Pages/ViewProjectDetails.aspx?WebAppId=" + Logged_CompanyId+ "&ProjectID=" + projectListItemArr[i].ItemID + "&ProjectName=" + projectListItemArr[i].ProjectName + "' class='font-16 ellipsis-2'>" + projectListItemArr[i].ProjectName + "</a>"
				projectHTML+='<div class="d-flex mt5">'
				projectHTML+='<label class="lable-view-name" data-localize="Reference">Reference:</label>'
				projectHTML+='<div>'+projectListItemArr[i].ProjectCode+'</div>'
				projectHTML+='</div>'
				projectHTML+='<div class="d-flex mt5">'
				projectHTML+='<label class="lable-view-name" data-localize="Program">Program:</label>'
				projectHTML+='<div class="ref">'+projectListItemArr[i].ProgramName+'</div>'
				projectHTML+='</div>'
				
				//projectHTML+='<p class="member-deg text-ellipsis mb0 mt5"><span>'+DepartmentName +'</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>'+OfficeLocation+'</span></p>'
				projectHTML+='</td>'
				projectHTML+='<td>'
				projectHTML+='<div class="ellipsis-2">'+projectListItemArr[i].ClientName +'</div>'
			    //projectHTML+='<p class="member-deg text-ellipsis mb0 mt5"><span>'+DepartmentName +'</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>'+OfficeLocation+'</span></p>'
                
                projectHTML+='<div class="d-flex mt5">'
				projectHTML+='<label class="lable-view-name">Dept:</label>'
				projectHTML+='<div>'+projectListItemArr[i].DepartmentName +'</div>'
				projectHTML+='</div>'
				projectHTML+='<div class="d-flex mt5">'
				projectHTML+='<label class="lable-view-name">Office:</label>'
				projectHTML+='<div>'+projectListItemArr[i].OfficeLocation+'</div>'
				projectHTML+='</div>'

				
				projectHTML+='</td>'
				projectHTML+='<td>'
				projectHTML+='<div class="project-manager-card">'
				projectHTML+='<div class="project-manager-card-head">'
				projectHTML+='<img src="'+projectListItemArr[i].employeePicURL+'" alt="user">'
				projectHTML+='</div>'
				projectHTML+='<div class="project-manager-card-body">'
				projectHTML+='<div class="project-manager-card-body-info text-ellipsis">'
				projectHTML+='<h3 class="member-name text-ellipsis">'+projectListItemArr[i].ManagerName+'</h3>'
				projectHTML+='<p class="member-email text-ellipsis">'+projectListItemArr[i].ManagerEMail +'</p>'
				projectHTML+='</div>'
				projectHTML+='</div>'
				projectHTML+='</div>'
				projectHTML+='</td>'
				projectHTML+='<td class="text-center">'
				var PlanedEnd=new Date(projectListItemArr[i].PlanedEndDate1.substring(0,10));
				var today = new Date();
				today.setDate(today.getDate()-1);
				PlanedEnd=PlanedEnd.format('yyyy/MM/dd')
				var Currdate=new Date(today)
				Currdate=Currdate.format('yyyy/MM/dd')
				if(Status=='Live'){
					projectHTML+='<p class="m-0 mb-10 color-blue">Live</p>'					
					if(projectListItemArr[i].Percentage>=100){
					  projectHTML+='<p class="m-0 font-12">Due :<span>'+projectListItemArr[i].PlanedEndDate+'</span></p>'
					  projectHTML+='<div class="progress custom-progress progress-info m-0 mt-4">'
					  projectHTML+='<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+projectListItemArr[i].Percentage+'%">'			
					}
					else {					
						if(projectListItemArr[i].Percentage<100 && PlanedEnd>= Currdate){
						  projectHTML+='<p class="m-0 font-12">Due :<span>'+projectListItemArr[i].PlanedEndDate+'</span></p>'
					      projectHTML+='<div class="progress custom-progress progress-info m-0 mt-4">'
						  projectHTML+='<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+projectListItemArr[i].Percentage+'%">'			
						}
						else{
						  projectHTML+='<p class="m-0 font-12" style="color:#ff0000 !important">Due :<span>'+projectListItemArr[i].PlanedEndDate+'</span></p>'
					      projectHTML+='<div class="progress custom-progress progress-info m-0 mt-4">'
						  projectHTML+='<div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+projectListItemArr[i].Percentage+'%; background:#ff0000 !important">'			
						}
					}
				}

				if(Status=='Terminated'){
					projectHTML+='<p class="m-0 mb-10" style="color:#ff0000">Terminated</p>'
					projectHTML+='<p class="m-0 font-12">Due:<span>'+projectListItemArr[i].PlanedEndDate+'</span></p>'
					projectHTML+='<div class="progress custom-progress progress-danger m-0 mt-4">'
					projectHTML+='<div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+projectListItemArr[i].Percentage+'%; background:#ff0000 !important">'					
				}
				if(Status=='Completed'){
				  if(projectListItemArr[i].ActualEndDate1>projectListItemArr[i].PlanedEndDate1){
					 projectHTML+='<p class="m-0 mb-10 color-green">Completed<span style="color:#ff0000 !important">(Late)</span></p>'
					}
					else{
					    projectHTML+='<p class="m-0 mb-10 color-green">Completed</p>'
					  }  
					projectHTML+='<p class="m-0 font-12">Date:<span>'+projectListItemArr[i].ActualEndDate+'</span></p>'
					projectHTML+='<div class="progress custom-progress progress-success m-0 mt-4">'
					projectHTML+='<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+projectListItemArr[i].Percentage+'%">'					
				}
				if(Status=='OnHold'){
					projectHTML+='<p class="m-0 mb-10" style="color:#000000ab" >On Hold</p>'
					projectHTML+='<p class="m-0 font-12">Due:<span>'+projectListItemArr[i].PlanedEndDate+'</span></p>'
					projectHTML+='<div class="progress custom-progress progress-warning m-0 mt-4">'
					projectHTML+='<div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:70%; background:#000000ab">'					
				}				
				
				projectHTML+='</div>'
				projectHTML+='</div>'
				projectHTML+='</td>'
				projectHTML+='<td>'
				projectHTML+='<div class="project-edit-lock-btn-box">'
				//projectHTML+='<a type="button" href="" class="custom-edit-btn"><i class="fa fa-pencil"></i></a>';
				if(member==false){
				 projectHTML+="<a class='custom-edit-btn' href='" + Location + "/Pages/EditProjectDetails.aspx?WebAppId=" + Logged_CompanyId+ "&ProjectID=" + projectListItemArr[i].ItemID + "&ProjectName=" + projectListItemArr[i].ProjectName + "'><i class='fa fa-pencil'></i></a>";								
				}
				projectHTML+='</div></td></tr>';
                
                excelHtml+='<tr><td>'+projectListItemArr[i].ProjectName +'</td><td>'+projectListItemArr[i].TechnologyUsed+'</td><td>'+projectListItemArr[i].ProjectCode +'</td><td>'+projectListItemArr[i].ProgramName+'</td><td>'+projectListItemArr[i].ClientName +'</td><td>'+projectListItemArr[i].DepartmentName +'</td><td>'+projectListItemArr[i].OfficeLocation+'</td><td>'+projectListItemArr[i].ManagerName+'</td><td>'+projectListItemArr[i].Status +'</td><td>'+projectListItemArr[i].Percentage+'%</td></tr>'
                
           }
           }
           else{
            
            excelHtml+='<td style="text-align:center">NorecordFound</td>'
           
           }
           $("#tableTempProjects>tbody").html("");
            $("#exceltable>tbody").html("");
            $('#mydmsNorecordFound').hide();           
            $("#tableTempProjects>tbody").append(projectHTML);
            $("#exceltable>tbody").append(excelHtml);
            $('#totalIcaon').text(itemsCount);
            projectListItemArr=response;
            liveCheck=false;

            
            //var itemsCount = projectListItemArr.length;
            if (projectListItemArr.length> 0)
            {
                GenerateTableMyProjectList();
                $('.myListPagingValue').prop('selectedIndex', 1);
            }
           else {
             $('#mydmsNorecordFound').show();
             $("#tablefooterMyProject").hide();
           }
            
}

function bindEvent(){
	
	 //var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$expand=ProgramID,ManagerName,Department_ID,Office_Location_Id,ProgramID,ClientID&$&$orderby=ID desc&$select=*,ProgramID/Title,ManagerName/Title,ManagerName/EMail,ManagerName/Id,ProgramID/Title,ClientID/Title,ClientID/Id,Department_ID/Title,Office_Location_Id/Title&$filter=CompanyId eq '" + Logged_CompanyId+ "' and Status eq 'Live'&$top=500&$orderby=Modified";
          
     if(IsProjectAdmin==true){       
        projectListItemArr= projectListItemArr.filter(function(item) {
			  return item.CompanyId==Logged_CompanyId;
		});
	   BindProjectGrid();
	 }
	
	else
	{
	   if(IsdeptAdmin==true)
	   {
	      filterArr=projectListItemArr;	      
	      getProjectTeamDetails();
	      
	      projectListItemArr= projectListItemArr.filter(function(item) {	          
			  return (item.Department_ID==Logged_DepartmentId)
		});
		newArr=[];
		for(var i=0;i<projectID.length; i++){
		 newArr=filterArr.filter(function(item) {	           
			  return (item.Department_ID!=Logged_DepartmentId && item.ItemID==projectID[i].projectId)
			  });
			 projectListItemArr=projectListItemArr.concat(newArr);
	  }
			     	
	     BindProjectGrid();
	   }
	  else
	  {
	     newArr=[];	
	     getProjectTeamDetails();     	     
		for(var i=0;i<projectID.length; i++){
		 newArr=projectListItemArr.filter(function(item) {	          
			  return (item.ItemID==projectID[i].projectId)
			  });
			 filterArr=filterArr.concat(newArr);
	  }

	     projectListItemArr=filterArr;
	     BindProjectGrid();
	  }
	
	
	}
     
	
$("#ProjectExport").click(function () {
        var dlgTitle = 'Generating excelsheet...';
        var dlgMsg = '<br />Please wait!!';
        var dlgHeight = 200;
        var dlgWidth = 400;
        currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);
        setTimeout(function () {
            generateProjectExcel();
        }, 100);
    });	

}


function GenerateTableMyProjectList()
{
    sorterTableMyProjectList = new TINY.table.sorter('sorterTableMyProjectList', 'tableTempProjects', {
        headclass: 'head',
        ascclass: 'nosort',
        descclass: 'nosort',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
       // colddid: 'columnsMyProject',
        currentid: 'currentpageMyProject',
        totalid: 'totalpagesMyProject',
        startingrecid: 'startrecordMyProject',
        endingrecid: 'endrecordMyProject',
        totalrecid: 'totalrecordsMyProject',
        hoverid: 'selectedrowMyProject',
        pageddid: 'pagedropdownMyProject',
        navid: 'tablenavMyProject',
        //sortcolumn: 0,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: false,
        init: true
    });
}

var projectID=[];
function getProjectTeamDetails(){
  var requestURI=_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('ProjectTeamDetails')/items?$Select=*,ProjectId&$filter=Status eq 'Active' and TeamMember/ID eq "+_spPageContextInfo.userId+" and CompanyId eq '" + Logged_CompanyId+ "'&$top=5000";

            $.ajax({
                url:requestURI,
                type:"GET",
                async:false,
                headers: { Accept: "application/json;odata=verbose" },
                success:function(data)
                {
                    var response=data.d.results;
                    if(response.length!=0)
                    {
                       for(var i=0;i<response.length;i++){
                          projectID.push({
                           projectId:response[i].ProjectId
                          })
                       }                          
                    }
                    //console.log(projectID); 
                    
                 }
             });        

    
}



function generateProjectExcel() {
    $('#exceltable').tableExport({
        //type: 'excel',
        type: 'csv',
        exportHiddenCells: true,
        fileName: "AllProject",
        //ignoreColumn: [4],
    });
    currentDlg.close();
}
    


function getLocation() {
	var URL,ListName='OfficeLocation';
	$('#ddlLocation').append($('<option/>').val('All').text('All'));
	   
	URL=_spPageContextInfo.webAbsoluteUrl +"/_api/web/Lists/getbytitle('OfficeLocation')/Items?$filter=CompanyID eq '"+Logged_CompanyId+"'";
	$.ajax({
		url:URL,
		headers:{ Accept:'application/json;odata=verbose'},
		async:false,
		success:function (data) {
			var items=data.d.results;
			for(var i=0;i<items.length;i++)
			{
				$('#ddlLocation').append($('<option/>').val(items[i].Id).text(items[i].Title));
                                				
			}
		},
		error : function (data) {
			console.log(data);
			
		}
	})
}

function getCustomer() {
	var URL,ListName='ClientMaster';
	$('#ddlCustomer').append($('<option/>').val('All').text('All'));
	   
	URL=_spPageContextInfo.webAbsoluteUrl +"/_api/web/Lists/getbytitle('ClientMaster')/Items?&$top=500&$filter=IsActive eq '1'";
	$.ajax({
		url:URL,
		headers:{ Accept:'application/json;odata=verbose'},
		async:false,
		success:function (data) {
			var items=data.d.results;
			for(var i=0;i<items.length;i++)
			{
				$('#ddlCustomer').append($('<option/>').val(items[i].Id).text(items[i].Title));
                                				
			}
		},
		error : function (data) {
			console.log(data);
			
		}
	})
}

function getPrograms() {
	var URL,ListName='ProgramList';
	$('#ddlProgram').append($('<option/>').val('All').text('All'));
	  debugger;
	URL=_spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getbytitle('ProgramList')/items?$select=*";
	$.ajax({
		url:URL,
		headers:{ Accept:'application/json;odata=verbose'},
		async:false,
		success:function (data) {
			var items=data.d.results;
			for(var i=0;i<items.length;i++)
			{
				$('#ddlProgram').append($('<option/>').val(items[i].Id).text(items[i].Title));
                                				
			}
		},
		error : function (data) {
			console.log(data);
			
		}
	})
}






function clearSelection() {
    $("#ddlCustomer").val('All');
		$("#txtFilterDepartment").val('All');		
    $("#ddlProgram").val('All');
    $("#ddlLocation").val('All');
    clearPeoplePickerControl("managerPicker");
		projectListItemArr=filterArr;
		BindProjectGrid();

}


function clearPeoplePickerControl(pickerId) {
    var toSpanKey = pickerId + "_TopSpan";
    var peoplePicker = null;

    // Get the people picker object from the page.
    var ClientPickerDict = this.SPClientPeoplePicker.SPClientPeoplePickerDict;
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


function getCurrentURL_GetProjectGridEvent()
{

	// Bind Departments Dropdown
	$.when(BindDepartments()).done(function()
	{

	  
	
	});

}


function BindDepartments()
{
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
	var clientContext= new SP.ClientContext();
	var oList = clientContext.get_web().get_lists().getByTitle('Departments');
    var camlQuery = new SP.CamlQuery();
	var camlXML = "<View><Query><Where><Eq><FieldRef Name='CompanyID' /><Value Type='Lookup'>"+txtCompanyId+"</Value></Eq></Where><OrderBy><FieldRef Name='Title'/></OrderBy></Query></View>";
	camlQuery.set_viewXml(camlXML);
	var collListItem = oList.getItems(camlQuery);
	clientContext.load(collListItem);
	clientContext.executeQueryAsync(function(){
		var listItemEnumerator = collListItem.getEnumerator();
		
		var departmentHTML ='<option value="All">All</option>';
		while (listItemEnumerator.moveNext())
		{
			var oListItem = listItemEnumerator.get_current();
			var departmentID=oListItem.get_item('ID');
			var departmentTitle=oListItem.get_item('Title');
			//departmentHTML +='<option value="'+departmentTitle+'">'+departmentTitle+'</option>';
			departmentHTML +='<option value="'+departmentID+'">'+departmentTitle+'</option>';
			
		}
		$("#txtFilterDepartment").append(departmentHTML);
		 		
		
	},

	function(){
		console.log('error : Project Details web part');
	});
}


function initializePeoplePicker(peoplePickerElementId) {
    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = false;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '245px';
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

function getUserInformation(PeoplepickerId) {
    var userIds = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if (!peoplePicker.IsEmpty()) {
        if (peoplePicker.HasInputError) return false; // if any error  
        else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users  
        else if (peoplePicker.TotalUserCount > 0) {
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            var promise = '';
            var UsersID = '';
            for (var i = 0; i < users.length; i++) {
                //var accountName = users[i].Key.split('|')[2];
								var accountName=users[i].EntityData.Email;
                DisplayText=users[i].DisplayText;
                var userId = accountName;//GetUserID(accountName);
                if (userId != -1) {
                    userIds.push(userId);
                }
            }
            return userIds;
        }
    }
    else {
        return UsersID;
    }
}

function filter(){
filterArr=projectListItemArr;
$('#btnApply').click(function(){
      var filter='';
      projectListItemArr=filterArr;
	     var Manager='';
      if ($("#managerPicker_TopSpan_ResolvedList").text() != "") {
                 Manager= getUserInformation('managerPicker');                
                if(Manager.length > 1){
                  alert('Please enter only one Manager');                  
                  return false;
                }        
       }
       var ddldepartment= $('#txtFilterDepartment').val();
       var ddlLocation= $('#ddlLocation').val();              
       var ddlCustomer= $('#ddlCustomer').val();              
       var ddlProgram= $('#ddlProgram').val();      
       
       projectListItemArr= projectListItemArr.filter(function (e) {         
	       var status= $('#txtFilterStatus').val();		  
					    
	       return  (ddldepartment== "All" ? e.Department_ID != "null" : e.Department_ID == parseInt(ddldepartment))&&
	       (ddlCustomer== "All" ? e.ClientID != "null" : e.ClientID == parseInt(ddlCustomer)) &&
	       (ddlLocation== "All" ? e.OfficeLocationId!= "null" : e.OfficeLocationId== parseInt(ddlLocation)) &&
	       (ddlProgram== "All" ? e.ProgramID!= "null" : e.ProgramID== parseInt(ddlProgram)) &&
	       (Manager== "" ? e.ManagerEMail!= "" : e.ManagerEMail==Manager) &&
	       (status== "" ? e.Status!= "null" : e.Status== status)
	       
	       	    
	    });

       BindProjectGrid();
      
    });

}
var sortProject=false
var sortClient=false;
var sortManager=false;
function sortProjectName(){
  if(sortProject==false){
     projectListItemArr.sort(function(a, b) {
				  var keyA =a.ProjectName.toLowerCase(),
				    keyB =b.ProjectName.toLowerCase();
				  // Compare the 2 dates
				  if (keyA < keyB) return -1;
				  if (keyA > keyB) return 1;
				  return 0;
				});
				sortProject=true;
	}
	else{
	    projectListItemArr.sort(function(a, b) {
	    var keyA =a.ProjectName.toLowerCase(),
	    keyB =b.ProjectName.toLowerCase();
				  // Compare the 2 dates
	    if (keyB < keyA) return -1;
	    if (keyB > keyA) return 1;
		return 0;
	   });
	   sortProject=false;
    }	
				
		BindProjectGrid();		

}

function sortClientName(){
  if(sortClient==false){
     projectListItemArr.sort(function(a, b) {
				  var keyA =a.ClientName.toLowerCase(),
				    keyB =b.ClientName.toLowerCase();
				  // Compare the 2 dates
				  if (keyA < keyB) return -1;
				  if (keyA > keyB) return 1;
				  return 0;
				});
				sortClient=true;
	}
	else{
	    projectListItemArr.sort(function(a, b) {
	    var keyA =a.ClientName.toLowerCase(),
	    keyB =b.ClientName.toLowerCase();
				  // Compare the 2 dates
	    if (keyB < keyA) return -1;
	    if (keyB > keyA) return 1;
		return 0;
	   });
	   sortClient=false;
    }	
				
		BindProjectGrid();		

}

function sortManagerName(){
  if(sortManager==false){
     projectListItemArr.sort(function(a, b) {
				  var keyA =a.ManagerName.toLowerCase(),
				    keyB =b.ManagerName.toLowerCase();
				  // Compare the 2 dates
				  if (keyA < keyB) return -1;
				  if (keyA > keyB) return 1;
				  return 0;
				});
				sortManager=true;
	}
	else{
	    projectListItemArr.sort(function(a, b) {
	    var keyA =a.ManagerName.toLowerCase(),
	    keyB =b.ManagerName.toLowerCase();
				  // Compare the 2 dates
	    if (keyB < keyA) return -1;
	    if (keyB > keyA) return 1;
		return 0;
	   });
	   sortManager=false;
    }	
				
		BindProjectGrid();		

}

/***********************Lable setting code**************************************************************/

//change label as per the 'LabelSettings' list

var LabelDefaultLangauge = [];
var labels = [];
function ChangeLabels() {
	var preferredLanguage = 'DefaultLanguage';
    if (LabelDefaultLangauge.length == 0) {
        var RestQuery = "?$select=Title,Key,DefaultLanguage&$top=5000&$filter=Title eq 'Project' ";
        $.when(CommonFunction.getItemsWithQueryItem("LabelsSettings", RestQuery)).done(function (LabelsSettings) {
            try {
                //alert("test");
                LabelDefaultLangauge = LabelsSettings.results;
                SetDMSText(LabelsSettings.results, preferredLanguage);

            } catch (e) {
                alert("Recommended to clear the browsing data and cookies for smooth and fast browsing. Please press Ctrl + H to clear cookies.");
            }

        });
    }
    else {
        SetDMSText(LabelDefaultLangauge, preferredLanguage);
    }
}

function SetDMSText(results, preferredLanguage) {
    labels = [];
    $.each(results, function (i, value) {
        var actualText = value['Key'];
        var convertedText = value[preferredLanguage];
        if (convertedText == null || convertedText == "" || convertedText == undefined)
            convertedText = value['DefaultLanguage'];

        var label = {
            labelText_Actual: actualText,
            lableText_Converted: convertedText
        };
        labels.push(label);
    });

    DetectBrowser(); // First Detect Browser then Change All Headings as per selected language.
}

function DetectBrowser() {
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    if (isSafari || isIE) {
        ChangeWebPartsHeadings_OldBrowser();
    } else {
        ChangeWebPartsHeadings();
    }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////// For Latest Browser //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function ChangeWebPartsHeadings() {
    try {
        $("[data-localize]").each(function (i, el) {
            try {
                var controlLabelText = $(this).attr('data-localize');
                var convertedText = labels.find(function (e) {
                    return e.labelText_Actual.trim() === controlLabelText;
                }).lableText_Converted;

                if ($(this).find('a').length > 0) {
                    $(this).find('a').html(convertedText);
                } else if ($(this).find('b').length > 0) {
                    $(this).find('b').html(convertedText);
                } else if ($(this).find('p').length > 0) {
                    $(this).find('p').html(convertedText);
                } else if ($(this).hasClass("button")) {
                    $(this).attr('value', convertedText);
                } else {
                    $(this).html(convertedText);
                }
            } catch (ex) {
                console.log("Multilingual : " + controlLabelText + " key not found.");
                $(this).attr("value", $(this).val());
            }
        });
    } catch (error) {
        console.log("Multilingual : " + error);
    }
}

//////////////////////////////////////////////////////////////////////
////////////////// IE Browser and Windows Safar 5.1.7 ////////////////
//////////////////////////////////////////////////////////////////////
function ChangeWebPartsHeadings_OldBrowser() {
    try {
        $("[data-localize]").each(function (i, el) {
            try {
                var controlLabelText = $(this).attr('data-localize');
                var convertedText = findObjectByKey(labels, controlLabelText, controlLabelText);

                if ($(this).find('a').length > 0) {
                    $(this).find('a').html(convertedText);
                }
                else if ($(this).find('b').length > 0) {
                    $(this).find('b').html(convertedText);
                }
                else if ($(this).find('p').length > 0) {
                    $(this).find('p').html(convertedText);
                }
                else if ($(this).hasClass("button")) {
                    if (convertedText != null && convertedText != "null" && convertedText != "") {
                        $(this).attr('value', convertedText);
                    }
                    else {
                        $(this).attr("value", $(this).val());
                    }
                } else {
                    if (convertedText != null && convertedText != "null" && convertedText != "") { 
                        $(this).html(convertedText);
                    }
                    else {
                        $(this).html($(this).text());
                    }
                }
            } catch (ex) {
                console.log("Multilingual : " + controlLabelText + " key not found.");
                $(this).attr("value", $(this).val());
            }
        });
    } catch (error) {
        console.log("Multilingual : " + error);
    }
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].labelText_Actual == value) {
            //alert(array[i].labelText_Actual);

            return array[i].lableText_Converted;
        }
    }
    return null;
}
        