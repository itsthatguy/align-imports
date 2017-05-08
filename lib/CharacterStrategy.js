'use babel';

class CharacterStrategy {
  positionFroms () {
    let lines = document.querySelectorAll('.pane.active .import-line');
    let maxPosition = this.maxPosition(lines);

    if (!maxPosition) return;

    lines.forEach((el) => {
      let fromPosition = el.innerText.search(/(-+)?from/);
      let newPosition = maxPosition - fromPosition;

      let fromSpacer = el.querySelector('.import-line--from-spacer');
      if (fromSpacer === null) {
        let from = el.querySelector('.import-line--from');
        fromSpacer = document.createElement('span');
        fromSpacer.classList.add('import-line--from-spacer');
        el.insertBefore(fromSpacer, from);
      }


      const innerText = '-'.repeat(newPosition);
      fromSpacer.innerHTML = innerText;
    });
  }

  maxPosition (lines) {
    var maxPosition = 0;
    lines.forEach((el) => {
      let fromPosition = el.innerText.search(/(-+)?from/);
      maxPosition = Math.max(maxPosition, fromPosition);
    });

    return maxPosition;
  }
}

export default new CharacterStrategy();
