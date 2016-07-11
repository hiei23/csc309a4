//once the document has loaded
$(document).ready
(
    function()
    {
 
 
 
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
 

 
        //Get the window height for the chat box
        $Window_Height = $(window).height();
 
 
        //Update window_height if browser is resized
         $(window).resize
         (
              function()
              {
                  //Update Window_Height
                  $Window_Height = $(window).height();
          
          
                  //If the chatbox exists, reposition it when window is resized
                  if( $('#ChatBox').length > 0 )
                  {
                       $('#ChatBox').css('top', $Window_Height -  $('#ChatBox').height() );
                       $('#ChatBoxForm').css('top', $Window_Height -  $('#ChatBoxForm').height() );
                  }
          
          
                    //For RESPONSIVE DESIGN
//                  //make a menu button
//                  if( $Window_Width < 480  )
//                  {
//                  
//                  //hide the nav ul
//                  $('nav ul').addClass('hide');
//                  
//                  //check if svg already exists
//                  if( $('.menusvg').length > 0 )  {}
//                  
//                  
//                  //doesn't exist so add it
//                  else
//                  {
//                  $('<img>',
//                    {
//                    src: './assets/images/menu.svg',
//                    'class': 'menusvg'
//                    }
//                    
//                    ).appendTo('nav');
//                  
//                  },
//                  
//                  }
//                  
//                  // $Window_Width is >= 480
//                  else
//                  {
//                  //if the menu svg icon exists, remove it
//                  if( $('.menusvg').length > 0 )
//                  {
//                  $('.menusvg').remove();
//                  //unhide the nav ul
//                  $('nav ul').removeClass('hide');
//                  }
//              
//              }
          
          }
     );
 
        //Now When the user clicks on the "FB_Message_SVG" on the top right corner
        //make a ChatBox pop up at the bottom of the screen like facebook
        $(document).on('click', '#FB_Message_SVG',
            
                                function()
                                {
                       
                                //If a ChatBox exists, don't make a new one
                                if( $('#ChatBox').length == 0 )
                                {
                       
                                    //Create a dynamic div for the chatbox header
                                    var $ChatBoxHeader = $('<div>',
                                                                    {
                                                                      id: 'ChatBoxHeader'
                                                                    }
                                                          );
                       
                                    //Name of the user we want to message to
                                    var $UserName =  $('<p>',
                                                              {
                                                                text: 'Parham Oghabi',
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
 
 
 
         //When the user clicks on the "Friends" Tab, show all the Friends of the user
         $(document).on('click', '#UserFriends',
                        
                                                function()
                                                {
                        
                                                    //Remove all other displayed information about "About" (if exists)
                                                    $('#AboutUser').remove();
                        
                                                    //Remove all other displayed information about "Reviews" (if exists)
                                                    $('#ReviewsofUser').remove();
                                                    $('#SportingEventReview').remove();
                        
                                                    //Remove all other displayed information about "Searching Events" (if exists)
                                                    $('#SearchEventSection').remove();
                                                    
                                                    //Remove all other displayed information about "Creating Events" (if exists)
                                                    $('#CreateEventSection').remove();
                        
                        
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
       
                                                        //Remove all other displayed information about "About" (if exists)
                                                        $('#AboutUser').remove();
                            
                                                        //Remove all other displayed information about "Friends" (if exists)
                                                        $('#FriendsofUser').remove();
                                                        
                                                        //Remove all other displayed information about "Searching Events" (if exists)
                                                        $('#SearchEventSection').remove();
                                                        
                                                        //Remove all other displayed information about "Creating Events" (if exists)
                                                        $('#CreateEventSection').remove();
                                                        
                            
                            
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

 
 
 
 
                 //When the user clicks on the "About" Tab, show all info about the user
                 $(document).on('click', '#UserAbout',
                                
                                                    function()
                                                    {
                                
                                                            
                                                            //Remove all other displayed information about "Friends" (if exists)
                                                            $('#FriendsofUser').remove();
                                                            
                                                            //Remove all other displayed information about "Reviews" (if exists)
                                                            $('#ReviewsofUser').remove();
                                                            $('#SportingEventReview').remove();
                                
                                                            //Remove all other displayed information about "Searching Events" (if exists)
                                                            $('#SearchEventSection').remove();
                                
                                                            //Remove all other displayed information about "Creating Events" (if exists)
                                                            $('#CreateEventSection').remove();
                                
                                
                                
                                
                                                            //Only run function if About information is not displayed
                                                            if( $('#AboutUser').length == 0 )
                                                            {
                                                            
                                                            
                                                                //Create a section to info about the user
                                                                var $AboutSection = $('<section>',
                                                                                                    {
                                                                                                        id: 'AboutUser'  //Please don't change this ID
                                                                                                    }
                                                                                     );

                                                                
                                                                //insert $AboutSection after the #ProfileHeader
                                                                $AboutSection.insertAfter('#ProfileHeader');
                                
                                
                                                                //ADD CODE HERE
                                
                                
                                
                                
                                                            }
                                
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
                                
                                                        //Remove all other displayed information about "Creating Events" (if exists)
                                                        $('#CreateEventSection').remove();
                             
                                
                                
                                                        
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
                                                                                 );
                                
                                                            //Append it to the SearchEvent
                                                            $SearchEvent.append($SearchEventForm);
                                
                                
                             
       
                                
                                
//                                
//                                                                   //$Friend has the image and the friend name
//                                                                   var $sport = $('<li>',
//                                                                                  {
//                                                                                  class: 'SportingEvent'
//                                                                                  }
//                                                                                  );
//                                                                   
//                                                                   //$Friend has the image and the friend name
//                                                                   var $sportImage = $('<img>',
//                                                                                       {
//                                                                                       src: item.url,
//                                                                                       width: '30px'
//                                                                                       }
//                                                                                       );
//                                                                   
//                                                                   $sport.append($sportImage);  //Append the sportImage to the <li>
//                                                                   
//                                                                   $SportsPlayed.append($sport);  //Append the SportingEvent to the <ul>
                                
                                                                  
                                                        
                                                        }
                                
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
                                                    
                                                    //Remove all other displayed information about "SearchEvent" (if exists)
                                                    $('#SearchEventSection').remove();
                            
                                                    
                                                    
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
                                                                                            id: 'CreateEventForm'
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
                                                                                                              type: 'text'
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
                                                                                                              type: 'text'
                                                                                                            }
                                                                                                    )
                                                                                                  );
                                                        
                                                        
                                                        //Append it to the CreateEventForm
                                                        $CreateEventForm.append($EventTypeLabel);
                            
                            
                        
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
                                                                                                                type: 'number'
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
                                                                                                                  type: 'datetime-local'
                                                                                                                }
                                                                                                      )
                                                                                                    );
                                                        
                                                        
                                                        //Append it to the CreateEventForm
                                                        $CreateEventForm.append($EventDateTimeLabel);

                            
                            
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
                                                                                                                      type: 'time'
                                                                                                                    }
                                                                                                        )
                                                                                                      );
                                                        
                                                        
                                                        //Append it to the CreateEventForm
                                                        $CreateEventForm.append($EventEndTimeLabel);
                            
                            
                            
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
                                                                                                                   type: 'text'
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
                                                                                                                      rows: 4
                                                                                                        
                                                                                                        
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
                                                        
                                                            //Remove the event creation section
                                                            $('#CreateEventSection').remove();
                         
                                                            //unwrap div with the class for blurring the background from #ProfileHeader
                                                            $('#ProfileHeader').unwrap();
                            
                            
       
                            
                                                        }
                            );

 
    } //End of $(document).ready function




);


























