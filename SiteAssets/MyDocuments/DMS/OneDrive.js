var a358_0x336a88=a358_0x3cf6;(function(_0xc30c0c,_0x158fa6){var _0x2cafb9=a358_0x3cf6,_0x2d1094=_0xc30c0c();while(!![]){try{var _0x1978fa=parseInt(_0x2cafb9(0x221))/0x1*(parseInt(_0x2cafb9(0x230))/0x2)+parseInt(_0x2cafb9(0x253))/0x3+parseInt(_0x2cafb9(0x1d8))/0x4+parseInt(_0x2cafb9(0x24e))/0x5+-parseInt(_0x2cafb9(0x237))/0x6+-parseInt(_0x2cafb9(0x1c8))/0x7*(parseInt(_0x2cafb9(0x232))/0x8)+parseInt(_0x2cafb9(0x235))/0x9*(-parseInt(_0x2cafb9(0x21f))/0xa);if(_0x1978fa===_0x158fa6)break;else _0x2d1094['push'](_0x2d1094['shift']());}catch(_0x552ca4){_0x2d1094['push'](_0x2d1094['shift']());}}}(a358_0x5928,0xd42d7));var currentOneDriveSiteUrl=_spPageContextInfo[a358_0x336a88(0x256)],oneDriveApplicationId='';function GetOneDriveApplicationId(){var _0x21eb00=a358_0x336a88,_0x5b7489=currentOneDriveSiteUrl+_0x21eb00(0x1c2);$[_0x21eb00(0x210)]({'url':_0x5b7489,'headers':{'Accept':_0x21eb00(0x1f1)},'async':!![],'success':function(_0x50669b){var _0x541f76=_0x21eb00,_0x180a20=_0x50669b['d']['results'];_0x180a20['length']>0x0&&(oneDriveApplicationId=_0x180a20[0x0][_0x541f76(0x1fc)]);},'error':function(_0x2e6f5d){}});}function signInToOneDrive(){var _0x923412=a358_0x336a88,_0x2334e9={'clientId':oneDriveApplicationId,'redirectUri':currentOneDriveSiteUrl+'/SiteAssets/EmployeeSynchronous/OneDrive/CallBack.aspx','scopes':'user.read\x20files.read\x20files.read.all\x20sites.read.all','authServiceUri':_0x923412(0x1db)};provideAppInfo(_0x2334e9);var _0x10b329=getQueryVariable(_0x923412(0x208));return msGraphApiRoot=_0x10b329?_0x10b329:_0x923412(0x1de),challengeForAuth(),saveToCookie({'apiRoot':msGraphApiRoot,'signedin':!![]}),![];}function showCustomLoginButton(_0xfe50a8){var _0x1486b8=a358_0x336a88,_0x4a64f9=document[_0x1486b8(0x231)]('od-login');_0x4a64f9[_0x1486b8(0x240)]['display']=_0xfe50a8?_0x1486b8(0x242):_0x1486b8(0x1df);var _0x520bff=document[_0x1486b8(0x231)](_0x1486b8(0x20d));_0x520bff['style']['display']=_0xfe50a8?_0x1486b8(0x1df):_0x1486b8(0x242);}function getUrlParts(_0xa51178){var _0x31c8dc=a358_0x336a88,_0x3c265e=document[_0x31c8dc(0x243)]('a');return _0x3c265e[_0x31c8dc(0x257)]=_0xa51178,{'hostname':_0x3c265e[_0x31c8dc(0x1e7)],'path':_0x3c265e['pathname']};}function a358_0x3cf6(_0x4bd203,_0x377bad){var _0x592897=a358_0x5928();return a358_0x3cf6=function(_0x3cf6b6,_0x25a078){_0x3cf6b6=_0x3cf6b6-0x1c1;var _0x5a91ea=_0x592897[_0x3cf6b6];return _0x5a91ea;},a358_0x3cf6(_0x4bd203,_0x377bad);}function setOneDriveTitle(_0xbde0b9){var _0x3e1ba4=a358_0x336a88,_0x417cb3=document[_0x3e1ba4(0x231)](_0x3e1ba4(0x20a));_0x417cb3[_0x3e1ba4(0x22d)]=_0xbde0b9;}function saveToCookie(_0x4894c7){var _0xf300e4=a358_0x336a88,_0x46ea12=new Date();_0x46ea12['setTime'](_0x46ea12['getTime']()+0xe10*0x3e8);var _0x53ff3b=JSON['stringify'](_0x4894c7),_0x5c39b6='odexplorer='+_0x53ff3b+';\x20path=/;\x20expires='+_0x46ea12[_0xf300e4(0x1fe)]();document[_0xf300e4(0x20b)][_0xf300e4(0x244)][_0xf300e4(0x1d1)]()=='https'&&(_0x5c39b6=_0x5c39b6+_0xf300e4(0x248)),document[_0xf300e4(0x259)]=_0x5c39b6;}function loadFromCookie(){var _0x262824=a358_0x336a88,_0x36bd40=document[_0x262824(0x259)],_0xee751d=_0x262824(0x223),_0x30faa9=_0x36bd40[_0x262824(0x1f3)](_0xee751d);if(_0x30faa9>=0x0){_0x30faa9+=_0xee751d[_0x262824(0x1e9)];var _0x3b7911=_0x36bd40[_0x262824(0x1f3)](';',_0x30faa9);_0x3b7911<0x0?_0x3b7911=_0x36bd40['length']:postCookie=_0x36bd40[_0x262824(0x21c)](_0x3b7911);var _0x3564d9=_0x36bd40[_0x262824(0x21c)](_0x30faa9,_0x3b7911);return JSON[_0x262824(0x23d)](_0x3564d9);}return'';}function signOut(){var _0x34f891=a358_0x336a88;logoutOfAuth(),saveToCookie({'apiRoot':msGraphApiRoot,'signedin':![]}),$(_0x34f891(0x1c5))[_0x34f891(0x1c3)](),$('#od-items')[_0x34f891(0x1c3)](),$(_0x34f891(0x202))[_0x34f891(0x1c3)](),location[_0x34f891(0x1f6)]();}function getQueryVariable(_0x11ebba){var _0x187c1e=a358_0x336a88,_0x5580d9=window[_0x187c1e(0x20b)][_0x187c1e(0x21a)][_0x187c1e(0x21c)](0x1),_0x43d97f=_0x5580d9[_0x187c1e(0x1c9)]('&');for(var _0x15880f=0x0;_0x15880f<_0x43d97f[_0x187c1e(0x1e9)];_0x15880f++){var _0x27995e=_0x43d97f[_0x15880f][_0x187c1e(0x1c9)]('=');if(_0x27995e[0x0]==_0x11ebba)return _0x27995e[0x1];}return![];}function OpenOneDrive(){var _0x3df78b=a358_0x336a88;if(_spPageContextInfo[_0x3df78b(0x25c)]!=null){debugger;if(_spPageContextInfo['ProfileUrl'][_0x3df78b(0x1f3)]('person')>-0x1){var _0x10e4fe=_spPageContextInfo['ProfileUrl'][_0x3df78b(0x1c9)](_0x3df78b(0x1cb))[0x0];window[_0x3df78b(0x20e)](_0x10e4fe,_0x3df78b(0x213));}}}function createCookie(_0x5c98b8,_0x5a8a89,_0x428929){var _0x1cd7fa=a358_0x336a88;if(_0x428929){var _0x1b8e1c=new Date();_0x1b8e1c['setTime'](_0x1b8e1c[_0x1cd7fa(0x246)]()+_0x428929*0x18*0x3c*0x3c*0x3e8);var _0x5f2662=_0x1cd7fa(0x205)+_0x1b8e1c[_0x1cd7fa(0x219)]();}else var _0x5f2662='';document[_0x1cd7fa(0x259)]=_0x5c98b8+'='+_0x5a8a89+_0x5f2662+_0x1cd7fa(0x1d6);}function readTargetUrlCookie(_0x255fcd){var _0x52e7b5=a358_0x336a88,_0x350646=_0x255fcd+'=',_0x1b6534=document[_0x52e7b5(0x259)][_0x52e7b5(0x1c9)](';');for(var _0x16a6d1=0x0;_0x16a6d1<_0x1b6534['length'];_0x16a6d1++){var _0x3912b0=_0x1b6534[_0x16a6d1];while(_0x3912b0['charAt'](0x0)=='\x20')_0x3912b0=_0x3912b0[_0x52e7b5(0x21c)](0x1,_0x3912b0['length']);if(_0x3912b0[_0x52e7b5(0x1f3)](_0x350646)==0x0)return _0x3912b0[_0x52e7b5(0x21c)](_0x350646[_0x52e7b5(0x1e9)],_0x3912b0['length']);}return null;}function getGraphAccessToken(){var _0x5c7b09=a358_0x336a88,_0x1c39a0=new jQuery['Deferred'](),_0x1e7081={'X-RequestDigest':$('#__REQUESTDIGEST')[_0x5c7b09(0x1e2)](),'accept':_0x5c7b09(0x220),'content-type':_0x5c7b09(0x220)},_0x35ed6c={'resource':_0x5c7b09(0x23c)};return $[_0x5c7b09(0x210)]({'url':_spPageContextInfo[_0x5c7b09(0x256)]+'/_api/SP.OAuth.Token/Acquire','headers':_0x1e7081,'type':_0x5c7b09(0x1ff),'async':![],'data':JSON['stringify'](_0x35ed6c),'success':function(_0x1f5e32){var _0x1233bb=_0x5c7b09,_0x41eb49=_0x1f5e32[_0x1233bb(0x249)];createCookie(_0x1233bb(0x1c4),_0x41eb49,0x1),_0x1c39a0['resolve'](_0x41eb49);},'error':function(_0x3398ab,_0x26abda,_0x27d03c){var _0x57c8d=_0x5c7b09;console[_0x57c8d(0x207)](_0x3398ab[_0x57c8d(0x218)]),_0x1c39a0[_0x57c8d(0x25b)](_0x3398ab[_0x57c8d(0x218)]);}}),_0x1c39a0[_0x5c7b09(0x216)]();}function GetSharedWithMeDocument(_0xdf155,_0x4d5385){var _0x53af8a=a358_0x336a88;debugger;if(_0xdf155){var _0x5f0c20=_0x53af8a(0x20c);$[_0x53af8a(0x210)]({'url':_0x5f0c20,'dataType':_0x53af8a(0x1cf),'headers':{'Authorization':_0x53af8a(0x1e0)+_0xdf155},'accept':_0x53af8a(0x1d4),'success':function(_0x32d6b5){var _0x2100cf=_0x53af8a,_0x56f39a='';if(_0x32d6b5)for(var _0x45033b=0x0;_0x45033b<_0x32d6b5['value']['length'];_0x45033b++){var _0x4cd599=_0x32d6b5[_0x2100cf(0x1cc)][_0x45033b]['name'],_0x1012a9=_0x4cd599['split']('.')[0x1],_0x4499c1='';_0x1012a9==null||_0x1012a9==''?_0x4499c1='<span\x20class=\x27glyphicon\x20glyphicon-folder-open\x27\x20style=\x27margin-right:10px\x27></span><a\x20href=\x27'+_0x32d6b5[_0x2100cf(0x1cc)][_0x45033b][_0x2100cf(0x24c)]+'\x27\x20target=\x27_blank\x27>'+_0x32d6b5[_0x2100cf(0x1cc)][_0x45033b]['name']+_0x2100cf(0x200):(icon=GetDocumentTypeIcon('.'+_0x1012a9),_0x4499c1='<a\x20href=\x27'+_0x32d6b5['value'][_0x45033b]['webUrl']+'\x27\x20target=\x27_blank\x27>'+icon+_0x32d6b5[_0x2100cf(0x1cc)][_0x45033b][_0x2100cf(0x226)]+_0x2100cf(0x200)),_0x56f39a+=_0x2100cf(0x1c7)+_0x4499c1+_0x2100cf(0x203)+_0x32d6b5[_0x2100cf(0x1cc)][_0x45033b][_0x2100cf(0x21b)]['shared'][_0x2100cf(0x215)]+_0x2100cf(0x203)+_0x32d6b5[_0x2100cf(0x1cc)][_0x45033b][_0x2100cf(0x25e)][_0x2100cf(0x23a)][_0x2100cf(0x21d)]+_0x2100cf(0x1e5);}$(_0x2100cf(0x1ee))[_0x2100cf(0x229)](''),$(_0x2100cf(0x1ee))[_0x2100cf(0x22e)](_0x56f39a);}});}else alert(_0x53af8a(0x25d));}function GenerateTable(){var _0x22453d=a358_0x336a88;sorter=new TINY[(_0x22453d(0x217))]['sorter'](_0x22453d(0x250),_0x22453d(0x234),{'headclass':_0x22453d(0x24a),'ascclass':_0x22453d(0x201),'descclass':'desc','evenclass':'evenrow','oddclass':_0x22453d(0x241),'evenselclass':_0x22453d(0x23b),'oddselclass':_0x22453d(0x238),'paginate':!![],'size':0xa,'colddid':_0x22453d(0x1d5),'currentid':_0x22453d(0x1d3),'totalid':_0x22453d(0x206),'startingrecid':'startrecord','endingrecid':_0x22453d(0x22c),'totalrecid':_0x22453d(0x1ed),'hoverid':_0x22453d(0x1d9),'pageddid':_0x22453d(0x239),'navid':_0x22453d(0x25a),'sortdir':0x1,'init':!![]});}var arrayLinksDoctype=new Array();function GetDocumentTypeIcon(_0x2dfedd){var _0x585822=a358_0x336a88,_0x215fe='';for(var _0x2296c7=0x0;_0x2296c7<arrayLinksDoctype[_0x585822(0x1e9)];_0x2296c7++){arrayLinksDoctype[_0x2296c7][_0x585822(0x211)][_0x585822(0x1c9)]('.')[0x0][_0x585822(0x1f3)](_0x2dfedd[_0x585822(0x1c9)]('.')[0x1])!=-0x1&&(_0x215fe=arrayLinksDoctype[_0x2296c7][_0x585822(0x233)]);}if(_0x215fe['length']==0x0){var _0x1a48ec=_spPageContextInfo[_0x585822(0x256)]+_0x585822(0x1e4)+_0x2dfedd+'\x27,progid=\x27\x27,size=0)';$[_0x585822(0x210)]({'url':_0x1a48ec,'headers':{'Accept':_0x585822(0x1f1)},'async':![],'success':function(_0xf5a19a){var _0x6d9ea6=_0x585822,_0xe9caf9='<img\x20style=\x27margin-right:10px;\x27\x20src=\x27'+_spPageContextInfo[_0x6d9ea6(0x256)]+'/_layouts/15/images/'+_0xf5a19a['d'][_0x6d9ea6(0x1fd)]+_0x6d9ea6(0x245);_0x215fe=_0xe9caf9,arrayLinksDoctype[_0x6d9ea6(0x1dc)](IconProperties(_0xf5a19a['d'][_0x6d9ea6(0x1fd)],_0xe9caf9));},'eror':function(_0x3bd56d){var _0x565e91=_0x585822;console[_0x565e91(0x207)](_0x565e91(0x21e));}});}return _0x215fe;}function IconProperties(_0x2c32c3,_0x4a3f4a){var _0x415665=a358_0x336a88,_0x57f41e=[];return _0x57f41e[_0x415665(0x211)]=_0x2c32c3,_0x57f41e[_0x415665(0x233)]=_0x4a3f4a,_0x57f41e;}$(document)[a358_0x336a88(0x258)](function(){var _0x5cd775=a358_0x336a88;$(_0x5cd775(0x23e))[_0x5cd775(0x1ce)](function(){var _0xeafdbf=_0x5cd775,_0x2c5697=readTargetUrlCookie(_0xeafdbf(0x1c4));if(_0x2c5697){}});});var baseUrl=getQueryVariable(a358_0x336a88(0x208));msGraphApiRoot=baseUrl?baseUrl:a358_0x336a88(0x1de);var data=loadFromCookie();function a358_0x5928(){var _0x3e4b3a=['7005080ZauflX','.openonedrivelauncher','sorter','class','Digital\x20Workplace','3307938AnBmEx','hash','hashchange','webAbsoluteUrl','href','ready','cookie','tablenav','reject','ProfileUrl','Error\x20signing\x20in','lastModifiedBy','<p>No\x20items\x20in\x20this\x20folder.</p>','&gt;','/_api/Web/Lists/GetByTitle(\x27EnvironmentalSettings\x27)/Items?$select=ID,ChangeFileName,Title&$Filter=Title\x20eq\x20\x27ApplicationId\x27','empty','OneDriveAccesTokenValue','#od-breadcrumb','apiRoot','<tr><td>','35cKsOzs','split','\x20>\x20','person','value','/SiteAssets/EmployeeSynchronous/OneDrive/new2.aspx','click','json','attr','toLowerCase','folder','currentpage','application/json;odata.metadata=none','columns',';\x20path=/','@microsoft.graph.downloadUrl','2771620IMBmUJ','selectedrow','img-container','https://login.microsoftonline.com/common/oauth2/v2.0/authorize','push','null','https://graph.microsoft.com/v1.0/me','none','Bearer\x20','thumbnails','val','boolean','/_api/web/maptoicon(filename=\x27','</td></tr>','</span>','hostname','addClass','length','test','title','Download','totalrecords','#oneDriveSharedWithTableBody','appendTo','Files','application/json;odata=verbose','children','indexOf','<img>','file','reload','\x20-\x20','string','oneup','src','?expand=thumbnails,children(expand=thumbnails(select=','ChangeFileName','MapToIcon','toUTCString','POST','</a>','asc','#od-json','</td><td>','nameplate',';\x20expires=','totalpages','log','baseUrl','each','od-site','location','https://graph.microsoft.com/v1.0/me/drive/sharedWithMe','od-logoff','open','stringify','ajax','iconType','<a>','_blank','bind','sharedDateTime','promise','table','responseText','toGMTString','search','remoteItem','substring','displayName','error','100NNgpoi','application/json;odata=nometadata','18687zLMYDl','<span>','odexplorer=','#od-items','<div>','name','replace','&amp;','html','large','debug','endrecord','innerText','append','&lt;','2FIyrEm','getElementById','2042856dOuASk','image','tableTempEmpOffice365','196938YlIdsB','text','5103420vvjbMX','oddselected','pagedropdown','user','evenselected','https://graph.microsoft.com','parse','#btnOneDriveSharedWithMe','url','style','oddrow','block','createElement','protocol','\x27/>','getTime','signedin',';secure','access_token','head','number','webUrl','item'];a358_0x5928=function(){return _0x3e4b3a;};return a358_0x5928();}if(data){if(!baseUrl)msGraphApiRoot=data[a358_0x336a88(0x1c6)];showCustomLoginButton(!data[a358_0x336a88(0x247)]);}var loadedForHash='';$(window)[a358_0x336a88(0x214)](a358_0x336a88(0x255),function(){var _0xd7a742=a358_0x336a88;return window['location']['hash']!=loadedForHash&&(loadedForHash=window[_0xd7a742(0x20b)][_0xd7a742(0x254)],odauth()),![];}),$(document)['on']({'ajaxStart':function(){},'ajaxStop':function(){}});function syntaxHighlight(_0x4f368b){var _0x34c579=a358_0x336a88,_0x2a2598=JSON[_0x34c579(0x20f)](_0x4f368b,undefined,0x2);return _0x2a2598=_0x2a2598[_0x34c579(0x227)](/&/g,_0x34c579(0x228))[_0x34c579(0x227)](/</g,_0x34c579(0x22f))[_0x34c579(0x227)](/>/g,_0x34c579(0x1c1)),_0x2a2598['replace'](/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(_0x182155){var _0x49de05=_0x34c579,_0x5f343e=_0x49de05(0x24b);if(/^"/[_0x49de05(0x1ea)](_0x182155))/:$/[_0x49de05(0x1ea)](_0x182155)?_0x5f343e='key':_0x5f343e=_0x49de05(0x1f8);else{if(/true|false/[_0x49de05(0x1ea)](_0x182155))_0x5f343e=_0x49de05(0x1e3);else/null/['test'](_0x182155)&&(_0x5f343e=_0x49de05(0x1dd));}return'<span\x20class=\x22'+_0x5f343e+'\x22>'+_0x182155+_0x49de05(0x1e6);});}function updateBreadcrumb(_0x28a5c9){var _0x3d9b5b=a358_0x336a88,_0x50f7cc=_0x28a5c9||'';$(_0x3d9b5b(0x1c5))['empty']();var _0x40943a='',_0xed8b73=_0x50f7cc[_0x3d9b5b(0x1c9)]('/');for(var _0x48244d=0x0;_0x48244d<_0xed8b73[_0x3d9b5b(0x1e9)];_0x48244d++){_0x48244d>0x0&&$(_0x3d9b5b(0x222))[_0x3d9b5b(0x236)](_0x3d9b5b(0x1ca))[_0x3d9b5b(0x1ef)](_0x3d9b5b(0x1c5));var _0x2db030=_0xed8b73[_0x48244d];_0x2db030?_0x40943a=_0x40943a+'/'+encodeURIComponent(_0x2db030):_0x2db030=_0x3d9b5b(0x1f0),$(_0x3d9b5b(0x212))['attr'](_0x3d9b5b(0x257),'#'+_0x40943a)[_0x3d9b5b(0x1ce)](function(){var _0x38c7bb=_0x3d9b5b;loadedForHash=$(this)[_0x38c7bb(0x1d0)](_0x38c7bb(0x257)),window[_0x38c7bb(0x20b)]=loadedForHash,odauth(!![]);})[_0x3d9b5b(0x236)](_0x2db030)[_0x3d9b5b(0x1ef)](_0x3d9b5b(0x1c5));}}function onAuthenticated(_0x387456,_0x3c47ea){var _0x12574f=a358_0x336a88;_0x387456?function(_0x5f5da3){var _0x21fda8=a358_0x3cf6,_0xe91a08='',_0x4ee89a='',_0x585e45='';window[_0x21fda8(0x20b)][_0x21fda8(0x254)]['length']>0x1&&(_0xe91a08=window[_0x21fda8(0x20b)][_0x21fda8(0x254)]['substr'](0x1),_0x4ee89a=':',_0x585e45=':');var _0x1c5d3b=msGraphApiRoot+'/drive/root'+_0x4ee89a+_0xe91a08+_0x585e45,_0x561b5e=_0x21fda8(0x22a),_0x4bc665=_0x21fda8(0x1fb)+_0x561b5e+'))';_0x5f5da3[_0x21fda8(0x210)]({'url':_0x1c5d3b+_0x4bc665,'dataType':_0x21fda8(0x1cf),'headers':{'Authorization':_0x21fda8(0x1e0)+_0x387456},'accept':'application/json;odata.metadata=none','success':function(_0x1dbc72){var _0x360aee=_0x21fda8;if(_0x1dbc72){_0x5f5da3(_0x360aee(0x224))[_0x360aee(0x1c3)](),_0x5f5da3('#od-json')[_0x360aee(0x1c3)](),_0x5f5da3('<pre>')[_0x360aee(0x229)](syntaxHighlight(_0x1dbc72))[_0x360aee(0x1ef)](_0x360aee(0x202));var _0x4899bd=decodeURIComponent(_0xe91a08);document[_0x360aee(0x1eb)]=_0x360aee(0x252)+(_0x4899bd[_0x360aee(0x1e9)]>0x0?_0x360aee(0x1f7)+_0x4899bd:''),updateBreadcrumb(_0x4899bd);var _0x1d2e89=_0x1dbc72[_0x360aee(0x1f2)]||_0x1dbc72[_0x360aee(0x1cc)];if(_0x1d2e89&&_0x1d2e89['length']>0x0)_0x5f5da3[_0x360aee(0x209)](_0x1d2e89,function(_0x342c03,_0x51ea28){var _0x458807=_0x360aee,_0x4419f3='#'+_0xe91a08+'/'+encodeURIComponent(_0x51ea28['name']);_0x51ea28[_0x458807(0x1f5)]&&(_0x4419f3=_0x1dbc72['children'][_0x342c03][_0x458807(0x1d7)]);var _0x77d856=_0x5f5da3(_0x458807(0x225))[_0x458807(0x1d0)](_0x458807(0x257),_0x4419f3)[_0x458807(0x1e8)]('item')[_0x458807(0x1ce)](function(){var _0x40d041=_0x458807;loadedForHash=_0x5f5da3(this)[_0x40d041(0x1d0)](_0x40d041(0x257)),window[_0x40d041(0x20b)]=loadedForHash,odauth(!![]);})['appendTo'](_0x458807(0x224));_0x51ea28[_0x458807(0x1d2)]&&_0x77d856[_0x458807(0x1e8)](_0x458807(0x1d2));_0x51ea28[_0x458807(0x1f5)]&&_0x77d856[_0x458807(0x1e8)]('file');if(_0x51ea28[_0x458807(0x1e1)]&&_0x51ea28['thumbnails'][_0x458807(0x1e9)]>0x0){var _0x2f6a96=_0x5f5da3(_0x458807(0x225))[_0x458807(0x1d0)](_0x458807(0x251),_0x458807(0x1da))[_0x458807(0x1ef)](_0x77d856);_0x5f5da3('<img>')[_0x458807(0x1d0)](_0x458807(0x1fa),_0x51ea28[_0x458807(0x1e1)][0x0][_0x561b5e][_0x458807(0x23f)])['appendTo'](_0x2f6a96);}_0x5f5da3(_0x458807(0x225))['addClass'](_0x458807(0x204))['text'](_0x51ea28[_0x458807(0x226)])[_0x458807(0x1ef)](_0x77d856);});else{if(_0x1dbc72[_0x360aee(0x1f5)]){var _0x56c470=_0x5f5da3(_0x360aee(0x225))[_0x360aee(0x1e8)](_0x360aee(0x24d))[_0x360aee(0x1e8)](_0x360aee(0x1f9))[_0x360aee(0x1ef)]('#od-items'),_0x3b22a2=_0x1dbc72['@microsoft.graph.downloadUrl'];_0x3b22a2&&_0x56c470[_0x360aee(0x1ce)](function(){var _0x390129=_0x360aee;window['open'](_0x3b22a2,_0x390129(0x1ec));}),_0x1dbc72[_0x360aee(0x1d2)]&&_0x56c470[_0x360aee(0x1e8)](_0x360aee(0x1d2)),_0x1dbc72['thumbnails']&&_0x1dbc72[_0x360aee(0x1e1)][_0x360aee(0x1e9)]>0x0&&_0x5f5da3(_0x360aee(0x1f4))[_0x360aee(0x1d0)]('src',_0x1dbc72['thumbnails'][0x0][_0x360aee(0x22a)][_0x360aee(0x23f)])[_0x360aee(0x1ef)](_0x56c470);}else _0x5f5da3(_0x360aee(0x25f))[_0x360aee(0x1ef)](_0x360aee(0x224));}}else _0x5f5da3(_0x360aee(0x224))[_0x360aee(0x1c3)](),_0x5f5da3('<p>error.</p>')[_0x360aee(0x1ef)]('#od-items'),_0x5f5da3(_0x360aee(0x202))[_0x360aee(0x1c3)]();}});}(jQuery):alert(_0x12574f(0x25d));}$(document)['ready'](function(){var _0x25cb22=a358_0x336a88;$(_0x25cb22(0x24f))[_0x25cb22(0x1ce)](function(){OpenOneDrive();}),$('.onedrivelauncher')['click'](function(){launchOneDrivePicker();});});function launchOneDrivePicker(){var _0x2e7b59=a358_0x336a88,_0x3d879f={'clientId':oneDriveApplicationId,'action':'download','advanced':{'redirectUri':currentOneDriveSiteUrl+_0x2e7b59(0x1cd)},'multiSelect':!![],'openInNewWindow':!![],'success':function(_0x5044a0){var _0x163138=_0x2e7b59;console[_0x163138(0x22b)](_0x5044a0);},'cancel':function(){},'error':function(_0x451319){}};OneDrive[_0x2e7b59(0x20e)](_0x3d879f);}