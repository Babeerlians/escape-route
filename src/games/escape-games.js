import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '../styles/shared-styles.js';

class EscapeGames extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <div class="card">
        <span>GAMES</span>
      </div>
    `;
  }
}

customElements.define('escape-games', EscapeGames);