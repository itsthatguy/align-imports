'use babel';
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "(foo|dog|what)" }] */

import Aligner from './aligner';

const Plugin = {
  editor: null,
  subscriptions: null,

  activate() {
    Aligner.createSubscriptions();
  },

  deactivate() {
    Aligner.destroySubscriptions();
  },
};

export default Plugin;
