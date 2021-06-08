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

const removeStateHandle = (appId) => {
  sessionStorage.removeItem(`${STATE_HANDLE_SESSION_STORAGE_KEY}-${appId}`);
};
const setStateHandle = (token, appId) => {
  sessionStorage.setItem(`${STATE_HANDLE_SESSION_STORAGE_KEY}-${appId}`, token);
};
const getStateHandle = (appId) => {
  return sessionStorage.getItem(`${STATE_HANDLE_SESSION_STORAGE_KEY}-${appId}`);
};

export default {
  removeStateHandle,
  setStateHandle,
  getStateHandle,
};
