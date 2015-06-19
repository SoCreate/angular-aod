/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';

	angular
		.module('app')
		.controller('FollowUpController', Controller);

	function Controller(followUpService) {
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
			vm.clearForm();
        };

		vm.clearForm = function () {
			vm.fullName = '';
			vm.email = '';
			vm.notes = '';
		};

		function init() {
		}
		init();
	};
	Controller.$inject = ['FollowUpService'];
})();