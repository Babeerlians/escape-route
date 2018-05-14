import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';

// define the element's class element
class LoginButton extends PolymerElement {
    static get template() {
        return html`
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



    ready() {
        super.ready();
    }

    logIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(provider).then(function (result) {

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log(token);

        }).catch(function (error) {

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });


    }
}


window.customElements.define('login-button', LoginButton);