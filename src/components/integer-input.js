import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';

class IntegerInput extends PolymerElement {

    static get template() {
        return html`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;                    
                }
            
                .no-spin::-webkit-inner-spin-button,
                .no-spin::-webkit-outer-spin-button {
                    -webkit-appearance: none !important;
                    margin: 0 !important;
                    -moz-appearance: textfield !important;
                }            
                input {                 
                    background-color: var(--app-secondary-color);   
                    text-align: center;
                    width: 30px;
                    border: 0px;
                    font-weight: bold;
                }
                h5 {
                    margin: 0px;
                }
                paper-icon-button {
                    color: var(--app-primary-color);
                    --paper-icon-button-ink-color: var(--app-primary-color);
                }
            </style>
            <h5>[[title]]</h5>
            <paper-icon-button icon="expand-less" on-mousedown="_addTime" on-click="_add" on-mouseup="_cancelTime" on-mouseleave="_cancelTime"></paper-icon-button>
            <input id="number" class="no-spin" type="number" value=[[value]] min=[[min]] max=[[max]] placeholder="00" on-keypress="validate"/>
            <paper-icon-button icon="expand-more" on-mousedown="_substractTime" on-click="_substract" on-mouseup="_cancelTime" on-mouseleave="_cancelTime"></paper-icon-button>
        `;
    }

    static get is() {
        return 'integer-input';
    }

    static get properties() {
        return {
            title: String,
            step: {
                type: Number,
                value: 1
            },
            value: {
                type: Number,
                value: 0,
                notify: true,
                reflectToAtribute: true,
                observer: '_changeValue'
            },
            max: {
                type: Number,
                value: 60
            },
            min: {
                type: Number,
                value: 0
            }
        };
    }

    validate(event) {
        let n = String.fromCharCode(event.keyCode);
        let total = event.target.value;
        if (Number.isInteger(parseInt(n, 10))) {
            if (parseInt(event.target.value + n) <= event.target.max) {
                this.value = parseInt(event.target.value + n);
            }
        }
        event.preventDefault();
        return false;
    }

    _add() {
        if (this.value < this.max) {
            this.value += this.step;
        }
        else{
            this.value = this.min;
        }
        return false;
    }

    _substract() {
        if (this.value > this.min) {
            this.value -= this.step;
        }
        else{
            this.value = this.max;
        }
        return false;
    }

    _addTime(event) {
        this.currentInterval =  setInterval(()=>this._add(), 200);
    }

    _substractTime(event) {
        this.currentInterval =  setInterval(()=>this._substract(), 200);
    }

    _cancelTime(event) {
        clearInterval(this.currentInterval);
    }

    _changeValue(oldValue, newValue) {
        this.dispatchEvent(new CustomEvent('change'));
    }
}

window.customElements.define(IntegerInput.is, IntegerInput);