import { Provider } from "next-auth/providers";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function Login({ providers }: { providers: Provider }) {
  return (
    <div className="flex flex-col items-center space-y-12 pt-48">
      <Image alt="Image " src="twitter.svg" width={150} height={150} />

      <div>
        {Object.values(providers).map((provider: Provider) => (
          <div key={provider.name}>
            {/* https://devdojo.com/tailwindcss/buttons#_ */}
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="relative inline-block text-lg group"
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 rounded-lg group-hover:text-white border-gray-800">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 px-28 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">
                  Sign in with {provider.name || ""}
                </span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-sky-600 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
