import { DevEnvironment } from "./dev.env";
// import { ProdEnvironment } from "./prod.env";

export interface Environment {
  base_api_url: string;
}

export function getEnvVariable(): Environment {
  return DevEnvironment;
  //   return ProdEnvironment;
}
