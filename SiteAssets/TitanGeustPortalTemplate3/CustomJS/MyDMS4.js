var currentSectionType = '';
var DMS_Type = '';
var DMS_Link = '';
var arrFileFolder = [];
var arrFilterTable = [];
var Documentname = '';
var CheckLibary = '';
var IsNotpermission = false;
var IsFullControl = false;
var IsContributor = false;
var IsdeleteListItems = false;
var arrCurrentColumns = [];
var MyDoctable = '';
var CopySourceURL = '';
var Filepath = ""
var IsStopInheritancePermissions = false;
var DocumentId = '';
var SelectedFileServerURL = '';
var CopyLibrary = '';
var arrPermission = [];
var FinalFiles4Upload = [];
var FinalFoldersUpload = [];
var FailDueToCheckOut = 0;
var DocUrlCollection = [];
var arrCustomCol = [];
var arrCustomColFilter = [];
var IntervalId = '';
var AllApprovers = [];
var to = [];
var RequestDigest = $("#__REQUESTDIGEST").val();
var OldFileName = '';
var arrMandatoryCols = [];
var bytesToMegaBytes = bytes => bytes / (1024 ** 2); //Convert bytes to MB
var TotalSize = 0;
var finalFiles = [];
var Tcounter = 0;
var FileCommentType = "Parent";
var FileCommentResponse= FileCommentResponse || [];
var getLatestMsgId = '';
var ModifyRecId = '';
var cmntIcon="";
$(document).ready(function () {
	//Designer methods starts -- Saurav ---------------------------------------------------------------
	// Toggle left menu //<!-- DMS left sidebar active toggle -->
	$("#menuIconBox").click(function () {
        $("#menuIconBox").toggleClass("menu-icon-active");
        $(".tab-col").toggleClass("main-menu-panel");
        $(".deta-col").toggleClass("main-deta-panel");
    });
    $(".dms-left-panel-tab").click(function () {
        $(".dms-left-panel-tab").removeClass("dms-left-panel-tab-active");
        $(this).addClass("dms-left-panel-tab-active");
    });
    $(".panel").click(function () {
        $(".panel").removeClass("active");
        $(this).addClass("active");
    });
    $(".dms-left-panel-tab-inner").click(function () {
        $(".dms-left-panel-tab-inner").removeClass("dms-left-panel-tab-active-inner");
        $(this).addClass("dms-left-panel-tab-active-inner");
    });
    //Designer methods Ends -- Saurav -------------------------------------------------------------------
     $('#expiredon').click(function () {//on 10 March 23
        $('#expiredats').addClass('activating');
    });

    $('#forever').click(function () {//on 10 March 23
        $('#expiredats').removeClass('activating');
        $("#expiredats").val('');
    });
    $(".dms-table-btn").click(function () {
        $(".dms-table-btn").removeClass("dms-table-btn-active");
        $(this).addClass("dms-table-btn-active");
    });
    userActivityNotificationEntry(_spPageContextInfo.userId,window.location);
    $('.GuestMyDocTab').click(function () {
        currentSectionType = 'GuestDocuments';
        $(".advance_setion").hide();
		$("#DMSTable,#ButtonArea,#SearchArea").show();
        waitingDialog.show();
        setTimeout(function () {
            onloadGetItem();
        }, 100);
    });
    $('#btnAddFolder').click(function () {
        waitingDialog.show();
        setTimeout(function () {
            CreateFolder(this);
        }, 100);
    });
    $('#createWordFile').click(function () {
    	$("#NewFileExtension").text(".docx");
    	$("#txtNewFileName").val('');
    	$("#dms-creat-file").modal("show");
    	$("#txtAddFileTitle").val('');
        $("#txtAddFileRef").val('');
        $("#ddlAddFileCateg").val('-Select-');
        $("#txtAddFileAuth").val(_spPageContextInfo.userDisplayName);
        $("#txtAddFileDetails").val('');
        $("#ddlAddFileSubC").empty().append('<option value="-Select-">-Select-</option>');
    	if ($('#ddlAddFileCateg option').length == 0) {
            BindDMSDocumentType();
        };
        $(".MandSignAddF").hide();
        if(currentSectionType != "My Documents"){
            for (var i = 0; i < arrMandatoryCols.length; i++) {
                $("#astAddFile"+arrMandatoryCols[i]).show();
            }
        }
        //CreatDocfromTemplateWordFile();
    });
    $('#createExcelFile').click(function () {
    	$("#NewFileExtension").text(".xlsx");
    	$("#txtNewFileName").val('');
    	$("#dms-creat-file").modal("show");
    	$("#txtAddFileTitle").val('');
        $("#txtAddFileRef").val('');
        $("#ddlAddFileCateg").val('-Select-');
        $("#txtAddFileAuth").val(_spPageContextInfo.userDisplayName);
        $("#txtAddFileDetails").val('');
        $("#ddlAddFileSubC").empty().append('<option value="-Select-">-Select-</option>');
		$(".MandSignAddF").hide();
        if(currentSectionType != "My Documents"){
            for (var i = 0; i < arrMandatoryCols.length; i++) {
                $("#astAddFile"+arrMandatoryCols[i]).show();
            }
        }

    	if ($('#ddlAddFileCateg option').length == 0) {
            BindDMSDocumentType();
        };
        //CreatDocfromTemplateExcelFile();
    });
    $('#createPPtFile').click(function () {
    	//$("#NewFileExtension").text(".ppt");
        //Bhawana
        $("#NewFileExtension").text(".pptx");
    	$("#txtNewFileName").val('');
    	$("#dms-creat-file").modal("show");
    	$("#txtAddFileTitle").val('');
        $("#txtAddFileRef").val('');
        $("#ddlAddFileCateg").val('-Select-');
        $("#txtAddFileAuth").val(_spPageContextInfo.userDisplayName);
        $("#txtAddFileDetails").val('');
        $("#ddlAddFileSubC").empty().append('<option value="-Select-">-Select-</option>');
        $(".MandSignAddF").hide();
        if(currentSectionType != "My Documents"){
            for (var i = 0; i < arrMandatoryCols.length; i++) {
                $("#astAddFile"+arrMandatoryCols[i]).show();
            }
        }

    	if ($('#ddlAddFileCateg option').length == 0) {
            BindDMSDocumentType();
        };
        //CreatDocfromTemplatePPTFile();
    });
    $('#createTextFile').click(function () {
        $("#NewFileExtension").text(".txt");
        $("#txtNewFileName").val('');
        $("#dms-creat-file").modal("show");
        $("#txtAddFileTitle").val('');
        $("#txtAddFileRef").val('');
        $("#ddlAddFileCateg").val('-Select-');
        $("#txtAddFileAuth").val(_spPageContextInfo.userDisplayName);
        $("#txtAddFileDetails").val('');
        $("#ddlAddFileSubC").empty().append('<option value="-Select-">-Select-</option>');
        $(".MandSignAddF").hide();
        if(currentSectionType != "My Documents"){
            for (var i = 0; i < arrMandatoryCols.length; i++) {
                $("#astAddFile"+arrMandatoryCols[i]).show();
            }
        }

        if ($('#ddlAddFileCateg option').length == 0) {
            BindDMSDocumentType();
        };
        //CreatDocfromTemplateNotebook();
    });
    $("#ddlAddFileCateg").change(function () {
        getSubCategory(this.value, "ddlAddFileSubC");
    });

    $('#btnCreateFiles').click(function () {
    	if(AddFileValidate() == true){
	    	waitingDialog.show();
	        setTimeout(function () {
	    		CreateOnlineFile();
	        }, 100);
	    }
	    else {
	    	alert("Kindly fill the mandatory fields.");
	    	return false;
	    }
    });
    $('#btnDownloadFiles').click(function () {
        MultipleFileDownload();
    });
    $('#btnMultipleDelete').click(function () {
        MultipleFileFolderDelete();
    }); 
    $("#prefix_and_postfix_name").click(function (e) {
        if(this.checked == true){
            $("#txtFileTitle").hide();
            $(".prefix_and_postfix_name").show();
        }
        else {
            $("#txtFileTitle").show();
            $(".prefix_and_postfix_name").hide();
        }
    });
    $('#chkReplaceVer').click(function () {
        $("#chkKeepExist").prop("checked", true);
        $("#chkKeepExist").prop("disabled", "");
        $("#chkUploadNew").prop("disabled", "");
        $(".replaceOptions").show();
        $(".RenameandUpload").hide();
    });
    
    $('#chkNotUpload').click(function () {
        $("#chkReplaceVer").attr('checked', '');
        $("#chkKeepExist").prop("checked", false);
        $("#chkKeepExist").prop("disabled", "disabled");
        $("#chkUploadNew").prop("disabled", "disabled");
        $(".replaceOptions").hide();
        $("#chkUploadNew").prop("checked", false);
        $(".RenameandUpload").hide();
    });
    $('#RenameandUpload').click(function () {
        $("#chkReplaceVer").attr('checked', '');
        $("#chkKeepExist").prop("checked", false);
        $("#chkKeepExist").prop("disabled", "disabled");
        $("#chkUploadNew").prop("disabled", "disabled");
        $(".replaceOptions").hide();
        $("#chkUploadNew").prop("checked", false);
        $(".RenameandUpload").show();
    });
    $('#RenameandUploadFolder').click(function () {
        if(this.checked){
            $(".RenameUploadFolder").show();
        }
        else {
            $(".RenameUploadFolder").hide();
        }
    });
    $("#anchFileUpload").click(function (e) {
        $("#txtFileTitle").addClass('hidemy');
        if ($('#ddlFileType option').length == 0) {
            BindDMSDocumentType();
        }
        $(".MandSign").hide();
        if(currentSectionType != "My Documents"){
            for (var i = 0; i < arrMandatoryCols.length; i++) {
                $("#ast"+arrMandatoryCols[i]).show();
            }
        }
        $("#FileSubType").empty().append('<option value="-Select-">-Select-</option>');
        $("#prefix_and_postfix_name").prop('checked', false);
        $("#txtFileTitle").show();
        $(".prefix_and_postfix_name").hide();
        $("#txtNamePostfix").val("_Copy");
        $("#txtTitlePostfix").val("");
        $("#txtTitlePrefix").val("");
        $("#txtNamePrefix").val("");
        $(".forFileOnly").show();
        $("#chkUploadMail").prop('checked', '');
        FinalFiles4Upload = [];
        FinalFoldersUpload = [];
        FailDueToCheckOut = 0;
        $("#txtUploadFiles").empty();
        $("#txtUploadFiles").hide();
        $("#txtFileTitle").val('');
        $("#txtdocumentNo").val('');
        $("#ddlFileType").val("-Select-");
        $("#FileAuthor").val(_spPageContextInfo.userDisplayName);
        $("#UploadFileComment").val('');
        $("#txtUploadFolder").html('');
        $("#txtUploadFolder").hide();
        $("#UploadHeader").text("Upload Files");
        $("#changeProperties").show();
        $("#changePropertiesFolder").hide();
        $("#FileUploadControl").show();
        $("#FolderUploadControl").hide();
        $("#AttachAttachmentButton").show();
        $("#btnFolderAttachment").hide();
        $("#folderPropertyTag").hide();
    });
    $("#anchFolderUpload").click(function (e) {
        if ($('#ddlFileType option').length == 0) {
            BindDMSDocumentType();
        }
        $(".MandSign").hide();
        if(currentSectionType != "My Documents"){
            for (var i = 0; i < arrMandatoryCols.length; i++) {
                $("#ast"+arrMandatoryCols[i]).show();
            }
        }
        $("#FileSubType").empty().append('<option value="-Select-">-Select-</option>');
        $("#txtNamePostfixFold").val("_Copy");
        $("#txtFileTitle").show();
        $(".prefix_and_postfix_name").hide();
        $(".forFileOnly").hide();
        $("#chkUploadMail").prop('checked', '');
        FinalFiles4Upload = [];
        FinalFoldersUpload = [];
        $("#txtFileTitle").val('');
        $("#txtUploadFiles").empty();
        $("#txtUploadFiles").hide();
        $("#txtdocumentNo").val('');
        $("#ddlFileType").val("-Select-");
        $("#UploadFileComment").val('');
        $("#chkFolderProp").prop('checked', '');
        $("#FileAuthor").val(_spPageContextInfo.userDisplayName);
        $("#txtUploadFolder").html('');
        $("#txtUploadFolder").hide();
        $("#UploadHeader").text("Upload Folder");
        $("#txtFileTitle").val('');
        $("#txtdocumentNo").val('');
        $("#ddlFileType").val("-Select-");
        $("#UploadFileComment").val('');
        $("#changeProperties").hide();
        $("#changePropertiesFolder").show();
        $("#FileUploadControl").hide();
        $("#FolderUploadControl").show();
        $("#AttachAttachmentButton").hide();
        $("#btnFolderAttachment").show();
        $("#folderPropertyTag").show();
    });
    $("#AttachmentUploadField").on('change', function (e) { //Upload new files
        var finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        if(FinalFiles4Upload.length == 0) {
            $('#txtUploadFiles').html('');
            $("#txtUploadFiles").hide();
        }
        finalFiles = ReinitializeArray(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.concat(finalFiles);
        var ChangedfileName = '';
        var Tcounter = $("#txtUploadFiles").find('.NewFileUpload').length;
        for (initial; initial < finalFiles.length; initial++) {
        	$("#txtUploadFiles").show();
            if (finalFiles[initial].name.length > 15) {
                Tcounter = Tcounter + 1;
                ChangedfileName = finalFiles[initial].name.substring(0, 15) + "...";
                $('#txtUploadFiles').append('<div class="NewFileUpload" title="' + finalFiles[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + finalFiles[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#txtUploadFiles').append('<div class="NewFileUpload" title="' + finalFiles[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + finalFiles[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + finalFiles[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
        }
        $("#AttachmentUploadField").val('');
    });
    
    $("#FolderAttachment").on('change', function (e) { //Upload new folders
        var finalFolder = [];
        FinalFoldersUpload = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            //if(finalFolder.filter( vendor => vendor['name'] === elm.name).length == 0){
            finalFolder[finalFolder.length] = elm;
            //}
        });
        if(FinalFoldersUpload.length == 0) {
            $('#txtUploadFolder').html('');
            $("#txtUploadFolder").hide();
        }
        finalFolder = ReinitializeArray(finalFolder);
        FinalFoldersUpload = FinalFoldersUpload.concat(finalFolder);
        var ChangedfolderName = '';	  
        this.files[0].webkitRelativePath.split('/')[0];
        $("#txtUploadFolder").show();
        if (this.files[0].webkitRelativePath.split('/')[0].length > 15) {
            ChangedfolderName = this.files[0].webkitRelativePath.split('/')[0].substring(0, 15) + "...";
            $('#txtUploadFolder').empty().append('<div class="NewFolderUpload" title="' + this.files[0].webkitRelativePath.split('/')[0] + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfolderName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;" onclick="removeLineFolder(this.id, \'' + this.files[0].webkitRelativePath.split('/')[0] + '\');" title="remove"></span></div>');
        }
        else {
            $('#txtUploadFolder').empty().append('<div class="NewFolderUpload" title="' + this.files[0].webkitRelativePath.split('/')[0] + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + this.files[0].webkitRelativePath.split('/')[0] + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;" onclick="removeLineFolder(this.id, \'' + this.files[0].webkitRelativePath.split('/')[0] + '\');" title="remove"></span></div>');
        }
        $("#FolderAttachment").val('');
    });
    
    $('#AttachAttachmentButton').click(function () {
        if(AttachmentValidation() == true){
        	if(checkFileSize() == true){
            	saveAttachment();
            }
            else {
            	if(confirm('You are trying to upload ' + TotalSize +' MB file(s). It will take couple of minutes to upload. Do you want to continue ?') == true) {
            		$("#myModalupload").modal("hide");
            		OpenLargeUpload();
            	}
            	else {
            		$("#myModalupload").modal("hide");
            		return false
            	}
            }
        }
        else {
            alert("Kindly fill mandatory fields.");
            return false;
        }
    });
    $('#btnFolderAttachment').click(function () {
        if(FinalFoldersUpload.length > 0){
            if(AttachmentValidation() == true){
                waitingDialog.show();
                setTimeout(function () {
                    uploadFolder();
                }, 100);
            }
            else {
                alert("Kindly fill mandatory fields.");
                return false;
            }
        }
        else {
            alert("Please select any folder first.");
            return false;
        }
    });
    $("#btnProperties").click(function () {
        if(arrFileFolder.length > 0) {
			$('#txtUpdateValidity').datepicker({
		        changeMonth: true,
		        changeYear: true,
		        minDate: new Date()
		    });
		    $('#txtUpdateValidity').datepicker("option", "dateFormat", "MM dd, yy");
            $("#chkUpdateTitle").prop('checked', '');
            $("#chkUpdateType").prop('checked', '');
            $("#chkUpdateRef").prop('checked', '');
            $("#chkUpdateAuthor").prop('checked', '');
            $("#chkUpdateDetails").prop('checked', '');
            $("#txtUpdateTitle").val("");
            $("#txtUpdateType").val('-Select-');
            $("#txtUpdateRef").val("");
            $("#txtUpdateAuthor").val('');
            $("#txtUpdateDetails").val("");
	
            if ($('#txtUpdateType option').length == 0) {
                BindDMSDocumentType();
            }
            $(".customCol").remove();
            var customCOlq = AddCustomColumns();
            getSingleFileProperty(arrFileFolder[0].ServerURL, arrFileFolder[0].type, arrFileFolder[0].SiteURL, customCOlq);
        }
        else {
            alert("Please select any file or folder first.");
            return false;
        }
    });
    $('#btnUpdateProp').click(function (e) {
        var checkQuery = '';
        if($('#ColumnBox').find('.customCol').length > 0) {
            for(var col=0;col<arrCustomCol.length;col++) {
                checkQuery += '&& $("#'+arrCustomCol[col].chkId+'").prop("checked") == false';
            }
        }
        if(arrFileFolder.length > 0) {
            $("#btnUpdateProp").attr('disabled', 'disabled');
            if ($("#chkUpdateTitle").prop('checked') == false && $("#chkUpdateRef").prop('checked') == false && $("#chkUpdateType").prop('checked') == false && $("#chkUpdateSubType").prop('checked') == false && $("#chkUpdateAuthor").prop('checked') == false && $("#chkUpdateValidity").prop('checked') == false && $("#chkUpdateDetails").prop('checked') == false + checkQuery) {
                $("#btnUpdateProp").prop('disabled', '');
                alert("Please select any file or folder first.");
                return false;
            }
            else {
                UpdateFileFolderProperties();
            }
        }
        else if($("#ModalDisplayProperty").css('display') != 'none') {
            $("#btnUpdateProp").attr('disabled', 'disabled');
            if ($("#chkUpdateTitle").prop('checked') == false && $("#chkUpdateRef").prop('checked') == false && $("#chkUpdateType").prop('checked') == false && $("#chkUpdateSubType").prop('checked') == false && $("#chkUpdateAuthor").prop('checked') == false && $("#chkUpdateValidity").prop('checked') == false && $("#chkUpdateDetails").prop('checked') == false + checkQuery) {
                $("#btnUpdateProp").prop('disabled', '');
                alert("Please select any file or folder first.");
                return false;
            }
            else {
                UpdateFileProperties();
            }
        }
        else {
            if($("#ModalDisplayProperty").css('display') != 'none') {
                $("#btnUpdateProp").attr('disabled', 'disabled');
                if ($("#chkUpdateTitle").prop('checked') == false && $("#chkUpdateRef").prop('checked') == false && $("#chkUpdateType").prop('checked') == false && $("#chkUpdateSubType").prop('checked') == false && $("#chkUpdateAuthor").prop('checked') == false && $("#chkUpdateValidity").prop('checked') == false && $("#chkUpdateDetails").prop('checked') == false + checkQuery) {
                    $("#btnUpdateProp").prop('disabled', '');
                    alert("Please select any file or folder first.");
                    return false;
                }
                else {
                    UpdateFileProperties();
                }
            }
            else {
                alert("Please select any file to update.");
                return false;
            }
        }
    });
    $("#txtUpdateTitle").keyup(function () {
        if(this.value.trim() != "") {
            $("#chkUpdateTitle").prop('checked', 'checked');
        }
    });
    $("#ddlFileType").change(function () {
        getSubCategory(this.value, "FileSubType");
    });
    $("#txtUpdateType").change(function () {
        if(this.value.trim() != "-Select-") {
            $("#chkUpdateType").prop('checked', 'checked');
        }
        getSubCategory(this.value, "txtUpdateSubType");
    });
    $("#ddlFilterDocType").change(function () {
        if(this.value.trim() == "All") {
            $("#ddlFilterSubType").empty().append('<option value="All">All</option>');
        }
        else{
            getSubCategory(this.value, "ddlFilterSubType");
        }
    });
    $("#txtUpdateSubType").change(function () {
        if(this.value.trim() != "-Select-") {
            $("#chkUpdateSubType").prop('checked', 'checked');
        }
    });
    $("#txtUpdateRef").keyup(function () {
        if(this.value.trim() != "") {
            $("#chkUpdateRef").prop('checked', 'checked');
        }
    });
    $("#txtUpdateAuthor").keyup(function () {
        if(this.value.trim() != "") {
            $("#chkUpdateAuthor").prop('checked', 'checked');
        }
    });
    $("#txtUpdateValidity").change(function () {
        if(this.value.trim() != "") {
            $("#chkUpdateValidity").prop('checked', 'checked');
        }
    });
    $("#txtUpdateDetails").keyup(function () {
        if(this.value.trim() != "") {
            $("#chkUpdateDetails").prop('checked', 'checked');
        }
    });
    $('.btnCloseProp').click(function (e) {
        $(".clearPropBox").val('');
        $("#txtUpdateType").val('-Select-');
        $("#txtUpdateSubType").val('-Select-');
        $(".chkProperty").prop('checked', 'checked');
        $("#txtUpdateRef").val('');
        $("#txtUpdateTitle").val('');
        $("#txtUpdateDetails").val('');
    });
    $("#divFilter").click(function () {
        if ($('#ddlFilterDocType option').length == 0) {
            BindDMSDocumentType();
        }
        $('#FilterModFrom').datepicker("destroy");
        $('#FilterModTo').datepicker("destroy");
        $('#FilterModFrom').datepicker();
        $('#FilterModTo').datepicker();
        $('#FilterModFrom').datepicker("option", "dateFormat", "MM dd, yy");
        $('#FilterModTo').datepicker("option", "dateFormat", "MM dd, yy");
        if(currentSectionType == 'Group Documents') {
            $(".customColFilter").remove();
            //AddFilterCustomColumns();
        }
        else {
            $(".customColFilter").remove();
        }
    });
    $("#btnFilterApply").click(function (e) {
        waitingDialog.show();
        setTimeout(function () {
            LibraryFilter();
        }, 100);
    });
    $(".btnFilterClear").click(function (e) {
        ClearLibraryFilter();
    });
    $('#btnDeleteFile').click(function (e) {
        if (confirm("Are you sure, you want to delete this file?")) {
            DeleteFileFromSource("DeleteFile");
        }
    });
    $('#btnChangeFileName').click(function (e) {
        if ($("#txtRenamefile").val().trim() != "") {
            RenameFile();
        }
        else {
            alert("Please enter the name first.");
            return false;
        }
    });
    $('#btnPopupNotify').click(function (e) {
        NotifyEmail();
    });
    $('#btnSendNotifyMail').click(function () {
        SendNotifyEmail();
    });
    $("#btnChangeProp").click(function () {
        //3 April 23
        $("#txtUpdateValidity").prop('readonly', true)
        $('#txtUpdateValidity').val('');
         $('#txtUpdateValidity').datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: new Date()
            });
            $('#txtUpdateValidity').datepicker("option", "dateFormat", "MM dd, yy");
            //
        if ($('#txtUpdateType option').length == 0) {
            BindDMSDocumentType();
        }
        $(".customCol").remove();
        var CustomQ = AddCustomColumns();
        getSingleFileProperty($("#FilePath").text(), 'file', CopySourceURL, CustomQ);
        //$("#btnUpdateSingleProp").show();
        //$("#btnUpdateProp").hide();
        $("#chkUpdateTitle").prop('checked', '');
        $("#chkUpdateType").prop('checked', '');
        $("#chkUpdateRef").prop('checked', '');
        $("#chkUpdateAuthor").prop('checked', '');
        $("#chkUpdateDetails").prop('checked', '');
        $("#txtUpdateTitle").val($("#FileTitle").text());
        $("#txtUpdateRef").val($("#FileReference").text());
        $("#txtUpdateType").val($("#FileDocType").text());
        $("#txtUpdateAuthor").val($("#FileAuthorPopup").text());
        $("#txtUpdateDetails").val($("#FileDetalis").text());
    });
    $('button.copyButton').click(function (e) {//Copy the URL
        e.preventDefault();
        $(this).siblings('input.linkToCopy').select();
        document.execCommand("copy");
    });
    //Add Approval Process Starts-----------
    initializePeoplePicker("ApproverName", true);
    $('#dueDateField').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: new Date()
    });
    $('#dueDateField').datepicker("option", "dateFormat", "MM dd, yy");
    $('#noDueDate').click(function () {
        if ($(this).is(':checked')) {
            $('#dueDateField').prop('disabled', true);
        }
        else {
            $('#dueDateField').prop('disabled', false);
        }
    });
    $('#noAppValidDate').click(function () {
        if ($(this).is(':checked')) {
            $('#AppValidDateField').prop('disabled', true);
            $("#AppValidDateField").val('');
        }
        else {
        	if($("#FileValidityPopup").text() != "" && $("#FileValidityPopup").text() != "null" && $("#FileValidityPopup").text() != null) {
	        	$("#AppValidDateField").val(moment(new Date($("#FileValidityPopup").text())).format("MMMM DD, YYYY"));
	        }
			else {
				$("#txtUpdateValidity").val('');
			}
            $('#AppValidDateField').prop('disabled', false);
        }
    });
    $("#btnAddStep").click(function () {
    	$("#rdoUserTitan").prop('checked', true);
    	$("#ddlAllDefinedSteps").hide();
        $("#ddlAllDefinedSteps").empty();
        $("#addsuccessor").modal('show');
        $("#AddEditStepName").val('');
        $("#SuccessorStepHeader").text("Add Step");
        $("#chkFooterSign").prop("checked", false);
        multipleEmailAddress = [];
        assignUserName = [];
        EmpIds = [];
        $("#AddSuccStep").hide();
        $("#AddEditStep").show();
        $("#btnChangeApprovers").hide();
        onChangeTask('ApproverName_TopSpan', 'ApproverName', 'userHTMLBox', 1);
        if ($("#ddlSign").val() == "Adobe Sign") {
            $("#OutsideSection").show();
            $("#UserSection").show();
            $("#UserTitanSection").hide();
            $("#RunTimeTitanSection").hide();
            $("#ddlAllDefinedSteps").hide();
        	$("#ddlAllDefinedSteps").empty();
        }
        else {
            $("#OutsideSection").hide();
            $("#UserSection").hide();
            $("#UserTitanSection").show();
            $("#RunTimeTitanSection").show();
            BindAllDefinedSteps("");
        }
    });
    $("#ddlAppStep").change(function () {
        $("#accordionapprovers").empty();
        $("#ApprovalStepBox").hide();
        if (this.value == 'Customize') {
            $(".PreDefinedTemplatesBox").hide();
            $('.customizedSteps').show();
            $(".CustomizeAddStepBox").show();
        }
        else {
            $(".PreDefinedTemplatesBox").show();
            getPredfinedTemplates();
            $('.customizedSteps').show();
            $(".CustomizeAddStepBox").hide();
        }
    });
    $("#ddlSign").change(function () {
		$("#accordionapprovers").empty();
        $("#ApprovalStepBox").hide();
        $("#userselection").prop('checked', 'checked');
        $("#userbox-1").show();
        $("#userbox-2").hide();
        $("#ddlAllDefinedSteps").empty();
        if ($("#ddlAppStep").val() != 'Customize') {
            getPredfinedTemplates();
        }
        if(this.value == "Adobe Sign"){
        	$("#ParentFooterSign").hide();
            $("#chkFooterSign").prop('checked', false);
        }
        else {
            $("#ParentFooterSign").show();
        }    
    });

    $(".radioEmp").change(function () {
        multipleEmailAddress = [];
        assignUserName = [];
        EmpIds = [];
        $(".userBox").hide();
        if (this.value == 'Outsider') {
            $("#userbox-1").hide();
            $("#userbox-2").show();
            $("#userHTMLBox").empty();
        }
        else {
            $("#userbox-1").show();
            $("#userbox-2").hide();
            $("#OutsiderName").val('');
            $("#OutsiderEmail").val('');
        }
    });
    $(".radioEmpTitanSign").change(function () {
        if (this.value == 'RunTime') {
        	$("#ApproverName").hide();
        	$("#ddlAllDefinedSteps").show();
        	EmptyPeoplePicker('ApproverName');
        }
        else {
        	$("#ApproverName").show();
        	$("#ddlAllDefinedSteps").hide();
        	$("#ddlAllDefinedSteps").empty();
        }
    });
    $("#AddEditStep").click(function () {
	    if ($.trim($("#AddEditStepName").val()) != "") {
	        if ($("#userHTMLBox").html() != "") {
	            if ($("#SuccessorStepHeader").text() == "Edit Step") {
	                EditAddedStep(multipleEmailAddress, assignUserName, EmpIds);
	            }
	            else {
	                var OtherStepDetails = [];
	                OtherStepDetails.push({
	                    ApproverType: "Specific",
	                    ApproverRole: "",
	                    ApproverDecidingStep: ""
	                });
	                AddMoreStep(multipleEmailAddress, assignUserName, EmpIds, OtherStepDetails);
	            }
	        }
	        else if ($("#rdoRunTimeTitan").prop('checked') == true) {
	        	var OtherStepDetails = [];
	            if ($("#ddlAllDefinedSteps").val() != null && $("#ddlAllDefinedSteps").val() != "") {
	                if ($("#SuccessorStepHeader").text() == "Edit Step") {
	                    EditAddedStep(multipleEmailAddress, assignUserName, EmpIds);
	                }
	                else {
	                    multipleEmailAddress.push('Runtime');
	                    EmpIds.push('');
	                    assignUserName.push($("#ddlAllDefinedSteps").val());
	                    OtherStepDetails.push({
	                        ApproverType: "Runtime",
	                        ApproverRole: "",
	                        ApproverDecidingStep: $("#ddlAllDefinedSteps").val()
	                    });
	                    AddMoreStep(multipleEmailAddress, assignUserName, EmpIds, OtherStepDetails);
	                }
	            }
	            else {
	                alert("Please enter deciding step name.");
	                return false;
	            }
	        }
	        else {
	            if ($.trim($("#OutsiderName").val()) != "" && $.trim($("#OutsiderEmail").val()) && isEmail($("#OutsiderEmail").val()) != false) {
	                if ($("#SuccessorStepHeader").text() == "Edit Step") {
	                    EditAddedStep(multipleEmailAddress, assignUserName, EmpIds);
	                }
	                else {
	                    var OtherStepDetails = [];
	                    OtherStepDetails.push({
	                        ApproverType: "Specific",
	                        ApproverRole: "",
	                        ApproverDecidingStep: ""
	                    });
	                    AddMoreStep(multipleEmailAddress, assignUserName, EmpIds, OtherStepDetails);
	                }
	            }
	            else {
	                alert("Please fill the approver's name or correct the email format.");
	                return false;
	            }
	        }
	            $(".closeAddEditModal").trigger('click');
		}
		else {
		    alert("Kindly enter the Step Name.");
		    return false;
		}
	});
    $(".closeAddEditModal").click(function () {
        $("#AddEditStepName").val("");
        multipleEmailAddress = [];
        assignUserName = [];
        EmpIds = [];
        $("#userHTMLBox").empty();
        $("#OutsiderName").val('');
        $("#OutsiderEmail").val('');
        $(".userBox").hide();
    });
    $('.btnCloseApproval').click(function (e) {
        ClearAprovalControls();
        $("#approval-modal").modal('hide');
    });
    $('#btnSubmitApproval').click(function (e) {
        if ($.trim($("#accordionapprovers").html()) == "") {
            alert("Kindly add approval steps first.");
            return false;
        }
        else {
            if ($("#noDueDate").prop('checked') == false && $("#dueDateField").val() == '') {
                alert("Kindly enter due date.");
                return false;
            }
            else if ($("#noAppValidDate").prop('checked') == false && $("#AppValidDateField").val() == '') {
                alert("Kindly enter validity.");
                return false;
            }
            else if(($("#dueDateField").val() != '' && $("#AppValidDateField").val() != '') && (new Date($("#dueDateField").val()) > new Date($("#AppValidDateField").val()))){
            	alert("Validity date must be greator than Due date.");
                return false;
            }
            else {
            	if(ApprovalStartValid() == true) {
	                $("#overlaysearch").fadeIn();
	                setTimeout(function () {
	                    UpdateDocumentStatus();
	                }, 100);
	            }
            }
        }
    });
    $("input[id$='dueDate']").click(function () {
        $('#dueDateField').removeAttr("disabled");
    });
    $('#btnApproval').click(function (e) {
		$("#approval-modal").modal('show');
        $("#ParentFooterSign").hide();
        $("#chkFooterSign").prop('checked', false);
        FinalFiles4Upload = [];
        $("#ApprovlUpload").val('');
        $('#ApprovlUploadBox').html('');
        $('#AppValidDateField').prop('disabled', true);
        $("#AppValidDateField").val('');
        $("#noAppValidDate").prop('checked', true);    
    });


    //Add Approval Process ends-----------
    $("#starffect").click(function () {
        if ($("#txtFavorite").text() == "Add to Favorite") {
            AddFavoriteFile();
        }
        else {
            DeleteFromFavourite();
        }
    });
    $("#btnRenameFile").click(function (e) {
    	OldFileName = $("#txtRenamefile").val().trim() + $("#txtFileExt").text();
    });
    $("#LiAddFolder").click(function () {
    	$("#AddFolderTitle").val('');
        $("#ddlAddFolderRef").val('');
        $("#ddlAddFolderCateg").val('-Select-');
        $("#ddlAddFolderAuth").val(_spPageContextInfo.userDisplayName);
        $("#ddlAddFolderDetails").val('');
        $("#ddlAddFolderSubC").empty().append('<option value="-Select-">-Select-</option>');
        if ($('#ddlAddFolderCateg option').length == 0) {
            BindDMSDocumentType();
        };
    });
    $("#ddlAddFolderCateg").change(function () {
        getSubCategory(this.value, "ddlAddFolderSubC");
    });
    //<!-----------------Chat Box starts ---------------------------------------->
    $("#btnCloseChatBox").click(function(){
    //5 April 23
        //waitingDialog.show();
        //setTimeout(function () {
           /*  var tempDocName = Documentname;
            if (Documentname=='Documents'== true||Documentname.includes('/Documents') == true) {
                tempDocName = "Shared%20Documents";
            }
            GetMyDocumentsWithFilesFolder(tempDocName);*/
            //waitingDialog.hide();
    	
        //}, 4000);
            
        cmntIcon="";
            //5 April 23
  });

    $("#commentText").emojioneArea({
        pickerPosition: "right",
        tonesStyle: "bullet",
        events: {
            keyup: function (editor, event) {

            }
        }
    });
    $("#replyHide").click(function () {
        $("#replyTextarea").hide();
    });
    $('#txtDocComments').click(function (e) {
        GetComments('PageLoad', "");
    });
    $('#btnAddComment').click(function (e) {
        PushRootComment();
    });
    $("#CommentFileAttach").on('change', function (e) {
        FinalFiles4Upload = [];
        //finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        $.each(this.files, function (idx, elm) {
            finalFiles[finalFiles.length] = elm;
        });

        RemoveDuplicate = [];
        var arr = finalFiles.filter(function (el) {
            if (RemoveDuplicate.indexOf(el.name) == -1) {
                RemoveDuplicate.push(el.name);
                return true;
            }
            return false;
        });

        FinalFiles4Upload = ReinitializeArray(arr);
        $('.NewSelectedAttachment').empty();
        $('#NewAttachmentFiles').empty();
        var ChangedfileName = '';

        for (initial; initial < FinalFiles4Upload.length; initial++) {
            if (RemoveDuplicate[initial].length > 15) {
                ChangedfileName = RemoveDuplicate[initial].substring(0, 15) + "...";
                $('#NewAttachmentFiles').append('<div class="comment-upload-chip" title="' + RemoveDuplicate[initial] + '" id="file_' + Tcounter + '"> <span class="comment-box-chip-text-box">' + ChangedfileName + ' </span> <span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeLine(this.id);" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#NewAttachmentFiles').append('<div class="comment-upload-chip" title="' + RemoveDuplicate[initial] + '" id="file_' + Tcounter + '"> <span class="comment-box-chip-text-box">' + RemoveDuplicate[initial] + '</span> <span class="fa fa-close fa-lg closeBtn" style="color:red;"  onclick="removeLine(this.id);" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            Tcounter = Tcounter + 1;
        }
        $("#CommentFileAttach").val('');
    });
    //<!-----------------Chat Box ends ---------------------------------------->
});

//Get Library details - Permissions and Columns to show
function GetLibarayDetails(obj, url, Title, Folder, Type) {
    /*GetLibarayRefresh = [];
    GetLibarayRefresh.push({
        Obj: obj,
        Url: url,
        Title: Title,
        Folder: Folder,
        Type: Type
    });*/
    //GlobalAnchorObj = obj;

    $("#generateBradCumbNew").empty();
    currentSectionType = Type;
    DMS_Type = Title;
    DMS_Link = url;
    arrFileFolder = [];
    $(".btnFilterClear").trigger('click');
    arrFilterTable = [];
    $(".dms-left-panel-tab-inner").removeClass("dms-left-panel-tab-active-inner");
    //$(obj).siblings().removeClass('dms-left-panel-tab-active-inner');
    //$(obj).addClass('dms-left-panel-tab-active-inner');

    const UrlLink = DMS_Link.split('/Forms')[0];
    Documentname = UrlLink.split('/')[UrlLink.split('/').length - 1];
    CheckLibary = Documentname;
    SiteUrl = UrlLink.slice(0, UrlLink.lastIndexOf("/"));
    //var breadcrumb = "javascript:GetSubFoldersChild('" + Documentname + "')";
    //$(".breadcrumb").html('');
    //$(".cont_breadcrumbs_1").show();
    //$(".breadcrumb").append('<li class="breadcrumb-item"><a href="' + breadcrumb + '">' + Documentname + '</a></li>');

    DefaultColumnName = ['Name', 'Title', 'DocumentType', 'DocumentNo', 'Modified', 'Shared', 'ApprovedByOutsider']
    SetColumnName = [];
    for (var i = 0; i < DefaultColumnName.length; i++) {
        SetColumnName.push({
            'ColumnName': DefaultColumnName[i],
        });
    }

    //Get Library permissions for logged_IN users
    if (getListUserEffectivePermissions(SiteUrl, SharedDocuments, false, '', 'i:0#.f|membership|' + _spPageContextInfo.userLoginName + '')) {
        //Do Nothing - Code Written in defined method
    }
    else {
        //Do Nothing
    }

    //get Columns to show
    var Query = "";
    var SharedDocuments = Documentname;
    if (Documentname == "Shared%20Documents") {
        SharedDocuments = "Documents";
    }
    listTitle = SharedDocuments;
    var Visibility = 1;
    Query = "?$select=*,Title,ColumnName,ColumnType,DataType,Position,DMS_Type,DMS_Link,Visibility,Id &$top=5000 &$filter=DMS_Type eq '" + DMS_Type + "'&$orderby= Position asc ";
    $.when(getItemsWithQuery("DMSColumnSetting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        $('.customTr').remove();
        $(".checkbox").prop('checked', false);
        $("#ckbFileName").prop('checked', true);
        if (valuesArray.length > 0) {
        	//check the mandatory checkboxes in Settings table
        	getMandatoryColumns(valuesArray);
        	valuesArray = valuesArray.filter(function(obj) {
                return obj.Visibility == true;
            });
            valuesArray = getUniqueListBy(valuesArray, "ColumnName");
            valuesArray.sort(function (a, b) {
                return a.Position - b.Position
            });

            var IsfileName = "";
            SetColumnName = [];
            var customColumn = "";
            var DefaultRowcolumn = "";
            IsfileName = valuesArray.filter(function (filterData) {
                return filterData.ColumnName == "Name";
            });

            DefaultRowcolumn = valuesArray.filter(function (filterData) {
                return filterData.ColumnType == "Default";
            });

            if (DefaultRowcolumn.length > 0) {
                DefaultRow(DefaultRowcolumn);
            }

            customColumn = valuesArray.filter(function (filterData) {
                return filterData.ColumnType == "Custom";
            });
            if (customColumn.length > 0) {
                addCustomRow(customColumn);
            }

            if (IsfileName.length == 0) {
                SetColumnName.push({
                    'ColumnName': "Name",
                });
                for (var i = 0; i < valuesArray.length; i++) {
                    SetColumnName.push({
                        'ColumnName': valuesArray[i].ColumnName,
                        'DataType': valuesArray[i].DataType,
                    });
                }
            } else {
                for (var i = 0; i < valuesArray.length; i++) {
                    SetColumnName.push({
                        'ColumnName': valuesArray[i].ColumnName,
                        'DataType': valuesArray[i].DataType,
                    });
                }
            }
            GenrateHtmlGrid(SetColumnName, false, "");
        }
        else {
            GenrateHtmlGrid(SetColumnName, false, "");
        }
    });
    waitingDialog.hide();
    return null;
    
}

function addCustomRow(valuesArray) {


    $('.dummyRow').remove();
    for (var i = 0; i < valuesArray.length; i++) {

        CustomRow = '<tr class="customTr">' +
            '<td class="vertical-align-middle">' +
            '<div class="checkbox mt0 checkbox-space-align">' +
            '<label><input type="checkbox" class="checkbox" value="" id="ckbCustomCol' + i + '" ></label>' +
            '</div>' +
            '</td>' +
            '<td>' + valuesArray[i].ColumnName + '</td>' +
            '<td>' + valuesArray[i].DataType + '</td>' +
            '<td style="display:none">Custom</td>' +
            '<td>' +
            '<div class="form-group custom-form-group mb0">' +
            '<select class="form-control numbers" id="ddlCustomCol' + i + '">' +

            '<option>2</option>' +
            '<option>3</option>' +
            '<option>4</option>' +
            '<option>5</option>' +
            '<option>6</option>' +
            '<option>7</option>' +
            '<option>8</option>' +
            '<option>9</option>' +
            '<option>10</option>' +
            '<option>11</option>' +
            '<option >12</option>' +
            '<option>13</option>' +
            '<option>14</option>' +
            '<option>15</option>' +
            '<option>16</option>' +
            '<option>17</option>' +

            '</select>' +
            '</div>' +
            '</td>' +
            '<td><a class="deletecustomTr"   id="' + valuesArray[i].Id + '" href="#">Delete</a></td>' +
            '</tr>';

        $("#tblColumnsSettings tr:last").before(CustomRow);

        $("#ddlCustomCol" + i + " option:selected").text(valuesArray[i].Position);
        $("#ckbCustomCol" + i + "").prop('checked', valuesArray[i].Visibility);

    }

}

function DefaultRow(valuesArray) {
    for (var i = 0; i < valuesArray.length; i++) {
        if ("Title" == valuesArray[i].ColumnName) {
            $("#ckbTitle").prop('checked', true);
        } else if ("Type" == valuesArray[i].ColumnName || "DocumentType" == valuesArray[i].ColumnName) {
            $("#ckbDocumentType").prop('checked', true);
        } else if ("Reference" == valuesArray[i].ColumnName || "DocumentNo" == valuesArray[i].ColumnName) {
            $("#ckbReferenceNumber").prop('checked', true);
        } else if ("Author" == valuesArray[i].ColumnName) {
            $("#ckbAuthor").prop('checked', true);
        } else if ("Details" == valuesArray[i].ColumnName) {
            $("#ckbDetails").prop('checked', true);
        } else if ("Modified" == valuesArray[i].ColumnName) {
            $("#ckbModifiedDate").prop('checked', true);
        } else if ("Sharing" == valuesArray[i].ColumnName || "Shared" == valuesArray[i].ColumnName) {
            $("#ckbSharing").prop('checked', true);
        } else if ("Approval" == valuesArray[i].ColumnName || "ApprovedByOutsider" == valuesArray[i].ColumnName) {
            $("#ckbApproval").prop('checked', true);
        } else if ("File Size" == valuesArray[i].ColumnName) {
            $("#ckbFileSize").prop('checked', true);
        } else {
            //$("#ckbTitle").prop('checked', true);
        }
    }
}
var arrColsPosition = [];

//Bind Columns and data in HTML table
function GenrateHtmlGrid(results, IsMyfavorate, files) {
    var html = "";
    var ColumnName = "";
    arrColsPosition = [];arrColsPosition.push(0);
    arrCurrentColumns = results.filter(function(f){return f;});
    ColumnName += '<th class="text-center border-bottom-0 w-2">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label>' +
        '</th>';
    for (var i = 0; i < results.length; i++) {
        if (results[i].ColumnName == "DocumentNo") {
            ColumnName += '<th class="noWidth" data-localize="Reference">Reference</th>';
        } 
        else if (results[i].ColumnName == "DocumentType") {
            ColumnName += '<th class="noWidth" data-localize="Category">Category</th>';
        } 
        else if (results[i].ColumnName == "ApprovedByOutsider" || results[i].ColumnName == "ApprovedBy" || results[i].ColumnName == "Approval") {
        	arrColsPosition.push(i+1);
            ColumnName += '<th class="noWidth sorting_disabled" data-localize="Approval">Approval</th>';
        } 
        else if (results[i].ColumnName == "Sharing") {
        	arrColsPosition.push(i+1);
            ColumnName += '<th class="noWidth sorting_disabled" data-localize="Sharing">Sharing</th>';
        } 
        else {
            ColumnName += '<th class="noWidth" data-localize="' + results[i].ColumnName + '">' + results[i].ColumnName + '</th>';
        }
    }
    //table thead bind
    $("#DMSTable").empty().html('<table class="table-responsive table-width tinytable table table-bordered table-striped table-hover js-basic-example dataTable no-footer sharedwithme_table maxwidthmanage" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    $("#theadItem").html("");
    $("#theadItem").append(ColumnName);
    var rowCount = 0;
    $("#groupDocumentGridtbody").html("");
    var Isdata = false;
    $.when(getItemsWithQueryUsersDocuments(Documentname, SiteUrl)).done(function(DocumentGroup) {
        var files = DocumentGroup.Files.results;
        var folders = DocumentGroup.Folders.results;
        folders.sort(function(a, b) {
            var dateA = new Date(a.TimeLastModified),
                dateB = new Date(b.TimeLastModified);
            return dateB - dateA;
        });
        files.sort(function(a, b) {
            var dateA = new Date(a.TimeLastModified),
                dateB = new Date(b.TimeLastModified);
            return dateB - dateA;
        });
        var tabledynamichtml = ""
        var Icon = "folder.png";
        var NoFile = false;
        for (var i = 0; i < folders.length; i++) {
            rowCount++;
            if (folders[i].Name != "Forms") {
                NoFile = true;
                genrateHtmlgrid(Icon, results, folders[i], rowCount, "folder", "");
            }
        }
        for (var i = 0; i < files.length; i++) {
            rowCount++;
            //var FileExtension = files[i].Name.split('.')[1];
            var FileExtension = files[i].Name.split('.').pop();//Bhawana

           // Icon = "file.png";//21 March 23
            Icon = FileExtension!=""&&FileExtension!=null?FileExtension.toLowerCase()+".png":"file.png";
            /*if ("docx" == FileExtension || "doc" == FileExtension) {
                Icon = "docx.png";
            } else if ("pdf" == FileExtension) {
                Icon = "pdf.png";
            } else if ("jpg" == FileExtension || "psd" == FileExtension || "tiff" == FileExtension || "gif" == FileExtension || "bmp" == FileExtension || "jpeg" == FileExtension || "png" == FileExtension) {
                Icon = "image-icon.png";
            } else if ("xlsx" == FileExtension) {
                Icon = "xlsx.png";
            } else if ("pptx" == FileExtension) {
                Icon = "pptx.png";
            } else if ("txt" == FileExtension) {
                Icon = "txt.png";
            } else if ("csv" == FileExtension) {
                Icon = "CSV.png";

            } else if ("zip" == FileExtension || "rar" == FileExtension || "7z" == FileExtension || "arz" == FileExtension || "cab" == FileExtension || "rpm" == FileExtension || "wim" == FileExtension) {
                Icon = "ZIP.png";

            } else if ("mp4" == FileExtension || "wmv" == FileExtension || "avi" == FileExtension || "mpeg" == FileExtension || "flv" == FileExtension || "mov" == FileExtension || "wav" == FileExtension || "ogv" == FileExtension) {
                Icon = "video-files.png";

            } else if ("mp3" == FileExtension || "wma" == FileExtension || "aac" == FileExtension || "pcm" == FileExtension) {
                Icon = "audio.png";
            }
            */
            Isdata = true;
            genrateHtmlgrid(Icon, results, files[i], rowCount, "file", "");
        }
        if (files.length == 0 && NoFile == false) {
            Isdata = false;
            var tr = $('<tr>');
            var cell = $("<td colspan='8' style='text-align: center;'>");
            cell.html("No record found.");
            tr.append(cell);
            //waitingDialog.hide();
            $("#groupDocumentGridtbody").append(tr);
        }
    });
    
    $(".chkFileFolder").click(function() {
        var Properties = this.value.split(',');
        if (this.checked == true) {
            arrFileFolder.push({
                type: Properties[0].trim(),
                ServerURL: Properties[1].trim(),
                DocumentId: Properties[2].trim(),
                SiteURL: Properties[3].trim(),
                SelectedLibrary: Properties[4].trim(),
                FileFolderName: Properties[5].trim(),
                CopyFileLink: Properties[6].trim(),
                FileTitle: Properties[7].trim(),
                FileRef: Properties[8].trim(),
                FileType: Properties[9].trim(),
                DocType: Properties[10].trim(),
                fileFilderInheritance: $(this).data('inherit')
            });
        } else {
            var selected = this.value;
            arrFileFolder = arrFileFolder.filter(function(obj) {
                return obj.DocumentId != Properties[2].trim();
            });
        }
    });
    $("#selectAllChk").click(function(e) {
        if (this.checked == true) {
            $('.chkFileFolder').prop("checked", "");
            $('.chkFileFolder').trigger('click');
        } else {
            $('.chkFileFolder').prop("checked", "");
            arrFileFolder = [];
        }
    });
    if (Isdata) {
        Tableagination();
    }
    else{
        ActionBtnControls();
        ChangeLabels();
    }
}

//method for pagination of HTML Table
function Tableagination() {
    MyDoctable = $('#groupDocumentGrid').DataTable({
    	//'columnDefs': [{ 'orderable': false, 'targets': arrColsPosition }], // hide sort icon on header of first column
        "bPaginate": true,
        "bJQueryUI": true, // ThemeRoller-stöd
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "responsive": true,
        "bProcessing": true,
        "iDisplayLength": 10,
        "dom": 'Rlfrtip',
        "colReorder": {
            'allowReorder': true
        },
        "language": {
            "searchPlaceholder": "Type to find....",
            "sSearch": ""
        }

    });

    $("#groupDocumentGrid_filter").hide();
    $('#CustomSearchMyDoc').keyup(function() {
        MyDoctable.search($(this).val()).draw();
    });
    setTimeout(function () {
    	$(".noWidth").css('width', '');
    }, 2000);
    //3 April 23
    if($('#groupDocumentGridtbody tr')[0] != null) {
		if($('#groupDocumentGridtbody tr')[0].innerText.indexOf('No record found') != -1) {
			$("#groupDocumentGrid_paginate").hide();
			$("#groupDocumentGrid_info").hide();
		}
		else {
			$("#groupDocumentGrid_info").css('display', 'inline-block');
		}
	}
	else {
		$("#groupDocumentGrid_info").css('display', 'inline-block');
	}
    //3 April 23
    ActionBtnControls();
    ChangeLabels();
}

//get And Bind Breadcrumb
function GetSubFolders(subFolderlLink) {
    var encodedeUrl = decodeURI(subFolderlLink)
    var surFoldersArray = new Array();
    var subFolders = encodedeUrl.split('/');
    var folderurls = "";
    for (var subFolderIndex = 0; subFolderIndex < subFolders.length; subFolderIndex++) {
        if (subFolders[subFolderIndex] == "Documents") {
            subFolders[subFolderIndex] = "Shared%20Documents";
        }
        if (subFolders[subFolderIndex] == CheckLibary || surFoldersArray.length > 0) {
            folderurls += subFolders[subFolderIndex] + "/";
            if (subFolders[subFolderIndex] != null && subFolders[subFolderIndex] != "") {
                surFoldersArray.push(SubFolderProperties(folderurls, subFolders[subFolderIndex]));
            }
        }
    }
    GenerateFolderNavigation(surFoldersArray);
}

function SubFolderProperties(folderUrl, folderName) {
    var folderProperties = [];
    folderProperties.folderUrl = folderUrl;
    folderProperties.folderName = folderName;
    return folderProperties;
}

//code for Folder-Navigation 
function GenerateFolderNavigation(surFoldersArray) {
    var braCummHtml = "";
    var targetServerRaltiveUrl = "";
    for (var index = 0; index < surFoldersArray.length; index++) {
        //if (index != 0)
        {
            var targetUrl = "javascript:GetMyDocumentsWithFilesFolder('" + surFoldersArray[index].folderUrl + "')";
            var targetRootUrl="javascript:ClickRoot('" + surFoldersArray[index].folderUrl + "')";//12 April 23
            if (index == 0) {
                //braCummHtml += '<li title="Root" class="mybradcumb first"><a href="' + targetUrl + '">Root</a></li>';
                braCummHtml += '<li title="Root" class="mybradcumb first"><a href="' + targetRootUrl + '">Root</a></li>';//12 April 23
            } else {
                var subfolderLengthCheck = surFoldersArray[index].folderName;
                if (subfolderLengthCheck.length > 15) {
                    subfolderLengthCheck = subfolderLengthCheck.substring(0, 14) + "...";
                }

                if (subfolderLengthCheck.length > 0) {
                    braCummHtml += '<li title="' + surFoldersArray[index].folderName + '" class="mybradcumb first"><a href="' + targetUrl + '">' + subfolderLengthCheck + '</a></li>';
                }
            }
            if (index == surFoldersArray.length - 1) {
                targetServerRaltiveUrl = surFoldersArray[index].folderUrl;
                GetMyDocumentsWithFilesFolder(targetServerRaltiveUrl);
            }
        }
    }
    var bradCumDiv = $("#generateBradCumbNew");
    bradCumDiv.html("");
    bradCumDiv.append(braCummHtml);
    ClickEventBradCumb();
}

function GetMyDocumentsWithFilesFolder(folderUrl) {
    Documentname = folderUrl;
    GenrateHtmlGrid(SetColumnName, false, "");
}
//12 April 23
function ClickRoot(folderUrll) {
    if(CheckLibary.includes("Shared%20Documents"))
    {
        folderUrll=folderUrll.replace("Shared Documents","Shared%20Documents");
    }
    if(folderUrll==CheckLibary+"/")//12 April 23
    {
        $("#generateBradCumbNew").html("");
    }
    GetMyDocumentsWithFilesFolder(folderUrll);
}

//Delete all other Navigation when click on predecessor folder.
function ClickEventBradCumb() {
    $(".mybradcumb ").unbind().click(function() {
        $(this).nextAll().remove(".mybradcumb ");
        //Create Cookies for Target Folder
    });
}

//Bind data into Table
function genrateHtmlgrid(Icon, ColumnCount, files, rowCount, Type, MethodAction) {
    if (MethodAction == "") {
        //Preparing array for Filter
        arrFilterTable.push({
            Icon: Icon,
            ColumnCount: ColumnCount,
            files: files,
            rowCount: rowCount,
            Type: Type
        });
    }
    var currentFilePermission = 'null';
    var SiteURL = DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/"));
    if (DMS_Link == '') {
        SiteURL = SiteUrl = files.SiteURL;
        if (files.ServerRelativeUrl.includes("DocumentManagementSystem") == true) {
            DMS_Type = 'My Documents';
        } else {
            DMS_Type = /[^/]*$/.exec(SiteUrl)[0];
        }
    }
    var SelectedLibrary = '';
    var CopyFileLink = '';
    var FileServerRelativeUrl = files.ServerRelativeUrl;
    if (files.ServerRelativeUrl.indexOf("Shared Documents") != -1) {
        FileServerRelativeUrl = files.ServerRelativeUrl;
        files.ServerRelativeUrl = files.ServerRelativeUrl.replace('Shared Documents', "Documents");
    } else if (files.ServerRelativeUrl.indexOf("Shared%20Documents") != -1) {
        FileServerRelativeUrl = files.ServerRelativeUrl;
        files.ServerRelativeUrl = files.ServerRelativeUrl.replace('Shared%20Documents', "Documents");
    }
    if (Documentname == "Shared%20Documents") {
        Documentname = "Documents";
    }
    if (files.ServerRelativeUrl.includes("DocumentManagementSystem") == true || files.ServerRelativeUrl.includes("DepartmentalDMS") == true) {
        if (files.ServerRelativeUrl.includes("DocumentManagementSystem") == true) {
            SelectedLibrary = "DocumentManagementSystem";
            CopyFileLink = SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(files.ServerRelativeUrl) + "&parent=" + encodeURIComponent(files.ServerRelativeUrl.substr(0, files.ServerRelativeUrl.lastIndexOf("/") + 0));
        } else {
            SelectedLibrary = "DepartmentalDMS";
            CopyFileLink = SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(files.ServerRelativeUrl) + "&parent=" + encodeURIComponent(files.ServerRelativeUrl.substr(0, files.ServerRelativeUrl.lastIndexOf("/") + 0));
        }
    } else {
        if (Documentname.indexOf('/') != -1) {
            SelectedLibrary = Documentname.split('/')[0];
        } else {
            SelectedLibrary = Documentname;
        }
        var HostName = window.location.origin + files.ServerRelativeUrl.substr(0, files.ServerRelativeUrl.lastIndexOf("/") + 0);
        CopyFileLink = HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(files.ServerRelativeUrl) + "&parent=" + encodeURIComponent(files.ServerRelativeUrl.substr(0, files.ServerRelativeUrl.lastIndexOf("/") + 0));
    }

    var DocumentId = '';
    var FileTitle = "";
    var FileRef = "";
    var FileType = '';
    var DocType = '';
    var Isinherit = '';
    if (files.ListItemAllFields != undefined) {
        DocumentId = files.ListItemAllFields.ID;
        Isinherit = files.ListItemAllFields.HasUniqueRoleAssignments
        if (files.ListItemAllFields.Title == null || files.ListItemAllFields.Title == undefined || files.ListItemAllFields.Title == "null" || files.ListItemAllFields.Title == "--select--" || files.ListItemAllFields.Title == "-Select-") {
            files.ListItemAllFields.Title = '';
        }
        FileTitle = files.ListItemAllFields.Title ? files.ListItemAllFields.Title : "";
        FileRef = files.ListItemAllFields.DocumentNo ? files.ListItemAllFields.DocumentNo : "";
        FileType = files.ListItemAllFields.DocumentType;
        DocType = files.ListItemAllFields.DocumentType;
        SubDocType =  files.ListItemAllFields.SubCategory;
        if (files.ListItemAllFields.DocumentType == null || files.ListItemAllFields.DocumentType == "null" || files.ListItemAllFields.DocumentType == "-Select-" || files.ListItemAllFields.DocumentType == "--select--") {
            DocType = '';
        }
        if (files.ListItemAllFields.SubCategory == null || files.ListItemAllFields.SubCategory == "null" || files.ListItemAllFields.SubCategory == "-Select-" || files.ListItemAllFields.SubCategory == "--select--") {
            SubDocType = '';
        }
    } else {
        if (files.Title != null && files.Title != undefined && files.Title != "undefined ") {
            FileTitle = files.Title;
        }
        if (files.Title != null && files.Title != undefined && files.Title != "undefined ") {
            FileRef = files.DocumentNo;
        }
        DocType = '';
        if (files.ItemId != null && files.ItemId != undefined) {
            DocumentId = files.ItemId;
        }
        SubDocType =  files.SubCategory;
        if (files.SubCategory == null || files.SubCategory == "null" || files.SubCategory == "-Select-" || files.SubCategory == "--select--") {
            SubDocType = '';
        }
    }
    var checkOutHTML = '';
    if (files.CheckOutType == "0") {
        checkOutHTML = '<div class="checkTypeClass" tile="" onmouseover="getcheckOutName(this, \'' + files.ServerRelativeUrl + '\');"><i class="fa fa-lock" style="font-size:24px"></i></div>';
    }
    var tr = $('<tr>' +
        '<td class="text-center">' +
        '<div class="chexbox_mg">' +
        '<input type="checkbox" data-FileServerRelativeUrl="' + FileServerRelativeUrl + '" data-inherit="' + Isinherit + '" class="chkFileFolder" value="' + Type + ', ' + files.ServerRelativeUrl + ', ' + DocumentId + ', ' + SiteURL + ', ' + SelectedLibrary + ', ' + files.Name + ', ' + CopyFileLink + ', ' + FileTitle + ', ' + FileRef + ', ' + FileType + ', ' + DocType + ', ' + SubDocType + '" id="myCheckboxgd' + rowCount + '">' +
        '<label for="myCheckboxgd' + rowCount + '">' +
        '<img onerror="showDefaultIcon(this);" width="30px" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '">' + checkOutHTML +
        '</label>' +
        '</div>' +
        '</td>');
    for (var j = 0; j < ColumnCount.length; j++) {
        var cell = "";
        if (ColumnCount[j].ColumnName == "Reference") {
            ColumnCount[j].ColumnName = "DocumentNo"
        }
        /*if (ColumnCount[j].ColumnName == "Author") {
            ColumnCount[j].ColumnName = "DocumentWrittenBy";
        }*/
        if ("Name" == ColumnCount[j].ColumnName) {

            if (Type == "folder") {
                var encodeURILink = encodeURI(files.ServerRelativeUrl)
                var documentLink = "javascript:GetSubFolders('" + encodeURILink + "')";
                cell = $('<td class="text-left">' +
                    //'<a href="' + documentLink + '">' +
                    //Bhawana
                    '<a class="dms-table-ellipsis-2" href="' + documentLink + '">' +
                    '<span class="ml-4 dms-table-ellipsis-2">' + files[ColumnCount[j].ColumnName] + '</span>' +
                    '</a>' +
                    '</td>');

            } else {
            	var NullValue = 'NullValue';
                cell = $('<td class="text-left">' +
                //Bhawana added class in anchor
                    '<a class="dms-table-ellipsis-2" href="javascript:void(0);"  data-FileServerRelativeUrl="' + FileServerRelativeUrl + '" data-inherit="' + Isinherit + '"   name="' + files.ServerRelativeUrl + '" onclick="DisplayFileProperty(\'' + SiteUrl + '\', \'' + DMS_Type + '\', \'' + currentFilePermission + '\', \'' + FileServerRelativeUrl + '\', \'' + Isinherit + '\', \'' + files.ServerRelativeUrl + '\', \'' + NullValue + '\', \'' + NullValue + '\');">' +
                    '<span class="ml-4 dms-table-ellipsis-2">' + files[ColumnCount[j].ColumnName] + '</span>' +
                    '</a>' +
                    '</td>');

            }
        } else if ("Title" == ColumnCount[j].ColumnName) {
            if (files.ListItemAllFields[ColumnCount[j].ColumnName] == null || files.ListItemAllFields[ColumnCount[j].ColumnName] == undefined || files.ListItemAllFields[ColumnCount[j].ColumnName] == "null" || files.ListItemAllFields[ColumnCount[j].ColumnName] == "--select--" || files.ListItemAllFields[ColumnCount[j].ColumnName] == "-Select-") {
                files.ListItemAllFields[ColumnCount[j].ColumnName] = '';
            }

            cell = $('<td class="text-left">' +
                '<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +

                '</td>');
            

        } else if ('Modified By' == ColumnCount[j].ColumnName) {
            if (Type == "folder") {
                var ModBy = getModifiedBy(files.ListItemAllFields.EditorId);
            } else {
                var ModBy = files.ModifiedBy.Title;
            }
            cell = $('<td class="text-left">' +
                '<div class="dms-table-ellipsis-2">' + ModBy + '</div>' +

            '</td>');
            
        } else if ('File Size' == ColumnCount[j].ColumnName) {
            if (files.ListItemAllFields.FileSizeDisplay == "null" || files.ListItemAllFields.FileSizeDisplay == null || files.ListItemAllFields.FileSizeDisplay == undefined) {
                files.ListItemAllFields.FileSizeDisplay = '';
            } else {
                files.ListItemAllFields.FileSizeDisplay = files.ListItemAllFields.FileSizeDisplay; //+ " KB";
            }
            cell = $('<td class="text-left">' +
                '<div class="dms-table-ellipsis-2">' + bytesToSize(files.ListItemAllFields.FileSizeDisplay) + '</div>' +
                '</td>');
        } else if ("ApprovedByOutsider" == ColumnCount[j].ColumnName || "ApprovedBy" == ColumnCount[j].ColumnName) {

            var ApprovedById = "Approval";

            if (files.ListItemAllFields == undefined) {
                var ApprovedDate = files.ApprovedDate;
                var DateHTML = '';
                if (ApprovedDate != null && ApprovedDate != "null" && ApprovedDate != undefined) {
                    DateHTML = '<span class="ActionDate">' + ShowCommonStandardDateFormat(ApprovedDate) + '</span>';
                } else {
                    ApprovedDate = ''
                }
                if (files.ApprovalStatus == "Approved") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.DocId + ', \'' + files.Name + '\');" title="Approved by ' + files.ApprovedBy + '" style="color: rgb(0, 128, 0);">' +
                        '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt="" data-themekey="#">' +
                        DateHTML + '</div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } else if (files.ApprovalStatus == "Reject" || files.ApprovalStatus == "Rejected") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.DocId + ', \'' + files.Name + '\');" title="Rejected by ' + files.ApprovedBy + '" style="color: rgb(255, 0, 0);">' +
                        DateHTML + '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#"></div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } 
                else if (files.ApprovalStatus == "Cancelled") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.DocId + ', \'' + files.Name + '\');" title="Cancelled by ' + files.ApprovedBy + '" style="color: rgb(255, 0, 0);">' +
                        DateHTML + '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#"></div>' +
                        '</td>');
                }
                else if (files.ApprovalStatus == "Pending") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.DocId + ', \'' + files.Name + '\');" style="color: rgb(0, 128, 0);" title="Pending">' +
                        '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt="" data-themekey="#"></div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } else {
                    cell = $('<td>' +
                        '</td>');
                }

            } else if (files.ListItemAllFields['Approval'] != undefined) {
                var ApprovedDate = files.ListItemAllFields.ApprovedDate;
                var DateHTML = '';
                if (ApprovedDate != null && ApprovedDate != "null" && ApprovedDate != undefined) {
                    DateHTML = '<span class="ActionDate">' + ShowCommonStandardDateFormat(ApprovedDate) + '</span>';
                } else {
                    ApprovedDate = ''
                }
                if (files.ListItemAllFields[ApprovedById] == "Approved") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + DocumentId + ', \'' + files.Name + '\');" title="Approved by ' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '" style="color: rgb(0, 128, 0);">' +
                        '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt="" data-themekey="#">' +
                        DateHTML + '</div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } else if (files.ListItemAllFields[ApprovedById] == "Reject") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + DocumentId + ', \'' + files.Name + '\');" title="Rejected by ' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '" style="color: rgb(255, 0, 0);">' +
                        '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#">' +
                        DateHTML + '</div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } 
                else if (files.ListItemAllFields[ApprovedById] == "Cancelled") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + DocumentId + ', \'' + files.Name + '\');" title="Cancelled by ' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '" style="color: rgb(255, 0, 0);">' +
                        '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#">' +
                        DateHTML + '</div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                }
                else {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + DocumentId + ', \'' + files.Name + '\');" style="color: rgb(0, 128, 0);" title="Pending">' +
                        '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt="" data-themekey="#"></div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                }

            } else {
                cell = $("<td />");
            }


        } else if (("Modified" == ColumnCount[j].ColumnName || "Modified Date" == ColumnCount[j].ColumnName)) {
            var Modified = "Modified";
            cell = $('<td class="text-left">' +
                '<div class="dms-table-ellipsis-2">' + ShowCommonStandardDateFormat(files.ListItemAllFields[Modified]) + '</div>' +
                '</td>');
        } 
        else if (ColumnCount[j].ColumnName == "DocumentType" || ColumnCount[j].ColumnName == "Category") {
			cell = $("<td />");
            if(files.ListItemAllFields['SubCategory'] != null && files.ListItemAllFields['SubCategory'] != "-Select-" && files.ListItemAllFields['SubCategory'] != "null") {
            	cell.html(SubDocType + " (" +DocType+")");
            }
            else {
            	cell.html(DocType);
            }
        }
        else if ("FileValidity" == ColumnCount[j].ColumnName) {
        	var VDate = '';
            if (files.ListItemAllFields[ColumnCount[j].ColumnName] == null || files.ListItemAllFields[ColumnCount[j].ColumnName] == undefined || files.ListItemAllFields[ColumnCount[j].ColumnName] == "null") {
                VDate = '';
            }
            else {
            	VDate = moment(files.ListItemAllFields[ColumnCount[j].ColumnName]).format('MMM D, YYYY');
            }

            cell = $('<td class="text-left">' +
                '<div class="dms-table-ellipsis-2">' + VDate + '</div>' +

                '</td>');
        }
        else if (('Shared' == ColumnCount[j].ColumnName || 'Sharing' == ColumnCount[j].ColumnName)) {
            var HistoryAction = "PageLoad";
            var EveryonceHTML = '';
            var ChatBoxHTML = '';
            if (files.ListItemAllFields == undefined) {
            	//to Open Chat box
            	if(Type != "folder"){
	            	if (files.CommentCount != null && files.CommentCount != "null" && files.CommentCount != 0 && files.CommentCount != "0") {
	            		ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + files.DocId + '\', \'' + files.Name + '\', \'' + files.Title + '\', \'' + files.DocumentType + '\', \'' + files.ModifiedBy+ '\', \'' + files.ModifiedEmail + '\', \'' + files.Modified + '\', \'' + SiteURL + '\',this)"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png" style="width:20px; margin:0 2px;"></span>';
	            	}
	            	else {
	            		ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + files.DocId + '\', \'' + files.Name + '\', \'' + files.Title + '\', \'' + files.DocumentType + '\', \'' + files.ModifiedBy+ '\', \'' + files.ModifiedEmail + '\', \'' + files.Modified + '\', \'' + SiteURL + '\',this)"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/Msg.png" style="width:20px; margin:0 2px;"></span>';
	            	}
            	}
                if (files.SharedId != null && files.SharedId != "null") {
                    EveryonceHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';
                    if (files.SharedWithUsersId == null && files.AccessLevel == "Everyone") {
                        cell = $('<td class="text-left" onclick="GetSharedHistory(\'' + files.DocId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' + EveryonceHTML +ChatBoxHTML +
                            '</td>');
                    } else {
                        if (files.AccessLevel == "Everyone") {
                            EveryonceHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';
                        }
                        cell = $('<td class="text-left">' +
                            '<div class="dms-table-ellipsis-2 shardHist" onclick="GetSharedHistory(\'' + files.DocId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' +
                            '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;">' + EveryonceHTML + '</div>' +ChatBoxHTML +
                            '</td>');
                    }
                } else {
                    if (files.AccessLevel == "Everyone") {
                        EveryonceHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';
                    }
                    cell = $('<td class="text-left">' + EveryonceHTML +ChatBoxHTML +
                        '</td>');
                }
            } else if (files.ListItemAllFields.SharedId != null) {
            	//to Open Chat box
            	if(Type != "folder"){
	            	if (files.ListItemAllFields.CommentCount != null && files.ListItemAllFields.CommentCount != "null" && files.ListItemAllFields.CommentCount != 0 && files.ListItemAllFields.CommentCount != "0") {
	            		 ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + DocumentId  + '\', \'' + files.Name + '\', \'' + files.ListItemAllFields.Title + '\', \'' + files.ListItemAllFields.DocumentType + '\', \'' + files.ListItemAllFields.EditorId+ '\', \'' + files.ListItemAllFields.EditorId + '\', \'' + files.ListItemAllFields.Modified + '\', \'' + SiteURL + '\',this)"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png" style="width:20px; margin:0 2px;"></span>';
	            	}
	            	else {
	            		 ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + DocumentId  + '\', \'' + files.Name + '\', \'' + files.ListItemAllFields.Title + '\', \'' + files.ListItemAllFields.DocumentType + '\', \'' + files.ListItemAllFields.EditorId+ '\', \'' + files.ListItemAllFields.EditorId + '\', \'' + files.ListItemAllFields.Modified + '\', \'' + SiteURL + '\',this)"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/Msg.png" style="width:20px; margin:0 2px;"></span>';
	            	}
            	}
                if (files.ListItemAllFields.SharedWithUsersId == null && files.ListItemAllFields.AccessLevel == "Everyone") {
                    EveryonceHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';;
                    cell = $('<td class="text-left" onclick="GetSharedHistory(\'' + DocumentId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' + EveryonceHTML +ChatBoxHTML +
                        '</td>');
                } else {
                    if (files.ListItemAllFields.AccessLevel == "Everyone") {
                        EveryonceHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';
                    }
                    cell = $('<td class="text-left">' +
                        '<div class="dms-table-ellipsis-2 shardHist" onclick="GetSharedHistory(\'' + DocumentId + '\', \'' + files.ServerRelativeUrl + '\', \'' + FileTitle + '\', \'' + FileRef + '\', \'' + files.Name + '\', \'' + Type + '\', \'' + HistoryAction + '\', \'' + currentSharedItemId + '\')">' +
                        '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;">' + EveryonceHTML + '</div>' +ChatBoxHTML +
                        '</td>');
                }
            } else {
            	if(Type != "folder"){
	            	if (files.ListItemAllFields.CommentCount != null && files.ListItemAllFields.CommentCount != "null" && files.ListItemAllFields.CommentCount != 0 && files.ListItemAllFields.CommentCount != "0") {
	            		 ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + DocumentId  + '\', \'' + files.Name + '\', \'' + files.ListItemAllFields.Title + '\', \'' + files.ListItemAllFields.DocumentType + '\', \'' + files.ListItemAllFields.EditorId+ '\', \'' + files.ListItemAllFields.EditorId + '\', \'' + files.ListItemAllFields.Modified + '\', \'' + SiteURL + '\',this)"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png" style="width:20px; margin:0 2px;"></span>';
	            	}
	            	else {
	            		 ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + DocumentId  + '\', \'' + files.Name + '\', \'' + files.ListItemAllFields.Title + '\', \'' + files.ListItemAllFields.DocumentType + '\', \'' + files.ListItemAllFields.EditorId+ '\', \'' + files.ListItemAllFields.EditorId + '\', \'' + files.ListItemAllFields.Modified + '\', \'' + SiteURL + '\',this)"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/Msg.png" style="width:20px; margin:0 2px;"></span>';
	            	}
            	}
                if (files.ListItemAllFields.AccessLevel == "Everyone") {
                    EveryonceHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;">';
                }
                cell = $('<td class="text-left">' + EveryonceHTML +ChatBoxHTML +
                    '</td>');
            }
        } else {
            cell = $("<td />");
            if (files.ListItemAllFields[ColumnCount[j].ColumnName] != undefined) {
                var ApprovedDate = files.ListItemAllFields.ApprovedDate;
                var DateHTML = '';
                if (ApprovedDate != null && ApprovedDate != "null" && ApprovedDate != undefined) {
                    DateHTML = '<span class="ActionDate">' + ShowCommonStandardDateFormat(ApprovedDate) + '</span>';
                } else {
                    ApprovedDate = ''
                }
                if (files.ListItemAllFields[ColumnCount[j].ColumnName] == "Approved") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" title="Approved by ' + files.ListItemAllFields["ApprovedByOutsider"] + '" style="color: rgb(0, 128, 0);">' +
                        '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt="" data-themekey="#" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.ListItemAllFields.ID + ', \'' + files.Name + '\');">' +
                        DateHTML + '</div>' +
                        //'<div class="dms-table-ellipsis-2">' + files.ListItemAllFields[ColumnCount[j].ColumnName] + '</div>' +
                        '</td>');
                } else if (files.ListItemAllFields[ColumnCount[j].ColumnName] == "Rejected" || files.ListItemAllFields[ColumnCount[j].ColumnName] == "Reject") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" title="Rejected by ' + files.ListItemAllFields["ApprovedByOutsider"] + '" style="color: rgb(255, 0, 0);">' +
                        '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.ListItemAllFields.ID + ', \'' + files.Name + '\');">' +
                        DateHTML + '</div>' +
                        '</td>');
                } else if (files.ListItemAllFields[ColumnCount[j].ColumnName] == "Pending") {
                    cell = $('<td class="text-left">' +
                        '<div class="detail-title ellipsis-2" style="color: rgb(0, 128, 0);" title="Pending">' +
                        '<img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt="" data-themekey="#" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + files.ListItemAllFields.ID + ', \'' + files.Name + '\');">' +
                        DateHTML + '</div>' +
                        '</td>')
                } else {

                    if (ColumnCount[j].DataType == "Date") {
                        cell.html(moment(files.ListItemAllFields[ColumnCount[j].ColumnName]).format('MMM D, YYYY'));
                    } else {

                        cell.html(files.ListItemAllFields[ColumnCount[j].ColumnName]);
                    }
                }
            }
        }
        tr.append(cell);
    }
    $("#groupDocumentGridtbody").append(tr);
}

function showDefaultIcon(img)
{
 img.src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/file.png';
}
//get MOdified by User Id
function getModifiedBy(userid) {
    var ModBy = '';
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
    var requestHeaders = {
        "accept": "application/json;odata=verbose"
    };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        async: false,
        success: function(data) {
            ModBy = data.d.Title;
            $("#CommentModEmail").text(data.d.Email);
			$("#CommentModEmail").click(function () {
		        OpenEmail(data.d.Email);
		    });
		    $("#CommentModImage").prop('src', _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(data.d.Email));
        },
        error: function(result) {
            console.log(JSON.stringify(result));
        }
    });
    return ModBy;
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    //bytes=parseInt(bytes);
    if (bytes == 0) return '';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

//get user permissions on the selected Library
function getListUserEffectivePermissions(webUrl, listTitle, Isfiles, ItemId, accountName) {
    try {
        RequestDigest = $("#__REQUESTDIGEST").val();
        if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
            $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
                RequestDigest = GetFormDigestValue
            });
        }
        var endpointUrl = "";
        if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
            $.when(GetFormDigestValue(webUrl)).done(function(GetFormDigestValue) {
                RequestDigest = GetFormDigestValue
            });
        }
        if (Isfiles) {
            endpointUrl = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items('" + ItemId + "')/getusereffectivepermissions(@u)?@u='" + encodeURIComponent(accountName) + "'";
        } else {
            endpointUrl = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/getusereffectivepermissions(@u)?@u='" + encodeURIComponent(accountName) + "'";
        }
        getJson(endpointUrl).done(function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            IsNotpermission = true;
            parseBasePermissions(data.d.GetUserEffectivePermissions);
        }).fail(function (error) {
            IsNotpermission = false;
            console.log(JSON.stringify(error));
        });
    }
    catch (err) {
        alert(err);
    }
    return IsNotpermission;
}

function parseBasePermissions(value) {
    var permissions = new SP.BasePermissions();
    permissions.initPropertiesFromJson(value);
    IsFullControl = permissions.has(SP.PermissionKind.manageLists);
    IsContributor = permissions.has(SP.PermissionKind.addListItems);
    IsdeleteListItems = permissions.has(SP.PermissionKind.deleteListItems);
    var permLevels = [];
    for (var permLevelName in SP.PermissionKind.prototype) {
        if (SP.PermissionKind.hasOwnProperty(permLevelName)) {
            var permLevel = SP.PermissionKind.parse(permLevelName);
            if (permissions.has(permLevel)) {
                permLevels.push(permLevelName);
            }
        }
    }
    return permLevels;
}

/*start json call function*/
function getJson(url) {
    return $.ajax({
        url: url,
        type: "GET",
        async: false,
        contentType: "application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest
        }
    });
}

//On click of edit button it will open edit format in Iframe
function OpenEditIframe(LINK) {
	var container = $("#File-viewer").empty();
	clearInterval(IntervalId);
	if ($("#FileName").text().match(/\.(jpeg|jpg|gif|png)$/) != null) {
		$('<iframe>', {
            src: LINK,
            id: 'iframeFile-viewer',
            frameborder: 0,
            scrolling: 'yes',
            width: '100%',
            height: '98%'
        }).appendTo(container);
	}
	else {
		$('<iframe>', {
            src: LINK,
            id: 'iframeFile-viewer',
            frameborder: 0,
            scrolling: 'yes',
            width: '100%',
            height: '98%'
        }).appendTo(container);
	}
	$("#btnApproval").hide();
	$("#btnDeleteFile").hide();
	$("#btnMoveFile").hide();
	$("#btnRenameFile").hide();
	//$("#btnPopupShare").hide();//4 April 23
	$("#btnPopupLock").hide();
	$("#btnPopupChangeprop").hide();
	IntervalId = setInterval(function () {
		$("#iframeFile-viewer").attr('style', 'min-height: calc(100vh - 104px) !important; height: calc(100vh - 104px) !important;margin-top: -58px;width: 100% !important;');
        //Bhawana start
        //To hide OOTB ribbon in txt file.
        //$("#iframeFile-viewer").contents().find(".od-TextFileEditor-topBar").remove();
		$("#iframeFile-viewer").contents().find(".root-74").remove();
		$("#iframeFile-viewer").contents().find("button[name=Delete].ms-CommandBarItem-link").remove();
		$("#iframeFile-viewer").contents().find("button[name=Download].ms-CommandBarItem-link").remove()
		$("#iframeFile-viewer").contents().find(".od-TextFileEditor-title-bar").remove();
        //End
	}, 2000);
}

//Open modal for display the file properties //getfilebyserverrelativeurl
function DisplayFileProperty(SiteURL, Library, CurrentPermission, FileServerRelUrl, Isinherit, DiaplayServerRelUrl, rel, Mode,LibUrl,MataDataReq,SharedMsg) {
    SharedMsg=fixedDecodeURIComponent(SharedMsg);//24 April 23
    //CopySourceURL = SiteURL;
    CopySourceURL = CommentSiteURL = SiteURL;//Bhawana
    if(MataDataReq==true||MataDataReq=='true')
    {
        $("#divFileViewerProperties").hide();
        $("#txtDocComments").hide();
    }
    else
    {
        $("#divFileViewerProperties").show();
        $("#txtDocComments").show();
    }

   // if (FileServerRelUrl != "NullValue" && $(".headdingLinks").text() != 'Shared with Me' && $(".headdingLinks").text() != 'Shared by Me' && $(".headdingLinks").text() != 'Archive' && $(".headdingLinks").text() != 'Advance Search')
    if (FileServerRelUrl != "NullValue" &&  currentSectionType != 'SharedWithMe' && $(".headdingLinks").text() != 'Shared by Me' && $(".headdingLinks").text() != 'Archive' && $(".headdingLinks").text() != 'Advance Search') {
        IsStopInheritancePermissions = Boolean.parse(Isinherit);
        Filepath = FileServerRelUrl;
    }
    $(".chkFileFolder").prop("checked", false);
    $('#selectAllChk').prop("checked", false);
    arrFileFolder = [];
    $("#txtFavorite").text("Add to Favorite");
    $('.unfillstar').show();
    $('.fillstar').hide();
    FavouriteId = '';
    $(".btnNotSharedTab").show();
    $("#btnPopupShare").hide();//4 April 23

    if (DiaplayServerRelUrl.search(/\bDocuments\b/) >= 0) {
        DiaplayServerRelUrl = DiaplayServerRelUrl.replace("Documents", "Shared%20Documents");
    }
    $("#modalDownloadBtn").show();
    $("#divEditView").show();
    if (CurrentPermission == "Restricted View") {
        $("#modalDownloadBtn").hide();
        $("#divEditView").hide();
    }
    var tempAction = '';
    $("#btnDeleteFile").show();
    $("#btnPopupRename").show();
    $("#btnPopupLock").show();
    $("#btnPopupChangeprop").show();
    $("#btnApproval").show();
    $(".customColModal").remove();
    var customColQ = '';
    customColQ = AddCustomColPopup();
    var webURL = SiteURL + "/_api/web/GetFileByServerRelativeUrl('" + DiaplayServerRelUrl + "')?$expand=ListItemAllFields,Author,Files/Author,Editor&$select= *,LockedByUser,CheckedOutByUser,DocumentWrittenBy,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/SubCategory,ListItemAllFields/FileValidity,ListItemAllFields/DocumentType,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," + customColQ +
        "ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Acknowledgement,ListItemAllFields/Title,ListItemAllFields/Approval,ListItemAllFields/FileLeafRef,ListItemAllFields/ServerRedirectedEmbedUri,ListItemAllFields/Modified_x0020_By";
    while (customColQ.indexOf("ListItemAllFields/") != -1) {
        customColQ = customColQ.replace("ListItemAllFields/", "");
    }
    customColQ = customColQ.substring(0, customColQ.length - 1);
    $.ajax({
        url: webURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var FileValue = data.d.ListItemAllFields;
            var propertiesServerRelativeUrl = FileValue.ServerRedirectedEmbedUri;
            DocumentId = data.d.ListItemAllFields.Id;
            SelectedFileServerURL = tempAction = DiaplayServerRelUrl;

            FileCheckOutBy = getCheckedOutBy();
            if (_spPageContextInfo.userDisplayName != FileCheckOutBy && FileCheckOutBy != "" && FileCheckOutBy != null) {
                $("#lockeffect .texthere").text("Unlock");
                $("#lockeffect").hide();
                $("#LockStatus").show();
                $("#LockStatus").text("Locked by: " + FileCheckOutBy);
                $('#lockeffect .unlock').hide();
                $('#lockeffect .lock').show();
                $("#lockeffect").attr("disabled", "disabled");
                $(".LockDisable").attr("disabled", "disabled");
                $("#lockeffect").attr("disabled", "disabled");
                $("#divEditView").hide();
                $("#btnChangeProp").hide();
                $("#btnApproval").hide();
                if (FilePermissions == 'Full Control') {
                    $("#btnUndoLock").show();
                }
            } else {
                if (_spPageContextInfo.userDisplayName == FileCheckOutBy) {
                    $("#LockStatus").show();
                    $("#LockStatus").text("Locked by me");
                    $("#lockeffect .texthere").text("Unlock");
                    $(".LockDisable").attr("disabled", "disabled");
                    $("#btnChangeProp").hide();
                    $("#btnApproval").hide();
                } else {
                    $("#lockeffect .texthere").text("Lock");
                    $("#LockStatus").hide();
                    $(".LockDisable").prop("disabled", "");
                    $("#btnChangeProp").show();
                    if (CurrentPermission != "Restricted View") {
                        $("#divEditView").show();
                    }
                }
                $("#lockeffect").prop("disabled", "");
            }

            if (propertiesServerRelativeUrl == null) {
                propertiesServerRelativeUrl = window.location.origin + DiaplayServerRelUrl;

                if (DiaplayServerRelUrl.includes("DocumentManagementSystem") == true || DiaplayServerRelUrl.includes("DepartmentalDMS") == true) {
                    if (DiaplayServerRelUrl.includes("DocumentManagementSystem") == true) {
                        CopyLibrary = "DocumentManagementSystem";
                        $(".txtCopyLink").val(SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(DiaplayServerRelUrl) + "&parent=" + encodeURIComponent(DiaplayServerRelUrl.substr(0, DiaplayServerRelUrl.lastIndexOf("/") + 0)));
                    } else {
                        CopyLibrary = "DepartmentalDMS";
                        $(".txtCopyLink").val(SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(DiaplayServerRelUrl) + "&parent=" + encodeURIComponent(DiaplayServerRelUrl.substr(0, DiaplayServerRelUrl.lastIndexOf("/") + 0)));
                    }
                } else {
                    if (DiaplayServerRelUrl.search(/\bDocuments\b/) >= 0 || Documentname == undefined || Documentname == '') {
                        CopyLibrary = "Documents";
                        Documentname = '';
                    }
                    else {
                        if (Documentname.indexOf('/') != -1) {
                            CopyLibrary = Documentname.split('/')[0];
                        } else {
                            CopyLibrary = Documentname;
                        }
                    }
                    var HostName = window.location.origin + DiaplayServerRelUrl.substr(0, DiaplayServerRelUrl.lastIndexOf("/") + 0);
                    $(".txtCopyLink").val(HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(DiaplayServerRelUrl) + "&parent=" + encodeURIComponent(DiaplayServerRelUrl.substr(0, DiaplayServerRelUrl.lastIndexOf("/") + 0)));
                }
            } else {
                if (DiaplayServerRelUrl.includes("DocumentManagementSystem") == true) {
                    CopyLibrary = "DocumentManagementSystem";
                } else if (DiaplayServerRelUrl.includes("DepartmentalDMS") == true) {
                    CopyLibrary = "DepartmentalDMS";
                } else {
                    if (DiaplayServerRelUrl.search(/\bDocuments\b/) >= 0 || Documentname == undefined || Documentname == '') {
                        CopyLibrary = "Documents";
                        Documentname = '';
                    }
                    else {
                        if (Documentname.indexOf('/') != -1) {
                            CopyLibrary = Documentname.split('/')[0];
                        } else {
                            CopyLibrary = Documentname;
                        }
                    }
                }
                $(".txtCopyLink").val(propertiesServerRelativeUrl);
            }

            $("#DownloadDocs").prop("href", window.location.origin + DiaplayServerRelUrl);
            $("#btnFileFullView").prop("href", propertiesServerRelativeUrl);
            if (FileValue.FileLeafRef.includes(".pdf") == true||FileValue.FileLeafRef.includes(".dwg") == true) {//to check if it's PDF
                if (DiaplayServerRelUrl.search(/\bShared%20Documents\b/) >= 0) {
                    tempAction = DiaplayServerRelUrl.replace('Shared%20Documents', "Shared Documents");
                }
                var PDFLINK='';
                if(LibUrl!='undefined' && LibUrl!=undefined && LibUrl!=null &&LibUrl!='')//Bhawana
               { 
               PDFLINK= LibUrl +"/Forms/AllItems.aspx?id=" + encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";
                propertiesServerRelativeUrl=LibUrl +"/Forms/AllItems.aspx?id=" + encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";
            }
            else
            {
                PDFLINK = DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";
                propertiesServerRelativeUrl= DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";               
            }
                $(".txtCopyLink").val(PDFLINK);
                $("#divEditView").empty().append('<a href="javascript:void(0);" id="btnEditViewFile"><button class="btn dropdown-toggle LockDisable" type="button" id="FileEditModal"><i class="fa fa-edit"></i><span data-localize="Edit">Edit</span></button></a>');
                EditFileLink = PDFLINK;
                $("#btnEditViewFile").click(function () {
                    OpenEditIframe(PDFLINK);
                });
            }
            else if (FileValue.FileLeafRef.includes(".txt") == true) {//to check if it's txt 
                if (DiaplayServerRelUrl.search(/\bShared%20Documents\b/) >= 0) {
                    tempAction = DiaplayServerRelUrl.replace('Shared%20Documents', "Shared Documents");
                }
                var txtLINK='';
                if(LibUrl!='undefined' && LibUrl!=undefined && LibUrl!=null &&LibUrl!='')//Bhawana
               { 
               propertiesServerRelativeUrl= LibUrl +"/Forms/AllItems.aspx?id="+ encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";
                txtLINK = LibUrl +"/Forms/AllItems.aspx?id="+ encodeURIComponent(tempAction) + "&parent=" + encodeURIComponent(DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=5";        
               }
               else{
                propertiesServerRelativeUrl = DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";
                txtLINK = DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + encodeURIComponent(DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=5";        }
                $(".txtCopyLink").val(txtLINK);
                $("#divEditView").empty().append('<a href="javascript:void(0);" id="btnEditViewFile"><button class="btn dropdown-toggle LockDisable" type="button" id="FileEditModal"><i class="fa fa-edit"></i><span data-localize="Edit">Edit</span></button></a>');
                EditFileLink = txtLINK;
                $("#btnEditViewFile").click(function () {
                    OpenEditIframe(txtLINK);
                });
            }
            else {
                if (FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1) == "xlsx" || FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1) == "xls" || FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1) == "csv") {
                    propertiesServerRelativeUrl = propertiesServerRelativeUrl.replace('interactivepreview', 'view&wdAccPdf=0&wdEmbedFS=1');
                    $(".txtCopyLink").val(propertiesServerRelativeUrl);
                    $("#btnFileFullView").prop("href", propertiesServerRelativeUrl);
                }
                $("#divEditView").empty().append('<a href="javascript:void(0);" id="btnEditViewFile"><button class="btn dropdown-toggle LockDisable" type="button" id="FileEditModal"><i class="fa fa-edit"></i><span data-localize="Edit">Edit</span></button></a>');
                if (FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1) == "docx") {
                    EditFileLink = propertiesServerRelativeUrl.replace('interactivepreview', 'edit&wdAccPdf=0&wdEmbedFS=1');
                    $("#btnEditViewFile").click(function () {
                        OpenEditIframe(EditFileLink);
                    });
                }
                else {
                    EditFileLink = propertiesServerRelativeUrl.replace('interactivepreview', 'view&wdAccPdf=0&wdEmbedFS=1');
                    $("#btnEditViewFile").click(function () {
                        OpenEditIframe(EditFileLink);
                    });
                }
            }

            var container = $("#File-viewer").empty();
            if (FileValue.FileLeafRef.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                if (CurrentPermission == 'Restricted View') {
                    if (DiaplayServerRelUrl.search(/\bShared%20Documents\b/) >= 0) {
                        tempAction = DiaplayServerRelUrl.replace('Shared%20Documents', "Shared Documents");
                    }
                    var ImageLINK='';
                    if(LibUrl!='undefined' && LibUrl!=undefined && LibUrl!=null &&LibUrl!='')//Bhawana
                    { 
                        ImageLINK = LibUrl +"/Forms/AllItems.aspx?id=" + encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";
                                
                    }
                    else 
                    ImageLINK = DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";
                    $(".txtCopyLink").val(ImageLINK);
                    $('<iframe>', {
                        src: ImageLINK,
                        id: 'iframeFile-viewer',
                        frameborder: 0,
                        scrolling: 'yes',
                        width: '100%',
                        height: '98%'
                    }).appendTo(container);
                    $("#btnFileFullView").prop("href", ImageLINK);
                }
                else {
                    $('#File-viewer').html("<div class='FlexingBox'><img class='AdjustingSize' src='" + propertiesServerRelativeUrl + "'/></div>");
                }
            }
            else {
                var Extension = FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1);//data.d.ListItemAllFields.FileLeafRef.substr(data.d.ListItemAllFields.FileLeafRef.length - 3)
                if (Extension == "csv" || Extension == "wmv" || Extension == "avi" || Extension == "mp3" || Extension == "mp4" || Extension == "webm" || Extension == "wma" || Extension == "one" || Extension == "tif" || Extension == "tiff" || Extension == "pdf" || Extension == "mov") {
                    propertiesServerRelativeUrl = $(".txtCopyLink").val();
                }
                else {
                    if (CurrentPermission == 'Restricted View') {
                        propertiesServerRelativeUrl = EditFileLink;
                        $(".txtCopyLink").val(EditFileLink);
                        if (Extension == "pptx") {
                            propertiesServerRelativeUrl = $(".txtCopyLink").val()
                        }
                        $("#btnFileFullView").prop("href", EditFileLink);
                    }
                }
                if (Mode == 'EditMode') {
                    propertiesServerRelativeUrl = EditFileLink;
                }

                //Bind File in Iframe
                $('<iframe>', {
                    src: propertiesServerRelativeUrl,
                    id: 'iframeFile-viewer',
                    frameborder: 0,
                    scrolling: 'yes',
                    width: '100%',
                    height: '98%'
                }).appendTo(container);
            }
            if (FileValue.SecurityLevel == null || FileValue.SecurityLevel == "Private") {
                if (FileValue.AccessLevel == 'Everyone') {
                    $('#FileSharing').text("Shared with Everyone");
                    $(".txtSharingHistoy").show();
                }
                else {
                    FileValue.SecurityLevel = "Not shared";
                    $('#FileSharing').text(FileValue.SecurityLevel);
                    $(".txtSharingHistoy").hide();
                }
            }
            else {
                $('#FileSharing').text("Shared with " + FileValue.SecurityLevel);
                $(".txtSharingHistoy").show();
            }
            if ($('.headdingLinks').text() == "Shared by Me") 
            {
                $(".btnNotSharedTab").hide();
                $(".txtSharingHistoy").show();
                getSharingInfo(DocumentId);
            }
            //else if ($('.headdingLinks').text() == "Shared with Me")
            else if (currentSectionType == "SharedWithMe") {
                $(".btnNotSharedTab").hide();
                getSingleShareInfo(DocumentId, rel);
            }            //Custom Column
            var tempCustom = [];
            if (customColQ != '') {
                tempCustom = customColQ.split(',');
                for (cus = 0; cus < tempCustom.length; cus++) {
                    if (new Date(FileValue[tempCustom[cus]]) != "Invalid Date") {
                        if (FileValue[tempCustom[cus]] != null && FileValue[tempCustom[cus]] != "null") {
                            $("#CustomPopup" + tempCustom[cus]).text(ShowCommonStandardDateFormat(FileValue[tempCustom[cus]]));
                        }
                    }
                    else {
                        $("#CustomPopup" + tempCustom[cus]).text(FileValue[tempCustom[cus]] ? FileValue[tempCustom[cus]] : "");
                    }
                }
            }
            //Bhawana
            //strt
           // $('#FileTitle').text(FileValue.Title ? FileValue.Title : "");
            $('#CommentFileTitle').text(FileValue.Title ? FileValue.Title : "");
            if (FileValue.SubCategory != "--select--" && FileValue.SubCategory != null && FileValue.SubCategory != "-Select-") {
                $('#FileDocSubType').text(FileValue.SubCategory);
                if (FileValue.DocumentType != "--select--" && FileValue.DocumentType != null && FileValue.DocumentType != "-Select-") {
                    $('#FileDocType').text(" (" + FileValue.DocumentType + ")");
                    $('#CommentFileDocType').text(FileValue.DocumentType);
                }
                else {
                    $('#CommentFileDocType').text('');
                    $('#FileDocType').text('');
                }
            }
            else {
                $('#FileDocSubType').text('');
                if (FileValue.DocumentType != "--select--" && FileValue.DocumentType != null && FileValue.DocumentType != "-Select-") {
                    $('#FileDocType').text(FileValue.DocumentType);
                    $('#CommentFileDocType').text(FileValue.DocumentType);
                }
                else {
                    $('#CommentFileDocType').text('');
                }

            }
             $('#CommentFileName').text(FileValue.FileLeafRef);
           $('#FileLastModified').text( ShowCommonStandardDateFormat(FileValue.Modified));
            $('#FileLastModifiedBy').text(GetUserFullName(FileValue.Modified_x0020_By));
            $('#CommentModify').text($('#FileLastModifiedBy').text());
            $('#CommentModTime').text($('#FileLastModified').text());
            $("#CommentModEmail").text("");
            $("#CommentModEmail").text(FileValue.Modified_x0020_By.split('|')[2]);            
	        $("#CommentModImage").prop('src', _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(FileValue.Modified_x0020_By.split('|')[2]));
            $("#CommentModEmail").click(function () {
                OpenEmail(FileValue.Modified_x0020_By.split('|')[2]);
            });
            //end
            if(MataDataReq==true)
            {
                $('#FileTitle').text(FileValue.Title ? FileValue.Title : "");
                if (FileValue.DocumentType != "--select--" && FileValue.DocumentType != null && FileValue.DocumentType != "-Select-") {
                    $('#FileDocType').text(FileValue.DocumentType);
                }
                $('#FileReference').text(FileValue.DocumentNo ? FileValue.DocumentNo : "");
                $('#FileAuthorPopup').text(FileValue.DocumentWrittenBy ? FileValue.DocumentWrittenBy : "");
                $('#FileDetalis').text(FileValue.Details ? FileValue.Details : "");
                if (FileValue.FileValidity != null && FileValue.FileValidity != "" && FileValue.FileValidity != "null") {
                    $('#FileValidityPopup').text(moment(FileValue.FileValidity).format('MMM D, YYYY'));
                }
                else {
                    $('#FileValidityPopup').text("");
                }

            }
            $("#lblSharingMsg").text(SharedMsg!=undefined&&SharedMsg!=null&&SharedMsg!='undefined'&&SharedMsg!='null'?SharedMsg:"");//17 jan 23
            $('#FileApproval').text(FileValue.Approval ? FileValue.Approval : "");
            $(".FileApprovalPDF").empty();
            if (FileValue.Approval == "Approved") {
                FinalApprovalFile('');
                $(".ApproveSign").show();
                $(".RejectSign").hide();
                $("#FileApproval").css('color', 'Green');
            }
            else if (FileValue.Approval == "Reject" || FileValue.Approval == "Rejected") {
                $(".RejectSign").show();
                $(".ApproveSign").hide();
                $("#FileApproval").css('color', 'Red');
            }
            else {
                $(".RejectSign").hide();
                $(".ApproveSign").hide();
                $("#FileApproval").css('color', 'Black');
            }

            if (FileValue.Approval != "" && FileValue.Approval != null) {
                if ($("#btnChangeProp").css('display') != "none") {
                    //$("#btnApproval").hide();
                }
                $(".btnApprovalDetails").show();
            }
            else {
                if ($("#btnChangeProp").css('display') != "none") {
                    $("#btnApproval").show();
                }
                $(".btnApprovalDetails").hide();
            }
            $('#FilePath').text(DiaplayServerRelUrl);
            $('#FileName').text(FileValue.FileLeafRef);
            $('#txtRenamefile').val(FileValue.FileLeafRef.split('.').slice(0, -1).join('.'));
            $("#txtFileExt").text("." + FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1));
            //$('#FileLastModified').text(moment(FileValue.Last_x0020_Modified).format('DD-MM-YYYY HH:MM:SS'));
            //$('#FileLastModifiedBy').text(GetUserFullName(FileValue.Modified_x0020_By));
            //$('#FileSize').text(FileValue.FileSizeDisplay + " KB");
            $('#FileSize').text(bytesToSize(FileValue.FileSizeDisplay));
            $('#LibProject').text(Library);
            //PermissionsControl(FileValue);
            IntervalId = setInterval(function () {
                $("#iframeFile-viewer").contents().find(".OneUp-commandBar").remove();
                $("#iframeFile-viewer").contents().find(".AppHeaderPanel").remove();
                $("#iframeFile-viewer").contents().find(".WACRibbonPanel").remove();
                if (Mode == 'EditMode' || Extension == "xlsx") {
                    $("#iframeFile-viewer").attr('style', 'min-height: calc(100vh - 104px) !important; height: calc(100vh - 104px) !important;margin-top: -58px;width: 100% !important;');
                }
                //Bhawana start
                if (Mode == 'EditMode' || Extension == "txt") {
	                $("#iframeFile-viewer").contents().find(".root-74").remove();
					$("#iframeFile-viewer").contents().find("button[name=Delete].ms-CommandBarItem-link").remove();
					$("#iframeFile-viewer").contents().find("button[name=Download].ms-CommandBarItem-link").remove()
				}
                //End
            }, 2000);
           // if ($(".headdingLinks").text() == 'Shared with Me' || $(".headdingLinks").text() == 'Shared by Me' || $(".headdingLinks").text() == 'Archive')
            $("#liSahringMsg").hide();//17 jan 23
            if(currentSectionType == "SharedWithMe") {
                $(".ShareSectionAct").show();
                $(".otherSectAct").hide();
                $(".btnNotSharedTab").hide();
                 $("#liSahringMsg").show();//17 jan 23
                 //10 April 23
                if(CurrentPermission!=undefined&&CurrentPermission!=null&&CurrentPermission!="undefined"&&CurrentPermission!='null')
                {
                    if(CurrentPermission=="Full Control"||CurrentPermission=="Contribute")
                    {
                        $("#VerHisParent").show();
                         $("#AuditHisParent").show();
                    }
                }
            
                //10 April 23
            }
            else {
                $(".ShareSectionAct").hide();
                $(".otherSectAct").show();
                $(".btnNotSharedTab").show();
                $("#btnPopupShare").hide();//4 April 23

            }
            if (currentSectionType != 'SharedWithMe' && currentSectionType != 'SharedByMe' && currentSectionType != 'Archive') {
                getListUserEffectivePermissions(SiteURL, listTitle, true, DocumentId, 'i:0#.f|membership|' + _spPageContextInfo.userPrincipalName + '');
                if (IsNotpermission == true) {
                    if (IsContributor == true && IsFullControl == false) { //Contributor
                        $("#btnDeleteFile").show();
                        $("#divEditView").show();
                        $("#btnPopupRename").show();
                        $("#btnPopupLock").show();
                        $("#btnPopupChangeprop").show();
                        $("#btnApproval").show();
                    }
                    else if (IsContributor == false && IsFullControl == false) { //Reader
                        $("#btnDeleteFile").hide();
                        $("#divEditView").hide();
                        $("#btnPopupRename").hide();
                        $("#btnPopupLock").hide();
                        $("#btnPopupChangeprop").hide();
                        $("#btnApproval").hide();
                    }
                    if (IsdeleteListItems == true) {
                        $("#btnDeleteFile").show();
                    }
                }
                else {
                    if (arrPermission.length > 0) {
                        if (arrPermission[0].UserContri == true) {
                            $("#btnDeleteFile").show();
                            $("#btnPopupRename").show();
                            if (CurrentPermission != "Restricted View") {
                                $("#divEditView").show();
                            }
                            $("#btnPopupLock").show();
                            $("#btnPopupChangeprop").show();
                            $("#btnApproval").show();
                        }
                        else if (arrPermission[0].UserReader == true) {
                            $("#btnDeleteFile").hide();
                            $("#btnPopupRename").hide();
                            $("#divEditView").hide();
                            $("#btnPopupLock").hide();
                            $("#btnPopupChangeprop").hide();
                            $("#btnApproval").hide();
                        }
                    }
                }
            }
            $('#FileVersion').text(data.d.UIVersionLabel);
            GetFileVersion(DiaplayServerRelUrl, SiteURL, FileValue.FileLeafRef, FileValue.Title ? FileValue.Title : "");
            AddFileViewCount();
            if (Mode == 'EditMode') {
                $("#btnApproval").hide();
                $("#btnDeleteFile").hide();
                $("#btnMoveFile").hide();
                $("#btnRenameFile").hide();
                //$("#btnPopupShare").hide();//4 April 23
                $("#btnPopupLock").hide();
                $("#btnPopupChangeprop").hide();
            }
            else {
                $("#btnApproval").show();
                $("#btnMoveFile").show();
                $("#btnRenameFile").show();
                //$("#btnPopupShare").show();//4 April 23
                $("#btnPopupLock").show();
                $("#btnDeleteFile").show();
                $("#btnPopupChangeprop").show();
            }
        },
        eror: function (data) {
            $('#ModalDisplayProperty').modal('show');
            console.log(JSON.stringify(data));
            //if ($(".headdingLinks").text() == "Shared by Me" || $(".headdingLinks").text() == "Shared with Me" || $(".headdingLinks").text() == "Archive") 
            if(currentSectionType == "SharedWithMe"){
                $(".btnNotSharedTab").hide();
            }
            else {
               $(".btnNotSharedTab").show();
                $("#btnPopupShare").hide();//4 April 23

            }
        }
    }).fail(function (error) {
        if (DiaplayServerRelUrl.search(/\bDocuments\b/) >= 0) {
            alert('Attempted to perform an unauthorized operation');
        }
        else {
            alert(error.responseJSON.error.message.value);
        }
        //if ($(".headdingLinks").text() == "Shared by Me" || $(".headdingLinks").text() == "Shared with Me" || $(".headdingLinks").text() == "Archive") 
        if(currentSectionType == "SharedWithMe")
        {
            $(".btnNotSharedTab").hide();
        }
        else {
            $(".btnNotSharedTab").show();
            $("#btnPopupShare").hide();//4 April 23

        }
        return false;
    });
    $("#btnShareFile").hide();
    $("#btnChangeProp").hide();
}

//get sharing Info for 'Shared By Me'
function getSharingInfo(DocId) {
    $("#ParentAck").hide();
    var Query = "?$select=*,Author/Title,SharedUsers/Title&$expand=Author,SharedUsers&$orderby=Created desc&$filter=DocumentID eq '" + DocId + "' and (PermissionStatus ne 'Revoked' or PermissionStatus ne 'Deleted')";
    $.when(getItemsWithQuery('SharedDocument', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SharingInfo) {
        if (SharingInfo.length > 0) {
            currentSharedItemId = '';
            $("#txtShareBy").text(SharingInfo[SharingInfo.length - 1].Author.Title);
            $("#txtShareOn").text(ShowCommonStandardDateFormat(SharingInfo[SharingInfo.length - 1].Created));
            $("#txtSharePermission").text(SharingInfo[SharingInfo.length - 1].PermissionType);
            $("#ShareTabSharing").text("Shared with " + SharingInfo[SharingInfo.length - 1].SharedUsers.results[0].Title);
        }
    });
}
//Close DisplayFile Modal
function Closepopup() {
    clearInterval(IntervalId);
    $("#File-viewer").empty();
    IsNotpermission = false;
    IsdeleteListItems = false;
    IsContributor = false;
    IsFullControl = false;
}

//to get file version
function GetFileVersion(itemURL, SiteURL, FileName, Title) {
    //var webURL = SiteURL + "/_api/Web/GetFileByServerRelativeUrl('" + itemURL + "')/Versions?$select=*,CreatedBy/Title,CreatedBy/EMail&$expand=CreatedBy";
    var webURL = SiteURL + "/_api/Web/GetFileByServerRelativePath(decodedurl='" + fixedEncodeURIComponent(itemURL) + "')/Versions?$select=*,CreatedBy/Title,CreatedBy/EMail&$expand=CreatedBy";
    
    $.ajax({
        url: webURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var itemsVersion = data.d.results;
            $("#VerHisParent").empty().append('<a class="detail-panel-inner-link" href="javascript:void(0);" id="btnVerHist">Version History</a>');
            $('#btnVerHist').click(function (e) {
                BindVersionHistory(itemsVersion, FileName, Title, SiteURL);
            });
			$("#AuditHisParent").empty().append('<a class="detail-panel-inner-link" href="javascript:void(0);" id="btnAuditHist">Audit Trail</a');
            $('#btnAuditHist').click(function (e) {
                GetAuditHistory(itemURL, SiteURL, FileName, Title);
            });
            /*if (itemsVersion.length > 0) {
                $('#FileVersion').text(itemsVersion[itemsVersion.length - 1].VersionLabel);
            }*/

            $('#ModalDisplayProperty').modal('show');
            checkFavoriteFile();
        },
        eror: function (data) {
            $('#ModalDisplayProperty').modal('show');
            console.log(JSON.stringify(data));
        }
    }).fail(function (error) {
        if (error.responseJSON.error.message.value == "Access denied.") {
            $("#VerHisParent").empty().append('<a class="detail-panel-inner-link" href="javascript:void(0);" id="btnVerHist">Version History</a>');
            $('#btnVerHist').click(function (e) {
                alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
                return false;
            });
        }
        else {
            console.log(error.responseJSON.error.message.value);
            checkFavoriteFile();
        }
        $('#ModalDisplayProperty').modal('show');
    });
    setTimeout(function () {
        var storing = $(".AdjustingSize").width();
        if (storing >= 600) {
            $(".AdjustingSize").css('width', '100%');
        } else {
            $(".AdjustingSize").css('width', 'auto');
        }
        if ($('#iframeFile-viewer').contents().find('body').html() == "") {
            $("#File-viewer").empty();
            var htmlNotAuthorized = '<div class="col-md-12">' +
                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                '<span><h2 class="text-center">No preview available. File has been downloaded.</h2></span>';
            $('#File-viewer').append('<div width="100%" id="viewMyDocuments" style="min-height:750px;padding-top:0px">' + htmlNotAuthorized + '</div>');
        }
    }, 2000);
}

//get Audit File History
function GetAuditHistory(itemURL, SiteURL, FileName, Title) {
    var container = $("#bdyAuditHist").empty();
    var tempLib = CopyLibrary;
    if (tempLib == "Shared%20Documents" || tempLib == "Shared Documents") {
        tempLib = "Documents";
    }
    jQuery.ajax(
    {
        url: SiteUrl + "/_api/web/lists/getbytitle('" + tempLib + "')?$select=Id",
        type: "GET",
        async: false,
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data, textStatus, xhr) {
            var versionsUrl = SiteUrl + '/_layouts/versions.aspx?list=' + data.d.Id + '&ID=' + DocumentId;
            $('<iframe>', {
                src: versionsUrl,
                id: 'Audit-viewer',
                frameborder: 0,
                scrolling: 'yes',
                width: '100%',
                height: '98%'
            }).appendTo(container);
            $("#AuditHistory").modal('show');
            setInterval(function () {
                $("#Audit-viewer").contents().find("#titlerow").remove();
                $("#Audit-viewer").contents().find(".ms-belltown-anonShow").remove();
            }, 1000);
        },
        error: function (data, textStatus, xhr) {
            console.error("Error.");
        }
    });

}

//Bind The Version History on any selected file.
function BindVersionHistory(array, FileName, Title, URL) {
    var Version = '';
    $("#VerHisFile").text(FileName);
    $("#VerHisTitle").text(Title);
    $("#tbdyVerHis").empty();
    if (array.length > 0) {
        for (ver = 0; ver < array.length; ver++) {
            var DownloadURL = URL + "/" + array[ver].Url;
            /*dateObj = new Date(array[ver].Created);
            var DateTime = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
            var H = +DateTime.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? "AM" : "PM";
            DateTime = h + DateTime.substr(2, 3) + ampm;*/
            var FinalDateTime = moment(array[ver].Created).format("DD, MMMM YYYY hh:mm A");

            //get Employee Details
            var EmpDept = '';
            var EmpDesg = '';
            var employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(array[ver].CreatedBy.Email);
            RestQuery = "?$select=LogonName/EMail,Designation,Department/Title,AttachmentFiles&$expand=LogonName,Department,AttachmentFiles&$filter=LogonName/EMail eq '" + array[ver].CreatedBy.Email + "'&$top=5000";
            $.when(getItemsWithQuery('Employees', RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (Employees) {
                if (Employees.length > 0) {
                    EmpDept = Employees[0].Department.Title;
                    EmpDesg = Employees[0].Designation;
                    if (Employees[0].AttachmentFiles.results.length > 0) {
                        employeePicURL = Employees[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                }
            });

            Version += '<tr><td>' + array[ver].VersionLabel + '</td><td><div class="flexingtwo"><img src="' + employeePicURL + '">';
            Version += '<div class="designationtype"><h3 class="namesection">' + array[ver].CreatedBy.Title + '</h3><span>' + EmpDesg + '</span>'+(EmpDesg!=''?(EmpDept!=''?",":""):"")+'<span>' + EmpDept + '</span></div></div></td>';
            //Version += '<div class="designationtype"><h3 class="namesection">' + array[ver].CreatedBy.Title + '</h3><span>' + EmpDesg + '</span>, <span>' + EmpDept + '</span></div></div></td>';
            Version += '<td><span class="datearea">' + FinalDateTime + '</span></td><td><a href="' + DownloadURL + '" class="downloadsec" download="' + $("#VerHisFile").text().substr(0, $("#VerHisFile").text().lastIndexOf(".")) + '">';
            Version += '<i class="fa fa-download"></i>Download</a></td></tr>';
        }
        $("#tbdyVerHis").append(Version);
    } else {
        Version += '<tr><td colspan="4"><div style="text-align:center;">No version found.</div></td></tr>';
        $("#tbdyVerHis").append(Version);
    }
    $("#versionhistory").modal('show');
}

//Check if Document is added to favorite
function checkFavoriteFile() {
    var Query = "?$select=*,Id,Title,User/Id,User/EMail&$expand=User&$filter=Category eq 'Document' and FileName eq '" + $("#FileName").text() + "' and User/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery('MyFavorites', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (FavResults) {
        if (FavResults.length > 0) {
            FavouriteId = FavResults[0].Id;
            $("#txtFavorite").text("Delete from Favorite");
            $('.unfillstar').hide();
            $('.fillstar').show();
        }
    });
}

//Add custom column for Modal
function AddCustomColPopup(FileValue) {
    var Columns = '';
    var Title = '';
    var customColQ = '';
    Title = 'Guest Portal Documents';
    if (Title != "") {
        var Query = "?$select=*&$top=5&$filter=Title eq '" + Title + "' and DMS_Type eq '" + DMS_Type + "' and ColumnType eq 'Custom' ";
        $.when(getItemsWithQuery("DMSColumnSetting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (CustomCols) {
            if (CustomCols.length > 0) {

                for (var index = 0; index < CustomCols.length; index++) {
                    customColQ += 'ListItemAllFields/' + CustomCols[index].ColumnName + ",";
                    Columns = '';
                    Columns += '<li class="customColModal">';
                    Columns += '<label class="detail-label">' + CustomCols[index].ColumnName + ':</label>';
                    Columns += '<div class="detail-title ellipsis-2" id="CustomPopup' + CustomCols[index].ColumnName + '"></div></li>';
                    $("#PopupPropertyBox").append(Columns);
                }
            }
        });
    }
    return customColQ;
}

//get check out by user name
function getCheckedOutBy() {
    var checkOutBy = '';
    var ServerRelativeUrlofFile = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFileByServerRelativeUrl('" + SelectedFileServerURL + "')/CheckedOutByUser/Title"
    $.ajax({
        url: ServerRelativeUrlofFile,
        type: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            checkOutBy = data.d.Title;
            $("#LockStatus").show();
            $("#LockStatus").text("Locked by me");
            $("#lockeffect .texthere").text("Unlock");
            $('#lockeffect .unlock').show();
            $('#lockeffect .lock').hide();
        },
        error: function (xhr, status, error) {
            $("#LockStatus").hide();
            $("#lockeffect .texthere").text("Lock");
            $('#lockeffect .unlock').hide();
            $('#lockeffect .lock').show();
            console.log(SelectedFileServerURL + "Not checked out");
        }
    });
    return checkOutBy;
}


//to get Full name from email
function GetUserFullName(userName) {
    var userID = "";
    var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
    var accountName = userName;
    $.ajax({
        url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
            encodeURIComponent(accountName) + "'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        async: false,
        success: function (data) {
            userID = data.d.Title;
        },
        error: function (data) {
            $('#ModalDisplayProperty').modal('show');
            console.log(JSON.stringify(data));
        }
    });
    return userID;
}

//Create folder in selected Library
function CreateFolder(Action) {
    var newSubfolderName = $('#txtnewSubFolderName').val().trim();
    if (newSubfolderName.trim() == '') {
        alert('Kindly enter folder name.');
        waitingDialog.hide();
        return false;
    }
    var flagSpecialChar = checkFolderSpecialCharaters(newSubfolderName);

    if (flagSpecialChar == true) {
        alert('Folder name can not contain the following characters: \n. < > # % @ & * { } ? : ; | \ " \ \ / ~ ` ');
        waitingDialog.hide();
        return false;
    }

    if (newSubfolderName.length < 2) {
        alert("Folder's length can't be less than 2 character.");
        waitingDialog.hide();
        return false;
    }
    if (newSubfolderName.length > 100) {
        alert('100 characters maximum folder length allowed.');
        waitingDialog.hide();
        return false;
    }
    //check if folder already exists
    var folderexistcheck = ChekFolderExistOrNot(Documentname, newSubfolderName);
    if (folderexistcheck == false) {
        alert('Folder already exists.');
        waitingDialog.hide();
        return false;
    }

    $.when(CreateDMSFolder(Documentname, newSubfolderName, true)).done(function (MainExamListItemTemp) {
        if (DMS_Link.includes("DocumentManagementSystem") == true || DMS_Link.includes("DepartmentalDMS") == true) {
            if (DMS_Link.includes("DocumentManagementSystem") == true) {
                libraryName = "DocumentManagementSystem";
            } else {
                libraryName = "DepartmentalDMS";
            }
        } else {
            if (Documentname.indexOf('/') != -1) {
                libraryName = Documentname.split('/')[0];
            } else {
                libraryName = Documentname;
            }
            //libraryName = "Documents";
        }
        Query = "?$select=Id,Author/EMail&$expand=Author&$orderby=Id desc&$Filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
        if (libraryName.search(/\bDocuments\b/) >= 0 || libraryName == "Shared Documents" || libraryName == "Shared%20Documents") {
            libraryName = "Documents";
        }
        $.when(getItemsWithQuery(libraryName, Query, DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")))).done(function (DMSFolder) {
            AddFolderProp(libraryName, DMSFolder[0].Id, DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")));
            waitingDialog.hide();
            $('#txtnewSubFolderName').val('');
            $("#dms-creat-folder").modal("hide");
            var tempDocName = Documentname;
            if (Documentname.includes('/Documents/') == true) {
                tempDocName = "Shared%20Documents";
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
        })
    });
}

//get metdata of uploaded files
function AddFolderProp(ListName, currentitemId, webUrl) {
    var Metadata;
    if (ListName.search(/\bDocuments\b/) >= 0 || ListName == "Shared Documents" || ListName == "Shared%20Documents") {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var ItemType = GetItemTypeForLibraryName(ListName);
    }
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#AddFolderTitle").val(),
        DocumentNo: $("#ddlAddFolderRef").val(),
        DocumentType: $("#ddlAddFolderCateg").val(),
        DocumentWrittenBy: $("#ddlAddFolderAuth").val(),
        Details: $("#ddlAddFolderDetails").val(),
        SubCategory: $("#ddlAddFolderSubC").val()
    };
    if ($("#ddlAddFolderSubC").val() == "--select--" || $("#ddlAddFolderSubC").val() == null || $("#ddlAddFolderSubC").val() == "-Select-") {
        delete Metadata["SubCategory"];
    }
    updateFolderFileMetadata(ListName, Metadata, currentitemId, webUrl);
}

//Validation for FolerName
function checkFolderSpecialCharaters(string) {
    var specialChars = "';.<>#%&*{}?:|\"\\/~`";
    for (i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            return true
        }
    }
    return false;
}

//Check folder exists
function ChekFolderExistOrNot(dmsFolder, newFolderName) {
    var IsFolderExist = true;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativeUrl('" + dmsFolder + "')?$select=ID,File_x0020_Type&$expand=Folders";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var folders = data.d.Folders.results;
            for (var i = 0; i < folders.length; i++) {
                if (folders[i].Name.toLowerCase() == newFolderName.toLowerCase()) {
                    IsFolderExist = false;
                }
            }
        }, eror: function (data) {
            waitingDialog.hide();
            alert(JSON.stringify(data));
        }
    });
    return IsFolderExist;
}

//Create Folder Inside DMS
function CreateDMSFolder(newSubfoldersName, newSubFolder, IsModalOpen) {
    var FolderDetails = [];
    var currentSiteURL = DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/"));
    if(newSubfoldersName.includes('/Documents/') == true) {
        newSubfoldersName = newSubfoldersName.replace("/Documents/", '/Shared%20Documents/');
    }
    else if(newSubfoldersName == "Documents") {
    	newSubfoldersName = 'Shared%20Documents';
    }
    else if(newSubfoldersName.includes('Documents/') == true && (newSubfoldersName.includes('Shared Documents/') == false && newSubfoldersName.includes('Shared%20Documents/') == false)){
    	newSubfoldersName = newSubfoldersName.replace("Documents/", 'Shared%20Documents/');
    }
    if(newSubfoldersName[newSubfoldersName.length - 1] == '/') {
        var ServerRelativeUrl = newSubfoldersName + newSubFolder;
    }
    else {
        var ServerRelativeUrl = newSubfoldersName + '/' + newSubFolder;
    }
    if (currentSiteURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(currentSiteURL)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }

    $.ajax({
        url: currentSiteURL + "/_api/web/folders",
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.Folder' },
            'ServerRelativeUrl': ServerRelativeUrl
        }),
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest
        }, success: function (response) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            FolderDetails = response.d;
            if(IsModalOpen == true) {
                alert('Folder has been created successfully');
            }
        },
        error: function (error) {
            waitingDialog.hide();
            RequestDigest = $("#__REQUESTDIGEST").val();
            if(error.responseText.includes("Access denied") == true) {
                alert("You don't have the required permission to perform this operation.");
                return false;
            }
            else {
                alert(error.responseText);
                return false;
            }
        }
    }).fail(function (error) {
        RequestDigest = $("#__REQUESTDIGEST").val();
        waitingDialog.hide();
        console.log(error.responseJSON.error.message.value);
    });
    return FolderDetails;
}


//Mandatory column attachment validation
function AddFileValidate() {
    var ReturnValue = true;
    if (currentSectionType != "My Documents") {
        for (var i = 0; i < arrMandatoryCols.length; i++) {
            if ("Title" == arrMandatoryCols[i] && $("#txtAddFileTitle").val().trim() == "") {
                ReturnValue = false;
                break;
            }
            if ("DocumentType" == arrMandatoryCols[i] && $("#ddlAddFileCateg").val() == "-Select-") {
                ReturnValue = false;
                break;
            }
            if ("Reference" == arrMandatoryCols[i] && $("#txtAddFileRef").val().trim() == "") {
                ReturnValue = false;
                break;
            }
            if ("Author" == arrMandatoryCols[i] && $("#txtAddFileAuth").val().trim() == "") {
                ReturnValue = false;
                break;
            }
            if ("Details" == arrMandatoryCols[i] && $("#txtAddFileDetails").val().trim() == "") {
                ReturnValue = false;
                break;
            }
        }
    }
    return ReturnValue;
}

//create document with templates
function createNewDocument(newDocumentName, ServerURL, docType, templateUrl, FolderServerURL) {
    var d = new $.Deferred();
    //var ctx = SP.ClientContext.get_current();
    var ctx = new SP.ClientContext(SiteUrl);
    var web = ctx.get_web();
    var list = web.getList(ServerURL);
    var folder = web.getFolderByServerRelativeUrl(FolderServerURL);
    var tempFolderURL = FolderServerURL;
    var docName = newDocumentName && newDocumentName.length
                        ? String.format("{0}", newDocumentName)
                        : String.format("New Document - {0}.docx", new Date().format("yyyy-mm-dd_hhMMss"));
    /** replace illegal filename characters */
    docName = docName.replace(/[~#!@£$%^&*()\{\}\\:,<>?/|"]+/gi, '-');

    var docItem = templateUrl && templateUrl.length
                        ? list.createDocumentFromTemplate(docName, folder, templateUrl)
                        : list.createDocument(docName, folder, docType || 1);
    var wfUrl = docItem.getWOPIFrameUrl(SP.Utilities.SPWOPIFrameAction.edit);
    var docFile = docItem.get_file();
    ctx.load(list, "DefaultEditFormUrl");
    ctx.load(docItem, "Id");
    ctx.load(docFile, "ServerRelativeUrl", "CheckOutType");
    ctx.executeQueryAsync(onCreateSuccess, onFail);
    return d.promise();

    function onCreateSuccess() {
        var wopiUrl = wfUrl.get_value();
        var docInfo = {
            documentName: docName,
            editDocumentPropertiesUrl: String.format("{0}?ID={1}&Source={2}", list.get_defaultEditFormUrl(), docItem.get_id(), _spPageContextInfo.webServerRelativeUrl),
            fileServerRelativeUrl: docFile.get_serverRelativeUrl(),
            wopiEditDocumentUrl: Boolean(wopiUrl) ? wopiUrl.replace(/wopiframe\.aspx/gi, "WOPIFrame2.aspx") : "",
        };
        var webUrl = DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/"));
        var libraryName = "";
        if (DMS_Link.includes("DocumentManagementSystem") == true || DMS_Link.includes("DepartmentalDMS") == true) {
            if (DMS_Link.includes("DocumentManagementSystem") == true) {
                libraryName = "DocumentManagementSystem";
            } else {
                libraryName = "DepartmentalDMS";
            }
        } else {
            if (Documentname.indexOf('/') != -1) {
                libraryName = Documentname.split('/')[0];
            } else {
                libraryName = Documentname;
            }
        }
        var mainextension = $("#NewFileExtension").text();
        if(mainextension == ".dotx") {
            mainextension = ".docx"
        }
        var fileServerURL = tempFolderURL + "/" + $("#txtNewFileName").val().trim() + mainextension;
        $.when(getTargetIDByUrl(webUrl, fileServerURL)).done(function (responsecurrentItemId) {
            AddFileProp(libraryName, responsecurrentItemId, webUrl, fileServerURL);
        });
    }
    function onFail(c, b) {
        console.error(b.get_message());
        alert("Critical Error: " + b.get_message());
        d.reject("Critical Error: " + b.get_message());
        waitingDialog.hide();
    }
}
//create file
function CreateOnlineFile() {
    var mainextension = $("#NewFileExtension").text();
    if (mainextension == ".dotx") {
        mainextension = ".docx"
    }
    var newFileName = $('#txtNewFileName').val().trim();
    var NameOfTheDocFile = $("#txtNewFileName").val().trim() + mainextension;

    if (newFileName.trim() == '') {
        alert('Kindly enter file name.');
        waitingDialog.hide();
        return false;
    }
    if (checkSpecialCharaters(NameOfTheDocFile) == true) {
        NameOfTheDocFile = NameOfTheDocFile.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
    }

    if (newFileName.length > 30) {
        alert('30 characters maximum file length allowed.');
        waitingDialog.hide();
        return false;
    }
    //check if file already exists
    if (Documentname[Documentname.length - 1] == '/') {
        var folderName = Documentname;
    }
    else {
        var folderName = Documentname + '/';
    }
    var Fileexistcheck = IsNewFileExist(folderName, NameOfTheDocFile, SiteUrl);
    if (Fileexistcheck == true) {
        alert('file already exists.');
        waitingDialog.hide();
        return false;
    }
    var FolderName = Documentname;
    if (SiteUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteUrl)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }

    var ListURL = DMS_Link.replace(window.location.origin, '');
    ListURL = ListURL.replace('/Forms/AllItems.aspx', '');

    var LibraryURL = DMS_Link.split('/Forms')[0];
    var temp = LibraryURL;
    if (LibraryURL.includes("Shared%20Documents") == true) {
        LibraryURL = LibraryURL.replace('Shared%20Documents', 'Shared Documents');
    }
    var TemplateURL = _spPageContextInfo.webAbsoluteUrl + '/DocumentManagementSystem/Forms/template' + $("#NewFileExtension").text();
    var lastWord = ListURL.split("/");
    FolderName = ListURL.replace(lastWord.slice(-1), '');
    var FolderName = FolderName + Documentname;
    if (SiteUrl.includes(_spPageContextInfo.webAbsoluteUrl) == true) {
        createNewDocument(NameOfTheDocFile, ListURL, 3, TemplateURL, FolderName);
    }
    else {
        if (FolderName.search(/\bDocuments\b/) >= 0) {
            FolderName = FolderName.replace('Documents', 'Shared Documents');
        }
        else if (FolderName.search(/\bShared%20Documents\b/) >= 0) {
            FolderName = FolderName.replace('Shared%20Documents', 'Shared Documents');
        }
        var url = SiteUrl + '/' + "_api/web/GetFolderByServerRelativeUrl('" + FolderName + "')/Files/Add(url='" + NameOfTheDocFile + "', overwrite=true)";
		if (SiteUrl != _spPageContextInfo.webAbsoluteUrl) {
	        $.when(GetFormDigestValue(SiteUrl)).done(function (GetFormDigestValue) {
	            RequestDigest = GetFormDigestValue
	        });
	    }
        $.ajax({
            'url': url,
            'method': 'POST',
            'async': false,
            'body': "",
            'headers': {
                'accept': 'application/json; odata=verbose',
                'content-type': 'application/json; odata=verbose',
                'X-RequestDigest': RequestDigest 
            },
            success: function (data) {
                var webUrl = DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/"));
                var libraryName = "";
                if (DMS_Link.includes("DocumentManagementSystem") == true || DMS_Link.includes("DepartmentalDMS") == true) {
                    if (DMS_Link.includes("DocumentManagementSystem") == true) {
                        libraryName = "DocumentManagementSystem";
                    } else {
                        libraryName = "DepartmentalDMS";
                    }
                } else {
                    if (Documentname.indexOf('/') != -1) {
                        libraryName = Documentname.split('/')[0];
                    } else {
                        libraryName = Documentname;
                    }
                }
                $.when(getTargetIDByUrl(webUrl, data.d.ServerRelativeUrl)).done(function (responsecurrentItemId) {
                    AddFileProp(libraryName, responsecurrentItemId, webUrl, data.d.ServerRelativeUrl);
                    
                });
            }, eror: function (data) {
                waitingDialog.hide();
                alert(JSON.stringify(data));
            }
        });
    }
}


//get metdata of uploaded files
function AddFileProp(ListName, currentitemId, webUrl, fileServerURL) {
    var Metadata;
    if (ListName.includes('Documents') == true) {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var tempCopyLib = ListName;
        if (tempCopyLib.includes('_') == true) {
            tempCopyLib = tempCopyLib.replace('_', '_x005f_');
        }
        if (tempCopyLib.includes('%20') == true) {
            tempCopyLib = tempCopyLib.replace('%20', '_x0020_');
        }
        var ItemType = GetItemTypeForLibraryName(tempCopyLib);
    }
   
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#txtAddFileTitle").val(),
        DocumentNo: $("#txtAddFileRef").val(),
        DocumentType: $("#ddlAddFileCateg").val(),
        DocumentWrittenBy: $("#txtAddFileAuth").val(),
        Details: $("#txtAddFileDetails").val(),
        SubCategory: $("#ddlAddFileSubC").val()
    };
    if ($("#ddlAddFileSubC").val() == "--select--" || $("#ddlAddFileSubC").val() == null || $("#ddlAddFileSubC").val() == "-Select-") {
        delete Metadata["SubCategory"];
    }
   
    AddFilePropToLib(ListName, Metadata, currentitemId, webUrl, fileServerURL);
}


//Update metedata in library
function AddFilePropToLib(ListName, Metadata, ID, webUrl, fileServerURL) {
	var fileServerURL = fileServerURL;
    var dfd = $.Deferred();
    if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var tempListName = ListName;
    if (tempListName == 'Shared%20Documents' || tempListName == 'Shared Documents') {
        tempListName = "Documents";
    }
    var oweburl = webUrl + "/_api/Web/Lists/getByTitle('" + tempListName + "')/Items(" + ID + ")";
    $.ajax({
        url: oweburl,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(Metadata),
        success: function (RESULT) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            var tempDocName = Documentname;
            if (Documentname.includes('/Documents/') == true || Documentname.search(/\bDocuments\b/) >= 0) {
                tempDocName = "Shared%20Documents";
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
            $("#dms-creat-file").modal("hide");
            waitingDialog.hide();
            DisplayFileProperty(SiteUrl, currentSectionType, "null", fileServerURL, 'NullValue', fileServerURL, 'NullValue', 'EditMode');
            //alert('File has been created.');
            dfd.resolve(true);
        },
        error: function (error) {
            waitingDialog.hide();
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.indexOf('does not exist on type') != -1 || error.responseText.indexOf('The security validation for this page is i') != -1) {
                var tempDocName = Documentname;
                if (Documentname.includes('/Documents/') == true) {
                    tempDocName = "Shared%20Documents";
                }
                GetMyDocumentsWithFilesFolder(tempDocName);
                alert("Required columns does not exists. Kindly contact administrator to activate features.");
                $("#dms-creat-file").modal('hide');
            }
            else {
                var tempError = '';
                if (error.responseJSON.error.message.value == undefined) {
                    tempError = JSON.stringify(error);
                }
                else {
                    tempError = error.responseJSON.error.message.value;
                }
                alert(tempError);
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//get SharePoint data from List
function getItemsWithQuery(ListName, Query, SiteUrl) {
    var dfd = $.Deferred();
    var siteurl = SiteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query;
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
            dfd.resolve(data.d.results);
            //   console.log();
        },
        error: function (error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Re-arrange the array
function ReinitializeArray(arr) {
    var newArr = [];
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        newArr[count++] = arr[i];
    }
    return newArr;
}

//Delete files from Uploaded files(locally)
function removeLine(id, FileName) {
    var index = id.split('_')[1];
    $("#" + id).remove();
    FinalFiles4Upload = FinalFiles4Upload.filter(function (obj) {
        return obj.name !== FileName;
    });
    if (FinalFiles4Upload.length == 0) {
        $('#txtUploadFiles').html('');
    }
    $("#AttachmentUploadField").val('');
}

//Delete folder from Uploaded folder(locally)
function removeLineFolder(id, FolderName) {
    FinalFoldersUpload = [];
    $('#txtUploadFolder').html('');
    $("#FolderAttachment").val('');
}

//Uploading files code starts---------------------------

//Mandatory column attachment validation
function AttachmentValidation() {
    var ReturnValue = true;
    if (currentSectionType != "My Documents") {
        for (var i = 0; i < arrMandatoryCols.length; i++) {
            if ("Title" == arrMandatoryCols[i]) {
                if ($("#prefix_and_postfix_name").prop('checked') == false) {
                    if ($("#txtFileTitle").val().trim() == "") {
                        ReturnValue = false;
                        break;
                    }
                }
            }
            if ("DocumentType" == arrMandatoryCols[i] && $("#ddlFileType").val() == "-Select-") {
                ReturnValue = false;
                break;
            }
            if ("Reference" == arrMandatoryCols[i] && $("#txtdocumentNo").val().trim() == "") {
                ReturnValue = false;
                break;
            }
            if ("Author" == arrMandatoryCols[i] && $("#FileAuthor").val().trim() == "") {
                ReturnValue = false;
                break;
            }
            if ("Details" == arrMandatoryCols[i] && $("#UploadFileComment").val().trim() == "") {
                ReturnValue = false;
                break;
            }
        }
    }
    return ReturnValue;
}

//check Total File size
function checkFileSize() {
    TotalSize = 0;
    for (var k = 0; k < FinalFiles4Upload.length; k++) {
        TotalSize += parseFloat(bytesToMegaBytes(FinalFiles4Upload[k].size).toFixed(2));
    }
    if (TotalSize > 300) {
        return false;
    }
    else {
        return true;
    }
}

//to Upload large Files
function OpenLargeUpload() {
    var container = $("#bdyUploadFile").empty();
    $('<iframe>', {
        src: DMS_Link.replace("AllItems", "Upload"),
        id: 'LargeUploadFile',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#UploadLarge").modal('show');
    setInterval(function () {
        $("#LargeUploadFile").contents().find("#titlerow").remove();
        $("#LargeUploadFile").contents().find("#suiteBarTop").remove();
        $("#LargeUploadFile").contents().find("#s4-ribbonrow").remove();
        $("#LargeUploadFile").contents().find("#DeltaTopNavigation").remove();
        $("#LargeUploadFile").contents().find("#DeltaSiteLogo").remove();
        $("#LargeUploadFile").contents().find("#zz12_RootAspMenu").remove();
        $("#LargeUploadFile").contents().find(".ms-belltown-anonShow").remove();
        if (currentSectionType == 'My Documents') {
            $("#LargeUploadFile").contents().find("input:text").val("/" + _spPageContextInfo.userEmail.toLowerCase());
        }
        $("#LargeUploadFile").contents().find("input:button").click(function (e) {
            var countRun = 0;
            setTimeout(function () {
                if (countRun == 0) {
                    $("#UploadLarge").modal('hide');
                    onloadGetItem();
                    countRun = 1;
                }
            }, 2000);
        });
    }, 1000);
}
function saveAttachment() {
    if ($("#RenameandUpload").prop('checked') == true && $("#txtNamePostfix").val().trim() == "") {
        alert("Kindly enter postfix of file Name.");
        return false;
    }
    if ($("#txtUploadFiles").html().trim() == '') {
        alert("Please select any file first.");
        return false;
    }
    else {
        //setTimeout(function () {
        waitingDialog.show();
        FailDueToCheckOut = 0;
        for (var k = 0; k < FinalFiles4Upload.length; k++) {
            //uploadingFileName = FinalFiles4Upload[k].name;
            var siteUrl = DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/"));
            if (Documentname[Documentname.length - 1] == '/') {
                var folderName = Documentname;
            }
            else {
                var folderName = Documentname + '/';
            }
            UploadFile(folderName, FinalFiles4Upload[k], siteUrl, k);
        }
        if (FailDueToCheckOut == FinalFiles4Upload.length) {
            waitingDialog.hide();
            alert("Selected file(s) are locked, couldn't be uploaded.");
            $("#myModalupload").modal('hide');
        }
    }
}

var FailDueToCheckOut = 0;
//to check the existence of uploaded file(s)
function UploadFile(folderName, file, webUrl, LoopCount) {
    var textFileUrLLink = file.name;
    var arrMetadata = [];
    if ($('#chkKeepExist').is(':checked') == true) { //Keep Existing metadata
        if (IsFileCheckout(folderName, textFileUrLLink, webUrl, 'Upload') == true) {
            FailDueToCheckOut++;
        }
        else {
            arrMetadata = IsFileExist(folderName, textFileUrLLink, webUrl);
            uploadDocuments(folderName, file, webUrl, arrMetadata, LoopCount);
        }
    }
    else if ($('#chkUploadNew').is(':checked') == true) { //upload new metadata
        if (IsFileCheckout(folderName, textFileUrLLink, webUrl, 'Upload') == true) {
            FailDueToCheckOut++;
        }
        else {
            arrMetadata = [];
            uploadDocuments(folderName, file, webUrl, arrMetadata, LoopCount);
        }
    }
    else if ($('#chkNotUpload').is(':checked') == true) { //Do not upload duplicate particular file
        arrMetadata = IsFileExist(folderName, textFileUrLLink, webUrl);
        if (arrMetadata.length == 0) {
            //No file with this name exists in given path
            uploadDocuments(folderName, file, webUrl, arrMetadata, LoopCount);
        }
        else {
            if (FinalFiles4Upload.length == (LoopCount + 1 + FailDueToCheckOut)) {
                if ($('#chkUploadMail').prop('checked') == true) {
                    EmailProperties(webUrl);
                }
                else {
                    DocUrlCollection = [];
                    if (FailDueToCheckOut == 0) {
                        alert("File(s) have been uploaded successfully.");
                    }
                    else {
                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be uploaded.\nOther files(s) have been uploaded successfully.");
                    }
                    waitingDialog.hide();
                    var tempDocName = Documentname;
                    if (Documentname.includes('/Documents/') == true || Documentname.search(/\bDocuments\b/) >= 0) {
                        tempDocName = "Shared%20Documents";
                    }
                    GetMyDocumentsWithFilesFolder(tempDocName);
                }
                $("#myModalupload").modal('hide');
            }
            //Do not upload
        }
    }
    else if ($('#RenameandUpload').is(':checked') == true) { //Rename and Upload
        if (IsFileCheckout(folderName, textFileUrLLink, webUrl, 'Upload') == true) {
            FailDueToCheckOut++;
        }
        else {
            arrMetadata = IsFileExist(folderName, textFileUrLLink, webUrl);

            uploadDocuments(folderName, file, webUrl, arrMetadata, LoopCount);
        }
    }
    else {
        //Do Nothing
    }
}

//to check if file is checkout by User at the time of - upload, Copy, Move, Share, Delete, Property update 
function IsFileCheckout(FolderName, FileName, WebURL, Action) {
    var checkOutBy = '';
    var serverRelativeURL = "/" + WebURL.substring(WebURL.indexOf('/s') + 1);
    var Checkpath = serverRelativeURL + "/" + FolderName + FileName;
    var ServerRelativeUrlofFile = WebURL + "/_api/web/GetFileByServerRelativeUrl('" + Checkpath + "')/CheckedOutByUser/Email"
    $.ajax({
        url: ServerRelativeUrlofFile,
        type: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            if (Action == "Upload") {
                if (data.d.Email.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                    checkOutBy = false;
                }
                else {
                    checkOutBy = true;
                }
            }
            else {
                checkOutBy = true;
            }
        },
        error: function (xhr, status, error) {
            checkOutBy = false;
        }
    });
    return checkOutBy;
}
//to check if file exists at given path
function IsFileExist(FolderName, FileName, WebURL) {
    var serverRelativeURL = "/" + WebURL.substring(WebURL.indexOf('/s') + 1);
    var Checkpath = serverRelativeURL + "/" + FolderName + FileName;
    var arrFileData = [];
    jQuery.ajax({
        url: WebURL + "/_api/web/getfilebyserverrelativeurl('" + Checkpath + "')?$expand=ListItemAllFields&$select=*,ListItemAllFields/AccessLevel,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentNo," +
            "ListItemAllFields/DocumentType,ListItemAllFields/SharedId,ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Title",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function (data) {
            arrFileData = data.d.ListItemAllFields;
        },
        error: function (error) {
            if (error.status == 404) {
                console.log(FileName + " file doesnt exist");
            }
            else {
                waitingDialog.hide();
            }
        }
    });
    return arrFileData;
}

function uploadDocuments(folderName, file, webUrl, ExistFileMetadata, LoopCount) {
    url = webUrl + "/_api/contextinfo";
    var FileNameUpload = '';
    //var DocUrlCollection = [];
    $.ajax({
        url: url,
        type: "POST",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        contentType: "application/json;odata=verbose",
        success: function (data) {
            var digest = data.d.GetContextWebInformation.FormDigestValue;
            var libraryName = "";

            if (DMS_Link.includes("DocumentManagementSystem") == true || DMS_Link.includes("DepartmentalDMS") == true) {
                if (DMS_Link.includes("DocumentManagementSystem") == true) {
                    libraryName = "DocumentManagementSystem";
                    //$(".txtCopyLink").val(SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(DMS_Link) + "&parent=" + encodeURIComponent(DMS_Link.substr(0, DMS_Link.lastIndexOf("/") + 0)));
                } else {
                    libraryName = "DepartmentalDMS";
                    //$(".txtCopyLink").val(SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(DMS_Link) + "&parent=" + encodeURIComponent(DMS_Link.substr(0, DMS_Link.lastIndexOf("/") + 0)));
                }
            } else {
                if (Documentname.indexOf('/') != -1) {
                    libraryName = Documentname.split('/')[0];
                } else {
                    libraryName = Documentname;
                }
                //libraryName = "Documents";
            }

            var reader = new FileReader();
            var arrayBuffer;

            reader.onload = function (e) {
                arrayBuffer = reader.result;

                var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + libraryName;
                var changedFileName = FileNameUpload = file.name;
                if ($('#RenameandUpload').is(':checked') == true && ExistFileMetadata.length != 0) { //Rename and Upload
                    changedFileName = file.name.split('.').slice(0, -1).join('.');
                    changedFileName = $("#txtNamePrefix").val().trim() + changedFileName + $("#txtNamePostfix").val().trim() + "." + file.name.substring(file.name.lastIndexOf('.') + 1);
                }
                if (checkSpecialCharaters(changedFileName) == true) {
                    changedFileName = changedFileName.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
                }
                else {
                    //changedFileName = file.name;
                }
                if (folderName.includes('/Documents/') == true) {
                    //if(folderName.includes('Shared Documents') == false) {
                    folderName = folderName.replace('Documents', 'Shared Documents');
                    //}
                }
                else {
                    if (CheckLibary == 'Shared%20Documents' || CheckLibary == 'Shared Documents') {
                        if (folderName.includes('Shared Documents') == false && folderName.includes('Shared%20Documents') == false) {
                            folderName = folderName.replace('Documents', 'Shared Documents');
                        }
                    }
                }
                if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                }
                url = webUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderName + "')/Files/add(url='" + changedFileName + "',overwrite=true)?@target='" + targetUrl + "'&$expand=ListItemAllFields";
                try {

                    $.ajax({
                        url: url,
                        type: "POST",
                        data: arrayBuffer,
                        headers: {
                            "Accept": "application/json; odata=verbose",
                            "X-RequestDigest": RequestDigest
                        },
                        contentType: "application/json;odata=verbose",
                        processData: false,
                        success: function (response) {
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            var uploadedFileName = response.d.Name
                            var sharingLink = response.d.ServerRelativeUrl;
                            var propertiesServerRelativeUrl = '';
                            propertiesServerRelativeUrl = response.d.ListItemAllFields.ServerRedirectedEmbedUri;
                            if (propertiesServerRelativeUrl == null || propertiesServerRelativeUrl == "") {
                                propertiesServerRelativeUrl = encodeURI(response.d.ServerRelativeUrl);
                            }
                            if (response.d.Name.includes(".pdf") == false) {//to check if it's PDF
                                propertiesServerRelativeUrl = propertiesServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
                            }
                            DocUrlCollection.push({ FileUrl: propertiesServerRelativeUrl, FileName: response.d.Name });
                            $.when(getTargetIDByUrl(webUrl, response.d.ServerRelativeUrl)).done(function (responsecurrentItemId) {
                                updateDocumentProperties(libraryName, responsecurrentItemId, webUrl, ExistFileMetadata, LoopCount, FileNameUpload);
                            });
                        },
                        error: function (errorr) {
                            waitingDialog.hide();
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            if (errorr.responseText.includes("Access denied") == true) {
                                alert("You don't have the required permission to upload " + file.name + ".");
                                return false;
                            }
                            else {
                                alert(errorr.responseText);
                                return false;
                            }
                        }
                    }).fail(function (error) {
                        waitingDialog.hide();
                        RequestDigest = $("#__REQUESTDIGEST").val();
                        if (error.responseJSON.error.message.value.includes("denied") == true) {
                            //alert("You don't have the required permission to perform this operation.");
                            return false;
                        }
                        else {
                            alert(error.responseJSON.error.message.value);
                            return false;
                        }
                    });
                }
                catch (error) {
                    waitingDialog.hide();
                    RequestDigest = $("#__REQUESTDIGEST").val();
                    console.log(error);
                    return false;
                }
            };
            reader.readAsArrayBuffer(file);
        },
        error: function (errorr) {
            waitingDialog.hide();
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (errorr.responseText.includes("Access denied") == true) {
                alert("You don't have the required permission to upload " + file.name + ".");
                return false;
            }
            else {
                alert(errorr.responseText);
                return false;
            }
        }
    });
}

function getTargetIDByUrl(siteUrl, targetFileUrl) {
    $.ajax({
        url: siteUrl + "/_api/Web/GetFileByServerRelativeUrl('" + targetFileUrl + "')/ListItemAllFields",
        type: 'GET',
        async: false,
        headers: { 'accept': 'application/json;odata=verbose' },
        success: function (responseData) {
            commonserverRedirectedEmbedUri = responseData.d.ServerRedirectedEmbedUri;
            if (commonserverRedirectedEmbedUri == null || commonserverRedirectedEmbedUri == "") {
                commonserverRedirectedEmbedUri = "";
            }
            targetRoleDefinitionId = responseData.d.Id;
        },
        error: function (errorMessage) {
            waitingDialog.hide();
            alert(JSON.stringify(error));
        }
    });
    return targetRoleDefinitionId;
}


//get metdata of uploaded files
function updateDocumentProperties(ListName, currentitemId, webUrl, arrMetadata, LoopCount, FileName) {
    var IsDuplicateFile = false;
    var Metadata;
    var FileTitleValue = $("#txtFileTitle").val();
    if ($('#prefix_and_postfix_name').is(':checked') == true && $('#chkKeepExist').is(':checked') == false) { //Rename and Upload Title
        FileName = FileName.split('.').slice(0, -1).join('.');
        FileTitleValue = $("#txtTitlePrefix").val().trim() + FileName + $("#txtTitlePostfix").val().trim();
    }
    else {
        if (arrMetadata.length == 0 && $('#prefix_and_postfix_name').is(':checked') == true) {
            FileName = FileName.split('.').slice(0, -1).join('.');
            FileTitleValue = $("#txtTitlePrefix").val().trim() + FileName + $("#txtTitlePostfix").val().trim();
        }
    }
    if (ListName.includes('Documents') == true) {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var tempCopyLib = ListName;
        if (tempCopyLib.includes('_') == true) {
            tempCopyLib = tempCopyLib.replace('_', '_x005f_');
        }
        if (tempCopyLib.includes('%20') == true) {
            tempCopyLib = tempCopyLib.replace('%20', '_x0020_');
        }
        var ItemType = GetItemTypeForLibraryName(tempCopyLib);
    }
    if ($('#RenameandUpload').is(':checked') == true || $('#chkUploadNew').is(':checked') == true) {
        IsDuplicateFile = false;
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Title: FileTitleValue,
            DocumentNo: $("#txtdocumentNo").val(),
            DocumentType: $("#ddlFileType").val(),
            DocumentWrittenBy: $("#FileAuthor").val(),
            Details: $("#UploadFileComment").val(),
            SubCategory: $("#FileSubType").val()
        };
        if ($("#FileSubType").val() == "--select--" || $("#FileSubType").val() == null || $("#FileSubType").val() == "-Select-") {
            delete Metadata["SubCategory"];
        }
    }
    else {
        if ($('#chkKeepExist').is(':checked') == true && arrMetadata.length != 0) {
            IsDuplicateFile = true;
            Metadata = {
                __metadata: {
                    'type': ItemType
                },

                Title: arrMetadata.Title ? arrMetadata.Title : "",
                DocumentNo: arrMetadata.DocumentNo ? arrMetadata.DocumentNo : "",
                DocumentType: arrMetadata.DocumentType ? arrMetadata.DocumentType : "",
                DocumentWrittenBy: arrMetadata.DocumentWrittenBy ? arrMetadata.DocumentWrittenBy : "",
                //Regarding: arrMetadata.Regarding ? arrMetadata.Regarding : "",
                Details: arrMetadata.Details ? arrMetadata.Details : "",
                SubCategory: arrMetadata.SubCategory ? arrMetadata.SubCategory : "",
                //Department: arrMetadata.Title ? arrMetadata.Title : "",
                AccessLevel: arrMetadata.AccessLevel ? arrMetadata.AccessLevel : "",
                SecurityLevel: arrMetadata.SecurityLevel ? arrMetadata.SecurityLevel : "",
                PermissionLevel: arrMetadata.PermissionLevel ? arrMetadata.PermissionLevel : "",
                PermissionLevelId: arrMetadata.PermissionLevelId ? arrMetadata.PermissionLevelId : "",
                Approval: arrMetadata.Approval
            };
            if (arrMetadata.SharedId != null) {
                Metadata.SharedId = { 'results': arrMetadata.SharedId.results };
            }
            if (arrMetadata.SubCategory == "--select--" || arrMetadata.SubCategory == null || arrMetadata.SubCategory == "-Select-" || arrMetadata.SubCategory == "") {
                delete Metadata["SubCategory"];
            }
        }
        else {
            IsDuplicateFile = false;
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Title: FileTitleValue,
                DocumentNo: $("#txtdocumentNo").val(),
                DocumentType: $("#ddlFileType").val(),
                DocumentWrittenBy: $("#FileAuthor").val(),
                Details: $("#UploadFileComment").val(),
                SubCategory: $("#FileSubType").val()
            };
            if ($("#FileSubType").val() == "--select--" || $("#FileSubType").val() == null || $("#FileSubType").val() == "-Select-") {
                delete Metadata["SubCategory"];
            }
        }
    }

    updateFileWithID(ListName, Metadata, currentitemId, webUrl, IsDuplicateFile, LoopCount);
}


//Update metedata in library
function updateFileWithID(ListName, Metadata, ID, webUrl, IsDuplicate, LoopCount) {
    var dfd = $.Deferred();
    if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var tempListName = ListName;
    if (tempListName == 'Shared%20Documents' || tempListName == 'Shared Documents') {
        tempListName = "Documents";
    }
    var oweburl = webUrl + "/_api/Web/Lists/getByTitle('" + tempListName + "')/Items(" + ID + ")";
    $.ajax({
        url: oweburl,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(Metadata),
        success: function (RESULT) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if ($('#chkKeepExist').is(':checked') == false) { // if user select to keep existing metadata for duplicate file only
                var Query = "?$select=ID,DocumentID&$filter=DocumentID eq '" + ID + "' ";
                $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SharedLInks) {
                    if (SharedLInks.length > 0) {
                        for (var index = 0; index < SharedLInks.length; index++) {
                            DeleteSharedLinks(SharedLInks[index].ID);//delete link
                        }
                    }
                });
            }
            if (FinalFiles4Upload.length == (LoopCount + 1 + FailDueToCheckOut)) {
                if ($('#chkUploadMail').prop('checked') == true) {
                    EmailProperties(webUrl);
                }
                else {
                    DocUrlCollection = [];
                    if (FailDueToCheckOut == 0) {
                        alert("File(s) have been uploaded successfully.");
                    }
                    else {
                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be uploaded.\nOther files(s) have been uploaded successfully.");
                    }
                    FinalFiles4Upload=[];//22 March 2023
                    waitingDialog.hide();
                    var tempDocName = Documentname;
                    if (Documentname.includes('/Documents/') == true || Documentname.search(/\bDocuments\b/) >= 0) {
                        tempDocName = "Shared%20Documents";
                    }
                    GetMyDocumentsWithFilesFolder(tempDocName);
                }
                $("#myModalupload").modal('hide');
            }
            dfd.resolve(true);
        },
        error: function (error) {
            waitingDialog.hide();
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.indexOf('does not exist on type') != -1 || error.responseText.indexOf('The security validation for this page is i') != -1) {
                var tempDocName = Documentname;
                if (Documentname.includes('/Documents/') == true) {
                    tempDocName = "Shared%20Documents";
                }
                GetMyDocumentsWithFilesFolder(tempDocName);
                alert("Required columns does not exists. Kindly contact administrator to activate features.");
                $("#myModalupload").modal('hide');
                $("#txtUploadFiles").empty();
                $("#txtUploadFiles").hide();
                FinalFiles4Upload = [];
            }
            else {
                var tempError = '';
                if (error.responseJSON.error.message.value == undefined) {
                    tempError = JSON.stringify(error);
                }
                else {
                    tempError = error.responseJSON.error.message.value;
                }
                alert(tempError);
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//get the Team memebers email
function getFromUserEmail() {
    var arrFrom = [];
    var Query = "?$select=Title,InternalMembers/EMail,InternalSupervisor/EMail,GroupName/Id,GroupName/Title,Supervisor/EMail&$expand=GroupName,InternalMembers,InternalSupervisor,Supervisor&$filter=Title eq '" + currentClientName  + "' ";
    $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TeamMember) {
        if (TeamMember[0].GroupName.Title != undefined && TeamMember[0].GroupName.Title != null) {
            arrFrom.push(TeamMember[0].GroupName.Title);
        }
        if (TeamMember[0].InternalSupervisor.EMail != undefined && TeamMember[0].InternalSupervisor.EMail != null) {
            arrFrom.push(TeamMember[0].InternalSupervisor.EMail);
        }
        if (TeamMember[0].Supervisor.EMail != undefined && TeamMember[0].Supervisor.EMail != null) {
            arrFrom.push(TeamMember[0].Supervisor.EMail);
        }
        if (TeamMember[0].InternalMembers.results != undefined && TeamMember[0].InternalMembers.results != null) {
            for (var i = 0; i < TeamMember[0].InternalMembers.results.length; i++) {
                arrFrom.push(TeamMember[0].InternalMembers.results[i].EMail);
            }
        }
    });
    
    return arrFrom;
}
//Send Email when user uploaded the Folder
function FolderUploadMail() {
    var UploadDocDesign = '';
    var FileDocType = '';
    var FromUserEmails = [];
    if ($("#ddlFileType").val() != "-Select-") {
        FileDocType = $("#ddlFileType").val();
    }
    var Library = '';
    Library = '<strong>Guest Client:</strong> ' + currentClientName;

    UploadDocDesign = "Following folder has been uploaded.<br/>";
    var FromUserEmails = getFromUserEmail();
    for (var i = 0; i < DocUrlCollection.length; i++) {
        var FileServerURL = window.location.origin + DocUrlCollection[i].FileUrl;
        UploadDocDesign = UploadDocDesign + "<div> " + Library + "</div><br/>" +
        									"<div><strong>Folder Name :</strong>" + DocUrlCollection[i].FileName + "</div>" +
        									"<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + $("#txtFileTitle").val() + "</div>" +
                                        	"<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + $("#txtdocumentNo").val() + "</div>" +
                                            "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + FileDocType + "</div>" +
                                            "<div><strong>Details:</strong> " + $("#UploadFileComment").val() + "</div><br/>" +
                                            "<div><strong>Uploaded by:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                            "<div><strong>Uploaded On:</strong> " + moment(new Date()).format('MMM DD YYYY') + "</div><br/><br/>" +
                                            "<div><a href=" + FileServerURL + ">Click here</a> to open the folder.</div>" + "<br/><br/>";


    }
    UploadDocDesign += "This is an auto generated email. Please don't reply.";
    for(var k = 0; k < LabelDefaultLangauge.length; k++) {
    	if(UploadDocDesign.includes(LabelDefaultLangauge[k].Key) == true){
    		UploadDocDesign= UploadDocDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
    	}	
    }
    var Metadata;
    Metadata = {
        'properties': {
            '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
            'From': _spPageContextInfo.userEmail,
            'To': { 'results': FromUserEmails },
            //'CC': { 'results': ccUsers },
            'Body': UploadDocDesign,
            'Subject': "A folder has been uploaded."
        }
    };
    var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: sitetemplateurl,
        type: "POST",
        data: JSON.stringify(Metadata),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            DocUrlCollection = [];
        },
        error: function (xhr, data, error) {
            waitingDialog.hide();
            DocUrlCollection = [];
            var err = JSON.parse(xhr.responseText);
            var errorType = xhr.status;
            var errorMessage = err.error.message.value;
            //alert(errorMessage);
        }
    });
}

//Send Email when user uploaded the document
function EmailProperties(siteURL) {
    var UploadDocDesign = '';
    var FileDocType = '';
    var FromUserEmails = [];
    if ($("#ddlFileType").val() != "-Select-") {
        FileDocType = $("#ddlFileType").val();
    }
    var Library = '';
    if (currentSectionType == 'My Documents') {
        Library = '<strong>Library:</strong> My Documents';
    }
    else if (currentSectionType == 'Department') {
        Library = '<strong>Department:</strong> ' + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'Group Documents') {
        Library = '<strong>Group:</strong> ' + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'ProjectDocuments') {
        Library = '<strong>Project:</strong> ' + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'GuestDocuments') {
        Library = '<strong>Guest Client:</strong> ' + $(".headdingLinks").text();
    }
    UploadDocDesign = "Following document(s) have been uploaded.<br/><br/>";
    var FromUserEmails = getFromUserEmail();
    for (var i = 0; i < DocUrlCollection.length; i++) {
        var MailLink = '';
        var FileServerURL = DocUrlCollection[i].FileUrl;
        if (DocUrlCollection[i].FileName.indexOf("xml") != -1 || DocUrlCollection[i].FileName.indexOf("rar") != -1 || DocUrlCollection[i].FileName.indexOf("png") != -1 || DocUrlCollection[i].FileName.indexOf("jpg") != -1 || DocUrlCollection[i].FileName.indexOf("jpeg") != -1) {
            if (FileServerURL.includes("DocumentManagementSystem") == true || FileServerURL.includes("DepartmentalDMS") == true) {
                if (FileServerURL.includes("DocumentManagementSystem") == true) {
                    MailLink = siteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(FileServerURL) + "&parent=" + encodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
                } else {
                    MailLink = siteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(FileServerURL) + "&parent=" + encodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
                }
            } else {
                var HostName = window.location.origin + FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0);
                MailLink = HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(FileServerURL) + "&parent=" + encodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
            }
        }
        else {
            MailLink = encodeURI(DocUrlCollection[i].FileUrl);
        }
        UploadDocDesign = UploadDocDesign + "<div> " + Library + "</div><br/>" +
        									"<div><strong>File Name :</strong>" + DocUrlCollection[i].FileName + "</div>" +
        									"<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + $("#txtFileTitle").val() + "</div>" +
                                        	"<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + $("#txtdocumentNo").val() + "</div>" +
                                            "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + FileDocType + "</div>" +
                                            "<div><strong>Details:</strong> " + $("#UploadFileComment").val() + "</div><br/>" +
                                            "<div><strong>Uploaded by:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                            "<div><strong>Uploaded On:</strong> " + moment(new Date()).format('MMM DD YYYY') + "</div><br/><br/>" +
                                            "<div><a href=" + MailLink + ">Click here</a> to open the document.</div>" + "<br/><br/>";

    }
    UploadDocDesign += "This is an auto generated email. Please don't reply.";
    for (var k = 0; k < LabelDefaultLangauge.length; k++) {
        if (UploadDocDesign.includes(LabelDefaultLangauge[k].Key) == true) {
            UploadDocDesign = UploadDocDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
        }
    }

    var Metadata;
    Metadata = {
        'properties': {
            '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
            'From': _spPageContextInfo.userEmail,
            'To': { 'results': FromUserEmails },
            //'CC': { 'results': ccUsers },
            'Body': UploadDocDesign,
            'Subject': "Documents(s) have been uploaded."
        }
    };
    var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: sitetemplateurl,
        type: "POST",
        data: JSON.stringify(Metadata),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            DocUrlCollection = [];
            if (FailDueToCheckOut == 0) {
                alert("File(s) have been uploaded successfully.");
            }
            else {
                alert(FailDueToCheckOut + " file(s) are locked, couldn't be uploaded.\nOther files(s) have been uploaded successfully.");
            }
            FinalFiles4Upload=[];//22 March 2023
            waitingDialog.hide();
            var tempDocName = Documentname;
            if (Documentname.includes('/Documents/') == true || Documentname.search(/\bDocuments\b/) >= 0) {
                tempDocName = "Shared%20Documents";
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
        },
        error: function (xhr, data, error) {
            if (FailDueToCheckOut == 0) {
                alert("File(s) have been uploaded successfully.");
            }
            else {
                alert(FailDueToCheckOut + " file(s) are locked, couldn't be uploaded.\nOther files(s) have been uploaded successfully.");
            }
            waitingDialog.hide();
            var tempDocName = Documentname;
            if (Documentname.includes('/Documents/') == true || Documentname.search(/\bDocuments\b/) >= 0) {
                tempDocName = "Shared%20Documents";
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
            DocUrlCollection = [];
            var err = JSON.parse(xhr.responseText);
            var errorType = xhr.status;
            var errorMessage = err.error.message.value;
            //alert(errorMessage);
        }
    });
}

//check and replace Special characters
function checkSpecialCharaters(string) {
    var specialChars = "<>#%&*{}?:|\"\\/~`'";
    for (i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            return true
        }
    }
    return false;
}
//Uploading files code ends---------------------------


//Uploading folder code starts---------------------------

//Create the folder heirarchy
function uploadFolder() {
    var FolderPath = '',
        arrFolders = [],
        IsRootFolder = true,
        IsPermission = true,
        arrTempFolder = '';
    DocUrlCollection = [];
    DocUrlCollection.push({ FileUrl: '', FileName: $('.NewFolderUpload').text().trim() });
    FinalFiles4Upload = [];
    if (Documentname.substr(Documentname.length - 1) == '/') {
        Documentname = Documentname.substring(0, Documentname.length - 1);
    }
    //Make the structure of FOlder
    for (var FolderLevel = 0; FolderLevel < FinalFoldersUpload.length; FolderLevel++) {
        arrFolders = FinalFoldersUpload[FolderLevel].webkitRelativePath.substr(0, FinalFoldersUpload[FolderLevel].webkitRelativePath.lastIndexOf("/"));
        arrFolders = checkFolderSpecialCharUpload(arrFolders);
        for (Folder = 0; Folder < arrFolders.split('/').length; Folder++) {
            if (Folder == 0) {
                FolderPath = Documentname;
            }
            if (Folder == 0 && FolderLevel == 0) {
                IsRootFolder = true;
            }
            else {
                IsRootFolder = false;
            }
            newSubfolderName = arrFolders.split('/')[Folder];
            if (checkSpecialCharaters(newSubfolderName) == true) {
                newSubfolderName = newSubfolderName.replaceAll(/[&\/\\#,+()$~%'":*.?<>{}]/g, '');
            }
            //First create a root folder
            var newSubfolderName = arrFolders.split('/')[Folder];
            if (IsRootFolder == true) {
                if (newSubfolderName.length < 2) {
                    alert("Folder's length can't be less than 2 character.");
                    waitingDialog.hide();
                    FinalFiles4Upload = [];
                    FinalFoldersUpload = [];
                    $("#txtFileTitle").val('');
                    $("#txtdocumentNo").val('');
                    $("#ddlFileType").val("-Select-");
                    $("#UploadFileComment").val('');
                    $("#txtUploadFolder").html('');
                    $("#txtUploadFolder").hide();
                    $("#myModalupload").modal('hide');
                    return false;
                }
                if (newSubfolderName.length > 200) {
                    alert('200 characters maximum folder length allowed.');
                    waitingDialog.hide();
                    FinalFiles4Upload = [];
                    FinalFoldersUpload = [];
                    $("#txtFileTitle").val('');
                    $("#txtdocumentNo").val('');
                    $("#ddlFileType").val("-Select-");
                    $("#UploadFileComment").val('');
                    $("#txtUploadFolder").html('');
                    $("#myModalupload").modal('hide');
                    return false;
                }
                //check if folder already exists
                var folderexistcheck = ChekFolderExistOrNot(FolderPath, newSubfolderName);
                if (folderexistcheck == false) {
                    if($("#RenameandUploadFolder").prop('checked') == true){
                        newSubfolderName = $("#txtNamePrefixFol").val().trim() + newSubfolderName + $("#txtNamePostfixFold").val().trim();
                    }
                    else {
                        alert('Folder already exists.');
                        waitingDialog.hide();
                        FinalFiles4Upload = [];
                        FinalFoldersUpload = [];
                        $("#txtFileTitle").val('');
                        $("#txtdocumentNo").val('');
                        $("#ddlFileType").val("-Select-");
                        $("#UploadFileComment").val('');
                        $("#txtUploadFolder").html('');
                        $("#txtUploadFolder").hide();
                        $("#myModalupload").modal('hide');
                        return false;
                    }
                }
                $.when(CreateDMSFolder(FolderPath, newSubfolderName, false)).done(function (MainExamListItemTemp) {//Folder created
                    if (MainExamListItemTemp.Exists != undefined) {
                        DocUrlCollection[0].FileName = checkFolderSpecialCharUpload(DocUrlCollection[0].FileName);
                        DocUrlCollection[0].FileUrl = MainExamListItemTemp.ServerRelativeUrl;
                        if (DMS_Link.includes("DocumentManagementSystem") == true || DMS_Link.includes("DepartmentalDMS") == true) {
                            if (DMS_Link.includes("DocumentManagementSystem") == true) {
                                libraryName = "DocumentManagementSystem";
                            } else {
                                libraryName = "DepartmentalDMS";
                            }
                        } else {
                            if (Documentname.indexOf('/') != -1) {
                                libraryName = Documentname.split('/')[0];
                            } else {
                                libraryName = Documentname;
                            }
                            //libraryName = "Documents";
                        }
                        Query = "?$select=Id,Author/EMail&$expand=Author&$orderby=Id desc&$Filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
                        if (libraryName.search(/\bDocuments\b/) >= 0 || libraryName == "Shared Documents"|| libraryName == "Shared%20Documents") {
                            libraryName = "Documents";
                        }
                        $.when(getItemsWithQuery(libraryName, Query, DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")))).done(function (DMSFolder) {
                            updateFolderDocProp(libraryName, DMSFolder[0].Id, DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")));
                        });
                        FolderPath = FolderPath + "/" + newSubfolderName;
                    }
                    else {
                        IsPermission = false;
                        FinalFiles4Upload = [];
                        FinalFoldersUpload = [];
                        $("#myModalupload").modal('hide')
                    }
                });
            }
            else {
                //check if folder already exists
                //var folderexistcheck = ChekFolderExistOrNot(FolderPath, newSubfolderName);
                if (folderexistcheck == true) {
                    $.when(CreateDMSFolder(FolderPath, newSubfolderName, false)).done(function (MainExamListItemTemp) {
                        if (MainExamListItemTemp.Exists != undefined) {
                            if (DMS_Link.includes("DocumentManagementSystem") == true || DMS_Link.includes("DepartmentalDMS") == true) {
                                if (DMS_Link.includes("DocumentManagementSystem") == true) {
                                    libraryName = "DocumentManagementSystem";
                                } else {
                                    libraryName = "DepartmentalDMS";
                                }
                            } else {
                                if (Documentname.indexOf('/') != -1) {
                                    libraryName = Documentname.split('/')[0];
                                } else {
                                    libraryName = Documentname;
                                }
                                //libraryName = "Documents";
                            }
                            if ($("#chkFolderProp").prop('checked') == true) {
                                if (libraryName.search(/\bDocuments\b/) >= 0 || libraryName == "Shared Documents"|| libraryName == "Shared%20Documents") {
                                    libraryName = "Documents";
                                }
                                Query = "?$select=Id,Author/EMail&$expand=Author&$orderby=Id desc&$Filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
                                $.when(getItemsWithQuery(libraryName, Query, DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")))).done(function (DMSFolder) {
                                    updateFolderDocProp(libraryName, DMSFolder[0].Id, DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")));
                                });
                            }
                            FolderPath = FolderPath + "/" + newSubfolderName;
                        }
                        else {
                            IsPermission = false;
                            FinalFiles4Upload = [];
                            FinalFoldersUpload = [];
                            $("#myModalupload").modal('hide')
                        }
                    });
                }
                else {
                    FolderPath = FolderPath + "/" + newSubfolderName;
                }
            }

        }

    }
    //Upload the files on the mentioned folder
    if (IsPermission == true) {
        var siteUrl = DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/"));
        if (Documentname[Documentname.length - 1] == '/') {
            var folderName = Documentname;
        }
        else {
            var folderName = Documentname + '/';
        }
        for (var file = 0; file < FinalFoldersUpload.length; file++) {
            var tempFolder = checkFolderSpecialCharUpload(FinalFoldersUpload[file].webkitRelativePath.substr(0, FinalFoldersUpload[file].webkitRelativePath.lastIndexOf("/")));
            FolderPath = folderName + tempFolder;
            uploadFolderDocuments(FolderPath, FinalFoldersUpload[file], siteUrl, file);
        }
    }
}

function uploadFolderDocuments(folderName, file, webUrl, LoopCount) {
    url = webUrl + "/_api/contextinfo";
    //var DocUrlCollection = [];
    $.ajax({
        url: url,
        type: "POST",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        contentType: "application/json;odata=verbose",
        success: function (data) {
            var digest = data.d.GetContextWebInformation.FormDigestValue;
            var libraryName = "";

            if (DMS_Link.includes("DocumentManagementSystem") == true || DMS_Link.includes("DepartmentalDMS") == true) {
                if (DMS_Link.includes("DocumentManagementSystem") == true) {
                    libraryName = "DocumentManagementSystem";
                } else {
                    libraryName = "DepartmentalDMS";
                }
            } else {
                if (Documentname.indexOf('/') != -1) {
                    libraryName = Documentname.split('/')[0];
                } else {
                    libraryName = Documentname;
                }
                //libraryName = "Documents";
            }

            var reader = new FileReader();
            var arrayBuffer;

            reader.onload = function (e) {
                arrayBuffer = reader.result;

                var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + libraryName;
                if (checkSpecialCharaters(file.name) == true) {
                    var changedFileName = file.name.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
                }
                else {
                    var changedFileName = file.name;
                }
                /*if (folderName.search(/\bDocuments\b/) >= 0) {
                    folderName = folderName.replace('Documents', 'Shared Documents');
                }*/
                
                if(folderName.includes('/Documents/') == true) {
			        folderName= folderName.replace("/Documents/", '/Shared%20Documents/');
			    }
			    else if(folderName== "Documents") {
			    	folderName = 'Shared%20Documents';
			    }
			    else if(folderName.includes('Documents/') == true && (folderName.includes('Shared Documents/') == false && folderName.includes('Shared%20Documents/') == false)){
			    	folderName= folderName.replace("Documents/", 'Shared%20Documents/');
			    }
                
                if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(webUrl)).done(function(GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                }
                url = webUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderName + "')/Files/add(url='" + changedFileName + "',overwrite=true)?@target='" + targetUrl + "'&$expand=ListItemAllFields";
                try {
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: arrayBuffer,
                        headers: {
                            "Accept": "application/json; odata=verbose",
                            "X-RequestDigest": RequestDigest
                        },
                        contentType: "application/json;odata=verbose",
                        processData: false,
                        success: function (response) {
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            var uploadedFileName = response.d.Name
                            var sharingLink = response.d.ServerRelativeUrl;
                            var propertiesServerRelativeUrl = '';
                            $.when(getTargetIDByUrl(webUrl, response.d.ServerRelativeUrl)).done(function (responsecurrentItemId) {
                                if($("#chkFolderProp").prop('checked') == true) {
                                    updateFolderDocProp(libraryName, responsecurrentItemId, webUrl);
                                }
                            });
                            if(FinalFoldersUpload.length == LoopCount + 1) {
                                FinalFiles4Upload = [];
                                FinalFoldersUpload = [];
                                if ($('#chkUploadMail').prop('checked') == true) {
                                    FolderUploadMail();
                                }
                                else {
                                    DocUrlCollection = [];
                                }
                                var tempDocName = Documentname;
                                if(Documentname.includes('/Documents/') == true) {
                                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                                } 
                                else if(Documentname == 'Documents') {
                                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                                } 
                                GetMyDocumentsWithFilesFolder(tempDocName);
                                waitingDialog.hide();
                                $("#myModalupload").modal('hide');
                                alert("Folder has been uploaded.");
                            }
                        },
                        error: function (errorr) {
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            waitingDialog.hide();
                            alert("Please try again something went wrong.<br/>" + JSON.stringify(errorr));
                            return false;
                        }
                    }).fail(function (error) {
                        RequestDigest = $("#__REQUESTDIGEST").val();
                        waitingDialog.hide();
                        alert(error.responseJSON.error.message.value);
                        return false;
                    });
                }
                catch (error) {
                    waitingDialog.hide();
                    console.log(error);
                    return false;
                }
            };
            reader.readAsArrayBuffer(file);
        },
        error: function (errorr) {
            waitingDialog.hide();
            alert("Please try again something went wrong.<br/>" + JSON.stringify(errorr));
            return false;
        }
    });
}

//get metdata of uploaded files
function updateFolderDocProp(ListName, currentitemId, webUrl) {
    var Metadata;
    if (ListName.search(/\bDocuments\b/) >= 0 || ListName == "Shared Documents"|| ListName == "Shared%20Documents") {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var ItemType = GetItemTypeForLibraryName(ListName);
    }
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#txtFileTitle").val(),
        DocumentNo: $("#txtdocumentNo").val(),
        DocumentType: $("#ddlFileType").val(),
        DocumentWrittenBy: $("#FileAuthor").val(),
        Details: $("#UploadFileComment").val()
    };
    updateFolderFileMetadata(ListName, Metadata, currentitemId, webUrl);
}


//Update metedata in library
function updateFolderFileMetadata(ListName, Metadata, ID, webUrl) {
    var dfd = $.Deferred();
    if (ListName.search(/\bDocuments\b/) >= 0 || ListName == "Shared Documents"|| ListName == "Shared%20Documents") {
        ListName = "Documents";
    }
    if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(webUrl)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var oweburl = webUrl + "/_api/Web/Lists/getByTitle('" + ListName + "')/Items(" + ID + ")";
    $.ajax({
        url: oweburl,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(Metadata),
        success: function (RESULT) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            dfd.resolve(true);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            waitingDialog.hide();
            if (error.responseText.indexOf('does not exist on type') != -1 || error.responseText.indexOf('The security validation for this page is i') != -1) {
                alert("Required columns does not exists. Kindly contact administrator to activate features.");
                $("#myModalupload").modal('hide');
                $("#txtUploadFiles").empty();
                $("#txtUploadFiles").hide();
                FinalFiles4Upload = [];
                FinalFoldersUpload = [];
            }
            else {
                var tempError = '';
                if(error.responseJSON.error.message.value == undefined) {
                    tempError = JSON.stringify(error);
                }
                else {
                    tempError = error.responseJSON.error.message.value;
                }
                alert(tempError);
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
//Validation for FolerName - upload
function checkFolderSpecialCharUpload(string) {
    var specialChars = "';.<>#%&*{}?:|\"\\~`()$<>,";
    for (i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            string = string.replaceAll(specialChars[i], "");
        }
    }
    return string;
}

//Uploading folder code ends---------------------------

//Multiple Files download method
function MultipleFileDownload() {
    var arrTempFolder = [];
    var FolderSiteURL = [];
    if (arrFileFolder.length > 0) {
        //for (var index = 0; index < arrFileFolder.length; index++) {
        arrFileFolder.forEach(function (entry, index) {
            var url = entry.ServerURL;
            if (entry.type == 'file') {
                //Extension = entry.FileFolderName.substring(entry.FileFolderName.lastIndexOf('.') + 1);
                Extension = entry.ServerURL.substring(entry.ServerURL.lastIndexOf('.') + 1);//Bhawana
                if(url.includes('/Documents/') == true) {
                    url = url.replace("/Documents/", "/Shared%20Documents/");
                } 
                if (Extension.toLowerCase() != "txt" && Extension.toLowerCase() != "png" && Extension.toLowerCase() != "jpeg" && Extension.toLowerCase() != "gif" && Extension.toLowerCase() != "jpg" && Extension.toLowerCase() != "pdf") {
                	$.fileDownload(url);
                }
                else {
	                var a = document.createElement("a");
	                a.setAttribute('href', (window.location.origin + url));
	                a.setAttribute('download', '');
	                a.setAttribute('target', '_blank');
	                a.click();
	            }
            }
            else {
                FolderSiteURL = entry.SiteURL;
                if (entry.ServerURL.search(/\bDocuments\b/) >= 0) {
                    entry.ServerURL = entry.ServerURL.replace('Documents', 'Shared Documents');
                }
                else if (entry.ServerURL.search(/\bShared%20Documents\b/) >= 0) {
                    entry.ServerURL = entry.ServerURL.replace('Shared%20Documents', 'Shared Documents');
                }

                var Ownurl = entry.SiteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + entry.ServerURL + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields";
                $.ajax({
                    url: Ownurl,
                    headers: { Accept: "application/json;odata=verbose" },
                    async: true,
                    success: function (data) {
                        var files = data.d.Files.results;
                        for (var file = 0; file < files.length; file++) {
                            Extension = files[file].Name.substring(files[file].Name.lastIndexOf('.') + 1);
                        	if(files[file].ServerRelativeUrl.includes('/Documents/') == true) {
			                    files[file].ServerRelativeUrl = files[file].ServerRelativeUrl.replace("/Documents/", "/Shared%20Documents/");
			                }
                            if (Extension.toLowerCase() != "txt" && Extension.toLowerCase() != "png" && Extension.toLowerCase() != "jpeg" && Extension.toLowerCase() != "gif" && Extension.toLowerCase() != "jpg" && Extension.toLowerCase() != "pdf") {
			                	$.fileDownload(files[file].ServerRelativeUrl);
			                }
			                else {
				                var a = document.createElement("a");
	                            a.setAttribute('href', window.location.origin + files[file].ServerRelativeUrl);
	                            a.setAttribute('download', '');
	                            a.setAttribute('target', '_blank');
	                            a.click();
	                        }
                        }
                        var folders = data.d.Folders.results;
                        for (var fold = 0; fold < folders.length; fold++) {
                            downloadFilesFromFolder(FolderSiteURL, folders[fold].ServerRelativeUrl);
                        }
                    }, eror: function (data) {
                        console.log('error');
                    }
                });
            }
            if ((index + 1) == arrFileFolder.length) {
                //alert("All the file(s)/folder(s) have been downloaded.");
                $(".chkFileFolder").prop("checked", false);
                $('#selectAllChk').prop("checked", "");
                $(".chkShareToMe").prop("checked", false);
                arrFileFolder = [];
            }
        });
    }
    else {
        alert("Please select any file or folder first.");
        return false;
    }
}

//download files from folder
function downloadFilesFromFolder(SiteURL, ServerURL) {
    if(ServerURL.includes('Documents') == true && ServerURL != 'Shared%20Documents/' && ServerURL.indexOf("Shared Documents") == -1) {
        ServerURL = ServerURL.replace('Documents', 'Shared Documents');
    }

    var Ownurl = SiteURL+ "/_api/Web/GetFolderByServerRelativeUrl('" + ServerURL + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var files = data.d.Files.results;
            for (var file = 0; file < files.length; file++) {
                Extension = files[file].Name.substring(files[file].Name.lastIndexOf('.') + 1);
            	if(files[file].ServerRelativeUrl.includes('/Documents/') == true) {
                    files[file].ServerRelativeUrl = files[file].ServerRelativeUrl.replace("/Documents/", "/Shared%20Documents/");
                }
            	if (Extension.toLowerCase() != "txt" && Extension.toLowerCase() != "png" && Extension.toLowerCase() != "jpeg" && Extension.toLowerCase() != "gif" && Extension.toLowerCase() != "jpg" && Extension.toLowerCase() != "pdf") {
                	$.fileDownload(files[file].ServerRelativeUrl);
                }
                else {
                	var a = document.createElement("a");
	                a.setAttribute('href', window.location.origin + files[file].ServerRelativeUrl);
	                a.setAttribute('download', '');
	                a.setAttribute('target', '_blank');
	                a.click();
	            }
            }
            var folders = data.d.Folders.results;
            for (var fold = 0; fold < folders.length; fold++) {
                downloadFilesFromFolder(SiteURL, folders[fold].ServerRelativeUrl);
            }
        }, eror: function (data) {
            console.log('error');
        }
    });

}

//Multiple File and folder delete.
function MultipleFileFolderDelete() {
    if (arrFileFolder.length > 0) {
        if (confirm("Are you sure,you want to delete this file/folder?") == true) {
            var itemUpdated = 0;
            FailDueToCheckOut = 0;
            if(Documentname[Documentname.length - 1] == '/') {
                var folderName = Documentname;
            }
            else {
                var folderName = Documentname + '/';
            }

            for (var index = 0; index < arrFileFolder.length; index++) {
                if (arrFileFolder[index].type == 'file') {
                    if (IsFileCheckout(folderName, arrFileFolder[index].FileFolderName, arrFileFolder[index].SiteURL, '') != true) {
                        if(arrFileFolder[index].SelectedLibrary.search(/\bShared%20Documents\b/) >= 0) {
                            arrFileFolder[index].SelectedLibrary= arrFileFolder[index].SelectedLibrary.replace("Shared%20Documents", 'Documents');
                        }
                        if (arrFileFolder[index].SiteURL != _spPageContextInfo.webAbsoluteUrl) {
                            $.when(GetFormDigestValue(arrFileFolder[index].SiteURL)).done(function(GetFormDigestValue) {
                                RequestDigest = GetFormDigestValue
                            });
                        }
                        $.ajax({
                            url: arrFileFolder[index].SiteURL + "/_api/web/lists/GetByTitle('" + arrFileFolder[index].SelectedLibrary + "')/items('" + arrFileFolder[index].DocumentId + "')",
                            type: "POST",
                            async: false,
                            headers:
			                {
			                    "X-RequestDigest": RequestDigest,
			                    "IF-MATCH": "*",
			                    "X-HTTP-Method": "DELETE"
			                },
                            success: function (data) {
                                itemUpdated++;
                                RequestDigest = $("#__REQUESTDIGEST").val();
                                if (itemUpdated == arrFileFolder.length) {
                                    if (FailDueToCheckOut == 0) {
                                        alert("All the files/folders have been deleted.");
                                    }
                                    else {
                                        alert(FailDueToCheckOut + " files couldn't be deleted because of locked others have been deleted successfully.");
                                    }
                                    $(".chkFileFolder").prop("checked", false);
                                    $('#selectAllChk').prop("checked", false);
                                    arrFileFolder = [];
                                    var tempDocName = Documentname;
                                    if(Documentname.search(/\bDocuments\b/) >= 0) {
                                        tempDocName = "Shared%20Documents";
                                    }
                                    GetMyDocumentsWithFilesFolder(tempDocName);
                                }
                                //itemUpdated++;
                            },
                            error: function (data) {
                                RequestDigest = $("#__REQUESTDIGEST").val();
                                if(data.responseText.includes("Access is denied") == true) {
                                    alert("You don't have the required permission on "+arrFileFolder[index].FileFolderName+" to perform this operation.");
                                    return false;
                                }
                                else {
                                    alert(data.responseText);
                                    return false;
                                }
                            }
                        });
                    }
                    else {
                        FailDueToCheckOut++;
                        itemUpdated++;
                        RequestDigest = $("#__REQUESTDIGEST").val();
                        if (FailDueToCheckOut == arrFileFolder.length) {
                            waitingDialog.hide();
                            FailDueToCheckOut = 0;
                            alert("Selected file(s) are locked, couldn't be deleted.");
                            $(".chkFileFolder").prop("checked", false);
                            $('#selectAllChk').prop("checked", false);
                            arrFileFolder = [];
                        }
                        if (itemUpdated == arrFileFolder.length) {
                            if (FailDueToCheckOut == 0) {
                                alert("All the files/folders have been deleted.");
                            }
                            else {
                                alert(FailDueToCheckOut + " file(s) are locked, couldn't be deleted.\nOther files(s) have been deleted successfully.");
                            }
                            $(".chkFileFolder").prop("checked", false);
                            $('#selectAllChk').prop("checked", false);
                            arrFileFolder = [];
                            var tempDocName = Documentname;
                            if(Documentname.search(/\bDocuments\b/) >= 0) {
                                tempDocName = "Shared%20Documents";
                            }
                            GetMyDocumentsWithFilesFolder(tempDocName);
                        }

                    }
                }
                else { //Folder deletion
                    if(arrFileFolder[index].ServerURL.search(/\bDocuments\b/) >= 0) {
                        arrFileFolder[index].ServerURL = arrFileFolder[index].ServerURL.replace('Documents', 'Shared Documents');
                    }
                    if (arrFileFolder[index].SiteURL != _spPageContextInfo.webAbsoluteUrl) {
                        $.when(GetFormDigestValue(arrFileFolder[index].SiteURL)).done(function(GetFormDigestValue) {
                            RequestDigest = GetFormDigestValue
                        });
                    }
                    $.ajax({
                        url: arrFileFolder[index].SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + arrFileFolder[index].ServerURL + "')",
                        method: "POST",
                        async: false,
                        headers: {
                            "X-RequestDigest": RequestDigest,
                            "IF-MATCH": "*",
                            "X-HTTP-Method": "DELETE"
                        },
                        success: function (data) {
                            itemUpdated++;
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            var Query = "?$select=ID,DocumentID&$filter=DocumentID eq '" + arrFileFolder[index].DocumentId + "' ";
                            $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SharedLInks) {
                                if (SharedLInks.length > 0) {
                                    for (var index = 0; index < SharedLInks.length; index++) {
                                        DeleteSharedLinks(SharedLInks[index].ID);//delete link
                                    }
                                }
                            });
                            
                            if (itemUpdated == arrFileFolder.length) {
                                if (FailDueToCheckOut == 0) {
                                    alert("All the files/folders have been deleted.");
                                }
                                else {
                                    alert(FailDueToCheckOut + " files couldn't be deleted because of locked others have been deleted successfully.");
                                }
                                $(".chkFileFolder").prop("checked", false);
                                $('#selectAllChk').prop("checked", false);
                                arrFileFolder = [];
                                var tempDocName = Documentname;
                                if(Documentname.search(/\bDocuments\b/) >= 0) {
                                    tempDocName = "Shared%20Documents";
                                }
                                GetMyDocumentsWithFilesFolder(tempDocName);
                            }
                        },
                        error: function (data) {
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            if(data.responseText.includes("Access is denied") == true) {
                                alert("You don't have the required permission on "+arrFileFolder[index].FileFolderName+" to perform this operation.");
                                return false;
                            }
                            else {
                                alert(data.responseText);
                                return false;
                            }
                        }
                    });
                }
            }
        }
    }
    else {
        alert("Please select any file or folder first.");
        return false;
    }
}

//Add custom column for Property Update
function AddCustomColumns() {
    var Columns = '';
    arrCustomCol = [];
    var customColQ = '';
    var Title = '';

    Title = 'Guest Portal Documents';
    var Query = "?$select=*&$top=5&$filter=Title eq '" + Title + "' and DMS_Type eq '" + DMS_Type + "' and ColumnType eq 'Custom' ";
    $.when(getItemsWithQuery("DMSColumnSetting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (CustomCols) {
        if (CustomCols.length > 0) {

            for (var index = 0; index < CustomCols.length; index++) {
                Columns = '';
                customColQ += 'ListItemAllFields/' + CustomCols[index].ColumnName + ",";
                Columns += '<div class="col-sm-6 form-check-box customCol"><div class="form-group custom-form-group">';
                Columns += '<label>' + CustomCols[index].ColumnName + ':</label>';
                if (CustomCols[index].DataType == "Text") {
                    Columns += '<input type="text" class="form-control" maxlength="250" id="Custom' + CustomCols[index].ColumnName + '">';
                }
                else if (CustomCols[index].DataType == "Date") {
                    Columns += '<input type="text" class="form-control CustomDateCol" id="Custom' + CustomCols[index].ColumnName + '">';
                }
                else if (CustomCols[index].DataType == "Number") {
                    Columns += '<input type="number" class="form-control" id="Custom' + CustomCols[index].ColumnName + '">';
                }
                Columns += '</div><div class="checkbox ml5 mb0">';
                Columns += '<label><input type="checkbox" value="" id="chkUpdate' + CustomCols[index].ColumnName + '"></label></div></div>';
                arrCustomCol.push({
                    chkId: "chkUpdate" + CustomCols[index].ColumnName,
                    ColName: CustomCols[index].ColumnName,
                    controlId: "Custom" + CustomCols[index].ColumnName,
                    colType: CustomCols[index].DataType
                });
                $("#ColumnBox").append(Columns);
                //var tempVar = CustomCols[index].ColumnName;
                if (CustomCols[index].DataType == "Date") {
                    $("#Custom" + CustomCols[index].ColumnName).datepicker("destroy");
                    $("#Custom" + CustomCols[index].ColumnName).datepicker();
                    $("#Custom" + CustomCols[index].ColumnName).datepicker("option", "dateFormat", "MM dd, yy");
                    $("#Custom" + CustomCols[index].ColumnName).change(function () {
                        if (this.value.trim() != "") {
                            var tempVar = this.id.replace('Custom', '');
                            $('#chkUpdate' + tempVar).prop('checked', 'checked');
                        }
                    });
                }
                else {
                    $("#Custom" + CustomCols[index].ColumnName).keyup(function () {
                        if (this.value.trim() != "") {
                            var tempVar = this.id.replace('Custom', '');
                            $('#chkUpdate' + tempVar).prop('checked', 'checked');
                        }
                    });
                }
            }
        }
    });
    return customColQ;
}

//get single file properties and find it
function getSingleFileProperty(ServerURL, FileFolderType, FileFolderSite, customColQ) {
    if (ServerURL.search(/\bDocuments\b/) >= 0) {
        ServerURL = ServerURL.replace("Documents", "Shared%20Documents");
    }
    else if (ServerURL.search(/\bShared Documents\b/) >= 0) {
        ServerURL = ServerURL.replace("Shared Documents", "Shared%20Documents");
    }
    if (FileFolderType == 'file') {
        var webURL = FileFolderSite + "/_api/web/GetFileByServerRelativeUrl('" + ServerURL + "')?$expand=ListItemAllFields,Author,Files/Author,Editor&$select= LockedByUser,CheckedOutByUser,DocumentWrittenBy,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentType,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," + customColQ +
        "ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Acknowledgement,ListItemAllFields/Title,ListItemAllFields/Approval,ListItemAllFields/FileLeafRef,ListItemAllFields/ServerRedirectedEmbedUri,ListItemAllFields/Modified_x0020_By";
    }
    else {
        var webURL = FileFolderSite + "/_api/web/GetFolderByServerRelativeUrl('" + ServerURL + "')?$expand=ListItemAllFields,Author,Files/Author,Editor&$select= LockedByUser,CheckedOutByUser,DocumentWrittenBy,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentType,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," + customColQ +
	        "ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Acknowledgement,ListItemAllFields/Title,ListItemAllFields/Approval,ListItemAllFields/FileLeafRef,ListItemAllFields/ServerRedirectedEmbedUri,ListItemAllFields/Modified_x0020_By";
    }
    while (customColQ.indexOf("ListItemAllFields/") != -1) {
        customColQ = customColQ.replace("ListItemAllFields/", "");
    }
    customColQ = customColQ.substring(0, customColQ.length - 1);
    $.ajax({
        url: webURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var FileValue = data.d.ListItemAllFields;
            $("#txtUpdateTitle").val(FileValue.Title ? FileValue.Title : "");
            if (FileValue.DocumentType != "--select--" && FileValue.DocumentType != null && FileValue.DocumentType != "-Select-") {
                $("#txtUpdateType").val(FileValue.DocumentType);
            }
            $("#txtUpdateRef").val(FileValue.DocumentNo ? FileValue.DocumentNo : "");
            $("#txtUpdateAuthor").val(FileValue.DocumentWrittenBy);
            if (FileValue.FileValidity != "" && FileValue.FileValidity != null && FileValue.FileValidity != "null") {
                $("#txtUpdateValidity").val(moment(new Date(FileValue.FileValidity)).format("MMM DD YYYY"));
            }
            $("#txtUpdateDetails").val(FileValue.Details ? FileValue.Details : "");
            //Custom COlumn
            var tempCustom = [];
            if (customColQ != '') {
                tempCustom = customColQ.split(',');
                for (cus = 0; cus < tempCustom.length; cus++) {
                    if (new Date(FileValue[tempCustom[cus]]) != "Invalid Date") {
                        if (FileValue[tempCustom[cus]] != null && FileValue[tempCustom[cus]] != "null") {
                            $("#Custom" + tempCustom[cus]).val(moment(new Date(FileValue[tempCustom[cus]])).format("YYYY-MM-DD"));
                        }
                    }
                    else {
                        $("#Custom" + tempCustom[cus]).val(FileValue[tempCustom[cus]] ? FileValue[tempCustom[cus]] : "");
                    }
                }
            }
        },
        eror: function (data) {
            console.log("Error in getting properties" + JSON.stringify(data));
        }
    }).fail(function (error) {
        alert(error.responseJSON.error.message.value);
        return false;
    });
}

//to update the selected properties of the file
function UpdateFileFolderProperties() {
    var dfd = $.Deferred();
    var currentFileName = '';
    var tempCopyLib = arrFileFolder[0].SelectedLibrary;
    if (tempCopyLib.includes('_') == true) {
        tempCopyLib = tempCopyLib.replace('_', '_x005f_');
    }
    if (tempCopyLib.includes('%20') == true) {
        tempCopyLib = tempCopyLib.replace('%20', '_x0020_');
    }

    if (tempCopyLib.search(/\bDocuments\b/) >= 0 || tempCopyLib == "Shared Documents" || tempCopyLib == "Shared%20Documents") {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var ItemType = GetItemTypeForLibraryName(tempCopyLib);
    }

    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#txtUpdateTitle").val(),
        DocumentNo: $("#txtUpdateRef").val(),//Reference
        DocumentType: $("#txtUpdateType").val(),
        DocumentWrittenBy: $("#txtUpdateAuthor").val(),
        Details: $("#txtUpdateDetails").val(),
        SubCategory: $("#txtUpdateSubType").val(),
        FileValidity: new Date().toISOString()
    };

    if ($("#chkUpdateTitle").prop('checked') == false) {
        delete Metadata["Title"];
    }

    if ($("#chkUpdateRef").prop('checked') == false) {
        delete Metadata["DocumentNo"];
    }

    if ($("#chkUpdateType").prop('checked') == false) {
        delete Metadata["DocumentType"];
    }
    if ($("#chkUpdateSubType").prop('checked') == false) {
        delete Metadata["SubCategory"];
    }
    if ($("#chkUpdateAuthor").prop('checked') == false) {
        delete Metadata["DocumentWrittenBy"];
    }
    if ($("#chkUpdateValidity").prop('checked') == true) {
        Metadata["FileValidity"] = new Date($("#txtUpdateValidity").val()).toISOString();
    }
    else {
        delete Metadata["FileValidity"];
    }
    if ($("#chkUpdateDetails").prop('checked') == false) {
        delete Metadata["Details"];
    }
    if ($('#ColumnBox').find('.customCol').length > 0) {
        for (var col = 0; col < arrCustomCol.length; col++) {
            if ($("#" + arrCustomCol[col].chkId).prop('checked') == true) {
                if (arrCustomCol[col].colType == "Text") {
                    Metadata[arrCustomCol[col].ColName] = $("#" + arrCustomCol[col].controlId).val();
                }
                else if (arrCustomCol[col].colType == "Date") {
                    Metadata[arrCustomCol[col].ColName] = new Date($("#" + arrCustomCol[col].controlId).val()).toISOString();
                }
                else if (arrCustomCol[col].colType == "Number") {
                    Metadata[arrCustomCol[col].ColName] = parseInt($("#" + arrCustomCol[col].controlId).val());
                }
            }
        }
    }
    FailDueToCheckOut = 0;
    if (Documentname[Documentname.length - 1] == '/') {
        var folderName = Documentname;
    }
    else {
        var folderName = Documentname + '/';
    }
    arrFileFolder.forEach(function (entry, index) {

        currentFileName = entry.FileFolderName;
        if (entry.type == 'file' || entry.type.toLowerCase() == 'folder') {
            if (IsFileCheckout(folderName, entry.FileFolderName, entry.SiteURL, '') != true && entry.type == 'file') {
                if (entry.SelectedLibrary == "Shared%20Documents" || entry.SelectedLibrary == "Shared Documents") {
                    entry.SelectedLibrary = "Documents";
                }
                if (entry.SiteURL != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(entry.SiteURL)).done(function (GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                }
                $.ajax({
                    url: entry.SiteURL + "/_api/web/lists/getbytitle('" + entry.SelectedLibrary + "')/items(" + entry.DocumentId + ")",
                    type: "POST",
                    async: false,
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose",
                        "X-RequestDigest": RequestDigest,
                        "IF-MATCH": "*",             //Overrite the changes in the sharepoint list item
                        "X-HTTP-Method": "MERGE"      // Specifies the update operation in sharepoint list
                    },
                    data: JSON.stringify(Metadata),
                    success: function (data) {
                        RequestDigest = $("#__REQUESTDIGEST").val();
                        if (arrFileFolder.length == (index + 1)) {
                            $('.btnCloseProp').trigger('click');
                            if (FailDueToCheckOut == 0) {
                                alert("Properties have been updated.");
                            }
                            else {
                                alert(FailDueToCheckOut + " file(s) are locked, couldn't be updated.\nOther files(s) have been updated successfully.");
                            }
                            $("#ModalDisplayProperty").modal('hide');
                            $("#btnUpdateProp").prop('disabled', '');
                            arrFileFolder = [];
                            $(".clearValue").val('');
                            $("#txtUpdateType").val('-Select-');
                            $("#txtUpdateSubType").val('-Select-');
                            $(".chkFileFolder").prop("checked", "");
                            var tempDocName = Documentname;
                            if (Documentname.includes('/Documents/') == true) {
                                tempDocName = "Shared%20Documents";
                            }
                            GetMyDocumentsWithFilesFolder(tempDocName);
                        }
                        dfd.resolve(data);
                    },
                    error: function (error) {
                        RequestDigest = $("#__REQUESTDIGEST").val();
                        if (arrFileFolder.length == (index + 1)) {
                            arrFileFolder = [];
                        }
                        if (error.responseText.indexOf('does not exist on type') != -1) {
                            var tempDocName = Documentname;
                            if (Documentname.includes('/Documents/') == true) {
                                tempDocName = "Shared%20Documents";
                            }
                            FailDueToCheckOut = 0;
                            if (tempDocName[tempDocName.length - 1] == '/') {
                                var targetServerRaltiveUrl = tempDocName;
                            }
                            else {
                                var targetServerRaltiveUrl = tempDocName + '/';
                            }
                            GetMyDocumentsWithFilesFolder(targetServerRaltiveUrl);
                            $("#Properties").modal('hide');
                            alert("Required columns does not exist. Kindly contact administrator.");
                        }
                        else if (error.responseText.indexOf("Access is denied") != -1) {
                            alert("You don't have the required permission on " + currentFileName + " to perform this operation.");
                        }
                        else {
                            var tempError = '';
                            if (error.responseJSON.error.message.value == undefined) {
                                tempError = JSON.stringify(error);
                            }
                            else {
                                tempError = error.responseJSON.error.message.value;
                            }
                            alert(currentFileName + " - " + tempError);
                        }
                        $("#btnUpdateProp").prop('disabled', '');
                        dfd.reject(error);
                    }
                });
                return dfd.promise();
            }
            else {
                if (entry.type == 'folder') {
                    if (entry.SelectedLibrary == "Shared%20Documents" || entry.SelectedLibrary == "Shared Documents") {
                        entry.SelectedLibrary = "Documents";
                    }
                    if (entry.SiteURL != _spPageContextInfo.webAbsoluteUrl) {
                        $.when(GetFormDigestValue(entry.SiteURL)).done(function (GetFormDigestValue) {
                            RequestDigest = GetFormDigestValue
                        });
                    }
                    $.ajax({
                        url: entry.SiteURL + "/_api/web/lists/getbytitle('" + entry.SelectedLibrary + "')/items(" + entry.DocumentId + ")",
                        type: "POST",
                        async: false,
                        headers: {
                            "accept": "application/json;odata=verbose",
                            "content-type": "application/json;odata=verbose",
                            "X-RequestDigest": RequestDigest,
                            "IF-MATCH": "*",             //Overrite the changes in the sharepoint list item
                            "X-HTTP-Method": "MERGE"      // Specifies the update operation in sharepoint list
                        },
                        data: JSON.stringify(Metadata),
                        success: function (data) {
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            if (arrFileFolder.length == (index + 1)) {
                                $('.btnCloseProp').trigger('click');
                                if (FailDueToCheckOut == 0) {
                                    alert("Properties have been updated.");
                                }
                                else {
                                    alert(FailDueToCheckOut + " file(s) are locked, couldn't be updated.\nOther files(s) have been updated successfully.");
                                }
                                $("#ModalDisplayProperty").modal('hide');
                                $("#btnUpdateProp").prop('disabled', '');
                                arrFileFolder = [];
                                $(".clearValue").val('');
                                $("#txtUpdateType").val('-Select-');
                                $("#txtUpdateSubType").val('-Select-');
                                $(".chkFileFolder").prop("checked", "");
                                var tempDocName = Documentname;
                                if (Documentname.includes('/Documents/') == true) {
                                    tempDocName = "Shared%20Documents";
                                }
                                GetMyDocumentsWithFilesFolder(tempDocName);
                            }
                            dfd.resolve(data);
                        },
                        error: function (error) {
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            if (arrFileFolder.length == (index + 1)) {
                                arrFileFolder = [];
                            }
                            if (error.responseText.indexOf('does not exist on type') != -1 || error.responseText.indexOf('The security validation for this page is i') != -1) {
                                var tempDocName = Documentname;
                                if (Documentname.includes('/Documents/') == true) {
                                    tempDocName = "Shared%20Documents";
                                }
                                FailDueToCheckOut = 0;
                                if (tempDocName[tempDocName.length - 1] == '/') {
                                    var targetServerRaltiveUrl = tempDocName;
                                }
                                else {
                                    var targetServerRaltiveUrl = tempDocName + '/';
                                }
                                GetMyDocumentsWithFilesFolder(targetServerRaltiveUrl);
                                $("#Properties").modal('hide');
                                alert("Required columns does not exist. Kindly contact administrator.");
                            }
                            else if (error.responseText.indexOf("Access is denied") != -1) {
                                alert("You don't have the required permission on " + currentFileName + " to perform this operation.");
                            }
                            else {
                                var tempError = '';
                                if (error.responseJSON.error.message.value == undefined) {
                                    tempError = JSON.stringify(error);
                                }
                                else {
                                    tempError = error.responseJSON.error.message.value;
                                }
                                alert(currentFileName + " - " + tempError);
                            }
                            $("#btnUpdateProp").prop('disabled', '');
                            dfd.reject(error);
                        }
                    });
                    return dfd.promise();
                }
                else {

                    FailDueToCheckOut++;
                    if (FailDueToCheckOut == arrFileFolder.length) {
                        waitingDialog.hide();
                        FailDueToCheckOut = 0;
                        $('.btnCloseProp').trigger('click');
                        alert("Selected file(s) are locked, couldn't be updated.");
                        $("#ModalDisplayProperty").modal('hide');
                        $("#btnUpdateProp").prop('disabled', '');
                        arrFileFolder = [];
                        $(".clearValue").val('');
                        $("#txtUpdateType").val('-Select-');
                        $("#txtUpdateSubType").val('-Select-');
                        $(".chkFileFolder").prop("checked", "");
                    }
                    else {
                        if (arrFileFolder.length == (index + 1)) {
                            $('.btnCloseProp').trigger('click');
                            if (FailDueToCheckOut == 0) {
                                alert("Properties have been updated.");
                            }
                            else {
                                alert(FailDueToCheckOut + " file(s) are locked, couldn't be updated.\nOther files(s) have been updated successfully.");
                            }
                            $("#ModalDisplayProperty").modal('hide');
                            $("#btnUpdateProp").prop('disabled', '');
                            arrFileFolder = [];
                            $(".clearValue").val('');
                            $("#txtUpdateType").val('-Select-');
                            $("#txtUpdateSubType").val('-Select-');
                            $(".chkFileFolder").prop("checked", "");
                            var tempDocName = Documentname;
                            if (Documentname.includes('/Documents/') == true) {
                                tempDocName = "Shared%20Documents";
                            }
                            GetMyDocumentsWithFilesFolder(tempDocName);
                        }
                    }
                }
            }
        }
        else {
            if (arrFileFolder.length == (index + 1)) {
                $('.btnCloseProp').trigger('click');
                if (FailDueToCheckOut == 0) {
                    alert("Properties have been updated.");
                }
                else {
                    alert(FailDueToCheckOut + " file(s) are locked, couldn't be updated.\nOther files(s) have been updated successfully.");
                }
                FailDueToCheckOut = 0;
                $("#ModalDisplayProperty").modal('hide');
                $("#btnUpdateProp").prop('disabled', '');
                arrFileFolder = [];
                $(".chkFileFolder").prop("checked", "");
                var tempDocName = Documentname;
                if (Documentname.includes('/Documents/') == true) {
                    tempDocName = "Shared%20Documents";
                }
                if (tempDocName[tempDocName.length - 1] == '/') {
                    var targetServerRaltiveUrl = tempDocName;
                }
                else {
                    var targetServerRaltiveUrl = tempDocName + '/';
                }
                GetMyDocumentsWithFilesFolder(targetServerRaltiveUrl);
            }
        }

    });
}

//to update the selected properties of the file
function UpdateFileProperties() {
    var dfd = $.Deferred();
    if (CopyLibrary.search(/\bDocuments\b/) >= 0) {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else if (CopyLibrary == "Shared Documents" || CopyLibrary == "Shared%20Documents") {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var ItemType = GetItemTypeForLibraryName(CopyLibrary);
    }
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#txtUpdateTitle").val(),
        DocumentNo: $("#txtUpdateRef").val(),//Reference
        DocumentType: $("#txtUpdateType").val(),
        DocumentWrittenBy: $("#txtUpdateAuthor").val(),
        Details: $("#txtUpdateDetails").val(),
        SubCategory: $("#txtUpdateSubType").val(),
        //FileValidity: new Date($("#txtUpdateValidity").val()).toISOString()
        FileValidity: new Date().toISOString()//Bhawana
    };
    if ($("#chkUpdateTitle").prop('checked') == false) {
        delete Metadata["Title"];
    }
    else {
        $("#FileTitle").text($("#txtUpdateTitle").val());
    }

    if ($("#chkUpdateRef").prop('checked') == false) {
        delete Metadata["DocumentNo"];
    }
    else {
        $("#FileReference").text($("#txtUpdateRef").val());
    }

    if ($("#chkUpdateType").prop('checked') == false) {
        delete Metadata["DocumentType"];
    }
    else {
        $("#FileDocType").text("(" + $("#txtUpdateType").val() + ")");
    }
    if ($("#chkUpdateSubType").prop('checked') == false) {
        delete Metadata["SubCategory"];
    }
    else {
        $("#FileDocSubType").text($("#txtUpdateSubType").val());
    }
    if ($("#chkUpdateAuthor").prop('checked') == false) {
        delete Metadata["DocumentWrittenBy"];
    }
    else {
        $("#FileAuthorPopup").text($("#txtUpdateAuthor").val());
    }
    if ($("#chkUpdateValidity").prop('checked') == false) {
        delete Metadata["FileValidity"];
    }
    else {
        $("#FileValidityPopup").text($("#txtUpdateValidity").val());
    }

    if ($("#chkUpdateDetails").prop('checked') == false) {
        delete Metadata["Details"];
    }
    else {
        $("#FileDetalis").text($("#txtUpdateDetails").val());
    }
    if ($('#ColumnBox').find('.customCol').length > 0) {
        for (var col = 0; col < arrCustomCol.length; col++) {
            if ($('#ColumnBox').find('.customCol').length > 0) {
                for (var col = 0; col < arrCustomCol.length; col++) {
                    if ($("#" + arrCustomCol[col].chkId).prop('checked') == true) {
                        if (arrCustomCol[col].colType == "Text") {
                            Metadata[arrCustomCol[col].ColName] = $("#" + arrCustomCol[col].controlId).val();
                            $("#CustomPopup" + arrCustomCol[col].ColName).text($("#" + arrCustomCol[col].controlId).val());
                        }
                        else if (arrCustomCol[col].colType == "Date") {
                            Metadata[arrCustomCol[col].ColName] = new Date($("#" + arrCustomCol[col].controlId).val()).toISOString();
                            $("#CustomPopup" + arrCustomCol[col].ColName).text(titanForWork.convertJSONDateAMPMWithDate(new Date($("#" + arrCustomCol[col].controlId).val()).toISOString()));
                        }
                        else if (arrCustomCol[col].colType == "Number") {
                            Metadata[arrCustomCol[col].ColName] = parseInt($("#" + arrCustomCol[col].controlId).val());
                            $("#CustomPopup" + arrCustomCol[col].ColName).text($("#" + arrCustomCol[col].controlId).val());
                        }
                    }
                }
            }
        }
    }
    if (CopyLibrary == "Shared%20Documents" || CopyLibrary == "Shared Documents") {
        CopyLibrary = "Documents";
    }
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    $.ajax({
        url: CopySourceURL + "/_api/web/lists/getbytitle('" + CopyLibrary + "')/items(" + DocumentId + ")",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "IF-MATCH": "*",             //Overrite the changes in the sharepoint list item
            "X-HTTP-Method": "MERGE"      // Specifies the update operation in sharepoint list
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            var tempDocName = Documentname;
            if (Documentname.search(/\bDocuments\b/) >= 0) {
                tempDocName = "Shared%20Documents";
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
            $('.btnCloseProp').trigger('click');
            alert("Properties have been updated.");
            $("#btnUpdateProp").prop('disabled', '');
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.indexOf('does not exist on type') != -1) {
                alert("Required columns does not exists. Kindly contact administrator to activate features.");
            }
            else if (error.responseText.indexOf("Access is denied") != -1) {
                alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
            }
            else {
                var tempError = '';
                if (error.responseJSON.error.message.value == undefined) {
                    tempError = JSON.stringify(error);
                }
                else {
                    tempError = error.responseJSON.error.message.value;
                }
                alert(tempError);
            }
            $("#btnUpdateProp").prop('disabled', '');
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Delete the Shared Folder links
function DeleteSharedLinks(filesFolderId) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SharedDocument')/items('" + filesFolderId + "')",
        type: "POST",
        async: false,
        headers:
        {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data, status, xhr) {
            console.log("Shared link has been removed.");
        },
        error: function (xhr, status, error) {
            waitingDialog.hide();
            console.log(xhr.responseText);
        }
    });
}

//Clear the library filter boxes values
function ClearLibraryFilter() {
	$("#FileTypeList").val('All');
    $("#ddlFilterDocType").val('All');
    $("#ddlFilterSubType").empty().append('<option value="All">All</option>');
    $("#txtFilterRefe").val('');
    $("#txtFilterAuthor").val('');
    $("#ddlShareFilter").val('All');
    $("#ddlFilterApprovl").val('All');
    $("#FilterModFrom").val('');
    $("#FilterModTo").val('');
}

//Library Filter method
function LibraryFilter() {
    var arrTemp = [],
		arrSearchExt = [],
		DocType = '',
		SubType = '',
		DocNo = '',
		FileAuthor = '',
		Permission = '',
		Approval = '',
        customColQuery = '',
		FileExt = '';
		
    var FormattedFromDate = moment($("#FilterModFrom").val()).format("MM/DD/YYYY");;
    if (FormattedFromDate == "Invalid date" || FormattedFromDate == "Invalid Date") {
        FormattedFromDate = 'null';
    }
    else {
        FormattedFromDate = new Date(FormattedFromDate);
    }
    var FormattedToDate = moment($("#FilterModTo").val()).format("MM/DD/YYYY");;
    if (FormattedToDate == "Invalid date" || FormattedToDate == "Invalid Date") {
        FormattedToDate = 'null';
    }
    else {
        FormattedToDate = new Date(FormattedToDate);
    }
    arrSearchExt = getFileExtenson();
    arrTemp = arrFilterTable.filter(function (obj, index) {

        FileExt = obj.files.Name.substring(obj.files.Name.lastIndexOf('.') + 1).toLowerCase();
        if(obj.files.ListItemAllFields != undefined){ //for other libraries
            DocType = obj.files.ListItemAllFields.DocumentType;
            SubType = obj.files.ListItemAllFields.SubCategory;
            DocNo = obj.files.ListItemAllFields.DocumentType;
            FileAuthor = obj.files.ListItemAllFields.DocumentWrittenBy;
            Permission = obj.files.ListItemAllFields.PermissionLevel;
            Approval = obj.files.ListItemAllFields.Approval;
            dt = new Date(obj.files.ListItemAllFields.Modified);
            ModifiedDate = new Date(moment(dt).format("MM/DD/YYYY"));
            if(Permission == null) {
                Permission = 'Not Shared';
            }
            //for section which has custom column
            /*if($('#FilterControlBox').find('.customColFilter').length > 0) {
                customColQuery = ' &&';
                for(var col=0;col<arrCustomColFilter.length;col++) {
                    if (arrCustomColFilter[col].colType == "Text") {
                        if(obj.files.ListItemAllFields.arrCustomColFilter[col].ColName == null || obj.files.ListItemAllFields.arrCustomColFilter[col].ColName == '' || obj.files.ListItemAllFields.arrCustomColFilter[col].ColName == "--select--" || obj.files.ListItemAllFields.arrCustomColFilter[col].ColName == "-Select-") {
                            obj.files.ListItemAllFields.arrCustomColFilter[col].ColName = 'null';
                        }
                        customColQuery += ($("#"+arrCustomColFilter[col].controlId).val().trim() == "null" ? obj.files.ListItemAllFields.arrCustomColFilter[col].ColName != "null" : (obj.files.ListItemAllFields.arrCustomColFilter[col].ColName.toLowerCase() == $("#"+arrCustomColFilter[col].controlId).val().toLowerCase() || obj.files.ListItemAllFields.arrCustomColFilter[col].ColName.toLowerCase().indexOf($("#"+arrCustomColFilter[col].controlId).val().toLowerCase()) != -1));
                    }
                    else if (arrCustomColFilter[col].colType == "Date") {
                        var FormattedCustomDate = moment($("#"+arrCustomColFilter[col].controlId).val()).format("MM/DD/YYYY");;
                        if (FormattedCustomDate == "Invalid date" || FormattedCustomDate == "Invalid Date") {
                            FormattedCustomDate = 'null';
                        }
                        var dt = new Date(obj.files.ListItemAllFields.arrCustomColFilter[col].ColName);
                        CustomDate = moment(dt).format("MM/DD/YYYY");
                        customColQuery += " &&" + (FormattedCustomDate == "null" ? CustomDate != "null" : CustomDate == FormattedCustomDate );

                    }
                    else if (arrCustomColFilter[col].colType == "Number") {
                        if(obj.files.ListItemAllFields.arrCustomColFilter[col].ColName == null || obj.files.ListItemAllFields.arrCustomColFilter[col].ColName == '' || obj.files.ListItemAllFields.arrCustomColFilter[col].ColName == "--select--" || obj.files.ListItemAllFields.arrCustomColFilter[col].ColName == "-Select-") {
                            obj.files.ListItemAllFields.arrCustomColFilter[col].ColName = 'null';
                        }
                        customColQuery += ($("#"+arrCustomColFilter[col].controlId).val().trim() == "null" ? obj.files.ListItemAllFields.arrCustomColFilter[col].ColName != "null" : (obj.files.ListItemAllFields.arrCustomColFilter[col].ColName.toLowerCase() == $("#"+arrCustomColFilter[col].controlId).val().toLowerCase() || obj.files.ListItemAllFields.arrCustomColFilter[col].ColName.toLowerCase().indexOf($("#"+arrCustomColFilter[col].controlId).val().toLowerCase()) != -1));
                    }
                }
            }*/
        }
        else { //For my Favorite
            IsMyfavorate = true;
            DocType = obj.files.DocumentType;
            SubType = obj.files.SubCategory;
            DocNo = obj.files.DocumentNo;
            FileAuthor = obj.files.DocumentWrittenBy;
            Permission = obj.files.PermissionLevel;
            Approval = obj.files.ApprovalStatus;
            dt = new Date(obj.files.Modified);
            ModifiedDate = new Date(moment(dt).format("MM/DD/YYYY"));
            if(Permission == null) {
                Permission = 'Not Shared';
            }
        }
        if (DocNo == null || DocNo == '') {
            DocNo = "null";
        }
        if (FileAuthor == null || FileAuthor == '') {
            FileAuthor = "null";
        }
        /*if($("#ddlShareFilter").val() == "Not Shared") {
            Permission = null;
        }*/
        if(DocType == null || DocType == '' || DocType == "--select--" || DocType == "-Select-") {
            DocType = 'null';
        }
        if(SubType == null || SubType == '' || SubType == "--select--" || SubType == "-Select-") {
            SubType = 'null';
        }
        return ($("#FileTypeList").val() == "All" ? FileExt != "" : arrSearchExt.includes(FileExt.toLowerCase()) ) &&
                ($("#ddlFilterDocType").val() == "All" ? DocType != "" : DocType == $("#ddlFilterDocType").val() ) &&
                ($("#ddlFilterSubType").val() == "All" ? SubType != "" : SubType == $("#ddlFilterSubType").val() ) &&
                ($("#txtFilterRefe").val().trim() == "null" ? DocNo != "null" : (DocNo.toLowerCase() == $("#txtFilterRefe").val().toLowerCase() || DocNo.toLowerCase().indexOf($("#txtFilterRefe").val().toLowerCase()) != -1)) &&
                ($("#txtFilterAuthor").val().trim() == "null" ? FileAuthor != "null" : (FileAuthor.toLowerCase() == $("#txtFilterAuthor").val().toLowerCase() || FileAuthor.toLowerCase().indexOf($("#txtFilterAuthor").val().toLowerCase()) != -1)) &&
                ($("#ddlShareFilter").val() == "All" ? Permission != "" : Permission == $("#ddlShareFilter").val() ) &&
                ($("#ddlFilterApprovl").val() == "All" ? Approval != "" : Approval == $("#ddlFilterApprovl").val() ) &&
                (FormattedFromDate == "null" ? ModifiedDate != "null" : ModifiedDate >= FormattedFromDate ) &&
                (FormattedToDate == "null" ? ModifiedDate != "null" : ModifiedDate <= FormattedToDate); //+ customColQuery;
    });   
        
    $("#generateBradCumbNew").empty();
    $("#groupDocumentGridtbody").empty();
    if(arrTemp.length == 0){
        $("#groupDocumentGridtbody").append('<tr><td colspan="12" style="text-align:center;">No record found!</td></tr>');
        waitingDialog.hide();
         //Tableagination();//3 April 23
        //3 April 23
        if($('#groupDocumentGridtbody tr')[0] != null) {
            if($('#groupDocumentGridtbody tr')[0].innerText.indexOf('No record found') != -1) {
                $("#groupDocumentGrid_paginate").hide();
                $("#groupDocumentGrid_info").hide();
            }
            else {
                $("#groupDocumentGrid_info").css('display', 'inline-block');
            }
        }
        else {
            $("#groupDocumentGrid_info").css('display', 'inline-block');
        }
        //3 April 23
    }
    else {
        var ColumnName = '';
        ColumnName += '<th class="text-center border-bottom-0 w-2 disableSort">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label>' +
        '</th>';
        for (var i = 0; i < arrCurrentColumns.length; i++) {
            if (arrCurrentColumns[i].ColumnName == "DocumentNo") {
                ColumnName += '<th><span class="TblHeader" data-localize="Reference">Reference</span></th>';
	
            } else if (arrCurrentColumns[i].ColumnName == "DocumentType") {
                ColumnName += '<th><span class="TblHeader" data-localize="Category">Category</span></th>';
	
            } else if (arrCurrentColumns[i].ColumnName == "ApprovedByOutsider" || arrCurrentColumns[i].ColumnName == "ApprovedBy") {
                ColumnName += '<th class="disableSort" data-localize="Approval">Approval</th>';
	
            } else if (arrCurrentColumns[i].ColumnName == "Shared") {
                ColumnName += '<th class="disableSort" data-localize="Sharing">Sharing</th>';
            } 
            else if (arrCurrentColumns[i].ColumnName == "Modified") {
                ColumnName += '<th><span class="TblHeader" id="dteModified" data-localize="Modified" onclick="SortOnDate(this);">Modified</span></th>';
            }
            else {
                ColumnName += '<th><span class="TblHeader" data-localize="' + arrCurrentColumns[i].ColumnName + '">' + arrCurrentColumns[i].ColumnName + '</span></th>';
            }
        }
        //thead
        $("#DMSTable").empty().html('<table class="table mb-0 custom-table tablemanager" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
        $("#theadItem").html("");
        $("#theadItem").append(ColumnName);
		
        arrTemp.forEach(function (entry, index) {
            genrateHtmlgrid(entry.Icon, entry.ColumnCount, entry.files, entry.rowCount, entry.Type, "Filter");
            if (arrTemp.length == (index + 1)) {
                waitingDialog.hide();
            }
        });
        $(".chkFileFolder").click(function() {
            var Properties = this.value.split(',');
            if (this.checked == true) {
                arrFileFolder.push({
                    type: Properties[0].trim(),
                    ServerURL: Properties[1].trim(),
                    DocumentId: Properties[2].trim(),
                    SiteURL: Properties[3].trim(),
                    SelectedLibrary: Properties[4].trim(),
                    FileFolderName: Properties[5].trim(),
                    CopyFileLink: Properties[6].trim(),
                    FileTitle: Properties[7].trim(),
                    FileRef: Properties[8].trim(),
                    FileType: Properties[9].trim(),
                    DocType: Properties[10].trim(),
                    fileFilderInheritance: $(this).data('inherit')
                });
            } else {
                var selected = this.value;
                arrFileFolder = arrFileFolder.filter(function(obj) {
                    return obj.DocumentId != Properties[2].trim();
                });
            }
        });
        $("#selectAllChk").click(function(e) {
            waitingDialog.show();
            if (this.checked == true) {
                $('.chkFileFolder').prop("checked", "");
                $('.chkFileFolder').trigger('click');
            } else {
                $('.chkFileFolder').prop("checked", "");
                arrFileFolder = [];
            }
            waitingDialog.hide();
           
        });
        // $("#groupDocumentGrid").append(html);
        Tableagination();
    }
}

//decide the file extension 
function getFileExtenson(Ext) {
    var SearchValue = [];
    if ($("#FileTypeList").val() == "Word") {
        SearchValue = ["doc", "docx"];
        return SearchValue;
    }
    else if ($("#FileTypeList").val() == "Excel") {
        SearchValue = ["xlsx", "xlsm", "csv", "xls"];
        return SearchValue;
    }
    else if ($("#FileTypeList").val() == "PowerPoint") {
        SearchValue = ["pptx", "pptm", "ppt", "ppsm"];
        return SearchValue;
    }
    else if ($("#FileTypeList").val() == "Text") {
        SearchValue = ["txt"];
        return SearchValue;
    }
    else if ($("#FileTypeList").val() == "PDF") {
        SearchValue = ["pdf", "ps"];
        return SearchValue;
    }
    else if ($("#FileTypeList").val() == "Image") {
        SearchValue = ["png", "jpeg", "jpg", "gif", "tiff", "raw", "psd"];
        return SearchValue;
    }
    else if ($("#FileTypeList").val() == "Video") {
        SearchValue = ["mp4", "mp3", "wmv", "avi", "mkv", "avchd", "webcam"];
        return SearchValue;
    }
    else if ($("#FileTypeList").val() == "HTML") {
        SearchValue = ["html", "htm"];
        return SearchValue;
    }
    else if ($("#FileTypeList").val() == "Zip") {
        SearchValue = ["rar", "xml", "zip"];
        return SearchValue;
    }
    else {
        SearchValue.push('All');
        return SearchValue;
    }
}

//Delete the file in case of 'Delete' and 'Move'
function DeleteFileFromSource(Action) {
    if (CopyLibrary == "Shared%20Documents") {
        CopyLibrary = "Documents";
    }
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    $.ajax({
        url: CopySourceURL + "/_api/web/lists/GetByTitle('" + CopyLibrary + "')/items('" + DocumentId + "')",
        type: "POST",
        async: false,
        headers:
        {
            "X-RequestDigest": RequestDigest,
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data, status, xhr) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            $('#ModalDisplayProperty').modal('hide');
            CopyLibrary = '';
            CopyDestURL = '';
            //CopyFolderName = '';
            if (Action == "DeleteFile") {
                alert("File has been successfully deleted.");
                var tempDocName = Documentname;
                $("#ModalDisplayProperty").modal('hide');
                if (Documentname.search(/\bDocuments\b/) >= 0) {
                    tempDocName = "Shared%20Documents";
                }
                GetMyDocumentsWithFilesFolder(tempDocName);
            }
            else {
                //alert("File has been successfully moved.");
            }
        },
        error: function (xhr, status, error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (xhr.responseText.includes("Access is denied") == true) {
                alert("You don't have the required permission to perform this operation.");
                return false;
            }
            else {
                alert(xhr.responseText);
                return false;
            }
        }
    });
}

//Add Approval method starts ----------------------------------

//Edit the already added step
function EditAddedStep(EmpEmail, DisplayNames, EmpIds) {
    var StepCount = $('#LiCount').text();
    var ApprovalStep = '';
    var StepName = $("#AddEditStepName").val();
    var TypeValue = '';
    var UserValid = true;
    var ValidCount = 0;
    var InValidUser = [];
    if ($("#userselection").prop('checked')) {
        TypeValue = "userselection";
        if ($("#ddlSign").val() != "Adobe Sign") {
            for (var usr = 0; usr < EmpIds.length; usr++) {
                UserValid = checkUserValid(EmpEmail[usr]);
                if (UserValid == false) {
                    InValidUser.push(DisplayNames[usr]);
                    EmpEmail = EmpEmail.filter(function (obj) {
                        return obj.toLowerCase() !== EmpEmail[usr].toLowerCase();
                    });
                    DisplayNames = DisplayNames.filter(function (obj) {
                        return obj.toLowerCase() !== DisplayNames[usr].toLowerCase();
                    });
                    EmpIds = EmpIds.filter(function (obj) {
                        return obj != EmpIds[usr];
                    });
                }
            }
        }

        ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">' + EmpEmail.toString() + '</span><span id="EmpIdStep' + StepCount + '">' + EmpIds.toString() + '</span><span id="NameStep' + StepCount + '">' + DisplayNames.toString() + '</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span></div>';
        ApprovalStep += '<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
        ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
        ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
        ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';

        for (var usr = 0; usr < EmpIds.length; usr++) {
            ValidCount++;
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(EmpEmail[usr]);
            ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
            ApprovalStep += '<h4>' + DisplayNames[usr] + '</h4><a href="javascript:void(0);" style="cursor:pointer;" onclick="OpenEmail(\'' + EmpEmail[usr] + '\');">' + EmpEmail[usr] + '</a></div></div>';
        }
        ApprovalStep += '</div>';
    }
    else {
        ValidCount++;
        TypeValue = "outsidesetion";
        ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">' + $("#OutsiderEmail").val() + '</span><span id="EmpIdStep' + StepCount + '">NA</span><span id="NameStep' + StepCount + '">' + DisplayNames.toString() + '</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span></div>';
        ApprovalStep += '<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
        ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
        ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
        ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';

        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly($("#OutsiderEmail").val());
        ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
        ApprovalStep += '<h4>' + $("#OutsiderName").val() + '</h4><a href="javascript:void(0);" style="cursor:pointer;" onclick="OpenEmail(\'' + $("#OutsiderEmail").val() + '\');">' + $("#OutsiderEmail").val() + '</a></div></div>';
        ApprovalStep += '</div>';
    }
    multipleEmailAddress = [];
    assignUserName = [];
    EmpIds = [];
    if (ValidCount > 0) {
        $('.NewStep' + $("#LiCount").text()).empty().html(ApprovalStep);
        $("#userHTMLBox").empty();
        $("#AddEditStepName").val('');
        $(".userBox").hide();
    }
    if ($("#ddlSign").val() != "Adobe Sign") {
        if (InValidUser.length > 0) {
            alert(InValidUser.join(', ') + " user(s) are not valid.");
        }
    }
}

//to add more Approval step
function AddMoreStep(EmpEmail, DisplayNames, EmpIds, OtherStepDetails) {
    var StepCount = $('#accordionapprovers .StepClass').length + 1;
    var ApprovalStep = '';
    var StepName = $("#AddEditStepName").val();
    var TypeValue = '';
    var UserValid = true;
    var EmptyArray = [];
    var ValidCount = 0;
    var InValidUser = [];
    if (EmpEmail[0] != 'Runtime') {
        if ($("#userselection").prop('checked')) {
            EmpIds = EmpIds.filter(function (obj) {
                return !Number.isNaN(obj);
            });
            if ($("#ddlSign").val() != "Adobe Sign") {
                for (var usr = 0; usr < EmpIds.length; usr++) {
                    UserValid = checkUserValid(EmpEmail[usr]);
                    if (UserValid == false) {
                        InValidUser.push(DisplayNames[usr]);
                        EmpEmail = EmpEmail.filter(function (obj) {
                            return obj.toLowerCase() !== EmpEmail[usr].toLowerCase();
                        });
                        DisplayNames = DisplayNames.filter(function (obj) {
                            return obj.toLowerCase() !== DisplayNames[usr].toLowerCase();
                        });
                        EmpIds = EmpIds.filter(function (obj) {
                            return obj != EmpIds[usr];
                        });
                    }
                }
            }

            TypeValue = "userselection";
            ApprovalStep += '<li class="StepClass removeDiv NewStep' + StepCount + '">';
            ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">' + EmpEmail.toString() + '</span><span id="EmpIdStep' + StepCount + '">' + EmpIds.toString() + '</span><span id="NameStep' + StepCount + '">' + DisplayNames.toString() + '</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span>';
            ApprovalStep += '<span id="DecideStep' + StepCount + '">' + OtherStepDetails[0].ApproverDecidingStep + '</span><span id="AppRoleStep' + StepCount + '">' + OtherStepDetails[0].ApproverRole + '</span><span id="AppTypeStep' + StepCount + '">' + OtherStepDetails[0].ApproverType + '</span><span id="InitialsSign' + StepCount + '">' + $("#chkFooterSign").prop('checked') + '</span></div>';
            ApprovalStep += '<div class="dropdown ForCustomizeOnly"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
            ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
            ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
            ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';

            for (var usr = 0; usr < EmpIds.length; usr++) {
                ValidCount++;
                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(EmpEmail[usr]);
                ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                ApprovalStep += '<h4>' + DisplayNames[usr] + '</h4><a href="javascript:void(0);" style="cursor:pointer;" onclick="OpenEmail(\'' + EmpEmail[usr] + '\');">' + EmpEmail[usr] + '</a></div></div>';
            }
            ApprovalStep += '</div></li>';
        }
        else {
            ValidCount++;
            TypeValue = "outsidesetion";
            ApprovalStep += '<li class="StepClass removeDiv NewStep' + StepCount + '">';
            ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">' + $("#OutsiderEmail").val() + '</span><span id="EmpIdStep' + StepCount + '">NA</span><span id="NameStep' + StepCount + '">' + $("#OutsiderName").val() + '</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span>';
            ApprovalStep += '<span id="DecideStep' + StepCount + '">' + OtherStepDetails[0].ApproverDecidingStep + '</span><span id="AppRoleStep' + StepCount + '">' + OtherStepDetails[0].ApproverRole + '</span><span id="AppTypeStep' + StepCount + '">' + OtherStepDetails[0].ApproverType + '</span><span id="InitialsSign' + StepCount + '">false</span></div>';
            ApprovalStep += '<div class="dropdown ForCustomizeOnly"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
            ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
            ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
            ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly($("#OutsiderEmail").val());
            ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
            ApprovalStep += '<h4>' + $("#OutsiderName").val() + '</h4><a href="javascript:void(0);" style="cursor:pointer;" onclick="OpenEmail(\'' + $("#OutsiderEmail").val() + '\');">' + $("#OutsiderEmail").val() + '</a></div></div>';
            ApprovalStep += '</div></li>';
        }
    }
    else { //if Step decider is 'RunTime'
        ValidCount++;
        TypeValue = "RunTime";
        if(OtherStepDetails[0].ApproverDecidingStep == "Initiation") {
            ApprovalStep += '<li class="StepClass removeDiv NewStep' + StepCount + '">';
	        ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">NA</span><span id="EmpIdStep' + StepCount + '">NA</span><span id="NameStep' + StepCount + '">will be provided at Runtime</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span>';
	        ApprovalStep += '<span id="DecideStep' + StepCount + '">' + OtherStepDetails[0].ApproverDecidingStep + '</span><span id="AppRoleStep' + StepCount + '">' + OtherStepDetails[0].ApproverRole + '</span><span id="AppTypeStep' + StepCount + '">' + OtherStepDetails[0].ApproverType + '</span><span id="InitialsSign' + StepCount + '">' + $("#chkFooterSign").prop('checked') + '</span></div>';
	        ApprovalStep += '<div class="dropdown ForCustomizeOnly"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
	        ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
	        ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
	        ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';
	        var attachment = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
	        ApprovalStep += '<div class="col-sm-6 flexitem" id="IniApp'+StepCount +'"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
	        ApprovalStep += '<h4>Will be decided by Initiator.</h4><a href="javascript:void(0);" style="cursor:pointer;"></a></div>';
	        ApprovalStep += '<div class="InitiatorApp"><button type="button" class="btn custom-btn wpx-87" onclick="DisplayInitiatorApp(\'NewStep' + StepCount + '\', \'' + StepCount + '\', \'' + StepName + '\', \'' + EmptyArray + '\')">Add Approver</button></div>';
	        
	        ApprovalStep += '</div></div></li>';

        }
        else {
            ApprovalStep += '<li class="StepClass removeDiv NewStep' + StepCount + '">';
	        ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">NA</span><span id="EmpIdStep' + StepCount + '">NA</span><span id="NameStep' + StepCount + '">will be provided at Runtime</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span>';
	        ApprovalStep += '<span id="DecideStep' + StepCount + '">' + OtherStepDetails[0].ApproverDecidingStep + '</span><span id="AppRoleStep' + StepCount + '">' + OtherStepDetails[0].ApproverRole + '</span><span id="AppTypeStep' + StepCount + '">' + OtherStepDetails[0].ApproverType + '</span><span id="InitialsSign' + StepCount + '">' + $("#chkFooterSign").prop('checked') + '</span></div>';
	        ApprovalStep += '<div class="dropdown ForCustomizeOnly"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
	        ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
	        ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
	        ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';
	        var attachment = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
	        ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
	        ApprovalStep += '<h4>Will be decided by ' + OtherStepDetails[0].ApproverDecidingStep + ' Approvers.</h4><a href="javascript:void(0);" style="cursor:pointer;"></a></div></div>';
	        ApprovalStep += '</div></li>';
        }
    }
    if (ValidCount > 0) {
        $("#accordionapprovers").append(ApprovalStep);
        $("#ApprovalStepBox").show();
        $(".userBox").hide();
    }
    if ($("#ddlSign").val() != "Adobe Sign") {
        if (InValidUser.length > 0) {
            alert(InValidUser.join(', ') + " user(s) are not valid.");
        }
    }
}

//Display Popup for Approver by Initiator
function DisplayInitiatorApp(HTMLID, StepCount, StepName, arrEMails) {
    initializePeoplePicker("pplIniTiatorApp", true);
    if(arrEMails.length > 0) {
    	arrEMails = arrEMails.split(',');
    	for (var user = 0; user < (arrEMails.length) ; user++) {
    		SetAndResolveOutPeoplePicker('pplIniTiatorApp', arrEMails[user], false);
    	}
    }
    $("#Predefined-Ini-App").modal('show');
    $("#ParentbtnAddApp").empty().append('<button type="button" class="btn custom-btn wpx-87" id="btnAddApp">Submit</button>');
    var HTMLId = HTMLID;
    var StepCount = StepCount;
    var StepName = StepName;
    $("#btnAddApp").click(function (e) {
        AddInitiatorApp(HTMLID, StepCount, StepName, arrEMails);
    });
}

//Add Approver by Initiator
function AddInitiatorApp(HTMLID, StepCount, StepName) {
    var ApprovalStep = [];
    var ValidCount = 0;
    var InValidUser = [];
    var AppNames = [];
    var AppEmails = [];
    var AppEIds = [];
    var TypeValue = "userselection";
    getPplUserInfo('pplIniTiatorApp', AppEmails, AppNames, AppEIds);
    if(AppEmails.length > 0){
	    for (var usr = 0; usr < AppEmails.length; usr++) {
	        UserValid = checkUserValid(AppEmails[usr]);
	        if (UserValid == false) {
	            InValidUser.push(AppNames[usr]);
	            AppEmails = AppEmails.filter(function (obj) {
	                return obj.toLowerCase() !== AppEmails[usr].toLowerCase();
	            });
	            AppNames = AppNames.filter(function (obj) {
	                return obj.toLowerCase() !== AppNames[usr].toLowerCase();
	            });
	            AppEIds = AppEIds.filter(function (obj) {
	                return obj != AppEIds[usr];
	            });
	        }
	    }
	    ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">' + AppEmails.toString() + '</span><span id="EmpIdStep' + StepCount + '">' + AppEIds.toString() + '</span><span id="NameStep' + StepCount + '">' + AppNames.toString() + '</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span>';
	    ApprovalStep += '<span id="DecideStep' + StepCount + '"></span><span id="AppRoleStep' + StepCount + '"></span><span id="AppTypeStep' + StepCount + '">Specific</span><span id="InitialsSign' + StepCount + '">' + $("#chkFooterSign").prop('checked') + '</span></div>';
	    ApprovalStep += '<div class="dropdown ForCustomizeOnly" style="display:none;"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
	    ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
	    ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
	    ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';
	
	    for (var usr = 0; usr < AppEIds.length; usr++) {
	        ValidCount++;
	        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(AppEmails[usr]);
	        ApprovalStep += '<div class="col-sm-6 flexitem"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
	        ApprovalStep += '<h4>' + AppNames[usr] + '</h4><a href="javascript:void(0);" style="cursor:pointer;" onclick="OpenEmail(\'' + AppEmails[usr] + '\');">' + AppEmails[usr] + '</a></div></div>';
	    }
	    ApprovalStep += '<div class="InitiatorApp"><button type="button" class="btn custom-btn wpx-87" onclick="DisplayInitiatorApp(\'NewStep' + StepCount + '\', \'' + StepCount + '\', \'' + StepName + '\', \'' + AppEmails.toString() + '\')">Add Approver</button></div>';
	    ApprovalStep += '</div>';
	    $("." + HTMLID).empty().append(ApprovalStep);
	    $("#Predefined-Ini-App").modal('hide');
	}
	else {
		alert("Kindly enter approvers.");
		return false;
	}
}

//set name in People picker
function SetAndResolveOutPeoplePicker(controlNameID, LoginNameOrEmail, peoplePickerDisable) {
    var peoplePickerDiv = $("[id^='" + controlNameID + "']");
    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
    peoplePicker.AddUserKeys(LoginNameOrEmail);
    if (peoplePickerDisable == true) {
        $('#' + controlNameID + '_TopSpan_EditorInput').attr('disabled', true);
        $('.sp-peoplepicker-delImage').hide();
    }
}

//get user information from people picker
function getPplUserInfo(PeoplepickerId, AppEmails, AppNames, AppEIds) {
    // Get the people picker object from the page. 
    var userIds = [];
    var uniqueValues = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if (!peoplePicker.IsEmpty()) {
        if (peoplePicker.HasInputError) return false; // if any error  
        else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users  
        else if (peoplePicker.TotalUserCount > 0) {
            // Get information about all users.  
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            var promise = '';
            var UsersID = '';
            for (var i = 0; i < users.length; i++) {
                var accountName = users[i].Key;
                AppEmails.push(users[i].EntityData.Email); AppNames.push(users[i].DisplayText);
                var userId = GetUserID(accountName);
                if (uniqueValues.indexOf(userId) == -1) {
                    AppEIds.push(userId);
                }
            }
            return AppEIds;
        }
    } else {
        return AppEIds;
    }
}

//to change the approver names and Step name 
function EditStep(StepCount) {
    $("#SuccessorStepHeader").text("Edit Step");
    $("#LiCount").text(StepCount);
    var user = '';
    multipleEmailAddress = [];
    assignUserName = [];
    EmpIds = [];
    multipleEmailAddress = $("#EmailStep" + StepCount).text().split(',');
    assignUserName = $("#NameStep" + StepCount).text().split(',');
    EmpIds = $("#EmpIdStep" + StepCount).text().split(',');
    $("#AddEditStepName").val($("#StepName" + StepCount).text());
    $("#" + $("#TypeStep" + StepCount).text()).prop("checked", "checked");
    if ($("#TypeStep" + StepCount).text() == "outsidesetion") {
        $("#OutsiderName").val(assignUserName[0]);
        $("#OutsiderEmail").val(multipleEmailAddress[0]);
        $("#userbox-1").hide();
        $("#userbox-2").show();
        $("#userHTMLBox").empty();
    }
    else {
        $("#userbox-1").show();
        $("#userbox-2").hide();
        $(".userBox").show();
        $("#OutsiderName").val('');
        $("#OutsiderEmail").val('');
        for (var usr = 0; usr < EmpIds.length ; usr++) {
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(multipleEmailAddress[usr]);
            user += '<div class="col-sm-6 parentremove">';
            user += '<div class="employeesection"><span class="crosebox" onclick="removeUserBox(this, \'' + multipleEmailAddress[usr] + '\', \'' + assignUserName[usr] + '\', ' + EmpIds[usr] + ');">';
            user += '<i class="fa fa-times"></i></span><div class="empoyeeimg"><img src="' + attachment + '" alt="">';
            user += '</div><div class="employeeinfo"><h3>' + assignUserName[usr] + '</h3>';
            user += '<span class="employeeemail" style="cursor:pointer;" onclick="OpenEmail(\'' + multipleEmailAddress[usr] + '\');">' + multipleEmailAddress[usr] + '</span></div></div></div>';
        }
        $("#userHTMLBox").append(user);
    }

}
//to delete the selected step
function DeleteSeletedStep(StepCount) {
    $(".NewStep" + StepCount).remove();
    if ($.trim($("#accordionapprovers").html()) == "") {
        $("#ApprovalStepBox").hide();
    }
}
//check if user is valid or not
function checkUserValidOld(Email) {
    var IsUserValid = false;
    var RestQuery = "?$select=Status,LogonName/EMail&$expand=LogonName&$filter= Status eq 'Active' and LogonName/EMail eq '" + Email + "'&$top=5000";
    $.when(getItemsWithQuery("Employees", RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (Employees) {
        try {
            if (Employees.length > 0) {
                IsUserValid = true;
            }
        }
        catch (e) {
            alert(e);
        }
    });
    return IsUserValid;
}
//Bhawana
function checkUserValid(Email) {
    var IsUserValid = false;
    var RestQuery = "?$select=Status,LogonName/EMail&$expand=LogonName&$filter= Status eq 'Active' and LogonName/EMail eq '" + Email + "'&$top=5000";
    $.when(getItemsWithQuery("Employees", RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (Employees) {
        try {
            if (Employees.length > 0) {
                IsUserValid = true;
            }
            else
            {//
                RestQuery = "?$select=Status,email&$filter= Status eq 'Active' and email eq '" + Email + "'&$top=5000";
                $.when(getItemsWithQuery("ExternalUsers", RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (ExternalUsers) {
                    try {
                        if (ExternalUsers.length > 0) {
                            IsUserValid = true;
                        }
                    }
                    catch (e) {
                        alert(e);
                    }
                });
            }//
        }
        catch (e) {
            alert(e);
        }
    });
    return IsUserValid;
}

//Clear all the control boxes in Approval Popup
function ClearAprovalControls() {
    $("#accordionapprovers .removeDiv").remove();
    $("#userHTMLBox").empty();
    $("#txtPurpose").val('');
    $("#ddlPriority").val('Medium');
    $("#txtNote").val('');
    $("#noDueDate").prop('checked', 'checked');
    $("#dueDateField").prop('disabled', 'disabled');
    $("#dueDateField").val('');
    $("#ddlSign").val('Adobe Sign');
    $("#ddlAppStep").val('Customize');
    $("#ddlAppStep").trigger('change');
    multipleEmailAddress = [];
    assignUserName = [];
    EmpIds = [];
}


//submit the details in 'DocumentApprovalRequests' list
function AddDocApproval() {
    var Metadata;
    var ItemType = GetItemTypeForListName('DocumentApprovalRequests');
    var FileTitle = $("#FileTitle").text();
    if (FileTitle == "") {
        FileTitle = $("#FileName").text();
    }
    var NextActionAppId = [];
    var arrTempApprovers = [];
    var DueDate = null;
    var ValidityDate = null;
    if ($("#noDueDate").prop('checked') == false) {
        DueDate = GetDateStandardFormat(moment($('#dueDateField').val()).format('DD/MM/YYYY'));
    }
    if ($("#noAppValidDate").prop('checked') == false) {
        ValidityDate = GetDateStandardFormat(moment($('#AppValidDateField').val()).format('DD/MM/YYYY'));
    }
    var OriginSection = '';
    if(CopyLibrary == 'DocumentManagementSystem') {
        OriginSection = "My-DMS: " + _spPageContextInfo.userDisplayName;
    }
    else if(currentSectionType == 'Group Documents'){
        OriginSection = "Group" + ": " + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'Department') {
        OriginSection = "Department: " + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'ProjectDocuments') {
        OriginSection = "Project: " + $(".headdingLinks").text();
    }
    else if(currentSectionType == "GuestDocuments") {
        OriginSection = "Guest: " + $(".headdingLinks").text();
    }
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        OriginDMS: CopyLibrary,
        OriginSection: OriginSection,
        ApprovalFrom: $(".headdingLinks").text(),
        LibraryLink: CopySourceURL,
        DocumentID: DocumentId,
        FileName: $("#FileName").text(),
        Title: FileTitle,
        DocumentType: $("#FileDocType").text(),
        Reference: $("#FileReference").text(),
        Purpose: $("#txtPurpose").val(),
        ApprovalFileTitle: $("#FileTitle").text(),
        Remarks: $("#txtNote").val(),
        Priority: $("#ddlPriority").val(),
        DueDate: DueDate,
        ApprovalValidity: ValidityDate,
        SigningApp: $("#ddlSign").val(),
        ApprovalSteps: $("#ddlAppStep").val(),
        Status: "Pending",
        FileServerURL: $("#FilePath").text(),
        NextActionbyId: {
            'results': arrTempApprovers
        },
        NextActionApprover: '',
        NextAction: $("#StepName1").text(),
        ApprovedVersion: $("#FileVersion").text(),
        ActionByTimeZone: LoggedIn_TimeZone,
		SubCategory: $("#FileDocSubType").text()
    };

    if ($("#ddlSign").val() == "E-Sign") {
        NextActionAppId = $("#EmpIdStep1").text().split(',');
        if (NextActionAppId[0] == "NA") {
            arrTempApprovers = [];
            Metadata["NextActionApprover"] = $("#EmailStep1").text().split(',')[0];
            delete Metadata["NextActionbyId"];
            //ApproverType = "Outsider";
        }
        else {
            //ApproverType = "User";
            NextActionAppId.filter(function (data) {
                arrTempApprovers.push(parseInt(data));
            });
            Metadata["NextActionbyId"].results = arrTempApprovers;
            delete Metadata["NextActionApprover"];
        }
    }
    else {
        delete Metadata["NextAction"];
        delete Metadata["NextActionbyId"];
        delete Metadata["NextActionApprover"];
    }

    // Add metedata to defined SP list
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalRequests')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
        	if(FinalFiles4Upload.length > 0) {
                UploadSupportedFiles(data.d.ID, 'DocumentApprovalRequests', 'Initiator');
            }
            else {
            	UploadDocAsAttachment(data.d.ID, DocumentId, parseInt($("#FileVersion").text()).toString());
            }
        },
        error: function (error) {
            $("#overlaysearch").fadeOut();
            console.log(JSON.stringify(error));
        }
    });
}

//upload Initiator Supported Files
function UploadSupportedFiles(ItemId, ListName, Action) {
    var counter = 0;
    if (FinalFiles4Upload.length > 0) {
        $.each(FinalFiles4Upload, function (index, value) {
            getFileBuffer(value).then(function (buffer) {

                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig, "");
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items(" + ItemId + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    				},
                    success: function (data) {
                        counter = counter + 1;
                        if (FinalFiles4Upload.length == counter) {
                        	if(Action == 'Initiator') {
                            	UploadDocAsAttachment(ItemId, DocumentId, parseInt($("#FileVersion").text()).toString());
                            	$('#ApprovlUploadBox').html('');
                            }
                            else {
                            	//Do Nothing
                            }
                            $('#UploadBoxCancel').html('');
                            $('#UploadBoxForward').html('');
                            $('#UploadBoxReject').html('');
                            $('#UploadBoxApprove').html('');
                            finalFiles = [];
                            FinalFiles4Upload = [];
                        }
                    },
                    error: function (data) {
                        console.log(data.responseText.error);
                    }
                });
            });
        });
    }
}
//Upload Document library as attachment in 'DocumentApprovalRequests' list
function UploadDocAsAttachment(UploadItemId, DocId, FileVer) {
    // Create XHR, Blob and FileReader objects
    var xhr = new XMLHttpRequest(),
        blob,
        fileReader = new FileReader();

    xhr.open("GET", window.location.origin + $("#FilePath").text(), true);
    // Set the responseType to arraybuffer. "blob" is an option too, rendering manual Blob creation unnecessary, but the support for "blob" is not widespread enough yet
    xhr.responseType = "arraybuffer";
    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            // Create a blob from the response
            var fileName = $("#FileName").text();
            fileName = fileName.replace(/[^a-zA-Z0-9-. ]/g, "");    //Remove Special Char
            fileName = fileName.replace(/\s/g, ""); 
            var FileExt = fileName.substring(fileName.lastIndexOf('.') + 1);
            fileName = encodeURI(fileName.split('.').slice(0, -1).join('.').substring(0, 20) + "_" + DocId + "_V" + FileVer + "_" + UploadItemId + "_Original") + "." + FileExt;
            //blob = new Blob([xhr.response], { type: "image/png" });
            // onload needed since Google Chrome doesn't support addEventListener for FileReader
            //fileReader.onload = function (evt) {
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalRequests')/items('" + UploadItemId + "')/AttachmentFiles/ add(FileName='" + fileName + "')",
                    method: "POST",
                    binaryStringRequestBody: true,
                    data: xhr.response,
                    processData: false,
                    headers: {
                        "ACCEPT": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                        //,
                        //"content-length": fileData.byteLength
                    },
                    success: function (data) {
                        AddApprovalSteps(UploadItemId);
                    },
                    error: function (data) {
                    	AddApprovalSteps(UploadItemId);
                        alert("Error occured." + data.responseText);
                    }
                });
            //};
            //fileReader.readAsDataURL(blob);
        }
    }, false);
    // Send XHR
    xhr.send();
}

// Add approval steps in the list - 'DocumentApprovalQueue'
// Add approval steps in the list - 'DocumentApprovalQueue'
function AddApprovalSteps(ReqID) {
    var arrTempApprovers = [];
    var Metadata;
    var ApproverType = '';
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    var currentStepCount = '';
    $('#accordionapprovers .StepClass').each(function (i) {
        multipleEmailAddress = [];
        assignUserName = [];
        EmpIds = [];
        currentStepCount = this.classList[2].replace("NewStep", "");
        multipleEmailAddress = $("#EmailStep" + currentStepCount).text().split(',');
        assignUserName = $("#NameStep" + currentStepCount).text().split(',');
        EmpIds = $("#EmpIdStep" + currentStepCount).text().split(',');
		TypeOfApp = $("#AppTypeStep" + currentStepCount).text();
		ApproverRole = $("#AppRoleStep" + currentStepCount).text();
		ApproverDecidingStep = $("#DecideStep" + currentStepCount).text();
		IsFooterSign = JSON.parse($("#InitialsSign"+currentStepCount).text().toLowerCase());
        arrTempApprovers = [];
		if(assignUserName[0] != "will be provided at Runtime") {
	        if (EmpIds[0] == "NA") {
	            arrTempApprovers = [];
	            ApproverType = "Outsider";
	        }
	        else {
	            ApproverType = "User";
	            EmpIds.filter(function (data) {
	                arrTempApprovers.push(parseInt(data));
	            });
	        }
	    }
	    	    
        if (i == 0) {
            if ($("#ddlSign").val() == "E-Sign") {
                Status = "Started";
            }
            else {
                Status = "Pending";
            }
        }
        else {
            Status = "Not Started";
        }
	    
        AllApprovers = AllApprovers.concat(arrTempApprovers);

        Metadata = {
            __metadata: {
                'type': ItemType
            },
            RequestID: ReqID,
            Title: $("#FileName").text(),
            Sequence_No: parseInt(i + 1),
            StepName: $("#StepName" + currentStepCount).text(),
            ApproversId: { 'results': arrTempApprovers },
            OriginDMS: CopyLibrary,
            LibraryLink: CopySourceURL,
            DocumentID: DocumentId,
            ApproverType: ApproverType,
            Status: Status,
            ApproverRole: ApproverRole,
            ApproverDecidingStep: ApproverDecidingStep,
            TypeofApprover: TypeOfApp,
            PageFooterSign: IsFooterSign 
        };
        if(assignUserName[0] == "will be provided at Runtime") {
        	Metadata["AskApprover"] = true;
        	Metadata["ApproverForStep"] = $("#StepName" + currentStepCount).text();
        }
        else {
        	Metadata["AskApprover"] = false;
	        if (EmpIds[0] == "NA") {
	            Metadata["ApproversEmail"] = multipleEmailAddress[0];
	            Metadata["ApproversName"] = assignUserName[0];
	        }
        }
        AddApprovalToList('DocumentApprovalQueue', Metadata, i, ReqID);
    });
}
// add metedata in SP list
function AddApprovalToList(ListName, Metadata, LoopCount, ReqID) {
    if (ListName == "Shared%20Documents") {
        ListName = "Documents";
    }
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            if ((LoopCount + 1) == $('#accordionapprovers .StepClass').length) {
                ClearAprovalControls();
                //$("#btnApproval").hide();
                $(".btnApprovalDetails").show();
                $("#FileApproval").text("Pending");
                $("#approval-modal").modal('hide');
                UpdateAllApprovers(ReqID);
                onloadGetItem();
                alert("Document has been sent for approval.");
                dfd.resolve(data);
            }
        },
        error: function (error) {
            $("#overlaysearch").fadeOut();
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Validation before starting approval
function ApprovalStartValid(){
	var IsReturn = true;
    var currentStepCount = '';
    $('#accordionapprovers .StepClass').each(function (i) {
    	var currentStepCount = this.classList[2].replace("NewStep", "");
		if(($("#EmpIdStep" + currentStepCount).text() == "" || $("#EmpIdStep" + currentStepCount).text() == "NA" || $("#EmpIdStep" + currentStepCount).text() == "null") && ($("#DecideStep" + currentStepCount).text() == "Initiation")){
			IsReturn = false;
		}
	});
	if(IsReturn == false){ 
		alert("Kindly enter approvers first.");
		return false;
	}
	else {
		return true;
	}
}

function UpdateDocumentStatus() {
    var dfd = $.Deferred();
    if (CopyLibrary.includes('Documents') == true) {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var ItemType = GetItemTypeForLibraryName(CopyLibrary);
    }

    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Approval: "Pending",
        ApprovedVersion: $("#FileVersion").text()
    };
    if (CopyLibrary == "Shared%20Documents") {
        CopyLibrary = "Documents";
    }
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    $.ajax({
        url: CopySourceURL + "/_api/web/lists/getbytitle('" + CopyLibrary + "')/items(" + DocumentId + ")",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "IF-MATCH": "*",             //Overrite the changes in the sharepoint list item
            "X-HTTP-Method": "MERGE"      // Specifies the update operation in sharepoint list
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            AddDocApproval();
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            $("#overlaysearch").fadeOut();
            if (error.responseText.includes("Access is denied") == true) {
                alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
            }
            else {
                console.log(error.responseText);
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Update 'AllApprovers' column while adding steps
function UpdateAllApprovers(ReqId) {
    AllApprovers = AllApprovers.filter(function (item, pos) {
        return AllApprovers.indexOf(item) == pos
    }); //Remove duplicate elements Azure Array

    var ItemType = GetItemTypeForListName('DocumentApprovalRequests');
    var fileName = $("#FileName").text();
    fileName = fileName.replace(/[^a-zA-Z0-9-. ]/g, "");    //Remove Special Char
    fileName = fileName.replace(/\s/g, "");
    var FileExt = fileName.substring(fileName.lastIndexOf('.') + 1);
    FileVer = parseInt($("#FileVersion").text()).toString();
    fileName = encodeURI(fileName.split('.').slice(0, -1).join('.').substring(0, 20) + "_" + DocumentId + "_V" + FileVer + "_" + ReqId + "_Original") + "." + FileExt;

    Metadata = {
        __metadata: {
            'type': ItemType
        },
        FileNameWithPrefix: fileName,
        AllApproversId: { 'results': AllApprovers }
    }
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalRequests')/GetItemById('" + ReqId + "')",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            AllApprovers = [];
            $("#overlaysearch").fadeOut();
            //$("#addsuccessor").modal('hide');
        },
        eror: function (data) {
            console.log("An error occurred while add all Approvers. " + JSON.stringify(data));
        }
    }).fail(function (error) {
        alert(error.responseJSON.error.message.value);
    });
}

//Convert date in format for SP list
function GetDateStandardFormat(date) {
    var dateS = ConvertDateFormatToddMMyyyy(date);
    var startDate = new Date(dateS);
    var day = 60 * 60 * 24 * 1000;
    var endDate = new Date(startDate.getTime());
    var newDate = endDate.toISOString();
    return newDate;
}

function ConvertDateFormatToddMMyyyy(date) {
    var formatedDate = stringToDate(date, 'dd/MM/yyyy', "/")
    return formatedDate;
}

function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}

//OpenApproval Histroy on 'Approved', 'Reject', 'Pending' Sign
function OpenApprovalHistry(DocId, FileName) {
    DocumentId = DocId;
    ShowAllAppHistory(FileName);
}
//Add Approval method ends ----------------------------------

//----------------------------Renaming the File Starts----------------------------------------------
function RenameFile() {
    var webUrl = CopySourceURL; // web url
    var listTitle = CopyLibrary; //list title
    var itemId = DocumentId; //list item id
    var fileName = $('#txtRenamefile').val(); //new file name
    rename(webUrl, listTitle, itemId, fileName).done(function (item) {
        $.when(getSharedDocLinks()).done(function (results) {
        	$.when(getApprovalDocLinks()).done(function (results) {
	            var tempDocName = Documentname;
	            if (Documentname.search(/\bDocuments\b/) >= 0) {
	                tempDocName = "Shared%20Documents";
	            }
	            GetMyDocumentsWithFilesFolder(tempDocName);
	            alert('File has been renamed.');
	            $("#rename").modal('hide');
	        	$("#ModalDisplayProperty").modal('hide');
	        });
        });
    }).fail(function (error) {
        if (error.responseText.includes("Access is denied") == true) {
            alert("You don't have the required permission to perform this operation.");
            return false;
        }
        else {
            alert(error.responseText);
            return false;
        }
    });
}

//get the ApprovalDoc links Id
function getApprovalDocLinks() {
    var Query = "?$select=Title,Id,FileServerURL,FileName,DocumentID&$filter=DocumentID eq '" + DocumentId.toString() + "' and FileName eq '" + OldFileName + "'  ";
    $.when(getItemsWithQuery('DocumentApprovalRequests', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalInfo) {
        if (ApprovalInfo.length > 0) {
            for (var i = 0; i < ApprovalInfo.length; i++) {
                updateApprovalLinks(ApprovalInfo[i].Id, ApprovalInfo[i].FileServerURL);
            }
        }
    });
}

//update the ApprovalDocument URL
function updateApprovalLinks(UpdateId, DocURL) {
    var ListName = "DocumentApprovalRequests";
    var Metadata;
    var ItemType = GetItemTypeForListName(ListName);
    var UpdateDocURL = '';
    UpdateDocURL = DocURL.substr(0, DocURL.lastIndexOf("/")) + "/" + $("#txtRenamefile").val().trim() + $("#txtFileExt").text();
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#txtRenamefile").val().trim() + $("#txtFileExt").text(),
        FileName: $("#txtRenamefile").val().trim() + $("#txtFileExt").text(),
        FileServerURL: UpdateDocURL
    }
    $.when(updateItemWithIDItemListDocuments(ListName, Metadata, UpdateId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
        var Query = "?$select=Title,Id,RequestID&$filter=RequestID eq '" + UpdateId + "' ";
        $.when(getItemsWithQuery('DocumentApprovalQueue', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Approvals) {
            if (Approvals.length > 0) {
                for (var j = 0; j < Approvals.length; j++) {
                    var ListName = "DocumentApprovalQueue";
                    var Metadata;
                    var ItemType = GetItemTypeForListName(ListName);
                    Metadata = {
                        __metadata: {
                            'type': ItemType
                        },
                        Title: $("#txtRenamefile").val().trim() + $("#txtFileExt").text()
                    }
                    $.when(updateItemWithIDItemListDocuments(ListName, Metadata, Approvals[j].Id, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
                        console.log("Approval list link has been updated.");
                    });
                }
            }
        });
    });
}

function rename(webUrl, listTitle, itemId, fileName) {
    if (listTitle == "Shared%20Documents") {
        listTitle = "Documents";
    }

    var endpointUrl = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/items(" + itemId + ")";
    return executeJson(endpointUrl).then(function (data) {
        var itemPayload = {};
        itemPayload['__metadata'] = {
            'type': data.d['__metadata']['type']
        };
        //itemPayload['Title'] = fileName;
        itemPayload['FileLeafRef'] = fileName;
        var itemUrl = data.d['__metadata']['uri'];
        var headers = {};
        headers["X-HTTP-Method"] = "MERGE";
        headers["If-Match"] = "*";
        return executeJson(itemUrl, "POST", headers, itemPayload);
    });
}

function executeJson(url, method, headers, payload) {
    headers = headers || {};
    method = method || 'GET';
    headers["Accept"] = "application/json;odata=verbose";
    if (method == "POST") {
        headers["X-RequestDigest"] = $("#__REQUESTDIGEST").val();
    }
    var ajaxOptions = {
        url: url,
        type: method,
        contentType: "application/json;odata=verbose",
        headers: headers
    };
    if (method == "POST") {
        ajaxOptions.data = JSON.stringify(payload);
    }
    return $.ajax(ajaxOptions);
}

//get the SharedDoc links Id
function getSharedDocLinks(){
    var Query = "?$select=Id,DocumentURL,DocumentID&$filter=DocumentID eq '" + DocumentId.toString()  + "' ";
    $.when(getItemsWithQuery('SharedDocument', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SharingInfo) {
        if (SharingInfo.length > 0) {
            for (var i = 0; i < SharingInfo.length; i++) {
                updateShareLinks(SharingInfo[i].Id, SharingInfo[i].DocumentURL);
            }
        }
    });
}

//update the SharedDocument URL
function updateShareLinks(UpdateId, DocURL) {
    var ListName = "SharedDocument";
    var Metadata;
    var ItemType = GetItemTypeForListName(ListName);
    var UpdateDocURL = '';
    UpdateDocURL = DocURL.substr(0, DocURL.lastIndexOf("/")) + "/" + $("#txtRenamefile").val().trim() + $("#txtFileExt").text();
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        Title: $("#txtRenamefile").val().trim() + $("#txtFileExt").text(),
        DocumentURL: UpdateDocURL
    }
    $.when(updateItemWithIDItemListDocuments(ListName, Metadata, UpdateId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
        console.log("sucessfully URL changed");
    });
}
//----------------------------Renaming the File ends----------------------------------------------


//get Unique data in array
function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

//get SharePoint data from library
function getItemsWithQueryUsersDocuments(ListName, Siteurl) {
    var dfd = $.Deferred();
    var siteurl = Siteurl + "/_api/Web/GetFolderByServerRelativeUrl('" + ListName + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields/HasUniqueRoleAssignments,Files/ModifiedBy/Title,Files/ListItemAllFields/HasUniqueRoleAssignments,Folders/ListItemAllFields,Files,Files/ListItemAllFields,Files/ListItemAllFields/FileSizeDisplay&$orderby=Modified desc";
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function(data) {
            dfd.resolve(data.d);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            dfd.reject(error);
            alert(error.responseJSON.error.message.value);
        }
    });
    return dfd.promise();
}

//Bind Notify mail popup to sent mail to permitted users
function NotifyEmail() {
    var ShareType = [];
    $("#NotifyHeaderSelect").show();
    $("#btnSendNotifyMail").show();
    var ChkCOunt = 1;
    if (currentSectionType == "GuestDocuments") {
        var Notifyhtml = '';
        ChkCOunt = -1;
        var Query = "?$select=Title,InternalMembers/EMail,InternalMembers/Title,InternalSupervisor/EMail,InternalSupervisor/Title,Supervisor/EMail,Supervisor/Title&$expand=InternalMembers,InternalSupervisor,Supervisor&$filter=Title eq '" + currentClientName + "' ";
        $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TeamMember) {
            if (TeamMember[0].InternalSupervisor.EMail != undefined && TeamMember[0].InternalSupervisor.EMail != null) {
                ChkCOunt++;
                employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TeamMember[0].InternalSupervisor.EMail);
                Notifyhtml += '<div class="listofemployee" >' +
                        '<input type="checkbox" name="" Id="checkbox' + ChkCOunt + '" class="checkse chkNotify">' +
                        '<div class="row">' +

                        '<div class="listimg col-md-2">' +
                        '<img src="' + employeePicURL + '" alt="">' +
                        '</div>' +
                        '<div class="col-sm-10 user_detail_box">' +
                        '<a href="#" class="emplyeename_new">' + TeamMember[0].InternalSupervisor.Title + '</a>' +
                        '<div class="emilbox">' +
                        '<h4>' + TeamMember[0].InternalSupervisor.EMail + '</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
            }
            if (TeamMember[0].Supervisor.EMail != undefined && TeamMember[0].Supervisor.EMail != null) {
                employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TeamMember[0].Supervisor.EMail);
                ChkCOunt++;
                Notifyhtml += '<div class="listofemployee" >' +
                        '<input type="checkbox" name="" Id="checkbox' + ChkCOunt + '" class="checkse chkNotify">' +
                        '<div class="row">' +

                        '<div class="listimg col-md-2">' +
                        '<img src="' + employeePicURL + '" alt="">' +
                        '</div>' +
                        '<div class="col-sm-10 user_detail_box">' +
                        '<a href="#" class="emplyeename_new">' + TeamMember[0].Supervisor.Title + '</a>' +
                        '<div class="emilbox">' +
                        '<h4>' + TeamMember[0].Supervisor.EMail + '</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
            }
            if (TeamMember[0].InternalMembers.results != undefined && TeamMember[0].InternalMembers.results != null) {
                for (var i = 0; i < TeamMember[0].InternalMembers.results.length; i++) {
                    ChkCOunt++;
                    employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TeamMember[0].InternalMembers.results[i].EMail);
                    Notifyhtml += '<div class="listofemployee" >' +
                        '<input type="checkbox" name="" Id="checkbox' + ChkCOunt + '" class="checkse chkNotify">' +
                        '<div class="row">' +
                        '<div class="listimg col-md-2">' +
                        '<img src="' + employeePicURL + '" alt="">' +
                        '</div>' +
                        '<div class="col-sm-10 user_detail_box">' +
                        '<a href="#" class="emplyeename_new">' + TeamMember[0].InternalMembers.results[i].Title + '</a>' +
                        '<div class="emilbox">' +
                        '<h4>' + TeamMember[0].InternalMembers.results[i].EMail + '</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
            }
        });
        if (Notifyhtml != '') {
            $("#divlistofemployee").empty().append(Notifyhtml);
        }
        else {
            $("#NotifyHeaderSelect").hide();
            $("#btnSendNotifyMail").hide();
            $("#divlistofemployee").empty().append('<div class="listofemployee">No Employee found.</div>');
        }
        $('.coverbox_list').has('#divlistofemployee').removeClass('activing');
    }
    else {
        $("#NotifyHeaderSelect").hide();
        $("#divlistofemployee").empty().append('<div class="listofemployee" id="NotifyPPlPicker"></div>');
        $('.coverbox_list').has('#NotifyPPlPicker').addClass('activing');
        initializePeoplePicker("NotifyPPlPicker", true);
    }
    $(".chkNotify").click(function (e) {
        if (this.checked == false) {
            $('#checkall').prop("checked", "");
        }
    });
    $("#checkall").click(function (e) {
        waitingDialog.show();
        if (this.checked == true) {
            $('.chkNotify').prop("checked", "");
            $('.chkNotify').trigger('click');
        }
        else {
            $('.chkNotify').prop("checked", "");
            to = [];
        }
        waitingDialog.hide();
    });
}

//Notify mail - Validation
function SendNotifyEmail() {
    to = [];
    if ($("#divlistofemployee").find("#NotifyPPlPicker").length > 0) {
        to = getUserInformationEmail("NotifyPPlPicker");
    }
    else {
        $(".listofemployee input[type=checkbox]:checked").each(function () {
            var row = $(this).closest("div")[0];
            to.push($($(this).closest("div")[0]).find('.emilbox')[0].innerText)
        });
    }
    if (to.length > 0) {
        processSendEmails();
    }
    else {
        alert("Kindly select any user.");
        return false;
    }
}

//Bind mail structure and send mail
function processSendEmails() {
    var body = '<table>' +
        '<tr>' +
        '<td colspan="2"><p style="margin:15px 0; padding:0;">Notification from <span>' + _spPageContextInfo.userDisplayName + '</span> regarding the below document</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b>Name: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileName').text() + '</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;" data-localize="Title"><b>Title</b><b>:</b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileTitle').text() + '</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;" data-localize="Category"><b>Category </b><b>:</b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileDocType').text() + '</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b>Message: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#txtMessage').val() + '</p></td>' +
        '</tr>' +
        
        '<tr>' +
        '<td><a href="' + $('#linkdoc').val() + '">Click here</a> to open the document.</td>' +
        '</tr>' +

        '</table>' +
        '<p style="margin:15px 0; padding:0;">This is an auto generated e-mail. Please do not reply.</p>';
	for(var k = 0; k < LabelDefaultLangauge.length; k++) {
    	if(body.includes(LabelDefaultLangauge[k].Key) == true){
    		body = body.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
    	}	
    }
    var subject = "Notification from " + _spPageContextInfo.userDisplayName + " regarding a document";
    var from = "no-reply@sharepointonline.com"; //_spPageContextInfo.userEmail;
    var Metadata;
    Metadata = {
        'properties': {
            '__metadata': {
                'type': 'SP.Utilities.EmailProperties'
            },
            'From': from,
            'To': {
                'results': to
            },

            'Body': body,
            'Subject': subject
        }
    };
    var taMailBody = {
        properties: {
            __metadata: {
                'type': 'SP.Utilities.EmailProperties'
            },
            From: "From: no-reply@sharepointonline.com",
            To: {
                'results': to
            },
            Body: body,
            Subject: subject,
        }
    };
    var sitetemplateurl = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: sitetemplateurl,
        type: "POST",
        data: JSON.stringify(taMailBody),
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            alert("Notification has been sent.")
            $('.checkse').prop('checked', false); // Unchecks it
            $('#txtMessage').val("");
            $("#notify").modal("hide");
        },
        error: function (err) {
            alert("SendEmailSharedNotification  " + JSON.stringify(err));
            return false;
        }
    });
}

//Add to favorite
function AddFavoriteFile() {
    var Metadata;
    Metadata = {
        __metadata: { 'type': 'SP.Data.MyFavoritesListItem' },
        'Title': $("#FileName").text(),
        'Name': $("#FileName").text(),
        'FileName': $("#FileName").text(),
        'Category': 'Document',
        'Link': '',
        'UserId': _spPageContextInfo.userId,
        'SiteLink': CopySourceURL,
        'DMSName': CopyLibrary,
        'DocumentID': DocumentId,
        'DocumentLink': $(".txtCopyLink").val(),
        'Icon': {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': '',
            'Url': _spPageContextInfo.webAbsoluteUrl + '/SiteAssets/MyFavorite/Images/fav-document.png'
        },
        'Active': true
    };
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MyFavorites')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            FavouriteId = data.d.Id;
            $('.unfillstar').hide();
            $('.fillstar').show();
            $("#txtFavorite").text("Delete from Favorite");
            //alert("Added to favorite.");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Delete from Favorite
function DeleteFromFavourite() {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MyFavorites')/items(" + FavouriteId + ")",
        type: "POST",
        headers: {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data) {
            $('.unfillstar').show();
            $('.fillstar').hide();
            $("#txtFavorite").text("Add to Favorite");
        },
        error: function (data) {
            alert(data.responseJSON.error);
        }
    });
}

//get Request_Digest for different Sites
function GetFormDigestValue(SiteUrl) {
    // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
    // You can replace this with other site URL where you want to apply the function
    var dfd = $.Deferred();
    $.ajax({
        url: SiteUrl + "/_api/contextinfo",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function(data) {
            var FormDigestValue = data.d.GetContextWebInformation.FormDigestValue;
            dfd.resolve(FormDigestValue);
            console.log(FormDigestValue);
        },
        error: function(xhr, status, error) {
            console.log("Failed");
        }
    });
    return dfd.promise();
}

function GetItemTypeForLibraryName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "Item";
}
function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}

function ShowCommonStandardDateFormat (datestring) {
	var date = new Date(datestring);
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + strTime;
    /*var dateFormatLocal = datestring.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).split(' ').join('-');
    return dateFormatLocal;*/
}

//to make people picker - multiple
function initializePeoplePicker(peoplePickerElementId) {
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = true;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '280px';
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

//bind SubCategories on basis of Category
function getSubCategory(CategoryName, HTMLID) {
    if(HTMLID == "txtUpdateSubType" || HTMLID == "FileSubType" || HTMLID == "ddlAddFolderSubC" || HTMLID == "ddlAddFileSubC") {
        $("#"+HTMLID).empty().append('<option value="-Select-">-Select-</option>');
    }
    else {
        $("#"+HTMLID).empty().append('<option value="All">All</option>');
    }
    var Query= "?$select=Title,Category/CatogeryName,Category/CategoryType,Active&$expand=Category&$filter=Category/CategoryType eq 'Document' and Active eq '1' and Category/CatogeryName eq '"+CategoryName+"' ";
    $.when(getItemsWithQuery('SubCategory', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SubTypeResults) {
        if (SubTypeResults.length > 0) {
            for (var index = 0; index < SubTypeResults.length; index++) {
                $("#"+HTMLID).append('<option value="' + SubTypeResults[index].Title + '">' + SubTypeResults[index].Title + '</option>');
            }
        }
    });
}

//check the mandatory checkboxes in Settings table
function getMandatoryColumns(valuesArray) {
	arrMandatoryCols = [];
    for (var i = 0; i < valuesArray.length; i++) {
        if ("Title" == valuesArray[i].ColumnName && valuesArray[i].IsMandatory == true) {
            $("#ckbMandTitle").prop('checked', true);
            arrMandatoryCols.push('Title');
        }
        if (("Type" == valuesArray[i].ColumnName || "DocumentType" == valuesArray[i].ColumnName || "Category" == valuesArray[i].ColumnName) && valuesArray[i].IsMandatory == true) {
            $("#ckbMandDocType").prop('checked', true);
            arrMandatoryCols.push('DocumentType');
        }
        if (("Reference" == valuesArray[i].ColumnName || "DocumentNo" == valuesArray[i].ColumnName) && valuesArray[i].IsMandatory == true) {
            $("#ckbMandRef").prop('checked', true);
            arrMandatoryCols.push('Reference');
        }
        if ("Author" == valuesArray[i].ColumnName && valuesArray[i].IsMandatory == true) {
            $("#ckbMandAuthor").prop('checked', true);
            arrMandatoryCols.push('Author');
        }
        if ("Details" == valuesArray[i].ColumnName && valuesArray[i].IsMandatory == true) {
            $("#ckbMandDetails").prop('checked', true);
            arrMandatoryCols.push('Details');
        }
        if ("FileValidity" == valuesArray[i].ColumnName && valuesArray[i].IsMandatory == true) {
            $("#ckbMandValidity").prop('checked', true);
            arrMandatoryCols.push('FileValidity');
        }
        else {
            //Do Nothing;
        }
    }
}

//to check if created file exists or not
function IsNewFileExist(FolderName, FileName, WebURL) {
    var serverRelativeURL = "/" + WebURL.substring(WebURL.indexOf('/s') + 1);
    var Checkpath = serverRelativeURL + "/" + FolderName + FileName;
    var IsFileExist = false;
    jQuery.ajax({
        url: WebURL + "/_api/web/getfilebyserverrelativeurl('" + Checkpath + "')?$expand=ListItemAllFields&$select=*,ListItemAllFields/AccessLevel,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentNo," +
            "ListItemAllFields/DocumentType,ListItemAllFields/SharedId,ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Title",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function (data) {
            IsFileExist = true;
        },
        error: function (error) {
            if (error.status == 404) {
                console.log(FileName + " file doesnt exist");
            }
            else {
                waitingDialog.hide();
            }
        }
    });
    return IsFileExist;
}

/*Chatting methods starts ----------------------*/

//to Open Chat box from Table
function OpenChatBox(DocId, FileName, Title, Category, ModifyBy, ModifyEmail, ModifyTime, CommentURL){
    cmntIcon=ctrl;//10 April 23
	DocumentId = DocId;
	if(Title == "null") {Title = ""}
	if(Category == "null") {Category = ""}
	$("#FileName").text(FileName);
	$("#CommentFileTitle").text(Title);
	CommentSiteURL = CommentURL;
	$("#CommentFileName").text(FileName);
	if(Category == "-Select-" || Category == null || Category == "null"){
		$("#CommentFileDocType").text('');
	}
	else {
		$("#CommentFileDocType").text(Category);
	}
	$("#FileTitle").text(Title);
	$("#FileDocType").text(Category);
	if(currentSectionType != 'MyFavorite') {
		$("#CommentModify").text(getModifiedBy(ModifyBy));
	}
	else {
		$("#CommentModify").text(ModifyBy);
		$("#CommentModEmail").text(ModifyEmail);
		$("#CommentModEmail").click(function () {
	        OpenEmail(ModifyEmail);
	    });
	    $("#CommentModImage").prop('src', _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(ModifyEmail));
	}
	$("#CommentModTime").text(ShowCommonStandardDateFormat(new Date(ModifyTime)));
	AddFileViewCount();
	GetComments('PageLoad', "");
}
//Add File View-Count
function AddFileViewCount() {
    var listName = "DocumentComments";
    var LibraryName = CopyLibrary;
    if($("#ModalDisplayProperty").css('display') == 'none') {
    	LibraryName = CheckLibary;
	}
    var Query = "?$select=*,Author/EMail&$expand=Author&$filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' and DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and (Views eq 'Yes' or Views eq 'No')";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (FilterResult) {
        if (FilterResult.length > 0) {
            if (FilterResult[0].Views == "No") {
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Views': 'Yes', 'ViewsById': parseInt(_spPageContextInfo.userId) };
                updateItemWithIDItemListDocuments(listName, item, FilterResult[0].ID, _spPageContextInfo.webAbsoluteUrl, false);
            }
        }
        else if (FilterResult.length == 0) {
            var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 
                'Title': $("#FileName").text(),
                'EmployeeId': parseInt(_spPageContextInfo.userId), 
                'Views': 'Yes', 
                'ViewsById': parseInt(_spPageContextInfo.userId), 
                'DocumentId': parseInt(DocumentId), 
                'FileName': $("#FileName").text(), 
                'DocumentTitle': $("#FileTitle").text(), 
                'FileCategory': $("#FileDocType").text(), 
                'LibraryURL': CommentSiteURL, 
                'ServerSiteURL': $("#FilePath").text(),
                'LibraryName': LibraryName
            };
            AddItemToListGroups(listName, item);
        }
    });
}

//to add comments on file
function PushRootComment() { 
    var listName="DocumentComments";
    var comment = $("#FileCommArea .emojionearea-editor").html().trim();
    var LibraryName = CopyLibrary;
    if($("#ModalDisplayProperty").css('display') == 'none') {
    	LibraryName = CheckLibary;
	}
    if(comment != "") {
        if(FileCommentType == "Parent") {
            var item = {
                '__metadata': { type: 'SP.Data.' + listName + 'ListItem' },
                'EmployeeId': _spPageContextInfo.userId,
                'ReplierId': _spPageContextInfo.userId,
                'Comments': comment,
                'Initials': "Parent",
                'ReplyforId': _spPageContextInfo.userId,
                'Title': $("#FileName").text(),
                'DocumentId': parseInt(DocumentId), 
                'FileName': $("#FileName").text(), 
                'DocumentTitle': $("#FileTitle").text(), 
                'FileCategory': $("#FileDocType").text(), 
                'LibraryURL': CommentSiteURL, 
                'ServerSiteURL': $("#FilePath").text(),
                'LibraryName': LibraryName
            }
            AddDocComments(listName, item, '0'); 
            $("#FileCommArea .emojionearea-editor").html(''); 	
        }
        else if(FileCommentType == "Reply") {
            var item = {
                '__metadata': { type: 'SP.Data.' + listName + 'ListItem' },
                'EmployeeId': _spPageContextInfo.userId,
                'ReplierId': _spPageContextInfo.userId,
                'Comments': comment,
                'Initials': "Reply",
                'ReplyTo': $("#replyforuser").text(),
                'ReplyAgainst': $("#ReplyforMsg").attr('value'),
                'Title': $("#FileName").text(),
                'DocumentId': parseInt(DocumentId), 
                'FileName': $("#FileName").text(), 
                'DocumentTitle': $("#FileTitle").text(), 
                'FileCategory': $("#FileDocType").text(), 
                'LibraryURL': CommentSiteURL, 
                'ServerSiteURL': $("#FilePath").text(),
                'LibraryName': LibraryName
            }
            AddDocComments(listName, item, '0');
            $("#FileCommArea .emojionearea-editor").html('');
            FileCommentType = "Parent";
        }
        else if (FileCommentType == "Modify") {
            UpdateEditComment(ModifyRecId);
        }
        //6 April 23
        if(cmntIcon!=""&&cmntIcon!=undefined&&cmntIcon!=null&&cmntIcon!='undefined'&&cmntIcon!='null')
        $(cmntIcon).find('img:first').prop('src',"https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png");
    }
    else {
        alert("Please type a message to continue.");
        return false;
    }
}

function AddDocComments(listName,item,ControlID) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) { 	
            $("#TotalComments").text(parseInt($("#TotalComments").text()) + 1);
            if(FinalFiles4Upload.length>0) {
                uploadattachment(data.d.ID);
                $("#NewAttachmentFiles").empty();
                $('.emojionearea-editor').empty(); 
            }
            else {
                AutoRefreshComments('GetAll', 'Logged_InUser');
                $('.emojionearea-editor').empty();
                FinalFiles4Upload=[];
                finalFiles = [];
            }
            $("#replyTextarea").hide();
            $("#NewAttachmentFiles").empty();
            $("#CommentFileAttach").val('');
        },
        error: function (data) { 
            console.log(data); 
        }
    });
}

//Auto refresh the Chat box
function AutoRefreshComments(Action, Source) {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('DocumentComments')/Items?$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles&$orderby=Created desc&$top=10&$skipToken=Paged=TRUE%26p_ID=" + getLatestMsgId + "&$filter= (DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    var QueryResult = OccasionExecuteFilter(Ownurl, Action, Source);
}

//to open file in Iframe
function previewfile(Action) {
    ServerSrc = Action.name;
    if (Action.name == null) {
        ServerSrc = Action.title;
    }
    var docExt = Action.dataset.filename.split('.').pop();
    if (docExt == 'doc' || docExt == 'docx' || docExt == 'xls' || docExt == 'xlsx' || docExt == 'ppt' || docExt == 'pptx' || docExt == 'pdf') {
        iframeUrl1 = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/WopiFrame.aspx?sourcedoc=' + Action.dataset.fileurl + '&action=interactivepreview';
    }
    else {
        iframeUrl1 = Action.dataset.fileurl;
    }
    /*if (ServerSrc.match(/\.(docx|xlsx)$/) != null) {
        iframeUrl1 = _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/Doc.aspx?sourcedoc=" + ServerSrc + "&action=view&mobileredirect=true";
    }
    else {
        iframeUrl1 = ServerSrc + "?web=1";
    }*/
    
    var container = $("#sign-viewer").empty();
    $('<iframe>', {
        src: iframeUrl1,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
    setInterval(function () {
    	$("#iframe-viewer").contents().find("#AppHeaderPanel").hide();
        $("#iframe-viewer").contents().find("#AppHeaderPanel").remove();
        if($('#iframe-viewer').contents().find('body').html() == ""){
            $("#AttachmentView").modal("hide");
        }
    }, 3000);
}

//Preview Image in Iframe
function previewImage(Action) {
    src = Action.src + "?web=1";
    var container = $("#sign-viewer").empty();
    $('<iframe>', {
        src: src,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
}
//upload Attachment of the comments
function uploadattachment(id) {
    var counter = 0;
    if (FinalFiles4Upload.length > 0) {
        $.each(FinalFiles4Upload, function (index, value) {
            getFileBuffer(value).then(function (buffer) {

                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig, "");
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentComments')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: false,
                    processData: false,
                    headers:
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
    				},
                    success: function (data) {
                        counter = counter + 1;
                        if (FinalFiles4Upload.length == counter) {
                            AutoRefreshComments('GetAll', 'Logged_InUser');
                            finalFiles = [];
                            FinalFiles4Upload = [];
                        }
                    },
                    error: function (data) {
                        console.log(data.responseText.error);
                    }
                });
            });
        });
    }
}

//get Documents comments list
function GetComments(Action, Source){
    getTotalViewCount();
    Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('DocumentComments')/Items?$select=*,ID,Author/Title,Author/Id,Author/EMail,AttachmentFiles&$expand=Author,AttachmentFiles&$orderby=Created desc&$top=5000&$filter=(DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    var QueryResult = OccasionExecuteFilter(Ownurl, Action, Source);
}

function OccasionExecuteFilter(_query, Action, Source) {
    FileCommentResponse = [];
    var tempURL = '';
    if(_query.indexOf("$skipToken") != -1) {
        tempURL = _query;
    }
    else {
        Ownurl = tempURL = _query;
    }	
    ReadOccasionComment(Action, Source, tempURL, '');
}

//get Document commets
function ReadOccasionComment(Action, Source, URL, IsViewMore) {
    $.ajax({
        url: URL,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            FileCommentResponse= FileCommentResponse.concat(data.d.results);
            FileCommentResponse.sort((a, b) => a.ID - b.ID);   
            
            if(FileCommentResponse.length > 0){ 
                if(getLatestMsgId != FileCommentResponse[(FileCommentResponse.length -1)].Id && Action == "GetAll" && $("#hideCommentScroll").scrollTop() < -5 && Source != "Logged_InUser") {
                    $("#ToastPopup").show();
                }
                if(IsViewMore != "ViewMore"){
                    getLatestMsgId = FileCommentResponse[(FileCommentResponse.length -1)].Id;  
                }
            }     

            if(FileCommentResponse.length > 0) {            	
                if(URL.indexOf("$skipToken") != -1) {
                    //'skiptoken' substring found
                    DesignChatting(FileCommentResponse, 'refreshMode');
                }
                else {
                    //no 'skiptoken' substring
                    DesignChatting(FileCommentResponse, '');
                }
            }
            else {
                $("#CommentsArea").empty();
                $("#TotalComments").text('0');
            }
            if (data.d.__next) {
                Ownurl = data.d.__next;
                $("#seemorebtnGeneral").css("display", "block");
            }
            else {
                if(URL.indexOf("$skipToken") == -1) {
                    $("#seemorebtnGeneral").css("display", "none");
                }
            }
            /*if(Action != "PageLoad"){
                AutoRefreshComments('GetAll', 'Logged_InUser');
            }*/
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function OccasionCommentCount(Action) {
    if(Action == "GetAll"){
        UrlCommentTotal = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('OccasionReplies')/Items?$select=ID&$orderby=Created desc&$top=5000&$filter= (Year eq '"+CurrentYear+"' and EmployeeCode eq '"+EmployeeID+"' and OccasionType  eq '"+OccasionType+"' and (Initials eq 'Parent' or Initials eq 'Reply'))";
    }
    OccasionresponseComment= [];
    ReadOccasionCommentTotal();
}

//HTML design for Chatting
function DesignChatting(FileCommentResponse, Mode) {
    if(Mode == '') {
        $("#TotalComments").text(FileCommentResponse.length);
    }
    var Commenthtmldesign = '';
    var Attachmnetlist = [];
    var AttachmnetIDs = [];
    var CommentLikeValue = 'Like';
    //$("#CommentsArea").empty();	
    for (var i = 0; i < FileCommentResponse.length; i++) {
        var likesCount = FileCommentResponse[i].LikeCount;
        var DisplayLikeDiv = "inline-block";
        if (Mode != "refreshMode") {
            likesCount = checkLikeCommentUser(FileCommentResponse[i].Id);
            if(likesCount > 0) {
                CommentLikeValue = 'Unlike';
                DisplayLikeDiv = "inline-block";
            }
            else {
                likesCount = 0;
                DisplayLikeDiv = "none";
            }
        }
        else {
            if(likesCount == null) {
                likesCount = 0;
                DisplayLikeDiv = "none";
            }
        }
        var eventDateObj = new Date(FileCommentResponse[i].Created);
        var Event_time = eventDateObj.toTimeString();
        var H = +Event_time.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? " AM" : " PM";
        Event_time = h + Event_time.substr(2, 3) + ampm;
        if (FileCommentResponse[i].Initials == "Parent") {
            if (_spPageContextInfo.userEmail.toLowerCase() == FileCommentResponse[i].Author.EMail.toLowerCase()) {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-my' id='CommentDivRecNo" + FileCommentResponse[i].ID + "'>" +
	                    								"<div class='col-md-12 col-sm-12 pl0 pr0 pb10'>" +
	                      									"<span>" + formatDateComment(FileCommentResponse[i].Created) + "</span> at <span> " + Event_time + "</span><span id='LikeSpan" + FileCommentResponse[i].ID + "' style='display:" + DisplayLikeDiv + "'><span><img class='msg-like-img' src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCount" + FileCommentResponse[i].ID + "' onclick='GetAllLikesComment(" + FileCommentResponse[i].ID + ")'>" + likesCount + "</span></span>" +
	                    								"</div>" +
	                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>" +
	                      									"<div>" +
	                        									"<div id='editMenuOpen2' class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>" +
	                          										"<img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>" +
	                        									"</div>" +
	                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>" +
	                          										"<li><a type='button' onclick='EditComment(" + FileCommentResponse[i].ID + ")'>Edit</a></li>" +
	                          										"<li><a type='button' class='logout' onclick='DeleteComments(" + FileCommentResponse[i].ID + ")' >Delete</a></li>" +
	                        									"</ul>" +
	                      									"</div>" +
	                      									"<div class='my-chat-edit-delete-panel-inside' id='CommentText" + FileCommentResponse[i].ID + "'>" + FileCommentResponse[i].Comments + "</div>" +
	                    								"</h4>" +
	                    								"<div class='col-md-12 col-sm-12 p0'>" +
	                      									"<div class='attachment-badge chip-box' id='Attachmentlist" + FileCommentResponse[i].ID + "'>" +
	                      									"</div>" +
	                    								"</div>" +
	                    								"<div class='clearfix'></div>" +
	                  								"</div>";
            }
            else {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(FileCommentResponse[i].Author.EMail)
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-ext' id='CommentDivRecNo" + FileCommentResponse[i].ID + "'>" +

	                    								"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'> <span class='mr10'><img src='" + attachment + "' class='img-circle chat-user-image' width='30' height='30' data-themekey='#'></span><span class='b-500' id='Username" + FileCommentResponse[i].ID + "'>" + FileCommentResponse[i].Author.Title + "</span><span class='pl5 pr5'>-</span><span>" + formatDateComment(FileCommentResponse[i].Created) + "</span> at <span> " + Event_time + "</span><span id='LikeSpan" + FileCommentResponse[i].ID + "' style='display:" + DisplayLikeDiv + "'><span><img class='msg-like-img' src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCount" + FileCommentResponse[i].ID + "' onclick='GetAllLikesComment(" + FileCommentResponse[i].ID + ")'>" + likesCount + "</span></span> </div>" +
	                    									"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>" +
	                      										"<div class='mt-4 my-chat-edit-delete-panel-inside' id='CommentText" + FileCommentResponse[i].ID + "'>" + FileCommentResponse[i].Comments + "</div>" +
	                      											"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>" +
	                          											"<img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>" +
	                        										"</div>" +
	                        										"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>" +
	                          											"<li><button id='messageEdit' type='button' class='btn LikeCmnt" + FileCommentResponse[i].ID + "' data-toggle='collapse' data-target='#messageReplyBox' aria-expanded='false' onclick='Pushlikeforcomment(" + FileCommentResponse[i].ID + ")'>" + CommentLikeValue + "</button></li>" +
	                          											"<li><a class='logout' onclick='ActiveReplyCtrl(" + FileCommentResponse[i].ID + ")'>Reply</a></li>" +
	                        										"</ul>" +
	                    									"</h4>" +
	                    									"<div class='col-md-12 col-sm-12 p0'>" +
	                      										"<div class='attachment-badge chip-box' id='Attachmentlist" + FileCommentResponse[i].ID + "'>" +
	                      										"</div>" +
	                    									"</div>" +
	                    									"<div class='clearfix'></div>" +
														"</div>";
            }
        }
        else if (FileCommentResponse[i].Initials == "Reply") {
            if (_spPageContextInfo.userId == FileCommentResponse[i].AuthorId) {
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-my' id='CommentDivRecNo" + FileCommentResponse[i].ID + "'>" +
	                    								"<div class='col-md-12 col-sm-12 pl0 pr0 pb10'>" +
	                      									"<span>" + formatDateComment(FileCommentResponse[i].Created) + "</span> at <span> " + Event_time + "</span><span id='LikeSpan" + FileCommentResponse[i].ID + "' style='display:" + DisplayLikeDiv + "'><span><img class='msg-like-img' src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/like-icon-fill.png' data-themekey='#'></span><span class='countInnerLikes' id='LikesCount" + FileCommentResponse[i].ID + "' onclick='GetAllLikesComment(" + FileCommentResponse[i].ID + ")' >" + likesCount + "</span></span>" +
	                    								"</div>" +
	                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel others-reply-text-box'>" +
	                      									"<div class='reply-text-line'>" +
	                        									"<a href='#' class='comment-reply-user-name-info'>@<span >" + FileCommentResponse[i].ReplyTo + "</span> :</a>" +
	                        									"<span class='replymsg'>" + FileCommentResponse[i].ReplyAgainst + "</span>" +
	                        									"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>" +
	                          										"<img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz' data-themekey='#'>" +
	                        									"</div>" +
	                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>" +
	                          										"<li><a type='button' onclick='EditComment(" + FileCommentResponse[i].ID + ")'>Edit</a></li>" +
	                          										"<li><a class='logout' onclick='DeleteComments(" + FileCommentResponse[i].ID + ")'>Delete</a></li>" +
	                        									"</ul>" +
	                      									"</div>" +
	                      									"<div class='mt-14'>" +
	                        									"<div class='reply-text-box my-chat-edit-delete-panel-inside reply-inside-text-box' id='CommentText" + FileCommentResponse[i].ID + "'>" +
	                          										"" + FileCommentResponse[i].Comments + "" +
	                        									"</div>" +
	                      									"</div>" +
	                    								"</h4>" +
	                    								"<div class='col-md-12 col-sm-12 p0'>" +
	                      									"<div class='attachment-badge chip-box' id='Attachmentlist" + FileCommentResponse[i].ID + "'>" +
	                      									"</div>" +
	                    								"</div>" +
	                    								"<div class='clearfix'></div>" +
	                  								"</div>";

            }
            else {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(FileCommentResponse[i].Author.EMail)
                Commenthtmldesign = Commenthtmldesign + "<div class='col-md-12 col-sm-12 reply-box-ext'>" +
		                    								"<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'> <span class='mr10'><img src='" + attachment + "' class='img-circle chat-user-image' width='30' height='30'></span> <span class='b-500'>" + FileCommentResponse[i].Author.Title + "</span><span class='pl5 pr5'>-</span><span>" + formatDateComment(FileCommentResponse[i].Created) + "</span> at <span> " + Event_time + "</span><span id='LikeSpan" + FileCommentResponse[i].ID + "' style='display:" + DisplayLikeDiv + "'><span><img class='msg-like-img' src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/like-icon-fill.png'></span><span class='countInnerLikes' id='LikesCount" + FileCommentResponse[i].ID + "' onclick='GetAllLikesComment(" + FileCommentResponse[i].ID + ")'>" + likesCount + "</span></span> </div>" +
		                    								"<h4 class='col-md-12 col-sm-12 my-chat-edit-delete-panel'>" +
		                      									"<div class='reply-text-line'><a href='#' class='comment-reply-user-name-info'>@<span >" + FileCommentResponse[i].ReplyTo + "</span> :</a><span class='replymsg'>" + FileCommentResponse[i].ReplyAgainst + "</span>" +
		                      										"<div class='chat-edit-delete-panel dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>" +
		                          										"<img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/more-horiz.png' alt='more horiz'>" +
		                        									"</div>" +
		                        									"<ul class='dropdown-menu dropdown-menu-right chat-edit-delete-dropdown'>" +
		                          										"<li><a type='button' class='LikeCmnt" + FileCommentResponse[i].ID + "' onclick='Pushlikeforcomment(" + FileCommentResponse[i].ID + ")'>" + CommentLikeValue + "</a></li>" +
		                          										"<li><a type='button' onclick='ActiveReplyCtrl(" + FileCommentResponse[i].ID + ")'>Reply</a></li>" +
		                        									"</ul>" +
		                        								"</div>" +
		                        								"<div class='mt-14'>" +
			                        								"<div class='reply-text-box my-chat-edit-delete-panel-inside reply-inside-text-box' id='CommentText" + FileCommentResponse[i].ID + "'>" +
			                          									"" + FileCommentResponse[i].Comments + "" +
			                        								"</div>" +
		                      									"</div>" +
		                    								"</h4>" +
		                    								"<div class='col-md-12 col-sm-12 p0'>" +
		                      									"<div class='attachment-badge chip-box' id='Attachmentlist" + FileCommentResponse[i].ID + "'>" +
		                      									"</div>" +
		                    								"</div>" +
		                    								"<div class='clearfix'></div>" +
	                  									"</div>";

            }
        }

        if (FileCommentResponse[i].AttachmentFiles.results.length > 0) {
            AttachmnetIDs.push(FileCommentResponse[i].ID);
            for (var j = 0; j < FileCommentResponse[i].AttachmentFiles.results.length; j++) {
                Attachmnetlist.push({
                    RecordId: FileCommentResponse[i].ID,
                    FileName: FileCommentResponse[i].AttachmentFiles.results[j].FileName,
                    ServerRelativeUrl: FileCommentResponse[i].AttachmentFiles.results[j].ServerRelativeUrl,
                });
            }
        }

    }
    if (Mode == "refreshMode") {
        $("#CommentsArea").append(Commenthtmldesign);
    }
    else {
        $("#CommentsArea").empty().append(Commenthtmldesign);
    }

    for (var k = 0; k < AttachmnetIDs.length; k++) {
        var RecId = AttachmnetIDs[k];
        var FilterResult = $.grep(Attachmnetlist, function (e) { return e.RecordId == AttachmnetIDs[k]; });
        var Attachmentdesign = '';
        $("#Attachmentlist" + RecId).empty();
        for (var p = 0; p < FilterResult.length; p++) {
            if (FilterResult[p].FileName.indexOf("docx") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Docx'> <span class='pr-8 chip-text-box'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/doc.png'></img><span title='" + FilterResult[p].ServerRelativeUrl + "' data-filename='" + FilterResult[p].FileName + "' onclick='previewfile(this);' data-fileurl='" + FilterResult[p].ServerRelativeUrl + "'>" + FilterResult[p].FileName + "</span></span> <span class='chip-icon-box'> <a href='" + FilterResult[p].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
            }
            else if (FilterResult[p].FileName.indexOf("pdf") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_PDF'> <span class='pr-8 chip-text-box'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/pdf.png'></img><span title='" + FilterResult[p].ServerRelativeUrl + "' data-filename='" + FilterResult[p].FileName + "' onclick='previewfile(this);' data-fileurl='" + FilterResult[p].ServerRelativeUrl + "'>" + FilterResult[p].FileName + "</span></span> <span class='chip-icon-box'> <a href='" + FilterResult[p].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
            }
            else if (FilterResult[p].FileName.indexOf("xlsx") != -1 || FilterResult[p].FileName.indexOf("csv") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_xlsx'> <span class='pr-8 chip-text-box'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/xls.png'></img><span title='" + FilterResult[p].ServerRelativeUrl + "' data-filename='" + FilterResult[p].FileName + "' onclick='previewfile(this);' data-fileurl='" + FilterResult[p].ServerRelativeUrl + "'>" + FilterResult[p].FileName + "</span></span> <span class='chip-icon-box'> <a href='" + FilterResult[p].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
            }

            else if (FilterResult[p].FileName.indexOf("jpg") != -1 || FilterResult[p].FileName.indexOf("jpeg") != -1 || FilterResult[p].FileName.indexOf("JPEG") != -1 || FilterResult[p].FileName.indexOf("png") != -1 || FilterResult[p].FileName.indexOf("PNG") != -1) {
                Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Image'> <span class='pr-8 chip-text-box'><img src='" + FilterResult[p].ServerRelativeUrl + "' title=" + FilterResult[p].FileName + " onclick='previewImage(this);'></img></div>";
            }
            else {
                Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Others'> <span class='pr-8 chip-text-box'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/file.png'></img><span title='" + FilterResult[p].ServerRelativeUrl + "' data-filename='" + FilterResult[p].FileName + "' onclick='previewfile(this);' data-fileurl='" + FilterResult[p].ServerRelativeUrl + "'>" + FilterResult[p].FileName + "</span></span> <span class='chip-icon-box'> <a href='" + FilterResult[p].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
            }
        }
        $("#Attachmentlist" + RecId).append(Attachmentdesign);
    }
}
//to update any comment of any file
function EditComment(RecID){
    FileCommentType="Modify";
    ModifyRecId = RecID;
    var Query = "?$filter=ID eq '"+RecID+"'&$select=*,Author/Title,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Items) {
        if(Items.length>0) {
            $('.emojionearea-editor').html(Items[0].Comments);
            $("#oldfilename").empty(); 
            if(Items[0].AttachmentFiles.results.length>0)
            {
                var AttachmentDesign ='';
                for(var y=0; y<Items[0].AttachmentFiles.results.length; y++)
                {
                    AttachmentDesign = AttachmentDesign +"<div class='comment-upload-chip "+Items[0].ID+"-"+y+"'><span class='attachment-badge-name comment-box-chip-text-box'><a target='_blank' href='" +Items[0].AttachmentFiles.results[y].ServerRelativeUrl+ "'><span>"+Items[0].AttachmentFiles.results[y].FileName+"</span></a></span><span class='Closebtn' id='Closebtn"+Items[0].ID+"'><i class='fa fa-close "+Items[0].ID+"' style='color:red;' id='"+Items[0].ID+"-"+y+"' value='"+Items[0].AttachmentFiles.results[y].FileName+"' onclick='DeleteAttachment(this.id)'></i></span></div>";    	
                }
                $("#oldfilename").append(AttachmentDesign); 
            } 	
        }
        else
        {
            $('.emojionearea-editor').empty();    		
        }
    });
}
//to delete the comment attachement
function DeleteAttachment(ItemId,filename) 
{
    var Dfd = $.Deferred();
    var dataID = ItemId.split("-");
    var DocumentName =$("#"+ItemId).attr('value');
    var Url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DocumentComments')/GetItemById(" + dataID[0]+ ")/AttachmentFiles/getByFileName('" + DocumentName+ "')  ";
    $.ajax({
        url: Url,
        type: 'DELETE',
        contentType: 'application/json;odata=verbose',
        headers: {
            'X-RequestDigest': $('#__REQUESTDIGEST').val(),
            'X-HTTP-Method': 'DELETE',
            'Accept': 'application/json;odata=verbose'
        },
        success: function (data) 
        {
            Dfd.resolve(data);
            $("."+ItemId).hide();
            $("#"+ItemId).hide();            
            //TotalCommentsCounts=[];
            //GetTotalComments();          
        },
        error: function (error) 
        {
            Dfd.reject(JSON.stringify(error));
            console.log(error);
        }
    });
    return Dfd.promise();
}

//Update comment of any user
function UpdateEditComment(RecID) {
    var item = {
        __metadata:{
            type: "SP.Data.DocumentCommentsListItem"
        },
        Comments: $("#FileCommArea .emojionearea-editor").html()
    }
    $.when(updateItemWithIDItemListDocuments('DocumentComments', item, RecID, _spPageContextInfo.webAbsoluteUrl, false)).done(function (FilterResult) {
        if (FinalFiles4Upload.length > 0) {
            Edituploadattachment(RecID);
        }
        else {
            RetriveUpdateData(RecID);
        }
        alert("Comment has been updated.");
        $("#CommentText" + RecID).html($("#FileCommArea .emojionearea-editor").html());
        FileCommentType = "Parent";
        $("#NewAttachmentFiles").empty();
        $("#oldfilename").empty();
        $('.emojionearea-editor').empty();
    });
}

function Edituploadattachment(id) 
{	
    var xRequestDigest = $("#__REQUESTDIGEST").val();	
    var counter = 0;
    if(FinalFiles4Upload.length>0)
    {
        $.each(FinalFiles4Upload, function(index, value){
            getFileBuffer(value).then(function (buffer) {                
                var OrginalFileName = value.name;
                var ModifiedFileName = OrginalFileName.replace(/[^.a-zA-Z0-9]/ig,"");		  
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl+ "/_api/web/lists/getbytitle('DocumentComments')/items(" + id + ")/AttachmentFiles/add( FileName='" + ModifiedFileName + "')",
                    method: 'POST',
                    data: buffer,
                    async: true,
                    processData: false,
                    headers: 
    				{
    				    "Accept": "application/json;odata=verbose",
    				    "content-type": "application/json;odata=verbose",
    				    "X-RequestDigest": xRequestDigest
    				},
                    success: function (data)
                    {
                        counter  = counter + 1;    					
                        if(counter == FinalFiles4Upload.length)
                        {
                            RetriveUpdateData(id);		    					 
                        }
                    },
                    error: function (data) 
                    {
                        console.log(data.responseText.error);
                    }
                });
            });
        });
    }	
}

//To delete the comment
function DeleteComments(RecordID) {
    if (confirm('Are you sure to delete this comment ?')) {
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DocumentComments')/items("+RecordID+")",  
            type: "POST",
            async: true,  
            headers: {  
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
                "IF-MATCH": "*",  
                "X-HTTP-Method": "DELETE"  
            },  
            success: function(data, status, xhr) {  
                $('#CommentDivRecNo'+RecordID).hide();
                $("#TotalComments").text(parseInt($("#TotalComments").text()) - 1);
            },  
            error: function(xhr, status, error) {  
                alert(data.responseJSON.error); 
                return false; 
            }  
        });  
    } 
}

//bind updated comment
function RetriveUpdateData(RecID) {
    var Query = "?$filter=ID eq '" + RecID + "'&$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Items) {
        if (Items.length > 0) {
            $('#CommentText' + Items[0].ID).html(Items[0].Comment);
            $("#Attachmentlist" + Items[0].ID).empty();
            if (Items[0].AttachmentFiles.results.length > 0) {
                var Attachmentdesign = '';
                for (var y = 0; y < Items[0].AttachmentFiles.results.length; y++) {
                    if (Items[0].AttachmentFiles.results[y].FileName.indexOf("docx") != -1) {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_Docx'> <span class='pr-8 chip-text-box'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/doc.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                    }
                    else if (Items[0].AttachmentFiles.results[y].FileName.indexOf("pdf") != -1) {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_PDF'> <span class='pr-8 chip-text-box'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/pdf.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                    }
                    else if (Items[0].AttachmentFiles.results[y].FileName.indexOf("xlsx") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("csv") != -1) {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0 upload-chip chatAttach_xlsx'> <span class='pr-8 chip-text-box'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/xls.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                    }

                    else if (Items[0].AttachmentFiles.results[y].FileName.indexOf("jpg") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("jpeg") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("JPEG") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("png") != -1 || Items[0].AttachmentFiles.results[y].FileName.indexOf("PNG") != -1) {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Image'> <span class='pr-8 chip-text-box'><img src='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' title=" + Items[0].AttachmentFiles.results[y].FileName + " onclick='previewImage(this);'></img></div>";
                    }
                    else {
                        Attachmentdesign = Attachmentdesign + "<div class='m-0  upload-chip chatAttach_Others'> <span class='pr-8 chip-text-box'><img src='https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/CompanyHomePage/Sliders/Image/File_Icon/file.png'></img><a name='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' onclick='previewfile(this);' href='javascript:void(0)'>" + Items[0].AttachmentFiles.results[y].FileName + "</a></span> <span class='chip-icon-box'> <a href='" + Items[0].AttachmentFiles.results[y].ServerRelativeUrl + "' download><i class='fa fa-download cursor-pointer px-4' aria-hidden='true'></i></a></span> </div>";
                    }
                }
                $("#Attachmentlist" + Items[0].ID).append(Attachmentdesign);
            }
        }
    });
}
//to decide text - Unlike or Like
function checkLikeCommentUser(RecId) {
    var LikeCount = 0;
    var Query = "?$select=*,Author/Title,Author/Id,Author/EMail&$expand=Author&$filter=DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and LikeComment eq 'Yes' and LikeCommentID eq '" + RecId + "' and Author/EMail eq '" + _spPageContextInfo.userEmail + "'";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (FilterResult) {
        LikeCount = FilterResult.length;
        if (FilterResult.length > 0) {
            textValue = "Unlike";
        }
    });
    return LikeCount;
}

//To add or remove comment like
function Pushlikeforcomment(RecordID) {
    var d = new Date();
    var CurrentYear = d.getFullYear();
    var LibraryName = CopyLibrary;
    if($("#ModalDisplayProperty").css('display') == 'none') {
    	LibraryName = CheckLibary;
	}
    var Query = "?$select=*,Author/Title,Author/Id,Author/EMail&$expand=Author&$filter= (Author/EMail eq ('" + _spPageContextInfo.userEmail + "') and DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and LikeCommentID eq '" + RecordID + "') and (LikeComment eq 'Yes' or LikeComment eq 'No')";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (QueryResult) {
        if (QueryResult.length > 0) {
            if (QueryResult[0].LikeComment == "No") {
                var OldLikes = $("#LikesCount" + RecordID).text();
                $("#LikesCount" + RecordID).text(parseInt(OldLikes) + 1);
                if (parseInt(OldLikes) + 1 > 0) {
                    $("#LikeSpan" + RecordID).css("display", "inline-block");
                }
                else {
                    $("#LikeSpan" + RecordID).css("display", "none");
                }

                var listName = "DocumentComments";
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'LikeComment': 'Yes', 'LikeCount': parseInt(QueryResult[0].LikeCount) + 1};
                DocCommentUpdate(listName, item, QueryResult[0].ID);
            }
            else if (QueryResult[0].LikeComment == "Yes") {
                var OldLikes = $("#LikesCount" + RecordID).text();
                $("#LikesCount" + RecordID).text(parseInt(OldLikes) - 1);
                if (parseInt(OldLikes) - 1 > 0) {
                    $("#LikeSpan" + RecordID).css("display", "inline-block");
                }
                else {
                    $("#LikeSpan" + RecordID).css("display", "none");
                }

                var listName = "DocumentComments";
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'LikeComment': 'No', 'LikeCount': parseInt(QueryResult[0].LikeCount) - 1};
                var Res = DocCommentUpdate(listName, item, QueryResult[0].ID);
            }
            else if (QueryResult[0].LikeComment == null) {
                var OldLikes = $("#LikesCount" + RecordID).text();
                $("#LikesCount" + RecordID).text(parseInt(OldLikes) + 1);
                if (parseInt(OldLikes) + 1 > 0) {
                    $("#LikeSpan" + RecordID).css("display", "inline-block");
                }
                else {
                    $("#LikeSpan" + RecordID).css("display", "none");
                }
                var listName = "DocumentComments";
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'LikeComment': 'Yes', 'LikeCount': parseInt(QueryResult[0].LikeCount) + 1};
                var Res = DocCommentUpdate(listName, item, QueryResult[0].ID);
            }
        }
        else {
            var OldLikes = $("#LikesCount" + RecordID).text();
            $("#LikesCount" + RecordID).text(parseInt(OldLikes) + 1);
            if (parseInt(OldLikes) + 1 > 0) {
                $("#LikeSpan" + RecordID).css("display", "inline-block");
            }
            else {
                $("#LikeSpan" + RecordID).css("display", "none");
            }

            var listName = "DocumentComments";
            var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 
                'LikeComment': 'Yes', 
                'LikeCommentID': RecordID.toString(),
                'Title': $("#FileName").text(),
                'EmployeeId': parseInt(_spPageContextInfo.userId), 
                'DocumentId': parseInt(DocumentId), 
                'FileName': $("#FileName").text(), 
                'DocumentTitle': $("#FileTitle").text(), 
                'FileCategory': $("#FileDocType").text(), 
                'LibraryURL': CommentSiteURL, 
                'ServerSiteURL': $("#FilePath").text(),
                'LikeCount': 1,
                'LibraryName': LibraryName
            };
            AddDocComments(listName, item);
        }
    });
}

function formatDateComment(d) {
    var date = new Date(d);
    if (isNaN(date.getTime())) { return d; }
    else
    {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        day = date.getDate();
        if (day < 10) { day = "0" + day; }
        return day + " " + month[date.getMonth()];
    }
}


//get Total View Count of any document
function getTotalViewCount() {
    getTotalLikes();
    var Html_Design = '';
    var Query = "?$filter=DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and Views eq 'Yes'&$select=*,ViewsBy/Title,ViewsBy/EMail,ViewsBy/ID&$expand=ViewsBy";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (QueryResult) {
        $("#TotalHits").text(QueryResult.length);
        if(QueryResult.length > 0) {
            for(var i=0; i < QueryResult.length; i++) {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(QueryResult[i].ViewsBy.EMail);
                Html_Design = Html_Design + "<li class='likes-box'>" +
	    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='"+attachment+"'></div>"+
											"<div class='like-user-name'>"+
											"<h4>"+QueryResult[i].ViewsBy.Title+"</h4>"+
											"</div>"+
											"</li>";
            }
            $("#ViewHitList").empty().append(Html_Design);
        }
        else {
            Html_Design = Html_Design + "<li class='likes-box'>" +
	                                           "<div class='comment-reply-user-name' style='width:212px !important;border-radius:3% !important'>"+
	                                           "<h4>No views!!</h4>"+
	                                           "</div>"+
	                                           "</li>";
            $("#ViewHitList").empty().append(Html_Design);
        }
    });
}

//to get Total likes of any Document
function getTotalLikes() {
    var Html_Design = '';
    var Query = "?$filter= DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and Like eq 'Yes' &$select=LikeBy/Title,LikeBy/EMail,LikeBy/ID&$expand=LikeBy";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TotalLike) {
        $("#TotalLikes").text(TotalLike.length);
        if(TotalLike.length > 0) {
            for(var i=0; i<TotalLike.length; i++){ 		
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TotalLike[i].LikeBy.EMail);
                Html_Design = Html_Design + "<li class='likes-box'>" +
    									"<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='"+attachment+"'></div>"+
										"<div class='like-user-name'>"+
										"<h4>"+TotalLike[i].LikeBy.Title+"</h4>"+
										"</div>"+
										"</li>";
            }
            $("#Likeshitlist").empty().append(Html_Design);
        }
        else {
            Html_Design = Html_Design + "<li class='likes-box'>" +
	                                       "<div class='comment-reply-user-name' style='width:212px !important;border-radius:3% !important'>"+
	                                       "<h4>No Likes!!</h4>"+
	                                       "</div>"+
	                                       "</li>";
            $("#Likeshitlist").empty().append(Html_Design);
        }
    });
}

//to like any Document
function TriggerLikes() {
    var Query = "?$filter=((Author/EMail eq ('" + _spPageContextInfo.userEmail + "') and DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "') and (Like eq 'Yes' or Like eq 'No'))&$select=*,Author/Title,Author/EMail,Replyfor/Title,Replier/Title,AttachmentFiles&$expand=Author,Replyfor,Replier,AttachmentFiles";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (QueryResult) {
        var listName = "DocumentComments";
        if (QueryResult.length > 0) {
            if (QueryResult[0].Like == "No") {
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Like': 'Yes', 'LikeById': parseInt(_spPageContextInfo.userId) };
                var Res = DocCommentUpdate(listName, item, QueryResult[0].ID);
            }
            else if (QueryResult[0].Like == "Yes") {
                var item = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Like': 'No', 'LikeById': parseInt(_spPageContextInfo.userId) };
                var Res = DocCommentUpdate(listName, item, QueryResult[0].ID);
            }

            var Query = "?$filter= DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and Like eq 'Yes' &$select=LikeBy/Title,LikeBy/EMail,LikeBy/ID&$expand=LikeBy";
            $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TotalLike) {
                if (TotalLike.length > 0) {
                    $("#TotalLikes").text(TotalLike.length);
                    $("#Likeshitlist").empty();
                    var Html_Design = "";
                    for (var i = 0; i < TotalLike.length; i++) {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TotalLike[i].LikeBy.EMail);
                        Html_Design = Html_Design + "<li class='likes-box'>" +
                                                "<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='" + attachment + "'></div>" +
                                                "<div class='like-user-name'>" +
                                                "<h4>" + TotalLike[i].LikeBy.Title + "</h4>" +
                                                "</div>" +
                                                "</li>";
                    }
                    $("#Likeshitlist").append(Html_Design);
                }
                else {
                    $("#TotalLikes").text("0");
                    $("#Likeshitlist").empty();
                }
            });
        }
        if ($(".like-img").attr("src") == "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/like-icon.png" || $(".like-img").attr("src").includes('like-icon.png') == true) {
            $('#like-Img-color').attr('src', "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/like-icon-fill.png");
        }
        else {
            $('#like-Img-color').attr('src', "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Biography/Experience/assets/images/like-icon.png");
        }
        if ($("#likes").hasClass("active") == true) {
            $('#TotalLikes').trigger('click');
        }
    });
}

//Open Comment Reply mode
function ActiveReplyCtrl(ControlId) {
    FileCommentType = "Reply";
    var Query = "?$select=*&$filter=ID eq '" + ControlId + "'";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Items) {
        if (Items.length > 0) {
            $("#ReplyforMsg").html(Items[0].Comments);
            $("#ReplyforMsg").attr('value', Items[0].Comments);

            if (Items[0].Initials == "Reply") {
                $("#replyforuser").text(Items[0].ReplyTo);
            }
            else {
                $("#replyforuser").text($("#Username" + ControlId).text());
            }
        }
    });
    $("#replyTextarea").show();
}

//Close Comment Reply mode
function DeActiveReplyControl() {
    FileCommentType= "Parent";
    $("#replyTextarea").hide();
    $(".emojionearea-editor").empty();
    $("#NewAttachmentFiles").empty();
}

//get all the users who likes the comment
function GetAllLikesComment(RecId) {
    var Query = "?$select=*,Author/EMail,Author/Title,Author/Id&$expand=Author&$filter= DocumentId eq '" + DocumentId + "' and FileName eq '" + encodeURIComponent($("#FileName").text()) + "' and LikeComment eq 'Yes' and LikeCommentID eq '" + RecId + "'";
    $.when(getItemsWithQuery("DocumentComments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Items) {
        if (Items.length > 0) {
            $("#CommentLikeList").empty();
            var Html_Design = "";
            for (var i = 0; i < Items.length; i++) {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Items[i].Author.EMail);
                Html_Design = Html_Design + "<li class='likes-box'>" +
                                    "<div class='comment-reply-user-name'><span class='comment-reply-user-name-lt'>TD</span><img class='comment-reply-user-name-img' id='ViewHitsProfileImages' src='" + attachment + "'></div>" +
                                    "<div class='like-user-name'>" +
                                    "<h4>" + Items[i].Author.Title + "</h4>" +
                                    "</div>" +
                                    "</li>";
            }
            $("#CommentLikeList").append(Html_Design);
        }
        else {
            $("#CommentLikeList").empty();
        }
        $("#showInnerLikes").removeClass("show-inner-likes-box-hide");
    });
}

//update Document comments list metadata
function DocCommentUpdate(listName, item, dataid) {
    var Responce = "";
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items('" + dataid + "')",
        type: "POST",
        async: false,
        data: JSON.stringify(item),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data) {
            console.log("Done");
            Responce = data;

        },
        error: function (data) {
            Responce = data;
            console.log(data);
            alert("An error occurred. Please contact your system administrator / Refresh a WebPage !");
        }
    });
    return Responce;
}
/*Chatting methods ends ----------------------*/
