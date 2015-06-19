/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';

	angular
		.module('app')
		.controller('FollowUpController', Controller);

	function Controller($scope, followUpService, appLifecycleService, stateSaveService) {
		var vm = this;
		vm.fullName = '';
		vm.email = '';
		vm.notes = '';

        vm.create = function () {
			var data = {
				fullName: vm.fullName,
				email: vm.email,
				notes: vm.description
			};
			followUpService.save(data);
			vm.close();
        };

		vm.clearForm = function () {
			vm.fullName = '';
			vm.email = '';
			vm.notes = '';
		};

		vm.close = function () {
			appLifecycleService.close();
		};

		vm.saveAndClose = function () {
			appLifecycleService.saveAndClose();
		};

		function init() {
			var appId = appLifecycleService.getAppId();
			var key = appId + ':followUpController';
			var savedData = stateSaveService.load(key);
			angular.extend(vm, savedData);
			$scope.$on('appClose', function (e, appInfo) {
				if (appInfo.saveRequested) {
					stateSaveService.save(key, vm);
				}
			});
			$scope.$on('$destroy', function (e) {
				// do any cleanup here
			});
		}
		init();
	};
	Controller.$inject = ['$scope', 'FollowUpService', 'AppLifecycleService', 'StateSaveService'];
})();