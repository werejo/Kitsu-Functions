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
                "<button class='nsfw-ungate'>Ungate NSFW</button>"+
                "<button class='nsfw-toggle' data-state='nsfw'>(ಠ_ಠ) mode</button>"+"<br/>"+
                "<button class='view-more-button'>View More</button>"+
                "<button class='view-less-button'>View Less</button>"+"<br/>"+
                "<button class='create-pins'>Create Pins</button>"+
                "<button class='to-pinned' data-pinned>To Pinned</button>"+"<br/>"+
                "<button class='hide-before-pinned'>Hide Before Pinned</button>"+"<br/>"+
                "<button class='to-pinned-previous'><< Prev</button>"+
                "<button class='to-pinned-next'>Next >></button>"+
                "</div>"
            );
            $(".feed-stream").on("click", ".nsfw-gate a", function(){
                    $(this).parents(".occludable-area").addClass("is-nsfw");
            });
            $(".sidebar-item.sidebar-footer").on("click", ".nsfw-ungate", function(){
                $(".nsfw-gate .gate--hover").click();
            });
            $(".sidebar-item.sidebar-footer").on("click", ".nsfw-toggle", function(){
                var state = $(this).data("state");
                if(state == "sfw"){
                    $(".is-nsfw").removeClass("filter-on");
                    $(this).data("state", "nsfw").html("(ಠ_ಠ) mode");
                }else if(state == "nsfw"){
                    $(".is-nsfw").addClass("filter-on");
                    $(this).data("state", "sfw").html("(¬‿¬ ) mode");
                }
            });
            $(".sidebar-item.sidebar-footer").on("click", ".view-more-button", function(){
                $(".stream-content-post:not(.full-post) + .view-more a").click();
            });
            $(".sidebar-item.sidebar-footer").on("click", ".view-less-button", function(){
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
                    if($(this).attr("id") < post_id){$(this).addClass("before-pinned-hide");}
                });
                if($("#"+post_id).length){
                    $('html, body').animate({
                        scrollTop: $(".feed-actions").offset().top - $("#kitsu-navbar").height() - 10 + $(".feed-actions").height() + 15
                    }, 200);
                }
            });
            $(".sidebar-item.sidebar-footer").on("click", ".to-pinned-previous", function(){
                var post_id=localStorage.pinned_post;
                var prev=$("#"+post_id).prev();
                if(prev.length){
                    $('html, body').animate({
                        scrollTop: prev.offset().top - $("#kitsu-navbar").height() - 10
                    }, 200);
                }
				post_id = prev.attr("id");
                $(".to-pinned").html("To #"+post_id);
                localStorage.pinned_post = post_id;
            });
            $(".sidebar-item.sidebar-footer").on("click", ".to-pinned-next", function(){
                var post_id=localStorage.pinned_post;
                var next=$("#"+post_id).next();
                if(next.length){
                    $('html, body').animate({
                        scrollTop: next.offset().top - $("#kitsu-navbar").height() - 10
                    }, 200);
                }
				post_id = next.attr("id");
                $(".to-pinned").html("To #"+post_id);
                localStorage.pinned_post = post_id;
            });
            console.log("werejo's additional functions created!");
        }
        $("head").append(
            "<style type='text/css'>"+
            ".occludable-area.has-pin{position:relative;}"+
            ".pin-button-wrap{position:absolute;top:0;right:0;z-index:100;}"+
            ".occludable-area.before-pinned-hide{display:none;}"+
            ".occludable-area.is-nsfw.filter-on .stream-content-post{-webkit-filter: blur(50px);filter: blur(50px);}"+
            "</style>"
        );
    });
})();
