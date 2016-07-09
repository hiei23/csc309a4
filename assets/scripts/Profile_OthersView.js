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

 
 
 
 
    }




);


























