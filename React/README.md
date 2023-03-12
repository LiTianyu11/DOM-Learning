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


## props vs state
- props适用于不能改变的元素
- state适用于可以改变的元素


## useState 
const [state, setState] = useState(initialState)
https://beta.reactjs.org/reference/react/useState

```jsx  
//切换yes/no
import React from "react"

export default function App() {
    const [isGoingOut, setIsGoingOut] = React.useState(true)
    function changeMind() {
        setIsGoingOut(prevState => !prevState)
    }
    
    return (
        <div className="state">
            <h1 className="state--title">Do I feel like going out tonight?</h1>
            <div onClick={changeMind} className="state--value">
                <h1>{isGoingOut ? "Yes" : "No"}</h1>
                //isGoingOut === true多此一举
            </div>
        </div>
    )
}

```
https://scrimba.com/learn/learnreact/challenge-flipping-state-back-and-forth-co4674229b54cd8335c75e54d

```jsx
//p20
 const [thingsArray, setThingsArray] = React.useState(["Thing 1", "Thing 2"])
    
    function addItem() {
        // We'll work on this next
        setThingsArray(prevThingsArray => {
            return [...prevThingsArray, `Thing ${prevThingsArray.length + 1}`]
            //不能是prevThingsArray.push() 这不会起作用，我们不能modify原对象，而是提供一个新对象
        })
    }
    
    const thingsElements = thingsArray.map(thing => <p key={thing}>{thing}</p>)
```


## 将state作为prop传入

- 别忘了import组件
https://scrimba.com/learn/learnreact/passing-state-as-props-co7444d9daf79f8f39a8ebef4
```jsx

//<Count number={count} />
export default function Count(props) {
    console.log("Count component rendered")
    console.log(props) //{number: -1}
    return (
        <div className="counter--count">
            <h1>{props.number}</h1>
        </div>
    )
}
```

- state作为props只能从父节点向下传递，不能向上或者同级传递


## 将父级的函数传入子代，子代向此函数穿参数的方法
https://scrimba.com/learn/learnreact/boxes-challenge-part-32-unified-state-coc544380b8da728809b4b5f2
```jsx


//father
  function toggle(id) {
        console.log(id)
    }

//child arrow function , props是传入child的参数
onClick={()=>props.toggle(props.id)}
```

## box Challenge part4
https://scrimba.com/learn/learnreact/boxes-challenge-part-4-co2ee48359ffd4cb63f392139
```jsx
//实现点一下变色
 const [squares, setSquares] = React.useState(boxes)
    
    function toggle(id) {
        //把boxes.js中的数据从头到尾更新，将新的数据传入state
        setSquares(prevSquares => {
            const newSquares = []
            for(let i = 0; i < prevSquares.length; i++) {
                const currentSquare = prevSquares[i]
                if(currentSquare.id === id) {
                    const updatedSquare = {
                        ...currentSquare,
                        on: !currentSquare.on
                    }
                    newSquares.push(updatedSquare)
                } else {
                    newSquares.push(currentSquare)
                }
            }
            return newSquares
        })
    }
```
- 错误点： 忘记加const之类的变量名

```jsx
function toggle(id) {
        setSquares(prevSquares => {
            return prevSquares.map((square) => {
                return square.id === id ? {...square, on: !square.on} : square
            })
        })
    }
    
```


## useState箭头函数更替就对象

```jsx
  function handleChange(event) {
        setFormData(data => { return { ...data, [event.target.name]: event.target.value } })
    }

//不能写成
  function handleChange(event) {
        setFormData(data =>  { ...data, [event.target.name]: event.target.value } })
    }

```

## React 表单

- placehoder开头一般大写
```jsx
<input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="lastName"
            />
```

```jsx
//checkbox

 <input 
    type="checkbox" 
    id="isFriendly" 
/>
    <label htmlFor="isFriendly">Are you friendly?</label>
    //⭐htmlFor

//更新handleChange
  function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
```


```jsx
//radio
<fieldset>
    <legend>Current employment status</legend>
    
    <input 
        type="radio"
        id="unemployed"
        name="employment"
        value="unemployed"
        //这里的checked和checkbox有所不同
        checked={formData.employment === "unemployed"}
        onChange={handleChange}
    />
    <label htmlFor="unemployed">Unemployed</label>
    <br />
    
    <input 
        type="radio"
        id="part-time"
        name="employment"
        value="part-time"
        checked={formData.employment === "part-time"}
        onChange={handleChange}
    />
    <label htmlFor="part-time">Part-time</label>
    <br />
    
    <input 
        type="radio"
        id="full-time"
        name="employment"
        value="full-time"
        checked={formData.employment === "full-time"}
        onChange={handleChange}
    />
    <label htmlFor="full-time">Full-time</label>
    <br />
    
</fieldset>
```


## React.useEffect()
```jsx
//有什么区别吗

export default function WindowTracker() {
    
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", function() {
            setWindowWidth(window.innerWidth)
        })
    }, [])
    
    return (
        <h1>Window width: {windowWidth}</h1>
    )
}

//

import React from "react"

export default function WindowTracker() {

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
        window.addEventListener("resize", function () {
            setWindowWidth(window.innerWidth)
            
        })
    }, [])


    return (
        <h1>Window width: {windowWidth}</h1>
    )
}

```