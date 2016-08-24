# js-array-indexof-vs-hashmap
A performance test on Array.indexOf vs Object.keys ( HashMap )

This is a result that came out of a discussion with the maintainer of https://github.com/s0ph1e/node-css-url-parser.
The initial implementation was built on top of lodash which implied that the algorithm to parse URL and a big-O of O(n^2).

The suggestion was to improve the algorithm by using a HashMap by utilizing Object keys to filter out duplicates instead of doing Array.indexOf() N times. V8 will waste some cycles at first to create the keys but from there on the lookup should be O(1). Surprisingly, the results tell a different story :)

You are welcome to clone and run these tests on your own setup.

```
node test-insert.js
node test-insert-unique.js
node test-lookup.js
node test-insert-and-lookup.js
```

Running on Node 6.3 ( V8 engine ) on Ubuntu 16 the results show that lookup alone becomes much faster with the HashMap as the data grows ( which is expected ), though, to create this structure in JS is very expensive. Below are the various tests separated by insetion, lookup, unique insertion, and insertion + lookup.

test lookup + insert
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

test insert only
```
payload: payload-01.json
Url count 1
array.indexOf x 5,382,144 ops/sec ±1.04% (85 runs sampled)
object.keys x 14,232,306 ops/sec ±0.68% (93 runs sampled)
Fastest is object.keys
----------------
payload: payload-02.json
Url count 2
array.indexOf x 5,769,130 ops/sec ±4.21% (71 runs sampled)
object.keys x 2,819,269 ops/sec ±2.50% (87 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-03.json
Url count 4
array.indexOf x 4,370,177 ops/sec ±2.83% (88 runs sampled)
object.keys x 1,882,326 ops/sec ±1.57% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-04.json
Url count 8
array.indexOf x 3,620,545 ops/sec ±4.61% (84 runs sampled)
object.keys x 1,276,003 ops/sec ±2.22% (85 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-05.json
Url count 16
array.indexOf x 2,707,880 ops/sec ±2.72% (87 runs sampled)
object.keys x 702,045 ops/sec ±1.06% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-06.json
Url count 32
array.indexOf x 337,299 ops/sec ±0.71% (93 runs sampled)
object.keys x 325,909 ops/sec ±0.79% (92 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-07.json
Url count 64
array.indexOf x 167,516 ops/sec ±0.78% (91 runs sampled)
object.keys x 77,418 ops/sec ±0.80% (93 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-08.json
Url count 128
array.indexOf x 84,789 ops/sec ±0.89% (89 runs sampled)
object.keys x 33,857 ops/sec ±0.98% (89 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-09.json
Url count 255
array.indexOf x 41,999 ops/sec ±0.72% (93 runs sampled)
object.keys x 17,939 ops/sec ±0.70% (88 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-10.json
Url count 512
array.indexOf x 21,446 ops/sec ±0.75% (91 runs sampled)
object.keys x 9,237 ops/sec ±1.06% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-11.json
Url count 1024
array.indexOf x 10,586 ops/sec ±0.65% (95 runs sampled)
object.keys x 4,567 ops/sec ±0.71% (91 runs sampled)
Fastest is array.indexOf
----------------
with lots of duplicates
Url count 80
array.indexOf x 136,196 ops/sec ±0.74% (94 runs sampled)
object.keys x 143,697 ops/sec ±0.39% (94 runs sampled)
Fastest is object.keys
----------------
with lots of duplicates
Url count 1024
array.indexOf x 10,573 ops/sec ±0.81% (92 runs sampled)
object.keys x 5,954 ops/sec ±0.77% (93 runs sampled)
Fastest is array.indexOf
----------------
payload: short keys
Url count 128
array.indexOf x 85,512 ops/sec ±0.65% (90 runs sampled)
object.keys x 35,155 ops/sec ±0.61% (92 runs sampled)
Fastest is array.indexOf
----------------
payload: short keys
Url count 256
array.indexOf x 41,349 ops/sec ±0.76% (91 runs sampled)
object.keys x 17,650 ops/sec ±0.87% (87 runs sampled)
Fastest is array.indexOf
----------------
```

test insert unique items only
```
payload: payload-01.json
Url count 1
array.indexOf x 11,743,809 ops/sec ±2.24% (85 runs sampled)
object.keys x 14,267,879 ops/sec ±0.85% (90 runs sampled)
Fastest is object.keys
----------------
payload: payload-02.json
Url count 2
array.indexOf x 8,308,092 ops/sec ±0.73% (92 runs sampled)
object.keys x 3,490,947 ops/sec ±1.88% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-03.json
Url count 4
array.indexOf x 4,787,530 ops/sec ±0.60% (91 runs sampled)
object.keys x 2,073,890 ops/sec ±2.65% (85 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-04.json
Url count 8
array.indexOf x 2,726,629 ops/sec ±0.98% (86 runs sampled)
object.keys x 1,162,704 ops/sec ±1.09% (85 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-05.json
Url count 16
array.indexOf x 1,478,801 ops/sec ±1.14% (85 runs sampled)
object.keys x 640,316 ops/sec ±3.01% (85 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-06.json
Url count 32
array.indexOf x 782,761 ops/sec ±0.70% (93 runs sampled)
object.keys x 309,390 ops/sec ±0.79% (89 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-07.json
Url count 64
array.indexOf x 406,035 ops/sec ±0.67% (88 runs sampled)
object.keys x 75,246 ops/sec ±1.02% (91 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-08.json
Url count 128
array.indexOf x 200,938 ops/sec ±0.67% (88 runs sampled)
object.keys x 34,307 ops/sec ±0.87% (93 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-09.json
Url count 255
array.indexOf x 104,337 ops/sec ±0.44% (92 runs sampled)
object.keys x 17,931 ops/sec ±1.16% (89 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-10.json
Url count 512
array.indexOf x 51,500 ops/sec ±0.65% (92 runs sampled)
object.keys x 9,097 ops/sec ±1.23% (88 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-11.json
Url count 1024
array.indexOf x 26,194 ops/sec ±0.54% (91 runs sampled)
object.keys x 4,643 ops/sec ±0.88% (92 runs sampled)
Fastest is array.indexOf
----------------
with lots of duplicates
Url count 80
array.indexOf x 330,685 ops/sec ±0.38% (85 runs sampled)
object.keys x 137,016 ops/sec ±0.61% (90 runs sampled)
Fastest is array.indexOf
----------------
with lots of duplicates
Url count 1024
array.indexOf x 26,108 ops/sec ±0.51% (91 runs sampled)
object.keys x 5,941 ops/sec ±0.72% (91 runs sampled)
Fastest is array.indexOf
----------------
payload: short keys
Url count 128
array.indexOf x 200,803 ops/sec ±0.77% (87 runs sampled)
object.keys x 35,192 ops/sec ±1.06% (87 runs sampled)
Fastest is array.indexOf
----------------
payload: short keys
Url count 256
array.indexOf x 102,025 ops/sec ±0.64% (93 runs sampled)
object.keys x 18,726 ops/sec ±1.18% (90 runs sampled)
Fastest is array.indexOf
----------------
```

test lookup only
```
payload: payload-01.json
Url count 1
array.indexOf x 12,029,886 ops/sec ±0.58% (91 runs sampled)
object.keys x 6,782,022 ops/sec ±0.59% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-02.json
Url count 2
array.indexOf x 10,899,799 ops/sec ±2.67% (87 runs sampled)
object.keys x 3,733,583 ops/sec ±1.32% (88 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-03.json
Url count 4
array.indexOf x 3,873,764 ops/sec ±1.60% (88 runs sampled)
object.keys x 1,998,549 ops/sec ±1.35% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-04.json
Url count 8
array.indexOf x 1,129,336 ops/sec ±0.50% (90 runs sampled)
object.keys x 1,047,991 ops/sec ±0.95% (90 runs sampled)
Fastest is array.indexOf
----------------
payload: payload-05.json
Url count 16
array.indexOf x 411,905 ops/sec ±0.77% (92 runs sampled)
object.keys x 558,325 ops/sec ±0.47% (92 runs sampled)
Fastest is object.keys
----------------
payload: payload-06.json
Url count 32
array.indexOf x 118,166 ops/sec ±0.35% (94 runs sampled)
object.keys x 257,235 ops/sec ±0.68% (94 runs sampled)
Fastest is object.keys
----------------
payload: payload-07.json
Url count 64
array.indexOf x 24,286 ops/sec ±0.26% (94 runs sampled)
object.keys x 253,967 ops/sec ±0.50% (88 runs sampled)
Fastest is object.keys
----------------
payload: payload-08.json
Url count 128
array.indexOf x 5,941 ops/sec ±0.25% (94 runs sampled)
object.keys x 127,868 ops/sec ±0.62% (94 runs sampled)
Fastest is object.keys
----------------
payload: payload-09.json
Url count 255
array.indexOf x 1,950 ops/sec ±0.86% (91 runs sampled)
object.keys x 60,803 ops/sec ±0.49% (94 runs sampled)
Fastest is object.keys
----------------
payload: payload-10.json
Url count 512
array.indexOf x 600 ops/sec ±0.41% (91 runs sampled)
object.keys x 30,738 ops/sec ±0.25% (92 runs sampled)
Fastest is object.keys
----------------
payload: payload-11.json
Url count 1024
array.indexOf x 170 ops/sec ±0.60% (83 runs sampled)
object.keys x 14,586 ops/sec ±0.23% (91 runs sampled)
Fastest is object.keys
----------------
with lots of duplicates
Url count 80
array.indexOf x 80,978 ops/sec ±0.30% (92 runs sampled)
object.keys x 108,699 ops/sec ±0.30% (92 runs sampled)
Fastest is object.keys
----------------
with lots of duplicates
Url count 1024
array.indexOf x 242 ops/sec ±0.45% (86 runs sampled)
object.keys x 14,201 ops/sec ±0.22% (87 runs sampled)
Fastest is object.keys
----------------
payload: short keys
Url count 128
array.indexOf x 14,535 ops/sec ±0.22% (91 runs sampled)
object.keys x 124,955 ops/sec ±0.27% (91 runs sampled)
Fastest is object.keys
----------------
payload: short keys
Url count 256
array.indexOf x 4,051 ops/sec ±0.19% (94 runs sampled)
object.keys x 66,776 ops/sec ±0.43% (94 runs sampled)
Fastest is object.keys
----------------
```
