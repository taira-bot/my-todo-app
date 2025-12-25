// 事業者データ
export const BUSINESSES = [
  {
    id: "1",
    category: "コンサル",
    name: "Quality of Life株式会社",
    description: "１日２時間を生み出す時間戦略",
  },
  {
    id: "2",
    category: "保険業",
    name: "大同生命保険株式会社",
    description: "経営リスクマネージメントの専門家",
  },
  {
    id: "3",
    category: "保険業",
    name: "REAL LIFE株式会社",
    description: "子供の未来・資金プランナー",
  },
  {
    id: "4",
    category: "車点検整備",
    name: "有限会社カードック糸満",
    description: "紹介の多い車の点検整備場",
  },
  {
    id: "5",
    category: "美容",
    name: "Birds",
    description: "琉球統計気学とプロのヘアメイクの開運眉専門店",
  },
  {
    id: "6",
    category: "新車リース",
    name: "株式会社上原自動車",
    description: "新車リース専門店",
  },
  {
    id: "7",
    category: "レンタカー",
    name: "ホワイトワンネット株式会社",
    description: "配車・回収回収対応！便利なレンタカー屋さん",
  },
  {
    id: "8",
    category: "外構工事",
    name: "有限会社 丸正開発",
    description: "外構（駐車場）工事の専門家",
  },
] as const;

// カテゴリ名で事業者を取得
export function getBusinessesByCategory(categoryName: string) {
  return BUSINESSES.filter((b) => b.category === categoryName);
}

// IDで事業者を取得
export function getBusinessById(id: string) {
  return BUSINESSES.find((b) => b.id === id);
}
