import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-image/iron-image.js';
import '../components/icon-toggle.js';
import '../styles/shared-styles.js';

class UserRoute extends PolymerElement {
    static get template() {
        return html`
            <style include="shared-styles">
                .valorations {
                    margin-left: 10%;
                }
            </style>
            <div class="card">
                <iron-flex-layout>
                    <iron-image class="circle" alt="user profile picture" src="[[user.photoURL]]" sizing="cover"></iron-image>
                    <paper-input readonly label="name" value="[[user.displayName]]"></paper-input>
                </iron-flex-layout>
                <ul>
                    <template id="reviews" is="dom-repeat" items="[[reviews]]" as="review">
                        <li>
                            <h3>[[review.game.name.es]]</h3>
                            <p>Notes: [[review.note]]</p>
                            <div class="valorations">
                                <icon-toggle total=5 icon="star" readonly value="[[review.valorations.general]]" title="General"></icon-toggle>
                                <icon-toggle total=5 icon="lock" readonly value="[[review.valorations.difficulty]]" title="Difficulty"></icon-toggle>
                                <icon-toggle total=5 icon="home" readonly value="[[review.valorations.ambience]]" title="Ambience"></icon-toggle>
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

    ready() {
        super.ready();
        this._getReviews();
    }

    _getReviews() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                firebase.database().ref('users/' + this.user.uid + '/reviews').on('value', snapshot => {
                    this.reviews = [];
                    let reviews = snapshot.val();
                    for (let key in reviews) {
                        reviews[key].key = key;
                    }
                    reviews = reviews && Object.values(reviews);
                    reviews.map(review => {
                        firebase.database().ref('games').orderByChild('id').equalTo(review.key).on('value', snapshot => {
                            review.game = Object.values(snapshot.val())[0];
                            this.reviews.push(review);
                            this.$.reviews.render();
                        });
                    });
                });
            }
        });
    }
}

customElements.define('user-route', UserRoute);