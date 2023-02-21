SP.SOD.executeFunc("sp.js", 'SP.ClientContext', switchLanguage);
function switchLanguage() {
    var language = { 54: 'af', 1078: 'af-ZA', 28: 'sq', 1052: 'sq-AL', 132: 'gsw', 1156: 'gsw-FR', 94: 'am', 1118: 'am-ET', 1: 'ar', 5121: 'ar-DZ', 15361: 'ar-BH', 3073: 'ar-EG', 2049: 'ar-IQ', 11265: 'ar-JO', 13313: 'ar-KW', 12289: 'ar-LB', 4097: 'ar-LY', 6145: 'ar-MA', 8193: 'ar-OM', 16385: 'ar-QA', 1025: 'ar-SA', 10241: 'ar-SY', 7169: 'ar-TN', 14337: 'ar-AE', 9217: 'ar-YE', 43: 'hy', 1067: 'hy-AM', 77: 'as', 1101: 'as-IN', 29740: 'az-Cyrl', 2092: 'az-Cyrl-AZ', 44: 'az', 30764: 'az-Latn', 1068: 'az-Latn-AZ', 69: 'bn', 2117: 'bn-BD', 1093: 'bn-IN', 109: 'ba', 1133: 'ba-RU', 45: 'eu', 1069: 'eu-ES', 35: 'be', 1059: 'be-BY', 25626: 'bs-Cyrl', 8218: 'bs-Cyrl-BA', 26650: 'bs-Latn', 30746: 'bs', 5146: 'bs-Latn-BA', 126: 'br', 1150: 'br-FR', 2: 'bg', 1026: 'bg-BG', 85: 'my', 1109: 'my-MM', 3: 'ca', 1027: 'ca-ES', 146: 'ku', 31890: 'ku-Arab', 1170: 'ku-Arab-IQ', 92: 'chr', 31836: 'chr-Cher', 1116: 'chr-Cher-US', 4: 'zh-Hans', 30724: 'zh', 2052: 'zh-CN', 4100: 'zh-SG', 31748: 'zh-Hant', 3076: 'zh-HK', 5124: 'zh-MO', 1028: 'zh-TW', 131: 'co', 1155: 'co-FR', 26: 'bs, hr, or sr', 1050: 'hr-HR', 4122: 'hr-BA', 5: 'cs', 1029: 'cs-CZ', 6: 'da', 1030: 'da-DK', 140: 'prs', 1164: 'prs-AF', 101: 'dv', 1125: 'dv-MV', 19: 'nl', 2067: 'nl-BE', 1043: 'nl-NL', 9: 'en', 3081: 'en-AU', 10249: 'en-BZ', 4105: 'en-CA', 9225: 'en-029', 15369: 'en-HK', 16393: 'en-IN', 6153: 'en-IE', 8201: 'en-JM', 17417: 'en-MY', 5129: 'en-NZ', 13321: 'en-PH', 18441: 'en-SG', 7177: 'en-ZA', 11273: 'en-TT', 2057: 'en-GB', 1033: 'en-US', 12297: 'en-ZW', 37: 'et', 1061: 'et-EE', 56: 'fo', 1080: 'fo-FO', 100: 'fil', 1124: 'fil-PH', 11: 'fi', 1035: 'fi-FI', 12: 'fr', 2060: 'fr-BE', 11276: 'fr-CM', 3084: 'fr-CA', 9228: 'fr-CD', 12300: 'fr-CI', 1036: 'fr-FR', 15372: 'fr-HT', 5132: 'fr-LU', 13324: 'fr-ML', 14348: 'fr-MA', 6156: 'fr-MC', 8204: 'fr-RE', 10252: 'fr-SN', 4108: 'fr-CH', 98: 'fy', 1122: 'fy-NL', 103: 'ff', 31847: 'ff-Latn', 2151: 'ff-Latn-SN', 86: 'gl', 1110: 'gl-ES', 55: 'ka', 1079: 'ka-GE', 7: 'de', 3079: 'de-AT', 1031: 'de-DE', 5127: 'de-LI', 4103: 'de-LU', 2055: 'de-CH', 8: 'el', 1032: 'el-GR', 111: 'kl', 1135: 'kl-GL', 116: 'gn', 1140: 'gn-PY', 71: 'gu', 1095: 'gu-IN', 104: 'ha', 31848: 'ha-Latn', 1128: 'ha-Latn-NG', 117: 'haw', 1141: 'haw-US', 13: 'he', 1037: 'he-IL', 57: 'hi', 1081: 'hi-IN', 14: 'hu', 1038: 'hu-HU', 15: 'is', 1039: 'is-IS', 112: 'ig', 1136: 'ig-NG', 33: 'id', 1057: 'id-ID', 93: 'iu', 31837: 'iu-Latn', 2141: 'iu-Latn-CA', 30813: 'iu-Cans', 1117: 'iu-Cans-CA', 60: 'ga', 2108: 'ga-IE', 16: 'it', 1040: 'it-IT', 2064: 'it-CH', 17: 'ja', 1041: 'ja-JP', 4096: 'jv', 4096: 'jv-Latn', 4096: 'jv-Latn-ID', 134: 'qut', 1158: 'qut-GT', 75: 'kn', 1099: 'kn-IN', 63: 'kk', 1087: 'kk-KZ', 83: 'km', 1107: 'km-KH', 135: 'rw', 1159: 'rw-RW', 65: 'sw', 1089: 'sw-KE', 87: 'kok', 1111: 'kok-IN', 18: 'ko', 1042: 'ko-KR', 64: 'ky', 1088: 'ky-KG', 84: 'lo', 1108: 'lo-LA', 38: 'lv', 1062: 'lv-LV', 39: 'lt', 1063: 'lt-LT', 31790: 'dsb', 2094: 'dsb-DE', 110: 'lb', 1134: 'lb-LU', 47: 'mk', 1071: 'mk-MK', 4096: 'mg', 4096: 'mg-MG', 62: 'ms', 2110: 'ms-BN', 1086: 'ms-MY', 76: 'ml', 1100: 'ml-IN', 58: 'mt', 1082: 'mt-MT', 129: 'mi', 1153: 'mi-NZ', 122: 'arn', 1146: 'arn-CL', 78: 'mr', 1102: 'mr-IN', 124: 'moh', 1148: 'moh-CA', 80: 'mn', 30800: 'mn-Cyrl', 1104: 'mn-MN', 31824: 'mn-Mong', 2128: 'mn-Mong-CN', 4096: 'nqo', 4096: 'nqo-GN', 97: 'ne', 2145: 'ne-IN', 1121: 'ne-NP', 20: 'no', 31764: 'nb', 1044: 'nb-NO', 30740: 'nn', 2068: 'nn-NO', 130: 'oc', 1154: 'oc-FR', 72: 'or', 1096: 'or-IN', 114: 'om', 1138: 'om-ET', 99: 'ps', 1123: 'ps-AF', 41: 'fa', 1065: 'fa-IR', 21: 'pl', 1045: 'pl-PL', 22: 'pt', 4096: 'pt-AO', 1046: 'pt-BR', 2070: 'pt-PT', 1281: 'qps-ploc', 1534: 'qps-ploca', 2559: 'qps-plocm', 70: 'pa', 31814: 'pa-Arab', 1094: 'pa-IN', 2118: 'pa-Arab-PK', 107: 'quz', 1131: 'quz-BO', 2155: 'quz-EC', 3179: 'quz-PE', 24: 'ro', 2072: 'ro-MD', 1048: 'ro-RO', 23: 'rm', 1047: 'rm-CH', 25: 'ru', 1049: 'ru-RU', 133: 'sah', 1157: 'sah-RU', 28731: 'smn', 9275: 'smn-FI', 31803: 'smj', 4155: 'smj-NO', 5179: 'smj-SE', 59: 'se', 3131: 'se-FI', 1083: 'se-NO', 2107: 'se-SE', 29755: 'sms', 8251: 'sms-FI', 30779: 'sma', 6203: 'sma-NO', 7227: 'sma-SE', 79: 'sa', 1103: 'sa-IN', 145: 'gd', 1169: 'gd-GB', 27674: 'sr-Cyrl', 7194: 'sr-Cyrl-BA', 12314: 'sr-Cyrl-ME', 10266: 'sr-Cyrl-RS', 3098: 'sr-Cyrl-CS', 28698: 'sr-Latn', 31770: 'sr', 6170: 'sr-Latn-BA', 11290: 'sr-Latn-ME', 9242: 'sr-Latn-RS', 2074: 'sr-Latn-CS', 108: 'nso', 1132: 'nso-ZA', 50: 'tn', 2098: 'tn-BW', 1074: 'tn-ZA', 4096: 'sn', 4096: 'sn-Latn', 4096: 'sn-Latn-ZW', 89: 'sd', 31833: 'sd-Arab', 2137: 'sd-Arab-PK', 91: 'si', 1115: 'si-LK', 27: 'sk', 1051: 'sk-SK', 36: 'sl', 1060: 'sl-SI', 119: 'so', 1143: 'so-SO', 48: 'st', 1072: 'st-ZA', 10: 'es', 11274: 'es-AR', 8202: 'es-VE', 16394: 'es-BO', 13322: 'es-CL', 9226: 'es-CO', 5130: 'es-CR', 7178: 'es-DO', 12298: 'es-EC', 17418: 'es-SV', 4106: 'es-GT', 18442: 'es-HN', 22538: 'es-419', 2058: 'es-MX', 19466: 'es-NI', 6154: 'es-PA', 15370: 'es-PY', 10250: 'es-PE', 20490: 'es-PR', 1034: 'es-ES_tradnl', 3082: 'es-ES', 21514: 'es-US', 14346: 'es-UY', 4096: 'zgh', 4096: 'zgh-Tfng-MA', 4096: 'zgh-Tfng', 29: 'sv', 2077: 'sv-FI', 1053: 'sv-SE', 90: 'syr', 1114: 'syr-SY', 40: 'tg', 31784: 'tg-Cyrl', 1064: 'tg-Cyrl-TJ', 95: 'tzm', 31839: 'tzm-Latn', 2143: 'tzm-Latn-DZ', 73: 'ta', 1097: 'ta-IN', 2121: 'ta-LK', 68: 'tt', 1092: 'tt-RU', 74: 'te', 1098: 'te-IN', 30: 'th', 1054: 'th-TH', 81: 'bo', 1105: 'bo-CN', 115: 'ti', 2163: 'ti-ER', 1139: 'ti-ET', 49: 'ts', 1073: 'ts-ZA', 31: 'tr', 1055: 'tr-TR', 66: 'tk', 1090: 'tk-TM', 2080: 'ur-IN', 34: 'uk', 1058: 'uk-UA', 46: 'dsb or hsb', 1070: 'hsb-DE', 32: 'ur', 1056: 'ur-PK', 128: 'ug', 1152: 'ug-CN', 30787: 'uz-Cyrl', 2115: 'uz-Cyrl-UZ', 67: 'uz', 31811: 'uz-Latn', 1091: 'uz-Latn-UZ', 2051: 'ca-ES-valencia', 42: 'vi', 1066: 'vi-VN', 82: 'cy', 1106: 'cy-GB', 136: 'wo', 1160: 'wo-SN', 120: 'ii', 1144: 'ii-CN', 106: 'yo', 1130: 'yo-NG', 52: 'xh', 1076: 'xh-ZA', 53: 'zu', 1077: 'zu-ZA' };
    var currentUserLanguage = SP.PageContextInfo.get_currentLanguage();
  //  $.each(language, function (lcid, value) {
      //  if (lcid == currentUserLanguage) {
         //   var switchLanguage = value;
         //   $("html").attr('id', 'pageHTML');
         //   document.getElementById("pageHTML").setAttribute('lang', switchLanguage)
     //   }
  //  });
}






/*
* This example shows that you can:
* - change the language on the fly.
*/

       var myDictionary = {
          
            ar : {
               'Announcements' : '1تاريخ النشر من',
               'General Conversations' : '2تاريخ النشر من',
               'Resources' : '3تاريخ النشر من',
			   'Meeting Room' : '4تاريخ النشر من',
			   'Blogs' : '5تاريخ النشر من',
			   'Poll' : '6تاريخ النشر من',	
			   'New Joinee' : '7تاريخ النشر من',
			   'New Initiatives' : '8تاريخ النشر من',
			   'Conversations' : '9تاريخ النشر من',	
			   'Suggestions' : '10تاريخ النشر من',	
			   'Documents' : '11تاريخ النشر من', 
			   'View All' : '12Voir tout', 
			   '+ Add New' : '13+ Ajouter un nouveau', 
			   '+ Book' : '14+ Livre',
			   'Wait for new documents.' : '15+ Livre',  
			   'Wait for new suggestions.' : '16Attendez de nouvelles suggestions.',
			   'Wait for new initiatives.' : '17Attendre de nouvelles initiatives.',
			   'Poll Name' : '18Nom du sondage',
			   'End Date' : '19Date  fin',
			   'Read more' : '20Lire la suite',

  
           },
            fr : {
               'Announcements' : 'Annonces',
               'General Conversations' : 'Conversations générales',
               'Resources' : 'Ressources',
			   'Meeting Room' : 'Salle de réunion',
			   'Blogs' : 'archive du blog',
			   'Poll' : 'Sondage',	
			   'New Joinee' : 'Nouveau Joinee',
			   'New Initiatives' : 'Nouvelles initiatives',
			   'Conversations' : 'Conversations',	
			   'Suggestions' : 'Suggestions',	
			   'Documents' : 'Documents',   
			   'View All' : 'Voir tout', 
			   '+ Add New' : '+ Ajouter un nouveau', 
			   '+ Book': '+ Livre', 
			   'Wait for new documents.' : 'Attendre de nouveaux documents', 
			   'Wait for new suggestions.' : 'Attendez de nouvelles suggestions.',
			   'Wait for new initiatives.' : 'Attendre de nouvelles initiatives.',
			   'Poll Name': 'Nomson',
			   'End Date' : 'Date fin',
			   'Read more' : 'Lire la suite',

 
           }

       }
$.tr.dictionary(myDictionary);

$(document).ready(function() {
              
    // change the language
   // $('#language').change(function() {
   
   changeLang(_spPageContextInfo.currentUICultureName.toLowerCase());
       
});


function changeLang(lang) {

if(lang == 'fr-fr')
{
 $.tr.language('fr');
                     
        var tr = $.tr.translator();
         $("label,span.ms-splinkbutton-text").each(function (i, elt) {
	        elt.innerText=tr(elt.innerText);	        
	    });
	    $("input[type=button]").each(function (i, elt) {
	        elt.value=tr(elt.value);	        
	    });
	    }
	    else if(lang == 'ar-sa')
	    {
	     $.tr.language('ar');
                     
        var tr = $.tr.translator();
         $("label,span.ms-splinkbutton-text").each(function (i, elt) {
	        elt.innerText=tr(elt.innerText);	        
	    });
	    $("input[type=button]").each(function (i, elt) {
	        elt.value=tr(elt.value);	        
	    });

	    }
	    
	    
        //$('#welcome').text(tr('Publish Date From'));
        //$("input[type=button], select, textarea").prop("value", '');
   // });
              
    // default language is English if no cookies present
   // var language = $.tr.language('en', true);
              
   // $('#language').val(language);
   // $('#language').change();
    

}



