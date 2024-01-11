/** Shopify CDN: Minification failed

Line 15:45 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 16:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 30:13 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 35:20 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 42:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 44:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 49:16 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 55:17 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 56:6 Transforming const to the configured target environment ("es5") is not supported yet

**/
if (!customElements.get('localization-form')) {
  customElements.define('localization-form', class LocalizationForm extends HTMLElement {
    constructor() {
      super();
      this.elements = {
        input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
        button: this.querySelector('button'),
        panel: this.querySelector('.disclosure__list-wrapper'),
      };
      this.elements.button.addEventListener('click', this.openSelector.bind(this));
      this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
      this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

      this.querySelectorAll('a').forEach(item => item.addEventListener('click', this.onItemClick.bind(this)));
    }

    hidePanel() {
      this.elements.button.setAttribute('aria-expanded', 'false');
      this.elements.panel.setAttribute('hidden', true);
    }

    onContainerKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;

      this.hidePanel();
      this.elements.button.focus();
    }

    onItemClick(event) {
      event.preventDefault();
      const form = this.querySelector('form');
      this.elements.input.value = event.currentTarget.dataset.value;
      if (form) form.submit();
    }

    openSelector() {
      this.elements.button.focus();
      this.elements.panel.toggleAttribute('hidden');
      this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
    }

    closeSelector(event) {
      const isChild = this.elements.panel.contains(event.relatedTarget) || this.elements.button.contains(event.relatedTarget);
      if (!event.relatedTarget || !isChild) {
        this.hidePanel();
      }
    }
  });
}
