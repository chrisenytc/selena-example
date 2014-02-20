/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

selenaApp.factory('Tasks', function($resource) {
	return $resource('/tasks_api/:id', {
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		}
	});
});