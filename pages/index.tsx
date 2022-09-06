import type { NextPage } from "next"; //NextPage type is next.js's built-in type that allows to properly type page components
import BaseLayout from "../components/ui/layout/BaseLayout";


const Home: NextPage = () => {
  return (
    <BaseLayout>
      <div>Hello World</div>
    </BaseLayout>
  );
};

export default Home;
