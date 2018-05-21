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
                .submit[disabled] {
                    opacity: 0.5;
                }
            </style>
            <div class="card">
                <div class="search">
                    <search-escape id="searchEscape" idescape="{{idescape}}" title="Escape Room"></search-escape>
                </div>
                <div class="review">
                    <div class="notes">
                        <h2>Note</h2>
                        <paper-textarea id="tanotes" placeholder="¿Te ha gustado el juego?¿Lo recomendarías? ¿Qué es lo mejor que tiene y qué destacarías? ¿Tiene algo que no te haya gustado?¿Qué cambios o mejoras sugerirías?" 
                        rows=4 maxlength=300 value="{{note}}"></paper-textarea>
                    </div>
                    <div class="valorations">
                        <icon-toggle id="general" total=5 icon="star" value={{general}} title="General"></icon-toggle>
                        <icon-toggle id="difficulty" total=5 icon="lock" value={{difficulty}} title="Difficulty"></icon-toggle>
                        <icon-toggle id="ambiance" total=5 icon="home" value={{ambiance}} title="Ambience"></icon-toggle>
                    </div>
                </div>
                <div class="buttons">
                    <paper-button id="btnSave" raised class="submit" disabled="true" on-click="_saveReview">SAVE</paper-button>
                </div>
            </div>
        `;
    }

    static get is() { return 'user-review'; }

    static get properties() {
        return {
            general: {
                type: Number,
                value: 0
            },
            difficulty: {
                type: Number,
                value: 0
            },
            ambiance: {
                type: Number,
                value: 0
            },
            note: {
                type: String
            },
            idescape: {
                type: String
            }
        }
    }

    static get observers() {
        return [
            'validate(general, difficulty, ambiance, note, idescape)'
        ]
    }

    validate(general, difficulty, ambiance, note, idescape) {
        if(general > 0 && difficulty > 0 && ambiance > 0 && note.length > 0 && idescape.length > 0){
            this.$.btnSave.removeAttribute('disabled');
        }
        else {
            this.$.btnSave.setAttribute('disabled',true)
        }
    }

    _saveReview() {
        var review = new Object(),id;
        id = this.idescape;
        review[id] = new Object();
        review[id].valorations = new Object();
        review[id].valorations.general = this.general;
        review[id].valorations.difficulty = this.difficulty;
        review[id].valorations.ambience = this.ambiance;
        review[id].note = this.note;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref('users/' + user.uid+'/reviews').update(review).then( () => {
                    this.dispatchEvent(new CustomEvent('logged'));
                })
                .catch( (error) => {
                    console.log('Synchronization failed');
                });;
            }
        });
    }

}

customElements.define(UserReview.is, UserReview);