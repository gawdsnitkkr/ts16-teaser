(function (w, wO, d, dO, $, t) {
    var Categories = ['Managerial', 'Quizzes', 'FunZone', 'Online Events', 'Paper Events', 'Technopolis', 'Design', 'Brain Storming', 'Future Builder'],
        Events = [
            ['Event One', 'Event Two', 'Event Three', 'Event Four', 'Event Five'],
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
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five'],
            ['Description One', 'Description Two', 'Description Three', 'Description Four', 'Description Five']
        ],
        CurrentCategory = 0,
        PreviousCategory = 0,
        CurrentEvent = 0,
        CategoriesOpen = false,
        EventsOpen = false,
        EventsClosing = false,
        Objects = {},
        MenuLeft = 50,
        Functions = {
            LoadCategories: function () {
                // Generate Categories Array By Server...
                var l = Categories.length,
                    i = 0,
                    CategoryFrame = Objects.CategoryFrame;
                Objects.Categories = [];
                for (; i < l; i++) Objects.Categories.push($('<div id="' + Categories[i] + '" class="Category" data-category="' + i + '">' + Categories[i] + '</div>').appendTo(CategoryFrame));
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
                    EventsFrame = $('<div id="Events-' + Category + '" class="EventsFrame"></div>').insertAfter(Objects.Categories[i]).css({
                        width: 260 * m,
                        height: 0,
                        opacity: 0,
                        marginTop: 0
                    });
                    Objects.EventsFrames.push(EventsFrame);
                    EventsObjectArray = [];
                    for (; j < m; j++) EventsObjectArray.push($('<div id="Events-' + Category + '-' + EventsArray[j].replace(' ', '+') + '" class="Event" data-category="' + i + '"  data-event="' + j + '"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="Head">' + EventsArray[j] + '</td></tr><tr><td class="Description">' + DescriptionsArray[j] + '</td></tr></tbody></table></div>').appendTo(EventsFrame));
                    Objects.Events.push(EventsObjectArray);
                }
                return Functions;
            },
            NonSelectedCategories: function () {
                var l = Categories.length,
                    i = 0,
                    NonSelectedCategories = [];
                for (; i < l; i++) if (i !== CurrentCategory) NonSelectedCategories.push(Objects.Categories[i]);
                return NonSelectedCategories;
            },
            NonSelectedEventsObjectArray: function (eventsObjectArray) {
                var l = eventsObjectArray.length,
                    i = 0,
                    NonSelectedEventsObjectArray = [];
                for (; i < l; i++) if (i !== CurrentEvent) NonSelectedEventsObjectArray.push(eventsObjectArray[i]);
                return NonSelectedEventsObjectArray;
            },
            EventsEnterAnimation: function () {
                var EventsFrame = Objects.EventsFrames[CurrentCategory],
                    EventsObjectArray = Objects.Events[CurrentCategory],
                    NonSelectedEventsObjectArray = Functions.NonSelectedEventsObjectArray(EventsObjectArray),
                    l = NonSelectedEventsObjectArray.length,
                    i = 0,
                    o;
                for (; i < l; i++) {
                    o = i - CurrentEvent;
                    if (o > 0) o *= -1;
                    o = 0.7 + o * 0.3;
                    if (o < 0) o = 0;
                    t.fromTo(NonSelectedEventsObjectArray[i], 1, {
                        opacity: 0,
                        scale: 0.7,
                        x: '-=50',
                        y: '-=100',
                        rotationX: 45,
                        rotationY: -45,
                        transformOrigin: '0% 50%'
                    }, {
                        opacity: o,
                        scale: 1,
                        x: '+=50',
                        y: '+=100',
                        rotationX: 0,
                        rotationY: 0,
                        transformOrigin: '0% 50%',
                        delay: i * 0.1,
                        ease: Power4.easeOut
                    });
                }
                t.fromTo(EventsObjectArray[CurrentEvent], 1, {
                    opacity: 0,
                    scale: 0.7,
                    x: '-=50',
                    y: '-=100',
                    rotationX: 45,
                    rotationY: -45,
                    transformOrigin: '0% 50%'
                }, {
                    opacity: 1,
                    scale: 1,
                    x: '+=50',
                    y: '+=100',
                    rotationX: 0,
                    rotationY: 0,
                    transformOrigin: '0% 50%',
                    ease: Power4.easeOut
                });
                t.fromTo(EventsFrame, 1, {
                    height: 0,
                    marginTop: 0,
                    opacity: 1
                }, {
                    height: 250,
                    marginTop: 10,
                    ease: Power4.easeOut
                });
                EventsOpen = true;
            },
            EventsChangeAnimation: function () {
                var EventsFrame = Objects.EventsFrames[CurrentCategory],
                    EventsObjectArray = Objects.Events[CurrentCategory],
                    NonSelectedEventsObjectArray = Functions.NonSelectedEventsObjectArray(EventsObjectArray),
                    l = NonSelectedEventsObjectArray.length,
                    i = 0,
                    o;
                for (; i < l; i++) {
                    o = i - CurrentEvent;
                    if (o > 0) o *= -1;
                    o = 0.7 + o * 0.3;
                    if (o < 0) o = 0;
                    t.to(NonSelectedEventsObjectArray[i], 1, {
                        opacity: o,
                        scale: 1,
                        transformOrigin: '0% 50%',
                        //delay: i * 0.1,
                        ease: Power4.easeOut
                    });
                }
                t.to(EventsObjectArray[CurrentEvent], 1, {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: '0% 50%',
                    ease: Power4.easeOut
                });
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
            EventsCloseAnimation: function (callback) {
                if (EventsOpen) {
                    EventsClosing = true;
                    t.to(Objects.EventsFrames[PreviousCategory], 0.5, {
                        height: 0,
                        opacity: 0,
                        marginTop: 0,
                        ease: Power4.easeOut,
                        onComplete: function () {
                            t.set(this.target, {
                                left: 0
                            });
                            EventsOpen = false;
                            EventsClosing = false;
                            CurrentEvent = 0;
                        }
                    });
                    t.staggerTo(Objects.Events[PreviousCategory], 1, {
                        opacity: 0,
                        scale: 0.7,
                        x: '+=' + MenuLeft,
                        y: '-=50',
                        rotationY: -45,
                        transformOrigin: '50% 50%',
                        ease: Power4.easeOut,
                        onComplete: function () {
                            t.set(this.target, {
                                x: 0,
                                y: 0,
                                rotationY: 0
                            });
                        }
                    }, 0);
                }
                callback();
            },
            CategoriesEnterAnimation: function () {
                var NonSelectedCategories = Functions.NonSelectedCategories(),
                    l = NonSelectedCategories.length,
                    i = 0,
                    o;
                for (; i < l; i++) {
                    o = i - CurrentCategory;
                    if (o > 0) o *= -1;
                    o = 0.7 + o * 0.2;
                    if (o < 0) o = 0;
                    t.fromTo(NonSelectedCategories[i], 1, {
                        opacity: 0,
                        scale: 0.7,
                        x: '-=50',
                        y: '+=10',
                        transformOrigin: '0% 50%'
                    }, {
                        opacity: o,
                        scale: 0.8,
                        x: '+=50',
                        y: '-=10',
                        transformOrigin: '0% 50%',
                        delay: i * 0.1,
                        ease: Power4.easeOut,
                        onComplete: (i + 1) === l ? function () {
                            CategoriesOpen = true;
                        } : undefined
                    });
                }
                t.fromTo(Objects.Categories[CurrentCategory], 1, {
                    opacity: 0,
                    scale: 0.7,
                    x: '-=50',
                    y: '+=10',
                    transformOrigin: '0% 50%'
                }, {
                    opacity: 1,
                    scale: 1.1,
                    x: '+=50',
                    y: '-=10',
                    transformOrigin: '0% 50%',
                    //delay: 0.1 * CurrentCategory,
                    ease: Power4.easeOut
                });
                t.to(Objects.CategoryFrame, 1, {
                    top: 250 - Objects.Categories[CurrentCategory].position().top,
                    left: MenuLeft,
                    ease: Power4.easeOut
                });
                return Functions;
            },
            CategoriesChangeAnimation: function () {
                var NonSelectedCategories = Functions.NonSelectedCategories(),
                    l = NonSelectedCategories.length,
                    i = 0,
                    o;
                for (; i < l; i++) {
                    o = i - CurrentCategory;
                    if (o > 0) o *= -1;
                    o = 0.7 + o * 0.2;
                    if (o < 0) o = 0;
                    t.to(NonSelectedCategories[i], 1, {
                        opacity: o,
                        scale: 0.8,
                        transformOrigin: '0% 50%',
                        ease: Power4.easeOut
                    });
                }
                t.to(Objects.Categories[CurrentCategory], 1, {
                    opacity: 1,
                    scale: 1.1,
                    transformOrigin: '0% 50%',
                    //delay: 0.1 * CurrentCategory,
                    ease: Power4.easeOut
                });
                t.to(Objects.CategoryFrame, 1, {
                    top: 250 - Objects.Categories[CurrentCategory].position().top + (EventsOpen ? PreviousCategory < CurrentCategory ? 250 : 0 : 0),
                    ease: Power4.easeOut
                });
                return Functions;
            },
            CategoryUp: function () {
                PreviousCategory = CurrentCategory;
                CurrentCategory--;
                if (CurrentCategory >= 0) Functions.EventsCloseAnimation(Functions.CategoriesChangeAnimation);
                else CurrentCategory = 0;
            },
            CategoryDown: function () {
                PreviousCategory = CurrentCategory;
                CurrentCategory++;
                if (CurrentCategory !== Categories.length) Functions.EventsCloseAnimation(Functions.CategoriesChangeAnimation);
                else CurrentCategory--;
            }
        };
    dO.on('ready', function () {
        w.LoadingDone = true;
        Objects.CategoryFrame = $('#CategoryFrame', d);
        setTimeout(function () {
            Functions.LoadCategories()
                .LoadEvents()
                .CategoriesEnterAnimation();
        }, 2000);
    });
    wO.on('keydown', function (e) {
        switch (e.keyCode) {
            case 13: // Enter
                if (!EventsOpen) Functions.EventsEnterAnimation();
                break;
            case 37: // Left
                if (EventsOpen && !EventsClosing) Functions.EventsLeft();
                break;
            case 38: // Up
                if (CategoriesOpen && !EventsClosing) Functions.CategoryUp();
                break;
            case 39: // Right
                if (EventsOpen && !EventsClosing) Functions.EventsRight();
                break;
            case 40: // Down
                if (CategoriesOpen && !EventsClosing) Functions.CategoryDown();
                break;
        }
    });
})(window, jQuery(window), document, jQuery(document), jQuery, TweenMax);