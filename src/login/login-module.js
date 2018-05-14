import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../login/login-button.js';
import '../styles/shared-styles.js';
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
      <div class="card">
        <login-button>Login</login-button>
      </div>
    `;
  }

  ready() {
    super.ready();
    console.log('Login');
  }
}

window.customElements.define('login-module', LoginModule);
