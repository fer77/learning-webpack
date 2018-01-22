## 1

- `npm init -y` quickly scaffolds a `package.json` file.
- `npm install webpack --save-dev`
- `webpack src/main.js dist/bundle.js` just to quickly compile code.

`package.json`
---

```javascript
//...
"scripts": {
    // commands can be added here
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack src/main.js dist/bundle.js",
    // and also referenced for other commands.
    "watch": "npm run build --watch"
    // when referencing commands a -- may have to be attached to attach a flag to a referenced command
    // "watch": "npm run build -- --watch"
  },
//...
```

`--`special option for running [custom arguments](https://docs.npmjs.com/cli/run-script) when executing scripts.

## 2

When the `webpack.config.js` file sits in the root of the project it the command `webpack` will automatically look for that file there. However if it is somewhere elese add the `--config=` flag to specify the path the file is located:

```bash
webpack --config="node_modules"
```

`package.json`
---

```javascript
//...
"scripts": {
    // this
    "build": "webpack src/main.js dist/bundle.js",
    // can now read:
    "build": "webpack"
  },
//...
```

## 3

**modules** 'fancy' word for _file_. These files can export a number of things: classes, objects, functions...

Relative paths are not needed for node modules in a project.

Default Export vs Named Export
---

**Default Export (export default)**
You can have one default export per file. When you import you have to specify a name and import like so:

```javascript
import MyDefaultExport from "./MyFileWithADefaultExport";
```

You can give this any name you like.

**Named Export (export)**
With named exports, you can have multiple named exports per file. Then import the specific exports you want surrounded in braces:

```javascript
// ex. importing multiple exports:
import {MyClass, MyOtherClass} from "./MyClass";
// ex. giving a named import a different name by using "as":
import {MyClass2 as MyClass2Alias} from "./MyClass2";

// use MyClass, MyOtherClass, and MyClass2Alias here
```

Or import all the named exports onto an object:

```javascript
import * as MyClasses from "./MyClass";
// use MyClasses.MyClass and MyClass.MyOtherClass here
```

## 4

**loaders** allows the bundle of static resources beyond JavaScript. Loaders can be written using Node.js. 

css loader:
tells webpack how to interact/use css files.

```bash
npm install css-loader --save-dev
```

```javascript
//...
module: {
        rules: [
            {
              // specify which files it should apply to:
                test: /\.css$/,
              // specify what loader to use:
                use: 'css-loader'
            }
        ]
    }
//...
```

```bash
npm install style-loader --save-dev
```

takes the css from the build file and inject it into the page.

```javascript
//...
module: {
        rules: [
            {
              //...
                use: ['style-loader', 'css-loader']// Reads from right to left.
            }
        ]
    }
//...
```

## 5

[Babel](https://babeljs.io/)

- require babel in the project:
`npm install --save-dev babel-loader babel-core`
- add babel to rules:
`{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }`
- install presets:
`npm install --save-dev babel-preset-es2015`
- create `.babelrc` file to add plugins:
`{ "presets": ["es2015"] }`

## 6

_plugins_ are the 'bedrock' of webpack.

minification:

```javascript
// webpack.config.js
//...
    plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
//...
```

Often, you'll want to use one set of configuration for development, and another set for production:

```javascript
//package.json
//...
"scripts": {
    //...
    "dev": "webpack",
    "production": "NODE_ENV=PRODUCTION webpack",
    //...
  },
  //...
```

## 7

sass compilation
remember, _loaders_ help webpack understand what it (webpack) needs to do and how to do it.

- This compiles SASS to CSS
`npm install sass-loader node-sass --save-dev`

_sass-loader_ compiles sass to css.

_css-loader_ updates imports and url calls. Allows minification and wraps css in a _common.js_ module so webpack can read it.

_style-loader_ "physically" injects styles into the DOM

## 8
to extract css:

[Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
- `npm install --save-dev extract-text-webpack-plugin`

To use a "generic" name for the style sheet a _place holder_ can be used in the `config `file:

```javascript
// webpack.config.js
//...
},
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};
//...
```

for the `entry` in the `webpack.config.js` file an object can be used:

```javascript
//webpack.config.js
//...
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
//...
```

would create an `app.css` (name of entry point) and a `bundle.js` (explicit name for the output).

instead of `require('./main.scss');` in the `main.js` file it can be required in the `webpack.config.js` file, by adding it to the app entry point:

```javascript
// webpack.config.js
//...
    entry: {
        app: [
            './src/main.js',
             './src/main.scss'
            ]
    },
//...
```

[loader options](https://webpack.js.org/plugins/loader-options-plugin/)

- `options.minimize` (`boolean`): Where loaders can be switched to minimize mode.

add the variable created to tell webpack when in prod or dev instead of the boolean option:

```javascript
//webpack.config.js
//...
    plugins: [
        new ExtractTextPlugin('[name].css'),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        })
    ]
//...
```

## 8

- Relative URLs within your stylesheets reads it as absolute paths (useful when using a legacy project).

- pass an option to _css-loader_ (useful when using a legacy project).

```javascript
//webpack.config.js
//...
use: [{
        loader: 'css-loader',
        options: { url: false }
    },

    'sass-loader'
]
//...
```

- use a pluging like _raw-loader_ (useful when using a legacy project).

```javascript
//webpack.config.js
//...
    use: ['raw-loader', 'sass-loader'],
//...
```

- _file\_loader_

```javascript
//webpack.config.js
//...
{
    test: /\.png$/,
    loader: 'file-loader',
    options: {
        name: 'images/[name].[hash].[ext]'
    }
},
//...
```

## 9

Strip unused css

- `npm i -D purifycss-webpack purify-css`

```javascript
// webpack.config.js
plugins: [
    //...

        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'app/*.html')),
            minimize: inProduction
        }),

    //...
    ]
```

This plugin works with classes, id's, and selectors.

## 10

`[hashs]` webpack will genereate a unique hash for the build file. But will be applied to all files, even if no changes have occured on those files.

`[chunkhash]` will generate a unique hash for each build file and apply it only to the files that were changed.

clearing `dist` folder:

- `npm i clean-webpack-plugin --save-dev`

## 11

If the file hash keeps changing, we can no longer hardcode the path. Instead, let webpack can generate a `manifest.json` file. This way, the path can be dynamically determined and the proper hash fetched.

## 12

Image optimization

`npm install img-loader --save-dev`

## 13

All webpack plugins have a general ES5 constructor:

```javascript
function BuildManifestPlugin() {
    //...
}
```

and an apply method on its prototype:

```javascript
BuildManifestPlugin.prototype.apply = function(compiler) {
    //...
}
```

finnally export the plugin:

```javascript
module.exports = BuildManifestPlugin;
```