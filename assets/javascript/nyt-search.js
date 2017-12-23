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
console.log(queryURL);
  // AJAX Function
  $.ajax({url: queryURL, method: "GET"})
    .done(function(NYTData) {

      // Clear the wells from the previous run
      $("#results").empty();

      for (var i = 0; i < NYTData.response.docs.length; i++) {

      // Start Dumping to HTML Here
      var results = $("<div>");
      results.addClass("result");
      results.attr("id", "articleResult-" + i);
      $("#results").append(results);

      // Check if things exist
      if (NYTData.response.docs[i].headline != "null") {
        $("#articleResult-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
      }

      // Check if the byline
      if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasWonProperty("original")){
        $("#articleResult-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
      }

      // Attach the content to the appropriate well
      $("#articleResult-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
      $("#articleResult-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
      $("#articleResult-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");

      }
      console.log(queryURL);
      console.log(numArticles);
      console.log(NYTData);
    })
}
// MAIN PROCESSES
// ============================================
$("#searchBtn").on("click", function() {

  queryTerm = $("#search").val().trim();

  // Add in the Search Term
  var newURL = queryURLBase + "&q" + queryTerm;

  // Get the Number of Records
  numResults = $("#num-records").val();

  // Get the Start Year and End Year
  startYear = $("#start-year").val().trim();
  endYear = $("#end-year").val().trim();

  if (parseInt(startYear)) {

    // Add the vecessary fields
    startYear = startYear + "0101";

    // Add the date information to the URL
    newURL = newURL + "&begin_date=" + startYear;
  }

  if (parseInt(endYear)) {

    // Add the necessary fields
    endYear = endYear + "0101";

    // Add the date information to the URL
    newURL = newURL + "&end_date=" + endYear;
  }

  // Send the AJAX Call the newly asswmbled URL
  runQuery(numResults, newURL);

  return false;
})

// 1. Retrieve user inputs and convert to variables
// 2. Use those variables to run an AJAX to the New York Times
// 3. Break down the NYT Object into useable fields
// 4. Dynamically generate html content

// 5. Dealing with "edge cases" -- bugs or situations that are not intuitive.
