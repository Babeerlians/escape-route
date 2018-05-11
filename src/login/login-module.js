import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

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
      <label>Login</label>
    `;
  }

  ready() {
    super.ready();
    console.log('Login');
  }
}

window.customElements.define('login-module', LoginModule);
