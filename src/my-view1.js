/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import './ns-content-accordion/ns-content-accordion.js';


class MyView1 extends PolymerElement {
  
  constructor() {
    super();
  }

  ready() {
    super.ready();
    setTimeout(() => {
      this.content = 'I love how great I feel from these Nu Skin products. Everyone is shocked when I tell them my real age. Explore my site and checkout my favourite products that keep me feeling and looking young.';
    }, 1000);
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
      </style>
      <div class="card">
        <div>[[ content ]]</div>
        <hr/>
        <ns-content-accordion content="{{ content }}"/>
      </div>
      `;
  }

  static get properties() {
    return {
      content: {
        value: '',
        type: String,
      }
    }
  }
}

window.customElements.define('my-view1', MyView1);
