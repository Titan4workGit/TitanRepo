$(document).ready(function(){
    var CompanyId=titanForWork.getQueryStringParameter('CompanyId');
	$("#closeLicencePolicy").click(function(){
		location.href='../Pages/LicenceManager.aspx?WebAppId='+CompanyId;
	});
});