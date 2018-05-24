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
            <integer-input id="minute"  min=0 max=60 placeholder="00" title="Minutes"></integer-input>
            <span> [[timeSeparator]] </span>
            <integer-input id="seconds" min=0 max=59 placeholder="00" title="Seconds"></integer-input>
        `;
    }

    static get is() {
        return 'time-picker';
    }

    static get properties() {
        return {
            _timeOnly: {
                type: Boolean,
                value: true
            },
            timeSeparator: {
                type: String,
                value: ':'
            }
        }
    }

    toggle() {
        this.classList.toggle('hidden');
    }
}

window.customElements.define(TimePicker.is, TimePicker);