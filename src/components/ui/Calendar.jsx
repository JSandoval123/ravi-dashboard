import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react'

export default function TradingCalendar({ trades }) {

  const today = new Date()

  const [selectedDate, setSelectedDate] = useState(today)
  const [activeDate, setActiveDate] = useState(today)

  function getDayPnL(date) {

    const day = date.toISOString().split('T')[0]

    const dayTrades = trades.filter(
      t => t.trade_date === day
    )

    return dayTrades.reduce(
      (acc, t) => acc + Number(t.pnl || 0),
      0
    )
  }

  return (

    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">

      <h2 className="text-2xl font-bold mb-6">
        Trading Calendar
      </h2>

      <div className="calendar-dark">

        <Calendar

          value={selectedDate}

          activeStartDate={activeDate}

          onChange={(value) => {
            setSelectedDate(value)
          }}

          onActiveStartDateChange={({ activeStartDate }) => {
            setActiveDate(activeStartDate)
          }}

          locale="es-ES"

          calendarType="iso8601"

          showNeighboringMonth={true}

          prev2Label={null}

          next2Label={null}

          prevLabel="‹"

          nextLabel="›"

          tileContent={({ date }) => {

            const day = date.toISOString().split('T')[0]

            const dayTrades = trades.filter(
              t => t.trade_date === day
            )

            const pnl = dayTrades.reduce(
              (acc, t) => acc + Number(t.pnl || 0),
              0
            )

            const tradeCount = dayTrades.length

            if (pnl === 0) return null

            return (

              <div className="mt-2">

                <div
                  className={`text-xs font-bold ${
                    pnl > 0
                      ? 'text-emerald-400'
                      : 'text-red-400'
                  }`}
                >
                  {pnl > 0 ? '+' : ''}
                  {pnl.toFixed(2)}
                </div>

                <div className="text-[10px] text-zinc-400 mt-1">
                  {tradeCount} trade
                  {tradeCount > 1 ? 's' : ''}
                </div>

              </div>
            )
          }}

          tileClassName={({ date }) => {

            const pnl = getDayPnL(date)

            if (pnl > 0)
              return 'calendar-profit'

            if (pnl < 0)
              return 'calendar-loss'

            return ''
          }}
        />

      </div>

    </div>
  )
}