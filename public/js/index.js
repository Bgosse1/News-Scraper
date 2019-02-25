$(function() {
  $("#btnScrape").on("click", function(event) {
    event.preventDefault();
    $.ajax("/scrape", {
      type: "Get"
    }).then(function(res) {
       location.reload();
    });
  });

  $(".add").on("click", function(event) {
    event.preventDefault();
    const button = $(this);
    const id = button.attr("data-id");

    $.ajax(`/save/${id}`, {
      type: "PUT"
    }).then(function() {
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
        data.comments.forEach(comment => {
          $(".collection").append(
            $(
              `<li class='collection-item'>        
                <div class="valign-wrapper">
                    ${comment.text}
                      <a id="removeComment"class='btn-floating btn-small waves-effect waves-light red modal-close' data='${
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

  $(document).on("click", "#removeComment", function() {
    event.preventDefault();
    const id = $(this).attr("data");
    $.ajax(`/comment/${id}`, {
      type: "DELETE"
    }).then(function(data) {
      console.log(data);
    });
  });
});
