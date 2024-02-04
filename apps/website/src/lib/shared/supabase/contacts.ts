import type { Tables } from "@/db-types";

type KeyVal = { key: string; value: string };

export function splitContacts(contacts: Tables<"contacts">[]) {
  let social: KeyVal[] = [];
  let recapiti: KeyVal[] = [];
  let iban: KeyVal[] = [];

  for (const c of contacts) {
    switch (c.key) {
      case "facebook":
      case "instagram":
      case "youtube":
      case "twitter":
      case "tiktok":
      case "linkedin":
        social.push(c);
        break;
      case "email":
      case "telephone":
        recapiti.push(c);
        break;
      case "iban":
        iban.push(c);
        break;
      default:
        break;
    }
  }

  return {
    social,
    contacts: recapiti,
    iban,
  };
}
