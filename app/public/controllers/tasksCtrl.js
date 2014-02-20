/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

selenaApp.controller('tasksCtrl', ['$scope', '$location', '$routeParams', 'md5', 'Tasks',
	function tasksCtrl($scope, $location, $routeParams, md5, Tasks) {
		//Provide Status
		$scope.status = function(data) {
			if (data) {
				return 'list-item-moderate';
			} else {
				return 'list-item-publish';
			}
		};

		//Provide Gravatar
		$scope.email = function(email) {
			return md5.createHash(email || '');
		};

		//List Tasks
		$scope.load = function() {
			$scope.tasks = Tasks.query();
		};

		if ($location.path() === '/tasks') {
			$scope.load();
		}

		//Create
		$scope.new = function() {
			var newTask = new Tasks();
			newTask.title = this.title;
			newTask.slug = this.slug;
			newTask.content = this.content;
			newTask.$save();
			//Clear
			$scope.title = '';
			$scope.slug = '';
			$scope.content = '';
			alert('Task created successfully!');
			$location.url('tasks');
		};

		//Edit Task
		if ($location.path() === '/tasks/' + $routeParams.slug + '/edit') {
			$scope.task = Tasks.get({}, {
				id: $routeParams.slug
			});
		}

		//Update
		$scope.update = function() {
			var Task = {};
			Task.title = this.task.title;
			Task.slug = this.task.slug;
			Task.content = this.task.content;
			Tasks.update({
				id: $routeParams.slug
			}, Task, function() {
				$scope.task = {};
				alert('Task updated successfully!');
				$location.url('tasks');
			});
		};

		//Close Task
		$scope.closeTask = function(slug) {
			Tasks.update({
				id: slug
			}, {
				closed: true
			}, function() {
				$scope.load();
			});
		};

		//Delete Task
		$scope.removeTask = function(slug) {
			var confirmDelete = confirm('Are you sure you want to delete this task?');

			if (confirmDelete) {
				Tasks.delete({
					id: slug
				}, function() {
					alert('Task removed successfully!');
					$scope.load();
				});
			}
		};
	}
]);