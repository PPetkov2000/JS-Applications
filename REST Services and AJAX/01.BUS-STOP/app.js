function getInfo() {
  const stopIdInput = document.getElementById("stopId");
  const stopName = document.getElementById("stopName");
  const busesList = document.getElementById("buses");
  const url = `https://judgetests.firebaseio.com/businfo/${stopIdInput.value}.json `;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      stopIdInput.value = "";
      stopName.textContent = data.name;
      Object.entries(data.buses).forEach((bus) => {
        const li = document.createElement("li");
        li.textContent = `Bus ${bus[0]} arrives in ${bus[1]}`;
        busesList.appendChild(li);
      });
    })
    .catch((err) => {
      stopName.textContent = "Error";
    });
}
