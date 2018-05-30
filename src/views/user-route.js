import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../components/icon-toggle.js';
import '../styles/shared-styles.js';

class UserRoute extends PolymerElement {
    static get template() {
        return html `
            <style include="shared-styles">
                .valoration {
                    margin-left: 10%;
                }
            </style>
            <div class="card">
                <iron-flex-layout>
                    <iron-image class="circle" alt="user profile picture" src="[[user.photoURL]]" sizing="cover"></iron-image>
                    <paper-input readonly label="name" value="[[user.displayName]]"></paper-input>
                </iron-flex-layout>
                <paper-button raised noink class="red" on-click="_addReview">
                    <iron-icon icon="add-circle-outline"></iron-icon>&nbsp;Add review
                </paper-button>
                <ul>
                    <paper-spinner id="spinner" active>...</paper-spinner>
                    <template id="reviews" is="dom-repeat" items="[[reviews]]" as="review">
                        <li>
                            <h1>[[review.game.name.es]]</h1>
                            <p>Notes: [[review.note]]</p>
                            <div class="valoration">
                                <icon-toggle total=5 icon="star" readonly value="[[review.valoration.general]]" title="General"></icon-toggle>
                                <icon-toggle total=5 icon="lock" readonly value="[[review.valoration.difficulty]]" title="Difficulty"></icon-toggle>
                                <icon-toggle total=5 icon="image:color-lens" readonly value="[[review.valoration.ambience]]" title="Ambience"></icon-toggle>
                            </div>
                            <br>
                        </li>
                    </template>
                </ul>
            </div>
        `;
    }

    static get properties() {
        return {
            user: String,
            reviews: {
                type: Array
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this._getReviews();
    }

    _addReview() {
        this.dispatchEvent(new CustomEvent('add-review'));
    }

    _getReviews() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                firebase.database().ref('users/' + this.user.uid + '/reviews').on('value', snapshot => {
                    this.reviews = [];
                    let reviews = snapshot.val();
                    for (let key in reviews) {
                        reviews[key].uid = key;
                    }
                    reviews = reviews ? Object.values(reviews) : [];
                    reviews.map(review => {
                        firebase.database().ref('games').orderByChild('id').equalTo(review.uid).on('value', snapshot => {
                            review.game = Object.values(snapshot.val())[0];
                            this.reviews = this.reviews.concat(review);
                            this.$.spinner.toggleClass('hidden');
                        });
                    });
                });
            }
        });
    }
}

customElements.define('user-route', UserRoute);