var GCompanyId='';
var GOfficeDays = '';
$(document).ready(function(){

    userActivityNotificationEntry(_spPageContextInfo.userId,window.location);
    
 	GCompanyId = titanForWork.getQueryStringParameter("CompanyId");
 	$("#attendance-reportTo").datepicker({ dateFormat: "dd/mm/yy",maxDate: new Date()}).datepicker("setDate", new Date());
 	$('#attendance-reportFrom').datepicker({      
		dateFormat: 'dd/mm/yy',
    }).datepicker("setDate",'-7d');

	$("#FromDate").text(formatDateReport(ConvertDateTimeFormat($("#attendance-reportFrom").val(),'/')));
	$("#ToDate").text(formatDateReport(ConvertDateTimeFormat($("#attendance-reportTo").val(),'/')));
	
	var start= $("#attendance-reportFrom").datepicker("getDate");
    	var end= $("#attendance-reportTo").datepicker("getDate");
   			days = (end- start) / (1000 * 60 * 60 * 24);
   		var Totaldays = (Math.round(days));
   		GOfficeDays = (Math.round(days));
   		
   	LoadAllOfficeLocation();
	LoadAllDepartment();
	LoadAllHolidays();
	
	$("#SelectedLocation").text($("#OfficeLoc option:selected").text());
	initializePeoplePicker("Manager"); 
	initializePeoplePicker("Employee"); 
	
	$('#attendance-report-filter').modal('show');

});

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


function GetUserTitle(ID) 
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
         		UserId = data.d.Title;          
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


function ConvertDateTimeFormat(date, delimiter) 
{
    return date.split(delimiter)[1] + "" + delimiter + "" + date.split(delimiter)[0] + "" + delimiter + "" + date.split(delimiter)[2];
}


function formatDateReport(d) 
{
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
         return    day  + " " +month[date.getMonth()] +" "+date.getFullYear();
    }
}


function LoadAllOfficeLocation()
{
 	$("#OfficeLoc").empty(); 
    var Ownurl =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OfficeLocation')/items?$select=ID,OfficeName,CompanyID/ID&$expand=CompanyID&$top=5000&$filter=CompanyID/ID eq '"+GCompanyId+"'&$orderby=OfficeName asc"; 
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (response)
        {
            for (var i = 0; i < response.d.results.length; i++)
            {
                $("#OfficeLoc").append('<option value="' + response.d.results[i].ID + '">' + response.d.results[i].OfficeName + '</option>');
            }
        }, myError: function (response) {
           
        }
    });
}


function LoadAllDepartment()
{
 	$("#DepartmentDDL").empty(); 
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?select=ID,Title&$filter=CompanyID eq '"+GCompanyId+"'&$orderby=Title asc"; 
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response)
        {
        	$('<option value="All">All</option>').appendTo("#DepartmentDDL");
            for (var i = 0; i < response.d.results.length; i++)
            {
                $("#DepartmentDDL").append('<option value="' + response.d.results[i].ID + '">' + response.d.results[i].Title + '</option>');
            }
        }, myError: function (response) {
           
        }
    });
}


var TotalOfficeDays = 0;
var GtotalHolidays=0;
function LoadAllHolidays()
{
 	var Location = $("#OfficeLoc").val();
 	TotalOfficeDays =0;
 	GtotalHolidays=0; 	
 	var f = new Date(ConvertDateTimeFormat($("#attendance-reportFrom").val(), '/'));
    var Startdate = f.getFullYear() + "-" + (f.getMonth()+1) + "-" + f.getDate();

    var f1 = new Date(ConvertDateTimeFormat($("#attendance-reportTo").val(), '/'));
    var EndDate = f1.getFullYear() + "-" + (f1.getMonth()+1) + "-" + f1.getDate(); 
    
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CompanyHoliday')/items?select=*,ID,Title&$filter=OfficeLocationID eq '"+Location+"' and CompanyID eq '"+GCompanyId+"' and Holiday_start ge '"+Startdate+"' and Holiday_start le '"+EndDate+"'"; 
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (response)
        {
        	var TotalHolidays = response.d.results.length;
        	GtotalHolidays = TotalHolidays;
        	$("#TotalHolidays").text(TotalHolidays);        	
        	$("#TotalOfficeDays").text(parseInt(GOfficeDays)-parseInt(TotalHolidays));
        	TotalOfficeDays = parseInt(GOfficeDays)-parseInt(TotalHolidays);       	
        }, 
        myError: function (response) {
           
        }
    });
}


function Applyfilter()
{
	$("#FromDate").text(formatDateReport(ConvertDateTimeFormat($("#attendance-reportFrom").val(),'/')));
	$("#ToDate").text(formatDateReport(ConvertDateTimeFormat($("#attendance-reportTo").val(),'/')));
	$("#SelectedLocation").text($("#OfficeLoc option:selected").text());
	
	$("#FdateTH").text(formatDateReport(ConvertDateTimeFormat($("#attendance-reportFrom").val(),'/')));
	$("#EdateTH").text(formatDateReport(ConvertDateTimeFormat($("#attendance-reportTo").val(),'/')));
	$("#officeLocTH").text($("#OfficeLoc option:selected").text());
	$("#TotalWorkdayTH").text(TotalOfficeDays);
	$("#HolidaysTH").text(GtotalHolidays);	
	
	var start= $("#attendance-reportFrom").datepicker("getDate");
    var end= $("#attendance-reportTo").datepicker("getDate");
   		days = (end- start) / (1000 * 60 * 60 * 24);
   	GOfficeDays= (Math.round(days)+1);
   	LoadAllHolidays();
   	
   	$('#attendencedateValue').val("");
	var AttendanceDate = $("#attendance-reportFrom").val();
	var date_attendancTday = moment($("#attendance-reportFrom").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
	var date_attendancEnd = moment($("#attendance-reportTo").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
	$('#daydate').text($.datepicker.formatDate('D, dd', new Date(date_attendancTday))); 
	$('#monthhyear').text($.datepicker.formatDate('M  yy', new Date(date_attendancTday)));
	
	var restquery='';
	var AttendanceChips='';
	if($('#OfficeLoc').val() != "All" )
	{
		restquery += "and OfficeLocation eq '"+$('#OfficeLoc').val()+"' ";
	   	AttendanceChips +="<div class='upload-chip'>"+$('#OfficeLoc option:selected').text()+"</div>";		 
	}	
	if($('#DepartmentDDL').val() != "All" )
	{
		restquery += "and Department eq '"+$('#DepartmentDDL').val()+"' ";
		AttendanceChips +="<div class='upload-chip'>"+$('#DepartmentDDL option:selected').text()+"</div>";		 
	}	
	var ManagerID = ensureUser($('#Manager').children().children().attr('id'))
	var EmployeeID = ensureUser($('#Employee').children().children().attr('id'))

	if(ManagerID != 0)
	{
		restquery += "and ManagerLoginName eq '"+ManagerID+"' ";
		AttendanceChips +="<div class='upload-chip'>"+GetUserTitle($('#Manager').children().children().attr('id'))+"</div>";		
	}
	if(EmployeeID != 0)
	{
		restquery += "and LogonName/ID eq '"+EmployeeID+"' ";
		AttendanceChips +="<div class='upload-chip'>"+GetUserTitle($('#Employee').children().children().attr('id'))+"</div>";				
	}	
	
	$("#chips").empty();
	$("#chips").append(AttendanceChips);
	
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate ge '"+date_attendancTday+"' and AttendanceDate le '"+date_attendancEnd+"' ";
	$.when(getFileData(requestUri)).done(function (ProcessListResult) {
		var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,ManagerLoginName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,ManagerLoginName,OfficeLocation,Company,Department&$filter=Status eq 'Active' and Company/ID  eq '" + GCompanyId +"'"+restquery;
		EmployeeListDat(Ownurl);
	});
}

var TempStore=[];
var unique ="";
function getFileData(requestUri) {
	jQuery.ajax({  
	url: requestUri,
    headers: { Accept: "application/json;odata=verbose" },
		async: false,
		success: function (data)
		{  
			EmpAttendanceData =[];     
			var items = data.d.results;
			if(items.length > 0) 
			{
				TempStore=[];
				for (var i = 0; i < items.length; i++)  
				{ 
					TempStore.push(items[i].Employee.ID);					
				}
				unique = TempStore.filter(function(itm, i, TempStore) {
    				return i == TempStore.indexOf(itm);
				});
				if(unique.length>0)
				{					
					EmpAttendanceData =[]; 
					for(var j=0; j<unique.length; j++)
					{	
						var workhours = 0;
						var AttendancDays=[];
						var LeavesDay=[];
						var date_attendancTday = moment($("#attendance-reportFrom").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
						var date_attendancEnd = moment($("#attendance-reportTo").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
						var EmployeeID = unique[j];
						var requestUri4Emp = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate ge '"+date_attendancTday+"' and AttendanceDate le '"+date_attendancEnd+"' and Employee eq '"+EmployeeID+"' ";

						jQuery.ajax({  
						url: requestUri4Emp,
    					headers: { Accept: "application/json;odata=verbose" },
						async: false,
						success: function (data)
						{  							    
							var items = data.d.results;
							if(items.length > 0) 
							{
								for (var k = 0; k < items.length; k++)  
								{ 
									var itemid = items[k].ID;
									var EmployeeName = items[k].Employee.Title;
									var EmpId = items[k].Employee.ID;
									var attendDate = items[k].AttendanceDate;
									var attendType = items[k].AttendanceType;
									if(attendType == "Full Day" || attendType == "1st Half" || attendType == "2nd Half")
									{
										AttendancDays.push(attendType);
									}
									else if(attendType == "On Leave")
									{
										LeavesDay.push(attendType);
									}
									if(items[k].WorkHours != null)
									{
										workhours  = parseInt(workhours)+parseInt(items[k].WorkHours);
									}
									var HrAction = items[k].HrAction;
									var TotalActiveDays = parseInt(AttendancDays.length)+parseInt(LeavesDay.length);
									var NotActionDays = parseInt(TotalOfficeDays)-parseInt(TotalActiveDays);
									if(NotActionDays < 0)
									{
										NotActionDays = 0;
									}								
								}
								var percentage = Math.round(((parseInt(TotalActiveDays) / parseInt(TotalOfficeDays)) * 100)) +"%";
								if(TotalOfficeDays == "0")
								{
									percentage = "-";
								}
								
								EmpAttendanceData.push({UserId : EmpId,EmpName:EmployeeName, AttendanceDate : attendDate, AttendanceType : attendType, AttendanceItemId : itemid, EmpWorkHours : workhours,HrAction:HrAction,AttendancDays:AttendancDays.length,LeavesDay:LeavesDay.length,NotActionDays:NotActionDays,percentage:percentage});       
							}
						}, 
						error: function (request, error) 
						{  
							console.log(JSON.stringify(request));  
						}  
						});  
					}
				}			  
			}
		}, 
		error: function (request, error) 
		{  
			console.log(JSON.stringify(request));  
		}  
	});  
}


function EmployeeListDat(Ownurl)
{
	$.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
	success: function (data) 
	{
		var items = data.d.results;
		$("#ReportTable").empty();
        var tableItemsHTML = "";
        if(items.length>0)
        {   
        	var TotalPresent=0;
        	var Totalnotspecific=0; 
        	var TotalOnLeave=0;        	
        	for (var i = 0; i < items.length; i++) 
            {   				
				var DataID = items[i].ID;
				var EID = items[i].LogonName.ID;
                var EmployeeName = items[i].LogonName.Title;	
                var Designation = items[i].Designation;	
                var Department= items[i].Department.DepartmentName;
                var Manager= items[i].ManagerLoginName.Title;
                	if(Manager == undefined)
                	{
                		Manager = "";
                	}
				var AttendeeTotalWhour='00:00 (H:M)';
                var attenItemId='';
                var colorcode = "black";  
                if(Designation == null)
                {
					Designation ='';
                }	
                var OfficeLocation = items[i].OfficeLocation.OfficeName;	
				if(OfficeLocation==null)
                {
					OfficeLocation ='';
                }
                EmployeeId= items[i].LogonName.ID;
                var StartDate = moment($("#attendance-reportFrom").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
                        var EndDate = moment($("#attendance-reportTo").val(),'DD/MM/YYYY').format('YYYY-MM-DD');   
                        
						var StartDate =StartDate.split('-').join('');
                        var EndDate = EndDate.split('-').join(''); 
                var RedirectLink = _spPageContextInfo.webServerRelativeUrl + "/Pages/EmployeeReport.aspx?EID="+EID+"&start="+StartDate+"&end="+EndDate+"&WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/Report.aspx#";

                var IsUserInEmpAttendanceGroup = EmpAttendanceData.map(function(e) { return e.UserId; }).indexOf(EmployeeId);
                if(IsUserInEmpAttendanceGroup!=-1)
                {
					//if($('#AttendanceType').val() != "Not Specified")
                    //{
						var userId = EmpAttendanceData[IsUserInEmpAttendanceGroup].UserId; 
                        var Attendance = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceType;
                        var AttendItemId = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceItemId;
							AttendeeTotalWhour = EmpAttendanceData[IsUserInEmpAttendanceGroup].EmpWorkHours;
                        var attendhour = EmpAttendanceData[IsUserInEmpAttendanceGroup].EmpWorkHours;
                            attenItemId = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceItemId;
                        var AttendancDays = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendancDays;
                        var LeavesDay = EmpAttendanceData[IsUserInEmpAttendanceGroup].LeavesDay;
                        var NotActionDays =EmpAttendanceData[IsUserInEmpAttendanceGroup].NotActionDays;
                        var percentage = EmpAttendanceData[IsUserInEmpAttendanceGroup].percentage;
                        var chkboxtrue='';
            			if(EmpAttendanceData[IsUserInEmpAttendanceGroup].HrAction == true){ chkboxtrue = "checked"; }
            			else { chkboxtrue = ""; }
            			
						if(AttendeeTotalWhour==null) { AttendeeTotalWhour='00:00 (H:M)' }
                        if(Attendance == "On Leave")
                        {
                            colorcode = "red";
                            TotalOnLeave++
                        }
                        if(Attendance == "Holiday") {colorcode = "blue"; }
                        //var StartDate = moment($("#attendance-reportFrom").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
                        //var EndDate = moment($("#attendance-reportTo").val(),'DD/MM/YYYY').format('YYYY-MM-DD');   
                        
						//var StartDate =StartDate.split('-').join('');
                        //var EndDate = EndDate.split('-').join('');       
                                             
                        //var RedirectLink = _spPageContextInfo.webServerRelativeUrl + "/Pages/EmployeeReport.aspx?EID="+EID+"&start="+StartDate+"&end="+EndDate+"&WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"&sourcelocation=../Pages/Report.aspx#";

						tableItemsHTML += "<tr class='text-center'>";
						tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2'>"+EmployeeName+"</div></td>";
						tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2'>"+Designation +"</div></td>";
						tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>"+Department+"</div></td>";
						tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2'>"+Manager+"</div></td>";
						tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>"+AttendancDays+"</div></td>";
						tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>"+NotActionDays+"</div></td>";
						tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>"+LeavesDay+"</div></td>";
						tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>"+ConvertHHMM(AttendeeTotalWhour)+"</div></td>";
						tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>"+percentage+"</div></td>";
						tableItemsHTML += "<td><div class='attendance-report-edit-lock-btn-box text-center'><a href='"+RedirectLink+"' class='custom-edit-btn'><i class='fa fa-chevron-right'></i></a></div></td>";
						tableItemsHTML += "</tr>";
					//}
                }
                else
                {
					tableItemsHTML += "<tr class='text-center'>";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2'>"+EmployeeName+"</div></td>";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2'>"+Designation +"</div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>"+Department+"</div></td>";
					tableItemsHTML += "<td class='text-left'><div class='attendance-report-table-ellipsis-2'>"+Manager+"</div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>0</div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>"+TotalOfficeDays+"</div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>0</div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>00:00</div></td>";
					tableItemsHTML += "<td><div class='attendance-report-table-ellipsis-2'>-</div></td>";
					tableItemsHTML += "<td><div class='attendance-report-edit-lock-btn-box text-center'><a href='"+RedirectLink+"' class='custom-edit-btn'><i class='fa fa-chevron-right'></i></a></div></td>";
					tableItemsHTML += "</tr>";
                }
            }
		}
		else
        {
        }

		if (items.length == 0) 
        {
			$(".NoRecordFound").show();
        }
        else
        {
			$(".NoRecordFound").hide();
        }
        
        $("#ReportTable").append(tableItemsHTML);
                 
		var totalRowCount =  $('#ReportTableData>tbody >tr').length;
		$("#TotalItemscount").text(totalRowCount);
		$("#totalemp").text(totalRowCount);
        if (totalRowCount >0) 
		{
	        ReportTableConfiguration();	      
		}
	},
	error: function (data) 
	{		
		console.log(data);  
	}  
	});
}


function ReportTableConfiguration()
{
    sorter = new TINY.table.sorter('sorter', 'ReportTableData', {
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
        currentid: 'Repcurrentpage',
        totalid: 'Reptotalpages',
        startingrecid: 'Repstartrecord',
        endingrecid: 'Rependrecord',
        totalrecid: 'Reptotalrecords',
        hoverid: 'selectedrow',
        pageddid: 'pagedropdown',
        navid: 'tablenav',
        //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        sortdir: 1,
        init: true
                
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

function CloseModel()
{
	initializePeoplePicker("Manager"); 
	initializePeoplePicker("Employee"); 
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

