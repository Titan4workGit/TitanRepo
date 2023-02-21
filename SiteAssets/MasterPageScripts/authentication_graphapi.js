
		var clientid="895e6de8-6dbb-47e1-a171-af9b8ad5f5c2";
        var tenant="3c55c7bf-896d-4f85-aceb-124dca48c080";
        var redirecturl = "https://adaptindia.sharepoint.com/sites/Titan_3_0_Master/Pages/GuestPortalAdmin.aspx";
        //debugger


var token1="";
            // #1: Set up ADAL
            var authContext = new AuthenticationContext({
                clientId: clientid, //Need to change in client environment
				tenant: tenant,  //Need to change in client environment
                postLogoutRedirectUri: window.location,
                redirectUri: redirecturl,  //Need to change in client environment
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
                    
                    authContext._saveItem(authContext.CONSTANTS.STORAGE.USERNAME,user.userName)

                    // #4: Get an access token to the Microsoft Graph API
                    authContext.acquireToken("https://graph.microsoft.com",
                        function (error, token) {
                        
                        console.log(token);
                        console.log(error);

                        
                            if (error || !token) { 
                                                        		
                            		return;
                            
							}
                            
                            localStorage.setItem('logintoken',token);
							
                        }
                    );
                } else {

                    console.log('Not signed in.');
                    authContext.login();

                }
            }
            
            
    
    $(document).ready(function(){
    
    	setInterval(function(){
    	//debugger;
   		 token1=localStorage.getItem('logintoken');
     token=localStorage.getItem('logintoken');

     
   		 if(token1==null || token1=="")
   		 {
    		
    			authContext.acquireToken("https://graph.microsoft.com",
                        function (error, token) {
                        
                        console.log(token);
                        console.log(error);
                        

                            if (error || !token) { 
                                                        	
                            		return;
                            
							}
							
							localStorage.setItem('logintoken',token);
							token=localStorage.getItem('logintoken');
							token1=localStorage.getItem('logintoken');

                            
                        }
                    );
       	  }
    	},5000);
    	
    });
