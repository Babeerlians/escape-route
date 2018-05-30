import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-card/paper-card.js';
import '../components/icon-toggle.js';
import '../styles/shared-styles.js';

class UserRoute extends PolymerElement {
    static get template() {
        return html `
            <style include="shared-styles">
                :host {
                --card-margin: 12px;
                --card-width: 500px;
                display: block;
                }
                p.flex {
                justify-content: center;
                color: var(--app-primary-color);
                }
                a.flex {
                width: 100%;
                cursor: pointer;
                }
                div.grid {
                    flex-wrap: wrap;
                    justify-content: space-around;
                    margin-top: 1em;
                }
                .between {
                    justify-content: space-between;
                }
                .valoration {
                    color: var(--app-primary-color);
                    margin-top: 12px;
                }
                .-card-content {
                margin: var(--card-margin);
                }
                div.light {
                color: var(--app-tertiary-color);
                text-align: right;
                font-size: 14px;
                }
                paper-card {
                width: var(--card-width);
                margin: var(--card-margin);
                --paper-card-header-text: {
                    /*color: white;*/
                    color: var(--app-secondary-color);
                    background-color: rgba(0,0,0, 0.5);
                    width: 100%;
                    box-sizing: border-box;
                };
                --paper-card-header-image: {
                    min-height: 
                };
                }
                paper-spinner {
                --paper-spinner-layer-1-color: var(--app-primary-color);
                --paper-spinner-layer-2-color: var(--app-tertiary-color);
                --paper-spinner-layer-3-color: var(--app-primary-color);
                --paper-spinner-layer-4-color: var(--app-tertiary-color);
                margin: var(--card-margin);
                }
                paper-input, paper-dropdown-menu {
                background-color: var(--app-secondary-color);
                }
                .card-actions a {
                color: var(--app-primary-color);
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
                <paper-spinner id="spinner" active>...</paper-spinner>
                <div class="flex grid">
                    <template id="reviews" is="dom-repeat" items="[[reviews]]" as="review">
                        <paper-card heading="[[review.game.name.es]]" alt="[[review.game.name.es]]" image="[[review.game.narrowImage.translations.es]]">
                            <div class="card-content">
                                <div class="flex between">
                                    <span>[[review.game.company.name]]</span>
                                    <div class="light">
                                        <iron-icon icon="communication:location-on"></iron-icon>
                                        <span>[[review.game.city.name.es]]</span>
                                    </div>
                                </div>
                                <div class="flex between">
                                    <div class="light">
                                        <iron-icon title="Duration" icon="image:timelapse"></iron-icon>
                                        <span>[[review.duration]] min</span>
                                    </div>
                                    <div class="light">
                                        <span>[[review.game.min_gamer]]-[[review.game.max_gamer]]</span>
                                        <iron-icon title="Gamers" icon="social:people"></iron-icon>
                                    </div>
                                </div>
                                <div class="flex between valoration">
                                    <div class="light">
                                        <span>[[review.valoration.ambience]]</span>
                                        <iron-icon title="Ambience" icon="image:color-lens"></iron-icon>
                                    </div>
                                    <div class="light">
                                        <span>[[review.valoration.general]]</span>
                                        <iron-icon title="Difficulty" icon="lock"></iron-icon>
                                    </div>
                                    <div>
                                        <span>[[review.valoration.general]]</span>
                                        <iron-icon title="General" icon="star"></iron-icon>
                                    </div>
                                </div>
                            </div>
                            <div class="card-actions">
                                <a href="/game/[[item.id]]">
                                <paper-button>View</paper-button>
                                </a>
                            </div>
                        </paper-card>
                    </template>
                </div>
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
                firebase.database().ref('users/' + this.user.uid + '/reviews').once('value', snapshot => {
                    this.reviews = [];
                    let reviews = snapshot.val();
                    for (let key in reviews) {
                        reviews[key].uid = key;
                    }
                    reviews = reviews ? Object.values(reviews) : [];
                    if(reviews.length === 0) this.$.spinner.toggleClass('hidden');
                    reviews.map(review => {
                        firebase.database().ref('games/'+review.uid).once('value', snapshot => {
                            review.game = snapshot.val();
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