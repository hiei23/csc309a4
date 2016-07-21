//once the document has loaded
$(document).ready
(
    function()
    {
 
<<<<<<< HEAD
         //Get the user's basic info when they login: profile pic, name, UnreadNotifications icons
         $.ajax({
                type: 'GET',
                url: "http://localhost:3000/GetLoginUserInfo",  //URL to send to send to the server
                dataType: 'JSON',
                //Receives the path of the user's profile picture in the server
                success: function (response)
                {
                    //console.log(response);
                
                    //Change the src of the profile picture to the profile pic stored on the server
                    $( "#ProfilePic" ).attr('src', response[0].ProfileImage );
                
                    //Display the user's correct name
                    $( "#Profile_UserName" ).text(response[0].username);
                
                
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
 
 
            //If we got re-directed here after successfuly creating an event
            //Check if the URL is /Profile_SelfView.html?EventSuccess=yes
            if (window.location.href.indexOf("?EventSuccess=yes") > -1)
            {
                //Show the approved calendar
                $('#EventSuccessful').show();
            }
     
            else
            {
                //Hide it
                $('#EventSuccessful').hide();
            }

 
 
 
 
 
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
 
 
         //User can upload file without using submit button
         $('#file-input').change(function()
                                 {
                                    $('#UploadProfilePic').submit();
                                 }
                                );
 

=======
 
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
 
         //Clicking on the bodynav (About, Friends, Reviews) highlights it and underlines it
         $(document).on('click', '#BodyNav ul li',
                
                                        function()
                                        {
<<<<<<< HEAD
=======
                        
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                            //Clear the background-color and border-bottom for the previously clicked item (if any)
                                            $('.BodyNavClicked').removeClass('BodyNavClicked');
                        
                                            //Add a class to change the background-color and border-bottom
                                            $(this).addClass('BodyNavClicked');
                        
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
 
        //Now When the user clicks on the "FB_Message_SVG" on the top right corner
        //make a ChatBox pop up at the bottom of the screen like facebook
        $(document).on('click', '#FB_Message_SVG',
            
                                function()
                                {
                       
//                               //Remove all other displayed information about "Creating Events" (if exists)
//                               $('#CreateEventSection').remove();
//                               //unwrap div with the class for blurring the background from #ProfileHeader
//                               $('#ProfileHeader').unwrap();
                       
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
                                                                text: 'Manuel Neur',
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
                       
                       
                                    $ChatBox.append($ChatBoxHeader);
                       
                                   //$ChatBox should be fixed on the bottom of the page
                                   //Position should be "Height of window" - "Height of chatbox"
                                   $ChatBox.css('top', $Window_Height - $ChatBox.height() );
                                   $ChatBox.css('left',  $Window_Width - ( $('#ChatBox').width() + ( 0.03 * $Window_Width ) ) );
                                   
                       
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
 
 
 
<<<<<<< HEAD
         //DataForm = [{"url": "./assets/images/PM.jpg","name": "Piers Morgan", "friendid":"2"}];

=======
 
        //Create a temporary variable to store all the user's friends as placeholder data
         var FriendsImages = [
                                  {
                                    "url": "./assets/images/PM.jpg",
                                    "name": "Piers Morgan"
                                  },
                              
                                  {
                                  "url": "./assets/images/MN.jpg",
                                  "name": "Manuel Neur"
                                  },
                                  
                                  {
                                  "url": "./assets/images/EM.jpg",
                                  "name": "Eminem"
                                  },
                                  
                                  {
                                  "url": "./assets/images/CH.jpg",
                                  "name": "Calvin Harris"
                                  },
                                  
                                  {
                                  "url": "./assets/images/SC.jpg",
                                  "name": "SC"
                                  },
                                  
                                  {
                                  "url": "./assets/images/JN.jpg",
                                  "name": "John Newman"
                                  },
                                  
                                  {
                                  "url": "./assets/images/EC.jpg",
                                  "name": "Emilia Clarke"
                                  },
                                  
                                  {
                                  "url": "./assets/images/Hector.jpg",
                                  "name": "Jonas Hector"
                                  },

                            ];
 
 
 
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
         //When the user clicks on the "Friends" Tab, show all the Friends of the user
         $(document).on('click', '#UserFriends',
                        
                                                function()
                                                {
                        
                                                    //Remove all other displayed information about "About" (if exists)
                                                    $('#AboutUser').remove();
                        
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
<<<<<<< HEAD
                                                    //Remove the datepicker
                                                    $('.xdsoft_datetimepicker').remove();
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                    //unwrap div with the class for blurring the background from #ProfileHeader
                                                    $('#ProfileHeader').unwrap();
                        
                        
<<<<<<< HEAD
                                                    //Remove all other displayed information about "Friends" (if exists)
                                                    //CUZ Referesh List
                                                    $('#FriendsofUser').remove();
                        
                                                    $('#EventSuccessful').hide();
                        
                                                //Trigger AJAX and get friends info
                                                $.ajax({
                                                       type: 'GET',
                                                       url: "http://localhost:3000/GetUserFriends",  //URL to send to send to the server
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
                                                                                            $Friend.append($FriendsID);   //Append the friend id
                                                                       
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
                                                          //Store the clicked friend's ID in a cookie to be accessed by Profile_OthersView.js
                                                        $.cookie("FriendIDClicked", $(this).children('input').val());
                                                        
                                                        //Go back to your friend's page
                                                        window.location.replace("/Profile_OthersView.html");
                                                    }
                        );
 
 
 
=======
                        
                        
                                                    //Only run function if friends information is not displayed
                                                if( $('#FriendsofUser').length == 0 )
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
                                                    $.each(FriendsImages,
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
                                                           
                                                                                $Friend.append($FriendImage);  //Append the Image
                                                                                $Friend.append($FriendName);   //Append the name
                                                           
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
                        
                                                }
                        
                        
                        );
 
 
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
         //Create a temporary variable to store all the sports available in TSports
         //This will eventually come from the database
         var Sports = [
                          {
                             "EventName" : "Cycling",
                             "url": "./assets/images/cycling.svg"
                          },
                          
                          {
                             "EventName" : "Football",
                             "url": "./assets/images/football.svg"
                          },
                       
                           {
                               "EventName" : "Squash",
                               "url": "./assets/images/squash.svg"
                           },
                           
                           {
                               "EventName" : "Basketball",
                               "url": "./assets/images/basketball.svg"
                           },
                           
                           {
                               "EventName" : "Boxing",
                               "url": "./assets/images/boxing.svg"
                           },
                       
                       {
                       "EventName" : "Tennis",
                       "url": "./assets/images/tennis.svg"
                       },
                       
                       {
                       "EventName" : "Volleyball",
                       "url": "./assets/images/volleyball.svg"
                       },
                       
                       {
                       "EventName" : "Waterpolo",
                       "url": "./assets/images/waterpolo.svg"
                       },
                       
                       {
                       "EventName" : "Tabletennis",
                       "url": "./assets/images/tabletennis.svg"
                       },
                       
                       {
                       "EventName" : "Taekwondo",
                       "url": "./assets/images/taekwondo.svg"
                       },
                       
                       {
                       "EventName" : "Swimming",
                       "url": "./assets/images/swimming.svg"
                       }
               
                    ];
 
 
             //When the user clicks on the "UserReviews" Tab, show all the reviews/ratings/comments of the user in different sports
             $(document).on('click', '#UserReviews',
                            
                                                    function()
                                                    {
       
                                                        //Remove all other displayed information about "About" (if exists)
                                                        $('#AboutUser').remove();
                            
                                                        //Remove all other displayed information about "Friends" (if exists)
                                                        $('#FriendsofUser').remove();
                            
                                                        //Remove all other displayed information about "Upcoming Events" (if exists)
                                                        $('#EventsofUser').remove();
                                                        //Remove all info about the selected event
                                                        $('#SelectedEvent').remove();
                            
                                                        //Remove all other displayed information about "Searching Events" (if exists)
                                                        $('#SearchEventSection').remove();
                                                        
                                                        //Remove all other displayed information about "Creating Events" (if exists)
                                                        $('#CreateEventSection').remove();
<<<<<<< HEAD
                                                        //Remove the datepicker
                                                        $('.xdsoft_datetimepicker').remove();
                                                        //unwrap div with the class for blurring the background from #ProfileHeader
                                                        $('#ProfileHeader').unwrap();
                            
                                                        $('#EventSuccessful').hide();
                            
=======
                                                        //unwrap div with the class for blurring the background from #ProfileHeader
                                                        $('#ProfileHeader').unwrap();
                            
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                            
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

 
 
 
<<<<<<< HEAD
 /***************************************************Paul******************************************************/
=======
 
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                 var sport_list = ["cycling", "waterpolo", "squash", "boxing", "taekwondo", "basketball",
                                   "tabletennis", "tennis", "volleyball",
                                   "football", "swimming"];
 
<<<<<<< HEAD
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
=======
 
                 var about_mockData = {
                                        "Campus": "St.George",
                                        "Given_Name": "Parham",
                                        "Family_Name": "Oghabi",
                                        "Phone_number": "(647)123-9999",
                                        "Email_Address": "parham@hotmail.com",
                                        "Birthday": "January 1, 1994",
                                        "Height": "180cm",
                                        "Weight": "72kg",
                                        "Gender": "Male",
                                        "About_Me": "",
                                        "Sports": sport_list
                                      };
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
 
                 var about_order = ["Campus", "Given_Name", "Family_Name", "Phone_number", "Email_Address",
                                    "Birthday", "Height", "Weight", "Gender", "About_Me", "Sports"];
 
 
                 //When the user clicks on the "About" Tab, show all info about the user
<<<<<<< HEAD
                $(document).on('click', '#UserAbout', DisplayUserInfo);
 
                function DisplayUserInfo()
=======
                $(document).on('click', '#UserAbout', userAboutClickFcn);
 
                function userAboutClickFcn()
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
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
<<<<<<< HEAD
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
=======
                  //unwrap div with the class for blurring the background from #ProfileHeader
                  $('#ProfileHeader').unwrap();

                  //Only run function if About information is not displayed
                  if( $('#AboutUser').length == 0 )
                  {  
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                      //Create a section to info about the user
                      var $AboutSection = $('<section>',
                                                          {
                                                              id: 'AboutUser'  //Please don't change this ID
                                                          }
                                           );

<<<<<<< HEAD
=======
                      
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                      //insert $AboutSection after the #ProfileHeader
                      $AboutSection.insertAfter('#ProfileHeader');


<<<<<<< HEAD
                    
                    
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
 
 
 
 
=======
                      //ADD CODE HERE
                      $div_input = $('<div/>',
                                             {
                                                class: "info_input"
                                             }
                                     );

                      for (var i = 0; i < about_order.length - 1; i++)
                      {
                              var $div = $('<div/>',
                                                   {
                                                      class: "each_info"
                                                   }
                                           );
                              
                              var $label = $('<label/>',
                                                         {
                                                           class: about_order[i]
                                                         }
                                             );
                              
                              var $label_text = $('<span/>',
                                                              {
                                                                class: "label",
                                                                text: about_order[i].replace("_", " ") + ":"
                                                              }
                                                  );
                              
                              var $br = $('<br>');
                              
                              var $info;
                              
                              //Display About me section as <textarea>
                              if (about_order[i] === "About_Me")
                              {
                                  $info = $('<textarea>',
                                                        {
                                                            name: about_order[i],
                                                            placeholder: "Brief Personal Description",
                                                            class: about_order[i],
                                                            text: about_mockData[about_order[i]],
                                                            rows: 6,
                                                            cols: 35,
                                                            disabled: "disabled"
                                                        }
                                            );
                                  //Display Sports section as <fieldset> and lists.
                              }

                              else
                              {
                                  $info = $('<input>',
                                                        {
                                                            type: "text",
                                                            name: about_order[i],
                                                            class: about_order[i],
                                                            value: about_mockData[about_order[i]],
                                                            disabled: "disabled"
                                                        }
                                            );
                              }
                              
                              
                              
                              $label.append($label_text);
                              $label.append($br);
                              $label.append($info);
                              $div.append($label);
                              
                              $div_input.append($div);
                      
                      }
                      
                      
  
                      $info = $('<section/>', {
                                id: "sports"
                      });
                      

                      var $p_text = $('<p/>', {
                                text: "Sports:"
                      });

                      var $div_collection = $('<div/>',{
                                id:"ck-collection"
                      })

                                        
                      var len = sport_list.length;

                      for(var i = 0;i < len;i++){
                        var $div_ckbtn = $('<div/>',{
                          class:"ck-button"
                        });

                        var $input_ckb = $('<input>',{
                          type:"checkbox",
                          id:sport_list[i],
                          name:sport_list[i],
                          value:sport_list[i],
                          disabled: "disabled",
                          checked: "checked"
                        });

                        var $label_sport = $('<label/>',{
                          for:sport_list[i]
                        });

                        var $img = $('<img>',{
                          width:"20",
                          height:"20",
                          src:"assets/images/" + sport_list[i] + ".svg"
                        });

                        $label_sport.append($img);
                        $label_sport.append(sport_list[i]);

                        $div_ckbtn.append($input_ckb);
                        $div_ckbtn.append($label_sport);

                        $div_collection.append($div_ckbtn);
                      }

                      $info.append($p_text);
                      $info.append($div_collection);
                      
                      
                      
                      var $edit = $('<button/>', {
                                    class: "edit_button",
                                    text: "Edit"
                                    });
                      
                      $AboutSection.append($div_input);
                      $AboutSection.append($info);
                      $AboutSection.append($edit);
                  }
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c

                }

 
 
<<<<<<< HEAD
 
 
                        //Your Code should end here
 /***************************************************Paul******************************************************/

 
                  //Create a global variable to store the list of user's events
                  window.UserEventsList = [];
=======
                 $(document).on('click', '.edit_button',
                                                        function()
                                                        {
                                                            $(".each_info input").removeAttr("disabled");
                                                            $(".each_info textarea").removeAttr("disabled");
                                                            
                                                            $(".edit_button").remove();
                                                            
                                                            var $div = $('<div/>',
                                                                                 {
                                                                                  class: "submitAndCancel"
                                                                                 }
                                                                         );
                                                            
                                                            
                                                            var $submit = $('<button/>',
                                                                                        {
                                                                                          class: "submit_button",
                                                                                          text: "Submit"
                                                                                        }
                                                                            );
                                                            
                                                            var $cancel = $('<button/>',
                                                                                        {
                                                                                          class: "cancel_button",
                                                                                          text: "Cancel"
                                                                                        }
                                                                            );
                                                            
                                                            $div.append($submit);
                                                            $div.append($cancel);
                                                            
                                                            $div.insertAfter("#sports");
                                                        }
                                );
 
                 
                 $(document).on('click', '.cancel_button',
                                                        function()
                                                        {
                                                            $('#AboutUser').remove();
                                                            userAboutClickFcn();
                                                        }
                             );
                 
 
                 
				$(document).on('click', '.submit_button', 
													function()
													{
						
														
														for (var i = 0; i < about_order.length - 2; i++) {
															about_mockData[about_order[i]] = $("input." + about_order[i]).val();
														}
														
														about_mockData[about_order[i]] = $("textarea." + about_order[i]).val();
											
														
														$('#AboutUser').remove();
														userAboutClickFcn();
														
													}
								);
 
 
 
 
             //List of upcoming events the user has joined
             var UserEvents = [
                                   {
                                       "EventName" : "Indoor Soccer",
                                       "EventType": "football",
                                       "EventDateTime": "Jul 26 2016 10:00 PM",
                                       "Duration": "1 Hour",
                                       "EventEndTime": "11:00 PM",
                                       "EventLocation": "AC Field 2",
                                       "EventDescription": "We are playing 5 vs 5. Loser's team has to pay for the field!! That's how it is ;)",
                                       "EventNumPpl": "10",
                                       "EventNumSpotsLeft": "2",
                                       "EventID" : "1",
                                       "EventAdminPic" : "./assets/images/Hector.jpg",
                                       "EventAdminName" : "Jonas Hector"
                                   },
                                   
                                   {
                                       "EventName" : "Water Polo Champs",
                                       "EventType": "waterpolo",
                                       "EventDateTime": "Jul 28 2016 08:00 PM",
                                       "Duration": "3 Hours",
                                       "EventEndTime": "11:00 PM",
                                       "EventLocation": "AC Benson Pool",
                                       "EventDescription": "Serious game. Please only attend if you are competitive and played in varsity.",
                                       "EventNumPpl": "20",
                                       "EventNumSpotsLeft": "8",
                                        "EventID" : "2",
                                       "EventAdminPic" : "./assets/images/SC.jpg",
                               "EventAdminName" : "SC"
                                   },
                                   
                                   {
                                       "EventName" : "Outdoor Soccer",
                                       "EventType": "football",
                                       "EventDateTime": "Jul 30 2016 10:00 PM",
                                       "Duration": "1 Hour",
                                       "EventEndTime": "11:00 PM",
                                       "EventLocation": "AC Soccer Field",
                                       "EventDescription": "We are playing 5 vs 5 half-court. Bring $10 for the field",
                                       "EventNumPpl": "10",
                                       "EventNumSpotsLeft": "5",
                                        "EventID" : "3",
                                       "EventAdminPic" : "./assets/images/MN.jpg",
                               "EventAdminName" : "Manuel Neur"
                                   },
                                   
                                   {
                                       "EventName" : "Lets Squash!",
                                       "EventType": "squash",
                                       "EventDateTime": "Aug 5 2016 03:00 PM",
                                       "Duration": "1 Hour",
                                       "EventEndTime": "04:00 PM",
                                       "EventLocation": "Harthouse Squart Courts",
                                       "EventDescription": "We are doubles 2 vs 2. Join us, just for fun! :)",
                                       "EventNumPpl": "4",
                                       "EventNumSpotsLeft": "2",
                                       "EventID" : "4",
                                       "EventAdminPic" : "./assets/images/CH.jpg",
                               "EventAdminName" : "Calvin Harris"
                                   }
                             ];

 
 
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
 
                 //When the user clicks on the "Events" tab, display the list of upcoming events the user has joined in
                 $(document).on('click', '#UserEvents',
                                
                                                    function()
                                                    {
                                
                                                        //Remove all other displayed information about "About" (if exists)
                                                        $('#AboutUser').remove();
                                                        
                                                        //Remove all other displayed information about "Friends" (if exists)
                                                        $('#FriendsofUser').remove();
                                                        
                                                        //Remove all other displayed information about "Reviews" (if exists)
                                                        $('#ReviewsofUser').remove();
                                                        $('#SportingEventReview').remove();
                                
                                                        //Remove all other displayed information about "SearchEvent" (if exists)
                                                        $('#SearchEventSection').remove();
                                
                                                        //Remove all other displayed information about "Creating Events" (if exists)
                                                        $('#CreateEventSection').remove();
<<<<<<< HEAD
                                                        //Remove the datepicker
                                                        $('.xdsoft_datetimepicker').remove();
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                        //unwrap div with the class for blurring the background from #ProfileHeader
                                                        $('#ProfileHeader').unwrap();
                                
                                
<<<<<<< HEAD
                                                        //Remove all other displayed information about "Events" (if exists)
                                                        //CUZ Referesh List
                                                        $('#EventsofUser').remove();
                                                        //Remove all info about the selected event
                                                        $('#SelectedEvent').remove();
                                
                                                        $('#EventSuccessful').hide();
                                
                                
                                                    //Trigger AJAX and get events
                                                    $.ajax({
                                                           type: 'GET',
                                                           url: "http://localhost:3000/ViewEvents",
                                                           dataType: 'JSON',
                                                           success: function (response)
                                                           {
                                                           
                                                             //console.log(response);
                                                             //Store the JSON File containing all the events
                                                             window.UserEventsList = response;
                                       
=======
                                                        //Only run function if EventsofUser information is not displayed
                                                        if( $('#EventsofUser').length == 0 )
                                                        {
                                                        
                                                        
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                            //Create a section to show list of upcoming events the user has joined
                                                            var $EventsofUser = $('<section>',
                                                                                             {
                                                                                               id: 'EventsofUser'
                                                                                             }
                                                                                 );
                                                            
                                                            //insert $EventsofUser after the #ProfileHeader
                                                            $EventsofUser.insertAfter('#ProfileHeader');
                                
                                
                                
                                                            //The <ul> inside which we will place the events
                                                            var $EventsUL = $('<ul>',
                                                                                     {
                                                                                        id: 'EventsofUserUL'
                                                                                     }
                                                                             );
                                                            
                                                            //Append the $EventsUL to the page
                                                            $EventsofUser.append($EventsUL);

                                
                                
                                                            //Add the upcoming events the user has joined
                                                            //Loop over the events
<<<<<<< HEAD
                                                            $.each(response,
=======
                                                            $.each(UserEvents,
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                           function(index, item)
                                                                           {
                                                                           
                                                                               //$IndividualEvent is each of the individual events the user has joined
                                                                               var $IndividualEvent = $('<li>',
                                                                                                                {
                                                                                                                  class: 'IndividualEvent'
                                                                                                                }
                                                                                                );
                                                                   
                                                                   
                                                                   
                                                                               //$divLeft contains the event Date and Time
                                                                               var $divLeft = $('<div>',
                                                                                                                {
                                                                                                                  class: 'IndividualEventDateTime'
                                                                                                                }
                                                                                                        );
                                                                   
                                                                               //$divMiddle contains event Info (Event name, sport type, #ppl attending, #open spots)
                                                                               var $divMiddle = $('<div>',
                                                                                                        {
                                                                                                            class: 'IndividualEventInfo'
                                                                                                        }
                                                                                                );
                                                                   
                                                                               //$divRight contains more info about the event Info (The "+" SVG)
                                                                               var $divRight= $('<div>',
                                                                                                          {
                                                                                                            class: 'IndividualEventMoreDetail'
                                                                                                          }
                                                                                                );
                                                                   
                                                                               //Append the $IndividualEvent to the EventsUL
                                                                               $EventsUL.append($IndividualEvent);
                                                                   
                                                                   
                                                                               //Append the Left, Middle, and Right Divs to the $IndividualEvent
                                                                               $IndividualEvent.append($divLeft);
                                                                               $IndividualEvent.append($divMiddle);
                                                                               $IndividualEvent.append($divRight);
                                                                   
                                                                   
                                                                               //Add the Event DateTime to $divLeft
                                                                               $divLeft.append(
                                                                                                $('<p>',
                                                                                                          {
                                                                                                            text: item.EventDateTime
                                                                                                          }
                                                                                                 )
                                                                                               );
                                                                   
                                                                   
                                                                   
                                                                               //Add the Event Info to $divMiddle
                                                                               
                                                                   
                                                                               var $EventName= $('<h3>',
                                                                                                        {
                                                                                                          text: item.EventName
                                                                                                        }
                                                                                                );
                                                                   
                                                                               var $EventSVG= $('<img>',
                                                                                                         {
                                                                                                            src: './assets/images/' + item.EventType + '.svg',
                                                                                                            width: '20px'
                                                                                                         }
                                                                                               );
                                                                   
                                                                   
                                                                               var $EventAttendance= $('<p>',
                                                                                                                {
                                                                                                                  //Calculate #ppl attending
                                                                                                                  text: (item.EventNumPpl - item.EventNumSpotsLeft)  + " People Attending ",
                                                                                                                  class: 'EventAttendance'
                                                                                                                }
                                                                                                     );
                                                                   
                                                                   
                                                                               //Append the number of available spots
                                                                               $EventAttendance.append(
                                                                                                         $('<span>',
                                                                                                               {
                                                                                                                   text: item.EventNumSpotsLeft  + " Spots left!",
                                                                                                                   class: 'EventSpotsLeft'
                                                                                                               }
                                                                                                          )
                                                                                                      );
                                
                                                                   
                                                                               $divMiddle.append($EventName);
                                                                               $divMiddle.append($EventSVG);
                                                                               $divMiddle.append($EventAttendance);
                                                                   
                                                                   
                                                                   
                                                                   
                                                                               //Append an "X" sign next to each upcoming event joined
                                                                               //if clicked, "X" SVG means Leave Event
                                                                               $divRight.append(
                                                                                                $('<img>',
                                                                                                          {
                                                                                                              src: './assets/images/x.svg',
                                                                                                              width: '15px'
                                                                                                          }
                                                                                                  )
                                                                                                );
                                                                   
                                                                   
                                                                              //Make the "+" SVG a form
                                                                              //So when the user clicks it, track unique event ID using hidden input
                                                                   
                                                                               var $SelectedEventForm = $('<form>',
                                                                                                                    {
                                                                                                                      class: 'SelectedEventForm'
                                                                                                                    }
                                                                                                         );

                                                                               var $EventIDHidden= $('<input>',
                                                                                                             {
                                                                                                                type: 'hidden',
                                                                                                                name: 'EventID',
                                                                                                                value: item.EventID
                                                                                                             }
                                                                                                   );
                                                                   
                                                                               var $ShowSelectedEventSubmit= $('<input>',
                                                                                                                        {
                                                                                                                           type: 'submit',
                                                                                                                           class: 'ShowSelectedEventSubmit',
                                                                                                                           value: ""
                                                                                                                           //The value will be the "+" SVG
                                                                                                                        }
                                                                                                              );
                                                                   
                                                                   
                                                                               //Append the hidden input and submit button to the $SelectedEventForm
                                                                               $SelectedEventForm.append($EventIDHidden);
                                                                               $SelectedEventForm.append($ShowSelectedEventSubmit );
                                                                
                                                                   
                                                                               //Append the form to the $divRight
                                                                               $divRight.append($SelectedEventForm );
                                                                   
                                                                           }
                                                                   );

<<<<<<< HEAD
                                                        }
                                                        }); //End of AJAX
 
=======
                                
                                
                                
                                                        }
                                                    
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                    }
                                
                                
                                );
 
 
 
                 //When the user clicks on the "+" SVG for more details, show the user more info about that event
                 $(document).on('click', '#EventsofUser #EventsofUserUL .IndividualEvent .IndividualEventMoreDetail .SelectedEventForm',
                                
                                                    function(e)
                                                    {
                                                    
                                                        //Hide all displayed information about "Upcoming Events" first
                                                        //Don't remove it, it will be bad efficiency
                                                        $('#EventsofUser').hide();
                                
                                                        //Prevent the form from submitting the default "action"
                                                        e.preventDefault();
                                
                                                        //Create a section to show the specific event
                                                        var $SelectedEvent = $('<section>',
                                                                                          {
                                                                                            id: 'SelectedEvent'
                                                                                          }
                                                                              )
                                
                                                        //Show a back SVG on the top of the page
                                                        var $Return2Events =  $('<img>',
                                                                                       {
                                                                                           src: './assets/images/return-button.svg',
                                                                                           class: 'Return2Events',
                                                                                           width: '30px'
                                                                                       }
                                                                               );
                                
                                                        //insert $SelectedEvent after the #ProfileHeader
                                                        $SelectedEvent.insertAfter('#ProfileHeader');
                                                        $SelectedEvent.append($Return2Events);
                                
                                
<<<<<<< HEAD
                                                        //Find out which Event was clicked using the submitted form's hidden input to see the Event ID
                                                        var EventID = $(this).children('input[name=EventID]').attr('value');
                                
                                
                                                        //NO NEED to send this Event ID with AJAX to the server to get the Event Info (cuz HTTP Req|Res is slow)
                                                        //We already saved all the User's attending Events info in a global variable
                                
                                
                                                        //Loop over and find the clicked event
                                                        var JSONEvent = [];
                                                        $.each(UserEventsList,
                                                                               function(index, item)
                                                                               {
                                                                                    //we found that object
                                                                                    if(item.EventID == EventID)
                                                                                    {
                                                                                        JSONEvent = item;
                                                                                        return false; //We found it, break
                                                                                    }
                                                                               }
                                                               );

=======
                                                        //Use the submitted form's hidden input to see the Event ID and send it to the server
                                                        var $EventID = $(this).children('input[name=EventID]').attr('value');
                                                        //console.log( $EventID );
                                
                                                        //Send this Event ID with AJAX to the server to retrieve more Info about the Event (such as the admin user)
                                                        //The web server will send back a JSON object for this event ID
                                
                              
                                
                                                        //Right not just use a temporary hack (pretend we got the JSON)
                                                        var JSONEvent = UserEvents[$EventID - 1];
                                
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                
                                
                                                        var $EventName= $('<h3>',
                                                                                {
                                                                                  text: JSONEvent.EventName,
                                                                                  class: 'EventName'
                                                                                }
                                                                         );
                                
                                                        //Append the $EventName
                                                        $SelectedEvent.append($EventName);
                                
                                
                                                        //$BasicEventInfo_Wrapper wraps "EventSportName", "EventDateTime", "EventDuration", "EventLocation", "EventAttendance"
                                                        var $BasicEventInfo_Wrapper= $('<div>',
                                                                                              {
<<<<<<< HEAD
                                                                                                class: 'BasicEventInfo_Wrapper'
=======
                                                                                              class: 'BasicEventInfo_Wrapper'
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                                              }
                                                                                       );
                                
                                
                                                        //$EventType is the Event SVG + Sport name
                                                        var $EventType= $('<div>',
                                                                                  {
                                                                                    class: 'EventSportName'
                                                                                  }
                                                                         );
                                
                                
                                                        var $EventSVG= $('<img>',
                                                                                 {
                                                                                   src: './assets/images/' + JSONEvent.EventType + '.svg',
                                                                                   width: '20px'
                                                                                 }
                                                                        );
                                
                                
                                                        var $EventSportName= $('<p>',
                                                                                     {
                                                                                       text: JSONEvent.EventType
                                                                                     }
                                                                              );

 
                                                       $EventType.append($EventSVG);
                                                       $EventType.append($EventSportName);
                                
                                
                                                        //Append the $EventName
                                                        $BasicEventInfo_Wrapper.append($EventType);
                               
                                
                                                        var $EventDateTime= $('<div>',
                                                                                      {
                                                                                       class: 'EventDateTime'
                                                                                      }
                                                                             );
                                
                                
                                                        var $EventCalendarSVG= $('<img>',
                                                                                         {
                                                                                           src: './assets/images/calendar.svg',
                                                                                           width: '18px'
                                                                                         }
                                                                                 );

                                                        var $EventDate= $('<p>',
                                                                                 {
                                                                                  text: JSONEvent.EventDateTime
                                                                                 }
                                                                         );
                                
                                
                                
//                                                        var TestDate = new Date(JSONEvent.EventDateTime);  //Works (Accepts the format)
//                                                        console.log(TestDate);
//                                                        var TimeA= formatAMPM(TestDate);  //Prints out the time (Ex: 3:00 pm)
//                                                        console.log(TimeA);
                                
                                
                                                        $EventDateTime.append($EventCalendarSVG);
                                                        $EventDateTime.append($EventDate);
                                
                                                        //Append the $EventDateTime
                                                        $BasicEventInfo_Wrapper.append($EventDateTime);
                                
                                
                                
                                
                                                        //The Event Duration is calculated from the Event DateTime and Event EndTime and sent back in the JSON
                                                        //Calculate this on Node.js server for efficiency (Can use moment.js [very good])
                                
                                                        var $EventDuration= $('<div>',
                                                                                      {
                                                                                        class: 'EventDuration'
                                                                                      }
                                                                              ).append(
                                                                                        $('<img>',
                                                                                                {
                                                                                                  src: './assets/images/clock.svg',
                                                                                                  width: '18px'
                                                                                                }
                                                                                          )
                                                                                      ).append(
                                                                                               $('<p>',
                                                                                                      {
                                                                                                       text: JSONEvent.Duration
                                                                                                      }
                                                                                                 )
                                                                                              );
                                
                                
                                                        //Append the $EventDuration
                                                        $BasicEventInfo_Wrapper.append($EventDuration);
                                
                                                        var $EventLocation= $('<div>',
                                                                                      {
                                                                                       class: 'EventLocation'
                                                                                      }
                                                                              ).append(
                                                                                        $('<img>',
                                                                                                 {
                                                                                                   src: './assets/images/location.svg',
                                                                                                   width: '15px'
                                                                                                 }
                                                                                         )
                                                                                       ).append(
                                                                                                  $('<p>',
                                                                                                          {
                                                                                                           text: JSONEvent.EventLocation
                                                                                                          }
                                                                                                   )
                                                                                               );

                                
                                                        //Append the $EventLocation
                                                        $BasicEventInfo_Wrapper.append($EventLocation);
                                
                                
                                                       var $EventAttendance= $('<p>',
                                                                                       {
                                                                                         //Calculate #ppl attending
                                                                                         text: (JSONEvent.EventNumPpl - JSONEvent.EventNumSpotsLeft)  + " People Attending ",
                                                                                         class: 'EventAttendance'
                                                                                       }
                                                                              );


                                                        //Append the number of available spots
                                                        $EventAttendance.append(
                                                                                   $('<span>',
                                                                                             {
                                                                                               text: JSONEvent.EventNumSpotsLeft  + " Spots left!",
                                                                                               class: 'EventSpotsLeft'
                                                                                             }
                                                                                     )
                                                                                );

                                
                                                        $BasicEventInfo_Wrapper.append($EventAttendance);
                                
                                
                                
                                
                                                        $SelectedEvent.append($BasicEventInfo_Wrapper);
                                
                                
                                                        var $EventDescription= $('<p>',
                                                                                       {
                                                                                        text: JSONEvent.EventDescription,
                                                                                        class: 'EventDescription'
                                                                                       }
                                                                                );
                                                        
                                                        
                                                        //Append the $EventDescription
                                                        $SelectedEvent.append($EventDescription);
                                
                                
                                                        //Add picture of the Event admin
                                                        var $EventAdmin = $('<div>',
                                                                                    {
                                                                                        id: 'EventAdmin'
                                                                                    }
                                                                          );
                                
                                                        //Add picture of the Event admin
                                                        var $EventAdminPic = $('<img>',
                                                                                    {
                                                                                        src: JSONEvent.EventAdminPic,
                                                                                        width: '100px',
                                                                                        height: '100px',
                                                                                        class:  'UserImages'
                                                                                    }
                                                                             );
                                
                                
                                                        var $EventAdminName = $('<p>',
                                                                                    {
                                                                                     text:  JSONEvent.EventAdminName
                                                                                    }
                                                                               );
                                
                                                        $EventAdmin.append($EventAdminPic);
                                                        $EventAdmin.append($EventAdminName);
                                
                                
                                                        $SelectedEvent.append($EventAdmin);
                                
                                
                                
                                
                                                    //All the users who joined this event
                                                    var $EventUsers = $('<div>',
                                                                                {
                                                                                 id: 'EventUsers'
                                                                                }
                                                                      );
                                
                                
<<<<<<< HEAD
                                    //Trigger AJAX
                                    //Send the EventID and get List of all the users in that event
                                    $.ajax({
                                           type: 'POST',
                                           url: "http://localhost:3000/GetEventUsers",  //URL to send to send to the server
                                           dataType: 'JSON',
                                           //Send the EventID of the event (hidden input Event ID) as a JSON File
                                           data: { eventID: EventID },
                                           success: function (response)
                                           {
                                                    //Loop over all the users in this event and append them
                                                    $.each(response,
                                                                           function(index, item)
                                                                           {
                                                           
                                                           
                                                                               var $User = $('<div>',
                                                                                                       {
                                                                                                            class: 'EventUser'
                                                                                                       }
                                                                                               );
                                                           
=======
                                
                                                    //Loop over all the users in this event and append them
                                                    //Right now, assume all Friends are joined in the event
                                                    $.each(FriendsImages,
                                                                           function(index, item)
                                                                           {
                                                                           
                                                           
                                                                               var $User = $('<div>',
                                                                                                       {
                                                                                             
                                                                                                       }
                                                                                               );
                                                                               
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                               var $UserName = $('<p>',
                                                                                                       {
                                                                                                        text:  item.name
                                                                                                       }
                                                                                                   );
<<<<<<< HEAD
                                                           
=======
                                                                               
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                               var $UserImage = $('<img>',
                                                                                                         {
                                                                                                           src: item.url,
                                                                                                           width: '80px',
                                                                                                           height: '80px',
                                                                                                           class:  'UserImages'
                                                                                                        }
                                                                                                );
<<<<<<< HEAD
                                                           
                                                                               //Attach a hidden input to the User ID
                                                                               //So that upon click, we can send this info to the server
                                                                               var $UserID = $('<input>',
                                                                                                              {
                                                                                                                type: 'hidden',
                                                                                                                name: 'FriendID',
                                                                                                                value: item.friendid
                                                                                                              }
                                                                                                  );
                                                           
                                                                               $User.append($UserImage);  //Append the Image
                                                                               $User.append($UserName);   //Append the name
                                                                               $User.append($UserID);   //Append the user id
                                                           
=======
                                                                               
                                                                               $User.append($UserImage);  //Append the Image
                                                                               $User.append($UserName);   //Append the name
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                               
                                                                               $EventUsers.append($User);
                                                                           }
                                                           );

                                
                                                    //Append all the event users
                                                    $SelectedEvent.append($EventUsers);
<<<<<<< HEAD
                                           
                                           
                                                   //Now make an AJAX call to the server to get the group chat messages in the event
                                                   $.ajax({
                                                          type: 'POST',
                                                          url: "http://localhost:3000/GetEventMessages",  //URL to send to send to the server
                                                          dataType: 'JSON',
                                                          //Send the EventID of the event (hidden input Event ID) as a JSON File
                                                          data: { eventID: EventID },
                                                          success: function (response)
                                                          {
   
                                                              //Now add the group chat for users in this event
                                                              var $EventGroupChat = $('<div>',
                                                                                              {
                                                                                                id: 'EventGroupChat'
                                                                                              }
                                                                                      );
                                                              
                                                              //Append all $EventGroupChat to the <section>
                                                              $SelectedEvent.append($EventGroupChat);
                                                              
                                                              
                                                              //Get Message Data from the web server, and append list of previous messages with the user
                                                              var  $GroupChatContent = $('<div>',
                                                                                                 {
                                                                                                   id: 'GroupChatContent'
                                                                                                 }
                                                                                         );
                                                          
                                                          
                                                          
                                                          
                                                              //Loop over all the messages and append them
                                                              $.each(response,
                                                                             function(index, item)
                                                                             {
                                                                     
                                                                                //$EventChatMessage has the message and the image of the person who sent it
                                                                                var $EventChatMessage = $('<div>',
                                                                                                                 {
                                                                                                                    class: 'ChatContentDatas',
                                                                                                                 }
                                                                                                        );
                                                                     
                                                                     
                                                                     
                                                                                //Make an img tag for the profile pic of the person who sent it
                                                                                //Then append it to $EventChatMessage
                                                                                 var $SentByProfilePic = $('<img>',
                                                                                                                   {
                                                                                                                       src: item.ProfileImage,
                                                                                                                       width: '25px',
                                                                                                                       height: '25px',
                                                                                                                       class: 'EventMessageDisplayPic'
                                                                                                                   }
                                                                                                           );
                                                                     
                                                                                $EventChatMessage.append($SentByProfilePic);
                                                                     
                                                                     
                                                                                //Message was sent by me
                                                                                if(item.sentById == $.cookie("UserID"))
                                                                                {
                                                                     
                                                                                     var  $p = $('<p>',
                                                                                                         {
                                                                                                           text: item.chatmessage
                                                                                                         }
                                                                                                 );
                                                                     
                                                                                    //Add a class so it floats to the left
                                                                                    $EventChatMessage.addClass('MessageByMe');
                                                                     
                                                                                    $EventChatMessage.append($p);
                                                                                }
                                                                     
                                                                                 //Message was sent by other users
                                                                                 else
                                                                                 {
                                                                     
                                                                                     var  $p = $('<p>',
                                                                                                      {
                                                                                                       text: item.chatmessage
                                                                                                 
                                                                                                      }
                                                                                                 );
                                                                     
                                                                                     //Add a class so it floats to the right
                                                                                     $EventChatMessage.addClass('MessageNotByMe');
                                                                     
                                                                                     $EventChatMessage.append($p);
                                                                                 }
                                             
                                                                     
                                                                                    $GroupChatContent.append($EventChatMessage);
                                                 
                                                                             }
                                                                     );

                                                          
                                                              
                                                              //Append $GroupChatContent to the $EventGroupChat
                                                              $EventGroupChat.append($GroupChatContent);
                                                              
                                    
                                                              //Create a form input for all the users to be able to type
                                                              var $GroupChatForm = $('<form>',
                                                                                             {
                                                                                               id: 'GroupChatForm'
                                                                                             }
                                                                                     );
                                                              
                                                              
                                                              //Create a textarea element
                                                              var $GroupChatFormTextarea = $('<textarea>',
                                                                                                         {
                                                                                                           placeholder: 'Type a message...',
                                                                                                           width:  $EventGroupChat.width() - 10
                                                                                                         }
                                                                                             );
                                                              
                                                              //Append the textarea to the form
                                                              $GroupChatForm.append($GroupChatFormTextarea);
                                                              
                                                              //Append the form to the ChatBox
                                                              $EventGroupChat.append($GroupChatForm);
                                                   
                                                          }
                                                          }); //End of AJAX 2 (Get Event Messages)
                                
                                            }
                                            }); //End of AJAX 1 (Get Event Users)
 

                                                    }
                                
                                );
 
 
 
                 //When a user clicks on any of his friends|users, take them to their profile
                 $(document).on('click', '.EventUser ',
                                
                                                    function()
                                                    {
                                
                                                        //The cookie is called FriendIDClicked because I am utilizing one handler for efficiency
                                                        //Clicking on your friends pictures or a picture of a user attending the same event produces same results
                                                        
                                                        //Only display that user's profile if it isn't yourself
                                                        if( $(this).children('input').val() !=  $.cookie("UserID") )
                                                        {
                                                            //Store the clicked friend's ID in a cookie to be accessed by Profile_OthersView.js
                                                            $.cookie("FriendIDClicked", $(this).children('input').val());
                                                            
                                                            //Go back to your friend's page
                                                            window.location.replace("/Profile_OthersView.html");
                                                        }
                                                    }
=======
                                
                                
                                
                                
 
                                
                                                    //Now add the group chat for users in this event
                                                    var $EventGroupChat = $('<div>',
                                                                                    {
                                                                                      id: 'EventGroupChat'
                                                                                    }
                                                                           );
                                
                                
                                                    //Append all $EventGroupChat to the <section>
                                                    $SelectedEvent.append($EventGroupChat);
                                
                                
                                
                                
                                                    //Get Message Data from the web server, and append list of previous messages with the user
                                                    
                                                    var  $GroupChatContent = $('<div>',
                                                                                      {
                                                                                       id: 'GroupChatContent'
                                                                                      }
                                                                             );
                                
                                                    for(var i=0; i< 50; i++)
                                                    {
                                                        var  $p = $('<p>',
                                                                        {
                                                                        text: 'Hey bro! How have you been recently? Havent seen you!',
                                                                        class: 'ChatContentDatas'
                                                                        }
                                                                    );
                                                        
                                                        $GroupChatContent.append($p);
                                                    
                                                    }
                                
                                                    //Append $GroupChatContent to the $EventGroupChat
                                                    $EventGroupChat.append($GroupChatContent);
                                
                                
                                
                                
                                
                                
                                
                                
                                                    //Create a form input for all the users to be able to type
                                                    var $GroupChatForm = $('<form>',
                                                                                     {
                                                                                        id: 'GroupChatForm'
                                                                                     }
                                                                          );
                                                    
                                                    
                                                    //Create a textarea element
                                                    var $GroupChatFormTextarea = $('<textarea>',
                                                                                             {
                                                                                               placeholder: 'Type a message...',
                                                                                               width:  $EventGroupChat.width() - 10
                                                                                             }
                                                                                  );
                                                    
                                                    //Append the textarea to the form
                                                    $GroupChatForm.append($GroupChatFormTextarea);
                                                    
                                                    //Append the form to the ChatBox
                                                    $EventGroupChat.append($GroupChatForm);
                                
                                
                                
                                
                                
                                

                                
                                                    }
                                
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                );
 
 
 
<<<<<<< HEAD
 
                 //When the user clicks on the "x" (Leave Event) SVG next to each event, delete that <li> Event and inform the server
=======
                 //When the user clicks on the "x" (Leave Event) SVG next to each event, delete that <li> Event
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                 $(document).on('click', '#EventsofUser #EventsofUserUL .IndividualEvent .IndividualEventMoreDetail img',
                
                                                                        function()
                                                                        {
<<<<<<< HEAD
                                
                                                                            var hiddeneventID = $(this).siblings('form').children("input[name='EventID']").val();
                                                                            $(this).parent().parent().remove();
                                    
                                                                            //Inform the server that the user is leaving this specific event
                                                                            $.ajax({
                                                                                   type: 'POST',
                                                                                   url: "http://localhost:3000/LeaveEvent",
                                                                                   dataType: 'text',
                                                                                   //Send the EventID of the event (hidden input Event ID) as a JSON File
                                                                                   data: { eventID: hiddeneventID },
                                                                                   
                                                                                   //If an admin leaves his own event, the whole event is cancelled
                                                                                   success: function (response)
                                                                                   {
                                                                                        //console.log(response);
                                                                                   
                                                                                           //Inform the user that since he was the admin, the whole event got cancelled
                                                                                           if(response == "UserWasAdmin")
                                                                                           alert("You were the Admin! You cancelled the Event!");
                                                        
                                                                                   }
                                                                                   }); //End of AJAX

=======
                                                                            //Remove that event <li>
                                                                            $(this).parent().parent().remove();
                                
                                
                                                                            //Using this element's sibling (the hidden input Event ID)
                                                                            //We can tell the DB that this user left this event, to remove it from the DB
                                
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                        }
                                                                        
                                
                                );
 

 
                 //When the user clicks on the return SVG, return to display the list of upcoming events the user has joined in
                 $(document).on('click', '#SelectedEvent .Return2Events',
                                
                                                                        function()
                                                                        {
                                                                            //Remove all info about the selected event
                                                                            $('#SelectedEvent').remove();
                                                                            
                                                                            //Show all displayed information about "Upcoming Events" first
                                                                            $('#EventsofUser').show();
                                                                        }
                                                                        
                                
                                );
 
 
 

 
                 //When the user clicks on the "SearchEvent" SVG, Create a form element for the user to search
                 $(document).on('click', '#SearchEvent',
                                
                                                    function()
                                                    {
                                
                                                        //Remove all other displayed information about "About" (if exists)
                                                        $('#AboutUser').remove();
                                
                                                        //Remove all other displayed information about "Friends" (if exists)
                                                        $('#FriendsofUser').remove();
                                
                                                        //Remove all other displayed information about "Reviews" (if exists)
                                                        $('#ReviewsofUser').remove();
                                                        $('#SportingEventReview').remove();
                                
                                                        //Remove all other displayed information about "Upcoming Events" (if exists)
                                                        $('#EventsofUser').remove();
                                                        //Remove all info about the selected event
                                                        $('#SelectedEvent').remove();
                                
                                                        //Remove all other displayed information about "Creating Events" (if exists)
                                                        $('#CreateEventSection').remove();
<<<<<<< HEAD
                                                        //Remove the datepicker
                                                        $('.xdsoft_datetimepicker').remove();
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                        //unwrap div with the class for blurring the background from #ProfileHeader
                                                        $('#ProfileHeader').unwrap();
                                
                                
<<<<<<< HEAD
                                                        $('#EventSuccessful').hide();
                                
                                
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                
                                                        //Only run function if SearchEvent information is not displayed
                                                        if( $('#SearchEventSection').length == 0 )
                                                        {
                                
                                
                                                            //Create a section to show the search form
                                                            var $SearchEvent = $('<section>',
                                                                                                {
                                                                                                    id: 'SearchEventSection'
                                                                                                }
                                                                                    );
                                
                                                            //insert $SearchEvent after the #ProfileHeader
                                                            $SearchEvent.insertAfter('#ProfileHeader');
                                
                                
                                
                                                            //Create a form for the user to be able to search events
                                                            var $SearchEventForm = $('<form>',
                                                                                             {
                                                                                                id: 'SearchEventForm'
                                                                                             }
                                                                                    ).append(
                                                                                             $('<input>',
                                                                                                           {
                                                                                                             type: 'text',
                                                                                                             id: 'SearchForEvents',
                                                                                                             placeholder: 'Search for events by using dropdown menu or typing',
                                                                                                             maxlength: 12
                                                                                                            //Give the user the ability to both type and click from dropdown menu
                                                                                                            // readonly: ""
                                                                                                           }
                                                                                               )
                                                                                            );
                                
                                                            //Append it to the SearchEvent
                                                            $SearchEvent.append($SearchEventForm);
                                
                                
                                
                                
                                                            //Create a div for AvailableEventTypes
                                                            var $AvailableEventTypes = $('<div>',
                                                                                                 {
                                                                                                   id: 'AvailableEventTypes',
                                                                                                   //Initially hide it, only show it when user clicks on the input
                                                                                                   class: 'HideAvailableEventTypes'
                                                                                                 }
                                                                                         );
                                                            
                                
                                                            //Insert hidden $AvailableEventTypes after the search form input
                                                            $SearchEvent.append( $AvailableEventTypes );
                                                            
                                
                                
                                                            //Create a <ul> for AvailableEventTypes
                                                            var $AvailableEventTypesUL = $('<ul>',
                                                                                                   {
                                                                                                     id: 'AvailableEventTypesUL'
                                                                                                   }
                                                                                          );
                                                            
                                                            //Append the <ul> to the <div>
                                                            $AvailableEventTypes.append($AvailableEventTypesUL);
                                                            
                                                            
                                                            //When the DB is set, we should make an .ajax call and loop over the sports available in the DB
                                                            //Loop over all the sporting events available and append them
                                                            $.each(Sports,
                                                                           function(index, item)
                                                                           {
                                                                           
                                                                               //Now add the available sports to each <li>
                                                                               var $IndividualEventType = $('<li>',
                                                                                                                    {
                                                                                                                      class: 'IndividualEventType'
                                                                                                                    }
                                                                                                            );
                                                                               
                                                                               //Now add the SVG of the sport first
                                                                               var $IndividualEventImg = $('<img>',
                                                                                                                   {
                                                                                                                     src: item.url,
                                                                                                                     width: '11px'
                                                                                                                   }
                                                                                                           );
                                                                               
                                                                               //Now add the name of the sport
                                                                               var $IndividualEventName = $('<p>',
                                                                                                                {
                                                                                                                  text: item.EventName
                                                                                                                }
                                                                                                            );
                                                                               
                                                                               $IndividualEventType.append($IndividualEventImg);  //Append the Sport SVG to the <li>
                                                                               $IndividualEventType.append($IndividualEventName);  //Append the sport name to the <li>
                                                                               $AvailableEventTypesUL.append($IndividualEventType);  //Append the  <li> to the <ul>
                                                                           
                                                                           }
                                                                   );

                                
                                
                                
                                
                                
                                
                                                        }
                                
                                                    }
                                
                                
                                );
 
 
             /*****************************Using the DropDown menu to search for events*******************************/
 
             //Clicking on the #SearchEventSection form input, opens the sport picker and clicking again toggles/closes it
             $(document).on('click', '#SearchEventSection #SearchForEvents',
                                                                function()
                                                                {
                                                                  //Toggle the sport picker
                                                                  $('#SearchEventSection #AvailableEventTypes').toggleClass( 'HideAvailableEventTypes' );
                                                                }
                            );
 
 
 
 
 
             //When the user clicks on any of the sports in the EventType input form, update the form value with that event
             $(document).on('click', '#SearchEventSection #AvailableEventTypes #AvailableEventTypesUL li',
                                                                function()
                                                                {
                                                                    //Change the form input value to that sport
                                                                    $('#SearchEventSection input').val( $(this).children('p').text() );
                                                                    
                                                                    //Add the sport event SVG to the form input
                                                                    $('#SearchEventSection input').css( 'background-image', 'url(' + $(this).children('img').attr('src') + ')');
                                                                    $('#SearchEventSection input').css( 'background-repeat' , 'no-repeat');
                                                                    $('#SearchEventSection input').css( 'background-size', '14px');
                                                                    $('#SearchEventSection input').css('background-position', '3px 5px');
                            
                            
                                                                    //hide the sport picker after clicking
                                                                    $('#SearchEventSection #AvailableEventTypes').toggleClass( 'HideAvailableEventTypes' );
<<<<<<< HEAD
                            
                                                                    var SelectedEventSport = $(this).children('p').text();
                            
                            console.log("CLICKED: " + );
                                                                    //Send an AJAX to the server to get back events matching the clciked sport
//                                                                    //Get the logged-in user's basic info when they login: profile pic, name, UnreadNotifications icons
//                                                                    $.ajax({
//                                                                           type: 'GET',
//                                                                           url: "http://localhost:3000/GetLoginUserInfo",  //URL to send to send to the server
//                                                                           dataType: 'JSON',
//                                                                           //Receives the path of the user's profile picture in the server
//                                                                           success: function (response)
//                                                                           {
//                                                                           //console.log(response);
//                                                                           
//                                                                           //Now display the correct icon notification numbers
//                                                                           //If its zero, never display the red icon
//                                                                           if(response[0].numfriendreqs == 0)
//                                                                           {
//                                                                           $('#FB_Friend_SVG p').hide(); //hide it
//                                                                           }
//                                                                           
//                                                                           else
//                                                                           {
//                                                                           $('#FB_Friend_SVG p').show();
//                                                                           $('#FB_Friend_SVG p').text( response[0].numfriendreqs );
//                                                                           }
//                                                                           
//                                                                           
//                                                                           if(response[0].nummessages == 0)
//                                                                           {
//                                                                           $('#FB_Message_SVG p').hide(); //hide it
//                                                                           }
//                                                                           
//                                                                           else
//                                                                           {
//                                                                           $('#FB_Message_SVG p').show();
//                                                                           $('#FB_Message_SVG p').text( response[0].nummessages );
//                                                                           }
//                                                                           
//                                                                           
//                                                                           if(response[0].numnotifications == 0)
//                                                                           {
//                                                                           $('#FB_Notification_SVG p').hide(); //hide it
//                                                                           }
//                                                                           
//                                                                           else
//                                                                           {
//                                                                           $('#FB_Notification_SVG p').show();
//                                                                           $('#FB_Notification_SVG p').text( response[0].numnotifications );
//                                                                           }
//                                                                           
//                                                                           }
//                                                                           }); //End of AJAX
                            
                            
                            
                            
                            
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                }
                            );
 
 
         /*****************************Using manual typing to search for events*******************************/
 
         //When the user types an event sport name, dynamically update DOM as soon as we find a match
         //(Ex: "Soc" matches "soccer" and we load all the soccer events
         $(document).on('input', '#SearchEventSection input',
                                                            function(event)
                                                            {
                                                                //First remove the background image
                                                                //because if the user used the dropdown menu prior, the sport SVG will stay there
                                                                $('#SearchEventSection input').css('background-image', 'none');
                        
<<<<<<< HEAD
                        
                                                                //Send an AJAX request to the server to get
                        
                        
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                //Make it all lower-case
                                                                var $UserInput = event.target.value.toLowerCase();
                        
                        
<<<<<<< HEAD
                        
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                //Write a switch statement
                                                                switch( true)
                                                                {
                                                                    //This means $UserInput contains the word "socc"
                                                                    case ($UserInput.indexOf("socc") > -1):
                                                                                                            console.log('soccer');
                                                                                                            break;
                        
                                                                    case ($UserInput.indexOf("basket") > -1):
                                                                                                            console.log('basketball');
                                                                                                            break;
                        
                                                                    case ($UserInput.indexOf("volley") > -1):
                                                                                                            console.log('volleyball');
                                                                                                            break;
                        
                                                                    case ($UserInput.indexOf("swimm") > -1):
                                                                                                            console.log('swimming');
                                                                                                            break;
                        
                                                                    default: console.log('failed');
                        
                                                                }
                        

                      
<<<<<<< HEAD
                        
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                            }
                        
                        
                        );
 
 
 
 
 
 
 
 
 
 
 
 
             //When the user clicks on the "AddEvent" SVG, Create a form element for the user to create events
             $(document).on('click', '#AddEvent',
                            
                                                function()
                                                {
                            
                                                    //Remove all other displayed information about "About" (if exists)
                                                    $('#AboutUser').remove();
                            
                                                    //Remove all other displayed information about "Friends" (if exists)
                                                    $('#FriendsofUser').remove();
                            
                                                    //Remove all other displayed information about "Reviews" (if exists)
                                                    $('#ReviewsofUser').remove();
                                                    $('#SportingEventReview').remove();
                            
                                                    //Remove all other displayed information about "Upcoming Events" (if exists)
                                                    $('#EventsofUser').remove();
                                                    //Remove all info about the selected event
                                                    $('#SelectedEvent').remove();
                            
                                                    //Remove all other displayed information about "SearchEvent" (if exists)
                                                    $('#SearchEventSection').remove();
                            
<<<<<<< HEAD
                                                    $('#EventSuccessful').hide();
                            
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                            
                            
                                                    //Only run function if CreateEventSection information is not displayed
                                                    if( $('#CreateEventSection').length == 0 )
                                                    {
                                                    
                                                    
                                                        //Create a section to show the add event form
                                                        var $CreateEvent = $('<section>',
                                                                                         {
                                                                                            id: 'CreateEventSection'
                                                                                         }
                                                                             );
                            
                                                        //Blur background first
                                                        $('#ProfileHeader').wrap('<div class="blur-all">');
                            
                            
                            
                                                        //insert $CreateEvent after the #ProfileHeader
                                                        //Update: insert $CreateEvent after the Blurred Background
                                                        $CreateEvent.insertAfter('.blur-all');
                                                        
                                                        
                                                        
                                                        //Create a form for the user to be able to create events
                                                        var $CreateEventForm = $('<form>',
                                                                                         {
<<<<<<< HEAD
                                                                                            id: 'CreateEventForm',
                                                                                            action: '/CreateNewEvent',
                                                                                            method: 'POST'
=======
                                                                                            id: 'CreateEventForm'
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                                         }
                                                                                 );
                                                        
                                                        //Append it to the CreateEvent
                                                        $CreateEvent.append($CreateEventForm);
                                                        
                            
                            
                            
                                                        //Creating input types
                            
                            
                            
                                                        //Create a label for Event Name
                                                        var $EventNameLabel = $('<label>',
                                                                                          {
                                                                                            id: 'EventNameLabel',
                                                                                            class: 'CreateEventLabel'
                                                                                          }
                                                                                ).append(
                                                                                         $('<span>',     //Whats shown next to the input
                                                                                                   {
                                                                                                      text: 'Event Name'
                                                                                                   }
                                                                                           )
                                                                                        ).append(
                                                                                                 $('<input>',     //Input for the EventName
                                                                                                           {
<<<<<<< HEAD
                                                                                                              type: 'text',
                                                                                                              name: 'EventName',
                                                                                                               required: "true"
=======
                                                                                                              type: 'text'
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                                                           }
                                                                                                  )
                                                                                                );
                            
                                                        
                                                        //Append it to the CreateEventForm
                                                        $CreateEventForm.append($EventNameLabel);
                            
                            
                            
                                                        //Create a label for Event Type
                                                        var $EventTypeLabel = $('<label>',
                                                                                        {
                                                                                          id: 'EventTypeLabel',
                                                                                          class: 'CreateEventLabel'
                                                                                        }
                                                                                ).append(
                                                                                         $('<span>',     //Whats shown next to the input
                                                                                                   {
                                                                                                     text: 'Event Type'
                                                                                                   }
                                                                                           )
                                                                                         ).append(
                                                                                                  $('<input>',     //Input for the EventType
                                                                                                            {
<<<<<<< HEAD
                                                                                                              type: 'text',
                                                                                                              name: 'EventType',
                                                                                                              required: "true"
                                                                                                            }
                                                                                                    )
                                                                                                  );
                            
                            
=======
                                                                                                              type: 'text'
                                                                                                            }
                                                                                                    )
                                                                                                  );

>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                        //Append it to the CreateEventForm
                                                        $CreateEventForm.append($EventTypeLabel);
                            
                            
                                                    //Make the EventType input form readonly so the user can't type invalid sports
                                                    $('#EventTypeLabel input').prop("readonly", true);
                            
<<<<<<< HEAD
                            
                                                    //Default value for the sport picker is Football
                                                    //So the user, doesn't leave it emopty
                                                    $('#EventTypeLabel input').val( 'Football');
                                                    $('#EventTypeLabel input').css( 'background-image', 'url("./assets/images/football.svg")');
                                                    $('#EventTypeLabel input').css( 'background-repeat' , 'no-repeat');
                                                    $('#EventTypeLabel input').css( 'background-size', '14px');
                                                    $('#EventTypeLabel input').css('background-position', '3px 5px');
                            
=======
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c

                            
                                                    //Create a div for AvailableEventTypes
                                                    var $AvailableEventTypes = $('<div>',
                                                                                          {
                                                                                              id: 'AvailableEventTypes',
                                                                                              //Initially hide it, only show it when user clicks on the input
                                                                                              class: 'HideAvailableEventTypes'
                                                                                          }
                                                                                );
                            
                            
                                                    $EventTypeLabel.append($AvailableEventTypes);
                            
                            
                                                    //Create a <ul> for AvailableEventTypes
                                                    var $AvailableEventTypesUL = $('<ul>',
                                                                                         {
                                                                                            id: 'AvailableEventTypesUL'
                                                                                         }
                                                                                 );
                            
                                                     //Append the <ul> to the <div>
                                                     $AvailableEventTypes.append($AvailableEventTypesUL);
                            
                            
                                                     //When the DB is set, we should make an .ajax call and loop over the sports available in the DB
                                                    //Loop over all the sporting events available and append them
                                                    $.each(Sports,
                                                                   function(index, item)
                                                                   {

                                                                       //Now add the available sports to each <li>
                                                                       var $IndividualEventType = $('<li>',
                                                                                                          {
                                                                                                            class: 'IndividualEventType'
                                                                                                          }
                                                                                                  );
                                                           
                                                                       //Now add the SVG of the sport first
                                                                       var $IndividualEventImg = $('<img>',
                                                                                                            {
                                                                                                                src: item.url,
                                                                                                                width: '11px'
                                                                                                            }
                                                                                                    );
                                                           
                                                                       //Now add the name of the sport
                                                                       var $IndividualEventName = $('<p>',
                                                                                                           {
                                                                                                             text: item.EventName
                                                                                                           }
                                                                                                   );

                                                                       $IndividualEventType.append($IndividualEventImg);  //Append the Sport SVG to the <li>
                                                                       $IndividualEventType.append($IndividualEventName);  //Append the sport name to the <li>
                                                                       $AvailableEventTypesUL.append($IndividualEventType);  //Append the  <li> to the <ul>
                                                           
                                                                   }
                                                           );
                        
        
                            
                            
                            
                        
                                                        //Create a label for Event Numppl
                                                        var $EventNumpplLabel = $('<label>',
                                                                                            {
                                                                                              id: 'EventNumpplLabel',
                                                                                              class: 'CreateEventLabel'
                                                                                            }
                                                                                ).append(
                                                                                         $('<span>',     //Whats shown next to the input
                                                                                                   {
                                                                                                      text: 'Number of people'
                                                                                                   }
                                                                                           )
                                                                                         ).append(
                                                                                                  $('<input>',     //Input for the EventName
                                                                                                              {
<<<<<<< HEAD
                                                                                                                type: 'number',
                                                                                                                name: 'EventNumppl',
                                                                                                                required: "true"
=======
                                                                                                                type: 'number'
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                                                              }
                                                                                                    )
                                                                                                  );
                                                        
                                                        
                                                        //Append it to the CreateEventForm
                                                        $CreateEventForm.append($EventNumpplLabel);
                            
                            
                            
                                                        //Create a label for Event DateTime
                                                        var $EventDateTimeLabel = $('<label>',
                                                                                              {
                                                                                                id: 'EventDateTimeLabel',
                                                                                                class: 'CreateEventLabel'
                                                                                              }
                                                                                  ).append(
                                                                                           $('<span>',     //Whats shown next to the input
                                                                                                     {
                                                                                                       text: 'Event Date & Time'
                                                                                                     }
                                                                                             )
                                                                                           ).append(
                                                                                                    $('<input>',     //Input for the EventDate and Time
                                                                                                                {
                                                                                                               //   type: 'datetime-local',
                                                                                                                    type: 'text',
<<<<<<< HEAD
                                                                                                                    class:'DateTimePicker_Event',
                                                                                                                    name: 'EventDateTime',
                                                                                                                    required: "true"
=======
                                                                                                                    class:'DateTimePicker_Event'
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                                                                }
                                                                                                      )
                                                                                                    );
                            
                            
                                                        //Append it to the CreateEventForm
                                                        //Once its appended and ready in the DOM, call the .datetimepicker()
                                                        $CreateEventForm.append($EventDateTimeLabel).ready(
                                                                                                           function() {
                                                                                                                        $('.DateTimePicker_Event').datetimepicker({
                                                                                                                                                                      formatTime:'g:i A', //Use AM | PM
                                                                                                                                                                      format:'M d Y h:i A',
                                                                                                                                                                      step:15,
                                                                                                                                                                      minDate:'0' //Can't choose past Dates for creating event
                                                                                                                                                                  });
                                                                                                                      }
                                                                                                           );
                            
                            
                                                        //Create a label for Event EndTime
                                                        var $EventEndTimeLabel = $('<label>',
                                                                                            {
                                                                                              id: 'EventEndTimeLabel',
                                                                                              class: 'CreateEventLabel'
                                                                                            }
                                                                                    ).append(
                                                                                             $('<span>',     //Whats shown next to the input
                                                                                                       {
                                                                                                         text: 'Event End Time'
                                                                                                       }
                                                                                               )
                                                                                             ).append(
                                                                                                      $('<input>',     //Input for the Event EndTime
                                                                                                                    {
                                                                                                                      type: 'text',
<<<<<<< HEAD
                                                                                                                      class:'TimePicker_Event',
                                                                                                                      name: 'EventEndTime',
                                                                                                                      required: "true"
=======
                                                                                                                      class:'TimePicker_Event'
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                                                                    }
                                                                                                        )
                                                                                                      );
                                                        
                                                        
                                                        //Append it to the CreateEventForm
                                                        //Once its appended and ready in the DOM, call the .datetimepicker()
                                                        $CreateEventForm.append($EventEndTimeLabel).ready(
                                                                                                          function() {
                                                                                                                  $('.TimePicker_Event').datetimepicker({
                                                                                                                                                            datepicker:false, //Can't pick dates
                                                                                                                                                            step:15,
                                                                                                                                                            formatTime:'g:i A', //Use AM | PM
                                                                                                                                                            format: 'h:i A'
                                                                                                                                                        });
                                                                                                                    }
                                                                                                          );
                            
                            
                            
                            
                            
                                                        //Create a label for Event Location
                                                        var $EventLocationLabel = $('<label>',
                                                                                               {
                                                                                                 id: 'EventLocationLabel',
                                                                                                 class: 'CreateEventLabel'
                                                                                               }
                                                                                   ).append(
                                                                                            $('<span>',     //Whats shown next to the input
                                                                                                      {
                                                                                                        text: 'Event Location'
                                                                                                      }
                                                                                              )
                                                                                            ).append(
                                                                                                     $('<input>',     //Input for the Event Location
                                                                                                                   {
                                                                                                                    type: 'text',
<<<<<<< HEAD
                                                                                                                    class:'TimePicker_Event',
                                                                                                                    name: 'EventLocation',
                                                                                                                    required: "true"
=======
                                                                                                                    class:'TimePicker_Event'
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                                                                   }
                                                                                                       )
                                                                                                     );
                                                        
                                                        
                                                        //Append it to the CreateEventForm
                                                        $CreateEventForm.append($EventLocationLabel);

                            
                                                        //Create a label for Event Description
                                                        var $EventDescriptionLabel = $('<label>',
                                                                                                {
                                                                                                  id: 'EventDescriptionLabel',
                                                                                                  class: 'CreateEventLabel'
                                                                                                }
                                                                                    ).append(
                                                                                             $('<span>',     //Whats shown next to the input
                                                                                                       {
                                                                                                         text: 'Event Description'
                                                                                                       }
                                                                                               )
                                                                                             ).append(
                                                                                                      $('<textarea>',     //Input for the Event Description
                                                                                                                    {
                                                                                                                      placeholder: 'Brief Description of event',
                                                                                                                      rows: 4,
<<<<<<< HEAD
                                                                                                                      maxlength: 400,
                                                                                                                      name: 'EventDescription',
                                                                                                                      required: "true"
=======
                                                                                                                      maxlength: 400
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                                                                                    }
                                                                                                        )
                                                                                                      );
                                                        
                                                        
                                                        //Append it to the CreateEventForm
                                                        $CreateEventForm.append($EventDescriptionLabel);
                            
                            
                            
                                                        //Add the submit button
                                                        //Create a label for Event Description
                                                        var $CreateEventSubmit = $('<input>',
                                                                                               {
                                                                                                 type: 'submit',
                                                                                                 id: 'CreateEventSubmit',
                                                                                                 value: 'Create Event'
                                                                                               }
                                                                                   );
                                                        
                                                        
                                                        //Append it to the CreateEventForm
                                                        $CreateEventForm.append($CreateEventSubmit);
                            
                            
                            
                                                        //Append the close event SVG sign
                                                        var $CloseEvent = $('<img>',
                                                                                   {
                                                                                       src: './assets/images/Close_Message.svg',
                                                                                       width: '15px',
                                                                                       id: 'CloseEventButton'
                                                                                   }
                                                                           );
                            
                            
                                                        //Append it to the CreateEvent
                                                        $CreateEvent.append($CloseEvent);
                            
                            

                            
                            
                            
                                                    }
                            
                                                }
                            
                            
                            );

 
 
 
             //Clicking on the CloseEventButton SVG, it removes the event
             $(document).on('click', '#CloseEventButton',
                            
                                                        function()
                                                        {
<<<<<<< HEAD
                            
                                                            //Remove the datepicker
                                                            $('.xdsoft_datetimepicker').remove();
                                                            //Remove the event creation section
                                                            $('#CreateEventSection').remove();
             
=======
                                                        
                                                            //Remove the event creation section
                                                            $('#CreateEventSection').remove();
                         
>>>>>>> c2256b06fa6ca23386cfedaf2ce6d6694005867c
                                                            //unwrap div with the class for blurring the background from #ProfileHeader
                                                            $('#ProfileHeader').unwrap();

                                                        }
                            );
 
 
 
 
             //Clicking on the #EventTypeLabel form input, opens the sport picker and clicking again toggles/closes it
             $(document).on('click', '#EventTypeLabel input',
                            
                                                            function()
                                                            {
                                                                //Toggle the sport picker
                                                                $('#AvailableEventTypes').toggleClass( 'HideAvailableEventTypes' );
                                                            }
                            );
 
 
             //Clicking on any .CreateEventLabel form input
             $(document).on('click', '#CreateEventForm .CreateEventLabel',
                            
                                                            function()
                                                            {
                                                                //Only remove the sport picker, if we did NOT click on #EventTypeLabel
                                                                if( $(this).attr('id') != 'EventTypeLabel' )
                                                                {
                                                                    //If the sport picker is not hidden, and is being shown
                                                                    if( !$('#AvailableEventTypes').hasClass( 'HideAvailableEventTypes' ) )
                                                                    {
                                                                       //Hide the sport picker
                                                                       $('#AvailableEventTypes').addClass( 'HideAvailableEventTypes' );
                                                                    }
                                                                }
                                                            }
                            );
 
 

             //When the user clicks on any of the sports in the EventType input form, update the form value with that event
             $(document).on('click', '#AvailableEventTypes #AvailableEventTypesUL li',
                                                                                     function()
                                                                                     {
                                                                                       //Change the form input value to that sport
                                                                                       $('#EventTypeLabel input').val( $(this).children('p').text() );
                            
                                                    //Add the sport event SVG to the form input
                                                    $('#EventTypeLabel input').css( 'background-image', 'url(' + $(this).children('img').attr('src') + ')');
                                                    $('#EventTypeLabel input').css( 'background-repeat' , 'no-repeat');
                                                    $('#EventTypeLabel input').css( 'background-size', '14px');
                                                    $('#EventTypeLabel input').css('background-position', '3px 5px');
                                                                                     }
                            );
 
 
             $.datetimepicker.setLocale('en');

 
 
 
 
 
 
 
 
 
    } //End of $(document).ready function




);



function formatAMPM(date)
{
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}




















