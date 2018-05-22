import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '../styles/shared-styles.js';

// define the element's class element
class LoginButton extends PolymerElement {
    static get template() {
        return html`
         <style include="shared-styles">
            :host {
                display: block;
            }
        </style>
        <paper-button raised noink class="red" on-click="logIn">Login with Google</paper-button>
        `;
    }

    logIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            this.dispatchEvent(new CustomEvent('login-user', {
                detail: {
                    user: result.user
                }
            }));
        }).catch(function (error) {
            alert('Login error. ' + error.code + ' ' + error.message);
        });
    }
}

window.customElements.define('login-button', LoginButton);