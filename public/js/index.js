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
    }).then(function() {
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
    }).then(function() {
      // M.toast({html: "Article Removed"});
      location.reload();
    });
  });

  $(".modal-trigger").on("click", function(event) {
    event.preventDefault();
    $(".collection").empty();
    $(".modal").modal();
    const id = $(this).attr("data");
    $("#article-id").text(id);

    $.ajax(`/articles/${id}`, {
      type: "GET"
    }).then(function(data) {
      console.log("blah " + JSON.stringify(data));
      if (data.comments.length === 0) {
        $(".collection").append(
          $(`<li class="collection-item">No Comments For This Article</li>`)
        );
      } else {
        //TODO populate articles that have comments
        data.comments.forEach(comment => {
          $(".collection").append(
            $(
              `<li class='collection-item'>        
                <div class="valign-wrapper">
                    ${comment.text}
                      <a class='btn-floating btn-small waves-effect waves-light red' data='${
                        comment._id
                      }'>
                    <i class="material-icons">remove</i>
                  </a>
                </div>
              </li>`
            )
          );
        });
      }
    });
  });
  {
    /* <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a> */
  }
  $("#btnSaveComment").click(function(event) {
    event.preventDefault();
    const id = $("#article-id").text();
    const comment = $("#textarea1")
      .val()
      .trim();
    $("#textarea1").val("");
    $.ajax(`/comment/${id}`, {
      type: "POST",
      data: { text: comment }
    }).then(function(data) {
      console.log(data);
    });
  });
});
