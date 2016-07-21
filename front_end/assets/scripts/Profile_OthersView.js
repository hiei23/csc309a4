//once the document has loaded
$(document).ready
(
    function()
    {
        //Get the logged-in user's basic info when they login: profile pic, name, UnreadNotifications icons
         $.ajax({
                type: 'GET',
                url: "http://localhost:3000/GetLoginUserInfo",  //URL to send to send to the server
                dataType: 'JSON',
                //Receives the path of the user's profile picture in the server
                success: function (response)
                {
                    //console.log(response);
                    
                    //Now display the correct icon notification numbers
                    //If its zero, never display the red icon
                    if(response[0].numfriendreqs == 0)
                    {
                        $('#FB_Friend_SVG p').hide(); //hide it
                    }
                    
                    else
                    {
                        $('#FB_Friend_SVG p').show();
                        $('#FB_Friend_SVG p').text( response[0].numfriendreqs );
                    }
                    
                    
                    if(response[0].nummessages == 0)
                    {
                        $('#FB_Message_SVG p').hide(); //hide it
                    }
                    
                    else
                    {
                        $('#FB_Message_SVG p').show();
                        $('#FB_Message_SVG p').text( response[0].nummessages );
                    }
                    
                    
                    if(response[0].numnotifications == 0)
                    {
                        $('#FB_Notification_SVG p').hide(); //hide it
                    }
                    
                    else
                    {
                        $('#FB_Notification_SVG p').show();
                        $('#FB_Notification_SVG p').text( response[0].numnotifications );
                    }
                    
                }
                }); //End of AJAX
         
 
         //Get the information for the profile being viewed using "FriendIDClicked" cookie:
         //The name and the path of the profile picture in the server
          $.ajax({
                type: 'GET',
                url: "http://localhost:3000/GetDisplayedProfileInfo",
                data: $.cookie("FriendIDClicked"), //Send the ID of the user we want to see
                dataType: 'JSON', //DataType being received
                success: function (response)
                {
                    console.log(response);
                    
                 //Change the src of the profile picture to the profile pic stored on the server
                 $( "#ProfilePic" ).attr('src', response[0].ProfileImage );
                 
                 //Display the user's correct name
                 $( "#Profile_UserName" ).text(response[0].username);
                 
                }
                }); //End of AJAX
 
 
 
         //Clicking on the sign out button, send a request to the server
         $(document).on('click', '#SignOut_Button',
                        
                        function()
                        {
                        
                        $.ajax({
                               type: 'GET',
                               url: "http://localhost:3000/SignOut",  //URL to send to send to the server
                               dataType: 'text',
                               //Receives the path of the user's profile picture in the server
                               success: function (response)
                               {
                                    //Go back to home page
                                    window.location.replace("/");
                               }
                               }); //End of AJAX

                        }
                        );

 
 
 
         //Clicking on the bodynav (About, Friends, Reviews) highlights it and underlines it
         $(document).on('click', '#BodyNav ul li',
                
                                        function()
                                        {
                        
                                            //Clear the background-color and border-bottom for the previously clicked item (if any)
                                            $('.BodyNavClicked').removeClass('BodyNavClicked');
                        
                                            //Add a class to change the background-color and border-bottom
                                            $(this).addClass('BodyNavClicked');
                        
                                        }
                
                
                );
 
 
 
         //When user clicks "Add Friend", change it to friend-requested
         $(document).on('click', '#AddFriend',
                        
                                    function()
                                    {
                                        $('#AddFriend p').text('Friend Requested');
                                    }
                                    
                        
                        );

 
         //Get the window height for the chat box
         $Window_Height = $(window).height();
         $Window_Width = $(window).width();
 
 
        //Update window_height if browser is resized
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
 
        //When the user clicks "Message", make a ChatBox pop up at the bottom of the screen like facebook
        $(document).on('click', '#MessageUser',
            
                                function()
                                {
                       
                                //If a ChatBox exists, don't make a new one
                                if( $('#ChatBox').length == 0 )
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
                                                                text: 'Mesut Ozil',
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
                       
                       
                       
                                    //Get Message Data from the web server, and append list of previous messages with the user
                       
                                    var  $ChatContent = $('<div>',
                                                                   {
                                                                      id: 'ChatContent'
                                                                   }
                                                         );
                       
                       
                                       //Add an initial <br/> to prevent overlapping of chatheader and chatcontent
                                       $ChatContent.append(
                                                             $('<br/>', {})
                                                          );
                       
                       
                                   for(var i=0; i< 50; i++)
                                   {
                                       var  $p = $('<p>',
                                                         {
                                                            text: 'Hey bro! How have you been recently? Havent seen you!',
                                                            class: 'ChatContentDatas'
                                                         }
                                                  );
                                       
                                       $ChatContent.append($p);

                                   }
                       
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
                                                                             width:  $ChatBox.width() - 5   //Width of the chatbox -3px
                                                                        }
                                                             );
                       
                                    //Append the textarea to the form
                                    $ChatBoxForm.append($ChatBoxFormTextarea);
                       
                                    //Append the form to the ChatBox
                                    $ChatBox.append($ChatBoxForm);
                       
                                    //position the form at the bottom of the ChatBox
                                    $ChatBoxForm.css('top', $Window_Height -  $ChatBoxForm.height() );
                       
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
 
 
 
 
 
         //DataForm = [{"url": "./assets/images/PM.jpg","name": "Piers Morgan", "friendid":"2"}];
         //When the user clicks on the "Friends" Tab, show all the Friends of the user
         $(document).on('click', '#UserFriends',
                        
                                                function()
                                                {
                        
                                                    //Remove all other displayed information about "Reviews" (if exists)
                                                    $('#ReviewsofUser').remove();
                                                    //Remove previously shown sporting events (if clicked previously)
                                                    $('#SportingEventReview').remove();
                        
                        
                                                    //Remove all other displayed information about "About" (if exists)
                                                    $('#AboutUser').remove();
                        
                        
                                                    //Remove all other displayed information about "Friends" (if exists)
                                                    //CUZ Referesh List
                                                    $('#FriendsofUser').remove();
                        
                        
                                        //Trigger AJAX and get friends info
                                        $.ajax({
                                               type: 'GET',
                                               url: "http://localhost:3000/GetDisplayedProfileUserFriends",  //URL to send to send to the server
                                               dataType: 'JSON',
                                               success: function (response)
                                               {
                        
                                                    //Create a section for the User's friends' images
                                                    var $FriendsSection = $('<section>',
                                                                                         {
                                                                                            id: 'FriendsofUser'
                                                                                         }
                                                                         );

                                                    //insert $FriendsSection after the #ProfileHeader
                                                    $FriendsSection.insertAfter('#ProfileHeader');
                        
                        
                                                    //Loop over all the Friend Images and append them
                                                    $.each(response,
                                                                            function(index, item)
                                                                           {
                                                           
                                                                                //$Friend has the image and the friend name
                                                                               var $Friend = $('<div>',
                                                                                                        {
                                                                                                          class: 'Friend'
                                                                                                        }
                                                                                                    );
                                                           
                                                                               var $FriendName = $('<p>',
                                                                                                           {
                                                                                                             text:  item.name
                                                                                                           }
                                                                                                  );
                                                           
                                                                               var $FriendImage = $('<img>',
                                                                                                          {
                                                                                                          src: item.url,
                                                                                                          width: '100px',
                                                                                                          height: '100px',
                                                                                                          class:  'FriendImage'
                                                                                                          }
                                                                                                  );
                                                           
                                                                               //Attach a hidden input to the friend (His user ID)
                                                                               //So that upon click, we can send this info to the server
                                                                               var $FriendsID = $('<input>',
                                                                                                          {
                                                                                                            type: 'hidden',
                                                                                                            name: 'FriendID',
                                                                                                            value: item.friendid
                                                                                                           }
                                                                                                  );
                                                           
                                                                                $Friend.append($FriendImage);  //Append the Image
                                                                                $Friend.append($FriendName);   //Append the name
                                                                                $Friend.append($FriendsID);   //Append the hidden friend id
                                                           
                                                                                $FriendsSection.append($Friend);
                                                                           }
                                                          );
                        
                        
                                                        //Show a "See More" button in the end
                                                        var $ShowMoreFriends = $('<p>',
                                                                                {
                                                                                  text: 'Show more',
                                                                                  id: 'MoreFriendsButton'
                                                                                }
                                                                        );
                        
                                                        //Append the button
                                                        $FriendsSection.append($ShowMoreFriends);
                                                   
                                               }
                                               }); //End of AJAX
                        
                        
                                                }
                        
                        
                        );
 
             //When a user clicks on any of his friends, take them to their profile
             $(document).on('click', '.Friend ',
                                                function()
                                                {
                                            //Only display that user's profile if it isn't yourself
                                            if( $(this).children('input').val() !=  $.cookie("UserID") )
                                            {
                                                    //Store the clicked friend's ID in a cookie to be accessed by Profile_OthersView.js
                                                    $.cookie("FriendIDClicked", $(this).children('input').val());
                                                    
                                                    //Go back to your friend's page
                                                    window.location.replace("/Profile_OthersView.html");
                                            }
                                                }
                            );
 
 
 
         //Create a temporary variable to store all the sports available in TSports
         //This will eventually come from the database
         var Sports = [
                          {
                             "EventName" : "cycling",
                             "url": "./assets/images/cycling.svg"
                          },
                          
                          {
                             "EventName" : "football",
                             "url": "./assets/images/football.svg"
                          },
                       
                           {
                               "EventName" : "squash",
                               "url": "./assets/images/squash.svg"
                           },
                           
                           {
                               "EventName" : "basketball",
                               "url": "./assets/images/basketball.svg"
                           },
                           
                           {
                               "EventName" : "boxing",
                               "url": "./assets/images/boxing.svg"
                           },
                       
                       {
                       "EventName" : "tennis",
                       "url": "./assets/images/tennis.svg"
                       },
                       
                       {
                       "EventName" : "volleyball",
                       "url": "./assets/images/volleyball.svg"
                       },
                       
                       {
                       "EventName" : "waterpolo",
                       "url": "./assets/images/waterpolo.svg"
                       },
                       
                       {
                       "EventName" : "tabletennis",
                       "url": "./assets/images/tabletennis.svg"
                       },
                       
                       {
                       "EventName" : "taekwondo",
                       "url": "./assets/images/taekwondo.svg"
                       },
               
                    ];
 
 
             //When the user clicks on the "UserReviews" Tab, show all the reviews/ratings/comments of the user in different sports
             $(document).on('click', '#UserReviews',
                            
                                                    function()
                                                    {
                            
                                                        //Remove all other displayed information about "Friends" (if exists)
                                                        $('#FriendsofUser').remove();
                            
                                                        //Remove all other displayed information about "About" (if exists)
                                                        $('#AboutUser').remove();
                            
                            
                                                        
                                                        //Only run function if Reviews information is not displayed
                                                        if( $('#ReviewsofUser').length == 0 )
                                                        {
                                                        
                            
                                                            //Create a section to show the sports the user has been rated in
                                                            var $ReviewsSection = $('<section>',
                                                                                                {
                                                                                                  id: 'ReviewsofUser'
                                                                                                }
                                                                                    );
                            
                                                            //Create element for Sports the user has played
                                                            var $SportsPlayed = $('<ul>',
                                                                                   {
                                                                                     id: 'SportsPlayed'
                                                                                   }
                                                                           );
                            
                                                            //insert the <ul> SportsPlayed to the $ReviewsSection
                                                            $ReviewsSection.append($SportsPlayed);
                            
                                                            //insert $ReviewsSection after the #ProfileHeader
                                                            $ReviewsSection.insertAfter('#ProfileHeader');
                            
                            
                                                            //Loop over all the sporting events (that this user HAS ATTENDED/played) and append them
                                                            $.each(Sports,
                                                                           function(index, item)
                                                                           {
                                                                           
                                                                               //$Friend has the image and the friend name
                                                                               var $sport = $('<li>',
                                                                                                       {
                                                                                                         class: 'SportingEvent'
                                                                                                       }
                                                                                               );
                                                                   
                                                                               //$Friend has the image and the friend name
                                                                               var $sportImage = $('<img>',
                                                                                                          {
                                                                                                              src: item.url,
                                                                                                              width: '30px'
                                                                                                          }
                                                                                              );
                                                                   
                                                                               $sport.append($sportImage);  //Append the sportImage to the <li>
                                                                   
                                                                               $SportsPlayed.append($sport);  //Append the SportingEvent to the <ul>

                                                                           }
                                                                   );
                            
                                                        }
                            
                                                    }
                            
                            
                            );
 
 
 
         //Comments left by other users, for the sporting event which they attended together
         var Comments = [
                           {
                            "Date" : "Jan 1, 2016",
                           "Comment": "Awesome Person. Never Gives up in soccer!"
                           },
                           
                           {
                             "Date" : "Feb 4, 2016",
                             "Comment": "We were down 3-1! This guy came in from the sub and scored 3 goals! We won 4-3!"
                           },
                         
                            {
                             "Date" : "June 5, 2016",
                             "Comment": "Ran 10K in a 90 min match :O That's how much professional soccer players run!"
                            },
                         
                            {
                             "Date" : "July 6, 2016",
                             "Comment": "Good runner with lots of stamina. Hardcore defensive person but he scored 2 own-goals! :)"
                            }
                         
                        ];
 
 
 
 
 
             //When the user clicks on a SportingEvent, show all the reviews/ratings/comments of the user in that specific sport
             $(document).on('click', '.SportingEvent',
                            
                                                function()
                                                {
                                                   //Remove previously shown sporting events (if clicked previously)
                                                    $('#SportingEventReview').remove();
                            
                                                   //First highlight and underline the selected sporting event
                            
                                                   //Clear the background-color and border-bottom for the previously clicked item (if any)
                                                   $('.SportingEventClicked').removeClass('SportingEventClicked');
                                                   
                                                   //Add a class to change the background-color and border-bottom
                                                   $(this).addClass('SportingEventClicked');
                            
                            
                            
                            
                                                    //Create a section
                                                    var $SportingEventReview = $('<section>',
                                                                                            {
                                                                                              id: 'SportingEventReview'
                                                                                            }
                                                                                 );
                            
                                                    //Insert this specific sporting event review after the section #ReviewsofUser
                                                    $SportingEventReview.insertAfter('#ReviewsofUser');
                            
                            
                            
                            
                                                    var $StarRatings = $('<div>',
                                                                                 {
                                                                                    id: 'StarRatings'
                                                                                 }
                                                                         );
                            
                            
                                                    //Append it to the #SportingEventReview Section
                                                    $SportingEventReview.append($StarRatings);
                            
                                                    //Display the number of stars this user received for this event, based on other user's ratings
                                                    //Lets say he got 4 stars / out of 5
                                                    for(var i=0; i < 4; i++)
                                                    {
                            
                                                       //Create a star SVG four times
                                                       var $star = $('<img>',
                                                                                   {
                                                                                       src: './assets/images/rating_star.svg',
                                                                                       width: '15px'
                                                                                   }
                                                                           );
                            
                                                        //Append it to StarRatings
                                                        $StarRatings.append($star);
                                                    }
                            
                            
                                                    //Comments
                                                    var $Comments = $('<div>',
                                                                             {
                                                                                id: 'Comments'
                                                                             }
                                                                     );
                            
                            
                                                    //<ul> to add <li> comments
                                                    var $CommentsUL = $('<ul>',
                                                                              {
                                                                        
                                                                              }
                                                                       );
                            
                                                    //Append the comments to the page
                                                    $SportingEventReview.append($Comments);
                            
                                                    $Comments.append($CommentsUL);
                            
                            
                                                    //Add the comments left by other users for this specific sport to the page
                                                    //Loop over all the comments
                                                    $.each(Comments,
                                                                   function(index, item)
                                                                   {

                                                                       //$comment is each individual comment
                                                                       var $comment = $('<li>',
                                                                                              {
                                                                                               class: 'Individual_Comment'
                                                                                              }
                                                                                      );
                                                           
                                                           

                                                                       //The Time of the comment
                                                                       var $commentTime = $('<p>',
                                                                                                   {
                                                                                                    text: item.Date,
                                                                                                    class: 'commentTime'
                                                                                                   }
                                                                                           );
                                                           
                                                                       //The Content of the comment
                                                                       var $commentContent = $('<p>',
                                                                                                   {
                                                                                                   text: item.Comment,
                                                                                                   class: 'commentContent'
                                                                                                   }
                                                                                           );

                                                           
                                                           
                                                           
                                                                       $comment.append($commentTime);  //Append the time to the <li>
                                                                       $comment.append($commentContent);  //Append the content to the <li>
                                                           
                                               
                                                                        //Append the <li> comment to the <ul>
                                                                       $CommentsUL.append($comment);
                                                           
                                                                   }
                                                         );
                            
                                                }
                            
                            
                            );

 
 
                 /***************************************************Paul******************************************************/
                 var sport_list = ["cycling", "waterpolo", "squash", "boxing", "taekwondo", "basketball",
                                   "tabletennis", "tennis", "volleyball",
                                   "football", "swimming"];
                 
                 var response = [
                                 {
                                 "Campus": "St.George",
                                 "Given_Name": "Parham",
                                 "Family_Name": "Oghabi",
                                 "Phone_number": "(647)123-9999",
                                 "Email_Address": "parham@hotmail.com",
                                 "Birthday": "January 1, 1994",
                                 "Height": "180",
                                 "Weight": "72",
                                 "Gender": "Male",
                                 "About_Me": "",
                                 "SportsInterested": ["cycling", "squash", "basketball"]
                                 }
                                 ];
                 
                 var about_order = ["Campus", "Given_Name", "Family_Name", "Phone_number", "Email_Address",
                                    "Birthday", "Height", "Weight", "Gender", "About_Me", "Sports"];
                 
                 
                 //When the user clicks on the "About" Tab, show all info about the user
                 $(document).on('click', '#UserAbout', DisplayUserInfo);
                 
                 function DisplayUserInfo()
                 {
                     //Remove all other displayed information about "Friends" (if exists)
                     $('#FriendsofUser').remove();
                     
                     //Remove all other displayed information about "Reviews" (if exists)
                     $('#ReviewsofUser').remove();
                     $('#SportingEventReview').remove();
                     
                     //Remove all other displayed information about "Upcoming Events" (if exists)
                     $('#EventsofUser').remove();
                     //Remove all info about the selected event
                     $('#SelectedEvent').remove();
                     
                     //Remove all other displayed information about "Searching Events" (if exists)
                     $('#SearchEventSection').remove();
                     
                     //Remove all other displayed information about "Creating Events" (if exists)
                     $('#CreateEventSection').remove();
                     //Remove the datepicker
                     $('.xdsoft_datetimepicker').remove();
                     //unwrap div with the class for blurring the background from #ProfileHeader
                     $('#ProfileHeader').unwrap();
                     
                     //Remove all other displayed information about "About" (if exists)
                     //Refresh, get new data from the server
                     $('#AboutUser').remove();
                     
                     
                     $('#EventSuccessful').hide();
                     
                     
                     
                     //Get info about the user from the server
                     //             $.ajax({
                     //                    type: 'GET',
                     //                    url: "http://localhost:3000/GetUserAboutInfo",  //URL to send to send to the server
                     //                    dataType: 'JSON',
                     //                    //Receives the path of the user's profile picture in the server
                     //                    success: function (response)
                     //                    {
                                             //Create a section to info about the user
                                             var $AboutSection = $('<section>',
                                                                               {
                                                                                 id: 'AboutUser'  //Please don't change this ID
                                                                               }
                                                                   );
                                             
                                             //insert $AboutSection after the #ProfileHeader
                                             $AboutSection.insertAfter('#ProfileHeader');
                                             
                                             
                                             
                                             
                                             //                        console.log(response[0].Campus);  //Gives St.George
                                             //                        console.log(response[0].Height);  //Gives 180
                                             //
                                             //                        var SportsInterested = response[0].SportsInterested;  //SportsInterested is an array
                                             //
                                             //                        for(var i=0; i<SportsInterested.length; i++)
                                             //                        console.log(SportsInterested[i]) //Prints cycling , squash, basketball
                                             
                                             
                                             //Paul ADD CODE HERE
 
                     
                     
                     //                    }
                     //                    }); //End of AJAX
                 
                 
                 
                 
                 
                 }
 
 
 
 
 
 //Your Code should end here
 /***************************************************Paul******************************************************/
 
 
 
 
 
 
    } //End of $(document).ready function




);


























