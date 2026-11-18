import type { AuthUser } from "@/stores/authStore";

//Shown on the login page too, so the hint can never disagree with what works.
export const DEMO_EMAIL = "demo@devflow.dev";
export const DEMO_PASSWORD = "devflow123";

const delay = (ms:number) => new Promise<void>((resolve) => setTimeout(resolve,ms));

/**
 * MOCK API. Every page talks to auth only through these two functions, so when a
 * real backend exists only this file changes. The delay is deliberate: it lets the
 * loading state be seen and tested, as a real network call would.
 *
 * Resolves to null for bad credentials (an expected outcome the UI handles)
 * rather than throwing (reserved for unexpected failures like a network error).
 */

export async function mockLogin(email:string, password:string):Promise<AuthUser | null>{
    await delay(1100);
    if(email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD){
        return{id:"demo", name: "Bennie Bii", email:DEMO_EMAIL};
    }
    return null;
}


/** MOCK: accounts are not stored anywhere, so only the demo login works after logging out. */
export async function mockRegister(name:string, email:string): Promise<AuthUser>{
    await delay(1300);
    return { id:email.toLowerCase(),name,email}
}