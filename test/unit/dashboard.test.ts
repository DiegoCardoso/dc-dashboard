import { expect, fixture, html } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { DcDashboard } from '../../src/dc-dashboard';

describe('dc-dashboard', () => {
  let element: DcDashboard;

  beforeEach(async () => {
    element = await fixture(html`
      <dc-dashboard></dc-dashboard>
    `);
  });

  describe('custom element definition', () => {
    let tagName: string;

    beforeEach(() => {
      tagName = element.tagName.toLowerCase();
    });

    it('should be defined in custom element registry', () => {
      expect(customElements.get(tagName)).to.be.ok;
      expect(element instanceof DcDashboard).to.be.ok;
    });

    it('should have a valid static "is" getter', () => {
      expect(customElements.get(tagName).is).to.equal(tagName);
    });

    it('should have a valid version number', () => {
      expect(customElements.get(tagName).version).to.match(/^(\d+\.)?(\d+\.)?(\d+)(-(alpha|beta)\d+)?$/);
    });
  });

  describe('basic functionality', () => {
    it('should define a grid context', () => {
      expect(getComputedStyle(element).display).to.be.equal('grid');
    });

    it('should have 4 columns by default', () => {
      const columns = getComputedStyle(element).gridTemplateColumns;
      expect(columns.split(' ').length).to.be.equal(4);
    });
  });

  describe('columns', () => {
    it('should be null by default', () => {
      expect(element.columns).to.be.undefined;
    });

    it('should be able to define the number of cols', done => {
      element.columns = 8;
      requestAnimationFrame(() => {
        const numberOfCols = getComputedStyle(element).gridTemplateColumns.split(' ').length;
        expect(numberOfCols).to.be.equal(8);
        done();
      });
    });

    it('should be able to reset the number of cols', done => {
      element.columns = 8;
      requestAnimationFrame(() => {
        element.columns = null;
        requestAnimationFrame(() => {
          const numberOfCols = getComputedStyle(element).gridTemplateColumns.split(' ').length;
          expect(numberOfCols).to.be.equal(4);
          done();
        });
      });
    });

    describe('rowHeight', () => {
      it('should be null by default', () => {
        expect(element.rowHeight).to.be.undefined;
      });

      it('should be able to define the height of the rows', done => {
        element.rowHeight = '120px';
        requestAnimationFrame(() => {
          const rowHeight = getComputedStyle(element).gridAutoRows;
          expect(rowHeight).to.be.equal('120px');
          done();
        });
      });

      it('should be able to reset the height of the rows', done => {
        element.rowHeight = '120px';
        requestAnimationFrame(() => {
          element.rowHeight = null;
          requestAnimationFrame(() => {
            const rowHeight = getComputedStyle(element).gridAutoRows;
            expect(rowHeight).to.be.equal('200px');
            done();
          });
        });
      });
    });
  });
});
