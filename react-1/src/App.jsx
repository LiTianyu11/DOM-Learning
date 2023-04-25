import React, { createContext, useContext, useState } from 'react'
const ThemeContext = createContext(null)
const CurrentUserContext = createContext(null)

export default function App() {
  const [theme, setTheme] = useState('light')
  const [currentUser, setCurrentUser] = useState(null)

  return (

    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <ThemeContext.Provider value={theme}>
        <WelcomePanel />

        <label htmlFor="">
          <input type="checkbox" name="" id=""
            onClick={e => setTheme(e.target.checked ? 'dark' : 'light')}
          />
          🌙dark mode
        </label>
      </ThemeContext.Provider>
    </CurrentUserContext.Provider >


  )
}


function WelcomePanel() {
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <Panel title={'Welcome'}>
      {currentUser !== null ? <Greeting /> : <LoginForm />
      }

    </Panel>
  )
}

function Greeting() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  console.log(currentUser)
  return (

    <>
      <p>You logged in as {currentUser.name} </p>
      <Button
        onClick={() => setCurrentUser(null)}
      >Back </Button>
    </>
  )

}

function LoginForm() {
  const [name, setName] = useState('')
  const { setCurrentUser } = useContext(CurrentUserContext)


  return (
    <>
      Name: <input type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br />
      <Button
        disabled={name === ''}
        onClick={() => setCurrentUser({ name: 'Li' })}
      >Log in</Button>
      <i>Fill in Both fields</i>
    </>
  )
}


function Panel({ title, children }) {
  const theme = useContext(ThemeContext)
  const className = 'panel-' + theme

  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>

  )
}


function Button({ children, onClick, disabled }) {
  const theme = useContext(ThemeContext)
  const className = 'button-' + theme

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={onClick}
    > {children}</button>
  )
}