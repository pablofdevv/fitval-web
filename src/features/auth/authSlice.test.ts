import { describe, expect, it } from "vitest";
import authReducer, { loggedIn, loggedOut } from "./authSlice";

const lucia = { id: "2", email: "lucia@gym.com", role: "member" as const };

describe("authSlice", () => {
  it("al entrar, guarda el token y el usuario", () => {
    const state = authReducer({ token: null, user: null }, loggedIn({ token: "abc", user: lucia }));

    expect(state.token).toBe("abc");
    expect(state.user).toEqual(lucia);
  });

  it("al salir, borra el token y el usuario", () => {
    const state = authReducer({ token: "abc", user: lucia }, loggedOut());

    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });
});
