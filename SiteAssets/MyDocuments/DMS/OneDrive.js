var a15_0x47e620=a15_0x4c58;(function(_0x34d15a,_0x58ee79){var _0x24ca10=a15_0x4c58,_0x5a7eee=_0x34d15a();while(!![]){try{var _0x48b49a=-parseInt(_0x24ca10(0x11a))/0x1+parseInt(_0x24ca10(0x88))/0x2*(parseInt(_0x24ca10(0x7c))/0x3)+-parseInt(_0x24ca10(0x119))/0x4*(parseInt(_0x24ca10(0xea))/0x5)+-parseInt(_0x24ca10(0x10a))/0x6*(-parseInt(_0x24ca10(0xa4))/0x7)+-parseInt(_0x24ca10(0xe5))/0x8*(-parseInt(_0x24ca10(0x9c))/0x9)+-parseInt(_0x24ca10(0x78))/0xa*(-parseInt(_0x24ca10(0xa1))/0xb)+-parseInt(_0x24ca10(0x98))/0xc;if(_0x48b49a===_0x58ee79)break;else _0x5a7eee['push'](_0x5a7eee['shift']());}catch(_0x363a1c){_0x5a7eee['push'](_0x5a7eee['shift']());}}}(a15_0x210f,0x9bae9));var currentOneDriveSiteUrl=_spPageContextInfo[a15_0x47e620(0xa8)],oneDriveApplicationId='';function GetOneDriveApplicationId(){var _0x2f425a=a15_0x47e620,_0x2027d8=currentOneDriveSiteUrl+_0x2f425a(0xf5);$[_0x2f425a(0xde)]({'url':_0x2027d8,'headers':{'Accept':_0x2f425a(0xc7)},'async':!![],'success':function(_0x57006c){var _0x1f91d5=_0x2f425a,_0x47312d=_0x57006c['d'][_0x1f91d5(0x8f)];_0x47312d['length']>0x0&&(oneDriveApplicationId=_0x47312d[0x0][_0x1f91d5(0xf1)]);},'error':function(_0x278c1f){}});}function signInToOneDrive(){var _0xec3d31=a15_0x47e620,_0x2ad3bf={'clientId':oneDriveApplicationId,'redirectUri':currentOneDriveSiteUrl+_0xec3d31(0xc8),'scopes':_0xec3d31(0xe3),'authServiceUri':'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'};provideAppInfo(_0x2ad3bf);var _0x25404f=getQueryVariable(_0xec3d31(0x8e));return msGraphApiRoot=_0x25404f?_0x25404f:_0xec3d31(0x10b),challengeForAuth(),saveToCookie({'apiRoot':msGraphApiRoot,'signedin':!![]}),![];}function a15_0x4c58(_0x7ebd16,_0x4b9bbd){var _0x210f78=a15_0x210f();return a15_0x4c58=function(_0x4c5888,_0x52d152){_0x4c5888=_0x4c5888-0x75;var _0x460ce3=_0x210f78[_0x4c5888];return _0x460ce3;},a15_0x4c58(_0x7ebd16,_0x4b9bbd);}function showCustomLoginButton(_0x7819cf){var _0x45fab7=a15_0x47e620,_0x14cf4f=document[_0x45fab7(0xae)](_0x45fab7(0xda));_0x14cf4f[_0x45fab7(0xd2)]['display']=_0x7819cf?_0x45fab7(0x85):_0x45fab7(0x8d);var _0x6ce112=document['getElementById'](_0x45fab7(0x8c));_0x6ce112[_0x45fab7(0xd2)][_0x45fab7(0xd0)]=_0x7819cf?_0x45fab7(0x8d):_0x45fab7(0x85);}function getUrlParts(_0xd936d){var _0x49b612=a15_0x47e620,_0x208aaf=document['createElement']('a');return _0x208aaf[_0x49b612(0xd3)]=_0xd936d,{'hostname':_0x208aaf[_0x49b612(0x96)],'path':_0x208aaf[_0x49b612(0xfc)]};}function setOneDriveTitle(_0x468832){var _0x2ff943=a15_0x47e620,_0x531a46=document['getElementById']('od-site');_0x531a46[_0x2ff943(0xe8)]=_0x468832;}function saveToCookie(_0x46e8b4){var _0x584fe7=a15_0x47e620,_0x33dfeb=new Date();_0x33dfeb[_0x584fe7(0xd4)](_0x33dfeb[_0x584fe7(0xe2)]()+0xe10*0x3e8);var _0x1788d4=JSON[_0x584fe7(0x8a)](_0x46e8b4),_0x5a3970=_0x584fe7(0x115)+_0x1788d4+_0x584fe7(0xab)+_0x33dfeb[_0x584fe7(0x84)]();document['location']['protocol'][_0x584fe7(0xa9)]()==_0x584fe7(0xbe)&&(_0x5a3970=_0x5a3970+_0x584fe7(0xd9)),document[_0x584fe7(0xaa)]=_0x5a3970;}function loadFromCookie(){var _0x4c18fc=a15_0x47e620,_0x20ce6a=document['cookie'],_0x397afc=_0x4c18fc(0x115),_0x12279d=_0x20ce6a[_0x4c18fc(0xff)](_0x397afc);if(_0x12279d>=0x0){_0x12279d+=_0x397afc['length'];var _0x228a0a=_0x20ce6a['indexOf'](';',_0x12279d);_0x228a0a<0x0?_0x228a0a=_0x20ce6a[_0x4c18fc(0x83)]:postCookie=_0x20ce6a[_0x4c18fc(0xbf)](_0x228a0a);var _0x5a69e8=_0x20ce6a['substring'](_0x12279d,_0x228a0a);return JSON[_0x4c18fc(0x9a)](_0x5a69e8);}return'';}function signOut(){var _0x451e36=a15_0x47e620;logoutOfAuth(),saveToCookie({'apiRoot':msGraphApiRoot,'signedin':![]}),$(_0x451e36(0x7b))[_0x451e36(0x7e)](),$(_0x451e36(0x93))[_0x451e36(0x7e)](),$(_0x451e36(0xf2))[_0x451e36(0x7e)](),location[_0x451e36(0xc2)]();}function getQueryVariable(_0x6c8fe0){var _0x1ba468=a15_0x47e620,_0x315563=window[_0x1ba468(0xaf)][_0x1ba468(0xb3)][_0x1ba468(0xbf)](0x1),_0x32a48a=_0x315563[_0x1ba468(0xb8)]('&');for(var _0x430d1e=0x0;_0x430d1e<_0x32a48a[_0x1ba468(0x83)];_0x430d1e++){var _0x240cc2=_0x32a48a[_0x430d1e]['split']('=');if(_0x240cc2[0x0]==_0x6c8fe0)return _0x240cc2[0x1];}return![];}function OpenOneDrive(){var _0x4ff545=a15_0x47e620;if(_spPageContextInfo['ProfileUrl']!=null){debugger;if(_spPageContextInfo[_0x4ff545(0xa7)][_0x4ff545(0xff)](_0x4ff545(0xef))>-0x1){var _0x48ca79=_spPageContextInfo[_0x4ff545(0xa7)][_0x4ff545(0xb8)](_0x4ff545(0xef))[0x0];window[_0x4ff545(0x110)](_0x48ca79,'_blank');}}}function createCookie(_0x6e8a1e,_0x418533,_0x4e9a71){var _0x8ef0d0=a15_0x47e620;if(_0x4e9a71){var _0x433995=new Date();_0x433995[_0x8ef0d0(0xd4)](_0x433995[_0x8ef0d0(0xe2)]()+_0x4e9a71*0x18*0x3c*0x3c*0x3e8);var _0x338c8f=_0x8ef0d0(0xd6)+_0x433995['toGMTString']();}else var _0x338c8f='';document[_0x8ef0d0(0xaa)]=_0x6e8a1e+'='+_0x418533+_0x338c8f+_0x8ef0d0(0xce);}function readTargetUrlCookie(_0x464c82){var _0x585385=a15_0x47e620,_0x24476e=_0x464c82+'=',_0x1ac4c9=document['cookie'][_0x585385(0xb8)](';');for(var _0x1be02d=0x0;_0x1be02d<_0x1ac4c9[_0x585385(0x83)];_0x1be02d++){var _0x411094=_0x1ac4c9[_0x1be02d];while(_0x411094['charAt'](0x0)=='\x20')_0x411094=_0x411094[_0x585385(0xbf)](0x1,_0x411094['length']);if(_0x411094[_0x585385(0xff)](_0x24476e)==0x0)return _0x411094[_0x585385(0xbf)](_0x24476e[_0x585385(0x83)],_0x411094[_0x585385(0x83)]);}return null;}function a15_0x210f(){var _0x259c52=['children','val','length','toUTCString','block','ready','/_layouts/15/images/','11446BcNVtu','error','stringify','substr','od-logoff','none','baseUrl','results','url','https://graph.microsoft.com/v1.0/me/drive/sharedWithMe','<tr><td>','#od-items','hash','push','hostname','html','8077524IHMgeB','/drive/root','parse','<a>','162USYqhp','bind','\x20-\x20','resolve','Error\x20signing\x20in','420937RMlvbR','application/json;odata.metadata=none','\x27\x20target=\x27_blank\x27>','83041GoaklG','<img>','name','ProfileUrl','webAbsoluteUrl','toLowerCase','cookie',';\x20path=/;\x20expires=','folder','debug','getElementById','location','desc','Download','hashchange','search','test','shared','Digital\x20Workplace','Files','split','click','<a\x20href=\x27','endrecord','attr','&amp;','https','substring','</td></tr>','totalpages','reload','replace','responseText','.openonedrivelauncher','null','application/json;odata=verbose','/SiteAssets/EmployeeSynchronous/OneDrive/CallBack.aspx','value','asc','webUrl','src','Deferred',';\x20path=/','#__REQUESTDIGEST','display','string','style','href','setTime','number',';\x20expires=','reject','apiRoot',';secure','od-login','totalrecords','large','#oneDriveSharedWithTableBody','ajax','sorter','</span>','<p>error.</p>','getTime','user.read\x20files.read\x20files.read.all\x20sites.read.all','key','280yEFJEX','title','each','innerText','&lt;','756655hFfFCA','MapToIcon','class','download','@microsoft.graph.downloadUrl','person','<span\x20class=\x22','ChangeFileName','#od-json','nameplate','evenselected','/_api/Web/Lists/GetByTitle(\x27EnvironmentalSettings\x27)/Items?$select=ID,ChangeFileName,Title&$Filter=Title\x20eq\x20\x27ApplicationId\x27','<div>','\x27,progid=\x27\x27,size=0)','evenrow','oddrow','addClass','appendTo','pathname','/SiteAssets/EmployeeSynchronous/OneDrive/new2.aspx','<p>No\x20items\x20in\x20this\x20folder.</p>','indexOf','json','https://graph.microsoft.com','startrecord','sharedDateTime','<span\x20class=\x27glyphicon\x20glyphicon-folder-open\x27\x20style=\x27margin-right:10px\x27></span><a\x20href=\x27','item','\x20>\x20','?expand=thumbnails,children(expand=thumbnails(select=','iconType','text','642xteLdA','https://graph.microsoft.com/v1.0/me','</td><td>','Bearer\x20','oneup','append','open','boolean','file','promise','<pre>','odexplorer=','access_token','/_api/SP.OAuth.Token/Acquire','log','16kzKOKk','15832vobBYU','lastModifiedBy','image','head','thumbnails','170pjTdgp','columns','#btnOneDriveSharedWithMe','#od-breadcrumb','6CfxTjO','</a>','empty','<img\x20style=\x27margin-right:10px;\x27\x20src=\x27','pagedropdown'];a15_0x210f=function(){return _0x259c52;};return a15_0x210f();}function getGraphAccessToken(){var _0x4fe675=a15_0x47e620,_0x778a67=new jQuery[(_0x4fe675(0xcd))](),_0x4a7bf5={'X-RequestDigest':$(_0x4fe675(0xcf))[_0x4fe675(0x82)](),'accept':'application/json;odata=nometadata','content-type':'application/json;odata=nometadata'},_0x58ce86={'resource':_0x4fe675(0x101)};return $[_0x4fe675(0xde)]({'url':_spPageContextInfo[_0x4fe675(0xa8)]+_0x4fe675(0x117),'headers':_0x4a7bf5,'type':'POST','async':![],'data':JSON[_0x4fe675(0x8a)](_0x58ce86),'success':function(_0x3b376f){var _0x358742=_0x4fe675,_0x2f5a90=_0x3b376f[_0x358742(0x116)];createCookie('OneDriveAccesTokenValue',_0x2f5a90,0x1),_0x778a67[_0x358742(0x9f)](_0x2f5a90);},'error':function(_0x180ce8,_0x737d95,_0x3afa56){var _0xcc539f=_0x4fe675;console[_0xcc539f(0x118)](_0x180ce8[_0xcc539f(0xc4)]),_0x778a67[_0xcc539f(0xd7)](_0x180ce8[_0xcc539f(0xc4)]);}}),_0x778a67[_0x4fe675(0x113)]();}function GetSharedWithMeDocument(_0x4f33c7,_0xb8818){var _0x4d461d=a15_0x47e620;debugger;if(_0x4f33c7){var _0xc9f87d=_0x4d461d(0x91);$[_0x4d461d(0xde)]({'url':_0xc9f87d,'dataType':_0x4d461d(0x100),'headers':{'Authorization':_0x4d461d(0x10d)+_0x4f33c7},'accept':_0x4d461d(0xa2),'success':function(_0x531e91){var _0x7b6e35=_0x4d461d,_0x322567='';if(_0x531e91)for(var _0x2a2611=0x0;_0x2a2611<_0x531e91[_0x7b6e35(0xc9)][_0x7b6e35(0x83)];_0x2a2611++){var _0x1886c7=_0x531e91['value'][_0x2a2611][_0x7b6e35(0xa6)],_0x17ec3e=_0x1886c7[_0x7b6e35(0xb8)]('.')[0x1],_0x4c9ff2='';_0x17ec3e==null||_0x17ec3e==''?_0x4c9ff2=_0x7b6e35(0x104)+_0x531e91[_0x7b6e35(0xc9)][_0x2a2611][_0x7b6e35(0xcb)]+'\x27\x20target=\x27_blank\x27>'+_0x531e91['value'][_0x2a2611][_0x7b6e35(0xa6)]+_0x7b6e35(0x7d):(icon=GetDocumentTypeIcon('.'+_0x17ec3e),_0x4c9ff2=_0x7b6e35(0xba)+_0x531e91[_0x7b6e35(0xc9)][_0x2a2611][_0x7b6e35(0xcb)]+_0x7b6e35(0xa3)+icon+_0x531e91[_0x7b6e35(0xc9)][_0x2a2611][_0x7b6e35(0xa6)]+_0x7b6e35(0x7d)),_0x322567+=_0x7b6e35(0x92)+_0x4c9ff2+_0x7b6e35(0x10c)+_0x531e91[_0x7b6e35(0xc9)][_0x2a2611]['remoteItem'][_0x7b6e35(0xb5)][_0x7b6e35(0x103)]+_0x7b6e35(0x10c)+_0x531e91['value'][_0x2a2611][_0x7b6e35(0x11b)]['user']['displayName']+_0x7b6e35(0xc0);}$(_0x7b6e35(0xdd))[_0x7b6e35(0x97)](''),$(_0x7b6e35(0xdd))[_0x7b6e35(0x10f)](_0x322567);}});}else alert(_0x4d461d(0xa0));}function GenerateTable(){var _0x365323=a15_0x47e620;sorter=new TINY['table'][(_0x365323(0xdf))](_0x365323(0xdf),'tableTempEmpOffice365',{'headclass':_0x365323(0x76),'ascclass':_0x365323(0xca),'descclass':_0x365323(0xb0),'evenclass':_0x365323(0xf8),'oddclass':_0x365323(0xf9),'evenselclass':_0x365323(0xf4),'oddselclass':'oddselected','paginate':!![],'size':0xa,'colddid':_0x365323(0x79),'currentid':'currentpage','totalid':_0x365323(0xc1),'startingrecid':_0x365323(0x102),'endingrecid':_0x365323(0xbb),'totalrecid':_0x365323(0xdb),'hoverid':'selectedrow','pageddid':_0x365323(0x80),'navid':'tablenav','sortdir':0x1,'init':!![]});}var arrayLinksDoctype=new Array();function GetDocumentTypeIcon(_0x37f341){var _0x342866=a15_0x47e620,_0x587f67='';for(var _0x351751=0x0;_0x351751<arrayLinksDoctype['length'];_0x351751++){arrayLinksDoctype[_0x351751][_0x342866(0x108)][_0x342866(0xb8)]('.')[0x0][_0x342866(0xff)](_0x37f341['split']('.')[0x1])!=-0x1&&(_0x587f67=arrayLinksDoctype[_0x351751][_0x342866(0x75)]);}if(_0x587f67[_0x342866(0x83)]==0x0){var _0x39444e=_spPageContextInfo['webAbsoluteUrl']+'/_api/web/maptoicon(filename=\x27'+_0x37f341+_0x342866(0xf7);$[_0x342866(0xde)]({'url':_0x39444e,'headers':{'Accept':_0x342866(0xc7)},'async':![],'success':function(_0x4e58bb){var _0x117db7=_0x342866,_0x21054c=_0x117db7(0x7f)+_spPageContextInfo[_0x117db7(0xa8)]+_0x117db7(0x87)+_0x4e58bb['d'][_0x117db7(0xeb)]+'\x27/>';_0x587f67=_0x21054c,arrayLinksDoctype[_0x117db7(0x95)](IconProperties(_0x4e58bb['d'][_0x117db7(0xeb)],_0x21054c));},'eror':function(_0x50391f){var _0x172e2b=_0x342866;console['log'](_0x172e2b(0x89));}});}return _0x587f67;}function IconProperties(_0x174805,_0x5641b8){var _0x53388a=a15_0x47e620,_0x3d95e5=[];return _0x3d95e5[_0x53388a(0x108)]=_0x174805,_0x3d95e5[_0x53388a(0x75)]=_0x5641b8,_0x3d95e5;}$(document)[a15_0x47e620(0x86)](function(){var _0x489af8=a15_0x47e620;$(_0x489af8(0x7a))['click'](function(){var _0x4924c0=readTargetUrlCookie('OneDriveAccesTokenValue');if(_0x4924c0){}});});var baseUrl=getQueryVariable(a15_0x47e620(0x8e));msGraphApiRoot=baseUrl?baseUrl:a15_0x47e620(0x10b);var data=loadFromCookie();if(data){if(!baseUrl)msGraphApiRoot=data[a15_0x47e620(0xd8)];showCustomLoginButton(!data['signedin']);}var loadedForHash='';$(window)[a15_0x47e620(0x9d)](a15_0x47e620(0xb2),function(){var _0x520020=a15_0x47e620;return window['location'][_0x520020(0x94)]!=loadedForHash&&(loadedForHash=window[_0x520020(0xaf)][_0x520020(0x94)],odauth()),![];}),$(document)['on']({'ajaxStart':function(){},'ajaxStop':function(){}});function syntaxHighlight(_0x1bd955){var _0x22ca4b=a15_0x47e620,_0x583d7d=JSON[_0x22ca4b(0x8a)](_0x1bd955,undefined,0x2);return _0x583d7d=_0x583d7d['replace'](/&/g,_0x22ca4b(0xbd))[_0x22ca4b(0xc3)](/</g,_0x22ca4b(0xe9))[_0x22ca4b(0xc3)](/>/g,'&gt;'),_0x583d7d[_0x22ca4b(0xc3)](/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(_0x4cdaae){var _0x1d69b9=_0x22ca4b,_0xee0df1=_0x1d69b9(0xd5);if(/^"/[_0x1d69b9(0xb4)](_0x4cdaae))/:$/['test'](_0x4cdaae)?_0xee0df1=_0x1d69b9(0xe4):_0xee0df1=_0x1d69b9(0xd1);else{if(/true|false/['test'](_0x4cdaae))_0xee0df1=_0x1d69b9(0x111);else/null/['test'](_0x4cdaae)&&(_0xee0df1=_0x1d69b9(0xc6));}return _0x1d69b9(0xf0)+_0xee0df1+'\x22>'+_0x4cdaae+_0x1d69b9(0xe0);});}function updateBreadcrumb(_0xa46d9a){var _0x124301=a15_0x47e620,_0xa11f61=_0xa46d9a||'';$(_0x124301(0x7b))[_0x124301(0x7e)]();var _0x5af051='',_0x1785c7=_0xa11f61[_0x124301(0xb8)]('/');for(var _0x61ee6e=0x0;_0x61ee6e<_0x1785c7['length'];_0x61ee6e++){_0x61ee6e>0x0&&$('<span>')[_0x124301(0x109)](_0x124301(0x106))[_0x124301(0xfb)](_0x124301(0x7b));var _0x1e581f=_0x1785c7[_0x61ee6e];_0x1e581f?_0x5af051=_0x5af051+'/'+encodeURIComponent(_0x1e581f):_0x1e581f=_0x124301(0xb7),$(_0x124301(0x9b))['attr'](_0x124301(0xd3),'#'+_0x5af051)['click'](function(){var _0x26df40=_0x124301;loadedForHash=$(this)[_0x26df40(0xbc)]('href'),window[_0x26df40(0xaf)]=loadedForHash,odauth(!![]);})[_0x124301(0x109)](_0x1e581f)[_0x124301(0xfb)](_0x124301(0x7b));}}function onAuthenticated(_0x358dd3,_0x59bfab){var _0x46da70=a15_0x47e620;_0x358dd3?function(_0x1eaf57){var _0x13dbf3=a15_0x4c58,_0x768cbf='',_0x1bbf8c='',_0x5c4413='';window['location'][_0x13dbf3(0x94)][_0x13dbf3(0x83)]>0x1&&(_0x768cbf=window['location']['hash'][_0x13dbf3(0x8b)](0x1),_0x1bbf8c=':',_0x5c4413=':');var _0x23a816=msGraphApiRoot+_0x13dbf3(0x99)+_0x1bbf8c+_0x768cbf+_0x5c4413,_0x301575=_0x13dbf3(0xdc),_0x31167e=_0x13dbf3(0x107)+_0x301575+'))';_0x1eaf57[_0x13dbf3(0xde)]({'url':_0x23a816+_0x31167e,'dataType':_0x13dbf3(0x100),'headers':{'Authorization':_0x13dbf3(0x10d)+_0x358dd3},'accept':_0x13dbf3(0xa2),'success':function(_0x27f7fa){var _0x4e17a0=_0x13dbf3;if(_0x27f7fa){_0x1eaf57(_0x4e17a0(0x93))[_0x4e17a0(0x7e)](),_0x1eaf57(_0x4e17a0(0xf2))[_0x4e17a0(0x7e)](),_0x1eaf57(_0x4e17a0(0x114))['html'](syntaxHighlight(_0x27f7fa))[_0x4e17a0(0xfb)](_0x4e17a0(0xf2));var _0x29662d=decodeURIComponent(_0x768cbf);document[_0x4e17a0(0xe6)]=_0x4e17a0(0xb6)+(_0x29662d['length']>0x0?_0x4e17a0(0x9e)+_0x29662d:''),updateBreadcrumb(_0x29662d);var _0x2a3bc7=_0x27f7fa[_0x4e17a0(0x81)]||_0x27f7fa[_0x4e17a0(0xc9)];if(_0x2a3bc7&&_0x2a3bc7['length']>0x0)_0x1eaf57[_0x4e17a0(0xe7)](_0x2a3bc7,function(_0x48fe9f,_0x1a7a53){var _0x5beb21=_0x4e17a0,_0x1f9a14='#'+_0x768cbf+'/'+encodeURIComponent(_0x1a7a53[_0x5beb21(0xa6)]);_0x1a7a53[_0x5beb21(0x112)]&&(_0x1f9a14=_0x27f7fa[_0x5beb21(0x81)][_0x48fe9f][_0x5beb21(0xee)]);var _0x1d65bf=_0x1eaf57(_0x5beb21(0xf6))[_0x5beb21(0xbc)](_0x5beb21(0xd3),_0x1f9a14)[_0x5beb21(0xfa)](_0x5beb21(0x105))[_0x5beb21(0xb9)](function(){var _0x5a0ddf=_0x5beb21;loadedForHash=_0x1eaf57(this)[_0x5a0ddf(0xbc)]('href'),window[_0x5a0ddf(0xaf)]=loadedForHash,odauth(!![]);})[_0x5beb21(0xfb)](_0x5beb21(0x93));_0x1a7a53['folder']&&_0x1d65bf[_0x5beb21(0xfa)](_0x5beb21(0xac));_0x1a7a53[_0x5beb21(0x112)]&&_0x1d65bf[_0x5beb21(0xfa)](_0x5beb21(0x112));if(_0x1a7a53[_0x5beb21(0x77)]&&_0x1a7a53[_0x5beb21(0x77)][_0x5beb21(0x83)]>0x0){var _0xb48679=_0x1eaf57(_0x5beb21(0xf6))['attr'](_0x5beb21(0xec),'img-container')['appendTo'](_0x1d65bf);_0x1eaf57(_0x5beb21(0xa5))[_0x5beb21(0xbc)]('src',_0x1a7a53[_0x5beb21(0x77)][0x0][_0x301575][_0x5beb21(0x90)])[_0x5beb21(0xfb)](_0xb48679);}_0x1eaf57('<div>')[_0x5beb21(0xfa)](_0x5beb21(0xf3))['text'](_0x1a7a53[_0x5beb21(0xa6)])['appendTo'](_0x1d65bf);});else{if(_0x27f7fa[_0x4e17a0(0x112)]){var _0x2cef84=_0x1eaf57(_0x4e17a0(0xf6))[_0x4e17a0(0xfa)](_0x4e17a0(0x105))['addClass'](_0x4e17a0(0x10e))[_0x4e17a0(0xfb)](_0x4e17a0(0x93)),_0x54d8cf=_0x27f7fa[_0x4e17a0(0xee)];_0x54d8cf&&_0x2cef84[_0x4e17a0(0xb9)](function(){var _0x3e062f=_0x4e17a0;window['open'](_0x54d8cf,_0x3e062f(0xb1));}),_0x27f7fa[_0x4e17a0(0xac)]&&_0x2cef84[_0x4e17a0(0xfa)](_0x4e17a0(0xac)),_0x27f7fa['thumbnails']&&_0x27f7fa['thumbnails']['length']>0x0&&_0x1eaf57('<img>')[_0x4e17a0(0xbc)](_0x4e17a0(0xcc),_0x27f7fa['thumbnails'][0x0][_0x4e17a0(0xdc)][_0x4e17a0(0x90)])[_0x4e17a0(0xfb)](_0x2cef84);}else _0x1eaf57(_0x4e17a0(0xfe))[_0x4e17a0(0xfb)]('#od-items');}}else _0x1eaf57(_0x4e17a0(0x93))[_0x4e17a0(0x7e)](),_0x1eaf57(_0x4e17a0(0xe1))[_0x4e17a0(0xfb)](_0x4e17a0(0x93)),_0x1eaf57(_0x4e17a0(0xf2))[_0x4e17a0(0x7e)]();}});}(jQuery):alert(_0x46da70(0xa0));}$(document)[a15_0x47e620(0x86)](function(){var _0x4d372f=a15_0x47e620;$(_0x4d372f(0xc5))[_0x4d372f(0xb9)](function(){OpenOneDrive();}),$('.onedrivelauncher')[_0x4d372f(0xb9)](function(){launchOneDrivePicker();});});function launchOneDrivePicker(){var _0x48f23a=a15_0x47e620,_0x45cd48={'clientId':oneDriveApplicationId,'action':_0x48f23a(0xed),'advanced':{'redirectUri':currentOneDriveSiteUrl+_0x48f23a(0xfd)},'multiSelect':!![],'openInNewWindow':!![],'success':function(_0x44f900){var _0x2e4eae=_0x48f23a;console[_0x2e4eae(0xad)](_0x44f900);},'cancel':function(){},'error':function(_0x1134ea){}};OneDrive['open'](_0x45cd48);}