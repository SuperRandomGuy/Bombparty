// ==UserScript==
// @name         BP Long Word Stats
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://bombparty.sparklinlabs.com/play/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var css = document.createElement('link');
        css.setAttribute('rel','stylesheet');
        css.setAttribute('href','https://dl.dropboxusercontent.com/s/ol6gs8b0dgbfhv9/LongWordStyle.css?dl=0');
        document.children[0].children[0].appendChild(css);
    var TableBody = document.createElement('div');
    TableBody.setAttribute('id','LongWordStats');
    document.getElementById('App').children[1].insertBefore(TableBody,document.getElementById('WordInputContainer'));
    var TableTitle = document.createElement('span');
    TableTitle.innerHTML = "Long Word Stats";
    TableBody.appendChild(TableTitle);
    var LongNumber = document.createElement('button');
    LongNumber.setAttribute('id','LongNumberLine');
    LongNumber.innerHTML = "Nombre de longs : 0";
    TableBody.appendChild(LongNumber);
    var LastLong = document.createElement('button');
    LastLong.setAttribute('id','LongNumberLine');
    LastLong.innerHTML = "*";
    TableBody.appendChild(LastLong);
    app.user.long = 0;
    var myTurn = 0;
    var Timer;
    var Time;
    setTimeout(function loadLongOver(){
    channel.socket.on('setActivePlayerIndex',function(){
        if(channel.data.actors[channel.data.activePlayerIndex].authId == app.user.authId  && myTurn ===0){
            myTurn = 1;
            Time = 0;
            Timer = setInterval(function count(){
                Time = Time+10;
            },10);
        }
    });
    channel.socket.on('winWord',function(acteur){
        var lastMot = channel.data.actorsByAuthId[acteur.playerAuthId].lastWord.toUpperCase();
        myTurn = 0;
        clearTimeout(Timer);
        if(acteur.playerAuthId == app.user.authId && lastMot.length>19){
            app.user.long++;
            var sec = Time/1000;
            LongNumber.innerHTML = "Nombre de longs : "+app.user.long;
            LastLong.innerHTML = lastMot.toLowerCase()+" ("+sec.toString()+"s)";
        }
    });
    channel.socket.on('endGame',function(){
       app.user.long = 0;
    });
    },5000);
})();
