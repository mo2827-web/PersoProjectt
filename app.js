import { config } from "./config.js";
import { source } from "./source.js";
import * as ui from "./ui.js?v=phase2-evidence2";

let activeAction = 0;

async function checkProduct(params = {}) {
  const action = ++activeAction;
  ui.setBusy(true);
  ui.setStatus(config.messages.loading);

  try {
    const result = await source.load(params);

    if (action !== activeAction) {
      return;
    }

    if (result) {
      ui.renderList([result]);
      ui.setStatus(config.messages.assessmentReady);
    } else {
      ui.showEmpty(config.messages.empty);
      ui.setStatus(config.messages.empty);
    }
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
  checkProduct({ url: formData.get("product-url") });
}

window.addEventListener("submit", handleSubmit);
ui.setStatus(config.messages.ready);
