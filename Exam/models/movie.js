export default {
  create(data) {
    return firebase.firestore().collection("movies").add(data);
  },
  getAll() {
    return firebase.firestore().collection("movies").get();
  },
  get(id) {
    return firebase.firestore().collection("movies").doc(id).get();
  },
  update(id, data) {
    return firebase.firestore().collection("movies").doc(id).update(data);
  },
  remove(id) {
    return firebase.firestore().collection("movies").doc(id).delete();
  },
  getByCriteria(prop, value) {
    return firebase
      .firestore()
      .collection("movies")
      .where(prop, "==", value)
      .get();
  },
};
