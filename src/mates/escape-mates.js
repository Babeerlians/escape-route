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
        
            paper-button.red {
                background-color: red;
                color: white;
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
            <paper-button raised noink class="red" on-click="logout">Log out</paper-button>
            <iron-flex-layout>
                <iron-image class="circle" alt="user profile picture" src="{{user.photoURL}}" sizing="cover"></iron-image>
                <paper-input readonly label="name" value="{{user.displayName}}"></paper-input>
                <paper-input readonly label="email" value="{{user.email}}"></paper-input>
                <paper-input readonly label="uid" value="{{user.uid}}"></paper-input>
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

    ready(){
        super.ready();
        //this._getMates();
    }

    _getMates() {
        this.mates=[];
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //console.log(user);
                this.user = user;
                firebase.database().ref('users/'+this.user.uid).on('value', snapshot => {
                    let usersObject = snapshot.val();
                    console.log('usersObject', usersObject);
                    usersObject.mates.map(mate=>{
                        firebase.database().ref('users/'+mate.uid).on('value', mateSnapshot => {
                            this.mates.push(mateSnapshot.val());
                            this.$.matesList.render();
                            console.log('mates', this.mates);
                        });
                    });
                });
            } else {
                console.log("error de mates");
            }
        });
    }

    logout() {
        firebase.auth().signOut().then(() => {
            console.log("chao");
            this.user = undefined;
            this.mates = [];
        }, function (error) {
            console.log("sigues logueado");
        });
    }
}


window.customElements.define('escape-mates', EscapeMates);