(function (w, d, wO, dO, $, t) {
    var Width = w.innerWidth,
        Height = w.innerHeight,
        HalfWidth = Width / 2,
        HalfHeight = Height / 2,
        SVGObject,
        SVGRoot,
        SVGRootObject,
        SVGElements = {},
        ElasticEasingIn = Elastic.easeIn.config(2, 1),
        ElasticEasingOut = Elastic.easeOut.config(2, 1),
        Power4EaseOut = Power4.easeOut,
        Power4EaseIn = Power4.easeIn,
        Power4EaseInOut = Power4.easeInOut,
        Power3EaseOut = Power4.easeOut,
        Power3EaseInOut = Power4.easeInOut,
        FacebookLinkObject,
        YoutubeLinkObject,
        GooglePlusLinkObject,
        TwitterLinkObject,
        GAWDSLinkObject,
        LinksActive = false,
        BackgroundMusic,
        IsFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
        Functions = {
            DequeAnimation: function (i, callback) {
                t.to(SVGElements.PeopleArray[i], 0.5, {
                    opacity: 0,
                    ease: Linear.easeInOut
                });
                t.staggerTo(SVGElements.PeopleArray, 0.3, {
                    x: '-=42',
                    scale: '-=0.02',
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut,
                    onComplete: function () {
                        t.to(this.target, 0.5, {
                            scale: '+=0.02',
                            transformOrigin: '50% 50%',
                            ease: Power4EaseOut
                        });
                    }
                }, 0.1, callback);
            },
            QueueEnterAnimation: function () {
                t.fromTo(SVGElements.PeopleText, 2, {
                    opacity: 0,
                    x: 225,
                    y: 25,
                    scale: 0.7,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    x: 100,
                    ease: Power4EaseIn,
                    onComplete: function () {
                        t.to(SVGElements.PeopleText, 2, {
                            x: 50,
                            ease: Linear.easeNone,
                            onComplete: function () {
                                t.to(SVGElements.PeopleText, 1, {
                                    opacity: 0,
                                    x: 25,
                                    ease: Power4EaseOut
                                });
                            }
                        });
                    }
                });
                t.fromTo(SVGElements.PeopleGroup, 2.2, {
                    opacity: 1,
                    display: 'block',
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
                    ease: ElasticEasingOut
                }, 0.2, function () {
                    Functions.DequeAnimation(0, function () {
                        Functions.DequeAnimation(1, Functions.TabletEnterAnimation);
                    });
                });
            },
            QueueExitAnimation: function (callback) {
                t.staggerTo(SVGElements.PeopleArray, 0.5, {
                    opacity: 0,
                    scale: 0,
                    transformOrigin: '50% 50%',
                    ease: ElasticEasingIn
                }, 0.1, callback);
            },
            TextEnterAnimation: function (text, callback) {
                var n = text.length,
                    i = 0,
                    TextInterval = setInterval(function () {
                        if (i != n) {
                            SVGElements.BrowserAddressText.append(text[i++]);
                        } else {
                            clearInterval(TextInterval);
                            callback();
                        }
                    }, 100);
            },
            SmartClassAppEnterAnimation: function () {
                t.fromTo(SVGElements.SmartAppText, 1, {
                    opacity: 0,
                    x: -40,
                    y: 0,
                    scale: 0.5,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    scale: 0.7,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseIn,
                    onComplete: function () {
                        t.to(SVGElements.SmartAppText, 2.5, {
                            scale: 1,
                            transformOrigin: '50% 50%',
                            ease: Linear.easeNone,
                            onComplete: function () {
                                t.to(SVGElements.SmartAppText, 1, {
                                    opacity: 0,
                                    y: -70,
                                    scale: 1.5,
                                    transformOrigin: '50% 50%',
                                    ease: Power4EaseOut
                                });
                            }
                        });
                    }
                });
                t.fromTo(SVGElements.SmartClassApp, 0.5, {
                    opacity: 0,
                    display: 'block',
                    scale: 0.8,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Power3EaseOut
                });
                t.fromTo(SVGElements.SmartClassAppIcon, 1, {
                    opacity: 0,
                    scale: 5,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    scale: 6,
                    transformOrigin: '50% 50%',
                    ease: Power3EaseOut,
                    onComplete: function () {
                        t.to(SVGElements.SmartClassAppIconHead, 0.5, {
                            y: '-=1',
                            ease: Power3EaseOut,
                            onComplete: function () {
                                t.to(SVGElements.SmartClassAppIconHead, 0.5, {
                                    y: '+=1',
                                    ease: Power3EaseOut
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
                    ease: Power3EaseOut
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
                    ease: Power3EaseOut,
                    onComplete: function () {
                        t.to(SVGElements.TabletHand, 0.5, {
                            x: -400,
                            y: -75,
                            rotation: -10,
                            scale: 0.9,
                            transformOrigin: '50% 50%',
                            ease: Power3EaseOut,
                            onComplete: function () {
                                t.to(SVGElements.TabletHand, 0.5, {
                                    x: -100,
                                    y: -50,
                                    rotation: 0,
                                    scale: 1,
                                    transformOrigin: '50% 50%',
                                    ease: Power3EaseOut,
                                    onComplete: function () {
                                        t.to(SVGElements.TabletHand, 1, {
                                            x: -300,
                                            y: -75,
                                            ease: Power3EaseOut,
                                            delay: 1,
                                            onComplete: function () {
                                                t.to(SVGElements.TabletHand, 0.25, {
                                                    scale: 0.8,
                                                    transformOrigin: '50% 50%',
                                                    ease: Power4EaseOut,
                                                    onComplete: function () {
                                                        t.to(SVGElements.TabletHand, 0.25, {
                                                            scale: 1,
                                                            transformOrigin: '50% 50%',
                                                            ease: Power4EaseOut,
                                                            onComplete: function () {
                                                                t.to(SVGElements.SmartClassAppClickBack, 0.25, {
                                                                    opacity: 1,
                                                                    scale: 10,
                                                                    transformOrigin: '50% 50%',
                                                                    ease: Linear.easeOut,
                                                                    onComplete: function () {
                                                                        t.to(SVGElements.SmartClassAppClickBack, 2, {
                                                                            opacity: 0,
                                                                            scale: 20,
                                                                            transformOrigin: '50% 50%',
                                                                            ease: Power4EaseOut
                                                                        });
                                                                    }
                                                                });
                                                                t.to(SVGElements.TabletHand, 2, {
                                                                    y: 500,
                                                                    skewX: 90,
                                                                    transformOrigin: '50% 50%',
                                                                    ease: Power3EaseOut
                                                                });
                                                                t.to(SVGElements.TabletBody, 2, {
                                                                    scale: 2,
                                                                    transformOrigin: '50% 50%',
                                                                    ease: Power3EaseOut
                                                                });
                                                                t.to(SVGElements.SmartClassAppBack, 1.5, {
                                                                    attr: {
                                                                        rx: 0,
                                                                        ry: 0
                                                                    },
                                                                    ease: Power4EaseOut
                                                                });
                                                                t.to(SVGElements.SmartClassApp, 1.5, {
                                                                    scale: 2,
                                                                    transformOrigin: '50% 50%',
                                                                    ease: Power4EaseOut,
                                                                    onComplete: Functions.ClassRoomEnterAnimation
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
                            x: '-=735',
                            ease: Power3EaseOut
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
                    y: 200
                }, {
                    opacity: 1,
                    rotation: 0,
                    x: 0,
                    y: 0,
                    ease: Power3EaseOut,
                    onComplete: function () {
                        t.fromTo(SVGElements.Browser, 0.5, {
                            opacity: 0,
                            display: 'block',
                            y: -540
                        }, {
                            opacity: 1,
                            y: -572,
                            ease: Power3EaseOut
                        });
                        t.fromTo(SVGElements.BrowserTextOne, 2, {
                            opacity: 0,
                            x: -50,
                            y: -10,
                            scale: 0.75,
                            transformOrigin: '50% 50%'
                        }, {
                            opacity: 1,
                            x: -30,
                            ease: Power4EaseIn,
                            onComplete: function () {
                                t.to(SVGElements.BrowserTextOne, 1.5, {
                                    x: 0,
                                    ease: Linear.easeNone,
                                    onComplete: function () {
                                        t.to(SVGElements.BrowserTextOne, 1, {
                                            opacity: 0,
                                            x: 20,
                                            ease: Power4EaseOut
                                        });
                                    }
                                });
                                t.fromTo(SVGElements.BrowserTextTwo, 1, {
                                    opacity: 0,
                                    x: -65,
                                    y: -30,
                                    scale: 1,
                                    transformOrigin: '50% 50%'
                                }, {
                                    opacity: 1,
                                    y: -10,
                                    delay: 0.5,
                                    ease: Power4EaseOut
                                });
                                t.to(SVGElements.BrowserTextTwo, 1.5, {
                                    x: -35,
                                    ease: Linear.easeNone,
                                    onComplete: function () {
                                        t.to(SVGElements.BrowserTextTwo, 1, {
                                            opacity: 0,
                                            x: -15,
                                            ease: Power4EaseOut
                                        });
                                    }
                                });
                            }
                        });
                        Functions.TextEnterAnimation('irctc.co.in', function () {
                            t.to(SVGElements.Website, 0.5, {
                                opacity: 1,
                                ease: Power3EaseOut
                            });
                            t.to(SVGElements.PeopleGroup, 0.5, {
                                x: '+=10',
                                y: '+=50',
                                scale: 0.8,
                                transformOrigin: '50% 50%',
                                ease: Power3EaseOut,
                                onComplete: function () {
                                    Functions.QueueExitAnimation(Functions.HandEnterAnimation);
                                }
                            });
                        });
                    }
                });
            },
            ShowLinks: function () {
                FacebookLinkObject = $('#FacebookLink', d).Link({
                    X: 'left',
                    Y: 'bottom',
                    OffsetX: 24,
                    OffsetY: -24,
                    CallBackBind: 'click',
                    CallBack: function () {
                        w.open('https://www.facebook.com/techspardha.nitkkr/?fref=ts');
                    }
                }).Position(Width, Height, HalfWidth, HalfHeight).Show();
                YoutubeLinkObject = $('#YoutubeLink', d).Link({
                    X: 'left',
                    Y: 'bottom',
                    OffsetX: 24,
                    OffsetY: -80,
                    CallBackBind: 'click',
                    CallBack: function () {
                        w.open('https://www.youtube.com/channel/UCAzrQemb7hxtpDNgvudqyPQ');
                    }
                }).Position(Width, Height, HalfWidth, HalfHeight).Show();
                GooglePlusLinkObject = $('#GooglePlusLink', d).Link({
                    X: 'left',
                    Y: 'bottom',
                    OffsetX: 24,
                    OffsetY: -136,
                    CallBackBind: 'click',
                    CallBack: function () {
                        w.open('https://plus.google.com/+TechspardhaNITKuruksehtra');
                    }
                }).Position(Width, Height, HalfWidth, HalfHeight).Show();
                TwitterLinkObject = $('#TwitterLink', d).Link({
                    X: 'left',
                    Y: 'bottom',
                    OffsetX: 24,
                    OffsetY: -191,
                    CallBackBind: 'click',
                    CallBack: function () {
                        w.open('https://twitter.com/tsnitkkr');
                    }
                }).Position(Width, Height, HalfWidth, HalfHeight).Show();
                GAWDSLinkObject = $('#GAWDSLink', d).Link({
                    X: 'right',
                    Y: 'bottom',
                    OffsetX: -96,
                    OffsetY: -24,
                    CallBackBind: 'click',
                    CallBack: function () {
                        w.open('http://www.gawds.in');
                    }
                }).Position(Width, Height, HalfWidth, HalfHeight).Show();
                LoadFacebookShareButton();
                t.to($('#FacebookShareButton', d), 1, {
                    opacity: 1,
                    ease: Power4EaseOut
                });
                LinksActive = true;
            },
            TechspardhaEnterAnimation: function () {
                t.fromTo(SVGElements.Techspardha, 4, {
                    opacity: 0,
                    scale: 0.7,
                    transformOrigin: '50% 75%'
                }, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: '50% 75%',
                    ease: Power3EaseOut
                });
                t.staggerFromTo(SVGElements.TechspardhaChildren, 1, {
                    scale: 0.7,
                    transformOrigin: '50% 50%'
                }, {
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut
                }, 0.15);
                Functions.PathAnimation(SVGElements.BackGround, 20, Power4EaseOut, false, 1, 500, 1);
                Functions.PathAnimation(SVGElements.ForeGround, 20, Power4EaseOut, false, 1, 500, 1.15);
                t.to(SVGElements.TechspardhaText, 0.15, {
                    fill: '#8bc34a',
                    delay: 4,
                    ease: Power4EaseOut,
                    onComplete: function () {
                        t.to(SVGElements.TechspardhaText, 0.075, {
                            fill: '#181818',
                            ease: Power4EaseOut,
                            onComplete: function () {
                                t.to(SVGElements.TechspardhaText, 0.075, {
                                    fill: '#8bc34a',
                                    ease: Power4EaseOut,
                                    onComplete: function () {
                                        t.to(SVGElements.TechspardhaText, 0.075, {
                                            fill: '#181818',
                                            ease: Power4EaseOut,
                                            onComplete: function () {
                                                t.to(SVGElements.TechspardhaText, 0.5, {
                                                    fill: '#8bc34a',
                                                    delay: 0.2,
                                                    ease: Power4EaseOut,
                                                    onComplete: function () {
                                                        t.fromTo(SVGElements.SmartIndiaText, 1, {
                                                            y: -15,
                                                            opacity: 0
                                                        }, {
                                                            y: 0,
                                                            opacity: 1,
                                                            ease: Power4EaseOut
                                                        });
                                                        t.fromTo(SVGElements.TechspardhaDate, 1, {
                                                            y: 557,
                                                            opacity: 0
                                                        }, {
                                                            y: 572,
                                                            opacity: 1,
                                                            ease: Power4EaseOut
                                                        });
                                                        setTimeout(Functions.ShowLinks, 1000);
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
            },
            IndiaExitAnimation: function () {
                t.to(SVGElements.PathToHome, 1, {
                    opacity: 0,
                    ease: Power3EaseOut,
                    onComplete: function () {
                        t.fromTo(SVGElements.IndiaTextFive, 1, {
                            x: 70,
                            y: 220,
                            opacity: 0
                        }, {
                            opacity: 1,
                            y: 190,
                            delay: 1.75,
                            ease: ElasticEasingOut
                        });
                        t.fromTo(SVGElements.IndiaTextSix, 1, {
                            x: 70,
                            y: 230,
                            opacity: 0
                        }, {
                            opacity: 1,
                            y: 200,
                            delay: 1.9,
                            ease: ElasticEasingOut
                        });
                        t.to(SVGElements.India, 3, {
                            x: '+=590',
                            y: '+=1300',
                            scale: 10,
                            transformOrigin: '50% 50%',
                            ease: ElasticEasingOut,
                            onComplete: function () {
                                t.to(SVGElements.IndiaTextSix, 1, {
                                    opacity: 0,
                                    y: 230,
                                    scale: 0.7,
                                    transformOrigin: '0% 100%',
                                    ease: ElasticEasingIn
                                });
                                t.to(SVGElements.IndiaTextFive, 1, {
                                    opacity: 0,
                                    y: 210,
                                    scale: 0.7,
                                    transformOrigin: '0% 100%',
                                    delay: 0.15,
                                    ease: ElasticEasingIn
                                });
                                t.to(SVGElements.HomeMarker, 1, {
                                    opacity: 0,
                                    y: 10,
                                    scale: 0,
                                    transformOrigin: '50% 50%',
                                    ease: ElasticEasingIn
                                });
                                t.to(SVGElements.India, 2, {
                                    opacity: 0,
                                    x: '+=380',
                                    y: '+=800',
                                    scale: 16,
                                    transformOrigin: '50% 50%',
                                    ease: ElasticEasingIn,
                                    onComplete: Functions.TechspardhaEnterAnimation
                                });
                            }
                        });
                    }
                });
            },
            IndiaPathToHomeEnterAnimation: function () {
                SVGElements.PathToHome.each(function () {
                    Functions.PathAnimation(this, 3, Power3EaseOut, false, 1);
                });
                t.to(SVGElements.Ways, 1, {
                    opacity: 0,
                    ease: Power3EaseOut
                });
                setTimeout(Functions.IndiaExitAnimation, 3000);
            },
            IndiaHomeMarkerEnterAnimation: function () {
                t.to(SVGElements.IndiaTextTwo, 1, {
                    opacity: 0,
                    y: 50,
                    ease: ElasticEasingIn
                });
                t.to(SVGElements.IndiaTextOne, 1, {
                    opacity: 0,
                    y: 50,
                    delay: 0.15,
                    ease: ElasticEasingIn,
                    onComplete: function () {
                        t.fromTo(SVGElements.IndiaTextThree, 1, {
                            x: 0,
                            y: 30,
                            opacity: 0
                        }, {
                            opacity: 1,
                            y: 50,
                            ease: ElasticEasingOut
                        });
                        t.fromTo(SVGElements.IndiaTextFour, 1, {
                            x: 0,
                            y: 30,
                            opacity: 0
                        }, {
                            opacity: 1,
                            y: 50,
                            delay: 0.15,
                            ease: ElasticEasingOut
                        });
                    }
                });
                t.fromTo(SVGElements.HomeMarker, 1, {
                    opacity: 0,
                    y: 30,
                    scale: 0,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    y: 6,
                    scale: 0.7,
                    transformOrigin: '50% 50%',
                    ease: ElasticEasingOut,
                    onComplete: Functions.IndiaPathToHomeEnterAnimation
                });
            },
            IndiaWaysEnterAnimation: function () {
                SVGElements.Ways.each(function () {
                    Functions.PathAnimation(this, 3, Power3EaseOut, false, 1);
                });
                setTimeout(function () {
                    SVGElements.WaysOverlay.each(function () {
                        Functions.PathAnimation(this, 3, Power3EaseOut, false, 10);
                        t.to(this, 0.5, {
                            opacity: 0,
                            delay: 0.5,
                            ease: Power3EaseOut
                        });
                    });
                    setTimeout(function () {
                        SVGElements.WaysOverlay.each(function () {
                            Functions.PathAnimation(this, 3, Power3EaseOut, false, 10);
                            t.to(this, 0.5, {
                                opacity: 0,
                                delay: 0.5,
                                ease: Power3EaseOut
                            });
                        });
                        setTimeout(Functions.IndiaHomeMarkerEnterAnimation, 1000);
                    }, 1000);
                }, 2000);
            },
            IndiaEnterAnimation: function () {
                t.fromTo(SVGElements.IndiaTextOne, 1, {
                    x: 0,
                    y: 20,
                    opacity: 0
                }, {
                    opacity: 1,
                    y: 0,
                    delay: 1.5,
                    ease: ElasticEasingOut
                });
                t.fromTo(SVGElements.IndiaTextTwo, 1, {
                    x: 0,
                    y: 25,
                    opacity: 0
                }, {
                    opacity: 1,
                    y: 5,
                    delay: 3,
                    ease: ElasticEasingOut
                });
                t.fromTo(SVGElements.India, 1.5, {
                    opacity: 1,
                    y: -550
                }, {
                    y: 0,
                    ease: Power3EaseOut,
                    onComplete: function () {
                        Functions.IndiaWaysEnterAnimation();
                    }
                });
            },
            WindmillExitAnimation: function () {
                Functions.IndiaEnterAnimation();
                t.to(SVGElements.Sky, 2, {
                    opacity: 0,
                    ease: Power3EaseOut
                });
                t.to(SVGElements.PowerLine, 2, {
                    opacity: 0,
                    ease: Power3EaseOut
                });
                //t.to(SVGElements.PowerLineWholeGroup, 1, {
                //    y: 400,
                //    ease: ElasticEasingIn
                //});
                //t.to(SVGElements.Sky, 1, {
                //    y: 485,
                //    delay: 0.25,
                //    ease: ElasticEasingIn
                //});
                //setTimeout(Functions.IndiaEnterAnimation, 1000);
            },
            CloudsAnimation: function () {
                var i = 0,
                    n = SVGElements.Clouds.length;
                for (; i < n; i++)
                    t.to(SVGElements.Clouds[i], Math.random() % 10 + 30, {
                        x: '-=200',
                        ease: Linear.easeNone
                    });
            },
            WindmillEnterAnimation: function () {
                t.fromTo(SVGElements.WindmillTextZero, 1, {
                    opacity: 0,
                    x: 0,
                    y: IsFirefox ? 0 : 20,
                    rotation: 5,
                    scale: 0.8,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    y: IsFirefox ? -35 : -15,
                    scale: 1,
                    transformOrigin: '50% 50%',
                    delay: 3,
                    ease: Elastic.easeOut.config(3, 1),
                    onComplete: function () {
                        t.to(SVGElements.WindmillTextZero, 0.5, {
                            opacity: 0,
                            scale: 0.8,
                            transformOrigin: '50% 50%',
                            ease: ElasticEasingIn,
                            onComplete: function () {
                                t.fromTo(SVGElements.WindmillTextOne, 1, {
                                    opacity: 0,
                                    x: -70,
                                    y: IsFirefox ? -30 : -10
                                }, {
                                    x: -40,
                                    opacity: 1,
                                    ease: ElasticEasingOut
                                });
                                t.fromTo(SVGElements.WindmillTextTwo, 1, {
                                    opacity: 0,
                                    x: -10,
                                    y: IsFirefox ? -30 : -10
                                }, {
                                    x: -40,
                                    opacity: 1,
                                    delay: 0.75,
                                    ease: ElasticEasingOut
                                });
                                t.fromTo(SVGElements.WindmillTextThree, 1, {
                                    opacity: 0,
                                    x: -40,
                                    y: IsFirefox ? 0 : 20
                                }, {
                                    y: IsFirefox ? -30 : -10,
                                    opacity: 1,
                                    delay: 1.5,
                                    ease: ElasticEasingOut
                                });
                                t.to(SVGElements.WindmillTextOne, 1, {
                                    y: IsFirefox ? -20 : 0,
                                    opacity: 0,
                                    delay: 2.65,
                                    ease: ElasticEasingIn
                                });
                                t.to(SVGElements.WindmillTextTwo, 1, {
                                    y: IsFirefox ? -15 : 5,
                                    opacity: 0,
                                    delay: 2.8,
                                    ease: ElasticEasingIn
                                });
                                t.to(SVGElements.WindmillTextThree, 1, {
                                    y: IsFirefox ? -10 : 10,
                                    opacity: 0,
                                    delay: 2.95,
                                    ease: ElasticEasingIn
                                });
                            }
                        });
                    }
                });
                t.to(SVGElements.PowerLineWholeGroup, 4, {
                    rotation: 20,
                    x: 960,
                    y: -300,
                    ease: Power4EaseInOut
                });
                t.staggerTo(SVGElements.WindmillFans, 10, {
                    rotation: 3600,
                    transformOrigin: '39.83% 56.3%',
                    ease: Linear.easeNone
                }, 0.1);
                setTimeout(Functions.WindmillExitAnimation, 8000);
            },
            PathAnimation: function (path, time, ease, inverse, divisor, pathLength, delay, callback) {
                divisor = divisor || 1;
                var PathLength = pathLength || path.getTotalLength(),
                    DividePathLength = PathLength / divisor;
                t.fromTo(path, time, {
                    strokeDasharray: DividePathLength + ' ' + PathLength,
                    strokeDashoffset: (inverse ? -1 : 1) * PathLength,
                    opacity: 1
                }, {
                    strokeDashoffset: 0,
                    ease: ease,
                    delay: delay,
                    onComplete: callback
                });
            },
            SkyEnter: function () {
                t.to(SVGElements.ClassRoom, 1, {
                    y: 500,
                    ease: ElasticEasingIn
                });
                t.fromTo(SVGElements.Sky, 1, {
                    y: -500,
                    opacity: 1
                }, {
                    y: 0,
                    ease: ElasticEasingOut,
                    delay: 0.75
                });
                t.staggerFromTo(SVGElements.SkyPaths, 1, {
                    y: -100
                }, {
                    y: 0,
                    ease: ElasticEasingOut,
                    delay: 0.75
                }, 0.1);
                setTimeout(function () {
                    t.fromTo(SVGElements.PowerLine, 1, {
                        y: 200,
                        opacity: 1
                    }, {
                        y: 2,
                        ease: Power3EaseOut
                    });
                    t.staggerFromTo(SVGElements.PowerLineElements, 1, {
                        y: 200
                    }, {
                        y: 0,
                        ease: ElasticEasingOut
                    }, 0.1, function () {
                        t.fromTo(SVGElements.PowerLineTextOne, 1, {
                            opacity: 0,
                            x: 5,
                            y: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            delay: 0.5,
                            ease: ElasticEasingOut
                        });
                        t.fromTo(SVGElements.PowerLineTextTwo, 1, {
                            opacity: 0,
                            x: 2,
                            y: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            delay: 1.25,
                            ease: ElasticEasingOut
                        });
                        t.fromTo(SVGElements.PowerLineTextThree, 1, {
                            opacity: 0,
                            x: 1,
                            y: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            delay: 2,
                            ease: ElasticEasingOut
                        });
                        t.fromTo(SVGElements.PowerLineTextFour, 1, {
                            opacity: 0,
                            x: 7,
                            y: 20,
                            scale: 1.2,
                            transformOrigin: '50% 50%'
                        }, {
                            opacity: 1,
                            y: 0,
                            delay: 2.85,
                            ease: ElasticEasingOut
                        });
                        t.to(SVGElements.PowerLineTextOne, 0.5, {
                            opacity: 0,
                            delay: 3,
                            ease: Power4EaseOut
                        });
                        t.to(SVGElements.PowerLineTextTwo, 0.5, {
                            opacity: 0,
                            delay: 3.1,
                            ease: Power4EaseOut
                        });
                        t.to(SVGElements.PowerLineTextThree, 0.5, {
                            opacity: 0,
                            delay: 3.2,
                            ease: Power4EaseOut
                        });
                        t.to(SVGElements.PowerLineTextFour, 0.5, {
                            opacity: 0,
                            delay: 3.3,
                            ease: Power4EaseOut
                        });
                        Functions.CloudsAnimation();
                        Functions.PathAnimation(SVGElements.PowerLineWire[0], 7, Linear.easeNone, false, 1);
                        setTimeout(Functions.WindmillEnterAnimation, 2500);
                    });
                }, 1000);
            },
            StudentExitAnimation: function (i, j, x, d, callback) {
                t.to(SVGElements.StudentTopGroupArray[i], 0.25, {
                    x: x,
                    ease: Power3EaseOut,
                    delay: d,
                    onComplete: function () {
                        t.to(this.target, 0.5, {
                            x: '-=32',
                            y: -155,
                            opacity: 0,
                            scale: 0.5,
                            transformOrigin: '50% 50%',
                            ease: ElasticEasingIn
                        });
                    }
                });
                t.to(SVGElements.StudentBottomGroupArray[j], 0.25, {
                    x: x,
                    ease: Power3EaseOut,
                    delay: d,
                    onComplete: function () {
                        t.to(this.target, 0.5, {
                            x: '-=32',
                            y: -185,
                            opacity: 0,
                            scale: 0.5,
                            transformOrigin: '50% 50%',
                            ease: ElasticEasingIn,
                            onComplete: callback
                        });
                    }
                });
            },
            ClassRoomExitAnimation: function () {
                t.to(SVGElements.ProjectorShadow, 0.5, {
                    opacity: 0,
                    ease: Power3EaseOut
                });
                t.to(SVGElements.SmartClassApp, 0.5, {
                    opacity: 0,
                    scale: '-=0.1',
                    transformOrigin: '50% 50%',
                    ease: ElasticEasingIn
                });
                t.to(SVGElements.ProjectorLight, 0.5, {
                    fill: '#989898',
                    ease: Power3EaseOut
                });
                Functions.StudentExitAnimation(2, 2, 100, 0);
                Functions.StudentExitAnimation(1, 1, 233, 0.6);
                Functions.StudentExitAnimation(0, 0, 383, 1.2, function () {
                    t.to(SVGElements.Teacher, 0.5, {
                        x: '+=383',
                        ease: Power3EaseOut,
                        onComplete: function () {
                            t.to(SVGElements.Teacher, 0.5, {
                                x: '-=20',
                                y: -40,
                                opacity: 0,
                                scale: 0.5,
                                transformOrigin: '50% 50%',
                                ease: ElasticEasingIn,
                                onComplete: function () {
                                    t.to(SVGElements.ClassRoomTextOne, 1, {
                                        opacity: 0,
                                        delay: 1,
                                        ease: Power4EaseOut
                                    });
                                    t.to(SVGElements.ClassRoomTextTwo, 1, {
                                        opacity: 0,
                                        delay: 1,
                                        ease: Power4EaseOut
                                    });
                                    t.to(SVGElements.ClassRoomTextThree, 1, {
                                        opacity: 0,
                                        delay: 1,
                                        ease: Power4EaseOut
                                    });
                                    t.to(SVGElements.ClassRoomTextFour, 1, {
                                        opacity: 0,
                                        delay: 1,
                                        ease: Power4EaseOut
                                    });
                                    t.to(SVGElements.Bulb, 0.5, {
                                        fill: '#989898',
                                        ease: Power3EaseOut
                                    });
                                    t.fromTo(SVGElements.LightBubbleOne, 0.5, {
                                        opacity: 1
                                    }, {
                                        attr: {
                                            r: 0
                                        },
                                        opacity: 0,
                                        ease: Power3EaseOut
                                    });
                                    t.fromTo(SVGElements.LightBubbleTwo, 0.5, {
                                        opacity: 1
                                    }, {
                                        attr: {
                                            r: 0
                                        },
                                        opacity: 0,
                                        delay: 0.25,
                                        ease: Power3EaseOut,
                                        onComplete: Functions.SkyEnter
                                    });
                                    t.to(SVGElements.Blackout, 0.5, {
                                        opacity: 1,
                                        ease: Power3EaseOut
                                    });
                                }
                            });
                        }
                    });
                });
            },
            ClassRoomAnimation: function (n, callback) {
                t.fromTo(SVGElements.ClassRoomTextOne, 1, {
                    opacity: 0,
                    x: 4,
                    y: -2,
                    scale: 1.2,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    delay: 1,
                    ease: Power4EaseOut
                });
                t.fromTo(SVGElements.ClassRoomTextTwo, 1, {
                    opacity: 0,
                    x: -20,
                    y: 4,
                    scale: 0.95,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    delay: 1.5,
                    ease: Power4EaseOut
                });
                t.fromTo(SVGElements.ClassRoomTextThree, 1, {
                    opacity: 0,
                    x: -37,
                    y: 0,
                    scale: 0.9,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    delay: 2,
                    ease: Power4EaseOut
                });
                t.fromTo(SVGElements.ClassRoomTextFour, 1, {
                    opacity: 0,
                    x: -20,
                    y: 0,
                    scale: 1.2,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    delay: 2.5,
                    ease: Power4EaseOut
                });
                var i = 0,
                    ClassRoomInterval = setInterval(function () {
                        if (i < n) {
                            t.to(SVGElements.ProjectorLight, 0.5, {
                                fill: '#989898',
                                ease: Power3EaseOut,
                                onComplete: function () {
                                    t.to(SVGElements.ProjectorLight, 0.5, {
                                        fill: '#47ff00',
                                        ease: Power3EaseOut
                                    });
                                }
                            });
                            t.to(SVGElements.ProjectorShadow, 0.5, {
                                opacity: 0.5,
                                ease: Power3EaseOut,
                                onComplete: function () {
                                    t.to(SVGElements.ProjectorShadow, 0.5, {
                                        opacity: 1,
                                        ease: Power3EaseOut
                                    });
                                }
                            });
                            //t.to(SVGElements.SmartClassAppBack, 0.5, {
                            //    fill: '#FFECB3',
                            //    ease: Power3EaseOut,
                            //    onComplete: function () {
                            //        t.to(SVGElements.SmartClassAppBack, 0.5, {
                            //            fill: '#FFF9C4',
                            //            ease: Power3EaseOut
                            //        });
                            //    }
                            //});
                            //t.to(SVGElements.SmartClassAppIcon, 0.5, {
                            //    rotation: 10,
                            //    scale: 6.2,
                            //    transformOrigin: '50% 50%',
                            //    ease: ElasticEasingIn,
                            //    onComplete: function () {
                            //        t.to(SVGElements.SmartClassAppIcon, 0.5, {
                            //            rotation: -10,
                            //            scale: 5.8,
                            //            transformOrigin: '50% 50%',
                            //            ease: ElasticEasingOut
                            //        });
                            //    }
                            //});
                            //t.to(SVGElements.SmartClassAppIconHead, 0.5, {
                            //    y: '-=1',
                            //    ease: Power3EaseOut,
                            //    onComplete: function () {
                            //        t.to(SVGElements.SmartClassAppIconHead, 0.5, {
                            //            y: '+=1',
                            //            ease: Power3EaseOut
                            //        });
                            //    }
                            //});
                            //t.to(SVGElements.TeacherHead, 0.5, {
                            //    rotation: 10,
                            //    x: '+=2',
                            //    y: '+=2',
                            //    transformOrigin: '50% 50%',
                            //    ease: Power3EaseOut,
                            //    onComplete: function () {
                            //        t.to(SVGElements.TeacherHead, 0.5, {
                            //            rotation: 0,
                            //            x: '-=2',
                            //            y: '-=2',
                            //            transformOrigin: '50% 50%',
                            //            ease: Power3EaseOut
                            //        });
                            //    }
                            //});
                            t.staggerTo(SVGElements.StudentTopGroup, 0.5, {
                                y: '+=3',
                                ease: Power3EaseOut,
                                onComplete: function () {
                                    t.staggerTo(SVGElements.StudentTopGroup, 0.5, {
                                        y: '-=3',
                                        ease: Power3EaseOut
                                    }, 0);
                                }
                            }, 0);
                            t.staggerTo(SVGElements.StudentBottomGroup, 0.5, {
                                y: '+=3',
                                ease: Power3EaseOut,
                                onComplete: function () {
                                    t.staggerTo(SVGElements.StudentBottomGroup, 0.5, {
                                        y: '-=3',
                                        ease: Power3EaseOut
                                    }, 0);
                                }
                            }, 0);
                            t.to(SVGElements.TeacherHand, 0.5, {
                                rotation: -20,
                                transformOrigin: '0% 0%',
                                ease: Power3EaseOut,
                                onComplete: function () {
                                    if (++i >= n) {
                                        clearInterval(ClassRoomInterval);
                                        t.to(SVGElements.TeacherHand, 0.5, {
                                            rotation: 0,
                                            transformOrigin: '0% 0%',
                                            ease: Power3EaseOut,
                                            onComplete: function () {
                                                t.to(SVGElements.SmartClassAppIcon, 0.5, {
                                                    rotation: 0,
                                                    scale: 6,
                                                    transformOrigin: '50% 50%',
                                                    ease: Power3EaseOut,
                                                    onComplete: function () {
                                                        callback();
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        t.to(SVGElements.TeacherHand, 0.5, {
                                            rotation: 0,
                                            transformOrigin: '0% 0%',
                                            ease: Power3EaseOut
                                        });
                                    }
                                }
                            });
                        }
                    }, 1000);

            },
            ClassRoomEnterAnimation: function () {
                t.to(SVGElements.SmartClassApp, 1.5, {
                    y: -74.2,
                    x: -4.5,
                    scaleX: 0.403,
                    scaleY: 0.384,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut,
                    onComplete: function () {
                        t.to(SVGElements.SmartClassApp, 0.5, {
                            opacity: 0,
                            ease: Power4EaseOut
                        });
                    }
                });
                t.to(SVGElements.SmartClassAppBack, 1.5, {
                    fill: '#ffffff',
                    ease: Power4EaseOut
                });
                t.to(SVGElements.SmartClassAppIcon, 1.5, {
                    fill: '#333333',
                    ease: Power4EaseOut
                });
                t.to(SVGElements.SmartClassAppTitle, 1.5, {
                    fill: '#333333',
                    ease: Power4EaseOut
                });
                t.fromTo(SVGElements.ClassRoom, 1.5, {
                    y: -480,
                    opacity: 1
                }, {
                    y: 0,
                    ease: Power4EaseOut
                });
                t.fromTo(SVGElements.Projecter, 1.5, {
                    y: -100
                }, {
                    y: 0,
                    ease: Power4EaseOut,
                    delay: 0.25
                });
                SVGElements.ProjectorWires.each(function () {
                    Functions.PathAnimation(this, 1.5, Power3EaseInOut, true, 1);
                });
                t.fromTo(SVGElements.BulbWireGroup, 1.5, {
                    y: -100
                }, {
                    y: 0,
                    ease: Power4EaseOut,
                    delay: 0.25
                });
                t.staggerFromTo(SVGElements.ClassRoomStudentDeskArray, 1.5, {
                    y: 100
                }, {
                    y: 0,
                    ease: Power4EaseOut,
                    delay: 0.25
                }, 0);
                setTimeout(function () {
                    Functions.ClassRoomAnimation(2, Functions.ClassRoomExitAnimation);
                }, 1000);
            },
            Start: function () {
                SVGObject.css({opacity: 1});
                Functions.QueueEnterAnimation();
            }
        };

    $.fn.Link = function (o) {
        var Element = this,
            RootObject,
            Base,
            Options = $.extend({
                Width: 48,
                Height: 48,
                X: 'left',
                Y: 'bottom',
                OffsetX: 0,
                OffsetY: 0,
                Duration: 0.5,
                Easing: Power4EaseOut,
                CallBackBind: undefined,
                CallBack: undefined
            }, o),
            Width = Options.Width,
            Height = Options.Height,
            HalfWidth = Width / 2,
            HalfHeight = Height / 2,
            X = Options.X,
            Y = Options.Y,
            OffsetX = Options.OffsetX,
            OffsetY = Options.OffsetY,
            Duration = Options.Duration,
            HalfDuration = Duration / 2,
            Easing = Options.Easing,
            CallBackBind = Options.CallBackBind,
            CallBack = Options.CallBack,
            zIndex = 2;
        var Functions = {
            Init: function () {
                RootObject = $(Element[0].contentDocument.documentElement)
                    .on(CallBackBind, CallBack)
                    .on('mouseover', function () {
                        t.to(Base, Duration, {
                            scale: 1,
                            transformOrigin: '50% 50%',
                            fill: '#8bc34a',
                            ease: Easing
                        });
                    })
                    .on('mouseout', function () {
                        t.to(Base, Duration, {
                            scale: 0.75,
                            transformOrigin: '50% 50%',
                            fill: '#ffffff',
                            ease: Easing
                        });
                    })
                    .css({
                        cursor: 'pointer'
                    });
                Base = $('#Base', RootObject);
                t.set(Base, {
                    scale: 0.75,
                    transformOrigin: '50% 50%'
                });
                t.set(Element, {
                    opacity: 0,
                    scale: 0.5,
                    transformOrigin: '50% 50%'
                });
            },
            Position: function (WindowWidth, WindowHeight, HalfWindowWidth, HalfWindowHeight) {
                var x = OffsetX,
                    y = OffsetY;
                switch (X) {
                    case 'left':
                        x += 0;
                        break;
                    case 'middle':
                        x += HalfWindowWidth - HalfWidth;
                        break;
                    case 'right':
                        x += WindowWidth - Width;
                        break;
                }
                switch (Y) {
                    case 'top':
                        y += 0;
                        break;
                    case 'middle':
                        y += HalfWindowHeight - HalfHeight;
                        break;
                    case 'bottom':
                        y += WindowHeight - Height;
                        break;
                }
                Element.css({
                    left: x,
                    top: y
                });
                return Functions;
            },
            Hide: function () {
                t.to(Element, HalfDuration, {
                    opacity: 0,
                    scale: 0.5,
                    transformOrigin: '50% 50%',
                    ease: Easing,
                    onComplete: function () {
                        Element.css('z-index', -zIndex);
                    }
                });
                return Functions;
            },
            Show: function () {
                Element.css('z-index', zIndex);
                t.to(Element, Duration, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Easing
                });
                return Functions;
            }
        };
        if (Element[0].contentDocument.documentElement !== null) Functions.Init();
        else Element.on('load', Functions.Init);
        return Functions;
    };

    function LoadFacebookShareButton() {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '634792329995421',
                xfbml: true,
                version: 'v2.5'
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(d, 'script', 'facebook-jssdk'));
    }

    //function PerformResizeFull() {
    //    var SVGWidth = Width,
    //        SVGHeight = Height,
    //        SVGMarginTop = 0,
    //        SVGMarginLeft = 0,
    //        AspectRatio = Width / Height,
    //        DefaultAspectRatio = 1.78;
    //    if (AspectRatio > DefaultAspectRatio) {
    //        SVGWidth = Math.ceil(SVGHeight * DefaultAspectRatio);
    //        SVGMarginLeft = (Width - SVGWidth) / 2;
    //    } else if (AspectRatio < DefaultAspectRatio) {
    //        SVGHeight = Math.ceil(SVGWidth / DefaultAspectRatio);
    //        SVGMarginTop = (Height - SVGHeight) / 2;
    //    }
    //    t.to(SVGObject, 0.5, {
    //        width: SVGWidth,
    //        height: SVGHeight,
    //        marginTop: SVGMarginTop,
    //        marginLeft: SVGMarginLeft
    //    });
    //}

    function PerformResizeFillByWidth() {
        var SVGWidth = Width,
            SVGHeight = Height,
            SVGMarginTop,
            SVGMarginLeft = 0,
            AspectRatio = Width / Height,
            DefaultAspectRatio = 1.78;
        if (AspectRatio > DefaultAspectRatio) {
            SVGWidth = Width;
            SVGHeight = Math.ceil(SVGWidth / DefaultAspectRatio);
        } else if (AspectRatio < DefaultAspectRatio) {
            SVGHeight = Math.ceil(SVGWidth / DefaultAspectRatio);
        }
        SVGMarginTop = HalfHeight - (SVGHeight / 2);
        t.to(SVGObject, 0.5, {
            width: SVGWidth,
            height: SVGHeight,
            marginTop: SVGMarginTop,
            marginLeft: SVGMarginLeft
        });
    }

    //function PerformResizeFill() {
    //    var SVGWidth = Width,
    //        SVGHeight = Height,
    //        SVGMarginTop = 0,
    //        SVGMarginLeft = 0,
    //        AspectRatio = Width / Height,
    //        DefaultAspectRatio = 1.78;
    //    if (AspectRatio > DefaultAspectRatio) {
    //        SVGWidth = Width;
    //        SVGHeight = Math.ceil(SVGWidth / DefaultAspectRatio);
    //        SVGMarginTop = (Height - SVGHeight) / 2;
    //    } else if (AspectRatio < DefaultAspectRatio) {
    //        SVGHeight = Height;
    //        SVGWidth = Math.ceil(SVGHeight * DefaultAspectRatio);
    //        SVGMarginLeft = (Width - SVGWidth) / 2;
    //    }
    //    t.to(SVGObject, 0.5, {
    //        width: SVGWidth,
    //        height: SVGHeight,
    //        marginTop: SVGMarginTop,
    //        marginLeft: SVGMarginLeft
    //    });
    //}

    function PerformResize() {
        Width = w.innerWidth;
        Height = w.innerHeight;
        HalfWidth = Width / 2;
        HalfHeight = Height / 2;
        PerformResizeFillByWidth();
        if (LinksActive) {
            FacebookLinkObject.Position(Width, Height, HalfWidth, HalfHeight);
            GooglePlusLinkObject.Position(Width, Height, HalfWidth, HalfHeight);
            YoutubeLinkObject.Position(Width, Height, HalfWidth, HalfHeight);
            TwitterLinkObject.Position(Width, Height, HalfWidth, HalfHeight);
            GAWDSLinkObject.Position(Width, Height, HalfWidth, HalfHeight);
        }
    }

    dO.on('ready', function () {
        BackgroundMusic = $('#BackgroundMusic', d)[0];
        SVGObject = $('#MainSVG', d).on('load', function () {
            SVGRoot = SVGObject[0].contentDocument.documentElement;
            SVGRootObject = $(SVGRoot);
            SVGElements.TabletBody = $('#TabletBody', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.TabletHand = $('#TabletHand', SVGRootObject).css({opacity: 0});
            SVGElements.PeopleGroup = $('#PeopleGroup', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.PeopleArray = SVGElements.PeopleGroup.find('g');
            SVGElements.Browser = $('#Browser', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.BrowserBack = $('#BrowserBack', SVGRootObject);
            SVGElements.BrowserAddress = $('#BrowserAddress', SVGRootObject);
            SVGElements.BrowserAddressText = SVGElements.BrowserAddress.find('tspan').html('');
            SVGElements.Website = $('#Website', SVGRootObject).css({opacity: 0});
            SVGElements.SmartClassApp = $('#SmartClassApp', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.SmartClassAppIcon = $('#SmartClassAppIcon', SVGRootObject);
            SVGElements.SmartClassAppIconHead = $('#SmartClassAppIconHead', SVGRootObject);
            SVGElements.SmartClassAppTitle = $('#SmartClassAppTitle', SVGRootObject);
            SVGElements.SmartClassAppBack = $('#SmartClassAppBack', SVGRootObject);
            SVGElements.SmartClassAppClickBack = $('#SmartClassAppClickBack', SVGRootObject).css({opacity: 0});
            SVGElements.ClassRoom = $('#ClassRoom', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.ClassRoomBack = $('#ClassRoomBack', SVGRootObject);
            SVGElements.ClassRoomWall = $('#ClassRoomWall', SVGRootObject);
            SVGElements.WhiteBoard = $('#WhiteBoard', SVGRootObject);
            SVGElements.Teacher = $('#Teacher', SVGRootObject);
            SVGElements.TeacherHead = $('#TeacherHead', SVGRootObject);
            SVGElements.TeacherHand = $('#TeacherHand', SVGRootObject);
            SVGElements.DeskTopGroup = $('#DeskTopGroup', SVGRootObject);
            SVGElements.DeskTopGroupArray = SVGElements.DeskTopGroup.find('g');
            SVGElements.DeskBottomGroup = $('#DeskBottomGroup', SVGRootObject);
            SVGElements.DeskBottomGroupArray = SVGElements.DeskBottomGroup.find('g');
            SVGElements.StudentTopGroup = $('#StudentTopGroup', SVGRootObject);
            SVGElements.StudentTopGroupArray = SVGElements.StudentTopGroup.find('g');
            SVGElements.StudentBottomGroup = $('#StudentBottomGroup', SVGRootObject);
            SVGElements.StudentBottomGroupArray = SVGElements.StudentBottomGroup.find('g');
            SVGElements.ClassRoomStudentDeskArray = [SVGElements.Teacher, SVGElements.DeskTopGroup, SVGElements.DeskBottomGroup, SVGElements.StudentTopGroup, SVGElements.StudentBottomGroup];
            SVGElements.Projecter = $('#Projecter', SVGRootObject);
            SVGElements.ProjectorShadow = $('#ProjectorShadow', SVGRootObject).css({opacity: 0});
            SVGElements.ProjectorWires = $('#ProjectorWires path', SVGRootObject).css({opacity: 0});
            SVGElements.ProjectorLight = $('#ProjectorLight', SVGRootObject);
            SVGElements.ClassRoomWire = $('#ClassRoomWire', SVGRootObject);
            SVGElements.BulbWireGroup = $('#BulbWireGroup', SVGRootObject);
            SVGElements.Bulb = $('#Bulb', SVGRootObject);
            SVGElements.LightBubbleOne = $('#LightBubbleOne', SVGRootObject).css({opacity: 0});
            SVGElements.LightBubbleTwo = $('#LightBubbleTwo', SVGRootObject).css({opacity: 0});
            SVGElements.Blackout = $('#Blackout', SVGRootObject).css({opacity: 0});
            SVGElements.Sky = $('#Sky', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.SkyPaths = SVGElements.Sky.find('path');
            SVGElements.Clouds = $('.Clouds', SVGRootObject);
            SVGElements.PowerLine = $('#PowerLine', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.PowerLineElements = SVGElements.PowerLine.children();
            SVGElements.PowerGridGroup = $('#PowerGridGroup', SVGRootObject);
            SVGElements.WindmillGroup = $('#WindmillGroup', SVGRootObject);
            SVGElements.PowerLineWholeGroup = $('#PowerLineWholeGroup', SVGRootObject);
            SVGElements.PowerLineWire = $('#PowerLineWire', SVGRootObject).css({opacity: 0});
            SVGElements.WindmillFans = $('.Fans', SVGRootObject);
            SVGElements.India = $('#India', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.Ways = $('#Ways path', SVGRootObject).css({opacity: 0});
            SVGElements.WaysOverlay = $('#WaysOverlay path', SVGRootObject).css({opacity: 0});
            SVGElements.PathToHome = $('#PathToHome path', SVGRootObject).css({opacity: 0});
            SVGElements.HomeMarker = $('#HomeMarker', SVGRootObject).css({opacity: 0});
            SVGElements.Techspardha = $('#Techspardha', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.TechspardhaChildren = SVGElements.Techspardha.children();
            SVGElements.BackGround = $('#BackGround', SVGRootObject).css({opacity: 0})[0];
            SVGElements.ForeGround = $('#ForeGround', SVGRootObject).css({opacity: 0})[0];
            SVGElements.TechspardhaText = $('#TechspardhaText', SVGRootObject);
            SVGElements.SmartIndiaText = $('#SmartIndiaText', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.TechspardhaDate = $('#TechspardhaDate', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.PeopleText = $('#PeopleText', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.BrowserTextOne = $('#BrowserTextOne', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.BrowserTextTwo = $('#BrowserTextTwo', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.SmartAppText = $('#SmartAppText', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.ClassRoomTextOne = $('#ClassRoomTextOne', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.ClassRoomTextTwo = $('#ClassRoomTextTwo', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.ClassRoomTextThree = $('#ClassRoomTextThree', SVGRootObject).css({
                opacity: 0,
                display: 'block'
            });
            SVGElements.ClassRoomTextFour = $('#ClassRoomTextFour', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.PowerLineTextOne = $('#PowerLineTextOne', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.PowerLineTextTwo = $('#PowerLineTextTwo', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.PowerLineTextThree = $('#PowerLineTextThree', SVGRootObject).css({
                opacity: 0,
                display: 'block'
            });
            SVGElements.PowerLineTextFour = $('#PowerLineTextFour', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.WindmillTextZero = $('#WindmillTextZero', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.WindmillTextOne = $('#WindmillTextOne', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.WindmillTextTwo = $('#WindmillTextTwo', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.WindmillTextThree = $('#WindmillTextThree', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.IndiaTextOne = $('#IndiaTextOne', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.IndiaTextTwo = $('#IndiaTextTwo', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.IndiaTextThree = $('#IndiaTextThree', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.IndiaTextFour = $('#IndiaTextFour', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.IndiaTextFive = $('#IndiaTextFive', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.IndiaTextSix = $('#IndiaTextSix', SVGRootObject).css({opacity: 0, display: 'block'});
            BackgroundMusic.load();
            BackgroundMusic.addEventListener('canplaythrough', function () {
                w.LoadingDone = true;
                setTimeout(function () {
                    BackgroundMusic.play();
                    SVGObject.css({opacity: 1});
                    setTimeout(Functions.Start, 1075);
                }, 1500);
            }, false);
        });
        PerformResize();
    });
    wO.on('resize', PerformResize);
})(window, document, jQuery(window), jQuery(document), jQuery, TweenMax);