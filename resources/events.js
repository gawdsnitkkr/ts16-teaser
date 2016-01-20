(function (w, wO, d, dO, $, t) {
    var Categories = ['Managerial', 'Quizzes', 'Fun Zone', 'Online Events', 'Paper Events', 'Technopolis', 'Design', 'Brain Storming', 'Future Builder'],
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
        Objects = {},
        Width = w.innerWidth,
        Height = w.innerHeight,
        HalfWidth = Width / 2,
        HalfHeight = Height / 2,
        CategoriesFrameLeft = 275,
        CategoriesFrameTop = HalfHeight - 150,
        MenuWidth = 230,
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
                                } else if (EventsOpen[Category] && !EventsClosing[Category]) {
                                    Functions.EventsCloseAnimation(Category);
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
                            if (EventsOpen[CurrentCategory] && !EventOpened && !EventOpening) {
                                if (e.deltaY > 0) Functions.EventsLeft();
                                else if (e.deltaY < 0) Functions.EventsRight();
                            }
                        });
                    Objects.EventsFrames.push(EventsFrame);
                    EventsObjectArray = [];
                    for (; j < m; j++) {
                        SmallDescription = DescriptionsArray[j].replace(/<(?:.|\n)*?>/gm, '');
                        EventsObjectArray.push($('<div id="Events-' + Category + '-' + EventsArray[j].replace(' ', '+') + '" class="Event" data-category="' + i + '"  data-event="' + j + '">' +
                            '<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>' +
                            '<td class="Head"><span>' + EventsArray[j] + '</span><a class="CloseEvent" href="#CloseEvent"></a></td></tr><tr>' +
                            '<td class="Content"><div class="SmallDescription">' + (SmallDescription.length > 200 ? SmallDescription.substring(0, 200) + '...' : SmallDescription) + '</div><div class="DetailedContent">' +
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
                                        ease: Power4.easeOut
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
                                        ease: Power4.easeOut
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
                return Functions;
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
                    ease: Power4.easeOut
                });
                t.to(Head, 1, {
                    backgroundColor: '#18181b',
                    paddingTop: 10,
                    paddingBottom: 15,
                    y: 20,
                    ease: Power2.easeOut
                });
                t.to(Content, 1, {
                    y: 10,
                    ease: Power2.easeOut
                });
                SmallDescription.css({
                    opacity: 0,
                    display: 'none'
                });
                t.to(Header, 1, {
                    marginLeft: (EventWidth - Header.width()) / 2,
                    ease: Power2.easeOut
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
                    ease: Power4.easeOut
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
                    ease: Power4.easeOut,
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
                    ease: Power4.easeOut
                });
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
                    ease: Power4.easeOut
                });
                t.to(CloseEvent, 0.5, {
                    opacity: 0,
                    scale: 0.5,
                    transformOrigin: '50% 50%',
                    ease: Power4.easeOut,
                    onComplete: function () {
                        this.target.css({
                            display: 'none'
                        });
                    }
                });
                t.to(DetailedContent, 0.5, {
                    opacity: 0,
                    y: 50,
                    ease: Power4.easeOut,
                    onComplete: function () {
                        DetailedContent.css({
                            display: 'none'
                        });
                        t.to(eventObject, 0.5, {
                            width: 250,
                            height: 250,
                            y: 0,
                            backgroundColor: '#274f17',
                            ease: Power4.easeOut,
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
                                    ease: Power4.easeOut,
                                    onComplete: function () {
                                        EventOpened = false;
                                        EventOpening = false;
                                        EventClosing = false;
                                    }
                                });
                            }
                        });
                        t.to(Head, 0.5, {
                            backgroundColor: '#274f17',
                            paddingTop: 0,
                            paddingBottom: 0,
                            y: 0,
                            ease: Power4.easeOut
                        });
                        t.to(Content, 0.5, {
                            y: 0,
                            ease: Power4.easeOut
                        });
                    }
                });
                t.to(ContactDetail, 0.5, {
                    opacity: 0,
                    y: 50,
                    ease: Power4.easeOut,
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
                } else {
                    t.to(Objects.Categories[category].find('span'), 1, {
                        x: 0,
                        ease: Power4.easeOut
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
                    ease: Power4.easeOut,
                    onComplete: callback
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
            Start: function () {
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
                t.staggerFromTo(Objects.MenuFrameChildren, 1, {
                    opacity: 0,
                    x: -100
                }, {
                    opacity: 1,
                    x: 0,
                    ease: Power4.easeOut
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
                    ease: Power4.easeOut
                }, 0.1);
                Functions.PathAnimation(Objects.LogoPath[0], 4, Power4.easeOut, false, 1, 100);
                t.to(Objects.LogoBase, 1.5, {
                    fill: '#8bc34a',
                    stroke: '#0c0c0e',
                    delay: 2,
                    ease: Power4.easeOut
                });
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
            GetData: function (callback) {
                var i = 0,
                    cL = Categories.length,
                    SuccessCount = 0,
                    Error = false;
                for (; i < cL; i++) {
                    $.get({
                        url: 'http://techspardha.org:8081/events/category/' + Categories[i],
                        success: function (data) {
                            if (data.length) {
                                var j = 0,
                                    l = data.length,
                                    category = Functions.GetCategoryIndex(data[0].category),
                                    event;
                                for (; j < l; j++) {
                                    event = data[j];
                                    Events[category][j] = event.nameOfEvent;
                                    Descriptions[category][j] = event.description.replace(/<(?!\/?[pa](?=>|\s.*>))\/?.*?>/g, '').replace('&nbsp;', '');
                                    Rules[category][j] = event.rules.replace(/<(?!\/?[pa](?=>|\s.*>))\/?.*?>/g, '').replace('&nbsp;', '');
                                    Venue[category][j] = event.venue;
                                    Coordinator[category][j] = [event.coordinator_1, event.coordinator_2];
                                    PhoneNumber[category][j] = [event.phoneno_1, event.phoneno_2];
                                    DateOfEvent[category][j] = event.dateOfEvent;
                                    TimeOfEvent[category][j] = event.timeOfEvent;
                                }
                            }
                            if ((++SuccessCount === cL) && callback) callback();
                        },
                        error: function () {
                            if (!Error) {
                                Error = true;
                                alert('Oops! Something went terribly wrong. Please press Ctrl + F5 to retry.');
                            }
                        }
                    });
                }
            }
        };
    dO.on('ready', function () {
            Objects.CategoryFrame = $('#CategoryFrame', d);
            Objects.MenuFrame = $('#MenuFrame', d);
            Objects.MenuFrameChildren = Objects.MenuFrame.children();
            Objects.MenuLinks = Objects.MenuFrame.find('.MenuLinks').on('mouseover', function () {
                var This = $(this);
                t.to(This.find('span'), 0.5, {
                    marginLeft: 10,
                    color: '#9dcc66',
                    ease: Power4.easeOut
                });
            }).on('mouseout', function () {
                var This = $(this);
                t.to(This.find('span'), 0.5, {
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
            Functions.GetData(function () {
                //console.log(Rules);
                w.LoadingDone = true;
                w.LoadingCallBack = Functions.Start;
            });
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
    wO.on('keydown', function (e) {
            switch (e.keyCode) {
                case 13: // Enter
                    if (!EventsOpen[CurrentCategory] && !EventsOpening[CurrentCategory] && !EventOpened && !EventOpening) {
                        Functions.EventsEnterAnimation(CurrentCategory);
                    }
                    else if (EventsOpen[CurrentCategory] && !EventsClosing[CurrentCategory] && !EventOpened && !EventOpening) Functions.EventOpenAnimation(Objects.Events[CurrentCategory][CurrentEvent]);
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
        })
        .on('mousewheel', function (e) {
            if (CategoriesOpen && !EventsMouseOver && !EventOpened && !EventOpening) {
                if (e.deltaY > 0) Functions.CategoryUp();
                else if (e.deltaY < 0) Functions.CategoryDown();
            }
        });
})(window, jQuery(window), document, jQuery(document), jQuery, TweenMax);