import { config } from "./config.js";
import { source } from "./source.js";
import * as ui from "./ui.js";

async function showSampleResult(params = {}) {
  ui.setBusy(true);
  ui.setStatus(config.messages.loading);

  try {
    const result = await source.load(params);
    ui.renderList([result]);
    ui.setStatus(config.messages.ready);
  } catch (error) {
    ui.showError(error.message);
    ui.setStatus(config.messages.error);
  } finally {
    ui.setBusy(false);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  showSampleResult({ url: formData.get("product-url") });
}

function handlePreview(event) {
  const preview = event.target.dataset.preview;

  if (!preview) {
    return;
  }

  if (preview === "result") {
    showSampleResult();
  }

  if (preview === "empty") {
    ui.setBusy(false);
    ui.showEmpty(config.messages.empty);
    ui.setStatus(config.messages.empty);
  }

  if (preview === "error") {
    ui.setBusy(false);
    ui.showError(config.messages.error);
    ui.setStatus(config.messages.error);
  }

  if (preview === "busy") {
    ui.setStatus(config.messages.busy);
    ui.setBusy(true);
    window.setTimeout(() => {
      ui.setBusy(false);
      ui.setStatus(config.messages.ready);
    }, config.timeoutMs);
  }
}

window.addEventListener("submit", handleSubmit);
window.addEventListener("click", handlePreview);
showSampleResult();
