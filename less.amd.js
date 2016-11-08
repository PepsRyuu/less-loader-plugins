define(function() {

    var less;

    function escape (content) {
        return content.replace(/(['\\])/g, '\\$1')
            .replace(/[\f]/g, "\\f")
            .replace(/[\b]/g, "\\b")
            .replace(/[\n]/g, "\\n")
            .replace(/[\t]/g, "\\t")
            .replace(/[\r]/g, "\\r")
            .replace(/[\u2028]/g, "\\u2028")
            .replace(/[\u2029]/g, "\\u2029");
    }

    function writeModule(content) {
        return 'define(function() { return \'' + escape(content) + '\';});\n';
    }

    function fetch(url, callback, config) {
        if (config.isBuild) {
            var file = require('fs').readFileSync(url, 'utf8');
            callback(file);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function() {
                callback(xhr.responseText);
            };
            xhr.send();
        }
    }

    return {
        load: function(filename, req, onload, config) {
            var url = req.toUrl(filename);
            var _fetch = function () {
                fetch(url, function (content) {
                    less.render(content, function(e, output) {
                        onload(output.css.replace(/\n/g, ' '));
                    });
                }, config);
            };

            if (!less) {
                if (config.isBuild) {
                    less = require.nodeRequire('less');
                    _fetch();
                } else {
                    require(['less'], function (theLess) {
                        less = theLess;
                        _fetch();
                    });
                }
            } else {
                _fetch();
            }
        },

        writeFile: function(pluginname, filename, req, write, config) {
            this.load(filename, req, function(content) {
                content = writeModule(content);
                write.asModule(pluginname + '!' + filename, filename, content);
            }, config);
        }   
    };

});