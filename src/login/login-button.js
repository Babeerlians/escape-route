import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js'

// define the element's class element
class LoginButton extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
            }
        </style>
        <paper-button raised>Login</paper-button>
        `;
    }

    ready() {
        super.ready();
    }

}


window.customElements.define('login-button', LoginButton);