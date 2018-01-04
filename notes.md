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