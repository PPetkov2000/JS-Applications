function solve() {
  const info = document.querySelector(".info");
  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");
  let nextStop = "depot";
  let currentStop = "";

  function depart() {
    return fetch(`https://judgetests.firebaseio.com/schedule/${nextStop}.json`)
      .then((res) => {
        if (res.ok === false) {
          throw new Error(`${res.status} - ${res.statusText}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        nextStop = data.next;
        currentStop = data.name;
        info.textContent = `Next stop ${data.name}`;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
      })
      .catch((err) => {
        info.textContent = "Error";
        departBtn.disabled = true;
        arriveBtn.disabled = true;
      });
  }

  function arrive() {
    info.textContent = `Arriving at ${currentStop}`;
    currentStop = nextStop;
    departBtn.disabled = false;
    arriveBtn.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}
