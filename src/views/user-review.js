import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-textarea.js';
import '../components/icon-toggle.js';
import '../components/search-escape.js';
import '../styles/shared-styles.js';

class UserReview extends PolymerElement {
    static get template() {
        return html`
            <style include="shared-styles">
                @media (min-width: 1001px) {
                    #review {
                        display: flex;
                        justify-content: space-around;
                    }
                    #search {
                        display: block;
                    }
                    #notes {
                        width: 60%;
                    }
                    #valorations {
                        display: flex;
                        flex-direction: column;
                    }
                }
                @media (max-width: 640px) {
                    #review {
                        display: flex;
                        flex-direction: column;
                    }
                }
                @media (max-width: 750px) {
                    #valorations {
                        display: flex;
                        flex-direction: column;
                    }
                }
                @media (max-width: 1000px) {
                    #review {
                        display: flex;
                        flex-direction: column;
                        margin: 5px;
                    }
                    #valorations {
                        display: flex;
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
            </style>
            <div id="review" class="card">
                <div id="search">
                    <search-escape title="Escape Room"></search-escape>
                </div>
                <div id="notes">
                    <h2>Note</h2>
                    <paper-textarea placeholder="¿Te ha gustado el juego?¿Lo recomendarías? ¿Qué es lo mejor que tiene y qué destacarías? ¿Tiene algo que no te haya gustado?¿Qué cambios o mejoras sugerirías?" 
                    rows=5 maxlength=300></paper-textarea>
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