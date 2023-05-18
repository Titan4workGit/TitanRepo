 $(document).ready(function(){
 	 $('#test1[name=UpdateEmpN]').change(function(){
                // var inputVal = $('input[name=UpdateEmp]:checked').val(); 
                if($('#test1[name=UpdateEmpN]:checked')) {
                    // debugger;
                    $('.changemeN').addClass('d-block');
                    $('.changemeN').removeClass('d-none');

                    $('#Upload-user-imageN').removeClass('d-block');
                    $('#Upload-user-imageN').addClass('d-none');
                } 
            });
            $('#test2[name=UpdateEmpN]').change(function(){
                
                if($('#test2[name=UpdateEmpN]:checked')) {
                    // debugger;
                    $('.changemeN').removeClass('d-block');
                    $('.changemeN').addClass('d-none');

                    $('#Upload-user-imageN').addClass('d-block');
                    $('#Upload-user-imageN').removeClass('d-none');
                }
            });
 	$(".custom-check-f-p-r").click(function() {
		if($(this).is(":checked")) {
			$(".process-request-input").show();
			$(".process-request-dropdown").hide();
		} else {
			$(".process-request-input").hide();
			$(".process-request-dropdown").show();
		}
	});

     $("#liManagement").click(function(){
	  $('#defination_tab').hide();$('#Management_tab').show();
	});
	$("#liDefination").click(function(){
	  $('#defination_tab').show();$('#Management_tab').hide();
	});
	$('#txtStepName').keypress(function (e) {
	   var regex = new RegExp("^[-a-zA-Z0-9@ [\\] ( ) _ { }]*$");
	   // var regex = new RegExp('[a-z,A-Z,0-9,~,-,_,\',",;,:,!,@,#,$,,^,&,*,(,),[,\\],\?,{,},|,+,=,<,>,~,`,\\\\,\,,\/,.]', 'g');
	   // var regex = new RegExp('[a-z,A-Z,0-9,_,@,(,),[,\\],{,}]', 'g');

	    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	    if (regex.test(str)) {
	        return true;
	    }	
	    e.preventDefault();
	    return false;
	});
	$('#txtTitle,#txtTemplate,#txtReqFor,#txtLabel,#txtTELabel,#txtHeader,#txtEHeader').keypress(function (e) {
	   // var regex = new RegExp("^[a-zA-Z0-9~@ # $ \[\]\ & ( ) _  { } ' ,  .  ;  ?  %]*$");
	   // var regex = new RegExp('[a-z,A-Z,0-9,~,-,_,\',",;,:,!,@,#,$,,^,&,*,(,),[,\\],\?,{,},|,+,=,<,>,~,`,\\\\,\,,\/,.]', 'g');
	    var regex = new RegExp('[-a-z,A-Z,0-9,_,@,(,),[,\\],{,},#,=, $,&,\' ,.,  ;,  ? , % ]', 'g');

	    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		     var checkValue = new String($(this).val());
			 var newValue = '';		
			
	    if (regex.test(str)) {
	        return true;
	    }	
	    e.preventDefault();
	    return false;
	});
	$('#txtTitle,#txtTemplate,#txtReqFor,#txtLabel,#txtTELabel,#txtHeader,#txtEHeader').on('input', function(e) {
		$(this).val(function(i, v) {
			return v.replace(/[^-a-zA-Z0-9_@()[\]{}#= $&\''.,  ;  ?  % ]/g, "");
		});	    
	});
	$('#txtStepName').on('input', function(e) {
		$(this).val(function(i, v) {
			return v.replace(/[^-a-zA-Z0-9_@[\] ( ) _ { }]/g, "");
		});	    
	});
});

var procButtonStyle="";
$(document).ready(function(){
	var QueryGetProcessAdmin =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=*,Contributors/Title,Department/DepartmentName,Department/ID&$expand=Contributors,Department&$filter=CompanyId eq '" +titanForWork.getQueryStringParameter('CompanyId')+ "' and ContributorsId eq '"+_spPageContextInfo.userId+"' and (WebPartName eq 'Process Admin')";
		QueryResultProcessAdmin = getdata(QueryGetProcessAdmin);
		if(QueryResultProcessAdmin.length == 0)
		{
			alert("Unauthorized Access.\nYou don't have permissions.")
			if(titanForWork.getQueryStringParameter('sourcelocation') == '../Pages/Document.aspx')
			{
				window.location.replace("Document.aspx?WebAppId="+window.btoa(Logged_CompanyId)+"&undefined=undefined");
			}
			else
			{
				window.location.replace("approvals.aspx");
			}
		}
	

		$("#spTEFormula").click(function(){
			formula="AdvFormula";
			$(".normalFormula").hide();
		    $(".advanceFormula").show();
		    var disFormula =$("#txtTEFormula").val();
		    var actFormula=$("#actualTEFormula").val();
		    $("#txtDisFormula").val(disFormula);
		    $("#txtActFormula").val(actFormula);  	
		}); 
		$("#spFormula").click(function(){
		var disFormula =$("#txtFormula").val();
		    var actFormula=$("#actualFormula").val();
		    if(disFormula=="" && actFormula==""){}
		    else{
				formula="AdvFormula";
				$(".normalFormula").hide();
			    $(".advanceFormula").show();
			    var disFormula =$("#txtFormula").val();
			    var actFormula=$("#actualFormula").val();
			    $("#txtDisFormula").val(disFormula);
			    $("#txtActFormula").val(actFormula);
		    }  	
		});
$('input[id$="'+DynamicId+'"]').on('change', function(){
    alert('People Picker Value Changed');
});
	 $('#activation').on('hidden.bs.modal', function() {
	 	$("input:radio[name='active_option']").prop('checked',false);
	 });
	$("#ddlNumVal").on("change",function(){
		if($(this).val()=="Integer" && $("#ddlColumn").text()=="Number"){
		   var minNum="";
		   var maxNum="";
		   var defNum="";
			if($("#txtNumMin").val()!=""){
				minNum=Math.trunc($("#txtNumMin").val())
			}
			if($("#txtNumMax").val()!=""){
				maxNum=Math.trunc($("#txtNumMax").val())
			}
			if($("#numDefVal").val()!=""){
				defNum=Math.trunc($("#numDefVal").val())
			}
			$("#txtNumMin").val(minNum);
			$("#txtNumMax").val(maxNum);
			$("#numDefVal").val(defNum);
			  
		}
	}); 
	$('#txtNumMin,#txtNumMax,#numDefVal').keyup(function(){
		if($("#ddlNumVal").val()=="Integer"){
			if($(this).val() == '0'){
		      $(this).val('');  
		    }
		    if (this.value.match(/[^0-9]/g)) {
		      this.value = this.value.replace(/[^0-9]/g, '');
		 	}
		}	    
 	});
 	$("#ddlTENumVal").on("change",function(){
		if($(this).val()=="Integer" && $("#ddlTEColumn").val()=="Number"){
		   var minNum="";
		   var maxNum="";
		   var defNum="";
			if($("#txtTENumMin").val()!=""){
				minNum=Math.trunc($("#txtTENumMin").val())
			}
			if($("#txtTENumMax").val()!=""){
				maxNum=Math.trunc($("#txtTENumMax").val())
			}
			if($("#numTEDefVal").val()!=""){
				defNum=Math.trunc($("#numTEDefVal").val())
			}
			$("#txtTENumMin").val(minNum);
			$("#txtTENumMax").val(maxNum);
			$("#numTEDefVal").val(defNum);
			  
		}
	}); 
	$('#txtTENumMin,#txtTENumMax,#numTEDefVal').keyup(function(){
		if($("#ddlTENumVal").val()=="Integer"){
			if($(this).val() == '0'){
		      $(this).val('');  
		    }
		    if (this.value.match(/[^0-9]/g)) {
		      this.value = this.value.replace(/[^0-9]/g, '');
		 	}
		}	    
 	});
 	$('#ddlPersonValid').prop('disabled', true);
 	$("#ddlPerson").on("change",function(){
		if($(this).val()=="Initiator" || $(this).val()=="Manager"){
			$("#ddlPersonValid").val("Single");
			$('#ddlPersonValid').prop('disabled', true);
		}else if($(this).val()=="HOD"){
			$("#ddlPersonValid").val("Multiple");
			$('#ddlPersonValid').prop('disabled', true);
		}else if($(this).val()=="Anyone"){
			$('#ddlPersonValid').prop('disabled', false);
		}
	});
	$('#ddlTEPersonValid').prop('disabled', true);
	$("#ddlTEPerson").on("change",function(){
		if($(this).val()=="Initiator" || $(this).val()=="Manager"){
			$("#ddlTEPersonValid").val("Single");
			$('#ddlTEPersonValid').prop('disabled', true);
		}else if($(this).val()=="HOD"){
			$("#ddlTEPersonValid").val("Multiple");
			$('#ddlTEPersonValid').prop('disabled', true);
		}else if($(this).val()=="Anyone"){
			$('#ddlTEPersonValid').prop('disabled', false);
		}
	}); 
	$("#ddlDateVal").on("change",function(){
		if($(this).val()=="Any Date"){
			$("#numDefVal").attr({
			   "max" : "",
			   "min" : "",
			});
			$('#numDefVal').prop('disabled', false);
			$("#numDefVal").val("");
		}
		else if($(this).val()=="Today Only"){
			$("#numDefVal").val(0);
			$('#numDefVal').prop('disabled', true);
			$("#numDefVal").attr({
			   "max" : "",
			   "min" : ""			   
			});
		}else if($(this).val()=="Past Date"){
			$("#numDefVal").attr({
			   "max" : -1,
			   "min": ""
			});
			$('#numDefVal').prop('disabled', false);
			$("#numDefVal").val("");
		}else if($(this).val()=="Past Date included Today"){
			$("#numDefVal").attr({
			   "max" : 0,
			   "min": "",
			   "value" : ""
			});
			$('#numDefVal').prop('disabled', false);
			$("#numDefVal").val("");
		}else if($(this).val()=="Future Date"){
			$("#numDefVal").attr({
			   "max" : "",
			   "min": 1
			});
			$('#numDefVal').prop('disabled', false);
			$("#numDefVal").val("");
		}else if($(this).val()=="Future Date included Today"){
			$("#numDefVal").attr({
			   "max" : "",
			   "min" :0
			});
			$('#numDefVal').prop('disabled', false);
			$("#numDefVal").val("");
		}else{
			$("#numDefVal").val("");
			$('#numDefVal').prop('disabled', false);
			
		}
		
	});
	$("#ddlTEDateVal").on("change",function(){
		if($(this).val()=="Any Date"){
			$("#numTEDefVal").attr({
			   "max" : "",
			   "min" : "",
			});
			$('#numTEDefVal').prop('disabled', false);
			$('#numTEDefVal').val("");
		}
		else if($(this).val()=="Today Only"){
			$("#numTEDefVal").val(0);
			$('#numTEDefVal').prop('disabled', true);
			$("#numTEDefVal").attr({
			   "max" : "",
			   "min" : ""
			});
		}else if($(this).val()=="Past Date"){
			$("#numTEDefVal").attr({
			   "max" : -1,
			   "min": "",
			});
			$('#numTEDefVal').prop('disabled', false);
			$('#numTEDefVal').val("");
		}else if($(this).val()=="Past Date included Today"){
			$("#numTEDefVal").attr({
			   "max" : 0,
			   "min": "",
			});
			$('#numTEDefVal').prop('disabled', false);
			$('#numTEDefVal').val("");
		}else if($(this).val()=="Future Date"){
			$("#numTEDefVal").attr({
			   "max" : "",
			   "min": 1,
			});
			$('#numTEDefVal').prop('disabled', false);
			$('#numTEDefVal').val("");
		}else if($(this).val()=="Future Date included Today"){
			$("#numTEDefVal").attr({
			   "max" : "",
			   "min" :0,
			});
			$('#numTEDefVal').prop('disabled', false);
			$('#numTEDefVal').val("");
		}else{
			$("#numTEDefVal").val("");
			$('#numTEDefVal').prop('disabled', false);
			$('#numTEDefVal').val("");
		}

	}); 							
});

  function maxLengthCheck(object) {
    if(object.value.includes("+")|| object.value.includes("-"))
    {
	    if (object.value.length > object.maxLength+1)
	      object.value = object.value.slice(0, object.maxLength+1)
	 }else{
		if (object.value.length > object.maxLength)
	      object.value = object.value.slice(0, object.maxLength)
	 }
  }
  
function addNotedyanamic() {
		var flag = true;
		var txtArr = "Note";
		var tempTblId='';
		var fixedText = quill.container.firstChild.innerHTML;
		if($("#new-process-modal").is(":visible")){
			tempTblId='tblApTemp';
			
			//if (countFixedText > 1) { flag = false; alert("You exeed maximum limit of Note type Column."); return false; }
			txtArr = "Note";
			countFixedText++;
			
			
		}else if($("#edit-process-modal").is(":visible")){
			tempTblId='tblEApTemp';
			var $aTag = $('#tblEApTemp').find('tbody td.tdType').filter(function() {
			    return ($(this).text() == "FixedText" );
			});
			var typeLen=$aTag.length;
		  	//if(typeLen>=1){flag=false;alert("You exeed maximum limit of type type Column.");return false;}
		  	txtArr = "Note";
			//countTEFixedText++;
		}

		if ($("#txtNoteSqno").val() == "") {
			flag = false;
			alert("Please enter sequence"); return false;
		}
		else if ($("#txtNoteLabel").val() == "") {
			flag = false;
			alert("Please enter label"); return false;
		}else if (fixedText.length<17) {
			flag = false;
			alert("Please enter minimum 10 characters"); return false;
		}
		else if ($("#txtFixedText").val() == "" && $("#txtFixedText").is(":visible")) {
			flag = false;
			alert("Please enter Note"); return false;
		}else{
 		  		var $aTag = $('#'+tempTblId).find('tbody tr');
 		  		var dup=false;
		        $($aTag).each(function( j ) {			
		            var label=$(this).find("td.tdLabel").text();
		            if(label==$("#txtNoteLabel").val()){
		            	flag=false;	
		            	dup=true;            
		            }
		        });
		        if(dup){ alert("Duplicate label");return false;}

 		  }

		var table = document.getElementById(tempTblId);
		var table_len = (table.rows.length) - 1;
		var valueArray = '';
		var validation = "<label for='Text'>No</label>";
		var DefVal = ''; 
		
			
		if (flag) {
			$('#new-Note-modal').modal('hide').data('bs.modal', null);
			// event after hidden
			$('#new-Note-modal').on('hidden', function () {
				//$(this).data('modal', null);  // destroys modal			
			});
		}
		var dropDown = '';
		if ($('#ddlDRWN').is(":visible")&&$('#ddlDRWN :selected').text()=="Yes") { dropDown = $('#ddlDRWN :selected').text(); }
		else { dropDown = ""; }
		var mandatory = 'No';
		var widthType = $("input[name='optnoteradios']:checked").val();
		if ($('#ddlMand ').is(":visible")) { mandatory = $('#ddlMand :selected').text(); }
		var html = "<tr> <td class='tdColumn d-none'>" + txtArr + "<input type='hidden'><input type='hidden'><input type='hidden' value='"+ widthType +"'></td> <td class='tdSqno'>" + $('#txtNoteSqno').val() + "</td> <td class='tdLabel'>" + $("#txtNoteLabel").val() + "</td> <td class='tdType'>FixedText</td> <td class='tdMand'>" + mandatory + "</td> <td class='tdDefVal'>" + DefVal + "</td> <td class='tdVal'>" + validation + "</td> <td class='tdDRWN'>" + dropDown + "</td> <td style='display:none'>" + valueArray + " </td><td class='approval-process-edit-lock-btn-box'><a type='button' href='#' class='custom-edit-btn tt' onclick='editNoteRow(this,"+tempTblId+")' > <i class='fa fa-pencil' data-toggle='modal' data-target='#edit-Note-modal'></i></a><a type='button' href='#' class='custom-edit-btn  tt' onclick='deleteRow(this)'> <i class='fa fa-trash-o' ></i> </a></td><td style='display:none;'>" + fixedText + "</td> <td style='display:none;'></td><td style='display:none;'><input type='hidden' class='disFormula' value=''><input type='hidden' class='actualFormula' value=''><input type='hidden' class='personValidation' value=''><input type='hidden' class='serialStartFrom' value=''><input type='hidden' class='prefix' value=''><input type='hidden' class='sufix' value=''><input type='hidden' class='numMin' value=''><input type='hidden' class='numMax' value=''><input type='hidden' class='numSuffix' value=''></td></tr>";
		$("#"+tempTblId+" tbody").append(html);
		//SeqCount = SeqCount + 1;
		//$('#txtNoteSqno').val(SeqCount);
		//$("#txtNoteSqno").attr("value", SeqCount);

	}
		
		$('#new-Note-modal').on('hidden.bs.modal', function() {
			  if(false);	    
		      e.preventDefault();
			  var modal = $(this);
			  modal.find('.modal-body #txtNoteLabel,#txtNote').val("");	 
		});


		function editNoteRow(row,tName) {
			var tempTblId='';
			if($("#new-process-modal").is(":visible")){
				tempTblId='tblApTemp';
			}else if($("#edit-process-modal").is(":visible")){
				tempTblId='tblEApTemp';
			}
		    var i=row.parentNode.parentNode.rowIndex;
		    $("#editNoteRow").val(i);
			
			var $SeqNo = document.getElementById(tName.id).rows[i].cells[1].innerHTML;
	        var $Label =document.getElementById(tName.id).rows[i].cells[2].innerHTML;
	        var $FixedText = document.getElementById(tName.id).rows[i].cells[10].innerHTML;
	       	var $width= document.getElementById(tName.id).rows[i].cells[0].children[2].value;

			$("#txtENoteSqno").val($SeqNo);  
			$("#txtENoteLabel").val($Label);	        
			$("input[name=optnoteradiosE][value='"+$width+"']").prop('checked', true);		                
			quillE.container.firstChild.innerHTML=$FixedText;		      
		}
		
	function editNoteSubmit(val){
		var tempTblId='';
		var fixedText= quillE.container.firstChild.innerHTML;
		if($("#new-process-modal").is(":visible")){
			tempTblId='tblApTemp';
		}else if($("#edit-process-modal").is(":visible")){
			tempTblId='tblEApTemp';
		}

		var tblId=$("#tblEditRow").val();
		var table = document.getElementById(tempTblId);
		var i=val.value;
 		  
 		  if($("#txtENoteSqno").val()==""){	
 		  	alert("Please enter sequence");return false;
 		  }
 		  else if($("#txtENoteLabel").val()==""){		            

 		  	alert("Please enter label");return false;
 		  }else if (fixedText.length<=17) {
			flag = false;
			alert("Please enter minimum 10 characters"); return false;
		  }else if(quillE.container.firstChild.innerHTML==""){
 		    flag=false;	            
 		  	alert("Please enter value for Fixed Text");return false;
 		  }
 		  else{
 		  		var $aTag = $('#'+tempTblId).find('tbody tr').filter(function() {
						    return $(this).find("td.tdLabel").text()== $("#txtENoteLabel").val();
				}); 		  	
		        if($aTag.length>1){ alert("Duplicate label");return false;}

 		  	$( '#edit-Note-modal' ).modal( 'hide' ).data( 'bs.modal', null );
		  	$('#edit-Note-modal').on('hidden', function(){
				$(this).data('modal', null);  // destroys modal
			});
 		  }	  
	  	 
		var Label=$('#txtENoteLabel').val();
		var seqNo=$('#txtENoteSqno').val();
		var width=$("input[name='optnoteradiosE']:checked").val();
		table.rows[i].cells[0].children[2].value=width;	
	 	table.rows[i].cells[1].innerHTML=seqNo;
		table.rows[i].cells[2].innerHTML=Label;
		table.rows[i].cells[10].innerHTML=fixedText.replace("/\xEF\xBB\xBF/", "");
	}
function addHeaderdyanamic() {
		var tempTblId='';
		var txtArr = "";
		if($("#new-process-modal").is(":visible")){
			tempTblId='tblApTemp';
			var $aTag = $("#tblApTemp").find('tbody td.tdType').filter(function() {
			    return ($(this).text() == "Header" || $(this).text() == "Text");
			});
			//var typeLen=$aTag.length;
		  	//if(typeLen>=20){flag=false;alert("You exeed maximum limit of Header type Column.");return false;}
		  	txtArr="Header";
		
		}else if($("#edit-process-modal").is(":visible")){
			tempTblId='tblEApTemp';
			var $aTag = $('#tblEApTemp').find('tbody td.tdType').filter(function() {
			    return ($(this).text() == "Header" || $(this).text() == "Text");
			});
			//var typeLen=$aTag.length;
		  	//if(typeLen>=20){flag=false;alert("You exeed maximum limit of Header type Column.");return false;}
		  	txtArr="Header";
		}
		var flag = true;
		var table = document.getElementById(tempTblId);
		var table_len = (table.rows.length) - 1;
		var valueArray = '';
		if ($("#txtHeaderSqno").val() == "") {
			flag = false;
			alert("Please enter sequence"); return false;
		}
		else if ($("#txtHeader").val() == "") {
			flag = false;
			alert("Please enter Header"); return false;
		}else{
 		  		var $aTag = $('#'+tempTblId).find('tbody tr');
 		  		var dup=false;
		        $($aTag).each(function( j ) {			
		            var label=$(this).find("td.tdLabel").text();
		            if(label==$("#txtHeader").val()){
		            	flag=false;	
		            	dup=true;            
		            }
		        });
		        if(dup){ alert("Duplicate label");return false;}

 		  }
		
		var validation = "<label for='Text'>No</label>";
		var DefVal = ''; var fixedText = $('#txtNote').val();
		
			
		if (flag) {
			$('#new-Header-modal').modal('hide').data('bs.modal', null);
			// event after hidden
			$('#new-Header-modal').on('hidden', function () {
				//$(this).data('modal', null);  // destroys modal			
			});
		}
		var dropDown = '';
		if ($('#ddlDRWN').is(":visible")&& $('#ddlDRWN :selected').text()=="Yes") { dropDown = $('#ddlDRWN :selected').text(); }
		else { dropDown = ""; }
		var mandatory = 'No';
		if ($('#ddlMand ').is(":visible")) { mandatory = $('#ddlMand :selected').text(); }
		var html = "<tr> <td class='tdColumn d-none'>" + txtArr + "</td> <td class='tdSqno'>" + $('#txtHeaderSqno').val() + "</td> <td class='tdLabel'>" + $("#txtHeader").val() + "</td> <td class='tdType'>Header</td> <td class='tdMand'>" + mandatory + "</td> <td class='tdDefVal'>" + DefVal + "</td> <td class='tdVal'>" + validation + "</td> <td class='tdDRWN'>" + dropDown + "</td> <td style='display:none'>" + valueArray + " </td><td class='approval-process-edit-lock-btn-box'><a type='button' href='#' class='custom-edit-btn tt' onclick='editHeaderRow(this,"+tempTblId+")' > <i class='fa fa-pencil' data-toggle='modal' data-target='#edit-Header-modal'></i></a><a type='button' href='#' class='custom-edit-btn  tt' onclick='deleteRow(this)'> <i class='fa fa-trash-o' ></i> </a></td><td style='display:none;'>" + fixedText + "</td> <td style='display:none;'></td><td style='display:none;'><input type='hidden' class='disFormula' value=''><input type='hidden' class='actualFormula' value=''><input type='hidden' class='personValidation' value=''><input type='hidden' class='serialStartFrom' value=''><input type='hidden' class='prefix' value=''><input type='hidden' class='sufix' value=''><input type='hidden' class='numMin' value=''><input type='hidden' class='numMax' value=''><input type='hidden' class='numSuffix' value=''></td></tr>";
		$("#"+tempTblId+" tbody").append(html);
		//SeqCount = SeqCount + 1;
		//$('#txtHeaderSqno').val(SeqCount);
		//$("#txtHeaderSqno").attr("value", SeqCount);

	}
		$('#new-Header-modal').on('hidden.bs.modal', function(e) {	if(false)	  
		      e.preventDefault();
			  var modal = $(this);
			  modal.find('.modal-body #txtHeader').val("");			  

		});

		function editHeaderRow(row,tName) {
		    var i=row.parentNode.parentNode.rowIndex;
		    $("#editHeaderRow").val(i);
			
			var $SeqNo = document.getElementById(tName.id).rows[i].cells[1].innerHTML;
	        var $Label =document.getElementById(tName.id).rows[i].cells[2].innerHTML;
	       
			$("#txtEHeaderSqno").val($SeqNo);  
			$("#txtEHeader").val($Label);	        
		}
		
	function editHeaderSubmit(val){
		var tblId=$("#tblEditRow").val();
		var tempTblId='';
		if($("#new-process-modal").is(":visible")){
			tempTblId='tblApTemp';
		}else if($("#edit-process-modal").is(":visible")){
			tempTblId='tblEApTemp';
		}

		var table = document.getElementById(tempTblId);
		var i=val.value;
 		  
 		  if($("#txtEHeaderSqno").val()==""){	
 		  	alert("Please enter sequence");return false;
 		  }
 		  else if($("#txtEHeader").val()==""){		            

 		  	alert("Please enter Header");return false;
 		  }		  
 		  else{
 		  		var $aTag = $('#'+tempTblId).find('tbody tr').filter(function() {
						    return $(this).find("td.tdLabel").text()== $("#txtEHeader").val();
				}); 		  	
		        if($aTag.length>1){ alert("Duplicate label");return false;}

 		  	$( '#edit-Header-modal' ).modal( 'hide' ).data( 'bs.modal', null );
		  	$('#edit-Header-modal').on('hidden', function(){
				$(this).data('modal', null);  // destroys modal
			});
 		  }	  
		var Label=$('#txtEHeader').val();
		var seqNo=$('#txtEHeaderSqno').val();
			
	 	table.rows[i].cells[1].innerHTML=seqNo;
		table.rows[i].cells[2].innerHTML=Label;
	}
	




function addTableRowDyanamic() { 
		var tempTblId='';
		if($("#new-process-modal").is(":visible")){
			tempTblId='tblApTemp';

		}else if($("#edit-process-modal").is(":visible")){
			tempTblId='tblEApTemp';
		}
		var flag = true;
		var table = document.getElementById(tempTblId);
		var table_len = (table.rows.length) - 1;
		var valueArray = '';
		if ($("#txtTableSqno").val() == "") {
			flag = false;
			alert("Please enter sequence"); return false;
		}
		else if ($("#txtTableLabel").val() == "") {
			flag = false;
			alert("Please enter label"); return false;
		}else{
 		  		var $aTag = $('#'+tempTblId).find('tbody tr');
 		  		var dup=false;
		        $($aTag).each(function( j ) {			
		            var label=$(this).find("td.tdLabel").text();
		            if(label==$("#txtTableLabel").val()){
		            	flag=false;	
		            	dup=true;            
		            }
		        });
		        if(dup){ alert("Duplicate label");return false;}

 		  }

		var tblRowCount=$('#tblTableRow tbody tr').length;
      	if(tblRowCount==0 ){flag = false;alert("Please insert atleast one column.");return false;}//return false;

		var validation = "<label for='Text'>No</label>";
		var DefVal = ''; 
		var txtArr = "Table";
			
		if (flag) {
			$('#new-Table-modal').modal('hide').data('bs.modal', null);
			// event after hidden
			$('#new-Table-modal').on('hidden', function () {
				//$(this).data('modal', null);  // 
			});
		}
		var fixedText=$("#tblTableRow tbody").html();
		
		var dropDown = '';
		var stamp = new Date()
		var date=stamp.getDate();
		var month=stamp.getMonth();
		var year=stamp.getFullYear();
		var time=stamp.getTime();
		var timeStamp=date+""+month+""+year+""+time;
		
		if ($('#ddlDRWN').is(":visible")&&$('#ddlDRWN :selected').text()=="Yes") { dropDown = $('#ddlDRWN :selected').text(); }
		else { dropDown = ""; }
		var mandatory = 'No';
		if ($('#ddlMand ').is(":visible")) { mandatory = $('#ddlMand :selected').text(); }
		var html = "<tr> <td class='tdColumn d-none'>" + txtArr + "</td> <td class='tdSqno'>" + $('#txtTableSqno').val() + "</td> <td class='tdLabel'>" + $("#txtTableLabel").val() + "</td> <td class='tdType'>Table</td> <td class='tdMand'>" + mandatory + "</td> <td class='tdDefVal'>" + DefVal + "</td> <td class='tdVal'>" + validation + "</td> <td class='tdDRWN'>" + dropDown + "</td> <td style='display:none'>" + valueArray + " </td><td class='approval-process-edit-lock-btn-box'><a type='button' href='#' class='custom-edit-btn tt' onclick='editTableRow(this,"+tempTblId+"," + timeStamp + ")' > <i class='fa fa-pencil' data-toggle='modal' data-target='#edit-Table-modal'></i></a><a type='button' href='#' class='custom-edit-btn  tt' onclick='deleteRow(this)'> <i class='fa fa-trash-o' ></i> </a></td><td style='display:none;' id=''>" + timeStamp + "</td> <td style='display:none;'></td><td style='display:none;'><input type='hidden' class='disFormula' value=''><input type='hidden' class='actualFormula' value=''><input type='hidden' class='personValidation' value=''><input type='hidden' class='serialStartFrom' value=''><input type='hidden' class='prefix' value=''><input type='hidden' class='sufix' value=''><input type='hidden' class='numMin' value=''><input type='hidden' class='numMax' value=''><input type='hidden' class='numSuffix' value=''></td></tr>";
		$("#"+tempTblId+" tbody").append(html);
		$('#bindTbls').append('<table id="'+timeStamp+'" class="table custom-table">'+fixedText+'</table>');
		

	}
		

		function editTableRow(row,tName,id) {
		    $("#updateTableRow").hide();
    		$("#editTableRow").show();

		    var i=row.parentNode.parentNode.rowIndex;
			$("#UpdateTempRow").val(i);
			var $SeqNo = document.getElementById(tName.id).rows[i].cells[1].innerHTML;
	        var $Label =document.getElementById(tName.id).rows[i].cells[2].innerHTML;
	       	var $TblData=document.getElementById(tName.id).rows[i].cells[10].innerHTML;
	        $("#editTableRow").val($TblData);

			$("#txtETableSqno").val($SeqNo);  
			$("#txtETableLabel").val($Label);
			var tblRows=$("#"+$TblData+" tbody").html();
			$("#bindTblData tbody").html(tblRows);	
		}
		
	function editTableSubmit(val){
		var tblId=$("#tblEditRow").val();
		var tempTblId='';
		if($("#new-process-modal").is(":visible")){
			tempTblId='tblApTemp';
		}else if($("#edit-process-modal").is(":visible")){
			tempTblId='tblEApTemp';
		}

		var table = document.getElementById(tempTblId);
		var i=$("#UpdateTempRow").val();
		var tid=val.value;
 		const fixedText=$("#bindTblData tbody").html();
		var tblRowCount=$('#bindTblData tbody tr').length;

 		  if($("#txtETableSqno").val()==""){	
 		  	alert("Please enter sequence");return false;
 		  }
 		  else if($("#txtETableLabel").val()==""){		            

 		  	alert("Please enter Label");return false;
 		  }	
 		  else if(tblRowCount==0 ){alert("Please insert atleast one column.");return false;}//return false;	  
 		  
 		  else{
				var $aTag = $('#'+tempTblId).find('tbody tr').filter(function() {
						    return $(this).find("td.tdLabel").text()== $("#txtETableLabel").val();
				}); 		  	
		        if($aTag.length>1){ alert("Duplicate label");return false;}

 		  	$( '#edit-Table-modal' ).modal( 'hide' ).data( 'bs.modal', null );
		  	$('#edit-Table-modal').on('hidden', function(){
				$(this).data('modal', null);  // destroys modal
			});
 		  }	  
		var Label=$('#txtETableLabel').val();
		var seqNo=$('#txtETableSqno').val();
			
	 	table.rows[i].cells[1].innerHTML=seqNo;
		table.rows[i].cells[2].innerHTML=Label;console.log(table)
		//table.rows[i].cells[10].innerHTML="<table>"+fixedText+"</table>";
		$("#"+tid+" tbody").html(fixedText)
	}
	
	var tblOrTemp="";
	$(document).ready(function(){
		$('#newProcess').click(function(){
			$('#defination_tab,.btnDef').show();
			$('.btnMngt,.activating').hide();$('#Management_tab').hide();
		});

		var tempRowCount=0;
		var tempERowCount=0;
		var tempTableRowCount=0;
		
	 	$("#addTableCol").click(function(){
		  	$("#tblId").val("tblTableRow");
		  	$("#optCal").addClass('d-block');
			$("#optCal").removeClass('d-none');
			$(".optNotTable").removeClass('d-none');
			$(".optNotTable").addClass('d-none');
			$("#optSumm").addClass('d-none');
			tblOrTemp="Table";
			//$("#totalFlag").addClass('d-block');
			//$("#totalFlag").removeClass('d-none');
		});
		$("#addCol").click(function(){
		  $("#tblId").val("tblApTemp");
		  
		});
		$("#addECol").click(function(){
		  $("#tblId").val("tblEApTemp");
		});
		$("#editTableCol").click(function(){
			$("#optSumm").addClass('d-none');
			$("#optCal").addClass('d-block');
			$("#optCal").removeClass('d-none');
			$(".optNotTable").removeClass('d-none');
			$(".optNotTable").addClass('d-none');

		  $("#tblId").val("bindTblData");
		  var seq=0;
				$("#bindTblData .tdSqno").each(function()
				{
				   $this = parseInt( $(this).text() );
				   if ($this > seq ) seq = $this;
				});
			  	$("#txtSqno").val(seq+1);
		  tblOrTemp="Table";
		});
		$("#btnAdd").click(function(){
		  	$("#optCal").removeClass('d-block');
			$("#optCal").addClass('d-none');
			$(".optNotTable").removeClass('d-none');
			$(".optNotTable").addClass('d-block');
			$("#totalFlag").removeClass('d-block');
			$("#totalFlag").addClass('d-none');
			$("#optSumm").removeClass('d-none');
			$("#optSumm").addClass('d-block');
			tblOrTemp="Temp";
		});
		$("#addENew").click(function(){
			$("#btnQRWebEditSubmit").hide();
		    $("#btnAddQRWeb").show();
		  	$("#optCal").removeClass('d-block');
			$("#optCal").addClass('d-none');
			$(".optNotTable").removeClass('d-none');
			$(".optNotTable").addClass('d-block');
			$("#totalFlag").removeClass('d-block');
			$("#totalFlag").addClass('d-none');
			$("#optSumm").removeClass('d-none');
			$("#optSumm").addClass('d-block');
			tblOrTemp="Temp";
		});
		$(document).on('change', 'select.ColVal' ,function(){
			 var $tr = $(this).closest("tr");
		    if(this.value=="Value"){
		        $tr.find("td:eq(1) input").show();
				$tr.find("td:eq(1) select").hide();
			}else{
				$tr.find("td:eq(1) input").hide();
				$tr.find("td:eq(1) select").show();
			}
		});

		
		$('#new-Table-modal').on('hidden.bs.modal', function(e) {	if(false)	  
		      e.preventDefault();
			  var modal = $(this);
			  modal.find('.modal-body #txtTableLabel').val("");	
			  modal.find('.modal-body #tblTableRow tbody').html("");		  

		});
		$('#new-Note-modal').on('hidden.bs.modal', function(e) {	if(false)	  
		      e.preventDefault();
			  var modal = $(this);
			  modal.find('.modal-body #txtNoteLabel,#txtNote').val("");	
			  quill.container.firstChild.innerHTML="";


		});
		$('#new-Header-modal').on('hidden.bs.modal', function(e) {	if(false)	  
		      e.preventDefault();
			  var modal = $(this);
			  modal.find('.modal-body #txtHeader').val("");	

		});
		$('#add-formula-modal').on('hidden.bs.modal', function(e) {	if(false)	  
		      e.preventDefault();
			  var modal = $(this);
			  modal.find('.modal-body input').val("");	
	    	  modal.find('.modal-body select.ColVal').val("Column");
	    	  modal.find('.modal-body select,.normalFormula').show();
	    	  modal.find('.modal-body input.getComp,.advanceFormula').hide();
			  modal.find('.modal-body #txtActFormula').val("");
			  $("#tblFormula").find("tr:gt(2)").remove();
			  formula="Formula";		 		
			      
		});
		$('#new-QR-Weblink-modal').on('hidden.bs.modal', function(e) {	if(false)	  
		      e.preventDefault();
			  var modal = $(this);
			  modal.find('.modal-body #txtQRWeb,#txtQRWebURL,#txtQRWebSqno').val("");		
			  $("input[name=QRWeb][value='Bottom']").prop('checked', true);	  

		});
		$('#addNew li').click(function(e) 
	    { 		$("#btnQRWebEditSubmit").hide();
		    	$("#btnAddQRWeb").show();
				$("#QR-WeblinkStat").val("New");

	    		if($(this).text()=="QR Code"){
	    			$("#QR-WeblinkHeading").text("QR Code");
	    		}else if($(this).text()=="Link"){
	    			$("#QR-WeblinkHeading").text("Link");
	    		}

				var seq=0;
				$("#tblApTemp .tdSqno").each(function()
				{
				   $this = parseInt( $(this).text() );
				   if ($this > seq ) seq = $this;
				});
			  	$("#txtTableSqno,#txtSqno,#txtNoteSqno,#txtHeaderSqno").val(seq+1);	    
		});
		
		$('#addNewTE li').click(function(e) 
	    { 		$("#btnQRWebEditSubmit").hide();
		    	$("#btnAddQRWeb").show();
				$("#QR-WeblinkStat").val("New");

	    		if($(this).text()=="QR Code"){
	    			$("#QR-WeblinkHeading").text("QR Code");
	    		}else if($(this).text()=="Link"){
	    			$("#QR-WeblinkHeading").text("Link");
	    		}
				var seq=0;
				$("#tblEApTemp .tdSqno").each(function()
				{
				   $this = parseInt( $(this).text() );
				   if ($this > seq ) seq = $this;
				});
			  	$("#txtTableSqno,#txtSqno,#txtNoteSqno,#txtHeaderSqno").val(seq+1);	    
		});
		$('#addTableCol').click(function(e) 
	    { 
				var seq=0;
				$("#tblTableRow .tdSqno").each(function()
				{
				   $this = parseInt( $(this).text() );
				   if ($this > seq ) seq = $this;
				});
			  	$("#txtSqno").val(seq+1);	    
		});
		
		$("#spFormula").click(function(){
					var tblId=$("#tblId").val();
						
			var selType=$('#ddlColumn :selected').text()
			var html=bindOptionsToDr(tblId,selType);
			
			$(".bindCol").html(html);
			$("#submitFormula").val("txtFormula");
		});
		$("#spEFormula").click(function(){
			var tblId=$("#tblEditRow").val();
			//var $aTag = $('#bindTblData').find('tbody tr').filter(function() {
			//    return $(this).find("td.tdType").text().includes("Number");
			//});
			var html=bindOptionsToDr(tblId);
			//$($aTag).each(function( j ) {			
			//	var label=$(this).find("td.tdLabel").text();
			//	var colName=$(this).find("td.tdColumn").text();
			//	html+="<option value="+colName+">"+label+"</option>";
			//});
			$(".bindCol").html(html);
			$("#submitFormula").val("txtEFormula");
			$(".bindCol option:contains('"+calColAsOpt+"')").remove();

			//$(".bindCol option[text='"+calColAsOpt+"']").remove();
			
		});
		 $("#spTEFormula").click(function(){
			var tblId=$("#tblEditRow").val();
			var selType=$('#ddlTEColumn :selected').text()
			var html=bindOptionsToDr(tblId,selType);			
			$(".bindCol").html(html);
			$("#submitFormula").val("txtTEFormula");
			$(".bindCol option:contains('"+calColAsOpt+"')").remove();
		});
		
		//$("#txtQRWebSqno").val(99999)
		$('input[type=radio][name=QRWeb]').change(function() {
		    if (this.value == 'Top') {
		        $("#txtQRWebSqno").val('')
		    }else if (this.value == 'Bottom') {
		        $("#txtQRWebSqno").val('')
		    }else if (this.value == 'Sequence') {
		    	if($("#new-process-modal").is(":visible")){
					tempTblId='tblApTemp';
				}else if($("#edit-process-modal").is(":visible")){
					tempTblId='tblEApTemp';
				}
		        var seq=0;
				$("#"+tempTblId+" .tdSqno").each(function()
				{
				   $this = parseInt( $(this).text() );
				   if ($this > seq ) seq = $this;
				});
			  	$("#txtQRWebSqno").val(seq+1);
		    }
		});
		$('#txtLabel,#txtTELabel').keyup(function() {
			var tId=$("#tblId").val();
			var tblId=$("#tblEditRow").val();
			if(tId=="tblApTemp" || tId=="tblEApTemp" ){return false;}
			else if(tblId=="tblEApTemp" || tblId=="tblApTemp"){return false;}
			if (this.value.match(/[^a-zA-Z0-9-_()#$@%]/g)) {
			  this.value = this.value.replace(/[^a-zA-Z0-9-_ ()#$@%]/g, '');
			} 
		});
	});
	function addQRWebdyanamic() {
		var tempTblId='';
		var txtArr,type,name = "";
		if($("#QR-WeblinkHeading").text()=="QR Code"){
			type="QR Code";
			txtArr="QRCode";		
		}else if($("#QR-WeblinkHeading").text()=="Link"){
			type="Web Link";
			txtArr="WebLink";			
		}
		if($("#new-process-modal").is(":visible")){
			tempTblId='tblApTemp';
			var $aTag = $("#tblApTemp").find('tbody td.tdType').filter(function() {
			    return $(this).text() == type ;
			});
			var typeLen=$aTag.length;
		  	if(typeLen>=1){flag=false;alert("You exeed maximum limit of "+type+" type Column.");return false;}
		  	//txtArr="QRCode";
			
		}else if($("#edit-process-modal").is(":visible")){
			tempTblId='tblEApTemp';
			var $aTag = $('#tblEApTemp').find('tbody td.tdType').filter(function() {
			    return $(this).text() == type;
			});
			var typeLen=$aTag.length;
		  	if(typeLen>=1){flag=false;alert("You exeed maximum limit of "+type+" type Column.");return false;}
		  	//txtArr="QR Code";
		}
		if($("#QR-WeblinkHeading").text()=="Link"){
			var validateURL=checkURL($('#txtQRWebURL').val());
			if(validateURL==false){alert("Please enter valid url!!");return false;}			
		}else if($("#QR-WeblinkHeading").text()=="QR Code"){
			var validateURL=($('#txtQRWebURL').val());
			if(validateURL==''){alert("Please enter QR Code");return false;}			
		}
		var flag = true;
		var table = document.getElementById(tempTblId);
		var table_len = (table.rows.length) - 1;
		var valueArray = '';
		var sqNo = $("input[name='QRWeb']:checked").val();
		var sequence='';
		if(sqNo=='Sequence'){
			sequence=$("#txtQRWebSqno").val();
		}else if(sqNo=='Top'){
			sequence='Top'	;
		}else if(sqNo=='Bottom'){
			sequence='Bottom';
		}

		
		if ($("#txtQRWebSqno").val() == "" && sqNo=='Sequence') {
			flag = false;
			alert("Please enter sequence"); return false;
		}
		else if ($("#txtQRWeb").val() == "") {
			flag = false;
			alert("Please enter label"); return false;
		}else{
 		  		var $aTag = $('#'+tempTblId).find('tbody tr');
 		  		var dup=false;
		        $($aTag).each(function( j ) {			
		            var label=$(this).find("td.tdLabel").text();
		            if(label==$("#txtQRWeb").val()){
		            	flag=false;	
		            	dup=true;            
		            }
		        });
		        if(dup){ alert("Duplicate label");return false;}

 		  }
		
		var validation = "<label for='Text'>No</label>";
		var DefVal = ''; var fixedText = $('#txtQRWebURL').val();
		
			
		if (flag) {
			$('#new-QR-Weblink-modal').modal('hide').data('bs.modal', null);
			// event after hidden
			$('#new-QR-Weblink-modal').on('hidden', function () {
				//$(this).data('modal', null);  // destroys modal			
			});
		}
		var dropDown = '';
		if ($('#ddlDRWN').is(":visible")&& $('#ddlDRWN :selected').text()=="Yes") { dropDown = $('#ddlDRWN :selected').text(); }
		else { dropDown = ""; }
		var mandatory = 'No';
		if ($('#ddlMand ').is(":visible")) { mandatory = $('#ddlMand :selected').text(); }
		var html = "<tr> <td class='tdColumn d-none'>" + txtArr + "</td> <td class='tdSqno'>" + sequence + "</td> <td class='tdLabel'>" + $("#txtQRWeb").val() + "</td> <td class='tdType'>"+type+"</td> <td class='tdMand'>" + mandatory + "</td> <td class='tdDefVal'>" + DefVal + "</td> <td class='tdVal'>" + validation + "</td> <td class='tdDRWN'>" + dropDown + "</td> <td style='display:none'>" + valueArray + " </td><td class='approval-process-edit-lock-btn-box'><a type='button' href='#' class='custom-edit-btn tt' onclick='editQRWebRow(this,"+tempTblId+")' > <i class='fa fa-pencil' data-toggle='modal' data-target='#new-QR-Weblink-modal'></i></a><a type='button' href='#' class='custom-edit-btn  tt' onclick='deleteRow(this)'> <i class='fa fa-trash-o' ></i> </a></td><td style='display:none;'>" + fixedText + "</td><td style='display:none;'></td><td style='display:none;'><input type='hidden' class='disFormula' value=''><input type='hidden' class='actualFormula' value=''><input type='hidden' class='personValidation' value=''><input type='hidden' class='serialStartFrom' value=''><input type='hidden' class='prefix' value=''><input type='hidden' class='sufix' value=''><input type='hidden' class='numMin' value=''><input type='hidden' class='numMax' value=''><input type='hidden' class='numSuffix' value=''></td> </tr>";
		$("#"+tempTblId+" tbody").append(html);
	}
		
function editQRWebRow(row,tName) {
		    var i=row.parentNode.parentNode.rowIndex;
		    $("#btnQRWebEditSubmit").val(i);
		    $("#btnQRWebEditSubmit").show();
		    $("#btnAddQRWeb").hide();
			$("#QR-WeblinkStat").val("Edit");

			var $SeqNo = document.getElementById(tName.id).rows[i].cells[1].innerHTML;
	        var $Label =document.getElementById(tName.id).rows[i].cells[2].innerHTML;
	        var $URL =document.getElementById(tName.id).rows[i].cells[10].innerHTML;
	        if($SeqNo=='Top'){
	        	$("input[name=QRWeb][value='Top']").prop('checked', true);
	        }
	        else if($SeqNo=='Bottom'){
	        	$("input[name=QRWeb][value='Bottom']").prop('checked', true);
	        }
	        else {
		        $("input[name=QRWeb][value='Sequence']").prop('checked', true);
		        $("#txtQRWebSqno").val($SeqNo);
	        }
			
			  
			$("#txtQRWeb").val($Label);
			$("#txtQRWebURL").val($URL);	        
				        
		}
function editQRWebSubmit(val){
		var tblId=$("#tblEditRow").val();
		var tempTblId='';
		var sqNo = $("input[name='QRWeb']:checked").val();
		if($("#new-process-modal").is(":visible")){
			tempTblId='tblApTemp';
		}else if($("#edit-process-modal").is(":visible")){
			tempTblId='tblEApTemp';
		}
		if($("#QR-WeblinkHeading").text()=="Link"){
			var validateURL=checkURL($('#txtQRWebURL').val());
			if(validateURL==false){alert("Please enter valid url!!");return false;}			
		}else if($("#QR-WeblinkHeading").text()=="QR Code"){
			var validateURL=($('#txtQRWebURL').val());
			if(validateURL==''){alert("Please enter QR Code");return false;}			
		}

		var table = document.getElementById(tempTblId);
		var i=val.value;
 		  
 		  if($("#txtQRWebSqno").val()=="" && sqNo=='Sequence'){	
 		  	alert("Please enter sequence");return false;
 		  }
 		  else if($("#txtQRWeb").val()==""){		            

 		  	alert("Please enter label");return false;
 		  }		  
 		  else{
 		  		var $aTag = $('#'+tempTblId).find('tbody tr').filter(function() {
						    return $(this).find("td.tdLabel").text()== $("#txtEHeader").val();
				}); 		  	
		        if($aTag.length>1){ alert("Duplicate label");return false;}

 		  	$( '#new-QR-Weblink-modal' ).modal( 'hide' ).data( 'bs.modal', null );
		  	$('#new-QR-Weblink-modal').on('hidden', function(){
				$(this).data('modal', null);  // destroys modal
			});
 		  }	  
		var Label=$('#txtQRWeb').val();
		var seqNo=$('#txtQRWebSqno').val();
		var QRWebURL=$('#txtQRWebURL').val();
		
		var sequence='';
		if(sqNo=='Sequence'){
			sequence=$("#txtQRWebSqno").val();
		}else if(sqNo=='Top'){
			sequence='Top'	;
		}else if(sqNo=='Bottom'){
			sequence='Bottom';
		}
	 	table.rows[i].cells[1].innerHTML=sequence;
		table.rows[i].cells[2].innerHTML=Label;
		table.rows[i].cells[10].innerHTML=QRWebURL;

	}
	function updateTableColumn(t){
		var tId=$("#updateTableRow").val();
		var tempTblId='';
		if($("#new-process-modal").is(":visible")){
			tempTblId='tblApTemp';
		}else if($("#edit-process-modal").is(":visible")){
			tempTblId='tblEApTemp';
		}
		var tblRowCount=$('#bindTblData tbody tr').length;
 		  if($("#txtETableSqno").val()==""){	
 		  	alert("Please enter sequence");return false;
 		  }
 		  else if($("#txtETableLabel").val()==""){		            

 		  	alert("Please enter Label");return false;
 		  }	
 		  else if(tblRowCount==0 ){alert("Please insert atleast one column.");return false;}
		var table = document.getElementById(tempTblId);
		var i=$("#UpdateTempRow").val();
		var Label=$('#txtETableLabel').val();
		var seqNo=$('#txtETableSqno').val();

	 	table.rows[i].cells[1].innerHTML=seqNo;
		table.rows[i].cells[2].innerHTML=Label;

        $("#bindTblData tbody tr").each(function () {
			var Id= $(this).find("td").eq(0).find('input:eq(1)').val();
            var ColumnName= $(this).find("td:eq(0)").text();
            var seqNo= $(this).find("td:eq(1)").text();
            var Label= $(this).find("td:eq(2)").text();
            var Type= $(this).find("td:eq(3)").text();
            var Mandatory= $(this).find("td:eq(4)").text();
            var defVal= $(this).find("td:eq(5)").text();

            var Validation= $(this).find("td:eq(6)").text();
            var Dropdown= $(this).find("td:eq(7)").text();
            var DropdownOptios= $(this).find("td:eq(8)").text();
           	var Validation1=$(this).find("td").eq(6).find("label").prop('for');
           	var FixedText= $(this).find("td:eq(10)").text();
           	var needTot= $(this).find("td:eq(11)").text();
           	var disFormula= $(this).find("td:eq(12) :nth-child(1)").val();
           	var actualFormula= $(this).find("td:eq(12) :nth-child(2)").val();
           	var personValidation= $(this).find("td:eq(12) :nth-child(3)").val();
           	
			var drType= $(this).find("td:eq(12) :nth-child(13)").val();
           	var siteAddr= $(this).find("td:eq(12) :nth-child(14)").val();
           	var listName=$(this).find("td:eq(12) :nth-child(15)").val(); 
           	var colName= $(this).find("td:eq(12) :nth-child(16)").val();
           	var drFilter=$(this).find("td:eq(12) :nth-child(17)").val();
           	var drSort=$(this).find("td:eq(12) :nth-child(17)").val();
           	
           	var numMin=$(this).find("td:eq(12) :nth-child(7)").val(); 
           	var numMax= $(this).find("td:eq(12) :nth-child(8)").val();
           	var textValid= $(this).find("td:eq(0) :nth-child(4)").val();
           	if(numMin=='null' || numMin==null || numMin =="" || numMin=='undefined' || numMin==undefined){numMin=null;}
           	if(numMax=='null' || numMax==null || numMax =="" || numMax=='undefined' || numMax==undefined){numMax=null;}
			if(actualFormula=='null' || actualFormula==null || actualFormula=="" || actualFormula=='undefined' || actualFormula==undefined){actualFormula="";}
			if(textValid=='null' || textValid==null || textValid=="" || textValid=='undefined' || textValid==undefined){textValid="";}
			var calValue=false;
			if(ColumnName=="CalculatedValue"){calValue=true;defVal="";}
			if(Type=="Number"){
				$("#bindTblData tbody tr").each(function () {				
					var input2= $(this).find("td:eq(12) :nth-child(2)").val();
					
						if(input2.includes(ColumnName)){
							calValue=true;
						}
					
				});
			}
           	var valNum='';
           	var valDate='';
	       	  if(Type=='Number'){
	           	valNum=Validation;
	           }
	           else if(Type=='Date' || Type=='DueDate'){
	           valDate=Validation;
	           }           
			if(Mandatory=="Yes"){Mandatory=true;}
			else{Mandatory=false;}
			if(Dropdown=="Yes"){Dropdown=true;}
			else{Dropdown	=false;}
			if(Type=='Checkbox'){if(defVal=="Yes"){defVal=1}else if(defVal=="No"){defVal=0}}

               var clientContextPR1 = new SP.ClientContext();

				var listPR1 = clientContextPR1.get_web().get_lists().getByTitle('ApprovalTemplateTable');
				if(Id==null||Id==""||Id==undefined){
					var itemInfo = new SP.ListItemCreationInformation();
					var listItem1 = listPR1.addItem(itemInfo);
					listItem1.set_item('ColumnName', ColumnName);
					listItem1.set_item('ColumnType', Type);
					listItem1.set_item('Title', Label);
					listItem1.set_item('NumberValidation', valNum);
					listItem1.set_item('DateValidation', valDate);
					listItem1.set_item('DropdownValues', Dropdown);
					listItem1.set_item('DefaultValue', defVal);
					listItem1.set_item('SetupID', tId);
					listItem1.set_item('SequenceNo', seqNo);
					listItem1.set_item('Mandatory', Mandatory);
					listItem1.set_item('NeedTotal', needTot);
					listItem1.set_item('FormulaDispaly', disFormula);
					listItem1.set_item('Formula', actualFormula);
					listItem1.set_item('CalculatedValue', calValue);
					listItem1.set_item('TextValidation', textValid);
					listItem1.set_item('MinNumber', numMin);
					listItem1.set_item('MaxNumber', numMax);
					listItem1.set_item('PersonValidation', personValidation);
					listItem1.set_item('DropdownFrom', drType);
					listItem1.set_item('SPListSiteAddress', siteAddr);
					listItem1.set_item('SPListName', listName);
					listItem1.set_item('SPListColumn', colName);
					listItem1.set_item('SPListSortColumn', drFilter);
					listItem1.set_item('SPListFilter', drSort);
					
					listItem1.update();
			    	clientContextPR1.executeQueryAsync(function onAddSucceeded(){
			    		    var newItemId = listItem1.get_id();
			    		    if(Dropdown==true){// && drType=="Given Values"){
			    		    	var tempId=$("#btnUpdateAPM").val();  
			    		    	insertDropDNOptions(DropdownOptios,tempId,tId,newItemId);
			    		    }
			    		    //get Id of newly create item
			    	},function onAddFailed(sender, args) {
					    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
					});
					}
				else{
					var listItem1 = listPR1.getItemById(Id);
					listItem1.set_item('ColumnName', ColumnName);
					listItem1.set_item('ColumnType', Type);
					listItem1.set_item('Title', Label);
					listItem1.set_item('NumberValidation', valNum);
					listItem1.set_item('DateValidation', valDate);
					listItem1.set_item('DropdownValues', Dropdown);
					listItem1.set_item('DefaultValue', defVal);
					listItem1.set_item('SequenceNo', seqNo);
					listItem1.set_item('Mandatory', Mandatory);
					listItem1.set_item('NeedTotal', needTot);
					listItem1.set_item('FormulaDispaly', disFormula);
					listItem1.set_item('Formula', actualFormula);
					listItem1.set_item('CalculatedValue', calValue);
					listItem1.set_item('TextValidation', textValid);
					listItem1.set_item('MinNumber', numMin);
					listItem1.set_item('MaxNumber', numMax);
					listItem1.set_item('PersonValidation', personValidation);
					listItem1.set_item('DropdownFrom', drType);
					listItem1.set_item('SPListSiteAddress', siteAddr);
					listItem1.set_item('SPListName', listName);
					listItem1.set_item('SPListColumn', colName);
					listItem1.set_item('SPListSortColumn', drFilter);
					listItem1.set_item('SPListFilter', drSort);

					listItem1.update();
					clientContextPR1.executeQueryAsync(function onUpdateSucceeded(){
			    		   
			    	},function onUpdateFailed(sender, args) {
					    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
					});
				}				

				

			});
				$( '#edit-Table-modal' ).modal( 'hide' ).data( 'bs.modal', null );
			  	$('#edit-Table-modal').on('hidden', function(){
					$(this).data('modal', null);  // destroys modal
				});
            
      }
     var formulaCounter =0;
      function addFormula(){
		$("#tblFormula").append('<tr><td></td><td><div class="form-group custom-form-group"><select class="form-control getComp"><option value="+">+</option><option value="-">-</option><option value="*">*</option><option value="/">/</option><option value="%">%</option></select></div></td><tr><td><div class="form-group custom-form-group"><select class="form-control ColVal"><option value="Column">Column</option><option value="Value">Value</option></select></div></td><td><div class="form-group custom-form-group"><select class="form-control bindCol'+formulaCounter+' getComp"></select><input type="number" style="display:none" class="form-control getComp"></div></td></tr></tr>');	
		var tblId=$("#tblEditRow").val();
		var $aTag = $('#'+tblId).find('tbody tr').filter(function() {
			    return $(this).find("td.tdType").text().includes("Number");
			});
			var html1='';
			$($aTag).each(function( j ) {			
				var label=$(this).find("td.tdLabel").text();
				var colName=$(this).find("td.tdColumn").text();
				html1+="<option value="+colName+">"+label+"</option>";
			});
			$(".bindCol"+formulaCounter).html(html);
			formulaCounter++;
	  }  
	  
	  function getFormula(val) {console.log($('#txtDisFormula').is(":visible"));
		  if(formula=="AdvFormula"){
		  	if($('#txtActFormula').val()=="" || $('#txtDisFormula').val()==""){alert("Please enter formula");return false;}
			  	$("." +val.value).val($('#txtActFormula').val().toString());	  
				$("#"+val.value).val($('#txtDisFormula').val().replace(/,/g, ''));
			  	
			  	$( '#add-formula-modal' ).modal( 'hide' ).data( 'bs.modal', null );
				return false;
		  }
	  	var flag=true;
		$('.getComp:visible').each(function(){
		   if($(this).val()=="" ){
		   	  
		   		flag=false;
		   		alert("Please fill details");
		   		return false;
		   	  
		   }
		   else if(this.tagName=="SELECT" && this.selectedIndex==0 && $(this).val()=="Select"){
		   		flag=false;
		   		alert("Please select column");
		   		return false;
		   }
		})
		if(flag==false){return false;}
		var displayFormula = $('.getComp:visible').map(function() {
			     if(this.value!=""){
			     	if(this.tagName=="SELECT"){
			      		return this.options[this.selectedIndex].text;
			      	}else {
			      		return this.value;
			      	}
			      }
			  }).get();//.join(",");
			  var mod;
		var actualFormula = $('.getComp:visible').map(function() {
			     if(this.value!=""){
			     
			     	if(this.tagName=="SELECT"){
			     	
			     		if(this.options[this.selectedIndex].value=="%"){
			     			mod="%";
			     			return "*"
			      		}else{ 
				      		if(mod=="%"){mod='';
			      			return (this.options[this.selectedIndex].value)+","+"/"+","+"100";
				      		}else{ 
			      			return this.options[this.selectedIndex].value;
				      		}
			      		}
			      	}else{
			      	 	if(mod=="%"){mod='';
			      	 		return  this.value/100;
			      		}else{ 
			      			return this.value;
			      		}
			      	}
			      }
			  }).get();
			
		$("." +val.value).val(actualFormula.toString());	  
		$("#"+val.value).val(displayFormula.toString().replace(/,/g, ''));
		$("#tblFormula").find("tr:gt(2)").remove();
			if(flag){				
				$( '#add-formula-modal' ).modal( 'hide' ).data( 'bs.modal', null );
			  	$('#add-formula-modal').on('hidden', function(){
					$(this).data('modal', null);  // destroys modal
				});			
			}

      }
      		var html='';

       function bindOptionsToDr(tblId,selType){
  
          html='<option>Select</option>';
        var $aTag="";
		if(selType=="SummarizedValue"){
			$aTag= $('#'+tblId).find('tbody tr').filter(function() {
            	return $(this).find("td.tdType").text().includes("Number") || $(this).find("td.tdType").text().includes("CalculatedValue")  || $(this).find("td.tdType").text().includes("SummarizedValue");
        	});
		}else if(selType=="CalculatedValue"){
			$aTag= $('#'+tblId).find('tbody tr').filter(function() {
            	return $(this).find("td.tdType").text().includes("Number") || $(this).find("td.tdType").text().includes("CalculatedValue");
        	});
		}
         
        $($aTag).each(function( j ) {			
            var label=$(this).find("td.tdLabel").text();
            var colName=$(this).find("td.tdColumn").text();
            var colType=$(this).find("td.tdType").text();
            var calFormula=$(this).find("td input.actualFormula").val()
            if(colName.includes("ColumnNumber")){
                html+="<option value="+colName+">"+label+"</option>";
            }else if(colName.includes("CalculatedValue")){
                html+="<option value="+calFormula+">"+label+"</option>";
            }else if(colName.includes("SummarizedValue")){
                html+="<option value="+calFormula+">"+label+"</option>";
            }
        });
        return html;
  }
function checkURL(str){
var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
		    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
		  return !!pattern.test(str);

}

$(document).ready(function(){

	$("#ddlTextValid").change(function() {
		var txtValid=$('option:selected', this).val();
		if(txtValid=="Select"){
			$("#txtCharLimit").hide();
			$("#secDrdn").removeClass('d-none');
			$("#secDrdn").addClass('d-block');
			$("#ddlDRWN").val("No");
		}
		else if(txtValid=="Link"){
			$("#txtCharLimit,.coverbox_full").hide();
			$("#secDrdn,.optionBox,.drOptType").removeClass('d-block');
			$("#secDrdn,.optionBox,.drOptType").addClass('d-none');
		}
		else if(txtValid=="Char Limit"){
			$("#txtCharLimit,.coverbox_full").show();
			$(".coverbox_full").hide();

			$("#secDrdn,.optionBox,.drOptType").removeClass('d-block');
			$("#secDrdn,.optionBox,.drOptType").addClass('d-none');
		}else if(txtValid=="Email"){
			$("#txtCharLimit,.coverbox_full").hide();
			$("#secDrdn,.optionBox,.drOptType").removeClass('d-block');
			$("#secDrdn,.optionBox,.drOptType").addClass('d-none');
		}		
    });
    $("#ddlTETextValid").change(function() {
		var txtValid=$('option:selected', this).val();
		if(txtValid=="Select"){
			$("#txtTECharLimit").addClass('d-none');
			$("#txtTECharLimit").removeClass('d-block');
			$("#secTEDrdn").removeClass('d-none');
			$("#secTEDrdn").addClass('d-block');
			$("#ddlTEDRWN").val("No");
		}
		else if(txtValid=="Link"){
			$("#txtTECharLimit").addClass('d-none');
			$("#txtTECharLimit").removeClass('d-block');
			$("#secTEDrdn,.optionBoxTE,.drOptTypeTE").removeClass('d-block');
			$("#secTEDrdn,.optionBoxTE,.drOptTypeTE").addClass('d-none');
			$(".coverbox_fullTE").hide();
		}
		else if(txtValid=="Char Limit"){
			$("#txtTECharLimit").removeClass('d-none');
			$("#txtTECharLimit").addClass('d-block');
			$("#secTEDrdn,.optionBoxTE,.drOptTypeTE").removeClass('d-block');
			$("#secTEDrdn,.optionBoxTE,.drOptTypeTE").addClass('d-none');
			$(".coverbox_fullTE").hide();
		}else if(txtValid=="Email"){
			$("#txtTECharLimit").addClass('d-none');
			$("#txtTECharLimit").removeClass('d-block');			
			$("#secTEDrdn,.optionBoxTE,.drOptTypeTE").removeClass('d-block');
			$("#secTEDrdn,.optionBoxTE,.drOptTypeTE").addClass('d-none');
			$(".coverbox_fullTE").hide();
			
		}		
    });
    $("#ddlETextValid").change(function() {
		var txtValid=$('option:selected', this).val();
		if(txtValid=="Select"){
			$("#txtECharLimit").addClass('d-none');
			$("#txtECharLimit").removeClass('d-block');
			$("#secEDrdn").removeClass('d-none');
			$("#secEDrdn").addClass('d-block');
		}
		else if(txtValid=="Link"){
			$("#txtECharLimit").addClass('d-none');
			$("#txtECharLimit").removeClass('d-block');
			$("#secEDrdn,.optionBoxE").removeClass('d-block');
			$("#secEDrdn,.optionBoxE").addClass('d-none');
		}
		else if(txtValid=="Char Limit"){
			$("#txtECharLimit").removeClass('d-none');
			$("#txtECharLimit").addClass('d-block');
			$("#secEDrdn,.optionBoxE").removeClass('d-block');
			$("#secEDrdn,.optionBoxE").addClass('d-none');
		}		
    });
});

	function lengthRange(el) {
  // create array of checks on `el.value`
  var checks = [/\D/g.test(el.value), el.value > 255, el.value==0];
  // if `el.value` contains non-digit character,
  // or is greater than 255 ;
  // `Array.prototype.some()` checks for `true` value
  // if either `checks[0]`, or `checks[1]` is `true` do stuff
  // else set `el.value` to user input
  if (checks.some(Boolean)) {
    // disable input
    $(el).prop("disabled", true)
    // delay 1 second
    setTimeout(function() {
      if (checks[0]) {
        // Filter non-digits from input value.
        el.value = el.value.replace(/\D/g, '');
      }
      // if `this.value` greater than 255 , set `this.value` to 
      // first two characters of input
      if (checks[1]) {
        el.value = el.value.slice(0,2);
      };
      if (checks[2]) {
        el.value = el.value.slice(0,0);
      };
      $(el).prop("disabled", false).val(el.value).focus()
    }, 100)
  }      

}
function tempActivation(elm){
		var id=elm.value;
		var active	=	$("input[name='active_option']:checked").val();
		var strActive='';
		var trialDateTill= new Date();
		var publishedDate= String.format('{0:yyyy}-{0:MM}-{0:dd}',new Date());		

		trialDateTill.setDate(trialDateTill.getDate() + 15);
		var newArray = arr.filter(function (el) {
		  return el.Active== true &&
		         el.TrialStatus== "Licenced";
		});
		var userid = _spPageContextInfo.userId;
		if(active=="trial"){
			strActive='This process has been activated as an Trial Run for 15 days.';

			var listItem = { __metadata:{ type: "SP.Data.ApprovalProcessMasterListItem" },		
				        Active:true,                 
				        TrialStatus:"Running",
				        TrialDate:trialDateTill,
				        PublishedById:userid,
				        PublishedOn:publishedDate
				                                  		                       
				};
		}else if(active=="re-trial"){
			strActive='This process has been activated as an Trial.';

			var listItem = { __metadata:{ type: "SP.Data.ApprovalProcessMasterListItem" },		
				        Active:true,                 
				        TrialStatus:"Running",
				        PublishedById:userid ,
				        PublishedOn:publishedDate		                       
				};
		}else if(active=="activate"){
			strActive='Template activated';
			if(LicBPaas <= newArray.length){alert("Licence not available.!!");return false}
			var listItem = { __metadata:{ type: "SP.Data.ApprovalProcessMasterListItem" },		
				        Active:true,                 
				        TrialStatus:"Licenced",
				        PublishedById:userid,
				        PublishedOn:publishedDate
				};
		}else if(active=="deactivate"){
			strActive='Template deactivated';
			var listItem = { __metadata:{ type: "SP.Data.ApprovalProcessMasterListItem" },		
				        Active:false,                 
				        PublishedById:null,
				        PublishedOn:null
				};
		}

		var siteURL = _spPageContextInfo.webAbsoluteUrl;  
        var apiPath = siteURL + "/_api/lists/getbytitle('ApprovalProcessMaster')/getItemById("+id+")";  
		$.ajax({
	        url: siteURL + "/_api/web/lists/getbytitle('ApprovalProcessMaster')/getItemById(" +id+ ")",
	        type: "PATCH",
	        headers: {
	            "accept": "application/json;odata=verbose",
	            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	            "content-Type": "application/json;odata=verbose",
	            "X-Http-Method": "PATCH",
	            "If-Match": "*"
	        },
	        data: JSON.stringify(listItem),
	        success: function (data) {
	        getAllTemplate();
	         
			 	alert(strActive);
			$( '#activation' ).modal( 'hide' ).data( 'bs.modal', null );
	        },
	        error: function (error) {
	        }
	    });
}
$(document).ready(function(){
	
	if(IsBpassModules ==true && IsDMSModules==true){
		$("#Tab-Process-Btn").show();
		$("#processapproval").show();
		$("#Tab-Documents-Btn").show();
		//$("#documentapprovalsec").show();	
		$("#newDocProcess").hide();
		procButtonStyle="Process";
	}else if(IsBpassModules ==false && IsDMSModules==true){
		$("#Tab-Process-Btn").hide();
		$("#processapproval").hide();
		$("#Tab-Documents-Btn").hide();
		$("#documentapprovalsec").show();
				
		$("#newProcess").hide();
		procButtonStyle="Document";
	}else if(IsBpassModules ==true && IsDMSModules==false ){
		$("#Tab-Process-Btn").hide();
		$("#processapproval").show();
		$("#Tab-Documents-Btn").hide();
		$("#documentapprovalsec").hide();
		
		$("#newDocProcess").hide();	
		procButtonStyle="Process";
	}else if(IsBpassModules ==false  && IsDMSModules==false ){
		$("#Tab-Process-Btn").hide();
		$("#processapproval").hide();
		$("#Tab-Documents-Btn").hide();
		$("#documentapprovalsec").hide();
		
		$("#newDocProcess").hide();	
		$("#newProcess").hide();
	}
});
function tempActivationDoc(ths,id) { 				
		 var active	=	ths.ariaPressed;
		 var setActive=false;
		 if(active=="true"){
			 setActive=false;
		 }
		 else{
		 	 setActive=true;
		 }
        siteURL = _spPageContextInfo.webAbsoluteUrl;  
        var apiPath = siteURL + "/_api/lists/getbytitle('ApprovalProcessMaster')/getItemById("+id+")";  
		$.ajax({
	        url: siteURL + "/_api/web/lists/getbytitle('ApprovalProcessMaster')/getItemById(" +id+ ")",
	        type: "PATCH",
	        headers: {
	            "accept": "application/json;odata=verbose",
	            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	            "content-Type": "application/json;odata=verbose",
	            "X-Http-Method": "PATCH",
	            "If-Match": "*"
	        },
	        data: JSON.stringify({'__metadata': { type: "SP.Data.ApprovalProcessMasterListItem" },  'Active':setActive}),
	        success: function (data) {
	         if(active=="true"){
				 alert("Template deactivated");
			 }
			 else{
			 	 alert("Template activated");
			 }
			getAllTemplate();
	        },
	        error: function (error) {
	        }
	    });
	 } 
/*-----step form------*/
	var formula='Formula';
   $(function(){
    $('.stepnext').click(function(){
      formula="AdvFormula";
      $('.normalFormula').hide();
      $('.advanceFormula').show();
      //var store_lg = $('.stapwraping').scrollLeft();
     // var ste_width = $('.steps_wrap').width();
     // $('.stapwraping').animate({
    //    scrollLeft: store_lg + ste_width  
     // });
    });

    $('.stepprev').click(function(){
      formula="Formula";
      $('.advanceFormula').hide();
      $('.normalFormula').show();
     // var store_lg = $('.stapwraping').scrollLeft();
     /// var ste_width = $('.steps_wrap').width();
    //  $('.stapwraping').animate({
      //  scrollLeft: store_lg - ste_width  
    //  });
    });

  });	
  $(document).ready(function(){
	   $("#numDefVal,#txtFileSize,#txtTEFileSize").keyup(function () {
		    // Check correct, else revert back to old value.
		    if(this.value != ""){
			    if(parseInt(this.value) < parseInt(this.min)){
			      this.value = this.min;
			    }
			    if(parseInt(this.value) > parseInt(this.max)){
			      this.value = this.max;
			    }
		    }
		  
	   });
	   $("#numTEDefVal").keyup(function () {
		    // Check correct, else revert back to old value.
		    if(this.value != ""){
			    if(parseInt(this.value) < parseInt(this.min)){
			      this.value = this.min;
			    }
			    if(parseInt(this.value) > parseInt(this.max)){
			      this.value = this.max;
			    }
		    }		   
	   });
   });    
   var tblArr=[];
   function updateTableColId(tempId){
	   getTableColIdToUpdate(tempId);console.log(tblArr);
	   for(var i=0;i<tblArr.length;i++){
	   	  getTableId(tblArr[i].Title,tempId,tblArr[i].Id)
	   }	
   }
   function getTableColIdToUpdate(tempId){
	   $.ajax({
	        async: false,
	        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('ApprovalTemplateSetup')/items?$filter= TemplateID/ID eq "+tempId+" and ColumnType eq 'Table'",
	        type: "GET",
	        headers: {
	            "accept": "application/json;odata=verbose",
	        },
	        success: function (data) {
	        	tblArr=data.d.results;
	        	$( '#edit-process-modal' ).modal( 'hide' ).data( 'bs.modal', null );
	        	$('#edit-process-modal').on('hidden', function(){
					$(this).data('modal', null);  // destroys modal
				});
	        },
	        error: function (error) {
	            console.log(JSON.stringify(error));
	        }
	
	    });   
   }
   function getTableId(title,tempId,tblId){ 
   
    $.ajax({
	        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateSetup')/items?$filter=TemplateID/ID eq '"+tempId+"' and TableIName eq '"+title+"'",
	        type: "GET",
	        async: false,	        
	        headers: {
	            "accept": "application/json;odata=verbose",
	        },	
	        success: function (data) { 
	        	var arrT=data.d.results;
	        	for(i=0;i<arrT.length;i++){
	        		updateSummTblId(arrT[i].Id,tblId);
	        	}    		      
	        }, 			
	        error: function (error) { 
		        console.log(error); 
		        alert(error);
	        }
     });   
   	 	
   }
   
   function updateSummTblId(id,tblId){
   		var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateSetupListItem" },		
		TableIName:	tblId.toString(),		
		};
	    $.ajax({
		        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateSetup')/getItemById('" +id+ "')",
		        type: "PATCH",
		        async: false,
		        headers: {
		            "accept": "application/json;odata=verbose",
		            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
		            "content-Type": "application/json;odata=verbose",
		            "X-Http-Method": "MERGE",
		            "If-Match": "*"
		        },
		        data: JSON.stringify(listItem),	
		        success: function (data) { 
		        }, 			
		        error: function (error) { 
			        console.log(error); 
			        alert(error);
		        }
	     });
   
   }
   
   
function getdata(Query)
{
    var ResultItems=[];
    var Ownurl =Query;// _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ContactCenter')/items?"+Query+"";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 			
            ResultItems = data.d.results;  
        },
        error: function (data) 
        {  
            console.log("Error in getdata.");
        	console.log(data); 
        }  
    });
    return ResultItems;
}

$(document).ready(function(){
	$("#tblFilter").click(function(){
		var PorcFilt=$("#ddlPorcFilt option:selected").text().toLowerCase();
		if($("#ddlPorcFilt option:selected").index()==0){PorcFilt="";}
		var IniFilt=$("#ddlIniFilt").val().toLowerCase();
		if($("#ddlIniFilt option:selected").index()==0){IniFilt="";}

		var DeptFilt="";
		if($("#ddlIniFilt").val()== 'Department')
		{	
			DeptFilt=$("#ddlDeptFilt option:selected").text().toLowerCase();
			if($("#ddlDeptFilt option:selected").index()==0){DeptFilt="";}
		}else if($("#ddlIniFilt").val()== 'Office')
		{	
			DeptFilt=$("#ddlOfficeFilt option:selected").text().toLowerCase();
			if($("#ddlOfficeFilt option:selected").index()==0){DeptFilt="";}			
		}else if($("#ddlIniFilt").val()== 'Group')
		{	
			DeptFilt=$("#ddlGroupFilt option:selected").text().toLowerCase();
			if($("#ddlGroupFilt option:selected").index()==0){DeptFilt="";}	
		}else if($("#ddlIniFilt").val()== 'Client')
		{	
			DeptFilt=$("#ddlClientFilt option:selected").text().toLowerCase();
			if($("#ddlClientFilt option:selected").index()==0){DeptFilt="";}			
		}
		var filtTblId="";
		if(procButtonStyle=="Process"){filtTblId="allTemplateData"; }
		else if(procButtonStyle=="Document"){filtTblId="docProcessData"; }
		var StatusFilt=$("#ddlStatusFilt").val().toLowerCase();
		if($("#ddlStatusFilt option:selected").index()==0){StatusFilt="";}
		$("#"+filtTblId+" tr").filter(function() {
	    	$(this).toggle(($(this).find('td:eq(1) div.ellipsis-2').text().toLowerCase()==PorcFilt ||PorcFilt =="")&&($(this).find('td:eq(3) div.ellipsis-Initiation a').text().toLowerCase().trim()==IniFilt ||IniFilt=="") && ($(this).find('td:eq(1) div.ellipsis-initFilt').text().toLowerCase().indexOf(DeptFilt) > -1 ||DeptFilt=="" )&&($(this).find('td:eq(1) div.ellipsis-filtActive').text().toLowerCase()==StatusFilt ||StatusFilt==""))
	    });
	    //$("#filter_pops").hide()
	    
		/* var items; // Data will have user object  
                var results; // console.log(data);
                
                    if (dataAsArr!= null) {  
                        var html='';var docHtml='';
                        
					var activeCount = dataAsArr.filter(val => {
					    return val.Active==true && val.ProcessType=="Process" && val.TrialStatus!="Running";
					});$("#activeCount").text(activeCount.length);
					
					var inactiveCount = dataAsArr.filter(val => {
					    return val.Active==false && val.ProcessType=="Process";
					})
					$("#inactiveCount").text(inactiveCount.length);
					
					var trialCount = dataAsArr.filter(val => {
					    return val.Active==true && val.ProcessType=="Process" && val.TrialStatus=="Running";
					})
					$("#trialCount").text(trialCount.length);
					
					var licensedCount = dataAsArr.filter(val => {
					    return val.Active==true && val.ProcessType=="Process" && val.TrialStatus=="Licenced";
					})
					$("#licensedCount").text(LicBPaas-(licensedCount.length));
					var activeDocCount = dataAsArr.filter(val => {
					    return val.Active==true && val.ProcessType=="Document";
					})
					$("#activeDocCount").text(activeDocCount.length);
					var inactiveCount = dataAsArr.filter(val => {
					    return val.Active==false && val.ProcessType=="Document";
					})
					var dataAsArr1 = dataAsArr.filter(val => {
					    return val.ID==PorcFilt || val.Initiation==IniFilt && val.DepartmentId.results==DeptFilt;
					})
					$("#inactiveDocCount").text(inactiveCount.length);
					    $.each(dataAsArr1, function (index, result) {
					    var Active='';
					    var steps;
					    
					    if(result.NumberOfSteps==null||result.NumberOfSteps==null){steps=0;}
					    else{steps=result.NumberOfSteps;}
					    var TotalRequst = result.NumberOfRequest == null ? 0 : result.NumberOfRequest;
					    var ActiveRequst = result.NumberOfRequest_Active == null ? 0 : result.NumberOfRequest_Active;
					    var trialDate= new Date(result.TrialDate);
  						//trialDate.setDate(trialDate.getDate() + 15);
  						
  						var trialDateTill= new Date();
  						//trialDateTill.setDate(trialDateTill.getDate() + 15);
						var trailText='';
						if(result.Active==true && result.ProcessType == 'Process' && (result.TrialStatus=="Licenced" || result.TrialStatus=="Not Applied" || result.TrialStatus=="" || result.TrialStatus==null)){Active="active";}
					    else if(result.Active==true && result.TrialStatus=="Running" && trialDate>trialDateTill && result.ProcessType == 'Process'){Active="active blue_active";trailText="Trial till "+ String.format('{0:dd} {0:MMM} {0:yyyy}',trialDate);}
						if(result.Active==false && result.ProcessType == 'Process' && (result.TrialStatus=="Licenced" || result.TrialStatus=="Not Applied" || result.TrialStatus=="" || result.TrialStatus==null)){Active="";}
					    else if(result.Active==false && result.TrialStatus=="Expired" && result.ProcessType == 'Process'){Active="";trailText="Trial Expired";}
					    
					    else if(result.Active==true && result.ProcessType == 'Document'){Active="active";}
					    else if(result.Active==false && result.ProcessType == 'Document'){Active="";}
					    
					    if(result.TrialStatus=="Running" && trialDate>trialDateTill){
					   		
					    }else if(result.TrialStatus=="Running" && trialDate<trialDateTill){
					   		
					    }
					    var TrialStatus=result.TrialStatus;
					    if(result.ProcessType == 'Document' && ActiveRequst >0){
					    	docHtml+="<tr> <td class='w-7'> <img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/assets/images/default.png' alt='document' class='table-icon-box'> </td> <td class='w-20'> <div class='table-title mb10 ellipsis-2'>"+result.Title+"</div> <div class='table-title-pera ellipsis-1'>"+result.TemplateName+"</div> </td> <td class='w-20'> <div class='ellipsis-3'>Document Approval</div> </td> <td class='w-10'><a class='add-column-btn' data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+")'><p id='StepsCounts"+result.ID+"'>"+steps+" Steps</p></a></td> <td class='w-10'> <div class='ellipsis-2'> "+TotalRequst +" Total Requests</div> <div class='ellipsis-2'> "+ActiveRequst+" Active Requests</div> </td><td class='w-10'> <button type='button' value='"+result.TrialStatus+"' class='btn btn-sm btn-secondary btn-toggle "+Active+"'  aria-pressed='"+result.Active+"' autocomplete='off' onclick='tempActivationDoc(this,"+result.ID+")' > <div class='handle'></div> </button> <div class=''></div></td> <td class='w-10'> <div class='approval-process-edit-lock-btn-box' style='display:none'> <input type='hidden' value='"+result.ID+"' /> <a type='button' href='#' class='custom-edit-btn' onclick='deletetemp("+result.ID+",this)'> <i class='fa fa-trash-o' ></i> </a></div> </td><td style='display:none'>"+result.Created+"</td> </tr>";					    
					    }
					    else if(result.ProcessType == 'Document'&& ActiveRequst ==0){
					    	docHtml+="<tr> <td class='w-7'> <img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/assets/images/default.png' alt='document' class='table-icon-box'> </td> <td class='w-20'> <div class='table-title mb10 ellipsis-2'>"+result.Title+"</div> <div class='table-title-pera ellipsis-1'>"+result.TemplateName+"</div> </td> <td class='w-20'> <div class='ellipsis-3'>Document Approval</div> </td> <td class='w-10'><a class='add-column-btn' data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+")'><p id='StepsCounts"+result.ID+"'>"+steps+" Steps</p></a></td> <td class='w-10'> <div class='ellipsis-2'> "+TotalRequst +" Total Requests</div> <div class='ellipsis-2'> "+ActiveRequst+" Active Requests</div> </td><td class='w-10'> <button type='button' value='"+result.TrialStatus+"' class='btn btn-sm btn-secondary btn-toggle "+Active+"'  aria-pressed='"+result.Active+"' autocomplete='off' onclick='tempActivationDoc(this,"+result.ID+")' > <div class='handle'></div> </button><div class=''></div> </td> <td class='w-10'> <div class='approval-process-edit-lock-btn-box'> <a type='button' href='#' class='custom-edit-btn' data-toggle='modal' data-target='#documentapproval' onclick='getDocToEdit("+result.ID+")'> <i class='fa fa-pencil'></i> </a><input type='hidden' value='"+result.ID+"' />  <a type='button' href='#' class='custom-edit-btn' onclick='deletetemp("+result.ID+",this)'> <i class='fa fa-trash-o' ></i> </a></div> </td><td style='display:none'>"+result.Created+"</td> </tr>";					    
					    }
					    else if(result.ProcessType == 'Process' && ActiveRequst >0){
  							html+="<tr> <td class='w-7'> <img src='"+result.FileIcon.Url+"' alt='process' class='table-icon-box'> </td> <td class='w-20'> <div class='table-title mb10 ellipsis-2'>"+result.Title+"</div> <div class='table-title-pera ellipsis-1'>"+result.TemplateName+"</div> </td> <td class='w-20'> <div class='ellipsis-3'>"+result.RequestFor+"</div> </td> <td class='w-10'><a class='add-column-btn' data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+")'><p id='StepsCounts"+result.ID+"'>"+steps+" Steps</p></a></td>  <td class='w-10'> <div class='ellipsis-2'> "+TotalRequst +"  Total Requests</div> <div class='ellipsis-2'>"+ActiveRequst +"  Active Requests </div> </td> <td class='w-10'> <button type='button' value='' class='btn btn-sm btn-secondary btn-toggle "+Active+"' aria-pressed='"+result.Active+"' autocomplete='off' onclick='UpdateListItem1("+result.Active+","+result.Id+",\""+TrialStatus+"\",\""+result.TrialDate+"\",\""+result.Title+"\")' data-toggle='modal' data-target='#activation'> <div class='handle'></div> </button><div class=''>"+trailText+"</div> </td> <td class='w-10'> <div class='approval-process-edit-lock-btn-box' style='display:none'> <input type='hidden' value='"+result.ID+"' />  <a type='button' href='#' class='custom-edit-btn' onclick='deletetemp("+result.ID+",this)'> <i class='fa fa-trash-o' ></i> </a></div> </td><td style='display:none'>"+result.Created+"</td> </tr>";
  						}
  						 else if(result.ProcessType == 'Process' && ActiveRequst ==0){
  							html+="<tr> <td class='w-7'> <img src='"+result.FileIcon.Url+"' alt='process' class='table-icon-box'> </td> <td class='w-20'> <div class='table-title mb10 ellipsis-2'>"+result.Title+"</div> <div class='table-title-pera ellipsis-1'>"+result.TemplateName+"</div> </td> <td class='w-20'> <div class='ellipsis-3'>"+result.RequestFor+"</div> </td> <td class='w-10'><a class='add-column-btn' data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+")'><p id='StepsCounts"+result.ID+"'>"+steps+" Steps</p></a></td>  <td class='w-10'> <div class='ellipsis-2'> "+TotalRequst +" Total Requests</div> <div class='ellipsis-2'>"+ActiveRequst +"  Active Requests </div> </td> <td class='w-10'> <button type='button' value='' class='btn btn-sm btn-secondary btn-toggle "+Active+"' aria-pressed='"+result.Active+"' autocomplete='off' onclick='UpdateListItem1("+result.Active+","+result.Id+" ,\""+TrialStatus+"\" ,\""+result.TrialDate+"\",\""+result.Title+"\")' data-toggle='modal' data-target='#activation'> <div class='handle'></div> </button><div class=''>"+trailText+"</div>  </td> <td class='w-10'> <div class='approval-process-edit-lock-btn-box'> <a type='button' href='#' class='custom-edit-btn' data-toggle='modal' data-target='#edit-process-modal' onclick='getDataToEdit("+result.ID+")'> <i class='fa fa-pencil'></i> </a><input type='hidden' value='"+result.ID+"' /> <a type='button' href='#' class='custom-edit-btn' onclick='deletetemp("+result.ID+",this)'> <i class='fa fa-trash-o' ></i> </a> </div> </td><td style='display:none'>"+result.Created+"</td> </tr>";
  						}

					    });
                      //  itemsArray=itemsArray.concat(results);
                        $("#allTemplateData tbody").html(html);
                        $("#docProcessData tbody").html(docHtml);

                    }  */
	});
	$("#btnFilter").click(function(){
		$('#ddlPorcFilt').empty();
		$('#ddlPorcFilt').append("<option value=''>Select</option>");
		 for (i = 0; i < arr.length; i++) {
		 		if(arr[i].ProcessType==procButtonStyle){
                    $('#ddlPorcFilt').append('<option value=' + arr[i].ID + '>' + arr[i].Title + '</option>');                    
                }
         }
	});
	$("#btnClearFilter").click(function(){
		var filtTblId="";
		if(procButtonStyle=="Process"){filtTblId="allTemplateData"; }
		else if(procButtonStyle=="Document"){filtTblId="docProcessData"; }
		$("#"+filtTblId+" tr").filter(function() {
	    	$(this).css("display","table-row");
	    });
	});
	$('#filter_pops').on('hidden.bs.modal', function() {
			var modal = $(this);	
	    	modal.find('.modal-body select').prop('selectedIndex', 0);	
			$('.filterOffice,.filterClient,.filterGroup,.filterClient,.filterDept').css("display", "none");
	});
});
function getOptInitComp(LstName,DropdownId,state){
		
$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('"+LstName+"')/items",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
        	var choiceArray = data.d.results;
        	var option ='';
        	var className='';
				$('#'+DropdownId).empty();
				$('#'+DropdownId).append("<option value=''>Select</option>");
                for (i = 0; i < choiceArray.length; i++) {
                    $('#'+DropdownId).append('<option class="Company" value=' + choiceArray[i].ID + '>' + choiceArray[i].Title + '</li>')
                }				
        	 	
                			
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}
function setDisInit(Init) {    
	if(Init.value == 'Anyone' || Init.value  == 'Employee' || Init.value  == 'Guest User')
	{	
		if(Init.value == 'Employee'){
			$('.filterOffice,.filterClient,.filterGroup,.filterClient,.filterDept').css("display", "none");

		}else{
			$('.filterOffice,.filterClient,.filterGroup,.filterClient,.filterDept').css("display", "none");
		}
		
	}
	else if(Init.value  == 'Selective')
	{		
		$('.filterOffice,.filterClient,.filterGroup,.filterClient,.filterDept').css("display", "none");
		
	}else if(Init.value  == 'Department')
	{	
		getOptInitComp("Departments","ddlDeptFilt","");
		$('.filterDept').css("display", "block");
		$('.filterOffice,.filterClient,.filterGroup').css("display", "none");
		
		
	}else if(Init.value  == 'Office')
	{	
		getOptInitComp("OfficeLocation","ddlOfficeFilt","");
		$('.filterOffice').css("display", "block");
		$('.filterDept,.filterClient,.filterGroup').css("display", "none");
		
	}else if(Init.value  == 'Group')
	{
		getOptInitComp("ApproversGroups","ddlGroupFilt","");
		$('.filterGroup').css("display", "block");
		$('.filterDept,.filterClient,.filterOffice').css("display", "none");


	}else if(Init.value  == 'Client')
	{	
		getOptInitComp("ClientMaster","ddlClientFilt","");
		$('.filterClient').css("display", "block");
		$('.filterDept,.filterOffice,.filterGroup').css("display", "none");

	}else if(Init.selectedIndex == 0)
	{		
		$('.filterOffice,.filterClient,.filterGroup,.filterClient,.filterDept').css("display", "none");
		
	}

}

function showMngtTab(id,sts) {
	$('.btnDef').hide();
	$('.activating,.btnMngt,#defination_tab').show();//$('#Management_tab').css({propertyName: 'Display'});
	$('#Management_tab').hide();$('#liManagement').removeClass('active');$('#liDefination').addClass('active');
	$(".activating span.slidesec").css({"width": "87px", "left": "0px"});
	$("#liDefination").css({"color": "rgb(84, 141, 203)"});
	$("#liManagement").css({"color": "#333"});

	/*$('#Management_tab').addClass('fade');
	$('#Management_tab').removeClass('active');
	

$('#definition_tab').removeClass('fade');
	$('#liDefination').addClass('active');*/

	$('#btnUpdateDetails').val(id);
	var slectedrow=arr.find(x => x.Id === id);	
	var TotalRequst = slectedrow.NumberOfRequest == null ? 0 : slectedrow.NumberOfRequest;
	var ActiveRequst = slectedrow.NumberOfRequest_Active == null ? 0 : slectedrow.NumberOfRequest_Active;
	var status='';
	if(slectedrow.Active==true){
		if(sts=="Licenced"){
			status="Active(Live)";
			$("#txtValidDate").val("Live");
		}else if(sts=="Running"){
			status="Active(Trial)";
			var TrialDate= String.format('{0:dd} {0:MMM} {0:yyyy}',new Date(slectedrow.TrialDate));

			$("#txtValidDate").val(TrialDate);
		}
		
	}else if(slectedrow.Active==false){status="Not Active";$("#txtValidDate").val("");}
		var peoplePickerteamleaderDiv = this.SPClientPeoplePicker.SPClientPeoplePickerDict.txtPublishBy_TopSpan;
	    //	peoplePickerteamleaderDiv.AddUserKeys(SavedStpApprovers[index-1].StUser[i].Key.split('|')[2]);
	    if(slectedrow.PublishedById!=null){
	    	var UserTitle = getUserDetails(slectedrow.PublishedBy.EMail);
	    	//peoplePickerteamleaderDiv.AddUserKeys(UserTitle);
	    }
	    //peoplePickerteamleaderDiv.SetEnabledState(false); 
	if(slectedrow.PublishedOn!=null && slectedrow.PublishedOn!=""){
		var publishedDate= String.format('{0:dd} {0:MMM} {0:yyyy}',new Date(slectedrow.PublishedOn));
		$("#txtPublishOn").val(publishedDate);		
	}else{$("#txtPublishOn").val("");}
	$('#txtStatus').val(status);
	$('#txtTotalReq').val(TotalRequst);$('#txtRunReq').val(ActiveRequst);
	
	let list = document.querySelectorAll('.slideN img');
			for (let i=0; i<list.length; i++){
				let j = 0;
				var stringURL = list[i].getAttribute('src').slice(3).split("?")[0].split("?")[0]
      		    var avoid = "_vti_bin/afdcache.ashx/authitem/";
				var avoided = stringURL.replace(avoid,'');  
					if((slectedrow.FileIcon.Url).includes(avoided)){
						$('#blah').attr("src",'');
						$('.changemeN').addClass('d-block');
	                    $('.changemeN').removeClass('d-none');
	                    $('#Upload-user-imageN').removeClass('d-block');
	                    $('#Upload-user-imageN').addClass('d-none');
						$('#divSelImg').hide();
						let list = document.querySelectorAll('.slideN img');
						for (let j=0; j<list.length; j++){
							list[j].parentElement.className = 'slide slideN';
						}
						$("input[name=UpdateEmpN][value='Choose from gallery']").prop('checked', true);
						list[i].src=list[0].getAttribute('src');

						list[0].src=slectedrow.FileIcon.Url;
						list[0].parentElement.className = 'slide slideN image-active';
						break; 

					}
					else{ 			
						$("input[name=UpdateEmpN][value='Upload']").prop('checked', true);

						list[i].parentElement.className = 'slide slideN';      
						$('#blah').attr("src",slectedrow.FileIcon.Url);
			 			$('#divSelImg').show();
			 			$('.changemeN').removeClass('d-block');
                    	$('.changemeN').addClass('d-none');

                    	$('#Upload-user-imageN').addClass('d-block');
                    	$('#Upload-user-imageN').removeClass('d-none');
			 		}
				
			}

	
	$("#ddlPageColumn").val(slectedrow.PageColumn);

	$("#txtTitle").val(slectedrow.Title);
	$("#txtTemplate").val(slectedrow.TemplateName);
	$("#tmpTitle").text(slectedrow.Title);
	$("#tmpName").text(slectedrow.TemplateName);
	$('#tmpIcon').attr("src",slectedrow.FileIcon.Url);
	$("#txtDetails").val(slectedrow.Details);
	$("#txtInstruct").val(slectedrow.Instructions);
	$('#txtPre').val(slectedrow.Prerequisite);
	var themeopts= slectedrow.Appearance;
    var thm="";
      	if(themeopts=="Theme"){$("#txtThm").val(slectedrow.ThemeColor);$(".themeselect").show();$(".customselect").hide();thm="themeselect";}
      	else if(themeopts=="Custom"){$("#txtCustomThm").val(slectedrow.ThemeColor);$(".customselect").show();$(".themeselect").hide();thm="customselect";}
      	else if(themeopts=="Default"){thm="defaultselect";$(".customselect").hide();$(".themeselect").hide();}
		$("input[name=themopts][value='"+thm+"']").prop('checked', true);
			if(slectedrow.ProcessOwnerId!=null){
				for(i=0;i<slectedrow.ProcessOwnerId.results.length;i++)
				{
					var peoplePickerteamleaderDiv = this.SPClientPeoplePicker.SPClientPeoplePickerDict.spnPreocessOwner_TopSpan;
		    	 //	peoplePickerteamleaderDiv.AddUserKeys(SavedStpApprovers[index-1].StUser[i].Key.split('|')[2]);
		    	 	var UserTitle = GetUserLogin(slectedrow.ProcessOwnerId.results[i]);
		    	 	peoplePickerteamleaderDiv.AddUserKeys(UserTitle);
	     		}
			}
	if(slectedrow.Active==true){
		$("#btnActive").addClass('active');
		$("#btnActive").attr('aria-pressed', 'true');	}
	else{
		$("#btnActive").removeClass('active');
		$("#btnActive").attr('aria-pressed', 'false');	
	}


	$("#ddlReqFor option").each(function()
	{
		if($(this).val()==slectedrow.RequestFor){
			$("#chkReqFor").prop('checked', false);
			$("#ddlReqFor").val(slectedrow.RequestFor);
			$("#ddlReqFor").show();
			$("#txtReqFor").hide();
			return false;
		}
		else{
			$("#chkReqFor").prop('checked', true);
			$("#txtReqFor").val(slectedrow.RequestFor);
			$("#ddlReqFor").hide();
			$("#txtReqFor").show();
		}
	});

}
function sortTemplate(txt) {     
     
                var results; 
                results=arr;
                    
                if(txt=='Title'){
                	results.sort(function (a, b) {
                	if(a.Title!=null && b.Title!=null){
					let fa = a.Title.toLowerCase(),
					        fb = b.Title.toLowerCase();
					
					    if (fa < fb) {
					        return -1;
					    }
					    if (fa > fb) {
					        return 1;
					    }
					    return 0;	
					    }				
				    });
                }
                else if(txt=='TemplateName'){
                	results.sort(function (a, b) {
                	if(a.TemplateName!=null && b.TemplateName!=null){
					let fa = a.TemplateName.toLowerCase(),
					        fb = b.TemplateName.toLowerCase();
					
					    if (fa < fb) {
					        return -1;
					    }
					    if (fa > fb) {
					        return 1;
					    }
					    return 0;	
					    }				
				    });
                }
                else if(txt=='NumberOfRequest'){
                	results.sort(function (a, b) {
						return a.NumberOfRequest- b.NumberOfRequest;
					});
					results.reverse();
                }
                else if(txt=='NumberOfRequest_Active'){
                	results.sort(function (a, b) {
						return a.NumberOfRequest_Active- b.NumberOfRequest_Active;
					});
					results.reverse();
                }
                else if(txt=='Modified'){
                	results.sort(function (a, b) {
						return new Date(a.Modified) - new Date(b.Modified);

					});
					results.reverse();
                }
                else if(txt=='Created'){
                	results.sort(function (a, b) {
						return new Date(a.Created) - new Date(b.Created);

					});
					results.reverse();
                }             

                    if (results!= null) {  
                    var html='';var docHtml='';                        
					 $.each(results, function (index, result) {
					    var Active='';
					    var steps;
					    console.log(result.Title);
					    if(result.NumberOfSteps==null||result.NumberOfSteps==null){steps=0;}
					    else{steps=result.NumberOfSteps;}
					    var TotalRequst = result.NumberOfRequest == null ? 0 : result.NumberOfRequest;
					    var ActiveRequst = result.NumberOfRequest_Active == null ? 0 : result.NumberOfRequest_Active;
					    var trialDate= new Date(result.TrialDate);  						
  						var trialDateTill= new Date();
						var trailText='';
						var filtActive="";
						if(result.Active==true && result.ProcessType == 'Process' && (result.TrialStatus=="Licenced" || result.TrialStatus=="Not Applied" || result.TrialStatus=="" || result.TrialStatus==null)){Active="active";filtActive="Active";}
					    else if(result.Active==true && result.TrialStatus=="Running" && trialDate>trialDateTill && result.ProcessType == 'Process'){Active="active blue_active";trailText="Trial till "+ String.format('{0:dd} {0:MMM} {0:yyyy}',trialDate);filtActive="Under Trial";}
						if(result.Active==false && result.ProcessType == 'Process' && (result.TrialStatus=="Licenced" || result.TrialStatus=="Not Applied" || result.TrialStatus=="" || result.TrialStatus==null)){Active="";filtActive="Inactive";}
					    else if(result.Active==false && result.TrialStatus=="Expired" && result.ProcessType == 'Process'){Active="";trailText="Trial Expired"; filtActive="Inactive";}
					    
					    else if(result.Active==true && result.ProcessType == 'Document'){Active="active";filtActive="Active";}
					    else if(result.Active==false && result.ProcessType == 'Document'){Active="";filtActive="Inactive";}
					    
					    if(result.TrialStatus=="Running" && trialDate>trialDateTill){
					   		
					    }else if(result.TrialStatus=="Running" && trialDate<trialDateTill){
					   		
					    }
					    var initFiltType;
					    if(result.Initiation=="Department"){
						    initFiltType= result.Department.results.map(function(item) {
							  return item['Title'];
							}).join(",");					    	
					    }else if(result.Initiation=="Office"){
						    initFiltType= result.OfficeLocation.results.map(function(item) {
							  return item['Title'];
							});					    	
					    }else if(result.Initiation=="Group"){
						    initFiltType= result.Group.results.map(function(item) {
							  return item['Title'];
							});					    	
					    }else if(result.Initiation=="Client"){
						    initFiltType= result.GuestClient.results.map(function(item) {
							  return item['Title'];
							});					    	
					    }
					    
					    var TrialStatus=result.TrialStatus;
					    if(result.ProcessType == 'Document' && ActiveRequst >0){
					    	docHtml+="<tr> <td class='w-7'> <img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/assets/images/default.png' alt='document' class='table-icon-box'> </td> <td class='w-20'> <div class='table-title mb10 ellipsis-2 sortProcName'>"+result.Title+"</div> <div class='table-title-pera ellipsis-1 sortTempName'>"+result.TemplateName+"</div><div class='table-title-pera ellipsis-initFilt' style='display:none'>"+initFiltType+"</div><div class='ellipsis-filtActive' style='display:none'>"+filtActive+"</div> </td> <td class='w-20'> <div class='ellipsis-3'>Document Approval</div> </td> <td class='w-10'><div class='table-title-pera ellipsis-Initiation'>Initiator :<a data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+",\""+'Initiation'+"\")'> "+result.Initiation+"</a></div><div class='table-title-pera ellipsis-Init'>Steps :<a class='add-column-btn' data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+",\""+'Steps'+"\")'> "+steps+" Steps</a></div></td> <td class='w-10'> <div class='ellipsis-2 '><span class='sortMaxReq'>"+TotalRequst +"</span> Total Requests</div> <div class='ellipsis-2 sortMaxActReq'> "+ActiveRequst+" Active Requests</div> </td><td class='w-10'> <button type='button' value='"+result.TrialStatus+"' class='btn btn-sm btn-secondary btn-toggle "+Active+"'  aria-pressed='"+result.Active+"' autocomplete='off' onclick='tempActivationDoc(this,"+result.ID+")' > <div class='handle'></div> </button> <div class=''></div></td> <td class='w-10'> <div class='approval-process-edit-lock-btn-box' style='display:none'> <input type='hidden' value='"+result.ID+"' /> <a type='button' href='#' class='custom-edit-btn' onclick='deletetemp("+result.ID+",this)'> <i class='fa fa-trash-o' ></i> </a></div> </td><td style='display:none'>"+result.Created+"</td> </tr>";					    
					    }
					    else if(result.ProcessType == 'Document'&& ActiveRequst ==0){
					    	docHtml+="<tr> <td class='w-7'> <img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/assets/images/default.png' alt='document' class='table-icon-box'> </td> <td class='w-20'> <div class='table-title mb10 ellipsis-2 sortProcName'>"+result.Title+"</div> <div class='table-title-pera ellipsis-1 sortTempName'>"+result.TemplateName+"</div> <div class='table-title-pera ellipsis-initFilt' style='display:none'>"+initFiltType+"</div><div class='ellipsis-filtActive' style='display:none'>"+filtActive+"</div> </td> <td class='w-20'> <div class='ellipsis-3'>Document Approval</div> </td> <td class='w-10'><div class='table-title-pera ellipsis-Initiation'>Initiator :<a data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+",\""+'Initiation'+"\")'> "+result.Initiation+"</a></div><div class='table-title-pera ellipsis-Init'>Steps :<a class='add-column-btn' data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+",\""+'Steps'+"\")'> "+steps+" Steps</a></div></td> <td class='w-10'> <div class='ellipsis-2 '><span class='sortMaxReq'>"+TotalRequst +"</span> Total Requests</div> <div class='ellipsis-2 sortMaxActReq'> "+ActiveRequst+" Active Requests</div> </td><td class='w-10'> <button type='button' value='"+result.TrialStatus+"' class='btn btn-sm btn-secondary btn-toggle "+Active+"'  aria-pressed='"+result.Active+"' autocomplete='off' onclick='tempActivationDoc(this,"+result.ID+")' > <div class='handle'></div> </button><div class=''></div> </td> <td class='w-10'> <div class='approval-process-edit-lock-btn-box'> <a type='button' href='#' class='custom-edit-btn' data-toggle='modal' data-target='#documentapproval' onclick='getDocToEdit("+result.ID+")'> <i class='fa fa-pencil'></i> </a><input type='hidden' value='"+result.ID+"' />  <a type='button' href='#' class='custom-edit-btn' onclick='deletetemp("+result.ID+",this)'> <i class='fa fa-trash-o' ></i> </a></div> </td><td style='display:none'>"+result.Created+"</td> </tr>";					    
					    }
					    else if(result.ProcessType == 'Process' && ActiveRequst >0){
  							html+="<tr> <td class='w-7'> <img src='"+result.FileIcon.Url+"' alt='process' class='table-icon-box'> </td> <td class='w-20'> <div class='table-title mb10 ellipsis-2 sortProcName'><a href='#' data-toggle='modal' data-target='#new_Procesing_tbs' onclick='showMngtTab("+result.ID+")'>"+result.Title+"</a></div> <div class='table-title-pera ellipsis-1 sortTempName'>"+result.TemplateName+"</div> <div class='table-title-pera ellipsis-initFilt' style='display:none'>"+initFiltType+"</div><div class='ellipsis-filtActive' style='display:none'>"+filtActive+"</div> </td> <td class='w-20'> <div class='ellipsis-3'>"+result.RequestFor+"</div> </td> <td class='w-10'><div class='table-title-pera ellipsis-Initiation'>Initiator :<a data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+",\""+'Initiation'+"\")'> "+result.Initiation+"</a></div><div class='table-title-pera ellipsis-Init'>Steps :<a class='add-column-btn' data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+",\""+'Steps'+"\")'> "+steps+" Steps</a></div></td>  <td class='w-10'> <div class='ellipsis-2 '><span class='sortMaxReq'>"+TotalRequst +"</span> Total Requests</div> <div class='ellipsis-2 sortMaxActReq'>"+ActiveRequst +"  Active Requests </div> </td> <td class='w-10'> <button type='button' value='' class='btn btn-sm btn-secondary btn-toggle "+Active+"' aria-pressed='"+result.Active+"' autocomplete='off' onclick='UpdateListItem1("+result.Active+","+result.Id+",\""+TrialStatus+"\",\""+result.TrialDate+"\")' data-toggle='modal' data-target='#activation'> <div class='handle'></div> </button><div class=''>"+trailText+"</div> </td> <td class='w-10'> <div class='approval-process-edit-lock-btn-box' style='display:none'> <input type='hidden' value='"+result.ID+"' />  <a type='button' href='#' class='custom-edit-btn' onclick='deletetemp("+result.ID+",this)'> <i class='fa fa-trash-o' ></i> </a></div> </td><td style='display:none'>"+result.Created+"</td> </tr>";
  						}
  						 else if(result.ProcessType == 'Process' && ActiveRequst ==0){
  							html+="<tr> <td class='w-7'> <img src='"+result.FileIcon.Url+"' alt='process' class='table-icon-box'> </td> <td class='w-20'> <div class='table-title mb10 ellipsis-2 sortProcName'><a href='#' data-toggle='modal' data-target='#new_Procesing_tbs' onclick='showMngtTab("+result.ID+")'>"+result.Title+"</a></div> <div class='table-title-pera ellipsis-1 sortTempName'>"+result.TemplateName+"</div> <div class='table-title-pera ellipsis-initFilt' style='display:none'>"+initFiltType+"</div><div class='ellipsis-filtActive' style='display:none'>"+filtActive+"</div></td> <td class='w-20'> <div class='ellipsis-3'>"+result.RequestFor+"</div> </td> <td class='w-10'><div class='table-title-pera ellipsis-Initiation'>Initiator :<a data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+",\""+'Initiation'+"\")'> "+result.Initiation+"</a></div><div class='table-title-pera ellipsis-Init'>Steps :<a class='add-column-btn' data-toggle='modal' href='#' data-target='#stepsapprover' onclick='getTempID("+result.ID+",\""+'Steps'+"\")'> "+steps+" Steps</a></div></td>  <td class='w-10'> <div class='ellipsis-2 '><span class='sortMaxReq'>"+TotalRequst +"</span> Total Requests</div> <div class='ellipsis-2 sortMaxActReq'>"+ActiveRequst +"  Active Requests </div> </td> <td class='w-10'> <button type='button' value='' class='btn btn-sm btn-secondary btn-toggle "+Active+"' aria-pressed='"+result.Active+"' autocomplete='off' onclick='UpdateListItem1("+result.Active+","+result.Id+" ,\""+TrialStatus+"\" ,\""+result.TrialDate+"\")' data-toggle='modal' data-target='#activation'> <div class='handle'></div> </button><div class=''>"+trailText+"</div>  </td> <td class='w-10'> <div class='approval-process-edit-lock-btn-box'> <a type='button' href='#' class='custom-edit-btn' data-toggle='modal' data-target='#edit-process-modal' onclick='getDataToEdit("+result.ID+")'> <i class='fa fa-pencil'></i> </a><input type='hidden' value='"+result.ID+"' /> <a type='button' href='#' class='custom-edit-btn' onclick='deletetemp("+result.ID+",this)'> <i class='fa fa-trash-o' ></i> </a> </div> </td><td style='display:none'>"+result.Created+"</td> </tr>";
  						}

					    });
                      if($("#processapproval").is(":visible")){
                      	$("#allTemplateData tbody").html(html);
                      }else if($("#documentapprovalsec").is(":visible")){
                        $("#docProcessData tbody").html(docHtml);                        
                      }

                    }  
            
    }
    
    function getUserDetails(userNamecurretn){
                            var Query = "?$select=Id,Title,PrimaryCompany,AttachmentFiles,Status,FullName,Designation,LogonName/EMail,LogonName/FirstName,LogonName/LastName,Company/Id,Company/Title,Department/Title,Designation&$expand=LogonName,AttachmentFiles,Company,Department&$top=5000&$filter=Status eq 'Active' and PrimaryCompany eq 'Primary' and LogonName/EMail eq '" + userNamecurretn + "' ";
                            var defaultRows='';
                            $.when(getItemsWithQueryItems('Employees', Query)).done(function (UserResults) {
                                UResults = UserResults.results;
                                var value = UResults[0];
                                if (UResults.length > 0) {
                                    if (value.AttachmentFiles.results.length > 0) {
                                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
                                    }
                                    else {
                                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.LogonName.EMail);
                                    }
                                    defaultRows += '<div class="col-md-4 col-sm-6 col-xs-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LogonName.FirstName + ' ' + value.LogonName.LastName + '</h3>';
                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
                                    defaultRows += '</div></div></div>'; // class - row group-inner-scroll scrollbar-panel ends here

                                }
                                else {
                                	//External Users
                                	var Query = "?$select=AttachmentFiles,LoginName/EMail,email,LoginName/Title,LoginName/Id,Designation,Client_Name/Title&$expand=AttachmentFiles,LoginName,Client_Name&$filter=email eq '" + userNamecurretn + "'&$top=5000";
		                            $.when(getItemsWithQueryItems('ExternalUsers', Query)).done(function (UserResults) {
		                                UResults = UserResults.results;
		                                var value = UResults[0];
		                                if (UResults.length > 0) {
		                                    if (value.AttachmentFiles.results.length > 0) {
		                                        attachmentUrl = value.AttachmentFiles.results[0].ServerRelativeUrl;
		                                    }
		                                    else {
		                                        attachmentUrl = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(value.email);
		                                    }
		                                    defaultRows += '<div class="col-md-4 col-sm-6 col-xs-12"><div class="groups-card"><div class="groups-card-head"><img src=' + attachmentUrl + ' alt="user"></div>';
		                                    defaultRows += '<div class="groups-card-body"><div class="groups-card-body-info text-ellipsis"><h3 class="member-name text-ellipsis">' + value.LoginName.Title+ ' </h3>';
		                                    defaultRows += '<p class="member-email text-ellipsis"><a href="mailto:' + userNamecurretn + '">' + userNamecurretn + '</a></p></div>';
		                                    defaultRows += '</div></div></div>'; // class - row group-inner-scroll scrollbar-panel ends here
		
		                                }
		                            });
                                }
                            });
                       $("#txtPublishBy").html(defaultRows);
                
}
// You can upload files up to 2 GB with the REST API.
function uploadFile(op) {

    // Define the folder path for this example.
    var serverRelativeUrlToFolder = 'SiteAssets/ProcessApproval/assets/images';
    var fileInput;
	if(op=='Add'){
    	fileInput = jQuery('.approve-process-upload-image-inp');
    }
    else{
        fileInput = jQuery('.approve-process-upload-image-inp');

    }

    // Get test values from the file input and text input page controls.
    //var fileInput = jQuery('.approve-process-upload-image-inp');
    var newName = jQuery('#displayName').val();

    // Get the server URL.
    var serverUrl = _spPageContextInfo.webAbsoluteUrl;

    // Initiate method calls using jQuery promises.
    // Get the local file as an array buffer.
    var getFile = getFileBuffer();
    getFile.done(function (arrayBuffer) {

        // Add the file to the SharePoint folder.
        var addFile = addFileToFolder(arrayBuffer);
        addFile.done(function (file, status, xhr) {

            // Get the list item that corresponds to the uploaded file.
            var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
            getItem.done(function (listItem, status, xhr) {

                // Change the display name and title of the list item.
                var changeItem = updateListItem(listItem.d.__metadata);
                changeItem.done(function (data, status, xhr) {
                    //alert('file uploaded and updated');
                    getLatestImage(listItem.d.File.__deferred.uri,op)
                });
                changeItem.fail(onError);
            });
            getItem.fail(onError);
        });
        addFile.fail(onError);
    });
    getFile.fail(onError);

    // Get the local file as an array buffer.
    function getFileBuffer() {
        var deferred = jQuery.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        }
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        }
        reader.readAsArrayBuffer(fileInput[0].files[0]);
        return deferred.promise();
    }

    // Add the file to the file collection in the Shared Documents folder.
    function addFileToFolder(arrayBuffer) {

        // Get the file name from the file input control on the page.
        var parts = fileInput[0].value.split('\\');
        var fileName = parts[parts.length - 1];

        // Construct the endpoint.
        var fileCollectionEndpoint = String.format(
                "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
                "/add(overwrite=true, url='{2}')",
                serverUrl, serverRelativeUrlToFolder, fileName);

        // Send the request and return the response.
        // This call returns the SharePoint file.
        return jQuery.ajax({
            url: fileCollectionEndpoint,
            type: "POST",
            data: arrayBuffer,
            processData: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
               // "content-length": arrayBuffer.byteLength
            }
        });
    }
 // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
    function getListItem(fileListItemUri) {

        // Send the request and return the response.
        return jQuery.ajax({
            url: fileListItemUri,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" }
        });
    }

    // Change the display name and title of the list item.
    function updateListItem(itemMetadata) {

        // Define the list item changes. Use the FileLeafRef property to change the display name. 
        // For simplicity, also use the name as the title. 
        // The example gets the list item type from the item's metadata, but you can also get it from the
        // ListItemEntityTypeFullName property of the list.
        var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}'}}",
            itemMetadata.type, newName, newName);

        // Send the request and return the promise.
        // This call does not return response content from the server.
        return jQuery.ajax({
            url: itemMetadata.uri,
            type: "POST",
            data: body,
            headers: {
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-type": "application/json;odata=verbose",
                //"content-length": body.length,
                "IF-MATCH": itemMetadata.etag,
                "X-HTTP-Method": "MERGE"
            }
        });
    }
}

// Display error messages. 
function onError(error) {
    alert(error.responseText);
}