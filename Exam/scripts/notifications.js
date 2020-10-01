const elements = {
  success: document.getElementById("successBox"),
  error: document.getElementById("errorBox"),
};

function showElement(element, message) {
  element.parentElement.style.display = "block";
  element.textContent = message;

  setTimeout(function () {
    element.parentElement.style.display = "none";
  }, 1000);
}

const showSuccess = showElement.bind(undefined, elements.success);
const showError = showElement.bind(undefined, elements.error);

export default {
  showSuccess,
  showError,
};
