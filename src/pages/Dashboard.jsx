import MonthlyChart from '../components/ui/MonthlyChart'
import useTrades from '../hooks/useTrades'
import Card from '../components/ui/Card'
import Chart from '../components/ui/Chart'
import TradingCalendar from '../components/ui/Calendar'
import RecentTrades from '../components/ui/RecentTrades'
import AppLayout from '../components/layout/AppLayout'

export default function Dashboard() {
  const trades = useTrades()
  return (
    <AppLayout>
  <h1 className="text-5xl font-bold">
        Dashboard
      </h1>

      <p className="text-zinc-400 mt-2">
        Trading Performance Analytics
      </p>

      {/* KPI CARDS */}

      <div className="grid grid-cols-4 gap-4 mt-10">

        <Card
          title="Net PnL"
          value={`$${trades
            .reduce((acc, t) => acc + Number(t.pnl || 0), 0)
            .toFixed(2)}`}
          color="text-emerald-400"
        />

        <Card
          title="Win Rate"
          value={`${(
            (trades.filter(t => Number(t.pnl) > 0).length /
            (trades.length || 1)) * 100
          ).toFixed(0)}%`}
        />

        <Card
          title="Profit Factor"
          value={(() => {

            const gains = trades
              .filter(t => Number(t.pnl) > 0)
              .reduce((acc, t) => acc + Number(t.pnl), 0)

            const losses = Math.abs(
              trades
                .filter(t => Number(t.pnl) < 0)
                .reduce((acc, t) => acc + Number(t.pnl), 0)
            )

            return losses === 0
              ? gains.toFixed(2)
              : (gains / losses).toFixed(2)

          })()}
        />

        <Card
          title="Avg RR"
          value={`1:${(
            trades.reduce((acc, t) => acc + Number(t.rr || 0), 0) /
            (trades.length || 1)
          ).toFixed(2)}`}
        />

      </div>

      {/* CHART */}

      <div className="mt-8">
        <Chart trades={trades} />
      </div>

      {/* CALENDAR */}

      <div className="mt-8">
        <TradingCalendar trades={trades} />
      </div>
            <div className="mt-8">
          <RecentTrades trades={trades} />
          </div>
            

          </AppLayout>
)
}