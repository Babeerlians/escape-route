import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import './escape-view.js';
import '../styles/shared-styles.js';

class EscapeToggle extends PolymerElement {
    static get template() {
        return html `
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
                paper-dialog {
                    overflow-y: auto;
                }
                iron-collapse {
                    padding: 8px;
                    border: 1px solid #dedede;
                    border-top: none;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    /*@apply --shadow-elevation-2dp;*/
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
                <div id="escapeButton" class="inputWithButton">
                        <paper-button class="red" raised on-click="_toggleEscape">[[itemValue.name.es]]</paper-button>
                        <template is="dom-if" if="[[clear]]">
                            <paper-icon-button on-click="_clearInput" icon="clear" alt="Clear" title="clear"></paper-icon-button>
                        </template>
                </div>
            </template>
            <iron-collapse id="escape">
                <escape-view id="escape_view" game=[[itemValue]]></escape-view>
                <div id="collapseButton" class="buttons">
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

    _toggleEscape() {
        this.$.escape.toggle();
    }

    showEscape() {
        if (this.$.escape.opened) {
            this.$.escape.toggle();
        }
        this._toggleEscape();
    }

    _hideEscape(event) {
        this.$.escape.toggle();
    }

    _clearInput(event) {
        this.set('itemValue', {});
        this.dispatchEvent(new CustomEvent('clear'));
    }

    toggleClass(className){
        if(this.classList.value.indexOf(className)>=0){
            this.classList.add(className);
        } else {
            this.classList.remove(className);
        }
    }
}

customElements.define('escape-toggle', EscapeToggle);