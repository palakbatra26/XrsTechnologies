import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!globalThis.__vproMongooseCache) {
  globalThis.__vproMongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  const cache = globalThis.__vproMongooseCache;
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
