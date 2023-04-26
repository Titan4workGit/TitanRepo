var arrAppIds = [];
var DocumentId = '';
var multipleEmailAddress = [];
var assignUserName = [];
var EmpIds = [];
var CopyLibrary = '';
var CopySourceURL = '';
var SignUploadFile = '';
var currentRequestID = 0;
var arrApprovalInAll = [];
var arrApprovalOutAll = [];
var IntervalId = '';
var ApprovalTable = '';
var IsMoving = false;
var CopyDestURL = "";
var CopyFolderName = '';
var currentRequestId = '';
var currentSigningApp = '';
var SignBaseValue = '';
var CurrentIpAddress = '';
var LoggedIn_TimeZone = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
var AllAppHistTable = '';
var arrAskApprover = [];
var allApproverApproval = [];
var currentStartedId = 0;

$(document).ready(function () {
    $('#bcPaint').bcPaint();
    $("#bcPaint-export").hide();
    $('#bcPaintCanvas').attr("width", '372px');
    $('#bcPaintCanvas').attr("height", '');
	checker = arr => arr.every(v => v === true);
    //Creating array of columns for Approval Inbox and OutBox - 12
    initializePeoplePicker("NotifyMailPicker", true);
    initializePeoplePicker("pplFilterAppInOut", true);
    //initializePeoplePicker("ApproverName", true);
    getIPAddress();
    $(".tabApprovalInbox").click(function () {
        arrAppIds = [];
        arrPermission = [];
        $(".advance_setion").hide();
		$("#DMSTable,#ButtonArea,#SearchArea").show();
        currentSectionType = "ApprovalInbox";
        $(".AppTabShow").show();
        $(".AppTabHide").hide();
        $(".chkAppOut").prop('checked', '');
        waitingDialog.show();
        setTimeout(function () {
            $("#btnAppInOutClear").trigger('click');
            GetApprovalInbox();
        }, 100);
    });

    $(".tabApprovalOutbox").click(function () {
        arrAppIds = [];
        arrPermission = [];
        currentSectionType = "ApprovalOutbox";
        $(".advance_setion").hide();
		$("#DMSTable,#ButtonArea,#SearchArea").show();
        $(".AppTabHide").hide();
        $(".AppTabShow").show();
        $(".chkAppIn").prop('checked', '');
        waitingDialog.show();
        setTimeout(function () {
            $("#btnAppInOutClear").trigger('click');
            GetApprovalOutbox();
        }, 100);
    });
    $('#ApprovalNotify').click(function (e) {
        NotifyEmail();
    });
    $('.btnApprovalHistry').click(function (e) {
        OpenSingleAppHistry(DocumentId, currentRequestID);
    });
    $('.btnApprovalDetails').click(function (e) {
        ShowAllAppHistory($('#FileName').text());
    });

    $('#chkSignType[name=UpdateEmp]').change(function () {
        if ($('#chkSignType[name=UpdateEmp]:checked')) {
            $('.signature-box').addClass('d-block');
            $('.signature-box').removeClass('d-none');

            $('.drag-drop-box, .draw-signature-box').removeClass('d-block');
            $('.drag-drop-box, .draw-signature-box').addClass('d-none');
            SignUploadFile = [];
            $("#txtSignType").val('');
            $("#bcPaint-reset").trigger("click");
            $('#SignFile').empty();
        }
    });
    $('#chkSignImage[name=UpdateEmp]').change(function () {
        if ($('#chkSignImage[name=UpdateEmp]:checked')) {
            $('.drag-drop-box').addClass('d-block');
            $('.drag-drop-box').removeClass('d-none');
            SignUploadFile = [];
            $("#txtSignType").val('');
            $("#bcPaint-reset").trigger("click");
            $('#SignFile').empty();
            $('.signature-box, .draw-signature-box').removeClass('d-block');
            $('.signature-box, .draw-signature-box').addClass('d-none');
        }
    });
    $('#chkSignDraw[name=UpdateEmp]').change(function () {
        if ($('#chkSignType3[name=UpdateEmp]:checked')) {
            $('.draw-signature-box').addClass('d-block');
            $('.draw-signature-box').removeClass('d-none');
            SignUploadFile = [];
            $("#txtSignType").val('');
            $("#bcPaint-reset").trigger("click");
            $('#SignFile').empty();            $('.signature-box, .drag-drop-box').removeClass('d-block');
            $('.signature-box, .drag-drop-box').addClass('d-none');
        }
    });
    $('#btnClearSign').click(function (e) {
        SignUploadFile = [];
        $('#SignFile').empty();
        $("#ImageSignUpload").val('');
        $("#btnClearSign").hide();
    });

    // upload file in Add Message Popup
    $("#ImageSignUpload").on('change', function (e) {
        var finalFiles = [];
        SignUploadFile = [];
        var fileNum = this.files.length, initial = 0;
        //Bhawana on 16 DEC 22
        var fileExt= this.files;
        if(fileNum>0 && returnExtension(fileExt[0].name.split('.').pop()))
        {
            alert("Please upload valid file.");
            $("#ImageSignUpload").val('');
            return false;
        }
        //
        
        
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        finalFiles = ReinitializeArray(finalFiles);
        SignUploadFile = SignUploadFile.concat(finalFiles);
        var ChangedfileName = '';
        
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#btnClearSign").show();
                $('#SignFile').empty().append('<img class="LocalSignImage" style="width:310px;float:right;" src="' + e.target.result+'" data-themekey="#">');
                for (initial; initial < finalFiles.length; initial++) {
                    $(".LocalSignImage").prop('title', finalFiles[initial].name);
                }
                SignBaseValue = this.result;//get base64 value of uploaded sign
            }
            reader.readAsDataURL(this.files[0]);
        }
        
        $("#ImageSignUpload").val('');
    });
    $("#btnApproveStep").click(function () {        
        if(ApprovalValidation() == true) {
            waitingDialog.show();
            setTimeout(function () {
                ApproveStep("Approved");
            }, 100);
        }
        else {
            alert("Kindly check the approved checkbox and upload the sign.");
            return false;
        }
    });
    
    $("#btnRejectProcess").click(function () {
        if($("#chkRejected").prop('checked') != false && $.trim($("#txtRejectRemark").val()) != "") {
            waitingDialog.show();
            setTimeout(function () {
                RejectStep("Reject");
            }, 100);
        }
        else {
            alert("Kindly check the rejected checkbox and fill the remarks.");
            return false;
        }
    });
    $("#btnCancelProcess").click(function () {
        if($("#chkCancel").prop('checked') != false && $.trim($("#txtCancelRemark").val()) != "") {
            waitingDialog.show();
            setTimeout(function () {
                CancelStep("Cancelled");
            }, 100);
        }
        else {
            alert("Kindly check the cancel checkbox and fill the remarks.");
            return false;
        }
    });
    
    $("#btnApproveClose").click(function () {
        $("#txtApproveRemarks").val('');
        $("#SignFile").empty();
        $("#chkApproved").prop('checked', '');
        $("#ImageSignUpload").val('');
        SignUploadFile = [];
    });
    
    $("#btnRejectClose").click(function () {
        $("#txtRejectRemark").val('');
        $("#chkRejected").prop('checked', '');
        GetApprovalInbox();
    });
    $(".btnDownloadFilesApp").click(function () {
    	if($('.chkAppIn:checked').length == 0 && $('.chkAppOut:checked').length == 0) {
            alert("Please select any file or folder first.");
            return false;
        }
        if($('.chkAppIn:checked').length > 0) {
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
            $('#selectAllChkAppIn').prop("checked", "");
            arrAppIds = [];
        }
        else {
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
            $('#selectAllChkAppOut').prop("checked", "");
            arrAppIds = [];
        }
        
    });
    
    $(".btnAppFilter").click(function () {
        if ($('#ddlDocTypeFilter option').length == 0) {
            BindDMSDocumentType();
        }
    });
    
    $("#btnAppInOutFilter").click(function () {
        if(currentClientName == "Approval Inbox") {
            filterAppInOut("Approval Inbox");
        }
        else {
            filterAppInOut("Approval Outbox");
        }
    });
    $("#btnAppInOutClear").click(function () {
        ClearFilters();
    });
    $("#closeAppAction").click(function () {
        CloseDocAppPopup();
    });
    $("#ForwardToDiv").click(function () {
    	$("#divlistForwardee").empty().append('<div id="divForwardTo"></div>');
        $('#divlistForwardee').has('#divForwardTo').addClass('activing');
    	initializePeoplePicker("divForwardTo", true);
    	$("#txtForwardMessage").val('');
    	$("#chkForward").prop('checked', true);
    });
    $("#btnSendForward").click(function () {
    	if(ForwardValidation() == true) {
			waitingDialog.show();
	        setTimeout(function () {
    			if($("#add_as_an_approver").prop('checked') == true) {
                    ForwardRequest();
                }
                else {
                    ForwardRequestReview();
                }
            }, 100);
        }
    });
    $("#ddlTemplateTitles").change(function () {
        $("#accordionapprovers").empty();
        $("#ApprovalStepBox").hide();
        $("#userselection").prop('checked', 'checked');
        $("#userbox-1").show();
        $("#userbox-2").hide();
        var TempLateId = this.value;
        if(this.value != "-Select-"){
            waitingDialog.show();
            setTimeout(function () {
                FetchPredefinedSteps(TempLateId);
            }, 100);
        }
    });
    $("#ApprovlUpload").on('change', function (e) { //Upload new files for Initiator while Document Approval start
        var finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        //Bhawana on 16 DEC 22
        var fileExt= this.files;
        if(fileNum>0 && returnExtension(fileExt[0].name.split('.').pop()))
        {
            alert("Please upload valid file.");
            $("#ApprovlUpload").val('');
            return false;
        }
        //
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        if(FinalFiles4Upload.length == 0) {
            $('#ApprovlUploadBox').html('');
        }
        finalFiles = ReinitializeArray(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.concat(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i);
        var ChangedfileName = '';
        var Tcounter = $("#ApprovlUploadBox").find('.NewFileUpload').length;
        $('#ApprovlUploadBox').empty();
        for (initial; initial < FinalFiles4Upload.length; initial++) {
            if (FinalFiles4Upload[initial].name.length > 15) {
                Tcounter = Tcounter + 1;
                ChangedfileName = FinalFiles4Upload[initial].name.substring(0, 15) + "...";
                $('#ApprovlUploadBox').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#ApprovlUploadBox').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + FinalFiles4Upload[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
        }
        $("#ApprovlUpload").val('');
    });
    $("#UploadApproveFiles").on('change', function (e) { //Upload new files for Initiator while Document Approval start
        var finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        //Bhawana on 16 DEC 22
        var fileExt= this.files;
        if(fileNum>0 && returnExtension(fileExt[0].name.split('.').pop()))
        {
            alert("Please upload valid file.");
            $("#UploadApproveFiles").val('');
            return false;
        }
        //
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        if(FinalFiles4Upload.length == 0) {
            $('#UploadBoxApprove').html('');
        }
        finalFiles = ReinitializeArray(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.concat(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i);
        var ChangedfileName = '';
        var Tcounter = $("#UploadBoxApprove").find('.NewFileUpload').length;
        $('#UploadBoxApprove').empty();
        for (initial; initial < FinalFiles4Upload.length; initial++) {
            if (FinalFiles4Upload[initial].name.length > 15) {
                Tcounter = Tcounter + 1;
                ChangedfileName = FinalFiles4Upload[initial].name.substring(0, 15) + "...";
                $('#UploadBoxApprove').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#UploadBoxApprove').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + FinalFiles4Upload[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
        }
        $("#UploadApproveFiles").val('');
    });
    $("#UploadRejectFiles").on('change', function (e) { //Upload new files for Initiator while Document Approval start
        var finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        //Bhawana on 16 DEC 22
        var fileExt= this.files;
        if(fileNum>0 && returnExtension(fileExt[0].name.split('.').pop()))
        {
            alert("Please upload valid file.");
            $("#UploadRejectFiles").val('');
            return false;
        }
        //
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        if(FinalFiles4Upload.length == 0) {
            $('#UploadBoxReject').html('');
        }
        finalFiles = ReinitializeArray(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.concat(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i);
        var ChangedfileName = '';
        var Tcounter = $("#UploadBoxReject").find('.NewFileUpload').length;
        $('#UploadBoxReject').empty();
        for (initial; initial < FinalFiles4Upload.length; initial++) {
            if (FinalFiles4Upload[initial].name.length > 15) {
                Tcounter = Tcounter + 1;
                ChangedfileName = FinalFiles4Upload[initial].name.substring(0, 15) + "...";
                $('#UploadBoxReject').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#UploadBoxReject').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + FinalFiles4Upload[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
        }
        $("#UploadRejectFiles").val('');
    });
	
    $("#UploadForwardFiles").on('change', function (e) { //Upload new files for Initiator while Document Approval start
        var finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        //Bhawana on 16 DEC 22
        var fileExt= this.files;
        if(fileNum>0 && returnExtension(fileExt[0].name.split('.').pop()))
        {
            alert("Please upload valid file.");
            $("#UploadForwardFiles").val('');
            return false;
        }
        //
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        if(FinalFiles4Upload.length == 0) {
            $('#UploadBoxForward').html('');
        }
        finalFiles = ReinitializeArray(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.concat(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i);
        var ChangedfileName = '';
        var Tcounter = $("#UploadBoxForward").find('.NewFileUpload').length;
        $('#UploadBoxForward').empty();
        for (initial; initial < FinalFiles4Upload.length; initial++) {
            if (FinalFiles4Upload[initial].name.length > 15) {
                Tcounter = Tcounter + 1;
                ChangedfileName = FinalFiles4Upload[initial].name.substring(0, 15) + "...";
                $('#UploadBoxForward').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#UploadBoxForward').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + FinalFiles4Upload[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
        }
        $("#UploadForwardFiles").val('');
    });
	
    $("#UploadCancelFiles").on('change', function (e) { //Upload new files for Initiator while Document Approval start
        var finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        //Bhawana on 16 DEC 22
        var fileExt= this.files;
        if(fileNum>0 && returnExtension(fileExt[0].name.split('.').pop()))
        {
            alert("Please upload valid file.");
            $("#UploadCancelFiles").val('');
            return false;
        }
        //
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        if(FinalFiles4Upload.length == 0) {
            $('#UploadBoxCancel').html('');
        }
        finalFiles = ReinitializeArray(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.concat(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i);
        var ChangedfileName = '';
        var Tcounter = $("#UploadBoxCancel").find('.NewFileUpload').length;
        $('#UploadBoxCancel').empty();
        for (initial; initial < FinalFiles4Upload.length; initial++) {
            if (FinalFiles4Upload[initial].name.length > 15) {
                Tcounter = Tcounter + 1;
                ChangedfileName = FinalFiles4Upload[initial].name.substring(0, 15) + "...";
                $('#UploadBoxCancel').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#UploadBoxCancel').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + FinalFiles4Upload[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
        }
        $("#UploadCancelFiles").val('');
    });
    $("#UploadReviewFiles").on('change', function (e) { //Upload new files for Initiator while Document Approval start
        var finalFiles = [];
        var fileNum = this.files.length, initial = 0;
        //Bhawana on 16 DEC 22
        var fileExt= this.files;
        if(fileNum>0 && returnExtension(fileExt[0].name.split('.').pop()))
        {
            alert("Please upload valid file.");
            $("#UploadReviewFiles").val('');
            return false;
        }
        //
        $.each(this.files, function (idx, elm) {
            if(finalFiles.filter( vendor => vendor['name'] === elm.name).length == 0){
                finalFiles[finalFiles.length] = elm;
            }
        });
        if(FinalFiles4Upload.length == 0) {
            $('#UploadBoxReview').html('');
        }
        finalFiles = ReinitializeArray(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.concat(finalFiles);
        FinalFiles4Upload = FinalFiles4Upload.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i);
        var ChangedfileName = '';
        var Tcounter = $("#UploadBoxReview").find('.NewFileUpload').length;
        $('#UploadBoxReview').empty();
        for (initial; initial < FinalFiles4Upload.length; initial++) {
            if (FinalFiles4Upload[initial].name.length > 15) {
                Tcounter = Tcounter + 1;
                ChangedfileName = FinalFiles4Upload[initial].name.substring(0, 15) + "...";
                $('#UploadBoxReview').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + ChangedfileName + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
            else {
                $('#UploadBoxReview').append('<div class="NewFileUpload" title="' + FinalFiles4Upload[initial].name + '" id="file_' + Tcounter + '"><i class="fa fa-paperclip" style="font-size: 20px; font-weight: 500;"></i></i></span> ' + FinalFiles4Upload[initial].name + '&nbsp;&nbsp;<span class="fa fa-close fa-lg closeBtn DeletePic" style="color:red;"  onclick="removeLine(this.id, \'' + FinalFiles4Upload[initial].name + '\');" id="file_' + Tcounter + '"" title="remove"></span></div>');
            }
        }
        $("#UploadReviewFiles").val('');
    });
    $("#btnReview").click(function () {
        if(ReviewValidation() == true) {
            waitingDialog.show();
            setTimeout(function () {
                ReviewStep();
            }, 100);
        }
        else {
            alert("Kindly check the reviewed checkbox.");
            return false;
        }    
    });
    $('#DivAppExport').click(function(){
        ApprovalExport();
    });
});    

//Use draw|erase
use_tool = function(tool) {
    tooltype = tool; //update
}

//get all the data-Approval Items for Logged-In User
function GetApprovalInbox() {
	$(".headdingLinks").html('Approval Inbox');
    currentClientName = 'Approval Inbox';
    DMS_Type = 'Approval Inbox';
    $("#DMSTable").empty().html('<table class="table-responsive table-width tinytable table table-bordered table-striped table-hover js-basic-example dataTable no-footer sharedwithme_table maxwidthmanage" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');
    //Geenrating the THead of table
    var ColumnName = "";
    ColumnName += '<th class="text-center border-bottom-0 w-2">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChkAppIn" value=""></label>' +
        '</th>';
    var ApprovalColNames = ['File', 'Title', 'Category', 'Requested', 'Status', 'Current Step'];
    for (var i = 0; i < ApprovalColNames.length; i++) {
        ColumnName += '<th data-localize="' + ApprovalColNames[i] + '">' + ApprovalColNames[i] + '</th>';
    }
    $("#theadItem").empty().append(ColumnName);

    //Bind the list Items to table
    
    //var Query = "?$select=*,LastActionby/EMail,AllApprovers/EMail,LastActionby/Title,NextActionby/EMail,NextActionby/Title,Author/Title,Author/EMail,AttachmentFiles&$expand=AllApprovers,LastActionby,NextActionby,Author,AttachmentFiles&$orderby=Modified desc&$filter=((LastActionby/EMail eq '" + _spPageContextInfo.userEmail + "' or LastActionApprover eq '" + _spPageContextInfo.userEmail + "' or LastActionApprover eq '" + _spPageContextInfo.userDisplayName + "') and (Status eq 'Approved' or Status eq 'Reject' or Status eq 'Pending'))  or ((NextActionby/EMail eq '" + _spPageContextInfo.userEmail + "' or NextActionApprover eq '" + _spPageContextInfo.userEmail + "') and Status eq 'Pending') or ((AllApprovers/EMail eq '" + _spPageContextInfo.userEmail + "') and (Status eq 'Approved' or Status eq 'Reject'))";
    
    var Query = "?$select=*,LastActionby/EMail,AllApprovers/EMail,LastActionby/Title,NextActionby/EMail,NextActionby/Title,Author/Title,Author/EMail,AttachmentFiles&$expand=AllApprovers,LastActionby,NextActionby,Author,AttachmentFiles&$orderby=Modified desc&$filter=((LastActionby/EMail eq '" + _spPageContextInfo.userEmail + "' or LastActionApprover eq '" + _spPageContextInfo.userEmail + "' or LastActionApprover eq '"+encodeURIComponent(_spPageContextInfo.userDisplayName)+ "') and (Status eq 'Approved' or Status eq 'Reject' or Status eq 'Pending'))  or ((NextActionby/EMail eq '" + _spPageContextInfo.userEmail + "' or NextActionApprover eq '" + _spPageContextInfo.userEmail + "') and Status eq 'Pending') or ((AllApprovers/EMail eq '" + _spPageContextInfo.userEmail + "') and (Status eq 'Approved' or Status eq 'Reject'))";//Bhawana
    
    $.when(getItemsWithQuery('DocumentApprovalRequests', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalResults) {
        arrApprovalInAll = ApprovalResults.filter(function(f){return f;});
        BindAppInbox(ApprovalResults);
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
    });
    waitingDialog.hide();
}


//Bind ApprovalInbox 
function BindAppInbox(ApprovalResults) {
    $("#DivAppInCount").show();
    $("#DivAppOutCount").hide();
    var DueDate = '',
	    LastActionName = '',
        LastActionEmail = '',
        AppPendingCount = 0,
        ApprovalInOut = "ApprovalInbox",
	    ApprovalIn = '';
    var StatusHTML = '';
    if (ApprovalResults.length > 0) {

        for (var i = 0; i < ApprovalResults.length; i++) {
            LastActionName = '';
            LastActionEmail = '';
            var FileExtension = "." + ApprovalResults[i].FileName.substring(ApprovalResults[i].FileName.lastIndexOf('.') + 1);

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
            var currentStepStatus = '';
            //get ApprovalPending Count
            if (ApprovalResults[i].NextActionby.results != undefined) {
                for (var app = 0; app < ApprovalResults[i].NextActionby.results.length; app++) {
                    if (ApprovalResults[i].NextActionby.results[app].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                        currentStepStatus = "Pending";
                        AppPendingCount++;
                    }
                }
            }
            else {
                if (ApprovalResults[i].NextActionApprover != null) {
                    if (ApprovalResults[i].NextActionApprover.includes(_spPageContextInfo.userDisplayName) == true || ApprovalResults[i].NextActionApprover.includes(_spPageContextInfo.userDisplayName) == true) {
                        currentStepStatus = "Pending";
                        AppPendingCount++;
                    }
                }
            }
            //if user is Last Action By then Show Approved one
            if (currentStepStatus == "") {
                if (ApprovalResults[i].LastActionby.EMail == _spPageContextInfo.userEmail && ApprovalResults[i].Status != "Reject" && ApprovalResults[i].Status == "Pending") {
                    ApprovalResults[i].Status = ApprovalResults[i].LastAction + ": Done";
                }
                StatusHTML = '';
                //color decide as per Status
                if (ApprovalResults[i].Status == "Approved" || ApprovalResults[i].Status == ApprovalResults[i].LastAction + ": Done") {
                    StatusHTML += '<div class="approveSign"><span class="iconboxtbl" onclick="OpenSingleAppHistry(' + ApprovalResults[i].DocumentID + ',' + ApprovalResults[i].Id + ');"><img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt="" data-themekey="#">';
                    if (ApprovalResults[i].Status.indexOf(": Done") != -1) {
                        StatusHTML += '<span>' + ApprovalResults[i].Status + '</span></div>';
                    }
                    else {
                        StatusHTML += '<span class="ApproveDate">' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Modified)) + '</span></div>';
                    }
                }
                else if (ApprovalResults[i].Status == "Reject" || ApprovalResults[i].Status == "Cancelled") {
                    StatusHTML = '<span class="iconboxtbl" onclick="OpenSingleAppHistry(' + ApprovalResults[i].DocumentID + ',' + ApprovalResults[i].Id + ');"><img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#"><span class="rejectDate">' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Modified)) + '</span></span>'
                }
                else {
                    StatusHTML = '<span class="iconboxtbl" onclick="OpenSingleAppHistry(' + ApprovalResults[i].DocumentID + ',' + ApprovalResults[i].Id + ');"><img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt="" data-themekey="#"><span class="RequestDate">' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Modified)) + '</span></span>'
                }
            }
            else {
                ApprovalResults[i].Status == "Pending";
                StatusHTML = '<span class="iconboxtbl" onclick="OpenSingleAppHistry(' + ApprovalResults[i].DocumentID + ',' + ApprovalResults[i].Id + ');"><img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt="" data-themekey="#"><span class="RequestDate">' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Modified)) + '</span></span>'
            }

            if (ApprovalResults[i].LastActionby.Title != '' && ApprovalResults[i].LastActionby.Title != null) {
                LastActionName = ApprovalResults[i].LastActionby.Title;
                LastActionEmail = ApprovalResults[i].LastActionby.EMail;
            }
            else {
                LastActionName = ApprovalResults[i].LastActionApprover;
                LastActionEmail = '';
            }
            if (ApprovalResults[i].Reference == "null") { ApprovalResults[i].Reference = ''; }
            if (ApprovalResults[i].DocumentType == "null") { ApprovalResults[i].DocumentType = ''; }
            if (ApprovalResults[i].SubCategory != "null" && ApprovalResults[i].SubCategory != null && ApprovalResults[i].SubCategory != "" && ApprovalResults[i].SubCategory != "--select--" && ApprovalResults[i].SubCategory != "-Select-") {
                ApprovalResults[i].DocumentType = ApprovalResults[i].DocumentType.replaceAll('(', '');
                ApprovalResults[i].DocumentType = ApprovalResults[i].DocumentType.replaceAll(')', '');
                ApprovalResults[i].DocumentType = "(" + ApprovalResults[i].DocumentType + ")" + ApprovalResults[i].SubCategory;
            }

            DueDate = ApprovalResults[i].DueDate ? ApprovalResults[i].DueDate : "";
            var CreatedDate = ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Created));
            ApprovalIn += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + ApprovalResults[i].Id + '" name="' + ApprovalResults[i].FileServerURL + '" id ="ApprIn' + i + '" class="chkAppIn"><label for="ApprIn' + i + '">';
            ApprovalIn += '<img width="30px" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
            ApprovalIn += '<td class="text-left"><a href="javascript:void(0);" id="' + ApprovalResults[i].Id + ApprovalResults[i].DocumentID + '" onclick="OpenApproval(' + ApprovalResults[i].Id + ', \'' + ApprovalResults[i].Author.Title + '\', \'' + ApprovalResults[i].Author.EMail + '\', \'' + escape(ApprovalResults[i].Reference) + '\', \'' + ApprovalResults[i].DocumentType + '\', \'' + escape(ApprovalResults[i].Purpose) + '\', \'' + ApprovalResults[i].Priority + '\', \'' + DueDate + '\', \'' + LastActionName + '\', \'' + LastActionEmail + '\', \'' + CreatedDate + '\', \'' + ApprovalResults[i].DocumentID + '\', \'' + ApprovalResults[i].Modified + '\', \'' + escape(ApprovalResults[i].LibraryLink) + '\', \'' + ApprovalResults[i].FileServerURL + '\', \'' + ApprovalResults[i].Status + '\', \'' + ApprovalResults[i].OriginDMS + '\', \'' + ApprovalResults[i].LibraryLink + '\', \'' + ApprovalResults[i].SigningApp + '\', \'' + ApprovalInOut + '\', \'' + escape(ApprovalResults[i].FileName) + '\', \'' + ApprovalResults[i].ApprovedVersion + '\');">';
            ApprovalIn += '<span class="ml-4 dms-table-ellipsis-2">' + ApprovalResults[i].FileName + '</span></a></td>';
            ApprovalIn += '<td class="text-left"><div class="dms-table-ellipsis-2">' + (ApprovalResults[i].ApprovalFileTitle ? ApprovalResults[i].ApprovalFileTitle : "") + '</div></td>';
            ApprovalIn += '<td class="text-left"><div class="dms-table-ellipsis-2">' + (ApprovalResults[i].DocumentType ? ApprovalResults[i].DocumentType : "") + '</div></td>';
            ApprovalIn += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ApprovalResults[i].Author.Title + '</div><div class="dms-table-ellipsis-2">' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Created)) + '</div></td>';
            ApprovalIn += '<td class="text-left"><div class="dms-table-ellipsis-2 statusHTML">' + StatusHTML + '</div></td>';
            ApprovalIn += '<td class="text-left"><div class="dms-table-ellipsis-2">' + (ApprovalResults[i].NextAction ? ApprovalResults[i].NextAction : "") + '</div></td></tr>';
        }
        if (MyDoctable!= '') {
            MyDoctable.destroy();
        }
        $("#groupDocumentGridtbody").empty().append(ApprovalIn);
        if (AppPendingCount == 0) {
            $("#DivAppInCount").hide();
        }
        else {
            $("#DivAppInCount").show();
            $("#AppInPendingCount").text(AppPendingCount);
        }
        //TablePagination();
        Tableagination();
        $("#selectAllChkAppIn").click(function (e) {
            waitingDialog.show();
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
    else {
        waitingDialog.hide();
        ApprovalIn += '<tr><td colspan="12" style="text-align:center;">No approval requests for you!</td></tr>';
        $("#groupDocumentGridtbody").empty().append(ApprovalIn);
        $("#DivAppInCount").hide();
    }
}

//directly open Approval History for Approval INbox
function OpenSingleAppHistry(DocId, ItemId) {
    DocumentId = DocId;
    BindApprovalHistory(ItemId);
}

//get all requested data-Approval Items by Logged-In User
function GetApprovalOutbox() {
	$(".headdingLinks").html('Approval Outbox');
    currentClientName = 'Approval Outbox';
    DMS_Type = 'Approval Outbox';
    //Geenrating the THead of table
    var ColumnName = "";
    $("#DMSTable").empty().html('<table class="table-responsive table-width tinytable table table-bordered table-striped table-hover js-basic-example dataTable no-footer sharedwithme_table maxwidthmanage" id="groupDocumentGrid"><thead><tr id="theadItem"></tr></thead><tbody id="groupDocumentGridtbody"></tbody></table>');

    ColumnName += '<th class="text-center border-bottom-0 w-2">' +
        '<label class="checkbox-inline hpx-20"><input type="checkbox" id="selectAllChkAppOut" value=""></label>' +
        '</th>';
    var ApprovalColNames = ['File', 'Title', 'Category', 'Origin', 'Requested Date', 'Status'];
    for (var i = 0; i < ApprovalColNames.length; i++) {
        ColumnName += '<th data-localize="' + ApprovalColNames[i] + '">' + ApprovalColNames[i] + '</th>';
    }
    $("#theadItem").empty().append(ColumnName);

    //Bind the list Items to table
    var Query = "?$select=*,LastActionby/EMail,LastActionby/Title,NextActionby/EMail,NextActionby/Title,Author/Title,Author/EMail,AttachmentFiles&$orderby=Modified desc&$expand=LastActionby,NextActionby,Author,AttachmentFiles&$filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery('DocumentApprovalRequests', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalResults) {
        arrApprovalOutAll = ApprovalResults.filter(function(f){return f;})
        BindAppOutBox(ApprovalResults);
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
    });
    waitingDialog.hide();
}


//BindApproval Outbox
//Bind Approval Outbox data
function BindAppOutBox(ApprovalResults) {
    $("#DivAppInCount").hide();
    $("#DivAppOutCount").show();
    var LastActionName = '',
        LastActionEmail = '',
        AppOutCount = 0,
        NextActionName = '',
        ApprovalInOut = "ApprovalOutbox",
	    NextActionEmail = '',
	    ApprovalOut = '',
	    arrAddedFileId = [],
        arrAddedFileName = [],
        DueDate = '';
    if (ApprovalResults.length > 0) {
        for (var i = 0; i < ApprovalResults.length; i++) {
            if (jQuery.inArray(ApprovalResults[i].DocumentID, arrAddedFileId) != '-1' && jQuery.inArray(ApprovalResults[i].FileName, arrAddedFileName) != '-1') {
                //Do Nothing. Elements contains this already
            }
            else {
                arrAddedFileId.push(ApprovalResults[i].DocumentID);
                arrAddedFileName.push(ApprovalResults[i].FileName);
                var FileExtension = "." + ApprovalResults[i].FileName.substring(ApprovalResults[i].FileName.lastIndexOf('.') + 1);
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
                //if user is Last Action By then Show Approved one
                if (ApprovalResults[i].LastActionby.EMail == _spPageContextInfo.userEmail && ApprovalResults[i].Status != "Reject" && ApprovalResults[i].Status == "Pending") {
                    ApprovalResults[i].Status = ApprovalResults[i].LastAction + ": Done";
                }

                StatusHTML = '';
                //color decide as per Status
                if (ApprovalResults[i].Status == "Approved" || ApprovalResults[i].Status == ApprovalResults[i].LastAction + ": Done") {
                    StatusHTML += '<div class="approveSign"><span class="iconboxtbl" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + ApprovalResults[i].DocumentID + ', \'' + ApprovalResults[i].FileName + '\');"><img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt="" data-themekey="#">';
                    if (ApprovalResults[i].Status.indexOf(": Done") != -1) {
                        StatusHTML += '<span>' + ApprovalResults[i].Status + '</span>';
                    }
                    else {
                        StatusHTML += '<span class="ApproveDate">' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Modified)) + '</span></div>';
                    }
                }
                else if (ApprovalResults[i].Status == "Reject" || ApprovalResults[i].Status == "Cancelled") {
                    StatusHTML = '<span class="iconboxtbl" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + ApprovalResults[i].DocumentID + ', \'' + ApprovalResults[i].FileName + '\');"><img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt="" data-themekey="#"><span class="rejectDate">' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Modified)) + '</span></span>'
                }
                else {
                    StatusHTML = '<span class="iconboxtbl" data-target="#approverssec" data-toggle="modal" onclick="OpenApprovalHistry(' + ApprovalResults[i].DocumentID + ', \'' + ApprovalResults[i].FileName + '\');"><img style="height:17px;" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt="" data-themekey="#"><span class="RequestDate">' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Modified)) + '</span></span>'
                }

                if (ApprovalResults[i].LastActionby.Title != '' && ApprovalResults[i].LastActionby.Title != null) {
                    LastActionName = ApprovalResults[i].LastActionby.Title;
                    LastActionEmail = ApprovalResults[i].LastActionby.EMail;
                }
                else {
                    LastActionName = ApprovalResults[i].LastActionApprover;
                    LastActionEmail = '';
                }

                if (ApprovalResults[i].Reference == "null") { ApprovalResults[i].Reference = ''; }
                if (ApprovalResults[i].DocumentType == "null") { ApprovalResults[i].DocumentType = ''; }
                if (ApprovalResults[i].SubCategory != "null" && ApprovalResults[i].SubCategory != null && ApprovalResults[i].SubCategory != "" && ApprovalResults[i].SubCategory != "--select--" && ApprovalResults[i].SubCategory != "-Select-") {
                    ApprovalResults[i].DocumentType = ApprovalResults[i].DocumentType.replaceAll('(', '');
                    ApprovalResults[i].DocumentType = ApprovalResults[i].DocumentType.replaceAll(')', '');
                    ApprovalResults[i].DocumentType = "(" + ApprovalResults[i].DocumentType + ")" + ApprovalResults[i].SubCategory;
                }
                if (ApprovalResults[i].Status == "Pending" || ApprovalResults[i].Status.indexOf(": Done") != -1) {
                    AppOutCount++;
                }
                DueDate = ApprovalResults[i].DueDate ? ApprovalResults[i].DueDate : "";
                var CreatedDate = ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Created));
                ApprovalResults[i].OriginSection = ApprovalResults[i].OriginSection ? ApprovalResults[i].OriginSection : '';
                ApprovalOut += '<tr><td class="text-center"><div class="chexbox_mg"><input type="checkbox" value="' + ApprovalResults[i].Id + '" name="' + ApprovalResults[i].FileServerURL + '" id ="ApprOut' + i + '" class="chkAppOut"><label for="ApprOut' + i + '">';
                ApprovalOut += '<img width="30px" src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/DMS/assets/images/' + Icon + '" alt="' + Icon + '"></label></div></td>';
                ApprovalOut += '<td class="text-left"><a href="javascript:void(0);" id="' + ApprovalResults[i].Id + ApprovalResults[i].DocumentID + '" onclick="OpenApproval(' + ApprovalResults[i].Id + ', \'' + ApprovalResults[i].Author.Title + '\', \'' + ApprovalResults[i].Author.EMail + '\', \'' + escape(ApprovalResults[i].Reference) + '\', \'' + ApprovalResults[i].DocumentType + '\', \'' + escape(ApprovalResults[i].Purpose) + '\', \'' + ApprovalResults[i].Priority + '\', \'' + DueDate + '\', \'' + LastActionName + '\', \'' + LastActionEmail + '\', \'' + CreatedDate + '\', \'' + ApprovalResults[i].DocumentID + '\', \'' + ApprovalResults[i].Modified + '\', \'' + escape(ApprovalResults[i].LibraryLink) + '\', \'' + ApprovalResults[i].FileServerURL + '\', \'' + ApprovalResults[i].Status + '\', \'' + ApprovalResults[i].OriginDMS + '\', \'' + escape(ApprovalResults[i].LibraryLink) + '\', \'' + ApprovalResults[i].SigningApp + '\', \'' + ApprovalInOut + '\', \'' + escape(ApprovalResults[i].FileName) + '\', \'' + ApprovalResults[i].ApprovedVersion + '\');">';
                ApprovalOut += '<span class="ml-4 dms-table-ellipsis-2">' + ApprovalResults[i].FileName + '</span></a></td>';
                ApprovalOut += '<td class="text-left"><div class="dms-table-ellipsis-2">' + (ApprovalResults[i].ApprovalFileTitle ? ApprovalResults[i].ApprovalFileTitle : "") + '</div></td>';
                ApprovalOut += '<td class="text-left"><div class="dms-table-ellipsis-2">' + (ApprovalResults[i].DocumentType ? ApprovalResults[i].DocumentType : "") + '</div></td>';
                ApprovalOut += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ApprovalResults[i].OriginSection + '</div></td>';
                ApprovalOut += '<td class="text-left"><div class="dms-table-ellipsis-2">' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Created)) + '</div></td>';
                ApprovalOut += '<td class="text-left"><div class="dms-table-ellipsis-2 StatusHTML">' + StatusHTML + '</div></td></tr>';
            }

        }
        if (MyDoctable != '') {
            MyDoctable.destroy();
        }

        $("#groupDocumentGridtbody").empty().append(ApprovalOut);
        if (AppOutCount == 0) {
            $("#DivAppOutCount").hide();
        }
        else {
            $("#DivAppOutCount").show();
            $("#AppOutPendingCount").text(AppOutCount);
        }
        //TablePagination();
        Tableagination();
        $("#selectAllChkAppOut").click(function (e) {
            waitingDialog.show();
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
    else {
        waitingDialog.hide();
        ApprovalOut += '<tr><td colspan="12" style="text-align:center;">No approval requests for you!</td></tr>';
        $("#groupDocumentGridtbody").empty().append(ApprovalOut);
        $("#DivAppOutCount").hide();
    }
}
//Open Document Approval POpup 
function OpenApproval(RequestId, AuthorName, AuthorEmail, Reference, DocumentType, Purpose, Priority, DueDate, LastActionName, LastActionEMail, RequestedDate, DocumentID, ModifiedDate, SiteURL, FileServerURL, Status, OriginDMS, LibraryLink, SigningApp, ApprovalInOutType, FileName, CurrentVer) {
    currentRequestID = RequestId;
    Reference = unescape(Reference);
    Purpose = unescape(Purpose);
    LibraryLink = unescape(LibraryLink);
    FileName = unescape(FileName);
    if (Reference == "null") { Reference = ''; }
    if (DocumentType == "null") { DocumentType = ''; }
    if (Purpose == "null") { Purpose = ''; }
    var CurrentIndex = -1;
    $("#AskAppArea").hide();
    var IsReviewer = false;
    var IsApprover = false;
    //to check if next AskApprover is true for next step
    var Query = "?$select=*,Author/EMail,Author/Title,Approvers/EMail,Approvers/Title,Approvers/Id,ForwardedUser/EMail&$expand=ForwardedUser,Author,Approvers&$top=5000&$filter=DocumentID eq '" + DocumentID + "' and RequestID eq '" + RequestId+ "' ";
    $.when(getItemsWithQuery("DocumentApprovalQueue", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            CurrentIndex = valuesArray.findIndex(x => x.Status == "Started");
            if(CurrentIndex != -1) {
                currentStartedId = valuesArray[CurrentIndex].Id;
                //check if User is Forwardee or not
                if(valuesArray[CurrentIndex].Forwarded == true){
                    if (valuesArray[CurrentIndex].ForwardedUser.results != null) {
                        for (Appr = 0; Appr < valuesArray[CurrentIndex].ForwardedUser.results.length; Appr++) {
                            if(valuesArray[CurrentIndex].ForwardedUser.results[Appr].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()){
                                IsReviewer = true;
                                break;
                            }
                        }
                    }
                }
                if (valuesArray[CurrentIndex].Approvers.results != null) {
                    for (Appr = 0; Appr < valuesArray[CurrentIndex].Approvers.results.length; Appr++) {
                        if(valuesArray[CurrentIndex].Approvers.results[Appr].EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()){
                            IsApprover = true;
                            break;
                        }
                    }
                }
                //Check for 'Ask Approver'
                var InCount = 1;
                var AskApp = '';
                $("#AskAppArea").empty();
                while(valuesArray[CurrentIndex + InCount] != null) {
                    if(valuesArray[CurrentIndex + InCount].AskApprover == true && valuesArray[CurrentIndex + InCount].ApproverDecidingStep == valuesArray[CurrentIndex].StepName) {
                        AskApp = '';
                        $("#AskAppArea").show();
                        var RuntimeStep = valuesArray[CurrentIndex + InCount].StepName.replaceAll(/\s/g,'');
                        AskApp += '<div class="form-group custom-form-group ">';
                        AskApp += '<label data-localize="Requested By">Approver for <label id="DecidingStepName'+RuntimeStep +'">'+valuesArray[CurrentIndex + InCount].StepName+'</label>:';
                        AskApp += '<span style="color:red;">*</span></label>';
                        AskApp += '<div class="RuntimeClass" id="pplDecidingApp'+valuesArray[CurrentIndex + InCount].Id +'" class="form-control"></div></div>';
	                	
                        $("#AskAppArea").append(AskApp);
                        initializePeoplePicker("pplDecidingApp"+valuesArray[CurrentIndex + InCount].Id+"", true);
                        InCount++;
                        //break;
                    }
                    else {
                        InCount++;
                    }
                }
            }
        }
        
    });
	
    if (Status == "Approved" || Status == "Reject" || Status == "Cancelled" || ApprovalInOutType == "ApprovalOutbox" || Status.includes('Done') == true) {
        $(".FileAction").hide();
        $(".FileAdobeAction").hide();
        $("#ParentReview").hide();
    }
    else if (Status == "Pending") {
        if (SigningApp == "E-Sign") {
            $(".FileAction").show();
            $(".FileAdobeAction").hide();
            if(IsReviewer == true){
                $("#ParentReview").show();
            }
            else {
                $("#ParentReview").hide();
            }
            if(IsApprover == true && IsReviewer == true) {
                $(".FileAction").show();
                $("#ParentReview").show();
            }
            if(IsApprover == false) {
                $(".FileAction").hide();
            }
        }
        else if (SigningApp == "Adobe Sign") {
            $(".FileAction").hide();
            $(".FileAdobeAction").show();
            $("#btnAdobeLink").prop("href", getApprovalSignLink(RequestId));
            if ($("#btnAdobeLink").prop("href") == 'javascript:void(0);') {
                $("#btnAdobeLink").prop('target', '');
            }
            else {
                $("#btnAdobeLink").prop('target', '_blank');
            }
        }
        else { //PDF & Sign
            $(".FileAction").hide();
            $(".FileAdobeAction").hide();
        }
    }
    if (ApprovalInOutType == "ApprovalOutbox" && Status == "Pending") {
        $("#ParentBtnCancel").show();
    }
    else {
        $("#ParentBtnCancel").hide();
    }
    var Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(AuthorEmail);
    $("#AuthorImg").attr("src", Authorattachment);
    CopyLibrary = OriginDMS;
    CopySourceURL = LibraryLink;
    $("#AuthorDisplayName").text(AuthorName);
    $("#AuthorEMail").text(AuthorEmail);
    $("#RequestedDate").text(RequestedDate);
    $("#txtPurposeApproval").text(Purpose);
    if (Priority == "Top") {
        $(".IsTop").show();
    }
    else {
        $(".IsTop").hide();
    }
    $("#FilePriority").text(Priority);
    if (DueDate == "" || DueDate == null) {
        $("#txtDueDate").text("Not defined");
    }
    else {
        $("#txtDueDate").text(ShowCommonStandardDateFormat(new Date(DueDate)));
    }
    
    $("#txtDocType").text(DocumentType);
    $("#txtRef").text(Reference);
    DocumentId = DocumentID;
    $(".FileApprovalPDF").empty();
    if (Status == "Approved") {
        FinalApprovalFile(RequestId);
        $("#LastStatus").text(Status);
        $(".ApproveSign").show();
        $(".RejectSign").hide();
        $("#LastStatus").css('color', 'Green');
    }
    else if (Status == "Reject" || Status == "Cancelled") {
        $("#LastStatus").text(Status);
        $(".RejectSign").show();
        $(".ApproveSign").hide();
        $("#LastStatus").css('color', 'Red');
    }
    else {
        $("#LastStatus").text(Status);
        $(".RejectSign").hide();
        $(".ApproveSign").hide();
        $("#LastStatus").css('color', 'Black');
    }

    if (LastActionName == "undefined" || LastActionName == "Not defined" || LastActionName == "null") {
        LastActionName = '';
    }
    if (LastActionEMail == "undefined" || LastActionEMail == "Not defined" || LastActionEMail == "null") {
        LastActionEMail = '';
    }
    var LastActionUser = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(LastActionEMail);
    $("#imgLastAction").attr("src", LastActionUser);
    $("#LastActionName").text(LastActionName);
    $("#LastActionEmail").text(LastActionEMail);
    $("#txtModifiedDate").text(ShowCommonStandardDateFormat(new Date(ModifiedDate)));

    var propertiesServerRelativeUrl = '';
    var Extension = FileName.substring(FileName.lastIndexOf('.') + 1);
    //get Attachment saved in 'DocumentApprovalRequests' list
    CurrentVer = parseInt(CurrentVer).toString();
    var FilePrefix = DocumentID + "_V" + CurrentVer + "_" + RequestId + "_Original";
    var Query = "?$select=*,Author/EMail,Author/Title,AllApprovers/Id,AttachmentFiles&$expand=Author,AttachmentFiles,AllApprovers&$top=5000&$filter=substringof('" + FilePrefix + "',FileNameWithPrefix) and Id eq '" + RequestId + "' ";
    $.when(getItemsWithQuery("DocumentApprovalRequests", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            var AppValidDate = valuesArray[0].ApprovalValidity;
            if (AppValidDate == "" || AppValidDate == null) {
                $("#txtValidity").text("Forever");
            }
            else {
                $("#txtValidity").text(ShowCommonStandardDateFormat(new Date(AppValidDate)));
            }
            $("#txtRemarkApproval").text(valuesArray[0].Remarks ? valuesArray[0].Remarks: '');
            allApproverApproval = [];
            for (var m = 0; m < valuesArray[0].AllApprovers.results.length; m++) {
                allApproverApproval.push(valuesArray[0].AllApprovers.results[m].Id);
            }
            if (valuesArray[0].AttachmentFiles.results.length > 0) {
                for (var k = 0; k < valuesArray[0].AttachmentFiles.results.length; k++) {
                    Filename = valuesArray[0].AttachmentFiles.results[k].FileName;
                    if (Filename.indexOf(FilePrefix) !== -1) {
                        var container = $("#doc-viewer").empty();
                        propertiesServerRelativeUrl = valuesArray[0].AttachmentFiles.results[k].ServerRelativeUrl;
                        $("#DownloadFile").prop("href", propertiesServerRelativeUrl);
                        var IframeURL = valuesArray[0].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl + "?web=1";
                        $("#btnFullView").prop("href", IframeURL);
                        $(".txtCopyLink").val(IframeURL);
                        if (FileName.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                            $('#doc-viewer').html("<div class='FlexingBox'><img class='AdjustingSize' src='" + IframeURL + "'/></div>");
                        }
                        else {
                            var docExt = FileName.substring(FileName.lastIndexOf('.') + 1);
                            if (docExt == 'doc' || docExt == 'docx' || docExt == 'xls' || docExt == 'xlsx' || docExt == 'ppt' || docExt == 'pptx' || docExt == 'pdf' || docExt == 'csv') {
                                IframeURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/WopiFrame.aspx?sourcedoc=' + valuesArray[0].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl + '&action=interactivepreview';
                            }
                            else {
                                IframeURL = valuesArray[0].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl;
                            }
                            $('<iframe>', {
                                src: IframeURL,
                                id: 'iframe-viewer',
                                frameborder: 0,
                                scrolling: 'yes',
                                width: '100%',
                                height: '98%'
                            }).appendTo(container);
                        }
                    }
                }
            }
        }
        else {
            $("#doc-viewer").empty();
        }
    });
    $("#documentApprovalAction").modal('show');
    IntervalId = setInterval(function () {
        $("#iframe-viewer").contents().find(".OneUp-commandBar").remove();
    }, 2000);
}

//Approval History code starts----------------------------

function BindApprovalHistory(ItemId) {
    var AppHistory = '';
    var attachment = '';
    var Visibility = "none";
    AllApprovers = [];
    var SignSiffix = window.btoa("_AdaptSignature");
    //Initial Step
    var Query = "?$select=*,Author/EMail,Author/Title,AttachmentFiles&$expand=Author,AttachmentFiles&$top=5000&$filter=DocumentID eq '" + DocumentId + "' and Id eq '" + ItemId + "' ";
    $.when(getItemsWithQuery("DocumentApprovalRequests", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        var PurposeHTML = '<div class="imagecontent"><h4>Purpose:</h4><p class="Purposetext" id="txtPurposeHistory">' + valuesArray[0].Purpose + '</p></div>';
        if (valuesArray[0].Purpose == "" || valuesArray[0].Purpose == null) {
            PurposeHTML = '';
        }
        if (valuesArray[0].Author.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
            Visibility = "block";
        }

        var SupportedFileHTML = '';
        if (valuesArray[0].AttachmentFiles.results.length > 0) {
            SupportedFileHTML = '';
            for (var attach = 0; attach < valuesArray[0].AttachmentFiles.results.length; attach++) {
                if (valuesArray[0].AttachmentFiles.results[attach].FileName.includes("_Original") != true && valuesArray[0].AttachmentFiles.results[attach].FileName.includes("_Approved") != true) {
                    SupportedFileHTML += '<div class="m-0  upload-chip" style="float:right;">';
                    SupportedFileHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;"  onclick="ShowFileInIFrame(this);" data-fileurl="' + valuesArray[0].AttachmentFiles.results[attach].ServerRelativeUrl + '" data-filename="' + valuesArray[0].AttachmentFiles.results[attach].FileName + '" title="' + valuesArray[0].AttachmentFiles.results[attach].ServerRelativeUrl + '" id="btnLinkAttachment">' + valuesArray[0].AttachmentFiles.results[attach].FileName + '</span>';
                    SupportedFileHTML += '<span class="chip-icon-box"><a href="' + valuesArray[0].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>';
                    SupportedFileHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
                }
            }
        }
        currentSigningApp = valuesArray[0].SigningApp;
        currentRequestId = valuesArray[0].Id;
        valuesArray[0].Remarks = valuesArray[0].Remarks ? valuesArray[0].Remarks : '';
        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[0].Author.EMail);
        AppHistory += '<li><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-1.png" alt=""></span>';
        AppHistory += '<div class="approvelheadeing"><h3 class="mainheading">Approval Initiation</h3><h3 class="SignType">Signing Type: ' + valuesArray[0].SigningApp + '</h3><span class="date-sec">' + moment(valuesArray[0].Created).format('DD-MMM-YYYY hh:mm A') + '</span><p class="StanderedTimeZone"> ' + (valuesArray[0].ActionByTimeZone ? valuesArray[0].ActionByTimeZone : "") + '</p></div>';
        AppHistory += '<p class="waitsec initialize">Initiated</p><div class="row"><div class="col-sm-6 flexitem"><div class="imgsetion">';
        AppHistory += '<img src="' + attachment + '" alt=""></div><div class="imagecontent">';
        AppHistory += '<h4 id=InitiatorDisplayName>' + valuesArray[0].Author.Title + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[0].Author.EMail + '\');">' + valuesArray[0].Author.EMail + '</a>';
        AppHistory += '</div></div><div class="col-sm-6">' + PurposeHTML + '<div class="SupprtedFileBox">' + SupportedFileHTML + '</div></div></div>';
        AppHistory += '<div class="remarkboxsec"><label for="">Remarks:</label><p>' + valuesArray[0].Remarks + '</p></div></li>';
    });

    //Approver's Steps
    var Query = "?$select=*,Author/EMail,Author/Title,AttachmentFiles,Approvers/EMail,Approvers/Title,Approvers/Id,ActionTakenby/EMail,ActionTakenby/Title&$expand=Author,Approvers,ActionTakenby,AttachmentFiles&$top=5000&$filter=DocumentID eq '" + DocumentId + "' and RequestID eq '" + ItemId + "' &$orderby=Sequence_No asc";
    $.when(getItemsWithQuery("DocumentApprovalQueue", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        arrayCopy = valuesArray.filter(function (f) { return f; });
        for (var step = 0; step < valuesArray.length; step++) {
            if (valuesArray[step].Status == "Started") {
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" alt=""></span>';
                AppHistory += '<div class="dropdown"><button class="dropdown-toggle" type="button" style="display:' + Visibility + '" data-toggle="dropdown">';
                AppHistory += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt=""></button><ul class="dropdown-menu pull-right">';
                AppHistory += '<li><a href="javascript:void(0);" onclick="OpenNotifyPopup(' + step + ', ' + valuesArray[step].Id + ');"><i class="fa fa-envelope-o" aria-hidden="true"></i> Send Notification';
                AppHistory += '</a></li><li style="display:none;"><a href="javascript:void(0);" onclick="DeleteStep(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i> Remove this Step</a></li><li>';
                AppHistory += '<a href="javascript:void(0);" onclick="OpenSuccessorModal(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\', \'' + valuesArray[step].StepName + '\');"><i class="fa fa-plus" aria-hidden="true"></i> Add a successor step</a></li>';
                AppHistory += '<li style="display:none;"><a href="javascript:void(0);" onclick="AddApprovers(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-users" aria-hidden="true"></i> Change Approvers </a>';
                AppHistory += '</li></ul></div><div class="approvelheadeing"><h3 class="mainheading" id="StartedStepName">' + valuesArray[step].StepName + '</h3></div>';
                AppHistory += '<div class="ForwardLinkBox"><p class="waitsec waitprocess" style="color:#e79406">Started, waiting for e-sign</p>';
                if (valuesArray[step].Forwarded == true) {
                    AppHistory += '<a class="waitsec waitprocess forwardLink" onclick="GetAllForwardee(' + valuesArray[step].Id + ');">Forwarded</a>';
                }
                AppHistory += '</div><div class="row">';

                if (valuesArray[step].Approvers.results != null) {
                    for (Appr = 0; Appr < valuesArray[step].Approvers.results.length; Appr++) {
                        AllApprovers.push(valuesArray[step].Approvers.results[Appr].Id);
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].Approvers.results[Appr].EMail);
                        AppHistory += '<div class="col-sm-6 flexitem">';
                        AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                        AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].Approvers.results[Appr].Title + '</h4>';
                        AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].Approvers.results[Appr].EMail + '\');">' + valuesArray[step].Approvers.results[Appr].EMail + '</a></div></div>';
                    }
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ApproversEmail);
                    AppHistory += '<div class="col-sm-6 flexitem">';
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                    AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].ApproversName + '</h4>';
                    AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ApproversEmail + '\');">' + valuesArray[step].ApproversEmail + '</a></div></div>';
                }
                AppHistory += '</div></li>';
            }
            else if (valuesArray[step].Status == "Pending") {
                arrayCopy = valuesArray.filter(function (f) { return f; });
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-2.png" alt=""></span>';
                AppHistory += '<div class="dropdown"><button class="dropdown-toggle"  style="display:' + Visibility + '" type="button" data-toggle="dropdown">';
                AppHistory += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt=""></button><ul class="dropdown-menu pull-right">';
                AppHistory += '<li><a href="javascript:void(0);" onclick="OpenNotifyPopup(' + step + ', ' + valuesArray[step].Id + ');"><i class="fa fa-envelope-o" aria-hidden="true"></i> Send Notification';
                AppHistory += '</a></li><li style="display:none;"><a href="javascript:void(0);" onclick="DeleteStep(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i> Remove this Step</a></li><li>';
                AppHistory += '<a href="javascript:void(0);" onclick="OpenSuccessorModal(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\', \'' + valuesArray[step].StepName + '\');"><i class="fa fa-plus" aria-hidden="true"></i> Add a successor step</a></li>';
                AppHistory += '<li style="display:none;"><a href="javascript:void(0);" onclick="AddApprovers(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-users" aria-hidden="true"></i> Change Approvers </a>';
                AppHistory += '</li></ul></div><div class="approvelheadeing"><h3 class="mainheading">' + valuesArray[step].StepName + '</h3></div>';
                AppHistory += '<div class="ForwardLinkBox"><p class="waitsec nostart">Pending</p>';
                if (valuesArray[step].Forwarded == true) {
                    AppHistory += '<a class="waitsec waitprocess forwardLink" onclick="GetAllForwardee(' + valuesArray[step].Id + ');">Forwarded</a>';
                }
                AppHistory += '</div><div class="row">';
                if (valuesArray[step].Approvers.results != null) {
                    for (Appr = 0; Appr < valuesArray[step].Approvers.results.length; Appr++) {
                        AllApprovers.push(valuesArray[step].Approvers.results[Appr].Id);
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].Approvers.results[Appr].EMail);
                        AppHistory += '<div class="col-sm-6 flexitem">';
                        AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                        AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].Approvers.results[Appr].Title + '</h4>';
                        AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].Approvers.results[Appr].EMail + '\');">' + valuesArray[step].Approvers.results[Appr].EMail + '</a></div></div>';
                    }
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ApproversEmail);
                    AppHistory += '<div class="col-sm-6 flexitem">';
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                    AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].ApproversName + '</h4>';
                    AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ApproversEmail + '\');">' + valuesArray[step].ApproversEmail + '</a></div></div>';
                }
                AppHistory += '</div></li>';
            }

            else if (valuesArray[step].Status == "Not Started") {
                arrayCopy = valuesArray.filter(function (f) { return f; });
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-2.png" alt=""></span>';
                AppHistory += '<div class="dropdown"><button class="dropdown-toggle"  style="display:' + Visibility + '" type="button" data-toggle="dropdown">';
                AppHistory += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/dotting.png" alt=""></button><ul class="dropdown-menu pull-right">';
                AppHistory += '<li><a href="javascript:void(0);" onclick="OpenNotifyPopup(' + step + ', ' + valuesArray[step].Id + ');"><i class="fa fa-envelope-o" aria-hidden="true"></i> Send Notification';
                AppHistory += '</a></li><li><a href="javascript:void(0);" onclick="DeleteStep(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-trash-o" aria-hidden="true"></i> Remove this Step</a></li><li>';
                AppHistory += '<a href="javascript:void(0);" onclick="OpenSuccessorModal(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\', \'' + valuesArray[step].StepName + '\');"><i class="fa fa-plus" aria-hidden="true"></i> Add a successor step</a></li>';
                AppHistory += '<li><a href="javascript:void(0);" onclick="AddApprovers(' + step + ', \'' + valuesArray[step].Sequence_No.toString() + '\');"><i class="fa fa-users" aria-hidden="true"></i> Change Approvers </a>';
                AppHistory += '</li></ul></div><div class="approvelheadeing"><h3 class="mainheading">' + valuesArray[step].StepName + '</h3></div>';
                AppHistory += '<p class="waitsec nostart">Not Started</p><div class="row">';
                if (valuesArray[step].Approvers.results != null) {
                    for (Appr = 0; Appr < valuesArray[step].Approvers.results.length; Appr++) {
                        AllApprovers.push(valuesArray[step].Approvers.results[Appr].Id);
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].Approvers.results[Appr].EMail);
                        AppHistory += '<div class="col-sm-6 flexitem">';
                        AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                        AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].Approvers.results[Appr].Title + '</h4>';
                        AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].Approvers.results[Appr].EMail + '\');">' + valuesArray[step].Approvers.results[Appr].EMail + '</a></div></div>';
                    }
                }
                else if (valuesArray[step].AskApprover == true) {
                    attachment = "https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";;
                    AppHistory += '<div class="col-sm-6 flexitem">';
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                    AppHistory += '<div class="imagecontent"><h4>Will be decide by ' + valuesArray[step].ApproverDecidingStep + ' Approvers.</h4>';
                    AppHistory += '<span></span></div></div>';
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ApproversEmail);
                    AppHistory += '<div class="col-sm-6 flexitem">';
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div>';
                    AppHistory += '<div class="imagecontent"><h4>' + valuesArray[step].ApproversName + '</h4>';
                    AppHistory += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ApproversEmail + '\');">' + valuesArray[step].ApproversEmail + '</a></div></div>';
                }
                AppHistory += '</div></li>';
            }
            else if (valuesArray[step].Status == "Approved") {
                var SignLinkHTML = '';
                if (valuesArray[step].AttachmentFiles.results.length > 0) {
                    if (valuesArray[step].AttachmentFiles.results.length == 1) {
                        SignLinkHTML += '<img class="ApproveSignImage" style="width:310px;float:right;" src="' + valuesArray[step].AttachmentFiles.results[0].ServerRelativePath.DecodedUrl + '" title="' + valuesArray[step].AttachmentFiles.results[0].FileName + '">';
                    }
                    else if (valuesArray[step].AttachmentFiles.results.length == 2 && (valuesArray[step].AttachmentFiles.results[0].FileName.includes("_Approved") == true || valuesArray[step].AttachmentFiles.results[1].FileName.includes("_Approved") == true)) {
                        for (var attach = 0; attach < valuesArray[step].AttachmentFiles.results.length; attach++) {
                            if (valuesArray[step].AttachmentFiles.results[attach].FileName.includes(".pdf") == true) { //to check if it's PDF
                                SignLinkHTML += '<div class="m-0  upload-chip" style="float:right;">';
                                SignLinkHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;" title="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);" id="btnLinkAttachment">' + valuesArray[step].AttachmentFiles.results[attach].FileName + '</span>';
                                SignLinkHTML += '<span class="chip-icon-box"><a href="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" name="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>';
                                SignLinkHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
                            }
                            else {
                                SignLinkHTML += '<img class="ApproveSignImage" style="width:310px;float:right;" src="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativePath.DecodedUrl + '" title="' + valuesArray[step].AttachmentFiles.results[attach].FileName + '">';
                            }
                        }
                    }
                    else {
                        for (var attach = 0; attach < valuesArray[step].AttachmentFiles.results.length; attach++) {
                            if (valuesArray[step].AttachmentFiles.results[attach].FileName.includes(SignSiffix) != true && valuesArray[step].AttachmentFiles.results[attach].FileName.includes("_Original") != true && valuesArray[step].AttachmentFiles.results[attach].FileName.includes("_Approved") != true) {
                                SignLinkHTML += '<div class="m-0  upload-chip" style="float:right;">';
                                SignLinkHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;"  onclick="ShowFileInIFrame(this);" data-fileurl="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" data-filename="' + valuesArray[step].AttachmentFiles.results[attach].FileName + '" title="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" id="btnLinkAttachment">' + valuesArray[step].AttachmentFiles.results[attach].FileName + '</span>';
                                SignLinkHTML += '<span class="chip-icon-box"><a href="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>';
                                SignLinkHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
                            }
                            else if (valuesArray[step].AttachmentFiles.results[attach].FileName.includes(".pdf") == true) { //to check if it's PDF
                                SignLinkHTML += '<div class="m-0  upload-chip" style="float:right;">';
                                SignLinkHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;" title="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);" id="btnLinkAttachment">' + valuesArray[step].AttachmentFiles.results[attach].FileName + '</span>';
                                SignLinkHTML += '<span class="chip-icon-box"><a href="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" name="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>';
                                SignLinkHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
                            }
                            else {
                                SignLinkHTML += '<img class="ApproveSignImage" style="width:310px;float:right;" src="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativePath.DecodedUrl + '" title="' + valuesArray[step].AttachmentFiles.results[attach].FileName + '">';
                            }
                        }
                    }
                }
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" alt=""></span>';
                AppHistory += '<div class="approvelheadeing"><h3 class="mainheading">' + valuesArray[step].StepName + '</h3><span class="date-sec">' + moment(valuesArray[step].Modified).format('DD-MMM-YYYY hh:mm A') + '<p> ' + (valuesArray[step].ActionByTimeZone ? valuesArray[step].ActionByTimeZone : "") + '</p></span>';
                AppHistory += '</div><div class="ForwardLinkBox"><p class="waitsec completed" style="color:#4e9a06">Approved by e-Signed</p>';
                if (valuesArray[step].Forwarded == true) {
                    AppHistory += '<a class="waitsec waitprocess forwardLink" onclick="GetAllForwardee(' + valuesArray[step].Id + ');">Forwarded</a>';
                }
                AppHistory += '</div><div class="row"><div class="col-sm-6 flexitem">';
                if (valuesArray[step].ApproverType == "User") {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ActionTakenby.EMail);
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                    AppHistory += '<h4>' + valuesArray[step].ActionTakenby.Title + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ActionTakenby.EMail + '\');">' + valuesArray[step].ActionTakenby.EMail + '</a></div></div>';
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ActionTakenbyApprover);
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                    AppHistory += '<h4>' + valuesArray[step].ApproversName + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ActionTakenbyApprover + '\');">' + valuesArray[step].ActionTakenbyApprover + '</a></div></div>';
                }
                AppHistory += '<div class="col-sm-6 flexitem ApproveAttach"><div class="signbox">' + SignLinkHTML + '<img src="reference/sign.png" alt=""></div></div></div>';
                if (valuesArray[step].Remarks != "" && valuesArray[step].Remarks != null) {
                    AppHistory += '<div class="remarkboxsec"><label for="">Remarks: </label><p>' + valuesArray[step].Remarks + '</p></div>';
                }
                AppHistory += '</li>';
            }
            else if (valuesArray[step].Status == "Reject" || valuesArray[step].Status == "Cancelled") {
                var SignLinkHTML = '';
                var StatusHTML = 'Cancelled';
                if (valuesArray[step].Status == "Reject") {
                    StatusHTML = "Rejected";
                }
                if (valuesArray[step].AttachmentFiles.results.length > 0) {
                    for (var attach = 0; attach < valuesArray[step].AttachmentFiles.results.length; attach++) {
                        if (valuesArray[step].AttachmentFiles.results[attach].FileName.includes(SignSiffix) != true && valuesArray[step].AttachmentFiles.results[attach].FileName.includes("_Original") != true && valuesArray[step].AttachmentFiles.results[attach].FileName.includes("_Approved") != true) {
                            SignLinkHTML += '<div class="m-0  upload-chip" style="float:right;">';
                            SignLinkHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;"  onclick="ShowFileInIFrame(this);" data-fileurl="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" data-filename="' + valuesArray[step].AttachmentFiles.results[attach].FileName + '" title="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" id="btnLinkAttachment">' + valuesArray[step].AttachmentFiles.results[attach].FileName + '</span>';
                            SignLinkHTML += '<span class="chip-icon-box"><a href="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>';
                            SignLinkHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
                        }
                        else {
                            SignLinkHTML += '<div class="m-0  upload-chip" style="float:right;">';
                            SignLinkHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;" title="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);" id="btnLinkAttachment">' + valuesArray[step].AttachmentFiles.results[attach].FileName + '</span>';
                            SignLinkHTML += '<span class="chip-icon-box"><a href="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" name="' + valuesArray[step].AttachmentFiles.results[attach].ServerRelativeUrl + '" download>';
                            SignLinkHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
                        }
                    }
                }
                AppHistory += '<li id="DocQueue' + valuesArray[step].Sequence_No + '"><span class="iconbox"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" alt=""></span>';
                AppHistory += '<div class="approvelheadeing"><h3 class="mainheading">' + valuesArray[step].StepName + '</h3><span class="date-sec">' + moment(valuesArray[step].Modified).format('DD-MMM-YYYY hh:mm A') + '<p> ' + (valuesArray[step].ActionByTimeZone ? valuesArray[step].ActionByTimeZone : "") + '</p></span>';
                AppHistory += '</div><div class="ForwardLinkBox"><p class="waitsec completed" style="color:red">' + StatusHTML + ' by e-Signed</p>'
                if (valuesArray[step].Forwarded == true) {
                    AppHistory += '<a class="waitsec waitprocess forwardLink" onclick="GetAllForwardee(' + valuesArray[step].Id + ');">Forwarded</a>';
                }
                AppHistory += '</div>' + SignLinkHTML + '<div class="row"><div class="col-sm-6 flexitem">';
                if (valuesArray[step].ApproverType == "User") {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ActionTakenby.EMail);
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                    AppHistory += '<h4>' + valuesArray[step].ActionTakenby.Title + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ActionTakenby.EMail + '\');">' + valuesArray[step].ActionTakenby.EMail + '</a></div></div>';
                }
                else {
                    attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].ActionTakenbyApprover);
                    AppHistory += '<div class="imgsetion"><img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                    AppHistory += '<h4>' + valuesArray[step].ApproversName + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].ActionTakenbyApprover + '\');">' + valuesArray[step].ActionTakenbyApprover + '</a></div></div>';
                }
                AppHistory += '<div class="col-sm-6 flexitem"><div class="signbox"><img src="reference/sign.png" alt=""></div></div>';
                AppHistory += '<div class="col-sm-6 flexitem"></div>';
                AppHistory += '</div><div class="remarkboxsec"><label for="">Remarks:</label><p>' + valuesArray[step].Remarks + '</p></div></li>';
            }
        }
    });
    $("#ApprovalHistoryArea").empty().append(AppHistory);
    $("#approvalhistory").modal('show');
}
//Send Notification Mail methods starts ----------------------
//to open and pass values for sending mail
function OpenNotifyPopup(Index, ItemId) {
    $("#notificationbtn").modal("show");
    EmptyPeoplePicker("NotifyMailPicker");
    $("#SendMailFooter").empty().append('<button type="button" class="btn custom-btn" id="btnSendNotify">Submit</button>');
    if (arrayCopy[Index].Approvers.results != null) {
        for (Appr = 0; Appr < arrayCopy[Index].Approvers.results.length; Appr++) {
            SetAndResolvePeoplePicker('NotifyMailPicker', arrayCopy[Index].Approvers.results[Appr].EMail, false); //set Approvers in Send Notify modal
        }
    }
    $("#btnSendNotify").click(function () {
        if ($.trim($("#txtNotifyMsg").val()) != "") {
            SendEmail(arrayCopy[Index], ItemId);
        }
        else {
            alert("Kindly enter your message.");
            return false;
        }
    });
}

//send email notification to Approvers
function SendEmail(valuesArray, ItemId) {
    var arrToUserEmail = [];
    var arrApproversName = [];
    var arrTempEmail = [];
    DashboardLink = _spPageContextInfo.webAbsoluteUrl + "/Pages/Document.aspx";
    arrToUserEmail = getApproverEmailIds("NotifyMailPicker", arrApproversName);
    if (arrToUserEmail.length != 0) {
        //get Adobe sign URL for approververs
        for (var appr = 0; appr < arrToUserEmail.length; appr++) {
            var arrTemplate = GetEmailTemplate(12);
            var commonBodyContentsNotification = arrTemplate[0].Body;
            var emailSubject = arrTemplate[0].Subject;
            emailSubject = emailSubject.replace("{{InitiatorName}}", $("#InitiatorDisplayName").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{FileName}}", $("#FileName").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{DocType}}", $("#FileDocType").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{Purpose}}", $("#txtPurposeHistory").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{Approvers}}", arrApproversName.toString());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{StepName}}", valuesArray.StepName);
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{InitiatorName}}", $("#InitiatorDisplayName").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{InitiatorName}}", $("#InitiatorDisplayName").text());
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{description}}", $("#txtNotifyMsg").val());
            var AdobeSignLink = getHistorySignLink(arrToUserEmail[appr], ItemId);
            arrTempEmail = [];
            arrTempEmail.push(arrToUserEmail[appr]);
            commonBodyContentsNotification = commonBodyContentsNotification.replace("{{FilePath}}", DashboardLink);
            /*if (AdobeSignLink != "" && AdobeSignLink != null) {
                commonBodyContentsNotification = commonBodyContentsNotification.replace("{{FilePath}}", AdobeSignLink);
            }
            else {
                commonBodyContentsNotification = commonBodyContentsNotification.replace('<div><a href="{{FilePath}}">Click here</a> to approve this request.</div>', "");
            }*/
            var Metadata;
            Metadata = {
                'properties': {
                    '__metadata': {
                        'type': 'SP.Utilities.EmailProperties'
                    },
                    'From': _spPageContextInfo.userEmail,
                    'To': {
                        'results': arrTempEmail
                    },
                    /*'CC': {
                        'results': taskCCUsersUsers
                    },*/
                    'Body': commonBodyContentsNotification,
                    'Subject': emailSubject
                }
            };
            var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
            $.ajax({
                contentType: 'application/json',
                url: sitetemplateurl,
                type: "POST",
                data: JSON.stringify(Metadata),
                async: false,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    if(arrToUserEmail.length == (appr + 1)) {
                        alert("Message has been sent.");
                        $("#notificationbtn").modal("hide");
                        $("#txtNotifyMsg").val('');
                    }
                },
                error: function (err) {
                    console.log("SendEmailSharedNotification  " + JSON.stringify(err));
                }
            });
        }
    }
    else {
        alert("Kindly enter approver's name.");
        return false;
    }
}

//get user information from people picker
function getApproverEmailIds(PeoplepickerId, arrApproversName) {
    // Get the people picker object from the page.
    var arrEmails = [];
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
                arrEmails.push(users[i].EntityData.Email);
                arrApproversName.push(users[i].DisplayText);
            }
            return arrEmails;
        }
    } else {
        return arrEmails;
    }
}


//get email template to send mail
function GetEmailTemplate(filterItemId) {
    var items = [];
    var RestQuery = "?$select=ID,Body,Subject,EmailType,Title&$filter=Title eq '" + filterItemId + "'";
    $.when(getItemsWithQuery("EmailTemplate", RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (EmailTemplate) {
        items = EmailTemplate;
    });
    return items;
}

//get Adobe sign link for approvers
function getHistorySignLink(ApproverEmail, ItemId) {
    var SignLink = '';
    var Query = "?$select=ItemID,ApproverSignLink,ApproversEmail&$filter=ItemID eq '" + ItemId + "' and ApproversEmail eq '" + ApproverEmail + "' ";
    $.when(getItemsWithQuery("DocumentSigningLink", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (AdobeLink) {
        if (AdobeLink.length > 0) {
            SignLink = AdobeLink[0].ApproverSignLink.Url;
        }
    });
    return SignLink;
}

//empty the people picker
function EmptyPeoplePicker(peoplePickerId) {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
    var usersobject = peoplePicker.GetAllUserInfo();
    usersobject.forEach(function (index) {
        peoplePicker.DeleteProcessedUser(usersobject[index]);
    });
}

//set name in People picker
function SetAndResolvePeoplePicker(controlNameID, LoginNameOrEmail, peoplePickerDisable) {
    var peoplePickerDiv = $("[id^='" + controlNameID + "']");
    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[1].id];
    peoplePicker.AddUserKeys(LoginNameOrEmail);
    if (peoplePickerDisable == true) {
        $('#' + controlNameID + '_TopSpan_EditorInput').attr('disabled', true);
        $('.sp-peoplepicker-delImage').hide();
    }
}
//Send Notification Mail methods ends ----------------------

//Add a successor step methods starts ----------------------
function OpenSuccessorModal(Index, currentSequence) {
    $("#AddSuccStep").show();
    $("#AddEditStep").hide();
    $("#btnChangeApprovers").hide();
    onChangeTask('ApproverName_TopSpan', 'ApproverName', 'userHTMLBox', 1);
    $("#parentAddSuccStep").empty().append('<button type="button" class="btn custom-btn" id="AddSuccStep">Add Successor step</button>');
    $("#addsuccessor").modal("show");
    $("#AddSuccStep").click(function () {
        if ($.trim($("#AddEditStepName").val()) != "") {
            if ($("#userHTMLBox").html() != "") {
                AddSuccessorStep(arrayCopy[Index], Index, currentSequence, arrayCopy);
            }
            else {
                if ($.trim($("#OutsiderName").val()) != "" && $.trim($("#OutsiderEmail").val()) && isEmail($("#OutsiderEmail").val()) != false) {
                    AddSuccessorStep(arrayCopy[Index], Index, currentSequence, arrayCopy);
                }
                else {
                    alert("Kindly fill the approver's name or correct the email format.");
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
}

//check Email Validation
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

//to add SuccesorStep 
function AddSuccessorStep(valuesArray, Index, currentSequence, CompleteArray) {
    //var StepCount = $('#accordionapprovers .StepClass').length + 1;
    var ApprovalStep = '',
        AppHistory = '',
        ApproverType = '',
        arrTempApprovers = [],
        step = parseInt(Index) + 1,
        AddedSequence = parseInt(currentSequence) + 1,
        StepName = $("#AddEditStepName").val();

    //Add new Sequence in list starts
    if (EmpIds[0] == "NA" || EmpIds[0] == null) {
        arrTempApprovers = [];
        ApproverType = "Outsider";
    }
    else {
        ApproverType = "User";
        EmpIds.filter(function (data) {
            arrTempApprovers.push(parseInt(data));
        });
    }
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    AllApprovers = AllApprovers.concat(arrTempApprovers);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        RequestID: valuesArray.RequestID,
        Title: $("#FileName").text(),
        Sequence_No: AddedSequence,
        StepName: StepName,
        ApproversId: { 'results': arrTempApprovers },
        OriginDMS: CopyLibrary,
        LibraryLink: CopySourceURL,
        DocumentID: parseInt(DocumentId),
        ApproverType: ApproverType,
        Status: "Not Started"
    };
    if (EmpIds[0] == "NA" || EmpIds[0] == null) {
        Metadata["ApproversEmail"] = $("#OutsiderEmail").val();
        Metadata["ApproversName"] = $("#OutsiderName").val();
    }
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalQueue')/items",
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(Metadata),
        success: function (data) {
            var arrUpdateIds = [];
            var arrSeq = [];
            for (var j = Index + 1; j < CompleteArray.length; j++) {
                arrUpdateIds.push(CompleteArray[j].Id);
                arrSeq.push(CompleteArray[j].Sequence_No);
            }
            ChangeSequenceSumber("Add", arrSeq, arrUpdateIds);
            UpdateAllApprovers(CompleteArray[0].RequestID);
            $("#addsuccessor").modal('hide');
            BindApprovalHistory(CompleteArray[0].RequestID);
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    $(".closeAddEditModal").trigger('click');
}

//update Sequence number when adding/removing any step
function ChangeSequenceSumber(Action, arrSeq, UpdateIds) {
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    var NewSeqNo = 0;
    for (var id = 0; id < UpdateIds.length; id++) {
        if (Action == "Add") {
            NewSeqNo = arrSeq[id] + 1;
        }
        else {
            NewSeqNo = arrSeq[id] - 1;
        }
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            Sequence_No: parseInt(NewSeqNo)
        }
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalQueue')/GetItemById('" + UpdateIds[id] + "')",
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
                //DO nothing
            },
            eror: function (data) {
                console.log("An error occurred while deleting task. " + JSON.stringify(data));
            }
        });
    }
}


//on change people picker
function onChangeTask(HTMLID, PplPickerId, userHTMLId, StepCount) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var StringId = '';
    picker.OnValueChangedClientScript = function (elementId, userInfo) {
        user = '';
        if (userInfo.length > 0) {
            $(".userBox").show();
            //$(".peoplepickerbox").show();
            tempUserId = parseInt(getUserInformation(PplPickerId, multipleEmailAddress, assignUserName));
            EmpIds.push(tempUserId);
            var tempEmail = userInfo[0].Key.split('|')[2];
            if(tempEmail!=undefined||tempEmail!='undefined'||tempEmail!=null||tempEmail!='null')//Bhawana
            {
                if (tempEmail.includes('#') == true) {
                    tempEmail = tempEmail.replace("#ext#@adaptindia.onmicrosoft.com", '');
                    tempEmail = tempEmail.replace("_", '@');
                }
                multipleEmailAddress.push(tempEmail);
                assignUserName.push(userInfo[0].DisplayText);
                var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                user += '<div class="col-sm-6 parentremove">';
                user += '<div class="employeesection"><span class="crosebox" onclick="removeUserBox(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');">';
                user += '<i class="fa fa-times"></i></span><div class="empoyeeimg"><img src="' + attachment + '" alt="">';
                user += '</div><div class="employeeinfo"><h3>' + userInfo[0].DisplayText + '</h3>';
                user += '<span class="employeeemail" style="cursor:pointer;" onclick="OpenEmail(\'' + tempEmail + '\');">' + tempEmail + '</span></div></div></div>';
                $("#" + userHTMLId).append(user);
                EmptyPeoplePicker(PplPickerId);
            }
        }
        else {
            //$("#userList").hide();
        }
    };
}

//get user information from people picker
function getUserInformation(PeoplepickerId, multipleEmailAddress, assignUserName, StepCount) {
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
                // UsersID += GetUserID(users[i].Key);
                var accountName = users[i].Key;
                users[i].EntityData.Email; users[i].DisplayText;
                var userId = GetUserID(accountName);
                if (userId != -1) {
                    if (uniqueValues.indexOf(userId) == -1) {
                        uniqueValues.push(userId);
                        userIds.push(userId);
                    }
                }
                else {
                    userIds.push(parseInt(users[i].EntityData.SPGroupID));
                }
            }
            return userIds;
        }
    } else {
        return UsersID;
    }
}

// Get the user ID.
function GetUserID(logonName) {
    var item = {
        'logonName': logonName
    }
    var userId = -1;
    var UserId = $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + '/_api/web/ensureuser',
        type: 'POST',
        async: false,
        contentType: 'application/json;odata=verbose',
        data: JSON.stringify(item),
        headers: {
            'Accept': 'application/json;odata=verbose',
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
        },
        success: function (data) {
            userId = data.d.Id;
        },
        error: function (data) {
            console.log(data)
            waitingDialog.hide();
        }
    })
    return userId;

}

function OpenEmail(Email) {
    window.location = "mailto:" + Email;
}

//remove user from each step
function removeUserBox(Action, Email, DisplayName, EmpId, count) {
    $(Action).parents('.parentremove').remove();
    var arrTemp = [];
    var IndexId = count - 1;
    multipleEmailAddress = multipleEmailAddress.filter(function (obj) {
        return obj.toLowerCase() !== Email.toLowerCase();
    });
    assignUserName = assignUserName.filter(function (obj) {
        return obj.toLowerCase() !== DisplayName.toLowerCase();
    });
    EmpIds = EmpIds.filter(function (obj) {
        return obj != EmpId;
    });
    if (multipleEmailAddress.length == 0) {
        $(".userBox").hide();
    }
}

//Add/Edit Approvers methods starts ----------------------
function AddApprovers(Index, currentSequence) {
    $("#AddSuccStep").hide();
    $("#AddEditStep").hide();
    $("#btnChangeApprovers").show();
    onChangeTask('ApproverName_TopSpan', 'ApproverName', 'userHTMLBox', 1);
    $("#addsuccessor").modal("show");
    BindApprovers(arrayCopy[Index], Index, currentSequence, arrayCopy);
}

//Bind the approvers of selected step
function BindApprovers(valuesArray, Index, currentSequence, CompleteArray) {
    $("#SuccessorStepHeader").text("Edit Step");
    var user = '';
    multipleEmailAddress = [];
    assignUserName = [];
    EmpIds = [];
    $("#AddEditStepName").val(valuesArray.StepName);
    if (valuesArray.Approvers.results != null) {//User value
        $("#userselection").prop("checked", "checked");
        $("#userbox-1").show();
        $("#userbox-2").hide();
        $(".userBox").show();
        $("#OutsiderName").val('');
        $("#OutsiderEmail").val('');
        for (var usr = 0; usr < valuesArray.Approvers.results.length; usr++) {
            multipleEmailAddress.push(valuesArray.Approvers.results[usr].EMail);
            assignUserName.push(valuesArray.Approvers.results[usr].Title);
            EmpIds.push(valuesArray.Approvers.results[usr].Id);
            var attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray.Approvers.results[usr].EMail);
            user += '<div class="col-sm-6 parentremove">';
            user += '<div class="employeesection"><span class="crosebox" onclick="removeUserBox(this, \'' + valuesArray.Approvers.results[usr].EMail + '\', \'' + valuesArray.Approvers.results[usr].Title + '\', ' + valuesArray.Approvers.results[usr].Id + ');">';
            user += '<i class="fa fa-times"></i></span><div class="empoyeeimg"><img src="' + attachment + '" alt="">';
            user += '</div><div class="employeeinfo"><h3>' + valuesArray.Approvers.results[usr].Title + '</h3>';
            user += '<span class="employeeemail" style="cursor:pointer;" onclick="OpenEmail(\'' + valuesArray.Approvers.results[usr].EMail + '\');">' + valuesArray.Approvers.results[usr].EMail + '</span></div></div></div>';
        }
        $("#userHTMLBox").empty().append(user);
    }
    else { //OutsiderValue
        $("#outsidesetion").prop("checked", "checked");
        $("#OutsiderName").val(valuesArray.ApproversName);
        $("#OutsiderEmail").val(valuesArray.ApproversEmail);
        $("#userbox-1").hide();
        $("#userbox-2").show();
        $("#userHTMLBox").empty();
        multipleEmailAddress.push(valuesArray.ApproversEmail);
        assignUserName.push(valuesArray.ApproversName);
        EmpIds.push("NA");
    }
    $("#parentChangeApp").empty().append('<button type="button" class="btn custom-btn" id="btnChangeApprovers">Change Approvers</button>');
    $("#btnChangeApprovers").click(function () {
        if ($.trim($("#AddEditStepName").val()) != "") {
            if ($("#userHTMLBox").html() != "") {
                updateApprovers(valuesArray.Id);
            }
            else {
                if ($.trim($("#OutsiderName").val()) != "" && $.trim($("#OutsiderEmail").val()) && isEmail($("#OutsiderEmail").val()) != false) {
                    updateApprovers(valuesArray.Id);
                }
                else {
                    alert("Kindly fill the approver's name or correct the email format.");
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
}

//Change approvers functionality
function updateApprovers(UpdateId, ChangedType) {
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    var arrTempApprovers = [];
    var ChangedType = '';
    var InValidUser = [];
    if(currentSigningApp != "Adobe Sign") {
        for (var usr = 0; usr < EmpIds.length; usr++) {
            UserValid = checkUserValid(multipleEmailAddress[usr]);
            if(UserValid == false) {
                InValidUser.push(assignUserName[usr]);
                multipleEmailAddress = multipleEmailAddress.filter(function (obj) {
                    return obj.toLowerCase() !== multipleEmailAddress[usr].toLowerCase();
                });
                assignUserName= assignUserName.filter(function (obj) {
                    return obj.toLowerCase() !== assignUserName[usr].toLowerCase();
                });
                EmpIds = EmpIds.filter(function (obj) {
                    return obj != EmpIds[usr];
                });
            }
        }
    }
    if(currentSigningApp != "Adobe Sign") {
        if(InValidUser.length > 0){
            alert(InValidUser.join(', ') + " user(s) are not valid.");
        }
    }

    if(EmpIds.length > 0) {
        if (EmpIds[0] != "NA" && EmpIds[0] != null) {
            ChangedType = 'User';
            EmpIds.filter(function (data) {
                arrTempApprovers.push(parseInt(data));
            });
        }
        else {
            ChangedType = 'Outsider';
        }
        AllApprovers = AllApprovers.concat(arrTempApprovers);
        Metadata = {
            __metadata: {
                'type': ItemType
            },
            StepName: $("#AddEditStepName").val(),
            ApproversId: { 'results': arrTempApprovers },
            ApproverType: ChangedType
        }
        if (EmpIds[0] == "NA" || EmpIds[0] == null) {
            Metadata["ApproversEmail"] = $("#OutsiderEmail").val();
            Metadata["ApproversName"] = $("#OutsiderEmail").val();
        }
	
        var dfd = $.Deferred();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentApprovalQueue')/GetItemById('" + UpdateId + "')",
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
                alert("Approver(s) has been changed.");
                $("#addsuccessor").modal('hide');
                UpdateAllApprovers(currentRequestId);
                BindApprovalHistory(currentRequestId);
            },
            eror: function (data) {
                console.log("An error occurred while changing approvers. " + JSON.stringify(data));
            }
        });
    }
    else {
        alert("Kindly fill the approver's name or correct the email format.");
        return false;
    }
}
//delete the Step
function DeleteStep(Index, currentSequence) {
    if (confirm('Are you sure to delete this step?')) {
        if(arrayCopy[Index].Approvers.results != null) {
            for(usr=0; usr < arrayCopy[Index].Approvers.results.length; usr++) {
                AllApprovers = AllApprovers.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
            }
        }

        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DocumentApprovalQueue')/items(" + arrayCopy[Index].Id + ")",
            type: "POST",
            headers: {
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            success: function (data) {
                var arrUpdateIds = [];
                var arrSeq = [];
                for (var j = Index + 1; j < arrayCopy.length; j++) {
                    arrUpdateIds.push(arrayCopy[j].Id);
                    arrSeq.push(arrayCopy[j].Sequence_No);
                }
                ChangeSequenceSumber("Subtract", arrSeq, arrUpdateIds);
                UpdateAllApprovers(arrayCopy[0].RequestID);
                BindApprovalHistory(arrayCopy[0].RequestID);
                alert("Selected step has been deleted successfully.");
            },
            error: function (data) {
                alert(data.responseJSON.error);
            }
        });
    }
}


//To preview the Sign PDF
function priviewfile(Action) {
    src = Action.name + "?web=1";
    if (Action.name == null) {
        src = Action.title + "?web=1";
    }
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
//Approval History code ends----------------------------

//Approval Process code starts----------------------------

//remove the attachment for Sign 
function removeLineSign(id, FileName) {
    var index = id.split('_')[1];
    $("#" + id).remove();
    SignUploadFile = SignUploadFile.filter(function( obj ) {
        return obj.name !== FileName;
    });
    $("#ImageSignUpload").val('');
}

function ReinitializeArray(arr) {
    var newArr = [];
    var count = 0;
    for(var i=0; i < arr.length; i++) {
        newArr[count++] = arr[i];
    }
    return newArr;
}

//Approval Validation before Approve the document
function ApprovalValidation() {
    if($("#AskAppArea .RuntimeClass").length > 0) {
        for(var k=0; k<$("#AskAppArea .RuntimeClass").length;k++){
            arrAskApprover = getUserIds($("#AskAppArea .RuntimeClass")[k].id);
            if(arrAskApprover.length == 0){
                //alert('Kindly enter approver(s) for next step.');
                break;
            }
        }
    	if(arrAskApprover.length == 0) { return false;}
    }
	
    if($("#chkApproved").prop('checked') == true){
        if ($("#chkSignImage").prop('checked') == true) {		//Upload Image
            if($("#chkApproved").prop('checked') == false || $("#SignFile").html() == '') {
                return false;
            }
            else {
                return true;
            }
        }
        else if ($("#chkSignType").prop('checked') == true) {	//Type Image
            if($("#txtSignType").val().trim() == "") {
                return false;
            }
            else {
                return true;
            }
        }
        else {											//Draw Image
            return true;
        }
    }
    else {
        return false;
    }
}

function getUserIds(PeoplepickerId) {
    // Get the people picker object from the page. 
    var userIds = [];
    var uniqueValues = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if (peoplePicker != null) {
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
                    // UsersID += GetUserID(users[i].Key);
                    var accountName = users[i].Key;
                    users[i].EntityData.Email; users[i].DisplayText;
                    var userId = GetUserID(accountName);
                    if (userId != -1) {
                        if (uniqueValues.indexOf(userId) == -1) {
                            uniqueValues.push(userId);
                            userIds.push(userId);
                        }
                    }
                    else {
                        //userIds.push(parseInt(users[i].EntityData.SPGroupID));
                    }
                }
                return userIds;
            }
        } else {
            return userIds;
        }
    }
    else {
        return userIds;
    }
}

//get the IP address of LOgged-In user's machine
function getIPAddress(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.ipify.org/?format=json", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            CurrentIpAddress = JSON.parse(this.responseText).ip;
        }
        else {
            $.getJSON("https://api.ipify.org/?format=json", function(e) {
                CurrentIpAddress = e.ip;
            });
        }
    };
    
}

//Approval process for 'Approved'
function ApproveStep(AddedStatus) {
    var StartedItemID = [];
    var StepsArray = [];
    var arrNextApprovrs = [];
    var CurrentIndex = 0;
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    var Query = "?$select=*,Approvers/EMail,Approvers/Title,Approvers/Id,AttachmentFiles&$expand=Approvers,AttachmentFiles&$filter=RequestID eq '" + currentRequestID + "'";
    $.when(getItemsWithQuery('DocumentApprovalQueue', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalResults) {
        if (ApprovalResults.length > 0) {
            StartedItemID = ApprovalResults.filter(function (data) {
                return data.Status == "Started";
            });
            CurrentIndex = ApprovalResults.findIndex(x => x.Status == "Started");
            StepsArray = ApprovalResults.filter(function (f) { return f; });
            if(CurrentIpAddress == undefined || CurrentIpAddress == null) {
                CurrentIpAddress = '';
            }
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Status: AddedStatus,
                Remarks: $("#txtApproveRemarks").val(),
                ActionTakenbyId: _spPageContextInfo.userId,
                ActionTakenbyApprover: _spPageContextInfo.userEmail,
                UserIPAddress: CurrentIpAddress,
                ActionByTimeZone: LoggedIn_TimeZone
            };
            if(StartedItemID[0].ApproverType == "User") {
                Metadata["ActionTakenbyApprover"] = '';
            }
            else {
                Metadata["ActionTakenbyId"] = 0;
            }   
            if ($("#chkSignImage").prop('checked') == true) { //Upload Image
                Metadata["SignType"] = 'SignImage';
                Metadata["DrawSign"] = SignBaseValue;
                RestApprovalStep(Metadata, StartedItemID, StepsArray, CurrentIndex, ItemType, AddedStatus);
            }
            else if ($("#chkSignType").prop('checked') == true) { //Type Image
                Metadata["SignType"] = 'SignText';
                SignUploadFile = [];
                var node = document.getElementById('txtSignType');
                domtoimage.toPng(node)
                    .then (function (dataUrl) {
                        Metadata["DrawSign"] = dataUrl;
                        var img = new Image();
                        var file = dataURLtoFile(dataUrl, $("#txtSignType").val().trim() + window.btoa("_AdaptSignature") + ".png");
                        SignUploadFile.push(file);
                        RestApprovalStep(Metadata, StartedItemID, StepsArray, CurrentIndex, ItemType, AddedStatus);
                    })
                    .catch(function (error) {
                        console.error('oops, something went wrong!', error);
                    });
            }
            else { //Draw Image
                Metadata["SignType"] = 'SignDraw';
                SignUploadFile = [];
                var node = document.getElementById('bcPaintCanvas');
                domtoimage.toPng(node)
                .then (function (dataUrl) {
                    Metadata["DrawSign"] = dataUrl;
                    var img = new Image();
                    var file = dataURLtoFile(dataUrl, _spPageContextInfo.userDisplayName.split(' ')[0] + window.btoa("_AdaptSignature") + ".png");
                    SignUploadFile.push(file);
                    RestApprovalStep(Metadata, StartedItemID, StepsArray, CurrentIndex, ItemType, AddedStatus);
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
            }                    
        }
    });
}

function RestApprovalStep(Metadata, StartedItemID, StepsArray, CurrentIndex, ItemType, AddedStatus) {
    var NextStatus = '';
    var CancelRemarks = '';
    var IsAllEmpActive = [];
    var NextStepArray = [];
    $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalQueue", Metadata, StartedItemID[0].Id)).done(function (Process) {
        if (FinalFiles4Upload.length > 0) {
            UploadSupportedFiles(StartedItemID[0].Id, 'DocumentApprovalQueue', '');
        }
        uploadSgnedImage(StartedItemID[0].Id, 'DocumentApprovalQueue');
        //get the next stepArray 
        var NextSeqNumber = parseInt(StepsArray[CurrentIndex].Sequence_No) + 1;
        NextStepArray = StepsArray.filter(function (obj) {
            return parseInt(obj.Sequence_No) == NextSeqNumber;
        });
        
        if (typeof NextStepArray[0] != 'undefined') {
            //if AskApprover is true for next step
            if (NextStepArray[0].AskApprover == true) {
                NextStatus = 'Started';
                CancelRemarks = '';
            }
            else {
                //It runs if next step exists
                if (NextStepArray[0].ApproverType == "User") { // it will check the status of next approvers starts------------------
                    for (nextApp = 0; nextApp < NextStepArray[0].Approvers.results.length; nextApp++) {
                        IsAllEmpActive.push(checkEMpAuthencity(NextStepArray[0].Approvers.results[nextApp].EMail));
                    }

                    if (checker(IsAllEmpActive) == false) {
                        NextStatus = 'Cancelled';
                        CancelRemarks = 'Cancelled due the next approver is Inactive.';
                    }
                    else {
                        NextStatus = 'Started';
                        CancelRemarks = '';
                    }
                }
                else {
                    NextStatus = 'Started';
                    CancelRemarks = '';
                }
            }
            // it will check the status of next approvers ends------------------
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Status: NextStatus,
                Remarks: CancelRemarks
                /*ApproversId: {
                    'results': []
                }*/
            };
            //Update RunTime approvers if availble
            arrAskApprover = [];
            if($("#AskAppArea .RuntimeClass").length > 0) {
                var arrRunTimeApp = [];
                for(var k=0; k<$("#AskAppArea .RuntimeClass").length;k++){
                    arrRunTimeApp = getUserIds($("#AskAppArea .RuntimeClass")[k].id);
                    arrAskApprover = arrAskApprover.concat(arrRunTimeApp);
                    UpdateAskApprover($("#AskAppArea .RuntimeClass")[k].id.replace('pplDecidingApp',''), arrRunTimeApp);
                }
            }
            /*if (NextStepArray[0].AskApprover == true) {
                if(arrAskApprover.length > 0) {
                    Metadata['ApproversId'].results = arrAskApprover;
                }
                else {
                    delete Metadata["ApproversId"];
                }
            }
            else {
                delete Metadata["ApproversId"];
                if (arrAskApprover.length > 0) {
                    var InCount = CurrentIndex + 2;
                    while (StepsArray[InCount] != null) {
                        if (StepsArray[InCount].AskApprover == true && StepsArray[InCount].ApproverDecidingStep == StepsArray[CurrentIndex].StepName) {
                            UpdateAskApprover(StepsArray[InCount].Id);
                            break;
                        }
                        else {
                            InCount++;
                        }
                    }
                }
            }*/
            //Change the status of next step to 'Started'
            $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalQueue", Metadata, NextStepArray[0].Id)).done(function (Process) {

                ItemType = GetItemTypeForListName('DocumentApprovalRequests');
                //Next Step
                arrNextApprovrs = []; var arrRunTimeApp = [];
                if($("#AskAppArea .RuntimeClass").length > 0) {
                    arrRunTimeApp = getUserIds($("#AskAppArea .RuntimeClass")[0].id);
                }
                if (NextStepArray[0].AskApprover == true && arrRunTimeApp.length > 0) {
                    arrNextApprovrs = arrRunTimeApp.filter(function (f) { return f; });
                }
                else {
                    if (NextStepArray[0].ApproverType == "User") {
                        for (nextApp = 0; nextApp < NextStepArray[0].Approvers.results.length; nextApp++) {
                            arrNextApprovrs.push(NextStepArray[0].Approvers.results[nextApp].Id);
                        }
                    }
                    else {
                        arrNextApprovrs.push(NextStepArray[0].ApproversEmail)
                    }
                }

                Metadata = {
                    __metadata: {
                        'type': ItemType
                    },
                    //Status: AddedStatus,
                    LastActionbyId: _spPageContextInfo.userId,
                    LastActionApprover: _spPageContextInfo.userEmail,
                    NextActionbyId: {
                        'results': arrNextApprovrs
                    },
                    NextActionApprover: arrNextApprovrs[0],
                    NextAction: NextStepArray[0].StepName,
                    LastAction: StartedItemID[0].StepName,
                    AllApproversId: {
                        'results': []
                    }
                };
                //Previous Step
                if (StartedItemID[0].ApproverType == "User") {
                    Metadata["LastActionApprover"] = '';
                }
                else {
                    Metadata["LastActionbyId"] = 0;
                }

                //Next Step
                if (NextStepArray[0].ApproverType == "User") {
                    Metadata["NextActionApprover"] = '';
                }
                else {
                    Metadata["NextActionbyId"].results = [];
                }
                if (NextStatus == 'Cancelled' && NextStepArray[0].ApproverType == "User") {
                    Metadata["NextActionbyId"].results = [];
                    Metadata["NextAction"] = '';
                    Metadata["Status"] = 'Cancelled';
                }
                if (arrAskApprover.length > 0) {
                    Metadata['AllApproversId'].results = allApproverApproval.concat(arrAskApprover);
                }
                else {
                    delete Metadata["AllApproversId"];
                }
                //Change DocumentApprovalRequests list
                $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalRequests", Metadata, NextStepArray[0].RequestID)).done(function (Process) {
                    //UpdateDocLibrary(StartedItemID, false, AddedStatus); //Update the selecetd DMS
                    GetApprovalInbox();
                    if (AddedStatus == "Approved") {
                        $("#approvalActionModal").modal('hide');
                        $("#txtApproveRemarks").val('');
                        $("#SignFile").empty();
                        $("#chkApproved").prop('checked', '');
                        $("#ImageSignUpload").val('');
                        $("#bcPaint-reset").trigger("click");
                        $("#txtSignType").val('');
                        $("#chkSignType").prop('checked', 'checked');
                        $("#chkSignType").trigger("change");
                        SignUploadFile = [];
                        allApproverApproval = [];
                        arrAskApprover = [];
                        alert("Document has been approved.");
                    }
                    else {
                        $("#txtRejectRemark").val('');
                        $("#approvalRejectionModal").modal('hide');
                        $("#chkRejected").prop('checked', '');
                        $("#SignFile").empty();
                        alert("Document has been rejected.");
                    }
                    $("#documentApprovalAction").modal('hide');
                    waitingDialog.hide();
                });
            });
        }
        else {
            ItemType = GetItemTypeForListName('DocumentApprovalRequests');
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Status: AddedStatus,
                LastActionbyId: _spPageContextInfo.userId,
                LastActionApprover: _spPageContextInfo.userEmail,
                NextActionbyId: {
                    'results': []
                },
                NextActionApprover: '',
                NextAction: '',
                LastAction: StartedItemID[0].StepName,
            };
            //Change DocumentApprovalRequests list
            $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalRequests", Metadata, StartedItemID[0].RequestID)).done(function (Process) {
                //UpdateDocLibrary(StartedItemID, true, AddedStatus); //Update the selecetd DMS
                GetApprovalInbox();
                if (AddedStatus == "Approved") {
                    $("#approvalActionModal").modal('hide');
                    $("#txtApproveRemarks").val('');
                    $("#SignFile").empty();
                    $("#chkApproved").prop('checked', '');
                    $("#ImageSignUpload").val('');
                    $("#bcPaint-reset").trigger("click");
                    $("#txtSignType").val('');
                    $("#chkSignType").prop('checked', 'checked');
                    $("#chkSignType").trigger("change");
                    SignUploadFile = [];
                    allApproverApproval = [];
                    arrAskApprover = [];
                    alert("Document has been approved.");
                }
                else {
                    $("#txtRejectRemark").val('');
                    $("#approvalRejectionModal").modal('hide');
                    $("#chkRejected").prop('checked', '');
                    $("#SignFile").empty();
                    alert("Document has been rejected.");
                }
                $("#documentApprovalAction").modal('hide');
                waitingDialog.hide();
            });
        }
    });
}

//to update ASkApprover if it is not for next step
function UpdateAskApprover(QId, RunTimeApp) {
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    MetadataAskApp = {
        __metadata: {
            'type': ItemType
        },
        ApproversId: {
            'results': RunTimeApp 
        }
    };
    $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalQueue", MetadataAskApp, QId)).done(function (Process) {

    });
}

//convert Base64 Image value to buffer
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
            
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
        
    return new File([u8arr], filename, {type:mime});
}

//Update the selecetd DMS
function UpdateDocLibrary(StartedItemID, IsFinalApproved, Status) {
    var ItemType = GetItemTypeForLibraryName(CopyLibrary);
    Metadata = {
        __metadata: {
            'type': ItemType
        },
        ApprovedById: _spPageContextInfo.userId,
        ApprovedDate: new Date().toISOString(),
        ApprovedByOutsider: _spPageContextInfo.userEmail,
        Approval: Status
    };
    if(IsFinalApproved == false){
        delete Metadata["Approval"];
    }
    /*if(StartedItemID[0].ApproverType == "User") {
        Metadata["ApprovedByOutsider"] = '';
    }
    else {
        Metadata["ApprovedById"] = 0;
    }*/
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
            GetApprovalInbox();
            if(Status == "Approved"){
                $("#approvalActionModal").modal('hide');
                $("#txtApproveRemarks").val('');
                $("#SignFile").empty();
                $("#chkApproved").prop('checked', '');
                $("#ImageSignUpload").val('');
                $("#bcPaint-reset").trigger("click");
                $("#txtSignType").val('');
                $("#chkSignType").prop('checked', 'checked');
                $("#chkSignType").trigger("change");
                SignUploadFile = [];
                alert("Document has been approved.");
            }
            else {
                $("#txtRejectRemark").val('');
                $("#approvalRejectionModal").modal('hide');
                $("#chkRejected").prop('checked', '');
                $("#SignFile").empty();
                alert("Document has been rejected.");
            }
            $("#documentApprovalAction").modal('hide');
            waitingDialog.hide();
        },
        error: function (error) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            console.log(JSON.stringify(error));
        }
    }).fail(function (error) {
        RequestDigest = $("#__REQUESTDIGEST").val();
        waitingDialog.hide();
        alert(error.responseJSON.error.message.value);
    });
}


function GetItemTypeForLibraryName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "Item";
}

//update data in SharePOint list
function UpdateApprovalProcess(SiteURL, ListName, Metadata, txtTaskId) {
    var dfd = $.Deferred();
    if (SiteURL != _spPageContextInfo.webAbsoluteUrl) {
        $.when(GetFormDigestValue(SiteURL)).done(function(GetFormDigestValue) {
            RequestDigest = GetFormDigestValue
        });
    }
    $.ajax({
        url: SiteURL + "/_api/web/lists/getbytitle('"+ListName+"')/GetItemById('" + txtTaskId + "')",
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
        success: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            dfd.resolve(data);
        },
        eror: function (data) {
            RequestDigest = $("#__REQUESTDIGEST").val();
            dfd.reject(error);
            console.log("An error occurred while deleting task. " + JSON.stringify(data));
        }
    }).fail(function (error) {
        RequestDigest = $("#__REQUESTDIGEST").val();
        waitingDialog.hide();
        alert(error.responseJSON.error.message.value);
    });
    return dfd.promise();
}

//add attachment of SIgned Image
function uploadSgnedImage(id, ListName) {
    $.each(SignUploadFile, function (index, value) {
        getFileBuffer(value).then(function (buffer) {
            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('"+ListName+"')/items(" + id + ")/AttachmentFiles/add( FileName='" + value.name + "')",
                method: 'POST',
                data: buffer,
                async: false,
                processData: false,
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                        
                },
                error: function (data) {
                    console.log(data.responseText.error);
                }
            });
        });
    });
}

var getFileBuffer = function (FinalFiles4Upload) {
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function (e) {
        deferred.resolve(e.target.result);
    }

    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(FinalFiles4Upload);
    return deferred.promise();
};


//----------------------to draw canvas sign in HTML starts -------------------



//-----------------------to draw canvas sign in HTML ends -------------------


//Approval Process code ends----------------------------


//Rejection Process code starts----------------------------

//Reject the selected File Process
function RejectStep(AddedStatus){
    var StartedItemID = [];
    var StepsArray = [];
    var arrNextApprovrs = [];
    var CurrentIndex = 0;
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    var Query = "?$select=*,Approvers/EMail,Approvers/Title,Approvers/Id,AttachmentFiles&$expand=Approvers,AttachmentFiles&$filter=RequestID eq '" + currentRequestID + "'";
    $.when(getItemsWithQuery('DocumentApprovalQueue', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalResults) {
        if (ApprovalResults.length > 0) {
            StartedItemID = ApprovalResults.filter(function (data) {
                return data.Status == "Started";
            });
            CurrentIndex = ApprovalResults.findIndex(x => x.Status == "Started");
            StepsArray = ApprovalResults.filter(function (f) { return f; });
            
            if(CurrentIpAddress == undefined || CurrentIpAddress == null) {
                CurrentIpAddress = '';
            }
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Status: AddedStatus,
                Remarks: $("#txtRejectRemark").val(),
                ActionTakenbyId: _spPageContextInfo.userId,
                ActionTakenbyApprover: _spPageContextInfo.userEmail,
                UserIPAddress: CurrentIpAddress,
                ActionByTimeZone: LoggedIn_TimeZone 
            };
            if(StartedItemID[0].ApproverType == "User") {
                Metadata["ActionTakenbyApprover"] = '';
            }
            else {
                Metadata["ActionTakenbyId"] = 0;
            }   
            //Update DocumentApprovalQueue List
            $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalQueue", Metadata, StartedItemID[0].Id)).done(function (Process) {
                if(FinalFiles4Upload.length > 0){
                    UploadSupportedFiles(StartedItemID[0].Id, 'DocumentApprovalQueue', '');
                }
                if(typeof StepsArray[CurrentIndex+1] != 'undefined') { 
                    //It runs if next step exists
                    ItemType = GetItemTypeForListName('DocumentApprovalRequests');
                    //Next Step
                    Metadata = {
                        __metadata: {
                            'type': ItemType
                        },
                        Status: AddedStatus,
                        LastActionbyId: _spPageContextInfo.userId,
                        LastActionApprover: _spPageContextInfo.userEmail,
                        NextActionbyId: {
                            'results': [] 
                        },
                        NextActionApprover: '',
                        NextAction: '',
                        LastAction: StartedItemID[0].StepName,
                    };
                    //Previous Step
                    if(StartedItemID[0].ApproverType == "User") {
                        Metadata["LastActionApprover"] = '';
                    }
                    else {
                        Metadata["LastActionbyId"] = 0;
                    }
                    //Change DocumentApprovalRequests list
                    $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalRequests", Metadata, StepsArray[CurrentIndex+1].RequestID)).done(function (Process) {
                        //UpdateDocLibrary(StartedItemID, true, AddedStatus); //Update the selecetd DMS
                        GetApprovalInbox();
                        if(AddedStatus == "Approved"){
                            $("#approvalActionModal").modal('hide');
                            $("#txtApproveRemarks").val('');
                            $("#SignFile").empty();
                            $("#chkApproved").prop('checked', '');
                            $("#ImageSignUpload").val('');
                            $("#bcPaint-reset").trigger("click");
                            $("#txtSignType").val('');
                            $("#chkSignType").prop('checked', 'checked');
                            $("#chkSignType").trigger("change");
                            SignUploadFile = [];
                            alert("Document has been approved.");
                        }
                        else {
                            $("#txtRejectRemark").val('');
                            $("#approvalRejectionModal").modal('hide');
                            $("#chkRejected").prop('checked', '');
                            $("#SignFile").empty();
                            alert("Document has been rejected.");
                        }
                        $("#documentApprovalAction").modal('hide');
                        waitingDialog.hide();
                    });
                    
                }
                else {
                    ItemType = GetItemTypeForListName('DocumentApprovalRequests');
                    Metadata = {
                        __metadata: {
                            'type': ItemType
                        },
                        Status: AddedStatus,
                        LastActionbyId: _spPageContextInfo.userId,
                        LastActionApprover: _spPageContextInfo.userEmail,
                        NextActionbyId: {
                            'results': [] 
                        },
                        NextActionApprover: '',
                        NextAction: '',
                        LastAction: StartedItemID[0].StepName,
                    };
                    if(StartedItemID[0].ApproverType == "User") {
                        Metadata["LastActionApprover"] = '';
                    }
                    else {
                        Metadata["LastActionbyId"] = 0;
                    }
                    //Change DocumentApprovalRequests list
                    $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalRequests", Metadata, StartedItemID[0].RequestID)).done(function (Process) {
                        //UpdateDocLibrary(StartedItemID, true, AddedStatus); //Update the selecetd DMS
                        GetApprovalInbox();
                        if(AddedStatus == "Approved"){
                            $("#approvalActionModal").modal('hide');
                            $("#txtApproveRemarks").val('');
                            $("#SignFile").empty();
                            $("#chkApproved").prop('checked', '');
                            $("#ImageSignUpload").val('');
                            $("#bcPaint-reset").trigger("click");
                            $("#txtSignType").val('');
                            $("#chkSignType").prop('checked', 'checked');
                            $("#chkSignType").trigger("change");
                            SignUploadFile = [];
                            alert("Document has been approved.");
                        }
                        else {
                            $("#txtRejectRemark").val('');
                            $("#approvalRejectionModal").modal('hide');
                            $("#chkRejected").prop('checked', '');
                            $("#SignFile").empty();
                            alert("Document has been rejected.");
                        }
                        $("#documentApprovalAction").modal('hide');
                        waitingDialog.hide();
                    });
                }
            });  
        }
    });
}

//Rejection Process code ends----------------------------

//to 'Cancel' the Approval Process - By Initiator only
function CancelStep(AddedStatus) {
    var StartedItemID = [];
    var StepsArray = [];
    var arrNextApprovrs = [];
    var CurrentIndex = 0;
    var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
    var Query = "?$select=*,Approvers/EMail,Approvers/Title,Approvers/Id,AttachmentFiles&$expand=Approvers,AttachmentFiles&$filter=RequestID eq '" + currentRequestID + "'";
    $.when(getItemsWithQuery('DocumentApprovalQueue', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalResults) {
        if (ApprovalResults.length > 0) {
            StartedItemID = ApprovalResults.filter(function (data) {
                return data.Status == "Started";
            });
            CurrentIndex = ApprovalResults.findIndex(x => x.Status == "Started");
            StepsArray = ApprovalResults.filter(function (f) { return f; });
            
            if(CurrentIpAddress == undefined || CurrentIpAddress == null) {
                CurrentIpAddress = '';
            }
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Status: AddedStatus,
                Remarks: $("#txtCancelRemark").val(),
                ActionTakenbyId: _spPageContextInfo.userId,
                ActionTakenbyApprover: _spPageContextInfo.userEmail,
                UserIPAddress: CurrentIpAddress,
                ActionByTimeZone: LoggedIn_TimeZone 
            };
            if(StartedItemID[0].ApproverType == "User") {
                Metadata["ActionTakenbyApprover"] = '';
            }
            else {
                Metadata["ActionTakenbyId"] = 0;
            }   
            //Update DocumentApprovalQueue List
            $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalQueue", Metadata, StartedItemID[0].Id)).done(function (Process) {
                if(FinalFiles4Upload.length > 0){
                    UploadSupportedFiles(StartedItemID[0].Id, 'DocumentApprovalQueue', '');
                }
                if(typeof StepsArray[CurrentIndex+1] != 'undefined') { 
                    //It runs if next step exists
                    ItemType = GetItemTypeForListName('DocumentApprovalRequests');
                    //Next Step
                    Metadata = {
                        __metadata: {
                            'type': ItemType
                        },
                        Status: AddedStatus,
                        LastActionbyId: _spPageContextInfo.userId,
                        LastActionApprover: _spPageContextInfo.userEmail,
                        NextActionbyId: {
                            'results': [] 
                        },
                        NextActionApprover: '',
                        NextAction: '',
                        LastAction: StartedItemID[0].StepName,
                    };
                    //Previous Step
                    if(StartedItemID[0].ApproverType == "User") {
                        Metadata["LastActionApprover"] = '';
                    }
                    else {
                        Metadata["LastActionbyId"] = 0;
                    }
                    //Change DocumentApprovalRequests list
                    $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalRequests", Metadata, StepsArray[CurrentIndex+1].RequestID)).done(function (Process) {
                        //UpdateDocLibrary(StartedItemID, true, AddedStatus); //Update the selecetd DMS
                        GetApprovalOutbox();
                        $("#txtCancelRemark").val('');
                        $("#approvalCancelModal").modal('hide');
                        $("#chkCancel").prop('checked', '');
                        $("#SignFile").empty();
                        alert("Document has been cancelled.");
                        $("#documentApprovalAction").modal('hide');
                        waitingDialog.hide();
                    });
                    
                }
                else {
                    ItemType = GetItemTypeForListName('DocumentApprovalRequests');
                    Metadata = {
                        __metadata: {
                            'type': ItemType
                        },
                        Status: AddedStatus,
                        LastActionbyId: _spPageContextInfo.userId,
                        LastActionApprover: _spPageContextInfo.userEmail,
                        NextActionbyId: {
                            'results': [] 
                        },
                        NextActionApprover: '',
                        NextAction: '',
                        LastAction: StartedItemID[0].StepName,
                    };
                    if(StartedItemID[0].ApproverType == "User") {
                        Metadata["LastActionApprover"] = '';
                    }
                    else {
                        Metadata["LastActionbyId"] = 0;
                    }
                    //Change DocumentApprovalRequests list
                    $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalRequests", Metadata, StartedItemID[0].RequestID)).done(function (Process) {
                        //UpdateDocLibrary(StartedItemID, true, AddedStatus); //Update the selecetd DMS
                        GetApprovalOutbox();
                        $("#txtCancelRemark").val('');
                        $("#approvalCancelModal").modal('hide');
                        $("#chkCancel").prop('checked', '');
                        $("#SignFile").empty();
                        alert("Document has been cancelled.");
                        $("#documentApprovalAction").modal('hide');
                        waitingDialog.hide();
                    });
                }
            });  
        }
    });

}

//Filter ApprovalInbox and Approval Outbox

//bind all the Doc-Type
function BindDMSDocumentType() {
    $("#ddlDocTypeFilter").empty().append('<option value="All">All</option>');
    $("#FilterShareDocType").empty().append('<option value="All">All</option>');
    $("#txtUpdateType").append('<option value="-Select-">-Select-</option>');
    $("#ddlFileType").empty().append('<option value="-Select-">-Select-</option>');
    $("#ddlFilterDocType").empty().append('<option value="All">All</option>');
    $("#ddlDocumentType").empty().append('<option value="All">All</option>');
    $("#ddlAddFolderCateg").empty().append('<option value="-Select-">-Select-</option>');
    $("#ddlAddFileCateg").empty().append('<option value="-Select-">-Select-</option>');
    var Query= "?$select=CategoryType,CatogeryName&$filter=CategoryType eq 'Document' and Status eq 'Yes'";
    $.when(getItemsWithQuery('CategoryMaster', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (DocTypeResults) {
        if (DocTypeResults.length > 0) {
            for (var index = 0; index < DocTypeResults.length; index++) {
                $("#ddlDocTypeFilter").append('<option value="' + DocTypeResults[index].CatogeryName + '">' + DocTypeResults[index].CatogeryName + '</option>');
                $("#txtUpdateType").append('<option value="' + DocTypeResults[index].CatogeryName + '">' + DocTypeResults[index].CatogeryName + '</option>');
                $("#ddlFileType").append('<option value="' + DocTypeResults[index].CatogeryName + '">' + DocTypeResults[index].CatogeryName + '</option>');
                $("#ddlFilterDocType").append('<option value="' + DocTypeResults[index].CatogeryName + '">' + DocTypeResults[index].CatogeryName + '</option>');
                $("#FilterShareDocType").append('<option value="' + DocTypeResults[index].CatogeryName + '">' + DocTypeResults[index].CatogeryName + '</option>');
                $("#ddlDocumentType").append('<option value="' + DocTypeResults[index].CatogeryName + '">' + DocTypeResults[index].CatogeryName + '</option>');
                $("#ddlAddFolderCateg").append('<option value="' + DocTypeResults[index].CatogeryName + '">' + DocTypeResults[index].CatogeryName + '</option>');
                $("#ddlAddFileCateg").append('<option value="' + DocTypeResults[index].CatogeryName + '">' + DocTypeResults[index].CatogeryName + '</option>');
            }
        }
    });
}

//Filter as per the values
function filterAppInOut(AppInOut) {
    var FilteredArray = [];
    var arrTemp = [];
    var arrUserEmailIds = [];
    var IsRequested = false;
    if(AppInOut == "Approval Inbox") {
        arrTemp = arrApprovalInAll.filter(function(f){return f;})
    }
    else {
        arrTemp = arrApprovalOutAll.filter(function(f){return f;})
    }
    if ($("#pplFilterAppInOut_TopSpan_ResolvedList").text() != "") {
        arrUserEmailIds = getUserInformationEmail('pplFilterAppInOut');
    }
    if($("#pplFilterAppInOut_TopSpan_ResolvedList").text() == "" && $("#RefFilterAppInOut").text().trim() == "" && $("#ddlFilterStatus").val() == 'All' && $("#ddlDocTypeFilter").val() == "All") {
        if(AppInOut == "Approval Inbox"){
            BindAppInbox(arrApprovalInAll);
        }
        else {
            BindAppOutBox(arrApprovalOutAll);
        }
	    
    }
    else {
        FilteredArray = arrTemp.filter(function (obj, index) { //Filter array
            IsRequested = false;
            if(arrUserEmailIds.length > 0) {
                for (var i = 0; i < arrUserEmailIds.length; i++) {
                    if (arrUserEmailIds[i].indexOf("#") != -1) {
                        arrUserEmailIds[i] = arrUserEmailIds[i].split("#")[0];
                        arrUserEmailIds[i] = arrUserEmailIds[i].replace("_", "@");
                    }
                    if(obj.Author.EMail.toLowerCase().trim() == arrUserEmailIds[i].toLowerCase().trim()){
                        IsRequested = true;
                        break;
                    }
                }
            }
            else {
                IsRequested = true;
            }
            if(obj.DocumentType == null || obj.DocumentType == ''){
                obj.DocumentType = "null";
            }
            if(obj.Reference == null || obj.Reference == ''){
                obj.Reference = "null";
            }

            return IsRequested && 
	        		($("#ddlFilterStatus").val() == "All" ? obj.Status != "" : obj.Status == $("#ddlFilterStatus").val()) &&
	        		($("#RefFilterAppInOut").val().trim() == "null" ? obj.Reference.trim() != "null" : (obj.Reference.toLowerCase().trim() == $("#RefFilterAppInOut").val().trim().toLowerCase() || obj.Reference.toLowerCase().indexOf($("#RefFilterAppInOut").val().trim().toLowerCase()) != -1)) &&
	        		($("#ddlDocTypeFilter").val().trim() == "All" ? obj.DocumentType.trim() != "" : obj.DocumentType.trim() == $("#ddlDocTypeFilter").val().trim());
        });
        if(AppInOut == "Approval Inbox"){
            BindAppInbox(FilteredArray);
        }
        else {
            BindAppOutBox(FilteredArray);
        }
    }
    $("#document-approvals-filter").modal('hide');
    
}

//get User-Emails of people picker
function getUserInformationEmail(PeoplepickerId) {
    var userIds = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if (!peoplePicker.IsEmpty()) {
        if (peoplePicker.HasInputError) return false; // if any error  
        else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users  
        else if (peoplePicker.TotalUserCount > 0) {
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            var promise = '';
            var UsersID = '';
            for (var i = 0; i < users.length; i++) {
                //assignBy.push(users[i].DisplayText);
                var accountName = users[i].Key;
                userIds.push(users[i].Key.split('|')[2]);
            }
            return userIds;
        }
    }
    else {
        return userIds;
    }
}

//clear all the Filter control boxes
function ClearFilters() {
    EmptyPeoplePicker('pplFilterAppInOut');
    $("#ddlFilterStatus").val('All');
    $("#ddlDocTypeFilter").val('All');
    $("#RefFilterAppInOut").val('');
}

//get Adobe sign Link
function getApprovalSignLink(ReqId) {
    var SignLink = '';
    var Query = "?$select=Status,Id,RequestID,Approvers/EMail,ApproversEmail&$expand=Approvers&$filter=Status eq 'Started' and RequestID eq '" + ReqId + "' and (Approvers/EMail eq '" + _spPageContextInfo.userEmail + "' or ApproversEmail eq '" + _spPageContextInfo.userEmail + "')";
    $.when(getItemsWithQuery('DocumentApprovalQueue', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (QueueResults) {
        if (QueueResults.length > 0) {
            var RQuery = "?$select=ItemID,ApproverSignLink,ApproversEmail&$filter=ItemID eq '" + QueueResults[0].Id + "' and ApproversEmail eq '" + _spPageContextInfo.userEmail + "' ";
            $.when(getItemsWithQuery("DocumentSigningLink", RQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (AdobeLink) {
                if (AdobeLink.length > 0) {
                    SignLink = AdobeLink[0].ApproverSignLink.Url;
                }
                else {
                    SignLink = "javascript:void(0);";
                }
            });
        }
    });
    return SignLink;
}

//perform actions on Close Document approval modal
function CloseDocAppPopup() {
    clearInterval(IntervalId);
    $("#doc-viewer").empty();
}

//get PDF of Final Approved version
function FinalApprovalFile(ItemId) {
    var FileHTML = '';
	if(ItemId == "" || ItemId == null) {
        var Query = "?$select=*,Author/EMail,Author/Title,AttachmentFiles&$expand=Author,AttachmentFiles&$top=5000&$filter=DocumentID eq '" + DocumentId + "' ";
    }
    else { 
        var Query = "?$select=*,Author/EMail,Author/Title,AttachmentFiles&$expand=Author,AttachmentFiles&$top=5000&$filter=DocumentID eq '" + DocumentId + "' and Id eq '" + ItemId + "' ";
    }
    $.when(getItemsWithQuery("DocumentApprovalRequests", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if(valuesArray.length > 0) {
            if (valuesArray[0].AttachmentFiles.results.length > 0) {
                for (var k = 0; k < valuesArray[0].AttachmentFiles.results.length; k++) {
                    Filename = valuesArray[0].AttachmentFiles.results[k].FileName;
                    if(Filename.indexOf("_Approved") !== -1) {
                        FileHTML += '<div class="m-0  upload-chip" style="float:right;">';
                        FileHTML += '<span class="pr-8 chip-text-box" style="color:blue;cursor:pointer;" title="' + valuesArray[0].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);" id="btnLinkAttachment">' + valuesArray[0].AttachmentFiles.results[k].FileName + '</span>';
                        FileHTML += '<span class="chip-icon-box"><a href="' + valuesArray[0].AttachmentFiles.results[k].ServerRelativeUrl + '" name="' + valuesArray[0].AttachmentFiles.results[k].ServerRelativeUrl + '" download>';
                        FileHTML += '<i class="fa fa-download cursor-pointer px-4" aria-hidden="true"></i></a></span></div>';
                    }
                }
            }
        }
        $(".FileApprovalPDF").empty().append(FileHTML);
    });
}


//Approval Validation before Approve the document
//Approval Validation before Approve the document
function ForwardValidation() {
    returnValue = true;
    if ($("#chkForward").prop('checked') == true) {
        if ($("#divForwardTo_TopSpan_ResolvedList").text() == "") {
            alert("Kindly enter forwardee name(s) first.");
            returnValue = false;
        }
    }
    return returnValue;
}   

//Review Validation 
function ReviewValidation() {
    if ($("#reviewedbox").prop('checked') == true) {
        returnValue = true;
    }
    else {
        returnValue = false;
    }
    return returnValue;
}

//Submit the Review
function ReviewStep() {
    var Query = "?$select=*,ApprovalQueueID/Id,ForwardedBy/EMail,ForwardedBy/Title,ForwardedTo/EMail,ForwardedTo/Title&$expand=ApprovalQueueID,ForwardedTo,ForwardedBy&$top=5000&$filter=ApprovalQueueID/Id eq '" + currentStartedId + "' and ForwardedTo/EMail eq '" + _spPageContextInfo.userEmail + "' ";
    $.when(getItemsWithQuery("DocumentApprovalForward", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            var ItemType = GetItemTypeForListName('DocumentApprovalForward');
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                FeedBack: $('input[name="ok_section"]:checked').val(),
                FeedBackRemarks: $('#txtFeedBackRemarks').val()
            };
            $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalForward", Metadata, valuesArray[0].Id)).done(function (Process) {
                if (FinalFiles4Upload.length > 0) {
                    UploadSupportedFiles(valuesArray[0].Id, 'DocumentApprovalForward', '');
                }
                alert("Your review has been submitted.");
                $("#UploadBoxReview").html('');
                $("#reviewedbox").prop('checked', false);
                $("#txtFeedBackRemarks").val('');
                $("#alloksec").prop('checked', true);
                $("#review_structure").modal('hide');
                waitingDialog.hide()
            });
        }
    });
}

//to forward the request to different Approvers
function ForwardRequest() {
    var CurrentStepApprovers = [];
    var arrForwardedApp = [];
    var AllApproverArr = [];
    var CurrentStepArray = []
    try {
        var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
        var Query = "?$select=*,Approvers/EMail,Approvers/Title,Approvers/Id,AttachmentFiles&$expand=Approvers,AttachmentFiles&$filter=RequestID eq '" + currentRequestID + "' and Status eq 'Started'";
        $.when(getItemsWithQuery('DocumentApprovalQueue', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalResults) {
            if (ApprovalResults.length > 0) {
                CurrentStepArray = ApprovalResults.filter(function(f){return f;})
                if ($("#txtForwardMessage").val().trim() == "") {
                    $("#txtForwardMessage").val("Forwarded by " + _spPageContextInfo.userDisplayName);
                }
                if (ApprovalResults[0].Approvers.results != null) {
                    for (Appr = 0; Appr < ApprovalResults[0].Approvers.results.length; Appr++) {
                        CurrentStepApprovers.push(ApprovalResults[0].Approvers.results[Appr].Id);
                    }
                }
                arrForwardedApp = getUserInformation('divForwardTo');
                //get previous approvers + forwarded Users of the current step
                CurrentStepApprovers = CurrentStepApprovers.concat(arrForwardedApp);//Add two array and remove duplicate item
                CurrentStepApprovers = CurrentStepApprovers.filter(function (item, pos) { return CurrentStepApprovers.indexOf(item) == pos });
            }
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Remarks: $("#txtForwardMessage").val(),
                ApproversId: { 'results': CurrentStepApprovers }
            };
            $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalQueue", Metadata, ApprovalResults[0].Id)).done(function (Process) {
                if(FinalFiles4Upload.length > 0){
                    UploadSupportedFiles(ApprovalResults[0].Id, 'DocumentApprovalQueue', '');
                }
                //Update AllApprovers column value
                var ApprovalFileTitle = '';
                var InitiatorName = '';
                ItemType = GetItemTypeForListName('DocumentApprovalRequests');
                var Query = "?$select=*,AllApprovers/EMail,AllApprovers/Id,Author/Title&$expand=AllApprovers,Author&$top=5000&$orderby=Created desc&$filter=Id eq '" + currentRequestID + "' ";
                $.when(getItemsWithQuery('DocumentApprovalRequests', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalResults) {
                    if (ApprovalResults.length > 0) {
                        ApprovalFileTitle = ApprovalResults[0].ApprovalFileTitle;
                        InitiatorName = ApprovalResults[0].Author.Title;
                        if (ApprovalResults[0].AllApprovers.results != null) {
                            for (Appr = 0; Appr < ApprovalResults[0].AllApprovers.results.length; Appr++) {
                                AllApproverArr.push(ApprovalResults[0].AllApprovers.results[Appr].Id);
                            }
                            //get All approvers + forwarded Users of the current step
                            AllApproverArr = AllApproverArr.concat(arrForwardedApp);//Add two array and remove duplicate item
                            AllApproverArr = AllApproverArr.filter(function (item, pos) { return AllApproverArr.indexOf(item) == pos });
                        }
                        Metadata = {
                            __metadata: {
                                'type': ItemType
                            },
                            AllApproversId: { 'results': AllApproverArr },
                            Remarks: "Forwarded by " + _spPageContextInfo.userDisplayName,
                            NextActionbyId: { 'results': CurrentStepApprovers }
                        };
                        $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalRequests", Metadata, ApprovalResults[0].Id)).done(function (Process) {
                            SendMailToForwardee(CurrentStepArray, ApprovalFileTitle, InitiatorName);
                        });
                    }
                });
            });
        });
    }
    catch (error) {
        alert(error);
        waitingDialog.hide();
    }
}

//to forward the request to different Approvers to review only
function ForwardRequestReview() {
    var CurrentStepForwardTo = [];
    var CurrentStepForwardBy = [];
    var arrForwardedApp = [];
    var AllApproverArr = [];
    var NextActionArr = [];
    var CurrentStepArray = []
    try {
        var ItemType = GetItemTypeForListName('DocumentApprovalQueue');
        var Query = "?$select=*,ForwardedUser/EMail,ForwardedUser/Title,ForwardedUser/Id,ForwardedBy/EMail,ForwardedBy/Title,ForwardedBy/Id&$expand=ForwardedUser,ForwardedBy&$filter=RequestID eq '" + currentRequestID + "' and Status eq 'Started'";
        $.when(getItemsWithQuery('DocumentApprovalQueue', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalResults) {
            if (ApprovalResults.length > 0) {
                CurrentStepArray = ApprovalResults.filter(function (f) { return f; })
                if ($("#txtForwardMessage").val().trim() == "") {
                    $("#txtForwardMessage").val("Forwarded by " + _spPageContextInfo.userDisplayName);
                }
                if (ApprovalResults[0].ForwardedUser.results != null) {
                    for (Appr = 0; Appr < ApprovalResults[0].ForwardedUser.results.length; Appr++) {
                        CurrentStepForwardTo.push(ApprovalResults[0].ForwardedUser.results[Appr].Id);
                    }
                }
                if (ApprovalResults[0].ForwardedBy.results != null) {
                    for (Appr = 0; Appr < ApprovalResults[0].ForwardedBy.results.length; Appr++) {
                        CurrentStepForwardBy.push(ApprovalResults[0].ForwardedBy.results[Appr].Id);
                    }
                }
                arrForwardedApp = getUserInformation('divForwardTo');
                //get previous ForwardTo + forwarded Users of the current step
                CurrentStepForwardTo = CurrentStepForwardTo.concat(arrForwardedApp);//Add two array and remove duplicate item
                CurrentStepForwardTo = CurrentStepForwardTo.filter(function (item, pos) { return CurrentStepForwardTo.indexOf(item) == pos });

                CurrentStepForwardBy = CurrentStepForwardBy.concat([_spPageContextInfo.userId]);//Add two array and remove duplicate item
                CurrentStepForwardBy = CurrentStepForwardBy.filter(function (item, pos) { return CurrentStepForwardBy.indexOf(item) == pos });
            }
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Forwarded: true,
                Remarks: $("#txtForwardMessage").val(),
                ForwardedUserId: { 'results': CurrentStepForwardTo },
                ForwardedById: { 'results': CurrentStepForwardBy }
            };
            $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalQueue", Metadata, ApprovalResults[0].Id)).done(function (Process) {
                if (FinalFiles4Upload.length > 0) {
                    UploadSupportedFiles(ApprovalResults[0].Id, 'DocumentApprovalQueue', '');
                }
                //Update AllApprovers column value
                var ApprovalFileTitle = '';
                var InitiatorName = '';
                ItemType = GetItemTypeForListName('DocumentApprovalRequests');
                var Query = "?$select=*,AllApprovers/EMail,AllApprovers/Id,NextActionby/Id,Author/Title&$expand=Author,AllApprovers,NextActionby&$top=5000&$orderby=Created desc&$filter=Id eq '" + currentRequestID + "' ";
                $.when(getItemsWithQuery('DocumentApprovalRequests', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalResults) {
                    if (ApprovalResults.length > 0) {
                        ApprovalFileTitle = ApprovalResults[0].ApprovalFileTitle;
                        InitiatorName = ApprovalResults[0].Author.Title;
                        if (ApprovalResults[0].AllApprovers.results != null) {
                            for (Appr = 0; Appr < ApprovalResults[0].AllApprovers.results.length; Appr++) {
                                AllApproverArr.push(ApprovalResults[0].AllApprovers.results[Appr].Id);
                            }
                            //get All approvers + forwarded Users of the current step
                            AllApproverArr = AllApproverArr.concat(arrForwardedApp);//Add two array and remove duplicate item
                            AllApproverArr = AllApproverArr.filter(function (item, pos) { return AllApproverArr.indexOf(item) == pos });
                        }
                        //Next Action Approvers
                        if (ApprovalResults[0].NextActionby.results != null) {
                            for (Appr = 0; Appr < ApprovalResults[0].NextActionby.results.length; Appr++) {
                                NextActionArr.push(ApprovalResults[0].NextActionby.results[Appr].Id);
                            }
                            //get Next action approvers + forwarded Users of the current step
                            NextActionArr = NextActionArr.concat(arrForwardedApp);//Add two array and remove duplicate item
                            NextActionArr = NextActionArr.filter(function (item, pos) { return NextActionArr.indexOf(item) == pos });
                        }
                        
                        Metadata = {
                            __metadata: {
                                'type': ItemType
                            },
                            AllApproversId: { 'results': AllApproverArr },
                            NextActionbyId: { 'results': NextActionArr }
                        };
                        $.when(UpdateApprovalProcess(_spPageContextInfo.webAbsoluteUrl, "DocumentApprovalRequests", Metadata, ApprovalResults[0].Id)).done(function (Process) {
                            //add data in 'DocumentApprovalForward' list
                            var ItemType = GetItemTypeForListName('DocumentApprovalForward');
                            if ($("#txtForwardMessage").val().trim() == "Forwarded by " + _spPageContextInfo.userDisplayName) {
                                $("#txtForwardMessage").val("");
                            }
                            var ForwardedTime = new Date().toISOString();
                            for (forw = 0; forw < arrForwardedApp.length; forw++) {
                                var Metadata;
                                Metadata = {
                                    __metadata: {
                                        'type': ItemType
                                    },
                                    Title: "Forwarded by " + _spPageContextInfo.userDisplayName,
                                    ApprovalQueueIDId: CurrentStepArray[0].Id,  //Lookupvalue
                                    ForwardedById: _spPageContextInfo.userId,
                                    ForwardedToId: arrForwardedApp[forw],
                                    ForwardRemarks: $("#txtForwardMessage").val(),
                                    RestrictViewToOther: $("#RestrictToOthers").prop('checked'),
                                    ForwardedTime: ForwardedTime
                                };
                                $.when(AddItemToListGroups('DocumentApprovalForward', Metadata)).done(function (response) {
                                    if ((forw + 1) == arrForwardedApp.length) {
                                        SendMailToForwardee(CurrentStepArray, ApprovalFileTitle, InitiatorName);
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });
    }
    catch (error) {
        alert(error);
        waitingDialog.hide();
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

//to send email to all the forwardees
function SendMailToForwardee(valuesArray, ApprovalFileTitle, InitiatorName) {
    var arrToUserEmail = [];
    var arrApproversName = [];
    var arrTempEmail = [];
    DashboardLink = _spPageContextInfo.webAbsoluteUrl + "/Pages/Document.aspx?WebAppId="+Logged_CompanyId+"&Section=ApprovalInbox&File="+window.btoa(currentRequestID.toString() + DocumentId.toString())+"&undefined=undefined";
    arrToUserEmail = getUserInformationEmail("divForwardTo");
    ApprovalFileTitle = ApprovalFileTitle ? ApprovalFileTitle : '';
    EmailDesign = _spPageContextInfo.userDisplayName + " has been forwarded the following document for your valuable feedback and comments.<br/><br/>";
    EmailDesign = EmailDesign + "<div><strong>Title</strong><strong>:</strong> " + ApprovalFileTitle + "</div>" +
    							"<div><strong>File Name</strong><strong>:</strong> " + valuesArray[0].Title + "</div>" +
                                "<div data-localize='Category'><strong>Category</strong><strong>:</strong> " + $("#FileDocType").text() + "</div>" +
                                "<div data-localize='Approval Initiate by'><strong>Approval Initiate by</strong><strong>:</strong> " + InitiatorName + "</div>" +
                                    "<div><strong>Purpose:</strong> " + $("#txtPurposeHistory").text() + "</div>" +
                                    "<div><strong>StepName:</strong> " + valuesArray[0].StepName + "</div>" +
                                 "</br><div><strong>Message:</strong> " + $("#txtForwardMessage").val() + "</div></br></br></br>" +
                                "<div><a href=" + DashboardLink + ">Click here</a> to open the document.</div>" + "<br/><br/>";
    EmailDesign += "This is an auto generated email. Please don't reply.";
    for(var k = 0; k < LabelDefaultLangauge.length; k++) {
        if(EmailDesign.includes(LabelDefaultLangauge[k].Key) == true){
            EmailDesign = EmailDesign.replaceAll(LabelDefaultLangauge[k].Key, LabelDefaultLangauge[k].DefaultLanguage);
        }	
    }
    var Metadata;
    Metadata = {
        'properties': {
            '__metadata': {
                'type': 'SP.Utilities.EmailProperties'
            },
            'From': _spPageContextInfo.userEmail,
            'To': {
                'results': arrToUserEmail
            },
            /*'CC': {
                'results': taskCCUsersUsers
            },*/
            'Body': EmailDesign,
            'Subject': "Document has been forwarded for review"
        }
    };
    var sitetemplateurl = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: sitetemplateurl,
        type: "POST",
        data: JSON.stringify(Metadata),
        async: false,
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            alert("Document has been forwarded.");
            $("#ForwardedModal").modal("hide");
            $("#documentApprovalAction").modal('hide');
            waitingDialog.hide();
        },
        error: function (err) {
            console.log("SendEmail forward " + JSON.stringify(err));
            waitingDialog.hide();
        }
    });
}

//Predefined Approval starts ---------------------------------------------
//to get Template Titles and Bind in Dropdown
function getPredfinedTemplates() {
    $("#ddlTemplateTitles").empty();
    $("#ddlTemplateTitles").append("<option value='-Select-'>-Select-</option>");
    var Query = "?$select=*,Initiators/EMail,GuestClient/Id&$orderby=Modified desc&$expand=GuestClient,Initiators&$filter=(Active eq '1' and SignApp eq '" + $("#ddlSign :selected").text() + "' and (Initiation eq 'Anyone' or Initiation eq 'Guest User'  or (Initiation eq 'GuestClient' and GuestClient/Id eq '" + guestClientId + "') or (Initiation eq 'Selective' and Initiators/EMail eq '" + _spPageContextInfo.userEmail + "')))";
    $.when(getItemsWithQuery('ApprovalProcessMaster', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (PredefinedTemplates) {
        for (var p = 0; p < PredefinedTemplates.length; p++) {
            $("#ddlTemplateTitles").append("<option value='" + PredefinedTemplates[p].Id + "'>" + PredefinedTemplates[p].Title + "</option>");
        }
    });
}

//to get and and Bind Predefined steps
function FetchPredefinedSteps(TemplateId) {
    multipleEmailAddress = [];
    assignUserName = [];
    EmpIds = [];
    var OtherStepDetails = [];
    $("#userselection").prop('checked', true);
    var IsProceed = true;
    var Query = "?$select=*,TemplateID/Id,Approvers/EMail,Approvers/Id,Approvers/Title,GroupName/Title&$expand=TemplateID,GroupName,Approvers&$orderby=Sequence_No asc&$filter=TemplateID/Id eq '" + TemplateId + "' ";
    $.when(getItemsWithQuery('ApprovalTemplateSteps', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (TemplatesSteps) {
        for (var p = 0; p < TemplatesSteps.length; p++) {
            multipleEmailAddress = [];
            assignUserName = [];
            EmpIds = [];
            OtherStepDetails = [];
            $("#AddEditStepName").val(TemplatesSteps[p].StepName);
            TemplatesSteps[p].PageFooterSign = TemplatesSteps[p].PageFooterSign ? TemplatesSteps[p].PageFooterSign : false;
            $("#chkFooterSign").prop("checked", TemplatesSteps[p].PageFooterSign);
            if (TemplatesSteps[p].ApproverType == "Role Based") {
                OtherStepDetails.push({
                    ApproverType: TemplatesSteps[p].ApproverType,
                    ApproverRole: TemplatesSteps[p].ApproverRole,
                    ApproverDecidingStep: ""
                });
                if (TemplatesSteps[p].ApproverRole == "Manager") {
                    //to check if logged_In user is external or not; -9 == External User
                    if (EmployeeDetails[0].ParentId != -9) { //Internal Employee
                        if (EmployeeDetails[0].ManagerLoginName.EMail != null) {
                            if (checkEMpAuthencity(EmployeeDetails[0].ManagerLoginName.EMail) == true) {
                                multipleEmailAddress.push(EmployeeDetails[0].ManagerLoginName.EMail);
                                EmpIds.push(EmployeeDetails[0].ManagerLoginName.Id);
                                assignUserName.push(EmployeeDetails[0].ManagerLoginName.Title);
                            }
                            else {
                                alert("Manager is not active for the logged_In user.");
                                IsProceed = false;
                                return false;
                            }
                        }
                        else {
                            alert("Manager is not defined for the logged_In user.");
                            IsProceed = false;
                            return false;
                        }
                    }
                    else { //External Employee
                        var todayDate = new Date();
                        todayDate = todayDate.setDate(todayDate.getDate() - 1);
                        todayDate = new Date(todayDate);
                        var Query = "?$select=*,LoginName/EMail,Supervisor/EMail,Supervisor/Id,Supervisor/Title&$expand=LoginName,Supervisor&$filter=LoginName/EMail eq '" + _spPageContextInfo.userEmail + "' and Status eq 'Active' and ValidUpto ge datetime'" + todayDate.toISOString() + "' ";
                        $.when(getItemsWithQuery('ExternalUsers', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (InternalSup) {
                            if (InternalSup.length > 0) {
                                if (InternalSup[0].Supervisor.EMail != null) {
                                    if (checkEMpAuthencity(InternalSup[0].Supervisor.EMail) == true) {
                                        multipleEmailAddress.push(InternalSup[0].Supervisor.EMail);
                                        EmpIds.push(InternalSup[0].Supervisor.Id);
                                        assignUserName.push(InternalSup[0].Supervisor.Title);
                                    }
                                    else {
                                        alert("Manager is not active for the logged_In user.");
                                        IsProceed = false;
                                        return false;
                                    }
                                }
                                else {
                                    alert("Manager is not defined for the logged_In user.");
                                    IsProceed = false;
                                    return false;
                                }
                            }
                        });
                    }
                }
                else if (TemplatesSteps[p].ApproverRole == "Head of the Department") {
                    var Query = "?$select=*,Department/Id,Company/Id,Contributors/EMail,Contributors/Id,Contributors/Title&$expand=Company,Contributors,Department&$filter=Company/Id eq '" + Logged_CompanyId + "' and Department/Id eq '" + Logged_DepartmentId.toString() + "' and WebPartName eq 'Head of the department' ";
                    $.when(getItemsWithQuery('ProcessApprovers', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                        if (valuesArray.length > 0) {
                            if (valuesArray[0].Contributors.results != null) {
                                for (var pplIndex = 0; pplIndex < valuesArray[0].Contributors.results.length; pplIndex++) {
                                    if (checkEMpAuthencity(valuesArray[0].Contributors.results[pplIndex].EMail) == true) {
                                        multipleEmailAddress.push(valuesArray[0].Contributors.results[pplIndex].EMail);
                                        EmpIds.push(valuesArray[0].Contributors.results[pplIndex].Id);
                                        assignUserName.push(valuesArray[0].Contributors.results[pplIndex].Title);
                                    }
                                }
                            }
                            else {
                                alert("Head of the Department is not defined for the logged_In user's Department.");
                                IsProceed = false;
                                return false;
                            }
                        }
                    });
                }
                else if (TemplatesSteps[p].ApproverRole == "HR Admin") {
                    var Query = "?$select=*,Contributors/EMail,Contributors/Id,Contributors/Title,Company/Id&$expand=Contributors,Company&$filter=Company/Id eq '" + Logged_CompanyId + "' and WebPartName eq 'HR Admin' ";
                    $.when(getItemsWithQuery('ProcessApprovers', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                        if (valuesArray.length > 0) {
                            if (valuesArray[0].Contributors.results != null) {
                                for (var pplIndex = 0; pplIndex < valuesArray[0].Contributors.results.length; pplIndex++) {
                                    if (checkEMpAuthencity(valuesArray[0].Contributors.results[pplIndex].EMail) == true) {
                                        multipleEmailAddress.push(valuesArray[0].Contributors.results[pplIndex].EMail);
                                        EmpIds.push(valuesArray[0].Contributors.results[pplIndex].Id);
                                        assignUserName.push(valuesArray[0].Contributors.results[pplIndex].Title);
                                    }
                                }
                            }
                            else {
                                alert("HR Admin is not defined for the logged_In user.");
                                IsProceed = false;
                                return false;
                            }
                        }
                    });
                }
                else if (TemplatesSteps[p].ApproverRole == "Project Admin") {
                    var Query = "?$select=*,Contributors/EMail,Contributors/Id,Contributors/Title,Company/Id&$expand=Contributors,Company&$filter=Company/Id eq '" + Logged_CompanyId + "' and WebPartName eq 'Project Admin' ";
                    $.when(getItemsWithQuery('ProcessApprovers', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                        if (valuesArray.length > 0) {
                            if (valuesArray[0].Contributors.results != null) {
                                for (var pplIndex = 0; pplIndex < valuesArray[0].Contributors.results.length; pplIndex++) {
                                    if (checkEMpAuthencity(valuesArray[0].Contributors.results[pplIndex].EMail) == true) {
                                        multipleEmailAddress.push(valuesArray[0].Contributors.results[pplIndex].EMail);
                                        EmpIds.push(valuesArray[0].Contributors.results[pplIndex].Id);
                                        assignUserName.push(valuesArray[0].Contributors.results[pplIndex].Title);
                                    }
                                }
                            }
                            else {
                                alert("Project Admin is not defined for the logged_In user.");
                                IsProceed = false;
                                return false;
                            }
                        }
                    });
                }
                else if (TemplatesSteps[p].ApproverRole == "Departmental Project Admin") {
                    var Query = "?$select=*,Contributors/EMail,Contributors/Id,Contributors/Title,Company/Id&$expand=Contributors,Company&$filter=Company/Id eq '" + Logged_CompanyId + "' and Department/Id eq '" + Logged_DepartmentId.toString() + "' and WebPartName eq 'Project' ";
                    $.when(getItemsWithQuery('ProcessApprovers', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                        if (valuesArray.length > 0) {
                            if (valuesArray[0].Contributors.results != null) {
                                for (var pplIndex = 0; pplIndex < valuesArray[0].Contributors.results.length; pplIndex++) {
                                    if (checkEMpAuthencity(valuesArray[0].Contributors.results[pplIndex].EMail) == true) {
                                        multipleEmailAddress.push(valuesArray[0].Contributors.results[pplIndex].EMail);
                                        EmpIds.push(valuesArray[0].Contributors.results[pplIndex].Id);
                                        assignUserName.push(valuesArray[0].Contributors.results[pplIndex].Title);
                                    }
                                }
                            }
                            else {
                                alert("Departmental Project Admin is not defined for the logged_In user.");
                                IsProceed = false;
                                return false;
                            }
                        }
                    });
                }
                else if (TemplatesSteps[p].ApproverRole == "Process Admin") {
                    var Query = "?$select=*,Contributors/EMail,Contributors/Id,Contributors/Title,Company/Id&$expand=Contributors,Company&$filter=Company/Id eq '" + Logged_CompanyId + "' and WebPartName eq 'Process Admin' ";
                    $.when(getItemsWithQuery('ProcessApprovers', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                        if (valuesArray.length > 0) {
                            if (valuesArray[0].Contributors.results != null) {
                                for (var pplIndex = 0; pplIndex < valuesArray[0].Contributors.results.length; pplIndex++) {
                                    if (checkEMpAuthencity(valuesArray[0].Contributors.results[pplIndex].EMail) == true) {
                                        multipleEmailAddress.push(valuesArray[0].Contributors.results[pplIndex].EMail);
                                        EmpIds.push(valuesArray[0].Contributors.results[pplIndex].Id);
                                        assignUserName.push(valuesArray[0].Contributors.results[pplIndex].Title);
                                    }
                                }
                            }
                            else {
                                alert("Process Admin is not defined for the logged_In user.");
                                IsProceed = false;
                                return false;
                            }
                        }
                    });
                }
                else { // if (TemplatesSteps[p].ApproverRole == "Tech Admin")
                    var Query = "?$select=*,Contributors/EMail,Contributors/Id,Contributors/Title,Company/Id&$expand=Contributors,Company&$filter=Company/Id eq '" + Logged_CompanyId + "' and WebPartName eq 'Tech Admin' ";
                    $.when(getItemsWithQuery('ProcessApprovers', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                        if (valuesArray.length > 0) {
                            if (valuesArray[0].Contributors.results != null) {
                                for (var pplIndex = 0; pplIndex < valuesArray[0].Contributors.results.length; pplIndex++) {
                                    if (checkEMpAuthencity(valuesArray[0].Contributors.results[pplIndex].EMail) == true) {
                                        multipleEmailAddress.push(valuesArray[0].Contributors.results[pplIndex].EMail);
                                        EmpIds.push(valuesArray[0].Contributors.results[pplIndex].Id);
                                        assignUserName.push(valuesArray[0].Contributors.results[pplIndex].Title);
                                    }
                                }
                            }
                            else {
                                alert("Tech Admin is not defined for the logged_In user.");
                                IsProceed = false;
                                return false;
                            }
                        }
                    });
                }
            }
            else if (TemplatesSteps[p].ApproverType == "Runtime") { //Runtime
                multipleEmailAddress.push('Runtime');
                EmpIds.push('');
                assignUserName.push(TemplatesSteps[p].ApproverDecidingStep);
                OtherStepDetails.push({
                    ApproverType: TemplatesSteps[p].ApproverType,
                    ApproverRole: "",
                    ApproverDecidingStep: TemplatesSteps[p].ApproverDecidingStep
                });
            }
            else if (TemplatesSteps[p].ApproverType == "Group") { //Group
                var GroupName = TemplatesSteps[p].GroupName.Title;
                OtherStepDetails.push({
                    ApproverType: TemplatesSteps[p].ApproverType,
                    ApproverRole: "",
                    ApproverDecidingStep: ""
                });
                var Query = "?$select=*,Approvers/Id,Approvers/EMail,Approvers/Title&$expand=Approvers&$filter=Active eq '1' and Title eq '" + GroupName + "' ";
                $.when(getItemsWithQuery('ApproversGroups', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
                    if (valuesArray.length > 0) {
                        if (valuesArray[0].Approvers.results != null) {
                            for (var pplIndex = 0; pplIndex < valuesArray[0].Approvers.results.length; pplIndex++) {
                                if (checkEMpAuthencity(valuesArray[0].Approvers.results[pplIndex].EMail) == true) {
                                    multipleEmailAddress.push(valuesArray[0].Approvers.results[pplIndex].EMail);
                                    EmpIds.push(valuesArray[0].Approvers.results[pplIndex].Id);
                                    assignUserName.push(valuesArray[0].Approvers.results[pplIndex].Title);
                                }
                            }
                        }
                        else {
                            alert("Approvers not found.");
                            IsProceed = false;
                            return false;
                        }
                    }
                    else {
                        alert("Approvers not found.");
                        IsProceed = false;
                        return false;
                    }
                });
            }
            else { //Specific
                OtherStepDetails.push({
                    ApproverType: TemplatesSteps[p].ApproverType,
                    ApproverRole: "",
                    ApproverDecidingStep: ""
                });
                if (TemplatesSteps[p].Approvers.results != null) {
                    for (var pplIndex = 0; pplIndex < TemplatesSteps[p].Approvers.results.length; pplIndex++) {
                        if (checkEMpAuthencity(TemplatesSteps[p].Approvers.results[pplIndex].EMail) == true) {
                            multipleEmailAddress.push(TemplatesSteps[p].Approvers.results[pplIndex].EMail);
                            EmpIds.push(TemplatesSteps[p].Approvers.results[pplIndex].Id);
                            assignUserName.push(TemplatesSteps[p].Approvers.results[pplIndex].Title);
                        }
                    }
                }
                else {
                    alert("Approvers are not defined for the step.");
                    IsProceed = false;
                    return false;
                }
            }
            if (IsProceed == true) {
                AddMoreStep(multipleEmailAddress, assignUserName, EmpIds, OtherStepDetails);
            }
            else {
                $("#accordionapprovers").empty();
                $("#ApprovalStepBox").hide();
                $("#userselection").prop('checked', 'checked');
                $("#userbox-1").show();
                $("#userbox-2").hide();
            }

        }
    });
    $(".ForCustomizeOnly").remove();
    waitingDialog.hide();
}

//to check if User is Valid or not
function checkEMpAuthencity(Email) {
    var userValid = false;
    var txtCompanyId = Logged_CompanyId;//Logged_CompanyId
    RestQuery = "?$select=*,AttachmentFiles,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID, Department/DepartmentName,Company/ID&$orderby= FullName asc &$expand=AttachmentFiles,LogonName,Department,Company &$filter= Status eq 'Active' and (LogonName/EMail eq '" + Email + "' or Email eq '" + Email + "')&$top=5000";
    $.when(getItemsWithQuery('Employees', RestQuery, _spPageContextInfo.webAbsoluteUrl)).done(function (Employees) {
        try {
            if (Employees.length > 0) {
                userValid = true;
            }
            else {
                var todayDate = new Date();
                todayDate = todayDate.setDate(todayDate.getDate() - 1);
                todayDate = new Date(todayDate);
                //Check in External Users list
                var Query = "?$select=AttachmentFiles,LoginName/EMail,LoginName/Title,LoginName/Id,Supervisor/Title,Designation,Client_Name/Title,Client_Name/Id&$expand=AttachmentFiles,LoginName,Client_Name,Supervisor&$filter=LoginName/EMail eq '" + Email + "' and Status eq 'Active' and ValidUpto ge datetime'" + todayDate.toISOString() + "' &$top=5000";
                $.when(getItemsWithQuery('ExternalUsers', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ExtResults) {
                    if (ExtResults.length > 0) {
                        userValid = true;
                    }
                });
            }
        } catch (e) {
            alert(e);
            return false;
        }
    });
    return userValid;
}

//Predefined Approval ends ---------------------------------------------

var waitingDialog = waitingDialog || (function($) {
    'use strict';

    // Creating modal dialog's DOM
    var $dialog = $(
        '<div class="modal fade page-load-outer-div" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="overflow-y:visible;opacity: 1 !important;">' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content" style="box-shadow: 0 0px 0px;border:0px solid #999;background-color: rgba(255, 255, 255, .15);">' +
        '<div class="modal-header page-load-header" style="padding:0px !important;"><div class="loader"><div class="la-ball-pulse la-2x" style="margin-left:auto;margin-right:auto;"><div style="background-color:#d85757"></div><div style="background-color:#d85757"></div><div style="background-color:#d85757"></div></div></div><h3 style="margin:0;margin-left:15px;float:left;margin-top:6px;display:none;"></h3></div>' +
        '<div class="modal-body" style="display:none;">' +
        '<div class="progress progress-striped active" style="margin-bottom:0;display:none"><div class="progress-bar" style="width: 100%"></div></div>' +
        '</div>' +
        '</div></div></div>');

    return {
        /**
         * Opens our dialog
         * @param message Custom message
         * @param options Custom options:
         * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
         * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
         */
        show: function(message, options) {
            // Assigning defaults

            if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Processing...please wait';
            }
            var settings = $.extend({
                dialogSize: 'm',
                progressType: '',
                onHide: null // This callback runs after the dialog was hidden
            }, options);

            // Configuring dialog
            //$('.hidding-y-scroll').css('overflow-y','hidden');
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function(e) {
                    settings.onHide.call($dialog);
                });
            }
            // Opening dialog
           // $dialog.modal();
           
           $("#overlaysearch").fadeIn();
        },
        /**
         * Closes dialog
         */
        hide: function() {
        $("#overlaysearch").fadeOut();
           // $dialog.modal('hide');
            //$('.hidding-y-scroll').css('overflow-y','auto');
        }
    };

})(jQuery);
//bind all the defined Steps 
function BindAllDefinedSteps(StepName) {
	if($('#accordionapprovers .StepClass').length > 0){
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

//Show all the Approval histories for particular File
function ShowAllAppHistory(FileName) {
    var AppHis = '';
    $("#AllHistryBox").empty().html('<table class="table table-striped table-bordered" id="tblAllApprHist"><thead><tr id="AllHistoryTHead"></tr></thead><tbody id="tbdyAllApprHist"></tbody></table>');
    //Geenrating the THead of table
    var ColumnName = "";
    var ApprovalColNames = ['Initiated By', 'File Version', 'Last Action', 'Approvers', 'Signing App', ''];
    for (var i = 0; i < ApprovalColNames.length; i++) {
        ColumnName += '<th>' + ApprovalColNames[i] + '</th>';
    }
    $("#AllHistoryTHead").empty().append(ColumnName);

    var ApproverHTML = '<div class="approvarsimgs">';
    var Query = "?$select=*,Author/EMail,Author/Title,AllApprovers/EMail,AllApprovers/Title,AttachmentFiles&$expand=Author,AllApprovers,AttachmentFiles&$top=5000&$orderby=Created desc&$filter=DocumentID eq '" + DocumentId + "' and FileName eq '" + FileName + "' ";
    $.when(getItemsWithQuery("DocumentApprovalRequests", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            $("#AppFileName").text(valuesArray[0].FileName ? valuesArray[0].FileName : "");
            $("#AppFileTitle").text(valuesArray[0].ApprovalFileTitle ? valuesArray[0].ApprovalFileTitle : "");
            $("#AppFileRef").text(valuesArray[0].Reference ? valuesArray[0].Reference : "");
            for (var step = 0; step < valuesArray.length; step++) {
                ApproverHTML = '<div class="approvarsimgs">';
                if(valuesArray[step].AllApprovers.results != null) {
                    if (valuesArray[step].AllApprovers.results.length >= 4) {
                        for (var app = 0; app < 4; app++) {
                            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].AllApprovers.results[app].EMail);
                            ApproverHTML += '<img title="'+valuesArray[step].AllApprovers.results[app].Title+'" src="' + attachment + '" alt="">';
                        }
                        ApproverHTML += '<button type="button" onclick="ShowAllApprovers(\'' + valuesArray[step].Id + '\');" class="btn custom-btn custom-btn-two groupmultisec" style="cursor: pointer;" data-toggle="modal" data-target="#Approverslisting"><i class="fa fa-angle-double-right"></i></button>';
                    }
                    else {
                        for (var app = 0; app < valuesArray[step].AllApprovers.results.length; app++) {
                            attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].AllApprovers.results[app].EMail);
                            ApproverHTML += '<img title="'+valuesArray[step].AllApprovers.results[app].Title+'" src="' + attachment + '" alt="">';
                        }
                    }
                }
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(valuesArray[step].Author.EMail);
                AppHis += '<tr><td><div class="flexingtwo"><img src="' + attachment + '"><div class="designationtype"><h3 class="namesection">' + valuesArray[step].Author.Title + '</h3>';
                AppHis += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + valuesArray[step].Author.EMail + '\');" class="emailsec">' + valuesArray[step].Author.EMail + '</a>';
                AppHis += '<div style="margin-top: 5px;">' + moment(valuesArray[step].Created).format('DD-MMM-YYYY hh:mm A') + '</div></div></div><div style="margin-top:10px; font-size:11px;">';
                AppHis += '</div></td>';
                AppHis += '<td style="text-align:center">' + valuesArray[step].ApprovedVersion + '</td><td style="text-align:center">' + moment(valuesArray[step].Modified).format('DD-MMM-YYYY hh:mm A') + '</td>';
                AppHis += '<td>' + ApproverHTML + '</div></td>';
                AppHis += '<td style="text-align:center">' + valuesArray[step].SigningApp + '</td>';
                AppHis += '<td><div class="bothboxs"><a href="javascript:void(0);">';
                if (valuesArray[step].Status == "Pending" || valuesArray[step].Status == "Not Started") {
                    AppHis += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-3.png" onclick="BindApprovalHistory(' + valuesArray[step].Id + ');" alt="" style="width: 20px; height: 20px;"></a>';
                }
                else if (valuesArray[step].Status == "Approved") {
                    AppHis += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-4.png" onclick="BindApprovalHistory(' + valuesArray[step].Id + ');" alt="" style="width: 20px; height: 20px;"></a>';
                    if (valuesArray[step].AttachmentFiles.results.length > 0) {
                        for (var k = 0; k < valuesArray[step].AttachmentFiles.results.length; k++) {
                            Filename = valuesArray[step].AttachmentFiles.results[k].FileName;
                            if (Filename.indexOf("_Approved") !== -1) {
                                AppHis += '<div class="m-0 upload-chip"><span class="pr-8 chip-text-box" title="' + valuesArray[step].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);">' + valuesArray[step].AttachmentFiles.results[k].FileName + '</span>';
                                AppHis += '<a class="chip-icon-box" href="' + valuesArray[step].AttachmentFiles.results[k].ServerRelativeUrl + '" name="' + valuesArray[step].AttachmentFiles.results[k].ServerRelativeUrl + '" download><i class="fa fa-download" aria-hidden="true"></i></a></div>';
                            }
                        }
                    }
                }
                else {//Rejected
                    AppHis += '<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/MyDocuments/AdvanceDocumentSearch/assets/images/time-icon-5.png" onclick="BindApprovalHistory(' + valuesArray[step].Id + ');" alt="" style="width: 20px; height: 20px;"></a>';
                }
                AppHis += '</div></td></tr>';
            }
            $("#tbdyAllApprHist").empty().append(AppHis);
            if (AllAppHistTable != '') {
                AllAppHistTable.destroy();
            }
            AllApprHistPagination();
        }
        else {
            $("#tbdyAllApprHist").empty().append('<tr><td colspan=6><div>No record found!</div></td></tr>');
        }
    });
}

//method for pagination of Approvals
function AllApprHistPagination() {
    AllAppHistTable = $('#tblAllApprHist').DataTable({
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
    $("#tblAllApprHist_filter").hide();
    $('#AllApprHistSearch').keyup(function () {
        AllAppHistTable.search($(this).val()).draw();
    });
}

//tp show all the apporvers in modal
function ShowAllApprovers(itemid) {
    $('#ulAllApprovers').html('');
    var Query = "?$select=*,AllApprovers/EMail,AllApprovers/Title&$expand=AllApprovers&$filter=DocumentID eq '" + DocumentId + "' and Id eq '" + itemid+ "' ";
    $.when(getItemsWithQuery("DocumentApprovalRequests", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (items) {
        if (items.length > 0) {
            var li = '';
            var attachment = '';
            for (var m = 0; m < items[0].AllApprovers.results.length; m++) {
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].AllApprovers.results[m].EMail);
                li += '<li><div class="Approversperson"><img src="' + attachment + '" data-themekey="#">';
                li += '<div class="Approverspersondetail"><p>' + items[0].AllApprovers.results[m].Title + '</p>';
                li += '<a href="javascript:void(0);" onclick="OpenOutLook(\'' + items[0].AllApprovers.results[m].EMail + '\')">' + items[0].AllApprovers.results[m].EMail + '</a></div></div></li>';
            }
            $('#ulAllApprovers').append(li);
        }
    });
}

//open the attachments in Iframe
function ShowFileInIFrame(Action) {
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
    var container = $("#sign-viewer").empty();
    if (ServerSrc.match(/\.(docx|xlsx)$/) != null) {
        src = _spPageContextInfo.webAbsoluteUrl + "/_layouts/15/Doc.aspx?sourcedoc=" + ServerSrc + "&action=view&mobileredirect=true";
    }
    else {
        src = ServerSrc + "?web=1";
    }
    $('<iframe>', {
        src: iframeUrl1,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);

    IntervalId = setInterval(function () {
        $("#iframe-viewer").contents().find("#AppHeaderPanel").hide();
        $("#iframe-viewer").contents().find("#AppHeaderPanel").remove();
    }, 2000);
    $("#AttachmentView").modal("show");
}

//get all the forwardee list and thier feedback
function GetAllForwardee(ApprovalQId) {
    var forwardee = '';
    var attachment = '';
    var IsContentVisible = false;
    var alreadyBindArray = [];
    var arrTemp = [];
    var Query = "?$select=*,ApprovalQueueID/Id,ForwardedBy/EMail,ForwardedBy/Title,ForwardedTo/EMail,ForwardedTo/Title,AttachmentFiles&$expand=AttachmentFiles,ApprovalQueueID,ForwardedTo,ForwardedBy&$top=5000&$orderby=ForwardedTime asc&$filter=ApprovalQueueID/Id eq '" + ApprovalQId + "' ";
    $.when(getItemsWithQuery("DocumentApprovalForward", Query, _spPageContextInfo.webAbsoluteUrl)).done(function (valuesArray) {
        if (valuesArray.length > 0) {
            for (var i = 0; i < valuesArray.length; i++) {
                IsContentVisible = false;
                if (valuesArray[i].ForwardedBy.EMail.toLowerCase() == _spPageContextInfo.userEmail.toLowerCase()) {
                    IsContentVisible = true;
                }
                else if (valuesArray[i].RestrictViewToOther == false) {
                    IsContentVisible = true;
                }
                if (IsContentVisible == true) {
                    if (jQuery.inArray(valuesArray[i].ForwardedTime, alreadyBindArray) == '-1') {
                        arrTemp = [];
                        alreadyBindArray.push(valuesArray[i].ForwardedTime);
                        var currentModule = valuesArray[i].ForwardedTime;
                        arrTemp = valuesArray.filter(function (obj) { //Filter array on the basis of CurrentPhase
                            return new Date(obj.ForwardedTime).getTime() == new Date(currentModule).getTime();
                        });
                        arrTemp[0].ForwardRemarks = arrTemp[0].ForwardRemarks ? arrTemp[0].ForwardRemarks: '';
                        forwardee += '<ul class="forwardlist"><li class="forward_by_section"><h3 class="forwrad_heading">Forward by</h3>';
                        forwardee += '<div class="forward_by row"><div class="col-md-8"><div class="flexitem"><div class="imgsetion">';
                        attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrTemp[0].ForwardedBy.EMail);
                        forwardee += '<img src="' + attachment + '" alt=""></div><div class="imagecontent">';
                        forwardee += '<h4>' + arrTemp[0].ForwardedBy.Title + '</h4><a href="javascript:void(0);" onclick="OpenEmail(\'' + arrTemp[0].ForwardedBy.EMail + '\');">' + arrTemp[0].ForwardedBy.EMail + '</a></div></div><div class="wraping_only">';
                        forwardee += '<div class="remarkboxsec"><span><label for="">Remark</label><label for="">:</label></span><p>' + arrTemp[0].ForwardRemarks + '</p></div></div>';
                        forwardee += '<div class="ReviewAttachBox" style="display:none;"><div class="upload-chip"><span class="chip-text-box">information_detail.png</span>';
                        forwardee += '<span class="chip-icon-box"><a href="#"><i class="fa fa-download"></i></a></span></div></div>';
                        forwardee += '</div><div class="col-md-4"><div class="date_showing"><span>' + ShowCommonStandardDateFormat(new Date(arrTemp[0].ForwardedTime)) + '</span></div></div></div>';
                        forwardee += '<ul class="forwardlist_child">';

                        for (var j = 0; j < arrTemp.length; j++) {
                            if (j == 0) {
                                forwardee += '<li><h3 class="forwrad_heading">Forward to</h3><div class="forward_to row">';
                                forwardee += '<div class="col-md-8"><div class="flexitem"><div class="imgsetion">';
                                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrTemp[j].ForwardedTo.EMail);
                                forwardee += '<img src="' + attachment + '" alt=""></div><div class="imagecontent"><h4>' + arrTemp[j].ForwardedTo.Title + '</h4>';
                                forwardee += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + arrTemp[j].ForwardedBy.EMail + '\');">' + arrTemp[j].ForwardedTo.EMail + '</a></div></div><div class="wraping_only"><div class="remarkboxsec">';

                                if (arrTemp[j].FeedBackRemarks != null && arrTemp[j].FeedBackRemarks != "null" && arrTemp[j].FeedBackRemarks != "") {
                                    forwardee += '<span><label for="">Remark</label><label for="">:</label></span><p>' + arrTemp[j].FeedBackRemarks + '</p>';
                                }
                                forwardee += '</div></div><div class="ReviewAttachBox">';
                                if (arrTemp[j].AttachmentFiles.results.length > 0) {
                                    for (var k = 0; k < arrTemp[j].AttachmentFiles.results.length; k++) {
                                        forwardee += '<div class="upload-chip"><span class="chip-text-box" title="' + arrTemp[j].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);">' + arrTemp[j].AttachmentFiles.results[k].FileName + '</span>';
                                        forwardee += '<span class="chip-icon-box"><a href="' + arrTemp[j].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl + '" download><i class="fa fa-download"></i></a></span></div>';
                                    }
                                }
                                forwardee += '</div></div><div class="col-md-4"><div class="remarkboxsec ">';
                                if (arrTemp[j].FeedBack != "" && arrTemp[j].FeedBack != null && arrTemp[j].FeedBack != "null") {
                                    forwardee += '<span><label for="">Feedback</label><label for="">:</label></span><p style="margin-left: 3px;">' + arrTemp[j].FeedBack + '</p>';
                                    forwardee += '</div><div class="date_gmt_time" style=""><div class="date_secbx"><span class="frwd_date">' + ShowCommonStandardDateFormat(new Date(arrTemp[j].Modified)) + '</span>';
                                    forwardee += '</div><span style="display:none;">GMT + 5:30 (IST)</span></div></div></div></li>';
                                }
                                else {
                                    forwardee += '<span><label for="">Feedback Pending</label>';
                                    forwardee += '</div><div class="date_gmt_time" style="">';
                                    forwardee += '<span style="display:none;">GMT + 5:30 (IST)</span></div></div></div></li>';
                                }
                            }
                            else {
                                forwardee += '<li><div class="forward_to row">';
                                forwardee += '<div class="col-md-8"><div class="flexitem"><div class="imgsetion">';
                                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(arrTemp[j].ForwardedTo.EMail);
                                forwardee += '<img src="' + attachment + '" alt=""></div><div class="imagecontent"><h4>' + arrTemp[j].ForwardedTo.Title + '</h4>';
                                forwardee += '<a href="javascript:void(0);" onclick="OpenEmail(\'' + arrTemp[j].ForwardedBy.EMail + '\');">' + arrTemp[j].ForwardedTo.EMail + '</a></div></div><div class="wraping_only"><div class="remarkboxsec">';

                                if (arrTemp[j].FeedBackRemarks != null && arrTemp[j].FeedBackRemarks != "null" && arrTemp[j].FeedBackRemarks != "") {
                                    forwardee += '<span><label for="">Remark</label><label for="">:</label></span><p>' + arrTemp[j].FeedBackRemarks + '</p>';
                                }
                                forwardee += '</div></div><div class="ReviewAttachBox">';
                                if (arrTemp[j].AttachmentFiles.results.length > 0) {
                                    for (var k = 0; k < arrTemp[j].AttachmentFiles.results.length; k++) {
                                        forwardee += '<div class="upload-chip"><span class="chip-text-box" title="' + arrTemp[j].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl + '" onclick="priviewfile(this);">' + arrTemp[j].AttachmentFiles.results[k].FileName + '</span>';
                                        forwardee += '<span class="chip-icon-box"><a href="' + arrTemp[j].AttachmentFiles.results[k].ServerRelativePath.DecodedUrl + '" download><i class="fa fa-download"></i></a></span></div>';
                                    }
                                }
                                if (arrTemp[j].FeedBack != "" && arrTemp[j].FeedBack != null && arrTemp[j].FeedBack != "null") {
                                    forwardee += '</div>';
                                    forwardee += '</div><div class="col-md-4"><div class="remarkboxsec"><span><label for="">Feedback</label><label for="">:</label></span><p style="margin-left: 3px;">' + arrTemp[j].FeedBack + '</p></div><div class="date_gmt_time" style=""><div class="date_secbx"><span class="frwd_date">' + ShowCommonStandardDateFormat(new Date(arrTemp[j].Modified)) + '</span>';
                                    forwardee += '</div><span style="display:none;">GMT + 5:30 (IST)</span></div></div></div></div></li>';
                                }
                                else {
                                    forwardee += '</div>';
                                    forwardee += '</div><div class="col-md-4"><div class="remarkboxsec"><span><label for="">Feedback Pending</label></span></div><div class="date_gmt_time" style="">';
                                    forwardee += '<span style="display:none;">GMT + 5:30 (IST)</span></div></div></div></div></li>';
                                }
                            }
                        }
                        forwardee += '</ul></li></ul></div></div></div></div>';
                    }
                }
            }
        }
        else {
            forwardee = '<div class="row"><h3 class="forwrad_heading">No Record Found</h3></div>';
        }
        if (forwardee == '') {
            forwardee = '<div class="row"><h3 class="forwrad_heading">No Record Found</h3></div>';
        }
        $("#listForwardee").empty().append(forwardee);
        $("#forwarding_process").modal('show');
    });
}


//Sort Date by 'Date and Time'
function sortByDate (arr) {
    const sorter = (a, b) => {
        return new Date(a.ForwardedTime).getTime() - new Date(b.ForwardedTime).getTime();
}
arr.sort(sorter);
};

//get Approval Inbox and Outbox Exported excel
function ApprovalExport() {
    var Approval = '';
    var DueDate = '';
    var Validity = '';
    var NextActionBy = '';
    var LastActionName = '';
    var ApprovalResults = [];
    
    $("#ExportUserName").text(_spPageContextInfo.userDisplayName);
    $("#ExportUserEmail").text(_spPageContextInfo.userEmail);
    $("#ExportUserDate").text(ShowCommonStandardDateFormat(new Date()));

    //get Approval Inbox first
    if (arrApprovalInAll.length == 0) {
        var Query = "?$select=*,LastActionby/EMail,AllApprovers/EMail,LastActionby/Title,NextActionby/EMail,NextActionby/Title,Author/Title,Author/EMail,AttachmentFiles&$expand=AllApprovers,LastActionby,NextActionby,Author,AttachmentFiles&$orderby=Modified desc&$filter=((LastActionby/EMail eq '" + _spPageContextInfo.userEmail + "' or LastActionApprover eq '" + _spPageContextInfo.userEmail + "' or LastActionApprover eq '" + _spPageContextInfo.userDisplayName + "') and (Status eq 'Approved' or Status eq 'Reject' or Status eq 'Pending'))  or ((NextActionby/EMail eq '" + _spPageContextInfo.userEmail + "' or NextActionApprover eq '" + _spPageContextInfo.userEmail + "') and Status eq 'Pending') or ((AllApprovers/EMail eq '" + _spPageContextInfo.userEmail + "') and (Status eq 'Approved' or Status eq 'Reject'))";
        $.when(getItemsWithQuery('DocumentApprovalRequests', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (ApprovalIn) {
            ApprovalResults = ApprovalResults.concat(ApprovalIn);
        });
    }
    else {
        ApprovalResults = ApprovalResults.concat(arrApprovalInAll);
    }
    //then get Approval Outbox 
    if (arrApprovalOutAll.length == 0) {
        var Query = "?$select=*,LastActionby/EMail,LastActionby/Title,NextActionby/EMail,NextActionby/Title,Author/Title,Author/EMail,AttachmentFiles&$orderby=Modified desc&$expand=LastActionby,NextActionby,Author,AttachmentFiles&$filter=Author/EMail eq '" + _spPageContextInfo.userEmail + "' ";
        $.when(getItemsWithQuery('DocumentApprovalRequests', Query, _spPageContextInfo.webAbsoluteUrl)).done(function (Approvalout) {
            ApprovalResults = ApprovalResults.concat(Approvalout);
        });
    }
    else {
        ApprovalResults = ApprovalResults.concat(arrApprovalOutAll);
    }

    for (var i = 0; i < ApprovalResults.length; i++) {
        NextActionBy = '';
        DueDate = ApprovalResults[i].DueDate ? ApprovalResults[i].DueDate : "";
        if (DueDate != "") {
            DueDate = ShowCommonStandardDateFormat(new Date(ApprovalResults[i].DueDate));
        }
        Validity = ApprovalResults[i].DueDate ? ApprovalResults[i].DueDate : "";
        if (Validity != "") {
            Validity = ShowCommonStandardDateFormat(new Date(ApprovalResults[i].ApprovalValidity));
        }
        if (ApprovalResults[i].LastActionby.EMail == _spPageContextInfo.userEmail && ApprovalResults[i].Status != "Reject" && ApprovalResults[i].Status == "Pending") {
            ApprovalResults[i].Status = ApprovalResults[i].LastAction + ": Done";
        }
        if (ApprovalResults[i].LastActionby.Title != '') {
            LastActionName = ApprovalResults[i].LastActionby.Title;
        }
        else {
            LastActionName = ApprovalResults[i].LastActionApprover;
        }
        LastActionName = LastActionName ? LastActionName : '';
        //NextApprovers
        if (ApprovalResults[i].NextActionby.results != undefined) {
            for (var app = 0; app < ApprovalResults[i].NextActionby.results.length; app++) {
                NextActionBy += ApprovalResults[i].NextActionby.results[app].Title + ', ';
            }
            NextActionBy = NextActionBy.substring(0, NextActionBy.length - 2);
        }
        else {
            if (ApprovalResults[i].NextActionApprover != null) {
                NextActionBy += ApprovalResults[i].NextActionApprover;
            }
        }
        ApprovalResults[i].DocumentType = ApprovalResults[i].DocumentType ? ApprovalResults[i].DocumentType : '';
        ApprovalResults[i].Reference = ApprovalResults[i].Reference ? ApprovalResults[i].Reference : '';
        ApprovalResults[i].Purpose = ApprovalResults[i].Purpose ? ApprovalResults[i].Purpose : '';
        ApprovalResults[i].ApprovalFileTitle = ApprovalResults[i].ApprovalFileTitle ? ApprovalResults[i].ApprovalFileTitle : '';
        ApprovalResults[i].NextAction = ApprovalResults[i].NextAction ? ApprovalResults[i].NextAction: '';
		
        Approval += '<tr><td>' + ApprovalResults[i].ApprovalFileTitle + '</td>';
        Approval += '<td>' + ApprovalResults[i].FileName + '</td>';
        Approval += '<td>' + ApprovalResults[i].OriginDMS + '</td>';
        Approval += '<td>' + ApprovalResults[i].DocumentType + '</td>';
        Approval += '<td>' + ApprovalResults[i].Reference + '</td>';
        Approval += '<td>' + ApprovalResults[i].Purpose + '</td>';
        Approval += '<td>' + ApprovalResults[i].Priority + '</td>';
        Approval += '<td>' + ApprovalResults[i].Status + '</td>';
        Approval += '<td>' + ApprovalResults[i].Author.Title + '</td>';
        Approval += '<td>' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Created)) + '</td>';
        Approval += '<td>' + DueDate + '</td>';
        Approval += '<td>' + ShowCommonStandardDateFormat(new Date(ApprovalResults[i].Modified)) + '</td>';
        Approval += '<td>' + LastActionName + '</td>';
        Approval += '<td>' + Validity + '</td>';
        Approval += '<td>' + ApprovalResults[i].NextAction + '</td>';
        Approval += '<td>' + NextActionBy + '</td>';
        Approval += '</tr>';
    }
    $("#ExportApprovaltbody").empty().append(Approval);

    $('#TBLExportApproval').tableExport({
        type: 'csv',
        fileName: "Approval Documents"
    });
}

//Bhawana
const myData=[{extension:"EXE"},{extension:"DLL"},{extension:"PHP"},{extension:"LNK"},{extension:"SYS"},{extension:"SWF"},{extension:"JAR"},{extension:"SCR"},{extension:"GZQUAR"},{extension:"ZIX"},{extension:"COM"},{extension:"BAT"},{extension:"OCX"},{extension:"VBS"},{extension:"CLASS"},{extension:"BIN"},{extension:"WS"},{extension:"DRV"},{extension:"OZD"},{extension:"WMF"},{extension:"ARU"},{extension:"SHS"},{extension:"DEV"},{extension:"CHM"},{extension:"PGM"},{extension:"XNXX"},{extension:"PIF"},{extension:"XLM"},{extension:"VXD"},{extension:"VBE"},{extension:"TPS"},{extension:"PCX"},{extension:"VBA"},{extension:"BOO"},{extension:"DXZ"},{extension:"SOP"},{extension:"TSA"},{extension:"HLP"},{extension:"VB"},{extension:"EXE1"},{extension:"BKD"},{extension:"RHK"},{extension:"VBX"},{extension:"LIK"},{extension:"OSA"},{extension:"CIH"},{extension:"MJZ"},{extension:"DLB"},{extension:"PHP3"},{extension:"DYZ"},{extension:"WSC"},{extension:"DOM"},{extension:"HLW"},{extension:"S7P"},{extension:"MJG"},{extension:"CLA"},{extension:"SPAM"},{extension:"MFU"},{extension:"DYV"},{extension:"KCD"},{extension:"BUP"},{extension:"MCQ"},{extension:"WSH"},
{extension:"BXZ"},{extension:"UPA"},{extension:"XIR"},{extension:"BHX"},{extension:"DLI"},{extension:"TXS"},{extension:"CXQ"},{extension:"FNR"},
{extension:"XDU"},{extension:"XLV"},{extension:"SKA"},{extension:"DLLX"},{extension:"TTI"},{extension:"VEXE"},{extension:"QRN"},{extension:"XTBL"},
{extension:"FAG"},{extension:"OAR"},{extension:"CEO"},{extension:"TKO"},{extension:"UZY"},{extension:"BLL"},{extension:"DBD"},{extension:"PLC"},
{extension:"SSY"},{extension:"BLF"},{extension:"ZVZ"},{extension:"CC"},{extension:"CE0"},{extension:"NLS"},{extension:"CTBL"},{extension:"HSQ"},
{extension:"IWS"},{extension:"VZR"},{extension:"LKH"},{extension:"EZT"},{extension:"RNA"},{extension:"HTS"},{extension:"ATM"},{extension:"AEPL"},
{extension:"LET"},{extension:"FUJ"},{extension:"AU"},{extension:"FJL"},{extension:"BUK"},{extension:"DELF"},{extension:"BMW"},{extension:"CYW"},
{extension:"BPS"},{extension:"IVA"},{extension:"PID"},{extension:"DZ"},{extension:"QIT"},{extension:"LOK"},{extension:"XNT"}];

var Istrue=false;
function returnExtension(input) {
    let filteredNames = myData.filter(e => e.extension.toLowerCase() === input.toLowerCase());
    if(filteredNames.length > 0) {
        Istrue = true;
    } else {
        Istrue = false;
    }
    return Istrue;
}