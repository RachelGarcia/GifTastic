var celebrities = ["Brad Pitt", 
                  "Gerard Butler", 
                  "Bradley Cooper", 
                  "Kit Harington", 
                  "Chris Hemsworth",];

function renderButtons() {

  for (var i = 0; i < celebrities.length; i++) {

    var newDiv = $("<div>");

    var newButton = $("<button>");

    newButton.attr("data-topic", celebrities[i]);

    newButton.attr("class", "button btn btn-secondary btn-sm");

    newButton.html(celebrities[i]);

    newDiv.attr("class", "buttonHolder");

    newDiv.append(newButton);

    $(".button-area").append(newDiv);

  }

  celebrities = [];

};

$(document).on("click", ".button", function() {

  var q = $(this).data("topic");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + q + "&limit=10&api_key=dc6zaTOxFJmzC";

  $.ajax({url: queryURL, method: "GET"})
    .done(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var rating = results[i].rating;

        var gifDiv = $("<div class='imageHolder'>");

        var gifRating = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img class='celebritieImage'>");

        gifImage.attr("src", results[i].images.fixed_height_still.url);

        gifImage.attr("data-state", "still");

        gifImage.attr("data-still", results[i].images.fixed_height_still.url);

        gifImage.attr("data-animate", results[i].images.fixed_height.url);

        gifDiv.append(gifImage);

        gifDiv.append(gifRating);

        $(".gif-area").prepend(gifDiv);

      }

    });

});

$(document).on("click", ".celebritieImage", function() {

  var state = $(this).attr("data-state");

  console.log(state);

  if (state == "still") {

    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");

  } else {

    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");

  }

});

// This allows me to add more celebritie when pressing the add button
$("#addcelebritie").on("click", function() {
  var celebritie = $("#celebritie-input").val().trim();

  if(celebritie !== "") {

    celebrities.push(celebritie);

  } else {

//Add alert if box empty and push add
    alert("You need to add something in the box!");

  }

  $("#celebritie-input").val("");

  renderButtons();

  return false;

});

renderButtons();