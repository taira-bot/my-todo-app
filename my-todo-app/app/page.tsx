import Link from "next/link";
import { INITIAL_CATEGORIES } from "@/constants/categories";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-blue-500 text-white py-6 px-4 shadow-md">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center">お悩み解決</h1>
          <p className="text-center text-blue-100 mt-1 text-sm">
            信頼できる専門家を紹介します
          </p>
        </div>
      </header>

      {/* カテゴリ一覧 */}
      <section className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          カテゴリから探す
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {INITIAL_CATEGORIES.map((category, index) => (
            <Link
              key={index}
              href={`/category/${encodeURIComponent(category.name)}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-blue-300 transition-all active:scale-95"
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* フッター */}
      <footer className="mt-8 py-6 text-center text-gray-500 text-xs">
        <p>&copy; 2025 お悩み解決</p>
      </footer>
    </main>
  );
}
