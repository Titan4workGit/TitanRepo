(function(_0x39124b,_0x412190){var _0x42f98=_0x3b80,_0x32c4af=_0x39124b();while(!![]){try{var _0x1c98ed=parseInt(_0x42f98(0x208))/0x1+-parseInt(_0x42f98(0x23d))/0x2+-parseInt(_0x42f98(0x24b))/0x3+-parseInt(_0x42f98(0x20b))/0x4+parseInt(_0x42f98(0x221))/0x5+-parseInt(_0x42f98(0x1fb))/0x6*(-parseInt(_0x42f98(0x217))/0x7)+-parseInt(_0x42f98(0x22c))/0x8*(parseInt(_0x42f98(0x1f5))/0x9);if(_0x1c98ed===_0x412190)break;else _0x32c4af['push'](_0x32c4af['shift']());}catch(_0x2beb08){_0x32c4af['push'](_0x32c4af['shift']());}}}(_0x143e,0x3a91a));function _0x3b80(_0x4dc23d,_0x70072b){var _0x143ef2=_0x143e();return _0x3b80=function(_0x3b80f8,_0x11814a){_0x3b80f8=_0x3b80f8-0x1f4;var _0x511fb3=_0x143ef2[_0x3b80f8];return _0x511fb3;},_0x3b80(_0x4dc23d,_0x70072b);}function CopySelectedData(_0x46126a,_0xe3db6a,_0x3d26a2,_0x39f13d,_0x257937){var _0x295860=_0x3b80;if($('#modulessection')['is'](_0x295860(0x24a))==!![]){$(_0x295860(0x228))[_0x295860(0x248)]('Processing...');var _0x1db07b,_0x595b35=_0x295860(0x1f6)+$('#txtProjectList')[_0x295860(0x201)]()+'\x27\x20';$[_0x295860(0x20f)](getSPItems(_0x295860(0x231),_0x595b35))[_0x295860(0x22f)](function(_0x1b74d4){var _0x728429=_0x295860;if(_0x1b74d4[_0x728429(0x22e)]>0x0){var _0x47fd54=GetItemTypeForListName(_0x728429(0x231));for(var _0x7ab947=0x0;_0x7ab947<_0x1b74d4[_0x728429(0x22e)];_0x7ab947++){(_0x1b74d4[_0x7ab947][_0x728429(0x24e)]==_0x728429(0x20a)||_0x1b74d4[_0x7ab947][_0x728429(0x24e)]=='Completed')&&(_0x1db07b={'__metadata':{'type':_0x47fd54},'Title':_0x1b74d4[_0x7ab947][_0x728429(0x226)],'Sprint':_0x1b74d4[_0x7ab947][_0x728429(0x240)]?_0x1b74d4[_0x7ab947][_0x728429(0x240)]:'','PlannedStartDate':null,'PlannedEndDate':null,'Description':_0x1b74d4[_0x7ab947][_0x728429(0x23f)],'ProjectId':_0x46126a,'ProjectName':_0x1b74d4[_0x7ab947][_0x728429(0x235)],'Status':_0x728429(0x20a),'weightage':_0x1b74d4[_0x7ab947][_0x728429(0x207)],'CompletionPercentage':'0'},AddInList(_0x1db07b,_0x728429(0x231)));}$(_0x728429(0x228))[_0x728429(0x248)](_0x728429(0x22b));}});}copyTeamMembers(_0x46126a,_0xe3db6a,_0x3d26a2,_0x39f13d,_0x257937);}function copyTeamMembers(_0x421953,_0x2f9e67,_0x1903e0,_0x1ce678,_0x3f3f07){var _0x710409=_0x3b80;if($(_0x710409(0x239))['is'](':checked')==!![]){$(_0x710409(0x250))[_0x710409(0x248)](_0x710409(0x237));var _0x495507,_0x236c98=_0x710409(0x247)+$('#txtProjectList')[_0x710409(0x201)]()+'\x27';$[_0x710409(0x20f)](getSPItems(_0x710409(0x220),_0x236c98))[_0x710409(0x22f)](function(_0x1d10d6){var _0x52c499=_0x710409;if(_0x1d10d6[_0x52c499(0x22e)]>0x0){var _0x5b2156=GetItemTypeForListName('ProjectTeamDetails');for(var _0x43b6b3=0x0;_0x43b6b3<_0x1d10d6[_0x52c499(0x22e)];_0x43b6b3++){_0x1d10d6[_0x43b6b3][_0x52c499(0x234)]['Id']!=_0x3f3f07&&((_0x1d10d6[_0x43b6b3][_0x52c499(0x24e)]==_0x52c499(0x20a)||_0x1d10d6[_0x43b6b3][_0x52c499(0x24e)]=='Released')&&(_0x495507={'__metadata':{'type':_0x5b2156},'TeamMemberId':_0x1d10d6[_0x43b6b3][_0x52c499(0x234)]['Id'],'Status':_0x52c499(0x20a),'Role':_0x1d10d6[_0x43b6b3][_0x52c499(0x21f)],'EngageDate':_0x2f9e67,'ExpectedReleseDate':_0x1903e0,'ProjectId':_0x421953,'TaskPermission':_0x1d10d6[_0x43b6b3][_0x52c499(0x1fc)],'DocumentPermission':_0x1d10d6[_0x43b6b3][_0x52c499(0x22d)],'CompanyId':_0x1d10d6[_0x43b6b3][_0x52c499(0x238)],'TeamPermission':_0x1d10d6[_0x43b6b3][_0x52c499(0x219)]},$[_0x52c499(0x20f)](AddInList(_0x495507,'ProjectTeamDetails'))[_0x52c499(0x22f)](function(_0x3d12e7){var _0x14696a=_0x52c499;_0x1d10d6[_0x43b6b3]['DocumentPermission']==!![]&&BreakInheritePermissionDMSLibrary(_0x1d10d6[_0x43b6b3]['TeamMember']['Id'],_0x14696a(0x21c),_0x1ce678);})));}$(_0x52c499(0x250))[_0x52c499(0x248)](_0x52c499(0x22b));}});}CopyLibraryStructure(_0x1ce678);}function _0x143e(){var _0x268c5f=['disabled','src','/_api/web/lists/getbytitle(\x27Documents\x27)/Fields?$filter=Hidden\x20eq\x20false\x20and\x20ReadOnlyField\x20eq\x20false','9ewevdq','?$select=*&$Filter=ProjectId\x20eq\x20\x27','Name','toLowerCase','\x20Folder\x20created\x20successfully.','POST','78nswBDB','TaskPermission','Lookup','#btnCopyData','GET','Error\x20while\x20copying\x20structure','val','Shared\x20Documents/','each','.heading_se','promise','SchemaXml','weightage','336436efynkx','application/json;odata=verbose','Active','250504WPaWle','https://cdn.jsdelivr.net/gh/Titan4workGit/TitanRepo@main/SiteAssets/Projects/CreateNewProject/assets/img/loading_file.png','Forms','.frompoject','when','#curentProjectURL','\x27)/items','Deferred','hide','\x27,\x20\x27FieldTypeKind\x27:\x20\x27','{\x20\x27__metadata\x27:\x20{\x20\x27type\x27:\x20\x27SP.Field\x27\x20},\x20\x27Title\x27:\x27','\x27\x20}','224350qRrGoT','/_api/web/folders','TeamPermission','/_api/web/lists/GetByTitle(\x27Documents\x27)/Fields','color','1073741829','#txtDocProcess','stringify','Role','ProjectTeamDetails','1612285tLOdpG','results','column\x20has\x20been\x20created\x20at\x20-\x20','ajax','TypeDisplayName','Title','.radio-inline','#txtModuleProcess','Copy\x20aspects..','rgb(45\x20161\x2012)','Done','1122176nPoRvI','DocumentPermission','length','done','#__REQUESTDIGEST','ProjectModules','siblings','#documentstructure','TeamMember','ProjectName','.checkimg','Processing...','CompanyId','#teamMembers','/DMS/','/_api/Web/GetFolderByServerRelativeUrl(\x27Shared\x20Documents/\x27)?$select=ID&$expand=Folders,Folders/ListItemAllFields','/_api/web/lists/getbytitle(\x27','859410BZjkfT','reject','Description','Sprint','css','resolve','\x27,\x20\x27SchemaXml\x27:\x27','.selectsec\x20input[type=\x22checkbox\x22]','webAbsoluteUrl','.paragph_sec','?$select=*,TeamMember/Id,TeamMember/EMail,TeamMember/Id,TeamMember/Title&$expand=TeamMember&$Filter=ProjectId\x20eq\x20\x27','text','attr',':checked','609126UveWLz','.selecting','error','Status','span','#txtTeamProcess','\x27)/items/','FieldTypeKind','log'];_0x143e=function(){return _0x268c5f;};return _0x143e();}function CopyLibraryStructure(_0x51f038){var _0x4d80a7=_0x3b80;if($(_0x4d80a7(0x233))['is'](_0x4d80a7(0x24a))==!![]){$(_0x4d80a7(0x21d))['text'](_0x4d80a7(0x237));var _0x3bb637=$('#curentProjectURL')[_0x4d80a7(0x248)](),_0x560228=_0x3bb637+_0x4d80a7(0x23b);$[_0x4d80a7(0x224)]({'url':_0x560228,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x597a1e){var _0x2141be=_0x4d80a7,_0x3805fe=_0x597a1e['d']['Folders'][_0x2141be(0x222)],_0x354343=CompanySiteURL+_0x2141be(0x23a)+_0x51f038;for(var _0x4183c2=0x0;_0x4183c2<_0x3805fe[_0x2141be(0x22e)];_0x4183c2++){if(_0x3805fe[_0x4183c2]['Name']!=_0x2141be(0x20d)){CreateFolder(_0x2141be(0x202),_0x3805fe[_0x4183c2][_0x2141be(0x1f7)],_0x354343),_0x3bb637=$(_0x2141be(0x210))['text']();var _0x354343=CompanySiteURL+_0x2141be(0x23a)+_0x51f038,_0x26b1b6=_0x2141be(0x202)+_0x3805fe[_0x4183c2][_0x2141be(0x1f7)]+'/',_0x1e7108=_0x3bb637+'/_api/Web/GetFolderByServerRelativeUrl(\x27'+_0x26b1b6+'\x27)?$select=ID&$expand=Folders,Folders/ListItemAllFields';$[_0x2141be(0x224)]({'url':_0x1e7108,'headers':{'Accept':'application/json;odata=verbose'},'async':![],'success':function(_0x10cbd8){var _0x395db5=_0x2141be,_0x1bfad5=_0x10cbd8['d']['Folders'][_0x395db5(0x222)];for(var _0x445f77=0x0;_0x445f77<_0x1bfad5['length'];_0x445f77++){_0x1bfad5[_0x445f77]['Name']!=_0x395db5(0x20d)&&CreateFolder(_0x26b1b6,_0x1bfad5[_0x445f77]['Name'],_0x354343);}},'eror':function(_0x432b5c){var _0x6a1dcd=_0x2141be;console['log'](_0x6a1dcd(0x24d));}});}}var _0x5aa1cc=CompanySiteURL+'/DMS/'+_0x51f038;CheckCustomColumns(_0x5aa1cc,_0x51f038),$(_0x2141be(0x21d))[_0x2141be(0x248)](_0x2141be(0x22b));},'eror':function(_0x27f188){var _0x4dbb3d=_0x4d80a7;console['log'](_0x4dbb3d(0x200));}});}$(_0x4d80a7(0x20e))['show'](),$(_0x4d80a7(0x246))['hide'](),$(_0x4d80a7(0x227))[_0x4d80a7(0x213)](),$(_0x4d80a7(0x24c))[_0x4d80a7(0x213)](),$(_0x4d80a7(0x204))[_0x4d80a7(0x248)](_0x4d80a7(0x229)),$(_0x4d80a7(0x236))[_0x4d80a7(0x249)](_0x4d80a7(0x255),_0x4d80a7(0x20c)),$(_0x4d80a7(0x244))['prop'](_0x4d80a7(0x254),_0x4d80a7(0x254)),$(_0x4d80a7(0x1fe))[_0x4d80a7(0x213)](),$(_0x4d80a7(0x244))[_0x4d80a7(0x203)](function(){var _0x1a006e=_0x4d80a7,_0x46efa2=$('.selectsec\x20input[type=\x22checkbox\x22]:checked');_0x46efa2[_0x1a006e(0x232)](_0x1a006e(0x24f))[_0x1a006e(0x248)](_0x1a006e(0x22b))[_0x1a006e(0x241)](_0x1a006e(0x21b),_0x1a006e(0x22a));});}function CheckCustomColumns(_0x24dd64,_0x308c72){var _0x49fb55=_0x3b80,_0xfed063='';$[_0x49fb55(0x224)]({'url':$(_0x49fb55(0x210))['text']()+'/_api/web/lists/getbytitle(\x27Documents\x27)/Fields?$filter=Hidden\x20eq\x20false\x20and\x20ReadOnlyField\x20eq\x20false','type':_0x49fb55(0x1ff),'async':![],'headers':{'accept':_0x49fb55(0x209)},'success':function(_0x479698){var _0x296c41=_0x49fb55;for(var _0x4c43d6=0x0;_0x4c43d6<_0x479698['d']['results'][_0x296c41(0x22e)];_0x4c43d6++){if(checkDestinationCol(_0x479698['d'][_0x296c41(0x222)][_0x4c43d6][_0x296c41(0x226)],_0x24dd64)==!![]){var _0x15d652=_0x24dd64+_0x296c41(0x21a);if(_0x479698['d'][_0x296c41(0x222)][_0x4c43d6][_0x296c41(0x225)]!=_0x296c41(0x1fd))_0xfed063=_0x296c41(0x215)+_0x479698['d'][_0x296c41(0x222)][_0x4c43d6][_0x296c41(0x226)]+_0x296c41(0x243)+_0x479698['d']['results'][_0x4c43d6][_0x296c41(0x206)]+_0x296c41(0x214)+_0x479698['d'][_0x296c41(0x222)][_0x4c43d6][_0x296c41(0x252)]+_0x296c41(0x216),$['ajax']({'url':_0x15d652,'type':_0x296c41(0x1fa),'async':![],'data':_0xfed063,'headers':{'accept':_0x296c41(0x209),'content-type':'application/json;odata=verbose','X-RequestDigest':$('#__REQUESTDIGEST')[_0x296c41(0x201)]()},'success':function(_0x4d998f){var _0x1a5c53=_0x296c41;console[_0x1a5c53(0x253)](_0x1a5c53(0x223)+_0x24dd64);},'eror':function(_0x4f3b55){var _0x173082=_0x296c41;console[_0x173082(0x253)](JSON[_0x173082(0x21e)](_0x4f3b55));}});else{}}}},'eror':function(_0x59df40){var _0x306e98=_0x49fb55;console['log'](JSON[_0x306e98(0x21e)](_0x59df40));}});}function checkDestinationCol(_0x2025ca,_0x5f4c34){var _0x55591e=_0x3b80,_0x3e6f48=!![];return $[_0x55591e(0x224)]({'url':_0x5f4c34+_0x55591e(0x1f4),'type':_0x55591e(0x1ff),'async':![],'headers':{'accept':_0x55591e(0x209)},'success':function(_0xea9249){var _0xc0be39=_0x55591e;$[_0xc0be39(0x203)](_0xea9249['d'][_0xc0be39(0x222)],function(_0x40d4c2,_0x52d017){var _0x3800fe=_0xc0be39;_0x52d017[_0x3800fe(0x226)][_0x3800fe(0x1f8)]()==_0x2025ca[_0x3800fe(0x1f8)]()&&(_0x3e6f48=![]);});},'eror':function(_0x3e491e){var _0x28cad5=_0x55591e;console[_0x28cad5(0x253)](JSON[_0x28cad5(0x21e)](_0x3e491e));}}),_0x3e6f48;}function CreateFolder(_0x1debcc,_0x58e8fd,_0x59a332){var _0x5c0c95=_0x3b80,_0x2caee1=_0x59a332+_0x5c0c95(0x218);$[_0x5c0c95(0x224)]({'url':_0x2caee1,'type':'POST','data':JSON[_0x5c0c95(0x21e)]({'__metadata':{'type':'SP.Folder'},'ServerRelativeUrl':_0x1debcc+_0x58e8fd}),'async':![],'headers':{'accept':_0x5c0c95(0x209),'content-type':'application/json;odata=verbose','X-RequestDigest':$(_0x5c0c95(0x230))['val']()},'success':function(_0x587f0f){var _0xfe6773=_0x5c0c95;console[_0xfe6773(0x253)](_0x58e8fd+_0xfe6773(0x1f9));},'error':function(_0x1e0cab){var _0x408c8e=_0x5c0c95;$(_0x408c8e(0x21d))[_0x408c8e(0x248)]('Error.'),console[_0x408c8e(0x253)]('Error\x20Folder\x20not\x20created');}});}function AddInList(_0x251647,_0xb0dae7){var _0x2e0606=_0x3b80,_0x36c282=$['Deferred']();return $[_0x2e0606(0x224)]({'url':_spPageContextInfo[_0x2e0606(0x245)]+_0x2e0606(0x23c)+_0xb0dae7+_0x2e0606(0x211),'type':_0x2e0606(0x1fa),'async':![],'headers':{'accept':_0x2e0606(0x209),'X-RequestDigest':$(_0x2e0606(0x230))[_0x2e0606(0x201)](),'content-Type':'application/json;odata=verbose'},'data':JSON[_0x2e0606(0x21e)](_0x251647),'success':function(_0x2f1058){var _0x5a9e7b=_0x2e0606;_0x36c282[_0x5a9e7b(0x242)](_0x2f1058);},'error':function(_0x37bac0){var _0x139659=_0x2e0606;console[_0x139659(0x253)](JSON['stringify'](_0x37bac0)),_0x36c282[_0x139659(0x23e)](_0x37bac0);}}),_0x36c282[_0x2e0606(0x205)]();}function getSPItems(_0xa579b,_0x38eb45){var _0x86c34a=_0x3b80;return DeferredObj=$[_0x86c34a(0x212)](),$[_0x86c34a(0x224)]({'url':_spPageContextInfo[_0x86c34a(0x245)]+'/_api/web/lists/getbytitle(\x27'+_0xa579b+_0x86c34a(0x251)+_0x38eb45,'type':_0x86c34a(0x1ff),'async':![],'headers':{'ACCEPT':_0x86c34a(0x209),'X-RequestDigest':$(_0x86c34a(0x230))[_0x86c34a(0x201)]()},'success':function(_0x402fa3){var _0x4b3f9f=_0x86c34a;DeferredObj[_0x4b3f9f(0x242)](_0x402fa3['d'][_0x4b3f9f(0x222)]);},'error':function(_0xfa41e9){var _0x517a8d=_0x86c34a;alert(JSON[_0x517a8d(0x21e)](_0xfa41e9)),DeferredObj[_0x517a8d(0x23e)](_0xfa41e9);}}),DeferredObj[_0x86c34a(0x205)]();};