/*!
 * Copyright (c) 2021, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import Errors from 'util/Errors';
import { interact } from './interact';
import { introspect } from './introspect';
import sessionStorageHelper from './sessionStorageHelper';

const handleProxyIdxResponse = async (settings) => {
  return Promise.resolve({
    rawIdxState: settings.get('proxyIdxResponse'),
    context: settings.get('proxyIdxResponse'),
    neededToProceed: [],
  });
};

export async function startLoginFlow(settings, appId) {
  // Return a preset response
  if (settings.get('proxyIdxResponse')) {
    return handleProxyIdxResponse(settings);
  }

  if (settings.get('overrideExistingStateToken')) {
    sessionStorageHelper.removeStateHandle(appId);
  }

  // Use or acquire interactionHandle
  const useInteractionHandle = settings.get('useInteractionCodeFlow') || settings.get('interactionHandle');
  if (useInteractionHandle) {
    return interact(settings);
  }
  // Use stateToken from session storage if exists
  // See more details at ./docs/use-session-token-prior-to-settings.png
  const stateHandleFromSession = sessionStorageHelper.getStateHandle(appId);
  if (stateHandleFromSession) {
    return introspect(settings, stateHandleFromSession)
      .then((idxResp) => {
        // 1. abandon the settings.stateHandle given session.stateHandle is still valid
        settings.set('stateToken', stateHandleFromSession);
        // 2. chain the idxResp to next handler
        return idxResp;
      })
      .catch(() => {
        // 1. remove session.stateHandle
        sessionStorageHelper.removeStateHandle(appId);
        // 2. start the login again in order to introspect on settings.stateHandle
        return startLoginFlow(settings, appId);
      });
  }

  // Use stateToken from options
  const stateHandle = settings.get('stateToken');
  if (stateHandle) {
    return introspect(settings, stateHandle);
  }

  throw new Errors.ConfigError('Set "useInteractionCodeFlow" to true in configuration to enable the ' +
    'interaction_code" flow for self-hosted widget.');
}
