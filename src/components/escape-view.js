import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-styles/shadow.js';
import '../styles/shared-styles.js';

class EscapeView extends PolymerElement {
    static get template() {
        return html`
            <style include="shared-styles">
                :host {
                    display: block;
                }
                .inputWithButton:not(.hidden) {
                    display: flex
                }
                .inputWithButton paper-button{
                    margin: 0px;
                }
                .smallMap {
                    height: 300px;
                }
                @media (max-width: 640px) {
                    .smallMap {
                        height: 200px;
                    }
                }
                paper-dialog {
                    overflow-y: auto;
                }
                iron-collapse {
                    padding: 8px;
                    border: 1px solid #dedede;
                    border-top: none;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    @apply --shadow-elevation-2dp;
                }
                .buttons {
                    display: flex;
                    justify-content: center;
                }
                .buttons paper-icon-button {
                    padding: 0px;
                }
            </style>
            <template is="dom-if" if="[[!isEmpty(itemValue)]]">
                <div class="inputWithButton">
                        <paper-button class="red" raised on-click="_showEscape">[[itemValue.name.es]]</paper-button>
                        <template is="dom-if" if="[[clear]]">
                            <paper-icon-button on-click="_clearInput" icon="clear" alt="Clear" title="clear"></paper-icon-button>
                        </template>
                </div>
            </template>
            <iron-collapse id="escape">
                <h1>[[itemValue.name.es]]</h1>
                <div id="description"></div>
                <div><h3>Duration</h3><p>[[itemValue.duration]]</p></div>
                <div><h3>Audience age</h3><p>[[itemValue.audience_age]]</p></div>
                <div><h3>Localization</h3><div id="map" class="smallMap"></div></div>
                <div class="buttons">
                    <paper-icon-button on-click="_hideEscape" icon="expand-less" alt="Collapse" title="Collapse"></paper-icon-button>
                </div>
            </iron-collapse>
        `;
    }

    static get properties() { 
        return {
            itemValue: {
                type: Object,
                value: {}
            },
            clear: {
                type: Boolean
            }
        };
    }

    isEmpty(itemValue) {
        return itemValue == null ? true : JSON.stringify(itemValue) === JSON.stringify({});
    }

    _showEscape(event) {
        if(!this.$.escape.opened) {
            let uluru = {lat:parseFloat(this.itemValue.company.latitude), 
                lng:parseFloat(this.itemValue.company.longitude)};
            let map = new google.maps.Map(this.$.map, {
              zoom: 15,
              center: uluru
            });
            let marker = new google.maps.Marker({
              position: uluru,
              map: map
            });
        }
        this.$.description.innerHTML = this.itemValue.description;
        this.$.escape.toggle();
    }

    _hideEscape(event) {
        this.$.escape.toggle();
    }
    
    _clearInput(event) {
        this.set('itemValue', {});
        this.dispatchEvent(new CustomEvent('clear'));
    }
}

customElements.define('escape-view', EscapeView);