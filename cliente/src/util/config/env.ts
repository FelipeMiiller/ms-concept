
import dotenv from 'dotenv'
import { IEnvConfig } from '../../types/env';



type TDefault = {
  env: "dev" | "prod" | "test";
}


export function ConfigEnv<T>(): (T & TDefault) {


  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  const parsedEnv = result.parsed as Record<string, string>;
  const obj: Record<string, string | Record<string, string>> = {};

  for (const [key, value] of Object.entries(parsedEnv)) {
    const keys = key.split("_");
    let currentObj = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i].toLowerCase();

      if (!currentObj[currentKey]) {
        currentObj[currentKey] = {};
      }

      currentObj = currentObj[currentKey] as Record<string, string | Record<string, string>>;
    }

    currentObj[keys[keys.length - 1].toLowerCase()] = value;

  }
  const node = obj.node as unknown as TDefault;


  const t = { ...(obj[node.env] as Record<string, string>), ...node };


  return t as T & TDefault
}



export const env = ConfigEnv<IEnvConfig>();
console.log("return", env)