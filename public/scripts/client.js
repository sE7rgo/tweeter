/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$(document).ready(() => {
  console.log('ready')
  
  const createTweetElement = function(data) {
    $('.tweet header div h4').text(data.user.name);
    $('.tweet header div img').attr('src', data.user.avatars);
    $('.tweet header div.handle').text(data.user.handle);
    $('.tweet .content').text(data.content.text);

    const timeDif = function (time) {
      const diff = (Date.parse(new Date) - time)
      const sec = diff / 1000;
      const min = sec / 60;
      const hours = min / 60;
      const days = hours / 24;
      const years = days / 365;
      if (years > 0) {
        return `${Math.floor(years)} years ago`;
      } else if (years < 0 && days > 0) {
        return `${Math.floor(days)} days ago`;
      } else {
        return `${Math.floor(hours)} hours ago`;
      }
    }
    $('.tweet footer div.time').text(timeDif(data.created_at))
  }
  const $tweet = createTweetElement(tweetData);
  //get tweetData
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
})

