function _0x1340(_0x38e5e0,_0x248417){var _0x5ef689=_0x5ef6();return _0x1340=function(_0x1340e2,_0x24e172){_0x1340e2=_0x1340e2-0x183;var _0x36bc58=_0x5ef689[_0x1340e2];return _0x36bc58;},_0x1340(_0x38e5e0,_0x248417);}var _0x5b3608=_0x1340;(function(_0x4b50a4,_0x47ec43){var _0x50030d=_0x1340,_0x269a04=_0x4b50a4();while(!![]){try{var _0x18f674=-parseInt(_0x50030d(0x1a1))/0x1+parseInt(_0x50030d(0x18f))/0x2+-parseInt(_0x50030d(0x184))/0x3*(parseInt(_0x50030d(0x186))/0x4)+parseInt(_0x50030d(0x196))/0x5+-parseInt(_0x50030d(0x197))/0x6*(parseInt(_0x50030d(0x19c))/0x7)+-parseInt(_0x50030d(0x18b))/0x8*(parseInt(_0x50030d(0x189))/0x9)+parseInt(_0x50030d(0x185))/0xa;if(_0x18f674===_0x47ec43)break;else _0x269a04['push'](_0x269a04['shift']());}catch(_0x2a109d){_0x269a04['push'](_0x269a04['shift']());}}}(_0x5ef6,0x5e9b6),$(window)[_0x5b3608(0x1a3)](function(){GetLoginUserClients(),setInterval(function(){GetLoginUserClients();},0x30d40);}));function GetLoginUserClients(){var _0x54d1e9=_0x5b3608,_0x5c2577=_spPageContextInfo[_0x54d1e9(0x195)]+'/_api/web/lists/getbytitle(\x27ClientMaster\x27)/items?$filter=CompanyID/Id\x20eq\x20\x27'+Logged_CompanyId+_0x54d1e9(0x19d)+_spPageContextInfo[_0x54d1e9(0x194)]+_0x54d1e9(0x183)+_spPageContextInfo[_0x54d1e9(0x194)]+_0x54d1e9(0x190);$[_0x54d1e9(0x188)]({'url':_0x5c2577,'headers':{'Accept':_0x54d1e9(0x199)},'async':!![],'success':function(_0x42d7bc){var _0x1dcca4=_0x54d1e9,_0x1d5e6f=[],_0x21b438=_0x42d7bc['d'][_0x1dcca4(0x19a)],_0x4e5418='';if(_0x21b438[_0x1dcca4(0x18e)]>0x0)for(i=0x0;i<_0x21b438[_0x1dcca4(0x18e)];i++){_0x1d5e6f[_0x1dcca4(0x1a0)](_0x21b438[i]['ID']);}GetUnreadmsgCounts(_0x1d5e6f);},'error':function(_0x33c57d){var _0x8db9b4=_0x54d1e9;console[_0x8db9b4(0x1a5)](_0x8db9b4(0x1a4)),console['log'](_0x33c57d);}});}function _0x5ef6(){var _0x92176a=['\x27\x20or\x20InternalSupervisor/Id\x20eq\x20\x27','1477188OAdkIJ','13159010gwngwW','4ewNMLF','\x27\x20and\x20User/Id\x20eq\x20\x27','ajax','9CXeVra','\x27\x20and\x20(Initials\x20eq\x20\x27Parent\x27\x20or\x20Initials\x20eq\x20\x27Reply\x27))','6071368djsrlI','#TotalNotifications','?$top=5000&$orderby=ID\x20asc&$select=ID,AuthorId&$skipToken=Paged=TRUE%26p_ID=','length','1479358YdjWTP','\x27)&$top=5000&$orderby=Title\x20asc','text','Deferred','LastMessageRead','userId','webAbsoluteUrl','2206660YiglqR','3138PwOwzF','Error\x20in\x20FilterRequestQueryData.','application/json;odata=verbose','results','block','3017WnyuqH','\x27\x20and\x20(InternalMembers/Id\x20eq\x20\x27','&$filter=(WebPartName\x20eq\x20\x27ContactCenter\x27\x20and\x20Customer/Id\x20eq\x20\x27','\x27\x20and\x20AuthorId\x20ne\x20\x27','push','632672kvWiVz','/_api/web/lists/getbytitle(\x27ContactCenterMsgCounts\x27)/items/','ready','Error\x20in\x20AllActiveClients.','log'];_0x5ef6=function(){return _0x92176a;};return _0x5ef6();}var TotalNotification=0x0;function GetUnreadmsgCounts(_0x28aa78){var _0xdd2bb3=_0x5b3608;if(_0x28aa78[_0xdd2bb3(0x18e)]>0x0){TotalNotification=0x0;for(var _0x4cb5c0=0x0;_0x4cb5c0<_0x28aa78[_0xdd2bb3(0x18e)];_0x4cb5c0++){dfds=$[_0xdd2bb3(0x192)](),NewQuery='?$top=5000&$select=*,Client/MaxMsgID&$expand=Client&$filter=Client/Id\x20eq\x20\x27'+_0x28aa78[_0x4cb5c0]+_0xdd2bb3(0x187)+_spPageContextInfo[_0xdd2bb3(0x194)]+'\x27',url=_spPageContextInfo[_0xdd2bb3(0x195)]+_0xdd2bb3(0x1a2)+NewQuery,FilterRequestQueryData(url,_0x28aa78[_0x4cb5c0],dfds);}}TotalNotification!=0x0&&($(_0xdd2bb3(0x18c))[_0xdd2bb3(0x191)](TotalNotification),$('#TotalNotifications')['css']('display',_0xdd2bb3(0x19b)));}function FilterRequestQueryData(_0xe1deb0,_0x5c431){var _0x438869=_0x5b3608,_0xdbd82a=[],_0x2e2284=_0xe1deb0;return $['ajax']({'url':_0x2e2284,'headers':{'Accept':_0x438869(0x199)},'async':![],'success':function(_0x2f375b){var _0x2e36e3=_0x438869,_0x5c989e=_0x2f375b['d'][_0x2e36e3(0x19a)],_0x22dd4c='';if(_0x5c989e[_0x2e36e3(0x18e)]>0x0)dfds=$[_0x2e36e3(0x192)](),NewQuery=_0x2e36e3(0x18d)+_0x5c989e[0x0][_0x2e36e3(0x193)]+_0x2e36e3(0x19e)+_0x5c431+_0x2e36e3(0x19f)+_spPageContextInfo[_0x2e36e3(0x194)]+_0x2e36e3(0x18a);else{}if(_0x5c989e[_0x2e36e3(0x18e)]>0x0){var _0x762c43=_spPageContextInfo[_0x2e36e3(0x195)]+'/_api/web/lists/getbytitle(\x27ContactCenter\x27)/items/'+NewQuery;$[_0x2e36e3(0x188)]({'url':_0x762c43,'headers':{'Accept':_0x2e36e3(0x199)},'async':![],'success':function(_0x4c24f2){var _0x4bc3a2=_0x2e36e3;_0x22dd4c=_0x4c24f2['d']['results'],_0x22dd4c[_0x4bc3a2(0x18e)]>0x0&&(_0x22dd4c[_0x22dd4c['length']-0x1]['AuthorId']!=_spPageContextInfo[_0x4bc3a2(0x194)]&&(TotalNotification=TotalNotification+_0x22dd4c[_0x4bc3a2(0x18e)]));},'error':function(_0x384c17){var _0x59d9bd=_0x2e36e3;console[_0x59d9bd(0x1a5)](_0x59d9bd(0x198)),console[_0x59d9bd(0x1a5)](_0x384c17);}});}},'error':function(_0x4e601a){var _0x2494ce=_0x438869;console[_0x2494ce(0x1a5)]('Error\x20in\x20FilterRequestQueryData.'),console['log'](_0x4e601a);}}),_0xdbd82a;}