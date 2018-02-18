
//Pattern animations

var patternCircle = new TimelineMax({repeat:-1, yoyo: true, ease: Power1.easeIn });

patternCircle
    .from('.pattern-circle', 2, { y: '0' })
    .to('.pattern-circle', 2, { y: '40' });

var patternBigCircle = new TimelineMax({repeat:-1, yoyo: true, ease: Power1.easeIn });

patternBigCircle
    .from('.pattern-big-circle', 2, { x: '-120' })
    .to('.pattern-big-circle', 2, { x: '20' });

var patternBigCircle2 = new TimelineMax({repeat:-1, yoyo: true, ease: Power2.easeIn });

patternBigCircle2
    .from('.why-factor-last-pattern .pattern-big-circle', 3, { x: '30' })
    .to('.why-factor-last-pattern .pattern-big-circle', 3, { x: '5' });

var patternBigRect = new TimelineMax({repeat:-1, yoyo: true, ease: Power1.easeIn });

patternBigRect
    .from('.pattern-big-rect', 2, { x: '50' })
    .to('.pattern-big-rect', 2, { x: '0' });

var patternCircleLast = new TimelineMax({repeat:-1, yoyo: true, ease: Power0.easeNone });

patternCircleLast
    .from('.features-pattern-svg2 .pattern-circle', 2, { y: -40 })
    .to('.features-pattern-svg2 .pattern-circle', 2, { y: 10 });
