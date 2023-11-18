import type { Handle } from "@sveltejs/kit";
import { NetlifyAPI } from "netlify";
import { NETLIFY_KEY } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
  // @ts-ignore
  event.locals.netlify = new NetlifyAPI(NETLIFY_KEY);

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
