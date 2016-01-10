(function (w, d, wO, dO, $, t) {
    var Width = w.innerWidth,
        Height = w.innerHeight,
        HalfWidth = Width / 2,
        HalfHeight = Height / 2,
        MainFrameObject,
        SVGObject,
        SVGRoot,
        SVGRootObject,
        SVGElements = {},
        XMLNS = 'http://www.w3.org/2000/svg',
        ElasticEasingIn = Elastic.easeIn.config(2, 1),
        ElasticEasingOut = Elastic.easeOut.config(2, 1),
        FacebookLinkObject,
        GAWDSLinkObject,
        Functions = {
            SetText: function (text, x, y, fS, wT, o, f) {
                if (x === undefined) x = 0;
                if (y === undefined) y = 0;
                if (f === undefined) f = 'Segoe UI';
                if (fS === undefined) fS = 20;
                if (wT === undefined) wT = 400;
                if (o === undefined) o = 1;
                t.killTweensOf(SVGElements.TextFrame);
                t.killTweensOf(SVGElements.TextFrame.find('text'));
                t.set(SVGElements.TextFrame, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    transformOrigin: '50% 50%'
                });
                SVGElements.TextFrame.find('text').remove();
                return Functions.AddText(text, x, y, fS, wT, o, f);
            },
            AddText: function (text, x, y, fS, wT, o, f) {
                if (f === undefined) f = 'Segoe UI';
                var Text = d.createElementNS(XMLNS, 'text'),
                    TextNode = d.createTextNode(text);
                Text.style.fontFamily = f;
                Text.style.fontSize = fS;
                Text.style.fontWeight = wT;
                Text.style.transform = 'translate(' + x + 'px,' + y + 'px)';
                Text.style.opacity = o;
                Text.appendChild(TextNode);
                SVGElements.TextFrame[0].appendChild(Text);
                return Functions;
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
                Functions.SetText('Remember waiting in unending queues...');
                t.fromTo(SVGElements.TextFrame, 2, {
                    opacity: 0,
                    x: 500,
                    y: 180
                }, {
                    opacity: 1,
                    x: 450,
                    ease: Power4.easeIn,
                    onComplete: function () {
                        t.to(SVGElements.TextFrame, 2, {
                            x: 400,
                            ease: Linear.easeNone,
                            onComplete: function () {
                                t.to(SVGElements.TextFrame, 1, {
                                    opacity: 0,
                                    x: 375,
                                    transformOrigin: '50% 50%',
                                    ease: Power4.easeOut
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
                Functions.SetText('To change the way young minds are moulded...');
                t.fromTo(SVGElements.TextFrame, 1, {
                    opacity: 0,
                    x: 230,
                    y: 125,
                    scale: 0.8,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeIn,
                    onComplete: function () {
                        t.to(SVGElements.TextFrame, 2.5, {
                            scale: 1.3,
                            transformOrigin: '50% 50%',
                            ease: Linear.easeNone,
                            onComplete: function () {
                                t.to(SVGElements.TextFrame, 1, {
                                    opacity: 0,
                                    y: 60,
                                    scale: 1.5,
                                    transformOrigin: '50% 50%',
                                    ease: Power4.easeOut
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
                                                                    scale: 10,
                                                                    transformOrigin: '50% 50%',
                                                                    ease: Linear.easeOut,
                                                                    onComplete: function () {
                                                                        t.to(SVGElements.SmartClassAppClickBack, 2, {
                                                                            opacity: 0,
                                                                            scale: 20,
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
                    y: 200
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
                        setTimeout(function () {
                            Functions.SetText('... and then things became smarter.');
                            t.fromTo(SVGElements.TextFrame, 2, {
                                opacity: 0,
                                x: 140,
                                y: 245,
                                scale: 1,
                                transformOrigin: '50% 50%'
                            }, {
                                opacity: 1,
                                x: 160,
                                ease: Power4.easeIn,
                                onComplete: function () {
                                    t.to(SVGElements.TextFrame, 1.5, {
                                        x: 190,
                                        ease: Linear.easeNone,
                                        onComplete: function () {
                                            t.to(SVGElements.TextFrame, 1, {
                                                opacity: 0,
                                                x: 210,
                                                ease: Power4.easeOut
                                            });
                                        }
                                    });
                                }
                            });
                        }, 150);
                        Functions.TextEnterAnimation('irctc.co.in', function () {
                            t.to(SVGElements.Website, 0.5, {
                                opacity: 1,
                                ease: Power3.easeOut
                            });
                            t.to(SVGElements.PeopleGroup, 0.5, {
                                x: '+=10',
                                y: '+=50',
                                scale: 0.8,
                                transformOrigin: '50% 50%',
                                ease: Power3.easeOut,
                                onComplete: function () {
                                    Functions.QueueExitAnimation(Functions.HandEnterAnimation);
                                }
                            });
                        });
                    }
                });
            },
            ShowDetails: function () {
                Functions.SetText('26 - 29 FEB \'16', 0, 0, 18, 400, 1);
                t.fromTo(SVGElements.TextFrame, 1, {
                    x: 303,
                    y: 265,
                    opacity: 0,
                    fill: '#ffffff'
                }, {
                    y: 280,
                    opacity: 1,
                    ease: Power4.easeOut
                });
                FacebookLinkObject.Show();
                GAWDSLinkObject.Show();
                t.to($('#FacebookShareButton'), 1, {
                    opacity: 1,
                    ease: Power4.easeOut
                });
            },
            End: function () {
                t.to(SVGElements.PathToHome, 1, {
                    opacity: 0,
                    ease: Power3.easeOut,
                    onComplete: function () {
                        setTimeout(function () {
                            Functions.SetText('NIT Kurukshetra', 0, 0, 44, 700, 0).AddText('Haryana, IN', 0, 30, 30, 600, 0);
                            SVGElements.TextFrame.appendTo(SVGRootObject);
                            t.set(SVGElements.TextFrame, {
                                opacity: 1,
                                x: 455,
                                y: 305,
                                fill: '#263238'
                            });
                            t.staggerFromTo(SVGElements.TextFrame.find('text'), 1, {
                                attr: {
                                    y: 30
                                }
                            }, {
                                attr: {
                                    y: 0
                                },
                                opacity: 1,
                                ease: ElasticEasingOut
                            }, 0.15);
                        }, 1750);
                        t.to(SVGElements.India, 3, {
                            x: '+=590',
                            y: '+=1300',
                            scale: 10,
                            transformOrigin: '50% 50%',
                            ease: ElasticEasingOut,
                            onComplete: function () {
                                t.staggerTo(SVGElements.TextFrame.find('text'), 1, {
                                    attr: {
                                        y: 30
                                    },
                                    opacity: 0,
                                    ease: ElasticEasingIn
                                }, -0.15);
                                t.to(SVGElements.TextFrame, 1, {
                                    scale: 0.7,
                                    transformOrigin: '0% 100%',
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
                                    onComplete: function () {
                                        t.fromTo(SVGElements.Techspardha, 4, {
                                            opacity: 0,
                                            scale: 0.7,
                                            transformOrigin: '50% 50%'
                                        }, {
                                            opacity: 1,
                                            scale: 1,
                                            transformOrigin: '50% 50%',
                                            ease: Power3.easeOut,
                                            onComplete: function () {
                                                //Functions.PathAnimation(SVGElements.ForeGround, 2, Power3.easeOut, false);
                                            }
                                        });
                                        t.staggerFromTo(SVGElements.TechspardhaChildren, 1, {
                                            scale: 0.7,
                                            transformOrigin: '50% 50%'
                                        }, {
                                            scale: 1,
                                            transformOrigin: '50% 50%',
                                            ease: Power4.easeOut
                                        }, 0.15);
                                        Functions.PathAnimation(SVGElements.BackGround, 20, Power4.easeOut, false, 1, 500, 1);
                                        Functions.PathAnimation(SVGElements.ForeGround, 20, Power4.easeOut, false, 1, 500, 1.15);
                                        t.to(SVGElements.TechspardhaText, 0.15, {
                                            fill: '#8bc34a',
                                            delay: 4,
                                            ease: Power4.easeOut,
                                            onComplete: function () {
                                                t.to(SVGElements.TechspardhaText, 0.075, {
                                                    fill: '#444444',
                                                    ease: Power4.easeOut,
                                                    onComplete: function () {
                                                        t.to(SVGElements.TechspardhaText, 0.075, {
                                                            fill: '#8bc34a',
                                                            ease: Power4.easeOut,
                                                            onComplete: function () {
                                                                t.to(SVGElements.TechspardhaText, 0.075, {
                                                                    fill: '#444444',
                                                                    ease: Power4.easeOut,
                                                                    onComplete: function () {
                                                                        t.to(SVGElements.TechspardhaText, 0.5, {
                                                                            fill: '#8bc34a',
                                                                            delay: 0.2,
                                                                            ease: Power4.easeOut,
                                                                            onComplete: function () {
                                                                                t.fromTo(SVGElements.SmartIndiaText, 1, {
                                                                                    attr: {y: '-=15'},
                                                                                    opacity: 0
                                                                                }, {
                                                                                    attr: {y: '+=15'},
                                                                                    opacity: 1,
                                                                                    ease: Power4.easeOut
                                                                                });
                                                                                Functions.ShowDetails();
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
                            }
                        });
                    }
                });
            },
            IndiaPathToHomeEnterAnimation: function () {
                SVGElements.PathToHome.each(function () {
                    Functions.PathAnimation(this, 3, Power3.easeOut, false, 1);
                });
                t.to(SVGElements.Ways, 1, {
                    opacity: 0,
                    ease: Power3.easeOut
                });
                setTimeout(Functions.End, 3000);
            },
            IndiaHomeMarkerEnterAnimation: function () {
                t.staggerFromTo(SVGElements.TextFrame.find('text'), 1, {
                    attr: {
                        y: 0
                    }
                }, {
                    attr: {
                        y: 50
                    },
                    opacity: 0,
                    ease: ElasticEasingIn
                }, -0.15, function () {
                    SVGElements.TextFrame.appendTo(SVGElements.India);
                    Functions.SetText('This', 0, 0, 24, 400, 0).AddText('FEBRUARY', 50, 0, 32, 900, 0).AddText('explore smart India at', 0, 24, 24, 200, 0);
                    t.set(SVGElements.TextFrame, {
                        x: 50,
                        y: 120,
                        opacity: 1
                    });
                    t.staggerFromTo(SVGElements.TextFrame.find('text'), 1, {
                        attr: {
                            y: 30
                        }
                    }, {
                        attr: {
                            y: 0
                        },
                        opacity: 1,
                        ease: ElasticEasingOut
                    }, 0.15);
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
                    Functions.PathAnimation(this, 3, Power3.easeOut, false, 1);
                });
                setTimeout(function () {
                    SVGElements.WaysOverlay.each(function () {
                        Functions.PathAnimation(this, 3, Power3.easeOut, false, 10);
                        t.to(this, 0.5, {
                            opacity: 0,
                            delay: 0.5,
                            ease: Power3.easeOut
                        });
                    });
                    setTimeout(function () {
                        SVGElements.WaysOverlay.each(function () {
                            Functions.PathAnimation(this, 3, Power3.easeOut, false, 10);
                            t.to(this, 0.5, {
                                opacity: 0,
                                delay: 0.5,
                                ease: Power3.easeOut
                            });
                        });
                        setTimeout(Functions.IndiaHomeMarkerEnterAnimation, 1000);
                    }, 1000);
                }, 2000);
            },
            IndiaEnterAnimation: function () {
                setTimeout(function () {
                    Functions.SetText('Building a connected nation', 0, 0, 24, 600, 1)
                        .AddText('UNITING INDIA', 60, 32, 32, 900, 0);
                    t.fromTo(SVGElements.TextFrame, 1, {
                        x: 500,
                        y: 335,
                        opacity: 0
                    }, {
                        y: 360,
                        opacity: 1,
                        ease: ElasticEasingOut
                    });
                    t.fromTo(SVGElements.TextFrame.find('text:last-child'), 1, {
                        attr: {
                            y: -30
                        },
                        opacity: 0
                    }, {
                        attr: {
                            y: 0
                        },
                        opacity: 1,
                        delay: 1.5,
                        ease: ElasticEasingOut
                    });
                }, 1500);
                t.fromTo(SVGElements.India, 1.5, {
                    opacity: 1,
                    y: -550
                }, {
                    y: 0,
                    ease: Power3.easeOut,
                    onComplete: function () {
                        Functions.IndiaWaysEnterAnimation();
                    }
                });
            },
            WindmillExitAnimation: function () {
                Functions.IndiaEnterAnimation();
                t.to(SVGElements.Sky, 2, {
                    opacity: 0,
                    ease: Power3.easeOut
                });
                t.to(SVGElements.PowerLine, 2, {
                    opacity: 0,
                    ease: Power3.easeOut
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
                setTimeout(function () {
                    Functions.SetText('Power Up!', 0, 0, 44, 700, 1, 'Rockwell');
                    t.fromTo(SVGElements.TextFrame, 1, {
                        fill: '#ffffff',
                        opacity: 0,
                        x: 540,
                        y: 340,
                        rotation: 5,
                        scale: 0.8,
                        transformOrigin: '50% 50%'
                    }, {
                        opacity: 1,
                        y: 313,
                        scale: 1,
                        transformOrigin: '50% 50%',
                        ease: Elastic.easeOut.config(3, 1),
                        onComplete: function () {
                            t.to(SVGElements.TextFrame, 0.5, {
                                opacity: 0,
                                scale: 0.8,
                                transformOrigin: '50% 50%',
                                ease: ElasticEasingIn,
                                onComplete: function () {
                                    Functions.SetText('Our energy sources are', -5, 5, 20, 400, 0)
                                        .AddText('a bit more', 45, 50, 20, 400, 0).AddText('renewable', 20, 90, 32, 600, 0);
                                    t.set(SVGElements.TextFrame, {
                                        fill: '#ffffff',
                                        opacity: 1,
                                        x: 326,
                                        y: 335,
                                        rotation: 0,
                                        scale: 1,
                                        transformOrigin: '50% 50%'
                                    });
                                    var TextArray = SVGElements.TextFrame.find('text');
                                    t.fromTo(TextArray[0], 1, {
                                        attr: {
                                            x: '-30'
                                        },
                                        opacity: 0
                                    }, {
                                        attr: {
                                            x: 0
                                        },
                                        opacity: 1,
                                        ease: ElasticEasingOut
                                    });
                                    t.fromTo(TextArray[1], 1, {
                                        attr: {
                                            x: '30'
                                        },
                                        fill: '#252525',
                                        opacity: 0
                                    }, {
                                        attr: {
                                            x: 0
                                        },
                                        opacity: 1,
                                        delay: 0.75,
                                        ease: ElasticEasingOut
                                    });
                                    t.fromTo(TextArray[2], 1, {
                                        attr: {
                                            y: '30'
                                        },
                                        fill: '#252525',
                                        opacity: 0
                                    }, {
                                        attr: {
                                            y: 0
                                        },
                                        opacity: 1,
                                        delay: 1.5,
                                        ease: ElasticEasingOut
                                    });
                                    t.staggerTo(TextArray, 1, {
                                        attr: {
                                            y: 50
                                        },
                                        opacity: 0,
                                        delay: 2.5,
                                        ease: ElasticEasingIn
                                    }, 0.15);
                                }
                            });
                        }
                    });
                }, 3000);
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
                        ease: Power3.easeOut
                    });
                    t.staggerFromTo(SVGElements.PowerLineElements, 1, {
                        y: 200
                    }, {
                        y: 0,
                        ease: ElasticEasingOut
                    }, 0.1, function () {
                        Functions.SetText('To', 740, 0, 20, 400, 0).AddText('change', 559, 0, 20, 400, 0)
                            .AddText('the', 430, 0, 20, 400, 0).AddText('way we', 270, 0, 20, 400, 0);
                        t.set(SVGElements.TextFrame, {
                            fill: '#ffffff',
                            opacity: 1,
                            x: 1,
                            y: 270
                        });
                        t.staggerFromTo(SVGElements.TextFrame.find('text'), 1, {
                            opacity: 0,
                            attr: {y: 30}
                        }, {
                            opacity: 1,
                            attr: {y: 0},
                            delay: 0.5,
                            ease: ElasticEasingOut
                        }, 0.75);
                        t.staggerTo(SVGElements.TextFrame.find('text'), 0.5, {
                            opacity: 0,
                            delay: 2.85
                        }, 0.1);
                        Functions.CloudsAnimation();
                        Functions.PathAnimation(SVGElements.PowerLineWire[0], 7, Linear.easeNone, false, 1);
                        setTimeout(Functions.WindmillEnterAnimation, 2500);
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
                                    t.to(SVGElements.TextFrame, 1, {
                                        opacity: 0,
                                        delay: 1,
                                        ease: Power4.easeOut
                                    });
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
                Functions.SetText('Education', 0, 0, 24, 400, 0).AddText('is now', 20, 25, 18, 200, 0)
                    .AddText('possible in the', 25, 50, 20, 200, 0).AddText('remotest village.', 35, 80, 26, 600, 0);
                t.fromTo(SVGElements.TextFrame, 1, {
                    fill: '#363636',
                    opacity: 0,
                    x: 306,
                    y: 130,
                    scale: 1,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    ease: Power4.easeOut,
                    onComplete: function () {
                        t.staggerFromTo(SVGElements.TextFrame.find('text'), 1, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power4.easeOut
                        }, 0.5);
                    }
                });
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
                            //t.to(SVGElements.SmartClassAppBack, 0.5, {
                            //    fill: '#FFECB3',
                            //    ease: Power3.easeOut,
                            //    onComplete: function () {
                            //        t.to(SVGElements.SmartClassAppBack, 0.5, {
                            //            fill: '#FFF9C4',
                            //            ease: Power3.easeOut
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
                            //    ease: Power3.easeOut,
                            //    onComplete: function () {
                            //        t.to(SVGElements.SmartClassAppIconHead, 0.5, {
                            //            y: '+=1',
                            //            ease: Power3.easeOut
                            //        });
                            //    }
                            //});
                            //t.to(SVGElements.TeacherHead, 0.5, {
                            //    rotation: 10,
                            //    x: '+=2',
                            //    y: '+=2',
                            //    transformOrigin: '50% 50%',
                            //    ease: Power3.easeOut,
                            //    onComplete: function () {
                            //        t.to(SVGElements.TeacherHead, 0.5, {
                            //            rotation: 0,
                            //            x: '-=2',
                            //            y: '-=2',
                            //            transformOrigin: '50% 50%',
                            //            ease: Power3.easeOut
                            //        });
                            //    }
                            //});
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
                    ease: Power4.easeOut,
                    onComplete: function () {
                        t.to(SVGElements.SmartClassApp, 0.5, {
                            opacity: 0,
                            ease: Power4.easeOut
                        });
                    }
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
                t.fromTo(SVGElements.ClassRoom, 1.5, {
                    y: -480,
                    opacity: 1
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
                    Functions.PathAnimation(this, 1.5, Power3.easeInOut, true, 1);
                });
                t.fromTo(SVGElements.BulbWireGroup, 1.5, {
                    y: -100
                }, {
                    y: 0,
                    ease: Power4.easeOut,
                    delay: 0.25
                });
                t.staggerFromTo(SVGElements.ClassRoomStudentDeskArray, 1.5, {
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
                Easing: Power4.easeOut,
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
            CallBack = Options.CallBack;
        var Functions = {
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
                TweenMax.to(Element, HalfDuration, {
                    opacity: 0,
                    scale: 0.5,
                    transformOrigin: '50% 50%',
                    ease: Easing,
                    onComplete: function () {
                        Element.css('z-index', '-99');
                    }
                });
            },
            Show: function () {
                Element.css('z-index', '99');
                TweenMax.to(Element, Duration, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: '50% 50%',
                    ease: Easing
                });
            }
        };
        Element.on('load', function () {
            RootObject = $(Element[0].contentDocument.documentElement)
                .on(CallBackBind, CallBack)
                .on('mouseover', function () {
                    TweenMax.to(Base, Duration, {
                        scale: 1,
                        transformOrigin: '50% 50%',
                        fill: '#8bc34a',
                        ease: Easing
                    });
                })
                .on('mouseout', function () {
                    TweenMax.to(Base, Duration, {
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
            TweenMax.set(Base, {
                scale: 0.75,
                transformOrigin: '50% 50%'
            });
            TweenMax.set(Element, {
                opacity: 0,
                scale: 0.5,
                transformOrigin: '50% 50%'
            });
        });
        return Functions;
    };

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
        FacebookLinkObject.Position(Width, Height, HalfWidth, HalfHeight);
        GAWDSLinkObject.Position(Width, Height, HalfWidth, HalfHeight);
    }

    dO.on('ready', function () {
        //if (w.orientation !== undefined) {
        //    MainFrameObject = $('#MainFrame', d)[0];
        //    w.addEventListener('orientationchange', function () {
        //        // Problem...
        //    });
        //}
        SVGObject = $('#SVG', d).on('load', function () {
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
            t.set(SVGElements.WindmillGroup, {
                y: 316,
                x: '+=1'
            });
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
            SVGElements.SmartIndiaText = $('#SmartIndiaText', SVGRootObject).css({opacity: 0});
            SVGElements.TextFrame = $('#TextFrame', SVGRootObject).css({opacity: 0, display: 'block'});
            setTimeout(Functions.Start, 500);
        });
        FacebookLinkObject = $('#FacebookLink').Link({
            X: 'left',
            Y: 'bottom',
            OffsetX: 24,
            OffsetY: -24,
            CallBackBind: 'click',
            CallBack: function () {
                w.open('http://www.facebook.com/gawdsnitkkr?fref=photo');
            }
        }).Position(Width, Height, HalfWidth, HalfHeight);
        GAWDSLinkObject = $('#GAWDSLink').Link({
            X: 'right',
            Y: 'bottom',
            OffsetX: -96,
            OffsetY: -24,
            CallBackBind: 'click',
            CallBack: function () {
                w.open('http://www.gawds.in');
            }
        }).Position(Width, Height, HalfWidth, HalfHeight);
        PerformResize();
    });
    wO.on('resize', PerformResize);
})(window, document, jQuery(window), jQuery(document), jQuery, TweenMax);