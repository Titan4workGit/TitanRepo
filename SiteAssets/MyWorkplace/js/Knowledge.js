var currentDepartnemtUrls = "";
var documentCategoryCounter = 0;
$(document).ready(function () {

// add by gautam
 $(".article-content").addClass("res_work");
GetAlDepartmentUrl() 
CheckSettingsForDeptUser()
   
    InitializationComponents();
    
   var departmentID = Logged_DepartmentId;
   setTimeout(function(){  GetDocuments(currentDepartnemtUrls,departmentID); }, 3000);
 /* $("#addKnowledge").click(function ()
    { 
        if (departmentID > 0) {
          document.location.href = "../Pages/AddKnowledge.aspx?WebAppId=232&DepartmentId=" + departmentID + "&undefined=undefined";
          //  document.location.href = "../Pages/AddKnowledge.aspx?WebAppId=232&DepartmentId=" + departmentID + "&undefined=undefined";
        }
    });*/
     /*
    $("#viewKnowledgeDept").click(function ()
    { 
        if (departmentID > 0) {
          document.location.href = "../Pages/AddKnowledge.aspx?WebAppId=232&DepartmentId=" + departmentID + "&undefined=undefined";
           // document.location.href = "../Pages/KnowledgeCategory.aspx?WebAppId=232&DepartmentId=" + departmentID + "&undefined=undefined";
        }
    });*/

});
function InitializationComponents() 
{
   // var departmentID = titanForWork.getQueryStringParameter('DepartmentId').split('#')[0];
    var departmentID = Logged_DepartmentId;

    if (departmentID > 0) {
        GetDepartmentUrl('Departments', departmentID);
    }
}
function GetAllCategory(currentDepartmentURL,departmentID)
{
	
var viewKnowledge =  "KnowledgeCategory.aspx?WebAppId=232&DepartmentId=" + departmentID + "&undefined=undefined";
	$('#viewKnowledgeDept').attr('href',viewKnowledge);


    var restQuery = "ID,Modified,Status,Title,PublishedCounter,PendingCounter,DraftCounter&$top=5&$orderby=Modified desc";
        restQuery = restQuery + "&$filter=Status eq '1'";
    var Ownurl = currentDepartmentURL + "/_api/web/lists/getbytitle('KnowledgeBaseCategory')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var items = data.d.results;
            var DeptKnowlegeHtml = "";
            
            var counterIndex=0;
            for (var i = 0; i < items.length; i++)
            {counterIndex++;
                var title = items[i].Title;
                var modified =new Date(items[i].Modified);
                var publishedCounter = items[i].PublishedCounter;
                if (publishedCounter == null) {
                    publishedCounter = 0;
                }
                var draftCounter = items[i].DraftCounter;
                if (draftCounter == null) {
                    draftCounter = 0;
                }

                var pendingCounter = items[i].PendingCounter;
                if (pendingCounter == null) {
                    pendingCounter = 0;
                }
                var splittedTitle = '';
                if(title.length > 130){
                	splittedTitle = title.substring(0, 130) + "...";
                }
                else {
                	splittedTitle = title;
                }
                DeptKnowlegeHtml += '<a class="list-group-item knowledge-list-item" title="'+title+'" href="javascript:RedirectOnCategoryTopics('+ items[i].ID +','+departmentID+')" >' + splittedTitle +' <span class="badge pull-right">' + publishedCounter + '</span></a>';
                DeptKnowlegeHtml += '</a>';  
            }
            
            $('#DeptKnowledgeList').html('');
             if(counterIndex==0)
             {
              /*  var langblankMessage=$('#langBlankTextMessageKnowledgeBase').text();
	            if(langblankMessage=="")
	            {
	               langblankMessage="Share your knowledge here";
	            }
                var norecord='<div class="KnowledgeNoRecord col-sm-12 col-xs-12 col-md-12"><h3 class="top5" data-localize="NoRecord_KnowledgeBase">'+langblankMessage+'</h3></div>';
              $('#DeptKnowledgeList').append(norecord); */

             }
else
{
 $('#DeptKnowledgeList').append(DeptKnowlegeHtml);
}
            
            
           
        }, eror: function (data) {
            console.log('error');
        }
    });
}

function GetDepartmentUrl(listName, ItemID) 
{

              //  currentDepartnemtUrls=titanForWork.getQueryStringParameter("DepartmentSiteUrl");
               // GetAllCategory(currentDepartnemtUrls);
              
    var siteURL1 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=ID,SiteURL,DepartmentName&$filter=ID eq '" + ItemID + "'";
    $.ajax({
        url: siteURL1,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) 
            {
                currentDepartnemtUrls = items[0].SiteURL;
                var DeptName = items[0].DepartmentName;
                var DeptId = items[0].ID;
                $("#currentDocDept").html(DeptName);
                $("#currentKnowledgeDept").html(DeptName);
               $("#currentKnowledgeDept").parent().attr('onclick', 'GetAllCategory("'+items[0].SiteURL+'","'+items[0].ID+'");');
               $("#currentDocDept").parent().attr('onclick', 'GetDocuments("'+items[0].SiteURL+'","'+items[0].ID+'");');
                GetAllCategory(currentDepartnemtUrls,DeptId);
               
            }

        }, eror: function (data) {
            console.log($('#txtSomethingWentWrong').val());
        }
    });
}

function GetItemTypeForListName(ListName) {
    return "SP.Data." + ListName.charAt(0).toUpperCase() + ListName.split(" ").join("").slice(1) + "ListItem";
}


function RedirectOnCategoryTopics(categoryId,departmentID) {
   // var departmentID = titanForWork.getQueryStringParameter('DepartmentId').split('#')[0];
       if (departmentID > 0) {
        document.location.href = "../Pages/Topics.aspx?WebAppId=232&DepartmentId=" + departmentID + "&topiccategoryid=" + categoryId + "&undefined=undefined";
    }
}




function GetDocuments(currentDepartnemtUrls,departmentId)
{
$('#DeptDocList').html('');
 var siteURL = currentDepartnemtUrls;
// var departmentId = departmentId;
 var rootSiteURL=  _spPageContextInfo.webAbsoluteUrl;

 $("#docView").attr("href", ""+rootSiteURL+"/Pages/DocumentTypesCounter.aspx?WebAppId="+window.btoa(txtCompanyId)+"&DepartmentId="+window.btoa(departmentId)+"&undefined=undefined");	

      var query = "&$orderby=Modified desc&$filter=startswith(AccessLevel,'Everyone') and (ApprovalStatus eq 'Approved' or ApprovalStatus eq null)";
    var Ownurl = siteURL + "/_api/web/Lists/GetByTitle('DepartmentalDMS')/Items?$select=ID,Modified,File_x0020_Type,DocumentType,Title,AccessLevel,File/Name,File/ServerRelativeUrl&$top=5000&$expand=File"+query;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async:false,
        success: function (data)
        {   
            var trCollection = "";
            var items = data.d.results;
            var group_to_values = items.reduce(function (obj, item) {
            var Type=item.DocumentType
            if(Type=='-Select-' || Type==null|| Type=='Others'|| Type==''){
              item.DocumentType='Others';
            }    
    
		    obj[item.DocumentType] = obj[item.DocumentType] || [];
		    obj[item.DocumentType].push({Modified:item.Modified,ID:item.ID});		    
		    return obj;
}, {});


var groups = Object.keys(group_to_values).map(function (key) {
    return {group: key, color: group_to_values[key]};
});
  for(j = 0; j < groups.length; j++)
  {
          
         var doctype = groups[j].group;
         date= groups[j].color[0].Modified;
         var maxDate = new Date(date);
			    var redirectUrl = "../Pages/ViewAllDocuments.aspx?WebAppId=2&DepartmentId=" + departmentId + "&DocumentType=" + doctype + "";
		        trCollection += '<li class="list-group-item documents-list-item"><a href="'+redirectUrl+'">' + doctype  + ' <span class="badge pull-right">' + groups[j].color.length + '</span></a>';
			    trCollection += '<p>Last Modified : ' + ShowCommonDateFormat(maxDate) + '</p>';
			    trCollection += '</li>';
			    }
			    $("#DeptDocList").append(trCollection);

                      
						
        },eror: function (data)
        {
            console.log('error');
        }
    });
}



function GetAlDepartmentUrl() 
{            
    var siteURL1 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$select=ID,SiteURL,DepartmentName&$filter=CompanyID eq '" +titanForWork.getQueryStringParameter('CompanyId')+ "'";
    $.ajax({
        url: siteURL1,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
             var DeptFilterHtml = "";
              var DeptFilterHtml2 = "";

            var items = data.d.results;
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
               if(items[i].ID != Logged_DepartmentId)
               {
                DeptFilterHtml += '<a onclick=\'GetAllCategory("'+items[i].SiteURL+'","'+items[i].ID+'")\'><span style="cursor:pointer;">' + items[i].DepartmentName+ '</span></a>';
                 DeptFilterHtml2 += '<a onclick=\'GetDocuments("'+items[i].SiteURL+'","'+items[i].ID+'")\'><span style="cursor:pointer;">' + items[i].DepartmentName+ '</span></a>';
                } 
                }
                
                   $('.knowledge-filter').append(DeptFilterHtml);
                   $('.documents-filter').append(DeptFilterHtml2);
                   
                   
  $('.knowledge-filter').owlCarousel({
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


$(window).load(function() {
//$("#currentKnowledgeDept").parent().parent().addClass('color-knowledgeBase');
//$("#currentDocDept").parent().parent().addClass('color-Document');

    /*  $('.knowledge-filter div div div').on('click', function(){
        $(this).siblings().removeClass('color-knowledgeBase');
        $(this).addClass('color-knowledgeBase');
    });
    
     $('.documents-filter div div div').on('click', function(){
        $(this).siblings().removeClass('color-Document');
        $(this).addClass('color-Document');
    });
*/
  //$("#currentKnowledgeDept").parent().parent().css({"background-color": HeaderTextColor, "color": MediatextColor}); 
   $("#currentKnowledgeDept").parent().attr('style', 'border: '+ '1px solid'+HeaderTextColor+' !important'); 
     $("#currentKnowledgeDept").parent().css({"background-color": HeaderTextColor, "color": MediatextColor});
     
        $("#currentDocDept").parent().attr('style', 'border: '+ '1px solid'+HeaderTextColor+' !important'); 
     $("#currentDocDept").parent().css({"background-color": HeaderTextColor, "color": MediatextColor});



$('.knowledge-filter div div div').on('click', function(){
       $(this).siblings().find("a").removeAttr("style");
       $(this).find("a").attr('style', 'border: '+ '1px solid'+HeaderTextColor+' !important'); 
        $(this).find("a").css('background-color',HeaderTextColor, 'important');
       $(this).find("a").css('color',MediatextColor, 'important');  
    });
    
    $('.documents-filter div div div').on('click', function(){
       $(this).siblings().find("a").removeAttr("style");
       $(this).find("a").attr('style', 'border: '+ '1px solid'+HeaderTextColor+' !important'); 
        $(this).find("a").css('background-color',HeaderTextColor, 'important');
       $(this).find("a").css('color',MediatextColor, 'important');  
    });


});







function CheckSettingsForDeptUser()
{
	var requestURL=_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/GetByTitle('EnvironmentalSettings')/Items?$select=Title,Active,scope,ListOfUsers/ID&$expand=ListOfUsers&$filter=Title eq 'Mydepartmentonly'";
	
	$.ajax({
		url:requestURL,
		type:'GET',
		headers:{"accept": "application/json;odata=verbose"},
		success:function(data)
		{
			var results=data.d.results;
			if(results.length>0){
			var ActiveVlaue=results[0].Active;
			var Scope= results[0].scope
			if(ActiveVlaue==true)
			{
			   if(ActiveVlaue==true && Scope=="Selective")
			   {
			   
			     var ListOfUser = results[0].ListOfUsers.results;
              if(ListOfUser != null)
                 {
	                 for (var index = 0; index < ListOfUser.length; index++)
	                 {
	                    if (ListOfUser[index].ID == _spPageContextInfo.userId)
	                    {
	                        // $(".knowledge-filter").show();
	                         $("#currentKnowledgeDept").parent().parent().siblings().show();
	                       //  $("#currentDocDept").parent().parent().siblings().show();
	                       $(".DepartmentList").parent().show();
	                       $("#"+Logged_DepartmentName).parent().show();
	                      

	                         return;
	                    }
	                    else
	                    {
	                         $("#currentKnowledgeDept").parent().parent().siblings().hide();
	                        // $("#currentDocDept").parent().parent().siblings().hide();
	                       
	                       $(".DepartmentList").parent().hide();	
	                         $("#"+Logged_DepartmentName).parent().show();                         
	                    }
	                 }
	                
                 }
			   		   
			   
			   }
			   else if(ActiveVlaue==true && Scope=="Everyone")
			   {
			     // $("knowledge-filter").show();
			     $("#currentKnowledgeDept").parent().parent().siblings().show();
		     //	$("#currentDocDept").parent().parent().siblings().show();
		        
		      $(".DepartmentList").parent().show();
		      $("#"+Logged_DepartmentName).parent().show();

			   }
			
			}
			else
			{
			
			$("#currentKnowledgeDept").parent().parent().siblings().hide();
			//$("#currentDocDept").parent().parent().siblings().hide();
			  
			  $(".DepartmentList").parent().hide();
			  $("#"+Logged_DepartmentName).parent().show();			
			}
		}	
		},
		error:function(error)
		{
			console.log("Error occured in GetEnvironmentalSettings()");
		}
	})
}
	

