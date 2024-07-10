// https://github.com/AdiRishi/cachified-adapter-cloudflare-kv/tree/main

import {
  totalTtl,
  type Cache,
  type CacheEntry,
  type CacheMetadata,
} from "@epic-web/cachified";

export type CloudflareKvCacheConfig = {
  kv: KVNamespace;
  keyPrefix?: string;
  name?: string;
};

export function cloudflareKvCacheAdapter<Value = unknown>(
  config: CloudflareKvCacheConfig
): Cache<Value> {
  return {
    name: config.name ?? "CloudflareKV",
    get: async (key) => {
      return getOperation<Value>(config.kv, key, config.keyPrefix);
    },
    set: async (key, value) => {
      return await setOperation<Value>(config.kv, key, value, config.keyPrefix);
    },
    delete: async (key) => {
      await deleteOperation(config.kv, key, config.keyPrefix);
    },
  };
}

async function getOperation<Value = unknown>(
  kv: KVNamespace,
  key: string,
  keyPrefix?: string
): Promise<CacheEntry<Value> | null> {
  const cacheKey = buildCacheKey(key, keyPrefix);
  const { value, metadata } = await kv.getWithMetadata<CacheMetadata>(
    cacheKey,
    { type: "text" }
  );
  if (value === null) {
    return value;
  }
  const jsonValue = JSON.parse(value) as Value;
  return {
    value: jsonValue,
    metadata: metadata!,
  };
}

async function setOperation<Value = unknown>(
  kv: KVNamespace,
  key: string,
  value: CacheEntry<Value>,
  keyPrefix?: string
): Promise<unknown> {
  const cacheKey = buildCacheKey(key, keyPrefix);

  let expirationTtl: number | undefined = totalTtl(value.metadata);
  if (expirationTtl === Infinity) {
    expirationTtl = undefined;
  } else {
    expirationTtl = Math.max(Math.ceil(expirationTtl / 1000), 60);
  }

  await kv.put(cacheKey, JSON.stringify(value.value), {
    expirationTtl: expirationTtl,
    metadata: value.metadata,
  });
  return value.value;
}

async function deleteOperation(
  kv: KVNamespace,
  key: string,
  keyPrefix?: string
): Promise<void> {
  const cacheKey = buildCacheKey(key, keyPrefix);
  await kv.delete(cacheKey);
}

function buildCacheKey(givenKey: string, keyPrefix?: string): string {
  return keyPrefix ? `${keyPrefix}:${givenKey}` : givenKey;
}
