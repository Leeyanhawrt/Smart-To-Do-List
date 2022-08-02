// //This script file is for any JavaScript helper functions that were created and used in the app.js or elsewhere

// //function to sanitize the users input into correct format for Movie API use
// const sanitizeMovieQuery = function(userInput) {
//   const sanitizedMovieString = userInput.trim().replace(/[^a-zA-Z]/g, " ").trim().replace(/ /g, "%20");
//   return sanitizedMovieString
// }

// //function to sanitize the users book and author inputs into correct format for Books API use
// const sanitizeBookAndAuthorQuery = function(userInput) {
//   const sanitizeBookOrAuthorString = userInput.trim().replace(/[^a-zA-Z]/g, " ").trim().replace(/ /g, "+");
//   return sanitizeBookOrAuthorString
// }

// //function to handle the movies user query and corresponding api request response data and convert into temporary object
// function apiMoviesQueryToObject(apiResponseData) {
//   const movieQueryObject = {
//     "TITLE": apiResponseData.Title,
//     "GENRE": apiResponseData.Genre,
//     "PLOT": apiResponseData.Plot,
//     "POSTER": apiResponseData.Poster,
//     "RATED": apiResponseData.Rated,
//     "IMDB RATING": apiResponseData.imdbRating,
//     "RELEASED": apiResponseData.Released,
//     "RUNTIME": apiResponseData.Runtime,
//     "TYPE": apiResponseData.Type,
//   };
//   return movieQueryObject;
// }

// //function to handle the books user query and corresponding api request response data and convert into temporary object
// function apiBooksQueryToObject(apiResponseData) {
//   const booksQueryObject = {
//     "TITLE": apiResponseData.items[0].volumeInfo.title,
//     "AUTHOR": apiResponseData.items[0].volumeInfo.authors,
//     "DESCRIPTION": apiResponseData.items[0].volumeInfo.description,
//     "THUMBNAIL": apiResponseData.items[0].volumeInfo.imageLinks.thumbnail,
//     "TYPE": apiResponseData.items[0].volumeInfo.printType,
//     "PUBLISHER": apiResponseData.items[0].volumeInfo.publisher,
//     "PUBLISH DATE": apiResponseData.items[0].volumeInfo.publishedDate,
//   };
//   return booksQueryObject;
// }

function sanitizeMovieQuery(userInput) {
  const sanitizedMovieString = userInput.trim().replace(/[^a-zA-Z0-9]/g, " ").trim().replace(/ /g, "%20");
  return sanitizedMovieString
}

function sanitizeFoodBusinessQuery(userInput) {
  const sanitizeFoodBusinessString = userInput.trim().replace(/[^a-zA-Z0-9]/g, " ").trim().replace(/ /g, "");
  return sanitizeFoodBusinessString
}

module.exports = {
  sanitizeMovieQuery,
  sanitizeFoodBusinessQuery
};

// module.exports = {
//   sanitizeMovieQuery,
//   sanitizeBookAndAuthorQuery,
//   apiMoviesQueryToObject,
//   apiBooksQueryToObject,
// };
