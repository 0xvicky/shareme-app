import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.REACT_APP_PROJECT_ID_SANITY,
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_API_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = src => {
  return builder.image(src);
};
