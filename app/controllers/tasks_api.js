/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

/*
 * Module dependencies
 */
var Task = global.models.Task;

module.exports = {

  /*
   * RESOURCE tasks_api
   */

  //Require Login
  requireLogin: true,

  index: function(req, res, next) {
    Task.find({})
      .populate('user', 'name email')
      .exec(function(err, tasks) {
        if (err) {
          next(err);
        }
        res.jsonp(200, tasks);
      });
  },
  show: function(req, res, next) {
    Task.findOne({
      slug: req.params.tasks_api
    })
      .exec(function(err, task) {
        if (err) {
          next(err);
        }
        res.jsonp(200, task);
      });
  },
  create: function(req, res, next) {
    var task = new Task(req.body);
    task.user = req.user;
    task.save(function(err) {
      if (err) {
        next(err);
      }
      //Send message
      res.jsonp(200, {
        message: 'Task created successfully',
        task: req.body
      });
    });
  },
  update: function(req, res, next) {
    Task.update({
      slug: req.params.tasks_api
    }, {
      $set: req.body
    }, function(err) {
      if (err) {
        next(err);
      }
      //Send message
      res.jsonp(200, {
        message: 'Task ' + req.params.tasks_api + ' updated successfully'
      });
    });
  },
  destroy: function(req, res, next) {
    Task.remove({
      slug: req.params.tasks_api
    }, function(err) {
      if (err) {
        next(err);
      }
      //Send message
      res.jsonp(200, {
        message: 'Task ' + req.params.tasks_api + ' removed successfully'
      });
    });
  }
};