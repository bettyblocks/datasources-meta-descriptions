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
  const { method, path } = MODEL_LOOKUP[modelName];
  const endpoint =
    baseUrl + interpolateUrl(path, { version: apiVersion, ...params });

  console.debug({ endpoint });

  const response = await fetch(endpoint, {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ params }),
  })
    .then((response) => {
      console.log({ response });
      return response;
    })
    .catch((error) => console.log(error));

  console.debug({ response });

  return response;
};

export default highq;
