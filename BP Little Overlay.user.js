// ==UserScript==
// @name         BP Little Overlay
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Little overlay for BombParty
// @downloadURL  https://github.com/SuperRandomGuy/Bombparty/blob/master/BP%20Little%20Overlay.user.js
// @author       Nicroc
// @match        http://bombparty.sparklinlabs.com/play/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
 setTimeout(function load()
{    function createInLine(parent,newThingType,simpleType){
    var line = document.createElement('sim');
    var thing = document.createElement(newThingType);
    parent.appendChild(thing);
    return thing;
}
var TimeShown = "";
var parentThing = document.getElementById("SidebarTabButtons");
var ButtonText1 = createInLine(parentThing,'button');
if(channel.data.state == "playing"){
ButtonText1[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = 'En attente de la prochaine partie'+TimeShown;
} else {
ButtonText1[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = 'Partie non commencée'+TimeShown;
}
parentThing = document.getElementById("AppsBar");
var ButtonText2 = createInLine(parentThing,'p',"active","TimerID");
ButtonText2[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = "A(0)";
ButtonText2.align = "center";
ButtonText2.style.color = "#a0a0a0";
 var option = document.createElement('tr');
 var optionName = document.createElement('td');
 optionName.style.background = "rgb(118, 118, 118);";
optionName[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = "Changer de fond";
 var optionSet  = document.createElement('input');
 
 optionSet.setAttribute('type','text');
 option.appendChild(optionName);
 option.appendChild(optionSet);
 function UpdateBgAction(){
     var bgLink = "url("+optionSet.value+")";
     document.getElementById("GameCanvas").style.setProperty("background",bgLink);
     console.log("Changement du fond d'écran : "+optionSet.value);
     optionSet.value = "";
 }
 optionSet.onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      UpdateBgAction();
      return false;
    }
  };
 document.getElementById('SettingsTab').children[1].appendChild(option);
     document.getElementById("GameCanvas").style.setProperty("background","url(https://media.giphy.com/media/EIyuzZk6IDUMU/source.gif)");

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
             ButtonText2[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = app.user.alphaLetter.toUpperCase()+"("+app.user.alphaNumber+")";
         } else {
             app.user.alphaIdx = 0;
             app.user.alphaLetter = alphabet[app.user.alphaIdx];
             app.user.alphaNumber++;
             ButtonText2[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = app.user.alphaLetter.toUpperCase()+"("+app.user.alphaNumber+")";
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
var beginning = 0;
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
        ButtonText2[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = "A(0)";
		Interval = setInterval(function TimeAdvance(){
	 Totaltime++;
	 Second++;
	 if(Second == 60){Second = 0;Minute++;}
	 if(Minute == 60){Minute = 0;Hour++;}
	 if(Second < 10){SecondShown = "0"+Second;} else {SecondShown = Second;}
	 if(Minute < 10){MinuteShown = "0"+Minute;} else {MinuteShown = Minute;}
	 if(Minute < 10){HourShown = "0"+Hour;} else {HourShown = Hour;}
	 TimeShown = HourShown+":"+MinuteShown+":"+SecondShown;
	ButtonText1[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"] = ' Temps '+TimeShown;
	},1000);
	}
});
},2000);
})();
