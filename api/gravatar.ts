import { VercelRequest, VercelResponse } from "@vercel/node";

import { gravatar, validate } from "william.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const email = req.query.email as string;

    if(!email) return res.status(400).send({ message: "No email specified.", code: "NO_EMAIL" });
    if(!validate.email(email)) return res.status(400).send({ message: "Invalid email specified.", code: "INVALID_EMAIL" });

    try {
        const gravatarURL = gravatar(email.toLowerCase());

        res.status(200).json({ email: email.toLowerCase(), hash: gravatarURL.replace("https://gravatar.com/avatar/", ""), url: gravatarURL });
    } catch(err) {
        res.status(500).json({ message: err.message, code: "INTERNAL_SERVER_ERROR" });
    }
}
