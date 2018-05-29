import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
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

const sortByCity = (a, b) => {
  if (a.city.name.es > b.city.name.es) {
    return 1;
  }
  if (a.city.name.es < b.city.name.es) {
    return -1;
  }
  return 0;
}


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
        .name {
          width: 50%;
        }
        .company {
          width: 30%;
        }
        .city {
          width: 20%;
        }
        .bold {
          font-weight: bold;
        }
        .flex {
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 8px;
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
      </style>
        <!-- <div class="card">
          <paper-input></paper-input>
        </div> -->
        <div class="card">
          <li class="flex">
            <span class="bold company">Company</span>
            <span class="bold name">Name</span>
            <span class="bold city">City</span>
            <br>
          </li>
          <ul>
            <template is="dom-repeat" items="[[games]]">
              <li class="flex" on-click="_navigateToGameView" data-game-id="[[item.id]]">
                <span class="company">[[item.company.name]]</span>
                <span class="name">[[item.name.es]]</span>
                <span class="city">[[item.city.name.es]]</span>
                <br>
              </li>
            </template>
          </ul>
          <div class="centered">
            <paper-spinner id="spinner" class="hidden" active>...</paper-spinner>
            <paper-button id="moreButton" class="red" on-click="_retrieveNextPage">More</paper-button>
          </div>          
        </div>
    `;
  }

  static get properties() {
    return {
      games: {
        type: Array,
        value: []
      },
      lastGame: Object,
      pageSize: {
        type: Number,
        value: 25
      },
      orderBy: {
        type: String,
        value: 'city'
      }
    }
  }

  ready() {
    super.ready();
    this._retrieveNextPage();
  }

  _retrieveNextPage() {
    this._togglePagination();
    firebase.database().ref('games').orderByChild(this._calculateChildFilter()).startAt(this._getLastOrderValue()).limitToFirst(this.pageSize + 1).on('value', snapshot => {
      let values = Object.values(snapshot.val());
      this.games = this.games.concat(values.sort(this._calculateSortFunction()));
      this.lastGame = this.games.pop();
      this._togglePagination();
    });
  }

  _togglePagination() {
    this.$.spinner.toggleClass('hidden');
    this.$.moreButton.toggleClass('hidden');
  }

  _getLastOrderValue(){
    let propertyKeyByOrder = {
      name: this.lasGame && this.lastGame.name.es,
      company: this.lasGame && this.lastGame.company.name,
      city: this.lasGame && this.lastGame.city.name.es,
      valoration: this.lasGame && this.lasGame.valoration.general
    };
    return propertyKeyByOrder[this.orderBy] || propertyKeyByOrder.name;
  }

  _calculateSortFunction(){
    let sortFunctionByOrder = {
      name: sortByName,
      company: sortByCity,
      city: sortByCity,
      valoration: sortByCity
    };
    return sortFunctionByOrder[this.orderBy] || sortFunctionByOrder.name;
  }

  _calculateChildFilter(){
    let childFilterByOrder = {
      name: 'name/es',
      company: 'company/name',
      city: 'city/name/es',
      valoration: 'valoration/general'
    };
    return childFilterByOrder[this.orderBy] || childFilterByOrder.name;
  }
  _navigateToGameView(event) {
    console.log('Go to game', event.currentTarget);
  }
}

customElements.define('escape-games', EscapeGames);