/**
 * Created by srini on 14-06-2016.
 */
var streamers = ["ESL_SC2", "OgamingSC2","comster404", "cretetion", "freecodecamp", "brunofin","storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var online = [], offline =[], all = [];

$(document).ready(function(){
    getStreaming();
    $(".availability ul li").hover(function(){
        //$(this)
    });
});

function getStreaming(){
    streamers.forEach(function(entry){
        streamToDisplay(entry);
    });
}

function streamToDisplay(user){
    var container = $('.results .stream-users');
    var onlineContainer = $('.results .online-stream-users');
    var offlineContainer = $('.results .offline-stream-users');
    $.getJSON('https://api.twitch.tv/kraken/streams/'+ user +'?callback=?',function(result){
        var resObject = result;
        if(resObject.hasOwnProperty("stream")){
            var item = resObject.stream;
            if(item !== null){
                online.push(item);
                container.prepend('<li><div><img class="img-circle" src="'+item.channel.logo +'"/><a href='+ item.channel.url +' target="_blank">'+ item.channel.display_name +'</a><span>'+ item.game +'</span></div></li>');
            }
            else{
                offline.push(user);
                $.getJSON('https://api.twitch.tv/kraken/channels/'+ user +'',function(result){
                    // console.log("Offline : " + result);
                    container.append('<li><div><img class="img-circle" src="'+result.logo +'"/><a href='+ result.url +' target="_blank">'+ result.display_name +'</a><span>'+ result.game +'</span></div></li>');
                });
            }
        }
        if(resObject.hasOwnProperty("error")){
            container.append('<li><div><img class="img-circle" src="https://static-cdn.jtvnw.net/jtv_user_pictures/ogamingsc2-profile_image-9021dccf9399929e-300x300.jpeg/"/><a href="/404'+ user +'" target="_blank">'+ user +'</a><span>Account closed</span></div></li>');
        }
    });
};