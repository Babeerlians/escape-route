import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

class IconToggle extends PolymerElement {
  static get template() {
    return html`
        <style>
          :host {
            display: block;
            --icon-toggle-outline-color: var(--app-tertiary-color);
            --icon-toggle-color: var(--app-secondary-color);
            --icon-toggle-pressed-color: var(--app-primary-color);
          }
        
          div>iron-icon {
            fill: var(--icon-toggle-color, rgba(0, 0, 0, 0));
            stroke: var(--icon-toggle-outline-color, currentcolor);
          }
        
          div>iron-icon.pressed {
            fill: var(--icon-toggle-pressed-color, currentcolor);
          }
        
          div {
            cursor: pointer;
          }
        
          div.readOnly {
            cursor: not-allowed;
          }
        
          div:not(.readOnly):hover>iron-icon {
            fill: var(--icon-toggle-pressed-color, currentcolor);
          }
        
          div:not(.readOnly):hover>iron-icon:hover {
            fill: var(--icon-toggle-pressed-color, currentcolor);
          }
        
          div:not(.readOnly):hover>iron-icon:hover~iron-icon {
            fill: var(--icon-toggle-color, currentcolor);
          }
        </style>
        <h2>{{title}}</h2>
        <div id="iconsbar">
          <template id="iconsList" is="dom-repeat" items="{{icons}}">
            <iron-icon value={{item.value}} icon="{{item.icon}}" on-click="toggle"></iron-icon>
          </template>
        </div>
    `;
  }
  static get properties() {
    return {
      total: {
        type: Number
      },
      value: {
        type: Number,
        value: 0,
        notify: true
      },
      icon: {
        type: String
      },
      title: {
        type: String
      },
      pressed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      icons: {
        type: Array,
        value: []
      }
    };
  }

  ready() {
    super.ready();
    this.icons = [];
    for (let i = 1; i <= this.total; i++) {
      this.icons.push({
        icon: this.icon,
        value: i
      });
    }
    if (this.attributes.readonly) {
      this.$.iconsbar.classList.add("readOnly");
    }
    this._renderList();
  }

  _renderList() {
    this.icons.sort((a, b) => a.value > b.value);
    this.$.iconsList.render();
    this._markPressedIcons();
  }
  _markPressedIcons() {
    let icons = this.$.iconsbar.children;
    for (let icon of icons) {
      if (icon.value <= this.value) {
        icon.classList.add('pressed');
      } else
        icon.classList.remove('pressed');
    }
  }

  toggle(e) {
    if (!this.attributes.readonly) {
      this.value = e.target.value;
      this._markPressedIcons();
    }
  }
}

customElements.define('icon-toggle', IconToggle);