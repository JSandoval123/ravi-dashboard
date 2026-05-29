import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import AppLayout from '../components/layout/AppLayout'
import MonthlyChart from '../components/ui/MonthlyChart'

export default function Analytics() {

  const [trades, setTrades] = useState([])

  useEffect(() => {
    fetchTrades()
  }, [])

  async function fetchTrades() {

    const { data } = await supabase
      .from('trades')
      .select('*')
      .order('trade_date', { ascending: false })

    setTrades(data || [])
  }

  const grouped = {}

  trades.forEach(trade => {

    const date = new Date(trade.trade_date)

    const month = date.toLocaleString('default', {
      month: 'long',
      year: 'numeric'
    })

    if (!grouped[month]) {
      grouped[month] = []
    }

    grouped[month].push(trade)
  })

  return (
     <AppLayout>
  <div>

    <h1 className="text-5xl font-bold">
      Analytics
    </h1>
    <p className="text-zinc-400 mt-2 mb-8">
        Monthly trading analytics
      </p>
    <div className="mb-8 w-full max-w-[1000px]">
  <MonthlyChart trades={trades} />
    </div>
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-x-auto">

      <table className="w-full">

        <thead className="bg-zinc-800">

          <tr className="text-left">

            <th className="px-4 py-3 text-sm font-semibold">Month</th>
            <th className="px-4 py-3 text-sm font-semibold">Net PnL</th>
            <th className="px-4 py-3 text-sm font-semibold">Trades</th>
            <th className="px-4 py-3 text-sm font-semibold">WR</th>
            <th className="px-4 py-3 text-sm font-semibold">PF</th>
            <th className="px-4 py-3 text-sm font-semibold">Avg RR</th>
            <th className="px-4 py-3 text-sm font-semibold">Buys</th>
            <th className="px-4 py-3 text-sm font-semibold">Sells</th>
            <th className="px-4 py-3 text-sm font-semibold">Best Asset</th>

          </tr>

        </thead>

        <tbody>

          {Object.entries(grouped).map(([month, monthTrades]) => {

            const pnl = monthTrades.reduce(
              (acc, t) => acc + Number(t.pnl || 0),
              0
            )

            const wins = monthTrades.filter(
              t => Number(t.pnl) > 0
            )

            const losses = monthTrades.filter(
              t => Number(t.pnl) < 0
            )

            const grossProfit = wins.reduce(
              (acc, t) => acc + Number(t.pnl),
              0
            )

            const grossLoss = Math.abs(
              losses.reduce(
                (acc, t) => acc + Number(t.pnl),
                0
              )
            )

            const pf =
              grossLoss > 0
                ? grossProfit / grossLoss
                : grossProfit

            const winrate =
              monthTrades.length > 0
                ? (wins.length / monthTrades.length) * 100
                : 0

            const avgRR =
              monthTrades.length > 0
                ? monthTrades.reduce(
                    (acc, t) => acc + Number(t.rr || 0),
                    0
                  ) / monthTrades.length
                : 0

            const buys = monthTrades.filter(
              t => t.direction === 'BUY'
            ).length

            const sells = monthTrades.filter(
              t => t.direction === 'SELL'
            ).length

            const assets = {}

            monthTrades.forEach(t => {

              if (!assets[t.asset]) {
                assets[t.asset] = 0
              }

              assets[t.asset] += Number(t.pnl || 0)
            })

            const bestAsset =
              Object.entries(assets).sort(
                (a, b) => b[1] - a[1]
              )[0]?.[0] || '-'

            return (

              <tr
                key={month}
                className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
              >

                <td className="px-4 py-3 text-sm capitalize font-semibold">
                  {month}
                </td>

                <td
                  className={`px-4 py-3 text-sm font-bold ${
                    pnl >= 0
                      ? 'text-emerald-400'
                      : 'text-red-400'
                  }`}
                >
                  {pnl >= 0 ? '+' : ''}
                  ${pnl.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-sm">
                  {monthTrades.length}
                </td>

                <td className="px-4 py-3 text-sm">
                  {winrate.toFixed(0)}%
                </td>

                <td className="px-4 py-3 text-sm">
                  {pf.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-sm">
                  {avgRR.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-sm">
                  {buys}
                </td>

                <td className="px-4 py-3 text-sm">
                  {sells}
                </td>

                <td className="px-4 py-3 text-sm">
                  {bestAsset}
                </td>

              </tr>
            )
          })}

        </tbody>

      </table>

    </div>

  </div>
  </AppLayout> 
)
}