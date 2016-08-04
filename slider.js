
"use strict";

function Slider(element, options) {
    this.container = element;
    //this will accept an object
    this.defaults = {
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
    
    /* Note: the array is being updated so the variable is changing the length everytime I move one from it into the target div */
    
    var slideData = this.container.children
    var slideLen = slideData.length;
    console.log(slideLen);
    //add a class to the container just for lols
    this.container.classList.add('so-container');
    //create a wrapper div to build the slider then give it a class and move all the slide data elements inside it
    var track = document.createElement('div');
    track.classList.add('so-track')
    for(var d=0; d < slideData.length; d++) {
        slideData[d].classList.add('so-slide');
    }
    var slides = document.querySelectorAll('.so-slide')
    //must be a way around this other than 2 for loops!? investigate!
    for(var e=0; e < slides.length; e++) {
        track.appendChild( slides[e] );
    }
    
    
    this.container.appendChild(track);
}



var slider = document.querySelector('.slider');
new Slider(slider, {
    slide: false,
    fade: false,
    filter: 'puppyLove',
    'dotType' : 'hearts'
});


