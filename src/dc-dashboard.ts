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

  static GAP_CSS_PROP = '--dc-dashboard-gap';

  @property({ type: Number })
  columns: number | undefined | null;

  @property({ type: String })
  rowHeight: string | undefined | null;

  @property({ type: String })
  gap: string | undefined | null;

  static get styles() {
    return css`
      :host {
        --dc-dashboard-columns: 4;
        --dc-dashboard-row-height: 200px;
        --dc-dashboard-gap: 0;
        display: grid;
        grid-template-columns: repeat(var(--dc-dashboard-columns, 4), 1fr);
        grid-auto-rows: var(--dc-dashboard-row-height, 200px);
        grid-gap: var(--dc-dashboard-gap, 0);
        gap: var(--dc-dashboard-gap, 0);
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
      this.__defineCssProperty(DcDashboard.COLUMN_CSS_PROP, this.columns);
    }

    if (props.has('rowHeight')) {
      this.__defineCssProperty(DcDashboard.ROW_HEIGHT_CSS_PROP, this.rowHeight);
    }

    if (props.has('gap')) {
      this.__defineCssProperty(DcDashboard.GAP_CSS_PROP, this.gap);
    }

    this.__cleanStyleAttribute();
    super.update(props);
  }

  __defineCssProperty(prop: string, value: unknown) {
    if (value) {
      this.style.setProperty(prop, `${value}`);
    } else {
      this.style.removeProperty(prop);
    }
  }

  __cleanStyleAttribute() {
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
