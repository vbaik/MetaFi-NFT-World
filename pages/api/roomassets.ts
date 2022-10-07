import { MongoClient } from 'mongodb';

export default async function handler(req: any, res: any) {
    const uri = "mongodb+srv://roomassetsdbuser:48FLvGDgk6WZWPfK@cluster0.ttqy8.mongodb.net";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = await client.db("nftmarket");
        const roomAssets = db.collection('roomassets');

        const query = { walletAddress: '633f8199cc86bf3057feebfd45' };
        const cursor = await roomAssets.find(query);

        let myAssets:any[] = [];
        await cursor.forEach((record) => {
            myAssets.push(record);
        })

        res.status(200).send(myAssets);
    } 
    finally {
        await client.close();
    }
}
