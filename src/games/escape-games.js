import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '../styles/shared-styles.js';

const sortByName = array => array.sort((a, b) => {
  if (a.name.es > b.name.es) {
    return 1;
  }
  if (a.name.es < b.name.es) {
    return -1;
  }
  // a must be equal to b
  return 0;
});

function scrolled(element) {
  //visible height + pixel scrolled = total height 
  if (element.offsetHeight + element.scrollTop == element.scrollHeight) {
    alert("End");
  }
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
      </style>
        <div class="card">
          <paper-input></paper-input>
        </div>
        <div class="card">
          <li class="flex">
            <span class="bold company">Company</span>
            <span class="bold name">Name</span>
            <span class="bold city">City</span>
            <br>
          </li>
          <ul>
            <template is="dom-repeat" items="[[games]]">
              <li class="flex">
                <span class="company">[[item.company.name]]</span>
                <span class="name">[[item.name.es]]</span>
                <span class="city">[[item.city.name.es]]</span>
                <br>
              </li>
            </template>
          </ul>
        </div>
    `;
  }

  static get properties() {
    return {
      games: {
        type: Array,
        value: []
      },
      lastGame: {
        type: Object,
        value: {
          name: {
            es: ''
          }
        }
      },
      pageSize: {
        type: Number,
        value: 25
      }
    }
  }

  ready() {
    super.ready();
    this._retrieveNextPage();
  }

  _retrieveNextPage() {
    firebase.database().ref('games').orderByChild('name/es').startAt(this.lastGame.name.es).limitToFirst(this.pageSize + 1).on('value', snapshot => {
      let values = Object.values(snapshot.val());
      this.games = this.games.concat(sortByName(values));
      this.lastGame = this.games.pop();
    });
  }

}

customElements.define('escape-games', EscapeGames);