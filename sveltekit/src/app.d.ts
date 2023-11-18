// See https://kit.svelte.dev/docs/types#app

import type { NetlifyAPI } from "netlify";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface PageData {}
    // interface Platform {}
    interface Locals {
      netlify: {
        listSiteSubmissions: NetlifyAPI["listSiteSubmissions"];
        deleteSubmission: NetlifyAPI["deleteSubmission"];
      };
    }
  }
}

export {};
