// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
function onNotificationGCM(e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                console.log("Regid " + e.regid);
                //  alert('registration id = ' + e.regid);

                $.ajax({
                    method: "POST",
                    url: "http://192.168.137.131/Pojet_Iot_Api/php/sendNotif.php",
                    data: { notif: e.regid },
                });

            }
            break;

        case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            if (e.foreground) {
            
                alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
            }
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
        console.log('Callback Success! Result = ' + result);
    }

    function errorHandler(error) {
        alert(error);
    }



    function onDeviceReady() {

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
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
            var valImage;
            function onSuccess(imageData) {
              
                if ($('input:radio[id="mod"]').is(':checked')) {
                            // append goes here
                            $.ajax({
                                method: "POST",
                                url: "http://192.168.137.131/Pojet_Iot_Api/php/modifImage.php",
                                data: { nom: nom, nomArduino: nomArduino, image: "data:image/jpeg;base64," + imageData },
                            }).done(function (msg) {

                                location.reload();
                            });
                         
                        }
                if ($('input:radio[id="comp"]').is(':checked')) {
                    var resembleControl = resemble(valImage).compareTo("data:image/jpeg;base64," + imageData).onComplete(function (data) {
                        var time = Date.now();
                        var diffImage = new Image();
                        diffImage.src = data.getImageDataUrl();
                        diffImage.style.width = 300 + 'px';
                        diffImage.style.height = 'auto';
                        $('#image-diff').html(diffImage);
                        if (data.misMatchPercentage != 0) {
                       
                             $('#mismatch').text(data.misMatchPercentage);
                         }

                    });
                    resemble.outputSettings({
                        errorColor: {
                            red: 255,
                            green: 255,
                            blue: 0
                        },
                        transparency: 1
                    });
            
                    resembleControl.repaint();
                    resembleControl.ignoreColors();

                    

                    $("#image-diff-affiche").modal('show').show();

                 }
        
                
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


                    nom = $(this).find("p").attr("id");
                    nomArduino = $(this).find("img").attr("id");
                    valImage = $(this).find("img").attr("src");
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
})();