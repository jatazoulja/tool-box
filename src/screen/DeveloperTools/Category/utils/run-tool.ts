const words = (value: string) =>
  value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);

const base64Encode = (value: string) =>
  btoa(
    encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (_, hex: string) =>
      String.fromCharCode(Number.parseInt(hex, 16)),
    ),
  );

const base64Decode = (value: string) =>
  decodeURIComponent(
    Array.from(
      atob(value),
      (character) =>
        `%${character.charCodeAt(0).toString(16).padStart(2, "0")}`,
    ).join(""),
  );

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );

const toTitle = (value: string) =>
  words(value).map(
    (word) => word[0].toUpperCase() + word.slice(1).toLowerCase(),
  );

const randomBytes = (size: number) =>
  crypto.getRandomValues(new Uint8Array(size));

export const runDeveloperTool = (toolId: string, value: string): string => {
  switch (toolId) {
    case "base64-encode":
      return base64Encode(value);
    case "base64-decode":
      return base64Decode(value);
    case "url-encode":
      return encodeURIComponent(value);
    case "url-decode":
      return decodeURIComponent(value);
    case "html-escape":
      return escapeHtml(value);
    case "jwt-decode": {
      const [header, payload] = value.split(".");
      if (!header || !payload)
        throw new Error("Enter a JWT with header, payload, and signature.");
      const decodePart = (part: string) =>
        JSON.parse(base64Decode(part.replace(/-/g, "+").replace(/_/g, "/")));
      return JSON.stringify(
        { header: decodePart(header), payload: decodePart(payload) },
        null,
        2,
      );
    }
    case "camel": {
      const [first = "", ...rest] = toTitle(value);
      return first.toLowerCase() + rest.join("");
    }
    case "pascal":
      return toTitle(value).join("");
    case "snake":
      return words(value).join("_").toLowerCase();
    case "kebab":
    case "slug":
      return words(value).join("-").toLowerCase();
    case "upper":
      return value.toUpperCase();
    case "lower":
      return value.toLowerCase();
    case "trim":
      return value.trim();
    case "collapse":
      return value.trim().replace(/\s+/g, " ");
    case "remove-punctuation":
      return value.replace(/[^\w\s]/g, "");
    case "json-pretty":
      return JSON.stringify(JSON.parse(value), null, 2);
    case "json-minify":
      return JSON.stringify(JSON.parse(value));
    case "safe-identifier":
      return words(value).join("_").toLowerCase();
    case "file-name":
      return value.replace(/[<>:"/\\|?*]/g, "-").trim();
    case "uuid":
      return crypto.randomUUID();
    case "random-hex":
      return Array.from(randomBytes(16), (byte) =>
        byte.toString(16).padStart(2, "0"),
      ).join("");
    case "random-string":
      return btoa(String.fromCharCode(...randomBytes(18)))
        .replace(/[+/=]/g, "")
        .slice(0, 22);
    case "json-validate":
      JSON.parse(value);
      return "Valid JSON";
    case "indent":
      return value
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");
    case "dedent":
      return value.replace(/^\s+/gm, "");
    default:
      return value;
  }
};
