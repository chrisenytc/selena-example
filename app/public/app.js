/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

window.selenaApp = angular.module('selenaApp', ['ngRoute', 'ngResource', 'ngCookies', 'ngMd5', 'ngLivi18n']).
config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		//Routes
		$routeProvider
			.when('/', {
				controller: 'indexCtrl',
				templateUrl: '/views/index.html'
			})
			.when('/tasks', {
				controller: 'tasksCtrl',
				templateUrl: '/views/tasks.html'
			})
			.when('/tasks/new', {
				controller: 'tasksCtrl',
				templateUrl: '/views/new_task.html'
			})
			.when('/tasks/:slug/edit', {
				controller: 'tasksCtrl',
				templateUrl: '/views/edit_task.html'
			});
		//Enable html
		$locationProvider.html5Mode(true);
	}
]);