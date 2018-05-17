import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-textarea.js';
import '../components/icon-toggle.js';
import '../styles/shared-styles.js';

class UserRoute extends PolymerElement {
    static get template() {
        return html`
            <style include="shared-styles">
                #review {
                    display: flex;
                }
                #notes {
                    width: 100%;
                }
                #valorations {
                    margin-left: 10%;
                }
                @media (max-width: 640px){
                    #review {
                        flex-direction: column;
                    }
                }
            </style>
            <div class="card">
                <div id="valorations">
                    <icon-toggle total=5 icon="star" readonly value="[[]]" title="Punctuation"></icon-toggle>
                    <icon-toggle total=5 icon="lock" readonly value="[[]]" title="Difficulty"></icon-toggle>
                    <icon-toggle total=5 icon="home" readonly value="[[]]" title="Ambience"></icon-toggle>
                </div>
            </div>
        `;
    }


    ready() {
        super.ready();
    }
}

customElements.define('user-route', UserRoute);