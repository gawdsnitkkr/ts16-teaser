(function (w, d, wO, dO, $, t) {
    var Width = w.innerWidth,
        Height = w.innerHeight,
        HalfWidth = Width / 2,
        HalfHeight = Height / 2,
        MinHeight = 643,
        MinWidth = 679,
        DefaultAspectRatio = 1.78,
        SVGObject,
        SVGRoot,
        SVGRootObject,
        SVGElements = {},
        Objects = {},
        BackgroundMusic,
        TeaserStarted = false,
        TechspardhaStarted = false,
        LinksActive = false,
        Transiting = false,
        SiteSectionActive = false,
        SiteSectionStarted = false,
        Paused = false,
        TimeOutArray = [],
        IsFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
        Categories = ['Managerial', 'Quizzes', 'Fun Zone', 'Online Events', 'Paper Events', 'Technopolis',
            'Design', 'Brain Storming', 'Future Builder'],
        Events = [[], [], [], [], [], [], [], [], []],
        Descriptions = [[], [], [], [], [], [], [], [], []],
        Rules = [[], [], [], [], [], [], [], [], []],
        DateOfEvent = [[], [], [], [], [], [], [], [], []],
        TimeOfEvent = [[], [], [], [], [], [], [], [], []],
        Venue = [[], [], [], [], [], [], [], [], []],
        Coordinator = [[], [], [], [], [], [], [], [], []],
        PhoneNumber = [[], [], [], [], [], [], [], [], []],
        CategoriesTop = [],
        CurrentCategory = 0,
        PreviousCategory = 0,
        CurrentEvent = 0,
        CategoriesOpen = false,
        CategoriesOpening = false,
        CategoriesChanging = false,
        EventsMouseOver = false,
        EventsOpen = [],
        EventsOpening = [],
        EventsClosing = [],
        EventsChanging = [],
        EventOpened = false,
        EventOpening = false,
        EventClosing = false,
        GalleryOpened = false,
        SponsorsOpened = false,
        ExhibitionsOpened = false,
        LecturesOpened = false,
        TechExpoOpened = false,
        CategoriesFrameLeft = 275,
        CategoriesFrameTop = HalfHeight - 180,
        MenuWidth = 230,
        ElasticEasingIn = Elastic.easeIn.config(2, 1),
        ElasticEasingOut = Elastic.easeOut.config(2, 1),
        Power4EaseOut = Power4.easeOut,
        Power4EaseIn = Power4.easeIn,
        Power4EaseInOut = Power4.easeInOut,
        Power3EaseOut = Power4.easeOut,
        Power3EaseInOut = Power4.easeInOut,
        Power2EaseOut = Power2.easeOut,
    // Gallery
        current = 1,
        gallery_button,
        number_of_images = 24,
        image_caption,
        opacity_factor = 0.2,
        opacity,
        shadow,
        scale,
        galleryLoader,
        hover_button,
        button_SVG,
        left_handle,
        right_handle,
        left_button,
        image_text = [
            "Exhibitions Inauguration Techspardha'15", "'I got the moves' - manav", "And some more",
            "In our eyes a radiant dream", "Boundless desires we cast to the sky", "RoboWars", "Terminator ?",
            "JunkyardWars", "Exhibitions TS'15", "Brahmos Display", "Exhibitions TS'15", "Chief Guest", "Guest Lecture", "Team Accelerons",
            "Mini rover", "Enchanting melody", "When words aren't enough", "Its a fest after all, chill",
            "Let there be light", "Coke Studio", "Guitar frenzy", "Setting the mood", "Soaring finale",
            "Techsparhda'16 'Wait for it...'"],
        right_button,
        image_array,
        image_window,
        image_frame,
        image_info_display,
        _image_viewbox,
    // Gallery
        Functions = {
            PathAnimation: function (path, time, ease, inverse, divisor, pathLength, delay, callback, forceOpacity) {
                divisor = divisor || 1;
                if (forceOpacity === undefined) forceOpacity = true;
                var PathLength = pathLength || path.getTotalLength(),
                    DividePathLength = PathLength / divisor;
                if (forceOpacity) path.style.opacity = 1;
                t.fromTo(path, time, {
                    strokeDasharray: DividePathLength + ' ' + PathLength,
                    strokeDashoffset: (inverse ? -1 : 1) * PathLength
                }, {
                    strokeDashoffset: 0,
                    ease: ease,
                    delay: delay,
                    onComplete: callback
                });
            },
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
                t.to(BackgroundMusic, 1, {
                    volume: 0,
                    delay: 0.25,
                    ease: Power4.easeOut
                });
                Objects.FacebookLink = $('#FacebookLink', d).Link({
                        X: 'left',
                        Y: 'bottom',
                        OffsetX: 24,
                        OffsetY: -24,
                        CallBackBind: 'click',
                        CallBack: function () {
                            w.open('https://www.facebook.com/techspardha.nitkkr/?fref=ts');
                        }
                    })
                    .Position(Width, Height, HalfWidth, HalfHeight).Show();
                Objects.YoutubeLink = $('#YoutubeLink', d).Link({
                        X: 'left',
                        Y: 'bottom',
                        OffsetX: 24,
                        OffsetY: -80,
                        CallBackBind: 'click',
                        CallBack: function () {
                            w.open('https://www.youtube.com/channel/UCAzrQemb7hxtpDNgvudqyPQ');
                        }
                    })
                    .Position(Width, Height, HalfWidth, HalfHeight).Show();
                Objects.GooglePlusLink = $('#GooglePlusLink', d).Link({
                        X: 'left',
                        Y: 'bottom',
                        OffsetX: 24,
                        OffsetY: -136,
                        CallBackBind: 'click',
                        CallBack: function () {
                            w.open('https://plus.google.com/+TechspardhaNITKuruksehtra');
                        }
                    })
                    .Position(Width, Height, HalfWidth, HalfHeight).Show();
                Objects.TwitterLink = $('#TwitterLink', d).Link({
                        X: 'left',
                        Y: 'bottom',
                        OffsetX: 24,
                        OffsetY: -191,
                        CallBackBind: 'click',
                        CallBack: function () {
                            w.open('https://twitter.com/tsnitkkr');
                        }
                    })
                    .Position(Width, Height, HalfWidth, HalfHeight).Show();
                Objects.GAWDSLink = $('#GAWDSLink', d).Link({
                        X: 'right',
                        Y: 'bottom',
                        OffsetX: -96,
                        OffsetY: -24,
                        CallBackBind: 'click',
                        CallBack: function () {
                            w.open('http://www.gawds.in');
                        }
                    })
                    .Position(Width, Height, HalfWidth, HalfHeight).Show();
                Objects.ScrollDownHelper = $('#ScrollDownHelper', d).Helper({
                        X: 'middle',
                        Y: 'bottom',
                        RotateVertically: true,
                        RotateClockwise: false,
                        CallBackBind: 'click',
                        CallBack: Functions.SectionTransition
                    })
                    .Position(Width, Height, HalfWidth, HalfHeight);
                Objects.ScrollDownHelper.Show();
                LoadFacebookShareButton();
                t.to($('#FacebookShareButton', d), 1, {
                    opacity: 1,
                    ease: Power4EaseOut
                });
                Objects.MousePrompt = $('#MousePrompt', d).Link({
                        Width: 36,
                        Height: 36,
                        X: 'right',
                        Y: 'top',
                        OffsetX: -80,
                        OffsetY: 18,
                        Cursor: 'initial'
                    })
                    .Position(Width, Height, HalfWidth, HalfHeight).Show();
                Objects.MousePromptBase = Objects.MousePrompt.GetRoot().find('#Base');
                Objects.MousePromptScroll = Objects.MousePrompt.GetRoot().find('#Scroll');
                Functions.MousePromptAnimation();
                Objects.KeysPrompt = $('#KeysPrompt', d).Link({
                        Width: 54,
                        Height: 36,
                        X: 'right',
                        Y: 'top',
                        OffsetX: -15,
                        OffsetY: 15,
                        Cursor: 'initial'
                    })
                    .Position(Width, Height, HalfWidth, HalfHeight).Show();
                Objects.KeysPromptBase = Objects.KeysPrompt.GetRoot().find('#Base');
                Objects.KeysPromptKeys = Objects.KeysPromptBase.find('path');
                Functions.KeysPromptAnimation();
                LinksActive = true;
                t.killTweensOf(SVGElements.BackGround);
                t.killTweensOf(SVGElements.ForeGround);
                t.to(SVGElements.BackGround, 1, {
                    opacity: 0,
                    ease: Power4EaseOut,
                    onComplete: function () {
                        $(SVGElements.BackGround).insertAfter($(SVGElements.ForeGround));
                        //Functions.TechspardhaAfterAnimation();
                    }
                });
                wO.focus();
            },
            TechspardhaEnterAnimation: function () {
                TechspardhaStarted = true;
                Objects.EnterPrompt.Hide();
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
                TimeOutArray.push(setTimeout(Functions.IndiaExitAnimation, 3000));
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
                TimeOutArray.push(setTimeout(function () {
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
                }, 2000));
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
                TimeOutArray.push(setTimeout(Functions.WindmillExitAnimation, 8000));
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
                TimeOutArray.push(setTimeout(function () {
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
                }, 1000));
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
                TimeOutArray.push(setTimeout(function () {
                    Functions.ClassRoomAnimation(2, Functions.ClassRoomExitAnimation);
                }, 1000));
            },
            TeaserStart: function () {
                SVGObject.css({opacity: 1});
                t.fromTo(SVGElements.SkipText, 1, {
                    y: '+=50',
                    opacity: 0
                }, {
                    y: '-=25',
                    opacity: 1,
                    ease: Power4EaseOut,
                    onComplete: function () {
                        TeaserStarted = true;
                        Objects.EnterPrompt.Show();
                        Objects.EnterPromptBase = Objects.EnterPrompt.GetRoot().find('#Base');
                        Functions.EnterPromptAnimation();
                        t.to(SVGElements.SkipText, 1, {
                            opacity: 0,
                            delay: 2,
                            ease: Power4EaseOut
                        });
                    }
                });
                Functions.QueueEnterAnimation();
            },
            TeaserStop: function () {
                if (!TechspardhaStarted) {
                    TechspardhaStarted = true;
                    t.killAll();
                    var i = 0,
                        l = TimeOutArray.length;
                    for (; i < l; i++) clearTimeout(TimeOutArray[i]);
                    t.to(BackgroundMusic, 1, {
                        volume: 0,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            t.fromTo(BackgroundMusic, 1, {
                                currentTime: 53
                            }, {
                                volume: 1,
                                ease: Power4.easeOut
                            });
                        }
                    });
                    t.staggerTo([SVGElements.Browser, SVGElements.ClassRoom, SVGElements.PeopleGroup,
                        SVGElements.SmartClassApp, SVGElements.TabletBody, SVGElements.Sky, SVGElements.PowerLine,
                        SVGElements.India, SVGElements.BrowserTextOne, SVGElements.BrowserTextTwo,
                        SVGElements.PeopleText, SVGElements.SmartAppText, SVGElements.IndiaTextFive,
                        SVGElements.IndiaTextSix], 1, {
                        opacity: 0,
                        ease: Power4EaseOut,
                        onComplete: function () {
                            this.target.remove();
                        }
                    }, 0, function () {
                        Functions.TechspardhaEnterAnimation();
                    });
                    t.to(SVGElements.SkipText, 1, {
                        opacity: 0,
                        ease: Power4EaseOut
                    });
                }
            },
            //TechspardhaAfterAnimation: function () {
            //    if (!SiteSectionActive) {
            //        t.to(SVGElements.BackGround, 1, {
            //            opacity: 1,
            //            ease: Power4EaseOut
            //        });
            //        Functions.PathAnimation(SVGElements.BackGround, 5, Linear.easeNone, false, 30, 500, 2, function () {
            //            if (!SiteSectionActive) Functions.TechspardhaAfterAnimation();
            //        }, false);
            //        t.to(SVGElements.BackGround, 1, {
            //            opacity: 0,
            //            delay: 4,
            //            ease: Power4EaseOut
            //        });
            //    }
            //},
            TechspardhaTransition: function () {
                Transiting = true;
                SiteSectionActive = false;
                t.fromTo(Objects.TeaserSection, 2, {
                    zIndex: 2,
                    opacity: 1
                }, {
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut,
                    onComplete: function () {
                        Transiting = false;
                        wO.focus();
                    }
                });
                t.fromTo(Objects.SiteSection, 2, {
                    zIndex: 1
                }, {
                    y: Height,
                    scale: 0.5,
                    rotationX: 45,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut
                });
                //Functions.TechspardhaAfterAnimation();
            },
            SectionTransition: function () {
                Transiting = true;
                t.fromTo(Objects.TeaserSection, 2, {
                    zIndex: 1
                }, {
                    y: -Height,
                    scale: 0.5,
                    rotationX: -45,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut,
                    onComplete: function () {
                        this.target.css('opacity', 0);
                    }
                });
                t.fromTo(Objects.SiteSection, 2, {
                    zIndex: 2,
                    y: Height,
                    scale: 0.5,
                    rotationX: 45,
                    transformOrigin: '50% 50%'
                }, {
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut,
                    onComplete: function () {
                        SiteSectionActive = true;
                        SiteSectionStarted = true;
                        Transiting = false;
                        wO.focus();
                    }
                });
                setTimeout(Functions.SiteSectionStart, 500);
            },
            LoadCategories: function () {
                if (Objects.CategoryFrame.children().length === 0) {
                    var l = Categories.length,
                        i = 0,
                        CategoryFrame = Objects.CategoryFrame;
                    t.set(CategoryFrame, {
                        top: CategoriesFrameTop,
                        left: CategoriesFrameLeft
                    });
                    Objects.Categories = [];
                    for (; i < l; i++) {
                        Objects.Categories.push($('<div id="' + Categories[i] + '" class="Category" data-category="' + i + '"><span>' + Categories[i] + '</span></div>')
                            .appendTo(CategoryFrame)
                            .on('click', function () {
                                if (CategoriesOpen) {
                                    var This = $(this),
                                        Opacity = parseFloat(This.attr('data-opacity')),
                                        Category = parseInt(This.attr('data-category'), 10);
                                    if (Opacity > 0) {
                                        if (Category != CurrentCategory) {
                                            PreviousCategory = CurrentCategory;
                                            CurrentCategory = Category;
                                            Functions.EventsCloseAnimation(PreviousCategory, function () {
                                                Functions.CategoriesChangeAnimation();
                                                Functions.EventsEnterAnimation(Category);
                                            });
                                        } else if (!EventsOpen[Category] && !EventsOpening[Category]) {
                                            Functions.EventsEnterAnimation(Category);
                                        } else if (EventsOpen[Category] && !EventsClosing[Category]) {
                                            Functions.EventsCloseAnimation(Category);
                                        }
                                    }
                                }
                            })
                            .on('mouseover', function () {
                                if (CategoriesOpen) {
                                    var This = $(this),
                                        Opacity = parseFloat(This.attr('data-opacity')),
                                        Category = parseInt(This.attr('data-category'), 10);
                                    if (Category !== CurrentCategory && Opacity > 0) {
                                        t.to(This, 1, {
                                            opacity: 1,
                                            ease: Power4EaseOut
                                        });
                                    }
                                    if (!EventsOpen[Category] && !EventsOpening[Category]) {
                                        t.to(This.find('span'), 1, {
                                            x: 25,
                                            ease: Power4EaseOut
                                        });
                                    } else {
                                        t.to(This.find('span'), 1, {
                                            x: 0,
                                            ease: Power4EaseOut
                                        });
                                    }
                                }
                            })
                            .on('mouseout', function () {
                                if (CategoriesOpen) {
                                    var This = $(this),
                                        Opacity = parseFloat(This.attr('data-opacity')),
                                        Category = parseInt(This.attr('data-category'), 10);
                                    if (Category !== CurrentCategory && Opacity > 0) {
                                        t.to(This, 1, {
                                            opacity: Opacity,
                                            ease: Power4EaseOut
                                        });
                                    }
                                    t.to(This.find('span'), 1, {
                                        x: 0,
                                        ease: Power4EaseOut
                                    });
                                }
                            }));
                        CategoriesTop.push(Objects.Categories[i].position().top);
                    }
                }
                return Functions;
            },
            LoadEvents: function () {
                var l = Categories.length,
                    i = 0,
                    m,
                    j,
                    EventsArray,
                    EventsFrame,
                    EventsObjectArray,
                    DescriptionsArray,
                    Category,
                    SmallDescription;
                Objects.Events = [];
                Objects.EventsFrames = [];
                for (; i < l; i++) {
                    Category = Categories[i].replace(' ', '+');
                    EventsArray = Events[i];
                    DescriptionsArray = Descriptions[i];
                    m = EventsArray.length;
                    j = 0;
                    if ($('#Events-' + Category).length === 0) {
                        EventsFrame = $('<div id="Events-' + Category + '" class="EventsFrame"></div>').insertAfter(Objects.Categories[i])
                            .css({
                                width: 260 * m + Width,
                                height: 0,
                                opacity: 0,
                                marginTop: 0
                            })
                            .on('mouseover', function () {
                                EventsMouseOver = true;
                            })
                            .on('mouseout', function () {
                                EventsMouseOver = false;
                            })
                            .on('mousewheel', function (e) {
                                if (EventsOpen[CurrentCategory] && !EventOpened && !EventOpening) {
                                    if (e.deltaY > 0) Functions.EventsLeft();
                                    else if (e.deltaY < 0) Functions.EventsRight();
                                }
                            });
                        Objects.EventsFrames.push(EventsFrame);
                        EventsObjectArray = [];
                        for (; j < m; j++) {
                            SmallDescription = DescriptionsArray[j].replace(/<(?:.|\n)*?>/gm, '');
                            var DescriptionLength = EventsArray[j].length > 15 ? EventsArray[j].length > 24 ? 150 : 200 : 230;
                            SmallDescription = (SmallDescription.length > DescriptionLength ? SmallDescription.substring(0, DescriptionLength) + '...' : SmallDescription);
                            EventsObjectArray.push($('<div id="Events-' + Category + '-' + EventsArray[j].replace(' ', '+') + '" class="Event" data-category="' + i + '"  data-event="' + j + '">' +
                                '<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>' +
                                '<td class="Head"><span>' + EventsArray[j] + '</span><a class="CloseEvent" href="#"></a></td></tr><tr>' +
                                '<td class="Content"><div class="SmallDescription">' + SmallDescription + '</div><div class="DetailedContent">' +
                                ((DescriptionsArray[j].length > 0) ? '<span class="ContentHeader">Description</span><hr><p>' + DescriptionsArray[j] + '</p>' : '') +
                                ((Rules[i][j].length > 0) ? '<span class="ContentHeader">Rules</span><hr><p>' + Rules[i][j] + '</p>' : '') +
                                    //((Venue[i][j].length > 0) ? '<span class="ContentHeader">Venue</span><hr><p>' + Venue[i][j] + ', ' + DateOfEvent[i][j] + ' ' + TimeOfEvent[i][j] + '</p>' : '') +
                                '<span class="ContentHeader">Venue</span><hr><p>To Be Announced Soon!</p>' +
                                '</div></td></tr><tr><td class="ContactDetail">' + (Coordinator[i][j][0].length > 0 ? ('<span class="Left">' + Coordinator[i][j][0] + ' - ' + PhoneNumber[i][j][0]) + '</span>' : '') + (Coordinator[i][j][1].length > 0 ? ('<span class="Right">' + Coordinator[i][j][1] + ' - ' + PhoneNumber[i][j][1]) + '</span>' : '') + '</td></tr></tbody></table></div>')
                                .appendTo(EventsFrame)
                                .on('click', function () {
                                    var This = $(this),
                                        Opacity = parseFloat(This.attr('data-opacity')),
                                        Category = parseInt(This.attr('data-category'), 10),
                                        Event = parseInt(This.attr('data-event'), 10);
                                    if (EventsOpen[Category] && !EventOpened && !EventOpening && Opacity > 0) {
                                        if (Event !== CurrentEvent) {
                                            CurrentEvent = Event;
                                            Functions.EventsChangeAnimation(Category, function () {
                                                Functions.EventOpenAnimation(This)
                                            });
                                        } else Functions.EventOpenAnimation(This);
                                    }
                                })
                                .on('mouseover', function () {
                                    var This = $(this),
                                        Opacity = parseFloat(This.attr('data-opacity')),
                                        Category = parseInt(This.attr('data-category'), 10);
                                    if (EventsOpen[Category] && !EventOpened && !EventOpening && Opacity > 0) {
                                        t.to(This, 1, {
                                            opacity: 1,
                                            scale: 1,
                                            transformOrigin: '50% 50%',
                                            ease: Power4EaseOut
                                        });
                                    }
                                })
                                .on('mouseout', function () {
                                    var This = $(this),
                                        Opacity = parseFloat(This.attr('data-opacity')),
                                        Category = parseInt(This.attr('data-category'), 10),
                                        Event = parseInt(This.attr('data-event'), 10);
                                    if (EventsOpen[Category] && !EventOpened && !EventOpening && Opacity > 0) {
                                        t.to(This, 1, {
                                            opacity: Event === CurrentEvent ? 1 : Opacity,
                                            scale: Event === CurrentEvent ? 1 : 0.9,
                                            transformOrigin: '50% 50%',
                                            ease: Power4EaseOut
                                        });
                                    }
                                }));
                        }
                        Objects.Events.push(EventsObjectArray);
                        EventsOpen.push(false);
                        EventsOpening.push(false);
                        EventsClosing.push(false);
                        EventsChanging.push(false);
                    }
                }
                return Functions;
            },
            ShowEventScrollHelpers: function () {
                if (CurrentEvent > 0) Objects.EventsScrollLeftHelper.Show();
                else Objects.EventsScrollLeftHelper.Hide();
                if (CurrentEvent < (Events[CurrentCategory].length - 1)) Objects.EventsScrollRightHelper.Show();
                else Objects.EventsScrollRightHelper.Hide();
            },
            EventOpenAnimation: function (eventObject) {
                EventOpened = false;
                EventOpening = true;
                EventClosing = false;
                var Head = eventObject.find('.Head'),
                    Header = Head.find('span'),
                    Content = eventObject.find('.Content'),
                    SmallDescription = Content.find('.SmallDescription'),
                    DetailedContent = Content.find('.DetailedContent'),
                    CloseEvent = Head.find('.CloseEvent'),
                    ContactDetail = eventObject.find('.ContactDetail'),
                    EventWidth = Width - MenuWidth - 100,
                    EventHeight = Height - 100;
                eventObject.css({
                    cursor: 'initial',
                    zIndex: 99
                });
                t.to(eventObject, 1, {
                    width: EventWidth,
                    height: EventHeight,
                    y: -CategoriesFrameTop,
                    backgroundColor: '#0c0c0e',
                    ease: Power4EaseOut
                });
                t.to(Head, 1, {
                    backgroundColor: '#18181b',
                    paddingTop: 10,
                    paddingBottom: 15,
                    y: 20,
                    ease: Power2EaseOut
                });
                t.to(Content, 1, {
                    y: 10,
                    ease: Power2EaseOut
                });
                SmallDescription.css({
                    opacity: 0,
                    display: 'none'
                });
                t.to(Header, 1, {
                    marginLeft: (EventWidth - Header.width()) / 2,
                    ease: Power2EaseOut
                });
                t.fromTo(CloseEvent, 1, {
                    opacity: 0,
                    display: 'block',
                    scale: 0.5,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: '50% 50%',
                    delay: 0.5,
                    ease: Power4EaseOut
                });
                DetailedContent.css({
                    display: 'block',
                    height: EventHeight - 165
                }).focus();
                t.fromTo(DetailedContent, 1, {
                    opacity: 0,
                    y: -25
                }, {
                    opacity: 1,
                    y: 25,
                    delay: 0.5,
                    ease: Power4EaseOut,
                    onComplete: function () {
                        EventOpened = true;
                        EventOpening = true;
                    }
                });
                t.fromTo(ContactDetail, 1, {
                    display: 'block',
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    delay: 0.5,
                    ease: Power4EaseOut
                });
                Objects.EventsScrollLeftHelper.Hide();
                Objects.EventsScrollRightHelper.Hide();
            },
            EventCloseAnimation: function (eventObject) {
                EventOpened = true;
                EventOpening = false;
                EventClosing = true;
                var Head = eventObject.find('.Head'),
                    Header = Head.find('span'),
                    Content = eventObject.find('.Content'),
                    SmallDescription = Content.find('.SmallDescription'),
                    DetailedContent = Content.find('.DetailedContent'),
                    CloseEvent = Head.find('.CloseEvent'),
                    ContactDetail = eventObject.find('.ContactDetail');
                t.to(Header, 0.5, {
                    marginLeft: 0,
                    ease: Power4EaseOut
                });
                t.to(CloseEvent, 0.5, {
                    opacity: 0,
                    scale: 0.5,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut,
                    onComplete: function () {
                        this.target.css({
                            display: 'none'
                        });
                    }
                });
                t.to(DetailedContent, 0.5, {
                    opacity: 0,
                    y: 50,
                    ease: Power4EaseOut,
                    onComplete: function () {
                        DetailedContent.css({
                            display: 'none'
                        });
                        t.to(eventObject, 0.5, {
                            width: 250,
                            height: 250,
                            y: 0,
                            backgroundColor: '#274f17',
                            ease: Power4EaseOut,
                            onComplete: function () {
                                this.target.css({
                                    cursor: 'pointer',
                                    zIndex: 1
                                });
                                t.fromTo(SmallDescription, 0.5, {
                                    opacity: 0,
                                    display: 'block',
                                    y: 50
                                }, {
                                    opacity: 1,
                                    y: 0,
                                    ease: Power4EaseOut,
                                    onComplete: function () {
                                        EventOpened = false;
                                        EventOpening = false;
                                        EventClosing = false;
                                    }
                                });
                                Functions.ShowEventScrollHelpers();
                            }
                        });
                        t.to(Head, 0.5, {
                            backgroundColor: '#274f17',
                            paddingTop: 0,
                            paddingBottom: 0,
                            y: 0,
                            ease: Power4EaseOut
                        });
                        t.to(Content, 0.5, {
                            y: 0,
                            ease: Power4EaseOut
                        });
                    }
                });
                t.to(ContactDetail, 0.5, {
                    opacity: 0,
                    y: 50,
                    ease: Power4EaseOut,
                    onComplete: function () {
                        this.target.css({display: 'none'});
                    }
                });
            },
            EventsEnterAnimation: function (category) {
                EventsOpen[category] = false;
                EventsOpening[category] = true;
                EventsClosing[category] = false;
                CurrentEvent = 0;
                var EventsFrame = Objects.EventsFrames[category],
                    EventsObjectArray = Objects.Events[category],
                    l = EventsObjectArray.length,
                    i = 0,
                    j = l > 1 ? 1 : 0,
                    o;
                if (l > 0) {
                    t.killTweensOf(EventsFrame);
                    t.killChildTweensOf(EventsFrame);
                    for (; i < l; i++) {
                        if (i < 4) {
                            o = 1 - 0.2 * i;
                            EventsObjectArray[i].attr('data-opacity', o);
                            t.fromTo(EventsObjectArray[i], 0.5, {
                                opacity: 0,
                                x: -150,
                                y: -50,
                                rotationX: 22.5,
                                rotationY: -22.5,
                                transformOrigin: '0% 50%'
                            }, {
                                opacity: o,
                                x: 0,
                                y: 0,
                                rotationX: 0,
                                rotationY: 0,
                                transformOrigin: '0% 50%',
                                delay: i * 0.1,
                                ease: Power4EaseOut,
                                onComplete: i === j ? function () {
                                    EventsOpening[category] = false;
                                    EventsOpen[category] = true;
                                } : undefined
                            });
                            t.fromTo(EventsObjectArray[i], 0.5, {
                                scale: 0.7,
                                transformOrigin: '50% 50%'
                            }, {
                                scale: i === 0 ? 1 : 0.9,
                                transformOrigin: '50% 50%',
                                delay: i * 0.1,
                                ease: Power4EaseOut
                            });
                        } else {
                            EventsObjectArray[i].attr('data-opacity', 0);
                            t.set(EventsObjectArray[i], {
                                opacity: 0,
                                x: 0,
                                y: 0,
                                rotationX: 0,
                                rotationY: 0,
                                transformOrigin: '0% 50%'
                            });
                            t.set(EventsObjectArray[i], {
                                scale: 0.9,
                                transformOrigin: '50% 50%'
                            });
                        }
                    }
                    t.fromTo(EventsFrame, 0.5, {
                        height: 0,
                        marginTop: 0,
                        opacity: 1,
                        overflow: 'visible'
                    }, {
                        height: 250,
                        marginTop: 10,
                        ease: Power4EaseOut
                    });
                    t.to(Objects.Categories[category].find('span'), 1, {
                        x: 0,
                        y: -10,
                        scale: 1.2,
                        transformOrigin: '0% 0%',
                        ease: Power4EaseOut
                    });
                    Functions.ShowEventScrollHelpers();
                } else {
                    t.to(Objects.Categories[category].find('span'), 1, {
                        x: 0,
                        ease: Power4EaseOut
                    });
                    EventsOpening[category] = false;
                }
            },
            EventsChangeAnimation: function (category, callback) {
                EventsChanging[category] = true;
                var EventsFrame = Objects.EventsFrames[CurrentCategory],
                    EventsObjectArray = Objects.Events[CurrentCategory],
                    l = EventsObjectArray.length,
                    i = 0,
                    o;
                for (; i < l; i++) {
                    o = i - CurrentEvent;
                    if (o > 0) o *= -1;
                    o = 1 + o * 0.3;
                    if (o < 0) o = 0;
                    EventsObjectArray[i].attr('data-opacity', o);
                    t.to(EventsObjectArray[i], 1, {
                        opacity: o,
                        ease: Power4EaseOut,
                        onComplete: (i + 1) === l ? function () {
                            EventsChanging[category] = false;
                        } : undefined
                    });
                    t.to(EventsObjectArray[i], 1, {
                        scale: i === CurrentEvent ? 1 : 0.9,
                        transformOrigin: '50% 50%',
                        ease: Power4EaseOut
                    });
                }
                t.to(EventsFrame, 1, {
                    left: -EventsObjectArray[CurrentEvent].position().left,
                    ease: Power4EaseOut,
                    onComplete: callback
                });
                Functions.ShowEventScrollHelpers();
            },
            EventsLeft: function () {
                CurrentEvent--;
                if (CurrentEvent >= 0) Functions.EventsChangeAnimation();
                else CurrentEvent = 0;
            },
            EventsRight: function () {
                CurrentEvent++;
                if (CurrentEvent !== Events[CurrentCategory].length) Functions.EventsChangeAnimation();
                else CurrentEvent--;
            },
            EventsCloseAnimation: function (category, callback) {
                EventsOpen[category] = false;
                EventsOpening[category] = false;
                EventsClosing[category] = true;
                var EventsFrame = Objects.EventsFrames[category];
                t.killTweensOf(EventsFrame);
                t.killChildTweensOf(EventsFrame);
                t.to(EventsFrame, 0.5, {
                    height: 0,
                    opacity: 0,
                    marginTop: 0,
                    ease: Power4EaseOut,
                    onComplete: function () {
                        t.set(this.target, {
                            left: 0,
                            overflow: 'hidden'
                        });
                        t.set(Objects.Events[category], {
                            x: 0,
                            y: 0,
                            rotationY: 0,
                            transformOrigin: '50% 50%'
                        });
                        EventsOpen[category] = false;
                        EventsClosing[category] = false;
                        CurrentEvent = 0;
                    }
                });
                t.staggerTo(Objects.Events[category], 0.5, {
                    opacity: 0,
                    scale: 0.7,
                    x: CategoriesFrameLeft,
                    y: -50,
                    rotationY: -45,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut
                }, 0);
                t.to(Objects.Categories[category].find('span'), 1, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    transformOrigin: '0% 0%',
                    ease: Power4EaseOut
                });
                Objects.EventsScrollLeftHelper.Hide();
                Objects.EventsScrollRightHelper.Hide();
                if (callback) callback();
            },
            CategoriesEnterAnimation: function (callback) {
                CategoriesOpening = true;
                var CategoriesObjectArray = Objects.Categories,
                    l = CategoriesObjectArray.length,
                    i = 0,
                    o;
                for (; i < l; i++) {
                    o = i - CurrentCategory;
                    if (o > 0) o *= -1;
                    o = 1 + o * 0.15;
                    if (o < 0) o = 0;
                    CategoriesObjectArray[i].attr('data-opacity', o);
                    t.fromTo(CategoriesObjectArray[i], 1, {
                        opacity: 0,
                        scale: 0.7,
                        x: -50,
                        y: 10,
                        transformOrigin: '0% 50%'
                    }, {
                        opacity: o,
                        scale: (i === CurrentCategory) ? 1.1 : 0.8,
                        x: 0,
                        y: 0,
                        transformOrigin: '0% 50%',
                        delay: i * 0.1,
                        ease: Power4EaseOut,
                        onComplete: (i + 1) === l ? function () {
                            CategoriesOpening = false;
                            CategoriesOpen = true;
                            if (callback) callback();
                        } : undefined
                    });
                }
                return Functions;
            },
            CategoriesChangeAnimation: function () {
                CategoriesChanging = true;
                var CategoriesObjectArray = Objects.Categories,
                    l = CategoriesObjectArray.length,
                    i = 0,
                    o,
                    d;
                for (; i < l; i++) {
                    o = i - CurrentCategory;
                    if (o > 0) d = -0.15;
                    else d = 0.3;
                    o = 1 + o * d;
                    if (o < 0) o = 0;
                    CategoriesObjectArray[i].attr('data-opacity', o);
                    t.to(CategoriesObjectArray[i], 1, {
                        opacity: o,
                        x: 0,
                        scale: (i === CurrentCategory) ? 1.1 : 0.8,
                        transformOrigin: '0% 50%',
                        ease: Power4EaseOut,
                        onComplete: (i + 1) === l ? function () {
                            CategoriesChanging = false;
                        } : undefined
                    });
                }
                t.to(Objects.CategoryFrame, 1, {
                    top: CategoriesFrameTop - CategoriesTop[CurrentCategory],
                    ease: Power4EaseOut
                });
                return Functions;
            },
            CategoryUp: function () {
                PreviousCategory = CurrentCategory;
                CurrentCategory--;
                if (CurrentCategory >= 0) Functions.EventsCloseAnimation(PreviousCategory, Functions.CategoriesChangeAnimation);
                else CurrentCategory = 0;
            },
            CategoryDown: function () {
                PreviousCategory = CurrentCategory;
                CurrentCategory++;
                if (CurrentCategory !== Categories.length) Functions.EventsCloseAnimation(PreviousCategory, Functions.CategoriesChangeAnimation);
                else CurrentCategory--;
            },
            SiteSectionStart: function () {
                if (!SiteSectionStarted) {
                    Functions.CategoriesEnterAnimation();
                    t.fromTo(Objects.MenuFrame, 1, {
                        opacity: 0,
                        marginLeft: -100,
                        scale: 0.8,
                        rotationY: 22.5,
                        transformOrigin: '50% 50%'
                    }, {
                        opacity: 1,
                        marginLeft: 0,
                        scale: 1,
                        rotationY: 0,
                        transformOrigin: '50% 50%',
                        ease: Power4EaseOut
                    });
                    t.staggerFromTo(Objects.MenuFrameChildren, 1, {
                        opacity: 0,
                        x: -100
                    }, {
                        opacity: 1,
                        x: 0,
                        ease: Power4EaseOut
                    }, 0.1);
                    t.staggerFromTo(Objects.MenuLinksSVG, 1, {
                        x: 50,
                        rotationX: 45,
                        rotationY: 45,
                        transformOrigin: '50% 50% 24px'
                    }, {
                        x: 0,
                        rotationX: 0,
                        rotationY: 0,
                        transformOrigin: '50% 50% 24px',
                        ease: Power4EaseOut
                    }, 0.1);
                    if (Objects.LogoPath === undefined) {
                        Objects.LogoBase = $(Objects.Logo[0].getSVGDocument()).find('#Base');
                        Objects.LogoPath = Objects.LogoBase.find('path');
                    }
                    Objects.LogoBase.css({cursor: 'pointer'})
                        .on('click', Functions.TechspardhaTransition)
                        .on('mouseover', function () {
                            t.to(Objects.LogoBase, 1, {
                                fill: '#daecc6',
                                ease: Power4EaseOut
                            });
                        })
                        .on('mouseout', function () {
                            t.to(Objects.LogoBase, 1, {
                                fill: '#8bc34a',
                                ease: Power4EaseOut
                            });
                        });
                    Functions.PathAnimation(Objects.LogoPath[0], 4, Power4EaseOut, false, 1, 100);
                    t.to(Objects.LogoBase, 1.5, {
                        fill: '#8bc34a',
                        stroke: '#0c0c0e',
                        delay: 2,
                        ease: Power4EaseOut
                    });
                    Objects.EventsScrollLeftHelper = $('#EventsScrollLeftHelper', d).Helper({
                            Width: 48,
                            Height: 32,
                            X: 'left',
                            Y: 'middle',
                            OffsetX: MenuWidth + 10,
                            OffsetY: -2,
                            RotateVertically: false,
                            RotateClockwise: false,
                            CallBackBind: 'click',
                            CallBack: function () {
                                if (CategoriesOpen && EventsOpen[CurrentCategory] && !EventOpened && !EventOpening) Functions.EventsLeft();
                            }
                        })
                        .Position(Width, Height, HalfWidth, HalfHeight);
                    Objects.EventsScrollRightHelper = $('#EventsScrollRightHelper', d).Helper({
                            Width: 48,
                            Height: 32,
                            X: 'right',
                            Y: 'middle',
                            OffsetX: -20,
                            OffsetY: -2,
                            RotateHorizontally: true,
                            RotateClockwise: false,
                            CallBackBind: 'click',
                            CallBack: function () {
                                if (CategoriesOpen && EventsOpen[CurrentCategory] && !EventOpened && !EventOpening) Functions.EventsRight();
                            }
                        })
                        .Position(Width, Height, HalfWidth, HalfHeight);
                    //Objects.CategoryScrollUpHelper = $('#CategoryScrollUpHelper', d).Helper({
                    //        Width: 24,
                    //        Height: 16,
                    //        X: 'left',
                    //        Y: 'top',
                    //        OffsetX: MenuWidth + 85,
                    //        OffsetY: 15,
                    //        RotateVertically: true,
                    //        RotateClockwise: true
                    //    })
                    //    .Position(Width, Height, HalfWidth, HalfHeight);
                    //Objects.CategoryScrollDownHelper = $('#CategoryScrollDownHelper', d).Helper({
                    //        Width: 24,
                    //        Height: 16,
                    //        X: 'left',
                    //        Y: 'top',
                    //        OffsetX: MenuWidth + 85,
                    //        OffsetY: 500,
                    //        RotateVertically: true,
                    //        RotateClockwise: false
                    //    })
                    //    .Position(Width, Height, HalfWidth, HalfHeight);
                }
            },
            /**
             * @return {number}
             */
            GetCategoryIndex: function (categoryName) {
                switch (categoryName) {
                    case 'Managerial':
                        return 0;
                        break;
                    case 'Quizzes':
                        return 1;
                        break;
                    case 'Fun Zone':
                        return 2;
                        break;
                    case 'Online Events':
                        return 3;
                        break;
                    case 'Paper Events':
                        return 4;
                        break;
                    case 'Technopolis':
                        return 5;
                        break;
                    case 'Design':
                        return 6;
                        break;
                    case 'Brain Storming':
                        return 7;
                        break;
                    case 'Future Builder':
                        return 8;
                        break;
                }
            },
            GetData: function () {
                $.get({
                    url: 'http://manage.techspardha.org/events/',
                    success: function (data) {
                        if (data.length) {
                            var i = 0,
                                l = data.length,
                                category,
                                event;
                            for (; i < l; i++) {
                                event = data[i];
                                category = Functions.GetCategoryIndex(event.category);
                                Events[category].push(event.nameOfEvent);
                                Descriptions[category].push(event.description.replace(/<(?!\/?[pa](?=>|\s.*>))\/?.*?>/g, '').replace('&nbsp;', ''));
                                Rules[category].push(event.rules.replace(/<(?!\/?[pa](?=>|\s.*>))\/?.*?>/g, '').replace('&nbsp;', ''));
                                Venue[category].push(event.venue);
                                Coordinator[category].push([event.coordinator_1, event.coordinator_2]);
                                PhoneNumber[category].push([event.phoneno_1, event.phoneno_2]);
                                DateOfEvent[category].push(event.dateOfEvent);
                                TimeOfEvent[category].push(event.timeOfEvent);
                            }
                            Functions.LoadCategories().LoadEvents();
                            w.LoadingDone = true;
                            w.LoadingCallBack = function () {
                                BackgroundMusic.play();
                                SVGObject.css({opacity: 1});
                                setTimeout(Functions.TeaserStart, 1075);
                            };
                        }
                    },
                    error: Functions.GetData
                });
            },
            //GetData: function () {
            //    var i = 0,
            //        cL = Categories.length,
            //        SuccessCount = 0,
            //        ErrorFlag = false;
            //    for (; i < cL; i++) {
            //        $.get({
            //            url: 'http://manage.techspardha.org/events/category/' + Categories[i],
            //            success: function (data) {
            //                if (data.length) {
            //                    var j = 0,
            //                        l = data.length,
            //                        category = Functions.GetCategoryIndex(data[0].category),
            //                        event;
            //                    for (; j < l; j++) {
            //                        event = data[j];
            //                        Events[category][j] = event.nameOfEvent;
            //                        Descriptions[category][j] = event.description.replace(/<(?!\/?[pa](?=>|\s.*>))\/?.*?>/g, '').replace('&nbsp;', '');
            //                        Rules[category][j] = event.rules.replace(/<(?!\/?[pa](?=>|\s.*>))\/?.*?>/g, '').replace('&nbsp;', '');
            //                        Venue[category][j] = event.venue;
            //                        Coordinator[category][j] = [event.coordinator_1, event.coordinator_2];
            //                        PhoneNumber[category][j] = [event.phoneno_1, event.phoneno_2];
            //                        DateOfEvent[category][j] = event.dateOfEvent;
            //                        TimeOfEvent[category][j] = event.timeOfEvent;
            //                    }
            //                }
            //                if (++SuccessCount === cL) {
            //                    Functions.LoadCategories().LoadEvents();
            //                    w.LoadingDone = true;
            //                    w.LoadingCallBack = function () {
            //                        BackgroundMusic.play();
            //                        SVGObject.css({opacity: 1});
            //                        setTimeout(Functions.TeaserStart, 1075);
            //                    };
            //                }
            //            },
            //            error: function () {
            //                if (!ErrorFlag) {
            //                    ErrorFlag = true;
            //                    alert('Oops! Something went terribly wrong. Please press Ctrl + F5 to retry.');
            //                }
            //            }
            //        });
            //    }
            //},
            PerformResizeFillByWidth: function () {
                var SVGWidth = Width,
                    SVGHeight = Height,
                    SVGMarginTop,
                    SVGMarginLeft = 0,
                    AspectRatio = Width / Height;
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
            },
            PerformResize: function () {
                Width = w.innerWidth;
                Height = w.innerHeight;
                if (Width < MinWidth) Width = MinWidth;
                if (Height < MinHeight) Height = MinHeight;
                HalfWidth = Width / 2;
                HalfHeight = Height / 2;
                Objects.MainFrame.css({
                    width: Width,
                    height: Height
                });
                Objects.SiteSection.css({
                    width: Width,
                    height: Height
                });
                Objects.ContentFrame.css({
                    width: Width - MenuWidth,
                    height: Height
                });
                Functions.PerformResizeFillByWidth();
                if (LinksActive) {
                    Objects.FacebookLink.Position(Width, Height, HalfWidth, HalfHeight);
                    Objects.GooglePlusLink.Position(Width, Height, HalfWidth, HalfHeight);
                    Objects.YoutubeLink.Position(Width, Height, HalfWidth, HalfHeight);
                    Objects.TwitterLink.Position(Width, Height, HalfWidth, HalfHeight);
                    Objects.GAWDSLink.Position(Width, Height, HalfWidth, HalfHeight);
                    Objects.ScrollDownHelper.Position(Width, Height, HalfWidth, HalfHeight);
                    Objects.MousePrompt.Position(Width, Height, HalfWidth, HalfHeight);
                    Objects.KeysPrompt.Position(Width, Height, HalfWidth, HalfHeight);
                }
                if (!TechspardhaStarted) Objects.EnterPrompt.Position(Width, Height, HalfWidth, HalfHeight);
            },
            MousePromptAnimation: function () {
                t.to(Objects.MousePromptScroll, 1, {
                    y: '+=3',
                    fill: '#9dcc66',
                    ease: Power4EaseOut,
                    onComplete: function () {
                        t.to(Objects.MousePromptScroll, 1, {
                            y: '-=3',
                            fill: '#ffffff',
                            ease: Power4EaseOut,
                            onComplete: Functions.MousePromptAnimation
                        });
                    }
                });
            },
            EnterPromptAnimation: function () {
                t.to(Objects.EnterPromptBase, 1, {
                    fill: '#9dcc66',
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut,
                    onComplete: function () {
                        t.to(Objects.EnterPromptBase, 1, {
                            fill: '#ffffff',
                            scale: 0.75,
                            transformOrigin: '50% 50%',
                            ease: Power4EaseOut,
                            onComplete: Functions.EnterPromptAnimation
                        });
                    }
                });
            },
            KeysPromptAnimation: function () {
                t.staggerTo(Objects.KeysPromptKeys, 1, {
                    fill: '#9dcc66',
                    ease: Power4EaseOut
                }, 0.5, function () {
                    t.staggerTo(Objects.KeysPromptKeys, 1, {
                        fill: '#ffffff',
                        ease: Power4EaseOut
                    }, 0.5, Functions.KeysPromptAnimation);
                });
            },
            FrameOpen: function (FrameObject, FrameLinkObject) {
                var Span = FrameLinkObject.find('span').attr('data-link-opened', 'true');
                t.to(Span, 0.5, {
                    marginLeft: 5,
                    color: '#9dcc66',
                    ease: Power4EaseOut
                });
                t.fromTo(FrameObject, 1, {
                    display: 'block',
                    zIndex: 2,
                    opacity: 1,
                    y: HalfHeight,
                    scale: 0.7,
                    rotationX: 45,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut
                });
            },
            FrameClose: function (FrameObject, FrameLinkObject, Direction) {
                if (Direction === undefined) Direction = -1;
                var Span = FrameLinkObject.find('span').attr('data-link-opened', 'false');
                t.to(Span, 0.5, {
                    marginLeft: 0,
                    color: '#b0b0b0',
                    ease: Power4EaseOut
                });
                t.fromTo(FrameObject, 1, {
                    zIndex: 1
                }, {
                    opacity: 0,
                    y: Direction * HalfHeight,
                    scale: 0.7,
                    rotationX: Direction * 45,
                    transformOrigin: '50% 50%',
                    ease: Power4EaseOut,
                    onComplete: function () {
                        this.target.css({
                            display: 'none'
                        });
                    }
                });
            },
            GalleryFrameOpen: function () {
                if (!GalleryOpened) {
                    GalleryOpened = true;
                    Functions.galleryLoader();
                    Functions.FrameOpen(Objects.GalleryFrame, Objects.GalleryLink);
                }
            },
            GalleryFrameClose: function (Direction) {
                if (GalleryOpened) {
                    GalleryOpened = false;
                    Functions.FrameClose(Objects.GalleryFrame, Objects.GalleryLink, Direction);
                }
            },
            SponsorsFrameOpen: function () {
                if (!SponsorsOpened) {
                    SponsorsOpened = true;
                    Functions.FrameOpen(Objects.SponsorsFrame, Objects.SponsorsLink);
                }
            },
            SponsorsFrameClose: function (Direction) {
                if (SponsorsOpened) {
                    SponsorsOpened = false;
                    Functions.FrameClose(Objects.SponsorsFrame, Objects.SponsorsLink, Direction);
                }
            },
            ExhibitionsFrameOpen: function () {
                if (!ExhibitionsOpened) {
                    ExhibitionsOpened = true;
                    Functions.FrameOpen(Objects.ExhibitionsFrame, Objects.ExhibitionsLink);
                }
            },
            ExhibitionsFrameClose: function (Direction) {
                if (ExhibitionsOpened) {
                    ExhibitionsOpened = false;
                    Functions.FrameClose(Objects.ExhibitionsFrame, Objects.ExhibitionsLink, Direction);
                }
            },
            LecturesFrameOpen: function () {
                if (!LecturesOpened) {
                    LecturesOpened = true;
                    Functions.FrameOpen(Objects.LecturesFrame, Objects.LecturesLink);
                }
            },
            LecturesFrameClose: function (Direction) {
                if (LecturesOpened) {
                    LecturesOpened = false;
                    Functions.FrameClose(Objects.LecturesFrame, Objects.LecturesLink, Direction);
                }
            },
            TechExpoFrameOpen: function () {
                if (!TechExpoOpened) {
                    TechExpoOpened = true;
                    Functions.FrameOpen(Objects.TechExpoFrame, Objects.TechExpoLink);
                }
            },
            TechExpoFrameClose: function (Direction) {
                if (TechExpoOpened) {
                    TechExpoOpened = false;
                    Functions.FrameClose(Objects.TechExpoFrame, Objects.TechExpoLink, Direction);
                }
            },
            // Gallery
            button_hover: function (element) {
                t.to(element, 0.4, {
                    fill: '#00a0a9',
                    stroke: '#00a0a9',
                    opacity: 1,
                    ease: Power4EaseOut
                });
            },
            show_image: function (element, current) {
                t.to(galleryLoader,0.2,{
                    opacity:0,
                    ease: Power4EaseOut
                });
                t.to(element, 0.5, {
                    scale: 0.5,
                    rotationX: '-150deg',
                    transformOrigin: '50% 50% -50%',
                    ease: Power4EaseIn,
                    onComplete: function () {
                        element.css({
                            backgroundImage: 'url(https://s3-ap-southeast-1.amazonaws.com/techspardha/gallery+/' + current + '.jpg)',
                            onComplete: function () {
                                t.to(galleryLoader,0.75,{
                                    opacity:1,
                                    ease: Power4EaseOut
                                });
                                t.fromTo(element, 0.5, {
                                    //opacity: 0,
                                    scale: 0.5,
                                    rotationX: '150deg'
                                }, {
                                    opacity: 1,
                                    scale: 1,
                                    rotationX: '0deg',
                                    ease: Power4EaseOut,
                                    onComplete: function () {
                                        image_caption.html(image_text[current - 1]);
                                        t.to(left_handle, 0.8, {
                                            x: '-150',
                                            ease: Back.easeInOut
                                        });
                                        t.to(right_handle, 0.8, {
                                            x: '+150',
                                            ease: Back.easeInOut,
                                            onComplete: function () {
                                            }
                                        });
                                        t.to(image_caption, 1, {
                                            opacity: 1,
                                            x: '-50%',
                                            transformOrigin: "50%,50%",
                                            scale: '1',
                                            ease: Back.easeInOut
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            },
            galleryLoader: function(){
                t.to(galleryLoader,5,{
                    strokeDashoffset : '+=500',
                    ease: Linear.easeNone,
                    onComplete: GalleryOpened ? Functions.galleryLoader : undefined
                });
            },
            browse: function (element, current, arrow) {
                t.fromTo(arrow, 0.5, {
                    scale: 0.75,
                    stroke: '#00a0a9',
                    fill: '#00a0a9',
                    transformOrigin: '50% 50%'
                }, {
                    scale: 1,
                    stroke: '#ffffff',
                    fill: '#0e0e0e',
                    ease: Power4EaseInOut
                });
                t.fromTo(left_handle, 0.5, {
                    x: 0
                }, {
                    transformOrigin: '150% 50%',
                    x: 0,
                    scale: 0.8,
                    ease: Power4EaseInOut,
                    onComplete: function () {
                        t.fromTo(left_handle, 0.5, {
                            scale: 0.8,
                            rotationZ: '270deg'
                        }, {
                            rotationZ: '0deg',
                            scale: 1
                        });
                    }
                });
                t.fromTo(right_handle, 0.5, {
                    x: '0'
                }, {
                    x: 0,
                    transformOrigin: '-50% 50%',
                    scale: 0.8,
                    ease: Power4EaseInOut,
                    onComplete: function () {
                        t.fromTo(right_handle, 0.53, {
                            scale: 0.8,
                            rotationZ: '270deg'
                        }, {
                            rotationZ: '0deg',
                            scale: 1
                        });
                    }
                });
                t.to(image_caption, 0.4, {
                    opacity: 0,
                    scale: 0.5,
                    transformOrigin: "50% 50%",
                    ease: Back.easeOut
                });
                if (current < 1) current = 1;
                else if (current > number_of_images) current = number_of_images;
                for (var index = 1; index < number_of_images + 1; index++) {
                    var dif = Math.abs(current - index) * opacity_factor;
                    if (index < current && dif <= 0.9) {
                        opacity = 1 - dif;
                        shadow = "none";
                    }
                    else if (index == current) {
                        opacity = 1;
                        scale = 1;
                        shadow = '0 0 10px #9dcc66';
                    }
                    else if (index > current && dif <= 0.9) {
                        opacity = 1 - dif;
                        shadow = "none";
                    }
                    else {
                        opacity = 0.2;
                        shadow = 'none';
                    }
                    t.to(image_array[index - 1], 0.5, {
                        opacity: opacity,
                        boxShadow: shadow,
                        transformOrigin: '50% 0%',
                        ease: Power2.easeIn
                    });
                }
            },
            InitImage_Array: function (element) {
                var i,
                    _opacity = 1;
                element.css("display", "inline-flex");
                for (i = 1; i < number_of_images + 1; i++) {
                    element.append('<div id="#' + i + '" class="_image_box" style="height: 100%; width: ' + 100 / number_of_images + '%; opacity: ' + _opacity + '"></div>');
                    _opacity -= opacity_factor;
                }
                image_array = element.find('._image_box');
                t.staggerFromTo(image_array, 0.4, {
                    scale: 0,
                    display: 'inline-flex'
                }, {
                    scale: 1,
                    ease: Back.easeOut
                }, 0.1);
            },
            enter_gallery: function (element) {
                element.css({
                    display: 'block',
                    opacity: 1
                });
                image_caption.html('');
                image_caption.append(image_text[current - 1]);
                t.set(_image_viewbox, {
                    left: '50%',
                    top: '50%',
                    x: '-50%',
                    y: '-60%',
                    height: Height - 200,
                    width: 1.431 * (Height - 200)
                });
                t.set(image_caption, {
                    opacity: 1,
                    x: '-50%',
                    transformOrigin: '50% 50%',
                    scale: 1
                });
            }
            // Gallery
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
                CallBack: undefined,
                Cursor: 'hand'
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
            Easing = Options.Easing,
            CallBackBind = Options.CallBackBind,
            CallBack = Options.CallBack,
            Cursor = Options.Cursor,
            zIndex = 2;
        var Functions = {
            Init: function () {
                if (CallBackBind !== undefined) {
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
                            cursor: Cursor
                        });
                    Base = $('#Base', RootObject);
                    t.set(Base, {
                        scale: 0.75,
                        transformOrigin: '50% 50%'
                    });
                } else {
                    RootObject = $(Element[0].contentDocument.documentElement)
                        .css({
                            cursor: Cursor
                        });
                    Base = $('#Base', RootObject);
                }
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
                t.to(Element, Duration, {
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
            },
            GetRoot: function () {
                return RootObject;
            }
            //SetCallBack: function (callback) {
            //    CallBack = callback;
            //    RootObject.on(CallBackBind, CallBack);
            //}
        };
        if (Element[0].getSVGDocument()) Functions.Init();
        else Element.on('load', Functions.Init);
        return Functions;
    };

    $.fn.Helper = function (o) {
        var Element = this,
            RootObject,
            Front,
            Back,
            Options = $.extend({
                Width: 96,
                Height: 64,
                X: 'left',
                Y: 'bottom',
                OffsetX: 0,
                OffsetY: 0,
                RotateVertically: false,
                RotateHorizontally: false,
                RotateClockwise: false,
                Duration: 1,
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
            RotateVertically = Options.RotateVertically,
            RotateHorizontally = Options.RotateHorizontally,
            RotateClockwise = Options.RotateClockwise,
            Duration = Options.Duration,
            HalfDuration = Duration / 2,
            Easing = Options.Easing,
            PauseFlag = true,
            Visible = false,
            CallBackBind = Options.CallBackBind,
            CallBack = Options.CallBack,
            zIndex = 2,
            Functions = {
                Position: function (WindowWidth, WindowHeight, HalfWindowWidth, HalfWindowHeight) {
                    var x = OffsetX,
                        y = OffsetY;
                    switch (X) {
                        case 'left':
                            x += 0;
                            break;
                        case 'middle':
                            x += HalfWindowWidth - (RotateVertically ? HalfHeight : HalfWidth);
                            break;
                        case 'right':
                            x += WindowWidth - (RotateVertically ? Height : Width);
                            break;
                    }
                    switch (Y) {
                        case 'top':
                            y += 0;
                            break;
                        case 'middle':
                            y += HalfWindowHeight - (RotateVertically ? HalfWidth : HalfHeight);
                            break;
                        case 'bottom':
                            y += WindowHeight - (RotateVertically ? Width : Height);
                            break;
                    }
                    Element.css({
                        left: x,
                        top: y
                    });
                    return Functions;
                },
                Animate: function () {
                    t.to(Front, HalfDuration, {
                        x: -10,
                        scale: 1.2,
                        transformOrigin: '50% 50%',
                        onComplete: function () {
                            t.to(Front, HalfDuration, {
                                x: 0,
                                scale: 1,
                                transformOrigin: '50% 50%'
                            });
                        }
                    });
                    t.fromTo(Back, Duration, {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transformOrigin: '50% 50%'
                    }, {
                        opacity: 0,
                        x: 30,
                        scale: 0.8,
                        transformOrigin: '50% 50%',
                        ease: Easing,
                        onComplete: PauseFlag ? undefined : Functions.Animate
                    });
                    return Functions;
                },
                Play: function () {
                    PauseFlag = false;
                    Functions.Animate();
                },
                Pause: function () {
                    PauseFlag = true;
                },
                Hide: function () {
                    Visible = false;
                    t.to(Element, HalfDuration, {
                        opacity: 0,
                        marginLeft: RotateVertically ? 0 : RotateHorizontally ? HalfWidth : -HalfWidth,
                        marginTop: RotateVertically ? (RotateClockwise ? 1 : -1) * HalfHeight : 0,
                        ease: Easing,
                        onComplete: function () {
                            Element.css('z-index', -zIndex);
                            if (!PauseFlag) {
                                Functions.Pause();
                            }
                        }
                    });
                },
                Show: function () {
                    if (!Visible) {
                        Visible = true;
                        Element.css('z-index', zIndex);
                        t.fromTo(Element, Duration, {
                            marginLeft: RotateVertically ? 0 : RotateHorizontally ? -HalfWidth : HalfWidth,
                            marginTop: RotateVertically ? (RotateClockwise ? 1 : -1) * HalfHeight : 0
                        }, {
                            opacity: 1,
                            marginLeft: 0,
                            marginTop: 0,
                            ease: Easing,
                            onComplete: function () {
                                if (PauseFlag) {
                                    Functions.Play();
                                }
                            }
                        });
                    }
                },
                Init: function () {
                    RootObject = $(Element[0].contentDocument.documentElement)
                        .on('mouseover', function () {
                            t.to(Element, Duration, {
                                scale: 1.125,
                                transformOrigin: '50% 50%',
                                ease: Easing
                            });
                        })
                        .on('mouseout', function () {
                            t.to(Element, Duration, {
                                scale: 1,
                                transformOrigin: '50% 50%',
                                ease: Easing
                            });
                        });
                    if (CallBackBind !== undefined && CallBack !== undefined) RootObject.on(CallBackBind, CallBack);
                    Front = RootObject.find('#Front');
                    Back = RootObject.find('#Back');
                    RootObject.css({
                        cursor: 'pointer'
                    });
                    t.set(Element, {
                        rotation: (RotateVertically ? RotateClockwise ? 90 : -90 : RotateHorizontally ? RotateClockwise ? 180 : -180 : 0),
                        transformOrigin: '50% 50%',
                        opacity: 0,
                        marginLeft: RotateVertically ? 0 : HalfWidth,
                        marginTop: RotateVertically ? (RotateClockwise ? 1 : -1) * HalfHeight : 0
                    });
                }
            };
        if (Element[0].getSVGDocument()) Functions.Init();
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

    dO.on('ready', function () {
            BackgroundMusic = $('#BackgroundMusic', d)[0];
            Objects.MainFrame = $('#MainFrame', d);
            Objects.TeaserSection = $('#TeaserSection', d);
            Objects.SiteSection = $('#SiteSection', d);
            Objects.EnterPrompt = $('#EnterPrompt', d).Link({
                    Width: 36,
                    Height: 36,
                    X: 'right',
                    Y: 'top',
                    OffsetX: -16,
                    OffsetY: 15,
                    CallBackBind: 'click',
                    CallBack: Functions.TeaserStop
                })
                .Position(Width, Height, HalfWidth, HalfHeight);
            SVGObject = $('#MainSVG', d).on('load', function () {
                SVGRoot = SVGObject[0].contentDocument.documentElement;
                SVGRootObject = $(SVGRoot).on('click', function () {
                    wO.focus();
                });
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
                SVGElements.SkipText = $('#SkipText', SVGRootObject).css({opacity: 0, display: 'block'});
                BackgroundMusic.load();
                BackgroundMusic.addEventListener('canplaythrough', function () {
                    if (!TeaserStarted) Functions.GetData();
                }, false);
            }).on('click', function () {
                wO.focus();
            });
            Objects.CategoryFrame = $('#CategoryFrame', d);
            Objects.MenuFrame = $('#MenuFrame', d);
            Objects.MenuFrameChildren = Objects.MenuFrame.children();
            Objects.MenuLinks = Objects.MenuFrame.find('.MenuLinks').on('mouseover', function () {
                var Span = $(this).find('span');
                if (Span.attr('data-link-opened') === 'false')
                    t.to(Span, 0.5, {
                        marginLeft: 10,
                        color: '#9dcc66',
                        ease: Power4.easeOut
                    });
            }).on('mouseout', function () {
                var Span = $(this).find('span');
                if (Span.attr('data-link-opened') === 'false')
                    t.to(Span, 0.5, {
                        marginLeft: 0,
                        color: '#b0b0b0',
                        ease: Power4.easeOut
                    });
            });
            Objects.MenuLinksSVGBase = [];
            Objects.MenuLinksSVG = Objects.MenuFrame.find('.MenuLinks object');
            Objects.Logo = $('#Logo', d).on('load', function () {
                Objects.LogoBase = $(this.contentDocument.documentElement).find('#Base');
                Objects.LogoPath = Objects.LogoBase.find('path');
            });
            Objects.RegisterLink = $('#RegisterLink', d).on('click', function () {
                $('#mod').modal('show');
            });
            Objects.SponsorsLink = $('#SponsorsLink', d).on('click', function () {
                Functions.SponsorsFrameOpen();
                Functions.GalleryFrameClose();
                Functions.ExhibitionsFrameClose();
                Functions.LecturesFrameClose();
                Functions.TechExpoFrameClose();
            });
            Objects.GalleryLink = $('#GalleryLink', d).on('click', function () {
                Functions.GalleryFrameOpen();
                Functions.SponsorsFrameClose();
                Functions.ExhibitionsFrameClose();
                Functions.LecturesFrameClose();
                Functions.TechExpoFrameClose();
            });
            Objects.EventsLink = $('#EventsLink', d).on('click', function () {
                Functions.GalleryFrameClose(1);
                Functions.SponsorsFrameClose(1);
                Functions.ExhibitionsFrameClose(1);
                Functions.LecturesFrameClose(1);
                Functions.TechExpoFrameClose(1);
            });
            Objects.ExhibitionsLink = $('#ExhibitionsLink', d).on('click', function () {
                Functions.ExhibitionsFrameOpen();
                Functions.GalleryFrameClose();
                Functions.SponsorsFrameClose();
                Functions.LecturesFrameClose();
                Functions.TechExpoFrameClose();
            });
            Objects.LecturesLink = $('#LecturesLink', d).on('click', function () {
                Functions.LecturesFrameOpen();
                Functions.ExhibitionsFrameClose();
                Functions.GalleryFrameClose();
                Functions.SponsorsFrameClose();
                Functions.TechExpoFrameClose();
            });
            Objects.TechExpoLink = $('#TechExpoLink', d).on('click', function () {
                Functions.TechExpoFrameOpen();
                Functions.GalleryFrameClose();
                Functions.SponsorsFrameClose();
                Functions.ExhibitionsFrameClose();
                Functions.LecturesFrameClose();
            });
            Objects.SponsorsFrame = $('#SponsorsFrame', d);
            Objects.GalleryFrame = $('#GalleryFrame', d);
            Objects.ExhibitionsFrame = $('#ExhibitionsFrame', d);
            Objects.LecturesFrame = $('#LecturesFrame', d);
            Objects.TechExpoFrame = $('#TechExpoFrame', d);
            Objects.ContentFrame = $('.ContentFrame', d).css({
                width: Width - MenuWidth,
                height: Height,
                left: MenuWidth
            });
            // Gallery
            image_frame = $('#image_frame', d);
            image_window = $('#_image_window', d);
            image_info_display = $('#image_info_display', d);
            galleryLoader = $('#galleryLoader',d);
            button_SVG = $('#buttonSVG', d);
            gallery_button = $('#_gallery_button', d);
            hover_button = $('.hover_button', d);
            image_caption = $('#_image_caption', d);
            left_handle = $('#_left_handle', d);
            right_handle = $('#_right_handle', d);
            left_button = $('#left', d);
            right_button = $('#right', d);
            _image_viewbox = $('#_image_viewbox', d).css({
                height: '' + Width * 0.5 * (3 / 4) + 'px',
                width: '' + Width * 0.5 + 'px'
            });
            Functions.InitImage_Array(image_window);
            hover_button.on('mouseenter', function () {
                Functions.button_hover(this);
            });
            hover_button.on('mouseleave', function () {
                t.to(hover_button, 0.4, {
                    fill: '#0e0e0e',
                    stroke: '#ffffff',
                    ease: Power4EaseOut
                });
            });
            gallery_button.on('click', function () {
                Functions.enter_gallery(image_frame);
            });
            left_button.on('click', function () {
                current--;
                if (current < 1)   current = 1;
                else {
                    Functions.browse(image_array, current, left_button);
                    Functions.show_image(_image_viewbox, current);
                }
            });
            right_button.on('click', function () {
                current++;
                if (current > number_of_images)   current = number_of_images;
                else {
                    Functions.browse(image_array, current, right_button);
                    Functions.show_image(_image_viewbox, current);
                }
            });
            $('._image_box', d).on('click', function () {
                current = 1 + image_array.index(this);
                Functions.browse(image_array, current, left_button);
                Functions.show_image(_image_viewbox, current);
            });
            Functions.enter_gallery(image_frame);
            // Gallery
            Functions.PerformResize();
        })
        .on('click', '.CloseEvent', function () {
            if (EventOpened && !EventClosing) Functions.EventCloseAnimation(Objects.Events[CurrentCategory][CurrentEvent]);
        })
        .on('mouseover', '.CloseEvent', function () {
            t.to(this, 0.5, {
                scale: 1.3,
                rotation: 90,
                transformOrigin: '50% 50%',
                ease: Power4.easeOut
            });
        })
        .on('mouseout', '.CloseEvent', function () {
            t.to(this, 0.5, {
                scale: 1,
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: Power4.easeOut
            });
        });
    wO.on('resize', Functions.PerformResize)
        .on('keydown', function (e) {
            if (w.LoadingDone) {
                if (!TechspardhaStarted && TeaserStarted) {
                    if (e.keyCode === 13) Functions.TeaserStop();
                } else if (LinksActive && !SiteSectionActive) {
                    if (!Transiting && e.keyCode === 40) Functions.SectionTransition();
                } else if (!GalleryOpened && !SponsorsOpened && !LecturesOpened && !ExhibitionsOpened && !TechExpoOpened && SiteSectionStarted) {
                    switch (e.keyCode) {
                        case 13: // Enter
                            if (!EventsOpen[CurrentCategory] && !EventsOpening[CurrentCategory] && !EventOpened && !EventOpening) {
                                Functions.EventsEnterAnimation(CurrentCategory);
                            }
                            else if (EventsOpen[CurrentCategory] && !EventsClosing[CurrentCategory] && !EventOpened && !EventOpening)
                                Functions.EventOpenAnimation(Objects.Events[CurrentCategory][CurrentEvent]);
                            break;
                        case 27: // Escape
                            if (EventOpened && !EventClosing) Functions.EventCloseAnimation(Objects.Events[CurrentCategory][CurrentEvent]);
                            break;
                        case 37: // Left
                            if (CategoriesOpen && EventsOpen[CurrentCategory] && !EventOpened && !EventOpening) Functions.EventsLeft();
                            break;
                        case 38: // Up
                            if (CategoriesOpen && !EventOpened && !EventOpening) Functions.CategoryUp();
                            break;
                        case 39: // Right
                            if (CategoriesOpen && EventsOpen[CurrentCategory] && !EventOpened && !EventOpening) Functions.EventsRight();
                            break;
                        case 40: // Down
                            if (CategoriesOpen && !EventOpened && !EventOpening) Functions.CategoryDown();
                            break;
                    }
                }
            }
        })
        .on('keyup', function (e) {
            if (GalleryOpened) {
                var key = e.keyCode;
                if (key == 37) {
                    current--;
                    if (current < 1)   current = 1;
                    else {
                        Functions.browse(image_array, current, left_button);
                        Functions.show_image(_image_viewbox, current);
                    }
                } else if (key == 39) {
                    current++;
                    if (current > number_of_images)   current = number_of_images;
                    else {
                        Functions.browse(image_array, current, right_button);
                        Functions.show_image(_image_viewbox, current);
                    }
                }
            }
        })
        .on('mousewheel', function (e) {
            if (SiteSectionActive && !GalleryOpened && !SponsorsOpened
                && !ExhibitionsOpened && !LecturesOpened && CategoriesOpen && !EventsMouseOver
                && !EventOpened && !EventOpening) {
                if (e.deltaY > 0) Functions.CategoryUp();
                else if (e.deltaY < 0) Functions.CategoryDown();
            } else if (!SiteSectionActive && LinksActive && !Transiting && e.deltaY < 0) {
                Functions.SectionTransition();
            }
        });
    (function () {
        var StateKey,
            EventKey,
            Keys = {
                hidden: 'visibilitychange',
                webkitHidden: 'webkitvisibilitychange',
                mozHidden: 'mozvisibilitychange',
                msHidden: 'msvisibilitychange'
            };
        for (StateKey in Keys) {
            if (StateKey in d) {
                EventKey = Keys[StateKey];
                break;
            }
        }
        dO.on(EventKey, function () {
            if (!LinksActive) {
                if (!Paused) {
                    Paused = true;
                    BackgroundMusic.pause();
                } else {
                    Paused = false;
                    BackgroundMusic.play();
                }
            }
        });
    })();
})(window, document, jQuery(window), jQuery(document), jQuery, TweenMax);