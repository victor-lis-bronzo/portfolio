import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Rotas que podem ser acessadas por qualquer pessoa, sem necessidade de autenticação.
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * Rotas utilizadas para autenticação (login e registro).
 * Usuários já logados serão redirecionados para a página inicial.
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login"];

/**
 * Rotas que exigem que o usuário seja um administrador.
 * @type {string[]}
 */
export const adminRoutes: string[] = ["/cms"];

/**
 * Rotas que exigem que o usuário esteja autenticado (independente da role).
 * @type {string[]}
 */
export const protectedRoutes: string[] = ["/profile"];

/**
 * O prefixo para as rotas de autenticação da API.
 * Rotas que começam com este prefixo são usadas para fins de autenticação da API.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * O caminho de redirecionamento padrão após o login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const isLoggedIn = !!session;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    // @ts-ignore
    if (session.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (isProtectedRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    return null;
  }

  return null;
}