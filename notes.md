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