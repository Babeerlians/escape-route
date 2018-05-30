import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .card {
        margin: 16px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }
      @media (max-width: 640px) {
        .card {
          margin: 0px;
        }
      }

      .red {
        background-color: var(--app-primary-color);
        color: white;
      }
      
      .bold {
        font-weight: bold;
      }

      .circle {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        background: #ddd;
        font-size: 30px;
        line-height: 64px;
      }

      .flex {
        display: flex;
      }

      .hidden {
        display: none;
      }

      .not-visible {
        opacity: 0;
        transition: all .5s;
      }

      .visible {
        opacity: 1;
        transition: all .5s;
      }

      h1 {
        margin: 16px 0;
        color: #212121;
        font-size: 22px;
      }
      paper-input, paper-textarea {
        padding: 0 4px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
