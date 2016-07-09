//once the document has loaded
$(document).ready
(
    function()
    {
 
         //Choose a random banner for the front page everytime
         var BannerIndex = Math.floor(Math.random() * 2) + 1 ;
         var imageUrl = './assets/images/Banner-' + BannerIndex + '.jpg';
         
         //Set a random banner
         $('.BannerContent-Wrapper').css('background-image', 'url(' + imageUrl + ')');
         

 
 
 
 
    }




);


























