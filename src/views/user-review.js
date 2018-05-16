import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-textarea.js';
import '../components/icon-toggle.js';


class UserReview extends PolymerElement {
    static get template() {
        return html`
            <style>
                #review {
                    display: flex;
                }
                #notes {
                    width: 60%;
                }
                #valorations {
                    width: 30%;
                    margin-left: 10%;
                }
            </style>
            <div id="review">
                <div id="notes">
                    <h2>Note</h2>
                    <paper-textarea label="¿Te ha gustado el juego?¿Lo recomendarías?
        ¿Qué es lo mejor que tiene y qué destacarías?
        ¿Tiene algo que no te haya gustado?¿Qué cambios o mejoras sugerirías?" rows=5 maxlength=300></paper-textarea>
                </div>
                <div id="valorations">
                    <icon-toggle total=5 icon="star" value=0 title="Punctuation"></icon-toggle>
                    <icon-toggle total=5 icon="lock" value=0 title="Difficulty"></icon-toggle>
                    <icon-toggle total=5 icon="build" value=0 title="Ambience"></icon-toggle>
                </div>
            </div>
        `;
    }

}

customElements.define('user-review', UserReview);