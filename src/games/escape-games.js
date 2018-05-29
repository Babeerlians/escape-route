import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
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
          display: block;
        }
        ul {
          padding: 0px;
        }
        .w-80 {
          width: 80%;
        }
        .w-50 {
          width: 50%;
        }
        .w-30 {
          width: 30%;
        }
        .w-20 {
          width: 20%;
        }
        .bold {
          font-weight: bold;
        }
        li.flex {
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 8px;
        }
        p.flex {
          justify-content: center;
          color: var(--app-primary-color);
        }
        a.flex {
          width: 100%;
          cursor: pointer;
        }
        .centered {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        paper-spinner {
          --paper-spinner-layer-1-color: var(--app-primary-color);
          --paper-spinner-layer-2-color: var(--app-tertiary-color);
          --paper-spinner-layer-3-color: var(--app-primary-color);
          --paper-spinner-layer-4-color: var(--app-tertiary-color);
        }
        paper-input, paper-dropdown-menu {
          background-color: var(--app-secondary-color);
        }
      </style>
        <div class="card flex">
          <paper-dropdown-menu label="Filter by" on-selected-item-changed="_filterByChanged" no-animations class="dropdown-content w-20">
            <paper-listbox slot="dropdown-content" selected="[[itemSelected]]">
              <paper-item data-key="name">Name</paper-item>
              <paper-item data-key="city">City</paper-item>
              <paper-item data-key="valoration">Valoration</paper-item>
              <paper-item data-key="company">Company</paper-item>
            </paper-listbox>
          </paper-dropdown-menu>
          <paper-input class="w-80" value="{{searchValue}}"></paper-input>
        </div>
        <div class="card">
          <li class="flex">
            <span class="bold w-30">Company</span>
            <span class="bold w-50">Name</span>
            <span class="bold w-20">City</span>
            <br>
          </li>
          <ul>
            <template is="dom-repeat" items="[[games]]">
              <li class="flex">
                <a class="flex" on-click="_navigateToGameView" data-game-id="[[item.id]]">
                  <span class="w-30">[[item.company.name]]</span>
                  <span class="w-50">[[item.name.es]]</span>
                  <span class="w-20">[[item.city.name.es]]</span>
                  <span class="hidden">[[item.id]]</span>
                </a>
              </li>
            </template>
          </ul>
          <div class="centered">
            <paper-spinner id="spinner" class="hidden" active>...</paper-spinner>
          </div>
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

  _navigateToGameView(event) {
    let gameId = event.currentTarget.children[event.currentTarget.childElementCount - 1].innerHTML
    this.dispatchEvent(new CustomEvent('game-selected', {
      detail: {
        gameId
      }
    }));
  }
}

customElements.define('escape-games', EscapeGames);