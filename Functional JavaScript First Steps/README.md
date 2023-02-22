# Functional JavaScript First Steps

## Functional 
- 一种编程范式
- program === functions

## Pure Function
- 只有输入和输出，同样的输入得到的结果是一致的，因为纯函数不依赖外界
- 内部不和外界进行接触（没有任何副作用side effects），传入的参数可以是一个外界变量
- 更容易test和debug
- 非常适合做数据的转化

## 迭代 - iteration（impertaive） 递归 - recursive(functional)
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

## Tail Call Optimization 尾调用优化
不是所有的浏览器都支持

## 高阶函数
 first-class functions?

高阶函数
- 将其他的函数作为输入输出
- map，reduce，filter...
<img src='../pic/屏幕截图%202023-02-21%20144207.png'>
[Exercise: Filter, Map, Reduce](https://observablehq.com/@anjana/exercise-filter-map-reduce)
- map(n => n*2 , wholes) - 函数式
- wholes.map(n => n*2) - 对象式


## ⭐Currying
将多参函数分解成一系列单参函数



## ⭐function composition
[function composition](composingFunctions.js)  
[exercise]("https://observablehq.com/@anjana/solutions-function-composition")
```jsx
function pipeline(...functions) {
  // TODO code goes here
  
  if(length(functions) == 0){return input => input}
  if(length(functions) == 1){return input => head(functions)(input)}
  return function(input) {
    // TODO more code goes here
     return pipeline(...tail(functions))(head(functions)(input));
  };


  pluralize = singularWord => singularWord + 's'

  heart = word => "I ❤️ " + word

  exclaim = sentence => sentence + "!"

  showSomeLove = pipeline(pluralize, heart, exclaim);

}
```
 pipelineLove = showSomeLove('demo')  
⬇️   
pipeline([heart,exclaim])(pluralize('demo'))   
⬇️   
pipeline([exclaim])(heart('demos'))  
⬇️   
exclaim("I ❤️ demos")  
⬇️   
"I ❤️ demos !"

<input type = "checkbox">Snake charming