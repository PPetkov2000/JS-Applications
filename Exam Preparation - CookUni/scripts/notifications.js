const elements = {
  success: document.getElementById("successBox"),
  error: document.getElementById("errorBox"),
};

function showElement(element, message) {
  element.style.display = "block";
  element.textContent = message;

  setTimeout(function () {
    element.style.display = "none";
  }, 3000);
}

const showSuccess = showElement.bind(undefined, elements.success);
const showError = showElement.bind(undefined, elements.error);

export default {
  showSuccess,
  showError,
};

