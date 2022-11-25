import * as dotenv from 'dotenv';

dotenv.config();

// Global config
const port: string = process.env.PORT || '3030';

const GLOBAL = {
  PORT: port
}

// Redis
const url: string = process.env.REDIS_URL || 'localhost:4000';

const REDIS = {
    URL: url 
};

// Global configuration
const configs = {
  REDIS: REDIS,
  GLOBAL: GLOBAL
};


export default configs;