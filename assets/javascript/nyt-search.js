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
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(NYTData) {
    console.log("This is queryURL: " + queryURL);
    console.log("This is numArticles: " + numArticles);
    console.log("This is NYTData:  " + NYTData);

      for (var i = 0; i < numArticles; i++) {
                console.log("SECTION: " + NYTData.response.docs[i].section_name);
                console.log("DATE: " + NYTData.response.docs[i].pub_date);
                console.log("LINK: " + NYTData.response.docs[i].web_url);

      }

      // Clear the container from the previous run
      $("#articlesSection").empty();

      for (var i = 0; i < numArticles; i++) {

        // Start Displaying to HTML Here
        var articlesSection = $("<div>");
        articlesSection.addClass("card-body");
        articlesSection.attr("id", "articleCard-" + i);
        $("#articlesSection").append(articlesSection);

        // Check if the headline exists
        if (NYTData.response.docs[i].headline != "null") {
          console.log("HEADLINE: " + NYTData.response.docs[i].headline.main);
          $("#articleCard-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
        }

        // Check if the byline exists
        if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
          console.log("AUTHOR: " + NYTData.response.docs[i].byline.original);
          $("#articleCard-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
        }

        // Check if the section_name exists
        if (NYTData.response.docs[i].hasOwnProperty("section_name")) {
          console.log("SECTION: " + NYTData.response.docs[i].section_name);
          $("#articleCard-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
        }

        // Check if the date exists
        if (NYTData.response.docs[i].hasOwnProperty("pub_date")) {
          console.log("DATE: " + NYTData.response.docs[i].pub_date);
          $("#articleCard-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
        }

        // Attach the content to the appropriate container
        $("#articleCard-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");

      }
    })
}
// MAIN PROCESSES
// ============================================
$("#search-btn").on("click", function(event) {

  event.preventDefault();
  // Get search term
  queryTerm = $("#search").val().trim();

  // Add in the Search Term
  var newURL = queryURLBase + "&q=" + queryTerm;

  // Get the Number of Records
  numResults = $("#num-records").val();

  // Get the Start Year and End Year
  startYear = $("#start-year").val().trim();
  endYear = $("#end-year").val().trim();

  if (parseInt(startYear)) {

    // Add the necessary fields
    startYear = startYear + "0101";

    // Add the date information to the URL
    newURL = newURL + "&begin_date=" + startYear;
  }

  if (parseInt(endYear)) {

    // Add the necessary fields
    endYear = endYear + "1231";

    // Add the date information to the URL
    newURL = newURL + "&end_date=" + endYear;
  }

  // Send the AJAX Call the newly asswmbled URL
  runQuery(numResults, newURL);

});

$("#clear-btn").on("click", function() {
  $("#search").val("");
  $("#start-year").val("");
  $("#end-year").val("");
});

// 1. Retrieve user inputs and convert to variables
// 2. Use those variables to run an AJAX to the New York Times
// 3. Break down the NYT Object into useable fields
// 4. Dynamically generate html content

// 5. Dealing with "edge cases" -- bugs or situations that are not intuitive.
