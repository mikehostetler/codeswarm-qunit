//realy not sure of any of this yet

exports.workerImage = 'sauce';

var path = require('path');
var runner = require('run-qunit');


exports.init = init;

function init(cb) {
  process.nextTick(cb);
}


exports.prepare = prepare;

function prepare(build, stage) {
  //TODO: probably prepare the qunit server here
  stage.end();
}


exports.test = test;

function test(build, stage) {
  //TODO: cwd, file
  var cwd = '';
  var file = '';

  var opts = {
    testfile : path.join(cwd, file),
    testdir: cwd,
    port: process.env.QUNIT_PORT || 8031,
    path: cwd,
    useID : true,
    middleware : [],
    progressCB: function(err, data){
      //TODO: test stdout
      console.log("QUnit Progress (Job " + data.id + ") " + data.tests_run + " tests run");
      if (data.tracebacks){
        for (var i = 0; i < data.tracebacks.length; i++){
          //TODO: test stderr
          console.log(data.tracebacks[i]);
        }
      }
      console.log("QUnit Progress", data);
    }
  };

  console.log("file: %s", opts.testfile);
  console.log("Setting up qunit server");

  var handler = function(results) {
    //TODO: test stdout
    console.log(results);
    stage.end();
  };

  runner.start(opts, handler, function(){
    //TODO: test stdout
    console.log("QUnit Runner Started");
  });

}

// exports.analyze = ...
// exports.deploy = ...
// exports.cleanup = ...