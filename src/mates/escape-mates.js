import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';

// define the element's class element
class EscapeMates extends PolymerElement {
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
        <paper-button raised noink class="red" on-click="getMates">Mates</paper-button>
        <paper-button raised noink class="red" on-click="logout">Log out</paper-button>

        `;
    }



    ready() {
        super.ready();
    }

    getMates() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.displayName);
            } else {
                console.log("error de mates");
            }
        });
    }

    logout() {
        firebase.auth().signOut().then(function () {
            console.log("chao");
        }, function (error) {
            console.log("sigues logueado");
        });
    }
}


window.customElements.define('escape-mates', EscapeMates);