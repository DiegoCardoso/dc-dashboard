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
});
