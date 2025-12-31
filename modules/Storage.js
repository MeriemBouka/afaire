export default class Storage {
  static sauvegarder(taches) {
    localStorage.setItem("taches", JSON.stringify(taches));
  }

  static charger() {
    const data = localStorage.getItem("taches");
    return data ? JSON.parse(data) : [];
  }
}
