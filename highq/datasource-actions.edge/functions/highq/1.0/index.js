import { MODEL_LOOKUP } from "./models";

const interpolateUrl = (path, values) =>
  path.replace(/{(.*?)}/g, (_, offset) => values[offset]);

const highq = async ({
  apiVersion = "1",
  authToken,
  baseUrl,
  modelName,
  params,
}) => {
  const model = MODEL_LOOKUP[modelName];
  if (!model) {
    const message = "model name not yet configured";
    console.error(message);
    throw Error(message);
  }
  const { method, path } = model;
  const endpoint =
    baseUrl + interpolateUrl(path, { version: apiVersion, ...params });

  const response = await fetch(endpoint, {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${authToken}`,
    },
  })
    .then((response) => {
      const { ok, status } = response ?? {};
      if (!ok) {
        const message = "Request failed with HTTP status: " + status;
        console.error(message);
        throw new Error(message);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

  return response;
};

export default highq;
