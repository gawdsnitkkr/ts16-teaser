(function (w, wO, d, dO, $, t) {
    var Categories = ['Managerial', 'Quizzes', 'FunZone', 'Online Events', 'Paper Events', 'Technopolis', 'Design', 'Brain Storming', 'Future Builder'],
        Events = [
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five', 'Event Six', 'Event Seven', 'Event Eight', 'Event Nine', 'Event Ten', 'Event Eleven', 'Event Twelve', 'Event Thirteen', 'Event Fourteen'],
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five'],
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five'],
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five'],
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five'],
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five'],
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five'],
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five'],
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five']
        ],
        Descriptions = [
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five', 'Description Six', 'Description Seven', 'Description Eight', 'Description Nine', 'Description Ten', 'Description Eleven', 'Description Twelve', 'Description Thirteen', 'Description Fourteen'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five']
        ],
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
        Objects = {},
        Width = w.innerWidth,
        Height = w.innerHeight,
        HalfWidth = Width / 2,
        HalfHeight = Height / 2,
        CategoriesFrameLeft = 275,
        CategoriesFrameTop = HalfHeight - 150,
        Functions = {
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
            LoadCategories: function () {
                // Generate Categories Array By Server...
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
                                var Category = parseInt($(this).attr('data-category'), 10);
                                if (Category != CurrentCategory) {
                                    PreviousCategory = CurrentCategory;
                                    CurrentCategory = Category;
                                    Functions.EventsCloseAnimation(PreviousCategory, function () {
                                        Functions.CategoriesChangeAnimation();
                                        Functions.EventsEnterAnimation(Category);
                                    });
                                } else if (!EventsOpen[Category] && !EventsOpening[Category]) {
                                    Functions.EventsEnterAnimation(Category);
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
                                        ease: Power4.easeOut
                                    });
                                }
                                if (!EventsOpen[Category] && !EventsOpening[Category]) {
                                    t.to(This.find('span'), 1, {
                                        x: 25,
                                        ease: Power4.easeOut
                                    });
                                } else {
                                    t.to(This.find('span'), 1, {
                                        x: 0,
                                        ease: Power4.easeOut
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
                                        ease: Power4.easeOut
                                    });
                                }
                                t.to(This.find('span'), 1, {
                                    x: 0,
                                    ease: Power4.easeOut
                                });
                            }
                        }));
                    CategoriesTop.push(Objects.Categories[i].position().top);
                }
                return Functions;
            },
            LoadEvents: function () {
                // Generate Events Array By Server...
                var l = Categories.length,
                    i = 0,
                    m,
                    j,
                    EventsArray,
                    EventsFrame,
                    EventsObjectArray,
                    DescriptionsArray,
                    Category;
                Objects.Events = [];
                Objects.EventsFrames = [];
                for (; i < l; i++) {
                    Category = Categories[i].replace(' ', '+');
                    EventsArray = Events[i];
                    DescriptionsArray = Descriptions[i];
                    m = EventsArray.length;
                    j = 0;
                    EventsFrame = $('<div id="Events-' + Category + '" class="EventsFrame"></div>').insertAfter(Objects.Categories[i])
                        .css({
                            width: 260 * m + w.innerWidth,
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
                            if (EventsOpen[CurrentCategory]) {
                                if (e.deltaY > 0) Functions.EventsLeft();
                                else if (e.deltaY < 0) Functions.EventsRight();
                            }
                        });
                    Objects.EventsFrames.push(EventsFrame);
                    EventsObjectArray = [];
                    for (; j < m; j++) EventsObjectArray.push($('<div id="Events-' + Category + '-' + EventsArray[j].replace(' ', '+') + '" class="Event" data-category="' + i + '"  data-event="' + j + '"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="Head">' + EventsArray[j] + '</td></tr><tr><td class="Description">' + DescriptionsArray[j] + '</td></tr></tbody></table></div>')
                        .appendTo(EventsFrame)
                        .on('click', function () {
                            var This = $(this),
                                Opacity = parseFloat(This.attr('data-opacity')),
                                Category = parseInt(This.attr('data-category'), 10),
                                Event = parseInt(This.attr('data-event'), 10);
                            if (EventsOpen[Category] && Opacity > 0) {
                                if (Event !== CurrentEvent) {
                                    CurrentEvent = Event;
                                    Functions.EventsChangeAnimation();
                                }
                            }
                        })
                        .on('mouseover', function () {
                            var This = $(this),
                                Opacity = parseFloat(This.attr('data-opacity')),
                                Category = parseInt(This.attr('data-category'), 10);
                            if (EventsOpen[Category] && Opacity > 0) {
                                t.to(This, 1, {
                                    opacity: 1,
                                    scale: 1,
                                    transformOrigin: '50% 50%',
                                    ease: Power4.easeOut
                                });
                            }
                        })
                        .on('mouseout', function () {
                            var This = $(this),
                                Opacity = parseFloat(This.attr('data-opacity')),
                                Category = parseInt(This.attr('data-category'), 10),
                                Event = parseInt(This.attr('data-event'), 10);
                            if (EventsOpen[Category] && Opacity > 0) {
                                t.to(This, 1, {
                                    opacity: Event === CurrentEvent ? 1 : Opacity,
                                    scale: Event === CurrentEvent ? 1 : 0.9,
                                    transformOrigin: '50% 50%',
                                    ease: Power4.easeOut
                                });
                            }
                        }));
                    Objects.Events.push(EventsObjectArray);
                    EventsOpen.push(false);
                    EventsOpening.push(false);
                    EventsClosing.push(false);
                    EventsChanging.push(false);
                }
                return Functions;
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
                    o;
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
                            ease: Power4.easeOut,
                            onComplete: i === 1 ? function () {
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
                            ease: Power4.easeOut
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
                    ease: Power4.easeOut
                });
                t.to(Objects.Categories[category].find('span'), 1, {
                    x: 0,
                    y: -10,
                    scale: 1.2,
                    transformOrigin: '0% 0%',
                    ease: Power4.easeOut
                });
            },
            EventsChangeAnimation: function (category) {
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
                        ease: Power4.easeOut,
                        onComplete: (i + 1) === l ? function () {
                            EventsChanging[category] = false;
                        } : undefined
                    });
                    t.to(EventsObjectArray[i], 1, {
                        scale: i === CurrentEvent ? 1 : 0.9,
                        transformOrigin: '50% 50%',
                        ease: Power4.easeOut
                    });
                }
                t.to(EventsFrame, 1, {
                    left: -EventsObjectArray[CurrentEvent].position().left,
                    ease: Power4.easeOut
                });
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
                    ease: Power4.easeOut,
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
                    ease: Power4.easeOut
                }, 0);
                t.to(Objects.Categories[category].find('span'), 1, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    transformOrigin: '0% 0%',
                    ease: Power4.easeOut
                });
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
                        ease: Power4.easeOut,
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
                    o;
                for (; i < l; i++) {
                    o = i - CurrentCategory;
                    if (o > 0) o *= -1;
                    o = 1 + o * 0.15;
                    if (o < 0) o = 0;
                    CategoriesObjectArray[i].attr('data-opacity', o);
                    t.to(CategoriesObjectArray[i], 1, {
                        opacity: o,
                        x: 0,
                        scale: (i === CurrentCategory) ? 1.1 : 0.8,
                        transformOrigin: '0% 50%',
                        ease: Power4.easeOut,
                        onComplete: (i + 1) === l ? function () {
                            CategoriesChanging = false;
                        } : undefined
                    });
                }
                t.to(Objects.CategoryFrame, 1, {
                    top: CategoriesFrameTop - CategoriesTop[CurrentCategory],
                    ease: Power4.easeOut
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
            MenuEnterAnimation: function () {
                t.to(Objects.Menu, 1, {
                    opacity: 0,
                    scale: 0.7,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut
                });
                t.to(Objects.CategoryFrame, 1, {
                    opacity: 0.7,
                    scale: 0.9,
                    x: CategoriesFrameLeft / 2,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut
                });
                if (!ScrolledDownOnce) Objects.ScrollDownHelper.Hide();
            }
        };
    dO.on('ready', function () {
        w.LoadingDone = true;
        Objects.CategoryFrame = $('#CategoryFrame', d);
        Objects.MenuFrame = $('#MenuFrame', d);
        Objects.Logo = $('#Logo', d).on('load', function () {
            Objects.LogoBase = $(this.contentDocument.documentElement).find('#Base');
            Objects.LogoPath = Objects.LogoBase.find('path');
        });
        setTimeout(function () {
            Functions.LoadCategories()
                .LoadEvents()
                .CategoriesEnterAnimation();
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
                ease: Power4.easeOut
            });
            Functions.PathAnimation(Objects.LogoPath[0], 4, Power4.easeOut, false, 1, 100);
            t.to(Objects.LogoBase, 1.5, {
                fill: '#8bc34a',
                stroke: '#0c0c0e',
                delay: 2,
                ease: Power4.easeOut
            });
        }, 2000);
    });
    wO.on('keydown', function (e) {
            switch (e.keyCode) {
                case 13: // Enter
                    if (!EventsOpen[CurrentCategory] && !EventsOpening[CurrentCategory]) {
                        Functions.EventsEnterAnimation(CurrentCategory);
                        Objects.ScrollDownHelper.Hide();
                    }
                    else if (EventsOpen[CurrentCategory] && !EventsClosing[CurrentCategory]) Functions.EventsCloseAnimation(CurrentCategory);
                    break;
                case 37: // Left
                    if (CategoriesOpen && EventsOpen[CurrentCategory]) Functions.EventsLeft();
                    break;
                case 38: // Up
                    if (CategoriesOpen) Functions.CategoryUp();
                    break;
                case 39: // Right
                    if (CategoriesOpen && EventsOpen[CurrentCategory]) Functions.EventsRight();
                    break;
                case 40: // Down
                    if (CategoriesOpen) Functions.CategoryDown();
                    break;
            }
        })
        .on('mousewheel', function (e) {
            if (CategoriesOpen && !EventsMouseOver) {
                if (e.deltaY > 0) Functions.CategoryUp();
                else if (e.deltaY < 0) Functions.CategoryDown();
            }
        });
})(window, jQuery(window), document, jQuery(document), jQuery, TweenMax);