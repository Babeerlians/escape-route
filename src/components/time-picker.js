import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import './integer-input.js';

class TimePicker extends PolymerElement {

    static get template() {
        return html `
            <style>
                :host {
                    display: flex;
                    align-items: flex-end;
                }
                span {
                    font-weight: bold;
                    margin-bottom: 2.5rem;
                }
            </style>
            <integer-input id="minutes" value={{minutes}} min=0 max=60 placeholder="00" title="Minutes" on-change="_validateDuration"></integer-input>
            <span> [[timeSeparator]] </span>
            <integer-input id="seconds" value={{seconds}} min=0 max=59 placeholder="00" title="Seconds" on-change="_validateDuration"></integer-input>
        `;
    }

    static get is() {
        return 'time-picker';
    }

    static get properties() {
        return {
            timeSeparator: {
                type: String,
                value: ':'
            },
            minutes: {
                type: Number,
                value: 0,
                notify: true
            },
            seconds: {
                type: Number,
                value: 0,
                notify: true
            }
        }
    }

    toggle() {
        this.classList.toggle('not-visible');
        this.classList.toggle('visible');
    }

    _validateDuration(event) {
        if(this.$.minutes.value === this.$.minutes.max){
            this.$.seconds.value = 0;
        }
    }
}

window.customElements.define(TimePicker.is, TimePicker);