// ==UserScript==
// @name         	werejo's additional Kitsu functions
// @namespace    	http://plug.dj/hummingbird-me
// @version      	1.0
// @description  	Some additional functions I felt I needed for my (¬‿¬ ) Kitsu experience
// @author       	werejo
// @homepage      	https://github.com/werejo/Kitsu-Functions
// @updateURL     	https://github.com/werejo/Kitsu-Functions/raw/master/kitsu.io-additional-functionalities.user.js
// @downloadURL   	https://github.com/werejo/Kitsu-Functions/raw/master/kitsu.io-additional-functionalities.user.js
// @match        	https://kitsu.io/*
// @grant        	none
// @run-at	     	document-end
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function(){
        var existCondition = setInterval(function() {
            if ($(".sidebar-item.sidebar-footer").length) {
                clearInterval(existCondition);
                createButtons();
            }
        }, 1000); // check every 100ms|
        $(document).keydown(function(e){
            if(e.ctrlKey && e.keyCode == 32){
                console.log("asd");
                if(!$(".sidebar-item .werejo-buttons-wrap").length){
                    createButtons();
                }else{
                    $(".nsfw-gate .gate--hover").click();
                }
            }
        });
        function createButtons(){
            $(".sidebar-item.sidebar-footer").append(
                "<div class='werejo-buttons-wrap'>"+
                "<button class='nsfw-toggle'>(¬‿¬ )</button>"+
                "<button class='view-more-toggle'>View More</button>"+
                "<button class='view-less-toggle'>View Less</button>"+
                "<button class='create-pins'>Create Pins</button>"+
                "<button class='to-pinned' data-pinned>To Pinned</button>"+
                "<button class='hide-before-pinned' data-pinned>Hide Before Pinned</button>"+
                "</div>"
            );
            $(".sidebar-item.sidebar-footer").on("click", ".nsfw-toggle", function(){
                $(".nsfw-gate .gate--hover").click();
            });
            $(".sidebar-item.sidebar-footer").on("click", ".view-more-toggle", function(){
                $(".stream-content-post:not(.full-post) + .view-more a").click();
            });
            $(".sidebar-item.sidebar-footer").on("click", ".view-less-toggle", function(){
                $(".stream-content-post.full-post + .view-more a").click();
            });
            $(".sidebar-item.sidebar-footer").on("click", ".create-pins", function(){
                $(".feed-stream > .ember-view > .occludable-area:not(.has-pin)").each(function(){
                    var post_id=$(this).attr("id");
                    $(this).addClass("has-pin").append("<div class='pin-button-wrap'><button data-post_id='"+post_id+"' class='pin-button'>Pin This Post</button></div>");
                });
            });
            $(".feed-stream").on("click", ".pin-button", function(){
                var post_id=$(this).data("post_id");
                localStorage.pinned_post = post_id;
                $(".to-pinned").html("To #"+post_id);
            });
            $(".sidebar-item.sidebar-footer").on("click", ".to-pinned", function(){
                var post_id=localStorage.pinned_post;
                if($("#"+post_id).length){
                    $('html, body').animate({
                        scrollTop: $("#"+post_id).offset().top - $("#kitsu-navbar").height() - 10
                    }, 200);
                }
            });
            $(".sidebar-item.sidebar-footer").on("click", ".hide-before-pinned", function(){
                var post_id=localStorage.pinned_post;
		$(".feed-stream > .ember-view > .occludable-area").each(function(){
		    if($(this).attr("id") < post_id)){$(this).addClass("before-pinned-hide");}
		});
            });
            console.log("werejo's additional functions created!");
        }
        $("head").append("<style type='text/css'>"+
		".occludable-area.has-pin{position:relative;}"+
		".pin-button-wrap{position:absolute;top:0;right:0;z-index:100;}"+
		".occludable-area.before-pinned-hide{display:none;}"+
		"</style>");
    });
})();
