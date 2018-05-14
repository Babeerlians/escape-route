import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-image/iron-image.js';
import '../styles/shared-styles.js';
// define the element's class element
class EscapeMates extends PolymerElement {
    static get template() {
        return html`
        <style include="shared-styles">
            :host {
                display: block;
            }
        
            paper-button.red {
                background-color: red;
                color: white;
            }
        
            .circle {
                display: inline-block;
                float:right;
                border-radius: 50%;
                background: #ddd;
                font-size: 15px;
                line-height: 64px;
            }


        </style>
        <div class="card">
            <paper-button raised noink class="red" on-click="getMates">Mates</paper-button>
            <paper-button raised noink class="red" on-click="logout">Log out</paper-button>
            <iron-flex-layout>
                <div class="circle">
                    <iron-image alt="user profile picture" src="{{user.photoURL}}" cover= "contain"></iron-image>
                </div>
                <paper-input readonly label="name" value="{{user.displayName}}"></paper-input>
                <paper-input readonly label="email" value="{{user.email}}"></paper-input>
                <paper-input readonly label="uid" value="{{user.uid}}"></paper-input>
            </iron-flex-layout>
        </div>
        `;
    }

    static get properties() {
        return {
            user: String
        }
    }

    getMates() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                this.user = user;
            } else {
                console.log("error de mates");
            }
        });
    }

    logout() {
        firebase.auth().signOut().then(() => {
            console.log("chao");
            this.user = undefined;
        }, function (error) {
            console.log("sigues logueado");
        });
    }
}


window.customElements.define('escape-mates', EscapeMates);