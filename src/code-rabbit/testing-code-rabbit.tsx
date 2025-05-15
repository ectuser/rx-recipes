import {FC, useEffect, useState, useMemo} from 'react'

type Props = {
  name: string
  age?: number
  showMemo?: boolean
}

export const UserProfile: FC<Props> = (props) => {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  if (props.showMemo) {
    // ❌ INVALID: Hook called conditionally
    useMemo(() => {
      console.log('This is a memoized function')
      return {}
    }, [])
  }

  useEffect(() => {
    setLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/users/1`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data)
        setLoading(false)
      })
  }, [])

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>Hello {props.name}</h1>
      <p>Age: {props.age}</p>
      <p onClick={handleClick}>Click count: {count}</p>
      {loading && <p>Loading...</p>}
      {userData && <div>{userData.name}</div>}
    </div>
  )
}