// Node.js v25 实验性 localStorage 是一个空对象，没有 getItem 等方法。
// 这个 mock 让 Next.js dev overlay 内部的 localStorage.getItem() 调用不报错。
if (typeof globalThis.localStorage === "object" && !globalThis.localStorage.getItem) {
  globalThis.localStorage = {
    getItem() { return null },
    setItem() {},
    removeItem() {},
    clear() {},
    key() { return null },
    length: 0,
  }
}
