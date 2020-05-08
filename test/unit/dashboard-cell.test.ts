import { expect, fixture, html } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { DcDashboard } from '../../src/dc-dashboard';
import { DcDashboardCell } from '../../src/dc-dashboard-cell';
import { waitAnimationFrame } from './helpers';

describe('dc-dashboard-cell', () => {
  let element: DcDashboard;
  let firstCell: DcDashboardCell;
  let firstCellParent: HTMLElement;

  beforeEach(async () => {
    element = await fixture(html`
      <dc-dashboard>
        <dc-dashboard-cell col="2" colSpan="2" row="2" rowSpan="2"></dc-dashboard-cell>
        <dc-dashboard-cell></dc-dashboard-cell>
      </dc-dashboard>
    `);
    firstCell = element.querySelector('dc-dashboard-cell') as DcDashboardCell;
    firstCellParent = firstCell.assignedSlot?.parentNode as HTMLElement;
  });

  describe('cell properties', () => {
    it('should have the right gridColumn value set by "col"', () => {
      expect(getComputedStyle(firstCellParent).gridColumnStart).to.be.equal('2');
    });

    it('should be able to change col value', async () => {
      firstCell.col = 3;
      await waitAnimationFrame();
      expect(getComputedStyle(firstCellParent).gridColumnStart).to.be.equal('3');
    });

    it('should have the right gridRow value set by "row"', () => {
      expect(getComputedStyle(firstCellParent).gridRowStart).to.be.equal('2');
    });

    it('should be able to change col value', async () => {
      firstCell.row = 3;
      await waitAnimationFrame();
      expect(getComputedStyle(firstCellParent).gridRowStart).to.be.equal('3');
    });

    it('should have the right gridColumn value set by "colSpan"', () => {
      expect(getComputedStyle(firstCellParent).gridColumnEnd).to.be.equal('span 2');
    });

    it('should be able to change colSpan value', async () => {
      firstCell.colSpan = 3;
      await waitAnimationFrame();
      expect(getComputedStyle(firstCellParent).gridColumnEnd).to.be.equal('span 3');
    });

    it('should have the right gridRow value set by "rowSpan"', () => {
      expect(getComputedStyle(firstCellParent).gridRowEnd).to.be.equal('span 2');
    });

    it('should be able to change rowSpan value', async () => {
      firstCell.rowSpan = 3;
      await waitAnimationFrame();
      expect(getComputedStyle(firstCellParent).gridRowEnd).to.be.equal('span 3');
    });
  });

  describe('appending cell', () => {
    it('should set grid properties to added cell', async () => {
      const newCell = document.createElement('dc-dashboard-cell') as DcDashboardCell;
      newCell.col = 1;
      newCell.row = 3;
      newCell.colSpan = 3;
      newCell.rowSpan = 3;

      element.appendChild(newCell);

      await waitAnimationFrame();

      const { gridColumnStart, gridColumnEnd, gridRowStart, gridRowEnd } = getComputedStyle(
        newCell.assignedSlot?.parentElement as HTMLElement
      );
      expect(gridColumnStart).to.be.equal('1');
      expect(gridColumnEnd).to.be.equal('span 3');
      expect(gridRowStart).to.be.equal('3');
      expect(gridRowEnd).to.be.equal('span 3');
    });

    it('should clean up internal structure on cell removal', async () => {
      const root = element.shadowRoot as ShadowRoot;
      const namedSlotsSize = root.querySelectorAll('slot[name]').length;
      element.querySelector('dc-dashboard-cell')?.remove();

      await waitAnimationFrame();

      expect(root.querySelectorAll('slot[name]').length).to.be.eq(namedSlotsSize - 1);
    });
  });
});
