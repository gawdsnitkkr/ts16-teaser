(function (w, d, $, wO, dO) {
    var Width = w.innerWidth,
        HalfWidth = Width / 2,
        Height = w.innerHeight,
        HalfHeight = Height / 2,
        Impress,
        Frames,
        FrameCount,
        FramesArray = [],
        MetroSVG,
        MetroSVGDocObject,
        MetroSVGDrawSVG,
        ArtIconSVG,
        ArtIconSVGDocObject,
        ArtIconSVGDrawSVG,
        Functions = {
            InitializeFrames: function () {
                FrameCount = Frames.length;
                var i = 0;
                for (i = 0; i < FrameCount; i++) {
                    FramesArray.push($(Frames[i]));
                }
                return Functions;
            },
            GetFrame: function (i) {
                return FramesArray[i - 1];
            },
            SetFramesPosition: function () {
                Functions.GetFrame(2).attr('data-x', Width * 2);
                Functions.GetFrame(3).attr('data-y', Height * 2.5);
                return Functions;
            },
            Resize: function () {
                Width = w.innerWidth;
                HalfWidth = Width / 2;
                Height = w.innerHeight;
                HalfHeight = Height / 2;
                Frames.css({
                    width: Width,
                    height: Height
                });
                return Functions;
            }
        };

    dO.on('ready', function () {
        Frames = $('.Frame', dO);
        MetroSVG = $('#MetroSVG', dO).on('load', function () {
            MetroSVGDocObject = $(MetroSVG[0].contentDocument.documentElement);
            MetroSVGDrawSVG = MetroSVGDocObject.drawsvg({
                duration: 12000,
                ease: 'swing'
            });
            MetroSVGDrawSVG.drawsvg('animate');
        });
        ArtIconSVG = $('#ArtIconSVG', dO).on('load', function () {
            ArtIconSVGDocObject = $(ArtIconSVG[0].contentDocument.documentElement);
            ArtIconSVGDrawSVG = ArtIconSVGDocObject.drawsvg({
                duration: 6000,
                ease: 'swing'
            });
            setTimeout(function () {
                ArtIconSVGDrawSVG.drawsvg('animate');
            }, 0);
        });
        Functions.InitializeFrames().SetFramesPosition();
        Functions.Resize();
        Impress = impress();
        Impress.init();
    });

})(window, document, jQuery, jQuery(window), jQuery(document));