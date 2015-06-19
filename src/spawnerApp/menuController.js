/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';

	angular
		.module('spawnerApp')
		.controller('MenuController', Controller);

	function Controller($window, $scope, appStageService) {
		var vm = this;
		vm.tombstonedAppIds = [];
		
		vm.addApp = function () {
			appStageService.addApp();
		};
		
		vm.restoreApp = function (appId) {
			vm.tombstonedAppIds.splice(vm.tombstonedAppIds.indexOf(appId), 1);
			appStageService.addApp(appId);
		};
		
		function init() {
			$window.addEventListener('tombstone', function (e){
				vm.tombstonedAppIds.push(e.detail);
				$scope.$apply();
			});
		}
		init();
	}
	Controller.$inject = ['$window', '$scope', 'AppStageService'];
})();