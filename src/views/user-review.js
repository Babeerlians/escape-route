import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker-light.js';
import '../components/icon-toggle.js';
import '../components/search-escape.js';
import '../components/search-mate.js';
import '../components/time-picker.js';
import '../styles/shared-styles.js';

class UserReview extends PolymerElement {
    static get template() {
        return html `
            <style include="shared-styles">
                :host {
                   margin: auto;
                }
                .valoration {
                    display: flex;
                }
            
                .review {
                    display: flex;
                }
                .card {
                    max-width: 100%;
                }
                .date {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                }
            
                @media (min-width: 1001px) {
                    .review {
                        justify-content: space-evenly;
                    }
                    .search {
                        display: block;
                    }
                    .notes {
                        width: 100%;
                    }
                    .valoration {
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
                    .valoration {
                        flex-direction: column;
                        display: inline-grid;
                    }
                }
            
                @media (max-width: 1000px) {
                    .review {
                        flex-direction: column;
                        margin: 5px;
                    }
                    .valoration {
                        justify-content: space-evenly;
                    }
                }
            
                paper-textarea {
                    background-color: var(--app-secondary-color)
                }
            
                @media (max-width: 640px) {
                    .review {
                        flex-direction: column;
                    }
                }
            
                .buttons {
                    display: flex;
                    justify-content: space-evenly;
                }
            
                .submit {
                    margin-top: 20px;
                }
            
                .submit[disabled] {
                    opacity: 0.5;
                }
            
                paper-toggle-button {
                    --paper-toggle-button-checked-bar-color: var(--app-primary-color);
                    --paper-toggle-button-checked-button-color: var(--app-primary-color);
                    --paper-toggle-button-unchecked-bar-color: var(--app-tertiary-color);
                    --paper-toggle-button-unchecked-button-color: var(--app-secondary-color);
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
                            rows=4 maxlength=3000 value="{{note}}"></paper-textarea>
                    </div>
                    <div class="valoration">
                        <icon-toggle id="general" total=5 icon="star" value={{general}} title="General"></icon-toggle>
                        <icon-toggle id="difficulty" total=5 icon="lock" value={{difficulty}} title="Difficulty"></icon-toggle>
                        <icon-toggle id="ambience" total=5 icon="image:color-lens" value={{ambience}} title="Ambience"></icon-toggle>
                    </div>
                </div>
                <div class="mates">
                    <search-mate id="searchMate" mates="{{mates}}" title="Mate"></search-mate>
                </div>
                <div>
                    <h2>Fecha</h2>
                    <div class="date">
                        <vaadin-date-picker-light id="vdate" value="{{date}}">
                            Fecha:
                            <iron-icon icon="event"></iron-icon>
                            <iron-input>
                                <input size="10" disabled>
                            </iron-input>
                        </vaadin-date-picker-light>
                        <paper-toggle-button on-change="toggleDuration" checked="{{completed}}">Completed</paper-toggle-button>
                        <time-picker id="duration" minutes="{{minutes}}" seconds="{{seconds}}" class="not-visible"></time-picker>
                    </div>
                </div>
                <paper-input id="imagesUpload" type="file" on-change="_filesChanged"></paper-input>
                <div class="buttons">
                    <paper-button raised class="submit" on-click="_discardReview">Discard</paper-button>
                    <paper-button id="btnSave" raised class="submit red" disabled="true" on-click="_saveReview">Save</paper-button>
                </div>
            </div>
        `;
    }

    static get is() {
        return 'user-review';
    }

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
            ambience: {
                type: Number,
                value: 0
            },
            note: {
                type: String,
                value: ''
            },
            idescape: {
                type: String,
                value: ''
            },
            mates: {
                type: Array,
                value: []
            },
            completed: {
                type: Boolean,
                value: false
            },
            date: {
                type: String,
                value: ''
            },
            minutes: {
                type: Number,
                value: 0
            },
            seconds: {
                type: Number,
                value: 0
            }
        }
    }

    static get observers() {
        return [
            'validate(general, difficulty, ambience, note, idescape, completed, date, minutes, seconds)'
        ]
    }

    validate(general, difficulty, ambience, note, idescape, completed, date, minutes, seconds) {
        if (general > 0 && difficulty > 0 && ambience > 0 && note.length > 0 && idescape.length > 0 && date.length > 0) {
            if (completed === false || (completed === true && (minutes > 0 || seconds > 0))) {
                this.$.btnSave.removeAttribute('disabled');
            } else {
                this.$.btnSave.setAttribute('disabled', true);
            }
        } else {
            this.$.btnSave.setAttribute('disabled', true);
        }
    }

    toggleDuration(event) {
        this.$.duration.toggle();
    }

    _discardReview() {
        this.dispatchEvent(new CustomEvent('discarded'));
    }

    _saveReview() {
        let imageStored = this.image ? 'images/' + this.idescape + '/' + this.user.uid + '/' + this.image.name : false,
            review = {
                [this.idescape]: {
                    valoration: {
                        general: this.general,
                        difficulty: this.difficulty,
                        ambience: this.ambience
                    },
                    note: this.note,
                    mates: this.mates,
                    date: this.date,
                    completed: this.completed,
                    imageStored,
                    duration: {
                        minutes: this.minutes,
                        seconds: this.seconds
                    }
                }
            };

        if (imageStored) {
            //Upload image
            var storageRef = firebase.storage().ref(imageStored);
            storageRef.put(this.image).then(() => {
                this._updateReview(review);
            });
        } else {
            this._updateReview(review);
        }
    }

    _updateReview(review) {
        firebase.database().ref('users/' + this.user.uid + '/reviews').update(review).then(() => {
            firebase.database().ref('users').once('value', snapshot => {
                let valorationAcc = {
                    valoration: {
                        ambience: 0,
                        difficulty: 0,
                        general: 0
                    }
                };
                let reviews = Object.values(snapshot.val()).filter(user => user.reviews && user.reviews.hasOwnProperty(this.idescape)).map(item => item.reviews[this.idescape]);
                let valorationAverage = reviews.reduce((acc, item) => {
                    acc.valoration.ambience += item.valoration.ambience / reviews.length;
                    acc.valoration.difficulty += item.valoration.difficulty / reviews.length;
                    acc.valoration.general += item.valoration.general / reviews.length;
                    return acc;
                }, valorationAcc);
                firebase.database().ref('games/' + this.idescape).update(valorationAverage).then(() => {
                    this.dispatchEvent(new CustomEvent('saved'));
                }).catch((error) => {
                    console.log('Synchronization failed');
                });
            });
        }).catch((error) => {
            console.log('Synchronization failed');
        });
    }

    _filesChanged(event) {
        this.image = this.$.imagesUpload.inputElement.inputElement.files[0];
        console.log(this.image);
    }

}

window.customElements.define(UserReview.is, UserReview);