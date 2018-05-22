import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '../styles/shared-styles.js';

class EscapeView extends PolymerElement {
    static get template() {
        return html`
            <style include="shared-styles">
                :host {
                    display: block;
                    padding: 10px;
                }
                .inputWithButton:not(.hidden) {
                    display: flex
                }
                .smallMap {
                    width: 400px;
                    height: 300px;
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
            <paper-dialog id="escape">
                <h1>[[itemValue.name.es]]</h1>
                <div><h3>Description</h3><p>[[itemValue.description]]</p></div>
                <div><h3>Duration</h3><p>[[itemValue.duration]]</p></div>
                <div><h3>Audience age</h3><p>[[itemValue.audience_age]]</p></div>
                <div><h3>Localization</h3><div id="map" class="smallMap"></div></div>
                <div class="buttons">
                    <paper-button dialog-confirm autofocus>Tap me to close</paper-button>
                </div>
            </paper-dialog>
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
        this.$.escape.open();
    }
    
    _clearInput(event) {
        this.set('itemValue', {});
        this.dispatchEvent(new CustomEvent('clear'));
    }
}

customElements.define('escape-view', EscapeView);