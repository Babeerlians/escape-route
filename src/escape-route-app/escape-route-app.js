import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';
import {
  setPassiveTouchGestures,
  setRootPath
} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '../styles/escape-icons.js';
import '../admin/admin-view.js';
import '../games/escape-games.js';
import '../games/game-view.js';
import '../login/login-module.js';
import '../views/user-review.js';
import '../views/user-route.js';
import '../views/review-game.js';

setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath('/');

class EscapeRouteApp extends PolymerElement {
  static get template() {
    return html `
     <style>
        :host {
          --app-primary-color: #f73859;
          --app-secondary-color: #f3ecc8;
          --app-tertiary-color: #404b69;
          --app-drawer-width: 120px;
          --iron-image-width: 42px;
          display: block;
        }

        app-header {
          color: #fff;
          background-color: var(--app-tertiary-color);
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
          color: black;
          line-height: 40px;
        }
      
        .drawer-list a.iron-selected {
          font-weight: bold;
        }

        .logo {
          border-radius: 50%;
          vertical-align: sub;
        }

        .title {
          vertical-align: super;
          margin-left: 4px;
        }
      
        paper-icon-button:hover {
          color: var(--app-primary-color);
        }

        .drawer {
          margin-top: 4em
        }
      </style>
      
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>
      
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>
      
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
      
        <!-- Main content -->
        <app-header-layout has-scrolling-region="">
      
          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="escape-icons:menu" drawer-toggle="" on-click="_toggleMenu"></paper-icon-button>
              <div main-title="Babeerlian - Escape route">
                <iron-image alt="Babeerlian" class="logo" src="./logo.png"></iron-image>
                <span class="title">Escape route<span>
              </div>
              <paper-icon-button icon="power-settings-new" title="Log out" on-click="logout"></paper-icon-button>
            </app-toolbar>
          </app-header>
          <app-drawer-layout id="drawerLayout" force-narrow>
            <app-drawer id="drawer" class="drawer" slot="drawer" swipe-open="[[narrow]]">
              <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                <a name="route" href="[[rootPath]]route">Route</a>
                <a name="games" href="[[rootPath]]games">Games</a>
                <a name="about" href="https://babeerlians.github.io/" target="_blank">About us</a>
              </iron-selector>
            </app-drawer>
            <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
              <login-module name="login" route="[[subroute]]" on-logged="_navigateToRoute"></login-module>
              <user-route name="route" on-view-review="_navigateToReview"></user-route>
              <escape-games name="games" on-game-selected="_navigateToGame"></escape-games>
              <game-view name="game" route="[[subroute]]"></game-view>
              <user-review name="add-review" user="[[user]]" on-saved="_navigateToRoute" on-discarded="_navigateToRoute"></user-review>
              <admin-view name="admin"></admin-view>
              <review-game name="review" route="[[subroute]]"></review-game>
            </iron-pages>
          </app-drawer-layout>
        </app-header-layout>
      </app-drawer-layout>

    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true
      },
      routeData: Object,
      subroute: Object,
      appInitialized: {
        type: Boolean,
        value: false
      }
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
    if (!this.appInitialized && !firebase.apps.length) {
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
    if (['login'].indexOf(page) !== -1 || Object.is(page, '')) {
      this.page = 'login';
      this.set('route.path', 'login');
    } else {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
          this.page = page;
        } else {
          this.page = 'login';
          this.set('route.path', 'login');
        }
      });
    }
    this.$.drawer.close();
    this.$.drawerLayout.forceNarrow = true;
  }

  _toggleMenu(event) {
    if (this.$.drawerLayout.forceNarrow || !this.$.drawerLayout.narrow) {
      this.$.drawerLayout.forceNarrow = !this.$.drawerLayout.forceNarrow;
    }
      this.$.drawer.toggle();   
  }

  _navigateToPath(path) {
    this.set('route.path', path);
  }

  _navigateToRoute() {
    this._navigateToPath('route');
  }
  _navigateToGames(event) {
    this._navigateToPath('games');
  }
  _navigateToGame(event) {
    this._navigateToPath('game/' + event.detail.gameId);
  }

  _navigateToReview(event) {
    this._navigateToPath('review/' + event.detail.reviewId);
  }

  logout() {
    firebase.auth().signOut();
  }

}

window.customElements.define('escape-route-app', EscapeRouteApp);