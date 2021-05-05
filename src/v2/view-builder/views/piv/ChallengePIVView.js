import { loc } from 'okta';
import { BaseForm } from '../../internals';
import BaseAuthenticatorView from '../../components/BaseAuthenticatorView';

const Body = BaseForm.extend({

  className: 'on-prem-authenticator-verify',

  initialize() {
    BaseForm.prototype.initialize.apply(this, arguments);
    this.model.set('useRedirect', true);
  },

  title() {
    return loc('piv.cac.title', 'login');
  },

  save() {
    return loc('retry', 'login');
  },

  showMessages() {
    // PIV error messages are not form errors
    // Parse and display them here.
    // TODO: OKTA-383470
    const messages = this.options.appState.get('messages') || {};
    if (Array.isArray(messages.value)) {
      this.add('<div class="ion-messages-container”></div>', '.o-form-error-container');

      messages
        .value
        .forEach(messagesObj => {
          const msg = messagesObj.message;
          if (messagesObj.class === 'ERROR') {
            this.add(createCallout({
              content: msg,
              type: 'error',
            }), '.o-form-error-container');
          } else {
            this.add(`<p>${msg}</p>`, '.ion-messages-container');
          }
        });
    }
  },
});

export default BaseAuthenticatorView.extend({
  Body,
});
