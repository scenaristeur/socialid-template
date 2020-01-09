# The app
https://scenaristeur.github.io/socialid/


# Build a Solid App from Zero to Hero

* What is Solid ?
* Get a POD ?


# Structure of the App
* nodejs

initialise a nodejs app
```
mkdir socialid
npm init -y
```
* webpack
install webpack dev-dependencies

```
npm install --save-dev webpack webpack-cli webpack-dev-server
mkdir dist
touch dist/index.html
touch webpack.config.js
mkdir src
mkdir src/component
touch src/component/app-element.js

```
**dist/index.html**

```
<!doctype html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
<title>Socialid</title>
<link rel="manifest" href="/manifest.json">
</head>
<body>
<app-element name="App"></app-element>
<script src="app-element.js"></script>
</body>
</html>
```







**webpack.config.js**

```
const path = require('path');

module.exports = {
  entry: {
    app: './src/component/app-element.js',
    //  dev: './src/component/dev-element.js'
    },
    output: {
      filename: '[name]-element.js',
      path: path.resolve(__dirname, 'dist'),
      },
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
        },
        devtool: "eval-source-map",
        performance: { hints: false }
      };

      ```

      add start & build scripts to package.json


      ```

      ...
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack-dev-server -d --hot --config webpack.config.js --watch",
        "build": "webpack"
        },
        ...

        ```

        launch webpack dev server with

        ```
        npm run start

        ```

        it opens the index.html in your dist folder on http://localhost:9000

        then we need to populate some


        * lit-element (webcomponents)


        ```
        npm install --save lit-element
        ```

        **src/component/app-element.js**

        ```
        import { LitElement, html } from 'lit-element';

        class AppElement extends LitElement {

          static get properties() {
            return {
              something: {type: String},
            };
          }

          constructor() {
            super();
            this.something = "world"
          }

          render(){
            return html`
            Hello ${this.world} from app-element
            `;
          }

        }

        customElements.define('app-element', AppElement);

        ```


        * evejs ( communication between webcomponents)

        ```

        ```


        # make a gh-pages branches
        https://stackoverflow.com/questions/36782467/set-subdirectory-as-website-root-on-github-pages

        create subbranch with dist folder
        - comment the dist folder in the .gitignore file

        ```
        git add dist -f && git commit -m "Initial dist subtree commit"
        ```

        build & publish to gh-pages

        ```
                npm run build && git subtree push --prefix dist origin gh-pages

        ```
