import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '../styles/shared-styles.js';

class SearchEscape extends PolymerElement {

    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
                iron-collapse {
                    box-shadow: 6px;
                }

                paper-button {
                    width: 100%;
                    text-transform: none;
                }
            </style>
            <div class="card">
                <paper-input label="{{label}}"></paper-input>
                <iron-collapse id="collapse">
                    <paper-material>
                        <div>
                            <template id="resultList" is="dom-repeat" items="{{choices}}" filter="_listFilter">
                                <paper-item>
                                    <paper-button on-tap="_selectItem">{{item.name}}</paper-button>
                                </paper-item>
                            </template>
                        </div>
                    </paper-material>
                </iron-collapse>
            </div>
        `;
    }

    static get is() { return 'search-escape'; }

    static get properties() { 
        return {
            choices: [],
            label: String,
            itemValue: {
                type: Object,
            },
            searchValue: {
                type: String,
                value: '',
                observer: "_valueChanged"
            }
        }
    }

    ready() {
        super.ready();
    }

    _valueChanged(e) {
        if(this.searchValue.length > 3){
            let data = firebase.database().ref('games').startAt(this.searchValue);
            let collapse = this.$.collapse
            if (e != '' && !collapse.opened) {
                this.$.resultList.render()
                collapse.toggle()
            } else
            if (e == '' && collapse.opened) {
                collapse.toggle()
            }
        }
    }

    _listFilter(item) {
        return item.name.toLowerCase().includes(
            this.searchValue.toLowerCase()
        )
    }

    _selectItem(event) {
        var collapse = this.$.collapse;
        this.set('searchValue', event.model.item.name)
        this.set('itemValue', event.model.item)
        collapse.toggle()
    }

}

window.customElements.define(SearchEscape.is , SearchEscape);