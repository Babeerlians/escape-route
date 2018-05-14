import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../login/login-module.js';

import '../components/search-escape.js';

/**
 * @customElement
 * @polymer
 */
class EscapeRouteApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      
        .card {
          margin: 24px;
          padding: 16px;
          color: #757575;
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
      </style>
      
      <app-drawer-layout fullbleed>
        <app-header-layout>
          <iron-pages role="main">
            <div class="card">
              <h1>Escape Route</h1>
              <login-module></login-module>
            </div>
            <search-escape label="Escape"></search-escape>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
      
    `;
  }

  ready() {
    super.ready();
    this._initializeFirebaseApp();
  }

  _initializeFirebaseApp() {
    var config = {
      apiKey: "AIzaSyD67FXv2kXAFAFTITru3_UH63VXeYQRURk",
      authDomain: "escape-route-5e029.firebaseapp.com",
      databaseURL: "https://escape-route-5e029.firebaseio.com",
      projectId: "escape-route-5e029",
      storageBucket: "escape-route-5e029.appspot.com",
      messagingSenderId: "372037266043"
    };
    firebase.initializeApp(config);
  }
}

window.customElements.define('escape-route-app', EscapeRouteApp);
