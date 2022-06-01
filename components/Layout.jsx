import Footer from "./Footer";
import MainNavigation from "./navigation/MainNavigation";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function Layout(props) {
   const router = useRouter();

   const [showNavigation, setShowNavigation] = useState(true);
   const [showFooter, setShowFooter] = useState(true);

   useEffect(() => {
     //hide footer and navigation when user is on the checkout pages
     if (
       router.pathname === '/checkout/address' ||
       router.pathname === '/checkout/shipping' ||
       router.pathname === '/checkout/payment' ||
       router.pathname === '/checkout/review' ||
       router.pathname === '/auth/login' ||
       router.pathname === '/auth/signup'
     ) {
       setShowNavigation(false);
       setShowFooter(false);
     } else {
       setShowNavigation(true);
       setShowFooter(true);
     }
   }, [router.pathname]);


  return (
    <div>
      {showNavigation && <MainNavigation />}
      <main>{props.children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
