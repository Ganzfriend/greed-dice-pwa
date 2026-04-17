"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { signIn, signUp } from "@/lib/auth";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const email = () => emailRef.current?.value ?? "";
  const password = () => passwordRef.current?.value ?? "";

  const handleSignIn = async () => {
    await signIn({ email: email(), password: password() });
    router.push("/");
  };

  const handleSignUp = async () => {
    await signUp({ email: email(), password: password() });
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mt-20">
      <input
        ref={emailRef}
        placeholder="Email"
        className="border p-2 rounded"
      />

      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
      />

      <Button onClick={handleSignIn}>Login</Button>

      <Button onClick={handleSignUp}>Create Account</Button>

      <div className="text-center opacity-60">or</div>
    </div>
  );
}

// import { MouseEvent, useRef, useState } from "react";
// import HCaptcha from "@hcaptcha/react-hcaptcha";

// import { signIn, signUp, guestLogin } from "@/lib/auth";
// import { Button } from "@/components/ui";

// enum ActionType {
//   SIGN_IN = "signIn",
//   SIGN_UP = "signUp",
//   GUEST_LOGIN = "guestLogin",
// }

// const AuthActions = {
//   [ActionType.SIGN_IN]: signIn,
//   [ActionType.SIGN_UP]: signUp,
//   [ActionType.GUEST_LOGIN]: guestLogin,
// };

// export default function LoginPage() {
//   const [token, setToken] = useState<string | null>(null);
//   const emailRef = useRef<HTMLInputElement | null>(null);
//   const passwordRef = useRef<HTMLInputElement | null>(null);
//   const captchaRef = useRef<HCaptcha | null>(null);
//   const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";

//   const onLoad = () => {
//     // this reaches out to the hCaptcha JS API and runs the
//     // execute function on it. you can use other functions as
//     // documented here:
//     // https://docs.hcaptcha.com/configuration#jsapi
//     captchaRef.current?.execute();
//   };

//   const handleSubmit = async (
//     e: MouseEvent<HTMLButtonElement>,
//     action: ActionType,
//   ) => {
//     e.preventDefault();
//     const authAction = AuthActions[action];
//     const email = emailRef?.current?.value;
//     const password = passwordRef?.current?.value;

//     if (token && email && password) {
//       console.log(`hCaptcha Token: ${token}`);
//       try {
//         await authAction({ email, password, captchaToken: token });
//       } catch (e) {
//         alert(`Error: ${e}`);
//       }
//       setToken(null);
//       return;
//     }

//     setToken(null);
//     alert("Email, password, and captcha are required");
//   };

//   return (
//     <form>
//       <div className="flex flex-col gap-3 max-w-sm mx-auto mt-20">
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             ref={emailRef}
//             autoComplete="email webauthn"
//             className="border p-2 rounded"
//           />
//         </label>

//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             ref={passwordRef}
//             autoComplete="new-password webauthn"
//             className="border p-2 rounded"
//           />
//         </label>

//         <HCaptcha
//           sitekey={sitekey}
//           onLoad={onLoad}
//           onVerify={(token) => setToken(token)}
//           ref={captchaRef}
//         />

//         <Button
//           onClick={(e) => handleSubmit(e, ActionType.SIGN_IN)}
//           className="btn"
//         >
//           Login
//         </Button>

//         <Button
//           onClick={(e) => handleSubmit(e, ActionType.SIGN_UP)}
//           className="btn"
//         >
//           Create Account
//         </Button>

//         <div className="text-center opacity-60">or</div>

//         <Button
//           onClick={(e) => handleSubmit(e, ActionType.GUEST_LOGIN)}
//           className="btn"
//         >
//           Continue as Guest
//         </Button>
//       </div>
//     </form>
//   );
// }
