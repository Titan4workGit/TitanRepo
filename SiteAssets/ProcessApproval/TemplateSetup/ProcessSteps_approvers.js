var _0x58096d=_0x219b;(function(_0x536e1d,_0x3a8366){var _0xb1f0d3=_0x219b,_0x1d0c8a=_0x536e1d();while(!![]){try{var _0xe803e5=parseInt(_0xb1f0d3(0xec))/0x1*(parseInt(_0xb1f0d3(0xa8))/0x2)+parseInt(_0xb1f0d3(0xc3))/0x3*(parseInt(_0xb1f0d3(0x105))/0x4)+-parseInt(_0xb1f0d3(0x12c))/0x5*(parseInt(_0xb1f0d3(0xb0))/0x6)+parseInt(_0xb1f0d3(0xe3))/0x7+parseInt(_0xb1f0d3(0xfb))/0x8+-parseInt(_0xb1f0d3(0x103))/0x9*(-parseInt(_0xb1f0d3(0x11b))/0xa)+parseInt(_0xb1f0d3(0xb4))/0xb*(-parseInt(_0xb1f0d3(0xc6))/0xc);if(_0xe803e5===_0x3a8366)break;else _0x1d0c8a['push'](_0x1d0c8a['shift']());}catch(_0x2badee){_0x1d0c8a['push'](_0x1d0c8a['shift']());}}}(_0x2edc,0xdee8f),$(document)[_0x58096d(0x129)](function(){var _0x23f805=_0x58096d,_0x25003d='',_0xc24c5a='';$(_0x23f805(0xdf))[_0x23f805(0xc1)](function(){var _0x4bac63=_0x23f805;this[_0x4bac63(0x9d)]==_0x4bac63(0xd3)&&(initializePeoplePicker(_0x4bac63(0xa4)),_0x25003d=$(_0x4bac63(0xf1)));}),$('#btnSubmitStep')[_0x23f805(0x11a)](function(){SaveApprovers();}),$('#btnAddStep')[_0x23f805(0x11a)](function(){AddStep();}),$(_0x23f805(0xe8))[_0x23f805(0x11a)](function(){EditStepSubmit();}),GetOwnerUser();}));function initializePeoplePicker(_0xa05003){var _0x5c6779=_0x58096d,_0x1e193c={};_0x1e193c[_0x5c6779(0x112)]=_0x5c6779(0x8e),_0x1e193c[_0x5c6779(0x90)]=0xf,_0x1e193c[_0x5c6779(0xd9)]=0xf,_0x1e193c['AllowMultipleValues']=!![],_0x1e193c['MaximumEntitySuggestions']=0x32,_0x1e193c[_0x5c6779(0x8d)]=_0x5c6779(0xa2),this[_0x5c6779(0x140)](_0xa05003,null,_0x1e193c),$(_0x5c6779(0x109))[_0x5c6779(0x126)](0x136);}var StepCount=0x0,StpApprovers=[],StepApprver=[];function AddStep(){var _0x4ef46d=_0x58096d,_0x1a1f84=$(_0x4ef46d(0xa9))[_0x4ef46d(0x111)](),_0x2bf7c4=$(_0x4ef46d(0xf7))['val']();peoplePickerDiv=$(_0x4ef46d(0xf1));if(_0x1a1f84=='')return alert('Kindly\x20enter\x20the\x20StepName.'),![];StepApprver=[];if(_0x2bf7c4==_0x4ef46d(0xd3)){var _0x465c6b=SPClientPeoplePicker[_0x4ef46d(0x9e)][peoplePickerDiv[0x0]['id']],_0x41b65e=_0x465c6b[_0x4ef46d(0xf4)](),_0x57618f='',_0x3cb37e=![];for(var _0x5f16a7=0x0;_0x5f16a7<_0x41b65e[_0x4ef46d(0x10d)];_0x5f16a7++){var _0xad6e4a=AllTaskUsersEmployeeuser[_0x4ef46d(0xf2)](function(_0x32f2cc){var _0x55d6b6=_0x4ef46d;return _0x32f2cc[_0x55d6b6(0x124)]==_0x41b65e[_0x5f16a7][_0x55d6b6(0x9a)][_0x55d6b6(0x11c)];});StepApprver['push'](_0xad6e4a[0x0]['UserId']);}setTimeout(function(){AddNewStep(_0x1a1f84,'',_0x41b65e);},0x64);}else{var _0x135e2e=$('#ddlroles')[_0x4ef46d(0x111)]();setTimeout(function(){AddNewStep(_0x1a1f84,_0x135e2e,_0x41b65e);},0x64);}StpApprovers[_0x4ef46d(0x123)]({'StName':_0x1a1f84,'Type':_0x2bf7c4,'StRole':_0x135e2e,'StUser':_0x41b65e,'UsrID':StepApprver});}function AddNewStep(_0x4878cb,_0xdf21ae,_0x13aa99){var _0x1ae1c3=_0x58096d;StepCount=StepCount+0x1;var _0x27b86a='';_0x27b86a+='<li><div\x20class=\x22topsec\x22>',_0x27b86a+='<h3>'+_0x4878cb+_0x1ae1c3(0x131),_0x27b86a+='<div\x20class=\x22dropdown\x20pull-right\x22>',_0x27b86a+=_0x1ae1c3(0x12a),_0x27b86a+=_0x1ae1c3(0x115),_0x27b86a+=_0x1ae1c3(0xab),_0x27b86a+=_0x1ae1c3(0xbc)+StepCount+_0x1ae1c3(0xfa),_0x27b86a+=_0x1ae1c3(0x127)+StepCount+_0x1ae1c3(0x10a),_0x27b86a+=_0x1ae1c3(0xba),_0x27b86a+=_0x1ae1c3(0x91),_0x27b86a+=_0x1ae1c3(0xe1);if(_0xdf21ae!='')_0x27b86a+='<div\x20class=\x22imgsetion\x22>',_0x27b86a+=_0x1ae1c3(0xa5),_0x27b86a+='</div>',_0x27b86a+=_0x1ae1c3(0x102),_0x27b86a+=_0x1ae1c3(0x113)+_0xdf21ae+_0x1ae1c3(0xe7),_0x27b86a+=_0x1ae1c3(0x10c);else for(i=0x0;i<_0x13aa99['length'];i++){var _0x594f09=_spPageContextInfo[_0x1ae1c3(0xb1)]+_0x1ae1c3(0xe4)+escapeProperly(_0x13aa99[i][_0x1ae1c3(0x9a)][_0x1ae1c3(0x11c)]);_0x27b86a+=_0x1ae1c3(0xd7)+_0x13aa99[i][_0x1ae1c3(0x12f)]+_0x1ae1c3(0x125)+_0x594f09+_0x1ae1c3(0xc9),_0x27b86a+='</div></div><div\x20class=\x22imagecontent\x22><h4>'+_0x13aa99[i]['DisplayText']+_0x1ae1c3(0xf8)+_0x13aa99[i][_0x1ae1c3(0x9a)][_0x1ae1c3(0x11c)]+_0x1ae1c3(0x9f);}_0x27b86a+='</div></li>',$(_0x1ae1c3(0xbf))[_0x1ae1c3(0xfd)](_0x27b86a),ClearDetails();}function DeleteStep(_0x1b7677,_0x126781){var _0x1f1c25=_0x58096d;_0x126781['parentNode'][_0x1f1c25(0xe0)][_0x1f1c25(0xe0)]['parentNode'][_0x1f1c25(0x135)](),StpApprovers[_0x1f1c25(0xce)](StpApprovers[_0x1f1c25(0x132)](_0x36daf8=>_0x36daf8['Id']===_0x1b7677),0x1),StepCount=StepCount-0x1;}var IsNewStp=![];function EditStep(_0x24488b,_0x39f19f){var _0x483411=_0x58096d;$('#btnAddStep')['hide'](),$(_0x483411(0xe8))[_0x483411(0xc2)](),$(_0x483411(0xe8))['val'](_0x24488b);_0x39f19f!=null&&_0x39f19f[_0x483411(0xe0)][_0x483411(0xe0)]['parentNode'][_0x483411(0xe0)][_0x483411(0x135)]();$(_0x483411(0xa9))['val'](StpApprovers[_0x24488b-0x1][_0x483411(0x13f)]),IsNewStp=!![];if(StpApprovers[_0x24488b-0x1][_0x483411(0xda)]!='')$(_0x483411(0xd2))[_0x483411(0x111)](StpApprovers[_0x24488b-0x1][_0x483411(0xda)]),$('input[name=optradio][value=Role]')['prop'](_0x483411(0x13b),!![]),$(_0x483411(0xfc))['hide'](),$(_0x483411(0xed))[_0x483411(0xc2)]();else{$('input[name=optradio][value=User]')[_0x483411(0xf9)]('checked',!![]),$(_0x483411(0xfc))['show'](),$('.rolbox')[_0x483411(0xcc)](),initializePeoplePicker(_0x483411(0xa4)),peoplePickerDiv=$('[id$=\x27Stepuser_TopSpan\x27]');for(i=0x0;i<StpApprovers[_0x24488b-0x1]['StUser'][_0x483411(0x10d)];i++){var _0x4207fc=this['SPClientPeoplePicker'][_0x483411(0x9e)][_0x483411(0xaa)];_0x4207fc['AddUserKeys'](StpApprovers[_0x24488b-0x1]['StUser'][i][_0x483411(0x136)][_0x483411(0xd4)]('|')[0x2]);}}}var EditStpID='';function EditEStep(_0x16ae38,_0x144fb9){var _0x5c89aa=_0x58096d;if(ActiveProessCount==0x0){$(_0x5c89aa(0x104))[_0x5c89aa(0xcc)](),$('#btnEditStep')[_0x5c89aa(0xc2)](),$('#btnEditStep')[_0x5c89aa(0x111)](_0x16ae38),EditStpID=_0x144fb9,$('#txtStepName')[_0x5c89aa(0x111)](SavedStpApprovers[_0x16ae38-0x1]['StName']),IsNewStp=![];if(SavedStpApprovers[_0x16ae38-0x1][_0x5c89aa(0x94)]==_0x5c89aa(0x137))$('#ddlroles')[_0x5c89aa(0x111)](SavedStpApprovers[_0x16ae38-0x1][_0x5c89aa(0xda)]),$(_0x5c89aa(0x8f))['prop'](_0x5c89aa(0x13b),!![]),$(_0x5c89aa(0xfc))[_0x5c89aa(0xcc)](),$(_0x5c89aa(0xed))[_0x5c89aa(0xc2)]();else{$('input[name=optradio][value=User]')[_0x5c89aa(0xf9)](_0x5c89aa(0x13b),!![]),$(_0x5c89aa(0xfc))[_0x5c89aa(0xc2)](),$(_0x5c89aa(0xed))[_0x5c89aa(0xcc)](),initializePeoplePicker(_0x5c89aa(0xa4)),peoplePickerDiv=$(_0x5c89aa(0xf1));for(i=0x0;i<SavedStpApprovers[_0x16ae38-0x1]['StUser'][_0x5c89aa(0x10d)];i++){var _0x5d52b2=this['SPClientPeoplePicker'][_0x5c89aa(0x9e)][_0x5c89aa(0xaa)],_0x1b8ce7=GetUserLogin(SavedStpApprovers[_0x16ae38-0x1][_0x5c89aa(0xc8)][i]);_0x5d52b2[_0x5c89aa(0xdb)](_0x1b8ce7);}}}else alert('Requests\x20are\x20active,\x20kindly\x20take\x20your\x20action\x20later!');}function EditStepSubmit(){var _0x1ffd68=_0x58096d,_0x1b8409=$(_0x1ffd68(0xa9))[_0x1ffd68(0x111)](),_0x36ead9=$(_0x1ffd68(0xf7))[_0x1ffd68(0x111)](),_0x55798d='';peoplePickerDiv=$(_0x1ffd68(0xf1)),StepApprver=[];if(_0x1b8409=='')return alert(_0x1ffd68(0x11d)),![];if(_0x36ead9==_0x1ffd68(0xd3)){var _0xf12998=SPClientPeoplePicker['SPClientPeoplePickerDict'][peoplePickerDiv[0x0]['id']],_0x4a1740=_0xf12998[_0x1ffd68(0xf4)](),_0x122a5b='',_0x3d6385=![];for(var _0x194da7=0x0;_0x194da7<_0x4a1740[_0x1ffd68(0x10d)];_0x194da7++){var _0x3823d4=AllTaskUsersEmployeeuser[_0x1ffd68(0xf2)](function(_0x5996d9){var _0x593a98=_0x1ffd68;return _0x5996d9[_0x593a98(0x124)]==_0x4a1740[_0x194da7][_0x593a98(0x9a)][_0x593a98(0x11c)];});StepApprver[_0x1ffd68(0x123)]({'Name':_0x3823d4[0x0]['EMail'],'Id':_0x3823d4[0x0][_0x1ffd68(0xde)]});}EditNewStep(_0x1b8409,'',_0x4a1740);}else _0x55798d=$(_0x1ffd68(0xd2))[_0x1ffd68(0x111)](),EditNewStep(_0x1b8409,_0x55798d,StepApprver);IsNewStp==![]&&(SaveEditStepInList(_0x1b8409,_0x55798d,StepApprver),$(_0x1ffd68(0xe8))['hide'](),$('#btnAddStep')[_0x1ffd68(0xc2)]());}function SaveEditStepInList(_0x4510ad,_0x2fde6b,_0x4ade00){var _0x3bbbdb=_0x58096d;$('#'+EditStpID)[_0x3bbbdb(0xcc)]();var _0x33d169=[];if(_0x4ade00[_0x3bbbdb(0x10d)]){for(i=0x0;i<_0x4ade00['length'];i++){_0x33d169[_0x3bbbdb(0x123)](_0x4ade00[i]['Id']);}var _0x4fc345={'__metadata':{'type':'SP.Data.ApprovalTemplateStepsListItem'},'StepName':_0x4510ad,'ApproversId':{'results':_0x33d169}};}else var _0x4fc345={'__metadata':{'type':'SP.Data.ApprovalTemplateStepsListItem'},'StepName':_0x4510ad,'ApproverRole':_0x2fde6b};$[_0x3bbbdb(0xef)]({'url':_spPageContextInfo[_0x3bbbdb(0xb1)]+_0x3bbbdb(0xf3)+EditStpID+')','type':'PATCH','headers':{'accept':_0x3bbbdb(0x9c),'X-RequestDigest':$(_0x3bbbdb(0x118))[_0x3bbbdb(0x111)](),'content-Type':_0x3bbbdb(0x9c),'X-Http-Method':'PATCH','If-Match':'*'},'data':JSON[_0x3bbbdb(0x138)](_0x4fc345),'success':function(_0x2dd145){var _0x277d78=_0x3bbbdb;alert(_0x277d78(0x133));},'error':function(_0x25098f){console['log'](_0x25098f);}});}function EditSavedStep(_0x3ad745,_0x20998a,_0x2880c9){var _0x29a44f=_0x58096d;stpEditstep=[];var _0x14b935=$('#btnEditStep')[_0x29a44f(0x111)](),_0x3dcd65={'StName':_0x3ad745,'Type':'Role\x20Based','StRole':_0x20998a,'StUser':_0x2880c9,'UserID':_0x14b935};SavedStpApprovers[_0x14b935-0x1]=_0x3dcd65;var _0x32cb3f='';_0x32cb3f+=_0x29a44f(0xb6),_0x32cb3f+=_0x29a44f(0xd1)+_0x3ad745+_0x29a44f(0x131),_0x32cb3f+='<div\x20class=\x22dropdown\x20pull-right\x22>',_0x32cb3f+=_0x29a44f(0x12a),_0x32cb3f+=_0x29a44f(0x115),_0x32cb3f+=_0x29a44f(0xab),_0x32cb3f+=_0x29a44f(0xbc)+_0x14b935+',this)\x22><a\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-pencil\x22\x20></i>\x20Edit</a></li>',_0x32cb3f+=_0x29a44f(0x127)+_0x14b935+_0x29a44f(0x10a),_0x32cb3f+=_0x29a44f(0xba),_0x32cb3f+=_0x29a44f(0x91),_0x32cb3f+='<div\x20class=\x22flexitem\x22>';if(_0x20998a!='')_0x32cb3f+=_0x29a44f(0xc5),_0x32cb3f+=_0x29a44f(0xa5),_0x32cb3f+=_0x29a44f(0x10c),_0x32cb3f+=_0x29a44f(0x102),_0x32cb3f+='<h4>'+_0x20998a+_0x29a44f(0xe7),_0x32cb3f+=_0x29a44f(0x10c);else for(i=0x0;i<_0x2880c9['length'];i++){var _0x1643b1=_spPageContextInfo['webAbsoluteUrl']+_0x29a44f(0xe4)+escapeProperly(_0x2880c9[i][_0x29a44f(0x9a)][_0x29a44f(0x11c)]);_0x32cb3f+=_0x29a44f(0xd7)+_0x2880c9[i]['DisplayText']+_0x29a44f(0x125)+_0x1643b1+_0x29a44f(0xc9),_0x32cb3f+=_0x29a44f(0xa3)+_0x2880c9[i][_0x29a44f(0x12f)]+_0x29a44f(0xf8)+_0x2880c9[i]['EntityData']['Email']+_0x29a44f(0x9f);}_0x32cb3f+=_0x29a44f(0xb7),$(_0x29a44f(0xbf))[_0x29a44f(0xfd)](_0x32cb3f),ClearDetails();}var stpEditstep=[];function EditNewStep(_0x4e70e9,_0x4064aa,_0x20adf8){var _0x27a015=_0x58096d;stpEditstep=[];var _0x487ad1=$(_0x27a015(0xe8))[_0x27a015(0x111)](),_0x537a69={'StName':_0x4e70e9,'Type':_0x27a015(0x137),'StRole':_0x4064aa,'StUser':_0x20adf8,'UserID':_0x487ad1};StpApprovers[_0x487ad1-0x1]=_0x537a69,stpEditstep=_0x537a69;var _0x257026='';_0x257026+=_0x27a015(0xb6),_0x257026+=_0x27a015(0xd1)+_0x4e70e9+'</h3>',_0x257026+=_0x27a015(0x130),_0x257026+='<button\x20class=\x22dropdown-toggle\x22\x20type=\x22button\x22\x20data-toggle=\x22dropdown\x22>',_0x257026+=_0x27a015(0x115),_0x257026+='<ul\x20class=\x22dropdown-menu\x22>',_0x257026+=_0x27a015(0xbc)+_0x487ad1+_0x27a015(0xfa),_0x257026+=_0x27a015(0x127)+_0x487ad1+_0x27a015(0x10a),_0x257026+=_0x27a015(0xba),_0x257026+=_0x27a015(0x91),_0x257026+=_0x27a015(0xe1);if(_0x4064aa!='')_0x257026+=_0x27a015(0xc5),_0x257026+=_0x27a015(0xa5),_0x257026+='</div>',_0x257026+='<div\x20class=\x22imagecontent\x22>',_0x257026+='<h4>'+_0x4064aa+_0x27a015(0xe7),_0x257026+=_0x27a015(0x10c);else for(i=0x0;i<_0x20adf8[_0x27a015(0x10d)];i++){var _0x5bed4c=_spPageContextInfo[_0x27a015(0xb1)]+_0x27a015(0xe4)+escapeProperly(_0x20adf8[i][_0x27a015(0x9a)][_0x27a015(0x11c)]);_0x257026+=_0x27a015(0xd7)+_0x20adf8[i][_0x27a015(0x12f)]+'\x22\x20src=\x22'+_0x5bed4c+_0x27a015(0xc9),_0x257026+=_0x27a015(0xa3)+_0x20adf8[i][_0x27a015(0x12f)]+'</h4><a\x20href=\x22#\x22>'+_0x20adf8[i]['EntityData'][_0x27a015(0x11c)]+_0x27a015(0x9f);}_0x257026+='</div></li>',$(_0x27a015(0xbf))[_0x27a015(0xfd)](_0x257026),ClearDetails();}function GetlistData(_0x1b4b57){var _0x757280=_0x58096d,_0x544e34=$[_0x757280(0x117)]();return $[_0x757280(0xef)]({'url':_spPageContextInfo['webAbsoluteUrl']+_0x1b4b57,'async':![],'contentType':_0x757280(0x9c),'headers':{'accept':_0x757280(0x9c)},'success':function(_0x4b08cd){var _0x1a57b8=_0x757280;_0x544e34[_0x1a57b8(0xae)](_0x4b08cd);},'error':function(_0x39a95a){_0x544e34['reject'](_0x39a95a);}}),_0x544e34[_0x757280(0xea)]();}var ApproerSteps=[],SavedStpApprovers=[],SavedstpCount='';function getTempID(_0x18373f){var _0x295f09=_0x58096d;CurrTenplateID=_0x18373f,SavedStpApprovers=[],$(_0x295f09(0xbf))['empty']();var _0x1a7d53=_spPageContextInfo[_0x295f09(0xb1)]+'/_api/web/lists/getbytitle(\x27ApprovalTemplateSteps\x27)/items?$select=*,Approvers/Id,Approvers/Title,TemplateID/Id,TemplateID/TemplateName&$expand=TemplateID,Approvers&$filter=TemplateID/ID\x20eq\x20\x27'+CurrTenplateID+'\x27';$[_0x295f09(0xef)]({'url':_0x1a7d53,'async':![],'headers':{'Accept':_0x295f09(0x9c)},'async':![],'success':function(_0x4ea55c){var _0x3acf29=_0x295f09,_0x4493f9,_0x57d694;_0x4493f9=_0x4ea55c['d'][_0x3acf29(0x12e)],console[_0x3acf29(0xaf)](_0x4493f9),$(_0x3acf29(0x104))[_0x3acf29(0xc2)](),$('#btnEditStep')['hide'](),ApproerSteps=_0x4493f9,GetTempDetails(_0x18373f);_0x4493f9[_0x3acf29(0x10d)]>0x0&&(ViewStepInTemp(_0x4493f9),SavedstpCount=_0x4493f9[_0x3acf29(0x10d)]);for(i=0x0;i<ApproerSteps[_0x3acf29(0x10d)];i++){if(ApproerSteps[i][_0x3acf29(0x12b)]==_0x3acf29(0x137))SavedStpApprovers[_0x3acf29(0x123)]({'StName':ApproerSteps[i][_0x3acf29(0xbe)],'Type':ApproerSteps[i][_0x3acf29(0x12b)],'StRole':ApproerSteps[i]['ApproverRole'],'StUser':'','UsrID':''});else{if(ApproerSteps[i][_0x3acf29(0x11e)]!=null){var _0xa46f8f=ApproerSteps[i][_0x3acf29(0x11e)][_0x3acf29(0x12e)];SavedStpApprovers['push']({'StName':ApproerSteps[i][_0x3acf29(0xbe)],'Type':ApproerSteps[i][_0x3acf29(0x12b)],'StRole':ApproerSteps[i][_0x3acf29(0xf0)],'StUser':_0xa46f8f,'UsrID':_0xa46f8f});}}}},'eror':function(_0x12912f){var _0x4da0d6=_0x295f09;console[_0x4da0d6(0xaf)](_0x4da0d6(0xf6));}});}function ViewStepInTemp(_0x14666a){var _0x56f039=_0x58096d,_0x5798d1='';$(_0x56f039(0xbf))[_0x56f039(0xff)](),StpApprovers=[];for(i=0x0;i<_0x14666a[_0x56f039(0x10d)];i++){var _0x31b7db=i+0x1;_0x5798d1+=_0x56f039(0xe6)+_0x14666a[i]['Id']+'\x22><div\x20class=\x22topsec\x22>',_0x5798d1+=_0x56f039(0xd1)+_0x14666a[i][_0x56f039(0xbe)]+'</h3>',_0x5798d1+=_0x56f039(0x130),_0x5798d1+='<button\x20class=\x22dropdown-toggle\x22\x20type=\x22button\x22\x20data-toggle=\x22dropdown\x22>',_0x5798d1+=_0x56f039(0xfe),_0x5798d1+=_0x56f039(0xab),_0x5798d1+=_0x56f039(0xe9)+_0x31b7db+','+_0x14666a[i]['Id']+')\x22><a\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-pencil\x22></i>\x20Edit</a></li>',_0x5798d1+=_0x56f039(0xb3)+_0x14666a[i]['Id']+_0x56f039(0xa1),_0x5798d1+='</div>',_0x5798d1+=_0x56f039(0x10c),_0x5798d1+='<div\x20style=\x22clear:both\x22></div>',_0x5798d1+=_0x56f039(0xe1);if(_0x14666a[i][_0x56f039(0x12b)]==_0x56f039(0x137)){if(_0x14666a[i]['ApproversId']!=null)var _0x5d1f26=_0x14666a[i][_0x56f039(0x11e)]['results'];_0x5798d1+='<div\x20class=\x22imgsetion\x22>',_0x5798d1+=_0x56f039(0xa5),_0x5798d1+=_0x56f039(0x10c),_0x5798d1+=_0x56f039(0x102),_0x5798d1+=_0x56f039(0x113)+_0x14666a[i][_0x56f039(0xf0)]+'</h4>',_0x5798d1+=_0x56f039(0x10c);}else{if(_0x14666a[i][_0x56f039(0x11e)]!=null)var _0x5d1f26=_0x14666a[i][_0x56f039(0x11e)][_0x56f039(0x12e)];for(j=0x0;j<_0x5d1f26[_0x56f039(0x10d)];j++){var _0xd77179=AllTaskUsersEmployeeuser[_0x56f039(0xf2)](function(_0x4eac01){var _0x4a0026=_0x56f039;return _0x4eac01[_0x4a0026(0xde)]==_0x5d1f26[j];});console[_0x56f039(0xaf)](_0xd77179);var _0x50bd7e=_spPageContextInfo['webAbsoluteUrl']+'/_layouts/15/userphoto.aspx?accountname='+escapeProperly(_0xd77179[0x0]['EMail']);_0x5798d1+='<div\x20class=\x22imgsetion\x22><div\x20class=\x22empoyeeimg\x22\x20style=\x22float:left;\x22><img\x20title=\x22'+_0xd77179[0x0]['LoginName']+_0x56f039(0x125)+_0x50bd7e+_0x56f039(0xc9),_0x5798d1+=_0x56f039(0xa3)+_0xd77179[0x0][_0x56f039(0x13e)]+'</h4><a\x20href=\x22#\x22>'+_0xd77179[0x0]['EMail']+'</a></div>';}}_0x5798d1+=_0x56f039(0xb7);}$(_0x56f039(0xbf))[_0x56f039(0xfd)](_0x5798d1);}function ViewStep(){var _0x41e10e=_0x58096d,_0x121f0c='';$(_0x41e10e(0x9b))['empty'](),SavedStpApprovers=[];for(i=0x0;i<ApproerSteps['length'];i++){var _0x41b2ee=i+0x1;_0x121f0c+=_0x41e10e(0xe6)+ApproerSteps[i]['Id']+_0x41e10e(0x101),_0x121f0c+=_0x41e10e(0xd1)+ApproerSteps[i][_0x41e10e(0xbe)]+_0x41e10e(0x131),_0x121f0c+='</div>',_0x121f0c+='<div\x20style=\x22clear:both\x22></div>',_0x121f0c+=_0x41e10e(0xe1);if(ApproerSteps[i][_0x41e10e(0x12b)]==_0x41e10e(0x137))_0x121f0c+=_0x41e10e(0xc5),_0x121f0c+=_0x41e10e(0xa5),_0x121f0c+=_0x41e10e(0x10c),_0x121f0c+=_0x41e10e(0x102),_0x121f0c+=_0x41e10e(0x113)+ApproerSteps[i]['ApproverRole']+'</h4>',_0x121f0c+=_0x41e10e(0x10c);else{if(ApproerSteps[i][_0x41e10e(0x11e)]!=null)var _0xaeb977=ApproerSteps[i]['ApproversId'][_0x41e10e(0x12e)];for(j=0x0;j<_0xaeb977[_0x41e10e(0x10d)];j++){var _0x4c65be=AllTaskUsersEmployeeuser[_0x41e10e(0xf2)](function(_0x86f6a6){return _0x86f6a6['UserId']==_0xaeb977[j];});console[_0x41e10e(0xaf)](_0x4c65be);var _0x1d4e5e=_spPageContextInfo[_0x41e10e(0xb1)]+'/_layouts/15/userphoto.aspx?accountname='+escapeProperly(_0x4c65be[0x0]['EMail']);_0x121f0c+=_0x41e10e(0xd7)+_0x4c65be[0x0]['LoginName']+'\x22\x20src=\x22'+_0x1d4e5e+_0x41e10e(0xc9),_0x121f0c+=_0x41e10e(0xa3)+_0x4c65be[0x0][_0x41e10e(0x13e)]+_0x41e10e(0xf8)+_0x4c65be[0x0][_0x41e10e(0x124)]+'</a></div>';}}_0x121f0c+=_0x41e10e(0xb7);}$('#stepboxView')['append'](_0x121f0c);}function DeleteEStep(_0x339074){var _0x2db32a=_0x58096d;if(ActiveProessCount==0x0){if(confirm(_0x2db32a(0xe5))){$('#'+_0x339074)[_0x2db32a(0x135)](),siteURL=_spPageContextInfo[_0x2db32a(0xb1)],console[_0x2db32a(0xaf)](_0x2db32a(0x12d)+siteURL);var _0x158afb=siteURL+'/_api/lists/getbytitle(\x27ApprovalTemplateSteps\x27)/items(\x27'+_0x339074+'\x27)';$[_0x2db32a(0xef)]({'url':_0x158afb,'type':_0x2db32a(0x11f),'headers':{'X-RequestDigest':$(_0x2db32a(0x118))[_0x2db32a(0x111)](),'IF-MATCH':'*','X-HTTP-Method':_0x2db32a(0xb5)},'async':![],'success':function(_0x4293c2){var _0x4229ee=_0x2db32a;alert(_0x4229ee(0x110));},'eror':function(_0x36937e){var _0x28fc3c=_0x2db32a;console[_0x28fc3c(0xaf)](_0x28fc3c(0xf6));}});}}else alert(_0x2db32a(0xcb));}function ClearDetails(){var _0x4f622e=_0x58096d;$(_0x4f622e(0xa9))[_0x4f622e(0x111)](''),$(_0x4f622e(0x8f))[_0x4f622e(0xf9)](_0x4f622e(0x13b),!![]),$(_0x4f622e(0xfc))[_0x4f622e(0xcc)](),$('.rolbox')['show']();}function SaveApprovers(){var _0x15c3b2=_0x58096d;if(StpApprovers[_0x15c3b2(0x10d)]>0x0){var _0x54aa4b='Step\x20Approvers',_0x686b1f=![];for(i=0x0;i<StpApprovers[_0x15c3b2(0x10d)];i++){var _0x538581=StpApprovers[i][_0x15c3b2(0xc0)],_0x5ef261=[];if(_0x538581[_0x15c3b2(0x10d)]>0x0)for(m=0x0;m<_0x538581[_0x15c3b2(0x10d)];m++){_0x538581[m]['Id']==null?_0x5ef261[_0x15c3b2(0x123)](_0x538581[m]):_0x5ef261[_0x15c3b2(0x123)](_0x538581[m]['Id']);}if(StpApprovers[i][_0x15c3b2(0x94)]==_0x15c3b2(0xa0))var _0x51625c=_0x15c3b2(0x137),_0x18c4ca={'__metadata':{'type':'SP.Data.ApprovalTemplateStepsListItem'},'TemplateIDId':CurrTenplateID,'Sequence_No':i+0x1,'StepName':StpApprovers[i][_0x15c3b2(0x13f)],'Title':_0x54aa4b,'ApproverRole':StpApprovers[i][_0x15c3b2(0xda)],'ApproverType':_0x51625c};else var _0x51625c=_0x15c3b2(0x93),_0x18c4ca={'__metadata':{'type':_0x15c3b2(0xd5)},'TemplateIDId':CurrTenplateID,'Sequence_No':i+0x1,'StepName':StpApprovers[i][_0x15c3b2(0x13f)],'Title':_0x54aa4b,'ApproversId':{'results':_0x5ef261},'ApproverType':_0x51625c};var _0x1871af=_spPageContextInfo[_0x15c3b2(0xb1)]+_0x15c3b2(0xcd);$[_0x15c3b2(0xef)]({'url':_0x1871af,'type':'POST','async':![],'data':JSON[_0x15c3b2(0x138)](_0x18c4ca),'headers':{'accept':'application/json;odata=verbose','Content-Type':_0x15c3b2(0x9c),'X-RequestDigest':$(_0x15c3b2(0x118))[_0x15c3b2(0x111)](),'X-HTTP-Method':_0x15c3b2(0x11f)},'success':function(_0x24d9b0){_0x686b1f=!![];},'error':function(_0x165ac1){var _0x50e73e=_0x15c3b2;console[_0x50e73e(0xaf)](_0x165ac1),_0x686b1f=![];}});}_0x686b1f&&(UpdateApproverStps(),alert(_0x15c3b2(0x13d)),$('#stepsapprover')[_0x15c3b2(0xb2)]('hide'));}}function UpdateApproverStps(){var _0x302286=_0x58096d,_0x24b99d=[];if(SavedStpApprovers['length']>0x0)var _0x49e964=_0x24b99d[_0x302286(0xb8)](SavedStpApprovers,StpApprovers);else var _0x49e964=StpApprovers;var _0x4798c4={'__metadata':{'type':_0x302286(0x10e)},'NumberOfSteps':_0x49e964[_0x302286(0x10d)]};$[_0x302286(0xef)]({'url':_spPageContextInfo[_0x302286(0xb1)]+_0x302286(0xc7)+CurrTenplateID+')','type':_0x302286(0x96),'async':![],'headers':{'accept':'application/json;odata=verbose','X-RequestDigest':$(_0x302286(0x118))[_0x302286(0x111)](),'content-Type':_0x302286(0x9c),'X-Http-Method':_0x302286(0x96),'If-Match':'*'},'data':JSON[_0x302286(0x138)](_0x4798c4),'success':function(_0x339e39){var _0x19b9c0=_0x302286;console[_0x19b9c0(0xaf)](_0x19b9c0(0xb9));},'error':function(_0x8a0da0){console['log'](_0x8a0da0),alert(_0x8a0da0);}});}var FirstStpApprover=[];function SaveApproverQueue(_0x1ed016){var _0x3f973c=_0x58096d,_0x2c1676=$['Deferred']();FirstStpApprover=[];if(SavedStpApprovers['length']>0x0){var _0x1313d6=_0x3f973c(0xac),_0x3d3200=![];for(i=0x0;i<SavedStpApprovers[_0x3f973c(0x10d)];i++){_0x1056ee=[];if(i==0x0)var _0xcdbb88=_0x3f973c(0x107);else var _0xcdbb88=_0x3f973c(0xd0);if(SavedStpApprovers[i][_0x3f973c(0x94)]=='Role\x20Based'){var _0x1c6e4d=SavedStpApprovers[i][_0x3f973c(0xda)];if(_0x1c6e4d==_0x3f973c(0xdd)){var _0x3c519e=AllTaskUsersEmployeeuser['filter'](function(_0x17a100){return _0x17a100['UserId']==_spPageContextInfo['userId'];});_0x3c519e[_0x3f973c(0x10d)]>0x0?(i==0x0&&FirstStpApprover[_0x3f973c(0x123)](_0x3c519e[0x0][_0x3f973c(0xdd)]['ID']),StepApprver[_0x3f973c(0x123)]({'Name':_0x3c519e[0x0][_0x3f973c(0xdd)]['Title'],'Id':_0x3c519e[0x0]['Manager']['ID']}),_0x1056ee['push'](_0x3c519e[0x0][_0x3f973c(0xdd)]['ID'])):alert('Users\x20are\x20not\x20available\x20for\x20'+_0x1c6e4d);}else{if(_0x1c6e4d==_0x3f973c(0x10f)){var _0x26c874=getUserDept();GetlistData('/_api/web/lists/getbytitle(\x27ProcessApprovers\x27)/items?$select=Department/ID,Department/DepartmentName,WebPartName,Company/ID,Company,Contributors/ID,Contributors/Title&$expand=Company,Contributors,Department&$filter=Company/ID\x20eq\x20\x27'+companyIdNavigation+_0x3f973c(0x106)+_0x26c874+'\x27\x20and\x20WebPartName\x20eq\x20\x27Project\x27')[_0x3f973c(0xd6)](function(_0x2f5208){var _0x554196=_0x3f973c,_0x270f89=_0x2f5208['d'][_0x554196(0x12e)][0x0][_0x554196(0x98)][_0x554196(0x12e)];if(_0x270f89[_0x554196(0x10d)]>0x0)for(a=0x0;a<_0x270f89[_0x554196(0x10d)];a++){StepApprver['push']({'Name':_0x270f89[a]['Title'],'Id':_0x270f89[a]['ID']}),_0x1056ee[_0x554196(0x123)](_0x270f89[a]['ID']),i==0x0&&FirstStpApprover[_0x554196(0x123)](_0x270f89[a]['ID']);}else alert(_0x554196(0xf5)+_0x1c6e4d);});}else{if(_0x1c6e4d==_0x3f973c(0xdc)){var _0x26c874=getUserDept();GetlistData(_0x3f973c(0x10b)+companyIdNavigation+'\x27and\x20Department/DepartmentName\x20eq\x20\x27'+_0x26c874+_0x3f973c(0xee)+_0x1c6e4d+'\x27')['done'](function(_0x41f948){var _0x25b073=_0x3f973c,_0x59e69a=_0x41f948['d'][_0x25b073(0x12e)][0x0][_0x25b073(0x98)][_0x25b073(0x12e)];if(_0x59e69a[_0x25b073(0x10d)]>0x0)for(b=0x0;b<_0x59e69a[_0x25b073(0x10d)];b++){StepApprver['push']({'Name':_0x59e69a[b][_0x25b073(0xad)],'Id':_0x59e69a[b]['ID']}),_0x1056ee['push'](_0x59e69a[b]['ID']),i==0x0&&FirstStpApprover['push'](_0x59e69a[b]['ID']);}else alert(_0x25b073(0xf5)+_0x1c6e4d);});}else GetlistData(_0x3f973c(0xc4)+companyIdNavigation+'\x27and\x20WebPartName\x20eq\x20\x27'+_0x1c6e4d+'\x27')[_0x3f973c(0xd6)](function(_0x1c8c51){var _0x2955f6=_0x3f973c,_0x3a79fd=_0x1c8c51['d']['results'][0x0][_0x2955f6(0x98)][_0x2955f6(0x12e)];if(_0x3a79fd['length']>0x0)for(j=0x0;j<_0x3a79fd[_0x2955f6(0x10d)];j++){i==0x0&&FirstStpApprover[_0x2955f6(0x123)](_0x3a79fd[j]['ID']),StepApprver[_0x2955f6(0x123)]({'Name':_0x3a79fd[j]['Title'],'Id':_0x3a79fd[j]['ID']}),_0x1056ee[_0x2955f6(0x123)](_0x3a79fd[j]['ID']);}else alert('Users\x20are\x20not\x20available\x20for\x20'+_0x1c6e4d);});}}}else{var _0x17b1a2=SavedStpApprovers[i][_0x3f973c(0xc0)],_0x1056ee=[];for(m=0x0;m<_0x17b1a2['length'];m++){i==0x0&&FirstStpApprover[_0x3f973c(0x123)](_0x17b1a2[m]),_0x1056ee[_0x3f973c(0x123)](_0x17b1a2[m]);}}var _0x2d588c={'__metadata':{'type':_0x3f973c(0x134)},'RequestIDId':_0x1ed016,'TemplateIDId':CurrTenplateID,'Sequence_No':i+0x1,'StepName':SavedStpApprovers[i][_0x3f973c(0x13f)],'Status':_0xcdbb88,'Title':_0x1313d6,'ApproversId':{'results':_0x1056ee}},_0x16da29=_spPageContextInfo[_0x3f973c(0xb1)]+_0x3f973c(0x92);$[_0x3f973c(0xef)]({'url':_0x16da29,'type':'POST','async':![],'data':JSON[_0x3f973c(0x138)](_0x2d588c),'headers':{'accept':_0x3f973c(0x9c),'Content-Type':'application/json;odata=verbose','X-RequestDigest':$(_0x3f973c(0x118))['val'](),'X-HTTP-Method':'POST'},'success':function(_0x4836c2){_0x3d3200=!![];},'error':function(_0x3658fb){var _0x486d56=_0x3f973c;console[_0x486d56(0xaf)](_0x3658fb);}});}_0x3d3200&&UpdateProcessApprover(_0x1ed016,FirstStpApprover);}return def[_0x3f973c(0xea)]();}function UpdateProcessApprover(_0x573ad7,_0x5c51e2){var _0x4ae4b6=_0x58096d,_0x578b13=$[_0x4ae4b6(0x117)](),_0x37f39a={'__metadata':{'type':_0x4ae4b6(0x108)},'RequestById':_spPageContextInfo[_0x4ae4b6(0xbd)],'ApproversId':{'results':_0x5c51e2}};debugger;return $[_0x4ae4b6(0xef)]({'url':_spPageContextInfo['webAbsoluteUrl']+_0x4ae4b6(0x97)+_0x573ad7+')','type':'PATCH','headers':{'accept':_0x4ae4b6(0x9c),'X-RequestDigest':$(_0x4ae4b6(0x118))[_0x4ae4b6(0x111)](),'content-Type':_0x4ae4b6(0x9c),'X-Http-Method':'PATCH','If-Match':'*'},'data':JSON[_0x4ae4b6(0x138)](_0x37f39a),'success':function(_0x37ab10){var _0x13fa79=_0x4ae4b6;alert('The\x20approval\x20reuqest\x20has\x20been\x20submitted\x20successfully.'),console[_0x13fa79(0xaf)]('Approvers\x20updated.'),window[_0x13fa79(0x95)][_0x13fa79(0x114)](_0x13fa79(0x100));},'error':function(_0x43a1bd){var _0x408528=_0x4ae4b6;console[_0x408528(0xaf)](_0x43a1bd),alert(_0x408528(0x120));}}),_0x578b13['promise']();}var AllTaskUsersEmployeeuser=[],RestQuery,unique_Department=[],duplicate_Department=[];function GetOwnerUser(){var _0x566382=_0x58096d,_0x27f571=titanForWork[_0x566382(0x121)]('CompanyId');RestQuery=_0x566382(0x119)+_0x27f571+'\x27&$top=5000',$[_0x566382(0xa7)](CommonFunction[_0x566382(0x128)](_0x566382(0x116),RestQuery))['done'](function(_0x96ca17){var _0x1fdcc3=_0x566382;try{for(var _0x100050=0x0;_0x100050<_0x96ca17['results'][_0x1fdcc3(0x10d)];_0x100050++){var _0x449f73=_0x96ca17[_0x1fdcc3(0x12e)][_0x100050][_0x1fdcc3(0x13a)];AllTaskUsersEmployeeuser[_0x1fdcc3(0x123)]({'UserId':_0x96ca17[_0x1fdcc3(0x12e)][_0x100050][_0x1fdcc3(0xbb)]['Id'],'EMail':_0x96ca17[_0x1fdcc3(0x12e)][_0x100050][_0x1fdcc3(0xbb)][_0x1fdcc3(0x124)],'LoginName':_0x96ca17[_0x1fdcc3(0x12e)][_0x100050][_0x1fdcc3(0xbb)][_0x1fdcc3(0xad)]?_0x96ca17[_0x1fdcc3(0x12e)][_0x100050][_0x1fdcc3(0xbb)][_0x1fdcc3(0xad)]:'NA','Designation':_0x96ca17[_0x1fdcc3(0x12e)][_0x100050]['Designation']?_0x96ca17[_0x1fdcc3(0x12e)][_0x100050][_0x1fdcc3(0xeb)]:'NA','Manager':_0x449f73,'DepartmentId':_0x96ca17[_0x1fdcc3(0x12e)][_0x100050]['Department']['ID'],'Department':_0x96ca17[_0x1fdcc3(0x12e)][_0x100050][_0x1fdcc3(0xcf)][_0x1fdcc3(0x13c)],'FullName':_0x96ca17[_0x1fdcc3(0x12e)][_0x100050]['FullName'],'CompanyID':_0x96ca17['results'][_0x100050][_0x1fdcc3(0xa6)]['ID'],'EmployeeID':_0x96ca17[_0x1fdcc3(0x12e)][_0x100050]['Id'],'Skill':_0x96ca17[_0x1fdcc3(0x12e)][_0x100050][_0x1fdcc3(0xca)]?_0x96ca17[_0x1fdcc3(0x12e)][_0x100050]['SkillSet']:'NA'});}}catch(_0xf9fdb){alert(_0xf9fdb);}});}function _0x2edc(){var _0x48a1c9=['location','PATCH','/_api/web/lists/getbytitle(\x27ApprovalProcessList\x27)/items(','Contributors','/_api/web/lists/getbytitle(\x27Employees\x27)/items?$select=Department/Id,Department/DepartmentName&$expand=Department&$filter=LogonName/ID\x20eq\x20\x27','EntityData','#stepboxView','application/json;odata=verbose','value','SPClientPeoplePickerDict','</a></div>','Role',')\x22><a\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-trash\x22></i>\x20Delete</a></li></ul>','390','</div></div><div\x20class=\x22imagecontent\x22><h4>','Stepuser','<img\x20src=\x22https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/ProcessApproval/assets/images/user-circle.png\x22\x20alt=\x22\x22\x20data-themekey=\x22#\x22>','Company','when','16aOEerP','#txtStepName','Stepuser_TopSpan','<ul\x20class=\x22dropdown-menu\x22>','Step\x20Approvers','Title','resolve','log','318AyMrnm','webAbsoluteUrl','modal','<li\x20onclick=\x22DeleteEStep(','1479819uzkslV','DELETE','<li><div\x20class=\x22topsec\x22>','</div></li>','concat','Temp\x20updated.','</ul></div></div>','LogonName','<li\x20onclick=\x22EditStep(','userId','StepName','.stepbox','UsrID','change','show','356253mXBGxP','/_api/web/lists/getbytitle(\x27ProcessApprovers\x27)/items?$select=WebPartName,Company/ID,Company,Contributors/ID,Contributors/Title&$expand=Company,Contributors&$filter=Company/ID\x20eq\x20\x27','<div\x20class=\x22imgsetion\x22>','36VcnaJW','/_api/web/lists/getbytitle(\x27ApprovalProcessMaster\x27)/items(','StUser','\x22\x20alt=\x22\x22\x20data-themekey=\x22#\x22>','SkillSet','Requests\x20are\x20active,\x20kinldy\x20take\x20your\x20action\x20later!','hide','/_api/web/lists/getbytitle(\x27ApprovalTemplateSteps\x27)/items','splice','Department','Not\x20Started','<h3>','#ddlroles','User','split','SP.Data.ApprovalTemplateStepsListItem','done','<div\x20class=\x22imgsetion\x22><div\x20class=\x22empoyeeimg\x22\x20style=\x22float:left;\x22><img\x20title=\x22','/_api/web/getuserbyid(','ResolvePrincipalSource','StRole','AddUserKeys','Head\x20of\x20the\x20Department','Manager','UserId','input[name=\x22optradio\x22]','parentNode','<div\x20class=\x22flexitem\x22>','/_api/web/lists/getbytitle(\x27ApprovalProcessMaster\x27)/items?$select=Id,Title,NumberOfRequest_Active,TemplateName,Active&$filter=ID\x20eq\x20\x27','11897795ngqDpl','/_layouts/15/userphoto.aspx?accountname=','Are\x20you\x20sure\x20you\x20want\x20to\x20delete\x20this\x20step?','<li\x20id=\x22','</h4>','#btnEditStep','<li\x20onclick=\x22EditEStep(','promise','Designation','32278AVneGr','.rolbox','\x27\x20and\x20WebPartName\x20eq\x20\x27','ajax','ApproverRole','[id$=\x27Stepuser_TopSpan\x27]','filter','/_api/web/lists/getbytitle(\x27ApprovalTemplateSteps\x27)/items(','GetAllUserInfo','Users\x20are\x20not\x20available\x20for\x20','An\x20error\x20occurred.\x20Please\x20try\x20again.','input[name=\x27optradio\x27]:checked','</h4><a\x20href=\x22#\x22>','prop',',this)\x22><a\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-pencil\x22\x20></i>\x20Edit</a></li>','3637304zsRuEA','.usrbox','append','<i\x20class=\x22fa\x20fa-ellipsis-v\x22\x20aria-hidden=\x22true\x22></i></button>','empty','approvals.aspx','\x22><div\x20class=\x22topsec\x22>','<div\x20class=\x22imagecontent\x22>','4122HoOcco','#btnAddStep','20BCOXUS','\x27and\x20Department/DepartmentName\x20eq\x20\x27','Pending','SP.Data.ApprovalProcessListListItem','.sp-peoplepicker-editorInput',',this)\x22><a\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-trash\x22></i>\x20Delete</a></li>','/_api/web/lists/getbytitle(\x27ProcessApprovers\x27)/items?$select=Department/ID,Department/DepartmentName,WebPartName,Company/ID,Company,Contributors/ID,Contributors/Title&$expand=Company,Contributors,Department&$filter=Company/ID\x20eq\x20\x27','</div>','length','SP.Data.ApprovalProcessMasterListItem','Departmental\x20Project\x20Admin','Selected\x20step\x20has\x20been\x20deleted.','val','PrincipalAccountType','<h4>','replace','<i\x20class=\x22fa\x20fa-ellipsis-v\x22\x20aria-hidden=\x22true\x22></i>\x20</button>','Employees','Deferred','#__REQUESTDIGEST','?$select=*,LogonName/EMail,LogonName/Title,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail,Department/ID,\x20Department/DepartmentName,Company/ID,ManagerLoginName/ID,ManagerLoginName/Title&$orderby=\x20FullName\x20asc\x20&$expand=LogonName,Department,Company,ManagerLoginName\x20&$filter=\x20Status\x20eq\x20\x27Active\x27\x20and\x20Company/ID\x20eq\x20\x27','click','2710seBkuf','Email','Please\x20enter\x20Step\x20name.','ApproversId','POST','error','getQueryStringParameter','siteAbsoluteUrl','push','EMail','\x22\x20src=\x22','width','<li\x20onclick=\x22DeleteStep(','getItemsWithQueryItem','ready','<button\x20class=\x22dropdown-toggle\x22\x20type=\x22button\x22\x20data-toggle=\x22dropdown\x22>','ApproverType','171115blHoDK','from\x20top\x20nav\x20-\x20','results','DisplayText','<div\x20class=\x22dropdown\x20pull-right\x22>','</h3>','findIndex','Current\x20step\x20is\x20updated.','SP.Data.ApprovalProcessQueueListItem','remove','Key','Role\x20Based','stringify','GET','ManagerLoginName','checked','DepartmentName','Approvers\x20saved\x20successfully','LoginName','StName','SPClientPeoplePicker_InitStandaloneControlWrapper','Width','User,DL,SecGroup,SPGroup','input[name=optradio][value=Role]','SearchPrincipalSource','<div\x20style=\x22clear:both\x22></div>','/_api/web/lists/getbytitle(\x27ApprovalProcessQueue\x27)/items','Specific','Type'];_0x2edc=function(){return _0x48a1c9;};return _0x2edc();}var LoggedUserDept='';function getUserDept(){var _0x2c0c79=_0x58096d,_0x21ba5b=_spPageContextInfo[_0x2c0c79(0x122)];return console[_0x2c0c79(0xaf)](_0x21ba5b),$['ajax']({'url':_spPageContextInfo['webAbsoluteUrl']+_0x2c0c79(0x99)+_spPageContextInfo['userId']+'\x27','method':_0x2c0c79(0x139),'async':![],'headers':{'Accept':'application/json;\x20odata=verbose'},'success':function(_0x572c26){var _0x5a3acd=_0x2c0c79;console[_0x5a3acd(0xaf)](_0x572c26),LoggedUserDept=_0x572c26['d'][_0x5a3acd(0x12e)][0x0][_0x5a3acd(0xcf)][_0x5a3acd(0x13c)];},'error':function(_0x276771){console['log'](_0x276771);}}),LoggedUserDept;}function GetUserLogin(_0x25f8d5){var _0x522d4d=_0x58096d,_0x5a99db='',_0x412955=_spPageContextInfo[_0x522d4d(0xb1)]+_0x522d4d(0xd8)+_0x25f8d5+')',_0x1a4c51={'accept':_0x522d4d(0x9c)};return $[_0x522d4d(0xef)]({'url':_0x412955,'contentType':_0x522d4d(0x9c),'headers':_0x1a4c51,'async':![],'success':function(_0x389290){var _0x23af55=_0x522d4d;_0x5a99db=_0x389290['d'][_0x23af55(0x13e)]['split']('|')[0x2];},'error':function(_0x4ca532){var _0x1ca04a=_0x522d4d;console[_0x1ca04a(0xaf)](_0x4ca532);}}),_0x5a99db;}var ActiveProessCount='';function _0x219b(_0x4c2da3,_0x25ba79){var _0x2edce1=_0x2edc();return _0x219b=function(_0x219b22,_0x4f0a5f){_0x219b22=_0x219b22-0x8d;var _0x294abd=_0x2edce1[_0x219b22];return _0x294abd;},_0x219b(_0x4c2da3,_0x25ba79);}function GetTempDetails(_0x5baa03){var _0x153e3e=_0x58096d;$[_0x153e3e(0xef)]({'async':![],'url':_spPageContextInfo[_0x153e3e(0xb1)]+_0x153e3e(0xe2)+_0x5baa03+'\x27','type':_0x153e3e(0x139),'headers':{'accept':_0x153e3e(0x9c)},'success':function(_0x5ad2aa){var _0x235694=_0x153e3e;ActiveProessCount=_0x5ad2aa['d'][_0x235694(0x12e)][0x0]['NumberOfRequest_Active'];},'error':function(_0x22da7a){var _0x41d86c=_0x153e3e;console[_0x41d86c(0xaf)](_0x22da7a);}});}