var a227_0x7540a6=a227_0x27ff;(function(_0x3a3ce2,_0x52a951){var _0xc896ff=a227_0x27ff,_0x17c66b=_0x3a3ce2();while(!![]){try{var _0x373226=parseInt(_0xc896ff(0xf6))/0x1+parseInt(_0xc896ff(0x168))/0x2*(-parseInt(_0xc896ff(0xef))/0x3)+-parseInt(_0xc896ff(0x15f))/0x4+-parseInt(_0xc896ff(0xd0))/0x5*(parseInt(_0xc896ff(0xf4))/0x6)+parseInt(_0xc896ff(0x12a))/0x7*(parseInt(_0xc896ff(0x115))/0x8)+parseInt(_0xc896ff(0xf0))/0x9*(parseInt(_0xc896ff(0xd9))/0xa)+-parseInt(_0xc896ff(0x136))/0xb*(parseInt(_0xc896ff(0xf9))/0xc);if(_0x373226===_0x52a951)break;else _0x17c66b['push'](_0x17c66b['shift']());}catch(_0x66e1fc){_0x17c66b['push'](_0x17c66b['shift']());}}}(a227_0x5bcb,0xd7eee),$(document)[a227_0x7540a6(0x14b)](function(){var _0x1725a8=a227_0x7540a6;GetUserEmployee(),currentCompanyid=titanForWork[_0x1725a8(0x12e)](_0x1725a8(0x114)),SP['SOD'][_0x1725a8(0x104)](_0x1725a8(0xdf),_0x1725a8(0x12b),readyFunctionGroups),SP[_0x1725a8(0x12f)][_0x1725a8(0x104)]('clientpeoplepicker.js',_0x1725a8(0x13e),function(){var _0x5cbdc3=_0x1725a8;SetPeoplePicker_MultiselectGroups(_0x5cbdc3(0x10d),!![]),SetPeoplePicker_MultiselectGroups('customShareingFolderPoplePicker',!![]),SetPeoplePicker_MultiselectGroups(_0x5cbdc3(0x145),!![]);}),RemoveRowGroups(),$(_0x1725a8(0x15e))['one'](_0x1725a8(0x153),clickHandler),$(_0x1725a8(0x124))['click'](function(){GetDepartmentConfidentialGroupUsersGroups();}),$(_0x1725a8(0x129))['click'](function(){var _0x28201d=_0x1725a8;$(this)[_0x28201d(0x113)]();var _0x549946=$(_0x28201d(0x157))[_0x28201d(0x140)]();_0x549946=_0x549946['trim']();var _0x259838=checkFolderSpecialCharaters(_0x549946);if(_0x259838==!![])return alert(_0x28201d(0xf2)),$(this)[_0x28201d(0x102)](),![];if(_0x549946[_0x28201d(0x158)]<0x2)return alert(_0x28201d(0x167)),$(this)[_0x28201d(0x102)](),![];if(_0x549946[_0x28201d(0x158)]>0x28)return alert(_0x28201d(0x15d)),$(this)[_0x28201d(0x102)](),![];var _0x41f55b=$(_0x28201d(0x11f))[_0x28201d(0x140)](),_0x43b361=ChekFolderExistOrNot(_0x41f55b,_0x549946);if(_0x43b361==![])return alert(_0x28201d(0x131)),$(this)['show'](),![];waitingDialog['show'](),$[_0x28201d(0x126)](CreateDMSFolder(_0x41f55b,_0x549946))[_0x28201d(0x11c)](function(_0x227e5d){var _0x33583f=_0x28201d;waitingDialog[_0x33583f(0x113)](),$(_0x33583f(0x155))['modal']('hide'),$(_0x33583f(0x157))[_0x33583f(0x140)](''),$(_0x33583f(0x129))['show']();var _0x575c23=_0x41f55b;GetMyDocumentsWithFilesFolder(_0x575c23);});}),setTimeout(function(){CreateDMSFolderOnPageLoad(folderNameUsedInDesginPage);},0xbb8);}));var eventcounter=0x0;function clickHandler(){window['setTimeout'](function(){var _0x42feff=a227_0x27ff;$('#addgoupItems')[_0x42feff(0x164)]('click',clickHandler);},0xbb8),eventcounter==0x0&&(CheckMediaContent()?evntStuff():(alert(AdminWarning),IsActiveOrNot=!![]));}function evntStuff(){var _0x2693f2=a227_0x7540a6;eventcounter=0x1,ValidateAllGroups()==!![]?(waitingDialog[_0x2693f2(0x102)](),$['when'](AddUsersInListGroups())[_0x2693f2(0x11c)](function(_0x4a05f6){var _0x26c32c=_0x2693f2;window[_0x26c32c(0x135)](function(){var _0x2258cb=_0x26c32c;GetDepartmentConfidentialGroupUsersGroups(),waitingDialog[_0x2258cb(0x113)](),eventcounter=0x0,alert(_0x2258cb(0x10c)),$(_0x2258cb(0x155))[_0x2258cb(0xf7)](_0x2258cb(0x113));},0x1388);})):eventcounter=0x0;}function ChekFolderExistOrNot(_0x2ae4dd,_0x459aca){var _0x2e9832=a227_0x7540a6,_0x2747e1=!![],_0x1c2baa=_spPageContextInfo[_0x2e9832(0xe5)]+'/_api/Web/GetFolderByServerRelativeUrl(\x27'+_0x2ae4dd+_0x2e9832(0x141);return $[_0x2e9832(0x154)]({'url':_0x1c2baa,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x2df6ca){var _0x239698=_0x2e9832,_0x24628c=_0x2df6ca['d']['Folders'][_0x239698(0x11a)];for(var _0x361af6=0x0;_0x361af6<_0x24628c['length'];_0x361af6++){_0x24628c[_0x361af6][_0x239698(0x13d)][_0x239698(0x110)]()==_0x459aca[_0x239698(0x110)]()&&(_0x2747e1=![]);}},'eror':function(_0x59cb95){console['log']('error');}}),_0x2747e1;}function checkFolderSpecialCharaters(_0x3a751b){var _0x1a327e=a227_0x7540a6,_0xc65960=_0x1a327e(0x15b);for(i=0x0;i<_0xc65960[_0x1a327e(0x158)];i++){if(_0x3a751b[_0x1a327e(0x146)](_0xc65960[i])>-0x1)return!![];}return![];}function AddMoreGroups(){var _0x3cb9cc=a227_0x7540a6;$(_0x3cb9cc(0x10b))[_0x3cb9cc(0x153)](function(){AddRowGroups(),RemoveRowGroups();});}function DefaultRowGroups(){var _0x825c3a=a227_0x7540a6,_0x982f8b=_0x825c3a(0xd4);$(_0x825c3a(0x13f))['append'](_0x982f8b),SetPeoplePicker_MultiselectGroups('newPeoplePickerControl0',!![]);}function AddRowGroups(){var _0x187743=a227_0x7540a6,_0x26300b=$(_0x187743(0x137))[_0x187743(0x158)],_0x1503c1=![];for(var _0x1742af=0x1;_0x1742af<_0x26300b+0x1;_0x1742af++){$(_0x187743(0x11d)+_0x1742af)['length']==0x0&&(_0x1503c1==![]&&($('#myTable\x20tbody')['append']('<tr\x20style=\x27vertical-align:\x20top\x27><td><label\x20style=\x27display:none\x27\x20class=\x27itemIDClass'+_0x1742af+_0x187743(0xe2)+_0x1742af+_0x187743(0xe7)+_0x1742af+_0x187743(0x10f)),SetPeoplePicker_MultiselectGroups(_0x187743(0xcf)+_0x1742af,!![]),_0x1503c1=!![]));}}function RemoveRowGroups(){var _0x2f8dce=a227_0x7540a6;$(_0x2f8dce(0x112))[_0x2f8dce(0xdb)]()[_0x2f8dce(0x153)](function(){var _0x35130a=_0x2f8dce,_0x2545ca=confirm(_0x35130a(0xe6));if(_0x2545ca==!![]){var _0x4ad526=$(this)[_0x35130a(0x111)]('tr')['find'](_0x35130a(0xec))[_0x35130a(0x127)](_0x35130a(0x134)),_0x1d8776=$('.'+_0x4ad526)[_0x35130a(0x132)]();_0x1d8776[_0x35130a(0x158)]>0x0?($(this)['closest']('tr')['remove'](),$[_0x35130a(0x126)](DeleteGroup(_0x1d8776))[_0x35130a(0x11c)](function(_0x14103f){})):$(this)[_0x35130a(0x111)]('tr')[_0x35130a(0x121)]();}});}function DeleteGroup(_0x269626){var _0x11e963=a227_0x7540a6,_0x437c93=$['Deferred']();return $[_0x11e963(0x154)]({'url':_spPageContextInfo[_0x11e963(0xe5)]+_0x11e963(0xeb)+_0x269626+')','type':_0x11e963(0x116),'headers':{'accept':_0x11e963(0xe8),'X-RequestDigest':$(_0x11e963(0x166))['val'](),'IF-MATCH':'*','X-HTTP-Method':'DELETE'},'success':function(_0x50c3ae){var _0x498ddb=_0x11e963;_0x437c93[_0x498ddb(0x143)](_0x50c3ae);},'error':function(_0x3486b6){var _0xd810c7=_0x11e963;_0x437c93[_0xd810c7(0x117)](_0x3486b6);}}),_0x437c93[_0x11e963(0x10e)]();}function SetPeoplePicker_MultiselectGroups(_0x282112,_0x435636){var _0x328ffe=a227_0x7540a6;_0x435636==null&&(_0x435636=![]);var _0x3789b6={};_0x3789b6[_0x328ffe(0xd6)]=_0x328ffe(0xd2),_0x3789b6[_0x328ffe(0xda)]=0xf,_0x3789b6['ResolvePrincipalSource']=0xf,_0x3789b6[_0x328ffe(0xfb)]=_0x435636,_0x3789b6[_0x328ffe(0x144)]=0x32,_0x3789b6[_0x328ffe(0x14d)]=_0x328ffe(0x147),SPClientPeoplePicker_InitStandaloneControlWrapper(_0x282112,null,_0x3789b6);}function readyFunctionGroups(){GetCurrentUserIDGroups();}var SharedListcurrentUserID='';function GetCurrentUserIDGroups(){var _0x295de5=a227_0x7540a6;$[_0x295de5(0x154)]({'url':_spPageContextInfo['webServerRelativeUrl']+_0x295de5(0xf3),'method':'GET','headers':{'Accept':'application/json;\x20odata=verbose'},'success':function(_0x2651b2){SharedListcurrentUserID=_0x2651b2['d']['Id'],GetDepartmentConfidentialGroupUsersGroups();},'error':function(_0x5ea33d){}});}function GetDepartmentConfidentialGroupUsersGroups(){var _0x3848a9=a227_0x7540a6,_0x540170=_spPageContextInfo['webAbsoluteUrl']+_0x3848a9(0xe1)+SharedListcurrentUserID+'\x27';$['ajax']({'url':_0x540170,'method':_0x3848a9(0x15a),'headers':{'Accept':_0x3848a9(0x130)},'async':![],'success':function(_0x24269c){var _0x6e5422=_0x3848a9,_0x459a04=_0x24269c;$(_0x6e5422(0x150))[_0x6e5422(0x156)](''),DefaultRowGroups(),AddMoreGroups();for(var _0x326b50=0x0;_0x326b50<_0x459a04['d'][_0x6e5422(0x11a)]['length'];_0x326b50++){_0x326b50!=0x0&&(AddRowGroups(),RemoveRowGroups());var _0x42c4e0=_0x459a04['d'][_0x6e5422(0x11a)][_0x326b50][_0x6e5422(0xea)];$(_0x6e5422(0x149)+_0x326b50)[_0x6e5422(0x140)](_0x42c4e0);var _0x244fc4=_0x459a04['d']['results'][_0x326b50]['ID'];$(_0x6e5422(0xe0)+_0x326b50)[_0x6e5422(0x132)](_0x244fc4);if(_0x459a04['d'][_0x6e5422(0x11a)][_0x326b50]['SharedUsers']['results']!=null)for(var _0x2e06d7=0x0;_0x2e06d7<_0x459a04['d'][_0x6e5422(0x11a)][_0x326b50][_0x6e5422(0xee)][_0x6e5422(0x11a)]['length'];_0x2e06d7++){var _0x3bd125=_0x459a04['d']['results'][_0x326b50]['SharedUsers'][_0x6e5422(0x11a)][_0x2e06d7][_0x6e5422(0x101)];_0x3bd125!=null&&_0x3bd125!=''&&setPeoplePickerUsersInfoCurrentGroups('newPeoplePickerControl'+_0x326b50,_0x459a04['d'][_0x6e5422(0x11a)][_0x326b50][_0x6e5422(0xee)][_0x6e5422(0x11a)][_0x2e06d7][_0x6e5422(0x101)]);}}},'error':function(_0x29d3b1){var _0x5f20d8=_0x3848a9;console[_0x5f20d8(0x161)](JSON[_0x5f20d8(0x133)](_0x29d3b1));}});}function AddNewGroupMembersGroups(_0x2f1a99,_0x13bd92,_0x2f388e,_0x13a8d2,_0x4b0d5c){var _0x25627d=a227_0x7540a6;_0x13bd92['length']==0x0&&_0x13bd92['push'](0x0);var _0x23f981,_0x5a77ea=GetItemTypeForListNameDetailsGroups(_0x2f1a99);_0x23f981={'__metadata':{'type':_0x5a77ea},'LogonUserId':SharedListcurrentUserID,'SharedUsersId':{'results':_0x13bd92},'SharingLevel':_0x2f388e},_0x13bd92['length']==0x0&&delete _0x23f981['SharedUsersId'],_0x13a8d2==_0x25627d(0x109)?AddItemToListGroups(_0x2f1a99,_0x23f981):updateItemWithIDGroups(_0x2f1a99,_0x23f981,_0x4b0d5c);}function a227_0x27ff(_0x2d5fa4,_0xb19695){var _0x5bcbb6=a227_0x5bcb();return a227_0x27ff=function(_0x27fff9,_0x2e0058){_0x27fff9=_0x27fff9-0xcf;var _0x4f2146=_0x5bcbb6[_0x27fff9];return _0x4f2146;},a227_0x27ff(_0x2d5fa4,_0xb19695);}function setPeoplePickerUsersInfoCurrentGroups(_0x613c49,_0x17a956){var _0xa87b0c=a227_0x7540a6,_0x32285b=$(_0xa87b0c(0xf1)+_0x613c49+'\x27]'),_0x3483f3=SPClientPeoplePicker[_0xa87b0c(0xfd)][_0x32285b[0x1]['id']];_0x3483f3[_0xa87b0c(0x14e)](_0x17a956,![]);}function AddItemToListGroups(_0x8108e5,_0x3217a1){var _0x183e0c=a227_0x7540a6,_0x1d1398=$[_0x183e0c(0x162)]();return $[_0x183e0c(0x154)]({'url':_spPageContextInfo['webAbsoluteUrl']+_0x183e0c(0x152)+_0x8108e5+'\x27)/items','type':_0x183e0c(0x116),'async':![],'headers':{'accept':'application/json;odata=verbose','X-RequestDigest':$(_0x183e0c(0x166))[_0x183e0c(0x140)](),'content-Type':_0x183e0c(0xe8)},'data':JSON[_0x183e0c(0x133)](_0x3217a1),'success':function(_0x5c1ddd){var _0x116159=_0x183e0c;_0x1d1398[_0x116159(0x143)](_0x5c1ddd);},'error':function(_0x1272d2){var _0x22c305=_0x183e0c;alert(JSON[_0x22c305(0x133)](_0x1272d2)),_0x1d1398[_0x22c305(0x117)](_0x1272d2);}}),_0x1d1398[_0x183e0c(0x10e)]();}function GetItemTypeForListNameDetailsGroups(_0x2083e6){var _0xa231e4=a227_0x7540a6;return'SP.Data.'+_0x2083e6[_0xa231e4(0x122)](0x0)[_0xa231e4(0xfe)]()+_0x2083e6[_0xa231e4(0x151)]('\x20')['join']('')[_0xa231e4(0xdc)](0x1)+_0xa231e4(0x103);}function updateItemWithIDGroups(_0x8e3b6d,_0x56028c,_0x5b1693){var _0x5d9141=a227_0x7540a6,_0x3c6476=$[_0x5d9141(0x162)](),_0x47f896=_spPageContextInfo[_0x5d9141(0xe5)]+_0x5d9141(0x148)+_0x8e3b6d+_0x5d9141(0x105)+_0x5b1693+')';return $[_0x5d9141(0x154)]({'url':_0x47f896,'type':_0x5d9141(0x116),'async':![],'headers':{'accept':_0x5d9141(0xe8),'X-RequestDigest':$('#__REQUESTDIGEST')[_0x5d9141(0x140)](),'content-Type':_0x5d9141(0xe8),'X-Http-Method':_0x5d9141(0x142),'If-Match':'*'},'data':JSON[_0x5d9141(0x133)](_0x56028c),'success':function(_0x43c7e1){var _0x382dca=_0x5d9141;_0x3c6476[_0x382dca(0x143)](!![]);},'error':function(_0x542bbd){var _0x3a5ca7=_0x5d9141;alert(JSON[_0x3a5ca7(0x133)](_0x542bbd)),_0x3c6476[_0x3a5ca7(0x117)](_0x542bbd);}}),_0x3c6476[_0x5d9141(0x10e)]();}function AddUsersInListGroups(){var _0x38e71b=a227_0x7540a6;$(_0x38e71b(0x137))['each'](function(){var _0x124d13=_0x38e71b,_0x27ad3e=new Array(),_0x33ac4c=$(this)[_0x124d13(0x13b)]('td>input')[_0x124d13(0x127)]('class'),_0x3292fe=$(this)['find']('td>label')[_0x124d13(0x127)](_0x124d13(0x134)),_0x265188=$('.'+_0x3292fe)[_0x124d13(0x132)](),_0x51e349=$(this)[_0x124d13(0x13b)]('td>div')[_0x124d13(0x127)]('id');_0x27ad3e=getPeopleUserInfoGroups(_0x51e349);var _0x46e2f3=$('.'+_0x33ac4c)[_0x124d13(0x140)]()[_0x124d13(0xde)]();_0x265188[_0x124d13(0x158)]==0x0?$[_0x124d13(0x126)](AddNewGroupMembersGroups(_0x124d13(0x138),_0x27ad3e,_0x46e2f3,_0x124d13(0x109),''))[_0x124d13(0x11c)](function(_0x444bfe){}):AddNewGroupMembersGroups('DocumentSharedGroups',_0x27ad3e,_0x46e2f3,'Update',_0x265188);});}function a227_0x5bcb(){var _0x31c7b2=['one','\x20is\x20not\x20an\x20active\x20user.\x0a\x20','#__REQUESTDIGEST','Folder\x27s\x20length\x20can\x27t\x20be\x20less\x20than\x202\x20character.','158FFiYVk','newPeoplePickerControl','895GWjiQq','SP.Folder','User,SPGroup','/_api/web/folders','<tr\x20style=\x27vertical-align:\x20top\x27><td><label\x20style=\x27display:none\x27\x20class=\x27itemIDClass0\x27></label><input\x20type=\x27text\x27\x20class=\x27groupName0\x27\x20style=\x27width:100%\x27></td>\x20<td><div\x20id=\x27newPeoplePickerControl0\x27\x20style=\x27height:\x2032px;\x20border:\x201px\x20solid\x20#bbbbbb\x20!important;\x27></div></td><td><a\x20style=\x27margin-left:3px;display:\x20none;\x27\x20class=\x27addMore\x27\x20href=\x27#\x27>Add\x20more</a></td></tr>','[id^=','PrincipalAccountType','Group\x20name\x20can\x20not\x20be\x20duplicate,\x20Please\x20enter\x20unique\x20group\x20name.','EntityType','10jUGLHj','SearchPrincipalSource','unbind','slice','Employees','trim','sp.js','.itemIDClass','/_api/web/lists/getbytitle(\x27DocumentSharedGroups\x27)/items?$select=ID,SharedUsers/ID,SharedUsers/Title,SharedUsers/UserName,LogonUser/ID,LogonUser/Title,LogonUser/UserName,SharingLevel&$expand=SharedUsers,LogonUser&$orderby=ID\x20asc&$filter=LogonUser/ID\x20eq\x20\x27','\x27></label>\x20<input\x20type=\x27text\x27\x20class=\x27groupName','Folder\x20created\x20successfully','User','webAbsoluteUrl','Are\x20you\x20sure,you\x20want\x20to\x20remove\x20this\x20group?','\x27\x20style=\x27width:100%\x27></td><td><div\x20id=\x27newPeoplePickerControl','application/json;odata=verbose','append','SharingLevel','/_api/web/lists/GetByTitle(\x27DocumentSharedGroups\x27)/items(','td>label','EMail','SharedUsers','57888SXevWi','2522160jvORHk','[id^=\x27','Folder\x20name\x20can\x20not\x20Contain\x20the\x20Following\x20Characters:\x20.<>#%&*{}?:|\x22\x5c/~`','/_api/web/currentUser','4002qhyWYE','/_api/web/siteusers(@v)?@v=\x27','1559811sDspcR','modal','/_api/web/sitegroups/getbyid(','528tPthsn','Failed','AllowMultipleValues','Error\x20Folder\x20not\x20created','SPClientPeoplePickerDict','toUpperCase','Description','td>input','UserName','show','ListItem','executeFunc','\x27)/Items(','Please\x20enter\x20users\x20name\x20against\x20all\x20groups.','each','LoginName','Add','grep','.addMore','Groups\x20Updated\x20successfully\x20!','customShareingPoplePicker','promise','\x27\x20style=\x27height:\x2032px;\x20border:\x201px\x20solid\x20#bbbbbb\x20!important;\x27></div></td><td><a\x20style=\x27margin-left:3px\x27\x20href=\x27#\x27\x20class=\x27removeRow\x27>Remove</a></td></tr>','toLowerCase','closest','.removeRow','hide','CompanyId','3797408CZlGNx','POST','reject','ServerRelativeUrl','json','results','apply','done','#newPeoplePickerControl','concat','#currentSubFolder','getItemsWithQueryItem','remove','charAt','DisplayText','.openMuSharingGroupPopup',')/users','when','attr','SPGroupID','#createNewGroup','21WnKefd','SP.ClientContext','EntityData','i:0#.f|membership|','getQueryStringParameter','SOD','application/json;\x20odata=verbose','Folder\x20is\x20already\x20exist.','text','stringify','class','setTimeout','28512ChncuC','#myTable\x20tbody\x20tr','DocumentSharedGroups','filter','System\x20Account','find','Please\x20enter\x20group\x20name.','Name','SPClientPeoplePicker','#myTable\x20tbody','val','\x27)?$select=ID,File_x0020_Type&$expand=Folders','PATCH','resolve','MaximumEntitySuggestions','customSharingDeptFolderPplPickr','indexOf','100%','/_api/Web/Lists/getByTitle(\x27','.groupName','td>div','ready','LogonName','Width','AddUserKeys','Key','#thbodyControl','split','/_api/web/lists/getbytitle(\x27','click','ajax','.modal.in','html','#txtnewSubFolderName','length','push','GET','.<>#%&*{}?:|\x22\x5c/~`','\x27)/ListItemAllFields/breakroleinheritance(copyRoleAssignments=false,\x20clearSubscopes=true)','40\x20characters\x20maximum\x20folder\x20length\x20allowed.','#addgoupItems','2487168eBQiKU','DocumentManagementSystem/','log','Deferred','GetAllUserInfo'];a227_0x5bcb=function(){return _0x31c7b2;};return a227_0x5bcb();}function getPeopleUserInfoGroups(_0x4c3304){var _0x3e7495=a227_0x7540a6,_0x55367b=new Array(),_0x42d336=$('[id^=\x27'+_0x4c3304+'\x27]'),_0x48c1a6=SPClientPeoplePicker[_0x3e7495(0xfd)][_0x42d336[0x1]['id']],_0x2737c3=_0x48c1a6[_0x3e7495(0x163)]();if(_0x2737c3[_0x3e7495(0x158)]>0x0){var _0x429e99=new Array(),_0x199d84=new Array();for(var _0x1dd200=0x0;_0x1dd200<_0x2737c3[_0x3e7495(0x158)];_0x1dd200++){var _0x215903=_0x2737c3[_0x1dd200][_0x3e7495(0x14f)],_0x2f4b16=_0x2737c3[_0x1dd200][_0x3e7495(0xd8)];if(_0x2f4b16==_0x3e7495(0xe4))_0x55367b[_0x3e7495(0x159)](GetUserIdGroups(_0x2737c3[_0x1dd200][_0x3e7495(0x14f)]));else{var _0x215903=_0x2737c3[_0x1dd200][_0x3e7495(0x12c)][_0x3e7495(0x128)],_0x1b7aa5=new Array();_0x1b7aa5[_0x3e7495(0x159)](siteusers(_0x215903));var _0x44bed6=_0x55367b[_0x3e7495(0x11e)][_0x3e7495(0x11b)]([],_0x1b7aa5);_0x55367b=_0x55367b[_0x3e7495(0x11e)](_0x44bed6);}}}return _0x55367b;}function GetUserIdGroups(_0x5754b3){var _0x4321cd=a227_0x7540a6,_0x332f23='',_0x4a73fd=_0x4321cd(0x12d),_0x189823=_spPageContextInfo['siteAbsoluteUrl'],_0x5ece99=_0x5754b3;return $['ajax']({'url':_0x189823+_0x4321cd(0xf5)+encodeURIComponent(_0x5ece99)+'\x27','method':_0x4321cd(0x15a),'headers':{'Accept':_0x4321cd(0x130)},'async':![],'success':function(_0x4519b6){_0x332f23=_0x4519b6['d']['Id'];},'error':function(_0x45210f){var _0x4228c1=_0x4321cd;console[_0x4228c1(0x161)](JSON[_0x4228c1(0x133)](_0x45210f));}}),_0x332f23;}function ValidateAllGroups(){var _0x22f1ff=a227_0x7540a6,_0x40ce63=!![],_0x42fc79=new Array();return $(_0x22f1ff(0x137))[_0x22f1ff(0x107)](function(_0x2f7173){var _0x2f726c=_0x22f1ff,_0x1e518b=new Array(),_0x3b1564=$(this)['find'](_0x2f726c(0x100))[_0x2f726c(0x127)](_0x2f726c(0x134)),_0xa4d643=$(this)[_0x2f726c(0x13b)](_0x2f726c(0x14a))[_0x2f726c(0x127)]('id');_0x1e518b=getPeopleUserInfoGroups(_0xa4d643);var _0x4b7d71=$('.'+_0x3b1564)['val'](),_0x5a375d=_0x4b7d71[_0x2f726c(0x110)]()[_0x2f726c(0xde)]();if(_0x42fc79['indexOf'](_0x5a375d)==-0x1)_0x42fc79[_0x2f726c(0x159)](_0x5a375d);else return alert(_0x2f726c(0xd7)),_0x40ce63=![];if(_0x4b7d71['trim']()==null||_0x4b7d71[_0x2f726c(0xde)]()=='')return alert(_0x2f726c(0x13c)),_0x40ce63=![];if(_0x1e518b[_0x2f726c(0x158)]==0x0)return alert(_0x2f726c(0x106)),_0x40ce63=![];}),_0x40ce63;}function CreateDMSFolder(_0x4a1c3b,_0x1f89e0){var _0x593d1b=a227_0x7540a6,_0x2a2255=myCompanyUrl+_0x593d1b(0xd3);$[_0x593d1b(0x154)]({'url':_0x2a2255,'type':_0x593d1b(0x116),'data':JSON['stringify']({'__metadata':{'type':_0x593d1b(0xd1)},'ServerRelativeUrl':_0x4a1c3b+_0x1f89e0}),'async':![],'headers':{'accept':'application/json;odata=verbose','content-type':_0x593d1b(0xe8),'X-RequestDigest':$(_0x593d1b(0x166))['val']()},'success':function(_0x44db46){var _0x28a43c=_0x593d1b,_0x2770aa=_0x44db46['d'][_0x28a43c(0x118)];alert(_0x28a43c(0xe3));},'error':function(){var _0x3d650f=_0x593d1b;waitingDialog['hide'](),console[_0x3d650f(0x161)](_0x3d650f(0xfc));}});}function BreakFolderPermission(_0x2538d2){var _0x3aff66=a227_0x7540a6,_0x67fc98={'Accept':'application/json;odata=verbose','content-Type':_0x3aff66(0xe8),'X-RequestDigest':jQuery(_0x3aff66(0x166))['val']()},_0x2379c4=myCompanyUrl+'/_api/web/GetFolderByServerRelativeUrl(\x27'+_0x2538d2+_0x3aff66(0x15c);$[_0x3aff66(0x154)]({'url':_0x2379c4,'type':_0x3aff66(0x116),'headers':_0x67fc98,'dataType':_0x3aff66(0x119),'success':function(_0x2ddd7f){var _0x37fe43=_0x3aff66;console[_0x37fe43(0x161)]('Permission\x20Assigned\x20on\x20folder.');},'error':function(_0x42db48){var _0x590740=_0x3aff66;alert(JSON[_0x590740(0x133)](_0x42db48));}});}function CreateDMSFolderOnPageLoad(_0x5ee4be){var _0xb5fd4b=a227_0x7540a6,_0x339deb=myCompanyUrl+_0xb5fd4b(0xd3);$[_0xb5fd4b(0x154)]({'url':_0x339deb,'type':_0xb5fd4b(0x116),'data':JSON[_0xb5fd4b(0x133)]({'__metadata':{'type':_0xb5fd4b(0xd1)},'ServerRelativeUrl':_0xb5fd4b(0x160)+_0x5ee4be}),'async':![],'headers':{'accept':'application/json;odata=verbose','content-type':_0xb5fd4b(0xe8),'X-RequestDigest':$(_0xb5fd4b(0x166))[_0xb5fd4b(0x140)]()},'success':function(_0x11bb0c){var _0x4bea4f=_0xb5fd4b;console[_0x4bea4f(0x161)](_0x4bea4f(0xe3));var _0x1f1bc2=_0x11bb0c['d']['ServerRelativeUrl'];BreakFolderPermission(_0x1f1bc2);},'error':function(){var _0x103818=_0xb5fd4b;console[_0x103818(0x161)](_0x103818(0xfc));}});}function siteusers(_0x724966){var _0x1d59e8=a227_0x7540a6,_0x5704f1=[];debugger;return $[_0x1d59e8(0x154)]({'url':_spPageContextInfo['webAbsoluteUrl']+_0x1d59e8(0xf8)+_0x724966+_0x1d59e8(0x125),'type':_0x1d59e8(0x15a),'async':![],'headers':{'Accept':_0x1d59e8(0xe8)},'success':function(_0x31292e,_0x5285e0,_0x360409){var _0x2a2766=_0x1d59e8,_0x3b4190=_0x31292e['d'][_0x2a2766(0x11a)];for(var _0x1afe6d=0x0;_0x1afe6d<_0x3b4190[_0x2a2766(0x158)];_0x1afe6d++){_0x3b4190=$[_0x2a2766(0x10a)](_0x3b4190,function(_0x57cd2b){var _0x1697fc=_0x2a2766;return _0x57cd2b['Title']!==_0x1697fc(0x13a);}),_0x3b4190['length']>0x0&&_0x5704f1[_0x2a2766(0x159)](GetUserIdGroups(_0x3b4190[_0x1afe6d][_0x2a2766(0x108)]));}},'error':function(_0x36c8c2,_0x256d9d,_0x4c686d){var _0x2835a3=_0x1d59e8;console[_0x2835a3(0x161)](_0x2835a3(0xfa));}}),_0x5704f1;}function CheckMediaContent(){var _0x146200=a227_0x7540a6;return AdminWarning='',$(_0x146200(0x137))['each'](function(_0x4fd88f){var _0x5200e9=_0x146200,_0x409751=$(this)['find'](_0x5200e9(0x100))[_0x5200e9(0x127)]('class'),_0x2f946c=$(this)['find']('td>div')[_0x5200e9(0x127)]('id'),_0x296402=$(_0x5200e9(0xd5)+_0x2f946c+']'),_0x2239fe=SPClientPeoplePicker['SPClientPeoplePickerDict'][_0x296402[0x1]['id']],_0x5d6bcf=_0x2239fe[_0x5200e9(0x163)]();for(var _0x4a2d32=0x0;_0x4a2d32<_0x5d6bcf[_0x5200e9(0x158)];_0x4a2d32++){var _0x147579=AllEmployeeuser[_0x5200e9(0x139)](function(_0xbf813c){var _0x1b0319=_0x5200e9;return _0xbf813c[_0x1b0319(0xed)]==_0x5d6bcf[_0x4a2d32][_0x1b0319(0xff)];});_0x147579<0x1&&(AdminWarning+=_0x5d6bcf[_0x4a2d32][_0x5200e9(0x123)]+',',IsActiveOrNot=![],IscheckMessage=!![]);}IscheckMessage&&(AdminWarning+=_0x5200e9(0x165),IscheckMessage=![]);}),IsActiveOrNot;}var AllEmployeeuser=[],RestQuery;function GetUserEmployee(){var _0x468bbd=a227_0x7540a6;RestQuery='?$top=5000&$select=*,LogonName/EMail,LogonName/Id,LogonName/FirstName,LogonName/LastName,LogonName/EMail&$expand=LogonName\x20&$filter=\x20Status\x20eq\x20\x27Active\x27\x20and\x20Company/ID\x20eq\x20'+companyID+'',$[_0x468bbd(0x126)](CommonFunction[_0x468bbd(0x120)](_0x468bbd(0xdd),RestQuery))['done'](function(_0x502ec4){var _0x37a6f2=_0x468bbd;try{for(var _0x31cfe7=0x0;_0x31cfe7<_0x502ec4[_0x37a6f2(0x11a)]['length'];_0x31cfe7++){AllEmployeeuser[_0x37a6f2(0x159)]({'UserId':_0x502ec4[_0x37a6f2(0x11a)][_0x31cfe7]['LogonName']['Id'],'EMail':_0x502ec4['results'][_0x31cfe7][_0x37a6f2(0x14c)][_0x37a6f2(0xed)]});}}catch(_0x1c4b9f){alert(_0x1c4b9f);}});}var AdminWarning,IsActiveOrNot=!![],IscheckMessage=![];function AddRowGroups2(){var _0x29fcc2=a227_0x7540a6,_0x34f875=$('#myTable\x20tbody\x20tr')[_0x29fcc2(0x158)],_0x3b217b=![];for(var _0x14e68d=0x1;_0x14e68d<_0x34f875+0x1;_0x14e68d++){$('#newPeoplePickerControl'+_0x14e68d)[_0x29fcc2(0x158)]==0x0&&(_0x3b217b==![]&&($(_0x29fcc2(0x13f))[_0x29fcc2(0xe9)]('<tr\x20style=\x27vertical-align:\x20top\x27><td><label\x20style=\x27display:none\x27\x20class=\x27itemIDClass'+_0x14e68d+_0x29fcc2(0xe2)+_0x14e68d+'\x27\x20style=\x27width:100%\x27></td><td><div\x20id=\x27newPeoplePickerControl'+_0x14e68d+_0x29fcc2(0x10f)),SetPeoplePicker_MultiselectGroups('newPeoplePickerControl'+_0x14e68d,!![]),_0x3b217b=!![]));}RemoveRowGroups();}