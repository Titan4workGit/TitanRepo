﻿(function(_0x14e233,_0x756384){var _0x61ed37=_0x2575,_0x1a1c04=_0x14e233();while(!![]){try{var _0xa9ecef=parseInt(_0x61ed37(0x19c))/0x1*(parseInt(_0x61ed37(0x170))/0x2)+parseInt(_0x61ed37(0x190))/0x3+-parseInt(_0x61ed37(0x14c))/0x4+parseInt(_0x61ed37(0x176))/0x5*(-parseInt(_0x61ed37(0x160))/0x6)+parseInt(_0x61ed37(0x1aa))/0x7*(-parseInt(_0x61ed37(0x1a5))/0x8)+parseInt(_0x61ed37(0x15a))/0x9+parseInt(_0x61ed37(0x1b1))/0xa;if(_0xa9ecef===_0x756384)break;else _0x1a1c04['push'](_0x1a1c04['shift']());}catch(_0x4553f4){_0x1a1c04['push'](_0x1a1c04['shift']());}}}(_0x4958,0x96c39));var txtProjectID=GetQueryStringValue('projectId'),UpdatePercentage=0x0;$(document)['ready'](function(){var _0x39ea87=_0x2575;GetAllModuleByProjectId(),$('#txtCompletionEdit')[_0x39ea87(0x1a2)](function(_0x199fad){var _0x4d4415=_0x39ea87;this[_0x4d4415(0x16f)]==_0x4d4415(0x15c)&&$(_0x4d4415(0x1a7))['val'](_0x4d4415(0x180));}),$('#updateStatus')[_0x39ea87(0x1a2)](function(_0x1470c0){var _0x59fde7=_0x39ea87;this['value']==_0x59fde7(0x180)&&$('#txtCompletionEdit')[_0x59fde7(0x183)](_0x59fde7(0x15c));}),$(_0x39ea87(0x189))[_0x39ea87(0x1a2)](function(_0x58d99d){var _0x3921f9=_0x39ea87;this[_0x3921f9(0x16f)]=='100'&&$('#ProjectSatus')[_0x3921f9(0x183)](_0x3921f9(0x180));}),$('#ProjectSatus')[_0x39ea87(0x1a2)](function(_0x16f67a){var _0x85bc79=_0x39ea87;this[_0x85bc79(0x16f)]==_0x85bc79(0x180)&&$('#txtCompletion')[_0x85bc79(0x183)](_0x85bc79(0x15c));}),$(_0x39ea87(0x1a4))['click'](function(){var _0xabaf69=_0x39ea87,_0x371f2e=_0xabaf69(0x17a),_0x448c8e=$(_0xabaf69(0x17b))['val'](),_0x3d2977=$(_0xabaf69(0x163))['val'](),_0x3f2ea8=$(_0xabaf69(0x169))[_0xabaf69(0x14f)](),_0x575e02=$(_0xabaf69(0x159))['text'](),_0x14198d=$(_0xabaf69(0x14b))[_0xabaf69(0x183)](),_0x31445e=$(_0xabaf69(0x189))['val'](),_0x2723b7;if(ModuleValidation(_0x448c8e,_0x3d2977,_0x14198d,_0x31445e,_0x575e02)==!![]){var _0x1da146=GetItemTypeForListName(_0x371f2e);_0x2723b7={'__metadata':{'type':_0x1da146},'Title':_0x448c8e,'Description':_0x3d2977,'ProjectId':txtProjectID,'ProjectName':_0x3f2ea8,'Status':_0x575e02,'weightage':_0x14198d,'CompletionPercentage':_0x31445e},AddModule(_0x2723b7,_0x371f2e),$(_0xabaf69(0x16b))[_0xabaf69(0x1b6)]('hide');}}),$(_0x39ea87(0x17d))[_0x39ea87(0x19e)](function(){var _0x4a2e29=_0x39ea87,_0x3e0be6=_0x4a2e29(0x17a),_0x19e584=$('#updateModuleName')[_0x4a2e29(0x183)](),_0x37c198=$('#updadteDescription')[_0x4a2e29(0x183)](),_0xa27918=$(_0x4a2e29(0x16c))[_0x4a2e29(0x14f)](),_0x502411=$('#EditProjectWeightage')[_0x4a2e29(0x183)](),_0x427e60=$(_0x4a2e29(0x1ad))[_0x4a2e29(0x183)]();if(ModuleValidation(_0x19e584,_0x37c198,_0x502411,_0x427e60,_0xa27918)==!![]){var _0x2511dc,_0xa3bae5=GetItemTypeForListName(_0x3e0be6);_0x2511dc={'__metadata':{'type':_0xa3bae5},'Title':_0x19e584,'Description':_0x37c198,'Status':_0xa27918,'weightage':_0x502411,'CompletionPercentage':_0x427e60},UpdateModule(_0x2511dc,_0x3e0be6),$(_0x4a2e29(0x187))[_0x4a2e29(0x1b6)](_0x4a2e29(0x195));}}),$(_0x39ea87(0x152))[_0x39ea87(0x19e)](function(){var _0x3c26f1=_0x39ea87;if(CanAddModule==!![])$(_0x3c26f1(0x16b))[_0x3c26f1(0x1b6)]('show');else return alert(_0x3c26f1(0x184)),![];}),$(_0x39ea87(0x188))['click'](function(){var _0x5bf2a9=_0x39ea87;$(_0x5bf2a9(0x17b))[_0x5bf2a9(0x183)](''),$(_0x5bf2a9(0x163))[_0x5bf2a9(0x183)](''),$(_0x5bf2a9(0x14b))[_0x5bf2a9(0x183)]('1'),$('#txtCompletion')['val'](''),$('#ProjectSatus')[_0x5bf2a9(0x183)](_0x5bf2a9(0x1af));});});function ModuleValidation(_0x49fdaf,_0xba919e,_0x280a69,_0x256ba7,_0x511b89){var _0x37cd30=_0x2575;if(_0x49fdaf==''||_0x49fdaf==null)return alert(_0x37cd30(0x18d)),![];else{if(_0xba919e==''||_0xba919e==null)return alert('Kindly\x20fill\x20module\x20description.'),![];else{if(_0x256ba7==''||_0x256ba7==null)return alert('Kindly\x20fill\x20module\x20completion.'),![];else return parseFloat(_0x256ba7)>0x64||parseFloat(_0x256ba7)<0x0?(alert('Completion\x20percentage\x20cannot\x20be\x20greater\x20than\x20hundered\x20or\x20less\x20than\x20zero.'),![]):!![];}}}function GetQueryStringValue(_0x5ee0cc){var _0x23187c=_0x2575;_0x5ee0cc=_0x5ee0cc[_0x23187c(0x155)](/[\[]/,'\x5c[')[_0x23187c(0x155)](/[\]]/,'\x5c]');var _0x1e487c=new RegExp('[\x5c?&]'+_0x5ee0cc+_0x23187c(0x1ac)),_0x417a52=_0x1e487c[_0x23187c(0x1b3)](location['search']);return _0x417a52===null?'':decodeURIComponent(_0x417a52[0x1]['replace'](/\+/g,'\x20'));}function UpdateModule(_0x3f9064,_0x1414de){var _0x273ed0=_0x2575,_0x289cd3=$[_0x273ed0(0x18c)](),_0x131e1b=_spPageContextInfo['webAbsoluteUrl']+_0x273ed0(0x19b)+_0x1414de+'\x27)/items(\x27'+EditId+'\x27)';return $[_0x273ed0(0x164)]({'url':_0x131e1b,'type':_0x273ed0(0x17f),'async':![],'headers':{'accept':_0x273ed0(0x19f),'X-RequestDigest':$('#__REQUESTDIGEST')['val'](),'content-Type':'application/json;odata=verbose','IF-MATCH':'*','X-HTTP-Method':'MERGE'},'data':JSON['stringify'](_0x3f9064),'success':function(_0x47113f){var _0x4042ac=_0x273ed0;_0x289cd3[_0x4042ac(0x14e)](_0x47113f),alert(_0x4042ac(0x156)),$('#edit-module-modal')[_0x4042ac(0x1b6)](_0x4042ac(0x195)),GetAllModuleByProjectId(),updateCompletionPercent(),$('#updateModuleName')[_0x4042ac(0x183)](''),$(_0x4042ac(0x1a3))['val']('Active');},'eror':function(_0x5099f6){var _0x1a4498=_0x273ed0;_0x289cd3[_0x1a4498(0x193)](_0x5099f6),console[_0x1a4498(0x15f)](_0x1a4498(0x1a0));}}),_0x289cd3[_0x273ed0(0x1b2)]();}function AddModule(_0x1d6cd2,_0xeab5ec){var _0xea88da=_0x2575,_0xe4602f=$[_0xea88da(0x18c)]();return $['ajax']({'url':_spPageContextInfo['webAbsoluteUrl']+_0xea88da(0x182)+_0xeab5ec+_0xea88da(0x17c),'type':_0xea88da(0x17f),'async':![],'headers':{'accept':_0xea88da(0x19f),'X-RequestDigest':$(_0xea88da(0x18f))[_0xea88da(0x183)](),'content-Type':_0xea88da(0x19f)},'data':JSON['stringify'](_0x1d6cd2),'success':function(_0x7d628){var _0x25fcec=_0xea88da;_0xe4602f[_0x25fcec(0x14e)](_0x7d628),alert(_0x25fcec(0x1a9)),$(_0x25fcec(0x16b))['modal']('hide'),GetAllModuleByProjectId(),updateCompletionPercent(),$(_0x25fcec(0x17b))[_0x25fcec(0x183)](''),$(_0x25fcec(0x163))[_0x25fcec(0x183)](''),$(_0x25fcec(0x14b))['val']('1'),$(_0x25fcec(0x189))['val'](''),$('#ProjectSatus')[_0x25fcec(0x183)](_0x25fcec(0x1af));},'error':function(_0x3fd25c){var _0xca201e=_0xea88da;console['log'](JSON[_0xca201e(0x177)](_0x3fd25c)),_0xe4602f[_0xca201e(0x193)](_0x3fd25c);}}),_0xe4602f[_0xea88da(0x1b2)]();}function updateCompletionPercent(){var _0x2ed526=_0x2575,_0x47f1b2,_0x5a73e1=GetItemTypeForListName(_0x2ed526(0x194));_0x47f1b2={'__metadata':{'type':_0x5a73e1},'CompletionPercentage':parseInt(UpdatePercentage)};var _0x275786=$[_0x2ed526(0x18c)](),_0x38f5a7=_spPageContextInfo[_0x2ed526(0x192)]+_0x2ed526(0x1b5)+txtProjectID+'\x27)';return $['ajax']({'url':_0x38f5a7,'type':_0x2ed526(0x17f),'async':![],'headers':{'accept':'application/json;odata=verbose','X-RequestDigest':$('#__REQUESTDIGEST')[_0x2ed526(0x183)](),'content-Type':'application/json;odata=verbose','IF-MATCH':'*','X-HTTP-Method':_0x2ed526(0x15d)},'data':JSON[_0x2ed526(0x177)](_0x47f1b2),'success':function(_0x2b41bc){var _0x358d09=_0x2ed526;_0x275786[_0x358d09(0x14e)](_0x2b41bc);},'eror':function(_0x4d9e82){var _0x4f23f0=_0x2ed526;_0x275786['reject'](_0x4d9e82),console[_0x4f23f0(0x15f)](_0x4f23f0(0x1a0));}}),_0x275786[_0x2ed526(0x1b2)]();}function GetAllModuleByProjectId(){var _0x35041d=_0x2575;ExisitngTeamMemberArray=[];var _0xddcfea=0x0,_0x2d3496=0x0,_0x5b784a=0x0,_0x229d97=0x0,_0x1e4813=txtProjectID,_0x408811=_spPageContextInfo['webAbsoluteUrl']+_0x35041d(0x174)+_0x1e4813+'\x27';$[_0x35041d(0x164)]({'url':_0x408811,'headers':{'Accept':_0x35041d(0x19f)},'async':![],'success':function(_0x59688f){var _0x5341c7=_0x35041d,_0x348dec=$(_0x5341c7(0x179));_0x348dec[_0x5341c7(0x1b4)]('');var _0x34d784=_0x59688f['d']['results'],_0x2cc5d1;if(_0x34d784['length']>0x0)for(var _0x512d9c=0x0;_0x512d9c<_0x34d784['length'];_0x512d9c++){_0x34d784[_0x512d9c][_0x5341c7(0x18a)]!=_0x5341c7(0x197)&&(_0xddcfea=_0x34d784[_0x512d9c][_0x5341c7(0x17e)]*_0x34d784[_0x512d9c][_0x5341c7(0x186)],_0x2d3496=_0x2d3496+_0xddcfea,_0x5b784a=_0x34d784[_0x512d9c][_0x5341c7(0x17e)]+_0x5b784a);_0x2cc5d1+=_0x5341c7(0x157),_0x2cc5d1+=_0x5341c7(0x178)+_0x34d784[_0x512d9c][_0x5341c7(0x196)]+'</span></td>',_0x2cc5d1+=_0x5341c7(0x178)+_0x34d784[_0x512d9c][_0x5341c7(0x162)]+_0x5341c7(0x171);_0x34d784[_0x512d9c][_0x5341c7(0x17e)]==null?_0x2cc5d1+=_0x5341c7(0x151):_0x2cc5d1+=_0x5341c7(0x1ab)+_0x34d784[_0x512d9c][_0x5341c7(0x17e)]+_0x5341c7(0x15b);_0x34d784[_0x512d9c][_0x5341c7(0x186)]==null?_0x2cc5d1+='<td\x20class=\x22text-center\x22>0%</td>':_0x2cc5d1+=_0x5341c7(0x1ab)+_0x34d784[_0x512d9c]['CompletionPercentage']+_0x5341c7(0x173);if(_0x34d784[_0x512d9c]['Status']=='Active')_0x2cc5d1+=_0x5341c7(0x14d)+_0x34d784[_0x512d9c][_0x5341c7(0x18a)]+_0x5341c7(0x171);else{if(_0x34d784[_0x512d9c]['Status']==_0x5341c7(0x180))_0x2cc5d1+=_0x5341c7(0x150)+_0x34d784[_0x512d9c][_0x5341c7(0x18a)]+'</span></td>';else _0x34d784[_0x512d9c]['Status']==_0x5341c7(0x15e)?_0x2cc5d1+='<td\x20class=\x22text-center\x22><span\x20class=\x22\x20color-orange\x22>'+_0x34d784[_0x512d9c]['Status']+_0x5341c7(0x171):_0x2cc5d1+=_0x5341c7(0x1ae)+_0x34d784[_0x512d9c][_0x5341c7(0x18a)]+_0x5341c7(0x171);}_0x2cc5d1+='<td><div\x20class=\x22attendance-view-btn-box\x20text-center\x22>',_0x2cc5d1+=_0x5341c7(0x153)+_0x34d784[_0x512d9c]['Id']+_0x5341c7(0x185),_0x2cc5d1+='</tr>';}else _0x2cc5d1+=_0x5341c7(0x191),_0x2cc5d1+='<td\x20colspan=\x225\x22\x20style=\x22text-align:\x20center;\x22>No\x20modules\x20are\x20found...!</td>',_0x2cc5d1+='</tr>';_0x348dec[_0x5341c7(0x14a)](_0x2cc5d1),_0x229d97=_0x2d3496/_0x5b784a,UpdatePercentage=_0x229d97,displayCompletionChart(_0x229d97);},'eror':function(_0x10b72a){var _0x2f484a=_0x35041d;console[_0x2f484a(0x15f)]($('#txtSomethingWentWrong')[_0x2f484a(0x183)]());}});}function BindProjectModule(_0x5406d3){var _0x1dc010=_0x2575,_0x5025c9=_0x1dc010(0x17a);siteURL=_spPageContextInfo['webAbsoluteUrl']+_0x1dc010(0x182)+_0x5025c9+_0x1dc010(0x149)+_0x5406d3+'\x27',$[_0x1dc010(0x164)]({'url':siteURL,'headers':{'Accept':_0x1dc010(0x19f)},'async':![],'success':function(_0x570576){var _0x1fbe22=_0x1dc010;$(_0x1fbe22(0x187))[_0x1fbe22(0x1b6)]('show');var _0x4f2234=_0x570576['d'][_0x1fbe22(0x172)];if(_0x4f2234[_0x1fbe22(0x168)]>0x0){$(_0x1fbe22(0x1a1))[_0x1fbe22(0x183)](_0x4f2234[0x0][_0x1fbe22(0x196)]);var _0x26047a=$(_0x4f2234[0x0][_0x1fbe22(0x162)])[_0x1fbe22(0x14f)]();$('#updadteDescription')[_0x1fbe22(0x183)](_0x26047a),$(_0x1fbe22(0x1a7))[_0x1fbe22(0x183)](_0x4f2234[0x0][_0x1fbe22(0x18a)]),_0x4f2234[0x0]['weightage']==null?$(_0x1fbe22(0x165))[_0x1fbe22(0x183)](0x1):$('#EditProjectWeightage')['val'](_0x4f2234[0x0]['weightage']),_0x4f2234[0x0][_0x1fbe22(0x186)]==null?$(_0x1fbe22(0x1ad))['val'](''):$('#txtCompletionEdit')[_0x1fbe22(0x183)](_0x4f2234[0x0]['CompletionPercentage']),EditId=_0x5406d3,DisbledControls();}},'error':function(_0xb7d2fb){var _0x52112e=_0x1dc010;alert($('#txtSomethingWentWrong')[_0x52112e(0x183)]());}});}function GetItemTypeForListName(_0x5ab367){var _0x47b930=_0x2575;return'SP.Data.'+_0x5ab367['charAt'](0x0)[_0x47b930(0x19d)]()+_0x5ab367[_0x47b930(0x1b0)]('\x20')[_0x47b930(0x167)]('')[_0x47b930(0x1a8)](0x1)+'ListItem';}function _0x2575(_0x39dad1,_0x213061){var _0x495820=_0x4958();return _0x2575=function(_0x257537,_0x51b266){_0x257537=_0x257537-0x149;var _0x1c8195=_0x495820[_0x257537];return _0x1c8195;},_0x2575(_0x39dad1,_0x213061);}function displayCompletionChart(_0x22c861){var _0x3dd295=_0x2575;$(_0x3dd295(0x198))[_0x3dd295(0x1b4)](''),$(_0x3dd295(0x198))['append']('<p\x20id=\x22percent\x22\x20style=\x22display:none;\x22></p>'),isNaN(_0x22c861)&&(_0x22c861=0x0),_0x22c861=_0x22c861+'%',$(_0x3dd295(0x1a6))['text'](_0x22c861),$(_0x3dd295(0x198))[_0x3dd295(0x166)]({'strokeWidth':0x11,'bgColor':_0x3dd295(0x16a),'ringColor':'#338AFF','textColor':_0x3dd295(0x175),'valElement':'p','fontSize':_0x3dd295(0x158),'fontWeight':_0x3dd295(0x16d)}),$(_0x3dd295(0x18b))[_0x3dd295(0x199)]('dy','5'),$(_0x3dd295(0x181))[_0x3dd295(0x199)](_0x3dd295(0x161),_0x3dd295(0x154));}function DisbledControls(){var _0xaf09cf=_0x2575;CanAddModule==![]&&($(_0xaf09cf(0x1a1))[_0xaf09cf(0x199)](_0xaf09cf(0x19a),_0xaf09cf(0x19a)),$(_0xaf09cf(0x16e))[_0xaf09cf(0x199)]('disabled',_0xaf09cf(0x19a)),$(_0xaf09cf(0x165))[_0xaf09cf(0x199)](_0xaf09cf(0x19a),_0xaf09cf(0x19a)),$(_0xaf09cf(0x1ad))['attr'](_0xaf09cf(0x19a),'disabled'),$(_0xaf09cf(0x1a7))[_0xaf09cf(0x199)]('disabled',_0xaf09cf(0x19a)),$('#btnupdateModule')[_0xaf09cf(0x18e)]());}function _0x4958(){var _0x32190f=['Deferred','Kindly\x20fill\x20module\x20name.','remove','#__REQUESTDIGEST','3340407mAMkOR','<tr>','webAbsoluteUrl','reject','ProjectDetails','hide','Title','Inactive','#CompletionPercent','attr','disabled','/_api/lists/getbytitle(\x27','3503LmKhAe','toUpperCase','click','application/json;odata=verbose','An\x20error\x20occurred.\x20Please\x20try\x20again.','#updateModuleName','change','#updateStatus\x20','#btnsubmitModule','4410416VgWzqn','#percent','#updateStatus','slice','Project\x20module\x20submitted.','14SxVeZM','<td\x20class=\x22text-center\x22>','=([^&#]*)','#txtCompletionEdit','<td\x20class=\x22text-center\x22><span\x20class=\x22\x20color-red2\x22>','Active','split','12762750GpWLik','promise','exec','html','/_api/lists/getbytitle(\x27ProjectDetails\x27)/items(\x27','modal','\x27)/items?$select=*&$Filter=Id\x20eq\x20\x27','append','#ProjectWeightage','3423272wJJWoE','<td\x20class=\x22text-center\x22><span\x20class=\x22\x20color-blue\x22>','resolve','text','<td\x20class=\x22text-center\x22><span\x20class=\x22\x20color-green\x22>','<td\x20class=\x22text-center\x22>1</td>','#btnaddModule','<a\x20href=\x22javascript:void(0);\x22\x20onclick=\x22BindProjectModule(','0\x200\x20200\x20200','replace','Module\x20updated\x20successfully','<tr\x20class=\x22text-left\x22>','20px','#ProjectSatus\x20option:selected','4123953UVzkpi','</td>','100','MERGE','Hold','log','426dFMXNZ','viewBox','Description','#txtBiomodule','ajax','#EditProjectWeightage','percentageLoader','join','length','#txtProjectName','#d9d9d9','#add-module-modal','#updateStatus\x20option:selected','normal','#updadteDescription','value','230KKTuOa','</span></td>','results','%</td>','/_api/web/lists/getbytitle(\x27ProjectModules\x27)/items?$select=*&$Filter=ProjectId\x20eq\x20\x27','#9a9a9a','47525spYnIa','stringify','<td><span>','#viewALLModule','ProjectModules','#txtTitlemodule','\x27)/items','#btnupdateModule','weightage','POST','Completed','svg','/_api/web/lists/getbytitle(\x27','val','You\x20are\x20not\x20authorized\x20to\x20perform\x20this\x20action.',');\x22\x20class=\x22custom-view-btn\x22><i\x20class=\x22fa\x20fa-pencil\x22></i></a></div></td>','CompletionPercentage','#edit-module-modal','#btnCancelModule','#txtCompletion','Status','tspan'];_0x4958=function(){return _0x32190f;};return _0x4958();}