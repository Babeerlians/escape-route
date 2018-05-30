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
        <escape-view id="escapeView" item-value="[[itemValue]]"></escape-view>
        <paper-spinner id="spinner" class="hidden" active>...</paper-spinner>
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
    if (Object.is(this.route.prefix, '/game')) {
      this._toggleSpinner();
      let gameId = this.route.path.substring(1);
      firebase.database().ref('games/' + gameId).once('value', snapshot => {
        this.itemValue = snapshot.val();
        this.$.escapeView.showEscape();
        this._toggleSpinner();
      });
    }
  }

  _toggleSpinner() {
    this.$.escapeView.toggleClass('hidden');
    this.$.spinner.toggleClass('hidden');
  }
}

customElements.define('game-view', EscapeGames);