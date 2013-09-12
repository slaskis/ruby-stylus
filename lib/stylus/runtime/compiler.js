var stylus = require('stylus');

function compile(str, options, plugins, imports, defines) {
  var style = stylus(str, options);
  var output = '';

  for(var name in defines){
    style.define(name,defines[name]);
  }
  for(var name in plugins) {
    var fn = require(name);
    style.use(fn(plugins[name]));
  }
  imports.forEach(function(path) {
    style.import(path);
  })

  style.render(function(error, css) {
    if(error) throw error;
    output = css;
  })
  return output;
}

function convert(str) {
  return stylus.convertCSS(str);
}

function version() {
  return stylus.version;
}