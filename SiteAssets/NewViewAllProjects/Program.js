var programId='';
var projectAdmin=false;
$(document).ready(function(){
	getProgram();
	InitializePeoplePicker("pickerStakeholders", false);
	InitializePeoplePicker("pickerSponsors", false);
	SetDatePicker();
	$("#search").on("keyup", function() {
       var value = $(this).val().toLowerCase();
       $("#tblbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
         });
    });
    
    $('#btnAddProgram').click(function(){
      if(programId!=''){
       updateProgramName();
      }
      else{
		 AddProgramName();
		}
	})
})

function getRight(check){
  projectAdmin=check;
  if(projectAdmin==true){
      $('#btnCreateProgram').show();  
  }
 
}
var sortProgram;
function getProgram()
{
	//var programUrl=_spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getbytitle('ProgramList')/items?$select=*,Title&$orderby=Modified desc";
	var listName='ProgramList';
	var siteURL=_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,Id&$orderby=Modified desc"
	$.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data)
		{
			console.log(data);
			var items=data.d.results;
			sortProgram	=items;		
			var htmlProgram='';
		   if(items.length>0){
				for(var i=0; i<items.length;i++)
				{
					var programName=items[i].Title;
					var Id=items[i].Id;
					if(programName==null)programName='';
					var Description=items[i].Description;
					if(Description==null)Description='';
					var refNo=items[i].Reference_no;
					if(refNo==null)refNo='';
					var total_projects=items[i].total_projects;
					if(total_projects==null)total_projects='';
					var OpenTasks=items[i].OpenTasks;
					if(OpenTasks==null)OpenTasks='';
					var OpenProjects=items[i].OpenProjects;
					if(OpenProjects==null)OpenProjects='0';
					var CompletionPercentage=items[i].CompletionPercentage;
					if(CompletionPercentage==null)CompletionPercentage=0;
					var Status=items[i].Status;
					var Currdate=new Date(items[i].PlannedStartDate);
					var PlanedEnd=new Date(items[i].PlannedEndDate);
					var ProgramEndDate='';
					if(PlanedEnd!=null)
					{
					   var d=new Date(PlanedEnd);
					   ProgramEndDate=d.format('dd-MMM-yyyy');
					}
					htmlProgram+='<tr><td><div class="programname">'+programName+'</div><td><div class="refsec">'+refNo+'</div></td>'
					htmlProgram+='<td><div class="descriptionbbox">'+Description+'</div></td>';
					htmlProgram+='<td><div class="Open-Tasks">'+OpenTasks+'</div></td>'
					htmlProgram+='<td><div class="Live-Projects">'+OpenProjects+'</div></td>'					
					htmlProgram+='<td><div class="total-Projects">'+total_projects+'</div></td>'
					//htmlProgram+='<div class="progress custom-progress progress-info m-0 mt-4">'
					//htmlProgram+='<td><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+CompletionPercentage+'%"></div></div></td>'			
                    if(PlanedEnd<new Date())
                    {
                    	htmlProgram+='<td>';
                    	if(PlanedEnd.getFullYear()!=1970){
                    	htmlProgram+='<p class="m-0 font-12" style="color:#ff0000 !important">Due :<span>'+ProgramEndDate+'</span></p>'}
                    	htmlProgram+='<div class="progress custom-progress progress-info m-0 mt-4"><div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+CompletionPercentage+'%; background:#ff0000 !important"></div></div></td>'

                    }
                    else{
					    htmlProgram+='<td><p class="m-0 font-12">Due :<span>'+ProgramEndDate+'</span></p>'
					    htmlProgram+='<div class="progress custom-progress progress-info m-0 mt-4"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+CompletionPercentage+'%"></div></div></td>'
					}
					//htmlProgram+='<td><div class="Completion">'+CompletionPercentage+'%</div></td>'
					htmlProgram+='<td><div class="program-edit-lock-btn-box">'
					if(projectAdmin==true){
					  htmlProgram+='<a type="button" href="#" class="custom-edit-btn" onclick="editProgram('+Id+')"><span class="fa fa-pencil"></span></a>'
					}
					htmlProgram+='</div></td></tr>'
				}
				$('#tblProgram tbody').empty();
				$('#tblProgram tbody').append(htmlProgram);
				
			}
	
			else
			{
				htmlProgram += '<tr><td>No records founds !</td></tr>';
					$('#tblProgram tbody').empty();
					$('#tblProgram tbody').append(htmlProgram);
			}
		}	

	})
}


function AddProgramName()
{
	var ListName = "ProgramList";
	var Title=$('#txtProgramName').val();
	if(Title==''){
	 alert('please enter Program Name');
	 return false;
	}
	var Description=$('#txtDescription').val();
	/*if(Description==''){
	 alert('please enter Description');
	 return false;
	}*/

	var Reference=$('#txtrefNo').val();	
	/*if(Reference==''){
	 alert('please enter Reference Number');
	 return false;
	}*/
	var tempDate=new Date($('#startDate').val());
	tempDate=tempDate.format('dd/MM/yyyy');
	var txtStartDate=GetDateStandardFormat(tempDate)
	var d=new Date($('#endDate').val());
	d=d.format('dd/MM/yyyy');
	var txtEndDate=GetDateStandardFormat(d)
	var Stakeholders= getPeopleUserInfoGroups("pickerStakeholders");				
     if(Stakeholders.length>1)
		{
		 alert("please insert only 1 Stakeholders");
		 return false;
		}
   var Sponsors= getPeopleUserInfoGroups("pickerSponsors");				
     if(Sponsors.length>1)
		{
		 alert("please insert only 1 Sponsors");
		 return false;
		}
 

    var Metadata;
	  Metadata = {
	        __metadata: {'type': 'SP.Data.ProgramListListItem'},
	        Title : Title,
			Reference_no:Reference,
			Description:Description,
			PlannedStartDate:txtStartDate,
			PlannedEndDate:txtEndDate,
			StakeholdersId:{ 'results' : Stakeholders},
			SponsorsId:{'results' :Sponsors}
	        
		};       
       
    $.when(AddItemToList(ListName,Metadata)).done(function(responseIdmore)
    {   		     
	   alert('Submitted successfully!');
	   clertext();
	   getProgram();	   
 	   $("#newProgram").modal('hide'); 
          				   
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

function editProgram(ItemId) {
        $("#newProgram").modal('show'); 
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProgramList')/items?$select=*,Stakeholders/Title,Sponsors/Title&$expand=Sponsors,Stakeholders&$filter=ID eq '"+ItemId+"'";

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
				    clertext();
				    programId=items[0].Id;
				    $('#txtProgramName').val(items[0].Title);
				    $('#txtDescription').val(items[0].Description);
				    $('#txtrefNo').val(items[0].Reference_no);
				    var Sponsors=items[0].Sponsors.results[0].Title;
				    var Stakeholders=items[0].Stakeholders.results[0].Title;
				    setPeoplePickerUsersInfoCurrentGroups("pickerStakeholders", Stakeholders);
				    setPeoplePickerUsersInfoCurrentGroups("pickerSponsors", Sponsors);
				    var PlannedStartDate=new Date(items[0].PlannedStartDate);
				    PlannedStartDate=$.datepicker.formatDate('MM dd, yy', PlannedStartDate);
			        var PlannedEndDate= new Date(items[0].PlannedEndDate);
			        PlannedEndDate=$.datepicker.formatDate('MM dd, yy', PlannedEndDate);	
				    $('#startDate').val(PlannedStartDate);
				    $('#endDate').val(PlannedEndDate);
				   
					
			 }, eror: function (data)
					 {
				  console.log('error');
					}                   
			 });     
	}
function updateProgramName()
{
	var ListName = "ProgramList";
	var Title=$('#txtProgramName').val();
	if(Title==''){
	 alert('please enter Program Name');
	 return false;
	}
	var Description=$('#txtDescription').val();
	/*if(Description==''){
	 alert('please enter Description');
	 return false;
	}*/

	var Reference=$('#txtrefNo').val();	
	/*if(Reference==''){
	 alert('please enter Reference Number');
	 return false;
	}*/
	var tempDate=new Date($('#startDate').val());
	tempDate=tempDate.format('dd/MM/yyyy');
	var txtStartDate=GetDateStandardFormat(tempDate)
	var d=new Date($('#endDate').val());
	d=d.format('dd/MM/yyyy');
	var txtEndDate=GetDateStandardFormat(d)
	var Stakeholders= getPeopleUserInfoGroups("pickerStakeholders");				
     if(Stakeholders.length>1)
		{
		 alert("please insert only 1 Stakeholders");
		 return false;
		}
   var Sponsors= getPeopleUserInfoGroups("pickerSponsors");				
     if(Sponsors.length>1)
		{
		 alert("please insert only 1 Sponsors");
		 return false;
		}

    var Metadata;
	  Metadata = {
	        __metadata: {'type': 'SP.Data.ProgramListListItem'},
	        Title : Title,
			Reference_no:Reference,
			Description:Description,
			PlannedStartDate:txtStartDate,
			PlannedEndDate:txtEndDate,
			StakeholdersId:{ 'results' : Stakeholders},
			SponsorsId:{'results' :Sponsors}
	        
		};       
       
    $.when(UpdateItemToList(Metadata)).done(function(responseIdmore)
    {   		     
	   alert('Submitted successfully!');
	   clertext();
	   getProgram();
	   programId='';	   
 	   $("#newProgram").modal('hide'); 
          				   
	})
}

function UpdateItemToList(Metadata)
{
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ProgramList')/Items('"+programId+"')",
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

function clertext(){
     $('#txtProgramName').val('');
	 $('#endDate').val('');
	 $('#txtrefNo').val();
	 $('#startDate').val('');
	 $('#txtDescription').val('');
	 $('#txtrefNo').val('');
	 clearPeoplePickerControl('pickerSponsors');
	 clearPeoplePickerControl('pickerStakeholders')	 

}

function bindPrograms(){
   var htmlProgram='';
   if(sortProgram.length>0){
   var items=sortProgram;
				for(var i=0; i<sortProgram.length;i++)
				{
					var programName=items[i].Title;
					var Id=items[i].Id;
					if(programName==null)programName='';
					var Description=items[i].Description;
					if(Description==null)Description='';
					var refNo=items[i].Reference_no;
					if(refNo==null)refNo='';
					var total_projects=items[i].total_projects;
					if(total_projects==null)total_projects='';
					var OpenTasks=items[i].OpenTasks;
					if(OpenTasks==null)OpenTasks='';
					var OpenProjects=items[i].OpenProjects;
					if(OpenProjects==null)OpenProjects='0';
					var CompletionPercentage=items[i].CompletionPercentage;
					if(CompletionPercentage==null)CompletionPercentage=0;
					var Status=items[i].Status;
					var Currdate=new Date(items[i].PlannedStartDate);
					var PlanedEnd=new Date(items[i].PlannedEndDate);
					var ProgramEndDate='';
					if(PlanedEnd!=null)
					{
					   var d=new Date(PlanedEnd);
					   ProgramEndDate=d.format('dd-MMM-yyyy');
					}
					htmlProgram+='<tr><td><div class="programname">'+programName+'</div><td><div class="refsec">'+refNo+'</div></td>'
					htmlProgram+='<td><div class="descriptionbbox">'+Description+'</div></td>';
					htmlProgram+='<td><div class="Open-Tasks">'+OpenTasks+'</div></td>'
					htmlProgram+='<td><div class="Live-Projects">'+OpenProjects+'</div></td>'					
					htmlProgram+='<td><div class="total-Projects">'+total_projects+'</div></td><td>'
					if(PlanedEnd<new Date())
                    {
                    	htmlProgram+='<td>';
                    	if(PlanedEnd.getFullYear()!=1970){
                    	htmlProgram+='<p class="m-0 font-12" style="color:#ff0000 !important">Due :<span>'+ProgramEndDate+'</span></p>'}
                    	htmlProgram+='<div class="progress custom-progress progress-info m-0 mt-4"><div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+CompletionPercentage+'%; background:#ff0000 !important"></div></div></td>'

                    }
                    else{
					    htmlProgram+='<td><p class="m-0 font-12">Due :<span>'+ProgramEndDate+'</span></p>'
					    htmlProgram+='<div class="progress custom-progress progress-info m-0 mt-4"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+CompletionPercentage+'%"></div></div></td>'
					}
					//htmlProgram+='<td><div class="Completion">'+CompletionPercentage+'%</div></td>'
					htmlProgram+='</td><td><div class="program-edit-lock-btn-box">'
					if(projectAdmin==true){
					  htmlProgram+='<a type="button" href="#" class="custom-edit-btn" onclick="editProgram('+Id+')"><span class="fa fa-pencil"></span></a>'
					}
					htmlProgram+='</div></td></tr>'
				}
				$('#tblProgram tbody').empty();
				$('#tblProgram tbody').append(htmlProgram);
				
			}
	
			else
			{
				htmlProgram += '<tr><td>No records founds !</td></tr>';
					$('#tblProgram tbody').empty();
					$('#tblProgram tbody').append(htmlProgram);
			}
			

} 

var sortPrograms=false
var sortRefNo=false;
var sortTotal=false;
function sort_Program(){
  if(sortPrograms==false){
     sortProgram.sort(function(a, b) {
				  var keyA =a.Title.toLowerCase(),
				    keyB =b.Title.toLowerCase();
				  // Compare the 2 dates
				  if (keyA < keyB) return -1;
				  if (keyA > keyB) return 1;
				  return 0;
				});
				sortPrograms=true;
	}
	else{
	    sortProgram.sort(function(a, b) {
	    var keyA =a.Title.toLowerCase(),
	    keyB =b.Title.toLowerCase();
				  // Compare the 2 dates
	    if (keyB < keyA) return -1;
	    if (keyB > keyA) return 1;
		return 0;
	   });
	   sortPrograms=false;
    }	
				
		bindPrograms();		

}

function sort_RefNo(){
  if(sortRefNo==false){
     sortProgram.sort(function(a, b) {
				  var keyA =a.Reference_no,
				    keyB =b.Reference_no;
				  // Compare the 2 dates
				  if (keyA < keyB) return -1;
				  if (keyA > keyB) return 1;
				  return 0;
				});
				sortRefNo=true;
	}
	else{
	    sortProgram.sort(function(a, b) {
	    var keyA =a.Reference_no,
	    keyB =b.Reference_no;
				  // Compare the 2 dates
	    if (keyB < keyA) return -1;
	    if (keyB > keyA) return 1;
		return 0;
	   });
	   sortRefNo=false;
    }	
				
		bindPrograms();		

}

function sort_Total(){
  if(sortTotal==false){
     sortProgram.sort(function(a, b) {
				  var keyA =a.total_projects,
				    keyB =b.total_projects;
				  // Compare the 2 dates
				  if (keyA < keyB) return -1;
				  if (keyA > keyB) return 1;
				  return 0;
				});
				sortTotal=true;
	}
	else{
	    sortProgram.sort(function(a, b) {
	    var keyA =a.total_projects,
	    keyB =b.total_projects;
				  // Compare the 2 dates
	    if (keyB < keyA) return -1;
	    if (keyB > keyA) return 1;
		return 0;
	   });
	   sortTotal=false;
    }	
				
		bindPrograms();		

}

function recentPrograms(){
          sortProgram.sort(function(a, b) {
				  var keyA = new Date(a.Modified),
				    keyB = new Date(b.Modified);
				  // Compare the 2 dates
				  if (keyB < keyA) return -1;
				  if (keyB > keyA) return 1;
				  return 0;
				});
				
				bindPrograms();

}
 
/**************************picker*********************************************/

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


function SetDatePicker() {
    //$('#startDate').attr('disabled', true);
    var today =new Date()
    $('#startDate').datepicker({
        defaultDate: 0,
        minDate: 0,
        maxDate: "+48m",
        //dateFormat: 'dd/mm/yy',
        dateFormat: 'MM dd, yy',
    }).datepicker("setDate", new Date());    
    $('#endDate').datepicker({
        defaultDate: 0,
        minDate: 0,
        dateFormat: 'MM dd, yy',
    }).datepicker("setDate", '+6m');
    $('#startDate').change(function () {
        var from = $('#startDate').datepicker('getDate');
        var date_diff = Math.ceil((from.getTime() - Date.parse(today)) / 86400000);
        var maxDate_d = date_diff + 10 + 'm';
        date_diff = date_diff + 'd';
        $('#endDate').val('').removeAttr('disabled').removeClass('hasDatepicker').datepicker({
            dateFormat: 'MM dd, yy',
            minDate: date_diff,
            maxDate: maxDate_d
        });
    });

}
function GetDateStandardFormat(date)
{	
	var dateS=ConvertDateFormatToddMMyyyy(date);
	var startDate = new Date(dateS);
	// seconds * minutes * hours * milliseconds = 1 day
	var day = 60 * 60 * 24 * 1000;
	//var endDate = new Date(startDate.getTime() + day);
    var endDate = new Date(startDate.getTime());
    var newDate =endDate.toISOString();
	return newDate; 
}

function ConvertDateFormatToddMMyyyy(date) 
{
	var formatedDate = stringToDate(date, 'dd/MM/yyyy', "/")
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