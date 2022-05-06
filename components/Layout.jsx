import Footer from "./Footer";
import MainNavigation from "./navigation/MainNavigation";


export default function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
