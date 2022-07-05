
var clientContext='';
var PrjectgridInitiated=false;
var IsProjectAdmin = false;
var sorterTableMyProjectList;
 var IsdeptAdmin=false;

var txtCompanyId ='';
$(document).ready(function () {
userActivityNotificationEntry(_spPageContextInfo.userId,window.location);
txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");

	SP.SOD.executeOrDelayUntilScriptLoaded(getCurrentURL_GetProjectGridEvent,"sp.js");

	$("#CreateProject").hide();
	$( "#CreateProject" ).click(function() {
		var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
		var url = _spPageContextInfo.webServerRelativeUrl;
		var participatePage= url+"/Pages/ProjectDetails.aspx?WebAppId="+txtCompanyId;
		location.href=participatePage;
	});
	
	bindAllClient();
	bindAllOfficeLocation();
	initializePeoplePicker("Managerto"); 

});


function GenerateTableMyProjectList()
{
    sorterTableMyProjectList = new TINY.table.sorter('sorterTableMyProjectList', 'tableTempProjects', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
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
        //sortcolumn: 1,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
    });
}


function getCurrentURL_GetProjectGridEvent()
{

	// Bind Departments Dropdown
	$.when(BindDepartments()).done(function()
	{

	  
	
	});

}

function CheckTeamMemberForProject(projectId)
{
	var requestURI=_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('ProjectTeamDetails')/items?Select=ID,TeamMember/ID&$filter=ProjectId eq "+projectId+" and TeamMember/ID eq "+_spPageContextInfo.userId+"";
	$.ajax({
		url:requestURI,
		type:"GET",
		async:false,
		headers: { Accept: "application/json;odata=verbose" },
		success:function(data)
		{
			var results=data.d.results;

			return results.length;
		},
		error:function(data)
		{
			console.log(data);
		}
	})
}



function BindProjectGridProjectAdmin(filterStatus) {
 var Location = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;

    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$expand=ManagerName,Department_ID,Office_Location_Id,ClientID&$&$orderby=ID desc&$select=*,ManagerName/Title,ManagerName/Id,ClientID/Title,ClientID/Id,Department_ID/Title,Office_Location_Id/Title&$filter=CompanyId eq '" + txtCompanyId + "' and Status eq '" + filterStatus + "'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: true,
        success: function (data)
        {
            var response = data.d.results;
            var myData = [];
            var counter = 1;
            var tr = "";
            var itemsCount = 0;
            for(var i=0;i<response.length;i++)
            {
                itemsCount++;
                var ProjectName = response[i].ProjectName;

                var ProjectCode = response[i].ProjectCode;
                if(ProjectCode ==null || ProjectCode =='' || ProjectCode ==undefined)
				{
					ProjectCode ="";
				}
                
                
                var ProjectDescription = response[i].ProjectDescription;
             //   var ClientName = response[i].ClientName;
             	var ClientName = response[i].ClientID.Title;
                if(ClientName==null || ClientName=='' || ClientName==undefined)
				{
					ClientName="";
				}	
				
                // var OfficeLocation= response[i].OfficeLocation;
                var OfficeLocation= response[i].Office_Location_Id.Title;
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
                PlanedEndDate = $.datepicker.formatDate('dd-M-yy', PlanedEndDate);
                //PlanedEndDate = PlanedEndDate.getDay() +"/"+(PlanedEndDate.getMonth()+1 )+"/"+ PlanedEndDate.getFullYear();

                var ManagerDetails = response[i].ManagerName;
                var ManagerName =response[i].ManagerName.Title// ManagerDetails.get_lookupValue();
                var ManagerId =response[i].ManagerName.Id;// ManagerDetails.get_lookupId();
                var TechnologyUsed = response[i].TechnologyUsed;
                var Status = response[i].Status;
               // var DepartmentName = response[i].DepartmentName;
               var DepartmentName = response[i].Department_ID.Title;

                
                 if(DepartmentName ==null || DepartmentName =='' || DepartmentName ==undefined|| DepartmentName =="-Select-")
				{
					DepartmentName ="";
				}

                
                
                //var CreatedDate = response[i].Created');

                var ItemID = response[i].ID;


                var myObject = [];
                var url = "<a href='" + Location + "/Pages/ViewProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'>" + ProjectName + "</a>";
                var editUrl = '';
                //if (ManagerId == _spPageContextInfo.userId) {
                editUrl = "<a class='custom-edit-btn' href='" + Location + "/Pages/EditProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'><i class='fa fa-pencil'></i></a>";
                //}
                //else {
                //   editUrl = "N/A";
                //}
                if (Status == "Completed") {
                    Status = "<p style='color:green;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Terminated") {
                    Status = "<p style='color:red;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Live") {
                    Status = "<p style='color:blue;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "OnHold") {
                    Status = "<p style='color:orange;text-align:center;'>" + Status + "</p>";
                }
               
       // tr = tr + "<tr><td>" + ProjectCode + "</td><td>" + url + "</td><td>" + ManagerName + "</td><td>" + DepartmentName + "</td><td>" + PlanedStartDate + "</td><td>" + PlanedEndDate + "</td><td>" + Status + "</td><td>" + ClientName + "</td><td>" + ActualStartDate + "</td><td>" + ActualEndDate + "</td><td>" + editUrl + "</td></tr>";

 tr = tr + "<tr class='text-center'><td class='white-space-nowrap text-left'>" + url + "</td><td><div class='project-table-ellipsis-2'>" + ProjectCode + "</div></td><td><div class='project-table-ellipsis-2'>" + DepartmentName + "</div></td><td><div class='project-table-ellipsis-2'>" + OfficeLocation+ "</div></td><td><div class='project-table-ellipsis-2'>" + ClientName + "</div></td><td class='text-center'><div class='project-table-ellipsis-2'>" + ManagerName + "</div></td><td>" + Status + "</td><td><div class='project-edit-lock-btn-box'>" + editUrl + "</div></td></tr>";
                counter++;

            }

            $("#tableTempProjects>tbody").html("");
            $('#mydmsNorecordFound').hide();
            if (itemsCount == 0) {
                $('#mydmsNorecordFound').show();
             $("#tablefooterMyProject").hide();
        }
        else
        {
          $("#tablefooterMyProject").show();
        }

            // dvTable.append(completebody);
            var completebody = tr;
            $("#tableTempProjects>tbody").append(completebody);
            if (itemsCount > 0)
            {
                GenerateTableMyProjectList();
                $('.myListPagingValue').prop('selectedIndex', 1);
            }



        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
}

/*
function BindProjectGridNormalUsers(PrjectgridInitiated,filterDepartment,filterStatus)
{
    if (PrjectgridInitiated == true) {
       // $('#myFirstTable').dataTable().fnDestroy();
    }

    var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
    var clientContext=new SP.ClientContext();
    var Location= window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
    var oList = clientContext.get_web().get_lists().getByTitle('ProjectDetails');
    var camlQuery = new SP.CamlQuery();
    var camlXML ='';
    if(filterDepartment != "All" && filterStatus=="All")
    {
        camlXML = "<View><Query><Where><And><Eq><FieldRef Name='CompanyId' /><Value Type='Text'>"+txtCompanyId+"</Value></Eq><Eq><FieldRef Name='DepartmentName' /><Value Type='Text'>"+filterDepartment+"</Value></Eq></And></Where><OrderBy><FieldRef Name='ID' Ascending='False' /></OrderBy></Query></View>";
    }
    else if(filterDepartment == "All" && filterStatus!="All")
    {
        camlXML = "<View><Query><Where><And><Eq><FieldRef Name='CompanyId' /><Value Type='Text'>"+txtCompanyId+"</Value></Eq><Eq><FieldRef Name='Status' /><Value Type='Text'>"+filterStatus+"</Value></Eq></And></Where><OrderBy><FieldRef Name='ID' Ascending='False' /></OrderBy></Query></View>";
    }
    else if(filterDepartment != "All" && filterStatus!="All")
    {
        camlXML = "<View><Query><Where><And><And><Eq><FieldRef Name='CompanyId' /><Value Type='Text'>"+txtCompanyId+"</Value></Eq><Eq><FieldRef Name='Status' /><Value Type='Text'>"+filterStatus+"</Value></Eq></And><Eq><FieldRef Name='DepartmentName' /><Value Type='Text'>"+filterDepartment+"</Value></Eq></And></Where><OrderBy><FieldRef Name='ID' Ascending='False' /></OrderBy></Query></View>";
    }
	else
    {
        camlXML = "<View><Query><Where><Eq><FieldRef Name='CompanyId' /><Value Type='Text'>" + txtCompanyId + "</Value></Eq></Where><OrderBy><FieldRef Name='ID' Ascending='False' /></OrderBy></Query></View>";
    }

    camlQuery.set_viewXml(camlXML);
    var collListItem = oList.getItems(camlQuery);
    clientContext.load(collListItem);
    clientContext.executeQueryAsync(function(){
        var myData=[];
        var listItemEnumerator = collListItem.getEnumerator();
        var ItemCount=collListItem.get_count();

        var counter = 1;
        var tr = "";
        var itemsCount = 0;


        while (listItemEnumerator.moveNext())
        {
            var oListItem = listItemEnumerator.get_current();

            ///////////////////////////////////
            var projectId=oListItem.get_item('ID');
            var ProjectName=oListItem.get_item('ProjectName');
           var requestURI=_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('ProjectTeamDetails')/items?$Select=ID,Status,TeamMember/ID&$expand=TeamMember&$filter=Status eq 'Active' and ProjectId eq '"+projectId+"' and TeamMember/ID eq "+_spPageContextInfo.userId+"";

            $.ajax({
                url:requestURI,
                type:"GET",
                async:false,
                headers: { Accept: "application/json;odata=verbose" },
                success:function(data)
                {
                    var results=data.d.results;

                    if(results.length!=0)
                    {
                        var ProjectCode=oListItem.get_item('ProjectCode');
                        var ProjectName=oListItem.get_item('ProjectName');
                        var ProjectDescription=oListItem.get_item('ProjectDescription');
                        var ClientName=oListItem.get_item('ClientName');
                         var OfficeLocation=oListItem.get_item('OfficeLocation');
                        var PartnerName=oListItem.get_item('PartnerName');
                        var ActualStartDate= oListItem.get_item('ActualStartDate');//new Date(oListItem.get_item('ActualStartDate'));

                        if(ActualStartDate!='' && ActualStartDate!=null)
                        {
                            ActualStartDate=new Date(ActualStartDate);
                            ActualStartDate=$.datepicker.formatDate('dd-M-yy', ActualStartDate);
                        }
                        else
                        {
                            ActualStartDate="";
                        }
                        //ActualStartDate= $.datepicker.formatDate('dd-mm-yy', ActualStartDate);

                        var ActualEndDate=oListItem.get_item('ActualEndDate');
                        if(ActualEndDate!='' && ActualEndDate!=null)
                        {
                            ActualEndDate=new Date(ActualEndDate);
                            ActualEndDate=$.datepicker.formatDate('dd-M-yy', ActualEndDate);
                        }
                        else
                        {
                            ActualEndDate="";
                        }


                        //var ActualStartDate=new Date(oListItem.get_item('ActualStartDate'));
                        //ActualStartDate= $.datepicker.formatDate('dd-mm-yy', ActualStartDate);
                        //ActualStartDate = ActualStartDate.getDay() +"/"+(ActualStartDate.getMonth()+1 )+"/"+ ActualStartDate.getFullYear();

                        //var ActualEndDate=new Date(oListItem.get_item('ActualEndDate'));
                        //ActualEndDate= $.datepicker.formatDate('dd-mm-yy', ActualEndDate);
                        //ActualEndDate = ActualEndDate.getDay() +"/"+(ActualEndDate.getMonth()+1 )+"/"+ ActualEndDate.getFullYear();

                        var PlanedStartDate=new Date(oListItem.get_item('PlanedStartDate'));
                        PlanedStartDate= $.datepicker.formatDate('dd-M-yy', PlanedStartDate);
                        //PlanedStartDate = PlanedStartDate.getDay() +"/"+(PlanedStartDate.getMonth()+1 )+"/"+ PlanedStartDate.getFullYear();

                        var PlanedEndDate=new Date(oListItem.get_item('PlanedEndDate'));
                        PlanedEndDate= $.datepicker.formatDate('dd-M-yy', PlanedEndDate);
                        //PlanedEndDate = PlanedEndDate.getDay() +"/"+(PlanedEndDate.getMonth()+1 )+"/"+ PlanedEndDate.getFullYear();

                        var ManagerDetails=oListItem.get_item('ManagerName');
                        var ManagerName=ManagerDetails.get_lookupValue();
                        var ManagerId=ManagerDetails.get_lookupId();
                        var TechnologyUsed=oListItem.get_item('TechnologyUsed');
                        var Status=oListItem.get_item('Status');
                        var DepartmentName=oListItem.get_item('DepartmentName');

                        var ItemID=oListItem.get_item('ID');
                        //var CreatedDate=oListItem.get_item('Created');

                        var myObject=[];
                        var url="<a href='"+Location+"/Pages/ViewProjectDetails.aspx?WebAppId="+txtCompanyId+"&ProjectID="+ItemID+"&ProjectName="+ProjectName+"'>"+ProjectName+"</a>";
                        if(ManagerId==_spPageContextInfo.userId)
                        {
                            editUrl="<a href='"+Location+"/Pages/EditProjectDetails.aspx?WebAppId="+txtCompanyId+"&ProjectID="+ItemID+"&ProjectName="+ProjectName+"'>Edit</a>";
                        }
                        else
                        {
                            editUrl="";
                        }

                        if(Status=="Completed")
                        {
                            Status="<p style='color:green;text-align:center'>"+Status+"</p>";
                        }
                        else if(Status=="Terminated")
                        {
                            Status="<p style='color:red;text-align:center'>"+Status+"</p>";
                        }
                        else if(Status=="Live")
                        {
                            Status="<p style='color:blue;text-align:center'>"+Status+"</p>";
                        }
                        else if(Status=="OnHold")
                        {
                            Status="<p style='color:orange;text-align:center'>"+Status+"</p>";
                        }


                       // tr = tr + "<tr><td>"+ProjectCode+"</td><td>"+url+"</td><td>"+ManagerName+"</td><td>"+DepartmentName+"</td><td>"+PlanedStartDate+"</td><td>"+PlanedEndDate+"</td><td>"+Status+"</td><td>"+ClientName+"</td><td>"+ActualStartDate+"</td><td>"+ActualEndDate+"</td><td>"+editUrl+"</td></tr>";

         tr = tr + "<tr class='text-center'><td class='white-space-nowrap text-left'>" + url + "</td><td><div class='project-table-ellipsis-2'>" + ProjectCode + "</div></td><td><div class='project-table-ellipsis-2'>" + DepartmentName + "</div></td><td><div class='project-table-ellipsis-2'>" + OfficeLocation+ "</div></td><td><div class='project-table-ellipsis-2'>" + ClientName + "</div></td><td class='text-center'><div class='project-table-ellipsis-2'>" + ManagerName + "</div></td><td>" + Status + "</td><td><div class='project-edit-lock-btn-box'>" + editUrl + "</div></td></tr>";
itemsCount++;

                  
                        counter++;

                    }
                },
                error:function(data)
                {
                    console.log("BindProjectGridNormalUsers method" + data);
                }
            });
		 }

        $("#tableTempProjects>tbody").html("");
        $('#mydmsNorecordFound').hide();
        if (itemsCount == 0) 
        {
            $('#mydmsNorecordFound').show();
            $("#tablefooterMyProject").hide();
        }
        else
        {
          $("#tablefooterMyProject").show();
        }
       // debugger;
        // dvTable.append(completebody);
        var completebody = tr;
        $("#tableTempProjects>tbody").append(completebody);
       if (itemsCount> 0)
        {
            GenerateTableMyProjectList();
            $('.myListPagingValue').prop('selectedIndex', 1);
        }
    })
 }*/



function getProjectRights()
{
	var deffered= $.Deferred();

	var result;
	var listName='ProcessApprovers';
	var txtCompanyId =  titanForWork.getQueryStringParameter("CompanyId");
    var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*&$filter=CompanyId eq '" + txtCompanyId + "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and WebPartName eq 'Project Admin'";
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data)
        {
            var items = data.d.results;
            if (items.length>0)
            {
                $("#CreateProject").show();
                deffered.resolve(true);
                $("#hdnIsProjectAdmin").val(true);
                IsProjectAdmin=true;
            }
			else
			{
				$("#hdnIsProjectAdmin").val(false);
				$("#CreateProject").hide();
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

		//departmentHTML +='</select>';
		//$("#departmentDiv").append(departmentHTML);
		
		
		 $.when(getProjectRights()).done(function(isProjectAdmin){
		var filterStatus= $('#txtFilterStatus').val();
		if(isProjectAdmin)
		{
			BindProjectGridProjectAdmin(filterStatus);
		}
		else
		{
		
		
		$.when(IsDepartmentAdmin()).done(function(IsdeptAdmin){
		    if(IsdeptAdmin)
		   {
	
			BindProjectGridDepartmentAdminOnLoad();
		   }

		else
		{
		     BindProjectGridNormalUsersOnLoad();
		   // BindProjectGridNormalUsers(PrjectgridInitiated,filterDepartment,filterStatus);
		}
		
			  });

		}
	  });
		
		
	},

	function(){
		console.log('error : Project Details web part');
	});
}






function bindAllClient()
{
 $("#Clientid").empty();

 
 
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items?$select=ID,Title&$filter=CompanyID eq '" + txtCompanyId + "'&$orderby=Title asc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response)
        {
             $('<option value="All">All</option>').appendTo("#Clientid");

            for (var index = 0; index < response.d.results.length; index++)
            {
             //   $("#Clientid").append('<option value="' + response.d.results[index].ID + '">' + response.d.results[index].Title + '</option>');
             $("#Clientid").append('<option value="' + response.d.results[index].Title + '">' + response.d.results[index].Title + '</option>');
               
            }
        }, myError: function (response) {
            waitingDialog.hide();
        }
    });
}





function bindAllOfficeLocation()
{
 $("#officeLocation").empty();

 
 
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OfficeLocation')/items?$select=ID,OfficeName,CompanyID/ID&$expand=CompanyID&$top=5000&$filter=OfficeLocationId eq '0' and CompanyID/ID eq '" + txtCompanyId + "'";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response)
        {
             $('<option value="All">All</option>').appendTo("#officeLocation");

            for (var index = 0; index < response.d.results.length; index++)
            {
                $("#officeLocation").append('<option value="' + response.d.results[index].ID + '">' + response.d.results[index].OfficeName+ '</option>');
               
            }
        }, myError: function (response) {
      
        }
    });
}



function initializePeoplePicker(peoplePickerElementId) {  
    var schema = {};  
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';  
    schema['SearchPrincipalSource'] = 15;  
    schema['ResolvePrincipalSource'] = 15;  
    schema['AllowMultipleValues'] = true;  
    schema['MaximumEntitySuggestions'] = 50;  
    schema['Width'] = '280px';  
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);  
}  







function MutipleBaseFilterOnOutBox()
{

	var restquery="";
	var ProChip="";
	 
	if($('#txtFilterDepartment').val() != "All")
	{
		//restquery += "and DepartmentName eq '"+$('#txtFilterDepartment').val()+"' ";
		restquery += "and DepartmentId eq '"+$('#txtFilterDepartment').val()+"' ";		
		ProChip +="<div class='upload-chip'>"+$('#txtFilterDepartment option:selected').text()+"</div>"; 
		
		
	}
	if($('#officeLocation').val() != "All")
	{
		restquery += "and OfficeLocationID eq '"+$('#officeLocation').val()+"' ";
		ProChip +="<div class='upload-chip'>"+$('#officeLocation option:selected').text()+"</div>"; 
		
		
	}
	
	if($('#Clientid').val() != "All" )
	{
		restquery += "and ClientID/Title eq '"+$('#Clientid').val()+"' ";
		ProChip +="<div class='upload-chip'>"+$('#Clientid option:selected').text()+"</div>"; 
		 
	}
   if($('#txtFilterStatus').val() != "All" )
	{
		restquery += "and Status eq '"+$('#txtFilterStatus').val()+"' ";
		ProChip +="<div class='upload-chip'>"+$('#txtFilterStatus option:selected').text()+"</div>"; 
		 
	}
	  if($("#Managerto_TopSpan_ResolvedList").text() != "" ) 
	{ 
	var assigntobyme= getUserInformation('Managerto');
	 if(assigntobyme.length>0)
	 {
	   // for(var i=0; i<assigntobyme.length; i++)
	  //  {
	    restquery += "and (ManagerNameId eq '"+assigntobyme[0]+"' ";
	   for(var i=0; i<assigntobyme.length; i++)
	   {
	   if(assigntobyme[i]!=assigntobyme[0])
	   {
	   restquery += "or ManagerNameId eq '"+assigntobyme[i]+"'";
	   //ProChip +="<div class='upload-chip'>"+assigntobyme[i]+"</div>"; 
	  }
	   }
	   restquery += ")";
	    
	 //   }
	 }
	
		 
	}


$("#projectChip").empty();
	$("#projectChip").append(ProChip);
    
     var projectUrl=  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$top=5000&$expand=ManagerName,ClientID,Department_ID,Office_Location_Id&$orderby=ID desc&$select=*,ManagerName/Title,ManagerName/Id,ClientID/Title,ClientID/Id,Department_ID/Title,Office_Location_Id/Title&$filter=CompanyId eq '"+ txtCompanyId +"'" + restquery;
     
     if(IsProjectAdmin==true)
     {
	FilterTaskDataForOutBox(projectUrl);
	}
	
	else
	{
	   if(IsdeptAdmin==true)
	   {
	      BindProjectGridDepartmentAdmin(projectUrl);
	   }
	  else
	  {
	  BindProjectGridNormalUsers(projectUrl);
	  }
	
	
	}
}


function FilterTaskDataForOutBox(Ownurl)
{
	$.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
	success: function (data) 
	{
	
	 var Location = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
	 
	  var response = data.d.results;
            var myData = [];
            var counter = 1;
            var tr = "";
            var itemsCount = 0;
            for(var i=0;i<response.length;i++)
            {
                itemsCount++;
                var ProjectName = response[i].ProjectName;

                var ProjectCode = response[i].ProjectCode;
                 if(ProjectCode ==null || ProjectCode =='' || ProjectCode ==undefined)
				{
					ProjectCode ="";
				}

                var ProjectDescription = response[i].ProjectDescription;
             //   var ClientName = response[i].ClientName;
             	var ClientName = response[i].ClientID.Title;
                if(ClientName==null || ClientName=='' || ClientName==undefined)
				{
					ClientName="";
				}	
				//var OfficeLocation= response[i].OfficeLocation;
				var OfficeLocation= response[i].Office_Location_Id.Title;
                 if(OfficeLocation==null || OfficeLocation=='' || OfficeLocation==undefined || OfficeLocation=="-Select-")
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
                PlanedEndDate = $.datepicker.formatDate('dd-M-yy', PlanedEndDate);
                //PlanedEndDate = PlanedEndDate.getDay() +"/"+(PlanedEndDate.getMonth()+1 )+"/"+ PlanedEndDate.getFullYear();

                var ManagerDetails = response[i].ManagerName;
                var ManagerName =response[i].ManagerName.Title// ManagerDetails.get_lookupValue();
                var ManagerId =response[i].ManagerName.Id;// ManagerDetails.get_lookupId();
                var TechnologyUsed = response[i].TechnologyUsed;
                var Status = response[i].Status;
               // var DepartmentName = response[i].DepartmentName;
                var DepartmentName = response[i].Department_ID.Title;
                               
                 if(DepartmentName ==null || DepartmentName =='' || DepartmentName ==undefined|| DepartmentName =="-Select-")
				{
					DepartmentName ="";
				}


                var ItemID = response[i].ID;


                var myObject = [];
                var url = "<a href='" + Location + "/Pages/ViewProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'>" + ProjectName + "</a>";
                var editUrl = '';
                //if (ManagerId == _spPageContextInfo.userId) {
                editUrl = "<a class='custom-edit-btn' href='" + Location + "/Pages/EditProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'><i class='fa fa-pencil'></i></a>";
                //}
                //else {
                //   editUrl = "";
                //}
                if (Status == "Completed") {
                    Status = "<p style='color:green;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Terminated") {
                    Status = "<p style='color:red;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Live") {
                    Status = "<p style='color:blue;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "OnHold") {
                    Status = "<p style='color:orange;text-align:center;'>" + Status + "</p>";
                }
                //myObject.push(ProjectCode);
                //myObject.push(url);
                //myObject.push(ManagerName);
                //myObject.push(DepartmentName);
                //myObject.push(PlanedStartDate);
                //myObject.push(PlanedEndDate);
                //myObject.push(Status);
                //myObject.push(ClientName);
                //myObject.push(ActualStartDate);
                //myObject.push(ActualEndDate);
                //myObject.push(editUrl);
                //myObject.push(ItemID);
                //myData.push(myObject);
               
       // tr = tr + "<tr><td>" + ProjectCode + "</td><td>" + url + "</td><td>" + ManagerName + "</td><td>" + DepartmentName + "</td><td>" + PlanedStartDate + "</td><td>" + PlanedEndDate + "</td><td>" + Status + "</td><td>" + ClientName + "</td><td>" + ActualStartDate + "</td><td>" + ActualEndDate + "</td><td>" + editUrl + "</td></tr>";

 tr = tr + "<tr class='text-center'><td class='white-space-nowrap text-left'>" + url + "</td><td><div class='project-table-ellipsis-2'>" + ProjectCode + "</div></td><td><div class='project-table-ellipsis-2'>" + DepartmentName + "</div></td><td><div class='project-table-ellipsis-2'>" + OfficeLocation+ "</div></td><td><div class='project-table-ellipsis-2'>" + ClientName + "</div></td><td class='text-center'><div class='project-table-ellipsis-2'>" + ManagerName + "</div></td><td>" + Status + "</td><td><div class='project-edit-lock-btn-box'>" + editUrl + "</div></td></tr>";
                counter++;

            }

            $("#tableTempProjects>tbody").html("");
            $('#mydmsNorecordFound').hide();
            if (itemsCount == 0) {
                $('#mydmsNorecordFound').show();
             $("#tablefooterMyProject").hide();
        }
        else
        {
          $("#tablefooterMyProject").show();
        }

            // dvTable.append(completebody);
            var completebody = tr;
            $("#tableTempProjects>tbody").append(completebody);
            if (itemsCount > 0)
            {
                GenerateTableMyProjectList();
                $('.myListPagingValue').prop('selectedIndex', 1);
            }



	           
	            	             
	},
		    eror: function (data) {
		
		        console.log('error');
		    }
    });

	}









function getUserInformation(PeoplepickerId) {
    // Get the people picker object from the page. 
     var userIds=[];
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
var accountName=users[i].Key;
        var userId=GetUserID(accountName);
        if(userId!=-1){
          userIds.push(userId);
        } 
  }
           
            return userIds;
        }
    } else {
        return UsersID;
    }
}
// Get the user ID.
function GetUserID(logonName) {
    var item = {
        'logonName': logonName
    }
    var userId=-1;
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
            userId=data.d.Id;
            //return data.Id + ';#' + data.Title + ';#'
        },
        error: function (data) {
            failure(data)
        }
    })
    return userId
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





function ClearFilterForOutbox()
{
$('#txtFilterDepartment').val("All");
$('#officeLocation').val("All");
$('#Clientid').val("All");
$('#txtFilterStatus').val("Live");


clearPeoplePickerControl("Managerto");
$("#projectChip").empty();
MutipleBaseFilterOnOutBox();
}






function BindProjectGridDepartmentAdminOnLoad()
{
var filterStatus= $('#txtFilterStatus').val();
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$expand=Department_ID,Office_Location_Id,ManagerName,ClientID&$orderby=ID desc&$select=*,ManagerName/Title,ManagerName/Id,ClientID/Title,ClientID/Id,Department_ID/ID,Department_ID/Title,Office_Location_Id/Title&$filter=CompanyId eq '" + txtCompanyId + "' and Status eq '" + filterStatus + "'";
BindProjectGridDepartmentAdmin(Ownurl)
}









function BindProjectGridDepartmentAdmin(Ownurl) {
 var Location = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
     var departmentID = Logged_DepartmentId;
  var tr = "";
   debugger;
  //  var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$expand=Department_ID,Office_Location_Id,ManagerName,ClientID&$orderby=Title&$select=*,ManagerName/Title,ManagerName/Id,ClientID/Title,ClientID/Id,Department_ID/ID,Department_ID/Title,Office_Location_Id/Title&$filter=CompanyId eq '" + txtCompanyId + "' and Status eq '" + filterStatus + "'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data)
        {
            var response = data.d.results;
            for(var i=0;i<response.length;i++)
            {
              // var deptmtId = response[i].Department_ID;
              
              var deptmtId = response[i].DepartmentId;
              
               
               
               if(parseInt(deptmtId) == departmentID)
               {
                var ProjectName = response[i].ProjectName;

                var ProjectCode = response[i].ProjectCode;
                if(ProjectCode ==null || ProjectCode =='' || ProjectCode ==undefined)
				{
					ProjectCode ="";
				}
                
                
                var ProjectDescription = response[i].ProjectDescription;
             //   var ClientName = response[i].ClientName;
             	var ClientName = response[i].ClientID.Title;
                if(ClientName==null || ClientName=='' || ClientName==undefined)
				{
					ClientName="";
				}	
				
                // var OfficeLocation= response[i].OfficeLocation;
                var OfficeLocation= response[i].Office_Location_Id.Title;
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
                PlanedEndDate = $.datepicker.formatDate('dd-M-yy', PlanedEndDate);
                //PlanedEndDate = PlanedEndDate.getDay() +"/"+(PlanedEndDate.getMonth()+1 )+"/"+ PlanedEndDate.getFullYear();

                var ManagerDetails = response[i].ManagerName;
                var ManagerName =response[i].ManagerName.Title// ManagerDetails.get_lookupValue();
                var ManagerId =response[i].ManagerName.Id;// ManagerDetails.get_lookupId();
                var TechnologyUsed = response[i].TechnologyUsed;
                var Status = response[i].Status;
              //  var DepartmentName = response[i].DepartmentName;
               var DepartmentName = response[i].Department_ID.Title;
                
                 if(DepartmentName ==null || DepartmentName =='' || DepartmentName ==undefined|| DepartmentName =="-Select-")
				{
					DepartmentName ="";
				}

                
                
                //var CreatedDate = response[i].Created');

                var ItemID = response[i].ID;


                var myObject = [];
                var url = "<a href='" + Location + "/Pages/ViewProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'>" + ProjectName + "</a>";
                var editUrl = '';
                //if (ManagerId == _spPageContextInfo.userId) {
                editUrl = "<a class='custom-edit-btn' href='" + Location + "/Pages/EditProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'><i class='fa fa-pencil'></i></a>";
                //}
                //else {
                //   editUrl = "N/A";
                //}
                if (Status == "Completed") {
                    Status = "<p style='color:green;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Terminated") {
                    Status = "<p style='color:red;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Live") {
                    Status = "<p style='color:blue;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "OnHold") {
                    Status = "<p style='color:orange;text-align:center;'>" + Status + "</p>";
                }
                     
       // tr = tr + "<tr><td>" + ProjectCode + "</td><td>" + url + "</td><td>" + ManagerName + "</td><td>" + DepartmentName + "</td><td>" + PlanedStartDate + "</td><td>" + PlanedEndDate + "</td><td>" + Status + "</td><td>" + ClientName + "</td><td>" + ActualStartDate + "</td><td>" + ActualEndDate + "</td><td>" + editUrl + "</td></tr>";

 tr = tr + "<tr class='text-center'><td class='white-space-nowrap text-left'>" + url + "</td><td><div class='project-table-ellipsis-2'>" + ProjectCode + "</div></td><td><div class='project-table-ellipsis-2'>" + DepartmentName + "</div></td><td><div class='project-table-ellipsis-2'>" + OfficeLocation+ "</div></td><td><div class='project-table-ellipsis-2'>" + ClientName + "</div></td><td class='text-center'><div class='project-table-ellipsis-2'>" + ManagerName + "</div></td><td>" + Status + "</td><td><div class='project-edit-lock-btn-box'>" + editUrl + "</div></td></tr>";
  
            }
            
            
          
            
            
            
    else
        {
            
            
             var ProjectId = response[i].ID;

            
            
            
         var requestURI=_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('ProjectTeamDetails')/items?$Select=ID,Status,TeamMember/ID&$expand=TeamMember&$filter=Status eq 'Active' and ProjectId eq '"+ProjectId +"' and TeamMember/ID eq "+_spPageContextInfo.userId+"";

            $.ajax({
                url:requestURI,
                type:"GET",
                async:false,
                headers: { Accept: "application/json;odata=verbose" },
                success:function(data)
                {
                    var results=data.d.results;

                    if(results.length!=0)
                    {
                          var ProjectName = response[i].ProjectName;

                var ProjectCode = response[i].ProjectCode;
                if(ProjectCode ==null || ProjectCode =='' || ProjectCode ==undefined)
				{
					ProjectCode ="";
				}
                
                
                var ProjectDescription = response[i].ProjectDescription;
             //   var ClientName = response[i].ClientName;
             	var ClientName = response[i].ClientID.Title;
                if(ClientName==null || ClientName=='' || ClientName==undefined)
				{
					ClientName="";
				}	
				
                // var OfficeLocation= response[i].OfficeLocation;
                var OfficeLocation= response[i].Office_Location_Id.Title;
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
                PlanedEndDate = $.datepicker.formatDate('dd-M-yy', PlanedEndDate);
                //PlanedEndDate = PlanedEndDate.getDay() +"/"+(PlanedEndDate.getMonth()+1 )+"/"+ PlanedEndDate.getFullYear();

                var ManagerDetails = response[i].ManagerName;
                var ManagerName =response[i].ManagerName.Title// ManagerDetails.get_lookupValue();
                var ManagerId =response[i].ManagerName.Id;// ManagerDetails.get_lookupId();
                var TechnologyUsed = response[i].TechnologyUsed;
                var Status = response[i].Status;
               // var DepartmentName = response[i].DepartmentName;
                var DepartmentName = response[i].Department_ID.Title;
                
                 if(DepartmentName ==null || DepartmentName =='' || DepartmentName ==undefined|| DepartmentName =="-Select-")
				{
					DepartmentName ="";
				}

                
                
                //var CreatedDate = response[i].Created');

                var ItemID = response[i].ID;


                var myObject = [];
                var url = "<a href='" + Location + "/Pages/ViewProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'>" + ProjectName + "</a>";
                var editUrl = '';
               if (ManagerId == _spPageContextInfo.userId) {
                editUrl = "<a class='custom-edit-btn' href='" + Location + "/Pages/EditProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'><i class='fa fa-pencil'></i></a>";
                    }
                else {
                   editUrl = "";
                }
                if (Status == "Completed") {
                    Status = "<p style='color:green;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Terminated") {
                    Status = "<p style='color:red;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Live") {
                    Status = "<p style='color:blue;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "OnHold") {
                    Status = "<p style='color:orange;text-align:center;'>" + Status + "</p>";
                }
                     
       // tr = tr + "<tr><td>" + ProjectCode + "</td><td>" + url + "</td><td>" + ManagerName + "</td><td>" + DepartmentName + "</td><td>" + PlanedStartDate + "</td><td>" + PlanedEndDate + "</td><td>" + Status + "</td><td>" + ClientName + "</td><td>" + ActualStartDate + "</td><td>" + ActualEndDate + "</td><td>" + editUrl + "</td></tr>";

 tr = tr + "<tr class='text-center'><td class='white-space-nowrap text-left'>" + url + "</td><td><div class='project-table-ellipsis-2'>" + ProjectCode + "</div></td><td><div class='project-table-ellipsis-2'>" + DepartmentName + "</div></td><td><div class='project-table-ellipsis-2'>" + OfficeLocation+ "</div></td><td><div class='project-table-ellipsis-2'>" + ClientName + "</div></td><td class='text-center'><div class='project-table-ellipsis-2'>" + ManagerName + "</div></td><td>" + Status + "</td><td><div class='project-edit-lock-btn-box'>" + editUrl + "</div></td></tr>";

                    }
                },
                error:function(data)
                {
                    console.log("BindProjectGridNormalUsers method" + data);
                }
            });
		 }
            
}           
            

            $("#tableTempProjects>tbody").html("");
            $('#mydmsNorecordFound').hide();
           /* if (itemsCount == 0) {
                $('#mydmsNorecordFound').show();
             $("#tablefooterMyProject").hide();
       }
        else
        {
          $("#tablefooterMyProject").show();
        }*/

            // dvTable.append(completebody);
            var completebody = tr;
            $("#tableTempProjects>tbody").append(completebody);
            
            var itemsCount = $('#mainDivAreaOffice365 >tr').length;
            if (itemsCount > 0)
            {
                GenerateTableMyProjectList();
                $('.myListPagingValue').prop('selectedIndex', 1);
            }



            if (itemsCount == 0) {
                $('#mydmsNorecordFound').show();
             $("#tablefooterMyProject").hide();
       }
        else
        {
          $("#tablefooterMyProject").show();
        }


   },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
}






function IsDepartmentAdmin()
{
var txtCompanyId =titanForWork.getQueryStringParameter("CompanyId");
var departmentID = Logged_DepartmentId;
var listName='ProcessApprovers';
   var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=CompanyId eq '" + txtCompanyId + "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and Department/ID eq '"+departmentID+"' and (WebPartName eq 'Project')";
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







function BindProjectGridNormalUsersOnLoad()
{
var filterStatus= $('#txtFilterStatus').val();
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$expand=Department_ID,Office_Location_Id,ManagerName,ClientID&$orderby=ID desc&$select=*,ManagerName/Title,ManagerName/Id,ClientID/Title,ClientID/Id,Department_ID/ID,Department_ID/Title,Office_Location_Id/Title&$top=5000&$filter=CompanyId eq '" + txtCompanyId + "' and Status eq '" + filterStatus + "'";
BindProjectGridNormalUsers(Ownurl)
}





function BindProjectGridNormalUsers(Ownurl)
{
 var Location = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
  var tr = "";

 $.ajax({
        url: Ownurl,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data)
        {
            var response = data.d.results;
            
        for(var i=0;i<response.length;i++)
            {
            

            ///////////////////////////////////
            var projectId = response[i].ID;
            var ProjectName=response[i].ProjectName;
            
           var requestURI=_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('ProjectTeamDetails')/items?$Select=ID,Status,TeamMember/ID&$expand=TeamMember&$filter=Status eq 'Active' and ProjectId eq '"+projectId+"' and TeamMember/ID eq "+_spPageContextInfo.userId+"";

            $.ajax({
                url:requestURI,
                type:"GET",
                async:false,
                headers: { Accept: "application/json;odata=verbose" },
                success:function(data)
                {
                    var results=data.d.results;

                    if(results.length!=0)
                    {
 var ProjectName = response[i].ProjectName;

                var ProjectCode = response[i].ProjectCode;
                if(ProjectCode ==null || ProjectCode =='' || ProjectCode ==undefined)
				{
					ProjectCode ="";
				}
                
                
                var ProjectDescription = response[i].ProjectDescription;
             //   var ClientName = response[i].ClientName;
             	var ClientName = response[i].ClientID.Title;
                if(ClientName==null || ClientName=='' || ClientName==undefined)
				{
					ClientName="";
				}	
				
                // var OfficeLocation= response[i].OfficeLocation;
                var OfficeLocation= response[i].Office_Location_Id.Title;
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
                PlanedEndDate = $.datepicker.formatDate('dd-M-yy', PlanedEndDate);
                //PlanedEndDate = PlanedEndDate.getDay() +"/"+(PlanedEndDate.getMonth()+1 )+"/"+ PlanedEndDate.getFullYear();

                var ManagerDetails = response[i].ManagerName;
                var ManagerName =response[i].ManagerName.Title// ManagerDetails.get_lookupValue();
                var ManagerId =response[i].ManagerName.Id;// ManagerDetails.get_lookupId();
                var TechnologyUsed = response[i].TechnologyUsed;
                var Status = response[i].Status;
               // var DepartmentName = response[i].DepartmentName;
                var DepartmentName = response[i].Department_ID.Title;
                
                 if(DepartmentName ==null || DepartmentName =='' || DepartmentName ==undefined|| DepartmentName =="-Select-")
				{
					DepartmentName ="";
				}

                
                
                //var CreatedDate = response[i].Created');

                var ItemID = response[i].ID;


                var myObject = [];
                var url = "<a href='" + Location + "/Pages/ViewProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'>" + ProjectName + "</a>";
                var editUrl = '';
                if (ManagerId == _spPageContextInfo.userId) {
                editUrl = "<a class='custom-edit-btn' href='" + Location + "/Pages/EditProjectDetails.aspx?WebAppId=" + txtCompanyId + "&ProjectID=" + ItemID + "&ProjectName=" + ProjectName + "'><i class='fa fa-pencil'></i></a>";
                }
                else {
                   editUrl = "";
                }
                if (Status == "Completed") {
                    Status = "<p style='color:green;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Terminated") {
                    Status = "<p style='color:red;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "Live") {
                    Status = "<p style='color:blue;text-align:center;'>" + Status + "</p>";
                }
                else if (Status == "OnHold") {
                    Status = "<p style='color:orange;text-align:center;'>" + Status + "</p>";
                }
                     
       // tr = tr + "<tr><td>" + ProjectCode + "</td><td>" + url + "</td><td>" + ManagerName + "</td><td>" + DepartmentName + "</td><td>" + PlanedStartDate + "</td><td>" + PlanedEndDate + "</td><td>" + Status + "</td><td>" + ClientName + "</td><td>" + ActualStartDate + "</td><td>" + ActualEndDate + "</td><td>" + editUrl + "</td></tr>";

 tr = tr + "<tr class='text-center'><td class='white-space-nowrap text-left'>" + url + "</td><td><div class='project-table-ellipsis-2'>" + ProjectCode + "</div></td><td><div class='project-table-ellipsis-2'>" + DepartmentName + "</div></td><td><div class='project-table-ellipsis-2'>" + OfficeLocation+ "</div></td><td><div class='project-table-ellipsis-2'>" + ClientName + "</div></td><td class='text-center'><div class='project-table-ellipsis-2'>" + ManagerName + "</div></td><td>" + Status + "</td><td><div class='project-edit-lock-btn-box'>" + editUrl + "</div></td></tr>";


                    }
                },
                error:function(data)
                {
                    console.log("BindProjectGridNormalUsers method" + data);
                   }
            });
		 
            
}

            $("#tableTempProjects>tbody").html("");
            $('#mydmsNorecordFound').hide();
           /* if (itemsCount == 0) {
                $('#mydmsNorecordFound').show();
             $("#tablefooterMyProject").hide();
       }
        else
        {
          $("#tablefooterMyProject").show();
        }*/

            // dvTable.append(completebody);
            var completebody = tr;
            $("#tableTempProjects>tbody").append(completebody);
            
            var itemsCount = $('#mainDivAreaOffice365 >tr').length;
            if (itemsCount > 0)
            {
                GenerateTableMyProjectList();
                $('.myListPagingValue').prop('selectedIndex', 1);
            }



            if (itemsCount == 0) {
                $('#mydmsNorecordFound').show();
             $("#tablefooterMyProject").hide();
       }
        else
        {
          $("#tablefooterMyProject").show();
        }


   },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
}


