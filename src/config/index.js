import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, NODE_ENV, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
