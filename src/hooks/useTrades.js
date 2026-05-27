import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function useTrades() {
  const [trades, setTrades] = useState([])

  async function fetchTrades() {
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .order('trade_date', { ascending: true })

    if (!error) {
      setTrades(data)
    }
  }

  useEffect(() => {
    fetchTrades()
  }, [])

  return trades
}