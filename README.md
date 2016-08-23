# js-array-indexof-vs-hashmap
A performance test on Array.indexOf vs Object.keys ( HashMap )

This is a result that came out of a discussion with the maintainer of https://github.com/s0ph1e/node-css-url-parser.
The initial implementation was built on top of lodash which implied that the algorithm to parse URL and a big-O of O(n^2).

The suggestion was to improve the algorithm by using a HashMap by utilizing Object keys to filter out duplicates instead of doing Array.indexOf() N times. V8 will waste some cycles at first to create the keys but from there on the lookup should be O(1). Surprisingly, the results tell a different story :)

You are welcome to clone and run these tests on your own setup.

Running on Node 6.3 on Ubuntu 16
 ```
payload: payload-01.json
Url count 1
array.indexOf x 11,545,063 ops/sec ±0.71% (87 runs sampled)
object.keys x 6,540,930 ops/sec ±0.85% (93 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-02.json
Url count 2
array.indexOf x 8,063,745 ops/sec ±0.60% (93 runs sampled)
object.keys x 2,635,597 ops/sec ±1.03% (91 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-03.json
Url count 4
array.indexOf x 4,696,764 ops/sec ±0.57% (90 runs sampled)
object.keys x 1,746,973 ops/sec ±1.13% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-04.json
Url count 8
array.indexOf x 2,744,263 ops/sec ±0.63% (88 runs sampled)
object.keys x 1,032,001 ops/sec ±1.39% (91 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-05.json
Url count 16
array.indexOf x 1,505,882 ops/sec ±0.64% (90 runs sampled)
object.keys x 630,247 ops/sec ±1.12% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-06.json
Url count 32
array.indexOf x 786,041 ops/sec ±0.63% (90 runs sampled)
object.keys x 296,178 ops/sec ±1.03% (92 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-07.json
Url count 64
array.indexOf x 410,080 ops/sec ±0.41% (91 runs sampled)
object.keys x 54,491 ops/sec ±1.00% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-08.json
Url count 128
array.indexOf x 207,772 ops/sec ±0.36% (87 runs sampled)
object.keys x 25,539 ops/sec ±0.78% (94 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-09.json
Url count 255
array.indexOf x 104,936 ops/sec ±0.34% (94 runs sampled)
object.keys x 13,901 ops/sec ±0.90% (93 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-10.json
Url count 512
array.indexOf x 52,422 ops/sec ±0.37% (93 runs sampled)
object.keys x 7,293 ops/sec ±0.84% (92 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-11.json
Url count 1024
array.indexOf x 26,331 ops/sec ±0.34% (95 runs sampled)
object.keys x 3,628 ops/sec ±0.84% (89 runs sampled)
Fastest is array.indexOf
----------------
with lots of duplicates
Url count 80
array.indexOf x 328,486 ops/sec ±0.44% (92 runs sampled)
object.keys x 137,541 ops/sec ±0.72% (91 runs sampled)
Fastest is array.indexOf
----------------
with lots of duplicates
Url count 1024
array.indexOf x 26,381 ops/sec ±0.29% (93 runs sampled)
object.keys x 5,024 ops/sec ±0.75% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: short keys
Url count 128
array.indexOf x 207,910 ops/sec ±0.33% (92 runs sampled)
object.keys x 25,716 ops/sec ±0.86% (91 runs sampled)
Fastest is array.indexOf
----------------
payload: short keys
Url count 256
array.indexOf x 110,873 ops/sec ±0.47% (88 runs sampled)
object.keys x 14,773 ops/sec ±0.83% (93 runs sampled)
Fastest is array.indexOf
----------------
```
