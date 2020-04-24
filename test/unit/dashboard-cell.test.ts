import { expect, fixture, html } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { DcDashboard } from '../../src/dc-dashboard';
import { DcDashboardCell } from '../../src/dc-dashboard-cell';
import { waitAnimationFrame } from './helpers';

describe('dc-dashboard-cell', () => {
  let element: DcDashboard;
  let firstCell: DcDashboardCell;

  beforeEach(async () => {
    element = await fixture(html`
      <dc-dashboard>
        <dc-dashboard-cell col="2" colSpan="2" row="2" rowSpan="2"></dc-dashboard-cell>
        <dc-dashboard-cell></dc-dashboard-cell>
      </dc-dashboard>
    `);
    firstCell = element.querySelector('dc-dashboard-cell') as DcDashboardCell;
  });

  describe('cell properties', () => {
    it('should have the right gridColumn value set by "col"', () => {
      expect(getComputedStyle(firstCell).gridColumnStart).to.be.equal('2');
    });

    it('should be able to change col value', async () => {
      firstCell.col = 3;
      await waitAnimationFrame();
      expect(getComputedStyle(firstCell).gridColumnStart).to.be.equal('3');
    });

    it('should have the right gridRow value set by "row"', () => {
      expect(getComputedStyle(firstCell).gridRowStart).to.be.equal('2');
    });

    it('should be able to change col value', async () => {
      firstCell.row = 3;
      await waitAnimationFrame();
      expect(getComputedStyle(firstCell).gridRowStart).to.be.equal('3');
    });

    it('should have the right gridColumn value set by "colSpan"', () => {
      expect(getComputedStyle(firstCell).gridColumnEnd).to.be.equal('span 2');
    });

    it('should be able to change colSpan value', async () => {
      firstCell.colSpan = 3;
      await waitAnimationFrame();
      expect(getComputedStyle(firstCell).gridColumnEnd).to.be.equal('span 3');
    });

    it('should have the right gridRow value set by "rowSpan"', () => {
      expect(getComputedStyle(firstCell).gridRowEnd).to.be.equal('span 2');
    });

    it('should be able to change rowSpan value', async () => {
      firstCell.rowSpan = 3;
      await waitAnimationFrame();
      expect(getComputedStyle(firstCell).gridRowEnd).to.be.equal('span 3');
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

      const computedStyle = getComputedStyle(newCell);
      expect(computedStyle.gridColumnStart).to.be.equal('1');
      expect(computedStyle.gridColumnEnd).to.be.equal('span 3');
      expect(computedStyle.gridRowStart).to.be.equal('3');
      expect(computedStyle.gridRowEnd).to.be.equal('span 3');
    });
  });
});
