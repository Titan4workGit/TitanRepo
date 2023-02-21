//When any changes in Applyfilter function Also make same changes in GetAttendanceorLeaves function. 
var Totaldays=0;
var CompanyID='';
var GstartDate='';
var GEmpID=0;
$( document ).ready(function(){
    ValidateHrAdmin();
    initializePeoplePicker("EmployeeName");
	
    CompanyID = titanForWork.getQueryStringParameter("CompanyId");
    var EMPID = $.urlParam('EID');//start end
    var FDATE = $.urlParam('start');
    var EDATE = $.urlParam('end');
    if(EMPID != null)
    {
    	GEmpID = EMPID;
    	var StartDate = FDATE.slice(0, 4)+"-"+FDATE.slice(4, 6)+"-"+FDATE.slice(6, 8);
    	var EndDate = EDATE.slice(0, 4)+"-"+EDATE.slice(4, 6)+"-"+EDATE.slice(6, 8);
    	var myDate=new Date(EndDate);
    		myDate.setDate(myDate.getDate() + 1);
    		
    	var test = myDate.toISOString();
    	var EndAttandence=	test.split("T");
    	    	GstartDate = StartDate;
    	$("#EmpreportFrom").datepicker({ dateFormat: "dd/mm/yy",maxDate: new Date()}).datepicker("setDate", new Date(StartDate));
		$("#EmpreportTo").datepicker({ dateFormat: "dd/mm/yy",maxDate: new Date()}).datepicker("setDate", new Date(EndDate));
		
		var start= $("#EmpreportFrom").datepicker("getDate");
    	var end= $("#EmpreportTo").datepicker("getDate");
   			days = (end- start) / (1000 * 60 * 60 * 24);
   		Totaldays = (Math.round(days)+1);
   		   	
   		$("#StartDate").text(formatDateReportEmp(ConvertDateTimeFormat($("#EmpreportFrom").val(),'/')));
   		$("#EndDate").text(formatDateReportEmp(ConvertDateTimeFormat($("#EmpreportTo").val(),'/')));
   		var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=LogonName eq '"+EMPID+"' and Company/ID  eq '" + CompanyID +"'";
			EmployeeListDat(Ownurl);

   		LoadAllHolidays();
   	
   	 	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate ge '"+StartDate+"' and AttendanceDate le '"+EndAttandence+"' and Employee eq '"+EMPID+"' ";
			EmpReportUsageUrl = requestUri;
			//getFileData(requestUri);
			getFileData();
	
		var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=LogonName eq '"+EMPID+"' and Company/ID  eq '" + CompanyID +"'";
			EmployeeListDat(Ownurl);

    	LoadAllHolidays();
    	
    }
    
});


var EmployeeID = "";
var ItemID='';
var SelectedDate = "";
var TDID='';
function attendanceEditModal(userid,itemid,date)
{
	EmployeeID = 0;
	ItemID = 0;
	SelectedDate = "";
	TDID = date;
	EmployeeID = userid;
	ItemID = itemid;
	var Selecteddate = date.toString();
	var Selecteddate1= Selecteddate.slice(0, 4)+"-"+Selecteddate.slice(4, 6)+"-"+Selecteddate.slice(6, 8);
	var Fdate = new Date(Selecteddate1);
	SelectedDate = Fdate.toISOString().split('T')[0];
	
	var newdate = formatDateReportEmp(Fdate);
	$("#SelDate").text(newdate);
	GetHolidays(Selecteddate1);
}


function UpdateAttendance()
{
	if(ItemID == 0)
	{
		if(G_Validateholiday == true)
		{
			if (confirm('This is a Holiday, are you sure to submit your attendance.')) 
			{
    			PushNewAttendance();    		
    		}								
		}
		else
		{
			PushNewAttendance();				
		}
		Applyfilter();
		LoadAllHolidays();	 
	}
	else
	{
		if(G_Validateholiday == true)
		{
			if (confirm('This is a Holiday, are you sure to submit your attendance.')) 
			{
    			ModifyAttendance();
    		}								
		}
		else
		{
			ModifyAttendance();				
		}
		Applyfilter();
		LoadAllHolidays();	 
	}
}


function PushNewAttendance()
{
	if($("#AttendanceDDL").val() != "Holiday" || G_Validateholiday==true)
    {
	$.ajax({  
			url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpAttendance')/items",  
			type: "POST",
			async: false,  
			data: JSON.stringify  
			({  
				__metadata:  
			    {  
					type: "SP.Data.EmpAttendanceListItem"  
			    },  
			    AttendanceDate:SelectedDate ,  
			    EmployeeId:EmployeeID,
			    AttendanceType:$("#AttendanceDDL").val()
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
				$("#Att"+TDID).text($("#AttendanceDDL").val());
				alert("Data has been saved.");
				$("#attendance-reportEdit").modal('hide');
				GetAttendanceorLeaves();
				
			},  
			error: function(xhr, status, error)  
			{  
				alert("Error! Something went wrong.");
			}  
		});
	}
	else
    {    
    	alert("Plese select proper attandence.");
    }
}


function ModifyAttendance()
{
	if($("#AttendanceDDL").val() != "Holiday" || G_Validateholiday==true)
    {
		$.ajax({  
			url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpAttendance')/items("+ItemID+")",
			type: "POST",
			async:false,  
			data: JSON.stringify  
			({  
				__metadata:  
			    {  
					type: "SP.Data.EmpAttendanceListItem"  
			    },  
			    	AttendanceType:$("#AttendanceDDL").val()
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
				$("#Att"+TDID).text($("#AttendanceDDL").val());
				$("#Timeview"+TDID).text("00:00");
			    alert("Data has been saved.");
				$("#attendance-reportEdit").modal('hide');
				GetAttendanceorLeaves();
				//LoadAllHolidays();
			},  
			error: function(xhr, status, error)  
			{  
    			alert("Error! Something went wrong.");
			}  
		});
	}
	else
    {    
    	alert("Plese select proper attandence.");
    }
}


function initializePeoplePicker(peoplePickerElementId) {  
    var schema = {};  
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';  
    schema['SearchPrincipalSource'] = 15;  
    schema['ResolvePrincipalSource'] = 15;  
    schema['AllowMultipleValues'] = false;  
    schema['MaximumEntitySuggestions'] = 50;  
    schema['Width'] = '280px';  
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);  
}  



function Applyfilter()
{
	OpenMyCustomLoader();
	EmpReportData=[];
	var EMPID = $.urlParam('EID');//start end	
	var start= $("#EmpreportFrom").datepicker("getDate");
    var end= $("#EmpreportTo").datepicker("getDate");
   		days = (end- start) / (1000 * 60 * 60 * 24);
   	Totaldays = (Math.round(days)+1);
   	
   	$("#StartDate").text(formatDateReportEmp(ConvertDateTimeFormat($("#EmpreportFrom").val(),'/')));
   	$("#EndDate").text(formatDateReportEmp(ConvertDateTimeFormat($("#EmpreportTo").val(),'/')));
   	
   	var StartDate = moment($("#EmpreportFrom").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
	var EndDate = moment($("#EmpreportTo").val(),'DD/MM/YYYY').format('YYYY-MM-DD'); 
	var myDate=new Date(EndDate);
    	myDate.setDate(myDate.getDate() + 1);
    		
    	var test = myDate.toISOString();
    	var EndAttandence=	test.split("T");	
  
   	GstartDate = StartDate;   	
   	var EmployeeID = ensureUser($('#EmployeeName').children().children().attr('id'));  	
	
   	if(EmployeeID == 0)
   	{
   		EMPID = EMPID;
   		GEmpID = EMPID;
   		var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$orderby = AttendanceDate asc&$filter=AttendanceDate ge '"+StartDate+"' and AttendanceDate le '"+EndAttandence+"' and Employee eq '"+EMPID+"' ";
		EmpReportUsageUrl = requestUri;
		getFileData(); 
		//getFileData(requestUri);
		
   		var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=LogonName eq '"+EMPID+"' and Company/ID  eq '" + CompanyID +"'";
		EmployeeListDat(Ownurl);
   	}
   	else
   	{
   		if(ISHRADMIN == true)
   		{   			
   			EMPID = EmployeeID;
   			GEmpID = EmployeeID;

   			var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$orderby = AttendanceDate asc&$filter=AttendanceDate ge '"+StartDate+"' and AttendanceDate le '"+EndAttandence+"' and Employee eq '"+EMPID+"' ";
			EmpReportUsageUrl = requestUri;
			getFileData(); 

			//getFileData(requestUri);
   			
   			var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=LogonName eq '"+EMPID+"' and Company/ID  eq '" + CompanyID +"'";
			EmployeeListDat(Ownurl);
		}
		else
		{
			alert("Unauthorized access!");
		}
   	}	
	LoadAllHolidays();	
}

var DataIdList=[];
var EmpAttendanceData=[];
var TotalLeavesorAbsent=[];
var EmpReportUsageUrl = '';
var EmpReportData = EmpReportData || [];
function getFileData()
{
	jQuery.ajax({  
	url: EmpReportUsageUrl,
    headers: { Accept: "application/json;odata=verbose" },
		async: true,
		success: function (data)
		{
			EmpReportData = EmpReportData .concat(data.d.results);
			if (data.d.__next) 
            {
                EmpReportUsageUrl = data.d.__next;
                getFileData();
            }
            else
            {
            	if(EmpReportData.length>0)
            	{
            		var EmployeeID = ensureUser($('#EmployeeName').children().children().attr('id')); 
					var EMPID = $.urlParam('EID');
					if( EmployeeID != 0)
					{
						EmpReportData = $.grep(EmpReportData, function(v) {
		    				return v.Employee.ID == EmployeeID;
						});					
					}	
					else
					{
						EmpReportData = $.grep(EmpReportData, function(v) {
		    				return v.Employee.ID== EMPID;
						});					
					}            
            		var StartDate = moment(ConvertDateTimeFormat($("#EmpreportFrom").val(),'/')).format("MM/DD/YYYY");
					var EndDate   = moment(ConvertDateTimeFormat($("#EmpreportTo").val(),'/')).format("MM/DD/YYYY");
        
					var ExtResults= EmpReportData.filter(function (data) {
            			Created = moment(data.AttendanceDate).format("MM/DD/YYYY");
            			return (StartDate == "" ? Created != "" : Created >= StartDate) && (EndDate == "" ? Created!= "" : Created <= EndDate);
        			});
        			
					//if Employee 
					GenerateEmpReport(ExtResults);
					
            	
            	}
            	else
            	{	var ExtResults=[];
            		GenerateEmpReport(ExtResults);
            	}
            	CloseMyCustomLoader();            
            }			
		}, 
		error: function (jqXhr, textStatus, errorThrown) 
		{  
			console.log("Error in getFileData.");
            console.log(jqXhr.responseJSON.error.message.value);
            var msg = jqXhr.responseJSON.error.message.value;
            var MsgResult =	msg.includes("it exceeds the list view");
            if(MsgResult == true)
            {
            	EmpReportData=[];
            	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=2000";
					EmpReportUsageUrl = requestUri;
					getFileData();
            }  
		}  
	});  
}

function GenerateEmpReport(items)
{
		EmpAttendanceData =[];     
			//var items = data.d.results;
			DataIdList=[];
			var TotalAttendance=[];
			TotalLeavesorAbsent=[];				
			for (var i = 0; i < items.length; i++)  
			{ 
				if(items[i].AttendanceType != "On-Leave" && items[i].AttendanceType != "Holiday" )
				{
					TotalAttendance.push(items[i].AttendanceType);
				}
				else if(items[i].AttendanceType == "On-Leave")
				{
					TotalLeavesorAbsent.push(items[i].AttendanceType);
				}
				else if(items[i].AttendanceType == "Holiday")
				{
					TotalLeavesorAbsent.push(items[i].AttendanceType);
				}
				
				var itemid = items[i].ID;
				var EmployeeName = items[i].Employee.Title;
				var EmpId = items[i].Employee.ID;
				var attendDate = formatDateReportEmp(items[i].AttendanceDate);
				var attendType = items[i].AttendanceType;
				var workhours = items[i].WorkHours;
				var HrAction = items[i].HrAction;	   
				EmpAttendanceData.push({UserId : EmpId,EmpName:EmployeeName, AttendanceDate : attendDate, AttendanceType : attendType, AttendanceItemId : itemid, EmpWorkHours : workhours,HrAction:HrAction});       
			}
			var tableItemsHTML ='';
			$("#EmpReportTable").empty();
			var AbsentCounter=0;
			var PresentCounter=0;
			for(var j=0; j<Totaldays; j++)
			{
				var date = new Date(GstartDate);
				date.setDate(date.getDate() + j);
				var StartDate = moment(date,'DD/MM/YYYY').format('YYYY-MM-DD');
               	var StartDate =StartDate.split('-').join('');
				DataIdList.push(StartDate);
				var newdate = formatDateReportEmp(date);
				var IsUserInEmpAttendanceGroup = EmpAttendanceData.map(function(e) { return e.AttendanceDate; }).indexOf(newdate);
					
                if(IsUserInEmpAttendanceGroup!=-1)
                {	
                	var Attendance = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceType;
                	var attendhour = EmpAttendanceData[IsUserInEmpAttendanceGroup].EmpWorkHours;
                	var HrAction = EmpAttendanceData[IsUserInEmpAttendanceGroup].HrAction;
                	var UserID = EmpAttendanceData[IsUserInEmpAttendanceGroup].UserId;
                	var ItemID = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceItemId;                		
                	var DisplayHrAction = "none";
                	var Actionbtn = "block";
                	if(HrAction  == true)
                	{
                		DisplayHrAction = "block";
                		Actionbtn = "none";
                	}
                	if(Attendance != "On-Leave" && Attendance != "Holiday")
                	{ 
                		if(attendhour == null)
                		{
                			var ViewRecord = "<a class='LinkBtn' href='"+_spPageContextInfo.webAbsoluteUrl+"/Pages/TimeSheetEntry.aspx?WebAppId=2&Recall="+StartDate+"&Mode="+window.btoa('View')+"&sourcelocation=../Pages/Myworkplace.aspx' ><span id='Timeview"+StartDate+"'>Fill</span></a>";
                		}
                		else
                		{
                			var ViewRecord = "<a href='"+_spPageContextInfo.webAbsoluteUrl+"/Pages/TimeSheetEntry.aspx?WebAppId=2&Recall="+StartDate+"&Mode="+window.btoa('View')+"&sourcelocation=../Pages/Myworkplace.aspx'>"+ConvertHHMM(attendhour)+"</a>";
                		}
                	}
                	else
                	{
                		var ViewRecord = "";
                	}
                	PresentCounter = PresentCounter+1;
					tableItemsHTML += "<tr class='text-center' >";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2' id="+StartDate+"><span>"+formatDateReportEmp(date)+"</span><span id='H"+StartDate+"' class='employee-report-holiday'></span></div></td>";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2' id=Att"+StartDate+">"+Attendance+"</div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2' id=Time"+StartDate+">"+ViewRecord+"</div></td>";
					tableItemsHTML += "<td><div class='checkbox m-0' style='display: "+DisplayHrAction+" '><label><i class='fa fa-check' aria-hidden='true' style='color: red;'></i></label></div></td>";
					tableItemsHTML += "<td><div class='attendance-report-edit-lock-btn-box text-center' style='display: "+Actionbtn+" '><a href='#' class='custom-edit-btn' data-toggle='modal' data-target='#attendance-reportEdit' onclick=\'attendanceEditModal("+GEmpID+","+ItemID+","+StartDate+")\'><i class='fa fa-pencil'></i></a></div></td>";					
					tableItemsHTML += "</tr>";			
				}
				else
				{
					AbsentCounter = AbsentCounter +1;
					var FillRecord = "<a class='LinkBtn' href='"+_spPageContextInfo.webAbsoluteUrl+"/Pages/TimeSheetEntry.aspx?WebAppId=2&Recall="+StartDate+"&Mode="+window.btoa('View')+"&sourcelocation=../Pages/Myworkplace.aspx' ><span id='Timeview"+StartDate+"'>Fill</span></a>";
					tableItemsHTML += "<tr class='text-center' >";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2' id="+StartDate+"><span>"+formatDateReportEmp(date)+"</span><span id='H"+StartDate+"' class='employee-report-holiday'></span></div></td>";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2' id=Att"+StartDate+"></div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2' id=Time"+StartDate+"></div></td>";
					tableItemsHTML += "<td><div class='checkbox m-0'></div></td>";
					tableItemsHTML += "<td><div class='attendance-report-edit-lock-btn-box text-center'><a href='#' class='custom-edit-btn' data-toggle='modal' data-target='#attendance-reportEdit' onclick=\'attendanceEditModal("+GEmpID+",0,"+StartDate+")\'><i class='fa fa-pencil'></i></a></div></td>";					
					tableItemsHTML += "</tr>";					
				}
			}				        		
        	var TotalLeaveAbsent= ((parseInt(TotalLeavesorAbsent.length)+parseInt(AbsentCounter))-parseInt($("#HoliaysTotal").text()));
        	if(TotalLeaveAbsent<0)
        	{
        		TotalLeaveAbsent = 0;
        	}
        	//$("#Total-Leave-Absent").text(parseInt(AbsentCounter)+parseInt(TotalLeavesorAbsent.length));//HoliaysTotal
        	//$("#Total-Leave-Absent").text(((parseInt(TotalLeavesorAbsent.length)+parseInt(AbsentCounter))-parseInt($("#HoliaysTotal").text())));//HoliaysTotal
        	//$("#Total-Leave-Absent").text(TotalLeaveAbsent);//HoliaysTotal
        	$(".NoRecordFound").hide();
        	$("#EmpTotalItemscount").text(Totaldays);
        	var AttCount = parseInt(PresentCounter)-parseInt(TotalLeavesorAbsent.length)
        	$("#Total-Attendance").text(Math.abs(AttCount));//Math.abs(-7.25);
        	//$("#Total-Attendance").text(TotalAttendance.length);//Math.abs(-7.25);
      		//$("#Total-Leave-Absent").text(TotalLeavesorAbsent.length);
			$("#EmpReportTable").append(tableItemsHTML); 
			EmpTableConfiguration(); 
}

/*function getFileData(requestUri)
{
	jQuery.ajax({  
	url: requestUri,
    headers: { Accept: "application/json;odata=verbose" },
		async: false,
		success: function (data)
		{  
			EmpAttendanceData =[];     
			var items = data.d.results;
			DataIdList=[];
			var TotalAttendance=[];
			TotalLeavesorAbsent=[];				
			for (var i = 0; i < items.length; i++)  
			{ 
				if(items[i].AttendanceType != "On-Leave" && items[i].AttendanceType != "Holiday" )
				{
					TotalAttendance.push(items[i].AttendanceType);
				}
				else if(items[i].AttendanceType == "On-Leave")
				{
					TotalLeavesorAbsent.push(items[i].AttendanceType);
				}
				else if(items[i].AttendanceType == "Holiday")
				{
					TotalLeavesorAbsent.push(items[i].AttendanceType);
				}
				
				var itemid = items[i].ID;
				var EmployeeName = items[i].Employee.Title;
				var EmpId = items[i].Employee.ID;
				var attendDate = formatDateReportEmp(items[i].AttendanceDate);
				var attendType = items[i].AttendanceType;
				var workhours = items[i].WorkHours;
				var HrAction = items[i].HrAction;	   
				EmpAttendanceData.push({UserId : EmpId,EmpName:EmployeeName, AttendanceDate : attendDate, AttendanceType : attendType, AttendanceItemId : itemid, EmpWorkHours : workhours,HrAction:HrAction});       
			}
			var tableItemsHTML ='';
			$("#EmpReportTable").empty();
			var AbsentCounter=0;
			var PresentCounter=0;
			for(var j=0; j<Totaldays; j++)
			{
				var date = new Date(GstartDate);
				date.setDate(date.getDate() + j);
				var StartDate = moment(date,'DD/MM/YYYY').format('YYYY-MM-DD');
               	var StartDate =StartDate.split('-').join('');
				DataIdList.push(StartDate);
				var newdate = formatDateReportEmp(date);
				var IsUserInEmpAttendanceGroup = EmpAttendanceData.map(function(e) { return e.AttendanceDate; }).indexOf(newdate);
					
                if(IsUserInEmpAttendanceGroup!=-1)
                {	
                	var Attendance = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceType;
                	var attendhour = EmpAttendanceData[IsUserInEmpAttendanceGroup].EmpWorkHours;
                	var HrAction = EmpAttendanceData[IsUserInEmpAttendanceGroup].HrAction;
                	var UserID = EmpAttendanceData[IsUserInEmpAttendanceGroup].UserId;
                	var ItemID = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceItemId;                		
                	var DisplayHrAction = "none";
                	var Actionbtn = "block";
                	if(HrAction  == true)
                	{
                		DisplayHrAction = "block";
                		Actionbtn = "none";
                	}
                	if(Attendance != "On-Leave" && Attendance != "Holiday")
                	{ 
                		if(attendhour == null)
                		{
                			var ViewRecord = "<a class='LinkBtn' href='"+_spPageContextInfo.webAbsoluteUrl+"/Pages/TimeSheetEntry.aspx?WebAppId=2&Recall="+StartDate+"&Mode="+window.btoa('View')+"&sourcelocation=../Pages/Myworkplace.aspx' ><span id='Timeview"+StartDate+"'>Fill</span></a>";
                		}
                		else
                		{
                			var ViewRecord = "<a href='"+_spPageContextInfo.webAbsoluteUrl+"/Pages/TimeSheetEntry.aspx?WebAppId=2&Recall="+StartDate+"&Mode="+window.btoa('View')+"&sourcelocation=../Pages/Myworkplace.aspx'>"+ConvertHHMM(attendhour)+"</a>";
                		}
                	}
                	else
                	{
                		var ViewRecord = "";
                	}
                	PresentCounter = PresentCounter+1;
					tableItemsHTML += "<tr class='text-center' >";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2' id="+StartDate+"><span>"+formatDateReportEmp(date)+"</span><span id='H"+StartDate+"' class='employee-report-holiday'></span></div></td>";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2' id=Att"+StartDate+">"+Attendance+"</div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2' id=Time"+StartDate+">"+ViewRecord+"</div></td>";
					tableItemsHTML += "<td><div class='checkbox m-0' style='display: "+DisplayHrAction+" '><label><i class='fa fa-check' aria-hidden='true' style='color: red;'></i></label></div></td>";
					tableItemsHTML += "<td><div class='attendance-report-edit-lock-btn-box text-center' style='display: "+Actionbtn+" '><a href='#' class='custom-edit-btn' data-toggle='modal' data-target='#attendance-reportEdit' onclick=\'attendanceEditModal("+GEmpID+","+ItemID+","+StartDate+")\'><i class='fa fa-pencil'></i></a></div></td>";					
					tableItemsHTML += "</tr>";			
				}
				else
				{
					AbsentCounter = AbsentCounter +1;
					var FillRecord = "<a class='LinkBtn' href='"+_spPageContextInfo.webAbsoluteUrl+"/Pages/TimeSheetEntry.aspx?WebAppId=2&Recall="+StartDate+"&Mode="+window.btoa('View')+"&sourcelocation=../Pages/Myworkplace.aspx' ><span id='Timeview"+StartDate+"'>Fill</span></a>";
					tableItemsHTML += "<tr class='text-center' >";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2' id="+StartDate+"><span>"+formatDateReportEmp(date)+"</span><span id='H"+StartDate+"' class='employee-report-holiday'></span></div></td>";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2' id=Att"+StartDate+"></div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2' id=Time"+StartDate+"></div></td>";
					tableItemsHTML += "<td><div class='checkbox m-0'></div></td>";
					tableItemsHTML += "<td><div class='attendance-report-edit-lock-btn-box text-center'><a href='#' class='custom-edit-btn' data-toggle='modal' data-target='#attendance-reportEdit' onclick=\'attendanceEditModal("+GEmpID+",0,"+StartDate+")\'><i class='fa fa-pencil'></i></a></div></td>";					
					tableItemsHTML += "</tr>";					
				}
			}				        		
        	var TotalLeaveAbsent= ((parseInt(TotalLeavesorAbsent.length)+parseInt(AbsentCounter))-parseInt($("#HoliaysTotal").text()));
        	if(TotalLeaveAbsent<0)
        	{
        		TotalLeaveAbsent = 0;
        	}
        	//$("#Total-Leave-Absent").text(parseInt(AbsentCounter)+parseInt(TotalLeavesorAbsent.length));//HoliaysTotal
        	//$("#Total-Leave-Absent").text(((parseInt(TotalLeavesorAbsent.length)+parseInt(AbsentCounter))-parseInt($("#HoliaysTotal").text())));//HoliaysTotal
        	//$("#Total-Leave-Absent").text(TotalLeaveAbsent);//HoliaysTotal
        	$(".NoRecordFound").hide();
        	$("#EmpTotalItemscount").text(Totaldays);
        	var AttCount = parseInt(PresentCounter)-parseInt(TotalLeavesorAbsent.length)
        	$("#Total-Attendance").text(Math.abs(AttCount));//Math.abs(-7.25);
        	//$("#Total-Attendance").text(TotalAttendance.length);//Math.abs(-7.25);
      		//$("#Total-Leave-Absent").text(TotalLeavesorAbsent.length);
			$("#EmpReportTable").append(tableItemsHTML); 
			EmpTableConfiguration(); 
		}, 
		error: function (jqXhr, textStatus, errorThrown) 
		{debugger;  
			console.log("Error in getFileData.");
            console.log(jqXhr.responseJSON.error.message.value);
            var msg = jqXhr.responseJSON.error.message.value;
            var MsgResult =	msg.includes("it exceeds the list view");
            if(MsgResult == true)
            {
            	 //var Url = "?$select=*,Author/Name,Author/Title,Author/EMail,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title,UserID/EMail&$expand=UserID,LocationID,DepartmentId,CompanyId,Author&$top=5000";
        		//	AnalyticalUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NotificationCenter')/items/" + Url;
				//	ReadAnalyticalUsageData();
            }
  
		}  
	});  
}*/


function ConvertDateTimeFormat(date, delimiter) 
{
    return date.split(delimiter)[1] + "" + delimiter + "" + date.split(delimiter)[0] + "" + delimiter + "" + date.split(delimiter)[2];
}

var GEmployeeID=0; 
var LocID =0;
function EmployeeListDat(Ownurl)
{
	GEmployeeID=0;
	$.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
	success: function (data) 
	{
		var items = data.d.results;		
        if(items.length>0)
        {
        	$("#EmpName").text(items[0].LogonName.Title);
        	GEmployeeID = items[0].LogonName.ID;
        	$("#EmpTitle").text(items[0].LogonName.Title);
        	$("#OfficeLoc").text(items[0].OfficeLocation.OfficeName);
        	$("#officeLocTH").text(items[0].OfficeLocation.OfficeName);
        	LocID = items[0].OfficeLocation.ID;
       	}
       	else
       	{
       		$("#EmpName").text('');
        	$("#OfficeLoc").text('');
        	LocID = 0;      	
       	}       	       	
	},
	error: function (data) 
	{  
		console.log(data);  
	}  
	});
}


function EmpTableConfiguration()
{
    sorter = new TINY.table.sorter('sorter', 'EmpReportTableData', {
       // headclass: 'head',
        ascclass: 'asc',
        descclass: 'desc',
        evenclass: 'evenrow',
        oddclass: 'oddrow',
        evenselclass: 'evenselected',
        oddselclass: 'oddselected',
        paginate: true,
        size: 10,
        colddid: 'columns',
        currentid: 'Empcurrentpage',
        totalid: 'Emptotalpages',
        startingrecid: 'Empstartrecord',
        endingrecid: 'Empendrecord',
        totalrecid: 'Emptotalrecords',
        hoverid: 'selectedrow',
        pageddid: 'Emppagedropdown',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
                
    });
}


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}


function formatDateReportEmp(d) 
{
	var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var date = new Date(d);
	if ( isNaN( date .getTime())){ return d; }
    else
    {
         var month = new Array();
         month[0] = "Jan";
         month[1] = "Feb";
         month[2] = "Mar";
         month[3] = "Apr";
         month[4] = "May";
         month[5] = "Jun";
         month[6] = "Jul";
         month[7] = "Aug";
         month[8] = "Sept";
         month[9] = "Oct";
         month[10] = "Nov";
         month[11] = "Dec";
         day = date.getDate();
         if(day < 10){day = "0"+day; }
         
         return    day  + " " +month[date.getMonth()] +" "+date.getFullYear()+", "+weekday[date.getDay()];
    }
}

function ConvertHHMM(TotalMinutes)
{
	if(TotalMinutes != null)
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
	}
	else
	{
		var TimeFormat="";
	}
	return TimeFormat;	
}

var AttandenceOnHolidays=0;
var HolidaysListDTL=[];
function LoadAllHolidays()
{
 	TotalOfficeDays =0;
 	HolidaysListDTL=[]; 	
 	var f = new Date(ConvertDateTimeFormat($("#EmpreportFrom").val(), '/'));
    var Startdate = f.getFullYear() + "-" + (f.getMonth()+1) + "-" + f.getDate();

    var f1 = new Date(ConvertDateTimeFormat($("#EmpreportTo").val(), '/'));
    var EndDate = f1.getFullYear() + "-" + (f1.getMonth()+1) + "-" + f1.getDate(); 
    
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CompanyHoliday')/items?select=*,ID,Title&$filter=OfficeLocationID eq '"+LocID+"' and CompanyID eq '"+CompanyID+"' and Holiday_start ge '"+Startdate+"' and Holiday_start le '"+EndDate+"'"; 
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (response)
        {
        	var TotalHolidays = response.d.results.length;
          	var ATTCOUNT = 0;
        	for(var i=0; i<TotalHolidays; i++)
        	{
        		var date = new Date(response.d.results[i].Holiday_start);
				var StartDate = moment(date,'DD/MM/YYYY').format('YYYY-MM-DD');              
                var StartDate =StartDate.split('-').join('');
				var HTitle = response.d.results[i].Title;
        		HolidaysListDTL.push({Hdate:StartDate,Title:HTitle});
        		$("#"+StartDate).css("color", "red");
        		$("#H"+StartDate).text(HTitle);        		
        		if($("#Att"+StartDate).text() != "")
        		{
        			ATTCOUNT = ATTCOUNT + 1;
        		}
        	}        	

        	AttandenceOnHolidays=0;
        	for(var j=0; j<HolidaysListDTL.length; j++)
        	{
        		var AttValue = $("#Att"+HolidaysListDTL[j].Hdate).text();
        		if(AttValue != "" && AttValue != "On-Leave" && AttValue != "Holiday")
        		{
        			AttandenceOnHolidays = AttandenceOnHolidays+1;
        		}        	
        	}
        	var THDays=0;
        	var TotalABS = 0;
        	var Onleaveonly=0;
        	for(var k=0; k<DataIdList.length; k++)
			{
				var TotalBlank = $("#Att"+DataIdList[k]).text();
				if(TotalBlank == "" || TotalBlank == "On-Leave")
        		{
        			TotalABS = TotalABS+1;
        		}
        		if(TotalBlank == "On-Leave")
        		{
        			Onleaveonly = Onleaveonly+1;
        		}
        		if(TotalBlank == "Holiday")
        		{
        			THDays = THDays+1;
        		}           						
			}
			var TotalLeavesCount= TotalABS+AttandenceOnHolidays-(TotalHolidays-THDays);
			if(TotalLeavesCount<0)
			{
				TotalLeavesCount=0;
			}
			if(TotalLeavesCount != "0")
			{
				$("#Total-Leave-Absent").text(TotalLeavesCount);
			}
			else
			{
				if(Onleaveonly>0)
				{
					$("#Total-Leave-Absent").text(Onleaveonly);

				}			
			}
        	
        	$("#HoliaysTotal").text(TotalHolidays);        	
        	$("#Workingdays").text(parseInt(Totaldays)-parseInt(TotalHolidays));
        	//TotalOfficeDays = parseInt(Totaldays)-parseInt(TotalHolidays);          	
			$("#FdateTH").text(formatDateReportEmp(ConvertDateTimeFormat($("#EmpreportFrom").val(),'/')));
			$("#EdateTH").text(formatDateReportEmp(ConvertDateTimeFormat($("#EmpreportTo").val(),'/')));			
			$("#TotalWorkdayTH").text(parseInt(Totaldays)-parseInt(TotalHolidays));
			$("#HolidaysTH").text(TotalHolidays);    	
        }, 
        myError: function (response) {
           
        }
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


var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})()

var ISHRADMIN=false;
function ValidateHrAdmin()
{
	var listName='ProcessApprovers';
	var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+listName+"')/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=CompanyId eq '" +titanForWork.getQueryStringParameter('CompanyId')+ "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and (WebPartName eq 'HR Admin')";
    $.ajax({
        url: siteURL,
        async:false,
        type: "get",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data)
        {
            var valuesArray = data.d.results;
            if(valuesArray.length>0)
            {
				$("#EmpRow").css("display", "block");
				ISHRADMIN=true;
			}
            else
            {
               	ISHRADMIN=false;
             	$("#EmpRow").hide();
            }
		},
        error: function (data) 
        {
			console.log(data.responseJSON.error);
        }
	});
}

function GetAttendanceorLeaves()
{
	var EMPID = $.urlParam('EID');//start end	
	var start= $("#EmpreportFrom").datepicker("getDate");
    var end= $("#EmpreportTo").datepicker("getDate");
   		days = (end- start) / (1000 * 60 * 60 * 24);
   	Totaldays = (Math.round(days)+1);
   	
   	$("#StartDate").text(formatDateReportEmp(ConvertDateTimeFormat($("#EmpreportFrom").val(),'/')));
   	$("#EndDate").text(formatDateReportEmp(ConvertDateTimeFormat($("#EmpreportTo").val(),'/')));
   	
   	var StartDate = moment($("#EmpreportFrom").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
	var EndDate = moment($("#EmpreportTo").val(),'DD/MM/YYYY').format('YYYY-MM-DD'); 
	var myDate=new Date(EndDate);
    	myDate.setDate(myDate.getDate() + 1);    		
    var test = myDate.toISOString();
    var EndAttandence=	test.split("T");
	  
   		GstartDate = StartDate;   	
   	var EmployeeID = ensureUser($('#EmployeeName').children().children().attr('id'));  	
	
   	if(EmployeeID == 0)
   	{	var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=LogonName eq '"+EMPID+"' and Company/ID  eq '" + CompanyID +"'";
		EmployeeListDat(Ownurl);
   		LoadAllHolidays();
   		EMPID = EMPID;
   		GEmpID = EMPID;
   		var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate ge '"+StartDate+"' and AttendanceDate le '"+EndAttandence+"' and Employee eq '"+EMPID+"' ";
		UpdateHeaderfields(requestUri);   		
   	}
   	else
   	{
   		if(ISHRADMIN == true)
   		{   			
   			EMPID = EmployeeID;
   			GEmpID = EmployeeID;
   			var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=LogonName eq '"+EMPID+"' and Company/ID  eq '" + CompanyID +"'";
			EmployeeListDat(Ownurl);
			LoadAllHolidays();

   			var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate ge '"+StartDate+"' and AttendanceDate le '"+EndAttandence+"' and Employee eq '"+EMPID+"' ";
			UpdateHeaderfields(requestUri);
   			
   			var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=LogonName eq '"+EMPID+"' and Company/ID  eq '" + CompanyID +"'";
			//EmployeeListDat(Ownurl);
		}
		else
		{
			alert("Unauthorized access!");
		}
   	}	
	
	LoadAllHolidays();
}


function GetFilterData(requestUri) 
{
	jQuery.ajax({  
		url: requestUri,
    	headers: { Accept: "application/json;odata=verbose" },
		async: false,
		success: function (data)
		{  
			    
			var items = data.d.results;
			var TotalAttendance=[];
			TotalLeavesorAbsent=[];

			for (var i = 0; i < items.length; i++)  
			{ 
				if(items[i].AttendanceType != "On-Leave" && items[i].AttendanceType != "Holiday" )
				{
					TotalAttendance.push(items[i].AttendanceType);
				}
				else if(items[i].AttendanceType == "On-Leave")
				{
					TotalLeavesorAbsent.push(items[i].AttendanceType);
				}				
			}
			$("#Total-Attendance").text(TotalAttendance.length);
        	
		}, 
		error: function (request, error) 
		{  
			console.log(JSON.stringify(request));  
		}  
	});  
}


var G_Validateholiday=false;
function GetHolidays(selectdate)
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CompanyHoliday')/items?$filter=OfficeLocationID eq ('"+LocID+"')and Holiday_start eq '"+selectdate+"' and CompanyID eq '"+titanForWork.getQueryStringParameter('CompanyId')+"'&$top=200&$orderby=Holiday_start asc";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var items = data.d.results;  
            if (items.length > 0) 
			{ 
				$("#HolidayMessagediv").text(items[0].Title);
				$("#HolidayMessage").css("display", "block");
				G_Validateholiday=true;			
            }
            else
            {
            	$("#HolidayMessagediv").text("");
            	$("#HolidayMessage").css("display", "none");
            	G_Validateholiday=false;	
            }  
        },
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });
}




var EmpAttendanceData=[];
var TotalLeavesorAbsent=[];
function UpdateHeaderfields(requestUri) {

	jQuery.ajax({  
	url: requestUri,
    headers: { Accept: "application/json;odata=verbose" },
		async: true,
		success: function (data)
		{  
			EmpAttendanceData =[];     
			var items = data.d.results;
			var TotalAttendance=[];
			TotalLeavesorAbsent=[];
			for (var i = 0; i < items.length; i++)  
			{ 
				if(items[i].AttendanceType != "On-Leave" && items[i].AttendanceType != "Holiday" )
				{
					TotalAttendance.push(items[i].AttendanceType);
				}
				else if(items[i].AttendanceType == "On-Leave")
				{
					TotalLeavesorAbsent.push(items[i].AttendanceType);
				}
				else if(items[i].AttendanceType == "Holiday")
				{
					TotalLeavesorAbsent.push(items[i].AttendanceType);
				}
					
				var itemid = items[i].ID;
				var EmployeeName = items[i].Employee.Title;
				var EmpId = items[i].Employee.ID;
				var attendDate = formatDateReportEmp(items[i].AttendanceDate);
				var attendType = items[i].AttendanceType;
				var workhours = items[i].WorkHours;
				var HrAction = items[i].HrAction;	   
					EmpAttendanceData.push({UserId : EmpId,EmpName:EmployeeName, AttendanceDate : attendDate, AttendanceType : attendType, AttendanceItemId : itemid, EmpWorkHours : workhours,HrAction:HrAction});       
			}
			var tableItemsHTML ='';
			var AbsentCounter=0;
			var PresentCounter=0;
			for(var j=0; j<Totaldays; j++)
			{
				var date = new Date(GstartDate);
				date.setDate(date.getDate() + j);
				var StartDate = moment(date,'DD/MM/YYYY').format('YYYY-MM-DD');
            	var StartDate =StartDate.split('-').join('');
				var newdate = formatDateReportEmp(date);
				var IsUserInEmpAttendanceGroup = EmpAttendanceData.map(function(e) { return e.AttendanceDate; }).indexOf(newdate);
               	if(IsUserInEmpAttendanceGroup!=-1)
               	{	
               		var Attendance = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceType;
               		var attendhour = EmpAttendanceData[IsUserInEmpAttendanceGroup].EmpWorkHours;
               		var HrAction = EmpAttendanceData[IsUserInEmpAttendanceGroup].HrAction;
               		var UserID = EmpAttendanceData[IsUserInEmpAttendanceGroup].UserId;
               		var ItemID = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceItemId;                		
               		                		
                	PresentCounter = PresentCounter+1;								
				}
				else
				{
					AbsentCounter = AbsentCounter +1;										
				}
			}				
        	
        	//$("#Total-Leave-Absent").text(parseInt(AbsentCounter)+parseInt(TotalLeavesorAbsent.length));//HoliaysTotal
        	var TotalLeaveAbsent= ((parseInt(TotalLeavesorAbsent.length)+parseInt(AbsentCounter))-parseInt($("#HoliaysTotal").text()));
        	if(TotalLeaveAbsent<0)
        	{
        		TotalLeaveAbsent = 0;
        	}
        	//$("#Total-Leave-Absent").text(parseInt(AbsentCounter)+parseInt(TotalLeavesorAbsent.length));//HoliaysTotal
        	//$("#Total-Leave-Absent").text(((parseInt(TotalLeavesorAbsent.length)+parseInt(AbsentCounter))-parseInt($("#HoliaysTotal").text())));//HoliaysTotal
        	//$("#Total-Leave-Absent").text(TotalLeaveAbsent);//HoliaysTotal
        	//$("#Total-Leave-Absent").text(parseInt(TotalLeavesorAbsent.length));//HoliaysTotal
        	$("#EmpTotalItemscount").text(Totaldays);
        	var AttCount = parseInt(PresentCounter)-parseInt(TotalLeavesorAbsent.length)
        	$("#Total-Attendance").text(Math.abs(AttCount));//Math.abs(-7.25);        		
		}, 
		error: function (request, error) 
		{  
			console.log(JSON.stringify(request));  
		}  
	}); 	 
	//LoadAllHolidays();
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

