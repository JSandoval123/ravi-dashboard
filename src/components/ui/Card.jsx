export default function Card({ title, value, color }) {
  return (
    <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800">
      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  )
}