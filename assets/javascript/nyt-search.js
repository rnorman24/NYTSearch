// SETUP VARIABLES
// ============================================
var authKey = "c4d0935b7d4d411586a4d5453386e817";

// Search Parameters
var queryTerm   = "";
var numResults  = 0;
var startYear   = 0;
var endYear     = 0;

// URL Base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to track number of articles
var articleCounter = 0;

// FUNCTIONS
// ============================================
function runQuery(numArticles, queryURL) {

  // AJAX Function
  $.ajax({url: queryURL, method: "GET"})
    .done(function(NYTData) {
      console.log(NYTData);
    })
}
// MAIN PROCESSES
// ============================================
$("#search-btn").on("click", function() {
  runQuery();
})
// 1. Retrieve user inputs and convert to variables
// 2. Use those variables to run an AJAX to the New York Times
// 3. Break down the NYT Object into useable fields
// 4. Dynamically generate html content

// 5. Dealing with "edge cases" -- bugs or situations that are not intuitive.


/*// Built by LucyBot. www.lucybot.com
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "c4d0935b7d4d411586a4d5453386e817",
  'q': "Obama"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});*/
