var streamers = ["ESL_SC2", "OgamingSC2","comster404", "cretetion", "freecodecamp", "brunofin","storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var online = [], offline =[], all = [];
var container = $('.results-section');
var onlineContainer = $('.results .online-stream-users');
var offlineContainer = $('.results .offline-stream-users');

$(document).ready(function(){
  getStreaming();  
  //active class interchange
  $(".availability ul li").on('click',function(){
    $('.availability ul').find('.active').removeClass('active');
    $(this).addClass('active');
  });
  $(".all").on('click',function(){
    $('.results-section .offline-section').show();
    $('.results-section .online-section').show();    
    $('.results-section .closed-section').show();
    // $('.stream-users').show();
    // $('.online-stream-users').hide();
    // $('.offline-stream-users').hide();
  });
  $(".online").on('click',function(){    
    $('.results-section .online-section').show();
    $('.results-section .offline-section').hide();
    $('.results-section .closed-section').hide();
    // $('.online-stream-users').show();
    // $('.stream-users').hide();
    // $('.offline-stream-users').hide();    
    // onlineContainer.empty();
    // online.forEach(function(item){      
    //   onlineContainer.prepend('<li><div><img class="img-circle" src="'+item.channel.logo +'"/><a href='+ item.channel.url +' target="_blank">'+ item.channel.display_name +'</a><span>'+ item.game +':'+item.channel.status +'</span></div></li>');
    // });
  });
  $(".offline").on('click',function(){
    $('.results-section .offline-section').show();
    $('.results-section .online-section').hide();    
    $('.results-section .closed-section').hide();
    // $('.offline-stream-users').show();
    // $('.stream-users').hide();
    // $('.online-stream-users').hide();
  //   offlineContainer.empty();
  //   offline.forEach(function(result){
  //     offlineContainer.append('<li><div><img class="img-circle" src="'+result.logo +'"/><a href='+ result.url +' target="_blank">'+ result.display_name +'</a><span>Offline</span></div></li>');
  //   });
  // }); 
  
});
});
function getStreaming(){    
  streamers.forEach(function(entry){
    streamToDisplay(entry);
  });  
}

function streamToDisplay(user){
    $.getJSON('https://api.twitch.tv/kraken/streams/'+ user +'?callback=?',function(result){
      var resObject = result;
      if(resObject.hasOwnProperty("stream")){
        var item = resObject.stream;
        //Online
        if(item !== null){
          online.push(item);
      container.prepend('<div class="row online-section">'+
                        '<div class="col-sm-2 col-xs-12"><img class="img-circle" src="'+item.channel.logo +'"/></div>'+
                        '<div class="col-sm-3 col-xs-12"><a href='+ item.channel.url +' target="_blank">'+ item.channel.display_name +'</a></div>'+
                        '<div class="col-sm-6 col-xs-12"><span>'+ item.game +'</span></div></div>');
        }
        else{   
          //Offline          
          $.getJSON('https://api.twitch.tv/kraken/channels/'+ user +'',function(result){
            offline.push(result);
            // console.log("Offline : " + result);
            container.append('<div class="row offline-section">'+
                              '<div class="col-sm-2 col-xs-12"><img class="img-circle" src="'+result.logo +'"/></div>'+
                              '<div class="col-sm-3 col-xs-12"><a href='+ result.url +' target="_blank">'+  result.display_name +'</a></div>'+
                              '<div class="col-sm-6 col-xs-12"><span>Offline</span></div></div>');          
        }); 
        }
      }
      //Account closed
      if(resObject.hasOwnProperty("error")){   
            container.append('<div class="row closed-section">'+
                              '<div class="col-sm-2 col-xs-12"><img class="img-circle" src="https://static-cdn.jtvnw.net/jtv_user_pictures/ogamingsc2-profile_image-9021dccf9399929e-300x300.jpeg/"/></div>'+
                              '<div class="col-sm-3 col-xs-12"><a href="/404'+ user +'" target="_blank">'+ user +'</a></div>'+
                              '<div class="col-sm-6 col-xs-12"><span>Account closed</span></div></div>');
      }     
    });  
};