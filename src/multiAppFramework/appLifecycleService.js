/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';

	angular
		.module('multiAppFramework')
		.service('AppLifecycleService', service);

	function service($rootElement, $window) {
		var appId = angular.element($rootElement).attr('id');
		return {
			getAppId: getAppId,
			close: close,
			saveAndClose: saveAndClose
		};

		function getAppId() {
			return appId;
		}

		function close() {
			destroy(false);
		}

		function saveAndClose() {
			destroy(true);
		}

		function destroy(save) {
			var element = angular.element($rootElement);
			element.scope().$broadcast('appClose', { saveRequested: save });
			element.scope().$destroy();
			element.remove();
			if (save) {
				var event = new CustomEvent('tombstone', { detail: appId });
				$window.dispatchEvent(event);
			}
		}
	}
	service.$inject = ['$rootElement', '$window'];
})();