import { checkBotId } from "botid/server"

export const dynamic = "force-dynamic"

export async function POST() {
  const verification = await checkBotId({
    advancedOptions: {
      checkLevel: "basic",
    },
  })

  return Response.json(
    { allow: !verification.isBot },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    }
  )
}
