"use strict";

var arr = [["Quote 1...", "- author1"], ["Quote 2...", "- author2"], ["Quote 3...", "- author3"], ["Quote 4...", "- author4"], ["Quote 5...", "- author5"], ["Quote 6...", "- author6"], ["Quote 7...", "- author7"]];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var defaultQuote = $("#text").text();
var defaultAuthor = $("#author").text(); // $(document).ready(function () {

$('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + defaultQuote + '" ' + defaultAuthor));
$("#new-quote").on("click", function () {
  var i = random(0, arr.length - 1);
  var quoteAndAuthor = arr[i];
  $("#text").text(quoteAndAuthor[0]);
  $("#author").text(quoteAndAuthor[1]);
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + quoteAndAuthor[0] + '" ' + quoteAndAuthor[1]));
}); //   });