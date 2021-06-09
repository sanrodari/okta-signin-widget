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

const STATE_HANDLE_SESSION_STORAGE_KEY = 'osw-oie-state-handle';
const APP_ID_SESSION_STORAGE_KEY = 'osw-oie-app-id';

const getSessionStorageKey = (appId) => {
  return appId ? `${STATE_HANDLE_SESSION_STORAGE_KEY}-${appId}` : STATE_HANDLE_SESSION_STORAGE_KEY;
};

const removeStateHandle = () => {
  const appId = sessionStorage.getItem(APP_ID_SESSION_STORAGE_KEY);
  sessionStorage.removeItem(APP_ID_SESSION_STORAGE_KEY);
  sessionStorage.removeItem(getSessionStorageKey(appId));
};

const setStateHandle = (token, appId) => {
  // store appId separately because it is possible for a remediation response to not return an app id
  sessionStorage.setItem(APP_ID_SESSION_STORAGE_KEY, appId);
  sessionStorage.setItem(getSessionStorageKey(appId), token);
};

const getStateHandle = () => {
  const appId = sessionStorage.getItem(APP_ID_SESSION_STORAGE_KEY);
  return sessionStorage.getItem(getSessionStorageKey(appId));
};

const getAppId = () => {
  return sessionStorage.getItem(APP_ID_SESSION_STORAGE_KEY);
};

export default {
  removeStateHandle,
  setStateHandle,
  getStateHandle,
  getAppId,
};
