

//ClientCredentials();
var token1 = "";
var GetclientId,GettenantId;
// #1: Set up ADAL
var authContext = new AuthenticationContext({
    clientId: '895e6de8-6dbb-47e1-a171-af9b8ad5f5c2', //Need to change in client environment
    tenant: '3c55c7bf-896d-4f85-aceb-124dca48c080', //Need to change in client environment
    postLogoutRedirectUri: window.location,
    redirectUri:'https://adaptindia.sharepoint.com/sites/Titan_2_2_1_DEV/', //Need to change in client environment, Make sure this URL will be in the RedirectURL list
    endpoints: {
        graphApiUri: "https://graph.microsoft.com"
    },
    cacheLocation: "localStorage"
});

// #3: Handle redirect after token requests
if (authContext.isCallback(window.location.hash)) {

    authContext.handleWindowCallback();
    var err = authContext.getLoginError();
    if (err) {
        // TODO: Handle errors signing in and getting tokens
    }

} else {

    // If logged in, get access token and make an API request
    var user = authContext.getCachedUser();
    if (user) {

        console.log('Signed in as: ' + user.userName);

        authContext._saveItem(authContext.CONSTANTS.STORAGE.USERNAME, user.userName)

        // #4: Get an access token to the Microsoft Graph API
        authContext.acquireToken("https://graph.microsoft.com",
            function(error, token) {

                console.log(token);
                console.log(error);


                if (error || !token) {

                    return;

                }

                localStorage.setItem('logintoken', token);

            }
        );
    } else {

        console.log('Not signed in.');
        authContext.login();

    }
}



$(document).ready(function() {

    setInterval(function() {
        //debugger;
        token1 = localStorage.getItem('logintoken');
        token = localStorage.getItem('logintoken');


        if (token == null || token == "") {

            authContext.acquireToken("https://graph.microsoft.com",
                function(error, token) {

                    console.log(token);
                    console.log(error);


                    if (error || !token) {

                        return;

                    }

                    localStorage.setItem('logintoken', token);
                    token = localStorage.getItem('logintoken');
                    token1 = localStorage.getItem('logintoken');


                }
            );
        }
    }, 5000);

});



function ClientCredentials() {
    var Listname = "EnvironmentalSettings";

    var siteurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + Listname + "')/items?$filter=Title eq 'Client_Credentials' ";
    $.ajax({
        url: siteurl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        async: false,
        success: function(data) {
            var items = data.d.results;
            GetclientId = items[0].ClientName;
            GettenantId = items[0].ChangeFileName;
            ClientUrl = items[0].Description;

        },
        error: function(data) {
            console.log(data);
        }
    });
}
