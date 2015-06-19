/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';

	angular
		.module('multiAppFramework')
		.service('StateSaveService', service);

	function service($window) {
		return {
			save: save,
			load: load
		};
		
		function save(key, value) {
            $window.localStorage.setItem(key, JSON.stringify(value));
		}
		
		function load(key) {
			var value = JSON.parse($window.localStorage.getItem(key));
			$window.localStorage.removeItem(key);
			return value;
		}
	}
	service.$inject = ['$window'];
})();