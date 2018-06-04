import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-styles/shadow.js';
import '../styles/shared-styles.js';

class ReviewGame extends PolymerElement {
    static get template() {
        return html `
            <style include="shared-styles">
                :host {
                    display: block;
                }
                .smallMap {
                    height: 300px;
                }
                @media (max-width: 640px) {
                    .smallMap {
                        height: 200px;
                    }
                }
                paper-card {
                    width: 100%;
                    --paper-card-header-text: {
                        color: var(--app-secondary-color);
                        background-color: rgba(0, 0, 0, 0.5);
                        width: 100%;
                        box-sizing: border-box;
                    };
                }
                div.flex {
                    align-items: center
                }
                div > h3 {
                    margin-right: 2em
                }
                div.light {
                    color: var(--app-tertiary-color);
                    text-align: right;
                    font-size: 14px;
                }
                div.valoration {
                    color: var(--app-primary-color);
                    margin-top: 12px;
                }
            </style>
            <paper-card heading="[[review.game.name.es]]" alt="[[review.game.name.es]]" image="[[review.game.wideImage.translations.es]]">
                <div class="card-content">
                    <div class="flex between">
                        <h3>Date:</h3>
                        <div class="light">
                            <iron-icon title="Duration" icon="event"></iron-icon>
                            <span>[[review.date]]</span>
                        </div>
                    </div>
                    <div class="flex between">
                        <h3>Duration:</h3>
                        <div class="light">
                            <template is="dom-if" if="[[review.completed]]">
                                <iron-icon title="Duration" icon="image:timelapse"></iron-icon>
                                <span>[[review.duration.minutes]] min [[review.duration.seconds]] sec</span>
                            </template>
                            <template is="dom-if" if="[[!review.completed]]">
                                <iron-icon title="Duration" icon="image:timer-off"></iron-icon>
                                <span>Not completed</span>
                            </template>
                        </div>
                    </div>
                    <div class="flex between valoration">
                        <h3>Valoration</h3>
                        <div class="light">
                            <span>[[review.valoration.ambience]]</span>
                            <iron-icon title="Ambience" icon="image:color-lens"></iron-icon>
                            </div>
                        <div class="light">
                            <span>[[review.valoration.difficulty]]</span>
                            <iron-icon title="Difficulty" icon="lock"></iron-icon>
                        </div>
                        <div>
                            <span>[[review.valoration.general]]</span>
                            <iron-icon title="General" icon="star"></iron-icon>
                        </div>
                    </div>
                    <div class="flex between">
                        <h3>Note</h3>
                        <div class="light">
                            <span>[[review.note]]</span>
                        </div>
                    </div>
                </div>
            </paper-card>
        `;
    }

    static get properties() {
        return {
            review: {
                type: Object,
                value: {}
            },
            route: {
                type: Object,
                observer: '_retrieveReview'
            }
        };
    }

    toggleClass(className){
        if(this.classList.value.indexOf(className)>=0){
            this.classList.add(className);
        } else {
            this.classList.remove(className);
        }
    }

    _retrieveReview() {
        if (Object.is(this.route.prefix, '/review')) {
            let reviewId = this.route.path.substring(1);
            if (sessionStorage.getItem(reviewId)) {
                this.review = JSON.parse(sessionStorage.getItem(reviewId));
            }
        }
    }
}

customElements.define('review-game', ReviewGame);