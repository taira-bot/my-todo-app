// カテゴリ
export interface Category {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

// 事業者
export interface Business {
  id: string;
  category_id: string;
  user_id: string | null;
  name: string;
  description: string;
  email: string;
  is_active: boolean;
  created_at: string;
  // リレーション
  category?: Category;
}

// 問い合わせ
export interface Inquiry {
  id: string;
  business_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
  // リレーション
  business?: Business;
}

// ユーザー（認証用）
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'business';
  created_at: string;
}
