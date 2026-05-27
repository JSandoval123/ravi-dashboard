import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function Chart({ trades }) {

  let cumulative = 0

  const data = trades.map((trade, index) => {

    cumulative += Number(trade.pnl || 0)

    return {
      trade: `T${index + 1}`,
      pnl: Number(cumulative.toFixed(2)),
    }
  })

  return (

    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 h-[400px]">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Equity Curve
        </h2>

      </div>

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <XAxis
            dataKey="trade"
            stroke="#71717a"
          />

          <YAxis
            stroke="#71717a"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '12px',
              color: 'white',
            }}

            labelStyle={{
              color: '#a1a1aa',
            }}

            itemStyle={{
              color: '#22c55e',
            }}

            formatter={(value) => [
              `$${Number(value).toFixed(2)}`,
              'Equity'
            ]}
          />

          <Line
            type="monotone"
            dataKey="pnl"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{
              fill: '#22c55e',
              r: 4,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}