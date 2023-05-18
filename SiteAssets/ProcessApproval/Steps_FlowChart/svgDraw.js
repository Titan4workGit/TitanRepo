JSRequest.EnsureSetup();
var CurrTenplateID = Number(JSRequest.QueryString['TID']);

$(document).ready(function() {
	getPersonCol(CurrTenplateID);GetAllUser();getSteps();
	 	
});
var stepIDForCondition='';
var processStepType='';
var sortedArr=[];
function getSteps(){  
$(".workflow").removeClass("hidding");
$("#initParentNode").html('');
$("#svgContainer").html('');
sortedArr=[];
//var tempId=436;		
$.ajax({
        url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getbytitle('ApprovalStepsConditions')/items?$filter=TemplateID/ID eq '"+CurrTenplateID +"' &$select=*,StepId/StepName,NextStep/StepName&$expand=StepId,NextStep",
        type: "GET",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: function (data) {
        	var choiceArray = data.d.results;
        	var option ='';
        	var className='';
        	var initCount=0;
        	var addPath='<svg id="svg1"  width="1920" height="1000">';
        	
                for (i = 0; i < choiceArray.length; i++) {
                var html='';
                	if(choiceArray[i].StepType=='Initiation' ){
                	if($("#Parent"+choiceArray[i].NextStepId).length<1){
	               		var html='<li class=""><div class="covernows" id="child'+choiceArray[i].NextStepId+'"><div class="innercontainer"> <div class="top_area"> <h5>'+choiceArray[i].NextStep.StepName+'</h5> <div class="dropdown"><input type="hidden" name="stepId" value="'+choiceArray[i].NextStepId+'"> <span class="dropdown-toggle new_eventclick" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/menu.png" style="width:17px;"></span> <div class="dropdown-menu stepOption pull-right"><a href="#adds_stepsection" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/plus.png"> New Steps</a><a href="#Connection_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/connection.png"> Connections</a><a href="#task_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/board.png"> Tasks</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/teams.png"> Planner Task</a><a href="#mail_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/email.png"> Email</a><a href="#Next_Process" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/settings.png"> Next Process</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/edit.png"> Edit</a></div> </div> </div> <div class="select_userbox'+choiceArray[i].Id+'"><h5 id="showInitiator"></h5>  <div class="menus"> <button type="button"><img src="img/email.png" alt=""></button> <button type="button"><img src="img/settings.png" alt=""></button> <button type="button"><img src="img/board.png" alt="" style="width:18px;"></button> </div> </div> </div></div><ul id="Parent'+choiceArray[i].NextStepId+'"></ul></li>'
                		$("#initParentNode").append(html);
                		$("#Parent"+choiceArray[i].NextStepId).hide();
                		getStepID(choiceArray[i].NextStepId,choiceArray[i].Id,choiceArray[i].TemplateIDId);
                		initCount++;
                	}
                		var getStep = choiceArray.filter(val => {
						    return val.StepIdId==choiceArray[i].NextStepId;
						});
						
							$.each(getStep, function (index, result) {
								if($("#Parent"+result.StepIdId).length<1){
									var html='<li style="padding: 20px 25px 0 25px;"><div class="covernows" id="child'+result.StepIdId+'"><div class="innercontainer"> <div class="top_area"> <h5>'+result.StepId.StepName+'</h5> <div class="dropdown"><input type="hidden" name="stepId" value="'+result.StepIdId+'"> <span class="dropdown-toggle new_eventclick" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/menu.png" style="width:17px;"></span> <div class="dropdown-menu stepOption pull-right"><a href="#adds_stepsection" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/plus.png"> New Steps</a><a href="#Connection_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/connection.png"> Connections</a><a href="#task_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/board.png"> Tasks</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/teams.png"> Planner Task</a><a href="#mail_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/email.png"> Email</a><a href="#Next_Process" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/settings.png"> Next Process</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/edit.png"> Edit</a></div> </div> </div> <div class="select_userbox'+result.Id+'">  <div class="menus"> <button type="button"><img src="img/email.png" alt=""></button> <button type="button"><img src="img/settings.png" alt=""></button> <button type="button"><img src="img/board.png" alt="" style="width:18px;"></button> </div> </div> </div></div><ul id="Parent'+result.StepIdId+'"></ul></li>'
		                			$("#initParentNode").show();
		                			$("#initParentNode").append(html);
                					getStepID(result.StepIdId,result.Id,result.TemplateIDId)
	                			}
							});
                	}else if(choiceArray[i].StepType=='Initiation' && choiceArray[i].StepIdId==null){
                		var getStep = choiceArray.filter(val => {
						    return val.StepIdId==choiceArray[i].NextStepId;
						});
						
						$.each(getStep, function (index, result) {
							var html='<li ><div class="covernows" id="child'+result.StepIdId+'"><div class="innercontainer"> <div class="top_area"> <h5>'+result.StepId.StepName+'</h5> <div class="dropdown"><input type="hidden" name="stepId" value="'+result.StepIdId+'"> <span class="dropdown-toggle new_eventclick" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/menu.png" style="width:17px;"></span> <div class="dropdown-menu stepOption pull-right"><a href="#adds_stepsection" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/plus.png"> New Steps</a><a href="#Connection_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/connection.png"> Connections</a><a href="#task_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/board.png"> Tasks</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/teams.png"> Planner Task</a><a href="#mail_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/email.png"> Email</a><a href="#Next_Process" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/settings.png"> Next Process</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/edit.png"> Edit</a></div> </div> </div> <div class="select_userbox'+result.Id+'">  <div class="menus"> <button type="button"><img src="img/email.png" alt=""></button> <button type="button"><img src="img/settings.png" alt=""></button> <button type="button"><img src="img/board.png" alt="" style="width:18px;"></button> </div> </div> </div></div><ul id="Parent'+result.StepIdId+'"></ul></li>'
                			$("#initParentNode").append(html);
                			getStepID(result.StepIdId,result.Id,result.TemplateIDId)
						});//getStepID(choiceArray[i].StepIdId,choiceArray[i].TemplateIDId)

                	}

                	else if(choiceArray[i].NextStepId!=null){
                		if($("#Parent"+choiceArray[i].StepIdId).length<1){
	                		var html='<li ><div class="covernows" id="child'+choiceArray[i].StepIdId+'"><div class="innercontainer"> <div class="top_area"> <h5>'+choiceArray[i].StepId.StepName+'</h5> <div class="dropdown"><input type="hidden" name="stepId" value="'+choiceArray[i].StepIdId+'"> <span class="dropdown-toggle new_eventclick" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/menu.png" style="width:17px;"></span> <div class="dropdown-menu stepOption pull-right"><a href="#adds_stepsection" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/plus.png"> New Steps</a><a href="#Connection_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/connection.png"> Connections</a><a href="#task_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/board.png"> Tasks</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/teams.png"> Planner Task</a><a href="#mail_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/email.png"> Email</a><a href="#Next_Process" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/settings.png"> Next Process</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/edit.png"> Edit</a></div> </div> </div> <div class="select_userbox'+choiceArray[i].Id+'">  <div class="menus"> <button type="button"><img src="img/email.png" alt=""></button> <button type="button"><img src="img/settings.png" alt=""></button> <button type="button"><img src="img/board.png" alt="" style="width:18px;"></button> </div> </div> </div></div><ul id="Parent'+choiceArray[i].StepIdId+'"></ul></li>'
	                		//$("#Parent"+choiceArray[i].PreviousStepId).show();
	                		$("#Parent"+choiceArray[i].NextStepId).append(html);
	                		$("#Parent"+choiceArray[i].NextStepId).show();getStepID(choiceArray[i].StepIdId,choiceArray[i].Id,choiceArray[i].TemplateIDId)
	                		$("#Parent"+choiceArray[i].StepIdId).hide();

                		}else if($("#Parent"+choiceArray[i].NextStepId).length<1){
                		var html='<li ><div class="covernows" id="child'+choiceArray[i].NextStepId+'"><div class="innercontainer"> <div class="top_area"> <h5>'+choiceArray[i].NextStep.StepName+'</h5> <div class="dropdown"><input type="hidden" name="stepId" value="'+choiceArray[i].NextStepId+'"> <span class="dropdown-toggle new_eventclick" data-toggle="dropdown"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/menu.png" style="width:17px;"></span> <div class="dropdown-menu stepOption pull-right"><a href="#adds_stepsection" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/plus.png"> New Steps</a><a href="#Connection_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/connection.png"> Connections</a><a href="#task_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/board.png"> Tasks</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/teams.png"> Planner Task</a><a href="#mail_modl" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/email.png"> Email</a><a href="#Next_Process" data-toggle="modal"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/settings.png"> Next Process</a><a href="#"><img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/Steps_FlowChart/img/edit.png"> Edit</a></div> </div> </div> <div class="select_userbox'+choiceArray[i].Id+'">  <div class="menus"> <button type="button"><img src="img/email.png" alt=""></button> <button type="button"><img src="img/settings.png" alt=""></button> <button type="button"><img src="img/board.png" alt="" style="width:18px;"></button> </div> </div> </div></div><ul id="Parent'+choiceArray[i].NextStepId+'"></ul></li>'
	                		$("#Parent"+choiceArray[i].StepIdId).show();
	                		$("#Parent"+choiceArray[i].StepIdId).append(html);
	                		$("#Parent"+choiceArray[i].NextStepId).hide();getStepID(choiceArray[i].NextStepId,choiceArray[i].Id,choiceArray[i].TemplateIDId)

                		}else{
                			//if(choiceArray[i].TriggerOn!=null && choiceArray[i].TriggerOn=="On Reject"){
                			//	addPath+='<path id="path'+choiceArray[i].Id+'" d="M224.5 204 V371 H326.5" stroke-width="1" style="fill:none;stroke: #ff0000;" marker-end="url(#arrow)"></path>'

                			//}else{
                				addPath+='<path id="path'+choiceArray[i].Id+'" d="M224.5 204 V371 H326.5" stroke-width="1" style="fill:none;" marker-end="url(#arrow)"></path>'
		                	//}
		                	sortedArr.push(choiceArray[i]);
                		}
						
					
                	}else if(choiceArray[i].Action=='Complete' ){
                	//var html='<li><div class="covernows" id="child'+choiceArray[i].StepIdId+'">End</a></div></li>'
                	//	$("#Parent"+choiceArray[i].StepIdId).append(html);

	                	if(choiceArray[i].NextStepId!=null){
	                		
		                }

                  }
                  	
                }  
                addPath+='</svg>';
                $("#svgContainer").html(addPath);
                    //if($("ul").has("li").length<= 0) {
					//	  $("ul").hide();
					//}else{$("ul").show();}
					drawFlowPath();
					
                    $(".workflow").addClass("hidding");         			
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}
function drawFlowPath(){
for (l = 0; l < sortedArr.length; l++) {
                	if(sortedArr[l].NextStepId!=null){         		 
                		if(sortedArr[l].TriggerOn!=null && sortedArr[l].TriggerOn=="On Reject"){
								$("#path"+sortedArr[l].Id).css("stroke","#ff0000")
								dicider="red";
                		}else{
		                		$("#path"+sortedArr[l].Id).css("stroke","#397eab")
		                		dicider="blue";
		                }
                		var chLeft=$("#child"+sortedArr[l].StepIdId).offset().left;
                		var chTop=$("#child"+sortedArr[l].StepIdId).offset().top;
                		var parLeft=$("#child"+sortedArr[l].NextStepId).offset().left;
                		var parTop=$("#child"+sortedArr[l].NextStepId).offset().top;var chID='';  var parID='';
                		var leftStep=$("#child" + sortedArr[l].StepIdId).children('span.left_flow').length; 
                		var	leftNext=$("#child" + sortedArr[l].NextStepId).children('span.right_flow').length;
                		var rightStep=$("#child" + sortedArr[l].StepIdId).children('span.left_flow').length; 
                		var rightNext=$("#child" + sortedArr[l].NextStepId).children('span.right_flow').length;       	
       	
						if (chLeft>parLeft) {
							if ($("#child" + sortedArr[l].StepIdId).children('span.left_flow').length == 0 && $("#child" + sortedArr[l].NextStepId).children('span.right_flow').length == 0) {
								
								$("#child" + sortedArr[l].StepIdId).append('<span class="left_flow '+dicider+'"></span>');
								$("#child" + sortedArr[l].NextStepId).append('<span class="right_flow '+dicider+'"></span><span class="arrow_right"></span>');
								chID = $("#child" + sortedArr[l].StepIdId).children('span.left_flow');
								parID = $("#child" + sortedArr[l].NextStepId).children('span.right_flow');
						
							}else if ($("#child" + sortedArr[l].StepIdId).children('span.left_flow').length == 0 && $("#child" + sortedArr[l].NextStepId).children('span.right_flow').length > 0) {
								
								
						
								$("#child" + sortedArr[l].StepIdId).append('<span class="right_flow '+dicider+'"></span>');
								$("#child" + sortedArr[l].NextStepId).append('<span class="left_flow increase_point '+dicider+'"></span><span class="arrow_left increase_point"></span>');
								chID = $("#child" + sortedArr[l].StepIdId).children('span.right_flow');
								parID = $("#child" + sortedArr[l].NextStepId).children('span.increase_point');
						
							}else if ($("#child" + sortedArr[l].StepIdId).children('span.left_flow').length > 0 && $("#child" + sortedArr[l].NextStepId).children('span.right_flow').length == 0) {
								
								$("#child" + sortedArr[l].StepIdId).append('<span class="right_flow '+dicider+'"></span>');
								$("#child" + sortedArr[l].NextStepId).append('<span class="left_flow '+dicider+'"></span><span class="arrow_left"></span>');
								chID = $("#child" + sortedArr[l].StepIdId).children('span.right_flow');
								parID = $("#child" + sortedArr[l].NextStepId).children('span.left_flow');
							
							}else if ($("#child" + sortedArr[l].StepIdId).children('span.left_flow').length > 0 && $("#child" + sortedArr[l].NextStepId).children('span.right_flow').length > 0) {
								
								$("#child" + sortedArr[l].StepIdId).append('<span class="left_flow increase_point '+dicider+'"></span>');
								$("#child" + sortedArr[l].NextStepId).append('<span class="right_flow increase_point '+dicider+'"></span><span class="arrow_right increase_point"></span>');
								chID = $("#child" + sortedArr[l].StepIdId).children('span.increase_point');
								parID = $("#child" + sortedArr[l].NextStepId).children('span.increase_point');
							}
						}else if (chLeft< parLeft) {
							if ($("#child" + sortedArr[l].StepIdId).children('span.left_flow').length == 0 && $("#child" + sortedArr[l].NextStepId).children('span.right_flow').length == 0) {
								
								$("#child" + sortedArr[l].StepIdId).append('<span class="right_flow '+dicider+'"></span>');
								$("#child" + sortedArr[l].NextStepId).append('<span class="left_flow '+dicider+'"></span><span class="arrow_left"></span>');
								chID = $("#child" + sortedArr[l].StepIdId).children('span.right_flow');
								parID = $("#child" + sortedArr[l].NextStepId).children('span.left_flow');
						
							}else if ($("#child" + sortedArr[l].StepIdId).children('span.left_flow').length == 0 && $("#child" + sortedArr[l].NextStepId).children('span.right_flow').length > 0) {
								
								
						
								$("#child" + sortedArr[l].StepIdId).append('<span class="left_flow '+dicider+'"></span>');
								$("#child" + sortedArr[l].NextStepId).append('<span class="right_flow '+dicider+'"></span><span class="arrow_right"></span>');
								chID = $("#child" + sortedArr[l].StepIdId).children('span.left_flow');
								parID = $("#child" + sortedArr[l].NextStepId).children('span.right_flow');
						
							}else if ($("#child" + sortedArr[l].StepIdId).children('span.left_flow').length > 0 && $("#child" + sortedArr[l].NextStepId).children('span.right_flow').length == 0) {
								
								$("#child" + sortedArr[l].StepIdId).append('<span class="right_flow '+dicider+'"></span>');
								$("#child" + sortedArr[l].NextStepId).append('<span class="left_flow '+dicider+'"></span><span class="arrow_left"></span>');
								chID = $("#child" + sortedArr[l].StepIdId).children('span.right_flow');
								parID = $("#child" + sortedArr[l].NextStepId).children('span.left_flow');
							
							}else if ($("#child" + sortedArr[l].StepIdId).children('span.left_flow').length > 0 && $("#child" + sortedArr[l].NextStepId).children('span.right_flow').length > 0) {
								
								$("#child" + sortedArr[l].StepIdId).append('<span class="right_flow increase_point '+dicider+'"></span>');
								$("#child" + sortedArr[l].NextStepId).append('<span class="left_flow increase_point '+dicider+'"></span><span class="arrow_left increase_point"></span>');
								chID = $("#child" + sortedArr[l].StepIdId).children('span.increase_point');
								parID = $("#child" + sortedArr[l].NextStepId).children('span.increase_point');
							}
						}else{
							$("#child"+sortedArr[l].StepIdId).append('<span class="left_flow '+dicider+'"></span>');
                			$("#child"+sortedArr[l].NextStepId).append('<span class="left_flow '+dicider+'"></span><span class="arrow_left"></span>');
                			chID=$("#child"+sortedArr[l].StepIdId).children('span.left_flow');
                			parID=$("#child"+sortedArr[l].NextStepId).children('span.left_flow'); 
						}
							console.log($("#child"+sortedArr[l].NextStepId).offset());
							console.log($("#child"+sortedArr[l].NextStepId).offset().left - $(".workflow").offset().left);

	                	 connectElements($("#svg1"), $("#path"+sortedArr[l].Id),chID, parID);
	                	 
                	}else{
                		var html='<li><a href="#" id="child'+sortedArr[l].StepIdId+'">End</a><ul id="Parent'+sortedArr[l].StepIdId+'"></ul></li>'
                		$("#Parent"+sortedArr[l].StepIdId).append(html);
                		//console.log(sortedArr[l].NextStepId);console.log(html);

                	}
                	if(l==sortedArr.length-1){
                		//	$(".covernows").css("position","relative");
                	}
				}
}

function connectElements(svg, path, start, end) {
    var svgContainer= $("#svgContainer");
    var startElem=start;
    var endElem=end;
    console.log( start.offset(), startElem.offset());

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();
    console.log( startCoord , endCoord   );

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + (startElem.outerWidth()) - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + (startElem.outerHeight()) - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + (endElem.outerWidth() - 20) - svgLeft;
    var endY = endCoord.top  + (startElem.outerHeight()) - svgTop;
    
   /*   var startX = startCoord.left + (startElem.outerWidth() -120) - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + (startElem.outerHeight() -35) - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + (endElem.outerWidth()-120) - svgLeft;
    var endY = endCoord.top  + (startElem.outerHeight() -35) - svgTop;*/

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
    console.log(startX, startY, endX, endY);

}

//helper functions, it turned out chrome doesn't support Math.sgn() 
var endYC =65;
function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));

    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.3;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
   
    
  path.attr("d",  "M"  + startX + " " + startY + " V" + (endY-endYC)+ " H" + (endX+20)+ " V" + (endY))
 
         /*             path.attr("d",  "M"  + startX + " " + startY +
                    " H"+(startX-55) +" V" + (endY-1)+
                    " H" + (endX+20))*/
                   if(endYC ==65){endYC=endYC+15;}else if(endYC >65){endYC=endYC-15;}
                    
}
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

$(function(){

    $('.new_eventclick').on('click', function(){
        //$(this).next('.optionbx').toggleClass('active');
        if($(this).siblings("input[name='stepId']").val()=='null' || $(this).siblings("input[name='stepId']").val()==''){
        	stepIDForCondition=null;
        	processStepType="Initiation";
        	$('#ddlTriggerOn option').removeAttr('selected');
        	$('#ddlTriggerOn option[value="Approve or Submit"]').attr("selected","selected");
        	$("#ddlTriggerOn").prop('disabled', false);
        }else{
        	stepIDForCondition=Number($(this).siblings("input[name='stepId']").val());
        	processStepType="Process Steps";
        	var action=$("#subtitle"+stepIDForCondition).text();
        	$('#ddlTriggerOn option').removeAttr('selected');
        	$("#ddlTriggerOn").prop('disabled', true);
        	if(action=="Edit & Approve" || action=="Review & Sign" || action=="Edit & Sign"){
        		$('#ddlTriggerOn option[value="Approve or Submit"]').attr("selected","selected");        		
        	}else{
        		$('#ddlTriggerOn option[value="On Reject"]').attr("selected","selected");
        	}
        }
    })

    $('.drgabox').draggable({
        cursor:'move'
    });
});

var ApproerSteps = [];
function getStepID(stpID,stepIdToBind,tempID)
{
	//CurrTenplateID = stpID;

	
	PrTableColumnID=[];
	InitiatorList=[];

	SavedStpApprovers = [];
	
	var siteURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ApprovalTemplateSteps')/items?$select=*,GroupName/Id,GroupName/Title,Approvers/Id,Approvers/Title,TemplateID/Id,TemplateID/TemplateName&$expand=TemplateID,Approvers,GroupName&$filter=ID eq '" + stpID+ "'&$orderby= Sequence_No asc";   
    $.ajax({  
    	url: siteURL,
        headers: {	Accept: "application/json;odata=verbose"  },  
        async: false,  
        success: function(data)
        {  
        
        	var items; 
            var results;  
            stepitem = data.d.results;        
            ApproerSteps = stepitem;
         	//  getGroupNames();
            // getPersonCol(tempID);            
            // GetTempDetails(tempID);
            if(stepitem.length > 0)
            {            
             	ViewS(stepitem,stepIdToBind);
             	SavedstpCount = stepitem.length;
            } 
            			
       	},  
        error: function(data) 
        {  
        	console.log("An error occurred. Please try again.");  
        }  
    });
}
	
function ViewS(ApproerSteps,stepIdToBind){
var StepDiv = '';
$('.stepbox').empty();
StpApprovers = [];

for(k=0;k<ApproerSteps.length;k++){
var m=k+1;var actionReq='';
if(ApproerSteps[k].ActionRequired=="Edit Data"){actionReq="Edit & Approve";}else{actionReq=ApproerSteps[k].ActionRequired;}
 StepDiv +=	'<h5 class="subtitle" id="subtitle'+ApproerSteps[k].Id+'">'+actionReq+'</h5>'
 StepDiv +=	'<div class="row">';
if(ApproerSteps[k].ApproverType == "Role Based"  || ApproerSteps[k].ApproverType == 'Role' ){
	if(ApproerSteps[k].ApproversId != null ){
	  var Approvers = ApproerSteps[k].ApproversId.results;
//	  StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
	}
 StepDiv +=	'<div class="flexitem col-md-12 col-sm-6 col-xs-12 user_cover"><div class="user_img">'
 StepDiv +=	'<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="user_detail">'
 StepDiv +=	'<h4>'+ApproerSteps[k].ApproverRole+'</h4>'
 StepDiv +=	'</div></div>'
}
else if(ApproerSteps[k].ApproverType == "Group"){
	if(ApproerSteps[k].ApproversId != null ){
	  var Approvers = ApproerSteps[k].ApproversId.results;
//	  StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
	}
 StepDiv +=	'<div class="flexitem col-md-12 col-sm-6 col-xs-12 user_cover"><div class="user_img">'
 StepDiv +=	'<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="user_detail">'
 StepDiv +=	'<h4>'+ApproerSteps[k].GroupName.Title+'</h4>'
 StepDiv +=	'</div></div>'
}else if(ApproerSteps[k].ApproverType == "Field"){
			var result = arrPerson.filter(obj => {
				return obj.ColumnName === ApproerSteps[k].ColumnName;
			});console.log(result);
	if(ApproerSteps[k].ApproversId != null ){
	  var Approvers = ApproerSteps[k].ApproversId.results;
//	  StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
	}
 StepDiv +=	'<div class="flexitem col-md-12 col-sm-6 col-xs-12 user_cover"><div class="user_img">'
 StepDiv +=	'<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="user_detail">'
 StepDiv +=	'<h4>Column Value of '+result[0].ColumnTitle+'</h4>'
 StepDiv +=	'</div></div>'
}else if(ApproerSteps[k].ApproverType == "Runtime"){
	if(ApproerSteps[k].ApproversId != null ){
	  var Approvers = ApproerSteps[k].ApproversId.results;
//	  StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
	}
 StepDiv +=	'<div class="flexitem col-md-12 col-sm-6 col-xs-12 user_cover"><div class="user_img">'
 StepDiv +=	'<img src="https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/ProcessApproval/assets/images/user-circle.png" alt="" data-themekey="#">'
 StepDiv +=	'</div>'
 StepDiv +=	'<div class="user_detail">'
 StepDiv +=	'<h4>'+ApproerSteps[k].ApproverDecidingStep+'</h4>'
 StepDiv +=	'</div></div>'
}

else{
if(ApproerSteps[k].ApproversId != null ){
	 var Approvers = ApproerSteps[k].ApproversId.results;
	//    StpApprovers.push({'StName': ApproerSteps[i].StepName, 'Type': ApproerSteps[i].ApproverType, 'StRole': ApproerSteps[i].ApproverRole, 'StUser': Approvers , 'UsrID': Approvers});
     }
   if(Approvers.length>=2){StepDiv +='<div class="col-md-12"> <div class="user_cover">'}
   for(j=0;j<Approvers.length;j++){
   	var arrSubApprover = AllEmployee.filter(function (filterData) {
	     return filterData.UserId == Approvers[j];
	 });
	 
	var Authorattachment = '';
	if(Approvers.length<=2 && arrSubApprover.length>0)
	{
		Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + arrSubApprover[0].EMail;
		StepDiv +='<div class="col-md-6"> <div class="user_cover"> <div class="user_img"> <img title="' + arrSubApprover[0].LoginName + '" src="' + Authorattachment + '" alt="" data-themekey="#"> </div> <div class="user_detail"> <h6>' + arrSubApprover[0].LoginName + '</h6> <a href="#">' + arrSubApprover[0].EMail + '</a> </div> </div> </div>';
	}else if(Approvers.length>2 && arrSubApprover.length>0)
	{
		Authorattachment = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + arrSubApprover[0].EMail;
		StepDiv +='<div class="user_img"> <img title="' + arrSubApprover[0].LoginName + '" src="' + Authorattachment + '" alt="" data-themekey="#"> </div>';
	}
	
    
   }if(Approvers.length>=2){StepDiv +='</div> </div>'}
}
StepDiv +=	 '<div class="menus"><button type="button"><img src="img/email.png" alt=""></button><button type="button"><img src="img/settings.png" alt=""></button><button type="button"><img src="img/board.png" alt="" style="width:18px;"></button></div></div>';//return false;
}
$(".select_userbox"+stepIdToBind).html(StepDiv);
}

