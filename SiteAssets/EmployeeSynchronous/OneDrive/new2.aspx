<!DOCTYPE html>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<head>
<!--<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.min.js"></script>-->
    <script type="text/javascript" src="https://js.live.net/v7.0/OneDrive.js"></script>
    <script>
        $(document).ready(function () {
            $(".onedrivelauncher").click(function () {
                launchOneDrivePicker();
            });

        });
        function launchOneDrivePicker() {
            var odOptions = {
                clientId: "5572d20e-f98a-4101-9514-6d5b93d15a1d",
                action: "download",
                advanced: {
                    redirectUri: currentOneDriveSiteUrl+"/SiteAssets/EmployeeSynchronous/OneDrive/new2.aspx"
                },
                multiSelect: true,
                openInNewWindow: true,
                success: function (files) { /* success handler */
                    console.debug(files);
                },
                cancel: function () { /* cancel handler */ },
                error: function (e) { /* error handler */ }
            }
            OneDrive.open(odOptions);
        }
    </script>
   

<!--[if gte mso 9]><SharePoint:CTFieldRefs runat=server Prefix="mso:" FieldList="FileLeafRef,MediaLengthInSeconds"><xml>
<mso:CustomDocumentProperties>
<mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Editor msdt:dt="string">Rakesh Khambra</mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Editor>
<mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Author msdt:dt="string">Mohd  Muqtdeer</mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_Author>
<mso:_dlc_DocId msdt:dt="string">ADMIN-1645029823-284</mso:_dlc_DocId>
<mso:_dlc_DocIdItemGuid msdt:dt="string">b3d66e4a-ebd5-492b-a465-1242c41d9f67</mso:_dlc_DocIdItemGuid>
<mso:_dlc_DocIdUrl msdt:dt="string">https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV/_layouts/15/DocIdRedir.aspx?ID=ADMIN-1645029823-284, ADMIN-1645029823-284</mso:_dlc_DocIdUrl>
<mso:Order msdt:dt="string">28400.0000000000</mso:Order>
<mso:_ExtendedDescription msdt:dt="string"></mso:_ExtendedDescription>
<mso:ContentTypeId msdt:dt="string">0x010100AB3CA9BBCC75BB4D960EDF9C33169BDB</mso:ContentTypeId>
<mso:MediaServiceImageTags msdt:dt="string"></mso:MediaServiceImageTags>
<mso:lcf76f155ced4ddcb4097134ff3c332f msdt:dt="string"></mso:lcf76f155ced4ddcb4097134ff3c332f>
<mso:TaxCatchAll msdt:dt="string"></mso:TaxCatchAll>
</mso:CustomDocumentProperties>
</xml></SharePoint:CTFieldRefs><![endif]-->
<title></title></head>
<body>
    <button type="button" class="onedrivelauncher">OneDrive</button>
</body>
</html>