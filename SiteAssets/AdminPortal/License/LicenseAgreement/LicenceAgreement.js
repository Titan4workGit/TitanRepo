$(document).ready(function(){
    var CompanyId=Logged_CompanyId;
	$("#closeLicenceAgreement").click(function(){
		location.href='../Pages/LicenceManager.aspx?WebAppId='+CompanyId;
	});
});