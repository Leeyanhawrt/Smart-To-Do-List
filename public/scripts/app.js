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

  let PK;
  // let restaurant;
  // let product;
  // let book;
  let category;

  $('body').on("click", () => {
    $('.changeContainer').on("click", (event) => {
      console.log(event)
      $('#selectMove').toggle()
      console.log(event.currentTarget.attributes.id.value);
      PK = event.currentTarget.attributes.id.value;
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
  });

  $('body').on("click", () => {
    $('.deleteMovie').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      PK = event.currentTarget.attributes.id.value;
      // console.log(moviePK);
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
    $('.editRestaurant').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      PK = event.currentTarget.attributes.id.value;
      category = "product";
      // console.log(PK);
      // console.log(category);
      event.stopPropagation();

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
    $('.editProduct').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      PK = event.currentTarget.attributes.id.value;
      category = "movie";
      // console.log(PK);
      // console.log(category);
      event.stopPropagation();

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







  $('body').on("click", () => {
    $('.editBook').on("click", (event) => {
      event.preventDefault();
      // console.log(event.currentTarget.attributes.id.value);
      book = event.currentTarget.attributes.id.value;
      category = "movie";
      // console.log(book);
      // console.log(category);
      event.stopPropagation();

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/edit/book",
        data: {
          id: book,
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
      book = event.currentTarget.attributes.id.value;
      // console.log(book);
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/delete/book",
        data: {
          id: book,
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


