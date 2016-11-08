var less = require('less');

exports.translate = function(load) {
    return new Promise(function (resolve, reject) {
        less.render(load.source, function(e, output) {
            resolve(output.css.replace(/\n/g, ' '));
        });
    }).then(function (output) {
        // Based on https://github.com/systemjs/plugin-text (MIT)
        if (this.builder && this.transpiler) {
            load.metadata.format = 'esm';
            return 'exp' + 'ort var __useDefault = true; exp' + 'ort default ' + JSON.stringify(output) + ';';
        }
          
        load.metadata.format = 'amd';
        return 'def' + 'ine(function() {\nreturn ' + JSON.stringify(output) + ';\n});';
    }.bind(this));
}
