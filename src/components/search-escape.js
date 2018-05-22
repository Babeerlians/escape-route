import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-input/paper-input.js';
import './icon-toggle.js';
import './escape-view.js';
import '../styles/shared-styles.js';

class SearchEscape extends PolymerElement {

    static get template() {
        return html `
            <style include="shared-styles">
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
                paper-input {
                    background-color: whitesmoke;
                }
            </style>
            <h2>[[title]]</h2>
            <paper-input id="inputSearch" label="[[label]]" value="{{searchValue}}"></paper-input>
            <iron-collapse id="collapse">
                <template id="resultList" is="dom-repeat" items="{{choices}}">
                    <paper-button on-click="_selectItem">{{item.name.es}}</paper-button>
                </template>
            </iron-collapse>
            <escape-view id="inputWithButton" clear class="hidden" on-clear="_clearEscape"></escape-view>
        `;
    }

    static get is() {
        return 'search-escape';
    }

    static get properties() {
        return {
            choices: [],
            label: String,
            itemValue: Object,
            searchValue: {
                type: String,
                value: '',
                observer: '_valueChanged'
            },
            isSelected: Boolean,
            title: String,
            idescape: {
                type: String,
                notify: true
            }
        };
    }

    _valueChanged(newValue, oldValue) {
        if (this.searchValue.length > 2 && !Object.is(newValue, oldValue) && !this.isSelected) {
            firebase.database().ref('games').orderByChild('name/es').startAt(this.searchValue).endAt(this.searchValue + '\uf8ff').limitToFirst(5).on('value', snapshot => {
                this.choices = Object.values(snapshot.val());
                let collapse = this.$.collapse;
                if (this.choices.length > 0) {
                    if (!collapse.opened) {
                        collapse.toggle();
                    }
                    this.$.resultList.render();
                }
            });
        } else {
            this.isSelected = false;
            this.choices = [];
            let collapse = this.$.collapse;
            if (!collapse.opened) {
                collapse.toggle();
            }
            this.$.resultList.render();
        }
    }

    _selectItem(event) {
        let collapse = this.$.collapse;
        this.set('isSelected', true);
        this.set('searchValue', event.model.item.name.es);
        this.set('itemValue', event.model.item);
        this.set('idescape', event.model.item.id);
        collapse.toggle();
        this.$.inputWithButton.itemValue = event.model.item;
        this.$.inputWithButton.classList.remove("hidden");
        this.$.inputSearch.toggleClass("hidden");
    }

    _clearEscape(event) {
        this.set('searchValue', '');
        this.set('itemValue', {});
        this.set('idescape', '');
        this.$.inputWithButton.classList.add("hidden");
        this.$.inputSearch.toggleClass("hidden");
    }

}

window.customElements.define(SearchEscape.is, SearchEscape);