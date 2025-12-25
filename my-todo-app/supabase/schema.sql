-- =============================================
-- お悩み解決アプリ データベーススキーマ
-- =============================================

-- 1. プロファイルテーブル（ユーザー拡張情報）
-- auth.usersテーブルと連携し、役割情報を管理
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'business' CHECK (role IN ('admin', 'business')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. カテゴリテーブル
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT '📁',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. 事業者テーブル
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. 問い合わせテーブル
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- インデックス
-- =============================================
CREATE INDEX IF NOT EXISTS idx_businesses_category_id ON businesses(category_id);
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_is_active ON businesses(is_active);
CREATE INDEX IF NOT EXISTS idx_inquiries_business_id ON inquiries(business_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);

-- =============================================
-- Row Level Security (RLS) ポリシー
-- =============================================

-- プロファイルテーブルのRLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 自分のプロファイルは閲覧・更新可能
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- カテゴリテーブルのRLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- カテゴリは誰でも閲覧可能
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- 管理者のみカテゴリを管理可能
CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 事業者テーブルのRLS
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- 公開中の事業者は誰でも閲覧可能
CREATE POLICY "Active businesses are viewable by everyone" ON businesses
  FOR SELECT USING (is_active = true);

-- 管理者は全事業者を閲覧可能
CREATE POLICY "Admins can view all businesses" ON businesses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 事業者は自分の情報を閲覧・更新可能
CREATE POLICY "Business owners can view own business" ON businesses
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Business owners can update own business" ON businesses
  FOR UPDATE USING (user_id = auth.uid());

-- 管理者は事業者を管理可能
CREATE POLICY "Admins can manage businesses" ON businesses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 問い合わせテーブルのRLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 誰でも問い合わせを作成可能
CREATE POLICY "Anyone can create inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 事業者は自分宛ての問い合わせを閲覧可能
CREATE POLICY "Business owners can view own inquiries" ON inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = inquiries.business_id
        AND businesses.user_id = auth.uid()
    )
  );

-- 管理者は全問い合わせを閲覧可能
CREATE POLICY "Admins can view all inquiries" ON inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- =============================================
-- トリガー: プロファイル自動作成
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'business');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 既存のトリガーがあれば削除
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 新規ユーザー作成時にプロファイルを自動作成
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- 初期データ: カテゴリ
-- =============================================
INSERT INTO categories (name, icon, sort_order) VALUES
  ('コンサル', '💼', 1),
  ('経営マネジメント', '📊', 2),
  ('資金プラン', '💰', 3),
  ('車点検整備', '🚗', 4),
  ('レンタカー', '🚙', 5),
  ('外構工事', '🏗️', 6),
  ('外壁塗装・防水工事', '🎨', 7),
  ('保険業', '🛡️', 8),
  ('清掃', '🧹', 9),
  ('不動産', '🏠', 10),
  ('Tシャツ販売', '👕', 11),
  ('ウェブサイト制作', '💻', 12)
ON CONFLICT (name) DO NOTHING;
