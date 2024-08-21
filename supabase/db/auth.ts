import { supabase } from "..";

interface IDataLogin {
  username: string;
  password: string;
}

interface IDataRegister extends IDataLogin {
  role: string;
}

export const login = ({ username, password }: IDataLogin) =>
  supabase.auth
    .signInWithPassword({ email: `${username}@${username}`, password })
    .then(async ({ data: { session, user } }) => {
      const { profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single()
        .then(({ data, error }) => ({ error, profile: data }));
      return { session, profile, error };
    });

export const register = async ({ username, password, role }: IDataRegister) => {
  const { error } = await supabase.auth.signUp({
    email: `${username}@${username}`,
    password,
    options: { data: { role, username } },
  });

  return { error };
};
