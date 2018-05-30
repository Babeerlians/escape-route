import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../styles/shared-styles.js';

const sortByName = (a, b) => {
  if (a.name.es > b.name.es) {
    return 1;
  }
  if (a.name.es < b.name.es) {
    return -1;
  }
  return 0;
};


class EscapeGames extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          --card-margin: 12px;
          --card-width: 300px;
          display: block;
        }
        li.flex {
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 8px;
        }
        .w-80 {
          width: 80%;
        }
        .w-20 {
          width: 20%;
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
        }
        .between {
          justify-content: space-between;
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
        <div class="card flex">
          <paper-dropdown-menu label="Filter by" on-selected-item-changed="_filterByChanged" no-animations class="dropdown-content w-20">
            <paper-listbox slot="dropdown-content" selected="[[itemSelected]]">
              <paper-item data-key="name">Name</paper-item>
              <paper-item data-key="city">City</paper-item>
              <!-- <paper-item data-key="valoration">Valoration</paper-item> -->
              <paper-item data-key="company">Company</paper-item>
            </paper-listbox>
          </paper-dropdown-menu>
          <paper-input class="w-80" value="{{searchValue}}"></paper-input>
          <paper-spinner id="spinner" class="hidden" active>...</paper-spinner>
        </div>
        <div class="flex grid">
          <template is="dom-repeat" items="[[games]]">
            <paper-card heading="[[item.name.es]]" alt="[[item.name.es]]" image="[[item.narrowImage.translations.es]]">
              <div class="card-content">
                <div class="flex between">
                  <span class="bold" title="Company">[[item.company.name]]</span>
                  <div class="light">
                    <iron-icon title="City" icon="communication:location-on"></iron-icon>
                    <span>[[item.city.name.es]]</span>
                  </div>
                </div>
                <div class="flex between">
                  <div class="light">
                    <iron-icon title="Duration" icon="image:timelapse"></iron-icon>
                    <span>[[item.duration]] min</span>
                  </div>
                  <div class="light">
                    <span>[[item.min_gamer]]-[[item.max_gamer]]</span>
                    <iron-icon title="Gamers" icon="social:people"></iron-icon>
                  </div>
                  <template is="dom-if" if="[[!games.length]]">
                    <div class="light">
                      <span>[[item.valoration.general]]</span>
                      <iron-icon title="Valoration" icon="star"></iron-icon>
                    </div>
                  </template> 
                </div>
              </div>
              <div class="card-actions">
                <a href="/game/[[item.id]]">
                  <paper-button>View</paper-button>
                </a>
              </div>
            </paper-card>
          </template>
          <template is="dom-if" if="[[!games.length]]">
            <p class="flex">No games to show</p>
          </template>          
        </div>
    `;
  }

  static get properties() {
    return {
      games: {
        type: Array,
        value: []
      },
      searchValue: {
        type: String,
        value: '',
        observer: '_valueChanged'
      },
      pageSize: {
        type: Number,
        value: 25
      },
      filterBy: String,
      itemSelected: Number
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._filterByChanged();
  }

  _valueChanged() {
    this._toggleSpinner();
    firebase.database().ref('games').orderByChild(this._calculateChildFilter()).startAt(this.searchValue).endAt(this.searchValue + '\uf8ff').limitToFirst(this.pageSize).once('value', snapshot => {
      let values = snapshot.val() ? Object.values(snapshot.val()) : [];
      this.games = values.sort(sortByName);
      this._toggleSpinner();
    });
  }

  _filterByChanged(event) {
    let itemSelectedByName = {
      name: 0,
      city: 1,
      valoration: 2,
      company: 3
    };
    this.set('filterBy', event && event.detail.value ? event.detail.value.dataset.key : 'name');
    this.set('itemSelected', itemSelectedByName[this.filterBy]);
    this.set('searchValue', '');
  }

  _toggleSpinner() {
    this.$.spinner.toggleClass('hidden');
  }

  _calculateChildFilter() {
    let childFilterByOrder = {
      name: 'name/es',
      city: 'city/name/es',
      valoration: 'valoration/general',
      company: 'company/name'
    };
    return childFilterByOrder[this.filterBy] || childFilterByOrder.name;
  }
}

customElements.define('escape-games', EscapeGames);