var a8_0x2c964d=a8_0x3aa5;(function(_0x528cfd,_0x5e0f0c){var _0x5a7af3=a8_0x3aa5,_0x17a89b=_0x528cfd();while(!![]){try{var _0x1bebce=parseInt(_0x5a7af3(0xa4))/0x1+-parseInt(_0x5a7af3(0x13a))/0x2*(parseInt(_0x5a7af3(0x148))/0x3)+-parseInt(_0x5a7af3(0x173))/0x4*(parseInt(_0x5a7af3(0xb8))/0x5)+parseInt(_0x5a7af3(0x8d))/0x6+-parseInt(_0x5a7af3(0xb0))/0x7*(parseInt(_0x5a7af3(0x116))/0x8)+parseInt(_0x5a7af3(0x93))/0x9+-parseInt(_0x5a7af3(0x11d))/0xa;if(_0x1bebce===_0x5e0f0c)break;else _0x17a89b['push'](_0x17a89b['shift']());}catch(_0x5d4a5c){_0x17a89b['push'](_0x17a89b['shift']());}}}(a8_0x4e9c,0x5e5d6));var IsdeptAdmin=![],IsProjectAdmin=![],Location=window[a8_0x2c964d(0x108)][a8_0x2c964d(0x16d)]+'//'+window[a8_0x2c964d(0x108)]['host']+_spPageContextInfo[a8_0x2c964d(0xd4)],today=new Date(),CurrentDate=today['toISOString']()[a8_0x2c964d(0x16f)](0x0,0xa),filterArr=[],txtCompanyId=Logged_CompanyId,sorterTableMyProjectList,currentDlg='',clientContext='',PrjectgridInitiated=![],member=![];$(document)[a8_0x2c964d(0x8e)](function(){var _0x2e5e86=a8_0x2c964d,_0x5c9f8d='?$expand=ProgramID,Department_ID,ClientID,ManagerName,Office_Location_Id&$select=*,ProgramID/Title,ProgramID/Id,ManagerName/Title,ManagerName/EMail,ManagerName/Id,ClientID/Title,ClientID/Id,Department_ID/Title,Department_ID/Id,Office_Location_Id/Id,Office_Location_Id/Title&$top=5000';debugger;getItemsWithQueryItem(_0x5c9f8d),nextItem(),getProjectRights(),bindEvent(),getProjectByGroup(projectListItemArr),getRight(IsProjectAdmin),initializePeoplePicker(_0x2e5e86(0x142)),SP[_0x2e5e86(0x115)][_0x2e5e86(0x153)](getCurrentURL_GetProjectGridEvent,_0x2e5e86(0x17c)),getCustomer(),getPrograms(),getLocation(),ChangeLabels(),filter(),$(_0x2e5e86(0xc5))[_0x2e5e86(0xf4)](function(){var _0xa1afc3=_0x2e5e86,_0x3325db=_spPageContextInfo[_0xa1afc3(0x145)],_0x149da8=_0x3325db+'/Pages/ProjectDetails.aspx?WebAppId='+Logged_CompanyId;location[_0xa1afc3(0xd7)]=_0x149da8;}),$(_0x2e5e86(0x13d))[_0x2e5e86(0xf4)](function(){projectListItemArr['sort'](function(_0x2905df,_0x4f7df8){var _0x5752f8=a8_0x3aa5,_0x381c69=new Date(_0x2905df[_0x5752f8(0x14c)]),_0x1ff533=new Date(_0x4f7df8[_0x5752f8(0x14c)]);if(_0x1ff533<_0x381c69)return-0x1;if(_0x1ff533>_0x381c69)return 0x1;return 0x0;}),BindProjectGrid();});});var projectListItemArr=[];function getItemsWithQueryItem(_0x374cc3){var _0xa098dd=a8_0x2c964d,_0x232fbf=_0xa098dd(0xcb);return DeferredObj=$[_0xa098dd(0x134)](),$[_0xa098dd(0x177)]({'url':_spPageContextInfo[_0xa098dd(0x101)]+_0xa098dd(0xcc)+_0x232fbf+_0xa098dd(0x90)+_0x374cc3,'type':_0xa098dd(0xef),'async':![],'headers':{'ACCEPT':_0xa098dd(0x104),'X-RequestDigest':$('#__REQUESTDIGEST')['val']()},'beforeSend':function(){var _0x285793=_0xa098dd;$(_0x285793(0x89))[_0x285793(0xb6)]();},'success':function(_0x353094){var _0x46ab56=_0xa098dd,_0x94861=_0x353094['d'][_0x46ab56(0x159)];_0x94861[_0x46ab56(0xcf)](function(_0x4c0330,_0x2631c9){var _0x23ea45=_0x46ab56,_0x40e704=new Date(_0x4c0330[_0x23ea45(0x14c)]),_0x5f2ef6=new Date(_0x2631c9[_0x23ea45(0x14c)]);if(_0x5f2ef6<_0x40e704)return-0x1;if(_0x5f2ef6>_0x40e704)return 0x1;return 0x0;});for(var _0xc53d29=0x0;_0xc53d29<_0x94861[_0x46ab56(0xd3)];_0xc53d29++){var _0x2cabe7=_0x94861[_0xc53d29][_0x46ab56(0xc1)],_0xc0224c=_0x94861[_0xc53d29]['ProjectCode'];(_0xc0224c==null||_0xc0224c==''||_0xc0224c==undefined)&&(_0xc0224c='');var _0x532ddb=_0x94861[_0xc53d29][_0x46ab56(0x123)];_0x532ddb==null&&(_0x532ddb='');var _0x41670e=_0x94861[_0xc53d29]['ClientID'][_0x46ab56(0x14f)];(_0x41670e==null||_0x41670e==''||_0x41670e==undefined)&&(_0x41670e='');var _0x4d3423=_0x94861[_0xc53d29][_0x46ab56(0xfd)][_0x46ab56(0x14f)];(_0x4d3423==null||_0x4d3423==''||_0x4d3423==undefined)&&(_0x4d3423='');var _0x497462=_0x94861[_0xc53d29][_0x46ab56(0x129)][_0x46ab56(0x14f)],_0x204433=_0x94861[_0xc53d29]['Office_Location_Id']['Id'];(_0x497462==null||_0x497462==''||_0x497462==undefined||_0x497462==_0x46ab56(0x151))&&(_0x497462='');var _0xec0fa2=_0x94861[_0xc53d29][_0x46ab56(0x158)],_0x131d2e=_0x94861[_0xc53d29][_0x46ab56(0xbb)];_0x131d2e!=''&&_0x131d2e!=null?(_0x131d2e=new Date(_0x131d2e),_0x131d2e=$[_0x46ab56(0xad)][_0x46ab56(0x10e)](_0x46ab56(0x12b),_0x131d2e)):_0x131d2e='';var _0x15eaa7=_0x94861[_0xc53d29][_0x46ab56(0xc0)];_0x15eaa7!=''&&_0x15eaa7!=null?(_0x15eaa7=new Date(_0x15eaa7),_0x15eaa7=$[_0x46ab56(0xad)][_0x46ab56(0x10e)](_0x46ab56(0x12b),_0x15eaa7)):_0x15eaa7='';var _0xabfa40=new Date(_0x94861[_0xc53d29]['PlanedStartDate']);_0xabfa40=$[_0x46ab56(0xad)][_0x46ab56(0x10e)](_0x46ab56(0x12b),_0xabfa40);var _0x55904c=new Date(_0x94861[_0xc53d29][_0x46ab56(0x16a)]);_0x55904c=$[_0x46ab56(0xad)][_0x46ab56(0x10e)](_0x46ab56(0x12b),_0x55904c);var _0x4058d5=_0x94861[_0xc53d29]['ManagerName'],_0x21e3e8=_0x94861[_0xc53d29][_0x46ab56(0xb3)]['Title'],_0x39f88a=_0x94861[_0xc53d29][_0x46ab56(0xb3)]['Id'],_0x5afe65=_0x94861[_0xc53d29]['TechnologyUsed'],_0x752ab8=_0x94861[_0xc53d29][_0x46ab56(0xbe)],_0x38792c=_0x94861[_0xc53d29]['CompletionPercentage'],_0x5afe65=_0x94861[_0xc53d29][_0x46ab56(0xaa)];if(_0x5afe65==null)_0x5afe65='';var _0x35a6b9=_0x94861[_0xc53d29][_0x46ab56(0x141)]['Title'],_0xc0224c=_0x94861[_0xc53d29][_0x46ab56(0xe2)];_0xc0224c==null&&(_0xc0224c='');(_0x35a6b9==null||_0x35a6b9==''||_0x35a6b9==undefined||_0x35a6b9==_0x46ab56(0x151))&&(_0x35a6b9='');var _0x1fd1f1=_0x94861[_0xc53d29]['ID'],_0x48fe52=_0x94861[_0xc53d29][_0x46ab56(0xb3)][_0x46ab56(0xf6)],_0x13852f=_spPageContextInfo[_0x46ab56(0x101)]+_0x46ab56(0xa5)+escapeProperly(_0x48fe52),_0x3651e7=_0x94861[_0xc53d29][_0x46ab56(0x141)]['Id'],_0x10fa8a=_0x94861[_0xc53d29][_0x46ab56(0xfd)]['Id'],_0x1c0afe=_0x94861[_0xc53d29][_0x46ab56(0x14c)];_0x10fa8a==null&&(_0x10fa8a='');var _0x1fa63f=_0x94861[_0xc53d29]['ClientID']['Id'],_0x142380=_0x94861[_0xc53d29][_0x46ab56(0x140)];projectListItemArr['push']({'ProjectName':_0x2cabe7,'PlanedEndDate1':_0x94861[_0xc53d29][_0x46ab56(0x16a)],'ProjectCode':_0xc0224c,'Modified':_0x1c0afe,'ProjectDescription':_0x532ddb,'ClientName':_0x41670e,'ProgramName':_0x4d3423,'TechnologyUsed':_0x5afe65,'OfficeLocation':_0x497462,'ActualStartDate':_0x131d2e,'ActualEndDate':_0x15eaa7,'ActualEndDate1':_0x94861[_0xc53d29][_0x46ab56(0xc0)],'PlanedStartDate':_0xabfa40,'PlanedEndDate':_0x55904c,'ManagerName':_0x21e3e8,'ManagerId':_0x39f88a,'OfficeLocationId':_0x204433,'Status':_0x752ab8,'Percentage':_0x38792c,'DepartmentName':_0x35a6b9,'ProjectCode':_0xc0224c,'ItemID':_0x1fd1f1,'ManagerEMail':_0x48fe52,'employeePicURL':_0x13852f,'Department_ID':_0x3651e7,'ProgramID':_0x10fa8a,'ClientID':_0x1fa63f,'CompanyId':_0x142380});}NextURL=_0x353094['d'][_0x46ab56(0x126)],DeferredObj[_0x46ab56(0x10a)](_0x353094['d']);},'error':function(_0x438c89){var _0x417017=_0xa098dd;DeferredObj[_0x417017(0x111)](_0x438c89);}}),DeferredObj[_0xa098dd(0x85)]();};function nextItem(){var _0x16cee8=a8_0x2c964d;if(NextURL!=null){var _0x24c526='?'+NextURL['split']('?')[0x1];if(_0x24c526[_0x16cee8(0x147)]('5000')==!![]){}getItemsWithQueryItem(_0x24c526);}}function getProjectRights(){var _0x593602=a8_0x2c964d,_0x9939c7=$[_0x593602(0x134)](),_0x3aa759,_0xcec65f=_0x593602(0x16c),_0x4326cb=titanForWork[_0x593602(0x16b)]('CompanyId'),_0x2420b7=_spPageContextInfo[_0x593602(0x101)]+_0x593602(0xcc)+_0xcec65f+_0x593602(0xe8)+Logged_CompanyId+_0x593602(0x10f)+_spPageContextInfo['userId']+_0x593602(0xa9);return $['ajax']({'url':_0x2420b7,'headers':{'Accept':_0x593602(0x104)},'async':![],'success':function(_0x4e45db){var _0x4a9951=_0x593602,_0x4a90dd=_0x4e45db['d'][_0x4a9951(0x159)];_0x4a90dd[_0x4a9951(0xd3)]>0x0?($(_0x4a9951(0xc5))[_0x4a9951(0xe3)](),$(_0x4a9951(0xf8))[_0x4a9951(0xe3)](),$('#btnCreateProgram')[_0x4a9951(0xe3)](),_0x9939c7[_0x4a9951(0x10a)](!![]),$(_0x4a9951(0x9a))[_0x4a9951(0x7e)](!![]),IsProjectAdmin=!![]):(IsDepartmentAdmin(),IsdeptAdmin==!![]?($('#btnViewProgram')['show'](),$(_0x4a9951(0x157))[_0x4a9951(0xe0)](),$('#CreateProject')['show']()):(member=!![],$(_0x4a9951(0x157))['hide']()),$(_0x4a9951(0x9a))[_0x4a9951(0x7e)](![]),_0x9939c7[_0x4a9951(0x10a)](![]),IsProjectAdmin=![]);},'eror':function(_0x13eeaa){var _0x589d66=_0x593602;console[_0x589d66(0xda)]($(_0x589d66(0xc4))[_0x589d66(0x7e)]());}}),_0x9939c7['promise']();}function IsDepartmentAdmin(){var _0x149e7f=a8_0x2c964d,_0x4bc167=Logged_DepartmentId,_0x18e333=_0x149e7f(0x16c),_0x34177a=_spPageContextInfo[_0x149e7f(0x101)]+_0x149e7f(0xcc)+_0x18e333+_0x149e7f(0x12c)+Logged_CompanyId+_0x149e7f(0x10f)+_spPageContextInfo[_0x149e7f(0xc6)]+_0x149e7f(0xfb)+_0x4bc167+_0x149e7f(0xdd);return $[_0x149e7f(0x177)]({'url':_0x34177a,'type':_0x149e7f(0xe5),'headers':{'Accept':_0x149e7f(0x104)},'async':![],'success':function(_0x356598){var _0x5777c0=_0x149e7f,_0x5b45d7=_0x356598['d']['results'];_0x5b45d7[_0x5777c0(0xd3)]>0x0?(IsdeptAdmin=!![],$(_0x5777c0(0xc5))[_0x5777c0(0xe3)]()):(IsdeptAdmin=![],$('#CreateProject')['hide']());},'error':function(_0x115641){var _0xf9b9bb=_0x149e7f;console[_0xf9b9bb(0xda)](_0x115641[_0xf9b9bb(0x103)]);}}),IsdeptAdmin;}var liveCheck=!![];function a8_0x3aa5(_0x29b3da,_0x1938ec){var _0x4e9cd4=a8_0x4e9c();return a8_0x3aa5=function(_0x3aa563,_0x2061e9){_0x3aa563=_0x3aa563-0x7d;var _0x21e75b=_0x4e9cd4[_0x3aa563];return _0x21e75b;},a8_0x3aa5(_0x29b3da,_0x1938ec);}function BindProjectGrid(){var _0x174781=a8_0x2c964d,_0xa535dc=Logged_DepartmentId,_0x545180='',_0x358dd3=0x0;debugger;var _0x16f1d9=projectListItemArr,_0x487b9c='';liveCheck==!![]&&(projectListItemArr=projectListItemArr['filter'](function(_0x9c1009){var _0x329442=a8_0x3aa5;return _0x9c1009[_0x329442(0xbe)]==_0x329442(0xf5);}));if(projectListItemArr[_0x174781(0xd3)]>0x0)for(var _0x3fa6dd=0x0;_0x3fa6dd<projectListItemArr[_0x174781(0xd3)];_0x3fa6dd++){_0x358dd3++;var _0x5d2ba8=projectListItemArr[_0x3fa6dd]['Status'];_0x487b9c+=_0x174781(0xe7),_0x487b9c+=_0x174781(0x161)+Location+'/Pages/ViewProjectDetails.aspx?WebAppId='+Logged_CompanyId+_0x174781(0x118)+projectListItemArr[_0x3fa6dd][_0x174781(0xa7)]+_0x174781(0x88)+projectListItemArr[_0x3fa6dd][_0x174781(0xc1)]+_0x174781(0xd9)+projectListItemArr[_0x3fa6dd][_0x174781(0xc1)]+_0x174781(0x133),_0x487b9c+=_0x174781(0x99),_0x487b9c+='<label\x20class=\x22lable-view-name\x22\x20data-localize=\x22Reference\x22>Reference:</label>',_0x487b9c+=_0x174781(0x14b)+projectListItemArr[_0x3fa6dd][_0x174781(0xe2)]+_0x174781(0xae),_0x487b9c+=_0x174781(0xae),_0x487b9c+=_0x174781(0x99),_0x487b9c+=_0x174781(0x15a),_0x487b9c+='<div\x20class=\x22ref\x22>'+projectListItemArr[_0x3fa6dd][_0x174781(0xb5)]+_0x174781(0xae),_0x487b9c+='</div>',_0x487b9c+=_0x174781(0x8b),_0x487b9c+=_0x174781(0x16e),_0x487b9c+=_0x174781(0xa8)+projectListItemArr[_0x3fa6dd]['ClientName']+'</div>',_0x487b9c+=_0x174781(0x99),_0x487b9c+=_0x174781(0x139),_0x487b9c+=_0x174781(0x14b)+projectListItemArr[_0x3fa6dd][_0x174781(0x178)]+'</div>',_0x487b9c+='</div>',_0x487b9c+=_0x174781(0x99),_0x487b9c+=_0x174781(0xc9),_0x487b9c+=_0x174781(0x14b)+projectListItemArr[_0x3fa6dd][_0x174781(0xf2)]+_0x174781(0xae),_0x487b9c+=_0x174781(0xae),_0x487b9c+=_0x174781(0x8b),_0x487b9c+=_0x174781(0x16e),_0x487b9c+=_0x174781(0xb4),_0x487b9c+=_0x174781(0xbf),_0x487b9c+=_0x174781(0x15b)+projectListItemArr[_0x3fa6dd][_0x174781(0x11c)]+_0x174781(0x15f),_0x487b9c+=_0x174781(0xae),_0x487b9c+=_0x174781(0xfc),_0x487b9c+=_0x174781(0xfa),_0x487b9c+=_0x174781(0xb2)+projectListItemArr[_0x3fa6dd]['ManagerName']+_0x174781(0x11a),_0x487b9c+=_0x174781(0x146)+projectListItemArr[_0x3fa6dd][_0x174781(0x86)]+'</p>',_0x487b9c+=_0x174781(0xae),_0x487b9c+=_0x174781(0xae),_0x487b9c+='</div>',_0x487b9c+='</td>',_0x487b9c+=_0x174781(0x119);var _0x642e0=new Date(projectListItemArr[_0x3fa6dd][_0x174781(0xa2)][_0x174781(0x16f)](0x0,0xa)),_0x1f41d9=new Date();_0x1f41d9[_0x174781(0x8c)](_0x1f41d9[_0x174781(0xc2)]()-0x1),_0x642e0=_0x642e0[_0x174781(0xd8)]('yyyy/MM/dd');var _0x599dd7=new Date(_0x1f41d9);_0x599dd7=_0x599dd7[_0x174781(0xd8)](_0x174781(0x80)),_0x5d2ba8==_0x174781(0xf5)&&(_0x487b9c+=_0x174781(0xc8),projectListItemArr[_0x3fa6dd][_0x174781(0x87)]>=0x64?(_0x487b9c+=_0x174781(0x149)+projectListItemArr[_0x3fa6dd][_0x174781(0x16a)]+_0x174781(0xea),_0x487b9c+=_0x174781(0x162),_0x487b9c+='<div\x20class=\x22progress-bar\x20progress-bar-success\x22\x20role=\x22progressbar\x22\x20aria-valuenow=\x2240\x22\x20aria-valuemin=\x220\x22\x20aria-valuemax=\x22100\x22\x20style=\x22width:'+projectListItemArr[_0x3fa6dd][_0x174781(0x87)]+'%\x22>'):projectListItemArr[_0x3fa6dd]['Percentage']<0x64&&_0x642e0>=_0x599dd7?(_0x487b9c+=_0x174781(0x149)+projectListItemArr[_0x3fa6dd][_0x174781(0x16a)]+_0x174781(0xea),_0x487b9c+='<div\x20class=\x22progress\x20custom-progress\x20progress-info\x20m-0\x20mt-4\x22>',_0x487b9c+='<div\x20class=\x22progress-bar\x20progress-bar-info\x22\x20role=\x22progressbar\x22\x20aria-valuenow=\x2240\x22\x20aria-valuemin=\x220\x22\x20aria-valuemax=\x22100\x22\x20style=\x22width:'+projectListItemArr[_0x3fa6dd][_0x174781(0x87)]+'%\x22>'):(_0x487b9c+=_0x174781(0xeb)+projectListItemArr[_0x3fa6dd][_0x174781(0x16a)]+_0x174781(0xea),_0x487b9c+=_0x174781(0x162),_0x487b9c+=_0x174781(0x81)+projectListItemArr[_0x3fa6dd][_0x174781(0x87)]+_0x174781(0x137))),_0x5d2ba8=='Terminated'&&(_0x487b9c+=_0x174781(0x91),_0x487b9c+='<p\x20class=\x22m-0\x20font-12\x22>Due:<span>'+projectListItemArr[_0x3fa6dd]['PlanedEndDate']+'</span></p>',_0x487b9c+=_0x174781(0x110),_0x487b9c+=_0x174781(0x81)+projectListItemArr[_0x3fa6dd][_0x174781(0x87)]+_0x174781(0x137)),_0x5d2ba8==_0x174781(0xf7)&&(projectListItemArr[_0x3fa6dd]['ActualEndDate1']>projectListItemArr[_0x3fa6dd][_0x174781(0xa2)]?_0x487b9c+=_0x174781(0x82):_0x487b9c+=_0x174781(0x172),_0x487b9c+=_0x174781(0x102)+projectListItemArr[_0x3fa6dd][_0x174781(0xc0)]+_0x174781(0xea),_0x487b9c+='<div\x20class=\x22progress\x20custom-progress\x20progress-success\x20m-0\x20mt-4\x22>',_0x487b9c+='<div\x20class=\x22progress-bar\x20progress-bar-success\x22\x20role=\x22progressbar\x22\x20aria-valuenow=\x2240\x22\x20aria-valuemin=\x220\x22\x20aria-valuemax=\x22100\x22\x20style=\x22width:'+projectListItemArr[_0x3fa6dd]['Percentage']+_0x174781(0x144)),_0x5d2ba8==_0x174781(0xa0)&&(_0x487b9c+=_0x174781(0x15d),_0x487b9c+=_0x174781(0x121)+projectListItemArr[_0x3fa6dd][_0x174781(0x16a)]+'</span></p>',_0x487b9c+='<div\x20class=\x22progress\x20custom-progress\x20progress-warning\x20m-0\x20mt-4\x22>',_0x487b9c+=_0x174781(0x128)),_0x487b9c+=_0x174781(0xae),_0x487b9c+=_0x174781(0xae),_0x487b9c+=_0x174781(0x8b),_0x487b9c+=_0x174781(0x16e),_0x487b9c+=_0x174781(0x143),member==![]&&(_0x487b9c+='<a\x20class=\x27custom-edit-btn\x27\x20href=\x27'+Location+_0x174781(0x98)+Logged_CompanyId+_0x174781(0x118)+projectListItemArr[_0x3fa6dd]['ItemID']+_0x174781(0x88)+projectListItemArr[_0x3fa6dd]['ProjectName']+_0x174781(0x122)),_0x487b9c+='</div></td></tr>',_0x545180+=_0x174781(0xe7)+projectListItemArr[_0x3fa6dd][_0x174781(0xc1)]+_0x174781(0x125)+projectListItemArr[_0x3fa6dd][_0x174781(0xaa)]+'</td><td>'+projectListItemArr[_0x3fa6dd][_0x174781(0xe2)]+_0x174781(0x125)+projectListItemArr[_0x3fa6dd]['ProgramName']+'</td><td>'+projectListItemArr[_0x3fa6dd][_0x174781(0x114)]+_0x174781(0x125)+projectListItemArr[_0x3fa6dd][_0x174781(0x178)]+_0x174781(0x125)+projectListItemArr[_0x3fa6dd][_0x174781(0xf2)]+_0x174781(0x125)+projectListItemArr[_0x3fa6dd][_0x174781(0xb3)]+'</td><td>'+projectListItemArr[_0x3fa6dd][_0x174781(0xbe)]+_0x174781(0x125)+projectListItemArr[_0x3fa6dd]['Percentage']+_0x174781(0xc7);}else _0x545180+=_0x174781(0x94);$(_0x174781(0x14a))['html'](''),$('#exceltable>tbody')[_0x174781(0x12a)](''),$(_0x174781(0x109))['hide'](),$(_0x174781(0x14a))['append'](_0x487b9c),$(_0x174781(0xe6))[_0x174781(0x9e)](_0x545180),$(_0x174781(0xc3))[_0x174781(0x164)](_0x358dd3),projectListItemArr=_0x16f1d9,liveCheck=![],projectListItemArr['length']>0x0?(GenerateTableMyProjectList(),$(_0x174781(0x11b))[_0x174781(0xf9)](_0x174781(0x9c),0x1)):($(_0x174781(0x109))[_0x174781(0xe3)](),$('#tablefooterMyProject')['hide']());}function bindEvent(){var _0x194a3b=a8_0x2c964d;if(IsProjectAdmin==!![])projectListItemArr=projectListItemArr[_0x194a3b(0xd5)](function(_0x4b506e){var _0x37f4e1=_0x194a3b;return _0x4b506e[_0x37f4e1(0x140)]==Logged_CompanyId;}),BindProjectGrid();else{if(IsdeptAdmin==!![]){filterArr=projectListItemArr,getProjectTeamDetails(),projectListItemArr=projectListItemArr[_0x194a3b(0xd5)](function(_0x3c5573){return _0x3c5573['Department_ID']==Logged_DepartmentId;}),newArr=[];for(var _0xb4cc0f=0x0;_0xb4cc0f<projectID[_0x194a3b(0xd3)];_0xb4cc0f++){newArr=filterArr[_0x194a3b(0xd5)](function(_0x51e8dd){var _0x3640d0=_0x194a3b;return _0x51e8dd['Department_ID']!=Logged_DepartmentId&&_0x51e8dd[_0x3640d0(0xa7)]==projectID[_0xb4cc0f][_0x3640d0(0x83)];}),projectListItemArr=projectListItemArr[_0x194a3b(0xd0)](newArr);}BindProjectGrid();}else{newArr=[],getProjectTeamDetails();for(var _0xb4cc0f=0x0;_0xb4cc0f<projectID[_0x194a3b(0xd3)];_0xb4cc0f++){newArr=projectListItemArr[_0x194a3b(0xd5)](function(_0x59fe9a){var _0x378638=_0x194a3b;return _0x59fe9a[_0x378638(0xa7)]==projectID[_0xb4cc0f]['projectId'];}),filterArr=filterArr[_0x194a3b(0xd0)](newArr);}projectListItemArr=filterArr,BindProjectGrid();}}$(_0x194a3b(0xb7))['click'](function(){var _0x186293=_0x194a3b,_0x522459=_0x186293(0xab),_0x5be981=_0x186293(0xed),_0x23c679=0xc8,_0x50d383=0x190;currentDlg=SP['UI'][_0x186293(0xa3)][_0x186293(0xbc)](_0x522459,_0x5be981,_0x23c679,_0x50d383),setTimeout(function(){generateProjectExcel();},0x64);});}function GenerateTableMyProjectList(){var _0x19bf5f=a8_0x2c964d;sorterTableMyProjectList=new TINY['table']['sorter'](_0x19bf5f(0x10c),_0x19bf5f(0xce),{'headclass':'head','ascclass':_0x19bf5f(0x9f),'descclass':_0x19bf5f(0x9f),'evenclass':_0x19bf5f(0x17b),'oddclass':_0x19bf5f(0x13c),'evenselclass':_0x19bf5f(0x12d),'oddselclass':'oddselected','paginate':!![],'size':0xa,'currentid':_0x19bf5f(0x17a),'totalid':_0x19bf5f(0xec),'startingrecid':_0x19bf5f(0x13e),'endingrecid':_0x19bf5f(0xca),'totalrecid':_0x19bf5f(0xbd),'hoverid':'selectedrowMyProject','pageddid':'pagedropdownMyProject','navid':'tablenavMyProject','sortdir':![],'init':!![]});}var projectID=[];function getProjectTeamDetails(){var _0x1a09fc=a8_0x2c964d,_0x371b55=_spPageContextInfo['webAbsoluteUrl']+_0x1a09fc(0x84)+_spPageContextInfo[_0x1a09fc(0xc6)]+_0x1a09fc(0x170)+Logged_CompanyId+_0x1a09fc(0x131);$[_0x1a09fc(0x177)]({'url':_0x371b55,'type':_0x1a09fc(0xef),'async':![],'headers':{'Accept':'application/json;odata=verbose'},'success':function(_0x1fb6da){var _0x528c0a=_0x1a09fc,_0x379afb=_0x1fb6da['d'][_0x528c0a(0x159)];if(_0x379afb[_0x528c0a(0xd3)]!=0x0)for(var _0x1c670b=0x0;_0x1c670b<_0x379afb['length'];_0x1c670b++){projectID[_0x528c0a(0x160)]({'projectId':_0x379afb[_0x1c670b][_0x528c0a(0xf1)]});}}});}function generateProjectExcel(){var _0x1c3734=a8_0x2c964d;$('#exceltable')[_0x1c3734(0x13f)]({'type':_0x1c3734(0x117),'exportHiddenCells':!![],'fileName':_0x1c3734(0xde)}),currentDlg[_0x1c3734(0x112)]();}function getLocation(){var _0x49af6c=a8_0x2c964d,_0x8280b1,_0x1ac022=_0x49af6c(0xf2);$(_0x49af6c(0x167))[_0x49af6c(0x9e)]($(_0x49af6c(0x165))[_0x49af6c(0x7e)]('All')[_0x49af6c(0x164)]('All')),_0x8280b1=_spPageContextInfo[_0x49af6c(0x101)]+'/_api/web/Lists/getbytitle(\x27OfficeLocation\x27)/Items?$filter=CompanyID\x20eq\x20\x27'+Logged_CompanyId+'\x27',$['ajax']({'url':_0x8280b1,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x42ccbf){var _0x4d1202=_0x49af6c,_0x421896=_0x42ccbf['d'][_0x4d1202(0x159)];for(var _0x4d73d6=0x0;_0x4d73d6<_0x421896[_0x4d1202(0xd3)];_0x4d73d6++){$('#ddlLocation')[_0x4d1202(0x9e)]($(_0x4d1202(0x165))[_0x4d1202(0x7e)](_0x421896[_0x4d73d6]['Id'])[_0x4d1202(0x164)](_0x421896[_0x4d73d6][_0x4d1202(0x14f)]));}},'error':function(_0x5ce07b){var _0x3493a1=_0x49af6c;console[_0x3493a1(0xda)](_0x5ce07b);}});}function getCustomer(){var _0x17c81a=a8_0x2c964d,_0x261153,_0x3ac6f4=_0x17c81a(0x100);$(_0x17c81a(0xb9))[_0x17c81a(0x9e)]($(_0x17c81a(0x165))[_0x17c81a(0x7e)](_0x17c81a(0xaf))[_0x17c81a(0x164)](_0x17c81a(0xaf))),_0x261153=_spPageContextInfo[_0x17c81a(0x101)]+_0x17c81a(0x11f),$['ajax']({'url':_0x261153,'headers':{'Accept':_0x17c81a(0x104)},'async':![],'success':function(_0x33faef){var _0x421c38=_0x17c81a,_0x4358b9=_0x33faef['d']['results'];for(var _0x237073=0x0;_0x237073<_0x4358b9[_0x421c38(0xd3)];_0x237073++){$('#ddlCustomer')[_0x421c38(0x9e)]($('<option/>')[_0x421c38(0x7e)](_0x4358b9[_0x237073]['Id'])[_0x421c38(0x164)](_0x4358b9[_0x237073]['Title']));}},'error':function(_0x32c087){var _0x5f21bc=_0x17c81a;console[_0x5f21bc(0xda)](_0x32c087);}});}function getPrograms(){var _0x213c2d=a8_0x2c964d,_0x46a537,_0x14febb=_0x213c2d(0x179);$('#ddlProgram')[_0x213c2d(0x9e)]($(_0x213c2d(0x165))[_0x213c2d(0x7e)]('All')['text'](_0x213c2d(0xaf)));debugger;_0x46a537=_spPageContextInfo[_0x213c2d(0x101)]+_0x213c2d(0x163),$[_0x213c2d(0x177)]({'url':_0x46a537,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x242bba){var _0x231773=_0x213c2d,_0x9c05c4=_0x242bba['d']['results'];for(var _0x827625=0x0;_0x827625<_0x9c05c4[_0x231773(0xd3)];_0x827625++){$('#ddlProgram')[_0x231773(0x9e)]($(_0x231773(0x165))['val'](_0x9c05c4[_0x827625]['Id'])[_0x231773(0x164)](_0x9c05c4[_0x827625]['Title']));}},'error':function(_0x39dd4b){var _0x49eecc=_0x213c2d;console[_0x49eecc(0xda)](_0x39dd4b);}});}function clearSelection(){var _0x301a30=a8_0x2c964d;$(_0x301a30(0xb9))[_0x301a30(0x7e)](_0x301a30(0xaf)),$(_0x301a30(0xd6))['val'](_0x301a30(0xaf)),$(_0x301a30(0x155))[_0x301a30(0x7e)](_0x301a30(0xaf)),$('#ddlLocation')['val']('All'),clearPeoplePickerControl(_0x301a30(0x142)),projectListItemArr=filterArr,BindProjectGrid();}function clearPeoplePickerControl(_0x4bd989){var _0x221841=a8_0x2c964d,_0x5a79ea=_0x4bd989+'_TopSpan',_0x554cc4=null,_0xb45995=this[_0x221841(0xe9)]['SPClientPeoplePickerDict'];for(var _0x4cd362 in _0xb45995){if(_0x4cd362==_0x5a79ea){_0x554cc4=_0xb45995[_0x4cd362];break;}}if(_0x554cc4){var _0x2298c2=$(document[_0x221841(0x8f)](_0x554cc4[_0x221841(0x9b)]))['find'](_0x221841(0x10b));$(_0x2298c2)[_0x221841(0x15e)](function(_0x695460){var _0x54982b=_0x221841;_0x554cc4[_0x54982b(0x14d)](this);});}}function getCurrentURL_GetProjectGridEvent(){$['when'](BindDepartments())['done'](function(){});}function BindDepartments(){var _0x587341=a8_0x2c964d,_0x4ec418=titanForWork[_0x587341(0x16b)]('CompanyId'),_0x1c8fbb=new SP[(_0x587341(0x12e))](),_0x1c52aa=_0x1c8fbb[_0x587341(0xd2)]()['get_lists']()[_0x587341(0xff)](_0x587341(0x105)),_0x4fdd5d=new SP['CamlQuery'](),_0x1057eb=_0x587341(0x176)+_0x4ec418+_0x587341(0x9d);_0x4fdd5d[_0x587341(0xac)](_0x1057eb);var _0x12751e=_0x1c52aa[_0x587341(0x130)](_0x4fdd5d);_0x1c8fbb['load'](_0x12751e),_0x1c8fbb['executeQueryAsync'](function(){var _0x126520=_0x587341,_0x3c3310=_0x12751e[_0x126520(0x97)](),_0x147fdb=_0x126520(0xdf);while(_0x3c3310[_0x126520(0xfe)]()){var _0x50caf9=_0x3c3310[_0x126520(0xb1)](),_0x3df334=_0x50caf9[_0x126520(0xe1)]('ID'),_0x30dc35=_0x50caf9[_0x126520(0xe1)](_0x126520(0x14f));_0x147fdb+=_0x126520(0x13b)+_0x3df334+'\x22>'+_0x30dc35+_0x126520(0x156);}$(_0x126520(0xd6))[_0x126520(0x9e)](_0x147fdb);},function(){var _0xffc26f=_0x587341;console['log'](_0xffc26f(0xdc));});}function initializePeoplePicker(_0x425e1d){var _0x416d0e=a8_0x2c964d,_0x4d081c={};_0x4d081c['PrincipalAccountType']='User,DL',_0x4d081c[_0x416d0e(0xd1)]=0xf,_0x4d081c[_0x416d0e(0x92)]=0xf,_0x4d081c['AllowMultipleValues']=![],_0x4d081c[_0x416d0e(0x15c)]=0x32,_0x4d081c['Width']=_0x416d0e(0x8a),this[_0x416d0e(0xdb)](_0x425e1d,null,_0x4d081c);}function getUserInformation(_0x3532db){var _0x395d30=a8_0x2c964d,_0x4c33a3=[],_0xd78e0d=this[_0x395d30(0xe9)][_0x395d30(0xf0)][_0x3532db+'_TopSpan'];if(!_0xd78e0d[_0x395d30(0xf3)]()){if(_0xd78e0d['HasInputError'])return![];else{if(!_0xd78e0d[_0x395d30(0x107)]())return![];else{if(_0xd78e0d['TotalUserCount']>0x0){var _0x583c21=_0xd78e0d['GetAllUserInfo'](),_0x2f2df6='',_0x57164='',_0x134f61='';for(var _0x3b6be2=0x0;_0x3b6be2<_0x583c21['length'];_0x3b6be2++){var _0x26b54e=_0x583c21[_0x3b6be2][_0x395d30(0x175)]['Email'];DisplayText=_0x583c21[_0x3b6be2][_0x395d30(0xa6)];var _0xf5f0a6=_0x26b54e;_0xf5f0a6!=-0x1&&_0x4c33a3['push'](_0xf5f0a6);}return _0x4c33a3;}}}}else return _0x134f61;}function filter(){var _0xbec4ed=a8_0x2c964d;filterArr=projectListItemArr,$(_0xbec4ed(0x154))[_0xbec4ed(0xf4)](function(){var _0x18c842=_0xbec4ed,_0x209867='';projectListItemArr=filterArr;var _0x339384='';if($(_0x18c842(0xcd))[_0x18c842(0x164)]()!=''){_0x339384=getUserInformation(_0x18c842(0x142));if(_0x339384[_0x18c842(0xd3)]>0x1)return alert(_0x18c842(0x120)),![];}var _0x2a7132=$(_0x18c842(0xd6))[_0x18c842(0x7e)](),_0x321f60=$(_0x18c842(0x167))[_0x18c842(0x7e)](),_0x307898=$(_0x18c842(0xb9))[_0x18c842(0x7e)](),_0x3cfc2f=$(_0x18c842(0x155))[_0x18c842(0x7e)]();projectListItemArr=projectListItemArr['filter'](function(_0x49424d){var _0x143e7c=_0x18c842,_0x5bf27d=$('#txtFilterStatus')[_0x143e7c(0x7e)]();return(_0x2a7132=='All'?_0x49424d[_0x143e7c(0x141)]!=_0x143e7c(0x127):_0x49424d[_0x143e7c(0x141)]==parseInt(_0x2a7132))&&(_0x307898=='All'?_0x49424d[_0x143e7c(0xee)]!=_0x143e7c(0x127):_0x49424d[_0x143e7c(0xee)]==parseInt(_0x307898))&&(_0x321f60=='All'?_0x49424d[_0x143e7c(0x95)]!=_0x143e7c(0x127):_0x49424d['OfficeLocationId']==parseInt(_0x321f60))&&(_0x3cfc2f==_0x143e7c(0xaf)?_0x49424d[_0x143e7c(0xfd)]!='null':_0x49424d['ProgramID']==parseInt(_0x3cfc2f))&&(_0x339384==''?_0x49424d[_0x143e7c(0x86)]!='':_0x49424d[_0x143e7c(0x86)]==_0x339384)&&(_0x5bf27d==''?_0x49424d['Status']!=_0x143e7c(0x127):_0x49424d['Status']==_0x5bf27d);}),BindProjectGrid();});}var sortProject=![],sortClient=![],sortManager=![];function sortProjectName(){var _0x57e55a=a8_0x2c964d;sortProject==![]?(projectListItemArr[_0x57e55a(0xcf)](function(_0x235ee2,_0x18cb74){var _0x3914e1=_0x57e55a,_0x10e74f=_0x235ee2[_0x3914e1(0xc1)][_0x3914e1(0x96)](),_0x246580=_0x18cb74[_0x3914e1(0xc1)][_0x3914e1(0x96)]();if(_0x10e74f<_0x246580)return-0x1;if(_0x10e74f>_0x246580)return 0x1;return 0x0;}),sortProject=!![]):(projectListItemArr['sort'](function(_0x138cad,_0x27155e){var _0x1ae487=_0x57e55a,_0x332d0a=_0x138cad[_0x1ae487(0xc1)]['toLowerCase'](),_0x429dea=_0x27155e[_0x1ae487(0xc1)]['toLowerCase']();if(_0x429dea<_0x332d0a)return-0x1;if(_0x429dea>_0x332d0a)return 0x1;return 0x0;}),sortProject=![]),BindProjectGrid();}function a8_0x4e9c(){var _0x3ab056=['location','#mydmsNorecordFound','resolve','span[class=\x27sp-peoplepicker-userSpan\x27]','sorterTableMyProjectList','LabelsSettings','formatDate','\x27\x20and\x20ContributorsId\x20eq\x20\x27','<div\x20class=\x22progress\x20custom-progress\x20progress-danger\x20m-0\x20mt-4\x22>','reject','close','undefined','ClientName','SOD','104LlQMyM','csv','&ProjectID=','<td\x20class=\x22text-center\x22>','</h3>','.myListPagingValue','employeePicURL','885690DgDPXW','DefaultLanguage','/_api/web/Lists/getbytitle(\x27ClientMaster\x27)/Items?&$top=500&$filter=IsActive\x20eq\x20\x271\x27','Please\x20enter\x20only\x20one\x20Manager','<p\x20class=\x22m-0\x20font-12\x22>Due:<span>','\x27><i\x20class=\x27fa\x20fa-pencil\x27></i></a>','ProjectDescription','Multilingual\x20:\x20','</td><td>','__next','null','<div\x20class=\x22progress-bar\x22\x20role=\x22progressbar\x22\x20aria-valuenow=\x2240\x22\x20aria-valuemin=\x220\x22\x20aria-valuemax=\x22100\x22\x20style=\x22width:70%;\x20background:#000000ab\x22>','Office_Location_Id','html','dd-M-yy','\x27)/items?$select=*,Department/DepartmentName,Department/ID&$expand=Department&$filter=CompanyId\x20eq\x20\x27','evenselected','ClientContext','getItemsWithQueryItem','getItems','\x27&$top=5000','data-localize','</a>','Deferred','done','Recommended\x20to\x20clear\x20the\x20browsing\x20data\x20and\x20cookies\x20for\x20smooth\x20and\x20fast\x20browsing.\x20Please\x20press\x20Ctrl\x20+\x20H\x20to\x20clear\x20cookies.','%;\x20background:#ff0000\x20!important\x22>','hasClass','<label\x20class=\x22lable-view-name\x22>Dept:</label>','311062eMCqXc','<option\x20value=\x22','oddrow','#RecentProject','startrecordMyProject','tableExport','CompanyId','Department_ID','managerPicker','<div\x20class=\x22project-edit-lock-btn-box\x22>','%\x22>','webServerRelativeUrl','<p\x20class=\x22member-email\x20text-ellipsis\x22>','includes','3TeYmtW','<p\x20class=\x22m-0\x20font-12\x22>Due\x20:<span>','#tableTempProjects>tbody','<div>','Modified','DeleteProcessedUser','find','Title','pushNotification','-Select-','button','executeOrDelayUntilScriptLoaded','#btnApply','#ddlProgram','</option>','#btnCreateProgram','PartnerName','results','<label\x20class=\x22lable-view-name\x22\x20data-localize=\x22Program\x22>Program:</label>','<img\x20src=\x22','MaximumEntitySuggestions','<p\x20class=\x22m-0\x20mb-10\x22\x20style=\x22color:#000000ab\x22\x20>On\x20Hold</p>','each','\x22\x20alt=\x22user\x22>','push','<a\x20href=\x27','<div\x20class=\x22progress\x20custom-progress\x20progress-info\x20m-0\x20mt-4\x22>','/_api/web/lists/getbytitle(\x27ProgramList\x27)/items?$select=*','text','<option/>','attr','#ddlLocation','lableText_Converted','[data-localize]','PlanedEndDate','getQueryStringParameter','ProcessApprovers','protocol','<td>','substring','\x20and\x20CompanyId\x20eq\x20\x27','documentMode','<p\x20class=\x22m-0\x20mb-10\x20color-green\x22>Completed</p>','4NBBVup','trim','EntityData','<View><Query><Where><Eq><FieldRef\x20Name=\x27CompanyID\x27\x20/><Value\x20Type=\x27Lookup\x27>','ajax','DepartmentName','ProgramList','currentpageMyProject','evenrow','sp.js','?$select=Title,Key,DefaultLanguage&$top=5000&$filter=Title\x20eq\x20\x27Project\x27\x20','val','test','yyyy/MM/dd','<div\x20class=\x22progress-bar\x22\x20role=\x22progressbar\x22\x20aria-valuenow=\x2240\x22\x20aria-valuemin=\x220\x22\x20aria-valuemax=\x22100\x22\x20style=\x22width:','<p\x20class=\x22m-0\x20mb-10\x20color-green\x22>Completed<span\x20style=\x22color:#ff0000\x20!important\x22>(Late)</span></p>','projectId','/_api/lists/getByTitle(\x27ProjectTeamDetails\x27)/items?$Select=*,ProjectId&$filter=Status\x20eq\x20\x27Active\x27\x20and\x20TeamMember/ID\x20eq\x20','promise','ManagerEMail','Percentage','&ProjectName=','#overlaysearch','245px','</td>','setDate','111972aAyHBl','ready','getElementById','\x27)/items/','<p\x20class=\x22m-0\x20mb-10\x22\x20style=\x22color:#ff0000\x22>Terminated</p>','ResolvePrincipalSource','5726574XTiCMK','<td\x20style=\x22text-align:center\x22>NorecordFound</td>','OfficeLocationId','toLowerCase','getEnumerator','/Pages/EditProjectDetails.aspx?WebAppId=','<div\x20class=\x22d-flex\x20mt5\x22>','#hdnIsProjectAdmin','ResolvedListElementId','selectedIndex','</Value></Eq></Where><OrderBy><FieldRef\x20Name=\x27Title\x27/></OrderBy></Query></View>','append','nosort','OnHold','\x20key\x20not\x20found.','PlanedEndDate1','ModalDialog','315706jMASmc','/_layouts/15/userphoto.aspx?accountname=','DisplayText','ItemID','<div\x20class=\x22ellipsis-2\x22>','\x27\x20and\x20WebPartName\x20eq\x20\x27Project\x20Admin\x27','TechnologyUsed','Generating\x20excelsheet...','set_viewXml','datepicker','</div>','All','46123CPEDwv','get_current','<h3\x20class=\x22member-name\x20text-ellipsis\x22>','ManagerName','<div\x20class=\x22project-manager-card\x22>','ProgramName','fadeIn','#ProjectExport','1271895glcEOd','#ddlCustomer','[object\x20SafariRemoteNotification]','ActualStartDate','showWaitScreenWithNoClose','totalrecordsMyProject','Status','<div\x20class=\x22project-manager-card-head\x22>','ActualEndDate','ProjectName','getDate','#totalIcaon','#txtSomethingWentWrong','#CreateProject','userId','%</td></tr>','<p\x20class=\x22m-0\x20mb-10\x20color-blue\x22>Live</p>','<label\x20class=\x22lable-view-name\x22>Office:</label>','endrecordMyProject','ProjectDetails','/_api/web/lists/getbytitle(\x27','#managerPicker_TopSpan_ResolvedList','tableTempProjects','sort','concat','SearchPrincipalSource','get_web','length','siteServerRelativeUrl','filter','#txtFilterDepartment','href','format','\x27\x20class=\x27font-16\x20ellipsis-2\x27>','log','SPClientPeoplePicker_InitStandaloneControlWrapper','error\x20:\x20Project\x20Details\x20web\x20part','\x27\x20and\x20(WebPartName\x20eq\x20\x27Project\x27)','AllProject','<option\x20value=\x22All\x22>All</option>','hide','get_item','ProjectCode','show','labelText_Actual','get','#exceltable>tbody','<tr><td>','\x27)/items?$select=*&$filter=CompanyId\x20eq\x20\x27','SPClientPeoplePicker','</span></p>','<p\x20class=\x22m-0\x20font-12\x22\x20style=\x22color:#ff0000\x20!important\x22>Due\x20:<span>','totalpagesMyProject','<br\x20/>Please\x20wait!!','ClientID','GET','SPClientPeoplePickerDict','ProjectId','OfficeLocation','IsEmpty','click','Live','EMail','Completed','#btnViewProgram','prop','<div\x20class=\x22project-manager-card-body-info\x20text-ellipsis\x22>','\x27\x20and\x20Department/ID\x20eq\x20\x27','<div\x20class=\x22project-manager-card-body\x22>','ProgramID','moveNext','getByTitle','ClientMaster','webAbsoluteUrl','<p\x20class=\x22m-0\x20font-12\x22>Date:<span>','responseJSON','application/json;odata=verbose','Departments','value','HasResolvedUsers'];a8_0x4e9c=function(){return _0x3ab056;};return a8_0x4e9c();}function sortClientName(){var _0x5ca96d=a8_0x2c964d;sortClient==![]?(projectListItemArr[_0x5ca96d(0xcf)](function(_0xbf2e25,_0x2648b7){var _0x29bd58=_0x5ca96d,_0x4caa9f=_0xbf2e25['ClientName'][_0x29bd58(0x96)](),_0x2c213c=_0x2648b7[_0x29bd58(0x114)][_0x29bd58(0x96)]();if(_0x4caa9f<_0x2c213c)return-0x1;if(_0x4caa9f>_0x2c213c)return 0x1;return 0x0;}),sortClient=!![]):(projectListItemArr[_0x5ca96d(0xcf)](function(_0x18e1fd,_0x2fa5e5){var _0x5c6331=_0x5ca96d,_0x4520e8=_0x18e1fd['ClientName'][_0x5c6331(0x96)](),_0x2ce69e=_0x2fa5e5[_0x5c6331(0x114)][_0x5c6331(0x96)]();if(_0x2ce69e<_0x4520e8)return-0x1;if(_0x2ce69e>_0x4520e8)return 0x1;return 0x0;}),sortClient=![]),BindProjectGrid();}function sortManagerName(){var _0x564f56=a8_0x2c964d;sortManager==![]?(projectListItemArr[_0x564f56(0xcf)](function(_0x4437bb,_0x588ebc){var _0x1536c5=_0x564f56,_0x207c4d=_0x4437bb[_0x1536c5(0xb3)][_0x1536c5(0x96)](),_0x142cf0=_0x588ebc[_0x1536c5(0xb3)]['toLowerCase']();if(_0x207c4d<_0x142cf0)return-0x1;if(_0x207c4d>_0x142cf0)return 0x1;return 0x0;}),sortManager=!![]):(projectListItemArr[_0x564f56(0xcf)](function(_0x427219,_0x140574){var _0x442878=_0x564f56,_0x5e5e34=_0x427219[_0x442878(0xb3)][_0x442878(0x96)](),_0x24a0a4=_0x140574['ManagerName'][_0x442878(0x96)]();if(_0x24a0a4<_0x5e5e34)return-0x1;if(_0x24a0a4>_0x5e5e34)return 0x1;return 0x0;}),sortManager=![]),BindProjectGrid();}var LabelDefaultLangauge=[],labels=[];function ChangeLabels(){var _0x350626=a8_0x2c964d,_0x1f4991=_0x350626(0x11e);if(LabelDefaultLangauge[_0x350626(0xd3)]==0x0){var _0x3469a8=_0x350626(0x7d);$['when'](CommonFunction[_0x350626(0x12f)](_0x350626(0x10d),_0x3469a8))[_0x350626(0x135)](function(_0x5e54ef){var _0x43b8f5=_0x350626;try{LabelDefaultLangauge=_0x5e54ef[_0x43b8f5(0x159)],SetDMSText(_0x5e54ef[_0x43b8f5(0x159)],_0x1f4991);}catch(_0x57c531){alert(_0x43b8f5(0x136));}});}else SetDMSText(LabelDefaultLangauge,_0x1f4991);}function SetDMSText(_0x21d6a0,_0x14b776){labels=[],$['each'](_0x21d6a0,function(_0x4a4d88,_0x66fcec){var _0x2ef2ee=a8_0x3aa5,_0x4780bf=_0x66fcec['Key'],_0x434fb8=_0x66fcec[_0x14b776];if(_0x434fb8==null||_0x434fb8==''||_0x434fb8==undefined)_0x434fb8=_0x66fcec[_0x2ef2ee(0x11e)];var _0x3fb152={'labelText_Actual':_0x4780bf,'lableText_Converted':_0x434fb8};labels[_0x2ef2ee(0x160)](_0x3fb152);}),DetectBrowser();}function DetectBrowser(){var _0x12778a=a8_0x2c964d,_0x29c74f=/constructor/i[_0x12778a(0x7f)](window['HTMLElement'])||function(_0x51171e){var _0x4972ed=_0x12778a;return _0x51171e['toString']()===_0x4972ed(0xba);}(!window['safari']||typeof safari!==_0x12778a(0x113)&&safari[_0x12778a(0x150)]),_0xd1e48c=![]||!!document[_0x12778a(0x171)];_0x29c74f||_0xd1e48c?ChangeWebPartsHeadings_OldBrowser():ChangeWebPartsHeadings();}function ChangeWebPartsHeadings(){var _0x43a885=a8_0x2c964d;try{$('[data-localize]')[_0x43a885(0x15e)](function(_0x22cad2,_0x124f50){var _0x4d0113=_0x43a885;try{var _0x50ce0d=$(this)[_0x4d0113(0x166)](_0x4d0113(0x132)),_0x79f191=labels[_0x4d0113(0x14e)](function(_0x35caca){var _0x7a814f=_0x4d0113;return _0x35caca['labelText_Actual'][_0x7a814f(0x174)]()===_0x50ce0d;})[_0x4d0113(0x168)];if($(this)[_0x4d0113(0x14e)]('a')['length']>0x0)$(this)[_0x4d0113(0x14e)]('a')[_0x4d0113(0x12a)](_0x79f191);else{if($(this)[_0x4d0113(0x14e)]('b')[_0x4d0113(0xd3)]>0x0)$(this)[_0x4d0113(0x14e)]('b')[_0x4d0113(0x12a)](_0x79f191);else{if($(this)[_0x4d0113(0x14e)]('p')[_0x4d0113(0xd3)]>0x0)$(this)['find']('p')['html'](_0x79f191);else $(this)[_0x4d0113(0x138)](_0x4d0113(0x152))?$(this)[_0x4d0113(0x166)](_0x4d0113(0x106),_0x79f191):$(this)[_0x4d0113(0x12a)](_0x79f191);}}}catch(_0x24d9d6){console[_0x4d0113(0xda)]('Multilingual\x20:\x20'+_0x50ce0d+_0x4d0113(0xa1)),$(this)['attr'](_0x4d0113(0x106),$(this)[_0x4d0113(0x7e)]());}});}catch(_0x327fd7){console['log'](_0x43a885(0x124)+_0x327fd7);}}function ChangeWebPartsHeadings_OldBrowser(){var _0x1be1d2=a8_0x2c964d;try{$(_0x1be1d2(0x169))['each'](function(_0x8c891d,_0x523a14){var _0x1fb847=_0x1be1d2;try{var _0x51cd94=$(this)[_0x1fb847(0x166)](_0x1fb847(0x132)),_0x22c473=findObjectByKey(labels,_0x51cd94,_0x51cd94);if($(this)[_0x1fb847(0x14e)]('a')[_0x1fb847(0xd3)]>0x0)$(this)[_0x1fb847(0x14e)]('a')[_0x1fb847(0x12a)](_0x22c473);else{if($(this)[_0x1fb847(0x14e)]('b')[_0x1fb847(0xd3)]>0x0)$(this)[_0x1fb847(0x14e)]('b')['html'](_0x22c473);else{if($(this)[_0x1fb847(0x14e)]('p')[_0x1fb847(0xd3)]>0x0)$(this)[_0x1fb847(0x14e)]('p')[_0x1fb847(0x12a)](_0x22c473);else $(this)[_0x1fb847(0x138)](_0x1fb847(0x152))?_0x22c473!=null&&_0x22c473!=_0x1fb847(0x127)&&_0x22c473!=''?$(this)[_0x1fb847(0x166)](_0x1fb847(0x106),_0x22c473):$(this)[_0x1fb847(0x166)](_0x1fb847(0x106),$(this)[_0x1fb847(0x7e)]()):_0x22c473!=null&&_0x22c473!=_0x1fb847(0x127)&&_0x22c473!=''?$(this)[_0x1fb847(0x12a)](_0x22c473):$(this)[_0x1fb847(0x12a)]($(this)[_0x1fb847(0x164)]());}}}catch(_0x399515){console['log'](_0x1fb847(0x124)+_0x51cd94+_0x1fb847(0xa1)),$(this)[_0x1fb847(0x166)](_0x1fb847(0x106),$(this)[_0x1fb847(0x7e)]());}});}catch(_0x596d95){console[_0x1be1d2(0xda)]('Multilingual\x20:\x20'+_0x596d95);}}function findObjectByKey(_0x1a68e5,_0x508ac8,_0x1b12f3){var _0x38630a=a8_0x2c964d;for(var _0x39f9d9=0x0;_0x39f9d9<_0x1a68e5[_0x38630a(0xd3)];_0x39f9d9++){if(_0x1a68e5[_0x39f9d9][_0x38630a(0xe4)]==_0x1b12f3)return _0x1a68e5[_0x39f9d9][_0x38630a(0x168)];}return null;}