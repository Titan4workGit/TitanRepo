function a432_0x58bd(_0x122555,_0x3f38fb){var _0x189179=a432_0x1891();return a432_0x58bd=function(_0x58bdcb,_0x46a939){_0x58bdcb=_0x58bdcb-0xea;var _0x478516=_0x189179[_0x58bdcb];return _0x478516;},a432_0x58bd(_0x122555,_0x3f38fb);}(function(_0x4264c2,_0x3a85b7){var _0x15fb3d=a432_0x58bd,_0x3e72e7=_0x4264c2();while(!![]){try{var _0x56d55a=parseInt(_0x15fb3d(0x10e))/0x1*(-parseInt(_0x15fb3d(0x10b))/0x2)+-parseInt(_0x15fb3d(0x136))/0x3+-parseInt(_0x15fb3d(0xed))/0x4*(-parseInt(_0x15fb3d(0x146))/0x5)+-parseInt(_0x15fb3d(0xf0))/0x6*(-parseInt(_0x15fb3d(0x10d))/0x7)+-parseInt(_0x15fb3d(0x147))/0x8+-parseInt(_0x15fb3d(0x119))/0x9*(-parseInt(_0x15fb3d(0x133))/0xa)+parseInt(_0x15fb3d(0x118))/0xb;if(_0x56d55a===_0x3a85b7)break;else _0x3e72e7['push'](_0x3e72e7['shift']());}catch(_0x16f13f){_0x3e72e7['push'](_0x3e72e7['shift']());}}}(a432_0x1891,0x98d26));function CopySelectedData(_0x409def,_0x8917b2,_0x9fe3c0,_0x1c6cc1,_0x1d723c){var _0xd2c026=a432_0x58bd;if($('#modulessection')['is'](_0xd2c026(0xff))==!![]){$('#txtModuleProcess')[_0xd2c026(0x129)]('Processing...');var _0x5aed9d,_0x47c91e='?$select=*&$Filter=ProjectId\x20eq\x20\x27'+$(_0xd2c026(0xf9))[_0xd2c026(0xfd)]()+'\x27\x20';$['when'](getSPItems(_0xd2c026(0x128),_0x47c91e))[_0xd2c026(0x132)](function(_0x82dbce){var _0x3d4b58=_0xd2c026;if(_0x82dbce[_0x3d4b58(0x148)]>0x0){var _0x2cfa3d=GetItemTypeForListName(_0x3d4b58(0x128));for(var _0x2c501e=0x0;_0x2c501e<_0x82dbce['length'];_0x2c501e++){(_0x82dbce[_0x2c501e]['Status']=='Active'||_0x82dbce[_0x2c501e][_0x3d4b58(0x141)]==_0x3d4b58(0x142))&&(_0x5aed9d={'__metadata':{'type':_0x2cfa3d},'Title':_0x82dbce[_0x2c501e][_0x3d4b58(0x103)],'Sprint':_0x82dbce[_0x2c501e][_0x3d4b58(0x116)]?_0x82dbce[_0x2c501e][_0x3d4b58(0x116)]:'','PlannedStartDate':null,'PlannedEndDate':null,'Description':_0x82dbce[_0x2c501e]['Description'],'ProjectId':_0x409def,'ProjectName':_0x82dbce[_0x2c501e][_0x3d4b58(0x11d)],'Status':'Active','weightage':_0x82dbce[_0x2c501e][_0x3d4b58(0x111)],'CompletionPercentage':'0'},AddInList(_0x5aed9d,_0x3d4b58(0x128)));}$(_0x3d4b58(0x112))[_0x3d4b58(0x129)]('Done');}});}copyTeamMembers(_0x409def,_0x8917b2,_0x9fe3c0,_0x1c6cc1,_0x1d723c);}function copyTeamMembers(_0x4f94d8,_0x3243da,_0x4bfa44,_0x4b766b,_0x44ada8){var _0x23cd45=a432_0x58bd;if($('#teamMembers')['is'](':checked')==!![]){$(_0x23cd45(0xf1))['text'](_0x23cd45(0x11a));var _0x2908b1,_0x30f184='?$select=*,TeamMember/Id,TeamMember/EMail,TeamMember/Id,TeamMember/Title&$expand=TeamMember&$Filter=ProjectId\x20eq\x20\x27'+$(_0x23cd45(0xf9))['val']()+'\x27';$[_0x23cd45(0x13a)](getSPItems(_0x23cd45(0xf7),_0x30f184))[_0x23cd45(0x132)](function(_0x4498a5){var _0x53d4a2=_0x23cd45;if(_0x4498a5[_0x53d4a2(0x148)]>0x0){var _0x2d3972=GetItemTypeForListName('ProjectTeamDetails');for(var _0x3b4845=0x0;_0x3b4845<_0x4498a5[_0x53d4a2(0x148)];_0x3b4845++){_0x4498a5[_0x3b4845][_0x53d4a2(0x101)]['Id']!=_0x44ada8&&((_0x4498a5[_0x3b4845][_0x53d4a2(0x141)]=='Active'||_0x4498a5[_0x3b4845][_0x53d4a2(0x141)]=='Released')&&(_0x2908b1={'__metadata':{'type':_0x2d3972},'TeamMemberId':_0x4498a5[_0x3b4845][_0x53d4a2(0x101)]['Id'],'Status':_0x53d4a2(0x115),'Role':_0x4498a5[_0x3b4845][_0x53d4a2(0x113)],'EngageDate':_0x3243da,'ExpectedReleseDate':_0x4bfa44,'ProjectId':_0x4f94d8,'TaskPermission':_0x4498a5[_0x3b4845][_0x53d4a2(0x139)],'DocumentPermission':_0x4498a5[_0x3b4845][_0x53d4a2(0x130)],'CompanyId':_0x4498a5[_0x3b4845][_0x53d4a2(0x102)],'TeamPermission':_0x4498a5[_0x3b4845]['TeamPermission']},$[_0x53d4a2(0x13a)](AddInList(_0x2908b1,_0x53d4a2(0xf7)))[_0x53d4a2(0x132)](function(_0x49a3dc){var _0x17fc65=_0x53d4a2;_0x4498a5[_0x3b4845]['DocumentPermission']==!![]&&BreakInheritePermissionDMSLibrary(_0x4498a5[_0x3b4845][_0x17fc65(0x101)]['Id'],_0x17fc65(0x125),_0x4b766b);})));}$(_0x53d4a2(0xf1))['text']('Done');}});}CopyLibraryStructure(_0x4b766b);}function CopyLibraryStructure(_0x497ca5){var _0x4e7f1f=a432_0x58bd;if($('#documentstructure')['is'](_0x4e7f1f(0xff))==!![]){$(_0x4e7f1f(0x10f))[_0x4e7f1f(0x129)]('Processing...');var _0x3822d3=$(_0x4e7f1f(0x10c))['text'](),_0x1cabb4=_0x3822d3+_0x4e7f1f(0xfe);$[_0x4e7f1f(0x11e)]({'url':_0x1cabb4,'headers':{'Accept':_0x4e7f1f(0x12b)},'async':![],'success':function(_0x5b8f05){var _0x22ea6a=_0x4e7f1f,_0x20eb4f=_0x5b8f05['d'][_0x22ea6a(0xfc)][_0x22ea6a(0x121)],_0x8c8ff0=CompanySiteURL+_0x22ea6a(0x10a)+_0x497ca5;for(var _0x843e45=0x0;_0x843e45<_0x20eb4f[_0x22ea6a(0x148)];_0x843e45++){if(_0x20eb4f[_0x843e45][_0x22ea6a(0x138)]!=_0x22ea6a(0xf3)){CreateFolder(_0x22ea6a(0x140),_0x20eb4f[_0x843e45][_0x22ea6a(0x138)],_0x8c8ff0),_0x3822d3=$(_0x22ea6a(0x10c))[_0x22ea6a(0x129)]();var _0x8c8ff0=CompanySiteURL+_0x22ea6a(0x10a)+_0x497ca5,_0x4aeaf4=_0x22ea6a(0x140)+_0x20eb4f[_0x843e45][_0x22ea6a(0x138)]+'/',_0x4bce1b=_0x3822d3+_0x22ea6a(0xf8)+_0x4aeaf4+_0x22ea6a(0x145);$[_0x22ea6a(0x11e)]({'url':_0x4bce1b,'headers':{'Accept':_0x22ea6a(0x12b)},'async':![],'success':function(_0x1cbb9b){var _0x3fc0b9=_0x22ea6a,_0x5bf014=_0x1cbb9b['d'][_0x3fc0b9(0xfc)]['results'];for(var _0x166226=0x0;_0x166226<_0x5bf014[_0x3fc0b9(0x148)];_0x166226++){_0x5bf014[_0x166226][_0x3fc0b9(0x138)]!=_0x3fc0b9(0xf3)&&CreateFolder(_0x4aeaf4,_0x5bf014[_0x166226]['Name'],_0x8c8ff0);}},'eror':function(_0x91aa4){var _0x99fdf0=_0x22ea6a;console[_0x99fdf0(0x11f)]('error');}});}}var _0x488958=CompanySiteURL+'/DMS/'+_0x497ca5;CheckCustomColumns(_0x488958,_0x497ca5),$(_0x22ea6a(0x10f))['text'](_0x22ea6a(0x11b));},'eror':function(_0x56a554){var _0x1000f8=_0x4e7f1f;console[_0x1000f8(0x11f)]('Error\x20while\x20copying\x20structure');}});}$(_0x4e7f1f(0x104))[_0x4e7f1f(0x13f)](),$(_0x4e7f1f(0x12c))[_0x4e7f1f(0x106)](),$(_0x4e7f1f(0x12e))['hide'](),$(_0x4e7f1f(0x135))[_0x4e7f1f(0x106)](),$(_0x4e7f1f(0xfa))['text']('Copy\x20aspects..'),$(_0x4e7f1f(0x107))[_0x4e7f1f(0x13d)](_0x4e7f1f(0x120),_0x4e7f1f(0x13b)),$('.selectsec\x20input[type=\x22checkbox\x22]')['prop'](_0x4e7f1f(0x124),_0x4e7f1f(0x124)),$('#btnCopyData')['hide'](),$(_0x4e7f1f(0x12a))[_0x4e7f1f(0x122)](function(){var _0x2f6c08=_0x4e7f1f,_0x256367=$('.selectsec\x20input[type=\x22checkbox\x22]:checked');_0x256367[_0x2f6c08(0x123)](_0x2f6c08(0xf6))['text'](_0x2f6c08(0x11b))[_0x2f6c08(0x13e)](_0x2f6c08(0x144),_0x2f6c08(0xea));});}function CheckCustomColumns(_0xf1f3a5,_0x2b1724){var _0x219423=a432_0x58bd,_0x5703e6='';$['ajax']({'url':$(_0x219423(0x10c))[_0x219423(0x129)]()+_0x219423(0xf5),'type':_0x219423(0x12f),'async':![],'headers':{'accept':_0x219423(0x12b)},'success':function(_0x8a8341){var _0x5ee616=_0x219423;for(var _0x4d5ea5=0x0;_0x4d5ea5<_0x8a8341['d'][_0x5ee616(0x121)][_0x5ee616(0x148)];_0x4d5ea5++){if(checkDestinationCol(_0x8a8341['d'][_0x5ee616(0x121)][_0x4d5ea5][_0x5ee616(0x103)],_0xf1f3a5)==!![]){var _0x2a31cb=_0xf1f3a5+_0x5ee616(0x131);if(_0x8a8341['d'][_0x5ee616(0x121)][_0x4d5ea5][_0x5ee616(0x137)]!=_0x5ee616(0x117))_0x5703e6=_0x5ee616(0x134)+_0x8a8341['d']['results'][_0x4d5ea5][_0x5ee616(0x103)]+_0x5ee616(0x100)+_0x8a8341['d']['results'][_0x4d5ea5]['SchemaXml']+_0x5ee616(0x11c)+_0x8a8341['d'][_0x5ee616(0x121)][_0x4d5ea5]['FieldTypeKind']+_0x5ee616(0x12d),$['ajax']({'url':_0x2a31cb,'type':_0x5ee616(0xee),'async':![],'data':_0x5703e6,'headers':{'accept':_0x5ee616(0x12b),'content-type':'application/json;odata=verbose','X-RequestDigest':$(_0x5ee616(0x127))['val']()},'success':function(_0x46d261){var _0x14e895=_0x5ee616;console[_0x14e895(0x11f)]('column\x20has\x20been\x20created\x20at\x20-\x20'+_0xf1f3a5);},'eror':function(_0x5ca02b){var _0x486033=_0x5ee616;console[_0x486033(0x11f)](JSON[_0x486033(0x110)](_0x5ca02b));}});else{}}}},'eror':function(_0x48d250){var _0xadaaa3=_0x219423;console[_0xadaaa3(0x11f)](JSON[_0xadaaa3(0x110)](_0x48d250));}});}function checkDestinationCol(_0x3214fe,_0x1a6f6f){var _0x259046=a432_0x58bd,_0x3cd5d3=!![];return $['ajax']({'url':_0x1a6f6f+_0x259046(0xf5),'type':'GET','async':![],'headers':{'accept':_0x259046(0x12b)},'success':function(_0x46b1ea){var _0x41e7d9=_0x259046;$['each'](_0x46b1ea['d'][_0x41e7d9(0x121)],function(_0x34870c,_0x1c1ae8){var _0xd77375=_0x41e7d9;_0x1c1ae8[_0xd77375(0x103)][_0xd77375(0x126)]()==_0x3214fe['toLowerCase']()&&(_0x3cd5d3=![]);});},'eror':function(_0x36e6e7){var _0x3c09bf=_0x259046;console[_0x3c09bf(0x11f)](JSON['stringify'](_0x36e6e7));}}),_0x3cd5d3;}function CreateFolder(_0x76d69a,_0x188e53,_0x973c9e){var _0x2032d9=a432_0x58bd,_0x56ba7e=_0x973c9e+_0x2032d9(0xef);$[_0x2032d9(0x11e)]({'url':_0x56ba7e,'type':'POST','data':JSON[_0x2032d9(0x110)]({'__metadata':{'type':_0x2032d9(0x109)},'ServerRelativeUrl':_0x76d69a+_0x188e53}),'async':![],'headers':{'accept':_0x2032d9(0x12b),'content-type':_0x2032d9(0x12b),'X-RequestDigest':$('#__REQUESTDIGEST')['val']()},'success':function(_0x467b0a){var _0x3288ad=_0x2032d9;console[_0x3288ad(0x11f)](_0x188e53+_0x3288ad(0xec));},'error':function(_0x2c976b){var _0x46c1f9=_0x2032d9;$('#txtDocProcess')[_0x46c1f9(0x129)](_0x46c1f9(0xf2)),console[_0x46c1f9(0x11f)](_0x46c1f9(0xf4));}});}function AddInList(_0x578b20,_0x16e874){var _0x304a6e=a432_0x58bd,_0x47f070=$[_0x304a6e(0x143)]();return $[_0x304a6e(0x11e)]({'url':_spPageContextInfo['webAbsoluteUrl']+_0x304a6e(0xfb)+_0x16e874+'\x27)/items','type':_0x304a6e(0xee),'async':![],'headers':{'accept':_0x304a6e(0x12b),'X-RequestDigest':$(_0x304a6e(0x127))[_0x304a6e(0xfd)](),'content-Type':_0x304a6e(0x12b)},'data':JSON['stringify'](_0x578b20),'success':function(_0x8510c5){var _0x2e0f01=_0x304a6e;_0x47f070[_0x2e0f01(0x108)](_0x8510c5);},'error':function(_0x3d232a){var _0x1894e5=_0x304a6e;console[_0x1894e5(0x11f)](JSON[_0x1894e5(0x110)](_0x3d232a)),_0x47f070[_0x1894e5(0x13c)](_0x3d232a);}}),_0x47f070[_0x304a6e(0x114)]();}function getSPItems(_0x45a280,_0x5401a5){var _0x48a36a=a432_0x58bd;return DeferredObj=$[_0x48a36a(0x143)](),$[_0x48a36a(0x11e)]({'url':_spPageContextInfo[_0x48a36a(0xeb)]+'/_api/web/lists/getbytitle(\x27'+_0x45a280+_0x48a36a(0x105)+_0x5401a5,'type':_0x48a36a(0x12f),'async':![],'headers':{'ACCEPT':_0x48a36a(0x12b),'X-RequestDigest':$(_0x48a36a(0x127))['val']()},'success':function(_0xb76557){var _0x38b96b=_0x48a36a;DeferredObj['resolve'](_0xb76557['d'][_0x38b96b(0x121)]);},'error':function(_0x44e644){var _0x36694c=_0x48a36a;alert(JSON[_0x36694c(0x110)](_0x44e644)),DeferredObj['reject'](_0x44e644);}}),DeferredObj[_0x48a36a(0x114)]();}function a432_0x1891(){var _0x3c9dfd=['Error\x20Folder\x20not\x20created','/_api/web/lists/getbytitle(\x27Documents\x27)/Fields?$filter=Hidden\x20eq\x20false\x20and\x20ReadOnlyField\x20eq\x20false','span','ProjectTeamDetails','/_api/Web/GetFolderByServerRelativeUrl(\x27','#txtProjectList','.heading_se','/_api/web/lists/getbytitle(\x27','Folders','val','/_api/Web/GetFolderByServerRelativeUrl(\x27Shared\x20Documents/\x27)?$select=ID&$expand=Folders,Folders/ListItemAllFields',':checked','\x27,\x20\x27SchemaXml\x27:\x27','TeamMember','CompanyId','Title','.frompoject','\x27)/items/','hide','.checkimg','resolve','SP.Folder','/DMS/','16zyVFNC','#curentProjectURL','5873jWEdeP','46261ruZMta','#txtDocProcess','stringify','weightage','#txtModuleProcess','Role','promise','Active','Sprint','Lookup','1397484WwSyUY','562932Vzbffv','Processing...','Done','\x27,\x20\x27FieldTypeKind\x27:\x20\x27','ProjectName','ajax','log','src','results','each','siblings','disabled','1073741829','toLowerCase','#__REQUESTDIGEST','ProjectModules','text','.selectsec\x20input[type=\x22checkbox\x22]','application/json;odata=verbose','.paragph_sec','\x27\x20}','.radio-inline','GET','DocumentPermission','/_api/web/lists/GetByTitle(\x27Documents\x27)/Fields','done','130EaQpBG','{\x20\x27__metadata\x27:\x20{\x20\x27type\x27:\x20\x27SP.Field\x27\x20},\x20\x27Title\x27:\x27','.selecting','530961JHxvKX','TypeDisplayName','Name','TaskPermission','when','https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@latest/SiteAssets/Projects/CreateNewProject/assets/img/loading_file.png','reject','attr','css','show','Shared\x20Documents/','Status','Completed','Deferred','color','\x27)?$select=ID&$expand=Folders,Folders/ListItemAllFields','5OwOrxl','8756552CNffsi','length','rgb(45\x20161\x2012)','webAbsoluteUrl','\x20Folder\x20created\x20successfully.','883172mgDUPt','POST','/_api/web/folders','7914xwIAJH','#txtTeamProcess','Error.','Forms'];a432_0x1891=function(){return _0x3c9dfd;};return a432_0x1891();};