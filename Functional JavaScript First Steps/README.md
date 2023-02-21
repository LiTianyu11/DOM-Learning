# Functional JavaScript First Steps

## Functional 
- 一种编程范式

## Pure Function
- 只有输入和输出，同样的输入得到的结果是一致的，因为纯函数不依赖外界
- 内部不和外界进行接触（没有任何副作用side effects），传入的参数可以是一个外界变量
- 更容易test和debug
- 非常适合做数据的转化

## 迭代 - iteration（impertaive） 回溯 - recursive(functional)
iteration(for,while):
```jsx
function sum (numbers) {
  let total = 0;
  for (i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

sum([0,1,2,3,4]); // 10
```

recursive:
```jsx
function sum (numbers) {
  if (numbers.length === 1) {
    // base case
    return numbers[0];
  } else {
    // recursive case
    return numbers[0] + sum(numbers.slice(1));
  }
}

sum([0,1,2,3,4]); // 10
```

[Fibonacci Iterative and Recursive solutions](https://medium.com/quick-code/fibonacci-sequence-javascript-interview-question-iterative-and-recursive-solutions-6a0346d24053)

关于程序的可读性是一件主观的事情，基于程序员的背景不同，理解会有不同。