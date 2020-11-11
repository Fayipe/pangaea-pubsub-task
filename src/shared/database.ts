import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "../config";
import * as redis from "redis";


export const RedisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
})
