import { config } from "./config.js";

const elements = {
  status: document.getElementById("status-line"),
  results: document.getElementById("result-container"),
  controls: document.querySelectorAll("button, input")
};

function element(tagName, className, text) {
  const node = document.createElement(tagName);
  node.className = className;
  node.textContent = text;
  return node;
}

function factsList(label, values) {
  const section = element("section", "fact-group");
  section.append(element("h3", "fact-title", label));
  const list = document.createElement("ul");
  const entries = values.length ? values : ["Not available"];

  entries.forEach((value) => list.append(element("li", "fact-item", value)));
  section.append(list);
  return section;
}

function revealResults() {
  elements.results.scrollIntoView({ block: "start" });
}

export function setBusy(isBusy) {
  elements.controls.forEach((control) => {
    control.disabled = isBusy;
  });

  if (isBusy) {
    elements.results.replaceChildren(element("div", "state-card busy-state", config.messages.busy));
    revealResults();
  }
}

export function setStatus(message) {
  elements.status.textContent = message;
}

export function showError(message) {
  clearResults();
  elements.results.append(element("div", "state-card error-state", message));
  revealResults();
}

export function showEmpty(message) {
  clearResults();
  elements.results.append(element("div", "state-card empty-state", message));
  revealResults();
}

export function renderList(items) {
  clearResults();

  items.forEach((item) => {
    const card = element("article", "assessment-card");
    const top = element("div", "assessment-top");
    const identity = element("div", "product-identity");
    identity.append(element("p", "brand", item.brand));
    identity.append(element("h2", "product-title", item.title));
    identity.append(element("p", "price", `${item.currency} ${item.price}`));

    const verdict = element("div", "verdict");
    verdict.append(element("p", "verdict-label", "Recommendation"));
    verdict.append(element("strong", "recommendation", item.recommendation || "Unknown"));
    verdict.append(element("span", "score", item.qualitySignalsScore === null ? "Score unavailable" : `${item.qualitySignalsScore} / ${config.scoreMaximum}`));
    top.append(identity, verdict);
    card.append(top);

    card.append(factsList("Materials", item.materials));
    card.append(factsList("Care signals", item.careSignals));
    card.append(factsList("Construction signals", item.constructionSignals));
    card.append(factsList("Evidence", item.evidence));
    card.append(factsList("Unknown factors", item.unknownFactors));

    const concern = item.transparencyConcern
      ? "Transparency concern: important product information is unavailable."
      : "Transparency concern: none in this sample assessment.";
    card.append(element("p", "transparency-note", concern));

    const sourceLink = document.createElement("a");
    sourceLink.className = "source-link";
    sourceLink.href = item.url;
    sourceLink.target = "_blank";
    sourceLink.rel = "noreferrer";
    sourceLink.textContent = "Open original sample page";
    card.append(sourceLink);
    elements.results.append(card);
  });

  revealResults();
}

export function clearResults() {
  elements.results.replaceChildren();
}
