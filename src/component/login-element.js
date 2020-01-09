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
