/*
 * BSTable
 * @description  Javascript (JQuery) library to make bootstrap tables editable. Inspired by Tito Hinostroza's library Bootstable. BSTable Copyright (C) 2020 Thomas Rokicki
 * 
 * @version 1.0
 * @author Thomas Rokicki (CraftingGamerTom), Tito Hinostroza (t-edson)
 */

"use strict";

/** @class BSTable class that represents an editable bootstrap table. */
class BSTable {

  /**
   * Creates an instance of BSTable.
   *
   * @constructor
   * @author: Thomas Rokicki (CraftingGamerTom)
   * @param {tableId} tableId The id of the table to make editable.
   * @param {options} options The desired options for the editable table.
   */
  constructor(tableId, options) {

    var defaults = {
      editableColumns: null,          // Index to editable columns. If null all td will be editable. Ex.: "1,2,3,4,5"
      $addButton: null,               // Jquery object of "Add" button
      onEdit: function() {},          // Called after editing (accept button clicked)
      onBeforeDelete: function() {},  // Called before deletion
      onDelete: function() {},        // Called after deletion
      onAdd: function() {},           // Called when added a new row
      advanced: {                     // Do not override advanced unless you know what youre doing
          columnLabel: 'Actions',
          buttonHTML: `<div class="btn-group table-action-button-grpup">
                <button id="bEdit" type="button" class="btn btn-sm btn-default">
                    <span class="fa fa-edit" > </span>
                </button>
                <button id="bDel" onclick="DeleteTableRow(this)" type="button" class="btn btn-sm btn-default">
                    <span class="fa fa-trash" > </span>
                </button>
                <button id="bAcep" type="button" class="btn btn-sm btn-default" style="display:none;">
                    <span class="fa fa-check-circle" > </span>
                </button>
                <button id="bCanc" type="button" class="btn btn-sm btn-default" style="display:none;">
                    <span class="fa fa-times-circle" > </span>
                </button>
            </div>`
      }
    };

    this.table = $('#' + tableId);
    this.options = $.extend(true, defaults, options);

    /** @private */ this.actionsColumnHTML = '<td name="bstable-actions">' + this.options.advanced.buttonHTML + '</td>'; 

    //Process "editableColumns" parameter. Sets the columns that will be editable
    if (this.options.editableColumns != null) {
      // console.log("[DEBUG] editable columns: ", this.options.editableColumns);
      
      //Extract felds
      this.options.editableColumns = this.options.editableColumns.split(',');
    }
  }

  // --------------------------------------------------
  // -- Public Functions
  // --------------------------------------------------

  /**
   * Initializes the editable table. Creates the actions column.
   * @since 1.0.0
   */
  init() {
    this.table.find('thead tr').append('<th name="bstable-actions">' + this.options.advanced.columnLabel + '</th>');  // Append column to header
    this.table.find('tbody tr').append(this.actionsColumnHTML);

    this._addOnClickEventsToActions(); // Add onclick events to each action button in all rows

    // Process "addButton" parameter
    if (this.options.$addButton != null) {
      let _this = this;
      // Add a managed onclick event to the button
      this.options.$addButton.click(function() {
        _this._actionAddRow();
      });
    }
  }

  /**
   * Destroys the editable table. Removes the actions column.
   * @since 1.0.0
   */
  destroy() {
    this.table.find('th[name="bstable-actions"]').remove(); //remove header
    this.table.find('td[name="bstable-actions"]').remove(); //remove body rows
  }

  /**
   * Refreshes the editable table. 
   *
   * Literally just removes and initializes the editable table again, wrapped in one function.
   * @since 1.0.0
   */
  refresh() {
    this.destroy();
    this.init();
  }

  // --------------------------------------------------
  // -- 'Static' Functions
  // --------------------------------------------------

  /**
   * Returns whether the provided row is currently being edited.
   *
   * @param {Object} row
   * @return {boolean} true if row is currently being edited.
   * @since 1.0.0
   */
  currentlyEditingRow($currentRow) {
    // Check if the row is currently being edited
    if ($currentRow.attr('data-status')=='editing') {
        return true;
    } else {
        return false;
    }
  }

  // --------------------------------------------------
  // -- Button Mode Functions
  // --------------------------------------------------

  _actionsModeNormal(button) {
    $(button).parent().find('#bAcep').hide();
    $(button).parent().find('#bCanc').hide();
    $(button).parent().find('#bEdit').show();
    $(button).parent().find('#bDel').show();
    let $currentRow = $(button).parents('tr');         // get the row
    $currentRow.attr('data-status', '');               // remove editing status
  }
  _actionsModeEdit(button) {
    $(button).parent().find('#bAcep').show();
    $(button).parent().find('#bCanc').show();
    $(button).parent().find('#bEdit').hide();
    $(button).parent().find('#bDel').hide();
    let $currentRow = $(button).parents('tr');         // get the row
    $currentRow.attr('data-status', 'editing');        // indicate the editing status
  }

  // --------------------------------------------------
  // -- Private Event Functions
  // --------------------------------------------------

  _rowEdit(button) {                  
  // Indicate user is editing the row
    let $currentRow = $(button).parents('tr');       // access the row
    console.log($currentRow);
    let $cols = $currentRow.find('td');              // read rows
    console.log($cols);
    if (this.currentlyEditingRow($currentRow)) return;    // not currently editing, return
    //Pone en modo de edición
    this._modifyEachColumn(this.options.editableColumns, $cols, function($td) {  // modify each column
      let content = $td.html();             // read content
      console.log(content);
      let colid = $td[0].id;
      let div = '<div style="display: none;">' + content + '</div>';  // hide content (save for later use)
      let input = '<input class="form-control input-sm"  data-original-value="' + content + '" value="' + content + '" id="'+colid+'">';      
      $td.html(div + input);                // set content
    });      
    this._actionsModeEdit(button);
  //  const myTimeout = setTimeout(SetDatpickerNdropDown(tblcol[0]), 15000);
  }
  _rowDelete(button) {                        
  // Remove the row
    let $currentRow = $(button).parents('tr');       // access the row
    this.options.onBeforeDelete($currentRow);
    $currentRow.remove();
    this.options.onDelete();
    totalrow = totalrow - 1;
    let $allRows = this.table.find('tbody tr');//alert($allRows.length);
    let $tr = $allRows.length - 1;
    if($tr == 1){
    this.table.find('tbody tr').find('td:last').find('#bDel').hide();   
    }   
    for(i=0; i< $allRows.length;i++){
    	let newCnt = i;
    	this.table.find($allRows[i]).prev().find('td:first').html(newCnt);
    //	$allRows[i].find('td:first').html(newCnt);
    }
    
    let tblId = this.table.selector.split('_')[1];
    let alltd = this.table.find('tbody tr:first').find('td');
    
    if(ColumnTotalList.length>0)
    {
		var FilteredRec = $.grep(ColumnTotalList, function(v) {
    		return v.Setup == tblId;
		});
		
		if(FilteredRec.length>0)
		{
			for(var k=0; k<FilteredRec.length; k++)
			{	
				DynamicSumRow(tblId,FilteredRec[k].ColumnName,'','');
			}	
		}
	}


 
    /*alltd.each(function() {
    	DynamicSumRow(tblId, $(this).attr('name'),'','')
    })*/        
  }
  _rowAccept(button) {
  // Accept the changes to the row
    let $currentRow = $(button).parents('tr');    // access the row
    console.log($currentRow);
    let $cols = $currentRow.find('td');              // read fields
    if (!this.currentlyEditingRow($currentRow)) return;   // not currently editing, return
    
    // Finish editing the row & save edits
    this._modifyEachColumn(this.options.editableColumns, $cols, function($td) {  // modify each column
      let cont = $td.find('input').val();     // read through each input
      $td.html(cont);                         // set the content and remove the input fields
    });
    this._actionsModeNormal(button);
    this.options.onEdit($currentRow[0]);
  }
  _rowCancel(button) {
  // Reject the changes
    let $currentRow = $(button).parents('tr');       // access the row
    let $cols = $currentRow.find('td');              // read fields
    if (!this.currentlyEditingRow($currentRow)) return;   // not currently editing, return

    // Finish editing the row & delete changes
    this._modifyEachColumn(this.options.editableColumns, $cols, function($td) {  // modify each column
        let cont = $td.find('div').html();    // read div content
        $td.html(cont);                       // set the content and remove the input fields
    });
    this._actionsModeNormal(button);
  }
	_actionAddRow()
  	{
  	  // Add row to this table
		let count = 0;
		let $allRows = this.table.find('tbody tr');
    	let tblId = this.table.selector.split('_')[1];
    	if ($allRows.length==0) 
    	{ // there are no rows. we must create them
    		let $currentRow = this.table.find('thead tr');  // find header
    	  	let $cols = $currentRow.find('th');  // read each header field
    	  	// create the new row
    	  	let newColumnHTML = '';
    	  	$cols.each(function() {
    	    	let column = this; // Inner function this (column object)
    	    	if ($(column).attr('name')=='bstable-actions') 
    	    	{
    	      		newColumnHTML = newColumnHTML + actionsColumnHTML;  // add action buttons
    	    	} 
    	    	else 
    	    	{
    	      		newColumnHTML = newColumnHTML + '<td></td>';
    	    	}
    	  	});
    	  	this.table.find('tbody').append('<tr>'+newColumnHTML+'</tr>');
    	} 
    	else 
    	{ // there are rows in the table. We will clone the last row
    	  	count = count + $allRows.length;
    	  	let $lastRow = this.table.find('tr').eq(2);
    	  	//$lastRow.clone().appendTo($lastRow.parent());        
    	  	$lastRow.clone().insertBefore($lastRow.parent().find('tr:last-child'));
    	  	$lastRow = this.table.find('tr:last');
    	  	$lastRow.prev().attr('id', tblId +'_'+$allRows.length); 
    		//	  $lastRow.attr('id', tblId +'_'+$allRows.length+1);      $lastRow.attr('name', $allRows.length);
    	  	let $rowSeq = $allRows.length; //sequence
    	  	this.table.find('tr:last-child').prev().find('td:first');
    	  	let $firstrowSeq = this.table.find('tr:last-child').prev().find('td:first');
    	  	$firstrowSeq.html($rowSeq);
    	  	$lastRow.prev().find("input,button,textarea,select").attr("disabled", false);
    	  	let $cols = $lastRow.prev().find('td');  //lee campos
    	  	$cols.each(function() {
    	  	  	let column = this; // Inner function this (column object)
    	  	  	if ($(column).attr('name') == 'bstable-actions') 
    	  		{
    	      		// action buttons column. change nothing
    	      		$(column).find('#bDel').show();
    	    	} 
    	    	else 
    	    	{
    	    		$(column).attr('id', 'R_'+$rowSeq); 
    	    		console.log($(column).find('input').find('.Date'));
    	    		if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Initiation'){
    	    				if($(column).attr('coltype') == 'Person'){
		    	    		var currelem = $(column).find('div');
		    	    		}else{
		    	    		var currelem = $(column).find('input');
		    	    		}     	    			    	    			
    	    		}else{
    	    		     var currelem = $(column).find('input');
    	    		}  	    	 	    		    	    		
    	    		var name = currelem.attr('data-original-value');
    	    		var colName = $(column).attr('name'); 
    	    		var colType = $(column).attr('coltype'); 
    	    		$(column).find('input').val('');    
    	    		currelem.attr('id' , 'tbl_'+tblId+'_'+$rowSeq+'_'+name);
    	    		var currId= currelem.attr('id');	  	  		   	  	  	
    	    		if($(column).attr('coltype') == 'Date' || $(column).attr('coltype') == 'DueDate' )
    	    		{
    	    			var currId= currelem.attr('id');
    	    			//$(this).attr('id' , currId+'_'+$rowSeq);    	    			
    	    			currelem.attr('id' , 'tbl_'+tblId+'_'+$rowSeq+'_'+name);
    	    			//$( ".datepicker" ).datepicker();
    	    		}else{    	    			
	    	    		if(colName != undefined || colName ){    	  	  			
	    	  	  			var FilteredValue = $.grep(arrcoldefval, function(v) {
								return v.tblId == tblId && colName == v.Title;
							});
							if(FilteredValue.length > 0){
							$(column).find('select').val(FilteredValue[0].Defval);
						    $(column).find('input').val(FilteredValue[0].Defval);
						    
							var filtertbl = $.grep(tblcol, function(v) {
								return v.tblId == tblId
							});
							var filtertblcols = $.grep(filtertbl[0].data, function(v) {
								return v.CalculatedValue == true && v.ColumnName == 'CalculatedValue'
							});
						var result = '';
			      		$.each(filtertblcols, function(i,responsere){
			      			if(responsere.Title == colName)
							{
							var  Title = responsere.Title; Title= Title.replace('%', ''); Title= Title.replaceAll(' ', ''); Title= Title.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "");
							var IsCalculate = false, Formula ;
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
							else{											
						/*	var FilteredValue = $.grep(ResultData, function(v) {
							return v.ColumnName == evt;
							});  */
							//var currId= currelem.attr('id');	  	  		   	  	  	
							var CurrntVal = $('#tbl_'+tblId+'_'+$rowSeq+'_'+evt).val()
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
							result = math.evaluate(NewExp);        												 
							result = result.toFixed(2); result = result.toString(); 
							$(column).find('input').val(result); //$('.'+Title).val(result)   																						
							//tableappend += '<input type="number" class="form-control NeedTotal '+Title+'" '+setnumberlimit +' '+datatypeval +' style="text-align: right" data-original-value="'+responsere.ColumnName+'" value="'+result +'" onfocusin="return CalculateValue(this, \''+responsere.Title+'\',\''+Formula+'\',\''+itemid+'\',\''+IsTotalneed +'\');" onkeyup="DynamicSum(\''+itemid+'\',\''+responsere.Title+'\',\''+IsCalculate +'\',\''+Formula+'\')" id="tbl_'+itemid+'_1_'+responsere.ColumnName+'" readonly ></td>';      											
							}										
							}						
			
							}
							}
					})						    
						    colName = colName.replaceAll(' ', ''); colName = colName.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "");
						    var ttl = $('#ttlval_'+tblId+'_'+colName).text();
						    if(name == 'CalculatedValue'){
						    ttl = parseFloat(ttl) + parseFloat(result) ;
						    }else{
						    var dval = FilteredValue[0].Defval ? FilteredValue[0].Defval : 0;
						    ttl = parseFloat(ttl) + parseFloat(dval);
						    }
						    ttl = ttl ? ttl  : 0;
						    $('#ttlval_'+tblId+'_'+colName).text(ttl.toFixed(2))
						    }
						}
					}
    	  	   		// clear the text    	  	  		
    	  	  		//$( ".datepicker" ).datepicker();
    	  	  		if(colType == 'Checkbox')  {	  	  		
	    	  	  		$(column).find('input[type="checkbox"]').prop("checked", false);
	    	  	  		var FilteredValue = $.grep(arrcoldefval, function(v) {
							return v.tblId == tblId && v.Type == 'Checkbox';
						});  
						if(window.atob(titanForWork.getQueryStringParameter('Step')) == 'Initiation'){
							if(FilteredValue[0].Defval == '1') {
								$(column).find('input[type="checkbox"]').prop("checked", true);
							}
						}
					}
    	    	}
      		});
      			
			var filtertbl = $.grep(tblcol, function(v) {
				return v.tblId == tblId
			});                      
      	//	for(i=0; i<tblcol.length;i++)
      	//	{  	 		 		
	 			var field = this.table.find("tr:last-child").prev().find('td'); // $("#"+tblId+"_"+$rowSeq).find('td');   // this.table.find("tr:last-child").prev().find('td');
			    
			    SetDatpickerNdropDown(filtertbl[0].data,'tbl',"TblApprovalEntry_"+tblId, field); 
			    //$( ".datepicker" ).datepicker(); 	   	          	   
	  	//	}     	 
    	}
    	//$( ".datepicker" ).datepicker(); 
    	this._addOnClickEventsToActions(); // Add onclick events to each action button in all rows
    	this.options.onAdd();
    	//$( ".datepicker" ).datepicker();
    	$('#bEdit').hide();this.table.find('#bDel').show();
    	totalrow = totalrow +1; 
 		//   this._rowEdit();
 		//$( ".datepicker" ).datepicker();
 		SetNewAttribut();
 		
	}

  // --------------------------------------------------
  // -- Helper Functions
  // --------------------------------------------------
	//$( ".datepicker" ).datepicker();
  _modifyEachColumn($editableColumns, $cols, howToModify) {
  // Go through each editable field and perform the howToModifyFunction function
    let n = 0;
    $cols.each(function() {
      n++;
      if ($(this).attr('name')=='bstable-actions') return;    // exclude the actions column
      if (!isEditableColumn(n-1)) return;                     // Check if the column is editable
      howToModify($(this));                                   // If editable, call the provided function
    });
    // console.log("Number of modified columns: " + n); // debug log
    

    function isEditableColumn(columnIndex) {
    // Indicates if the column is editable, based on configuration
        if ($editableColumns==null) {                           // option not defined
            return true;                                        // all columns are editable
        } else {                                                // option is defined
            //console.log('isEditableColumn: ' + columnIndex);  // DEBUG
            for (let i = 0; i < $editableColumns.length; i++) {
              if (columnIndex == $editableColumns[i]) return true;
            }
            return false;  // column not found
        }
    }
  }

  _addOnClickEventsToActions() {
    let _this = this;
    // Add onclick events to each action button
    this.table.find('tbody tr #bEdit').each(function() {let button = this; button.onclick = function() {_this._rowEdit(button)} });
    this.table.find('tbody tr #bDel').each(function() {let button = this; button.onclick = function() {_this._rowDelete(button)} });
    this.table.find('tbody tr #bAcep').each(function() {let button = this; button.onclick = function() {_this._rowAccept(button)} });
    this.table.find('tbody tr #bCanc').each(function() {let button = this; button.onclick = function() {_this._rowCancel(button)} });
  }

  // --------------------------------------------------
  // -- Conversion Functions
  // --------------------------------------------------

  convertTableToCSV(separator) {  
  // Convert table to CSV
    let _this = this;
    let $currentRowValues = '';
    let tableValues = '';

    _this.table.find('tbody tr').each(function() {
        // force edits to complete if in progress
        if (_this.currentlyEditingRow($(this))) {
            $(this).find('#bAcep').click();       // Force Accept Edit
        }
        let $cols = $(this).find('td');           // read columns
        $currentRowValues = '';
        $cols.each(function() {
            if ($(this).attr('name')=='bstable-actions') {
                // buttons column - do nothing
            } else {
                $currentRowValues = $currentRowValues + $(this).html() + separator;
            }
        });
        if ($currentRowValues!='') {
            $currentRowValues = $currentRowValues.substr(0, $currentRowValues.length-separator.length); 
        }
        tableValues = tableValues + $currentRowValues + '\n';
    });
    return tableValues;
  }

}


function SetNewAttribut()
{
	$(".datepicker").removeAttr("id");
	$(".datepicker").removeClass("hasDatepicker");
	$( ".datepicker" ).datepicker({ dateFormat: 'MM dd, yy' });
}