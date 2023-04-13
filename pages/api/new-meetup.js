import { MongoClient } from "mongodb";
import { URL } from "../../mongodb/api";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(URL);
    const db = client.db();

    const meetupsCollections = db.collection("meetups");

    const result = await meetupsCollections.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
