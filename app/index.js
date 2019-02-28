$(document).ready(function () {
     muestroPagina();
});

function muestroPagina() {
    $("#loader").hide();
    $("body").removeClass('bg-dyd');
    $("#header").show();
    $("#footer").show();
}