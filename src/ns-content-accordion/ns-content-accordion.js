import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

export class NsContentAccordion extends PolymerElement {
  ready() {
    super.ready();
    this.CLAMP_LIMIT = 200;
    this.shown = this._getContent();
    this.activated = false;
    this.shouldClamp = this._shouldClamp();
  }

  _onContentChange(newVal) {
    if (newVal) {
      this.set('content', newVal);
      this.shown = this._getContent();
      this.activated = false;
      this.shouldClamp = this._shouldClamp();
    }
  }

  _getContent() {
    if (!this.content) return;
    const [ shown, hidden ] = this._splitContent(this.content);
    if (this.activated) {
      return shown + hidden;
    } else {
      return this.shouldClamp ? shown + '...' : shown;
    }
  }

  _shouldClamp() {
    if (this.content && this.content.length >= this.CLAMP_LIMIT) {
      return true;
    }
    return false;
  }

  _splitContent(string) {
    if (!string) return [null, null];
    const shownContent = string.substring(0, this.CLAMP_LIMIT);
    const hiddenContent = string.substring(this.CLAMP_LIMIT);
    return [shownContent, hiddenContent];
  }

  _setClassName() {
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
        height: 20px;
        width: 100%;
        text-align: center;
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
          <div hidden$="[[ activated ]]" class="divider"></div>
        </template>
      </div>
      <div style="text-align: center;" hidden$="[[ !shouldClamp ]]">
        <svg class$="[[ className ]]" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" on-click="_onClick">
          <path d="M18 11L13 17L8 11" stroke="#747474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="13" cy="13" r="12.5" stroke="#747474"/>
        </svg>
      </div>
    </div>
    `
  }

  _onClick() {
    this.className = this._setClassName();
    this.activated = !this.activated;
    this.shown = this._getContent();
  }

  static get properties() {
    return {
      content: {
        type: String, 
        value: '',
        observer: '_onContentChange'
      },
      shown: String,
      activated: Boolean,
      hidden: String,
      shouldClamp: Boolean,
      className: {
        type: String,
        value: 'closed'
      },
      fadeTo: String
    }
  }

  static get is() {
    return 'ns-content-accordion';
  }
}

window.customElements.define(NsContentAccordion.is, NsContentAccordion);