var Attendancechck=true;
$(document).ready(function(){ 
  authentication();
  GetManagerID();
  
});

function Attendance()
{	debugger;
    var LoggedEmp = _spPageContextInfo.userId; 
    /*---add by lakhan-06/01/2022----*/
    if(Attendancechck==false){
      alert('This feature has been deactivated !');
      $('#MyAttendance').modal('toggle');      
      return false;
    } 
    
   
    var f = new Date(ConvertDateTimeFormat($("#timesheetdate").val(), '/'));
    var Attdate_string = f.getFullYear() + "-" + (f.getMonth()+1) + "-" + f.getDate();
    
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmpAttendance')/items?$filter=EmployeeId eq '"+LoggedEmp+"' and AttendanceDate eq '"+Attdate_string+"'  ";  
    $.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
		success: function (data) 
		{debugger;
			var items = data.d.results;  
            if (items.length > 0) 
			{  
				if(G_Validateholiday == true)
				{
					if (confirm('This is a Holiday, are you sure to submit your attendance.')) 
					{
    					var ID=items[0].ID;
                		UpdateAttendance(ID);
					}								
				}
				else
				{
					var ID=items[0].ID;
               		UpdateAttendance(ID);				
				}                								
            }
            else
            {
            	//SetAttendance();
            	if(G_Validateholiday == true)
				{
					if (confirm('This is a Holiday, are you sure to submit your attendance.')) 
					{
    					SetAttendance();
    				}								
				}
				else
				{
					SetAttendance();				
				}        
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
	var AttendanceDate= ConvertDateTimeFormat($("#timesheetdate").val(), '/')
    	AttendanceDate= new Date(AttendanceDate);; 
    var LoggedEmp = _spPageContextInfo.userId; 
    if($("#AttendanceDDL").val() != "0" && $("#AttendanceDDL").val() != "Holiday" || G_Validateholiday==true)
    {  
		$.ajax({  
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpAttendance')/items('"+ID+"')",
        type: "POST",  
        data: JSON.stringify  
        ({  
            __metadata:  
            {  
                type: "SP.Data.EmpAttendanceListItem"  
            },  
            Title: "Attendance",  
            EmployeeId:LoggedEmp,
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
        success: function(data, status, xhr)  
        { 
         	alert("Attendance has been saved.");
         	$('#MyAttendance').modal('toggle');
         	$("#timesheetdate").datepicker({ dateFormat: "dd/mm/yy",maxDate: 0 }).datepicker("setDate", new Date());

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
    	alert("Plese select proper attandence.");
    }
 }
 
 
function SetAttendance()
{debugger;
	var AttendanceDate= ConvertDateTimeFormat($("#timesheetdate").val(), '/')
   		AttendanceDate= new Date(AttendanceDate);; 
    var LoggedEmp = _spPageContextInfo.userId;
    if($("#AttendanceDDL").val() != "0" && $("#AttendanceDDL").val() != "Holiday" || G_Validateholiday==true)
    {
    	$.ajax({  
     	url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpAttendance')/items",  
        type: "POST",  
        data: JSON.stringify  
        ({  
            __metadata:{  type: "SP.Data.EmpAttendanceListItem"  },  
            Title: "Attendance",  
            EmployeeId:LoggedEmp,
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
            alert("Attendance has been saved.");
            $('#MyAttendance').modal('toggle');
            $("#timesheetdate").datepicker({ dateFormat: "dd/mm/yy",maxDate: 0 }).datepicker("setDate", new Date());
        },  
        error: function(data)  
        {  
            console.log("SetAttendance function failed");
            console.log(data);
        }  
   	});
   	}
   	else
   	{
   		alert("Plese select proper attandence.");
	}   
}

function SetAttendanceDDL()
{	
    var LoggedEmp = _spPageContextInfo.userId;   
    var f = new Date(ConvertDateTimeFormat($("#timesheetdate").val(), '/'));
    var Attdate_string = f.getFullYear() + "-" + (f.getMonth()+1) + "-" + f.getDate();
    GetHolidays(Attdate_string);
       
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
            		$("#HR-Message").css("display", "block");
            		$("#Submit-attendance").css("display", "none");            		            	
				}
				else
				{
					$("#AttendanceDDL").prop('disabled', false);
					$("#HR-Message").css("display", "none");
					$("#Submit-attendance").css("display", "inline-block");
				}    
            }
            else
            {
            	
            	if($("#AttendanceDDL").val()=="0")
            	{
            		$("#AttendanceDDL").val('0');
            	}
            	
            	$("#AttendanceDDL").prop('disabled', false);
            	$("#HR-Message").css("display", "none");
            	$("#AttendanceDDL").val('0');
            	$("#Submit-attendance").css("display", "inline-block");
			}  
		},
		error: function (data) 
		{  
        	console.log("Attendance function failed");
            console.log(data);
		}  
	});
}


function ConvertDateTimeFormat(date, delimiter) 
{
    return date.split(delimiter)[1] + "" + delimiter + "" + date.split(delimiter)[0] + "" + delimiter + "" + date.split(delimiter)[2];
}


var G_ManagerID=0;
function GetManagerID()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$filter=LogonName eq ('"+_spPageContextInfo.userId+"')";  
    $.ajax({    
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        {			 
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
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });  
}


function SetCurrentdate()
{
	$("#timesheetdate").datepicker({ dateFormat: "dd/mm/yy",maxDate: 0 }).datepicker("setDate", new Date());

}

var G_Validateholiday=false;
function GetHolidays(selectdate)
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CompanyHoliday')/items?$filter=OfficeLocationID eq ('"+Logged_Location+"')and Holiday_start eq '"+selectdate+"' and CompanyID eq '"+titanForWork.getQueryStringParameter('CompanyId')+"'&$top=200&$orderby=Holiday_start asc";  
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


/*-----------------06/01/2022 Add by lakhan ----------------------------*/

var AttendanceEntry=true;
function authentication(){
	var UserName= _spPageContextInfo.userDisplayName;
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EnvironmentalSettings')/items?$select=Title,Active,ListOfUsers/Title&$filter=Title eq 'Attendance Entry' or Title eq 'Timesheet Entry' &$expand=ListOfUsers/Id";
	$.ajax({
		url: requestUri,
		async: false,
		type: "GET",
		headers: {
		"accept":"application/json; odata=verbose"
		},
		success:function(data) {
		debugger;
		 var objItems = data.d.results;
		 if(objItems.length>0){
		    for(var i=0;i<objItems.length;i++){
		      if(objItems[i].Title=='Timesheet Entry'){
		         if(objItems[i].Active==false){
		             Attendancechck=false;
		             $('#Timesheet-toggle-li').hide();
		             $("#Reports-menu>ul li").eq(2).css("display", "none");
		          }
		      }
		      if(objItems[i].Title=='Attendance Entry'){
		         if(objItems[i].Active==false){
		             $('#Attendance-toggle-li').hide();
		             $("#Reports-menu>ul li").eq(0).css("display", "none");
		             $("#Reports-menu>ul li").eq(1).css("display", "none");
		             //$("#Reports-menu>ul li").eq(2).css("display", "none");
                     //Attendancechck=false
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

