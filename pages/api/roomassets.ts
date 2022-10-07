import { MongoClient } from 'mongodb';

export default async function handler(req: any, res: any) {
    const uri = "mongodb+srv://roomassetsdbuser:48FLvGDgk6WZWPfK@cluster0.ttqy8.mongodb.net";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = await client.db("nftmarket");
        const roomAssets = db.collection('roomassets');

        if (req.method == "GET") {
            const query = { walletAddress: req.query.walletAddress };
            const cursor = await roomAssets.find(query);

            let myAssets:any[] = [];
            await cursor.forEach((record) => {
                myAssets.push(record);
            })

            res.status(200).send(myAssets);
        }
        else {
            const filter = { walletAddress: req.body.walletAddress, pinataCid: req.body.pinataCid };
            const options = { upsert: true };
            const updateDoc = {
            $set: {
                xPos: req.body.xPos,
                yPos: req.body.yPos,
                zPos: req.body.zPos,
            },
            };
            const result = await roomAssets.updateOne(filter, updateDoc, options);
            console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );

            res.status(200).send(result);
        }
    } 
    finally {
        await client.close();
    }
}
