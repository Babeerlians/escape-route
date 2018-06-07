import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-styles/shadow.js';
import '../styles/shared-styles.js';

class EscapeView extends PolymerElement {
    static get template() {
        return html `
            <style include="shared-styles">
                :host {
                    display: flex;
                    justify-content: center;
                    margin: 16px;
                }
                .smallMap {
                    height: 600px;
                }
                @media (max-width: 640px) {
                    .smallMap {
                        height: 400px;
                    }
                }
                paper-card {
                    width: 100%;
                    max-width: 1024px;
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
                div.right {
                    color: var(--app-tertiary-color);
                    text-align: right;
                    font-size: 14px;
                    padding: 5px;
                }
                div.left {
                    color: var(--app-tertiary-color);
                    text-align: left;
                    font-size: 14px;
                    padding: 5px;
                }
            </style>
            <paper-card heading="[[game.name.es]]" alt="[[game.name.es]]" image="[[game.wideImage.translations.es]]">
                <div class="card-content">
                    <div class="flex between">
                        <h3>Description:</h3>
                        <div class="left" id="description">
                        </div>
                    </div>
                    <div class="flex between">
                        <h3>Duration:</h3>
                        <div class="right">
                        <iron-icon title="Duration" icon="image:timelapse"></iron-icon>
                        <span>[[game.duration]] min </span>
                        </div>
                    </div>
                    <div class="flex between">
                        <h3>Valoration:</h3>
                        <div class="right">
                            <span>[[game.valoration.ambience]]</span>
                            <iron-icon title="Ambience" icon="image:color-lens"></iron-icon>
                            </div>
                        <div class="right">
                            <span>[[game.valoration.difficulty]]</span>
                            <iron-icon title="Difficulty" icon="lock"></iron-icon>
                        </div>
                        <div class="right">
                            <span>[[game.valoration.general]]</span>
                            <iron-icon title="General" icon="star"></iron-icon>
                        </div>
                    </div>
                    <div class="between">
                        <h3>Localization:</h3>
                        <div id="map" class="smallMap"></div>
                    </div>
                </div>
            </paper-card>
        `;
    }

    static get properties() {
        return {
            game: {
                type: Object,
                value: {},
                observer: '_renderView'
            },
            route: {
                type: Object,
                observer: '_retrieveGame'
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

    _retrieveGame() {
        if (Object.is(this.route.prefix, '/game')) {
            let gameId = this.route.path.substring(1);
            if (sessionStorage.getItem(gameId)) {
                this.game = JSON.parse(sessionStorage.getItem(gameId));
            }
        }
    }

    _renderView() {
        if(!this.isEmpty(this.game)) {
            let uluru = {
                lat: parseFloat(this.game.company.latitude),
                lng: parseFloat(this.game.company.longitude)
            };
            let map = new google.maps.Map(this.$.map, {
                zoom: 15,
                center: uluru
            });
            let marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
            this.$.description.innerHTML = this.game.description;
        }
    }

    isEmpty(itemValue) {
        return itemValue == null ? true : JSON.stringify(itemValue) === JSON.stringify({});
    }
}

customElements.define('escape-view', EscapeView);