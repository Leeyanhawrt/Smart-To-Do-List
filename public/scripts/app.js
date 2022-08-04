$(document).ready(() => {

  // Provides search functionality to magnify glass
  $('.fa-magnifying-glass').click(() => {
    $('#movies-form').submit()
  })

  // Adds x button to search bar
  $('.fa-circle-xmark').click(() => {
    $('#movie-query').val('')
    $('.fa-circle-xmark').hide()
  })

  // Shows x button that clears text field if user interacts with it
  $('#movie-query').keydown(() => {
    if ($('#movie-query').val().length === 0) {
      $('.fa-circle-xmark').hide()
    } else if ($('#movie-query').val().length > 0) {
      $('.fa-circle-xmark').show()
    }
  })

  // Logic for
  $('#login-form').on('submit', event => {
    event.preventDefault();
    const data = $('#login-form').serializeArray();
    console.log(data[0].value);
    console.log(data[1].value);
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/login",
      data: {
        username: data[0].value,
        password: data[1].value,
      },
      success: result => {
        if (result.response_code == 200) {
          alert("INVALID EMAIL/PASSWORD, PLEASE TRY AGAIN!")
          window.location.reload();
        } else if (result.user == "verified") {
          window.location = "/dashboard";
        } else if (result.user == "noexist") {
          alert("That User Does Not Exist, Please Register!")
          window.location.reload();
        }
      },
      error: result => {
        alert('error');
      }
    })
  })

  //logic for handling
  const $profileSubmission = $('#profile-update');
  $profileSubmission.on('submit', event => {
    event.preventDefault();
    const data = $profileSubmission.serializeArray();
    console.log(data);
    $('.profileImage').attr('src', data[0].value);
    console.log(data[0].value);

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/profile",
      data: {
        url: data[0].value,
      },
      success: function (result) {
        // if (result.response_code == 200) {
        //   window.location.reload();
        // }
        // console.log(result);
      },
      error: function (result) {
        alert('error');
      }
    });
  });

  $('#registeration-submit').on('click',event => {
    event.preventDefault();
    alert("Thanks for registration!");
    window.location = "/";
  })

  let PK;
  // let restaurant;
  // let product;
  // let book;
  let buttonCategory;
  let category;

  $('body').on("click", () => {
    $('.changeContainer').on("click", (event) => {
      console.log(event)
      $('#selectMove').slideToggle('slow')
      console.log(event.currentTarget.attributes.id.value);
      PK = event.currentTarget.attributes.id.value;
      console.log(event.currentTarget.attributes.value.value);
      buttonCategory = event.currentTarget.attributes.value.value;
    })
  })

  $('#selectMove').on('submit', function (event) {
    event.preventDefault();
    category = $('input[name=editTo]:checked').val();
    console.log("after submit was pressed");
    console.log(category);
    event.stopPropagation();

    if (buttonCategory == "movie") {

      console.log("First ajax Call");
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/edit/movie",
        data: {
          id: PK,
          type: category,
        },
        success: function (result) {
          if (result.response_code == 200) {
            window.location.reload();
          }
        },
        error: function (result) {
          alert('error');
        }
      });

    } else if (buttonCategory == "restaurant") {

      console.log("Second ajax Call");

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/edit/restaurant",
        data: {
          id: PK,
          type: category,
        },
        success: function (result) {
          if (result.response_code == 200) {
            window.location.reload();
          }
          // alert('ok');
        },
        error: function (result) {
          alert('error');
        }
      });

    } else if (buttonCategory == "product") {

      console.log("Third ajax Call");
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/edit/product",
        data: {
          id: PK,
          type: category,
        },
        success: function (result) {
          if (result.response_code == 200) {
            window.location.reload();
          }
        },

        error: function (result) {
          alert('error');
        }
      });

    } else if (buttonCategory == "book") {

      console.log("Fourth ajax Call");

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/edit/book",
        data: {
          id: PK,
          type: category,
        },
        success: function (result) {
          if (result.response_code == 200) {
            window.location.reload();
          }
        },

        error: function (result) {
          alert('error');
        }
      });
    }
  })

  $('body').on("click", () => {
    $('.deleteMovie').on("click", (event) => {
      event.preventDefault();
      PK = event.currentTarget.attributes.id.value;
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/delete/movie",
        data: {
          id: PK,
        },
        success: function (result) {
          if (result.response_code == 200) {
            window.location.reload();
          }
        },
        error: function (result) {
          alert('error');
        }
      });
      event.stopPropagation();
    })
  })



  $('body').on("click", () => {
    $('.deleteRestaurant').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      PK = event.currentTarget.attributes.id.value;
      // console.log(PK);
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/delete/restaurant",
        data: {
          id: PK,
        },
        success: function (result) {
          if (result.response_code == 200) {
            window.location.reload();
          }
        },
        error: function (result) {
          alert('error');
        }
      });
      event.stopPropagation();
    })
  })






  $('body').on("click", () => {
    $('.deleteProduct').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      PK = event.currentTarget.attributes.id.value;
      // console.log(PK);
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/delete/product",
        data: {
          id: PK,
        },
        success: function (result) {
          if (result.response_code == 200) {
            window.location.reload();
          }
        },
        error: function (result) {
          alert('error');
        }
      });
      event.stopPropagation();
    })
  })




  $('body').on("click", (event) => {
    $('.deleteBook').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      PK = event.currentTarget.attributes.id.value;
      // console.log(bookPK);

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/delete/book",
        data: {
          id: PK,
        },
        success: function (result) {
          if (result.response_code == 200) {
            window.location.reload();
          }
        },
        error: function (result) {
          alert('error');
        }
      });
      event.stopPropagation();
    })
  })

  // //API INFORMATION
  // //MOVIES            - https://www.omdbapi.com/
  // //FOOD BUSINESSES   - https://api.brandfetch.io/v2/brands/
  // //BOOKS             - https://www.googleapis.com/books/v1/
})
