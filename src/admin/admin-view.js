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
        :host {
          display: block;
        }
      </style>
      <div class="card">
        <paper-button raised class="red" on-click="_updateGames">Update games</paper-button>
      </div>
    `;
  }

  _updateGames(event) {
    event.target
    const baseUrl = 'https://www.escaperoomlover.com/api/es/public/game?page=';
    const firstPage = baseUrl + '1';
    let games = [];
    fetch(firstPage)
      .then(response => response.json())
      .then(myJson => {
        const lastPage = myJson.lastPage;
        let urls = Array.from(Array(lastPage).keys(), item => baseUrl + (item + 1));
        Promise.all(urls.map(url => fetch(url)))
          .then(responses =>
            Promise.all(responses.map(response => response.json()))
          ).then(rawGames => {
            rawGames.map(rawGame => {
              games = games.concat(rawGame.games);
            });
            firebase.database().ref('games').set(games).then(() => {
                alert('Games updated');
              })
              .catch((error) => {
                console.log('Synchronization failed');
              });
          });
      });
  }

}

customElements.define('admin-view', AdminView);