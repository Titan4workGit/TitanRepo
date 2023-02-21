var StDate = '';
var EnDate = '';
var Query = '';
var companyID='';
var arrActivity =[];
var arrActivityResult =[];
var arrDetailActivity =[];
var TempArray = [];
var TempArray2 = [];
var today = '';
var lastdays = new Date();
var FrmDate = '';
var EndDate = '';
var uniqueUsers = [];
var UniqueCountsWeb = [];	
var UniqueCountsMob = [];
var uniqueNonActiveUsers = [];
var TempWebpart = [];
var TempPages = [];
var TempDept = [];
var FirstItemId =0;
var LastItemId = 0;
var NextURL = '';
var FilterUrl= '';
var AllActivityResult =[];
var AllActivityCount = '';
var FilterActivityResult =[];
var AllEmployee = [];

$(document).ready(function() {
    today = new Date();
    //getAllActivityCount();
    companyID=titanForWork.getQueryStringParameter('CompanyId');
    $(".ms-backgroundImage").css("padding-right", "0px");
    $('#Todt').text(moment(today).format('DD MMM YYYY'));
    $('#Fromdt').text(moment(lastdays.setDate(lastdays.getDate() - 7)).format('DD MMM YYYY'));
    $('#attendance-reportTo').val(moment(today).format('YYYY-MM-DD'))
    $('#attendance-reportFrom').val(moment(lastdays).format('YYYY-MM-DD'))
    $('#lbttlLicenesedUser').text(UsersLicenceRequired);
    $('#attendance-report-filter').modal('show');
    $("#btnApply").click(function(){				
        Query = '';
        arrActivityResult = [];
        OpenMyCustomLoader();
        //setTimeout(function(){getAllActivityCount() }, 100); 
        //// setTimeout(function(){getUsers_Activity_Details('Filter'); }, 100);  

		allRecord().then((data)=>{});
		
		
    });
    $("#btnApplyFilter").click(function(){				
        OpenMyCustomLoader();
        setTimeout(function(){ActivityFilter() }, 100); 
    });

    $("#btnReport").click(function(){ 
        setTimeout(function(){OpenMyCustomLoader() }, 50); 	
        arrActivityResult = [];
        setTimeout(function(){getUsers_Activity_Details(''); }, 100);   
    });
    initializePeoplePicker("Userto");  
});

async function allRecord() {
    /*const result = await $.ajax({
        url: ajaxurl,
        type: 'POST',
        data: args
    });
	*/
	let result;

    try {
		pnp.Logger.subscribe(new pnp.ConsoleListener());
		pnp.Logger.activeLogLevel = pnp.LogLevel.Info;

		pnp.sp.web.get().then(w => {

			console.log(JSON.stringify(w, null, 4));
		});
		
		AllActivityResult=[];
		
		StDate = $('#attendance-reportFrom').val();  
		EnDate = $('#attendance-reportTo').val();
if(StDate!="" && EnDate!="")
{
        StDate = new Date(StDate);    StDate.setHours(00,00);
         
        EnDate = new Date(EnDate);	  EnDate.setHours(23,59);
        FrmDate = moment(StDate).format('DD MMM YYYY');
        EndDate = moment(EnDate).format('DD MMM YYYY');

		try{
			result=await pnp.sp.web.lists
			.getByTitle("NotificationCenter")
			.items
			.select("Title,Created,EnterDate,Environment,ContentCategory,Application,UserAction,WebpartName,Author/Title,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title")
			.expand("UserID,LocationID,DepartmentId,CompanyId,Author")
			.filter("Created ge '"+FrmDate+"' and Created le '"+EndDate+"'")
			.get()
			.then(d => {
			  AllActivityResult=d;
			  //console.log(d);
			  console.log(AllActivityResult.length);
			});
		}catch(e)
		{}
		
}

if(AllActivityResult.length<=0)
{
		result=await pnp.sp.web.lists
		.getByTitle("NotificationCenter")
		.items
		.select("Title,Created,EnterDate,Environment,ContentCategory,Application,UserAction,WebpartName,Author/Title,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title")
		.expand("UserID,LocationID,DepartmentId,CompanyId,Author")
		.getAll()
		.then(d => {
		  AllActivityResult=d;
		  //console.log(d);
		  console.log(AllActivityResult.length);
		});
}

		getUsers_Activity_Details('Filter');

		return result;
		
	} catch (error) {
        console.error(error);
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


function getItems(url, dfds)
{
    $.ajax({
        url: url,
        type: 'GET',
        async: false,        
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function (data)
        {			
            response = response.concat(data.d.results);
            if (data.d.__next)
            {
                url = data.d.__next;
                getItems(url, dfds);
            }
            else 
            {
                dfds.resolve(response);
            }
        },
        error: function (data)
        {
            dfds.reject(data)
            console.log(data);
        }
    })
    return dfds.promise()
}

//get all users count 
var response = response || [];
function getAllActivityCount()
{
    StDate = $('#attendance-reportFrom').val();
    //StDate = new Date(StDate);  StDate.setHours(0,0,0,0);
    EnDate = $('#attendance-reportTo').val(); 
    //EnDate = new Date(EnDate); EnDate.setHours(0,0,0,0);
    //StDate = new Date(StDate);
    //EnDate = new Date(EnDate);
    //var StartDate = StDate.toISOString();
    //var EndDate = EnDate.toISOString();

    if (StDate != "") {
        var tempDate = new Date(StDate.split('T')[0]);
        tempDate.setDate(tempDate.getDate() - 1);
        StartDate = moment(tempDate).format("MM/DD/YYYY");
    }
    if (EnDate != "") {
        var tempDate = new Date(EnDate.split('T')[0]);
        tempDate.setDate(tempDate.getDate() + 1);
        EndDate = moment(tempDate).format("MM/DD/YYYY");
    }
    //var NewQuery = "?$top=1000&$select=*,Author/Name,Author/Title,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title&$expand=UserID,LocationID,DepartmentId,CompanyId,Author&$filter=EnterDate ge '" + StartDate + "' and EnterDate le '" + EndDate + "'";
    var NewQuery = "?$top=1000&$select=*,Author/Name,Author/Title,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title&$expand=UserID,LocationID,DepartmentId,CompanyId,Author";
    dfds = $.Deferred(),
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NotificationCenter')/items/" + NewQuery;
    //getItems(url, dfds);
    $.when(getItems(url, dfds)).done(function (ExtResults) {
        response = [];   
        ExtResults= ExtResults.filter(function (data) {
            Created = moment(data.Created).format("MM/DD/YYYY");
            return (StartDate == "" ? Created != "" : Created >= StartDate) && (EndDate == "" ? Created!= "" : Created <= EndDate);
        });
        AllActivityCount = ExtResults.length;
        AllActivityResult = ExtResults;   
    });
    getUsers_Activity_Details('Filter');
}

// get users activity details
function getUsers_Activity_Details(Action)
{
    var dfd = $.Deferred(); 
    if(Action != 'Filter')
    {
        StDate = $('#Fromdt').text();
        StDate = new Date(StDate);  StDate.setHours(00,00);
        EnDate = $('#Todt').text(); 
        EnDate = new Date(EnDate); EnDate.setHours(23,59);
        FrmDate = moment(StDate).format('DD MMM YYYY')
        EndDate = moment(EnDate).format('DD MMM YYYY')      
    }
    else
    {
        StDate = $('#attendance-reportFrom').val();    
        StDate = new Date(StDate);    StDate.setHours(00,00);
        EnDate = $('#attendance-reportTo').val(); 
        EnDate = new Date(EnDate);	  EnDate.setHours(23,59);
        FrmDate = moment(StDate).format('DD MMM YYYY')
        EndDate = moment(EnDate).format('DD MMM YYYY')   	
    }	
    $('#Fromdt').text(moment(StDate).format('DD MMM YYYY'));	
    $('#Todt').text(moment(EnDate).format('DD MMM YYYY'));
    $('#attendance-reportTo').val(moment(EnDate).format('YYYY-MM-DD'));
    $('#attendance-reportFrom').val(moment(StDate).format('YYYY-MM-DD'));	
    //	$('#attendance-reportFrom').datepicker({dateFormat: 'yy-mm-dd'}).datepicker('setDate', StDate);
    //	$('#attendance-reportTo').datepicker({dateFormat: 'yy-mm-dd'}).datepicker('setDate', EnDate);
    for(i=0;i<AllActivityResult.length;i++)
    {
        //if((AllActivityResult[i].Created >= StDate.toISOString() && AllActivityResult[i].Created <= EnDate.toISOString()) && AllActivityResult[i].CompanyIdId == companyID){			
		try{
        if((new Date(AllActivityResult[i].Created) >= StDate && new Date(AllActivityResult[i].Created) <= EnDate) && AllActivityResult[i].CompanyId.ID == companyID)
        {			
            arrActivityResult.push(AllActivityResult[i]);
        }	
		}catch(e){}
    }	
    BindAllData(arrActivityResult); 
    //	BindAllData(AllActivityResult);
    /*	if(Query == ''){
            Query = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NotificationCenter')/items?$top=5000&$orderby=Created asc&$select=*,ID,WebpartName,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title&$expand=UserID/ID,LocationID/ID,DepartmentId/ID,CompanyId/ID&$filter=(Created ge datetime'"+StDate.toISOString()+"' and Created le datetime'"+EnDate.toISOString()+"') and (CompanyId eq '" + companyID + "')";  
        //	  	Query = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NotificationCenter')/items?$top=5000&$orderby=Created asc&$select=*,ID,WebpartName,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title&$expand=UserID/ID,LocationID/ID,DepartmentId/ID,CompanyId/ID&$filter=(ID ge "+FirstItemId+" and ID le "+LastItemId+") and (CompanyId eq '" + companyID + "')";  
          }
          $.ajax({
            url: Query,
            type: 'GET',
            async: false,
            headers: {
                'accept': 'application/json;odata=verbose'
            },
            success: function (data) {														 
                dfd.resolve(data.d.results);
                arrActivityResult = arrActivityResult.concat(data.d.results); 
                var results = data.d.results;
                if(data.d.__next != null){
                    Query = data.d.__next; 
                    getUsers_Activity_Details('Filter');           
                }               
                BindAllData(arrActivityResult);
              },                            
            error: function (error) {
                dfd.reject(error)
                console.log(error);
            }
        });	*/	
    CloseMyCustomLoader();
    //	$('#overlayq').fadeOut();
    
    //   return dfd.promise()
}
// Bind details in All section
function BindAllData(arrActivityResult){
    arrActivity=[];
    arrDetailActivity = [];
    TempArray = [];
    TempArray2 = [];
    TempArray3 = [];
    TempWebpart = [];
    TempPages = [];
    if(arrActivityResult.length > 0){
        for (var i = 0; i < arrActivityResult.length; i++) {
            var	items = arrActivityResult[i];        
            /*	if (arrActivityResult.length - 1 == i) {
                   LastItemId = items.ID;//get the last Item ID
                }	*/            
				try{
            arrActivityResult[i].ContentCategory = arrActivityResult[i].ContentCategory == null ? arrActivityResult[i].ContentCategory = '' : arrActivityResult[i].ContentCategory;
            arrActivityResult[i].Enviroment= arrActivityResult[i].Enviroment == null ? arrActivityResult[i].Enviroment= '' : arrActivityResult[i].Enviroment;
            arrActivity.push(arrActivityResult[i]);    	
            if(arrActivityResult[i].UserAction != 'Logged In'){
                arrDetailActivity.push(arrActivityResult[i]);
            }
            TempArray.push(arrActivityResult[i].UserAction); 
				}catch(e){}
			try{
				var User = arrActivityResult[i].UserID !=null ? arrActivityResult[i].UserID.Title: arrActivityResult[i].Author.Title;
				var UserID = arrActivityResult[i].UserID != null ? arrActivityResult[i].UserID.ID: arrActivityResult[i].Author.ID;
				var Application = arrActivityResult[i].Application;
				var Date = arrActivityResult[i].Created;
				var RecordNo = arrActivityResult[i].ID;
				var Designation = arrActivityResult[i].Designation; 
				if(Designation == null){Designation = '';}
				var Dept = arrActivityResult[i].DepartmentId.Title == null ? arrActivityResult[i].DepartmentId.Title = '' : arrActivityResult[i].DepartmentId.Title;
				if(arrActivityResult[i].UserAction == 'Logged In'){	            		
					TempArray2.push({User, UserID, Application, Date, Designation, Dept,RecordNo });
					// 	TempArray2.push({User, Application, Date, Designation, Dept});
				}else{
					TempArray3.push(arrActivityResult[i].UserAction);
				}
			}catch(e){
				console.log("error in row:"+i+", message:"+e.message);
			}
			try{
				TempWebpart.push(arrActivityResult[i].WebpartName);
			}catch(e){}
			try{
				if(arrActivityResult[i].UserAction == 'Page Visited'){	            		 
					TempPages.push(arrActivityResult[i].WebpartName);
				}
			}catch(e){}
			try{
				TempDept.push(Dept);
			}catch(e){}
        }			
        ToGetActivityCounts();ToGetCountbyDate();BindLocation();BindDepartment();BIndActivityAction();GetAllNonVisitedUserss();ToGetCountsByUsers();}				
    GetContentEntry();GetContentViewed();GetVisitedCountbyDept();GetVisitedPages();BindActivity(arrDetailActivity);
    $('.canvasjs-chart-credit').hide();$('#overlayq').hide();

}
// Bind Activity in details section
function BindActivity(array){
    var tblActivity = $('#tbActivityDetails');
    $('#thDateRangePeriod').text(' : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    var ActDetail = '';	
    //tblActivity.html('');
    $('.sharedwithme_table>tbody').html('');
    $('#TotalItemscount').text(array.length)
    $.each(array, function( index, value ) {
		try{
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
		}catch(e){}
    });
    tblActivity.append(ActDetail);
    if (array.length >0) 
    {
    	$("#tablelocation").show();
    	$("#tablenav").show();
		try{
        TableConfiguration();  // GenerateTableWithMe();      
		}catch(e){}		
    }else{
    	$("#tablelocation").hide();
    	$("#tablenav").hide();
        $('.sharedwithme_table>tbody').append('<tr class="text-left" ><td style="text-align: center;" colspan="8"> No records found </td></tr>');
    }
}
// get Excel report fro all section
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
/*
function exportexcel() {  
            $("#mytable").table2excel({  
                name: "Table2Excel",  
                filename: "myFileName",  
                fileext: ".xls"                 

            });  
        }  
*/
// get Excel report of Details activity section
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
// Bind deatils in Pie chart
function ToGetActivityCounts()
{	
    var TempPie =[];var ss = [];		
    if(TempArray3.length > 0){
        TempArray3 = TempArray3.filter(function (x, i, a) { 
            return a.indexOf(x) === i; 
        });	
    }
    var TempArrayCounts = [];	
    $.each(TempArray3, function( index, value ) {
        var filteredValue = arrActivity.filter(function(obj) {
            return (obj.UserAction === value);
        });
        var Tcounts = filteredValue.length; 
        filteredValue = (filteredValue.length / arrActivity.length)* 100;
        TempArrayCounts.push(filteredValue.length);
        var c= Math.round(filteredValue)		
        TempPie.push({value,c,Tcounts})
        //	TempArrayCounts.push(Math.round(filteredValue));
    });	
    for(i=0; i<TempPie.length; i++){
        ss.push({label: TempPie[i].value, x:TempPie[i].Tcounts, y: TempPie[i].c, legendText: TempPie[i].value});			
    }
    $("#dvpieChart").CanvasJSChart({ 
        /*	title: { 
                text: "Worldwide",
                fontSize: 24
            },  */
        axisY: { 
            title: "Products in %" 
        }, 
        legend :{ 
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

		
		        //	$('.txtInstance').text(e.dataPoint.x);
		        var filteredResult = arrActivity.filter(function(obj) {						
		            return (obj.UserAction == e.dataPoint.label);					    	
		        });		
		        for(i=0;i< filteredResult.length; i++){		  
		            tbodyData += '<tr class="text-left"><td>'+filteredResult[i].UserID.Title+' <p class="mb0">'+filteredResult[i].Designation+', '+filteredResult[i].DepartmentId.Title+'</p></td><td>'+filteredResult[i].WebpartName+'</td><td>'+moment(filteredResult[i].Modified).format("DD-MMM-YYYY HH:mm")+'</td><td>'+filteredResult[i].Application+'</td></tr>';
		        }
		        $('#tbInstance').append(tbodyData);
		        $('#List-of-Instances-modal').modal('show');     
		    },
		    type: "pie", 
		    showInLegend: true, 
		    toolTipContent: "{label} <br/> {y} %", 
		    indexLabel: "{y} %", 			
		    dataPoints: ss		
		} 
        ] 		
    }); 	
    /*	var pieChartcontent = document.getElementById('dvpieChart');
        pieChartcontent.innerHTML = '&nbsp;';
        $('#dvpieChart').append('<canvas id="pieChart" data-toggle="modal" data-target="#Visited-User-modal"><canvas>');					
        var ctx = document.getElementById('pieChart').getContext('2d');	
         pieChart = new Chart(ctx, {
            type: 'pie',
            options: 'options',
            data: {	
                position: 'right',	
                labels: TempArray3,
                datasets: [{
                    label: '# of Votes',			
                    data: TempArrayCounts,
                    backgroundColor: [
                        'rgba(91, 155, 213, 0.2)',
                        'rgba(237, 125, 49, 0.2)',
                        'rgba(165, 165, 165, 0.2)',
                        'rgba(255, 192, 0, 0.2)'
                    ],
                    borderColor: [
                        'rgba(91, 155, 213, 1)',
                        'rgba(237, 125, 49, 1)',
                        'rgba(165, 165, 165, 1)',
                        'rgba(255, 192, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
        });  */
	
}
//Bind details in Line chart
function ToGetCountbyDate()
{
    var arrDates = [];
    var arrDateRcords = [];	
    var start = new Date(FrmDate);
    var end = new Date(EndDate);	
    var loop = new Date(start);
	
    while(loop <= end){
        // console.log(loop); // alert(loop);        
        arrDates.push(moment(loop).format('MMM DD'));
        var filteredValue = TempArray2.filter(function(obj) {
            return (moment(obj.Date).format('DD MM YYYY') === moment(loop).format('DD MM YYYY'));
        });
        var uniqueLineUsers = [];
        var dupes = [];
        $.each(filteredValue, function (index, entry) {
            if (!dupes[entry.User]) {
                dupes[entry.User] = true;
                uniqueLineUsers.push(entry.User);
            }
        });		
        arrDateRcords.push(uniqueLineUsers.length);
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);										   
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
                label: moment(loop).format('YYYY'),
                data: arrDateRcords,  //[4,8,6,2,4,0,5,7],
                fill: true,
                borderColor: 'rgb(75, 192, 192)'
            }]	
        }
    });	
}
// bind counts in progress bar
function ToGetCountsByUsers()
{ 
    if(TempArray2.length > 0){	
        var dupes = [];
        uniqueUsers=[];		
        $.each(TempArray2, function (index, entry) {
            if (!dupes[entry.User]) {
                dupes[entry.User] = true;
                uniqueUsers.push(entry);
            }
        });
        //console.log(uniqueUsers);		
        uniqueEmployeesValue = (uniqueUsers.length / AllEmployee.length)* 100;
        //console.log(Math.round(uniqueUsers));
        $('div#ProgressTtldiv').css({'width': Math.round(uniqueEmployeesValue)+'%'});
        $('#lbTotal').text('Over all Usage '+ Math.round(uniqueEmployeesValue)+'%');
        $('#TotalVisit').text('Active User : '+ uniqueUsers.length +' out of '+AllEmployee.length);		
        var dupesWeb = [];
        var dupesMob = [];
        UniqueCountsWeb = [];	
        UniqueCountsMob = [];
        $.each(TempArray2, function (index, entry) {
            if(entry.Application == 'Website'){
                if (!dupesWeb[entry.User]) {
                    dupesWeb[entry.User] = true;
                    UniqueCountsWeb.push(entry);
                }
            }
            if(entry.Application == 'Mobile App'){
                if (!dupesMob[entry.User]) {
                    dupesMob[entry.User] = true;
                    UniqueCountsMob.push(entry);
                }           	            	
            }
        });
    }
    UniqueCountsWebValue = (UniqueCountsWeb.length / AllEmployee.length)* 100;
    //console.log(Math.round(UniqueCountsWebValue));
    $('div#ProgressWebdiv').css({'width': Math.round(UniqueCountsWebValue)+'%'});
    $('#lbWeb').text('Website Usage '+ Math.round(UniqueCountsWebValue)+'%');
    $('#WebVisit').text('Active User : '+ UniqueCountsWeb.length +' out of '+AllEmployee.length);
	
    UniqueCountsMobValue = (UniqueCountsMob.length / AllEmployee.length)* 100;
    //console.log(Math.round(UniqueCountsMobValue));
    $('div#ProgressMobdiv').css({'width': Math.round(UniqueCountsMobValue)+'%'});
    $('#lbMob').text('Mobile App Usage '+ Math.round(UniqueCountsMobValue)+'%');
    $('#MobVisit').text('Active User : '+ UniqueCountsMob.length +' out of '+AllEmployee.length);
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
// bind office location in dropdown
function BindLocation(){
    var dupes = [];	
    var OfficeLocation = [];
    var	option = '';
    $('#ddlLocation').html('');	
    option += '<option value="All">All</option>';
    $.each(arrActivity, function (index, entry) {
		try{
        if (!dupes[entry.LocationID.Title]) {
            dupes[entry.LocationID.Title] = true;
            if(entry.LocationIDId !=  null){
                OfficeLocation.push(entry.LocationID);
            }
        }
		}catch(e){}
    });   
    for(i=0; i<OfficeLocation.length; i++){
        option += '<option value="'+ OfficeLocation[i].ID + '">' + OfficeLocation[i].Title + '</option>';       
    }
    $('#ddlLocation').append(option);
}
// bind Department in dropdown
function BindDepartment(){
    var dupes = [];	
    var Deprtment = [];
    var	option = '';
    $('#ddlDepartment').html('');
    option += '<option value="All">All</option>';
    $.each(arrActivity, function (index, entry) {
		try{
        if (!dupes[entry.DepartmentId.Title]) {
            dupes[entry.DepartmentId.Title] = true;
            if(entry.DepartmentIdId !=  null){
                Deprtment.push(entry.DepartmentId);
            }
        }
		}catch(e){}
    });   
    for(i=0; i<Deprtment.length; i++){
        option += '<option value="'+ Deprtment[i].ID + '">' + Deprtment[i].Title + '</option>';       
    }
    $('#ddlDepartment').append(option);
}
// Bind activity from data in dropdown
function BIndActivityAction(){	
    var	option = '';	
    $('#ddlActivity').html('');
    option += '<option value="All">All</option>';
    TempArray = TempArray.filter(function (x, i, a) { 
        return a.indexOf(x) === i; 
    });
    for(i=0; i< TempArray.length; i++){
        if(TempArray[i] != "Logged In")
        {
            option += '<option value="'+ TempArray[i] + '">' + TempArray[i] + '</option>';       
        }
    }
    $('#ddlActivity').append(option);
}

var FilterActivityResultView = [];

function FilterResultView(){
    var restView = "" , restView2 = "";
    var restDeptView = "";
    var restLocView  = "";
    var restActivityView  = "";
    var restDesView = '' , restWebView = '' ,restAppView = '';
    for(i=0;i<arrActivity.length;i++)
    {
        if($('#ddlDepartment').val() != "All")
        {				
            restDeptView = $('#ddlDepartment').val(); // AllActivityResult[i].DepartmentId == 		
        }
        if($('#ddlLocation').val() != "All")
        {
            restLocView = $('#ddlLocation').val(); //AllActivityResult[i].LocationID == 			
        }	
        if($('#ddlActivity').val() != "All" )
        {
            restActivityView = $('#ddlActivity').val(); //AllActivityResult[i].UserAction == 				 
        }
        if($('#txtDesignation').val() != "" )
        {
            restDesView = $('#txtDesignation').val(); //AllActivityResult[i].Designation == 		 
        }
        if($('#txtWebpart').val() != ""){	
            restWebView = $('#txtWebpart').val();	//AllActivityResult[i].WebpartName == 	 
        }
        if($('#ddlApplication').val() != "All" )
        {
            restAppView =  $('#ddlApplication').val() ; //AllActivityResult[i].Application == 				 
        }
        if($("#Userto_TopSpan_ResolvedList").text() != "" ) 
        { 
            var assignbyme= getUserInformation('Userto');
            if(assignbyme.length>0)
            {  
                restView =  assignbyme[0]; //AllActivityResult[i].Created == 
                for(var j=0; j<assignbyme.length; j++)
                {
                    if(assignbyme[j] != assignbyme[0])
                    {
                        restView2 =  assignbyme[j]; //AllActivityResult[i].Created == ;	
                    }
                }
                // restView += );  	
            }		 
        }
        if(arrActivity[i].DepartmentIdId == restDeptView && arrActivity[i].LocationIDId == restLocView && arrActivity[i].UserAction == restActivityView && arrActivity[i].Designation == restDesView && arrActivity[i].WebpartName == restWebView && arrActivity[i].Application ==  restAppView && (arrActivity[i].AuthorId== restView || arrActivity[i].AuthorId== restView2 )){	
            FilterActivityResultView.push(arrActivity[i]);
        }	
    }
}


// get Filter records from details section
function ActivityFilter(){
    var restquery = "";
    var restView = "";	 
    FilterActivityResult = [];
    
    FilterUrl=  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('NotificationCenter')/items?$top=1000&$select=*,Author/Name,Author/EMail,Author/Title,Author/ID,DepartmentId/ID,DepartmentId/Title,CompanyId/ID,CompanyId/Title,LocationID/ID,LocationID/Title,UserID/ID,UserID/Title&$expand=UserID,LocationID,DepartmentId,CompanyId,Author&$orderby=Modified asc";
    FilterActivityData(FilterUrl); 
}

// Get Activity filter data
function FilterActivityData(FilterUrl){
    var dfd = $.Deferred();
    var arrActivityFilterData = [];
    $.ajax({
        url: FilterUrl,
        type: 'GET',
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            dfd.resolve(data.d.results);
            FilterActivityResult = FilterActivityResult.concat(data.d.results);
            var results = data.d.results;
            if(data.d.__next != null){
                FilterUrl = data.d.__next; 
                FilterActivityData(FilterUrl);           
            }
            else
            {    
            	var assignbyme = '';
            	var StDate = $('#attendance-reportFrom').val();
    			var EnDate = $('#attendance-reportTo').val(); 

            	if (StDate != "") {
			        var tempDate = new Date(StDate.split('T')[0]);
			        tempDate.setDate(tempDate.getDate() - 1);
			        StartDate = moment(tempDate).format("MM/DD/YYYY");
			    }
			    if (EnDate != "") {
			        var tempDate = new Date(EnDate.split('T')[0]);
			        tempDate.setDate(tempDate.getDate() + 1);
			        EndDate = moment(tempDate).format("MM/DD/YYYY");
			    }
			    if($("#Userto_TopSpan_ResolvedList").text() != "" ) 
			    { 
			        assignbyme= getUserInformation('Userto');
			    }
			    
                arrActivityFilterData = FilterActivityResult.filter(function (data) { //get selected domain's zones 
                    Created = moment(data.Created).format("MM/DD/YYYY");
                    if(assignbyme == null || assignbyme == "null"){
                        assignbyme = '';
                    }
                    if (data.Designation == null || data.Designation == '') {
                        data.Designation = 'null';
                    }
                    if (data.WebpartName == null || data.WebpartName == '') {
                        data.WebpartName = 'null';
                    }
			    	data.Author.EMail = data.Author.EMail ? data.Author.EMail : "";
			    	data.DepartmentId.ID = data.DepartmentId.ID ? data.DepartmentId.ID : "";
			    	data.LocationID.ID = data.LocationID.ID ? data.LocationID.ID : "";
			    	data.UserAction = data.UserAction ? data.UserAction : "";
			    	data.Application = data.Application ? data.Application : "";
                    return (StartDate == "" ? Created != "" : Created >= StartDate) && (EndDate == "" ? Created!= "" : Created <= EndDate)
                            && (assignbyme == "" ? data.Author.EMail.toLowerCase() != "" : data.Author.EMail.toLowerCase() == assignbyme)
                            && ($('#ddlDepartment').val() == "All" ? data.DepartmentId.ID.toString() != "" : data.DepartmentId.ID.toString() == $('#ddlDepartment').val())
                            && ($('#ddlLocation').val() == "All" ? data.LocationID.ID.toString() != "" : data.LocationID.ID.toString() == $('#ddlLocation').val())
                            && ($('#txtDesignation').val().trim() == "null" ? data.Designation != "null" : (data.Designation.toLowerCase() == $('#txtDesignation').val().toLowerCase() || data.Designation.toLowerCase().indexOf($('#txtDesignation').val().toLowerCase()) != -1))
                            && ($('#ddlActivity').val() == "All" ? data.UserAction.toString() != "" : data.UserAction.toString() == $('#ddlActivity').val())
                            && ($('#txtWebpart').val().trim() == "null" ? data.WebpartName != "null" : (data.WebpartName.toLowerCase() == $('#txtWebpart').val().toLowerCase() || data.WebpartName.toLowerCase().indexOf($('#txtWebpart').val().toLowerCase()) != -1))
                            && ($('#ddlApplication').val() == "All" ? data.Application.toString() != "" : data.Application.toString() == $('#ddlApplication').val())
                });
                $('#TotalItemscount').text(arrActivityFilterData.length);
                BindActivity(arrActivityFilterData);	
                CloseMyCustomLoader();

            }
        },
        error: function (data) {
            CloseMyCustomLoader();
            dfd.reject(data)
            console.log(data);
        }
    });
    return dfd.promise()
}

// get user details from UserId
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
                /*var userId=GetUserID(accountName);
                if(userId!=-1){
                    userIds.push(userId);
                } */
            }           
            return accountName.split('|')[2].toLowerCase();
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
// Clear all filter details
function ClearFilter()
{
    $('#ddlDepartment').val("All");
    $('#ddlLocation').val("All");
    $('#ddlActivity').val("All");
    $('#txtWebpart').val("");
    $('#txtDesignation').val("");
    $('#ddlApplication').val("All")
    clearPeoplePickerControl("Userto");
    //ActivityFilter();
    BindActivity(arrActivityResult);	
}
// clear people pcker details
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
//Custom loader code
function OpenMyCustomLoader() {
    //Loader
    var dlgTitle = 'Loading...';
    var dlgMsg = '<br />Please wait!!';
    var dlgHeight = 200;
    var dlgWidth = 400;
    currentDlg = SP.UI.ModalDialog.showWaitScreenWithNoClose(dlgTitle, dlgMsg, dlgHeight, dlgWidth);  
    // $('body').addClass('loading');
	
}
function CloseMyCustomLoader() {
    currentDlg.close();
    //   $('body').removeClass('loading');
}

function SortByName(a, b){
    var aName = a.RecordNo;
    var bName = b.RecordNo; 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

// get all visited user and bind in Pop-Up
function GetAllVisitedUserss()
{
    var tblBodyData = '';
    var lastDate = '';
    $('#tbdyAllVisitedUsers').html('');
    $('#Visited-User-modal').modal('show');
    $('#thUserTitle').text('Active User');
    $('#thdatePeriod').text(' '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    $('#lbDatesPeriod').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    if(uniqueUsers.length > 0)
    {
        for(i=0;i<uniqueUsers.length;i++)
        {		
            var filteredValue = TempArray2.filter(function(obj) {
                lastDate = obj.Date;
                return (obj.User === uniqueUsers[i].User);	    	
            });
            var found_names = $.grep(TempArray2, function(v) {
                return v.UserID === uniqueUsers[i].UserID;
            });
            var ArrangeArray = found_names.sort(SortByName);
            var SelectedRec = ArrangeArray[ArrangeArray.length-1];
		
            var eventDateObj=new Date(SelectedRec.Date);
            var Event_time = eventDateObj.toTimeString();
            var H = +Event_time.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? " AM" : " PM";
            Event_time= h + Event_time.substr(2, 3) + ampm;	 	

            uniqueUsers[i].Designation = uniqueUsers[i].Designation == null ? uniqueUsers[i].Designation = '' : uniqueUsers[i].Designation;	
            var UserEmail = getUser(uniqueUsers[i].UserID);
            var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(UserEmail) 
            tblBodyData += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+employeePicURL +'" ><div class="analytical-user-image-text"><p class="mb0">'+uniqueUsers[i].User+'</p><p class="mb0">'+uniqueUsers[i].Designation+', '+uniqueUsers[i].Dept+'</p><p class="mb0 Emailfont">'+UserEmail +'</p></div></div></td>'
            //tblBodyData += '<td class="text-left">'+moment(SelectedRec.Date).format("DD-MMM-YYYY HH:mm")+'</td><td class="js-sort-number">'+filteredValue.length+'</td></tr>'
            tblBodyData += '<td class="text-left">'+moment(SelectedRec.Date).format("DD-MMM-YYYY")+' '+Event_time+'</td><td class="js-sort-number">'+filteredValue.length+'</td></tr>'
        }
        $('#tbdyAllVisitedUsers').append(tblBodyData);
    }
}

// get all website visited user and bind in Pop-Up
function GetAllWebsiteVisitedUserss(){
    var tblBodyData = '';
    var lastDate = '';
    $('#tbdyAllVisitedUsers').html('');
    $('#thUserTitle').text('Active User');
    $('#Visited-User-modal').modal('show');
    $('#thDatePeriod').text(' '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));

    if(uniqueUsers.length > 0){
        for(i=0;i<UniqueCountsWeb.length;i++){		
            var filteredValue = TempArray2.filter(function(obj) {
                lastDate = obj.Date;
                return (obj.User === uniqueUsers[i].User && obj.Application === 'Website');	    	
            });	
            uniqueUsers[i].Designation = uniqueUsers[i].Designation == null ? uniqueUsers[i].Designation = '' : uniqueUsers[i].Designation;	
            var UserEmail = getUser(uniqueUsers[i].UserID);
            var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(UserEmail) 	
            tblBodyData += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+employeePicURL+'"><div class="analytical-user-image-text"><p class="mb0">'+uniqueUsers[i].User+'</p><p class="mb0">'+uniqueUsers[i].Designation+', '+uniqueUsers[i].Dept+'</p><p class="mb0 Emailfont">'+UserEmail +'</p></div></div></td>'
            tblBodyData += '<td class="text-left">'+moment(lastDate).format("DD-MMM-YYYY HH:mm")+'</td><td class="js-sort-number">'+filteredValue.length+'</td></tr>'
        }
        $('#tbdyAllVisitedUsers').append(tblBodyData);
    }
}
// get all mobile visited user and bind in Pop-Up
function GetAllMobileVisitedUserss(){
    var tblBodyData = '';
    var lastDate = '';
    $('#thUserTitle').text('Active User');
    $('#tbdyAllVisitedUsers').html('');
    $('#Visited-User-modal').modal('show');
    $('#thDatePeriod').text(' '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));

    if(uniqueUsers.length > 0){
        for(i=0;i<UniqueCountsMob.length;i++){		
            var filteredValue = TempArray2.filter(function(obj) {
                lastDate = obj.Date;
                return (obj.User === uniqueUsers[i].User && obj.Application === 'Mobile App');	    	
            });	
            uniqueUsers[i].Designation = uniqueUsers[i].Designation == null ? uniqueUsers[i].Designation = '' : uniqueUsers[i].Designation;	
            var UserEmail = getUser(uniqueUsers[i].UserID);
            var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(UserEmail) 	
            tblBodyData += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+employeePicURL +'"><div class="analytical-user-image-text"><p class="mb0">'+uniqueUsers[i].User+'</p><p class="mb0">'+uniqueUsers[i].Designation+', '+uniqueUsers[i].Dept+'</p><p class="mb0 Emailfont">'+UserEmail+'</p></div></div></td>'
            tblBodyData += '<td class="text-left">'+moment(lastDate).format("DD-MMM-YYYY HH:mm")+'</td><td class="js-sort-number">'+filteredValue.length+'</td></tr>'
        }
        $('#tbdyAllVisitedUsers').append(tblBodyData);
    }
}
// get all non Active Users and bin in Pop-up
function GetAllNonVisitedUserss(){
    var lastDate = '';
    var dfd = $.Deferred();
    //var restQuery = "?$top=5000&$expand=LogonName/ID,Department/ID,Company/ID&$orderby=ID desc&$select=*,ID,Department/ID,Department/Title,Company/ID,Company/Title,LogonName/ID,LogonName/Title&$filter=(PrimaryCompany eq 'Primary' and Status eq 'Active') and (Company eq '" + companyID + "')";     
    var restQuery = "?$top=5000&$expand=LogonName/ID,Department/ID,Company/ID&$orderby=ID desc&$select=*,ID,Department/ID,Department/Title,Company/ID,Company/Title,LogonName/ID,LogonName/Title&$filter=(PrimaryCompany eq 'Primary' and Status eq 'Active')"; // Company filter condition remove by Dipankar sir.    
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + restQuery,
        type: 'GET',
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            dfd.resolve(data.d.results);
            var results = data.d.results;
            AllEmployee = results;
            $('#lbLicenesedUser').text(AllEmployee.length);
            var filteredValue = '';
            if(results.length > 0){         		            
                var dupes = [];
                var NewArr = [];
                uniqueNonActiveUsers =[];		
                $.each(AllEmployee, function (index, entry) {
                    if (!dupes[entry.LogonName.Title]) {
                        dupes[entry.LogonName.Title] = true;
                        uniqueNonActiveUsers.push({User:entry.LogonName.Title, Designation:entry.Designation, Department:entry.Department.Title, Email: entry.Email});
                    }
                });	    		
                /*		$.each(AllEmployee, function (index, entry) {	           
                            uniqueNonActiveUsers.push({User:entry.LogonName.Title, Designation:entry.Designation, Department:entry.Department.Title, Email: entry.Email});	           		
                        });	  */  		
            }										
        },
        error: function (error) {
            dfd.reject(error)
            console.log(error);
        }
    });
    return dfd.promise()
}
// get all non Active Users and bin in Pop-up
function BindNonActiveUsers(App){
    var tblBodyData = '';
    $('#tbdyNonActiveuser').html('');
    $('#txtTitle').text('Non-Active Users');
    $('#thnonUserTitle').text('Non-Active Users');
    $('#thdatePrd').text(' '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    $('#lbNonDatesPeriod').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    if(App == 'Website'){
        var DiffUsr = arrayDiff(UniqueCountsWeb, uniqueNonActiveUsers);
        for(i=0; i< DiffUsr.length-2;i++){
            var	filteredUserWebDetails = uniqueNonActiveUsers.filter(function(obj) {						
                return (obj.User === DiffUsr[i]);					    	
            });
            /*		if(filteredValue.length > 0){		
            // 			tblBodyData += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/WebAnalytics/assets/images/user_pic.jpg"><div class="analytical-user-image-text"><p class="mb0">'+uniqueUsers[i].User+'</p><p class="mb0">'+uniqueUsers[i].Designation+','+uniqueUsers[i].Department+'</p></div></div></td></tr>'							 			
                    } */
            if(filteredUserWebDetails.length > 0){
                if(filteredUserWebDetails[0].Designation == null){
                    filteredUserWebDetails[0].Designation = '';
                }
                if(filteredUserWebDetails[0].Department == null){
                    filteredUserWebDetails[0].Department = '';
                }
                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(filteredUserWebDetails[0].Email) 
                tblBodyData += '<tr class="text-left"><td class="text-left js-sort-number"><div class="analytical-user-image-box"><img src="'+employeePicURL+'" > <div class="analytical-user-image-text"><p class="mb0">'+DiffUsr[i]+', </p><p class="mb0">'+filteredUserWebDetails[0].Designation+', '+filteredUserWebDetails[0].Department+'</p><p class="mb0 Emailfont">'+filteredUserWebDetails[0].Email+' </p></div></div></td></tr>'					
            }
        }	    		
    }else if(App == 'Mobile App'){
        var DiffUsr = arrayDiff(UniqueCountsMob, uniqueNonActiveUsers);
        for(i=0; i< DiffUsr.length-2; i++){
            var	filteredUserMobDetails = uniqueNonActiveUsers.filter(function(obj) {						
                return (obj.User === DiffUsr[i]);					    	
            })
            if(filteredUserMobDetails.length > 0){
                if(filteredUserMobDetails[0].Designation == null){
                    filteredUserMobDetails[0].Designation = '';
                }
                if(filteredUserMobDetails[0].Department == null){
                    filteredUserMobDetails[0].Department = '';
                }
                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(filteredUserMobDetails[0].Email);
                tblBodyData += '<tr class="text-left"><td class="text-left js-sort-number"><div class="analytical-user-image-box"><img src="'+employeePicURL+'"> <div class="analytical-user-image-text"><p class="mb0">'+DiffUsr[i]+', </p><p class="mb0">'+filteredUserMobDetails[0].Designation+', '+filteredUserMobDetails[0].Department+'</p><p class="mb0 Emailfont">'+filteredUserMobDetails[0].Email+' </p></div></div></td></tr>'					   		
            }
        }	 	
    }else{
        var DiffUsr = arrayDiff(uniqueUsers, uniqueNonActiveUsers);
        for(i=0; i<DiffUsr.length-2; i++){
            var	filteredUserAllDetails = uniqueNonActiveUsers.filter(function(obj) {						
                return (obj.User === DiffUsr[i]);					    	
            })
            if(filteredUserAllDetails.length > 0){
                if(filteredUserAllDetails[0].Designation == null){
                    filteredUserAllDetails[0].Designation = '';
                }
                if(filteredUserAllDetails[0].Department == null){
                    filteredUserAllDetails[0].Department = '';
                }
                var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(filteredUserAllDetails[0].Email);
                tblBodyData += '<tr class="text-left"><td class="text-left js-sort-number"><div class="analytical-user-image-box"><img src="'+employeePicURL +'"> <div class="analytical-user-image-text"><p class="mb0">'+DiffUsr[i]+', </p><p class="mb0">'+filteredUserAllDetails[0].Designation+', '+filteredUserAllDetails[0].Department+'</p><p class="mb0 Emailfont">'+filteredUserAllDetails[0].Email+' </p></div></div></td></tr>'					   		
            }
        }  	
    }			
    $('#tbdyNonActiveuser').append(tblBodyData);  
}

// To diifernciate and get Unique users from two array
function arrayDiff (OldUser, NewUsers) {
    var a = [], diff = [];
    for (var i = 0; i < OldUser.length; i++) {
        a[OldUser[i].User] = true;
    }
    for (var i = 0; i < NewUsers.length; i++) {
        if (a[NewUsers[i].User]) {
            delete a[NewUsers[i].User];
        } else {
            a[NewUsers[i].User] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
}
// get content entry details and bind in table
function GetContentEntry(){
    $('#tbContrntEnrty').html('');
    $('#lbContntDate').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    var WebPartData = '';
    var dupes = [];
    var uniqueWebpart = [];		
    $.each(TempWebpart, function (index, entry) {
        if (!dupes[entry]) {
            dupes[entry] = true;
            uniqueWebpart.push(entry);
        }
    });
    for(i=0; i<uniqueWebpart.length; i++){	
        var filteredData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == uniqueWebpart[i] && obj.UserAction == 'Content Edit');					    	
        });
        if(filteredData.length > 0){
            WebPartData += '<tr class="text-left"><td class="text-left">'+uniqueWebpart[i]+'</td><td class="text-left"><a href="#" data-toggle="modal" data-target="#Content-Entry-modal" onclick="getpopContentEntryDetails(\''+uniqueWebpart[i]+'\')">'+filteredData.length+'</a></td></tr>';
        }
    }
    $('#tbContrntEnrty').append(WebPartData);
}

// To get pop Content Entry details
function getpopContentEntryDetails(WebpartName){
    var Deatils = '';

    $('#tbContentEntry').html('');
    $('#txtContentEntryTitle').text(WebpartName);
    $('#stDt').text(moment(StDate).format('DD MMM YYYY'));	
    $('#enDt').text(moment(EnDate).format('DD MMM YYYY'));
    $('#lbPeriod').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    var DataResult = [];
    var filteredData = arrActivity.filter(function(obj) {						
        return (obj.WebpartName === WebpartName && obj.UserAction == 'Content Edit');					    	
    });		
    DataResult = filteredData ;
    for(i=0;i<DataResult.length;i++){
        //	Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+', '+DataResult[i].DepartmentId.Title+'</p></div></div></td><td>'+DataResult[i].WebpartName+'</td><td>'+DataResult[i].ContentCategory+'</td><td class="text-left">'+moment(DataResult[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>Website</td></tr>';
        Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+', '+DataResult[i].DepartmentId.Title+'</p></div></div></td><td>'+moment(DataResult[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+DataResult[i].WebpartName+'</td><td class="text-left">'+DataResult[i].ContentCategory+'</td><td>'+DataResult[i].Title+'</td></tr>';
    }
    $('#tbContentEntry').append(Deatils);
}

// get content views and bind in table 
function GetContentViewed(){
    $('#tbViewedContents').html('');
    var WebPartDetails = '';
    var dupes = [];
    var uniqueWebparts = [];		
    $.each(TempWebpart, function (index, entry) {
        if (!dupes[entry]) {
            dupes[entry] = true;
            uniqueWebparts.push(entry);
        }
    });
    for(i=0; i<uniqueWebparts.length; i++){	
        var filteredData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == uniqueWebparts[i] && obj.UserAction == 'Content Read');					    	
        });
        if(filteredData.length > 0){
            WebPartDetails += '<tr class="text-left"><td class="text-left">'+uniqueWebparts[i]+'</td><td>'+filteredData[0].ContentCategory+'</td><td>'+filteredData[0].Title+'</td><td class="text-left"><a href="#" data-toggle="modal" data-target="#Viewed-write-up-modal" onclick="getpopContentDetails(\''+uniqueWebparts[i]+'\', \''+filteredData[0].Title+'\')">'+filteredData.length+'</a></td></tr>';
        }
    }
    $('#tbViewedContents').append(WebPartDetails);
}

// To get pop Dept details
function getpopContentDetails(WebpartName, Title){
    var Deatils = '';

    $('#tblContentView').html('');
    $('#txtContentViewTitle').text('Title : '+ Title);
    $('#txtCViewTitle').text(Title);
    $('#StDate').text(moment(StDate).format('DD MMM YYYY'));	
    $('#EnDate').text(moment(EnDate).format('DD MMM YYYY'));
    var DataResult = [];
    var filteredData = arrActivity.filter(function(obj) {						
        return (obj.WebpartName === WebpartName && obj.UserAction == 'Content Read');					    	
    });		
    DataResult = filteredData ;
    for(i=0;i<DataResult.length;i++){
        Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+', '+DataResult[i].DepartmentId.Title+'</p></div></div></td><td class="text-left">'+moment(DataResult[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>Website</td></tr>';
    }
    $('#tblContentView').append(Deatils);
}


// get Visited pages details and bind in table
function GetVisitedPages(){
    $('#tbVisitedpages').html('');
    $('#fromDate').text()
    $('#EndDate').text()
    var PagesDetails = '';
    var dupes = [];
    var uniquePages = [];		
    $.each(TempPages, function (index, entry) {
        if (!dupes[entry]) {
            dupes[entry] = true;
            uniquePages.push(entry);
        }
    });
    for(i=0; i<uniquePages.length; i++){	
        var filteredData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == uniquePages[i] && obj.UserAction == 'Page Visited');					    	
        });
        var dups = [];
        var uniqueDataUsers = [];		
        $.each(filteredData, function (index, entry) {
			try{
            if (!dups[entry.UserID.Title]) {
                dups[entry.UserID.Title] = true;
                uniqueDataUsers.push(entry.UserID.Title);
            }
			}catch(e){}
        });		
        var filteredWebData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == uniquePages[i] && (obj.Application === 'Website' && obj.UserAction == 'Page Visited') );					    	
        });
        var dupsWeb = [];
        var uniqueWebDataUsers = [];		
        $.each(filteredWebData, function (index, entry) {
			try{
            if (!dupsWeb[entry.UserID.Title]) {
                dupsWeb[entry.UserID.Title] = true;
                uniqueWebDataUsers.push(entry.UserID.Title);
            }
			}catch(e){}
        });
        var filteredMobData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == uniquePages[i] && (obj.Application === 'Mobile App' && obj.UserAction == 'Page Visited'));					    	
        });
        var dupsMob = [];
        var uniqueMobDataUsers = [];		
        $.each(filteredMobData , function (index, entry) {
			try{
            if (!dupsMob[entry.UserID.Title]) {
                dupsMob[entry.UserID.Title] = true;
                uniqueMobDataUsers.push(entry.UserID.Title);
            }
			}catch(e){}
        });	
        var web='Website',	mob='Mobile'
        PagesDetails += '<tr class="text-left"><td class="text-left">'+uniquePages[i]+'</td><td class="text-left"><a href="#" data-toggle="modal" data-target="#Viewed-Pages-modal" onclick="getpopDetails(\''+uniquePages[i]+'\')">'+filteredData.length+'</a></td><td><a href="#" data-toggle="modal" data-target="#Non-Visited-User-modal" onclick="getpopUserDetails(\''+uniquePages[i]+'\')">'+uniqueDataUsers.length+'</a></td><td><a href="#" data-toggle="modal" data-target="#Viewed-Pages-modal" onclick="getpopDetails(\''+uniquePages[i]+'\',\''+web[i]+'\')">'+filteredWebData.length+'</a></td><td><a href="#"  data-toggle="modal" data-target="#Non-Visited-User-modal" onclick="getpopUserDetails(\''+uniquePages[i]+'\', \''+web+'\')">'+uniqueWebDataUsers.length+'</a></td><td><a href="#" data-toggle="modal" data-target="#Viewed-Pages-modal" onclick="getpopDetails(\''+uniquePages[i]+'\',  \''+mob+'\')">'+filteredMobData.length+'</a></td><td><a href="#"  data-toggle="modal" data-target="#Non-Visited-User-modal" onclick="getpopUserDetails(\''+uniquePages[i]+'\',  \''+mob+'\')">'+uniqueMobDataUsers.length+'</a></td></tr>';
        //PagesDetails += '<tr class="text-left"><td class="text-left">'+uniquePages[i]+'</td><td class="text-left"><a href="#" data-toggle="modal" data-target="#Viewed-Pages-modal" onclick="getpopDetails(\''+filteredData+'\')">'+filteredData.length+'</a></td><td><a href="#" data-toggle="modal" data-target="#Non-Visited-User-modal" onclick="getpopUserDetails(\''+uniquePages[i]+'\')">'+uniqueDataUsers.length+'</a></td><td><a href="#">'+filteredWebData.length+'</a></td><td><a href="#">'+uniqueWebDataUsers.length+'</a></td><td><a href="#">'+filteredMobData.length+'</a></td><td><a href="#">'+uniqueMobDataUsers.length+'</a></td></tr>';
    }
    $('#tbVisitedpages').append(PagesDetails);		
} 

// to get pop details
function getpopDetails(DataName, App)
{
    var Deatils = '';
    $('#tbViewDeatils').html('');
    $('#ViewPageTitle').text(DataName);
    $('#fromDate').text(moment(StDate).format('DD MMM YYYY'));	
    $('#EndDate').text(moment(EnDate).format('DD MMM YYYY'));
    $('#ViewedPeriod').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    var DataResult = [];
    if(App == 'Mobile')
    {
        var filteredMobData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == uniquePages[i] && (obj.Application === 'Mobile App' && obj.UserAction == 'Page Visited'));					    	
        });		
        DataResult = filteredMobData ;
    }
    else if(App == 'Website')
    {
        var filteredWebData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == uniquePages[i] && (obj.Application === 'Website' && obj.UserAction == 'Page Visited'));					    	
        });	
        DataResult = filteredWebData;
    }
    else
    {
        var filteredData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == DataName  && obj.UserAction == 'Page Visited');					    	
        });
        DataResult = filteredData;
    }
    for(i=0;i<DataResult.length;i++)
    {
        Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+', '+DataResult[i].DepartmentId.Title+'</p></div></div></td><td class="text-left">'+moment(DataResult[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+DataResult[i].Application+'</td><td>'+DataResult[i].Title+'</td></tr>';
    }
    $('#tbViewDeatils').append(Deatils);
}

// View Users 
function getpopUserDetails(DataName, App){
    var Deatils = '';
    var DataUser = [];
    var user = '';
    var userId = '';
    var desg = '';
    var dept = '';
    $('#tbdyNonActiveuser').html('');
    $('#txtTitle').text('Users');
    $('#thdatePrd').text(' '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    $('#lbNonDatesPeriod').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));

    if(App == 'Website'){
        var filteredWebData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == DataName && (obj.Application === 'Website' && obj.UserAction == 'Page Visited') );					    	
        });
        var dupsWeb = [];
        var uniqueWebDataUsers = [];		
        $.each(filteredWebData, function (index, entry) {
            if (!dupsWeb[entry.UserID.Title]) {
                dupsWeb[entry.UserID.Title] = true;
                user = entry.UserID.Title;
                userId = entry.UserID.ID;
                desg = entry.Designation;
                dept = entry.DepartmentId.Title;
                uniqueWebDataUsers.push({user ,userId ,desg ,dept});
            }
        });
        DataUser = uniqueWebDataUsers;					
    }else if(App == 'Mobile'){
        var filteredMobData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == DataName && (obj.Application === 'Mobile App' && obj.UserAction == 'Page Visited'));					    	
        });
        var dupsMob = [];
        var uniqueMobDataUsers = [];		
        $.each(filteredMobData , function (index, entry) {
            if (!dupsMob[entry.UserID.Title]) {
                dupsMob[entry.UserID.Title] = true;
                user = entry.UserID.Title;
                userId  = entry.UserID.ID;
                desg = entry.Designation;
                dept = entry.DepartmentId.Title;
                uniqueMobDataUsers.push({user, userId, desg, dept});
            }
        });
        DataUser = uniqueMobDataUsers;				
    }else{
        var filteredData = arrActivity.filter(function(obj) {						
            return (obj.WebpartName == DataName  && obj.UserAction == 'Page Visited');					    	
        });
        var dups = [];
        var uniqueDataUsers = [];		
        $.each(filteredData, function (index, entry) {
            if (!dups[entry.UserID.Title]) {
                dups[entry.UserID.Title] = true;
                user = entry.UserID.Title;
                userId  = entry.UserID.ID;
                desg = entry.Designation;
                dept = entry.DepartmentId.Title;
                uniqueDataUsers.push({user ,userId, desg ,dept});
            }
        });	
        DataUser = uniqueDataUsers;		
    }		
    for(i=0;i<DataUser.length;i++){
        var UserEmail = getUser(DataUser[i].userId);
        var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(UserEmail) 
        Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><img src="'+employeePicURL+'"><div class="analytical-user-image-text"><p class="mb0">'+DataUser[i].user+'</p><p class="mb0">'+DataUser[i].desg+', '+DataUser[i].dept+'</p><p class="mb0 Emailfont">'+UserEmail+'</p></div></div></td></tr>'					   		
    }
    $('#tbdyNonActiveuser').append(Deatils);
}
//to get dept. visited count and bind in table
function GetVisitedCountbyDept(){
    $('#tbDeptwiseCount').html('');
    var DeptDetails = '';
    var dupes = [];
    var uniqueDept = [];		
    $.each(TempDept, function (index, entry) {
        if (!dupes[entry]) {
            dupes[entry] = true;
            uniqueDept.push(entry);
        }
    });
    for(i=0; i<uniqueDept.length; i++){	
        if(uniqueDept[i] != null || uniqueDept[i] != undefined){		
try{		
            var filteredPageData = arrActivity.filter(function(obj) {						
                return (obj.DepartmentId.Title == uniqueDept[i] && obj.UserAction === "Page Visited" );					    	
            });
            var filteredReadData = arrActivity.filter(function(obj) {						
                return (obj.DepartmentId.Title == uniqueDept[i] && obj.UserAction === "Content Read" );					    	
            });
            var filteredEditData = arrActivity.filter(function(obj) {						
                return (obj.DepartmentId.Title == uniqueDept[i] && obj.UserAction === "Content Edit" );					    	
            });
            var filteredMessageData = arrActivity.filter(function(obj) {						
                return (obj.DepartmentId.Title == uniqueDept[i] && obj.UserAction === "Message" );					    	
            });
            var filteredPageUserAction= filteredPageData.length > 0 ? filteredPageData[0].UserAction = filteredPageData[0].UserAction : 'Page Visited';
            var filteredReadUserAction= filteredReadData.length > 0 ? filteredReadData[0].UserAction = filteredReadData[0].UserAction : 'Content Read';
            var filteredEditUserAction= filteredEditData.length > 0 ? filteredEditData[0].UserAction = filteredEditData[0].UserAction : 'Content Edit';
            var filteredMessageUserAction= filteredMessageData.length > 0 ? filteredMessageData[0].UserAction = filteredMessageData[0].UserAction : 'Message';
			
            DeptDetails += '<tr class="text-left"><td class="text-left">'+uniqueDept[i]+'</td><td class="text-left"><a href="#" data-toggle="modal" data-target="#Department-wise-activities-modal" onclick="getpopDeptDetails(\''+uniqueDept[i]+'\', \''+filteredPageUserAction+'\')">'+filteredPageData.length+'</a></td><td><a href="#" data-toggle="modal" data-target="#Department-wise-activities-modal" onclick="getpopDeptDetails(\''+uniqueDept[i]+'\', \''+filteredReadUserAction+'\')">'+filteredReadData.length +'</a></td><td><a href="#" data-toggle="modal" data-target="#Department-wise-activities-modal" onclick="getpopDeptDetails(\''+uniqueDept[i]+'\', \''+filteredEditUserAction+'\')">'+filteredEditData.length+'</a></td><td><a href="#" data-toggle="modal" data-target="#Department-wise-activities-modal" onclick="getpopDeptDetails(\''+uniqueDept[i]+'\', \''+filteredMessageUserAction+'\')">'+filteredMessageData.length+'</a></td></tr>';
}catch(e){}

        }
    }
    $('#tbDeptwiseCount').append(DeptDetails);
}

// To get pop Dept details
function getpopDeptDetails(DptName, Action){
    var Deatils = '';

    $('#tbdyDepyDetails').html('');
    $('#fDate').text(moment(StDate).format('DD MMM YYYY'));	
    $('#eDate').text(moment(EnDate).format('DD MMM YYYY'));
    $('#txtDeptTitle').text('Department : '+ DptName +', Activity : '+ Action);
    $('#ViewedDuration').text('Duration : '+moment(StDate).format('DD-MMM-YYYY')+' to '+ moment(EnDate).format('DD-MMM-YYYY'));
    var DataResult = [];
    var filteredData = arrActivity.filter(function(obj) {						
        return (obj.DepartmentId.Title === DptName && obj.UserAction === Action);					    	
    });		
    DataResult = filteredData ;
    for(i=0;i<DataResult.length;i++){
        Deatils += '<tr class="text-left"><td class="text-left"><div class="analytical-user-image-box"><div class="analytical-user-image-text"><p class="mb0">'+DataResult[i].UserID.Title+'</p><p class="mb0">'+DataResult[i].Designation+', '+DataResult[i].DepartmentId.Title+'</p></div></div></td><td>'+DataResult[i].WebpartName+'</td><td class="text-left">'+moment(DataResult[i].Modified).format('DD-MMM-YYYY HH:mm')+'</td><td>'+DataResult[i].Application+'</td></tr>';
    }
    $('#tbdyDepyDetails').append(Deatils);
}


function getUser(id) {
    var dfd = $.Deferred()
    var Email = '';
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/GetUserById(' + id + ')',
        type: 'GET',
        async: false,
        headers: {
            'Accept': 'application/json;odata=verbose'
        },
        success: function(data) {
            var dataResults = data.d;
            Email = dataResults.Email;            
            dfd.resolve(dataResults.Email);
        },error: function (error) {
            dfds.reject(error)
            console.log(error);
        }
    })
    return Email;
}

var InternalUserName = '';
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
                InternalUserName = data.d.Title;
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


