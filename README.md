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
<footer>
<a href="https://github.com/scenaristeur/socialid" target="_blank">source</a>
</footer>
</body>
</html>

```


**webpack.config.js**

```
const path = require('path');

module.exports =
{
  entry: {
    app: './src/component/app-element.js',
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
        performance: {
          hints: false
        }
      };

```

-  add start & build scripts to package.json


```

      ...
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack-dev-server -d --hot --config webpack.config.js --watch",
        "build": "webpack"
        },
        ...

```

- launch webpack dev server with

```
        npm run start

```

        it opens the index.html in your dist folder on http://localhost:9000

        then we need to populate the src/component/app-element.js and can use lit-element for this


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
            Hello <b>${this.something}</b> from app-element
            `;
          }

        }

        customElements.define('app-element', AppElement);

```

# Some Solid webcomponents

- login-element
        first create a basic login-element (there is a model at src/component/modele-element, just duplicate that file & change 'ModeleElement' (2 times) & 'modele-element')

**src/component/login-element.js**

```
        import { LitElement, html } from 'lit-element';

        class LoginElement extends LitElement {

          static get properties() {
            return {
              webId: {type: String},
            };
          }

          constructor() {
            super();
            this.webId = "nobody"
          }

          render(){
            return html`
            <button>Login</button>
            <button>Logout</button>
            ${this.webId}
            `;
          }

        }

        customElements.define('login-element', LoginElement);

```

        next we will need to import 'solid-auth-client' module

```
        npm install --save solid-auth-client
```




        we need  to add the 'solid-auth-client' popup to our dist folder

```
        cp -r node_modules/solid-auth-client/dist-popup/ dist

```

        and update login-element like this

```
        import { LitElement, html } from 'lit-element';
        import * as auth from 'solid-auth-client'

        class LoginElement extends LitElement {

          static get properties() {
            return {
              webId: {type: String},
            };
          }

          constructor() {
            super();
            this.webId = null
          }

          render(){
            return html`
            <!-- if this.webId == null , login button is diaplayed -->
            ${this.webId == null ?
              html`
              <button @click=${this.login}>Login</button>
              `
              : html`
              <!-- else logout button is displayed -->
              <button @click=${this.logout}>Logout</button>
              ${this.webId}
              `
            }
            `;
          }

          firstUpdated(){
            auth.trackSession(session => {
              if (!session){
                this.webId=null
              }
              else{
                this.webId = session.webId
              }
              })
            }

            login(event) {
              this.popupLogin();
            }

            logout(event) {
              auth.logout().then(() => alert('Goodbye!'));
            }

            async popupLogin() {
              let session = await auth.currentSession();
              let popupUri = './dist-popup/popup.html';
              if (!session)
              session = await auth.popupLogin({ popupUri });
            }

          }

          customElements.define('login-element', LoginElement);

```

- Now you have your first Solid component, you can add it to your src/component/app-element.js

**src/component/app-element.js**

```
          import { LitElement, html } from 'lit-element';

          import './login-element.js'

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
              Hello <b>${this.something}</b> from app-element !
              <login-element></login-element>
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

- build & publish to gh-pages

```
          npm run build && git subtree push --prefix dist origin gh-pages

```

- short cut for publish a change to gh-pages
```
          npm run build
          git add .
          git commit -m "app updated"
          git push
          git subtree push --prefix dist origin gh-pages

```
