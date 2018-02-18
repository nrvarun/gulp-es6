$(document).ready(function () {
    console.log("let's roll out the scroll magic !!!");

    /**
    * Detect IE
    * returns version of IE or false, if browser is not Internet Explorer
    */
    function detectIE() {
        var ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    function animateLine(line){

        var version = detectIE();

        if(version == false){
            console.log('Not IE');
            $(line).addClass('active');
        }
        else if(version >= 12){
            console.log('IE Edge');
            ieAnimate(line);
        }
        else {
            console.log('IE < 12');
            ieAnimate(line);
        }

    }

    function ieAnimate(lineitem){

        var path = document.querySelector(lineitem);
        path.style.strokeDashoffset = '0';

        TweenMax.fromTo( lineitem, 1,
                         { y: '-=20px', autoAlpha: 0, rotation:0.01, force3D:true },
                         { y: '0', autoAlpha: 1,  rotation:0.01, force3D:true } );
    }

    var controller = new ScrollMagic.Controller();

    //Flow animations for the desktop
    var howItWorksAnim = new TimelineMax({
        paused: true
    });

    //Flow animations for the mobile
    var howItWorksAnimMobile = new TimelineMax({
        paused: true
    });

    howItWorksAnimMobile
        .add(
            TweenMax
                .fromTo('.why-factor__flow-img-wrapper.first', 0.6,
                    { opacity: 0, scale: 0 },
                    { opacity: 1, scale: 1, rotation:0.01, ease: Power2.easeInOut, force3D: true }
                )
        )
        .add(
            TweenMax
                .fromTo('.why-factor__title.title-1', 0.8,
                    {autoAlpha: 0},
                    {autoAlpha: 1, delay: 0, ease: Power2.easeInOut,  rotation:0.01, force3D:true }
                )
        )
        .add(
            TweenMax
                .fromTo('.why-factor__detail.first', 0.5,
                    {autoAlpha: 0 },
                    {autoAlpha: 1, delay: 0, rotation:0.01, force3D:true, ease: Power2.easeInOut}
                )
        )
        .add(
            TweenMax
                .fromTo('.why-factor__flow-img-wrapper.third', 1,
                    { autoAlpha: 0, scale: 0 },
                    { autoAlpha: 1, scale: 1, delay: 0, rotation:0.01, force3D:true, ease: Power2.easeInOut }
                )
        )
        .add(
            TweenMax
                .fromTo('.why-factor__title.title-2', 0.8,
                    {autoAlpha: 0 },
                    {autoAlpha: 1, delay: 0.5, rotation:0.01, force3D:true, ease: Power2.easeInOut }
                )
        )
        .add(
            TweenMax
                .fromTo('.why-factor__detail.second', 0.5,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, delay: 0.2, rotation:0.01, force3D:true, ease: Power2.easeInOut}
                )
        )
        .add(
            TweenMax
                .fromTo('.why-factor__flow-img-wrapper.fourth', 1,
                    { autoAlpha: 0, scale: 0},
                    { autoAlpha: 1, scale: 1, delay: 0, rotation:0.01, force3D:true, ease: Power2.easeInOut  }
                )
        )
        .add(
            TweenMax
            .fromTo('.why-factor__title.title-3', 0.8,
                { autoAlpha: 0 },
                { autoAlpha: 1, delay: 0.5, rotation:0.01, force3D:true, ease: Power2.easeInOut }
            )
        )
        .add(
            TweenMax
            .fromTo('.why-factor__detail.third', 0.5,
                {autoAlpha: 0 },
                {autoAlpha: 1, delay: 0.2, rotation:0.01, force3D:true, ease: Power0.easeNone}
            )
        );


//Timeline animations for > 768px (tablets and above)
    howItWorksAnim
    .add(
        TweenMax
            .fromTo('.why-factor__flow-img-wrapper.first', 1,
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, rotation:0.01, ease: Power2.easeInOut, force3D:true }
            )
    )
    .add(
        TweenMax
            .fromTo('.why-factor__title.title-1', 0.5,
                {autoAlpha: 0},
                {autoAlpha: 1, delay: 0, ease: Power2.easeInOut,  rotation:0.01, force3D:true }
            )
    )
    .add(
        TweenMax
            .fromTo('.why-factor__detail.first', 0.5,
                { autoAlpha: 0 },
                { autoAlpha: 1, delay: 0, rotation:0.01, force3D:true, ease: Power2.easeInOut}
            )
        )
    .add(function(){
        animateLine('.line1-path');
    })
    .add(
        TweenMax
            .fromTo('.why-factor__flow-img-wrapper.second', 1,
                { autoAlpha: 0, scale: 0 },
                { autoAlpha: 1, scale: 1, delay: 0, rotation: 0.01, force3D:true, ease: Power2.easeInOut }
            )
    )
    .add(function(){
        animateLine('.line2-path');
    })
    .add(
        TweenMax
            .fromTo('.why-factor__title.title-2', 0.5,
                { autoAlpha: 0 },
                { autoAlpha: 1, delay: 0, rotation:0.01, force3D:true, ease: Power2.easeInOut }
            )
    )
    .add(
        TweenMax
            .fromTo('.why-factor__detail.second', 0.5,
                { autoAlpha: 0 },
                { autoAlpha: 1, delay: 0, rotation:0.01, force3D:true, ease: Power2.easeInOut}
            )
    )
    .add(
        TweenMax
            .fromTo('.why-factor__flow-img-wrapper.third', 1,
                { autoAlpha: 0, scale: 0 },
                { autoAlpha: 1, scale: 1, delay: 0, rotation:0.01, force3D:true, ease: Power2.easeInOut }
            )
    )
    .add(function(){
        animateLine('.line3-path');
    })
    .add(
        TweenMax
        .fromTo('.why-factor__title.title-3', 0.5,
        { autoAlpha: 0 },
        { autoAlpha: 1, delay: 1, rotation:0.01, force3D:true, ease: Power2.easeInOut }
    )
    )
    .add(
        TweenMax
        .fromTo('.why-factor__detail.third', 0.5,
            { autoAlpha: 0 },
            { autoAlpha: 1, delay: 0, rotation:0.01, force3D:true, ease: Power2.easeInOut}
        )
    )
    .add(
        TweenMax
            .fromTo('.why-factor__flow-img-wrapper.fourth', 0.5,
                { autoAlpha: 0, scale: 0},
                { autoAlpha: 1, scale: 1, delay: 0, rotation:0.01, force3D:true, ease: Power2.easeInOut  }
            )
    );


    var screenheight = $(window).height();
    var screenWidth = $(window).width();

    if(screenWidth < 768) {
        console.log('on mobile');
        var sceneMobile = new ScrollMagic.Scene({
            triggerElement: '.why-factor-first-row',
            offset: '-50',
            reverse: false
        })
        .setTween(howItWorksAnimMobile)
        // .addIndicators({
        //     name: 'How it works'
        // })
        .addTo(controller);
        howItWorksAnimMobile.play();
    }
    else {
        var scene = new ScrollMagic.Scene({
            triggerElement: '.why-factor-first-row',
            offset: $(window).height() > 900 ? '-400' : '-200',
            reverse: false
        })
        .setTween(howItWorksAnim)
        // .addIndicators({
        //     name: 'How it works'
        // })
        .addTo(controller);
        howItWorksAnim.play();
    }

});
