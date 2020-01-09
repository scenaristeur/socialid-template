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
