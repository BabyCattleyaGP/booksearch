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

  $scope.clearResults = function() {
    $scope.results_books = [];
    $("#query").text( "" );
  }

}]);
