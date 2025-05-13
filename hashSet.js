import LinkedList from "./linkedList.js";

class HashSet {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;

    this.buckets = this.#generateBuckets();
    this.totalKeys = 0;
  }

  #generateBuckets() {
    this.buckets = [];

    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new LinkedList();
    }

    return this.buckets;
  }

  #generateHash(key = "") {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  #expandHashSet() {
    this.capacity *= 2;
    this.totalKeys = 0;

    const oldBucketsData = this.keys();

    this.buckets = this.#generateBuckets();

    for (let key of oldBucketsData) {
      this.set(key);
    }
  }

  set(key) {
    const bucketIndex = this.#generateHash(key);

    const bucket = this.buckets[bucketIndex];

    if (bucket.contains(key)) {
      return;
    }

    bucket.append(key);

    this.totalKeys++;

    const currentLoadFactor = this.totalKeys / this.capacity;

    if (currentLoadFactor > this.loadFactor) {
      this.#expandHashSet();
    }
  }

  has(key) {
    const bucketIndex = this.#generateHash(key);

    const bucket = this.buckets[bucketIndex];

    if (bucket.contains(key)) {
      return true;
    }

    return false;
  }

  remove(key) {
    const bucketIndex = this.#generateHash(key);

    const bucket = this.buckets[bucketIndex];

    if (this.has(key)) {
      const keyIndex = bucket.find(key);
      bucket.removeAt(keyIndex);
      this.totalKeys--;
      return true;
    }

    return false;
  }

  length() {
    let totalLength = 0;

    for (let bucket of this.buckets) {
      if (bucket.size() > 0) {
        totalLength += bucket.size();
      }
    }

    return totalLength;
  }

  keys() {
    const totalKeys = [];

    for (let bucket of this.buckets) {
      if (bucket.size() > 0) {
        const keys = bucket.traverse();
        for (let key of keys) {
          totalKeys.push(key);
        }
      }
    }

    return totalKeys;
  }

  clear() {
    for (let bucket of this.buckets) {
      bucket.clearList();
    }
    this.totalKeys = 0;
  }
}
