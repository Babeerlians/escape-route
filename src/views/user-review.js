import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-textarea.js';
import '../components/icon-toggle.js';
import '../components/search-escape.js';
import '../styles/shared-styles.js';

class UserReview extends PolymerElement {
    static get template() {
        return html`
            <style include="shared-styles">
                .valorations {
                    display: flex;
                }
                .review {
                        display: flex;
                }
                @media (min-width: 1001px) {
                    .review {
                        justify-content: space-around;
                    }
                    .search {
                        display: block;
                    }
                    .notes {
                        width: 100%;
                    }
                    .valorations {
                        width: 30%;
                        flex-direction: column;
                        margin-left: 5%;
                    }
                }
                @media (max-width: 640px) {
                    .review {
                        flex-direction: column;
                    }
                }
                @media (max-width: 800px) {
                    .valorations {
                        flex-direction: column;
                        display: inline-grid;
                    }
                }
                @media (max-width: 1000px) {
                    .review {
                        flex-direction: column;
                        margin: 5px;
                    }
                    .valorations {
                        justify-content: space-around;
                    }
                }
                paper-textarea {
                    background-color: whitesmoke
                }
                @media (max-width: 640px){
                    .review {
                        flex-direction: column;
                    }
                }
                .buttons {
                    display: flex;
                    justify-content: center
                }
                .submit {
                    background-color: CornflowerBlue;
                    color: black;
                    font-weight: bold;
                    margin-top: 20px;
                }
            </style>
            <div class="card">
                <div class="search">
                    <search-escape title="Escape Room"></search-escape>
                </div>
                <div class="review">
                    <div class="notes">
                        <h2>Note</h2>
                        <paper-textarea placeholder="¿Te ha gustado el juego?¿Lo recomendarías? ¿Qué es lo mejor que tiene y qué destacarías? ¿Tiene algo que no te haya gustado?¿Qué cambios o mejoras sugerirías?" 
                        rows=4 maxlength=300></paper-textarea>
                    </div>
                    <div class="valorations">
                        <icon-toggle total=5 icon="star" value=0 title="Punctuation"></icon-toggle>
                        <icon-toggle total=5 icon="lock" value=0 title="Difficulty"></icon-toggle>
                        <icon-toggle total=5 icon="home" value=0 title="Ambience"></icon-toggle>
                    </div>
                </div>
                <div class="buttons">
                    <paper-button raised class="submit" disabled="[[isDisabled(invalid, value)]]" on-click="_saveReview">SAVE</paper-button>
                </div>
            </div>
        `;
    }

    static get is() { return 'user-review'; }

    static get properties() { 
        return {
            value: {
                type: Number
            }
        }
    }

}

customElements.define('user-review', UserReview);