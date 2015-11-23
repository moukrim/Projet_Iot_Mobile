$(function () {

 /*
    $.get("http://192.168.137.131/Pojet_Iot_Api/php/selectPlante.php", function (data) {

        resultats = $.parseJSON(data);
        $.each(resultats, function (ind, val) {
             console.log(val);
            $(".circular" + ind).css('background-image', 'url(../' + val.image + ')');
            $(".images").append('\
                <a href="#" class="camera" style="float:left; margin-right:10px;">\
                    <div class="circular'+ ind + '">\
                        <img src="'+ val.image + '" id="' + val.nomArduino + '" alt="" />\
                            <p class="nom_plante" id="' + val.nom + '">' + val.nom + '</p>\
                    </div>\
                </a>\
                ');



        });


       $(".camera").click(function () {
            console.log($(this).find("img").attr("id"));
            console.log($(this).find("p").attr("id"));
            navigator.camera.getPicture(function (imageUri) {

                $("#text").append("<img src='" + imageUri + "' style='width:50%;' />");
            }, null, null);
        });*/
    });

    
  
  });