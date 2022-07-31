// Client facing scripts here

//Starting the client side javascript with the document.ready so that DOM is loaded and ready
$(document).ready(function () {

  //setting temporary jQuery variables that monitor different button elements on page
  const $registrationForm = $('.registration-form');
  const $moviesForm = $('.movies-form');
  const $restaurantsForm = $('.restaurants-form');
  const $productsForm = $('.products-form');
  const $booksForm = $('.books-form');

  //Event handler for when the movies button is submitted
  $moviesForm.submit(function (event) {
    event.preventDefault(); //will not submit the old fashioned way, we want to submit an ajax request instead

    //jQuery variable that takes the users movie query input and stores into variable
    const $movieInputFromUser = $('#movie-query').val();

    //function to sanitize the users input into correct format for API use
    function sanitizeMovieQuery(userInput) {
      const sanitizedMovieString = userInput.trim().replace(/[^a-zA-Z]/g, " ").trim().replace(/ /g, "%20");
      return sanitizedMovieString
    }

    //storing the user input into new variable by running it as parameter in sanitize function
    const sanitizedMovieQuery = sanitizeMovieQuery($movieInputFromUser);

    // console.log($movieInputFromUser);
    // console.log(sanitizedMovieQuery);

    const queryMovie = "the%20terminator";

    //ajax request for the movies api called omdbapi, returns a series of statements with required information that is contained within the response object
    $.ajax({
      type: "GET",
      url: `https://www.omdbapi.com/?t=${sanitizedMovieQuery}&apikey=a6b04247`,
      success: function (data) {
        console.log("TITLE", data.Title);
        console.log("GENRE", data.Genre);
        console.log("PLOT", data.Plot);
        console.log("POSTER", data.Poster);
        console.log("RATED", data.Rated);
        console.log("IMDB RATING", data.imdbRating);
        console.log("RELEASED", data.Released);
        console.log("RUNTIME", data.Runtime);
        console.log("TYPE", data.Type);
      },
    })
  })

  //Event handler for when the restaurants button is submitted
  $restaurantsForm.submit(function (event) {
    event.preventDefault(); //will not submit the old fashioned way, we want to submit an ajax request instead

    const queryString = "";

    $.ajax({
      type: "GET",
      url: ``,
      success: function (data) {
        console.log(data);
      },
    })
  })

  //Event handler for when the products button is submitted
  $productsForm.submit(function (event) {
    event.preventDefault(); //will not submit the old fashioned way, we want to submit an ajax request instead

    const queryString = "";

    $.ajax({
      type: "GET",
      url: ``,
      success: function (data) {
        console.log(data);
      },
    })
  })
  //Event handler for when the books button is submitted
  $booksForm.submit(function (event) {
    event.preventDefault(); //will not submit the old fashioned way, we want to submit an ajax request instead

    //jQuery variable that takes the users book and author query input and stores into variables
    const $bookInputFromUser = $('#book-query').val();
    const $authorInputFromUser = $('#author-query').val();

    //function to sanitize the users book and author inputs into correct format for API use
    function sanitizeBookAndAuthorQuery(userInput) {
      const sanitizeBookOrAuthorString = userInput.trim().replace(/[^a-zA-Z]/g, " ").trim().replace(/ /g, "+");
      return sanitizeBookOrAuthorString
    }

    //storing the user inputs into new variables by running it as parameter in sanitize function
    const sanitizedBookQuery = sanitizeBookAndAuthorQuery($bookInputFromUser);
    const sanitizedAuthorQuery = sanitizeBookAndAuthorQuery($authorInputFromUser);

    // console.log($bookInputFromUser);
    // console.log($authorInputFromUser);
    // console.log(sanitizedBookQuery);
    // console.log(sanitizedAuthorQuery);

    // const queryTitle = "brave+new+world";
    // const queryAuthor = "aldous+huxley";

    //ajax request for googles book api, returns a series of statements with required information that is contained within the response object
    $.ajax({
      type: "GET",
      url: `https://www.googleapis.com/books/v1/volumes?q=${sanitizedBookQuery}+inauthor:${sanitizedAuthorQuery}&key=AIzaSyADHzbY7CBGfxvALFDuOC6R4OenddipLBM`,
      success: function (data) {
        console.log("TITLE:", data.items[0].volumeInfo.title);
        console.log("AUTHOR:", data.items[0].volumeInfo.authors);
        console.log("DESCRIPTION:", data.items[0].volumeInfo.description);
        console.log("THUMBNAIL:", data.items[0].volumeInfo.imageLinks.thumbnail);
        console.log("TYPE:", data.items[0].volumeInfo.printType);
        console.log("PUBLISHER:", data.items[0].volumeInfo.publisher);
        console.log("PUBLISH DATE:", data.items[0].volumeInfo.publishedDate);
      },
    })
  })

});
