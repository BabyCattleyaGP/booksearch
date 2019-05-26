
  'use scrict';

  var romajsODApp = angular.module('romajsODApp', []);

  romajsODApp.controller("opendata", function($scope, $http){

    var datasets = {
      camera: {
        url: 'http://localhost:3030/ds',
        format: 'json',
        limit: '100'
      }
    };

    var sparqlCamera = new Sparql(datasets.camera, $http);

    $scope.results = [];
    
    $scope.clean = function(){
      $scope.results = [];
      $scope.progress = '';
    };

    $scope.search = function(){
      $scope.results = [];
      $scope.progress = '...searching';

      var q = 'prefix dc: <http://purl.org/dc/elements/1.1/>'+
              'SELECT ?object '+
              'WHERE { '+
              	'?object dc:creator  "J.K. Rowling"'+
              '} '+
              'LIMIT 25';

      sparqlCamera.search(q, function(response){

          if (response.results.bindings.length===0){
            $scope.progress = 'No results';
          }else{
            $scope.progress = '';
            $scope.results = response.results.bindings;
          }
      });
    };
  });
