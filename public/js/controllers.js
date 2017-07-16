'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('BlockchainInfoCtrl', function ($scope,$http)  {

    $scope.trace_info = new Array();
    // write Ctrl here
    var retrieveInfo = function() {

        // Retrieve Order Info
        var order_apiPath = "/api/order";
        $http({
            method: 'GET',
            url:order_apiPath
        }).
        then(function successCallback(response) {
            $scope.order_info = response.data;
            $scope.order_info.order_time = new Date(response.data.timestamp).toLocaleString();
        }, function errorCallback(response) {
        });


      // Retrieve trace Info
      var sensor_list_apiPath = "/api/sensor/list";
      $http({
        method: 'GET',
        url:sensor_list_apiPath
      }).
      then(function successCallback(response) {
        for(var traceInfo in response.data){
          var temp_trace = JSON.parse(response.data[traceInfo]);
          if(temp_trace.sensor_info) {
            var record_time = new Date(temp_trace.sensor_info.record_timestamp * 1000).toLocaleString();
            temp_trace.record_time = record_time;
            $scope.trace_info.push(temp_trace);
          }
        }
      }, function errorCallback(response) {
      });
    };
    retrieveInfo();

  });
