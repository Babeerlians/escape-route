import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

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
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed>
        <app-header-layout>
          <h1>Escape Route</h1>
          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <login-module name="login"></login-module>
            <search-escape name="search" label="Escape"></search-escape>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
      
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
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

  _routePageChanged(page) {
   if (['login', 'search'].indexOf(page) !== -1) {
     this.page = page;
   } else {
     this.page = 'login';
   }

   // Close a non-persistent drawer when the page & route are changed.
   if (!this.$.drawer.persistent) {
     this.$.drawer.close();
   }
 }

 _pageChanged(page) {
   switch (page) {
     case 'login':
       import('../login/login-module.js');
       break;
     case 'search':
       import('../components/search-escape.js');
       break;
   }
 }
}

window.customElements.define('escape-route-app', EscapeRouteApp);
