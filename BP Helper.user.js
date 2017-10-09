// ==UserScript==
// @name         Encoded BP Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://bombparty.sparklinlabs.com/play/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var css = document.createElement('link');
        css.setAttribute('rel','stylesheet');
        css.setAttribute('href','https://dl.dropboxusercontent.com/s/x75y69tcsbv5hq6/HelperStyle.css?dl=0');
        document.children[0].children[0].appendChild(css);
    var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://dl.dropboxusercontent.com/s/jpyqqr10kule5gi/EncodedDictionary.js?dl=0";
        document.head.appendChild(script);
    channel.appendToChat('Info','Dictionary Helper loading ... please wait some seconds, if the prompt box does not appear open the console and type askPassword()');
})();
