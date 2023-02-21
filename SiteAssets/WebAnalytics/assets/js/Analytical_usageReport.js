
$(document).ready(function() {
	
    today = new Date();
    var lastdays = new Date();
    var restQuery = "?$top=5000&$expand=AttachmentFiles,LogonName/ID,Department/ID,Company/ID&$orderby=ID desc&$select=*,ID,Department/ID,Department/Title,Company/ID,Company/Title,LogonName/ID,LogonName/Title,LogonName/EMail,AttachmentFiles&$filter=(PrimaryCompany eq 'Primary' and Status eq 'Active')";
    AnalyticalActiveUsersUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + restQuery;
    ReadAnalyticalActiveUsers();
    
    $( "#datepicker" ).datepicker();
    
    companyID=titanForWork.getQueryStringParameter('CompanyId');
    $(".ms-backgroundImage").css("padding-right", "0px");
    $('#Todt').text(moment(today).format('LL'));
    $('#Fromdt').text(moment(lastdays.setDate(lastdays.getDate() - 7)).format('LL'));
    
    var ReportToCalender = moment(today).format('LL');
    //$('#attendance-reportTo').val(moment(today).format('LL'))
    //$('#attendance-reportFrom').val(moment(lastdays).format('LL'))
    
    $('#attendance-reportTo').datepicker({
        defaultDate: 0,
        //minDate: 0,
        startDate: new Date(),
        //dateFormat: 'dd/mm/yy',
        dateFormat: 'MM dd, yy',
    }).datepicker("setDate", new Date());
	
    $('#attendance-reportFrom').datepicker({
        defaultDate: -7,
        //minDate: -7,
        startDate: new Date(lastdays.setDate(lastdays.getDate() - 7)),
        //dateFormat: 'dd/mm/yy',
        dateFormat: 'MM dd, yy',
    }).datepicker("setDate", '-7d');
    
    $('#From_data').datepicker({
        defaultDate: -90,
        //minDate: -7,
        startDate: new Date(lastdays.setDate(lastdays.getDate() - 90)),
        //dateFormat: 'dd/mm/yy',
        dateFormat: 'MM dd, yy',
    }).datepicker("setDate", '-90d');
    
    
    $('#lbttlLicenesedUser').text(UsersLicenceRequired);
    $('#attendance-report-filter').modal('show');
    
    $("#btnApply").click(function(){
    	if(new Date($("#attendance-reportFrom").val()) <= new Date($("#attendance-reportTo").val()))
		{
    		$('#attendance-report-filter').modal('hide');
    		OpenMyCustomLoader();
    		AnalyticalUsageData=[];				
			var startdt = new Date($("#attendance-reportFrom").val());
    	    var lastdt = new Date($("#attendance-reportTo").val());
    	    	lastdt.setDate(lastdt.getDate() + 1);
    	    var CurrentDT =startdt.toISOString().substring(0, 10);
    	    var LastDT =lastdt.toISOString().substring(0, 10);
    	    var Url = "?$select=*,Author/Name,Author/Title,Author/EMail,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title,UserID/EMail&$expand=UserID,LocationID,DepartmentId,CompanyId,Author&$top=5000&$filter=Created ge '" + CurrentDT + "' and Created le '"+ LastDT +"T23:59:59'";
    	    //var Url = "?$select=*,Author/Name,Author/Title,Author/EMail,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title,UserID/EMail&$expand=UserID,LocationID,DepartmentId,CompanyId,Author&$top=5000&$filter=Created ge '2022-02-10T00:00:00.000Z' and Created le '2022-02-10T00:00:00.000Z'";
        	AnalyticalUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NotificationCenter')/items/" + Url;
        	setTimeout(function(){	ReadAnalyticalUsageData() }, 200);        
         	setTimeout(function(){getUsers_Activity_Details('Filter'); }, 200);   
		}
		else
		{
			alert("Invalid date range.\nFrom Date should not be bigger than To Date");
		}
    });
    $("#btnReport").click(function(){ 
        setTimeout(function(){OpenMyCustomLoader() }, 50); 	
        arrActivityResult = [];
        setTimeout(function(){getUsers_Activity_Details(''); }, 100);   
    });
    
    $("#btnStartArchiving").click(function(){ 
         var archivindListUrl=_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NotificationCenter')/items?$select=ID,Created&$top=5000";
         arrData=[];
         //OpenMyCustomLoader();
         adddataInArchingList(); 
    });
    
    initializePeoplePicker("Userto");
    
    //StDate = new Date($('#Fromdt').text());
    //EnDate = new Date($('#Todt').text());  
});
//var StDate ='';
//var EnDate ='';

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



var AnalyticalUsageData = AnalyticalUsageData || [];
var AnalyticalUsageUrl = '';
function ReadAnalyticalUsageData() 
{
	dfds = $.Deferred(),
    $.ajax({
        url: AnalyticalUsageUrl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) 
        {
        	FilterState=0; // For filter load state
        	
        	AnalyticalUsageData = AnalyticalUsageData.concat(data.d.results);           
            if (data.d.__next) 
            {
                AnalyticalUsageUrl = data.d.__next;
                ReadAnalyticalUsageData();
            }
            else 
            {	
            	// Data without Logged In record. 
               	var FilteredRec = $.grep(AnalyticalUsageData, function(v) {
    				return v.UserAction != 'Logged In';
				});
				// End
				
				
				var sd = new Date(moment(new Date($("#attendance-reportFrom").val())).format("YYYY-MM-DD")+"T00:00:00.000Z").getTime();
				var ed = new Date(moment(new Date($("#attendance-reportTo").val())).format("YYYY-MM-DD")+"T00:00:00.000Z").getTime();
      			//sd = new Date("2010-08-21T00:00:00.000Z").getTime(),
  				var ExtResults = FilteredRec.filter(d => {var time = new Date(moment(d.Created).format("YYYY-MM-DD")+"T00:00:00.000Z").getTime();
                             return (sd <= time && time <= ed);
                            });
				
				
					
               /* var tempDate = new Date($("#attendance-reportFrom").val());
        			tempDate.setDate(tempDate.getDate() - 1);
        			var StartDate = moment(tempDate).format("MM/DD/YYYY");
        		var tempDate = new Date($("#attendance-reportTo").val());
        			tempDate.setDate(tempDate.getDate() + 1);
        			var EndDate = moment(tempDate).format("MM/DD/YYYY");            
                            
				var ExtResults= FilteredRec.filter(function (data) {
            		Created = moment(data.Created).format("MM/DD/YYYY");
            		return (StartDate == "" ? Created != "" : Created >= StartDate) && (EndDate == "" ? Created!= "" : Created <= EndDate);
        		});	*/			
				
				AnalyticalUsageData = ExtResults;
            	const distinctItems = [...new Map(AnalyticalUsageData.map(item => [item["UserIDId"], item])).values()];
            	uniqueEmployeesValue = (distinctItems.length / AnalyticalActiveUsers.length)* 100;
                $('div#ProgressTtldiv').css({'width': Math.round(uniqueEmployeesValue)+'%'});
                $('#lbTotal').text('Over all Usage '+ Math.round(uniqueEmployeesValue)+'%');
        		$('#TotalVisit').text('Active User : '+ distinctItems.length +' out of '+AnalyticalActiveUsers.length);
        		
        		
				var FilteredValueweb = $.grep(AnalyticalUsageData, function(v) {
    				return v.Application == 'Website';
				});				
				const uniquewebuser = [...new Map(FilteredValueweb.map(item => [item["UserIDId"], item])).values()];				
				UniqueCountsWebValue = (uniquewebuser.length / AnalyticalActiveUsers.length)* 100;
    			$('div#ProgressWebdiv').css({'width': Math.round(UniqueCountsWebValue)+'%'});
    			$('#lbWeb').text('Website Usage '+ Math.round(UniqueCountsWebValue)+'%');
    			$('#WebVisit').text('Active User : '+ uniquewebuser.length +' out of '+AnalyticalActiveUsers.length);
    			
    			
    			var FilteredValuemob = $.grep(AnalyticalUsageData, function(v) {
    				return v.Application == 'Mobile App';
				});				
				const uniquemobuser = [...new Map(FilteredValuemob.map(item => [item["UserIDId"], item])).values()];    			
    			UniqueCountsMobValue = (uniquemobuser.length / AnalyticalActiveUsers.length)* 100;
    			$('div#ProgressMobdiv').css({'width': Math.round(UniqueCountsMobValue)+'%'});
    			$('#lbMob').text('Mobile App Usage '+ Math.round(UniqueCountsMobValue)+'%');
   				$('#MobVisit').text('Active User : '+ uniquemobuser.length +' out of '+AnalyticalActiveUsers.length);
   				
				
				var start= new Date($('#Fromdt').text());
    			var end = new Date($('#Todt').text()); 
				var diff = new Date(end - start);
				var days = diff/1000/60/60/24;
				var DateArray=[];
				for(var i=0; i<=days; i++)
				{
					var tempDate = new Date($("#attendance-reportFrom").val());
        			tempDate.setDate(tempDate.getDate() + i);
        			var EndDate = moment(tempDate).format("MM/DD/YYYY"); 
        			DateArray.push(EndDate);  
				}				
				ToGetCountbyDate(DateArray);
				ToGetActivityCounts();
				
				$("#selectByTask").val('Dashboard');
				$("#dashboard").show();
				$("#Viewed-Pages").hide();
				$("#Department-wise-activities").hide();
				$("#Viewed-write-up").hide();
				$("#Content-Entry").hide();
				$("#Details-Activities").hide();
				
				
				CloseMyCustomLoader();      	
            }     
        },
        error: function (jqXhr, textStatus, errorThrown)
		{
       		console.log("Error in ReadAnalyticalUsageData.");
            console.log(jqXhr.responseJSON.error.message.value);
            var msg = jqXhr.responseJSON.error.message.value;
            var MsgResult =	msg.includes("it exceeds the list view");
            if(MsgResult == true)
            {
            	 var Url = "?$select=*,Author/Name,Author/Title,Author/EMail,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title,UserID/EMail&$expand=UserID,LocationID,DepartmentId,CompanyId,Author&$top=5000";
        			AnalyticalUsageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NotificationCenter')/items/" + Url;
					ReadAnalyticalUsageData();
            }
        }    
    });
    return dfds.promise();
}


function ToGetCountbyDate(DateArray)
{
	var Uniquerecords=[];
	var uniqueRecordweight=[];
	var arrDates=[];    
	for(var i=0; i<DateArray.length; i++)
	{
		var ExtResults= AnalyticalUsageData.filter(function (data) {
    		Created = moment(data.Created).format("MM/DD/YYYY");
            return (DateArray[i]== "" ? Created != "" : Created == DateArray[i]);
       	});
       	if(ExtResults.length>0)
       	{       	
       		const distinctItems = [...new Map(ExtResults.map(item => [item["UserIDId"], item])).values()];
       		arrDates.push(moment(distinctItems[0].Created).format('MMM DD'));
       		Uniquerecords = Uniquerecords.concat(distinctItems);
       		uniqueRecordweight.push(distinctItems.length);
       	}
       	else
       	{
       		arrDates.push(moment(DateArray[i]).format('MMM DD'));
       		uniqueRecordweight.push(ExtResults.length);       	
       	}
	}
	
	var lineChartcontent = document.getElementById('dvlineChart');
    lineChartcontent.innerHTML = '&nbsp;';
    $('#dvlineChart').append('<canvas id="line-Chart"><canvas>');				
    var ctx = $("#line-Chart");	
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrDates,//["Jan", "Feb", "Mar", "Apr"],
            datasets: [{
                label: moment(DateArray[0]).format('YYYY'),
                data: uniqueRecordweight,  //[4,8,6,2,4,0,5,7],
                fill: true,
                borderColor: 'rgb(75, 192, 192)'
            }]	
        }
    });
}


function ToGetActivityCounts()
{
	var TempArray3 = [];
	if(AnalyticalUsageData.length>0)
	{
		for(var i=0; i<AnalyticalUsageData.length; i++)
		{
			TempArray3.push(AnalyticalUsageData[i].UserAction);
		}
	}
	
    var TempPie =[]; var ss = [];		
    if(TempArray3.length > 0)
    {
        TempArray3 = TempArray3.filter(function (x, i, a) { 
            return a.indexOf(x) === i; 
        });	
    }
    
    var TempArrayCounts = [];	
    $.each(TempArray3, function( index, value ) {
    	var filteredValue = AnalyticalUsageData.filter(function(obj) {
            return (obj.UserAction === value);
        });
        var Tcounts = filteredValue.length; 
        filteredValue = (filteredValue.length / AnalyticalUsageData.length)* 100;
        TempArrayCounts.push(filteredValue.length);
        var c= Math.round(filteredValue)		
        TempPie.push({value,c,Tcounts})
    });
    	
    for(i=0; i<TempPie.length; i++)
    {
        ss.push({label: TempPie[i].value, x:TempPie[i].Tcounts, y: TempPie[i].c, legendText: TempPie[i].value});			
    }
    
    $("#dvpieChart").CanvasJSChart({ 
        axisY:{ 
        	title: "Products in %" 
        }, 
        legend : { 
            verticalAlign: "center", 
            horizontalAlign: "right" 
        }, 
        data: [ 
		{ 
		    click: function(e){	
		        $('#tbInstance').html('');
		        var ResultsData = '';
		        var tbodyData = '';
		        $('#thactivity').text('Activity : '+ e.dataPoint.label);	
		        $('#lbActivity').text('Activity : '+ e.dataPoint.label);
		        $('#thPeriod').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
		        $('#lbDates').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));

		        $('#thdatePeriod').text(' '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
		        $('#lbActivityCount').text('Total Visit: '+ e.dataPoint.x);

		        var filteredResult = AnalyticalUsageData.filter(function(obj) {						
		            return (obj.UserAction == e.dataPoint.label);					    	
		        });	
		        	
		        for(i=0;i< filteredResult.length; i++)
		        {		  
		            //tbodyData += '<tr class="text-left"><td>'+filteredResult[i].UserID.Title+' <p class="mb0">'+filteredResult[i].Designation+', '+filteredResult[i].DepartmentId.Title+'</p></td><td>'+filteredResult[i].WebpartName+'</td><td>'+moment(filteredResult[i].Modified).format("DD-MMM-YYYY HH:mm")+'</td><td>'+filteredResult[i].Application+'</td></tr>';
		            //tbodyData += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+filteredResult[i].UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+filteredResult[i].UserID.Title+'</p><p class="mb0">'+filteredResult[i].Designation+' | '+filteredResult[i].DepartmentId.Title+'</p></div></div></td><td class="text-left">'+filteredResult[i].WebpartName+'</td><td>'+moment(filteredResult[i].Modified).format("DD-MMM-YYYY HH:mm")+'</td><td>'+filteredResult[i].Title+'</td><td>'+filteredResult[i].Application+'</td></tr>';
		              tbodyData += '<tr class="text-left"><td class="text-left" style="width: 30%;"><div class="analytical-user-image-box"><img src="'+filteredResult[i].UserImage+'" ><div class="analytical-user-image-text"><p class="mb0">'+filteredResult[i].UserID.Title+'</p><p class="mb0">'+filteredResult[i].Designation+' | '+filteredResult[i].DepartmentId.Title+' </p><p class="mb0 Emailfont">'+filteredResult[i].UserID.EMail+'</p></div></div></td><td class="text-left" style="width: 18%;">'+filteredResult[i].WebpartName+'</td><td style="width: 18%;">'+moment(filteredResult[i].Modified).format("DD-MMM-YYYY HH:mm")+'</td><td style="width: 24%;">'+filteredResult[i].Title+'</td><td style="width: 10%;">'+filteredResult[i].Application+'</td></tr>';
		        }
		        $('#tbInstance').append(tbodyData);
		        $('#List-of-Instances-modal').modal('show');     
		    },
		    type: "pie", 
		    showInLegend: true, 
		    toolTipContent: "{label} <br/> {y} %", 
		    indexLabel: "{y} %", 			
		    dataPoints: ss		
		}] 		
    }); 	
}


function getUsers_Activity_Details(Action)
{
    var dfd = $.Deferred(); 
    if(Action != 'Filter')
    {
        StDate = $('#Fromdt').text();
        StDate = new Date(StDate);  StDate.setHours(00,00);
        EnDate = $('#Todt').text(); 
        EnDate = new Date(EnDate); EnDate.setHours(23,59);
        //FrmDate = moment(StDate).format('DD MMM YYYY')
        //EndDate = moment(EnDate).format('DD MMM YYYY')
        FrmDate = moment(StDate).format('LL');
        EndDate = moment(EnDate).format('LL');      
    }
    else
    {
        StDate = $('#attendance-reportFrom').val();    
        StDate = new Date(StDate);    StDate.setHours(00,00);
        EnDate = $('#attendance-reportTo').val(); 
        EnDate = new Date(EnDate);	  EnDate.setHours(23,59);
        //FrmDate = moment(StDate).format('DD MMM YYYY')
        //EndDate = moment(EnDate).format('DD MMM YYYY')
        FrmDate = moment(StDate).format('LL')
        EndDate = moment(EnDate).format('LL')   	
    }	
    $('#Fromdt').text(moment(StDate).format('LL'));	
    $('#Todt').text(moment(EnDate).format('LL'));
    $('#attendance-reportTo').val(moment(EnDate).format('LL'));
    $('#attendance-reportFrom').val(moment(StDate).format('LL'));	
    var arrActivityResult=[];
    for(i=0;i<AnalyticalUsageData.length;i++)
    {        
        if((new Date(AnalyticalUsageData[i].Created) >= StDate && new Date(AnalyticalUsageData[i].Created) <= EnDate) && AnalyticalUsageData[i].CompanyIdId == companyID)
        {			
            arrActivityResult.push(AnalyticalUsageData[i]);
        }	
    }
    AnalyticalUsageData = arrActivityResult;	
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


var AnalyticalActiveUsers = AnalyticalActiveUsers || [];
var AnalyticalActiveUsersUrl = '';
function ReadAnalyticalActiveUsers() 
{
	dfds = $.Deferred(),
    $.ajax({
        url: AnalyticalActiveUsersUrl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) 
        {
        	AnalyticalActiveUsers = AnalyticalActiveUsers .concat(data.d.results);           
            if (data.d.__next) 
            {
                AnalyticalActiveUsersUrl = data.d.__next;
                ReadAnalyticalActiveUsers();
            }
            else 
            {
            	var FilteredValue = $.grep(AnalyticalActiveUsers, function(v) {
    				return v.Status == 'Active' && v.PrimaryCompany == 'Primary';
				});
            	AnalyticalActiveUsers = FilteredValue;
				$("#lbLicenesedUser").text(AnalyticalActiveUsers.length);	
            }     
        },
        error: function (jqXhr, textStatus, errorThrown)
		{
       		console.log("Error in ReadAnalyticalActiveUsers.");
            console.log(jqXhr.responseJSON.error.message.value);
            var msg = jqXhr.responseJSON.error.message.value;
            var MsgResult =	msg.includes("it exceeds the list view");
            if(MsgResult == true)
            {
				var restQuery = "?$top=5000&$expand=LogonName/ID,Department/ID,Company/ID&$orderby=ID desc&$select=*,ID,Department/ID,Department/Title,Company/ID,Company/Title,LogonName/ID,LogonName/Title"; // Company filter condition remove by Dipankar sir.    
    			AnalyticalActiveUsersUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + restQuery;
    			ReadAnalyticalActiveUsers();            	 
            }
        }    
    });
    return dfds.promise();
}


function GetAllVisitedUserss()
{
    var tblBodyData = '';
    var lastDate = '';
    $('#tbdyAllVisitedUsers').html('');
    $('#Visited-User-modal').modal('show');
    $('#thUserTitle').text('Active User');
    $('#thdatePeriod').text(' '+$("#Fromdt").text()+' to '+ $("#Todt").text());
    $('#lbDatesPeriod').text('Duration : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
    
    const ActiveuniqueUsers = [...new Map(AnalyticalUsageData.map(item => [item["UserIDId"], item])).values()];
    		ActiveuniqueUsers .sort(function(a,b){return a.UserID.Title< b.UserID.Title? -1 : 1});

    if(ActiveuniqueUsers.length>0)
    {
    	for(var i=0; i<ActiveuniqueUsers.length; i++)
    	{
    		var FilteredRec = $.grep(AnalyticalUsageData, function(v) {
    			return v.UserIDId == ActiveuniqueUsers[i].UserIDId;
			});
			
			var TotalVisit = FilteredRec.length;
			var LastRecord = FilteredRec[(FilteredRec.length-1)].Created;
			var UserName = FilteredRec[(FilteredRec.length-1)].UserID.Title;
			var UserEmail = FilteredRec[(FilteredRec.length-1)].UserID.EMail;
			var UserImage = FilteredRec[(FilteredRec.length-1)].UserImage;
				
			var eventDateObj=new Date(FilteredRec[(FilteredRec.length-1)].Created);
            var LastRecord = eventDateObj.toTimeString();
            var H = +LastRecord.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? " AM" : " PM";
            	LastRecord= h + LastRecord.substr(2, 3) + ampm;            	
				
			var UserInfo = $.grep(AnalyticalActiveUsers, function(v) {
    			return v.LogonName.ID == ActiveuniqueUsers[i].UserIDId;
			});
			var UserDesignation ='';
			var UserDept = '';
			if(UserInfo.length>0)
			{
				if(UserInfo[0].Designation != null)
				{				
					UserDesignation = UserInfo[0].Designation;
				}
				var UserDept = '';
				if(UserInfo[0].Department.Title != null)
				{
					UserDept = UserInfo[0].Department.Title;
				}
			}
			tblBodyData += '<tr class="text-left active-user-tr"><td class="text-left"><div class="analytical-user-image-box"><img src="'+UserImage+'" ><div class="analytical-user-image-text"><p class="mb0">'+UserName+'</p><p class="mb0">'+UserDesignation+' | '+UserDept+' </p><p class="mb0 Emailfont">'+UserEmail+'</p></div></div></td>'
            tblBodyData += '<td class="text-left">'+moment(FilteredRec[(FilteredRec.length-1)].Created).format("DD MMM YYYY")+' '+LastRecord+'</td><td class="js-sort-number">'+TotalVisit+'</td></tr>'	
    	}
    	$('#tbdyAllVisitedUsers').append(tblBodyData);
    }
}


function GetAllWebsiteVisitedUserss()
{
    var tblBodyData = '';
    var lastDate = '';
    $('#tbdyAllVisitedUsers').html('');
    $('#thUserTitle').text('Active User');
    $('#Visited-User-modal').modal('show');
    $('#thDatePeriod').text('Duration : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
    
    var FilteredValueweb = $.grep(AnalyticalUsageData, function(v) {
    	return v.Application == 'Website';
	});
	const ActiveuniqueUsers= [...new Map(FilteredValueweb.map(item => [item["UserIDId"], item])).values()];
    	  ActiveuniqueUsers.sort(function(a,b){return a.UserID.Title< b.UserID.Title? -1 : 1});
    	  
	if(ActiveuniqueUsers.length>0)
	{
		for(var i=0; i<ActiveuniqueUsers.length; i++)
		{
			var FilteredRec = $.grep(FilteredValueweb, function(v) {
    			return v.UserIDId == ActiveuniqueUsers[i].UserIDId;
			});
			
			var UserName = FilteredRec[(FilteredRec.length-1)].UserID.Title;
			var UserEmail = FilteredRec[(FilteredRec.length-1)].UserID.EMail;
			var UserImage = 'https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/WebAnalytics/assets/images/user_pic.jpg';
			if(FilteredRec[(FilteredRec.length-1)].UserImage != null)
			{
				UserImage = FilteredRec[(FilteredRec.length-1)].UserImage;
			}
			var TotalVisit = FilteredRec.length;
			var LastRecord = FilteredRec[(FilteredRec.length-1)].Created;
				
			var eventDateObj=new Date(FilteredRec[(FilteredRec.length-1)].Created);
            var LastRecord = eventDateObj.toTimeString();
            var H = +LastRecord.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? " AM" : " PM";
            	LastRecord= h + LastRecord.substr(2, 3) + ampm;            	
				
			var UserInfo = $.grep(AnalyticalActiveUsers, function(v) {
    			return v.LogonName.ID == ActiveuniqueUsers[i].UserIDId;
			});
			var UserDesignation ='';
			var UserDept = '';
			if(UserInfo.length>0)
			{
				if(UserInfo[0].Designation != null)
				{				
					UserDesignation = UserInfo[0].Designation;
				}
				var UserDept = '';
				if(UserInfo[0].Department.Title != null)
				{
					UserDept = UserInfo[0].Department.Title;
				}
			}
			tblBodyData += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+UserName+'</p><p class="mb0">'+UserDesignation+' | '+UserDept+'</p><p class="mb0 Emailfont">'+UserEmail+'</p></div></div></td>'
            tblBodyData += '<td class="text-left">'+moment(FilteredRec[(FilteredRec.length-1)].Created).format("DD MMM YYYY")+' '+LastRecord+'</td><td class="js-sort-number">'+TotalVisit+'</td></tr>'		
		}
		$('#tbdyAllVisitedUsers').append(tblBodyData);	
	}
}


function GetAllMobileVisitedUserss()
{
    var tblBodyData = '';
    var lastDate = '';
    $('#thUserTitle').text('Active User');
    $('#tbdyAllVisitedUsers').html('');
    $('#Visited-User-modal').modal('show');
    $('#thDatePeriod').text('Duration : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
	
	var FilteredValuemob = $.grep(AnalyticalUsageData, function(v) {
    	return v.Application == 'Mobile App';
	});
					
	const ActiveuniqueUsers= [...new Map(FilteredValuemob.map(item => [item["UserIDId"], item])).values()];
    	  ActiveuniqueUsers.sort(function(a,b){return a.UserID.Title< b.UserID.Title? -1 : 1});
    	  
	if(ActiveuniqueUsers.length>0)
	{
		for(var i=0; i<ActiveuniqueUsers.length; i++)
		{
			var FilteredRec = $.grep(FilteredValuemob, function(v) {
    			return v.UserIDId == ActiveuniqueUsers[i].UserIDId;
			});
			var UserName = FilteredRec[(FilteredRec.length-1)].UserID.Title;
			var UserEmail = FilteredRec[(FilteredRec.length-1)].UserID.EMail;
			var UserImage = 'https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/WebAnalytics/assets/images/user_pic.jpg';
			if(FilteredRec[(FilteredRec.length-1)].UserImage != null)
			{
				UserImage = FilteredRec[(FilteredRec.length-1)].UserImage;
			}
			else
			{
				UserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + UserEmail//"https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
			}
			var TotalVisit = FilteredRec.length;
			var LastRecord = FilteredRec[(FilteredRec.length-1)].Created;
				
			var eventDateObj=new Date(FilteredRec[(FilteredRec.length-1)].Created);
            var LastRecord = eventDateObj.toTimeString();
            var H = +LastRecord.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? " AM" : " PM";
            	LastRecord= h + LastRecord.substr(2, 3) + ampm;            	
				
			var UserInfo = $.grep(AnalyticalActiveUsers, function(v) {
    			return v.LogonName.ID == ActiveuniqueUsers[i].UserIDId;
			});
			var UserDesignation ='';
			var UserDept = '';
			if(UserInfo.length>0)
			{
				if(UserInfo[0].Designation != null)
				{				
					UserDesignation = UserInfo[0].Designation;
				}
				var UserDept = '';
				if(UserInfo[0].Department.Title != null)
				{
					UserDept = UserInfo[0].Department.Title;
				}
			}
			tblBodyData += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+UserName+'</p><p class="mb0">'+UserDesignation+' | '+UserDept+'</p><p class="mb0 Emailfont">'+UserEmail+'</p></div></div></td>'
            tblBodyData += '<td class="text-left">'+moment(FilteredRec[(FilteredRec.length-1)].Created).format("DD MMM YYYY")+' '+LastRecord+'</td><td class="js-sort-number">'+TotalVisit+'</td></tr>'		
		}
		$('#tbdyAllVisitedUsers').append(tblBodyData);	
	}
}


function ExcelDataReport(tableId)
{
    $("#"+tableId).tableExport({
        //type: 'excel',
        type: 'csv',
        exportHiddenCells: true,
        fileName: 'ExcelReportDetails',
        ignoreColumn: [],
    });
}


function BindNonActiveUsers(Action)
{
	var tblBodyData ='';
	$('#tbdyNonActiveuser').html('');
    $('#txtTitle').text('Non-Active Users');
    $('#thnonUserTitle').text('Non-Active Users');
    $('#thdatePrd').text($("#Fromdt").text()+' - '+ $("#Todt").text());
    $('#lbNonDatesPeriod').text('Duration : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
	if(Action == '')
	{
		const distinctItems = [...new Map(AnalyticalUsageData.map(item => [item["UserIDId"], item])).values()];
		var result = AnalyticalActiveUsers.filter(function (o1) {
    		return !distinctItems.some(function (o2) {
    	    	return o1.LogonNameId== o2.UserIDId; // return the ones with equal id
   			});
		});
		if(result.length>0)
		{	
			result.sort(function(a,b){return a.LogonName.Title< b.LogonName.Title? -1 : 1});
			for(var i=0; i<result.length; i++)
			{	
				var Username = result[i].LogonName.Title;
				var UserEmail = result[i].LogonName.EMail;
				var Userdept = result[i].Department.Title; 
				var UserDesignation = result[i].Designation;
				var UserImage='';
				if(result[i].AttachmentFiles.results.length>0)
				{
					UserImage = result[i].AttachmentFiles.results[0].ServerRelativeUrl;
				}
				else
				{
					UserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +UserEmail; // escapeProperly(items[0].Email)
				}
				tblBodyData += '<tr class="text-left"><td class="text-left js-sort-number"><div class="analytical-user-image-box"><img src="'+UserImage+'"> <div class="analytical-user-image-text"><p class="mb0">'+Username+'</p><p class="mb0">'+UserDesignation+' | '+Userdept+'</p><p class="mb0 Emailfont">'+UserEmail+' </p></div></div></td></tr>'					   		
			}		
		}		
	}
	else if(Action == 'Website')
	{
		var FilteredValueweb = $.grep(AnalyticalUsageData, function(v) {
    		return v.Application == 'Website';
		});
		const distinctItems = [...new Map(FilteredValueweb.map(item => [item["UserIDId"], item])).values()];
		var result = AnalyticalActiveUsers.filter(function (o1) {
    		return !distinctItems.some(function (o2) {
    	    	return o1.LogonNameId== o2.UserIDId; // return the ones with equal id
   			});
		});
		if(result.length>0)
		{
			result.sort(function(a,b){return a.LogonName.Title< b.LogonName.Title? -1 : 1});
			for(var i=0; i<result.length; i++)
			{	
				var Username = result[i].LogonName.Title;
				var UserEmail = result[i].LogonName.EMail;
				var Userdept = result[i].Department.Title; 
				var UserDesignation = result[i].Designation;
				var UserImage='';
				if(result[i].AttachmentFiles.results.length>0)
				{
					UserImage = result[i].AttachmentFiles.results[0].ServerRelativeUrl;
				}
				else
				{
					UserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +UserEmail; // escapeProperly(items[0].Email)
				}
				tblBodyData += '<tr class="text-left"><td class="text-left js-sort-number"><div class="analytical-user-image-box"><img src="'+UserImage+'"> <div class="analytical-user-image-text"><p class="mb0">'+Username+'</p><p class="mb0">'+UserDesignation+' | '+Userdept+'</p><p class="mb0 Emailfont">'+UserEmail+' </p></div></div></td></tr>'					   		
			}		
		}
	
	}
	else if(Action == 'Mobile App')
	{
		var FilteredValueweb = $.grep(AnalyticalUsageData, function(v) {
    		return v.Application == 'Mobile App';
		});
		const distinctItems = [...new Map(FilteredValueweb.map(item => [item["UserIDId"], item])).values()];
		var result = AnalyticalActiveUsers.filter(function (o1) {
    		return !distinctItems.some(function (o2) {
    	    	return o1.LogonNameId== o2.UserIDId; // return the ones with equal id
   			});
		});
		if(result.length>0)
		{
			result.sort(function(a,b){return a.LogonName.Title< b.LogonName.Title? -1 : 1});
			for(var i=0; i<result.length; i++)
			{	
				var Username = result[i].LogonName.Title;
				var UserEmail = result[i].LogonName.EMail;
				var Userdept = result[i].Department.Title; 
				var UserDesignation = result[i].Designation;
				var UserImage='';
				if(result[i].AttachmentFiles.results.length>0)
				{
					UserImage = result[i].AttachmentFiles.results[0].ServerRelativeUrl;
				}
				else
				{
					UserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' +UserEmail; // escapeProperly(items[0].Email)
				}
				tblBodyData += '<tr class="text-left"><td class="text-left js-sort-number"><div class="analytical-user-image-box"><img src="'+UserImage+'"> <div class="analytical-user-image-text"><p class="mb0">'+Username+'</p><p class="mb0">'+UserDesignation+' | '+Userdept+'</p><p class="mb0 Emailfont">'+UserEmail+' </p></div></div></td></tr>'					   		
			}		
		}	
	}
	$('#tbdyNonActiveuser').append(tblBodyData); 
}


function LoadDetailsActivities(Action)
{
	$('#tbActivityDetails').empty()

	if(Action == "Details-Activities")
	{
	if(AnalyticalUsageData.length>0)
	{
	 	var tblActivity = $('#tbActivityDetails');
    	$('#thDateRangePeriod').text(' : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
    	var ActDetail = '';	
    	tblActivity.html('');
    	$('#TotalItemscount').text(AnalyticalUsageData.length)
    	$.each(AnalyticalUsageData, function( index, value ) {
        	ActDetail += '<tr class="text-left">'
        	ActDetail += '<td>'+moment(value.Created).format("DD-MMM-YYYY HH:mm")+'</td>'
        	ActDetail += '<td>'+value.UserID.Title+'</td>'
        	ActDetail += '<td>'+value.UserAction+'</td>'
        	ActDetail += '<td>'+value.WebpartName+'</td>'
        	ActDetail += '<td>'+value.ContentCategory+'</td>'
        	ActDetail += '<td>'+value.Title+'</td>'		
        	// will show in Export excel		 
        	ActDetail += '<td style="display:none">'+value.CompanyId.Title+'</td>'
        	ActDetail += '<td style="display:none">'+value.DepartmentId.Title+'</td>'
        	ActDetail += '<td style="display:none">'+value.LocationID.Title+'</td>'
        	ActDetail += '<td style="display:none">'+value.Designation+'</td>'
        	/*	 ActDetail += '<td style="display:none">'+value.Details+'</td>' */
        	ActDetail += '<td>'+value.Application+'</td>'
        	ActDetail += '<td>'+value.AppVersion+'</td>'		 
        	ActDetail += '<td style="display:none">'+value.Environment+'</td>'
        	ActDetail += '</tr>'
    	});
    	tblActivity.append(ActDetail);
    	if (AnalyticalUsageData.length >0) 
    	{
    	    TableConfiguration();  // GenerateTableWithMe();       
    	}
    	else
    	{
    	    tblActivity.append('<tr class="text-left" ><td style="text-align: center;" colspan="8"> No records found </td></tr>');
    	}
    }
    }
    else if(Action == "Viewed-Pages")
    {
    	GetVisitedPages();    
    }
    else if(Action == "Department-wise-activities")
    {
    	DepartmentbyDetails();    
    }
    else if(Action == "Content-Entry")
    {
    	ContentEntryDetails();
    }
    else if(Action =="Viewed-write-up")
    {
    	ViewedContentsDetails();
    }
}


var sorter;
function TableConfiguration()
{
    sorter = new TINY.table.sorter('sorter', 'tbluserActivity', {
        headclass: 'head',
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

var FilterState=0;
function Loadfilterctrl()
{	
	if(FilterState == 0)
	{
		const ActiveuniqueWebpart= [...new Map(AnalyticalUsageData.map(item => [item["WebpartName"], item])).values()];
    		  ActiveuniqueWebpart.sort(function(a,b){return a.WebpartName< b.WebpartName? -1 : 1});
    		  $("#txtWebpart").empty();
    		  $("#txtWebpart").append($("<option     />").val("ALL").text("ALL"));
    		  if(ActiveuniqueWebpart.length>0)
    		  {    	  	
    		  	for(var i=0; i<ActiveuniqueWebpart.length; i++)
    		  	{
    		  		$("#txtWebpart").append($("<option     />").val(ActiveuniqueWebpart[i].WebpartName).text(ActiveuniqueWebpart[i].WebpartName));
    		  	}
    		  }
    	  
    	const ActiveuniqueDepartment= [...new Map(AnalyticalUsageData.map(item => [item["DepartmentIdId"], item])).values()];
    		  ActiveuniqueDepartment.sort(function(a,b){return a.DepartmentId.Title< b.DepartmentId.Title? -1 : 1});
    		  $("#ddlDepartment").empty();
    		  $("#ddlDepartment").append($("<option     />").val("ALL").text("ALL"));
    		  if(ActiveuniqueDepartment.length>0)
    		  {    	  	
    		  	for(var i=0; i<ActiveuniqueDepartment.length; i++)
    		  	{
    		  		if(ActiveuniqueDepartment[i].DepartmentIdId != null)
    		  		{
    		  			$("#ddlDepartment").append($("<option     />").val(ActiveuniqueDepartment[i].DepartmentId.ID).text(ActiveuniqueDepartment[i].DepartmentId.Title));
    		  		}
    		  	}
    		  }
    		  
		const ActiveuniqueLocation= [...new Map(AnalyticalUsageData.map(item => [item["LocationIDId"], item])).values()];
			  ActiveuniqueLocation.sort(function(a,b){return a.LocationID.Title< b.LocationID.Title? -1 : 1});
    		  $("#ddlLocation").empty();
    		  $("#ddlLocation").append($("<option     />").val("ALL").text("ALL"));
    		  if(ActiveuniqueLocation.length>0)
    		  {    	  	
    		  	for(var i=0; i<ActiveuniqueLocation.length; i++)
    		  	{
    		  		if(ActiveuniqueLocation[i].LocationIDId!= null)
    		  		{
    		  			$("#ddlLocation").append($("<option     />").val(ActiveuniqueLocation[i].LocationID.ID).text(ActiveuniqueLocation[i].LocationID.Title));
    		  		}
    		  	}
    		  }
    	  
		const ActiveuniqueUserAction= [...new Map(AnalyticalUsageData.map(item => [item["UserAction"], item])).values()];
    		  ActiveuniqueUserAction.sort(function(a,b){return a.UserAction< b.UserAction? -1 : 1});
    		  $("#ddlActivity").empty();
    		  $("#ddlActivity").append($("<option     />").val("ALL").text("ALL"));
    		  if(ActiveuniqueUserAction.length>0)
    		  {    	  	
    		  	for(var i=0; i<ActiveuniqueUserAction.length; i++)
    		  	{
    		  		if(ActiveuniqueUserAction[i].UserAction!= null)
    		  		{
    		  			$("#ddlActivity").append($("<option     />").val(ActiveuniqueUserAction[i].UserAction).text(ActiveuniqueUserAction[i].UserAction));
    		  		}
    		  	}
    		  }
    	  
		const ActiveuniqueDesignation= [...new Map(AnalyticalUsageData.map(item => [item["Designation"], item])).values()];
			  ActiveuniqueDesignation.sort(function(a,b){return a.Designation< b.Designation? -1 : 1});
    		  $("#ddlDesignation").empty();
    		  $("#ddlDesignation").append($("<option     />").val("ALL").text("ALL"));
    		  if(ActiveuniqueDesignation.length>0)
    		  {    	  	
    		  	for(var i=0; i<ActiveuniqueDesignation.length; i++)
    		  	{
    		  		if(ActiveuniqueDesignation[i].Designation!= null)
    		  		{
    		  			$("#ddlDesignation").append($("<option     />").val(ActiveuniqueDesignation[i].Designation).text(ActiveuniqueDesignation[i].Designation));
    		  		}
    		  	}
    		  }
		FilterState=1;
	}
}


function ResetControls()
{
	initializePeoplePicker("Userto");
	$("#ddlDesignation").val('ALL');
	$("#ddlDepartment").val('ALL');
	$("#ddlLocation").val('ALL');
	$("#ddlActivity").val('ALL');
	$("#txtWebpart").val('ALL');
	$("#ddlApplication").val('All');
	
	$("#FilterChips").empty();
	$('#tbActivityDetails').empty()
	
	if(AnalyticalUsageData.length>0)
	{
		
	 	var tblActivity = $('#tbActivityDetails');
    	$('#thDateRangePeriod').text(' : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
    	var ActDetail = '';	
    	tblActivity.html('');
    	$('#TotalItemscount').text(AnalyticalUsageData.length)
    	$.each(AnalyticalUsageData, function( index, value ) {
        	ActDetail += '<tr class="text-left">'
        	ActDetail += '<td>'+moment(value.Created).format("DD-MMM-YYYY HH:mm")+'</td>'
        	ActDetail += '<td>'+value.UserID.Title+'</td>'
        	ActDetail += '<td>'+value.UserAction+'</td>'
        	ActDetail += '<td>'+value.WebpartName+'</td>'
        	ActDetail += '<td>'+value.ContentCategory+'</td>'
        	ActDetail += '<td>'+value.Title+'</td>'		
        	// will show in Export excel		 
        	ActDetail += '<td style="display:none">'+value.CompanyId.Title+'</td>'
        	ActDetail += '<td style="display:none">'+value.DepartmentId.Title+'</td>'
        	ActDetail += '<td style="display:none">'+value.LocationID.Title+'</td>'
        	ActDetail += '<td style="display:none">'+value.Designation+'</td>'
        	/*	 ActDetail += '<td style="display:none">'+value.Details+'</td>' */
        	ActDetail += '<td>'+value.Application+'</td>'
        	ActDetail += '<td>'+value.AppVersion+'</td>'		 
        	ActDetail += '<td style="display:none">'+value.Environment+'</td>'
        	ActDetail += '</tr>'
    	});
    	tblActivity.append(ActDetail);
    	if (AnalyticalUsageData.length >0) 
    	{
    	    TableConfiguration();  // GenerateTableWithMe();       
    	}
    	else
    	{
    	    tblActivity.append('<tr class="text-left" ><td style="text-align: center;" colspan="8"> No records found </td></tr>');
    	}
    }
    else
    {
    	$('#tbActivityDetails').empty();
    	tblActivity.append('<tr class="text-left" ><td style="text-align: center;" colspan="8"> No records found </td></tr>');
    	$('#TotalItemscount').text('0');
    }    





}


function ActivityFilter()
{
	var EmployeeID = ensureUser($('#Userto').children().children().attr('id'));
	var EmpID= 0;
	var Designation = 0;
	var Department=0;
	var Location = 0;
	var UserAct=0;
	var Webname= 0;
	var App=0;
	var Chips='';
	if(EmployeeID != 0)
	{
		EmpID = EmployeeID;
		Chips += '<div class="upload-chip">'+UserNamePicker+'</div>';
	}	
	if($("#ddlDepartment").val() != "ALL")
	{
		Department = $("#ddlDepartment").val();
		Chips += '<div class="upload-chip">'+$("#ddlDepartment option:selected").text()+'</div>';
	}	
	if($("#ddlLocation").val() != "ALL")
	{
		Location = $("#ddlLocation").val();
		Chips += '<div class="upload-chip">'+$("#ddlLocation option:selected").text()+'</div>';
	}
	if($("#ddlDesignation").val() != "ALL")
	{
		Designation = $("#ddlDesignation").val();
		Chips += '<div class="upload-chip">'+$("#ddlDesignation option:selected").text()+'</div>';
	}
	if($("#ddlActivity").val() != "ALL")
	{
		UserAct= $("#ddlActivity").val();
		Chips += '<div class="upload-chip">'+$("#ddlActivity option:selected").text()+'</div>';
	}
	if($("#txtWebpart").val() != "ALL")
	{
		Webname= $("#txtWebpart").val();
		Chips += '<div class="upload-chip">'+$("#txtWebpart option:selected").text()+'</div>';		
	}
	if($("#ddlApplication").val() != "All")
	{
		App = $("#ddlApplication").val();
		Chips += '<div class="upload-chip">'+$("#ddlApplication option:selected").text()+'</div>';			
	}
	
	$('#FilterChips').empty().append(Chips);	
	var TestCondition=[];
		TestCondition.push({
    		AuthorId : EmpID,
       		Designation : Designation,
           	DepartmentIdId : Department,
           	LocationIDId : Location,
           	UserAction : UserAct,
           	WebpartName : Webname,
           	Application : App,                        
		});
			
	for(var i=0; i<7; i++)
	{
		if(i == 0)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.AuthorId == 0)
				{
					var a = TestCondition;
					delete a.AuthorId;
					TestCondition = a;						
				}					
			}
			else
			{
				if(TestCondition[0].AuthorId == 0)
				{
					var a = TestCondition[0];
					delete a.AuthorId;
					TestCondition = a;						
				}
			}				
		}
		if(i == 1)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.Designation== 0)
				{
					var a = TestCondition;
					delete a.Designation;
					TestCondition = a;							
				}					
			}
			else
			{
				if(TestCondition[0].Designation== 0)
				{
					var a = TestCondition[0];
					delete a.Designation;
					TestCondition = a;					
				}					
			}				
		}
		if(i == 2)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.DepartmentIdId== 0)
				{
					var a = TestCondition;
					delete a.DepartmentIdId;
					TestCondition = a;						
				}					
			}
			else
			{
				if(TestCondition[0].DepartmentIdId== 0)
				{
					var a = TestCondition[0];
					delete a.DepartmentIdId;
					TestCondition = a;
				}					
			}				
		}
		if(i == 3)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.LocationIDId == 0)
				{
					var a = TestCondition;
					delete a.LocationIDId ;
					TestCondition = a;						
				}					
			}
			else
			{
				if(TestCondition[0].LocationIDId == 0)
				{
					var a = TestCondition[0];
					delete a.LocationIDId ;
					TestCondition = a;						
				}					
			}				
		}
		if(i == 4)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.UserAction== 0)
				{
					var a = TestCondition;
					delete a.UserAction;
					TestCondition = a;
				}					
			}
			else
			{
				if(TestCondition[0].UserAction== 0)
				{
					var a = TestCondition[0];
					delete a.UserAction;
					TestCondition = a;						
				}					
			}				
		}
		if(i == 5)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.WebpartName == 0)
				{
					var a = TestCondition;
					delete a.WebpartName;
					TestCondition = a;					
				}					
			}
			else
			{
				if(TestCondition[0].WebpartName == 0)
				{
					var a = TestCondition[0];
					delete a.WebpartName;
					TestCondition = a;							
				}					
			}				
		}
		if(i == 6)
		{
			if(TestCondition[0]==undefined)
			{
				if(TestCondition.Application== 0)
				{
					var a = TestCondition;
					delete a.Application;
					TestCondition = a;						
				}					
			}
			else
			{
				if(TestCondition[0].Application== 0)
				{
					var a = TestCondition[0];
					delete a.Application;
					TestCondition = a;							
				}					
			}				
		}			
	}
	
	var filter = TestCondition;					
	var users= AnalyticalUsageData.filter(function(item) {
  		for (var key in filter){
    	if (item[key] === undefined || item[key] != filter[key])
      		return false;
  			}
  			return true;
		});
	var FilteredValue=users;
		console.log(FilteredValue);
	if(FilteredValue.length>0)
	{
	 	var tblActivity = $('#tbActivityDetails');
    	$('#thDateRangePeriod').text(' : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
    	var ActDetail = '';	
    	tblActivity.html('');
    	$('#TotalItemscount').text(FilteredValue.length)
    	$.each(FilteredValue, function( index, value ) {
        	ActDetail += '<tr class="text-left">'
        	ActDetail += '<td>'+moment(value.Created).format("DD-MMM-YYYY HH:mm")+'</td>'
        	ActDetail += '<td>'+value.UserID.Title+'</td>'
        	ActDetail += '<td>'+value.UserAction+'</td>'
        	ActDetail += '<td>'+value.WebpartName+'</td>'
        	ActDetail += '<td>'+value.ContentCategory+'</td>'
        	ActDetail += '<td>'+value.Title+'</td>'		
        	// will show in Export excel		 
        	ActDetail += '<td style="display:none">'+value.CompanyId.Title+'</td>'
        	ActDetail += '<td style="display:none">'+value.DepartmentId.Title+'</td>'
        	ActDetail += '<td style="display:none">'+value.LocationID.Title+'</td>'
        	ActDetail += '<td style="display:none">'+value.Designation+'</td>'
        	/*	 ActDetail += '<td style="display:none">'+value.Details+'</td>' */
        	ActDetail += '<td>'+value.Application+'</td>'
        	ActDetail += '<td>'+value.AppVersion+'</td>'		 
        	ActDetail += '<td style="display:none">'+value.Environment+'</td>'
        	ActDetail += '</tr>'
    	});
    	tblActivity.append(ActDetail);
    	if (FilteredValue.length >0) 
    	{
    	    TableConfiguration();  // GenerateTableWithMe();       
    	}
    	else
    	{
    	    tblActivity.append('<tr class="text-left" ><td style="text-align: center;" colspan="8"> No records found </td></tr>');
    	}
    }
    else
    {
    	$('#tbActivityDetails').empty();
    	tblActivity.append('<tr class="text-left" ><td style="text-align: center;" colspan="8"> No records found </td></tr>');
    	$('#TotalItemscount').text('0');
    }    
}

var UserNamePicker='';
function ensureUser(ID){
    SelectedUserID = [];
    var UserId = 0;
    var peoplePickerTopDivId = ID;
    var peoplePicker =
    this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopDivId];
    var users = peoplePicker.GetAllUserInfo();
    var arryuser = users[0];
    if (arryuser) {
        var payload = { 'logonName': arryuser.Key };
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/ensureuser",
            type: "POST",
            async: false,
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(payload),
            headers: {
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "accept": "application/json;odata=verbose"
            },
            success: function (data, status, xhr) {
                UserNamePicker = data.d.Title;
                UserId = data.d.Id;
            },
            error: function (xhr, status, error) {

            }
        });
    }
    else {
        UserId = 0;
    }
    return UserId;
}


function fnExcelReport()
{
    var tab_text="<table border='1px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    var filename = 'Analytical report of period '+FrmDate+' to '+EndDate ;   // attribute to be   // applied on Table tag
    filename = isNullOrUndefinedWithEmpty(filename)? "Excel Document" : filename;
    tab = document.getElementById('tbluserActivity'); // id of table

    for(j = 0 ; j < tab.rows.length ; j++) 
    {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }
    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"Activiy Report.xls");
    }  
    else   //other browser not tested on IE 11
        //   sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));    
        var anchor = document.createElement('a');
    anchor.setAttribute('href', 'data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
    anchor.setAttribute('download', filename);
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    //   return (sa);
}

function isNullOrUndefinedWithEmpty(text){
    if(text==undefined)
        return true;
    else if(text == null)
        return true;
    else if(text == null)
        return true;
    else
        false;
}


function GetVisitedPages()
{
    $('#tbVisitedpages').html('');
    const UniquePages = [...new Map(AnalyticalUsageData.map(item => [item["WebpartName"], item])).values()];
    	  UniquePages.sort(function(a,b){return a.WebpartName< b.WebpartName? -1 : 1});

    var PagesDetails='';
    for(var i=0; i<UniquePages.length; i++)
    {	
    	var webname = UniquePages[i].WebpartName;
    	var FilteredRec = $.grep(AnalyticalUsageData, function(v) {
    				return v.WebpartName == UniquePages[i].WebpartName;
		});

    	var TotalVisit = FilteredRec.length;
    	const DistinctUsers = [...new Map(FilteredRec.map(item => [item["UserIDId"], item])).values()];
    	var TotalVisitUsers= DistinctUsers.length;
    	
    	var FilteredValueweb = $.grep(FilteredRec, function(v) {
    				return v.Application == 'Website';
			});				
		const uniquewebuser = [...new Map(FilteredValueweb.map(item => [item["UserIDId"], item])).values()];
		var TotalVisitWeb = FilteredValueweb.length;
		var TotalVisitUsersWeb = uniquewebuser.length;
 				
				
    	var FilteredValuemob = $.grep(FilteredRec, function(v) {
    			return v.Application == 'Mobile App';
			});				
		const uniquemobuser = [...new Map(FilteredValuemob.map(item => [item["UserIDId"], item])).values()];    			
    	var TotalVisitmobile = FilteredValuemob.length;
		var TotalVisitUsersMobile = uniquemobuser.length;

	   	PagesDetails += '<tr class="text-left"><td class="text-left">'+UniquePages[i].WebpartName+'</td><td class="text-left"><a href="#" data-toggle="modal" data-target="#Viewed-Pages-modal" onclick="getpopDetails(\''+UniquePages[i].WebpartName+'\',\'OverAllList\')">'+TotalVisit+'</a></td><td><a href="#" data-toggle="modal" data-target="#Non-Visited-User-modal" onclick="getpopDetails(\''+UniquePages[i].WebpartName+'\',\'OverAllUserList\')">'+TotalVisitUsers+'</a></td><td><a href="#" data-toggle="modal" data-target="#Viewed-Pages-modal" onclick="getpopDetails(\''+UniquePages[i].WebpartName+'\',\'OverAllList\',\'Website\')" >'+TotalVisitWeb+'</a></td><td><a href="#"  data-toggle="modal" data-target="#Non-Visited-User-modal" onclick="getpopDetails(\''+UniquePages[i].WebpartName+'\',\'OverAllUserList\',\'Website\')">'+TotalVisitUsersWeb+'</a></td><td><a href="#" data-toggle="modal" data-target="#Viewed-Pages-modal" onclick="getpopDetails(\''+UniquePages[i].WebpartName+'\',\'OverAllList\',\'Mobile App\')">'+TotalVisitmobile+'</a></td><td><a href="#"  data-toggle="modal" data-target="#Non-Visited-User-modal" onclick="getpopDetails(\''+UniquePages[i].WebpartName+'\',\'OverAllUserList\',\'Mobile App\')">'+TotalVisitUsersMobile+'</a></td></tr>';
    }    
    $('#tbVisitedpages').append(PagesDetails);		
}


function getpopDetails(DataName, App,Condition)
{
    var Deatils = '';
    $('#tbViewDeatils').html('');
    $('#tbdyNonActiveuser').html('');
    $('#ViewPageTitle').text(DataName);
    $('#ViewedPeriod').text('Duration : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
    $('#lbNonDatesPeriod').text('Duration : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
    
    var DataResult = $.grep(AnalyticalUsageData, function(v) {
    	return v.WebpartName == DataName;
	});
	if(Condition != undefined)
	{
		var DataSet = $.grep(DataResult, function(v) {
    		return v.Application == Condition;
		});
		DataResult = DataSet;	
	}
	if(App == "OverAllList")
	{ 
		if(DataResult.length>0)
		{
			for(i=0;i<DataResult.length;i++)
    		{
    		    //Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+', '+DataResult[i].DepartmentId.Title+'</p></div></div></td><td class="text-left">'+moment(DataResult[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+DataResult[i].Application+'</td><td>'+DataResult[i].Title+'</td></tr>';
    		    //Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+DataResult[i].UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+' | '+DataResult[i].DepartmentId.Title+'</p></div></div></td><td class="text-left">'+moment(DataResult[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+DataResult[i].WebpartName+'</td><td>'+DataResult[i].Title+'</td><td>'+DataResult[i].Application+'</td></tr>';
    		      Deatils += '<tr class="text-left activities-tr"><td class="text-left"><div class="analytical-user-image-box"><img src="'+DataResult[i].UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+' | '+DataResult[i].DepartmentId.Title+'</p><p class="mb0 Emailfont">'+DataResult[i].UserID.EMail+'</p></div></div></td><td class="text-left">'+moment(DataResult[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+DataResult[i].WebpartName+'</td><td>'+DataResult[i].Title+'</td><td>'+DataResult[i].Application+'</td></tr>';
    		}
    	}
    	$('#tbViewDeatils').append(Deatils);
    }
    else if(App == "OverAllUserList")
    {
    	$('#txtTitle').text("Active Users...");
    	const ActiveUserList = [...new Map(DataResult.map(item => [item["UserIDId"], item])).values()];
    	var tblBodyData = '';
    	if(ActiveUserList.length>0)
    	{
    		for(var i=0; i<ActiveUserList.length; i++)
    		{
    			var UserImage = '';
    			var UserDept='';
    			var UserDesignation='';
    			var UserEmail='';
    			if(ActiveUserList[i].UserImage != null){ UserImage = ActiveUserList[i].UserImage;}
    			if(ActiveUserList[i].DepartmentId.Title != null){UserDept = ActiveUserList[i].DepartmentId.Title;}
    			if(ActiveUserList[i].Designation){UserDesignation = ActiveUserList[i].Designation;}
    			tblBodyData += '<tr class="text-left"><td class="text-left js-sort-number"><div class="analytical-user-image-box"><img src="'+UserImage+'"> <div class="analytical-user-image-text"><p class="mb0">'+ActiveUserList[i].UserID.Title+', </p><p class="mb0">'+UserDesignation+' | '+UserDept+'</p><p class="mb0 Emailfont">'+ActiveUserList[i].UserID.EMail+' </p></div></div></td></tr>'					   		
    		}    	
    	}
    	$('#tbdyNonActiveuser').append(tblBodyData);    
    }
}


function DepartmentbyDetails()
{
	 $('#tbDeptwiseCount').html('');
	 var DeptDetails='';
	 const UniqueDeptartment = [...new Map(AnalyticalUsageData.map(item => [item["DepartmentIdId"], item])).values()];
       	   UniqueDeptartment.sort(function(a,b){return a.DepartmentId.Title< b.DepartmentId.Title? -1 : 1});
       	   
	if(UniqueDeptartment.length>0)
	{
    	for(var i=0; i<UniqueDeptartment.length; i++)
    	{
    		var DepartmentName = '';//ID
    		var DepartmentID='';
    		if(UniqueDeptartment[i].DepartmentId.Title != undefined)
    		{
    			DepartmentName = UniqueDeptartment[i].DepartmentId.Title;
    			DepartmentID = UniqueDeptartment[i].DepartmentId.ID;
    		}
    		var DataResult = $.grep(AnalyticalUsageData, function(v) {
    			return v.DepartmentIdId == UniqueDeptartment[i].DepartmentIdId;
			});
			
			var TotalPageVisit = $.grep(DataResult, function(v) {
    			return v.UserAction == "Page Visited";
			});
			
			var TotalContentRead = $.grep(DataResult, function(v) {
    			return v.UserAction == "Content Read";
			});

			var TotalContentEdit = $.grep(DataResult, function(v) {
    			return v.UserAction == "Content Edit";
			});
			
			var TotalMessage = $.grep(DataResult, function(v) {
    			return v.UserAction == "Message";
			});
			
			DeptDetails += '<tr class="text-left"><td class="text-left">'+DepartmentName+'</td><td class="text-left"><a href="#" data-toggle="modal" data-target="#Department-wise-activities-modal" onclick="DepartmentbyUserDetails(\''+DepartmentName+'\', \'Page Visited\')">'+TotalPageVisit.length+'</a></td><td><a href="#" data-toggle="modal" data-target="#Department-wise-activities-modal" onclick="DepartmentbyUserDetails(\''+DepartmentName+'\', \'Content Read\')">'+TotalContentRead.length +'</a></td><td><a href="#" data-toggle="modal" data-target="#Department-wise-activities-modal" onclick="DepartmentbyUserDetails(\''+DepartmentName+'\', \'Content Edit\')">'+TotalContentEdit.length+'</a></td><td><a href="#" data-toggle="modal" data-target="#Department-wise-activities-modal" onclick="DepartmentbyUserDetails(\''+DepartmentName+'\', \'Message\')">'+TotalMessage.length+'</a></td></tr>';       	   	
       	}
	}	 
	$('#tbDeptwiseCount').append(DeptDetails);
}


function DepartmentbyUserDetails(Department,Action)
{
	$('#tbdyDepyDetails').html('');
	$('#txtDeptTitle').text('Department : '+ Department);
	$('#ViewedDuration').text('Duration : '+$("#Fromdt").text()+' - '+ $("#Todt").text()+' | Activity : '+ Action);
	    
	var FilterdRecord = $.grep(AnalyticalUsageData, function(v) {
    	return v.DepartmentId.Title == Department && v.UserAction == Action;
	});	
	
	var Deatils='';
    var DataResult = FilterdRecord;
    for(i=0;i<DataResult.length;i++)
    {
        //Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+', '+DataResult[i].DepartmentId.Title+'</p></div></div></td><td>'+DataResult[i].WebpartName+'</td><td class="text-left">'+moment(DataResult[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+DataResult[i].Application+'</td></tr>';
        //Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+DataResult[i].UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+' | '+DataResult[i].DepartmentId.Title+'</p></div></div></td><td>'+DataResult[i].WebpartName+'</td><td class="text-left">'+moment(FilterdRecord[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+FilterdRecord[i].Title+'</td><td>'+FilterdRecord[i].Application+'</td></tr>';
          Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+DataResult[i].UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+' | '+DataResult[i].DepartmentId.Title+'</p><p class="mb0 Emailfont">'+DataResult[i].Author.EMail+'</p></div></div></td><td>'+DataResult[i].WebpartName+'</td><td class="text-left">'+moment(FilterdRecord[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+FilterdRecord[i].Title+'</td><td>'+FilterdRecord[i].Application+'</td></tr>';
    }    
    $('#tbdyDepyDetails').append(Deatils);
}


function ContentEntryDetails()
{
	$('#tbContrntEnrty').html('');
	const UniqueWebpartName = [...new Map(AnalyticalUsageData.map(item => [item["WebpartName"], item])).values()];
       	  UniqueWebpartName.sort(function(a,b){return a.WebpartName< b.WebpartName? -1 : 1});
    
	var WebPartData='';   	  
	if(UniqueWebpartName.length>0)
	{
		for(var i=0; i<UniqueWebpartName.length; i++)
		{
			var FilterdRecord = $.grep(AnalyticalUsageData, function(v) {
    			return v.WebpartName == UniqueWebpartName[i].WebpartName && v.UserAction == 'Content Edit';
			});
			if(FilterdRecord.length>0)
			{
				WebPartData += '<tr class="text-left"><td class="text-left">'+UniqueWebpartName[i].WebpartName+'</td><td class="text-left"><a href="#" data-toggle="modal" data-target="#Content-Entry-modal" onclick="ContentEntryUsersDetails(\''+UniqueWebpartName[i].WebpartName+'\')">'+FilterdRecord.length+'</a></td></tr>';			
			}
		}	
	}
	$('#tbContrntEnrty').append(WebPartData);
}


function ContentEntryUsersDetails(WebpartName)
{
	$('#tbContentEntry').html('');
	$('#txtContentEntryTitle').text(WebpartName);
    //$('#stDt').text(moment(StDate).format('DD MMM YYYY'));	
    //$('#enDt').text(moment(EnDate).format('DD MMM YYYY'));
    $('#lbPeriod').text('Duration : '+$("#Fromdt").text()+' - '+ $("#Todt").text());
	var FilterdRecord = $.grep(AnalyticalUsageData, function(v) {
    	return v.WebpartName == WebpartName && v.UserAction == 'Content Edit';
	});
	var Deatils = '';
	if(FilterdRecord.length>0)
	{
		for(var i=0; i<FilterdRecord.length; i++)
		{
			var Category='';
			if(FilterdRecord[i].ContentCategory != null)
			{
				Category = FilterdRecord[i].ContentCategory;
			}
			//Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><div class="analytical-user-image-text"><p class="mb0">'+FilterdRecord[i].UserID.Title+'</p><p class="mb0">'+FilterdRecord[i].Designation+' | '+FilterdRecord[i].DepartmentId.Title+'</p></div></div></td><td>'+moment(FilterdRecord[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+FilterdRecord[i].WebpartName+'</td><td class="text-left">'+FilterdRecord[i].ContentCategory+'</td><td>'+FilterdRecord[i].Title+'</td></tr>';		
			//Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+FilterdRecord[i].UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+FilterdRecord[i].UserID.Title+'</p><p class="mb0">'+FilterdRecord[i].Designation+' | '+FilterdRecord[i].DepartmentId.Title+'</p></div></div></td><td class="text-left">'+moment(FilterdRecord[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+FilterdRecord[i].WebpartName+'</td><td>'+Category+'</td><td>'+FilterdRecord[i].Title+'</td></tr>';
			  Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+FilterdRecord[i].UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+FilterdRecord[i].UserID.Title+'</p><p class="mb0">'+FilterdRecord[i].Designation+' | '+FilterdRecord[i].DepartmentId.Title+'</p><p class="mb0 Emailfont">'+FilterdRecord[i].Author.EMail+'</p></div></div></td><td class="text-left">'+moment(FilterdRecord[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+FilterdRecord[i].WebpartName+'</td><td>'+Category+'</td><td>'+FilterdRecord[i].Title+'</td></tr>';
		}
	}
	$('#tbContentEntry').append(Deatils);
}


function ViewedContentsDetails()
{
	var FilterdRecord = $.grep(AnalyticalUsageData, function(v) {
    	return v.UserAction == 'Content Read';
	});
		
	const UniqueRecordGroup = [...new Map(FilterdRecord.map(item => [item["ItemId"], item])).values()];
       	  //UniqueRecordGroup.sort(function(a,b){return a.WebpartName< b.WebpartName? -1 : 1});
       	  
    
    var WebPartDetails='';
    $('#tbViewedContents').html('');
    if(UniqueRecordGroup.length>0)
    {
    	for(var i=0; i<UniqueRecordGroup.length; i++)
    	{
    		var GroupRecords = $.grep(FilterdRecord, function(v) {
    			return v.ItemId == UniqueRecordGroup[i].ItemId;
			});
			var WebpartName = GroupRecords[0].WebpartName;
			var CategoryTitle = '';
			if(GroupRecords[(GroupRecords.length-1)].ContentCategory != null)
			{
				CategoryTitle = GroupRecords[(GroupRecords.length-1)].ContentCategory;
			}
			var Title = GroupRecords[0].Title;
			var TotalHits=GroupRecords.length;
			WebPartDetails += '<tr class="text-left"><td class="text-left">'+WebpartName+'</td><td>'+CategoryTitle+'</td><td>'+Title+'</td><td class="text-left"><a href="#" data-toggle="modal" data-target="#Viewed-write-up-modal" onclick="ViewedContentsUsersDetails(\''+WebpartName+'\', \''+UniqueRecordGroup[i].ItemId+'\')">'+TotalHits+'</a></td></tr>';
		}
    }
    $('#tbViewedContents').append(WebPartDetails);
}


function ViewedContentsUsersDetails(WebpartName, Title)
{
	var FilterdRecord = $.grep(AnalyticalUsageData, function(v) {
    	return v.UserAction == 'Content Read' && v.ItemId == Title;
	});
	
	$('#tblContentView').html('');
	$('#txtContentViewTitle').text('Title : '+ FilterdRecord[0].Title);
    $('#txtCViewTitle').text(FilterdRecord[0].Title);
    $('#StDate').text($("#Fromdt").text());	
    $('#EnDate').text($("#Todt").text());
	if(FilterdRecord.length>0)
	{
		var Deatils = '';
		for(var i=0; i<FilterdRecord.length; i++)
		{
			var Category='';
			if(FilterdRecord[i].ContentCategory != null)
			{
				Category = FilterdRecord[i].ContentCategory;
			}
			//Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+FilterdRecord[i].UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+FilterdRecord[i].UserID.Title+'</p><p class="mb0">'+FilterdRecord[i].Designation+' | '+FilterdRecord[i].DepartmentId.Title+'</p></div></div></td><td class="text-left">'+moment(FilterdRecord[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+Category+'</td><td>'+FilterdRecord[i].Application+'</td></tr>'
			Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+FilterdRecord[i].UserImage+'"><div class="analytical-user-image-text"><p class="mb0">'+FilterdRecord[i].UserID.Title+'</p><p class="mb0">'+FilterdRecord[i].Designation+' | '+FilterdRecord[i].DepartmentId.Title+'</p><p class="mb0 Emailfont">'+FilterdRecord[i].Author.EMail+'</p></div></div></td><td class="text-left">'+moment(FilterdRecord[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+Category+'</td><td>'+FilterdRecord[i].Application+'</td></tr>'
		}	
	}
	$('#tblContentView').append(Deatils);
}

/*------------------------archiving Lista Data -----------08/06/2022-----------------------------*/
//var archivindListUrl=_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NotificationCenter')/items?$select=ID,Created&$top=5";
var arrData=[];

function adddataInArchingList(){
        var Metadata;
        var date=new Date($("#From_data").val());
        date=date.format('yyyy-MM-d');
    		Metadata = {
	        __metadata: {'type': 'SP.Data.ArchivingDataListItem'},
	        Title : _spPageContextInfo.userEmail,
			ArchivingDate:date
	    };       
       
    $.when(AddItemToList(Metadata)).done(function(responseIdmore)
    {   		     
	   alert('Archiving successfully');
	})

}
function AddItemToList(Metadata)
{
    var dfd = $.Deferred();

    var ownURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ArchivingData')/Items";
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

/*function ReadAnalyticalArchiving(archivindListUrl) 
{
	
	dfds = $.Deferred(),
    $.ajax({
        url:archivindListUrl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        processing: true,
        serverSide: true,
        success: function (data) 
        {
        	arrData= arrData.concat(data.d.results);           
            if (data.d.__next) 
            {
                ReadAnalyticalArchiving(data.d.__next);
            }
            else 
            {
            	var fd = new Date(moment(new Date($("#From_data").val())).format("YYYY-MM-DD")+"T00:00:00.000Z").getTime();      			
  				var ExtResults = arrData.filter(d => {var time = new Date(moment(d.Created).format("YYYY-MM-DD")+"T00:00:00.000Z").getTime();
  				if(time <= fd){
  				   DeleteArchiveListData(d.ID);
  				}
  				return (time <= fd);                
                });         	
            	console.log('Archiving successfully '+arrData.length +'items')
            	//alert('Archivind successfully'+arrData.length)
            	//arrData= ExtResults;
            	CloseMyCustomLoader();
				
            }     
        },
        error: function (jqXhr, textStatus, errorThrown)
		{
            console.log(jqXhr.responseJSON.error.message.value);            
        }    
    });
    return dfds.promise();
}


function DeleteArchiveListData(itemID) {
         var listName='NotificationCenter'; 
         $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('"+listName+"')/items(" + itemID+ ")",  
            type: "POST",
            async:true,  
            contentType: "application/json;odata=verbose",  
            headers: {  
                "Accept": "application/json;odata=verbose",  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "DELETE",  
            },  
            success: function(data) {  
                console.log("success");  
            },  
            error: function(data) {  
                //alert(data);  
            }  
        });
} */