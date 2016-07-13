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
                        
                                                    //Remove all other displayed information about "Upcoming Events" (if exists)
                                                    $('#EventsofUser').remove();
                        
                                                    //Remove all other displayed information about "Searching Events" (if exists)
                                                    $('#SearchEventSection').remove();
                                                    
                                                    //Remove all other displayed information about "Creating Events" (if exists)
                                                    $('#CreateEventSection').remove();
                                                    //unwrap div with the class for blurring the background from #ProfileHeader
                                                    $('#ProfileHeader').unwrap();
                        
                        
                        
                        
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
                            
                                                        //Remove all other displayed information about "Searching Events" (if exists)
                                                        $('#SearchEventSection').remove();
                                                        
                                                        //Remove all other displayed information about "Creating Events" (if exists)
                                                        $('#CreateEventSection').remove();
                                                        //unwrap div with the class for blurring the background from #ProfileHeader
                                                        $('#ProfileHeader').unwrap();
                            
                            
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

 
 
 
 
                 var sport_list = ["Hockey", "Soccer", "Archery", "Artistic Gymnastics", "Badminton",
                                   "Basketball", "Volleyball", "Boxing", "Canoe Slalom", "Canoe Sprint",
                                   "Cycling Track", "Diving", "Equestrian", "Fencing", "Football"];
 
 
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
 
                 var about_order = ["Campus", "Given_Name", "Family_Name", "Phone_number", "Email_Address",
                                    "Birthday", "Height", "Weight", "Gender", "About_Me", "Sports"];
 
 
                 //When the user clicks on the "About" Tab, show all info about the user
                $(document).on('click', '#UserAbout', userAboutClickFcn);
 
                                                    function userAboutClickFcn()
                                                    {
                                
                                                            
                                                            //Remove all other displayed information about "Friends" (if exists)
                                                            $('#FriendsofUser').remove();
                                                            
                                                            //Remove all other displayed information about "Reviews" (if exists)
                                                            $('#ReviewsofUser').remove();
                                                            $('#SportingEventReview').remove();
 
                                                             //Remove all other displayed information about "Upcoming Events" (if exists)
                                                             $('#EventsofUser').remove();
 
                                                            //Remove all other displayed information about "Searching Events" (if exists)
                                                            $('#SearchEventSection').remove();
                                
                                                            //Remove all other displayed information about "Creating Events" (if exists)
                                                            $('#CreateEventSection').remove();
                                                            //unwrap div with the class for blurring the background from #ProfileHeader
                                                            $('#ProfileHeader').unwrap();
                                
 
 
 
                                
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
                                                                
                                                                
                                                                if (about_mockData[about_order[i]].length > 20)
                                                                {
                                                                $info = $('<fieldset/>', {
                                                                          class: "field_sports",
                                                                          width: "50%"
                                                                          });
                                                                } else {
                                                                $info = $('<fieldset/>', {
                                                                          class: "field_sports"
                                                                          });
                                                                }
                                                                
                                                                
                                                                
                                                                
                                                                $label_text = $('<legend/>', {
                                                                                class: "label",
                                                                                text: about_order[i].replace("_", " ") + ":"
                                                                                });
                                                                
                                                                $info.append($label_text);
                                                                $info.append($br);
                                                                
                                                                var len = about_mockData[about_order[i]].length;
                                                                
                                                                //each column contains max. 20 elements.
                                                                var num_col = Math.ceil(len/20);
                                                                
                                                                for (var col = 0; col < num_col; col++) {
                                                                var $article = $('<article/>', {
                                                                                 class: "column"
                                                                                 });
                                                                
                                                                var $ul = $('<ul/>');
                                                                
                                                                //number of elements in column excluding previous column.
                                                                var num = len - col * 20;
                                                                var j = 0;
                                                                while (j < 20 && j < num) {
                                                                var $li = $('<li/>');
                                                                
                                                                var $sport = $('<input>', {
                                                                               type: "checkbox",
                                                                               name: about_order[i],
                                                                               value: about_mockData[about_order[i]][j + col * 20],
                                                                               disabled: "disabled",
                                                                               checked: "checked"
                                                                               });
                                                                
                                                                var $text = $('<span/>', {
                                                                              text: about_mockData[about_order[i]][j + col * 20]
                                                                              });
                                                                
                                                                $li.append($sport);
                                                                $li.append($text);
                                                                
                                                                $ul.append($li);
                                                                
                                                                j++;
                                                                }
                                                                
                                                                $article.append($ul);
                                                                $info.append($article);
                                                                
                                                                }
                                                                
                                                                var $edit = $('<button/>', {
                                                                              class: "edit_button",
                                                                              text: "Edit"
                                                                              });
                                                                
                                                                $AboutSection.append($div_input);
                                                                $AboutSection.append($info);
                                                                $AboutSection.append($edit);
                                                            }
                                
                                                    }

 
 
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
                                                            
                                                            $div.insertAfter(".field_sports");
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
                                       "EventDateTime": "July 26 2016 10:00 PM",
                                       "EventEndTime": "11:00 PM",
                                       "EventLocation": "AC Field 2",
                                       "EventDescription": "We are playing 5 vs 5. Loser's team has to pay for the field!! That's how it is ;)",
                                       "EventNumPpl": "10",
                                       "EventNumSpotsLeft": "2"
                                   },
                                   
                                   {
                                       "EventName" : "Water Polo Champs",
                                       "EventType": "waterpolo",
                                       "EventDateTime": "July 28 2016 8:00 PM",
                                       "EventEndTime": "11:00 PM",
                                       "EventLocation": "AC Benson Pool",
                                       "EventDescription": "Serious game. Please only attend if you are competitive and played in varsity.",
                                       "EventNumPpl": "20",
                                       "EventNumSpotsLeft": "8"
                                   },
                                   
                                   {
                                       "EventName" : "Outdoor Soccer",
                                       "EventType": "football",
                                       "EventDateTime": "July 30 2016 10:00 PM",
                                       "EventEndTime": "11:00 PM",
                                       "EventLocation": "AC Soccer Field",
                                       "EventDescription": "We are playing 5 vs 5 half-court. Bring $10 for the field",
                                       "EventNumPpl": "10",
                                       "EventNumSpotsLeft": "5"
                                   },
                                   
                                   {
                                       "EventName" : "Lets Squash!",
                                       "EventType": "squash",
                                       "EventDateTime": "August 5 2016 3:00 PM",
                                       "EventEndTime": "4:00 PM",
                                       "EventLocation": "Harthouse Squart Courts",
                                       "EventDescription": "We are doubles 2 vs 2. Join us, just for fun! :)",
                                       "EventNumPpl": "4",
                                       "EventNumSpotsLeft": "2"
                                   }
                             ];

 
 
 
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
                                                        //unwrap div with the class for blurring the background from #ProfileHeader
                                                        $('#ProfileHeader').unwrap();
                                
                                
                                                        //Only run function if EventsofUser information is not displayed
                                                        if( $('#EventsofUser').length == 0 )
                                                        {
                                                        
                                                        
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
                                                            $.each(UserEvents,
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
                                                                               
                                                                               //Append the $EventsUL to the page
                                                                               $EventsofUser.append($EventsUL);
                                                                               
                                                                               //Append the $EventsUL to the page
                                                                               $EventsofUser.append($EventsUL);
                                                                               
                                                                               //Append the $EventsUL to the page
                                                                               $EventsofUser.append($EventsUL);
                                                                   
                                                                   
//                                                                               //The Time of the comment
//                                                                               var $commentTime = $('<p>',
//                                                                                                    {
//                                                                                                    text: item.Date,
//                                                                                                    class: 'commentTime'
//                                                                                                    }
//                                                                                                    );
//                                                                               
//                                                                               //The Content of the comment
//                                                                               var $commentContent = $('<p>',
//                                                                                                       {
//                                                                                                       text: item.Comment,
//                                                                                                       class: 'commentContent'
//                                                                                                       }
//                                                                                                       );
//                                                                               
//                                                                               
//                                                                               
//                                                                               
//                                                                               $comment.append($commentTime);  //Append the time to the <li>
//                                                                               $comment.append($commentContent);  //Append the content to the <li>
//                                                                               
//                                                                               
//                                                                               //Append the <li> comment to the <ul>
//                                                                               $CommentsUL.append($comment);
                                                                   
                                                                           }
                                                                   );

                                
                                
                                
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
                                
                                                        //Remove all other displayed information about "Upcoming Events" (if exists)
                                                        $('#EventsofUser').remove();
                                
                                                        //Remove all other displayed information about "Creating Events" (if exists)
                                                        $('#CreateEventSection').remove();
                                                        //unwrap div with the class for blurring the background from #ProfileHeader
                                                        $('#ProfileHeader').unwrap();
                                
                                
                                
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
                            
                                                    //Remove all other displayed information about "Upcoming Events" (if exists)
                                                    $('#EventsofUser').remove();
                            
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
                            
                            
                                                    //Make the EventType input form readonly so the user can't type invalid sports
                                                    $('#EventTypeLabel input').prop("readonly", true);
                            

                            
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
                                                                                                               //   type: 'datetime-local',
                                                                                                                    type: 'text',
                                                                                                                    class:'DateTimePicker_Event'
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
                                                                                                                      class:'TimePicker_Event'
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
                                                                                                                    class:'TimePicker_Event'
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


























