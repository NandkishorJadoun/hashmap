import LinkedList from "./linkedList.js";

export default class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;

    this.buckets = this.#generateBucket();
    this.totalEntries = 0;
  }

  #generateBucket() {
    this.buckets = [];
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new LinkedList();
    }

    return this.buckets;
  }

  #generateHash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  #entry(key, bucket) {
    if (Number.isInteger(bucket.find(key))) {
      let index = bucket.find(key);
      return bucket.at(index).value;
    }

    return false;
  }

  #expandHashMap() {
    this.capacity *= 2;

    this.totalEntries = 0;

    const oldBuckets = this.buckets;

    const oldBucketsData = [];

    for (let oldBucket of oldBuckets) {
      if (oldBucket.size() > 0) {
        oldBucketsData.push(...oldBucket.traverse());
      }
    }

    this.buckets = this.#generateBucket(this.capacity);

    for (let oldBucketData of oldBucketsData) {
      const key = oldBucketData.key;
      const value = oldBucketData.value;

      this.set(key, value);
    }
  }

  set(key, value) {
    let bucketIndex = this.#generateHash(key);

    let bucket = this.buckets[bucketIndex];

    if (bucket.contains(key)) {
      let prop = this.#entry(key, bucket);
      prop.value = value;
      return;
    }

    bucket.append({ key, value });

    this.totalEntries++;

    let currentLoadFactor = this.totalEntries / this.capacity;

    if (currentLoadFactor > this.loadFactor) {
      this.#expandHashMap();
    }
  }

  get(key) {
    let bucketIndex = this.#generateHash(key);

    let bucket = this.buckets[bucketIndex];

    if (this.#entry(key, bucket)) {
      let prop = this.#entry(key, bucket);

      return prop.value;
    }

    return false;
  }

  has(key) {
    let bucketIndex = this.#generateHash(key);
    let bucket = this.buckets[bucketIndex];

    if (this.#entry(key, bucket)) {
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.has(key)) {
      let bucketIndex = this.#generateHash(key);
      let bucket = this.buckets[bucketIndex];

      let index = bucket.find(key);

      bucket.removeAt(index);
      this.totalEntries--;
      return true;
    }

    return false;
  }

  length() {
    let length = 0;
    for (let bucket of this.buckets) {
      length += bucket.size();
    }

    return length;
  }

  clear() {
    for (let bucket of this.buckets) {
      bucket.clearList();
    }

    this.totalEntries = 0;
  }

  keys() {
    let totalKeys = [];

    for (let bucket of this.buckets) {
      if (bucket.size() > 0) {
        const entries = bucket.traverse();
        for (let entry of entries) {
          totalKeys.push(entry.key);
        }
      }
    }

    return totalKeys;
  }

  values() {
    let totalValues = [];

    for (let bucket of this.buckets) {
      if (bucket.size() > 0) {
        const entries = bucket.traverse();
        for (let entry of entries) {
          totalValues.push(entry.value);
        }
      }
    }

    return totalValues;
  }

  entries() {
    let totalEntries = [];

    for (let bucket of this.buckets) {
      if (bucket.size() > 0) {
        const entries = bucket.traverse();
        for (let entry of entries) {
          const entryArr = [];
          entryArr.push(entry.key);
          entryArr.push(entry.value);
          totalEntries.push(entryArr);
        }
      }
    }
    return totalEntries;
  }
}
