var _0x327584=_0x4d7b;(function(_0x1e782a,_0x3f2d15){var _0xe2d5d3=_0x4d7b,_0xd9f6d5=_0x1e782a();while(!![]){try{var _0xa4894a=parseInt(_0xe2d5d3(0x124))/0x1*(-parseInt(_0xe2d5d3(0x11f))/0x2)+parseInt(_0xe2d5d3(0x1cd))/0x3*(parseInt(_0xe2d5d3(0x1f3))/0x4)+parseInt(_0xe2d5d3(0x119))/0x5+-parseInt(_0xe2d5d3(0x157))/0x6*(parseInt(_0xe2d5d3(0x154))/0x7)+parseInt(_0xe2d5d3(0x1c3))/0x8+parseInt(_0xe2d5d3(0x10d))/0x9+parseInt(_0xe2d5d3(0x18f))/0xa*(-parseInt(_0xe2d5d3(0x1dc))/0xb);if(_0xa4894a===_0x3f2d15)break;else _0xd9f6d5['push'](_0xd9f6d5['shift']());}catch(_0x56171b){_0xd9f6d5['push'](_0xd9f6d5['shift']());}}}(_0x29e6,0xa866d));var arrayLinksDoctype=new Array(),currentSharedItemId='',LoggedIn_TimeZone=new Date()[_0x327584(0x179)]()[_0x327584(0x1f0)](/([A-Z]+[\+-][0-9]+.*)/)[0x1];function _0x4d7b(_0x3e8272,_0x360a28){var _0x29e6c9=_0x29e6();return _0x4d7b=function(_0x4d7be8,_0x1c2d29){_0x4d7be8=_0x4d7be8-0xc8;var _0x44f2de=_0x29e6c9[_0x4d7be8];return _0x44f2de;},_0x4d7b(_0x3e8272,_0x360a28);}$(document)[_0x327584(0xd7)](function(){var _0x29de24=_0x327584;$(_0x29de24(0xcf))[_0x29de24(0x111)](function(){var _0x2820b5=_0x29de24;if($(_0x2820b5(0xcf))['attr'](_0x2820b5(0x17d))=='false'){var _0x50d7c7=_0x2820b5(0x19c),_0x3971ef=_0x2820b5(0xca),_0x12aa95=0xc8,_0x252bf1=0x190;currentDlg=SP['UI']['ModalDialog'][_0x2820b5(0xef)](_0x50d7c7,_0x3971ef,_0x12aa95,_0x252bf1),setTimeout(function(){GetDocumentsSharedWithMe();},0x64);}}),$(_0x29de24(0x1d9))[_0x29de24(0x101)](function(){var _0x765d1c=_0x29de24;permissionStaus=$(_0x765d1c(0x1d9))[_0x765d1c(0xd4)](),CurrentPermissionStatus(permissionStaus);});});function IconProperties(_0x2fc18f,_0x1af165){var _0x4fbc67=_0x327584,_0x442610=[];return _0x442610[_0x4fbc67(0x1ee)]=_0x2fc18f,_0x442610['image']=_0x1af165,_0x442610;}function CurrentPermissionStatus(_0x2f2add){var _0x29033d=_0x327584;LoggedUserSPGp=GetSPGroup();var _0x30acec='';for(var _0x3738da=0x0;_0x3738da<LoggedUserSPGp[_0x29033d(0x11a)];_0x3738da++){_0x30acec+=_0x29033d(0x1a7)+LoggedUserSPGp[_0x3738da]['Id']+'\x27\x20';}var _0x2ba920=getTargetGroupId();for(var _0x3738da=0x0;_0x3738da<_0x2ba920[_0x29033d(0x11a)];_0x3738da++){_0x30acec+='or\x20SharedUsers/ID\x20eq\x20\x27'+_0x2ba920[_0x3738da]+'\x27\x20';}_0x30acec=_0x30acec[_0x29033d(0xed)](0x0,_0x30acec[_0x29033d(0x11a)]-0x1)+')';if(_0x2f2add=='permited'){var _0x4310d1='&$orderby=Modified\x20desc&$filter=(SharedUsers/ID\x20eq\x20\x27'+_spPageContextInfo[_0x29033d(0x13c)]+'\x27\x20'+_0x30acec+_0x29033d(0x126)+_spPageContextInfo[_0x29033d(0x13c)]+'\x27';GetDocumentsSharedWithMe(_0x4310d1);}else{if(_0x2f2add==_0x29033d(0x1d1)){var _0x4310d1=_0x29033d(0x104)+_spPageContextInfo[_0x29033d(0x13c)]+'\x27\x20'+_0x30acec+_0x29033d(0x1bb)+_spPageContextInfo[_0x29033d(0x13c)]+'\x27';GetDocumentsSharedWithMe(_0x4310d1);}else{if(_0x2f2add=='Contribute'){var _0x4310d1=_0x29033d(0x104)+_spPageContextInfo[_0x29033d(0x13c)]+'\x27\x20'+_0x30acec+'\x20and\x20(PermissionType\x20eq\x20\x27Contribute\x27)\x20and\x20(PermissionStatus\x20ne\x20\x27Deleted\x27\x20and\x20PermissionStatus\x20ne\x20\x27Revoked\x27)\x20and\x20Author/ID\x20ne\x20\x27'+_spPageContextInfo[_0x29033d(0x13c)]+'\x27';GetDocumentsSharedWithMe(_0x4310d1);}else{if(_0x2f2add==_0x29033d(0x13b)){var _0x4310d1=_0x29033d(0x104)+_spPageContextInfo[_0x29033d(0x13c)]+'\x27\x20'+_0x30acec+_0x29033d(0x185)+_spPageContextInfo['userId']+'\x27';GetDocumentsSharedWithMe(_0x4310d1);}else{if(_0x2f2add=='Deleted'){var _0x4310d1='&$orderby=Modified\x20desc&$filter=(SharedUsers/ID\x20eq\x20\x27'+_spPageContextInfo['userId']+'\x27\x20'+_0x30acec+_0x29033d(0xd8)+_spPageContextInfo[_0x29033d(0x13c)]+'\x27';GetDocumentsSharedWithMe(_0x4310d1);}else{if(_0x2f2add==_0x29033d(0x19a)){var _0x4310d1=_0x29033d(0x104)+_spPageContextInfo[_0x29033d(0x13c)]+'\x27\x20'+_0x30acec+_0x29033d(0x113)+_spPageContextInfo['userId']+'\x27';GetDocumentsSharedWithMe(_0x4310d1);}}}}}}}function GetSPGroup(){var _0x2d7e45=_0x327584,_0x23a4f4=[],_0x338861=_spPageContextInfo[_0x2d7e45(0x15b)]+_0x2d7e45(0x198);return $[_0x2d7e45(0x133)]({'url':_0x338861,'method':_0x2d7e45(0x1e9),'async':![],'contentType':_0x2d7e45(0x1db),'headers':{'Accept':_0x2d7e45(0x1db)},'success':function(_0x117a10){var _0x3ae2a6=_0x2d7e45,_0x31a310=[];_0x31a310=_0x117a10['d']['Groups']['results'],_0x31a310[_0x3ae2a6(0x11a)]>0x0&&(_0x23a4f4=_0x31a310[_0x3ae2a6(0x105)](function(_0x31e99e){var _0x1576c8=_0x3ae2a6;return _0x31e99e[_0x1576c8(0x1ab)]!==_0x1576c8(0x130)&&_0x31e99e[_0x1576c8(0x1e5)]!==_0x1576c8(0x1ba)&&_0x31e99e[_0x1576c8(0x1e5)]!==_0x1576c8(0x1a6)&&_0x31e99e['Title']!==_0x1576c8(0x181)&&_0x31e99e[_0x1576c8(0x1e5)]!==_0x1576c8(0x186);}));},'eror':function(_0x736c38){var _0x1aec6e=_0x2d7e45;alert(JSON[_0x1aec6e(0x1aa)](_0x736c38));}}),_0x23a4f4;}function getTargetGroupId(){var _0x2eec49=_0x327584,_0x754761=[],_0x2f5209=_spPageContextInfo[_0x2eec49(0xd6)]+_0x2eec49(0x1ad);return $[_0x2eec49(0x133)]({'url':_0x2f5209,'type':_0x2eec49(0x1e9),'headers':{'accept':_0x2eec49(0x1db)},'async':![],'success':function(_0x59c12e,_0xeb2d33,_0x23eae3){var _0x2d12ab=_0x2eec49;_0x754761[_0x2d12ab(0x10c)](_0x59c12e['d']['Id']);},'error':function(_0x14b8c5,_0x119000,_0x21f83a){var _0x435541=_0x2eec49;console[_0x435541(0x108)](_0x14b8c5[_0x435541(0x1f8)][_0x435541(0x190)]);}}),_0x754761;}function GetDocumentsSharedWithMe(_0x27275b){var _0x452094=_0x327584,_0x3b82c0='',_0x42bd81='';AckCounter=0x0,currentSectionType=_0x452094(0x1af);if(_0x27275b==undefined){LoggedUserSPGp=GetSPGroup();var _0x2694eb='';for(var _0x97cbd4=0x0;_0x97cbd4<LoggedUserSPGp[_0x452094(0x11a)];_0x97cbd4++){_0x2694eb+=_0x452094(0x1a7)+LoggedUserSPGp[_0x97cbd4]['Id']+'\x27\x20';}var _0x107a92=getTargetGroupId();for(var _0x97cbd4=0x0;_0x97cbd4<_0x107a92['length'];_0x97cbd4++){_0x2694eb+=_0x452094(0x1a7)+_0x107a92[_0x97cbd4]+'\x27\x20';}_0x2694eb=_0x2694eb[_0x452094(0xed)](0x0,_0x2694eb['length']-0x1)+')';var _0x27275b=_0x452094(0xe8)+_spPageContextInfo['userId']+'\x27\x20'+_0x2694eb+_0x452094(0x1d7);}var _0x5de1f6=_spPageContextInfo['webAbsoluteUrl']+'/_api/web/Lists/GetByTitle(\x27SharedDocument\x27)/Items?$select=*,ID,SharedType,SharedFrom,DocumentNo,IsBlock,Details,ServerRedirectedEmbedURL,Title,DocumentURL,DocumentID,DocumentType,SharedGroup,PermissionStatus,PermissionType,SharedUsers/Title,SharedUsers/ID,Author/Title,Author/EMail,Author/ID&$orderby=Modified\x20desc&$expand=SharedUsers,Author'+_0x27275b;$['ajax']({'url':_0x5de1f6,'headers':{'Accept':_0x452094(0x1db)},'async':![],'success':function(_0x57756c){var _0x256155=_0x452094,_0x8ded=_0x57756c['d'][_0x256155(0x1da)],_0x196c0a='',_0x27f7ce='';for(var _0x4f40a5=0x0;_0x4f40a5<_0x8ded[_0x256155(0x11a)];_0x4f40a5++){_0x42bd81='',_0x3b82c0='';var _0x19a96f=_0x8ded[_0x4f40a5]['DocumentNo'];_0x19a96f==null&&(_0x19a96f='');var _0x452043=_0x8ded[_0x4f40a5][_0x256155(0x1c8)];(_0x452043==null||_0x452043==_0x256155(0xf2)||_0x452043==_0x256155(0x12e))&&(_0x452043='');var _0x9696c7='';_0x9696c7==null&&(_0x9696c7='');var _0x486185=_0x8ded[_0x4f40a5]['Details'];_0x486185==null&&(_0x486185='');var _0x54f54b=_0x8ded[_0x4f40a5][_0x256155(0x1c8)];(_0x54f54b==null||_0x54f54b==_0x256155(0xf2)||_0x54f54b==_0x256155(0x12e))&&(_0x54f54b='');var _0x1e4181=_0x8ded[_0x4f40a5][_0x256155(0xe4)];_0x1e4181==null&&(_0x1e4181='');var _0xdfcfa5=_0x8ded[_0x4f40a5]['PermissionStatus'];_0xdfcfa5!=_0x256155(0x13b)&&_0xdfcfa5!=_0x256155(0xfa)?_0xdfcfa5=_0x1e4181:_0xdfcfa5=_0xdfcfa5[_0x256155(0x18e)](_0x256155(0x199));var _0x59cf62='';_0x59cf62==null&&(_0x59cf62='');var _0x47d174=_0x8ded[_0x4f40a5][_0x256155(0x1e5)];_0x47d174==null&&(_0x47d174='');var _0x1c3919=_0x8ded[_0x4f40a5][_0x256155(0x18a)];_0x1c3919==null&&(_0x1c3919='');var _0x197f80='';_0x197f80==null&&(_0x197f80='');var _0x1ef272='';_0x1ef272==null&&(_0x1ef272='');var _0x43de54='',_0x495837=_0x8ded[_0x4f40a5][_0x256155(0x1a1)][_0x256155(0x1e5)],_0x246bfb=_0x47d174,_0x1f334b=_0x3b82c0=_0x8ded[_0x4f40a5][_0x256155(0x1bf)];if(_0x1f334b==null||_0x1f334b==''){_0x1f334b=_0x8ded[_0x4f40a5][_0x256155(0xdd)];if(_0x1f334b[_0x256155(0x177)]('DocumentManagementSystem')==!![]||_0x1f334b['includes']('DepartmentalDMS')==!![])_0x1f334b[_0x256155(0x177)](_0x256155(0x10a))==!![]?_0x3b82c0=_0x8ded[_0x4f40a5]['SiteURL']+_0x256155(0x1b3)+encodeURIComponent(_0x1f334b)+_0x256155(0x16e)+encodeURIComponent(_0x1f334b[_0x256155(0x14d)](0x0,_0x1f334b['lastIndexOf']('/')+0x0)):(CopyLibrary=_0x256155(0x132),_0x3b82c0=_0x8ded[_0x4f40a5][_0x256155(0xe0)]+'/DepartmentalDMS/Forms/AllItems.aspx?id='+encodeURIComponent(_0x1f334b)+'&parent='+encodeURIComponent(_0x1f334b['substr'](0x0,_0x1f334b['lastIndexOf']('/')+0x0)));else{var _0x3076d0=window[_0x256155(0x1ce)]['origin']+_0x1f334b[_0x256155(0x14d)](0x0,_0x1f334b[_0x256155(0x140)]('/')+0x0);_0x3b82c0=_0x3076d0+_0x256155(0x110)+encodeURIComponent(_0x1f334b)+_0x256155(0x16e)+encodeURIComponent(_0x1f334b[_0x256155(0x14d)](0x0,_0x1f334b[_0x256155(0x140)]('/')+0x0));}}else _0x1f334b=_0x3b82c0=_0x1f334b['replace']('interactivepreview',_0x256155(0x192)),_0x3b82c0=encodeURI(_0x3b82c0);var _0x4feba4='',_0x32bd37='',_0x114ae2='<span\x20class=\x27glyphicon\x20glyphicon-folder-open\x27></span>&nbsp;&nbsp;',_0x5c6adf='';_0x8ded[_0x4f40a5][_0x256155(0xe0)]=='null'||_0x8ded[_0x4f40a5][_0x256155(0xe0)]==null||_0x8ded[_0x4f40a5][_0x256155(0xe0)]==_0x256155(0x1ac)||_0x8ded[_0x4f40a5]['SiteURL']==undefined?encodeURI(_0x8ded[_0x4f40a5][_0x256155(0xdd)])['indexOf']('DepartmentalDMS')!=-0x1?SiteURL=window[_0x256155(0x1ce)]['origin']+encodeURI(_0x8ded[_0x4f40a5][_0x256155(0xdd)])[_0x256155(0x1a9)]('DepartmentalDMS')[0x0]:SiteURL=_spPageContextInfo['webAbsoluteUrl']:SiteURL=_0x8ded[_0x4f40a5][_0x256155(0xe0)];_0x8ded[_0x4f40a5]['SharedType']==null||_0x8ded[_0x4f40a5]['SharedType']==_0x256155(0x1d3)||_0x8ded[_0x4f40a5]['SharedType']==_0x256155(0x17a)?DMS_Type=_0x256155(0x125):DMS_Type=_0x8ded[_0x4f40a5][_0x256155(0x1f5)]+':\x20'+_0x8ded[_0x4f40a5][_0x256155(0x1f9)];if(_0x452043[_0x256155(0x172)]()!=_0x256155(0x13d)){var _0x285e66='.'+_0x47d174['substring'](_0x47d174[_0x256155(0x140)]('.')+0x1);Icon=_0x256155(0x145);if(_0x256155(0xcc)==_0x285e66||_0x256155(0x1b4)==_0x285e66)Icon='docx.png';else{if('.pdf'==_0x285e66)Icon=_0x256155(0x183);else{if(_0x256155(0x152)==_0x285e66||_0x256155(0x166)==_0x285e66||_0x256155(0x150)==_0x285e66||_0x256155(0x155)==_0x285e66||_0x256155(0x1a2)==_0x285e66||_0x256155(0x121)==_0x285e66||_0x256155(0x107)==_0x285e66)Icon=_0x256155(0x1d0);else{if(_0x256155(0xc8)==_0x285e66)Icon=_0x256155(0x149);else{if(_0x256155(0xff)==_0x285e66)Icon=_0x256155(0x139);else{if(_0x256155(0x1dd)==_0x285e66)Icon=_0x256155(0x1b6);else{if(_0x256155(0x14e)==_0x285e66)Icon=_0x256155(0x14f);else{if(_0x256155(0x122)==_0x285e66||_0x256155(0xeb)==_0x285e66||'.7z'==_0x285e66||_0x256155(0xfd)==_0x285e66||'.cab'==_0x285e66||_0x256155(0x1c7)==_0x285e66||_0x256155(0x18c)==_0x285e66)Icon=_0x256155(0x15a);else{if(_0x256155(0x17e)==_0x285e66||_0x256155(0xdc)==_0x285e66||_0x256155(0x19b)==_0x285e66||_0x256155(0x16c)==_0x285e66||_0x256155(0x15f)==_0x285e66||'.mov'==_0x285e66||_0x256155(0x1ed)==_0x285e66||_0x256155(0x1c0)==_0x285e66)Icon=_0x256155(0x1f4);else(_0x256155(0x187)==_0x285e66||_0x256155(0xe1)==_0x285e66||'.aac'==_0x285e66||_0x256155(0x174)==_0x285e66)&&(Icon=_0x256155(0x1a5));}}}}}}}}_0x8ded[_0x4f40a5][_0x256155(0x127)]!='Revoked'&&_0x8ded[_0x4f40a5][_0x256155(0x127)]!=_0x256155(0xfa)?(_0x8ded[_0x4f40a5][_0x256155(0x163)]==!![]?_0x42bd81=AckUserStatus(_0x8ded[_0x4f40a5]['Id'],_spPageContextInfo['userEmail'],_0x8ded[_0x4f40a5][_0x256155(0xdd)],_0x8ded[_0x4f40a5]['SiteURL'],_0x8ded[_0x4f40a5][_0x256155(0xe4)],_0x8ded[_0x4f40a5]['LibraryName'],_0x8ded[_0x4f40a5][_0x256155(0x1f9)]):_0x42bd81='',_0x42bd81[_0x256155(0x173)](_0x256155(0xdf))!==-0x1&&AckCounter++,_0x5c6adf=_0x256155(0x1e7)+encodeURI(_0x8ded[_0x4f40a5][_0x256155(0xdd)])+_0x256155(0x188),_0x4feba4='<a\x20href=\x22javascript:void(0);\x22\x20rel=\x22'+_0x8ded[_0x4f40a5]['Id']+_0x256155(0xd5)+_0x8ded[_0x4f40a5][_0x256155(0xdd)]+'\x22\x20onclick=\x22DisplayFileProperty(this,\x20\x27'+SiteURL+'\x27,\x20\x27'+DMS_Type+_0x256155(0x16d)+_0xdfcfa5+_0x256155(0x1ea)+Icon+_0x256155(0xd0)+Icon+'\x22>'+_0x246bfb+_0x256155(0xfe)):_0x4feba4=_0x256155(0x134)+Icon+_0x256155(0x10b)+Icon+'\x27>'+_0x246bfb+_0x256155(0xfe);}else Icon=_0x256155(0x137),_0x4feba4=_0x256155(0xe5)+encodeURI(_0x8ded[_0x4f40a5][_0x256155(0xdd)])+_0x256155(0x1ca)+_0x8ded[_0x4f40a5]['SiteURL']+_0x256155(0x1ca)+SiteURL+_0x256155(0x1ca)+DMS_Type+_0x256155(0x1ca)+_0xdfcfa5+_0x256155(0x1ca)+_0x8ded[_0x4f40a5]['Id']+'\x22,\x20\x22'+_0x8ded[_0x4f40a5]['Author'][_0x256155(0x1e5)]+_0x256155(0x1ca)+_0x8ded[_0x4f40a5][_0x256155(0x16b)]+_0x256155(0x1ca)+_0x8ded[_0x4f40a5][_0x256155(0x116)][_0x256155(0x1da)][0x0][_0x256155(0x1e5)]+_0x256155(0xf3)+Icon+_0x256155(0x10b)+Icon+'\x27>'+_0x246bfb+_0x256155(0xfe),_0x1c3919=_0x47d174;sharedFrom=sharedFromHTML=getSharedFromValue(_0x8ded[_0x4f40a5][_0x256155(0x1f5)],_0x8ded[_0x4f40a5][_0x256155(0x1f9)]);sharedFrom[_0x256155(0x173)](_0x256155(0x15d))!=-0x1&&(sharedFromHTML='');var _0x12634c=_spPageContextInfo[_0x256155(0xd6)]+_0x256155(0x1e8)+escapeProperly(_0x8ded[_0x4f40a5][_0x256155(0x1a1)][_0x256155(0x1b8)]);_0x43de54+=_0x256155(0xde)+_0x12634c+_0x256155(0x193),_0x43de54+=_0x256155(0x102)+_0x495837+'</h3><div\x20class=\x22ModifiedDate\x22>'+convertJSONDateAMPMWithDate(_0x8ded[_0x4f40a5][_0x256155(0x118)])+'</div></div></div><div\x20class=\x22SharedFromHTML\x22>'+sharedFromHTML+_0x256155(0xd1);_0x8ded[_0x4f40a5]['SharedType']==null&&(_0x8ded[_0x4f40a5]['SharedType']=_0x256155(0x1d3));var _0x344f0f='';if(_0xdfcfa5=='Restricted\x20View')_0x344f0f+=_0x256155(0x165),_0x344f0f+='<div\x20class=\x22AckBox\x22>'+_0x42bd81+'</div></div>';else{if(_0xdfcfa5==_0x256155(0x1d1))_0x344f0f+=_0x256155(0x106),_0x344f0f+=_0x256155(0x168)+_0x42bd81+_0x256155(0xd1);else _0xdfcfa5==_0x256155(0xd2)?(_0x344f0f+='<div\x20class=\x22PermissionBox\x22><div\x20class=\x22PermissionStatus\x22>Contribute</div>',_0x344f0f+=_0x256155(0x168)+_0x42bd81+_0x256155(0xd1)):_0x344f0f=_0x256155(0x11b)+_0xdfcfa5+'<div\x20class=\x22AckBox\x22>'+_0x42bd81+'</div></div></div>';}_0x8ded[_0x4f40a5][_0x256155(0x17f)]=='Yes'?_0x27f7ce=_0x27f7ce+'<tr><td>'+_0x4feba4+_0x256155(0x15c)+_0x1c3919+'</td><td>'+_0x19a96f+_0x256155(0x15c)+_0x54f54b+_0x256155(0x1c9)+_0x495837+_0x256155(0x15c)+_0x43de54+_0x256155(0x1c9)+_0x42bd81+_0x256155(0x1c9)+sharedFrom+'</td><td>'+_0x344f0f+_0x256155(0xf1):_0x27f7ce=_0x27f7ce+_0x256155(0x1c1)+_0x4feba4+_0x256155(0x15c)+_0x1c3919+_0x256155(0x15c)+_0x19a96f+_0x256155(0x15c)+_0x54f54b+_0x256155(0x1c9)+_0x495837+_0x256155(0x15c)+_0x43de54+_0x256155(0x141)+_0x42bd81+_0x256155(0x1c9)+sharedFrom+_0x256155(0x15c)+_0x344f0f+_0x256155(0x189)+_0x5c6adf+_0x256155(0xe2);}var _0x564553=_0x27f7ce,_0x40f9c3=$(_0x256155(0x19d));_0x40f9c3[_0x256155(0x164)](''),$('#documentShareWithmeNoRecordFound')[_0x256155(0x1ec)](),_0x8ded[_0x256155(0x11a)]==0x0&&$(_0x256155(0x123))[_0x256155(0x11e)](),_0x40f9c3[_0x256155(0x1cb)](_0x564553),_0x8ded[_0x256155(0x11a)]>0x0&&(GenerateTableSharedWithMe(),AckCounter==0x0?$(_0x256155(0x18b))['hide']():($(_0x256155(0x1d6))[_0x256155(0x1d8)](AckCounter),$(_0x256155(0x18b))[_0x256155(0x11e)]()),$(_0x256155(0x12d))[_0x256155(0xd9)](),$(_0x256155(0x12d))['append'](_0x256155(0x1b2)),$(_0x256155(0x12d))[_0x256155(0x1cb)]('<option\x20value=\x220\x22>File</option>'),$(_0x256155(0x12d))[_0x256155(0x1cb)]('<option\x20value=\x221\x22>Title</option>'),$('#columnsSharedWithMe')[_0x256155(0x1cb)]('<option\x20value=\x222\x22>Reference#</option>'),$(_0x256155(0x12d))[_0x256155(0x1cb)](_0x256155(0xf4)),$('#columnsSharedWithMe')[_0x256155(0x1cb)](_0x256155(0xfb)),$(_0x256155(0x12d))['append']('<option\x20value=\x227\x22>Shared\x20from</option>'));},'eror':function(_0x459224){var _0x1b8aaf=_0x452094;currentDlg!=''&&currentDlg[_0x1b8aaf(0x1e2)](),console[_0x1b8aaf(0x108)](_0x1b8aaf(0x190));}}),currentDlg!=''&&currentDlg['close']();}function _0x29e6(){var _0x3ed2c0=['.pcm','</a></div></div>','<img\x20src=\x27','includes','#__REQUESTDIGEST','toString','My-DMS','\x27/>','getDate','aria-expanded','.mp4','IsBlock','columnsSharedWithMe','SPMember','done','pdf.png','#mainDivAreaSharedFolderDocuments','\x20and\x20(PermissionStatus\x20eq\x20\x27Revoked\x27)\x20and\x20Author/ID\x20ne\x20\x27','TFW_Employees','.mp3','\x27\x20target=\x27_blank\x27\x20download><span\x20class=\x27glyphicon\x20glyphicon-download-alt\x27></span></a>','</td><td\x20class=\x27dwnld_cell\x27\x20style=\x27text-align:center\x27>','SharedFileTitle','#divPendingAck','.wim','</p><p\x20style=\x22color:black;font-size:12px;\x22>','fontcolor','1262410wHArcI','error','endrecordSharedWithMe','default&mobileredirect=true','\x22\x20alt=\x22\x22\x20data-themekey=\x22#\x22>','#ParentAck','reject','DocumentNo','#ShareTabSharing','/_api/web/currentuser/?$expand=groups','Red','All','.avi','Loading...','#mainDivAreaSharedWithMe','evenrow','May','evenselected','Author','.bmp','image','checked','audio.png','Owners','or\x20SharedUsers/ID\x20eq\x20\x27','#AckHeading','split','stringify','OwnerTitle','undefined','/_api/web/sitegroups/getbyname(\x27ALL_EMPLOYEE\x27)?$select=id','MapToIcon','SharedWithMe','\x27\x20and\x20ViewsBy/EMail\x20eq\x20\x27','Aug','<option\x20value=\x22-1\x22>All\x20Columns</option>','/DocumentManagementSystem/Forms/AllItems.aspx?id=','.doc','#FileName','txt.png','<tr><td><a\x20href=\x27javascript:void(0);\x27\x20rel=\x27','EMail','when','Contributors','\x20and\x20(PermissionType\x20eq\x20\x27Read\x27)\x20and\x20(PermissionStatus\x20ne\x20\x27Deleted\x27\x20and\x20PermissionStatus\x20ne\x20\x27Revoked\x27)\x20and\x20Author/ID\x20ne\x20\x27','null','POST','SharedBy','ServerRedirectedEmbedURL','.ogv','<tr><td>','origin','7714040AVffsJ','\x27);\x22\x20class=\x22AckStatus\x22>Acknowledge</a>','<a\x20href=\x22javascript:void(0);\x22\x20style=\x22color:blue;\x22\x20rel=\x22','<tr><td><a\x20href=\x27javascript:void(0);\x27\x20onclick=\x27OpenFolderWithAllFileFolder(\x22','.rpm','DocumentType','</td><td\x20style=\x27display:none;\x27>','\x22,\x20\x22','append','sorter','2000733FBKnPX','location','black','image-icon.png','Read','pagedropdownSharedWithMe','Personal','#Acknowledgement','Nov','#txtPendingCount','\x20and\x20(PermissionType\x20eq\x20\x27Read\x27\x20or\x20PermissionType\x20eq\x20\x27Contribute\x27\x20or\x20PermissionType\x20eq\x20\x27Restricted\x20View\x27)\x20and\x20(PermissionStatus\x20ne\x20\x27Deleted\x27\x20and\x20PermissionStatus\x20ne\x20\x27Revoked\x27)','text','#permissionStatus','results','application/json;odata=verbose','77PeRDLj','.txt','\x27\x20onclick=\x27DisplayFileProperty(this,\x20\x22','#txtSharePermission','#mydmsNorecordFoundSharedFolder','<div\x20class=\x22AckStatus\x22\x20style=\x22color:green;cursor:pointer;\x22\x20onclick=\x22OpenAckNotify(\x27','close','ListItemAllFields','\x27\x20and\x20Acknowledge\x20eq\x20\x271\x27','Title','</a></td><td>','<a\x20href=\x27','/_layouts/15/userphoto.aspx?accountname=','GET','\x27);\x22\x20class=\x22doc_icon\x22><img\x20width=\x2230px\x22\x20src=\x22https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/MyDocuments/DMS/assets/images/','.aac','hide','.wav','iconType','Files','match','\x22\x20onclick=\x22DisplayFileProperty(this,\x20\x27','AccessLevel','4AIZmRt','video-files.png','SharedType','oddrow','/_api/Web/GetFolderByServerRelativeUrl(\x27','responseJSON','SharedFrom','.xlsx','Jun','<br\x20/>Please\x20wait!!','</p></div></li>','.docx','#AckText','promise','.SharedWithMe','\x22\x20alt=\x22','</div></div>','Contribute','/_layouts/15/images/','val','\x22\x20name=\x22','webAbsoluteUrl','ready','\x20and\x20(PermissionStatus\x20eq\x20\x27Deleted\x27)\x20and\x20Author/ID\x20ne\x20\x27','empty','\x22);\x27\x20name=\x27','Acknowledged','.wmv','DocumentURL','<div\x20class=\x22SharedByData\x22><div\x20class=\x22empoyeeimg\x22><img\x20src=\x22','DisplayFileProperty','SiteURL','.wma','</td></tr>','/_api/web/maptoicon(filename=\x27','PermissionType','<a\x20href=\x27javascript:void(0);\x27\x20onclick=\x27OpenFolderWithAllFileFolder(\x22','\x27\x20and\x20DocumentID\x20eq\x20\x27','<li><div\x20class=\x22detailsectionbox\x22><span\x20class=\x22imgboxsectin\x22><img\x20src=\x22','&$filter=(SharedUsers/ID\x20eq\x20\x27','/_api/Web/Lists/getByTitle(\x27DocumentAcknowledgement\x27)/Items(','tablenavSharedWithMe','.rar','/_api/web/lists/getbytitle(\x27DocumentAcknowledgement\x27)/items','substring','desc','showWaitScreenWithNoClose','selectedrowSharedWithMe','</td><td\x20class=\x27dwnld_cell\x27\x20style=\x27text-align:center\x27></td></tr>','--select--','\x22);\x27\x20class=\x27doc_icon\x27\x20><img\x20width=\x2730px\x27\x20src=\x27https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/MyDocuments/DMS/assets/images/','<option\x20value=\x223\x22>Type</option>','Default','#txtShareOn','View','\x22);\x27><img\x20width=\x2730px\x27\x20src=\x27https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/MyDocuments/DMS/assets/images/','\x27,progid=\x27\x27,size=0)','Deleted','<option\x20value=\x225\x22>Shared\x20By</option>','css','.arz','</a>','.pptx','#txtAcknoldge','change','<div\x20class=\x22employeeinfo\x22><h3>','ServerRedirectedEmbedUri','&$orderby=Modified\x20desc&$filter=(SharedUsers/ID\x20eq\x20\x27','filter','<div\x20class=\x22PermissionBox\x22><div\x20class=\x22PermissionStatus\x22>Read</div>','.png','log','SecurityLevel','DocumentManagementSystem','\x27\x20alt=\x27','push','6199605VOVJnZ','getMinutes','color','/Forms/AllItems.aspx?id=','click','Shared\x20with\x20','\x20and\x20Author/ID\x20ne\x20\x27','DocumentAcknowledgement','#txtShareBy','SharedUsers','Shared%20Documents','Modified','6319110albANH','length','<div\x20class=\x22PermissionBox\x22><div\x20class=\x22PermissionStatus\x22>','Name','\x27)\x22>Acknowledged</div>','show','137194YPEydu','tableTempSharedWithMe','.jpeg','.zip','#documentShareWithmeNoRecordFound','16doZLMC','My\x20Documents','\x20and\x20(PermissionType\x20eq\x20\x27Read\x27\x20or\x20PermissionType\x20eq\x20\x27Contribute\x27)\x20and\x20(PermissionStatus\x20ne\x20\x27Deleted\x27\x20and\x20PermissionStatus\x20ne\x20\x27Revoked\x27)\x20and\x20Author/ID\x20ne\x20\x27','PermissionStatus','?$top=5000&$select=*,ViewsBy/Id,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID\x20eq\x20\x27','Dec','#myModalGetSharedFilesFolder','getMonth','totalpagesSharedWithMe','#columnsSharedWithMe','-Select-','prop','System\x20Account','green','DepartmentalDMS','ajax','<a\x20href=\x27javascript:void(0);\x27\x20class=\x27doc_icon\x27\x20><img\x20width=\x2730px\x27\x20src=\x27https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/MyDocuments/DMS/assets/images/','Deferred','ViewsBy','folder.png','ActionByTimeZone','pptx.png','<div\x20class=\x22Acknowledgementsec\x22><p\x20style=\x22color:green\x22>Acknowledged</p><p\x20style=\x22color:green\x22>','Revoked','userId','folder','</span><div\x20class=\x22detalbox\x22>','Documents','lastIndexOf','</td><tdstyle=\x27display:none;\x27>','disabled','oddselected','currentpageSharedWithMe','file.png','totalrecordsSharedWithMe','asc','SP.Data.DocumentAcknowledgementListItem','xlsx.png','?$top=5000&$select=*,ViewsBy/EMail,ViewsBy/Title&$expand=ViewsBy&$filter=DocumentID\x20eq\x20\x27','Folders','replace','substr','.csv','CSV.png','.tiff','<a\x20href=\x22javascript:void(0);\x22\x20class=\x22emilbox\x22\x20style=\x22cursor:pointer;color:blue;\x22\x20onclick=\x22OpenEmail(\x27','.jpg','getHours','91Cvjsau','.gif','startrecordSharedWithMe','421302UxNbEo','modal','userEmail','ZIP.png','webServerRelativeUrl','</td><td>','My-DMS:','IPAddress','.flv','getFullYear','<span\x20class=\x27glyphicon\x20glyphicon-folder-open\x27></span>&nbsp;&nbsp;','Details','NeedAcknowledgement','html','<div\x20class=\x22PermissionBox\x22><div\x20class=\x22PermissionStatus\x22>Restricted\x20View</div>','.psd','.mov','<div\x20class=\x22AckBox\x22>','docx.png','#AckUserList','Created','.mpeg','\x27,\x20\x27','&parent=','table','</a></td><td></td><td></td><td></td><td></td></tr>','.7z','toLowerCase','indexOf'];_0x29e6=function(){return _0x3ed2c0;};return _0x29e6();}function AckUserStatus(_0x4e24f7,_0x54db58,_0x93433e,_0x1b96d6,_0x3fd0aa,_0x49dc51,_0x4a7269){var _0x129b5e=_0x327584;_0x49dc51==_0x129b5e(0x10a)?_0x49dc51=_0x129b5e(0x125):_0x49dc51=_0x4a7269;var _0x1d74fa='',_0x567d9a=_0x129b5e(0x14a)+_0x4e24f7+_0x129b5e(0x1b0)+_0x54db58+_0x129b5e(0x1e4);return $[_0x129b5e(0x1b9)](getItemsWithQuery(_0x129b5e(0x114),_0x567d9a,_spPageContextInfo[_0x129b5e(0xd6)]))[_0x129b5e(0x182)](function(_0x2317c9){var _0x20a331=_0x129b5e;_0x2317c9['length']>0x0?_0x1d74fa=_0x20a331(0x1e1)+_0x4e24f7+_0x20a331(0x11d):_0x1d74fa=_0x20a331(0x1c5)+_0x4e24f7+_0x20a331(0xd5)+_0x93433e+_0x20a331(0x1f1)+_0x1b96d6+_0x20a331(0x16d)+_0x49dc51+_0x20a331(0x16d)+_0x3fd0aa+_0x20a331(0x1c4);}),_0x1d74fa;}function OpenAckNotify(_0x1be70f){var _0x23b17d=_0x327584;$(_0x23b17d(0x16a))[_0x23b17d(0xd9)](),arrAckAllUser=[];var _0x29a629='',_0xda06dd='',_0x55da84=_0x23b17d(0x128)+_0x1be70f+'\x27\x20';$[_0x23b17d(0x1b9)](getItemsWithQuery('DocumentAcknowledgement',_0x55da84,_spPageContextInfo[_0x23b17d(0xd6)]))[_0x23b17d(0x182)](function(_0x924d35){var _0x46f050=_0x23b17d;_0x924d35[_0x46f050(0x11a)]>0x0&&(_0x29a629=_spPageContextInfo[_0x46f050(0xd6)]+_0x46f050(0x1e8)+escapeProperly(_0x924d35[0x0]['ViewsBy']['EMail']),_0xda06dd+=_0x46f050(0xe7)+_0x29a629+'\x22>',_0xda06dd+=_0x46f050(0x13e)+_0x924d35[0x0][_0x46f050(0x136)][_0x46f050(0x1e5)]+_0x46f050(0x151)+_0x924d35[0x0][_0x46f050(0x136)][_0x46f050(0x1b8)]+'\x27);\x22>'+_0x924d35[0x0][_0x46f050(0x136)]['EMail']+_0x46f050(0x175),_0xda06dd+=_0x46f050(0x13a)+ShowCommonStandardDateFormat(new Date(_0x924d35[0x0][_0x46f050(0x118)]))+_0x46f050(0x18d)+(_0x924d35[0x0][_0x46f050(0x138)]?_0x924d35[0x0]['ActionByTimeZone']:'')+'</p><p\x20style=\x22color:blue\x22>IP:\x20'+_0x924d35[0x0][_0x46f050(0x15e)]+_0x46f050(0xcb));}),$(_0x23b17d(0x16a))[_0x23b17d(0x1cb)](_0xda06dd),$(_0x23b17d(0x1d4))[_0x23b17d(0x158)](_0x23b17d(0x11e));}function getSharedFromValue(_0x27f16b,_0x3c209b){var _0x112e62=_0x327584;return _0x27f16b==_0x112e62(0x1d3)||_0x27f16b==null||_0x27f16b==_0x112e62(0x1bc)?_0x3c209b==null?_0x27f16b='Personal':_0x112e62(0x1d3)+':\x20'+_0x3c209b:_0x27f16b+':\x20'+_0x3c209b;}function GenerateTableSharedWithMe(){var _0x5d1a6c=_0x327584;sorterSharedWithMe=new TINY[(_0x5d1a6c(0x16f))][(_0x5d1a6c(0x1cc))]('sorterSharedWithMe',_0x5d1a6c(0x120),{'headclass':'head','ascclass':_0x5d1a6c(0x147),'descclass':_0x5d1a6c(0xee),'evenclass':_0x5d1a6c(0x19e),'oddclass':_0x5d1a6c(0x1f6),'evenselclass':_0x5d1a6c(0x1a0),'oddselclass':_0x5d1a6c(0x143),'paginate':!![],'size':0xa,'colddid':_0x5d1a6c(0x180),'currentid':_0x5d1a6c(0x144),'totalid':_0x5d1a6c(0x12c),'startingrecid':_0x5d1a6c(0x156),'endingrecid':_0x5d1a6c(0x191),'totalrecid':_0x5d1a6c(0x146),'hoverid':_0x5d1a6c(0xf0),'pageddid':_0x5d1a6c(0x1d2),'navid':_0x5d1a6c(0xea),'sortdir':0x1,'init':!![]});}function GetDocumentTypeIcon(_0x231eaa){var _0x493fed=_0x327584,_0x2f39f3='';for(var _0x7e09d2=0x0;_0x7e09d2<arrayLinksDoctype[_0x493fed(0x11a)];_0x7e09d2++){arrayLinksDoctype[_0x7e09d2][_0x493fed(0x1ee)][_0x493fed(0x1a9)]('.')[0x0][_0x493fed(0x173)](_0x231eaa[_0x493fed(0x1a9)]('.')[0x1])!=-0x1&&(_0x2f39f3=arrayLinksDoctype[_0x7e09d2][_0x493fed(0x1a3)]);}if(_0x2f39f3[_0x493fed(0x11a)]==0x0){var _0x5dc714=_spPageContextInfo[_0x493fed(0xd6)]+_0x493fed(0xe3)+_0x231eaa+_0x493fed(0xf9);$[_0x493fed(0x133)]({'url':_0x5dc714,'headers':{'Accept':_0x493fed(0x1db)},'async':![],'success':function(_0x1fb6cd){var _0x42c3d2=_0x493fed,_0x3f668a=_0x42c3d2(0x176)+_spPageContextInfo[_0x42c3d2(0xd6)]+_0x42c3d2(0xd3)+_0x1fb6cd['d'][_0x42c3d2(0x1ae)]+_0x42c3d2(0x17b);_0x2f39f3=_0x3f668a,arrayLinksDoctype[_0x42c3d2(0x10c)](IconProperties(_0x1fb6cd['d'][_0x42c3d2(0x1ae)],_0x3f668a));},'eror':function(_0x3e5d9c){var _0x442697=_0x493fed;console[_0x442697(0x108)](_0x442697(0x190));}});}return _0x2f39f3;}function OpenFolderWithAllFileFolder(_0x445c29,_0x561b14,_0x5083ff,_0x2869dc,_0x282d70,_0x3411c0,_0x16f6f1,_0x57c3ff,_0x29708b){var _0x566606=_0x327584;$(_0x566606(0x184))[_0x566606(0x164)](''),GetSharedFolderDocuments(_0x445c29,_0x561b14,_0x5083ff,_0x2869dc,_0x282d70,_0x3411c0,_0x16f6f1,_0x57c3ff,_0x29708b);}var arrSharingDetails=[];function GetSharedFolderDocuments(_0x127c79,_0x5f0f2e,_0x436590,_0x250cb4,_0x324ddb,_0x4b0d31,_0x29570d,_0x499f1c,_0x2dcb31){var _0xc3218d=_0x327584;arrSharingDetails[_0xc3218d(0x10c)]({'SharedBy':_0x29570d,'SharedOn':_0x499f1c,'ShareWith':_0x2dcb31});_0x5f0f2e==_0xc3218d(0x1bc)||_0x5f0f2e==null||_0x5f0f2e==_0xc3218d(0x1ac)||_0x5f0f2e==undefined?_0x127c79[_0xc3218d(0x173)](_0xc3218d(0x132))!=-0x1?siteURL=window[_0xc3218d(0x1ce)][_0xc3218d(0x1c2)]+_0x127c79['split'](_0xc3218d(0x132))[0x0]:siteURL=_spPageContextInfo['webAbsoluteUrl']:siteURL=_0x5f0f2e;_0x127c79[_0xc3218d(0x173)](_0xc3218d(0x13f))!=-0x1&&_0x127c79[_0xc3218d(0x173)](_0xc3218d(0x117))==-0x1&&(_0x127c79=_0x127c79[_0xc3218d(0x14c)](_0xc3218d(0x13f),_0xc3218d(0x117)));var _0x38b529=siteURL+_0xc3218d(0x1f7)+_0x127c79+'\x27)?$select=ID,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$orderby=Modified\x20desc';$['ajax']({'url':_0x38b529,'headers':{'Accept':_0xc3218d(0x1db)},'async':!![],'success':function(_0x4e11b0){var _0x266a13=_0xc3218d;$(_0x266a13(0x12a))['modal']('show');var _0x36f0bf='',_0x4fc885='',_0x5e94eb=_0x4e11b0['d'][_0x266a13(0x1ef)]['results'],_0x355c32=_0x4e11b0['d'][_0x266a13(0x14b)][_0x266a13(0x1da)],_0x9f601f=_0x355c32[_0x266a13(0x11a)]+_0x5e94eb['length'];for(var _0x1a6db2=0x0;_0x1a6db2<_0x355c32[_0x266a13(0x11a)];_0x1a6db2++){Icon='folder.png';var _0x191259=encodeURI(_0x355c32[_0x1a6db2]['ServerRelativeUrl']),_0x55ae0a=_0x266a13(0x161);_0x4fc885=_0x4fc885+_0x266a13(0x1c6)+_0x191259+_0x266a13(0x1ca)+siteURL+_0x266a13(0x1ca)+_0x436590+_0x266a13(0x1ca)+_0x250cb4+_0x266a13(0x1ca)+_0x324ddb+_0x266a13(0x1ca)+_0x4b0d31+_0x266a13(0x1ca)+_0x29570d+'\x22,\x20\x22'+_0x499f1c+'\x22,\x20\x22'+_0x2dcb31+_0x266a13(0xf8)+Icon+_0x266a13(0x10b)+Icon+'\x27>'+_0x355c32[_0x1a6db2][_0x266a13(0x11c)]+_0x266a13(0x170);}for(var _0x1a6db2=0x0;_0x1a6db2<_0x5e94eb['length'];_0x1a6db2++){var _0xb8d6b5='.'+_0x5e94eb[_0x1a6db2]['Name'][_0x266a13(0xed)](_0x5e94eb[_0x1a6db2]['Name'][_0x266a13(0x140)]('.')+0x1);Icon=_0x266a13(0x145);if('.docx'==_0xb8d6b5||_0x266a13(0x1b4)==_0xb8d6b5)Icon=_0x266a13(0x169);else{if('.pdf'==_0xb8d6b5)Icon=_0x266a13(0x183);else{if(_0x266a13(0x152)==_0xb8d6b5||_0x266a13(0x166)==_0xb8d6b5||_0x266a13(0x150)==_0xb8d6b5||_0x266a13(0x155)==_0xb8d6b5||'.bmp'==_0xb8d6b5||_0x266a13(0x121)==_0xb8d6b5||_0x266a13(0x107)==_0xb8d6b5)Icon=_0x266a13(0x1d0);else{if(_0x266a13(0xc8)==_0xb8d6b5)Icon=_0x266a13(0x149);else{if('.pptx'==_0xb8d6b5)Icon=_0x266a13(0x139);else{if(_0x266a13(0x1dd)==_0xb8d6b5)Icon=_0x266a13(0x1b6);else{if(_0x266a13(0x14e)==_0xb8d6b5)Icon=_0x266a13(0x14f);else{if(_0x266a13(0x122)==_0xb8d6b5||'.rar'==_0xb8d6b5||_0x266a13(0x171)==_0xb8d6b5||'.arz'==_0xb8d6b5||'.cab'==_0xb8d6b5||_0x266a13(0x1c7)==_0xb8d6b5||_0x266a13(0x18c)==_0xb8d6b5)Icon='ZIP.png';else{if(_0x266a13(0x17e)==_0xb8d6b5||_0x266a13(0xdc)==_0xb8d6b5||_0x266a13(0x19b)==_0xb8d6b5||_0x266a13(0x16c)==_0xb8d6b5||_0x266a13(0x15f)==_0xb8d6b5||_0x266a13(0x167)==_0xb8d6b5||_0x266a13(0x1ed)==_0xb8d6b5||_0x266a13(0x1c0)==_0xb8d6b5)Icon='video-files.png';else(_0x266a13(0x187)==_0xb8d6b5||_0x266a13(0xe1)==_0xb8d6b5||_0x266a13(0x1eb)==_0xb8d6b5||_0x266a13(0x174)==_0xb8d6b5)&&(Icon=_0x266a13(0x1a5));}}}}}}}}var _0x191188=_0x5e94eb[_0x1a6db2]['ListItemAllFields'][_0x266a13(0x103)];(_0x191188==null||_0x191188=='')&&(_0x191188=encodeURI(_0x5e94eb[_0x1a6db2]['ServerRelativeUrl']));if(_0x5e94eb[_0x1a6db2]['Name']!=null){var _0x20f703=_0x5e94eb[_0x1a6db2][_0x266a13(0x1e3)][_0x266a13(0x196)];_0x20f703==null&&(_0x20f703='');var _0x277acd=_0x5e94eb[_0x1a6db2][_0x266a13(0x1e3)]['DocumentType'];(_0x277acd==null||_0x277acd==_0x266a13(0xf2))&&(_0x277acd='');var _0x4243d6=_0x5e94eb[_0x1a6db2]['ListItemAllFields'][_0x266a13(0x162)];_0x4243d6==null&&(_0x4243d6='');var _0x33d3ac='';_0x33d3ac==null&&(_0x33d3ac='');var _0x2bfa3d=_0x5e94eb[_0x1a6db2][_0x266a13(0x11c)],_0xa8694c=_0x5e94eb[_0x1a6db2][_0x266a13(0x1e3)]['Title'];_0xa8694c==null&&(_0xa8694c=_0x2bfa3d);var _0x656d3d=_0x5e94eb[_0x1a6db2][_0x266a13(0x1e3)][_0x266a13(0x109)];(_0x656d3d==null||_0x656d3d=='')&&(_0x656d3d=_0x266a13(0xf5));var _0x21a6f0=convertJSONDateAMPMWithDate(_0x5e94eb[_0x1a6db2]['ListItemAllFields']['Modified']),_0x1157a6=_0x5e94eb[_0x1a6db2][_0x266a13(0x1e3)][_0x266a13(0x1f2)];_0x1157a6==null&&(_0x1157a6='');var _0xdf89db=_0x266a13(0x1e7)+_0x5e94eb[_0x1a6db2]['ServerRelativeUrl']+_0x266a13(0x188);_0x4fc885=_0x4fc885+_0x266a13(0x1b7)+_0x4b0d31+_0x266a13(0x1de)+_0x436590+_0x266a13(0x1ca)+_0x250cb4+_0x266a13(0x1ca)+_0x324ddb+_0x266a13(0xda)+_0x5e94eb[_0x1a6db2]['ServerRelativeUrl']+'\x27\x20class=\x27doc_icon\x27\x20><img\x20width=\x2730px\x27\x20src=\x27https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@tree/main/SiteAssets/MyDocuments/DMS/assets/images/'+Icon+'\x27\x20alt=\x27'+Icon+'\x27>'+_0x2bfa3d+_0x266a13(0x1e6)+_0x20f703+'</td><td>'+_0x21a6f0+_0x266a13(0x15c)+_0x4243d6+_0x266a13(0x189)+_0xdf89db+_0x266a13(0xe2);}}var _0x22ab8b=_0x4fc885,_0x4fdbca=$('#mainDivAreaSharedFolderDocuments');_0x4fdbca[_0x266a13(0x164)](''),$(_0x266a13(0x1e0))[_0x266a13(0x1ec)](),_0x9f601f==0x0&&$('#mydmsNorecordFoundSharedFolder')[_0x266a13(0x11e)](),_0x4fdbca[_0x266a13(0x1cb)](_0x22ab8b);},'eror':function(_0x2b50af){var _0x165771=_0xc3218d;console['log'](_0x165771(0x190));}});}function convertJSONDateAMPMWithDate(_0x652c90){var _0x3724cd=_0x327584,_0x2b0243=new Date(_0x652c90),_0x23a893=['Jan','Feb','Mar','Apr',_0x3724cd(0x19f),_0x3724cd(0xc9),'July',_0x3724cd(0x1b1),'Sept','Oct',_0x3724cd(0x1d5),_0x3724cd(0x129)],_0x28d7b1=_0x2b0243[_0x3724cd(0x153)](),_0x3476ad=_0x2b0243[_0x3724cd(0x10e)](),_0x2be747=_0x2b0243[_0x3724cd(0x153)]()>=0xc?'PM':'AM';_0x28d7b1=_0x28d7b1%0xc,_0x28d7b1=_0x28d7b1?_0x28d7b1:0xc,_0x3476ad=_0x3476ad<0xa?'0'+_0x3476ad:_0x3476ad;var _0x3e762e=_0x28d7b1+':'+_0x3476ad+'\x20'+_0x2be747;return _0x23a893[_0x2b0243[_0x3724cd(0x12b)]()]+'\x20'+_0x2b0243[_0x3724cd(0x17c)]()+'\x20'+_0x2b0243[_0x3724cd(0x160)]()+'\x20'+_0x3e762e;}function getSingleShareInfo(_0x2bfe65,_0x2821dd,_0x5738bb){var _0x196919=_0x327584,_0x4fa8a6='?$select=*,Author/Title,SharedUsers/Title&$expand=Author,SharedUsers&$orderby=Created\x20desc&$filter=Id\x20eq\x20\x27'+_0x2821dd+_0x196919(0xe6)+_0x2bfe65+'\x27\x20and\x20(PermissionStatus\x20ne\x20\x27Revoked\x27\x20or\x20PermissionStatus\x20ne\x20\x27Deleted\x27)';$[_0x196919(0x1b9)](getItemsWithQuery('SharedDocument',_0x4fa8a6,_spPageContextInfo[_0x196919(0xd6)]))[_0x196919(0x182)](function(_0x3db69c){var _0x58b324=_0x196919;_0x3db69c['length']>0x0?(currentSharedItemId=_0x3db69c[0x0]['Id'],_0x3db69c[0x0][_0x58b324(0x163)]==!![]?getAcknowledgeStatus(_0x3db69c[0x0]['Id']):$('#ParentAck')['hide'](),$(_0x58b324(0x115))[_0x58b324(0x1d8)](_0x3db69c[0x0]['Author'][_0x58b324(0x1e5)]),$('#txtShareOn')[_0x58b324(0x1d8)](ShowCommonStandardDateFormat(new Date(_0x3db69c[0x0][_0x58b324(0x16b)]))),$(_0x58b324(0x1df))[_0x58b324(0x1d8)](_0x3db69c[0x0][_0x58b324(0xe4)]),$(_0x58b324(0x197))['text'](_0x58b324(0x112)+_0x3db69c[0x0][_0x58b324(0x116)]['results'][0x0][_0x58b324(0x1e5)])):($(_0x58b324(0x194))[_0x58b324(0x1ec)](),$(_0x58b324(0x115))[_0x58b324(0x1d8)](arrSharingDetails[0x0][_0x58b324(0x1be)]),$(_0x58b324(0xf6))['text'](ShowCommonStandardDateFormat(new Date(arrSharingDetails[0x0]['SharedOn']))),$(_0x58b324(0x1df))[_0x58b324(0x1d8)](_0x5738bb),$('#ShareTabSharing')[_0x58b324(0x1d8)](_0x58b324(0x112)+arrSharingDetails[0x0]['ShareWith']));});}function getAcknowledgeStatus(_0x5604a7){var _0x22a03c=_0x327584;$(_0x22a03c(0x194))[_0x22a03c(0x11e)]();var _0x1f1af4='';$(_0x22a03c(0x194))[_0x22a03c(0xd9)]()[_0x22a03c(0x1cb)]('<div\x20class=\x22breakbox\x22><input\x20type=\x22checkbox\x22\x20id=\x22txtAcknoldge\x22><label\x20class=\x22detail-label\x22\x20id=\x22AckHeading\x22>Acknowledgement</label></div><div\x20class=\x22breakbox\x22><label\x20class=\x22detail-label\x22\x20id=\x22AckText\x22>By\x20clicking\x20this\x20you\x20agree\x20that\x20you\x20understandand\x20acknowledge\x20this\x20documents.</label></div>');var _0x4686e3=_0x22a03c(0x14a)+_0x5604a7+_0x22a03c(0x1b0)+_spPageContextInfo[_0x22a03c(0x159)]+'\x27';$[_0x22a03c(0x1b9)](getItemsWithQuery(_0x22a03c(0x114),_0x4686e3,_spPageContextInfo[_0x22a03c(0xd6)]))[_0x22a03c(0x182)](function(_0x3ee9a2){var _0x34f6a9=_0x22a03c;_0x3ee9a2[_0x34f6a9(0x11a)]>0x0?(_0x1f1af4=_0x3ee9a2[0x0]['Id'],_0x3ee9a2[0x0]['Acknowledge']==!![]?($('#AckHeading')[_0x34f6a9(0x1d8)](_0x34f6a9(0xdb)),$(_0x34f6a9(0x1a8))['css']('color','green'),$(_0x34f6a9(0xcd))[_0x34f6a9(0x1ec)](),$(_0x34f6a9(0x100))[_0x34f6a9(0x12f)](_0x34f6a9(0x142),_0x34f6a9(0x142)),$('#txtAcknoldge')[_0x34f6a9(0x12f)](_0x34f6a9(0x1a4),'checked')):(_0x3ee9a2[0x0][_0x34f6a9(0xf7)]!=!![]&&ViewAckDocument(),$('#AckHeading')['text']('Acknowledgement'),$(_0x34f6a9(0x1a8))['css'](_0x34f6a9(0x10f),_0x34f6a9(0x1cf)),$('#AckText')['show'](),$('#txtAcknoldge')[_0x34f6a9(0x12f)](_0x34f6a9(0x142),''),$(_0x34f6a9(0x100))[_0x34f6a9(0x12f)](_0x34f6a9(0x1a4),''),$(_0x34f6a9(0x100))['click'](function(){AcknowledgeDocument(_0x1f1af4);}))):(_0x1f1af4=ViewAckDocument(_0x5604a7),$(_0x34f6a9(0x1a8))[_0x34f6a9(0x1d8)]('Acknowledgement'),$(_0x34f6a9(0x1a8))['css'](_0x34f6a9(0x10f),_0x34f6a9(0x1cf)),$('#AckText')['show'](),$(_0x34f6a9(0x100))[_0x34f6a9(0x12f)](_0x34f6a9(0x142),''),$(_0x34f6a9(0x100))[_0x34f6a9(0x12f)](_0x34f6a9(0x1a4),''),$(_0x34f6a9(0x100))[_0x34f6a9(0x111)](function(){AcknowledgeDocument(_0x1f1af4);}));});}function ViewAckDocument(_0x26f1fe){var _0x5cc16d=_0x327584,_0x1f6327,_0x45ed48='';_0x1f6327={'__metadata':{'type':_0x5cc16d(0x148)},'ViewsById':_spPageContextInfo[_0x5cc16d(0x13c)],'Title':$(_0x5cc16d(0x1b5))[_0x5cc16d(0x1d8)](),'DocumentID':parseInt(_0x26f1fe)};var _0x5e8a28=$[_0x5cc16d(0x135)]();return $[_0x5cc16d(0x133)]({'url':_spPageContextInfo[_0x5cc16d(0xd6)]+_0x5cc16d(0xec),'type':'POST','async':![],'headers':{'accept':_0x5cc16d(0x1db),'X-RequestDigest':$(_0x5cc16d(0x178))[_0x5cc16d(0xd4)](),'content-Type':_0x5cc16d(0x1db)},'data':JSON[_0x5cc16d(0x1aa)](_0x1f6327),'success':function(_0x579bfa){_0x45ed48=_0x579bfa['d']['Id'];},'error':function(_0x19375f){var _0x44c869=_0x5cc16d;alert(JSON[_0x44c869(0x1aa)](_0x19375f)),$(_0x44c869(0x100))['prop'](_0x44c869(0x142),'');}}),_0x45ed48;}function AcknowledgeDocument(_0x47dd17){var _0x4a5693=_0x327584;if(confirm('Are\x20you\x20sure\x20to\x20acknowledge\x20this\x20document\x20?')==!![]){var _0x528e9f;(CurrentIpAddress==undefined||CurrentIpAddress==null)&&(CurrentIpAddress='');$('#txtAcknoldge')[_0x4a5693(0x12f)](_0x4a5693(0x142),_0x4a5693(0x142)),_0x528e9f={'__metadata':{'type':_0x4a5693(0x148)},'Acknowledge':!![],'IPAddress':CurrentIpAddress,'ActionByTimeZone':LoggedIn_TimeZone};var _0x151769=$[_0x4a5693(0x135)](),_0x5cc62b=_spPageContextInfo[_0x4a5693(0xd6)]+_0x4a5693(0xe9)+_0x47dd17+')';return $[_0x4a5693(0x133)]({'url':_0x5cc62b,'type':_0x4a5693(0x1bd),'async':![],'headers':{'accept':_0x4a5693(0x1db),'X-RequestDigest':$(_0x4a5693(0x178))[_0x4a5693(0xd4)](),'content-Type':_0x4a5693(0x1db),'X-Http-Method':'PATCH','If-Match':'*'},'data':JSON[_0x4a5693(0x1aa)](_0x528e9f),'success':function(_0x3c64bd){var _0x3e5177=_0x4a5693;$('#AckHeading')[_0x3e5177(0x1d8)](_0x3e5177(0xdb)),$(_0x3e5177(0x1a8))[_0x3e5177(0xfc)](_0x3e5177(0x10f),_0x3e5177(0x131)),$(_0x3e5177(0xcd))[_0x3e5177(0x1ec)](),GetDocumentsSharedWithMe();},'error':function(_0x1b805f){var _0x2640ae=_0x4a5693;alert(JSON[_0x2640ae(0x1aa)](_0x1b805f)),$('#txtAcknoldge')[_0x2640ae(0x12f)](_0x2640ae(0x142),''),_0x151769[_0x2640ae(0x195)](_0x1b805f);}}),_0x151769[_0x4a5693(0xce)]();}}