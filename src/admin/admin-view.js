import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '../styles/shared-styles.js';

class AdminView extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles">
        .valorations {
          margin-left: 10%;
        }
      </style>
      <div class="card">
        <paper-button raised class="red" on-click="_updateGames">Update games</paper-button>
      </div>
    `;
  }

  _updateGames(){
    console.log('Updating...');
  }

}

customElements.define('admin-view', AdminView);