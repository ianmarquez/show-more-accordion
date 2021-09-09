import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

export class NsContentAccordion extends PolymerElement {
  ready() {
    super.ready();
    this.CLAMP_LIMIT = 200;
    const [ shown, hidden ] = this.splitContent(this.content);
    this.shown = shown;
    this.hidden = hidden;
    this.activated = false;
    this.shouldClamp = this._shouldClamp();
  }

  _shouldClamp() {
    if (this.content && this.content.length >= this.CLAMP_LIMIT) {
      return true;
    }
    return false;
  }

  splitContent(string) {
    if (!string) return [null, null];
    const shownContent = string.substring(0, this.CLAMP_LIMIT);
    const hiddenContent = string.substring(this.CLAMP_LIMIT);
    return [shownContent, hiddenContent];
  }

  getClassName() {
    if (this.activated) {
      return this.className = 'closed';
    } else {
      return this.className = 'opened';
    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
      .ns-content-accordion {
        max-width: 400px;
      }

      .divider {
        position: absolute;
        bottom: 0px;
        height: 50px;
        width: 100%;
        text-align: center;
        background-color: white;
        background: -moz-linear-gradient(top,  rgba(255,255,255,0) -10%, rgba(255,255,255,1) 100%);
        background: -webkit-linear-gradient(top,  rgba(255,255,255,0) -10%,rgba(255,255,255,1) 100%);
        background: linear-gradient(to bottom,  rgba(255,255,255,0) -10%,rgba(255,255,255,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 );
        float: left;
      }
      #content {
        margin-bottom: 20px;
        position: relative;
      }

      svg {
        margin: auto;
        cursor: pointer;
        z-index: 2;
        display: inline-block;
      }
    
      .opened {
        transform: rotate(180deg);
      }
    </style>
    
    <div class="ns-content-accordion">
      <div id="content">
        <span>[[shown]]</span>
        <template is="dom-if" if="[[shouldClamp]]">
          <template is="dom-if" if="[[!activated]]">
            <span>...</span> 
            <div class="divider"></div>
          </template>
          <template is="dom-if" if="[[ activated ]]">
            <span>[[hidden]]</span>
          </template>
        </template>
      </div>
      <div style="text-align: center;">
        <svg class$="[[ className ]]" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" on-click="onClick">
          <path d="M18 11L13 17L8 11" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="13" cy="13" r="12.5" stroke="#747474"/>
        </svg>
      </div>
    </div>
    `
  }

  onClick() {
    this.className = this.getClassName();
    this.activated = !this.activated;
  }

  static get properties() {
    return {
      content: {
        type: String, 
        value: this.content
      },
      shown: String,
      activated: Boolean,
      hidden: String,
      shouldClamp: Boolean,
      className: {
        type: String,
        value: 'closed'
      }
    }
  }

  static get is() {
    return 'ns-content-accordion';
  }
}

window.customElements.define(NsContentAccordion.is, NsContentAccordion);