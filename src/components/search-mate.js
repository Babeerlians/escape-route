import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-input/paper-input.js';
import '../styles/shared-styles.js';

class SearchMate extends PolymerElement {

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
                    background-color: var(--app-secondary-color);
                }
                paper-icon-item {
                    display: block;
                }
            </style>
            <h2>[[title]]</h2>
            <paper-input id="inputSearch" label="[[label]]" value="{{searchValue}}"></paper-input>
            <iron-collapse id="collapse">
                <template id="resultList" is="dom-repeat" items="[[data]]">
                    <paper-button on-click="_selectItem">{{item.displayName}}</paper-button>
                </template>
            </iron-collapse>
            <template id="mateList" is="dom-repeat" items="[[matesList]]">
                    <paper-icon-item>{{item.displayName}}
                        <paper-icon-button on-click="_deleteMate" icon="delete" alt="Delete" title="clear"></paper-icon-button>
                    </paper-icon-item>
            </template>
        `;
    }

    static get is() {
        return 'search-mate';
    }

    static get properties() {
        return {
            data: [],
            label: String,
            searchValue: {
                type: String,
                value: '',
                observer: '_valueChanged'
            },
            isSelected: Boolean,
            title: String,
            matesList: {
                type: Array,
                value: []
            },
            mates: {
                type: Object,
                value: {},
                notify: true
            }
        };
    }

    _valueChanged(newValue, oldValue) {
        if (this.searchValue.length > 2 && !Object.is(newValue, oldValue) && !this.isSelected) {
            firebase.database().ref('users').orderByChild('displayName').startAt(this.searchValue).endAt(this.searchValue + '\uf8ff').limitToFirst(5).on('value', snapshot => {
                let data = snapshot.val();
                for(let key in data) {
                    data[key].uid = key;
                }
                this.data = data ? Object.values(data) : [];
                this.data = this.data.filter(item => !this.matesList.find(
                    mate => item.uid===mate.uid
                ));
                let collapse = this.$.collapse;
                if (this.data.length > 0) {
                    if (!collapse.opened) {
                        collapse.toggle();
                    }
                }
            });
        } else {
            this.isSelected = false;
            this.data = [];
            let collapse = this.$.collapse;
            if (!collapse.opened) {
                collapse.toggle();
            }
        }
    }

    _selectItem(event) {
        let collapse = this.$.collapse;
        this.set('isSelected', true);
        this.set('searchValue', '');
        this.matesList.push(event.model.item);
        this.matesList = this.matesList.slice(0);
        this._completeMates();
        collapse.toggle();
    }

    _deleteMate(event) {
        this.matesList = this.matesList.filter(mate => mate.uid !== event.model.item.uid);
        this._completeMates();
    }

    _completeMates(){
        let mates = {};
        this.matesList.map(mate => { 
            mates[mate.uid] = {
                displayName: mate.displayName
            }
        });
        this.mates = mates;
    }

}

window.customElements.define(SearchMate.is, SearchMate);