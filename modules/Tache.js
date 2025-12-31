export default class Tache {
  constructor(id, text, termine = false) {
    this.id = id;
    this.text = text;
    this.termine = termine;
  }
  modifierTexte(nouveauTexte) {
    this.text = nouveauTexte;
  }
  toggle() {
    this.termine = !this.termine;
  }
}
