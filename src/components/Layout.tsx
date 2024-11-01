import { Helmet } from "react-helmet-async";
import Header from "./Header";


interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
 

  return (
    <div className="main">
      <Helmet>
        <title>Furmap - Furry World Map</title>
      </Helmet>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
