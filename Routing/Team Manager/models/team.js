export default {
  create(data) {
    return firebase.firestore().collection("teams").add(data);
  },
  getAll() {
    return firebase.firestore().collection("teams").get();
  },
  get(id) {
    return firebase.firestore().collection("teams").doc(id).get();
  },
  update(id, data) {
    return firebase.firestore().collection("teams").doc(id).update(data);
  },
  remove(id) {
    return firebase.firestore().collection("teams").doc(id).delete();
  },
  createUser(data) {
    return firebase.firestore().collection("users").add(data);
  },
  removeUser(id) {
    return firebase.firestore().collection("users").doc(id).delete();
  },
  getUser(prop, value) {
    return firebase
      .firestore()
      .collection("users")
      .where(prop, "==", value)
      .get();
  },
};
