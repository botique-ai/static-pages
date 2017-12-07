$(function () {

  var owner = $('#owner');
  var cardNumber = $('#cardNumber');
  var cardNumberField = $('#card-number-field');
  var CVV = $("#cvv");
  var mastercard = $("#mastercard");
  var confirmButton = $('#confirm-purchase');
  var visa = $("#visa");
  var amex = $("#amex");

  // Use the payform library to format and validate
  // the payment fields.

  cardNumber.payform('formatCardNumber');
  CVV.payform('formatCardCVC');


  cardNumber.keyup(function () {

    amex.removeClass('transparent');
    visa.removeClass('transparent');
    mastercard.removeClass('transparent');

    if ($.payform.validateCardNumber(cardNumber.val()) == false) {
      cardNumberField.addClass('has-error');
    } else {
      cardNumberField.removeClass('has-error');
      cardNumberField.addClass('has-success');
    }

    if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
      mastercard.addClass('transparent');
      amex.addClass('transparent');
    } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
      mastercard.addClass('transparent');
      visa.addClass('transparent');
    } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
      amex.addClass('transparent');
      visa.addClass('transparent');
    }
  });

  function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  }

  confirmButton.click(function (e) {

    e.preventDefault();

    var userId = qs('userId');
    var botId = qs('botId');
    var returnURL = qs('returnURL');
    var postback = qs('postback');

    $.ajax({
      url: returnURL + 'http/webhook/' + botId + '/' + userId,
      type: 'POST',
      data: JSON.stringify({postback: postback}),
      contentType: 'application/json',
      success: function () {
        window.close();
      }
    });
  });
});
