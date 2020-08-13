export default {
  create(data) {
    return firebase.firestore().collection("recipes").add(data);
  },
  getAll() {
    return firebase.firestore().collection("recipes").get();
  },
  get(id) {
    return firebase.firestore().collection("recipes").doc(id).get();
  },
  update(id, data) {
    return firebase.firestore().collection("recipes").doc(id).update(data);
  },
  remove(id) {
    return firebase.firestore().collection("recipes").doc(id).delete();
  },
  getByCriteria(prop, value) {
    return firebase
      .firestore()
      .collection("recipes")
      .where(prop, "==", value)
      .get();
  },
};

