/* eslint-disable @typescript-eslint/no-unused-expressions */
"use server"

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string, options: Partial<ResponseCookie>) => {
    const cookieStore = await cookies();
    cookieStore.set(key, value, options);

}

export const getCookie = async (key: string) => {
    const cookieStore = await cookies();
    // To fix this error proxy.ts getcookie
    // An expression of type 'void' cannot be tested for truthiness.ts(1345)
    // 
    return cookieStore.get(key)?.value || null;
}

export const deleteCookie = async (key: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(key)

}