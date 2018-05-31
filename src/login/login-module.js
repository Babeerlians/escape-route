import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '../login/login-button.js';
import '../styles/shared-styles.js';
/**
 * @customElement
 * @polymer
 */
class LoginModule extends PolymerElement {
  static get template() {
    return html `
       <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <div class="card">
        <login-button on-login-user="_manageLoginUser">Login</login-button>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    firebase.auth().onAuthStateChanged(user => {
      if (user && this.route && Object.is(this.route.prefix, '/login')) {
        this.dispatchEvent(new CustomEvent('logged', {
          detail: {
            user
          }
        }));
      }
    });
  }

  _manageLoginUser(event) {
    firebase.database().ref('users/' + event.detail.user.uid).on('value', snapshot => {
      if (!snapshot.val()) {
        const user = {
          [event.detail.user.uid]: {
            displayName: event.detail.user.displayName,
            email: event.detail.user.email
          }
        }
        firebase.database().ref('users').update(user).then(() => {
            this.dispatchEvent(new CustomEvent('saved'));
          })
          .catch((error) => {
            console.log('Synchronization failed');
          });
      }
    });
  }

}

window.customElements.define('login-module', LoginModule);