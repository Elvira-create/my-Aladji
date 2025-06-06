export type Role = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string | null;
  role_id: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Territory = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Account = {
  id: string;
  user_id: string;
  account_number: string;
  balance: number;
  account_type: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  account_id: string;
  clerk_id: string | null;
  cashier_id: string | null;
  type: string;
  amount: number;
  status: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
};

export type ClerkTerritory = {
  id: string;
  clerk_id: string;
  territory_id: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type CashierDesk = {
  id: string;
  cashier_id: string;
  desk_number: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};


export type Database = {
  public: {
    Tables: {
      roles: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone_number: string | null;
          role_id: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          phone_number?: string | null;
          role_id: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone_number?: string | null;
          role_id?: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      territories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      accounts: {
        Row: {
          id: string;
          user_id: string;
          account_number: string;
          balance: number;
          account_type: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          account_number: string;
          balance?: number;
          account_type: string;
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          account_number?: string;
          balance?: number;
          account_type?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      transactions: {
        Row: {
          id: string;
          account_id: string;
          clerk_id: string | null;
          cashier_id: string | null;
          type: string;
          amount: number;
          status: string;
          payment_method: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          account_id: string;
          clerk_id?: string | null;
          cashier_id?: string | null;
          type: string;
          amount: number;
          status: string;
          payment_method: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          account_id?: string;
          clerk_id?: string | null;
          cashier_id?: string | null;
          type?: string;
          amount?: number;
          status?: string;
          payment_method?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          read?: boolean;
          created_at?: string;
        };
      };

      clerk_territories: {
        Row: {
          id: string;
          clerk_id: string;
          territory_id: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          territory_id: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          territory_id?: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      cashier_desks: {
        Row: {
          id: string;
          cashier_id: string;
          desk_number: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          cashier_id: string;
          desk_number: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          cashier_id?: string;
          desk_number?: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };

    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
