import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export default function MonthlyChart({ trades, compact }) {

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const monthlyPnL = Array(12).fill(0)

  trades.forEach((trade) => {

    const month =
      new Date(trade.trade_date).getMonth()

    monthlyPnL[month] += Number(trade.pnl || 0)

  })

  const data = months.map((month, index) => ({
    month,
    pnl: Number(monthlyPnL[index].toFixed(2)),
  }))

  return (

    <div
      className={`bg-zinc-900 rounded-3xl border border-zinc-800 p-4 ${
        compact ? 'h-[180px]' : 'h-[180px]'
      }`}
    >

      {!compact && (
        <h2 className="text-2xl font-bold mb-6">
          Monthly Performance
        </h2>
      )}

      <ResponsiveContainer width="100%" height="100%">

        <BarChart
         data={data}
         barCategoryGap="70%"
         >

          <XAxis
            dataKey="month"
            stroke="#71717a"
            tick={{ fontSize: compact ? 10 : 12 }}
          />

          {!compact && (
            <YAxis
             stroke="#71717a" 
             domain={[0, 'dataMax + 20']}
             />
          )}

          <Tooltip
  cursor={{ fill: 'transparent' }}
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
    'PnL'
  ]}
/>

          <Bar
            dataKey="pnl"
            radius={[4, 4, 0, 0]}
            barSize={20}
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  entry.pnl >= 0
                    ? '#22c55e'
                    : '#ef4444'
                }
              />

            ))}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}