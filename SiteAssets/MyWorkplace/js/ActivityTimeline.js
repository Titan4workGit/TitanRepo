var G_Department = '';
var G_Category = '';
$(document).ready(function(){
  	(function(){		
		//var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl")+"/_api/web/Lists/GetByTitle('Activity')/Items?$orderby= Created desc&$filter=Department eq '"+Logged_DepartmentName+"' and Active eq 1 and ApprovalStatus eq 'Approved'&$orderby=Modified desc&$top=10";
		var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl")+"/_api/web/Lists/GetByTitle('Activity')/Items?$filter=DepartmentID eq '"+Logged_DepartmentId+"' and Active eq 1 and ApprovalStatus eq 'Approved'&$orderby=Modified desc&$top=10";
		//G_Department = Logged_DepartmentName;
		G_Department = Logged_DepartmentId;
		G_Category = "All";
		ExecuteFilter(Ownurl);
	})();	

	BindDepartmentinfilterMenu();
	
	//$("#"+Logged_DepartmentName).css('background-color', HeaderTextColor).css('color',MediatextColor);	
	//$("#F_All").css('background-color', HeaderTextColor).css('color',MediatextColor);	  
});

function BindDepartmentinfilterMenu()
{
	var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?select=*,ID,Title&$filter=CompanyID eq '"+titanForWork.getQueryStringParameter('CompanyId')+"' &$orderby= Title asc";
    $.ajax({  
		url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
        	var items = data.d.results;  
            if (items.length > 0) 
			{  	
				var HtmlDesign='';			
				for (i = 0; i < items.length; i++) 
				{
   					HtmlDesign = HtmlDesign + "<a href='#' class='DepartmentList' onclick='GetDepartment("+items[i].ID+")' id='"+items[i].ID+"'><span>"+items[i].Title+"</span></a>";
   				}
   				
   				$('.timeline-filter').append(HtmlDesign);
            }
            $('.timeline-filter').owlCarousel({
		        speed:500,
		        margin:5,
		        autoWidth:true,
		        slideBy: 20,
				nav:true,
				dots:false,
				responsive:{
					0:{ items:1 },
					600:{ items:3 },
					1000:{ items:3 }
				}
			})
        },
		error: function (data) 
		{  
			console.log(data);		
		}  
    });  
}


function GetCategotyValues(ID)
{
	G_Category = $("#"+ID).text();
	$(".CategotyValues").removeAttr('style');

	GenerateQuery();	
	$("#"+ID).css('background-color', HeaderTextColor).css('color',MediatextColor);

}


function GetDepartment(ID)
{
	//G_Department = $("#"+ID).text();	
	G_Department = ID;	
	$(".DepartmentList").removeAttr('style');

	GenerateQuery();
	$("#"+ID).css('background-color', HeaderTextColor).css('color',MediatextColor);
}


function GenerateQuery()
{
	if(G_Category == "All")
	{
		var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl")+"/_api/web/Lists/GetByTitle('Activity')/Items?$orderby= Created desc&$filter=DepartmentID eq '"+G_Department+"' and Active eq 1 and ApprovalStatus eq 'Approved'&$orderby=Modified desc&$top=10";
		ExecuteFilter(Ownurl);	
   	}
   	else
   	{
   		var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl")+"/_api/web/Lists/GetByTitle('Activity')/Items?$orderby= Created desc&$filter=DepartmentID eq '"+G_Department+"' and ActivityType eq '"+G_Category+"' and ApprovalStatus eq 'Approved'&$orderby=Modified desc&$top=10";
   		ExecuteFilter(Ownurl);   	
   	}
}


function formatDateEvent(d) 
{
	var date = new Date(d);
	if ( isNaN( date .getTime())){ return d; }
    else{
         var month = new Array();
         month[0] = "Jan";
         month[1] = "Feb";
         month[2] = "Mar";
         month[3] = "Apr";
         month[4] = "May";
         month[5] = "Jun";
         month[6] = "Jul";
         month[7] = "Aug";
         month[8] = "Sept";
         month[9] = "Oct";
         month[10] = "Nov";
         month[11] = "Dec";
         day = date.getDate();
         if(day < 10){day = "0"+day; }
         return    day  + " " +month[date.getMonth()] +" "+date.getFullYear();
         }
}


var Ownurl = "";
function ExecuteFilter(_query)
{
	response = [];
	Ownurl= _query;
	ReadTimeLine();
}

function removetag(HTMLWithTags)
{
	var txtHTML = HTMLWithTags;
	var t1 = stripHtml(txtHTML);
	return t1;	
}

function stripHtml(html)
{
	let tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
}


var response = response || []; 
function ReadTimeLine()
{  
    $.ajax({  
    url: Ownurl,  
        headers: { Accept: "application/json;odata=verbose" },  
        async:false,  
        success: function (data) 
        { 
        	response = response.concat(data.d.results);
            $("#ActivityTimeLine").html('');
			$("#ActivityTimeLine").empty(); 
			HTMLDESIGN='';
            if (response.length > 0) 
			{  	
				var x=0;
            	for(x; x<response.length; x++)
            	{
            		var ID = response[x].ID;
					var Title = response[x].Title;
					var Category = response[x].CategoryType;
					//add3Dots(location , 10);
					var TextDescription = removetag(response[x].Suggestions);
					if(TextDescription.length > 250)
					{
						var Description = add3Dots(TextDescription, 250);
					}
					else{
						var Description = TextDescription;
					}
					var Postdate = formatDateEvent(response[x].Created);
					var Department = response[x].Department;
					var ViewAll = _spPageContextInfo.webAbsoluteUrl+"/Pages/ViewSuggestions.aspx?WebAppId=2&Type="+window.btoa(Category)+"&Department="+window.btoa(Department)+"&sourcelocation=../Pages/Myworkplace.aspx";

					AvtivityTimeLineDesign(ID,Title,Category,Description,Postdate,Department,ViewAll);       		            		
            	}
            	$("#ActivityTimeLine").append(HTMLDESIGN);    
            	
            	
            	if(MediatextColor!=null && HeaderTextColor!=null)
	    	 	{
	    	 	 	$('.panel-heading-bg-txt-clr').each(function() {                 //For Theame
                    this.style.setProperty('color', MediatextColor, 'important');
                    });
               
                  $('#DeltaPlaceHolderMain .panel-heading-bg-txt-clr').each(function() {    // For Theame
                  this.style.setProperty('background', HeaderTextColor, 'important');
                  });
             
                  /*    $('.fa-chevron-circle-right').each(function() {                           // For Theame
                    this.style.setProperty('color', HeaderTextColor, 'important');
                    });*/
                }
            	
             	 		
           	}
	         	 			
  			if (data.d.__next) 
           	{
            	Ownurl= data.d.__next;
            	
            	$(".timeline-extend").removeAttr("style")
            	$(".timeline-extend").css("display", "block");
            }
            else
            {
            	$(".timeline-extend").css("visibility", "hidden")
            }  	 
        },
		error: function (data) 
		{  
        	console.log(data);
		}  
    });  
}


var HTMLDESIGN='';
function AvtivityTimeLineDesign(ID,Title,Category,Description,Postdate,Department,ViewAll)
{
	HTMLDESIGN=HTMLDESIGN+"<div class='col-md-12 p0'>"+    
		"<div class='panel panel-default panel-mb10'>"+
			"<div class='panel-heading panel-heading-suggestion'><span class='suggestion-head-text panel-heading-bg-txt-clr'>"+Category+"</span></div>"+
        		"<div class='panel-body panel-body-suggestion'>"+
          			"<p class='suggestion-title'>"+Title+"</p>"+
          			"<p>"+Description+"</p>"+
					"<div class='col-sm-12 col-xs-12 pl0 pr0 pb5'>"+
						"<a href='#' class='suggestion-button' data-toggle='modal' data-target='#ActivityTimeLineModel' onclick='ActivityDetailinmodel("+ID+");'>Details</a>"+
					"</div>"+
          			"<ul class='list-inline list-unstyled'>"+
            			"<li class='pull-right date-time-card'><span>"+Postdate+"</span> | <span> "+Department+" </span></li>"+
            			"<li><a href="+ViewAll+" class='view my_view_arrow_w'><i class='fa fa-chevron-circle-right'></i></a></li>"+
          			"</ul>"+
        		"</div>"+
      		"</div>"+
    "</div>";   
}

function ActivityDetailinmodel(ItemID)
{
    var Ownurl = titanForWork.getQueryStringParameter("CompanySiteUrl")+"/_api/web/lists/getbytitle('Activity')/items?$filter=ID eq ('"+ ItemID +"')&$expand=AttachmentFiles";  
    $.ajax({  
  	url: Ownurl,  
    headers: { Accept: "application/json;odata=verbose" },  
    async:false,  
    success: function (data)
    {  
    	var items = data.d.results;  
        if (items.length > 0) 
		{  
			$('#_TextTitle').text(items[0].Title);
   			$('#_DtlDescription').html(items[0].Suggestions);
			$('#_ModelHeading').text(items[0].CategoryType);
			$('#textDepartment').text(items[0].Department);
			$('#textdate').text(formatDateEvent(items[0].Created));			
			var totalAttachments = items[0].AttachmentFiles.results.length;
			$("#_AttachDocument").empty();
			if(totalAttachments>0)
			{
            	var itemHTML = ''//"<a>";
            	for(var x=0; x<totalAttachments;x++)
            	{            
    				$("#_AttachDocument").append('<a onclick="priviewfile(this);" href="javascript:void(0)" data-filename="' + items[0].AttachmentFiles.results[x].FileName +'" data-fileUrl="' + items[0].AttachmentFiles.results[x].ServerRelativeUrl +'" name=' + items[0].AttachmentFiles.results[x].ServerRelativeUrl + '> ' + items[0].AttachmentFiles.results[x].FileName + '<i class="fa fa-eye"></i></a>');

    				//itemHTML += "<th scope=\"row\"><i class='fa fa-paperclip' style='color:red'></i><a href='" + items[0].AttachmentFiles.results[x].ServerRelativeUrl + "'>   " + items[0].AttachmentFiles.results[x].FileName + "</a></th>";
    				//itemHTML += '<a onclick="priviewfile(this);" href="javascript:void(0)" name='+ items[0].AttachmentFiles.results[x].ServerRelativeUrl +'>'+ items[0].AttachmentFiles.results[x].FileName+'<i class="fa fa-eye"></i></a>'
    				itemHTML += "</a>";
   				}
   				//$("#_AttachDocument").append(itemHTML);
   			}				
		}  
	},
	error: function (data) 
	{  
   		alert("An error occurred. Please try again.");  
	}  
    });  
}

function priviewfile(Action) {
    src = Action.name + "?web=1";
    var iframeUrl1 ="";
    var docExt = Action.dataset.filename.split('.').pop();
    //_spPageContextInfo.webAbsoluteUrl +
    if (docExt == 'doc' || docExt == 'docx' || docExt == 'xls' || docExt == 'xlsx' || docExt == 'ppt' || docExt == 'pptx' || docExt == 'pdf' ) {
           iframeUrl1 = _spPageContextInfo.webAbsoluteUrl +'/TITAN/_layouts/15/WopiFrame.aspx?sourcedoc=' +  Action.dataset.fileurl.split('TITAN')[1].substring(1); + '&action=interactivepreview';
       }else
       {
       iframeUrl1= Action.dataset.fileurl;
       }
       $("#DownloadDocs").prop("href", window.location.origin + Action.dataset.fileurl);
    if (Action.name == null) {
        src = Action.title + "?web=1";
        iframeUrl1= Action.title + "?web=1";

    }
    var container = $("#doc-viewer").empty();
    $('<iframe>', {
        src: iframeUrl1,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");
    
        setTimeout(function () {
    if ($('#iframe-viewer').contents().find('body').html() == "") {
     $("#doc-viewer").empty();
    var htmlse = '<div class="col-md-12">' +
                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                '<span><h2 class="text-center">No preview available. File has been downloaded.</h2></span>';
            $('#doc-viewer').append('<div width="100%" id="viewMyDocuments" style="padding-top:0px">' + htmlse + '</div>');

    }
    }, 1000);

}


function add3Dots(string, limit)
{
  	var dots = " ...";
  	if(string.length > limit)
  	{
  		string = string.substring(0,limit) + dots;  // you can also use substr instead of substring
  	}
    return string;
} 


$( window ).load(function() {
	$("#"+Logged_DepartmentName).css('background-color', HeaderTextColor).css('color',MediatextColor);	
	$("#F_All").css('background-color', HeaderTextColor).css('color',MediatextColor);
});
