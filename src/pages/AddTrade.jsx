import { useState } from 'react'
import { supabase } from '../lib/supabase'
import AppLayout from '../components/layout/AppLayout'

export default function AddTrade() {
  const [form, setForm] = useState({
  asset: '',
  direction: 'BUY',
  trade_date: '',
  entry_price: '',
  exit_price: '',
  stop_loss: '',
  take_profit: '',
  lot_size: '',
  pnl: '',
})

  async function handleSubmit(e) {
  e.preventDefault()

  const risk =
  Math.abs(
    form.entry_price - form.stop_loss
  )

const reward =
  Math.abs(
    form.exit_price - form.entry_price
  )

const rr =
  reward / risk

const { error } = await supabase
  .from('trades')
  .insert([{
    ...form,

    entry_price: Number(form.entry_price),
    exit_price: Number(form.exit_price),

    stop_loss: Number(form.stop_loss),
    take_profit: Number(form.take_profit),

    lot_size: Number(form.lot_size),

    pnl: Number(form.pnl),

    rr: Number(rr.toFixed(2)),
  }])

  if (error) {
    alert(error.message)
  } else {
    alert('Trade agregado correctamente')

    setForm({
      asset: '',
      direction: 'BUY',
      trade_date: '',
      entry_price: '',
      exit_price: '',
      pnl: '',
      rr: '',
    })
  }
}

  return (
      <AppLayout>
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Add Trade
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-3xl"
      >
        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Asset"
            className="bg-zinc-800 p-4 rounded-2xl"
            value={form.asset}
            onChange={(e) =>
              setForm({ ...form, asset: e.target.value })
            }
          />

          <select
            className="bg-zinc-800 p-4 rounded-2xl"
            value={form.direction}
            onChange={(e) =>
              setForm({ ...form, direction: e.target.value })
            }
          >
            <option>BUY</option>
            <option>SELL</option>
          </select>

          <input
            type="date"
            className="bg-zinc-800 p-4 rounded-2xl"
            value={form.trade_date}
            onChange={(e) =>
              setForm({ ...form, trade_date: e.target.value })
            }
          />

          <input
            placeholder="Entry Price"
            className="bg-zinc-800 p-4 rounded-2xl"
            value={form.entry_price}
            onChange={(e) =>
              setForm({ ...form, entry_price: e.target.value })
            }
          />

          <input
            placeholder="Exit Price"
            className="bg-zinc-800 p-4 rounded-2xl"
            value={form.exit_price}
            onChange={(e) =>
              setForm({ ...form, exit_price: e.target.value })
            }
          />

          <input
            placeholder="PnL"
            className="bg-zinc-800 p-4 rounded-2xl"
            value={form.pnl}
            onChange={(e) =>
              setForm({ ...form, pnl: e.target.value })
            }
          />
            <input
            placeholder="Stop Loss"
            className="bg-zinc-800 p-4 rounded-2xl"
            value={form.stop_loss}
            onChange={(e) =>
                setForm({ ...form, stop_loss: e.target.value })
            }
          />

            <input
            placeholder="Take Profit"
            className="bg-zinc-800 p-4 rounded-2xl"
            value={form.take_profit}
            onChange={(e) =>
                setForm({ ...form, take_profit: e.target.value })
            }
            />

            <input
            placeholder="Lot Size"
            className="bg-zinc-800 p-4 rounded-2xl"
            value={form.lot_size}
            onChange={(e) =>
                setForm({ ...form, lot_size: e.target.value })
            }
            />
          

        </div>

        <button
          className="mt-6 bg-emerald-500 text-black px-6 py-4 rounded-2xl font-bold"
        >
          Save Trade
        </button>
      </form>
    </div>
    </AppLayout>        
  )
}