"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TShirt } from "~/app/testing3d/models/TShirt";
import RenderModel from "~/app/testing3d/RenderModel";
import { useMusic } from "~/components/ui/MusicContext"; // Import the useMusic hook
import { useSession } from "next-auth/react"; // Import the useSession hook for getting the user's session
import { signIn } from "next-auth/react";
import Link from "next/link"; // Import the useMusic hook

export default function HomePage() {
  const router = useRouter();
  const { isMusicPlaying } = useMusic(); // Use context for the music state
  const { data: session } = useSession(); // Use session to get user information

  useEffect(() => {
    if (isMusicPlaying === undefined) {
      // Redirect to /preference if the music preference is not set
      router.push("/preference");
    }
  }, [router, isMusicPlaying]);

  // Display a loading state while cookies are being verified or the music preference is undefined
  if (isMusicPlaying === undefined) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  // Get the user's name from the session (if available)
  const userName = session?.user?.name || "Guest";

  return (
    <main className="flex min-h-screen w-screen flex-col overflow-x-hidden bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white md:h-screen md:min-h-max md:flex-row">
      <div className="flex h-full w-screen flex-col items-center p-3 md:flex-row md:justify-center md:p-8">
        <div className="order-1 flex h-[50vh] w-screen px-3 md:order-2 md:h-full md:min-w-[90vh] md:px-0">
          <div className="relative h-full w-full flex-col rounded-3xl bg-white/50 shadow-xl shadow-black/30 backdrop-blur-xl">
            <div className="relative flex h-full w-full overflow-hidden rounded-3xl">
              <RenderModel>
                <TShirt playAudio={isMusicPlaying} />{" "}
                {/* Pass music state to TShirt */}
              </RenderModel>
            </div>
          </div>
        </div>

        <div className="order-2 mt-8 flex h-fit w-fit flex-col justify-center md:order-1 md:mt-8 md:gap-14 md:p-24">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Merch <span className="text-[hsl(280,100%,70%)]">Incridea</span>
          </h1>
          <p className="md:text-md mt-4 md:mr-16 md:text-2xl">
            Celebrate the spirit of Nitte Incridea with our exclusive custom
            merchandise. Perfect for showcasing your love for the event or
            gifting to fellow enthusiasts.
          </p>

          {/* Display the user's name if logged in */}
          <div className="my-4 text-xl font-bold text-white md:text-4xl">
            {userName === "Guest" ? (
              <p>
                Welcome, Guest! Please sign in to enjoy personalized features.
              </p>
            ) : (
              <p>Welcome, {userName}!</p>
            )}
          </div>

          <div className="flex items-center justify-center md:justify-normal">
            <div className="flex items-center justify-center md:my-12">
              {userName === "Guest" ? (
                <button
                  className="transform rounded-md border border-white bg-white px-8 py-3 text-xl font-bold text-black transition duration-500 ease-in-out hover:scale-110 hover:bg-purple-600 hover:text-white md:px-12 md:py-6 md:text-3xl"
                  onClick={() => signIn("google")}
                >
                  Sign In
                </button>
              ) : (
                <Link
                  href="/tshirt"
                  className="transform rounded-md border border-white bg-white px-8 py-3 text-xl font-bold text-black transition duration-500 ease-in-out hover:scale-110 hover:bg-purple-600 hover:text-white md:px-12 md:py-6 md:text-3xl"
                >
                  Buy Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
