let slide = document.querySelectorAll('.slide');
var current = 0; 
var slideTimeout;
function cls(){
    for(let i = 0; i < slide.length; i++){
          slide[i].style.display = 'none';
    }
}

function next(){
    pre_element = slide[current-1].children[0].tagName;
    if ( pre_element == 'VIDEO' ) {
        slide[current-1].children[0].muted = true;
    }
    window.clearTimeout( slideTimeout );
    autoPlay();
    
    return current;
}

function prev(){

    window.clearTimeout( slideTimeout );
    current = current - 2;
    if ( current < 0 ){
        current = slide.length-1;
        next_element = slide[slide.length-1].children[0].tagName;;
        if ( next_element == 'VIDEO' ) {
            slide[slide.length-1].children[0].muted = true;
        }
    }else{
        next_element = slide[current+1].children[0].tagName;;
        if ( next_element == 'VIDEO' ) {
            slide[current+1].children[0].muted = true;
        }
    }

    autoPlay();
    return current;
}

function autoPlay() {

    if ( current === undefined ) {
            current = 0;
    } else if ( current >= slide.length) {
            current = 0;
    } if ( current < 0 ){
        current = slide.length-1;
    }
    slide_duration = sldShowTime( current );
        cls();
        slide[current].style.display = 'flex';
    slideTimeout = setTimeout(function(){
        autoPlay();
    }, slide_duration );
    video_element = slide[current].children[0].tagName;;
    if ( video_element == 'VIDEO' ) {
        document.getElementById("unmute-btn").style.display = 'none';
        document.getElementById("mute-btn").style.display = 'flex';
    } else {
        document.getElementById("unmute-btn").style.display = 'none';
        document.getElementById("mute-btn").style.display = 'none';
    }
    current++;
}

function unmute(){
    video = slide[current-1].children[0];
    if( video.muted == false ){
        video.muted = true;
        document.getElementById("unmute-btn").style.display = 'none';
        document.getElementById("mute-btn").style.display = 'flex';
    } else {
        video.muted = false;
        document.getElementById("unmute-btn").style.display = 'flex';
        document.getElementById("mute-btn").style.display = 'none';
    }
}

function sldShowTime( slide_num ){
    element = slide[slide_num].children[0].tagName;
        if ( element == 'VIDEO' ) {
            video_duration = ( slide[slide_num].children[0].duration*1000 ) - 100;
            sld_show_time = video_duration;
            slide[slide_num].children[0].load();
            slide[slide_num].children[0].muted = true;
        } else {
            sld_show_time = 2000;
        }
    return sld_show_time;
}
