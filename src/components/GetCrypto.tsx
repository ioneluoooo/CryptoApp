import axios from 'axios'
import { useEffect, useState } from 'react'

interface Coin {
  name: string
  current_price: number
}

function GetCrypto() {
  const [crypto, setCrypto] = useState<Coin[]>([])
  const [search, setSearch] = useState('')
  const [filteredCrypto, setFiltered] = useState<Coin[]>([])

  useEffect(() => {
    axios.get('/api/fetch-data')
      .then((response) => {
        setCrypto(response.data)
        console.log(response.data)
      })
      .catch(error => console.error('Error', error))
  }, [])

  function handleChange(e: any) {
    setSearch(e.target.value
    )
  }

  function FilterSearch() {
    const filtered: any = crypto.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase()))
    setFiltered(filtered)
  }

  return (
    <div>
      <div>
        <input type="text"
          placeholder='Your Coin Name'
          onChange={handleChange}
          value={search} />
        <button onClick={FilterSearch}>Search your coin name</button>
      </div>
      <div>
        {filteredCrypto.map((coin) => (
          <div style={{ display: 'flex', gap: '10px' }} key={coin.name}>
            <p>{coin.name}</p>
            <p>{coin.current_price}$</p>
          </div>
        ))
        }
      </div>
    </div>

  )
}

export default GetCrypto



