const h1 = document.createElement('h1')
h1.innerHTML = ''
h1.className = 'header'
const root = document.querySelector('#root')
root.appendChild(h1)

const nav = (
    <div className = 'nav'>
        <ul>
            <li>
                1
            </li>
            <li>
                2
            </li>
            <li>
                2
            </li>
        </ul>
    </div>
)

setTimeout(() => {100 }, second)
console.log(first)

console.log(setTimeout(() => { first }, second))

