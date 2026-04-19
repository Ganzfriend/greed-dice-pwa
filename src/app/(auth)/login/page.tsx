"use client";

import { MouseEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import { Button } from "@/components/ui";
import { signIn, signUp } from "@/lib/auth";

export default function LoginPage() {
  const [token, setToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha | null>(null);
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current?.execute();
  };

  const getEmail = () => emailRef.current?.value ?? "";
  const getPassword = () => passwordRef.current?.value ?? "";

  const handleSignIn = async () => {
    await signIn({ email: getEmail(), password: getPassword() });
    router.push("/");
  };

  const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = getEmail();
    const password = getPassword();

    if (token && email && password) {
      console.log(`hCaptcha Token: ${token}`);
      try {
        await signUp({
          email,
          password,
          captchaToken: token,
        });
      } catch (e) {
        alert(`Error: ${e}`);
      }
      setToken(null);
      return;
    }

    setToken(null);
    alert("Email, password, and captcha are required");

    router.push("/");
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mt-20">
      <label>Email: </label>
      <input
        ref={emailRef}
        placeholder="Email"
        className="border p-2 rounded"
      />

      <label htmlFor="password">Password: </label>
      <input
        ref={passwordRef}
        id="password"
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        autoComplete="new-password webauthn"
      />

      <Button onClick={handleSignIn}>Login</Button>

      <div className="text-center opacity-60">or</div>

      <Button
        onClick={handleSignUp}
        // disabled={!captchaRef || !getEmail() || !getPassword()}
        className="border border-4 border-black p-4 disabled:bg-gray-50 disabled:border-gray-500"
      >
        Create Account
      </Button>

      <HCaptcha
        sitekey={sitekey}
        onLoad={onLoad}
        onVerify={(token) => setToken(token)}
        ref={captchaRef}
      />
    </div>
  );
}
