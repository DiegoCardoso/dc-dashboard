import { html, css, customElement } from 'lit-element';
import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';

/**
 * `<dc-dashboard>` is a Web Component.
 *
 * @element dc-dashboard
 */
@customElement('dc-dashboard')
class DcDashboard extends VaadinElement {
  static get is() {
    return 'dc-dashboard';
  }

  static get version() {
    return '0.1.0';
  }

  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: repeat(var(--dc-dashboard-columns, 4), 1fr);
        grid-auto-rows: var(--dc-dashboard-row-height, 200px);
      }

      :host([hidden]) {
        display: none !important;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

export { DcDashboard };

declare global {
  interface HTMLElementTagNameMap {
    'dc-dashboard': DcDashboard;
  }
}
