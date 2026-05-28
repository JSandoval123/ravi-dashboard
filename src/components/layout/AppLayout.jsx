import Sidebar from './Sidebar'
import StatsPanel from './StatsPanel'
import useTrades from '../../hooks/useTrades'

export default function AppLayout({ children }) {

  const trades = useTrades()

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar trades={trades} />

      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>

      <StatsPanel trades={trades} />

    </div>
  )
}