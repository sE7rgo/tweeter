$(document).ready(function() {
  let num = 140;

  $('.new-tweet .counter').val(num);

  $('#tweet-text').keypress(function () {
    num--;
    $(this).siblings('div').children('.counter').val(num);
    if (num < 0) {
    }
  });
});


