import { createClient } from "./server";
import type { Category, BusinessWithCategory } from "@/types/database";

// カテゴリ一覧を取得
export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
}

// カテゴリをIDで取得
export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data;
}

// カテゴリを名前で取得
export async function getCategoryByName(name: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("name", name)
    .single();

  if (error) {
    console.error("Error fetching category by name:", error);
    return null;
  }

  return data;
}

// カテゴリに属する事業者一覧を取得
export async function getBusinessesByCategory(
  categoryId: string
): Promise<BusinessWithCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching businesses:", error);
    return [];
  }

  return (data as BusinessWithCategory[]) || [];
}

// 事業者詳細を取得
export async function getBusinessById(
  id: string
): Promise<BusinessWithCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching business:", error);
    return null;
  }

  return data as BusinessWithCategory;
}

// 問い合わせを作成
export async function createInquiry(inquiry: {
  business_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const insertData = {
    business_id: inquiry.business_id,
    customer_name: inquiry.customer_name,
    customer_phone: inquiry.customer_phone,
    customer_email: inquiry.customer_email || null,
    message: inquiry.message,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("inquiries") as any).insert(insertData);

  if (error) {
    console.error("Error creating inquiry:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
