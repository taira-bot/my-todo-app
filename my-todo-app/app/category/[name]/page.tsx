import Link from "next/link";
import { INITIAL_CATEGORIES } from "@/constants/categories";
import { getBusinessesByCategory } from "@/constants/businesses";
import { ChevronLeft } from "lucide-react";

interface Props {
  params: Promise<{ name: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  const category = INITIAL_CATEGORIES.find((c) => c.name === categoryName);

  if (!category) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">カテゴリが見つかりません</p>
          <Link href="/" className="text-blue-500 underline mt-4 block">
            トップに戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-blue-500 text-white py-4 px-4 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="p-1 hover:bg-blue-600 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </h1>
          </div>
        </div>
      </header>

      {/* 事業者一覧 */}
      <section className="max-w-2xl mx-auto px-4 py-6">
        {(() => {
          const businesses = getBusinessesByCategory(categoryName);
          if (businesses.length === 0) {
            return (
              <div className="text-center py-12">
                <p className="text-gray-500">このカテゴリにはまだ事業者が登録されていません</p>
              </div>
            );
          }
          return (
            <>
              <h2 className="text-sm text-gray-500 mb-4">
                {businesses.length}件の事業者が見つかりました
              </h2>
              <div className="space-y-3">
                {businesses.map((business) => (
                  <Link
                    key={business.id}
                    href={`/business/${business.id}`}
                    className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all"
                  >
                    <h3 className="font-bold text-gray-800">{business.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {business.description}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          );
        })()}
      </section>
    </main>
  );
}
