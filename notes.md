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