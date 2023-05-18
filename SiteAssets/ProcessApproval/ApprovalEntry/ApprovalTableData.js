var TableInitialRecord = [];
var Tblscope = '';
function getTableInitialData(tbleID,width,PermissionStatus,tblEdit){
	var restendpoint = "/_api/web/lists/getbytitle('ApprovalTemplateTable')/items?$select=*,SetupID/ID&$expand=SetupID&$filter=SetupID eq '"+tbleID+"'&$orderby=SequenceNo asc";
    GetData(restendpoint).then(function(response)
    {
    	if(response.d.results.length > 0)
    	{	    		
    		var valuefordefault = '';var colsId ='';
    		//arrNumValtbl =[];
    		//arrMandatetbl =[];
        	tblcol.push({'tblId' :tbleID, 'data': response.d.results});         
        	ResultData = response.d.results; Tblscope = tblEdit;
        	var tableappend = '<div class="col-xs-12 text-center dyamicTableboxes" id="tbldiv_'+tbleID+'"><div class = "wrapping_dynamic" id="tbldivWrap_'+tbleID+'">';     	
            tableappend += "<table class='table table-striped table-bordered ' id='TblApprovalEntry_"+tbleID+"'><thead class='thead-dark'><tr>";                  
           	tableappend += "<th class='columnnametxt' scope='col'  style='text-align:center'>#</th>";
	          $.map(response.d.results, function(responsere){
	              tableappend +="<th class='columnnametxt' scope='col' style='text-align:center' mandatorycol='"+responsere.Mandatory+"' alerttext='"+responsere.Title+"'>"+responsere.Title+"</th>";
	          })
	          if(PermissionStatus == '' && tblEdit.length > 0){
	           if(tblEdit[0].ObjectType == 'Column'){
	          		colsId = tblEdit[0].TableColumns['results'][0].Id;
	          	}
	          }
	          tableappend += "<tr></thead><tbody class='tablebosyappend'><tr id='"+tbleID+"_1'>";
	          tableappend +="<td class='Colsequence' value='1' >1</td>";  
			  var Passingtoken = window.atob(titanForWork.getQueryStringParameter('Step'));	
				if(Passingtoken == 'Initiation')
					{						
						//ColumnValuesTotal=[];
						var cuntrIndx = 0;						
						var restendpoint = "/_api/web/lists/getbytitle('ApprovalTemplateTableData')/items?$select=*,SetupID/ID&$expand=SetupID&$filter=SetupID eq '"+tbleID+"'&$orderby=ID asc";
    					QueryTableData = RequestData(restendpoint);	
    					if(QueryTableData.length> 0){    					
    					for(i=0;i< QueryTableData.length;i++)  
			          	{	
			          	var count = 1;
		          		if(i > 0){
		          			count = i+1;
		          			tableappend += "<tr id='"+tbleID+"_"+count+"'>";
		          			tableappend +="<td class='Colsequence' value='"+count+"' >"+count+"</td>";  	          		
		          		}				       
				       	for(x=0;x<ResultData.length;x++)
						  {	
						  	if(ResultData[x].Mandatory == true){
				          		arrMandatetbl.push({'tblId' : tbleID, 'colname' : ResultData[x].ColumnName, 'Title' : ResultData[x].Title, 'Mandatory' : ResultData[x].Mandatory })
				          	}
				          	if(colsId.length > 0){
					          	var EditColID = $.grep(colsId, function(v) {
										return v.ID == ResultData[x].ID;
								});	
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
								arrDateTbl.push({'tId' : tbleID,'title': ResultData[x].Title,'col': ResultData[x].ColumnName, 'validation': ResultData[x].DateValidation});
							//	tableappend += '<input type="text" class="form-control input-sm stopenterdata Date"  data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" id="tbl_'+responsere.ColumnName+'"></td>'; 
								var c= i+1;
								if(valuefordefault == "Invalid date"){valuefordefault = ''} 
								if(PermissionStatus == ''){								
								tableappend += '<input type="text" class="form-control input-sm Date datepicker" '+PermissionStatus+'  data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+valuefordefault.toString()+'"></td>'; 
								}else{
								tableappend += '<input type="text" class="form-control input-sm " '+PermissionStatus+'  data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+valuefordefault+'"></td>'; 
								}
							}else if (ResultData[x].ColumnType == "Checkbox") {		
								if(valuefordefault == 0 ||valuefordefault == null || valuefordefault == ''){
									var value = '';
								}else{						
									var value = 'checked';
								}
								tableappend += '<input type="checkbox" class="input-sm checkbox_widthmange" value="'+value +'" '+PermissionStatus+' data-original-value="'+ResultData[x].ColumnName+'"  id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" '+value+'>'; 								
							}					
							else if(ResultData[x].ColumnType == 'Number')
							{
							if(ResultData[x].MinNumber != null && ResultData[x].MaxNumber != null){
								arrNumValtbl.push({'tId' : tbleID,'title': ResultData[x].Title,'col': ResultData[x].ColumnName, 'min': ResultData[x].MinNumber,'max': ResultData[x].MaxNumber});
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
								ColumnTotalList.push({'Setup':tbleID,'ColumnName':ResultData[x].Title})	
								IsTotalneed = true;
								var  Title = ResultData[x].Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', ''); Title= Title.replace(/[\])}[{(]/g, '');
								var IsCalculate = false, Formula ;
								if(ResultData[x].CalculatedValue == true && ResultData[x].ColumnName == 'CalculatedValue')
								{
									FormulaColumnListTbl.push({'Setup':tbleID, 'Formula':ResultData[x].Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
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
											tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+PermissionStatus+' '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
											var ColumnName=ResultData[x].Title;        												
											if(ResultData[x].NeedTotal == true)
											{
												ColumnValuesTotal.push({
													Column:ColumnName, Total:result, TableId:QueryTableData[i].SetupIDId , ColIndex:x,
												});
											}
										}else{
											tableappend += "<td>"+NewExp+"</td>";
											//tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+ResultData[x].ColumnName+'" ></td>';      
										}  
									}
									}
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+ResultData[x].ColumnName+'" readonly ></td>';      
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+tbleID+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
									//DynamicSum(tbleID,responsere.Title,IsCalculate,Formula);
								}
								else
								{
									tableappend += '<input type="text" class="form-control input-sm NeedTotal '+Title+'" '+PermissionStatus+' '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(this,\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'"></td>';      
								}
								
							 //  	DynamicSum('',tbleID,responsere.Title,IsCalculate,Formula);
							}
							else
							 {
								if(ResultData[x].CalculatedValue == true && ResultData[x].ColumnName == 'CalculatedValue')
								{
									var  Title = ResultData[x].Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', '');Title= Title.replace(/[\])}[{(]/g, '');
									FormulaColumnListTbl.push({'Setup':tbleID, 'Formula':ResultData[x].Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
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
											tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+PermissionStatus+' '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
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
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+tbleID+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
								}else{
									tableappend += '<input type="text" class="form-control input-sm" '+PermissionStatus+' '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" onkeyup="CalculateNew(this,\''+tbleID+'\')"></td>';      
								}
							 }
							}
							else
							{
								if(ResultData[x].ColumnType == "Multiline"){
			               		tableappend += "<div class='form-control input-sm' "+PermissionStatus+" data-original-value='"+ResultData[x].ColumnName+"' value='"+valuefordefault +"' style='height:100% !important;' id='tbl_"+tbleID+"_"+count+"_"+ResultData[x].ColumnName+"'>"+valuefordefault +"</div></td>";
			               		}else{ 	
			               			var maxl = ResultData[x].TextValidation ? ResultData[x].TextValidation : '250';
									tableappend += '<input class="form-control input-sm" '+PermissionStatus+'  data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" maxlength="'+maxl +'"></td>';      
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
								arrDateTbl.push({'tId' : tbleID,'title': ResultData[x].Title,'col': ResultData[x].ColumnName, 'validation': ResultData[x].DateValidation});
							//	tableappend += '<input type="text" class="form-control input-sm stopenterdata Date"  data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" id="tbl_'+responsere.ColumnName+'"></td>'; 
							//	var c= i+1;
								if(valuefordefault == "Invalid date"){valuefordefault = ''} 
								if(PermissionStatus == ''){
								tableappend += '<input type="text" class="form-control input-sm Date datepicker"   data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+valuefordefault.toString()+'"></td>'; 
								}else{
								tableappend += '<input type="text" class="form-control input-sm "   data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" value="'+valuefordefault+'"></td>'; 
								}
							}else if (ResultData[x].ColumnType == "Checkbox") {	
								if(valuefordefault == 0 ||valuefordefault == null || valuefordefault == ''){
									var value = '';
								}else{				
									var value = 'checked';
								}			
								tableappend += '<input type="checkbox" class="input-sm checkbox_widthmange" value="" data-original-value="'+ResultData[x].ColumnName+'" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" '+value+'>'; 								
							}						
							else if(ResultData[x].ColumnType == 'Number')
							{
							if(ResultData[x].MinNumber != null && ResultData[x].MaxNumber != null){
								arrNumValtbl.push({'tId' : tbleID,'title': ResultData[x].Title,'col': ResultData[x].ColumnName, 'min': ResultData[x].MinNumber,'max': ResultData[x].MaxNumber});
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
								ColumnTotalList.push({'Setup':tbleID,'ColumnName':ResultData[x].Title})	
								IsTotalneed = true;
								var  Title = ResultData[x].Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', ''); Title= Title.replace(/[\])}[{(]/g, ''); //Title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');  
								var IsCalculate = false, Formula ;
								if(ResultData[x].CalculatedValue == true)
								{
									FormulaColumnListTbl.push({'Setup':tbleID, 'Formula':ResultData[x].Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
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
											tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
											var ColumnName=ResultData[x].Title;        												
											if(ResultData[x].NeedTotal == true)
											{
												ColumnValuesTotal.push({
													Column:ColumnName, Total:result, TableId:QueryTableData[i].SetupIDId , ColIndex:x,
												});
											}
										}else{
										//	tableappend += "<td>"+NewExp+"</td>";
											tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" ></td>';      
										}  
									}
									}
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+tbleID+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
									//DynamicSum(tbleID,responsere.Title,IsCalculate,Formula);
								}
								else
								{
									tableappend += '<input type="text" class="form-control input-sm NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(this,\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'"></td>';      
								}
								
							 //  	DynamicSum('',tbleID,responsere.Title,IsCalculate,Formula);
							}
							else
							 {
								if(ResultData[x].CalculatedValue == true && ResultData[x].ColumnName == 'CalculatedValue')
								{
									var  Title = ResultData[x].Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', '');Title= Title.replace(/[\])}[{(]/g, '');
									FormulaColumnListTbl.push({'Setup':tbleID, 'Formula':ResultData[x].Formula,'ColumnName':Title,'Rel':'tbl_'+Title});
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
											tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
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
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" onfocusin="return CalculateValue(this, \''+ResultData[x].Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+ResultData[x].Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_'+ResultData[x].ColumnName+'" readonly ></td>';      
									//tableappend += '<input type="text" class="form-control NeedTotal '+Title+'" style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+responsere.DefaultValue+'" onkeypress="return isNumber(event)" onkeyup="DynamicSum(\''+tbleID+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+responsere.ColumnName+'" readonly ></td>';      
								}else{
									tableappend += '<input type="text" class="form-control input-sm" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" onkeypress="return isNumber(event)" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" onkeyup="CalculateNew(this,\''+tbleID+'\')"></td>';      
								}
							 }
							}
							else
							{
								if(ResultData[x].ColumnType == "Multiline"){
			               		tableappend += "<div class='form-control input-sm' "+PermissionStatus+" data-original-value='"+ResultData[x].ColumnName+"' value='"+valuefordefault +"' style='height:100% !important;' id='tbl_"+tbleID+"_"+count+"_"+ResultData[x].ColumnName+"'>"+valuefordefault +"</div></td>";
			               		}else{ 	
			               			var maxl = ResultData[x].TextValidation ? ResultData[x].TextValidation : '250';
									tableappend += '<input class="form-control input-sm" '+PermissionStatus+'  data-original-value="'+ResultData[x].ColumnName+'" value="'+valuefordefault +'" id="tbl_'+tbleID+'_'+count+'_'+ResultData[x].ColumnName+'" maxlength="'+maxl +'"></td>';      
								}
							}
							//cuntrIndx = cuntrIndx + 1
						}//)
						tableappend += "</tr>";
					  }
					
				    }
			tableappend += "<tr class='totalfield' scope='col'>";
         	tableappend +="<td class='totalRecord' value=''>Total:</td>";      
         /*	if(QueryTableData.length > 0){         		
				var UniqueColumn = [...new Map(ColumnValuesTotal.map(item => [item['Column'], item])).values()];
				var FilteredValue = $.grep(ColumnValuesTotal, function(v) {
				return v.TableId == tbleID;
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
					//	setTimeout(SetSummarizedValue(tbleID, title, _FilteredValue[0].Total.toFixed(2)),4000);  
						tableappend += "<td style='text-align: right;'><span id='ttlval_"+tbleID+"_"+title+"'  value='"+_FilteredValue[0].Total.toFixed(2)+"'>"+_FilteredValue[0].Total.toFixed(2)+"</span></td>";
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
         	}else{ */
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
												var CurrntVal = FilteredValue[0].DefaultValue ? FilteredValue[0].DefaultValue : 0; //$('td #tbl_'+tbleID+'_1_'+evt).val()
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
											//tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+tbleID+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+tbleID+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+tbleID+'_1_'+responsere.ColumnName+'" readonly ></td>';      											
										}										
									  }
									}
	        		}
	        		var title = responsere.Title.replaceAll(' ','');title= title.replace('%', '');title=title.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "");
         			//SetSummarizedValue(tbleID, title, valuefordefault); 
         			//valuefordefault = valuefordefault ? valuefordefault : 0; 
         			tableappend += "<td class='' style='text-align: right' value=''><span id='ttlval_"+tbleID+"_"+title+"'  value='"+valuefordefault +"'>"+valuefordefault +"</span></td>";
         			}else{
         			tableappend += "<td class='' value=''><span id='ttlval'></span></td>";
         			}
         	})          	       	         	
          	tableappend += "</tr>";
          //	}
          	tableappend += "</tbody></table></div>";	        
            tableappend += "<button  type='button' id='new-row-button"+tbleID+"' class='btn btn-dark setmargin' style> Add Row</button>";                      
            tableappend += "</div>";
           $("#appenddyamicboxes").append(tableappend);  
           
			}
			
		})
		$( ".datepicker" ).datepicker({ dateFormat: 'MM dd, yy' });
   		 var editableTable = new BSTable("TblApprovalEntry_"+tbleID,{
		    $addButton: $('#new-row-button'+tbleID)
		});editableTable.init();		
		$("#TblApprovalEntry_"+tbleID).find("thead").find("tr").last().hide();
		$("#TblApprovalEntry_"+tbleID).find("tbody").find("tr").find("td #bEdit").hide();
		$("#TblApprovalEntry_"+tbleID).find("tbody").find("tr").find("td #bDel").hide();
		$("#TblApprovalEntry_"+tbleID).find("tbody").find("tr").last().find("td #bDel").hide();
		$('#bEdit').hide();totalrow =1;	
		$("#TblApprovalEntry_"+tbleID).find("tbody").find('tr:last').find("td[name='bstable-actions']").hide(); 
		var tWidth = width ? width : '100';
		if(tWidth == '50'){
			$('#tbldiv_'+tbleID).addClass('col-md-6 fifty_centent');
			$('#tbldivWrap_'+tbleID).addClass('fifty_centent only_heading');		
			$('#tbldivWrap_'+tbleID).css({'width':'100%', 'max-height':'200px'});
			$("#TblApprovalEntry_"+tbleID).css({'width' : '100%'});
		}else{
			$("#TblApprovalEntry_"+tbleID).css('min-width',tWidth+'%');
		}
		var Field = $("#TblApprovalEntry_"+tbleID).find("tbody").find("tr").first().find('td')
		if(PermissionStatus != ''){
		if(tblEdit.length > 0){
		 if(tblEdit[0].TableEditScope == 'Entire Table'){
		 	$("#TblApprovalEntry_"+itemid).find("input,button,textarea,select").attr("disabled", false);
		    console.log(tblEdit[0].TableEditScope);
		    var Field = $("#TblApprovalEntry_"+itemid).find("tbody").find("tr").first().find('td')				  
				var filtertbl = $.grep(tblcol, function(v) {
					return v.tblId == itemid
				});  
	 			SetDatpickerNdropDown(filtertbl[0].data,'tbl', "TblApprovalEntry_"+itemid,Field,ResultData,'',PermissionStatus  );   			 	
			
		 }else if(tblEdit[0].TableEditScope == 'Add Row'){
		    $("#TblApprovalEntry_"+tbleID).find("input,button,textarea,select").attr("disabled", false);
			var filtertbl = $.grep(tblcol, function(v) {
					return v.tblId == tbleID
				});  
	 		SetDatpickerNdropDown(filtertbl[0].data,'tbl', "TblApprovalEntry_"+tbleID,Field,ResultData,'',PermissionStatus);   			 			    
			//$("#new-row-button"+itemid).attr("disabled", "false");
		 }else if(tblEdit[0].TableEditScope == 'Columns'){
			if(tblEdit[0].TableColumns != null){
				var colnm = tblEdit[0].TableColumns.results;
				$("#TblApprovalEntry_"+tbleID).find("input,button,textarea,select").attr("disabled", "false",PermissionStatus);
				$("#new-row-button"+tbleID).attr("disabled", "false");
				var filtertbl = $.grep(tblcol, function(v) {
					return v.tblId == tbleID
				}); 
				$("#TblApprovalEntry_"+tbleID).find("tbody > tr:not(:last-child)").each(function () {
				 	//var Field = $(this).find("td:not(:last-child)")
				 	var Field = $(this).find("td")
				 	SetDatpickerNdropDown(filtertbl[0].data,'tbl', "TblApprovalEntry_"+tbleID,Field,ResultData,'',PermissionStatus );   			 	
				})
				for(var c = 0;c < colnm.length;c++)
				{
				//	$("#TblApprovalEntry_"+itemid).find("td[name='"+colnm[c].Title+"'] input").prop("disabled", "false");					
					$("#TblApprovalEntry_"+tbleID).find("td[name='"+colnm[c].Title+"']").find("input,button,textarea,select").prop("disabled", false);
				}			
			}
		 }else{
		 	$("#TblApprovalEntry_"+tbleID).find("input,button,textarea,select").attr("disabled", "true");
		 	$("#TblApprovalEntry_"+tbleID).find("td input,button,textarea,select").attr("disabled", "true");
			$("#new-row-button"+tbleID).attr("disabled", "true");
		 }
		 }
		}else{
		if(QueryTableData.length > 0){		
		for(let v=0;v<QueryTableData.length;v++){
		//	for(var t=0; t<tblcol.length;t++){	 		
			var filtertbl = $.grep(tblcol, function(v) {
							return v.tblId == tbleID
						}); 
				for(var t=0; t<tblcol.length;t++){	 		
	 			SetDatpickerNdropDown(filtertbl[0].data,'tbl', "TblApprovalEntry_"+tbleID,Field,ResultData,'',PermissionStatus  );   
	 			}
	 	//	}
	 	}
		}else{
			var _filtertbl = $.grep(tblcol, function(v) {
							return v.tblId == tbleID
					});  
		//	for(var t=0; t<tblcol.length;t++){	 		
	 			SetDatpickerNdropDown(_filtertbl[0].data,'tbl', "TblApprovalEntry_"+tbleID,Field,ResultData,'',PermissionStatus  );   	 		
	 	//	}  
	 	}
	 	if(IsTotalneed == false){
			$('.totalfield').hide()
		}
		} 
}

function TblColPermission(tbleID){
	var _filtertbl = $.grep(tblcol, function(v) {
		return v.tblId == tbleID
	});  

}
