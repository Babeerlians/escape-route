import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../login/login-module.js';

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
      
        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      <h1 class="center">Escape Route</h1>
      <login-module class="center"></login-module>
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
