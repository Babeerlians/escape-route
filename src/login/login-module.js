import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../login/login-button.js';
/**
 * @customElement
 * @polymer
 */
class LoginModule extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <label>Log in</label>
      <login-button>Login</login-button>
    `;
  }

  ready() {
    super.ready();
    console.log('Login');
  }
}

window.customElements.define('login-module', LoginModule);
