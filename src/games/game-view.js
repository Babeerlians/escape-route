import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../components/escape-view';
import '../styles/shared-styles.js';

class EscapeGames extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
           display: flex;
           justify-content: center;
        }
      </style>
      <escape-view id="escapeView" game="[[itemValue]]"></escape-view>
      <paper-spinner id="spinner" class="hidden" active>...</paper-spinner>
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