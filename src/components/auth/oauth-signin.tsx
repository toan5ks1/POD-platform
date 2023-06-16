"use client"

import * as React from "react"
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs"
import type { OAuthStrategy } from "@clerk/types"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  { name: "Apple", strategy: "oauth_apple", icon: "apple" },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
}[]

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const { signIn, isLoaded: signInLoaded } = useSignIn()

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return null
    try {
      setIsLoading(provider)
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
    } catch (error) {
      setIsLoading(null)

      const unknownError = "Something went wrong, please try again."

      isClerkAPIResponseError(error)
        ? toast.error(error.errors[0]?.longMessage ?? unknownError)
        : toast.error(unknownError)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon ?? "google"]

        return (
          <Button
            key={provider.strategy}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            onClick={() => void oauthSignIn(provider.strategy)}
          >
            {isLoading === provider.strategy ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {provider.name}
            <span className="sr-only">Sign in with {provider.name}</span>
          </Button>
        )
      })}
    </div>
  )
}