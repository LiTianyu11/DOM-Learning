import React, { useRef } from 'react'




const catList = []

for (let i = 0; i < 11; i++) {
  catList.push({
    id: i,
    imgUrl: 'https://placekitten.com/250/200?image=' + i
  })
}


export default function App() {


  
  const itemRef = useRef(null)

  function getMap() {
    if (!itemRef.current) {
      itemRef.current = new Map()
    }

    return itemRef.current
  }


  function getCat(id) {
    const node = itemRef.current.get(id)
    node.scrollIntoView({
      behavior: 'smooth'
    })

  }

  return (
    <>
      <nav>
        <button onClick={() => getCat(1)}>
          1
        </button>
        <button onClick={() => getCat(5)}>2</button>
        <button onClick={() => getCat(9)}>3</button>
      </nav>
      <div>
        <ul>
          {
            catList.map(
              cat =>
              (<li key={cat.id}
                ref={(node) => {
                  const map = getMap();
                  console.log(node)
                  if (node) {
                    map.set(cat.id, node)
                  } else {
                    map.delete(cat.id)//当每个li元素被挂载或卸载时，它的ref回调函数会被调用，从而将节点存储到Map对象中或从Map对象中删除节点。
                  }
                }}
              >
                <img src={cat.imgUrl} />
              </li>)

            )

          }




        </ul>
      </div>

    </>

  )
}




