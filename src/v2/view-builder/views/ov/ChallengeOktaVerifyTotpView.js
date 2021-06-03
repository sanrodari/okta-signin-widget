import { loc, createCallout } from 'okta';
import { BaseForm } from '../../internals';
import BaseAuthenticatorView from '../../components/BaseAuthenticatorView';

const OV_UV_ENABLE_BIOMETRIC_SERVER_KEY = 'oie.authenticator.oktaverify.method.totp.verify.enable.biometrics';

const Body = BaseForm.extend(
  {
    className: 'okta-verify-totp-challenge',

    modelEvents: {
      'error': '_checkGlobalError',
      'errorCleanup': '_cleanUpExistingErrors'
    },

    title() {
      return loc('oie.okta_verify.totp.title', 'login');
    },

    save() {
      return loc('mfa.challenge.verify', 'login');
    },

    _checkGlobalError(model, convertedErrors) {
      const errorSummaryKeys = convertedErrors?.responseJSON?.errorSummaryKeys;
      if (errorSummaryKeys && errorSummaryKeys.includes(OV_UV_ENABLE_BIOMETRIC_SERVER_KEY)) {
        // add customized error
        this.add('<div class="ion-messages-container"></div>', 'form-error-container');
        const options = {
          type: 'error',
          className: 'okta-verify-uv-callout-content',
          title: loc('oie.authenticator.app.method.push.verify.enable.biometrics.title', 'login'),
          subtitle: loc('oie.authenticator.app.method.push.verify.enable.biometrics.description', 'login'),
          bullets: [
            loc('oie.authenticator.app.method.push.verify.enable.biometrics.point1', 'login'),
            loc('oie.authenticator.app.method.push.verify.enable.biometrics.point2', 'login'),
            loc('oie.authenticator.app.method.push.verify.enable.biometrics.point3', 'login')
          ],
        };
        this.add(createCallout(options), '.o-form-error-container');
        this.trigger('errorCleanup', convertedErrors);
      }
    },

    _cleanUpExistingErrors(convertedErrors) {
      const errorSummaryKeys = convertedErrors?.responseJSON?.errorSummaryKeys;
      if (errorSummaryKeys && errorSummaryKeys.includes(OV_UV_ENABLE_BIOMETRIC_SERVER_KEY)) {
        // remove the error generated by the base error listener
        this.$('.o-form-error-container').lastElementChild.remove();
        this.$('.o-form-error-container').removeClass('.okta-form-infobox-error.infobox.infobox-error');
      }
    }
  },
);

export default BaseAuthenticatorView.extend({
  Body,
});
