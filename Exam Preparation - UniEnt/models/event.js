export default {
  create(data) {
    return firebase.firestore().collection("events").add(data);
  },
  getAll() {
    return firebase.firestore().collection("events").get();
  },
  get(id) {
    return firebase.firestore().collection("events").doc(id).get();
  },
  update(id, data) {
    return firebase.firestore().collection("events").doc(id).update(data);
  },
  remove(id) {
    return firebase.firestore().collection("events").doc(id).delete();
  },
  getByCriteria(prop, value) {
    return firebase
      .firestore()
      .collection("events")
      .where(prop, "==", value)
      .get();
  },
};
