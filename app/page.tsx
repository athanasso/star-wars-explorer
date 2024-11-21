import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Star Wars Explorer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['people', 'planets', 'starships'].map((category) => (
          <Link
            key={category}
            href={`/search?type=${category}`}
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg transition"
          >
            <h2 className="text-2xl capitalize">{category}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}