var projectar=[];
var Location = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
var  NextURL ='';
var today = new Date();
var CurrentDate=today.toISOString().substring(0, 10);
$(document).ready(function(){
    //getItemsWithQueryItem();
    //getProjectByGroup();    
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart);
    google.setOnLoadCallback(drawChartDepartmrnt);
    //google.setOnLoadCallback(drawChartProgram);
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChartProgram);
     sortClient()
     deshboardEvent();
     sortDepartment()
     sort_programName()
})                   
var programNameArr= new Array();
var DeptName=new Array();
var projectType;
var g_Items;                  
var totalLive=0,totalOnHold=0,totalComplete=0,totalOverView=0,totalTerminate=0;
var dliveCount=0,dCompleteCount=0,dTerminateCount=0,dOnHoldCount=0,doverDue=0
var cliveCount=0,cCompleteCount=0,cTerminateCount=0,cOnHoldCount=0,coverDue=0
var pliveCount=0,pCompleteCount=0,pTerminateCount=0,pOnHoldCount=0,poverDue=0
function getProjectByGroup(items)
{debugger
		
			//var items=projectListItemArr; 
	        g_Items=items;
			var arrClient;
			arrClient= items.reduce(function (r, a) {
		        r[a.ClientID] = r[a.ClientID] || [];
		        r[a.ClientID].push(a);
		        return r;
	    	}, Object.create(null));
	    	
	    	projectType= items.reduce(function (r, a) {
		        r[a.TechnologyUsed] = r[a.TechnologyUsed] || [];
		        r[a.TechnologyUsed].push(a);
		        return r;
	    	}, Object.create(null));
	    	//console.log(projectType);
	    	var arrDepartment;
			arrDepartment= items.reduce(function (r, a) {
		        r[a.Department_ID] = r[a.Department_ID] || [];
		        r[a.Department_ID].push(a);
		        return r;
	    	}, Object.create(null));
	    	var arrProgram;
			arrProgram= items.reduce(function (r, a) {
		        r[a.ProgramID] = r[a.ProgramID] || [];
		        r[a.ProgramID].push(a);
		        return r;
	    	}, Object.create(null));					
			var htmlClient='';
			var htmlDepartmet='';
			var htmlProgram='';			
			var client;
		    if(items.length>0){
		    
		    /*arrClient=arrClient.sort(function (a,b){		    
		    var aClient = a.ClientName.toLowerCase();
            var bClient = b.ClientName.toLowerCase();
            return ((aClient < bClient ) ? -1 : ((aClient > bClient ) ? 1 : 0));
		    
		    });*/
		    
		      for(var obj in arrClient){
		           client = items.filter(function (e) {
					    return e.ClientID==obj;
				 });
				 var liveCount=0,CompleteCount=0,TerminateCount=0,OnHoldCount=0,overDue=0;
				 var TotlaCount=client.length;
				 var ClientName;
				 for(var j=0; j<client.length;j++){
				    var status=client[j].Status;
				    var PlanedEndDate=client[j].PlanedEndDate1.substring(0,10);
				    var ClientID=client[j].ClientID;
				    PlanedEndDate=new Date(PlanedEndDate)
				    const d=PlanedEndDate.format('yyyy/MM/dd');
				    
				    //const d = new Date(PlanedEndDate);
				    var today = new Date();
				    today.setDate(today.getDate()-1);
				    var Currdate=new Date(today)
				    const c=Currdate.format('yyyy/MM/dd')
				    //const c=new Date(Currdate);
				    
				    ClientName=client[j].ClientName
				    if(status=='Live')
				     {
				       if(d>=c){				        
				        liveCount++;
				        cliveCount++;
				       }
				       else{
				        overDue++;
				        coverDue++;
				        
				       }
				     }
				     else if(status=='Completed')
				     {
				       CompleteCount++;
				       cCompleteCount++;
				     }
				     else if(status=='Terminated')
				     {
				       TerminateCount++;
				       cTerminateCount++;
				     }
				     else if(status=='OnHold')
				     {
				       OnHoldCount++;
				       cOnHoldCount++;
				     }
				     
				     
				     				   
				 }
				 
		         htmlClient+='<tr><td>'+ClientName+'</td><td onclick="commonFilter('+ClientID+',\'overDue\',2)" class="clickable">'+overDue+'</td><td onclick="commonFilter('+ClientID+',\'Live\',2)" class="clickable">'+liveCount+'</td><td onclick="commonFilter('+ClientID+',\'Completed\',2)" class="clickable">'+CompleteCount+'</td><td onclick="commonFilter('+ClientID+',\'OnHold\',2)" class="clickable">'+OnHoldCount+'</td><td onclick="commonFilter('+ClientID+',\'Terminated\',2)" class="clickable">'+TerminateCount+'</td><td onclick="commonFilter('+ClientID+',\'All\',2)" class="clickable">'+TotlaCount+'</td></tr>' 
		         totalLive+=liveCount;
		         totalOverView+=overDue
		         totalTerminate+=TerminateCount;
		         totalOnHold+=OnHoldCount;
		         totalComplete+=CompleteCount;		         
		       
		       }
		       var deptCheck='';
		       for(var obj in arrDepartment){
		           department= items.filter(function (e) {
					    return e.Department_ID==obj;
				 });
				 var liveCount=0,CompleteCount=0,TerminateCount=0,OnHoldCount=0,overDue=0;
				 var TotlaCount=department.length;
				 var DepartmetName;
				 for(var j=0; j<department.length;j++){
				    var status=department[j].Status;
				    var PlanedEndDate=department[j].PlanedEndDate1;
				    PlanedEndDate=PlanedEndDate.substring(0, 10);				    
				    const d = new Date(PlanedEndDate);
				    var DepartmentId=department[j].Department_ID;
				    const c=new Date(CurrentDate);
				    DepartmetName=department[j].DepartmentName
				    if(DepartmetName!=deptCheck){
				     DeptName.push({
				       DepartmetName:DepartmetName,
				       TotelCount:TotlaCount
				     })
				     deptCheck=DepartmetName;
				    }
				    
				    if(status=='Live')
				     {
				       if(d>c){				        
				        liveCount++;
				        dliveCount++;
				       }
				       else{
				        overDue++;
				        doverDue++;
				        
				       }
				     }

				     else if(status=='Completed')
				     {
				       CompleteCount++;
				       dCompleteCount++;
				     }
				     else if(status=='Terminated')
				     {
				       TerminateCount++;
				       dTerminateCount++;
				     }
				     else if(status=='OnHold')
				     {
				       OnHoldCount++;
				       dOnHoldCount++;
				     }
				     
				     
				     				   
				 }
				 if(TotlaCount!=0){
		          htmlDepartmet+='<tr><td>'+DepartmetName+'</td><td onclick="commonFilter('+DepartmentId+',\'overDue\',3)" class="clickable">'+overDue+'</td><td onclick="commonFilter('+DepartmentId+',\'Live\',3)" class="clickable">'+liveCount+'</td><td onclick="commonFilter('+DepartmentId+',\'Completed\',3)" class="clickable">'+CompleteCount+'</td><td onclick="commonFilter('+DepartmentId+',\'OnHold\',3)" class="clickable">'+OnHoldCount+'</td><td onclick="commonFilter('+DepartmentId+',\'Terminated\',3)" class="clickable">'+TerminateCount+'</td><td onclick="commonFilter('+DepartmentId+',\'All\',3)" class="clickable">'+TotlaCount+'</td></tr>' 
		         }
		         /*totalLive+=liveCount;
		         totalOverView+=overDue
		         totalTerminate+=TerminateCount;
		         totalOnHold+=OnHoldCount;
		         totalComplete+=CompleteCount;	*/	       
		       }
		       
		       for(var obj in arrProgram){
		           Program= items.filter(function (e) {
					    return e.ProgramID==obj;
				 });
				 var liveCount=0,CompleteCount=0,TerminateCount=0,OnHoldCount=0,overDue=0;
				 
				 var TotlaCount=Program.length;
				 var ProgramName;
				 var proCheck=0;
				 for(var j=0; j<Program.length;j++){
				    var status=Program[j].Status;
				    var ProgramID=Program[j].ProgramID;
				    var PlanedEndDate=Program[j].PlanedEndDate1;
				    PlanedEndDate=PlanedEndDate.substring(0, 10);
				    const d = new Date(PlanedEndDate);
				    const c=new Date(CurrentDate);
				    ProgramName=Program[j].ProgramName
				    if(ProgramName!=''){	    
				    
				    if(status=='Live')
				     {
				       if(d>c){				        
				        liveCount++;
				        pliveCount++;

				       }
				       else{
				        overDue++;
				        poverDue++;
				        
				       }
				     }

				     else if(status=='Completed')
				     {
				       CompleteCount++;
				       pCompleteCount++;
				     }
				     else if(status=='Terminated')
				     {
				       TerminateCount++;
				       pTerminateCount++;
				     }
				     else if(status=='OnHold')
				     {
				       OnHoldCount++;
				       pOnHoldCount++;
				     }			     
				     
				     
				      if(ProgramName==''){
				        ProgramName='Other'		         
				     
				     }
				   }
				     				   
				 }
				 if(TotlaCount!=0 && ProgramName!=''){
				 if(ProgramName.length>10){
				  //ProgramName=ProgramName.substring(0, 10)+'..'
				 }
				 programNameArr.push({
				       ProgramName:ProgramName,
				       TotelCount:TotlaCount,
				       OnHoldCount:OnHoldCount,
				       TerminateCount:TerminateCount,
				       CompleteCount:CompleteCount,
				       overDue :overDue,
				       liveCount:liveCount
				     })
				     //="['"+ProgramName+"','"+TotlaCount+"'],";
				     //proCheck=ProgramName;
				    
		          htmlProgram+='<tr><td>'+ProgramName+'</td><td onclick="commonFilter('+ProgramID+',\'overDue\',1)" class="clickable">'+overDue+'</td><td onclick="commonFilter('+ProgramID+',\'Live\',1)" class="clickable">'+liveCount+'</td><td onclick="commonFilter('+ProgramID+',\'Completed\',1)" class="clickable">'+CompleteCount+'</td><td onclick="commonFilter('+ProgramID+',\'OnHold\',1)" class="clickable">'+OnHoldCount+'</td><td onclick="commonFilter('+ProgramID+',\'Terminated\',1)" class="clickable">'+TerminateCount+'</td><td onclick="commonFilter('+ProgramID+',\'All\',1)" class="clickable">'+TotlaCount+'</td></tr>' 
		         }
		         
		         /*totalLive+=liveCount;
		         totalOverView+=overDue
		         totalTerminate+=TerminateCount;
		         totalOnHold+=OnHoldCount;
		         totalComplete+=CompleteCount;	*/	       
		       }
		       var htmlTotalCount='';
		       htmlTotalCount+='<tr><td style="width:20%"><h3>Overdue</h3><div class="overduecount clickable" onclick="commonFilter(0,\'overDue\',0)">'+totalOverView+'</div></td><td onclick="commonFilter(0,\'Live\',0)" style="width:20%"><h3>Live</h3><div class="livecount clickable">'+totalLive+'</div></td>'
			   htmlTotalCount+='<td onclick="commonFilter(0,\'Completed\',0)" style="width:20%"><h3>Completed</h3><div class="completedcount clickable">'+totalComplete+'</div></td>'
			   htmlTotalCount+='<td onclick="commonFilter(0,\'OnHold\',0)" style="width:20%"><h3>On-Hold</h3><div class="onholdcount clickable">'+totalOnHold+'</div></td>'
			   htmlTotalCount+='<td onclick="commonFilter(0,\'Terminated\',0)" style="width:20%"><h3>Terminated</h3><div class="terminatedcount clickable">'+totalTerminate+'</div></td></tr>'
			//var htmlTotalCount='<tr><td>'+totalLive+'</td><td>'+totalOverView+'</td><td>'+totalTerminate+'</td><td>'+totalOnHold+'</td><td>'+totalComplete+'</td></tr>'	
				
			}
	
			else
			{
				htmlClient+= '<tr><td>No records founds !</td></tr>';
					//$('#tblPrograms tbody').empty();
					//$('#tblPrograms tbody').append(htmlProgram);
			}
			$('#tblClientGroup tbody').append(htmlClient)
			$('#tblDepartmentGroup tbody').append(htmlDepartmet)
			$('#tblProgramGroup tbody').append(htmlProgram)
			$('#tblTotalCount').append(htmlTotalCount) ;
			console.log(programNameArr);
			if(programNameArr.length<10){
			  showTotal=programNameArr.length;
			}
	
		 	

	
}




function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Projects', 'Percentage'],
          ['Overdue', totalOverView],
          ['Live', totalLive],
          ['Completed',  totalComplete],
          ['Terminated', totalTerminate],
          ['On-Hold', totalOnHold]
          
        ]);
        
     
        var options = {
          //title: 'My Daily Activities',
          //tooltip: { trigger: 'none' },
          pieHole: 0.3,
          //is3D: true,
          slices: {0: {color: '#ff0000'}, 1:{color: '#088bd7'}, 2:{color: '#039b03'}, 3: {color: 'orange'}, 4:{color: 'grey'}}
        };

        var chart1 = new google.visualization.PieChart(document.getElementById('pieChartClient'));
       // var chart2 = new google.visualization.PieChart(document.getElementById('pieChartDepartment'));
        //var chart3 = new google.visualization.PieChart(document.getElementById('pieChartProgram'));
        chart1.draw(data, options);
        
        
       
        //chart2.draw(data, options);
        //chart3.draw(data, options);
}

function drawChartDepartmrnt() {


       var arrValues = [['Projects', 'Percentage']]; 
       var iCnt = 0;
       var arr;
       for(var obj in projectType){
		           arr= g_Items.filter(function (e) {
					    return e.TechnologyUsed==obj;
				 });
	   if(obj==0)obj='Other';
       var Name=obj;
       var Total=arr.length;                                 
       arrValues.push([Name,Total]);
                    
                    
                    
        }
        var data = google.visualization.arrayToDataTable(arrValues);
          /*['Projects', 'Percentage'],
          ['Overdue', doverDue],
          ['Live', dliveCount],
          ['Completed',  dCompleteCount],
          ['Terminated', dTerminateCount],
          ['On-Hold', dOnHoldCount]
          
        ]);*/

        var options = {
          //title: 'My Daily Activities',
          //width:400,
          //tooltip: { trigger: 'none' },
          //pieHole: 0.3
          //height:300
          //is3D: true,
          //slices: {0: {color: '#ff0000'}, 1:{color: '#088bd7'}, 2:{color: '#039b03'}, 3: {color: '#dc3912'}, 4:{color: 'grey'}}
        };

        //var chart1 = new google.visualization.PieChart(document.getElementById('pieChartClient'));
        var chart2 = new google.visualization.PieChart(document.getElementById('pieChartDepartment'));
        //var chart3 = new google.visualization.PieChart(document.getElementById('pieChartProgram'));
        //chart1.draw(data, options);
        chart2.draw(data, options);
        //chart3.draw(data, options);
        
        
        $(function(){
		if (window.matchMedia('(min-width: 1360px)').matches){
		$('svg').removeAttr('viewBox');
		$('svg').each(function () { $(this)[0].setAttribute('viewBox', '99 10 180 180')});
		}
	 });
}
var count=0;
var showTotal=10;
function drawChartProgram() {       
      var arrValues = [['Program', 'Live', 'Completed','Overdue','Terminated', 'On-hold', { role: 'annotation' } ]]; 
       var iCnt = 0;
        programNameArr.sort(function(a, b) {
	      var keyA = a.ProgramName,
		  keyB = b.ProgramName;
				  // Compare the 2 dates
		  if (keyA < keyB) return -1;
	      if (keyA > keyB) return 1;
		    return 0;
		});
      if(showTotal!=0){
       for(var i=count;i<showTotal; i++) {
                    // POPULATE ARRAY WITH THE EXTRACTED DATA.
                    arrValues.push([programNameArr[i].ProgramName,programNameArr[i].liveCount,programNameArr[i].CompleteCount,programNameArr[i].overDue,programNameArr[i].TerminateCount,programNameArr[i].OnHoldCount,'']);
                    iCnt += 1;
                };
       }
       else{           
            arrValues.push(['No data',0,0,0,0,0,'']);

       }
                
      var data = google.visualization.arrayToDataTable(arrValues);       

      var options = {
        //width: 900,
        //height: 250,
         width: '100%',
         height: '100%',
         /*chartArea: {
            width: '80%',
            height: '80%',
          },*/
          
          //backgroundColor: 'transparent',
          titleTextStyle: {
             //color: 'black'
           },
        //legend: { position: 'top' ,maxLines: 2 },
        bar: { groupWidth: '75%' },
        legend: 'none',
        bars: 'vertical',
        axes: {
            x: {
              0: { side: 'top', label: 'Percentage'} // Top x-axis.
            }
          },
        //color: '#ff0000'}, 1:{color: '#088bd7'}, 2:{color: '#039b03'}, 3: {color: '#dc3912'}, 4:{color: 'grey'}
        colors: ['#088bd7', '#039b03','#ff0000','orange','grey'],
        isStacked: true,
        /*annotations: {
	    textStyle: {
	      //fontName: 'Times-Roman',
	      fontSize: 5
	      //bold: true,
	      //italic: true,
	      // The color of the text.
	      //color: '#871b47',
	      // The color of the text outline.
	      //auraColor: '#d799ae',
	      // The transparency of the text.
	      //opacity: 0.8
	    }
  },*/
        
        showRowNumber: true,
                page: 'enable',
                pageSize: 10 ,
                pagingSymbols: {
                    prev: 'prev',
                    next: 'next'
                },
                pagingButtonsConfiguration: 'auto'
        
      };

        
        var chart = new google.visualization.ColumnChart(document.getElementById("pieChartProgram"));
        chart.draw(data, options);
        
        if(programNameArr.length>10){
           if(showTotal<programNameArr.length){
             $('#nextside').show();            
            }
            else{
               $('#nextside').hide();
               
            }        
          
        }        
        if(count==0){           
          $('#prevside').hide();            
         }
        else{
           $('#prevside').show();
        }
        
           
           $("#overlaysearch").fadeOut();
           
           
          
          
 }


function deshboardEvent(){
 
    $('#nextside').click(function(){
      if(showTotal>=10){       
        showTotal=(showTotal+10);
        count=(count+10);
        if(programNameArr.length<showTotal){
            showTotal=programNameArr.length;
        }
        
        //alert(showTotal +' ' +count);
        $('#pieChartProgram').empty();
        //google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChartProgram);

      }
      
    });
    
    $('#prevside').click(function(){
      if(showTotal==programNameArr.length){
       showTotal=(count+10);
      }
    
      if(showTotal>10){
        showTotal=(showTotal-10);
        count=(count-10);
        
        //alert(showTotal +' ' +count);
        $('#pieChartProgram').empty();
        //google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChartProgram);

      }
      
    })


}    


function sortClient()
{
 var table=$('#tblClientGroup');
 var tbody =$('#tbodyClient');

 tbody.find('tr').sort(function(a, b) 
 {
  if($('#ClientOrder').val()=='asc') 
  {
   return $('td:first', a).text().localeCompare($('td:first', b).text());
  }
  else 
  {
   return $('td:first', b).text().localeCompare($('td:first', a).text());
  }
		
 }).appendTo(tbody);
	
 var sort_order=$('#ClientOrder').val();
 if(sort_order=="asc")
 {
  document.getElementById("ClientOrder").value="desc";
 }
 if(sort_order=="desc")
 {
  document.getElementById("ClientOrder").value="asc";
 }
}


function sortDepartment()
{
 var table=$('#tblDepartmentGroup');
 var tbody =$('#tbodyDepartment');

 tbody.find('tr').sort(function(a, b) 
 {
  if($('#Departmentorder').val()=='asc') 
  {
   return $('td:first', a).text().localeCompare($('td:first', b).text());
  }
  else 
  {
   return $('td:first', b).text().localeCompare($('td:first', a).text());
  }
		
 }).appendTo(tbody);
	
 var sort_order=$('#Departmentorder').val();
 if(sort_order=="asc")
 {
  document.getElementById("Departmentorder").value="desc";
 }
 if(sort_order=="desc")
 {
  document.getElementById("Departmentorder").value="asc";
 }
}
       
       
       
function sort_programName()
{
 var table=$('#tblProgramGroup');
 var tbody =$('#tbodyProgram');

 tbody.find('tr').sort(function(a, b) 
 {
  if($('#ProgramOrder').val()=='asc') 
  {
   return $('td:first', a).text().localeCompare($('td:first', b).text());
  }
  else 
  {
   return $('td:first', b).text().localeCompare($('td:first', a).text());
  }
		
 }).appendTo(tbody);
	
 var sort_order=$('#ProgramOrder').val();
 if(sort_order=="asc")
 {
  document.getElementById("ProgramOrder").value="desc";
 }
 if(sort_order=="desc")
 {
  document.getElementById("ProgramOrder").value="asc";
 }
}



var direction = "ascending";
function sortTable(table,n) {                
     var table='#'+table;
     var records=$(table).find('tr');
     records.sort(function (a,b){
	     var x=$(a).children('td').eq(n).text();
	     var y=$(b).children('td').eq(n).text();
	     x*=1;
	     y*=1;
	     if(direction=='ascending'){                 
	         return (x < y)? -1: (x > y ? 1 : 0)
	     }                
	     else{return (x < y)? 1: (x > y ? -1 : 0)}           
    });
                
    $.each(records,function (index,row){
        $(table).append(row);             
    })                
    if(direction=='ascending'){
      direction ='descending';
    }
    else{
       direction ='ascending';
     }
                
}

function commonFilter(itemsId,status,check){
  var overDue=status;
  if(status=='overDue'){
   status='Live';
  }
  var items='';
  var records;
  $('#programlisting').modal('show');
  if(status=='All' && check==1){
    records= g_Items.filter(function (e) { 
		   return  (e.ProgramID == parseInt(itemsId))   
   });
  }
  else if(status=='All' && check==2){
    records= g_Items.filter(function (e) { 
		   return  (e.ClientID== parseInt(itemsId))   
   });
  }
 else if(status=='All' && check==3){
    records= g_Items.filter(function (e) { 
		   return  (e.Department_ID== parseInt(itemsId))   
   });
  }
   else if(status!='All' && check==1)
    records= g_Items.filter(function (e) { 
		   return  (e.ProgramID == parseInt(itemsId) && e.Status ==status)   
	});
   else if(status!='All' && check==2)
     records= g_Items.filter(function (e) { 
		   return  (e.ClientID== parseInt(itemsId) && e.Status ==status)   
	});
	else if(status!='All' && check==3)
     records= g_Items.filter(function (e) { 
		   return  (e.Department_ID== parseInt(itemsId) && e.Status ==status)   
	});
	else if(itemsId==0 && check==0)
     records= g_Items.filter(function (e) { 
		   return  (e.Status ==status)   
	});
	
	
if(records.length>0){
  for(var i=0;i<records.length;i++){
    var ProjectName=records[i].ProjectName;
    var ProjectCode=records[i].ProjectCode;
    var ProgramName=records[i].ProgramName;
    var ManagerName=records[i].ManagerName;
    var PStatus=records[i].Status;
    var ItemID=records[i].ItemID;
    var ManagerEmail=records[i].ManagerEMail;
    var managerPhoto=records[i].employeePicURL;
    var Percentage=records[i].Percentage;    
    var PlanedEndDate1=records[i].PlanedEndDate1;
    var PlanedEndDate =records[i].PlanedEndDate;
     if(overDue=='overDue'){
        if(records[i].PlanedEndDate1.substring(0, 10)<CurrentDate){
           items+="<tr><td><a href='" + Location + "/Pages/ViewProjectDetails.aspx?WebAppId=" + Logged_CompanyId+ "&ProjectID=" +ItemID + "&ProjectName=" +ProjectName+ "'>"+ProjectName+"</a>"
           items+='<div class="d-flex mt5"><label class="lable-view-name">Reference:</label><div>'+ProjectCode+'</div></div>'
           items+='<div class="d-flex mt5"><label class="lable-view-name">Program:</label><div>'+ProgramName+'</div></div></td>'
                items+='<td><div class="project-manager-card"><div class="project-manager-card-head"><img src="'+managerPhoto+'"></div>'
                    items+='<div class="project-manager-card-body">'
                     items+=' <div class="project-manager-card-body-info text-ellipsis">'
                       items+=' <h3 class="member-name text-ellipsis">'+ManagerName+'</h3>'
                      items+='</div>'
                      items+='<p class="member-email text-ellipsis">'+ManagerEmail+'</p></div></div></td>'
                      if(status=='Live'){
	                     items+=' <td><p class="m-0 mb-10 color-blue">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12" style="color:#ff0000 !important">Due :<span style="margin-left: 5px;"> '+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-info m-0 mt-4">'
	                     if(Percentage>=100){
	                      items+='  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%">'
	                      }
	                      else{
	                        if(Percentage<100 && records[i].PlanedEndDate1.substring(0, 10)>CurrentDate){
						       items+='<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%">'			
						     }
						     else{
						       items+='<div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%; background:#ff0000 !important">'			
						     }
	                      }
	                      
                      }
                      else if(status=='Completed'){
	                     items+=' <td><p class="m-0 mb-10 color-green">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-success m-0 mt-4">'
	                     items+='  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%;">'
                      }
                      else if(status=='OnHold'){
	                     items+=' <td><p class="m-0 mb-10" style="color:#000000ab">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-warning m-0 mt-4">'
	                     items+='  <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%; background:#000000ab">'
                      }
                      else if(status=='Terminated'){
	                     items+=' <td><p class="m-0 mb-10" style="color:#ff0000">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-danger m-0 mt-4">'
	                     items+='  <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%; background:#ff0000 !important">'
                      }
                     items+='  </div></div></td></tr>'
     
      }
     
     }
     else{
          if(status=='Live' && records[i].PlanedEndDate1.substring(0, 10)>CurrentDate){ 
          items+="<tr><td><a href='" + Location + "/Pages/ViewProjectDetails.aspx?WebAppId=" + Logged_CompanyId+ "&ProjectID=" +ItemID + "&ProjectName=" +ProjectName+ "'>"+ProjectName+"</a>"
          items+='<div class="d-flex mt5"><label class="lable-view-name">Reference:</label><div>'+ProjectCode+'</div></div>'
          items+='<div class="d-flex mt5"><label class="lable-view-name">Program:</label><div>'+ProgramName+'</div></div></td>'
                items+='<td><div class="project-manager-card"><div class="project-manager-card-head"><img src="'+managerPhoto+'"></div>'
                    items+='<div class="project-manager-card-body">'
                     items+=' <div class="project-manager-card-body-info text-ellipsis">'
                       items+=' <h3 class="member-name text-ellipsis">'+ManagerName+'</h3>'
                      items+='</div>'
                      items+='<p class="member-email text-ellipsis">'+ManagerEmail+'</p></div></div></td>'
                      if(PStatus=='Live'){
	                     items+=' <td><p class="m-0 mb-10 color-blue">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-info m-0 mt-4">'
	                     if(Percentage>=100){
	                      items+='  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%">'
	                      }
	                      else{
	                        if(Percentage<100 && records[i].PlanedEndDate1.substring(0, 10)>CurrentDate){
						       items+='<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%">'			
						     }
						     else{
						       items+='<div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%; background:#ff0000 !important">'			
						     }
	                      }
	                      
                      }
                      else if(PStatus=='Completed'){
	                     items+=' <td><p class="m-0 mb-10 color-green">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-success m-0 mt-4">'
	                     items+='  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%;">'
                      }
                      else if(PStatus=='OnHold'){
	                     items+=' <td><p class="m-0 mb-10" style="color:#000000ab">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-warning m-0 mt-4">'
	                     items+='  <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%; background:#000000ab">'
                      }
                      else if(PStatus=='Terminated'){
	                     items+=' <td><p class="m-0 mb-10" style="color:#ff0000">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-danger m-0 mt-4">'
	                     items+='  <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%; background:#ff0000 !important">'
                      }
                     items+='  </div></div></td></tr>'
                  }
            if(status!='Live'){ 
               items+="<tr><td><a href='" + Location + "/Pages/ViewProjectDetails.aspx?WebAppId=" + Logged_CompanyId+ "&ProjectID=" +ItemID + "&ProjectName=" +ProjectName+ "'>"+ProjectName+"</a>"
                items+='<div class="d-flex mt5"><label class="lable-view-name">Reference:</label><div>'+ProjectCode+'</div></div>'
                items+='<div class="d-flex mt5"><label class="lable-view-name">Program:</label><div>'+ProgramName+'</div></div></td>'
                items+='<td><div class="project-manager-card"><div class="project-manager-card-head"><img src="'+managerPhoto+'"></div>'
                    items+='<div class="project-manager-card-body">'
                     items+=' <div class="project-manager-card-body-info text-ellipsis">'
                       items+=' <h3 class="member-name text-ellipsis">'+ManagerName+'</h3>'
                      items+='</div>'
                      items+='<p class="member-email text-ellipsis">'+ManagerEmail+'</p></div></div></td>'
                      if(PStatus=='Live'){
	                     items+=' <td><p class="m-0 mb-10 color-blue">'+PStatus+'</p>'
	                     if(records[i].PlanedEndDate1.substring(0, 10)<CurrentDate){
		                     items+=' <p class="m-0 font-12" style="color:#ff0000 !important">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
		                     items+=' <div class="progress custom-progress progress-info m-0 mt-4">'
	                     }
	                     else{
	                        items+=' <p class="m-0 font-12">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
		                     items+=' <div class="progress custom-progress progress-info m-0 mt-4">'
	                     }
	                     if(Percentage>=100){
	                      items+='  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%">'
	                      }
	                      else{
	                        if(Percentage<100 && records[i].PlanedEndDate1.substring(0, 10)>CurrentDate){
						       items+='<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%">'			
						     }
						     else{
						       items+='<div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%; background:#ff0000 !important">'			
						     }
	                      }
	                      
                      }
                      else if(PStatus=='Completed'){
	                     items+=' <td><p class="m-0 mb-10 color-green">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-success m-0 mt-4">'
	                     items+='  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%;">'
                      }
                      else if(PStatus=='OnHold'){
	                     items+=' <td><p class="m-0 mb-10" style="color:#000000ab">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span  style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-warning m-0 mt-4">'
	                     items+='  <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%; background:#000000ab">'
                      }
                      else if(PStatus=='Terminated'){
	                     items+=' <td><p class="m-0 mb-10" style="color:#ff0000">'+PStatus+'</p>'
	                     items+=' <p class="m-0 font-12">Due :<span  style="margin-left: 5px;">'+PlanedEndDate +'</span></p>'
	                     items+=' <div class="progress custom-progress progress-danger m-0 mt-4">'
	                     items+='  <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+Percentage+'%; background:#ff0000 !important">'
                      }
                      items+='  </div></div></td></tr>'
                }   
                  
   
       }
    }
  }
  else{
  items+='<tr><td>No records found</td></tr>'
  }
  $('#commonTbody').empty();
  $('#commonTbody').append(items);




}             
             