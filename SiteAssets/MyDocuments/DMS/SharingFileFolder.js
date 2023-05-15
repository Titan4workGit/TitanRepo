var to = [];
var SharingUserEmail = [];
var SharingUserId = [];
var SharingUserName = [];
var ShareHostoryTable = '';
var SharedMeTable = '';
var selectedHistoryDoc = [];
var arrSharedBy = [];
var arrSharedTo = [];
var AllApprovers = [];
var FilePermissions = [];
var arrAckAllUser = [];
var currentSharedHistory = [];
var PermissionStatus = '';
var ShareUserPrincipleMail = [];
var arrSharingRule=[];
var shareApprovalItem=[];
var emailLink='';
var validcharmsg="";

$(document).ready(function () {
    initializePeoplePicker("ApproverName", true);
    $('#dueDateField').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: new Date()
    });
    $('#dueDateField').datepicker("option", "dateFormat", "MM dd, yy");
    $('#AppValidDateField').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: new Date()
    });
    $('#AppValidDateField').datepicker("option", "dateFormat", "MM dd, yy");

    $('#btnDeleteFile').click(function (e) {
        if(!CheckSPecialName($("#FileName").text()))//Bhawana
        {
            return false;
        }
        if (confirm("Are you sure, you want to delete this file?")) {
            DeleteFileFromSource("DeleteFile");
        }
    });
    $('.closeShareHis').click(function (e) {
        currentSharedItemId = '';
        currentSharedHistory = [];
        $("#sharedAs").val('All');
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
    $('#btnCopyFile').click(function () {
        if ($('#tbdyCopyFileLib td').length == 0) {
            waitingDialog.show();
            setTimeout(function () {
                myShareDepartmentCopy();
                TreeStructure();
                $("#CpyMoveModalTitle").text('Copy Files');
                $("#btnCopyHere").html('Copy Here');
                IsMoving = false;
            }, 100);
        }
        else {
            $("#CpyMoveModalTitle").text('Copy Files');
            $("#btnCopyHere").html('Copy Here');
            IsMoving = false;
        }
    });
    $('#btnMoveFile').click(function () {
        if ($('#tbdyCopyFileLib td').length == 0) {
            waitingDialog.show();
            setTimeout(function () {
                myShareDepartmentCopy();
                TreeStructure();
                $("#CpyMoveModalTitle").text('Move Files');
                $("#btnCopyHere").html('Move Here');
                IsMoving = true;
            }, 100);
        }
        else {
            $("#CpyMoveModalTitle").text('Move Files');
            $("#btnCopyHere").html('Move Here');
            IsMoving = true;
        }
    });
    $('#btnMultiCopy').click(function () {
        var arrTempFolder = [];
        if (arrFileFolder.length > 0) {
            $("#CpyMoveModalTitle").text('Copy Files');
            $("#btnCopyMulti").html('Copy Here');
            IsMoving = false;
            if ($('#tbdyCopyFileLib td').length == 0) {
                waitingDialog.show();
                setTimeout(function () {
                    myShareDepartmentCopy();
                    TreeStructure();
                    $("#copymove").modal('show');
                }, 100);
            }
            else {
                $("#copymove").modal('show');
            }
        }
        else {
            alert("Please select any file first.");
            return false;
        }
    });
    $('#btnMultiMove').click(function () {
        var arrTempFolder = [];
        /*arrTempFolder = arrFileFolder.filter(function (obj) {
            return obj.type.toLowerCase() == "folder";
        });
        if (arrTempFolder.length > 0) {
            alert("Please select only files to move.");
            return false;
        }*/
        if (arrFileFolder.length > 0) {
            $("#CpyMoveModalTitle").text('Move Files');
            $("#btnCopyMulti").html('Move Here');
            IsMoving = true;
            if ($('#tbdyCopyFileLib td').length == 0) {
                waitingDialog.show();
                setTimeout(function () {
                    myShareDepartmentCopy();
                    TreeStructure();
                    $("#copymove").modal('show');
                }, 100);
            }
            else {
                $("#copymove").modal('show');
            }
        }
        else {
            alert("Please select any file/folder first.");
            return false;
        }
    });
    $('#nextbtn').click(function (e) {
        if ($("#tbdyCopyFileLib input[type=radio]:checked").length == 1) {
            $("#txtPleaseWait").show();
            setTimeout(function () {
                $('.treesec').fadeIn();
                $('#copyfilesnow').fadeOut();
                $('.hidesection').fadeOut();
                $('#nextbtn').hide();
                if (arrFileFolder.length == 0) {
                    $("#btnCopyMulti").hide();
                    $("#btnCopyHere").show();
                }
                else {
                    $("#btnCopyMulti").show();
                    $("#btnCopyHere").hide();
                }
                $('#Backbtn').show();
                $(".FolderCaption").show();
                var row = $("#tbdyCopyFileLib input[type=radio]:checked").closest("tr")[0];
                getTreeView(row);
                $(".treesec").filetree();
                $('.treesec li').each(function () {
                    if ($(this).children('ul').length > 0) {
                        $(this).addClass('parent');
                    }
                });
                $('.treesec li.DmsTree').on('click', function (e) {
                    $(this).jstree(true).toggle_node(e.target);

                });
                $('.treesec li.parent > a').click(function (e) {
                    e.preventDefault();
                    $(this).parent().toggleClass('closed').toggleClass('open');
                    $('.tree li.parent > a').removeClass('selected');
                    $(this).addClass('selected');

                });

                $('.treesec li').click(function (e) {
                    e.preventDefault();
                    $(this).parent(e.target).toggleClass('closed').toggleClass('open');

                });
                $(".RootFolder").trigger("click");
            }, 100);

        } else {
            alert("Please select any library first.");
            return false;
        }
    });
    $('#btnCloseCopyModal').click(function (e) {
        $('#Backbtn').trigger('click');
        $(".DocLib").prop("checked", "");
    });
    $('#Backbtn').click(function (e) {
        $('.treesec').fadeOut();
        $('#copyfilesnow').fadeIn();
        $('.hidesection').fadeIn();
        $('#nextbtn').show();
        $('#btnCopyHere').hide();
        $('#btnCopyMulti').hide();
        $('#Backbtn').hide();
        $(".FolderCaption").hide();
        CopyDestURL = '';
        CopyFolderName = '';
    });
    $('#btnCopyHere').click(function (e) {
        if (CopyDestURL != '') {
            if ($("#CpyMoveModalTitle").text() == 'Move Files') {
                if (confirm("This action revokes shared access and stops ongoing approvals for documents (if any) in this folder. Do you want to continue?")) {
                    waitingDialog.show();
                    setTimeout(function () {
                        if(!CheckValidFileFolderSingle())
                        {
                            alert(validcharmsg);
                            waitingDialog.hide();
                            return false;
                        }
                        else
                         copyFile();
                    }, 100);
                }
            }
            else {
                waitingDialog.show();
                setTimeout(function () {
                    if(!CheckValidFileFolderSingle())
                    {
                        alert(validcharmsg);
                        waitingDialog.hide();
                        return false;
                    }
                    else
                        copyFile();
                }, 100);
            }
        } else {
            alert("Select any folder to copy/move");
            return false;
        }
    });
    $('#btnCopyMulti').click(function (e) {
        if (CopyDestURL != '') {
            if ($("#CpyMoveModalTitle").text() == 'Move Files') {
                if (confirm("This action revokes shared access and stops ongoing approvals for documents (if any) in this folder. Do you want to continue?")) {
                    waitingDialog.show();
                    setTimeout(function () {
                        copyFileMulti();
                    }, 100);
                }
            }
            else {
                waitingDialog.show();
                setTimeout(function () {
                    copyFileMulti();
                }, 100);
            }
        } else {
            alert("Select any folder to copy/move");
            return false;
        }
    });
    $('#btnChangeFileName').click(function (e) {
        if ($("#txtRenamefile").val().trim() != "") {
            var flagSpecialChar = checkFolderSpecialCharaters($("#txtRenamefile").val().trim());
            if (flagSpecialChar == true) {
            	$("#txtRenamefile").val($("#txtRenamefile").val().replace(/[&\/\\#,+()$~%'":*?<>{}]/g, ''));
                //alert('File name can not contain the following characters: \n. < > # % @ & * { } ? : ; | \ " \ \ / ~ ` ');
                //return false;
            }
            RenameFile();
        }
        else {
            alert("Please enter the name first.");
            return false;
        }
    });
    $('#btnChangeFolderName').click(function (e) {
        if ($("#txtRenamefile").val().trim() != "") {
            var flagSpecialChar = checkFolderSpecialCharaters($("#txtRenamefile").val().trim());
            if (flagSpecialChar == true) {
            	$("#txtRenamefile").val($("#txtRenamefile").val().replace(/[&\/\\#,+()$~%'":*?<>{}]/g, ''));
                //alert('File name can not contain the following characters: \n. < > # % @ & * { } ? : ; | \ " \ \ / ~ ` ');
                //return false;
            }
            RenameFile();
        }
        else {
            alert("Please enter the name first.");
            return false;
        }
    });
    $('#liRename').click(function (e) {
        if (arrFileFolder.length > 0) {
            if (arrFileFolder.length == 1) {
                CopySourceURL = arrFileFolder[0].SiteURL; // web url
                CopyLibrary = arrFileFolder[0].SelectedLibrary; //list title
                DocumentId = arrFileFolder[0].DocumentId; //list item id
                if (arrFileFolder[0].type.toLowerCase() == "file") {
                    $("#btnChangeFileName").show();
                    $("#btnChangeFolderName").hide();
                    OldFileName = arrFileFolder[0].FileFolderName;
                    $('#txtRenamefile').val(arrFileFolder[0].FileFolderName.split('.').slice(0, -1).join('.'));
                    $("#txtFileExt").text("." + arrFileFolder[0].FileFolderName.substring(arrFileFolder[0].FileFolderName.lastIndexOf('.') + 1));
                }
                else {
                    $("#btnChangeFileName").hide();
                    $("#btnChangeFolderName").show();
                    OldFileName = arrFileFolder[0].FileFolderName;
                    $('#txtRenamefile').val(arrFileFolder[0].FileFolderName);
                    $("#txtFileExt").text('');
                }
            }
            else {
                alert("Kindly select atmost one file/folder.");
                return false;
            }
        }
        else {
            alert("Kindly select file/folder first.");
            return false;
        }
    });
    //Sharing Files starts--------------
    initializePeoplePicker("SharingPplPicker", true);
    onChangeSharing('SharingPplPicker_TopSpan', 'SharingPplPicker', 'AddUserPplPicker');
    $("#sharewith").change(function () {
        var optionValue = this.value;
        SharingUserEmail = [];
        ShareUserPrincipleMail = [];
        SharingUserId = [];
        SharingUserName = [];
        $(".parentremove").remove();
        $("#parentAudienceDiv").hide();
        if (optionValue == 'My-Groups') {
            $(".My-Groups").show();
            $(".Organization").hide();
            $(".Project-Team").hide();
            $(".Selective").hide();
            $("#userDiv").show();
            $("#AddUserPplPicker").show();
            $("#userDiv").show();
            if ($("#GroupNameList").html() == '') {
                getMyGroups();
            }
        }
        else if (optionValue == 'Organization') {
            $(".My-Groups").hide();
            $(".Organization").show();
            $(".Project-Team").hide();
            $(".Selective").hide();
            $("#userDiv").show();
            $("#AddUserPplPicker").hide();
            $("#userDiv").hide();
            if ($("#ClientList").html() == "") {
                getGuestClientShare();
            }
        }
        else if (optionValue == 'Project-Team') {
            $(".My-Groups").hide();
            $(".Organization").hide();
            $(".Project-Team").show();
            $(".Selective").hide();
            $("#userDiv").show();
            $("#AddUserPplPicker").show();
            $("#userDiv").show();
            if ($("#projectList").html() == "") {
                loadProjects();
            }
        }
        else if (optionValue == 'Selective') {
            $(".My-Groups").hide();
            $(".Organization").hide();
            $(".Project-Team").hide();
            $(".Selective").show();
            $("#AddUserPplPicker").show();
            $("#userDiv").show();
            $("#userDiv").show();
        }
        else {
            $(".My-Groups").hide();
            $(".Organization").hide();
            $(".Project-Team").hide();
            $(".Selective").hide();
            $("#AddUserPplPicker").show();
            $("#userDiv").hide();

        }
        if (optionValue == 'Everyone') {
            $("#parentAudienceDiv").show();
        }
    });
    $("#divShare").click(function () {
        $("#chkCompany").prop('checked', true);
        $("#chkMetaDataReq").prop('checked', '');//Bhawana
        $("#sharedWithPermission").val('Read');
        $('#sharedWithPermission').trigger('change');
        $("#parentAudienceDiv").hide();
        /*if (currentSectionType == 'Group Documents') {
            if (DMS_Link.includes(_spPageContextInfo.webAbsoluteUrl) == false) {
                $(".InvisibleClass").hide();
            }
            else {
                $(".InvisibleClass").show();
            }
        }
        else {
            $(".InvisibleClass").show();
        }*/
        var arrTempFolder = [];
        arrTempFolder = arrFileFolder.filter(function (obj) {
            return obj.type.toLowerCase() == "folder";
        });
        if (arrTempFolder.length > 0) {
            $("#NeedAckBox").hide();
        }

        if (arrFileFolder.length > 0) {
            $('#expiredats').datepicker("destroy");
            $('#expiredats').datepicker({
                changeMonth: true,
                changeYear: true,
                minDate: 1
            });
            $('#expiredats').datepicker("option", "dateFormat", "MM dd, yy");
            $("#btnShareMulti").show();
            $("#btnShare").hide();
            if (DMS_Link.indexOf('DepartmentalDMS') != -1) {
                //$("#parentAudienceDiv").show();
                $("#sharewith option[value='Everyone']").remove();
                $("#sharewith").append('<option value="Everyone">Everyone</option>');
            }
            else {
                $("#parentAudienceDiv").hide();
                $("#sharewith option[value='Everyone']").remove();
            }
        }
        else {
            alert("Please select any file or folder first.");
            return false
        }
    });
    $("#btnShareFile").click(function () {
        $("#chkCompany").prop('checked', true);
        $("#chkMetaDataReq").prop('checked', '');//Bhawana
        $("#sharedWithPermission").val('Read');
        $('#sharedWithPermission').trigger('change');
        $("#parentAudienceDiv").hide();
        /*if (currentSectionType == 'Group Documents') {
            if (DMS_Link.includes(_spPageContextInfo.webAbsoluteUrl) == false) {
                $(".InvisibleClass").hide();
            }
            else {
                $(".InvisibleClass").show();
            }
        }
        else {
            $(".InvisibleClass").show();
        }*/

        $('#expiredats').datepicker("destroy");
        $('#expiredats').datepicker({
            changeMonth: true,
            changeYear: true,
            minDate: 1
        });
        $('#expiredats').datepicker("option", "dateFormat", "MM dd, yy");
        if (DMS_Link.indexOf('DepartmentalDMS') != -1) {
            $("#parentAudienceDiv").show();
            $("#sharewith option[value='Everyone']").remove();
            $("#sharewith").append('<option value="Everyone">Everyone</option>');
        }
        else {
            $("#parentAudienceDiv").hide();
            $("#sharewith option[value='Everyone']").remove();
        }
    });
    $("#btnShare").click(function () {
        if(!CheckSPecialName($("#FileName").text()))//Bhawana
        {
            return false;
        }
        
        if (ShareFileValidation() == true) {
            shareFile();
        }
    });
    $("#btnShareMulti").click(function () {
        if(!CheckSPecialNameMulti())//Bhawana
        {
            return false;
        }
        if (ShareFileValidation() == true) {
            shareFileMulti();
        }
    });
    $(".txtSharingHistoy").click(function () {
        if ($(".headdingLinks").text() == "Shared with Me") {
            GetSharedHistory(DocumentId, $("#FilePath").text(), $("#FileTitle").text(), $("#FileDocType").text(), $("#FileName").text(), "File", 'SharedWithMe', currentSharedItemId);
        }
        else {
            GetSharedHistory(DocumentId, $("#FilePath").text(), $("#FileTitle").text(), $("#FileDocType").text(), $("#FileName").text(), "File", 'PageLoad', currentSharedItemId);
        }
    });
    $("#selectAllHist").click(function () {
        $(".historydocid").prop("checked", $(this).prop("checked"));
        selectedHistoryDoc = [];
        selectedHistoryDocrelativeurl = [];
        $('.historydocid').each(function () {
            if ($(this).prop("checked") == true) {
                selectedHistoryDoc.push($(this).val());
                $("#revokebtn").show();
            }
            else {
                $("#revokebtn").hide();
            }
        });
    });

    /*$("#expiredats").change(function () {
        if (new Date() > new Date($("#expiredats").val())) {
            alert("Expiry date should bee greater than today.");
            $("#expiredats").val('');
            return false;
        }
    });*/
    $(".btnClosePopup").click(function () {
        $("#txtShareMessage").val('');
        $("#sharedWithPermission").val('Contribute');
        $("#sharedWithPermission").trigger("change");
        $("#forever").prop("checked", "checked");
        $("#expiredon").prop("checked", "");
        $('#expiredats').removeClass('activating');
        $("#notifymail").prop("checked", "");
        $(".chkGpName").prop("checked", "");
        $(".chkClientName").prop("checked", "");
        $(".chkProjectName").prop("checked", "");
        $("#Acknowledgment").prop("checked", "");
        $(".txtselect").text("Select");
        $("#sharewith").val('--Select--');
        $("#sharewith").trigger("change");
        $("#NeedAckBox").show();
    });
    $('#expiredon').click(function () {
        $('#expiredats').addClass('activating');
    });

    $('#forever').click(function () {
        $('#expiredats').removeClass('activating');
        $("#expiredats").val('');
    });
    $('#sharedWithPermission').on('change', function () {
        var optionValue = $('#sharedWithPermission option:selected').attr("value");
        $('.redonlysec').each(function () {
            var stalt = $(this).attr('alt');
            if (optionValue == stalt) {
                $(this).show().siblings().hide();
            }
        });
    });

    //Sharing Files ends--------------
    $('#btnSendNotifyMail').click(function () {
        SendNotifyEmail();
    });
    $('#lockeffect').click(function () {
        if (FileCheckOutBy == "") {
            Checkoutfile('');

        } else {
            CheckInfile('');
            FileCheckOutBy = '';
            $("#LockStatus").hide();
            $("#lockeffect .texthere").text("Lock");
            $('#lockeffect .unlock').hide();
            $('#lockeffect .lock').show();
        }
    });
    $('#btnUndoLock').click(function () {
        UndoCheckOutfile();
    });
    $("#starffect").click(function () {
        if ($("#txtFavorite").text() == "Add to Favorite") {
            AddFavoriteFile();
        }
        else {
            DeleteFromFavourite();
        }
    });
    $("#AddFavMulti").click(function () {
        var arrTempFolder = [];
        arrTempFolder = arrFileFolder.filter(function (obj) {
            return obj.type.toLowerCase() == "folder";
        });
        if (arrTempFolder.length > 0) {
            alert("Please select only files.");
            return false;
        }
        if (arrFileFolder.length > 0) {
            AddFavoriteFileMulti();
        }
        else {
            alert("Please select any file first.");
            return false;
        }
    });
    $("#SharingFavBox").click(function () {
        var arrTempFolder = [];
        arrTempFolder = arrFileFolder.filter(function (obj) {
            return obj.type.toLowerCase() == "folder";
        });
        if (arrTempFolder.length > 0) {
            alert("Please select only files.");
            return false;
        }
        if (arrFileFolder.length > 0) {
            AddFavShareFiles();
        }
        else {
            alert("Please select any file first.");
            return false;
        }
    });
    $("#btnChangeProp").click(function () {
        //Bhawana 2 JAN 23
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
        /*$("#chkUpdateTitle").prop('checked', '');
        $("#chkUpdateType").prop('checked', '');
        $("#chkUpdateSubType").prop('checked', '');
        $("#chkUpdateRef").prop('checked', '');
        $("#chkUpdateAuthor").prop('checked', '');
        $("#chkUpdateDetails").prop('checked', '');
        $("#txtUpdateTitle").val($("#FileTitle").text());
        $("#txtUpdateRef").val($("#FileReference").text());
        $("#txtUpdateType").val($("#FileDocType").text());
        $("#txtUpdateSubType").val($("#FileDocSubType").text());
        $("#txtUpdateAuthor").val($("#FileAuthorPopup").text());
        $("#txtUpdateDetails").val($("#FileDetalis").text());*/
    });
    $('.btnCloseProp').click(function (e) {
        $(".clearPropBox").val('');
        $("#txtUpdateType").val('Technical');
        $(".chkProperty").prop('checked', 'checked');
    });
    $('#shreduser').change(function (e) {
        FilterShareHistory(DocumentId, $("#FilePath").text(), $("#FileTitle").text(), $("#FileDocType").text(), $("#FileName").text(), "File", 'Filter', currentSharedItemId);
    });
    $('#sharedAs').change(function (e) {
        FilterShareHistory(DocumentId, $("#FilePath").text(), $("#FileTitle").text(), $("#FileDocType").text(), $("#FileName").text(), "File", 'Filter', currentSharedItemId);
    });
    //Add Approval Process Starts-----------
    $('#noDueDate').click(function () {
        if ($(this).is(':checked')) {
            $('#dueDateField').prop('disabled', true);
            $("#dueDateField").val('');
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
            if ($("#FileValidityPopup").text() != "" && $("#FileValidityPopup").text() != "null" && $("#FileValidityPopup").text() != null) {
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
        //$("#chkFooterSign").prop("checked", false);
        if($("#chkFooterSign").prop("checked") == true){
        	$("#ParentFooterSign").hide();
        	$("#chkFooterSign").prop("checked", false);
        }
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
        if (this.value == "Adobe Sign") {
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
            else if (($("#dueDateField").val() != '' && $("#AppValidDateField").val() != '') && (new Date($("#dueDateField").val()) > new Date($("#AppValidDateField").val()))) {
                alert("Validity date must be greator than Due date.");
                return false;
            }
            else {
                if (ApprovalStartValid() == true) {
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
    /*$("input[id$='AppValidDate']").click(function () {
        $('#AppValidDateField').removeAttr("disabled");
    });*/
    $('#btnApproval').click(function (e) {
        if(!CheckSPecialName($("#FileName").text()))//Bhawana
        {
            return false;
        }
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
    $('button.copyButton').click(function (e) {//Copy the URL
        e.preventDefault();
        $(this).siblings('input.linkToCopy').select();
        document.execCommand("copy");
    });

    $("#tabSharedToMe").click(function () {
        arrPermission = [];
        //waitingDialog.show();//Bhawana
        $('.loading_tbl').show();//Bhawana
        ////$(".managcover").addClass('active');//Bhawana
        $("#FilterShareType").val("All");
        $("#ShareFilterRef").val("");
        $("#FilterShareDocType").val("All");
        $("#ddlShare").val("Shared");
        $("#ddlAckFilter").val("All");
        setTimeout(function () {
            $(".headdingLinks").text('Shared with Me');
            currentSectionType = "SharedWithMe";
            currentSectionId = '';
            DMS_Type = 'Shared with Me';
            $("#divRevokeSharedTbl").hide();
            ActionBtnControls();
            GetDocumentsSharedWithMe('SharedWithMe');
        }, 100);
    });
    $("#tabSharedByMe").click(function () {
        arrPermission = [];
        //waitingDialog.show();//Bhawana
        $('.loading_tbl').show();//Bhawana
        //$(".managcover").addClass('active');//Bhawana
        $("#divPendingAck").hide();
        $("#FilterShareType").val("All");
        $("#ShareFilterRef").val("");
        $("#FilterShareDocType").val("All");
        $("#ddlShare").val("Shared");
        $("#ddlAckFilter").val("All");
        setTimeout(function () {
            $(".headdingLinks").text('Shared by Me');
            currentSectionType = "SharedByMe";
            currentSectionId = '';
            DMS_Type = 'Shared by Me';
            $("#divRevokeSharedTbl").show();
            ActionBtnControls();
            GetDocumentsSharedWithMe('SharedByMe');
        }, 100);
    });
     $("#tabSharingRuleApproval").click(function () {
        arrPermission = [];
        //waitingDialog.show();//Bhawana
        $('.loading_tbl').show();//Bhawana
        //$(".managcover").addClass('active');//Bhawana
        $("#divPendingAck").hide();
        $("#FilterShareType").val("All");
        $("#ShareFilterRef").val("");
        $("#FilterShareDocType").val("All");
        $("#ddlShare").val("Shared");
        $("#ddlAckFilter").val("All");
        setTimeout(function () {
            $(".headdingLinks").text('Approval For Share');
            currentSectionType = "ApprovalForShare";
            currentSectionId = '';
            DMS_Type = 'Approval For Share';
            $("#divRevokeSharedTbl").show();
            ActionBtnControls();
            GetDocumentsSharedWithMe('ApprovalForShare');
        }, 100);
    });
    $("#tabArchive").click(function () {
        arrPermission = [];
        //waitingDialog.show();//Bhawana
        $('.loading_tbl').show();//Bhawana
        //$(".managcover").addClass('active');//Bhawana
        $("#FilterShareType").val("All");
        $("#ShareFilterRef").val("");
        $("#FilterShareDocType").val("All");
        $("#ddlShare").val("Shared");
        $("#ddlAckFilter").val("All");
        setTimeout(function () {
            $(".headdingLinks").text('Archive');
            currentSectionType = "Archive";
            currentSectionId = '';
            DMS_Type = 'Archive';
            $("#divRevokeSharedTbl").hide();
            ActionBtnControls();
            GetDocumentsSharedWithMe('Archive');
        }, 100);
    });

    $("#btnShareFilter").click(function () {
        waitingDialog.show();
        setTimeout(function () {
            if ($(".headdingLinks").text() == "Shared by Me") {
                GetDocumentsSharedFilter('SharedByMe');
            }
            else if ($(".headdingLinks").text() == "Archive") {
                GetDocumentsSharedFilter('Archive');
            }
            else {
                GetDocumentsSharedFilter('SharedWithMe');
            }
        }, 100);
    });
    $(".CloseShareFilter").click(function () {
        if ($("#pplSharedBy_TopSpan_ResolvedList").text() != "") {
            EmptyPeoplePicker('pplSharedBy');
        }
        $("#FilterShareType").val("All");
        $("#ShareFilterRef").val("");
        $("#FilterShareDocType").val("All");
        $("#ddlShare").val("Shared");
        $("#ddlAckFilter").val("All");
    });

    $("#btnRefreshSharedTbl").click(function () {
        waitingDialog.show();
        setTimeout(function () {
            if ($(".headdingLinks").text() == "Approval For Share") {//Bhawana
                GetDocumentsSharedWithMe('ApprovalForShare');
            }
            else if ($(".headdingLinks").text() == "Shared by Me") {
                GetDocumentsSharedWithMe('SharedByMe');
            }
            else {
                GetDocumentsSharedWithMe('SharedWithMe');
            }
        }, 100);
    });
    $("#SharedFilterBox").click(function () {
        $("#btnShareFilter").show();
        $("#btnSharedDocFilter").hide();
        $(".NewFilter").show();
        if ($('#FilterShareDocType option').length == 0) {
            BindDMSDocumentType();
        }
        if ($(".headdingLinks").text() == "Shared by Me") {
            $("#filterShareText").text('Shared To:');
        }
        else {
            $("#filterShareText").text("Shared By:");
        }
        if ($("#pplSharedBy").html() == '') {
            initializePeoplePicker("pplSharedBy", true);
        }
    });
    $("#btnRevokeSharedTbl").click(function () {
        if (arrFileFolder.length > 0) {
            waitingDialog.show();
            setTimeout(function () {
                RevokeMultiPermission();
            }, 100);
        }
        else {
            alert("Please select any file first.");
            return false;
        }
    });
    $('#btnPopupNotify').click(function (e) {
        NotifyEmail();
    });
    $('#ApprovalNotify').click(function (e) {
        NotifyEmail();
    });
    $('#btnAckNotifyAll').click(function (e) {
        waitingDialog.show();
        setTimeout(function () {
            NotifyAllAck();
        }, 100);
    });
    $('#txtPendingCount').click(function (e) {
        if ($('#FilterShareDocType option').length == 0) {
            BindDMSDocumentType();
        }
        if ($("#pplSharedBy").html() == '') {
            initializePeoplePicker("pplSharedBy", true);
        }
        $(".CloseShareFilter").trigger("click");
        $("#ddlAckFilter").val("Pending");
        $("#btnShareFilter").trigger("click");
    });
    $('#btnPermHist').click(function (e) {
        GetPermissionHistory('file');
    });
    $("#btnRenameFile").click(function (e) {
        $('#txtRenamefile').val($('#FileName').text().split('.').slice(0, -1).join('.'));
        $("#txtFileExt").text("." + $('#FileName').text().substring($('#FileName').text().lastIndexOf('.') + 1));
        OldFileName = $("#txtRenamefile").val().trim() + $("#txtFileExt").text();
        $("#btnChangeFolderName").hide();
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

var OldFileName = '';
//Revoke permission Multiple select
function RevokeMultiPermission() {
    if (confirm("It will revoke all the permissions applied to file. Are you sure, you want to revoke?")) {
        //4 April 23
        $("#txtRevokeMsg").val('');
        $("#RevokePermission").modal('show');
        waitingDialog.hide();//4 April 23
        $(".ParentbtnOpenRevoke").empty().append('<button type="button" class="btn custom-btn mr-8 wpx-87" id="btnOpenRevoke">Submit</button>');
        $("#btnOpenRevoke").click(function () 
        {
            //if (confirm("Are you sure, you want to revoke permission?"))
             {
        //4 April 23
         waitingDialog.show();//4 April 23
            arrFileFolder.forEach(function (entry, index) {
                //get All the files with Document Id
                var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(DocumentID eq '" + entry.DocumentId + "' and PermissionStatus ne 'Revoked' and PermissionStatus ne 'RevokePending') ";
                $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
                    for (var i = 0; i < items.length; i++) {
                        $("#FilePath").text(items[i].DocumentURL);
                        CopySourceURL = items[i].SiteURL;
                        if (items[i].SiteURL == "null" || items[i].SiteURL == null || items[i].SiteURL == "undefined" || items[i].SiteURL == undefined) {
                            if (items[i].DocumentURL.indexOf("DepartmentalDMS") != -1) {
                                items[i].SiteURL = window.location.origin + encodeURI(items[i].DocumentURL).split('DepartmentalDMS')[0];
                            }
                            else {
                                items[i].SiteURL = _spPageContextInfo.webAbsoluteUrl;
                            }
                        }
                        if (items[i].SharedGroup == "Organization") {
                           // RevokeGpPermissionMsg(items[i].SharedUsers.results[0].ID, items[i].ID, 'false', items[i].DocumentType.toLowerCase(), items[i].SharedGroup, items[i].DocumentURL, items[i].SiteURL);  
                        revokeGpFile(items[i].SharedUsers.results[0].ID, items[i].ID,  'false',  items[i].DocumentType.toLowerCase(), items[i].SharedGroup, items[i].DocumentURL, items[i].SiteURL);//4 April 23
 
                        }
                        else {
                            //RevokePermission(items[i].DocumentID, items[i].DocumentURL, items[i].SharedUsers.results[0].ID, items[i].ID, 'false', items[i].DocumentType.toLowerCase(), items[i].SharedGroup, items[i].SiteURL, items[i].SharedUserEmail);
                           // RevokePermissionMsg(items[i].DocumentID, items[i].DocumentURL, items[i].SharedUsers.results[0].ID, items[i].ID, 'false', items[i].DocumentType.toLowerCase(), items[i].SharedGroup, items[i].SiteURL, items[i].SharedUserEmail);
                            revokeFile(items[i].DocumentID, items[i].DocumentURL, items[i].SharedUsers.results[0].ID,items[i].ID, 'false', items[i].DocumentType.toLowerCase(), items[i].SharedGroup, items[i].SiteURL, items[i].SharedUserEmail);//4 April 23
                        }
                    }
                });
                if (arrFileFolder.length == (index + 1)) {
                    $("#btnRefreshSharedTbl").trigger("click");
                    alert("All permissions are revoked.");
                    $(".chkShareToMe").prop('checked', '');
                    arrFileFolder = [];
                    waitingDialog.hide();
                }
            });
            }
        });
        //$("#btnOpenRevoke").trigger('click');//4 April 23
        }
}
function RevokeMultiPermission_old() {
    if (confirm("It will revoke all the permissions applied to file. Are you sure, you want to revoke?")) {
        arrFileFolder.forEach(function (entry, index) {
            //get All the files with Document Id
            var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(DocumentID eq '" + entry.DocumentId + "' and PermissionStatus ne 'Revoked' and PermissionStatus ne 'RevokePending') ";
            $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
                for (var i = 0; i < items.length; i++) {
                    $("#FilePath").text(items[i].DocumentURL);
                    CopySourceURL = items[i].SiteURL;
                    if (items[i].SiteURL == "null" || items[i].SiteURL == null || items[i].SiteURL == "undefined" || items[i].SiteURL == undefined) {
                        if (items[i].DocumentURL.indexOf("DepartmentalDMS") != -1) {
                            items[i].SiteURL = window.location.origin + encodeURI(items[i].DocumentURL).split('DepartmentalDMS')[0];
                        }
                        else {
                            items[i].SiteURL = _spPageContextInfo.webAbsoluteUrl;
                        }
                    }
                    if (items[i].SharedGroup == "Organization") {
                        RevokeGpPermission(items[i].SharedUsers.results[0].ID, items[i].ID, 'false', items[i].DocumentType.toLowerCase(), items[i].SharedGroup, items[i].DocumentURL, items[i].SiteURL);
                    }
                    else {
                        RevokePermission(items[i].DocumentID, items[i].DocumentURL, items[i].SharedUsers.results[0].ID, items[i].ID, 'false', items[i].DocumentType.toLowerCase(), items[i].SharedGroup, items[i].SiteURL, items[i].SharedUserEmail);
                    }
                }
            });
            if (arrFileFolder.length == (index + 1)) {
                $("#btnRefreshSharedTbl").trigger("click");
                alert("All permissions are revoked.");
                $(".chkShareToMe").prop('checked', '');
                arrFileFolder = [];
                waitingDialog.hide();
            }
        });
    }
}
//to show Permission History from Table
function ShowPermissionHistory(ServerURL, FileOrFolder) {
    $("#FilePath").text(ServerURL);
    GetPermissionHistory(FileOrFolder);
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

//get Permission History
function GetPermissionHistory(FileOrFolder) {
    if (FileOrFolder.toLowerCase() == 'folder') {
        var webURL = SiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + $("#FilePath").text() + "')?$expand=ListItemAllFields,Author,Folder/Author&$select=ListItemAllFields/Titan_Permission";
    }
    else {
        var webURL = SiteUrl + "/_api/web/GetFileByServerRelativeUrl('" + $("#FilePath").text() + "')?$expand=ListItemAllFields,Author,Files/Author&$select=ListItemAllFields/Titan_Permission";
    }
    $.ajax({
        url: webURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var FileValue = data.d.ListItemAllFields;
            if (FileValue.Titan_Permission != null && FileValue.Titan_Permission != "" && FileValue.Titan_Permission != "null") {
                $("#bdyPermissionHist").html(FileValue.Titan_Permission);
                $("#PermissionHistory").modal('show');
            }
            else {
                alert("No permission history created.");
            }
        },
        eror: function (data) {
            alert(JSON.stringify(data));
            return false;
        }
    });
}

//Open modal for display the file properties //getfilebyserverrelativeurl
function DisplayFileProperty(SiteURL, Library, CurrentPermission, FileServerRelUrl, Isinherit, DiaplayServerRelUrl, rel, Mode,LibUrl,MataDataReq,ShareMsg) {
    ShareMsg=fixedDecodeURIComponent(ShareMsg);
    CopySourceURL = CommentSiteURL = SiteURL;
    if (FileServerRelUrl != "NullValue" && Library != "Department: IT" && $(".headdingLinks").text() != 'Shared with Me' && $(".headdingLinks").text() != 'Shared by Me' && $(".headdingLinks").text() != 'Archive') {
        IsStopInheritancePermissions = Boolean.parse(Isinherit);
        Filepath = FileServerRelUrl;
    }
   
    $(".chkFileFolder").prop("checked", false);
    arrFileFolder = [];
    $("#txtFavorite").text("Add to Favorite");
    $('.unfillstar').show();
    $('.fillstar').hide();
    $("#btnShareMulti").hide();
    $("#btnShare").show();
    FavouriteId = '';
    $(".btnNotSharedTab").show();
    
    $("#modalDownloadBtn").show();
    $("#divEditView").show();
    if (CurrentPermission == "Restricted View") {
        $("#modalDownloadBtn").hide();
        $("#divEditView").hide();
    }
    else if (CurrentPermission == "Read") {
        $("#divEditView").hide();
    }
    $("#btnDeleteFile").show();
    $("#btnCopyFile").show();
    $("#btnMoveFile").show();
    $("#btnPopupRename").show();
    $("#btnPopupShare").show();
    $("#btnPopupPermission").show();
    $("#PermHisParent").show();
    $("#btnPopupLock").show();
    $("#btnPopupChangeprop").show();
    //$("#btnApproval").show();
    $(".customColModal").remove();
    if (IsmanagePermissions) {
        $("#btnPopupPermission").show();
    } else {
        $("#btnPopupPermission").hide();
    }
    var tempAction = '';
    var customColQ = '';
    customColQ = AddCustomColPopup();
    DiaplayServerRelUrl=fixedDecodeURIComponent(DiaplayServerRelUrl);
    if (DiaplayServerRelUrl.includes('/Documents/') == true) {
        DiaplayServerRelUrl = DiaplayServerRelUrl.replace("/Documents/", "/Shared Documents/");//Bcz we are encoding later
    }
    else if (DiaplayServerRelUrl.includes('/Shared%20Documents/') == true)//Bhawana 2 jan 23
    {
        DiaplayServerRelUrl = DiaplayServerRelUrl.replace("/Shared%20Documents/", "/Shared Documents/");//Bcz we are encoding later
   
    }
   
   var webURL = SiteURL + "/_api/web/GetFileByServerRelativePath(decodedUrl='" + fixedEncodeURIComponent(DiaplayServerRelUrl) + "')?$expand=ListItemAllFields,Author,Files/Author,Editor&$select=*,LockedByUser,CheckedOutByUser,DocumentWrittenBy,Author/Title,ListItemAllFields/AccessLevel,ListItemAllFields/Id,ListItemAllFields/Department,ListItemAllFields/Details,ListItemAllFields/DocumentType,ListItemAllFields/SubCategory,ListItemAllFields/FileValidity,ListItemAllFields/DocumentNo,ListItemAllFields/FileSizeDisplay,ListItemAllFields/Last_x0020_Modified,ListItemAllFields/Modified,ListItemAllFields/ServerRelativeUrl," + customColQ +
        "ListItemAllFields/DocumentWrittenBy,ListItemAllFields/Titan_Permission,ListItemAllFields/PermissionLevel,ListItemAllFields/PermissionLevelId,ListItemAllFields/Regarding,ListItemAllFields/SecurityLevel,ListItemAllFields/Acknowledgement,ListItemAllFields/Title,ListItemAllFields/Approval,ListItemAllFields/FileLeafRef,ListItemAllFields/ServerRedirectedEmbedUri,ListItemAllFields/Modified_x0020_By";
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
            if (FileValue.FileLeafRef.includes('.csv') == true) {
                propertiesServerRelativeUrl = data.d.LinkingUri;
            }
            DocumentId = data.d.ListItemAllFields.Id;
            SelectedFileServerURL = tempAction = DiaplayServerRelUrl;
            if (FileValue.Titan_Permission == undefined || FileValue.Titan_Permission == null || FileValue.Titan_Permission == "null" || FileValue.Titan_Permission == "") {
                $("#PermHisParent").hide();
            }
            FileCheckOutBy =getCheckedOutByPath();
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
            }
            else {
                $("#lockeffect").show();
                if (_spPageContextInfo.userDisplayName == FileCheckOutBy) {
                    
                    $("#LockStatus").show();
                    $("#LockStatus").text("Locked by me");
                    $("#lockeffect .texthere").text("Unlock");
                    $(".LockDisable").attr("disabled", "disabled");
                    $("#FileEditModal").prop("disabled", "");
                    $("#btnChangeProp").hide();
                    $("#btnApproval").hide();
                } else {
                    $("#lockeffect .texthere").text("Lock");
                    $("#LockStatus").hide();
                    $(".LockDisable").prop("disabled", "");
                    $("#btnChangeProp").show();
                    if (CurrentPermission != "Restricted View"&&CurrentPermission != "Read") {
                        $("#divEditView").show();
                    }
                }
                $("#lockeffect").prop("disabled", "");
            }

            if (propertiesServerRelativeUrl == null) {
                var temp_propertiesServerRelativeUrl = window.location.origin + DiaplayServerRelUrl;
               propertiesServerRelativeUrl= temp_propertiesServerRelativeUrl.split('sites/')[0]+"sites/"+fixedEncodeURIComponent(temp_propertiesServerRelativeUrl.split('sites/')[1],"href");
               // propertiesServerRelativeUrl = window.location.origin + fixedEncodeURIComponent(DiaplayServerRelUrl,"href");

                if (DiaplayServerRelUrl.includes("DocumentManagementSystem") == true || DiaplayServerRelUrl.includes("DepartmentalDMS") == true) {
                    if (DiaplayServerRelUrl.includes("DocumentManagementSystem") == true) {
                        CopyLibrary = "DocumentManagementSystem";
                        $(".txtCopyLink").val(SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + fixedEncodeURIComponent(DiaplayServerRelUrl,"href") + "&parent=" + encodeURIComponent(DiaplayServerRelUrl.substr(0, DiaplayServerRelUrl.lastIndexOf("/") + 0)));
                    } else {
                        CopyLibrary = "DepartmentalDMS";
                        $(".txtCopyLink").val(SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + fixedEncodeURIComponent(DiaplayServerRelUrl,"href") + "&parent=" + encodeURIComponent(DiaplayServerRelUrl.substr(0, DiaplayServerRelUrl.lastIndexOf("/") + 0)));
                    }
                } else {
                    if (DiaplayServerRelUrl.search(/\bDocuments\b/) >= 0 || Documentname == undefined || Documentname == '') {
                        CopyLibrary = "Documents";
                        Documentname == '';
                    }
                    else {
                        if (fixedDecodeURIComponent(Documentname).indexOf('/') != -1) {
                            CopyLibrary = fixedDecodeURIComponent(Documentname).split('/')[0];
                        } else {
                            CopyLibrary = fixedDecodeURIComponent(Documentname);
                        }
                    }
                    //CopyLibrary = "Documents";
                    var HostName = window.location.origin + DiaplayServerRelUrl.substr(0, DiaplayServerRelUrl.lastIndexOf("/") + 0);
                    if (DiaplayServerRelUrl.search(/\bShared%20Documents\b/) >= 0) {
                        tempAction = DiaplayServerRelUrl.replace('Shared%20Documents', "Shared Documents");
                    }
                    $(".txtCopyLink").val(HostName + "/Forms/AllItems.aspx?id=" + fixedEncodeURIComponent(tempAction,"href") + "&parent=" + fixedEncodeURIComponent(tempAction.substr(0, DiaplayServerRelUrl.lastIndexOf("/") + 0)));
                }
            } else {
                if (DiaplayServerRelUrl.includes("DocumentManagementSystem") == true) {
                    CopyLibrary = "DocumentManagementSystem";
                } else if (DiaplayServerRelUrl.includes("DepartmentalDMS") == true) {
                    CopyLibrary = "DepartmentalDMS";
                } else {
                    if (DiaplayServerRelUrl.search(/\bDocuments\b/) >= 0 || Documentname == undefined || Documentname == '') {
                        CopyLibrary = "Documents";
                        Documentname == '';
                    }
                    else {
                        if (fixedDecodeURIComponent(Documentname).indexOf('/') != -1) {
                            CopyLibrary = fixedDecodeURIComponent(Documentname).split('/')[0];
                        } else {
                            CopyLibrary = fixedDecodeURIComponent(Documentname);
                        }
                    }
                }
                $(".txtCopyLink").val(propertiesServerRelativeUrl);
            }
            var EditFileLink = '';
            //$("#DownloadDocs").prop("href", window.location.origin + fixedEncodeURIComponent(DiaplayServerRelUrl,"href"));//18 jan 23            
            $("#DownloadDocs").prop("href", window.location.origin +"/sites/" +fixedEncodeURIComponent(DiaplayServerRelUrl.split("/sites/")[1],"href"));//18 jan 23
            $("#DownloadDocs").prop("download",FileValue.FileLeafRef);//Bhawana added on 3 nov 22 
            if (FileValue.FileLeafRef.includes(".pdf") == true || FileValue.FileLeafRef.includes(".txt") == true) {
            	$("#ParentFullView").empty();
            }
            else {
	            $("#ParentFullView").empty().append('<a href="javascript:void(0);" id="btnFileFullView"><button class="btn dropdown-toggle" type="button" id=""><img class="detail-view-icon-info mr2" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/full-view.png" alt="Full View" /><span data-localize="Online View">Online View</span></button></a>');
	            $("#btnFileFullView").click(function () {
	                if (confirm("It will redirect to new tab. Are you sure you want to open?")) {
	                    window.open(propertiesServerRelativeUrl, '_blank');
	                }
	            });
	        }
            //$("#btnFileFullView").prop("href", propertiesServerRelativeUrl);
            if (FileValue.FileLeafRef.includes(".pdf") == true|| FileValue.FileLeafRef.includes(".dwg") == true) {//to check if it's PDF 
                if (DiaplayServerRelUrl.search(/\bShared%20Documents\b/) >= 0) {
                    tempAction = DiaplayServerRelUrl.replace('Shared%20Documents', "Shared Documents");
                }
                var PDFLINK='';
                
                if(LibUrl!='undefined' && LibUrl!=undefined && LibUrl!=null &&LibUrl!='')//Bhawana
               {   
                 propertiesServerRelativeUrl=LibUrl +"/Forms/AllItems.aspx?id="+ fixedEncodeURIComponent(tempAction,"href") + "&parent=" +fixedEncodeURIComponent( DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";                       
                    PDFLINK = LibUrl +"/Forms/AllItems.aspx?id="+ fixedEncodeURIComponent(tempAction,"href") + "&parent=" + fixedEncodeURIComponent(DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";                      
                }
                else{
                    if(DMS_Link!="")
                    {
                    PDFLINK = DMS_Link + "?id=" + fixedEncodeURIComponent(tempAction,"href") + "&parent=" + fixedEncodeURIComponent(DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";
                    propertiesServerRelativeUrl= DMS_Link + "?id=" + fixedEncodeURIComponent(tempAction,"href") + "&parent=" +fixedEncodeURIComponent( DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";
                    }
                    else
                    {
                        var HostNm = window.location.origin + tempAction.substr(0,tempAction.lastIndexOf("/") + 0);
                        PDFLINK = HostNm + "/Forms/AllItems.aspx?id="+ fixedEncodeURIComponent(tempAction,"href") + "&parent=" + fixedEncodeURIComponent(DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";

                        propertiesServerRelativeUrl=PDFLINK;
                    }
                }                
               // var PDFLINK = DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";
                $(".txtCopyLink").val(PDFLINK);
                $("#divEditView").empty().append('<a href="javascript:void(0);" id="btnEditViewFile"><button class="btn dropdown-toggle LockDisable" type="button" id="FileEditModal"><i class="fa fa-edit"></i><span data-localize="Edit">Edit</span></button></a>');
                EditFileLink = PDFLINK;
                $("#btnEditViewFile").click(function () {
                    OpenEditIframe(PDFLINK);
                });
                //$("#btnEditViewFile").prop("href", PDFLINK);
            }
            else if (FileValue.FileLeafRef.includes(".txt") == true||FileValue.FileLeafRef.includes(".EML") == true||FileValue.FileLeafRef.includes(".eml") == true) {//to check if it's txt 
                if (DiaplayServerRelUrl.search(/\bShared%20Documents\b/) >= 0) {
                    tempAction = DiaplayServerRelUrl.replace('Shared%20Documents', "Shared Documents");
                }
                var txtLINK ="";
                if(LibUrl!='undefined' && LibUrl!=undefined && LibUrl!=null &&LibUrl!='')//Bhawana
               {
                    txtLINK = LibUrl +"/Forms/AllItems.aspx?id="+ fixedEncodeURIComponent(tempAction,"href") + "&parent=" + fixedEncodeURIComponent(DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";
                   propertiesServerRelativeUrl = LibUrl +"/Forms/AllItems.aspx?id="+ fixedEncodeURIComponent(tempAction,"href") + "&parent=" +fixedEncodeURIComponent( DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";
               
               }
               else{
                   if(DMS_Link!="")
                   {
                    txtLINK = DMS_Link + "?id=" + fixedEncodeURIComponent(tempAction,"href") + "&parent=" + fixedEncodeURIComponent(DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";
                   //txtLINK = DMS_Link + "?id=" + fixedEncodeURIComponent(tempAction,"href") + "&parent=" + fixedEncodeURIComponent(DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=5";
                   propertiesServerRelativeUrl = DMS_Link + "?id=" + fixedEncodeURIComponent(tempAction,"href") + "&parent=" + fixedEncodeURIComponent(DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";
                   

                   }else
                    {
                        var HostNm = window.location.origin + fixedDecodeURIComponent(FileServerRelUrl).substr(0, fixedDecodeURIComponent(FileServerRelUrl).lastIndexOf("/") + 0);
                        txtLINK = HostNm + "/Forms/AllItems.aspx?id=" + encodeURIComponent(fixedDecodeURIComponent(FileServerRelUrl)) + "&parent=" + encodeURIComponent(fixedDecodeURIComponent(FileServerRelUrl).substr(0, fixedDecodeURIComponent(FileServerRelUrl).lastIndexOf("/") + 0));
                        propertiesServerRelativeUrl=txtLINK;
                    }
               }
                $(".txtCopyLink").val(txtLINK);
                $("#divEditView").empty().append('<a href="javascript:void(0);" id="btnEditViewFile"><button class="btn dropdown-toggle LockDisable" type="button" id="FileEditModal"><i class="fa fa-edit"></i><span data-localize="Edit">Edit</span></button></a>');
                $("#btnEditViewFile").click(function () {
                    OpenEditIframe(txtLINK);
                });
                EditFileLink = txtLINK;
                //$("#btnEditViewFile").prop("href", txtLINK);
            }
            else {
                if (FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1) == "xlsx" || FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1) == "xls" || FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1) == "csv") {
                    propertiesServerRelativeUrl = propertiesServerRelativeUrl.replace('interactivepreview', 'view&wdAccPdf=0&wdEmbedFS=1');
                    $(".txtCopyLink").val(propertiesServerRelativeUrl);
                    $("#ParentFullView").empty().append('<a href="javascript:void(0);" id="btnFileFullView"><button class="btn dropdown-toggle" type="button" id=""><img class="detail-view-icon-info mr2" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/full-view.png" alt="Full View" /><span data-localize="Online View">Online View</span></button></a>');
                    $("#btnFileFullView").click(function () {
                        if (confirm("It will redirect to new tab. Are you sure you want to open?")) {
                            window.open(propertiesServerRelativeUrl, '_blank');
                        }
                    });
                    //$("#btnFileFullView").prop("href", propertiesServerRelativeUrl);
                }
                $("#divEditView").empty().append('<a href="javascript:void(0);" id="btnEditViewFile"><button class="btn dropdown-toggle LockDisable" type="button" id="FileEditModal"><i class="fa fa-edit"></i><span data-localize="Edit">Edit</span></button></a>');
                if (FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1) == "docx") {
                    //Bhawana
                    if (CurrentPermission == 'Restricted View') 
                        propertiesServerRelativeUrl=propertiesServerRelativeUrl.replace('interactivepreview', 'default');                    
                    EditFileLink = propertiesServerRelativeUrl.replace('interactivepreview', 'edit&wdAccPdf=0&wdEmbedFS=1');
                    
                    $("#btnEditViewFile").click(function () {
                        OpenEditIframe(EditFileLink);
                    });
                    //$("#btnEditViewFile").prop("href", propertiesServerRelativeUrl.replace('interactivepreview', 'edit&wdAccPdf=0&wdEmbedFS=1'));
                }
                else {
                    EditFileLink = propertiesServerRelativeUrl.replace('interactivepreview', 'view&wdAccPdf=0&wdEmbedFS=1');
                    $("#btnEditViewFile").click(function () {
                        OpenEditIframe(EditFileLink);
                    });
                    //$("#btnEditViewFile").prop("href", propertiesServerRelativeUrl.replace('interactivepreview', 'view&wdAccPdf=0&wdEmbedFS=1'));
                }
            }
            var container = $("#File-viewer").empty();
            if (FileValue.FileLeafRef.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                if (CurrentPermission == 'Restricted View') {
                    if (DiaplayServerRelUrl.search(/\bShared%20Documents\b/) >= 0) {
                        tempAction = DiaplayServerRelUrl.replace('Shared%20Documents', "Shared Documents");
                    }
                    var ImageLINK='';
                    //var ImageLINK = DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/")) + "&p=true";//Bhawana Singh
                   if(LibUrl!='undefined' && LibUrl!=undefined && LibUrl!=null &&LibUrl!='')//Bhawana
                    {
                        ImageLINK = LibUrl +"/Forms/AllItems.aspx?id="+ fixedEncodeURIComponent(tempAction,"href") + "&parent=" +fixedEncodeURIComponent( DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";
                     }
               else
               {    if(DMS_Link!="")
                    {
                   ImageLINK = DMS_Link + "?id=" + fixedEncodeURIComponent(tempAction,"href") + "&parent=" +fixedEncodeURIComponent( DiaplayServerRelUrl.substr(0, tempAction.lastIndexOf("/"))) + "&p=true";  
                    } 
                    else
                    {
                        var HostNm = window.location.origin + fixedDecodeURIComponent(FileServerRelUrl).substr(0, fixedDecodeURIComponent(FileServerRelUrl).lastIndexOf("/") + 0);
                        ImageLINK = HostNm + "/Forms/AllItems.aspx?id=" + encodeURIComponent(fixedDecodeURIComponent(FileServerRelUrl)) + "&parent=" + encodeURIComponent(fixedDecodeURIComponent(FileServerRelUrl).substr(0, fixedDecodeURIComponent(FileServerRelUrl).lastIndexOf("/") + 0));
                     }
               }
                    $(".txtCopyLink").val(ImageLINK);
                    $('<iframe>', {
                        src: ImageLINK,
                        id: 'iframeFile-viewer',
                        frameborder: 0,
                        scrolling: 'yes',
                        width: '100%',
                        height: '98%'
                    }).appendTo(container);
                    $("#ParentFullView").empty().append('<a href="javascript:void(0);" id="btnFileFullView"><button class="btn dropdown-toggle" type="button" id=""><img class="detail-view-icon-info mr2" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/full-view.png" alt="Full View" /><span data-localize="Online View">Online View</span></button></a>');
                    $("#btnFileFullView").click(function () {
                        if (confirm("It will redirect to new tab. Are you sure you want to open?")) {
                            window.open(ImageLINK, '_blank');
                        }
                    });
                    //$("#btnFileFullView").prop("href", ImageLINK);
                }
                else {
                    $('#File-viewer').html("<div class='FlexingBox'><img class='AdjustingSize' src='" + propertiesServerRelativeUrl + "'/></div>");
                }
            }
            else {
                var Extension = FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1);
                if (Extension == "wmv" || Extension == "avi" || Extension == "mp3" || Extension == "mp4" || Extension == "webm" || Extension == "wma" || Extension == "one" || Extension == "tif" || Extension == "tiff" || Extension == "pdf" || Extension == "mov") {
                    propertiesServerRelativeUrl = $(".txtCopyLink").val();
                }else if(Extension=="xls")
                {
                propertiesServerRelativeUrl +="?web=1"
                }
                else {
                    if (CurrentPermission == 'Restricted View') {
                        $(".txtCopyLink").val(EditFileLink);
                        if (Extension == "pptx") {
                            propertiesServerRelativeUrl = $(".txtCopyLink").val()
                        }
                        $("#ParentFullView").empty().append('<a href="javascript:void(0);" id="btnFileFullView"><button class="btn dropdown-toggle" type="button" id=""><img class="detail-view-icon-info mr2" src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/full-view.png" alt="Full View" /><span data-localize="Online View">Online View</span></button></a>');
                        $("#btnFileFullView").click(function () {
                            if (confirm("It will redirect to new tab. Are you sure you want to open?")) {
                                window.open(EditFileLink, '_blank');
                            }
                        });
                        //$("#btnFileFullView").prop("href", EditFileLink);
                    }
                }
                //Bind File in Iframe
                if (Mode == 'EditMode')
                 {
                    propertiesServerRelativeUrl = EditFileLink;
                }
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
                    //$('#ShareTabSharing').text("Shared with Everyone");
                    $(".txtSharingHistoy").show();
                }
                else {
                    FileValue.SecurityLevel = "Not shared";
                    $('#FileSharing').text(FileValue.SecurityLevel);
                    //$('#ShareTabSharing').text("Shared with Everyone");
                    $(".txtSharingHistoy").hide();
                }
            }
            else {
                $('#FileSharing').text("Shared with " + FileValue.SecurityLevel);
                //$('#ShareTabSharing').text("Shared with Everyone");
                $(".txtSharingHistoy").show();
            }
            if ($('.headdingLinks').text() == "Shared by Me") {
                $(".btnNotSharedTab").hide();
                $(".txtSharingHistoy").show();
                getSharingInfo(DocumentId);
                $("#btnPopupChangeprop").hide();
            }
            else if ($('.headdingLinks').text() == "Shared with Me") {
                $(".btnNotSharedTab").hide();
                getSingleShareInfo(DocumentId, rel);
            }
            //Custom Column
            var tempCustom = [];
            if (customColQ != '') {
                tempCustom = customColQ.split(',');
                for (cus = 0; cus < tempCustom.length; cus++) {
                    if (new Date(FileValue[tempCustom[cus]]) != "Invalid Date") {
                        if (FileValue[tempCustom[cus]] != null && FileValue[tempCustom[cus]] != "null") {
                            $("#CustomPopup" + tempCustom[cus]).text(titanForWork.convertJSONDateAMPMWithDate(FileValue[tempCustom[cus]]));
                        }
                    }
                    else {
                        $("#CustomPopup" + tempCustom[cus]).text(FileValue[tempCustom[cus]] ? FileValue[tempCustom[cus]] : "");
                    }
                }
            }
            $('#FileTitle').text(FileValue.Title ? FileValue.Title : "");
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
            
            $("#lblSharingMsg").text(ShareMsg!=undefined&&ShareMsg!=null?ShareMsg:"");//17 jan 23
            $('#FileReference').text(FileValue.DocumentNo ? FileValue.DocumentNo : "");
            $('#FileAuthorPopup').text(FileValue.DocumentWrittenBy ? FileValue.DocumentWrittenBy : "");
            $('#FileDetalis').text(FileValue.Details ? FileValue.Details : "");
            $('#FileDetalis').text(FileValue.Details ? FileValue.Details : "");
            if (FileValue.FileValidity != null && FileValue.FileValidity != "" && FileValue.FileValidity != "null") {
                $('#FileValidityPopup').text(moment(FileValue.FileValidity).format('MMM D, YYYY'));
            }
            else {
                $('#FileValidityPopup').text("");
            }
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
            $('#CommentFileName').text(FileValue.FileLeafRef);
            $('#txtRenamefile').val(FileValue.FileLeafRef.split('.').slice(0, -1).join('.'));
            $("#txtFileExt").text("." + FileValue.FileLeafRef.substring(FileValue.FileLeafRef.lastIndexOf('.') + 1));
            $('#FileLastModified').text(titanForWork.convertJSONDateAMPMWithDate(FileValue.Last_x0020_Modified));
            $('#FileLastModifiedBy').text(GetUserFullName(FileValue.Modified_x0020_By));
            $('#CommentModify').text($('#FileLastModifiedBy').text());
            $('#CommentModTime').text($('#FileLastModified').text());
            $("#CommentModEmail").text(FileValue.Modified_x0020_By.split('|')[2]);
            $("#CommentModEmail").click(function () {
                OpenEmail(FileValue.Modified_x0020_By.split('|')[2]);
            });
            $("#CommentModImage").prop('src', _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(FileValue.Modified_x0020_By.split('|')[2]));
           // $('#FileSize').text(bytesToSize(FileValue.FileSizeDisplay) + " KB");
            $('#FileSize').text(bytesToSize(FileValue.FileSizeDisplay) + "");
            $('#LibProject').text(Library);
            //PermissionsControl(FileValue);
            IntervalId = setInterval(function () {
               // $("#iframeFile-viewer").contents().find(".OneUp-commandBar").remove();
              //  $("#iframeFile-viewer").contents().find(".AppHeaderPanel").remove();
              //  $("#iframeFile-viewer").contents().find(".WACRibbonPanel").remove();
              
              if (Mode == 'NullValue')
              {
               $("#iframeFile-viewer").attr('style', 'min-height: calc(100vh - 104px) !important; height: calc(100vh - 104px) !important;margin-top: -58px;width: 100% !important;');
               $("#iframeFile-viewer").contents().find(".OneUp-commandBar").remove();
               $("#iframeFile-viewer").contents().find(".AppHeaderPanel").remove();
               $("#iframeFile-viewer").contents().find(".WACRibbonPanel").remove();              
              }
                
            if (Mode == 'EditMode' && Extension == "xlsx") {
                $("#iframeFile-viewer").attr('style', 'min-height: calc(100vh - 104px) !important; height: calc(100vh - 104px) !important;margin-top: -58px;width: 100% !important;');
                
            }
            if (Mode == 'EditMode' || Extension == "txt") {
                // $("#iframeFile-viewer").contents().find(".root-74").remove();
                //$("#iframeFile-viewer").contents().find("button[name=Delete].ms-CommandBarItem-link").remove();
                $("#iframeFile-viewer").contents().find("button[name=Open].ms-CommandBarItem-link").remove();
                $("#iframeFile-viewer").contents().find("button[name=Download].ms-CommandBarItem-link").remove();
                $("#iframeFile-viewer").contents().find("button[name=Close].ms-CommandBarItem-link").remove();
                $("#iframeFile-viewer").contents().find("button[data-automationid=copy-link].ms-Button--commandBar").remove();
                $("#iframeFile-viewer").contents().find("button[data-automationid=share].ms-Button--commandBar").remove();
                $("#iframeFile-viewer").contents().find("button[data-automationid=overflowButton].ms-Button--commandBar").remove();
                $("#iframeFile-viewer").contents().find("button[data-automationid=showProperties].ms-Button--commandBar").remove();
                $("#iframeFile-viewer").contents().find("button[data-automationid=fileTitle].ms-CommandBarItem-link").remove();
            }
              }, 2000);
           
            //show hide buttonson the basis of permissions
            if (Library == 'My Documents') {
                $("#btnPopupPermission").hide();
                //$("#PermHisParent").hide();
            }
            if (Library != 'My Documents' && currentSectionType != 'SharedWithMe' && currentSectionType != 'SharedByMe') {
                getListUserEffectivePermissions(SiteURL, listTitle, true, DocumentId, 'i:0#.f|membership|' + _spPageContextInfo.userPrincipalName + '');
                if (IsNotpermission == true) {
                    if (IsContributor == true && IsFullControl == false) { //Contributor
                        $("#btnDeleteFile").show();
                        $("#btnCopyFile").show();
                        $("#btnMoveFile").show();
                        $("#divEditView").show();
                        $("#btnPopupRename").show();
                        $("#btnPopupShare").show();
                        $("#btnPopupPermission").hide();
                        $("#btnPopupLock").show();
                        $("#btnPopupChangeprop").show();
                        if ($("#btnChangeProp").css('display') != "none") {
                            $("#btnApproval").show();
                        }
                    }
                    else if (IsContributor == false && IsFullControl == false) { //Reader
                        $("#btnDeleteFile").hide();
                        $("#btnCopyFile").show();
                        $("#btnMoveFile").hide();
                        $("#divEditView").hide();
                        $("#btnPopupRename").hide();
                        $("#btnPopupShare").hide();
                        $("#btnPopupPermission").hide();
                        $("#btnPopupLock").hide();
                        $("#btnPopupChangeprop").hide();
                        $("#btnApproval").hide();
                    }
                    if (IsdeleteListItems == true) {
                        $("#btnDeleteFile").show();
                    }
                }
                else {
                    FilePermissionForUser('file'); //to get permission from 'Titan_Permission' column
                    if (arrPermission.length > 0) {
                        if (arrPermission[0].UserContri == true) {
                            $("#btnDeleteFile").show();
                            $("#btnCopyFile").show();
                            $("#btnMoveFile").show();
                            $("#btnPopupRename").show();
                            if (CurrentPermission != "Restricted View") {
                                $("#divEditView").show();
                            }
                            $("#btnPopupShare").show();
                            $("#btnPopupPermission").hide();
                            $("#btnPopupLock").show();
                            $("#btnPopupChangeprop").show();
                            if ($("#btnChangeProp").css('display') != "none") {
                                $("#btnApproval").show();
                            }
                        }
                        else if (arrPermission[0].UserReader == true) {
                            $("#btnDeleteFile").hide();
                            $("#btnCopyFile").show();
                            $("#btnMoveFile").hide();
                            $("#btnPopupRename").hide();
                            $("#divEditView").hide();
                            $("#btnPopupShare").hide();
                            $("#btnPopupPermission").hide();
                            $("#btnPopupLock").hide();
                            $("#btnPopupChangeprop").hide();
                            $("#btnApproval").hide();
                        }
                    }
                }
            }
            $('#FileVersion').text(data.d.UIVersionLabel);// on 10 april 23
            
            GetFileVersion(DiaplayServerRelUrl, SiteURL, FileValue.FileLeafRef, FileValue.Title ? FileValue.Title : "");
            AddFileViewCount();
            if (Mode == 'EditMode') {
                $("#btnApproval").hide();
                $("#btnDeleteFile").hide();
                $("#btnMoveFile").hide();
                $("#btnRenameFile").hide();
                $("#btnPopupShare").hide();
                $("#btnPopupLock").hide();
                $("#btnPopupChangeprop").hide();
            }
            else {
                $("#btnApproval").show();
                $("#btnMoveFile").show();
                $("#btnRenameFile").show();
                $("#btnPopupShare").show();
                $("#btnPopupLock").show();
                $("#btnDeleteFile").show();
                $("#btnPopupChangeprop").show();
                if ($('.headdingLinks').text() == "Shared by Me" ||$('.headdingLinks').text() == "Shared with Me") {//Bhawana added in bug fixing
                    $("#btnPopupShare").hide();
                    $("#btnMoveFile").hide();
                }
                
            }
             $("#liSahringMsg").hide();//17 jan 23
            if ($(".headdingLinks").text() == "Shared by Me" || $(".headdingLinks").text() == "Shared with Me") {
                $(".btnNotSharedTab").hide();
                //17 jan 23
                $("#btnChangeProp").hide();
                $("#liSahringMsg").show();
                if(MataDataReq!=undefined&&(MataDataReq==true||MataDataReq=='true'))
                {
                    $("#divFileViewerProperties").hide();
                    $("#divFileViewerFileDetails").hide();
                }
                else{
                    $("#divFileViewerProperties").show();
                    $("#divFileViewerFileDetails").show();
                }
                $("#txtDocComments").hide();
                $("#VerHisParent").hide();
                $("#AuditHisParent").hide();
                $("#fileDetailCopyLink").hide();
            }
            else{
                 $("#divFileViewerProperties").show();
                $("#divFileViewerFileDetails").show();
                $("#txtDocComments").show();
                $("#VerHisParent").show();
                $("#AuditHisParent").show();
                $("#fileDetailCopyLink").show();
                 $("#btnChangeProp").show();

            }
            if($(".headdingLinks").text() == "Shared with Me")// Bhawana 4 jan 23
            {
                $('.txtSharingHistoy').hide();
            }
            // to hide in teams mobile app
            var isMobile = Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1;
            var my_url = $(location).attr('href');
            var my_custm_val = my_url.slice(-5);
            if((my_custm_val === "?TEAM") && (isMobile)) {
                if(location.href.split("/").pop().split("?").shift() == "Document.aspx")
                 {
                     $("#ParentFullView").hide();
                    $("#divEditView").hide();
                 }
            }
             waitingDialog.hide();
        },
        eror: function (data) {
        	waitingDialog.hide();
            $('#ModalDisplayProperty').modal('show');
            console.log(JSON.stringify(data));
            if ($(".headdingLinks").text() == "Shared by Me" || $(".headdingLinks").text() == "Shared with Me") {
                $(".btnNotSharedTab").hide();
            }
            else {
                $(".btnNotSharedTab").show();
            }
        }
    }).fail(function (error) {
    	waitingDialog.hide();
        if (DiaplayServerRelUrl.search(/\bDocuments\b/) >= 0) {
            alert('Attempted to perform an unauthorized operation');
        }
        else {
            alert(error.responseJSON.error.message.value);
        }
        if ($(".headdingLinks").text() == "Shared by Me" || $(".headdingLinks").text() == "Shared with Me") {
            $(".btnNotSharedTab").hide();
        }
        else {
            $(".btnNotSharedTab").show();
        }
        return false;
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
	$("#btnPopupShare").hide();
	$("#btnPopupLock").hide();
	$("#btnPopupChangeprop").hide();
	IntervalId = setInterval(function () {
		//$("#iframeFile-viewer").attr('style', 'min-height: calc(100vh - 104px) !important; height: calc(100vh - 104px) !important;margin-top: -58px;width: 100% !important;');
		$("#iframeFile-viewer").contents().find("button[name=Close].ms-CommandBarItem-link").remove();
        $("#iframeFile-viewer").contents().find("button[data-automationid=copy-link].ms-Button--commandBar").remove();
        $("#iframeFile-viewer").contents().find("button[data-automationid=share].ms-Button--commandBar").remove();
        $("#iframeFile-viewer").contents().find("button[data-automationid=overflowButton].ms-Button--commandBar").remove();
        $("#iframeFile-viewer").contents().find("button[data-automationid=showProperties].ms-Button--commandBar").remove();
        $("#iframeFile-viewer").contents().find("button[data-automationid=fileTitle].ms-Button--commandBar").remove();
        $("#iframeFile-viewer").contents().find("button[name=Open].ms-Button--commandBar").remove();
    }, 2000);
}

//to get permission from 'Titan_Permission' column
function FilePermissionForUser(FileOrFolder) {
    var arrUserPermison = [];
    var arrTemp = [];
    regExp = /\(([^)]+)\)/;
    if (FileOrFolder.toLowerCase() == 'folder') {
        var webURL = SiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + $("#FilePath").text() + "')?$expand=ListItemAllFields,Author,Folder/Author&$select=ListItemAllFields/Titan_Permission";
    }
    else {
        var webURL = SiteUrl + "/_api/web/GetFileByServerRelativeUrl('" + $("#FilePath").text() + "')?$expand=ListItemAllFields,Author,Files/Author&$select=ListItemAllFields/Titan_Permission";
    }
    $.ajax({
        url: webURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var FileValue = data.d.ListItemAllFields;
            if (FileValue.Titan_Permission != null && FileValue.Titan_Permission != "" && FileValue.Titan_Permission != "null") {
                arrUserPermison = FileValue.Titan_Permission.split('<br>');
                if (arrUserPermison.length > 0) {
                    for (var i = 0; i < arrUserPermison.length; i++) {
                        if (arrUserPermison[i].trim() != "") {
                            if (regExp.exec(arrUserPermison[i].trim()) != null) {
                                if (regExp.exec(arrUserPermison[i].trim())[1] == _spPageContextInfo.userEmail) { //to check if User is in Permission History
                                    if (arrUserPermison[i].search(/\bFull Control\b/) >= 0) {
                                        arrTemp.push({
                                            UserFullAccess: true,
                                            UserContri: false,
                                            UserReader: false
                                        });
                                        break;
                                    }
                                    else if (arrUserPermison[i].search(/\bEdit\b/) >= 0) {
                                        arrTemp.push({
                                            UserFullAccess: false,
                                            UserContri: true,
                                            UserReader: false
                                        });
                                        break;
                                    }
                                    else {
                                        arrTemp.push({
                                            UserFullAccess: false,
                                            UserContri: false,
                                            UserReader: true
                                        });
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (arrTemp.length > 0) {
                        arrPermission = [];
                        arrPermission = arrTemp.filter(function (f) { return f; });
                    }
                }
            }
        },
        eror: function (data) {
            alert(JSON.stringify(data));
            return false;
        }
    });
}

function ContainsExactWord(sentence, compare) {
    var returnValue = false;
    var words = sentence.split(":");
    for (var i = 0; i < words.length; ++i) {
        if (words[i].trim() === compare) {
            returnValue = true;
            break;
        }
    }
    return returnValue;
}

//get sharing Info for 'Shared By Me'
function getSharingInfo(DocId) {
    $("#ParentAck").hide();
    var Query = "?$select=*,Author/Title,SharedUsers/Title&$expand=Author,SharedUsers&$orderby=Created desc&$filter=DocumentID eq '" + DocId + "' and (PermissionStatus ne 'Revoked' or PermissionStatus ne 'Deleted' or PermissionStatus ne 'RevokePending')";
    $.when(getItemsWithQuery('SharedDocument', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SharingInfo) {
        if (SharingInfo.length > 0) {
            currentSharedItemId = '';
            $("#txtShareBy").text(SharingInfo[SharingInfo.length - 1].Author.Title);
            $("#txtShareOn").text(titanForWork.convertJSONDateAMPMWithDate(SharingInfo[SharingInfo.length - 1].Created));
            $("#txtSharePermission").text(SharingInfo[SharingInfo.length - 1].PermissionType);
            $("#ShareTabSharing").text("Shared with " + SharingInfo[SharingInfo.length - 1].SharedUsers.results[0].Title);
        }
    });
}

//get Sharing Info for 'Shared With Me'
function getSingleShareInfo(DocId, SharedId) {
    var Query = "?$select=*,Author/Title,SharedUsers/Title&$expand=Author,SharedUsers&$orderby=Created desc&$filter=Id eq '" + SharedId + "' and DocumentID eq '" + DocId + "' and (PermissionStatus ne 'Revoked' or PermissionStatus ne 'Deleted' or PermissionStatus ne 'RevokePending')";
    $.when(getItemsWithQuery('SharedDocument', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SharingInfo) {
        if (SharingInfo.length > 0) {
            currentSharedItemId = SharingInfo[0].Id;
            if (SharingInfo[0].NeedAcknowledgement == true) {
                getAcknowledgeStatus(SharingInfo[0].Id, DocId);
            }
            else {
                $("#ParentAck").hide();
            }
            $("#txtShareBy").text(SharingInfo[0].Author.Title);
            $("#txtShareOn").text(titanForWork.convertJSONDateAMPMWithDate(SharingInfo[0].Created));
            $("#txtSharePermission").text(SharingInfo[0].PermissionType);
            $("#ShareTabSharing").text("Shared with " + SharingInfo[0].SharedUsers.results[0].Title);
        }
        else {
            $("#ParentAck").hide();
            $("#txtShareBy").text('');
            $("#txtShareOn").text('');
            $("#txtSharePermission").text('');
            $("#ShareTabSharing").text('');
        }
    });
}



//get Status of Document of Acknowledgement
function getAcknowledgeStatus(SharedDocId, LibraryDocId) {
    $("#ParentAck").show();
    var AckId = '';
    $("#ParentAck").empty().append('<div class="breakbox"><input type="checkbox" id="txtAcknoldge"><label class="detail-label" id="AckHeading">Acknowledgement</label></div><div class="breakbox"><label class="detail-label" id="AckText">By clicking this you agree that you understand and acknowledge this document.</label></div>');
    var restQuery = "?$top=5000&$select=*,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedDocId + "' and ViewsBy/EMail eq '" + _spPageContextInfo.userEmail + "'";
    $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
        if (DocumentAcknowledgement.length > 0) {
            AckId = DocumentAcknowledgement[0].Id;
            if (DocumentAcknowledgement[0].Acknowledge == true) {
                $("#AckHeading").text('Acknowledged');
                $("#AckHeading").css('color', 'green');
                $("#AckText").hide();
                $("#txtAcknoldge").prop('disabled', 'disabled');
                $("#txtAcknoldge").prop('checked', 'checked');
            }
            else {
                if (DocumentAcknowledgement[0].View != true) {
                    ViewAckDocument(SharedDocId, LibraryDocId);
                }
                $("#AckHeading").text('Acknowledge');
                $("#AckHeading").css('color', 'black');
                $("#AckText").show();
                $("#txtAcknoldge").prop('disabled', '');
                $("#txtAcknoldge").prop('checked', '');
                $("#txtAcknoldge").click(function () {
                    AcknowledgeDocument(AckId);
                });
            }
        }
        else {
            AckId = ViewAckDocument(SharedDocId, LibraryDocId);
            $("#AckHeading").text('Acknowledge');
            $("#AckHeading").css('color', 'black');
            $("#AckText").show();
            $("#txtAcknoldge").prop('disabled', '');
            $("#txtAcknoldge").prop('checked', '');
            $("#txtAcknoldge").click(function () {
                AcknowledgeDocument(AckId);
            });
        }
    });
}

//Acknowledge the file - Add mode
function AcknowledgeDocument(AckId) {
    if (confirm("Are you sure to acknowledge this document ?") == true) {
        var Metadata;
        if (CurrentIpAddress == undefined || CurrentIpAddress == null) {
            CurrentIpAddress = '';
        }
        $("#txtAcknoldge").prop('disabled', 'disabled');
        Metadata = {
            __metadata: { 'type': 'SP.Data.DocumentAcknowledgementListItem' },
            'Acknowledge': true,
            'IPAddress': CurrentIpAddress,
            'ActionByTimeZone': LoggedIn_TimeZone
        };
        var dfd = $.Deferred();
        var URL = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('DocumentAcknowledgement')/Items(" + AckId + ")";
        $.ajax({
            url: URL,
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
            success: function (RESULT) {
                $("#AckHeading").text('Acknowledged');
                $("#AckHeading").css('color', 'green');
                $("#AckText").hide();
                $("#tabSharedToMe").trigger("click");
            },
            error: function (error) {
                alert(JSON.stringify(error));
                $("#txtAcknoldge").prop('disabled', '');
                dfd.reject(error);
            }
        });
        return dfd.promise();
    }
}


//Acknowledge the file - view mode
function ViewAckDocument(SharedDocId, LibraryDocId) {
    var Metadata;
    var AckId = '';
    Metadata = {
        __metadata: { 'type': 'SP.Data.DocumentAcknowledgementListItem' },
        'ViewsById': _spPageContextInfo.userId,
        'Title': $("#FileName").text(),
        'DocumentID': parseInt(SharedDocId),
        'DocID': parseInt(LibraryDocId)
    };
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentAcknowledgement')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            AckId = data.d.Id;
        },
        error: function (error) {
            alert(JSON.stringify(error));
            $("#txtAcknoldge").prop('disabled', '');
        }
    });
    return AckId;
}

//check out any file
function Checkoutfile(Action) {
    var dfd = $.Deferred();
    $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
        RequestDigest = GetFormDigestValue
    });
   // var selFile=fixedDecodeURIComponent(SelectedFileServerURL);
    var chkURL=CopySourceURL + "/_api/web/getfilebyserverrelativePath(decodedurl='" + fixedEncodeURIComponent(SelectedFileServerURL) + "')/checkout";
    $.ajax({
        url: chkURL,//CopySourceURL + "/_api/web/getfilebyserverrelativeurl('" + SelectedFileServerURL + "')/checkout",
        method: "POST",
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest': RequestDigest
        },
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (Action == "") {
                FileCheckOutBy = _spPageContextInfo.userDisplayName;
                alert("File has been locked.");
                $(".LockDisable").attr("disabled", "disabled");
                $("#FileEditModal").prop("disabled", "");
                $("#btnApproval").hide();
                $("#LockStatus").show();
                $("#LockStatus").text("Locked by me");
                $("#lockeffect .texthere").text("Unlock");
                $('#lockeffect .unlock').show();
                $('#lockeffect .lock').hide();
            }
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (Action == "") {
                if (error.responseText.includes("Access denied") == true) {
                    alert("You don't have the required permission to perform this operation.");
                    return false;
                }
                else {
                    alert(error.responseText);
                    return false;
                }
            }
            else {
                console.log(error.responseText);
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Publish the file
function CheckInfile(Action) {
    var dfd = $.Deferred();
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
   // var selFile=fixedDecodeURIComponent(SelectedFileServerURL);
    var Metadata = undefined;
    var chkURL=CopySourceURL + "/_api/web/GetFileByServerRelativePath(decodedurl='" + fixedEncodeURIComponent(SelectedFileServerURL) + "')/CheckIn()"; 
    $.ajax({
        url:chkURL,// CopySourceURL + "/_api/web/GetFileByServerRelativeUrl('" + SelectedFileServerURL + "')/CheckIn()",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (Action == "") {
                FileCheckOutBy = '';
                alert("File has been unlocked.");
                $(".LockDisable").prop("disabled", "");
                if ($("#FileApproval").text() == '') {
                    $("#btnApproval").show();
                }
            }
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (Action == "") {
                if (error.responseText.includes("Access denied") == true) {
                    alert("You don't have the required permission to perform this operation.");
                    return false;
                }
                else {
                    alert(error.responseText);
                    return false;
                }
            }
            else {
                console.log(error.responseText);
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}
//Publish the file
function UndoCheckOutfile() {
    var dfd = $.Deferred();
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
   // var selFile=fixedDecodeURIComponent(SelectedFileServerURL);
    var chkURL=CopySourceURL + "/_api/web/GetFileByServerRelativePath(decodedurl='" + fixedEncodeURIComponent(SelectedFileServerURL) + "')/undocheckout()";
    $.ajax({
        url:chkURL,// CopySourceURL + "/_api/web/GetFileByServerRelativeUrl('" + SelectedFileServerURL + "')/undocheckout()",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": RequestDigest,
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            FileCheckOutBy = '';
            alert("File has been unlocked.");
            $(".LockDisable").prop("disabled", "");
            $("#lockeffect").prop("disabled", "");
            $("#lockeffect").show();
            $("#LockStatus").hide();
            $("#btnUndoLock").hide();
            $("#lockeffect .texthere").text("Lock");
            $('#lockeffect .unlock').hide();
            $('#lockeffect .lock').show();
            $("#btnDeleteFile").prop("disabled", "");
            $("#LoackMove").prop("disabled", "");
            $("#btnShareFile").prop("disabled", "");
            $("#btnRenameFile").prop("disabled", "");
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.includes("Access denied") == true) {
                alert("You don't have the required permission to perform this operation.");
                return false;
            }
            else {
                alert(error.responseText);
                return false;
            }
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


//get check out by user name
function getCheckedOutBy() {
    var checkOutBy = '';
    var ServerRelativeUrlofFile = SiteUrl + "/_api/web/GetFileByServerRelativeUrl('" + SelectedFileServerURL + "')/CheckedOutByUser/Title"
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
function getCheckedOutByPath() {
    var checkOutBy = '';
    var ServerRelativeUrlofFile = SiteUrl + "/_api/web/GetFileByServerRelativePath(decodedurl='" +fixedEncodeURIComponent(SelectedFileServerURL) + "')/CheckedOutByUser/Title"
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


//to get file version
function GetFileVersion(itemURL, SiteURL, FileName, Title) {
   //Bhawana to handle special character
    var webURL = SiteURL + "/_api/Web/GetFileByServerRelativePath(decodedUrl='" + fixedEncodeURIComponent(itemURL) + "')/Versions?$select=*,CreatedBy/Title,CreatedBy/EMail&$expand=CreatedBy,fields";
   // var webURL = SiteURL + "/_api/Web/GetFileByServerRelativeUrl('" + itemURL + "')/Versions?$select=*,CreatedBy/Title,CreatedBy/EMail&$expand=CreatedBy,fields";
    $.ajax({
        url: webURL,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function (data) {
            var itemsVersion = data.d.results;
           // $("#VerHisParent").empty().append('<a class="detail-panel-inner-link" href="javascript:void(0);" id="btnVerHist">Version History</a>');
            $("#VerHisParent").empty().append('<a class="detail-panel-inner-link" href="javascript:void(0);" id="btnVerHist">Old Versions</a>');
            $('#btnVerHist').click(function (e) {
                BindVersionHistory(itemsVersion, FileName, Title, SiteURL);
            });
            $("#AuditHisParent").empty().append('<a class="detail-panel-inner-link" href="javascript:void(0);" id="btnAuditHist">Audit Trail</a');
            $('#btnAuditHist').click(function (e) {
                GetAuditHistory(itemURL, SiteURL, FileName, Title);
            });
           /* if (itemsVersion.length > 0) {
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
            RestQuery = "?$select=Email,LogonName/EMail,Designation,Department/Title,AttachmentFiles&$expand=LogonName,Department,AttachmentFiles&$filter=LogonName/EMail eq '" + array[ver].CreatedBy.Email + "' or Email eq '" + array[ver].CreatedBy.Email + "'&$top=5000";
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
            Version += '<div class="designationtype"><h3 class="namesection">' + array[ver].CreatedBy.Title + '</h3><span>' + EmpDesg + '</span>, <span>' + EmpDept + '</span></div></div></td>';
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

//Add, delete and get Favorite starts -----------------------
//Check if Document is added to favorite
function checkFavoriteFile() {
    var Query = "?$select=*,Id,Title,User/Id,User/EMail&$expand=User&$filter=Category eq 'Document' and FileName eq '" + $("#FileName").text() + "' and User/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery('MyFavorites', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (FavResults) {
        if (FavResults.length > 0) {
            FavouriteId = FavResults[0].Id;
            $("#txtFavorite").text("Remove from Favorite");
            $('.unfillstar').hide();
            $('.fillstar').show();
        }
    });
}

//Add to favorite
function AddFavoriteFile() {
    var ShareType = getfavoriteType();
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
        'LibraryName': ShareType,
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
            $("#txtFavorite").text("Remove from Favorite");
            $("#liFavoriteDocuments").show();
            //alert("Added to favorite.");
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}

//Remove from Favorite
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
            var restQueryPersonalDMS = "?$top=50&$select=*,User/Id&$expand=User&$orderby=Modified desc&$filter= User/Id eq '" + _spPageContextInfo.userId + "' and Category  eq 'Document' and Active eq '1'";
            $.when(getItemsWithQuery("MyFavorites", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function (MyFavorites) {
                if (MyFavorites.length == 0) {
                    $("#liFavoriteDocuments").hide();
                    $("#liFavoriteDocuments").removeClass("active");
                    $('#liMyDocuments').addClass('active');
                }
            });
        },
        error: function (data) {
            alert(data.responseJSON.error);
        }
    });
}

//Get Librray Name of Favorite files
function getfavoriteType() {
    var ShareType = '';
    if (currentSectionType == "My Documents") {
        ShareType = "My-DMS: " + _spPageContextInfo.userDisplayName;
    }
    else if (currentSectionType == 'Department') {
        ShareType = "Department: " + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'Group Documents') {
        ShareType = "Group: " + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'ProjectDocuments') {
        ShareType = "Project: " + $(".headdingLinks").text();
    }
    else if (currentSectionType == "GuestDocuments") {
        ShareType = "Guest: " + $(".headdingLinks").text();
    }
    return ShareType;
}

//Add to favorite to multiple files
function AddFavoriteFileMulti() {
    var ShareType = getfavoriteType();
    arrFileFolder.forEach(function (entry, index) {
        if (entry.type == 'file' && IsFileFavorite(entry.FileFolderName, entry.DocumentId) == false) {
            var Metadata;
            Metadata = {
                __metadata: { 'type': 'SP.Data.MyFavoritesListItem' },
                'Title': entry.FileFolderName,
                'Name': entry.FileFolderName,
                'FileName': entry.FileFolderName,
                'Category': 'Document',
                'Link': '',
                'UserId': _spPageContextInfo.userId,
                'SiteLink': entry.SiteURL,
                'DMSName': entry.SelectedLibrary,
                'DocumentID': parseInt(entry.DocumentId),
                'DocumentLink': entry.CopyFileLink,
                'LibraryName': ShareType,
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
                    if (arrFileFolder.length == (index + 1)) {
                        alert("File(s) have been added to favorite.");
                        arrFileFolder = [];
                        $("#liFavoriteDocuments").show();
                        $(".chkFileFolder").prop("checked", "");
                    }
                },
                error: function (error) {
                    console.log(JSON.stringify(error));
                    dfd.reject(error);
                }
            });
            return dfd.promise();
        }
        else {
            if (arrFileFolder.length == (index + 1)) {
                alert("All files have been added to favorite.");
                arrFileFolder = [];
                $("#liFavoriteDocuments").hide();
                $(".chkFileFolder").prop("checked", "");
            }
        }
    });
}

//to check if file is laready added to favorite
function IsFileFavorite(FileName, DOCId) {
    IsAdded = false;
    var Query = "?$select=*,Id,Title,User/Id,User/EMail&$expand=User&$filter=Category eq 'Document' and FileName eq '" + FileName + "' and DocumentID eq '" + DOCId + "' and User/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery('MyFavorites', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (FavResults) {
        if (FavResults.length > 0) {
            IsAdded = true;
        }
    });
    return IsAdded;
}

//Add, delete and get Favorite ends -----------------------

//Bind Notify mail popup to sent mail to permitted users
function NotifyEmail() {
    var ShareType = [];
    $("#NotifyHeaderSelect").show();
    $("#btnSendNotifyMail").show();
    var ChkCOunt = 1;
    var Notifyhtml = '';
    if (currentSectionType == 'Department') {
        var Query = "?$select=Department/Id,Company/Id,Email,LogonName/Title,FullName,AttachmentFiles,Status&$orderby=FullName asc&$expand=Department,Company,LogonName,AttachmentFiles&$filter=Status eq 'Active' and Department/Id eq '" + Logged_DepartmentId.toString() + "' and Company/Id eq '" + Logged_CompanyId + "' ";
        $.when(getItemsWithQuery("Employees", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Employee) {
            if (Employee.length > 0) {
                for (var i = 0; i < Employee.length; i++) {
                    if (Employee[i].AttachmentFiles.results.length > 0) {
                        employeePicURL = Employee[i].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(Employee[i].Email);
                    }
                    Notifyhtml += '<div class="listofemployee" >' +
                        '<input type="checkbox" name="" Id="checkbox' + i + '" class="checkse chkNotify">' +
                        '<div class="row">' +

                        '<div class="listimg col-md-2">' +
                        '<img src="' + employeePicURL + '" alt="">' +
                        '</div>' +
                        '<div class="col-sm-10 user_detail_box">' +
                        '<a href="#" class="emplyeename_new">' + Employee[i].LogonName.Title + '</a>' +
                        '<div class="emilbox">' +
                        '<h4>' + Employee[i].Email + '</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $("#divlistofemployee").empty().append(Notifyhtml);
            }
            else {
                $("#NotifyHeaderSelect").hide();
                $("#btnSendNotifyMail").hide();
                $("#divlistofemployee").empty().append('<div class="listofemployee">No Employee found.</div>');
            }
        });
    }
    else if (currentSectionType == 'Group Documents') {
        var Query = "?$select=Title,EmployeeName/EMail,EmployeeName/Title&$expand=EmployeeName&$filter=Title eq '" + $(".headdingLinks").text() + "' ";
        $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TeamMember) {
            if (TeamMember[0].EmployeeName.results != null) {
                for (var i = 0; i < TeamMember[0].EmployeeName.results.length; i++) {
                    employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TeamMember[0].EmployeeName.results[i].EMail);
                    Notifyhtml += '<div class="listofemployee" >' +
                        '<input type="checkbox" name="" Id="checkbox' + i + '" class="checkse chkNotify">' +
                        '<div class="row">' +

                        '<div class="listimg col-md-2">' +
                        '<img src="' + employeePicURL + '" alt="">' +
                        '</div>' +
                        '<div class="col-sm-10 user_detail_box">' +
                        '<a href="#" class="emplyeename_new">' + TeamMember[0].EmployeeName.results[i].Title + '</a>' +
                        '<div class="emilbox">' +
                        '<h4>' + TeamMember[0].EmployeeName.results[i].EMail + '</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $("#divlistofemployee").empty().append(Notifyhtml);
            }
            else {
                $("#NotifyHeaderSelect").hide();
                $("#btnSendNotifyMail").hide();
                $("#divlistofemployee").empty().append('<div class="listofemployee">No Employee found.</div>');
            }
        });
    }
    else if (currentSectionType == 'ProjectDocuments') {
        var Query = "?$select=Title,Project/Title,TeamMember/EMail,TeamMember/Title&$expand=TeamMember,Project&$filter=Project/Title eq '" + $(".headdingLinks").text() + "' ";
        $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TeamMember) {
            if (TeamMember.length > 0) {
                for (var i = 0; i < TeamMember.length; i++) {
                    employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(TeamMember[i].TeamMember.EMail);
                    Notifyhtml += '<div class="listofemployee" >' +
                        '<input type="checkbox" name="" Id="checkbox' + i + '" class="checkse chkNotify">' +
                        '<div class="row">' +

                        '<div class="listimg col-md-2">' +
                        '<img src="' + employeePicURL + '" alt="">' +
                        '</div>' +
                        '<div class="col-sm-10 user_detail_box">' +
                        '<a href="#" class="emplyeename_new">' + TeamMember[i].TeamMember.Title + '</a>' +
                        '<div class="emilbox">' +
                        '<h4>' + TeamMember[i].TeamMember.EMail + '</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $("#divlistofemployee").empty().append(Notifyhtml);
            }
            else {
                $("#NotifyHeaderSelect").hide();
                $("#btnSendNotifyMail").hide();
                $("#divlistofemployee").empty().append('<div class="listofemployee">No Employee found.</div>');
            }
        });
    }
    else if (currentSectionType == "GuestDocuments") {
        Notifyhtml = '';
        ChkCOunt = -1;
        var Query = "?$select=Title,InternalMembers/EMail,InternalMembers/Title,InternalSupervisor/EMail,InternalSupervisor/Title,Supervisor/EMail,Supervisor/Title&$expand=InternalMembers,InternalSupervisor,Supervisor&$filter=Title eq '" + $(".headdingLinks").text() + "' ";
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
        //$('#divlistofemployee').parent('.coverbox_list').css({'overflow':'auto'});
    }
    else {
        $("#NotifyHeaderSelect").hide();
        $("#divlistofemployee").empty().append('<div class="listofemployee" id="NotifyPPlPicker"></div>');
        $('.coverbox_list').has('#NotifyPPlPicker').addClass('activing');
        initializePeoplePicker("NotifyPPlPicker", true);
        //$('#NotifyPPlPicker').parent('.coverbox_list').css({'overflow':'visible'});
    }
    $(".chkNotify").click(function (e) {
        if (this.checked == false) {
            $('#checkall').prop("checked", "");
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
    var  subcat=$('#FileDocType').text()!=""?'(' + $('#FileDocType').text() + ')':"";
    var body = '<table>' +
        '<tr>' +
        '<td colspan="2"><p style="margin:15px 0; padding:0;">Notification from <span>' + _spPageContextInfo.userDisplayName + '</span> regarding the below document</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b data-localize="File Name">File Name: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileName').text() + '</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b data-localize="Title">Title: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileDocSubType').text() + '</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b data-localize="Category">Category: </b></p></td>' +
        
        //'<td><p style="margin:0; padding:0;">' + $('#FileDocSubType').text() + '(' + $('#FileDocType').text() + ')</p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileDocSubType').text() + subcat + '</p></td>' +
        '</tr>' +

        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b data-localize="Reference">Reference: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileReference').text() + '</p></td>' +
        '</tr>' +

		'<tr>' +
        '<td><p style="margin:0; padding:0;"><b data-localize="Author">Author: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileAuthorPopup').text() + '</p></td>' +
        '</tr>' +

		'<tr>' +
        '<td><p style="margin:0; padding:0;"><b data-localize="Details">Details: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#FileDetalis').text() + '</p></td>' +
        '</tr>' +


        '<tr>' +
        '<td><p style="margin:0; padding:0;"><b>Message: </b></p></td>' +
        '<td><p style="margin:0; padding:0;">' + $('#txtMessage').val().replaceAll('\n', '</br>') + '</p></td>' +
        '</tr>' +


        '</br></br></br></br><tr>' +
         
        '<td><p><a href="' + $('#linkdoc').val() + '">Click here</a> to open the document.</p></td>' +
        '<td><p> </p></td>' +
       //'<td><a href="' + emailLink + '">Click here</a> to open the document.</td>' +//Bhawana
        '</tr>' +

        '</table>' +
        '<p style="margin:15px 0; padding:0;">This is an auto generated e-mail. Please do not reply.</p>';

    for (var k = 0; k < LabelDefaultLangauge.length; k++) {
        if (body.includes(LabelDefaultLangauge[k].Key) == true) {
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

//If user has REad permission the send notify to TEam
function getTeamUsers() {
    var ShareType = [];
    if (currentSectionType == 'Department') {
    }
    else if (currentSectionType == 'Group Documents') {
        ShareType.push("Group");
        ShareType.push($(".headdingLinks").text());
    }
    else if (currentSectionType == 'ProjectDocuments') {
        ShareType.push("Project");
        ShareType.push($(".headdingLinks").text());
    }
    else if (currentSectionType == "GuestDocuments") {
        ShareType.push("Guest");
        ShareType.push($(".headdingLinks").text());
    }
    return ShareType;
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

//Delete the file in case of 'Delete' and 'Move'
function DeleteFileFromSource(Action) {
    if (CopyLibrary == "Shared%20Documents"||CopyLibrary == "Shared Documents") {
        CopyLibrary = "Documents";
    }
    $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
        RequestDigest = GetFormDigestValue
    });
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
            CopyFolderName = '';
            if (Action == "DeleteFile") {
                ChangeRevokeMessage("Revoked due to file Deletion", DocumentId, $("#FileName").text().trim());
                alert("File has been successfully deleted.");
                var tempDocName = fixedDecodeURIComponent(Documentname);
                $("#ModalDisplayProperty").modal('hide');
                if (fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                    tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                }
                else if (fixedDecodeURIComponent(Documentname) == 'Documents') {
                    tempDocName = tempDocName.replace("Documents", "Shared Documents");
                }
                GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
            }
            else {
                ChangeRevokeMessage("Revoked due to file moved", DocumentId, $("#FileName").text().trim());
                alert("File has been successfully moved.");
                $("#ModalDisplayProperty").modal('hide');
                var tempDocName = fixedDecodeURIComponent(Documentname);
                if (fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                    tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                }
                else if (fixedDecodeURIComponent(Documentname) == 'Documents') {
                    tempDocName = tempDocName.replace("Documents", "Shared Documents");
                }
                GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
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


//----------------------------DMS Move and Copy code starts----------------------------------------------
//to bind the all the departments to which Logged_In user can access
function myShareDepartmentCopy() {
    var DocLibraries = '';
    var Query = "?$select=*,Department/DepartmentName,Department/ID&$top=5000&$expand=Department&$filter=(CompanyId eq '" + Logged_CompanyId + "' and ContributorsId eq '" + _spPageContextInfo.userId + "' and WebPartName eq 'DepartmentDocument_Access') or (CompanyId eq '" + Logged_CompanyId + "' and Owner eq '" + _spPageContextInfo.userId + "' and WebPartName eq 'Documents') ";
    $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" value=""></label></div></td>';
        DocLibraries += '<td class="text-left">My Documents</td><td class="text-left"></td></tr>';
        //Logged_In department
        var DeptURL = getDepartmentURL(Logged_DepartmentId);
        DeptURL = DeptURL + "/DepartmentalDMS/Forms/AllItems.aspx";
        DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkDepartments" value=""></label></div></td>';
        DocLibraries += '<td class="text-left">Department</td>';
        DocLibraries += '<td class="text-left"><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + DeptURL + '>' + Logged_DepartmentName + '</a></td></tr>';
        $.each(valuesArray, function (i, el) {
            var DeptURL = getDepartmentURL(el.Department.ID);
            DeptURL = DeptURL + "/DepartmentalDMS/Forms/AllItems.aspx";
            DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkProcessApprovers' + i + '" value=""></label></div></td>';
            DocLibraries += '<td class="text-left">Department</td>';
            DocLibraries += '<td class="text-left"><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + DeptURL + '>' + el.Department.DepartmentName + '</a></td></tr>';
        });
        $("#tbdyCopyFileLib").append(DocLibraries);
        BindProjectsCopy();
    });
}

//to get dept URL 
function getDepartmentURL(ItemId) {
    var DeptDocumentsUrl = '';
    var restQueryPersonalDMS = "?$select=ID,SiteURL,CompanyID/ID&$expand=CompanyID&$top=5000&$filter=CompanyID/ID eq '" + Logged_CompanyId + "' and ID eq '" + ItemId + "'";
    $.when(getItemsWithQuery("Departments", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function (ProjectDetailData) {
        if (ProjectDetailData.length > 0) {
            var siteURL = ProjectDetailData[0].SiteURL;
            if (siteURL != null && siteURL != "") {
                DeptDocumentsUrl = siteURL;
            }
        }
    });
    return DeptDocumentsUrl;

}

//to bind the all the Project with DMS URL to which Logged_In user can access
function BindProjectsCopy() {
    var DocLibraries = '';
    var uniqueValues = [];
    var Query = "?$select=DocumentPermission,TeamMember/Id,Project/Id,Project/ProjectName&$top=5000&$orderby=Project/ProjectName asc&$expand=TeamMember,Project&$filter=CompanyId eq '" + Logged_CompanyId + "' and TeamMemberId eq '" + _spPageContextInfo.userId + "' and Status eq 'Active'";
    $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        $.each(valuesArray, function (i, el) {
            if (uniqueValues.indexOf(el.Project.Id) == -1) {
                var ProjectURL = getProjectDMS(el.Project.Id);
                uniqueValues.push(el.Project.Id);
                DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkProjectTeamDetails' + i + '" value=""></label></div></td>';
                DocLibraries += '<td class="text-left">Project</td>';
                DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + ProjectURL + '>' + el.Project.ProjectName + '</a></td></tr>';
            }
        });
        $("#tbdyCopyFileLib").append(DocLibraries);
    });
    getGuestClientsCopy();
}

//to get the DMS URL of given project
function getProjectDMS(ItemId) {
    var myProjectDocumentsUrl = '';
    var restQueryPersonalDMS = "?$select=ID,ProjectName,ProjectSiteURL,ProjectInternalName&$top=5000&$filter=ID eq '" + ItemId + "'";
    $.when(getItemsWithQuery("ProjectDetails", restQueryPersonalDMS, _spPageContextInfo.webAbsoluteUrl)).done(function (ProjectDetailData) {
        if (ProjectDetailData.length > 0) {
            var siteURL = ProjectDetailData[0].ProjectName;
            if (ProjectDetailData[0].ProjectInternalName != null && ProjectDetailData[0].ProjectInternalName != "") {
                siteURL = ProjectDetailData[0].ProjectInternalName;
                myProjectDocumentsUrl = titanForWork.getQueryStringParameter("CompanySiteUrl") + "/DMS/" + siteURL + "/Documents/Forms/AllItems.aspx";
            }
        }
    });
    return myProjectDocumentsUrl;
}

//get all client in which Logged_In user is Internal member or Internal Supervisor
function getGuestClientsCopy() {
    var DocLibraries = '';
    var Query = "?$select=Id,Title,IsActive,CompanyID/Id,DocumentLibrary,InternalMembers/EMail,InternalSupervisor/EMail&$orderby=Title asc&$expand=CompanyID,InternalMembers,InternalSupervisor&$top=5000&$filter=DocumentLibrary ne null and IsActive eq '1' and InternalMembers/EMail eq '" + _spPageContextInfo.userEmail + "' or InternalSupervisor/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Clients) {
        if (Clients.length > 0) {
            for (var i = 0; i < Clients.length; i++) {
                var value = Clients[i];
                if (value.DocumentLibrary != null) {
                    DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkClientMaster' + i + '" value=""></label></div></td>';
                    DocLibraries += '<td class="text-left">Guest Client</td>';
                    DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + value.DocumentLibrary + '>' + value.Title + '</a></td></tr>';
                }
            }
        }
        $("#tbdyCopyFileLib").append(DocLibraries);
    });
    getCustomDMSCopy();
}

//get list of custom DMS
function getCustomDMSCopy() {
    var DocLibraries = '';
    var Query = "?$top=5000&$select=*,Author/Id,CompanyID/Id,EmployeeName/EMail,Contributors/EMail&$expand=Contributors,EmployeeName,Author,CompanyID&$orderby=Title asc&$filter=((EmployeeName/EMail eq '" + _spPageContextInfo.userEmail + "' or Contributors/EMail eq '" + _spPageContextInfo.userEmail + "') and Status eq 'Active')";//CompanyID/ID eq '" + Logged_CompanyId + "' and 
    $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (PersonalDMSData) {
        if (PersonalDMSData.length > 0) {
            for (var j = 0; j < PersonalDMSData.length; j++) {
                if (PersonalDMSData[j].Status == "Active") {

                    DocLibraries += '<tr><td><div class="checkbox m-0"><label><input class="DocLib" name="Library" type="radio" id="chkPersonalDMS' + j + '" value=""></label></div></td>';
                    DocLibraries += '<td class="text-left">Custom</td>';
                    DocLibraries += '<td><a href=javascript:void(0) style="cursor:text;color:black;" name = ' + PersonalDMSData[j].DMS_Link + '>' + PersonalDMSData[j].Title + '</a></td></tr>';
                }
            }
            $("#tbdyCopyFileLib").append(DocLibraries);
        }
    });
}

function getTreeView(Action) {
    var SiteURL = '';
    var LibraryName = '';
    var FolderName = '';
    var SelectedLibrary = '';
    if (Action.cells[1].innerHTML == "My Documents") {
        SiteURL = _spPageContextInfo.webAbsoluteUrl;
        FolderName = "DocumentManagementSystem/" + _spPageContextInfo.userEmail + "/";
        LibraryName = "DocumentManagementSystem";
        SelectedLibrary = 'My Documents';
    }
    else {
        var strLink = Action.cells[2].innerHTML.split('name="')[1].split('">')[0];
        const UrlLink = strLink.split('/Forms')[0];
        SiteURL = UrlLink.slice(0, UrlLink.lastIndexOf("/"));;
        FolderName = UrlLink.split('/')[UrlLink.split('/').length - 1] + "/";
        if (FolderName == "Documents/") {
            FolderName = "Shared Documents/";
        }
        LibraryName = FolderName.substring(0, FolderName.length - 1);
        SelectedLibrary = Action.cells[1].innerHTML + " : " + Action.cells[2].innerHTML.split('name="')[1].split('">')[1].split('</a>')[0];
    }
    bindTreeView(SiteURL, FolderName, LibraryName, SelectedLibrary);
}

function bindTreeView(SiteURL, folderUrl, library, SelectedLibrary) {
    $(".treesec").empty();
    $("#FolderNameCopy").text(SelectedLibrary);
    var FolderHTML = '';
    var Ownurl = SiteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + folderUrl + "')?$select=ID,FSObjType,EncodedAbsUrl&$top=5000&$expand=Folders,Folders/ListItemAllFields";
    $.ajax({
        url: Ownurl,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var folders = data.d.Folders.results;
            if (folders.length > 0) {
                FolderHTML += "<ul>";
                FolderHTML += '<li class="parent"><a class="DmsTree RootFolder" onclick="ClickFolder(this, \'' + SiteURL + '\', \'' + folderUrl + '\', \'' + library + '\');" href="javascript:void(0);">Root</a>';
                FolderHTML += "<ul>";
                for (var i = 0; i < folders.length; i++) {
                    if (folders[i].Name != "Forms") {
                        FolderHTML += '<li class="parent" id="treeNode_' + folders[i].ListItemAllFields.Id + '"><a class="DmsTree" onclick="ClickFolder(this, \'' + SiteURL + '\', \'' + folderUrl + folders[i].Name + '\', \'' + library + '\');" href="javascript:void(0);">' + folders[i].Name + '</a>';
                        FolderHTML += "<ul>";
                        FolderHTML += BindSubFolders(SiteURL, folderUrl + folders[i].Name + "/", library);
                        FolderHTML += "</ul>";
                        FolderHTML += "</li>";
                    }

                }
                FolderHTML += "</ul>";
                FolderHTML += "</ul>";
                $(".treesec").append(FolderHTML);

            }
            else {
                FolderHTML += "<ul>";
                FolderHTML += '<li class="parent"><a class="DmsTree RootFolder" onclick="ClickFolder(this, \'' + SiteURL + '\', \'' + folderUrl + '\', \'' + library + '\');" href="javascript:void(0);">Root</a>';
                FolderHTML += "<ul></ul></ul>";
                $(".treesec").append(FolderHTML);
            }
        }
    }).fail(function (error) {
        FolderHTML += '<div class="">Document library cannot be found.</div>';
        $(".treesec").append(FolderHTML);
        $("#txtPleaseWait").hide();
    });
    $("#txtPleaseWait").hide();
}


function BindSubFolders(SiteURL, folderUrl, library) {
    try {
        var SubFolderHTML = '';
        var Ownurl = SiteURL + "/_api/Web/GetFolderByServerRelativeUrl('" + folderUrl + "')?$select=ID,FSObjType,EncodedAbsUrl&$top=5000&$expand=Folders,Folders/ListItemAllFields";
        $.ajax({
            url: Ownurl,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" },
            async: false,
            success: function (data) {
                var folders = data.d.Folders.results;
                if (folders.length > 0) {
                    SubFolderHTML += "<ul>";
                    for (var i = 0; i < folders.length; i++) {
                        if (folders[i].Name != "Forms") {
                            SubFolderHTML += '<li class="parent" id="treeNode_' + folders[i].ListItemAllFields.Id + '"><a class="DmsTree" onclick="ClickFolder(this, \'' + SiteURL + '\', \'' + folderUrl + folders[i].Name + '\', \'' + library + '\');" href="javascript:void(0);">' + folders[i].Name + '</a>';
                            SubFolderHTML += "<ul>";
                            SubFolderHTML += BindSubFolders(SiteURL, folderUrl + folders[i].Name + "/", library);
                            SubFolderHTML += "</ul>";
                            SubFolderHTML += "</li>";
                        }
                    }
                    SubFolderHTML += "</ul>";

                }
            }
        });
        return SubFolderHTML;
    } catch (e) {
        alert(e.message);
        $("#txtPleaseWait").hide();
    }
}

var CopyLibrary = '';
function ClickFolder(Action, DestURL, Folder, library) {
    CopyDestURL = DestURL;
    CopyFolderName = Folder;
    if (CopyFolderName.search(/\bShared%20Documents\b/) >= 0) {
        CopyFolderName = CopyFolderName.replace('Shared%20Documents', "Documents");
    }
    $(".DmsTree").css({ 'text-shadow': '' });
    $(Action).css("text-shadow", "2px 0px 5px #1e90ff");
}

//Copy/Move the file
function copyFile() {
    var iserror=false;
    var sourceUrl = CopySourceURL;//provide source site url
    var destUrl = CopyDestURL;//provide destination site url 
    // Create a request executor.
    var sourceExecutor = new SP.RequestExecutor(sourceUrl);
    var targetExecutor = new SP.RequestExecutor(destUrl);
    var fileName = $('#FilePath').text();
    //provide file name with path 
    var fileContentUrl = sourceUrl + "/_api/web/GetFileByServerRelativeUrl('" + fileName + "')/$value";
    var targetSiteUrl = destUrl;

    var newFileName = $('#FileName').text();//New name of added file
    if (CopyFolderName.search(/\bShared Documents\b/) >= 0) {
        CopyFolderName = CopyFolderName.replace('Shared Documents', "Shared%20Documents");
    }
    //provide folder path to which file to be copied
    // Get the binary data.
    var result = data.body;

    var restUrl = targetSiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + encodeURIComponent(CopyFolderName) + "')/Files/Add(url='" + newFileName + "',overwrite=true)";

    $.ajax({
        url: targetSiteUrl + "/_api/contextinfo",
        type: "POST",
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data) {
            var digest = data.d.GetContextWebInformation.FormDigestValue;
            // Build executor action to retrieve the file data.
            if (fileContentUrl.search(/\bDocuments\b/) >= 0 || fileContentUrl.search(/\bShared Documents\b/) >= 0) {
                fileContentUrl = fileContentUrl.replace('Documents', "Shared Documents");
            }
            var getFileAction = {
                url: fileContentUrl,
                method: "GET",
                binaryStringResponseBody: true,
                success: function (getFileData) {
                    if (restUrl.search(/\bDocuments\b/) >= 0 || restUrl.search(/\bShared Documents\b/) >= 0) {
                        restUrl = restUrl.replace('Documents', "Shared Documents");
                    }
                    //if (targetSiteUrl != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(targetSiteUrl)).done(function (GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                    //}
                    // Build executor action to copy the file data to the new location.
                    var copyFileAction = {
                        url: restUrl,
                        method: "POST",
                        headers: {
                            "Accept": "application/json; odata=verbose",
                            "X-RequestDigest": RequestDigest
                        },
                        contentType: "application/json;odata=verbose",
                        binaryStringRequestBody: true,
                        body: getFileData.body,
                        success: function (copyFileData) {
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            $("#Backbtn").trigger('click');
                            $('input[name="Library"]').attr('checked', false);
                            $('#copymove').modal('hide');
                            if (IsMoving == true) {
                                DeleteFileFromSource('');
                            }
                            else {
                                if(!iserror)//20 jan 23
                                alert("File has been successfully copied.");
                                CopyDestURL = '';
                                CopyFolderName = '';
                            }
                            waitingDialog.hide();
                        },
                        error: function (ex) {
                            iserror=true;//20 jan 23
                            waitingDialog.hide();
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                                alert("You don't have the required permission to perform this operation.");
                                return false;
                            }
                            else 
                            if (ex.body.includes("is not valid") == true || ex.body.includes("not found") == true) {
                                alert("Source/destination file/folder has invalid name.Please rename file/folder before proceed.");
                                return false;
                            }
                            else {
                                alert(ex.body);
                                return false;
                            }
                            //show your 'failed' message
                        }
                    };

                    targetExecutor.executeAsync(copyFileAction);
                },
                error: function (ex) {
                    iserror=true;//20 jan 23
                    waitingDialog.hide();
                    RequestDigest = $("#__REQUESTDIGEST").val();
                    if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                        alert("You don't have the required permission to perform this operation.");
                        return false;
                    }
                    else 
                            if (ex.body.includes("is not valid") == true || ex.body.includes("not found") == true) {
                                alert("Source/destination file/folder has invalid name.Please rename file/folder before proceed.");
                                return false;
                            }
                    else {
                        alert(ex.body);
                        return false;
                    }
                }
            };
            sourceExecutor.executeAsync(getFileAction);
        },
        error: function (ex) {
            iserror=true;//20 jan 23
            waitingDialog.hide();
            RequestDigest = $("#__REQUESTDIGEST").val();
            //fail
            if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                alert("You don't have the required permission to perform this operation.");
                return false;
            }
            else 
                            if (ex.body.includes("is not valid") == true || ex.body.includes("not found") == true) {
                                alert("Source/destination file/folder has invalid name.Please rename file/folder before proceed.");
                                return false;
                            }
            else {
                alert(ex.body);
                return false;
            }
        }
    });
}

//Tree Structure Plugin code
function TreeStructure() {
    $.fn.filetree = function (method) {

        var settings = { // settings to expose
            //     animationSpeed      : 'fast',            
            collapsed: true,
            console: false
        }
        var methods = {
            init: function (options) {
                // Get standard settings and merge with passed in values
                var options = $.extend(settings, options);
                // Do this for every file tree found in the document
                return this.each(function () {
                    var $fileList = $(this);
                    $fileList.addClass('file-list').find('li')
                        //.has('ul') // Any li that has a list inside is a folder root
                            .addClass('folder-root closed')
                            .on('click', 'a[href="#"]', function (e) { // Add a click override for the folder root links
                                e.preventDefault();
                                $(this).parent().toggleClass('closed').toggleClass('open');

                                return false;
                            });
                    //alert(options.animationSpeed); Are the settings coming in
                });
            }
        }

        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.on("error", function () {
                console.log(method + " does not exist in the file exploerer plugin");
            });
        }
    }
    waitingDialog.hide();
}

//Check special characters in case Copy and move multiple files ----------------
function CheckValidFilesFolders()
{
     var format = /[`#$%&\=\[\]{};'"\\|,<>\?~]/;
     var isValidChar=true;
     var fileN= fixedDecodeURIComponent(Documentname); 
     validcharmsg="";    
     if(format.test(fileN))
    {
           isValidChar=false;
           validcharmsg="The source folder/file name is invalid. Operation could not perform.\n "+fileN+"\n"+"Please rename first excluding these characters  \"   *   '  :   <   >   ?   /  \   |     # % ";
           return isValidChar; 
    }
    fileN=fixedDecodeURIComponent(CopyFolderName);
    if(format.test(fileN))
    {
           isValidChar=false;
           validcharmsg="The destination folder name is invalid. Operation could not perform.\n "+fileN+"\n Please rename first excluding these characters  \"   *   '  :   <   >   ?   /  \   |    # % ";
           return isValidChar; 
    }
    arrFileFolder.forEach(function (entry, index)
    {
        fileN=entry.FileFolderName;
        if(format.test(fileN))
        {
           isValidChar=false;
           validcharmsg="The source folder/file name is invalid. Operation could not perform.\n "+fileN+"\n"+"Please rename first excluding these characters  \"   *   '  :   <   >   ?   /  \   |     # % ";
           return; 
        }
        if (entry.type == 'file') 
        {
            

        }
        else if (entry.type == 'folder') 
        {
            if (Documentname[Documentname.length - 1] == '/') {
                var folderName = Documentname;
            }
            else {
                var folderName = Documentname + '/';
            }
            folderName = folderName + entry.FileFolderName + '/';
            if(!checkValidInsideFilesFolders(folderName,entry.SiteURL) )
            {
                isValidChar=false;
               // validcharmsg="Source file/folder name has some invalid characters.Please rename.";
               return; 
            }       
            
        }
        if(isValidChar==false)
            return;
    });

    return isValidChar;
}
function checkValidInsideFilesFolders(folderName,eSiteURL)
{
    var isValidChar=true;
    var format = /[`#$%&\=\[\]{};'"\\|,<>\?~]/;
     $.when(getItemsWithQueryUsersDocumentsURL(folderName, eSiteURL)).done(function (DocumentGroup) {
                var folders = DocumentGroup.Folders.results;
                var files = DocumentGroup.Files.results;
                files.forEach(function (e, index) {
                    fileN=e.Name;
                    
                    if(format.test(fileN))
                    {
                        isValidChar=false;
                        validcharmsg="The source folder/file name is invalid. Operation could not perform.\n "+fileN+"\n"+"Please rename first excluding these characters  \"   *   '  :   <   >   ?   /  \   |     # % ";
                        return; 
                    }
                        
                });
                folders.forEach(function (e, index) {
                    fileN=e.Name;
                    if(format.test(fileN))
                    {
                        isValidChar=false;
                        validcharmsg="The source folder/file name is invalid. Operation could not perform.\n "+fileN+"\n"+"Please rename first excluding these characters  \"   *   '  :   <   >   ?   /  \   |     # % ";
                        return; 
                    }
                    var folderNamee = folderName + e.Name + '/';
                    checkValidInsideFilesFolders(folderNamee,eSiteURL) ;
                        
                });
 
            });
    return isValidChar;
}
//Check special characters in case single Copy and move file ----------------
function CheckValidFileFolderSingle()
{
     var format = /[`#$%&\=\[\]{};'"\\|,<>\?~]/;
     var isValidChar=true;
     var fileN= fixedDecodeURIComponent($('#FilePath').text().trim()); 
     validcharmsg="";    
     if(format.test(fileN))
    {
           isValidChar=false;
           validcharmsg="The source folder/file name is invalid. Operation could not perform.\n "+fileN+"\n"+"Please rename first excluding these characters  \"   *   '  :   <   >   ?   /  \   |     # % ";
           return isValidChar; 
    }
    fileN=fixedDecodeURIComponent(CopyFolderName);
    if(format.test(fileN))
    {
           isValidChar=false;
           validcharmsg="The destination folder name is invalid. Operation could not perform.\n "+fileN+"\n Please rename first excluding these characters  \"   *   '  :   <   >   ?   /  \   |    # % ";
           return isValidChar; 
    }
    

    return isValidChar;
}
//Copy and move multiple files ----------------
function copyFileMulti() {
    if(!CheckValidFilesFolders())
    {
        alert(validcharmsg);
        waitingDialog.hide();
        return false;
    }
    FailDueToCheckOut = 0;
   /* if (fixedDecodeURIComponent(Documentname)[fixedDecodeURIComponent(Documentname).length - 1] == '/') {
        var folderName = fixedDecodeURIComponent(Documentname);
    }
    else {
        var folderName = fixedDecodeURIComponent(Documentname) + '/';
    }*/
    arrFileFolder.forEach(function (entry, index) {

        if (fixedDecodeURIComponent(Documentname)[fixedDecodeURIComponent(Documentname).length - 1] == '/') {
            var folderName = fixedDecodeURIComponent(Documentname);
        }
        else {
            var folderName = fixedDecodeURIComponent(Documentname) + '/';
        }
        if (entry.type == 'file') {
            if (IsFileCheckout(folderName, entry.FileFolderName, entry.SiteURL, '') != true) {
                var sourceUrl = entry.SiteURL;//provide source site url
                var destUrl = CopyDestURL;//provide destination site url 
                // Create a request executor.
                var sourceExecutor = new SP.RequestExecutor(sourceUrl);
                var targetExecutor = new SP.RequestExecutor(destUrl);
                var fileName = entry.ServerURL;
                //provide file name with path 
                var fileContentUrl = sourceUrl + "/_api/web/GetFileByServerRelativeUrl('" + fileName + "')/$value";
                var targetSiteUrl = destUrl;

                var newFileName = entry.FileFolderName; //New name of added file
                if (CopyFolderName.search(/\bShared Documents\b/) >= 0) {
                    //CopyFolderName = CopyFolderName.replace('Shared Documents', "Shared%20Documents");
                }
                var result = data.body;
                //provide folder path to which file to be copied
                var restUrl = targetSiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + encodeURIComponent(CopyFolderName) + "')/Files/Add(url='" + newFileName + "',overwrite=true)";

                $.ajax({
                    url: targetSiteUrl + "/_api/contextinfo",
                    type: "POST",
                    async: false,
                    headers: {
                        "Accept": "application/json;odata=verbose"
                    },
                    success: function (data) {
                        var digest = data.d.GetContextWebInformation.FormDigestValue;
                        // Build executor action to retrieve the file data.
                        if (fileContentUrl.includes('/Documents/') == true) {
                            fileContentUrl = fileContentUrl.replace('/Documents/', '/Shared Documents/');
                        }
                        var getFileAction = {
                            url: fileContentUrl,
                            method: "GET",
                            async: false,
                            binaryStringResponseBody: true,
                            success: function (getFileData) {
                                // Get the binary data.
                                var result = data.body;
                                if (restUrl.search(/\bDocuments\b/) >= 0 || restUrl.search(/\bShared Documents\b/) >= 0) {
                                    restUrl = restUrl.replace('Documents', "Shared Documents");
                                }
                                //if (targetSiteUrl != _spPageContextInfo.webAbsoluteUrl) {
                                $.when(GetFormDigestValue(targetSiteUrl)).done(function (GetFormDigestValue) {
                                    RequestDigest = GetFormDigestValue
                                });
                                //}
                                // Build executor action to copy the file data to the new location.
                                var copyFileAction = {
                                    url: restUrl,
                                    method: "POST",
                                    async: false,
                                    headers: {
                                        "Accept": "application/json; odata=verbose",
                                        "X-RequestDigest": RequestDigest
                                    },
                                    contentType: "application/json;odata=verbose",
                                    binaryStringRequestBody: true,
                                    body: getFileData.body,
                                    success: function (copyFileData) {
                                        RequestDigest = $("#__REQUESTDIGEST").val();
                                        if (IsMoving == true) {
                                            if (entry.SelectedLibrary == "Shared%20Documents") {
                                                entry.SelectedLibrary = "Documents";
                                            }
                                            $.when(GetFormDigestValue(entry.SiteURL)).done(function (GetFormDigestValue) {
                                                RequestDigest = GetFormDigestValue
                                            });
                                            $.ajax({
                                                url: entry.SiteURL + "/_api/web/lists/GetByTitle('" + entry.SelectedLibrary + "')/items('" + entry.DocumentId + "')",
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
                                                    ChangeRevokeMessage("Revoked due to file moved", entry.DocumentId, entry.FileFolderName);
                                                    if (arrFileFolder.length == (index + 1)) {
                                                        $("#Backbtn").trigger('click');
                                                        $('input[name="Library"]').attr('checked', false);
                                                        $('#copymove').modal('hide');
                                                        if (FailDueToCheckOut == 0) {
                                                            waitingDialog.hide();
                                                            alert("Files have been successfully moved.");
                                                        }
                                                        else {
                                                            waitingDialog.hide();
                                                            alert(FailDueToCheckOut + " file(s) are locked, couldn't be moved.\nOther files(s) have been moved successfully.");
                                                        }
                                                        FailDueToCheckOut = 0;
                                                        CopyDestURL = '';
                                                        CopyFolderName = '';
                                                        arrFileFolder = [];
                                                        $(".chkFileFolder").prop("checked", "");
                                                        var tempDocName = fixedDecodeURIComponent(Documentname);
                                                        if (fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                                                            tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                                                        }
                                                        else if (fixedDecodeURIComponent(Documentname) == 'Documents') {
                                                            tempDocName = tempDocName.replace("Documents", "Shared Documents");
                                                        }
                                                        GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
                                                        $("#ModalDisplayProperty").modal('hide');
                                                    }
                                                },
                                                error: function (xhr, status, error) {
                                                    waitingDialog.hide();
                                                    if (xhr.responseText.includes("Access is denied") == true || xhr.responseText.includes("Access denied") == true) {
                                                        alert("You don't have the required permission on " + entry.FileFolderName + "  to perform this operation.");
                                                        return false;
                                                    }
                                                    else if (xhr.responseText.includes("Access is denied") == true || xhr.responseText.includes("Access denied") == true) {
                                                        alert("You don't have the required permission on " + entry.FileFolderName + "  to perform this operation.");
                                                        return false;
                                                    }
                                                    else {
                                                        alert(xhr.responseText);
                                                        return false;
                                                    }
                                                }
                                            });

                                        }
                                        else {
                                            if (arrFileFolder.length == (index + 1)) {
                                                $("#Backbtn").trigger('click');
                                                $('input[name="Library"]').attr('checked', false);
                                                $('#copymove').modal('hide');

                                                if (FailDueToCheckOut == 0) {
                                                    waitingDialog.hide();
                                                    alert("Files have been successfully copied.");
                                                }
                                                else {
                                                    waitingDialog.hide();
                                                    alert(FailDueToCheckOut + " file(s) are locked, couldn't be copied.\nOther files(s) have been copied successfully.");
                                                }
                                                FailDueToCheckOut = 0;
                                                CopyDestURL = '';
                                                CopyFolderName = '';
                                                arrFileFolder = [];
                                                $(".chkFileFolder").prop("checked", "");
                                                //1 March 23
                                                var tempDocName = fixedDecodeURIComponent(Documentname);
                                                if (fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                                                    tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                                                }
                                                else if (fixedDecodeURIComponent(Documentname) == 'Documents') {
                                                    tempDocName = tempDocName.replace("Documents", "Shared Documents");
                                                }
                                                GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
                                                $("#ModalDisplayProperty").modal('hide');
                                                //
                                            }
                                        }
                                    },
                                    error: function (ex) {
                                       
                                        waitingDialog.hide();
                                        if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                                            alert("You don't have the required permission on " + entry.FileFolderName + " to perform this operation.");
                                            return false;
                                        }
                                        else
                                        if (ex.body.includes("is not valid") == true ||ex.body.includes("not found") == true)
                                        {
                                            alert("Destination folder has invalid name.Please rename folder beore proceed.");
                                            return false;
                                        }
                                        else {
                                            alert(ex.body);
                                            return false;
                                        }
                                        //show your 'failed' message
                                    }
                                };
                                targetExecutor.executeAsync(copyFileAction);
                            },
                            error: function (ex) {
                                //fail
                                waitingDialog.hide();
                                if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                                    alert("You don't have the required permission on " + entry.FileFolderName + " to perform this operation.");
                                    return false;
                                }
                                else
                                if (ex.body.includes("is not valid") == true ||ex.body.includes("not found") == true)
                                {
                                    alert("Destination folder has invalid name.Please rename folder beore proceed.");
                                    return false;
                                }
                                else {
                                    alert(ex.body);
                                    return false;
                                }
                            }
                        };
                        sourceExecutor.executeAsync(getFileAction);
                    },
                    error: function (ex) {
                        //fail
                        waitingDialog.hide();
                        if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                            alert("You don't have the required permission on " + entry.FileFolderName + " to perform this operation.");
                            return false;
                        }
                        else
                            if (ex.body.includes("is not valid") == true ||ex.body.includes("not found") == true)
                            {
                                alert("Destination folder has invalid name.Please rename folder beore proceed.");
                                return false;
                            }
                        else {
                            alert(ex.body);
                            return false;
                        }
                    }

                });
            }
            else {
                FailDueToCheckOut++;
                if (FailDueToCheckOut == arrFileFolder.length) {
                    waitingDialog.hide();
                    FailDueToCheckOut = 0;
                    $("#Backbtn").trigger('click');
                    $('input[name="Library"]').attr('checked', false);
                    $('#copymove').modal('hide');
                    if (IsMoving == true) {
                        waitingDialog.hide();
                        alert("Selected file(s) are locked, couldn't be moved.");
                        $("#ModalDisplayProperty").modal('hide');
                    }
                    else {
                        waitingDialog.hide();
                        alert("Selected file(s) are locked, couldn't be copied.");
                    }
                    CopyDestURL = '';
                    CopyFolderName = '';
                    arrFileFolder = [];
                    $(".chkFileFolder").prop("checked", "");
                }
                else {
                    if (arrFileFolder.length == (index + 1)) {
                        if (FailDueToCheckOut == 0) {
                            alert("Files have been successfully copied.");
                        }
                        else {
                            alert(FailDueToCheckOut + " file(s) are locked, couldn't be copied.\nOther files(s) have been copied successfully.");
                        }
                        waitingDialog.hide();
                        $("#Backbtn").trigger('click');
                        $('input[name="Library"]').attr('checked', false);
                        $('#copymove').modal('hide');
                        CopyDestURL = '';
                        CopyFolderName = '';
                        arrFileFolder = [];
                        waitingDialog.hide();
                        FailDueToCheckOut = 0;
                        $(".chkFileFolder").prop("checked", "")
                    }
                }
            }
        }
        else if (entry.type == 'folder') {
             CopyMoveFolders(entry);
            if (IsMoving == true) {
                if (entry.SelectedLibrary == "Shared%20Documents"||(entry.SelectedLibrary == "Shared Documents")) {
                    entry.SelectedLibrary = "Documents";
                }
                $.when(GetFormDigestValue(entry.SiteURL)).done(function (GetFormDigestValue) {
                    RequestDigest = GetFormDigestValue
                });
                $.ajax({
                    url: entry.SiteURL + "/_api/web/lists/GetByTitle('" + entry.SelectedLibrary + "')/items('" + entry.DocumentId + "')",
                    type: "POST",
                    async: false,
                    headers:
                    {
                        "X-RequestDigest": RequestDigest,
                        "IF-MATCH": "*",
                        "X-HTTP-Method": "DELETE"
                    },
                    success: function (data, status, xhr) {
                        ChangeRevokeMessage("Revoked due to file moved", entry.DocumentId, entry.FileFolderName);
                        RequestDigest = $("#__REQUESTDIGEST").val();
                        //1 march 23
                        {
                            if (arrFileFolder.length == (index + 1)) {
                                $("#Backbtn").trigger('click');
                                $('input[name="Library"]').attr('checked', false);
                                $('#copymove').modal('hide');
                                
                               // if (IsMoving == true) {
                                    if (FailDueToCheckOut == 0) {
                                        alert("Files have been successfully moved.");
                                    }
                                    else {
                                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be moved.\nOther files(s) have been moved successfully.");
                                    }
                                    
                                    var tempDocName = fixedDecodeURIComponent(Documentname);
                                    if (fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                                        tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                                    }
                                    else if (fixedDecodeURIComponent(Documentname) == 'Documents') {
                                        tempDocName = tempDocName.replace("Documents", "Shared Documents");
                                    }
                                    GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));//20 jan 23
                                    waitingDialog.hide();
                                    $("#ModalDisplayProperty").modal('hide');
                                //}
                                FailDueToCheckOut = 0;
                                CopyDestURL = '';
                                CopyFolderName = '';
                                arrFileFolder = [];
                                $(".chkFileFolder").prop("checked", "");
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        waitingDialog.hide();
                        if (xhr.responseText.includes("Access is denied") == true || xhr.responseText.includes("Access denied") == true) {
                            alert("You don't have the required permission on " + entry.FileFolderName + "  to perform this operation.");
                            return false;
                        }
                        else {
                            alert(xhr.responseText);
                            return false;
                        }
                    }
                });

            }
            //1 march 23
            else  if (IsMoving != true)
            {            
                if (arrFileFolder.length == (index + 1)) {
                    $("#Backbtn").trigger('click');
                    $('input[name="Library"]').attr('checked', false);
                    $('#copymove').modal('hide');                    
                    // if (IsMoving != true) {
                        if (FailDueToCheckOut == 0) {
                            alert("Files have been successfully copied.");
                        }
                        else {
                            alert(FailDueToCheckOut + " file(s) are locked, couldn't be copied.\nOther files(s) have been copied successfully.");
                        }
                        var tempDocName = fixedDecodeURIComponent(Documentname);
                        if (fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                            tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                        }
                        else if (fixedDecodeURIComponent(Documentname) == 'Documents') {
                            tempDocName = tempDocName.replace("Documents", "Shared Documents");
                        }
                        GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));//20 jan 23
                        waitingDialog.hide();
                        $("#ModalDisplayProperty").modal('hide');
                    //}
                    FailDueToCheckOut = 0;
                    CopyDestURL = '';
                    CopyFolderName = '';
                    arrFileFolder = [];
                    $(".chkFileFolder").prop("checked", "");
                }
            } 
            
        }
        //else
        /*{
            if (arrFileFolder.length == (index + 1)) {
                $("#Backbtn").trigger('click');
                $('input[name="Library"]').attr('checked', false);
                $('#copymove').modal('hide');
                
                if (IsMoving == true) {
                    if (FailDueToCheckOut == 0) {
                        alert("Files have been successfully moved.");
                    }
                    else {
                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be moved.\nOther files(s) have been moved successfully.");
                    }
                    waitingDialog.hide();
                    $("#ModalDisplayProperty").modal('hide');
                    var tempDocName = fixedDecodeURIComponent(Documentname);
                    if (fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                        tempDocName = tempDocName.replace("/Documents/", "/Shared Documents/");
                    }
                    else if (fixedDecodeURIComponent(Documentname) == 'Documents') {
                        tempDocName = tempDocName.replace("Documents", "Shared Documents");
                    }
                    GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));//20 jan 23
                }
                else if (IsMoving != true) {
                    if (FailDueToCheckOut == 0) {
                        alert("Files have been successfully copied.");
                    }
                    else {
                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be copied.\nOther files(s) have been copied successfully.");
                    }
                    waitingDialog.hide();
                }
                FailDueToCheckOut = 0;
                CopyDestURL = '';
                CopyFolderName = '';
                arrFileFolder = [];
                $(".chkFileFolder").prop("checked", "");
            }
        }*/
    });
}
function copyFileMulti_Old() {
    if(!CheckValidFilesFolders())
    {
        alert(validcharmsg);
        waitingDialog.hide();
        return false;
    }
    FailDueToCheckOut = 0;
    if (fixedDecodeURIComponent(Documentname)[fixedDecodeURIComponent(Documentname).length - 1] == '/') {
        var folderName = fixedDecodeURIComponent(Documentname);
    }
    else {
        var folderName = fixedDecodeURIComponent(Documentname) + '/';
    }
    arrFileFolder.forEach(function (entry, index) {
        if (entry.type == 'file') {
            if (IsFileCheckout(folderName, entry.FileFolderName, entry.SiteURL, '') != true) {
                var sourceUrl = entry.SiteURL;//provide source site url
                var destUrl = CopyDestURL;//provide destination site url 
                // Create a request executor.
                var sourceExecutor = new SP.RequestExecutor(sourceUrl);
                var targetExecutor = new SP.RequestExecutor(destUrl);
                var fileName = entry.ServerURL;
                //provide file name with path 
                var fileContentUrl = sourceUrl + "/_api/web/GetFileByServerRelativeUrl('" + fileName + "')/$value";
                var targetSiteUrl = destUrl;

                var newFileName = entry.FileFolderName; //New name of added file
                if (CopyFolderName.search(/\bShared Documents\b/) >= 0) {
                    CopyFolderName = CopyFolderName.replace('Shared Documents', "Shared%20Documents");
                }
                var result = data.body;
                //provide folder path to which file to be copied
                var restUrl = targetSiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + encodeURIComponent(CopyFolderName) + "')/Files/Add(url='" + newFileName + "',overwrite=true)";

                $.ajax({
                    url: targetSiteUrl + "/_api/contextinfo",
                    type: "POST",
                    async: false,
                    headers: {
                        "Accept": "application/json;odata=verbose"
                    },
                    success: function (data) {
                        var digest = data.d.GetContextWebInformation.FormDigestValue;
                        // Build executor action to retrieve the file data.
                        if (fileContentUrl.includes('/Documents/') == true) {
                            fileContentUrl = fileContentUrl.replace('/Documents/', '/Shared Documents/');
                        }
                        var getFileAction = {
                            url: fileContentUrl,
                            method: "GET",
                            async: false,
                            binaryStringResponseBody: true,
                            success: function (getFileData) {
                                // Get the binary data.
                                var result = data.body;
                                if (restUrl.search(/\bDocuments\b/) >= 0 || restUrl.search(/\bShared Documents\b/) >= 0) {
                                    restUrl = restUrl.replace('Documents', "Shared Documents");
                                }
                                //if (targetSiteUrl != _spPageContextInfo.webAbsoluteUrl) {
                                $.when(GetFormDigestValue(targetSiteUrl)).done(function (GetFormDigestValue) {
                                    RequestDigest = GetFormDigestValue
                                });
                                //}
                                // Build executor action to copy the file data to the new location.
                                var copyFileAction = {
                                    url: restUrl,
                                    method: "POST",
                                    async: false,
                                    headers: {
                                        "Accept": "application/json; odata=verbose",
                                        "X-RequestDigest": RequestDigest
                                    },
                                    contentType: "application/json;odata=verbose",
                                    binaryStringRequestBody: true,
                                    body: getFileData.body,
                                    success: function (copyFileData) {
                                        RequestDigest = $("#__REQUESTDIGEST").val();
                                        if (IsMoving == true) {
                                            if (entry.SelectedLibrary == "Shared%20Documents") {
                                                entry.SelectedLibrary = "Documents";
                                            }
                                            $.when(GetFormDigestValue(entry.SiteURL)).done(function (GetFormDigestValue) {
                                                RequestDigest = GetFormDigestValue
                                            });
                                            $.ajax({
                                                url: entry.SiteURL + "/_api/web/lists/GetByTitle('" + entry.SelectedLibrary + "')/items('" + entry.DocumentId + "')",
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
                                                    ChangeRevokeMessage("Revoked due to file moved", entry.DocumentId, entry.FileFolderName);
                                                    if (arrFileFolder.length == (index + 1)) {
                                                        $("#Backbtn").trigger('click');
                                                        $('input[name="Library"]').attr('checked', false);
                                                        $('#copymove').modal('hide');
                                                        if (FailDueToCheckOut == 0) {
                                                            waitingDialog.hide();
                                                            alert("Files have been successfully moved.");
                                                        }
                                                        else {
                                                            waitingDialog.hide();
                                                            alert(FailDueToCheckOut + " file(s) are locked, couldn't be moved.\nOther files(s) have been moved successfully.");
                                                        }
                                                        FailDueToCheckOut = 0;
                                                        CopyDestURL = '';
                                                        CopyFolderName = '';
                                                        arrFileFolder = [];
                                                        $(".chkFileFolder").prop("checked", "");
                                                        var tempDocName = fixedDecodeURIComponent(Documentname);
                                                        if (fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                                                            tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                                                        }
                                                        else if (fixedDecodeURIComponent(Documentname) == 'Documents') {
                                                            tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                                                        }
                                                        GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));
                                                        $("#ModalDisplayProperty").modal('hide');
                                                    }
                                                },
                                                error: function (xhr, status, error) {
                                                    waitingDialog.hide();
                                                    if (xhr.responseText.includes("Access is denied") == true || xhr.responseText.includes("Access denied") == true) {
                                                        alert("You don't have the required permission on " + entry.FileFolderName + "  to perform this operation.");
                                                        return false;
                                                    }
                                                    else if (xhr.responseText.includes("Access is denied") == true || xhr.responseText.includes("Access denied") == true) {
                                                        alert("You don't have the required permission on " + entry.FileFolderName + "  to perform this operation.");
                                                        return false;
                                                    }
                                                    else {
                                                        alert(xhr.responseText);
                                                        return false;
                                                    }
                                                }
                                            });

                                        }
                                        else {
                                            if (arrFileFolder.length == (index + 1)) {
                                                $("#Backbtn").trigger('click');
                                                $('input[name="Library"]').attr('checked', false);
                                                $('#copymove').modal('hide');

                                                if (FailDueToCheckOut == 0) {
                                                    waitingDialog.hide();
                                                    alert("Files have been successfully copied.");
                                                }
                                                else {
                                                    waitingDialog.hide();
                                                    alert(FailDueToCheckOut + " file(s) are locked, couldn't be copied.\nOther files(s) have been copied successfully.");
                                                }
                                                FailDueToCheckOut = 0;
                                                CopyDestURL = '';
                                                CopyFolderName = '';
                                                arrFileFolder = [];
                                                $(".chkFileFolder").prop("checked", "");
                                            }
                                        }
                                    },
                                    error: function (ex) {
                                       
                                        waitingDialog.hide();
                                        if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                                            alert("You don't have the required permission on " + entry.FileFolderName + " to perform this operation.");
                                            return false;
                                        }
                                        else
                                        if (ex.body.includes("is not valid") == true ||ex.body.includes("not found") == true)
                                        {
                                            alert("Destination folder has invalid name.Please rename folder beore proceed.");
                                            return false;
                                        }
                                        else {
                                            alert(ex.body);
                                            return false;
                                        }
                                        //show your 'failed' message
                                    }
                                };
                                targetExecutor.executeAsync(copyFileAction);
                            },
                            error: function (ex) {
                                //fail
                                waitingDialog.hide();
                                if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                                    alert("You don't have the required permission on " + entry.FileFolderName + " to perform this operation.");
                                    return false;
                                }
                                else
                                if (ex.body.includes("is not valid") == true ||ex.body.includes("not found") == true)
                                {
                                    alert("Destination folder has invalid name.Please rename folder beore proceed.");
                                    return false;
                                }
                                else {
                                    alert(ex.body);
                                    return false;
                                }
                            }
                        };
                        sourceExecutor.executeAsync(getFileAction);
                    },
                    error: function (ex) {
                        //fail
                        waitingDialog.hide();
                        if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                            alert("You don't have the required permission on " + entry.FileFolderName + " to perform this operation.");
                            return false;
                        }
                        else
                            if (ex.body.includes("is not valid") == true ||ex.body.includes("not found") == true)
                            {
                                alert("Destination folder has invalid name.Please rename folder beore proceed.");
                                return false;
                            }
                        else {
                            alert(ex.body);
                            return false;
                        }
                    }

                });
            }
            else {
                FailDueToCheckOut++;
                if (FailDueToCheckOut == arrFileFolder.length) {
                    waitingDialog.hide();
                    FailDueToCheckOut = 0;
                    $("#Backbtn").trigger('click');
                    $('input[name="Library"]').attr('checked', false);
                    $('#copymove').modal('hide');
                    if (IsMoving == true) {
                        waitingDialog.hide();
                        alert("Selected file(s) are locked, couldn't be moved.");
                        $("#ModalDisplayProperty").modal('hide');
                    }
                    else {
                        waitingDialog.hide();
                        alert("Selected file(s) are locked, couldn't be copied.");
                    }
                    CopyDestURL = '';
                    CopyFolderName = '';
                    arrFileFolder = [];
                    $(".chkFileFolder").prop("checked", "");
                }
                else {
                    if (arrFileFolder.length == (index + 1)) {
                        if (FailDueToCheckOut == 0) {
                            alert("Files have been successfully copied.");
                        }
                        else {
                            alert(FailDueToCheckOut + " file(s) are locked, couldn't be copied.\nOther files(s) have been copied successfully.");
                        }
                        waitingDialog.hide();
                        $("#Backbtn").trigger('click');
                        $('input[name="Library"]').attr('checked', false);
                        $('#copymove').modal('hide');
                        CopyDestURL = '';
                        CopyFolderName = '';
                        arrFileFolder = [];
                        waitingDialog.hide();
                        FailDueToCheckOut = 0;
                        $(".chkFileFolder").prop("checked", "")
                    }
                }
            }
        }
        else if (entry.type == 'folder') {
             CopyMoveFolders(entry);
            if (IsMoving == true) {
                if (entry.SelectedLibrary == "Shared%20Documents") {
                    entry.SelectedLibrary = "Documents";
                }
                $.when(GetFormDigestValue(entry.SiteURL)).done(function (GetFormDigestValue) {
                    RequestDigest = GetFormDigestValue
                });
                $.ajax({
                    url: entry.SiteURL + "/_api/web/lists/GetByTitle('" + entry.SelectedLibrary + "')/items('" + entry.DocumentId + "')",
                    type: "POST",
                    async: false,
                    headers:
                    {
                        "X-RequestDigest": RequestDigest,
                        "IF-MATCH": "*",
                        "X-HTTP-Method": "DELETE"
                    },
                    success: function (data, status, xhr) {
                        ChangeRevokeMessage("Revoked due to file moved", entry.DocumentId, entry.FileFolderName);
                        RequestDigest = $("#__REQUESTDIGEST").val();
                    },
                    error: function (xhr, status, error) {
                        waitingDialog.hide();
                        if (xhr.responseText.includes("Access is denied") == true || xhr.responseText.includes("Access denied") == true) {
                            alert("You don't have the required permission on " + entry.FileFolderName + "  to perform this operation.");
                            return false;
                        }
                        else {
                            alert(xhr.responseText);
                            return false;
                        }
                    }
                });

            }
        }
        //else
        {
            if (arrFileFolder.length == (index + 1)) {
                $("#Backbtn").trigger('click');
                $('input[name="Library"]').attr('checked', false);
                $('#copymove').modal('hide');
                
                if (IsMoving == true) {
                    if (FailDueToCheckOut == 0) {
                        alert("Files have been successfully moved.");
                    }
                    else {
                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be moved.\nOther files(s) have been moved successfully.");
                    }
                    waitingDialog.hide();
                    $("#ModalDisplayProperty").modal('hide');
                    var tempDocName = fixedDecodeURIComponent(Documentname);
                    if (fixedDecodeURIComponent(Documentname).includes('/Documents/') == true) {
                        tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                    }
                    else if (fixedDecodeURIComponent(Documentname) == 'Documents') {
                        tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                    }
                    GetMyDocumentsWithFilesFolder(fixedEncodeURIComponent(tempDocName));//20 jan 23
                }
                else if (IsMoving != true) {
                    if (FailDueToCheckOut == 0) {
                        alert("Files have been successfully copied.");
                    }
                    else {
                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be copied.\nOther files(s) have been copied successfully.");
                    }
                    waitingDialog.hide();
                }
                FailDueToCheckOut = 0;
                CopyDestURL = '';
                CopyFolderName = '';
                arrFileFolder = [];
                $(".chkFileFolder").prop("checked", "");
            }
        }
    });
}

//Create Folder Inside DMS
function CreateMoveCopyFolder(newSubfoldersName, newSubFolder, IsModalOpen) {
    var FolderDetails = [];
    var currentSiteURL = CopyDestURL;
    if (newSubfoldersName.search(/\bDocuments\b/) >= 0) {
        if (newSubfoldersName.search(/\bShared Documents\b/) >= 0 || newSubfoldersName.search(/\bShared%20Documents\b/) >= 0) {
            //DO Nothing
        }
        else {
            newSubfoldersName = newSubfoldersName.replace("Documents", 'Shared%20Documents');
        }
    }
    if (newSubfoldersName[newSubfoldersName.length - 1] == '/') {
        var ServerRelativeUrl = newSubfoldersName + newSubFolder;
    }
    else {
        var ServerRelativeUrl = newSubfoldersName + '/' + newSubFolder;
    }
    if (currentSiteURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(currentSiteURL)).done(function (GetFormDigestValue) {
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
        },
        error: function (error) {
            waitingDialog.hide();
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.includes("Access denied") == true) {
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


//copy or move folders
function CopyMoveFolders(array) {
    
    if (Documentname[Documentname.length - 1] == '/') {
        var folderName = Documentname;
    }
    else {
        var folderName = Documentname + '/';
    }
    folderName = folderName + array.FileFolderName + '/';
    if (CopyFolderName[CopyFolderName.length - 1] == '/') {
        FolderPath = CopyFolderName;
    }
    else {
        FolderPath = CopyFolderName + '/';
    }

    //Create Root folder
   // $.when(CreateMoveCopyFolder(FolderPath, arrFileFolder[0].FileFolderName, false)).done(function (MainExamListItemTemp) {//Folder created
     $.when(CreateMoveCopyFolder(FolderPath,array.FileFolderName, false)).done(function (MainExamListItemTemp) {//Folder created
        FolderPath = FolderPath +array.FileFolderName + "/";
        // FolderPath = FolderPath + arrFileFolder[0].FileFolderName + "/";
        /*if (CopyFolderName[CopyFolderName.length - 1] == '/') {
            CopyFolderName = CopyFolderName + arrFileFolder[0].FileFolderName + "/";
        }
        else {
           // FolderPath = CopyFolderName + '/';
            CopyFolderName = CopyFolderName +'/'+ arrFileFolder[0].FileFolderName + "/";
        }*/
        //CopyFolderName = CopyFolderName + arrFileFolder[0].FileFolderName + "/";
        createAllFolder(FolderPath, folderName, array);
    });
}

function createAllFolder(FolderPath, folderName, array) {
    //getItemsWithQueryUsersDocumentsQueryWithURL
    $.when(getItemsWithQueryUsersDocumentsURL(folderName, array.SiteURL)).done(function (DocumentGroup) {
    //$.when(getItemsWithQueryUsersDocuments(folderName, array.SiteURL)).done(function (DocumentGroup) {
        var folders = DocumentGroup.Folders.results;
        var files = DocumentGroup.Files.results;
        files.forEach(function (entry, index) {
            if (IsFileCheckout(folderName, entry.Name, array.SiteURL, '') != true) {
                copyFoldersFile(FolderPath,array, entry);
            }
        });
        folders.forEach(function (entry, index) {
            var FolderPath1=FolderPath;
            $.when(CreateMoveCopyFolder(FolderPath1, entry.Name, false)).done(function (MainExamListItemTemp) {//Folder created
               // FolderPath1 = FolderPath1 + entry.Name + "/";
                createAllFolder(FolderPath1 + entry.Name + '/', folderName + entry.Name + '/', array);
                FolderPath = FolderPath1;
                
            });
        });
       
    });
}
//copy file from Copy/Move folder
function copyFoldersFile(FolderPaths,array, entry) {
   // var movesuccess=true;
    var sourceUrl = array.SiteURL;//provide source site url
    var destUrl = CopyDestURL;//provide destination site url 
    // Create a request executor.
    var sourceExecutor = new SP.RequestExecutor(sourceUrl);
    var targetExecutor = new SP.RequestExecutor(destUrl);
    var fileName = entry.ServerRelativeUrl;
    //provide file name with path 
    var fileContentUrl = sourceUrl + "/_api/web/GetFileByServerRelativeUrl('" + fileName + "')/$value";
    var targetSiteUrl = destUrl;

    var newFileName = entry.Name; //New name of added file
    
    //if (CopyFolderName.search(/\bShared Documents\b/) >= 0) {
    if (FolderPaths.search(/\bShared Documents\b/) >= 0) {
       // CopyFolderName = CopyFolderName.replace('Shared Documents', "Shared%20Documents");
    }
    var result = data.body;
    //provide folder path to which file to be copied
    var restUrl = targetSiteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + encodeURIComponent(FolderPaths) + "')/Files/Add(url='" + newFileName + "',overwrite=true)";

    $.ajax({
        url: targetSiteUrl + "/_api/contextinfo",
        type: "POST",
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data) {
            var digest = data.d.GetContextWebInformation.FormDigestValue;
            // Build executor action to retrieve the file data.
            if (fileContentUrl.includes('/Documents/') == true) {
                fileContentUrl = fileContentUrl.replace('/Documents/', '/Shared Documents/');
            }
            var getFileAction = {
                url: fileContentUrl,
                method: "GET",
                async: false,
                binaryStringResponseBody: true,
                success: function (getFileData) {
                    // Get the binary data.
                    var result = data.body;
                    if (restUrl.includes('/Documents/') == true) {
		                restUrl = restUrl.replace('/Documents/', '/Shared Documents/');
		            }
                   // alert("1");
                    //if (targetSiteUrl != _spPageContextInfo.webAbsoluteUrl) {
                    $.when(GetFormDigestValue(targetSiteUrl)).done(function (GetFormDigestValue) {
                        RequestDigest = GetFormDigestValue
                    });
                    //}
                    // Build executor action to copy the file data to the new location.
                    var copyFileAction = {
                        url: restUrl,
                        method: "POST",
                        async: false,
                        headers: {
                            "Accept": "application/json; odata=verbose",
                            "X-RequestDigest": RequestDigest
                        },
                        contentType: "application/json;odata=verbose",
                        binaryStringRequestBody: true,
                        body: getFileData.body,
                        success: function (copyFileData) {
                            RequestDigest = $("#__REQUESTDIGEST").val();
                            //alert("2");
                            
                        },
                        error: function (ex) {
                           // movesuccess=false;
                            if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                                alert("You don't have the required permission on " + entry.FileFolderName + " to perform this operation.");
                                return false;
                            }else
                            if (ex.body.includes("is not valid") == true ||ex.body.includes("not found") == true)
                            {
                                alert("Destination folder has invalid name.Please rename folder beore proceed.");
                                return false;
                            }
                            else {
                                alert(ex.body);
                                return false;
                            }
                            //show your 'failed' message
                        }
                    };
                    targetExecutor.executeAsync(copyFileAction);
                    
                    //alert("3");
                },
                error: function (ex) {
                    //fail
                   // movesuccess=false;
                    if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                        alert("You don't have the required permission on " + entry.FileFolderName + " to perform this operation.");
                        return false;
                    }
                    else
                    if (ex.body.includes("is not valid") == true ||ex.body.includes("not found") == true)
                    {
                        alert("Destination folder has invalid name.Please rename folder beore proceed.");
                        return false;
                    }
                    else {
                        alert(ex.body);
                        return false;
                    }
                }
            };
            sourceExecutor.executeAsync(getFileAction);
        },
        error: function (ex) {
            //fail
            //movesuccess=false;
            if (ex.body.includes("Access is denied") == true || ex.body.includes("Access denied") == true) {
                alert("You don't have the required permission on " + entry.FileFolderName + " to perform this operation.");
                return false;
            }
            else
            if (ex.body.includes("is not valid") == true ||ex.body.includes("not found") == true)
            {
                alert("Destination folder has invalid name.Please rename folder beore proceed.");
                return false;
            }
            else {
                alert(ex.body);
                return false;
            }
        }
    });
//return movesuccess;
}

//----------------------------DMS Move and Copy code ends----------------------------------------------

//----------------------------Renaming the File/Folder Starts----------------------------------------------
function RenameFile() {
    var webUrl = CopySourceURL; // web url
    var listTitle = CopyLibrary; //list title
    var itemId = DocumentId; //list item id
    var fileName = $('#txtRenamefile').val(); //new file name
    rename(webUrl, listTitle, itemId, fileName).done(function (item) {
        $.when(getSharedDocLinks()).done(function (results) {
            $.when(getApprovalDocLinks()).done(function (results) {
                $("#ModalDisplayProperty").modal('hide');
                $("#rename").modal('hide');
                var tempDocName = Documentname;
                if (Documentname.includes('/Documents/') == true) {
                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                }
                else if (Documentname == 'Documents') {
                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                }
                GetMyDocumentsWithFilesFolder(tempDocName);
                alert('File/Folder has been renamed.');
                arrFileFolder = [];
                $(".chkFileFolder").prop("checked", false);
                //$("#FileTitle").text($('#txtRenamefile').val());
            });
        });
    }).fail(function (error) {
        arrFileFolder = [];
        $(".chkFileFolder").prop("checked", false);
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
    if (listTitle == "Shared%20Documents" || listTitle == "Shared Documents") {
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
    if (SiteUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteUrl)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    if (method == "POST") {
        headers["X-RequestDigest"] = RequestDigest;
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
function getSharedDocLinks() {
    var Query = "?$select=Id,DocumentURL,DocumentID&$filter=DocumentID eq '" + DocumentId.toString() + "' ";
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


//----------------------------DMS Sharing file code starts----------------------------------------------

//If Scope eq 'HOD'
//And (Logged_In user ne HOD: - Then don't show Everyone share and Revoke for EveryoneSharing)
//And (Logged_In user eq HOD: - Then show Everyone share and Revoke for EveryoneSharing);
function CheckForEveryone() {
    var IsEveryoneShareRev = true;
    var Query = "?$select=ID,ApproverRequired,Approver/Title,Approver/EMail,Approver/Id,WebPartName,Department/Id&$top=5000&$expand=Department,Approver&$filter=WebPartName eq 'Documents' and Department/Id eq '" + SeletedDeptId + "' and CompanyId eq '" + Logged_CompanyId + "' and Scope eq 'HOD'";
    $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            if (valuesArray[0].ApproverRequired == true) {
                var Query = "?$select=*,ID,WebPartName,Department/Id,Contributors/EMail&$top=5000&$expand=Contributors,Department&$filter=Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' and WebPartName eq 'Head of the department' and Department/Id eq '" + SeletedDeptId + "' and CompanyId eq '" + Logged_CompanyId + "'";
                $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                    if (valuesArray.length > 0) {
                        IsEveryoneShareRev = true;
                    }
                    else {
                        IsEveryoneShareRev = false;
                    }
                });
            }
        }

    });
    return IsEveryoneShareRev;
}


//Method for sharing multiple file and Folder
function shareFileMulti_Old() {
    var arrRevokeIds = [];
    var SharingRespose = true;
    var IsContinueEvery1Share = true;
    if ($('#sharewith').val() == 'Everyone') {
        if (CheckForEveryone() == false) {
            alert("You are not authorized to share file/folder to everyone.");
            return false;
        }
        var arrTempFolder = [];
        arrTempFolder = arrFileFolder.filter(function (obj) {
            return obj.type.toLowerCase() == "folder";
        });
        if (arrTempFolder.length > 0) {
            alert("Kindly remove folder while selecting Everyone.");
            return false;
        }
    }
    var sharefileuser = [];
    sharedUsersIdArrayListItemCollection = [];
    sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
    var txtDocshareingTypePermissionLevel = $('#sharewith').val();
    var txttsharedWithPermission = $('#sharedWithPermission').val();
    var txtSharedDocumetnOnDemandId = '';
    var serverRelativeFileUrl = '';
    if (sharedUsersIdArrayListItemCollection.length == 0) {
        for (var groupId = 0; groupId < SharingUserEmail.length; groupId++) {
            SharingUserId.push(parseInt(SharingUserEmail[groupId].GroupId));
        }
        sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
    }
    if (txtDocshareingTypePermissionLevel == 'Everyone') {
        SharingUserId = getTargetGroupId();
        sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
        for (var groupId = 0; groupId < SharingUserId.length; groupId++) {
            SharingUserEmail.push({
                ClientId: "",
                ClientName: "",
                GroupId: SharingUserId[groupId].toString(),
                GroupTitle: ""
            });
        }
    }
    FailDueToCheckOut = 0;
    if (Documentname[Documentname.length - 1] == '/') {
        var folderName = Documentname;
    }
    else {
        var folderName = Documentname + '/';
    }
    $("#LibProject").text($(".headdingLinks").text());
    arrFileFolder.forEach(function (entry, index) {
        if (entry.type.toLowerCase() == 'file' || entry.type.toLowerCase() == "folder") {
            if (IsFileCheckout(folderName, entry.FileFolderName, entry.SiteURL, '') != true && entry.type == 'file') {
                SharingRespose = true;
                txtSharedDocumetnOnDemandId = DocumentId = entry.DocumentId;
                CopySourceURL = entry.SiteURL;
                CopyLibrary = entry.SelectedLibrary;
                $("#FilePath").text(entry.ServerURL);
                $("#FileTitle").text(entry.FileTitle);//File/Folder Title
                $("#FileName").text(entry.FileFolderName);
                //If PDF
                var tempAction = entry.ServerURL;
                if (entry.FileFolderName.includes(".pdf") == true) {//to check if it's PDF
                    if (entry.ServerURL.search(/\bShared%20Documents\b/) >= 0) {
                        tempAction = entry.ServerURL.replace('Shared%20Documents', "Shared Documents");
                    }
                    $(".txtCopyLink").val(DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + entry.ServerURL.substr(0, tempAction.lastIndexOf("/")) + "&p=true");
                }
                else {
                    //If any other file than PDF
                    if (entry.ServerURL.includes("DocumentManagementSystem") == true || entry.ServerURL.includes("DepartmentalDMS") == true) {
                        if (entry.ServerURL.includes("DocumentManagementSystem") == true) {
                            $(".txtCopyLink").val(entry.SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(entry.ServerURL) + "&parent=" + encodeURIComponent(entry.ServerURL.substr(0, entry.ServerURL.lastIndexOf("/") + 0)));
                        } else {
                            $(".txtCopyLink").val(entry.SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(entry.ServerURL) + "&parent=" + encodeURIComponent(entry.ServerURL.substr(0, entry.ServerURL.lastIndexOf("/") + 0)));
                        }
                    }
                    else {
                        var HostName = window.location.origin + entry.ServerURL.substr(0, entry.ServerURL.lastIndexOf("/") + 0);
                        if (entry.ServerURL.search(/\bShared%20Documents\b/) >= 0) {
                            tempAction = entry.ServerURL.replace('Shared%20Documents', "Shared Documents");
                        }
                        $(".txtCopyLink").val(HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(tempAction) + "&parent=" + encodeURIComponent(tempAction.substr(0, entry.ServerURL.lastIndexOf("/") + 0)));
                    }
                }
                /*if(entry.CopyFileLink.includes('/Documents/') == true) {
                	entry.CopyFileLink = entry.CopyFileLink.replace('/Documents/', '/Shared%20Documents/');
                }
                $(".txtCopyLink").val(entry.CopyFileLink);*/
                serverRelativeFileUrl = SelectedFileServerURL = entry.ServerURL;
                sharefileuser = getSharedUsersId(txtSharedDocumetnOnDemandId); //get Id of already shared users
                //return false;
                arrRevokeIds = $.grep(sharefileuser, function (element) {
                    return $.inArray(element, sharedUsersIdArrayListItemCollection) !== -1;
                });

                sharedUsersIdArrayListItemCollection = sharedUsersIdArrayListItemCollection.concat(sharefileuser);
                if (txtDocshareingTypePermissionLevel == 'Organization') {
                    SharingRespose = getTargetRoleDefinitionId(entry.type);
                }
                else if (txtDocshareingTypePermissionLevel == 'Everyone') {
                    SharingRespose = getTargetRoleDefinitionId(entry.type);
                }
                else {
                    SharingRespose = ShareFilesFolder(serverRelativeFileUrl, "File", '', txtDocshareingTypePermissionLevel);
                }
                if (SharingRespose != false) {
                    SharingRespose = true;
                }
                if (sharedUsersIdArrayListItemCollection.length > 0 && SharingRespose == true) {
                    var securityLeveltext = $('#sharewith').val();//Update Document Properties
                    if (PermissionStatus == "") {
                        updateDocumentPropertiesOnItemSharing(txtSharedDocumetnOnDemandId, serverRelativeFileUrl, txtDocshareingTypePermissionLevel, sharedUsersIdArrayListItemCollection, CopySourceURL, false);
                    }
                    else if (txtDocshareingTypePermissionLevel == "Everyone" && PermissionStatus == "Pending") {
                        ApprovalRequired();
                    }
                    GetDocumentsRevoke(arrRevokeIds, txtSharedDocumetnOnDemandId);
                    var Shared = [];
                    Shared = getSharedType();
                    if (txtDocshareingTypePermissionLevel == "Organization") {
                        AddSharedLinkToListOrg(serverRelativeFileUrl, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1], entry.SubCategory,entry.FileRef);
                    }
                    else {
                        AddSharedLinkToList(serverRelativeFileUrl, SharingUserId, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1], entry.SubCategory,entry.FileRef);
                    }
                    //mail send
                    if ($('#notifymail').prop('checked') == true && PermissionStatus == "")    //If SendMail Checkbox check for file
                    {
                        var ToUserArray = [];
                        var Permission = $("#sharedWithPermission :selected").text();
                        if (SharingUserEmail.length > 0) {
                            var EmailDesign = '';
                            ValidityDateHTML = '';
                            if ($("#expiredats").val() != "") {
                                ValidityDateHTML = "<div><strong>Sharing valid till:</strong> " + moment($('#expiredats').val()).format('MMMM DD, YYYY') + "</div>";
                            }
                            EmailDesign = _spPageContextInfo.userDisplayName + " has shared the following document with you.<br/><br/>";
                            //for (i = 0; i < SharingUserEmail.length; i++) {
                            EmailDesign = EmailDesign + "<div><strong>File Name</strong><strong>:</strong> " + $("#FileName").text() + "</div>" +
                                                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + entry.FileTitle + "</div>" +
                                                        "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + entry.FileType + "</div>" +
                                                        "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + entry.FileRef + "</div>" +
                                                     "<div><strong>Permission:</strong> " + Permission + "</div>" +
                                                     "<div><strong>Shared By:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                                     "<div><strong>Shared On:</strong> " + moment(new Date()).format('MMMM DD, YYYY') + " " + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") + "</div>" +
                                                     ValidityDateHTML +
                                                     "</br><div><strong>Message:</strong> " + $("#txtShareMessage").val() + "</div></br></br></br>" +
                                                    "<div><a href=" + $(".txtCopyLink").val() + ">Click here</a> to open the document.</div>" + "<br/><br/>";
                            //}

                            EmailDesign += "This is an auto generated email. Please don't reply.";
                            for (var k = 0; k < LabelDefaultLangauge.length; k++) {
                                if (EmailDesign.includes(LabelDefaultLangauge[k].Key) == true) {
                                    EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
                                }
                            }

                        }
                        var Metadata;
                        if ($('#sharewith').val() == "Organization") {
                            SharingUserEmail.forEach(function (entry, index) {
                                ToUserArray.push(entry.GroupTitle);
                            });
                        }
                        else if ($('#sharewith').val() == "Everyone") {
                            ToUserArray = getCompanyEmailId();
                        }
                        else {
                            ToUserArray = SharingUserEmail.filter(function (f) { return f; })
                        }
                        Metadata = {
                            'properties': {
                                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                                'From': _spPageContextInfo.userEmail,
                                'To': { 'results': ToUserArray },
                                //'CC': { 'results': ccUsers },
                                'Body': EmailDesign,
                                'Subject': 'A document has been shared with you.'
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
                                if ((index + 1) == arrFileFolder.length) {
                                    var tempDocName = Documentname;
                                    if(Documentname.includes('/Documents/') == true) {
					                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
					                } 
					                else if(Documentname == 'Documents') {
					                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
					                }
                                    GetMyDocumentsWithFilesFolder(tempDocName);
                                    if (FailDueToCheckOut == 0) {
                                        alert("File / Folder has been shared.");
                                    }
                                    else {
                                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                                    }
                                    $("#FileSharing").text("Shared with " + $('#sharewith').val());
                                    $(".txtSharingHistoy").show();
                                    $(".btnClosePopup").trigger("click");
                                    arrFileFolder = [];
                                    FailDueToCheckOut = 0;
                                    $(".chkFileFolder").prop("checked", false);
                                }
                            },
                            error: function (err) {
                                waitingDialog.hide();
                                alert("SendEmailSharedNotification  " + JSON.stringify(err));
                            }
                        });
                    }
                    else {
                        if ((index + 1) == arrFileFolder.length) {
                            var tempDocName = Documentname;
                            if(Documentname.includes('/Documents/') == true) {
			                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
			                } 
			                else if(Documentname == 'Documents') {
			                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
			                }
                            GetMyDocumentsWithFilesFolder(tempDocName);
                            if (FailDueToCheckOut == 0) {
                                alert("File / Folder has been shared.");
                            }
                            else {
                                alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                            }

                            $("#FileSharing").text("Shared with " + $('#sharewith').val());
                            $(".txtSharingHistoy").show();
                            $(".btnClosePopup").trigger("click");
                            arrFileFolder = [];
                            FailDueToCheckOut = 0;
                            $(".chkFileFolder").prop("checked", false);
                        }
                    }
                }
            }
            else {
                if (entry.type == 'folder') {
                    SharingRespose = true;
                    txtSharedDocumetnOnDemandId = DocumentId = entry.DocumentId;
                    CopySourceURL = entry.SiteURL;
                    CopyLibrary = entry.SelectedLibrary;
                    $("#FilePath").text(entry.ServerURL);
                    $("#FileTitle").text(entry.FileTitle);//File/Folder Title
                    $("#FileName").text(entry.FileFolderName);
                    if (entry.CopyFileLink.includes('/Documents/') == true) {
                        entry.CopyFileLink = entry.CopyFileLink.replace('/Documents/', '/Shared%20Documents/');
                    }
                    $(".txtCopyLink").val(entry.CopyFileLink);
                    serverRelativeFileUrl = SelectedFileServerURL = entry.ServerURL;
                    sharefileuser = getSharedUsersId(txtSharedDocumetnOnDemandId); //get Id of already shared users
                    //return false;
                    arrRevokeIds = $.grep(sharefileuser, function (element) {
                        return $.inArray(element, sharedUsersIdArrayListItemCollection) !== -1;
                    });

                    sharedUsersIdArrayListItemCollection = sharedUsersIdArrayListItemCollection.concat(sharefileuser);
                    if (txtDocshareingTypePermissionLevel == 'Organization') {
                        SharingRespose = getTargetRoleDefinitionId(entry.type);
                    }
                    else if (txtDocshareingTypePermissionLevel == 'Everyone') {
                        SharingRespose = getTargetRoleDefinitionId(entry.type);
                    }
                    else {
                        SharingRespose = ShareFilesFolder(serverRelativeFileUrl, "File", '', txtDocshareingTypePermissionLevel);
                    }
                    if (SharingRespose != false) {
                        SharingRespose = true;
                    }
                    if (sharedUsersIdArrayListItemCollection.length > 0 && SharingRespose == true) {
                        var securityLeveltext = $('#sharewith').val();//Update Document Properties
                        if (PermissionStatus == "") {
                            updateDocumentPropertiesOnItemSharing(txtSharedDocumetnOnDemandId, serverRelativeFileUrl, txtDocshareingTypePermissionLevel, sharedUsersIdArrayListItemCollection, CopySourceURL, false);
                        }
                        else if (txtDocshareingTypePermissionLevel == "Everyone" && PermissionStatus == "Pending") {
                            ApprovalRequired();
                        }
                        GetDocumentsRevoke(arrRevokeIds, txtSharedDocumetnOnDemandId);
                        var Shared = [];
                        Shared = getSharedType();
                        if (txtDocshareingTypePermissionLevel == "Organization") {
                            AddSharedLinkToListOrg(serverRelativeFileUrl, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1], entry.SubCategory,entry.FileRef);
                        }
                        else {
                            AddSharedLinkToList(serverRelativeFileUrl, SharingUserId, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1], entry.SubCategory,entry.FileRef);
                        }

                        //mail send
                        if ($('#notifymail').prop('checked') == true && PermissionStatus == "")    //If SendMail Checkbox check for file
                        {
                            var ToUserArray = [];
                            var Permission = $("#sharedWithPermission :selected").text();
                            if (SharingUserEmail.length > 0) {
                                var EmailDesign = '';
                                ValidityDateHTML = '';
                                if ($("#expiredats").val() != "") {
                                    ValidityDateHTML = "<div><strong>Sharing valid till:</strong> " + moment($('#expiredats').val()).format('MMMM DD, YYYY') + "</div>";
                                }
                                EmailDesign = _spPageContextInfo.userDisplayName + " has shared the following document with you.<br/><br/>";
                                //for (i = 0; i < SharingUserEmail.length; i++) {
                                EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#FileName").text() + "</div>" +
                                                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + entry.FileTitle + "</div>" +
                                                         "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + entry.FileType + "</div>" +
                                                        "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + entry.FileRef + "</div>" +
                                                         "<div><strong>Permission:</strong> " + Permission + "</div>" +
                                                         "<div><strong>Shared By:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                                         "<div><strong>Shared On:</strong> " + moment(new Date()).format('MMMM DD, YYYY') + " " + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") + "</div>" +
                                                         ValidityDateHTML +
                                                         "</br><div><strong>Message:</strong> " + $("#txtShareMessage").val() + "</div></br></br></br>" +
                                                        "<div><a href=" + $(".txtCopyLink").val() + ">Click here</a> to open the document.</div>" + "<br/><br/>";
                                //}

                                EmailDesign += "This is an auto generated email. Please don't reply.";
                                for (var k = 0; k < LabelDefaultLangauge.length; k++) {
                                    if (EmailDesign.includes(LabelDefaultLangauge[k].Key) == true) {
                                        EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
                                    }
                                }
                            }
                            var Metadata;
                            if ($('#sharewith').val() == "Organization") {
                                SharingUserEmail.forEach(function (entry, index) {
                                    ToUserArray.push(entry.GroupTitle);
                                });
                            }
                            else if ($('#sharewith').val() == "Everyone") {
                                ToUserArray = getCompanyEmailId();
                            }
                            else {
                                ToUserArray = SharingUserEmail.filter(function (f) { return f; })
                            }
                            Metadata = {
                                'properties': {
                                    '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                                    'From': _spPageContextInfo.userEmail,
                                    'To': { 'results': ToUserArray },
                                    //'CC': { 'results': ccUsers },
                                    'Body': EmailDesign,
                                    'Subject': 'A document has been shared with you.'
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
                                    if ((index + 1) == arrFileFolder.length) {
                                        var tempDocName = Documentname;
                                        if (Documentname.includes('/Documents/') == true) {
                                            tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                                        }
                                        else if (Documentname == 'Documents') {
                                            tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                                        }
                                        GetMyDocumentsWithFilesFolder(tempDocName);
                                        if (FailDueToCheckOut == 0) {
                                            alert("File / Folder has been shared.");
                                        }
                                        else {
                                            alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                                        }
                                        $("#FileSharing").text("Shared with " + $('#sharewith').val());
                                        $(".txtSharingHistoy").show();
                                        $(".btnClosePopup").trigger("click");
                                        arrFileFolder = [];
                                        FailDueToCheckOut = 0;
                                        $(".chkFileFolder").prop("checked", false);
                                    }
                                },
                                error: function (err) {
                                    waitingDialog.hide();
                                    alert("SendEmailSharedNotification  " + JSON.stringify(err));
                                }
                            });
                        }
                        else {
                            if ((index + 1) == arrFileFolder.length) {
                                var tempDocName = Documentname;
                                if (Documentname.includes('/Documents/') == true) {
                                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                                }
                                else if (Documentname == 'Documents') {
                                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                                }
                                GetMyDocumentsWithFilesFolder(tempDocName);
                                if (FailDueToCheckOut == 0) {
                                    alert("File / Folder has been shared.");
                                }
                                else {
                                    alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                                }

                                $("#FileSharing").text("Shared with " + $('#sharewith').val());
                                $(".txtSharingHistoy").show();
                                $(".btnClosePopup").trigger("click");
                                arrFileFolder = [];
                                FailDueToCheckOut = 0;
                                $(".chkFileFolder").prop("checked", false);
                            }
                        }
                    }
                }
                else {
                    FailDueToCheckOut++;
                    if (FailDueToCheckOut == arrFileFolder.length) {
                        waitingDialog.hide();
                        FailDueToCheckOut = 0;
                        alert("Selected file(s) are locked, couldn't be shared.");
                        $("#FileSharing").text("Shared with " + $('#sharewith').val());
                        $(".txtSharingHistoy").show();
                        $(".btnClosePopup").trigger("click");
                        arrFileFolder = [];
                        $(".chkFileFolder").prop("checked", false);
                    }
                    else {
                        if (arrFileFolder.length == (index + 1)) {
                            var tempDocName = Documentname;
                            if (Documentname.includes('/Documents/') == true) {
                                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                            }
                            else if (Documentname == 'Documents') {
                                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                            }
                            GetMyDocumentsWithFilesFolder(tempDocName);
                            if (FailDueToCheckOut == 0) {
                                alert("File / Folder has been shared.");
                            }
                            else {
                                alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                            }
                            waitingDialog.hide();
                            FailDueToCheckOut = 0;
                            $("#FileSharing").text("Shared with " + $('#sharewith').val());
                            $(".txtSharingHistoy").show();
                            $(".btnClosePopup").trigger("click");
                            arrFileFolder = [];
                            $(".chkFileFolder").prop("checked", false);
                        }
                    }
                }
            }
        }
    });
}

//get Company Mass Mail Id
function getCompanyEmailId() {
    var Mail = [];
    var Query = "?$select=EmailID,ID&$filter=ID eq '" + Logged_CompanyId + "' ";
    $.when(getItemsWithQuery("Companies", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
        if (items.length > 0) {
            Mail.push(items[0].EmailID);
        }
    });
    return Mail;
}


//method to share single file.
function shareFile() {
    var sharefileuser = [];
    var arrRevokeIds = [];
    var SharingRespose = true;
    sharedUsersIdArrayListItemCollection = [];
    sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
    var txtDocshareingTypePermissionLevel = $('#sharewith').val();
    var txttsharedWithPermission = $('#sharedWithPermission').val();
    var txtSharedDocumetnOnDemandId = DocumentId.toString();
    var serverRelativeFileUrl = $("#FilePath").text();
    //Bhawana 
    //Check for Sharing Rule
    if(currentSectionType=='Group Documents'||currentSectionType=="Department"||currentSectionType=='Project Documents')
    {
        if(!checkForSharingRule())
        {
            alert("As per sharing rule definition ,You are not authorized person for sharing.");
            return false;
        }
    }

    sharefileuser = getSharedUsersId(txtSharedDocumetnOnDemandId);
    arrRevokeIds = $.grep(sharefileuser, function (element) {
        return $.inArray(element, sharedUsersIdArrayListItemCollection) !== -1;
    });

    sharedUsersIdArrayListItemCollection = sharedUsersIdArrayListItemCollection.concat(sharefileuser);
    if (txtDocshareingTypePermissionLevel == 'Organization') {
        if (sharedUsersIdArrayListItemCollection.length == 0) {
            for (var groupId = 0; groupId < SharingUserEmail.length; groupId++) {
                SharingUserId.push(parseInt(SharingUserEmail[groupId].GroupId));
            }
            sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
        }
        SharingRespose = getTargetRoleDefinitionId('file');
    }
    else if (txtDocshareingTypePermissionLevel == 'Everyone') {
        if (CheckForEveryone() == false) {
            alert("You are not authorized to share file/folder to everyone.");
            return false;
        }
        
        SharingUserId = getTargetGroupId();
        sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
        for (var groupId = 0; groupId < SharingUserId.length; groupId++) {
            SharingUserEmail.push({
                ClientId: "",
                ClientName: "",
                GroupId: SharingUserId[groupId].toString(),
                GroupTitle: ""
            });
        }
        SharingRespose = getTargetRoleDefinitionId('file');
    }
    else {
        SharingRespose = ShareFilesFolder(serverRelativeFileUrl, "File", '', txtDocshareingTypePermissionLevel);
    }
    if (SharingRespose != false) {
        SharingRespose = true;
    }
    if (sharedUsersIdArrayListItemCollection.length > 0 && SharingRespose == true) {
        var securityLeveltext = $('#sharewith').val();//Update Document Properties
        if (PermissionStatus == "") {
            updateDocumentPropertiesOnItemSharing(txtSharedDocumetnOnDemandId, serverRelativeFileUrl, txtDocshareingTypePermissionLevel, sharedUsersIdArrayListItemCollection, CopySourceURL, false);
        }
        else if (txtDocshareingTypePermissionLevel == "Everyone" && PermissionStatus == "Pending") {
            ApprovalRequired();
        }
        GetDocumentsRevoke(arrRevokeIds, txtSharedDocumetnOnDemandId);
        var Shared = [];
        Shared = getSharedType();
        var SharedDocTypeList = $('#FileDocType').text();
        SharedDocTypeList = SharedDocTypeList.replace("(", "");SharedDocTypeList = SharedDocTypeList.replace(")", "");
        if (txtDocshareingTypePermissionLevel == "Organization") {
            AddSharedLinkToListOrg(serverRelativeFileUrl, txtSharedDocumetnOnDemandId, "File", $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], SharedDocTypeList.trim(), Shared[1], $('#FileDocSubType').text(),$('#FileReference').text());
        }
        else {
            AddSharedLinkToList(serverRelativeFileUrl, SharingUserId, txtSharedDocumetnOnDemandId, "File", $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], SharedDocTypeList.trim(), Shared[1],$('#FileReference').text());
        }

        //mail send
        //CommentSTART  as email trigger from flow
        /*if ($('#notifymail').prop('checked') == true && PermissionStatus == "")    //If SendMail Checkbox check for file
        {
            var ToUserArray = [];
            var Permission = $("#sharedWithPermission :selected").text();
            if (SharingUserEmail.length > 0) {
                var EmailDesign = '';
                ValidityDateHTML = '';
                if ($("#expiredats").val() != "") {
                    ValidityDateHTML = "<div><strong>Sharing valid till:</strong> " + moment($('#expiredats').val()).format('MMMM DD, YYYY') + "</div>";
                }
                EmailDesign = _spPageContextInfo.userDisplayName + " has shared the following document with you.<br/><br/>";
                EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#FileName").text() + "</div>" +
                                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + $("#FileTitle").text() + "</div>" +
                                        "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + $("#FileDocType").text() + "</div>" +
                                        "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + $("#FileReference").text() + "</div>" +
                                         "<div><strong>Permission:</strong> " + Permission + "</div>" +
                                         "<div><strong>Shared By:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                         "<div><strong>Shared On:</strong> " + moment(new Date()).format('MMMM DD, YYYY') + " " + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") + "</div>" +
                                         ValidityDateHTML +
                                         "</br><div><strong>Message:</strong> " + $("#txtShareMessage").val() + "</div></br></br></br>" +
                                        "<div><a href=" + $(".txtCopyLink").val() + ">Click here</a> to open the document.</div>" + "<br/><br/>";
                EmailDesign += "This is an auto generated email. Please don't reply.";
                for (var k = 0; k < LabelDefaultLangauge.length; k++) {
                    if (EmailDesign.includes(LabelDefaultLangauge[k].Key) == true) {
                        EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
                    }
                }
            }
            var from = $('#lblSelectedCurrentEmail').text();
            var Metadata;
            if ($('#sharewith').val() == "Organization") {
                SharingUserEmail.forEach(function (entry, index) {
                    ToUserArray.push(entry.GroupTitle);
                });
            }
            else if ($('#sharewith').val() == "Everyone") {
                ToUserArray = getCompanyEmailId();
            }
            else {
                ToUserArray = SharingUserEmail.filter(function (f) { return f; })
            }
            Metadata = {
                'properties': {
                    '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                    'From': _spPageContextInfo.userEmail,
                    'To': { 'results': ToUserArray },
                    //'CC': { 'results': ccUsers },
                    'Body': EmailDesign,
                    'Subject': 'A document has been shared with you.'
                }
            };
            SendEmailSharedNotification(Metadata);
        }
        else*/
        //CommentEnd  as email trigger from flow
         {
            var tempDocName = Documentname;
            if (Documentname.includes('/Documents/') == true) {
                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
            }
            else if (Documentname == 'Documents') {
                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
            }
            GetMyDocumentsWithFilesFolder(tempDocName);
            alert("File / Folder has been shared.");
            $("#FileSharing").text("Shared with " + $('#sharewith').val());
            $(".txtSharingHistoy").show();
            $(".btnClosePopup").trigger("click");
        }

    }
}

//Get shared type of Shared file
function getSharedType() {
    var ShareType = [];
    if ($('ul#accordion').find('li.active').attr('id') == "liMyDocuments") {
        ShareType.push("My-DMS");
        ShareType.push(_spPageContextInfo.userDisplayName);
    }
    else if ($('ul#accordion').find('li.active').attr('id') == "liDeptDocs") {
        ShareType.push("Department");
        ShareType.push($(".headdingLinks").text());
    }
    else if ($('ul#accordion').find('li.active').attr('id') == "GpDocuments") {
        ShareType.push("Group");
        ShareType.push($(".headdingLinks").text());
    }
    else if ($('ul#accordion').find('li.active').attr('id') == "liProjectDocs") {
        ShareType.push("Project");
        ShareType.push($(".headdingLinks").text());
    }
    else if ($('ul#accordion').find('li.active').attr('id') == "liGuestDocs") {
        ShareType.push("Guest");
        ShareType.push($(".headdingLinks").text());
    }
    return ShareType;
}


//get GroupId of 'Everyone' and 'All_Employee'
function getTargetGroupId() {
    var arrEveryOneId = [];
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getbyname('ALL_EMPLOYEE')?$select=id";
    $.ajax({
        url: siteurl,
        type: 'GET',
        headers: { 'accept': 'application/json;odata=verbose' },
        async: false,
        success: function (data, status, xhr) {
            arrEveryOneId.push(data.d.Id);
        },
        error: function (data, status, error) {
            console.log(data.responseJSON.error);
        }
    });

    /*var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/siteusers?$filter=PrincipalType eq 4 and Title eq 'Everyone'";
    $.ajax({
        url: siteurl,
        type: 'GET',
        headers: { 'accept': 'application/json;odata=verbose' },
        async: false,
        success: function (data, status, xhr) {
            arrEveryOneId.push(data.d.results[0].Id);
            
        },
        error: function (data, status, error) {
            console.log(data.responseJSON.error);
        }
    });*/
    return arrEveryOneId;
}

//Send email notification to Shared users
function SendEmailSharedNotification(emailProperties) {
    var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: sitetemplateurl,
        type: "POST",
        data: JSON.stringify(emailProperties),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            var tempDocName = Documentname;
            if (Documentname.includes('/Documents/') == true) {
                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
            }
            else if (Documentname == 'Documents') {
                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
            }
            GetMyDocumentsWithFilesFolder(tempDocName); alert("File / Folder has been shared.");
            $("#FileSharing").text("Shared with " + $('#sharewith').val());
            $(".txtSharingHistoy").show();
            $(".btnClosePopup").trigger("click");
        },
        error: function (err) {
            waitingDialog.hide();
            alert("SendEmailSharedNotification  " + JSON.stringify(err));
        }
    });
}

// add Shared file metadata in 'SharedDocument' list for Organization sharing
function AddSharedLinkToListOrg(documentURL, documentId, documentType, sharedGroup, permissionType, Shared_Type, DocType, SharedFrom, SubDocType,DocRefNo) {
    IsBlock = "No";
    var ListName = "SharedDocument";
    var ItemType = GetItemTypeForListName(ListName);
    var SelectedLibrary = '';
    if (decodeURIComponent(Documentname).indexOf('/') != -1) {//3 jan 23
        SelectedLibrary = decodeURIComponent(Documentname).split('/')[0];
    }
    else {
        SelectedLibrary = decodeURIComponent(Documentname);
    }
    for (k = 0; k < SharingUserEmail.length; k++) {
        if (SharingUserEmail[k].GroupId != null && SharingUserEmail[k].GroupId != "" && SharingUserEmail[k].GroupId != "undefined" && SharingUserEmail[k].GroupId != "null") {

            var shareduserid = [];
            shareduserid.push(SharingUserEmail[k].GroupId);
            var Metadata;
            //for block download coding
            if (permissionType == "Restricted View") {
                IsBlock = "Yes";
            }
            var ValidityDate = null;
            if ($("#expiredats").val() != "") {
                ValidityDate = GetDateStandardFormat(moment($('#expiredats').val()).format('DD/MM/YYYY'));
            }
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Title: $("#FileName").text(),//File/Folder name
                SharedFileTitle: $("#FileTitle").text(),//File/Folder Title
                DocumentURL: documentURL,//File/Folder url
                SharedUsersId: { 'results': shareduserid },//Shared users
                DocumentID: documentId,//Shared file/folder id
                DOC_IDId: documentId,  //Shared file/folder id Lookupvalue
                SharedClientId: parseInt(SharingUserEmail[k].ClientId),
                DocumentType: documentType,// File/Folder
                SharedGroup: sharedGroup,//shared goupname or any label
                PermissionType: permissionType,//1 for readonly 2 for editor,
                ServerRedirectedEmbedURL: '',
                DocumentNo:(DocRefNo!=undefined||DocRefNo!=null)?DocRefNo:"",//Bhawana 4 jan 23
                //DocumentNo: sharingLinkDocumentNo,
                //Details: globalsharingDocumentDetails,
                IsBlock: IsBlock,
                SharedType: Shared_Type,
                SharedFrom: SharedFrom,
                SharedMessage: $("#txtShareMessage").val(),
                SharingValidity: ValidityDate,
                NeedAcknowledgement: $("#Acknowledgment").prop("checked"),
                LibraryURL: DMS_Link.split('/Forms')[0],
                LibraryName: SelectedLibrary,
                SiteURL: DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")),
                DocType: DocType,
                IsSendMail: $("#notifymail").prop('checked'),
                Corporate: $("#chkCorporate").prop('checked'),
                SubCategory: SubDocType,
                MetaDataRestricted:$("#chkMetaDataReq").prop('checked')
            };
            if (PermissionStatus == "Pending") {
                Metadata["PermissionStatus"] = "Pending";
            }
            //Bhawana 4 jan 23
            if($("#chkMetaDataReq").prop('checked')== true)
            {
                delete Metadata["SharingValidity"];
                delete Metadata["SubCategory"];
                delete Metadata["DocumentNo"];
            }
            $.when(AddItemToListGroups(ListName, Metadata)).done(function (response) {
                //if((k+1) == sharedUsersId.length) {
                //}
            });
        }
    }
}

// add Shared file metadata in 'SharedDocument' list
function AddSharedLinkToList_Old(documentURL, sharedUsersId, documentId, documentType, sharedGroup, permissionType, Shared_Type, DocType, SharedFrom, SubDocType) {
    IsBlock = "No";
    var ListName = "SharedDocument";
    var ItemType = GetItemTypeForListName(ListName);
    var SelectedLibrary = '';
    if (decodeURIComponent(Documentname).indexOf('/') != -1) {
        SelectedLibrary = decodeURIComponent(Documentname).split('/')[0];
    }
    else {
        SelectedLibrary = decodeURIComponent(Documentname);
    }

    for (k = 0; k < sharedUsersId.length; k++) {
        var shareduserid = [];
        shareduserid.push(sharedUsersId[k]);
        var Metadata;
        //for block download coding
        if (permissionType == "Restricted View") {
            IsBlock = "Yes";
        }
        var ValidityDate = null;
        if ($("#expiredats").val() != "") {
            ValidityDate = GetDateStandardFormat(moment($('#expiredats').val()).format('DD/MM/YYYY'));
        }
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Title: $("#FileName").text(),//File/Folder name
            SharedFileTitle: $("#FileTitle").text(),//File/Folder Title
            DocumentURL: documentURL,//File/Folder url
            SharedUsersId: { 'results': shareduserid },//Shared users
            SharedUserEmail: ShareUserPrincipleMail[k],
            DocumentID: documentId,//Shared file/folder id
            DOC_IDId: documentId,  //Shared file/folder id Lookupvalue
            DocumentType: documentType,// File/Folder
            SharedGroup: sharedGroup,//shared goupname or any label
            PermissionType: permissionType,//1 for readonly 2 for editor,
            ServerRedirectedEmbedURL: '',
            //DocumentNo: sharingLinkDocumentNo,
            //Details: globalsharingDocumentDetails,
            IsBlock: IsBlock,
            SharedType: Shared_Type,
            SharedFrom: SharedFrom,
            SharedMessage: $("#txtShareMessage").val(),
            SharingValidity: ValidityDate,
            NeedAcknowledgement: $("#Acknowledgment").prop("checked"),
            LibraryURL: DMS_Link.split('/Forms')[0],
            LibraryName: SelectedLibrary,
            SiteURL: DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")),
            DocType: DocType,
            IsSendMail: $("#notifymail").prop('checked'),
            Corporate: $("#chkCorporate").prop('checked'),
            CompanyIDId: parseInt(Logged_CompanyId),
            DepartmentIDId: parseInt(SeletedDeptId),
            SubCategory: SubDocType
        };
        if (PermissionStatus == "Pending") {
            Metadata["PermissionStatus"] = "Pending";
        }
        if ($("#sharewith").val() == "Everyone") {
            delete Metadata["SharedUserEmail"];
        }
        else {
            delete Metadata["CompanyIDId"];
            delete Metadata["DepartmentIDId"];
        }

        $.when(AddItemToListGroups(ListName, Metadata)).done(function (response) {
            //if((k+1) == sharedUsersId.length) {
            //}
            
        });
    }
}


function AddItemToListGroups(ListName, Metadata) {
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
            // console.log(data);
            dfd.resolve(data);
        },
        error: function (error) {
            alert(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
}


//update data when revoking permission
function updateItemWithIDItemListDocuments(ListName, Metadata, undefineditemID, webUrl, asyncCall) {
    if (ListName == "Shared%20Documents" || ListName == "Shared Documents") {
        ListName = "Documents";
    }
    if (webUrl != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(webUrl)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var dfd = $.Deferred();
    var oweburl = webUrl + "/_api/Web/Lists/getByTitle('" + ListName + "')/Items(" + undefineditemID + ")";
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
            console.log(undefineditemID + ': Item is set permission');
            dfd.resolve(true);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.indexOf('does not exist on type') != -1) {
                alert("Required columns does not exists. Kindly contact administrator to activate features.");
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
            waitingDialog.hide();
        }
    });
    return dfd.promise();
}

//remove the permission
function GetDocumentsRevoke(sharedHistoryUser, undefineditemID) {
    arrSharedUser = [];
    if ($('#sharewith').val() == "Organization") {
        SharingUserEmail.forEach(function (entry, index) {
            arrSharedUser.push(entry.GroupId);
        });
    }
    else {
        arrSharedUser = sharedHistoryUser.filter(function (f) { return f; })
    }
    for (k = 0; k < arrSharedUser.length; k++) {
        var queryFilter = "&$filter=SharedUsers/ID eq '" + arrSharedUser[k] + "' and DocumentID eq '" + undefineditemID + "' and PermissionStatus ne 'Revoked' and PermissionStatus ne 'RevokePending'";
        var Query = "?$select=ID,DocumentNo,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID&$expand=SharedUsers,Author" + queryFilter;
        $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
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
                    share_remarks: "Revoked due to re-share",
                    SharedEnd: new Date().toISOString()
                }
                $.when(updateItemWithIDItemListDocuments(ListName, Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
                    console.log("sucessfully revoke");
                });
            }
        });
    }
}

//update metadata of shared document
function updateDocumentPropertiesOnItemSharing(undefineditemID, serverRelativeFileUrl, securityLeveltext, sharedUserArrayListss, webUrl, asyncCall) {
    var divsharedWithPermission = $('#sharedWithPermission').val();
    var divtxtPermissionLevelId = '';
    if ($('#sharedWithPermission').val() == 'Contribute') {
        divtxtPermissionLevelId = "1073741827";
    }
    else if ($('#sharedWithPermission').val() == 'Read') {
        divtxtPermissionLevelId = "1073741826";
    }
    else {
        divtxtPermissionLevelId = "1073741937";
    }

    var ListName = CopyLibrary;
    var Metadata;
    var tempCopyLib = ListName;
    if (tempCopyLib.includes('_') == true) {
        tempCopyLib = tempCopyLib.replace('_', '_x005f_');
    }
    if (tempCopyLib.includes('%20') == true) {
        tempCopyLib = tempCopyLib.replace('%20', '_x0020_');
    }
    //if (tempCopyLib.includes('Documents') == true)
    if (tempCopyLib=='Documents'||tempCopyLib=='Shared Documents'||tempCopyLib=='Shared%20Documents') {
        var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
    }
    else {
        var ItemType = GetItemTypeForLibraryName(tempCopyLib);
    }
    if (securityLeveltext == "Selective" || securityLeveltext == "") {
        if (ShareUserPrincipleMail.length == 0) {
            for (var usr = 0; usr < SharingUserEmail.length; usr++) {
                sharedUserArrayListss.push(GetUserId(SharingUserEmail[usr], webUrl));
            }
        }
        else {
            for (var usr = 0; usr < ShareUserPrincipleMail.length; usr++) {
                sharedUserArrayListss.push(GetUserId(ShareUserPrincipleMail[usr], webUrl));
            }
        }
    }
    sharedUserArrayListss = sharedUserArrayListss.filter(function (obj) {
        return obj !== "";
    });
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        SecurityLevel: securityLeveltext,
        PermissionLevel: divsharedWithPermission,
        PermissionLevelId: divtxtPermissionLevelId,
        SharedId: { 'results': sharedUserArrayListss }
    };
    if (securityLeveltext == "Everyone") {
        Metadata["ApprovalStatus"] = ApprovalRequired();
        Metadata["AccessLevel"] = 'Everyone';
        //Metadata["Acknowledgement"] = 'Required';
        //Metadata["ApprovalStatus"] = 'Approved';
    }
    if ($("#Acknowledgment").prop("checked") == true) {
        Metadata["Acknowledgement"] = 'Required';
    }
    updateItemWithIDItemListDocuments(ListName, Metadata, undefineditemID, webUrl, asyncCall).done(function () {
    }).fail(function (err) {
        console.log(err);
    });
}


//get list of Approver required
function ApprovalRequired() {
    var ApprovalStatus = "";
    var documentApproverUserIdArrayList = [];
    var Query = "?$select=*,ID,WebPartName,Department/Id,Contributors/EMail&$top=5000&$expand=Contributors,Department&$filter=Contributors/EMail eq '" + _spPageContextInfo.userEmail + "' and WebPartName eq 'Head of the department' and Department/Id eq '" + SeletedDeptId + "' and CompanyId eq '" + Logged_CompanyId + "'";
    $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            ApprovalStatus = "Approved";
        }
        else {
            var Query = "?$select=ID,ApproverRequired,Approver/Title,Approver/EMail,Approver/Id,WebPartName,Department/Id&$top=5000&$expand=Department,Approver&$filter=WebPartName eq 'Documents' and Department/Id eq '" + SeletedDeptId + "' and CompanyId eq '" + Logged_CompanyId + "'";
            $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                if (valuesArray.length > 0) {
                    if (valuesArray[0].ApproverRequired == true) {
                        ApprovalStatus = "Pending";
                        pplApprovervalue = valuesArray[0].Approver.results;//Approvar
                        if (pplApprovervalue != null) {
                            for (var pplIndex = 0; pplIndex < pplApprovervalue.length; pplIndex++) {
                                documentApproverUserIdArrayList.push(pplApprovervalue[pplIndex].Id);
                                if (pplApprovervalue[pplIndex].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                                    ApprovalStatus = "Approved";
                                    break;
                                }
                            }
                        }
                        else {
                            ApprovalStatus = "Approved";
                        }
                    }
                    else {
                        ApprovalStatus = "Approved";
                    }
                }
                else {
                    ApprovalStatus = "Approved";
                }
            });
        }
    });
    //If Approvers is blank the Approval send to HOD
    if (documentApproverUserIdArrayList.length == 0 && ApprovalStatus == "Pending") {
        var Query = "?$select=*,ID,WebPartName,Department/Id,Contributors/Id&$top=5000&$expand=Department,Contributors&$filter=WebPartName eq 'Head of the department' and Department/Id eq '" + SeletedDeptId + "' and CompanyId eq '" + Logged_CompanyId + "'";
        $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
            if (valuesArray.length > 0) {
                if (valuesArray[0].Contributors.results != null) {
                    for (var pplIndex = 0; pplIndex < valuesArray[0].Contributors.results.length; pplIndex++) {
                        documentApproverUserIdArrayList.push(valuesArray[0].Contributors.results[pplIndex].Id);
                    }
                }
            }
        });
    }
    if (ApprovalStatus == "Pending") {
        CreateApprovalTask(documentApproverUserIdArrayList);
    }
    return ApprovalStatus;
}

//create a Approval task for documents
function CreateApprovalTask(documentApproverUserIdArrayList) {
    try {
        var linkurlForDocuments = ''
        var Metadata;
        var ItemType = GetItemTypeForListNameDetailsGroups("ApprovalTaskList");
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Title: $("#FileTitle").text(),
            CompanyId: Logged_CompanyId,
            DepartmentIdId: SeletedDeptId.toString(),
            ApproversId: { 'results': documentApproverUserIdArrayList },
            WebpartName: "Departmental Documents",
            Category: "Departmental Documents",
            Status: "Initiated",
            ItemId: parseInt(DocumentId)
        };
        $.when(AddItemToListGroups("ApprovalTaskList", Metadata)).done(function (response) {
            //Do Nothing
        });
    }
    catch (error) {
        console.log(error.message);
    }
}
//Share the selected file
function ShareFilesFolder(sharingLink, typeOfFileFolder, permissionTo) {
    var UsersId = [];
    SharingRespose = true;
    var userRole = 2;
    if ($('#sharedWithPermission').val() == "Read") {
        userRole = 1;
    }
    else if ($('#sharedWithPermission').val() == "Restricted View") {
        userRole = 7;
    }
    if (sharingLink.includes("/Documents/") == true) {
        sharingLink = sharingLink.replace('Documents', 'Shared%20Documents');
    }
    var userRoleAssignments = createJSONMetadata(SharingUserEmail, userRole);
    var restSource = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.Sharing.DocumentSharingManager.UpdateDocumentSharingInfo";
    $.ajax(
    {
        'url': restSource,
        'method': 'POST',
        async: false,
        'data': JSON.stringify({
            'resourceAddress': document.location.origin + sharingLink,
            'userRoleAssignments': userRoleAssignments,
            'validateExistingPermissions': false,
            'additiveMode': false,
            'sendServerManagedNotification': false,
            'customMessage': "Please look at the following File/Folder.",
            'includeAnonymousLinksInNotification': false
        }),
        'headers': {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        'success': function (data) {
            console.log("Assigned");
            SharingRespose = true;
        },
        'error': function (err) {
            if (err.responseText.includes("The caller has no permissions to grant permission") == true) {
                //It will done by flow then, Pass 'PermissionStatus' equal to 'Pending' in SharedDocument list.
                //alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
                //return false;
                SharingRespose = true;
                PermissionStatus = "Pending";
            }
            else {
                SharingRespose = false;
                alert(err.responseText);
                PermissionStatus = '';
                return false;
            }
        }
    });
    return SharingRespose;
}

//convert the email data into JSON format
function createJSONMetadata(emailIdCollection, roleId) {
    var jsonObj = [];
    var commonObj = {};
    commonObj['type'] = 'SP.Sharing.UserRoleAssignment';
    for (var index = 0; index < emailIdCollection.length; index++) {
        var item = {}
        item['__metadata'] = commonObj;
        item['Role'] = parseInt(roleId);
        item['UserId'] = emailIdCollection[index];
        jsonObj.push(item);
    }
    return jsonObj;
}

//get Already shared Users
function getSharedUsersId(shareDocumentitemIdd) {
    var sharefileuser = [];
    if (CopyLibrary == "Shared%20Documents") {
        CopyLibrary = "Documents";
    }
    var resturl = CopySourceURL + "/_api/web/Lists/GetByTitle('" + CopyLibrary + "')/getItemById(" + shareDocumentitemIdd + ")?$select=ServerRedirectedEmbedUri,File/Name,File/ServerRelativeUrl,Folder/Name,Folder/ServerRelativeUrl,Shared/Title,SharedId&$expand=File,Folder,SharedId"
    $.ajax({
        url: resturl,
        headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        async: false,
        success: function (data) {
            if (data.d.SharedId != null) {
                for (var m = 0; m < data.d.SharedId.results.length; m++) {
                    var sharefileuserid = data.d.SharedId.results[m];
                    sharefileuser.push(sharefileuserid);
                }
            }
        }, eror: function (data) {
            console.log(data);
        }
    });
    return sharefileuser;
}

//validation while sharing any file
function ShareFileValidation() {
    if (SharingUserEmail.length == 0) {
        if ($("#sharewith").val() != "Everyone") {
            alert("Kindly select any users first.");
            return;
        }
        else {
            if ($("#expiredon").prop("checked") && $("#expiredats").val() == "") {
                alert("Kindly enter expiry date.");
                return;
            }
            else {
                return true;
            }
        }
    }
    else if ($("#expiredon").prop("checked") && $("#expiredats").val() == "") {
        alert("Kindly enter expiry date.");
        return;
    }
    else if (new Date() > new Date($("#expiredats").val())) {
        alert("Expiry date should me greater than today.");
        return false;
    }
    else {
        return true;
    }
}

//bind projects
function loadProjects() {
    var tableItemsHTML = "",
    Query = "?$select=Id,ProjectName,DepartmentName,ClientID/Title,ManagerName/EMail,Status&$top=5000&$expand=ClientID,ManagerName&$filter=ManagerName/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    //tableItemsHTML += '<div class="dropdown-searchsec"><input type="text" class="form-control"><button class="btn custom-btn wpx-34 ml10">';
    //tableItemsHTML += '<i class="fa fa-paper-plane-o"></i></button></div>';

    $.when(getItemsWithQuery('ProjectDetails', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ProjectResults) {
        if (ProjectResults.length > 0) {
            for (var i = 0; i < ProjectResults.length; i++) {
                tableItemsHTML += '<li><input type="checkbox" id="ProjectId' + ProjectResults[i].Id + '" title="' + ProjectResults[i].ProjectName + '" class="chkProjectName"><div class="teamprojectcontent"><p>' + ProjectResults[i].ProjectName + '</p>';
                tableItemsHTML += '<span>' + ProjectResults[i].Status + '</span> | <span>' + ProjectResults[i].DepartmentName + '</span></div></li>';
            }
            $("#projectList").append(tableItemsHTML);
        }
    });
    $(".chkProjectName").click(function () {
        getProjectUsers(this.title, this.id.replace("ProjectId", ""), this.checked);
        var selectProjectNames = [];
        var currentGp = this.title;
        if ($("#selectProjectNames").text() != "Select" && $("#selectProjectNames").text() != "") {
            selectProjectNames = $("#selectProjectNames").text().split(',');
        }
        if (this.checked) {
            $("#selectProjectNames").text("");
            selectProjectNames.push(this.title);
        }
        else {
            selectProjectNames = selectProjectNames.filter(function (obj) {
                return obj !== currentGp;
            });
        }
        if (selectProjectNames.length == 0) {
            $("#selectProjectNames").text("Select");
        }
        else {
            $("#selectProjectNames").text(selectProjectNames.toString());
        }
    });
}

//get project Name
function getProjectUsers(ProjectName, ProjectID, IsChecked) {
    var BindUser = '';
    var Query = "?$select=Id,Project/Id,TeamMember/EMail,TeamMember/Title,TeamMember/Id,Status&$top=5000&$expand=Project,TeamMember&$filter=Project/Id eq '" + ProjectID + "' ";
    $.when(getItemsWithQuery('ProjectTeamDetails', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TeamResult) {
        if (TeamResult.length > 0) {
            for (var i = 0; i < TeamResult.length; i++) {
                if (IsChecked == true) {
                    BindUser = '';
                    var tempEmail = TeamResult[i].TeamMember.EMail;
                    if (tempEmail.includes('#') == true) {
                        tempEmail = tempEmail.split('#ext')[0];
                        tempEmail = tempEmail.replace("_", '@');
                    }
                    SharingUserEmail.push(tempEmail);
                    ShareUserPrincipleMail.push(TeamResult[i].TeamMember.EMail);
                    SharingUserId.push(TeamResult[i].TeamMember.Id);
                    SharingUserName.push(TeamResult[i].TeamMember.Title);
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                    BindUser += '<div class="col-sm-6 parentremove ProjectUser' + TeamResult[i].Id + '"><div class="employeesection">';
                    BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + TeamResult[i].TeamMember.Title + '\', ' + TeamResult[i].TeamMember.Id + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                    BindUser += '<div class="empoyeeimg"><img src="' + attachment + '" alt="">';
                    BindUser += '</div><div class="employeeinfo"><h3>' + TeamResult[i].TeamMember.Title + '</h3>';
                    BindUser += '<span class="employeeemail" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</span>';
                    BindUser += '</div></div></div>';
                    $("#AddUserPplPicker").before(BindUser);
                }
                else {
                    $(".ProjectUser" + TeamResult[i].Id).remove();
                    if (tempEmail == null) {
                        tempEmail = "";
                    }
                    SharingUserEmail = SharingUserEmail.filter(function (obj) {
                        return obj.toLowerCase() !== tempEmail.toLowerCase();
                    });
                    SharingUserId = SharingUserId.filter(function (obj) {
                        return obj !== TeamResult[i].TeamMember.Id;
                    });
                    if (TeamResult[i].TeamMember.Title == null) {
                        TeamResult[i].TeamMember.Title = "";
                    }
                    SharingUserName = SharingUserName.filter(function (obj) {
                        return obj.toLowerCase() !== TeamResult[i].TeamMember.Title.toLowerCase();
                    });
                }
            }
        }
    });
}



//get Guest-clients in which logged_In user is either InternalStakeHolder or Internal_Supervisior 
function getGuestClientShare() {
    var ClientHTML = '';
    //ClientHTML += '<div class="dropdown-searchsec"><input type="text" class="form-control"><button class="btn custom-btn wpx-34 ml10">';
    //ClientHTML += '<i class="fa fa-paper-plane-o"></i></button></div>';
    var Query = "?$select=Id,Title,IsActive,GroupName/Id,GroupName/Title,DocumentLibrary,CompanyID/Id,DocumentLibrary,InternalMembers/EMail,InternalSupervisor/EMail&$orderby=Title asc&$expand=GroupName,CompanyID,InternalMembers,InternalSupervisor&$top=5000&$filter=IsActive eq '1' and InternalMembers/EMail eq '" + _spPageContextInfo.userEmail + "' or InternalSupervisor/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Clients) {
        if (Clients.length > 0) {
            for (var i = 0; i < Clients.length; i++) {
                var value = Clients[i];
                if (value.DocumentLibrary != null) {
                    ClientHTML += '<li><input type="checkbox" class="chkClientName chk' + value.GroupName.Id + '" title="' + value.Title + '" onclick="ShowGetClient(\'' + value.Title + '\', \'' + value.GroupName.Id + '\', \'' + value.GroupName.Title + '\', \'' + value.Id + '\', this)">' + value.Title + '</li>';
                }
            }
            $("#ClientList").append(ClientHTML);
        }
    });
}

//Show and Get metdata for selected guest client
function ShowGetClient(Title, GroupId, GroupTitle, ClientId, Action) {
    getClientUsers(Title, GroupId, GroupTitle, Action.checked);
    var selectedClientName = [];
    if (Action.checked) {
        SharingUserEmail.push({
            GroupId: GroupId,
            ClientName: Title,
            ClientId: ClientId,
            GroupTitle: GroupTitle
        });
    }
    else {
        SharingUserEmail = SharingUserEmail.filter(function (obj) {
            return obj.GroupId != GroupId;
        });
    }
    if ($(".chkClientName:checked").length != 0) {
        $("#userDiv").show();
        $(".chkClientName:checked").each(function () {
            selectedClientName.push(this.title);
        });
        if (selectedClientName.join(", ").length > 62) {
            selectedClientNameTemp = selectedClientName.join(",");
            selectedClientNameTemp = selectedClientNameTemp.substring(0, 62);
            $("#selectClientName").text(selectedClientNameTemp + '...');
        }
        else {
            $("#selectClientName").text(selectedClientName.join(","));
        }
    }
    else {
        $("#selectClientName").text("Select");
        $("#userDiv").hide();
    }
}

//get and bind my groups
function getClientUsers(ClientName, GroupId, GroupTitle, IsChecked) {
    var BindUser = '';
    var attachment = '';
    if (IsChecked == true) {
        BindUser = '';
        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(GroupTitle);
        BindUser += '<div class="col-sm-6 parentremove GpUser' + GroupId + '"><div class="employeesection">';
        BindUser += '<span onclick="RemoveGroup(\'' + GroupId + '\');" class="crosebox"><i class="fa fa-times"></i></span>';
        BindUser += '<div class="empoyeeimg"><img src="' + attachment + '" alt="">';
        BindUser += '</div><div class="employeeinfo"><h3>' + ClientName + '</h3>';
        BindUser += '<span class="employeeemail">' + GroupTitle + '</span>';
        BindUser += '</div></div></div>';
        $("#AddUserPplPicker").before(BindUser);
    }
    else {
        $(".GpUser" + GroupId).remove();
    }
}


//Remove Group
function RemoveGroup(GpId) {
    SharingUserEmail = SharingUserEmail.filter(function (obj) {
        return obj.GroupId != GpId;
    });
    $(".GpUser" + GpId).remove();
    $(".chk" + GpId).prop('disabled', 'disabled');
    if (SharingUserEmail.length == 0) {
        $("#userDiv").hide();
    }
}


//on change peoplePIcker
function onChangeSharing(HTMLID, PplPickerId, userHTMLId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        if (userInfo.length > 0) {
            BindUser = '';
            tempUserId = parseInt(getUserInformation(PplPickerId));
            SharingUserId.push(tempUserId);
            var tempEmail = userInfo[0].Key.split('|')[2];
            ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
            if (tempEmail.includes('#') == true) {
                tempEmail = tempEmail.split('#ext')[0];
                tempEmail = tempEmail.replace("_", '@');
            }
            SharingUserEmail.push(tempEmail);
            SharingUserName.push(userInfo[0].DisplayText);
            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
            BindUser += '<div class="col-sm-6 parentremove User' + tempUserId + '"><div class="employeesection">';
            BindUser += '<span onclick="removeShareUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
            BindUser += '<div class="empoyeeimg"><img src="' + attachment + '" alt="">';
            BindUser += '</div><div class="employeeinfo"><h3>' + userInfo[0].DisplayText + '</h3>';
            BindUser += '<span class="employeeemail" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</span>';
            BindUser += '</div></div></div>';
            $("#" + userHTMLId).before(BindUser);
            EmptyPeoplePicker(PplPickerId);
        }
        else {
            //$("#userList").hide();
        }
    };
}



//get and bind my groups
function getMyGroups() {
    var groupHTML = '';
    var attachment = '';
    //groupHTML += '<div class="dropdown-searchsec"><input type="text" class="form-control"><button class="btn custom-btn wpx-34 ml10">';
    //groupHTML += '<i class="fa fa-paper-plane-o"></i></button></div>';
    var Query = "?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/EMail,LogonUser/ID,LogonUser/EMail,LogonUser/Title,LogonUser/UserName,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID asc&$filter=LogonUser/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("DocumentSharedGroups", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (groupArray) {
        if (groupArray.length > 0) {
            for (var group = 0; group < groupArray.length; group++) {
                groupHTML += '<li><input type="checkbox" class="chkGpName" id="GroupId' + groupArray[group].Id + '" title="' + groupArray[group].SharingLevel + '"><div class="insidemygroup"><h3>' + groupArray[group].SharingLevel + '</h3><ul class="listingroups">';
                if (groupArray[group].SharedUsers.results != null) {
                    for (var gpuser = 0; gpuser < groupArray[group].SharedUsers.results.length; gpuser++) {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(groupArray[group].SharedUsers.results[gpuser].EMail);
                        groupHTML += '<li><img src="' + attachment + '" title="' + groupArray[group].SharedUsers.results[gpuser].Title + '"></li>';
                    }
                }
                groupHTML += '</ul></li>';
            }
            $("#GroupNameList").append(groupHTML);
        }
    });
    $(".chkGpName").click(function () {
        getMyGroupsUsers(parseInt(this.id.replace("GroupId", "")), this.checked);
        var selectedGroupName = [];
        var currentGp = this.title;
        if ($("#selectedGroupNames").text() != "Select" && $("#selectedGroupNames").text() != "") {
            selectedGroupName = $("#selectedGroupNames").text().split(',');
        }
        if (this.checked) {
            $("#selectedGroupNames").text("");
            selectedGroupName.push(this.title);
        }
        else {
            selectedGroupName = selectedGroupName.filter(function (obj) {
                return obj !== currentGp;
            });
        }
        if (selectedGroupName.length == 0) {
            $("#selectedGroupNames").text("Select");
        }
        else {
            $("#selectedGroupNames").text(selectedGroupName.toString());
        }
    });
}

//get and bind my groups
function getMyGroupsUsers(ItemId, IsChecked) {
    var BindUser = '';
    var attachment = '';
    var Query = "?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/EMail,LogonUser/ID,LogonUser/EMail,LogonUser/Title,LogonUser/UserName,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID asc&$filter=LogonUser/EMail eq '" + _spPageContextInfo.userEmail + "' and ID eq '" + ItemId + "' ";
    $.when(getItemsWithQuery("DocumentSharedGroups", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (groupArray) {
        if (groupArray.length > 0) {
            for (var group = 0; group < groupArray.length; group++) {
                if (groupArray[group].SharedUsers.results != null) {
                    for (var gpuser = 0; gpuser < groupArray[group].SharedUsers.results.length; gpuser++) {
                        if (IsChecked == true) {
                            BindUser = '';
                            SharingUserEmail.push(groupArray[group].SharedUsers.results[gpuser].EMail);
                            ShareUserPrincipleMail.push(groupArray[group].SharedUsers.results[gpuser].EMail);
                            SharingUserId.push(groupArray[group].SharedUsers.results[gpuser].ID);
                            SharingUserName.push(groupArray[group].SharedUsers.results[gpuser].Title);
                            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(groupArray[group].SharedUsers.results[gpuser].EMail);
                            BindUser += '<div class="col-sm-6 parentremove User' + groupArray[group].Id + '"><div class="employeesection">';
                            BindUser += '<span onclick="removeShareUser(this, \'' + groupArray[group].SharedUsers.results[gpuser].EMail + '\', \'' + groupArray[group].SharedUsers.results[gpuser].Title + '\', ' + groupArray[group].SharedUsers.results[gpuser].ID + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                            BindUser += '<div class="empoyeeimg"><img src="' + attachment + '" alt="">';
                            BindUser += '</div><div class="employeeinfo"><h3>' + groupArray[group].SharedUsers.results[gpuser].Title + '</h3>';
                            BindUser += '<span class="employeeemail" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + groupArray[group].SharedUsers.results[gpuser].EMail + '\')">' + groupArray[group].SharedUsers.results[gpuser].EMail + '</span>';
                            BindUser += '</div></div></div>';
                            $("#AddUserPplPicker").before(BindUser);
                        }
                        else {
                            $(".User" + groupArray[group].Id).remove();
                            SharingUserEmail = SharingUserEmail.filter(function (obj) {
                                return obj.toLowerCase() !== groupArray[group].SharedUsers.results[gpuser].EMail.toLowerCase();
                            });
                            SharingUserId = SharingUserId.filter(function (obj) {
                                return obj !== groupArray[group].SharedUsers.results[gpuser].ID;
                            });
                            SharingUserName = SharingUserName.filter(function (obj) {
                                return obj.toLowerCase() !== groupArray[group].SharedUsers.results[gpuser].Title.toLowerCase();
                            });
                        }
                    }
                }
            }
        }
    });
}

//remove user from each step
function removeShareUser(Action, Email, DisplayName, EmpId, count) {
    $(Action).parents('.parentremove').remove();
    SharingUserEmail = SharingUserEmail.filter(function (obj) {
        return obj.toLowerCase() !== Email.toLowerCase();
    });
    SharingUserName = SharingUserName.filter(function (obj) {
        return obj.toLowerCase() !== DisplayName.toLowerCase();
    });
    SharingUserId = SharingUserId.filter(function (obj) {
        return obj != EmpId;
    });
    /*if (SharingUserEmail.length == 0) {
        $(".userBox").hide();
    }*/
}


//Bind Shared History while filtering data
function FilterShareHistory(documentid, itemurl, title, documentno, fileName, type, Action, SharedItemId) {
    selectedHistoryDoc = [];
    $("#FilePath").text(itemurl);
    var uniqueValues = [],
	arrduplicateClient = [],
	arrduplcteRevokdClient = [],
	arrduplcteRevokdTime = [],
	arrDuplicateSharedTo = []; SharedTo = '';
    var IsModal = 'true';
    var Doc_Type = 'My_Doc';
    $(".select_all").prop("checked", false);          //For all Checkbox
    $("#revokebtn").hide();
    $(".context-menu").hide();
    $('#sharedHistoryList').html('');
    if ($(".headdingLinks").text() == 'Shared with Me') {
        Action = "SharedWithMe";
    }
    else {
        Action = "SharedByMe";
    }
    var itemsSharedHistory = [];
    if ($("#shreduser").val() != "All" || $("#sharedAs").val() != "All") {
        if ($("#shreduser").val() == "All" && $("#sharedAs").val() != "All") {
            var PermissionQuery = '';
            if ($("#sharedAs").val() == "true") {
                PermissionQuery = true;
            }
            else {
                PermissionQuery = $("#sharedAs").val();
            }
            itemsSharedHistory = currentSharedHistory.filter(function (obj) {
                return obj.NeedAcknowledgement == PermissionQuery || obj.PermissionType == PermissionQuery;
            });
        }
        else if ($("#shreduser").val() != "All" && $("#sharedAs").val() == "All") {
            itemsSharedHistory = currentSharedHistory.filter(function (obj) {
                return (obj.SharedClient.Title == $("#shreduser").val() || obj.SharedUserEmail == $("#shreduser").val());
            });
        }
        else if ($("#shreduser").val() != "All" && $("#sharedAs").val() != "All") {
            var PermissionQuery = '';
            if ($("#sharedAs").val() == "true") {
                PermissionQuery = true;
            }
            else {
                PermissionQuery = $("#sharedAs").val();
            }

            itemsSharedHistory = currentSharedHistory.filter(function (obj) {
                return (obj.NeedAcknowledgement == PermissionQuery || obj.PermissionType == PermissionQuery) && (obj.SharedClient.Title == $("#shreduser").val() || obj.SharedUserEmail == $("#shreduser").val());
            });
        }
    }
    else {
        //Cloning array
        itemsSharedHistory = currentSharedHistory.filter(function (f) { return f; })
    }
    if (itemsSharedHistory.length > 0) {
        var sharedHistory = "";
        for (var index = 0; index < itemsSharedHistory.length; index++) {
            var SiteURL = '';
            if (itemsSharedHistory[index].SiteURL == "null" || itemsSharedHistory[index].SiteURL == null || itemsSharedHistory[index].SiteURL == "undefined" || itemsSharedHistory[index].SiteURL == undefined) {
                if (encodeURI(itemsSharedHistory[index].DocumentURL).indexOf("DepartmentalDMS") != -1) {
                    SiteURL = window.location.origin + encodeURI(itemsSharedHistory[index].DocumentURL).split('DepartmentalDMS')[0];
                }
                else {
                    SiteURL = _spPageContextInfo.webAbsoluteUrl;
                }
            }
            else {
                SiteURL = itemsSharedHistory[index].SiteURL;
            }

            var fileTitle = itemsSharedHistory[index].Title;
            var PermissionType = DisplayPermissionType = itemsSharedHistory[index].PermissionType;
            if (DisplayPermissionType == "Contribute") {
                DisplayPermissionType = "Full Access";
            }
            else if (DisplayPermissionType == "Read") {
                DisplayPermissionType = "Read Access";
            }
            else { //Restricted View
                DisplayPermissionType = "Restricted Access";
            }
            var currentItemId = itemsSharedHistory[index].ID;
            var PermissionStatus = itemsSharedHistory[index].PermissionStatus;
            var userNamecurretn = "";
            var userEmail = '';
            var userId = "";
            var NeedAck = itemsSharedHistory[index].NeedAcknowledgement;
            if (NeedAck == true) {
                NeedAck = "Required";
            }
            else {
                NeedAck = "Not Required";
            }
            var SharingValidity = '';
            if (itemsSharedHistory[index].SharingValidity != null) {
                SharingValidity = moment(itemsSharedHistory[index].SharingValidity).format('MMM D YYYY');
            }
            for (var j = 0; j < itemsSharedHistory[index].SharedUsers.results.length; j++) {
                if (uniqueValues.indexOf(itemsSharedHistory[index].SharedUsers.results[j].Title) == -1) {
                    uniqueValues.push(itemsSharedHistory[index].SharedUsers.results[j].Title);
                    if (itemsSharedHistory[index].SharedGroup != "Organization") {
                        //option += "<option value='" + itemsSharedHistory[index].SharedUsers.results[j].Title + "'title='" + itemsSharedHistory[index].SharedUsers.results[j].Title + "'>" + itemsSharedHistory[index].SharedUsers.results[j].Title + "</option>";
                    }
                    else {
                        if (jQuery.inArray(itemsSharedHistory[index].SharedClient.Title, arrDuplicateSharedTo) == '-1') {
                            //option += "<option value='" + itemsSharedHistory[index].SharedClient.Title + "'title='" + itemsSharedHistory[index].SharedClient.Title + "'>" + itemsSharedHistory[index].SharedClient.Title + "</option>";
                            arrDuplicateSharedTo.push(itemsSharedHistory[index].SharedClient.Title);
                        }
                    }
                }
                userNamecurretn = itemsSharedHistory[index].SharedUsers.results[j].Title
                userEmail = itemsSharedHistory[index].SharedUserEmail;
                userEmail = userEmail ? userEmail : "";
                userId = itemsSharedHistory[index].SharedUsers.results[j].Id;
            }
            var SharedBYAck = itemsSharedHistory[index].Author.Title;
            if (itemsSharedHistory[index].SharedGroup != "Organization") {
                if (PermissionStatus == "Revoked" || PermissionStatus == "RevokePending") {
                    sharedHistory += "<tr><td></td>";
                    if (Action != "SharedWithMe") {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(userEmail);
                        if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                            sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + userNamecurretn.charAt(0) + "</div><div class='designationtype'>";
                        }
                        else {
                            sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        }
                        sharedHistory += "<h3 class='namesection'>" + userNamecurretn + "</h3>";
                        tempEmail = userEmail.split('#ext')[0];
                        tempEmail = tempEmail.replace("_", '@');
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + tempEmail + "\");'>" + tempEmail + "</a></div></div></td>";
                    }
                    else {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                        sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                    }

                    sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                    sharedHistory += "<td>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created) + "</td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                    }
                    else {
                        sharedHistory += "<td>" + userNamecurretn + "</td>";
                    }
                    sharedHistory += "<td>" + SharingValidity + "</td>";
                    if (NeedAck == "Required") {
                        if (Action != "SharedWithMe") { //This is 'Shared By Me'
                            var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                        else {
                            var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                    }
                    else {
                        sharedHistory += "<td>Not Required</td>";
                    }
                    var RevokeRemarks = '';
                    if (itemsSharedHistory[index].share_remarks != null) {
                        RevokeRemarks = (itemsSharedHistory[index].share_remarks.substring(0, 20));
                    }
                    sharedHistory += "<td><div class='RevokedDetails'><span style='cursor: not-allowed;color: Red;'>Revoked</span><span>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Modified) + "</span><span style='color: Red;'>" + RevokeRemarks + "</span></td>";
                    sharedHistory += "</tr>";
                }
                else {
                    SharedTo = 'User';
                    var UserOrGroup = 'User';
                    sharedHistory += "<tr>";
                    if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                        UserOrGroup = 'Everyone';
                    }
                    sharedHistory += "<td><input type='checkbox' class='historydocid' value=" + DocumentId + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + ',' + SharedTo + ',' + UserOrGroup + ',' + SiteURL + ',' + userEmail + " title='" + userId + "''></td>";
                    if (Action != "SharedWithMe") {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(userEmail);
                        if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                            IsBtnHide = getApprovalStatus(itemsSharedHistory[index].LibraryName, itemsSharedHistory[index].SiteURL, itemsSharedHistory[index].DocumentID);
                            sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + userNamecurretn.charAt(0) + "</div><div class='designationtype'>";
                        }
                        else {
                            IsBtnHide = false;
                            sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        }
                        sharedHistory += "<h3 class='namesection'>" + userNamecurretn + "</h3>";
                        tempEmail = userEmail.split('#ext')[0];
                        tempEmail = tempEmail.replace("_", '@');
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + tempEmail + "\");'>" + tempEmail + "</a></div></div></td>";
                    }
                    else {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                        sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                    }
                    sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                    sharedHistory += "<td>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created) + "</td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                    }
                    else {
                        sharedHistory += "<td>" + userNamecurretn + "</td>";
                    }
                    sharedHistory += "<td>" + SharingValidity + "</td>";
                    if (IsBtnHide == false) {
                        if (NeedAck == "Required") {
                            if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                sharedHistory += "<td>" + AckValue + "</td>";
                            }
                            else {
                                var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                sharedHistory += "<td>" + AckValue + "</td>";
                            }
                        }
                        else {
                            sharedHistory += "<td>Not Required</td>";
                        }
                        if (Action != "SharedWithMe") {
                            sharedHistory += '<td><a style="cursor: pointer;" class="fileFolderRevoke" onclick="RevokePermission(' + DocumentId + ',\'' + encodeURI(itemurl) + '\',' + userId + ',' + currentItemId + ', \'' + IsModal + '\', \'' + itemsSharedHistory[index].DocumentType + '\', \'' + UserOrGroup + '\', \'' + SiteURL + '\', \'' + userEmail + '\')">Revoke</a></td>';
                        }
                        else {
                            sharedHistory += '<td></td>';
                        }
                    }
                    else {
                        sharedHistory += '<td></td>';
                        sharedHistory += '<td>Approval Pending</td>';
                    }
                    sharedHistory += "</tr>";
                }
            }
            else { //to bind all the external users sharing in one table row [Organizations wise]
                if (PermissionStatus == "Revoked" || PermissionStatus == "RevokePending") {
                    //var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].SharedClient.Title);
                    sharedHistory += "<tr><td></td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td><div class='flexingtwo'><div class='empoyeeimg clientnameshow'><span class='clienttext'><div id='profileImage'>" + itemsSharedHistory[index].SharedClient.Title.charAt(0) + "</div></span>";
                        sharedHistory += "</div><div class='designationtype'><h3 class='namesection'>" + itemsSharedHistory[index].SharedClient.Title + "</h3><p>Guest Client</p></td>";
                    }
                    else {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                        sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                    }
                    sharedHistory += "</div></div><td>" + DisplayPermissionType + "</td>";
                    sharedHistory += "<td>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created) + "</td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                    }
                    else {
                        sharedHistory += "<td>" + itemsSharedHistory[index].SharedClient.Title + "</td>";
                    }
                    sharedHistory += "<td>" + SharingValidity + "</td>";
                    if (NeedAck == "Required") {
                        if (Action != "SharedWithMe") { //This is 'Shared By Me'
                            var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                        else {
                            var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                    }
                    else {
                        sharedHistory += "<td>Not Required</td>";
                    }
                    var RevokeRemarks = '';
                    if (itemsSharedHistory[index].share_remarks != null) {
                        RevokeRemarks = (itemsSharedHistory[index].share_remarks.substring(0, 20));
                    }
                    sharedHistory += "<td><div class='RevokedDetails'><span style='cursor: not-allowed;color: Red;'>Revoked</span><span>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Modified) + "</span><span style='color: Red;'>" + RevokeRemarks + "</span></td>";
                }
                else {
                    SharedTo = 'Organization';
                    var UserOrGroup = 'User';
                    if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                        UserOrGroup = 'Everyone';
                    }
                    //var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].SharedClient.Title);
                    sharedHistory += "<tr>";

                    sharedHistory += "<td><input type='checkbox' class='historydocid' value=" + DocumentId + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + ',' + SharedTo + ',' + UserOrGroup + ',' + SiteURL + " title='" + userId + "''></td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + itemsSharedHistory[index].SharedClient.Title.charAt(0) + "</div><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].SharedClient.Title + "</h3>";
                        sharedHistory += "</div></div></td>";
                    }
                    else {
                        var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                        sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                        sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                        sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                    }
                    sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                    sharedHistory += "<td>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created) + "</td>";
                    if (Action != "SharedWithMe") {
                        sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                    }
                    else {
                        sharedHistory += "<td>" + itemsSharedHistory[index].SharedClient.Title + "</td>";
                    }
                    sharedHistory += "<td>" + SharingValidity + "</td>";
                    if (NeedAck == "Required") {
                        if (Action != "SharedWithMe") { //This is 'Shared By Me'
                            var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                        else {
                            var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                            sharedHistory += "<td>" + AckValue + "</td>";
                        }
                    }
                    else {
                        sharedHistory += "<td>Not Required</td>";
                    }
                    if (Action != "SharedWithMe") {
                        sharedHistory += '<td><a style="cursor: pointer;" class="fileFolderRevoke" onclick=" RevokeGpPermission(' + userId + ', ' + currentItemId + ', \'' + IsModal + '\', \'' + itemsSharedHistory[index].DocumentType + '\', \'' + UserOrGroup + '\', \'' + encodeURI(itemurl) + '\', \'' + SiteURL + '\');">Revoke</a></td>';
                    }
                    else {
                        sharedHistory += '<td></td>';
                    }
                    sharedHistory += "</tr>";
                }
            }
        }

        if (ShareHostoryTable != '') {
            ShareHostoryTable.destroy();
        }
        $("#sharedHistoryList").empty().append(sharedHistory);
        $("#TotalItemscount").text(itemsSharedHistory.length);
        if (itemsSharedHistory.length > 0) {
            selectedHistoryDocEvent();
            TablePaginationShareHistory()

            //Check permissions
            if (currentSectionType != 'My Documents' && currentSectionType != 'SharedWithMe' && currentSectionType != 'SharedByMe') {
                getListUserEffectivePermissions(SiteURL, listTitle, true, parseInt(documentid), 'i:0#.f|membership|' + _spPageContextInfo.userLoginName + '');
                if (IsNotpermission == true) {
                    if (IsContributor == false && IsFullControl == false) { //Reader
                        $(".fileFolderRevoke").hide();
                    }
                }
                else {
                    if (arrPermission.length > 0) {
                        $(".fileFolderRevoke").hide();
                    }
                }
            }
        }
    }
    else {
        $("#sharedHistoryTable_paginate").hide();
        $("#sharedHistoryTable_info").hide();
        sharedHistory = '';
        sharedHistory = '<tr><td colspan="9"><div style="text-align: center; font-size: 14px; padding: 10px 0px;" data-localize="NoRecordFound">No Record Found</div></td></tr>';
        $("#shreduser").empty().append('<option value="All">All</option>');
        $("#sharedHistoryList").empty().append(sharedHistory);
        $(".NoRecordFound").hide();
        $("#TotalItemscount").text('0');
    }
}


//get shared History of File with 'Revoke' option
function GetSharedHistory(documentid, itemurl, title, documentno, fileName, type, Action, SharedItemId) {
    waitingDialog.show();
    setTimeout(function () {

        fileName = /[^/]*$/.exec(itemurl)[0];
        $("#FilePath").text(itemurl);
        selectedHistoryDoc = [];
        var option = "",
        uniqueValues = [],
        arrduplicateClient = [],
        arrduplcteRevokdClient = [],
        arrduplcteRevokdTime = [],
        arrDuplicateSharedTo = []; SharedTo = '';
        var IsModal = 'true';
        var Doc_Type = 'My_Doc';
        $(".select_all").prop("checked", false);          //For all Checkbox
        $("#revokebtn").hide();
        $(".context-menu").hide();
        $('#sharedHistoryList').html('');
        $('#myModalShareHistory').modal('show');//,SharedUsers/EMail
        $("#HeadingShareWith").text('Shared With');
        $("#HeadingShareBy").text('Shared By');
        if (Action == "Filter" && $("#shreduser").val() != "All" && $("#sharedAs").val() != "All") {
            if ($("#shreduser").val() == "All" && $("#sharedAs").val() != "All") {
                var PermissionQuery = '';
                if ($("#sharedAs").val() == "true") {
                    PermissionQuery = "NeedAcknowledgement eq '1'";
                }
                else {
                    PermissionQuery = "PermissionType eq '" + $("#sharedAs").val() + "' ";
                }
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=DocumentID eq '" + documentid + "' and " + PermissionQuery + " &$orderby=Created asc";
            }
            else if ($("#shreduser").val() != "All" && $("#sharedAs").val() == "All") {
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=DocumentID eq '" + documentid + "' and (SharedUsers/EMail eq '" + $("#shreduser").val() + "' or SharedClient/Title eq '" + $("#shreduser").val() + "')&$orderby=Created asc";
            }
            else if ($("#shreduser").val() != "All" && $("#sharedAs").val() != "All") {
                var PermissionQuery = '';
                if ($("#sharedAs").val() == "true") {
                    PermissionQuery = "NeedAcknowledgement eq '1'";
                }
                else {
                    PermissionQuery = "PermissionType eq '" + $("#sharedAs").val() + "' ";
                }
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=DocumentID eq '" + documentid + "' and (SharedUsers/EMail eq '" + $("#shreduser").val() + "' or SharedClient/Title eq '" + $("#shreduser").val() + "') and " + PermissionQuery + "&$orderby=Created asc";
            }
        }
        else if (Action == "SharedWithMe") {
            DocumentId = documentid;
            $("#HeadingShareWith").text('Shared By');
            $("#HeadingShareBy").text('Shared With');
            var checkQuery = '';
            var Query = "?$select=Id,Title,IsActive,CompanyID/Id,DocumentLibrary,InternalMembers/EMail,InternalSupervisor/EMail&$expand=CompanyID,InternalMembers,InternalSupervisor&$top=5000&$filter=DocumentLibrary ne null and IsActive eq '1' and InternalMembers/EMail eq '" + _spPageContextInfo.userEmail + "' or InternalSupervisor/EMail eq '" + _spPageContextInfo.userEmail + "' ";
            $.when(getItemsWithQuery("ClientMaster", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Clients) {
                if (Clients.length > 0) {
                    for (var client = 0; client < Clients.length; client++) {
                        checkQuery += " or SharedClient/Title eq '" + Clients[client].Title + "' ";
                    }
                }
            });
            if (SharedItemId == '' || SharedItemId == null || SharedItemId == "null") {
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=(DocumentID eq '" + documentid + "' and (SharedUsers/Id eq '" + _spPageContextInfo.userId + "' or SharedGroup eq 'Everyone' " + checkQuery + "))&$orderby=Created asc";
            }
            else {
                var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=(Id eq '" + SharedItemId + "' and DocumentID eq '" + documentid + "' and (SharedUsers/Id eq '" + _spPageContextInfo.userId + "' or SharedGroup eq 'Everyone' " + checkQuery + "))&$orderby=Created asc";
            }
        }
        else if (Action == "SharedByMe") {
            DocumentId = documentid;
            var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' and DocumentID eq '" + documentid + "' and Title eq '" + encodeURIComponent(fileName) + "'&$orderby=Created asc";
        }
        else {
            DocumentId = documentid;
            var Query = "?$select=*,SharedUsers/Id,SharedUsers/Title,SharedClient/Title,Author/Title,Author/EMail&$expand=Author,SharedUsers,SharedClient&$Filter=DocumentID eq '" + documentid + "' and Title eq '" + encodeURIComponent(fileName) + "'&$orderby=Created asc";
        }
        $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (itemsSharedHistory) {

            $("#filenamee").html(fileName);
            if (documentno == "null") {
                $("#referNo").html('');
            }
            else {
                $("#referNo").html(documentno);
            }
            //Cloning array
            currentSharedHistory = itemsSharedHistory.filter(function (f) { return f; });
            if (itemsSharedHistory.length > 0) {
                var sharedHistory = "";
                option += '<option value="All">All</option>';

                for (var index = 0; index < itemsSharedHistory.length; index++) {
                    var SiteURL = '';
                    var SharedBYAck = itemsSharedHistory[index].Author.Title;
                    if (itemsSharedHistory[index].SiteURL == "null" || itemsSharedHistory[index].SiteURL == null || itemsSharedHistory[index].SiteURL == "undefined" || itemsSharedHistory[index].SiteURL == undefined) {
                        if (encodeURI(itemsSharedHistory[index].DocumentURL).indexOf("DepartmentalDMS") != -1) {
                            SiteURL = window.location.origin + encodeURI(itemsSharedHistory[index].DocumentURL).split('DepartmentalDMS')[0];
                        }
                        else {
                            SiteURL = _spPageContextInfo.webAbsoluteUrl;
                        }
                    }
                    else {
                        SiteURL = itemsSharedHistory[index].SiteURL;
                    }

                    var fileTitle = itemsSharedHistory[index].Title;
                    var PermissionType = DisplayPermissionType = itemsSharedHistory[index].PermissionType;
                    if (DisplayPermissionType == "Contribute") {
                        DisplayPermissionType = "Full Access";
                    }
                    else if (DisplayPermissionType == "Read") {
                        DisplayPermissionType = "Read Access";
                    }
                    else { //Restricted View
                        DisplayPermissionType = "Restricted Access";
                    }
                    var currentItemId = itemsSharedHistory[index].ID;
                    var PermissionStatus = itemsSharedHistory[index].PermissionStatus;
                    if (itemsSharedHistory[index].SharedFileTitle != null) {
                        $("#filetitle").html(itemsSharedHistory[index].SharedFileTitle);
                    }
                    else {
                        $("#filetitle").html('');
                    }
                    var userNamecurretn = "";
                    var userEmail = '';
                    var userId = "";
                    var NeedAck = itemsSharedHistory[index].NeedAcknowledgement;
                    if (NeedAck == true) {
                        NeedAck = "Required";
                    }
                    else {
                        NeedAck = "Not Required";
                    }
                    var SharingValidity = '';
                    if (itemsSharedHistory[index].SharingValidity != null) {
                        SharingValidity = moment(itemsSharedHistory[index].SharingValidity).format('MMM D YYYY');//titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].SharingValidity)
                    }
                    for (var j = 0; j < itemsSharedHistory[index].SharedUsers.results.length; j++) {
                        if (uniqueValues.indexOf(itemsSharedHistory[index].SharedUsers.results[j].Title) == -1) {
                            uniqueValues.push(itemsSharedHistory[index].SharedUsers.results[j].Title);
                            if (itemsSharedHistory[index].SharedGroup != "Organization") {
                                option += "<option value='" + itemsSharedHistory[index].SharedUserEmail + "'title='" + itemsSharedHistory[index].SharedUsers.results[j].Title + "'>" + itemsSharedHistory[index].SharedUsers.results[j].Title + "</option>";
                            }
                            else {
                                if (jQuery.inArray(itemsSharedHistory[index].SharedClient.Title, arrDuplicateSharedTo) == '-1') {
                                    option += "<option value='" + itemsSharedHistory[index].SharedClient.Title + "'title='" + itemsSharedHistory[index].SharedClient.Title + "'>" + itemsSharedHistory[index].SharedClient.Title + "</option>";
                                    arrDuplicateSharedTo.push(itemsSharedHistory[index].SharedClient.Title);
                                }
                            }
                        }
                        userNamecurretn = itemsSharedHistory[index].SharedUsers.results[j].Title
                        userEmail = itemsSharedHistory[index].SharedUserEmail;
                        userEmail = userEmail ? userEmail : "";
                        //4 May 23
                        //To handle if sharing is done directly with guest user.
                        
                        if(userEmail!=''&&userEmail.search(/#ext/)>=0)
                        {
                            userEmail = userEmail.split('#ext')[0];
                            userEmail = userEmail.replace("_", '@');
                        }
                        userId = itemsSharedHistory[index].SharedUsers.results[j].Id;
                    }

                    if (itemsSharedHistory[index].SharedGroup != "Organization") {
                        if (PermissionStatus == "Revoked" || PermissionStatus == "RevokePending") {
                            sharedHistory += "<tr><td></td>";
                            if (Action != "SharedWithMe") {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(userEmail);
                                if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                                    sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + userNamecurretn.charAt(0) + "</div><div class='designationtype'>";
                                }
                                else {
                                    sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                }
                                sharedHistory += "<h3 class='namesection'>" + userNamecurretn + "</h3>";
                                tempEmail = userEmail.split('#ext')[0];
                                tempEmail = tempEmail.replace("_", '@');
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + tempEmail + "\");'>" + tempEmail + "</a></div></div></td>";
                            }
                            else {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                                sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                            }

                            sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                            sharedHistory += "<td>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created) + "</td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                            }
                            else {
                                sharedHistory += "<td>" + userNamecurretn + "</td>";
                            }
                            sharedHistory += "<td>" + SharingValidity + "</td>";
                            if (NeedAck == "Required") {
                                if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                    var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                                else {
                                    var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                            }
                            else {
                                sharedHistory += "<td>Not Required</td>";
                            }
                            var RevokeRemarks = '';
                            if (itemsSharedHistory[index].share_remarks != null) {
                                RevokeRemarks = (itemsSharedHistory[index].share_remarks.substring(0, 20));
                            }
                            sharedHistory += "<td><div class='RevokedDetails'><span style='cursor: not-allowed;color: Red;'>Revoked</span><span>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Modified) + "</span><span style='color: Red;'>" + RevokeRemarks + "</span></td>";
                            sharedHistory += "</tr>";
                        }
                        else {
                            SharedTo = 'User';
                            var UserOrGroup = 'User';
                            sharedHistory += "<tr>";
                            if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                                UserOrGroup = 'Everyone';
                                IsBtnHide = getApprovalStatus(itemsSharedHistory[index].LibraryName, itemsSharedHistory[index].SiteURL, itemsSharedHistory[index].DocumentID);
                            }
                            else {
                                IsBtnHide = false;
                            }
                            sharedHistory += "<td><input type='checkbox' class='historydocid' value=" + documentid + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + ',' + SharedTo + ',' + UserOrGroup + ',' + SiteURL + ',' + userEmail + " title='" + userId + "''></td>";
                            if (Action != "SharedWithMe") {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(userEmail);
                                if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                                    sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + userNamecurretn.charAt(0) + "</div><div class='designationtype'>";
                                }
                                else {
                                    sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                }
                                sharedHistory += "<h3 class='namesection'>" + userNamecurretn + "</h3>";
                                tempEmail = userEmail.split('#ext')[0];
                                tempEmail = tempEmail.replace("_", '@');
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + tempEmail + "\");'>" + tempEmail + "</a></div></div></td>";
                            }
                            else {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                                sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                            }
                            sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                            sharedHistory += "<td>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created) + "</td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                            }
                            else {
                                sharedHistory += "<td>" + userNamecurretn + "</td>";
                            }
                            sharedHistory += "<td>" + SharingValidity + "</td>";
                            if (IsBtnHide == false) {
                                if (NeedAck == "Required") {
                                    if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                        var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                        sharedHistory += "<td>" + AckValue + "</td>";
                                    }
                                    else {
                                        var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, userEmail, userNamecurretn, PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                        sharedHistory += "<td>" + AckValue + "</td>";
                                    }
                                }
                                else {
                                    sharedHistory += "<td>Not Required</td>";
                                }
                                if (Action != "SharedWithMe") {
                                    sharedHistory += '<td><a style="cursor: pointer;" class="fileFolderRevoke" onclick="RevokePermission(' + documentid + ',\'' + encodeURI(itemurl) + '\',' + userId + ',' + currentItemId + ', \'' + IsModal + '\', \'' + itemsSharedHistory[index].DocumentType + '\', \'' + UserOrGroup + '\', \'' + SiteURL + '\', \'' + userEmail + '\')">Revoke</a></td>';
                                }
                                else {
                                    sharedHistory += '<td></td>';
                                }
                            }
                            else {
                                sharedHistory += "<td></td>";
                                sharedHistory += '<td>Approval Pending</td>';
                            }

                            sharedHistory += "</tr>";
                        }
                    }
                    else { //to bind all the external users sharing in one table row [Organizations wise]
                        if (PermissionStatus == "Revoked" || PermissionStatus == "RevokePending") {
                            //var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].SharedClient.Title);
                            sharedHistory += "<tr><td></td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td><div class='flexingtwo'><div class='empoyeeimg clientnameshow'><span class='clienttext'><div id='profileImage'>" + itemsSharedHistory[index].SharedClient.Title.charAt(0) + "</div></span>";
                                sharedHistory += "</div><div class='designationtype'><h3 class='namesection'>" + itemsSharedHistory[index].SharedClient.Title + "</h3><p>Guest Client</p></td>";
                            }
                            else {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                                sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                            }
                            sharedHistory += "</div></div><td>" + DisplayPermissionType + "</td>";
                            sharedHistory += "<td>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created) + "</td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                            }
                            else {
                                sharedHistory += "<td>" + itemsSharedHistory[index].SharedClient.Title + "</td>";
                            }
                            sharedHistory += "<td>" + SharingValidity + "</td>";
                            if (NeedAck == "Required") {
                                if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                    var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                                else {
                                    var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                            }
                            else {
                                sharedHistory += "<td>Not Required</td>";
                            }
                            var RevokeRemarks = '';
                            if (itemsSharedHistory[index].share_remarks != null) {
                                RevokeRemarks = (itemsSharedHistory[index].share_remarks.substring(0, 20));
                            }
                            sharedHistory += "<td><div class='RevokedDetails'><span style='cursor: not-allowed;color: Red;'>Revoked</span><span>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Modified) + "</span><span style='color: Red;'>" + RevokeRemarks + "</span></td>";
                        }
                        else {
                            SharedTo = 'Organization';
                            var UserOrGroup = 'User';
                            if (itemsSharedHistory[index].SharedGroup == 'Everyone') {
                                UserOrGroup = 'Everyone';
                            }
                            //var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].SharedClient.Title);
                            sharedHistory += "<tr>";
                            sharedHistory += "<td><input type='checkbox' class='historydocid' value=" + documentid + ',' + encodeURI(itemurl) + ',' + userId + ',' + currentItemId + ',' + Doc_Type + ',' + type + ',' + SharedTo + ',' + UserOrGroup + ',' + SiteURL + " title='" + userId + "''></td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td><div class='flexingtwo'><div id='profileImage'>" + itemsSharedHistory[index].SharedClient.Title.charAt(0) + "</div><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].SharedClient.Title + "</h3>";
                                sharedHistory += "</div></div></td>";
                            }
                            else {
                                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(itemsSharedHistory[index].Author.EMail);
                                sharedHistory += "<td><div class='flexingtwo'><img src='" + attachment + "' data-themekey='#'><div class='designationtype'>";
                                sharedHistory += "<h3 class='namesection'>" + itemsSharedHistory[index].Author.Title + "</h3>";
                                sharedHistory += "<a href='javascript:void(0);' class='emailsec' onclick='OpenEmail(\"" + itemsSharedHistory[index].Author.EMail + "\");'>" + itemsSharedHistory[index].Author.EMail + "</a></div></div></td>";
                            }
                            sharedHistory += "<td>" + DisplayPermissionType + "</td>";
                            sharedHistory += "<td>" + titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created) + "</td>";
                            if (Action != "SharedWithMe") {
                                sharedHistory += "<td>" + itemsSharedHistory[index].Author.Title + "</td>";
                            }
                            else {
                                sharedHistory += "<td>" + itemsSharedHistory[index].SharedClient.Title + "</td>";
                            }
                            sharedHistory += "<td>" + SharingValidity + "</td>";
                            if (NeedAck == "Required") {
                                if (Action != "SharedWithMe") { //This is 'Shared By Me'
                                    var AckValue = getAcknowledgeValue("", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                                else {
                                    var AckValue = getAcknowledgeValue("SharedWithMe", itemsSharedHistory[index].SharedGroup, itemsSharedHistory[index].SharedUsers.results[0].Title, itemsSharedHistory[index].SharedUsers.results[0].Id, itemsSharedHistory[index].Id, SharingValidity, titanForWork.convertJSONDateAMPMWithDate(itemsSharedHistory[index].Created), PermissionType, '', '', PermissionStatus, SharedBYAck, itemsSharedHistory[index].DocType);
                                    sharedHistory += "<td>" + AckValue + "</td>";
                                }
                            }
                            else {
                                sharedHistory += "<td>Not Required</td>";
                            }
                            if (Action != "SharedWithMe") {
                                sharedHistory += '<td><a style="cursor: pointer;" class="fileFolderRevoke" onclick=" RevokeGpPermission(' + userId + ', ' + currentItemId + ', \'' + IsModal + '\', \'' + itemsSharedHistory[index].DocumentType + '\', \'' + UserOrGroup + '\', \'' + encodeURI(itemurl) + '\', \'' + SiteURL + '\');">Revoke</a></td>';
                            }
                            else {
                                sharedHistory += '<td></td>';
                            }
                            sharedHistory += "</tr>";
                        }
                    }
                }

                if (ShareHostoryTable != '') {
                    ShareHostoryTable.destroy();
                }
                $("#sharedHistoryList").empty().append(sharedHistory);
                $("#TotalItemscount").text(itemsSharedHistory.length);
                if (itemsSharedHistory.length > 0) {
                    if (Action != "Filter") {
                        $("#shreduser").empty().append(option);
                    }
                    selectedHistoryDocEvent();
                    TablePaginationShareHistory()
                    //Check permissions
                    if (currentSectionType != 'My Documents' && currentSectionType != 'SharedWithMe' && currentSectionType != 'SharedByMe') {
                        getListUserEffectivePermissions(SiteURL, listTitle, true, parseInt(documentid), 'i:0#.f|membership|' + _spPageContextInfo.userLoginName + '');
                        if (IsNotpermission == true) {
                            if (IsContributor == false && IsFullControl == false) { //Reader
                                $(".fileFolderRevoke").hide();
                            }
                        }
                        else {
                            if (arrPermission.length > 0) {
                                $(".fileFolderRevoke").hide();
                            }
                        }
                    }
                }
            }
            else {
                $("#sharedHistoryTable_paginate").hide();
                $("#sharedHistoryTable_info").hide();
                sharedHistory = '';
                sharedHistory = '<tr><td colspan="9"><div style="text-align: center; font-size: 14px; padding: 10px 0px;" data-localize="NoRecordFound">No Record Found</div></td></tr>';
                $("#shreduser").empty().append('<option value="All">All</option>');
                $("#sharedHistoryList").empty().append(sharedHistory);
                $(".NoRecordFound").hide();
                $("#TotalItemscount").text('0');
            }
            waitingDialog.hide();
        });
    }, 100);
}

//to check if Approval process is in 'Pending' or 'Approved' state
function getApprovalStatus(QueryLibraryName, SiteUrl, DocId) {
    var IsBtnHide = false;
    var RestQuery = "?$select=Id,ApprovalStatus&$filter=Id eq '" + DocId + "' and ApprovalStatus eq 'Approved'";
    //$.when(getDocItemsWithQueryItemById(QueryLibraryName, RestQuery, SiteUrl, DocId)).done(function (docsresults) {
    $.when(getItemsWithQuery(QueryLibraryName, RestQuery, SiteUrl)).done(function (docsresults) {
        if (docsresults.length == 0) {
            IsBtnHide = true;
        }
    });
    return IsBtnHide;
}
//get Ack Value for Sharing History
function getAcknowledgeValue(Section, SharedGroup, SharedUserName, SharedUserId, SharedItemId, SharingValidity, SharedOn, PermissionType, SharedUserEmail, SharedUserName, PermissionStatus, ShareBy, DocType) {
    var AckValue = '';
    var AckCounter = 0;
    $("#btnAckNotifyAll").show();
    if (Section == "SharedWithMe") {
        var restQuery = "?$top=5000&$select=*,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + _spPageContextInfo.userEmail + "' and Acknowledge eq '1'";
        $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
            if (DocumentAcknowledgement.length > 0) {
                AckValue = '<a href="javascript:void(0);" class="AckDoc" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" style="color:green;">Acknowledged</a>';
            }
            else {
                if (PermissionStatus == "Revoked" || PermissionStatus == "RevokePending") {
                    $("#btnAckNotifyAll").hide();
                    AckValue = '<div class="AckDoc" style="color:black;">Pending</div>';
                }
                else {
                    AckValue = '<a href="javascript:void(0);" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" class="AckDoc" style="color:blue;">Pending</a>';
                }
            }
        });
    }
    else {
        if (SharedGroup == "My-Groups" || SharedGroup == "Selective") {
            var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/Id eq '" + SharedUserId + "' and Acknowledge eq '1'";
            $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                if (DocumentAcknowledgement.length > 0) {
                    AckValue = '<a href="javascript:void(0);" class="AckDoc" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" style="color:green;">Acknowledged</a>';
                }
                else {
                    if (PermissionStatus == "Revoked" || PermissionStatus == "RevokePending") {
                        $("#btnAckNotifyAll").hide();
                        AckValue = '<div class="AckDoc" style="color:black;">Pending</div>';
                    }
                    else {
                        AckValue = '<a href="javascript:void(0);" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" class="AckDoc" style="color:blue;">Pending</a>';
                    }
                }
            });
        }
        else { //"Everyone", "Organization"
            var GpUserDetails = [];
            if (SharedGroup == "Organization") {
                GpUserDetails = GetUserFromSPGp(SharedUserId);
            }
            else { //Everyone
                GpUserDetails = GetUserFromEmp(SharedUserId);
            }
            for (var gp = 0; gp < GpUserDetails.length; gp++) {
                var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + GpUserDetails[gp].Email + "' and Acknowledge eq '1'";
                $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                    if (DocumentAcknowledgement.length > 0) {
                        AckCounter++;
                    }
                });
            }
            if (PermissionStatus == "Revoked" || PermissionStatus == "RevokePending") {
                $("#btnAckNotifyAll").hide();
                AckValue = '<a href="javascript:void(0);" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" class="AckDoc" style="color:blue;">' + AckCounter + '</a>';
            }
            else {
                AckValue = '<a href="javascript:void(0);" onclick="OpenAckNotify(\'' + Section + '\', \'' + SharedGroup + '\', \'' + SharedUserId + '\', \'' + SharedItemId + '\', \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserEmail + '\', \'' + SharedUserName + '\', \'' + PermissionStatus + '\', \'' + ShareBy + '\', \'' + DocType + '\');" class="AckDoc" style="color:blue;">' + AckCounter + '</a>';
            }
        }
    }
    return AckValue;
}


//get Acknowledgment when binding Shared With Me Docs
function AckUserStatus(SharedItemId, SharedUserName, ServerURL, LibraryURL, Permission, LibraryName, SharedFrom) {
    if (LibraryName == "DocumentManagementSystem") {
        LibraryName = 'My Documents';
    }
    else {
        LibraryName = SharedFrom;
    }
    var AckStatus = '';
    var restQuery = "?$top=5000&$select=*,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + SharedUserName + "' and Acknowledge eq '1'";
    $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
        if (DocumentAcknowledgement.length > 0) {
            AckStatus = '<div class="AckStatus" style="color:green;">Acknowledged</div>';
        }
        else {
            var NullValue = 'NullValue';
            AckStatus = '<a href="javascript:void(0);" rel="' + SharedItemId + '" name="' + ServerURL + '" onclick="DisplayFileProperty(\'' + LibraryURL + '\', \'' + LibraryName + '\', \'' + Permission + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + fixedEncodeURIComponent(ServerURL) + '\', \'' + SharedItemId + '\', \'' + NullValue + '\');" class="AckStatus">Acknowledge</a>';
        }
    });
    return AckStatus;
}

//open Popup to show which users have Acknowledged or not
function OpenAckNotify(Section, SharedGroup, SharedUserId, SharedItemId, SharingValidity, SharedOn, PermissionType, SharedUserEmail, SharedUserName, PermissionStatus, ShareBy, DocType) {
    waitingDialog.show();
    setTimeout(function () {
        $("#AckUserList").empty();
        arrAckAllUser = [];
        var attachment = '';
        var AckHistory = '';
        $("#btnAckNotifyAll").show();
        if (Section == "SharedWithMe") {
            $("#btnAckNotifyAll").hide();
            var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + _spPageContextInfo.userEmail + "' and Acknowledge eq '1'";
            $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                if (DocumentAcknowledgement.length > 0) {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail);
                    AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                    AckHistory += '</span><div class="detalbox">' + _spPageContextInfo.userDisplayName + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + _spPageContextInfo.userEmail + '\');">' + _spPageContextInfo.userEmail + '</a></div></div>';
                    AckHistory += '<div class="Acknowledgementsec"><p style="color:green">Acknowledged</p><p style="color:green">' + titanForWork.convertJSONDateAMPMWithDate(DocumentAcknowledgement[0].Modified) + '</p><p style="color:black;font-size:12px;">' + (DocumentAcknowledgement[0].ActionByTimeZone ? DocumentAcknowledgement[0].ActionByTimeZone : "") + '</p><p style="color:blue">IP: ' + DocumentAcknowledgement[0].IPAddress + '</p></div></li>';
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(_spPageContextInfo.userEmail);
                    AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                    AckHistory += '</span><div class="detalbox">' + _spPageContextInfo.userDisplayName + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + _spPageContextInfo.userEmail + '\');">' + _spPageContextInfo.userEmail + '</a></div></div>';
                    AckHistory += '<div class="Acknowledgementsec"><p style="color:red">Not Acknowledged</p><div class="btnParent" style="display:none;" id="SendAckParent0"><button class="btn custom-btn w-70" id="0" type="button" onclick="SendAckMail(this, \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + _spPageContextInfo.userDisplayName + '\', \'' + _spPageContextInfo.userEmail + '\', \'' + ShareBy + '\', \'' + DocType + '\');">Notify</button></div></div></li>';
                }
            });
            $("#AckUserList").append(AckHistory);
            arrAckAllUser.push({
                AckName: _spPageContextInfo.userDisplayName,
                AckEmail: _spPageContextInfo.userEmail,
                AckPermission: PermissionType,
                AckSharedOn: SharedOn,
                AckSharedValid: SharingValidity,
                AckShareBy: ShareBy,
                AckDocType: DocType
            });
        }
        else {
            if (SharedGroup == "My-Groups" || SharedGroup == "Selective") {
                $("#btnAckNotifyAll").hide();
                var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + SharedUserEmail + "' and Acknowledge eq '1'";
                $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                    if (DocumentAcknowledgement.length > 0) {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(SharedUserEmail);
                        AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                        AckHistory += '</span><div class="detalbox">' + SharedUserName + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + SharedUserEmail + '\');">' + SharedUserEmail + '</a></div></div>';
                        AckHistory += '<div class="Acknowledgementsec"><p style="color:green">Acknowledged</p><p style="color:green">' + titanForWork.convertJSONDateAMPMWithDate(DocumentAcknowledgement[0].Modified) + '</p><p style="color:black;font-size:12px;">' + (DocumentAcknowledgement[0].ActionByTimeZone ? DocumentAcknowledgement[0].ActionByTimeZone : "") + '</p><p style="color:blue">IP: ' + DocumentAcknowledgement[0].IPAddress + '</p></div></li>';
                    }
                    else {
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(SharedUserEmail);
                        AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                        AckHistory += '</span><div class="detalbox">' + SharedUserName + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + SharedUserEmail + '\');">' + SharedUserEmail + '</a></div></div>';
                        AckHistory += '<div class="Acknowledgementsec"><p style="color:red">Not Acknowledged</p><div class="btnParent" id="SendAckParent0"><button class="btn custom-btn w-70" id="0" type="button" onclick="SendAckMail(this, \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + SharedUserName + '\', \'' + SharedUserEmail + '\', \'' + ShareBy + '\', \'' + DocType + '\');">Notify</button></div></div></li>';
                    }
                });
                $("#AckUserList").append(AckHistory);
                arrAckAllUser.push({
                    AckName: SharedUserName,
                    AckEmail: SharedUserEmail,
                    AckPermission: PermissionType,
                    AckSharedOn: SharedOn,
                    AckSharedValid: SharingValidity,
                    AckShareBy: ShareBy,
                    AckDocType: DocType
                });

            }
            else { //"Everyone", "Organization"
                var GpUserDetails = [];
                if (SharedGroup == "Organization") {
                    GpUserDetails = GetUserFromSPGp(SharedUserId);
                }
                else { //Everyone
                    GpUserDetails = GetUserFromEmp(SharedUserId);
                }
                for (var gp = 0; gp < GpUserDetails.length; gp++) {
                    AckHistory = '';
                    var restQuery = "?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID eq '" + SharedItemId + "' and ViewsBy/EMail eq '" + GpUserDetails[gp].Email + "' and Acknowledge eq '1'";
                    $.when(getItemsWithQuery("DocumentAcknowledgement", restQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (DocumentAcknowledgement) {
                        if (DocumentAcknowledgement.length > 0) {
                            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(GpUserDetails[gp].Email);
                            AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                            AckHistory += '</span><div class="detalbox">' + GpUserDetails[gp].Title + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + GpUserDetails[gp].Email + '\');">' + GpUserDetails[gp].Email + '</a></div></div>';
                            AckHistory += '<div class="Acknowledgementsec"><p style="color:green">Acknowledged</p><p style="color:green">' + titanForWork.convertJSONDateAMPMWithDate(DocumentAcknowledgement[0].Modified) + '</p><p style="color:black;font-size:12px;">' + (DocumentAcknowledgement[0].ActionByTimeZone ? DocumentAcknowledgement[0].ActionByTimeZone : "") + '</p><p style="color:blue">IP: ' + DocumentAcknowledgement[0].IPAddress + '</p></div></li>';
                            $("#AckUserList").append(AckHistory);
                        }
                        else {
                            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(GpUserDetails[gp].Email);
                            AckHistory += '<li><div class="detailsectionbox"><span class="imgboxsectin"><img src="' + attachment + '">';
                            AckHistory += '</span><div class="detalbox">' + GpUserDetails[gp].Title + '<a href="javascript:void(0);" class="emilbox" style="cursor:pointer;color:blue;" onclick="OpenEmail(\'' + GpUserDetails[gp].Email + '\');">' + GpUserDetails[gp].Email + '</a></div></div>';

                            if (PermissionStatus == "Revoked" || PermissionStatus == "RevokePending") {
                                $("#btnAckNotifyAll").hide();
                                AckHistory += '<div class="Acknowledgementsec"><p style="color:red">Not Acknowledged</p><div class="btnParent" id="SendAckParent' + gp + '"><button class="btn custom-btn w-70" id="' + gp + '" type="button" onclick="SendAckMail(this, \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + GpUserDetails[gp].Title + '\', \'' + GpUserDetails[gp].Email + '\', \'' + ShareBy + '\', \'' + DocType + '\');" disabled="disabled">Notify</button></div></div></li>';
                            }
                            else {
                                AckHistory += '<div class="Acknowledgementsec"><p style="color:red">Not Acknowledged</p><div class="btnParent" id="SendAckParent' + gp + '"><button class="btn custom-btn w-70" id="' + gp + '" type="button" onclick="SendAckMail(this, \'' + SharingValidity + '\', \'' + SharedOn + '\', \'' + PermissionType + '\', \'' + GpUserDetails[gp].Title + '\', \'' + GpUserDetails[gp].Email + '\', \'' + ShareBy + '\', \'' + DocType + '\');">Notify</button></div></div></li>';
                            }
                            $("#AckUserList").append(AckHistory);
                            arrAckAllUser.push({
                                AckName: GpUserDetails[gp].Title,
                                AckEmail: GpUserDetails[gp].Email,
                                AckPermission: PermissionType,
                                AckSharedOn: SharedOn,
                                AckSharedValid: SharingValidity,
                                AckShareBy: ShareBy,
                                AckDocType: DocType

                            });
                        }
                    });
                }
            }
        }
        $("#Acknowledgement").modal('show');
        waitingDialog.hide();
    }, 100);
}


//send Notify mail to all
function NotifyAllAck() {
    var DashboardLink = _spPageContextInfo.webAbsoluteUrl + "/Pages/Document.aspx";
    var MailSub = _spPageContextInfo.userDisplayName + ' is requesting your acknowledgement on a document.';
    for (var ack = 0; ack < arrAckAllUser.length; ack++) {
        Metadata = '';
        var EmailDesign = '';
        var SharedValidHTML = '';
        if (arrAckAllUser[ack].AckSharedValid == null || arrAckAllUser[ack].AckSharedValid == "null" || arrAckAllUser[ack].AckSharedValid == '') {
            SharedValidHTML = '';
        }
        else {
            SharedValidHTML = "<div><strong>Valid till:</strong> " + arrAckAllUser[ack].AckSharedValid + "</div><br/>";
        }
        EmailDesign = "Dear " + arrAckAllUser[ack].AckName + ",<br/><br/>" + _spPageContextInfo.userDisplayName + " has shared the following document with you. Your acknowledgment is required on this document.<br/><br/>";
        EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#filenamee").text() + "</div>" +
        	                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + $("#filetitle").text() + "</div>" +
        	                        "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + arrAckAllUser[ack].AckDocType + "</div>" +
	                            "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + $("#referNo").text() + "</div>" +
	                             "<div><strong>Permission:</strong> " + arrAckAllUser[ack].AckPermission + "</div>" +
	                             "<div><strong>Shared By:</strong> " + arrAckAllUser[ack].AckShareBy + "</div>" +
	                             "<div><strong>Shared On:</strong> " + arrAckAllUser[ack].AckSharedOn + "</div>" +
	                             SharedValidHTML +
	                             "<br/><br/><br/>" +
	                            "<div><a href=" + DashboardLink + ">Click here</a> to open and acknowledge the document.</div>" + "<br/><br/>";
        EmailDesign += "This is an auto generated email. Please don't reply.";
        for (var k = 0; k < LabelDefaultLangauge.length; k++) {
            if (EmailDesign.includes(LabelDefaultLangauge[k].Key) == true) {
                EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
            }
        }
        Metadata = {
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': _spPageContextInfo.userEmail,
                'To': { 'results': [arrAckAllUser[ack].AckEmail] },
                'Body': EmailDesign,
                'Subject': MailSub
            }
        };

        var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
        $.ajax({
            contentType: 'application/json',
            url: sitetemplateurl,
            type: "POST",
            async: false,
            data: JSON.stringify(Metadata),
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                if (arrAckAllUser.length == ack + 1) {
                    waitingDialog.hide();
                    alert("Notification has been sent to all.");
                }
            },
            error: function (err) {
                alert("SendEmailAckNotification  " + JSON.stringify(err));
                return false;
            }
        });
    }
}

//to send Acknowledgement mail to users
function SendAckMail(Action, SharingValidity, SharedOn, PermissionType, ToUserName, ToUserEmail, ShareBy, DocType) {
    var EmailDesign = '';
    var MailSub = _spPageContextInfo.userDisplayName + ' is requesting your acknowledgement on a document.';
    var DashboardLink = _spPageContextInfo.webAbsoluteUrl + "/Pages/Document.aspx";
    var SharedValidHTML = '';
    if (SharingValidity == null || SharingValidity == "null" || SharingValidity == '') {
        SharedValidHTML = '';
    }
    else {
        SharedValidHTML = "<div><strong>Valid till:</strong> " + SharingValidity + "</div><br/>";
    }
    EmailDesign = "Dear " + ToUserName + ",<br/><br/>" + _spPageContextInfo.userDisplayName + " has shared the following document with you. Your acknowledgment is required on this document.<br/><br/>";
    EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#filenamee").text() + "</div>" +
                                "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + $("#filetitle").text() + "</div>" +
                                "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + DocType + "</div>" +
                            "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + $("#referNo").text() + "</div>" +
                             "<div><strong>Permission:</strong> " + PermissionType + "</div>" +
                             "<div><strong>Shared By:</strong> " + ShareBy + "</div>" +
                             "<div><strong>Shared On:</strong> " + SharedOn + "</div>" +
                             SharedValidHTML +
                             "<br/><br/><br/>" +
                            "<div><a href=" + DashboardLink + ">Click here</a> to open and acknowledge the document.</div>" + "<br/><br/>";
    EmailDesign += "This is an auto generated email. Please don't reply.";
    for (var k = 0; k < LabelDefaultLangauge.length; k++) {
        if (EmailDesign.includes(LabelDefaultLangauge[k].Key) == true) {
            EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
        }
    }
    Metadata = {
        'properties': {
            '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
            'From': _spPageContextInfo.userEmail,
            'To': { 'results': [ToUserEmail] },
            'Body': EmailDesign,
            'Subject': MailSub
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
            $("#SendAckParent" + Action.id).empty().append('<p class="SendMSg">Notification Sent.</p>');
        },
        error: function (err) {
            alert("SendEmailAckNotification  " + JSON.stringify(err));
        }
    });
}

//get all UserName from Employee List
function GetUserFromEmp() {
    var UserDetails = [];
    var RestQuery = "?$select=Title,Status,Company/Id,LogonName/EMail,Email,FullName,PrimaryCompany&$orderby=FullName asc&$expand=LogonName,Company&$filter=Company/Id eq '" + Logged_CompanyId + "' and PrimaryCompany eq 'Primary' and Status eq 'Active'&$top=5000";
    $.when(getItemsWithQuery("Employees", RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (Employees) {
        if (Employees.length > 0) {
            UserDetails = Employees;
        }
    });
    return UserDetails;
}

//get all UserName from SharePOint Group
function GetUserFromSPGp(SharedUserId) {
    var EmpUserDetails = [];
    var dfd = $.Deferred();
    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/SiteGroups/GetById('" + SharedUserId + "')/users?$select=Email,Id,Title,LoginName";
    $.ajax({
        url: siteurl,
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
            EmpUserDetails = data.d.results;
        },
        error: function (error) {
            dfd.reject(error);
        }
    });
    return EmpUserDetails;
}


//method for pagination of Approvals
function TablePaginationShareHistory() {
    ShareHostoryTable = $('#sharedHistoryTable').DataTable({
        'columnDefs': [{ 'orderable': false, 'targets': 0 }], // hide sort icon on header of first column
        "bPaginate": true,
        "bJQueryUI": true, // ThemeRoller-stöd
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": false,
        "bProcessing": true,
        "iDisplayLength": 5,
        "dom": 'Rlfrtip',
        "colReorder": {
            'allowReorder': true
        },
        "language": {
            "searchPlaceholder": "Type to find....",
            "sSearch": ""
        }
    });
    $("#sharedHistoryTable_filter").hide();
    $('#customHistrySearch').keyup(function () {
        ShareHostoryTable.search($(this).val()).draw();
    });

}


//Revoke Permission of clients
function RevokeGpPermission(GroupId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, serverURL, SiteURL) {
    $("#RevokePermission").modal('show');
    $("#txtRevokeMsg").val('');
    $(".ParentbtnOpenRevoke").empty().append('<button type="button" class="btn custom-btn mr-8 wpx-87" id="btnOpenRevoke">Submit</button>');
    $("#btnOpenRevoke").click(function () {
        if (confirm("Are you sure, you want to revoke permission?")) {
            revokeGpFile(GroupId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, serverURL, SiteURL);
        }
    });
}
function RevokeGpPermissionMsg(GroupId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, serverURL, SiteURL) {
   
    revokeGpFile(GroupId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, serverURL, SiteURL);
  
}

//to revoke permission for Group
function revokeGpFile(GroupId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, serverURL, SiteURL) {
    if (serverURL.includes('Documents') == true && serverURL.includes('Shared%20Documents') == false) {
        serverURL.replace('Documents', 'Shared%20Documents');
    }
    if (SiteURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }

    if (FileFolder.toLowerCase() == 'file') {
        var endPointUrl = SiteURL + "/_api/web/GetFileByServerRelativeUrl('" + serverURL + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + GroupId + ")";
    }
    else {
        var endPointUrl = SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + serverURL + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + GroupId + ")";
    }
    $.ajax({
        url: endPointUrl,
        type: "POST",
        async: false,
        headers: {
            "X-RequestDigest": RequestDigest,
            "Accept": "application/json;odata=verbose",
            "content-Type": "application/json;odata=verbose",
            'X-HTTP-Method': 'DELETE'
        },
        async: false,
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (UserOrGroup == "Everyone") {
                
                if (fixedDecodeURIComponent(Documentname).includes('/') == true) {
                    var LibraryName = fixedDecodeURIComponent(Documentname).split('/')[0];
                }
                else {
                    var LibraryName = fixedDecodeURIComponent(Documentname);
                }
                var Metadata;
                if (ListName.includes('/Documents') == true) {
                    var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
                }
                else {
                    var ItemType = GetItemTypeForLibraryName(ListName);
                }
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    AccessLevel: "Revoked"
                }
                updateItemWithIDItemListDocuments(LibraryName, Metadata, currentItemId, SiteURL);
            }

            var ItemType = GetItemTypeForListName('SharedDocument');
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                PermissionStatus: "Revoked",
                share_remarks: $("#txtRevokeMsg").val(),
                SharedEnd: new Date().toISOString(),
                IsSendMail:true////20 feb 23
            }
            $.when(updateItemWithIDItemListDocuments('SharedDocument', Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl, false)).done(function (Result) {
                //SendRevokeEmail(UserOrGroup, currentItemId);//20 feb 23 as mail will trigger from flow
                $("#RevokePermission").modal('hide');
                if (IsModalOpen != 'false') {
                    alert("Permission has been revoked.");
                    $('#myModalShareHistory').modal('hide');
                }
                return false;
            });
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.includes("Attempted to perform an unauthorized operation") == true) {
                //alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
                NoRevokePermissionFile(IsModalOpen, currentItemId);
            }
            else {
                alert(error.responseJSON.error.message.value);
            }
            return false;
        }
    });
}

function selectedHistoryDocEvent() {
    $('.historydocid').change(function () {
        selectedHistoryDoc = [];
        selectedHistoryDocrelativeurl = [];
        $('.historydocid').each(function () {
            if ($(this).prop("checked") == true) {
                selectedHistoryDoc.push($(this).val());
            }
        });
        if (selectedHistoryDoc.length == 0) {
            $("#revokebtn").hide();
        }
        else {
            $("#revokebtn").show();
        }
        if ($('.historydocid:checked').length == $('.historydocid').length) {
            $('.select_all').prop('checked', true);
        } else {
            $('.select_all').prop('checked', false);
        }
    });
}

//open confirmation popup for revoking - users
function RevokePermission(undefineditemID, itemurl, userId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, SiteURL, UserEmail) {
    if (UserOrGroup == "Everyone") {
        if (CheckForEveryone() == false) {
            alert("You are not authorized to revoke file/folder permission.");
            return false;
        }
    }
    $("#txtRevokeMsg").val('');
    $("#RevokePermission").modal('show');
    $(".ParentbtnOpenRevoke").empty().append('<button type="button" class="btn custom-btn mr-8 wpx-87" id="btnOpenRevoke">Submit</button>');
    $("#btnOpenRevoke").click(function () {
        if (confirm("Are you sure, you want to revoke permission?")) {
            revokeFile(undefineditemID, itemurl, userId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, SiteURL, UserEmail);
        }
    });
}
function RevokePermissionMsg(undefineditemID, itemurl, userId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, SiteURL, UserEmail) {
    revokeFile(undefineditemID, itemurl, userId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, SiteURL, UserEmail);
}

//to revoke permission for USers
function revokeFile(undefineditemID, itemurl, userId, currentItemId, IsModalOpen, FileFolder, UserOrGroup, SiteURL, UserEmail) {
    CopySourceURL = SiteURL;
    if (itemurl.includes('/Documents/') == true) {
        itemurl = itemurl.replace('/Documents/', '/Shared%20Documents/');
    }
    if (SiteURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    if (FileFolder.toLowerCase() == 'file') {
        var endPointUrl = SiteURL + "/_api/web/GetFileByServerRelativeUrl('" + itemurl + "')/ListItemAllFields/breakroleinheritance(true)";
    }
    else {
        var endPointUrl = SiteURL + "/_api/web/GetFolderByServerRelativeUrl('" + itemurl + "')/ListItemAllFields/breakroleinheritance(true)";
    }
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": RequestDigest
    }
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json', success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            DeleateUserPermission(userId, itemurl, undefineditemID, currentItemId, "Selective", 0, 0, IsModalOpen, FileFolder, UserOrGroup, UserEmail, SiteURL);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            DeleateUserPermission(userId, itemurl, undefineditemID, currentItemId, "Selective", 0, 0, IsModalOpen, FileFolder, UserOrGroup, UserEmail, SiteURL);
            console.log(JSON.stringify(error));
        }
    });
}

//Delete permissions of Files
function DeleateUserPermission(userPrincipleId, itemurl, undefineditemID, currentItemId, userType, currentItem, TotalLength, IsModalOpen, FileFolder, UserOrGroup, UserEmail, siteURL) {
    if (siteURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(siteURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    var headers = {
        'X-RequestDigest': RequestDigest,
        'X-HTTP-Method': 'DELETE'
    }
    if (UserEmail != null && UserEmail != "null" && UserEmail != "") {
        userPrincipleId = GetUserId(UserEmail, siteURL);
    }
    if (FileFolder.toLowerCase() == 'file') {
        var endPointUrl = siteURL + "/_api/web/GetFileByServerRelativeUrl('" + itemurl + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + userPrincipleId + ")";
    }
    else {
        var endPointUrl = siteURL + "/_api/web/GetFolderByServerRelativeUrl('" + itemurl + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + userPrincipleId + ")";
    }
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (UserOrGroup == "Everyone") {
                if (fixedDecodeURIComponent(Documentname).includes('/') == true) {
                    var LibraryName = fixedDecodeURIComponent(Documentname).split('/')[0];
                }
                else {
                    var LibraryName = fixedDecodeURIComponent(Documentname);
                }
                var Metadata;
                if (LibraryName.includes('/Documents') == true) {
                    var ItemType = GetItemTypeForLibraryName('Shared_x0020_Documents');
                }
                else {
                    var ItemType = GetItemTypeForLibraryName(LibraryName);
                }
                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    AccessLevel: "Revoked"
                }
                updateItemWithIDItemListDocuments(LibraryName, Metadata, undefineditemID, CopySourceURL);
            }
            var ListName = "SharedDocument";
            var Metadata;
            var ItemType = GetItemTypeForListName(ListName);
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                PermissionStatus: "Revoked",
                share_remarks: $("#txtRevokeMsg").val(),
                SharedEnd: new Date().toISOString(),
                IsSendMail:true//20 feb 23
            }
            $.when(updateItemWithIDItemListDocuments(ListName, Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
               // SendRevokeEmail(UserOrGroup, currentItemId);//20 feb 23 as mail will trigger from flow
                $("#RevokePermission").modal('hide');
                //if (IsModalOpen != 'false')
                 {
                    alert("permission deleted sucessfully.");
                }
                $('#myModalShareHistory').modal('hide');
            });
            console.log(userPrincipleId + ' Successfully removed Permission !');
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            if (error.responseText.includes("Attempted to perform an unauthorized operation") == true) {
                //alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
                NoRevokePermissionFile(IsModalOpen, currentItemId);
            }
            else {
                alert(error.responseText);
            }
        }
    });
}

//if user has no revoke permission then it will trigger flow
function NoRevokePermissionFile(IsModalOpen, currentItemId){
	var ListName = "SharedDocument";
    var Metadata;
    var ItemType = GetItemTypeForListName(ListName);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        share_remarks: $("#txtRevokeMsg").val(),
        SharedEnd: new Date().toISOString(),
        PermissionStatus: "RevokePending",
        IsSendMail: true   
    }
	$.when(updateItemWithIDItemListDocuments(ListName, Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
		$("#RevokePermission").modal('hide');
        if (IsModalOpen != 'false') {
            alert("permission deleted sucessfully.");
        }
        $('#myModalShareHistory').modal('hide');
	});
}

//Send Email to revoke permission
function SendRevokeEmail(RevokedTo, ItemId) {
    var Query = "?$select=*,ID,SharedGroup,SharedUsers/Title&$expand=SharedUsers&$filter=Id eq '" + ItemId + "' ";
    $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
        var ToUserName = '';
        var ToUserArray = [];
        var EmailDesign = '';
        if (items[0].SharedGroup == "Selective") {
            ToUserArray.push(items[0].SharedUserEmail);
            ToUserName = items[0].SharedUsers.results[0].Title;
            EmailDesign += "Dear " + ToUserName + ",<br/><br/>" + _spPageContextInfo.userDisplayName + " has revoked the sharing of below document with you.<br/><br/>";
        }
        else if (items[0].SharedGroup == "Organization") {
            ToUserArray.push(items[0].SharedUsers.results[0].Title);
            ToUserName = items[0].SharedUsers.results[0].Title;
            EmailDesign += "Dear All,<br/><br/>" + _spPageContextInfo.userDisplayName + " has revoked the sharing of below document with you.<br/><br/>";
        }
        if (RevokedTo == "Everyone") {
            EmailDesign += "Dear All,<br/><br/>" + _spPageContextInfo.userDisplayName + " has revoked the sharing of below document with you.<br/><br/>";
        }
        EmailDesign = EmailDesign + "<div><strong>File Name: </strong>" + $("#filenamee").text() + "</div>" +
	                                "<div data-localize='Title'><strong>Title:</strong> " + $("#filetitle").text() + "</div>" +
	                            "<div data-localize='Reference'><strong>Reference:</strong> " + $("#referNo").text() + "</div>" +
	                                "</br><div><strong>Message:</strong> " + $("#txtRevokeMsg").val() + "</div></br></br></br>";

        EmailDesign += "This is an auto generated email. Please don't reply.";
        for (var k = 0; k < LabelDefaultLangauge.length; k++) {
            if (EmailDesign.includes(LabelDefaultLangauge[k].Key) == true) {
                EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
            }
        }
        var Metadata;
        if (RevokedTo == "Everyone") {
            ToUserArray = getCompanyEmailId();
        }
        Metadata = {
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': _spPageContextInfo.userEmail,
                'To': { 'results': ToUserArray },
                //'CC': { 'results': ccUsers },
                'Body': EmailDesign,
                'Subject': 'A document has been shared with you.'
            }
        };

        var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
        $.ajax({
            contentType: 'application/json',
            url: sitetemplateurl,
            type: "POST",
            async: false,
            data: JSON.stringify(Metadata),
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                //Do Nothing
            },
            error: function (err) {
                waitingDialog.hide();
                alert("Send mail Revoke  " + JSON.stringify(err));
            }
        });
    });

}

//Multiple revoke for My documents
function RevokeOnCheckBox() {
    if (selectedHistoryDoc.length > 0) {
        $("#txtRevokeMsg").val('');
        $("#RevokePermission").modal('show');
        $(".ParentbtnOpenRevoke").empty().append('<button type="button" class="btn custom-btn mr-8 wpx-87" id="btnOpenRevoke">Submit</button>');
        $("#btnOpenRevoke").click(function () {
            if (confirm("Are you sure, you want to revoke permission?")) {
                var filesHistory = 1;
                for (var index = 0; index < selectedHistoryDoc.length; index++) {
                    var value = selectedHistoryDoc[index];
                    var arraycureent = [];
                    arraycureent = value.split(",");
                    if (arraycureent[6] == "User") {
                        if (arraycureent[7] == "Everyone") {
                            if (CheckForEveryone() == false) {
                                alert("You are not authorized to revoke " + arraycureent[1].split("/").pop() + " permission.");
                            }
                            else {
                                //revokeFile(arraycureent[0], arraycureent[1], arraycureent[2], arraycureent[3], 'false', 'file', arraycureent[7], arraycureent[8], arraycureent[9]);
                                revokeFile(arraycureent[0], arraycureent[1], arraycureent[2], arraycureent[3], 'false', arraycureent[5], arraycureent[7], arraycureent[8], arraycureent[9]);//12 May 23
                                
                            }
                        }
                        else {
                           // revokeFile(arraycureent[0], arraycureent[1], arraycureent[2], arraycureent[3], 'false', 'file', arraycureent[7], arraycureent[8], arraycureent[9]);
                            revokeFile(arraycureent[0], arraycureent[1], arraycureent[2], arraycureent[3], 'false',arraycureent[5], arraycureent[7], arraycureent[8], arraycureent[9]);//12 May 23
                        }
                    }
                    else {
                        //revokeGpFile(arraycureent[2], arraycureent[3], 'false', 'file', arraycureent[7], arraycureent[1], arraycureent[8]);
                        revokeGpFile(arraycureent[2], arraycureent[3], 'false',arraycureent[5], arraycureent[7], arraycureent[1], arraycureent[8]);//12 May 23
                    }
                }
                $("#myModalShareHistory").modal("hide");
                return false;
            }
        });
    }
    else {
        alert("Please select one or more history for revoke.");
        return false;
    }
}



// Get the ID of the role definition that defines the permissions
// you want to assign to the group.
function getTargetRoleDefinitionId(Type) {
    var respose = true;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/roledefinitions/getbyname(\''
            + $('#sharedWithPermission').val() + '\')/id',
        type: 'GET',
        async: false,
        headers: { 'accept': 'application/json;odata=verbose' },
        success: function (responseData) {
            targetRoleDefinitionId = responseData.d.Id;
            respose = breakRoleInheritanceOfList(targetRoleDefinitionId, Type);
        },
        error: errorHandler
    });
    return respose;
}

// Break role inheritance on the list.
function breakRoleInheritanceOfList(targetRoleDefinitionId, Type) {
    var respose = true;

    if ($("#FilePath").text().includes('/Documents/') == true && $("#FilePath").text().includes('Shared%20Documents') == false) {
       // $("#FilePath").text($("#FilePath").text().replace('Documents', 'Shared%20Documents'));//Bhawana 3 jan 23
         $("#FilePath").text($("#FilePath").text().replace('/Documents/', '/Shared%20Documents/'));
    }
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    if (Type == 'file') {
        var endPointUrl = CopySourceURL + "/_api/web/GetFileByServerRelativeUrl('" + $("#FilePath").text() + "')/ListItemAllFields/breakroleinheritance(true)";
    }
    else {
        var endPointUrl = CopySourceURL + "/_api/web/GetFolderByServerRelativeUrl('" + $("#FilePath").text() + "')/ListItemAllFields/breakroleinheritance(true)";
    }
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": RequestDigest
    }
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json',
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            respose = deleteCurrentRoleForGroup(targetRoleDefinitionId, Type);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            console.log(JSON.stringify(error));
        }
    });
    return respose;
}



// Remove the current role assignment for the group on the list.
function deleteCurrentRoleForGroup(targetRoleDefinitionId, Type) {
    var returnValue = true;
    for (var groupId = 0; groupId < SharingUserEmail.length; groupId++) {
        if (SharingUserEmail[groupId].GroupId != null && SharingUserEmail[groupId].GroupId != "" && SharingUserEmail[groupId].GroupId != "undefined" && SharingUserEmail[groupId].GroupId != "null") {
            if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
                $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
                    RequestDigest = GetFormDigestValue
                });
            }
            if (Type == 'file') {
                var endPointUrl = CopySourceURL + "/_api/web/GetFileByServerRelativeUrl('" + $("#FilePath").text() + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + SharingUserEmail[groupId].GroupId + ")";
            }
            else {
                var endPointUrl = CopySourceURL + "/_api/web/GetFolderByServerRelativeUrl('" + $("#FilePath").text() + "')/ListItemAllFields/roleassignments/getbyprincipalid(" + SharingUserEmail[groupId].GroupId + ")";
            }
            $.ajax({
                url: endPointUrl,
                type: "POST",
                async: false,
                headers: {
                    "X-RequestDigest": RequestDigest,
                    "Accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose",
                    'X-HTTP-Method': 'DELETE'
                },
                async: false,
                success: function (data) {
                    RequestDigest = $("#__REQUESTDIGEST").val();
                    returnValue = true;
                    setNewPermissionsForGroup(targetRoleDefinitionId, parseInt(SharingUserEmail[groupId].GroupId), Type);
                },
                error: function (error) {
                    RequestDigest = $("#__REQUESTDIGEST").val();
                    if (error.responseText.includes("Attempted to perform an unauthorized operation") == true) {
                        returnValue = true;
                        PermissionStatus = "Pending";
                        //alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
                        //return false;
                    }
                    else {
                        returnValue = true;
                        PermissionStatus = "";
                        console.log(error.responseText);
                        setNewPermissionsForGroup(targetRoleDefinitionId, parseInt(SharingUserEmail[groupId].GroupId), Type);
                    }
                }
            });
        }
    }
    return returnValue;
}

// Add the new role assignment for the group on the list.
function setNewPermissionsForGroup(targetRoleDefinitionId, grupId, Type) {
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    if (Type == 'file') {
        var URL = CopySourceURL + "/_api/web/GetFileByServerRelativeUrl('" + $("#FilePath").text() + "')/ListItemAllFields/roleassignments/addroleassignment(principalid=" + grupId + ",roledefid=" + targetRoleDefinitionId + ")"
    }
    else {
        var URL = CopySourceURL + "/_api/web/GetFolderByServerRelativeUrl('" + $("#FilePath").text() + "')/ListItemAllFields/roleassignments/addroleassignment(principalid=" + grupId + ",roledefid=" + targetRoleDefinitionId + ")"
    }
    $.ajax({
        url: URL,
        type: 'POST',
        async: false,
        headers: { 'X-RequestDigest': RequestDigest },
        success: successHandler,
        error: errorHandler
    });
}

function successHandler() {
    RequestDigest = $("#__REQUESTDIGEST").val();
    //UnbreakRoleInheritanceOfList('file');
    //alert('Request succeeded.');
}

function errorHandler(xhr, ajaxOptions, thrownError) {
    RequestDigest = $("#__REQUESTDIGEST").val();
    if (xhr.responseText.includes("Attempted to perform an unauthorized operation") == true) {
        PermissionStatus = "Pending";
        alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
        return true;
    }
    else {
        PermissionStatus = "";
        alert(xhr.responseText);
        return false;
    }
}

// Break role inheritance on the list.
function UnbreakRoleInheritanceOfList(Type) {
    var respose = true;

    if ($("#FilePath").text().includes('Documents') == true && $("#FilePath").text().includes('Shared%20Documents') == false) {
        $("#FilePath").text($("#FilePath").text().replace('Documents', 'Shared%20Documents'));
    }
    if (CopySourceURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(CopySourceURL)).done(function (GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    if (Type == 'file') {
        var endPointUrl = CopySourceURL + "/_api/web/GetFileByServerRelativeUrl('" + $("#FilePath").text() + "')/ListItemAllFields/ResetRoleInheritance";
    }
    else {
        var endPointUrl = CopySourceURL + "/_api/web/GetFolderByServerRelativeUrl('" + $("#FilePath").text() + "')/ListItemAllFields/ResetRoleInheritance";
    }
    var headers = {
        "Accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose",
        "X-RequestDigest": RequestDigest
    }
    $.ajax({
        url: endPointUrl,
        type: "POST",
        headers: headers,
        async: false,
        dataType: 'json',
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            console.log(JSON.stringify(error));
        }
    });
    return respose;
}


//----------------------------DMS Sharing file code ends----------------------------------------------

//Change Properties method starts ----------------------------------
//bind document type
function bindDocumentType() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$select=CategoryType,CatogeryName&$filter=CategoryType eq 'Document' and Status eq 'Yes'";
    $.ajax({
        url: Ownurl,
        method: "GET",
        async: false,
        headers: { "Accept": "application/json;odata=verbose" }
    }).then(function mySuccess(response) {
        for (var index = 0; index < response.d.results.length; index++) {
            $("<option value='" + response.d.results[index].CatogeryName + "'>" + response.d.results[index].CatogeryName + "</option>").appendTo("#txtUpdateType");
        }

    }, function myError(response) {
        JSON.stringify(response)
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
        FileValidity: new Date().toISOString()
    };
    if($("#txtUpdateValidity").val() == "" || $("#txtUpdateValidity").val() == "null") {
    	delete Metadata ["FileValidity"];
    }
    else {
    	Metadata ["FileValidity"] = new Date($("#txtUpdateValidity").val()).toISOString();
    }
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
            if (Documentname.includes('/Documents/') == true) {
                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
            }
            else if (Documentname == 'Documents') {
                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
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

//Change Properties method ends ----------------------------------

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
        ApprovalStep += '<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
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
        ApprovalStep += '<div class="dropdown"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
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
            ApprovalStep += '<div class="dropdown ForCustomizeOnly"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
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
            ApprovalStep += '<div class="dropdown ForCustomizeOnly"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
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
        if (OtherStepDetails[0].ApproverDecidingStep == "Initiation") {
            ApprovalStep += '<li class="StepClass removeDiv NewStep' + StepCount + '">';
            ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">NA</span><span id="EmpIdStep' + StepCount + '">NA</span><span id="NameStep' + StepCount + '">will be provided at Runtime</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span>';
            ApprovalStep += '<span id="DecideStep' + StepCount + '">' + OtherStepDetails[0].ApproverDecidingStep + '</span><span id="AppRoleStep' + StepCount + '">' + OtherStepDetails[0].ApproverRole + '</span><span id="AppTypeStep' + StepCount + '">' + OtherStepDetails[0].ApproverType + '</span><span id="InitialsSign' + StepCount + '">' + $("#chkFooterSign").prop('checked') + '</span></div>';
            ApprovalStep += '<div class="dropdown ForCustomizeOnly"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
            ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
            ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
            ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';
            var attachment = "../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
            ApprovalStep += '<div class="col-sm-6 flexitem" id="IniApp' + StepCount + '"><div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
            ApprovalStep += '<h4>Will be decided by Initiator.</h4><a href="javascript:void(0);" style="cursor:pointer;"></a></div>';
            ApprovalStep += '<div class="InitiatorApp"><button type="button" class="btn custom-btn wpx-87" onclick="DisplayInitiatorApp(\'NewStep' + StepCount + '\', \'' + StepCount + '\', \'' + StepName + '\', \'' + EmptyArray + '\')">Add Approver</button></div>';

            ApprovalStep += '</div></div></li>';

        }
        else {
            ApprovalStep += '<li class="StepClass removeDiv NewStep' + StepCount + '">';
            ApprovalStep += '<div style="display:none;"><span id="EmailStep' + StepCount + '">NA</span><span id="EmpIdStep' + StepCount + '">NA</span><span id="NameStep' + StepCount + '">will be provided at Runtime</span><span id="StepName' + StepCount + '">' + StepName + '</span><span id="TypeStep' + StepCount + '">' + TypeValue + '</span>';
            ApprovalStep += '<span id="DecideStep' + StepCount + '">' + OtherStepDetails[0].ApproverDecidingStep + '</span><span id="AppRoleStep' + StepCount + '">' + OtherStepDetails[0].ApproverRole + '</span><span id="AppTypeStep' + StepCount + '">' + OtherStepDetails[0].ApproverType + '</span><span id="InitialsSign' + StepCount + '">' + $("#chkFooterSign").prop('checked') + '</span></div>';
            ApprovalStep += '<div class="dropdown ForCustomizeOnly"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
            ApprovalStep += '</button><ul class="dropdown-menu pull-right"><li onclick="EditStep(' + StepCount + ');"><a href="javascript:void(0);" data-toggle="modal" data-target="#addsuccessor"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a></li>';
            ApprovalStep += '<li class="DeleteStep" id="btnDeleteStep' + StepCount + '" onclick="DeleteSeletedStep(' + StepCount + ');"><a href="javascript:void(0);"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></li></ul></div>';
            ApprovalStep += '<div class="approvelheadeing"><h3 class="mainheading" id="txtStep' + StepCount + 'Name">' + StepName + '</h3></div><div class="row">';
            var attachment = "../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
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
    if (arrEMails.length > 0) {
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
    if (AppEmails.length > 0) {
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
        ApprovalStep += '<div class="dropdown ForCustomizeOnly" style="display:none;"><button class="dropdown-toggle" type="button" data-toggle="dropdown"><img src="../SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt="">';
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
    $("#chkFooterSign").prop("checked", $("#InitialsSign" + StepCount).text());

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
function checkUserValid(Email) {
    var IsUserValid = false;
    var RestQuery = "?$select=Status,Email&$filter= Status eq 'Active' and Email eq '" + Email + "'&$top=5000";
    $.when(getItemsWithQuery("Employees", RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (Employees) {
        try {
            if (Employees.length > 0) {
                IsUserValid = true;
            }
            else {
                var todayDate = new Date();
                todayDate = todayDate.setDate(todayDate.getDate() - 1);
                todayDate = new Date(todayDate);
                //Check in External Users list
                var Query = "?$select=AttachmentFiles,LoginName/EMail,LoginName/Title,LoginName/Id,Supervisor/Title,Designation,Client_Name/Title,Client_Name/Id&$expand=AttachmentFiles,LoginName,Client_Name,Supervisor&$filter=LoginName/EMail eq '" + Email + "' and Status eq 'Active' and ValidUpto ge datetime'" + todayDate.toISOString() + "' &$top=5000";
                $.when(getItemsWithQuery('ExternalUsers', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ExtResults) {
                    if (ExtResults.length > 0) {
                        IsUserValid = true;
                    }
                });
            }
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
    $("#noAppValidDate").prop('checked', 'checked');
    $("#AppValidDateField").prop('disabled', 'disabled');
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
    if (CopyLibrary == 'DocumentManagementSystem') {
        OriginSection = "My-DMS: " + _spPageContextInfo.userDisplayName;
    }
    else if (currentSectionType == 'Group Documents') {
        OriginSection = "Group" + ": " + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'Department') {
        OriginSection = "Department: " + $(".headdingLinks").text();
    }
    else if (currentSectionType == 'ProjectDocuments') {
        OriginSection = "Project: " + $(".headdingLinks").text();
    }
    else if (currentSectionType == "GuestDocuments") {
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
            if (FinalFiles4Upload.length > 0) {
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
                            if (Action == 'Initiator') {
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
        IsFooterSign = JSON.parse($("#InitialsSign" + currentStepCount).text().toLowerCase());
        arrTempApprovers = [];
        if (assignUserName[0] != "will be provided at Runtime") {
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
        if (assignUserName[0] == "will be provided at Runtime") {
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
function ApprovalStartValid() {
    var IsReturn = true;
    var currentStepCount = '';
    $('#accordionapprovers .StepClass').each(function (i) {
        var currentStepCount = this.classList[2].replace("NewStep", "");
        if (($("#EmpIdStep" + currentStepCount).text() == "" || $("#EmpIdStep" + currentStepCount).text() == "NA" || $("#EmpIdStep" + currentStepCount).text() == "null") && ($("#DecideStep" + currentStepCount).text() == "Initiation")) {
            IsReturn = false;
        }
    });
    if (IsReturn == false) {
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
        var tempCopyLib = CopyLibrary;
        if (tempCopyLib.includes('_') == true) {
            tempCopyLib = tempCopyLib.replace('_', '_x005f_');
        }
        var ItemType = GetItemTypeForLibraryName(tempCopyLib);
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
            AddDocApproval();
            dfd.resolve(data);
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            $("#overlaysearch").fadeOut();
            if (error.responseText.includes("Access is denied") == true) {
                alert("You don't have the required permission on " + $("#FileName").text() + " to perform this operation.");
            }
            else if (error.responseText.indexOf('does not exist on type') != -1) {
                alert("Required columns does not exists. Kindly contact administrator to activate features.");
            }
            else {
                alert(error.responseText);
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

//Add Approval method ends ----------------------------------


//Shared with Me and Shared By Me code starts ---------------------------

//Get all the Documents which are shared with me/shared by me.
function GetDocumentsSharedWithMe(SectionName) {
    //Geenrating the THead of table
    $("#generateBradCumbSearchResults").hide();
    $("#generateBradCumbNew").show();
    $("#generateBradCumbNew").empty();
    $("#DMSTable").empty().html('<table class="table mb-0 custom-table tablemanager" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    var ColumnName = "";
    var sharedWithMeTR = '';
    ColumnName += '<th class="text-center border-bottom-0 w-2 disableSort">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label><span class="TblHeader hide"></span>' +
        '</th>';
    $("#theadItem").empty();
    if (SectionName == 'SharedByMe') {
        var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared From', 'Permission', ''];
        // var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared From', 'Permission', ''];
    }
    else {
        var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
        //var SharedMeColNames = ['File', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
    }
    for (var i = 0; i < SharedMeColNames.length; i++) {
        if (SharedMeColNames[i] == '') {
            ColumnName += '<th class="disableSort" data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '<span class="TblHeader hide"></span></th>';
        }
        else if (SharedMeColNames[i] == 'Category') {
            ColumnName += '<th><span class="TblHeader" data-localize="Category">Category</span></th>';
        }
        else {
            ColumnName += '<th><span class="TblHeader" data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</span></th>';
        }
    }
    $("#theadItem").append(ColumnName);
    LoggedUserSPGp = GetSPGroup();
    var SharedUserFilter = "";
    for (var gp = 0; gp < LoggedUserSPGp.length; gp++) {
        SharedUserFilter += "or SharedUsers/Id eq '" + LoggedUserSPGp[gp].Id + "' ";
    }
    /*var EveryoneUserId = getTargetGroupId();
    for (var gp = 0; gp < EveryoneUserId.length; gp++) {
        SharedUserFilter += "or SharedUsers/Id eq '" + EveryoneUserId[gp] + "' ";
    }*/

    SharedUserFilter = SharedUserFilter.substring(0, SharedUserFilter.length - 1) + ")";
    //Bhawana
    if (SectionName == 'ApprovalForShare') {
        var Query = "?$select=*,SharedMessage,MetaDataRestricted,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,Approvers/Title,Approvers/EMail,ApprovalStatus,ApprovedBy/Title,ApprovedBy/EMail,ApproveDate,ApprovalRemarks,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Approvers/Id,ApprovedBy/Id,Author&$filter=(Approvers/EMail eq '" + _spPageContextInfo.userEmail + "') ";
    }
    else   if (SectionName == 'SharedByMe') {
        var Query = "?$select=*,SharedMessage,MetaDataRestricted,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(Author/EMail eq '" + _spPageContextInfo.userEmail + "' and IsArchive ne 1) ";
    }
    else if (SectionName == "Archive") {
        var Query = "?$select=*,SharedMessage,MetaDataRestricted,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(SharedUsers/Id eq '" + _spPageContextInfo.userId + "' " + SharedUserFilter + " and (PermissionType eq 'Read' or PermissionType eq 'Contribute' or PermissionType eq 'Restricted View') and (PermissionStatus ne 'Deleted') and (IsArchive eq 1)";
    }
    else {
        var Query = "?$select=*,SharedMessage,MetaDataRestricted,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Author&$filter=(SharedUsers/Id eq '" + _spPageContextInfo.userId + "' " + SharedUserFilter + " and (PermissionType eq 'Read' or PermissionType eq 'Contribute' or PermissionType eq 'Restricted View' or PermissionStatus eq 'Revoked' or PermissionStatus eq 'RevokePending') and (PermissionStatus ne 'Deleted' and IsArchive ne 1)";
    }
    $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
        if (SectionName == 'SharedByMe') {
            arrSharedBy = items.filter(function (f) { return f; });
        }
        else {
            arrSharedTo = items.filter(function (f) { return f; });
        }
        if (items.length) {
            if (SectionName == 'ApprovalForShare') {//Bhawana
                BindApprovalForShare(items);
            }
            else if (SectionName == 'SharedByMe') {
                SharedByMeItems(items);
            }
            else {
                items = items.filter(function (obj) { //Filter array on the basis of PermissionStatus 
                    return (obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "RevokePending");
                });
                SharedWithMeItems(items, 'SharedWithMe');
            }
           
            $('.loading_tbl').hide();//Bhawana
            //$(".managcover").removeClass('active');//Bhawana
            waitingDialog.hide();//Bhawana
        }
        else {
           
            $('.loading_tbl').hide();//Bhawana
            //$(".managcover").removeClass('active');//Bhawana
            waitingDialog.hide();//Bhawana
            sharedWithMeTR += '<tr><td colspan="12" style="text-align:center;">No file or folder found.</td></tr>';
            $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
            $("#divPendingAck").hide();
        }
        ChangeLabels();
    });
}
//Bhawana
//Bind approval for share
function BindApprovalForShare(items) {
    arrFileFolder = [];
    var LoggedUserSPGp = [],
        IsEveryone = [],
        ChatBoxHTML = '',
        AckCounter = 0;
    ActionHTML = '';

    var HistoryAction = "SharedWithMe";
    var sharedWithMeTR = '';
    for (var i = 0; i < items.length; i++) {
        var DocumentNo = items[i].DOC_ID.DocumentNo ? items[i].DOC_ID.DocumentNo : "";
        var DocumentType = items[i].DocumentType ? items[i].DocumentType : "";
        var Details = items[i].Details ? items[i].Details : "";
        var sourceDocType = items[i].DOC_ID.DocumentType ? items[i].DOC_ID.DocumentType : "";
        var PermissionType = items[i].PermissionType ? items[i].PermissionType : "";

        var PermissionStatus = items[i].PermissionStatus;
        if (PermissionStatus != "Revoked" && PermissionStatus != "Deleted" && PermissionStatus != "RevokePending") {
            PermissionStatus = PermissionType;
        }
        else {
            PermissionStatus = PermissionStatus.fontcolor("Red");
        }
        if (sourceDocType == "--select--" || sourceDocType == "-Select-") {
            sourceDocType = '';
        }
        if (items[i].SubCategory != "null" && items[i].SubCategory != null && items[i].SubCategory != "" && items[i].SubCategory != "--select--" && items[i].SubCategory != "-Select-") {
            sourceDocType = "(" + sourceDocType + ")" + items[i].SubCategory;
        }
        var Title = items[i].Title ? items[i].Title : "";
        var SourceDocTitle = items[i].DOC_ID.Title ? items[i].DOC_ID.Title : "";
        var sharedBy = items[i].Author.Title
        var FileServerRelativeUrl = items[i].ServerRedirectedEmbedURL;
        if (FileServerRelativeUrl == null || FileServerRelativeUrl == "") {
            FileServerRelativeUrl = items[i].DocumentURL;//items[i].File.ServerRelativeUrl;
        }
        FileServerRelativeUrl = FileServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
        var documentLink = "";
        var splitDocTypeLink = "";
        var downloadlink = "";
        var FileExtension = "." + Title.substring(Title.lastIndexOf('.') + 1);
        sharedFrom = getSharedFromValue(items[i].SharedType, items[i].SharedFrom);
        if (DocumentType.toLowerCase() != "folder") {
            Icon = "file.png";
            if (".docx" == FileExtension || ".doc" == FileExtension) {
                Icon = "docx.png";
            } else if (".pdf" == FileExtension) {
                Icon = "pdf.png";
            } else if (".jpg" == FileExtension || ".psd" == FileExtension || ".tiff" == FileExtension || ".gif" == FileExtension || ".bmp" == FileExtension || ".jpeg" == FileExtension || ".png" == FileExtension) {
                Icon = "image-icon.png";
            } else if (".xlsx" == FileExtension || ".xls" == FileExtension) {
                Icon = "xlsx.png";
            } else if (".pptx" == FileExtension || ".ppt" == FileExtension) {
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

            if (items[i].PermissionStatus != "Revoked" && items[i].PermissionStatus != "Deleted" && items[i].PermissionStatus != "RevokePending") {
                var SiteURL = '';
                if (items[i].SharedType == null || items[i].SharedType == "Personal" || items[i].SharedType == "My-DMS") {
                    DMS_Type = "My Documents";
                }
                else {
                    DMS_Type = items[i].SharedType + ': ' + items[i].SharedFrom;
                }
                if (items[i].SiteURL == "null" || items[i].SiteURL == null || items[i].SiteURL == "undefined" || items[i].SiteURL == undefined) {
                    if (encodeURI(items[i].DocumentURL).indexOf("DepartmentalDMS") != -1) {
                        SiteURL = window.location.origin + encodeURI(items[i].DocumentURL).split('DepartmentalDMS')[0];
                    }
                    else {
                        SiteURL = _spPageContextInfo.webAbsoluteUrl;
                    }
                }
                else {
                    SiteURL = items[i].SiteURL;
                }
                var NullValue = 'NullValue';
                var shareMsgg=(items[i].SharedMessage!=""&&items[i].SharedMessage!=undefined&&items[i].SharedMessage!=null&&items[i].SharedMessage!='null'&&items[i].SharedMessage!='undefined')?fixedEncodeURIComponent(items[i].SharedMessage):"";//24 April 23
                documentLink = '<a href="javascript:void(0);" name="' + items[i].DocumentURL + '" rel="' + items[i].Id + '" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + DMS_Type + '\', \'' + PermissionStatus + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + fixedEncodeURIComponent(items[i].DocumentURL) + '\', \'' + items[i].Id + '\', \'' + NullValue + '\', \'' + items[i].LibraryURL + '\', \'' + items[i].MetaDataRestricted + '\', \'' + shareMsgg + '\');">' + Title + '</a>';
                downloadlink = "<a href='" + fixedEncodeURIComponent(items[i].DocumentURL,"href") + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
            }
            else {
                documentLink = '<a href="javascript:void(0);" name="' + items[i].DocumentURL + '">' + Title + '</a>';
            }
            if (items[i].CommentCount != null && items[i].CommentCount != "null" && items[i].CommentCount != 0 && items[i].CommentCount != "0") {
                ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[i].DocumentID + '\', \'' + items[i].Title + '\', \'' + items[i].SharedFileTitle + '\', \'' + items[i].DocType + '\', \'' + items[i].EditorId + '\', \'' + items[i].EditorId + '\', \'' + items[i].Modified + '\', \'' + items[i].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png" style="width:20px; margin:0 2px;"></span>';
            }
            else {
                ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[i].DocumentID + '\', \'' + items[i].Title + '\', \'' + items[i].SharedFileTitle + '\', \'' + items[i].DocType + '\', \'' + items[i].EditorId + '\', \'' + items[i].EditorId + '\', \'' + items[i].Modified + '\', \'' + items[i].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/Msg.png" style="width:20px; margin:0 2px;"></span>';
            }
        }
        else {
            ChatBoxHTML = '';
            Icon = "folder.png";
            var LibraryType = '';
            if (items[i].SharedType == null || items[i].SharedType == "Personal" || items[i].SharedType == "My-DMS") {
                LibraryType = "My Documents";
            }
            else {
                LibraryType = items[i].SharedType + ': ' + items[i].SharedFrom;
            }
            var tempStatus = PermissionStatus;
            if (PermissionStatus == '<font color="Red">Revoked</font>') {
                tempStatus = "Revoked";
            }
            RunBreadCrumb = true;
            documentLink += '<a href="javascript:void(0);" rel="' + items[i].Id + '" onclick="GetSharedFolderDocuments(this, \'' + encodeURI(items[i].DocumentURL) + '\', \'' + tempStatus + '\', \'' + items[i].SiteURL + '\', \'' + items[i].LibraryName + '\', \'' + items[i].Title + '\', \'' + DocumentNo + '\', \'' + sourceDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + items[i].IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\');" class="doc_icon">' + Title + '</a>';
            SourceDocTitle = Title;   //Title For Folder
            sourceDocType = "Folder";
        }

        if (items[i].NeedAcknowledgement == true) {
            var AckValue = AckUserStatus(items[i].Id, _spPageContextInfo.userEmail, items[i].DocumentURL, items[i].SiteURL, items[i].PermissionType, items[i].LibraryName, items[i].SharedFrom);
        }
        else {
            var AckValue = '';
        }
        if (AckValue.indexOf("DisplayFileProperty") !== -1) {
            AckCounter++;
        }
        if ($("#ddlAckFilter").val() == "Acknowledged") {
            if (AckValue.indexOf("Acknowledged") !== -1) {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[i].Id + ', ' + items[i].DocumentType + ', ' + items[i].SharedGroup + ', ' + items[i].DocumentID + ', ' + items[i].DocumentURL + ', ' + items[i].SharedUsers.results[0].ID + ', ' + items[i].SiteURL + ', ' + items[i].IsBlock + ', ' + items[i].Title + ', ' + items[i].SharedFileTitle + ', ' + items[i].LibraryName + ', ' + items[i].SharedType + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
                sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
                items[i].DOC_ID.Title = items[i].DOC_ID.Title ? items[i].DOC_ID.Title : "";
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[i].DOC_ID.Title + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';

                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '<br>';
                sharedWithMeTR += '' + AckValue + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="ShareAction"><img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[i].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[i].Id + '\')">';
                sharedWithMeTR += '</div>' + ChatBoxHTML + '</td></tr>';
            }
        }
        else if ($("#ddlAckFilter").val() == "Pending") {
            if (AckValue.search(/\bAcknowledge\b/) >= 0) {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[i].Id + ', ' + items[i].DocumentType + ', ' + items[i].SharedGroup + ', ' + items[i].DocumentID + ', ' + items[i].DocumentURL + ', ' + items[i].SharedUsers.results[0].ID + ', ' + items[i].SiteURL + ', ' + items[i].IsBlock + ', ' + items[i].Title + ', ' + items[i].SharedFileTitle + ', ' + items[i].LibraryName + ', ' + items[i].SharedType + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
                sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
                items[i].DOC_ID.Title = items[i].DOC_ID.Title ? items[i].DOC_ID.Title : "";
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[i].DOC_ID.Title + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';

                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '<br>';
                sharedWithMeTR += '' + AckValue + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="ShareAction"><img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[i].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[i].Id + '\')">';
                sharedWithMeTR += '</div>' + ChatBoxHTML + '</td></tr>';
            }
        }

        else {
            sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[i].Id + ', ' + items[i].DocumentType + ', ' + items[i].SharedGroup + ', ' + items[i].DocumentID + ', ' + items[i].DocumentURL + ', ' + items[i].SharedUsers.results[0].ID + ', ' + items[i].SiteURL + ', ' + items[i].IsBlock + ', ' + items[i].Title + ', ' + items[i].SharedFileTitle + ', ' + items[i].LibraryName + ', ' + items[i].SharedType + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
            sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
            sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
            items[i].DOC_ID.Title = items[i].DOC_ID.Title ? items[i].DOC_ID.Title : "";
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[i].DOC_ID.Title + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';

            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '<br>';
            sharedWithMeTR += '' + AckValue + '</div></td>';          
            sharedWithMeTR += '<td class="text-left"><div class="ShareAction"><img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharingRuleApprovalItem(\''  + items[i].Id + '\')">';//Bhawana
        }
    }
    if (SharedMeTable != '') {
        SharedMeTable.destroy();
    }
    $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
    if (AckCounter == 0) {
        $("#divPendingAck").hide();
    }
    else {
        $("#txtPendingCount").text(AckCounter);
        $("#divPendingAck").show();
    }
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
                IsBlock: Properties[7].trim(),
                FileName: Properties[8].trim(),
                FileTitle: Properties[9].trim(),
                LibraryName: Properties[10].trim(),
                SharedType: Properties[11].trim(),
                FileFolderName:Properties[8].trim()//2 march 23
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

    

    //TableSharedMePagination();
    Tableagination();
    //to add checkbox click on header sort//11 May 23
    $(".sorterHeader").click(function(e){
        addSelectAllEvent();
    });
}

//bind Shared with me Items
function SharedWithMeItems(items) {
    arrFileFolder = [];
    var LoggedUserSPGp = [],
        IsEveryone = [],
        ChatBoxHTML = '',
        AckCounter = 0;
    ActionHTML = '';

    var HistoryAction = "SharedWithMe";
    var sharedWithMeTR = '';
    for (var i = 0; i < items.length; i++) {
        var DocumentNo = items[i].DOC_ID.DocumentNo ? items[i].DOC_ID.DocumentNo : "";
        var DocumentType = items[i].DocumentType ? items[i].DocumentType : "";
        var Details = items[i].Details ? items[i].Details : "";
        var sourceDocType = items[i].DOC_ID.DocumentType ? items[i].DOC_ID.DocumentType : "";
        var PermissionType = items[i].PermissionType ? items[i].PermissionType : "";

        var PermissionStatus = items[i].PermissionStatus;
        if (PermissionStatus != "Revoked" && PermissionStatus != "Deleted" && PermissionStatus != "RevokePending") {
            PermissionStatus = PermissionType;
        }
        else {
            PermissionStatus = PermissionStatus.fontcolor("Red");
        }
        if (sourceDocType == "--select--" || sourceDocType == "-Select-") {
            sourceDocType = '';
        }
        if (items[i].SubCategory != "null" && items[i].SubCategory != null && items[i].SubCategory != "" && items[i].SubCategory != "--select--" && items[i].SubCategory != "-Select-") {
            sourceDocType = "(" + sourceDocType + ")" + items[i].SubCategory;
        }
        var Title = items[i].Title ? items[i].Title : "";
        var SourceDocTitle = items[i].DOC_ID.Title ? items[i].DOC_ID.Title : "";
        var sharedBy = items[i].Author.Title
        var FileServerRelativeUrl = items[i].ServerRedirectedEmbedURL;
        if (FileServerRelativeUrl == null || FileServerRelativeUrl == "") {
            FileServerRelativeUrl = items[i].DocumentURL;//items[i].File.ServerRelativeUrl;
        }
        FileServerRelativeUrl = FileServerRelativeUrl.replace("interactivepreview", "default&mobileredirect=true");
        var documentLink = "";
        var splitDocTypeLink = "";
        var downloadlink = "";
        var FileExtension = "." + Title.substring(Title.lastIndexOf('.') + 1);
        sharedFrom = getSharedFromValue(items[i].SharedType, items[i].SharedFrom);
        if (DocumentType.toLowerCase() != "folder") {
            Icon = "file.png";
            if (".docx" == FileExtension || ".doc" == FileExtension) {
                Icon = "docx.png";
            } else if (".pdf" == FileExtension) {
                Icon = "pdf.png";
            } else if (".jpg" == FileExtension || ".psd" == FileExtension || ".tiff" == FileExtension || ".gif" == FileExtension || ".bmp" == FileExtension || ".jpeg" == FileExtension || ".png" == FileExtension) {
                Icon = "image-icon.png";
            } else if (".xlsx" == FileExtension || ".xls" == FileExtension) {
                Icon = "xlsx.png";
            } else if (".pptx" == FileExtension || ".ppt" == FileExtension) {
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

            if (items[i].PermissionStatus != "Revoked" && items[i].PermissionStatus != "Deleted" && items[i].PermissionStatus != "RevokePending") {
                var SiteURL = '';
                if (items[i].SharedType == null || items[i].SharedType == "Personal" || items[i].SharedType == "My-DMS") {
                    DMS_Type = "My Documents";
                }
                else {
                    DMS_Type = items[i].SharedType + ': ' + items[i].SharedFrom;
                }
                if (items[i].SiteURL == "null" || items[i].SiteURL == null || items[i].SiteURL == "undefined" || items[i].SiteURL == undefined) {
                    if (encodeURI(items[i].DocumentURL).indexOf("DepartmentalDMS") != -1) {
                        SiteURL = window.location.origin + encodeURI(items[i].DocumentURL).split('DepartmentalDMS')[0];
                    }
                    else {
                        SiteURL = _spPageContextInfo.webAbsoluteUrl;
                    }
                }
                else {
                    SiteURL = items[i].SiteURL;
                }
                var NullValue = 'NullValue';
                var shareMsgg=(items[i].SharedMessage!=""&&items[i].SharedMessage!=null&&items[i].SharedMessage!=undefined&&items[i].SharedMessage!='null'&&items[i].SharedMessage!='undefined')?fixedEncodeURIComponent(items[i].SharedMessage):"";
                documentLink = '<a href="javascript:void(0);" id="'+items[i].Id+items[i].DocumentID+'" name="' + items[i].DocumentURL + '" rel="' + items[i].Id + '" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + DMS_Type + '\', \'' + PermissionStatus + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + fixedEncodeURIComponent(items[i].DocumentURL) + '\', \'' + items[i].Id + '\', \'' + NullValue + '\', \'' + items[i].LibraryURL + '\', \'' + items[i].MetaDataRestricted + '\', \'' + shareMsgg + '\');">' + Title + '</a>';//Bhawana
                //documentLink = '<a href="javascript:void(0);" name="' + items[i].DocumentURL + '" rel="' + items[i].Id + '" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + DMS_Type + '\', \'' + PermissionStatus + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + items[i].DocumentURL + '\', \'' + items[i].Id + '\', \'' + NullValue + '\', \'' + items[i].LibraryURL + '\');">' + Title + '</a>';
                downloadlink = "<a href='" + fixedEncodeURIComponent(items[i].DocumentURL,"href") + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
            }
            else {
                documentLink = '<a href="javascript:void(0);" name="' + items[i].DocumentURL + '">' + Title + '</a>';
            }
            if (items[i].CommentCount != null && items[i].CommentCount != "null" && items[i].CommentCount != 0 && items[i].CommentCount != "0") {
                ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[i].DocumentID + '\', \'' + items[i].Title + '\', \'' + items[i].SharedFileTitle + '\', \'' + items[i].DocType + '\', \'' + items[i].EditorId + '\', \'' + items[i].EditorId + '\', \'' + items[i].Modified + '\', \'' + items[i].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png" style="width:20px; margin:0 2px;"></span>';
            }
            else {
                ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[i].DocumentID + '\', \'' + items[i].Title + '\', \'' + items[i].SharedFileTitle + '\', \'' + items[i].DocType + '\', \'' + items[i].EditorId + '\', \'' + items[i].EditorId + '\', \'' + items[i].Modified + '\', \'' + items[i].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/Msg.png" style="width:20px; margin:0 2px;"></span>';
            }
        }
        else {
            ChatBoxHTML = '';
            Icon = "folder.png";
            var LibraryType = '';
            if (items[i].SharedType == null || items[i].SharedType == "Personal" || items[i].SharedType == "My-DMS") {
                LibraryType = "My Documents";
            }
            else {
                LibraryType = items[i].SharedType + ': ' + items[i].SharedFrom;
            }
            var tempStatus = PermissionStatus;
            if (PermissionStatus == '<font color="Red">Revoked</font>') {
                tempStatus = "Revoked";
            }
            RunBreadCrumb = true;
            //documentLink += '<a href="javascript:void(0);" rel="' + items[i].Id + '" onclick="GetSharedFolderDocuments(this, \'' + encodeURI(items[i].DocumentURL) + '\', \'' + tempStatus + '\', \'' + items[i].SiteURL + '\', \'' + items[i].LibraryName + '\', \'' + items[i].Title + '\', \'' + DocumentNo + '\', \'' + sourceDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + items[i].IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\');" class="doc_icon">' + Title + '</a>';
            //10 May 23
            var shareMsgg=(items[i].SharedMessage!=""&&items[i].SharedMessage!=null&&items[i].SharedMessage!=undefined&&items[i].SharedMessage!='null'&&items[i].SharedMessage!='undefined')?fixedEncodeURIComponent(items[i].SharedMessage):"";
            documentLink += '<a href="javascript:void(0);" rel="' + items[i].Id + '" onclick="GetSharedFolderDocuments(this, \'' + encodeURI(items[i].DocumentURL) + '\', \'' + tempStatus + '\', \'' + items[i].SiteURL + '\', \'' + items[i].LibraryName + '\', \'' + items[i].Title + '\', \'' + DocumentNo + '\', \'' + sourceDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + items[i].IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\', \'' + items[i].LibraryURL + '\', \'' + items[i].MetaDataRestricted + '\', \'' + shareMsgg + '\');" class="doc_icon">' + Title + '</a>';
           
            SourceDocTitle = Title;   //Title For Folder
            sourceDocType = "Folder";
        }

        if (items[i].NeedAcknowledgement == true) {
            var AckValue = AckUserStatus(items[i].Id, _spPageContextInfo.userEmail, items[i].DocumentURL, items[i].SiteURL, items[i].PermissionType, items[i].LibraryName, items[i].SharedFrom);
        }
        else {
            var AckValue = '';
        }
        if (AckValue.indexOf("DisplayFileProperty") !== -1) {
            AckCounter++;
        }
        if ($("#ddlAckFilter").val() == "Acknowledged") {
            if (AckValue.indexOf("Acknowledged") !== -1) {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[i].Id + ', ' + items[i].DocumentType + ', ' + items[i].SharedGroup + ', ' + items[i].DocumentID + ', ' + items[i].DocumentURL + ', ' + items[i].SharedUsers.results[0].ID + ', ' + items[i].SiteURL + ', ' + items[i].IsBlock + ', ' + items[i].Title + ', ' + items[i].SharedFileTitle + ', ' + items[i].LibraryName + ', ' + items[i].SharedType + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
                sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
                items[i].DOC_ID.Title = items[i].DOC_ID.Title ? items[i].DOC_ID.Title : "";
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[i].DOC_ID.Title + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';

                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '<br>';
                sharedWithMeTR += '' + AckValue + '</div></td>';
                //sharedWithMeTR += '<td class="text-left"><div class="ShareAction"><img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[i].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[i].Id + '\')">';
               // sharedWithMeTR += '</div>' + ChatBoxHTML + '</td></tr>';
                sharedWithMeTR+='<td class="text-left">' + ChatBoxHTML + '</td></tr>';//on 24 April 23
            }
        }
        else if ($("#ddlAckFilter").val() == "Pending") {
            if (AckValue.search(/\bAcknowledge\b/) >= 0) {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[i].Id + ', ' + items[i].DocumentType + ', ' + items[i].SharedGroup + ', ' + items[i].DocumentID + ', ' + items[i].DocumentURL + ', ' + items[i].SharedUsers.results[0].ID + ', ' + items[i].SiteURL + ', ' + items[i].IsBlock + ', ' + items[i].Title + ', ' + items[i].SharedFileTitle + ', ' + items[i].LibraryName + ', ' + items[i].SharedType + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
                sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
                items[i].DOC_ID.Title = items[i].DOC_ID.Title ? items[i].DOC_ID.Title : "";
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[i].DOC_ID.Title + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';

                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '<br>';
                sharedWithMeTR += '' + AckValue + '</div></td>';
                //sharedWithMeTR += '<td class="text-left"><div class="ShareAction"><img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[i].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[i].Id + '\')">';
               // sharedWithMeTR += '</div>' + ChatBoxHTML + '</td></tr>';
                sharedWithMeTR+='<td class="text-left">' + ChatBoxHTML + '</td></tr>';//on 24 April 23
            }
        }

        else {
            sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[i].Id + ', ' + items[i].DocumentType + ', ' + items[i].SharedGroup + ', ' + items[i].DocumentID + ', ' + items[i].DocumentURL + ', ' + items[i].SharedUsers.results[0].ID + ', ' + items[i].SiteURL + ', ' + items[i].IsBlock + ', ' + items[i].Title + ', ' + items[i].SharedFileTitle + ', ' + items[i].LibraryName + ', ' + items[i].SharedType + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
            sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
            sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
            items[i].DOC_ID.Title = items[i].DOC_ID.Title ? items[i].DOC_ID.Title : "";
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[i].DOC_ID.Title + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedBy + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';

            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '<br>';
            sharedWithMeTR += '' + AckValue + '</div></td>';
            //sharedWithMeTR += '<td class="text-left"><div class="ShareAction"><img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[i].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[i].Id + '\')">';
           // sharedWithMeTR += '</div>' + ChatBoxHTML + '</td></tr>';
            sharedWithMeTR+='<td class="text-left">' + ChatBoxHTML + '</td></tr>';//on 24 April 23

        }
    }
    if (SharedMeTable != '') {
        SharedMeTable.destroy();
    }
    $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
    if (AckCounter == 0) {
        $("#divPendingAck").hide();
    }
    else {
        $("#txtPendingCount").text(AckCounter);
        $("#divPendingAck").show();
    }
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
                IsBlock: Properties[7].trim(),
                FileName: Properties[8].trim(),
                FileTitle: Properties[9].trim(),
                LibraryName: Properties[10].trim(),
                SharedType: Properties[11].trim(),
                FileFolderName:Properties[8].trim()//2 march 23

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

     
    //TableSharedMePagination();
    Tableagination();
    //to add checkbox click on header sort//11 May 23
    $(".sorterHeader").click(function(e){
        addSelectAllEvent();
    });
}


//bind Shared by me Items
function SharedByMeItems(array) {
    arrFileFolder = [];
    var LoggedUserSPGp = [],
        arrDuplicateFile = [],
        arrRevoked = [],
        IsEveryone = [],
        ActionHTML = '',
        PermissionStatus = 'Single',
        items = [],
        ChatBoxHTML = '',
        HistoryAction = "SharedByMe";
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
                return obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "Deleted" && obj.PermissionStatus != "RevokePending";
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
            if (items[0].SubCategory != "null" && items[0].SubCategory != null && items[0].SubCategory != "" && items[0].SubCategory != "--select--" && items[0].SubCategory != "-Select-") {
                sourceDocType = "(" + sourceDocType + ")" + items[0].SubCategory;
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
                } else if (".xlsx" == FileExtension || ".xls" == FileExtension) {
                    Icon = "xlsx.png";
                } else if (".pptx" == FileExtension || ".ppt" == FileExtension) {
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
                var shareMsgg="";
                if(items[0].SharedMessage!=undefined&&items[0].SharedMessage!=""&&items[0].SharedMessage!=null&&items[0].SharedMessage!='null'&&items[0].SharedMessage!='undefined')
                 shareMsgg=fixedEncodeURIComponent(items[0].SharedMessage);
                documentLink = '<a href="javascript:void(0);" name="' + items[0].DocumentURL + '" rel="' + items[0].Id + '" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + DMS_Type + '\', \'' + PermissionStatus + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + fixedEncodeURIComponent(items[0].DocumentURL) + '\', \'' + items[0].Id + '\', \'' + NullValue + '\', \'' + items[0].LibraryURL + '\', \'' + items[0].MetaDataRestricted + '\', \'' + shareMsgg + '\');">' + Title + '</a>';
                downloadlink = "<a href='" + fixedEncodeURIComponent(items[0].DocumentURL,"href") + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
                if (items[0].CommentCount != null && items[0].CommentCount != "null" && items[0].CommentCount != 0 && items[0].CommentCount != "0") {
                    ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[0].DocumentID + '\', \'' + items[0].Title + '\', \'' + items[0].SharedFileTitle + '\', \'' + items[0].DocType + '\', \'' + items[0].EditorId + '\', \'' + items[0].EditorId + '\', \'' + items[0].Modified + '\', \'' + items[0].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/MsgLines.png" style="width:20px; margin:0 2px;"></span>';
                }
                else {
                    ChatBoxHTML = '<span class="text-left chatBox" data-toggle="modal" data-target="#chat_sec" onclick="OpenChatBox(\'' + items[0].DocumentID + '\', \'' + items[0].Title + '\', \'' + items[0].SharedFileTitle + '\', \'' + items[0].DocType + '\', \'' + items[0].EditorId + '\', \'' + items[0].EditorId + '\', \'' + items[0].Modified + '\', \'' + items[0].SiteURL + '\',this)"><img src="../SiteAssets/MyDocuments/DMS/assets/images/Msg.png" style="width:20px; margin:0 2px;"></span>';
                }
            }
            else {
                ChatBoxHTML = '';
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
                var shareMsgg="";
                if(items[0].SharedMessage!=undefined&&items[0].SharedMessage!=""&&items[0].SharedMessage!=null&&items[0].SharedMessage!='null'&&items[0].SharedMessage!='undefined')
                    shareMsgg=fixedEncodeURIComponent(items[0].SharedMessage);
                 documentLink += '<a href="javascript:void(0);" rel="' + items[0].Id + '" onclick="GetSharedFolderDocuments(this, \'' + encodeURI(items[0].DocumentURL) + '\', \'' + tempStatus + '\', \'' + items[0].SiteURL + '\', \'' + items[0].LibraryName + '\', \'' + items[0].Title + '\', \'' + DocumentNo + '\', \'' + sourceDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + items[0].IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\', \'' + items[0].LibraryURL + '\', \'' + items[0].MetaDataRestricted + '\', \'' + shareMsgg + '\');" class="doc_icon">' + Title + '</a>';//10 May 23
               
               // documentLink += '<a href="javascript:void(0);" rel="' + items[0].Id + '" onclick="GetSharedFolderDocuments(this, \'' + encodeURI(items[0].DocumentURL) + '\', \'' + tempStatus + '\', \'' + items[0].SiteURL + '\', \'' + items[0].LibraryName + '\', \'' + items[0].Title + '\', \'' + DocumentNo + '\', \'' + sourceDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + items[0].IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\');" class="doc_icon">' + Title + '</a>';
                SourceDocTitle = Title;   //Title For Folder
                sourceDocType = "Folder";
            }
            if (PermissionStatus == "All revoked") {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" id ="ShareToMe' + i + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + i + '">';
            }
            else {
                sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + items[0].Id + ', ' + items[0].DocumentType + ', ' + items[0].SharedGroup + ', ' + items[0].DocumentID + ', ' + items[0].DocumentURL + ', ' + items[0].SharedUsers.results[0].ID + ', ' + items[0].SiteURL + ', ' + items[0].IsBlock + ', ' + items[0].Title + ', ' + items[0].SharedFileTitle + ', ' + items[0].LibraryName + ', ' + items[0].SharedType + '" id ="ShareToMe' + i + '" class="chkShareToMe"><label for="ShareToMe' + i + '">';
            }
            //check if any time file/folder shared to 'Everyone'
            if (PermissionStatus != "All revoked") {
                IsEveryone = items.filter(function (obj) { //filter the array file-wise
                    return obj.SharedGroup == "Everyone" && (obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "Deleted" && obj.PermissionStatus != "RevokePending");
                });
                var temparray = items.filter(function (obj) { //filter the array file-wise
                    return (obj.PermissionStatus != "Revoked" && obj.PermissionStatus != "Deleted" && obj.PermissionStatus != "RevokePending");
                });
                if (IsEveryone.length > 0 && IsEveryone.length == temparray.length) {
                    ActionHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')">';
                }
                else {
                    if (IsEveryone.length > 0 && IsEveryone.length != items.length) {
                        ActionHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')"><img src="../SiteAssets/MyDocuments/DMS/assets/images/globe.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + items[0].Id + '\')">';
                    }
                    else {
                        ActionHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')">';
                    }
                }
            }
            else {
                ActionHTML = '<img src="../SiteAssets/MyDocuments/DMS/assets/images/shared.png" style="width:20px; margin:0 2px;" onclick="GetSharedHistory(\'' + items[0].DocumentID + '\', \'' + items[0].DocumentURL + '\', \'' + Title + '\', \'' + DocumentNo + '\', \'' + SourceDocTitle + '\', \'' + DocumentType + '\', \'' + HistoryAction + '\', \'' + array[i].Id + '\')">';
            }
            sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
            sharedWithMeTR += '<td class="text-left">' + documentLink + '</td>';
            items[0].DOC_ID.Title = items[0].DOC_ID.Title ? items[0].DOC_ID.Title : "";
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + items[0].DOC_ID.Title + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + DocumentNo + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sourceDocType + '</div></td>';
            sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + sharedFrom + '</div></td>';
            if (PermissionStatus == "All revoked") {
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2"><img src="../SiteAssets/MyDocuments/DMS/assets/images/no_shared.png" style="width:20px; margin:0 2px;"></div></td>';
            }
            else {
                sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + PermissionStatus + '</div></td>';
            }
            sharedWithMeTR += '<td class="text-left"><div class="ShareAction">' + ActionHTML + '</div>' + ChatBoxHTML + '</td></tr>';
        }
    }
    if (SharedMeTable != '') {
        SharedMeTable.destroy();
    }
    $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
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
                IsBlock: Properties[7].trim(),
                FileName: Properties[8].trim(),
                FileTitle: Properties[9].trim(),
                LibraryName: Properties[10].trim(),
                SharedType: Properties[11].trim(),
                FileFolderName:Properties[8].trim()
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

     
    //TableSharedMePagination();
    Tableagination();
    //to add checkbox click on header sort//11 May 23
    $(".sorterHeader").click(function(e){
        addSelectAllEvent();
    });
}


//to find the Shared_From value
function getSharedFromValue(SharedType, SharedFrom) {
    if (SharedType == "Personal" || SharedType == null || SharedType == "null" || SharedType == "My-DMS") {
        if (SharedFrom == null) {
            return (SharedType = "My-DMS");
        }
        else {
            return "My-DMS" + ": " + SharedFrom;
        }
    }
    else {
        return (SharedType + ": " + SharedFrom);
    }
}

//method for pagination of Shared with me
function TableSharedMePagination() {
    SharedMeTable = $('#groupDocumentGrid').DataTable({
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
    $("#groupDocumentGrid_filter").hide();
    $('#CustomSearchText').keyup(function () {
        SharedMeTable.search($(this).val()).draw();
    });
    $('#groupDocumentGrid').on('page.dt', function () {
        $('.chkFileFolder').prop("checked", "");
        $('.chkShareToMe').prop("checked", "");
        arrFileFolder = [];
        $("#selectAllChk").prop("checked", "");
    })
}

//Get all the sub-File/Folder shared with me
//10 May 23
function GetSharedFolderDocuments(Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation,LibUrl,MataDataReq,ShareMsg) {
    var ChkCount = 1;
    var ColumnName = "";
    $("#DMSTable").empty().html('<table class="table mb-0 custom-table tablemanager" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    ColumnName += '<th class="text-center border-bottom-0 w-2 disableSort">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label><span class="TblHeader hide"></span>' +
        '</th>';
    if ($(".headdingLinks").text() == 'Shared by Me') {
        var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared From', 'Permission', ''];
    }
    else {
        var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
    }
    for (var i = 0; i < SharedMeColNames.length; i++) {
        if (SharedMeColNames[i] == '') {
            ColumnName += '<th class="disableSort" data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '<span class="TblHeader hide"></span></th>';
        }
        else {
            ColumnName += '<th><span class="TblHeader" data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</span></th>';
        }
    }
    $("#theadItem").empty().append(ColumnName);
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
                $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
            }
            else {
                for (var i = 0; i < folders.length; i++) {
                    Icon = "folder.png";
                    var SubfolderUrl = folderUrl + '/' + folders[i].Name;
                    folders[i].ListItemAllFields.Title = folders[i].ListItemAllFields.Title ? folders[i].ListItemAllFields.Title : '';
                    var RunBreadCrumb = true;
                    var BlankValueParam = '';
                    FileType = "folder";
                    
                    //documentLink = '<a href="javascript:void(0);" rel="' + Action.rel + '" onclick="GetSharedFolderDocuments(this, \'' + SubfolderUrl + '\', \'' + PermissionType + '\', \'' + SiteURL + '\', \'' + LibraryName + '\', \'' + ItemTitle + '\', \'' + ItemRef + '\', \'' + ItemDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\')" class="doc_icon">' + folders[i].Name + '</a>';
                    documentLink = '<a href="javascript:void(0);" rel="' + Action.rel + '" onclick="GetSharedFolderDocuments(this, \'' + SubfolderUrl + '\', \'' + PermissionType + '\', \'' + SiteURL + '\', \'' + LibraryName + '\', \'' + ItemTitle + '\', \'' + ItemRef + '\', \'' + ItemDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\', \'' + LibUrl+ '\', \'' + MataDataReq+ '\', \'' + ShareMsg+ '\')" class="doc_icon">' + folders[i].Name + '</a>';//10 May 23
                    
                    var IsBlockHTML = '<td class="dwnld_cell" style="text-align:center"></td>';
                    if (IsBlock == "Yes") {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '" value="' + folders[i].ListItemAllFields.Id + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + folders[i].ServerRelativeUrl + ', ' + BlankValueParam + ', ' + SiteURL + ', ' + IsBlock + ', ' + ItemTitle + ', ' + ItemTitle + ', ' + LibraryName + ', ' + LibraryType + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + ChkCount + '">';
                    }
                    else {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '" value="' + folders[i].ListItemAllFields.Id + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + folders[i].ServerRelativeUrl + ', ' + BlankValueParam + ', ' + SiteURL + ', ' + IsBlock + ', ' + ItemTitle + ', ' + ItemTitle + ', ' + LibraryName + ', ' + LibraryType + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe"><label for="ShareToMe' + ChkCount + '">';
                    }
                    ChkCount++;
                    sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                    sharedWithMeTR += '<td class="text-left">' + documentLink + '';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + folders[i].ListItemAllFields.Title + '</div></td>';
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
                    } else if (".xlsx" == FileExtension || ".xls" == FileExtension) {
                        Icon = "xlsx.png";
                    } else if (".pptx" == FileExtension || ".ppt" == FileExtension) {
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
                    }else if (".EML" == FileExtension || ".eml" == FileExtension) {
                    Icon = "eml.png";
                }
                    var NullValue = 'NullValue';
                    documentLink = '<a href="javascript:void(0);" name="' + files[i].ServerRelativeUrl + '" rel="" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + LibraryType + '\', \'' + PermissionType + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + fixedEncodeURIComponent(files[i].ServerRelativeUrl) + '\', \'' + NullValue + '\', \'' + NullValue + '\' ,\'' + LibUrl+ '\', \'' + MataDataReq+ '\', \'' + ShareMsg+ '\');">' + files[i].Name + '</a>';//10 May 23
                    downloadlink = "<a href='" + fixedEncodeURIComponent(files[i].ServerRelativeUrl,"href") + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
                    var IsBlockHTML = '<td class="dwnld_cell" style="text-align:center"></td>';
                    var BlankValueParam = '';
                    FileType = "file";
                    if (IsBlock == "Yes") {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '"  value="' + BlankValueParam + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + encodeURI(files[i].ServerRelativeUrl) + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + IsBlock + ', ' + ItemTitle + ', ' + ItemTitle + ', ' + LibraryName + ', ' + LibraryType + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + ChkCount + '">';
                    }
                    else {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '"  value="' + BlankValueParam + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + encodeURI(files[i].ServerRelativeUrl) + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + IsBlock + ', ' + ItemTitle + ', ' + ItemTitle + ', ' + LibraryName + ', ' + LibraryType + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe"><label for="ShareToMe' + ChkCount + '">';
                    }
                    ChkCount++;
                    sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                    sharedWithMeTR += '<td class="text-left">' + documentLink + '';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemTitle + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemRef + '</div></td>';
                    if (files[i].ListItemAllFields.DocumentType == null || files[i].ListItemAllFields.DocumentType == undefined || files[i].ListItemAllFields.DocumentType == "null" || files[i].ListItemAllFields.DocumentType == "--select--" || files[i].ListItemAllFields.DocumentType == "-Select-") {
                        files[i].ListItemAllFields.DocumentType = '';
                    }
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + files[i].ListItemAllFields.DocumentType + '</div></td>';
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
                if (SharedMeTable != '') {
                    SharedMeTable.destroy();
                }

                $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
                //TableSharedMePagination();
                Tableagination();
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
                            IsBlock: Properties[7].trim(),
                            FileName: Properties[8].trim(),
                            FileTitle: Properties[9].trim(),
                            LibraryName: Properties[10].trim(),
                            SharedType: Properties[11].trim(),
                            FileFolderName:Properties[8].trim()//2 march 23
                            
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
                 //to add checkbox click on header sort//11 May 23
                $(".sorterHeader").click(function(e){
                    addSelectAllEvent();
                });
                waitingDialog.hide();
                ChangeLabels();
            }
        }, eror: function (error) {
            alert(JSON.stringify(error));
            waitingDialog.hide();
        }
    });
    if (RunNavigation == true || RunNavigation == "true") {
        $("#generateBradCumbNew").empty();
        CheckLibary = LibraryName;
        //if ($(".headdingLinks").text() == 'Shared with Me' || $(".headdingLinks").text() == 'Shared by Me') {
        if ($(".headdingLinks").text() == 'Shared with Me' || $(".headdingLinks").text() == 'Shared by Me'|| $(".headdingLinks").text() == 'Archive') {

            //folderUrl = folderUrl.substr(0, folderUrl.lastIndexOf("/"));
            DMS_Type = '';
            //GetSubShareFolders(folderUrl, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, false);
            GetSubShareFolders(folderUrl, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, false,LibUrl,MataDataReq,ShareMsg);//10 May 23
            
        }
        else {
            GetSubFolders(folderUrl);
        }
    }
}
function GetSharedFolderDocuments_Old(Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation) {
    var ChkCount = 1;
    var ColumnName = "";
    $("#DMSTable").empty().html('<table class="table mb-0 custom-table tablemanager" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    ColumnName += '<th class="text-center border-bottom-0 w-2 disableSort">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label><span class="TblHeader hide"></span>' +
        '</th>';
    if ($(".headdingLinks").text() == 'Shared by Me') {
        var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared From', 'Permission', ''];
    }
    else {
        var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
    }
    for (var i = 0; i < SharedMeColNames.length; i++) {
        if (SharedMeColNames[i] == '') {
            ColumnName += '<th class="disableSort" data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '<span class="TblHeader hide"></span></th>';
        }
        else {
            ColumnName += '<th><span class="TblHeader" data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</span></th>';
        }
    }
    $("#theadItem").empty().append(ColumnName);
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
                $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
            }
            else {
                for (var i = 0; i < folders.length; i++) {
                    Icon = "folder.png";
                    var SubfolderUrl = folderUrl + '/' + folders[i].Name;
                    folders[i].ListItemAllFields.Title = folders[i].ListItemAllFields.Title ? folders[i].ListItemAllFields.Title : '';
                    var RunBreadCrumb = true;
                    var BlankValueParam = '';
                    FileType = "folder";
                    documentLink = '<a href="javascript:void(0);" rel="' + Action.rel + '" onclick="GetSharedFolderDocuments(this, \'' + SubfolderUrl + '\', \'' + PermissionType + '\', \'' + SiteURL + '\', \'' + LibraryName + '\', \'' + ItemTitle + '\', \'' + ItemRef + '\', \'' + ItemDocType + '\', \'' + sharedBy + '\', \'' + sharedFrom + '\', \'' + IsBlock + '\', \'' + LibraryType + '\', \'' + RunBreadCrumb + '\')" class="doc_icon">' + folders[i].Name + '</a>';
                    var IsBlockHTML = '<td class="dwnld_cell" style="text-align:center"></td>';
                    if (IsBlock == "Yes") {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '" value="' + folders[i].ListItemAllFields.Id + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + folders[i].ServerRelativeUrl + ', ' + BlankValueParam + ', ' + SiteURL + ', ' + IsBlock + ', ' + ItemTitle + ', ' + ItemTitle + ', ' + LibraryName + ', ' + LibraryType + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + ChkCount + '">';
                    }
                    else {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '" value="' + folders[i].ListItemAllFields.Id + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + folders[i].ServerRelativeUrl + ', ' + BlankValueParam + ', ' + SiteURL + ', ' + IsBlock + ', ' + ItemTitle + ', ' + ItemTitle + ', ' + LibraryName + ', ' + LibraryType + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe"><label for="ShareToMe' + ChkCount + '">';
                    }
                    ChkCount++;
                    sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                    sharedWithMeTR += '<td class="text-left">' + documentLink + '';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + folders[i].ListItemAllFields.Title + '</div></td>';
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
                    } else if (".xlsx" == FileExtension || ".xls" == FileExtension) {
                        Icon = "xlsx.png";
                    } else if (".pptx" == FileExtension || ".ppt" == FileExtension) {
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
                    }else if (".EML" == FileExtension || ".eml" == FileExtension) {
                    Icon = "eml.png";
                }
                    var NullValue = 'NullValue';
                    documentLink = '<a href="javascript:void(0);" name="' + files[i].ServerRelativeUrl + '" rel="" onclick="DisplayFileProperty(\'' + SiteURL + '\', \'' + LibraryType + '\', \'' + PermissionType + '\', \'' + NullValue + '\', \'' + NullValue + '\', \'' + fixedEncodeURIComponent(files[i].ServerRelativeUrl) + '\', \'' + NullValue + '\', \'' + NullValue + '\');">' + files[i].Name + '</a>';
                    downloadlink = "<a href='" + fixedEncodeURIComponent(files[i].ServerRelativeUrl,"href") + "' target='_blank' download><span class='glyphicon glyphicon-download-alt'></span></a>";
                    var IsBlockHTML = '<td class="dwnld_cell" style="text-align:center"></td>';
                    var BlankValueParam = '';
                    FileType = "file";
                    if (IsBlock == "Yes") {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '"  value="' + BlankValueParam + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + encodeURI(files[i].ServerRelativeUrl) + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + IsBlock + ', ' + ItemTitle + ', ' + ItemTitle + ', ' + LibraryName + ', ' + LibraryType + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe" disabled="disabled"><label for="ShareToMe' + ChkCount + '">';
                    }
                    else {
                        sharedWithMeTR += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" name="' + decodeURI(folderUrl) + '"  value="' + BlankValueParam + ', ' + FileType + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + encodeURI(files[i].ServerRelativeUrl) + ', ' + BlankValueParam + ', ' + BlankValueParam + ', ' + IsBlock + ', ' + ItemTitle + ', ' + ItemTitle + ', ' + LibraryName + ', ' + LibraryType + '" id ="ShareToMe' + ChkCount + '" class="chkShareToMe"><label for="ShareToMe' + ChkCount + '">';
                    }
                    ChkCount++;
                    sharedWithMeTR += '<img width="30px" src="../SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                    sharedWithMeTR += '<td class="text-left">' + documentLink + '';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemTitle + '</div></td>';
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ItemRef + '</div></td>';
                    if (files[i].ListItemAllFields.DocumentType == null || files[i].ListItemAllFields.DocumentType == undefined || files[i].ListItemAllFields.DocumentType == "null" || files[i].ListItemAllFields.DocumentType == "--select--" || files[i].ListItemAllFields.DocumentType == "-Select-") {
                        files[i].ListItemAllFields.DocumentType = '';
                    }
                    sharedWithMeTR += '<td class="text-left"><div class="dms-table-ellipsis-2">' + files[i].ListItemAllFields.DocumentType + '</div></td>';
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
                if (SharedMeTable != '') {
                    SharedMeTable.destroy();
                }

                $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
                //TableSharedMePagination();
                Tableagination();
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
                            IsBlock: Properties[7].trim(),
                            FileName: Properties[8].trim(),
                            FileTitle: Properties[9].trim(),
                            LibraryName: Properties[10].trim(),
                            SharedType: Properties[11].trim(),
                            FileFolderName:Properties[8].trim()//2 march 23
                            
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

                 //to add checkbox click on header sort//11 May 23
                $(".sorterHeader").click(function(e){
                    addSelectAllEvent();
                });
                waitingDialog.hide();
                ChangeLabels();
            }
        }, eror: function (error) {
            alert(JSON.stringify(error));
            waitingDialog.hide();
        }
    });
    if (RunNavigation == true || RunNavigation == "true") {
        $("#generateBradCumbNew").empty();
        CheckLibary = LibraryName;
        if ($(".headdingLinks").text() == 'Shared with Me' || $(".headdingLinks").text() == 'Shared by Me') {
            //folderUrl = folderUrl.substr(0, folderUrl.lastIndexOf("/"));
            DMS_Type = '';
            GetSubShareFolders(folderUrl, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, false);
        }
        else {
            GetSubFolders(folderUrl);
        }
    }
}


//get sub-folder/files for Shared Documents/folder
//10 May 23
function GetSubShareFolders(subFolderlLink, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation,LibUrl,MataDataReq,ShareMsg) {
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
   // ShareFolderNavig(surFoldersArray, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation);
      ShareFolderNavig(surFoldersArray, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation,LibUrl,MataDataReq,ShareMsg);
    
}

function shareTootFolder() {
    if ($(".headdingLinks").text() == 'Shared with Me') {
        $("#tabSharedToMe").trigger("click");
    }
    else if ($(".headdingLinks").text() == 'Archive') //10 May 23
    {
        $("#tabArchive").trigger("click");
    }else  {
        $("#tabSharedByMe").trigger("click");
    }
}

//code for Folder-Navigation for Shared Documents/folder
//10 May 23 ,LibUrl,MataDataReq,ShareMsg added
function ShareFolderNavig(surFoldersArray, Action, folderUrl, PermissionType, SiteURL, LibraryName, ItemTitle, ItemRef, ItemDocType, sharedBy, sharedFrom, IsBlock, LibraryType, RunNavigation,LibUrl,MataDataReq,ShareMsg) {
    var braCummHtml = "";
    var targetServerRaltiveUrl = "";
    $(".cont_breadcrumbs_1").show();
    if (LibraryType == "") {
        for (var index = 0; index < surFoldersArray.length; index++) {
            if (index != 0) {
                var TempfolderUrl = folderUrl.substr(0, folderUrl.lastIndexOf("/"));
               // var targetUrl = "javascript:GetSharedFolderDocuments('" + Action + "', '" + TempfolderUrl + "', '" + PermissionType + "', '" + SiteURL + "', '" + LibraryName + "', '" + ItemTitle + "', '" + ItemRef + "', '" + ItemDocType + "', '" + sharedBy + "', '" + sharedFrom + "', '" + IsBlock + "', '" + LibraryType + "', '" + RunNavigation + "')";
                var targetUrl = "javascript:GetSharedFolderDocuments('" + Action + "', '" + TempfolderUrl + "', '" + PermissionType + "', '" + SiteURL + "', '" + LibraryName + "', '" + ItemTitle + "', '" + ItemRef + "', '" + ItemDocType + "', '" + sharedBy + "', '" + sharedFrom + "', '" + IsBlock + "', '" + LibraryType + "', '" + RunNavigation + "','" +LibUrl+ "','" +MataDataReq+ "','" +ShareMsg+ "')";//10 May 23
                if (index == 1) {
                    braCummHtml += '<li title="Root" class="mybradcumb first"><a href="javascript:void(0);" onclick="shareTootFolder();">Root</a></li>';
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
                }
            }
        }
    } else {
        var IsClick = false;
        for (var index = 0; index < surFoldersArray.length; index++) {
            //if (index != 0)
            {
                if (surFoldersArray[index].folderName == ItemTitle) {
                    IsClick = true;
                }
                var TempfolderUrl = folderUrl.substr(0, folderUrl.lastIndexOf("/"));
               // var targetUrl = "javascript:GetSharedFolderDocuments('" + Action + "', '" + TempfolderUrl + "', '" + PermissionType + "', '" + SiteURL + "', '" + LibraryName + "', '" + ItemTitle + "', '" + ItemRef + "', '" + ItemDocType + "', '" + sharedBy + "', '" + sharedFrom + "', '" + IsBlock + "', '" + LibraryType + "', '" + RunNavigation + "')";
                var targetUrl = "javascript:GetSharedFolderDocuments('" + Action + "', '" + TempfolderUrl + "', '" + PermissionType + "', '" + SiteURL + "', '" + LibraryName + "', '" + ItemTitle + "', '" + ItemRef + "', '" + ItemDocType + "', '" + sharedBy + "', '" + sharedFrom + "', '" + IsBlock + "', '" + LibraryType + "', '" + RunNavigation + "','" +LibUrl+ "','" +MataDataReq+ "','" +ShareMsg+ "')";//10 May 23
                
                if (index == 0) {
                    braCummHtml += '<li title="Root" class="mybradcumb first"><a href="javascript:void(0);" onclick="shareTootFolder();">Root</a></li>';
                } else {
                    var subfolderLengthCheck = surFoldersArray[index].folderName;
                    if (subfolderLengthCheck.length > 15) {
                        subfolderLengthCheck = subfolderLengthCheck.substring(0, 14) + "...";
                    }

                    if (subfolderLengthCheck.length > 0) {
                        if (IsClick == false) {
                            braCummHtml += '';
                        }
                        else {
                            braCummHtml += '<li title="' + surFoldersArray[index].folderName + '" class="mybradcumb first"><a href="' + targetUrl + '">' + subfolderLengthCheck + '</a></li>';
                        }
                    }
                }
                if (index == surFoldersArray.length - 1) {
                    targetServerRaltiveUrl = surFoldersArray[index].folderUrl;
                }
            }
        }
    }

    var bradCumDiv = $("#generateBradCumbNew");
    bradCumDiv.html("");
    bradCumDiv.append(braCummHtml);
    $(".mybradcumb ").unbind().click(function () {
        $(this).nextAll().remove(".mybradcumb ");
        //Create Cookies for Target Folder
    });
}


//get the SP group-names in which logged-In user belongs to
function GetSPGroup() {
    var arrSPGroup = [];
    var endpointUrl = _spPageContextInfo.webServerRelativeUrl + '/_api/web/currentuser/?$expand=groups';
    $.ajax({
        url: endpointUrl,
        method: "GET",
        async: false,
        contentType: "application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data) {
            var arrAllGp = [];
            arrAllGp = data.d.Groups.results;
            if (arrAllGp.length > 0) {
                arrSPGroup = arrAllGp.filter(function (obj) {
                    return obj.OwnerTitle !== "System Account" && obj.Title !== "Contributors" && obj.Title !== "Owners" && obj.Title !== "SPMember" && obj.Title !== "TFW_Employees";
                });
            }
        }, eror: function (error) {
            alert(JSON.stringify(error));
            waitingDialog.hide();
        }
    });
    return arrSPGroup;
}

//Get all the Documents which are shared with me --Filter
function GetDocumentsSharedFilter(SectionName) {
    //Geenrating the THead of table
    arrFileFolder = [];
    var LoggedUserSPGp = [];
    var ColumnName = "";
    $("#DMSTable").empty().html('<table class="table mb-0 custom-table tablemanager" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    ColumnName += '<th class="text-center border-bottom-0 w-2 disableSort">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChk" value=""></label><span class="TblHeader hide"></span>' +
        '</th>';
    if (SectionName == 'SharedByMe') {
        var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared From', 'Permission', ''];
    }
    else {
        var SharedMeColNames = ['Name', 'Title', 'Reference', 'Category', 'Shared By', 'Shared From', 'Permission', ''];
    }
    for (var i = 0; i < SharedMeColNames.length; i++) {
        if (SharedMeColNames[i] == '') {
            ColumnName += '<th class="disableSort"  data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '<span class="TblHeader hide"></span></th>';
        }
        else {
            ColumnName += '<th><span class="TblHeader"  data-localize="' + SharedMeColNames[i] + '">' + SharedMeColNames[i] + '</span></th>';
        }
    }
    $("#theadItem").empty().append(ColumnName);
    LoggedUserSPGp = GetSPGroup();

    var assigntoQuery = '';
    if (SectionName == 'SharedByMe') {
        items = arrSharedBy.filter(function (f) { return f; });
    }
    else {
        items = arrSharedTo.filter(function (f) { return f; });
    }
    var FilterShareById = getUserInformation("pplSharedBy");
    var StringShareQuery = [];
    var DropdownSharingValue = $("#ddlShare").val();
    if ($("#ddlShare").val() == "Shared") {
        DropdownSharingValue = null;
    }
    var NeedAck = '';
    if ($("#ddlAckFilter").val() == "Required" || $("#ddlAckFilter").val() == "Acknowledged" || $("#ddlAckFilter").val() == "Pending") {
        NeedAck = true;
    }
    else if ($("#ddlAckFilter").val() == "All") {
        NeedAck = "All";
    }
    else {
        NeedAck = false;
    }
    if (SectionName == 'SharedByMe') {
        items = items.filter(function (obj, index) {
            if ($("#pplSharedBy_TopSpan_ResolvedList").text() != "") {
                for (var i = 0; i < FilterShareById.length; i++) {
                    if (i == 0) {
                        StringShareQuery.push(obj.SharedUsers.results[0].ID == FilterShareById[i]);
                    }
                    else {
                        StringShareQuery.push(obj.SharedUsers.results[0].ID == FilterShareById[i]);
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

            if (obj.DocumentNo == null || obj.DocumentNo == '') {
                obj.DocumentNo = "null";
            }
            var tempAck = obj.NeedAcknowledgement;
            if ($("#ddlAckFilter").val() == "All") {
                tempAck = true;
            }
            StringShareQuery = [];
            return ($("#FilterShareType").val() == "All" ? obj.PermissionType != "" : obj.PermissionType == $("#FilterShareType").val()) &&
                    (assigntoQuery) &&
                    ($("#ShareFilterRef").val().trim() == "null" ? obj.DocumentNo != "null" : (obj.DocumentNo.toLowerCase() == $("#ShareFilterRef").val().toLowerCase() || obj.DocumentNo.toLowerCase().indexOf($("#ShareFilterRef").val().toLowerCase()) != -1))
            		&& ($("#FilterShareDocType").val() == "All" ? obj.DocType != "" : obj.DocType == $("#FilterShareDocType").val())
            		&& (DropdownSharingValue == "All" ? obj.PermissionStatus != "" : obj.PermissionStatus == DropdownSharingValue)
            		&& (NeedAck == "All" ? tempAck != "" : tempAck == NeedAck);

        });
    }
    else {
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
            var tempAck = obj.NeedAcknowledgement;
            if ($("#ddlAckFilter").val() == "All") {
                tempAck = true;
            }
            return ($("#FilterShareType").val() == "All" ? obj.PermissionType != "" : obj.PermissionType == $("#FilterShareType").val()) &&
                    (assigntoQuery) &&
                    ($("#ShareFilterRef").val().trim() == "null" ? obj.DocumentNo != "null" : (obj.DocumentNo.toLowerCase() == $("#ShareFilterRef").val().toLowerCase() || obj.DocumentNo.toLowerCase().indexOf($("#ShareFilterRef").val().toLowerCase()) != -1))
            		&& ($("#FilterShareDocType").val() == "All" ? obj.DocType != "" : obj.DocType == $("#FilterShareDocType").val())
                    && (DropdownSharingValue == "All" ? obj.PermissionStatus != "" : obj.PermissionStatus == DropdownSharingValue)
                    && (NeedAck == "All" ? tempAck != "" : tempAck == NeedAck);
        });
    }
    var sharedWithMeTR = "";
    if (items.length > 0) {
        if (SectionName == 'SharedByMe') {
            SharedByMeItems(items);
        }
        else {
            SharedWithMeItems(items, 'SharedWithMe');
        }

        waitingDialog.hide();
    }
    else {
        waitingDialog.hide();
        sharedWithMeTR += '<tr><td colspan="12" style="text-align:center;">No file or folder found.</td></tr>';
        $("#groupDocumentGridtbody").empty().append(sharedWithMeTR);
    }
    ChangeLabels();
    $("#shared-documents-filter").modal('hide');
    
}

//Shared with Me and Shared By Me code ends ---------------------------

//bind all the defined Steps 
function BindAllDefinedSteps(StepName) {
    if ($('#accordionapprovers .StepClass').length > 0) {
        $("#ddlAllDefinedSteps").append('<option value="Initiation">Initiation</option>');
        $('#accordionapprovers .StepClass').each(function (i) {
            currentStepCount = this.classList[2].replace("NewStep", "");
            StepName = $("#StepName" + currentStepCount).text();
            $("#ddlAllDefinedSteps").append('<option value="' + StepName + '">' + StepName + '</option>');
        });
    }
    else {
        $("#ddlAllDefinedSteps").empty();
        $("#ddlAllDefinedSteps").append('<option value="Initiation">Initiation</option>');
        $("#ddlAllDefinedSteps").append('<option value="' + $("#StartedStepName").text() + '">' + $("#StartedStepName").text() + '</option>');
        $("#ddlAllDefinedSteps").append('<option value="' + StepName + '">' + StepName + '</option>');
    }
}


//to add Shared files in favorites
function AddFavShareFiles() {
    arrFileFolder.forEach(function (entry, index) {
       // if ((entry.type == 'file'||entry.type == 'File') && IsFileFavorite(entry.FileFolderName, entry.DocumentId) == false) {
            if ((entry.type == 'file'||entry.type == 'File') && IsFileFavorite(entry.FileName, entry.DocumentId) == false) {
            var Metadata;
            if (entry.FileTitle = "null") { entry.FileTitle = ''; }
            Metadata = {
                __metadata: { 'type': 'SP.Data.MyFavoritesListItem' },
                'Title': entry.FileName,
                'Name': entry.FileName,
                'FileName': entry.FileName,
                'Category': 'Document',
                'Link': '',
                'UserId': _spPageContextInfo.userId,
                'SiteLink': entry.SiteURL,
                'DMSName': entry.LibraryName,
                'DocumentID': parseInt(entry.DocumentId),
                'DocumentLink': window.location.protocol + "//" + window.location.host + entry.ServerURL,
                'LibraryName': entry.SharedType,
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
                    if (arrFileFolder.length == (index + 1)) {
                        alert("File(s) have been added to favorite.");
                        arrFileFolder = [];
                        $("#liFavoriteDocuments").show();
                        $(".chkShareToMe").prop("checked", "");
                    }
                },
                error: function (error) {
                    console.log(JSON.stringify(error));
                    dfd.reject(error);
                }
            });
            return dfd.promise();
        }
        else {
            if (arrFileFolder.length == (index + 1)) {
                alert("All files have been added to favorite.");
                arrFileFolder = [];
                //$("#liFavoriteDocuments").hide();
                $("#liFavoriteDocuments").show();
                $(".chkShareToMe").prop("checked", "");
            }
        }
    });
}
//Bhawana 
//Method for sharing multiple file and Folder
function shareFileMulti() {
    var arrRevokeIds = [];
    var SharingRespose = true;
    var IsContinueEvery1Share = true;
    //Bhawana 
    //Check for Sharing Rule
    if(currentSectionType=='Group Documents'||currentSectionType=="Department"||currentSectionType=='Project Documents')
    {
        if(!checkForSharingRule())
        {
            alert("As per sharing rule definition ,You are not authorized person for sharing.");
            return false;
        }
    }
    if ($('#sharewith').val() == 'Everyone') {
        if (CheckForEveryone() == false) {
            alert("You are not authorized to share file/folder to everyone.");
            return false;
        }
        var arrTempFolder = [];
        arrTempFolder = arrFileFolder.filter(function (obj) {
            return obj.type.toLowerCase() == "folder";
        });
        if (arrTempFolder.length > 0) {
            alert("Kindly remove folder while selecting Everyone.");
            return false;
        }
    }
    


    var sharefileuser = [];
    sharedUsersIdArrayListItemCollection = [];
    sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
    var txtDocshareingTypePermissionLevel = $('#sharewith').val();
    var txttsharedWithPermission = $('#sharedWithPermission').val();
    var txtSharedDocumetnOnDemandId = '';
    var serverRelativeFileUrl = '';
    emailLink='';
    if (sharedUsersIdArrayListItemCollection.length == 0) {
        for (var groupId = 0; groupId < SharingUserEmail.length; groupId++) {
            SharingUserId.push(parseInt(SharingUserEmail[groupId].GroupId));
        }
        sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
    }
    if (txtDocshareingTypePermissionLevel == 'Everyone') {
        SharingUserId = getTargetGroupId();
        sharedUsersIdArrayListItemCollection = SharingUserId.filter(function (f) { return f; })
        for (var groupId = 0; groupId < SharingUserId.length; groupId++) {
            SharingUserEmail.push({
                ClientId: "",
                ClientName: "",
                GroupId: SharingUserId[groupId].toString(),
                GroupTitle: ""
            });
        }
    }
    FailDueToCheckOut = 0;
     //if (Documentname[Documentname.length - 1] == '/') {//Bhawana 3 JAn 23
    if (decodeURIComponent(Documentname)[Documentname.length - 1] == '/') {
        var folderName = Documentname;
    }
    else {
        var folderName = decodeURIComponent(Documentname) + '/';
    }
    $("#LibProject").text($(".headdingLinks").text());
    arrFileFolder.forEach(function (entry, index) {
        if (entry.type.toLowerCase() == 'file' || entry.type.toLowerCase() == "folder") {
            if (IsFileCheckout(folderName, entry.FileFolderName, entry.SiteURL, '') != true && entry.type == 'file') {
                SharingRespose = true;
                txtSharedDocumetnOnDemandId = DocumentId = entry.DocumentId;
                CopySourceURL = entry.SiteURL;
                CopyLibrary = entry.SelectedLibrary;
                $("#FilePath").text(entry.ServerURL);
                $("#FileTitle").text(entry.FileTitle);//File/Folder Title
                $("#FileName").text(entry.FileFolderName);
                //If PDF
                var tempAction = entry.ServerURL;
                if (entry.FileFolderName.includes(".pdf") == true) {//to check if it's PDF
                    if (entry.ServerURL.search(/\bShared%20Documents\b/) >= 0) {
                        tempAction = entry.ServerURL.replace('Shared%20Documents', "Shared Documents");
                    }
                    $(".txtCopyLink").val(DMS_Link + "?id=" + encodeURIComponent(tempAction) + "&parent=" + entry.ServerURL.substr(0, tempAction.lastIndexOf("/")) + "&p=true");
                }
                else {
                    //If any other file than PDF
                    if (entry.ServerURL.includes("DocumentManagementSystem") == true || entry.ServerURL.includes("DepartmentalDMS") == true) {
                        if (entry.ServerURL.includes("DocumentManagementSystem") == true) {
                            $(".txtCopyLink").val(entry.SiteURL + "/DocumentManagementSystem/Forms/AllItems.aspx?id=" + encodeURIComponent(entry.ServerURL) + "&parent=" + encodeURIComponent(entry.ServerURL.substr(0, entry.ServerURL.lastIndexOf("/") + 0)));
                        } else {
                            $(".txtCopyLink").val(entry.SiteURL + "/DepartmentalDMS/Forms/AllItems.aspx?id=" + encodeURIComponent(entry.ServerURL) + "&parent=" + encodeURIComponent(entry.ServerURL.substr(0, entry.ServerURL.lastIndexOf("/") + 0)));
                        }
                    }
                    else {
                        var HostName = window.location.origin + entry.ServerURL.substr(0, entry.ServerURL.lastIndexOf("/") + 0);
                        if (entry.ServerURL.search(/\bShared%20Documents\b/) >= 0) {
                            tempAction = entry.ServerURL.replace('Shared%20Documents', "Shared Documents");
                        }
                        $(".txtCopyLink").val(HostName + "/Forms/AllItems.aspx?id=" + encodeURIComponent(tempAction) + "&parent=" + encodeURIComponent(tempAction.substr(0, entry.ServerURL.lastIndexOf("/") + 0)));
                    }
                }
                /*if(entry.CopyFileLink.includes('/Documents/') == true) {
                	entry.CopyFileLink = entry.CopyFileLink.replace('/Documents/', '/Shared%20Documents/');
                }
                $(".txtCopyLink").val(entry.CopyFileLink);*/
                serverRelativeFileUrl = SelectedFileServerURL = entry.ServerURL;
                sharefileuser = getSharedUsersId(txtSharedDocumetnOnDemandId); //get Id of already shared users
                //return false;
                arrRevokeIds = $.grep(sharefileuser, function (element) {
                    return $.inArray(element, sharedUsersIdArrayListItemCollection) !== -1;
                });

                sharedUsersIdArrayListItemCollection = sharedUsersIdArrayListItemCollection.concat(sharefileuser);
                if (txtDocshareingTypePermissionLevel == 'Organization') {
                    SharingRespose = getTargetRoleDefinitionId(entry.type);
                }
                else if (txtDocshareingTypePermissionLevel == 'Everyone') {
                    SharingRespose = getTargetRoleDefinitionId(entry.type);
                }
                else {
                    SharingRespose = ShareFilesFolder(serverRelativeFileUrl, "File", '', txtDocshareingTypePermissionLevel);
                }
                if (SharingRespose != false) {
                    SharingRespose = true;
                }
                if (sharedUsersIdArrayListItemCollection.length > 0 && SharingRespose == true) {
                    var securityLeveltext = $('#sharewith').val();//Update Document Properties
                    if (PermissionStatus == "") {
                        updateDocumentPropertiesOnItemSharing(txtSharedDocumetnOnDemandId, serverRelativeFileUrl, txtDocshareingTypePermissionLevel, sharedUsersIdArrayListItemCollection, CopySourceURL, false);
                    }
                    else if (txtDocshareingTypePermissionLevel == "Everyone" && PermissionStatus == "Pending") {
                        ApprovalRequired();
                    }
                    GetDocumentsRevoke(arrRevokeIds, txtSharedDocumetnOnDemandId);
                    var Shared = [];
                    Shared = getSharedType();
                    if (txtDocshareingTypePermissionLevel == "Organization") {
                        AddSharedLinkToListOrg(serverRelativeFileUrl, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1], entry.SubCategory,entry.FileRef);
                    }
                    else {
                        AddSharedLinkToList(serverRelativeFileUrl, SharingUserId, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1], entry.SubCategory,entry.FileRef);
                    }
                    //mail send
                    //CommentSTART  as email trigger from flow
                    /*if ($('#notifymail').prop('checked') == true && PermissionStatus == "")    //If SendMail Checkbox check for file
                    {
                        var ToUserArray = [];
                        var Permission = $("#sharedWithPermission :selected").text();
                        if (SharingUserEmail.length > 0) {
                            var EmailDesign = '';
                            ValidityDateHTML = '';
                            if ($("#expiredats").val() != "") {
                                ValidityDateHTML = "<div><strong>Sharing valid till:</strong> " + moment($('#expiredats').val()).format('MMMM DD, YYYY') + "</div>";
                            }
                            EmailDesign = _spPageContextInfo.userDisplayName + " has shared the following document with you.<br/><br/>";
                            //for (i = 0; i < SharingUserEmail.length; i++) {
                            
                            EmailDesign = EmailDesign + "<div><strong>File Name</strong><strong>:</strong> " + $("#FileName").text() + "</div>" +
                                                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + entry.FileTitle + "</div>" +
                                                        "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + entry.FileType + "</div>" +
                                                        "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + entry.FileRef + "</div>" +
                                                     "<div><strong>Permission:</strong> " + Permission + "</div>" +
                                                     "<div><strong>Shared By:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                                     "<div><strong>Shared On:</strong> " + moment(new Date()).format('MMMM DD, YYYY') + " " + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") + "</div>" +
                                                     ValidityDateHTML +
                                                     "</br><div><strong>Message:</strong> " + $("#txtShareMessage").val() + "</div></br></br></br>" +
                                                    "<div><a href=" + emailLink + ">Click here</a> to open the document.</div>" + "<br/><br/>";//Bhawana
                                                    //"<div><a href=" + $(".txtCopyLink").val() + ">Click here</a> to open the document.</div>" + "<br/><br/>";
                            //}

                            EmailDesign += "This is an auto generated email. Please don't reply.";
                            for (var k = 0; k < LabelDefaultLangauge.length; k++) {
                                if (EmailDesign.includes(LabelDefaultLangauge[k].Key) == true) {
                                    EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
                                }
                            }

                        }
                        var Metadata;
                        if ($('#sharewith').val() == "Organization") {
                            SharingUserEmail.forEach(function (entry, index) {
                                ToUserArray.push(entry.GroupTitle);
                            });
                        }
                        else if ($('#sharewith').val() == "Everyone") {
                            ToUserArray = getCompanyEmailId();
                        }
                        else {
                            ToUserArray = SharingUserEmail.filter(function (f) { return f; })
                        }
                        Metadata = {
                            'properties': {
                                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                                'From': _spPageContextInfo.userEmail,
                                'To': { 'results': ToUserArray },
                                //'CC': { 'results': ccUsers },
                                'Body': EmailDesign,
                                'Subject': 'A document has been shared with you.'
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
                                if ((index + 1) == arrFileFolder.length) {
                                    var tempDocName = Documentname;
                                    if(Documentname.includes('/Documents/') == true) {
					                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
					                } 
					                else if(Documentname == 'Documents') {
					                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
					                }
                                    GetMyDocumentsWithFilesFolder(tempDocName);
                                    if (FailDueToCheckOut == 0) {
                                        alert("File / Folder has been shared.");
                                    }
                                    else {
                                        alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                                    }
                                    $("#FileSharing").text("Shared with " + $('#sharewith').val());
                                    $(".txtSharingHistoy").show();
                                    $(".btnClosePopup").trigger("click");
                                    arrFileFolder = [];
                                    FailDueToCheckOut = 0;
                                    $(".chkFileFolder").prop("checked", false);
                                }
                            },
                            error: function (err) {
                                waitingDialog.hide();
                                alert("SendEmailSharedNotification  " + JSON.stringify(err));
                            }
                        });
                    }
                    else *///CommentEnd  as email trigger from flow
                    {
                        if ((index + 1) == arrFileFolder.length) {
                            var tempDocName = Documentname;
                            if(Documentname.includes('/Documents/') == true) {
			                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
			                } 
			                else if(Documentname == 'Documents') {
			                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
			                }
                            GetMyDocumentsWithFilesFolder(tempDocName);
                            if (FailDueToCheckOut == 0) {
                                alert("File / Folder has been shared.");
                            }
                            else {
                                alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                            }

                            $("#FileSharing").text("Shared with " + $('#sharewith').val());
                            $(".txtSharingHistoy").show();
                            $(".btnClosePopup").trigger("click");
                            arrFileFolder = [];
                            FailDueToCheckOut = 0;
                            $(".chkFileFolder").prop("checked", false);
                        }
                    }
                }
            }
            else {
                if (entry.type == 'folder') {
                    SharingRespose = true;
                    txtSharedDocumetnOnDemandId = DocumentId = entry.DocumentId;
                    CopySourceURL = entry.SiteURL;
                    CopyLibrary = entry.SelectedLibrary;
                    $("#FilePath").text(entry.ServerURL);
                    $("#FileTitle").text(entry.FileTitle);//File/Folder Title
                    $("#FileName").text(entry.FileFolderName);
                    if (entry.CopyFileLink.includes('/Documents/') == true) {
                        entry.CopyFileLink = entry.CopyFileLink.replace('/Documents/', '/Shared%20Documents/');
                    }
                    $(".txtCopyLink").val(entry.CopyFileLink);
                    serverRelativeFileUrl = SelectedFileServerURL = entry.ServerURL;
                    sharefileuser = getSharedUsersId(txtSharedDocumetnOnDemandId); //get Id of already shared users
                    //return false;
                    arrRevokeIds = $.grep(sharefileuser, function (element) {
                        return $.inArray(element, sharedUsersIdArrayListItemCollection) !== -1;
                    });

                    sharedUsersIdArrayListItemCollection = sharedUsersIdArrayListItemCollection.concat(sharefileuser);
                    if (txtDocshareingTypePermissionLevel == 'Organization') {
                        SharingRespose = getTargetRoleDefinitionId(entry.type);
                    }
                    else if (txtDocshareingTypePermissionLevel == 'Everyone') {
                        SharingRespose = getTargetRoleDefinitionId(entry.type);
                    }
                    else {
                        SharingRespose = ShareFilesFolder(serverRelativeFileUrl, "File", '', txtDocshareingTypePermissionLevel);
                    }
                    if (SharingRespose != false) {
                        SharingRespose = true;
                    }
                    if (sharedUsersIdArrayListItemCollection.length > 0 && SharingRespose == true) {
                        var securityLeveltext = $('#sharewith').val();//Update Document Properties
                        if (PermissionStatus == "") {
                            updateDocumentPropertiesOnItemSharing(txtSharedDocumetnOnDemandId, serverRelativeFileUrl, txtDocshareingTypePermissionLevel, sharedUsersIdArrayListItemCollection, CopySourceURL, false);
                        }
                        else if (txtDocshareingTypePermissionLevel == "Everyone" && PermissionStatus == "Pending") {
                            ApprovalRequired();
                        }
                        GetDocumentsRevoke(arrRevokeIds, txtSharedDocumetnOnDemandId);
                        var Shared = [];
                        Shared = getSharedType();
                        if (txtDocshareingTypePermissionLevel == "Organization") {
                            AddSharedLinkToListOrg(serverRelativeFileUrl, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1], entry.SubCategory,entry.FileRef);
                        }
                        else {
                            AddSharedLinkToList(serverRelativeFileUrl, SharingUserId, txtSharedDocumetnOnDemandId, entry.type, $('#sharewith').val(), $('#sharedWithPermission').val(), Shared[0], entry.DocType, Shared[1], entry.SubCategory,entry.FileRef);
                        }

                        //mail send
                        //CommentSTART  as email trigger from flow
                        /*if ($('#notifymail').prop('checked') == true && PermissionStatus == "")    //If SendMail Checkbox check for file
                        {
                            var ToUserArray = [];
                            var Permission = $("#sharedWithPermission :selected").text();
                            if (SharingUserEmail.length > 0) {
                                var EmailDesign = '';
                                ValidityDateHTML = '';
                                if ($("#expiredats").val() != "") {
                                    ValidityDateHTML = "<div><strong>Sharing valid till:</strong> " + moment($('#expiredats').val()).format('MMMM DD, YYYY') + "</div>";
                                }
                                EmailDesign = _spPageContextInfo.userDisplayName + " has shared the following document with you.<br/><br/>";
                                //for (i = 0; i < SharingUserEmail.length; i++) {
                                EmailDesign = EmailDesign + "<div><strong>File Name:</strong> " + $("#FileName").text() + "</div>" +
                                                        "<div data-localize='Title'><strong>Title</strong><strong>:</strong> " + entry.FileTitle + "</div>" +
                                                         "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + entry.FileType + "</div>" +
                                                        "<div data-localize='Reference'><strong>Reference</strong><strong>:</strong> " + entry.FileRef + "</div>" +
                                                         "<div><strong>Permission:</strong> " + Permission + "</div>" +
                                                         "<div><strong>Shared By:</strong> " + _spPageContextInfo.userDisplayName + "</div>" +
                                                         "<div><strong>Shared On:</strong> " + moment(new Date()).format('MMMM DD, YYYY') + " " + new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3") + "</div>" +
                                                         ValidityDateHTML +
                                                         "</br><div><strong>Message:</strong> " + $("#txtShareMessage").val() + "</div></br></br></br>" +
                                                        "<div><a href=" + $(".txtCopyLink").val() + ">Click here</a> to open the document.</div>" + "<br/><br/>";
                                //}

                                EmailDesign += "This is an auto generated email. Please don't reply.";
                                for (var k = 0; k < LabelDefaultLangauge.length; k++) {
                                    if (EmailDesign.includes(LabelDefaultLangauge[k].Key) == true) {
                                        EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
                                    }
                                }
                            }
                            var Metadata;
                            if ($('#sharewith').val() == "Organization") {
                                SharingUserEmail.forEach(function (entry, index) {
                                    ToUserArray.push(entry.GroupTitle);
                                });
                            }
                            else if ($('#sharewith').val() == "Everyone") {
                                ToUserArray = getCompanyEmailId();
                            }
                            else {
                                ToUserArray = SharingUserEmail.filter(function (f) { return f; })
                            }
                            Metadata = {
                                'properties': {
                                    '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                                    'From': _spPageContextInfo.userEmail,
                                    'To': { 'results': ToUserArray },
                                    //'CC': { 'results': ccUsers },
                                    'Body': EmailDesign,
                                    'Subject': 'A document has been shared with you.'
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
                                    if ((index + 1) == arrFileFolder.length) {
                                        var tempDocName = Documentname;
                                        if (Documentname.includes('/Documents/') == true) {
                                            tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                                        }
                                        else if (Documentname == 'Documents') {
                                            tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                                        }
                                        GetMyDocumentsWithFilesFolder(tempDocName);
                                        if (FailDueToCheckOut == 0) {
                                            alert("File / Folder has been shared.");
                                        }
                                        else {
                                            alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                                        }
                                        $("#FileSharing").text("Shared with " + $('#sharewith').val());
                                        $(".txtSharingHistoy").show();
                                        $(".btnClosePopup").trigger("click");
                                        arrFileFolder = [];
                                        FailDueToCheckOut = 0;
                                        $(".chkFileFolder").prop("checked", false);
                                    }
                                },
                                error: function (err) {
                                    waitingDialog.hide();
                                    alert("SendEmailSharedNotification  " + JSON.stringify(err));
                                }
                            });
                        }
                        else*///CommentEnd  as email trigger from flow
                         {
                            if ((index + 1) == arrFileFolder.length) {
                                var tempDocName = Documentname;
                                if (Documentname.includes('/Documents/') == true) {
                                    tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                                }
                                else if (Documentname == 'Documents') {
                                    tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                                }
                                GetMyDocumentsWithFilesFolder(tempDocName);
                                if (FailDueToCheckOut == 0) {
                                    alert("File / Folder has been shared.");
                                }
                                else {
                                    alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                                }

                                $("#FileSharing").text("Shared with " + $('#sharewith').val());
                                $(".txtSharingHistoy").show();
                                $(".btnClosePopup").trigger("click");
                                arrFileFolder = [];
                                FailDueToCheckOut = 0;
                                $(".chkFileFolder").prop("checked", false);
                            }
                        }
                    }
                }
                else {
                    FailDueToCheckOut++;
                    if (FailDueToCheckOut == arrFileFolder.length) {
                        waitingDialog.hide();
                        FailDueToCheckOut = 0;
                        alert("Selected file(s) are locked, couldn't be shared.");
                        $("#FileSharing").text("Shared with " + $('#sharewith').val());
                        $(".txtSharingHistoy").show();
                        $(".btnClosePopup").trigger("click");
                        arrFileFolder = [];
                        $(".chkFileFolder").prop("checked", false);
                    }
                    else {
                        if (arrFileFolder.length == (index + 1)) {
                            var tempDocName = Documentname;
                            if (Documentname.includes('/Documents/') == true) {
                                tempDocName = tempDocName.replace("/Documents/", "/Shared%20Documents/");
                            }
                            else if (Documentname == 'Documents') {
                                tempDocName = tempDocName.replace("Documents", "Shared%20Documents");
                            }
                            GetMyDocumentsWithFilesFolder(tempDocName);
                            if (FailDueToCheckOut == 0) {
                                alert("File / Folder has been shared.");
                            }
                            else {
                                alert(FailDueToCheckOut + " file(s) are locked, couldn't be shared.\nOther files(s) have been shared successfully.");
                            }
                            waitingDialog.hide();
                            FailDueToCheckOut = 0;
                            $("#FileSharing").text("Shared with " + $('#sharewith').val());
                            $(".txtSharingHistoy").show();
                            $(".btnClosePopup").trigger("click");
                            arrFileFolder = [];
                            $(".chkFileFolder").prop("checked", false);
                        }
                    }
                }
            }
        }
    });
}

// add Shared file metadata in 'SharedDocument' list
function AddSharedLinkToList(documentURL, sharedUsersId, documentId, documentType, sharedGroup, permissionType, Shared_Type, DocType, SharedFrom, SubDocType,DocRefNo) {
    IsBlock = "No";
    var ListName = "SharedDocument";
    var ItemType = GetItemTypeForListName(ListName);
    var SelectedLibrary = '';
    if (decodeURIComponent(Documentname).indexOf('/') != -1) {
        SelectedLibrary = decodeURIComponent(Documentname).split('/')[0];
    }
    else {
        SelectedLibrary = decodeURIComponent(Documentname);
    }
    
    for (k = 0; k < sharedUsersId.length; k++) {
        var shareduserid = [];
        shareduserid.push(sharedUsersId[k]);
        var Metadata;
        //for block download coding
        if (permissionType == "Restricted View") {
            IsBlock = "Yes";
        }
        var ValidityDate = null;
        if ($("#expiredats").val() != "") {
            ValidityDate = GetDateStandardFormat(moment($('#expiredats').val()).format('DD/MM/YYYY'));
        }
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Title: $("#FileName").text(),//File/Folder name
            SharedFileTitle: $("#FileTitle").text(),//File/Folder Title
            DocumentURL: documentURL,//File/Folder url
            SharedUsersId: { 'results': shareduserid },//Shared users
            SharedUserEmail: ShareUserPrincipleMail[k],
            DocumentID: documentId,//Shared file/folder id
            DOC_IDId: documentId,  //Shared file/folder id Lookupvalue
            DocumentType: documentType,// File/Folder
            SharedGroup: sharedGroup,//shared goupname or any label
            PermissionType: permissionType,//1 for readonly 2 for editor,
            ServerRedirectedEmbedURL: '',
            DocumentNo:(DocRefNo!=undefined||DocRefNo!=null)?DocRefNo:"",
            //DocumentNo: sharingLinkDocumentNo,
            //Details: globalsharingDocumentDetails,
            IsBlock: IsBlock,
            SharedType: Shared_Type,
            SharedFrom: SharedFrom,
            SharedMessage: $("#txtShareMessage").val(),
            SharingValidity: ValidityDate,
            NeedAcknowledgement: $("#Acknowledgment").prop("checked"),
            LibraryURL: DMS_Link.split('/Forms')[0],
            LibraryName: SelectedLibrary,
            SiteURL: DMS_Link.split('/Forms')[0].substr(0, DMS_Link.split('/Forms')[0].lastIndexOf("/")),
            DocType: DocType,
            IsSendMail: $("#notifymail").prop('checked'),
            Corporate: $("#chkCorporate").prop('checked'),
            CompanyIDId: parseInt(Logged_CompanyId),
            DepartmentIDId: parseInt(SeletedDeptId),
            SubCategory: SubDocType,
            MetaDataRestricted:$("#chkMetaDataReq").prop('checked')
        };
        if (PermissionStatus == "Pending") {
            Metadata["PermissionStatus"] = "Pending";
        }
        if ($("#sharewith").val() == "Everyone") {
            delete Metadata["SharedUserEmail"];
        }
        else {
            delete Metadata["CompanyIDId"];
            delete Metadata["DepartmentIDId"];
        }
        //Bhawana 4 jan 23
            if($("#chkMetaDataReq").prop('checked')== true)
            {
                delete Metadata["SharingValidity"];
                delete Metadata["SubCategory"];
                delete Metadata["DocumentNo"];
            }
        //Bhawana
        if(currentSectionType=='Group Documents'||currentSectionType=="Department"||currentSectionType=='Project Documents')
        {
            if(arrSharingRule!=null&&arrSharingRule!='undefined'&&arrSharingRule!=undefined && arrSharingRule.length>0)
            {
                var arrSRapproversId=[];arrSharingRuleApproversId=[];
                if(arrSharingRule[0].ApproveBy=='HOD'&& arrSharingRule[0].ApprovalRequired)
                {
                    if(currentSectionType=="Department")
                    {
                        var Query = "?$select=*,ID,WebPartName,Department/Id,Contributors/Id&$top=5000&$expand=Department,Contributors&$filter=WebPartName eq 'Head of the department' and Department/Id eq '" + SeletedDeptId + "' and CompanyId eq '" + Logged_CompanyId + "'";
                        $.when(getItemsWithQuery("ProcessApprovers", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                            if (valuesArray.length > 0) {
                                if (valuesArray[0].Contributors.results != null) {
                                    for (var pplIndex = 0; pplIndex < valuesArray[0].Contributors.results.length; pplIndex++) {
                                        arrSRapproversId.push(valuesArray[0].Contributors.results[pplIndex].Id);
                                    }
                                }
                            }
                        });
                    }
                    else if(currentSectionType=='Project Documents')
                    {
                        var Query = "?$select=Title,Project/Title,TeamMember/Id,TeamMember/EMail,TeamMember/Title&$expand=TeamMember/Id,Project&$filter=Project/Title eq '" + $(".headdingLinks").text() + "' and Role eq 'Project Manager'";
                        $.when(getItemsWithQuery("ProjectTeamDetails", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                        if (valuesArray.length > 0) {
                                        if (valuesArray[0].Contributors.results != null) {
                                            for (var pplIndex = 0; pplIndex < valuesArray[0].Contributors.results.length; pplIndex++) {
                                                arrSRapproversId.push(valuesArray[0].Contributors.results[pplIndex].Id);
                                            }
                                        }
                                    }
                        });

                    }
                    else if(currentSectionType=='Group Documents')
                    {
                        var Query = "?$select=Title,EmployeeName/Id,EmployeeName/EMail,EmployeeName/Title&$expand=EmployeeName/Id&$filter=Title eq '" + $(".headdingLinks").text() + "' and Status eq 'Active' and EmployeeName/EMail eq '" + _spPageContextInfo.userEmail + "'";
                        $.when(getItemsWithQuery("PersonalDMS_Setting", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                        if (valuesArray.length > 0) {
                                        if (valuesArray[0].EmployeeName.results != null) {
                                            for (var pplIndex = 0; pplIndex < valuesArray[0].EmployeeName.results.length; pplIndex++) {
                                                arrSRapproversId.push(valuesArray[0].EmployeeName.results[pplIndex].Id);
                                            }
                                        }
                                    }
                        });

                    }
                }
                else if(arrSharingRule[0].ApprovalRequired && arrSharingRule[0].ApproveBy=='Manager')
                {
                    arrSRapproversId.push(EmployeeDetails[0].ManagerLoginNameId);

                }
                else if(arrSharingRule[0].ApprovalRequired && arrSharingRule[0].ApproveBy=='Selective')
                {
                    if (arrSharingRule[0].ApproveByUsers.results != undefined&&arrSharingRule[0].ApproveByUsers.results != 'undefined'&&arrSharingRule[0].ApproveByUsers.results != null) {
                    for (var j = 0; j < arrSharingRule[0].ApproveByUsers.results.length; j++) 
                        arrSRapproversId.push(arrSharingRule[0].ApproveByUsers.results[j].Id);
                    }
                }
                if(arrSharingRule[0].ExemptedUsers.results!=null &&arrSharingRule[0].ExemptedUsers.results!='undefined' && arrSharingRule[0].ExemptedUsers.results!=undefined)
                {   var exempSRusersId=[];
                    for (var j = 0; j < arrSharingRule[0].ExemptedUsers.results.length; j++) 
                        exempSRusersId.push(arrSharingRule[0].ExemptedUsers.results[j].Id);
                    arrSharingRuleApproversId = arrSRapproversId.filter(function(val) {
                            return exempSRusersId.indexOf(val) == -1;
                    });
                }
                else{
                    for (var j = 0; j < arrSRapproversId.length; j++) 
                        arrSharingRuleApproversId.push(arrSRapproversId[j]);
                }
                if(arrSharingRule[0].ApprovalRequired && arrSharingRuleApproversId.length>0)
                {
                Metadata["ApprovalStatus"] = "Pending";
                Metadata["ApproversId"] = { 'results':arrSRapproversId};
                }
                else if(arrSharingRule[0].ApprovalRequired && arrSharingRuleApproversId.length==0)
                {
                Metadata["ApprovalStatus"] = "Approved";
                Metadata["ApproversId"] = { 'results':arrSRapproversId};
                }
            }
        }
        $.when(AddItemToListGroups(ListName, Metadata)).done(function (response) {
            //if((k+1) == sharedUsersId.length) {
            //}
        emailLink= _spPageContextInfo.webAbsoluteUrl + "/Pages/Document.aspx?WebAppId="+Logged_CompanyId+"&Section=SharedWithMe&File="+window.btoa(response.d.ID.toString()+response.d.DocumentID)+"&undefined=undefined";
        });
    }
}


//To check if sharing rule exists
function checkForSharingRule()
{
    var isValidShareBy=true;
    arrSharingRule=[];
    var reqShareWith='';
    if($('#sharewith').val()=="My-Groups"||$('#sharewith').val()=="Selective"){
        reqShareWith ='Internal User';
    } 
    else  if($('#sharewith').val()=="Project-Team"){
        reqShareWith ='External User';
    } 
    else if($('#sharewith').val()=="Everyone"){ 
        reqShareWith ='Everyone';
    }
    var reqSharePermission =($('#sharedWithPermission').val().trim()=="Contribute")?"Edit":$('#sharedWithPermission').val().trim();
                
    RestQuery = "?$select=*,ShareByUsers/Id,ApproveByUsers/Id,ExemptedUsers/Id&$expand=ShareByUsers/Id,ExemptedUsers/Id,ApproveByUsers/Id &$filter=Title eq '" + currentSectionType + "' and SourceLibraryDisplayName eq '"+$(".headdingLinks").text()+"' and Active eq 1 and (ShareWith eq '" + reqShareWith + "' and SharingType eq '" + reqSharePermission + "')&$top=1";
    $.when(getItemsWithQuery('DocumentSharingRule', RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (srColl) {
    if (srColl.length > 0 && srColl[0].ShareWith==reqShareWith && srColl[0].SharingType==reqSharePermission)
    {
        //arrSharingRule=srColl[0];
        arrSharingRule=srColl;
        if( srColl[0].ShareBy=='Selective'){

            var shareByArr = srColl[0].ShareByUsers.results.filter(function(filterData) {
                return filterData.Id ==_spPageContextInfo.userId;
            });
            if (shareByArr.length > 0) 
                isValidShareBy = true;
            else
                isValidShareBy = false;

        }  else if(srColl[0].ShareBy=='Owners Only'||srColl[0].ShareBy=='Owners only') {

             if(arrPermission.length>0&&arrPermission[0].UserFullAccess)
                isValidShareBy = true;
            else
                isValidShareBy = false
    
        } 
        else if( srColl[0].ShareBy=='All Contributers'||srColl[0].ShareBy=='All contributers') {

            if(arrPermission.length>0&&arrPermission[0].UserContri)
                isValidShareBy = true;
            else
                isValidShareBy = false
            
        }     
    }
    });
    return isValidShareBy;
}
//Bhawana
//Get sharing rule approval item
function GetSharingRuleApprovalItem(SRapprovalID) {
    waitingDialog.show();
   // setTimeout(function () 
    {
    
     
     var Query = "?$select=*,ID,SharedFrom,SharedType,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,Approvers/Title,Approvers/EMail,ApprovalStatus,ApprovedBy/Title,ApprovedBy/EMail,ApproveDate,ApprovalRemarks,SharedUsers/ID,Author/Title,Author/ID,Author/EMail,DOC_ID/ID,DOC_ID/Title,DOC_ID/DocumentNo,DOC_ID/DocumentType&$orderby=Modified desc&$expand=DOC_ID,SharedUsers,Approvers/Id,ApprovedBy/Id,Author&$filter=(ID eq '" + SRapprovalID + "') ";       
        $.when(getItemsWithQuery("SharedDocument", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (SRapprovalColl) {
         if (SRapprovalColl.length > 0) {
            $('#Sharing_folder_ad_file').modal('show');
           // entry.FileTitle + entry.FileType   entry.FileRef 
            $("#srFileTitle").text((SRapprovalColl[0].SharedFileTitle!=null?SRapprovalColl[0].SharedFileTitle:""));
            $("#srFileName").text((SRapprovalColl[0].Title!=null?SRapprovalColl[0].Title:""));
            $("#srFileCategory").text((SRapprovalColl[0].DocType!=null?SRapprovalColl[0].DocType:""));
            $("#srFileSubCategory").text((SRapprovalColl[0].SubCategory!=null?SRapprovalColl[0].SubCategory:""));
            $("#srFileRefNum").text((SRapprovalColl[0].DocumentNo!=null?SRapprovalColl[0].DocumentNo:""));
            $("#srFileShareBy").text(SRapprovalColl[0].Author.Title);
            var sharedWithUsersArr='';
            for(i=0;i<SRapprovalColl[0].SharedUsers.results.length;i++)
                sharedWithUsersArr=sharedWithUsersArr+' '+SRapprovalColl[0].SharedUsers.results[i].Title;
            $("#srFileShareWith").text(sharedWithUsersArr);
            $("#srFileShareType").text(SRapprovalColl[0].PermissionType);
            $("#srFileValidity").text((SRapprovalColl[0].SharingValidity!=null?GetDateStandardFormat(moment(SRapprovalColl[0].SharingValidity).format('DD/MM/YYYY')):""));
            $("#srFileAck").text((SRapprovalColl[0].NeedAcknowledgement==true?'Yes':'No'));

            if(SRapprovalColl[0].ApprovalStatus=="Pending")
            {
               $("#btnActionSR").show();
               $('input[name="approveopt"]').removeAttr('checked');
               $('input[name="approveopt"]').prop('disabled','');
               $("#txtsrReason").val('');
               $("#txtsrReason").prop('disabled','');
               
            }
            else{
                 $("#btnActionSR").hide();
                 $('input[name="approveopt"]').removeAttr('checked');
                 $('input[name="approveopt"]').each(function(){
                    if($(this).val()==SRapprovalColl[0].ApprovalStatus)  
                    $(this).prop('checked', true);
                });
                 $('input[name="approveopt"]').prop('disabled','disabled');
                  $("#txtsrReason").val(SRapprovalColl[0].ApprovalRemarks); 
                 $("#txtsrReason").prop('disabled','disabled');
                                
               
            }
            //approveopt
            //approveopt
            $("#txtsrReason").text("");
            $("#btnActionSR").click(function(){
                SRapprovalAction(SRapprovalID);
            });
            }
            waitingDialog.hide();
        });
        
    }//, 100);
}
const getTodayDate = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const d = newDate.getDate();
  
  return `${month.toString().padStart(2, '0')}/${d.toString().padStart(2, '0')}/${year}`;
}
function SRapprovalAction(currentItemId)
{
    if($('input[name="approveopt"]:checked').val()==null||$('input[name="approveopt"]:checked').val()==undefined||$('input[name="approveopt"]:checked').val()=="")
    {
        alert("Please select approve/reject.");
        return false;
    }
    else if(($('input[name="approveopt"]:checked').val()=="Rejected")&&($("#txtsrReason").val().trim()==""||$("#txtsrReason").val()==null||$("#txtsrReason").val()==undefined))
    {
        alert("Please enter rejection remarks.");
        $("#txtsrReason").focus();
        return false;
    }
    var ListName = "SharedDocument";
    var ItemType = GetItemTypeForListName(ListName);
    var approvalDate=GetDateStandardFormat(moment(getTodayDate()).format('DD/MM/YYYY'));
Metadata = {
            __metadata: {
                'type': ItemType
            },
            ApprovalStatus:$('input[name="approveopt"]:checked').val(),
            ApprovedById:_spPageContextInfo.userId,
            ApproveDate:approvalDate,
            ApprovalRemarks:$("#txtsrReason").val(),
        };
            $.when(updateItemWithIDItemListDocuments(ListName, Metadata, currentItemId, _spPageContextInfo.webAbsoluteUrl)).done(function (Result) {
                
                    alert("Sharing approval request has been approved successfully.");
                    $('#Sharing_folder_ad_file').modal('hide');
            });
            console.log("Sharing approval request has been approved successfully.");
}
//to add checkbox click on header sort //11 May 23
function addSelectAllEvent(){
    if(currentSectionType=='Reassigned'||currentSectionType=='MyFavorite'||currentSectionType=='My Documents'||currentSectionType=='Department'||currentSectionType=='Group Documents'||currentSectionType=='GuestDocuments'||currentSectionType=='ProjectDocuments')
    {     arrFileFolder = [];
        $('#selectAllChk').prop("checked", ""); 
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
            arrFileFolder = [];
            if (this.checked == true) {
                $('.chkFileFolder').prop("checked", "");
                $('.chkFileFolder').trigger('click');
            } else {
                $('.chkFileFolder').prop("checked", "");
                arrFileFolder = [];
            }
            waitingDialog.hide();
        });

    }
    else if(currentSectionType=='ApprovalInbox'){
        arrAppIds = [];
        $('#selectAllChk').prop("checked", "");
         $(".chkAppIn").click(function () {
            if (this.checked == true) {
                arrAppIds.push(this.value);
            }
            else {
                var selected = this.value;
                arrAppIds = arrAppIds.filter(function (obj) {
                    return obj !== selected;
                });
            }
        });

        $("#selectAllChk").click(function (e) {
            waitingDialog.show();
            arrAppIds = [];
            if (this.checked == true) {
                $('.chkAppIn').prop("checked", "");
                $('.chkAppIn').trigger('click');
            }
            else {
                $('.chkAppIn').prop("checked", "");
                arrAppIds = [];
            }
            waitingDialog.hide();
        });

    }
    else if(currentSectionType=='ApprovalOutbox'){
          arrAppIds = [];
        $('#selectAllChk').prop("checked", "");
         $(".chkAppOut").click(function () {
            if (this.checked == true) {
                arrAppIds.push(this.value);
            }
            else {
                var selected = this.value;
                arrAppIds = arrAppIds.filter(function (obj) {
                    return obj !== selected;
                });
            }
        });

        $("#selectAllChk").click(function (e) {
            waitingDialog.show();
            arrAppIds = [];
            if (this.checked == true) {
                $('.chkAppOut').prop("checked", "");
                $('.chkAppOut').trigger('click');
            }
            else {
                $('.chkAppOut').prop("checked", "");
                arrAppIds = [];
            }
            waitingDialog.hide();
        });

    }
    else if(currentSectionType=='SharedWithMe'||currentSectionType=='SharedByMe'||currentSectionType=='Archive')
    {  
         arrFileFolder = [];
         $('#selectAllChk').prop("checked", "");
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
                IsBlock: Properties[7].trim(),
                FileName: Properties[8].trim(),
                FileTitle: Properties[9].trim(),
                LibraryName: Properties[10].trim(),
                SharedType: Properties[11].trim(),
                FileFolderName:Properties[8].trim()//2 march 23

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
         arrFileFolder = [];
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
}
 //to add checkbox click on header sort//11 May 23
/*$(".sorterHeader").click(function(e){
    addSelectAllEvent();
});*/