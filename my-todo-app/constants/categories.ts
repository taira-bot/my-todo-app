// 初期カテゴリ一覧
export const INITIAL_CATEGORIES = [
  { name: 'コンサル', icon: '💼' },
  { name: '車点検整備', icon: '🚗' },
  { name: 'レンタカー', icon: '🚙' },
  { name: '外構工事', icon: '🏗️' },
  { name: '外壁塗装・防水工事', icon: '🎨' },
  { name: '保険業', icon: '🛡️' },
  { name: '清掃', icon: '🧹' },
  { name: '不動産', icon: '🏠' },
  { name: 'Tシャツ販売', icon: '👕' },
  { name: '企画制作（ウェブサイトなど）', icon: '💻' },
  { name: '光熱費の削減', icon: '💡' },
  { name: '食品', icon: '🍽️' },
  { name: '安全', icon: '🔒' },
  { name: '住宅建築', icon: '🏡' },
  { name: '販売業', icon: '🎰' },
  { name: 'スポーツ関連', icon: '⚽' },
  { name: '司法書士', icon: '📝' },
  { name: '体質改善', icon: '🏃' },
  { name: '美容', icon: '💄' },
  { name: '新車リース', icon: '🚘' },
  { name: '運輸', icon: '🚚' },
] as const;

export type CategoryName = typeof INITIAL_CATEGORIES[number]['name'];
