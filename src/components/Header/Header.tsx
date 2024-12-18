import Link from 'next/link';

export default function Header() {
    return (
        <div className="text-center fixed w-screen p-4">
            <Link href="/">
                <h1 className="text-2xl font-bold">
                    MovieDB
                </h1>
            </Link>

        </div>
    );
}
