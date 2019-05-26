var App = angular.module("bookApp", []);

App.controller('masterCtrl', ['$scope', function($scope) {

  var req_prefix = "https://www.googleapis.com/books/v1/volumes?q=";

  $scope.my_books = [];
  $scope.results_books = [];

  $scope.searchBooks = function(){
    if($scope.query == "" || $scope.query == undefined) {
      return;
    }

    $("#search-box").hide();
    $("#loading-box").show();

    var request = req_prefix + $scope.query;
    $.get(request, function(resp){
      console.log(resp);
      if(resp.items && resp.items.length > 0) {
        $scope.results_books = resp.items;
        $("#msg").text("");
      }
      else {
        $("#msg").text("No Results...");
      }

      $scope.$apply();
      $("#search-box").show();
      $("#loading-box").hide();
    })
    .error(function(e){
      console.log(e);
      $("#search-box").show();
      $("#loading-box").hide();
    });

    $("#query").text( $scope.query );
    $scope.query = '';
  }

  $scope.addBook = function(book){
    if($scope.my_books.indexOf(book) != -1) {
      alert("You already saved this book.");
      return;
    }
    $scope.my_books.push(book);
    $("#msg-popup").removeClass("ghost");
    $("#msg-popup-container").css("z-index", "10");
    setTimeout(function(){
      $("#msg-popup").addClass("ghost");
      $("#msg-popup-container").css("z-index", "0");
    }, 3000);
  }

  $scope.removeBook = function(book){
    var index = $scope.my_books.indexOf(book);
    $scope.my_books.splice(index, 1);
  }

  $scope.showBook = function(book) {
    $scope.current_book = book;
    $("#myModal").modal("show");
  }

  $scope.clearResults = function() {
    $scope.results_books = [];
    $("#query").text( "" );
  }

}]);
