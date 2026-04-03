import { SubmitEventHandler, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import { signUp } from "@/lib/auth";

export default function Form() {
  const [token, setToken] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const captchaRef = useRef<HCaptcha | null>(null);
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current?.execute();
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (token && email && password) {
      console.log(`hCaptcha Token: ${token}`);

      await signUp({ email, password, captchaToken: token });
    }
    setToken(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" ref={emailRef} />
      </label>
      <label>
        Password:
        <input type="password" name="password" ref={passwordRef} />
      </label>
      <HCaptcha
        sitekey={sitekey}
        onLoad={onLoad}
        onVerify={(token) => setToken(token)}
        ref={captchaRef}
      />
    </form>
  );
}
