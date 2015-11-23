// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        $(function () {
        $.get("http://192.168.137.131/Pojet_Iot_Api/php/selectPlante.php", function (data) {

           var resultats = $.parseJSON(data);
            $.each(resultats, function (ind, val) {
                // console.log(val);
                //$(".circular" + ind).css('background-image', 'url("http://192.168.137.131/Pojet_Iot_Api/"' + val.image + ')');
                $(".images").append('\
                <div class="camera" style="float:left; margin-right:10px;">\
                    <div class="circular'+ ind + '">\
                        <img src="http://192.168.137.131/Pojet_Iot_Api/'+ val.image + '" id="' + val.nomArduino + '" alt="" />\
                            <p class="nom_plante" id="' + val.nom + '">' + val.nom + '</p>\
                    </div>\
                </div>\
                ');

            });

           $(".camera").click(function () {
               
                navigator.camera.getPicture(function (imageUri) {

                    $("#text").append("<img src='" + imageUri + "' style='width:50%;' />");
                }, null, null);
            });
        });
    });
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();