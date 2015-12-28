(function (w, d, wO, dO, $, t) {
    var Width = w.innerWidth,
        Height = w.innerHeight,
        SVGObject,
        SVGRoot,
        SVGRootObject,
        SVGElements = {},
        Functions = {
            DequeAnimation: function (i, callback) {
                t.to(SVGElements.PeopleArray[i], 0.5, {
                    opacity: 0,
                    ease: Linear.easeInOut
                });
                t.staggerTo(SVGElements.PeopleArray, 0.3, {
                    x: '-=42',
                    scale: 0.28,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut,
                    onComplete: function () {
                        t.to(this.target, 0.5, {
                            scale: 0.3,
                            transformOrigin: '50% 50%',
                            ease: Power4.easeOut
                        });
                    }
                }, 0.1, callback);
            },
            QueueEnterAnimation: function () {
                SVGElements.PeopleGroup.css('opacity', 1);
                t.fromTo(SVGElements.PeopleGroup, 2.2, {
                    x: 300
                }, {
                    x: 0,
                    ease: Power2.easeInOut
                });
                t.staggerFromTo(SVGElements.PeopleArray, 0.4, {
                    opacity: 0,
                    scale: 0,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    scale: 0.3,
                    transformOrigin: '50% 50%',
                    ease: Elastic.easeOut.config(2, 1)
                }, 0.2, function () {
                    Functions.DequeAnimation(0, function () {
                        Functions.DequeAnimation(1, Functions.TabletEnterAnimation);
                    });
                });
            },
            QueueExitAnimation: function (callback) {
                t.staggerTo(SVGElements.PeopleArray, 0.5, {
                    opacity: 0,
                    y: '-=80',
                    ease: Power4.easeOut
                }, 0.1, callback);
            },
            TextEnterAnimation: function (text, callback) {
                var n = text.length,
                    i = 0;
                var Interval = setInterval(function () {
                    if (i != n) {
                        SVGElements.BrowserAddressText.append(text[i++]);
                    } else {
                        clearInterval(Interval);
                        callback();
                    }
                }, 100);
            },
            SmartClassAppEnterAnimation: function () {
                t.fromTo(SVGElements.SmartClassApp, 0.5, {
                    opacity: 0,
                    display: 'block',
                    scale: 0.8,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Power3.easeOut
                });
                t.fromTo(SVGElements.SmartClassAppIcon, 1, {
                    opacity: 0,
                    scale: 5,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    scale: 6,
                    transformOrigin: '50% 50%',
                    ease: Power3.easeOut,
                    onComplete: function () {
                        t.to(SVGElements.SmartClassAppIconHead, 0.5, {
                            y: '-=1',
                            ease: Power3.easeOut,
                            onComplete: function () {
                                t.to(SVGElements.SmartClassAppIconHead, 0.5, {
                                    y: '+=1',
                                    ease: Power3.easeOut,
                                    onComplete: function () {

                                    }
                                });
                            }
                        });
                    }
                });
                t.fromTo(SVGElements.SmartClassAppTitle, 2, {
                    opacity: 0,
                    scale: 0.8,
                    y: -20,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Power3.easeOut
                });
            },
            HandEnterAnimation: function () {
                t.fromTo(SVGElements.TabletHand, 1, {
                    opacity: 1,
                    rotation: -30,
                    x: 100,
                    y: 100
                }, {
                    opacity: 1,
                    rotation: 0,
                    x: -100,
                    y: -50,
                    ease: Power3.easeOut,
                    onComplete: function () {
                        t.to(SVGElements.TabletHand, 0.5, {
                            x: -400,
                            y: -75,
                            rotation: -10,
                            scale: 0.9,
                            transformOrigin: '50% 50%',
                            ease: Power3.easeOut,
                            onComplete: function () {
                                t.to(SVGElements.TabletHand, 0.5, {
                                    x: -100,
                                    y: -50,
                                    rotation: 0,
                                    scale: 1,
                                    transformOrigin: '50% 50%',
                                    ease: Power3.easeOut,
                                    onComplete: function () {
                                        t.to(SVGElements.TabletHand, 1, {
                                            x: -300,
                                            y: -75,
                                            ease: Power3.easeOut,
                                            delay: 1,
                                            onComplete: function () {
                                                t.to(SVGElements.TabletHand, 0.25, {
                                                    scale: 0.8,
                                                    transformOrigin: '50% 50%',
                                                    ease: Power4.easeOut,
                                                    onComplete: function () {
                                                        t.to(SVGElements.TabletHand, 0.25, {
                                                            scale: 1,
                                                            transformOrigin: '50% 50%',
                                                            ease: Power4.easeOut,
                                                            onComplete: function () {
                                                                t.to(SVGElements.SmartClassAppClickBack, 0.25, {
                                                                    opacity: 1,
                                                                    scale: 40,
                                                                    transformOrigin: '50% 50%',
                                                                    ease: Linear.easeOut,
                                                                    onComplete: function () {
                                                                        t.to(SVGElements.SmartClassAppClickBack, 2, {
                                                                            opacity: 0,
                                                                            scale: 100,
                                                                            transformOrigin: '50% 50%',
                                                                            ease: Power4.easeOut,
                                                                            onComplete: function () {

                                                                            }
                                                                        });
                                                                        t.to(SVGElements.TabletHand, 0.5, {
                                                                            opacity: 0,
                                                                            x: 100,
                                                                            y: 100,
                                                                            rotation: 30,
                                                                            scale: 2,
                                                                            transformOrigin: '50% 50%',
                                                                            ease: Power4.easeOut
                                                                        });
                                                                        t.to(SVGElements.TabletBody, 0.5, {
                                                                            opacity: 0,
                                                                            scale: 2,
                                                                            transformOrigin: '50% 50%',
                                                                            ease: Power4.easeOut
                                                                        });
                                                                        t.to(SVGElements.SmartClassApp, 1.5, {
                                                                            scale: 2,
                                                                            transformOrigin: '50% 50%',
                                                                            ease: Power4.easeOut
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        t.to(SVGElements.Browser, 0.5, {
                            x: '-=400',
                            opacity: 0,
                            ease: Power3.easeOut
                        });
                        Functions.SmartClassAppEnterAnimation();
                    }
                });
            },
            TabletEnterAnimation: function () {
                t.fromTo(SVGElements.TabletBody, 1, {
                    opacity: 0,
                    display: 'block',
                    rotation: 30,
                    x: 100,
                    y: 100
                }, {
                    opacity: 1,
                    rotation: 0,
                    x: 0,
                    y: 0,
                    ease: Power3.easeOut,
                    onComplete: function () {
                        t.fromTo(SVGElements.Browser, 0.5, {
                            opacity: 0,
                            display: 'block',
                            y: -540
                        }, {
                            opacity: 1,
                            y: -572,
                            ease: Power3.easeOut
                        });
                        Functions.TextEnterAnimation('irctc.co.in', function () {
                            Functions.QueueExitAnimation(Functions.HandEnterAnimation);
                        });
                    }
                });
            },
            BrowserEnterAnimation: function () {

            },
            Start: function () {
                Functions.QueueEnterAnimation();
            }
        };
    dO.on('ready', function () {
        SVGObject = $('#SVG').on('load', function () {
            SVGRoot = SVGObject[0].contentDocument.documentElement;
            SVGRootObject = $(SVGRoot);
            SVGElements.TabletShadow = $('#TabletShadow', SVGRootObject);
            SVGElements.TabletBody = $('#TabletBody', SVGRootObject);
            SVGElements.TabletHand = $('#TabletHand', SVGRootObject).css('opacity', 0);
            SVGElements.PeopleGroup = $('#PeopleGroup', SVGRootObject).css('opacity', 0);
            SVGElements.PeopleArray = SVGElements.PeopleGroup.find('g');
            SVGElements.Browser = $('#Browser', SVGRootObject);
            SVGElements.BrowserBack = $('#BrowserBack', SVGRootObject);
            SVGElements.BrowserAddress = $('#BrowserAddress', SVGRootObject);
            SVGElements.BrowserAddressText = SVGElements.BrowserAddress.find('tspan').html('');
            SVGElements.SmartClassApp = $('#SmartClassApp', SVGRootObject);
            SVGElements.SmartClassAppLogo = $('#SmartClassApp', SVGRootObject);
            SVGElements.SmartClassAppIcon = $('#SmartClassAppIcon', SVGRootObject);
            SVGElements.SmartClassAppIconHead = $('#SmartClassAppIconHead', SVGRootObject);
            SVGElements.SmartClassAppTitle = $('#SmartClassAppTitle', SVGRootObject);
            SVGElements.SmartClassAppClickBack = $('#SmartClassAppClickBack', SVGRootObject).css('opacity', 0);
            Functions.Start();
        });
    });
})(window, document, jQuery(window), jQuery(document), jQuery, TweenMax);