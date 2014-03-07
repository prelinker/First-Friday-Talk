var app = angular.module('app', ['ngRoute', 'ngResource']);
app.config(['$routeProvider' , '$httpProvider', function($routeProvider, $httpProvider){
	$httpProvider.interceptors.push(function($q, NotificationService, $location) {
	  return {
	    'responseError': function(rejection) {
				NotificationService.add("Resource not found");
				$location.path("/");
	      return $q.reject(rejection);
	    }
	  };
	});
	$routeProvider
		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})
		.when('/add', {
			templateUrl : 'pages/add.html',
			controller  : 'mainAddController'
		})
		.when('/edit/:id', {
			templateUrl : 'pages/edit.html',
			controller  : 'mainEditController'
		})
}]);

app.factory("NotificationService", ['$timeout', function($timeout){
	var notifications = [];
	var time;
	return {
		add : function(notification) {
			notifications.push(notification);
			time = $timeout(function(){
				var idx = notifications.indexOf(notification);
				notifications.splice(idx, 1);
			}, 5000);
		},
		notifications : function() {
			return notifications;
		}
	 };
}])

app.factory("FftService", ['$resource', function($resource){
	return $resource("/api/fft/:id", {id:'@_id'}, {
		update : {method : 'PUT'}
	});
}]);

app.directive("notification", ['NotificationService', function(NotificationService){
	return {
		restrict: 'E',
	  templateUrl: 'notification.html',
		link : function(scope, element, attr){
			scope.notifications = NotificationService.notifications();
		}
	 };
}]);

app.controller("mainController", ['$scope', 'FftService', 'NotificationService', function($scope, FftService, NotificationService){
	$scope.ffts = FftService.query();
	$scope.delete = function(fft) {
		var oldname = fft.name
		var idx = $scope.ffts.indexOf(fft);
		fft.$delete(function(data){
			$scope.ffts.splice(idx, 1);
			NotificationService.add(oldname + " supprimé");
		});
	}
}]);

app.controller("mainAddController", ['$scope', 'FftService', '$location', 'NotificationService',  function($scope, FftService, $location, NotificationService){
	$scope.fft = new FftService();
	$scope.submit = function(){
			$scope.fft.$save(function(data){
				if(data) {
					$location.path("/");
					NotificationService.add($scope.fft.name + " ajouté");
				}
			});
	}
}]);

app.controller("mainEditController", ['$scope', 'FftService', '$routeParams', '$location', 'NotificationService', function($scope, FftService, $routeParams, $location, NotificationService){
	$scope.fft = FftService.get({id:$routeParams.id});
	$scope.submit = function(fft){
		var name = $scope.fft.name;
		$scope.fft.$update(function(data){
			if(data.success) {
				NotificationService.add(name + " modifié");
				$location.path("/");
			}
		});
	}
}]);