import { html, css, customElement, property, PropertyValues } from 'lit-element';
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

  static COLUMN_CSS_PROP = '--dc-dashboard-columns';

  static ROW_HEIGHT_CSS_PROP = '--dc-dashboard-row-height';

  @property({ type: Number })
  columns: number | undefined | null;

  @property({ type: String })
  rowHeight: string | undefined | null;

  static get styles() {
    return css`
      :host {
        --dc-dashboard-columns: 4;
        --dc-dashboard-row-height: 200px;
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

  protected update(props: PropertyValues) {
    if (props.has('columns')) {
      if (this.columns) {
        this.style.setProperty(DcDashboard.COLUMN_CSS_PROP, `${this.columns}`);
      } else {
        this.style.removeProperty(DcDashboard.COLUMN_CSS_PROP);
      }
    }

    if (props.has('rowHeight')) {
      if (this.rowHeight) {
        this.style.setProperty(DcDashboard.ROW_HEIGHT_CSS_PROP, this.rowHeight);
      } else {
        this.style.removeProperty(DcDashboard.ROW_HEIGHT_CSS_PROP);
      }
    }

    this.cleanStyleAttribute();
    super.update(props);
  }

  cleanStyleAttribute() {
    if (this.getAttribute('style') === '') {
      this.removeAttribute('style');
    }
  }
}

export { DcDashboard };

declare global {
  interface HTMLElementTagNameMap {
    'dc-dashboard': DcDashboard;
  }
}
