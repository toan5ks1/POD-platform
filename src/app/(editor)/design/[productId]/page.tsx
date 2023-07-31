import { ErrorCard } from "@/components/error-card"
import { Shell } from "@/components/shells/shell"

export default function DesignPage() {
  return (
    <Shell variant="centered">
      <ErrorCard
        title="Editor not found"
        description="The Editor may have expired or you may have already updated your Editor"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Shell>
  )
}
