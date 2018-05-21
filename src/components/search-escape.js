import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '../styles/shared-styles.js';

class SearchEscape extends PolymerElement {

    static get template() {
        return html`
            <style include="shared-styles">
                :host {
                    display: block;

                    padding: 10px;
                }
                iron-collapse {
                    box-shadow: 6px;
                }

                paper-button {
                    width: 100%;
                    text-transform: none;
                }
                paper-input {
                    background-color: whitesmoke
                }
                .smallMap {
                    width: 400px;
                    height: 300px;
                }
                .inputWithButton:not(.hidden) {
                    display: flex
                }
            </style>
            <div>
                <h2>{{title}}</h2>
                <paper-input id="inputSearch" label="{{label}}" value="{{searchValue}}"></paper-input>
                <iron-collapse id="collapse">
                    <paper-material>
                        <div>
                            <template id="resultList" is="dom-repeat" items="{{choices}}">
                                <paper-item>
                                    <paper-button on-click="_selectItem">{{item.name.es}}</paper-button>
                                </paper-item>
                            </template>
                        </div>
                    </paper-material>
                </iron-collapse>
                <div id="inputWithButton" class="hidden inputWithButton">
                    <paper-button slot="prefix" raised on-click="_showEscape">{{searchValue}}</paper-button>
                    <paper-icon-button slot="suffix" on-click="_clearInput" icon="clear" alt="Clear" title="clear"></paper-icon-button>
                </div>
            </div>
            <paper-dialog id="escape">
                <h1>{{itemValue.name.es}}</h1>
                <div><h3>Description</h3><p>{{itemValue.description}}</p></div>
                <div><h3>Duration</h3><p>{{itemValue.duration}}</p></div>
                <div><h3>Audience age</h3><p>{{itemValue.audience_age}}</p></div>
                <div><h3>Localization</h3><div id="map" class="smallMap"></div></div>
                <div class="buttons">
                    <paper-button dialog-confirm autofocus>Tap me to close</paper-button>
                </div>
            </paper-dialog>
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
                observer(newValue, oldValue){
                    if(newValue !== oldValue && !this.isSelected) this._valueChanged();
                    else this.isSelected = false;
                }
            },
            isSelected: Boolean,
            title: String
        }
    }

    ready() {
        super.ready();
    }

    _valueChanged(e) {
        if(this.searchValue.length > 2){
            firebase.database().ref('games').orderByChild('name/es').startAt(this.searchValue).endAt(this.searchValue+ '\uf8ff').limitToFirst(5).on('value', snapshot => {
                this.choices = Object.values(snapshot.val());
                let collapse = this.$.collapse;
                if (this.choices.length>0) {
                    if(!collapse.opened) {
                        this.$.collapse.toggle();
                    }
                    this.$.resultList.render();
                }
            });
        }
        else{
            this.choices = [];
            let collapse = this.$.collapse;
            if(!collapse.opened) {
                this.$.collapse.toggle();
            }
            this.$.resultList.render();
        }
    }

    _listFilter(item) {
        return item.name.toLowerCase().includes(
            this.searchValue.toLowerCase()
        )
    }

    _selectItem(event) {
        var collapse = this.$.collapse;
        this.set('isSelected', true);
        this.set('searchValue', event.model.item.name.es);
        this.set('itemValue', event.model.item);
        collapse.toggle();
        this.$.inputWithButton.classList.remove("hidden");
        this.$.inputSearch.toggleClass("hidden");
    }

    _clearInput(event) {
        this.set('searchValue', '');
        this.$.inputWithButton.classList.add("hidden");
        this.$.inputSearch.toggleClass("hidden");
    }

    _showEscape(event) {
        let uluru = {lat: parseFloat(this.itemValue.company.latitude), lng: parseFloat(this.itemValue.company.longitude)};
        let map = new google.maps.Map(this.$.map, {
          zoom: 15,
          center: uluru
        });
        let marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
        /*let body = document.querySelector('body');
        body.appendChild(this.$.escape);*/
        this.$.escape.open();
    }

}

window.customElements.define(SearchEscape.is , SearchEscape);