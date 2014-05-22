'use strict';

angular.module('countingDown.controllers')
.controller('TimeLeftCtrl', function ($scope, $timeout, $moment) {

  var testTime = 1411088460;

  $scope.years = 0;
  $scope.days = 0;
  $scope.hours = 0;
  $scope.minutes = 0;
  $scope.seconds = 0;

  var secondsPerYear = 31557600;
  var secondsPerDay = 86400;
  var secondsPerHour = 3600;
  var secondsPerMinute = 60;

  var quotientWithRemainder = function (numerator, denominator) {

    var remainder = numerator % denominator;
    var temp = numerator - remainder;
    var quotient = temp / denominator;

    return {
      quotient: quotient,
      remainder: remainder
    };
  };


  var parseSecondsToPrettyTime = function (seconds) {

    var time = {};

    var tmp = quotientWithRemainder(seconds, secondsPerYear);
    time.years = tmp.quotient;

    tmp = quotientWithRemainder(tmp.remainder, secondsPerDay);
    time.days = tmp.quotient;

    tmp = quotientWithRemainder(tmp.remainder, secondsPerHour);
    time.hours = tmp.quotient;

    tmp = quotientWithRemainder(tmp.remainder, secondsPerMinute);
    time.minutes = tmp.quotient;

    time.seconds = tmp.remainder;
    return time;
  };

  var tickDown = function() {
    var now = $moment();
    var endTime = $moment.unix(testTime);
    var sumSeconds = endTime.diff(now, 'seconds');

    var parsedTime = parseSecondsToPrettyTime(sumSeconds);

    $scope.years = parsedTime.years;
    $scope.days = parsedTime.days;
    $scope.hours = parsedTime.hours;
    $scope.minutes = parsedTime.minutes;
    $scope.seconds = parsedTime.seconds;

    $timeout(tickDown, 1000);
  };

  $timeout(tickDown, 1000);

  $scope.a = 'sodfuh';

});
