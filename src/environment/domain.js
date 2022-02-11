import { APP_ENV } from "./env.js";
let env = "";
switch (APP_ENV) {
  case "pre":
    env = "pre";
    break;
  case "prd":
    env = "";
    break;
  case "sit":
    env = "sit";
    break;
  default:
    env = "sit";
    break;
}

let prefix = env === "" ? "mall-api" : "mall-api-",
  rootDomain = `//${prefix}${env}.dejiplaza.com`,
  rootDomainPlaza = `//o2o${env}.dejiplaza.com`;

let Host = {
  baseURL: `https:${rootDomain}`,
  openBaseUrl: `https:${rootDomainPlaza}/dj-open-api`,
  eshopBaseUrl: `https:${rootDomainPlaza}/dj-eshop-api`,
  tdBaseUrl: `https:${rootDomainPlaza}/dj-eshop-api`,
};

export { Host };
