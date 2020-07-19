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
  join(id, data) {
    return firebase.firestore().collection("teams").doc(id).update(data);
  },
};
