import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../components/search-escape.js';
import '../styles/shared-styles.js';

class EscapeGames extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
            display: block;
        }
        .centered {
          display: flex;
          align-items: center;
        }
      </style>
      <div class="card centered">
        <escape-view id="escapeView" item-value="[[itemValue]]" class="hidden"></escape-view>
        <paper-spinner id="spinner" active>...</paper-spinner>
      </div>
    `;
  }

  static get properties() {
    return {
      itemValue: Object,
      route: {
        type: Object,
        observer: '_retrieveGame'
      }
    }
  }

  _retrieveGame() {
    let gameId = this.route.path.substring(1);
    firebase.database().ref('games/' + gameId).once('value', snapshot => {
      this.itemValue = snapshot.val();
      this._toggleSpinner();
    });
  }

  _toggleSpinner() {
    if (Object.is(this.route.prefix, '/game')) {
      this.$.escapeView.className = '';
      this.$.escapeView._showEscape();
      this.$.spinner.toggleClass('hidden');
    }
  }
}

customElements.define('game-view', EscapeGames);