////////// Page Authorization
$(document).ready(function(){
	UserAuthorization();
})

//// User Authorization
function UserAuthorization()
{
	var companyId =  titanForWork.getQueryStringParameter("CompanyId");
	titanForWork.PageAuthorization("ManageCompany",companyId).done(function(currentUserRights,message)
	{
		if(currentUserRights.length>0)
		{
			if((currentUserRights[0].SiteAdmin=="SiteAdmin") || (currentUserRights[0].TechAdmin=="TechAdmin"))
			{
				// TO DO Here		
			}
			else
			{
				alert(message);
				window.location.href=_spPageContextInfo.webAbsoluteUrl+"/Pages/Default.aspx?WebAppId="+companyId;
			}
		}
   });
}

var currentCompanyid="";
var app = angular.module('myApp', []);
 var selectedLanguaList=new Array();
function updateItemWithID(ListName, Metadata, ID) 
{
	
    var dfd = $.Deferred();

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListName + "')/GetItemById('" + ID + "')",
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH",
            "If-Match": '*'
        },
        data: JSON.stringify(Metadata),
        async: false,
        success: function (RESULT) {
           // console.log();
            dfd.resolve(true);

        },
        error: function (error) {
			
            alert(JSON.stringify(error));
            dfd.reject(error);

        }
    });
    return dfd.promise();
}
function GetItemTypeForListName (ListName) 
{
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}
app.controller('myCtrl', function($scope,$http) 
{
$scope.allcontrols="default"

$scope.PageLod=function()
	{
	$scope.GetLanguageOption();
	$scope.GetLanguage();
	
	
	                 
	
	
	
	}
	$scope.SetDeafaultValue=function()
	{
		              selectedLanguaList.push($scope.LinkTitleDefault);	
					  selectedLanguaList.push($scope.LinkTitleDefault2);
					  selectedLanguaList.push($scope.LinkTitleDefault3);			
					  selectedLanguaList.push($scope.LinkTitleDefault4);			
					  selectedLanguaList.push($scope.LinkTitleDefault5);			
					  selectedLanguaList.push($scope.LinkTitleDefault6);				
					  selectedLanguaList.push($scope.LinkTitleDefault7);			
					  selectedLanguaList.push($scope.LinkTitleDefault8);				
					  selectedLanguaList.push($scope.LinkTitleDefault9);				
					  selectedLanguaList.push($scope.LinkTitleDefault10);
	}
	$scope.redirectPage=function()
	{
		window.history.go(-1)
	}
	$scope.dropdownValueChange=function(newValue,oldValue)
	{
                     					
					  if(selectedLanguaList.indexOf(newValue)==-1)
					  {
						  
						  selectedLanguaList=[];
						  $scope.SetDeafaultValue();
						  $scope.dublicate='notdublicate';
						  $scope.this=oldValue;
					  }
					  else
					  {
						$scope.dublicate='dublicate';
						alert('This Language already selected,Please select another language .');
					  }
	}
	$scope.updateLanguage=function()
	{	
	 waitingDialog.show();
	 $.when($scope.UpdateMethod()).done(function (MainExamListItemTemp) 
					 {				
					alert('Language settings updated successfully .');
					waitingDialog.hide();
				     });				
	}
	$scope.UpdateMethod=function()
	{
	       if($scope.deFaultStatus==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault,$scope.DefaluItemID);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault,$scope.DefaluItemID);
		   }	
           if($scope.deFaultStatus2==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault2,$scope.DefaluItemID2);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault2,$scope.DefaluItemID2);
		   }
           if($scope.deFaultStatus3==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault3,$scope.DefaluItemID3);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault3,$scope.DefaluItemID3);
		   }
           if($scope.deFaultStatus4==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault4,$scope.DefaluItemID4);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault4,$scope.DefaluItemID4);
		   }
           if($scope.deFaultStatus5==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault5,$scope.DefaluItemID5);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault5,$scope.DefaluItemID5);
		   }
           if($scope.deFaultStatus6==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault6,$scope.DefaluItemID6);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault6,$scope.DefaluItemID6);
		   }
           if($scope.deFaultStatus7==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault7,$scope.DefaluItemID7);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault7,$scope.DefaluItemID7);
		   }	
            if($scope.deFaultStatus8==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault8,$scope.DefaluItemID8);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault8,$scope.DefaluItemID8);
		   }
           if($scope.deFaultStatus9==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault9,$scope.DefaluItemID9);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault9,$scope.DefaluItemID9);
		   }	
           if($scope.deFaultStatus10==true)
		   {
			     $scope.updateInformation("LanguageSetting","Active",$scope.LinkTitleDefault10,$scope.DefaluItemID10);	
		   }
		   else
		   {
			  $scope.updateInformation("LanguageSetting","InActive",$scope.LinkTitleDefault10,$scope.DefaluItemID10);
		   }		   
	}
	$scope.updateInformation=function(ListName,status,language,currentitemId)
	{		
			try 
			{

			var Metadata;
			var ItemType =GetItemTypeForListName(ListName);

					Metadata = {
						__metadata: {
							'type': ItemType
						},
						Status:status,
                        Language:language,
                        DisplayLanguage:language						
					};
					
					 $.when(updateItemWithID(ListName, Metadata,currentitemId)).done(function (MainExamListItemTemp) 
					 {				
					   $scope.RedirectPage(sourcelocation);
				     });
							
		} 
		catch (error)
		{
			console.log(error.message);
		}
	}
	$scope.GetLanguageOption=function()
	{			
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('LanguageSetting')/fields?$filter=EntityPropertyName eq 'Language'";
       	$http({
				url: Ownurl,
				method: "GET",
				headers: { "Accept": "application/json;odata=verbose" }
			}).then(function mySuccess(response) 
		    {				
              $scope.showLanguanges =response.data.d.results[0].Choices.results;			  			  
		    }, function myError(response) 
		   {
		     $scope.myWelcome = response.statusText;
		   });			
	}
	
	
	$scope.GetLanguage=function()
	{			
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('LanguageSetting')/items?$select=ID,DisplayLanguage,Language,Status,LinkTitle";
       	$http({
				url: Ownurl,
				method: "GET",
				headers: { "Accept": "application/json;odata=verbose" }
			}).then(function mySuccess(response) 
		    {				
             // $scope.showLanguanges =response.data.d.results;			  
			  for(var i=0;i<response.data.d.results.length;i++)
			  {
				  if(response.data.d.results[i].LinkTitle=="DefaultLanguage")
				  {
					  $scope.DefaluItemID=response.data.d.results[i].ID;
					  if(response.data.d.results[i].Status=="Active")
					  {
					    $scope.deFaultStatus=true;
					  }
					  else
					  {
						 $scope.deFaultStatus=false;
					  }
					  $scope.LinkTitleDefault=response.data.d.results[i].Language;
				  }
				  else  if(response.data.d.results[i].LinkTitle=="Language2nd")
				  {
					    if(response.data.d.results[i].Status=="Active")
					  {
					   $scope.deFaultStatus2=true;
					   }
					  else
					  {
						 $scope.deFaultStatus2=false;
					  }
					  $scope.DefaluItemID2=response.data.d.results[i].ID;
					  $scope.LinkTitleDefault2=response.data.d.results[i].Language;
				  }
				   else  if(response.data.d.results[i].LinkTitle=="Language3rd")
				  { if(response.data.d.results[i].Status=="Active")
					  {
					   $scope.deFaultStatus3=true;
					   }
					  else
					  {
						 $scope.deFaultStatus3=false;
					  }
					  $scope.DefaluItemID3=response.data.d.results[i].ID;
					  $scope.LinkTitleDefault3=response.data.d.results[i].Language;
				  }
				   else  if(response.data.d.results[i].LinkTitle=="Language4th")
				  { if(response.data.d.results[i].Status=="Active")
					  {
					   $scope.deFaultStatus4=true;
					   }
					  else
					  {
						 $scope.deFaultStatus4=false;
					  }
					  $scope.DefaluItemID4=response.data.d.results[i].ID;
					  $scope.LinkTitleDefault4=response.data.d.results[i].Language;
				  }
				   else  if(response.data.d.results[i].LinkTitle=="Language5th")
				  { if(response.data.d.results[i].Status=="Active")
					  {
					   $scope.deFaultStatus5=true;
					   }
					  else
					  {
						 $scope.deFaultStatus5=false;
					  }
					  $scope.DefaluItemID5=response.data.d.results[i].ID;
					  $scope.LinkTitleDefault5=response.data.d.results[i].Language;
				  }
				   else  if(response.data.d.results[i].LinkTitle=="Language6th")
				  {
					   if(response.data.d.results[i].Status=="Active")
					  { $scope.deFaultStatus6=true;
					   }
					  else
					  {
						 $scope.deFaultStatus6=false;
					  }
					  $scope.DefaluItemID6=response.data.d.results[i].ID;
					  $scope.LinkTitleDefault6=response.data.d.results[i].Language;
				  }
				   else  if(response.data.d.results[i].LinkTitle=="Language7th")
				  { if(response.data.d.results[i].Status=="Active")
					  {
					   $scope.deFaultStatus7=true;
					   }
					  else
					  {
						 $scope.deFaultStatus7=false;
					  }
					  $scope.DefaluItemID7=response.data.d.results[i].ID;
					  $scope.LinkTitleDefault7=response.data.d.results[i].Language;
				  }
				   else  if(response.data.d.results[i].LinkTitle=="Language8th")
				  {
					   if(response.data.d.results[i].Status=="Active")
					  { $scope.deFaultStatus8=true;
					   }
					  else
					  {
						 $scope.deFaultStatus8=false;
					  }
					  $scope.DefaluItemID8=response.data.d.results[i].ID;
					  $scope.LinkTitleDefault8=response.data.d.results[i].Language;
				  }
				   else  if(response.data.d.results[i].LinkTitle=="Language9th")
				  {
					  if(response.data.d.results[i].Status=="Active")
					  {  $scope.deFaultStatus9=true;
					   }
					  else
					  {
						 $scope.deFaultStatus9=false;
					  }
					  $scope.DefaluItemID9=response.data.d.results[i].ID;
					  $scope.LinkTitleDefault9=response.data.d.results[i].Language;
				  }
				   else  if(response.data.d.results[i].LinkTitle=="Language10th")
				  {
					   if(response.data.d.results[i].Status=="Active")
					  { $scope.deFaultStatus10=true;
					   }
					  else
					  {
						 $scope.deFaultStatus10=false;
					  }
					  $scope.DefaluItemID10=response.data.d.results[i].ID;
					  $scope.LinkTitleDefault10=response.data.d.results[i].Language;
				  }
			  }
			  $scope.SetDeafaultValue();
			  
		    }, function myError(response) 
		   {
		     $scope.myWelcome = response.statusText;
		   });			
	}	
});