/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

module.exports = {

	/*
	 * GET /tasks
	 */

	requireLogin: true,

	index: function(req, res) {
		res.render('tasks/index');
	},
	new: function(req, res) {
		res.render('tasks/new');
	},
	edit: function(req, res) {
		res.render('tasks/edit');
	}

};