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
function SetDatpickerNdropDown(resultColumns, format, tableId, elem,QueryDataRetResult,tblEdit,PermissionStatus ){
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
					if( dtval == 'Invalid date' ){dtval = '';}
					}else{
						if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Process Steps'){
							var dtval = $("#"+dateId).val()
							dtval = dtval ? dtval : '';
							$("#"+dateId).val(dtval);
							if( dtval == 'Invalid date' ){dtval = '';}
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
					var dtval = $("#"+dateId).val()
					dtval = dtval ? dtval : '';
					if( dtval == 'Invalid date' ){dtval = '';}
					$("#"+dateId).val(dtval);
					}else{
						if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Process Steps'){
							var dtval = $("#"+dateId).val()
							dtval = dtval ? dtval : '';
							if( dtval == 'Invalid date' ){dtval = '';}
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
					if((resultColumns[i].DefaultValue == null || resultColumns[i].DefaultValue =='') &&  (dateval == '' || dateval == undefined || dateval == 'Invalid date')) {
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
            
             var currRowid = $(elem).closest("tr").attr("id");
             var tId = tableId.split('_')[1]
		     var ddpLabel = format+'_'+currRowid +'_'+resultColumns[i].ColumnName; 
		     classest += 'input-sm Cover_PPl ';		             
            // var ddpLabel = format+'_'+resultColumns[i].ColumnName;   
            }
            if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){
            	status = "disabled='disabled'"; 
            }else{
            	classest += 'active';
            }
            
			var DivPPl = '<div '+status +' id="'+ddpLabel+'" class="dynamicvalfeachcls	'+classest+' '+resultColumns[i].PersonValidation+'" data-original-value = "'+resultColumns[i].ColumnName+'" coltype ="'+resultColumns[i].ColumnType+'"></div>';
			$('#'+ddpLabel).replaceWith(DivPPl);
			initializePeoplePicker(ddpLabel,resultColumns[i].PersonValidation);
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
							 var cols = resultColumns;
							 var PopFields = resultColumns[i].PopulatedFieldsId.results;
							 var IsPopulate = resultColumns[i].AutoPopulate;
							 var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=LogonName/Id,LogonName/Title,Email&$expand=LogonName&$filter=LogonName/Id eq '"+_spPageContextInfo.userId+"' and Status eq 'Active'";
							 var arrSubApprover = RequestGetdata(QueryCheckActive);					
							 peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
							 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
							 peoplePicker.AddUserKeys(arrSubApprover[0].Email);		
							 if(PopFields.length > 0 ){
							 	peoplePicker.oldChanged = peoplePicker.OnControlResolvedUserChanged;					 							
							 	peoplePicker.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo,ddpLabel) {								    
								    console.log(selectedUsersInfo); if(selectedUsersInfo.length > 0){var userInfo = selectedUsersInfo[0].EntityData.Email;
								    AutopopulateData(peoplePickerDiv[0].id,cols ,userInfo,PopFields);}
							   };
							 }
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
							 var Mcols = resultColumns;
							 var MPopFields = resultColumns[i].PopulatedFieldsId.results;
							 var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ManagerLoginName/Id,ManagerLoginName/Title&$expand=ManagerLoginName&$filter=LogonName/Id eq '"+_spPageContextInfo.userId+"' and Status eq 'Active'";
							 var arrUser = RequestGetdata(QueryCheckActive);								
							 peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
							 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
							 var UserTitle = GetUserLogin(arrUser[0].ManagerLoginName.Id);
							 peoplePicker.AddUserKeys(UserTitle);							
							 if(MPopFields.length > 0){
							 	peoplePicker.oldChanged = peoplePicker.OnControlResolvedUserChanged;					 							
							 	peoplePicker.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo,ddpLabel) {								    
								    console.log(selectedUsersInfo);if(selectedUsersInfo.length > 0){ var userInfo = selectedUsersInfo[0].EntityData.Email;
								    AutopopulateData(peoplePickerDiv[0].id,Mcols ,userInfo,MPopFields);}
							   };
							 }
							if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){
								$('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide()															
								$('#'+ddpLabel).find(".sp-peoplepicker-editorInput").hide(); // for hiding input field				
							 	peoplePicker.SetEnabledState(false);
							 	setTimeout($('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide(),1000);
							 }							
						}else if(resultColumns[i].DefaultValue == 'Indirect Manager'){
						/*	var arrUser = AllTaskUsersEmployeeuser.filter(function (filterData) {
						     	return filterData.UserId == _spPageContextInfo.userId; //resultColumns[i].Author.Id;
							});	*/
							 var IMcols = resultColumns;
							 var IMPopFields = resultColumns[i].PopulatedFieldsId.results;
							 var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=IndirectManager/Id,IndirectManager/Title&$expand=IndirectManager&$filter=LogonName/Id eq '"+_spPageContextInfo.userId+"' and Status eq 'Active'";
							 var arrUser = RequestGetdata(QueryCheckActive);								
							 peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
							 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
							 var UserTitle = GetUserLogin(arrUser[0].IndirectManager.Id);
							 peoplePicker.AddUserKeys(UserTitle);							
							 if(IMPopFields.length > 0){
								 peoplePicker.oldChanged = peoplePicker.OnControlResolvedUserChanged;					 							
								 peoplePicker.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo,ddpLabel) {								    
								    console.log(selectedUsersInfo); if(selectedUsersInfo.length > 0){var userInfo = selectedUsersInfo[0].EntityData.Email;
								    AutopopulateData(peoplePickerDiv[0].id,IMcols ,userInfo,IMPopFields);}
							  	 };
							 } 
							 if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true){
								$('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide()															
								$('#'+ddpLabel).find(".sp-peoplepicker-editorInput").hide(); // for hiding input field				
							 	peoplePicker.SetEnabledState(false);
							 	setTimeout($('#'+ddpLabel).find(".sp-peoplepicker-delImage").hide(),1000);
							 }												 
	 
						}else if(resultColumns[i].DefaultValue == 'HOD'){		
							var Dept = getUserDept(_spPageContextInfo.userId);
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
							 var HODcols = resultColumns;
							 var HODPopFields = resultColumns[i].PopulatedFieldsId.results;			 	
							 peoplePickerDiv = $("[id$='"+ddpLabel+"_TopSpan']");
							 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];				 
							// var UserTitle = GetUserLogin(arrUser[0].Manager.ID);
							 peoplePicker.AddUserKeys(EntityUser[0]);
							 if(HODPopFields.length > 0){
							 	peoplePicker.oldChanged = peoplePicker.OnControlResolvedUserChanged;					 							
							 	peoplePicker.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo,ddpLabel) {								    
								    console.log(selectedUsersInfo); if(selectedUsersInfo.length > 0){var userInfo = selectedUsersInfo[0].EntityData.Email;
								    AutopopulateData(peoplePickerDiv[0].id,HODcols ,userInfo,HODPopFields);}
							   };
							 }	
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
	      	var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
					if(Passingtoken == 'Initiation' )
					{ 		    				
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
							$('#'+resultColumns[i].ColumnName).parents(".dynamicdatatexboxes").addClass('AutoFilled');
							$('#'+resultColumns[i].ColumnName).closest(".form-group").find('.columnnametxt').addClass('AutoFilled');
							$('#'+resultColumns[i].ColumnName).addClass('AutoFilled');									
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
					restquery = "Title,Id,ColumnSequence/Id,ColumnSequence/Title,TemplateID/Id,TemplateID/TemplateName&$expand=TemplateID,ColumnSequence&$filter=TemplateID/TemplateName eq '" + resultColumns[i].TemplateID.TemplateName+ "' and ColumnSequence/Title eq '"+resultColumns[i].Title+"'&$orderby=SequenceNo asc, Created asc"; 
				}else{
					restquery = "Title,Id,ColumnSequence/Id,ColumnSequence/Title,TableColumnID/Id,TableColumnID/Title&$expand=ColumnSequence,TableColumnID&$filter= ColumnSequence/Id eq '"+resultColumns[i].SetupIDId+"' and TableColumnID/Id eq '"+tblcolId+"'&$orderby=Created asc"; 
				}
				GetData("/_api/web/lists/getbytitle('ApprovalColumnsDropdown')/items?$select="+restquery+"").done(function (result) {
				resultdata = result;
				});	
	      	}
	      	var datatypeval = '';
	      	if(resultColumns[i].ConditionForVisible != null){
				datatypeval ="onchange='checkColVisibility(\""+resultColumns[i].ConditionForVisible+"\", \""+resultColumns[i].ColumnName+"\", \""+resultColumns[i].VisibleFieldsId.results+"\");'";
				//saveclassset += 'hide ';						
			}
	      	if(format == ''){
		      	if(document.querySelector('#'+ddpLabel).hasAttribute('disabled')== true)
		      	{
				 	var select = $("<select disabled='disabled' coltype ='"+resultColumns[i].ColumnType+"' class='form-control "+classtext+"' data-original-value='"+resultColumns[i].ColumnName+"' "+datatypeval+">");			 	
				}
				else
				{	classest += 'active';
				    if(resultColumns[i].DropdownFrom == 'SharePoint List'){
				    var addAttr = '';
				    if(resultColumns[i].MultipleChoice  == true){ //if(resultdata.length > 10){
				    	addAttr = "multiple multiselect-search='true' multiselect-select-all='true'";
				    } 
					var select = $("<select coltype ='"+resultColumns[i].ColumnType+"' name='field2'  id='field2_"+resultColumns[i].ColumnName+"' "+addAttr+" multiselect-max-items='10' class='form-control "+classtext+" "+classest+"' data-original-value='"+resultColumns[i].ColumnName+"' "+datatypeval+">");
 
				    }else{
					   var select = $("<select coltype ='"+resultColumns[i].ColumnType+"' class='form-control "+classtext+" "+classest+"' data-original-value='"+resultColumns[i].ColumnName+"' "+datatypeval+">");			 	
					}
				}
			}else{
				var EnD = '';
				if(PermissionStatus  != ""){
				var select = $("<select  coltype ='"+resultColumns[i].ColumnType+"' class='form-control "+classtext+"'  "+PermissionStatus +" data-original-value='"+resultColumns[i].ColumnName+"'>");			 	
				}else{
				var select = $("<select  coltype ='"+resultColumns[i].ColumnType+"' class='form-control "+classtext+" active' data-original-value='"+resultColumns[i].ColumnName+"'>");			 	
				}
				
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
				 	select.empty().append('<option value=""> -- Select -- </option>');				
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
   // var newUrl = '..'+url;
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
          
            if (size > 100) {
                alert("File must be less than 100 MB");
                return false;
            }else{
            	return true;
            }
}

// validate file exten

function validateFileExtensions(ddp, defval, size){
      //var file = $('#'+ddp).val();  
     var file = jQuery('#'+ddp);
	 var fileName = file[0].files[0].name;
	  var fileSize = $("#"+ddp)[0].files[0].size;
	  var ext = fileName.split('.').pop();
       if(!returnExtension(ext)){
        var blnValid = false;
		var validFileExtensions = [defval];		        
        console.log(fileExt);
       // $( "input:file").each(function(){
        if(validFileExtensions.length > 0 ){
        	if(validFileExtensions[0] != 'null'){
        	var fileExt =  defval.split(/[.,!,?]/); //new Array();           
			for (var j = 0; j < fileExt.length; j++) {
                var sCurExtension = fileExt[j].replace(" ","");
                if (ext.toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }       // });
            var sizetext = '';
            const Fsize = (fileSize / 1024 / 1024).toFixed(2);          
            if(parseFloat(Fsize) > parseFloat(size)){
	         	//var _size = fileSize/1000000 + 'MB';  	        	
	        	sizetext = "Allowed max file size: "+size+" MB." ;
	        	alert(sizetext);
	        	$('#'+ddp).val('');  
                return false;
        	}
        	
		 	 if (!blnValid) {
                alert("Invalid file, Allowed extensions: " + validFileExtensions.join(", ") + "\n" + sizetext);
                $('#'+ddp).val('');  
                return false;
             }
           }
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
    }else{
	alert(fileName + ' should not be uploaded. This file may be malicious.  Please select another file.');
	$('#'+ddp).val('');  
	return false;
	}
}    
    
function EditAttachment(id, DocName, purpose, remarks, action, col){	
	//$('#'+col).val(DocName);
	editFile = DocName;
	$('#DocPurpose').val(purpose);
	$('#docRemarks').val(remarks);
	//setTimeout(function(){$('#EditDoc').show();$('#saveDoc').hide()}, 5000);
	$('#EditDoc').show();$('#saveDoc').hide();
	//UpdateDoc(DocName);
}
function UpdateDoc(){
	var fileName = editFile;
	var extn = getExtension(fileName);
	if(!returnExtension(extn)){
	var purpose = $('#DocPurpose').val();				
	var Remarks = $('#docRemarks').val();
	var AttachFor = $('#e_Signature_optis').val();
	var SignOf  = 'All Signatories';
	var ddpmulstp = $('#ddpStps').val();
	var	singleslct = $("#single_selecopt").prop("checked") ? 1 : 0;				
	var SingleStpval = $('#singleStpddp').val();
	var watermrk = $("#watermark_slect").prop("checked") ? 1 : 0;				
	var watermrkval = $('#docWatermark').val();
	//items[items.indexOf(oldValue)] = newValue
	var editedData = {'filename' : fileName, 'purpose':purpose, 'Remarks' : Remarks,'SignOf': SignOf, 'ddpmulstp': ddpmulstp, 'SingleStpval':SingleStpval, 'singleslct': singleslct, 'watermrk' : watermrk ,'watermrkval' : watermrkval, 'extn' : extn, 'attachfor' : AttachFor};
	AllDocs = AllDocs.map(u => u.filename !== editedData.filename ? u : editedData );
	SaveApprovalDocs('Edit')
	}else{
	alert(fileName + ' should not be uploaded. This file may be malicious.  Please select another file.');
	return false;
	}
}


function DeleteColAttachment(Permission, ItemId, FileTitle, col, defval, maxnum) 
	{  
		var Dfd = $.Deferred();  
    	//var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalProcessDocuments')/GetItemById(" + ItemId + ")/AttachmentFiles/getByFileName('" + FileTitle + "')  ";  
    	var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalProcessDocuments')/GetItemById('" + ItemId + "')";
    	$.ajax({  
			url: Url,  
			type: 'POST',  
			async: false,
    	    contentType: 'application/json;odata=verbose',  
    	    headers: {  
    	    	'X-RequestDigest': $('#__REQUESTDIGEST').val(),  
    	    	'X-HTTP-Method': 'DELETE',  
    	        'Accept': 'application/json;odata=verbose' ,
                "If-Match": "*"

			},  
    	    success: function (data) 
    	    {  
				Dfd.resolve(data);
				console.log('Old Signed Image Delete.')  
				alert('File has been deleted successfully.')
				//$('#'+col).html("<input type='file' coltype ='AttachmentBox'  class='dynamicvalfeachcls  active form-control 'alue='' id='" + col +"' />");;
				var ff = 'onchange="validateFileExtensions(\''+col+'\', \''+defval+'\', \''+maxnum+'\');"';
				if(Permission == ''){
				var Colhtml = "<input type='file' coltype ='AttachmentBox'  class='dynamicvalfeachcls  active form-control' value='' id='" + col +"' "+ff +" />";
				}else{
				var Colhtml = "<input type='file' "+Permission +" coltype ='AttachmentBox'  class='dynamicvalfeachcls form-control' value='' id='" + col +"' "+ff +"/>";
				}
				$('.Doc_'+col).parents(".dynamicdatatexboxes").addClass('active');
				$('.Doc_'+col).closest(".form-group").find('.columnnametxt').addClass('active');
				$('.Doc_'+col).replaceWith(Colhtml);
				
			},  
        	error: function (error) 
        	{  
				Dfd.reject(JSON.stringify(error));  
        	}  
		});  
    	return Dfd.promise();  
}





function RemoveDoc(id, FileName){
	var index = id.split('_')[1];
    $("#" + id).remove();
    AllDocs = AllDocs.filter(function( obj ) {
        return obj.filename!== FileName;
    });

    RemoveDuplicate = [];
    var arr = AllDocs.filter(function (el) {
        if (RemoveDuplicate.indexOf(el.filename) == -1) {
            RemoveDuplicate.push(el.filename);
            return true;
        }
        return false;
    });
    ApprovalDocs = ReinitializeArray(arr);    

}

function ReinitializeArray(arr) {
    var newArr = [];
    var count = 0;
    for(var i=0; i < arr.length; i++) {
        newArr[count++] = arr[i];
    }
    return newArr;
}

function GetAllattachments(){
		ApprovalDoc = [];
		var RecID = window.atob(titanForWork.getQueryStringParameter('RecNo'));
		var Query =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessDocuments')/items?$select=*,Author/ID,Author/Title,RequestID/Id,AttachmentFiles&$expand=RequestID,Author,AttachmentFiles&$filter=RequestID/Id eq "+RecID+"";
		var QueryResult = RequestGetdata(Query);
		var ApprovalDocfiles = QueryResult.filter(function (filterData) {
		     return filterData.DocumentType != 'Column Document'
    	}); 
		console.log(QueryResult);	
		$('#tbdyAppDoc').empty();
		var count = 0;//$('.countingbx').text();
		//$('.countingbx').text(ApprovalDoc.length);
		var ApprovalDochtml = '';var stp;
		
	for(i=0;i<ApprovalDocfiles.length;i++){
	var attchments = ApprovalDocfiles[i].AttachmentFiles.results;
	if(attchments.length > 0){ApprovalDoc.push(ApprovalDocfiles[i]);count++}
	if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Process Steps'){
			stp = window.atob(titanForWork.getQueryStringParameter('StepNo'));//ApprovalDoc[i].Step;
	}else{	stp = 'Initiation'}
	var Email = GetUserEmail(ApprovalDocfiles[i].Author.ID);
	if(ApprovalDocfiles[i].AttachmentFiles.results.length > 0){
		var extn = getExtension(ApprovalDocfiles[i].AttachmentFiles.results[0].FileName);
		var Remarks = $(ApprovalDocfiles[i].Remarks).text();console.log(Remarks);
		var purpose = ApprovalDocfiles[i].Purpose ? ApprovalDocfiles[i].Purpose : '';
		AllDocs.push({'filename' : ApprovalDocfiles[i].AttachmentFiles.results[0].FileName, 'purpose':purpose, 'Remarks' : Remarks , 'SignOf': '', 'ddpmulstp': '', 'SingleStpval':'', 'singleslct': '', 'watermrk' : ApprovalDocfiles[i].Watermrk ,'watermrkval' : ApprovalDocfiles[i].WatermrkText, 'extn' : extn, 'attachfor' : '', 'Step': ApprovalDocfiles[i].Step, 'StepID':ApprovalDocfiles[i].StepQueueID})
		var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Email);
		ApprovalDochtml += '<tr id="Doc_'+i+'"><td><div class="titlewrp">';
		var extn = extn.toUpperCase();
		if(extn == 'JPEG' || extn == 'GIF' || extn == 'PNG' || extn == 'JPG'){
		 	var path = 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/jpg.png';
		}else if(extn == 'DOC' || extn == 'DOCX'){
			var path = 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/docx.png';
		}else if(extn == 'CSV' || extn == 'XLS' || extn == 'XLSX'){
			var path = 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/assets/images/excel_file.png';
		}else if(extn == 'PDF'){
			var path = 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/pdf.png';
		}else{
			var path = 'https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/file-icon.png';
		}		
	    ApprovalDochtml += '<img src="'+path+'">'
	    //ApprovalDochtml += '<a href="javascript:void(0);" download="'+ApprovalDoc[i].filename+'" onclick="downloadAttach(\'' + ApprovalDoc[i].filename + '\', \'' + ApprovalDoc[i].filename + '\')" class="" style="color:#1d6ec0; display:block; ">
	    ApprovalDochtml += '<span class="chip-icon-box"> <a href="javascript:void(0);" download="'+attchments[0].FileName+'" name="'+attchments[0].FileName+'" onclick="downloadAttach(\'' + attchments[0].ServerRelativeUrl+ '\', \'' + attchments[0].FileName + '\')"style="color:#333;"><p class="fileName" id="DocName" >'+attchments[0].FileName+'</p></a></span>';  //</a>
	    ApprovalDochtml += '</div></td>'
	    ApprovalDochtml += '<td><p class="purpose_text" id="filePurpose">'+purpose+'</p></td>'
	    ApprovalDochtml += '<td><p class="remarkmultilines" id="fileRemarks">'+Remarks +'</p></td>'
	    ApprovalDochtml += '<td><div class="flexitem"><div class="imgsetion"><div class="empoyeeimg" style="float:left;"><img title="'+ApprovalDocfiles[i].Author.Title+'" src="'+Authorattachment+'" alt="" data-themekey="#"></div></div><div class="imagecontent"><h4>'+ApprovalDocfiles[i].Author.Title+'</h4><a href="#" style="cursor: auto;">'+Email +'</a></div></div></td>'
	    ApprovalDochtml += '<td>'+ApprovalDocfiles[i].Step+'<br>'+moment(new Date).format('LL')+'</td>'
		if(stp == ApprovalDocfiles[i].Step){	   
			 ApprovalDochtml += '<td><button type="button" class="custom-edit-btn"><i class="fa fa-pencil" id="file_'+i+'" data-toggle="modal" data-target="#Approval_doc" onclick="EditAttachment(this.id, \''+ApprovalDocfiles[i].filename+'\',\''+ApprovalDocfiles[i].purpose+'\',\''+Remarks +'\')"></i></button>'	    
		     ApprovalDochtml += '<button type="button" class="custom-edit-btn"><i class="fa fa-trash-o" id="Doc_'+i+'" onclick="RemoveDoc(this.id,\''+ApprovalDocfiles[i].filename + '\')"></i></button></td>'
	    }else{
	    	ApprovalDochtml += '<td></td>';
	    	ApprovalDochtml += '<td></td>';
	    }
	    ApprovalDochtml += '</tr> '
	  }
    }
    $('.countingbx').text(count);
    $('#tbdyAppDoc').append(ApprovalDochtml);
    $('#Approval_doc').modal('hide');

}
// get User Email
function GetUserEmail(Id)
{
    var ResultItems=[];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=LogonName/Id,LogonName/Title,Email&$expand=LogonName&$filter=LogonName/Id eq '"+Id+"'";
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 			
            ResultItems = data.d.results[0].Email;  
        },
        error: function (data) 
        {  
            console.log("Error in getdata.");
        	console.log(data); 
        }  
    });
    return ResultItems;
}
// get User Id
function GetUserId(email)
{
    var ResultItems=[];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=LogonName/Id,LogonName/Title,Email&$expand=LogonName&$filter=Email eq '"+email+"'";
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 			
            ResultItems = data.d.results[0].LogonName.Id;  
        },
        error: function (data) 
        {  
            console.log("Error in getdata.");
        	console.log(data); 
        }  
    });
    return ResultItems;
}


// Column visibility

function checkColVisibility(condition, col, Columns){
	var colvalue = $('#'+col).val();
	colvalue= colvalue.trim().toString();
	var newCondition  = condition.replace(/Value/i,'colvalue');  //condition.find('Value').replaceWith(colvalue);
	console.log(newCondition);
	/*if(newCondition){	
	//if(colvalue == newCondition.split('==')[1].trim()){
		//alert('yes');
		var ColArray = Columns.split(",");
		for(var c=0; c< ColArray.length; c++){
			$('#'+ColArray[c]).removeClass('hide');//show();
		}	
	}else */
	if(newCondition){
		//alert('no');
		var ColArray = Columns.split(",");
		for(var c=0; c< ColArray.length; c++){
			$('#'+ColArray[c]).addClass('hide');//hide();
		}
	}
}

// Auto-Populate on fill

function AutopopulateData(PoplePickerId,Columns,selectedUsersInfo, PopulatedFieldsId){
	//var UserInfo = SPClientPeoplePicker.SPClientPeoplePickerDict[PoplePickerId].GetAllUserInfo();
	if(selectedUsersInfo.length > 0){
		var email = selectedUsersInfo;
		var UserId= GetUserId(email);
		for(var u=0;u<PopulatedFieldsId.length;u++ ){
			var resultColumns= $.grep(Columns, function(v) {
				return v.ID == PopulatedFieldsId[u];
			});
			if(resultColumns[0].AutoPopulateOf != null)  {
				if(resultColumns[0].AutoPopulateValue == 'Company' || resultColumns[0].AutoPopulateValue == 'Department' || resultColumns[0].AutoPopulateValue == 'OfficeLocation'){
				var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select="+resultColumns[0].AutoPopulateValue+"/Title&$expand="+resultColumns[0].AutoPopulateValue+"&$filter=LogonName/Id eq '"+UserId+"' and Status eq 'Active'";
				var	ResultActive = RequestGetdata(QueryCheckActive);	
				$('#'+resultColumns[0].ColumnName).val(ResultActive[0][resultColumns[0].AutoPopulateValue].Title);				
				}else{
				var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select="+resultColumns[0].AutoPopulateValue+"&$filter=LogonName/Id eq '"+UserId+"' and Status eq 'Active'";
				var	ResultActive = RequestGetdata(QueryCheckActive);	
				var filterVal = ResultActive.length > 0 ? ResultActive[0][resultColumns[0].AutoPopulateValue] : '';
				if(resultColumns[0].AutoPopulateValue == 'JoiningDate' || resultColumns[0].AutoPopulateValue == 'DateOfBirth' || resultColumns[0].AutoPopulateValue == 'DateOfAnniversary'){
				filterVal = filterVal ? moment(filterVal).format('LL') : '';
				}
				var colId =  $("#"+PopulatedFieldsId[u]).find("input").attr('id');
				$('#'+resultColumns[0].ColumnName).val(filterVal);				
				}		
			}else{
				if(resultColumns[0].DefaultValue == 'Manager' ){
				 	 var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ManagerLoginName/Id,ManagerLoginName/Title&$expand=ManagerLoginName&$filter=LogonName/Id eq '"+UserId+"' and Status eq 'Active'";
					 var arrUser = RequestGetdata(QueryCheckActive);								
					 peoplePickerDiv = $("[id$='"+resultColumns[0].ColumnName+"_TopSpan']");
					 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
					 var UserTitle = GetUserLogin(arrUser[0].ManagerLoginName.Id);
					 peoplePicker.DeleteProcessedUser();
					 peoplePicker.AddUserKeys(UserTitle);								
				}else if(resultColumns[0].DefaultValue == 'Indirect Manager'){
					 var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=IndirectManager/Id,IndirectManager/Title&$expand=IndirectManager&$filter=LogonName/Id eq '"+UserId+"' and Status eq 'Active'";
					 var arrUser = RequestGetdata(QueryCheckActive);								
					 peoplePickerDiv = $("[id$='"+resultColumns[0].ColumnName+"_TopSpan']");
					 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
					 var UserTitle = GetUserLogin(arrUser[0].IndirectManager.Id);
					 peoplePicker.DeleteProcessedUser();
					 peoplePicker.AddUserKeys(UserTitle);							
				}else if(resultColumns[0].DefaultValue == 'HOD'){
					var Dept = getUserDept(UserId);
					var role = 'Head of the Department';
					var EntityUser = [];
			 		GetlistData("/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=Department/ID,Department/DepartmentName,WebPartName,Company/ID,Company,Contributors/ID,Contributors/Title&$expand=Company,Contributors,Department&$filter=Company/ID eq '"+companyIdNavigation+"'and Department/DepartmentName eq '"+Dept +"' and WebPartName eq '"+role +"'").done(function (USers) {			 
				  	 if(USers.d.results.length > 0){
					  	 var nwApprover = USers.d.results[0].Contributors.results;
					  	 if(nwApprover.length > 0){
						 	for(b=0; b<nwApprover.length; b++){						 	
								var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=LogonName/Id,LogonName/Title,Email&$expand=LogonName&$filter=LogonName/Id eq '"+nwApprover[b].ID+"' and Status eq 'Active'";
					 			var arrSubApprover = RequestGetdata(QueryCheckActive);					
						 		EntityUser.push(arrSubApprover[0].Email);						
						    }
						  }else{
							 alert('Users are not available for '+ role );
						  }
					   }    					  	    		 		 
					 });			 	
					 peoplePickerDiv = $("[id$='"+resultColumns[0].ColumnName+"_TopSpan']");
					 var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];				 					
					 peoplePicker.DeleteProcessedUser();
					 peoplePicker.AddUserKeys(EntityUser[0]);	
				}
			
			}
		}
	}
}