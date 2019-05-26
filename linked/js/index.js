
  'use scrict';

  var romajsODApp = angular.module('romajsODApp', []);

  romajsODApp.controller("opendata", function($scope, $http){

    var datasets = {
      camera: {
        url: 'http://localhost:3030/harry',
        format: 'json',
        limit: '100'
      }
    };

    var sparqlCamera = new Sparql(datasets.camera, $http);

    $scope.results = [];

    $scope.wanted = '';
    
    $scope.clean = function(){
      $scope.results = [];
      $scope.progress = '';
      $scope.wanted = '';
    };

    $scope.search = function(){
      $scope.results = [];
      $scope.progress = '...searching';

      var q = 'prefix dc: <http://purl.org/dc/elements/1.1/>'+
              'SELECT ?object '+
              'WHERE { '+
              	'?object dc:creator "'+$scope.wanted+'"'+
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
