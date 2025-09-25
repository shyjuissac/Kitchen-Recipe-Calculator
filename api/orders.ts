import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const baseUrl = "https://thepantrycateringbeta.co.uk/wp-json/wc/v3";

  try {
    const response = await fetch(`${baseUrl}/orders`, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
          ).toString("base64"),
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
