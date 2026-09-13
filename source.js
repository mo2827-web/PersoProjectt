import { config } from "./config.js";

export const source = {
  async load(params = {}) {
    void params;
    const response = await fetch(config.sampleDataPath);

    if (!response.ok) {
      throw new Error(config.messages.error);
    }

    return response.json();
  },

  async detail() {
    throw new Error(config.messages.detailUnavailable);
  },

  async save() {
    throw new Error(config.messages.persistenceUnavailable);
  },

  async list() {
    return [];
  }
};
