'use babel';

import { CompositeDisposable } from 'atom';
// import MarginStrategy from './MarginStrategy';
import CharacterStrategy from './CharacterStrategy';

class Aligner {

  createSubscriptions () {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.workspace.onDidStopChangingActivePaneItem(this.handleChange.bind(this))
    );


    this.subscriptions.add(
      atom.workspace.onDidOpen(this.handleChange.bind(this))
    );

    var editors = {};
    this.subscriptions.add(
      atom.workspace.observeTextEditors((textEditor) => {
        editors[textEditor.id] = new CompositeDisposable();

        editors[textEditor.id].add(
          textEditor.onDidChangeScrollTop(this.handleChange.bind(this, textEditor))
        );

        editors[textEditor.id].add(
          textEditor.onDidStopChanging(this.handleChange.bind(this, textEditor))
        );

        editors[textEditor.id].add(textEditor.onDidDestroy(() => {
          editors[textEditor.id].dispose();
          delete editors[textEditor.id];
        }));
      })
    );
  }

  destroySubscriptions () {
    this.subscriptions.dispose();
  }

  handleChange () {
    this.alignImports();
  }

  alignImports () {
    var lines = document.querySelectorAll('.pane.active .syntax--source.syntax--js.syntax--jsx');
    this.addImportLineClass(lines);
  }

  addImportLineClass (lines) {
    lines.forEach((el) => {
      if (/^import.+from.+/g.test(el.innerText)) {
        el.classList.add('import-line');

        var children = el.querySelectorAll('span');
        this.addKeywordClasses(children);
      }
    });

    CharacterStrategy.positionFroms();
  }

  addKeywordClasses (children) {
    children.forEach(function(el) {
      if (/^import/g.test(el.innerText)) {
        el.classList.add('import-line--import');
      }
      if (/^from/g.test(el.innerText)) {
        el.classList.add('import-line--from');
      }
    });
  }

}

export default new Aligner();
