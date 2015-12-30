(function (w, d, wO, dO, $, t) {
    var SVGObject,
        SVGRoot,
        SVGRootObject,
        SVGElements = {},
        ElasticEasingIn = Elastic.easeIn.config(2, 1),
        ElasticEasingOut = Elastic.easeOut.config(2, 1),
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
                    ease: Power4.easeOut,
                    onComplete: function () {
                        t.to(this.target, 0.5, {
                            scale: '+=0.02',
                            transformOrigin: '50% 50%',
                            ease: Power4.easeOut
                        });
                    }
                }, 0.1, callback);
            },
            QueueEnterAnimation: function () {
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
                                    ease: Power3.easeOut
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
                                                                            ease: Power4.easeOut
                                                                        });
                                                                    }
                                                                });
                                                                t.to(SVGElements.TabletHand, 2, {
                                                                    y: 500,
                                                                    skewX: 90,
                                                                    transformOrigin: '50% 50%',
                                                                    ease: Power3.easeOut
                                                                });
                                                                t.to(SVGElements.TabletBody, 2, {
                                                                    scale: 2,
                                                                    transformOrigin: '50% 50%',
                                                                    ease: Power3.easeOut
                                                                });
                                                                t.to(SVGElements.SmartClassAppBack, 1.5, {
                                                                    attr: {
                                                                        rx: 0,
                                                                        ry: 0
                                                                    },
                                                                    ease: Power4.easeOut
                                                                });
                                                                t.to(SVGElements.SmartClassApp, 1.5, {
                                                                    scale: 2,
                                                                    transformOrigin: '50% 50%',
                                                                    ease: Power4.easeOut,
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
            CloudsAnimation: function () {
                var i = 0,
                    n = SVGElements.Clouds.length;
                for (; i < n; i++)
                    t.to(SVGElements.Clouds[i], Math.random() % 10 + 30, {
                        x: '-=200',
                        ease: Linear.easeNone
                    });
            },
            WindmillEnter: function () {
                t.to(SVGElements.PowerLineWholeGroup, 4, {
                    rotation: 20,
                    x: 960,
                    y: -300,
                    ease: Power4.easeInOut
                });
                t.staggerTo(SVGElements.WindmillFans, 10, {
                    rotation: 3600,
                    transformOrigin: '39.83% 56.3%',
                    ease: Linear.easeNone
                }, 0.1);
            },
            PathAnimation: function (path, time, ease, inverse, callback) {
                var PathLength = path.getTotalLength();
                t.fromTo(path, time, {
                    strokeDasharray: PathLength + ' ' + PathLength,
                    strokeDashoffset: (inverse ? -1 : 1) * PathLength,
                    opacity: 1
                }, {
                    strokeDashoffset: 0,
                    ease: ease,
                    onComplete: callback
                });
            },
            SkyEnter: function () {
                t.to(SVGElements.Classroom, 1, {
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
                        ease: Power3.easeOut
                    });
                    t.staggerFromTo(SVGElements.PowerLineElements, 1, {
                        y: 200
                    }, {
                        y: 0,
                        ease: ElasticEasingOut
                    }, 0.1, function () {
                        Functions.CloudsAnimation();
                        Functions.PathAnimation(SVGElements.PowerLineWire[0], 7, Linear.easeNone, false);
                        setTimeout(Functions.WindmillEnter, 2000);
                    });
                }, 1000);
            },
            StudentExitAnimation: function (i, j, x, d, callback) {
                t.to(SVGElements.StudentTopGroupArray[i], 0.25, {
                    x: x,
                    ease: Power3.easeOut,
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
                    ease: Power3.easeOut,
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
                    ease: Power3.easeOut
                });
                t.to(SVGElements.SmartClassApp, 0.5, {
                    opacity: 0,
                    scale: '-=0.1',
                    transformOrigin: '50% 50%',
                    ease: ElasticEasingIn
                });
                t.to(SVGElements.ProjectorLight, 0.5, {
                    fill: '#989898',
                    ease: Power3.easeOut
                });
                Functions.StudentExitAnimation(2, 2, 100, 0);
                Functions.StudentExitAnimation(1, 1, 233, 0.6);
                Functions.StudentExitAnimation(0, 0, 383, 1.2, function () {
                    t.to(SVGElements.Teacher, 0.5, {
                        x: '+=383',
                        ease: Power3.easeOut,
                        onComplete: function () {
                            t.to(SVGElements.Teacher, 0.5, {
                                x: '-=20',
                                y: -40,
                                opacity: 0,
                                scale: 0.5,
                                transformOrigin: '50% 50%',
                                ease: ElasticEasingIn,
                                onComplete: function () {
                                    t.to(SVGElements.Bulb, 0.5, {
                                        fill: '#989898',
                                        ease: Power3.easeOut
                                    });
                                    t.fromTo(SVGElements.LightBubbleOne, 0.5, {
                                        opacity: 1
                                    }, {
                                        attr: {
                                            r: 0
                                        },
                                        opacity: 0,
                                        ease: Power3.easeOut
                                    });
                                    t.fromTo(SVGElements.LightBubbleTwo, 0.5, {
                                        opacity: 1
                                    }, {
                                        attr: {
                                            r: 0
                                        },
                                        opacity: 0,
                                        delay: 0.25,
                                        ease: Power3.easeOut,
                                        onComplete: Functions.SkyEnter
                                    });
                                    t.to(SVGElements.Blackout, 0.5, {
                                        opacity: 1,
                                        ease: Power3.easeOut
                                    });
                                }
                            });
                        }
                    });
                });
            },
            ClassRoomAnimation: function (n, callback) {
                var i = 0,
                    ClassRoomInterval = setInterval(function () {
                        if (i < n) {
                            t.to(SVGElements.ProjectorLight, 0.5, {
                                fill: '#989898',
                                ease: Power3.easeOut,
                                onComplete: function () {
                                    t.to(SVGElements.ProjectorLight, 0.5, {
                                        fill: '#47ff00',
                                        ease: Power3.easeOut
                                    });
                                }
                            });
                            t.to(SVGElements.ProjectorShadow, 0.5, {
                                opacity: 0.5,
                                ease: Power3.easeOut,
                                onComplete: function () {
                                    t.to(SVGElements.ProjectorShadow, 0.5, {
                                        opacity: 1,
                                        ease: Power3.easeOut
                                    });
                                }
                            });
                            t.to(SVGElements.SmartClassAppIcon, 0.5, {
                                rotation: 10,
                                scale: 6.2,
                                transformOrigin: '50% 50%',
                                ease: ElasticEasingIn,
                                onComplete: function () {
                                    t.to(SVGElements.SmartClassAppIcon, 0.5, {
                                        rotation: -10,
                                        scale: 5.8,
                                        transformOrigin: '50% 50%',
                                        ease: ElasticEasingOut
                                    });
                                }
                            });
                            t.to(SVGElements.SmartClassAppIconHead, 0.5, {
                                y: '-=1',
                                ease: Power3.easeOut,
                                onComplete: function () {
                                    t.to(SVGElements.SmartClassAppIconHead, 0.5, {
                                        y: '+=1',
                                        ease: Power3.easeOut
                                    });
                                }
                            });
                            t.to(SVGElements.TeacherHead, 0.5, {
                                rotation: 10,
                                x: '+=2',
                                y: '+=2',
                                transformOrigin: '50% 50%',
                                ease: Power3.easeOut,
                                onComplete: function () {
                                    t.to(SVGElements.TeacherHead, 0.5, {
                                        rotation: 0,
                                        x: '-=2',
                                        y: '-=2',
                                        transformOrigin: '50% 50%',
                                        ease: Power3.easeOut
                                    });
                                }
                            });
                            t.staggerTo(SVGElements.StudentTopGroup, 0.5, {
                                y: '+=3',
                                ease: Power3.easeOut,
                                onComplete: function () {
                                    t.staggerTo(SVGElements.StudentTopGroup, 0.5, {
                                        y: '-=3',
                                        ease: Power3.easeOut
                                    }, 0);
                                }
                            }, 0);
                            t.staggerTo(SVGElements.StudentBottomGroup, 0.5, {
                                y: '+=3',
                                ease: Power3.easeOut,
                                onComplete: function () {
                                    t.staggerTo(SVGElements.StudentBottomGroup, 0.5, {
                                        y: '-=3',
                                        ease: Power3.easeOut
                                    }, 0);
                                }
                            }, 0);
                            t.to(SVGElements.TeacherHand, 0.5, {
                                rotation: -20,
                                transformOrigin: '0% 0%',
                                ease: Power3.easeOut,
                                onComplete: function () {
                                    if (++i >= n) {
                                        clearInterval(ClassRoomInterval);
                                        t.to(SVGElements.TeacherHand, 0.5, {
                                            rotation: 0,
                                            transformOrigin: '0% 0%',
                                            ease: Power3.easeOut,
                                            onComplete: function () {
                                                t.to(SVGElements.SmartClassAppIcon, 0.5, {
                                                    rotation: 0,
                                                    scale: 6,
                                                    transformOrigin: '50% 50%',
                                                    ease: Power3.easeOut,
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
                                            ease: Power3.easeOut
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
                    x: -5.35,
                    scaleX: 0.403,
                    scaleY: 0.384,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut
                });
                t.to(SVGElements.SmartClassAppBack, 1.5, {
                    fill: '#ffffff',
                    ease: Power4.easeOut
                });
                t.to(SVGElements.SmartClassAppIcon, 1.5, {
                    fill: '#333333',
                    ease: Power4.easeOut
                });
                t.to(SVGElements.SmartClassAppTitle, 1.5, {
                    fill: '#333333',
                    ease: Power4.easeOut
                });
                t.fromTo(SVGElements.Classroom, 1.5, {
                    y: -480,
                    display: 'block'
                }, {
                    y: 0,
                    ease: Power4.easeOut
                });
                t.fromTo(SVGElements.Projecter, 1.5, {
                    y: -100
                }, {
                    y: 0,
                    ease: Power4.easeOut,
                    delay: 0.25
                });
                SVGElements.ProjectorWires.each(function () {
                    Functions.PathAnimation(this, 1.5, Power3.easeInOut, true);
                });
                t.fromTo(SVGElements.BulbWireGroup, 1.5, {
                    y: -100
                }, {
                    y: 0,
                    ease: Power4.easeOut,
                    delay: 0.25
                });
                t.staggerFromTo([SVGElements.Teacher, SVGElements.DeskTopGroup, SVGElements.DeskBottomGroup, SVGElements.StudentTopGroup, SVGElements.StudentBottomGroup], 1.5, {
                    y: 100
                }, {
                    y: 0,
                    ease: Power4.easeOut,
                    delay: 0.25
                }, 0);
                setTimeout(function () {
                    Functions.ClassRoomAnimation(2, Functions.ClassRoomExitAnimation);
                }, 1000);
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
            SVGElements.PeopleGroup = $('#PeopleGroup', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.PeopleArray = SVGElements.PeopleGroup.find('g');
            SVGElements.Browser = $('#Browser', SVGRootObject);
            SVGElements.BrowserBack = $('#BrowserBack', SVGRootObject);
            SVGElements.BrowserAddress = $('#BrowserAddress', SVGRootObject);
            SVGElements.BrowserAddressText = SVGElements.BrowserAddress.find('tspan').html('');
            SVGElements.SmartClassApp = $('#SmartClassApp', SVGRootObject);
            SVGElements.SmartClassAppIcon = $('#SmartClassAppIcon', SVGRootObject);
            SVGElements.SmartClassAppIconHead = $('#SmartClassAppIconHead', SVGRootObject);
            SVGElements.SmartClassAppTitle = $('#SmartClassAppTitle', SVGRootObject);
            SVGElements.SmartClassAppBack = $('#SmartClassAppBack', SVGRootObject);
            SVGElements.SmartClassAppClickBack = $('#SmartClassAppClickBack', SVGRootObject).css('opacity', 0);
            SVGElements.Classroom = $('#Classroom', SVGRootObject);
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
            SVGElements.Projecter = $('#Projecter', SVGRootObject);
            SVGElements.ProjectorShadow = $('#ProjectorShadow', SVGRootObject).css('opacity', 0);
            SVGElements.ProjectorWires = $('#ProjectorWires path', SVGRootObject).css('opacity', 0);
            SVGElements.ProjectorLight = $('#ProjectorLight', SVGRootObject);
            SVGElements.ClassRoomWire = $('#ClassRoomWire', SVGRootObject);
            SVGElements.BulbWireGroup = $('#BulbWireGroup', SVGRootObject);
            SVGElements.Bulb = $('#Bulb', SVGRootObject);
            SVGElements.LightBubbleOne = $('#LightBubbleOne', SVGRootObject).css('opacity', 0);
            SVGElements.LightBubbleTwo = $('#LightBubbleTwo', SVGRootObject).css('opacity', 0);
            SVGElements.Blackout = $('#Blackout', SVGRootObject).css('opacity', 0);
            SVGElements.Sky = $('#Sky', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.SkyPaths = SVGElements.Sky.find('path');
            SVGElements.Clouds = $('.Clouds', SVGRootObject);
            SVGElements.PowerLine = $('#PowerLine', SVGRootObject).css({opacity: 0, display: 'block'});
            SVGElements.PowerLineElements = SVGElements.PowerLine.children();
            SVGElements.PowerGridGroup = $('#PowerGridGroup', SVGRootObject);
            SVGElements.WindmillGroup = $('#WindmillGroup', SVGRootObject);
            t.set(SVGElements.WindmillGroup, {
                y: 316,
                x: '+=1'
            });
            SVGElements.PowerLineWholeGroup = $('#PowerLineWholeGroup', SVGRootObject);
            SVGElements.PowerLineWire = $('#PowerLineWire', SVGRootObject).css('opacity', 0);
            SVGElements.WindmillFans = $('.Fans', SVGRootObject);
            Functions.Start();
        });
    });
})(window, document, jQuery(window), jQuery(document), jQuery, TweenMax);