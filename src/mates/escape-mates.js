import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-list/iron-list.js';
import '../styles/shared-styles.js';
// define the element's class element
class EscapeMates extends PolymerElement {
    static get template() {
        return html`
        <style include="shared-styles">
            :host {
                display: block;
            }
            .circle {
                display: inline-block;
                float: right;
                border-radius: 50%;
                background: #ddd;
                font-size: 15px;
                line-height: 200px;
            }
        </style>
        <div class="card">
            <iron-flex-layout>
                <iron-image class="circle" alt="user profile picture" src="{{user.photoURL}}" sizing="cover"></iron-image>
                <h2>Personal data</h2>
                <paper-input readonly label="name" value="{{user.displayName}}"></paper-input>
                <paper-input readonly label="email" value="{{user.email}}"></paper-input>
            </iron-flex-layout>
        </div>
        <div class="card">
            <h3>Mates</h3>
            <ul>
                <template id="matesList" is="dom-repeat" items="[[mates]]" as="mate">
                    <li>
                        <p>Name: [[mate.displayName]]</p>
                        <p>email: [[mate.email]]</p>
                    </li>
                </template>
                </ui>
                <paper-button></paper-button>
        </div>
        `;
    }

    static get properties() {
        return {
            user: String,
            mates: {
                type: Array
            }
        }
    }

    ready() {
        super.ready();
        this._getMates();
    }

    _getMates() {
        this.mates = [];
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                firebase.database().ref('users/' + this.user.uid).on('value', snapshot => {
                    let usersObject = snapshot.val();
                    usersObject.mates.map(mate => {
                        firebase.database().ref('users/' + mate.uid).on('value', mateSnapshot => {
                            this.mates.push(mateSnapshot.val());
                            this.$.matesList.render();
                        });
                    });
                });
            } else {
                console.log("Error de mates");
            }
        });
    }

}


window.customElements.define('escape-mates', EscapeMates);