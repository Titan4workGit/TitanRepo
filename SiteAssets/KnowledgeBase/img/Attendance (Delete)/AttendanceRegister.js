var EmpAttendanceData=[];
var txtCompanyId='';
var selectedAttendListItem  = new Array();
$(document).ready(function(){
 txtCompanyId =titanForWork.getQueryStringParameter("CompanyId");
 
 //	var d = new Date();
//var TodayDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

$("#attendanceDate").datepicker({ dateFormat: "dd/mm/yy",maxDate: new Date()}).datepicker("setDate", new Date());
$("#attendencedateValue").text($("#timesheetFrom").val());

//$('#attendanceDate').val(TodayDate); 
//$('#attendencedateValue').val(TodayDate); 


//getFileData() ;
//EmployeeListDat();

EmpAttendanceTodayData()


initializePeoplePicker("EmployeeAttendence"); 


 bindAllDepartment();
 bindAllOfficeLocation()
    
   $("#mutipleFilter").click(function() {
    MutipleBaseFilter()
        });
        
        $("#clearControl").click(function() {
          ClearFilterForAttendence()
        });
        
         $("#closeCross").click(function() {
          ClearFilterForAttendence()
        });
        
        
        
         $("#updateMutipleCheckBox").click(function() {
          if(selectedAttendListItem.length>0)
          {
             $("#totalAttendItem").text("");
            $("#totalAttendItem").text(selectedAttendListItem.length);
          
              $('#updateMutipleAttend').modal('show');
          }
          else
          {
           alert("Please select Employees to update Attendance");
          }

        });

        
        
          $("#applyMutipleSelectedUpdate").click(function() {
                $('#showLoderForMutiple').show();
             // UpdateMultipleSelectedItem();
               setTimeout(function(){  UpdateMultipleSelectedItem(); }, 1000);
        });
        


 $("#selectAll").click(function() {

    $(".Attenid").prop("checked", $(this).prop("checked"));
   
    
     selectedAttendListItem = [];

        $('.Attenid').each(function () 
        {
            if($(this).prop("checked")==true)
            {
                var itemid = $(this).val();
                
                var currentRow=$(this).closest("tr"); 
             
                var EmployeeName = currentRow.find('.EmpName').text();
                var EmployeeID = currentRow.find('.EmpID').text();


             selectedAttendListItem.push({ AttenListitemId: itemid ,EmpName:EmployeeName,Empid:EmployeeID});

  
            }
           
        });
   });
   


});




function EmpAttendanceTodayData()
{
$('#attendencedateValue').val("");

/*	var d = new Date();
var strDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();

var from = strDate.split("/");
    var f = new Date(from[2], from[1], from[0]);
    var date_attendancTday = f.getFullYear() + "-" + f.getMonth() + "-" + f.getDate();
    
    $('#attendanceDate').val(date_attendancTday); 
$('#attendencedateValue').val(date_attendancTday);

    $('#daydate').text($.datepicker.formatDate('D, dd', new Date(date_attendancTday))); 
$('#monthhyear').text($.datepicker.formatDate('M  yy', new Date(date_attendancTday)));
*/


	var AttendanceDate = $("#attendanceDate").val();
	//var from = AttendanceDate.split("/");
   // var f = new Date(from[2], from[1], from[0]);
   // var date_attendancTday = f.getFullYear() + "-" + f.getMonth() + "-" + f.getDate();

   var date_attendancTday = moment($("#attendanceDate").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
   GetHolidays(date_attendancTday);
    
    debugger;
    $('#attendencedateValue').val(AttendanceDate);

      $('#daydate').text($.datepicker.formatDate('DD', new Date(date_attendancTday))); 
$('#monthhyear').text($.datepicker.formatDate('dd M yy', new Date(date_attendancTday)));



    
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate eq '"+date_attendancTday+"' ";

//	getFileData(requestUri);
  $.when(getFileData(requestUri)).done(function (ProcessListResult) {
  var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=Status eq 'Active' and Company/ID  eq '" + txtCompanyId +"'";

  EmployeeListDat(Ownurl);
});

}



function getFileData(requestUri) {
//var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate eq '"+date_string+"' ";
   jQuery.ajax({  
   url: requestUri,
    headers: { Accept: "application/json;odata=verbose" },
		async: false,
		success: function (data) {  
		 EmpAttendanceData =[];     
    
        var items = data.d.results;
        if(items.length > 0) 
        {
        for (var i = 0; i < items.length; i++)  { 
             
                var itemid = items[i].ID;
				var EmployeeName = items[i].Employee.Title;
				var EmpId = items[i].Employee.ID;
				var attendDate = items[i].AttendanceDate;
				var attendType = items[i].AttendanceType;
				var workhours = items[i].WorkHours;
				var HrAction = items[i].HrAction;
                  
               
		   
              EmpAttendanceData.push({UserId : EmpId,EmpName:EmployeeName, AttendanceDate : attendDate, AttendanceType : attendType, AttendanceItemId : itemid, EmpWorkHours : workhours,HrAction:HrAction});       
       }  
       }
       
  }, 
  
    error: function (request, error) {  
        console.log(JSON.stringify(request));  
    }  
});  
}




function EmployeeListDat(Ownurl)
{debugger;
//var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=Status eq 'Active' and Company/ID  eq '" + txtCompanyId +"'";
	$.ajax({  
	url: Ownurl,  
	headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
	success: function (data) 
	{debugger;
		var items = data.d.results;
		$("#tattendanceRegtable").empty();
    	//$("#TotalItemscount").text(items.length);
    	//$("#totalemp").text(items.length);
        var tableItemsHTML = "";
        if(items.length>0)
        {   
        	//var TotalLoginMinutes=0; 
        	var TotalPresent=0;
        	var Totalnotspecific=0; 
        	var TotalOnLeave=0; 
        				
			for (var i = 0; i < items.length; i++) 
            {   				
            					
                                var DataID = items[i].ID;
                                 var EmployeeName = items[i].LogonName.Title;	
                                 var Designation = items[i].Designation;	
                                 var Department= items[i].Department.DepartmentName;
                                // var AttendeeTotalWhour='';
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
                                   
                                   var IsUserInEmpAttendanceGroup = EmpAttendanceData.map(function(e) { return e.UserId; }).indexOf(EmployeeId);
                                   	
                                  //   for(j=0;j<EmpAttendanceData.length;j++)
                                   //  {
                                   if(IsUserInEmpAttendanceGroup!=-1)
                                   {
                                   if($('#AttendanceType').val() != "Not Specified")
                                   {
                                       var userId = EmpAttendanceData[IsUserInEmpAttendanceGroup].UserId; 
                                       var Attendance = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceType;
                                       var AttendItemId = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceItemId;
                                        AttendeeTotalWhour = EmpAttendanceData[IsUserInEmpAttendanceGroup].EmpWorkHours;
                                       
                                         var attendhour = EmpAttendanceData[IsUserInEmpAttendanceGroup].EmpWorkHours;
                                        
                                           attenItemId = EmpAttendanceData[IsUserInEmpAttendanceGroup].AttendanceItemId;
                                           var chkboxtrue='';
            					
            	     					if(EmpAttendanceData[IsUserInEmpAttendanceGroup].HrAction == true)
            	     					{
            	     						chkboxtrue = "checked";
            	     					}
            	     					else
            	     					{
            	     						chkboxtrue = "";
            	     					}

                                     //  if(AttendeeTotalWhour==null) { AttendeeTotalWhour='' }
                                        if(AttendeeTotalWhour==null) { AttendeeTotalWhour='00:00 (H:M)' }
                                       
                                       if(Attendance != "On Leave" && Attendance != "Holiday")
                                       {
                                           TotalPresent++
                                       }
                                       if(Attendance == "On Leave")
                                       {
                                       colorcode = "red";
                                       TotalOnLeave++
                                       
                                       }
                               if(Attendance == "Holiday") {colorcode = "blue"; }

 tableItemsHTML += "<tr class='text-center'>";
 tableItemsHTML += "<td><input type='checkbox' class='Attenid'  value='"+attenItemId+"'></td>";

tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 EmpName'>"+EmployeeName+"</div><span style='display:none' class='EmpID'>"+EmployeeId+"</span></td>";
tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 Designation'>"+Designation +"</div></td>";
tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 Department'>"+Department+"</div></td>";
tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 OfficeLocation'>"+OfficeLocation +"</div></td>";
tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 Attendancetype' style='color:"+colorcode +"'>"+Attendance +"</div></td>";
 if(attendhour==null)
 {
  tableItemsHTML += "<td><a href='#'>"+AttendeeTotalWhour +"</a> </td>";
 }
 else
 {
  tableItemsHTML += "<td><a href='#'>"+ConvertHHMM(AttendeeTotalWhour) +" (H:M)</a> </td>";
 }
 tableItemsHTML += "<td><input type='checkbox' name='HRACTIONCHK' value='"+attenItemId+"' onclick='HrActionVerify(this.value)' "+chkboxtrue+"></td>";

tableItemsHTML += "<td><div class='attendance-edit-lock-btn-box text-center'> <a href='#' class='custom-edit-btn' onclick=\'attendanceEditModal(this,"+AttendItemId+")\'><i class='fa fa-pencil'></i> </a></div></td>";
tableItemsHTML += "</tr>";

}
                                       
                                       }
                                       else
                                       {
                                       if($('#AttendanceType').val() == "All" || $('#AttendanceType').val() == "Not Specified")
                                       {
                                       tableItemsHTML += "<tr class='text-center'>";
                                        tableItemsHTML += "<td><input type='checkbox' class='Attenid'  value='"+attenItemId+"'></td>";
                                        
tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 EmpName'>"+EmployeeName+"</div><span style='display:none' class='EmpID'>"+EmployeeId+"</span></td>";
tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 Designation'>"+Designation +"</div></td>";
tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 Department'>"+Department+"</div></td>";
tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 OfficeLocation'>"+OfficeLocation +"</div></td>";
tableItemsHTML += "<td><div class='attendance-table-ellipsis-2 Attendancetype'>-</div></td>";
tableItemsHTML += "<td><a href='#'>"+AttendeeTotalWhour+"</a> </td>";
tableItemsHTML += "<td><input type='checkbox' name='HRACTIONCHK' value='"+attenItemId+"' onclick='HrActionVerify(this.value)' disabled></td>";

tableItemsHTML += "<td><div class='attendance-edit-lock-btn-box text-center'> <a href='#' class='custom-edit-btn' onclick=\'attendanceEditModal(this)\'><i class='fa fa-pencil'></i> </a></div></td>";
tableItemsHTML += "</tr>";

Totalnotspecific++
}
                           
                               }
                                     
                                  //   }
					
		
	    		

				
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
        
        $("#tattendanceRegtable").append(tableItemsHTML);
        $("#empPresent").text(TotalPresent);
        $("#notSpecifiedValue").text(Totalnotspecific);
         $("#onleaveValue").text(TotalOnLeave);
         
      var totalRowCount =  $('#TempTableQuestions >tbody >tr').length;
      $("#TotalItemscount").text(totalRowCount);
      $("#totalemp").text(totalRowCount);


        
       // if (items.length >0) 
        if (totalRowCount >0) 
       
		{
	        TableConfiguration();
	        selectedAttendenceEvent()
		}


	},
	error: function (data) 
	{
		//console.log("loadprojectinsearch Function failed");  
		console.log(data);  
	}  
	});
}






function bindAllDepartment()
{
 $("#allDepartment").empty();
 
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?select=ID,Title&$filter=CompanyID eq '"+txtCompanyId+"'"; 
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response)
        {
             $('<option value="All">All</option>').appendTo("#allDepartment");
            for (var i = 0; i < response.d.results.length; i++)
            {
                $("#allDepartment").append('<option value="' + response.d.results[i].ID + '">' + response.d.results[i].Title + '</option>');

            }
        }, myError: function (response) {
           
        }
    });
}



function bindAllOfficeLocation()
{
 $("#allOfficeLocation").empty();
 
    var Ownurl =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OfficeLocation')/items?$select=ID,OfficeName,CompanyID/ID&$expand=CompanyID&$top=5000&$filter=OfficeLocationId eq '0' and CompanyID/ID eq '"+txtCompanyId+"'"; 
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (response)
        {
             $('<option value="All">All</option>').appendTo("#allOfficeLocation");
            for (var i = 0; i < response.d.results.length; i++)
            {
                $("#allOfficeLocation").append('<option value="' + response.d.results[i].ID + '">' + response.d.results[i].OfficeName + '</option>');

            }
        }, myError: function (response) {
           
        }
    });
}




function MutipleBaseFilter()
{
	var restquery="";
	var Attendrestquery="";
	var AttendanceChips="";
	$('#attendencedateValue').val('');

   	if($('#allDepartment').val() != "All" )
	{
		restquery += "and Department/ID eq '"+$('#allDepartment').val()+"' ";
	   	AttendanceChips +="<div class='upload-chip'>"+$('#allDepartment option:selected').text()+"</div>";		 
	}
	
	if($('#allOfficeLocation').val() != "All" )
	{
		restquery += "and OfficeLocation/ID eq '"+$('#allOfficeLocation').val()+"' ";
		AttendanceChips +="<div class='upload-chip'>"+$('#allOfficeLocation option:selected').text()+"</div>";		 
	}
	
	
	
	  if($("#EmployeeAttendence_TopSpan_ResolvedList").text() != "" ) 
	{ 
	var assigntobyme= getUserInformation('EmployeeAttendence');
	 if(assigntobyme.length>0)
	 {
	   // for(var i=0; i<assigntobyme.length; i++)
	  //  {
	    restquery += "and (LogonNameId eq '"+assigntobyme[0]+"' ";
	   for(var i=0; i<assigntobyme.length; i++)
	   {
	   if(assigntobyme[i]!=assigntobyme[0])
	   {
	   restquery += "or LogonNameId eq '"+assigntobyme[i]+"'";
	   //TaskOutboxChip +="<div class='upload-chip'>"+assigntobyme[i]+"</div>"; 
	  }
	   }
	   restquery += ")";
	    
	 //   }
	 }
	
		 
	}
	
	
   
   //for EmpAttendance Filter
	 if($('#attendanceDate').val() != null && $('#attendanceDate').val() != "")
	{
    
  /*  var DueDate = $("#attendanceDate").val();
	var FilterDueDate = DueDate.split("-");
    var newDueDate = new Date(FilterDueDate[0], FilterDueDate[1], FilterDueDate[2]);
    var dateDueDate = newDueDate.getFullYear() + "-" + newDueDate.getMonth() + "-" + newDueDate.getDate();  
  $("#attendencedateValue").val(DueDate);
  
      $('#daydate').text($.datepicker.formatDate('D, dd', new Date(dateDueDate))); 
$('#monthhyear').text($.datepicker.formatDate('M  yy', new Date(dateDueDate)));*/

	var DueDate = $("#attendanceDate").val();
	//var FilterDueDate = DueDate.split("/");
   // var newDueDate  = new Date(FilterDueDate[2], FilterDueDate[1], FilterDueDate[0]);
   // var dateDueDate = newDueDate.getFullYear() + "-" + newDueDate.getMonth() + "-" + newDueDate.getDate();
  var dateDueDate =  moment($("#attendanceDate").val(),'DD/MM/YYYY').format('YYYY-MM-DD');
  GetHolidays(dateDueDate);
    debugger;
    $("#attendencedateValue").val(DueDate);

   $('#daydate').text($.datepicker.formatDate('DD', new Date(dateDueDate))); 
   $('#monthhyear').text($.datepicker.formatDate('dd M yy', new Date(dateDueDate)));

	}
	
	if($('#AttendanceType').val() != "All" && $('#AttendanceType').val() != "Not Specified")
	{
	if($('#AttendanceType').val()=="Half Day")
	{
	Attendrestquery += "and (AttendanceType eq '1st Half' or AttendanceType eq '2nd Half') ";
	AttendanceChips +="<div class='upload-chip'>Half Day</div>"; 

	}
	else
	{
		Attendrestquery += "and AttendanceType eq '"+$('#AttendanceType').val()+"' ";
	AttendanceChips +="<div class='upload-chip'>"+$('#AttendanceType option:selected').text()+"</div>"; 
	}
		 
	}


$("#AttendanceChips").empty();
	$("#AttendanceChips").append(AttendanceChips);
    
  // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate eq '"+date_string+"' ";  
     //  var projecturl=  _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=CompanyId  eq '"+titanForWork.getQueryStringParameter('CompanyId')+"'"+restquery; 
     var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('EmpAttendance')/items?$select=HrAction,ID,Title,WorkHours,AttendanceDate,AttendanceType,Employee/Title,Employee/ID&$Expand=Employee&$top=5000&$filter=AttendanceDate eq '"+dateDueDate +"'"+Attendrestquery; 
    
  $.when(getFileData(requestUri)).done(function (ProcessListResult) {
     
  var Ownurl = _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/GetByTitle('Employees')/items?$top=5000&$select=ID,FullName,Designation,LogonName/ID,LogonName/Title,Department/ID,Department/DepartmentName,Company/CompanyName,Company/ID,OfficeLocation/ID,OfficeLocation/OfficeName&$orderby=FullName&$expand=LogonName,OfficeLocation,Company,Department&$filter=Status eq 'Active' and Company/ID  eq '" + txtCompanyId +"'"+restquery; 
  EmployeeListDat(Ownurl);
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







function ClearFilterForAttendence()
{
$('#allDepartment').val("All");
$('#allOfficeLocation').val("All");
$('#AttendanceType').val("All");
$("#attendanceDate").datepicker({ dateFormat: "dd/mm/yy"}).datepicker("setDate", new Date());
/*
$('#taskOut').val('') 
  .attr('type', 'text')
  .attr('type', 'date');
*/


clearPeoplePickerControl("EmployeeAttendence");
$("#AttendanceChips").empty();

EmpAttendanceTodayData()

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



function TableConfiguration()
{
    sorter = new TINY.table.sorter('sorter', 'TempTableQuestions', {
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


function attendanceEditModal(currentRow,itemid)
{
 $('#currentAttencedenceId').val("");
 $('#empId').val("");
 

 $("#attendanceEdit").modal("show");
   var currentTableRow = $(currentRow).closest("tr");
  // $(currentRow).closest("tr").find('.EmpName').text();
  var EmployeeName = $(currentTableRow).find('.EmpName').text();
   var EmployeeID = $(currentTableRow).find('.EmpID').text();
   var EmployeeDesignation = $(currentTableRow).find('.Designation').text();
   var EmployeeDepartment = $(currentTableRow).find('.Department').text();
    var EmployeeAttendancetype = $(currentTableRow).find('.Attendancetype').text();
    
    
    
    
   // <span style='display:none' class='EmpID'>"+EmployeeId+"</span>
    
   $("#currentEmpName").text(EmployeeName);
     $("#currentEmpDesignation").text(EmployeeDesignation);
       $("#currentEmpDepartment").text(EmployeeDepartment);
       $('#currentEmpAttendanceType').val(EmployeeAttendancetype);
       $('#currentAttencedenceId').val(itemid);
       $('#empId').val(EmployeeID);
       
       
        $("#currentdatefilter").text("");
    /*  var filterstart_date = $.datepicker.formatDate('dd M yy', new Date($("#attendencedateValue").val()));
         $("#currentdatefilter").text(filterstart_date);*/
       
           var filterstartdate = ConvertddmmyyTommddyy($("#attendencedateValue").val());
           var filterstart_date = $.datepicker.formatDate('dd M yy', new Date(filterstartdate));
             $("#currentdatefilter").text(filterstart_date);
       
}

/*if (currentItemID.length == 0) {
       $.when(insertDMS(DmsTitle,DmsLink,DmsStatus)).done(function(MainExamListItemTemp) {
         });
            
        } else {
          $.when(UpdateDmsData(DmsTitle,DmsLink,DmsStatus,currentItemID)).done(function(MainExamListItemTemp) {
           });

          
        }*/
        
function Applyattendence(currentRow)
{
if($('#currentEmpAttendanceType').val()==null)
{
  alert("Please Select Attendance type");
  return false;
}

  var EmployeeName = $('#currentEmpName').text();
   var EmployeeID = $('#empId').val();
   var EmployeeAttendancetype = $('#currentEmpAttendanceType').val();
    var attendenceid=$("#currentAttencedenceId").val();

if (attendenceid == "" ) {
       $.when(insertAttendence(EmployeeID,EmployeeAttendancetype)).done(function(MainExamListItemTemp) {
            MutipleBaseFilter();
           alert("Attendance Updated Successfully");
         });
            
        } else {
          $.when(UpdateAttendencee(EmployeeAttendancetype,attendenceid)).done(function(MainExamListItemTemp) {
                   MutipleBaseFilter();
                  alert("Attendance Updated");

           });

          
        }


}        
        
  function insertAttendence(EmployeeID,EmployeeAttendancetype)
	{
	      var Attendencedate=ConvertddmmyyTommddyy($("#attendencedateValue").val());
         Attendencedate= new Date(Attendencedate);
   Attendencedate= $.datepicker.formatDate('mm/dd/yy', Attendencedate);
var dfd=$.Deferred();
		var ListName='EmpAttendance';
		var webURL=_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpAttendance')/items";

		var itemType="SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
		
		var Metadata;		
		    Metadata = {
	            __metadata: {
	                'type': itemType
	            },
	  
	         Title:"Attendance",
	         WorkHours:"0",
	         HrAction:"true",
            EmployeeId:EmployeeID,
            AttendanceDate:Attendencedate,
            AttendanceType:EmployeeAttendancetype,
           
           
         
     
           
        };
        
		$.ajax({
			url:webURL,
			type:"POST",
			async:false,
			headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose"
            },
            data:JSON.stringify(Metadata),
            success:function(result)
            {
           // MutipleBaseFilter();
           // alert("Attendance Submitted"); 
              
              
            	dfd.resolve(true);
            },
            error:function(result)
            {
				console.log(JSON.stringify(result));
				dfd.reject(result);
				
			            
            }
		})		
	    return dfd.promise();
	}
	
	
	
	
	
	
	
	function UpdateAttendencee(EmployeeAttendancetype,currentItemID)
	{
	//var companyID=parseInt(companyID);
var companyID = titanForWork.getQueryStringParameter("CompanyId");

		var dfd=$.Deferred();
		var ListName='EmpAttendance';
		var webURL=_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpAttendance')/items("+currentItemID+")";

		var itemType="SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
		
		var Metadata;		
		    Metadata = {
	            __metadata: {
	                'type': itemType
	            },
	        Title:"Attendance",
	        HrAction:"true",
            AttendanceType:EmployeeAttendancetype,

            
        };
                
		$.ajax({
			url:webURL,
			type:"POST",
			async:false,
			headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": '*'
            },
            data:JSON.stringify(Metadata),
            success:function(result)
            {
            	//MutipleBaseFilter();
                //  alert("Attendance Updated");
				dfd.resolve(true);
            },
            error:function(result)
            {
				console.log(JSON.stringify(result));
				dfd.reject(result);	
			
		            
            }
		})		
	    return dfd.promise();
	}

/*
function ConvertddmmyyTommddyy(ddmmyyyString) {
    return ddmmyyyString.split('-')[1] + "-" + ddmmyyyString.split('-')[2] + "-" + ddmmyyyString.split('-')[0];
} */

function ConvertddmmyyTommddyy(ddmmyyyString) {
    return ddmmyyyString.split('/')[1] + "/" + ddmmyyyString.split('/')[0] + "/" + ddmmyyyString.split('/')[2];
} 






function selectedAttendenceEvent()
{
 $("#mutipleUpdatedate").text("");       
  var filterstartdate = ConvertddmmyyTommddyy($("#attendencedateValue").val());
   var filterstart_date = $.datepicker.formatDate('dd M yy', new Date(filterstartdate));
     $("#mutipleUpdatedate").text(filterstart_date);


    $('.Attenid').change(function ()
    {
        selectedAttendListItem = [];
 
        $('.Attenid').each(function () 
        {
            if($(this).prop("checked")==true)
            {
               // selectedAttendListItem.push($(this).val());
                
                
                var itemid = $(this).val();
                
                  var currentRow=$(this).closest("tr"); 
         
       /*  var col1=currentRow.find("td:eq(1)").text(); // get current row 1st TD value
         var col2=currentRow.find("td:eq(3)").text(); // get current row 2nd TD
         var col3=currentRow.find("td:eq(4)").text(); // get current row 2nd TD
         var col4=currentRow.find("td:eq(5)").text(); // get current row 3rd TD
         var col5=currentRow.find(".docid").attr('title'); // get current row 3rd TD
         //.push($(this).attr("title"));*/
         
      var EmployeeName = currentRow.find('.EmpName').text();
      var EmployeeID = currentRow.find('.EmpID').text();
      // var EmployeeAttendancetype = currentRow.find('.Attendancetype').text();



         //var data=col1+"\n"+col2+"\n"+col3+"\n"+col4;
        
         selectedAttendListItem.push({ AttenListitemId: itemid ,EmpName:EmployeeName,Empid:EmployeeID});

              
            }
        });
            });
}





function UpdateMultipleSelectedItem()
{
if(selectedAttendListItem.length>0)
{
     
 if($('#mutipleEmpAttendType').val()=="select")
  {
    alert("Please select Attendance type");
    return false;
     $('#updateMutipleAttend').modal('hide');
  }
     
else
{  
var itemUpdated = 1;
for (var index = 0; index < selectedAttendListItem.length; index++)
    {
    
     var attenItemId = selectedAttendListItem[index].AttenListitemId;
    //  var EmployeeName = selectedAttendListItem[index].AttenListitemId;
   var EmployeeID = selectedAttendListItem[index].Empid;
   var EmployeeAttentype = $('#mutipleEmpAttendType').val();

if (attenItemId == "" ) {
       $.when(insertAttendence(EmployeeID,EmployeeAttentype)).done(function(MainExamListItemTemp) {
            
            
             if (itemUpdated == selectedAttendListItem.length)
            {
                selectedAttendListItem = [];
                
              MutipleBaseFilter();
              alert("Attendance Submitted");
              
              $('#updateMutipleAttend').modal('hide');
               $("#selectAll").prop("checked", false);
                $('#showLoderForMutiple').hide();
           
            }
       
       
         });
            
        } else {
          $.when(UpdateAttendencee(EmployeeAttentype,attenItemId)).done(function(MainExamListItemTemp) {
          
            if (itemUpdated == selectedAttendListItem.length)
            {
                selectedAttendListItem = [];
                
              MutipleBaseFilter();
              alert("Attendance Submitted");
              
              $('#updateMutipleAttend').modal('hide');
               $("#selectAll").prop("checked", false);
                $('#showLoderForMutiple').hide();
           
            }
            
           });

          
        }
        
       
        
            itemUpdated++;

    
    
     }
    }
 }
 
 else
 {
 alert("Please select Employees to update Attendance");
 }

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

function GetHolidays(selectdate)
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CompanyHoliday')/items?$select=*,OfficeLocationID/Title&$expand=OfficeLocationID&$filter=Holiday_start eq '"+selectdate+"' and CompanyID eq '"+titanForWork.getQueryStringParameter('CompanyId')+"'&$top=200&$orderby=Holiday_start asc";  
    $.ajax({  
    url: Ownurl,  
    headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
    success: function (data) 
    { debugger;
    	var items = data.d.results;
        var HolidayCity="";
        $("#HolidayCity").empty();  
        if (items.length > 0) 
		{ 
			$("#daydate").css("color", "red");
			$("#monthhyear").css("color", "red");
				for(var i=0; i<items.length; i++)
				{
					HolidayCity = HolidayCity+"<li>"+items[i].OfficeLocationID.Title+"</li>";
					  
				}
				$(".marquee-div").css("display", "block");

				$("#HolidayCity").append(HolidayCity);
            	let options = {
							//autostart: true,
							//property: 'value',
						//onComplete: null,
						//duration: 2000,
						//padding: 5,
						//cycles: 1,
						marquee_class: '.marquee',
						container_class: '.simple-marquee-container',
						sibling_class: 0,
						hover: true,
						duplicated:false,
						easing:'linear',

						//velocity: 0.1,
						direction: 'left',
						speed:50
					}
				//$('.simple-marquee-container').SimpleMarquee(options);				
				//$('.simple-marquee-container').SimpleMarquee();				
            }
            else
            {
            	$(".marquee-div").css("display", "none");
            	$("#daydate").css("color", "black");
				$("#monthhyear").css("color", "black");

            }
        },
		error: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });
}




function HrActionVerify(DataID)
{
	var ItemDataID=DataID;
	debugger;
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmpAttendance')/items?$filter=ID eq ('"+DataID+"')";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) { 
		debugger; 
          var items = data.d.results;  
            if (items.length > 0) 
			{  
				var HrActionvalue = items[0].HrAction;
				if(HrActionvalue == true)
				{
					var NewHrActionvalue = false;
				}
				else if(HrActionvalue == false)
				{
					var NewHrActionvalue = true;
				}
				
				$.ajax({  
        		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('EmpAttendance')/items('"+DataID+"')",
        		type: "POST",  
        		data: JSON.stringify  
        		({  
        		    __metadata:  
            		{  
               			type: "SP.Data.EmpAttendanceListItem"  
            		},  
            		HrAction: NewHrActionvalue,
            		//FNAme: "Amit kumar"
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
        		    console.log("Action taken successfully.");
        		},  
        		error: function(xhr, status, error)  
        		{  
        		    $("#ResultDiv").empty().text(data.responseJSON.error);  
        		}  
    			});                			
            }
            else
            {
            	$("input[name='HRACTIONCHK'][value='"+ItemDataID+"']").prop("checked",false);
			}  
			//name='HRACTIONCHK'
  
        },
			error: function (data) 
			{  
        		alert("An error occurred. Please try again.");  
			}  
    });  
	
	
	
	
}

	      