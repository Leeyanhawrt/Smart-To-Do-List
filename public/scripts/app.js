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

  let moviePK;
  let restaurantPK;
  let productPK;
  let bookPK;
  let category;

  $('body').on("click", () => {
    $('.changeContainer').on("click", (event) => {
      console.log(event)
      $('#selectMove').toggle()
      console.log(event.currentTarget.attributes.id.value);
      moviePK = event.currentTarget.attributes.id.value;
    })
  })

  $('#selectMove').on('submit', function () {
    event.preventDefault();
    console.log("after submit was pressed");
    category = $('input[name=editTo]:checked').val();
    console.log(category);
    $('#selectMove').slideToggle('slow')
    event.stopPropagation();

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/dashboard/edit/movie",
      data: {
        id: moviePK,
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
  });

  $('body').on("click", () => {
    $('.deleteMovie').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      moviePK = event.currentTarget.attributes.id.value;
      // console.log(moviePK);
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/delete/movie",
        data: {
          id: moviePK,
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
    $('.editRestaurant').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      restaurantPK = event.currentTarget.attributes.id.value;
      category = "product";
      // console.log(restaurantPK);
      // console.log(category);
      event.stopPropagation();

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/edit/restaurant",
        data: {
          id: restaurantPK,
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

    })
  })

  $('body').on("click", () => {
    $('.deleteRestaurant').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      restaurantPK = event.currentTarget.attributes.id.value;
      // console.log(restaurantPK);
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/delete/restaurant",
        data: {
          id: restaurantPK,
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
    $('.editProduct').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      productPK = event.currentTarget.attributes.id.value;
      category = "movie";
      // console.log(productPK);
      // console.log(category);
      event.stopPropagation();

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/edit/product",
        data: {
          id: productPK,
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

    })
  })

  $('body').on("click", () => {
    $('.deleteProduct').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      productPK = event.currentTarget.attributes.id.value;
      // console.log(productPK);
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/delete/product",
        data: {
          id: productPK,
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
    $('.editBook').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      bookPK = event.currentTarget.attributes.id.value;
      category = "movie";
      // console.log(bookPK);
      // console.log(category);
      event.stopPropagation();

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/edit/book",
        data: {
          id: bookPK,
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

    })
  })

  $('body').on("click", () => {
    $('.deleteBook').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      bookPK = event.currentTarget.attributes.id.value;
      // console.log(bookPK);
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/delete/book",
        data: {
          id: bookPK,
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

})

//   const $registrationForm = $('.registration-form');
//   const $moviesForm = $('.movies-form');
//   const $restaurantsForm = $('.restaurants-form');
//   const $productsForm = $('.products-form');
//   const $booksForm = $('.books-form');

// /* /* eslint-disable no-undef */
// /* eslint-disable eqeqeq */
// /* eslint-disable func-style */
// // Client facing scripts here
// //API INFORMATION
// //MOVIES            - https://www.omdbapi.com/
// //FOOD BUSINESSES   - https://api.brandfetch.io/v2/brands/
// //BOOKS             - https://www.googleapis.com/books/v1/


//   //setting temporary jQuery variables that monitor different button elements on page
//   const $registrationForm = $('.registration-form');
//   const $moviesForm = $('.movies-form');
//   const $restaurantsForm = $('.restaurants-form');
//   const $productsForm = $('.products-form');
//   const $booksForm = $('.books-form');


