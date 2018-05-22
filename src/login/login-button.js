import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';

// define the element's class element
class LoginButton extends PolymerElement {
    static get template() {
        return html `
        <style is="custom-style">
            :host {
                display: block;
            }
            paper-button.red {
                background-color: red;
                color: white;
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