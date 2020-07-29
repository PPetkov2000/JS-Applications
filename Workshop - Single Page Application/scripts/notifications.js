const elements = {
  info: document.getElementById("infoBox"),
  error: document.getElementById("errorBox"),
};

function showElement(element, message) {
  element.style.display = "block";
  element.children[0].textContent = message;

  setTimeout(function () {
    element.style.display = "none";
  }, 3000);
}

const showInfo = showElement.bind(undefined, elements.info);
const showError = showElement.bind(undefined, elements.error);

export default {
  showInfo,
  showError,
};

