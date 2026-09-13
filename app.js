import { config } from "./config.js";
import { source } from "./source.js";
import * as ui from "./ui.js";

let activeAction = 0;

async function showSampleResult(params = {}) {
  const action = ++activeAction;
  ui.setBusy(true);
  ui.setStatus(config.messages.loading);

  try {
    const result = await source.load(params);

    if (action !== activeAction) {
      return;
    }

    ui.renderList([result]);
    ui.setStatus(config.messages.ready);
  } catch (error) {
    if (action !== activeAction) {
      return;
    }

    ui.showError(error.message);
    ui.setStatus(config.messages.error);
  } finally {
    if (action === activeAction) {
      ui.setBusy(false);
    }
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
    activeAction += 1;
    ui.setBusy(false);
    ui.showEmpty(config.messages.empty);
    ui.setStatus(config.messages.empty);
  }

  if (preview === "error") {
    activeAction += 1;
    ui.setBusy(false);
    ui.showError(config.messages.error);
    ui.setStatus(config.messages.error);
  }

  if (preview === "busy") {
    const action = ++activeAction;
    ui.setStatus(config.messages.busy);
    ui.setBusy(true);
    window.setTimeout(() => {
      if (action === activeAction) {
        showSampleResult();
      }
    }, config.timeoutMs);
  }
}

window.addEventListener("submit", handleSubmit);
window.addEventListener("click", handlePreview);
showSampleResult();
