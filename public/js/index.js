$(function() {
  $("#btnScrape").on("click", function(event) {
      console.log("in onclick");
    $.ajax("/scrape", {
      type: "Get"
    }).then(function(res) {
      console.log(res);
    });
  });
});
