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
