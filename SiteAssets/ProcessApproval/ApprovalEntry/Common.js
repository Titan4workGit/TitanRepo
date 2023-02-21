$(document).ready(function () {   
	jQuery.datepicker._gotoToday = function(id) {
	    var today = new Date();
	    var dateRef = jQuery("<td><a>" + today.getDate() + "</a></td>");
	    this._selectDay(id, today.getMonth(), today.getFullYear(), dateRef);
	};	
	
})

function Displayformattingtools() {
    if ($("#DisplayfTools").prop('checked') == true) {
        $('a[title="Remove styles"]').show();
        $('.richText-toolbar').show();
    }
    else {
        $('a[title="Add image"]').hide();
        $('a[title="Add file"]').hide();
        $('a[title="Add video"]').hide();
        $('a[title="Add URL"]').hide();
        $('a[title="Add table"]').hide();
        $('a[title="Show HTML code"]').hide();
        $('a[title="Remove styles"]').hide();
        $('.richText-help').hide();
        $('.richText-toolbar').hide();
    }
}
function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1'>$1</a>"); 
}
var personCols = [], multiDdp = [], AttachDraftCol = '';
function SetDatpickerNdropDown(resultColumns, format, tableId, elem,QueryDataRetResult,tblEdit){
	multiDdp =[];
	if(resultColumns.length > 0){
	for(i=0;i<resultColumns.length;i++){	
		if(resultColumns[i].ColumnType == 'Date' || resultColumns[i].ColumnType == 'DueDate'){
			if(resultColumns[i].DateValidation != null && resultColumns[i].DateValidation != undefined && resultColumns[i].DateValidation != ""){      
				if(resultColumns[i].ColumnType == 'DueDate' && resultColumns[i].DefaultValue != "" && resultColumns[i].DefaultValue != undefined && resultColumns[i].DefaultValue != null){
	                 if(format == ''){
		             var dateId = resultColumns[i].ColumnName;   
		            }else{
		             var currRowid = $(elem).closest("tr").attr("id");
		             var dateId = format+'_'+currRowid+'_'+resultColumns[i].ColumnName; 		             
		             var CurrElem = elem.find(dateId); //$('#'+currRowid).closest("tr").find(dateId); 
		             dateId = CurrElem.selector;
		             $(dateId).datepicker("destroy");
		             $(dateId).removeClass('hasDatepicker');
		            }
		            dateval = $("#"+dateId).val();
		            var newdateset = $("#"+dateId).datepicker({
						showButtonPanel: true,
						dateFormat: 'MM dd, yy',
						closeText: 'Clear',
						minDate: "+"+resultColumns[i].DefaultValue,					
						onSelect: function (date) {
							//Get selected date 
							 var date2 = $("#"+dateId ).datepicker('getDate');
							 //sets minDate to txt_date_to
						  // $("#"+resultColumns[i].ColumnName).datepicker('option', 'maxDate', date);
						 },
						onClose: function (dateText, inst) {
							if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
								document.getElementById(this.id).value = '';
							}
						}
					});
					if((resultColumns[i].DefaultValue == null || resultColumns[i].DefaultValue =='') &&  (dateval == '' || dateval == undefined)) {
						$("#"+dateId).val('');
					}else{
						if(dateval != '' ){
							$("#"+dateId).val(moment(dateval).format('LL'))
						}else{
							var iNum = parseInt(resultColumns[i].DefaultValue);
							iNum = iNum ? iNum : '';
							const today = new Date()
							const newDate = new Date(today)
							newDate.setDate(newDate.getDate() + iNum);console.log(newDate);
							$("#"+dateId).val(moment(newDate).format('LL'))
						}
					}

			/*		var iNum = parseInt(resultColumns[i].DefaultValue);
					iNum = iNum ? iNum : '';
					Date.prototype.addDays = function(days) {
					var date = new Date(this.valueOf());
					date.setDate(date.getDate() + days);
					return date;
					}			
					var date = new Date();	
					var nd = date.addDays(iNum);
					var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
					var newdateape = nd.getDate() + "-"+ month[nd.getMonth()] +"-"+nd.getFullYear();			
					$("#"+resultColumns[i].ColumnName).val(moment(newdateape).format('LL'));
					AutoFilledCols.push({'ColName' : resultColumns[i].ColumnName , 'ColValue' : newdateape});
						*/
				}else{
				if(resultColumns[i].DateValidation == "Today Only"){
					if(format == ''){
		             var dateId = resultColumns[i].ColumnName;   
		            }else{
		             var currRowid = $(elem).closest("tr").attr("id");
		             var dateId = format+'_'+currRowid+'_'+resultColumns[i].ColumnName; 		             
		             var CurrElem = elem.find(dateId); //$('#'+currRowid).closest("tr").find(dateId); 
		             dateId = CurrElem.selector;
		             $(dateId).datepicker("destroy");
		             $(dateId).removeClass('hasDatepicker');
		            }
		            $("#"+dateId).datepicker({
						showButtonPanel: true,
						dateFormat: 'MM dd, yy',
						closeText: 'Clear',
						minDate: "today",
						maxDate: "today",					
						onSelect: function (date) {
							//Get selected date 
							 var date2 = $("#"+dateId ).datepicker('getDate');
							 //sets minDate to txt_date_to
						  // $("#"+resultColumns[i].ColumnName).datepicker('option', 'maxDate', date);
						 },
						onClose: function (dateText, inst) {
							if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
								document.getElementById(this.id).value = '';
							}
						}
					});
					$("#"+dateId).val(moment(new Date()).format('LL'))
					AutoFilledCols.push({'ColName' : dateId , 'ColValue' : moment(new Date()).format('LL')});
				}
				else if(resultColumns[i].DateValidation == "Past Date"){
					if(format == ''){
		             var dateId = resultColumns[i].ColumnName;   
		            }else{
		             var currRowid = $(elem).closest("tr").attr("id");
		             var dateId = format+'_'+currRowid+'_'+resultColumns[i].ColumnName; 		             
		             var CurrElem = elem.find(dateId); //$('#'+currRowid).closest("tr").find(dateId); 
		             dateId = CurrElem.selector;
		           //  $(dateId).datepicker("destroy");
		           //  $(dateId).removeClass('hasDatepicker');
		            }
		            dateval = $("#"+dateId).val();
		            $("#"+dateId).datepicker({
						showButtonPanel: true,
						dateFormat: 'MM dd, yy',
						closeText: 'Clear',
						maxDate: "-1",				
						onSelect: function (date) {
							//Get selected date 
							 var date2 = $("#"+dateId ).datepicker('getDate');
							 //sets minDate to txt_date_to
						  // $("#"+resultColumns[i].ColumnName).datepicker('option', 'maxDate', date);
						 },
						onClose: function (dateText, inst) {
							if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
								document.getElementById(this.id).value = '';
							}
						}
					});
					if(resultColumns[i].DefaultValue == null || resultColumns[i].DefaultValue =='' ) {
					$("#"+dateId).val('');
					}else{
					var iNum = parseInt(resultColumns[i].DefaultValue);
					iNum = iNum ? iNum : '';
					const today = new Date()
					const newDate = new Date(today)
					newDate.setDate(newDate.getDate() + iNum);console.log(newDate);
					$("#"+dateId).val(moment(newDate).format('LL'))
					}
				//	AutoFilledCols.push({'ColName' : dateId , 'ColValue' : moment(new Date()).format('LL')});
				}
				else if(resultColumns[i].DateValidation == "Past Date included Today"){
					if(format == ''){
		             var dateId = resultColumns[i].ColumnName;   
		            }else{
		             var currRowid = $(elem).closest("tr").attr("id");
		             var dateId = format+'_'+currRowid+'_'+resultColumns[i].ColumnName; 		             
		             var CurrElem = elem.find(dateId); //$('#'+currRowid).closest("tr").find(dateId); 
		             dateId = CurrElem.selector;
		             $(dateId).datepicker("destroy");
		             $(dateId).removeClass('hasDatepicker');		           
		            }
		            $("#"+dateId ).datepicker({
						showButtonPanel: true,
						dateFormat: 'MM dd, yy',
						closeText: 'Clear',
						maxDate: "0",				
						onSelect: function (date) {
							//Get selected date 
							 var date2 = $("#"+dateId ).datepicker('getDate');
							 //sets minDate to txt_date_to
						  // $("#"+resultColumns[i].ColumnName).datepicker('option', 'maxDate', date);
						 },
						onClose: function (dateText, inst) {
							if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
								document.getElementById(this.id).value = '';
							}
						}
					});
					if(resultColumns[i].DefaultValue == null || resultColumns[i].DefaultValue =='' ) {
					$("#"+dateId).val('');
					}else{
					var iNum = parseInt(resultColumns[i].DefaultValue);
					iNum = iNum ? iNum : '';
					const today = new Date()
					const newDate = new Date(today)
					newDate.setDate(newDate.getDate() + iNum);console.log(newDate);
					$("#"+dateId).val(moment(newDate).format('LL'))
					}
				//	$("#"+dateId).val(moment(new Date()).format('LL'))
				}
            	else if(resultColumns[i].DateValidation == "Future Date"){	
            		if(format == ''){
		             var dateId = resultColumns[i].ColumnName;   
		            }else{
		             var currRowid = $(elem).closest("tr").attr("id");
		             var dateId = format+'_'+currRowid+'_'+resultColumns[i].ColumnName; 		             
		             var CurrElem = elem.find(dateId); //$('#'+currRowid).closest("tr").find(dateId); 
		             dateId = CurrElem.selector;
		             $(dateId).datepicker("destroy");
		             $(dateId).removeClass('hasDatepicker');
		            }			
					$("#"+dateId).datepicker({
						showButtonPanel: true,
						dateFormat: 'MM dd, yy',
						closeText: 'Clear',
						minDate: "0",				
						onSelect: function (date) {
							//Get selected date 
							 var date2 = $("#"+dateId ).datepicker('getDate');
							 //sets minDate to txt_date_to
						  // $("#"+resultColumns[i].ColumnName).datepicker('option', 'maxDate', date);
						 },
						onClose: function (dateText, inst) {
							if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
								document.getElementById(this.id).value = '';
							}
						}
					});
					if(resultColumns[i].DefaultValue == null || resultColumns[i].DefaultValue =='' ) {
					var dtval = $("#"+dateId).val()
					dtval = dtval ? dtval : '';
					$("#"+dateId).val(dtval);
					}else{
						if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Process Steps'){
							var dtval = $("#"+dateId).val()
							dtval = dtval ? dtval : '';
							$("#"+dateId).val(dtval);
						}else{
							var iNum = parseInt(resultColumns[i].DefaultValue);
							iNum = iNum ? iNum : '';
							const today = new Date()
							const newDate = new Date(today)
							newDate.setDate(newDate.getDate() + iNum);console.log(newDate);
							$("#"+dateId).val(moment(newDate).format('LL'))
					 }					
					}

				}
				else if(resultColumns[i].DateValidation == "Future Date included Today"){
					if(format == ''){
		             var dateId = resultColumns[i].ColumnName;   
		            }else{
		             var currRowid = $(elem).closest("tr").attr("id");
		             var dateId = format+'_'+currRowid+'_'+resultColumns[i].ColumnName; 		             
		             var CurrElem = elem.find(dateId); //$('#'+currRowid).closest("tr").find(dateId); 		      
		             dateId =  CurrElem.selector;
		             $(dateId).removeClass('hasDatepicker');
		            }
		            $("#"+dateId).datepicker({
						showButtonPanel: true,
						dateFormat: 'MM dd, yy',
						closeText: 'Clear',
						minDate: "0",				
						onSelect: function (date) {
							//Get selected date 
							 var date2 = $("#"+dateId ).datepicker('getDate');
							 //sets minDate to txt_date_to
						  // $("#"+resultColumns[i].ColumnName).datepicker('option', 'maxDate', date);
						 },
						onClose: function (dateText, inst) {
							if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
								document.getElementById(this.id).value = '';
							}
						}
					});
					if(resultColumns[i].DefaultValue == null || resultColumns[i].DefaultValue =='' ) {
					$("#"+dateId).val('');
					}else{
					var iNum = parseInt(resultColumns[i].DefaultValue);
					iNum = iNum ? iNum : '';
					const today = new Date()
					const newDate = new Date(today)
					newDate.setDate(newDate.getDate() + iNum);console.log(newDate);
					$("#"+dateId).val(moment(newDate).format('LL'))
					}
					//$("#"+dateId).val(moment(new Date()).format('LL'));
				}			
				else{
					if(format == ''){
		             var dateId = resultColumns[i].ColumnName;   
		            }else{
		             var currRowid = $(elem).closest("tr").attr("id");
		             var dateId = format+'_'+currRowid+'_'+resultColumns[i].ColumnName; 		             
		           //  var CurrElem = elem.find(dateId); //$('#'+currRowid).closest("tr").find(dateId); 
		           //  dateId = CurrElem.selector;
		             $(dateId).datepicker("destroy");
		             $(dateId).removeClass('hasDatepicker');		             
		            }	
		          	var dateval = $('#'+dateId).val();
					$("#"+dateId).datepicker({
						showButtonPanel: true,
						dateFormat: 'MM dd, yy',
						closeText: 'Clear',			
						onSelect: function (date) {							
							 var date2 = $(this).closest('tr').focus(dateId).datepicker('getDate');
							 //sets minDate to txt_date_to
						  	// $("#"+resultColumns[i].ColumnName).datepicker('option', 'maxDate', date);
						 },
						onClose: function (dateText, inst) {
							if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
								document.getElementById(this.id).value = '';
							}
						}
					}); 					
					if((resultColumns[i].DefaultValue == null || resultColumns[i].DefaultValue =='') &&  (dateval == '' || dateval == undefined)) {
						$("#"+dateId).val('');
					}else{
						if(dateval != '' ){
							$("#"+dateId).val(moment(dateval).format('LL'))
						}else{
							var iNum = parseInt(resultColumns[i].DefaultValue);
							iNum = iNum ? iNum : '';
							const today = new Date()
							const newDate = new Date(today)
							newDate.setDate(newDate.getDate() + iNum);console.log(newDate);
							$("#"+dateId).val(moment(newDate).format('LL'))
						}
					}
				 }
			  }					
			}		   
		/* $("#"+resultColumns[i].ColumnName).datepicker({
		        showButtonPanel: true,
		        dateFormat: 'dd-M-yy',
		       // closeText: 'Clear',
		      //  setDate: new Date(),
		    //	minDate: 0,		   
		        onSelect: function (date) {
		            //Get selected date 
		             var date2 = $("#"+resultColumns[i].ColumnName).datepicker('getDate');
		             //sets minDate to txt_date_to
		          // $("#"+resultColumns[i].ColumnName).datepicker('option', 'maxDate', date);
		         },
			    onClose: function (dateText, inst) {
		            if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
		                document.getElementById(this.id).value = '';
		            }
		        }
		    }).datepicker("setDate", new Date());  */
	      }else if(resultColumns[i].ColumnType == 'Person'){
	      	var status = ''; classest = '';
	      	if(format == ''){
             var ddpLabel = resultColumns[i].ColumnName;   
            }else{
            debugger;
             var currRowid = $(elem).closest("tr").attr("id");
             var tId = tableId.split('_')[1]
		     var ddpLabel = format+'_'+currRowid +'_'+resultColumns[i].ColumnName; 
		     classest += 'input-sm Cover_PPl ';		             
            // var ddpLabel = format+'_'+resultColumns[i].ColumnName;   
            }
          /*  if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){
            	status = "disabled='disabled'"; 
            }else{
            	classest += 'active';
            }*/
            
			var DivPPl = '<div '+status +' id="'+ddpLabel+'" class="dynamicvalfeachcls	'+classest+'" data-original-value = "'+resultColumns[i].ColumnName+'" coltype ="'+resultColumns[i].ColumnType+'"></div>';
			$('#'+ddpLabel).replaceWith(DivPPl);
			initializePeoplePicker(ddpLabel);
			personCols.push(ddpLabel);
			if(window.location.href.indexOf("?")> -1) 
    			{
					var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
					if(Passingtoken == 'Process Steps' || Passingtoken == 'Draft')
					{ 	
						//QueryDataRetResult
						var ColumnValue = '';
						if(format == ''){
						ColumnValue = ColumnValueByColumnName(QueryDataRetResult,resultColumns[i].ColumnName);
						}else{
						ColumnValue = ColumnValueByColumnNameforTable(QueryTableData,resultColumns[i].ColumnName,0)    								
						}					
						peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
						var id = ddpLabel+"_TopSpan";
						var ppid = peoplePickerDiv[0] ? peoplePickerDiv[0].id : id;
						var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[ppid];
						if(ColumnValue.results != null){
							if(ColumnValue.results.length > 0){													
							 for(u=0;u<ColumnValue.results.length;u++){
							 /*	var arr = AllTaskUsersEmployeeuser.filter(function (filterData) {
								     return filterData.UserId == ColumnValue.results[u].Id;
								 }); */
								var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=LogonName/Id,LogonName/Title,Email&$expand=LogonName&$filter=LogonName/Id eq '"+ColumnValue.results[u].Id+"' and Status eq 'Active'";
								var arr = RequestGetdata(QueryCheckActive);												
							 	peoplePicker.AddUserKeys(arr[0].Email);	
							 }
							 if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){
							 //	$('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide();
								$('#'+ddpLabel).find(".sp-peoplepicker-editorInput").hide(); // for hiding input field				
							 	peoplePicker.SetEnabledState(false);						 								 	
							 }
							 setTimeout($('#'+ddpLabel).find(".sp-peoplepicker-delImage").remove(),1000);
						 	}	
						 } else{
						 if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){							 
								$('#'+ddpLabel).find(".sp-peoplepicker-editorInput").hide(); // for hiding input field				
							 	peoplePicker.SetEnabledState(false);						 								 	
							}	
						 }																		
					}else{
						if(resultColumns[i].DefaultValue == 'Initiator'){
							/*var arrSubApprover = AllTaskUsersEmployeeuser.filter(function (filterData) {
							     return filterData.UserId == _spPageContextInfo.userId;  //resultColumns[i].Author.Id;
							 });*/
							 var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=LogonName/Id,LogonName/Title,Email&$expand=LogonName&$filter=LogonName/Id eq '"+_spPageContextInfo.userId+"' and Status eq 'Active'";
							 var arrSubApprover = RequestGetdata(QueryCheckActive);					
							 peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
							 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
							 peoplePicker.AddUserKeys(arrSubApprover[0].Email);
							 if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){	
							 	$('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide();															
								$('#'+ddpLabel).find(".sp-peoplepicker-editorInput").hide(); // for hiding input field				
							 	peoplePicker.SetEnabledState(false);
							 	setTimeout($('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide(),1000);						
							 }							 
							 
						}else if(resultColumns[i].DefaultValue == 'Manager'){
						/*	var arrUser = AllTaskUsersEmployeeuser.filter(function (filterData) {
						     	return filterData.UserId == _spPageContextInfo.userId; //resultColumns[i].Author.Id;
							});	*/
							 var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ManagerLoginName/Id,ManagerLoginName/Title&$expand=ManagerLoginName&$filter=LogonName/Id eq '"+_spPageContextInfo.userId+"' and Status eq 'Active'";
							 var arrUser = RequestGetdata(QueryCheckActive);								
							 peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
							 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
							 var UserTitle = GetUserLogin(arrUser[0].ManagerLoginName.Id);
							 peoplePicker.AddUserKeys(UserTitle);							
							if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){
								$('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide()															
								$('#'+ddpLabel).find(".sp-peoplepicker-editorInput").hide(); // for hiding input field				
							 	peoplePicker.SetEnabledState(false);
							 	setTimeout($('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide(),1000);
							 }
							
							 
						}else if(resultColumns[i].DefaultValue == 'HOD'){		
							var Dept = getUserDept();
							var role = 'Head of the Department';
							var EntityUser = [];
					 		GetlistData("/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=Department/ID,Department/DepartmentName,WebPartName,Company/ID,Company,Contributors/ID,Contributors/Title&$expand=Company,Contributors,Department&$filter=Company/ID eq '"+companyIdNavigation+"'and Department/DepartmentName eq '"+Dept +"' and WebPartName eq '"+role +"'").done(function (USers) {			 
						  	 if(USers.d.results.length > 0){
							  	 var nwApprover = USers.d.results[0].Contributors.results;
							  	 if(nwApprover.length > 0){
								 	for(b=0; b<nwApprover.length; b++){
								 	/*	var arrUser = AllTaskUsersEmployeeuser.filter(function (filterData) {
									     	return filterData.UserId == nwApprover[b].ID; //resultColumns[i].Author.Id;
										}); */
										var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=LogonName/Id,LogonName/Title,Email&$expand=LogonName&$filter=LogonName/Id eq '"+nwApprover[b].ID+"' and Status eq 'Active'";
							 			var arrSubApprover = RequestGetdata(QueryCheckActive);					
								 		EntityUser.push(arrSubApprover[0].Email);						
								    }
								  }else{
									 alert('Users are not available for '+ role );
								  }
							   }    					  	    		 		 
							 });			 	
							 peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
							 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];				 
							// var UserTitle = GetUserLogin(arrUser[0].Manager.ID);
							 peoplePicker.AddUserKeys(EntityUser[0]);	
							 if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){		
							 	$('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide();													
								$('#'+ddpLabel).find(".sp-peoplepicker-editorInput").hide(); // for hiding input field				
							 	peoplePicker.SetEnabledState(false);
							 	 setTimeout($('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide(),1000);
							 }
							
						}else{
							peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
							var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];	
							peoplePicker.DeleteProcessedUser();			 
							if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){		
							 	$('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide();													
								$('#'+ddpLabel).find(".sp-peoplepicker-editorInput").hide(); // for hiding input field				
							 	peoplePicker.SetEnabledState(false);
							 	setTimeout($('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide(),1000);					
							 }	
							 
						}
					
					}
				}
		
				      	
	      }
	      else if(resultColumns[i].ColumnType == 'Text'  && resultColumns[i].AutoPopulate == true ){
	      	if(resultColumns[i].AutoPopulateOf != null)  {
	      			if(resultColumns[i].AutoPopulateValue == 'Company' || resultColumns[i].AutoPopulateValue == 'Department' || resultColumns[i].AutoPopulateValue == 'OfficeLocation'){
					var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select="+resultColumns[i].AutoPopulateValue+"/Title&$expand="+resultColumns[i].AutoPopulateValue+"&$filter=LogonName/Id eq '"+_spPageContextInfo.userId+"' and Status eq 'Active'";
					var	ResultActive = RequestGetdata(QueryCheckActive);	
					$('#'+resultColumns[i].ColumnName).val(ResultActive[0][resultColumns[i].AutoPopulateValue].Title);				
					}else{
					var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select="+resultColumns[i].AutoPopulateValue+"&$filter=LogonName/Id eq '"+_spPageContextInfo.userId+"' and Status eq 'Active'";
					var	ResultActive = RequestGetdata(QueryCheckActive);	
					var filterVal = ResultActive.length > 0 ? ResultActive[0][resultColumns[i].AutoPopulateValue] : ''
					if(resultColumns[i].AutoPopulateValue == 'JoiningDate' || resultColumns[i].AutoPopulateValue == 'DateOfBirth' || resultColumns[i].AutoPopulateValue == 'DateOfAnniversary'){
					filterVal = moment(filterVal).format('LL')
					}
					$('#'+resultColumns[i].ColumnName).val(filterVal);				
					}
					
				}
	      
	      }
	     /* else if(resultColumns[i].ColumnType == 'Text' && resultColumns[i].TextValidation == 'Link'){
	      	$('#'+resultColumns[i].ColumnName)
	      
	      }*/
	      	       	      
	       else if(resultColumns[i].ColumnType == 'Text' && resultColumns[i].DropdownValues == true){
            var classest = '', classtext = '', tblcolId = '';
            if(format == ''){
             var ddpLabel = ddpLbl = resultColumns[i].ColumnName;   
             classtext = 'dynamicvalfeachcls';
            }else{
             classtext = 'input-sm';
             var currRowid = $(elem).closest("tr").attr("id"); //var tId = tableId.split('_')[1]
             var ddpLbl = format+'_'+currRowid+'_'+resultColumns[i].ColumnName; 		             
             tblcolId = resultColumns[i].Id;
             //var ddpLbl = format+'_'+resultColumns[i].ColumnName;   
             var CurrElem = elem.find('#'+ddpLbl )
		     var ddpLabel =  CurrElem.selector;
            }
            
            var DDLVALUE = format ? $(ddpLabel).val() : $("#"+ddpLabel).val();
            var restquery = ""; resultdata =[];
            if(resultColumns[i].DropdownFrom == 'SharePoint List'){
//            	restquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+resultColumns[i].SPListName+"')/items?$select=Title,Id,"+resultColumns[i].SPListColumn+"&$filter="+resultColumns[i].SPListFilterColumn+" eq '"+resultColumns[i].SPListFilter+"'&$orderby="+resultColumns[i].SPListSortColumn+"";
				if(resultColumns[i].SPListFilter == '' || resultColumns[i].SPListFilter == null){
					restquery = _spPageContextInfo.appBarParams.portalUrl + "sites" +resultColumns[i].SPListSiteAddress + "_api/web/lists/getbytitle('"+resultColumns[i].SPListName+"')/items?$select=Title,Id,"+resultColumns[i].SPListColumn+"";
	    		}else{
	    			restquery = _spPageContextInfo.appBarParams.portalUrl +  "sites" +resultColumns[i].SPListSiteAddress + "_api/web/lists/getbytitle('"+resultColumns[i].SPListName+"')/items?$select=Title,Id,"+resultColumns[i].SPListColumn+"&$filter="+resultColumns[i].SPListFilter+"&$orderby="+resultColumns[i].SPListSortColumn+"";	    			
	    		}
    				resultdata = RequestGetdata(restquery);
        			console.log(resultdata);            
            }else{            
				if(resultColumns[i].TemplateID != null)  {
					restquery = "Title,Id,ColumnSequence/Id,ColumnSequence/Title,TemplateID/Id,TemplateID/TemplateName&$expand=TemplateID,ColumnSequence&$filter=TemplateID/TemplateName eq '" + resultColumns[i].TemplateID.TemplateName+ "' and ColumnSequence/Title eq '"+resultColumns[i].Title+"'&$orderby=Created asc"; 
				}else{
					restquery = "Title,Id,ColumnSequence/Id,ColumnSequence/Title,TableColumnID/Id,TableColumnID/Title&$expand=ColumnSequence,TableColumnID&$filter= ColumnSequence/Id eq '"+resultColumns[i].SetupIDId+"' and TableColumnID/Id eq '"+tblcolId+"'&$orderby=Created asc"; 
				}
				GetData("/_api/web/lists/getbytitle('ApprovalColumnsDropdown')/items?$select="+restquery+"").done(function (result) {
				resultdata = result;
				});
	      	}
	      	if(format == ''){
		      	if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true)
		      	{
				 	var select = $("<select disabled='disabled' coltype ='"+resultColumns[i].ColumnType+"' class='form-control "+classtext+"' data-original-value='"+resultColumns[i].ColumnName+"'>");			 	
				}
				else
				{	classest += 'active';
				    if(resultColumns[i].DropdownFrom == 'SharePoint List'){
				    var addAttr = '';
				    if(resultColumns[i].MultipleChoice  == true){ //if(resultdata.length > 10){
				    	addAttr = "multiple multiselect-search='true' multiselect-select-all='true'";
				    } 
					var select = $("<select coltype ='"+resultColumns[i].ColumnType+"' name='field2' id='field2_"+resultColumns[i].ColumnName+"' "+addAttr+" multiselect-max-items='10' class='form-control "+classtext+" "+classest+"' data-original-value='"+resultColumns[i].ColumnName+"'>");
 
				    }else{
					   var select = $("<select coltype ='"+resultColumns[i].ColumnType+"' class='form-control "+classtext+" "+classest+"' data-original-value='"+resultColumns[i].ColumnName+"'>");			 	
					}
				}
			}else{
				var select = $("<select  coltype ='"+resultColumns[i].ColumnType+"' class='form-control "+classtext+"' data-original-value='"+resultColumns[i].ColumnName+"'>");			 	
			}
			if(resultdata.length > 0){
				var Colvalue = resultColumns[i].SPListColumn;
				//select.prop("multiple multiselect-search", true);				select.prop("multiselect-select-all", true);
				if(resultColumns[i].SPListFilterColumn == '' || resultColumns[i].SPListFilterColumn  == null)	{		 			 
				 $(resultdata).map(function (i,value) {				 		
						select.append($("<option>").val(value[Colvalue]).html(value[Colvalue]));
				//	  ddlValues.append($("<option></option>").attr("value", this.Id).text(this.Title));
				 });
				 }else{
				 	select.empty().append('<option value=""> -- Select -- </option>');				
				 	var ddpid = ddpLabel, Currcol = resultColumns[i].ColumnName;
				    $('#' +resultColumns[i].SPListFilterColumn).change(function () {
				        let val = this.options[this.selectedIndex].value;				
				        let filterData = resultdata.filter(function(value) {
				            return value[Colvalue] === val ;
				        });	
				      	if(filterData.length < 10){
				      		$('#'+Currcol).show();
				      		$('#'+Currcol).removeAttr('multiple multiselect-search');
				      		$('#'+Currcol).removeAttr("multiselect-select-all");
				      		$('.'+Currcol).find('div .multiselect-dropdown').hide();
				      	}
				        select.empty();					       
				        $.each(filterData, function (index, value) {
				            // Now, fill the second dropdown list with bird names.
				           select.append($("<option>").val(value.Title).html(value.Title));
				        });
				       // 		MultiselectDropdown(window.MultiselectDropdownOptions);

				    });
				 
				 }
			}else if(resultdata.d.results.length > 0){						
				 	$(resultdata.d.results).each(function () {			 
	             		select.append($("<option>").val(this.Title).html(this.Title));
				//	  ddlValues.append($("<option></option>").attr("value", this.Id).text(this.Title));
				 	});
			 //	}
			}
			if(resultColumns[i].DropdownFrom == 'SharePoint List'){
					multiDdp.push({'col': resultColumns[i].ColumnName});		    
			}
			 select.val(1).attr({id: ddpLbl , name: ddpLabel }).change(function(){
				    if (typeof getShipping == "function") {
				        getShipping();
				    }
				});
				if(format == ''){
					var dfval= $("#"+ddpLabel ).val();
					$("#"+ddpLabel ).replaceWith(select);
				}else{
					var dfval= DDLVALUE ; //$("#"+ddpLabel ).val();
					$(ddpLabel ).replaceWith(select);
				}
				
				if(window.location.href.indexOf("?")> -1) 
    			{
    				var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
					if(Passingtoken == 'Process Steps')
					{
						if(format != ''){ $(ddpLabel).val(DDLVALUE )}else{ $("#"+ddpLabel).val(DDLVALUE )};
						//$("#"+ddpLabel ).val(ddval);									
					}
					else if(Passingtoken == 'Draft'){
						if(format != ''){ $(ddpLabel).val(DDLVALUE )}else{ $("#"+ddpLabel).val(DDLVALUE )};
					}
					else
					{
						if(resultColumns[i].DefaultValue != '')
						{
							if(format == ''){
								$("#"+ddpLabel ).val(resultColumns[i].DefaultValue);	
							}else{
								$(ddpLabel ).val(resultColumns[i].DefaultValue);	
							}
						}
						else
						{
							$("#"+ddpLabel ).val(resultdata.d.results[1].Title);	
						}	
					}
				}
				else
				{
					if(resultColumns[i].DefaultValue != '')
					{
						$("#"+ddpLabel ).val(resultColumns[i].DefaultValue);	
					}
					else
					{
						$("#"+ddpLabel ).val(resultdata.d.results[1].Title);	
					}
									
				}	
					function getShipping() {
				    console.log($("#"+ddpLabel).val());
				//;}			
				
	      	}
	    } else if(resultColumns[i].ColumnType == 'Currency' || resultColumns[i].ColumnType == 'Priority'){	     
	      		if(format == ''){
	             var ddpLabel2 = resultColumns[i].ColumnName;   
	            }else{
	            var tId = tableId.split('_')[1]
	            var ddpLabel2 = format+'_'+tId+'_'+resultColumns[i].ColumnName; 		             
	             //var ddpLabel2 = format+'_'+resultColumns[i].ColumnName;   
	            }
	            var DDLVALUE = $("#"+ddpLabel2).text();
	            var ddlReadonly=false;
	            if(document.querySelector('#'+ddpLabel2).hasAttribute('disabled')== true)
				{
					ddlReadonly = true;
				}
	      		//var ddpLabel2 = resultColumns[i].ColumnName;
	      		var ddlType = resultColumns[i].ColumnType;
	      		var defVal = resultColumns[i].DefaultValue;
	      		GetChoiceValues(ddpLabel2, ddlType, defVal,ddlReadonly,DDLVALUE);
	      	//	$("#"+ddpLabel2).val(resultColumns[i].DefaultValue);	      
	      	
	      	}else if(resultColumns[i].ColumnType == 'Yes/No' || resultColumns[i].ColumnType == 'YesNo'){
	      		//var ddpLabel2 = resultColumns[i].ColumnName;
	      		if(format == ''){
	             	var ddpLabel2 = resultColumns[i].ColumnName;
	             	var DDLVALUE = $("#"+ddpLabel2).text();
	             	if(DDLVALUE == 'true'){DDLVALUE = 'Yes';}
	             	else{DDLVALUE = 'No';}	             	
	             	if(document.querySelector('#'+ddpLabel2).hasAttribute('disabled')== true)
	             	{
	             		var select = $("<select coltype ='"+resultColumns[i].ColumnType+"' disabled='disabled' class='dynamicvalfeachcls form-control' id='"+ddpLabel2+"'>");
	             	}
	             	else
	             	{
	             		var select = $("<select coltype ='"+resultColumns[i].ColumnType+"' class='dynamicvalfeachcls form-control "+classest+"' id='"+ddpLabel2+"'>");
	             	}
		      		select.append($("<option>").val('Yes').html('Yes'));
		      		select.append($("<option>").val('No').html('No'));
		      		$("#"+ddpLabel2 ).replaceWith(select);	
		      		$("#"+ddpLabel2 ).val(resultColumns[i].DefaultValue);  
		      		
		      		if(window.location.href.indexOf("?")> -1) 
    				{
    					var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
						if(Passingtoken == 'Process Steps')
						{
							$("#"+ddpLabel2).val(DDLVALUE);									
						}
						else
						{
							if(resultColumns[i].DefaultValue != '')
							{
								$("#"+ddpLabel2).val(resultColumns[i].DefaultValue);	
							}
							else
							{
								$("#"+ddpLabel2).val(resultdata.d.results[1].Title);	
							}	
						}
					}
		      		
					 
	            }else{
		             var ddpLabel2 = format+'_'+resultColumns[i].ColumnName; 
		             var x = $("#"+ddpLabel2 );
		             x.get(0).type =  "checkbox";
					 //document.body.appendChild(x);  
		          //   $("#"+ddpLabel2 ).setAttribute("type", "checkbox");		             
	            }	      			
	      	}else if(resultColumns[i].ColumnType == 'AttachmentBox'){	      	
	      	 var ddpLabel = ddpLbl = AttachDraftCol = resultColumns[i].ColumnName;                
             classtext = 'dynamicvalfeachcls active';var ddvval = $('#'+AttachDraftCol).val()//resultColumns[i].DefaultValue;
             var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
            /* if(Passingtoken != 'Draft' || ddvval == ''){
             	$("#"+ddpLabel).prop("type", "file");
             }else */
             if(Passingtoken == 'Draft' && ddvval != ''){
             	var html = '<div class="approve-process-upload-data scrollbar-panel" id="Docfilename'+ddpLabel+'" style="width:100%; min-width:auto; max-height:300px; margin-bottom:10px;">'
             	$("#"+ddpLabel).replaceWith(html);
             } 
             //$("#"+ddpLabel).attr("onchange", validateFileExtensions(ddpLbl, resultColumns[i].DefaultValue));
			
	       }
	   }
    }
    $(".Cover_PPl .sp-peoplepicker-topLevel").on("keyup", function(){
	$(this).css('position','static');
	var storeTop = $(this).offset().top;
	var storeLeft = $(this).offset().left;
	$(this).find('.sp-peoplepicker-autoFillContainer').offset({top:storeTop + $(this).outerHeight(),left:storeLeft})});
	if(multiDdp.length > 0){
		$.uniqueSort(multiDdp);
		MultiselectDropdown(window.MultiselectDropdownOptions);
	/*	for(d=0;d<multiDdp.length;d++){
			MultiselectDropdown(window.MultiselectDropdownOptions,multiDdp[d].col);
			console.log(multiDdp[d].col);alert(multiDdp[d].col);
		}	*/
	}
 }
 
 function GetUniqueData(restURL,column) {
		var def = $.Deferred();
		$.ajax({
			url: _spPageContextInfo.webAbsoluteUrl + restURL,
			contentType: "application/json;odata=verbose",
			headers: { "accept": "application/json;odata=verbose" },
			async:false,
			success: function (data) {
				def.resolve(data);
				var result = data.d.results; // set value of result variable 
			    $.each(result, function(key, value){
			        console.log(value);   // access the choice field value
			    });
			},
			error: function (data) {
				def.reject(data);
			}
		});

		return def.promise();
	}

function GetChoiceValues(val, type, defVal,ddlReadonly,DDLVALUE){
var def = $.Deferred();
$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('ApprovalProcessList')/fields?$filter=EntityPropertyName eq '"+val+"'", //?$select="+val,
        type: "GET", 
        async:false,       
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },        
        success: function (data) {        
        	var choiceArray = data.d.results[0].Choices.results;
        	var status='';
        	if(ddlReadonly == true)
        	{
        		status = "disabled='disabled'";
        		//var classest = '';
        	}else{
        		classest = 'active';
        	}
        	debugger;
        	if(status == "disabled='disabled'")
        	{
        		var select = $("<select "+status+" class='dynamicvalfeachcls form-control' id='"+val+"' >");		  //coltype ='"+resultColumns[i].ColumnType+"'
        	}
        	else
        	{
        		var select = $("<select "+status+" class='dynamicvalfeachcls form-control "+classest+"' id='"+val+"' >");	//coltype ='"+resultColumns[i].ColumnType+"'
        	}
        //	var option = "<option value='"+choiceArray[0]+"' selected='selected'>"+choiceArray[0]+"</option>"         	
        	for(c=0;c<choiceArray.length;c++){        		
        		//option += "<option value='"+choiceArray[i]+"'>"+choiceArray[i]+"</option>";         		
        		select.append($("<option>").val(choiceArray[c]).html(choiceArray[c]));
        	}
        //	$("#ddlDefVal").html(option);
        	$("#"+val).replaceWith(select);	        	
			$("#"+val).val(DDLVALUE);		
			console.log(data);
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
    return def.promise();

}

function bindUser(ddpLabel){
peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
if(valuefordefault.results.length > 0){													
 for(u=0;u<valuefordefault.results.length;u++){
 	/*var arr = AllTaskUsersEmployeeuser.filter(function (filterData) {
	     return filterData.UserId == valuefordefault.results[u].Id;
	 });*/
	 var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ManagerLoginName/Id,ManagerLoginName/Title&$expand=ManagerLoginName&$filter=LogonName/Id eq '"+valuefordefault.results[u].Id+"' and Status eq 'Active'";
	 var arrUser = RequestGetdata(QueryCheckActive);								
	 				
 	peoplePicker.AddUserKeys(arrUser[0].Email);	
 }
 if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){ 
	$('#'+ddpLabel).find(".sp-peoplepicker-editorInput").hide(); // for hiding input field				
 	peoplePicker.SetEnabledState(false);						 								 	
 }
}
}





function downloadAttach(url, filename) {
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
    });
});
}



function addDdpStps(id){
	if(id == 'ddpStps'){
		$('#ddpStps').empty();	
		var ddpStps = '';
		ddpStps += '<li><input type="checkbox" value="all_select" id="selectallopts">All Select</li>'
		for(i=0;i<ApproerSteps.length;i++){
			ddpStps += '<li><input type="checkbox" class="checkboxallopt"  value="'+ApproerSteps[i].Id+'" name="">'+ApproerSteps[i].StepName+'</li>'
		}
		$('#ddpStps').append(ddpStps);
	}else{
		$('#singleStpddp').empty();	
		var ddpStps = '';
		//ddpStps += '<li><input type="checkbox" value="all_select" id="selectallopts">All Select</li>'
		singleStpddp 
		for(i=0;i<ApproerSteps.length;i++){
			ddpStps += '<option value="'+ApproerSteps[i].Id+'">'+ApproerSteps[i].StepName+'</option>'
		}
		$('#singleStpddp').append(ddpStps);	
	}
}

function getExtension(path) {
    var basename = path.split(/[\\/]/).pop(),  // extract file name from full path ...
                                               // (supports `\\` and `/` separators)
        pos = basename.lastIndexOf(".");       // get last position of `.`

    if (basename === "" || pos < 1)            // if file name is empty or ...
        return "";                             //  `.` not found (-1) or comes first (0)
    return basename.slice(pos + 1);            // extract extension ignoring `.`
}


// To view Process's info n details

function ViewProcessDetails(){
		var templatename = $("input[name='selector']:checked").val();
		var templateID = $("input[name='selector']:checked").attr('templateid')
		if(templatename == null || templatename == '')
		{
			templatename =	window.atob(titanForWork.getQueryStringParameter('RecName'));
		}
		templatename = templatename.trim(); templateID = templateID ;
		templateID = templateID ? templateID : window.atob(titanForWork.getQueryStringParameter('Template'));
		var	QueryReq = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessMaster')/items?$select=*,Id,Title,ProcessType,RequestFor,FileIcon,TemplateName,Active&$filter=ProcessType eq 'Process' and Id eq '"+templateID+"'"; 		
		var QueryProcessData = RequestGetdata(QueryReq);
		console.log(QueryProcessData);
		$('#txtProcessName').val(QueryProcessData[0].Title);
		$('#txtProcessFor').val(QueryProcessData[0].RequestFor);
		$('#txtTempName').val(QueryProcessData[0].TemplateName);
		$('#txtProcessOwner').val(QueryProcessData[0].ProcessOwner);
		$('#txtPublishby').val(QueryProcessData[0].PublishedBy);
		$('#txtPublishOn').val(QueryProcessData[0].PublishedOn);
		$('#txtProcessDetails').val(QueryProcessData[0].Details);
		$('#txtProcessInst').val(QueryProcessData[0].Instructions);
		$('#txtProcessPre').val(QueryProcessData[0].Prerequisite);		
		
}

// To check file size
function CheckFileSize(file){
			const size = 
               (file[0].size / 1024 / 1024).toFixed(2);
          
            if (size > 100000) {
                alert("File must be less than 100 MB");
                return false;
            }else{
            	return true;
            }
}

// validate file exten

function validateFileExtensions(ddp, defval){
       var file = $('#'+ddp).val();  
	   var ext = file.split('.').pop();
       if(!returnExtension(ext)){
        var blnValid = false;
		var validFileExtensions = [defval];		
        var fileExt =  defval.split(/[.,!,?]/); //new Array();           
        console.log(fileExt);
       // $( "input:file").each(function(){
		for (var j = 0; j < fileExt.length; j++) {
                var sCurExtension = fileExt[j].replace(" ","");
                if (ext.toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }       // });
		if (!blnValid) {
                alert("Sorry, " + file + " is invalid, allowed extensions are: " + validFileExtensions.join(", "));
                $('#'+ddp).val('');  
                return false;
            }
      /*  if(fileErrors.length > 0 ){
            var errorContainer = $("#validation-errors");
            for(var i=0; i < fileErrors.length; i++){
              //  errorContainer.append('<label for="title" class="error">* File:'+ file +' do not have a valid format!</label>');
              alert('Only '+defval+' types are allowed.')
            }
            return false;
        }*/
        return true;
    }
}    
    
