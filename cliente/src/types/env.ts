

export interface IEnvConfig {
    database: {
      url: string;
    };
    port: string;
    kafka: {
      broker: string;
      username: string;
      password: string;
    };
  }