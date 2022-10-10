## Inspiration

There are many NFT marketplaces for images, but almost none for 3d models. So, we wanted to create a dedicated place where people can create, buy and sell NFT 3d assets.

## What it does

NFT World is a web application where you can

- upload 3D asset metadata to IPFS and mint a token,
- list minted or previously purhcased NFTs,
- browse all the 3d models that are listed for sale and make a purchase, and
- view all the NFTs that you currently own in a 3d virtual space.

## How we built it

NFT World's smart contract is written in Solidity based on ERC721 and deployed to the CoinEx TestNet [(here)](https://testnet.coinex.net/address/0xc67b8EA80a9fFf8Be0427b8bd6536f69B014345A). We used Pinata (IPFS) to store NFT's metadata. Our React dApp is mainly written in TypeScript and built on Next.js frame to utilize hybrid static and server side rendering. To render 3d assets and the virtual space, we used react-three-fiber(R3F) which is built on top of three.js. Lastly, we choose to use Tailwind CSS since it's highly customizable. Without resources such as stack overflow, Udemy, YouTube, Sketchfab, three.js and R3F's documentation and examples, it wouldn't have been possible to create such an app!

## Challenges we ran into

Here are some of the challenges we faced:

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
