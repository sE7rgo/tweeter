/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const timeDif = function (time) {
  const diff = (Date.parse(new Date) - time)
  const sec = diff / 1000;
  const min = sec / 60;
  const hours = min / 60;
  const days = hours / 24;
  const years = days / 365;
  if (years !== 0) {
    return `${Math.floor(years)} years ago`;
  } else if (years < 0) {
    return `${Math.floor(days)} days ago`;
  } else {
    return `${Math.floor(hours)} hours ago`;
  }
}
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(() => {
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('.tweets-container').prepend(createTweetElement(tweet));
    }
  };
  const createTweetElement = function(data) {
    const $tweet = `<article class="tweet">
    <header>
      <div>
        <img src="${(data.user.avatars)}">
        <br>
        <h4>${data.user.name}</h4>
      </div>
      <div class ="handle">
        <h4>${data.user.handle}</h4>
      </div>
    </header>
    <section>
    <p>${escape(data.content.text)}</p>
    </section>
    <footer>
      <div>
        <h6>${timeDif(data.created_at)}</h6>
      </div>
      <div>
        🍺☺️👾 🤖
      </div>
    </footer>
  </article>`
  return $tweet;
  }
renderTweets(data);

  $('.new-tweet form').submit((event) => {
    let text = $('#tweet-text').val();
    let str = $('#tweet-text').serialize();
    event.preventDefault();
    if (text.length > 140) {
      $('.error').text(`❌ Look's like you are Tolstoy, try with 140 characters 😀`);
      $('.error').css('border', '3px solid red');
      $('.error').slideDown(1000);
    } else if (text === '') {
      $('.error').text(`❌ Look's like there is no text, are you shy? 😀`);
      $('.error').css('border', '3px solid red');
      $('.error').slideDown(1000);
    } else {
      $('.error').slideUp(1000);
      $.ajax({
        type: 'POST',
        url: "/tweets",
        data: str
        })
        .then(res => {
          loadtweets();
        })
    }
  })
  const loadtweets = function () {
    $.ajax({
      type: 'GET',
      url: "/tweets",
    })
    .then(response => {
      //console.log(response)
      renderTweets(response);
      
    })
    // .catch((err) => {
    //   alert(err);
    // })
  }

  loadtweets()
})
