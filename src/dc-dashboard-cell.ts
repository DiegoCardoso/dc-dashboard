import { customElement, html, property, css } from 'lit-element';
import { VaadinElement } from '@vaadin/element-base';

/**
 * `<dc-dashboard>` is a Web Component.
 *
 * @element dc-dashboard
 */
@customElement('dc-dashboard-cell')
class DcDashboardCell extends VaadinElement {
  static get is() {
    return 'dc-dashboard-cell';
  }

  @property({ type: Number, reflect: true })
  row: number | null | undefined;

  @property({ type: Number, reflect: true })
  col: number | null | undefined;

  @property({ type: Number, reflect: true })
  rowSpan: number | null | undefined;

  @property({ type: Number, reflect: true })
  colSpan: number | null | undefined;

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      :host([hidden]) {
        display: none !important;
      }

      ::slotted(*) {
        width: 100%;
        height: 100%;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

export { DcDashboardCell };

declare global {
  interface HTMLElementTagNameMap {
    'dc-dashboard-cell': DcDashboardCell;
  }
}
