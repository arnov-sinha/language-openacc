'use babel';

import LanguageOpenaccView from './language-openacc-view';
import { CompositeDisposable } from 'atom';

export default {

  languageOpenaccView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageOpenaccView = new LanguageOpenaccView(state.languageOpenaccViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageOpenaccView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-openacc:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageOpenaccView.destroy();
  },

  serialize() {
    return {
      languageOpenaccViewState: this.languageOpenaccView.serialize()
    };
  },

  toggle() {
    console.log('LanguageOpenacc was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
