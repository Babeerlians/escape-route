import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-textarea.js';
import '../components/icon-toggle.js';
import '../styles/shared-styles.js';

class UserReview extends PolymerElement {
    static get template() {
        return html`
            <style include="shared-styles">
                .review {
                    display: flex;
                }
                .notes {
                    width: 100%;
                }
                .valorations {
                    margin-left: 10%;
                }
                @media (max-width: 640px){
                    .review {
                        flex-direction: column;
                    }
                }
            </style>
            <div class="card review">
                <div class="notes">
                    <h2>Note</h2>
                    <paper-textarea label="¿Te ha gustado el juego?¿Lo recomendarías?
        ¿Qué es lo mejor que tiene y qué destacarías?
        ¿Tiene algo que no te haya gustado?¿Qué cambios o mejoras sugerirías?" rows=5 maxlength=300></paper-textarea>
                </div>
                <div class="valorations">
                    <icon-toggle total=5 icon="star" title="Punctuation"></icon-toggle>
                    <icon-toggle total=5 icon="lock" title="Difficulty"></icon-toggle>
                    <icon-toggle total=5 icon="home" title="Ambience"></icon-toggle>
                </div>
            </div>
        `;
    }

}

customElements.define('user-review', UserReview);