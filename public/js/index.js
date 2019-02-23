$(function() {
  $("#btnScrape").on("click", function(event) {
    event.preventDefault();
    $.ajax("/scrape", {
      type: "Get"
    }).then(function(res) {
      console.log(res);
    });
  });

  $(".add").on("click", function(event) {
    event.preventDefault();
    const button = $(this);
    const id = button.attr("data-id");

    $.ajax(`/save/${id}`, {
      type: "PUT"
    }).then(function(){
      // M.toast({html: "Article Saved"});
      location.reload();
    });
  });

  $(".remove").on("click", function(event) {
    event.preventDefault();
    const button = $(this);
    const id = button.attr("data-id");

    $.ajax(`/remove/${id}`, {
      type: "PUT"
    }).then(function(){
      // M.toast({html: "Article Removed"});
      location.reload();
    });
  });

  $(".modal-trigger").on("click", function(event) {
    event.preventDefault();
    $('.modal').modal();
  });
});
