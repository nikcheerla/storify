
var s,
    app = {

        settings : {
            jpm: {}
        },
        init: function() {
            //Global settings
            s = this.settings;

            // initalize
            this.initalizers();
            this.bindUiActions();
        },
        bindUiActions: function (){
            // Should include all JS user interactions
            var self = this;

            $('.select-posts,.select-categories').on('click', function () {
                self.homePostsCatSwitch();
            });

            $('.social-icon').on('click', function(){
                self.socialIconClick( $(this) );
            });

        },
        initalizers: function (){
            // Initalize any plugins for functions when page loads

            // JPanel Menu Plugin -
            //this.jpm();

            // Fast Click for Mobile - removes 300ms delay - https://github.com/ftlabs/fastclick
            FastClick.attach(document.body);

            // Add Bg colour from JS so jPanel has time to initalize
            //$('body').css({"background-color":"#333337"});
        },
        homePostsCatSwitch: function(){
            // Toggles between showing the categories and posts on the homepage
            $('.home-page-posts').toggleClass("hide");
            $('.home-page-categories').toggleClass("hide");
            $('.select-posts').toggleClass("active");
            $('.select-categories').toggleClass("active");
            $('.home-footer').toggleClass("hide");
        },
        socialIconClick: function(el) {
            // Post page social Icons
            // When Clicked pop up a share dialog

            var platform = el.data('platform');
            var message = el.data('message');
            var url = el.data('url');

            if (platform == 'mail'){
                // Let mail use default browser behaviour
                return true;
            } else {
                this.popItUp(platform, message, url);
                return false;
            }
        },
        popItUp : function (platform, message, url) {
            // Create the popup with the correct location URL for sharing
            var popUrl,
                newWindow;

            if( platform == 'twitter'){
                popUrl = 'http://twitter.com/home?status=' + encodeURI(message) + '+' + url;

            } else if(platform == 'facebook'){
                popUrl = 'http://www.facebook.com/share.php?u' + url + '&amp;title=' + encodeURI(message);
            }
            newWindow = window.open(popUrl,'name','height=500,width=600');
            if (window.focus) { newWindow.focus(); }
            return false;

        },
        jpm: function(){
            // Off Screen Navigation Plugin

            s.jpm = $.jPanelMenu({
                menu : '#menu-target',
                trigger: '.menu-trigger',
                animated: false,
                beforeOpen : ( function() {
                    if (matchMedia('only screen and (min-width: 992px)').matches) {
                        $('.sidebar').css("left", "250px");
                    }
                }),
                beforeClose : ( function() {
                    $('.sidebar').css("left", "0");
                    $('.writer-icon, .side-writer-icon').removeClass("fadeOutUp");
                })
            });

            s.jpm.on();
        }
    };

$(document).ready(function(){
    app.init();
});
















//$("#writerModal")[0].style.display = "block"

// --------------
// SUPPORTING FUNCTIONS


// Makes a class of a given position and size, and places it on the screen.

function updateArgs(quest) {
    args = quest.args
    quest.innerHTML = "<h2>" + args.title + "</h2>"
    //quest.innerHTML += "<h5>" + args.status + "</h5>"

    img = "<a><img src=" + args.image_file + " alt='category-image'></a>"
    if (args.status == 'AVAILABLE'){
        img = "<a><img class=half src=" + args.image_file + " alt='category-image'></a>"
    }
    else if (args.status == 'CLOSED') {
        img = "<a><img class=gray src=" + args.image_file + " alt='category-image'></a>"
    }
    else if (args.status == 'COMPLETE') {
        img = "<a><img class=complete src=" + args.image_file + " alt='category-image'></a>"
    }
    quest.innerHTML += img
}


function makeQuest(args) {
    var quest = document.createElement('div');
    quest.classList = 'quest category-preview col-xs-6 col-sm-4';
    quest.args = args
    updateArgs(quest)

    $("#questContainer")[0].append(quest);
    return quest;
}


function makePost(title, content, author) {

    var post = document.createElement('article');
    post.classList = 'post'

    html_str = ""
    html_str += '<div class="post-preview col-xs-10  no-gutter">'
    html_str += '<h2><a href="#">' + title + '</a></h2>'
    html_str += '<p>' + content + '</p>'
    html_str += '<p class="meta"> <a href="author.html"> ' + author 
    html_str +=  ' in <a href="category.html"> Your Writing </a> <i class="link-spacer"></i>' 
    html_str +=  '<i class="fa fa-bookmark"></i> 2 minute read</p>'
    html_str += "</div>"

    html_str += '<div class=" col-xs-2  no-gutter"> <img src="img/profile-2.jpg" class="user-icon" alt="user-image"></div>'

    post.innerHTML = html_str

    $("#storiesFeed")[0].prepend(post);
    return post

    /*
    <article class="post">
        <div class="post-preview col-xs-10  no-gutter">
            <h2><a href="#">First Post</a></h2>

            <p>Welcome to Storify. There currently are no posts in your feed. Tackle some of the quests and watch your "Stories" tab fill with stories! </p>

            <p class="meta">
                <a href="author.html">Storify Team</a> in <a href="category.html">Notifications</a> <i class="link-spacer"></i> <i class="fa fa-bookmark"></i> 2 minute read
            </p>
        </div>

        <div class=" col-xs-2  no-gutter">
            <img src="img/profile-1.jpg" class="user-icon" alt="user-image">
        </div>
    </article>
    */
}





// Adjusts the x-position of a quest: negative dx moves it to the left, positive dx to the right
function setXY(quest, x, y) {
    quest.style.left = x;
    quest.style.top = y;
}

function getX(quest) {
    return parseInt(quest.style.left)
}

function getY(quest) {
    return parseInt(quest.style.left)
}

// Centers a quest on the middle of the screen
function center(quest) {
    quest.style.top = (document.body.scrollHeight/2) - (parseInt(quest.style.height)/2);
    quest.style.left = (document.body.scrollWidth/2) - (parseInt(quest.style.width)/2);
}



args = {title: "Six-Word Autobiography", status:"AVAILABLE", parents:[], image_file:"img/cover-4.jpg",
    prompt:"Write an autobiography of your life, but using only six words.", duration: 50, id:"six",
    classes:"Apprentice Writer", humor:5, persuasiveness:5, emotion:10}
six = makeQuest(args)



args = {title: "Elevator Sales Pitch", status:"CLOSED", parents:[six], image_file:"img/cover-1.jpg",
    prompt:"Write a short sales pitch for your company that sells a new type of hairspray.", duration: 200, id:"sales",
    classes:"Salesman", humor:2, persuasiveness:20, emotion:10}
var sales_pitch = makeQuest(args);

args = {title: "Earliest Memory", status:"CLOSED", parents:[six], image_file:"img/cover-5.jpg",
    prompt:"Write a short personal narrative about your earliest memory.", duration: 500, id:"memory",
    classes:"None", humor:5, persuasiveness:0, emotion:20}
var memory = makeQuest(args);

args = {title: "Bee Haiku", status:"CLOSED", parents:[sales_pitch], image_file:"img/cover-6.jpg",
    prompt:"Write a haiku (5, 7, 5 syllable scheme) about bees.", duration: 150, id:"haiku",
    classes:"Poet", humor:5, persuasiveness:5, emotion:10}
var haiku = makeQuest(args);

args = {title: "Infiltrate The Cell", status:"CLOSED", parents:[memory], image_file:"img/cover-7.jpg",
    prompt:"A terrorist group has been infiltrated by so many agencies that it is now run by spies, unbeknownst to the spies themselves. This fact becomes apparent to an actual extremist who joins their ranks.", 
    duration: 1000, id:"cell",
    classes:"None", humor:25, persuasiveness:5, emotion:2}
var cell = makeQuest(args);

nodes = [six, sales_pitch, memory, haiku, cell]



cur_target = false
clockstarted = false

function questclick(evtdata) {
    quest = evtdata.currentTarget
    for (node of nodes) {
        if (node.args.id == quest.args.id) quest = node
    }
    //console.log(quest)
    if (quest.args.status == "CLOSED") return
    cur_target = quest
    $('#questPrompt').text("Prompt: " + quest.args.prompt)
    $('#questTitle').text("Title: " + quest.args.title)

    $("#writerModal")[0].style.display = "block"
}

$('.quest').click(questclick);

function recalc() {
    for (node of nodes) {
        var all_par_complete = true
        for (par of node.args.parents){
            if (par.args.status != "COMPLETE") {
                all_par_complete = false
            }
        }
        if (all_par_complete && node.args.status != "COMPLETE") {
            node.args.status = "AVAILABLE"
            updateArgs(node)
        }
    }
}

$('#submitQuest').click(function() {
    if (!cur_target) return
    cur_target.args.status = "COMPLETE"
    updateArgs(cur_target)

    $("#writerModal")[0].style.display = "none"
    html = $("#textEditor").froalaEditor('html.get');

    makePost(cur_target.args.title, html, "You")

    recalc()
});