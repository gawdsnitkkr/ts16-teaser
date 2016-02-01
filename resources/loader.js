(function (w, $, t) {
    w.LoadingDone = false;
    var Width = w.innerWidth,
        Height = w.innerHeight,
        SVGWidth = Width,
        SVGHeight = Height,
        SVGMarginTop,
        SVGMarginLeft = 0,
        AspectRatio = Width / Height,
        DefaultAspectRatio = 1.78,
        LoaderSVG = $('#Loader', document),
        LoaderBlip = LoaderSVG.find('#Blip'),
        LoaderOuter = LoaderSVG.find('#Outer'),
        LoaderInner = LoaderSVG.find('#Inner'),
        Power4EaseOut = Power4.easeOut,
        ElasticEaseOut = Elastic.easeOut.config(2, 1);
    if (AspectRatio > DefaultAspectRatio) {
        SVGWidth = Width;
        SVGHeight = Math.ceil(SVGWidth / DefaultAspectRatio);
    } else if (AspectRatio < DefaultAspectRatio) {
        SVGHeight = Math.ceil(SVGWidth / DefaultAspectRatio);
    }
    SVGMarginTop = (Height - SVGHeight) / 2;
    t.fromTo(LoaderSVG, 0.5, {
        width: SVGWidth,
        height: SVGHeight,
        marginTop: SVGMarginTop + 100,
        marginLeft: SVGMarginLeft,
        opacity: 0,
        transformOrigin: '50% 50%'
    }, {
        marginTop: SVGMarginTop,
        marginLeft: SVGMarginLeft,
        opacity: 1,
        transformOrigin: '50% 50%',
        ease: Power4.easeOut,
        onComplete: Loading
    });

    function Loading() {
        if (!w.LoadingDone) {
            t.to(LoaderOuter, 1, {
                fill: '#8bc34a',
                rotation: '+=22.5',
                transformOrigin: '50% 50%',
                attr: {
                    rx: 24,
                    ry: 24
                },
                ease: Power4EaseOut,
                onComplete: function () {
                    t.to(LoaderOuter, 1, {
                        fill: '#262626',
                        rotation: '+=22.5',
                        transformOrigin: '50% 50%',
                        attr: {
                            rx: 0,
                            ry: 0
                        },
                        ease: Power4EaseOut
                    });
                }
            });
            t.to(LoaderInner, 1, {
                fill: '#262626',
                rotation: '-=22.5',
                transformOrigin: '50% 50%',
                attr: {
                    rx: 12,
                    ry: 12
                },
                ease: Power4EaseOut,
                onComplete: function () {
                    t.to(LoaderInner, 1, {
                        fill: '#8bc34a',
                        rotation: '-=22.5',
                        transformOrigin: '50% 50%',
                        attr: {
                            rx: 0,
                            ry: 0
                        },
                        ease: Power4EaseOut
                    });
                }
            });
            t.to(LoaderOuter, 1, {
                scale: 2,
                transformOrigin: '50% 50%',
                ease: ElasticEaseOut,
                onComplete: function () {
                    t.to(LoaderOuter, 1, {
                        scale: 1,
                        transformOrigin: '50% 50%',
                        ease: ElasticEaseOut
                    });
                }
            });
            t.to(LoaderInner, 1, {
                scale: 2,
                transformOrigin: '50% 50%',
                ease: ElasticEaseOut,
                delay: 0.1,
                onComplete: function () {
                    t.to(LoaderInner, 1, {
                        scale: 1,
                        transformOrigin: '50% 50%',
                        ease: ElasticEaseOut,
                        onComplete: Loading
                    });
                }
            });
            t.fromTo(LoaderBlip, 1, {
                scale: 2,
                transformOrigin: '50% 50%'
            }, {
                opacity: 0.25,
                scale: 3,
                transformOrigin: '50% 50%',
                ease: Linear.easeNone,
                onComplete: function () {
                    t.to(LoaderBlip, 1, {
                        opacity: 0,
                        scale: 7,
                        transformOrigin: '50% 50%',
                        ease: Power4EaseOut
                    });
                }
            });
        } else {
            t.staggerTo([LoaderOuter, LoaderInner], 1, {
                opacity: 0,
                scale: 0,
                rotation: '+=360',
                transformOrigin: '50% 50%',
                ease: Back.easeIn
            }, 0.15);
            t.staggerTo([LoaderOuter, LoaderInner], 1, {
                attr: {
                    rx: 24,
                    ry: 24
                },
                ease: Power4.easeIn
            }, 0.15, function () {
                LoaderSVG.remove();
                if (w.LoadingCallBack) w.LoadingCallBack();
            });
        }
    }
})(window, jQuery, TweenMax);