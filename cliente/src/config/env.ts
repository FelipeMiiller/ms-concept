
import dotenv from 'dotenv'
import { IEnvConfig } from 'src/types/env';




function configEnvironment<T>(): T {
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


  return obj as T;
}



export const env = configEnvironment<IEnvConfig>();
console.log(env)