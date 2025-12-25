// Supabase データベース型定義

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'business';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'admin' | 'business';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'admin' | 'business';
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          icon?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string;
          sort_order?: number;
          created_at?: string;
        };
      };
      businesses: {
        Row: {
          id: string;
          category_id: string;
          user_id: string | null;
          name: string;
          description: string;
          email: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          user_id?: string | null;
          name: string;
          description?: string;
          email: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          user_id?: string | null;
          name?: string;
          description?: string;
          email?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          business_id: string;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          message: string;
          status: 'new' | 'read' | 'replied';
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          customer_name: string;
          customer_phone: string;
          customer_email?: string | null;
          message: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string | null;
          message?: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
        };
      };
    };
  };
}

// 便利な型エイリアス
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Business = Database['public']['Tables']['businesses']['Row'];
export type Inquiry = Database['public']['Tables']['inquiries']['Row'];

// リレーション付きの型
export type BusinessWithCategory = Business & {
  category: Category;
};

export type InquiryWithBusiness = Inquiry & {
  business: BusinessWithCategory;
};
