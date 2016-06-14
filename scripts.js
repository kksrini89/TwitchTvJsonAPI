/**
 * Created by srini on 14-06-2016.
 */
var streamers = ["ESL_SC2", "OgamingSC2","comster404", "cretetion", "freecodecamp", "brunofin","storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function(){
    getStreaming();
});

function getStreaming(){
    for(var user of streamers){
        // console.log(user);
        var container = $('.results ul');
        $.getJSON('https://api.twitch.tv/kraken/streams/'+ user +'?callback=?',function(result){
            console.log(result);
            var item = result.stream;
            if(item !== null){
                container.append('<li><div><img class="img-circle" src='+item.channel.logo +'/><a href='+ item.channel.url +' target="_blank">'+ item.channel.display_name +'</a><span>'+ item.game +'</span></div></li>');
            }
            else if(item === null){
                container.append('<li><div><img class="img-circle" src='+item.channel.logo +'/><a href='+ item.channel.url +' target="_blank">'+ item.channel.display_name +'</a><span>'+ item.game +'</span></div></li>');
            }
        }
    });
}
}
