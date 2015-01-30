/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Recruiter = require('./recruiter.model');

exports.register = function(socket) {
  Recruiter.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Recruiter.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('recruiter:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('recruiter:remove', doc);
}