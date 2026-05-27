import MonthlyChart from '../ui/MonthlyChart'

export default function Sidebar({ trades }) {

  const items = [
    'Dashboard',
    'Add Trade',
    'Trades',
    'Calendar',
    'Analytics',
    'Journal',
    'Settings',
  ]

  return (
    <div className="w-[260px] bg-zinc-900 border-r border-zinc-800 min-h-screen p-6">

      <h1 className="text-2xl font-bold text-white mb-10">
        Ravi Dashboard
      </h1>

      <div className="space-y-2">

        {items.map((item) => (

          <button
            key={item}
            className="w-full text-left px-4 py-3 rounded-2xl text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
          >
            {item}
          </button>

        ))}

      </div>
        <div className="mt-10">

  <div className="bg-zinc-800 rounded-3xl p-4 border border-zinc-700">

    <h3 className="text-sm font-bold mb-4 text-zinc-300">
      Monthly Performance
    </h3>

    <div className="h-[180px]">
      <MonthlyChart
        trades={trades}
        compact
      />
    </div>

  </div>

</div>
    </div>
    
  )
}