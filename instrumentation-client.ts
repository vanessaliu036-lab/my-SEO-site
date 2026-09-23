import { initBotId } from "botid/client/core"

initBotId({
  protect: [
    {
      // Wholesale and partnership CTAs converge on the /contact Server Action.
      path: "/contact",
      method: "POST",
      advancedOptions: {
        checkLevel: "basic",
      },
    },
    {
      // Keep GA4 / Clarity / Vercel Analytics focused on human production traffic.
      path: "/api/analytics-eligibility",
      method: "POST",
      advancedOptions: {
        checkLevel: "basic",
      },
    },
  ],
})
