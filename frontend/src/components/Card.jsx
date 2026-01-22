export default function Card({ app }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <h2 className="font-semibold">{app.company}</h2>
      <p className="text-sm text-gray-600">{app.role}</p>

      <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 rounded">
        {app.status}
      </span>
    </div>
  );
}
