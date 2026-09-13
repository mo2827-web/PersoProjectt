import { config } from "./config.js?v=phase3-proof";

export const source = {
  async load(params = {}) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), config.timeoutMs);
    let response;

    try {
      response = await fetch(config.apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: params.url || "" }),
        signal: controller.signal
      });
    } catch {
      throw new Error(config.messages.error);
    } finally {
      window.clearTimeout(timeout);
    }

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload.error || config.messages.error);
    }

    return payload.result || null;
  },

  async detail(id) {
    void id;
    throw new Error(config.messages.detailUnavailable);
  },

  async save(record) {
    void record;
    throw new Error(config.messages.persistenceUnavailable);
  },

  async list() {
    return [];
  }
};
