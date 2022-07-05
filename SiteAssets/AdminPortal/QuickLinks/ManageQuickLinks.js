// JavaScript source code
//TASK IS TO LOAD DASHBOARD AS PER RIGHT ASSIGNMENT FOR THE USERS


var siteURLApplicationLink = "";
var sorterSharedWithMe;
var ViewApplicationLink = function () {
    this.Mode;					// Add, Update, View
    this.SiteURL;
    this.CompanyId;
    this.DepartmentId;
    this.DataId = "";
    this.VisibleAt = $('#ddlVisibleAt');
    this.Title = $("#txtTitle");
    this.IconImage = $("#file1");
    this.HyperLink = $("#txtLink");
    this.txtImageUrl = $("#txtImageUrl");
    this.ChooseImage = $("#slctimage");
    this.Active = $("#checkbox");
    this.Audience=$('Audience');
    this.password=$('txtPassword');
    this.ProtectedCheckBox=$('ProtectedCheckBox');
    
    this.check = $("#check");
    this.Picture = $("#blah");
    this.Submit = $("#createApplicationLink");
    this.AllApplicationLink = $(".mainDivAllApplicationLink");	 //$("#mainDivAllApplicationLink");
    this.AddApplicationLink = $("#addApplicationLink");
    this.CloseApplicationLink = $("#closeApplicationLink");
    this.NoRecordFound = $(".NoRecordFound");
};

ViewApplicationLink.prototype.InitializeControls = function InitializeControls() {
    var Handler = this;
    Handler.CompanyId = titanForWork.getQueryStringParameter('CompanyId');	// Get Company ID from QueryString	
}

ViewApplicationLink.prototype.BindEvents = function BindEvents() {

    var Handler = this;
    Handler.AddApplicationLink.click(function () {



        Handler.DataId = "";
        Handler.VisibleAt.val("Select Visible At");
        Handler.Title.val("");
        Handler.IconImage.val("");
        Handler.txtImageUrl.val("");
        Handler.ChooseImage.val("--Choose Option--");
        Handler.Picture.attr("src", "");
        Handler.HyperLink.val("");
        Handler.Active.prop('checked', true);
        $("#imageSliderDiv").hide();
        $("#AudienceDiv").hide();
        $('#SelectiveDiv').hide();
        $("#passwordDiv").hide();
        
        $("#ProtectedDiv").hide();
        $('#ProtectedCheckBox').prop('checked', false);
        $('#txtPassword').val('')
        $("#DepartmentListBox").hide();
        $("#fileUpload1").hide();
        $("#check").hide();



        $("#createApplicationLink").text("Submit");
        $("#modalApprovalApplicationLink").modal('show');	//	window.location.href="../Pages/ApplicationLink.aspx?WebAppId="+Handler.CompanyId+"&Mode=Add";
    });

    Handler.CloseApplicationLink.click(function () {
        window.location.href = "../Pages/AdminPortal.aspx?WebAppId=" + Handler.CompanyId;
    });

    Handler.Submit.click(function () {

        if (Handler.DataId == 0) {
            objViewApplicationLink.AddItem();
            objViewApplicationLink.GetAllApplicationLink();
            //bindGroupName()
        }
        else {
            objViewApplicationLink.UpdateItem();
            objViewApplicationLink.GetAllApplicationLink();
            //bindGroupName()
        }
    });
}

ViewApplicationLink.prototype.ExecuteOrDelayUntilScriptLoad = function ExecuteOrDelayUntilScriptLoad() {
    var Handler = this;
    objViewApplicationLink.GetAllApplicationLink();		// Get ApplicationLink
    
    bindGroupName();

}

//ViewApplicationLink.prototype.TableConfiguration = function TableConfiguration() {
  //  sorter = new TINY.table.sorter('sorter', 'TempTableApplicationLink', {
    //    headclass: 'head',
      //  ascclass: 'asc',
        //descclass: 'desc',
        //evenclass: 'evenrow',
        //oddclass: 'oddrow',
        //evenselclass: 'evenselected',
        //oddselclass: 'oddselected',
        //paginate: true,
        //size: 10,
        //colddid: 'columns',
        //currentid: 'currentpage',
       // totalid: 'totalpages',
        //startingrecid: 'startrecord',
        //endingrecid: 'endrecord',
        //totalrecid: 'totalrecords',
        //hoverid: 'selectedrow',
        //pageddid: 'pagedropdown',
        //navid: 'tablenav',
       // //sortcolumn: 3,//uncomment if you want to sorting on here on page loading by default on column based
        //sortdir: 1,
        //init: true
    //});
//}
var itemsArr;
$("#ddlVisibleAtFilter").change(function () {
debugger;
  
   //$('#TempTableApplicationLink tbody').addClass("panel mainDivAllApplicationLink");
   objViewApplicationLink.GetAllApplicationLink();
  });
var arrGroupName= []; 
ViewApplicationLink.prototype.GetAllApplicationLink = function GetAllApplicationLink() {
    var Handler = this;
    var companyId = titanForWork.getQueryStringParameter('CompanyId');
    var ddlVisibleAt= $( "#ddlVisibleAtFilter option:selected" ).text();
    if(ddlVisibleAt=='All')
    {
      var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ApplicationLink')/Items?$select=*,Company/ID,Company/CompanyName,Title,PasswordProtected,ID,LinkLocation,Status,VisibleAt,Attachments&$orderby=Created desc&$expand=AttachmentFiles,Company&$filter=(Audience eq 'Company' and CompanyIdId eq '" + Logged_CompanyId + "'or AuthorId eq '" + _spPageContextInfo.userId + "') or (Audience eq 'Department' and DepartmentIdId eq '" + Logged_DepartmentId + "' or AuthorId eq '" + _spPageContextInfo.userId + "') or (Audience eq 'Selective' and SelectiveUsersId eq '" + _spPageContextInfo.userId + "' or AuthorId eq '" + _spPageContextInfo.userId + "' ) or Audience eq  'Corporate'";
    }
    else{
          var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('ApplicationLink')/Items?$select=*,Company/ID,Company/CompanyName,Title,PasswordProtected,ID,LinkLocation,Status,VisibleAt,Attachments&$orderby=Created desc&$expand=AttachmentFiles,Company&$filter=(Audience eq 'Company' and CompanyIdId eq '" + Logged_CompanyId + "' and  VisibleAt eq '"+ddlVisibleAt+"') or (Audience eq 'Department' and DepartmentIdId eq '" + Logged_DepartmentId + "' and VisibleAt eq '"+ddlVisibleAt+"') or (Audience eq 'Selective' and SelectiveUsersId eq '" + _spPageContextInfo.userId + "'and VisibleAt eq '"+ddlVisibleAt+"')  or (Audience eq  'Corporate' and VisibleAt eq '"+ddlVisibleAt+"')";
        }

    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            itemsArr=items;

            var tableItemsHTML = "";
            //table = $("#TempTableApplicationLink").DataTable();
            //table.clear().draw();
            
			items.forEach((c) => {
			   if(c.Group=='Group'){
			    if (!arrGroupName.includes(c.GroupName)) {
			        arrGroupName.push(c.GroupName);
			    }
			   } 
			});
            console.log(arrGroupName);
            var myData = [];
            var FileServerRelativeUrl = "";
            var ApplicationLinkTitle = "Title";
            //var ApplicationLinkIconImage="BackgroundImageLocation";
            var ApplicationLinkHyperLink = "LinkLocation";
            var ApplicationLinkAttachment = "Attachments";
            var ApplicationStatus = "Status";
            for (var i = 0; i < items.length; i++) {
                var itemId = items[i].ID;
                var VisibleAt = items[i].VisibleAt;
                var FileServerRelativeUrl = "";

                var Name = items[i][ApplicationLinkTitle];
                if (Name == null)
                    Name = items[i]["LinkTitle"];

                var HyperLink = items[i][ApplicationLinkHyperLink];
                var Group=items[i].Group;
                if(HyperLink!=null)
                   HyperLink = HyperLink.Description;
                if (HyperLink == null)
                    HyperLink = items[i]["LinkLocation"];
                if (Group=='Group')
                    HyperLink ='Group';    

                var Status = items[i][ApplicationStatus];
                if (Status == null)
                    Status = items[i]["Status"];
                else if (Status)
                    Status = "Active"
                else
                    Status = "Inactive"
                 
                

                var viewItem = "../Pages/ApplicationLink.aspx?WebAppId=" + Handler.CompanyId + "&ItemId=" + itemId + "&Mode=View";
                var Protected=items[i].PasswordProtected;
                if(items[i].PasswordProtected==true){

                  var Protectedlock='<i class="fa fa-lock" style="font-size:24px"></i>'
                }
                else{
                   Protectedlock='';
                }


                tableItemsHTML += "<tr><td>" + Name + "</td><td>" + HyperLink + "</td><td>" + VisibleAt + "</td><td>" + Protectedlock+ "</td>"
                if(Status=='Active'){
                 tableItemsHTML +="<td style='color: blue;'>" + Status + "</td>";
                }
                else{
                 tableItemsHTML +="<td style='color: red;'>" + Status + "</td>";
                }
                tableItemsHTML += "<td style='text-align:center;'>";
                tableItemsHTML += "<div class='Customer-edit-lock-btn-box'><a type='button' href='#' class='custom-edit-btn'  onclick='objViewApplicationLink.EditApplicationLink("+itemId+")'><span class='fa fa-pencil'></span></a></div>";//</td></tr>";
                //tableItemsHTML += "<a class='Customer-edit-lock-btn-box' style='min-width:30px !important;' onclick='objViewApplicationLink.EditApplicationLink(" + itemId + ")'><span class='fa fa-pencil-square-o fa-lg'></span></a>";
                tableItemsHTML += '<a class="Customer-edit-lock-btn-box" onclick="objViewApplicationLink.DeleteApplicationLink(' + itemId + ')"><span class="fa fa-trash-o fa-lg"></span></a></td></td></tr>';
            }
            var completebody = tableItemsHTML;
            //table.rows.add($(tableItemsHTML)).draw();
            
            var dvTable = $(".mainDivAllApplicationLink");;
	            dvTable.html("");
	            
	            
	        if (items.length == 0) 
            {
                $(".NoRecordFound").show();
            }
            else
            {
            	 $(".NoRecordFound").hide();
            }
            
            dvTable.append(completebody);
            if (items.length > 0) 
            {
               TableConfiguration();					 // GenerateTableSharedWithMe();
            } 
            
            bindGroupName();


            //var dvTable = Handler.AllApplicationLink;
            //dvTable.html("");

            //if (items.length == 0) {
             //   Handler.NoRecordFound.show();
           // }
            //else {
              //  Handler.NoRecordFound.hide();
            //}

            //dvTable.append(completebody);
            //if (items.length > 0) {
                //objViewApplicationLink.TableConfiguration();					 // GenerateTableSharedWithMe();
           // }
        }, eror: function (data) {

            console.log('error');
        }
    });
}

ViewApplicationLink.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

function TableConfiguration()
{
    sorter = new TINY.table.sorter('sorter', 'TempTableApplicationLink', {
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




ViewApplicationLink.prototype.AddItem = function AddItem() {

    var Handler = this;
    var visible_at = Handler.VisibleAt.val();
    var imageURL = Handler.txtImageUrl.val();
    var title= Handler.Title.val();  //$("#txtTitle").val(); 
    var image = Handler.IconImage.val();
    var Audience=$('#Audience').val();
    var password=$('#txtPassword').val();
    var ProtectedCheckBox=$('#ProtectedCheckBox');
    
    if(ProtectedCheckBox.is(":checked")==true){
    if(password==''){
      alert('Please enter Password');
      return false;
    }
    }

    if ($("#Audience").val()=="Department") {
	    readcheckboxValue();
	 	if(selectedid.length<1){
        alert("Please select departments.");
        $("#SelectedItems").text("Select");
        //Handler.Description.focus();
        return false;
        }
    }
    
    if ($("#Audience").val()=="Company") {
	    readcheckboxValue();
	 	if(selectedid.length<1){
        alert("Please select Company .");
        $("#SelectedItems").text("Select");
        //Handler.Description.focus();
        return false;
        }
    }
    
    
    
    var ChooseImage = Handler.ChooseImage.val();
    var link = Handler.HyperLink.val();
    
    var selectiveUser=getPeopleUserInfoGroups('SelectivePicker');
    if ($("#Audience").val()=="Selective") {
      if(selectiveUser.length==0){      
      alert('Please enrer selective user!');
      return false;
      }
    }



    Handler.Picture.attr('src', '');
    var ListName = "ApplicationLink";
    var Metadata;
    var itemType = objViewApplicationLink.GetItemTypeForListName(ListName);

   
    Metadata = {
        __metadata: { 'type': itemType },
        LinkLocation:
        {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': link, //'Google',
            'Url': link //'http://google.com'
        }
        };
        Metadata["Title"]=title;
        //Metadata["Title"]= Handler.CompanyId,
        var arrCompany=[Logged_CompanyId]
        var groupName=$('#ddlGroups').val();
        Metadata["VisibleAt"]=visible_at;
        Metadata["Audience"]=Audience;
        Metadata["Group"]=$("#diveRadioButton input[type='radio']:checked").val();
        if($("#diveRadioButton input[type='radio']:checked").val()=='Link'){
	        if(groupName!='-Select-'){
	         Metadata["GroupName"]=$('#ddlGroups').val();
	        }
        }
        else{
         Metadata["GroupName"]=title;        
        }
        
 
        Metadata["Password"]=password;
        Metadata["SelectiveUsersId"]={ 'results' : selectiveUser};
        Metadata["PasswordProtected"]=ProtectedCheckBox.is(":checked");
        if(Audience=='Department'){
          Metadata["DepartmentIdId"]={"results": selectedid};
          Metadata["CompanyIdId"]={"results":arrCompany};
        }
        if(Audience=='Corporate'){
          //Metadata["DepartmentIdId"]={"results": selectedid};
          Metadata["CompanyIdId"]={"results":arrCompany};
        }
        if(Audience=='Company'){
          Metadata["CompanyIdId"]={"results": selectedid};
          
        }
        Metadata["ChooseImage"]=ChooseImage;
        Metadata["Event_pick"]=imageURL;
        Metadata["Status"]=Handler.Active.is(":checked");   
    
   
    if (visible_at == 'Select Visible At') {
        alert("Please Select Visible At");
    }
    if (visible_at == "Home Page") {
        if (title== "" || link == "") {
            alert("Please fill all mandatory fields");
        }
        if (image == "" && imageURL == "") {
            alert("Please fill all mandatory fields");
        }
        else {
            if (title.length > 100) {
                alert("The title should be less then 100 char");
            }
            else {
                $.when(objViewApplicationLink.AddItemToList(ListName, Metadata)).done(function (responseIdmore) {
                    AddAttachments(responseIdmore.d.Id);
                    alert('Application link added successfully');                                      
                    
                    $("#modalApprovalApplicationLink").modal('hide');
                    clearPeoplePickerControl('SelectivePicker');
                    $("#ddlVisibleAtFilter")[0].selectedIndex = 0;

                    resetAllField();
                })
            }
        }
    }
    if (visible_at == "Workplace") {
        if(title.length>15){
	      alert('Title allow only 15 char!');
	      return false;
	    }
       if($("#diveRadioButton input[type='radio']:checked").val()=="Link"){ 
        if (title== "" || link == "" || image == "" || visible_at == "") {
            alert("Please fill all mandatory fields");
            return false;
        }
       }
      if($("#diveRadioButton input[type='radio']:checked").val()=="Group"){ 
        if (title== "" || image == "" || visible_at == "") {
            alert("Please fill all mandatory fields");
            return false;
        }
       }
       if (title.length > 15) {
           alert("The title should be less then 15 char");
           return false;
        }
            else {
                $.when(objViewApplicationLink.AddItemToList(ListName, Metadata)).done(function (responseIdmore) {
                    AddAttachments(responseIdmore.d.Id);
                    alert('Application link added successfully');                    
                    $("#modalApprovalApplicationLink").modal('hide');
                    $("#ddlVisibleAtFilter")[0].selectedIndex = 0;

                    resetAllField();
                })
            }
        
    }
}
var file = document.getElementById('file1');
file.onchange = function (e) {
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

            var size = this.files[0].size / 1024;
             var ddlVisibleAt=$( "#ddlVisibleAt option:selected" ).text();
            if(ddlVisibleAt=='Workplace'){
	            if (size.toFixed(2) > 15) {
	                alert("Image size not more then 15 KB");
	                

	                //$('#txtLink').val().focus();
	                this.value = '';
	            }
	            else {
	                document.getElementById('blah').src = window.URL.createObjectURL(this.files[0]);
	            }
	         }
	         
	         if(ddlVisibleAt=='Home Page'){
	            if (size.toFixed(2) > 100) {
	                alert("Image size not more then 100 KB");
	                //document.getElementById("txtLink").focus();
	                this.value = '';
	            }
	            else {
	                document.getElementById('blah').src = window.URL.createObjectURL(this.files[0]);
	            }
	         }

	            
            break;
        default:
            alert('Please select image files of JPEG, JPG, GIF and PNG formatted only.');
            this.value = '';
    }
};

//Add item in list
ViewApplicationLink.prototype.AddItemToList = function AddItemToList(ListName, Metadata) {
    var Handler = this;
    var dfd = $.Deferred();

    var ownURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('" + ListName + "')/Items";
    $.ajax({
        url: ownURL,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            console.log(ListName);
            dfd.resolve(data);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

function AddAttachments(responseIdmore) {
    var digest = "";
    $.ajax(
        {
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
            method: "POST",
            headers: {
                "ACCEPT": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                digest = data.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (data) {
            }
        }).done(function () {
            var fileInput = $("#file1");
            var fileName = fileInput[0].files[0].name;
            var fileNameSplit=fileName.split(".");
            var fileExt=fileNameSplit[fileNameSplit.length - 1];
            var fileLength=fileExt.length;
            var fileSCR=fileName.replace(/[^a-zA-Z]/g, "");
            var fileslice;
            if(fileLength==3){
            fileslice= fileSCR.slice(0,-3);
            }
            if(fileLength==4){
            fileslice= fileSCR.slice(0,-4);
            }          
            var newFileName=(fileslice+"."+fileExt);         
            			

            var reader = new FileReader();
            reader.onload = function (e) {
                var fileData = e.target.result;
                var res11 = $.ajax(
                    {
                        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApplicationLink')/items('" + responseIdmore + "')/AttachmentFiles/ add(FileName='" + newFileName+ "')",
                        method: "POST",
                        binaryStringRequestBody: true,
                        data: fileData,
                        processData: false,
                        headers: {
                            "ACCEPT": "application/json;odata=verbose",
                            "X-RequestDigest": digest
                            //,
                            //"content-length": fileData.byteLength
                        },
                        success: function (data) {
                            $("#file1").val("");
                        },
                        error: function (data) {
                            //alert("Error occured." + data.responseText);
                        }
                    });
            };
            reader.readAsArrayBuffer(fileInput[0].files[0]);
        });
}
ViewApplicationLink.prototype.EditApplicationLink = function EditApplicationLink(ItemId) {

    var Handler = this;
    var visibleAt = Handler.VisibleAt.val();
    
    var tilte = Handler.Title.val();  //$("#txtTitle").val(); 
    var image = Handler.Picture.val();
    var ChooseImage = Handler.ChooseImage.val();
    $('#DepartmentListBox').hide();
    $('#divActiveBox').show();
    $('#SelectiveDiv').hide();
    //$('#DepartmentListBox').hide();
    $("#txtImageUrl").val("");
    var imageURL = Handler.txtImageUrl.val();
    var link = Handler.HyperLink.val();
    $('#DepartmentListBox').hide();
    $("#modalApprovalApplicationLink").modal();
    var ListName = 'ApplicationLink';
    var submitEventFired = false;
    clearPeoplePickerControl('SelectivePicker');
    var SelectivePicker=[];

    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('" + ListName + "')/Items?$select=*,SelectiveUsers/UserName,AttachmentFiles&$expand=AttachmentFiles,SelectiveUsers&$filter=ID eq " + ItemId + "";
    $.ajax({
        url: Ownurl,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
        },
        async: false,
        success: function (data) {
        debugger;

            var results = data.d.results;
            console.log(results);
            Handler.DataId = ItemId;
            Handler.Picture.attr('src', '');
            Handler.VisibleAt.val(results[0].VisibleAt);
            var Audience =results[0].Audience;
            if(Audience==''){
              Audience ='Corporate';
            }
            $('#Audience').val(Audience);
            if(Audience == "Department")
			{
				$("#DepartmentListBox").css({display: "block"});
				ReadDepartment_Company(items="Department")
				$('#SelectedItems').prop('disabled', true);
			    $('.dropdown-toggle').prop('disabled',true)

				var GetDepartmentsIDs = results[0].DepartmentIdId.results;
				var x=0;
				for(x; x<GetDepartmentsIDs.length; x++)
				{
					var selectedval=GetDepartmentsIDs[x];
					$(":checkbox[value='"+selectedval+"']").prop("checked","true");
				}
				
				readcheckboxValue(); //Read and Set Checked item text at a time of edit
				$('.my_announce_department_list').addClass('audienceDiv');

			}
			
			if(Audience == "Company")
			{
				$("#DepartmentListBox").css({display: "block"});
				ReadDepartment_Company(items="Company")
				$('#SelectedItems').prop('disabled', true);
			    $('.dropdown-toggle').prop('disabled',true)

				var GetDCompanyIds= results[0].CompanyIdId.results;
				var x=0;
				for(x; x<GetDCompanyIds.length; x++)
				{
					var selectedval=GetDCompanyIds[x];
					$(":checkbox[value='"+selectedval+"']").prop("checked","true");
				}
				
				readcheckboxValue(); //Read and Set Checked item text at a time of edit
				$('.my_announce_department_list').addClass('audienceDiv');

			}
			
			if(Audience == "Selective")
			{
			  var users=results[0].SelectiveUsers.results;
			  for(var i=0; i<users.length; i++){
			   setPeoplePickerUsersInfoCurrentGroups('SelectivePicker',users[i].UserName)
			  }
			  
			  $('#SelectiveDiv').show();
			  $('#SelectivePickerDiv').addClass('selective-Picke');
			}


            
            
            $('#txtPassword').val(results[0].Password);
            $('#ddlGroups').val(results[0].GroupName)
            var protectedPass=results[0].PasswordProtected
            if(protectedPass==true){
              $('#passwordDiv').show();
            }
            $("#ProtectedCheckBox").prop("checked",protectedPass);


            var visibleAT = results[0].VisibleAt;

            Handler.ChooseImage.val(results[0].ChooseImage);
            var ChooseImage = results[0].ChooseImage;
            var scope = $('#slctimage').val();
            var group=results[0].Group;
            if(group=="Group"){
             $('#radioGroup').prop("checked", "checked")
            }
            else{
                $('#radioLink').prop("checked", "checked")

            }

            Handler.Title.val(results[0].Title);
            var GroupName=results[0].GroupName;
            if(group!='Group'){
              Handler.HyperLink.val(results[0].LinkLocation.Description);
            }
            if (visibleAT == 'Workplace') {
                $("#imageSliderDiv").hide();
                $("#fileUpload1").show();
                $("#check").hide();
                $(".danger").hide();
                Handler.Picture.attr('src', results[0].AttachmentFiles.results[0].ServerRelativeUrl);
                
                $('#AudienceDiv').show();
		        $('#ProtectedDiv').show();
		        //$('#passwordDiv').show();
		        
		        if(group=='Group'){
			        $('#divLink').hide();
				    //$('#divLinkTitle').hide();
				    //$('#divGroupName').show();
				    $('#diveRadioButton').show();
				    $('#labelTitle').text('Group Name');
				    $('#divGroupDropdown').hide(); 
		        }
		        else{
		          $('#divLink').show();
			      $('#divLinkTitle').show();
			    //$('#divGroupName').hide();
			      $('#labelTitle').text('Title');
			      $('#divGroupDropdown').show();
			      if(GroupName!=null){
			       $('#ddlGroups').val()
			      }
		        }
		


            }
            else {
            
                $('#AudienceDiv').hide();
		        $('#ProtectedDiv').hide();
		        $('#labelTitle').text('Title');
		        $('#passwordDiv').hide();
		        $('#divGroupDropdown').hide();
		        $('#diveRadioButton').hide();
		        //$('#passwordDiv').hide();
  
            
                if (ChooseImage == "Upload") {
                    $("#fileUpload1").show();
                    $("#imageSliderDiv").hide();
                    $("#check").show();
                    $("#slctimage").val(ChooseImage);
                    Handler.Picture.attr('src', results[0].AttachmentFiles.results[0].ServerRelativeUrl);
                    $("#slctimage").change(function () {
                        var imageText = $(this).find("option:selected").text();
                        var imageValue = $(this).val();
                        if (imageValue == "Choose from Gallery") {
                            $("#imageSliderDiv").show();
                            $("#fileUpload1").hide();
                        }
                        else if (imageValue == "Upload") {
                            $("#fileUpload1").show();
                            $("#imageSliderDiv").hide();
                        }


                    });

                } if (ChooseImage == "Choose from Gallery") {
                    $("#imageSliderDiv").show();
                    $("#fileUpload1").hide();
                    $("#check").show();
                    $("#slctimage").val(ChooseImage);

                    Handler.txtImageUrl.val(results[0].Event_pick);
                    $("#slctimage").change(function () {
                        var imageText = $(this).find("option:selected").text();
                        var imageValue = $(this).val();
                        if (imageValue == "Choose from Gallery") {
                            $("#imageSliderDiv").show();
                            $("#fileUpload1").hide();
                        }
                        else if (imageValue == "Upload") {
                            $("#fileUpload1").show();
                            $("#imageSliderDiv").hide();
                        }


                    });

                }
            }
            $("#createApplicationLink").text("Update");

            Handler.Active.prop('checked', results[0].Status);
            Handler.Submit.text("Update");

            $("#modalApprovalApplicationLink").modal();

        }, eror: function (data) {
            console.log('error');
        }
    });
}

ViewApplicationLink.prototype.UpdateItem = function UpdateItem() {

    var Handler = this;
    var visible_at = Handler.VisibleAt.val();
    var imageURL = Handler.txtImageUrl.val();
    var title= Handler.Title.val();  //$("#txtTitle").val(); 
    if(title==''){
      alert('Please enter Title');
      return false;
    }
    if(title.length>15){
      alert('Title allow only 15 char!');
      return false;
    }
    
   


    var image = Handler.IconImage.val();
    var ChooseImage = Handler.ChooseImage.val();
    
    var Audience=$('#Audience').val();
    var password=$('#txtPassword').val();
    var ProtectedCheckBox=$('#ProtectedCheckBox');
    if(ProtectedCheckBox.is(":checked")==true){
    if(password==''){
      alert('Please enter Password');
      return false;
    }
    }
    if ($("#Audience").val()=="Department") {
	    readcheckboxValue();
	    selectiveUser=[]
	 	if(selectedid.length<1){
        alert("Please select departments.");
        $("#SelectedItems").text("Select");
        //Handler.Description.focus();
        return false;
        }
    }
    if ($("#Audience").val()=="Company") {
	    readcheckboxValue();
	    selectiveUser=[]
	 	if(selectedid.length<1){
        alert("Please select Company.");
        $("#SelectedItems").text("Select");
        //Handler.Description.focus();
        return false;
        }
    }    

    var link = Handler.HyperLink.val();
    if($("#diveRadioButton input[type='radio']:checked").val()=="Link"){
     if(link ==''){
      alert('Please enter Link');
      return false;
     }
    }
    var status = Handler.Active.is(":checked");
    var ListName = "ApplicationLink";
    var selectiveUser=getPeopleUserInfoGroups('SelectivePicker');
    if ($("#Audience").val()=="Selective") {
      selectedid=[];
      if(selectiveUser.length==0){      
      alert('Please enrer selective user!');
      return false;
      }
    }

    
    var Metadata;
    var ItemType = 'SP.Data.ApplicationLinkListItem';//GetItemTypeForListNameDetailsGroups(ListName);
    /*Metadata = {
        __metadata: {
            'type': ItemType
        },
        LinkLocation:
        {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': link,
            'Url': link
        },
        Title: tilte,
        VisibleAt: visible_at,
        CompanyId: Handler.CompanyId,
        Audience:Audience,
        Password:password,
        SelectiveUsersId:{ 'results' : selectiveUser},
        PasswordProtected:ProtectedCheckBox.is(":checked"),
        DepartmentIdId:{"results": selectedid},
        Event_pick: imageURL,
        Status: status,
        ChooseImage: ChooseImage

    };*/
    Metadata= {
        __metadata: { 'type': ItemType},
        LinkLocation:
        {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': link, //'Google',
            'Url': link //'http://google.com'
        }
        };
        Metadata["Title"]=title;
        //Metadata["Title"]= Handler.CompanyId,
        var arrCompany=[Logged_CompanyId]
        var groupName=$('#ddlGroups').val();
        Metadata["VisibleAt"]=visible_at;
        Metadata["Audience"]=Audience;
        Metadata["Password"]=password;
        //Metadata["Group"]=$("#diveRadioButton input[type='radio']:checked").val();
        Metadata["Group"]=$("#diveRadioButton input[type='radio']:checked").val();
        if($("#diveRadioButton input[type='radio']:checked").val()=='Link'){
	        if(groupName!='-Select-'){
	         Metadata["GroupName"]=$('#ddlGroups').val();
	        }
        }
        else{
         Metadata["GroupName"]=title;        
        }
        
        //Metadata["GroupName"]=$('#ddlGroups').val();

        Metadata["SelectiveUsersId"]={ 'results' : selectiveUser};
        Metadata["PasswordProtected"]=ProtectedCheckBox.is(":checked");
        if(Audience=='Department'){
          Metadata["DepartmentIdId"]={"results": selectedid};
          Metadata["CompanyIdId"]={"results":arrCompany};
        }
        if(Audience=='Company'){
          Metadata["CompanyIdId"]={"results": selectedid};
          
        }
        Metadata["ChooseImage"]=ChooseImage;
        Metadata["Event_pick"]=imageURL;
        Metadata["Status"]=Handler.Active.is(":checked");
    
    
    $.when(objViewApplicationLink.UpdateItemToList(ListName, Metadata)).done(function (responseIdmore) {
        if (document.getElementById("file1").files.length > 0) {
            checkFileExists(Handler.DataId);
        }
        alert('Application link updated successfully');
        $("#txtImageUrl").val("");

        $("#modalApprovalApplicationLink").modal('hide');
        resetAllField();
    })
}

//Edit item in list
ViewApplicationLink.prototype.UpdateItemToList = function UpdateItemToList(ListName, Metadata) {
    Handler = this;
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('" + ListName + "')/Items('" + Handler.DataId + "')",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            console.log(ListName);
            // console.log(data);
            dfd.resolve(data);
        },
        error: function (error) {
            alert("Error occured while updating item - " + JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

function checkFileExists(responseIdmore) {
    Handler = this;
    var ListName = "ApplicationLink";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('" + ListName + "')/Items('" + responseIdmore + "')?$select=*&$expand=AttachmentFiles",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            if (data.d.Attachments == true) {
                //delete file if it already exists
                for (var index = 0; index < data.d.AttachmentFiles.results.length; index++) {
                    DeleteFile(responseIdmore, data.d.AttachmentFiles.results[index].FileName);
                }
            }
            AddAttachment(responseIdmore);
        },
        error: function (data) {
            //check if file not found error                      
        }
    });
}
function DeleteFile(responseIdmore, FileTitle) {
    Handler = this;
    var ListName = "ApplicationLink";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListName + "')/GetItemById(" + responseIdmore + ")/AttachmentFiles/getByFileName('" + FileTitle + "')  ",
        method: 'DELETE',
        async: false,
        headers: {
            'X-RequestDigest': document.getElementById("__REQUESTDIGEST").value
        },
        success: function (data) {
            AddAttachment(responseIdmore);
        },
        error: function (data) {
            //  console.log(data);      
        }
    });
}

function AddAttachment(responseIdmore) {
    var digest = "";
    $.ajax(
        {
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
            method: "POST",
            headers: {
                "ACCEPT": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                digest = data.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (data) {
            }
        }).done(function () {
            var fileInput = $("#file1");
            var fileName = fileInput[0].files[0].name;
            var fileNameSplit=fileName.split(".");
            var fileExt=fileNameSplit[fileNameSplit.length - 1];
            var fileLength=fileExt.length;
            var fileSCR=fileName.replace(/[^a-zA-Z]/g, "");
            var fileslice;
            if(fileLength==3){
            fileslice= fileSCR.slice(0,-3);
            }
            if(fileLength==4){
            fileslice= fileSCR.slice(0,-4);
            }          
            var newFileName=(fileslice+"."+fileExt);
            var reader = new FileReader();
            reader.onload = function (e) {
                var fileData = e.target.result;
                var res11 = $.ajax(
                    {
                        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApplicationLink')/items('" + responseIdmore + "')/AttachmentFiles/ add(FileName='" + newFileName+ "')",
                        method: "POST",
                        binaryStringRequestBody: true,
                        data: fileData,
                        processData: false,
                        headers: {
                            "ACCEPT": "application/json;odata=verbose",
                            "X-RequestDigest": digest
                        },
                        success: function (data) {
                        },
                        error: function (data) {
                            //alert("Error occured." + data.responseText);
                        }
                    });
            };
            reader.readAsArrayBuffer(fileInput[0].files[0]);
        });
}

ViewApplicationLink.prototype.DeleteApplicationLink = function DeleteApplicationLink(ItemId) {
    var Handler = this;
    var ListName = 'ApplicationLink';

    var deleteConfirmation = confirm("Do you want to delete this application link?");
    if (deleteConfirmation) {
        var URL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items(" + ItemId + ")";
        $.ajax({
            url: URL,
            type: "DELETE",
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*"
            },
            success: function (data) {
                alert("Application link deleted successfully");
                objViewApplicationLink.GetAllApplicationLink();
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
}

ViewApplicationLink.prototype.GetItemTypeForListName = function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

ViewApplicationLink.prototype.UserAuthorization = function UserAuthorization() {
    var companyId = titanForWork.getQueryStringParameter("CompanyId");
    titanForWork.PageAuthorization("ManageQuickLinks", companyId).done(function (currentUserRights, message) {
        if (currentUserRights.length > 0) {
            if ((currentUserRights[0].SiteAdmin == "SiteAdmin") || (currentUserRights[0].TechAdmin == "TechAdmin")) {
                objViewApplicationLink.InitializeControls();
                objViewApplicationLink.BindEvents();
                userActivityNotificationEntry(_spPageContextInfo.userId,window.location)


                ExecuteOrDelayUntilScriptLoaded(objViewApplicationLink.ExecuteOrDelayUntilScriptLoad, "sp.js");
            }
            else {
                alert(message);
                window.location.href = _spPageContextInfo.webAbsoluteUrl + "/Pages/Default.aspx?WebAppId=" + companyId;
               }
        }
    });
}

function getMyPicture() {
    $.when(RetrieveImageAsync()).then(function (imageInfo) {
        var len = imageInfo.results;
        var DivTr;
        var src = $("#mysliderDiv");

        for (var i = 0; i < len.length; i++) {
            var imagefile = imageInfo.results[i].EncodedAbsUrl;
            var Title = imageInfo.results[i].Title;
            if (Title == "LINK") {
                src.append('<img  width="100%"  src="' + imagefile + '">');
            }
        }


        $('#mysliderDiv img').click(function () {
            // alert($(this).attr('src'));
            $('#txtImageUrl').val($(this).attr('src'));
            $(this).toggleClass('my_event_active').siblings().removeClass('my_event_active');
        });
    });
}

function RetrieveImageAsync() {
    var dfd = new jQuery.Deferred(); //deferred object

    var siteurl = _spPageContextInfo.webServerRelativeUrl;
    var executor = new SP.RequestExecutor(siteurl);
    executor.executeAsync(
        {
            url: siteurl + "//_api/Web/Lists/GetByTitle('ImageGallery')/items?$select=EncodedAbsUrl,Title&$top=500",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: successHandler,
            error: errorHandler
        });
    function successHandler(data) {

        var jsonObject = JSON.parse(data.body);
        var data = jsonObject.d;
        dfd.resolve(data);
    }

    function errorHandler(data, errorCode, errorMessage) {
        alert(errorMessage);
        dfd.reject(errorMessage);

    }

    // Return the Promise so caller can't change the Deferred
    return dfd.promise();
}

$("#ddlVisibleAt").change(function () {

    var selectedText = $(this).find("option:selected").text();
    var selectedValue = $(this).val();
    if (selectedValue == "Workplace") {
        $("#imageSliderDiv").hide();
        $('#Audience').val('Corporate');
        $('#AudienceDiv').show();
        $('#ProtectedDiv').show();
        $('#radioLink').prop("checked",true);
        $('#labelTitle').text('Title');
        //$('#radioLink').attr("checked",true);
        $('#divGroupName').hide();
	    $('#divGroupDropdown').show();
	    $('#diveRadioButton').show();
	    $("#divLinkTitle").show();
	    $("#divLink").show();

        
        //$('#passwordDiv').show();
        //$('#Audience').show();



        
        $("#fileUpload1").show();
        $("#check").hide();
        $("#ddlDevAudience").show();
        $("#ddlDivDepartment").show();
    }
    else if (selectedValue == "Home Page") {
        $("#check").show();
        $("#ddlDevAudience").hide();
        $("#DepartmentListBox").hide();
        $('#labelTitle').text('Title');
        //$('#Audience').val('Corporate');
        $('#Audience').val('Corporate');


	    $('#divGroupName').hide();
	    $('#divGroupDropdown').hide();
	    $('#diveRadioButton').hide();
	    $("#divLinkTitle").show();
	    $("#divLink").show();

        $("#ddlDivDepartment").hide();
        $('#AudienceDiv').hide();
        $('#ProtectedDiv').hide();
        $('#passwordDiv').hide();



        $("#slctimage").change(function () {
            var imageText = $(this).find("option:selected").text();
            var imageValue = $(this).val();
            if (imageValue == "Choose from Gallery") {
                $("#imageSliderDiv").show();
                $("#fileUpload1").hide();
            }
            else if (imageValue == "Upload") {
                $("#fileUpload1").show();
                $("#imageSliderDiv").hide();
            }


        });
    }
    else {
        $("#fileUpload1").hide();
        $("#imageSliderDiv").hide();
        $("#check").hide();
        $("#ddlDevAudience").hide();
        $("#ddlDivDepartment").hide();



    }

});

function resetAllField() {
    $('#txtTitle').val("");
    var dropDownVisibleAt = document.getElementById("ddlVisibleAt");
    dropDownVisibleAt.selectedIndex = 0;
    $("#fileUpload1").hide();
    $("#imageSliderDiv").hide();
    $("#check").hide();
    $('#txtImageUrl').val("");
    $('#ddlGroups').val("-Select-");
    $('#divActiveBox').hide()
    $('#Audience').val('Corporate');

    //Handler.Active.prop('checked',true);

}

$(document).ready(function () {
    
    InitializePeoplePicker("SelectivePicker", true);
    objViewApplicationLink = new ViewApplicationLink();
    objViewApplicationLink.UserAuthorization();
    getMyPicture();
    //$('#Audience').multiselect();   
    $('#labelTitle').text('Title');
    //bindGroupName();
    
  });
    
function InitializePeoplePicker(peoplePickerElementId, allowMultiple) {
    if (allowMultiple == null) {
        allowMultiple = false;
    }
    var schema = {};
    //schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['PrincipalAccountType'] = 'User';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = allowMultiple;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '100%';
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}


function getPeopleUserInfoGroups(pickerPickerControlId) {
    DisplayText=[];
    var sharedUserArrayList = new Array();
    var pickerDiv = $("[id^='" + pickerPickerControlId + "']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
    var users = peoplePicker.GetAllUserInfo();
    if (users.length > 0) {
      //  var allUsersID = new Array();
      //  var usersEmailIDs = new Array();
        for (var i = 0; i < users.length; i++) {
            sharedUserArrayList.push(GetUserIdGroups(users[i].Key));
            DisplayText.push(users[i].DisplayText);
        }
    }
    return sharedUserArrayList;
}


function GetUserIdGroups(userName) {
    var userID = "";
    var prefix = "i:0#.f|membership|";
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var accountName = userName;// prefix+userName;       
    $.ajax({
        url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(accountName) + "'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            userID = data.d.Id;
            //$scope.UserInfoFullName = data.d.Title;
            // alert("Received UserId" + data.d.Id);
            // alert(JSON.stringify(data));
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        }
    });
    return userID;
}

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


function setPeoplePickerUsersInfoCurrentGroups(controlNameID, LoginNameOrEmail) 
{
    var peoplePickerDiv = $("[id^='" + controlNameID + "']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
    peoplePicker.AddUserKeys(LoginNameOrEmail, false);
}


   

function DisplayDepartmentBox(item)
{debugger;
	if(item=="Corporate")
	{ 
	 $("#DepartmentListBox").hide();
	  $("#SelectiveDiv").hide();
	}
	else if(item=="Selective")
	{ 
	 $("#SelectiveDiv").show();
	 $("#DepartmentListBox").hide();
	}

	
	else if(item=="Company") {
	   $("#DepartmentListBox").show();
	   ReadDepartment_Company(item);
	    $("#SelectiveDiv").hide();
	 }
	 
	 else{
	   $("#DepartmentListBox").show();
	    $("#SelectiveDiv").hide();
	   ReadDepartment_Company(item);
	 }
	
	
}


function ReadDepartment_Company(items)
{
	var Ownurl='';
	if(items=="Department") 
	{ 
		$("#DropLable").text('Department');
		 Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?select=ID,Title&$filter=CompanyID eq '"+currentCompanyid+"'&$top=5000"; 
	}
	if (items == "Company") {
        $("#DropLable").text('Company');
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Companies')/items?select=ID,Title";
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
   					$('#DpdownData').append('<li><input type="checkbox" id="" name="Company" value='+ items[i].ID +'>' + items[i].Title + '</li>')
  				}
            }  
        },
		eror: function (data) 
		{  
        	alert("An error occurred. Please try again.");  
		}  
    });  
}
 
 
var selected_data=[];
$( ".dropdown-menu" ).click(function() {
   var val = [];debugger;
   var selectedText = [];
   selected_data=[];
        $("input:checkbox[name=Company]:checked").each(function(i){
          val[i] = $(this).val();
         selectedText[i]   = $(this).parent().text();
	     $("#SelectedItems").text(selectedText);
         selected_data.push(val[i]);
         $('input[type="checkbox:checked"]').text();
        });
});

var selectedid=[];
function readcheckboxValue()
{debugger;
	selectedid=[];
	var favorite = [];	
	$.each($("input[name='Company']:checked"), function(){
    favorite.push($(this).parent().text());
    selectedid.push($(this).val());
    });
    $("#SelectedItems").text(favorite);
    return selectedid;
}


function showPassword(){
      
      var ProtectedCheckBox=$('#ProtectedCheckBox');
      var check=ProtectedCheckBox.is(":checked");
      if(check==true){
       $('#passwordDiv').show();
      }
      else{
           $('#passwordDiv').hide();
           $('#txtPassword').val('');

      }
         


}

function is_url()
{

var str= $('#txtLink').val();
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          
          return true;
          
        }
        else
        {
          alert('Please enter valid link !');
          //document.getElementById("txtLink").focus();
          $('#txtLink').val('');
          
          return false;
        }
}
 
 
function showGroup(){
    $('#divLink').hide();
    //$('#divLinkTitle').hide();
    //$('#divGroupName').show();
    $('#labelTitle').text('Group Name');
    $('#divGroupDropdown').hide();
}

function showLink(){
    $('#divLink').show();
    $('#divLinkTitle').show();
    //$('#divGroupName').hide();
    $('#labelTitle').text('Title');
    $('#divGroupDropdown').show();
}

function bindGroupName(){
   $('#ddlGroups').empty();
   $("#ddlGroups").append($("<option>",{
   value:'-Select-',
   text:'-Select-'
  }));
   for( i = 0; i < arrGroupName.length; i++ ){          
   $("#ddlGroups").append($("<option>",{
   value: arrGroupName[i],
   text: arrGroupName[i]
  }));
};

}


$("#ddlGroups").change(function () {
debugger;
   txtGroup=$(this).val();
   if(txtGroup!="-Select-"){
       //$(this).prop('disabled', true);
	   var results=itemsArr.filter(function (d){return d.GroupName==txtGroup && d.Group=='Group'})
	   $('#Audience').val(results[0].Audience)
	   //DisplayDepartmentBox(results[0].Audience); 
	   if(results[0].Audience== "Department")
	     {
		   $("#DepartmentListBox").css({display: "block"});
		   $('#Audience').prop('disabled', true);
		   $('.my_announce_department_list').addClass('audienceDiv');
		   $("#SelectiveDiv").hide();

		   $('#SelectedItems').prop('disabled', true);

		   ReadDepartment_Company(items="Department")
		   var GetDepartmentsIDs = results[0].DepartmentIdId.results;
		   var x=0;
		   for(x; x<GetDepartmentsIDs.length; x++)
		   {
			    var selectedval=GetDepartmentsIDs[x];
				$(":checkbox[value='"+selectedval+"']").prop("checked","true");
			}
				
			readcheckboxValue(); //Read and Set Checked item text at a time of edit

		}			
	    if(results[0].Audience== "Company")
		  {
			   $("#DepartmentListBox").css({display: "block"});
			   $('#Audience').prop('disabled', true);
			   $('#SelectedItems').prop('disabled', true);
			   $('.dropdown-toggle').prop('disabled',true)
			   $('.my_announce_department_list').addClass('audienceDiv');
			   $("#SelectiveDiv").hide();
				ReadDepartment_Company(items="Company")
				var GetDCompanyIds= results[0].CompanyIdId.results;
				var x=0;
				for(x; x<GetDCompanyIds.length; x++)
				{
					var selectedval=GetDCompanyIds[x];
					$(":checkbox[value='"+selectedval+"']").prop("checked","true");
				}
				
				readcheckboxValue(); //Read and Set Checked item text at a time of edit

	    }
			
	    if(results[0].Audience== "Selective")
	      {
			  var users=results[0].SelectiveUsers.results;
			  for(var i=0; i<users.length; i++){
			   setPeoplePickerUsersInfoCurrentGroups('SelectivePicker',users[i].UserName)
			  }
			  
			  $('#SelectiveDiv').show();
			  $("#DepartmentListBox").hide();
			  $('#Audience').prop('disabled', true);
			  $('#SelectivePickerDiv').addClass('selective-Picke');
		  }
	 if(results[0].Audience=="Corporate")
	   { 
	     $("#DepartmentListBox").hide();
	     $('#Audience').prop('disabled', true);
	     $('#Audience').val(results[0].Audience)
	     $("#SelectiveDiv").hide();
	   }
  }
  else{
    $('#Audience').prop('disabled', false);
    $('.my_announce_department_list').removeClass('audienceDiv');
    $('#SelectivePickerDiv').removeClass('selective-Picke');
    $('.dropdown-toggle').prop('disabled',false)
    $('#Audience').prop('disabled', false);
    
  }
  
  });


