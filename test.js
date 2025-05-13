import HashMap from "./hashMap.js";
import HashSet from "./hashSet.js";

/* Testing HashMap */

const testMap = new HashMap();

testMap.set("apple", "red");
testMap.set("banana", "yellow");
testMap.set("carrot", "orange");
testMap.set("dog", "brown");
testMap.set("elephant", "gray");
testMap.set("frog", "green");
testMap.set("grape", "purple");
testMap.set("hat", "black");
testMap.set("ice cream", "white");
testMap.set("jacket", "blue");
testMap.set("kite", "pink");
testMap.set("lion", "golden");
testMap.set("moon", "silver");

console.log(testMap.length()); // 13

/* Testing HashSet */

const testSet = new HashSet();

testSet.set("lion");
testSet.set("tiger");
testSet.set("monkey");
testSet.set("dog");
testSet.set("elephant");
testSet.set("frog");
testSet.set("goat");
testSet.set("dear");
testSet.set("cat");
testSet.set("cow");
testSet.set("rat");
testSet.set("jackal");
testSet.set("buffalo");

console.log(testSet.length()) // 13