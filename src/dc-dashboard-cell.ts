import { customElement, html, property } from 'lit-element';
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

  @property({ type: Number })
  row: number | null | undefined;

  @property({ type: Number })
  col: number | null | undefined;

  @property({ type: Number })
  rowSpan: number | null | undefined;

  @property({ type: Number })
  colSpan: number | null | undefined;

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
