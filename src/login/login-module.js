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
       <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
      <div class="card">
        <login-button>Login</login-button>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.dispatchEvent(new CustomEvent('logged', {detail: {user: user}}));
      }
    });
  }
}

window.customElements.define('login-module', LoginModule);
