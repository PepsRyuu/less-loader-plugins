# less-loader-plugins

LESS plugins for various loaders. 

While other plugins do exist online, the problem I've noticed with a lot of them is that they are over-complicated and inject automatically into the head tag. Because they automatically inject, this puts a runtime dependency on the plugin. Adding the style should be handled by the developer. All of these plugins work on that principle, and there's no plans to add this feature.

## Why not use SASS and Webpack?

* I prefer portability of code and not having to be forced to use certain tools to run my app in development. 
* There's really no noticeable performance difference whether or not the server does the compilation or the client does.
* Have you seen the code for [SASS on the browser](https://raw.githubusercontent.com/medialize/sass.js/master/dist/sass.worker.js)? Impossible to debug if you run into issues. Also unsupported by the SASS team who are developing their tool using Ruby which is another tool that needs to be installed.
* Commonly used functionality is practically identical between LESS and SASS.

## Supported Loaders

### less.amd.js

Used by Lamda or any other AMD loader. Configure your require configuration to add the following mappings:

```javascript
var require = {
    paths: {
        "less": "<node_modules>/less/dist/less",
        "styles": '<node_modules>/less-loader-plugins/less.amd' 
    }  
};
```

You can then use the plugin syntax to load LESS files: 

```javascript
define([
    'styles!./MyStyles.less'
], function (styles) {
    // Attach styles to head tag. 
});
```

### less.systemjs.js

Used by SystemJS. Configure the SystemJS configuration file to add the following mappings: 

```javascript
 System.config({
    paths: {
        'npm:': 'node_modules/'
    },

    map: {
        'styles': 'npm:less-loader-plugins/less.systemjs.js',
        'less': 'npm:less/dist/less.js'
    },
    packages: {
        src: {
            meta: {
                '*.less': {
                    loader: 'styles'
                }
            }
        }
    }
});
```

You can then import styles using the following in your code: 

```javascript
import styles from './MyStyles.less';

// Attach styles to head tag.
```