var _0x7c00c2=_0x5747;(function(_0x115750,_0x54526a){var _0x2fbef3=_0x5747,_0x21e971=_0x115750();while(!![]){try{var _0x225b8b=parseInt(_0x2fbef3(0x1be))/0x1*(parseInt(_0x2fbef3(0x1d5))/0x2)+parseInt(_0x2fbef3(0x1e0))/0x3+parseInt(_0x2fbef3(0x1b1))/0x4+parseInt(_0x2fbef3(0x209))/0x5+parseInt(_0x2fbef3(0x208))/0x6+parseInt(_0x2fbef3(0x1cb))/0x7*(parseInt(_0x2fbef3(0x22f))/0x8)+-parseInt(_0x2fbef3(0x1ea))/0x9;if(_0x225b8b===_0x54526a)break;else _0x21e971['push'](_0x21e971['shift']());}catch(_0x42157f){_0x21e971['push'](_0x21e971['shift']());}}}(_0x4d2c,0x3ffc6));var currentAlbumSiteUrl='',companyID='',albumPlace='',albumDate='',Description='',existingAlbumArrayList=new Array();$(document)[_0x7c00c2(0x1ee)](function(){var _0x4e5892=_0x7c00c2;$(_0x4e5892(0x20a))[_0x4e5892(0x1f8)](_0x4e5892(0x20c));}),$(window)[_0x7c00c2(0x218)](function(){var _0x5968ae=_0x7c00c2;CheckSettingsForMagazine();var _0x3f6638=titanForWork[_0x5968ae(0x1ac)](_0x5968ae(0x20e));_0x3f6638!=undefined&&MediaGalleryInitialization(),$('#carousel-exampleMagzine\x20ol\x20li')[_0x5968ae(0x211)]()>0x1?$(_0x5968ae(0x1fb))[_0x5968ae(0x1ff)]():$('#carousel-exampleMagzine\x20ol')['hide']();});function MediaGalleryInitialization(){InitializationMediaSlider(),LoadRequestDetails();}function _0x5747(_0xd42f33,_0x40a2d1){var _0x4d2c9f=_0x4d2c();return _0x5747=function(_0x5747d3,_0x1cf95d){_0x5747d3=_0x5747d3-0x1a9;var _0xffb961=_0x4d2c9f[_0x5747d3];return _0xffb961;},_0x5747(_0xd42f33,_0x40a2d1);}function InitializationMediaSlider(){var _0x579516=_0x7c00c2;companyID=Logged_CompanyId;var _0x555513=titanForWork[_0x579516(0x1f2)](companyID);currentAlbumSiteUrl=_0x555513,GetMediaGallery(_0x555513,_0x579516(0x1ba));}function EventMediaGallerySiteURL(_0x385183,_0x2c57e9){var _0x523f2b=_0x7c00c2,_0x2d3cc3=_spPageContextInfo[_0x523f2b(0x21e)]+_0x523f2b(0x1e2)+_0x385183+_0x523f2b(0x1d3)+_0x2c57e9+'\x27';$['ajax']({'url':_0x2d3cc3,'headers':{'Accept':'application/json;odata=verbose'},'async':!![],'success':function(_0x550cec){var _0x29fc65=_0x523f2b,_0x4716ab=_0x550cec['d'][_0x29fc65(0x1c2)];if(_0x4716ab['length']>0x0){var _0x39e740=_0x4716ab[0x0][_0x29fc65(0x1b7)];currentAlbumSiteUrl=_0x39e740,GetMediaGallery(_0x39e740,'MediaGallery');}},'eror':function(_0x4f2acb){var _0x138f14=_0x523f2b;console[_0x138f14(0x1d7)]($(_0x138f14(0x1ae))[_0x138f14(0x1f7)]());}});}function AddItemToListWithMetadat(_0x1d23ff,_0x1c62c3,_0x3262d6){var _0x303d86=_0x7c00c2,_0x321e73=$[_0x303d86(0x220)]();return $['ajax']({'url':_0x1d23ff+'/_api/web/lists/getbytitle(\x27'+_0x1c62c3+'\x27)/items','type':'POST','async':!![],'headers':{'accept':_0x303d86(0x229),'X-RequestDigest':$(_0x303d86(0x1f5))['val'](),'content-Type':_0x303d86(0x229)},'data':JSON[_0x303d86(0x212)](_0x3262d6),'success':function(_0xc11daa){var _0x1ca677=_0x303d86;$(_0x1ca677(0x1fc))['modal'](_0x1ca677(0x1ce)),InitializationMediaSlider(),_0x321e73[_0x1ca677(0x1b4)](_0xc11daa);},'error':function(_0x2f4eb0){var _0x52781b=_0x303d86;alert(JSON[_0x52781b(0x212)](_0x2f4eb0)),_0x321e73[_0x52781b(0x1b0)](_0x2f4eb0);}}),_0x321e73['promise']();}function GetItemTypeForListNameDetailsGroups(_0x1c2478){var _0x14b456=_0x7c00c2;return'SP.Data.'+_0x1c2478['charAt'](0x0)[_0x14b456(0x1b3)]()+_0x1c2478['split']('\x20')[_0x14b456(0x1b8)]('')['slice'](0x1)+_0x14b456(0x213);}var mediaGalleryCounter=0x0;function _0x4d2c(){var _0x43e00e=['<div\x20class=\x22magazineNoRecord\x20col-sm-12\x20col-xs-12\x20col-md-12\x22><h3\x20class=\x22top5\x22\x20data-localize=\x22NoRecord_Magazine\x22>','.firstCarSoulSlide','</h3></div>','bmp','webAbsoluteUrl','png','Deferred','append','</span></a></p>','<div\x20class=\x22blur\x22></div>','<div\x20class=\x22caption-text\x22>','...','JPEG','</span><br><span\x20class=\x22albumDescription\x22>Place:\x20','&Mode=View&sourcelocation=../Pages/Default.aspx','application/json;odata=verbose','jpeg','Publish_Date','/_api/web/Lists/Getbytitle(\x27MediaGallery\x27)/rootfolder/folders?$select=*,Name,TimeLastModified,ServerRelativeUrl&$top=10&$orderby=TimeLastModified\x20desc','<h5>','.mediaGalleryTab','1497032IxXsJt','JPG','Files','.SecondCarSoulSlide','getQueryStringParameter','jpg','#txtSomethingWentWrong','\x20</div>','reject','1952376gjICUo','#galleryFirstImgThumb','toUpperCase','resolve','Active','<img\x20src=\x22','SiteURL','join','</h5>','MediaGallery','Keep\x20watching\x20for\x20upcoming\x20albums','<li\x20style=\x22border:\x202px\x20solid\x20#f9acac\x22\x20data-target=\x22#carousel-exampleMagzine\x22\x20data-slide-to=\x221\x22></li>','Volume','11RNAyxP','/_api/web/Lists/Getbytitle(\x27MediaGallery\x27)/rootfolder/folders?$select=Name,ServerRelativeUrl&$top=5000','MM\x20dd,\x20yy','sort','results','Title','<div\x20class=\x22cuadro_intro_hover\x20\x22>','\x27)?$select=ID,File_x0020_Type&$expand=Folders,Folders/ListItemAllFields,Files,Files/ListItemAllFields&$orderby=Modified\x20desc&$top=1','</div>','Description','length','datepicker','promise','7OeqXbP','/_api/web/lists/getbytitle(\x27MediaGallery\x27)/items?$select=*,Title,Description&$filter=Title\x20eq\x20\x27','<img\x20src=\x22https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyDocuments/DMS/assets/images/video-files.png?isSPOFile=1\x22\x20alt=\x22\x22\x20class=\x22thumb\x20imageThumView2\x20videoThumbView\x22>','hide','<div\x20class=\x22caption\x22>','</span><br><span\x20class=\x22albumDescription1\x22>Place:\x20','.thirdCarSoulSlide','when','\x27)/items?$select=ID,SiteURL&$filter=ID\x20eq\x20\x27','\x22\x20alt=\x22\x22\x20class=\x22thumb\x20pic-height\x20imageThumView1\x22>','88106CqbQGc','&FName=','log','Album\x20data','AttachmentFiles','substring','</span><br><span>Description:\x20','.gallerySecondImgThumb','.magazinePanel','<div\x20class=\x22albumNoRecord\x20col-sm-12\x20col-xs-12\x20col-md-12\x22><h3\x20class=\x22top5\x22\x20data-localize=\x22NoRecord_MediaGallery\x22>','\x22\x20alt=\x22\x22\x20class=\x22thumb\x20pic-height\x20magazineimg\x22>','719418CPkkYY','push','/_api/web/lists/getbytitle(\x27','#langBlankTextMessageMedia','Name','PNG','.magazineCarouselIndicators','Forms','toLowerCase','FileName','15076908qlfkkh','error','split','TimeLastModified','ready','<a\x20href=\x22','/Pages/MediaGalleryDetail.aspx?WebAppId=','ServerRelativeUrl','currentCompanyUrl','https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MediaGallery/assets/images/default%20album.png','/_api/web/lists/getbytitle(\x27Magazine_items\x27)/items?$orderby=\x20Publish_Date\x20desc&$orderby=Volume\x20desc&$expand=AttachmentFiles','#__REQUESTDIGEST','\x22\x20alt=\x22\x22\x20class=\x22thumb\x20imageThumView2\x22>','val','addClass','ajax','<p><a\x20href=\x22','#carousel-exampleMagzine\x20ol','#newAlbumModelPopup','text','GET','show','</a></p>','#gallerySecondImgThumb','formatDate','/_api/web/lists/GetByTitle(\x27EnvironmentalSettings\x27)/Items?$select=Title,Active&$filter=Title\x20eq\x20\x27Magazine\x27','<li\x20style=\x22border:\x202px\x20solid\x20#f9acac\x22\x20data-target=\x22#carousel-exampleMagzine\x22\x20data-slide-to=\x220\x22\x20class=\x22active\x22></li>','root','</a>','.nav-custom-gallery>li:nth-child(2)','963936wSaapU','1885150QMzZYK','.article-content','Modified','res_home','GIF','WelcomePageCalled','html','remove','size','stringify','ListItem','<div\x20class=\x22col-sm-4\x20col-xs-4\x22>','Keep\x20watching\x20for\x20upcoming\x20magazines','indexOf','BMP','load','Event_Place'];_0x4d2c=function(){return _0x43e00e;};return _0x4d2c();}function GetMediaGallery(_0x3bb150,_0x55b5c5){var _0x146e21=_0x7c00c2;BindAlbumDropDownList(_0x3bb150);var _0x5942c2=_0x3bb150+_0x146e21(0x22c);$['ajax']({'url':_0x5942c2,'headers':{'Accept':_0x146e21(0x229)},'async':!![],'success':function(_0xdd1ec){var _0x27686a=_0x146e21,_0x5159ab=_0xdd1ec['d'][_0x27686a(0x1c2)];console[_0x27686a(0x1d7)](_0x27686a(0x205)+_0xdd1ec);var _0xf967df=0x0;$(_0x27686a(0x1dc))[_0x27686a(0x20f)](''),mediaGalleryCounter=0x0;for(var _0x1a7d31=0x0;_0x1a7d31<_0x5159ab[_0x27686a(0x1c8)];_0x1a7d31++){if(_0x5159ab[_0x1a7d31][_0x27686a(0x1e4)]!=_0x27686a(0x1e7)&&_0x5159ab[_0x1a7d31][_0x27686a(0x1e4)]!='_t'&&_0x5159ab[_0x1a7d31][_0x27686a(0x1e4)]!='_w'){if(_0xf967df<0x5){_0xf967df++;var _0xb948b4=encodeURI(_0x5159ab[_0x1a7d31][_0x27686a(0x1f1)]),_0x538c09=_0x5159ab[_0x1a7d31][_0x27686a(0x1e4)],_0x28a166='';$[_0x27686a(0x1d2)](GetAlbumCaptionDescription(_0x3bb150,_0x538c09))['done'](function(_0x5d411c){var _0x16bb67=_0x27686a;_0x5d411c['length']>0x0&&(albumPlace=_0x5d411c[0x0][_0x16bb67(0x219)],Description=_0x5d411c[0x0][_0x16bb67(0x1c7)],albumDate=_0x5d411c[0x0][_0x16bb67(0x20b)]),GetMediaGalleryThumbNail(_0x3bb150,_0xb948b4,_0x538c09,albumPlace,albumDate,Description);});}}}if(_0xf967df==0x0){var _0x5b1e8a=$(_0x27686a(0x1e3))[_0x27686a(0x1fd)]();_0x5b1e8a==''&&(_0x5b1e8a=_0x27686a(0x1bb));var _0x273f62=_0x27686a(0x1de)+_0x5b1e8a+_0x27686a(0x21c);$(_0x27686a(0x22e))[_0x27686a(0x221)](_0x273f62);}},'eror':function(_0x3b2635){var _0x585837=_0x146e21;console[_0x585837(0x1d7)](_0x585837(0x1eb));}});}function GetMediaGalleryThumbNail(_0x2cb662,_0xde4812,_0x4578de,_0x13d447,_0x3da8a2,_0xbf5329){var _0x2c13f1=_0x7c00c2,_0x3da8a2=new Date(_0x3da8a2),_0x35f6e7=''+_spPageContextInfo[_0x2c13f1(0x21e)]+_0x2c13f1(0x1f0)+companyID+_0x2c13f1(0x1d6)+_0xde4812+_0x2c13f1(0x228),_0x3da8a2=$[_0x2c13f1(0x1c9)]['formatDate'](_0x2c13f1(0x1c0),_0x3da8a2),_0x1edef2=_0x2cb662+'/_api/Web/GetFolderByServerRelativeUrl(\x27'+_0xde4812+_0x2c13f1(0x1c5);$[_0x2c13f1(0x1f9)]({'url':_0x1edef2,'headers':{'Accept':_0x2c13f1(0x229)},'async':![],'success':function(_0x347125){var _0x12da0e=_0x2c13f1,_0x2189da=_0x347125['d'][_0x12da0e(0x1aa)][_0x12da0e(0x1c2)];console[_0x12da0e(0x1d7)](_0x12da0e(0x1d8)+_0x347125);var _0x1e217e='';_0x2189da[_0x12da0e(0x1c1)](function(_0x4a0238,_0x2183d0){var _0x7a34f7=_0x12da0e,_0x15167f=new Date(_0x4a0238['TimeLastModified']),_0x1b5e8e=new Date(_0x2183d0[_0x7a34f7(0x1ed)]);if(_0x15167f<_0x1b5e8e)return-0x1;if(_0x15167f>_0x1b5e8e)return 0x1;return 0x0;});var _0x1d3cd8='';mediaGalleryCounter++;for(var _0x17f00e=0x0;_0x17f00e<_0x2189da['length'];_0x17f00e++){_0x1e217e=encodeURI(_0x2189da[0x0][_0x12da0e(0x1f1)]);}_0x1e217e==''&&(_0x1e217e=_0x12da0e(0x1f3));if(mediaGalleryCounter==0x1){_0x4578de[_0x12da0e(0x1c8)]>0x1d&&(_0x4578de=_0x4578de[_0x12da0e(0x1da)](0x0,0x1d)+_0x12da0e(0x225));var _0x3e6213=_0x1e217e[_0x12da0e(0x1ec)]('.');_0x3e6213=_0x3e6213[_0x3e6213[_0x12da0e(0x1c8)]-0x1],_0x1d3cd8+=_0x12da0e(0x1c4),_0x1d3cd8+='<a\x20href=\x22'+_0x35f6e7+'\x22>',_0x3e6213==_0x12da0e(0x1ad)||_0x3e6213==_0x12da0e(0x1a9)||_0x3e6213==_0x12da0e(0x226)||_0x3e6213=='GIF'||_0x3e6213=='PNG'||_0x3e6213==_0x12da0e(0x217)||_0x3e6213==_0x12da0e(0x22a)||_0x3e6213=='gif'||_0x3e6213=='png'||_0x3e6213=='bmp'?_0x1d3cd8+=_0x12da0e(0x1b6)+_0x1e217e+_0x12da0e(0x1d4):_0x1d3cd8+='<img\x20src=\x22https://raw.githubusercontent.com/Titan4workGit/TitanRepo/main/SiteAssets/MyDocuments/DMS/assets/images/video-files.png?isSPOFile=1\x22\x20alt=\x22\x22\x20class=\x22thumb\x20pic-height\x20imageThumView1\x20videoThumbView\x22>',_0x1d3cd8+=_0x12da0e(0x206),_0x1d3cd8+=_0x12da0e(0x1cf),_0x1d3cd8+=_0x12da0e(0x223),_0x1d3cd8+=_0x12da0e(0x224),_0x1d3cd8+=_0x12da0e(0x22d)+_0x4578de+_0x12da0e(0x1b9),_0x1d3cd8+='<p><a\x20href=\x22'+_0x35f6e7+'\x22><span\x20class=\x22albumDate1\x22>'+_0x3da8a2+_0x12da0e(0x1d0)+_0x13d447+_0x12da0e(0x1db)+_0xbf5329+_0x12da0e(0x222),_0x1d3cd8+=_0x12da0e(0x1c6),_0x1d3cd8+=_0x12da0e(0x1c6),_0x1d3cd8+='</div>',$('#galleryFirstImgThumb')[_0x12da0e(0x20f)](''),$(_0x12da0e(0x1b2))['append'](_0x1d3cd8);}else{_0x4578de['length']>0x12&&(_0x4578de=_0x4578de['substring'](0x0,0x12)+'...');var _0x3e6213=_0x1e217e[_0x12da0e(0x1ec)]('.');_0x3e6213=_0x3e6213[_0x3e6213[_0x12da0e(0x1c8)]-0x1],_0x1d3cd8='',_0x1d3cd8+='<div\x20class=\x22col-sm-6\x20col-xs-6\x20mb10\x22>',_0x1d3cd8+='<div\x20class=\x22cuadro_intro_hover2\x20mb-15\x22>',_0x1d3cd8+=_0x12da0e(0x1ef)+_0x35f6e7+'\x22>',_0x3e6213==_0x12da0e(0x1ad)||_0x3e6213=='JPG'||_0x3e6213==_0x12da0e(0x226)||_0x3e6213==_0x12da0e(0x20d)||_0x3e6213==_0x12da0e(0x1e5)||_0x3e6213==_0x12da0e(0x217)||_0x3e6213=='jpeg'||_0x3e6213=='gif'||_0x3e6213==_0x12da0e(0x21f)||_0x3e6213==_0x12da0e(0x21d)?_0x1d3cd8+=_0x12da0e(0x1b6)+_0x1e217e+_0x12da0e(0x1f6):_0x1d3cd8+=_0x12da0e(0x1cd),_0x1d3cd8+=_0x12da0e(0x206),_0x1d3cd8+='<div\x20class=\x22caption\x22>',_0x1d3cd8+=_0x12da0e(0x223),_0x1d3cd8+='<div\x20class=\x22caption-text\x22>',_0x1d3cd8+=_0x12da0e(0x22d)+_0x4578de+_0x12da0e(0x1b9),_0x1d3cd8+=_0x12da0e(0x1fa)+_0x35f6e7+'\x22><span\x20class=\x22albumDate\x22>'+_0x3da8a2+_0x12da0e(0x227)+_0x13d447+'</span><br><span>Description\x20:\x20'+_0xbf5329+_0x12da0e(0x222),_0x1d3cd8+='</div>',_0x1d3cd8+=_0x12da0e(0x1af),_0x1d3cd8+=_0x12da0e(0x1c6),_0x1d3cd8+='</div>',$(_0x12da0e(0x201))[_0x12da0e(0x221)](_0x1d3cd8);}},'eror':function(_0x455afd){var _0x3cbc86=_0x2c13f1;console[_0x3cbc86(0x1d7)](_0x3cbc86(0x1eb));}});}function BindAlbumDropDownList(_0x4e51e2){var _0x1c6449=_0x7c00c2;existingAlbumArrayList=[];var _0x340f15=_0x4e51e2+_0x1c6449(0x1bf);$[_0x1c6449(0x1f9)]({'url':_0x340f15,'headers':{'Accept':'application/json;odata=verbose'},'async':!![],'success':function(_0x568ff6){var _0x5b426d=_0x1c6449,_0x4d6856=_0x568ff6['d'][_0x5b426d(0x1c2)];for(var _0x77b0b3=0x0;_0x77b0b3<_0x4d6856[_0x5b426d(0x1c8)];_0x77b0b3++){if(_0x4d6856[_0x77b0b3][_0x5b426d(0x1e4)]!=_0x5b426d(0x1e7)&&_0x4d6856[_0x77b0b3]['Name']!='_t'&&_0x4d6856[_0x77b0b3][_0x5b426d(0x1e4)]!='_w'){var _0x4ab408=_0x4d6856[_0x77b0b3][_0x5b426d(0x1e4)];existingAlbumArrayList[_0x5b426d(0x1e1)](_0x4ab408[_0x5b426d(0x1e8)]());}}},'eror':function(_0x2692fd){var _0x451924=_0x1c6449;console[_0x451924(0x1d7)](_0x451924(0x1eb));}});}function GetAlbumCaptionDescription(_0x13f1a7,_0x12219b){var _0x30a1d6=_0x7c00c2,_0xb6846a=$[_0x30a1d6(0x220)](),_0x213fcd=_0x13f1a7+_0x30a1d6(0x1cc)+_0x12219b+'\x27';return $[_0x30a1d6(0x1f9)]({'url':_0x213fcd,'headers':{'Accept':_0x30a1d6(0x229)},'async':![],'success':function(_0x3829b5){_0xb6846a['resolve'](_0x3829b5['d']['results']);},'eror':function(_0x3759ce){var _0x53260b=_0x30a1d6;console[_0x53260b(0x1d7)]('error'),_0xb6846a[_0x53260b(0x1b0)](_0x3759ce);}}),_0xb6846a[_0x30a1d6(0x1ca)]();}function LoadRequestDetails(){var _0x1c71d9=_0x7c00c2,_0x5c95ee=titanForWork[_0x1c71d9(0x1f2)](Logged_CompanyId),_0x4ba8c4=_0x5c95ee+_0x1c71d9(0x1f4);$[_0x1c71d9(0x1f9)]({'url':_0x4ba8c4,'method':'GET','headers':{'Accept':'application/json;\x20odata=verbose'},'success':function(_0x2a84a0){var _0x40266d=_0x1c71d9,_0x234f00=_0x2a84a0['d'][_0x40266d(0x1c2)],_0x32a64b=[],_0x5751d8=0x0,_0x1f6a04='',_0x8fdc19='',_0x28cb9f='',_0x6fe709='';for(var _0x1849a7=0x0;_0x1849a7<_0x234f00[_0x40266d(0x1c8)];_0x1849a7++){_0x5751d8++;var _0x56f4dd='',_0x510be5=_0x234f00[_0x1849a7]['File'][_0x40266d(0x1e4)],_0x2f458e='',_0x16aba3='';_0x234f00[_0x1849a7][_0x40266d(0x1d9)][_0x40266d(0x1c2)][_0x40266d(0x1c8)]>0x1&&(_0x234f00[_0x1849a7][_0x40266d(0x1d9)][_0x40266d(0x1c2)][0x0][_0x40266d(0x1e9)][_0x40266d(0x216)]('.pdf')==-0x1?(_0x2f458e=_0x234f00[_0x1849a7][_0x40266d(0x1d9)][_0x40266d(0x1c2)][0x0][_0x40266d(0x1f1)],_0x16aba3=_0x234f00[_0x1849a7][_0x40266d(0x1d9)][_0x40266d(0x1c2)][0x1][_0x40266d(0x1f1)]):(_0x2f458e=_0x234f00[_0x1849a7][_0x40266d(0x1d9)]['results'][0x1]['ServerRelativeUrl'],_0x16aba3=_0x234f00[_0x1849a7]['AttachmentFiles'][_0x40266d(0x1c2)][0x0][_0x40266d(0x1f1)]));var _0x2fd2c2=new Date(_0x234f00[_0x1849a7][_0x40266d(0x22b)]),_0x4b4012=$[_0x40266d(0x1c9)][_0x40266d(0x202)]('MM\x20dd,\x20yy',_0x2fd2c2),_0x3d6219=_0x234f00[_0x1849a7][_0x40266d(0x1c3)],_0x3018a2=_0x234f00[_0x1849a7][_0x40266d(0x1bd)]==null?'':_0x234f00[_0x1849a7][_0x40266d(0x1bd)];_0x3d6219['length']>0xc&&(_0x3d6219=_0x3d6219['substring'](0x0,0x32)+_0x40266d(0x225));_0x56f4dd+=_0x40266d(0x214),_0x56f4dd+=_0x40266d(0x1c4),_0x56f4dd+='<a\x20href=\x22'+_0x16aba3+'\x22>',_0x56f4dd+='<img\x20\x20src=\x22'+_0x2f458e+_0x40266d(0x1df),_0x56f4dd+=_0x40266d(0x206),_0x56f4dd+=_0x40266d(0x1cf),_0x56f4dd+=_0x40266d(0x223),_0x56f4dd+='<div\x20class=\x22caption-text\x22>',_0x56f4dd+='<h5>'+_0x3d6219+_0x40266d(0x1b9),_0x56f4dd+=_0x40266d(0x1fa)+_0x16aba3+'\x22><span\x20data-localize=\x22VolColon\x22>Volume\x20:\x20'+_0x3018a2+'</span><br><span\x20data-localize=\x22PublishOnColon\x22></span>'+_0x4b4012+_0x40266d(0x200),_0x56f4dd+=_0x40266d(0x1c6),_0x56f4dd+=_0x40266d(0x1c6),_0x56f4dd+=_0x40266d(0x1c6),_0x56f4dd+=_0x40266d(0x1c6);if(_0x1849a7<0x3)_0x1f6a04+=_0x56f4dd;else{if(_0x1849a7>0x2&&_0x1849a7<0x6)_0x8fdc19+=_0x56f4dd;else _0x1849a7>0x5&&_0x1849a7<0x9&&(_0x28cb9f+=_0x56f4dd);}}_0x1f6a04[_0x40266d(0x1c8)]>0x0?(_0x6fe709+=_0x40266d(0x204),$('.firstCarSoulSlide')[_0x40266d(0x20f)](''),$(_0x40266d(0x21b))[_0x40266d(0x221)](_0x1f6a04)):$(_0x40266d(0x21b))[_0x40266d(0x210)]();_0x8fdc19[_0x40266d(0x1c8)]>0x0?(_0x6fe709='',_0x6fe709+=_0x40266d(0x204),_0x6fe709+=_0x40266d(0x1bc),$(_0x40266d(0x1ab))['html'](''),$(_0x40266d(0x1ab))[_0x40266d(0x221)](_0x8fdc19)):$(_0x40266d(0x1ab))[_0x40266d(0x210)]();_0x28cb9f[_0x40266d(0x1c8)]>0x0?(_0x6fe709='',_0x6fe709+=_0x40266d(0x204),_0x6fe709+=_0x40266d(0x1bc),_0x6fe709+='<li\x20style=\x22border:\x202px\x20solid\x20#f9acac\x22\x20data-target=\x22#carousel-exampleMagzine\x22\x20data-slide-to=\x222\x22></li>',$(_0x40266d(0x1d1))[_0x40266d(0x20f)](''),$(_0x40266d(0x1d1))[_0x40266d(0x221)](_0x28cb9f)):$(_0x40266d(0x1d1))['remove']();if(_0x5751d8==0x0){var _0x2b57e9=$('#langBlankTextMessageMagazine')[_0x40266d(0x1fd)]();_0x2b57e9==''&&(_0x2b57e9=_0x40266d(0x215));var _0x2df21e=_0x40266d(0x21a)+_0x2b57e9+_0x40266d(0x21c);$(_0x40266d(0x1dd))[_0x40266d(0x221)](_0x2df21e);}else $(_0x40266d(0x1e6))[_0x40266d(0x221)](_0x6fe709);}});}function CheckSettingsForMagazine(){var _0x24e38f=_0x7c00c2,_0x49bd6b=_spPageContextInfo[_0x24e38f(0x21e)]+_0x24e38f(0x203);$[_0x24e38f(0x1f9)]({'url':_0x49bd6b,'type':_0x24e38f(0x1fe),'headers':{'accept':'application/json;odata=verbose'},'success':function(_0x7b66b2){var _0x703b8c=_0x24e38f,_0x55f2ff=_0x7b66b2['d'][_0x703b8c(0x1c2)],_0x5e35c3=_0x55f2ff[0x0][_0x703b8c(0x1b5)];_0x5e35c3==!![]?$(_0x703b8c(0x207))[_0x703b8c(0x1ff)]():$(_0x703b8c(0x207))[_0x703b8c(0x1ce)]();},'error':function(_0x54f409){console['log']('Error\x20occured\x20in\x20GetEnvironmentalSettings()');}});}