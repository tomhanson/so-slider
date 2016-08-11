
"use strict";

function Slider(element, options) {
    this.container = element;
    //this will accept an object
    this.defaults = {
        autoplay: true,
        slideSpeed: 1000,
        slide: true,
        fade: false,
        dotPosition: 'bottom', //top, left, right, bottom
        dotType: 'basic', //different dot types
        filter: false //choose a filter type re: instagram
    };
    this.finalOptions = this.options(this.defaults, options);
    this.fade();
    this.filter();
    this.setup();

}
Slider.prototype.options = function(defaults, options) {
    for(var key in defaults) {
        //for loop to change any different values in user defined options 
        if(options.hasOwnProperty(key)) {
            defaults[key] = options[key];
        }
    }
    //return object with all values updated
    return defaults;
}
Slider.prototype.fade = function() {

    if(this.finalOptions.fade) {
        console.log('I will fade')
    } else {
        console.log('i will slide');
    }
};
Slider.prototype.filter = function() {
    if(this.finalOptions.filter !== false ) {
        console.log(this.finalOptions.filter + ' is the filter i will be using!')
    } else {
        console.log('filter is off');
    }
}

Slider.prototype.setup = function() {
    //array holding all slides
    /* Note: the array is being updated so the variable length is changing everytime I move one from it into the target div */
    //do some work naming these
    var slideData = this.container.children
    var slideData1 = [];
    for(let i=0; i < slideData.length; i++) {
        slideData1[i] = slideData[i];
    }
    //get length of slidedata array so I can use it to multiply the tracks width and get a full track
    var slideLen = slideData1.length;
    //add a class to the container just for lols
    this.container.classList.add('so-container');
    //get viewport width - **THIS IS BEING CALCULATED INCORRECTLY*** this needs go be the width of its container
    var viewportW = this.container.clientWidth;
    this.container.style.width = viewportW + 'px';
    
    
    

    /**** MAKE THIS INTO A PROTOTYPE ****/
    //create a wrapper div to build the slider then give it a class and move all the slide data elements inside it
    var track = document.createElement('div');
    track.classList.add('so-track');
    track.style.right = 0 + 'px';
    //set the length of the track add + 2 to accomodate for a cloned slide on each end.
    track.style.width = ( (slideLen + 2) * viewportW) + 'px';
    //loop through all the slides
    for(var d=0; d < slideData1.length; d++) {
        slideData1[d].classList.add('so-slide');
        slideData1[d].style.width = viewportW + 'px';
    }
    
    
    //second loop to get the slides inside their container.
    var slides = document.querySelectorAll('.so-slide')
    //must be a way around this other than 2 for loops!? investigate!
    for(var e=0; e < slides.length; e++) {
        track.appendChild( slides[e] );
    }
    
    this.container.appendChild(track);
        //clone first and last slides
    this.clone(slideData1, track);
    this.movement('slide', viewportW, slideData1, track);
    

    
    //add a resize event here for the slider in full
}
/* **** MAKE THIS BE PROTOTYPE.SLIDE AND ADD FADE ETC.. AS SEPERATE OPTIONS **** */
Slider.prototype.movement = function(type, width, slides, track) {
    //type will effect if its fade/slide etc... needs switch statement when confirmed.
    //counter starts at 2 because we are ignoring the first slide and also the second as it has active state on load.
    var counter = 2;
    var dynamicWidth = width;
    track.style.right = dynamicWidth + 'px';
    setInterval(() => {
        if(track.style.transition = 'none') {
         track.style.transition = '2.2s right';   
        }
        if(counter <= (slides.length - 2) ) {
            for(let i=0; i< (slides.length - 1); i++) {
                slides[i].classList.remove('active');
                slides[counter].classList.add('active');
            }
            dynamicWidth += width;
            track.style.right = dynamicWidth + 'px';
        } else if(counter == slides.length - 1) {
            //start the counter agin and give impression of starting again
            counter = 1;
            for(let i=0; i< slides.length; i++) {
                slides[i].classList.remove('active');
                slides[counter].classList.add('active');
            }
            //push the slides along to the final cloned slide
            dynamicWidth += width;
            track.style.right = dynamicWidth + 'px';
            setTimeout(function() {
                track.style.transition = 'none';
                //note to self - the right always wants to be one slide width less than the full amount
                dynamicWidth = width
                track.style.right = dynamicWidth + 'px'; 
            }, 2200)
        }
        counter++;   
    }, 3000);
}

Slider.prototype.clone = function(slides, container){
    //clone first and last slide
    var first = slides[0].cloneNode(true);
    var last = slides[(slides.length - 1)].cloneNode(true);
    //give the cloned nodes classes;
    last.classList.add('so-clone-start');
    first.classList.add('so-clone-end');
    //add cloned nodes to the ends of the array
    slides.unshift(last);
    slides.push(first);
    //set the first slide to active ignoring the cloned first slide
    slides[1].classList.add('active');
    container.insertBefore(last, container.childNodes[0])
    container.appendChild(first);
}


var slider = document.querySelector('.slider');
new Slider(slider, {
    slide: false,
    fade: false,
    filter: 'puppyLove',
    dotType : 'hearts',
    slideSpeed: 10000
});

