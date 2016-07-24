
$(document).ready
(
    function()
    {
 
 
             /*****************************************Search for User****************************************/
             $(document).on('input', '#header input',
                                function(event)
                                {
                                
                                //We are searching for a new user, remove the previous users shown
                                $('#SearchUserPreviewBox').remove();
                                
                                //Make it all lower-case
                                var UserInput = event.target.value.toLowerCase();
                                
                                //Only send ajax when user starts typing
                                if( UserInput.length != 0 )
                                {
                                $.ajax({
                                       type: 'POST',
                                       url: "/SearchUsers",
                                       dataType: 'JSON',
                                       //Send selected sport to server as JSON
                                       data: { "SearchUserString": UserInput },
                                       //Receives all the matching events
                                       success: function (response)
                                       {
                                           //console.log(response);
                                           
                                           //Only process if matched users were found
                                           if(response.length > 0)
                                           {
                                           
                                           //The box that contains all matched events
                                           //Make it scrollable
                                           var $SearchUserPreviewBox = $('<section>',
                                                                         {
                                                                         id: 'SearchUserPreviewBox'
                                                                         }
                                                                         );
                                           
                                           //insert $SearchUserPreviewBox after the search bar, but make it position absolute
                                           $SearchUserPreviewBox.insertAfter('#SearchBar input');
                                           
                                           //The <ul> inside which we will place the matched users
                                           var $UsersUL = $('<ul>',
                                                            {
                                                            id: 'SearchUsersUL'
                                                            }
                                                            );
                                           
                                           //UL contains all the user previews
                                           $SearchUserPreviewBox.append($UsersUL);
                                           
                                           
                                           //Loop over all the searched users and append them
                                           $.each(response,
                                                      function(index, item)
                                                      {
                                                      
                                                      var $User = $('<div>',
                                                                    {
                                                                    class: 'SearchedUser'
                                                                    }
                                                                    );
                                                      
                                                      var $Name = $('<p>',
                                                                    {
                                                                    //Make the first letter of each word capitalized
                                                                    text: item.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
                                                                    }
                                                                    );
                                                      
                                                      var $Image = $('<img>',
                                                                     {
                                                                     src: item.url,
                                                                     width: '30px',
                                                                     height: '30px',
                                                                     class:  'SearchedUserImage'
                                                                     }
                                                                     );
                                                      
                                                      //Attach a hidden input to user ID
                                                      //So that upon click, we can go to his profile
                                                      var $UserID = $('<input>',
                                                                      {
                                                                      type: 'hidden',
                                                                      name: 'SearchedUserID',
                                                                      value: item.userid
                                                                      }
                                                                      );
                                                      
                                                      
                                                      $User.append($Image);  //Append the Image
                                                      $User.append($Name);   //Append the name
                                                      $User.append($UserID);   //Append the friend id
                                                      
                                                      $UsersUL.append($User);   //Append the user to the list
                                                      
                                                      
                                                      }
                                                  
                                                  );
                                            }
                                       }
                                       }); //End of AJAX
                                }
                                
                                
                                }
                            );
             
             //When a user clicks on a searhed user
             $(document).on('click', '.SearchedUser ',
                                            function()
                                            {
                                                //Remove the displayed SearchUserPreviewBox
                                                $('#SearchUserPreviewBox').remove();
                                                
                                                //Store the clicked friend's ID in a cookie to be accessed by Profile_OthersView.js
                                                $.cookie("FriendIDClicked", $(this).children('input').val());
                                                
                                                //Go back to your friend's page
                                                window.location.replace("/Profile_OthersView.html");
                                            }
                            );
 
 
            /****************************************WebSockets***********************************/
            var NotificationSocket = io('/Notifications');
            var One2OneMessageSocket = io('/One2OneMessaging');
            /************************************************************************************/

             //This user is only listening to FriendNotification only concerning his userid in the "NotificationSocket" socket
             //Only accepts a FriendNotification when add user adds him
             NotificationSocket.on('FriendNotification' + $.cookie("UserID") ,
                                   
                                                       function(msg)
                                                       {
                                                           $('#FB_Friend_SVG p').show();
                                                           $('#FB_Friend_SVG p').text( msg );
                                                           document.getElementById('NotificationSound').play(); //Play Sound
                                                       }
                                   );

 
             //When the user clicks on the friend request icon
             //Show all requests
             $(document).on('click', '#FB_Friend_SVG',
                                            function()
                                            {
                                                //Since we clicked on it, our UNREAD friend requests is now zero so hide it
                                                $('#FB_Friend_SVG p').hide();
                            
                                                //If friend reqs not shown, display them
                                                if(  $('#FriendReqsPreviewBox').length == 0 )
                                                {

                                                    $.ajax({
                                                           type: 'GET',
                                                           url: "/GetFriendRequests",
                                                           dataType: 'JSON',
                                                           //Receives all the friend requests
                                                           success: function (response)
                                                           {
                                                                //console.log(response);
                                                           
                                                               //Only process if any friend requests exist
                                                               if(response.length > 0)
                                                               {
                                                               
                                                               //The box that contains all friend requests
                                                               var $FriendReqsPreviewBox = $('<section>',
                                                                                                         {
                                                                                                           id: 'FriendReqsPreviewBox'
                                                                                                         }
                                                                                             );
                                     
                                                               //Append $FriendReqsPreviewBox under the friend icon
                                                                $FriendReqsPreviewBox.insertAfter('#FB_Friend_SVG');
                                                           
                                                               //The <ul> inside which we will place the friend requests
                                                               var $FriendReqUL = $('<ul>',
                                                                                            {
                                                                                              id: 'FriendReqUL'
                                                                                            }
                                                                                    );
                                                               
                                                               //UL contains all the friend requests
                                                               $FriendReqsPreviewBox.append($FriendReqUL);
                                                               
                                                               
                                                               //Loop over all the friend requests
                                                               $.each(response,
                                                                          function(index, item)
                                                                          {
                                                                          
                                                                          var $Request = $('<div>',
                                                                                                {
                                                                                                  class: 'friendreq'
                                                                                                }
                                                                                           );
                                                                          
                                                                          var $Name = $('<div>',
                                                                                                {
                                                                                                //Make the first letter of each word capitalized
                                                                                                text: item.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}),
                                                                                                class: 'FriendReqName'
                                                                                                }
                                                                                        );
                                                                          
                                                                          var $Image = $('<img>',
                                                                                                 {
                                                                                                  src: item.url,
                                                                                                  width: '20px',
                                                                                                  height: '20px',
                                                                                                  class:  'FriendReqImage'
                                                                                                 }
                                                                                         );
                                                                      
                                                                          var $DivAccept_Reject = $('<div>',
                                                                                                           {
                                                                                                            class: 'Accept_Reject_icons'
                                                                                                           }
                                                                                                    );
                                                                      
                                                                      
                                                                          //icon to accept the request
                                                                          var $ImageAcceptRequest = $('<img>',
                                                                                                             {
                                                                                                             src: './assets/images/approvefriend.svg',
                                                                                                             width: '13px',
                                                                                                             height: '13px',
                                                                                                             class:  'AcceptFriendReq'
                                                                                                             }
                                                                                                    );
                                                                      
                                                                          //icon to reject the request
                                                                          var $ImageRejectRequest = $('<img>',
                                                                                                              {
                                                                                                              src: './assets/images/rejectfriend.svg',
                                                                                                              width: '13px',
                                                                                                              height: '13px',
                                                                                                              class:  'RejectFriendReq'
                                                                                                              }
                                                                                                    );
                                                                      
                                                                          $DivAccept_Reject.append($ImageAcceptRequest);
                                                                          $DivAccept_Reject.append($ImageRejectRequest);
                                                                      
                                                                          //Attach a hidden input to user ID
                                                                          //So that upon click, we can go to his profile
                                                                          var $UserID = $('<input>',
                                                                                                  {
                                                                                                    type: 'hidden',
                                                                                                    name: 'FriendRequestUserID',
                                                                                                    value: item.userid
                                                                                                  }
                                                                                          );
                                                                      
                                                                      
                                                                          $Request.append($Image);  //Append the Image
                                                                          $Request.append($Name);   //Append the name
                                                                          $Request.append($DivAccept_Reject);  //Append the accept and reject icons
                                                                          $Request.append($UserID);   //Append the friend id
                                                                          
                                                                          $FriendReqUL.append($Request);   //Append the Request to the list
                                                                          
                                                                          
                                                                          }
                                                                      
                                                                      );
                                                                    }
                                                          
                                                           }
                                                           }); //End of AJAX
                                            
                                                }
                            
                                                //Friend reqs are being displayed, toggle it
                                                else $('#FriendReqsPreviewBox').remove();
                            
                                            }
                            
                            );
             
             //Clicks one of the users in the Friend Request Preview Box
             $(document).on('click', '#FriendReqsPreviewBox .friendreq .FriendReqName',
                                                    function()
                                                    {
                                                        //Remove the displayed FriendReqsPreviewBox
                                                        $('#FriendReqsPreviewBox').remove();
                            
                                                        //Store the clicked friend's ID in a cookie to be accessed by Profile_OthersView.js
                                                        $.cookie("FriendIDClicked", $(this).siblings('input').val());
                                                        
                                                        //Go to his profile page
                                                        window.location.replace("/Profile_OthersView.html");
                                                    }
                            );
 
             //User Accepts Friend Request
             $(document).on('click', '.AcceptFriendReq ',
                                                    function()
                                                    {
                            
                                                        var friendidAccepting= $(this).parent().siblings('input').val();
                            
                                                        //The only friend request we have left
                                                        if($(this).parent().parent().siblings().length == 0)  $('#FriendReqsPreviewBox').remove();
                                                        
                                                        //Just Remove the friend request, we accepted
                                                        else  $(this).parent().parent().remove();
                            
                                                        //Tell the server the id of the user we accepted as a friend
                                                        $.ajax({
                                                                type: 'POST',
                                                                url: "/FriendAccepted",
                                                                data: { "friendidaccepted": friendidAccepting },
                                                                dataType: 'text',
                                                                //Receives the path of the user's profile picture in the server
                                                                success: function (response)
                                                                {
                                                               
                                                                }
                                                               }); //End of AJAX
 
                                                    }
                            );
 
             //User Rejects Friend Request
             $(document).on('click', '.RejectFriendReq ',
                                                    function()
                                                    {
                            
                                                    var friendidRejecting= $(this).parent().siblings('input').val();
                            
                                                    //The only friend request we have left
                                                    if($(this).parent().parent().siblings().length == 0)  $('#FriendReqsPreviewBox').remove();
                            
                                                    //Just Remove the friend request, we rejected it
                                                    else  $(this).parent().parent().remove();
                            
                                                    
                                                    //Tell the server the id of the user we rejected as a friend
                                                    $.ajax({
                                                           type: 'POST',
                                                           url: "/FriendRejected",
                                                           data: { "friendidrejected": friendidRejecting },
                                                           dataType: 'text',
                                                           //Receives the path of the user's profile picture in the server
                                                           success: function (response)
                                                           {
                                                           }
                                                           }); //End of AJAX
                                                    }
                            );

 
 
 
 
             //Get the window height for the chat box
             $Window_Height = $(window).height();
             $Window_Width = $(window).width();
             
             
             //Update window_height and the chat box if browser is resized
             $(window).resize
             (
                  function()
                  {
                      //Update Window_Height and Window_Width
                      $Window_Height = $(window).height();
                      $Window_Width = $(window).width();
              
                      //If the chatbox exists, reposition it when window is resized
                      if( $('#ChatBox').length > 0 )
                      {
                          $('#ChatBox').css('top', $Window_Height -  $('#ChatBox').height() );
                          $('#ChatBox').css('left',  $Window_Width - ( $('#ChatBox').width() + ( 0.03 * $Window_Width ) ) );
                          
                          $('#ChatBoxForm').css('top', $Window_Height -  $('#ChatBoxForm').height() );
                      
                      }
                  }
              );

 
 
             //When the user presses the "X" button on the chat, close it
             $(document).on('click', '#ChatBoxClose',
                            
                                                    function()
                                                    {
                                                    //Remove the ChatBox from the page and all the contents inside it
                                                    $('#ChatBox').remove();
                                                    }
                            );

 
 
             //When the user clicks "Message", make a ChatBox pop up at the bottom of the screen like facebook
             $(document).on('click', '#MessageUser',
                            
                                function()
                                {
                            
                                    //If we clicked on MessageUser, then we have to be on their profile page so we have their id and name
                                    var UserChattingToName = $('#Profile_UserName').text();
                                    var UserChattingToID = $.cookie("FriendIDClicked");
                            
                                    //If a ChatBox exists, don't make a new one
                                    if( $('#ChatBox').length == 0 )
                                    {
                            
                                        //Make an AJAX call to get message history with this user (if any)
                                        $.ajax({
                                               type: 'GET',
                                               url: "/GetMessageHistoryWithUser",
                                               dataType: 'text',
                                               //Receives the message history with the user
                                               success: function (response)
                                               {
                                                   //Pass the user's name, their id, and the message history to make a chatbox
                                                   //Convert JSON to JS object
                                                   CreateChatBox(UserChattingToName,UserChattingToID, JSON.parse(response));
                                               }
                                               }); //End of AJAX
                            
                                    }
                                }

                            );
 
 
 
 
 
 
 
                            //toggle dropdown menu!
                                //Make an AJAX call to get message history with this user (if any)
//                                $.ajax({
//                                       type: 'GET',
//                                       url: "/ListPplMessage",
//                                       dataType: 'text',
//                                       //Receives the message history with the user
//                                       success: function (response)
//                                       {
//                                       //Pass the user's name, their id, and the message history to make a chatbox
//                                       //Convert JSON to JS object
//                                       CreateChatBox(UserChattingToName,UserChattingToID, JSON.parse(response));
//                                       }
//                                       }); //End of AJAX
 
                                //make an ajax call and get a list of all pople i messaged with and the last message sent, use group by message time, max(), in the same ajax server side, clear all unread messaes notifications
                            //to zero cuz we just opened and read them all
                                //Then using this info make a dropdown menu
                                //if click on any of them, first check if a chatbox is already open, maybe withs omeone else, if yes, then remove that chatbox and create new one
                                //make another ajax call to get get complete message history like the $(document)mcode above, then create a chatbox like above paragraph as well, everything else is the same
                            //after that its gna be the same function as $(document).on click "MEssageUser"
                                //When click on the messages icon, toggle the dropdwn menu like i did for friendSVG icon,
                                //also once the dropdown is there, image if i already opened a chat with someone else and i am chatting with them, do an
                            //If a ChatBox exists, don't make a new one
//                            if( $('#ChatBox').length == 0 )
//                            {
                            //if a chatbox is already open, then remove that chatbox, and then create a chatbox for the new person i requested
 //Change the "GetMessageHistoryWithUser" in the server, for "Message button", the friendid was always in the cookie CUZ we always intitated the message button when on their page, but in this case, the friendid is NOT in the cookie, so we have to manually pass it to server
 //so inorder to keep on fucntion on server side only, change that function to and the above client side function to manually send the friendid to the server (the id of hte person we are chatting to)
//Make displayed list scrollable! not not like friend lists of user unlimited
 //ACtually make the search user one scrollable as well, FROM NOWWWW NOT LATER!
               
 
             //User clicks on the "FB_Message_SVG" in the status bar
             //Show list of all people they chatted to (like FB)
             $(document).on('click', '#FB_Message_SVG',
                            function()
                            {
                            
                                //Since we clicked on it, our UNREAD message requests is now zero so hide it
//                                $('#FB_Message_SVG p').hide();
                            
                                //If list of people messaged not shown, display them
                                if(  $('#ListpplMessagedPreviewBox').length == 0 )
                                {
                                
                            $.ajax({
                                   type: 'GET',
                                   url: "/GetListPplMessaged",
                                   dataType: 'JSON',
                                   //Receives all the friend requests
                                   success: function (response)
                                   {
                                       //console.log(response);
                                       
                                       //Only process if we have any message list (ie. we messaged people before)
//                                       if(response.length > 0)
//                                       {
//                                       
//                                       //The box that contains all the people messaged
//                                       var $ListpplMessagedPreviewBox = $('<section>',
//                                                                     {
//                                                                     id: 'ListpplMessagedPreviewBox'
//                                                                     }
//                                                                     );
//                                       
//                                       //Append $FriendReqsPreviewBox under the friend icon
//                                       $FriendReqsPreviewBox.insertAfter('#FB_Friend_SVG');
//                                       
//                                       //The <ul> inside which we will place the friend requests
//                                       var $FriendReqUL = $('<ul>',
//                                                            {
//                                                            id: 'FriendReqUL'
//                                                            }
//                                                            );
//                                       
//                                       //UL contains all the friend requests
//                                       $FriendReqsPreviewBox.append($FriendReqUL);
//                                       
//                                       
//                                       //Loop over all the friend requests
//                                       $.each(response,
//                                              function(index, item)
//                                              {
//                                              
//                                              var $Request = $('<div>',
//                                                               {
//                                                               class: 'friendreq'
//                                                               }
//                                                               );
//                                              
//                                              var $Name = $('<div>',
//                                                            {
//                                                            //Make the first letter of each word capitalized
//                                                            text: item.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}),
//                                                            class: 'FriendReqName'
//                                                            }
//                                                            );
//                                              
//                                              var $Image = $('<img>',
//                                                             {
//                                                             src: item.url,
//                                                             width: '20px',
//                                                             height: '20px',
//                                                             class:  'FriendReqImage'
//                                                             }
//                                                             );
//                                              
//                                              var $DivAccept_Reject = $('<div>',
//                                                                        {
//                                                                        class: 'Accept_Reject_icons'
//                                                                        }
//                                                                        );
//                                              
//                                              
//                                              //icon to accept the request
//                                              var $ImageAcceptRequest = $('<img>',
//                                                                          {
//                                                                          src: './assets/images/approvefriend.svg',
//                                                                          width: '13px',
//                                                                          height: '13px',
//                                                                          class:  'AcceptFriendReq'
//                                                                          }
//                                                                          );
//                                              
//                                              //icon to reject the request
//                                              var $ImageRejectRequest = $('<img>',
//                                                                          {
//                                                                          src: './assets/images/rejectfriend.svg',
//                                                                          width: '13px',
//                                                                          height: '13px',
//                                                                          class:  'RejectFriendReq'
//                                                                          }
//                                                                          );
//                                              
//                                              $DivAccept_Reject.append($ImageAcceptRequest);
//                                              $DivAccept_Reject.append($ImageRejectRequest);
//                                              
//                                              //Attach a hidden input to user ID
//                                              //So that upon click, we can go to his profile
//                                              var $UserID = $('<input>',
//                                                              {
//                                                              type: 'hidden',
//                                                              name: 'FriendRequestUserID',
//                                                              value: item.userid
//                                                              }
//                                                              );
//                                              
//                                              
//                                              $Request.append($Image);  //Append the Image
//                                              $Request.append($Name);   //Append the name
//                                              $Request.append($DivAccept_Reject);  //Append the accept and reject icons
//                                              $Request.append($UserID);   //Append the friend id
//                                              
//                                              $FriendReqUL.append($Request);   //Append the Request to the list
//                                              
//                                              
//                                              }
//                                              
//                                              );
//                                       }
                                   
                                       }
                                       }); //End of AJAX
                                
                                }
                                
                                //list of people messaged is being displayed, toggle it
                                else $('#ListpplMessagedPreviewBox').remove();
                            
                            }
                            
                            );
 
 
 
             //Pressing enter sends the message
             $(window).keydown(
                                  function(event)
                                  {
                                    if(event.which==13 && $(event.target).is("textarea#ChatBoxMessage"))
                                    {
                                        event.preventDefault();
                                        var TypedMessage = $("#ChatBoxMessage").val();
                                        var chattingTo = $('#ChatBoxForm input[name="IDChattingTo"]').val(); //Don't use the cookie for friendid
                               
                                        //Append our message to the end of our chatbox
                                       var  $p = $('<p>',
                                                       {
                                                        text: TypedMessage,
                                                        class: 'ChatContentDatas'
                                                       }
                                                   );
                               
                                       //Its a message sent by us
                                       $p.addClass('MessageByMe');
                               
                                       $('#ChatBox #ChatContent').append($p);
                               
                                       //Calculate the height of the chatbox to scroll down automatically
                                       var HeightofChat = 0;
                                       $("#ChatBox #ChatContent").children().each(function(){HeightofChat = HeightofChat + $(this).outerHeight(true);})
                                       $("#ChatBox #ChatContent").animate({ scrollTop: HeightofChat }, "slow"); //scroll to the last message
                               
                               
                                        $("#ChatBoxMessage").val(""); //Clear #ChatBoxMessage after sending
                                       //Send our userid, the friendid (person we are chatting to), and the message to the server
                                       //using websockets
                                       One2OneMessageSocket.emit('/SendingMessage', {userid:  $.cookie("UserID"), chattingToid: chattingTo, chatmessage: TypedMessage });
                               
                                    }
                                  }
                             );
 

 
 
             //This user is only listening to ReceiveMessages concerning his userid in the "One2OneMessageSocket" socket
             //Only received messages directed towards him
             One2OneMessageSocket.on('ReceiveMessages' + $.cookie("UserID") ,
                                   
                                                               function(msg)
                                                               {
   
                                                                    //Received a message from somebody (that person's id is stored in msg.fromuserid)

                                                                    //Check if we currently have our chatbox open
                                                                    if(  $('#ChatBox').length > 0 )
                                                                    {
                                                                        //Our chatbox is open
                                     
                                                                        //Check if we are chatting with the user who sent us the message or with someone else
                                                                        if( $('#ChatBoxForm input[name="IDChattingTo"]').val() == msg.fromuserid )
                                                                         {
                                                                            //We are chatting with this person in real-time
                                                                            //Append the received message to the end of our convo
                                                                             var  $p = $('<p>',
                                                                                             {
                                                                                             text: msg.chatmessage,
                                                                                             class: 'ChatContentDatas'
                                                                                             }
                                                                                         );
                                     
                                                                             //Its not a message sent by us
                                                                             $p.addClass('MessageNotByMe');
                                     
                                                                             $('#ChatBox #ChatContent').append($p);
                                     
                                                                             //Calculate the height of the chatbox to scroll down automatically
                                                                             var HeightofChat = 0;
                                                                             $("#ChatBox #ChatContent").children().each(function(){HeightofChat = HeightofChat + $(this).outerHeight(true);})
                                                                             $("#ChatBox #ChatContent").animate({ scrollTop: HeightofChat }, "slow"); //scroll to the last message
                                     
                                     
                                                                             //Send our userid to the server to update UnreadNotifications, we read the received message
                                                                             //using One2OneMessageSocket websockets
                                                                             One2OneMessageSocket.emit('/ReadMessage', {userid:  $.cookie("UserID") });
                                     
            
                                                                         }
                                     
                                                                        //We are chatting with someone one
                                                                        //Only play a notification
                                                                        else
                                                                        {
                                                                             $('#FB_Message_SVG p').show();
                                                                             $('#FB_Message_SVG p').text( msg.nummessages );
                                                                             document.getElementById('NotificationSound').play(); //Play Sound
                                                                        }
                                                                    }
                                     
                                                                    //Our chatbox is not currently open
                                                                    //Make a notification
                                                                    else
                                                                    {
                                                                         $('#FB_Message_SVG p').show();
                                                                         $('#FB_Message_SVG p').text( msg.nummessages );
                                                                         document.getElementById('NotificationSound').play(); //Play Sound
                                                                    }
                                     
                                                               }
                                    );

 
 
 
    } //End of $(document).ready function

);



function CreateChatBox( NameChattingTo, IDChattingTo, MessageHistory )
{
    
        $Window_Height = $(window).height();
        $Window_Width = $(window).width();
    
    
        //Create a dynamic div for the chatbox header
        var $ChatBoxHeader = $('<div>',
                                       {
                                        id: 'ChatBoxHeader'
                                       }
                               );
        
        //Name of the user we want to message to
        var $UserName =  $('<p>',
                               {
                                text: NameChattingTo,
                                class: 'ChatBoxUserName'
                               }
                           );
        
        //"X" svg to close the chat
        var $CloseChat = $('<img>',
                                   {
                                    src: './assets/images/Close_Message.svg',
                                    width: '12px',
                                    id: 'ChatBoxClose'
                                   }
                           );
        
        
        //Append the $UserName and $CloseChat to the $ChatBoxHeader
        $ChatBoxHeader.append($UserName);
        $ChatBoxHeader.append($CloseChat);
        
        
        //Create a new div for the chat box
        //Chatbox is global now
        var  $ChatBox = $('<section>',
                                      {
                                       id: 'ChatBox'
                                      }
                         );
        
        //Append the $ChatBox to the page first
        $('body').append($ChatBox);
        
        
        //$ChatBox should be fixed on the bottom of the page
        //Position should be "Height of window" - "Height of chatbox"
        $ChatBox.css('top', $Window_Height - $ChatBox.height() );
        $ChatBox.css('left',  $Window_Width - ( $('#ChatBox').width() + ( 0.03 * $Window_Width ) ) );
        
        
        $ChatBox.append($ChatBoxHeader);
        
    
        
        var  $ChatContent = $('<div>',
                                      {
                                       id: 'ChatContent'
                                      }
                              );
        
        
        //Add an initial <br/> to prevent overlapping of chatheader and chatcontent
        $ChatContent.append(
                            $('<br/>', {})
                            );
    
    
    
        //Get Message Data from the web server, and append list of previous messages with the user
        $.each(MessageHistory,
                   function(index, item)
                   {
                   
                       //Message was sent by me
                       if(item.sentById == $.cookie("UserID"))
                       {
                           var  $p = $('<p>',
                                           {
                                            text: item.chatmessage,
                                            class: 'ChatContentDatas'
                                           }
                                       );
                           
                           //Add a class so it floats to the left
                           $p.addClass('MessageByMe');
                           
                           $ChatContent.append($p);
                       }
                       
                       //Message was sent by other user
                       else
                       {
                           var  $p = $('<p>',
                                           {
                                            text: item.chatmessage,
                                            class: 'ChatContentDatas'
                                           }
                                       );
                           
                           //Add a class so it floats to the right
                           $p.addClass('MessageNotByMe');
                           
                           $ChatContent.append($p);
                       }
                   
                   }
               );

    
    
        //Append $ChatContent to the $ChatBox
        $ChatBox.append($ChatContent);
    
    
        //Create a form input for the user to be able to type
        var $ChatBoxForm = $('<form>',
                                     {
                                     id: 'ChatBoxForm'
                                     }
                             );
    
    
        //Create a textarea element
        var $ChatBoxFormTextarea = $('<textarea>',
                                                 {
                                                     placeholder: 'Type a message...',
                                                     width:  $ChatBox.width() - 5,   //Width of the chatbox -3px
                                                     id: 'ChatBoxMessage'
                                                 }
                                     );
    
        //Attach a hidden input, ID of the person we are chatting to
        var $ChattingToID = $('<input>',
                                        {
                                         type: 'hidden',
                                         name: 'IDChattingTo',
                                         value: IDChattingTo
                                        }
                              );
    
        //Append the textarea to the form
        $ChatBoxForm.append($ChatBoxFormTextarea);
    
        //Append a hidden input of the id of the user we are chatting to
        $ChatBoxForm.append($ChattingToID);
    
        //Append the form to the ChatBox
        $ChatBox.append($ChatBoxForm);
    
        //position the form at the bottom of the ChatBox
        $ChatBoxForm.css('top', $Window_Height -  $ChatBoxForm.height() );
    
        //Calculate the height of the chatbox to scroll down automatically
        var HeightofChat = 0;
        $("#ChatBox #ChatContent").children().each(function(){HeightofChat = HeightofChat + $(this).outerHeight(true);})
        $("#ChatBox #ChatContent").animate({ scrollTop: HeightofChat }, "slow"); //scroll to the last message

    
}

















