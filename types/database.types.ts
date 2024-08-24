export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cashAvailable: {
        Row: {
          amount: number
          id: string
        }
        Insert: {
          amount?: number
          id: string
        }
        Update: {
          amount?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cashAvailable_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "movementsOfTheDay"
            referencedColumns: ["id"]
          },
        ]
      }
      cashWithdrawals: {
        Row: {
          amount: number
          created_at: string | null
          day: string | null
          description: string | null
          id: string
          userId: string | null
        }
        Insert: {
          amount?: number
          created_at?: string | null
          day?: string | null
          description?: string | null
          id?: string
          userId?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          day?: string | null
          description?: string | null
          id?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cashWithdrawals_day_fkey"
            columns: ["day"]
            isOneToOne: false
            referencedRelation: "movementsOfTheDay"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cashWithdrawals_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      movementsOfTheDay: {
        Row: {
          cashChange: number
          date: string
          id: string
        }
        Insert: {
          cashChange?: number
          date: string
          id?: string
        }
        Update: {
          cashChange?: number
          date?: string
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          role: string
          username: string
        }
        Insert: {
          id: string
          role?: string
          username: string
        }
        Update: {
          id?: string
          role?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          amount: number
          created_at: string
          day: string | null
          description: string
          id: string
          typeOfPayment: string
          userId: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          day?: string | null
          description?: string
          id?: string
          typeOfPayment?: string
          userId?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          day?: string | null
          description?: string
          id?: string
          typeOfPayment?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchases_day_fkey"
            columns: ["day"]
            isOneToOne: false
            referencedRelation: "movementsOfTheDay"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quickDescription: {
        Row: {
          description: string
          id: string          
        }
        Insert: {
          description: string
          id?: string
        }
        Update: {
          description?: string
          id?: string
        }
        Relationships: []
      }
      sales: {
        Row: {
          amount: number | null
          created_at: string | null
          day: string | null
          id: string
          isCombo: boolean | null
          typeOfPayment: string | null
          userId: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          day?: string | null
          id?: string
          isCombo?: boolean | null
          typeOfPayment?: string | null
          userId?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          day?: string | null
          id?: string
          isCombo?: boolean | null
          typeOfPayment?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_day_fkey"
            columns: ["day"]
            isOneToOne: false
            referencedRelation: "movementsOfTheDay"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      deleteUser: {
        Args: {
          userid: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
