export default function StatsPanel({ trades }) {

  const pnlToday = trades
    .filter(t =>
      t.trade_date === new Date().toISOString().split('T')[0]
    )
    .reduce((acc, t) => acc + Number(t.pnl || 0), 0)

  const totalTrades = trades.length

  const avgWin = trades
    .filter(t => Number(t.pnl) > 0)
    .reduce((acc, t) => acc + Number(t.pnl), 0)
    /
    (
      trades.filter(t => Number(t.pnl) > 0).length || 1
    )

  const avgLoss = trades
    .filter(t => Number(t.pnl) < 0)
    .reduce((acc, t) => acc + Number(t.pnl), 0)
    /
    (
      trades.filter(t => Number(t.pnl) < 0).length || 1
    )

  let currentStreak = 0
  let maxWinStreak = 0
  let maxLossStreak = 0

  let winStreak = 0
  let lossStreak = 0

  trades.forEach((trade) => {

    if (Number(trade.pnl) > 0) {

      winStreak++
      lossStreak = 0

      if (winStreak > maxWinStreak) {
        maxWinStreak = winStreak
      }

    } else {

      lossStreak++
      winStreak = 0

      if (lossStreak > maxLossStreak) {
        maxLossStreak = lossStreak
      }
    }
  })

  if (trades.length > 0) {

    const lastTrade =
      trades[trades.length - 1]

    if (Number(lastTrade.pnl) > 0) {

      currentStreak =
        `${winStreak}W`

    } else {

      currentStreak =
        `${lossStreak}L`
    }
  }

  const assetStats = {}

  trades.forEach((trade) => {

    const asset = trade.asset

    if (!assetStats[asset]) {

      assetStats[asset] = {
        pnl: 0,
        wins: 0,
        total: 0,
      }
    }

    assetStats[asset].pnl +=
      Number(trade.pnl || 0)

    assetStats[asset].total += 1

    if (Number(trade.pnl) > 0) {
      assetStats[asset].wins += 1
    }

  })

  return (

    <div className="w-[260px] bg-zinc-900 border-l border-zinc-800 min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-8">
        Performance
      </h2>

      <div className="space-y-4">

        <div className="bg-zinc-800 rounded-2xl p-5">

          <p className="text-zinc-400 text-sm">
            PnL Today
          </p>

          <h3 className="text-2xl font-bold text-emerald-400 mt-2">
            ${pnlToday.toFixed(2)}
          </h3>

        </div>

        <div className="bg-zinc-800 rounded-2xl p-5">

          <div className="grid grid-cols-2 gap-4">

            <div>

              <p className="text-zinc-400 text-sm">
                Total Trades
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {totalTrades}
              </h3>

              <div className="mt-4 space-y-1 text-sm">

                <p className="text-emerald-400">
                  Wins: {
                    trades.filter(
                      t => Number(t.pnl) > 0
                    ).length
                  }
                </p>

                <p className="text-red-400">
                  Losses: {
                    trades.filter(
                      t => Number(t.pnl) < 0
                    ).length
                  }
                </p>

              </div>

            </div>

            <div className="border-l border-zinc-700 pl-4">

              <p className="text-zinc-400 text-sm">
                Win Rate
              </p>

              <h3 className="text-3xl font-bold mt-2">

                {(
                  (
                    trades.filter(
                      t => Number(t.pnl) > 0
                    ).length
                    /
                    (trades.length || 1)
                  ) * 100
                ).toFixed(0)}%

              </h3>

            </div>

          </div>

        </div>

        <div className="bg-zinc-800 rounded-2xl p-5">

          <p className="text-zinc-400 text-sm">
            Avg Win
          </p>

          <h3 className="text-2xl font-bold text-emerald-400 mt-2">
            ${avgWin.toFixed(2)}
          </h3>

        </div>

        <div className="bg-zinc-800 rounded-2xl p-5">

          <p className="text-zinc-400 text-sm">
            Avg Loss
          </p>

          <h3 className="text-2xl font-bold text-red-400 mt-2">
            ${avgLoss.toFixed(2)}
          </h3>

        </div>

        <div className="bg-zinc-800 rounded-2xl p-5">

          <p className="text-zinc-400 text-sm">
            Current Streak
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {currentStreak}
          </h3>

        </div>

        <div className="bg-zinc-800 rounded-2xl p-5">

          <p className="text-zinc-400 text-sm">
            Max Win Streak
          </p>

          <h3 className="text-2xl font-bold text-emerald-400 mt-2">
            {maxWinStreak}
          </h3>

        </div>

        <div className="bg-zinc-800 rounded-2xl p-5">

          <p className="text-zinc-400 text-sm">
            Max Loss Streak
          </p>

          <h3 className="text-2xl font-bold text-red-400 mt-2">
            {maxLossStreak}
          </h3>

        </div>

        <div className="bg-zinc-800 rounded-2xl p-5">

          <p className="text-zinc-400 text-sm mb-4">
            Asset Performance
          </p>

          <div className="space-y-4">

            {Object.entries(assetStats).map(
              ([asset, stats]) => {

                const wr =
                  (
                    stats.wins /
                    stats.total
                  ) * 100

                return (

                  <div
                    key={asset}
                    className="border-b border-zinc-700 pb-3"
                  >

                    <div className="flex items-center justify-between">

                      <h4 className="font-bold">
                        {asset}
                      </h4>

                      <p
                        className={`font-bold ${
                          stats.pnl >= 0
                            ? 'text-emerald-400'
                            : 'text-red-400'
                        }`}
                      >
                        {stats.pnl >= 0 ? '+' : ''}
                        ${stats.pnl.toFixed(2)}
                      </p>

                    </div>

                    <p className="text-zinc-400 text-sm mt-1">
                      WR: {wr.toFixed(0)}%
                    </p>

                  </div>
                )
              }
            )}

          </div>

        </div>

      </div>

    </div>
  )
}