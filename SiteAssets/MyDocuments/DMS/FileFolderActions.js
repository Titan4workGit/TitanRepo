var FinalFiles4Upload = [];
var FinalFoldersUpload = [];
var DocUrlCollection = [];
var arrCustomCol = [];
var arrCustomColFilter = [];
var arrSharedGuest = [];	
var SharedGuestTable = '';
var bytesToMegaBytes = bytes => bytes / (1024 ** 2); //Convert bytes to MB
var TotalSize = 0;
var IsEditMode = false;
var flagFilterClear=false;
var valFilterfields =[];//Array keeps validity and email feild if they exists in list for filter purpose;
var companyName='';
$(document).ready(function () {
	
    $("#FileAuthor").val(_spPageContextInfo.userDisplayName);
    $("#selectAllTable").click(function (e) {
        waitingDialog.show();
        if (this.checked == true) {
            $('.chkFileFolder').prop("checked", "");
            $('.chkFileFolder').trigger('click');
        }
        else {
            $('.chkFileFolder').prop("checked", "");
            arrFileFolder = [];
        }
        waitingDialog.hide();
    });
    $("#btnModalFilePerm").click(function (e) {
        getFolderspermision(true);
    });
    
    $("#prefix_and_postfix_name").click(function (e) {
        if(this.checked == true){
            $("#txtFileTitle").hide();
            $(".prefix_and_postfix_name").show();
            $("#astTitle").hide();
        }
        else {
            $("#txtFileTitle").show();
            $(".prefix_and_postfix_name").hide();
            if(currentSectionType != "My Documents"){
	            if (jQuery.inArray('Title', arrMandatoryCols) != '-1') {
				    $("#astTitle").show();
				}
			}
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
        $("#divchkAlwaysUpload").hide();   
        //$("#chkAlwaysUpload").prop('checked', '');
        $(".prefix_and_postfix_name").hide();
        if($('#RenameandUpload').is(':checked') == true )
        {
           $("#divchkAlwaysUpload").show();  
        }
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
        $("#chkAlwaysUpload").prop('checked', '');
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
    $("#btnFilterApply").click(function (e) {
        flagFilterClear=false;
        waitingDialog.show();
        setTimeout(function () {
            createFilterArray();//To crete filter array by getting files inside folders
            LibraryFilter();//Apply filter on that array.
        }, 100);
    });
    $(".btnFilterClear").click(function (e) {
        flagFilterClear=true;
        ClearLibraryFilter();//To clear filter control data.
    });
     $("#btnCloseFilter").click(function (e) {
         if(flagFilterClear==true)
         {
          removeFilteredData();//Refresh initial data of library   
         }
         flagFilterClear=false;

    });
    $("#divFilter").click(function (e) {
         createLibFilterUI();//Create validity and email date controls if column exists.
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
    /*$('#createNoteBook').click(function () {
        $("#NewFileExtension").text(".one");
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
    });*/
    
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
        //IsEditMode = false;
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
        if(currentSectionType == 'ApprovalOutbox' || currentSectionType == 'ApprovalInbox') {
            if($('.chkAppIn:checked').length == 0 && $('.chkAppOut:checked').length == 0) {
                alert("Please select any file or folder first.");
                return false;
            }
            if($('.chkAppIn:checked').length > 0)
             {
                $('.chkAppIn:checked').each(function() {
                    var link = document.createElement("a");
                    // If you don't know the name or want to use
                    // the webserver default set name = ''
                    link.setAttribute('download', '');
                    link.href = this.name;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
                $('.chkAppIn').prop("checked", "");
                $('#selectAllChk').prop("checked", "");
                arrAppIds = [];
            	
            }
            else if($('.chkAppOut:checked').length>0)
            {
                $('.chkAppOut:checked').each(function() {
                    var link = document.createElement("a");
                    // If you don't know the name or want to use
                    // the webserver default set name = ''
                    link.setAttribute('download', '');
                    link.href = this.name;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                });
                $('.chkAppOut').prop("checked", "");
                $('#selectAllChk').prop("checked", "");
                arrAppIds = [];
            }
            
        }
        else {
            MultipleFileDownload();
        }
    });
    $('#btnMultipleDelete').click(function () {
        /*if(!CheckSPecialNameMulti())//Bhawana
        {
            return false;
        }
        else*/
        {
        MultipleFileFolderDelete();
        }
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
        $("#divchkAlwaysUpload").show();
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
    $('.btnCloseProp').click(function (e) {
        $(".clearPropBox").val('');
        $("#txtUpdateType").val('-Select-');
        $("#txtUpdateSubType").val('-Select-');
        $(".chkProperty").prop('checked', 'checked');
        $("#txtUpdateRef").val('');
        $("#txtUpdateTitle").val('');
        $("#txtUpdateDetails").val('');
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
    
    $("#btnProperties").click(function () {
        if(arrFileFolder.length > 0) {
            //Bhawana 2 JAN 23
            $("#txtUpdateValidity").prop('readonly', true)
            $('#txtUpdateValidity').val('');
            $('#txtUpdateValidity').datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: new Date()
            });
            $('#txtUpdateValidity').datepicker("option", "dateFormat", "MM dd, yy");
            $("#chkUpdateTitle").prop('checked', '');
            $("#chkUpdateType").prop('checked', '');
            $("#chkUpdateSubType").prop('checked', '');
            $("#chkUpdateRef").prop('checked', '');
            $("#chkUpdateAuthor").prop('checked', '');
            $("#chkUpdateDetails").prop('checked', '');
            $("#txtUpdateTitle").val("");
            $("#txtUpdateType").val('-Select-');
            $("#txtUpdateSubType").val('-Select-');
            $("#txtUpdateRef").val("");
            $("#txtUpdateAuthor").val('');
            $("#txtUpdateDetails").val("");
			$("#ParentPropLink").hide();
            if ($('#txtUpdateType option').length == 0) {
                BindDMSDocumentType();
            }
            $(".customCol").remove();
            var customCOlq = AddCustomColumns();
            if(arrFileFolder.length == 1) {
            	$("#ParentPropLink").show();
            	getSingleFileProperty(arrFileFolder[0].ServerURL, arrFileFolder[0].type, arrFileFolder[0].SiteURL, customCOlq);
            }
        }
        else {
            alert("Please select any file or folder first.");
            return false;
        }
    });
    $('#FilterModFrom').datepicker("destroy");
    $('#FilterModTo').datepicker("destroy");
    $('#FilterEmailTo').datepicker("destroy");
    $('#FilterEmailFrom').datepicker("destroy");
    $('#FilterValTo').datepicker("destroy");
    $('#FilterValFrom').datepicker("destroy");
    $('#FilterModFrom').datepicker();
    $('#FilterModTo').datepicker();
    $('#FilterEmailTo').datepicker();
    $('#FilterEmailFrom').datepicker();
    $('#FilterValTo').datepicker();
    $('#FilterValFrom').datepicker();
    $('#FilterModFrom').datepicker("option", "dateFormat", "MM dd, yy");
    $('#FilterModTo').datepicker("option", "dateFormat", "MM dd, yy");
    $('#FilterEmailTo').datepicker("option", "dateFormat", "MM dd, yy");
    $('#FilterEmailFrom').datepicker("option", "dateFormat", "MM dd, yy");
    $('#FilterValTo').datepicker("option", "dateFormat", "MM dd, yy");
    $('#FilterValFrom').datepicker("option", "dateFormat", "MM dd, yy");
    $("#divFilter").click(function () {
        if ($('#ddlFilterDocType option').length == 0) {
            BindDMSDocumentType();
        }
        if(currentSectionType == 'Group Documents') {
            $(".customColFilter").remove();
            //AddFilterCustomColumns();
        }
        else {
            $(".customColFilter").remove();
        }
    });
    $("#SharedGuestClick").click(function () {
        arrPermission = [];
        waitingDialog.show();
        setTimeout(function () {
            getSharedGuestDocs();
        }, 100);
    });
    $("#SharedGuestFilter").click(function () {
        $("#btnShareFilter").hide();
        $("#btnSharedDocFilter").show();
        $(".NewFilter").hide();
        if ($('#FilterShareDocType option').length == 0) {
            BindDMSDocumentType();
        }
        $("#filterShareText").text("Shared By:");
        if ($("#pplSharedBy").html() == '') {
            initializePeoplePicker("pplSharedBy", true);
        }
    });
    $("#btnSharedDocFilter").click(function () {
        waitingDialog.show();
        setTimeout(function () {
            SharedGuestFilter();
        }, 100);
    });
    $('#btnDownloadGuest').click(function () {
        MultipleFileDownload();
    });
    $('#btnGuestDocRefresh').click(function () {
        getSharedGuestDocs();
    });
    $('#btnAddToArchive').click(function () {
        var arrTempFolder = [];
        if (arrFileFolder.length > 0) {
            waitingDialog.show();
            setTimeout(function () {
                AddToArchive();
            }, 100);
        }
        else {
            alert("Please select any file/folder first.");
            return false;
        }
    });
    $('#btnRemoveArchive').click(function () {
        var arrTempFolder = [];
        if (arrFileFolder.length > 0) {
            waitingDialog.show();
            setTimeout(function () {
                RemoveArchive();
            }, 100);
        }
        else {
            alert("Please select any file/folder first.");
            return false;
        }
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
    $("#PropLinkCopy").click(function () {
        CopyLinkFileFolder();
    });
    
});


//Delete files from Uploaded files(locally)
function removeLine(id, FileName) {
    var index = id.split('_')[1];
    $("#" + id).remove();
    FinalFiles4Upload = FinalFiles4Upload.filter(function( obj ) {
        return obj.name !== FileName;
    });
    if(FinalFiles4Upload.length == 0) {
        $('#txtUploadFiles').html('');
        $("#txtUploadFiles").hide();
    }
    $("#AttachmentUploadField").val('');
}

//Delete folder from Uploaded folder(locally)
function removeLineFolder(id, FolderName) {
    FinalFoldersUpload = [];
    $('#txtUploadFolder').html('');
    $("#txtUploadFolder").hide();
    $("#FolderAttachment").val('');
}


//Create Folder and Files [Word, PowerPOint, Excel] starts -------------------------

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
            if (decodeURIComponent(Documentname).indexOf('/') != -1) {//Bhawana 2 jan 23
                libraryName = decodeURIComponent(Documentname).split('/')[0];//Bhawana 2 jan 23
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
            if(Documentname.includes('/Documents/') == true) {
                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
            } 
            else if(Documentname == 'Documents') {
                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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
    var specialChars = "';.<>#%&*{}?:|\"\\~`()$<>,";
    for (i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            return true
        }
    }
    return false;
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
function ChekFolderExistOrNotPath(dmsFolder, newFolderName) {
    var IsFolderExist = true;
    var CopyFolderName =fixedEncodeURIComponent(_spPageContextInfo.webServerRelativeUrl + "/") + dmsFolder;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/GetFolderByServerRelativePath(decodedurl='" + CopyFolderName + "')?$select=ID,File_x0020_Type&$expand=Folders";
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
//Create Folder Inside DMS
function CreateDMSFolderPath(newSubfoldersName, newSubFolder, IsModalOpen) {
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
    if(fixedDecodeURIComponent(newSubfoldersName)[fixedDecodeURIComponent(newSubfoldersName).length - 1] == '/') {
        var ServerRelativeUrl = fixedDecodeURIComponent(newSubfoldersName) + newSubFolder;
    }
    else {
        var ServerRelativeUrl = fixedDecodeURIComponent(newSubfoldersName) + '/' + newSubFolder;
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
            else if(error.responseText.includes("not found") == true) {
                alert("Destination folder has invalid name.Please rename folder before uploading.");
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
           // if (Documentname.indexOf('/') != -1) {
               if (decodeURIComponent(Documentname).indexOf('/') != -1){//Bhawana 2 Jan 23
                //libraryName = Documentname.split('/')[0];
                libraryName =decodeURIComponent( Documentname).split('/')[0];//Bhawana 2 Jan 23
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
    if (decodeURIComponent(Documentname)[Documentname.length - 1] == '/') {
        var folderName = decodeURIComponent(Documentname);
    }
    else {
        var folderName = decodeURIComponent(Documentname) + '/';
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
    //Bhawana 2 jan 23
    if (Documentname=='Documents')  {
            FolderName = FolderName + 'Shared Documents';
        }
        else
        //
    FolderName = FolderName + decodeURIComponent(Documentname);
    //FolderName = FolderName + Documentname;
    
    if (SiteUrl.includes(_spPageContextInfo.webAbsoluteUrl) == true) {
        createNewDocument(NameOfTheDocFile, ListURL, 3, TemplateURL, FolderName);
    }
    else {
        if (FolderName.includes('/Documents/') == true) {
            FolderName = FolderName.replace('/Documents/', '/Shared Documents/');
        }
        else if (FolderName.search(/\bShared%20Documents\b/) >= 0) {
            FolderName = FolderName.replace('Shared%20Documents', 'Shared Documents');
        }
	    else if(FolderName.includes('/Documents') == true && (FolderName.includes('/Shared Documents') == false && FolderName.includes('/Shared%20Documents') == false)){
	    	FolderName= FolderName.replace("/Documents", '/Shared%20Documents');
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
                   // if (Documentname.indexOf('/') != -1) 
                    if (decodeURIComponent(Documentname).indexOf('/') != -1){//Bhawana 2 Jan 23
                        //libraryName = Documentname.split('/')[0];
                        libraryName =decodeURIComponent( Documentname).split('/')[0];//Bhawana 2 Jan 23
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
   // if (ListName.includes('Documents') == true) 
   if (ListName=='Documents'||ListName=='Shared Documents'||ListName=='Shared%20Documents') {
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
            if(Documentname.includes('/Documents/') == true) {
                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
            } 
            else if(Documentname == 'Documents') {
                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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
                if(Documentname.includes('/Documents/') == true) {
                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                } 
                else if(Documentname == 'Documents') {
                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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


   
//Create Folder and Files [Word, PowerPOint, Excel] starts -------------------------

//Multiple Files download method
function MultipleFileDownload() {
    var arrTempFolder = [];
    var FolderSiteURL = [];
    if (arrFileFolder.length > 0) {
        //for (var index = 0; index < arrFileFolder.length; index++) {
        arrFileFolder.forEach(function (entry, index) {
            if (entry.type == 'file'||entry.type == 'File') {
                if(entry.IsBlock==undefined||entry.IsBlock=='undefined'||entry.IsBlock==null||entry.IsBlock=='null'||entry.IsBlock==''||entry.IsBlock=='No')//If shared section than check permission for restricted view.
                {
                    var url = entry.ServerURL;
                    Extension = entry.FileFolderName.substring(entry.FileFolderName.lastIndexOf('.') + 1);
                    if(url.includes('/Documents/') == true) {
                        url = url.replace("/Documents/", "/Shared Documents/");//2 march 23
                    } 
                    if (Extension.toLowerCase() != "js"&&Extension.toLowerCase() != "txt" && Extension.toLowerCase() != "png" && Extension.toLowerCase() != "jpeg" && Extension.toLowerCase() != "gif" && Extension.toLowerCase() != "jpg" && Extension.toLowerCase() != "pdf") {
                       // $.fileDownload("/"+fixedEncodeURIComponent(url.slice(1)));
                                              


// create the REST API endpoint URL
var apiUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFileByServerRelativeUrl('" + url + "')/$value";

// create a new anchor element and set the href and download attributes
var downloadLink = document.createElement('a');
downloadLink.href = apiUrl;
downloadLink.setAttribute('download', entry.FileFolderName);
document.body.appendChild(downloadLink);
downloadLink.click();

                       
                       
                    }
                    else {
                        var a = document.createElement("a");
                        //a.setAttribute('href', (window.location.origin + url));
                        a.setAttribute('href', (window.location.origin + "/"+fixedEncodeURIComponent(url.slice(1),"href")));
                    
                        a.setAttribute('download', entry.FileFolderName);
                        a.setAttribute('target', '_blank');
                        a.click();
                    }
                }
            }
            else {
            
            
            
            
         downloadSelectedFilesAsZip(arrFileFolder);
         return false;
            
            
            /*
            
                if(entry.IsBlock==undefined||entry.IsBlock=='undefined'||entry.IsBlock==null||entry.IsBlock=='null'||entry.IsBlock==''||entry.IsBlock=='No')//If shared section than check permission for restricted view.
            {
                FolderSiteURL = entry.SiteURL;
                if (entry.ServerURL.search(/\bDocuments\b/) >= 0) {
                    entry.ServerURL = entry.ServerURL.replace('Documents', 'Shared Documents');
                }
                else if (entry.ServerURL.search(/\bShared%20Documents\b/) >= 0) {
                    entry.ServerURL = entry.ServerURL.replace('Shared%20Documents', 'Shared Documents');
                }
               // var Ownurl = entry.SiteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + entry.ServerURL + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields";
                var Ownurl = entry.SiteURL + "/_api/Web/GetFolderByServerRelativePath(decodedurl='" + fixedEncodeURIComponent(entry.ServerURL) + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields";
                $.ajax({
                    url: Ownurl,
                    headers: { Accept: "application/json;odata=verbose" },
                    async: true,
                    success: function (data) {
                        var files = data.d.Files.results;
                        for (var file = 0; file < files.length; file++) {
                        	Extension = files[file].Name.substring(files[file].Name.lastIndexOf('.') + 1);
                        	if(files[file].ServerRelativeUrl.includes('/Documents/') == true) {
			                    files[file].ServerRelativeUrl = files[file].ServerRelativeUrl.replace("/Documents/", "/Shared Documents/");//2 march 23
			                }
                            if (Extension.toLowerCase() != "js" &&Extension.toLowerCase() != "txt" && Extension.toLowerCase() != "png" && Extension.toLowerCase() != "jpeg" && Extension.toLowerCase() != "gif" && Extension.toLowerCase() != "jpg" && Extension.toLowerCase() != "pdf") {
			                	//$.fileDownload(files[file].ServerRelativeUrl);
                                $.fileDownload("/"+fixedEncodeURIComponent(files[file].ServerRelativeUrl.slice(1),"href"));
                                
			                }
			                else {
				                var a = document.createElement("a");
	                           // a.setAttribute('href', window.location.origin + files[file].ServerRelativeUrl);
                                 a.setAttribute('href', window.location.origin + "/"+fixedEncodeURIComponent( files[file].ServerRelativeUrl.slice(1),"href"));
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
            
            */
            
            }
            if ((index + 1) == arrFileFolder.length) {
                //alert("All the file(s)/folder(s) have been downloaded.");
                $(".chkFileFolder").prop("checked", false);
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

   // var Ownurl = SiteURL+ "/_api/Web/GetFolderByServerRelativeUrl('" + ServerURL + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields";
    var Ownurl = SiteURL+ "/_api/Web/GetFolderByServerRelativePath(decodedurl='" + fixedEncodeURIComponent(ServerURL) + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var files = data.d.Files.results;
            for (var file = 0; file < files.length; file++) {
            	Extension = files[file].Name.substring(files[file].Name.lastIndexOf('.') + 1);
            	if(files[file].ServerRelativeUrl.includes('/Documents/') == true) {
                    files[file].ServerRelativeUrl = files[file].ServerRelativeUrl.replace("/Documents/", "/Shared Documents/");
                }
            	if (Extension.toLowerCase() != "js" &&Extension.toLowerCase() != "txt" && Extension.toLowerCase() != "png" && Extension.toLowerCase() != "jpeg" && Extension.toLowerCase() != "gif" && Extension.toLowerCase() != "jpg" && Extension.toLowerCase() != "pdf") {
                	//$.fileDownload(files[file].ServerRelativeUrl);
                     $.fileDownload("/"+fixedEncodeURIComponent(files[file].ServerRelativeUrl.slice(1),"href"));
                }
                else {
                	var a = document.createElement("a");
	               // a.setAttribute('href', window.location.origin + files[file].ServerRelativeUrl);
                    
                    a.setAttribute('href', (window.location.origin + "/"+fixedEncodeURIComponent(files[file].ServerRelativeUrl.slice(1),"href")));
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
            if(fixedDecodeURIComponent(Documentname)[Documentname.length - 1] == '/') {//3 jan 23
                var folderName = fixedDecodeURIComponent(Documentname);
            }
            else {
                var folderName = fixedDecodeURIComponent(Documentname) + '/';
            }

            for (var index = 0; index < arrFileFolder.length; index++) {
                if (arrFileFolder[index].type == 'file') {
                    if (IsFileCheckout(folderName, arrFileFolder[index].FileFolderName, arrFileFolder[index].SiteURL, '') != true) {
                        if(arrFileFolder[index].SelectedLibrary.search(/\bShared%20Documents\b/) >= 0) {
                            arrFileFolder[index].SelectedLibrary= arrFileFolder[index].SelectedLibrary.replace("Shared%20Documents", 'Documents');
                        }
                        else
                        if(arrFileFolder[index].SelectedLibrary.search(/\bShared Documents\b/) >= 0) {//Bhawana
                            arrFileFolder[index].SelectedLibrary= arrFileFolder[index].SelectedLibrary.replace("Shared Documents", 'Documents');
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
                                RequestDigest = $("#__REQUESTDIGEST").val();
                                itemUpdated++;
                                ChangeRevokeMessage("Revoked due to file Deletion", arrFileFolder[index].DocumentId, arrFileFolder[index].FileFolderName);
                                if (itemUpdated == arrFileFolder.length) {
                                    if (FailDueToCheckOut == 0) {
                                        alert("All the files/folders have been deleted.");
                                    }
                                    else {
                                        alert(FailDueToCheckOut + " files couldn't be deleted because of locked others have been deleted successfully.");
                                    }
                                    $(".chkFileFolder").prop("checked", false);
                                    arrFileFolder = [];
                                    var tempDocName = fixedDecodeURIComponent(Documentname);
                                    if(fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                                        //tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                                        tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                                    } 
                                    else if(fixedDecodeURIComponent(Documentname) == 'Documents') {
                                       // tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                                        
                                        tempDocName = tempDocName.replace("Documents", "Shared Documents");
                                    } 
                                    GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
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
                        if (FailDueToCheckOut == arrFileFolder.length) {
                            waitingDialog.hide();
                            FailDueToCheckOut = 0;
                            alert("Selected file(s) are locked, couldn't be deleted.");
                            $(".chkFileFolder").prop("checked", false);
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
                            arrFileFolder = [];
                            var tempDocName = fixedDecodeURIComponent(Documentname);
                            if(fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                                tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                            } 
                            else if(fixedDecodeURIComponent(Documentname) == 'Documents') {
                                tempDocName = tempDocName.replace("Documents", "Shared Documents");
                            }
                            GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
                        }

                    }
                }
                else { //Folder deletion
                    if(arrFileFolder[index].ServerURL.includes('/Documents/') == true) {
                        arrFileFolder[index].ServerURL = arrFileFolder[index].ServerURL.replace('Documents', 'Shared Documents');
                    }
                    if (arrFileFolder[index].SiteURL != _spPageContextInfo.webAbsoluteUrl) {
                        $.when(GetFormDigestValue(arrFileFolder[index].SiteURL)).done(function(GetFormDigestValue) {
                            RequestDigest = GetFormDigestValue
                        });
                    }
                    //var nUrl=arrFileFolder[index].SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + arrFileFolder[index].ServerURL + "')";
                    var nUrl=arrFileFolder[index].SiteURL + "/_api/web/GetFolderByServerRelativePath(decodedurl='" +fixedEncodeURIComponent(arrFileFolder[index].ServerURL) + "')";
                    $.ajax({
                        url:nUrl,// arrFileFolder[index].SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + arrFileFolder[index].ServerURL + "')",
                        method: "POST",
                        async: false,
                        headers: {
                            "X-RequestDigest": RequestDigest,
                            "IF-MATCH": "*",
                            "X-HTTP-Method": "DELETE"
                        },
                        success: function (data) {
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            itemUpdated++;
                            ChangeRevokeMessage("Revoked due to file Deletion", arrFileFolder[index].DocumentId, arrFileFolder[index].FileFolderName);
                            if (itemUpdated == arrFileFolder.length) {
                                if (FailDueToCheckOut == 0) {
                                    alert("All the files/folders have been deleted.");
                                }
                                else {
                                    alert(FailDueToCheckOut + " files couldn't be deleted because of locked others have been deleted successfully.");
                                }
                                $(".chkFileFolder").prop("checked", false);
                                arrFileFolder = [];
                                var tempDocName = fixedDecodeURIComponent(Documentname);
                                if(fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                                    tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                                } 
                                else if(fixedDecodeURIComponent(Documentname) == 'Documents') {
                                    tempDocName = tempDocName.replace("Documents", "Shared Documents");
                                } 
                                GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
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

//to Revoke permission and add Remarks while Deleting and Moving files and folder
function ChangeRevokeMessage(RemarksMsg, DocId, Title) {
    var queryFilter = "&$filter=Title eq '" + encodeURI(Title) + "' and DocumentID eq '" + encodeURI(DocId) + "' ";
    var Query = "?$select=ID,DocumentNo,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID&$expand=SharedUsers,Author" + queryFilter;
    $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
        if(items.length > 0){
            for (var i = 0; i < items.length; i++) {
                currentItemId = items[i].ID;
                var ListName = "SharedDocument";
                var Metadata;
                var ItemType = GetItemTypeForListName(ListName);
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    PermissionStatus: "Revoked",
                    share_remarks: RemarksMsg,
                    SharedEnd: new Date().toISOString()
                }
                $.when(updateItemWithIDItemListDocuments(ListName, Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
                    RemarksMsg = RemarksMsg.replace("Revoked", 'Cancelled');
                    $.when(getApprovallinks(RemarksMsg, DocId, Title)).done(function (results) {
                        console.log("sucessfully revoke");
                    });
                });
            }
        }
        else {
            RemarksMsg = RemarksMsg.replace("Revoked", 'Cancelled');
            $.when(getApprovallinks(RemarksMsg, DocId, Title)).done(function (results) {
                console.log("sucessfully revoke");
            });
        }
    });
}

//to Revoke approval process and add Remarks while Deleting and Moving files and folder
function getApprovallinks(RemarksMsg, DocId, Title) {
    var Query = "?$select=Title,Id,FileServerURL,FileName,DocumentID&$filter=DocumentID eq '" + DocId.toString() + "' and FileName eq '" + encodeURI(Title) + "'  ";
    $.when(getItemsWithQuery('DocumentApprovalRequests', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalInfo) {
        if (ApprovalInfo.length > 0) {
            for (var i = 0; i < ApprovalInfo.length; i++) {
                CancelApprvlLinks(ApprovalInfo[i].Id, ApprovalInfo[i].FileServerURL, RemarksMsg);
            }
        }
    });
}

//update the ApprovalDocument URL
function CancelApprvlLinks(UpdateId, DocURL, RemarksMsg) {
    var ListName = "DocumentApprovalRequests";
    var Metadata;
    var ItemType = GetItemTypeForListName(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        //Status: AddedStatus,
        NextActionbyId: {
            'results': []
        },
        NextActionApprover: "",
        NextAction: "",
        Status: "Cancelled",
        Remarks: RemarksMsg,
    };

    $.when(updateItemWithIDItemListDocuments(ListName, Metadata, UpdateId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
        var Query = "?$select=Title,Id,RequestID&$filter=RequestID eq '" + UpdateId + "' and Status eq 'Started' ";
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
                        Status: "Cancelled",
                        Remarks: RemarksMsg,
                    }
                    $.when(updateItemWithIDItemListDocuments(ListName, Metadata, Approvals[j].Id, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
                        console.log("Approval list link has been updated.");
                    });
                }
            }
        });
    });
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


//Uploading files code starts---------------------------

//Mandatory column attachment validation
function AttachmentValidation() {
    var ReturnValue = true;
    if(currentSectionType != "My Documents"){
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
function saveAttachment() {
    if($("#RenameandUpload").prop('checked') == true && $("#txtNamePostfix").val().trim() == ""){
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
           //  if(Documentname[Documentname.length - 1] == '/') {
            if(fixedDecodeURIComponent(Documentname)[Documentname.length - 1] == '/') {//Bhawana 3 jan 23
                
                var folderName = fixedDecodeURIComponent(Documentname);
            }
            else {
                var folderName =fixedDecodeURIComponent(Documentname) + '/';
            }
            UploadFile(folderName, FinalFiles4Upload[k], siteUrl, k);
        }
        if(FailDueToCheckOut == FinalFiles4Upload.length){
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
        if(IsFileCheckout(folderName, textFileUrLLink, webUrl, 'Upload') == true){
            FailDueToCheckOut++;
        }
        else {
            arrMetadata = IsFileExist(folderName, textFileUrLLink, webUrl);
            uploadDocuments(folderName, file, webUrl, arrMetadata, LoopCount);
        }
    }
    else if ($('#chkUploadNew').is(':checked') == true) { //upload new metadata
        if(IsFileCheckout(folderName, textFileUrLLink, webUrl, 'Upload') == true){
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
            if (FinalFiles4Upload.length == (LoopCount+1+FailDueToCheckOut)) {
                if ($('#chkUploadMail').prop('checked') == true) {
                    EmailProperties(webUrl);
                }
                else {
                    DocUrlCollection = [];
                    if(FailDueToCheckOut == 0) {
                        alert("File(s) have been uploaded successfully.");
                    }
                    else {
                        alert(FailDueToCheckOut +" file(s) are locked, couldn't be uploaded.\nOther files(s) have been uploaded successfully.");
                    }
                    waitingDialog.hide();
                    var tempDocName = Documentname;
                    if(Documentname.includes('/Documents/') == true) {
                        tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                    } 
                    else if(Documentname == 'Documents') {
                        tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                    }
                    GetMyDocumentsWithFilesFolder(tempDocName);
                }
                $("#myModalupload").modal('hide');
            }
            //Do not upload
        }
    }
    else if ($('#RenameandUpload').is(':checked') == true) { //Rename and Upload
        if(IsFileCheckout(folderName, textFileUrLLink, webUrl, 'Upload') == true){
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
    var serverRelativeURL = "/" + fixedDecodeURIComponent(WebURL).substring(fixedDecodeURIComponent(WebURL).indexOf('/s') + 1);
    var Checkpath = serverRelativeURL + "/" + fixedDecodeURIComponent(FolderName) + fixedDecodeURIComponent(FileName);
    var ServerRelativeUrlofFile =fixedDecodeURIComponent(WebURL) + "/_api/web/GetFileByServerRelativeUrl('" + Checkpath + "')/CheckedOutByUser/Email"
    $.ajax({
        url: ServerRelativeUrlofFile,
        type: "GET",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data, status, xhr) {
            if(Action == "Upload") {
                if(data.d.Email.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
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
function IsFileCheckout_old(FolderName, FileName, WebURL, Action) {
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
            if(Action == "Upload") {
                if(data.d.Email.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
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

function uploadDocuments (folderName, file, webUrl, ExistFileMetadata, LoopCount) {
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
                //if (Documentname.indexOf('/') != -1) {
                   
                if (fixedDecodeURIComponent(Documentname).indexOf('/') != -1) {
                    libraryName = fixedDecodeURIComponent(Documentname).split('/')[0];
                } else {
                    libraryName = fixedDecodeURIComponent(Documentname);
                }
                //libraryName = "Documents";
            }

            var reader = new FileReader();
            var arrayBuffer;

            reader.onload = function (e) {
                arrayBuffer = reader.result;
               
                var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + libraryName;              
                
                var changedFileName = FileNameUpload = file.name;
                 
                if ($('#RenameandUpload').is(':checked') == true && $('#chkAlwaysUpload').prop('checked') == true) { //Rename and Upload always
                    changedFileName = file.name.split('.').slice(0, -1).join('.');
                    changedFileName = $("#txtNamePrefix").val().trim() + changedFileName + $("#txtNamePostfix").val().trim() + "."+file.name.substring(file.name.lastIndexOf('.') + 1);
                }
                else if ($('#RenameandUpload').is(':checked') == true && ExistFileMetadata.length != 0) { //Rename and Upload
                    changedFileName = file.name.split('.').slice(0, -1).join('.');
                    changedFileName = $("#txtNamePrefix").val().trim() + changedFileName + $("#txtNamePostfix").val().trim() + "."+file.name.substring(file.name.lastIndexOf('.') + 1);
                }
                if (checkSpecialCharaters(changedFileName) == true) {
                    changedFileName = changedFileName.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
                }
                else {
                    //changedFileName = file.name;
                }
                if(folderName.includes('/Documents/') == true) {
                    //if(folderName.includes('Shared Documents') == false) {
                    folderName = folderName.replace('Documents', 'Shared Documents');
                    //}
                }//Bhawana 3 jan 23
                else  if(folderName=='Documents')  {
                    folderName = 'Shared Documents';
                    
                }
                else {
                    if(CheckLibary == 'Shared%20Documents' || CheckLibary == 'Shared Documents') {
                        if(folderName.includes('Shared Documents') == false && folderName.includes('Shared%20Documents') == false) {
                            folderName = folderName.replace('Documents', 'Shared Documents');
                        }
                    }
                }
                if (webUrl != _spPageContextInfo.webAbsoluteUrl) 
                // targetUrl ="/"+DMS_Link.split( _spPageContextInfo.portalUrl)[1].substr(0,DMS_Link.split( _spPageContextInfo.portalUrl)[1].split('/Forms')[0].lastIndexOf("/"))+ "/" + folderName;
                targetUrl ="/"+DMS_Link.split( _spPageContextInfo.portalUrl)[1].substr(0,DMS_Link.split( _spPageContextInfo.portalUrl)[1].split('/Forms')[0].lastIndexOf("/"))+ "/" + folderName.substr(0,folderName.lastIndexOf('/'));
                 else
                //targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + folderName;
                targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" +folderName.substr(0,folderName.lastIndexOf('/'));
                if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(webUrl)).done(function(GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                }
                //url = webUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderName + "')/Files/add(url='" + changedFileName + "',overwrite=true)?@target='" + targetUrl + "'&$expand=ListItemAllFields";
               // url = webUrl + "/_api/web/GetFolderByServerRelativePath(decodedurl='" +fixedEncodeURIComponent( folderName) + "')/Files/add(url='" + changedFileName + "',overwrite=true)?@target='" + targetUrl + "'&$expand=ListItemAllFields";
                url = webUrl + "/_api/web/GetFolderByServerRelativePath(decodedurl='" +fixedEncodeURIComponent( targetUrl) + "')/files/AddUsingPath(decodedurl='" + changedFileName + "',overwrite=true)?$expand=ListItemAllFields";
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
                               // propertiesServerRelativeUrl = encodeURI(response.d.ServerRelativeUrl);
                                propertiesServerRelativeUrl = fixedEncodeURIComponent(response.d.ServerRelativeUrl);
                            }
                            else if (propertiesServerRelativeUrl != null && propertiesServerRelativeUrl != "") {                            
                                
                             propertiesServerRelativeUrl='/sites'+propertiesServerRelativeUrl.split('/sites')[1];
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
                            if(errorr.responseText.includes("Access denied") == true) {
                                alert("You don't have the required permission to upload "+file.name+".");
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
                        if(error.responseJSON.error.message.value.includes("denied") == true) {
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
            if(errorr.responseText.includes("Access denied") == true) {
                alert("You don't have the required permission to upload "+file.name+".");
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
    var turl=siteUrl + "/_api/Web/GetFileByServerRelativePath(decodedurl='" + fixedEncodeURIComponent(targetFileUrl) + "')/ListItemAllFields";
    $.ajax({
        url:turl,// siteUrl + "/_api/Web/GetFileByServerRelativeUrl('" + targetFileUrl + "')/ListItemAllFields",
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
            alert(errorMessage.responseText);
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
        if(arrMetadata.length == 0 && $('#prefix_and_postfix_name').is(':checked') == true){
            FileName = FileName.split('.').slice(0, -1).join('.');
            FileTitleValue = $("#txtTitlePrefix").val().trim() + FileName + $("#txtTitlePostfix").val().trim();
        }
    }
    if(ListName.includes('Documents') == true) {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var tempCopyLib = ListName;
        if(tempCopyLib.includes('_') == true){
            tempCopyLib = tempCopyLib.replaceAll('_', '_x005f_');
        }
        if(tempCopyLib.includes('%20') == true){
            tempCopyLib = tempCopyLib.replaceAll('%20', '_x0020_');
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
        if($('#chkKeepExist').is(':checked') == true && arrMetadata.length != 0) {
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
                Approval: arrMetadata.Approval ? arrMetadata.Approval: ""
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
        $.when(GetFormDigestValue(webUrl)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var tempListName = ListName;
    if(tempListName == 'Shared%20Documents' || tempListName == 'Shared Documents') {
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
            if(FinalFiles4Upload.length == (LoopCount+1+FailDueToCheckOut)) {
                if ($('#chkUploadMail').prop('checked') == true) {
                    EmailProperties(webUrl);
                }
                else {
                    DocUrlCollection = [];
                    if(FailDueToCheckOut == 0) {
                        alert("File(s) have been uploaded successfully.");
                    }
                    else {
                        alert(FailDueToCheckOut +" file(s) are locked, couldn't be uploaded.\nOther files(s) have been uploaded successfully.");
                    }
                    FinalFiles4Upload=[];//28 feb 2023
                    waitingDialog.hide();
                    var tempDocName = Documentname;
                    if(Documentname.includes('/Documents/') == true) {
	                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
	                } 
	                else if(Documentname == 'Documents') {
	                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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
            if(error.responseText.indexOf('does not exist on type') != -1 || error.responseText.indexOf('The security validation for this page is i') != -1) {
                var tempDocName = Documentname;
                if(Documentname.includes('/Documents/') == true) {
                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                } 
                else if(Documentname == 'Documents') {
                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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

//get the Team memebers email
function getFromUserEmail() {
    var arrFrom = [];
    if (currentSectionType == "My Documents") {
        arrFrom.push(_spPageContextInfo.userEmail);
    }
    else if (currentSectionType == "Department") {
        var Query = "?$select=MassMailID,CompanyID/Id,DepartmentName&$expand=CompanyID&$filter=CompanyID/Id eq '" + Logged_CompanyId + "' and DepartmentName eq '" + $(".headdingLinks").text() + "' ";
        $.when(getItemsWithQuery("Departments", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TeamMember) {
            arrFrom.push(TeamMember[0].MassMailID);
        });
    }
    else if (currentSectionType == 'Group Documents') {
        var Query = "?$select=Title,EmployeeName/EMail&$expand=EmployeeName&$filter=Title eq '" + $(".headdingLinks").text() + "' ";
        $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TeamMember) {
            if(TeamMember[0].EmployeeName.results != null){
                for (var i = 0; i < TeamMember[0].EmployeeName.results.length; i++) {
                    arrFrom.push(TeamMember[0].EmployeeName.results[i].EMail);
                }
            }
        });
    }
    else if (currentSectionType == 'ProjectDocuments') {
        var Query = "?$select=Title,Project/Title,TeamMember/EMail&$expand=TeamMember,Project&$filter=Project/Title eq '" + $(".headdingLinks").text() + "' ";
        $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TeamMember) {
            for (var i = 0; i < TeamMember.length; i++) {
                arrFrom.push(TeamMember[i].TeamMember.EMail);
            }
        });
    }
    else if (currentSectionType == "GuestDocuments") {
        var Query = "?$select=Title,InternalMembers/EMail,InternalSupervisor/EMail,Supervisor/EMail&$expand=InternalMembers,InternalSupervisor,Supervisor&$filter=Title eq '" + $(".headdingLinks").text() + "' ";
        $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TeamMember) {
            if(TeamMember[0].InternalSupervisor.EMail != undefined && TeamMember[0].InternalSupervisor.EMail != null) {
                arrFrom.push(TeamMember[0].InternalSupervisor.EMail);
            }
            if(TeamMember[0].Supervisor.EMail != undefined && TeamMember[0].Supervisor.EMail != null) {
                arrFrom.push(TeamMember[0].Supervisor.EMail);
            }
            if(TeamMember[0].InternalMembers.results != undefined && TeamMember[0].InternalMembers.results != null) {
                for (var i = 0; i < TeamMember[0].InternalMembers.results.length; i++) {
                    arrFrom.push(TeamMember[0].InternalMembers.results[i].EMail);
                }
            }
        });
    }
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
    for(var k = 0; k < LabelDefaultLangauge.length; k++) {
        if(UploadDocDesign.includes(LabelDefaultLangauge[k].Key) == true){
            UploadDocDesign = UploadDocDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
        }	
    }

    UploadDocDesign += "This is an auto generated email. Please don't reply.";
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
   // var cmpnyLogoURL=GetMyCompanyLogoUrl();

    var UploadDocDesign = '';
    var FileDocType = '';
    var FromUserEmails = [];
    if($("#ddlFileType").val() != "-Select-") {
        FileDocType = $("#ddlFileType").val();
    }
    var Library = '';
    if (currentSectionType == 'My Documents') {
        Library = '<strong>Library:</strong> My Documents';
    }
    /*else  {
        Library = '<strong>Library:</strong> ' + $(".headdingLinks").text();
    }*/
   else if (currentSectionType == 'Department') {
        //Library = '<strong>Department:</strong> ' + $(".headdingLinks").text();
        Library = '<strong>'+ $("#liDeptDocs span:first").text()+' </strong> : '+ $(".headdingLinks").text();
    }
    else if (currentSectionType == 'Group Documents') {
        //Library = '<strong>Group:</strong> ' + $(".headdingLinks").text();
        Library = '<strong>'+ $("#GpDocuments span:first").text()+'</strong> : ' + $(".headdingLinks").text();
       
    }
    else if (currentSectionType == 'ProjectDocuments') {
        /*if(window.location.host.toLowerCase()=="appriver3651004216.sharepoint.com")
        Library = '<strong>Property:</strong> ' + $(".headdingLinks").text();
        else
        Library = '<strong>Project:</strong> ' + $(".headdingLinks").text();*/
        Library = '<strong>'+ $("#liProjectDocs span:first").text()+' </strong> : ' + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'GuestDocuments') {
       Library = '<strong> '+ $("#liGuestDocs span:first").text()+' </strong> : ' + $(".headdingLinks").text();
       // Library = '<strong>Guest Client:</strong> ' + $(".headdingLinks").text();
        
    }
    UploadDocDesign="";

    /*Important */
    /*--------------------------*/
    //Undo comment in case want to show logo in mail.
    if(window.location.host.toLowerCase()=="appriver3651004216.sharepoint.com")
   UploadDocDesign = '<div data-imagetype="External" style="margin-bottom:12px;width: 300px;background-image: url(https://cdn.jsdelivr.net/gh/Titan4workGit/shared@main/dayriselogo-dark1.png);background-position: center;background-repeat: no-repeat;min-height: 100px; background-size: contain;"></div>';   
    /*Important End*/
    /*--------------------------*/

    UploadDocDesign = UploadDocDesign+"Following document(s) have been uploaded.<br/><br/>";
    var FromUserEmails = getFromUserEmail();
    for (var i = 0; i < DocUrlCollection.length; i++) {
        var MailLink = '';
        //var FileServerURL = DocUrlCollection[i].FileUrl;
        var FileServerURL = fixedDecodeURIComponent(DocUrlCollection[i].FileUrl);
        if (DocUrlCollection[i].FileName.indexOf("xml") != -1 || DocUrlCollection[i].FileName.indexOf("rar") != -1 || DocUrlCollection[i].FileName.indexOf("png") != -1 || DocUrlCollection[i].FileName.indexOf("jpg") != -1 || DocUrlCollection[i].FileName.indexOf("jpeg") != -1) {
            if (FileServerURL.includes("DocumentManagementSystem") == true || FileServerURL.includes("DepartmentalDMS") == true) {
                if (FileServerURL.includes("DocumentManagementSystem") == true) {
                    MailLink = siteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + fixedEncodeURIComponent(FileServerURL,"href") + "&parent=" + fixedEncodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
                } else {
                    MailLink = siteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + fixedEncodeURIComponent(FileServerURL,"href") + "&parent=" + fixedEncodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
                }
            } else {
                MailLink = DMS_Link + "?id=" + fixedEncodeURIComponent(FileServerURL,"href") + "&parent=" + fixedEncodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/"))) + "&p=true";
                //var HostName = window.location.origin + FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0);
                //MailLink = HostName + "/Forms/AllItems.aspx?id=" + fixedEncodeURIComponent(FileServerURL,"href") + "&parent=" + fixedEncodeURIComponent(FileServerURL.substr(0, FileServerURL.lastIndexOf("/") + 0));
            }
        }
        else {
           // MailLink = window.location.origin+'/'+encodeURI(DocUrlCollection[i].FileUrl);
            MailLink = window.location.origin+'/'+encodeURI(FileServerURL);
            
        }
        
        UploadDocDesign = UploadDocDesign+ '<div style="margin-top:12px;"> ' + Library + '</div><br/>' +
        									'<div><strong>File Name : </strong>' + DocUrlCollection[i].FileName + '</div>'+
        									'<div data-localize="Title"><strong>Title</strong><strong> : </strong> ' + $("#txtFileTitle").val() + '</div>' +
                                        	'<div data-localize="Reference"><strong>Reference</strong><strong> : </strong> ' + $("#txtdocumentNo").val() + '</div>' +
                                            '<div data-localize="Category"><strong>Category</strong><strong> : </strong> ' + FileDocType + '</div>' +
                                            '<div><strong>Details : </strong> ' + $("#UploadFileComment").val() + '</div><br/>' +
                                            '<div><strong>Uploaded by : </strong> ' + _spPageContextInfo.userDisplayName +' ('+ _spPageContextInfo.userEmail+')'+ '</div>' +
                                            '<div><strong>Uploaded On : </strong> ' + moment(new Date()).format('MMM DD YYYY HH:mm A') + "</div><br/><br/>";
        UploadDocDesign = UploadDocDesign+'<a href="'+MailLink+'">Click here </a> to open the document.' + '<br/><br/>';

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
            'From':  _spPageContextInfo.userEmail,
            'To': { 'results': FromUserEmails },
            //'CC': { 'results': ccUsers },
            'Body': UploadDocDesign,
            'Subject': "Document(s) have been uploaded."
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
            if(FailDueToCheckOut == 0) {
                alert("File(s) have been uploaded successfully.");
            }
            else {
                alert(FailDueToCheckOut +" file(s) are locked, couldn't be uploaded.\nOther files(s) have been uploaded successfully.");
            }
            waitingDialog.hide();
            var tempDocName = Documentname;
            if(Documentname.includes('/Documents/') == true) {
                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
            } 
            else if(Documentname == 'Documents') {
                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
        },
        error: function (xhr, data, error) {
            if(FailDueToCheckOut == 0) {
                alert("File(s) have been uploaded successfully.");
            }
            else {
                alert(FailDueToCheckOut +" file(s) are locked, couldn't be uploaded.\nOther files(s) have been uploaded successfully.");
            }
            waitingDialog.hide();
            var tempDocName = Documentname;
            if(Documentname.includes('/Documents/') == true) {
                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
            } 
            else if(Documentname == 'Documents') {
                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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
    var Documentname1=fixedDecodeURIComponent(Documentname);
    if (Documentname1.substr(Documentname1.length - 1) == '/') {
        Documentname = fixedEncodeURIComponent(Documentname1.substring(0, Documentname1.length - 1));
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
                //var folderexistcheck = ChekFolderExistOrNot(FolderPath, newSubfolderName);
                var folderexistcheck = ChekFolderExistOrNotPath(FolderPath, newSubfolderName);
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
                //$.when(CreateDMSFolder(FolderPath, newSubfolderName, false)).done(function (MainExamListItemTemp) {//Folder created
                 $.when(CreateDMSFolderPath(FolderPath, newSubfolderName, false)).done(function (MainExamListItemTemp) {//Folder created
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
                            
                            if (fixedDecodeURIComponent(Documentname).indexOf('/') != -1) {
                                libraryName = fixedDecodeURIComponent(Documentname).split('/')[0];
                            } else {
                                libraryName = fixedDecodeURIComponent(Documentname);
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
                   // $.when(CreateDMSFolder(FolderPath, newSubfolderName, false)).done(function (MainExamListItemTemp) {
                        $.when(CreateDMSFolderPath(FolderPath, newSubfolderName, false)).done(function (MainExamListItemTemp) {
                        if (MainExamListItemTemp.Exists != undefined) {
                            if (DMS_Link.includes("DocumentManagementSystem") == true || DMS_Link.includes("DepartmentalDMS") == true) {
                                if (DMS_Link.includes("DocumentManagementSystem") == true) {
                                    libraryName = "DocumentManagementSystem";
                                } else {
                                    libraryName = "DepartmentalDMS";
                                }
                            } else {
                                if (fixedDecodeURIComponent(Documentname).indexOf('/') != -1) {
                                    libraryName =fixedDecodeURIComponent(Documentname).split('/')[0];
                                } else {
                                    libraryName = fixedDecodeURIComponent(Documentname);
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
                            FolderPath = FolderPath + fixedEncodeURIComponent("/" + newSubfolderName);
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
                    FolderPath = FolderPath + fixedEncodeURIComponent("/" + newSubfolderName);
                }
            }

        }

    }
    //Upload the files on the mentioned folder
    if (IsPermission == true) {
        var siteUrl = DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/"));
        if (fixedDecodeURIComponent(Documentname)[Documentname.length - 1] == '/') {
            var folderName = fixedDecodeURIComponent(Documentname);
        }
        else {
            var folderName = fixedDecodeURIComponent(Documentname) + '/';
        }
        for (var file = 0; file < FinalFoldersUpload.length; file++) {
            var tempFolder = checkFolderSpecialCharUpload(FinalFoldersUpload[file].webkitRelativePath.substr(0, FinalFoldersUpload[file].webkitRelativePath.lastIndexOf("/")));
            FolderPath = folderName + tempFolder;
            uploadFolderDocumentsPath(FolderPath, FinalFoldersUpload[file], siteUrl, file);
        }
    }
}
function uploadFolderDocumentsPath(folderName, file, webUrl, LoopCount) {
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
                if (fixedDecodeURIComponent(Documentname).indexOf('/') != -1) {
                    libraryName = fixedDecodeURIComponent(Documentname).split('/')[0];
                } else {
                    libraryName = fixedDecodeURIComponent(Documentname);
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
                if (webUrl != _spPageContextInfo.webAbsoluteUrl) 
                    targetUrl ="/"+DMS_Link.split( _spPageContextInfo.portalUrl)[1].substr(0,DMS_Link.split( _spPageContextInfo.portalUrl)[1].split('/Forms')[0].lastIndexOf("/"))+ "/" + folderName;
     else
                    targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + folderName;
                url = webUrl + "/_api/web/GetFolderByServerRelativePath(decodedurl='" +fixedEncodeURIComponent( targetUrl) + "')/files/AddUsingPath(decodedurl='" + changedFileName + "',overwrite=true)?$expand=ListItemAllFields";
              //url = webUrl + "/_api/web/GetFolderByServerRelativeUrl('" + folderName + "')/Files/add(url='" + changedFileName + "',overwrite=true)?@target='" + targetUrl + "'&$expand=ListItemAllFields";
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
                                var tempDocName = fixedDecodeURIComponent(Documentname);
                                if(fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                                } 
                                else if(Documentname == 'Documents') {
                                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                                } 
                                GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
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
                if (decodeURIComponent(Documentname).indexOf('/') != -1) {
                    libraryName = decodeURIComponent(Documentname).split('/')[0];
                } else {
                    libraryName = decodeURIComponent(Documentname);
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




function EmailsMyDocumentfolder() {
    var siteUrl = DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/"));
    var rootLib = DMS_Link.split('/Forms')[0].substr(DMS_Link.split('/Forms')[0].lastIndexOf("/")+1,DMS_Link.split('/Forms')[0].length);;
    var siteUrlencode = btoa(siteUrl);
    var folderName="";
    if(decodeURIComponent(Documentname)[Documentname.length - 1] == '/') {
        folderName = decodeURIComponent(Documentname);
    } else {
        folderName = decodeURIComponent(Documentname) + '/';
    }
    var origin="";
    if (folderName.includes("DocumentManagementSystem") == true)
       { origin="My Documents "+folderName.split("DocumentManagementSystem/"+_spPageContextInfo.userEmail)[1].substr(0, folderName.split("DocumentManagementSystem/"+_spPageContextInfo.userEmail)[1].lastIndexOf("/"));
       rootLib=rootLib+"/"+_spPageContextInfo.userEmail;
       }
        else 
        if (folderName.includes("DepartmentalDMS") == true)
        origin=currentSectionType+":"+DMS_Type+folderName.split("DepartmentalDMS")[1].substr(0,folderName.split("DepartmentalDMS")[1].lastIndexOf("/"));
        else if (currentSectionType == "ProjectDocuments")
        origin=currentSectionType+":"+DMS_Type+folderName.split("Documents")[1].substr(0,folderName.split("Documents")[1].lastIndexOf("/"));
        else
        {
            if(folderName.split(DMS_Type).length>1)
        origin=currentSectionType+":"+DMS_Type+folderName.split(DMS_Type)[1].substr(0,folderName.split(DMS_Type)[1].lastIndexOf("/"));
        else 
            origin=currentSectionType+":"+DMS_Type;
        }
        var encOrigin = btoa(origin);
    var rootLibencode = btoa(rootLib);

    var encDocumentName = btoa(folderName);
    $('#Team').show();
    $('#Team').html("");
    $('#Team').append($('<iframe id="myIframeTeam" class="IframeTeam" height="80vh" width="100%" title="Teams"></iframe>'));
    //$('#myIframeTeam').attr('src', _spPageContextInfo.webAbsoluteUrl + "/SitePages/outlookAttachments.aspx?SiteUrl="+siteUrlencode+"&Documentname=" + encDocumentName + "&origin="+encOrigin+"&root="+rootLibencode+"");
    $('#myIframeTeam').attr('src', _spPageContextInfo.webAbsoluteUrl + "/SitePages/outlookAttachments.aspx?SiteUrl="+siteUrl+"&Documentname=" + folderName + "&origin="+origin+"&root="+rootLib+"");
    
    //alert(Documentname);
    popupEmail("My Emails");

       
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
//Uploading folder code ends---------------------------

//to update the selected properties of the file
function UpdateFileFolderProperties() {
    var dfd = $.Deferred();
    var currentFileName = '';
    var tempCopyLib = arrFileFolder[0].SelectedLibrary;
    if(tempCopyLib.includes('_') == true){
        tempCopyLib = tempCopyLib.replaceAll('_', '_x005f_');
    }
    if(tempCopyLib.includes('%20') == true){
        tempCopyLib = tempCopyLib.replaceAll('%20', '_x0020_');
    }

    if (tempCopyLib.search(/\bDocuments\b/) >= 0 || tempCopyLib == "Shared Documents"|| tempCopyLib == "Shared%20Documents") {
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
    if (decodeURIComponent(Documentname)[Documentname.length - 1] == '/') {
        var folderName = decodeURIComponent(Documentname);
    }
    else {
        var folderName = decodeURIComponent(Documentname) + '/';
    }
    arrFileFolder.forEach(function (entry, index) {

        currentFileName = entry.FileFolderName;
        if (entry.type == 'file' || entry.type.toLowerCase() == 'folder') {
            if (IsFileCheckout(folderName, entry.FileFolderName, entry.SiteURL, '') != true && entry.type == 'file') {
                if (entry.SelectedLibrary == "Shared%20Documents" || entry.SelectedLibrary == "Shared Documents") {
                    entry.SelectedLibrary = "Documents";
                }
                if (entry.SiteURL != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(entry.SiteURL)).done(function(GetFormDigestValue) {
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
                            if(Documentname.includes('/Documents/') == true) {
                                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                            } 
                            else if(Documentname == 'Documents') {
                                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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
                            if(Documentname.includes('/Documents/') == true) {
                                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                            } 
                            else if(Documentname == 'Documents') {
                                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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
                        $.when(GetFormDigestValue(entry.SiteURL)).done(function(GetFormDigestValue) {
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
                                    tempDocName = tempDocName.replace("/Documents/", "Shared%20Documents");
                                } 
                                else if (Documentname=='Documents') {//Bhawana 3 jan 23
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
                                if(Documentname.includes('/Documents/') == true) {
                                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                                } 
                                else if(Documentname == 'Documents') {
                                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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
                            if(Documentname.includes('/Documents/') == true) {
                                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                            } 
                            else if(Documentname == 'Documents') {
                                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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
                if(Documentname.includes('/Documents/') == true) {
                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                } 
                else if(Documentname == 'Documents') {
                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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

//Add custom column for Property Update
function AddCustomColumns() {
    var Columns = '';
    arrCustomCol = [];
    var customColQ = '';
    var Title = '';
    if (currentSectionType == "Department") {
        Title = 'Department';
    }
    else if (currentSectionType == 'Group Documents') {
        Title = 'Group Documents';
    }
    else if (currentSectionType == "ProjectDocuments") {
        Title = 'Project Documents';
    }
    else if (currentSectionType == "GuestDocuments") {
        Title = 'Guest Portal Documents';
    }
    if (Title != "") {
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
    }
    return customColQ;
}

//Add custom column for Modal
function AddCustomColPopup(FileValue) {
    var Columns = '';
    var Title = '';
    var customColQ = '';
    if (currentSectionType == "Department") {
        Title = 'Department';
    }
    else if (currentSectionType == 'Group Documents') {
        Title = 'Group Documents';
    }
    else if (currentSectionType == "ProjectDocuments") {
        Title = 'Project Documents';
    }
    else if (currentSectionType == "GuestDocuments") {
        Title = 'Guest Portal Documents';
    }
    if (Title != "") {
        var Query = "?$select=*&$top=5&$filter=Title eq '" + Title + "' and DMS_Type eq '" + DMS_Type + "' and ColumnType eq 'Custom' ";
        $.when(getItemsWithQuery("DMSColumnSetting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (CustomCols) {
            if (CustomCols.length > 0) {

                for (var index = 0; index < CustomCols.length; index++) {
                    customColQ += 'ListItemAllFields/'+CustomCols[index].ColumnName+",";
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

//get single file properties and find it
function getSingleFileProperty(ServerURL, FileFolderType, FileFolderSite, customColQ) {
    //Bhawana 2 JAN 
     if(ServerURL.search(/\bShared Documents\b/) >= 0){
        ServerURL = ServerURL.replace("Shared Documents", "Shared%20Documents");
    }
    else if (ServerURL.search(/\bDocuments\b/) >= 0) {
        ServerURL = ServerURL.replace("Documents", "Shared%20Documents");
    }
    
    /*if (ServerURL.search(/\bDocuments\b/) >= 0) {
        ServerURL = ServerURL.replace("Documents", "Shared%20Documents");
    }
    else if(ServerURL.search(/\bShared Documents\b/) >= 0){
        ServerURL = ServerURL.replace("Shared Documents", "Shared%20Documents");
    }*/
    if (FileFolderType == 'file') {
        var webURL = FileFolderSite + "/_api/web/GetFileByServerRelativeUrl('" + ServerURL + "')?$expand=ListItemAllFields,Author,Files/Author,Editor&$select= LockedByUser,CheckedOutByUser,DocumentWrittenBy,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentType,ListItemAllFields/SubCategory,ListItemAllFields/FileValidity,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," +customColQ+
        "ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Acknowledgement,ListItemAllFields/Title,ListItemAllFields/Approval,ListItemAllFields/FileLeafRef,ListItemAllFields/ServerRedirectedEmbedUri,ListItemAllFields/Modified_x0020_By";
    }
    else {
        var webURL = FileFolderSite + "/_api/web/GetFolderByServerRelativeUrl('" + ServerURL + "')?$expand=ListItemAllFields,Author,Files/Author,Editor&$select= LockedByUser,CheckedOutByUser,DocumentWrittenBy,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentType,ListItemAllFields/SubCategory,ListItemAllFields/FileValidity,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," +customColQ+
	        "ListItemAllFields/DocumentWrittenBy,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Acknowledgement,ListItemAllFields/Title,ListItemAllFields/Approval,ListItemAllFields/FileLeafRef,ListItemAllFields/ServerRedirectedEmbedUri,ListItemAllFields/Modified_x0020_By";
    }
    while(customColQ.indexOf("ListItemAllFields/") != -1) {
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
            //$("#txtUpdateType").trigger('change'); -- Get Subtype on the basis of Category and then bind
            getSubCategory(FileValue.DocumentType, "txtUpdateSubType");
            if (FileValue.SubCategory != "--select--" && FileValue.SubCategory != null && FileValue.SubCategory != "-Select-") {
                $("#txtUpdateSubType").val(FileValue.SubCategory);
            }
            $("#txtUpdateRef").val(FileValue.DocumentNo ? FileValue.DocumentNo : "");
            $("#txtUpdateAuthor").val(FileValue.DocumentWrittenBy);
            if (FileValue.FileValidity != "" && FileValue.FileValidity != null && FileValue.FileValidity != "null") {
                $("#txtUpdateValidity").val(moment(new Date(FileValue.FileValidity)).format("MMM DD YYYY"));
            }
            $("#txtUpdateDetails").val(FileValue.Details ? FileValue.Details : "");
            //Custom COlumn
            var tempCustom = [];
            if(customColQ != '') {
                tempCustom = customColQ.split(',');
                for(cus=0;cus<tempCustom.length;cus++) {
                    if(new Date(FileValue[tempCustom[cus]]) != "Invalid Date") {
                        if(FileValue[tempCustom[cus]] != null && FileValue[tempCustom[cus]] != "null"){
                            $("#Custom"+tempCustom[cus]).val(moment(new Date(FileValue[tempCustom[cus]])).format("MMM DD YYYY"));
                        }
                    }
                    else {
                        $("#Custom"+tempCustom[cus]).val(FileValue[tempCustom[cus]] ? FileValue[tempCustom[cus]] : "");
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

//Add custom column to filter modal
function AddFilterCustomColumns(){
    var Columns = '';
    arrCustomColFilter = [];
    var Query = "?$select=*&$top=5&$filter=Title eq 'Group Documents' and DMS_Type eq '" + DMS_Type + "' and ColumnType eq 'Custom' ";
    $.when(getItemsWithQuery("DMSColumnSetting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (CustomCols) {
        if (CustomCols.length > 0) {
        	
            for (var index = 0; index < CustomCols.length; index++) {
                Columns += '<div class="col-sm-6 col-xs-6 customColFilter"><div class="form-group custom-form-group">';
                Columns += '<label>' + CustomCols[index].ColumnName + ':</label>';
                if (CustomCols[index].DataType == "Text") {
                    Columns += '<input type="text" class="form-control" id="Custom' + CustomCols[index].ColumnName + '">';
                }
                else if (CustomCols[index].DataType == "Date") {
                    Columns += '<input type="date" class="form-control CustomDateCol" id="Custom' + CustomCols[index].ColumnName + '">';
                }
                else if (CustomCols[index].DataType == "Number") {
                    Columns += '<input type="number" class="form-control" id="Custom' + CustomCols[index].ColumnName + '">';
                }
                Columns += '</div></div>';
                arrCustomColFilter.push({
                    chkId: "chkUpdate" + CustomCols[index].ColumnName,
                    ColName: CustomCols[index].ColumnName,
                    controlId: "Custom" + CustomCols[index].ColumnName,
                    colType: CustomCols[index].DataType
                });
            }
            $("#FilterControlBox").append(Columns);
        }
    });
}

//Library Filter method
function LibraryFilter() {
    var arrTemp=[],arrTempFile = [],arrTempFolder = [],
		arrSearchExt = [],
		DocType = '',
		SubType = '',
		DocNo = '',
		FileAuthor = '',
		Permission = '',
		Approval = '',
        customColQuery = '',
		FileExt = '';
        FileFolder='';
        ValidityDate='';
        emailDate='';
    var IsColValidityExists=false,IsColEmailDateExists=false;
    for(var i=0;i<valFilterfields.length;i++)
    {
        if(valFilterfields[i].Title=='email_date'){
          IsColEmailDateExists=true;  
        }
        if(valFilterfields[i].Title=='FileValidity'){
            IsColValidityExists=true;
        }
    }
	var FormattedToDate = moment($("#FilterModTo").val()).format("MM/DD/YYYY");;
    if (FormattedToDate == "Invalid date" || FormattedToDate == "Invalid Date") {
        FormattedToDate = 'null';
    }
    else {
        FormattedToDate = new Date(FormattedToDate);
    }	
    var FormattedFromDate = moment($("#FilterModFrom").val()).format("MM/DD/YYYY");;
    if (FormattedFromDate == "Invalid date" || FormattedFromDate == "Invalid Date") {
        FormattedFromDate = 'null';
    }
    else {
        FormattedFromDate = new Date(FormattedFromDate);
    }
    if(IsColValidityExists)
    {
        var ValidityToDate = moment($("#FilterValTo").val()).format("MM/DD/YYYY");;
        if (ValidityToDate == "Invalid date" || ValidityToDate == "Invalid Date") {
            ValidityToDate = 'null';
        }
        else {
            ValidityToDate = new Date(ValidityToDate);
        }
        var ValidityFromDate = moment($("#FilterValFrom").val()).format("MM/DD/YYYY");;
        if (ValidityFromDate == "Invalid date" || ValidityFromDate == "Invalid Date") {
            ValidityFromDate = 'null';
        }
        else {
            ValidityFromDate = new Date(ValidityFromDate);
        }
    }
    if(IsColEmailDateExists)
    {
        var emailToDate = moment($("#FilterEmailTo").val()).format("MM/DD/YYYY");;
        if (emailToDate == "Invalid date" || emailToDate == "Invalid Date") {
            emailToDate = 'null';
        }
        else {
            emailToDate = new Date(emailToDate);
        }
        var emailFromDate = moment($("#FilterEmailFrom").val()).format("MM/DD/YYYY");;
        if (emailFromDate == "Invalid date" || emailFromDate == "Invalid Date") {
            emailFromDate = 'null';
        }
        else {
            emailFromDate = new Date(emailFromDate);
        }
    }
    //arrSearchExt = getFileExtenson();
    var res=false;
    arrTemp = arrFilterFile.filter(function (obj, index) {

        //FileExt = obj.files.Name.substring(obj.files.Name.lastIndexOf('.') + 1).toLowerCase();
        FileExt = obj.files.Name;
        if(obj.files.ListItemAllFields != undefined){ //for other libraries
            FileFolder=obj.Type;
            if(IsColValidityExists)
            {
            dt = new Date(obj.files.ListItemAllFields.FileValidity);
            ValidityDate = new Date(moment(dt).format("MM/DD/YYYY"));
            }
            if(IsColEmailDateExists)
            {                
            dt = new Date(obj.files.ListItemAllFields.email_date);
            emailDate = new Date(moment(dt).format("MM/DD/YYYY"));
            }
            DocType = obj.files.ListItemAllFields.DocumentType;
            SubType = obj.files.ListItemAllFields.SubCategory;
            DocNo = obj.files.ListItemAllFields.DocumentNo;
            FileAuthor = obj.files.ListItemAllFields.DocumentWrittenBy;
            Permission = obj.files.ListItemAllFields.PermissionLevel;
            Approval = obj.files.ListItemAllFields.Approval;
            dt = new Date(obj.files.ListItemAllFields.Modified);
            ModifiedDate = new Date(moment(dt).format("MM/DD/YYYY"));
            if(Permission == null) {
                Permission = 'Not Shared';
            }
           
        }
        else { //For my Favorite
            IsMyfavorate = true;
            FileFolder=obj.Type;
            //dt = new Date(obj.files.FileValidity);
            //ValidityDate = new Date(moment(dt).format("MM/DD/YYYY"));
            //dt = new Date(obj.files.email_date);
            //emailDate = new Date(moment(dt).format("MM/DD/YYYY"));
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
        if (ModifiedDate == "Invalid date" || ModifiedDate == "Invalid Date") {
        ModifiedDate = 'null';
        }
        if(IsColValidityExists)
        {
         if (ValidityDate == "Invalid date" || ValidityDate == "Invalid Date") {
            ValidityDate = 'null';
         }
        }
        if(IsColEmailDateExists)
        {
            if (emailDate == "Invalid date" || emailDate == "Invalid Date") {
            emailDate = 'null';
            }
        }
        if($("#ddlFilterType").val()=="File")
        {   
            res =  (FileFolder == "File"||FileFolder == "file" ? true:false) &&
                //($("#txtFilterFileFolderName").val() != "" ? FileExt.includes($("#txtFilterFileFolderName").val()):"")&&
                 ($("#txtFilterFileFolderName").val().trim() == ""||$("#txtFilterFileFolderName").val().trim() == "null" ? FileExt!="":FileExt.toLowerCase().includes($("#txtFilterFileFolderName").val().toLowerCase()))&&
                ($("#ddlFilterDocType").val() == "All" ? DocType != "" : DocType == $("#ddlFilterDocType").val() ) &&
                ($("#ddlFilterSubType").val() == "All" ? SubType != "" : SubType == $("#ddlFilterSubType").val() ) &&
                ($("#txtFilterRefe").val().trim() == "null" ? DocNo != "null" : (DocNo.toLowerCase() == $("#txtFilterRefe").val().toLowerCase() || DocNo.toLowerCase().indexOf($("#txtFilterRefe").val().toLowerCase()) != -1)) &&
                ($("#txtFilterAuthor").val().trim() == "null" ? FileAuthor != "null" : (FileAuthor.toLowerCase() == $("#txtFilterAuthor").val().toLowerCase() || FileAuthor.toLowerCase().indexOf($("#txtFilterAuthor").val().toLowerCase()) != -1)) &&
                ($("#ddlShareFilter").val() == "All" ? Permission != "" : Permission == $("#ddlShareFilter").val() ) &&
                ($("#ddlFilterApprovl").val() == "All" ? Approval != "" : Approval == $("#ddlFilterApprovl").val() )&&
                (FormattedFromDate == "null" ? ModifiedDate != "null" : ModifiedDate >= FormattedFromDate ) &&
                (FormattedToDate == "null" ? ModifiedDate != "null" : ModifiedDate <= FormattedToDate);
                //(FormattedFromDate != "null" ? (FormattedToDate != "null" ?( ModifiedDate != "null" && ModifiedDate <= FormattedToDate && ModifiedDate >= FormattedFromDate):false):true)&&
                //(ValidityFromDate != "null" ? (ValidityToDate != "null" ? (ValidityDate != "null" && ValidityDate <= ValidityToDate && ValidityDate >= ValidityFromDate):false):true ) &&
               // (emailFromDate != "null" ?(emailToDate != "null" ?( emailDate != "null" && emailDate <= emailToDate &&emailDate >= emailFromDate):false):true );
                
               /* (ValidityFromDate == "null" ? ValidityDate != "null" : ValidityDate >= ValidityFromDate ) &&
                (ValidityToDate == "null" ? ValidityDate != "null" : ValidityDate <= ValidityToDate)&&
                (emailFromDate == "null" ? emailDate != "null" : emailDate >= emailFromDate ) &&
                (emailToDate == "null" ? emailDate != "null" : emailDate <= emailToDate);*/
                if(IsColValidityExists)
                {
                   // res= (res && (ValidityFromDate != "null" ? (ValidityToDate != "null" ? (ValidityDate != "null" && ValidityDate <= ValidityToDate && ValidityDate >= ValidityFromDate):false):true ));
                
                res= (res && (ValidityFromDate == "null" ? ValidityDate != "null" : ValidityDate >= ValidityFromDate ) &&
                (ValidityToDate == "null" ? ValidityDate != "null" : ValidityDate <= ValidityToDate));
                
                }
                if(IsColEmailDateExists)
                {
                  // res=(res && (emailFromDate != "null" ?(emailToDate != "null" ?( emailDate != "null" && emailDate <= emailToDate &&emailDate >= emailFromDate):false):true )); 
                 res= (res &&  (emailFromDate == "null" ? emailDate != "null" : emailDate >= emailFromDate ) &&
                (emailToDate == "null" ? emailDate != "null" : emailDate <= emailToDate));
                
                }
        }
        else if($("#ddlFilterType").val()=="Folder")
        {   
            res =  (FileFolder == "Folder"||FileFolder == "folder" ? true:false) &&
                ($("#txtFilterFileFolderName").val().trim() == ""||$("#txtFilterFileFolderName").val().trim() == "null" ? FileExt!="":FileExt.toLowerCase().includes($("#txtFilterFileFolderName").val().toLowerCase()))&&
                ($("#ddlFilterDocType").val() == "All" ? DocType != "" : DocType == $("#ddlFilterDocType").val() ) &&
                ($("#ddlFilterSubType").val() == "All" ? SubType != "" : SubType == $("#ddlFilterSubType").val() ) &&
                ($("#txtFilterRefe").val().trim() == "null" ? DocNo != "null" : (DocNo.toLowerCase() == $("#txtFilterRefe").val().toLowerCase() || DocNo.toLowerCase().indexOf($("#txtFilterRefe").val().toLowerCase()) != -1)) &&
                ($("#txtFilterAuthor").val().trim() == "null" ? FileAuthor != "null" : (FileAuthor.toLowerCase() == $("#txtFilterAuthor").val().toLowerCase() || FileAuthor.toLowerCase().indexOf($("#txtFilterAuthor").val().toLowerCase()) != -1)) &&
                ($("#ddlShareFilter").val() == "All" ? Permission != "" : Permission == $("#ddlShareFilter").val() ) &&
                ($("#ddlFilterApprovl").val() == "All" ? Approval != "" : Approval == $("#ddlFilterApprovl").val() ) &&
                (FormattedFromDate == "null" ? ModifiedDate != "null" : ModifiedDate >= FormattedFromDate ) &&
                (FormattedToDate == "null" ? ModifiedDate != "null" : ModifiedDate <= FormattedToDate);
                //(FormattedFromDate != "null" ? (FormattedToDate != "null" ?( ModifiedDate != "null" && ModifiedDate <= FormattedToDate && ModifiedDate >= FormattedFromDate):false):true);// &&
               // (ValidityFromDate != "null" ? (ValidityToDate != "null" ? (ValidityDate != "null" && ValidityDate <= ValidityToDate && ValidityDate >= ValidityFromDate):false):true ) &&
                //(emailFromDate != "null" ?(emailToDate != "null" ?( emailDate != "null" && emailDate <= emailToDate &&emailDate >= emailFromDate):false):true );
               if(IsColValidityExists)
                {
                 res= (res && (ValidityFromDate == "null" ? ValidityDate != "null" : ValidityDate >= ValidityFromDate ) &&
                (ValidityToDate == "null" ? ValidityDate != "null" : ValidityDate <= ValidityToDate));
                
                }
                if(IsColEmailDateExists)
                {
                 res= (res &&  (emailFromDate == "null" ? emailDate != "null" : emailDate >= emailFromDate ) &&
                (emailToDate == "null" ? emailDate != "null" : emailDate <= emailToDate));
                
                }
        }
        else if($("#ddlFilterType").val()=="All")
        {   
            res = ($("#txtFilterFileFolderName").val().trim() == ""||$("#txtFilterFileFolderName").val().trim() == "null" ? FileExt!="":FileExt.toLowerCase().includes($("#txtFilterFileFolderName").val().toLowerCase()))&&
                ($("#ddlFilterDocType").val() == "All" ? DocType != "" : DocType == $("#ddlFilterDocType").val() ) &&
                ($("#ddlFilterSubType").val() == "All" ? SubType != "" : SubType == $("#ddlFilterSubType").val() ) &&
                ($("#txtFilterRefe").val().trim() == "null" ? DocNo != "null" : (DocNo.toLowerCase() == $("#txtFilterRefe").val().toLowerCase() || DocNo.toLowerCase().indexOf($("#txtFilterRefe").val().toLowerCase()) != -1)) &&
                ($("#txtFilterAuthor").val().trim() == "null" ? FileAuthor != "null" : (FileAuthor.toLowerCase() == $("#txtFilterAuthor").val().toLowerCase() || FileAuthor.toLowerCase().indexOf($("#txtFilterAuthor").val().toLowerCase()) != -1)) &&
                ($("#ddlShareFilter").val() == "All" ? Permission != "" : Permission == $("#ddlShareFilter").val() ) &&
                ($("#ddlFilterApprovl").val() == "All" ? Approval != "" : Approval == $("#ddlFilterApprovl").val() ) &&
                (FormattedFromDate == "null" ? ModifiedDate != "null" : ModifiedDate >= FormattedFromDate ) &&
                (FormattedToDate == "null" ? ModifiedDate != "null" : ModifiedDate <= FormattedToDate);
                //(FormattedFromDate != "null" ? (FormattedToDate != "null" ?( ModifiedDate != "null" && ModifiedDate <= FormattedToDate && ModifiedDate >= FormattedFromDate):false):true);// &&
                //(ValidityFromDate != "null" ? (ValidityToDate != "null" ? (ValidityDate != "null" && ValidityDate <= ValidityToDate && ValidityDate >= ValidityFromDate):false):true ) &&
                //(emailFromDate != "null" ?(emailToDate != "null" ?( emailDate != "null" && emailDate <= emailToDate &&emailDate >= emailFromDate):false):true );
                if(IsColValidityExists)
                {
                res= (res && (ValidityFromDate == "null" ? ValidityDate != "null" : ValidityDate >= ValidityFromDate ) &&
                (ValidityToDate == "null" ? ValidityDate != "null" : ValidityDate <= ValidityToDate));
                
                }
                if(IsColEmailDateExists)
                {
                     res= (res &&  (emailFromDate == "null" ? emailDate != "null" : emailDate >= emailFromDate ) &&
                (emailToDate == "null" ? emailDate != "null" : emailDate <= emailToDate));
                
                }
        }
        return  res;
       
    }); 
    
    $("#generateBradCumbNew").hide();
    $("#generateBradCumbSearchResults").show();
    $("#generateBradCumbSearchResults").empty();
    $("#divNew").hide();
    $("#divUpload").hide();
    $("#liEmails").hide();
    $("#generateBradCumbSearchResults").append("<li>Search Results...</li>");
    $("#groupDocumentGridtbody").empty();
    if(arrTemp.length == 0){
        $("#groupDocumentGridtbody").append('<tr><td colspan="12" style="text-align:center;">No record found!</td></tr>');
        waitingDialog.hide();
        Tableagination();//03 April 23
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
                    ServerURL: decodeURIComponent(Properties[1].trim()),
                    DocumentId: Properties[2].trim(),
                    SiteURL: Properties[3].trim(),
                    SelectedLibrary: Properties[4].trim(),
                    FileFolderName: decodeURIComponent(Properties[5].trim()),
                    CopyFileLink: decodeURIComponent(Properties[6].trim()),
                    FileTitle: Properties[7].trim(),
                    FileRef: Properties[8].trim(),
                    FileType: Properties[9].trim(),
                    DocType: Properties[10].trim(),
                    fileFilderInheritance: $(this).data('inherit'),
                    SubCategory: Properties[11].trim()
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

function LibraryFilter_Old() {
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
        $("#groupDocumentGridtbody").append('<tr><td colspan="12" style="text-align:center;">No result found!</td></tr>');
        waitingDialog.hide();
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
    if($("#FileTypeList").val() == "Word"){
        SearchValue = ["doc", "docx"];
        return SearchValue;
    }
    else if($("#FileTypeList").val() == "Excel"){
        SearchValue = ["xlsx", "xlsm", "csv", "xls"];
        return SearchValue;
    }
    else if($("#FileTypeList").val() == "PowerPoint"){
        SearchValue = ["pptx", "pptm", "ppt", "ppsm"];
        return SearchValue ;
    }
    else if($("#FileTypeList").val() == "Text"){
        SearchValue = ["txt"];
        return SearchValue ;
    }
    else if($("#FileTypeList").val() == "PDF"){
        SearchValue = ["pdf", "ps"];
        return SearchValue ;
    }
    else if($("#FileTypeList").val() == "Image"){
        SearchValue = ["png", "jpeg", "jpg", "gif", "tiff", "raw", "psd"];
        return SearchValue ;
    }
    else if($("#FileTypeList").val() == "Video"){
        SearchValue = ["mp4", "mp3", "wmv", "avi", "mkv", "avchd", "webcam"];
        return SearchValue;
    }
    else if($("#FileTypeList").val() == "HTML"){
        SearchValue = ["html", "htm"];
        return SearchValue ;
    }
    else if($("#FileTypeList").val() == "Zip"){
        SearchValue = ["rar", "xml", "zip"];
        return SearchValue ;
    }
    else {
        SearchValue.push('All');
        return SearchValue;
    }
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
    //$("#FilterValFrom").val('');
    //$("#FilterValTo").val('');
    //$("#FilterEmailFrom").val('');
    //$("#FilterEmailTo").val('');
    $("#ddlFilterType").val('All');
    $("#txtFilterFileFolderName").val('');
    
}
 function removeFilteredData()
 { 
        var Section = currentSectionType;
        if (Section == 'MyFavorite') {
            waitingDialog.show();
            setTimeout(function () {
                $("#liFavoriteDocuments").trigger("click");
                //ActionBtnControls();
               MyFavoriteDocument();
            }, 100);
             waitingDialog.hide();
        }
        else if (Section == 'My Documents') {
            waitingDialog.show();
            setTimeout(function () {
                $("#toggleMyDocBox").trigger("click");
                //ActionBtnControls();
                GetLibrayDetails();
                flagFilterClear=false;
            }, 100);
             waitingDialog.hide();
        }
        else if (Section == 'Department') {
            setTimeout(function () {
                //$("#toggleDeptBox").trigger("click");
                waitingDialog.show();
                setTimeout(function () {
                    $("#" + currentSectionId).trigger('click'); 
                    flagFilterClear=false;                   
                }, 2000);
               
            }, 1000);
             waitingDialog.hide();
        }
        else if (Section == 'Group Documents') {
            setTimeout(function () {
                //$("#toggleGpBox").trigger("click");
                waitingDialog.show();
                MyDocumentEnv();
                setTimeout(function () {
                    $("#" + currentSectionId).trigger('click');
                    flagFilterClear=false;                    
                }, 2000);                
            }, 1000);
             waitingDialog.hide();
        }
        else if (Section == 'ProjectDocuments') {
            setTimeout(function () {
                //$("#toggleProjBox").trigger("click");
                 waitingDialog.show();
                setTimeout(function () {
                    $("#" + currentSectionId).trigger('click');
                    flagFilterClear=false;
                }, 2000);
                
            }, 1000);
            waitingDialog.hide();
        }
        else if (Section == 'GuestDocuments') {
            setTimeout(function () {
                //$("#toggleGuestBox").trigger("click");
                waitingDialog.show();
                setTimeout(function () {
                    $("#" + currentSectionId).trigger('click');
                    flagFilterClear=false;
                    
                }, 2000);
                
            }, 1000);
            waitingDialog.hide();
        }
        $('.chkFileFolder').prop("checked", "");
        arrFileFolder = []; arrPermission = [];  
          
}
 


//-----------------------------------------------------------------------Shared Documents with Guest code starts-----------------------------------------------------------------------
function getSharedGuestDocs() {
    //Geenrating the THead of table
    $("#ListSharedGuestNav").empty();
    arrFileFolder = [];
    $("#SharedDocTable").empty().html('<table class="table mb-0 custom-table" id="SharedDocGrid"><thead><tr id="theadItemGuest"></tr></thead><tbody id="SharedDocGridtbody"></tbody></table>');
    var ColumnName = "";
    var sharedWitgGuestTR = '';
    ColumnName += '<th class="text-center border-bottom-0 w-2">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="GuestAllChk" value=""></label>' +
        '</th>';
    $("#theadItemGuest").empty();
    var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
    for (var i = 0; i < SharedMeColNames.length; i++) {
        ColumnName += '<th data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</th>';
    }
    $("#theadItemGuest").append(ColumnName);

    var arrGuestData = getcurrentGuestGp();
    if(arrGuestData[0].GroupId != undefined) {
        var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(SharedUsers/Id eq '" + arrGuestData[0].GroupId + "' and (PermissionType eq 'Read' or PermissionType eq 'Contribute' or PermissionType eq 'Restricted View') and (PermissionStatus ne 'Deleted' and PermissionStatus ne 'Revoked'))";
        $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
            arrSharedGuest = items.filter(function (f) { return f; });
            if (items.length > 0) {
                SharedToGuestItems(items);
                $("#sharedocuments").modal('show');
                $(".chkShareToMe").click(function () {
                    var Properties = this.value.split(',');
                    if (this.checked == true) {
                        arrFileFolder.push({
                            SharedItemId: Properties[0].trim(),
                            type: Properties[1].trim(),
                            SharedTo: Properties[2].trim(),
                            DocumentId: Properties[3].trim(),
                            ServerURL: Properties[4].trim(),
                            userOrgId: Properties[5].trim(),
                            SiteURL: Properties[6].trim(),
                            IsBlock: Properties[7].trim()
                        });
                    }
                    else {
                        var selected = this.value;
                        arrFileFolder = arrFileFolder.filter(function (obj) {
                            return obj.SharedItemId != Properties[0].trim();
                        });
                    }
                });
                $("#GuestAllChk").click(function (e) {
                    waitingDialog.show();
                    if (this.checked == true) {
                        $('.chkShareToMe').prop("checked", "");
                        $('.chkShareToMe').trigger('click');
                    }
                    else {
                        $('.chkShareToMe').prop("checked", "");
                        arrFileFolder = [];
                    }
                    waitingDialog.hide();
                });
                waitingDialog.hide();
            }
            else {
                waitingDialog.hide();
                sharedWitgGuestTR += '<tr><td colspan="12" style="text-align:center;">No file or folder found.</td></tr>';
                $("#SharedDocGridtbody").empty().append(sharedWitgGuestTR);
                $("#sharedocuments").modal('show');
            }
            ChangeLabels();
        });
    }
    else {
        waitingDialog.hide();
        sharedWitgGuestTR += '<tr><td colspan="12" style="text-align:center;">No file or folder found.</td></tr>';
        $("#SharedDocGridtbody").empty().append(sharedWitgGuestTR);
        $("#sharedocuments").modal('show');
    }
}


//Bind Guest Portals Data - Shared_Documents
function SharedToGuestItems(array) {
    arrFileFolder = [];
    var LoggedUserSPGp = [],
        arrDuplicateFile = [],
        arrRevoked = [],
        IsEveryone = [],
        ActionHTML = '',
        PermissionStatus = 'Single',
        items = [],
        HistoryAction = "PageLoad";
    var sharedWithMeTR = '';
    for (var i = 0; i < array.length; i++) {
        array[i].IsBlock = "No";
        PermissionStatus = 'Single';
        var documentLink = "";
        var splitDocTypeLink = "";
        var downloadlink = "";
        if (jQuery.inArray(array[i].DocumentID, arrDuplicateFile) == '-1') {
            arrDuplicateFile.push(array[i].DocumentID);
            items = array.filter(function (obj) { //filter the array file-wise
                return obj.DocumentID == array[i].DocumentID;
            });
            var Title = items[0].Title;
            if (items.length > 1) {
                PermissionStatus = "Multiple";
            }
            //to check if all the permission status are revoked --------
            arrRevoked = items.filter(function (obj) { //filter the array file-wise
                return obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "Deleted";
            });
            if (arrRevoked.length == 0) {
                PermissionStatus = "All revoked";
            }

            //----------------------------------------------------------
            var DocumentNo = items[0].DOC_ID.DocumentNo ? items[0].DOC_ID.DocumentNo : "";
            var sharedBy = items[0].Author.Title;
            var DocumentType = items[0].DocumentType ? items[0].DocumentType : "";
            var Details = items[0].Details ? items[0].Details : "";
            var sourceDocType = items[0].DOC_ID.DocumentType ? items[0].DOC_ID.DocumentType : "";
            if (sourceDocType == "--select--" || sourceDocType == "-Select-") {
                sourceDocType = '';
            }
            var SourceDocTitle = items[0].DOC_ID.Title ? items[0].DOC_ID.Title : "";
            var FileServerRelativeUrl = items[0].ServerRedirectedEmbedURL;
            if (FileServerRelativeUrl == null || FileServerRelativeUrl == "") {
                FileServerRelativeUrl = items[0].DocumentURL;
            }
            FileServerRelativeUrl = FileServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
            var FileExtension = "." + Title.substring(Title.lastIndexOf('.') + 1);
            sharedFrom = getSharedFromValue(items[0].SharedType, items[0].SharedFrom);
            if (DocumentType.toLowerCase() != "folder") {
                Icon = "file.png";
                if (".docx" == FileExtension || ".doc" == FileExtension) {
                    Icon = "docx.png";
                } else if (".pdf" == FileExtension) {
                    Icon = "pdf.png";
                } else if (".jpg" == FileExtension || ".psd" == FileExtension || ".tiff" == FileExtension || ".gif" == FileExtension || ".bmp" == FileExtension || ".jpeg" == FileExtension || ".png" == FileExtension) {
                    Icon = "image-icon.png";
                } else if (".xlsx" == FileExtension) {
                    Icon = "xlsx.png";
                } else if (".pptx" == FileExtension) {
                    Icon = "pptx.png";
                } else if (".txt" == FileExtension) {
                    Icon = "txt.png";
                } else if (".csv" == FileExtension) {
                    Icon = "CSV.png";
                } else if (".zip" == FileExtension || ".rar" == FileExtension || ".7z" == FileExtension || ".arz" == FileExtension || ".cab" == FileExtension || ".rpm" == FileExtension || ".wim" == FileExtension) {
                    Icon = "ZIP.png";
                } else if (".mp4" == FileExtension || ".wmv" == FileExtension || ".avi" == FileExtension || ".mpeg" == FileExtension || ".flv" == FileExtension || ".mov" == FileExtension || ".wav" == FileExtension || ".ogv" == FileExtension) {
                    Icon = "video-files.png";
                } else if (".mp3" == FileExtension || ".wma" == FileExtension || ".aac" == FileExtension || ".pcm" == FileExtension) {
                    Icon = "audio.png";
                }
                    else if (".EML" == FileExtension || ".eml" == FileExtension) {
                    Icon = "eml.png";
                }
                var SiteURL = '';
                if (items[0].SharedType == null || items[0].SharedType == "Personal" || items[0].SharedType == "My-DMS") {
                    DMS_Type = "My Documents";
                }
                else {
                    DMS_Type = items[0].SharedType + ': ' + items[0].SharedFrom;
                }
                if (items[0].SiteURL == "null" || items[0].SiteURL == null || items[0].SiteURL == "undefined" || items[0].SiteURL == undefined) {
                    if (encodeURI(items[0].DocumentURL).indexOf("DepartmentalDMS") != -1) {
                        SiteURL = window.location.origin + encodeURI(items[0].DocumentURL).split('DepartmentalDMS')[0];
                    }
                    else {
                        SiteURL = _spPageContextInfo.webAbsoluteUrl;
                    }
                }
                else {
                    SiteURL = items[0].SiteURL;
                }
                var NullValue = 'NullValue';
                documentLink = '<a href="javascript:void(0);" data-FileServerRelativeUrl="' + NullValue + '" name="' + items[0].DocumentURL + '" rel="' + items[0].Id + '" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + DMS_Type + '\', \'' + PermissionStatus + '\', \'' + NullValue + '\', \'' + items[0].DocumentURL + '\', \'' + items[0].Id + '\', \'' + NullValue + '\', \'' + NullValue + '\');">' + Title + '</a>';
                downloadlink = "<a href='" + encodeURI(items[0].DocumentURL) + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
            }
            else {
                Icon = "folder.png";
                var LibraryType = '';
                if (items[0].SharedType == null || items[0].SharedType == "Personal" || items[0].SharedType == "My-DMS") {
                    LibraryType = "My Documents";
                }
                else {
                    LibraryType = items[0].SharedType + ': ' + items[0].SharedFrom;
                }
                var tempStatus = PermissionStatus;
                if (PermissionStatus == 'All revoked') {
                    tempStatus = "Revoked";
                }
                RunBreadCrumb = true;
                documentLink += '<a href="javascript:void(0);" rel="' + items[0].Id + '" onclick="GetGuestSharedDocuments(this, \'' + encodeURI(items[0].DocumentURL) + '\', \'' + array[i].PermissionType + '\', \'' + items[0].SiteURL + '\', \'' + items[0].LibraryName + '\', \'' + items[0].Title + '\', \'' + DocumentNo + '\', \'' + sourceDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + items[0].IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\');" class="doc_icon">' + Title + '</a>';
                SourceDocTitle = Title;   //Title For Folder
                sourceDocType = "Folder";
            }
            if (PermissionStatus == "All revoked") {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" id ="ShareToMe' + i + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + i + '">';
            }
            else {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[0].Id + ', ' + items[0].DocumentType + ', ' + items[0].SharedGroup + ', ' + items[0].DocumentID + ', ' + items[0].DocumentURL + ', ' + items[0].SharedUsers.results[0].ID + ', ' + items[0].SiteURL + ', ' + items[0].IsBlock + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
            }
            //check if any time file/folder shared to 'Everyone'
            if (PermissionStatus != "All revoked") {
                IsEveryone = items.filter(function (obj) { //filter the array file-wise
                    return obj.SharedGroup == "Everyone" && (obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "Deleted");
                });
                var temparray = items.filter(function (obj) { //filter the array file-wise
                    return (obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "Deleted");
                });
                if (IsEveryone.length > 0 && IsEveryone.length == temparray.length) {
                    ActionHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')">';
                }
                else {
                    if (IsEveryone.length > 0 && IsEveryone.length != items.length) {
                        ActionHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[0].Id + '\')">';
                    }
                    else {
                        ActionHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')">';
                    }
                }
            }
            else {
                ActionHTML = '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')">';
            }
            sharedWithMeTR += '<img width="30px" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
            sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
            items[0].DOC_ID.Title = items[0].DOC_ID.Title ? items[0].DOC_ID.Title : "";
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[0].DOC_ID.Title + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + array[i].PermissionType + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="ShareAction">' + ActionHTML + '</div></td></tr>';
        }
    }
    if (SharedGuestTable != '') {
        SharedGuestTable.destroy();
    }
    $("#SharedDocGridtbody").empty().append(sharedWithMeTR);
    TableSharedGuestPagination();
}

//method for pagination of Shared-Documents Guest
function TableSharedGuestPagination() {
    SharedGuestTable = $('#SharedDocGrid').DataTable({
        'columnDefs': [{ 'orderable': false, 'targets': 0 }], // hide sort icon on header of first column
        "bPaginate": true,
        "bJQueryUI": true, // ThemeRoller-stöd
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
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
    $("#SharedDocGrid_filter").hide();
    $('#GuestSearchText').keyup(function () {
        SharedGuestTable.search($(this).val()).draw();
    });
    $('#SharedDocGrid').on( 'page.dt', function () {
        $('.chkFileFolder').prop("checked", "");
        $('.chkShareToMe').prop("checked", "");
        arrFileFolder = [];
        $("#selectAllChk").prop("checked", "");
    });
}

//function to get the SP group details of selected Guest
function getcurrentGuestGp() {
    var tempGuest = [];
    var Query = "?$select=Id,Title,IsActive,GroupName/Id,GroupName/Title,DocumentLibrary,CompanyID/Id,DocumentLibrary,InternalMembers/EMail,InternalSupervisor/EMail&$orderby=Title asc&$expand=GroupName,CompanyID,InternalMembers,InternalSupervisor&$top=5000&$filter=Title eq '" + $(".headdingLinks").text() + "' ";
    $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Clients) {
        if (Clients.length > 0) {
            var value = Clients[0];
            tempGuest.push({
                GroupId: value.GroupName.Id,
                GroupName: value.GroupName.Title
            });
        }
    });
    return tempGuest;
}

//to filter Shared Documents-Guest
function SharedGuestFilter() {
    //Geenrating the THead of table
    arrFileFolder = [];
    var LoggedUserSPGp = [];
    var ColumnName = "";
    $("#ListSharedGuestNav").empty();
    $("#SharedDocTable").empty().html('<table class="table mb-0 custom-table" id="SharedDocGrid"><thead><tr id="theadItemGuest"></tr></thead><tbody id="SharedDocGridtbody"></tbody></table>');
    ColumnName += '<th class="text-center border-bottom-0 w-2">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="GuestAllChk" value=""></label>' +
        '</th>';
    $("#theadItemGuest").empty();
    var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
    for (var i = 0; i < SharedMeColNames.length; i++) {
        ColumnName += '<th data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</th>';
    }
    $("#theadItemGuest").append(ColumnName);
    LoggedUserSPGp = GetSPGroup();

    var assigntoQuery = '';
    items = arrSharedGuest.filter(function (f) { return f; });
    var FilterShareById = getUserInformation("pplSharedBy");
    var StringShareQuery = [];
    items = items.filter(function (obj, index) {
        if ($("#pplSharedBy_TopSpan_ResolvedList").text() != "") {
            for (var i = 0; i < FilterShareById.length; i++) {
                if (i == 0) {
                    StringShareQuery.push(obj.Author.ID == FilterShareById[i]);
                }
                else {
                    StringShareQuery.push(obj.Author.ID == FilterShareById[i]);
                }
            }
        }
        else {
            var assigntobyme = [];
            StringShareQuery.push(true);
        }

        StringShareQuery.forEach(function (entry, index) {
            if (index == 0) {
                assigntoQuery = entry;
            }
            else {
                assigntoQuery = entry || assigntoQuery;
            }
        });
        StringShareQuery = [];
        if (obj.DocumentNo == null || obj.DocumentNo == '') {
            obj.DocumentNo = "null";
        }
        return ($("#FilterShareType").val() == "All" ? obj.PermissionType != "" : obj.PermissionType == $("#FilterShareType").val()) &&
                (assigntoQuery) &&
                ($("#ShareFilterRef").val().trim() == "null" ? obj.DocumentNo != "null" : (obj.DocumentNo.toLowerCase() == $("#ShareFilterRef").val().toLowerCase() || obj.DocumentNo.toLowerCase().indexOf($("#ShareFilterRef").val().toLowerCase()) != -1))
                && ($("#FilterShareDocType").val() == "All" ? obj.DocType != "" : obj.DocType == $("#FilterShareDocType").val());

    });

    var sharedWithGuestTR = "";
    if (items.length) {
        SharedToGuestItems(items);
        $(".chkShareToMe").click(function () {
            var Properties = this.value.split(',');
            if (this.checked == true) {
                arrFileFolder.push({
                    SharedItemId: Properties[0].trim(),
                    type: Properties[1].trim(),
                    SharedTo: Properties[2].trim(),
                    DocumentId: Properties[3].trim(),
                    ServerURL: Properties[4].trim(),
                    userOrgId: Properties[5].trim(),
                    SiteURL: Properties[6].trim()
                });
            }
            else {
                var selected = this.value;
                arrFileFolder = arrFileFolder.filter(function (obj) {
                    return obj.SharedItemId != Properties[0].trim();
                });
            }
        });
        $("#selectAllChk").click(function (e) {
            waitingDialog.show();
            if (this.checked == true) {
                $('.chkShareToMe').prop("checked", "");
                $('.chkShareToMe').trigger('click');
            }
            else {
                $('.chkShareToMe').prop("checked", "");
                arrFileFolder = [];
            }
            waitingDialog.hide();
        });
        waitingDialog.hide();
    }
    else {
        waitingDialog.hide();
        sharedWithGuestTR += '<tr><td colspan="12" style="text-align:center;">No file or folder found.</td></tr>';
        $("#SharedDocGridtbody").empty().append(sharedWithGuestTR);
    }
    ChangeLabels();
    $("#shared-documents-filter").modal('hide');
}

//to download file and folder in Guests documents
function GuestDocDownload() {
    var arrTempFolder = [];
    var FolderSiteURL = [];
    if (arrFileFolder.length > 0) {
        for (var index = 0; index < arrFileFolder.length; index++) {
            var url = arrFileFolder[index].ServerURL;
            if (arrFileFolder[index].type == 'file') {
                var a = document.createElement("a");
                a.setAttribute('href', url);
                a.setAttribute('download', '');
                a.setAttribute('target', '_blank');
                a.click();
            }
            else {
                FolderSiteURL = arrFileFolder[index].SiteURL;
                if (arrFileFolder[index].ServerURL.includes('Documents') == true && arrFileFolder[index].ServerURL != 'Shared%20Documents/' && arrFileFolder[index].ServerURL.indexOf("Shared Documents") == -1) {
                    arrFileFolder[index].ServerURL = arrFileFolder[index].ServerURL.replace('Documents', 'Shared Documents');
                }
                var Ownurl = arrFileFolder[index].SiteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + arrFileFolder[index].ServerURL + "')?$select=ID,EncodedAbsUrl,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields";
                $.ajax({
                    url: Ownurl,
                    headers: { Accept: "application/json;odata=verbose" },
                    async: true,
                    success: function (data) {
                        var files = data.d.Files.results;
                        for (var file = 0; file < files.length; file++) {
                            var a = document.createElement("a");
                            a.setAttribute('href', files[file].ServerRelativeUrl);
                            a.setAttribute('download', '');
                            a.setAttribute('target', '_blank');
                            a.click();
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
                $(".chkShareToMe").prop("checked", false);
                arrFileFolder = [];
            }
        }
    }
    else {
        alert("Please select any file or folder first.");
        return false;
    }
}
//Get all the sub-File/Folder shared with me
function GetGuestSharedDocuments(Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation) {
    var ChkCount = 1;
    arrFileFolder = [];
    $("#SharedDocTable").empty().html('<table class="table mb-0 custom-table" id="SharedDocGrid"><thead><tr id="theadItemGuest"></tr></thead><tbody id="SharedDocGridtbody"></tbody></table>');
    var ColumnName = "";
    ColumnName += '<th class="text-center border-bottom-0 w-2">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="GuestAllChk" value=""></label>' +
        '</th>';
    $("#theadItemGuest").empty();
    var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
    for (var i = 0; i < SharedMeColNames.length; i++) {
        ColumnName += '<th data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</th>';
    }
    $("#theadItemGuest").append(ColumnName);
    if (SiteURL == "null" || SiteURL == null || SiteURL == "undefined" || SiteURL == undefined) {
        if (folderUrl.indexOf("DepartmentalDMS") != -1) {
            SiteURL = window.location.origin + folderUrl.split('DepartmentalDMS')[0];
        }
        else {
            SiteURL = _spPageContextInfo.webAbsoluteUrl;
        }
    }
    var documentLink = '';
    var sharedWithMeTR = '';
    var Ownurl = SiteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + folderUrl + "')?$select=ID,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$orderby=Modified desc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var files = data.d.Files.results;
            var folders = data.d.Folders.results;
            if (files.length == 0 && folders.length == 0) {
                waitingDialog.hide();
                sharedWithMeTR += '<tr><td colspan="12" style="text-align:center;">No file or folder found.</td></tr>';
                $("#SharedDocGridtbody").empty().append(sharedWithMeTR);
            }
            else {
                for (var i = 0; i < folders.length; i++) {
                    Icon = "folder.png";
                    var SubfolderUrl = folderUrl + '/' + folders[i].Name;
                    var RunBreadCrumb = true;
                    var BlankValueParam = '';
                    FileType = "folder";
                    documentLink = '<a href="javascript:void(0);" rel="' + Action.rel + '" onclick="GetGuestSharedDocuments(this, \'' + SubfolderUrl + '\', \'' + PermissionType + '\', \'' + SiteURL + '\', \'' + LibraryName + '\', \'' + ItemTitle + '\', \'' + ItemRef + '\', \'' + ItemDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\')" class="doc_icon">' + folders[i].Name + '</a>';
                    var IsBlockHTML = '<td class="dwnld_cell" style="text-align:center"></td>';
                    if (IsBlock == "Yes") {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '" value="' + folders[i].ListItemAllFields.Id + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + folders[i].ServerRelativeUrl + ', ' + BlankValueParam + ', ' + SiteURL + ', ' + IsBlock + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + ChkCount + '">';
                    }
                    else {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '" value="' + folders[i].ListItemAllFields.Id + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + folders[i].ServerRelativeUrl + ', ' + BlankValueParam + ', ' + SiteURL + ', ' + IsBlock + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe"><label for="ShareToMe' + ChkCount + '">';
                    }
                    ChkCount++;
                    sharedWithMeTR += '<img width="30px" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                    sharedWithMeTR += '<td class="text-left">' + documentLink + '';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemTitle + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemRef + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">Folder</div></td>';
                    if ($(".headdingLinks").text() != 'Shared by Me') {
                        sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                    }
                    else {
                        //sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2"></div></td>';
                    }
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionType + '</div></td>';
                    sharedWithMeTR += IsBlockHTML + '</tr>';
                }
                for (var i = 0; i < files.length; i++) {
                    var FileExtension = "." + files[i].Name.substring(files[i].Name.lastIndexOf('.') + 1);
                    Icon = "file.png";
                    if (".docx" == FileExtension || ".doc" == FileExtension) {
                        Icon = "docx.png";
                    } else if (".pdf" == FileExtension) {
                        Icon = "pdf.png";
                    } else if (".jpg" == FileExtension || ".psd" == FileExtension || ".tiff" == FileExtension || ".gif" == FileExtension || ".bmp" == FileExtension || ".jpeg" == FileExtension || ".png" == FileExtension) {
                        Icon = "image-icon.png";
                    } else if (".xlsx" == FileExtension) {
                        Icon = "xlsx.png";
                    } else if (".pptx" == FileExtension) {
                        Icon = "pptx.png";
                    } else if (".txt" == FileExtension) {
                        Icon = "txt.png";
                    } else if (".csv" == FileExtension) {
                        Icon = "CSV.png";
                    } else if (".zip" == FileExtension || ".rar" == FileExtension || ".7z" == FileExtension || ".arz" == FileExtension || ".cab" == FileExtension || ".rpm" == FileExtension || ".wim" == FileExtension) {
                        Icon = "ZIP.png";
                    } else if (".mp4" == FileExtension || ".wmv" == FileExtension || ".avi" == FileExtension || ".mpeg" == FileExtension || ".flv" == FileExtension || ".mov" == FileExtension || ".wav" == FileExtension || ".ogv" == FileExtension) {
                        Icon = "video-files.png";
                    } else if (".mp3" == FileExtension || ".wma" == FileExtension || ".aac" == FileExtension || ".pcm" == FileExtension) {
                        Icon = "audio.png";
                    }
                    else if (".EML" == FileExtension || ".eml" == FileExtension) {
                    Icon = "eml.png";
                    }
                    NullValue = "NullValue";
                    documentLink = '<a href="javascript:void(0);" name="' + files[i].ServerRelativeUrl + '" rel="" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + LibraryType + '\', \'' + PermissionType + '\', \'' + NullValue + '\', \'' + files[i].ServerRelativeUrl + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + NullValue + '\');">' + files[i].Name + '</a>';
                    downloadlink = "<a href='" + encodeURI(files[i].ServerRelativeUrl) + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
                    var IsBlockHTML = '<td class="dwnld_cell" style="text-align:center"></td>';
                    var BlankValueParam = '';
                    FileType = "file";
                    if (IsBlock == "Yes") {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '"  value="' + BlankValueParam + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + encodeURI(files[i].ServerRelativeUrl) + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + IsBlock + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + ChkCount + '">';
                    }
                    else {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '"  value="' + BlankValueParam + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + encodeURI(files[i].ServerRelativeUrl) + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + IsBlock + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe"><label for="ShareToMe' + ChkCount + '">';
                    }
                    ChkCount++;
                    sharedWithMeTR += '<img width="30px" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                    sharedWithMeTR += '<td class="text-left">' + documentLink + '';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemTitle + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemRef + '</div></td>';
                    if (files[i].ListItemAllFields.DocumentType == null || files[i].ListItemAllFields.DocumentType == undefined || files[i].ListItemAllFields.DocumentType == "null" || files[i].ListItemAllFields.DocumentType == "--select--" || files[i].ListItemAllFields.DocumentType == "-Select-") {
                        files[i].ListItemAllFields.DocumentType = '';
                    }
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + files[i].ListItemAllFields.DocumentType+ '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionType + '</div></td>';
                    sharedWithMeTR += IsBlockHTML + '</tr>';

                }
                if (SharedGuestTable != '') {
                    SharedGuestTable.destroy();
                }
                $("#SharedDocGridtbody").empty().append(sharedWithMeTR);
                TableSharedGuestPagination();
                ChangeLabels();
                $(".chkShareToMe").click(function () {
                    var Properties = this.value.split(',');
                    if (this.checked == true) {
                        arrFileFolder.push({
                            SharedItemId: Properties[0].trim(),
                            type: Properties[1].trim(),
                            SharedTo: Properties[2].trim(),
                            DocumentId: Properties[3].trim(),
                            ServerURL: Properties[4].trim(),
                            userOrgId: Properties[5].trim(),
                            SiteURL: Properties[6].trim(),
                            IsBlock: Properties[7].trim()
                        });
                    }
                    else {
                        var selected = this.value;
                        arrFileFolder = arrFileFolder.filter(function (obj) {
                            return obj.SharedItemId != Properties[0].trim();
                        });
                    }
                });
                $("#selectAllChk").click(function (e) {
                    waitingDialog.show();
                    if (this.checked == true) {
                        $('.chkShareToMe').prop("checked", "");
                        $('.chkShareToMe').trigger('click');
                    }
                    else {
                        $('.chkShareToMe').prop("checked", "");
                        arrFileFolder = [];
                    }
                    waitingDialog.hide();
                });
                waitingDialog.hide();
            }
        }, eror: function (error) {
            alert(JSON.stringify(error));
            waitingDialog.hide();
        }
    });
    if (RunNavigation == true || RunNavigation == "true") {
        $("#generateBradCumbNew").empty();
        CheckLibary = LibraryName;
        GetSubShareGuestFolders(folderUrl, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, false);
    }
}

//get sub-folder/files for Shared Documents/folder
function GetSubShareGuestFolders(subFolderlLink, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation) {
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
    ShareFolderNavigGuest(surFoldersArray, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation);
}

//code for Folder-Navigation for Shared Documents/folder
function ShareFolderNavigGuest(surFoldersArray, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation) {
    var braCummHtml = "";
    var targetServerRaltiveUrl = "";
    if (DMS_Type == "My Documents") {
        for (var index = 0; index < surFoldersArray.length; index++) {
            if (index != 0) {
                var TempfolderUrl = folderUrl.substr(0, folderUrl.lastIndexOf("/"));
                var targetUrl = "javascript:GetGuestSharedDocuments('" + Action + "', '" + TempfolderUrl + "', '" + PermissionType + "', '" + SiteURL + "', '" + LibraryName + "', '" + ItemTitle + "', '" + ItemRef + "', '" + ItemDocType + "', '" + sharedBy + "', '" + sharedFrom + "', '" + IsBlock + "', '" + LibraryType + "', '" + RunNavigation + "')";
                if (index == 1) {
                    braCummHtml += '<li title="Root" class="mybradcumbGuest first"><a href="javascript:void(0);" onclick="getSharedGuestDocs();">Root</a></li>';
                } else {
                    var subfolderLengthCheck = surFoldersArray[index].folderName;
                    if (subfolderLengthCheck.length > 15) {
                        subfolderLengthCheck = subfolderLengthCheck.substring(0, 14) + "...";
                    }

                    if (subfolderLengthCheck.length > 0) {
                        braCummHtml += '<li title="' + surFoldersArray[index].folderName + '" class="mybradcumbGuest first"><a href="' + targetUrl + '">' + subfolderLengthCheck + '</a></li>';
                    }
                }
                if (index == surFoldersArray.length - 1) {
                    targetServerRaltiveUrl = surFoldersArray[index].folderUrl;
                }
            }
        }
    } else {
        for (var index = 0; index < surFoldersArray.length; index++) {
            //if (index != 0)
            {
                var TempfolderUrl = folderUrl.substr(0, folderUrl.lastIndexOf("/"));
                var targetUrl = "javascript:GetGuestSharedDocuments('" + Action + "', '" + TempfolderUrl + "', '" + PermissionType + "', '" + SiteURL + "', '" + LibraryName + "', '" + ItemTitle + "', '" + ItemRef + "', '" + ItemDocType + "', '" + sharedBy + "', '" + sharedFrom + "', '" + IsBlock + "', '" + LibraryType + "', '" + RunNavigation + "')";
                if (index == 0) {
                    braCummHtml += '<li title="Root" class="mybradcumbGuest first"><a href="javascript:void(0);" onclick="getSharedGuestDocs();">Root</a></li>';
                } else {
                    var subfolderLengthCheck = surFoldersArray[index].folderName;
                    if (subfolderLengthCheck.length > 15) {
                        subfolderLengthCheck = subfolderLengthCheck.substring(0, 14) + "...";
                    }

                    if (subfolderLengthCheck.length > 0) {
                        braCummHtml += '<li title="' + surFoldersArray[index].folderName + '" class="mybradcumbGuest first"><a href="' + targetUrl + '">' + subfolderLengthCheck + '</a></li>';
                    }
                }
                if (index == surFoldersArray.length - 1) {
                    targetServerRaltiveUrl = surFoldersArray[index].folderUrl;
                }
            }
        }
    }

    var bradCumDiv = $("#ListSharedGuestNav");
    bradCumDiv.html("");
    bradCumDiv.append(braCummHtml);
    $(".mybradcumbGuest ").unbind().click(function () {
        $(this).nextAll().remove(".mybradcumbGuest ");
        //Create Cookies for Target Folder
    });
}

//-----------------------------------------------------------------------Shared Documents with Guest code ends-----------------------------------------------------------------------

//To archive multiple files and folders
function AddToArchive() {
    var arrTempFolder = [];
    arrTempFolder = arrFileFolder.filter(function (obj) {
        return obj.SharedTo == "Everyone" || obj.SharedTo == "Organization";
    });
    if(arrTempFolder.length > 0) {
        arrFileFolder = arrFileFolder.filter(function (obj) {
            return obj.SharedTo != "Everyone" && obj.SharedTo != "Organization";
        });
    }
    if(arrFileFolder.length == 0) {
        alert("File(s)/Folder(s) shared to Organization/Everyone can't be archived.");
        waitingDialog.hide();
        return false
    }
    arrFileFolder.forEach(function (entry, index) {
        var ListName = "SharedDocument";
        var Metadata;
        var ItemType = GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: { 'type': ItemType },
            'IsArchive': true
        };
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName+"')/GetItemById('" + entry.SharedItemId + "')",
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
                arrSharedTo = arrSharedTo.filter(function (data) {
                    return data.Id != entry.SharedItemId;
                });
                if (arrFileFolder.length == (index + 1)) {
                    //SharedWithMeItems(arrSharedTo, 'SharedWithMe');
                    if ($('#FilterShareDocType option').length == 0) {
                        BindDMSDocumentType();
                    }
                    if ($("#pplSharedBy").html() == '') {
                        initializePeoplePicker("pplSharedBy", true);
                    }
                    $("#btnShareFilter").trigger('click');
                    waitingDialog.hide();
                    arrFileFolder = [];
                    if(arrTempFolder.length == 0) {
                        alert("File(s)/Folder(s) have been archived.");
                    } 
                    else {
                        arrTempFolder = [];
                        alert("File(s)/Folder(s) shared to Organization/Everyone can't be archived. Rest of the File(s)/Folder(s) have been archived.");
                    }
                    $(".chkShareToMe").prop("checked", "");
                    $(".chkShareToMe").click(function () {
                        var Properties = this.value.split(',');
                        if (this.checked == true) {
                            arrFileFolder.push({
                                SharedItemId: Properties[0].trim(),
                                type: Properties[1].trim(),
                                SharedTo: Properties[2].trim(),
                                DocumentId: Properties[3].trim(),
                                ServerURL: Properties[4].trim(),
                                userOrgId: Properties[5].trim(),
                                SiteURL: Properties[6].trim(),
                                IsBlock: Properties[7].trim()
                            });
                        }
                        else {
                            var selected = this.value;
                            arrFileFolder = arrFileFolder.filter(function (obj) {
                                return obj.SharedItemId != Properties[0].trim();
                            });
                        }
                    });
                    $("#selectAllChk").click(function (e) {
                        waitingDialog.show();
                        if (this.checked == true) {
                            $('.chkShareToMe').prop("checked", "");
                            $('.chkShareToMe').trigger('click');
                        }
                        else {
                            $('.chkShareToMe').prop("checked", "");
                            arrFileFolder = [];
                        }
                        waitingDialog.hide();
                    });
                }
            },
            error: function (error) {
                console.log(JSON.stringify(error));
                dfd.reject(error);
            }
        });
        return dfd.promise();
    });
}

//To remove archive multiple files and folders
function RemoveArchive() {
    arrFileFolder.forEach(function (entry, index) {
        var ListName = "SharedDocument";
        var Metadata;
        var ItemType = GetItemTypeForListName(ListName);
        Metadata = {
            __metadata: { 'type': ItemType },
            'IsArchive': false
        };
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName+"')/GetItemById('" + entry.SharedItemId + "')",
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
                /*arrSharedTo.forEach(function (value, i) {   
	                if (value.Id == entry.SharedItemId) {
	                    value.IsArchive = null;
	    			}
	            }); */
                arrSharedTo = arrSharedTo.filter(function (data) {
                    return data.Id != entry.SharedItemId;
                });               
                if (arrFileFolder.length == (index + 1)) {
                    if ($('#FilterShareDocType option').length == 0) {
                        BindDMSDocumentType();
                    }
                    if ($("#pplSharedBy").html() == '') {
                        initializePeoplePicker("pplSharedBy", true);
                    }
                    $("#btnShareFilter").trigger('click');
                    alert("File(s)/Folder(s) have been restored.");
                    arrFileFolder = [];
                    $(".chkFileFolder").prop("checked", "");
                    waitingDialog.hide();
                    $(".chkShareToMe").click(function () {
                        var Properties = this.value.split(',');
                        if (this.checked == true) {
                            arrFileFolder.push({
                                SharedItemId: Properties[0].trim(),
                                type: Properties[1].trim(),
                                SharedTo: Properties[2].trim(),
                                DocumentId: Properties[3].trim(),
                                ServerURL: Properties[4].trim(),
                                userOrgId: Properties[5].trim(),
                                SiteURL: Properties[6].trim(),
                                IsBlock: Properties[7].trim()
                            });
                        }
                        else {
                            var selected = this.value;
                            arrFileFolder = arrFileFolder.filter(function (obj) {
                                return obj.SharedItemId != Properties[0].trim();
                            });
                        }
                    });
                    $("#selectAllChk").click(function (e) {
                        waitingDialog.show();
                        if (this.checked == true) {
                            $('.chkShareToMe').prop("checked", "");
                            $('.chkShareToMe').trigger('click');
                        }
                        else {
                            $('.chkShareToMe').prop("checked", "");
                            arrFileFolder = [];
                        }
                        waitingDialog.hide();
                    });
                }
            },
            error: function (error) {
                console.log(JSON.stringify(error));
                dfd.reject(error);
            }
        });
        return dfd.promise();
    });
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
               // $("#"+HTMLID).append('<option value="' + SubTypeResults[index].Title + '">' + SubTypeResults[index].Title + '</option>');
                $("#"+HTMLID).append('<option value="' + SubTypeResults[index].Title + '">' + SubTypeResults[index].Title + '</option>');
            }
        }
    });
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
        if(currentSectionType == 'My Documents'){
            $("#LargeUploadFile").contents().find("input:text").val("/" + _spPageContextInfo.userEmail.toLowerCase());
        }
        $("#LargeUploadFile").contents().find("input:button").click(function (e) {
            var countRun = 0;
            setTimeout(function () {
                if(countRun == 0) {
                    $("#UploadLarge").modal('hide');
                    var tempDocName = Documentname;
                    if(Documentname.includes('/Documents/') == true) {
                        tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                    } 
                    else if(Documentname == 'Documents') {
                        tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                    }
                    GetMyDocumentsWithFilesFolder(tempDocName);
                    countRun = 1;
                }
            }, 2000);
        });
    }, 1000);
}

//check Total File size
function checkFileSize() {
    TotalSize = 0;
    for (var k = 0; k < FinalFiles4Upload.length; k++) {
        TotalSize += parseFloat(bytesToMegaBytes(FinalFiles4Upload[k].size).toFixed(2));
    }
    if(TotalSize > 300){
        return false;	
    }
    else {
        return true;
    }
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

//to copy link file and folder
function CopyLinkFileFolder(){
	var serverFileURL = '';
	var Doctype = '';
	if(arrFileFolder.length > 0) {
		serverFileURL = arrFileFolder[0].ServerURL;
		Doctype = arrFileFolder[0].type;
	}
	else {
		serverFileURL = $("#FilePath").text();
		Doctype = "file";
	}
	var TempLink = _spPageContextInfo.webAbsoluteUrl + "/Pages/Document.aspx?Section="+ window.btoa(currentSectionType) + "&SubSection=" + window.btoa($(".headdingLinks").text()) + "&SubSectionId=" + window.btoa(currentSectionId) + "&DocType=" + window.btoa(Doctype) + "&FileServerURL=" + window.btoa(serverFileURL) + "&undefined=undefined";
	//copy the link
	const el = document.createElement('textarea');
	el.value = TempLink;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	alert("URL has been copied. Press Ctrl+V to use it.");
}



function popupEmail(popuptitle) {
    $('#Team').dialog({
         width:'95%',
         height:'auto',
         modal: true,
        class: 'popup',
        title: popuptitle,
        overlay: {
            backgroundColor: "#000",
            opacity: 0.9
        },
        position:{
      at: "center top"
     }
    });
    $(".ui-dialog").addClass("ui-dialog_costom");
    $(".ui-widget-overlay").addClass("ui-dialog_cost");
    
    
    $(".ui-dialog-titlebar-close").empty().append('<span class="ui-button-icon ui-icon ui-icon-closethick"></span><span class="ui-button-icon-space"> </span>');
    $(".ui-icon-closethick").click(function() {
       // MyDocumentEnv();
       var tempDocName = fixedDecodeURIComponent(Documentname);
        if(fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
            //tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
            tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
        } 
        else if(fixedDecodeURIComponent(Documentname) == 'Documents') {
            // tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
            
            tempDocName = tempDocName.replace("Documents", "Shared Documents");
        } 
        GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
    });	
}

function CheckSPecialNameMulti()
{
    var format = /[`#$%&\=\[\]{};'"\\|,<>\/?~]/;
    var notValid=true;
    if (arrFileFolder.length > 0) {
            
            for (var index = 0; index < arrFileFolder.length; index++) {
                //if (arrFileFolder[index].type == 'file')
                
                    var fileN=arrFileFolder[index].FileFolderName;
                    if(format.test(fileN))
                    {
                        notValid=false;
                        break;
                    }
                
            }
            if(notValid==false)
                alert("Selected document has invalid file name. Please change the file name before proceed.");

    }
    return notValid;
}
function CheckSPecialName(fileN)
{
    var format = /[`#$%&\=\[\]{};'"\\|,<>\/?~]/;
    var notValid=true;
    if(format.test(fileN))
    {
        notValid=false;
        alert("Selected document has invalid file name. Please change the file name before proceed.");

    }
    return notValid;
}
function GetMyCompanyLogoUrl() {
    var txtCompanyId = Logged_CompanyId;
    var LogoUrl='';
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Companies')/items?select=ID,CompanyName,CompanyLogo,BusinessDomain,Language2nd_Logo,Language3rd_Logo,Language7th_Logo,Language8th_Logo,Language9th_Logo,Language10th_Logo,Language5th_Logo,Language6th_Logo,SmallLogo,Language4th_Logo&$filter=ID eq '" + txtCompanyId + "'";
    $.ajax({
        url: Ownurl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function(data) {
            var items = data.d.results;
            if(items.length > 0) {
                for(var index = 0; index < items.length; index++) {
                    var companyLogo = GetCompanyLogo_CurrentLanguage("Language2nd");
                    if(data.d.results[index][companyLogo] != null) {
                        LogoUrl = data.d.results[index][companyLogo].Url; //oListItem.get_item(companyLogo).get_url();
                        companyName=data.d.results[index].CompanyName;
                        //$("#LogoImage").attr("src", LogoUrl);
                    } else {
                        //$('#LogoImage').attr("src", '../_catalogs/masterpage/Titan2/Images/Titan-Logo.png');
                         LogoUrl = '../_catalogs/masterpage/Titan2/Images/Titan-Logo.png';
                    }
                }
            }
        },
        eror: function(data) {
            console.log('error');
        }
    });
    return LogoUrl;
}
// Create filter UI in library.
function createLibFilterUI()
{
    valFilterfields=[];
    if(!currentSectionType!="MyFavorite")
    {
        var ULink = DMS_Link.split('/Forms')[0];
        var ListName = ULink.split('/')[ULink.split('/').length - 1];

        var targetUrl = ULink.slice(0, ULink.lastIndexOf("/"));
        if (ListName == "Shared%20Documents"||ListName == "Shared Documents") {
            ListName = "Documents";
        }
        valFilterfields =[];
        $("#divFilterEmailFrom").hide();
        $("#divFilterEmailTo").hide();
        $("#divFilterValFrom").hide();
        $("#divFilterValTo").hide();
        $.when(getItemsWithfields(ListName, targetUrl)).done(function(fields) {
           
                valFilterfields = fields.filter(function(filterData) {
                    return filterData.Title == 'email_date'||filterData.Title =='FileValidity';
                });
                for (var i = 0; i < valFilterfields.length; i++) {
                    if(valFilterfields[i].Title=='email_date'){
                        $("#divFilterEmailFrom").show();
                        $("#divFilterEmailTo").show();                        
                    }
                    if(valFilterfields[i].Title=='FileValidity'){
                        $("#divFilterValFrom").show();
                        $("#divFilterValTo").show();
                    }
                }
               
        });
    }
    else{
            $("#divFilterEmailFrom").hide();
            $("#divFilterEmailTo").hide();
            $("#divFilterValFrom").hide();
            $("#divFilterValTo").hide();
            valFilterfields=[];

    }
}