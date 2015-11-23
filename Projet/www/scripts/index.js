// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
function onNotificationGCM(e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                console.log("Regid " + e.regid);
                alert('registration id = ' + e.regid);
            }
            break;

        case 'message':
            // this is the actual push notification. its format depends on the data     model from the push server
            alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
            break;

        case 'error':
            alert('GCM error = ' + e.msg);
            break;

        default:
            alert('An unknown GCM event has occurred');
            break;
    }
}

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    function successHandler(result) {
        alert('Callback Success! Result = ' + result);
    }

    function errorHandler(error) {
        alert(error);
    }

  

    function onDeviceReady() {
 
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        

      

        try {
            var pushNotification = window.plugins.pushNotification;
            pushNotification.register(successHandler, errorHandler, { "senderID": "967388193865", "ecb": "onNotificationGCM" });
        } catch (ex) {
            alert('error: ' + ex);
        }


        $(function () {
            var nom;
            var nomArduino;
            function onSuccess(imageData) {
                $.ajax({
                    method: "POST",
                    url: "http://192.168.137.131/Pojet_Iot_Api/php/modifImage.php",
                    data: { nom: nom, nomArduino: nomArduino, image: "data:image/jpeg;base64," + imageData },
                }).done(function (msg) {

                    location.reload();
                });
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        $.get("http://192.168.137.131/Pojet_Iot_Api/php/selectPlante.php", function (data) {

           var resultats = $.parseJSON(data);
            $.each(resultats, function (ind, val) {
                // console.log(val);
              
                $(".images").append('\
                <div class="camera" style="float:left; margin-right:10px;">\
                    <div class="circular'+ ind + '">\
                        <img src="'+ val.image + '" id="' + val.nomArduino + '" alt="" />\
                            <p class="nom_plante" id="' + val.nom + '">' + val.nom + '</p>\
                    </div>\
                </div>\
                ');

            });

            $(".camera").click(function () {
              

                nom=$(this).find("p").attr("id");
                nomArduino=$(this).find("img").attr("id");
               navigator.camera.getPicture(onSuccess, onFail, {
                   quality: 75,
                   destinationType: Camera.DestinationType.DATA_URL,
                   sourceType: Camera.PictureSourceType.CAMERA,
                   encodingType: Camera.EncodingType.JPEG,
                   allowEdit: true,
                   targetWidth: 90,
                   targetHeight: 100,
                   popoverOptions: CameraPopoverOptions,
                   saveToPhotoAlbum: false
               });
                  
           
                 
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