import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button.js';
import '../styles/escape-icons.js';

setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath('/');

class EscapeRouteApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #555;
          --app-secondary-color: black;
          --app-drawer-width: 150px;
          display: block;
        }
      
        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }
      
        @media (min-width: 640px) {
          app-drawer {
            z-index:0;
          }
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }
      
        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }
      
        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }
      
        .drawer-list a.iron-selected {
          font-weight: bold;
        }
      
        paper-button.red {
          background-color: red;
          color: white;
          float: right;
        }
      </style>
      
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>
      
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>
      
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="login" href="[[rootPath]]login">Login</a>
            <a name="route" href="[[rootPath]]route">Route</a>
            <a name="review" href="[[rootPath]]review">Review</a>
            <a name="mates" href="[[rootPath]]mates">Mates</a>
          </iron-selector>
        </app-drawer>
      
        <!-- Main content -->
        <app-header-layout has-scrolling-region="">
      
          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="escape-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Escape route</div>
              <paper-button raised noink class="red" on-click="logout">Log out</paper-button>
            </app-toolbar>
          </app-header>
      
          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <login-module name="login" on-logged="_navigateToRoute"></login-module>
            <user-route name="route"></user-route>
            <user-review name="review" on-saved="_navigateToRoute"></user-review>
            <escape-mates name="mates"></escape-mates>
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
      subroute: Object,
      appInitialized: Boolean
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  constructor() {
    super();
    this._initializeFirebaseApp();
  }

  _initializeFirebaseApp() {
    if (!this.appInitialized) {
      var config = {
        apiKey: "AIzaSyD67FXv2kXAFAFTITru3_UH63VXeYQRURk",
        authDomain: "escape-route-5e029.firebaseapp.com",
        databaseURL: "https://escape-route-5e029.firebaseio.com",
        projectId: "escape-route-5e029",
        storageBucket: "escape-route-5e029.appspot.com",
        messagingSenderId: "372037266043"
      };
      firebase.initializeApp(config);
      this.appInitialized = true;
    }
  }


  _routePageChanged(page) {
    if (!this.appInitialized) {
      this._initializeFirebaseApp();
    }
    if (['review', 'route', 'mates'].indexOf(page) !== -1) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.page = page;
        } else {
          this.page = 'login';
          this.set('route.path', 'login');
        }
      });
    } else {
      this.page = 'login';
      this.set('route.path', 'login');
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _navigateToRoute(e) {
    this.set('route.path', 'route');
  }

  _pageChanged(page) {
    switch (page) {
      case 'login':
        import('../login/login-module.js');
        break;
      case 'review':
        import('../views/user-review.js');
        break;
      case 'route':
        import('../views/user-route.js');
        break;
      case 'mates':
        import('../mates/escape-mates.js');
        break;
    }
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log("chao");
      this.user = undefined;
      this.mates = [];
    }, function (error) {
      console.log("sigues logueado");
    });
  }

}

window.customElements.define('escape-route-app', EscapeRouteApp);
