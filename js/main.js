
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


var humor = 0
var persuasiveness = 0
var emotion = 0
var classes = ""






function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

CLOCK_OFF = '<span style="color:red">00:00</span>'

var timeinterval = 0
function initializeClock(clock, endtime) {
  function updateClock() {
    var t = getTimeRemaining(endtime);
    clock.innerHTML = ('0' + t.minutes).slice(-2) + ":" + ('0' + t.seconds).slice(-2);
    console.log (clock.innerHTML)

    if (t.total <= 0) {
      stopClock(clock)
    }
  }

  updateClock();
  timeinterval = setInterval(updateClock, 1000);
}

function stopClock(clock) {
    clearInterval(timeinterval);
    clock.innerHTML = CLOCK_OFF
}

var deadline = new Date(Date.parse(new Date()) + 60 * 60 * 1000);
//initializeClock($('#timer')[0], deadline);







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



validator_factory = function(min_len, max_len) {
    validator = function(story) {
        if (story.trim().split(/\s+/).length < min_len) {
            return "<span style='color:red'> Invalid: Too short</span>";
        }
        else if (story.trim().split(/\s+/).length > max_len) {
            return "<span style='color:red'> Invalid: Too long</span>";
        }
        else {
            return VALID_CONST;
        }
    }
    return validator
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



VALID_CONST = "<span style='color:green'> Valid </span>"

validator = function(story) {
    if (story.trim().split(/\s+/).length == 6) {
        return VALID_CONST;
    }
    else if (story.trim().split(/\s+/).length < 6) {
        return "<span style='color:red'> Invalid: Too short</span>";
    }
    else if (story.trim().split(/\s+/).length > 6) {
        return "<span style='color:red'> Invalid: Too long</span>";
    }
}

args = {title: "Six-Word Autobiography", status:"AVAILABLE", parents:[], image_file:"img/cover-4.jpg",
    prompt:"Write an autobiography of your life, but using only six words. Example: <em>For Sale: baby shoes, never worn.</em>", duration: 50, id:"six",
    classes:"Apprentice Writer", humor:5, persuasiveness:5, emotion:10, validator:validator}

six = makeQuest(args)




validator = function(story) {
    if (story.trim().split(/\s+/).length <= 200) {
        return VALID_CONST;
    }
    else {
        return "<span style='color:red'> Invalid: Too long</span>";
    }
}

args = {title: "Elevator Sales Pitch", status:"CLOSED", parents:[six], image_file:"img/cover-1.jpg",
    prompt:"Write a short (200 words max) sales pitch for your company that sells a new type of hairspray.", duration: 300, id:"sales",
    classes:"Salesman", humor:2, persuasiveness:20, emotion:10, validator:validator}
var sales_pitch = makeQuest(args);

validator = function(story) {
    if (story.trim().split(/\s+/).length < 200) {
        return "<span style='color:red'> Invalid: Too short</span>";
    }
    else if (story.trim().split(/\s+/).length > 600) {
        return "<span style='color:red'> Invalid: Too long</span>";
    }
    else {
        return VALID_CONST;
    }
}

args = {title: "Earliest Memory", status:"CLOSED", parents:[six], image_file:"img/cover-5.jpg",
    prompt:"Write a personal narrative about your earliest memory. 200 words minumum, 600 words maximum", duration: 900, id:"memory",
    classes:"Rememberer", humor:5, persuasiveness:0, emotion:20, validator:validator}
var memory = makeQuest(args);

validator = function(story) {
    return VALID_CONST
}

args = {title: "Bee Haiku", status:"CLOSED", parents:[sales_pitch], image_file:"img/cover-6.jpg",
    prompt:"Write a haiku (5, 7, 5 syllable scheme) about bees.", duration: 150, id:"haiku",
    classes:"Poet", humor:5, persuasiveness:5, emotion:10, validator:validator}
var haiku = makeQuest(args);







validator = function(story) {
    if (story.trim().split(/\s+/).length < 200) {
        return "<span style='color:red'> Invalid: Too short</span>";
    }
    else if (story.trim().split(/\s+/).length > 600) {
        return "<span style='color:red'> Invalid: Too long</span>";
    }
    else {
        return VALID_CONST;
    }
}

args = {title: "Infiltrate The Cell", status:"CLOSED", parents:[memory], image_file:"img/cover-7.jpg",
    prompt:"A terrorist group has been infiltrated by so many agencies that it is now run by spies, unbeknownst to the spies themselves. This fact becomes apparent to an actual extremist who joins their ranks. (200 - 600 words).", 
    duration: 1200, id:"cell",
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
    $('#questPrompt')[0].innerHTML = "<strong>" + quest.args.title + "</strong>: " + quest.args.prompt
    $("#writerModal")[0].style.display = "block"
    $('#questHumor')[0].innerHTML = "+" + quest.args.humor
    $('#questPersuasiveness')[0].innerHTML = "+" + quest.args.persuasiveness
    $('#questEmotion')[0].innerHTML = "+" + quest.args.emotion
    prq = $('#prerequisites')[0]
    prq.innerHTML = "Prerequisites: None"
    for (node of quest.args.parents) {
        if (prq.innerHTML = "None") prq.innerHTML = "Prerequisites: <strong>"
        else prq.innerHTML += ", "
        prq.innerHTML += node.args.classes
    }
    prq.innerHTML += "</strong>"
    $('#bestowed')[0].innerHTML = "Grants: <strong>" + quest.args.classes + "</strong>"

    $("#textEditor").froalaEditor('html.set', '');

    initializeClock($('#timer')[0], new Date(Date.parse(new Date()) + quest.args.duration * 1000));
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

    for (node of nodes) {
        if (node.args.status=="COMPLETE") {
            classes += node.args.classes + ", "
        }
    }
}


function validate() {
    if (!cur_target) return 

    html = $("#textEditor").froalaEditor('html.get');
    validation_resp = cur_target.args.validator(html)
    $("#validated")[0].innerHTML = validation_resp
    if (validation_resp == VALID_CONST && $("#timer")[0].innerHTML != CLOCK_OFF) {
        $('#submitQuest').addClass("valid")
    }
    else {
        $('#submitQuest').removeClass("valid")
    }
}

setInterval(validate, 1000)


$('#submitQuest').click(function() {
    if (!cur_target) return

    validation_resp = cur_target.args.validator(html)
    if (validation_resp != VALID_CONST) {
        $(".modal-content").style.backgroundColor = 'red'
        return
    }
    cur_target.args.status = "COMPLETE"
    updateArgs(cur_target)

    $("#writerModal")[0].style.display = "none"
    html = $("#textEditor").froalaEditor('html.get');

    makePost(cur_target.args.title, html, "You")

    stopClock(('#timer')[0])

    recalc()
});

$('#quitQuest').click(function() {
    stopClock(('#timer')[0])
    $("#writerModal")[0].style.display = "none"
});





$("#createNewQuest").click(function() {
    $("#createModal")[0].style.display = "block"
    $("#prerequisitesEdit").froalaEditor('html.set', "Prerequisites: " + classes);
    if (classes == "") {
        $("#prerequisitesEdit").froalaEditor('html.set', "Prerequisites: None");
    }
});

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function() {
    $("#createModal")[0].style.display = "none";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#createquest').click(makeNode);









function validateNode() {
    $('#createquest').removeClass("valid")

    title = $("#questTitleEdit").froalaEditor('html.get')
    prompt = $("#questPromptEdit").froalaEditor('html.get')
    duration = $("#timerEdit").froalaEditor('html.get')
    humor = parseInt($("#questHumorEdit").froalaEditor('html.get'))
    persuasiveness = parseInt($("#questPersuasivenessEdit").froalaEditor('html.get'))
    emotion = parseInt($("#questEmotionEdit").froalaEditor('html.get'))
    lengths = $("#validatedEdit").froalaEditor('html.get').split(" ")
    min = parseInt(lengths[0])
    max = parseInt(lengths[2])

    validator = validator_factory(min, max)
    duration = parseInt(duration.slice(0, 2))*60 + parseInt(duration.slice(3, 5))
    console.log(duration)

    parent_nodes = []
    parents = $("#prerequisitesEdit").froalaEditor('html.get')
    parents = parents.split(":")[1].trim().split(",")

    if (typeof(parents) === 'string' || parents instanceof String) {
        parents = [parents]
    }

    console.log(parents)
    for (i=0; i < parents.length;i++) {
        if (parents[i].trim() == "") continue
        dd = false
        for (node of nodes) {
            console.log(node.args.classes + " " + parents[i])
            if (node.args.classes == parents[i].trim() && node.args.status == "COMPLETE") {
                parent_nodes.push(node)
                dd=true
            }
        }
        if (!dd) return false
    }

    console.log(parent_nodes)

    node_classes = $("#bestowedEdit").froalaEditor('html.get').split(":")[1].trim()
    image_file = "img/cover-" + getRandomInt(1, 15) + ".jpg"

    for (node of nodes) {
        if (node.args.classes == node_classes) {
            console.log("repeat class")
            return false
        }
    }

    args = {title: title, status:"AVAILABLE", parents:parent_nodes, image_file:image_file, emotion:emotion, persuasiveness:persuasiveness, humor:humor,
    prompt:prompt, duration:duration, id:title.toLowerCase().replace(/\s/g,''), classes:node_classes, validator:validator}

    $('#createquest').addClass("valid")

    return args
}

setInterval(validateNode, 1000)


function makeNode() {

    args = validateNode()
    if (args == false) {
        return
    }

    node = makeQuest(args);
    console.log(node)
    arg_save = args
    console.log(node)
    nodes.push(node)

    $(".quest").off("click")
    $(".quest").click(questclick)

    $('#createModal')[0].style.display = "none";
}




