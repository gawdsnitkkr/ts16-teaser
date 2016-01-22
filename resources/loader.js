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
        LoaderSVG = $('#Loader'),
        LoaderOuter = LoaderSVG.find('#Outer'),
        LoaderInner = LoaderSVG.find('#Inner'),
        LoaderText = LoaderSVG.find('text'),
        IsFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
        Easing = Power4.easeOut;
    if (AspectRatio > DefaultAspectRatio) {
        SVGWidth = Width;
        SVGHeight = Math.ceil(SVGWidth / DefaultAspectRatio);
    } else if (AspectRatio < DefaultAspectRatio) {
        SVGHeight = Math.ceil(SVGWidth / DefaultAspectRatio);
    }
    SVGMarginTop = (Height - SVGHeight) / 2;
    if (IsFirefox) t.set(LoaderText, {
        x: '+=15'
    });
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
                rotation: 90,
                scale: 1.3,
                transformOrigin: '50% 50%',
                ease: Easing,
                onComplete: function () {
                    t.to(LoaderOuter, 1, {
                        rotation: 0,
                        scale: 1,
                        transformOrigin: '50% 50%',
                        ease: Easing,
                        onComplete: Loading
                    });
                }
            });
            t.to(LoaderInner, 1, {
                rotation: -90,
                scale: 1.3,
                transformOrigin: '50% 50%',
                ease: Easing,
                onComplete: function () {
                    t.to(LoaderInner, 1, {
                        rotation: 0,
                        scale: 1,
                        transformOrigin: '50% 50%',
                        ease: Easing
                    });
                }
            });
        } else {
            t.to(LoaderSVG, 1, {
                opacity: 0,
                y: -50,
                transformOrigin: '50% 50%',
                ease: Easing,
                onComplete: function () {
                    LoaderSVG.remove();
                    if (w.LoadingCallBack) w.LoadingCallBack();
                }
            });
            t.to(LoaderText, 1, {
                attr: {
                    y: '-=50'
                },
                ease: Easing
            });
        }
    }
})(window, jQuery, TweenMax);