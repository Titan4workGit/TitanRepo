$(document).ready(function (){
  $('#TitanQR').click(function (e) { //Add by lakhan 
       $('#qr-CodeForTitan').empty();
       createQRCodeForTitan();
    });

})
function createQRCodeForTitan()
{	
	var requestURL=_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('AppConfig')/Items?$select=ID,Title,clientid&$top=1";
	$.ajax({
		url:requestURL,
		type:'GET',
		headers:{"accept": "application/json;odata=verbose"},
		success:function(data)
		{
			var results=data.d.results;
			if(results.length>0)
			{
			var clientId = results[0].clientid; 
			var currentUrl= _spPageContextInfo.webAbsoluteUrl;
			var QRCodeValue= currentUrl+"|"+clientId;
			  if(QRCodeValue){
    	            $('#qr-CodeForTitan').qrcode(QRCodeValue);
                     }				
			}
			else
			{
				var noRecordFound="<h3>Issue Occur in Creating QR COde.Please try agin later.</h3>";
				BootstrapDialog.alert(noRecordFound);
			}
		},
		error:function(msg)
		{
			BootstrapDialog.alert(msg.responseText);
		}
	})
}
