$(document).ready(function() {
  let num = 140;

  $('.new-tweet div output').val(num);

  $('#tweet-text').keypress(function () {
    num--;
    if (num < 0) {
      $(this).siblings('div').children('output').val(num).css('color', 'red')
    } else {
      $(this).siblings('div').children('output').val(num)
    }
  });
});


