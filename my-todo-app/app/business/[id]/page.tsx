import Link from "next/link";
import { BackButton } from "@/components/back-button";
import { getBusinessById } from "@/constants/businesses";
import { INITIAL_CATEGORIES } from "@/constants/categories";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BusinessDetailPage({ params }: Props) {
  const { id } = await params;
  const business = getBusinessById(id);

  if (!business) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">事業者が見つかりません</p>
          <Link href="/" className="text-blue-500 underline mt-4 block">
            トップに戻る
          </Link>
        </div>
      </main>
    );
  }

  const category = INITIAL_CATEGORIES.find((c) => c.name === business.category);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-blue-500 text-white py-4 px-4 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <BackButton />
          <h1 className="text-xl font-bold">事業者詳細</h1>
        </div>
      </header>

      {/* 事業者情報 */}
      <section className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* カテゴリバッジ */}
          {category && (
            <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mb-3">
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </div>
          )}

          {/* 事業者名 */}
          <h2 className="text-xl font-bold text-gray-800">{business.name}</h2>

          {/* 説明 */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              サービス内容
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {business.description}
            </p>
          </div>
        </div>

        {/* 問い合わせボタン */}
        <div className="mt-6">
          <Link
            href={`/inquiry/${id}`}
            className="block w-full bg-blue-500 text-white text-center font-bold py-4 rounded-lg shadow-md hover:bg-blue-600 active:scale-98 transition-all"
          >
            この事業者に問い合わせる
          </Link>
        </div>
      </section>
    </main>
  );
}
