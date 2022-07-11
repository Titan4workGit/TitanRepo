var selected_data=[];
selected_data=1;
$(document).ready(function () {debugger;

	$("#btnCancel").attr("href", titanForWork.getQueryStringParameter('sourcelocation'));

	initializePeoplePicker("InternalUsers");
    var UrlMode = titanForWork.getQueryStringParameter('Mode');
    if(UrlMode =="View")
    {
        $("#btnsubmit").hide();
        $(".ViewMode").attr('disabled','disabled');    
    }
    
    $("#InternalUsers_TopSpan_ResolvedList").hover(function(){
  		var PPlValue = ensureUser($('#InternalUsers').children().children().attr('id'));
  		//alert(test)
  		//let element = document.getElementById("box");
		   //element.classList.toggle("box-out");
  		if(PPlValue != 0)
  		{
  			GetEmployeeDTL(PPlValue);
  		}
  	});
  	
  	
  	//$("#box").click(function(){
  	//	let element = document.getElementById("box");
	//	   element.classList.toggle("box-out");

	//});
  	
  	$('#InternalUsers_TopSpan_EditorInput').focusout(function(){
  		//var test = $('#InternalUsers').getUserIDs();
   		var PPlValue = ensureUser($('#InternalUsers').children().children().attr('id'));
   		if(PPlValue != 0)
  		{
  			GetEmployeeDTL(PPlValue);
  		}

	});
    
    
    
    
    ValidateLoginUserEntryscreen();
	
    InitializeControlsBioGraphyPageLoad();
    $("#ddlemployee").select2( {
        placeholder: "Select Employee",
        allowClear: true
    } );

    GetCategory();
    //BindEmployeesDropDown();
    GetActiveLanguage();
    $('#ddlemployee').change(function () {
        GetCompanyEmployees($(this).val());
    });
    SetCalendar();
    
    // Bind Category in dropdown
    
    $(".dropdown-menu").click(function() {
        var val = [];
        var selectedText = [];
        selected_data=[];
        $(':checkbox:checked').each(function(i){
            val[i] = $(this).val();
            selectedText[i]   = $(this).parent().text();
            $("#SelectedItems").text(selectedText);
            selected_data.push(val[i]);
            $('input[type="checkbox:checked"]').text();
        });
        
        
    });
	
		
    var file = document.getElementById('profileimageupload');
    file.onchange = function(e) {
        var ext = this.value.match(/\.([^\.]+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'JPG':
            case 'JPEG':
            case 'jpeg':
            case 'GIF':
            case 'gif':
            case 'PNG':
            case 'png':

                var size = this.files[0].size/1024;
                if(size.toFixed(2)>100)
                {
                    alert("Image size not more then 100 KB");
                    this.value='';
                }
                else
                {
                    document.getElementById('profile-image1').src = window.URL.createObjectURL(this.files[0]);
                }
                break;
            default:
                alert('Please select image files of JPEG, JPG, GIF and PNG formatted only.');      
                this.value = '';
        }
    };


    $('#txtxdatefrom').attr("readonly", "readonly");
    $('#txtdateto').attr("readonly", "readonly");

    if($.urlParam('Mode') == "View?MODAL"){
        $(".DeletePic").remove();
        $(".LabelAsButton").remove();
        $("#btnsubmit").remove();
        $("#btnCancel").remove();
    }
    
    
    
    BindBioGraphyData();
    
});

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results == null){return results="null";}
    else{
        return results[1] || 0;
    }
}

var dropZoneId = "drop-zone";
var dropZone = $("#" + dropZoneId);
var inputFile = dropZone.find("input");
var finalFiles = [];
var FinalFiles4Upload=[];
var Tcounter = 0;
var RemoveDuplicate = [];

$(function() {
    $("#FileUpload").on('change', function(e) {
        FinalFiles4Upload =[];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files,function(idx,elm){
            finalFiles[finalFiles.length]=elm;
        });

        RemoveDuplicate = [];
        var arr = finalFiles.filter(function(el) {
            if(RemoveDuplicate.indexOf(el.name) == -1)
            {
                RemoveDuplicate.push(el.name);
                return true;
            }
            return false;
        });
        console.log(arr);
        FinalFiles4Upload = ReinitializeArray(arr);
        if(FinalFiles4Upload.length<6)
        {
            $('#filename').empty();
            for (initial; initial < FinalFiles4Upload.length; initial++)
            { 
                $('#filename').append('<div id="file_'+ Tcounter +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + Tcounter+ '</strong></span> ' + RemoveDuplicate[initial] + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id);" id="file_'+ Tcounter +'"" title="remove"></span></div>');
                Tcounter = Tcounter + 1;
            }
        }
        getImageWeight();
    });
})

function getImageWeight()
{
    var totalWeight =0;
    var t=0;
    for(t; t<FinalFiles4Upload.length; t++)
    {
        totalWeight += FinalFiles4Upload[t].size;
    }
    var kb=totalWeight/1024;
    var mb=kb/1024; 
    $("#imgweight").text(mb.toFixed(2).concat(" MB"));  
    if(FinalFiles4Upload.length>5)
    {
        alert("Warning: Select only 5 Images/Photos");
        finalFiles=[];
        FinalFiles4Upload=[];
        Tcounter = 0;
        RemoveDuplicate = [];

        $('#filename').empty();
    }
    else if (mb.toFixed(2)>5)
    {
        alert("Total weight of images not more than 5 MB")
        finalFiles=[];
        FinalFiles4Upload=[];
        Tcounter = 0;
        RemoveDuplicate = [];

        $('#filename').empty();

    }
}

function removeLine(id)
{
    var index = id.split('_')[1];
    $("#"+id).remove();
    delete finalFiles[parseInt(index)]; 
    RemoveDuplicate = [];
    var arr = finalFiles.filter(function(el) {
        if (RemoveDuplicate.indexOf(el.name) == -1) {
            RemoveDuplicate.push(el.name);
            return true;
        }
        return false;
    });
    FinalFiles4Upload = ReinitializeArray(arr);
    getImageWeight();
}


function ReinitializeArray(arr) 
{
    var newArr = [];
    var count = 0;
	for (var i=0; i<arr.length;i++)
    {
        newArr[count++] = arr[i];
    }
    return newArr;	
}

var dropZoneId = "drop-zone";
var dropZone = $("#" + dropZoneId);
var inputFile = dropZone.find("input");
var finalFiles2 = [];
var FinalFiles4Upload2=[];
var Tcounter2 = 0;
var RemoveDuplicate2 = [];


$(function() {
    $("#UploadDoc").on('change', function(e) {
        FinalFiles4Upload2 =[];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files,function(idx,elm){
            finalFiles2[finalFiles2.length]=elm;
        });


        RemoveDuplicate2 = [];
        var arr = finalFiles2.filter(function(el) {
            if (RemoveDuplicate2.indexOf(el.name) == -1) {
                RemoveDuplicate2.push(el.name);
                return true;
            }
            return false;
        });

        console.log(arr);
        FinalFiles4Upload2 = ReinitializeArray(arr);



        $('#Docfilename').empty();
        for (initial; initial < FinalFiles4Upload2.length; initial++) { 
            $('#Docfilename').append('<div id="Ifile_'+ Tcounter2 +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + Tcounter2+ '</strong></span> ' + RemoveDuplicate2[initial] + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="RemoveDocument(this.id);" id="Ifile_'+ Tcounter2 +'"" title="remove"></span></div>');
            Tcounter2 = Tcounter2 + 1;
        }
    });
})



function RemoveDocument(id)
{
    var index = id.split('_')[1];
    $("#"+id).remove();
    delete finalFiles2[parseInt(index)]; 
    RemoveDuplicate2 = [];
    var arr = finalFiles2.filter(function(el) {
        if (RemoveDuplicate2.indexOf(el.name) == -1) {
            RemoveDuplicate2.push(el.name);
            return true;
        }
        return false;
    });
    FinalFiles4Upload2 = ReinitializeArray(arr);
}




var email = "";

function InitializeControlsBioGraphyPageLoad() 
{

    $('#TxtCheckBox').prop('checked','checked')

    var Handler = this;
    Handler.itemId = titanForWork.getQueryStringParameter('itemId');
    if (Handler.itemId == null)
    {
        Handler.Mode = "Add";
    }
    else
    {
        //$('#ddlemployee').attr('disabled', 'disabled');
        Handler.Mode = "Update";
    }
    Handler.SourcePage = titanForWork.getQueryStringParameter('Source');
    /*  $("#txtxdatefrom").datepicker({
          changeMonth: true,
          changeYear: true,
          minDate: 0,
          yearRange: "-50:+50",
          onSelect: function (selected) {
              $('#txtdateto').datepicker("option", "minDate", selected)
          }
      });
      $("#txtxdatefrom").datepicker("option", "dateFormat", "dd/mm/yy");
      $("#txtdateto").datepicker({
          changeMonth: true,
          changeYear: true,
          minDate: 0,
          yearRange: "-50:+50",
          onSelect: function (selected) {
              $('#txtxdatefrom').datepicker("option", "maxDate", selected)
          }
      });
      $("#txtdateto").datepicker("option", "dateFormat", "dd/mm/yy");*/
};


var LanguageResults;

function GetActiveLanguage() {
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('LanguageSetting')/items?$select=*&$Filter=Status eq 'Active'";
    $.ajax({
        url: requestUri,
        type: "GET",
        async: false,
        headers: { "ACCEPT": "application/json;odata=verbose" },
        success: function (data) {
            //var counter=0;
            LanguageResults=data.d.results;
            $.each(data.d.results, function (i, data) {
                var language = data['Language'];
                var languageTitle = data['Title'];
                var languageID = data['ID'];
                if (languageTitle != 'DefaultLanguage') {
                    var otherLanguageHTML = "<div class='panel panel-default " + languageTitle + "'>";
                    otherLanguageHTML += "<div class='panel-heading panel-head-4' role='tab' id='headingOne" + i + "'>";
                    otherLanguageHTML += '<h4 class="panel-title">';
                    otherLanguageHTML += "<a class='h4-color' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseOne" + i + "' aria-expanded='false' aria-controls='collapseOne' class='collapsed'>";
                    otherLanguageHTML += '<i class="short-full glyphicon glyphicon-chevron-down"></i>';
                    otherLanguageHTML += "" + language + "";
                    otherLanguageHTML += '</a>';
                    otherLanguageHTML += '</h4></div>';
                    otherLanguageHTML += "<div id='collapseOne" + i + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingOne" + i + "' aria-expanded='false' style='height: 0px;'>";
                    if (preferredLanguageGlobal == languageTitle) {
                        var divlang = '<div class="panel-body flip" >';
                        otherLanguageHTML += divlang;
                    }
                    else {
                        otherLanguageHTML += '<div class="panel-body my_before_flip">';
                    }
                    otherLanguageHTML += '<div class="form-horizontal">';
                    otherLanguageHTML += '<div class="form-group">';
                    otherLanguageHTML += '<label for="" class="col-sm-4 control-label" id="Title_' + languageID + '" data-localize=""></label>'; //language.split(' ')[0]
                    otherLanguageHTML += '<div class="col-sm-8">';
                    otherLanguageHTML += "<input type='text' class='form-control title'>";
                    otherLanguageHTML += '</div></div>';
                    otherLanguageHTML += '<div class="form-group">';
                    otherLanguageHTML += '<label for="" class="col-sm-4 control-label" id="Description_' + languageID + '" data-localize=""></label>';  //language.split(' ')[0]
                    otherLanguageHTML += '<div class="col-sm-8">';
                    otherLanguageHTML += "<textarea class='form-control Description' rows='10'></textarea>";
                    otherLanguageHTML += '</div></div></div></div></div></div>';
                    
                    $(".otherLanguages").append(otherLanguageHTML);
                }
            })
            
            // GetLabels();
            LableLoad();
        },
        error: function (data) {
            console.log(data);
        }
    });
}
// incase this function used LableLoad
/*function GetLabelss() {
    var Handler = this;
    var deferred = $.Deferred();
    //var companyID=titanForWork.getQueryStringParameter('CompanyId');
    var TableName = "Table1";
  //  var URL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('LabelsSettings')/items?$select=*&$filter=((Key eq 'Title') or (Key eq 'Description'))";
    var URL = _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/ExcelRest.aspx/Documents/languagedata.xlsx/OData/" + TableName + "?$inlinecount=allpages&$select=DefaultLanguage,Key,LabelType,Language2nd,Language3rd,Language4th,Language5th,Language6th,Language7th,Language8th,Language9th,Language10th&$filter=((Key eq 'Title') or (Key eq 'Description'))";
    $.ajax({
        url: URL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                $.each(LanguageResults, function (i, data) {
                    language = data['Language'];
                    languageTitle = data['Title'];
                    languageID = data['ID'];
                    // alert(items.length);

                    if (languageID == 3) {
                        $('#Title_' + languageID + '').text(items[0].Language2nd)
                        $('#Description_' + languageID + '').text(items[1].Language2nd)
                    }
                    if (languageID == 4) {
                        $('#Title_' + languageID + '').text(items[0].Language3rd)
                        $('#Description_' + languageID + '').text(items[1].Language3rd)
                    }
                    if (languageID == 5) {

                        $('#Title_' + languageID + '').text(items[0].Language4th)
                        $('#Description_' + languageID + '').text(items[1].Language4th)
                    }
                    if (languageID == 6) {

                       $('#Title_' + languageID + '').text(items[0].Language5th)
                       $('#Description_' + languageID + '').text(items[1].Language5th)
                    }
                    if (languageID == 7) {

                       $('#Title_' + languageID + '').text(items[0].Language6th)
                       $('#Description_' + languageID + '').text(items[1].Language6th)
                    }
                    if (languageID == 8) {

                        $('#Title_' + languageID + '').text(items[0].Language7th)
                        $('#Description_' + languageID + '').text(items[1].Language7th)
                    }
                    if (languageID == 9) {

                        $('#Title_' + languageID + '').text(items[0].Language8th)
                        $('#Description_' + languageID + '').text(items[1].Language8th)
                    }
                    if (languageID == 10) {

                        $('#Title_' + languageID + '').text(items[0].Language9th)
                        $('#Description_' + languageID + '').text(items[1].Language9th)
                    }
                    if (languageID == 11) {

                        $('#Title_' + languageID + '').text(items[0].Language10th)
                        $('#Description_' + languageID + '').text(items[1].Language10th)
                    }

                })
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
    return deferred;
}
*/



function BindEmployeesDropDown() {     //Load Dropdown with List data 
    var companyID = titanForWork.getQueryStringParameter('CompanyId');
    var restQuery = "";
    $('#ddlemployee').empty().append('<option value="0">-Select Employee-</option>');
    restQuery = "FullName,Designation,Email,AttachmentFiles,Company/CompanyName,Department/DepartmentName,ID&$Expand=Company/CompanyName,Department/DepartmentName,AttachmentFiles&$top=5000&$filter=CompanyId eq '" + companyID + "' and Status eq 'Active' &$orderby=FullName asc";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                var fullName = items[i].FullName;
                if (fullName == null || fullName == "") {
                    fullName = "";
                }
                var company = items[i].Company.CompanyName;
                var itemidd = items[i].ID;
                $("#ddlemployee").append($("<option></option>").attr("value", itemidd).text(fullName)); //add options to a select from as a JS object with jQuery
            }
        }, eror: function (data) {
            console.log('error');
        }
    });
}
function GetMultiSelectLookUpValueForRest(itemArray) {   //Data fetch through dropdown from Lookup Field.
    var LookUpArray = [];
    for (var i = 0; i < itemArray.length; i++) {
        LookUpArray.push(itemArray[i].Title);
    }
    return LookUpArray.join(",");
}
function GetMultiSelectLookUpValueForCity(itemArray2) {
    var LookUpArray2 = [];
    for (var i = 0; i < itemArray2.length; i++) {
        LookUpArray2.push(itemArray2[i].City);
    }
    return LookUpArray2.join(",");
}
function GetCompanyEmployees(paraMeterID) {

    var restQuery = "";
    restQuery = "FullName,Designation,Email,Company/ID,Company/CompanyName,AttachmentFiles,City,Department/ID,Department/DepartmentName,ID,LogonName/EMail&$expand=Company/CompanyName,Department/DepartmentName,AttachmentFiles,LogonName&$filter=ID eq '" + paraMeterID + "'";
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {

            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                var fullName = items[i].FullName;
                if (fullName == null || fullName == "") {
                    fullName = "";
                }

                var designation = items[i].Designation;
                if (designation == null || designation == "") {
                    designation = "";
                }
                $('#txtDesignation').val(designation);

                email = items[i].Email;
                if (email == null || email == "") {
                    email = "";
                }


                var employeePicURL = "";
                if (items[i].AttachmentFiles.results.length > 0) {
                    employeePicURL = items[i].AttachmentFiles.results[0].ServerRelativeUrl;
                }
                else {
                    employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[i].LogonName.EMail)//"https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                }

                $('#profile-image1').prop('src', employeePicURL);


                //var new_ddlCodeArray = data.d.results[i].CompanyName.results;  
                //var com = GetMultiSelectLookUpValueForRest(new_ddlCodeArray);
                var com = items[i].Company.CompanyName;
                var company = com;
                if (company == null || company == "") {
                    company = "";
                }
                $('#txtCompany').val(company);

                // var new_ddlCodeArray2 = data.d.results[i].CompanyName.results;
                // var com2 = GetMultiSelectLookUpValueForCity(new_ddlCodeArray2);
                var com2 = items[i].City;
                var city = com2;

                if (city == null || city == "") {
                    city = "";
                }
                $('#txtLocation').val(city);

                // var new_ddlCodeArray3 = data.d.results[i].DepartmentName.Title;
                // var department = new_ddlCodeArray3;
                var department = items[i].Department.DepartmentName;

                if (department == null || department == "") {
                    department = "";
                }
                $('#txtDepartment').val(department);
            }
        }, eror: function (data) {
            console.log('error');
        }
    });
}
function InsertOperation() 
{
    var Handler = this;
    if (Validations() == true)
    {
        $('#btnsubmit').attr('disabled','disabled');
        var dfd = $.Deferred();
        var companyID = titanForWork.getQueryStringParameter('CompanyId');
        var requestURL = '';
        var headersData = '';
        var ListName = 'Announcements';
        var metadataDescription = ManageBiographyMetadata();
        if (Handler.Mode == 'Add')		// For Insert Operation
        {
            requestURL =  _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('" + ListName + "')/items";
            headersData = {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose"
            };
        }
        else if (Handler.Mode == 'Update')		// For Update Operation
        {
            var CompanyId = titanForWork.getQueryStringParameter('CompanyId');
            requestURL = _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('" + ListName + "')/items(" + Handler.itemId + ")";
            headersData = {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": '*'
            };
        }
        $.ajax({
            url: requestURL,
            type: "POST",
            async: false,
            headers: headersData,
            data: JSON.stringify(metadataDescription),
            success: function (data)
            {
                if (Handler.Mode == 'Add' && Handler.SourcePage == "Home")
                {
                    var CompanyId = titanForWork.getQueryStringParameter('CompanyId')                    
                    window.location.href = "../Pages/ExperienceView.aspx?WebAppId=" + Handler.itemId;
                }
                else if (Handler.Mode == 'Add' && Handler.SourcePage != "Home")
                {
                    var companyID = titanForWork.getQueryStringParameter('CompanyId');
                    var itemID=data.d.Id;
                    uploadattachment(itemID);
                    titanForWork.CreateWorkflowTaskForApproval(itemID, titanForWork.getQueryStringParameter('CompanyId'), 0, "General", $("#txtTitle").val(), $('.richText-editor').text(), $("#CategoryType option:selected").text()).done(function (response) {
                        console.log("Response from titanForWork.CreateWorkflowTaskForApproval : " + response);
                        if (response == "ApprovalNotRequired")			// Approval Not Required.
                        {
                            var itemIDN = data.d.Id;
                            AutoApprovedGeneral(itemIDN);
                            var DescDtl = "General " + $("#txtBio").val() + " has been posted.";
                            var listName="NotificationCenter";
                            var WebName ="General";
                            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':$("#txtTitle").val(), 'Details':DescDtl,'WebpartName':WebName ,'CompanyIdId':companyID };
                            Universalinsert(listName,item,)	;	
                        }
                    })
                    AttachUplod(data.d.Id);
                }
                else if (Handler.Mode == 'Update')		// For Update Operation
                {
                    var CompanyId = titanForWork.getQueryStringParameter('CompanyId');
                    uploadattachment(Handler.itemId);
                    titanForWork.GetItemIDOfApprovalTaskList(Handler.itemId, titanForWork.getQueryStringParameter('CompanyId'), 'General').done(function (requestItemID) {
                        titanForWork.DeleteTaskItem(requestItemID);				// Delete Approval Task Item As Well.
                    })
                	
                    titanForWork.CreateWorkflowTaskForApproval(Handler.itemId, titanForWork.getQueryStringParameter('CompanyId'), 0, "General", $("#txtTitle").val(), $('.richText-editor').text(), $("#CategoryType option:selected").text()).done(function (response) {
                        console.log("Response from titanForWork.CreateWorkflowTaskForApproval : " + response);
                        if (response == "ApprovalNotRequired")			// Approval Not Required.
                        {
                            var itemIDN = Handler.itemId;
                            AutoApprovedGeneral(itemIDN);                        
                            var DescDtl = "General " + $("#txtBio").val() + " has been modified.";
                            var listName="NotificationCenter";
                            var WebName ="General";
                            var item={'__metadata': { type: 'SP.Data.'+listName+'ListItem'},'Title':$("#txtTitle").val(), 'Details':DescDtl,'WebpartName':WebName ,'CompanyIdId':companyID };
                            Universalinsert(listName,item,)	;
                        }
                    });
                    AttachUplod(Handler.itemId);
                }
                dfd.resolve(data);
            },
            error: function (xhr,data,error)
            {
                $("#btnsubmit").removeAttr("disabled");
                var err = JSON.parse(xhr.responseText);			
                var errorType = xhr.status;			
                var errorMessage = err.error.message.value;
                alert(errorMessage);
                //  dfd.reject(error);
            }
        });
        return dfd.promise();
    }

}
var EmpName='';
function ManageBiographyMetadata() {
    var Handler = this;

    // var checkBoxValue = "true";

    var EmpIDValue = $("#ddlemployee").val();
   
    if($("#UserTypeVal").val() == "Internal Users")
    {
		ensureUser($('#InternalUsers').children().children().attr('id'));
		EmpName = InternalUserName;
    }
    else
    {
        EmpName = $("#ExternalUserVal").val();    
    }
    var DesignationValue = $("#txtDesignation").val();
    if(DesignationValue.trim().length==0)
    {
        DesignationValue="";
    }
    var CompanyValue = $("#txtCompany").val();
    var DepartmentValue = $("#txtDepartment").val();
    var LocationValue = $("#txtLocation").val();
    if(LocationValue.trim().length==0)
    {
        LocationValue="";
    }
    var FromDateValue = $("#txtxdatefrom").val();
    var ToDateValue = $("#txtdateto").val();

    if ($('#TxtCheckBox').not(':checked').length)
    {
        checkBoxValue = "false";
    }
    //var BiographyValue = $("#txtBio").val();
    var BiographyValue = $('.richText-editor').html();
    if(BiographyValue.trim().length==0)
    {
        return false;    
    }
    var month = FromDateValue.split('/')[1];//format(FromDateValue.getMonth() + 1);
    var day = FromDateValue.split('/')[0];//format(FromDateValue.getDate());
    var year = FromDateValue.split('/')[2]; //format(FromDateValue.getFullYear());
    var addfromdate = new Date(month + "/" + day + "/" + year);
    //alert(addfromdate);

    var month = ToDateValue.split('/')[1];//format(FromDateValue.getMonth() + 1);
    var day = ToDateValue.split('/')[0]//format(FromDateValue.getDate());
    var year = ToDateValue.split('/')[2] //format(FromDateValue.getFullYear());
    var addTodate = new Date(month + "/" + day + "/" + year);

    if (BiographyValue.trim() == "") {
        alert("Mandatory Fields can't be empty.");
        return false;
    }
    
   
    
    

    if (Handler.Mode == "Add") 
    {
        if (CheckExistingBioGrahy(EmpIDValue) == false) {
            alert("This employee's Biography already exist.");
            return false;
        }
    }
    
    var ListName = 'Announcements';
    var itemType = GetItemTypeForListName(ListName);
    var Metadata;
    Metadata = { "__metadata": { 'type': itemType } };	
    Metadata["EmployeeID"] = EmpIDValue;
    Metadata["EmployeeName"] = EmpName;
    Metadata["Designation"] = DesignationValue;
    Metadata["Department"] = DepartmentValue;
    Metadata["OfficeLocation"] = LocationValue;
    Metadata["Publish_Date"] = addfromdate;
    Metadata["Expires"] = addTodate;
    Metadata["Description"] = BiographyValue;
    Metadata["Email"] = email;
    Metadata["categoryId"] = $("#CategoryType").val();
    Metadata["Announcement_Type"] = $("#CategoryType option:selected").text();
    Metadata["Title"]=$("#txtTitle").val();
    Metadata["WebPartName"]="General";
    Metadata["UserType"] = $("#UserTypeVal").val();
    Metadata["Audience"] = $("#Audience").val();
    Metadata["ApprovalStatus"] = "Pending";
    
    if($("#UserTypeVal").val() == "Internal Users")
    {
    	Metadata["TeamMembersId"]={"results": SelectedUserID};
    }
    
    
    if($("#Audience").val()=="Company")
    {
        readcheckboxValue();
        var CompanyValues =[];
        CompanyValues = selectedid;
        Metadata["CompanyId"]={"results": CompanyValues };
        var FlagValues =[0];
        Metadata["DepartmentsId"]={"results": FlagValues};    
    }
    else if ($("#Audience").val()=="Department")
    {
        readcheckboxValue();
        var DepartmentValue ={};
        DepartmentValue = selectedid;

        Metadata["DepartmentsId"]={"results": DepartmentValue };
        Metadata["CompanyId"]={"results": [parseInt(titanForWork.getQueryStringParameter('CompanyId'))]}
    }
    else if ($("#Audience").val()=="Corporate")
    {
        var FlagValues =[0];
        Metadata["DepartmentsId"]={"results": FlagValues};
        Metadata["CompanyId"]={"results": FlagValues}
    }
 
    Metadata["WebLinks"] = 	{
        '__metadata': { 'type': 'SP.FieldUrlValue' },
        'Description': $("#txtLink").val(),
        'Url': $("#txtLink").val()
    }

    $(".otherLanguages .panel-default").each(function ()
    {
        var langaugeName = $(this).attr('class').split(' ')[2];
        var BiographyKey = langaugeName + "_Description";
        Metadata[BiographyKey] = $(this).find('.Biography').val();

    });
    return Metadata;
}
function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

function ResetControls() {

    $("#ddlemployee").val("0");
    $("#txtDesignation").val('');
    $("#txtCompany").val('');
    $("#txtDepartment").val('');
    $("#txtLocation").val('');
    $("#txtxdatefrom").val('');
    $("#txtdateto").val('');
    $("#txtBio").val('');

    $(".otherLanguages .panel-default").each(function () {
        var langaugeName = $(this).attr('class').split(' ')[2];

        $(this).find('.Biography').val('');

    });
}

function Validations() {
    var Handler = this;
    var InternalEmployee = ensureUser($('#InternalUsers').children().children().attr('id'));
    if(InternalEmployee != 0)
  		{
  			GetEmployeeDTL(InternalEmployee);
  		}

    if (InternalEmployee  == "0" && $('#ExternalUserVal').val() == "" ) {
        alert("Please Enter Employee Name.");
        return false;

    }
    else if ($("#txtxdatefrom").val().trim() == '') {
        alert("Please enter display from.");
        $("#txtxdatefrom").focus();
        return false;
    }
    else if ($("#txtdateto").val().trim() == '') {
        alert("Please enter display to.");
        $("#txtdateto").focus();
        return false;
    }
    else if ($("#txtTitle").val().trim() == '') {
        alert("Please enter title.");
        $("#txtTitle").focus();
        return false;
    }
    else if ($('.richText-editor').text().trim() == '') {
        alert("Please enter description.");
        $("..richText-editor").focus();
        return false;
    }
    else if (selected_data.length<1 && selectedid.length<1) {
        alert("Please select "+$("#Audience").val());
        $("#DpdownData").focus();
        return false;
    }
    else if($("#txtDesignation").val().trim() == '')
    {
    		alert("Please enter Designation.");
        	$("#txtDesignation").focus();
        	return false;

    }
   

    
    /*
     var FromDateValue = $("#txtxdatefrom").val();
    var ToDateValue = $("#txtdateto").val();

   
    var month = FromDateValue.split('/')[1];//format(FromDateValue.getMonth() + 1);
    var day = FromDateValue.split('/')[0];//format(FromDateValue.getDate());
    var year = FromDateValue.split('/')[2]; //format(FromDateValue.getFullYear());
    var addfromdate = new Date(month + "/" + day + "/" + year);
  

    var month = ToDateValue.split('/')[1];//format(FromDateValue.getMonth() + 1);
    var day = ToDateValue.split('/')[0]//format(FromDateValue.getDate());
    var year = ToDateValue.split('/')[2] //format(FromDateValue.getFullYear());
    var addTodate = new Date(month + "/" + day + "/" + year);

    
     if (addfromdate.toDateString()  == addTodate.toDateString() ) 
     {
        alert("Display From date and Display To date can't be same.");
        $("#txtdateto").focus();
        return false;
      }*/

    
    
    
    

    return true;
};
function GetEmployeeImg(EmpID,emptype) {
    var listname,id;
    var restQuery = "";
    if(emptype == "Internal Users")
    {
        listname = "Employees";
        id = EmpID;
        restQuery = "*,Designation,Email,Company/ID,AttachmentFiles,Company/Title,Department/ID,Department/Title,ID&$expand=Company,Department,AttachmentFiles&$filter=Email eq '" + id + "'";
    }
    else
    {
        listname = "Announcements";
        id = EmpID;
        restQuery = "*,AttachmentFiles,Email&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
    }
   
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items?$select=" + restQuery;

    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                var employeePicURL = "";
                if (items[i].AttachmentFiles.results.length > 0) {
                    employeePicURL = items[i].AttachmentFiles.results[0].ServerRelativeUrl;
                }
                else {
                    if(emptype == "Internal Users")
                    {
                        employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[i].LogonName.EMail)//"https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";					
                    }
                    else
                    {
                        //employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[i].Email)//"https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                        employeePicURL = "https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                    }
                }
                $('#profile-image1').prop('src', employeePicURL);

            }
        }, error: function (data) {
            console.log('error');
        }
    });
}

//DataBind to GridView Action Button.
function BindBioGraphyData()
{
    var itemid = titanForWork.getQueryStringParameter("itemId");
    var restQuery = "";
    //restQuery = "*,ID,Title,EmployeeID,EmployeeName,UserType,Audience,category/CatogeryName,category/ID,WebLinks,Designation,Email,Department,OfficeLocation,Publish_Date,Expires,Description,Language1st_Biography,Language2nd_Biography,Language3rd_Biography,Language4th_Biography,Language5th_Biography,Language6th_Biography,Language7th_Biography,Language8th_Biography,Language9th_Biography,Language10th_Biography&$expand=category/CatogeryName, category/ID&$filter=ID eq '" + itemid + "'";
    restQuery = "*,ID,Title,EmployeeID,EmployeeName,UserType,Audience,TeamMembers/EMail,category/CatogeryName,category/ID,WebLinks,Designation,Email,Department,OfficeLocation,Publish_Date,Expires,Description&$expand=TeamMembers/ID,category/CatogeryName, category/ID&$filter=ID eq '" + itemid + "'";
    var Ownurl =_spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('Announcements')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                var employeeItemId = items[i].EmployeeID;                      
                
                if(items[i].UserType == "External Users")
                {	
                    $("#InternalUsersDiv").css("display", "none");
                    $("#ExternalUsersDiv").css("display", "block");
                    $("#UserTypeVal").val(items[i].UserType);
                    $("#ExternalUserVal").val(items[i].EmployeeName);                	
                    $("#txtDepartment").removeAttr('disabled');
                    $("#txtDesignation").removeAttr('disabled');
                    $("#txtLocation").removeAttr('disabled');
                }
                else if (items[i].UserType == "Internal Users")
                {
                    $("#InternalUsersDiv").css("display", "block");
                    $("#ExternalUsersDiv").css("display", "none");
                    $("#UserTypeVal").val(items[i].UserType);
                    
                    //initializePeoplePicker("InternalUsers");
					var divPeople = SPClientPeoplePicker.SPClientPeoplePickerDict.InternalUsers_TopSpan;
					var userObj = { 'Key': items[i].TeamMembers.results[0].EMail };
					divPeople.AddUnresolvedUser(userObj, true);					
								
                   
                    //$("#ddlemployee").val(items[i].EmployeeID);
                    //$("#select2-ddlemployee-container").text(items[i].EmployeeName);               	
                    $("#txtDepartment").prop('disabled', true);
                    $("#txtDesignation").prop('disabled', true);
                    $("#txtLocation").prop('disabled', true);                
                }                
                
                $("#Audience").val(items[i].Audience);
                if(items[i].Audience == "Company")
                {
                    $("#DepartmentListBox").css({display: "block"});
                    ReadDepartment_Company(Text="Company")					
                    var GetCompanyIDs = items[0].CompanyId.results;
                    var x=0;
                    for(x; x<GetCompanyIDs.length; x++)
                    {
                        var selectedval=GetCompanyIDs[x];
                        $(":checkbox[value='"+selectedval+"']").prop("checked","true");
                    }
                    readcheckboxValue(); //Read and Set Checked item text at a time of edit
                }
                else if(items[i].Audience == "Department")
                {
                    $("#DepartmentListBox").css({display: "block"});
                    ReadDepartment_Company(Text="Department");
                    var GetDepartmentsIDs = items[i].DepartmentsId.results;
                    var x=0;
                    for(x; x<GetDepartmentsIDs.length; x++)
                    {
                        var selectedval=GetDepartmentsIDs[x];
                        $(":checkbox[value='"+selectedval+"']").prop("checked","true");
                    }
                    readcheckboxValue(); //Read and Set Checked item text at a time of edit
                }
				
                $("#CategoryType").val(items[i].category.ID);
                var designation = items[i].Designation;
                var Title = items[i].Title;
                if(items[i].WebLinks!=null) { var txtLink = items[i].WebLinks.Description; }
                
                var catogery = items[i].category.ID;
                var company = items[i].Company;
                var department = items[i].Department;
                var Location = items[i].OfficeLocation;
                email = items[i].Email;
                var Bio = items[i].Description;
                
                var Lang1 = items[i].Language1st_Description;
                var Lang2 = items[i].Language2nd_Description;
                var Lang3 = items[i].Language3rd_Description;
                var Lang4 = items[i].Language4th_Description;
                var Lang5 = items[i].Language5th_Description;
                var Lang6 = items[i].Language6th_Description;
                var Lang7 = items[i].Language7th_Description;
                var Lang8 = items[i].Language8th_Description;
                var Lang9 = items[i].Language9th_Description;
                var Lang10 = items[i].Language10th_Description;

                var displayfrom = new Date(items[i].Publish_Date);
                month = '' + (displayfrom.getMonth() + 1),
		        day = '' + displayfrom.getDate(),
		        year = displayfrom.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                var Fromdate = [day, month, year].join('/');

                var displaytill = new Date(items[i].Expires);
                month = '' + (displaytill.getMonth() + 1),
		        day = '' + displaytill.getDate(),
		        year = displaytill.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                var Tilldate = [day, month, year].join('/');

                if(items[i].UserType == "Internal Users")
                {
                    GetEmployeeImg(items[i].TeamMembers.results[0].EMail,Emptype=items[i].UserType);
                }
                else
                {
                    GetEmployeeImg(items[i].ID,Emptype=items[i].UserType);
                }
                
                $("#txtDesignation").val(designation);
                $("#txtCompany").val(company);
                $("#txtDepartment").val(department);
                $("#txtLocation").val(Location);
                $("#txtxdatefrom").val(Fromdate);
                $("#txtdateto").val(Tilldate);
                $("#txtTitle").val(Title);
                $("#txtLink").val(txtLink);
                $("#txtBio").val(Bio);
                //$('.richText-editor').html(Bio);
                $(".otherLanguages .panel-default").each(function ()
                {
                    var langaugeName = $(this).attr('class').split(' ')[2];
                    if (langaugeName == "Language2nd")
                    {
                        $(this).find('.Biography').val(Lang2);
                    }
                    else if (langaugeName == "Language3rd")
                    {
                        $(this).find('.Biography').val(Lang3);
                    }
                    else if (langaugeName == "Language4th") {
                        $(this).find('.Biography').val(Lang4);
                    }
                    else if (langaugeName == "Language5th") {
                        $(this).find('.Biography').val(Lang5);
                    }
                    else if (langaugeName == "Language6th") {
                        $(this).find('.Biography').val(Lang6);
                    }
                    else if (langaugeName == "Language7th") {
                        $(this).find('.Biography').val(Lang7);
                    }
                    else if (langaugeName == "Language8th") {
                        $(this).find('.Biography').val(Lang8);
                    }
                    else if (langaugeName == "Language9th") {
                        $(this).find('.Biography').val(Lang9);
                    }
                    else if (langaugeName == "Language10th") {
                        $(this).find('.Biography').val(Lang10);
                    }
                });
            }
            GetDocuments(itemid);
        }, 
        eror: function (data) {
            console.log('error');
        }
    });
}

function GetDocuments(filename)
{
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'"+filename+"')";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) 
        {
            console.log(data);
            var res = data.d.results;
            if(res.length>0)
            {
                var x=0;
                for(x; x<res.length; x++)
                {
                    if(res[x].Title == "Image")
                    {	var imgname= res[x].Name;
                    $('#OldImagename').append('<div id="_file_'+ x +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + x + '</strong></span><a href="'+document.location.origin+res[x].ServerRelativeUrl+'" target="_blank"><span class="play"></span><span class="">' + res[x].Name + '</span></a> &nbsp;&nbsp;<span class="fa fa-trash-o fa-lg closeBtn DeletePic" style="color:red;"  onclick="DeleteSelectedFile(this.id);" value=\'' + imgname+ '\'" id="file_'+ x +'"" title="Delete"></span></div>');
                    }
                    else if (res[x].Title == "Document")
                    {	
                        var Docname= res[x].Name;		
                        $('#oldfilename').append('<div id="_file_'+ x +'"><span class="fa-stack fa-lg" style="line-height: 1em; height: 1em;"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + x + '</strong></span><a href="'+document.location.origin+res[x].ServerRelativeUrl+'" target="_blank"><span class="play"></span><span class="">' + res[x].Name + '</span></a> &nbsp;&nbsp;<span class="fa fa-trash-o fa-lg closeBtn DeletePic" style="color:red;"  onclick="DeleteSelectedFile(this.id);" value=\'' + Docname + '\'" id="file_'+ x +'"" title="Delete"></span></div>');
                    }
                }
                if($.urlParam('Mode') == "View?MODAL"){
                    $(".DeletePic").remove();
				}
            }    	    
        },
        error: function ajaxError(response) 
        {
            alert(response.status + ' ' + response.statusText);
        }
    });	
}



function DeleteSelectedFile(id) 
{
    if (confirm('Are you sure to delete this document?')) 
    {	//alert();
        var WebServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl;
        var DocuentLibraryInternalName = "GeneralPicturesGallery";
        //var DocumentName = filename;
        var DocumentName =$("#"+id).attr('value');
        var ServerRelativeUrlofFile = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFileByServerRelativeUrl('" + WebServerRelativeUrl + "/" + DocuentLibraryInternalName + "/" + DocumentName + "')"
        $.ajax
        ({
            url: ServerRelativeUrlofFile,
            type: "POST",
            headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
            success: function (data, status, xhr) {
                console.log("Success");
                $("#_"+id).hide();           
            },
            error: function (xhr, status, error) {
                console.log("Failed");
            }
        });
    } 
    else 
    {
        console.log('Command Terminated.');
    }
}




function CheckExistingBioGrahy(employeeID)
{
    var val_flag = true;
    // var startdateaes = new Date(startdatea);
    // var tStart = startdateaes.toISOString();
    //  var endatestv = new Date(endates);
    //  var vEnd = endatestv.toISOString();//EndDate
    //var filterData = "&$filter=DisplayTo ge datetime'" + tStart + "' and Email eq '" + roomss + "'";//
    var filterData = "&$filter=EmployeeID eq '" + employeeID + "'";
    var listName = "Announcements";
    // var companySiteUrl=  titanForWork.getQueryStringParameter("CompanySiteUrl");
    var companySiteUrl=  _spPageContextInfo.webAbsoluteUrl;
    var siteURL = companySiteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$select=ID,Email,DisplayFrom,DisplayTo" + filterData;
    //console.log(siteURL);
    $.ajax({
        url: siteURL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data)
        {
            var items = data.d.results;
            if (items.length > 0)
            {
                val_flag = false;
            }
        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
    return val_flag;
    
}


function GetCategory()
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$filter=CategoryType eq 'General' and Status eq 'Yes'  ";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
            var items = data.d.results;  
            if (items.length > 0) 
            {  
                $('#CategoryType').empty();
                for (i = 0; i < items.length; i++) 
                {
                    $('#CategoryType').append($("<option     />").val(items[i].ID).text(items[i].CatogeryName));
                }
            }    
        },
        eror: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });  
}



function SetVisibility(text)
{
    if(text == 'External Users')
    {
        $('#profile-image1').attr("src","https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg");
        $("#InternalUsersDiv").css("display", "none");
        $("#ExternalUsersDiv").css("display", "block");
        $("#imguploadDIV").css("display", "block");
        $("#txtDepartment").val('');
        $("#txtDesignation").val('');
        $("#txtLocation").val('');
        $("#txtDepartment").removeAttr('disabled');
        $("#txtDesignation").removeAttr('disabled');
        $("#txtLocation").removeAttr('disabled');
        initializePeoplePicker("InternalUsers");

    }
    else
    {
        $('#profile-image1').attr("src","https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg");
        $("#ExternalUsersDiv").css("display", "none");
        $("#imguploadDIV").css("display", "none");
        $("#InternalUsersDiv").css("display", "block");
        $("#txtDepartment").val('');
        $("#txtDesignation").val('');
        $("#txtLocation").val('');
        $("#txtDepartment").prop('disabled', true);
        $("#txtDesignation").prop('disabled', true);
        $("#txtLocation").prop('disabled', true);
        initializePeoplePicker("InternalUsers");

    }

}

function AttachUplod(ID)
{
    var successFileUp = uploadFile(ID,Doctype='Image',Element='FileUpload'); // Here I'm passing ID(I'm using this ID with FileName). If you don't have anything then just pass ("")
    successFileUp.done(function(){
        var successFileUp = uploadFile(ID,Doctype='Document',Element='UploadDoc');
        successFileUp.done(function(){
            alert("Data has been saved successfully.");
            window.location.href = "../Pages/ExperienceView.aspx?WebAppId=1";
        });
    });
}

function uploadFile(ID,Doctype,Element) 
{
    if(Element !="FileUpload")
    { 
        FinalFiles4Upload=null;
        FinalFiles4Upload=FinalFiles4Upload2;
    }
    var deferred = $.Deferred();
    var serverRelativeUrlToFolder = _spPageContextInfo.webServerRelativeUrl+"/GeneralPicturesGallery";    // Define the folder path.
    var serverUrl = _spPageContextInfo.webAbsoluteUrl;    // Get the server URL.
 	
    (function Tasks(i,callback)
    {
        if(i<FinalFiles4Upload.length)
        {
            var success = ProcessFiles(i);
            success.done(function(){Tasks((i+1),callback);});
        }
        else
        {
            callback();
        }
    })(0,function(){deferred.resolve();});
 
    //Below function call all the functions (GetFileBuffer,UploadFile,GettheLibraryItem,UpdatingTheItemColumns)
    function ProcessFiles(ind)
    {
        var deferred = $.Deferred();
        var getFile = getFileBuffer(ind);
        getFile.done(function (arrayBuffer) {
            var addFile = addFileToFolder(arrayBuffer,ind);
            addFile.done(function (file, status, xhr) {
                var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
                getItem.done(function (listItem, status, xhr) {     
                    var changeItem = updateListItem(listItem.d.__metadata,ind); // Change the display name and title of the list item.
                    changeItem.done(function (data, status, xhr) {      
                        deferred.resolve();
                    });
                    changeItem.fail(onError);
                });
                getItem.fail(onError);
            });
            addFile.fail(onError);
        });
        getFile.fail(onError);
        return deferred.promise();
    }
 
 
    // Below code Get the local file as an array buffer.
    function getFileBuffer(ind) 
    {
        var deferred = jQuery.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) { deferred.resolve(e.target.result); }
        reader.onerror = function (e) { deferred.reject(e.target.error); }
        reader.readAsArrayBuffer(FinalFiles4Upload[ind]);
        return deferred.promise();
    }
 

    // Below code Add the file to the file collection in the Shared Documents folder.
    function addFileToFolder(arrayBuffer,ind) 
    {  
        var fileName = FinalFiles4Upload[ind].name; 
        var fileCollectionEndpoint = String.format("{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" + "/add(url='{2}',overwrite=true)", serverUrl, serverRelativeUrlToFolder, fileName);
        return jQuery.ajax({
            url: fileCollectionEndpoint,
            type: "POST",
            async: true,
            data: arrayBuffer,
            processData: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-type": "application/json;odata=verbose"
            }
        });
    }
 
    // Below code Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
    function getListItem(fileListItemUri) {
        return jQuery.ajax({
            url: fileListItemUri,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" }
        });
    }
 

    // Set Meta data in column
    function updateListItem(itemMetadata,ind)
    {
        var newName =  ID.toString()+'-'+FinalFiles4Upload[ind].name;
        var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}','DataID':'{3}','DocType':'{4}'}}",itemMetadata.type, newName, Doctype, ID,Doctype);
        return jQuery.ajax({
            url: itemMetadata.uri,
            type: "POST",
            async: true,
            data: body,
            headers: {
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-type": "application/json;odata=verbose",
                "IF-MATCH": itemMetadata.etag,
                "X-HTTP-Method": "MERGE"
            }
        });
    }
    return deferred.promise();
}

function onError(error) 
{ console.log(error);
    alert(error.responseText);
    location.reload();
}


(function($){
    $.fn.checkFileType = function(options) {
        var defaults = {
            allowedExtensions: [],
            success: function() {},
            error: function() {}
        };
        options = $.extend(defaults, options);
        return this.each(function() {

            $(this).on('change', function() {
                var value = $(this).val(),
                file = value.toLowerCase(),
                extension = file.substring(file.lastIndexOf('.') + 1);
                if ($.inArray(extension, options.allowedExtensions) == -1)
                {
                    options.error();
                    $(this).focus();
                } 
                else { options.success(); }
            });
        });
    };
})(jQuery);

$(function() {
    $('#FileUpload').checkFileType({
        allowedExtensions: ['jpg','jpeg','png','gif'],
        success: function() {
            //alert('Success');
        },
        error: function() {
            alert('Please select image files of JPEG, JPG, GIF and PNG formatted only.');
            $("#FileUpload").val(null);
            $("#filename").html('');
            finalFiles=[];
            FinalFiles4Upload=[];
            Tcounter = 0;
            RemoveDuplicate = [];

        }
    });
});

function ReadDepartment_Company(items)
{
    var Ownurl='';
    var ListName= "";
    if(items=="Company") 
    { 	$("#DepartmentListBox").show();
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Companies')/items?";
        $("#DropLable").text('Company');
        selected_data=[];
    }
    else if(items=="Department") 
    { 	$("#DepartmentListBox").show();
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$filter=CompanyID eq '"+titanForWork.getQueryStringParameter('CompanyId')+"'"; 
        $("#DropLable").text('Department');
        selected_data=[];
    }
    else
    {
        $("#DepartmentListBox").hide();
        selected_data=1;
    }
    $.ajax({  
        url: Ownurl,
        async:false,  
        headers: { Accept: "application/json;odata=verbose" },
        success: function (data) 
        { 
            var items = data.d.results;  
            if (items.length > 0) 
            {
                $("#SelectedItems").text("Select");  
                $('#DpdownData').empty();
                for (i = 0; i < items.length; i++) 
                {
                    $('#DpdownData').append('<li><input type="checkbox" id="Depart/Company" name="Depart/Company" value='+ items[i].ID +'>' + items[i].Title + '</li>')
                }
            }  
        },
        eror: function (data) 
        {  
            alert("An error occurred. Please try again.");  
        }  
    });  
}

var selectedid=[];
function readcheckboxValue()
{
    selectedid=[];
    var favorite = [];	
    $.each($("input[name='Depart/Company']:checked"), function(){
        favorite.push($(this).parent().text());
        selectedid.push($(this).val());
    });
    $("#SelectedItems").text(favorite);
    return selectedid;
}


function SetCalendar()
{
    var d = new Date();
    today = d.getMonth()+1 + ' ' + d.getDate() + ' ' + d.getFullYear();
    $('#txtxdatefrom').datepicker({
        defaultDate: 0,
        minDate: 0,
        maxDate: "+48m",
        dateFormat: 'dd/mm/yy',
    }).datepicker("setDate", new Date()) ;

    $('#txtdateto').datepicker({
        defaultDate: 0,
        minDate: 0,
        dateFormat: 'dd/mm/yy',
    }).datepicker("setDate",'+30d');
    
    $('#txtxdatefrom').change(function () {
        var from = $('#txtxdatefrom').datepicker('getDate');
        var date_diff = Math.ceil((from.getTime() - Date.parse(today)) / 86400000);
        var maxDate_d = date_diff+10+'m';
        date_diff = date_diff + 'd';
        $('#txtdateto').val('').removeAttr('disabled').removeClass('hasDatepicker').datepicker({
            dateFormat: 'dd/mm/yy',
            minDate: date_diff,
            maxDate: maxDate_d
        });
    });
}



function AutoApprovedGeneral(itemIDN)  
{  
    $.ajax  
    ({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Announcements')/items('"+itemIDN+"')",
        type: "POST",
        async: false,  
        data: JSON.stringify  
        ({  
            __metadata:  
            {  
                type: "SP.Data.AnnouncementsListItem"  
            },  
            ApprovalStatus: "Approved"
        }),  
        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "MERGE"  
        },  
        success: function(data, status, xhr){ console.log("Auto Approved Success!"); },  
        error: function(error) { console.log(error); }  
    });
}


 
function Universalinsert(listName,item) 
{	
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        async: false,
        headers: 
		{
		    "Accept": "application/json;odata=verbose",
		    "X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
        success: function (data) { console.log("add success"); },
        error: function (data) { console.log("data"); }
    });
}





var dropZoneId = "drop-zone";
var dropZone = $("#" + dropZoneId);
var inputFile = dropZone.find("input");
var finalImages = [];
var ProfileImage=[];




$(function() {
    $("#profileimageupload").on('change', function(e) {
        ProfileImage=[];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files,function(idx,elm){
            ProfileImage[finalImages .length]=elm;
        });
        console.log(ProfileImage);
    });
})

var GetImageBuffer = function (ProfileImage) 
{
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) 
    {
        deferred.resolve(e.target.result);
    }

    reader.onerror = function (e) 
    {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(ProfileImage);
    return deferred.promise();
};


var xRequestDigest = $("#__REQUESTDIGEST").val();
function uploadattachment(id) 
{
    if(ProfileImage.length>0)
    {
        $.each(ProfileImage, function(index, value){
            GetImageBuffer (value).then(function (buffer) {
                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig,"");		    
                $.ajax({
                    //url: _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('Announcements')/items(" + id + ")/AttachmentFiles/add( FileName='" + value.name + "')",
                    url: _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('Announcements')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers: 
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": xRequestDigest
    				},
                    success: function (data){ console.log("Image Upload"); },
                    error: function (data) 
                    {
                        console.log(data.responseText.error);
                        //alert(data.responseText);
                    }
                });
            });
        });
    }
}


function ValidateLoginUserEntryscreen() 
{
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProcessApprovers')/items?$filter=WebPartName eq 'General' and Company eq '"+titanForWork.getQueryStringParameter("CompanyId")+"'";  
    $.ajax({  
        url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data)
        {	 
            var items = data.d.results;  
            if (items.length > 0) 
            {  
                if(items[0].Scope =="Selective" || items[0].Scope =="SELECTIVE" || items[0].Scope == null)
                {
                    var userlist =items[0].ContributorsId.results;
                    function checkuser(_userID)
                    {
                        return _userID== _spPageContextInfo.userId;
                    }
                    var res = userlist.filter(checkuser);
                    if(res.length>0){}
                    else
                    {
                        alert("Unauthorized access!");
                        window.location.href = "../Pages/Default.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"";
                    }
                }
                else if (items[0].Scope =="Everyone" || items[0].Scope =="EVERYONE" )
                {
                    //break;
                }
                else
                {
                    alert("Unauthorized access!");
                    window.location.href = "../Pages/Default.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"";
                }  			
            }
            else
            {
                alert("Unauthorized access!");
                window.location.href = "../Pages/Default.aspx?WebAppId="+titanForWork.getQueryStringParameter("CompanyId")+"";
            }  
        },
        error: function (data) 
        {  
            console.log(data);
        }  
    });  
}


function initializePeoplePicker(peoplePickerElementId) 
{
	var schema = {};
	schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
	schema['SearchPrincipalSource'] = 15;
	schema['ResolvePrincipalSource'] =15;
	schema['AllowMultipleValues'] = false;
	schema['MaximumEntitySuggestions'] =50;
	schema['Width'] = '280px';
	this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId,
	null, schema);
}

var InternalUserName='';
var SelectedUserID=[];
function ensureUser(ID) 
{
	SelectedUserID=[];
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
        		InternalUserName = data.d.Title;  
         		UserId = data.d.Email;
         		SelectedUserID.push(data.d.Id);          
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


function GetEmployeeDTL(EmpID) {
    var listname,id;
    var restQuery = "";
        listname = "Employees";
        id = EmpID;
        restQuery = "*,Designation,OfficeLocation/Title,Company/ID,AttachmentFiles,Company/Title,Department/ID,Department/Title,ID,LogonName/Title&$expand=Company,Department,AttachmentFiles,OfficeLocation/Title,LogonName/Title&$filter=Email eq '"+EmpID+"'";
    
      
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ listname +"')/items?$select=" + restQuery;

    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) 
        {
            var items = data.d.results;
            
            $("#EmpTitle").text(items[0].LogonName.Title);
            $("#EmailID").text(items[0].Email);
			$("#DepartmentName").text(items[0].Department.Title);
			$("#EmpDesigation").text(items[0].Designation);
			
			$("#txtDepartment").val(items[0].Department.Title);
			$("#txtDesignation").val(items[0].Designation);
			$("#txtLocation").val(items[0].OfficeLocation.Title);

			
			var	EmpProfileImage='';
			if (items[0].AttachmentFiles.results.length > 0) 
			{
            	EmpProfileImage = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
            }
            else
            {
            	EmpProfileImage = "https://github.com/Titan4workGit/TitanRepo/tree/main/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
            }
			$('#EmpProfileImage').prop('src', EmpProfileImage);//profile-image1
			$('#profile-image1').prop('src', EmpProfileImage);//profile-image1
			
			
           // $('#EmpDetails').modal('show');
            
        }, error: function (data) {
            console.log(data);
        }
    });
}








