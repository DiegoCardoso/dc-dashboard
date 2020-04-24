import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';
import { css, customElement, html, property, PropertyValues } from 'lit-element';
import { DcDashboardCell } from './dc-dashboard-cell';

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

  private __childMutationObserver: MutationObserver | undefined;

  private __childAttributesMutationObserver: MutationObserver | undefined;

  __childMutationCb(mutationList: MutationRecord[]): void {
    const mutations: Node[] = mutationList.flatMap((record: MutationRecord) => Array.from(record.addedNodes));
    this.__filterDashboardCells(mutations).forEach(node => {
      this.__setCellCssProps(node);
    });
  }

  private __filterDashboardCells(nodes: Node[]): DcDashboardCell[] {
    return nodes.filter(this.__isDashboardCell) as DcDashboardCell[];
  }

  private __isDashboardCell(value: Node) {
    return value instanceof DcDashboardCell;
  }

  __childAttributesMutationCb(mutationList: MutationRecord[]): void {
    this.__filterDashboardCells(mutationList.map(mutation => mutation.target)).forEach((node: DcDashboardCell) => {
      this.__setCellCssProps(node);
    });
  }

  protected firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    this.__childMutationObserver = new MutationObserver(this.__childMutationCb.bind(this));
    this.__childMutationObserver.observe(this, { childList: true });

    this.__childAttributesMutationObserver = new MutationObserver(this.__childAttributesMutationCb.bind(this));
    this.__childAttributesMutationObserver.observe(this, { attributes: true, subtree: true });

    this.__filterDashboardCells(Array.from(this.children)).forEach(node => this.__setCellCssProps(node));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.__childMutationObserver && this.__childMutationObserver.disconnect();
  }

  private __setCellCssProps(node: DcDashboardCell): void {
    const { row, col, rowSpan, colSpan } = node;
    this.__defineCssPropertyForElement(node, 'grid-row', `${row || 'auto'} / ${rowSpan ? `span ${rowSpan}` : 'auto'}`);
    this.__defineCssPropertyForElement(
      node,
      'grid-column',
      `${col || 'auto'} / ${colSpan ? `span ${colSpan}` : 'auto'}`
    );
  }

  private __defineCssPropertyForElement(el: HTMLElement, prop: string, value: unknown) {
    if (value) {
      el.style.setProperty(prop, `${value}`);
    } else {
      el.style.removeProperty(prop);
    }
  }

  private __defineCssProperty(prop: string, value: unknown): void {
    this.__defineCssPropertyForElement(this, prop, value);
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
