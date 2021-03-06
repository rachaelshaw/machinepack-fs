module.exports = {


  friendlyName: 'Read file',


  description: 'Read a file on disk as a string.',


  extendedDescription: 'Assumes file contents are encoded using utf8.',


  cacheable: true,


  inputs: {

    source: {
      description: 'Absolute path to the source file (if relative path is provided, will resolve path from current working directory)',
      example: '/Users/mikermcneil/.tmp/foo',
      required: true
    }

  },


  exits: {

    doesNotExist: {
      description: 'No file exists at the provided `source` path'
    },

    success: {
      example: 'stuff in a file!',
      description: 'Returns the contents of the file at `source` path'
    }

  },


  fn: function (inputs, exits) {

    var fs = require('fs');

    fs.readFile(inputs.source, 'utf8', function (err, contents) {
      // It worked!
      if (!err) {
        return exits.success(contents);
      }
      // No need for `null` check here because we already know `err` is falsy
      if (typeof err === 'object' && err.code === 'ENOENT') {
        return exits.doesNotExist();
      }
      // Some unrecognized error
      return exits.error(err);
    });
  }
};
