$(document).on('ready', function(){
    //aca ajax que tare todo lo que tuene que traer
    //promociones
});

var getGateway = function () {
    $.blockUI();
    getCardValues();

}

var getCardValues = function () {
    var userCard = $('#user-card');
    var cardNumber = userCard.CardJs('cardNumber');
    var name = userCard.CardJs('name');
    var expiryMonth = userCard.CardJs('expiryMonth');
    var expiryYear = userCard.CardJs('expiryYear');
    var cvc = userCard.CardJs('cvc');
    var cardNumber = cardNumber.split(' ').join('');
    var bins = cardNumber.substring(0, 6);
    //aca mandaar a backend de desde backend consultar y traer promociones para esa tarjeta
    $.ajax({
        url: 'https://lookup.binlist.net/' + bins,
        type: 'get',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
        },
        success: function (data) { 
           $.unblockUI();
           if (data.type == 'CREDIT') {
               //pregunto que teners con ej: visa-credito y muestro
                $("#modal-installments").modal();
            }
            
           if (data.type == 'DEBIT') 
            { 
                $("#modal-debit").modal();
            }
        }
    });
}
