$(document).ready(function () { 	
    $('.PartialTableChkbox').on('click',function(){
        if($('.PartialTableChkbox:checked').length == $('.PartialTableChkbox').length){
           // $('#select_all').prop('checked',true);
            select_all_checkboxes.checked = true;
        }else{
            $('#select_all').prop('checked',false);
        }
    });
    $("#setEditableSelAll").click(function(){
    	let select_all_checkboxes = document.getElementById("setEditableSelAll");
	    let delete_checkbox = document.getElementsByName("PartialTableChkbox");
	
	    select_all_checkboxes.addEventListener("change", function () {
	        for (let i = 0; i < delete_checkbox.length; i++) {
	            if (select_all_checkboxes.checked === true) {
	                delete_checkbox[i].checked = true;
	            } else {
	                delete_checkbox[i].checked = false;
	            }        
	        }
	    });
    });
    $("#setEditableSelStepsAll").click(function(){
    	let select_all_checkboxes = document.getElementById("setEditableSelStepsAll");
	    let delete_checkbox = document.getElementsByName("PartialTableChkboxSteps");
	
	    select_all_checkboxes.addEventListener("change", function () {
	        for (let i = 0; i < delete_checkbox.length; i++) {
	            if (select_all_checkboxes.checked === true) {
	                delete_checkbox[i].checked = true;
	            } else {
	                delete_checkbox[i].checked = false;
	            }        
	        }
	    });
    });
    $("#setEditableColSelAll").click(function(){
    	let select_all_checkboxes = document.getElementById("setEditableColSelAll");
	    let delete_checkbox = document.getElementsByName("TableChkboxSteps");
	
	    select_all_checkboxes.addEventListener("change", function () {
	        for (let i = 0; i < delete_checkbox.length; i++) {
	            if (select_all_checkboxes.checked === true) {
	                delete_checkbox[i].checked = true;
	            } else {
	                delete_checkbox[i].checked = false;
	            }        
	        }
	    });
    });
	var peoplePickerDiv = '';
	var CurrTenplateID = '';
	//var radioValue = $("input[name='optradio']:checked").val();
	$('input[name="optradio"]').change(function() {	
    if(this.value == 'User'){
    	//alert(this.value);
		initializePeoplePicker('Stepuser');                
	    peoplePickerDiv = $("[id$='Stepuser_TopSpan']"); 
	  }
	})
	$('#btnSubmitStep').click(function () {
		SaveApprovers();
		//getAllTemplate();
	//	SaveApproverQueue();
	});
	
	$("#btnAddStep").on( "click", function(event){
		event.preventDefault();
		var rdovalue=$("input[name='optradio']:checked").val();
		var ApprType =	$("input[type='radio'][name=optionls]:checked").val();
			
		if($("#txtStepName").val()==''){alert("Kindly enter the StepName.");return false;}
		if(rdovalue=='Role'){
			if($("#ddlroles").prop('selectedIndex')==0){alert("Please select role.");return false;}
			if(ApprType=='At Bottom of'){
				if($("#PositionOptList").prop('selectedIndex')==0){alert("Please select position.");return false;}
			}
		}else if(rdovalue=='Group'){
			if($("#ddlgroups").prop('selectedIndex')==0){alert("Please select group.");return false;}
			if(ApprType=='At Bottom of'){
				if($("#PositionOptList").prop('selectedIndex')==0){alert("Please select position.");return false;}
			}
		}else if(rdovalue=='Field'){
			if($("#ddlPersonColumn").prop('selectedIndex')==0){alert("Please select column.");return false;}
			if(ApprType=='At Bottom of'){
				if($("#PositionOptList").prop('selectedIndex')==0){alert("Please select position.");return false;}
			}
		}else if(rdovalue=='Runtime'){
			if(ApprType=='At Bottom of'){
				if($("#PositionOptList").prop('selectedIndex')==0){alert("Please select position.");return false;}
			}
		}else if(rdovalue=='User'){
			var peoplePickerDiv =$("[id$='Stepuser_TopSpan']");
			var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id]; 
			var users = peoplePicker.GetAllUserInfo()
			if(users.length==0){alert("Please enter user.");return false;}
			if(ApprType=='At Bottom of'){
				if($("#PositionOptList").prop('selectedIndex')==0){alert("Please select position.");return false;}
			}
		}
		if($("#ActionReq").val() == 'Review & Sign'){}
		else{
			var yourArray=[];
	        $("input:checkbox[name='PartialTableChkboxSteps']:checked").each(function(){
	    		yourArray.push($(this).val());
			});
			
			if($("#ActionReq").val() == 'Review Only')
			{
				//ValidationStep=true;
			//alert('Set Editable Column List.');return false;
			}
			else{
				if(ProcessType=="Process"){
					if(yourArray.length==0){
						alert('Set the editable columns')	;return false;
					}
				}
			}

		}
		AddStep();
		if(StpApprovers.length>0)
		{
			SetApproversList();
		}
		else if(SavedstpCount > 0)
		{    		UpdateApproverStps();
	
			alert('Action Taken Successfully.');
			$('#adds_stepsection').modal('hide');
		}	
		else
		{
			alert('Define The Process Steps.');
		}
		$('#adds_stepsection').modal('hide');
	});
	$('#btnEditStep').click(function () {
		if($("#ActionReq").val() == 'Review & Sign'){}
		else{
			var yourArray=[];
	        $("input:checkbox[name='PartialTableChkboxSteps']:checked").each(function(){
	    		yourArray.push($(this).val());
			});
			if($("#ActionReq").val() != 'Review Only'){
				if(ProcessType="Process"){
					if(yourArray.length==0){
						alert('Set the editable columns')	;return false;
					}
				}
			}
		}
		EditStepSubmit();
		$('#adds_stepsection').modal('hide');
	});

	GetAllUser()
	
	
})

// Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId) {
	
    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '390';
    // Render and initialize the picker. 
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
    $(".sp-peoplepicker-editorInput").width(310);
}


var PrTableColumnID=[];
var StepCount = 0;
var StpApprovers = [];
var StepApprver = [];
function AddStep()
{	
	StpApprovers=[];
	var ActionReq=$("#ActionReq").val();
	var signPosition='BottomMost';
	var groups= '';var ColName= '';var prevStep,prevStepID='';
	var isChecked = false;
		if(ProcessType=="Document"){
			isChecked = $('#chkSign').is(':checked');
		}
	if(ActionReq=="Review & Sign" || ActionReq=="Edit & Sign"){
		var ApprType =	$("input[type='radio'][name=optionls]:checked").val();
		if(ApprType=="At Bottom most"){
			signPosition='BottomMost';
		}else if(ApprType=="At Bottom of"){
			if($("#PositionOptList").prop('selectedIndex')==0){alert("Please select position.");}
			signPosition=$("#PositionOptList").val()
		}
	}
	
	if($("#ActionReq").val() == 'Review & Sign')
	{	 
		var StpName = $('#txtStepName').val();
		var radioValue = $("input[name='optradio']:checked").val();
		peoplePickerDiv = $("[id$='Stepuser_TopSpan']"); 
		//StepApprver = [];
		if(StpName == '')
		{
			alert('Kindly enter the StepName.');
			return false;
		}
		StepApprver = [];
		if(radioValue == 'User')
		{
			var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id]; 
			var users = peoplePicker.GetAllUserInfo()
			var DoesNotexietuser = "";
			var IsTrue = false;
			var userArr=[];	

			for (var j = 0; j < users.length; j++) 
			{	var flag=false;
				var arrSubVisaLetters = AllEmployee.filter(function (filterData) {
					if(filterData.EMail == users[j].EntityData.Email){flag=true;}
					return filterData.EMail == users[j].EntityData.Email;
			    });
				//if(!flag){alert("Selected user "+users[j].DisplayText+" not in list"); return false;}
			    if(arrSubVisaLetters.length==0){userArr.push(users[j].DisplayText)}
		        if(arrSubVisaLetters.length>0){
		        	StepApprver.push({'Name' : arrSubVisaLetters[0].EMail , 'Id': arrSubVisaLetters[0].UserId})	 
		        }
			    //StepApprver.push(arrSubVisaLetters[0].UserId)	    
			}	
		    if(userArr.length>0){alert("Selected user "+userArr+" not in list"); return false;}	     
   	    
		    setTimeout(function () {
		    	AddNewStep(StpName ,'',users,ActionReq);
		    },100);
		}else if(radioValue == 'Group'){	
			groups = $("#ddlgroups option:selected").val();	
			grpName = $("#ddlgroups option:selected").text();
			setTimeout(function () {
			    AddNewStep(StpName ,grpName,users,ActionReq);
		    },100);
		}else if(radioValue == 'Field'){	
			ColName= $("#ddlPersonColumn option:selected").val();
			setTimeout(function () {
			   // AddNewStep(StpName ,ColName,users,ActionReq);
		    },100);
		}else if(radioValue == 'Runtime'){	
			prevStep= $("#ddlPreSteps option:selected").text();
			prevStepID= $("#ddlPreSteps option:selected").val();
			setTimeout(function () {
			   // AddNewStep(StpName ,ColName,users,ActionReq);
		    },100);
		}
		else{	
			var role = $('#ddlroles').val();
			radioValue='Role';	
			setTimeout(function () {
			    AddNewStep(StpName ,role ,users,ActionReq);
		    },100);
		}
		StpApprovers.push({'FooterSign':isChecked ,'StName': StpName, 'Type': radioValue, 'StRole': role, 'StUser': users, 'UsrID': StepApprver,'ActionReq' : ActionReq, 'SignPosition':signPosition,'GroupName':groups,'ColName':ColName,'ApproverDecidingStep':prevStep,'ApproverDecStepId':prevStepID});
	}
	else
	{
		var yourArray=[];
       // $("input:checkbox[name='PartialTableChkboxSteps']:checked").each(function(){
    	//	yourArray.push($(this).val());
		//});
		$("input:checkbox[name='PartialTableChkboxSteps']:checked").each(function(){
		    //yourArray.push($(this).val());
		    yourArray.push({"tblId": $(this).val(), "tblEditScope": "","tblColIds": ""});
		});
		$("select[name='tblColSetFieldSteps']").each(function(){
			yourArray.push({"tblId": $(this).attr('id'), "tblEditScope": $(this).val(),"tblColIds": $(this).siblings(0).val()});
		});
		if(yourArray.length>0||yourArray.length==0)
		{
			var StpName = $('#txtStepName').val();
			var radioValue = $("input[name='optradio']:checked").val();
			peoplePickerDiv = $("[id$='Stepuser_TopSpan']"); 
			//StepApprver = [];
			if(StpName == '')
			{
				alert('Kindly enter the StepName.');
				return false;
			}
			StepApprver = [];
			var userArr=[];
			if(radioValue == 'User')
			{
				var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id]; 
				var users = peoplePicker.GetAllUserInfo()
				var DoesNotexietuser = "";
				var IsTrue = false;
				for (var j = 0; j < users.length; j++) 
				{
					var arrSubVisaLetters = AllEmployee.filter(function (filterData) {
						return filterData.EMail == users[j].EntityData.Email;
				    });
				   // StepApprver.push(arrSubVisaLetters[0].UserId)	
				   if(arrSubVisaLetters.length==0){userArr.push(users[j].DisplayText)}
			        if(arrSubVisaLetters.length>0){
			        	StepApprver.push({'Name' : arrSubVisaLetters[0].EMail , 'Id': arrSubVisaLetters[0].UserId})	 
			        }    
				}	
		    if(userArr.length>0){alert("Selected user "+userArr+" not in list"); return false;}
			    setTimeout(function () {
			    	AddNewStep(StpName ,'',users,ActionReq);
			    },100);
			}else if(radioValue == 'Group'){	
				groups = $("#ddlgroups option:selected").val();	
				ColName = $("#ddlgroups option:selected").text();
				setTimeout(function () {
				    AddNewStep(StpName ,grpName,users,ActionReq);
			    },100);
			}else if(radioValue == 'Field'){	
				ColName = $("#ddlPersonColumn option:selected").val();
				setTimeout(function () {
				    AddNewStep(StpName ,grpName,users,ActionReq);
			    },100);
			}else if(radioValue == 'Runtime'){	
				prevStep = $("#ddlPreSteps option:selected").text();
				prevStepID= $("#ddlPreSteps option:selected").val();
				setTimeout(function () {
				    AddNewStep(StpName ,prevStep,users,ActionReq);
			    },100);
			}

			else
			{	
				var role = $('#ddlroles').val();
				radioValue='Role Based';	
				setTimeout(function () {
				    AddNewStep(StpName ,role ,users,ActionReq);
			    },100);
			}
					
			StpApprovers.push({'FooterSign':isChecked ,'StName': StpName, 'Type': radioValue, 'StRole': role, 'StUser': users, 'UsrID': StepApprver,'ActionReq' : ActionReq,'SignPosition':signPosition,'GroupName':groups,'ColName':ColName,'ApproverDecidingStep':prevStep,'ApproverDecStepId':prevStepID});
			PrTableColumnID.push({'TemplateID':CurrTenplateID,'EditScope':$("#ActionReq").val(),'StName': StpName,'StepType':'Process Steps', 'ColumnNo':yourArray})
		}
		else
		{
				
		}	
	}
}

function AddNewStep(Step,Role,User,Action){
	 StepCount = StepCount + 1;	 
	 var StepDiv = '';
	 StepDiv += '<li><div class="topsec">'
	 StepDiv +=	'<h3>'+Step+'</h3>'
	 StepDiv +=	'<h4>'+Action+'</h4>'
	 StepDiv +=	'<div class="dropdown pull-right">'
	 StepDiv +=	'<button class="dropdown-toggle" type="button" data-toggle="dropdown">'
	 StepDiv +=	'<i class="fa fa-ellipsis-v" aria-hidden="true"></i> </button>'
	 StepDiv +=	'<ul class="dropdown-menu">'
	 StepDiv +=	'<li onclick="EditStep('+StepCount+',this)" data-toggle="modal" data-target="#"><a href="#"><i class="fa fa-pencil" ></i> Edit</a></li>'
	 StepDiv +=	'<li onclick="DeleteStep('+StepCount+',this)"><a href="#"><i class="fa fa-trash"></i> Delete</a></li>'
	 StepDiv +=	'</ul></div></div>'
	 StepDiv +=	'<div style="clear:both"></div>'
	 StepDiv +=	'<div class="flexitem">'
	if(Role != ''){		 
		 StepDiv +=		'<div class="imgsetion">'
		 StepDiv +=		'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
		 StepDiv +=		'</div>'		 
		 StepDiv +=		'<div class="imagecontent">'
	//	 StepDiv += 	'<h4>' + StepApprver + '</h4>'				 
		 StepDiv += 	'<h4>'+Role+'</h4>'
		 StepDiv +=		'</div>'	
	}else{
	for(i=0;i<User.length;i++){
		var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(User[i].EntityData.Email);
	    StepDiv +=	 '<div class="imgsetion"><div class="empoyeeimg" style="float:left;"><img title="' + User[i].DisplayText + '" src="' + Authorattachment + '" alt="" data-themekey="#">';
	    StepDiv +=	 '</div></div><div class="imagecontent"><h4>' + User[i].DisplayText + '</h4><a href="#" style="cursor: auto;">'+User[i].EntityData.Email+'</a></div>'; 
		}
    }
	StepDiv +=	 '</div></li>'
	//$('.stepbox').append(StepDiv);
	ClearDetails();	
//alert('Add');
}


function DeleteStep(index,elm){
	elm.parentNode.parentNode.parentNode.parentNode.remove();
	StpApprovers.findIndex(x => x.Id === index).remove();
	StpApprovers.splice(StpApprovers.findIndex(x => x.Id === index), 1);
	StepCount = StepCount - 1;
}
var IsNewStp = false;
function EditStep(index,elm){
	$("#btnAddStep").hide();
	$("#btnEditStep").show();
	$("#btnEditStep").val(index);
	if(elm != null){
		elm.parentNode.parentNode.parentNode.parentNode.remove();
	}
	
	$("#txtStepName").val(StpApprovers[index-1].StName);
	$("#ActionReq").val(StpApprovers[index-1].ActionReq);
	if(StpApprovers[index-1].SignPosition=="BottomMost"){
		$("input[name=optionls][text='At Bottom most']").prop('checked', true);
	}else{
		$("input[name=optionls][value='At Bottom of']").prop('checked', true);
		$("#PositionOptList").val(StpApprovers[index-1].SignPosition).attr("selected","selected");
	}

	SetDisplayPrTable4Approvers(StpApprovers[index-1].ActionReq);
	
	IsNewStp = true;	
	/*if(StpApprovers[index-1].StRole!=''){
		$("#ddlroles").val(StpApprovers[index-1].StRole);
		$("input[name=optradio][value=Role]").prop('checked', true);
		$('.usrbox').hide();
		$('.rolbox').show();
	}
	else{
		$("input[name=optradio][value=User]").prop('checked', true);
		$('.usrbox').show();
		$('.rolbox').hide();
		initializePeoplePicker('Stepuser');                
	    peoplePickerDiv = $("[id$='Stepuser_TopSpan']"); 
		for(i=0;i<StpApprovers[index-1].StUser.length;i++){
			var peoplePickerteamleaderDiv = this.SPClientPeoplePicker.SPClientPeoplePickerDict.Stepuser_TopSpan;
	     	peoplePickerteamleaderDiv.AddUserKeys(StpApprovers[index-1].StUser[i].Key.split('|')[2]);
     	}
	}*/
	if(StpApprovers[index-1].Type == 'Role Based' || StpApprovers[index-1].Type == 'Role')
		{
			$("#ddlroles").val(StpApprovers[index-1].StRole);
			$("input[name=optradio][value=Role]").prop('checked', true);
			$('.usrbox').hide();
			$('.rolbox').show();
			$('.grpbox').hide();
		}else if(StpApprovers[index-1].Type == 'Group')
		{
			$("#ddlgroups").val(StpApprovers[index-1].GroupName);
			$("input[name=optradio][value=Group]").prop('checked', true);
			$('.usrbox').hide();
			$('.rolbox').hide();
			$('.grpbox').show();
		}
		else
		{
			$("input[name=optradio][value=User]").prop('checked', true);
			$('.usrbox').show();
			$('.rolbox').hide();
			$('.grpbox').hide();
			initializePeoplePicker('Stepuser');                
	    	peoplePickerDiv = $("[id$='Stepuser_TopSpan']"); 
			for(i=0;i<StpApprovers[index-1].StUser.length;i++)
			{
				var peoplePickerteamleaderDiv = this.SPClientPeoplePicker.SPClientPeoplePickerDict.Stepuser_TopSpan;
	    	 //	peoplePickerteamleaderDiv.AddUserKeys(SavedStpApprovers[index-1].StUser[i].Key.split('|')[2]);
	     		peoplePickerteamleaderDiv.AddUserKeys(StpApprovers[index-1].StUser[i].Key.split('|')[2]);
	    	 	//peoplePickerteamleaderDiv.AddUserKeys(UserTitle);
     		}
		}
}

var ActiveMode='';
var EditStpID = '';
function EditEStep(index,ID)
{
	ActiveMode='';
	
	
	if(ActiveProessCount == 0)
	{
		$('#adds_stepsection').modal('show');
		LoadPartialTableSteps('Edit',ID);
		ActiveMode='EditStep';
		let result = SavedStpApprovers.find(x => x.Id === ID)
		$('#chkAllStack').prop('checked',result.Stakeholder);

		$("#btnAddStep").hide();
		$("#btnEditStep").show();
		$("#btnEditStep").val(index);
		EditStpID = ID;	
		$("#txtStepName").val(result.StName);
		$("#ActionReq").val(result.ActionReq);
		if(ProcessType=="Process"){
			if(result.SignPosition=="BottomMost"){
				$("input[name=optionls][value='At Bottom most']").prop('checked', true);
				$("#PositionOptList").hide();
			}else{
				$("input[name=optionls][value='At Bottom of']").prop('checked', true);
				$("#PositionOptList").val(result.SignPosition).attr("selected","selected");
				$("#PositionOptList").show();
			}
			if(result.ActionReq=="Edit Data" || result.ActionReq=="Review Only"){
   				$(".stepsOfProc").css("visibility", "hidden");
   			}else{
   				$(".stepsOfProc").css("visibility", "visible");
   			}
   			//$(".stepsOfProc").css("visibility", "visible");
   		}else if(ProcessType=="Document"){
   				$(".signBox").css("display", "initial");
   				$(".stepsOfProc").css("visibility", "hidden");
   				$('#chkSign').prop('checked', result.FooterSign);
   		}
   		
		SetDisplayPrTable4Approvers(result.ActionReq);
		
		IsNewStp = false;	
		if(result.Type == 'Role Based' || result.Type == 'Role')
		{
			$("#ddlroles").val(result.StRole);
			$("input[name=optradio][value=Role]").prop('checked', true);
			$('.usrbox').hide();
			$('.rolbox').show();
			$('.grpbox').hide();
			$('.colbox').hide();
		}else if(result.Type == 'Group')
		{
			$("#ddlgroups").val(result.GroupName);
			$("input[name=optradio][value=Group]").prop('checked', true);
			$('.usrbox').hide();
			$('.rolbox').hide();
			$('.grpbox').show();
			$('.colbox').hide();
			$('.runbox').hide();
		}else if(result.Type == 'Field')
		{
			$("#ddlPersonColumn").val(result.ColName);
			$("input[name=optradio][value=Field]").prop('checked', true);
			$('.usrbox').hide();
			$('.rolbox').hide();
			$('.grpbox').hide();
			$('.colbox').show();
			$('.runbox').hide();
		}else if(result.Type == 'Runtime')
		{	getPrevSteps(CurrTenplateID,'Edit',ID);
			//$("#ddlPreSteps").text(result.ApproverDecidingStep);
			//$("#ddlPreSteps option:selected").text(result.ApproverDecidingStep);
			//$("#ddlPreSteps option:contains(" + result.ApproverDecidingStep+ ")").attr("selected","selected");
    		$('#ddlPreSteps option').map(function () {
			    if ($(this).text() == result.ApproverDecidingStep) return this;
			}).attr('selected', 'selected');
			$("input[name=optradio][value=Runtime]").prop('checked', true);
			$('.usrbox').hide();
			$('.rolbox').hide();
			$('.grpbox').hide();
			$('.colbox').hide();
			$('.runbox').show();
		}
		else
		{
			$("input[name=optradio][value=User]").prop('checked', true);
			$('.usrbox').show();
			$('.rolbox').hide();
			$('.grpbox').hide();
			$('.colbox').hide();
			$('.runbox').hide();
			initializePeoplePicker('Stepuser');                
	    	peoplePickerDiv = $("[id$='Stepuser_TopSpan']"); 
			for(i=0;i<result.StUser.length;i++)
			{
				var peoplePickerteamleaderDiv = this.SPClientPeoplePicker.SPClientPeoplePickerDict.Stepuser_TopSpan;
	    	 //	peoplePickerteamleaderDiv.AddUserKeys(SavedStpApprovers[index-1].StUser[i].Key.split('|')[2]);
	    	 	var UserTitle = GetUserLogin(result.StUser[i]);
	    	 	peoplePickerteamleaderDiv.AddUserKeys(UserTitle);
     		}
		}
	}
	else
	{	
		alert('This action cannot be performed now.\nSome approvals using this Template  is under processing.');$('#adds_stepsection').modal('hide');
	}
}

function EditStepSubmit()
{
	var ValidationStep=false;var GroupName,ColTitle='';
	var ActionReq=$("#ActionReq").val();
	var signPosition='BottomMost';
	var groups= '';var ColName='';var prevStep,prevStepId='';
	var isChecked = false;
		if(ProcessType=="Document"){
			isChecked = $('#chkSign').is(':checked');
		}

	var radioValue = $("input[name='optradio']:checked").val();
		if(radioValue=="Role"){radioValue="Role Based";}
		else if(radioValue=="User"){radioValue="Specific";}
		else if(radioValue=="Group"){radioValue="Group";}
	if(ActionReq=="Review & Sign" || ActionReq=="Edit & Sign"){
		var ApprType =	$("input[type='radio'][name=optionls]:checked").val();
		if(ApprType=="At Bottom most"){
			signPosition='BottomMost';
		}else if(ApprType=="At Bottom of"){
			signPosition=$("#PositionOptList").val()
		}
	}
	if($("#ActionReq").val() == 'Review & Sign')
	{
		ValidationStep=true;
		
		var StpName = $('#txtStepName').val();
		
		var role = '';
		peoplePickerDiv = $("[id$='Stepuser_TopSpan']"); 
		StepApprver = [];
		if(StpName ==  '')
		{
			ValidationStep=false;
			alert('Please enter Step name.');
			return false;
		}
	}
	else
	{	//if($("#ActionReq").val() == 'Review Only'){ValidationStep=true;}
		var SelectedNewColumn=[];
		$("input:checkbox[name='PartialTableChkboxSteps']:checked").each(function(){
   			SelectedNewColumn.push($(this).val());
		});
		var StpName = $('#txtStepName').val();
		if(SelectedNewColumn.length>0 )
		{
			ValidationStep=true;
			
			//var radioValue = $("input[name='optradio']:checked").val();
			var role = '';
			peoplePickerDiv = $("[id$='Stepuser_TopSpan']"); 
			StepApprver = [];
			if(StpName ==  '')
			{
				ValidationStep=false;
				alert('Please enter Step name.');
				return false;
			}
		}
		else
		{
			if($("#ActionReq").val() == 'Review Only')
			{
				ValidationStep=true;
			//alert('Set Editable Column List.');return false;
			}
			else{
				ValidationStep=false;
			}
		}		
	}
	
	
	if(ValidationStep == true)
	{
		if(radioValue == 'Specific')
		{
		 	var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id]; 
		 	var users = peoplePicker.GetAllUserInfo()
		 	var DoesNotexietuser = "";
    	 	var IsTrue = false;
    	 	var userArr=[];
		    for (var j = 0; j < users.length; j++) 
		    {
		    	var flag=false;
		        var arrSubVisaLetters = AllEmployee.filter(function (filterData) {
		        	if(filterData.EMail == users[j].EntityData.Email){flag=true;}
		            return filterData.EMail == users[j].EntityData.Email;
		        });
		        if(arrSubVisaLetters.length==0){userArr.push(users[j].DisplayText)}
		        if(arrSubVisaLetters.length>0){
		        	StepApprver.push({'Name' : arrSubVisaLetters[0].EMail , 'Id': arrSubVisaLetters[0].UserId})	 
		        }   
		    }
		    if(userArr.length>0){alert("Selected user "+userArr+" not in list"); return false;}	     
    	    EditNewStep(StpName ,'',users,signPosition,ActionReq,radioValue,GroupName,'','' );
 		}else if(radioValue == 'Group'){
			GroupName = $('#ddlgroups').val();
			groups = $("#ddlgroups option:selected").text();	

    		EditNewStep(StpName,groups,StepApprver,signPosition,ActionReq,radioValue,GroupName ,'','' );
		}else if(radioValue == 'Field'){
			GroupName = $('#ddlgroups').val();
			ColName= $("#ddlPersonColumn option:selected").val();	
			ColTitle= $("#ddlPersonColumn option:selected").text();
    		EditNewStep(StpName,ColTitle,StepApprver,signPosition,ActionReq,radioValue,GroupName ,'','' );
		}else if(radioValue == 'Runtime'){
			prevStep= $("#ddlPreSteps option:selected").text();	
			prevStepId= $("#ddlPreSteps option:selected").val();
    		EditNewStep(StpName,prevStep,StepApprver,signPosition,ActionReq,radioValue,GroupName ,'','' );
		}
 		else
 		{
			role = $('#ddlroles').val();
    		EditNewStep(StpName, role ,StepApprver,signPosition,ActionReq,radioValue,'','','' );
		}
	
		if(IsNewStp == false )
		{
 			SaveEditStepInList(StpName,role, StepApprver,GroupName,signPosition,ActionReq,radioValue,ColName,prevStep,prevStepId,isChecked);
 			$('#btnEditStep').hide();
 			$('#btnAddStep').show();
 			
 		}
 	}
}

function SaveEditStepInList(StpName,role,StepApprver,GroupName,signPosition,ActionReq,Type,ColName,prevStep,prevStepId,isChecked){
	
	//$('#'+EditStpID).hide();
	var StpUsers = [];
	var isAllStake = $('#chkAllStack').is(':checked');
	if(StepApprver.length){
		for(i=0;i<StepApprver.length;i++){
			StpUsers.push(StepApprver[i].Id)
		}
		var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },		
	        StepName: StpName,//StpApprovers[i].StName, 
	        SignaturePosition:signPosition,
	        ActionRequired:ActionReq,   
	        ApproverType:Type, 
	        PageFooterSign:isChecked, 
	        ParallelStakeholder:isAllStake,                  
	        ApproversId: {
	            'results': StpUsers
	        }              		                       
		};	
	}else{
		if(Type=="Group"){
			var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },		
		        StepName: StpName,//StpApprovers[i].StName,                 
		        ApproverRole: role,//StpApprovers[i].StRole,  
		        GroupNameId:GroupName,
		        SignaturePosition:signPosition,
	        	ActionRequired:ActionReq,
	        	PageFooterSign:isChecked,
	        	ApproverType:Type,    
	        	ParallelStakeholder:isAllStake                      		                       
			};
		}else if(Type=="Field"){
			var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },		
		        StepName: StpName,//StpApprovers[i].StName,                 
		        ApproverRole: role,//StpApprovers[i].StRole,  
		        ColumnName:ColName,
		        SignaturePosition:signPosition,
	        	ActionRequired:ActionReq,
	        	PageFooterSign:isChecked,
	        	ApproverType:Type,   
	        	ParallelStakeholder:isAllStake                       		                       
			};
		}else if(Type=="Runtime"){
			var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },		
		        StepName: StpName,//StpApprovers[i].StName,                 
		        ApproverRole: role,//StpApprovers[i].StRole,  
		        SignaturePosition:signPosition,
	        	ActionRequired:ActionReq,
	        	ApproverType:Type,
	        	PageFooterSign:isChecked,
	        	ApproverDecidingStep: prevStep,
	        	ParallelStakeholder:isAllStake,	        	                        		                       
			};
		}else{
			var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },		
		        StepName: StpName,//StpApprovers[i].StName,                 
		        ApproverRole: role,//StpApprovers[i].StRole,
		        SignaturePosition:signPosition,
	        	ActionRequired:ActionReq,
	        	PageFooterSign:isChecked,
	        	ApproverType:Type, 
	        	ParallelStakeholder:isAllStake
			};
		}
				
	}   	  			
	$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateSteps')/items(" +EditStpID+ ")",
		async:false,
        type: "PATCH",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": "*"
        },
        data: JSON.stringify(listItem),
        success: function (data) 
        {
        	//if(data.d.ApproverType=="Runtime"){
        	//			ApproverDecStep(prevStepId,true,data.d.StepName)
        	//}

        	var SelectedNewColumn=[];
        	//$("input:checkbox[name='PartialTableChkboxSteps']:checked").each(function(){
    		//	SelectedNewColumn.push($(this).val());
			//});			
        	
        	$("input:checkbox[name='PartialTableChkboxSteps']:checked").each(function(){
			    //yourArray.push($(this).val());
			    SelectedNewColumn.push({"tblId": $(this).val(), "tblEditScope": "","tblColIds": ""});
			});
			$("select[name='tblColSetFieldSteps']").each(function(){
				SelectedNewColumn.push({"tblId": $(this).attr('id'), "tblEditScope": $(this).val(),"tblColIds": $(this).siblings(0).val()});
			});
        	var EditPrTableColumnID=[];
        	EditPrTableColumnID.push({'TemplateID':CurrTenplateID,'EditScope':$("#ActionReq").val(),'StName': $("#txtStepName").val(),'StepType':'Process Steps', 'ColumnNo':SelectedNewColumn})
        	if(SelectedPrtableSteps.length>0)
			{
				for(k=0; k<SelectedPrtableSteps.length; k++)
				{
					DeleteApprovalTemplateEditScopeRec(SelectedPrtableSteps[k].ID);
				}
			}
			
			if($("#ActionReq").val() == 'Edit Data' || $("#ActionReq").val() == 'Edit & Sign' || $("#ActionReq").val() == 'Review Only')
			{
				if(SelectedNewColumn.length>0)
				{
					for(var j=0; j<EditPrTableColumnID[0].ColumnNo.length; j++)
					{
						var listName="ApprovalTemplateEditScope";	
						var arr=[];
						    if(EditPrTableColumnID[0].ColumnNo[j].tblColIds!=""){
						    	arr=EditPrTableColumnID[0].ColumnNo[j].tblColIds.split(",");
						    }		
						//var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'StepIDId':parseInt(EditStpID),'TemplateIDId':parseInt(EditPrTableColumnID[0].TemplateID), 'StepType':EditPrTableColumnID[0].StepType,'EditScope':'Partial','ColumnIDId':parseInt(EditPrTableColumnID[0].ColumnNo[j]),'Title':'Edit Scope'};
						var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'StepIDId':parseInt(EditStpID),'TemplateIDId':parseInt(EditPrTableColumnID[0].TemplateID), 'StepType':EditPrTableColumnID[0].StepType,'EditScope':'Partial','Title':'Edit Scope','ColumnIDId':parseInt(EditPrTableColumnID[0].ColumnNo[j].tblId),'Title':'Edit Scope','TableEditScope':EditPrTableColumnID[0].ColumnNo[j].tblEditScope,'TableColumnsId':{"results":arr}};

						ApprovalTemplateEditScopeSet(listName,item,);
					}
				}
			}
			           
            alert('Process Step has been updated.');
            $('input:checkbox[name="PartialTableChkboxSteps"]').removeAttr('checked');
        },
        error: function (error) {            
            console.log(error);
        }
    });
}


function EditSavedStep(Step,Role,User){
	// StepCount = StepCount + 1;
	stpEditstep =[];
	 var arrId=	$("#btnEditStep").val();
	 var newElement = {'StName':Step, 'Type': 'Role Based', 'StRole': Role, 'StUser':User,'UserID':arrId};
 	 SavedStpApprovers[arrId-1] = newElement; 	 
	 var StepDiv = '';
	 StepDiv += '<li><div class="topsec">'
	 StepDiv +=	'<h3>'+Step+'</h3>'
	 StepDiv +=	'<div class="dropdown pull-right">'
	 StepDiv +=	'<button class="dropdown-toggle" type="button" data-toggle="dropdown">'
	 StepDiv +=	'<i class="fa fa-ellipsis-v" aria-hidden="true"></i> </button>'
	 StepDiv +=	'<ul class="dropdown-menu">'
	 StepDiv +=	'<li onclick="EditStep('+arrId+',this)" data-toggle="modal" data-target="#"><a href="#"><i class="fa fa-pencil" ></i> Edit</a></li>'
	 StepDiv +=	'<li onclick="DeleteStep('+ arrId+',this)"><a href="#"><i class="fa fa-trash"></i> Delete</a></li>'
	 StepDiv +=	'</ul></div></div>'
	 StepDiv +=	'<div style="clear:both"></div>'
	 StepDiv +=	'<div class="row no-gutter">'
	if(Role != ''){
	 StepDiv +=		'<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion">'
	 StepDiv +=		'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
	 StepDiv +=		'</div>'
	 StepDiv +=		'<div class="imagecontent">'
	 StepDiv +=		'<h4>'+Role+'</h4>'
	 StepDiv +=		'</div></div>'
	}else{
	for(i=0;i<User.length;i++){
		var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(User[i].EntityData.Email);
	    StepDiv +=	 '<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion"><div class="empoyeeimg" style="float:left;"><img title="' + User[i].DisplayText + '" src="' + Authorattachment + '" alt="" data-themekey="#">';
	    StepDiv +=	 '</div></div><div class="imagecontent"><h4>' + User[i].DisplayText + '</h4><a href="#" style="cursor: auto;">'+User[i].EntityData.Email+'</a></div></div>'; 
		}
    }
	StepDiv +=	 '</div></li>'
	$('.stepbox').append(StepDiv);
	ClearDetails();
//alert('Add');
}


var stpEditstep =[];
function EditNewStep(Step,Role,User,signPosition,ActionReq,radioValue,GroupName ){
	// StepCount = StepCount + 1;
	stpEditstep =[];
	 var arrId=	$("#btnEditStep").val();
 	 if(ActionReq=="Edit Data"){ActionReq="Edit & Approve";}
 	 if(IsNewStp==false){
		 var StepDiv = '';
		 StepDiv += '<div class="topsec">'
		 StepDiv +=	'<h3>'+Step+'</h3>'
		 
		 StepDiv +=	'<div class="dropdown pull-right">'
		 StepDiv +=	'<button class="dropdown-toggle" type="button" data-toggle="dropdown">'
		 StepDiv +=	'<i class="fa fa-ellipsis-v" aria-hidden="true"></i> </button>'
		 StepDiv +=	'<ul class="dropdown-menu">'
		 StepDiv +=	'<li onclick="EditEStep('+arrId+','+EditStpID+')" data-toggle="modal" data-target="#"><a href="#"><i class="fa fa-pencil" ></i> Edit</a></li>'
		 StepDiv +=	'<li onclick="DeleteEStep('+EditStpID+')"><a href="#"><i class="fa fa-trash"></i> Delete</a></li>'
		 StepDiv +=	'</ul></div></div>'
		 StepDiv +=	'<h5>'+ActionReq+'</h5>'
		 StepDiv +=	'<div style="clear:both"></div>'
		 StepDiv +=	'<div class="row no-gutter">'
		if(Role != ''){
		 StepDiv +=		'<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion">'
		 StepDiv +=		'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
		 StepDiv +=		'</div>'
		 StepDiv +=		'<div class="imagecontent">'
		 StepDiv +=		'<h4>'+Role+'</h4>'
		 StepDiv +=		'</div></div>'
		}else{
		for(i=0;i<User.length;i++){
			var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(User[i].EntityData.Email);
		    StepDiv +=	 '<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion"><div class="empoyeeimg" style="float:left;"><img title="' + User[i].DisplayText + '" src="' + Authorattachment + '" alt="" data-themekey="#">';
		    StepDiv +=	 '</div></div><div class="imagecontent"><h4>' + User[i].DisplayText + '</h4><a href="#" style="cursor: auto;">'+User[i].EntityData.Email+'</a></div></div>'; 
			}
	    }
		StepDiv +=	 '</div>'
		$('#'+EditStpID).html(StepDiv)
 	 	objIndex = SavedStpApprovers.findIndex((obj => obj.Id == EditStpID));
 	 	var arrUser=[];
 	 	for (var j = 0; j < User.length; j++) 
			{	var flag=false;
				var arrSubVisaLetters = AllEmployee.filter(function (filterData) {
					if(filterData.EMail == User[j].EntityData.Email){flag=true;}
					return filterData.EMail == User[j].EntityData.Email;
			    });
			    
			    arrUser.push(arrSubVisaLetters[0].UserId)	    
			}
 		SavedStpApprovers[objIndex].StUser= arrUser;
		SavedStpApprovers[objIndex].StName= Step;
		SavedStpApprovers[objIndex].ActionReq= ActionReq;
		SavedStpApprovers[objIndex].SignPosition= signPosition;
		SavedStpApprovers[objIndex].StRole= Role;
		SavedStpApprovers[objIndex].Type= radioValue ;
		SavedStpApprovers[objIndex].Stakeholder= $('#chkAllStack').is(':checked');

 	 }else{
 	 var arrUser=[];
	 	 	for (var j = 0; j < User.length; j++) 
				{	var flag=false;
					var arrSubVisaLetters = AllEmployee.filter(function (filterData) {
						if(filterData.EMail == User[j].EntityData.Email){flag=true;}
						return filterData.EMail == User[j].EntityData.Email;
				    });
				    
				    arrUser.push(arrSubVisaLetters[0].UserId)	    
			}

 	  	 //var newElement = {'StName':Step, 'Type': 'Role', 'StRole': Role, 'StUser':User,'UsrID':arrId};
 	  	 var newElement = {'StName': Step, 'Type': radioValue, 'StRole': Role, 'StUser': User, 'UsrID': arrUser,'ActionReq' : ActionReq, 'SignPosition':signPosition,'GroupName':GroupName };
 	  	 StpApprovers[arrId-1] = newElement;

			 var StepDiv = '';
			 StepDiv += '<li><div class="topsec">'
			 StepDiv +=	'<h3>'+Step+'</h3>'
			 StepDiv +=	'<div class="dropdown pull-right">'
			 StepDiv +=	'<button class="dropdown-toggle" type="button" data-toggle="dropdown">'
			 StepDiv +=	'<i class="fa fa-ellipsis-v" aria-hidden="true"></i> </button>'
			 StepDiv +=	'<ul class="dropdown-menu">'
			 StepDiv +=	'<li onclick="EditStep('+arrId+',this)" data-toggle="modal" data-target="#"><a href="#"><i class="fa fa-pencil" ></i> Edit</a></li>'
			 StepDiv +=	'<li onclick="DeleteStep('+ arrId+',this)"><a href="#"><i class="fa fa-trash"></i> Delete</a></li>'
			 StepDiv +=	'</ul></div></div>'
			 StepDiv +=	'<div style="clear:both"></div>'
			 StepDiv +=	'<div class="row no-gutter">'
			if(Role != ''){
			 StepDiv +=		'<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion">'
			 StepDiv +=		'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
			 StepDiv +=		'</div>'
			 StepDiv +=		'<div class="imagecontent">'
			 StepDiv +=		'<h4>'+Role+'</h4>'
			 StepDiv +=		'</div></div>'
			}else{
			for(i=0;i<User.length;i++){
				var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(User[i].EntityData.Email);
			    StepDiv +=	 '<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion"><div class="empoyeeimg" style="float:left;"><img title="' + User[i].DisplayText + '" src="' + Authorattachment + '" alt="" data-themekey="#">';
			    StepDiv +=	 '</div></div><div class="imagecontent"><h4>' + User[i].DisplayText + '</h4><a href="#" style="cursor: auto;">'+User[i].EntityData.Email+'</a></div></div>'; 
				}
		    }
			StepDiv +=	 '</div></li>'
			$('.stepbox').append(StepDiv);
 	  		$('#btnEditStep').hide();$('#btnAddStep').show();
 	 		stpEditstep = newElement;


 	 }
	ClearDetails();
//alert('Add');
}

function GetlistData(restURL) {
	var def = $.Deferred();
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + restURL,
		async: false,
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
  
var ApproerSteps = [];
var SavedStpApprovers =[];
var SavedstpCount = '';
var ProcessType="";
var flagIniStp="";
function getTempID(TempID,Type)
{
	CurrTenplateID = TempID;

	flagIniStp=Type;
	if(Type=="Initiation"){
		$('#stpAppTitle').text("Initiation");
		$('#ProcessStep').hide();
		$('#Initiation').show();
		showSubBtn();LoadPartialTable();
	}
	else if(Type=="Steps"){
		$('#stpAppTitle').text("Steps");
		$('#Initiation').hide();
		$('#ProcessStep').show();
		hideSubBtn();LoadPartialTable();
	}
	PrTableColumnID=[];
	InitiatorList=[];
	$('.peoplepickeboxs').css("display", "none");
	$("#selectives-Initiator").empty();
	SavedStpApprovers = [];
	$('.stepbox').empty();
	var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateSteps')/items?$select=*,GroupName/Id,GroupName/Title,Approvers/Id,Approvers/Title,TemplateID/Id,TemplateID/TemplateName&$expand=TemplateID,Approvers,GroupName&$filter=TemplateID/ID eq '" + CurrTenplateID+ "'&$orderby= Sequence_No asc";   
    $.ajax({  
    	url: siteURL,
    	async: false,  
        headers: {	Accept: "application/json;odata=verbose"  },  
        async: false,  
        success: function(data)
        {  
        	GetInitiationDetails(CurrTenplateID);
        	var items; // Data will have user object  
            var results;  
            items = data.d.results;  
            $('#btnAddStep').show();
            $('#btnEditStep').hide();            
            ApproerSteps = items;
            getGroupNames();
            getPersonCol(TempID);
            
            GetTempDetails(TempID);
            if(items.length > 0)
            {            
             	ViewStepInTemp(items);
             	SavedstpCount = items.length;
            } 
            for(i=0;i<ApproerSteps.length;i++)
            {
            	if(ApproerSteps[i].ActionRequired=="Edit & Sign" || ApproerSteps[i].ActionRequired=="Review & Sign"){
            		   	//	$(".stepsOfProc").css("visibility", "hidden");
            	}else{
            		   		//$(".stepsOfProc").css("visibility", "visible");
            	}
				if(ApproerSteps[i].ApproverType == "Role Based" || ApproerSteps[i].ApproverType == "Role")
				{	
				 	SavedStpApprovers.push({'FooterSign':ApproerSteps[i].PageFooterSign,'Stakeholder':ApproerSteps[i].ParallelStakeholder,'ActionReq':ApproerSteps[i].ActionRequired,'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': '' , 'UsrID': '', 'Id':ApproerSteps[i].ID,'SignPosition':ApproerSteps[i].SignaturePosition,'GroupName':'','sNo':ApproerSteps[i].Sequence_No,'ColName':'','AskApprover':ApproerSteps[i].AskApprover,'ApproverForStep':ApproerSteps[i].ApproverForStep,'ApproverDecidingStep':ApproerSteps[i].ApproverDecidingStep});	
			  	}else if(ApproerSteps[i].ApproverType == "Group")
				{	
				 	SavedStpApprovers.push({'FooterSign':ApproerSteps[i].PageFooterSign,'Stakeholder':ApproerSteps[i].ParallelStakeholder,'ActionReq':ApproerSteps[i].ActionRequired,'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': '', 'StUser': '' , 'UsrID': '', 'Id':ApproerSteps[i].ID,'SignPosition':ApproerSteps[i].SignaturePosition,'GroupName':ApproerSteps[i].GroupName.Id,'sNo':ApproerSteps[i].Sequence_No,'ColName':'','AskApprover':ApproerSteps[i].AskApprover,'ApproverForStep':ApproerSteps[i].ApproverForStep,'ApproverDecidingStep':ApproerSteps[i].ApproverDecidingStep});	
			  	}else if(ApproerSteps[i].ApproverType == "Field")
				{	
				 	SavedStpApprovers.push({'FooterSign':ApproerSteps[i].PageFooterSign,'Stakeholder':ApproerSteps[i].ParallelStakeholder,'ActionReq':ApproerSteps[i].ActionRequired,'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': '', 'StUser': '' , 'UsrID': '', 'Id':ApproerSteps[i].ID,'SignPosition':ApproerSteps[i].SignaturePosition,'GroupName':ApproerSteps[i].GroupName.Id,'sNo':ApproerSteps[i].Sequence_No,'ColName':ApproerSteps[i].ColumnName,'AskApprover':ApproerSteps[i].AskApprover,'ApproverForStep':ApproerSteps[i].ApproverForStep,'ApproverDecidingStep':ApproerSteps[i].ApproverDecidingStep});	
			  	}else if(ApproerSteps[i].ApproverType == "Runtime")
				{	
				 	SavedStpApprovers.push({'FooterSign':ApproerSteps[i].PageFooterSign,'Stakeholder':ApproerSteps[i].ParallelStakeholder,'ActionReq':ApproerSteps[i].ActionRequired,'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': '', 'StUser': '' , 'UsrID': '', 'Id':ApproerSteps[i].ID,'SignPosition':ApproerSteps[i].SignaturePosition,'GroupName':ApproerSteps[i].GroupName.Id,'sNo':ApproerSteps[i].Sequence_No,'ColName':ApproerSteps[i].ColumnName,'AskApprover':ApproerSteps[i].AskApprover,'ApproverForStep':ApproerSteps[i].ApproverForStep,'ApproverDecidingStep':ApproerSteps[i].ApproverDecidingStep});	
			  	}
			  	else
			  	{
					if(ApproerSteps[i].ApproversId != null )
					{
				 		var Approvers = ApproerSteps[i].ApproversId.results;
				 		SavedStpApprovers.push({'FooterSign':ApproerSteps[i].PageFooterSign,'Stakeholder':ApproerSteps[i].ParallelStakeholder,'ActionReq':ApproerSteps[i].ActionRequired,'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers,'Id':ApproerSteps[i].ID,'SignPosition':ApproerSteps[i].SignaturePosition,'GroupName':'','sNo':ApproerSteps[i].Sequence_No,'ColName':'','AskApprover':ApproerSteps[i].AskApprover,'ApproverForStep':ApproerSteps[i].ApproverForStep,'ApproverDecidingStep':ApproerSteps[i].ApproverDecidingStep});
			     	}				
			  	}
			}			
       	},  
        error: function(data) 
        {  
        	console.log("An error occurred. Please try again.");  
        }  
    });
}
$(document).ready(function(){
	$('#addStepPopup').click(function () {
			ActiveMode='';
			getPrevSteps(CurrTenplateID,'Add');
	});
});	
function ViewStepInTemp(ApproerSteps){
var StepDiv = '';
$('.stepbox').empty();
StpApprovers = [];

for(i=0;i<ApproerSteps.length;i++){
var m=i+1;var actionReq='';
if(ApproerSteps[i].ActionRequired=="Edit Data"){actionReq="Edit & Approve";}else{actionReq=ApproerSteps[i].ActionRequired;}
 StepDiv += '<li id="'+ApproerSteps[i].Id+'"><div class="topsec">'
 StepDiv +=	'<h3>'+ApproerSteps[i].StepName+'</h3>'
 
 StepDiv +=	'<div class="dropdown pull-right">'
 StepDiv +=	'<button class="dropdown-toggle" type="button" data-toggle="dropdown">'
 StepDiv +=	'<i class="fa fa-ellipsis-v" aria-hidden="true"></i></button>'
 StepDiv +=	'<ul class="dropdown-menu">'
 StepDiv +=	'<li onclick="EditEStep('+m+','+ApproerSteps[i].Id+')" data-toggle="modal" data-target="#"><a href="#"><i class="fa fa-pencil"></i> Edit</a></li>'
 StepDiv +=	'<li onclick="DeleteEStep('+ApproerSteps[i].Id+')"><a href="#"><i class="fa fa-trash"></i> Delete</a></li></ul>'
 StepDiv +=	'</div>'
 StepDiv += '</div>'
 StepDiv +=	'<h5>'+actionReq+'</h5>'
 StepDiv +=	'<div style="clear:both"></div>'
 StepDiv +=	'<div class="row no-gutter">';
if(ApproerSteps[i].ApproverType == "Role Based"  || ApproerSteps[i].ApproverType == 'Role'){
	if(ApproerSteps[i].ApproversId != null ){
	  var Approvers = ApproerSteps[i].ApproversId.results;
//	  StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
	}
 StepDiv +=	'<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion">'
 StepDiv +=	'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="imagecontent">'
 StepDiv +=	'<h4>'+ApproerSteps[i].ApproverRole+'</h4>'
 StepDiv +=	'</div></div>'
}
else if(ApproerSteps[i].ApproverType == "Group"){
	if(ApproerSteps[i].ApproversId != null ){
	  var Approvers = ApproerSteps[i].ApproversId.results;
//	  StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
	}
 StepDiv +=	'<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion">'
 StepDiv +=	'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="imagecontent">'
 StepDiv +=	'<h4>'+ApproerSteps[i].GroupName.Title+'</h4>'
 StepDiv +=	'</div></div>'
}else if(ApproerSteps[i].ApproverType == "Field"){
			var result = arrPerson.filter(obj => {
				return obj.ColumnName === ApproerSteps[i].ColumnName;
			});console.log(result);
	if(ApproerSteps[i].ApproversId != null ){
	  var Approvers = ApproerSteps[i].ApproversId.results;
//	  StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
	}
 StepDiv +=	'<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion">'
 StepDiv +=	'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="imagecontent">'
 StepDiv +=	'<h4>Column Value of '+result[0].ColumnTitle+'</h4>'
 StepDiv +=	'</div></div>'
}else if(ApproerSteps[i].ApproverType == "Runtime"){
	if(ApproerSteps[i].ApproversId != null ){
	  var Approvers = ApproerSteps[i].ApproversId.results;
//	  StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
	}
 StepDiv +=	'<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion">'
 StepDiv +=	'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="imagecontent">'
 StepDiv +=	'<h4>'+ApproerSteps[i].ApproverDecidingStep+'</h4>'
 StepDiv +=	'</div></div>'
}

else{
if(ApproerSteps[i].ApproversId != null ){
	 var Approvers = ApproerSteps[i].ApproversId.results;
	//    StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
     }
   for(j=0;j<Approvers.length;j++){
   	var arrSubApprover = AllEmployee.filter(function (filterData) {
	     return filterData.UserId == Approvers[j];
	 });
	 
	//var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrSubApprover[0].EMail);
	var Authorattachment = '';
	if(arrSubApprover.length>0)
	{
		Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + arrSubApprover[0].EMail;
		StepDiv +=	 '<div class="flexitem col-md-4 col-sm-6 col-xs-12"><div class="imgsetion"><div class="empoyeeimg" style="float:left;"><img title="' + arrSubApprover[0].LoginName + '" src="' + Authorattachment + '" alt="" data-themekey="#">';
    	StepDiv +=	 '</div></div><div class="imagecontent"><h4>' + arrSubApprover[0].LoginName + '</h4><a href="#" style="cursor: auto;">'+arrSubApprover[0].EMail+'</a></div></div>'; 
	}
	
    
   }
}
StepDiv +=	 '</div></li>'
}
$('.stepbox').append(StepDiv);
}

function ViewStep(){
var StepDiv = '';
$('#stepboxView').empty();
//SavedStpApprovers = [];
for(i=0;i<ApproerSteps.length;i++){
 var m=i+1;
 StepDiv += '<li id="'+ApproerSteps[i].Id+'"><div class="topsec">'
 StepDiv +=	'<h3>'+ApproerSteps[i].StepName+'</h3>' 
 StepDiv += '</div>'
 StepDiv +=	'<div style="clear:both"></div>'
 StepDiv +=	'<span>Action = '+ApproerSteps[i].ActionRequired+'</span>'
 StepDiv +=	'<div class="row">'
if(ApproerSteps[i].ApproverType == "Role Based"){
StepDiv +=	'<div class="col-sm-4 flexitem">'	
 StepDiv +=	'<div class="imgsetion">'
 StepDiv +=	'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="imagecontent">'
 StepDiv +=	'<h4>'+ApproerSteps[i].ApproverRole+'</h4>'
 StepDiv +=	'</div></div>' 
}else if(ApproerSteps[i].ApproverType == "Group"){	
StepDiv +=	'<div class="col-sm-4 flexitem">'
 StepDiv +=	'<div class="imgsetion">'
 StepDiv +=	'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="imagecontent">'
 StepDiv +=	'<h4>'+ApproerSteps[i].GroupName.Title+'</h4>'
 StepDiv +=	'</div></div>'
}else if(ApproerSteps[i].ApproverType == "Runtime"){	 
 StepDiv +=	'<span class= "left_mg_pad">Approver Type = Runtime</span>' 
 StepDiv +=	'</div><div class="flexitem step_gap">'
 StepDiv +=	'<div class="col-sm-4 flexitem">'	
 StepDiv +=	'<div class="imgsetion">'
 StepDiv +=	'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>' 
 StepDiv +=	'<div class="imagecontent">'
 StepDiv += '<span>Step Name</span><span>Column = ApproverDecidingStep'+ApproerSteps[i].ColumnName+'</span>'
 StepDiv +=	'</div></div>'
}else if(ApproerSteps[i].ApproverType == "Field"){	 
 StepDiv +=	'<span class ="left_mg_pad">Approver Type = Column Value</span>'
 StepDiv +=	'</div><div class="flexitem step_gap">'
 StepDiv +=	'<div class="col-sm-4 flexitem">'	
 StepDiv +=	'<div class="imgsetion" >'
 StepDiv +=	'<img src="https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="imagecontent">'
 var colnm = $('.'+ApproerSteps[i].ColumnName).closest('label').text();
 StepDiv += '<span>'+colnm.trim()+'</span>'
 StepDiv +=	'</div></div>' 
}
else{
	if(ApproerSteps[i].ApproversId != null ){
		  var Approvers = ApproerSteps[i].ApproversId.results;	 
	 }	
   	for(j=0;j<Approvers.length;j++){
   	var arrSubApprover = AllEmployee.filter(function (filterData) {
	     return filterData.UserId == Approvers[j];
	});	
	var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrSubApprover[0].EMail);
    StepDiv +=	'<div class="col-sm-4 flexitem">'
    StepDiv +=	 '<div class="imgsetion"><div class="empoyeeimg" style="float:left;"><img title="' + arrSubApprover[0].LoginName + '" src="' + Authorattachment + '" alt="" data-themekey="#">';
    StepDiv +=	 '</div></div><div class="imagecontent"><h4>' + arrSubApprover[0].LoginName + '</h4><a href="#" style="cursor: auto;">'+arrSubApprover[0].EMail+'</a></div></div>'; 
   }
}
StepDiv +=	 '</div></li>'
}
$('#stepboxView').append(StepDiv);
}

//Delete list step from sharepoint using API  
function DeleteEStep(itemID){  
if(ActiveProessCount == 0){
if (confirm('Are you sure you want to delete this step?')) {
	$('#'+itemID).remove(); 
    siteURL = _spPageContextInfo.webAbsoluteUrl;  
    console.log("from top nav - " + siteURL);  
    var apiPath = siteURL + "/_api/lists/getbytitle('ApprovalTemplateSteps')/items('"+itemID+"')";  
    $.ajax({  
        url: apiPath,  
        type: "POST",  
        headers: {  
           "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	        "IF-MATCH": "*",
	        "X-HTTP-Method": "DELETE"      
	    },  
        async: false,  
        success: function(data) {
        	SavedStpApprovers.splice(SavedStpApprovers.findIndex(i => i.Id===itemID), 1);  
            alert("Selected step has been deleted.");   
            UpdateApproverStps();          
        },  
        eror: function(data) {  
            console.log("An error occurred. Please try again.");  
        }  
      }); 
    }     
  } else{
  	
  	alert('This action cannot be performed now.\nSome approvals using this Template  is under processing.');
  }
}


function ClearDetails(){
	$('#txtStepName').val('');
	$("input[name=optradio][value=Role]").prop('checked', true);
	$('.usrbox').hide()
	$('.rolbox').show()
	$('.grpbox').hide()
}


function SaveApprovers()
{
	var Scope = $('input[name="scrops"]:checked').val();
	var Initiator = $('input[name="selectives"]:checked').val();
	if(Scope == 'Partial')// && StpApprovers.length>0
	{
		var yourArray=[];
        $("input:checkbox[name='PartialTableChkbox']:checked").each(function(){
    		yourArray.push($(this).val());
		});
		
		if(ProcessType="Process"){
			if(yourArray.length>0)
			{	
				if(Initiator=="Department"){
					if(selected_Dept.length==0){alert("Please select department.");return false;}			
				}else if(Initiator=="Office"){
					if(selected_Office.length==0){alert("Please select office");return false;}			
				}else if(Initiator=="Group"){
					if(selected_Group.length==0){alert("Please select group");return false;}			
				}else if(Initiator=="Client"){
					if(selected_Client.length==0){alert("Please select client");return false;}
				}else if(Initiator=="Employee"){
					if(selected_CompEmp.length==0){alert("Please select company.");return false;}
				}

				SetInitiatorList();
				$('#stepsapprover').modal('hide');
			}
			else
			{
				alert("Set the editable columns");
			}
		}
	
	}
	else
	{			if(Initiator=="Department"){
					if(selected_Dept.length==0){alert("Please select department.");return false;}			
				}else if(Initiator=="Office"){
					if(selected_Office.length==0){alert("Please select office");return false;}			
				}else if(Initiator=="Group"){
					if(selected_Group.length==0){alert("Please select group");return false;}			
				}else if(Initiator=="Client"){
					if(selected_Client.length==0){alert("Please select client");return false;}
				}else if(Initiator=="Employee"){
					if(selected_CompEmp.length==0){alert("Please select company.");return false;}
				}
		SetInitiatorList();
		$('#stepsapprover').modal('hide');
	}
	
	
}


function SetApproversList()
{	var actionReq='';
	var isAllStake = $('#chkAllStack').is(':checked');		
	var snNo=0;
	if(SavedStpApprovers.length>0){
		snNo=Math.max.apply(Math, SavedStpApprovers.map(function(o) { return o.sNo; }))
	}
	if(StpApprovers.length > 0)
  	{
		var Title = 'Step Approvers';
		var sts = false;	 
		for(i=0;i<StpApprovers.length;i++)
		{
			if(ProcessType=="Process"){actionReq=StpApprovers[i].ActionReq}	
			else if(ProcessType=="Document"){actionReq="Review & Sign"}
			var users = StpApprovers[i].UsrID;
		 	var StpUsers = [];
		 	if(users.length > 0)
		 	{
				for(m=0; m<users.length; m++)
				{	 		
			 	 	if(users[m].Id == null)
			 	 	{
			 			StpUsers.push(users[m]);
			 	 	}
			 	 	else
			 	 	{
			 			StpUsers.push(users[m].Id); 
			 	 	}
			  	}
		 	}
	 		//	var ApprType =	$("input[type='radio'][name=optradio]:checked").val()	
	 		 
	 		if(StpApprovers[i].Type == 'Role' || StpApprovers[i].Type == 'Role Based')
	 		{
    		 	var	AppType = 'Role Based';
    		 	var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },
    				TemplateIDId: CurrTenplateID,
        		    Sequence_No: snNo+1,
        		    StepName: StpApprovers[i].StName,
        		    Title: Title,        		                                  
        		    ApproverRole: StpApprovers[i].StRole,
        		    ApproverType: AppType,
        		    ActionRequired : actionReq,
        		    SignaturePosition:StpApprovers[i].SignPosition,
        		    PageFooterSign:StpApprovers[i].FooterSign,
					ParallelStakeholder:isAllStake 
        	    };		         
	 		}else if(StpApprovers[i].Type == 'Group')
	 		{
    		 	var	AppType = 'Group';
    		 	var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },
    				TemplateIDId: CurrTenplateID,
        		    Sequence_No: snNo+1,
        		    StepName: StpApprovers[i].StName,
        		    Title: Title,        		                                  
        		    ApproverRole: StpApprovers[i].StRole,
        		    ApproverType: AppType,
        		    ActionRequired : actionReq,
        		    SignaturePosition:StpApprovers[i].SignPosition,
        		    GroupNameId:StpApprovers[i].GroupName,
        		    PageFooterSign:StpApprovers[i].FooterSign,
        		    ParallelStakeholder:isAllStake
        	    };		         
	 		}else if(StpApprovers[i].Type == 'Field')
	 		{
    		 	var	AppType = 'Field';
    		 	var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },
    				TemplateIDId: CurrTenplateID,
        		    Sequence_No: snNo+1,
        		    StepName: StpApprovers[i].StName,
        		    Title: Title,        		                                  
        		    ApproverRole: StpApprovers[i].StRole,
        		    ApproverType: AppType,
        		    ActionRequired : actionReq,
        		    SignaturePosition:StpApprovers[i].SignPosition,
        		    //GroupNameId:StpApprovers[i].GroupName
        		    ColumnName:StpApprovers[i].ColName,
        		    PageFooterSign:StpApprovers[i].FooterSign,
        		    ParallelStakeholder:isAllStake
        	    };		         
	 		}else if(StpApprovers[i].Type == 'Runtime')
	 		{
    		 	var	AppType = 'Runtime';
    		 	var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },
    				TemplateIDId: CurrTenplateID,
        		    Sequence_No: snNo+1,
        		    StepName: StpApprovers[i].StName,
        		    Title: Title,        		                                  
        		    ApproverRole: StpApprovers[i].StRole,
        		    ApproverType: AppType,
        		    ActionRequired : actionReq,
        		    SignaturePosition:StpApprovers[i].SignPosition,
        		    //GroupNameId:StpApprovers[i].GroupName
        		    ApproverDecidingStep:StpApprovers[i].ApproverDecidingStep,
        		    PageFooterSign:StpApprovers[i].FooterSign,
        		    ParallelStakeholder:isAllStake
        	    };		         
	 		}

	 		else
	 		{
    		 	var	AppType = 'Specific';	   	 	    	 	  	 		    	 	
    		 	var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },
    			TemplateIDId: CurrTenplateID,
            	Sequence_No: snNo+1,
            	StepName: StpApprovers[i].StName,
            	ActionRequired : actionReq,
            	Title: Title, 
            	ApproverType: AppType, 
            	SignaturePosition:StpApprovers[i].SignPosition,
            	PageFooterSign:StpApprovers[i].FooterSign,
            	ApproversId: {
                	'results': StpUsers
            	},                                 		            
            	ApproverType: AppType			         
 				};	    	  		
			}
		
        	var URL = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('ApprovalTemplateSteps')/items"		
        	$.ajax({
        		url:URL,
        		type: "POST",
        		async: false,
        		data:JSON.stringify(listItem),
        		headers: {
        		    "accept": "application/json;odata=verbose", 
        		    "Content-Type": "application/json;odata=verbose",  
        		    "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        		    "X-HTTP-Method": "POST" 
        		},
        		success: function (data) 
        		{
        			if(data.d.ApproverType=="Runtime"){
        				//ApproverDecStep(StpApprovers[i].ApproverDecStepId,true,data.d.StepName)
        			}
        	  		sts = true;        	
        			var FilteredRec = $.grep(PrTableColumnID, function(v) {
    					return v.StName == StpApprovers[i].StName;
					});
				
					if(FilteredRec.length>0)
					{
        				for(var j=0; j<FilteredRec[0].ColumnNo.length; j++)
						{
							var arr=[];
						    if(FilteredRec[0].ColumnNo[j].tblColIds!=""){
						    	arr=FilteredRec[0].ColumnNo[j].tblColIds.split(",");
						    }
							var listName="ApprovalTemplateEditScope";			
							var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'StepIDId':parseInt(data.d.ID),'TemplateIDId':parseInt(FilteredRec[0].TemplateID), 'StepType':FilteredRec[0].StepType,'EditScope':'Partial','Title':'Edit Scope','ColumnIDId':parseInt(FilteredRec[0].ColumnNo[j].tblId),'Title':'Edit Scope','TableEditScope':FilteredRec[0].ColumnNo[j].tblEditScope,'TableColumnsId':{"results":arr}};
							ApprovalTemplateEditScopeSet(listName,item,);
						}
					}
					$('#btnSubmitStep').modal('hide');        	                                           
        		}, 			
        		error: function (error) 
        		{ 
        			console.log(error);
        			sts = false;
        		}
     		});              
    	}
    	if(sts)
    	{
    		UpdateApproverStps();getTempID(CurrTenplateID);
    		alert("Approvers saved successfully");
     		$('#adds_stepsection').modal('hide')
    	}
  	}	
}

function UpdateApproverStps(){
		var temparr =[]; 
		if(SavedStpApprovers.length > 0) {
			var num = temparr.concat(SavedStpApprovers, StpApprovers);	
      	}else{
      		var num = StpApprovers		
      	}
      	
		var listItem = { __metadata:{ type: "SP.Data.ApprovalProcessMasterListItem" },		
      	NumberOfSteps: num.length            		                       
		};			   	  			
		$.ajax({
	        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessMaster')/items(" +CurrTenplateID+ ")",
	        type: "PATCH",
	        async: false,
	        headers: {
	            "accept": "application/json;odata=verbose",
	            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	            "content-Type": "application/json;odata=verbose",
	            "X-Http-Method": "PATCH",
	            "If-Match": "*"
	        },
	        data: JSON.stringify(listItem),	
	        success: function (data) { 
	        //alert('The approval reuqest has been submitted successfully.')       
		       console.log('Temp updated.');
		      getAllTemplate();
	        }, 			
	        error: function (error) { 
		        console.log(error); 
		        alert(error);
	        }
     });              


}
var FirstStepName = '', Action = '';
var FirstStpApprover=[];

function SaveApproverQueue(itemID,SPLCondition,NewSeqNo)
{
	var dfd = $.Deferred()	   
	FirstStpApprover =[] 
	FirstStepName = '' ;
	stepID = ''	    		
  	if(SavedStpApprovers.length > 0)
  	{
	 	var Title = 'Step Approvers';
	 	var sts = false;
	 	FirstStepName = SavedStpApprovers[0].StName;
	 	Action = SavedStpApprovers[0].ActionReq;
	 	for(i=0;i<SavedStpApprovers.length;i++)
	 	{
		 	StpUsers =[];	
	 	 	if(i == 0)
	 	 	{
	 			var status= 'Pending'
	 	 	}
	 	 	else
	 	 	{
	 			var status= 'Not Started'
	 	 	}
 	 		if(SavedStpApprovers[i].Type == 'Role Based')
 	 		{
 	 			var role = SavedStpApprovers[i].StRole;
	 			if(role == 'Manager')
	 			{
					var arrUser = AllEmployee.filter(function (filterData) {
			     		return filterData.UserId == _spPageContextInfo.userId;
			 	});
			 	
			 	if(arrUser.length > 0)
			 	{
				 	if(i == 0){		FirstStpApprover.push(arrUser[0].Manager.ID);  	 }
				 	StepApprver.push({'Name' : arrUser[0].Manager.Title, 'Id': arrUser[0].Manager.ID});
				 	StpUsers.push(arrUser[0].Manager.ID);			 
			 	}
			 	else
			 	{
			 		alert('Users are not available for '+ role );
			 	}
		 	}
		 	else if(role == 'Departmental Project Admin')
		 	{		 
		 	 	var Dept = getUserDept();
		 	 	GetlistData("/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=Department/ID,Department/DepartmentName,WebPartName,Company/ID,Company,Contributors/ID,Contributors/Title&$expand=Company,Contributors,Department&$filter=Company/ID eq '"+companyIdNavigation+"'and Department/DepartmentName eq '"+Dept +"' and WebPartName eq 'Project'").done(function (USers) {			 
			 	if(USers.d.results.length > 0)
			 	{			  	
				 	var nwApprover = USers.d.results[0].Contributors.results;
			  	 	if(nwApprover.length > 0)
			  	 	{
				 		for(a=0; a<nwApprover.length; a++)
				 		{
				 			StepApprver.push({'Name' : nwApprover[a].Title, 'Id': nwApprover[a].ID});
				 			StpUsers.push(nwApprover[a].ID);
				 			if(i == 0){	FirstStpApprover.push(nwApprover[a].ID);  	 }
				   		}	
				  	}
				  	else
				  	{
					 	alert('Users are not available for '+ role );
				  	}				    					  	 		 
			  	}
			  	else
			  	{
				 	alert('Users are not available for '+ role );
			  	}	
			 	});
		 	}
		 	else if(role == 'Head of the Department')
		 	{
		 	 	var Dept = getUserDept();
		 	 	GetlistData("/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=Department/ID,Department/DepartmentName,WebPartName,Company/ID,Company,Contributors/ID,Contributors/Title&$expand=Company,Contributors,Department&$filter=Company/ID eq '"+companyIdNavigation+"'and Department/DepartmentName eq '"+Dept +"' and WebPartName eq '"+role +"'").done(function (USers) {			 
			  	 	if(USers.d.results.length > 0)
			  	 	{
				  	 	var nwApprover = USers.d.results[0].Contributors.results;
				  	 	if(nwApprover.length > 0)
				  	 	{
					 		for(b=0; b<nwApprover.length; b++)
					 		{
					 			StepApprver.push({'Name' : nwApprover[b].Title, 'Id': nwApprover[b].ID});
					 			StpUsers.push(nwApprover[b].ID);
					 			if(i == 0){	FirstStpApprover.push(nwApprover[b].ID); }
					   		}
					 	}
					 	else
					 	{
						 	alert('Users are not available for '+ role );
					 	}
				 	}
				 	else
				 	{
				 		alert('Users are not available for '+ role );
				 	}					  	    		 		 
			 	}); 		 
		 	} 
		 	else
		 	{
				GetlistData("/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=WebPartName,Company/ID,Company,Contributors/ID,Contributors/Title&$expand=Company,Contributors&$filter=Company/ID eq '"+companyIdNavigation+"'and WebPartName eq '" + role + "'").done(function (USers) {		
			 	if(USers.d.results.length > 0)
			 	{
					var nwApprover = USers.d.results[0].Contributors.results;
					if(nwApprover.length > 0)
					{
						for(j=0; j<nwApprover.length; j++)
						{
							if(i == 0){	FirstStpApprover.push(nwApprover[j].ID);}
				 			StepApprver.push({'Name' : nwApprover[j].Title, 'Id': nwApprover[j].ID});
				 			StpUsers.push(nwApprover[j].ID);		
				 		}
				 	}
				 	else
				 	{
						alert('Users are not available for '+ role );
				 	}
			 	}
			 	else
			 	{
					alert('Users are not available for '+ role );
			 	}
				});  	
		 	}	 	
	 	}
	 	else if(SavedStpApprovers[i].Type == 'Group')
	 	{
	 	 	var GroupName= SavedStpApprovers[i].GroupName;
	 		GetlistData("/_api/web/lists/getbytitle('ApproversGroups')/items?$select=Title,Approvers/ID,Approvers/Title&$expand=Approvers&$filter=ID eq '"+SavedStpApprovers[i].GroupName+"'").done(function (USers) {		
	 		if(USers.d.results.length > 0)
	 		{
	 			var nwApprover = USers.d.results[0].Approvers.results;
	 			if(nwApprover.length > 0)
	 			{
		 			for(j=0; j<nwApprover.length; j++)
		 			{
						if(i == 0){	FirstStpApprover.push(nwApprover[j].ID); 	 	}
				 		StepApprver.push({'Name' : nwApprover[j].Title, 'Id': nwApprover[j].ID});
				 		StpUsers.push(nwApprover[j].ID);		
				 	}
				}
				else
				{
					alert('Users are not available for '+ SavedStpApprovers[i].GroupName);
				}
			}
			else
			{
				alert('Users are not available for '+ SavedStpApprovers[i].GroupName);
			}
	 		});
	 	}
	 	else if(SavedStpApprovers[i].Type == 'Specific')
	 	{
			var users = SavedStpApprovers[i].UsrID;
		 	StpUsers = [];
		 	for(m=0; m<users.length; m++)
		 	{
		 		if(i == 0)
		 		{
		 			FirstStpApprover.push(users[m]); 
		 		}			 		
		 		StpUsers.push(users[m]); 		 		
		 	} 	 
	 	}
	 	else if(SavedStpApprovers[i].Type == 'Runtime')
	 	{
			var users = SavedStpApprovers[i].UsrID;
		 	StpUsers = [];
		 	for(m=0; m<users.length; m++)
		 	{
		 		if(i == 0)
		 		{
		 			FirstStpApprover.push(users[m]); 
		 		}			 		
		 		StpUsers.push(users[m]); 		 		
		 	} 	 
	 	} 
	 	if(SavedStpApprovers[i].Type != 'Runtime' && SavedStpApprovers[i].Type != 'Field')
	 	{
		 	if(StpUsers.length == 0) 
		 	{
		 		alert('Approvers are not found in '+SavedStpApprovers[i].StName+'. ')
		 		break;	 		
		 	}
	 	}
	 	var SeqNo = 0;
	 	
	 	if(SPLCondition != 'SPLCase')
    	{
    		SeqNo = i+1;
    	}
    	else
    	{
    		SeqNo = parseInt(NewSeqNo)+parseInt(i);
    	}
	 	var ApprRole = SavedStpApprovers[i].StRole ? SavedStpApprovers[i].StRole :SavedStpApprovers[i].GroupName
	 	var listItem = { __metadata:{ type: "SP.Data.ApprovalProcessQueueListItem" },
		RequestIDId: itemID, 
		TemplateIDId: CurrTenplateID,
        //Sequence_No: i+1,
        Sequence_No: SeqNo,
        StepName: SavedStpApprovers[i].StName,
        Status:status,
        Title: Title,  
        ActionRequired:SavedStpApprovers[i].ActionReq,
        SignaturePosition:SavedStpApprovers[i].SignPosition,
        ApproverType:SavedStpApprovers[i].Type,
        ApproverRole:ApprRole, //SavedStpApprovers[i].StRole,
        ColumnName:SavedStpApprovers[i].ColName,
        AskApprover:SavedStpApprovers[i].AskApprover,
        AppoverForStep:SavedStpApprovers[i].AppoverForStep,
        ApproverDecidingStep : SavedStpApprovers[i].ApproverDecidingStep,
        StepID : SavedStpApprovers[i].Id.toString(),
        ApproversId: {
            'results': StpUsers
       	 }                                		                	         
		};	   	  				
        var URL = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('ApprovalProcessQueue')/items"		
        $.ajax({
        url:URL,
        type: "POST",
        async: false,
        data:JSON.stringify(listItem),
        headers: {
            "accept": "application/json;odata=verbose", 
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "X-HTTP-Method": "POST" 
        },
        success: function (data) { 
        if(i == 0) {stepID = data.d.ID};
        sts = true;                                           
        }, 			
        error: function (error) { 
        console.log(error);        
        }
     });              
    }
    if(SPLCondition != 'SPLCase')
    {
    	if(sts)
    	{	
		  UpdateProcessApprover(itemID,FirstStpApprover,FirstStepName,stepID,Action)      
    	}
    }
  }	
  //return def.promise();

}


function UpdateProcessApprover(itemID,FirstStpApprover,FirstStepName,StpId,Action){
var dfd = $.Deferred()	
		var listItem = { __metadata:{ type: "SP.Data.ApprovalProcessListListItem" },
		RequestById:_spPageContextInfo.userId,
		CurrentStep :FirstStepName,
		CurrentStepID: StpId.toString(),
		ActionRequired:Action,
        ApproversId: {
            'results': FirstStpApprover
        }                               		                       
		};	
		   	  			
		$.ajax({
	        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessList')/items(" +itemID+ ")",
	        type: "PATCH",
	        async: false,
	        headers: {
	            "accept": "application/json;odata=verbose",
	            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	            "content-Type": "application/json;odata=verbose",
	            "X-Http-Method": "PATCH",
	            "If-Match": "*"
	        },
	        data: JSON.stringify(listItem),	
	        success: function (data) { 
	        	console.log('Approvers updated.');
	        	alert('The approval request has been submitted successfully.')       		        
		        window.location.replace("approvals.aspx");
		      // alert('update');
	        }, 			
	        error: function (error) { 
		        console.log(error); 
		        alert('error');
	        }
     });              
return dfd.promise();

}


var unique_Department = [];
var duplicate_Department = [];


var LoggedUserDept = '';
function getUserDept(){
var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    console.log(siteUrl);
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=Department/Id,Department/DepartmentName&$expand=Department&$filter=LogonName/ID eq '" + _spPageContextInfo.userId + "'", 
        method: "GET",
        async: false,
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            LoggedUserDept  = data.d.results[0].Department.DepartmentName;       
        },
        error: function(error) {
            console.log(error);
        }
    });
	return LoggedUserDept;
}

function GetUserLogin(userid) { 
var loginName = '' ; 
var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";   
var requestHeaders = { "accept" : "application/json;odata=verbose" };    
$.ajax({  
  url : requestUri,  
  contentType : "application/json;odata=verbose",  
  headers : requestHeaders,  
  async:false,
  success :  function (data) {
         loginName = data.d.LoginName.split('|')[2];        
   },
  error: function(error) {
        console.log(error);
  } 
}); 
return loginName; 
}    

var ActiveProessCount = '';
// get Active request of specific template
function GetTempDetails(TempID){
$.ajax({
async: false,
url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessMaster')/items?$select=ProcessType,Id,Title,NumberOfRequest_Active,TemplateName,Active&$filter=ID eq '"+TempID+"'",
type: "GET",
headers: {
	"accept": "application/json;odata=verbose",
},
success :  function (data) 
{
	ProcessType=data.d.results[0].ProcessType;
	ActiveProessCount = data.d.results[0].NumberOfRequest_Active;
	if(data.d.results[0].ProcessType == 'Document')
	{
   		$('.editScope').css("display", "none");
		$("input[name=optionls][value='At Bottom most']").prop('checked', true);
		$('#ActionReq option:selected').removeAttr('selected');
   		//$("#ActionReq option:selected").text('Review & Sign');
        $("#ActionReq").val("Review & Sign").attr("selected","selected");

   		$("#secActionReq").css("display", "none");
   		$("input[name=optradio][value=Field]").parent().css("display", "none");
   		$(".stepsOfProc").css("visibility", "hidden");
   		$(".signBox").css("display", "initial");
   	}
	else
	{
		$('.editScope').css("display", "block");
		//$("input[name=optionls]").prop('checked', false);
		$("input[name=optionls][value='At Bottom most']").prop('checked', true);
		$("input[name=optradio][value=Field]").parent().css("display", "initial");
		$(".signBox").css("display", "none");

		$("#secActionReq").css("display", "block");
   		$(".stepsOfProc").css("visibility", "visible");

	}   
   },
  error: function(error) {
        console.log(error);
  } 
}); 


}

$( document ).ready(function() {
    console.log( "ready!" );
    initializePeoplePicker('InitiatorPPL');
    
    $("#InitiatorPPL_TopSpan").keyup(function () {
        onChangeTask('InitiatorPPL_TopSpan','InitiatorPPL','selectives-Initiator')
    });
});


var SelectedPrtable=[];
function LoadPartialTable()
{
	SelectedPrtable=[];
	var ResultItems=[];
	var Ownurl =_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateSetup')/items?$filter=TemplateID eq '"+CurrTenplateID+"'&$orderby=SequenceNo asc";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        {
            ResultItems = data.d.results;
            var QueryReq = "/_api/web/lists/getbytitle('ApprovalTemplateEditScope')/items?$filter=TemplateID eq '"+CurrTenplateID+"' and StepType eq 'Initiation'";					
			var QueryResult = RequestData(QueryReq);
			
			if(QueryResult.length>0)
			{
				SelectedPrtable = QueryResult;
			}
			var html='<option value="Select">--Select--</option>';
            var TableHTML='';var count=0;
            for(var i=0; i<ResultItems.length; i++)
            {
            	//SelectedPrtable.push(ResultItems[i].ID);
            	var FilteredRec = $.grep(QueryResult, function(v) {
    				return v.ColumnIDId == ResultItems[i].ID;
				});
				var Chkboxstatus='';
				var TableColumns="";
				var selOpt='';
				let select_all_checkboxes = document.getElementById("setEditableSelAll");
				if(FilteredRec.length>0)
				{
					Chkboxstatus = 'checked';
					TableColumns=FilteredRec[0].TableColumnsId.results;
					//select_all_checkboxes.checked = true;
				}else{
					//select_all_checkboxes.checked = false;
				}
				
				
				html+="<option>"+ResultItems[i].Title+"</option>";
				if(ResultItems[i].ColumnType!="FixedText" && ResultItems[i].ColumnType!="Header" && ResultItems[i].ColumnType!="QR Code" && ResultItems[i].ColumnType!="Web Link" && ResultItems[i].ColumnName!="CalculatedValue" && ResultItems[i].ColumnName!="SummarizedValue" && ResultItems[i].ColumnName!="AutoSerialNumber"){
	            						
	            	           	
	           						       	
							TableHTML = TableHTML +	"<tr>"+
	            		        						"<td>"+ResultItems[i].Title+"</td>"+
	            		        						"<td>"+ResultItems[i].ColumnType+"</td>";
	            		        						if(ResultItems[i].ColumnType=="Table"){
	            		        							TableHTML = TableHTML + "<td><div class='bothwarpboxsec'>"+
	            		        							"<select name='tblColSetField' class='select_designnow' id='"+ResultItems[i].Id+"' onchange='showColAddBtn(this)'>";
	            		        							var styleD="none";
	            		        							if(FilteredRec.length!=0){
  																if(FilteredRec[0].TableEditScope=="Entire"){
  																	TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire' selected>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";

  																}
  																else if(FilteredRec[0].TableEditScope=="Add Row"){
  																TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire' >Entire</option>"+
			  																"<option value='Add Row' selected>Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";

  																}
  																else if(FilteredRec[0].TableEditScope=="Columns"){
  																styleD="initial";
  																	TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire'>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' selected>Columns</option>";

  																}else{
  																	TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire'>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";
  																}
  																}else{
  																	TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire'>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";
  																}
															TableHTML = TableHTML +"</select>";
															TableHTML = TableHTML + "<button id='Init"+ResultItems[i].Id+"'  value='"+TableColumns+"' type='button' class='btn custom-btn new-btnad' style='display:"+styleD+"' data-toggle='modal' data-target='#editablecolsfild' onclick='LoadPartialtblColSteps(this,"+ResultItems[i].Id+")'><i class='fa fa-ellipsis-h' aria-hidden='true'></i></button></div></td>"
	           								       	
	            		        						}
	            		        						else{
		            		        						TableHTML = TableHTML + "<td><input type='checkbox' name='PartialTableChkbox' onclick='setSelectAll(this)' style='height: 17px; width: 17px;' value='"+ResultItems[i].ID+"' "+Chkboxstatus +"></div></td>";
		           									       	if(Chkboxstatus==''){
																count++;						
															}if(count>0){
																if(select_all_checkboxes != null){
																	select_all_checkboxes.checked = false;
																}
															}else{select_all_checkboxes.checked = true;}		           								       	
		           								       	}
		           			TableHTML = TableHTML + "</tr>";
		           				
		           			           						       	
           		}
           // setSelectAll();
			}
			$("#PositionOptList").html(html);
			$("#TableFieldsList").empty().append(TableHTML);  
        },
        error: function (data) 
        {  
            console.log("Error in getdata.");
        }  
    });
}


function RequestData(Query)
{
    var ResultItems=[];
    //var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeTaskDetails')/items?"+Query+"";  
    var Ownurl = _spPageContextInfo.webAbsoluteUrl +Query;  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 			
            //ResultItems = data.d.results;  
            ResultItems = data.d.results;
        },
        error: function (data) 
        {  
            console.log("Error in getdata.");
        }  
    });
    return ResultItems;
}



function SetDisplayInitiator(Action)
{
	if(Action.value == 'Anyone' || Action.value == 'Employee' || Action.value == 'Guest User')
	{	
		if(Action.value == 'Employee'){
			$('.compboxs').css("display", "block");
			$('.peoplepickeboxs,.deptboxs,.officeboxs,.groupboxs,.clientboxs').css("display", "none");
			getDynaOptionsForInitiatorComp("Companies","ddlCompEmp","")
		}else{
			$('.peoplepickeboxs,.deptboxs,.officeboxs,.groupboxs,.clientboxs,.compboxs').css("display", "none");
		}
		InitiatorList=[];
		$("#selectives-Initiator").empty();
		if(Action.value == 'Guest User')
		{
			/*jQuery("#ddlroles option:contains('Manager')").remove();
			jQuery("#ddlroles option:contains('Head of the Department')").remove();
			jQuery("#ddlroles option:contains('Departmental Project Admin')").remove();*/
			
			jQuery('#ddlroles').empty();
			jQuery('#ddlroles').append('<option value="Select" >--Select--</option>');
			jQuery('#ddlroles').append('<option value="External Supervisor" >External Supervisor</option>');
			jQuery('#ddlroles').append('<option value="Internal Supervisor" >Internal Supervisor</option>');
			jQuery('#ddlroles').append('<option value="HR Admin" >HR Admin</option>');
			jQuery('#ddlroles').append('<option value="Project Admin" >Project Admin</option>');
			jQuery('#ddlroles').append('<option value="Process Admin" >Process Admin</option>');
			jQuery('#ddlroles').append('<option value="Tech Admin" >Tech Admin</option>');
			jQuery('#ddlroles').append('<option value="Initiator" >Initiator</option>');

		}
		else
		{	
			
			/*jQuery('#ddlroles').append('<option value="Manager" >Manager</option>');
			jQuery('#ddlroles').append('<option value="Head of the Department" >Head of the Department</option>');
			jQuery('#ddlroles').append('<option value="Departmental Project Admin" >Departmental Project Admin</option>');
			jQuery("#ddlroles option:contains('External Supervisor')").remove();
			jQuery("#ddlroles option:contains('Internal Supervisor')").remove();*/
			
			jQuery('#ddlroles').empty();
			jQuery('#ddlroles').append('<option value="Select" >--Select--</option>');
			jQuery('#ddlroles').append('<option value="Manager" >Reporting Manager</option>');
			jQuery('#ddlroles').append('<option value="Head of the Department" >Head of the Department</option>');
			jQuery('#ddlroles').append('<option value="Head of the Office" >Head of the Office</option>');
			jQuery('#ddlroles').append('<option value="Project Admin of Department" >Project Admin of Department</option>');
			jQuery('#ddlroles').append('<option value="HR Admin" >HR Admin</option>');
			jQuery('#ddlroles').append('<option value="Project Admin" >Project Admin</option>');
			jQuery('#ddlroles').append('<option value="Process Admin" >Process Admin</option>');
			jQuery('#ddlroles').append('<option value="Tech Admin" >Tech Admin</option>');
			jQuery('#ddlroles').append('<option value="Initiator" >Initiator</option>');

		}
	}
	else if(Action.value == 'Selective')
	{
		
		$('.peoplepickeboxs').css("display", "block");
		$('.deptboxs,.officeboxs,.groupboxs,.clientboxs,.compboxs').css("display", "none");
			jQuery('#ddlroles').empty();
			jQuery('#ddlroles').append('<option value="Select" >--Select--</option>');
			jQuery('#ddlroles').append('<option value="Manager" >Reporting Manager</option>');
			jQuery('#ddlroles').append('<option value="Head of the Department" >Head of the Department</option>');
			jQuery('#ddlroles').append('<option value="Head of the Office" >Head of the Office</option>');
			jQuery('#ddlroles').append('<option value="Project Admin of Department" >Project Admin of Department</option>');
			jQuery('#ddlroles').append('<option value="HR Admin" >HR Admin</option>');
			jQuery('#ddlroles').append('<option value="Project Admin" >Project Admin</option>');
			jQuery('#ddlroles').append('<option value="Process Admin" >Process Admin</option>');
			jQuery('#ddlroles').append('<option value="Tech Admin" >Tech Admin</option>');
			jQuery('#ddlroles').append('<option value="Initiator" >Initiator</option>');

	}else if(Action.value == 'Department')
	{	
		getDynaOptionsForInitiator("Departments","ddlDept","");
		$('.deptboxs').css("display", "block");
		$('.peoplepickeboxs,.officeboxs,.groupboxs,.clientboxs,.compboxs').css("display", "none");
		$("#SelectedItems2").text("Select");
		$("#SelectedItems3").text("Select");
		$("#SelectedItems4").text("Select");
		
	}else if(Action.value == 'Office')
	{	
		getDynaOptionsForInitiator("OfficeLocation","ddlOffice","");
		$('.officeboxs').css("display", "block");
		$('.peoplepickeboxs,.deptboxs,.groupboxs,.clientboxs,.compboxs').css("display", "none");
		$("#SelectedItems1").text("Select");
		$("#SelectedItems3").text("Select");
		$("#SelectedItems4").text("Select");
		
	}else if(Action.value == 'Group')
	{
		getDynaOptionsForInitiator("ApproversGroups","ddlGroup","");
		$('.groupboxs').css("display", "block");
		$('.peoplepickeboxs,.deptboxs,.officeboxs,.clientboxs,.compboxs').css("display", "none");
		$("#SelectedItems1").text("Select");
		$("#SelectedItems2").text("Select");
		$("#SelectedItems4").text("Select");

	}else if(Action.value == 'Client')
	{	
		getDynaOptionsForInitiator("ClientMaster","ddlClient","");
		$('.clientboxs').css("display", "block");
		$('.peoplepickeboxs,.deptboxs,.officeboxs,.groupboxs,.compboxs').css("display", "none");
		$("#SelectedItems2").text("Select");
		$("#SelectedItems3").text("Select");
		$("#SelectedItems1").text("Select");

	}

}



/*function initializePeoplePicker(peoplePickerElementId) 
{
	var schema = {};
	schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
	schema['SearchPrincipalSource'] = 15;
	schema['ResolvePrincipalSource'] =15;
	schema['AllowMultipleValues'] = true;
	schema['MaximumEntitySuggestions'] =50;
	schema['Width'] = '280px';
	this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId,
	null, schema);
}*/

var InitiatorList = [];
function onChangeTask(HTMLID, PplPickerId, UserBoxId) 
{
	var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
    user = '';
    if (userInfo.length > 0)
    {
    	tempUserId = ensureUser($('#InitiatorPPL').children().children().attr('id'));
    	var arraycontainsturtles = (InitiatorList.indexOf(tempUserId) > -1);
        if(arraycontainsturtles == false)
        {
        	InitiatorList.push(tempUserId);
           	var tempEmail = userInfo[0].Key.split('|')[2];
          	if (tempEmail.includes('#') == true) 
           	{
           	    tempEmail = tempEmail.replace("#ext#@adaptindia.onmicrosoft.com", '');
           	    tempEmail = tempEmail.replace("_", '@');
           	}
           	var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);           
           	var ForwardUserImg='';
            	ForwardUserImg += "<div class='col-md-6 col-sm-6 userBoxParent'>";
            	ForwardUserImg += "<div class='members-card border-0'>";
				ForwardUserImg += "<div class='members-card-head'>";
            	ForwardUserImg += "<img src='"+attachment+"'>";
            	ForwardUserImg += "</div>";
            	ForwardUserImg += "<div class='members-card-body'>";
            	ForwardUserImg += "<div class='members-card-body-info text-ellipsis'>";
            	ForwardUserImg += "<h3 class='member-name text-ellipsis'>"+userInfo[0].DisplayText+"</h3>";
            	ForwardUserImg += "<p class='member-email text-ellipsis mb0'>"+tempEmail+"</p>";
            	ForwardUserImg += "</div>";
            	ForwardUserImg += "<a class='btn remove-group-btn remove-btn close close-round' onclick='removeUserBox(this, \"" + tempEmail + "\", \"" + userInfo[0].DisplayText + "\", " + tempUserId + ")'><i class='fa fa-times'></i></a>";
            	ForwardUserImg += "</div>";
            	ForwardUserImg += "</div>";
            	ForwardUserImg += "</div>";           
            	
            	$("#" + UserBoxId).append(ForwardUserImg);
            	EmptyPeoplePicker(PplPickerId);
		}
        else if(arraycontainsturtles == true)
        {
          	EmptyPeoplePicker(PplPickerId);
           	alert("User already exists!!");
        }
	}
	};
}


function removeUserBox(Action, userEmail, UserName, UserId) {
    $(Action).parents('.col-md-6').remove();
        
    InitiatorList = jQuery.grep(InitiatorList, function(value) {
  		return value != UserId;
	});
}


function ensureUser(ID) 
{
	var UserId =0;    
    var peoplePickerTopDivId = ID;
    var peoplePicker = 
    this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerTopDivId];
    var users = peoplePicker.GetAllUserInfo();
    var arryuser = users[0];
    if(arryuser) 
    {
    	var payload = { 'logonName': arryuser.Key}; 
    	$.ajax({
    	    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/ensureuser",
    	    type: "POST",
    	    async:false,
    	    contentType: "application/json;odata=verbose",
    	    data: JSON.stringify(payload),
    	    headers: {
    	        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    	        "accept": "application/json;odata=verbose"
    	            },
        	success: function(data, status, xhr) 
        	{     
         		UserId = data.d.Id;          
        	},
        	error: function(xhr, status, error) 
        	{  
        	
        	}
    	}); 
    }   
    else 
    {
        UserId = 0;
    } 
   	return UserId;    
}


function EmptyPeoplePicker(peoplePickerId) 
{
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
   	peoplePicker.DeleteProcessedUser();
}


var selected_Dept= []; 
var selected_Office= []; 
var selected_Group= [];
var selected_Client= [];
var selected_CompEmp= [];

function SetInitiatorList()  
{
	var Initiator = $('input[name="selectives"]:checked').val();
	var dept="";var office="";var group="";var client="";
	if(Initiator=="Department"){
		selected_Office= []; 
		selected_Group= [];
		selected_Client= [];
		selected_CompEmp= [];
	}
	else if(Initiator=="Office"){
		selected_Dept= []; 
		selected_Group= [];
		selected_Client= [];
		selected_CompEmp= [];
	}
	else if(Initiator=="Group"){
		selected_Dept= []; 
		selected_Office= []; 
		selected_Client= [];
		selected_CompEmp= [];
	}
	else if(Initiator=="Client"){
		selected_Dept= []; 
		selected_Office= []; 
		selected_Group= [];
		selected_CompEmp= [];
	}else if(Initiator=="Employee"){
		selected_Dept= []; 
		selected_Office= []; 
		selected_Group= [];
		selected_Client= [];
		if(selected_CompEmp.length==0){alert("");return false;}
	}else {
		selected_Dept= []; 
		selected_Office= []; 
		selected_Group= [];
		selected_Client= [];
		selected_CompEmp= [];
	}
	var Scope ="";
	if($('.twocomb').is(":visible")){	
		Scope = $('input[name="scrops"]:checked').val();
	}
	var userArr=[];
	for (var j = 0; j < InitiatorList.length; j++) 
			{	var flag=false;
				var arrSubVisaLetters = AllEmployee.filter(function (filterData) {
					if(filterData.EMail == InitiatorList[j].EntityData.Email){flag=true;}
					return filterData.EMail == InitiatorList[j].EntityData.Email;
			    });
				//if(!flag){alert("Selected user "+users[j].DisplayText+" not in list"); return false;}
			    if(arrSubVisaLetters.length==0){userArr.push(InitiatorList[j].DisplayText)}
		        if(arrSubVisaLetters.length>0){
		        	StepApprver.push({'Name' : arrSubVisaLetters[0].EMail , 'Id': arrSubVisaLetters[0].UserId})	 
		        }
			    //StepApprver.push(arrSubVisaLetters[0].UserId)	    
			}	
		    if(userArr.length>0){alert("Selected user "+userArr+" not in list"); return false;}
	var listName="ApprovalProcessMaster";		
   	var item={'__metadata': { type: 'SP.Data.ApprovalProcessMasterListItem'},'Initiation':Initiator,'EditScope':Scope,'InitiatorsId':{'results':InitiatorList},'DepartmentId':{"results": selected_Dept},'OfficeLocationId':{"results": selected_Office},'GuestClientId':{"results": selected_Client},'GroupId':{"results": selected_Group},'CompanyId':{"results": selected_CompEmp}};
   		    
    $.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items('"+CurrTenplateID+"')",
        type: "POST",  
        async:false,
        data: JSON.stringify(item),         
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "PATCH"  
        },  
        success: function(data)
        { 	getAllTemplate();
        	var yourArray=[];
        	$("input:checkbox[name='PartialTableChkbox']:checked").each(function(){
    			//yourArray.push($(this).val());
    			yourArray.push({"tblId": $(this).val(), "tblEditScope": "","tblColIds": ""});
			});
			$("select[name='tblColSetField']").each(function(){
				yourArray.push({"tblId": $(this).attr('id'), "tblEditScope": $(this).val(),"tblColIds": $(this).siblings(0).val()});
			});

			
			if(SelectedPrtable.length>0)
			{
				for(k=0; k<SelectedPrtable.length; k++)
				{
					DeleteApprovalTemplateEditScopeRec(SelectedPrtable[k].ID);
				}
			}
			var Scope = $('input[name="scrops"]:checked').val();
			if(Scope == 'Partial' && $('.twocomb').is(":visible"))
			{
				if(yourArray.length>0)
				{
					for(var j=0; j<yourArray.length; j++)
					{
					    var arr=[];
					    if(yourArray[j].tblColIds!=""){
					    	arr=yourArray[j].tblColIds.split(",");
					    }
						var listName="ApprovalTemplateEditScope";			
						var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'TemplateIDId':parseInt(CurrTenplateID), 'StepType':'Initiation','EditScope':'Partial','ColumnIDId':parseInt(yourArray[j].tblId),'Title':'Edit Scope','TableEditScope':yourArray[j].tblEditScope,'TableColumnsId':{"results":arr}};
						ApprovalTemplateEditScopeSet(listName,item,);
					}
				}
			}
        },  
        error: function(data) 
        {  
            console.log(data);
        }  
    }); 
}


function DeleteApprovalTemplateEditScopeRec(ItemID)
{
	$.ajax({  
        	url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ApprovalTemplateEditScope')/items("+ItemID+")",  
        	type: "POST", 
        	async:false, 
        	headers:  
        	{  
        	    "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
        	    "IF-MATCH": "*",  
        	    "X-HTTP-Method": "DELETE"  
        	},  
        	success: function(data, status, xhr)  
        	{  
			  	console.log("Delete Success");	
        	},  
        	error: function(data, status, xhr)  
        	{  
        	    $("#ResultDiv").empty().text(data.responseJSON.error);  
        	}  
    	});
	
}


function GetInitiationDetails(TempID)
{
	selected_Dept=[];
	selected_Office=[];
	selected_Group=[];
	selected_Client=[];
	var Responce=[];
	$.ajax({
		async: false,
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalProcessMaster')/items?$select=*,Id,Title,NumberOfRequest_Active,TemplateName,Active,Initiators/Title,Initiators/EMail,Initiators/ID&$expand=Initiators&$filter=ID eq '"+TempID+"'",
		type: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		},
		success :  function (data) 
		{
			Responce = data.d.results;
			//LoadPartialTable();
			if(Responce.length>0)
			{
				if(Responce[0].Initiation == 'Guest User')
				{
					jQuery('#ddlroles').empty();
					jQuery('#ddlroles').append('<option value="Select" >--Select--</option>');
					jQuery('#ddlroles').append('<option value="External Supervisor" >External Supervisor</option>');
					jQuery('#ddlroles').append('<option value="Internal Supervisor" >Internal Supervisor</option>');
					jQuery('#ddlroles').append('<option value="HR Admin" >HR Admin</option>');
					jQuery('#ddlroles').append('<option value="Project Admin" >Project Admin</option>');
					jQuery('#ddlroles').append('<option value="Process Admin" >Process Admin</option>');
					jQuery('#ddlroles').append('<option value="Tech Admin" >Tech Admin</option>');
					jQuery('#ddlroles').append('<option value="Initiator" >Initiator</option>');				
				}
				else
				{
					jQuery('#ddlroles').empty();
					jQuery('#ddlroles').append('<option value="Select" >--Select--</option>');
					jQuery('#ddlroles').append('<option value="Manager" >Reporting Manager</option>');
					jQuery('#ddlroles').append('<option value="Head of the Department" >Head of the Department</option>');
					jQuery('#ddlroles').append('<option value="Head of the Office" >Head of the Office</option>');
					jQuery('#ddlroles').append('<option value="Project Admin of Department" >Project Admin of Department</option>');
					jQuery('#ddlroles').append('<option value="HR Admin" >HR Admin</option>');
					jQuery('#ddlroles').append('<option value="Project Admin" >Project Admin</option>');
					jQuery('#ddlroles').append('<option value="Process Admin" >Process Admin</option>');
					jQuery('#ddlroles').append('<option value="Tech Admin" >Tech Admin</option>');
					jQuery('#ddlroles').append('<option value="Initiator" >Initiator</option>');				
				}
				if(Responce[0].Initiation == 'Selective')
				{
					$("input[name=selectives][value='" +Responce[0].Initiation+ "']").prop('checked', true);
					$('.peoplepickeboxs').css("display", "block");
					$('.officeboxs,.groupboxs,.deptboxs,.clientboxs,.compboxs').css("display", "none");

					InitiatorList=[];
					var InitiatorProfileList='';
					for(var i=0; i<Responce[0].Initiators.results.length; i++)
					{
						InitiatorList.push(Responce[0].Initiators.results[i].ID);
						var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + Responce[0].Initiators.results[i].EMail;                      				
            			InitiatorProfileList+= "<div class='col-md-6 col-sm-6 userBoxParent'>";
            			InitiatorProfileList+= "<div class='members-card border-0'>";
						InitiatorProfileList+= "<div class='members-card-head'>";
            			InitiatorProfileList+= "<img src='"+attachment+"'>";
            			InitiatorProfileList+= "</div>";
            			InitiatorProfileList+= "<div class='members-card-body'>";
            			InitiatorProfileList+= "<div class='members-card-body-info text-ellipsis'>";
            			InitiatorProfileList+= "<h3 class='member-name text-ellipsis'>"+Responce[0].Initiators.results[i].Title+"</h3>";
            			InitiatorProfileList+= "<p class='member-email text-ellipsis mb0'>"+Responce[0].Initiators.results[i].EMail+"</p>";
            			InitiatorProfileList+= "</div>";
            			InitiatorProfileList+= "<a class='btn remove-group-btn remove-btn close close-round' onclick='removeUserBox(this, \"" + Responce[0].Initiators.results[i].EMail + "\", \"" + Responce[0].Initiators.results[i].Title + "\", " + Responce[0].Initiators.results[i].ID+ ")'><i class='fa fa-times'></i></a>";
            			InitiatorProfileList+= "</div>";
            			InitiatorProfileList+= "</div>";
            			InitiatorProfileList+= "</div>";
            		}
            		$("#selectives-Initiator").empty().append(InitiatorProfileList);
				}
				else if(Responce[0].Initiation == null)
				{
					$("input[name=selectives][value='Anyone']").prop('checked', true);
					$('.peoplepickeboxs,.officeboxs,.groupboxs,.deptboxs,.clientboxs').css("display", "none");
				}else if(Responce[0].Initiation == "Department")
				{	var deptArr=[];
					deptArr=Responce[0].DepartmentId.results;
					selected_Dept= [...deptArr]; 
					getDynaOptionsForInitiator("Departments","ddlDept","Update");
					$("input[name=selectives][value='Department']").prop('checked', true);
					$('.peoplepickeboxs,.officeboxs,.groupboxs,.clientboxs,.compboxs').css("display", "none");
					$('.deptboxs').css("display", "block");
				}else if(Responce[0].Initiation == "Office")
				{
					var deptOffice=[];
					deptOffice=Responce[0].OfficeLocationId.results;
					selected_Office=[...deptOffice];
					getDynaOptionsForInitiator("OfficeLocation","ddlOffice","Update");
					$("input[name=selectives][value='Office']").prop('checked', true);
					$('.peoplepickeboxs,.deptboxs,.groupboxs,.clientboxs,.compboxs').css("display", "none");
					$('.officeboxs').css("display", "block");
				}else if(Responce[0].Initiation == "Group")
				{	
					var deptGroup=[];
					deptGroup=Responce[0].GroupId.results;
					selected_Group=[...deptGroup];
					getDynaOptionsForInitiator("ApproversGroups","ddlGroup","Update");
					$("input[name=selectives][value='Group']").prop('checked', true);
					$('.peoplepickeboxs,.officeboxs,.deptboxs,.clientboxs,.compboxs').css("display", "none");
					$('.groupboxs').css("display", "block");
				}else if(Responce[0].Initiation == "Client")
				{
					var deptClient=[];
					deptClient=Responce[0].GuestClientId.results;
					selected_Client=[...deptClient];

					getDynaOptionsForInitiator("ClientMaster","ddlClient","Update");
					$("input[name=selectives][value='Client']").prop('checked', true);
					$('.peoplepickeboxs,.officeboxs,.groupboxs,.deptboxs,.compboxs').css("display", "none");
					$('.clientboxs').css("display", "block");
				}else if(Responce[0].Initiation == "Employee")
				{
					var deptEmp=[];
					deptEmp=Responce[0].CompanyId.results;
					selected_CompEmp=[...deptEmp];

					getDynaOptionsForInitiatorComp("Companies","ddlCompEmp","Update");
					$("input[name=selectives][value='Employee']").prop('checked', true);
					$('.peoplepickeboxs,.officeboxs,.groupboxs,.deptboxs,.clientboxs').css("display", "none");
					$('.compboxs').css("display", "block");
				}
				else
				{
					$("input[name=selectives][value=" +Responce[0].Initiation+ "]").prop('checked', true);
					$('.peoplepickeboxs,.officeboxs,.groupboxs,.deptboxs,.clientboxs').css("display", "none");
				}
				
				if(Responce[0].EditScope == 'Full-Form')
				{
					$("input[name=scrops][value='" +Responce[0].EditScope+ "']").prop('checked', true);
					$(".stepcolms").css("display", "none");
				}
				else if(Responce[0].EditScope == 'Partial')
				{
					$("input[name=scrops][value='Partial']").prop('checked', true);
					$(".stepcolms").css("display", "block");
				}
				else if(Responce[0].EditScope == null)
				{
					$("input[name=scrops][value='Full-Form']").prop('checked', true);
					$(".stepcolms").css("display", "none");
				}
				else
				{
					$("input[name=scrops][value='Full-Form']").prop('checked', true);
					$(".stepcolms").css("display", "none");
				}
			}
			else
			{
				$("input[name=scrops][value='Full-Form']").prop('checked', true);
				$(".stepcolms").css("display", "none");
				
				$("input[name=selectives][value='Anyone']").prop('checked', true);
				$('.peoplepickeboxs').css("display", "none");

			}    
   		},
  		error: function(error) 
  		{
        	console.log(error);
  		} 
	}); 
}


function ApprovalTemplateEditScopeSet(listName,item) 
{	
	$.ajax({
		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items",
		type: "POST",
		contentType: "application/json;odata=verbose",
		data: JSON.stringify(item),
		async: true,
		headers: 
		{
			"Accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		success: function (data)
		{					
			console.log("add success");		
		},
		error: function (data)
		{	
			console.log("TimeSheetUniversalinsert"); 
			console.log(data); 
		}
	});
}


var SelectedPrtableSteps=[];
function LoadPartialTableSteps(Mode,StepID)
{	
	if(ActiveMode != 'EditStep')
	{
		SelectedPrtableSteps=[];
		var ResultItems=[];
		var Ownurl =_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateSetup')/items?$filter=TemplateID eq '"+CurrTenplateID+"'&$orderby=SequenceNo asc";  
    	$.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:true,  
        success: function (data) 
        {
            ResultItems = data.d.results;
            var TableHTML='';
            if(Mode == 'Edit')
            {
            	var QueryReq = "/_api/web/lists/getbytitle('ApprovalTemplateEditScope')/items?$filter=TemplateID eq '"+CurrTenplateID+"' and StepID eq '"+StepID+"'";					
				var QueryResult = RequestData(QueryReq);				
				if(QueryResult.length>0)
				{
					SelectedPrtableSteps = QueryResult;
				}            
            	var count=0;
            	for(var i=0; i<ResultItems.length; i++)
            	{
                   	var FilteredRec = $.grep(QueryResult, function(v) {
    					return v.ColumnIDId == ResultItems[i].ID;
					});
					var Chkboxstatus=''
					var TableColumns="";
					if(FilteredRec.length>0)
					{
						Chkboxstatus = 'checked';
						TableColumns=FilteredRec[0].TableColumnsId.results;
					}
					if(ResultItems[i].ColumnType!="FixedText" && ResultItems[i].ColumnType!="Header" && ResultItems[i].ColumnType!="QR Code" && ResultItems[i].ColumnType!="Web Link" && ResultItems[i].ColumnName!="CalculatedValue" && ResultItems[i].ColumnName!="SummarizedValue" && ResultItems[i].ColumnName!="AutoSerialNumber"){
				       	
					let select_all_checkboxes = document.getElementById("setEditableSelStepsAll");					
		           				TableHTML = TableHTML +	"<tr>"+
	            		        						"<td>"+ResultItems[i].Title+"</td>"+
	            		        						"<td>"+ResultItems[i].ColumnType+"</td>";
	            		        						if(ResultItems[i].ColumnType=="Table"){
	            		        							TableHTML = TableHTML + "<td><div class='bothwarpboxsec'>"+
	            		        							"<select name='tblColSetFieldSteps' class='select_designnow' id='"+ResultItems[i].Id+"' onchange='showColAddBtn(this)'>";
  																var styleD="none";
	            		        							if(FilteredRec.length!=0){
  																if(FilteredRec[0].TableEditScope=="Entire"){
  																	TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire' selected>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";

  																}
  																else if(FilteredRec[0].TableEditScope=="Add Row"){
  																TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire' >Entire</option>"+
			  																"<option value='Add Row' selected>Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";

  																}
  																else if(FilteredRec[0].TableEditScope=="Columns"){
  																styleD="initial";
  																	TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire'>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' selected>Columns</option>";

  																}else{
  																	TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire'>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";
  																}
  																}else{
  																	TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire'>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";
  																}
															TableHTML = TableHTML +"</select>";
															//TableHTML = TableHTML + "<button id='Init"+ResultItems[i].Id+"' value='"+TableColumns+"' type='button' class='btn custom-btn new-btnad' style='display:"+styleD+"' data-toggle='modal' data-target='#editablecolsfild' onclick='LoadPartialtblColSteps(this,"+ResultItems[i].Id+")'><i class='fa fa-plus'></i></button></td>"
	           								       	
															
															  TableHTML = TableHTML + "<button id='Step"+ResultItems[i].Id+"' Value='"+TableColumns+"' type='button' class='btn custom-btn new-btnad' style='display:"+styleD+"' data-toggle='modal' data-target='#editablecolsfild' onclick='LoadPartialtblColSteps(this,"+ResultItems[i].Id+")'><i class='fa fa-ellipsis-h' aria-hidden='true'></i></button></div></td>"
		           								       	
	            		        						}
	            		        						else{
		            		        						TableHTML = TableHTML + "<td><input type='checkbox' name='PartialTableChkboxSteps' onclick='setSelectAll(this)' style='height: 17px; width: 17px;' value='"+ResultItems[i].ID+"' "+Chkboxstatus +"></td>";
		           								       		if(Chkboxstatus==''){
																count++;						
															}if(count>0){
																if(select_all_checkboxes != null){
																	select_all_checkboxes.checked = false;
																}
															}else{select_all_checkboxes.checked = true;}
		           								       	}
		           			TableHTML = TableHTML + "</tr>";
           			}           
				}
			}
			else
			{
				if(ActiveMode != 'EditStep')
				{
					var count=0;
					for(var i=0; i<ResultItems.length; i++)
            		{
           				if(ResultItems[i].ColumnType!="FixedText" && ResultItems[i].ColumnType!="Header" && ResultItems[i].ColumnType!="QR Code" && ResultItems[i].ColumnType!="Web Link" && ResultItems[i].ColumnName!="CalculatedValue" && ResultItems[i].ColumnName!="SummarizedValue" && ResultItems[i].ColumnName!="AutoSerialNumber" ){
	                	   	let select_all_checkboxes = document.getElementById("setEditableSelStepsAll");
							//select_all_checkboxes.checked = true;
							
			            	if(Chkboxstatus==''){
								//let select_all_checkboxes = document.getElementById("setEditableSelAll");
								count++;						
							}if(count>0){
								select_all_checkboxes.checked = false;
							}	                	   		
		           			TableHTML = TableHTML +	"<tr>"+
	            		        						"<td>"+ResultItems[i].Title+"</td>"+
	            		        						"<td>"+ResultItems[i].ColumnType+"</td>";
	            		        						if(ResultItems[i].ColumnType=="Table"){
	            		        							TableHTML = TableHTML + "<td><div class='bothwarpboxsec'>"+
	            		        							"<select name='tblColSetFieldSteps' class='select_designnow' id='"+ResultItems[i].Id+"' onchange='showColAddBtn(this)'>"+
  																"<option value=''>Select</option>"+
  																"<option value='Entire'>Entire</option>"+
  																"<option value='Add Row'>Add Row</option>"+
  																"<option value='Columns' >Columns</option>"+
															"</select>";
															TableHTML = TableHTML + "<button id='Step"+ResultItems[i].Id+"' type='button' class='btn custom-btn new-btnad' style='display:none' data-toggle='modal' data-target='#editablecolsfild' onclick='LoadPartialtblColSteps("+ResultItems[i].Id+")'><i class='fa fa-ellipsis-h' aria-hidden='true'></i></button></div></td>"
		           								       	
	            		        						}
	            		        						else{
		            		        						TableHTML = TableHTML + "<td><input type='checkbox' name='PartialTableChkboxSteps' onclick='setSelectAll(this)' style='height: 17px; width: 17px;' value='"+ResultItems[i].ID+"' "+Chkboxstatus +"></td>";
		           								       	}
		           			TableHTML = TableHTML + "</tr>";
	           			}            
					}
				}
				else
				{
					var QueryReq = "/_api/web/lists/getbytitle('ApprovalTemplateEditScope')/items?$filter=TemplateID eq '"+CurrTenplateID+"' and StepID eq '"+StepID+"'";					
					var QueryResult = RequestData(QueryReq);				
					if(QueryResult.length>0)
					{
						SelectedPrtableSteps = QueryResult;
					}            
            		var count=0;
            		for(var i=0; i<ResultItems.length; i++)
            		{
                	   	var FilteredRec = $.grep(QueryResult, function(v) {
    						return v.ColumnIDId == ResultItems[i].ID;
						});
						var Chkboxstatus='';
						var TableColumns="";
						if(FilteredRec.length>0)
						{
							Chkboxstatus = 'checked';
							TableColumns=FilteredRec[0].TableColumnsId.results;
						}
						if(ResultItems[i].ColumnType!="FixedText" && ResultItems[i].ColumnType!="Header" && ResultItems[i].ColumnType!="QR Code" && ResultItems[i].ColumnType!="Web Link" && ResultItems[i].ColumnName!="CalculatedValue" && ResultItems[i].ColumnName!="SummarizedValue" && ResultItems[i].ColumnName!="AutoSerialNumber"){
				    	   	let select_all_checkboxes = document.getElementById("setEditableSelStepsAll");			            	
				    	   	TableHTML = TableHTML +	"<tr>"+
	            		        						"<td>"+ResultItems[i].Title+"</td>"+
	            		        						"<td>"+ResultItems[i].ColumnType+"</td>";
	            		        						if(ResultItems[i].ColumnType=="Table"){
	            		        							TableHTML = TableHTML + "<td><div class='bothwarpboxsec'>"+
	            		        							"<select name='tblColSetFieldSteps' class='select_designnow' id='"+ResultItems[i].Id+"' onchange='showColAddBtn(this)'>";
  															var styleD="none";
	            		        							if(FilteredRec.length!=0){
	  																if(FilteredRec[0].TableEditScope=="Entire"){
	  																	TableHTML = TableHTML +"<option value=''>Select</option><option value='Entire' selected>Entire</option>"+
				  																"<option value='Add Row' >Add Row</option>"+
				  																"<option value='Columns' >Columns</option>";
	
	  																}
	  																else if(FilteredRec[0].TableEditScope=="Add Row"){
	  																TableHTML = TableHTML +"<option value='Entire' >Entire</option>"+
				  																"<option value='Add Row' selected>Add Row</option>"+
				  																"<option value='Columns' >Columns</option>";
	
	  																}
	  																else if(FilteredRec[0].TableEditScope=="Columns"){
	  																styleD="initial";
	  																	TableHTML = TableHTML +"<option value='Entire'>Entire</option>"+
				  																"<option value='Add Row' >Add Row</option>"+
				  																"<option value='Columns' selected>Columns</option>";
	
	  															}else{
  																	TableHTML = TableHTML +"<option value='' >Select</option><option value='Entire'>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";
  																}
  																}else{
  																	TableHTML = TableHTML +"<option value='Entire'>Entire</option>"+
			  																"<option value='Add Row' >Add Row</option>"+
			  																"<option value='Columns' >Columns</option>";
  																}
															TableHTML = TableHTML +"</select>";
															//TableHTML = TableHTML + "<button id='Init"+ResultItems[i].Id+"'  value='"+TableColumns+"' type='button' class='btn custom-btn new-btnad' style='display:"+styleD+"' data-toggle='modal' data-target='#editablecolsfild' onclick='LoadPartialtblColSteps(this,"+ResultItems[i].Id+")'><i class='fa fa-plus'></i></button></td>"
	           								       	
															
															  TableHTML = TableHTML + "<button id='Step"+ResultItems[i].Id+"' Value='"+TableColumns+"' type='button' class='btn custom-btn new-btnad' style='display:"+styleD+"' data-toggle='modal' data-target='#editablecolsfild' onclick='LoadPartialtblColSteps(this,"+ResultItems[i].Id+")'><i class='fa fa-ellipsis-h' aria-hidden='true'></i></button></div></td>"
		           								       	
	            		        						}
	            		        						else{
		            		        						TableHTML = TableHTML + "<td><input type='checkbox' name='PartialTableChkboxSteps' onclick='setSelectAll(this)' style='height: 17px; width: 17px;' value='"+ResultItems[i].ID+"' "+Chkboxstatus +"></td>";
		           								       		if(Chkboxstatus==''){
																count++;						
															}if(count>0){
																if(select_all_checkboxes != null){
																	select_all_checkboxes.checked = false;
																}
															}else{select_all_checkboxes.checked = true;}
		           								       	}
		           			TableHTML = TableHTML + "</tr>";
		           			
           				}          
					}
				
				}			
			}
			$("#TableFieldsListSteps").empty().append(TableHTML);  
        },
        error: function (data) 
        {  
            console.log("Error in getdata.");
        }  
    });
   }
}


function SetDisplayApprovers(Action)
{
	if(Action.value == 'User')
	{
		$(".usrbox").css("display", "block");
		$(".grpbox").css("display", "none");
		$(".rolbox").css("display", "none");
		$(".colbox").css("display", "none");
		$(".runbox").css("display", "none");

		initializePeoplePicker('Stepuser');
		peoplePickerDiv = $("[id$='Stepuser_TopSpan']");
	}
	else if(Action.value == 'Role')
	{
		$(".usrbox").css("display", "none");
		$(".grpbox").css("display", "none");
		$(".rolbox").css("display", "block");
		$(".colbox").css("display", "none");
		$(".runbox").css("display", "none");
	}
	else if(Action.value == 'Group')
	{
		$(".usrbox").css("display", "none");
		$(".grpbox").css("display", "block");
		$(".rolbox").css("display", "none");
		$(".colbox").css("display", "none");
		$(".runbox").css("display", "none");
	}
	else if(Action.value == 'Field')
	{
		$(".usrbox").css("display", "none");
		$(".colbox").css("display", "block");
		$(".rolbox").css("display", "none");
		$(".grpbox").css("display", "none");
		$(".runbox").css("display", "none");
	}else if(Action.value == 'Runtime')
	{
		$(".usrbox").css("display", "none");
		$(".runbox").css("display", "block");
		$(".rolbox").css("display", "none");
		$(".grpbox").css("display", "none");
		$(".colbox").css("display", "none");
	}
}


function SetDisplayPrTable4Approvers(Action)
{
	if(Action == 'Edit Data' || Action == 'Edit Only')
	{
		$("#editablefildStepsDIV").css("display", "block");
	}
	else if(Action == 'Edit & Sign')
	{
		$("#editablefildStepsDIV").css("display", "block");
	}else if(Action == 'Review Only')
	{
		$("#editablefildStepsDIV").css("display", "block");
	}
	else
	{
		$("#editablefildStepsDIV").css("display", "none");
	}
}


var G_TableFieldsList=false;
function SetTableFieldsList()
{
	var yourArray=[];
	$("input:checkbox[name='PartialTableChkbox']:checked").each(function(){
		yourArray.push($(this).val());
	});
	$("select[name='tblColSetField']").each(function(){
			//yourArray.push($(this).val());
			//yourArray.push({"01": $(this).val(), "02": $(this).val()});

		});
	if(ProcessType="Process"){
		if(yourArray.length>0)
		{
			G_TableFieldsList=true;
			$('#editablefild').modal('hide');
		}
		else
		{
			G_TableFieldsList=false;
			alert('Set the editable columns')
		}
	}
}


function SetTableFieldsListSteps()
{
	var yourArray=[];
	$("input:checkbox[name='PartialTableChkboxSteps']:checked").each(function(){
		yourArray.push($(this).val());
	});
	if(ProcessType="Process"){
		if(yourArray.length>0)
		{
			$('#editablefildSteps').modal('hide');
		}
		else
		{
			alert('Set the editable columns')
		}
	}
}


function ClearTableFieldsListSteps()
{
	$('#setEditableSelStepsAll').removeAttr('checked');
	$('input:checkbox[name="PartialTableChkboxSteps"]').removeAttr('checked');
}


function ValidateLoginUserEntryscreen() 
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$select=Contributors/EMail&$expand=Contributors&$filter=WebPartName eq 'Process Admin' and Company eq '" + Logged_CompanyId + "' and (Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' or Scope eq 'Everyone') ";
	$.ajax({
		url: Ownurl,
		headers: { Accept: "application/json;odata=verbose" },
		async: false,
	    success: function (data) 
	    {
	    	var items = data.d.results;
	        if (items.length > 0) 
	        {
	                    //Access
	        }
	        else 
	        {
	        	alert("Unauthorized access!");
	            window.location.href = _spPageContextInfo.webAbsoluteUrl;
	        }
		},
		error: function (data) 
		{
	    	console.log(data);
	    }
	});
}
    

$(document).ready(function(){
	$(".addstepsboxsec").hide();
	$('input[type=radio][name=optionls]').change(function() {
	    if (this.value == 'At Bottom of') {
			$("#PositionOptList").css("display", "block");
	    }
	    else if (this.value == 'At Bottom most') {
	        $("#PositionOptList").css("display", "none");

	    }
	});
  $("#ActionReq").change(function(){
   			if($("#ActionReq").val()=="Edit Data" || $("#ActionReq").val()=="Review Only" || $("#ActionReq").val()=="Edit Only"){
   				$(".stepsOfProc").css("visibility", "hidden");
   			}else{
   				$(".stepsOfProc").css("visibility", "visible");
   			}
  });
  		$('#adds_stepsection').on('hidden.bs.modal', function() {
  			var modal = $(this);		
		    $("#ActionReq").val("Select").attr("selected","selected");
		    modal.find('.modal-body select').prop('selectedIndex', 0);
			modal.find('.modal-body #editablefildStepsDIV,.colbox,.grpbox,.usrbox,.runbox,#btnEditStep,#PositionOptList').css("display", "none");
			modal.find('.modal-body .rolbox').css("display", "block");
			$("input[name=optionls][value='At Bottom most']").prop('checked', true);
			$("#btnAddStep").css("display", "initial");
    		$("#Stepuser").html('');
    		$("input[name=optradio][value=Role]").prop('checked', true);
    		$("#txtStepName").val('');
    		$('#chkAllStack').prop('checked',false);
    		initializePeoplePicker('Stepuser', false);	StepCount = 0;	
		});

});
function getGroupNames(){
$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('ApproversGroups')/items",//?$filter=(AuthorId eq'" + _spPageContextInfo.userId + "')", //?$select="+val,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
        	var choiceArray = data.d.results;
        	var option = '<option value="Select">--Select--</option>';//"<option value='"+choiceArray[0]+"' selected='selected'>"+choiceArray[0]+"</option>" 
        	for(i=0;i<choiceArray.length;i++){    //console.log(choiceArray[i]);    		
        		option += "<option value='"+choiceArray[i].Id+"'>"+choiceArray[i].Title+"</option>";         		
        	}
			$("#ddlgroups").html(option);		
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}
var arrPerson=[];
function getPersonCol(TempID){
arrPerson=[];
$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('ApprovalTemplateSetup')/items?$filter=(ColumnType eq 'Person') and (TemplateID eq '"+TempID+"')", //?$select="+val,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
        	var choiceArray = data.d.results;
        	
        	var option = '<option value="Select">--Select--</option>';//"<option value='"+choiceArray[0]+"' selected='selected'>"+choiceArray[0]+"</option>" 
        	for(i=0;i<choiceArray.length;i++){    console.log(choiceArray[i]);  
        	arrPerson.push({'ColumnName':choiceArray[i].ColumnName,'ColumnTitle':choiceArray[i].Title});  		
        		option += "<option value='"+choiceArray[i].ColumnName+"'>"+choiceArray[i].Title+"</option>";         		
        	}
			$("#ddlPersonColumn").html(option);		
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}
function getPrevSteps(TempID,st,ID){
if(st=="Add"){
	query="(AskApprover eq false) and ";
}else{query="";}
$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('ApprovalTemplateSteps')/items?$filter=(TemplateID eq '"+TempID+"')", //?$select="+val,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
        	var choiceArray = data.d.results;
        	
        	var option = '<option value="Initiation">Initiation</option>';//"<option value='"+choiceArray[0]+"' selected='selected'>"+choiceArray[0]+"</option>" 
        	for(i=0;i<choiceArray.length;i++){   
        	//arrPerson.push({'ColumnName':choiceArray[i].ColumnName,'ColumnTitle':choiceArray[i].Title});  		
        		option += "<option value='"+choiceArray[i].Id+"'>"+choiceArray[i].StepName+"</option>";         		
        	}
			$("#ddlPreSteps").html(option);		
			$("#ddlPreSteps option[value='"+ID+"']").remove();

        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}


function showSubBtn(){
	$("#btnSubmitStep").show();
	$(".addstepsboxsec").hide();
}
function hideSubBtn(){
	$("#btnSubmitStep").hide();
	$(".addstepsboxsec").show();
}
function ApproverDecStep(editID,askApprover,approverForStep){
	var listItem = { __metadata:{ type: "SP.Data.ApprovalTemplateStepsListItem" },
		AskApprover:askApprover,
		ApproverForStep:approverForStep,
		};
	$.ajax({
	        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateSteps')/items(" +editID+ ")",
	        type: "PATCH",
	        headers: {
	            "accept": "application/json;odata=verbose",
	            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
	            "content-Type": "application/json;odata=verbose",
	            "X-Http-Method": "PATCH",
	            "If-Match": "*"
	        },
	        data: JSON.stringify(listItem),
	        success: function (data) 
	        {
	        
	        },
	        error: function (error) {
	            console.log(JSON.stringify(error));
	        }
    });
}
function getDynaOptionsForInitiator(LstName,DropdownId,state){
		var query='';
			if(LstName=="Departments"){
				query="?$select=Title,ID,CompanyID/Title&$expand=CompanyID";
			}else if(LstName=="OfficeLocation"){			
				query="?$select=Title,ID,CompanyID/Title&$expand=CompanyID";
			}
$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('"+LstName+"')/items"+query,
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
        	if(LstName=="Departments"){			
				className='Dept';
				$('#'+DropdownId).empty();
                for (i = 0; i < choiceArray.length; i++) {
                    $('#'+DropdownId).append('<li><input type="checkbox" class="'+className+'" value=' + choiceArray[i].ID + '>' + choiceArray[i].Title+ ' ['+choiceArray[i].CompanyID.Title+']' + '</li>')
                }
			}else if(LstName=="OfficeLocation"){			
				className='Office';	
				$('#'+DropdownId).empty();
                for (i = 0; i < choiceArray.length; i++) {
                    $('#'+DropdownId).append('<li><input type="checkbox" class="'+className+'" value=' + choiceArray[i].ID + '>' + choiceArray[i].Title+ ' ['+choiceArray[i].CompanyID.Title+']' + '</li>')
                }
			}else if(LstName=="ApproversGroups"){			
				className='Group';
				$('#'+DropdownId).empty();
                for (i = 0; i < choiceArray.length; i++) {
                    $('#'+DropdownId).append('<li><input type="checkbox" class="'+className+'" value=' + choiceArray[i].ID + '>' + choiceArray[i].Title + '</li>')
                }	
			}else if(LstName=="ClientMaster"){			
				className='Client';	
				$('#'+DropdownId).empty();
                for (i = 0; i < choiceArray.length; i++) {
                    $('#'+DropdownId).append('<li><input type="checkbox" class="'+className+'" value=' + choiceArray[i].ID + '>' + choiceArray[i].Title + '</li>')
                }				
			}
			
        	 	
                if(state=="Update"){
	                if(LstName=="Departments"){			
						var Dept="";
						var result = selected_Dept.filter(function(o1){
						    // filter out (!) items in result2
						    return choiceArray.some(function(o2){
						    if(o1=== o2.Id){Dept+=o2.Title+",";
						        return o2.Title;          // assumes unique id
						      }
						    });
						});
						$("#SelectedItems1").text(Dept);
						var x = 0;
		                for (x; x < selected_Dept.length; x++) {
		                    var selectedval = selected_Dept[x];
		                    $(":checkbox[value='" + selectedval + "']").prop("checked", "true");
		                }
					}else if(LstName=="OfficeLocation"){			
						var Office="";
						var result = selected_Office.filter(function(o1){
						    // filter out (!) items in result2
						    return choiceArray.some(function(o2){
						    if(o1=== o2.Id){Office+=o2.Title+",";
						        return o2.Title;          // assumes unique id
						      }
						    });
						});
						$("#SelectedItems2").text(Office);
						var x = 0;
		                for (x; x < selected_Office.length; x++) {
		                    var selectedval = selected_Office[x];
		                    $(":checkbox[value='" + selectedval + "']").prop("checked", "true");
		                }	
					}else if(LstName=="ApproversGroups"){			
						var Groups="";
						var result = selected_Group.filter(function(o1){
						    // filter out (!) items in result2
						    return choiceArray.some(function(o2){
						    if(o1=== o2.Id){Groups+=o2.Title+",";
						        return o2.Title;          // assumes unique id
						      }
						    });
						});
						$("#SelectedItems3").text(Groups);
						var x = 0;
		                for (x; x < selected_Group.length; x++) {
		                    var selectedval = selected_Group[x];
		                    $(":checkbox[value='" + selectedval + "']").prop("checked", "true");
		                }
					}else if(LstName=="ClientMaster"){			
						var clients="";
						var result = selected_Client.filter(function(o1){
						    // filter out (!) items in result2
						    return choiceArray.some(function(o2){
						    if(o1=== o2.Id){clients+=o2.Title+",";
						        return o2.Title;          // assumes unique id
						      }
						    });
						});
						$("#SelectedItems4").text(clients);
						var x = 0;
		                for (x; x < selected_Client.length; x++) {
		                    var selectedval = selected_Client[x];
		                    $(":checkbox[value='" + selectedval + "']").prop("checked", "true");
		                }
					}

                }
				 			
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}

$(document).ready(function(){
	
	$("#ddlDept").click(function () {
	    var val = [];
	    var selectedText = [];
	    selected_Dept= [];
	    $('.Dept:checked').each(function (i) {
	        val[i] = $(this).val();
	        selectedText[i] = $(this).parent().text();
	        $("#SelectedItems1").text(selectedText);
	        selected_Dept.push(val[i]);
	        $('.Dept:checked').text();
	    });
	    if(selected_Dept.length==0)
	    $("#SelectedItems1").text("Select");

	});
	
	$("#ddlOffice").click(function () {
	    var valOffice = [];
	    var selectedTextOffice = [];
	    selected_Office= [];
	    $('.Office:checked').each(function (i) {
	        valOffice[i] = $(this).val();
	        selectedTextOffice[i] = $(this).parent().text();
	        $("#SelectedItems2").text(selectedTextOffice);
	        selected_Office.push(valOffice[i]);
	        $('.Office:checked').text();
	    });
	    if(selected_Office.length==0)
	    $("#SelectedItems2").text("Select");

	});
	$("#ddlGroup").click(function () {
	    var val = [];
	    var selectedText = [];
	    selected_Group= [];
	    $('.Group:checked').each(function (i) {
	        val[i] = $(this).val();
	        selectedText[i] = $(this).parent().text();
	        $("#SelectedItems3").text(selectedText);
	        selected_Group.push(val[i]);
	        $('.Group:checked').text();
	    });
	    if(selected_Group.length==0)
	    $("#SelectedItems3").text("Select");

	});
	$("#ddlClient").click(function () {
	    var val = [];
	    var selectedText = [];
	    selected_Client= [];
	    $('.Client:checked').each(function (i) {
	        val[i] = $(this).val();
	        selectedText[i] = $(this).parent().text();
	        $("#SelectedItems4").text(selectedText);
	        selected_Client.push(val[i]);
	        $('.Client:checked').text();
	    });
	    if(selected_Client.length==0)
	    $("#SelectedItems4").text("Select");

	});
	$("#ddlCompEmp").click(function () {
	    var val = [];
	    var selectedText = [];
	    selected_CompEmp= [];
	    $('.Company:checked').each(function (i) {
	        val[i] = $(this).val();
	        selectedText[i] = $(this).parent().text();
	        $("#SelectedItems5").text(selectedText);
	        selected_CompEmp.push(val[i]);
	        $('.Company:checked').text();
	    });
	    if(selected_CompEmp.length==0)
	    $("#SelectedItems5").text("Select");

	});
});	


function getDynaOptionsForInitiatorComp(LstName,DropdownId,state){
		
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
                for (i = 0; i < choiceArray.length; i++) {
                    $('#'+DropdownId).append('<li><input type="checkbox" class="Company" value=' + choiceArray[i].ID + '>' + choiceArray[i].Title + '</li>')
                }				
        	 	
                if(state=="Update"){
						var comp="";
						var result = selected_CompEmp.filter(function(o1){
						    // filter out (!) items in result2
						    return choiceArray.some(function(o2){
						    if(o1=== o2.Id){comp+=o2.Title+",";
						        return o2.Title;          // assumes unique id
						      }
						    });
						});
						$("#SelectedItems5").text(comp);
						var x = 0;
		                for (x; x < selected_CompEmp.length; x++) {
		                    var selectedval = selected_CompEmp[x];
		                    $(":checkbox[value='" + selectedval + "']").prop("checked", "true");
		                }
                }
				 			
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}
function setSelectAll(ths){
		let select_all_checkboxes = document.getElementById("setEditableSelAll");
    	let delete_checkbox = document.getElementsByName("PartialTableChkbox");

		for (let i = 0; i < delete_checkbox.length; i++) {
            if (delete_checkbox[i].checked == false) {                
                select_all_checkboxes.checked = false;return false;
            }else if (delete_checkbox[i].checked == true) {                
                select_all_checkboxes.checked = true;
            }        
        }
}
function setSelectAllSteps(ths){
		let select_all_checkboxes = document.getElementById("setEditableSelStepsAll");
    	let delete_checkbox = document.getElementsByName("PartialTableChkboxSteps");

		for (let i = 0; i < delete_checkbox.length; i++) {
            if (delete_checkbox[i].checked == false) {                
                select_all_checkboxes.checked = false;return false;
            }else if (delete_checkbox[i].checked == true) {                
                select_all_checkboxes.checked = true;
            }        
        }
}
function setSelectColsAll(ths){
		let select_all_checkboxes = document.getElementById("setEditableColSelAll");
    	let delete_checkbox = document.getElementsByName("TableChkboxSteps");

		for (let i = 0; i < delete_checkbox.length; i++) {
            if (delete_checkbox[i].checked == false) {                
                select_all_checkboxes.checked = false;return false;
            }else if (delete_checkbox[i].checked == true) {                
                select_all_checkboxes.checked = true;
            }        
        }
}

var SelectedPrtableColSteps=[];
function LoadPartialtblColSteps(ths,StepID)
{		
		$("#tblAddtblCol").val(StepID);
		SelectedPrtableColSteps=[];
		var ResultItems=[];
		//if(flagIniStp=="Initiation"){chkName=ths.value;}else {chkName=ths.value}

		var arr=[]; 
		arr=ths.value.split(",");
		
		var Ownurl =_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateTable')/items?$filter=SetupID eq '"+StepID+"'&$orderby=SequenceNo asc";  
    	$.ajax({  
	        url: Ownurl,  
	        headers: { Accept: "application/json;odata=verbose" },  
	        async:true,  
	        success: function (data) 
	        {	        
	        	var TableHTML='';	        
				var ResultItems=[];
				ResultItems = data.d.results;
				var count=0;
				for(var i=0;i<ResultItems.length;i++){
					var FilteredRec = $.grep(arr, function(v) {
	    				return v== ResultItems[i].ID;
					});
					var Chkboxstatus=''
					if(FilteredRec.length>0)
					{
						Chkboxstatus = 'checked';
					}
					if(Chkboxstatus ==''){count++;}
					let select_all_checkboxes = document.getElementById("setEditableColSelAll");
					if(count>0)
					{
						select_all_checkboxes.checked =false;
					}else{
						select_all_checkboxes.checked = true;
					}
				       	TableHTML = TableHTML +	"<tr>"+
	            		        						"<td>"+ResultItems[i].Title+"</td>"+
	            		        						//"<td>"+ResultItems[i].ColumnType+"</td>"+	            		        						
		            		        					"<td><input type='checkbox' name='TableChkboxSteps' onclick='setSelectColsAll(this)' style='height: 17px; width: 17px;' value='"+ResultItems[i].ID+"' "+Chkboxstatus +"></td>";
		           								      
		           			TableHTML = TableHTML + "</tr>";           		
           		}
           		$("#TableColsFieldsList").empty().append(TableHTML);
	        },
	        error: function (data) 
	        {  
	            console.log("Error in getdata.");
	        }  
    	});
}
function addtblColumnField(ths)
{
	var tblColArray=[];
	var chkName="";
	if(flagIniStp=="Initiation"){chkName='Init'+ths.value;}else {chkName='Step'+ths.value;}
	$("input:checkbox[name='TableChkboxSteps']:checked").each(function(){
		tblColArray.push($(this).val());
	});
	$("#"+chkName).val(tblColArray);
	if(ProcessType="Process"){
		if(tblColArray.length>0)
		{
			$('#editablecolsfild').modal('hide');
		}
		else
		{
			alert('Set the editable columns')
		}
	}
}
function showColAddBtn(ths){

	if($(ths).val()=="Columns"){
		$(ths).siblings(0).show();
	}else{
		$(ths).siblings(0).hide();
	}
}
$('#editablecolsfild').on('hidden.bs.modal', function() {
	$('input:checkbox[name="TableChkboxSteps"]').removeAttr('checked');
});
var AllTaskUsersEmployeeuser = [];
var RestQuery;

function GetOwnerUser() {
    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    RestQuery = "?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID,ManagerLoginName/ID,ManagerLoginName/Title&$orderby= FullName asc &$expand=LogonName,Department,Company,ManagerLoginName &$filter= Status eq 'Active' and Company/ID eq '" + txtCompanyId + "'&$top=5000";
    $.when(CommonFunction.getItemsWithQueryItem("Employees", RestQuery)).done(function (Employees) {
        try {
            for (var i = 0; i < Employees.results.length; i++) {
          
                var ManagarName = Employees.results[i].ManagerLoginName;
                AllTaskUsersEmployeeuser.push({
                    'UserId': Employees.results[i].LogonName.Id,
                    'EMail': Employees.results[i].LogonName.EMail,
                    'LoginName': Employees.results[i].LogonName.Title ? Employees.results[i].LogonName.Title : "NA",
                    'Designation': Employees.results[i].Designation ? Employees.results[i].Designation : "NA",
                    'Manager': ManagarName,//[0].FullName,
                    'DepartmentId': Employees.results[i].Department.ID,
                    'Department': Employees.results[i].Department.DepartmentName,
                    'FullName': Employees.results[i].FullName,
                    'CompanyID': Employees.results[i].Company.ID,
                    'EmployeeID': Employees.results[i].Id,
                    'Skill': Employees.results[i].SkillSet ? Employees.results[i].SkillSet : "NA"
                })
            }
        } catch (e) {
            alert(e);
        }
    });
    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    var RestQuery1 = "?$select=*,LoginName/EMail,LoginName/Title,LoginName/Id,LoginName/FirstName,LoginName/LastName,LoginName/EMail&$expand=LoginName&$filter= Status eq 'Active'&$top=5000";
    $.when(CommonFunction.getItemsWithQueryItem("ExternalUsers", RestQuery1 )).done(function (Employees) {console.log(Employees)
        try {
            for (var i = 0; i < Employees.results.length; i++) {
          
                //var ManagarName = Employees.results[i].ManagerLoginName;
                AllTaskUsersEmployeeuser.push({
                    'UserId': Employees.results[i].LoginName.Id,
                    'EMail': Employees.results[i].LoginName.EMail,
                    'LoginName': Employees.results[i].LoginName.Title ? Employees.results[i].LoginName.Title : "NA",
                    'Designation': Employees.results[i].Designation ? Employees.results[i].Designation : "NA",
                    'Manager': "",//[0].FullName,
                    'DepartmentId': "",
                    'Department': "",
                    'FullName':"",
                    'CompanyID': "",
                    'EmployeeID': "",
                    'Skill': ""
                    
                })
            }
        } catch (e) {
            alert(e);
        }
    });
    
}


var AllEmployee = [];
var Query;

function GetAllUser() {
    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    Query= "?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID,ManagerLoginName/ID,ManagerLoginName/Title&$orderby= FullName asc &$expand=LogonName,Department,Company,ManagerLoginName &$filter= Status eq 'Active' and Company/ID eq '" + txtCompanyId + "'&$top=5000";
    $.when(CommonFunction.getItemsWithQueryItem("Employees", Query)).done(function (Employees) {
        try {
            for (var i = 0; i < Employees.results.length; i++) {
          
                var ManagarName = Employees.results[i].ManagerLoginName;
                AllEmployee.push({
                    'UserId': Employees.results[i].LogonName.Id,
                    'EMail': Employees.results[i].LogonName.EMail,
                    'LoginName': Employees.results[i].LogonName.Title ? Employees.results[i].LogonName.Title : "NA",
                    'Designation': Employees.results[i].Designation ? Employees.results[i].Designation : "NA",
                    'Manager': ManagarName,//[0].FullName,
                    'DepartmentId': Employees.results[i].Department.ID,
                    'Department': Employees.results[i].Department.DepartmentName,
                    'FullName': Employees.results[i].FullName,
                    'CompanyID': Employees.results[i].Company.ID,
                    'EmployeeID': Employees.results[i].Id,
                    'Skill': Employees.results[i].SkillSet ? Employees.results[i].SkillSet : "NA"
                })
            }
        } catch (e) {
            alert(e);
        }
    });
    var txtCompanyId = titanForWork.getQueryStringParameter("CompanyId");
    var RestQuery1 = "?$select=*,LoginName/EMail,LoginName/Title,LoginName/Id,LoginName/FirstName,LoginName/LastName,LoginName/EMail&$expand=LoginName&$filter= Status eq 'Active'&$top=5000";
    $.when(CommonFunction.getItemsWithQueryItem("ExternalUsers", RestQuery1 )).done(function (Employees) {console.log(Employees)
        try {
            for (var i = 0; i < Employees.results.length; i++) {
          
                //var ManagarName = Employees.results[i].ManagerLoginName;
                AllEmployee.push({
                    'UserId': Employees.results[i].LoginName.Id,
                    'EMail': Employees.results[i].LoginName.EMail,
                    'LoginName': Employees.results[i].LoginName.Title ? Employees.results[i].LoginName.Title : "NA",
                    'Designation': Employees.results[i].Designation ? Employees.results[i].Designation : "NA",
                    'Manager': "",//[0].FullName,
                    'DepartmentId': "",
                    'Department': "",
                    'FullName':"",
                    'CompanyID': "",
                    'EmployeeID': "",
                    'Skill': ""
                    
                })
            }
        } catch (e) {
            alert(e);
        }
    });
    
}