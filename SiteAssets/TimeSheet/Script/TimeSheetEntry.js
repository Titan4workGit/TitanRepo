$(function(){				
	$('#timesheetEnter').datepicker({
		defaultDate: 0,
        maxDate: "+0d",
        dateFormat: 'dd/mm/yy',
    }).datepicker("setDate", new Date()) ; 
});

(function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
}(jQuery));

$("#TaskComplition").inputFilter(function(value) {return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100); });
$("#TaskComplitionOther").inputFilter(function(value) {return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100); });


var ValidMode = "";
var G_TaskID = '';
var enc ='';
$(document).ready(function(){
	
	initializePeoplePicker("ManagerName");	
    authentication();
	$('.DependencyDIV').hide();
	$("#Update").hide();
	GetManagerID();
	ValidMode = window.atob($.urlParam('Mode'));
	var Dependency = window.atob($.urlParam('Dependency'));
	var ValidateDependency = jQuery.isNumeric(Dependency);
	if(ValidateDependency == true)
	{
		GetTaskforDependencies(Dependency);
	}	  	
  	else if(window.atob($.urlParam('Mode')) == "Add")
  	{
  		G_TaskID = window.atob($.urlParam('TaskId'));
		GetTaskDtl(window.atob($.urlParam('TaskId')));
	}
	else if (window.atob($.urlParam('Mode')) == "Edit")
	{
		EditTimeSheetlist(window.atob($.urlParam('data')));		
	}
	
	if(window.atob($.urlParam('Mode')) == "View")
	{
		var FDATE = $.urlParam('Recall');
		var StartDate = FDATE.slice(0, 4)+"-"+FDATE.slice(4, 6)+"-"+FDATE.slice(6, 8);
		$("#timesheetEnter").datepicker({ dateFormat: "dd/mm/yy",maxDate: new Date()}).datepicker("setDate", new Date(StartDate));	
	}
  	GetTotalLoginHours();  	
    
    $('#CloseTimeSheet').click(function(){
    	if(window.atob($.urlParam('IsModal')) != "true"){
    		window.location.href = ""+$.urlParam('sourcelocation')+"?WebAppId=" + Logged_CompanyId;
    	}
    	else {
    		if($.urlParam('sourceLocation') == "../SitePages/Guestportal1.aspx" || $.urlParam('sourceLocation') == "../SitePages/Guestportal2.aspx"){
    			location.href = $.urlParam('sourceLocation');
    		}
    		else if($.urlParam('sourceLocation') == "TaskDetails") {
    			location.href = document.referrer;;
    		}
    		else {
    			location.href = $.urlParam('sourceLocation') + "&ProjectName=" + $("#Project :selected").text();
    		}
    	}
    });
    $('.ClearTaskFltr').click(function(){
    	$("#TaskName").val('');
    	$('#ProjectList').empty();
    	$('#ProjectList').append($("<option     />").val('ALL').text('ALL')); 
    	//$("#ProjectList").val('ALL');
    	$("#Priorityddl").val('ALL');
    	$("#WorkTypeProjDDL").val('ALL');
    	$("#Status").val('Open');
    	initializePeoplePicker("ManagerName");
    	var Item=[];
    	GenerateDtlTable(Item);
    	$("#currentpage").text('0');
    	$("#totalpages").text('0');
    	
    	
    });
    
    $('.clearProjectsearchbtn').click(function(){
    	ResetProjectFilter();
    	
    	
    });


    //ClearTaskFltr   
    
    SetAttendanceDDL();
    //to hide master page
   	if(window.atob($.urlParam('IsModal')) == "true"){
   		$("#s4-bodyContainer .navbar-custom").hide();
   		$(".SideTabMenu").hide(); 	
   		$("#ms-designer-ribbon").hide();
   		$("#masterFooter").hide();
   		$("body").css({"overflow":"scroll"});
   		$("#DivDeptProject").hide();
   		Logged_CompanyId = $.urlParam('WebAppId');
   		//$("#CloseTimeSheet").remove();
   	}
   	$('#lblOther').click(function(){
    	if(window.atob($.urlParam('IsModal')) == "true"){
	   		getExternalClient();
	   		$("#HerfClientType").remove();
    	}
    });   
});


function EditTimeSheetlist(itm)
{
	var res = itm.split(",");	
	var ITMDate = new Date(res[1]);
   		ITMDate = $.datepicker.formatDate('dd/mm/yy', ITMDate);
	$("#timesheetEnter").val(ITMDate);
	EditTimesheetEntry(res[0]);
}


$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results == null){return results="null";}
	else{
		return results[1] || 0;
	}
}


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


var G_TaskDate='';
function GetTaskDtl(TaskID)
{
	G_TaskDate='';
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?$select=*,Module/Title,ClientID/Title,ProjectID/Title&$expand=Module/Title,ClientID/Title,ProjectID/Title&$filter=ID eq ('"+ TaskID +"')";  
	$.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
		success: function (data) 
		{
            var items = data.d.results;  
            if (items.length > 0) 
			{
				$('#selectByTask').prop( "disabled", true );				
				$('#selectByTask').val(items[0].Title);
				
				$('#Project').empty(); 
				$('#Project').append($("<option     />").val(items[0].ProjectIDId).text(items[0].ProjectID.Title));  				
  				
  				$('#Module').empty(); 
				$('#Module').append($("<option     />").val(items[0].ModuleId).text(items[0].Module.Title));

  				$('#Client').empty(); 
				$('#Client').append($("<option     />").val(items[0].ClientIDId).text(items[0].ClientID.Title));

				$('#BTProjectWorkType').empty(); 
				$('#BTProjectWorkType').append($("<option     />").val(items[0].Worktype).text(items[0].Worktype)); 
				
				$('#Details').val("");
				
				G_TaskDate = new Date(items[0].StartDate);              
				G_TaskDate = $.datepicker.formatDate('dd/mm/yy',G_TaskDate);				
			}
        },
		error: function (data) 
		{
			console.log("GetTaskDtl Function failed");  
			console.log(data);  
		}  
	});
}


function GetDependency(TaskID)
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaskDependencies')/items?$select=*&$filter=TaskId eq ('"+ TaskID +"') and AssignedTo eq ('"+_spPageContextInfo.userId+"')";  
	$.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
		success: function (data) 
		{
            var items = data.d.results;  
            if (items.length > 0) 
			{	
				$('#DependencyDDL').empty();						 
				$('#DependencyDDL').append($("<option     />").val("Select").text("Select"));  				
				for(var I=0; I<items.length; I++)
				{				
					$('#DependencyDDL').append($("<option     />").val(items[I].ID).text(items[I].Title));  				
				}
				$("#barVal").text(items[0].Completion+'%');
				$("#TaskComplition").val(items[0].Completion);				
			}
			else
			{
				$('#DependencyDDL').empty(); 
				$('#DependencyDDL').append($("<option     />").val("0").text("Select"));
			}   
        },
		error: function (data) 
		{
			console.log("GetTaskDtl Function failed");  
			console.log(data);  
		}  
	});
}


function ADD2TIMESHEET()
{
		
	if(G_Validateholiday4timesheet == true)
	{
		if (confirm('The selected date is a Holiday, are you sure to submit your timesheet?')) 
		{
			InsertData();		
   		}								
	}
	else
	{
		InsertData();				
	}                		
}


function InsertData()
{	
	var TimesheetDate = $("#timesheetEnter").val();
	var Absolute = Convertdateformat(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));
	var radioValue = $("input[name=timesheetEntry]:checked").val();
	var workon = '';
	if(radioValue == "1" || radioValue == "3")
	{		
		if(radioValue == "3")
		{
			workon = "Dependency";
			RadioBtn = "Dependency";
		}
		else
		{
			workon = "Task";
			RadioBtn = "Task";
		}
	}
	else
	{
		RadioBtn=$("#selectOther").val();
		workon = "Other";
	}
	if(RadioBtn == "Task" || RadioBtn == "Dependency")
	{	
		var TaskTitle = $("#selectByTask").val();
		var TaskID = G_TaskID;
		var DependencyID="";
		if(radioValue == "3")
		{
			DependencyID = $("#DependencyDDL").val();
		}
		else
		{
			DependencyID=0;
		}		
		var ProjectID = $("#Project").val();
		var ModuleID = $("#Module").val();
		var ClientID = $("#Client").val();
		var WorkType = $("#BTProjectWorkType").val();
		var StartTime = $("#startTime").val();
		var EndTime = $("#EndTime").val();
		var Details = $("#Details").val();
		var TimesheetDateStart= TimesheetDate +StartTime;
		var GetStartHH = new Date("01/01/2007 " + StartTime).getHours();		
		var GetStartMM = new Date("01/01/2007 " + StartTime).getMinutes();		

		var AbsoluteTime = GetDDMMYYHHMM(Absolute,GetStartHH,GetStartMM);
		var ResStartTime= parseInt(GetStartHH*60+GetStartMM);		
		var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
		var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
		var ResEndTime= parseInt(GetEndHH*60+GetEndMM);		
		var TotalWorkingMM = parseInt(ResEndTime-ResStartTime);
		//G_TotalLoginHours = parseInt(G_TotalLoginHours + TotalWorkingMM)
		var CompanyID = Logged_CompanyId;
		var LoggedEmp = _spPageContextInfo.userId;			
		var TimesheetDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    		TimesheetDate= new Date(TimesheetDate);; 	
		
		if(ResEndTime > ResStartTime)
    	{				
    	 	Validatetime(ResStartTime,ResEndTime);
    	 	if(G_TimeValidate == true)
    	 	{   
    	 		if(Validations() == true)
    	 		{	
    	 			if(RadioBtn == "Task")
    	 			{     	 			
						var listName="EmpTimeSheet";			
						var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'TaskIDId':parseInt(TaskID),'ProjectIDId':parseInt(ProjectID),'ModuleIDId':parseInt(ModuleID),'ManagerIDId':parseInt(G_ManagerID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DependencyIDId':DependencyID,'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime,'CompletionPersent':$("#TaskComplition").val()};
						
						TimeSheetUniversalinsert(listName,item,);
						
						var QueryReq = "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items('"+TaskID+"')";					
    					var QueryResult = getdata(QueryReq);
    					if(QueryResult.d.CurrentPhase == 'Open')
    					{
    						var Modified = QueryResult.d.CompletionDate;
    							Modified  = moment(Modified).format('YYYY-MM-DD');
    						var ActionDate = new Date(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));
    							ActionDate = moment(ActionDate).format('YYYY-MM-DD');
    						if(Date.parse(ActionDate)>=Date.parse(Modified ))
							{
								TaskComplition(TaskID,$("#TaskComplition").val());
							}												  				
    					}	
					}
					else if(RadioBtn == "Dependency")
					{
						var listName="EmpTimeSheet";			
						var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'TaskIDId':parseInt(TaskID),'ProjectIDId':parseInt(ProjectID),'ModuleIDId':parseInt(ModuleID),'ManagerIDId':parseInt(G_ManagerID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DependencyIDId':DependencyID,'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime};
						TimeSheetUniversalinsert(listName,item,);												
						ChangesInDependency($("#TaskComplition").val(),DependencyID);					
					}								
				}
			}
			else
			{
				alert("You already put the timesheet for period "+ErrorCase);
			}
		}
		else
		{
			alert("Enter all mandatory columns along with proper time interval.");
		}
	}
	else if(RadioBtn == "Project")
	{
		var ProjectID = $("#SelectedProject").val();
		var ModuleID = $("#ProjectModule").val();
		var ClientID = $("#ClientProject").val();
		var WorkType = $("#WorkTypeProj").val();
		var StartTime = $("#OtherstartTime").val();
		var EndTime = $("#OtherEndTime").val();
		var Details = $("#DetailsOther").val();
		var TimesheetDateStart= TimesheetDate +StartTime;
		var GetStartHH = new Date("01/01/2007 " + StartTime).getHours();		
		var GetStartMM = new Date("01/01/2007 " + StartTime).getMinutes();
		var AbsoluteTime = GetDDMMYYHHMM(Absolute,GetStartHH,GetStartMM);
		
		var ResStartTime= parseInt(GetStartHH*60+GetStartMM);		
		var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
		var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
		var ResEndTime= parseInt(GetEndHH*60+GetEndMM);		
		var TotalWorkingMM = parseInt(ResEndTime-ResStartTime);
		//G_TotalLoginHours = parseInt(G_TotalLoginHours + TotalWorkingMM)
		var CompanyID = Logged_CompanyId;
		var LoggedEmp = _spPageContextInfo.userId;			
		var TimesheetDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    		TimesheetDate= new Date(TimesheetDate);; 	
		
		if(ResEndTime > ResStartTime)
    	{
    		Validatetime(ResStartTime,ResEndTime);
    	 	if(G_TimeValidate == true)
    	 	{
    	 		if(Validations() == true)
    	 		{
					var listName="EmpTimeSheet";
					var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'ProjectIDId':parseInt(ProjectID),'ModuleIDId':parseInt(ModuleID),'ClientIDId':parseInt(ClientID),'ManagerIDId':parseInt(G_ManagerID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime};
					TimeSheetUniversalinsert(listName,item,);
				}
			}
			else
			{
				alert("You already put the timesheet for period "+ErrorCase);
			}
		}
		else
		{
			alert("Enter all mandatory columns along with proper time interval.");
		}
	}
	else if(RadioBtn == "General")
	{
		var ClientID = $("#ClientList").val();
		var WorkType = $("#WorkTypeProj").val();
		var StartTime = $("#OtherstartTime").val();
		var EndTime = $("#OtherEndTime").val();
		var Details = $("#DetailsOther").val();
		var TimesheetDateStart= TimesheetDate +StartTime;
		var GetStartHH = new Date("01/01/2007 " + StartTime).getHours();		
		var GetStartMM = new Date("01/01/2007 " + StartTime).getMinutes();
		
		var AbsoluteTime = GetDDMMYYHHMM(Absolute,GetStartHH,GetStartMM);
		
		var ResStartTime= parseInt(GetStartHH*60+GetStartMM);		
		var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
		var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
		var ResEndTime= parseInt(GetEndHH*60+GetEndMM);		
		var TotalWorkingMM = parseInt(ResEndTime-ResStartTime);
		//G_TotalLoginHours = parseInt(G_TotalLoginHours + TotalWorkingMM)

		var CompanyID = Logged_CompanyId;
		var LoggedEmp = _spPageContextInfo.userId;			
		var TimesheetDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    		TimesheetDate= new Date(TimesheetDate);; 	
    	if(ResEndTime > ResStartTime)
    	{
    		Validatetime(ResStartTime,ResEndTime);
    	 	if(G_TimeValidate == true)
    	 	{
    	 		if(Validations() == true)
    	 		{
					var listName="EmpTimeSheet";
					var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'ManagerIDId':parseInt(G_ManagerID),'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime};
					TimeSheetUniversalinsert(listName,item,);
				}
			}
			else
			{
				alert("You already put the timesheet for period "+ErrorCase);
			}
		}
		else
		{
			alert("Enter all mandatory columns along with proper time interval.");
		}	
	}
}


function ConvertDateTimeFormat(date, delimiter) 
{
    return date.split(delimiter)[1] + "" + delimiter + "" + date.split(delimiter)[0] + "" + delimiter + "" + date.split(delimiter)[2];
}


function TimeSheetUniversalinsert(listName,item) 
{	
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items",
		type: "POST",
		contentType: "application/json;odata=verbose",
		data: JSON.stringify(item),
		async: false,
		headers: 
		{
			"Accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		success: function (data)
		{	
			GetTotalLoginHours();			
			console.log("add success");
			alert("Data has been saved successfully.");
			Attendance(); 
			$(".timepicker").val("");
			$("#DetailsOther").val("");
			$("#Details").val("");
			//SetAttendanceDDL();
			
		},
		error: function (data)
		{	
			console.log("TimeSheetUniversalinsert"); 
			console.log(data); 
		}
	});
}


var G_TotalLoginHours=0;
function GetTotalLoginHours()
{
	var TimesheetDate = $("#timesheetEnter").val();
    var from = TimesheetDate.split("/");
    var f = new Date(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));
    var date_string = f.getFullYear() + "-" + (f.getMonth()+1) + "-" + f.getDate();
    GetHoliday4selectedDate(date_string);
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmpTimeSheet')/items?$select=*,TaskID/Title,ProjectID/Title,ClientID/Title&$expand=TaskID/Title,ProjectID/Title,ClientID/Title&$filter=AuthorId eq '"+_spPageContextInfo.userId+"' and DateOfWork eq '"+date_string+"'&$orderby=AbsoluteTime asc";  
	//var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmpTimeSheet')/items?$select=*,TaskID/Title,ProjectID/Title,ClientID/Title&$expand=TaskID/Title,ProjectID/Title,ClientID/Title&$filter=AuthorId eq '"+_spPageContextInfo.userId+"' and DateOfWork eq '"+date_string+"'";  
	$.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
		success: function (data) 
		{
		    var items = data.d.results;
            $("#DetailsHere").empty(); 
            HtmlDesign='';  
            if (items.length > 0) 
			{	$(".timesheet-entry-right-middle-box").css("display", "block");
				var TotalLoginMinutes=0;
				var k=0;
				for(k; k<items.length; k++)
				{
					TotalLoginMinutes=parseInt(TotalLoginMinutes)+parseInt(items[k].WorkHours);
					
					var ItemID = items[k].ID;
					var StartTime = items[k].StartTime;
					var EndTime = items[k].EndTime;
					var Type=items[k].TaskType;
					if(Type == "Task" || Type == "Dependency"){var Title = items[k].TaskID.Title;}
					else if(Type == "Project"){var Title = items[k].ProjectID.Title;}
					else if(Type == "General"){var Title = items[k].ClientID.Title;}
					
					if(items[k].Details != null){var Details = items[k].Details;}else{var Details ="";}
					var DesignTotalTime=items[k].WorkHours;
					var Designhours = Math.floor(DesignTotalTime/ 60);          
	    			var Designminutes = DesignTotalTime% 60;
	    			//var TotalTime = Designhours+":"+Designminutes ;
	    			
	    			var TotalTime = ConvertHHMM(DesignTotalTime);//Designhours+":"+Designminutes ;
	    			var EditDisplay="";
	    			var Verifiedstyle="";
		    		if(items[k].Verified == true)
					{
						EditDisplay= "none";
						Verifiedstyle ="block";
					}
					else
					{
						EditDisplay="inline-block";
						Verifiedstyle="none";
					}					
					GenerateDesign(ItemID,StartTime,EndTime,Type,Title,Details,TotalTime,EditDisplay,Verifiedstyle);
				}
				G_TotalLoginHours = TotalLoginMinutes;
								
				$("#TOTALHOURS").text(ConvertHHMM(TotalLoginMinutes));
				$("#DetailsHere").append(HtmlDesign); 				
			}
			else
			{
				$("#TOTALHOURS").text("00:00");
				$(".timesheet-entry-right-middle-box").css("display", "none");
				$("#AttendanceDDL").val('0');
								
			}
			SetAttendanceDDL();   
        },
		error: function (data) 
		{
			console.log("GetTotalLoginHours Function failed");  
			console.log(data);  
		}  
	});	
}


function ConvertHHMM(TotalMinutes)
{
	var hours = Math.floor(TotalMinutes/ 60);          
	var minutes = TotalMinutes% 60;
		if(hours<10)
		{
			hours="0"+hours;
		}
		
		if(minutes<10)
		{
			minutes = "0"+minutes;
		}
	
	var TimeFormat=hours+":"+minutes;	
	
	return TimeFormat;	
}

function GetDDMMYYHHMM(DDMMYYYY,HH,MM)
{
	var hours = HH;          
	var minutes = MM;
		if(hours<10)
		{
			hours="0"+hours;
		}
		
		if(minutes<10)
		{
			minutes = "0"+minutes;
		}
	
	var TimeFormat=DDMMYYYY+hours+minutes;	
	
	return TimeFormat;	
}



var HtmlDesign='';
function GenerateDesign(ItemID,StartTime,EndTime,Type,Title,Details,TotalTime,EditDisplay,Verifiedstyle)
{
	HtmlDesign = HtmlDesign+"<div class='col-md-12 col-sm-12 timesheet-entry-reply-box'>"+
		"<div class='timesheet-entry-reply-author-detail px-0'>"+
			"<span>"+
				"<span>"+StartTime+"</span> - <span>"+EndTime+"</span>"+
			"</span>"+
			"<span>"+TotalTime+" (HH:MM)</span>"+
		"</div>"+
		"<div class='timesheet-entry-page-title'>"+
			"<label class='font-12 m-0 mr-4'>"+Type+":</label>"+
			"<h4>"+Title+"</h4>"+
		"</div>"+
		"<h4>"+Details+"</h4>"+
		"<div class='col-md-12 col-md-12 pt-10 px-0'>"+
			"<span class='timesheet-entry-question-edit-button' style='DISPLAY: "+EditDisplay+"'><div ><a onclick='EditTimesheetEntry("+ItemID+")' ><i class='fa fa-pencil'></i> <p>Edit</p> </a></div> </span>"+ 
			"<span class='timesheet-entry-question-delete-button' style='DISPLAY: "+EditDisplay+"'><div ><a onclick='DeleteTimesheetEntry("+ItemID+")'><i class='fa fa-trash'></i> <p>Delete</p> </a></div> </span>"+
			"<span class='timesheet-entry-question-edit-button verifyed' style='DISPLAY: "+Verifiedstyle+"'><p style='color: green;'>Verified <i class='fa fa-check'></i></p></span>"+
		"</div>"+
	"</div>";
}


function DeleteTimesheetEntry(ItemID)
{
	if (confirm('Are you sure to delete this record?'))
	{
		$.ajax({  
        	url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpTimeSheet')/items("+ItemID+")",  
        	type: "POST",  
        	headers:  
        	{  
        	    "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        	    "IF-MATCH": "*",  
        	    "X-HTTP-Method": "DELETE"  
        	},  
        	success: function(data, status, xhr)  
        	{  
				GetTotalLoginHours();
				alert("Record has been successfully deleted");
				if(G_itemIDforUpdate == ItemID){
                    RestControls();
                    $("#startTime").val('');
                    $("#EndTime").val('');
                    $("#AttendanceDDL").val('0');
                }
				Attendance();  
        	},  
        	error: function(xhr, status, error)  
        	{  
        	    $("#ResultDiv").empty().text(data.responseJSON.error);  
        	}  
    	});
	}
}

var ConditionCount=0;
var Condition4TimesheetEntry=[]; 
function loadtaskinsearch()
{
	ConditionCount =0;
	TimeSheetUsageUrl = '';
	TimeSheetUsageData = [];
	var sTatuS = $('select#Status option:selected').val();
	var Newquery='';
	if($('select#Status option:selected').val() != "ALL")
	{
		ConditionCount = parseInt(ConditionCount)+1;
		//Newquery = "and TaskPriority eq '"+$('select#Priorityddl option:selected').val()+"' and ProjectID eq '"+$('select#ProjectList option:selected').val()+"' "
	}
	var WType ='';	
	if($('select#WorkTypeProjDDL option:selected').val() != "ALL")
	{
		WType = $('select#WorkTypeProjDDL option:selected').val();
		Newquery += "and Worktype eq '"+$('select#WorkTypeProjDDL option:selected').val()+"'";
		ConditionCount = parseInt(ConditionCount)+1;	
	}
	var ProjectNo='';
	if($('select#ProjectList option:selected').val() != "ALL")
	{
		ProjectNo = $('select#ProjectList option:selected').val();
		Newquery += "and ProjectID eq '"+$('select#ProjectList option:selected').val()+"'";
		ConditionCount = parseInt(ConditionCount)+1;	
	}
	var TaskPro='';
	if($('select#Priorityddl option:selected').val() != "ALL")
	{
		TaskPro = $('select#Priorityddl option:selected').val();
		Newquery += "and TaskPriority eq '"+$('select#Priorityddl option:selected').val()+"'";
		ConditionCount = parseInt(ConditionCount)+1;	
	}
	if($("#TaskName").val() != '')
	{
		Newquery += "and substringof('"+$('#TaskName').val()+"',Title)";
		ConditionCount = parseInt(ConditionCount)+1;
	}
	var AssignBy = ensureUser($('#ManagerName').children().children().attr('id'));
	if(ensureUser($('#ManagerName').children().children().attr('id')) != 0)
	{
		Newquery += "and AssignedBy eq '"+ensureUser($('#ManagerName').children().children().attr('id'))+"'";
		ConditionCount = parseInt(ConditionCount)+1;
	}
	
	console.log(ConditionCount);
	Condition4TimesheetEntry=[];
	Condition4TimesheetEntry.push({
    		//TaskAssignToId:_spPageContextInfo.userId,
       		CurrentPhase:'Open',
        	//Worktype:WType ,
           	//ProjectIDId:ProjectNo,
           	//TaskPriority:TaskPro,
           //	AssignedById:AssignBy,
		});

	if(sTatuS != "All")
	{
		TimeSheetUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?$select=*,AssignedBy/Title,AssignedBy/ID,Editor/Title,Module/Title,TaskManager/Title,ClientID/Title,ProjectID/Title&$expand=Module/Title,AssignedBy,ClientID/Title,TaskManager/Id,Editor/Id,ProjectID/Title&$filter=TaskAssignTo eq ('"+ _spPageContextInfo.userId +"') and CurrentPhase eq ('"+sTatuS +"')"+Newquery+"&$orderby=Title asc";  
	}
	else
	{
		TimeSheetUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?$select=*,AssignedBy/Title,AssignedBy/ID,Editor/Title,Module/Title,ClientID/Title,TaskManager/Title,ProjectID/Title&$expand=AssignedBy,Module/Title,TaskManager/Id,ClientID/Title,Editor/Id,ProjectID/Title&$filter=TaskAssignTo eq ('"+ _spPageContextInfo.userId +"')"+Newquery+"&$orderby=Title asc";  
	}
	RequestFilter();	
}

var TimeSheetUsageData = TimeSheetUsageData || [];
var TimeSheetUsageUrl = '';
function RequestFilter()
{	
	$.ajax({  
	url: TimeSheetUsageUrl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:true,  
	success: function (data) 
	{
		TimeSheetUsageData = TimeSheetUsageData.concat(data.d.results);           
		if (data.d.__next) 
        {
			TimeSheetUsageUrl = data.d.__next;
			RequestFilter();
		}
		else 
        {
        	if(ConditionCount != 6)
        	{
        		GenerateDtlTable(TimeSheetUsageData);
        	}
        	else
        	{
        		var SearchValue=[$("#TaskName").val()];
        		filtered = $.grep(TimeSheetUsageData, function(element, index){
    				return element.Title.indexOf(SearchValue[0]); 
				}, true);
				
				var AssignBy = ensureUser($('#ManagerName').children().children().attr('id'));
				var FilteredData = $.grep(filtered, function(v) {
    					return v.ProjectIDId == $('select#ProjectList option:selected').val() && v.AssignedById == AssignBy && v.CurrentPhase == $('select#Status option:selected').val() && v.Worktype == $('select#WorkTypeProjDDL option:selected').val() && v.TaskPriority == $('select#Priorityddl option:selected').val();
    			});
				var UserID = _spPageContextInfo.userId;					
				const filters = [UserID.toString()];
				const filteredResults = FilteredData.filter(Item =>
  					  filters.every(val => Item.TaskAssignToStringId.results.indexOf(val) > -1)
				);
				
				console.log(filteredResults);
				GenerateDtlTable(filteredResults);
				
				CloseMyCustomLoader();			        	
        	}           
		}		
	},
	error: function (jqXhr, textStatus, errorThrown)
	{		
    	console.log("Error in Loadtaskinsearch.");
    	console.log(jqXhr.responseJSON.error.message.value);
        var msg = jqXhr.responseJSON.error.message.value;
        var MsgResult =	msg.includes("it exceeds the list view");
        if(MsgResult == true)
        {
        	if(ConditionCount != 6)
        	{
        		alert("System found too many open tasks, which crossed the threshold limit. Recommended to define the desire task name or specific filter criteria.");
        	}
        	else
        	{	
        		OpenMyCustomLoader();
        		TimeSheetUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?$select=*,AssignedBy/Title,AssignedBy/ID,Editor/Title,Module/Title,ClientID/Title,TaskManager/Title,ProjectID/Title&$expand=AssignedBy,Module/Title,TaskManager/Id,ClientID/Title,Editor/Id,ProjectID/Title&$orderby=Title asc&$top=5000";  
				RequestFilter();
        	}        	
		}
	}
    });
}


function GenerateDtlTable(items)
{
	$(".mainDivAllAnnouncements").empty();
   	$("#TotalItemscount").text(items.length);
	var tableItemsHTML = "";
    if(items.length>0)
    {
	   	var ProjList=[];
      	var ProjID=[];            			
		for (var i = 0; i < items.length; i++) 
        {            	         	
          	var itemId = items[i].ID;            				
			var Title = items[i].Title;
			var ProjTitle = items[i].ProjectID.Title
			if(ProjTitle == undefined)
			{
				ProjTitle = "";					
			}
			else
			{
				ProjTitle = items[i].ProjectID.Title;
				ProjList.push(ProjTitle);
				ProjID.push(items[i].ProjectIDId);
			}
			var TaskPriority = items[i].TaskPriority;
			var CurrentPhase = items[i].CurrentPhase;				
			var TaskManager = '';
			if(items[i].AssignedBy.Title != undefined)
			{
				TaskManager = items[i].AssignedBy.Title;
			}				
			var CompletionPersent = 0;
			if(items[i].CompletionPersent != null)
			{
				CompletionPersent = items[i].CompletionPersent;
			}
			var DueDate=items[i]["DueDate"];
           	if (DueDate== null) 
           	    DueDate = "";
           	else
           	{
          		DueDate = new Date(DueDate);
           		DueDate = $.datepicker.formatDate('dd-M-yy', DueDate);
           	}      		                				
			tableItemsHTML += "<tr><td><input type='checkbox' class='TaskListchk' name='TaskListchk' value='"+itemId+"' onclick='onlyOne(this)'></td><td>" + Title + "</td><td>"+ProjTitle+"</td><td>"+TaskManager+"</td><td>"+TaskPriority+"</td><td>"+DueDate+"</td><td>"+CurrentPhase+"</td><td>"+CompletionPersent+"</td>";				
			tableItemsHTML +='</tr>';
		}			
	}
	else
    {
      	$(".mainDivAllAnnouncements").empty();
	}

	if (items.length == 0) 
	{
		$(".NoRecordFound").show();
	}
	else
    {
		$(".NoRecordFound").hide();
	}
    $(".mainDivAllAnnouncements").append(tableItemsHTML);
    if (items.length > 0) 
    {
       	TableConfiguration();					 // GenerateTableSharedWithMe();
	}
}


function Getprojects()
{
	var sTatuS = $('select#Status option:selected').val();	
	if(sTatuS != "All")
	{
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?$select=*,Module/Title,TaskManager/Title,ClientID/Title,ProjectID/Title&$expand=Module/Title,ClientID/Title,TaskManager/Id,ProjectID/Title&$filter=TaskAssignTo eq ('"+ _spPageContextInfo.userId +"') and CurrentPhase eq ('"+sTatuS +"')";  
	}
	else
	{
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?$select=*,Module/Title,ClientID/Title,TaskManager/Title,ProjectID/Title&$expand=Module/Title,TaskManager/Id,ClientID/Title,ProjectID/Title&$filter=TaskAssignTo eq ('"+ _spPageContextInfo.userId +"')";  
	}
	$.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
	success: function (data) 
	{	
		var items = data.d.results;    	
        if(items.length>0)
        {
        	var ProjList=[];
        	var ProjID=[];            			
			for (var i = 0; i < items.length; i++) 
            {            	         	
            	var itemId = items[i].ID;            				
				var ProjTitle = items[i].ProjectID.Title
				if(ProjTitle == undefined)
				{
					ProjTitle = "";					
				}
				else
				{
					ProjTitle = items[i].ProjectID.Title;
					ProjList.push(ProjTitle);
					ProjID.push(items[i].ProjectIDId);
				}				
			}
			$("#ProjectList").empty();
			var unique = ProjList.filter(function(itm, i, ProjList) {
    			return i == ProjList.indexOf(itm);
			});
			
			var uniqueID = ProjID.filter(function(itm, i, ProjID) {
    			return i == ProjID.indexOf(itm);
			});		
			
			$("#ProjectList").append($("<option></option>").val("ALL").html("ALL"));
			for(var k=0; k<uniqueID.length; k++)
			{
				$("#ProjectList").append($("<option></option>").val(uniqueID[k]).html(unique[k]));
			}            
		}
		else
		{
			$("#ProjectList").empty();
			$("#ProjectList").append($("<option></option>").val("ALL").html("ALL"));
		}		
	},
	error: function (data) 
	{
		console.log("Getprojects Function failed");  
		console.log(data);  
	}  
	});
}


function TableConfiguration()
{
    sorter = new TINY.table.sorter('sorter', 'TempTableQuestions', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
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
}


function onlyOne(checkbox) 
{
    var checkboxes = document.getElementsByName('TaskListchk')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}


function GetTaskfromGrid()
{
	var SelectedTaskID =  $('.TaskListchk:checked').val();
	if(SelectedTaskID != undefined)
	{
		G_TaskID = 	SelectedTaskID;
		GetTaskDtl(SelectedTaskID);
	}
}


function loadprojectinsearch()
{
	var ProjectsListunique='';
	var ProjectsList=[];
	var Projecturl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectTeamDetails')/items?$select=*&$filter=TeamMember eq ('"+ _spPageContextInfo.userId +"')&$orderby=Project asc";  
	$.ajax({  
		url: Projecturl,  
		headers: { Accept: "application/json;odata=verbose" },  
    	async:false,  
		success: function (data) 
		{
			var items = data.d.results;
			for(var x=0; x<items.length; x++)
			{
				ProjectsList.push(items[x].ProjectId);
			}		
				ProjectsListunique = ProjectsList.filter(function(itm, i, ProjectsList) {
    				return i == ProjectsList.indexOf(itm);
				});		
		},
		error: function (data) 
		{
			console.log("loadtaskinsearch Function failed");  
			console.log(data);  
		}  
	});	
	
	
	var UserProjectList=[];
	for(var K=0;K<ProjectsListunique.length; K++)
	{
		var PROJID=ProjectsListunique[K];		
		var sTatuS = $('select#StatusProj option:selected').val();
		var Department = $('select#DepartmentsProject option:selected').val();	
		if(sTatuS != "All")
		{
			if(Department == null){
				var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title,ClientID/Title&$expand=ManagerName/Id,ClientID/Title&$filter=Status eq ('"+sTatuS+"')and ID eq '"+PROJID+"' ";  
			}
			else {
				var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title,ClientID/Title&$expand=ManagerName/Id,ClientID/Title&$filter=Status eq ('"+sTatuS+"') and DepartmentName eq ('"+Department+"')and ID eq '"+PROJID+"' ";  
			}
		}
		else
		{
			if(Department == null){
				var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title,ClientID/Title&$expand=ManagerName/Id,ClientID/Title&$filter= ID eq '"+PROJID+"'";
			}
			else {
				var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title,ClientID/Title&$expand=ManagerName/Id,ClientID/Title&$filter=DepartmentName eq ('"+Department+"')and ID eq '"+PROJID+"'";
			}
		}
		$.ajax({  
			url: Ownurl,  
			headers: { Accept: "application/json;odata=verbose" },  
    		async:false,  
			success: function (data) 
			{
				var items = data.d.results;				    	    
    	    	if(items.length>0)
    	    	{
    	    		var ProjList=[];            			
					for (var i = 0; i < items.length; i++) 
    	    	    {            	         	
    	    	    	var itemId = items[i].ID;  
    	    	    	if(items[i].ProjectCode == null){
    	    	    		items[i].ProjectCode = '';
    	    	    	}          				
						var ProjectCode = items[i].ProjectCode;
						var ProjectName = items[i].ProjectName;
						var ManagerName = items[i].ManagerName.Title;
						var DepartmentName = items[i].DepartmentName;
						var Status = items[i].Status;
						var Client = items[i].ClientID.Title;				
						if(Client == undefined)
						{
							Client ='';
						}
						else
						{
							Client = items[i].ClientID.Title;
						}					
						UserProjectList.push([itemId,ProjectCode,ProjectName,ManagerName,DepartmentName,Status,Client]);				
					}           
				}
				else
        		{
        			$(".ProjectTables").empty();
				}        	
			},	
			error: function (data) 
			{
				console.log("loadprojectinsearch Function failed");  
				console.log(data);  
			}  
		});
	}
	
	var tableItemsHTML = "";
	if(UserProjectList.length>0)
	{
		$(".ProjectTables").empty();
		$("#TotalItemscountProject").text(UserProjectList.length);
		for(var t=0; t<UserProjectList.length; t++)
		{
			tableItemsHTML += "<tr><td><input type='checkbox' class='ProjectchkList' name='TaskListchk' value='"+UserProjectList[t][0]+"' onclick='onlyOne(this)'></td><td>"+UserProjectList[t][1]+"</td><td>"+UserProjectList[t][2]+"</td><td>"+UserProjectList[t][3]+"</td><td>"+UserProjectList[t][4]+"</td><td>"+UserProjectList[t][5]+"</td><td>"+UserProjectList[t][6]+"</td>";				
			tableItemsHTML +='</tr>';
		}		
		$(".ProjectTables").append(tableItemsHTML);
       	//TableConfigurationProject();		 // GenerateTableSharedWithMe(); 	
	}
	else
	{
		$(".ProjectTables").empty();
	}
	
	if (UserProjectList.length == 0) 
	{
		$(".NoRecordFound").show();
	}
	else
    {
		$(".NoRecordFound").hide();
	} 		
}

function TableConfigurationProject()
{
    sorter = new TINY.table.sorter('sorter', 'TempTableProject', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
        colddid: 'columns',
        currentid: 'currentpageProject',
        totalid: 'totalpagesProject',
        startingrecid: 'startrecord',
        endingrecid: 'endrecord',
        totalrecid: 'totalrecords',
        hoverid: 'selectedrow',
        pageddid: 'pagedropdownProject',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
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

function ReadDepartment()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?select=ID,Title&$filter=CompanyID eq '"+Logged_CompanyId+"'&$orderby=Title asc&$top=5000"; 
	$.ajax({  
    url: Ownurl,
    async:false,  
    headers: { Accept: "application/json;odata=verbose" },
    success: function (data) 
    { 
    	var items = data.d.results;  
    	if (items.length > 0) 
		{
			$("#SelectedItems").text("All");  
			$('#DepartmentsProject').empty();
			$("#DepartmentsProject").append($("<option></option>").val('Select').html('Select'));

			$('#DepartmentsDependency').empty();
			for (i = 0; i < items.length; i++) 
			{   				  
   				$("#DepartmentsProject").append($("<option></option>").val(items[i].Title).html(items[i].Title));
   				//DepartmentsDependency
   				$("#DepartmentsDependency").append($("<option></option>").val(items[i].Title).html(items[i].Title));
  			}
  			$("#DepartmentsProject").val('Select');
  			$("#DepartmentsDependency").val(Logged_DepartmentName);
  			
		}  
	},
	error: function (data) 
	{  
       	alert("An error occurred. Please try again.");  
	}  
    });  
}


function getworktype()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?select=ID,Title,CategoryType,CatogeryName&$filter=CategoryType eq 'Work Type' and Status eq 'Yes'&$orderby=CatogeryName asc"; 
	$.ajax({  
    url: Ownurl,
    async:false,  
    headers: { Accept: "application/json;odata=verbose" },
    success: function (data) 
    { 
    	var items = data.d.results;  
    	if (items.length > 0) 
		{
			$('#WorkTypeProjDDL').empty();
			$('#WorkTypeProj').empty();
			$("#WorkTypeProjDDL").append($("<option></option>").val("ALL").html("ALL"));
			$("#WorkTypeProj").append($("<option></option>").val("Select").html("-Select-"));

			for (i = 0; i < items.length; i++) 
			{   				  
   				$("#WorkTypeProj").append($("<option></option>").val(items[i].CatogeryName).html(items[i].CatogeryName));
   				$("#WorkTypeProjDDL").append($("<option></option>").val(items[i].CatogeryName).html(items[i].CatogeryName));
   				//WorkTypeProjDDL
  			}
		}  
	},
	error: function (data) 
	{  
       	alert("An error occurred. Please try again.");  
	}  
    });  
}

function GetprojectfromGrid()
{
	var SelectedProjectID =  $('.TaskListchk:checked').val();
	//var SelectedProjectID = $("input[type='radio'][name='projectselect']:checked").val()//  $('.ProjectchkList:checked').val();//
	if(SelectedProjectID != undefined)
	{
		$("#ProjectName"+SelectedProjectID).text();
		$("#ProjectList").empty();
		$("#ProjectList").append($("<option></option>").val(SelectedProjectID).html($("#ProjectName"+SelectedProjectID).text()));

		//$('#selectOther').prop( "disabled", true ); 
		GetProjectInfo(SelectedProjectID);
		$('#otherProjectSearch').modal('hide');
	}
	else
	{
		alert("Select One Project First.");
	}
}


function GetProjectInfo(ProjectId)
{
	var ProjectID = ProjectId;
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ManagerName/Title,ClientID/Title&$expand=ManagerName/Id,ClientID/Title&$filter=ID eq ('"+ProjectID+"')";
	$.ajax({  
		url: Ownurl,  
		headers: { Accept: "application/json;odata=verbose" },  
    	async:false,  
		success: function (data) 
		{	
			var items = data.d.results;		
    	    if(items.length>0)
    	    {
    	    	$('#ClientProject').empty(); 
				$('#ClientProject').append($("<option     />").val(items[0].ClientIDId).text(items[0].ClientID.Title));
				
				$('#SelectedProject').empty(); 
				$('#SelectedProject').append($("<option     />").val(items[0].ID).text(items[0].ProjectName));
				//$('#SelectedProject').val(items[0].ProjectName);
				$('#SelectedProject').prop( "disabled", true );        
    	    }        
			ProjectModules(ProjectID);       
		},
		error: function (data) 
		{
			console.log("GetProjectInfo Function failed");  
			console.log(data);  
		}  
	});	
}


function ProjectModules(ProjectID)
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectModules')/items?$select=*&$filter=Project eq ('"+ProjectID+"')";
	$.ajax({  
		url: Ownurl,  
		headers: { Accept: "application/json;odata=verbose" },  
    	async:false,  
		success: function (data) 
		{
			var items = data.d.results;		
    	    if(items.length>0)
    	    {	
    	    	$('#ProjectModule').empty();
    	    	$("#ProjectModule").append($("<option class='Time_"+classname+"'></option>").val("Select").html("-Select-")); 
    	    	for (i = 0; i < items.length; i++) 
				{  	var classname = items[i].Status;
					if(items[i].Status != "Active")
					{
						var STATUS = items[i].Title + " ("+items[i].Status+")"; 				
					} 				  
					else
					{
						var STATUS = items[i].Title;
					}
   					$("#ProjectModule").append($("<option class='Time_"+classname+"'></option>").val(items[i].ID).html(STATUS));
  				}
    	    }
    	    else
    	    {
    	    	$("#ProjectModule").append($("<option class='Time_"+classname+"'></option>").val("Select").html("-Select-")); 
			}       
		},
		error: function (data) 
		{
			console.log("GetProjectInfo  Function failed");  
			console.log(data);  
		}  
	});
}


function loadclientinsearch()
{
	var sTatuS = $('select#ClientsList option:selected').val();	
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items?$select=*&$top=5000&$filter=IsActive eq ('"+sTatuS+"') and CompanyID eq ('"+Logged_CompanyId+"')";  

	$.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
	success: function (data) 
	{
		var items = data.d.results;
		$(".ClientTables").empty();
    	$("#TotalItemscountClients").text(items.length);
        var tableItemsHTML = "";
        if(items.length>0)
        {         			
			for (var i = 0; i < items.length; i++) 
            {            	         	
            	var itemId = items[i].ID;            				
				var Code = items[i].Client_Code;
				var Title = items[i].Title;
				var Attn_Name = items[i].Attn_Name;
				var Status = items[i].IsActive;
				if(Status == true)
				{
					Status = "Active";
				}
				else
				{
					Status = "Inactive";
				}
				var dtl=[];
				dtl.push(itemId,Title);			

				tableItemsHTML += "<tr><td><input type='checkbox' class='ClientchkList' name='TaskListchk' value='"+dtl+"' onclick='onlyOne(this)'></td><td>"+Code+"</td><td>"+Title+"</td><td>"+Attn_Name+"</td><td>"+Status+"</td>";				
				tableItemsHTML +='</tr>';
			}			
		}
		else
        {
        	$(".ClientTables").empty();
		}

		if (items.length == 0) 
		{
			$(".NoRecordFound").show();
		}
		else
        {
			$(".NoRecordFound").hide();
		}
        
        $(".ClientTables").append(tableItemsHTML);
      	TableConfigurationClients();					 // GenerateTableSharedWithMe();        
	},
	error: function (data) 
	{
		console.log("loadprojectinsearch Function failed");  
		console.log(data);  
	}  
	});
}

//This code runs when task created by External users to find Client name of logged in guest user
function getExternalClient(){
    var Query = "?$select=LoginName/EMail,Client_Name/Title,Client_Name/Id&$expand=LoginName,Client_Name&$filter=LoginName/EMail eq '"+_spPageContextInfo.userEmail+"'&$top=5000";
    dfds = $.Deferred();
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items/" + Query;
    $.when(getItems(url, dfds)).done(function (ExtResults) {
        response = [];
        if (ExtResults.length > 0) {
            ClientName = ExtResults[0].Client_Name.Title.trim();
            $("#ClientList").html('');
            var value ='<option value="'+ ExtResults[0].Client_Name.Id +'" Selected>'+ ExtResults[0].Client_Name.Title.trim() +'</option>';
            $("#ClientList").append(value);
        }
    });
}
var response = response || [];
//Get details from SP list above 5000
function getItems(url, dfds) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function (data) {

            response = response.concat(data.d.results);
            if (data.d.__next) {
                url = data.d.__next;
                getItems(url, dfds);
            }
            else {
                dfds.resolve(response);
            }
        },
        error: function (error) {
            dfds.reject(error)
            console.log(error);
        }
    })
    return dfds.promise()
}

function TableConfigurationClients()
{
    sorter = new TINY.table.sorter('sorter', 'TableClients', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
        colddid: 'columns',
        currentid: 'currentpageClient',
        totalid: 'totalpagesClient',
        startingrecid: 'startrecord',
        endingrecid: 'endrecord',
        totalrecid: 'totalrecords',
        hoverid: 'selectedrow',
        pageddid: 'pagedropdownClient',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
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


function GetclientfromGrid()
{
	var SelectedClient =  $('.ClientchkList:checked').val();
	if(SelectedClient != undefined)
	{
		var SelectedClientID = SelectedClient.split(",")[0];
		var SelectedClientName = SelectedClient.split(",")[1];	
		
		$('#ClientList').empty(); 
		$('#ClientList').append($("<option     />").val(SelectedClientID).text(SelectedClientName));
		$('#ClientList').prop( "disabled", true ); 	     
		$('#selectOther').prop( "disabled", true );
	}
}

function RestControls()
{
	G_itemIDforUpdate="";
	$("#NewSubmit").show();
	$("#Update").hide();
	$('#selectOther').prop( "disabled", false );
	$('#DetailsOther').val("");
	$("#barVal").text('0%');
	$("#TaskComplition").val('0');	
	
	$(".ResetCTRL").empty();
	$(".ResetCTRL").val("");
	//$(".DependencyDIV").css("display", "none"); 
}

var TaskID4Update='0';
var G_itemIDforUpdate='';
function EditTimesheetEntry(EditItmID)
{
	TaskID4Update =0;
	G_itemIDforUpdate=EditItmID;
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmpTimeSheet')/items?$select=*,TaskID/Title,ModuleID/Title,ProjectID/Title,ClientID/Title&$expand=TaskID/Title,ModuleID/Title,ProjectID/Title,ClientID/Title&$filter=ID eq '"+EditItmID+"' ";  
	$.ajax({  
		url: Ownurl,  
		headers: { Accept: "application/json;odata=verbose" },  
		async:false,  
		success: function (data) 
		{	
			var items = data.d.results;
			if (items.length > 0)         
			{	$("#NewSubmit").hide();
				//$("#Update").show();
				
				if(items[0].Verified == true)
					{
						$("#Update").hide();
					}
					else
					{
						$("#Update").show();
					}		

				
				if(items[0].WorkType == "Task" || items[0].WorkType == "Dependency")
				{
					
					$("input[name=timesheetEntry][value='1']").prop("checked",true);
					$("#timesheetEntry-box-2").css("display", "none");
					$("#timesheetEntry-box-1").css("display", "block");
					$("#TaskComplitionDiv").css("display", "block");
					if(items[0].WorkType == "Dependency")
					{
						$("#TaskComplitionDiv").css("display", "block");
					}
				}
				else 
				{
					$("input[name=timesheetEntry][value='2']").prop("checked",true);
					$("#timesheetEntry-box-1").css("display", "none");
					$("#timesheetEntry-box-2").css("display", "block");
					
				}		
			
				if(items[0].WorkType == "Task" || items[0].WorkType == "Dependency")
				{
					$('#selectByTask').prop( "disabled", true );				
					$('#selectByTask').val(items[0].TaskID.Title);
					TaskID4Update = items[0].TaskIDId;
					
					if(items[0].DependencyIDId != null && items[0].DependencyIDId != "0" )
					{
						GetDependency(items[0].TaskIDId);
						$("input[name=timesheetEntry][value='3']").prop("checked",true);
						$("#TaskSearchBtn").css("display", "none");
						//$("#timesheetEntry-box-1").show('slow');
						$('.DependencyDIV').show();						
					}
					else
					{
						//$('.toHide').hide();
						$('.DependencyDIV').hide();
						$("#TaskSearchBtn").css("display", "block");
						
						$("#timesheetEntry-box-1").show('slow');
						$("input[name=timesheetEntry][value='1']").prop("checked",true);
					}
					
					$('#Project').empty(); 
					$('#Project').append($("<option     />").val(items[0].ProjectIDId).text(items[0].ProjectID.Title));  				
  				
  					$('#Module').empty(); 
					$('#Module').append($("<option     />").val(items[0].ModuleIDId).text(items[0].ModuleID.Title));
	
  					$('#Client').empty(); 
					$('#Client').append($("<option     />").val(items[0].ClientIDId).text(items[0].ClientID.Title));
	
					$('#BTProjectWorkType').empty(); 
					$('#BTProjectWorkType').append($("<option     />").val(items[0].Work_Type).text(items[0].Work_Type));
					
					if(items[0].DependencyIDId != null)
					{
						$('#DependencyDDL').val(items[0].DependencyIDId);
					} 
				
					$('#Details').val(items[0].Details);
					$('#startTime').val(items[0].StartTime);
					$('#EndTime').val(items[0].EndTime);
					//$('#TaskComplition').val();
					if(items[0].WorkType == "Task")
					{
						$("#barVal").text(items[0].CompletionPersent+'%');
						$("#TaskComplition").val(items[0].CompletionPersent);			
					}
				}
				else if(items[0].WorkType == "Other")
				{
					if(items[0].TaskType == "Project")
					{	
						$(".OtGeneral").removeClass('d-block');
						$(".OtGeneral").addClass('d-none');
						$(".OtProject").removeClass('d-none');
						$(".OtProject").addClass('d-block');			
			
						ProjectModules(items[0].ProjectIDId);
						$('#selectOther').val(items[0].TaskType);
						$('#selectOther').prop( "disabled", true );
					
						$('#SelectedProject').empty(); 
						$('#SelectedProject').append($("<option     />").val(items[0].ProjectIDId).text(items[0].ProjectID.Title)); 
						$('#SelectedProject').prop( "disabled", true );					
					
						$('#ProjectModule').val(items[0].ModuleIDId);
					
						$('#ClientProject').empty(); 
						$('#ClientProject').append($("<option     />").val(items[0].ClientIDId).text(items[0].ClientID.Title)); 
						$('#WorkTypeProj').val(items[0].Work_Type);
					
						$('#OtherstartTime').val(items[0].StartTime);
						$('#OtherEndTime').val(items[0].EndTime);
						$('#DetailsOther').val(items[0].Details);				
					}
					else if(items[0].TaskType == "General")
					{
						$(".OtGeneral").removeClass('d-none');
						$(".OtGeneral").addClass('d-block');
						$(".OtProject").removeClass('d-block');
						$(".OtProject").addClass('d-none');
						
						$('#selectOther').val(items[0].TaskType);
						$('#selectOther').prop( "disabled", true );
					
						$('#ClientList').append($("<option     />").val(items[0].ClientIDId).text(items[0].ClientID.Title));
						$('#ClientList').prop( "disabled", true );
					
						$('#WorkTypeProj').val(items[0].Work_Type);
						
						$('#OtherstartTime').val(items[0].StartTime);
						$('#OtherEndTime').val(items[0].EndTime);
						$('#DetailsOther').val(items[0].Details);				
					}			
				}			
			}				 
		},
		error: function (data) 
		{
			console.log("EditTimesheetEntry Function failed");  
			console.log(data);  
		}  
	});
}


function UpdateTimeSheet()
{
	if(G_Validateholiday4timesheet == true)
	{
		if (confirm('The selected date is a Holiday, are you sure to submit your timesheet?')) 
		{
			SendData4update();
		
   		}								
	}
	else
	{
		SendData4update();
				
	}             
	/*var TimesheetDate = $("#timesheetEnter").val();
	var Absolute = Convertdateformat(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));
	var radioValue = $("input[name=timesheetEntry]:checked").val();
	var workon = '';
	if(radioValue == "1" || radioValue == "3")
	{
		if(radioValue == "3")
		{
			workon = "Dependency";
			RadioBtn = "Dependency";
		}
		else
		{
			workon = "Task";
			RadioBtn = "Task";
		}	
	}
	else
	{
		RadioBtn=$("#selectOther").val();
		workon = "Other";
	}
	if(RadioBtn == "Task" || RadioBtn == "Dependency")
	{	
		var TaskTitle = $("#selectByTask").val();
		var DependencyID="";
			if(radioValue == "3")
			{
				DependencyID = $("#DependencyDDL").val();
			}
			else
			{
				DependencyID=0;
			}			
		var ProjectID = $("#Project").val();
		var ModuleID = $("#Module").val();
		var ClientID = $("#Client").val();
		var WorkType = $("#BTProjectWorkType").val();
		var StartTime = $("#startTime").val();
		var EndTime = $("#EndTime").val();
		var Details = $("#Details").val();
		var TimesheetDateStart= TimesheetDate +StartTime;
		var GetStartHH = new Date("01/01/2007 " + StartTime).getHours();		
		var GetStartMM = new Date("01/01/2007 " + StartTime).getMinutes();
		var AbsoluteTime = GetDDMMYYHHMM(Absolute,GetStartHH,GetStartMM);
		
		var ResStartTime= parseInt(GetStartHH*60+GetStartMM);		
		var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
		var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
		var ResEndTime= parseInt(GetEndHH*60+GetEndMM);		
		var TotalWorkingMM = parseInt(ResEndTime-ResStartTime);
		var CompanyID = Logged_CompanyId;
		var LoggedEmp = _spPageContextInfo.userId;			
		var TimesheetDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    		TimesheetDate= new Date(TimesheetDate);; 	
    	if(ResEndTime > ResStartTime)
    	{	
    	 	Validatetime(ResStartTime,ResEndTime,);
    	 	if(G_TimeValidate == true)
    	 	{
    	 		if(Validations() == true)
    	 		{    	 			
					var listName="EmpTimeSheet";			
					//var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'TaskIDId':parseInt(TaskID),'ProjectIDId':parseInt(ProjectID),'ModuleIDId':parseInt(ModuleID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'TaskType':RadioBtn,'WorkType':workon};
					var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'ProjectIDId':parseInt(ProjectID),'ModuleIDId':parseInt(ModuleID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'DependencyIDId':DependencyID,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime};
					TimeSheetUniversalUpdate(listName,item,G_itemIDforUpdate);
				}
			}
			else
			{
				alert("You already put the timesheet for period "+ErrorCase);
			}
		}
		else
		{
			alert("Enter all mandatory columns along with proper time interval.");
		}
	}
	else if(RadioBtn == "Project")
	{
		var ProjectID = $("#SelectedProject").val();
		var ModuleID = $("#ProjectModule").val();
		var ClientID = $("#ClientProject").val();
		var WorkType = $("#WorkTypeProj").val();
		var StartTime = $("#OtherstartTime").val();
		var EndTime = $("#OtherEndTime").val();
		var Details = $("#DetailsOther").val();
		var TimesheetDateStart= TimesheetDate +StartTime;
		var GetStartHH = new Date("01/01/2007 " + StartTime).getHours();		
		var GetStartMM = new Date("01/01/2007 " + StartTime).getMinutes();
		var AbsoluteTime = GetDDMMYYHHMM(Absolute,GetStartHH,GetStartMM);
		
		var ResStartTime= parseInt(GetStartHH*60+GetStartMM);		
		var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
		var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
		var ResEndTime= parseInt(GetEndHH*60+GetEndMM);		
		var TotalWorkingMM = parseInt(ResEndTime-ResStartTime);
		var CompanyID = Logged_CompanyId;
		var LoggedEmp = _spPageContextInfo.userId;			
		var TimesheetDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    		TimesheetDate= new Date(TimesheetDate);; 	
    	if(ResEndTime > ResStartTime)
    	{
    		Validatetime(ResStartTime,ResEndTime);
    	 	if(G_TimeValidate == true)
    	 	{   
    	 		if(Validations() == true)
    	 		{			
					var listName="EmpTimeSheet";
					var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'ProjectIDId':parseInt(ProjectID),'ModuleIDId':parseInt(ModuleID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime};
					TimeSheetUniversalUpdate(listName,item,G_itemIDforUpdate);
				}
			}
			else
			{
				alert("You already put the timesheet for period "+ErrorCase);
			}
		}
		else
		{
			alert("Enter all mandatory columns along with proper time interval.");
		}
	}
	else if(RadioBtn == "General")
	{
		var ClientID = $("#ClientList").val();
		var WorkType = $("#WorkTypeProj").val();
		var StartTime = $("#OtherstartTime").val();
		var EndTime = $("#OtherEndTime").val();
		var Details = $("#DetailsOther").val();
		var TimesheetDateStart= TimesheetDate +StartTime;
		var GetStartHH = new Date("01/01/2007 " + StartTime).getHours();		
		var GetStartMM = new Date("01/01/2007 " + StartTime).getMinutes();
		var AbsoluteTime = GetDDMMYYHHMM(Absolute,GetStartHH,GetStartMM);
		
		var ResStartTime= parseInt(GetStartHH*60+GetStartMM);		
		var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
		var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
		var ResEndTime= parseInt(GetEndHH*60+GetEndMM);		
		var TotalWorkingMM = parseInt(ResEndTime-ResStartTime);
		var CompanyID = Logged_CompanyId;
		var LoggedEmp = _spPageContextInfo.userId;			
		var TimesheetDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    		TimesheetDate= new Date(TimesheetDate);; 	
    	if(ResEndTime > ResStartTime)
    	{
    		Validatetime(ResStartTime,ResEndTime);
    	 	if(G_TimeValidate == true)
    	 	{   
    	 		if(Validations() == true)
    	 		{			
					var listName="EmpTimeSheet";
					var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime};
					TimeSheetUniversalUpdate(listName,item,G_itemIDforUpdate);
				}
			}
			else
			{
				alert("You already put the timesheet for period "+ErrorCase);
			}
		}
		else
		{
			alert("Enter all mandatory columns along with proper time interval.");
		}	
	}*/
}

function SendData4update()
{
var TimesheetDate = $("#timesheetEnter").val();
	var Absolute = Convertdateformat(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));
	var radioValue = $("input[name=timesheetEntry]:checked").val();
	var workon = '';
	if(radioValue == "1" || radioValue == "3")
	{
		if(radioValue == "3")
		{
			workon = "Dependency";
			RadioBtn = "Dependency";
		}
		else
		{
			workon = "Task";
			RadioBtn = "Task";
		}	
	}
	else
	{
		RadioBtn=$("#selectOther").val();
		workon = "Other";
	}
	if(RadioBtn == "Task" || RadioBtn == "Dependency")
	{	
		var TaskTitle = $("#selectByTask").val();
		var DependencyID="";
			if(radioValue == "3")
			{
				DependencyID = $("#DependencyDDL").val();
			}
			else
			{
				DependencyID=0;
			}			
		var ProjectID = $("#Project").val();
		var ModuleID = $("#Module").val();
		var ClientID = $("#Client").val();
		var WorkType = $("#BTProjectWorkType").val();
		var StartTime = $("#startTime").val();
		var EndTime = $("#EndTime").val();
		var Details = $("#Details").val();
		var TimesheetDateStart= TimesheetDate +StartTime;
		var GetStartHH = new Date("01/01/2007 " + StartTime).getHours();		
		var GetStartMM = new Date("01/01/2007 " + StartTime).getMinutes();
		var AbsoluteTime = GetDDMMYYHHMM(Absolute,GetStartHH,GetStartMM);
		
		var ResStartTime= parseInt(GetStartHH*60+GetStartMM);		
		var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
		var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
		var ResEndTime= parseInt(GetEndHH*60+GetEndMM);		
		var TotalWorkingMM = parseInt(ResEndTime-ResStartTime);
		var CompanyID = Logged_CompanyId;
		var LoggedEmp = _spPageContextInfo.userId;			
		var TimesheetDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    		TimesheetDate= new Date(TimesheetDate);; 	
    	if(ResEndTime > ResStartTime)
    	{	
    	 	Validatetime(ResStartTime,ResEndTime,);
    	 	if(G_TimeValidate == true)
    	 	{
    	 		if(Validations() == true)
    	 		{   
    	 			if(RadioBtn == "Task")
    	 			{
    	 				var listName="EmpTimeSheet";			
						var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'ProjectIDId':parseInt(ProjectID),'ModuleIDId':parseInt(ModuleID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'DependencyIDId':DependencyID,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime,'CompletionPersent':$("#TaskComplition").val()};
						TimeSheetUniversalUpdate(listName,item,G_itemIDforUpdate);
						
						if(TaskID4Update != 0)
						{
    	 					var QueryReq = "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items('"+TaskID4Update+"')";					
    						var QueryResult = getdata(QueryReq);
    						
    						if(QueryResult.d.CurrentPhase == 'Open')
    						{
    							var Modified = QueryResult.d.CompletionDate;
    								Modified  = moment(Modified).format('YYYY-MM-DD');
    							var ActionDate = new Date(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));
    								ActionDate = moment(ActionDate).format('YYYY-MM-DD');
    							if(Date.parse(ActionDate)>=Date.parse(Modified ))
								{
									TaskComplition(TaskID4Update,$("#TaskComplition").val());
								}												  				
    						}   	 			
    	 				}
    	 			}
    	 			else if(RadioBtn == "Dependency")
    	 			{ 	 			
						var listName="EmpTimeSheet";			
						var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'ProjectIDId':parseInt(ProjectID),'ModuleIDId':parseInt(ModuleID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'DependencyIDId':DependencyID,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime};
						TimeSheetUniversalUpdate(listName,item,G_itemIDforUpdate);
						
						ChangesInDependency($("#TaskComplition").val(),DependencyID);
						
					}
				}
			}
			else
			{
				alert("You already put the timesheet for period "+ErrorCase);
			}
		}
		else
		{
			alert("Enter all mandatory columns along with proper time interval.");
		}
	}
	else if(RadioBtn == "Project")
	{
		var ProjectID = $("#SelectedProject").val();
		var ModuleID = $("#ProjectModule").val();
		var ClientID = $("#ClientProject").val();
		var WorkType = $("#WorkTypeProj").val();
		var StartTime = $("#OtherstartTime").val();
		var EndTime = $("#OtherEndTime").val();
		var Details = $("#DetailsOther").val();
		var TimesheetDateStart= TimesheetDate +StartTime;
		var GetStartHH = new Date("01/01/2007 " + StartTime).getHours();		
		var GetStartMM = new Date("01/01/2007 " + StartTime).getMinutes();
		var AbsoluteTime = GetDDMMYYHHMM(Absolute,GetStartHH,GetStartMM);
		
		var ResStartTime= parseInt(GetStartHH*60+GetStartMM);		
		var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
		var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
		var ResEndTime= parseInt(GetEndHH*60+GetEndMM);		
		var TotalWorkingMM = parseInt(ResEndTime-ResStartTime);
		var CompanyID = Logged_CompanyId;
		var LoggedEmp = _spPageContextInfo.userId;			
		var TimesheetDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    		TimesheetDate= new Date(TimesheetDate);; 	
    	if(ResEndTime > ResStartTime)
    	{
    		Validatetime(ResStartTime,ResEndTime);
    	 	if(G_TimeValidate == true)
    	 	{   
    	 		if(Validations() == true)
    	 		{			
					var listName="EmpTimeSheet";
					var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'ProjectIDId':parseInt(ProjectID),'ModuleIDId':parseInt(ModuleID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime};
					TimeSheetUniversalUpdate(listName,item,G_itemIDforUpdate);
				}
			}
			else
			{
				alert("You already put the timesheet for period "+ErrorCase);
			}
		}
		else
		{
			alert("Enter all mandatory columns along with proper time interval.");
		}
	}
	else if(RadioBtn == "General")
	{
		var ClientID = $("#ClientList").val();
		var WorkType = $("#WorkTypeProj").val();
		var StartTime = $("#OtherstartTime").val();
		var EndTime = $("#OtherEndTime").val();
		var Details = $("#DetailsOther").val();
		var TimesheetDateStart= TimesheetDate +StartTime;
		var GetStartHH = new Date("01/01/2007 " + StartTime).getHours();		
		var GetStartMM = new Date("01/01/2007 " + StartTime).getMinutes();
		var AbsoluteTime = GetDDMMYYHHMM(Absolute,GetStartHH,GetStartMM);
		
		var ResStartTime= parseInt(GetStartHH*60+GetStartMM);		
		var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
		var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
		var ResEndTime= parseInt(GetEndHH*60+GetEndMM);		
		var TotalWorkingMM = parseInt(ResEndTime-ResStartTime);
		var CompanyID = Logged_CompanyId;
		var LoggedEmp = _spPageContextInfo.userId;			
		var TimesheetDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    		TimesheetDate= new Date(TimesheetDate);; 	
    	if(ResEndTime > ResStartTime)
    	{
    		Validatetime(ResStartTime,ResEndTime);
    	 	if(G_TimeValidate == true)
    	 	{   
    	 		if(Validations() == true)
    	 		{			
					var listName="EmpTimeSheet";
					var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':"TimeSheet", 'CompanyIDId':parseInt(CompanyID),'ClientIDId':parseInt(ClientID),'Work_Type':WorkType,'WorkHours':TotalWorkingMM.toString(),'Details':Details,'StartTime':StartTime,'EndTime':EndTime,'EndTimeMM':ResEndTime.toString(),'StartTimeMM':ResStartTime.toString(),'DateOfWork':TimesheetDate,'EmployeeId':LoggedEmp,'TaskType':RadioBtn,'WorkType':workon,'AbsoluteTime':AbsoluteTime};
					TimeSheetUniversalUpdate(listName,item,G_itemIDforUpdate);
				}
			}
			else
			{
				alert("You already put the timesheet for period "+ErrorCase);
			}
		}
		else
		{
			alert("Enter all mandatory columns along with proper time interval.");
		}	
	}



}


function TimeSheetUniversalUpdate(listName,item,dataid)  
{
	$.ajax({  
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items('"+dataid+"')",
        type: "POST",  
        async:true,
        data: JSON.stringify(item),         
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr)
        { 	
        GetTotalLoginHours();
        	Attendance();
        	console.log("Update success");
        	
        	$(".timepicker").val("");
			$("#DetailsOther").val("");
			$("#Details").val("");

			
			SetAttendanceDDL();
			RestControls();

         },  
        error: function(data) 
        {  
			console.log(data);      	
            alert ("An error occurred. Please contact your system administrator / Refresh a WebPage !");
        }  
    });     
}
 
function SetDDL()
{
	$("#ProjectList").val("ALL");
 	$("#Priorityddl").val("ALL");
 	Getprojects(); 
}


function ResetProjectFilter()
{
	//$("#DepartmentsProject").val('Select');
	//GetAllProjects();

}

var ErrorCase = ''; 
var G_TimeValidate='';
function Validatetime(START,END)
{
	var TimesheetDate = $("#timesheetEnter").val();
    var from = TimesheetDate.split("/");
    //var f = new Date(from[2], from[1], from[0]);
    var f = new Date(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));

    var date_string = f.getFullYear() + "-" + (f.getMonth()+1) + "-" + f.getDate();    
    var NewStart = START ;
    var NewEnd = END;	
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmpTimeSheet')/items?$select=*,TaskID/Title,ProjectID/Title,ClientID/Title&$expand=TaskID/Title,ProjectID/Title,ClientID/Title&$filter=(AuthorId eq '"+_spPageContextInfo.userId+"' and DateOfWork eq '"+date_string+"') ";  
	$.ajax({  
		url: Ownurl,  
    	headers: { Accept: "application/json;odata=verbose" },  
    	async:false,  
		success: function (data) 
		{	
			var items = data.d.results;
    	    if (items.length > 0) 
			{				
				for(var p=0; p<items.length; p++)
				{
					if((      NewStart >= parseInt(items[p].EndTimeMM) &&  NewEnd >= parseInt(items[p].EndTimeMM)      )  ||    (    NewStart <= parseInt(items[p].StartTimeMM) &&  NewEnd <= parseInt(items[p].StartTimeMM)    ) )
					{
						G_TimeValidate = true;						
					}
					else
					{
						if(G_itemIDforUpdate != "")
						{
							if(items[p].ID == G_itemIDforUpdate)
							{
								G_TimeValidate = true;
							}
							else
							{
								G_TimeValidate = false;
							var StartTime = items[p].StartTime;
							var EndTime = items[p].EndTime;
								ErrorCase = StartTime +" - "+ EndTime;
							break;

								
							}
						}
						else
						{
							G_TimeValidate = false;
							var StartTime = items[p].StartTime;
							var EndTime = items[p].EndTime;
								ErrorCase = StartTime +" - "+ EndTime;
							break;
						}						
					}				
				}					
			}
			else
			{
				G_TimeValidate = true;
			}
		},
		error: function (data) 
		{
			console.log("Validatetime Function failed");  
			console.log(data);  
		}  
	});
}


function Attendance()
{
    var LoggedEmp = _spPageContextInfo.userId;     
    var AttDate = $("#timesheetEnter").val();
    var Attfrom = AttDate.split("/");
    var attf = new Date(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));
    //var attf = new Date(Attfrom[2], Attfrom[1], Attfrom[0]);
    //var Attdate_string = attf.getFullYear() + "-" + (attf.getMonth()+1) + "-" + attf.getDate();
    //var Attdate_string = moment(attf).format('YYYY-MM-DD');        
    var Attdate_string = Attfrom[2]+"-"+Attfrom[1]+"-"+Attfrom[0];         
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbyid('40ac6955-09d1-479a-af41-3d696cd1d0e6')/items?$filter=EmployeeId eq '"+LoggedEmp+"' and AttendanceDate eq '"+Attdate_string+"'  ";  
    $.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
		success: function (data) 
		{
			var items = data.d.results;  
            if (items.length > 0) 
			{  
                var ID=items[0].ID;
                UpdateAttendance(ID);								
            }
            else
            {
            	SetAttendance();
			}  
		},
		error: function (data) 
		{  
        	console.log("Attendance function failed");
            console.log(data);
		}  
	});
}


function UpdateAttendance(ID)  
{	

	var AttendanceDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
    	AttendanceDate= new Date(AttendanceDate);; 
    var LoggedEmp = _spPageContextInfo.userId; 
    if($("#AttendanceDDL").val() != "0")
    {  
		$.ajax({  
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpAttendance')/items('"+ID+"')",
        type: "POST",
         async:false,   
        data: JSON.stringify  
        ({  
            __metadata:  
            {  
                type: "SP.Data.EmpAttendanceListItem"  
            },  
            Title: "Attendance",  
            EmployeeId:LoggedEmp,
            WorkHours:G_TotalLoginHours.toString(),
            ManagerIDId:parseInt(G_ManagerID),
            AttendanceType:$("#AttendanceDDL").val(),
            AttendanceDate:AttendanceDate
        }),  
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

            console.log("Attendance has been saved.");
        },  
        error: function(data)  
        {  
            console.log("UpdateAttendance function failed");
            console.log(data);
        }  
    	});
    }
    else
    {    
    	alert("Please select attandence type");
    }
 }
 
 
function SetAttendance()
{
	var AttendanceDate= ConvertDateTimeFormat($("#timesheetEnter").val(), '/')
   		AttendanceDate= new Date(AttendanceDate);; 
    var LoggedEmp = _spPageContextInfo.userId;
    //if($("#AttendanceDDL").val() != "0")
    //{
    	$.ajax({  
     	url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpAttendance')/items",  
        type: "POST",
        async:false,  
        data: JSON.stringify  
        ({  
            __metadata:{  type: "SP.Data.EmpAttendanceListItem"  },  
            Title: "Attendance",  
            EmployeeId:LoggedEmp,
            WorkHours:G_TotalLoginHours.toString(),
            ManagerIDId:parseInt(G_ManagerID),
            AttendanceType:$("#AttendanceDDL").val(),
            AttendanceDate:AttendanceDate            
        }),  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "X-HTTP-Method": "POST"  
        },  
        success: function(data, status, xhr)  
        {  
            //alert("Attendance has been saved.");
            console.log("Attendance has been saved");
        },  
        error: function(data)  
        {  
            console.log("SetAttendance function failed");
            console.log(data);
        }  
   	});   
}


function SetAttendanceDDL()
{	
    var LoggedEmp = _spPageContextInfo.userId;     
    var AttDate = $("#timesheetEnter").val();
    var Attfrom = AttDate.split("/");
    var attf = new Date(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));
    //var attf = new Date(Attfrom[2], Attfrom[1], Attfrom[0]);
    var Attdate_string = attf.getFullYear() + "-" + (attf.getMonth()+1) + "-" + attf.getDate();        
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmpAttendance')/items?$filter=EmployeeId eq '"+LoggedEmp+"' and AttendanceDate eq '"+Attdate_string+"'";  
    $.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
		success: function (data) 
		{
			var items = data.d.results;  
            if (items.length > 0) 
			{  
            	$("#AttendanceDDL").val(items[0].AttendanceType);
            	if(items[0].HrAction == true)
            	{
            		$("#AttendanceDDL").prop('disabled', true);            	
				}
				else
				{
					$("#AttendanceDDL").prop('disabled', false);
				}    
            }
            else
            {
            	//$("#AttendanceDDL").val('0');

            	if($("#AttendanceDDL").val()=="0")
            	{
            		$("#AttendanceDDL").val('0');
            	}
            	
            	$("#AttendanceDDL").prop('disabled', false);
			}  
		},
		error: function (data) 
		{  
        	console.log("Attendance function failed");
            console.log(data);
		}  
	});
}


function Validations()
{	
	var radioValue = $("input[name=timesheetEntry]:checked").val();
	var Currentdate = new Date();
   		Currentdate = $.datepicker.formatDate('dd/mm/yy', Currentdate);
   	
   	var TimesheetDate = $("#timesheetEnter").val();
   	var Time = new Date();
	var G_CurrentTime = Time.getHours()*60+Time.getMinutes();	
	var workon = '';
	
	if($("#AttendanceDDL").val() == "0" || $("#AttendanceDDL").val() == "Holiday")
	{
		alert("Please select proper attandence.");
        return false;	
	}
	
		
	var x = ConvertDateTimeFormat(G_TaskDate, '/');
	var y = ConvertDateTimeFormat(TimesheetDate, '/');

	
	if(radioValue == "1")
	{	
		var Details = $("#Details").val();
			Details = Details.trim();
		
		if ($("#selectByTask").val().trim() == '') 
		{
        	alert("Please select task.");
        	return false;
    	}
    	else if ($("#DependencyDDL").val() == 'Select') 
		{
        	alert("Please select Dependency.");
        	return false;
    	}		
		else if ($("#startTime").val().trim() == '') 
		{
        	alert("Please enter Start Time.");
        	return false;
    	}
    	else if ($("#EndTime").val().trim() == '') 
    	{
        	alert("Please enter End Time.");
        	return false;
    	}
    	
    	else if (Details == '') 
    	{
        	alert("Please enter Details.");
        	return false;
    	}
    	else if ($("#TaskComplition").val().trim() == '') 
    	{
        	alert("Please enter Task Complition %.");
        	return false;
    	}
    	else if(TimesheetDate == Currentdate)
    	{
    		var EndTime = $("#EndTime").val();
			var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
			var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
			var ResEndTime = parseInt(GetEndHH*60+GetEndMM);		
    		if(G_CurrentTime<ResEndTime)
    		{
    			alert("Advance End-time is not permitted.");
	        	return false;    		
    		}
		}
		else if(G_TaskDate > TimesheetDate)
		{
			if (confirm("Please check the Time-Sheet Date."+"\n" +"You are entering Time-Sheet prior than the Task Start Date."+"\n" +"Are you sure to continue ?") == true) 
			{
    			return true;
  			}
  			else
  			{
  				return false;
  			} 
		}							
	}
	else if(radioValue == "2")
	{	
		var OtherDetails = $("#DetailsOther").val();
			OtherDetails = OtherDetails.trim();
		if($("#selectOther").val() == "Project")
		{
			if($("#SelectedProject").val() == null)
			{
				alert("Please select Project.");
        		return false;
			}
			/*else if($("#ProjectModule").val() == null || $("#ProjectModule").val() == "Select")
			{
				alert("Please select Project Module.");
        		return false;
			}*/
			else if($("#WorkTypeProj").val() == null || $("#WorkTypeProj").val() == "Select")
			{
				alert("Please select work type.");
        		return false;
			}
			else if ($("#OtherstartTime").val().trim() == '') 
			{
        		alert("Please enter Start Time.");
        		return false;
    		}
    		else if ($("#OtherEndTime").val().trim() == '') 
    		{
        		alert("Please enter End Time.");
        		return false;
    		}
    		else if (OtherDetails == '') 
    		{
        		alert("Please enter Details.");
        		return false;
    		}
    		//else if ($("#TaskComplitionOther").val().trim() == '') 
    		//{
        	//	alert("Please enter Task Complition %.");
        	//	return false;
    		//}
    		else if(TimesheetDate == Currentdate)
    		{
    			var EndTime = $("#OtherEndTime").val();
				var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
				var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
				var ResEndTime = parseInt(GetEndHH*60+GetEndMM);		
    			if(G_CurrentTime<ResEndTime)
    			{
    				alert("Advance End-time is not permitted.");
	    	    	return false;    		
    			}
			}        	  		
		}
		else if($("#selectOther").val() == "General")
		{
			var DetailsOther = $("#DetailsOther").val();
				DetailsOther = DetailsOther.trim();
			if($("#ClientList").val() == null)
			{
				alert("Please select Client.");
        		return false;
			}			
			else if($("#WorkTypeProj").val() == null || $("#WorkTypeProj").val() == "Select")
			{
				alert("Please select work type.");
        		return false;
			}
			else if ($("#OtherstartTime").val().trim() == '') 
			{
        		alert("Please enter Start Time.");
        		return false;
    		}
    		else if ($("#OtherEndTime").val().trim() == '') 
    		{
        		alert("Please enter End Time.");
        		return false;
    		}
    		else if (DetailsOther == '') 
    		{
        		alert("Please enter Details.");
        		return false;
    		}
    		//else if ($("#TaskComplitionOther").val().trim() == '') 
    		//{
        	//	alert("Please enter Task Complition %.");
        	//	return false;
    		//}
    		else if(TimesheetDate == Currentdate)
    		{
    			var EndTime = $("#OtherEndTime").val();
				var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
				var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
				var ResEndTime = parseInt(GetEndHH*60+GetEndMM);		
    			if(G_CurrentTime<ResEndTime)
    			{
    				alert("Advance End-time is not permitted.");
	    	    	return false;    		
    			}
			}		
		}		
	}
	else if(radioValue == "3")
	{
		var Details = $("#Details").val();
			Details =Details.trim();
		if ($("#DependencyDDL").val() == null)
		{
        	alert("Please select Dependency.");
        	return false;
    	}
    	else if ($("#selectByTask").val().trim() == '') 
		{
        	alert("Please select task.");
        	return false;
    	}
    			
		else if ($("#startTime").val().trim() == '') 
		{
        	alert("Please enter Start Time.");
        	return false;
    	}
    	else if ($("#EndTime").val().trim() == '') 
    	{
        	alert("Please enter End Time.");
        	return false;
    	}
    	
    	else if (Details == '') 
    	{
        	alert("Please enter Details.");
        	return false;
    	}
    	else if ($("#TaskComplition").val().trim() == '') 
    	{
        	alert("Please enter Task Complition %.");
        	return false;
    	}
    	else if(TimesheetDate == Currentdate)
    	{
    		var EndTime = $("#EndTime").val();
			var GetEndHH = new Date("01/01/2007 " + EndTime).getHours();		
			var GetEndMM = new Date("01/01/2007 " + EndTime).getMinutes();
			var ResEndTime = parseInt(GetEndHH*60+GetEndMM);		
    		if(G_CurrentTime<ResEndTime)
    		{
    			alert("Advance End-time is not permitted.");
	        	return false;    		
    		}
		}

	
	}
  
	return true;
}


$(window).load(function() {
	SetAttendanceDDL();
	ReadDepartment();
    getworktype();
    Getprojects();    	
});


var G_ManagerID=0;
function GetManagerID()
{
	if(window.atob($.urlParam('IsModal')) == "true"){ //Guest User
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items?$filter=LoginName/EMail eq ('"+_spPageContextInfo.userEmail+"')&$expand=Supervisor,LoginName&$select=*,LoginName/EMail,Supervisor/EMail,Supervisor/Id";  
	    $.ajax({    
			url: Ownurl,  
	        headers: { Accept: "application/json;odata=verbose" },  
	        async:false,  
	        success: function (data) { 
	            var items = data.d.results;  
	            if (items.length > 0) 
				{  
	                G_ManagerID = items[0].Supervisor.Id;
	            }
	            else
	            {
	            	G_ManagerID = 0;
				}  
	  
	        },
			eror: function (data) 
			{  
        		alert("An error occurred. Please try again.");  
			}  
	    });
	}
	else {//Internal User
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$filter=LogonName eq ('"+_spPageContextInfo.userId+"')";  
	    $.ajax({    
			url: Ownurl,  
	        headers: { Accept: "application/json;odata=verbose" },  
	        async:false,  
	        success: function (data) { 
				 
	            var items = data.d.results;  
	            if (items.length > 0) 
				{  
	                G_ManagerID = items[0].ManagerLoginNameId;
	            }
	            else
	            {
	            	G_ManagerID = 0;
				}  
	  
	        },
				eror: function (data) 
				{  
	        		alert("An error occurred. Please try again.");  
				}  
	    });
	}
	  
}


function GetTaskforDependencies(TaskDependenciesID)
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaskDependencies')/items?$select=*,TaskId/Title&$expand=TaskId/Title&$filter=ID eq '"+TaskDependenciesID+"'";  
	$.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
	success: function (data) 
	{
		var items = data.d.results;
		if(items.length>0)
        {
        	$("input[name=timesheetEntry][value='3']").prop("checked",true);
        	$("#timesheetEntry-box-2").css("display", "none");
        	$("#timesheetEntry-box-1").css("display", "block");
        	$("#TaskSearchBtn").css("display", "none");
        	$("#DependencyDIV").show();        	
        
       		GetTaskDtl(items[0].TaskIdId);
			var itemId = items[0].ID;            				
			var Title = items[0].Title;			
			var TaskName = items[0].TaskId.Title;
			G_TaskID = items[0].TaskIdId;
			$('#DependencyDDL').append($("<option     />").val(itemId).text(Title));
		}					
	},
	error: function (data) 
	{
		console.log("loadprojectinsearch Function failed");  
		console.log(data);  
	}  
	});
}


function loadDependencyinsearch()
{
	var sTatuS = $('select#StatusDependency option:selected').val();
	if(sTatuS != "All")
	{	
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaskDependencies')/items?$select=*,TaskId/Title&$expand=TaskId/Title&$filter=Status eq ('"+sTatuS+"') and AssignedTo eq ('"+_spPageContextInfo.userId+"') and CompanyID eq ('"+Logged_CompanyId+"')";  
	}
	else
	{
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TaskDependencies')/items?$select=*,TaskId/Title&$expand=TaskId/Title&$filter=AssignedTo eq ('"+_spPageContextInfo.userId+"') and CompanyID eq ('"+Logged_CompanyId+"')";  
	}	

	$.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
	success: function (data) 
	{
		var items = data.d.results;
		$(".mainDivAllDependency").empty();
    	$("#TotalItemsDependency").text(items.length);
        var tableItemsHTML = "";
        if(items.length>0)
        {         			
			for (var i = 0; i < items.length; i++) 
            {            	         	
            	var itemId = items[i].ID;            				
				var Title = items[i].Title;
				var Details = '';
				if(items[i].Details != null)
				{
					Details = items[i].Details;
				}
				var Status = "";
					if(items[i].Status == "Active")
					{
						Status="Close";
					}
					else if(items[i].Status == "InActive")
					{
						Status="Open";
					}
					else
					{
						//Status=items[i].Status;
					}
				
				var TaskName = '';//items[i].TaskId.Title;
				if(items[i].TaskId.Title != null)
				{
					TaskName = items[i].TaskId.Title;
				}
				var TaskID = items[i].TaskIdId;
				var CompletionVal = 0;
				if(items[i].Completion != null)
				{
					CompletionVal = items[i].Completion;
				}
				var dtl=[];
				dtl.push(TaskID,itemId,Title,CompletionVal);			

				tableItemsHTML += "<tr><td><input type='checkbox' class='DependencychkList' name='TaskListchk' value='"+dtl+"' onclick='onlyOne(this)'></td><td>"+Title+"</td><td>"+Details+"</td><td>"+TaskName+"</td><td>"+Status+"</td>";				
				tableItemsHTML +='</tr>';
			}			
		}
		else
        {
        	$(".mainDivAllDependency").empty();
		}

		if (items.length == 0) 
		{
			$(".NoRecordFound").show();
		}
		else
        {
			$(".NoRecordFound").hide();
		}
        
        $(".mainDivAllDependency").append(tableItemsHTML);
      	TableConfigurationDependency();					 // GenerateTableSharedWithMe();        
	},
	error: function (data) 
	{
		console.log("loadprojectinsearch Function failed");  
		console.log(data);  
	}  
	});
}


function TableConfigurationDependency()
{
    sorter = new TINY.table.sorter('sorter', 'TempTableDependency', {
        headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 5,
        colddid: 'columns',
        currentid: 'currentpageDependency',
        totalid: 'totalpagesDependency',
        startingrecid: 'startrecord',
        endingrecid: 'endrecord',
        totalrecid: 'totalrecords',
        hoverid: 'selectedrow',
        pageddid: 'pagedropdownDependency',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true                
    });
}


function GetDependencyfromGrid()
{	
	var SelectedDependency =  $('.DependencychkList:checked').val();
	if(SelectedDependency  != undefined)
	{
		var SelectedDependencyTaskID = SelectedDependency.split(",")[0];
		var SelectedDependencyID = SelectedDependency.split(",")[1];
		var SelectedDependencyTitle= SelectedDependency.split(",")[2];
		var CompletionText = SelectedDependency.split(",")[3];
		G_TaskID = SelectedDependencyTaskID;
		$("#barVal").text(CompletionText+'%');
		$("#TaskComplition").val(CompletionText);
	
		GetTaskDtl(SelectedDependencyTaskID);	
		$('#DependencyDDL').empty(); 
		$('#DependencyDDL').append($("<option     />").val(SelectedDependencyID).text(SelectedDependencyTitle));
		$('#DependencyDDL').prop( "disabled", true ); 	     
	}
}

function Convertdateformat(Startdate)
{
	var d = new Date(Startdate);
	var mon = d.getMonth()+1;
	if(mon <10){ mon = "0"+mon;}
	var dt = d.getDate();
	if(dt<10){dt = "0"+dt;}
	var yer = d.getFullYear();
	//var strDate = (d.getMonth()+1)+""+d.getDate()+""+d.getFullYear();
	var strDate = mon+""+dt+""+yer;
	return strDate
}

var G_Validateholiday4timesheet=false;
function GetHoliday4selectedDate(selectdate)
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CompanyHoliday')/items?$filter=OfficeLocationID eq ('"+Logged_Location+"')and Holiday_start eq '"+selectdate+"' and CompanyID eq '"+Logged_CompanyId+"'&$top=1&$orderby=Holiday_start asc";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var items = data.d.results;  
            if (items.length > 0) 
			{ 
				$("#Holidaymgs").text("Holiday due to "+items[0].Title);
				$(".HolidayMessage").css("display", "block");
				G_Validateholiday4timesheet=true;			
            }
            else
            {
            	$("#Holidaymgs").text("");
            	$(".HolidayMessage").css("display", "none");
            	G_Validateholiday4timesheet=false;	
            }  
        },
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });
}


function GetDefaultClient(DDLVALUE)
{
	if(DDLVALUE=="General")
	{
		var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items?$select=*&$filter=IsActive eq '1' and CompanyID eq ('"+Logged_CompanyId+"') and SelfCompany eq '1'";  
		$.ajax({  
		url: Ownurl,  
		headers: { Accept: "application/json;odata=verbose" },  
	    async:false,  
		success: function (data) 
		{
			var items = data.d.results;
	        if(items.length>0)
	        { 	
	        	var itemId = items[0].ID;            				
				var Title = items[0].Title;
	        	$('#ClientList').empty(); 
				$('#ClientList').append($("<option     />").val(itemId).text(Title));
	        }  			
		},
		error: function (data) 
		{
			console.log("loadprojectinsearch Function failed");  
			console.log(data);  
		}  
		});
	}
	else
	{
		$('#ClientList').empty(); 
	}
}


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
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


var ProjectResponce=[];
function GetAllProjects()
{
	ProjectResponce=[];
	var sTatuS = $('select#StatusProj option:selected').val();
	var Newquery='';
	if($('select#DepartmentsProject option:selected').val() != "ALL")
	{
		Newquery += "DepartmentName eq '"+$('select#DepartmentsProject option:selected').val()+"'";	
	}
	if($('select#StatusProj option:selected').val() != 'All')
	{
		Newquery += "and Status eq '"+$('select#StatusProj option:selected').val()+"'";
	}
	
	
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectDetails')/items?$select=*,ClientID/Title,ManagerName/Title,ManagerName/EMail&$expand=ManagerName,ClientID&$filter="+Newquery+"";   //&$orderby=Title asc
	
	$.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
	success: function (data) 
	{	
		//var items = data.d.results;
		ProjectResponce = data.d.results;
		AllProjectsDetails(ProjectResponce);
		
	},
	error: function (jqXhr, textStatus, errorThrown)
	{
		
    	console.log("Error in Loadtaskinsearch.");
    	console.log(jqXhr.responseJSON.error.message.value);
        var msg = jqXhr.responseJSON.error.message.value;
        var MsgResult =	msg.includes("it exceeds the list view");        
	}
    });
}


function AllProjectsDetails(items)
{
	if(ShortTableValue == 'Project')
	{
		items.sort(function(a,b){return a.ProjectName< b.ProjectName? -1 : 1});
	}
	else if(ShortTableValue == 'Customer')
	{
		items.sort(function(a,b){return a.ClientName< b.ClientName? -1 : 1});
	}
	$(".mainDivAllprojects").empty();
    $("#TotalItemscountProject").text(items.length);
    var tableItemsHTML = "";
    if(items.length>0)
    {        	
    	var ProjList=[];
      	var ProjID=[];            			
		for (var i = 0; i < items.length; i++) 
        {   
        	var RefNo='';
        	if(items[i].ProjectCode != null)
        	{
        		RefNo = items[i].ProjectCode;
        	}
          	var UserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + items[i].ManagerName.EMail;         	         	
          	tableItemsHTML +=	"<tr>";
           	//tableItemsHTML +=	"<td><input type='radio' name='projectselect' value="+items[i].ID+" class='radiotick'></td>";<input type='checkbox' class='TaskListchk' name='TaskListchk' value='"+itemId+"' onclick='onlyOne(this)'>
           	tableItemsHTML +=	"<td><input type='checkbox' class='TaskListchk' name='TaskListchk' value='"+items[i].ID+"' onclick='onlyOne(this)'></td>";
			tableItemsHTML +=	"<td><p class='pjecname' id='ProjectName"+items[i].ID+"'>"+items[i].ProjectName+"</p>";
       		tableItemsHTML +=	"	 <span class='spanmg'>Ref:</span> <span class='spanmg projectlg'>"+RefNo+"</span>";
    		tableItemsHTML +=	"</td>";
            tableItemsHTML +=	"<td>";
            tableItemsHTML +=	"	 <p class='customernamshow'>"+items[i].ClientID.Title+"</p>";
            tableItemsHTML +=	"    <span class='spanmg'>Status:</span> <span class='spanmg livcolor'>"+items[i].Status+"</span>";
            tableItemsHTML +=	"</td>";
            tableItemsHTML +=	"<td>";
            tableItemsHTML +=	"	<div class='managersec'>";
            tableItemsHTML +=	"		<div class='mangimg'><img src='"+UserImage+"' alt=''></div>";
            tableItemsHTML +=	"       <div class='managerdetails'>";
            tableItemsHTML +=	"       	<h4>"+items[i].ManagerName.Title+"</h4>";
            tableItemsHTML +=	"           <div class='mailsec'><a href='#'>"+items[i].ManagerName.EMail+"</a></div>";
    	    //tableItemsHTML +=	"			<span class='spanmg'>"+items[i].DepartmentName+"</span> | <span class='spanmg'>"+items[i].OfficeLocation+"</span>";
            tableItemsHTML +=	"		</div>";
            tableItemsHTML +=	"	</div>";
            tableItemsHTML +=	"</td>";
            tableItemsHTML +=	"</tr>";				
		}			
	}
	else
    {
      	$(".mainDivAllprojects").empty();
      	$('#pagedropdownProject').empty();
      	$('#currentpageProject').text('0');
      	$('#totalpagesProject').text('0');
	}
	if (items.length == 0) 
	{
		$(".NoRecordFound").show();
	}
	else
    {
		$(".NoRecordFound").hide();
	}
    
    $(".mainDivAllprojects").empty().append(tableItemsHTML);
    if (items.length > 0) 
    {
      	TableConfigurationProject();
    }
    ShortTableValue ='';
}

var ShortTableValue='';
function SortProjectDetails(SortValue)
{
	
	ShortTableValue = SortValue;
	AllProjectsDetails(ProjectResponce);


}





function OpenMyCustomLoader()
{
	var dlgTitle = 'Loading...';
    var dlgMsg = '<br />Please wait!!';
    var dlgHeight = 200;
    var dlgWidth = 400;
    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);  
}


function CloseMyCustomLoader()
{
	currentDlg.close();
}


function getdata(Query)
{
    var ResultItems=[];
    //var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?"+Query+"";  
    var Ownurl = _spPageContextInfo.webAbsoluteUrl +Query;  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 			
            //ResultItems = data.d.results;  
            ResultItems = data;
        },
        error: function (data) 
        {  
            console.log("Error in getdata.");
        	console.log(data); 
        }  
    });
    return ResultItems;
}



function TaskComplition(ID,TaskVal)  
{  
    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmployeeTaskDetails')/items('"+ID+"')",
        type: "POST",  
        data: JSON.stringify  
        ({  
            __metadata:  
            {  
                type: "SP.Data.EmployeeTaskDetailsListItem"  
            },  
            CompletionPersent: TaskVal,
            CompletionDate : new Date(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'))
        }),  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr)  
        {  
            console.log("Task Complition Data Updated!");
        },  
        error: function(xhr, status, error)  
        {  
            $("#ResultDiv").empty().text(data.responseJSON.error);  
        }  
	});
}


function ChangesInDependency(CompletionValue,DependencyID)  
{	

	var Status = "Active";
	if(CompletionValue == "100")
	{
		Status = "Completed";
	}
	//timesheetEnter
	var WorkDate = new Date(ConvertDateTimeFormat($("#timesheetEnter").val(), '/'));
	$.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('TaskDependencies')/items('"+DependencyID+"')",
        type: "POST",  
        data: JSON.stringify  
        ({  
            __metadata:  
            {  
                type: "SP.Data.TaskDependenciesListItem"  
            },  
            Status: Status,
            CompletionDate: WorkDate,
            Completion: CompletionValue
        }),  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr)  
        {  
            //alert("Data Updated");
            $("#barVal").text('0%');
			$("#TaskComplition").val('0');
        },  
        error: function(xhr, status, error)  
        {  
            $("#ResultDiv").empty().text(data.responseJSON.error);  
        }  
	});
}



/*-----------------06/01/2022 Add by lakhan ----------------------------*/
var authentication=function (){
	var UserName= _spPageContextInfo.userDisplayName;
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EnvironmentalSettings')/items?$select=Title,Active,ListOfUsers/Title&$filter=Title eq 'Timesheet Entry' &$expand=ListOfUsers/Id";
	$.ajax({
		url: requestUri,
		async: false,
		type: "GET",
		headers: {
		"accept":"application/json; odata=verbose"
		},
		success:function(data) {
		
		 var objItems = data.d.results;
		 if(objItems.length>0){
		    for(var i=0;i<objItems.length;i++){
		      if(objItems[i].Title=='Timesheet Entry'){
		         if(objItems[i].Active==false){
		             alert('This feature has been deactivated !');
				      window.location=_spPageContextInfo.webAbsoluteUrl+ '/Pages/Myworkplace.aspx?WebAppId=232SHDFGHJF22B2526DFG'      
				      return false;
				    
		          }
		      }
		      
		    }
		 }
		 },
		error: function (error) {
	      alert(JSON.stringify(error));            
	     }
	});
 }

