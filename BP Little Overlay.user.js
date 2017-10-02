// ==UserScript==
// @name         BP Little Overlay
// @namespace    http://tampermonkey.net/
// @version      1.2.61
// @description  Little overlay for BombParty
// @downloadURL  https://github.com/SuperRandomGuy/Bombparty/blob/master/BP%20Little%20Overlay.user.js
// @author       Nicroc
// @match        http://bombparty.sparklinlabs.com/play/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
        document.head.appendChild(script);
    channel.refreshAds = function nothing(){};
    function loadSettingsOverlay(){
        var option = document.createElement('tr');
 var optionName = document.createElement('td');
 optionName.style.background = "rgb(118, 118, 118);";
 optionName.setAttribute('id','optionDetect');
optionName.innerHTML = "Changer de fond";
optionName.setAttribute('title',"Mettez un lien  vers une image ou un gif, les dimensions de votre image peuvent mener à des répétitions de l'image en question sur le fond");
 var optionSet  = document.createElement('input');

 optionSet.setAttribute('type','text');
 option.appendChild(optionName);
 option.appendChild(optionSet);

 optionSet.onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      UpdateBgAction();
      return false;
    }
  };
 document.getElementById('SettingsTab').children[1].children[0].appendChild(option);
     document.getElementById("GameCanvas").style.setProperty("background","url(https://media.giphy.com/media/EIyuzZk6IDUMU/source.gif)");
var notificationSelect = document.createElement('select');
 var optionActive = document.createElement('option');
 optionActive.innerHTML = "Activé";
 var optionDisActive = document.createElement('option');
 optionDisActive.innerHTML = "Désactivé";
 notificationSelect.appendChild(optionActive);
 notificationSelect.appendChild(optionDisActive);
 var notificationZone = document.createElement('tr');
 var notificationText = document.createElement('td');
 notificationText.innerHTML = "Bruit des notifications";
 notificationText.setAttribute('title',"Emet un son lorsque quelqu'un envoie un message comportant votre pseudo");
 notificationZone.appendChild(notificationText);
 notificationZone.appendChild(notificationSelect);
 document.getElementById('SettingsTab').children[1].children[0].appendChild(notificationZone);
 var sound = new Audio("http://bombparty.sparklinlabs.com/sounds/myTurn.wav");
 channel.socket.on('chatMessage',function parse(data){
     var message = data.text;
       if(message.toLowerCase().indexOf(window.app.user.displayName.toLowerCase()) !== -1){
           var notifIndicator = document.createElement('span');
     notifIndicator.innerHTML = " ❯";
     notifIndicator.style.color = '#3dff00';
     notifIndicator.setAttribute('title','Ce joueur vous a notifié dans son message');
           document.getElementById('ChatLog').children[document.getElementById('ChatLog').children.length-1].children[1].appendChild(notifIndicator);
           if(notificationSelect.selectedIndex === 0){
               sound.play();
        }
    }
     $('.Actions').remove();
 });
        var PlayerListTab = document.createElement("table");
var PlayerListTitle = document.createElement("h2");
var PlayerListBody = document.createElement("tbody");
PlayerListTitle.innerHTML = "Joueurs";
document.getElementById('SettingsTab').insertBefore(PlayerListTitle,document.getElementById('SettingsTab').children[2]);
var UpdatePlayerList = setInterval(function(){
    while(PlayerListBody.firstChild){
     PlayerListBody.removeChild(PlayerListBody.firstChild);
    }
    channel.data.users.forEach(function (player){
        var PlayerTr = document.createElement('tr');
        var PlayerName = document.createElement('td');
        var PlayerRole = document.createElement('span');
        if(player.role == "moderator"){
            PlayerRole.innerHTML = '●';
            PlayerRole.style.color = "#346192";
        }
        if(player.role == "administrator"){
            PlayerRole.innerHTML = '☆';
            PlayerRole.style.color = "#dc8";
        }
        if(player.role == "host"){
            PlayerRole.innerHTML = '★';
            PlayerRole.style.color = "#dc8";
        }
        if(player.role == "hubAdministrator"){
            PlayerRole.innerHTML = '[★]';
            PlayerRole.style.color = "#c63";
        }

        var Name = document.createElement('span');
        if(player.displayName.length < 20){
            Name.innerText = player.displayName;
        } else {
            Name.innerText = player.displayName.substring(0,17)+"...";
            Name.title = player.displayName;

        }
        Name.style.color = '#eee';
        PlayerRole.appendChild(Name);
        PlayerName.appendChild(PlayerRole);
        var Carac = player.displayName*2;
        if(Carac<40){
            PlayerName.style.width = Carac.toString()+"%";
        } else {
            PlayerName.style.width = "40%";
        }
        PlayerTr.appendChild(PlayerName);
        if(window.app.user.role !== ""){
            if(player.authId !== window.app.user.authId){
            if(window.app.user.role == "host"){
                if(player.role !== "moderator"){
                    var ModButton = document.createElement('button');
                    ModButton.innerHTML = "Mod ";
                    ModButton.style.fontSize ="12px";
                    ModButton.style.color = '#3dff00';
                    ModButton.style.background = "#565454";
                    ModButton.style.width = "20%";
                    ModButton.addEventListener('click',function mod(){channel.socket.emit("modUser",{displayName:player.displayName,authId:player.authId});});
                    PlayerTr.appendChild(ModButton);
            }
            if(player.role === "moderator"){
                var unModButton = document.createElement('button');
                unModButton.innerHTML = "unMod ";
                unModButton.style.fontSize = "12px";
                unModButton.style.color = "#de4";
                unModButton.style.width = "40%";
                unModButton.addEventListener('click',function mod(){channel.socket.emit("unmodUser",player.authId);});
                PlayerTr.appendChild(unModButton);
            }
            }
                if(player.role === ""){
            var BanButton = document.createElement('button');
                    BanButton.innerHTML = "Bannir ";
                    BanButton.style.fontSize ="12px";
                    BanButton.style.width = "25%";
                    BanButton.style.color = "#a00";
                    BanButton.addEventListener('click',function ban(){channel.socket.emit("banUser",{displayName:player.displayName,authId:player.authId});});
                    PlayerTr.appendChild(BanButton);
                }
        }
        }
        if(player.role === ""){
            PlayerListBody.appendChild(PlayerTr);
        } else {
            if(player.role === "hubAdministrator"){
            PlayerListBody.insertBefore(PlayerTr,PlayerListBody.children[0]);
            } else {
            PlayerListBody.insertBefore(PlayerTr,PlayerListBody.children[1]);
            }
        }
    });
      var lastLog = document.getElementById('ChatLog').children[document.getElementById('ChatLog').children.length-1];
        if(lastLog !== undefined && lastLog.innerHTML.indexOf("est maintenant key 'nuclearnode:userRoles. (fr)' returned an object instead of string..") != -1){
         lastLog.innerHTML = lastLog.innerHTML.replace("est maintenant key 'nuclearnode:userRoles. (fr)' returned an object instead of string..","n'est plus Modérateur.");
        }
    $('.Actions').remove();
},1000);
PlayerListTab.appendChild(PlayerListBody);
document.getElementById('SettingsTab').insertBefore(PlayerListTab,document.getElementById('SettingsTab').children[3]);
    }
    function UpdateBgAction(){
     var bgLink = "url("+document.getElementById('SettingsTab').children[1].children[0].children[2].children[1].value+")";
     document.getElementById("GameCanvas").style.setProperty("background",bgLink);
     console.log("Changement du fond d'écran : "+document.getElementById('SettingsTab').children[1].children[0].children[2].children[1].value);
     document.getElementById('SettingsTab').children[1].children[0].children[2].children[1].value = "";
 }
    function createInLine(parent,newThingType,simpleType){
    var line = document.createElement('sim');
    var thing = document.createElement(newThingType);
    parent.appendChild(thing);
    return thing;
}
 var runOverlay = setInterval(function getData(){if(typeof channel.data !== 'undefined'){
clearInterval(runOverlay);

var TimeShown = "";
var parentThing = document.getElementById("SidebarTabButtons");
var ButtonText1 = createInLine(parentThing,'button');
if(channel.data.state == "playing"){
ButtonText1.innerHTML = 'En attente de la prochaine partie'+TimeShown;
} else {
ButtonText1.innerHTML = 'Partie non commencée'+TimeShown;
}
parentThing = document.getElementById("AppsBar");
var ButtonText2 = createInLine(parentThing,'p',"active","TimerID");
ButtonText2.innerHTML = "A(0)";
ButtonText2.align = "center";
ButtonText2.style.color = "#a0a0a0";
var DetectSetUserRole = setInterval(function detect(){
    if(document.getElementById('optionDetect')){
       } else {
           loadSettingsOverlay();
       }
},100);
var anim1 = [
    { transform: 'scale(1.2)' },
    { transform: 'scale(1.5)' }
  ];
var anim2 = {
    duration: 200,
    easing: 'ease-in-out',
    fill: 'both'
  };
var anim3 = [
    { transform: 'scale(1.5)' },
    { transform: 'scale(1.2)' }
  ];
var anim4 = {
    duration: 150,
    easing: 'ease-in-out',
    fill: 'both'
  };
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
 var elem = document.getElementById('SidebarTabButtons');
 elem.removeChild(elem.children[2]);
 
app.user.alphaLetter = "a";
app.user.alphaNumber = 0;
app.user.alphaIdx = 0;
channel.socket.on("winWord",function (acteur){
	var lastMot = channel.data.actorsByAuthId[acteur.playerAuthId].lastWord.toLowerCase();
	var player = channel.data.usersByAuthId[acteur.playerAuthId];
   if(player.authId == app.user.authId){
     if(lastMot.startsWith(app.user.alphaLetter) === true){
         if(app.user.alphaLetter !== "z"){
             app.user.alphaIdx++;
             app.user.alphaLetter = alphabet[app.user.alphaIdx];
             ButtonText2.innerHTML = app.user.alphaLetter.toUpperCase()+"("+app.user.alphaNumber+")";
         } else {
             app.user.alphaIdx = 0;
             app.user.alphaLetter = alphabet[app.user.alphaIdx];
             app.user.alphaNumber++;
             ButtonText2.innerHTML = app.user.alphaLetter.toUpperCase()+"("+app.user.alphaNumber+")";
         }
         ButtonText2.animate(anim1,anim2);
         setTimeout(function up2(){ButtonText2.animate (anim3,anim4);},200);
     }
   }
});

var Interval;
var Hour = 0;
var Minute = 0;
var Second = 0;
var Totaltime = 0;
var beginning = 1;
var SecondShown = "";
var MinuteShown = "";
var HourShown = "";
channel.socket.on("endGame",function end(){
	clearInterval(Interval);
	Hour = 0;
	Minute = 0;
	Second = 0;
	Totaltime = 0;
	beginning = 0;
    app.user.alphaLetter = "a";
    app.user.alphaNumber = 0;
    app.user.alphaIdx = 0;
});
channel.socket.on("resetBombTimer",function reset(){
	if(beginning === 0){
		beginning = 1;
        ButtonText2.innerHTML = "A(0)";
		Interval = setInterval(function TimeAdvance(){
	 Totaltime++;
	 Second++;
	 if(Second == 60){Second = 0;Minute++;}
	 if(Minute == 60){Minute = 0;Hour++;}
	 if(Second < 10){SecondShown = "0"+Second;} else {SecondShown = Second;}
	 if(Minute < 10){MinuteShown = "0"+Minute;} else {MinuteShown = Minute;}
	 if(Minute < 10){HourShown = "0"+Hour;} else {HourShown = Hour;}
	 TimeShown = HourShown+":"+MinuteShown+":"+SecondShown;
	ButtonText1.innerHTML = ' Temps '+TimeShown;
	},1000);
	}
});
}},1);
})();
