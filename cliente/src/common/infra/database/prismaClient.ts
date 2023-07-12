


import { PrismaClient } from "@prisma/client";
import { env } from "../../../util/config/env";





   export const prismaClient= new PrismaClient({
        datasources: {
          db: {
            url:env.database.url,
          },
        },
      });
     
  



