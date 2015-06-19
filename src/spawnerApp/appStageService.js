/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';

	angular
		.module('spawnerApp')
		.service('AppStageService', service);

	function service($window) {
		var self = this;
		self.appsElement = $window.document.getElementById('apps');

		return {
			addApp: addApp
		};

		function addApp(appId) {
			appId = appId || createAppIdentifier();
			createApp(appId);
		};

		function createApp(appId) {
			var element = $window.document.createElement('div');
			element.id = appId;

			var followUpElement = $window.document.createElement('div');
			followUpElement.setAttribute('ng-controller', 'FollowUpController as vm');
			followUpElement.setAttribute('ng-include', "'app/followUp.html'");
			element.appendChild(followUpElement);

			self.appsElement.insertBefore(element, self.appsElement.firstChild);
			angular.bootstrap(element, ['app']);
		}

		function createAppIdentifier() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}
	}
	service.$inject = ['$window'];
})();