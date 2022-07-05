 var g_DepartmentUrl='';
 var documentCategoryCounter = 0;
 var departmentID = "";
 var arrDepartmentItems=[];
$(document).ready(function()
{
     departmentID = GetParameterValues('DepartmentId');
          
        

     if(departmentID =='undefined' || departmentID==null){ 
       departmentID =Logged_DepartmentId;
     }
     else{
      
      departmentID =window.atob(departmentID);
       var type= typeof departmentID;
       departmentID =parseInt(departmentID);
     }
     GetAlDepartmentUrl(); 
     InitializationComponents()
   // GetDocumentCategory();
   
   
   $('#currentDocDept').click(function(){
         //waitingDialog.show();
         setTimeout(function () {
                GetDocumentCategory(g_DepartmentUrl);
          }, 500);
   
   })
   
   

});

$(window).load(function() {
$("#currentDocDept").parent().attr('style', 'border: '+ '1px solid'+HeaderTextColor+' !important'); 
   $("#currentDocDept").parent().css({"background-color": HeaderTextColor, "color": MediatextColor});
   $('.documents-filter div div div').on('click', function(){
       $(this).siblings().find("a").removeAttr("style");
       $(this).find("a").attr('style', 'border: '+ '1px solid'+HeaderTextColor+' !important'); 
        $(this).find("a").css('background-color',HeaderTextColor, 'important');
       $(this).find("a").css('color',MediatextColor, 'important');  
    });
    
 })  ;


function InitializationComponents()
{debugger
    
    if (departmentID > 0) {
        GetDepartmentUrl('Departments', departmentID);
    }
}


function GetDocumentCategory(currentDepartnemtUrls)
{
debugger;
    var siteURL = currentDepartnemtUrls;
    var resultsId=arrDepartmentItems.filter(function(data){
    return data.SiteURL==siteURL;
    })
    departmentID=resultsId[0].Id;
    waitingDialog.show();
   // var Ownurl =_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('DocumentType')/items?$select=ID,Title"
      var Ownurl =_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$select=CategoryType,CatogeryName&$filter=CategoryType eq 'Document'"
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            var ItemCount = data.d.results.length;
            $("#departmentalDocuments").empty();
            if (ItemCount == 0)
            {
                mainHTML = "<div class=\"norecordfound col-sm-8 col-xs-8 col-md-8\">";
                mainHTML += "<h3 data-localize='NoRecord_Documents' class=\"top5\">No Record Found</h3>";
                mainHTML += "</div>";
                $("#departmentalDocuments").append(mainHTML);
                return;
            }
                        
            var documentsType=new Array();
            for (var i = 0; i < items.length; i++)
            {
               // var Title = items[i].Title;
                var Title = items[i].CatogeryName;
                
                if (Title != null && Title!="")
                { 
                 documentsType.push(Title);
                 //   GetDocuments(siteURL, Title, items.length,i);
                }
            }
            documentsType.sort();
            for (var i = 0; i < documentsType.length; i++)
            {
                 console.log(documentsType[i]);
                  GetDocuments(siteURL, documentsType[i], items.length,i);
            }
            documentCategoryCounter=0;
            GetDocuments(siteURL, null, items.length,0);
            

            waitingDialog.hide();

        }, eror: function (data) {

            console.log('error');
        }
    });
}
function GetDocuments(siteURL,documentType,categoryCounter,currentCtegoryIndex,Title)
{
    console.log(siteURL + "    " + documentType);    
    if(documentCategoryCounter > 4)
    {
        return;
    }
    var query ='';
    if(documentType==null){
         query = "&$orderby=Modified desc&$filter=startswith(AccessLevel, 'Everyone') and ApprovalStatus eq 'Approved' and DocumentType eq '-Select-' or (ApprovalStatus eq 'Approved' and DocumentType eq null)";
    }
    else{
     query = "&$orderby=Modified desc&$filter=startswith(AccessLevel, 'Everyone') and (ApprovalStatus eq 'Approved' or ApprovalStatus eq null) and DocumentType eq '" + documentType + "'";
    }
    var Ownurl = siteURL + "/_api/web/Lists/GetByTitle('DepartmentalDMS')/Items?$select=ID,DocumentWrittenBy,Modified,Editor/EMail,Editor/Title,File_x0020_Type,DocumentType,Title,AccessLevel,File/Name,File/ServerRelativeUrl&$top=500&$expand=File,Editor/Id"+query;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async:false,
        success: function (data)
        {debugger
            var items = data.d.results;
            if(documentType==null){
            documentType="Others"
            }
            var mainHTML='';
			// No Record Found Logic
            var ItemCount = data.d.results.length;
            
			if (ItemCount == 0 && documentCategoryCounter==0 && categoryCounter-1 == currentCtegoryIndex)
			{
				mainHTML="<div class=\"norecordfound col-sm-8 col-xs-8 col-md-8\">";
		        mainHTML+="<h3 data-localize='NoRecord_Documents' class=\"top5\">No Record Found</h3>";
		        mainHTML+="</div>";
				$("#departmentalDocuments").append(mainHTML);
				return;
			}
			if (ItemCount > 0) 
			{
			    var dates = [];
			    console.log(items);
			    for (var i = 0; i < items.length; i++) {
			        dates.push(new Date(items[i].Modified))
			    }
			    var maxDate = new Date(Math.max.apply(null, dates));
			    var FileName=items[0].File.Name;
			    console.log(maxDate);
			    var userImage=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].Editor.EMail) 
			   // var departmentId = titanForWork.getQueryStringParameter("DepartmentId");
			    var redirectUrl = "../Pages/ViewAllDocuments.aspx?WebAppId=2&DepartmentId=" + departmentID + "&DocumentType=" + documentType + "&undefined=undefined";
			    var trCollection = "";
                trCollection+='<div class="col-md-4">'
				trCollection+='<div class="document-types-card">'
				trCollection+='<div class="document-types-card-panel">'
				trCollection+='<div class="document-types-card-top">'
				trCollection+='<div class="document-types-card-top-title"><a href="'+redirectUrl+'">' + documentType + '</a></div>'
				trCollection+='</div>'
				trCollection+='<div class="document-types-last-modified">Latest Upload:<span>'+ShowCommonDateFormat(maxDate)+'</span></div>'
				trCollection+='<div class="document-types-card-bottom">'
				trCollection+='<div class="members-card-body-info text-ellipsis">'
				//trCollection+='<p class="member-email text-ellipsis"><span class="mr5">File:</span><span>'+FileName+'</span></p>'
				//trCollection+='<p class="member-email text-ellipsis"><span class="mr5">Author:</span><span>'+items[0].DocumentWrittenBy+'</span></p>'
				trCollection+='<div class="flexing" style="display:flex; align-items:center;">'//<span style="">Upload on:</span>'
				//trCollection+='<p class="member-email text-ellipsis userdate1" style="padding:0 3px;margin:0"><span>'+ShowCommonDateFormat(maxDate)+'</span></p></div>'
				trCollection+='<div class="uploaded-by-box"><span style="display:none">Upload by:</span><div class="userdetails" >'
                trCollection+='<div class="members-card-head">'
                trCollection+='<img src="'+userImage+'" alt="user">'
                trCollection+='</div>'
				trCollection+='<div> <h3 class="member-name text-ellipsis">'+items[0].Editor.Title+'</h3>'
				trCollection+='<p class="member-email text-ellipsis mb0">'+items[0].Editor.EMail+'</p>' 
				trCollection+='<p class="member-email text-ellipsis"><span class="mr5">File:</span><span>'+FileName+'</span></p></div>'
				trCollection+='</div></div></div></div></div>'
				trCollection+='<a class="document-types-card-top-number panel-heading-bg-txt-clr" href="'+redirectUrl+'">'+ItemCount+'</a>'
				trCollection+='</div></div>'
			   
			    
			    /*trCollection += '<li class="list-group-item"><a href="'+redirectUrl+'">' + documentType + ' <span class="badge-text2 pull-right mt-10">' + ItemCount + '</span></a>';
			    trCollection += '<div><small>Last Modified : ' + ShowCommonDateFormat(maxDate) + '</small></div>';
			    trCollection += '</li>';*/
			    
			    $("#departmentalDocuments").append(trCollection);
			    documentCategoryCounter++;
			}
        },eror: function (data)
        {
            alert(data);
        }
    });
}



function GetDepartmentUrl(listName, ItemID) {
    var siteURL1 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=ID,Title,SiteURL&$filter=ID eq '" + ItemID + "'";
    $.ajax({
        url: siteURL1,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                currentDepartnemtUrls = items[0].SiteURL;
                g_DepartmentUrl=currentDepartnemtUrls; 
                $('#currentDocDept').text(items[0].Title)
               GetDocumentCategory(currentDepartnemtUrls)                
            }

        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
}


function GetParameterValues(param) {

  var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for (var i = 0; i < url.length; i++) {

   var urlparam = url[i].split('=');

   if (urlparam[0] == param) {

    return urlparam[1];

   }

  }

}

/*----Get Department --  16/03/22 lakhan---*/

function GetAlDepartmentUrl() 
{            
    var siteURL1 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=ID,SiteURL,DepartmentName&$filter=CompanyID eq '" +Logged_CompanyId+ "'";
    $.ajax({
        url: siteURL1,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
             var DeptFilterHtml = "";
              var DeptFilterHtml2 = "";

            var items = data.d.results;
            arrDepartmentItems=items;
            if (items.length > 0) 
            {
               items.sort(function(a, b) {
			   var keyA =a.DepartmentName.toLowerCase(),
				   keyB =b.DepartmentName.toLowerCase();
               if (keyA < keyB) return -1;
			   if (keyA > keyB) return 1;
				  return 0;
			   });
               
               for(i = 0; i< items.length; i++)
               {
               if(items[i].ID != departmentID)
               {
                 DeptFilterHtml2 += '<a onclick=\'GetDocumentCategory("'+items[i].SiteURL+'")\'><span style="cursor:pointer;">' + items[i].DepartmentName+ '</span></a>';
                } 
                }               
                   
            $('.documents-filter').append(DeptFilterHtml2);     
                   
  




$('.documents-filter').owlCarousel({
//		loop:true,
        speed:500,
        margin:5,
        autoWidth:true,
        slideBy: 7,
		nav:true,
		dots:false,
		responsive:{
				0:{
						items:1
				},
				768:{
						items:3
				},
				1024:{
						items:5
				},
				1366:{
						items:5
				}
		}
})

                              
            }

        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
}