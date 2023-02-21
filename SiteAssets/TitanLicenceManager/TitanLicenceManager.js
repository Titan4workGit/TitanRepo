var AllEmployeeUser = "";
var IsIntranet = false;
var IsDMS = false;
var IsProjectTask = false;
var AssignIntranet = "";
var AssignDMS = "";
var AssignProject = "";
var assignusertable = "";
var assignusertablefilter = "";
var IntranetCount = 0;
var DMSCount = 0;
var ProjectCount = 0;
var BPassCount = 0;
var ConsumedLicense = 0;
var RestQuery = ""
var IsNotSubscribedIntrenet = false;
var IsNotSubscribedDMS = false;
var IsNotSubscribedProject = false;
var IsValueSet = false;
var AllEmployees = [];
var LicProjectTaskAvilableCount = 0;
var ConsumedLicenseType = "";
var LicIntranetAvilableCount = 0;
var LicDMSAvilableCount = 0;
var SetNewProject = false;
var SetNewInternet = false;
var SetNewDMS = false;
var SetNewBpass = false;
var filtermessage="Retrieve the Employee list";
$(document).ready(function() {
    if(!activeCheck) {
        $('#view-agreement-modal').modal('show');
    }
    licenseValidDate.setDate(licenseValidDate.getDate() - 1);
    $('#validuptodate').html(licenseValidDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }));
    //var localStorageData = JSON.parse(localStorageLanguage);
    //$("#LogoImages").attr("src", localStorageData.data);
    var TechAdmins = getCompanyApprovers();
    var IsUser = TechAdmins.filter(function(obj) {
        return obj.Id == _spPageContextInfo.userId;
    });
    if(IsUser.length == 0 && _spPageContextInfo.isSiteAdmin == false) {
        alert("Authorization has been denied for this page");
        document.location.href = _spPageContextInfo.webServerRelativeUrl;
    } else {
        Getallinfomation();
    }
    $('#txtSearch').keyup(function() {
        // var table = $('#assignusertable').DataTable();
        assignusertable.search($(this).val()).draw();
    })
    $('#DefaultHome').html("");
    $('#DefaultHome').append('<option value="-Select-">-Select-</option>');
    if(IsNotSubscribedIntrenet) {
        $('#DefaultHome').append('<option value="Pages/Home.aspx">Intranet Home</option>');
        $('#DefaultHome').append('<option value="Pages/Myworkplace.aspx">My Workplace</option>');
    }
    if(IsNotSubscribedDMS) {
        $('#DefaultHome').append('<option value="Pages/Document.aspx">My Document</option>');
        $('#DefaultHome').append('<option value="Pages/DocumentTypesCounter.aspx">Company Documents</option>');
    }
    if(IsNotSubscribedProject) {
        $('#DefaultHome').append('<option value="Pages/ViewAllProjects.aspx">Projects Dashboard</option>');
        //$('#DefaultHome').append('<option value=""></option>');
    }
    if(IsBpassModules) {
        $('#DefaultHome').append('<option value="Pages/approvals.aspx">Approvals Dashboard</option>');
    }
    selectElement('DefaultHome', GetWelcomePage());
    $("#DefaultHome").change(function() {
        if($('option:selected', $(this)).val() != "-Select-") {
            SetDefaultPage($('option:selected', $(this)).val(), true);
        }
    });
});

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

function Getallinfomation() {
    var AvilableLicense = GetAvailbleLicence();
    BPassCount = GetApprovalProcessMaster();
    ConsumedLicense = UsersLicenceRequired - AvilableLicense;
    $('#ConsumedLicense').html('');
    $('#ConsumedLicense').append('<h4 class="m-0">' + ConsumedLicense + '</h4>');
    $('#AvilableLicense').html('');
    $('#AvilableLicense').append('<h4 class="m-0">' + AvilableLicense + '</h4>');
    if(TypeofLincnse != "Enterprise") {
        IntranetCount = 0;
        DMSCount = 0;
        ProjectCount = 0;
        for(var i = 0; i < AllEmployees.length; i++) {
            IsDMS = false;
            IsIntranet = false;
            IsProjectTask = false;
            if(AllEmployees[i].EmpLicense != null) {
                var EmpLicense = CryptoJS.AES.decrypt(AllEmployees[i].EmpLicense, "@d@ptT!t@n");
                var EmpLinceseEncript = EmpLicense.toString(CryptoJS.enc.Utf8);
                if(EmpLinceseEncript.search(/Internet/i) > 0) {
                    IsIntranet = true;
                    IntranetCount++;
                } else {
                    IsIntranet = false;
                }
                if(EmpLinceseEncript.search(/DMS/i) > 0) {
                    IsDMS = true;
                    DMSCount++;
                } else {
                    IsDMS = false;
                }
                if(EmpLinceseEncript.search(/Project/i) > 0) {
                    IsProjectTask = true;
                    ProjectCount++;
                } else {
                    IsProjectTask = false;
                }
            }
        }
    }
    $("#Licensetype").text(TypeofLincnse)
    $('#NomberofuserCount').html('');
    $('#NomberofuserCount').append('<h4 class="m-0">' + UsersLicenceRequired + ' </h4>');
    $('#BPass').html('');
    $('#BPassconsumed').html('');
    $('#BPassAvilable').html('');
    if(IsBpassModules) {
        var BPassAvilable = LicBPaas - BPassCount;
        $('#BPass').append('<h4 class="m-0">' + LicBPaas + ' Processes </h4>');
        $('#BPassconsumed').append('<h4 class="m-0">' + BPassCount + ' Processes </h4>');
        $('#BPassAvilable').append('<h4 class="m-0">' + BPassAvilable + ' Processes </h4>');
    } else {
        $('#BPass').append('<h4 class="m-0">No Processes </h4>');
    }
    $('#LicIntranet').html('');
    $('#Intrnetpopup').html('');
    $('#LicIntranetAvilable').html('');
    $('#LicIntranetconsumed').html('')
    var Popuphtml = ""
    if(LicIntranet == "All") {
        IsIntranet = true;
        $('#LicIntranet').append('<h4 class="m-0"> Everyone </h4>');
        $('#LicIntranetAvilable').append('<h4 class="m-0"> - </h4>');
        $('#LicIntranetconsumed').append('<h4 class="m-0"> - </h4>');
        IsNotSubscribedIntrenet = true;
        Popuphtml = '<div class="col-xs-12 assign-licence-top-card-hight">' + '<div class="main-card-data1">' + '<span>Intranet</span>' + '<div class="main-card-data2 color-green main-card-data2-title assign-user-card-count-align"> Everyone</div>' + '</div>' + '</div>';
        $('#Intrnetpopup').append(Popuphtml);
    } else if(LicIntranet > 0) {
        IsNotSubscribedIntrenet = true;
        var LicIntranetAvilable = LicIntranet - IntranetCount;
        LicIntranetAvilableCount = LicIntranetAvilable;
        $('#LicIntranetAvilable').append('<h4 class="m-0"> ' + LicIntranetAvilable + '</h4>');
        $("#divInternetassign").show();
        $('#LicIntranet').append('<h4 class="m-0">' + LicIntranet + ' </h4>');
        $('#LicIntranetconsumed').append('<a href="javascript:void(0)" onclick="GetConsumedLic(\'Internet\',\'' + IntranetCount + '\',\'' + LicIntranetAvilable + '\',\'true\')" ><h4 class="m-0cursor-pointer" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static">' + IntranetCount + ' </h4></a>');
        Popuphtml = '<div class="col-xs-12 assign-licence-top-card-hight">' + '<div class="main-card-data1">' + '<span>Intranet</span>' + '<div class="main-card-data2 color-green main-card-data2-title assign-user-card-count-align" >' + '<div class="mb5 d-flex justify-content-between color-red">' + '<span id="LicIntranetSelecte">Consumed:&nbsp;</span>' + '<span id="LicIntranetConsumedCount" >' + IntranetCount + '</span>' + '</div>' + '<div class="d-flex justify-content-between color-green">' + '<span>Available:&nbsp;</span>' + '<span id="LicIntranetAvilableCount">' + LicIntranetAvilable + '</span>' + '</div>' + '</div>' + '</div>' + '</div>';
        $('#Intrnetpopup').append(Popuphtml);
    } else {
        $("#divInternetassign").hide();
        IsNotSubscribedIntrenet = false;
        $('#LicIntranet').append('<h4 class="m-0 color-red">Not Subscribed</h4>');
        //$('#Intrnetpopup').append('<div class="main-card-data2 color-grey main-card-data2-title assign-user-card-count-align"> Not subscribed</div>');
        Popuphtml = '<div class="col-xs-12 assign-licence-top-card-hight">' + '<div class="main-card-data1">' + '<span>Intranet</span>' + '<div class="main-card-data2 color-grey main-card-data2-title assign-user-card-count-align">Not subscribed</div>' + '</div>' + '</div>';
        $('#Intrnetpopup').append(Popuphtml);
    }
    $('#LicDMS').html('');
    $('#LicDMSconsumed').html('');
    $('#LicDMSAvilable').html('');
    $('#DMSpopup').html('');
    Popuphtml = ""
    if(LicDMS == "All") {
        $('#LicDMS').append('<h4 class="m-0"> Everyone </h4>');
        $('#LicDMSconsumed').append('<h4 class="m-0"> - </h4>');
        $('#LicDMSAvilable').append('<h4 class="m-0"> - </h4>');
        IsDMS = true;
        IsNotSubscribedDMS = true;
        Popuphtml = '<div class="col-xs-12 assign-licence-top-card-hight">' + '<div class="main-card-data1">' + '<span>DMS</span>' + '<div class="main-card-data2 color-green main-card-data2-title assign-user-card-count-align"> Everyone</div>' + '</div>' + '</div>';
        $('#DMSpopup').append(Popuphtml);
    } else if(LicDMS > 0) {
        var LicDMSAvilable = LicDMS - DMSCount;
        LicDMSAvilableCount = LicDMSAvilable;
        IsNotSubscribedDMS = true;
        $('#LicDMS').append('<h4 class="m-0">' + LicDMS + ' </h4>');
        $("#divDMSassign").show();
        $('#LicDMSconsumed').append('<a href="javascript:void(0)" onclick="GetConsumedLic(\'DMS\',\'' + DMSCount + '\',\'' + LicDMSAvilable + '\',\'true\')" ><h4 class="m-0" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static">' + DMSCount + ' </h4><a/>');
        $('#LicDMSAvilable').append('<h4 class="m-0">' + LicDMSAvilable + ' </h4>');
        Popuphtml = '<div class="col-xs-12 assign-licence-top-card-hight ">' + '<div class="main-card-data1">' + '<span>DMS</span>' + '<div class="main-card-data2 color-green main-card-data2-title assign-user-card-count-align" >' + '<div class="mb5 d-flex justify-content-between color-red">' + '<span id="LicdmsSelected" >Consumed:&nbsp;</span>' + '<span id="LicDMSConsumedCount"> ' + DMSCount + '</span>' + '</div>' + '<div class="d-flex justify-content-between color-green">' + '<span>Available:&nbsp;</span>' + '<span id="LicDMSAvilableCount">' + LicDMSAvilable + '</span>' + '</div>' + '</div>' + '</div>' + '</div>';
        $('#DMSpopup').append(Popuphtml);
    } else {
        $('#LicDMS').append('<h4 class="m-0 color-red">Not Subscribed </h4>');
        $("#divDMSassign").hide();
        IsNotSubscribedDMS = false;
        Popuphtml = '<div class="col-xs-12 assign-licence-top-card-hight">' + '<div class="main-card-data1">' + '<span>DMS</span>' + '<div class="main-card-data2 color-grey main-card-data2-title assign-user-card-count-align">Not subscribed</div>' + '</div>' + '</div>';
        $('#DMSpopup').append(Popuphtml);
    }
    $('#LicProjectTask').html('');
    $('#LicProjectTaskconsumed').html('');
    $('#LicProjectTaskAvilable').html('');
    $('#Taskpopup').html('');
    Popuphtml = ""
    if(LicProjectTask == "All") {
        $('#LicProjectTask').append('<h4 class="m-0"> Everyone </h4>');
        $('#LicProjectTaskconsumed').append('<h4 class="m-0"> - </h4>');
        $('#LicProjectTaskAvilable').append('<h4 class="m-0"> - </h4>');
        IsProjectTask = true;
        IsNotSubscribedProject = true
        Popuphtml = '<div class="col-xs-12 assign-licence-top-card-hight">' + '<div class="main-card-data1">' + '<span>Project & Task</span>' + '<div class="main-card-data2 color-green main-card-data2-title assign-user-card-count-align"> Everyone</div>' + '</div>' + '</div>';
        $('#Taskpopup').append(Popuphtml);
    } else if(LicProjectTask > 0) {
        $("#divProjectassign").show();
        IsNotSubscribedProject = true;
        LicProjectTaskAvilableCount = LicProjectTask - ProjectCount;
        $('#LicProjectTask').append('<h4 class="m-0">' + LicProjectTask + ' </h4>');
        $('#LicProjectTaskconsumed').append('<a href="javascript:void(0)" onclick="GetConsumedLic(\'Project\',\'' + ProjectCount + '\',\'' + LicProjectTaskAvilableCount + '\',\'true\')" ><h4 class="m-0" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static">' + ProjectCount + ' </h4></a>');
        $('#LicProjectTaskAvilable').append('<h4 class="m-0">' + LicProjectTaskAvilableCount + ' </h4>');
        Popuphtml = '<div class="col-xs-12 assign-licence-top-card-hight">' + '<div class="main-card-data1">' + '<span>Project & Task</span>' + '<div class="main-card-data2 color-green main-card-data2-title assign-user-card-count-align" >' + '<div class="mb5 d-flex justify-content-between color-red">' + '<span id="LicProjectSelected">Consumed:&nbsp;</span>' + '<span id="LicProjectConsumedCount">' + ProjectCount + '</span>' + '</div>' + '<div class="d-flex justify-content-between color-green">' + '<span>Available:&nbsp;</span>' + '<span id="LicProjectTaskAvilableCount">' + LicProjectTaskAvilableCount + '</span>' + '</div>' + '</div>' + '</div>' + '</div>';
        $('#Taskpopup').append(Popuphtml);
    } else {
        $('#LicProjectTask').append('<h4 class="m-0 color-red">Not Subscribed </h4>');
        $('#LicProjectTaskconsumed').append('<h4 class="m-0"> - </h4>');
        $('#LicProjectTaskAvilable').append('<h4 class="m-0"> - </h4>');
        $("#divProjectassign").hide();
        IsNotSubscribedProject = false;
        Popuphtml = '<div class="col-xs-12 assign-licence-top-card-hight">' + '<div class="main-card-data1">' + '<span>Project & Task</span>' + '<div class="main-card-data2 color-grey main-card-data2-title assign-user-card-count-align">Not subscribed</div>' + '</div>' + '</div>';
        $('#Taskpopup').append(Popuphtml);
    }
    if((LicProjectTask == "All" || LicProjectTask == "0") && (LicDMS == "All" || LicDMS == "0") && (LicIntranet == "All" || LicIntranet == "0")) {
        $("#assignlicensemodal").hide();
    } else {
        $("#assignlicensemodal").show();
    }
}
$('#btnGetlicense').on('click', function() {
    var ConsumedValidDate = "";
    if($("#LicenseDescription").val() != "") {
        var LicensedManageDecript = CryptoJS.AES.decrypt($("#LicenseDescription").val(), "@d@ptT!t@n");
        LicensedManageDecript = LicensedManageDecript.toString(CryptoJS.enc.Utf8).split('|');
        if(LicensedManageDecript.length > 7) {
            var ConsumedtodayDate = new Date();
            ConsumedValidDate = new Date(LicensedManageDecript[1]);
            ConsumedValidDate.setDate(ConsumedValidDate.getDate() + 1);
            var TotalLicense = LicensedManageDecript[2].split("=")[1];
            var NewInternet = LicensedManageDecript[4].split("=")[1];
            var NewDMS = LicensedManageDecript[5].split("=")[1];
            var NewProject = LicensedManageDecript[6].split("=")[1];
            var NewBPass = LicensedManageDecript[7].split("=")[1];
            var BalanceLicenseAvlIntranet = 0;
            var BalanceLicenseAvlDMS = 0;
            var BalanceLicenseAvlProject = 0;
            var BalanceLicenseAvlBPass = NewBPass;
            var validupto = new Date(LicensedManageDecript[1]);
            var NewLicense = "";
        } else {
            alert("Enter correct license key")
            return false;
        }
        if(window.location.host.toLowerCase() != LicensedManageDecript[0].toLowerCase()) {
            alert("License is not valid for this Domain");
            return false;
        }
        if((Date.parse(ConsumedtodayDate) < Date.parse(ConsumedValidDate))) {} else {
            alert("Your subscription has expired");
            return false;
        }
        //validupto.setDate(validupto.getDate() + 1);
        $("#Validuptomanage").text(validupto.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }));
        $("#Consumed-license-NewLicense-manage-TotalUser").html(TotalLicense);
        NewAvailable = TotalLicense - ConsumedLicense;
        if(NewAvailable > 0) {
            $("#Consumed-license-AlreadyLicensConsumed-manage-TotalUser").html(ConsumedLicense)
            // $("#Consumed-license-BalanceLicense-manage-TotalUser").html('<a href="javascript:void(0)" onclick="GetConsumedLic(\'ActiveUser\',\'' + TotalLicense + '\',\'' + NewAvailable + '\',\'false\')" ><h4 class="m-0cursor-pointer" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static" style="color: blue !important;">' + NewAvailable + ' </h4></a>')
        } else {
            $("#Consumed-license-AlreadyLicensConsumed-manage-TotalUser").html('<a href="javascript:void(0)" onclick="GetConsumedLic(\'ActiveUser\',\'' + TotalLicense + '\',\'' + NewAvailable + '\',\'false\')" ><h4 class="m-0cursor-pointer" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static" style="color: blue !important;">' + ConsumedLicense + ' </h4></a>')
        }
        $("#Consumed-license-BalanceLicense-manage-TotalUser").html(NewAvailable)
        $("#Consumed-license-AlreadyLicensConsumed-manage-Intranet").html('');
        $("#Consumed-license-AlreadyLicensConsumed-manage-DMS").html("");
        $("#Consumed-license-AlreadyLicensConsumed-manage-Project").html("");
        if(NewInternet == "All") {
            $("#Consumed-license-NewAlreadyLicens-manage-Intranet").html("Everyone")
            $("#Consumed-license-AlreadyLicensConsumed-manage-Intranet").html("-")
            $("#Consumed-license-BalanceLicense-manage-Intranet").html("-")
            BalanceLicenseAvlIntranet = 1;
            SetNewInternet = true;
        } else if(NewInternet == "0") {
            BalanceLicenseAvlIntranet = NewInternet - IntranetCount;
            $("#Consumed-license-NewAlreadyLicens-manage-Intranet").html("Not Subscribed")
            $("#Consumed-license-AlreadyLicensConsumed-manage-Intranet").append('<a href="javascript:void(0)" onclick="GetConsumedLic(\'Internet\',\'' + IntranetCount + '\',\'' + BalanceLicenseAvlIntranet + '\',\'false\')" ><h4 class="m-0cursor-pointer" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static" style="color: blue !important;">' + IntranetCount + ' </h4></a>'); //html(IntranetCount)
            $("#Consumed-license-BalanceLicense-manage-Intranet").html(BalanceLicenseAvlIntranet);
            SetNewInternet = false;
            if(parseInt(NewInternet) == BalanceLicenseAvlIntranet) {
                BalanceLicenseAvlIntranet = 1;
            }
            // BalanceLicenseAvlIntranet = 1;
        } else if(NewInternet > 0) {
            BalanceLicenseAvlIntranet = NewInternet - IntranetCount;
            $("#Consumed-license-NewAlreadyLicens-manage-Intranet").html(NewInternet)
            $("#Consumed-license-AlreadyLicensConsumed-manage-Intranet").html(IntranetCount);
            $("#Consumed-license-BalanceLicense-manage-Intranet").html(BalanceLicenseAvlIntranet)
            SetNewInternet = true;
        } else {
            $("#Consumed-license-AlreadyLicensConsumed-manage-Intranet").append('<a href="javascript:void(0)" onclick="GetConsumedLic(\'Internet\',\'' + IntranetCount + '\',\'' + BalanceLicenseAvlIntranet + '\',\'false\')" ><h4 class="m-0cursor-pointer" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static" style="color: blue !important;">' + IntranetCount + ' </h4></a>');
        }
        if(NewDMS == "All") {
            $("#Consumed-license-NewAlreadyLicens-manage-DMS").html("Everyone")
            $("#Consumed-license-AlreadyLicensConsumed-manage-DMS").html("-")
            $("#Consumed-license-BalanceLicense-manage-DMS").html("-")
            BalanceLicenseAvlDMS = 1;
            SetNewDMS = true;
        } else if(NewDMS == "0") {
            BalanceLicenseAvlDMS = NewDMS - DMSCount;
            $("#Consumed-license-NewAlreadyLicens-manage-DMS").html("Not Subscribed")
            $("#Consumed-license-AlreadyLicensConsumed-manage-DMS").append('<a href="javascript:void(0)" onclick="GetConsumedLic(\'DMS\',\'' + DMSCount + '\',\'' + BalanceLicenseAvlDMS + '\',\'false\')" ><h4 class="m-0cursor-pointer" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static" style="color: blue !important;">' + DMSCount + ' </h4></a>');
            $("#Consumed-license-BalanceLicense-manage-DMS").html(BalanceLicenseAvlDMS);
            SetNewDMS = false;
            if(parseInt(NewDMS) == BalanceLicenseAvlDMS) {
                BalanceLicenseAvlDMS = 1;
            }
            //  BalanceLicenseAvlDMS = 1;
        } else if(NewDMS > 0) {
            BalanceLicenseAvlDMS = NewDMS - DMSCount;
            $("#Consumed-license-NewAlreadyLicens-manage-DMS").html(NewDMS)
            $("#Consumed-license-AlreadyLicensConsumed-manage-DMS").html(DMSCount)
            $("#Consumed-license-BalanceLicense-manage-DMS").html(BalanceLicenseAvlDMS)
            SetNewDMS = true;
        } else {
            $("#Consumed-license-AlreadyLicensConsumed-manage-DMS").append('<a href="javascript:void(0)" onclick="GetConsumedLic(\'DMS\',\'' + DMSCount + '\',\'' + BalanceLicenseAvlDMS + '\',\'false\')" ><h4 class="m-0cursor-pointer" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static"style="color: blue !important;">' + DMSCount + ' </h4></a>');
        }
        if(NewProject == "All") {
            $("#Consumed-license-NewAlreadyLicens-manage-Project").html("Everyone")
            $("#Consumed-license-AlreadyLicensConsumed-manage-Project").html("-")
            $("#Consumed-license-BalanceLicense-manage-Project").html("-")
            SetNewProject = true;
            BalanceLicenseAvlProject = 1;
        } else if(NewProject == "0") {
            BalanceLicenseAvlProject = NewProject - ProjectCount;
            $("#Consumed-license-NewAlreadyLicens-manage-Project").html("Not Subscribed")
            $("#Consumed-license-AlreadyLicensConsumed-manage-Project").append('<a href="javascript:void(0)" onclick="GetConsumedLic(\'Project\',\'' + ProjectCount + '\',\'' + BalanceLicenseAvlProject + '\',\'false\')" ><h4 class="m-0" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static" style="color: blue !important;">' + ProjectCount + ' </h4></a>');
            $("#Consumed-license-BalanceLicense-manage-Project").html(BalanceLicenseAvlProject);
            SetNewProject = false;
            if(parseInt(NewProject) == BalanceLicenseAvlProject) {
                BalanceLicenseAvlProject = 1;
            }
        } else if(NewProject > 0) {
            BalanceLicenseAvlProject = NewProject - ProjectCount;
            $("#Consumed-license-NewAlreadyLicens-manage-Project").html(NewProject);
            $("#Consumed-license-AlreadyLicensConsumed-manage-Project").html(ProjectCount);
            $("#Consumed-license-BalanceLicense-manage-Project").html(BalanceLicenseAvlProject);
            SetNewProject = true;
        } else {
            $("#Consumed-license-AlreadyLicensConsumed-manage-Project").append('<a href="javascript:void(0)" onclick="GetConsumedLic(\'Project\',\'' + ProjectCount + '\',\'' + BalanceLicenseAvlProject + '\',\'false\')" ><h4 class="m-0" data-toggle="modal" data-target="#consumed-license-modal-Internet" data-backdrop="static" style="color: blue !important;">' + ProjectCount + ' </h4></a>');
        }
        if(NewBPass > 0) {
            BalanceLicenseAvlBPass = NewBPass - BPassCount;
            $("#Consumed-license-NewAlreadyLicens-manage-LicBPaas").html(NewBPass)
            $("#Consumed-license-AlreadyLicensConsumed-manage-LicBPaas").html(BPassCount);
            $("#Consumed-license-BalanceLicense-manage-LicBPaas").html(BalanceLicenseAvlBPass);
            SetNewBpass = true;
        } else {
            BalanceLicenseAvlBPass = NewBPass - BPassCount;
            $("#Consumed-license-NewAlreadyLicens-manage-LicBPaas").html("Not Subscribed");
            $("#Consumed-license-AlreadyLicensConsumed-manage-LicBPaas").html(BPassCount);
            $("#Consumed-license-BalanceLicense-manage-LicBPaas").html(BalanceLicenseAvlBPass);
            SetNewBpass = false;
        }
        $('#consumed-license-modal-manage').modal('show');
    } else {
        alert("Enter New License Key");
    }
    if(BalanceLicenseAvlIntranet >= 0 && BalanceLicenseAvlDMS >= 0 && BalanceLicenseAvlProject >= 0 && BalanceLicenseAvlBPass >= 0) {
        $("#btn-consumed-license-manage").show();
        $("#div-consumed-license-Warning").hide();
        $("#btn-consumed-license-manage").attr('onclick', "webdevLicenced.LicenseSubmit()");
    } else {
        $("#btn-consumed-license-manage").hide();
        $("#div-consumed-license-Warning").show();
        $("#btn-consumed-license-manage").prop('onclick', null);
    }
});
$('#btnAccept').on('click', function() {
    if(confirm("Are you want to accept end user Software License Agreement")) {
        Active = true;
    } else {
        Active = false;
        $('#view-agreement-modal').modal('show');
    }
});
$('#FilterEditEventType').on('change', function() {
    $("#FilterEditEventCateory").prop("disabled", true);
    $("#FilterEditEventDepartment").prop("disabled", true);
    $("#ddlFilterLoc").prop("disabled", true);
    $("#pplManager_TopSpan").prop("disabled", true);
    $("#pplEmployee_TopSpan").prop("disabled", true);
    $("#FilterEditEventGuestCoustomer").prop("disabled", true);
    if($('#FilterEditEventType').val() == "Employee") {
        $("#FilterEditEventCateory").prop("disabled", false);
        $("#FilterEditEventDepartment").prop("disabled", false);
        $("#ddlFilterLoc").prop("disabled", false);
        $("#FilterDesignation").prop("disabled", false);
        $("#pplManager_TopSpan").prop("disabled", false);
        $("#pplEmployee_TopSpan").prop("disabled", false);
        $("#lblManager").text("Manager:");
        $(".invisibleddl").show();
        $(".GuestCoustomer").hide();
    } else if($('#FilterEditEventType').val() == "Guest User") {
        $("#FilterEditEventGuestCoustomer").prop("disabled", false);
        $("#lblManager").text("Supervisor:");
        $(".invisibleddl").hide();
        $(".GuestCoustomer").show();
        filtermessage="Retrieve the Guest User list";
        
    }
});
var Asignvalue = "";
$('#asignSubmitBtn').on('click', function() {
    // Asignvalue = AssignIntranet + AssignDMS + AssignProject + "|";
    // alert(Asignvalue);
    var isDMS = false;
    var isTask = false;
    var isIntranet = false;
    isDMS = $("#chkDMSassign").is(':checked');
    isTask = $("#chkProjectassign").is(':checked');
    isIntranet = $("#chkInternetassign").is(':checked');
    IntranetCount = $('#LicIntranetConsumedCount').text();
    LicIntranetAvilableCount = $("#LicIntranetAvilableCount").text();
    LicIntranetAvilableCount = parseInt(LicIntranetAvilableCount) + parseInt(IntranetCount);
    IntranetCount = 0;
    DMSCount = $('#LicDMSConsumedCount').text();
    LicDMSAvilableCount = $("#LicDMSAvilableCount").text();
    LicDMSAvilableCount = parseInt(LicDMSAvilableCount) + parseInt(DMSCount);
    DMSCount = 0;
    ProjectCount = $('#LicProjectConsumedCount').text();
    LicProjectTaskAvilableCount = $("#LicProjectTaskAvilableCount").text();
    LicProjectTaskAvilableCount = parseInt(LicProjectTaskAvilableCount) + parseInt(ProjectCount)
    ProjectCount = 0;
    if($("#assignusertable input[class=assignu]:checked").length > 0) {
        $("#assignusertable input[class=assignu]:checked").each(function() {
            if(isIntranet) {
                LicIntranetAvilableCount = LicIntranetAvilableCount - 1;
                IntranetCount = parseInt(IntranetCount) + 1;
            }
            $("#LicIntranetAvilableCount").html(LicIntranetAvilableCount);
            $('#LicIntranetConsumedCount').html(IntranetCount);
            if(isTask) {
                LicProjectTaskAvilableCount = LicProjectTaskAvilableCount - 1;
                ProjectCount = parseInt(ProjectCount) + 1;
            }
            $("#LicProjectTaskAvilableCount").html(LicProjectTaskAvilableCount);
            $('#LicProjectConsumedCount').html(ProjectCount);
            if(isDMS) {
                LicDMSAvilableCount = LicDMSAvilableCount - 1;
                DMSCount = parseInt(DMSCount) + 1;
            }
            $('#LicDMSConsumedCount').html(DMSCount);
            $("#LicDMSAvilableCount").html(LicDMSAvilableCount);
            var row = $(this).closest("tr")[0];
            if($(row.cells[4].innerHTML)[0] != undefined) {
                var chkInternetId = $(row.cells[4].innerHTML)[0].children[0].id;
                $("#" + chkInternetId).prop('checked', isIntranet);
            }
            if($(row.cells[5].innerHTML)[0] != undefined) {
                var ChkDMSId = $(row.cells[5].innerHTML)[0].children[0].id;
                $("#" + ChkDMSId).prop('checked', isDMS);
            }
            if($(row.cells[6].innerHTML)[0] != undefined) {
                var ChkProjectId = $(row.cells[6].innerHTML)[0].children[0].id;
                $("#" + ChkProjectId).prop('checked', isTask);
            }
            $('.assignu').prop('checked', false);
            $('#assignusertable-select-all').prop('checked', false);
        });
        IsVisibleSubmitButton();
    } else {
        alert("Select at list one user checkbox ");
    }
    //  $("#assignusertable-select-all").click();
});
$('#btnAssignFilter, .filterBox').on('click', function() {
    if(IsValueSet == false) {
        CommonFunctionLic.SetValuesInFilter();
    }
    //$("#DivpplManager").html('');
    //$("#DivpplManager").append('<span id="pplManager"></span>');
    LoadGridhtmlfilter([]);
    $("#chkfilterIntranet").prop('checked', false);
    $("#chkfilterDMS").prop('checked', false);
    $("#chkfilterProject").prop('checked', false);
    filtermessage="Retrieve the Employee list";
    $("#assignusertablefilter-select-all").prop('checked', false);
    CommonFunctionLic.initializePeoplePicker("pplManager", true); //For Manager
    CommonFunctionLic.initializePeoplePicker("pplEmployee", true); //For Manager
    
  
});
$('#assignmodal').on('click', function() {
    // Test
    $("#chkInternetassign").prop('checked', false);
    $("#chkProjectassign").prop('checked', false);
    $("#chkDMSassign").prop('checked', false);
});

function allcheck(ConsumedLicenseType, ConsumedlicenseCount, AvailableCounts) {
    // Test
    var checked = $("#chk-Consumed-license-table-Internet").is(':checked');
    $('#Consumed-license-Count-Internet').html('');
    $("#Available-license-Count-Internet").html("");
    var data = Consumedlicensetable.rows().data();
    if(checked) {
        $('#Consumed-license-Count-Internet').html(data.length);
        //ConsumedlicenseCount = data.length;
        // AvailableCount = AvailableCounts - data.length;
        $("#Available-license-Count-Internet").html(AvailableCounts);
        $(".checkboxConsumed").prop('checked', checked);
    } else {
        $(".checkboxConsumed").prop('checked', checked);
        $('#Consumed-license-Count-Internet').html(0);
        AvailableCount = parseInt(ConsumedlicenseCount) + parseInt(AvailableCounts);
        $("#Available-license-Count-Internet").html(AvailableCount);
        ConsumedlicenseCount = 0;
    }
    if(AvailableCount >= 0) {
        $("#btn-consumed-license-Internet").show();
    } else {
        $("#btn-consumed-license-Internet").hide();
    }
}
$('#btnAssignSubmitusers').on('click', function() {
    $.ajax({
        cache: false,
        beforeSend: function() {
            $("#overlaysearch").fadeIn();
        },
        success: function(html) {
            SubmituserLic();
        },
    });
});
$('.checkboxInternet').on('change', function() {
    //assignusertable.rows().select();
});
var EmployeeUsers = [];
var Consumedlicensetable = "";
var AvailableCount;

function GetConsumedLic(type, ConsumedCount, AvailableLicenseCount, IsbuttonOnOff) {
    ConsumedLicenseType = type;
    $("#chk-Consumed-license-table-Internet").attr('onclick', "allcheck('" + type + "','" + ConsumedCount + "','" + AvailableLicenseCount + "')");
    $('#Consumed-license-tbody-Internet').html('');
    $("#Consumed-license-Title").html('');
    if(type == "Internet") {
        $("#Consumed-license-Title").html("Intranet");
    } else {
        $("#Consumed-license-Title").html(type);
    }
    $("#chk-Consumed-license-table-Internet").prop('checked', false);
    TableId = "Consumed-license-table-Internet";
    $("#Available-license-Count-Internet").html(AvailableLicenseCount);
    $('#Consumed-license-Count-Internet').html(ConsumedCount);
    if(IsbuttonOnOff == "true") {
        $("#btn-Consumed-license-add-Internet").show();
        $("#spnavailable").text("Available License");
    } else {
        $("#btn-Consumed-license-add-Internet").hide();
        $("#spnavailable").text("Balance License");
    }
    LoadConsumedhtml(AllEmployees)
}
var ConsumedlicenseCount = 0;

function LoadConsumedhtml(EmployeeUsers) {
    var tablehtml = "";
    ConsumedlicenseCount = 0;
    for(var i = 0; i < EmployeeUsers.length; i++) {
        var IsConsumed = false;
        if(ConsumedLicenseType == "ActiveUser") {
            IsConsumed = true;
        } else {
            if(EmployeeUsers[i].EmpLicense != null) {
                var EmpLicense = CryptoJS.AES.decrypt(EmployeeUsers[i].EmpLicense, "@d@ptT!t@n");
                var EmpLinceseEncript = EmpLicense.toString(CryptoJS.enc.Utf8);
                if(EmpLinceseEncript.search(ConsumedLicenseType) > 0) {
                    IsConsumed = true;
                    ConsumedlicenseCount++
                }
            }
        }
        if(EmployeeUsers[i].EMail != null) {
            if(IsConsumed) {
                var Asignvalue = EmpLinceseEncript;
                tablehtml += '<tr> <td></td>' + '<td>' + '<div class="assign-user-card">' + '<div class="assign-user-card-head">' + '<img src="' + EmployeeUsers[i].AttachmentFile + '" alt="user">' + '</div>' + '<div class="assign-user-card-body">' + '<div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">' + EmployeeUsers[i].FullName + '</h3> ' + '<p class="assign-user-email text-ellipsis" style="text-overflow: ellipsis; width: 250px;" >' + EmployeeUsers[i].EMail + '</p>' + '</div>' + '</div>' + '</div>' + '<div id="UserId' + i + '"> <p style="display:none" class="">' + EmployeeUsers[i].Type + '</p> <p style="display:none" class="">' + Asignvalue + '</p>  <p style="display:none" class="">' + EmployeeUsers[i].Id + '</p>  </div> </td>';
                if(EmployeeUsers[i].Type == "Employees") {
                    tablehtml += '<td>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Designation + '</h3>' + '</td>' + '<td>     <div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">Employees</h3>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Department.DepartmentName + '</h3>' + '</div> </td>';
                } else {
                    tablehtml += '<td>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Designation + '</h3>' + '</td>' + '<td>     <div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">Guest</h3>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Company + '</h3>' + '</div> </td>';
                }
                tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline "><input id="ConsumedChk' + i + '" class="checkboxConsumed" type="checkbox" value="" onclick="GetCheckCount(this)" checked="checked" ></label>' + '</td>';
            }
            tablehtml += '</tr>';
        }
    }
    AvailableCount = AvailableCount - ConsumedlicenseCount;
    $('#Consumed-license-tbody-Internet').html('');
    $('#Consumed-license-tbody-Internet').append(tablehtml);
    if(AvailableCount > 0) {
        $("#btn-consumed-license-Internet").show();
    } else {
        $("#btn-consumed-license-Internet").hide();
    }
    Consumedlicensetable = $('#' + TableId).DataTable({
        'order': [
            [1, 'asc']
        ],
        'columnDefs': [{
            'targets': [0, 4],
            'searchable': false,
            'orderable': false,
        }],
        'searching': false,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        language: {
            searchPlaceholder: "Search records"
        }
    });
}

function GetCheckCount(checkBox) {
    AvailableCount = $("#Available-license-Count-Internet").text();
    $(checkBox).attr('name', checkBox.checked);
    //$('.dataTables_filter input[type="search"]').val('');
    //Consumedlicensetable.draw();
    ConsumedlicenseCount = $('#Consumed-license-Count-Internet').text();
    if(checkBox.checked == true) {
        AvailableCount = AvailableCount - 1;
        ConsumedlicenseCount = parseInt(ConsumedlicenseCount) + 1;
        // alert(LicProjectTaskAvilableCount);
    } else {
        $("#chk-Consumed-license-table-Internet").prop('checked', false);
        AvailableCount = parseInt(AvailableCount) + 1;
        ConsumedlicenseCount = parseInt(ConsumedlicenseCount) - 1;
        //alert(LicProjectTaskAvilableCount);
    }
    $("#Available-license-Count-Internet").html("");
    $("#Available-license-Count-Internet").html(AvailableCount);
    $('#Consumed-license-Count-Internet').html('');
    $('#Consumed-license-Count-Internet').html(ConsumedlicenseCount);
    if(AvailableCount >= 0) {
        $("#btn-consumed-license-Internet").show();
    } else {
        $("#btn-consumed-license-Internet").hide();
    }
}
$('#btn-Consumed-license-add-Internet').on('click', function() {
    $("#divemployeesection").html('');
    UserEmail = [];
    $("#pplEmployeeProject").removeClass("activingss")
    CommonFunctionLic.initializePeoplePicker("pplEmployeeProject", true);
    onChangeAddUser('pplEmployeeProject_TopSpan', 'pplEmployeeProject', "divemployeesection");
});

function clearTextBox() {
    $("#LicenseDescription").val("")
}
var Consumedlicensefilter = false;
$('#btn-Consumed-license-filter').on('click', function() {
    Consumedlicensefilter = true;
});
$('#btnapplyadduser').on('click', function() {
    AvailableCount = $("#Available-license-Count-Internet").text();
    ConsumedlicenseCount = $('#Consumed-license-Count-Internet').text();
    if(AvailableCount > 0) {
        var data = Consumedlicensetable.rows().data();
        data.each(function(value, index) {
            var ChkId = $($(value)[4])[0].childNodes[0].id;
            var Email = $($(value)[1])[0].childNodes[1].children[0].childNodes[2].innerHTML;
            var IsUser = UserEmail.filter(function(obj) {
                return obj.UserEmail.toLowerCase() == Email.toLowerCase();
            });
            if(IsUser.length > 0) {
                UserEmail = UserEmail.filter(function(obj) {
                    return obj.UserEmail.toLowerCase() !== Email.toLowerCase();
                });
                if(AvailableCount > 0) {
                    var checked = $("#" + ChkId).is(':checked');
                    if(checked == false) {
                        $("#" + ChkId).prop('checked', true);
                        AvailableCount = AvailableCount - 1;
                        ConsumedlicenseCount = parseInt(ConsumedlicenseCount) + 1;
                    }
                } else {
                    alert("License is not available.");
                }
            }
        });
        //AllEmployeeUser
        var IsConsumed = false;
        var tablehtml = "";
        for(var i = 0; i < UserEmail.length; i++) {
            var EmployeeUsers = AllEmployees.filter(function(obj) {
                if(obj.EMail != null) {
                    return obj.EMail.toLowerCase() == UserEmail[i].UserEmail.toLowerCase();
                }
            });
            if(EmployeeUsers.length > 0) {
                if(EmployeeUsers[0].EmpLicense != null) {
                    var EmpLicense = CryptoJS.AES.decrypt(EmployeeUsers[0].EmpLicense, "@d@ptT!t@n");
                    var EmpLinceseEncript = EmpLicense.toString(CryptoJS.enc.Utf8);
                    if(EmpLinceseEncript.search(ConsumedLicenseType) > 0) {
                        IsConsumed = true;
                    }
                }
                if(EmployeeUsers[0].EMail != null) {
                    var Asignvalue = EmpLinceseEncript;
                    tablehtml = '<tr> <td></td>' + '<td>' + '<div class="assign-user-card">' + '<div class="assign-user-card-head">' + '<img src="' + EmployeeUsers[0].AttachmentFile + '" alt="user">' + '</div>' + '<div class="assign-user-card-body">' + '<div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">' + EmployeeUsers[0].FullName + '</h3> ' + '<p class="assign-user-email text-ellipsis" style="text-overflow: ellipsis; width: 250px;" >' + EmployeeUsers[0].EMail + '</p>' + '</div>' + '</div>' + '</div>' + '<div id="UserId' + i + '"> <p style="display:none" class="">' + EmployeeUsers[0].Type + '</p> <p style="display:none" class="">' + Asignvalue + '</p>  <p style="display:none" class="">' + EmployeeUsers[0].Id + '</p>  </div> </td>';
                    if(EmployeeUsers[0].Type == "Employees") {
                        tablehtml += '<td>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[0].Designation + '</h3>' + '</td>' + '<td>     <div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">Employees</h3>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[0].Department.DepartmentName + '</h3>' + '</div> </td>';
                    } else {
                        tablehtml += '<td>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[0].Designation + '</h3>' + '</td>' + '<td>     <div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">Guest</h3>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[0].Company + '</h3>' + '</div> </td>';
                    }
                    tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline "><input id="ConsumedChk' + i + '" class="checkboxConsumed" checked="checked" type="checkbox" value="" onclick="GetCheckCount(this)" ></label>' + '</td>';
                    tablehtml += '</tr>';
                }
                if(AvailableCount > 0) {
                    const tr = $(tablehtml);
                    Consumedlicensetable.row.add(tr[0]).draw();
                    AvailableCount = AvailableCount - 1;
                    ConsumedlicenseCount = parseInt(ConsumedlicenseCount) + 1;
                    $("#btn-consumed-license-Internet").show();
                } else {
                    alert("License is not available.");
                }
            }
        }
    } else {
        alert("License is not available.");
        $("#btn-consumed-license-Internet").hide();
    }
    $('#add_user_teams_Project').modal('hide');
    $("#Available-license-Count-Internet").html(AvailableCount);
    $('#Consumed-license-Count-Internet').html(ConsumedlicenseCount);
});
$('#btn-consumed-license-Internet').on('click', function() {
    $.ajax({
        cache: false,
        beforeSend: function() {
            $("#overlaysearch").fadeIn();
        },
        success: function(html) {
            consumedlicense();
        },
    });
});

function consumedlicense() {
    var icount = 0;
    $("#Consumed-license-table-Internet input[class=checkboxConsumed]").each(function(value, index) {
        icount++
        console.log(index + "   " + icount);
    });
    var data = Consumedlicensetable.rows().data();
    var UsersActiveInactive = "";
    data.each(function(value, index) {
        var message = "";
        var userId = $($(value)[1])[1].childNodes[5].innerHTML;
        var LiceneddencryptType = $($(value)[1])[1].childNodes[3].innerHTML;
        var UserType = $($(value)[1])[1].childNodes[1].innerHTML;
        var ChkId = $($(value)[4])[0].childNodes[0].id;
        //$($(value)[2])[0].childNodes[0].id;
        var checked = $("#" + ChkId).is(':checked');
        var ListName = ""
        if(UserType == "Employees") {
            ListName = "Employees";
        } else {
            ListName = "ExternalUsers";
        }
        var Metadata;
        var ItemType = CommonFunctionLic.GetItemTypeForListName(ListName);
        if(ConsumedLicenseType == "ActiveUser") {
            if(checked) {
                UsersActiveInactive = "Active";
            } else {
                UsersActiveInactive = "InActive";
            }
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                Status: UsersActiveInactive
            };
        } else {
            if(checked) {
                if(LiceneddencryptType.search(ConsumedLicenseType) > 0) {} else {
                    LiceneddencryptType += ConsumedLicenseType + "|";
                }
            } else {
                LiceneddencryptType = LiceneddencryptType.replaceAll(ConsumedLicenseType, "");
            }
            userLicsensecreate = LiceneddencryptType;
            message += CryptoJS.AES.encrypt(LiceneddencryptType, '@d@ptT!t@n');
            var encryptLic = message;
            message = "";
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                EmpLicense: encryptLic
            };
        }
        console.log(LiceneddencryptType + "   UserType " + UserType + "    message" + encryptLic + "   Id:   " + userId + "Status  " + UsersActiveInactive)
        $.when(CommonFunctionLic.updateItemWithID(userId, ListName, Metadata)).done(function(valuesArray) {});
    });
    Getallinfomation();
    $("#overlaysearch").fadeOut();
    $('#consumed-license-modal-Internet').modal('hide');
    Consumedlicensetable.destroy();
}

function SubmituserLic() {
    try {
        var message = "";
        $("#overlaysearch").fadeIn();
        // if($("#assignusertable input[class=assignu]:checked").length > 0) {
        $("#assignusertable input[class=assignu]").each(function() {
            var userLicsensecreate = "";
            var row = $(this).closest("tr")[0];
            //$("#DMSChk0").is(':checked')
            var userId = $(row.cells[1].innerHTML)[1].childNodes[1].innerHTML;
            var UserType = $(row.cells[3].innerHTML)[0].children[0].innerText;
            if(IsNotSubscribedIntrenet) {
                var chkInternetId = $(row.cells[4].innerHTML)[0].children[0].id;
                var checked = $("#" + chkInternetId).is(':checked');
                if(checked) {
                    AssignIntranet = "|Internet";
                } else {
                    AssignIntranet = "";
                }
            }
            if(IsNotSubscribedDMS) {
                var ChkDMSId = $(row.cells[5].innerHTML)[0].children[0].id;
                var checked = $("#" + ChkDMSId).is(':checked');
                if(checked) {
                    AssignDMS = "|DMS";
                } else {
                    AssignDMS = "";
                }
            }
            if(IsNotSubscribedProject) {
                var ChkProjectId = $(row.cells[6].innerHTML)[0].children[0].id;
                var checked = $("#" + ChkProjectId).is(':checked');
                if(checked) {
                    AssignProject = "|Project";
                } else {
                    AssignProject = ""
                }
            }
            Asignvalue = AssignIntranet + AssignDMS + AssignProject + "|";
            // alert(row.cells[1].innerText.split('\n')[2] + "   " + $("#" + DDMS).is(':checked'))
            // console.log( $(row.cells[1].innerHTML)[0].childNodes[1].children[0].childNodes[1].innerText);
            userLicsensecreate = $(row.cells[1].innerHTML)[0].childNodes[1].children[0].childNodes[2].innerHTML + Asignvalue;
            // message += row.cells[1].innerText.split('\n')[2] + Asignvalue;
            //  message += '\n';
            console.log(userLicsensecreate);
            message += CryptoJS.AES.encrypt(userLicsensecreate, '@d@ptT!t@n');
            var encryptLic = message;
            message = "";
            // message += '\n';
            // encryptLic=CryptoJS.AES.encrypt(userLicsensecreate, '@d@ptT!t@n');
            var ListName = ""
            if(UserType == "Employees") {
                ListName = "Employees";
            } else {
                ListName = "ExternalUsers";
            }
            var Metadata;
            var ItemType = CommonFunctionLic.GetItemTypeForListName(ListName);
            Metadata = {
                __metadata: {
                    'type': ItemType
                },
                EmpLicense: encryptLic
            };
            $.when(CommonFunctionLic.updateItemWithID(userId, ListName, Metadata)).done(function(valuesArray) {});
        });
        // } else {
        //  alert("Select at list one user")
        // }
        //console.log(userLicsensecreate)
        assignusertable.destroy();
        Getallinfomation();
        $("#overlaysearch").fadeOut();
        $('#assign-license-modal').modal('hide');
        $('#assignusertable-select-all').prop('checked', false);
    } catch (err) {
        alert(err);
        $("#overlaysearch").fadeOut();
    }
}
/*
$('#assignusertable tbody').on('click', '.checkboxInternet,.checkboxDMS,.checkboxproject', function() {
        // $(this).toggleClass('selected');
        var row = $(this).closest("tr")[0];
        var check = $(row.cells[0].innerHTML)[0].id;
        $('#' + check).prop('checked', true);
});
*/
$('#assignusertable-select-all').on('click', function() {
    // Get all rows with search applied
    var rows = assignusertable.rows({
        'search': 'applied'
    }).nodes();
    // Check/uncheck checkboxes for all rows in the table
    $('.assignu', rows).prop('checked', this.checked);
});
$('#assignusertablefilter-select-all').on('click', function() {
    // Get all rows with search applied
    var rows = assignusertablefilter.rows({
        'search': 'applied'
    }).nodes();
    // Check/uncheck checkboxes for all rows in the table
    $('.assignu', rows).prop('checked', this.checked);
});
$('#assignusertable tbody').on('change', '.assignu', function() {
    // If checkbox is not checked
    if(!this.checked) {
        var el = $('#assignusertable-select-all').get(0);
        // If "Select all" control is checked and has 'indeterminate' property
        if(el && el.checked && ('indeterminate' in el)) {
            // Set visual state of "Select all" control
            // as 'indeterminate'
            el.indeterminate = true;
        }
    }
});
/*
$('#chkInternetassign').on('change', function() {
        var checked = this.checked;
        if(checked) {
               // AssignIntranet = "|Internet";
                $('.checkboxInternet').prop('checked',true);
        } else {
                //AssignIntranet = "";
                $('.checkboxInternet').removeAttr('checked');
        }
});
$('#chkDMSassign').on('change', function() {
        var checked = this.checked
        if(checked) {
               // AssignDMS = "|DMS";
                $('.checkboxDMS').prop('checked',true);
        } else {
               // AssignDMS = "";
                $('.checkboxDMS').removeAttr('checked');
        }
});
$('#chkProjectassign').on('change', function() {
        var checked = this.checked
        if(checked) {
               // AssignProject = "|Project";
                $('.checkboxproject').prop('checked',true);
        } else {
                //AssignProject = ""
                $('.checkboxproject').removeAttr('checked');
        }
});

*/
$('#assignlicensemodal').on('click', function() {
    if((LicIntranetAvilableCount >= 0 || isNaN(LicIntranetAvilableCount)) && (LicDMSAvilableCount >= 0 || isNaN(LicDMSAvilableCount)) && (LicProjectTaskAvilableCount >= 0 || isNaN(LicProjectTaskAvilableCount))) {
        $("#btnAssignSubmitusers").show();
    } else {
        $("#btnAssignSubmitusers").hide();
    }
    Consumedlicensefilter = false;
    LoadGridhtml(AllEmployees);
});

function LoadGridhtml(EmployeeUsers) {
    assignusertable = ""
    var tablehtml = "";
    IntranetCount = 0;
    DMSCount = 0;
    ProjectCount = 0;
    for(var i = 0; i < EmployeeUsers.length; i++) {
        IsIntranet = false;
        IsDMS = false;
        IsProjectTask = false;
        if(EmployeeUsers[i].EmpLicense != null) {
            var EmpLicense = CryptoJS.AES.decrypt(EmployeeUsers[i].EmpLicense, "@d@ptT!t@n");
            var EmpLinceseEncript = EmpLicense.toString(CryptoJS.enc.Utf8);
            if(EmpLinceseEncript.search(/Internet/i) > 0) {
                IsIntranet = true;
                IntranetCount++
                $("#LicIntranetSelecte").text("Consumed:");
                $('#LicIntranetConsumedCount').html(IntranetCount);
            } else {
                IsIntranet = false;
            }
            if(EmpLinceseEncript.search(/DMS/i) > 0) {
                IsDMS = true;
                DMSCount++
                $("#LicdmsSelected").text("Consumed:");
                $("#LicDMSConsumedCount").html(DMSCount);
            } else {
                IsDMS = false;
            }
            if(EmpLinceseEncript.search(/Project/i) > 0) {
                IsProjectTask = true;
                ProjectCount++
                $("#LicProjectSelected").text("Consumed:");
                $("#LicProjectConsumedCount").html(ProjectCount);
            } else {
                IsProjectTask = false;
            }
        }
        var AttachmentURL = "";
        if(TypeofLincnse == "Enterprise") {
            $("#assignlicensemodal").hide();
        } else {
            $("#assignlicensemodal").show();
            //  if(EmployeeUsers[i].AttachmentFiles.results.length > 0) {
            //       AttachmentURL = EmployeeUsers[i].AttachmentFiles.results[0].ServerRelativeUrl;
            // } else {
            //   AttachmentURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + EmployeeUsers[i].LogonName.UserName;
            //   }
            if(EmployeeUsers[i].EMail != null) {
                tablehtml += '<tr> <td><label class="checkbox-inline assign-usercheckbox-inline"><input type="checkbox" class="assignu" id="checkselect' + i + '" value=""></label></td>' + '<td>' + '<div class="assign-user-card">' + '<div class="assign-user-card-head">' + '<img src="' + EmployeeUsers[i].AttachmentFile + '" alt="user">' + '</div>' + '<div class="assign-user-card-body">' + '<div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">' + EmployeeUsers[i].FullName + '</h3> ' + '<p class="assign-user-email text-ellipsis" style="text-overflow: ellipsis; width: 250px;" >' + EmployeeUsers[i].EMail + '</p>' + '</div>' + '</div>' + '</div>' + '<div id="UserId' + i + '"> <p style="display:none" class="">' + EmployeeUsers[i].Id + '</p> </div> </td>';
                if(EmployeeUsers[i].Type == "Employees") {
                    tablehtml += '<td>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Designation + '</h3>' + '</td>' + '<td>     <div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">Employees</h3>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Department.DepartmentName + '</h3>' + '</div> </td>';
                } else {
                    tablehtml += '<td>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Designation + '</h3>' + '</td>' + '<td>     <div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">Guest</h3>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Company + '</h3>' + '</div> </td>';
                }
                if(LicIntranet == "All") {
                    $("#chkInternetassign").attr("disabled", true);
                    $("#chkheaderIntranet").attr("disabled", true);
                    $('#chkInternetassign').prop('checked', true);
                    tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline "><input id="InternetChk' + i + '" type="checkbox" value="" checked disabled></label>' + '</td>';
                } else if(LicIntranet > 0) {
                    $("chkInternetassign").removeAttr("disabled");
                    $("#chkheaderIntranet").removeAttr("disabled");
                    if(IsIntranet) {
                        tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline "><input id="InternetChk' + i + '" class="checkboxInternet" type="checkbox" value="" onclick="GetCheckCountInternet(this)" checked ></label>' + '</td>';
                    } else {
                        tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline "><input id="InternetChk' + i + '" class="checkboxInternet" type="checkbox" value="" onclick="GetCheckCountInternet(this)"  ></label>' + '</td>';
                    }
                } else {
                    $("#chkheaderIntranet").hide();
                    tablehtml += '<td class="td-desibled text-center">-</td>';
                }
                if(LicDMS == "All") {
                    $("#chkDMSassign").attr("disabled", true);
                    $("#chkheaderDMS").attr("disabled", true);
                    $('#chkDMSassign').prop('checked', true);
                    tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline "><input id="DMSChk' + i + '" type="checkbox" value="" checked disabled></label>' + '</td>';
                } else if(LicDMS > 0) {
                    $("#chkDMSassign").removeAttr("disabled");
                    $("#chkheaderDMS").removeAttr("disabled");
                    if(IsDMS) {
                        tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline "><input id="DMSChk' + i + '" class="checkboxDMS" type="checkbox" value="" onclick="GetCheckCountDMS(this)" checked  ></label>' + '</td>';
                    } else {
                        tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline "><input id="DMSChk' + i + '" class="checkboxDMS" type="checkbox" value=""  onclick="GetCheckCountDMS(this)" ></label>' + '</td>';
                    }
                } else {
                    $("#chkheaderDMS").hide();
                    tablehtml += '<td class="td-desibled text-center">-</td>';
                }
                if(LicProjectTask == "All") {
                    $("#chkProjectassign").attr("disabled", true);
                    $("#chkheaderProject").attr("disabled", true);
                    $('#chkProjectassign').prop('checked', true);
                    tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline "><input id="projectChk' + i + '" type="checkbox" value="" checked disabled></label>' + '</td>';
                } else if(LicProjectTask > 0) {
                    $("#chkProjectassign").removeAttr("disabled");
                    $("#chkheaderProject").removeAttr("disabled");
                    if(IsProjectTask) {
                        tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline" ><input class="checkboxproject" id="projectChk' + i + '" type="checkbox" value="" onclick="GetCheckCountProject(this)" checked  ></label>' + '</td>';
                    } else {
                        tablehtml += '<td class="text-center">' + '<label class="checkbox-inline assign-usercheckbox-inline" checkboxproject><input class="checkboxproject" id="projectChk' + i + '" type="checkbox" onclick="GetCheckCountProject(this)" value=""  ></label>' + '</td>';
                    }
                } else {
                    $("#chkheaderProject").hide();
                    tablehtml += '<td class="td-desibled text-center">-</td>';
                }
                tablehtml += '</tr>';
            }
        }
    }
    /*
     LicIntranetAvilableCount=LicIntranet-IntranetCount;
    $('#LicIntranetConsumedCount').html(IntranetCount);
    $("#LicIntranetAvilableCount").html(LicIntranetAvilableCount);
    
    
     LicDMSAvilableCount=LicDMS-DMSCount;
    $('#LicDMSConsumedCount').html(DMSCount);
    $("#LicDMSAvilableCount").html(LicDMSAvilableCount);
    
     LicProjectTaskAvilableCount=LicProjectTask-ProjectCount;
    $('#LicProjectConsumedCount').html(ProjectCount);
    $("#LicProjectTaskAvilableCount").html(LicProjectTaskAvilableCount);


    */
    $('#employeeusers').html('');
    $('#employeeusers').append(tablehtml);
    assignusertable = $('#assignusertable').DataTable({
        'columnDefs': [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'render': function(data, type, full, meta) {
                return '<input type="checkbox" class="assignu" name="id[]" value="' + $('<div/>').text(data).html() + '">';
            },
        }],
        'order': [
            [1, 'asc']
        ],
        'searching': false,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        language: {
            searchPlaceholder: "Search records"
        },
        'columnDefs': [{
            'targets': [0, 4, 5, 6],
            'searchable': false,
            'orderable': false,
        }],
    });
}

function LoadGridhtmlfilter(EmployeeUsers) {
    assignusertablefilter = ""
    var tablehtml = "";
    IntranetCount = 0;
    DMSCount = 0;
    ProjectCount = 0;
    for(var i = 0; i < EmployeeUsers.length; i++) {
        var AttachmentURL = "";
        if(TypeofLincnse == "Enterprise") {
            $("#assignlicensemodal").hide();
        } else {
            $("#assignlicensemodal").show();
            //  if(EmployeeUsers[i].AttachmentFiles.results.length > 0) {
            //       AttachmentURL = EmployeeUsers[i].AttachmentFiles.results[0].ServerRelativeUrl;
            // } else {
            //   AttachmentURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + EmployeeUsers[i].LogonName.UserName;
            //   }
            if(EmployeeUsers[i].EMail != null) {
                tablehtml += '<tr> <td><label class="checkbox-inline assign-usercheckbox-inline"><input type="checkbox" class="assignu" id="checkselect' + i + '" value=""></label></td>' + '<td>' + '<div class="assign-user-card">' + '<div class="assign-user-card-head">' + '<img src="' + EmployeeUsers[i].AttachmentFile + '" alt="user">' + '</div>' + '<div class="assign-user-card-body">' + '<div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">' + EmployeeUsers[i].FullName + '</h3> ' + '<p class="assign-user-email text-ellipsis" style="text-overflow: ellipsis; width: 250px;" >' + EmployeeUsers[i].EMail + '</p>' + '</div>' + '</div>' + '</div>' + '<div id="UserId' + i + '"> <p style="display:none" class="">' + EmployeeUsers[i].Id + '</p> </div> </td>';
                if(EmployeeUsers[i].Type == "Employees") {
                    tablehtml += '<td>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Designation + '</h3>' + '</td>' + '<td>     <div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">Employees</h3>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Department.DepartmentName + '</h3>' + '</div> </td>';
                } else {
                    tablehtml += '<td>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Designation + '</h3>' + '</td>' + '<td>     <div class="assign-user-card-body-info text-ellipsis">' + '<h3 class="assign-user-name text-ellipsis">Guest</h3>' + '<h3 class="assign-user-name text-ellipsis" style="text-overflow: ellipsis; width: 150px;" >' + EmployeeUsers[i].Company + '</h3>' + '</div> </td>';
                }
                tablehtml += '</tr>';
            }
        }
    }
    $('#employeeusersfilter').html('');
    $('#employeeusersfilter').append(tablehtml);
    assignusertablefilter = $('#assignusertablefilter').DataTable({
        'columnDefs': [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'render': function(data, type, full, meta) {
                return '<input type="checkbox" class="assignu" name="id[]" value="' + $('<div/>').text(data).html() + '">';
            },
        }],
        'order': [
            [1, 'asc']
        ],
        'searching': true,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        "bDestroy": false,
        language: {
            searchPlaceholder: "Search records"
        },
        'columnDefs': [{
            'targets': [0],
            'searchable': false,
            'orderable': false,
        }],
    });
}
$('#chkheaderDMS').on('click', function() {
    // Test
    var checked = $("#chkheaderDMS").is(':checked');
    $("#LicDMSAvilableCount").html("");
    $('#LicDMSConsumedCount').html("");
    AvailableCount = LicDMS;
    var data = assignusertable.rows().data();
    if(checked) {
        $(".checkboxDMS").prop('checked', checked);
        $('#LicDMSConsumedCount').html(data.length);
        ConsumedlicenseCount = data.length;
        AvailableCount = AvailableCount - data.length;
        $("#LicDMSAvilableCount").html(AvailableCount);
    } else {
        $(".checkboxDMS").prop('checked', checked);
        $('#LicDMSConsumedCount').html(0);
        $("#LicDMSAvilableCount").html(AvailableCount);
        ConsumedlicenseCount = 0;
    }
    DMSCount = ConsumedlicenseCount;
    LicDMSAvilableCount = AvailableCount;
    IsVisibleSubmitButton();
});

function GetCheckCountDMS(CheckBox) {
    DMSCount = $('#LicDMSConsumedCount').text();
    LicDMSAvilableCount = $("#LicDMSAvilableCount").text();
    if(CheckBox.checked == true) {
        LicDMSAvilableCount = LicDMSAvilableCount - 1;
        DMSCount = parseInt(DMSCount) + 1;
        $("#LicdmsSelected").text("Selected:");
    } else {
        LicDMSAvilableCount = parseInt(LicDMSAvilableCount) + 1;
        DMSCount = DMSCount - 1;
    }
    $("#chkheaderDMS").prop('checked', false);
    $('#LicDMSConsumedCount').html(DMSCount);
    $("#LicDMSAvilableCount").html(LicDMSAvilableCount);
    IsVisibleSubmitButton();
}
$('#chkheaderIntranet').on('click', function() {
    // Test
    var checked = $("#chkheaderIntranet").is(':checked');
    $("#LicIntranetAvilableCount").html("");
    $('#LicIntranetConsumedCount').html("");
    AvailableCount = LicIntranet;
    var data = assignusertable.rows().data();
    if(checked) {
        $(".checkboxInternet").prop('checked', checked);
        $('#LicIntranetConsumedCount').html(data.length);
        ConsumedlicenseCount = data.length;
        AvailableCount = AvailableCount - data.length;
        $("#LicIntranetAvilableCount").html(AvailableCount);
    } else {
        $(".checkboxInternet").prop('checked', checked);
        $('#LicIntranetConsumedCount').html(0);
        $("#LicIntranetAvilableCount").html(AvailableCount);
        ConsumedlicenseCount = 0;
    }
    IntranetCount = ConsumedlicenseCount;
    LicIntranetAvilableCount = AvailableCount;
    IsVisibleSubmitButton();
});

function GetCheckCountInternet(CheckBox) {
    IntranetCount = $('#LicIntranetConsumedCount').text();
    LicIntranetAvilableCount = $("#LicIntranetAvilableCount").text();
    if(CheckBox.checked == true) {
        LicIntranetAvilableCount = LicIntranetAvilableCount - 1;
        IntranetCount = parseInt(IntranetCount) + 1;
        $("#LicIntranetSelecte").text("Selected:");
    } else {
        //chkheaderIntranet
        $("#chkheaderIntranet").prop('checked', false);
        LicIntranetAvilableCount = parseInt(LicIntranetAvilableCount) + 1;
        IntranetCount = parseInt(IntranetCount) - 1;
    }
    $("#LicIntranetAvilableCount").html(LicIntranetAvilableCount);
    $('#LicIntranetConsumedCount').html(IntranetCount);
    IsVisibleSubmitButton();
}

function GetCheckCountProject(CheckBox) {
    ProjectCount = $('#LicProjectConsumedCount').text();
    LicProjectTaskAvilableCount = $("#LicProjectTaskAvilableCount").text();
    if(CheckBox.checked == true) {
        LicProjectTaskAvilableCount = LicProjectTaskAvilableCount - 1;
        ProjectCount = parseInt(ProjectCount) + 1;
        $("#LicProjectSelected").text("Selected:");
    } else {
        $("#chkheaderProject").prop('checked', false);
        LicProjectTaskAvilableCount = parseInt(LicProjectTaskAvilableCount) + 1;
        ProjectCount = ProjectCount - 1;
    }
    $("#LicProjectTaskAvilableCount").html("");
    $("#LicProjectTaskAvilableCount").html(LicProjectTaskAvilableCount);
    $('#LicProjectConsumedCount').html(ProjectCount);
    IsVisibleSubmitButton();
}
$('#chkheaderProject').on('click', function() {
    // Test
    var checked = $("#chkheaderProject").is(':checked');
    $("#LicProjectTaskAvilableCount").html("");
    $('#LicProjectConsumedCount').html("");
    AvailableCount = LicProjectTask;
    var data = assignusertable.rows().data();
    if(checked) {
        $(".checkboxproject").prop('checked', checked);
        $('#LicProjectConsumedCount').html(data.length);
        ConsumedlicenseCount = data.length;
        AvailableCount = AvailableCount - data.length;
        $("#LicProjectTaskAvilableCount").html(AvailableCount);
    } else {
        $(".checkboxproject").prop('checked', checked);
        $('#LicProjectConsumedCount').html(0);
        $("#LicProjectTaskAvilableCount").html(AvailableCount);
        ConsumedlicenseCount = 0;
    }
    ProjectCount = ConsumedlicenseCount;
    LicProjectTaskAvilableCount = AvailableCount;
    IsVisibleSubmitButton();
});

function IsVisibleSubmitButton() {
    if((LicIntranetAvilableCount >= 0 || isNaN(LicIntranetAvilableCount)) && (LicDMSAvilableCount >= 0 || isNaN(LicDMSAvilableCount)) && (LicProjectTaskAvilableCount >= 0 || isNaN(LicProjectTaskAvilableCount))) {
        $("#btnAssignSubmitusers").show();
    } else {
        $("#btnAssignSubmitusers").hide();
    }
}
$('#asignCloseBtn, #asignCancelBtn, #asignSubmitBtn, #assign-modal').on('click', function() {
    //assignusertable.destroy();
    setTimeout(function() {
        $('body').addClass('modal-open');
    }, 600);
});
$('#btnAssignclose, #btnAssignCancel').on('click', function() {
    assignusertable.destroy();
});
$('.close-consumed-license-modal').on('click', function() {
    Consumedlicensetable.destroy();
});
$('#assignFilterApplyBtn').on('click', function() {
    assignusertablefilter.destroy();
    filtermessage="Select at list one user checkbox ";
    CommonFunctionLic.filterEmployee();
});




$('#assignFilterApplyBtnSubmit').on('click', function() {

    if($("#assignusertablefilter input[class=assignu]:checked").length > 0) {
        $.ajax({
            cache: false,
            beforeSend: function() {
                $("#overlaysearch").fadeIn();
            },
            success: function(data) {
                $("#assignusertablefilter input[class=assignu]:checked").each(function() {
                    var row = $(this).closest("tr")[0];
                    //$("#DMSChk0").is(':checked')
                    var userId = $(row.cells[1].innerHTML)[1].childNodes[1].innerHTML;
                    var UserType = $(row.cells[3].innerHTML)[0].children[0].innerText;
                    var userEmail = $(row.cells[1].innerHTML)[0].childNodes[1].children[0].childNodes[2].innerHTML;
                    selectedfilter(userEmail)
                });
                $("#overlaysearch").fadeOut();
            }
        });
        assignusertablefilter.destroy();
        IsVisibleSubmitButton();
        $('#assign-filter').modal('hide');
    }else
    {
    alert(filtermessage);
    //assignusertablefilter.destroy();
    
    }
});




// assign filter modal
$('#assignFilterClearBtn, #assign-filter').on('click', function() {
    setTimeout(function() {
        $('body').addClass('modal-open');
    }, 600);
});
$('#assignFilterCloseBtn').on('click', function() {
    if(assignusertablefilter != "") {
        assignusertablefilter.destroy();
    }
});
$('#assignFilterClearBtn').on('click', function() {
    assignusertablefilter.destroy();
    Consumedlicensefilter = false;
    //LoadGridhtml(AllEmployees)
});



function selectedfilter(userEmail) {
    $("#assignusertable input[class=assignu]").each(function() {
        var userLicsensecreate = "";
        var row = $(this).closest("tr")[0];
        //$("#DMSChk0").is(':checked')
        var userId = $(row.cells[1].innerHTML)[1].childNodes[1].innerHTML;
        var UserType = $(row.cells[3].innerHTML)[0].children[0].innerText;
        var Email = $(row.cells[1].innerHTML)[0].childNodes[1].children[0].childNodes[2].innerHTML;
        if(userEmail == Email) {
            var IsfilterIntranet = false;
            var IsfilterDMS = false;
            var IsFilterProject = false;
            IsfilterIntranet = $("#chkfilterIntranet").is(':checked');
            IsfilterDMS = $("#chkfilterDMS").is(':checked');
            IsFilterProject = $("#chkfilterProject").is(':checked');
            if(IsNotSubscribedIntrenet) {
                IntranetCount = $('#LicIntranetConsumedCount').text();
                LicIntranetAvilableCount = $("#LicIntranetAvilableCount").text();
                var chkInternetId = $(row.cells[4].innerHTML)[0].children[0].id;
                var checked = $("#" + chkInternetId).is(':checked');
                $("#LicIntranetSelecte").text("Selected:");
                if(checked && IsfilterIntranet) {
                    $("#" + chkInternetId).prop('checked', IsfilterIntranet);
                    // LicIntranetAvilableCount = parseInt(LicIntranetAvilableCount) + 1;
                    //IntranetCount = parseInt(IntranetCount) - 1;
                    $("#LicIntranetAvilableCount").html(LicIntranetAvilableCount);
                    $('#LicIntranetConsumedCount').html(IntranetCount);
                } else {
                    if(IsfilterIntranet) {
                        $("#" + chkInternetId).prop('checked', IsfilterIntranet);
                        LicIntranetAvilableCount = parseInt(LicIntranetAvilableCount) - 1;
                        IntranetCount = parseInt(IntranetCount) + 1;
                        $("#LicIntranetAvilableCount").html(LicIntranetAvilableCount);
                        $('#LicIntranetConsumedCount').html(IntranetCount);
                    } else {
                        if(checked) {
                            $("#" + chkInternetId).prop('checked', IsfilterIntranet);
                            LicIntranetAvilableCount = parseInt(LicIntranetAvilableCount) + 1;
                            IntranetCount = parseInt(IntranetCount) - 1;
                        }
                        $("#LicIntranetAvilableCount").html(LicIntranetAvilableCount);
                        $('#LicIntranetConsumedCount').html(IntranetCount);
                    }
                }
            }
            if(IsNotSubscribedDMS) {
                DMSCount = $('#LicDMSConsumedCount').text();
                LicDMSAvilableCount = $("#LicDMSAvilableCount").text();
                $("#LicdmsSelected").text("Selected:");
                var ChkDMSId = $(row.cells[5].innerHTML)[0].children[0].id;
                var checked = $("#" + ChkDMSId).is(':checked');
                if(checked && IsfilterDMS) {
                    $("#" + ChkDMSId).prop('checked', IsfilterDMS);
                    // LicDMSAvilableCount = parseInt(LicDMSAvilableCount) + 1;
                    //DMSCount = parseInt(DMSCount) - 1;
                } else {
                    if(IsfilterDMS) {
                        $("#" + ChkDMSId).prop('checked', IsfilterDMS);
                        LicDMSAvilableCount = parseInt(LicDMSAvilableCount) - 1;
                        DMSCount = parseInt(DMSCount) + 1;
                    } else {
                        if(checked) {
                            $("#" + ChkDMSId).prop('checked', IsfilterDMS);
                            LicDMSAvilableCount = parseInt(LicDMSAvilableCount) + 1;
                            DMSCount = parseInt(DMSCount) - 1;
                        }
                    }
                }
                $('#LicDMSConsumedCount').html(DMSCount);
                $("#LicDMSAvilableCount").html(LicDMSAvilableCount);
            }
            if(IsNotSubscribedProject) {
                ProjectCount = $('#LicProjectConsumedCount').text();
                LicProjectTaskAvilableCount = $("#LicProjectTaskAvilableCount").text();
                $("#LicProjectSelected").text("Selected:");
                var ChkProjectId = $(row.cells[6].innerHTML)[0].children[0].id;
                var checked = $("#" + ChkProjectId).is(':checked');
                if(checked && IsFilterProject) {
                    $("#" + ChkProjectId).prop('checked', IsFilterProject);
                    //LicProjectTaskAvilableCount = parseInt(LicProjectTaskAvilableCount) + 1;
                    // ProjectCount = parseInt(ProjectCount) - 1;
                } else {
                    if(IsFilterProject) {
                        $("#" + ChkProjectId).prop('checked', IsFilterProject);
                        LicProjectTaskAvilableCount = LicProjectTaskAvilableCount - 1;
                        ProjectCount = parseInt(ProjectCount) + 1;
                    } else {
                        if(checked) {
                            $("#" + ChkProjectId).prop('checked', IsFilterProject);
                            LicProjectTaskAvilableCount = parseInt(LicProjectTaskAvilableCount) + 1;
                            ProjectCount = parseInt(ProjectCount) - 1;
                        }
                    }
                }
                $("#LicProjectTaskAvilableCount").html("");
                $("#LicProjectTaskAvilableCount").html(LicProjectTaskAvilableCount);
                $('#LicProjectConsumedCount').html(ProjectCount);
            }
        }
    });
    IsVisibleSubmitButton();
}



function GetApprovalProcessMaster() {
    var BpassLenth = "";
    RestQuery = "?$select=* &$filter= Active eq '1' and (TrialStatus eq 'Licenced')  &$top=5000";
    $.when(CommonFunctionLic.getItemsWithQueryItem("ApprovalProcessMaster", RestQuery)).done(function(ApprovalProcessMaster) {
        BpassLenth = ApprovalProcessMaster.results.length;
    });
    return BpassLenth;
}

function GetAvailbleLicence() {
    AllEmployees = [];
    var Totalemployee = "";
    var Query = "?$top=5000&$select=ID,Visible_in_directory,Status,ParentId,PrimaryCompany,JoiningDate,DateOfAnniversary,Manager,FullName,EmpLicense,DateOfBirth,LogonName/UserName,LogonName/Id," + "OfficeLocation/OfficeName,OfficeLocation/Region,Email,Department/DepartmentName,Designation," + "Company/CompanyName,Company/ID,ManagerLoginName/Id,ManagerLoginName/EMail," + "MobileNumber&$expand=LogonName,ManagerLoginName,Company,Department,OfficeLocation,AttachmentFiles&$filter=PrimaryCompany eq 'Primary' and Status eq 'Active' ";
    dfds = $.Deferred(),
        extdfds = $.Deferred();
    var AllEmployeeList = "";
    var entrnalempcolut, extrnalempcount;
    url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + Query;
    $.when(CommonFunctionLic.getItems(url, dfds)).done(function(EmployeesResults) {
        response = [];
        entrnalempcolut = EmployeesResults.length;
        AllEmployeeUser = EmployeesResults;
        for(var i = 0; i < AllEmployeeUser.length; i++) {
            var AttachmentURL = ""
            if(AllEmployeeUser[i].AttachmentFiles.results.length > 0) {
                AttachmentURL = AllEmployeeUser[i].AttachmentFiles.results[0].ServerRelativeUrl;
            } else {
                AttachmentURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + AllEmployeeUser[i].LogonName.UserName;
            }
            AllEmployees.push({
                'Id': AllEmployeeUser[i].Id,
                'EMail': AllEmployeeUser[i].LogonName.UserName,
                'FullName': AllEmployeeUser[i].FullName,
                'EmpLicense': AllEmployeeUser[i].EmpLicense,
                'ManagerLoginName': AllEmployeeUser[i].ManagerLoginName,
                'Designation': AllEmployeeUser[i].Designation == null ? "" : AllEmployeeUser[i].Designation,
                'OfficeLocation': AllEmployeeUser[i].OfficeLocation,
                'Department': AllEmployeeUser[i].Department,
                'Company': AllEmployeeUser[i].Company,
                'AttachmentFile': AttachmentURL,
                'Type': "Employees",
            })
        }
        // active and validateup to >= that today
        //(Status eq 'Initiated') or (Status eq 'Invited' )or (Status eq 'Pending')or
        var ExternalQuery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items?$select=*,InternalStakeholders/Title,Supervisor_Guest/Title,Client_Name/Title,LoginName/Title,LoginName/EMail,Supervisor/EMail, Supervisor/Title&$expand= LoginName,Supervisor,Client_Name,Supervisor_Guest,InternalStakeholders,AttachmentFiles &$filter= (ValidUpto ge '" + new Date().toISOString() + "') and (Status eq 'Active')";
        $.when(CommonFunctionLic.getItems(ExternalQuery, extdfds)).done(function(ExternalResults) {
            response = [];
            // AllEmployeeUser =[];
            extrnalempcount = ExternalResults.length;
            // AllEmployeeUser = ExternalResults;
            for(var i = 0; i < ExternalResults.length; i++) {
                var AttachmentURL = ""
                if(ExternalResults[i].AttachmentFiles.results.length > 0) {
                    AttachmentURL = ExternalResults[i].AttachmentFiles.results[0].ServerRelativeUrl;
                } else {
                    AttachmentURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + ExternalResults[i].LoginName.EMail;
                }
                AllEmployees.push({
                    'Id': ExternalResults[i].Id,
                    'EMail': ExternalResults[i].LoginName.EMail,
                    'FullName': ExternalResults[i].Title,
                    'EmpLicense': ExternalResults[i].EmpLicense,
                    'ManagerLoginName': ExternalResults[i].Supervisor.EMail,
                    'Designation': ExternalResults[i].Designation == null ? "" : ExternalResults[i].Designation,
                    'OfficeLocation': "",
                    'Department': "",
                    'Company': ExternalResults[i].Client_Name.Title,
                    'AttachmentFile': AttachmentURL,
                    'Type': "Guest",
                })
            }
        });
        AllEmployeeList = parseInt(entrnalempcolut) + parseInt(extrnalempcount);
        Totalemployee = (parseInt(UsersLicenceRequired) - parseInt(AllEmployeeList));
    });
    return Totalemployee;
}
var response = response || [];
//Get details from SP list above 5000
var CommonFunctionLic = [];
CommonFunctionLic.getItemsWithQueryItem = function(ListName, Query) {
    DeferredObj = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/items/" + Query,
        type: "GET",
        async: false,
        headers: {
            ACCEPT: "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function(data) {
            DeferredObj.resolve(data.d);
            //   console.log();
        },
        error: function(error) {
            //alert(JSON.stringify(error));
            DeferredObj.reject(error);
        }
    });
    return DeferredObj.promise();
};
CommonFunctionLic.updateItemWithID = function(Id, ListName, Metadata) {
    var dfd = $.Deferred();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListName + "')/items(" + Id + ")",
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
        success: function(data) {
            console.log("success");
            dfd.resolve(data);
        },
        error: function(error) {
            console.log(JSON.stringify(error));
            dfd.reject(error);
        }
    });
    return dfd.promise();
};
CommonFunctionLic.GetItemTypeForListName = function(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}
CommonFunctionLic.getItems = function(url, dfds) {
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function(data) {
            response = response.concat(data.d.results);
            if(data.d.__next) {
                url = data.d.__next;
                CommonFunctionLic.getItems(url, dfds);
            } else {
                dfds.resolve(response);
            }
        },
        error: function(error) {
            dfds.reject(error)
            console.log(error);
        }
    })
    return dfds.promise()
}
CommonFunctionLic.SetValuesInFilter = function() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Companies')/items?$select=ID,CompanyName";
    $.ajax({
        url: Ownurl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function(data) {
            var items = data.d.results;
            $("#FilterEditEventCateory").html('');
            for(var i = 0; i < items.length; i++) {
                $("#FilterEditEventCateory").append($("<option></option>").attr("value", data.d.results[i].ID).text(data.d.results[i].CompanyName));
            }
            IsValueSet = true;
            CommonFunctionLic.GetDepartment(Logged_CompanyId);
            $("#FilterEditEventCateory").val(Logged_CompanyId);
            //initializePeoplePicker("pplManager");
            //$("#ddlFilterCompany").trigger("change");
        },
        eror: function(data) {
            console.log('error');
        }
    });
};
//Bind department name according to company
CommonFunctionLic.GetDepartment = function(companyID) {
    $('#FilterEditEventDepartment').empty().append('<option value="0">-Select Department-</option>');
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=ID,CompanyIDId/ID,DepartmentName&$filter=CompanyIDId  eq '" + companyID + "'";
    $.ajax({
        url: Ownurl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function(data) {
            var items = data.d.results;
            for(var i = 0; i < items.length; i++) {
                $("#FilterEditEventDepartment").append($("<option></option>").attr("value", data.d.results[i].ID).text(data.d.results[i].DepartmentName));
            }
            CommonFunctionLic.GetOfficeLocation(companyID);
        },
        eror: function(data) {
            console.log('error');
        }
    });
};
//Bind Locations name according to company
var arrRegion = [];
CommonFunctionLic.GetOfficeLocation = function(currentCopanyIDLocation) {
    $('#ddlFilterLoc').empty().append('<option value="0">-Select Location-</option>');
    //$('#ddlFilterRegion').empty().append('<option value="0">-Select Region-</option>');
    arrRegion = [];
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OfficeLocation')/items?$select=ID,Region,OfficeName,CompanyID/ID&$expand=CompanyID&$filter=OfficeLocationId eq '0' and CompanyID/ID eq '" + currentCopanyIDLocation + "'";
    $.ajax({
        url: Ownurl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function(data) {
            var items = data.d.results;
            for(var i = 0; i < items.length; i++) {
                $("#ddlFilterLoc").append($("<option></option>").attr("value", data.d.results[i].ID).text(data.d.results[i].OfficeName));
                var Region = '';
                Region = items[i].Region;
                if(Region != null) {
                    arrRegion.push(data.d.results[i].Region);
                }
            }
            CommonFunctionLic.GetClientMaster(Logged_CompanyId);
        },
        eror: function(data) {
            console.log('error');
        }
    });
};
//Bind department name according to Customer company
CommonFunctionLic.GetClientMaster = function(companyID) {
    $('#FilterEditEventGuestCoustomer').empty().append('<option value="0">-Select Customer-</option>');
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ClientMaster')/items?$select=ID,CompanyIDId/ID,Title&$filter=CompanyIDId  eq '" + companyID + "' and IsActive eq 1";
    $.ajax({
        url: Ownurl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function(data) {
            var items = data.d.results;
            for(var i = 0; i < items.length; i++) {
                $("#FilterEditEventGuestCoustomer").append($("<option></option>").attr("value", data.d.results[i].ID).text(data.d.results[i].Title));
            }
        },
        eror: function(data) {
            console.log('error');
        }
    });
};
CommonFunctionLic.filterEmployee = function() {
    var arrFilter = [];
    response = [];
    var ManagerIds = CommonFunctionLic.getPeopleUserInfoGroups("pplManager");
    var EmployeeIds = CommonFunctionLic.getPeopleUserInfoGroups("pplEmployee");
    var Designation = $("#FilterDesignation").val();
    var filter = "";
    var CompanyName = $("#FilterEditEventCateory :selected").text();
    if($('#FilterEditEventType').val() == "Employee") {
        var DeptName = $("#FilterEditEventDepartment :selected").text(),
            LocationName = $("#ddlFilterLoc :selected").text();
        //For showing filter results ends//
        if(Designation.trim() != "") {
            filter += " and substringof('" + Designation + "',Designation)";
            //filter += " and Designation eq '" + Designation + "'";
        }
        if(DeptName != "-Select Department-") {
            filter += " and Department/DepartmentName eq '" + DeptName + "'";
        }
        if(LocationName != "-Select Location-") {
            filter += " and OfficeLocation/OfficeName eq '" + LocationName + "'";
        }
        if(ManagerIds.length > 0) {
            filter += " and ManagerLoginName/EMail eq '" + ManagerIds[0] + "'";
        }
        if(EmployeeIds.length > 0) {
            filter += " and LogonName/UserName eq '" + EmployeeIds[0] + "'";
        }
        var Query = "?$top=5000&$select=ID,Visible_in_directory,Status,ParentId,PrimaryCompany,JoiningDate,DateOfAnniversary,Manager,FullName,EmpLicense,DateOfBirth,LogonName/UserName,LogonName/Id," + "OfficeLocation/OfficeName,OfficeLocation/Region,Email,Department/DepartmentName,Designation," + "Company/CompanyName,Company/ID,ManagerLoginName/Id,ManagerLoginName/EMail," + "MobileNumber&$expand=LogonName,ManagerLoginName,Company,Department,OfficeLocation,AttachmentFiles&$filter=PrimaryCompany eq 'Primary' and Status eq 'Active' and Visible_in_directory ne 'No' and Company/ID eq  '" + $("#FilterEditEventCateory").val() + "'" + filter + " ";
        var dfds = $.Deferred();
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items/" + Query;
        $.when(CommonFunctionLic.getItems(url, dfds)).done(function(EmployeesResultss) {
            //AllEmployeeUser=EmployeesResults;
            for(var i = 0; i < EmployeesResultss.length; i++) {
                var AttachmentURL = ""
                if(EmployeesResultss[i].AttachmentFiles.results.length > 0) {
                    AttachmentURL = EmployeesResultss[i].AttachmentFiles.results[0].ServerRelativeUrl;
                } else {
                    AttachmentURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + EmployeesResultss[i].LogonName.UserName;
                }
                arrFilter.push({
                    'Id': EmployeesResultss[i].Id,
                    'EMail': EmployeesResultss[i].LogonName.UserName,
                    'FullName': EmployeesResultss[i].FullName,
                    'EmpLicense': EmployeesResultss[i].EmpLicense,
                    'ManagerLoginName': EmployeesResultss[i].ManagerLoginName,
                    'Designation': EmployeesResultss[i].Designation == null ? "" : EmployeesResultss[i].Designation,
                    'OfficeLocation': EmployeesResultss[i].OfficeLocation,
                    'Department': EmployeesResultss[i].Department,
                    'Company': EmployeesResultss[i].Company,
                    'AttachmentFile': AttachmentURL,
                    'Type': "Employees",
                })
            }
        });
    } else if($('#FilterEditEventType').val() == "Guest User") {
        var CompanyName = $("#FilterEditEventGuestCoustomer :selected").val();
        if(CompanyName != "-Select Customer-") {
            filter += " and Client_NameId eq '" + CompanyName + "'";
        }
        if(Designation.trim() != "") {
            filter += " and substringof('" + Designation + "',Designation)";
            //filter += " and Designation eq '" + Designation + "'";
        }
        if(ManagerIds.length > 0) {
            filter += " and Supervisor/EMail eq '" + ManagerIds[0] + "'";
        }
        if(EmployeeIds.length > 0) {
            filter += " and LoginName/EMail eq '" + EmployeeIds[0] + "'";
        }
        var extdfds = $.Deferred();
        //and Client_NameId eq  '" + $("#FilterEditEventGuestCoustomer").val() + "'
        var ExternalQuery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ExternalUsers')/items?$select=*,InternalStakeholders/Title,Supervisor_Guest/Title,Client_Name/Title,Client_Name/Id,LoginName/Title,LoginName/EMail,Supervisor/EMail, Supervisor/Title&$expand= LoginName,Supervisor,Client_Name,Supervisor_Guest,InternalStakeholders,AttachmentFiles &$filter= (ValidUpto ge '" + new Date().toISOString() + "') and (Status eq 'Active') " + filter + "";
        $.when(CommonFunctionLic.getItems(ExternalQuery, extdfds)).done(function(GuestExternalResult) {
            response = [];
            for(var i = 0; i < GuestExternalResult.length; i++) {
                var AttachmentURL = ""
                if(GuestExternalResult[i].AttachmentFiles.results.length > 0) {
                    AttachmentURL = GuestExternalResult[i].AttachmentFiles.results[0].ServerRelativeUrl;
                } else {
                    AttachmentURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + GuestExternalResult[i].LoginName.EMail;
                }
                arrFilter.push({
                    'Id': GuestExternalResult[i].Id,
                    'EMail': GuestExternalResult[i].LoginName.EMail,
                    'FullName': GuestExternalResult[i].Title,
                    'EmpLicense': GuestExternalResult[i].EmpLicense,
                    'ManagerLoginName': GuestExternalResult[i].Supervisor.EMail,
                    'Designation': GuestExternalResult[i].Designation == null ? "" : GuestExternalResult[i].Designation,
                    'OfficeLocation': "",
                    'Department': "",
                    'Company': GuestExternalResult[i].Client_Name.Title,
                    'AttachmentFile': AttachmentURL,
                    'Type': "Guest",
                })
            }
        });
    }
    if(Consumedlicensefilter) {
        Consumedlicensetable.destroy();
        LoadConsumedhtml(arrFilter)
    } else {
        LoadGridhtmlfilter(arrFilter);
    }
};
//get user Ids from People picker
CommonFunctionLic.getPeopleUserInfoGroups = function(pickerPickerControlId) {
    SharedUserName = [];
    var UserArrayList = new Array();
    var pickerDiv = $("[id^='" + pickerPickerControlId + "']");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv[1].id];
    var users = peoplePicker.GetAllUserInfo();
    if(users.length > 0) {
        var allUsersID = new Array();
        var usersEmailIDs = new Array();
        for(var i = 0; i < users.length; i++) {
            var grpid = users[i].Key;
            var autokey = users[i].EntityType;
            if(autokey == "User") {
                //UserArrayList.push(GetUserIdGroups(users[i].Key));
                UserArrayList.push(users[i].Key.split('|')[2]);
                SharedUserName.push(users[i].DisplayText);
            } else {
                var grpid = users[i].EntityData.SPGroupID;
                var myArrays = new Array();
                myArrays.push(siteusers(grpid));
                //  var c = UserArrayList.concat(myArrays);
                var c = UserArrayList.concat.apply([], myArrays);
                UserArrayList = UserArrayList.concat(c);
            }
            //UserArrayList.push(GetUserIdGroups(users[i].Key));
        }
    }
    return UserArrayList;
}
// Render and initialize the client-side People Picker.
CommonFunctionLic.initializePeoplePicker = function(peoplePickerElementId, AllowMultipleValues) {
    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = AllowMultipleValues;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '351px';
    // Render and initialize the picker. 
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
    $(".sp-peoplepicker-editorInput").width(250);
}
//get user information from people picker
function getUserInformation(PeoplepickerId, multipleEmailAddress, assignUserName, StepCount) {
    // Get the people picker object from the page. 
    var userIds = [];
    var uniqueValues = [];
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[PeoplepickerId + "_TopSpan"];
    if(!peoplePicker.IsEmpty()) {
        if(peoplePicker.HasInputError) return false; // if any error  
        else if(!peoplePicker.HasResolvedUsers()) return false; // if any invalid users  
        else if(peoplePicker.TotalUserCount > 0) {
            // Get information about all users.  
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            var promise = '';
            var UsersID = '';
            for(var i = 0; i < users.length; i++) {
                // UsersID += GetUserID(users[i].Key);
                var accountName = users[i].Key;
                users[i].EntityData.Email;
                users[i].DisplayText;
                var userId = GetUserID(accountName);
                if(userId != -1) {
                    if(uniqueValues.indexOf(userId) == -1) {
                        uniqueValues.push(userId);
                        userIds.push(userId);
                    }
                } else {
                    userIds.push(parseInt(users[i].EntityData.SPGroupID));
                }
            }
            return userIds;
        }
    } else {
        return UsersID;
    }
}
//empty the people picker
function EmptyPeoplePicker(peoplePickerId) {
    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + "_TopSpan"];
    var usersobject = peoplePicker.GetAllUserInfo();
    usersobject.forEach(function(index) {
        peoplePicker.DeleteProcessedUser(usersobject[index]);
    });
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
        success: function(data) {
            userId = data.d.Id;
        },
        error: function(data) {
            console.log(data)
            if(currentDlg != "") {
                currentDlg.close();
            }
        }
    })
    return userId;
}
var UserEmail = [];
//on change peoplePIcker
function onChangeAddUser(HTMLID, PplPickerId, userHTMLId) {
    var picker = SPClientPeoplePicker.SPClientPeoplePickerDict[HTMLID];
    var BindUser = '';
    picker.OnValueChangedClientScript = function(elementId, userInfo) {
        if(userInfo.length > 0) {
            BindUser = '';
            tempUserId = parseInt(getUserInformation(PplPickerId));
            //SharingUserId.push(tempUserId);
            var tempEmail = userInfo[0].Key.split('|')[2];
            // ShareUserPrincipleMail.push(userInfo[0].Key.split('|')[2]);
            if(tempEmail.includes('#') == true) {
                tempEmail = tempEmail.split('#ext')[0];
                tempEmail = tempEmail.replace("_", '@');
            }
            // SharingUserEmail.push(tempEmail);
            // SharingUserName.push(userInfo[0].DisplayText);
            var tempUserEmail = []
            tempUserEmail = UserEmail.filter(function(obj) {
                return obj.UserId == tempUserId;
            });
            if(tempUserEmail.length == 0) {
                UserEmail.push({
                    'UserId': tempUserId,
                    'UserEmail': tempEmail,
                    'UserName': userInfo[0].DisplayText
                });
                attachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(tempEmail);
                BindUser += '<div class="col-sm-4 parentremove User' + tempUserId + '"><div class="employeesection">';
                BindUser += '<span onclick="removeUser(this, \'' + tempEmail + '\', \'' + userInfo[0].DisplayText + '\', ' + tempUserId + ');" class="crosebox"><i class="fa fa-times"></i></span>';
                BindUser += '<div class="empoyeeimg"><img src="' + attachment + '" alt="">';
                BindUser += '</div><div class="employeeinfo"><h3>' + userInfo[0].DisplayText + '</h3>';
                BindUser += '<span class="employeeemail" style="cursor:pointer;color:blue" onclick="OpenEmail(\'' + tempEmail + '\')">' + tempEmail + '</span>';
                BindUser += '</div></div></div>';
                $("#" + userHTMLId).append(BindUser);
            } else {
                alert(" the user already exists");
            }
            EmptyPeoplePicker(PplPickerId);
            //$("#pplEmployeeProject").removeClass("activingss");
        } else {
            //$("#userList").hide();
        }
    };
}
//remove user from each step
function removeUser(Action, Email, DisplayName, EmpId, count) {
    $(Action).parents('.parentremove').remove();
    UserEmail = UserEmail.filter(function(obj) {
        return obj.UserEmail.toLowerCase() !== Email.toLowerCase();
    });
    UserEmail = UserEmail.filter(function(obj) {
        return obj.UserName.toLowerCase() !== DisplayName.toLowerCase();
    });
    UserEmail = UserEmail.filter(function(obj) {
        return obj.UserId != EmpId;
    });
    /*if (SharingUserEmail.length == 0) {
        $(".userBox").hide();
    }*/
}
var IsHomepageUrl = "";

function SetDefaultPage(HomepageUrl, Istrue) {
    IsHomepageUrl = HomepageUrl;
    $.ajax({
        // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
        // You can replace this with other site URL where you want to apply the function
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/rootfolder",
        type: "POST",
        async: false,
        data: JSON.stringify({
            '__metadata': {
                // Type that you are modifying.
                'type': 'SP.Folder'
            },
            // Specify Server relative URL of the page, you want to set as Home page
            'WelcomePage': HomepageUrl
        }),
        headers: {
            // Accept header: Specifies the format for response data from the server.
            "Accept": "application/json;odata=verbose",
            //Content-Type header: Specifies the format of the data that the client is sending to the server
            "Content-Type": "application/json;odata=verbose",
            // IF-MATCH header: Provides a way to verify that the object being changed has not been changed since it was last retrieved.
            // "IF-MATCH":"*", will overwrite any modification in the object, since it was last retrieved.
            "IF-MATCH": "*",
            //X-HTTP-Method:  The MERGE method updates only the properties of the entity , while the PUT method replaces the existing entity with a new one that you supply in the body of the POST
            "X-HTTP-Method": "PATCH",
            // X-RequestDigest header: When you send a POST request, it must include the form digest value in X-RequestDigest header
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function(data, status, xhr) {
            console.log("Success");
            if(Istrue) {
                alert("Welcome Page has been updated successfully.");
            } else {
                var OldHomepage = GetWelcomePage();
                if(IsHomepageUrl != OldHomepage) {
                    var time = setTimeout(SetDefaultPage(IsHomepageUrl, false), 2000);
                }
            }
        },
        error: function(xhr, status, error) {
            console.log("Failed");
        }
    });
}

function GetWelcomePage() {
    var WelcomePage = "";
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + '/_api/web/rootfolder',
        type: 'GET',
        async: false,
        headers: {
            'accept': 'application/json;odata=verbose'
        },
        success: function(data) {
            // alert(data);
            WelcomePage = data.d.WelcomePage
        },
        error: function(data) {}
    })
    return WelcomePage;
}
var TechAdminArr = [];

function getCompanyApprovers() {
    var siteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getBytitle('ProcessApprovers')/items?$select=*,Approver/Title,Approver/EMail,Approver/Id,Approver/UserName,Owner/Title,Owner/EMail,Owner/Id,Owner/UserName,Contributors/Title,Contributors/Id,Contributors/UserName,Contributors/EMail&$expand=Approver,Contributors,Owner&$filter=CompanyId eq '" + Logged_CompanyId + "'";
    $.ajax({
        url: siteUrl,
        //headers:{"ACCEPT":"application/json;odata=verbose"},
        headers: {
            "ACCEPT": "application/json;odata=verbose"
        },
        async: false,
        success: function(data) {
            var results = data.d.results;
            g_ApprovalItems = results;
            for(let i = 0; i < results.length; i++) {
                //var scope = results[i].Scope;
                //var ApproverRequired = results[i].ApproverRequired;
                if(results[i].WebPartName == 'Tech Admin') {
                    var Contributors = results[i].Contributors;
                    if(results[i].ContributorsId != null) {
                        Contributors.results.forEach(function(Items) {
                            var email = Items.EMail;
                            var userName = Items.Title;
                            var userId = Items.Id;
                            TechAdminArr.push({
                                EMail: email,
                                Id: userId,
                                UserName: userName
                            });
                        })
                    }
                }
            }
        },
        error: function(error) {
            alert(error);
        }
    })
    return TechAdminArr;
}
