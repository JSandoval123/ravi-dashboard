export default function RecentTrades({ trades }) {

  const sortedTrades = [...trades]
    .reverse()

  return (

    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Recent Trades
        </h2>

        <button className="bg-zinc-800 px-4 py-2 rounded-xl border border-zinc-700 text-sm">
          View All
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-zinc-400 text-sm border-b border-zinc-800">

              <th className="text-left py-4">
                Asset
              </th>

              <th className="text-left py-4">
                Side
              </th>

              <th className="text-left py-4">
                Entry
              </th>

              <th className="text-left py-4">
                Exit
              </th>

              <th className="text-left py-4">
                RR
              </th>

              <th className="text-left py-4">
                PnL
              </th>

              <th className="text-left py-4">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {sortedTrades.map((trade) => (

              <tr
                key={trade.id}
                className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
              >

                <td className="py-4 font-medium">
                  {trade.asset}
                </td>

                <td className="py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      trade.direction === 'BUY'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {trade.direction}
                  </span>

                </td>

                <td className="py-4">
                  {trade.entry_price}
                </td>

                <td className="py-4">
                  {trade.exit_price}
                </td>

                <td className="py-4">
                  1:{Number(trade.rr).toFixed(2)}
                </td>

                <td
                  className={`py-4 font-bold ${
                    Number(trade.pnl) >= 0
                      ? 'text-emerald-400'
                      : 'text-red-400'
                  }`}
                >
                  {Number(trade.pnl) >= 0 ? '+' : ''}
                  ${Number(trade.pnl).toFixed(2)}
                </td>

                <td className="py-4 text-zinc-400">
                  {trade.trade_date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}