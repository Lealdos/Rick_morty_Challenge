import { API_URL } from "../config/constants";

export const CHARACTER_STATUSES = ["alive", "dead", "unknown"];

export async function getCharactersList(params) {
  const filteredParams = {};

  for (const param in params) {
    if (params[param] !== undefined && params[param] !== "") {
      filteredParams[param] = params[param];
    }
  }

  const searchStr = new URLSearchParams(filteredParams).toString();
  const result = await fetch(`${API_URL}/character?${searchStr}`);

  const json = await result.json();

  return json;
}
