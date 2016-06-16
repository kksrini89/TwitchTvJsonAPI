/**
 * Created by srini on 14-06-2016.
 */
var streamers = ["ESL_SC2", "OgamingSC2","comster404", "cretetion", "freecodecamp", "brunofin","storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var online = [], offline =[], all = [];
var container = $('.results .stream-users');
var onlineContainer = $('.results .online-stream-users');
var offlineContainer = $('.results .offline-stream-users');

$(document).ready(function(){
    getStreaming();
    $(".availability ul li span").on('click',function(){
        $('.availability ul').find('.active').removeClass('active');
        $(this).addClass('active');
    });
    $(".all").on('click',function(){
        $('.stream-users').show();
        $('.online-stream-users').hide();
        $('.offline-stream-users').hide();
    });
    $(".online").on('click',function(){
        $('.online-stream-users').show();
        $('.stream-users').hide();
        $('.offline-stream-users').hide();
        console.log(online);
        onlineContainer.empty();
        online.forEach(function(item){
            onlineContainer.prepend('<li><div><img class="img-circle" src="'+item.channel.logo +'"/><a href='+ item.channel.url +' target="_blank">'+ item.channel.display_name +'</a><span>'+ item.game +'</span></div></li>');
        });
    });
    $(".offline").on('click',function(){
        $('.offline-stream-users').show();
        $('.stream-users').hide();
        $('.online-stream-users').hide();
        offlineContainer.empty();
        offline.forEach(function(result){
            offlineContainer.append('<li><div><img class="img-circle" src="'+result.logo +'"/><a href='+ result.url +' target="_blank">'+ result.display_name +'</a><span>'+ result.game +'</span></div></li>');
        });
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
                container.prepend('<li><div><img class="img-circle" src="'+item.channel.logo +'"/><a href='+ item.channel.url +' target="_blank">'+ item.channel.display_name +'</a><span>'+ item.game +'</span></div></li>');
            }
            else{
                //Offline
                $.getJSON('https://api.twitch.tv/kraken/channels/'+ user +'',function(result){
                    offline.push(result);
                    // console.log("Offline : " + result);
                    container.append('<li><div><img class="img-circle" src="'+result.logo +'"/><a href='+ result.url +' target="_blank">'+ result.display_name +'</a><span>'+ result.game +'</span></div></li>');
                });
            }
        }
        //Account closed
        if(resObject.hasOwnProperty("error")){
            container.append('<li><div><img class="img-circle" src="https://static-cdn.jtvnw.net/jtv_user_pictures/ogamingsc2-profile_image-9021dccf9399929e-300x300.jpeg/"/><a href="/404'+ user +'" target="_blank">'+ user +'</a><span>Account closed</span></div></li>');
        }
    });
};