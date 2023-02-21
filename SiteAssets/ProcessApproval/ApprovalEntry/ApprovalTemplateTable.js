$( function() {
	$( ".datepicker" ).datepicker({ dateFormat: 'MM dd, yy' });
});
  
  
var totalrow = 0;
var tblcol = []; 
var IsTotalneed = false;
var ResultData = '';
//var tblcol = ''; 

var FormulaColumnListTbl =[];
var ColumnTotalList=[];
var arrNumValtbl=[];
var arrDateTbl =[];
var arrMandatetbl=[];
var arrcoldefval =[];
var QueryTableData = [];
var ColumnValuesTotal=[];
function appenedtableformat(itemid, tempId, PermissionStatus, width, tblEdit)
{
	var restendpoint = "/_api/web/lists/getbytitle('ApprovalTemplateTable')/items?$select=*,SetupID/ID&$expand=SetupID&$filter=SetupID eq '"+itemid+"'&$orderby=SequenceNo asc";
    GetData(restendpoint).then(function(response)
    {
    	if(response.d.results.length > 0)
    	{	    		
    		var valuefordefault = '';
    		//arrNumValtbl =[];
    		//arrMandatetbl =[];
        	tblcol.push({'tblId' :itemid, 'data': response.d.results});         
        	ResultData = response.d.results;        	
        	var tableappend = '<div class="col-xs-12 text-center dyamicTableboxes" id="tbldiv_'+itemid+'"><div class = "wrapping_dynamic" id="tbldivWrap_'+itemid+'">';     	
            tableappend += "<table class='table table-striped table-bordered ' id='TblApprovalEntry_"+itemid+"'><thead class='thead-dark'><tr>";                  
           	tableappend += "<th class='columnnametxt' scope='col'  style='text-align:center'>#</th>";
	          $.map(response.d.results, function(responsere){
	              tableappend +="<th class='columnnametxt' scope='col' style='text-align:center' mandatorycol='"+responsere.Mandatory+"' alerttext='"+responsere.Title+"'>"+responsere.Title+"</th>";
	          })
	          tableappend += "<tr></thead><tbody class='tablebosyappend'><tr id='"+itemid+"_1'>";
	          tableappend +="<td class='Colsequence' value='1' >1</td>";  
	          QueryTableData = []	              
	          if(window.location.href.indexOf("?")> -1) 
				{
					var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
					if(Passingtoken == 'Process Steps' || Passingtoken == 'Draft')
					{						
						//ColumnValuesTotal=[];
						var cuntrIndx = 0;
						var ItemId = window.atob(titanForWork.getQueryStringParameter('RecNo'));
						var restendpoint = "/_api/web/lists/getbytitle('ApprovalProcessListTable')/items?$select=*,SetupID/ID,RequestID/ID,ColumnPeople1/Id,ColumnPeople1/Title,ColumnPeople2/Id,ColumnPeople2/Title,ColumnPeople3/Id,ColumnPeople3/Title,ColumnPeople4/Id,ColumnPeople4/Title,ColumnPeople5/Id,ColumnPeople5/Title&$expand=SetupID,RequestID,ColumnPeople1,ColumnPeople2,ColumnPeople3,ColumnPeople4,ColumnPeople5 &$filter=RequestID eq '"+ItemId+"' and SetupID eq '"+itemid+"'&$orderby=ID asc";
    					QueryTableData = RequestData(restendpoint);	
    					if(QueryTableData.length> 0){    					
    					for(i=0;i< QueryTableData.length;i++)  
			          	{	
			          	var count = 1;
		          		if(i > 0){
		          			count = i+1;
		          			tableappend += "<tr id='"+itemid+"_"+count+"'>";
		          			tableappend +="<td class='Colsequence' value='"+count+"' >"+count+"</td>";  	          		
		          		}				       
				       	for(x=0;x<ResultData.length;x++)
						  {	
						  	if(ResultData[x].Mandatory == true){
				          		arrMandatetbl.push({'tblId' : itemid, 'colname' : ResultData[x].ColumnName, 'Title' : ResultData[x].Title, 'Mandatory' : ResultData[x].Mandatory })
				          	}
				          	tableappend +="<td class='columnnametxt' name='"+ResultData[x].Title+"' mandatorycol='"+ResultData[x].Mandatory+"' alerttext='"+ResultData[x].Title+"' coltype='"+ResultData[x].ColumnType +"'>";
								var cuntrIndx = 0;
								var ColumnValue = '';
								ColumnValue = ColumnValueByColumnNameforTable(QueryTableData,ResultData[x].ColumnName,i)    								
								if(ColumnValue ==  null)	{	valuefordefault = '';	}else{	valuefordefault = ColumnValue;	}
								if(ResultData[x].NeedTotal == true && ResultData[x].ColumnType == 'Number')
								{
									var ColumnName=ResultData[x].Title;        								
									ColumnValuesTotal.push({ Column:ColumnName, Total:ColumnValueByColumnNameforTable(QueryTableData, ResultData[x].ColumnName,i), TableId:ResultData[x].SetupIDId, ColIndex:x });
								} 
							if (ResultData[x].ColumnType == "Date" || ResultData[x].ColumnType == "DueDate") 
							{
								arrDateTbl.push({'tId' : itemid,'title': ResultData[x].Title,'col': ResultData[x].ColumnName, 'validation': ResultData[x].DateValidation});
							//	tableappend += '<input type="text" class="form-control input-sm stopenterdata Date"  data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" id="tbl_'+responsere.ColumnName+'"></td>'; 
								var c= i+1;
								if(valuefordefault == "Invalid date"){valuefordefault = ''} 
								if(PermissionStatus == ''){								
								tableappend += '<input type="text" class="form-control input-sm Date datepicker"   data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+valuefordefault.toString()+'"></td>'; 
								}else{
								tableappend += '<input type="text" class="form-control input-sm "   data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+valuefordefault+'"></td>'; 
								}
							}else if (ResultData[x].ColumnType == "Checkbox") {		
								if(valuefordefault == 0 ||valuefordefault == null || valuefordefault == ''){
									var value = '';
								}else{						
									var value = 'checked';
								}
								tableappend += '<input type="checkbox" class="input-sm checkbox_widthmange" value="'+value +'" data-original-value="'+ResultData[x].ColumnName+'"  id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" '+value+'>'; 								
							}
							else if(ResultData[x].ColumnType == 'Person'){
								var usr = '';
								if(valuefordefault != null && valuefordefault != ""){													
								 for(u=0;u<valuefordefault.results.length;u++){
								 /*	var arr = AllTaskUsersEmployeeuser.filter(function (filterData) {
									     return filterData.UserId == valuefordefault.results[u].Id;
									 }); */
									  var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=LogonName/Id,LogonName/Title,Email&$expand=LogonName&$filter=LogonName/Id eq '"+valuefordefault.results[u].Id+"' and Status eq 'Active'";
							 		  var arr = RequestGetdata(QueryCheckActive);					
									 if(PermissionStatus == ''){												
								 		usr = arr[0].EMail;
								 		tableappend += '<input type="text" class="form-control input-sm "   data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+usr+'"></td>'; 		
								 	}else{
								 		usr = arr[0].LoginName;
								 		tableappend += '<input type="text" class="form-control input-sm "   data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+usr+'"></td>'; 	
								 	}
								 }
								}
							/*	if(Passingtoken == 'Draft'){																	
									var classest = 'Cover_PPl ';
									ddpLabel = "tbl_"+itemid+"_"+count+"_"+ResultData[x].ColumnName;
									tableappend = '<div id="'+ddpLabel+'" class="dynamicvalfeachcls	'+classest+'" data-original-value = "'+ResultData[x].ColumnName+'" coltype ="'+ResultData[x].ColumnType+'"></div>';
									initializePeoplePicker(ddpLabel);
								//	setTimeout(bindUser(ddpLabel,valuefordefault),1000); 
								}*/
								
							}					
							else if(ResultData[x].ColumnType == 'Number')
							{
							if(ResultData[x].MinNumber != null && ResultData[x].MaxNumber != null){
								arrNumValtbl.push({'tId' : itemid,'title': ResultData[x].Title,'col': ResultData[x].ColumnName, 'min': ResultData[x].MinNumber,'max': ResultData[x].MaxNumber});
							}
							var datatypeval = '', setnumberlimit = '';
							if(ResultData[x].NumberValidation == "Integer"){
								datatypeval += "onkeypress='return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13 || event.charCode == 45) ? null : event.charCode >= 48 && event.charCode <= 57 '";//"onkeypress=' return isNumber(event)'";	//'onkeyup return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"'
								setnumberlimit += "maxlength='15'";
	
							}else if(ResultData[x].NumberValidation == "Decimal"){										
								
								setnumberlimit += "maxlength='15'";
								datatypeval += 'onkeydown = "isDecimal(event)";  onkeypress="isValidate(this)"'; 										
							}	
							if(ResultData[x].NeedTotal == true)
							{ 	
								ColumnTotalList.push({'Setup':itemid,'ColumnName':ResultData[x].Title})	
								IsTotalneed = true;
								var  Title = ResultData[x].Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', ''); Title= Title.replace(/[\])}[{(]/g, '');
								var IsCalculate = false, Formula ;
								if(ResultData[x].CalculatedValue == true && ResultData[x].ColumnName == 'CalculatedValue')
								{
									FormulaColumnListTbl.push({'Setup':itemid, 'Formula':ResultData[x].Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
									IsCalculate = true 
									Formula = ResultData[x].Formula;
									if(Formula != null)	{								
        							Formula = Formula.split(',');
									if(Formula.length>0)
									{
										var NewExp='';
										for(var q=0; q<Formula.length; q++)
										{
											NewExp = NewExp+ColumnValueByColumnNameforTableEquation(QueryTableData,Formula[q],i)
										}        											
										if(isMathExpression(NewExp) == true)
										{
											var result = math.evaluate(NewExp);        												 
											result = result.toFixed(2); 
											result = result.toString();        											
											//tbody = tbody+ "<td style='text-align: right;'>"+result+"</td>";        												
											tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
											var ColumnName=ResultData[x].Title;        												
											if(ResultData[x].NeedTotal == true)
											{
												ColumnValuesTotal.push({
													Column:ColumnName, Total:result, TableId:QueryTableData[i].SetupIDId , ColIndex:x,
												});
											}
										}else{
											tableappend += "<td>"+NewExp+"</td>";
											//tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+ResultData[x].ColumnName+'" ></td>';      
										}  
									}
									}
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+ResultData[x].ColumnName+'" readonly ></td>';      
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
									//DynamicSum(itemid,responsere.Title,IsCalculate,Formula);
								}
								else
								{
									tableappend += '<input type="text" class="form-control input-sm NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(this,\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'"></td>';      
								}
								
							 //  	DynamicSum('',itemid,responsere.Title,IsCalculate,Formula);
							}
							else
							 {
								if(ResultData[x].CalculatedValue == true && ResultData[x].ColumnName == 'CalculatedValue')
								{
									var  Title = ResultData[x].Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', '');Title= Title.replace(/[\])}[{(]/g, '');
									FormulaColumnListTbl.push({'Setup':itemid, 'Formula':ResultData[x].Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
									IsCalculate = true 
									Formula = ResultData[x].Formula;
									if(Formula != null)	{								
        							Formula = Formula.split(',');
									if(Formula.length>0)
									{
										var NewExp='';
										for(var q=0; q<Formula.length; q++)
										{
											NewExp = NewExp+ColumnValueByColumnNameforTableEquation(QueryTableData,Formula[q],i)
										}        											
										if(isMathExpression(NewExp) == true)
										{
											var result = math.evaluate(NewExp);        												 
											result = result.toFixed(2); 
											result = result.toString();        											
											//tbody = tbody+ "<td style='text-align: right;'>"+result+"</td>";        												
											tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
											var ColumnName=ResultData[x].Title;        												
											if(ResultData[x].NeedTotal == true)
											{
												ColumnValuesTotal.push({
													Column:ColumnName, Total:result, TableId:QueryTableData[i].SetupIDId , ColIndex:x,
												});
											}
										}else{
											tableappend += "<td>"+NewExp+"</td>";											
										}  
									}
									}																																							
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
								}else{
									tableappend += '<input type="text" class="form-control input-sm" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" onkeyup="CalculateNew(this,\''+itemid+'\')"></td>';      
								}
							 }
							}
							else
							{
								if(ResultData[x].ColumnType == "Multiline"){
			               		tableappend += "<div class='form-control input-sm' "+PermissionStatus+" data-original-value='"+ResultData[x].ColumnName+"' value='"+valuefordefault +"' style='height:100% !important;' id='tbl_"+itemid+"_"+count+"_"+ResultData[x].ColumnName+"'>"+valuefordefault +"</div></td>";
			               		}else{ 	
			               			var maxl = ResultData[x].TextValidation ? ResultData[x].TextValidation : '250';
									tableappend += '<input class="form-control input-sm" '+PermissionStatus+'  data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" maxlength="'+maxl +'"></td>';      
								}
							}
							//cuntrIndx = cuntrIndx + 1
						}//)
						tableappend += "</tr>";					
						}
					  }else{					
				       	for(x=0;x<ResultData.length;x++)
						  {	
				          	tableappend +="<td class='columnnametxt' name='"+ResultData[x].Title+"' mandatorycol='"+ResultData[x].Mandatory+"' alerttext='"+ResultData[x].Title+"' coltype='"+ResultData[x].ColumnType +"'>";
								var cuntrIndx = 0;
								var ColumnValue = '';
							//	ColumnValue = ColumnValueByColumnNameforTable(QueryTableData,ResultData[x].ColumnName,i)    								
								if(ColumnValue ==  null)	{	valuefordefault = '';	}else{	valuefordefault = ColumnValue;	}
								if(ResultData[x].NeedTotal == true && ResultData[x].ColumnType == 'Number')
								{
									var ColumnName=ResultData[x].Title;        								
								//	ColumnValuesTotal.push({ Column:ColumnName, Total:ColumnValueByColumnNameforTable(QueryTableData, ResultData[x].ColumnName,i), TableId:ResultData[x].SetupIDId, ColIndex:x });
								} 
							if (ResultData[x].ColumnType == "Date" || ResultData[x].ColumnType == "DueDate") 
							{
								arrDateTbl.push({'tId' : itemid,'title': ResultData[x].Title,'col': ResultData[x].ColumnName, 'validation': ResultData[x].DateValidation});
							//	tableappend += '<input type="text" class="form-control input-sm stopenterdata Date"  data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" id="tbl_'+responsere.ColumnName+'"></td>'; 
							//	var c= i+1;
								if(valuefordefault == "Invalid date"){valuefordefault = ''} 
								if(PermissionStatus == ''){
								tableappend += '<input type="text" class="form-control input-sm Date datepicker"   data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+valuefordefault.toString()+'"></td>'; 
								}else{
								tableappend += '<input type="text" class="form-control input-sm "   data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+valuefordefault+'"></td>'; 
								}
							}else if (ResultData[x].ColumnType == "Checkbox") {	
								if(valuefordefault == 0 ||valuefordefault == null || valuefordefault == ''){
									var value = '';
								}else{				
									var value = 'checked';
								}			
								tableappend += '<input type="checkbox" class="input-sm checkbox_widthmange" value="" data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" '+value+'>'; 								
							}						
							else if(ResultData[x].ColumnType == 'Number')
							{
							if(ResultData[x].MinNumber != null && ResultData[x].MaxNumber != null){
								arrNumValtbl.push({'tId' : itemid,'title': ResultData[x].Title,'col': ResultData[x].ColumnName, 'min': ResultData[x].MinNumber,'max': ResultData[x].MaxNumber});
							}
							var datatypeval = '', setnumberlimit = '';
							if(ResultData[x].NumberValidation == "Integer"){
								datatypeval += "onkeypress='return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13 || event.charCode == 45) ? null : event.charCode >= 48 && event.charCode <= 57 '";//"onkeypress=' return isNumber(event)'";	//'onkeyup return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"'
								setnumberlimit += "maxlength='15'";
	
							}else if(ResultData[x].NumberValidation == "Decimal"){										
								
								setnumberlimit += "maxlength='15'";
								datatypeval += 'onkeydown = "isDecimal(event)";  onkeypress="isValidate(this)"'; 										
							}	
							if(ResultData[x].NeedTotal == true)
							{ 	
								ColumnTotalList.push({'Setup':itemid,'ColumnName':ResultData[x].Title})	
								IsTotalneed = true;
								var  Title = ResultData[x].Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', ''); Title= Title.replace(/[\])}[{(]/g, ''); //Title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');  
								var IsCalculate = false, Formula ;
								if(ResultData[x].CalculatedValue == true)
								{
									FormulaColumnListTbl.push({'Setup':itemid, 'Formula':ResultData[x].Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
									IsCalculate = true 
									Formula = ResultData[x].Formula;
									if(Formula != null)	{								
        							Formula = Formula.split(',');
									if(Formula.length>0)
									{
										var NewExp='';
										for(var q=0; q<Formula.length; q++)
										{
											//NewExp = NewExp+ColumnValueByColumnNameforTableEquation(QueryTableData,Formula[q],i)
										}        											
										if(isMathExpression(NewExp) == true)
										{
											var result = math.evaluate(NewExp);        												 
											result = result.toFixed(2); 
											result = result.toString();        											
											//tbody = tbody+ "<td style='text-align: right;'>"+result+"</td>";        												
											tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
											var ColumnName=ResultData[x].Title;        												
											if(ResultData[x].NeedTotal == true)
											{
												ColumnValuesTotal.push({
													Column:ColumnName, Total:result, TableId:QueryTableData[i].SetupIDId , ColIndex:x,
												});
											}
										}else{
										//	tableappend += "<td>"+NewExp+"</td>";
											tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" ></td>';      
										}  
									}
									}
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
									//DynamicSum(itemid,responsere.Title,IsCalculate,Formula);
								}
								else
								{
									tableappend += '<input type="text" class="form-control input-sm NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(this,\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'"></td>';      
								}
								
							 //  	DynamicSum('',itemid,responsere.Title,IsCalculate,Formula);
							}
							else
							 {
								if(ResultData[x].CalculatedValue == true && ResultData[x].ColumnName == 'CalculatedValue')
								{
									var  Title = ResultData[x].Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', '');Title= Title.replace(/[\])}[{(]/g, '');
									FormulaColumnListTbl.push({'Setup':itemid, 'Formula':ResultData[x].Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
									IsCalculate = true 
									Formula = ResultData[x].Formula;
									if(Formula != null)	{								
        							Formula = Formula.split(',');
									if(Formula.length>0)
									{
										var NewExp='';
										for(var q=0; q<Formula.length; q++)
										{
											NewExp = NewExp+ColumnValueByColumnNameforTableEquation(QueryTableData,Formula[q],i)
										}        											
										if(isMathExpression(NewExp) == true)
										{
											var result = math.evaluate(NewExp);        												 
											result = result.toFixed(2); 
											result = result.toString();        											
											//tbody = tbody+ "<td style='text-align: right;'>"+result+"</td>";        												
											tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
											var ColumnName=ResultData[x].Title;        												
											if(ResultData[x].NeedTotal == true)
											{
												ColumnValuesTotal.push({
													Column:ColumnName, Total:result, TableId:QueryTableData[i].SetupIDId , ColIndex:x,
												});
											}
										}else{
										//	tableappend += "<td>"+NewExp+"</td>";											
										}  
									}
									}																																							
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
								}else{
									tableappend += '<input type="text" class="form-control input-sm" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" onkeyup="CalculateNew(this,\''+itemid+'\')"></td>';      
								}
							 }
							}
							else
							{
								if(ResultData[x].ColumnType == "Multiline"){
			               		tableappend += "<div class='form-control input-sm' "+PermissionStatus+" data-original-value='"+ResultData[x].ColumnName+"' value='"+valuefordefault +"' style='height:100% !important;' id='tbl_"+itemid+"_"+count+"_"+ResultData[x].ColumnName+"'>"+valuefordefault +"</div></td>";
			               		}else{ 	
			               			var maxl = ResultData[x].TextValidation ? ResultData[x].TextValidation : '250';
									tableappend += '<input class="form-control input-sm" '+PermissionStatus+'  data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" id="tbl_'+itemid+'_'+count+'_'+ResultData[x].ColumnName+'" maxlength="'+maxl +'"></td>';      
								}
							}
							//cuntrIndx = cuntrIndx + 1
						}//)
						tableappend += "</tr>";
					  }
					
				    }else{
			  $.map(response.d.results, function(responsere)
	          {	
				if(window.location.href.indexOf("?")> -1) 
				{
					var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));
					if(Passingtoken == 'Initiation')
					{	
						tableappend +="<td class='columnnametxt' name='"+responsere.Title+"' mandatorycol='"+responsere.Mandatory+"' alerttext='"+responsere.Title+"' coltype='"+responsere.ColumnType +"'>";
					}
				}
				valuefordefault = responsere.DefaultValue ? responsere.DefaultValue : '';
				arrcoldefval.push({'tblId' : itemid, 'colname' : responsere.ColumnName, 'Type': responsere.ColumnType , 'Title' : responsere.Title, 'Defval' :  valuefordefault});
				if(responsere.Mandatory == true){ 
					arrMandatetbl.push({'tblId' : itemid, 'colname' : responsere.ColumnName, 'Title' : responsere.Title, 'Mandatory' : responsere.Mandatory })      			
				}
          	    if (responsere.ColumnType == "Date" || responsere.ColumnType == "DueDate") 
	            {
	            	arrDateTbl.push({'tId' : itemid,'title': responsere.Title,'col': responsere.ColumnName, 'validation': responsere.DateValidation});
				//	tableappend += '<input type="text" class="form-control input-sm stopenterdata Date"  data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" id="tbl_'+responsere.ColumnName+'"></td>'; 
					if(PermissionStatus == ''){
					tableappend += '<input type="text" class="form-control input-sm Date datepicker"   data-original-value="'+responsere.ColumnName+'" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'"></td>'; 
					}else{
					tableappend += '<input type="text" class="form-control input-sm Date datepicker"   data-original-value="'+responsere.ColumnName+'" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'"></td>'; 
					}
				}			
				else if (responsere.ColumnType == "Checkbox") {
					if(valuefordefault == 0 ||valuefordefault == null || valuefordefault == ''){
						var value = '';
					}else{
						var value = 'checked';
					}												
					tableappend += '<input type="checkbox" class="input-sm checkbox_widthmange" value="" data-original-value="'+responsere.ColumnName+'"  id="tbl_'+itemid+'_1_'+responsere.ColumnName+'" '+value+'>'; 					
				}
				else if(responsere.ColumnType == 'Number')
				{
					var datatypeval = '', setnumberlimit = '';
					if(responsere.MinNumber != null && responsere.MaxNumber != null){
						arrNumValtbl.push({'tId' : itemid,'title':responsere.Title, 'col': responsere.ColumnName, 'min': responsere.MinNumber,'max': responsere.MaxNumber});
					}
					if(responsere.NumberValidation == "Integer"){
						datatypeval += "onkeypress='return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13 || event.charCode == 45) ? null : event.charCode >= 48 && event.charCode <= 57 '"; //return isNumber(event)'";	//'onkeyup return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"'
						setnumberlimit += "maxlength='15'";			
					}else if(responsere.NumberValidation == "Decimal"){											
						setnumberlimit += "maxlength='15'";
						datatypeval += 'onkeydown= "isDecimal(event)";  onkeypress="isValidate(this)"'; 													
					}	

					if(responsere.NeedTotal == true)
					{ 
						ColumnTotalList.push({'Setup':itemid,'ColumnName':responsere.Title})	
						IsTotalneed = true;
						var  Title = responsere.Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', ''); Title= Title.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, ""); //replace(/[\])}[{(]/g, '');  Title= Title.replace(/[\])}[{(]/g, '');//Title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');  
						var IsCalculate = false, Formula ;
						if(responsere.CalculatedValue == true && responsere.ColumnName == 'CalculatedValue' )
						{
							FormulaColumnListTbl.push({'Setup':itemid, 'Formula':responsere.Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
					   		IsCalculate = true 
					   		Formula = responsere.Formula;
					   		if(Formula != null)	{								
        							Formula = Formula.split(',');
									if(Formula.length>0)
									{
										var NewExp='';
										for(var q=0; q<Formula.length; q++)
										{
											var evt = $.trim(Formula[q]);
											if(/^[a-zA-Z0-9- ]*$/.test(evt) == false)
											{
												NewExp = NewExp+evt;
											}
											//NewExp = //NewExp+ColumnValueByColumnNameforTableEquation(QueryTableData,Formula[q],i)
											else{											
												var FilteredValue = $.grep(ResultData, function(v) {
												return v.ColumnName == evt;
												});
												if(FilteredValue.length > 0){
												var CurrntVal = FilteredValue[0].DefaultValue ? FilteredValue[0].DefaultValue : 0; //$('td #tbl_'+itemid+'_1_'+evt).val()
												}else{
												var CurrntVal = evt;
												}
												if(CurrntVal == ""){CurrntVal = 0;}
												if(CurrntVal != undefined){
													NewExp = NewExp+CurrntVal;
												}else{
													NewExp = NewExp+evt;
												}
											}
										}        											
										if(isMathExpression(NewExp) == true)
										{
											var result = math.evaluate(NewExp);        												 
											result = result.toFixed(2); 
											result = result.toString();        																						
											tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'" readonly ></td>';      											
										}										
									  }
									}

					   	//	tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +'  '+datatypeval +' style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+valuefordefault +'" onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_'+responsere.ColumnName+'" readonly ></td>';      
					   		//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
					   		//DynamicSum(itemid,responsere.Title,IsCalculate,Formula);
					   	}
					   	else
					   	{
					   		tableappend += '<input type="text" class="form-control input-sm NeedTotal '+Title+'" '+setnumberlimit +'  '+datatypeval +' style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+valuefordefault +'" onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(this,\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'"></td>';      
					   	}
					 //  	DynamicSum('',itemid,responsere.Title,IsCalculate,Formula);
					}
					else
					{
						if(responsere.CalculatedValue == true && responsere.ColumnName == 'CalculatedValue' )
						{	
							var  Title = responsere.Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', ''); Title= Title.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, ""); //replace(/[\])}[{(]/g, ''); //Title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');  
							FormulaColumnListTbl.push({'Setup':itemid, 'Formula':responsere.Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
					   		IsCalculate = true 
					   		Formula = responsere.Formula;
					   		if(Formula != null)	{								
        							Formula = Formula.split(',');
									if(Formula.length>0)
									{
										var NewExp='';
										for(var q=0; q<Formula.length; q++)
										{
											var evt = $.trim(Formula[q]);
											if(/^[a-zA-Z0-9- ]*$/.test(evt) == false)
											{
												NewExp = NewExp+evt;
											}
											//NewExp = //NewExp+ColumnValueByColumnNameforTableEquation(QueryTableData,Formula[q],i)
											else{											
												var FilteredValue = $.grep(ResultData, function(v) {
												return v.ColumnName == evt;
												});
												var CurrntVal = FilteredValue[0].DefaultValue ? FilteredValue[0].DefaultValue : 0; //$('td #tbl_'+itemid+'_1_'+evt).val()
												if(CurrntVal == ""){CurrntVal = 0;}
												if(CurrntVal != undefined){
													NewExp = NewExp+CurrntVal;
												}else{
													NewExp = NewExp+evt;
												}
											}
										}        											
										if(isMathExpression(NewExp) == true)
										{
											var result = math.evaluate(NewExp);        												 
											result = result.toFixed(2); 
											result = result.toString();        																						
											tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'" readonly ></td>';      											
										}										
									  }
									}
					   		//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +'  '+datatypeval +' style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+valuefordefault +'"  onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'" readonly ></td>';      
					   		//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
					   	}else{
		            		tableappend += '<input type="text" class="form-control input-sm" '+setnumberlimit +'  '+datatypeval +' style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+valuefordefault +'" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'" onkeyup="CalculateNew(this,\''+itemid+'\')" ></td>';      
		            	}
		            }
				}
               	else
               	{	if(responsere.ColumnType == "Multiline"){
               		tableappend += "<div class='form-control input-sm' "+PermissionStatus+" data-original-value='"+responsere.ColumnName+"' value='"+valuefordefault +"' style='' id='tbl_"+itemid+"_1_"+responsere.ColumnName+"'>"+valuefordefault +"</div></td>";
               		}else{
               		var maxl = responsere.TextValidation ? responsere.TextValidation : '250';
	           		tableappend += '<input class="form-control input-sm" '+PermissionStatus+' data-original-value="'+responsere.ColumnName+'" value="'+valuefordefault +'" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'" maxlength="'+maxl+'"></td>';      
	           		}
	           	}
			})	
					
			}					
		}
			///	}   // 	tableappend += "</tr>";         	
          	
         	tableappend += "<tr class='totalfield' scope='col'>";
         	tableappend +="<td class='totalRecord' value=''>Total:</td>";      
         	if(QueryTableData.length > 0){         		
				var UniqueColumn = [...new Map(ColumnValuesTotal.map(item => [item['Column'], item])).values()];
				var FilteredValue = $.grep(ColumnValuesTotal, function(v) {
				return v.TableId == itemid;
				});
				var FinalColumnTotal=[];
	          	for(var w=0; w<UniqueColumn.length; w++)
				{
					var ColumnSum=0;
					var FilteredValueCol = $.grep(FilteredValue , function(v) {
						return v.Column == UniqueColumn[w].Column && v.Total != null;
					});
					
					if(FilteredValueCol.length>0)
					{
						for(var y=0; y<FilteredValueCol.length; y++)
						{
							ColumnSum = parseFloat(ColumnSum)+parseFloat(FilteredValueCol[y].Total);
						}
						FinalColumnTotal.push({ Total:ColumnSum, ColumnIndex:FilteredValueCol[0].ColIndex, });								
					}									
				}
         		for(var e=0;e<ResultData.length+1;e++)
				{									
					if(e < ResultData.length)
					{
						var _FilteredValue = $.grep(FinalColumnTotal, function(v) { return v.ColumnIndex == e ; });
						
						var StatusFlag = false;
						if(_FilteredValue.length>0) { StatusFlag = true; }		
						var title = ResultData[e].Title.replaceAll(' ','');title= title.replace('%', '');title= title.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "");
						if(StatusFlag == true)
						{						
						//	TotalTr= TotalTr+ "<td style='text-align: right;'>"+_FilteredValue[0].Total.toFixed(2)+"</td>";
					//	setTimeout(SetSummarizedValue(itemid, title, _FilteredValue[0].Total.toFixed(2)),4000);  
						tableappend += "<td style='text-align: right;'><span id='ttlval_"+itemid+"_"+title+"'  value='"+_FilteredValue[0].Total.toFixed(2)+"'>"+_FilteredValue[0].Total.toFixed(2)+"</span></td>";
						}
						else
						{
							if(e == 0)
							{
								//TotalTr= TotalTr+ "<td></td>";
								tableappend += "<td></td>";
							}
							else
							{
								//TotalTr= TotalTr+ "<td></td>";
								tableappend += "<td></td>";
							}
						}
					}
					else
					{
						//TotalTr= TotalTr+ "</tr>";
						tableappend += "</tr>";
					}
					}
         	}else{
	        $.map(response.d.results, function(responsere){
	        	if(responsere.NeedTotal == true && responsere.ColumnType == 'Number'){
	        		valuefordefault = responsere.DefaultValue ? responsere.DefaultValue : '';
	        		if(valuefordefault == '' || valuefordefault  == null){
	        			Formula = responsere.Formula;
					   		if(Formula != null)	{								
        							Formula = Formula.split(',');
									if(Formula.length>0)
									{
										var NewExp='';
										for(var q=0; q<Formula.length; q++)
										{
											var evt = $.trim(Formula[q]);
											if(/^[a-zA-Z0-9- ]*$/.test(evt) == false)
											{
												NewExp = NewExp+evt;
											}
											//NewExp = //NewExp+ColumnValueByColumnNameforTableEquation(QueryTableData,Formula[q],i)
											else{											
												var FilteredValue = $.grep(ResultData, function(v) {
												return v.ColumnName == evt;
												});
												if(FilteredValue.length > 0){
												var CurrntVal = FilteredValue[0].DefaultValue ? FilteredValue[0].DefaultValue : 0; //$('td #tbl_'+itemid+'_1_'+evt).val()
												}else{
												CurrntVal =  evt;
												}												
												if(CurrntVal == ""){CurrntVal = 0;}
												if(CurrntVal != undefined){
													NewExp = NewExp+CurrntVal;
												}else{
													NewExp = NewExp+evt;
												}
											}
										}        											
										if(isMathExpression(NewExp) == true)
										{
											var result = math.evaluate(NewExp);        												 
											result = result.toFixed(2); 
											valuefordefault = result = result.toString(); 											    																																	
											//tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'" readonly ></td>';      											
										}										
									  }
									}
	        		}
	        		var title = responsere.Title.replaceAll(' ','');title= title.replace('%', '');title=title.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "");
         			//SetSummarizedValue(itemid, title, valuefordefault); 
         			//valuefordefault = valuefordefault ? valuefordefault : 0; 
         			tableappend += "<td class='' style='text-align: right' value=''><span id='ttlval_"+itemid+"_"+title+"'  value='"+valuefordefault +"'>"+valuefordefault +"</span></td>";
         			}else{
         			tableappend += "<td class='' value=''><span id='ttlval'></span></td>";
         			}
         	})          	       	         	
          	tableappend += "</tr>";
          	}
          	tableappend += "</tbody></table></div>";	        
            tableappend += "<button  type='button' id='new-row-button"+itemid+"' class='btn btn-dark setmargin' style> Add Row</button>";                      
            tableappend += "</div>";
           $("#appenddyamicboxes").append(tableappend);  
           

         /*  //FormulaColumnListTbl
		    var FilteredRec = $.grep(FormulaColumnListTbl, function(v) {
		    				return v.Setup == itemid;
						});
			if(FilteredRec.length>0)
			{
				for(var i=0; i<FilteredRec.length; i++)
				{
					DynamicCalculateValue(elem, FilteredRec[i].ColumnName, FilteredRec[i].Formula,FilteredRec[i].Setup,'true' );
				}
			
			}  */

                    
        }    
    })
    $( ".datepicker" ).datepicker({ dateFormat: 'MM dd, yy' });
    var editableTable = new BSTable("TblApprovalEntry_"+itemid,{
		    $addButton: $('#new-row-button'+itemid)
		});editableTable.init();		
		$("#TblApprovalEntry_"+itemid).find("thead").find("tr").last().hide();
		$("#TblApprovalEntry_"+itemid).find("tbody").find("tr").find("td #bEdit").hide();
		$("#TblApprovalEntry_"+itemid).find("tbody").find("tr").find("td #bDel").hide();
		$("#TblApprovalEntry_"+itemid).find("tbody").find("tr").last().find("td #bDel").hide();
		$('#bEdit').hide();totalrow =1;	
		$("#TblApprovalEntry_"+itemid).find("tbody").find('tr:last').find("td[name='bstable-actions']").hide(); 
		var tWidth = width ? width : '100';
		if(tWidth == '50'){
			$('#tbldiv_'+itemid).addClass('col-md-6 fifty_centent');
			$('#tbldivWrap_'+itemid).addClass('fifty_centent only_heading');		
			$('#tbldivWrap_'+itemid).css({'width':'100%', 'max-height':'200px'});
			$("#TblApprovalEntry_"+itemid).css({'width' : '100%'});
		}else{
			$("#TblApprovalEntry_"+itemid).css('min-width',tWidth+'%');
		}
		var Field = $("#TblApprovalEntry_"+itemid).find("tbody").find("tr").first().find('td')		
		if(PermissionStatus != ''){
		 if(tblEdit.length > 0){
		 if(tblEdit[0].TableEditScope == 'Add Row'){
		    $("#TblApprovalEntry_"+itemid).find("input,button,textarea,select").attr("disabled", false);
		    console.log('Add Row');
		  //  for(let v=0;v<QueryTableData.length;v++){				
				var filtertbl = $.grep(tblcol, function(v) {
					return v.tblId == itemid
				});  
	 			SetDatpickerNdropDown(filtertbl[0].data,'tbl', "TblApprovalEntry_"+itemid,Field,ResultData );   			 	
			// }
			//$("#new-row-button"+itemid).attr("disabled", "false");
		 }else if(tblEdit[0].TableEditScope == 'Columns'){
		  if(tblEdit[0].TableColumns != null){
				var colnm = tblEdit[0].TableColumns.results;
				$("#TblApprovalEntry_"+itemid).find("input,button,textarea,select").attr("disabled", 'false');
				$("#new-row-button"+itemid).attr("disabled", "false");				
				for(var c = 0;c < colnm.length;c++)
				{
				//	$("#TblApprovalEntry_"+itemid).find("td[name='"+colnm[c].Title+"'] input").prop("disabled", "false");
					$("#TblApprovalEntry_"+itemid).find("td[name='"+colnm[c].Title+"']").find("input,button,textarea,select").prop("disabled", false);
				}
			//	for(let v=0;v<QueryTableData.length;v++){				
					var filtertbl = $.grep(tblcol, function(v) {
						return v.tblId == itemid
					});  
		 			SetDatpickerNdropDown(filtertbl[0].data,'tbl', "TblApprovalEntry_"+itemid,Field,ResultData );   			 	
			 //	}			
			}
		 }else{
		 	$("#TblApprovalEntry_"+itemid).find("input,button,textarea,select").attr("disabled", "true");
		 	//$("#TblApprovalEntry_"+itemid).find("td input,button,textarea,select").attr("disabled", "true");
			$("#new-row-button"+itemid).attr("disabled", "true");
		 }
		 }
		}else{
		if(QueryTableData.length > 0){	
		$("#TblApprovalEntry_"+itemid).find("td input,button,textarea,select").prop("disabled", "false");	
		for(let v=0;v<QueryTableData.length;v++){
		//	for(var t=0; t<tblcol.length;t++){	 		
			var filtertbl = $.grep(tblcol, function(v) {
							return v.tblId == itemid
						});  
	 			//SetDatpickerNdropDown(filtertbl[0].data,'tbl', "TblApprovalEntry_"+itemid,Field,ResultData );   
	 	//	}
	 	}
		}else{
			var _filtertbl = $.grep(tblcol, function(v) {
							return v.tblId == itemid
					});  
		//	for(var t=0; t<tblcol.length;t++){	 		
	 			SetDatpickerNdropDown(_filtertbl[0].data,'tbl', "TblApprovalEntry_"+itemid,Field,ResultData );   	 		
	 	//	}  
	 	}
	 	if(IsTotalneed == false){
			$('.totalfield').hide()
		}
		}  	 	
		
  }


  function GetData(restURL) {
    var def = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + restURL,
        async:false,
        contentType: "application/json;odata=verbose",
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            def.resolve(data);
        },
        error: function (data) {
            def.reject(data);
        }
    });
    return def.promise();
	}
	var ischeck = false;
// To Submit table data in list
	function SubmitTbltcols(ProcessId){
				var sts = false;
				var dfd = $.Deferred();
				var requiredfileds = [];
				var tableDatacreate = "";
				var intarr = $("input[name='selector']:checked").attr('templateid');
				var nu = parseInt(intarr);
				var requestforstring = $("input[name='selector']:checked").attr('requestfor'); 
				var requestTile = $('#titleid').text();		
				
				$("#appenddyamicboxes > .dyamicTableboxes > .wrapping_dynamic > .table").each(function () {
				var CurrTableId = $(this).attr('id');CurrTableId = CurrTableId.split('_')[1];					
				console.log(CurrTableId);
					$(this).find(".tablebosyappend > tr:not(:last-child)").each(function () {
						var IsNull =  false; ischeck = false;	
						var itemProperties = {};
					//	itemProperties['RequestFor'] = requestforstring;
						itemProperties['Title'] = requestTile;
						if(ProcessId != ''){
							itemProperties['RequestIDId'] = ProcessId;			
						}else{
							itemProperties['RequestIDId'] = '' ;
						}
						itemProperties['SetupIDId'] = CurrTableId;						
					    $(this).find("td:not(:last-child)").each(function () {					  	
					  	//alert(ischeck );if(ischeck){return false;}
						var key = $(this).find('.input-sm').attr('data-original-value');  // $(this).find('th').eq($this.index()).text();						//$(this).find(".columnnametxt").attr("value");				
						//itemProperties[key] = $(this).find(".input-sm").val();
						if($(this).attr('coltype') == 'Checkbox'){
							itemProperties[key] = $(this).find(".input-sm").prop("checked") 
						}else if($(this).attr('coltype') == 'Date'){
							var val = $(this).find(".input-sm").val();
							if(val == ''){ val = null }
							itemProperties[key] = val ; 
						}else if($(this).attr('coltype') == 'Person'){
							var EntityUsers= [];
							var id = $(this).find('div').attr('id')
							var peoplePickerDiv = $("[id$='"+id+"_TopSpan']"); 
							var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id]; 
							var users = peoplePicker.GetAllUserInfo()				
							for (var j = 0; j < users.length; j++) 
							{	var flag=false;
							/*	var arrUSer = AllTaskUsersEmployeeuser.filter(function (filterData) {
									if(filterData.EMail == users[j].EntityData.Email){flag=true;}
									return filterData.EMail == users[j].EntityData.Email; });	*/
							var QueryCheckActive =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=LogonName/Id,LogonName/Title,Email&$expand=LogonName&$filter=Email eq '"+users[j].EntityData.Email+"' and Status eq 'Active'";
							var arrUSer = RequestGetdata(QueryCheckActive);		
							if(arrUSer[0].Email == users[j].EntityData.Email){flag=true;}								
							if(!flag){alert("Selected user "+users[j].DisplayText+" not in list"); return false;}			    
						    EntityUsers.push(arrUSer[0].UserId)	    
							}
							val = EntityUsers;
							itemProperties[key+'Id'] = {"results": EntityUsers}; //vval = EntityUsers;
						}											
						else{
							var val = $(this).find(".input-sm").val();
							if($(this).attr('coltype') == "Number" ){							
								if(key != undefined ){
									if(val == ''){
										itemProperties[key] = null;
									}else{
										itemProperties[key] = val;
									}
								}
							}else{
							if(val == ''){
								itemProperties[key] = ''; //$(this).find(".dynamicvalfeachcls").val();
								IsNull = true;
							}else{
								itemProperties[key] = val;
							}
							}
							
						}
						if ($(this).attr("mandatorycol") == "true" && $(this).find(".input-sm").val() == "") {
							var dyanmicvalhtml = $(this).attr('alerttext');
							requiredfileds.push(dyanmicvalhtml);
						}				
					})
					if(ischeck){return false;alert(ischeck);}	
				/*	if(IsNull == true){
						if (requiredfileds.length > 0) {
							for (let i = 0; i < requiredfileds.length; i++) {
								alert("Please enter the value for " + requiredfileds[i] + "");
								break;
							} 
						}
					}
					 else {
						if (requiredfileds.length > 0) {
							for (let i = 0; i < requiredfileds.length; i++) {
								alert("Please enter the value for " + requiredfileds[i] + "");
								break;
							} 
						}	 
					}		*/			
				var itemType = "SP.Data.ApprovalProcessListTableListItem";
				itemProperties["__metadata"] = { "type": itemType };								
				$.ajax({
		        url:_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalProcessListTable')/items",
		        type: "POST",
		        async: false,
		        data:JSON.stringify(itemProperties),
		        headers: {
		            "accept": "application/json;odata=verbose", 
		            "Content-Type": "application/json;odata=verbose",  
		            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
		            "X-HTTP-Method": "POST" 
		        },
		        success: function (data) {        
		        sts = true;  console.log('tbl saved');
		        }, 			
		        error: function (error) { 
		        console.log(error);alert(error.responseText);
		        return false;
		        }
		     });      		    
   		  //}
   		})  
     })	
      if(ischeck == true){return false;alert(ischeck);}	
     if(sts == true){	
       console.log('Table data submit successfully.');
   //  alert('Table data submit successfully.');
     }
	}
	
function DynamicSum(elem,tblID, Title, IsCal, Formula){
	if(Title != '' && Title != undefined)
	{
		var title = Title.replaceAll(' ','');title= title.replaceAll('%', '');    title= title.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "");
    	var calculated_total_sum = 0;        
    	$("#TblApprovalEntry_"+tblID+" ."+title+"").each(function (){
        	var get_textbox_value = $(this).val();
        	if(get_textbox_value == ""){get_textbox_value = 0;}
       	 	if ($.isNumeric(get_textbox_value)) {
            	calculated_total_sum += parseFloat(get_textbox_value);
            }                  
      	});
        	$("#ttlval_"+tblID+"_"+title).html(parseFloat(calculated_total_sum).toFixed('2'));
        	SetSummarizedValue(tblID, title, calculated_total_sum);
        //	$("#SummarizedValue_"+tblID+"_"+title).val(parseFloat(calculated_total_sum).toFixed('2'));
    }
    
    //FormulaColumnListTbl
    var FilteredRec = $.grep(FormulaColumnListTbl, function(v) {
    				return v.Setup == tblID;
				});
	if(FilteredRec.length>0)
	{
		for(var i=0; i<FilteredRec.length; i++)
		{
			DynamicCalculateValue(elem, FilteredRec[i].ColumnName, FilteredRec[i].Formula,FilteredRec[i].Setup,'true' );
		}
	
	}

    
}

function CalculateNew(elem,tblID){
    var FilteredRec = $.grep(FormulaColumnListTbl, function(v) {
    				return v.Setup == tblID;
				});
	if(FilteredRec.length>0)
	{
		for(var i=0; i<FilteredRec.length; i++)
		{
			DynamicCalculateValue(elem, FilteredRec[i].ColumnName, FilteredRec[i].Formula,FilteredRec[i].Setup,'true' );
		}
	
	}
}

function CalculateValue(elem, Title, Formula,tblId,IsTotal ){
	var title = Title.replaceAll(' ','');title= title.replace('%', '');title= title.replace(/[\])}[{(]/g, '')
	var Condition = Formula;
	if( Formula !=  'undefined' )
	{
	Condition = Condition.split(',');
	if(Condition.length>0)
	{
	var NewExp='';
	for(var q=0; q<Condition.length; q++)
	{
		var evt = $.trim(Condition[q]);
		if(/^[a-zA-Z0-9- ]*$/.test(evt) == false)
		{
			NewExp = NewExp+evt;
		}
		else
		{
			var CurrntVal = $(elem).closest("tr").find('td #tbl_'+evt).val()
			if(CurrntVal == ""){CurrntVal = 0;}
			if(CurrntVal != undefined){
				NewExp = NewExp+CurrntVal;
			}else{
				NewExp = NewExp+evt;
			}	
		}
	}        											
	if(isMathExpression(NewExp) == true)
	{
		var result = math.evaluate(NewExp);        												 
		result = result.toFixed(2); 
		result = result.toString();  
		$(elem).closest("tr").find('td .'+title).val(result);      													        												
		if(IsTotal == 'true')
		{
			DynamicSum(tblId,Title,'',Formula)
		} 		
		return result;		 
	}	       											
  } 
  }   

}


function DynamicCalculateValue(elem, Title, Formula,tblId,IsTotal ){
	var title = Title.replaceAll(' ','');title= title.replace('%', '');
	title= title.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, ""); //replace(/[\])}[{(]/g, '');
	var Condition = Formula;
	if(Formula !=  'undefined' )
	{
	Condition = Condition.split(',');
	if(Condition.length>0)
	{
	var NewExp='';
	for(var q=0; q<Condition.length; q++)
	{
		var evt = $.trim(Condition[q]);
		if(/^[a-zA-Z0-9- ]*$/.test(evt) == false)
		{
			NewExp = NewExp+evt;
		}
		else
		{	
			var elerwid = elem.closest('tr').id.split('_')[1];
			var CurrntVal = $(elem).closest("tr").find('td #tbl_'+tblId+'_'+elerwid+'_'+evt).val()
			if(CurrntVal == ""){CurrntVal = 0;}
			if(CurrntVal != undefined)
			{
				NewExp = NewExp+CurrntVal;
			}
			else
			{
				NewExp = NewExp+evt;
			}
		}	
	}        											
	if(isMathExpression(NewExp) == true)
	{
		var result = math.evaluate(NewExp);        												 
		result = result.toFixed(2); 
		result = result.toString();  
		$(elem).closest("tr").find('td .'+title).val(result);      													        												
		if(IsTotal == 'true')
		{
			DynamicSumRow(tblId,Title,'',Formula)
		} 		
		return result;		 
	}	       											
  }   
  }
}


function DynamicSumRow(tblID, Title, IsCal, Formula){
	if(Title != '' && Title != undefined){
	var title = Title.replaceAll(' ','');title= title.replace('%', '');    title= title.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "");
    var calculated_total_sum = 0;        
    $("#TblApprovalEntry_"+tblID+" ."+title+"").each(function () {
        var get_textbox_value = $(this).val();
        if(get_textbox_value == ""){get_textbox_value = 0;}
        if ($.isNumeric(get_textbox_value)) {
            calculated_total_sum += parseFloat(get_textbox_value);
            }                  
      });
        $("#ttlval_"+tblID+"_"+title).html(parseFloat(calculated_total_sum).toFixed('2'));
        SetSummarizedValue(tblID, title, calculated_total_sum);
       // $("#SummarizedValue_"+tblID+"_"+title).val(parseFloat(calculated_total_sum).toFixed('2'));
    }
        
}




function isMathExpression (str) {
  try {
    Complex.compile(str);
  } catch (error) {
    return false;
  }
  
  return true;
}

function ColumnValueByColumnNameforTableEquation(QueryResult, ColumnName,Index) {
	var ListName, ColValue;
	//var event_pop;
	switch ($.trim(ColumnName)) {
		case 'ColumnText1': ListName = 	QueryResult[Index].ColumnText1; break;
		case 'ColumnText2': ListName = 	QueryResult[Index].ColumnText2; break;
		case 'ColumnText3': ListName = 	QueryResult[Index].ColumnText3; break;
		case 'ColumnText4': ListName = 	QueryResult[Index].ColumnText4; break;
		case 'ColumnText5': ListName = 	QueryResult[Index].ColumnText5; break;
		case 'ColumnText6': ListName = 	QueryResult[Index].ColumnText6; break;
		case 'ColumnText7': ListName = 	QueryResult[Index].ColumnText7; break;
		case 'ColumnText8': ListName = 	QueryResult[Index].ColumnText8; break;
		case 'ColumnText9': ListName = 	QueryResult[Index].ColumnText9; break;
		case 'ColumnText10': ListName = QueryResult[Index].ColumnText10; break;
		case 'ColumnNumber1': ListName = QueryResult[Index].ColumnNumber1; break;
		case 'ColumnNumber2': ListName = QueryResult[Index].ColumnNumber2; break;
		case 'ColumnNumber3': ListName = QueryResult[Index].ColumnNumber3; break;
		case 'ColumnNumber4': ListName = QueryResult[Index].ColumnNumber4; break;
		case 'ColumnNumber5': ListName = QueryResult[Index].ColumnNumber5; break;		
		case 'ColumnDate1': ListName = moment(QueryResult[Index].ColumnDate1).format('LL'); break;
		case 'ColumnDate2': ListName = moment(QueryResult[Index].ColumnDate2).format('LL'); break;
		case 'ColumnDate3': ListName = moment(QueryResult[Index].ColumnDate3).format('LL'); break;
		case 'ColumnDate4': ListName = moment(QueryResult[Index].ColumnDate4).format('LL'); break;
		case 'ColumnDate5': ListName = moment(QueryResult[Index].ColumnDate5).format('LL'); break;		
		case 'ColumnMultiline1': ListName = QueryResult[Index].ColumnMultiline1; break;
		case 'ColumnMultiline2': ListName = QueryResult[Index].ColumnMultiline2; break;
		case 'Priority': ListName = QueryResult[Index].Priority; break;
		case 'YesNo': ListName = QueryResult[Index].YesNo; break;
		case 'Checkbox': ListName = QueryResult[Index].Checkbox; break;		
		case 'AutoSerialNumber': ListName = QueryResult[Index].AutoSerialNumber; break;		
	}
	if(ListName == undefined)
	{	
		if(/^[a-zA-Z0-9- ]*$/.test(ColumnName) == true)
		{
			ListName = '0'; //$.trim(ColumnName);//NewExp = NewExp+evt;
		}else{
			ListName = $.trim(ColumnName);
	//	ColValue= $('#tbl_'+ColumnName);
		}
	
	}
	return ListName;
}





function ColumnValueByColumnNameforTable(QueryResult, ColumnName,Index) {
	var ListName;
	//var event_pop;
	switch (ColumnName) {
		case 'ColumnText1': ListName = 	QueryResult[Index].ColumnText1; break;
		case 'ColumnText2': ListName = 	QueryResult[Index].ColumnText2; break;
		case 'ColumnText3': ListName = 	QueryResult[Index].ColumnText3; break;
		case 'ColumnText4': ListName = 	QueryResult[Index].ColumnText4; break;
		case 'ColumnText5': ListName = 	QueryResult[Index].ColumnText5; break;
		case 'ColumnText6': ListName = 	QueryResult[Index].ColumnText6; break;
		case 'ColumnText7': ListName = 	QueryResult[Index].ColumnText7; break;
		case 'ColumnText8': ListName = 	QueryResult[Index].ColumnText8; break;
		case 'ColumnText9': ListName = 	QueryResult[Index].ColumnText9; break;
		case 'ColumnText10': ListName = QueryResult[Index].ColumnText10; break;
		case 'ColumnNumber1': ListName = QueryResult[Index].ColumnNumber1; break;
		case 'ColumnNumber2': ListName = QueryResult[Index].ColumnNumber2; break;
		case 'ColumnNumber3': ListName = QueryResult[Index].ColumnNumber3; break;
		case 'ColumnNumber4': ListName = QueryResult[Index].ColumnNumber4; break;
		case 'ColumnNumber5': ListName = QueryResult[Index].ColumnNumber5; break;		
		case 'ColumnDate1': ListName = moment(QueryResult[Index].ColumnDate1).format('LL'); break; //QueryResult[Index].ColumnDate1; break;
		case 'ColumnDate2': ListName = moment(QueryResult[Index].ColumnDate2).format('LL'); break;//QueryResult[Index].ColumnDate2; break;//
		case 'ColumnDate3': ListName = moment(QueryResult[Index].ColumnDate3).format('LL'); break;//QueryResult[Index].ColumnDate3; break;//
		case 'ColumnDate4': ListName = moment(QueryResult[Index].ColumnDate4).format('LL'); break;//QueryResult[Index].ColumnDate4; break;//
		case 'ColumnDate5': ListName = moment(QueryResult[Index].ColumnDate5).format('LL'); break;//QueryResult[Index].ColumnDate5; break;//
		case 'ColumnMultiline1': ListName = QueryResult[Index].ColumnMultiline1; break;
		case 'ColumnMultiline2': ListName = QueryResult[Index].ColumnMultiline2; break;
		case 'Priority': ListName = QueryResult[Index].Priority; break;
		case 'YesNo': ListName = QueryResult[Index].YesNo; break;
		case 'Checkbox1': ListName = QueryResult[Index].Checkbox1; break;		
		case 'Checkbox2': ListName = QueryResult[Index].Checkbox2; break;		
		case 'Checkbox3': ListName = QueryResult[Index].Checkbox3; break;		
		case 'Checkbox4': ListName = QueryResult[Index].Checkbox4; break;		
		case 'Checkbox5': ListName = QueryResult[Index].Checkbox5; break;	
		case 'ColumnPeople1': ListName = QueryResult[Index].ColumnPeople1; break;
		case 'ColumnPeople2': ListName = QueryResult[Index].ColumnPeople2; break;
		case 'ColumnPeople3': ListName = QueryResult[Index].ColumnPeople3; break;
		case 'ColumnPeople4': ListName = QueryResult[Index].ColumnPeople4; break;
		case 'ColumnPeople5': ListName = QueryResult[Index].ColumnPeople5; break;	
		case 'AutoSerialNumber': ListName = QueryResult[Index].AutoSerialNumber; break;		
	}
	return ListName;
}	

function minmax(value, min, max) 
{
    if(parseInt(value) < min || isNaN(parseInt(value))) 
        return min; 
    else if(parseInt(value) > max) 
        return max; 
    else return value;
}

// To bind Submitted table data
function GetTableData(){
			var ItemTempId = window.atob(titanForWork.getQueryStringParameter('Template'));
			var ItemId = window.atob(titanForWork.getQueryStringParameter('RecNo'));
			var restendpoint = "/_api/web/lists/getbytitle('ApprovalProcessListTable')/items?$select=*,SetupID/ID&$expand=SetupID&$filter=RequestID eq '"+ItemId+"'&$orderby=ID asc";
    		var QueryTableResult = RequestData(restendpoint );    		console.log(QueryTableResult);
			
}

	// To Update table data in list
function UpdateTableData(){
			var ItemTempId = window.atob(titanForWork.getQueryStringParameter('Template'));
			var ItemId = window.atob(titanForWork.getQueryStringParameter('RecNo'));
			var restendpoint = "/_api/web/lists/getbytitle('ApprovalProcessListTable')/items?$select=*,SetupID/ID&$expand=SetupID&$filter=RequestID eq '"+ItemId+"'&$orderby=ID asc";
    		var QueryTblResult = RequestData(restendpoint );
    		console.log(QueryTblResult);
    		var requiredfileds =[];
    		var Index = 0;
    		if(QueryTblResult.length > 0){    		
    		$("#appenddyamicboxes > .dyamicTableboxes > .wrapping_dynamic > .table").each(function () {	    							
    		var Index = 0;    		
    		var currTblId = $(this).attr('id');  currTblId = currTblId.split('_')[1];
    		var filtertableData = $.grep(QueryTblResult, function(v) {
					    return v.SetupIDId == currTblId ;
			});		
			var tblrowcounts = $(this).find(".tablebosyappend > tr:not(:last-child)").length;
				$(this).find(".tablebosyappend > tr:not(:last-child)").each(function (x,i) {
				//  for(t=0;t<QueryTblResult.length;t++){
					var currrowseq = $(this).attr('id');  currrowseq = currrowseq.split('_')[1];
					console.log(x);		
					var Isdone = false;	var IsNull =  false;	ischeck = false;
					var key ='';
					var itemProperties = {};									
				 	$(this).find("td:not(:last-child)").each(function () {						  							
						key = $(this).find('.input-sm').attr('data-original-value');  // $(this).find('th').eq($this.index()).text();	//$(this).find(".columnnametxt").attr("value");				
						//itemProperties[key] = $(this).find(".input-sm").val();
						if($(this).attr('coltype') == 'Checkbox'){
							itemProperties[key] = $(this).find(".input-sm").prop("checked") 
						}else if($(this).attr('coltype') == 'Date'){
							var val = $(this).find(".input-sm").val();
							if(val == ''){ val = null }
							itemProperties[key] = val ; 
						}else if($(this).attr('coltype') == 'Person'){
							var EntityUsers= [];
							var id = $(this).find('div').attr('id')
							if(id == null){
								//id = id ? id  : $(this).find(".input-sm").val();
								itemProperties[key+'Id'] = {"results": EntityUsers}; //vval = EntityUsers;
							}else{							
							var peoplePickerDiv = $("[id$='"+id+"_TopSpan']"); 
							var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id]; 
							var users = peoplePicker.GetAllUserInfo()				
							for (var j = 0; j < users.length; j++) 
							{	var flag=false;
								var arrUSer = AllTaskUsersEmployeeuser.filter(function (filterData) {
								if(filterData.EMail == users[j].EntityData.Email){flag=true;}
								return filterData.EMail == users[j].EntityData.Email;
						    });
							if(!flag){alert("Selected user "+users[j].DisplayText+" not in list"); return false;}			    
						    EntityUsers.push(arrUSer[0].UserId)	    
							}
							val = EntityUsers;
							itemProperties[key+'Id'] = {"results": EntityUsers}; //vval = EntityUsers;
							}
						}														
						else{
							var val = $(this).find(".input-sm").val();
							if($(this).attr('coltype') == "Number"){
								if(key != undefined ){
									if(val == ''){
										itemProperties[key] = '0';
									}else{
										itemProperties[key] = val;
									}
								}							
							}else{
								if(val == ''){
									itemProperties[key] = ''; //$(this).find(".dynamicvalfeachcls").val();
									IsNull = true;
								}else{
									itemProperties[key] = val;
								}
							}
						}
						if ($(this).attr("mandatorycol") == "true" && $(this).find(".input-sm").val() == "") {
							var dyanmicvalhtml = $(this).attr('alerttext');
							requiredfileds.push(dyanmicvalhtml);
						}
				
					})	
					if(ischeck){return false;alert(ischeck);}		
			/*	if(IsNull == true){
					if (requiredfileds.length > 0) {
						for (let i = 0; i < requiredfileds.length; i++) {
							alert("Please enter the value for " + requiredfileds[i] + "");
							break;
						} 
					}
				} else {
					if (requiredfileds.length > 0) {
						for (let i = 0; i < requiredfileds.length; i++) {
							alert("Please enter the value for " + requiredfileds[i] + "");
							break;
						} 
					}
				}	*/				
			
			var totalRow = $('#'+currTblId +'>tbody >tr');
			if(currrowseq <= filtertableData.length){
			if(filtertableData[x] != null )
			{						
			var itemType = "SP.Data.ApprovalProcessListTableListItem";
			itemProperties["__metadata"] = { "type": itemType };
			var dfd = $.Deferred();			
			$.ajax({
				url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalProcessListTable')/items("+filtertableData[x].ID+")",
				type: "PATCH",
				async: false,
				headers: {
					"accept": "application/json;odata=verbose",
					"X-RequestDigest": $("#__REQUESTDIGEST").val(),
					"X-Http-Method": "PATCH",
           			"If-Match": "*",
					"content-Type": "application/json;odata=verbose"
				},
				data: JSON.stringify(itemProperties),
				/*where Title is column name and you can add more columns by splitting with ,*/
				success: function (data) {
					if ($('#attachmentsupload').val() == "") {															
						 	console.log('Updated');
						 	Isdone = 'true';
						 //	Index = Index+1;
						 //	alert('The approval table has been updated successfully.');					 							 
					}									
				},
				error: function (error) {
					alert(JSON.stringify(error));
				}
			});}
		   }else{		   
		//   	SubmitTbltcols(ItemId);
				itemProperties['Title'] = $('#titleid').text();	
				itemProperties['SetupIDId'] = currTblId ;
				itemProperties['RequestIDId'] = ItemId;
				var itemType = "SP.Data.ApprovalProcessListTableListItem";
				itemProperties["__metadata"] = { "type": itemType };								
				$.ajax({
		        url:_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalProcessListTable')/items",
		        type: "POST",
		        async: false,
		        data:JSON.stringify(itemProperties),
		        headers: {
		            "accept": "application/json;odata=verbose", 
		            "Content-Type": "application/json;odata=verbose",  
		            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
		            "X-HTTP-Method": "POST" 
		        },
		        success: function (data) {        
		        sts = true;                                        		        
		        }, 			
		        error: function (error) { 
		        console.log(error);        
		        }
		     });   

		   }
		  //}			   		  
   		})  
   	/*	if(Isdone == 'true'){
				alert('The approval table has been updated successfully.');					 							 
			}    		*/
     })
     if(ischeck == true){return false;alert(ischeck);}		 	     
	}
/*	else{
	SubmitTbltcols(ItemId);
	}	*/
}

var isValid = true;
function validateTable(){
	var requiredfileds = [];
	isValid = true;
	$("#appenddyamicboxes > .dyamicTableboxes > .wrapping_dynamic >.table").each(function () {
		var CurrTableId = $(this).attr('id');CurrTableId = CurrTableId.split('_')[1];					
		console.log(CurrTableId);
		$(this).find(".tablebosyappend > tr:not(:last-child)").each(function () {
			var IsNull =  false; ischeck = false;
			$(this).find("td:not(:last-child)").each(function () {	
				if ($(this).attr("mandatorycol") == 'true' && $(this).find(".input-sm").val() == "") {
						var dyanmicvalhtml = $(this).attr('alerttext');
						requiredfileds.push(dyanmicvalhtml);
				}
				var arrNumValtblFilter ='';
				var arrDateFilter ='';
				if(arrNumValtbl.length > 0)	{
					 arrNumValtblFilter = $.grep(arrNumValtbl, function(v) {
						return v.tId == CurrTableId;
					});	
				}				
				if(arrDateTbl.length > 0)	{
					 arrDateFilter = $.grep(arrDateTbl, function(v) {
						return v.tId == CurrTableId;
					});	
				}
				var key = $(this).find('.input-sm').attr('data-original-value'); 
				var val = $(this).find(".input-sm").val();
				if(arrNumValtblFilter.length > 0)	{
					for(let a=0; a<arrNumValtblFilter.length; a++){
						if(key == arrNumValtblFilter[a].col){
							if(val != '' && (arrNumValtblFilter[a].min != null &&  arrNumValtblFilter[a].max != null)){																	
								if(val >= arrNumValtblFilter[a].min && val  <= arrNumValtblFilter[a].max){									
									console.log(val);
								}else{
									alert(arrNumValtblFilter[a].title+' should be between '+ arrNumValtblFilter[a].min +' to '+ arrNumValtblFilter[a].max);
									ischeck =  true; isValid = false; return false; alert('checked'); break; 
								}
							}else if(val != '' && (arrNumValtblFilter[a].min != null && arrNumValtblFilter[a].max == null )){
								if(val >= arrNumValtblFilter[a].min){									
									console.log(val);
								}else{
									alert(arrNumValtblFilter[a].title+' should be greater than '+ arrNumValtblFilter[a].min );
									ischeck =  true; isValid = false; return false; break;
								}									
							}else if(val != '' && (arrNumValtblFilter[a].min == null && arrNumValtblFilter[a].max != null )){
								if(val <= arrNumValtblFilter[a].max){									
									console.log(val);
								}else{
									alert(arrNumValtblFilter[a].title+' should be less than  '+ arrNumValtblFilter[a].max );
									ischeck =  true; isValid = false; return false; break;
								}									
							}else if( val != '' && (arrNumValtblFilter[a].min == null && arrNumValtblFilter[a].max == null) ){								
								console.log(val);
							}									
						}
					 }	
				  }if(arrDateFilter.length > 0){
				  	for(let d=0; d<arrDateFilter.length; d++){
					  	if(key == arrDateFilter[d].col){
					  	if(val != '' && arrDateFilter[d].validation == "Past Date"){																	
							if(moment(val) < moment(new Date())){									
								console.log(val);
							}else{
								alert(arrDateFilter[d].title+' should be past date..!');
								ischeck =  true; isValid = false; return false; alert('checked'); break; 
							}
					  	}else if(val != '' && arrDateFilter[d].validation == "Past Date included Today"){
					  		if(moment(val) <= moment(new Date())){									
								console.log(val);
							}else{
								alert(arrDateFilter[d].title+' should be past date included today..!');
								ischeck =  true; isValid = false; return false; alert('checked'); break; 
							}					  	
					  	}else if(val != '' && arrDateFilter[d].validation == "Future Date"){
					  		if(moment(val)> moment(new Date())){									
								console.log(val);
							}else{
								alert(arrDateFilter[d].title+' should be future date..!');
								ischeck =  true; isValid = false; return false; alert('checked'); break; 
							}					  	
					  	}else if(val != '' && arrDateFilter[d].validation == "Future Date included Today"){
					  		if(moment(val) >= moment(new Date())){									
								console.log(val);
							}else{
								alert(arrDateFilter[d].title+' should be future date included today..!');
								ischeck =  true; isValid = false; return false; alert('checked'); break; 
							}					  	
					  	}else if(val != '' && arrDateFilter[d].validation == "Today Only"){
					  		if(moment(val) == moment(new Date())){									
								console.log(val);
							}else{
								alert(arrDateFilter[d].title+' should be today only..!');
								ischeck =  true; isValid = false; return false; alert('checked'); break; 
							}					  	
					  	}
					  	}					  	
				  	 }
				  }				  
				if(ischeck == true){isValid = false;return false;alert(ischeck);}				  		
			})				
		})	
		if (requiredfileds.length > 0) {
					for (let i = 0; i < requiredfileds.length; i++) {
						alert("Please enter the value for " + requiredfileds[i] + "");
						isValid = false; return false;break;
					} 
			 }					
	})

}
