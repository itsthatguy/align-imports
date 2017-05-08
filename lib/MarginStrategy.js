'use babel';

class MarginStrategy {
  positionFroms () {
    let froms = document.querySelectorAll('.pane.active .import-line--from');
    let maxPosition = this.maxPosition(froms);

    if (!maxPosition) return;

    froms.forEach((el) => {
      let fromPosition = el.getBoundingClientRect().left;
      let newPosition = maxPosition - fromPosition;
      el.setAttribute('style', `margin-left: ${newPosition}px`);
    });
  }

  maxPosition (froms) {
    var maxPosition = 0;
    froms.forEach((el) => {
      el.setAttribute('style', 'margin-left: 0');
      let fromPosition = el.getBoundingClientRect().left;
      maxPosition = Math.max(maxPosition, fromPosition);
    });

    return maxPosition;
  }
}

export default new MarginStrategy();
