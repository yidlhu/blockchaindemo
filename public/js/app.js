'use strict';

angular.module('myApp', ['myApp.controllers','ngRoute'])
    .config(['$httpProvider', function ($httpProvider) {
      //Reset headers to avoid OPTIONS request (aka preflight)
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
    }]);