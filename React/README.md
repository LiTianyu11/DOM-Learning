# React site

## React组件
帕斯卡命名法
- 每个单词字母大写

<ReactCompnent />

```
<img />
<small> </small>
```

## className = '' 而不是 class = ''

## export default function Navbar(){}


## margin-right : auto 


## jsx 将表达式写在{}中
 ```jsx 
//1 AnrBnb - 13-Props practice
 <h3 style={{display: props.setup ? "block":"none"}}> Setup: {props.setup}</h3>

 //1.1 object literal inlined in the prop value
 var obj = {display: props.setup ? "block":"none"};

<h3 style={obj} /> <h3>

//2
 {props.setup && <h3>Setup: {props.setup}</h3>}

//3.jsx不支持``
<img src = {`../images/${props.img}`} />

// 在括号内的setup（第一个）是变量和第二个行内元素括号的setup一样
 {setup && <h3>Setup: {setup}</h3>}

 ```


https://scrimba.com/learn/learnreact/props-practice-co06f4fa2bd9cf954179925f1

## react可以传入[]
```jsx
export default function App() {
    const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]
    return (
        <div>
            {colors}
        </div>
    )
}
```

## .map 将数组中的raw data转化为需要的JSX元素


## props


```jsx
//jokesData.js
export default [
    {
        setup: "I got my daughter a fridge for her birthday.",
        punchline: "I can't wait to see her face light up when she opens it."
    },
    {
        setup: "How did the hacker escape the police?",
        punchline: "He just ransomware!"
    }
]
```
```jsx 
//App.js
import React from "react"
import Joke from "./Joke"
import jokesData from "./jokesData"

export default function App() {
    const jokeElements = jokesData.map(joke => {
        return <Joke setup={joke.setup} punchline={joke.punchline}  punchline1={joke.punchline}/>
    })
    return (
        <div>
            {jokeElements}
        </div>
    )
}

```

```jsx
//Joke.js
import React from "react"

export default function Joke(props) {
    console.log(props)
    return (
        <div>
            {props.setup && <h3>Setup: {props.setup}</h3>}
            <p>Punchline: {props.punchline}</p>
            <hr />
        </div>
    )
}
```


```jsx
//展示传入的props是什么
 const jokeElements = jokesData.map(joke => {
        return <Joke setup={joke.setup} punchline={joke.punchline}  punchline1={joke.punchline}/>
    })

//....

function Joke(props) {}

//props :  setup={joke.setup} punchline={joke.punchline}  punchline1={joke.punchline}   
//{setup: "I got my daughter a fridge for her birthday.", punchline: "I can't wait to see her face light up when she opens it.", punchline1: "I can't wait to see her face light up when she opens it."}
```