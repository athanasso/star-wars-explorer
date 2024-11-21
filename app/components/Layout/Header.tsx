import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-gray-900 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Star Wars Explorer
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="hover:text-yellow-500">Home</Link></li>
                        <li><Link href="/search" className="hover:text-yellow-500">Search</Link></li>
                        <li><Link href="/favorites" className="hover:text-yellow-500">Favorites</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}