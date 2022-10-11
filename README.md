![20221010](https://user-images.githubusercontent.com/59579994/195117246-66e41980-0f57-4925-9913-ccbe91d4fc0c.gif)





## Inspiration

There are many NFT marketplaces for images, but almost none for 3d models. So, we wanted to create a dedicated place where people can create, buy and sell NFT 3d assets.

## What it does

NFT World is a web application where you can

- upload 3D asset metadata to IPFS and mint a token,
- list minted or previously purchased NFTs,
- browse all the 3d models that are listed for sale and make a purchase, and
- view all the NFTs that you currently own in a 3d virtual space.


![Screen Shot 2022-10-11 at 2 26 33 AM copy](https://user-images.githubusercontent.com/59579994/195117147-a2a31940-b7a8-4d1c-88ca-4762ad6d6df9.jpg)



## How we built it

NFT World's smart contract is written in Solidity based on ERC721 and deployed to the CoinEx TestNet [(here)](https://testnet.coinex.net/address/0xc67b8EA80a9fFf8Be0427b8bd6536f69B014345A). We used Pinata (IPFS) to store NFT's metadata. Our React dApp is mainly written in TypeScript and built on Next.js frame to utilize hybrid static and server side rendering. To render 3d assets and the virtual space, we used react-three-fiber(R3F) which is built on top of three.js. Lastly, we choose to use Tailwind CSS since it's highly customizable. Without resources such as [stack overflow](https://stackoverflow.com/), [Udemy](https://www.udemy.com/course/nft-marketplace-in-react-typescript-solidity-full-guide/), [YouTube](https://www.youtube.com/watch?v=EF3zWvxGm4M&list=PLFdLKuByuofHEfp3gIGzqKKqNrPMXh7Qv), [Sketchfab](https://sketchfab.com/tiagojdferreira/collections/kawaii-6b6567d0a2a8477098b635d652d494ad), [three.js](https://threejs.org/) and [R3F](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)'s documentation and examples, it wouldn't have been possible to create this app!

## Challenges we ran into

Here are some of the challenges we faced:
- Rate limit from Pinata's Public Gateway - without a paid plan and without creating dedicated gateways, Pinata does not allow the deployed app in production to fetch large 3d files, 
- Implementing the functionality so that the user can directly upload their .glb file to IPFS,
- Integrating three.js to React TypeScript components (we ended up using react-three-fiber library and sacrifice dynamically 'spawning' NFT functionality), and
- Finding an API for the exchange rate between CET, ETH and USD.

## What's next for NFT World

- Users can dynamically spawn the minted/purchased 3d NFT into their virtual space and can interact with it.
- Other users can also visit the creator's virtual space and make a purchase straight from the space.
- Buyers can interact with the sellers via live chat.
- Users can directly upload the 3d files to IPFS.
- Improve responsiveness,
- Implement rarity to each NFT



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

