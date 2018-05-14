import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '../styles/shared-styles.js';

// define the element's class element
class EscapeMates extends PolymerElement {
    static get template() {
        return html`
         <style include="shared-styles">
            :host {
                display: block;

                padding: 10px;
            }        
            paper-button.red {
                background-color: red;
                color: white;
            }
        </style>
        <div class="card">
            <paper-button raised noink class="red" on-click="_getMates">Mates</paper-button>
            <paper-button raised noink class="red" on-click="_logout">Log out</paper-button>
        </div>
        `;
    }

    _getMates() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.displayName);
            } else {
                console.log("error de mates");
            }
        });
    }

    _logout() {
        firebase.auth().signOut().then(function () {
            console.log("chao");
        }, function (error) {
            console.log("sigues logueado");
        });
    }
}


window.customElements.define('escape-mates', EscapeMates);