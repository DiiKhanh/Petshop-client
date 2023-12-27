import { Suspense, lazy } from "react";
import { useRoutes, Outlet, Navigate } from "react-router-dom";
import ProtectPage from "~/components/ProtectedPage";
// layouts
import Mainlayout from "~/layouts/MainLayout";

export const LoginPage = lazy(() => import("~/pages/LoginPage"));
export const ResetPage = lazy(() => import("~/pages/ResetPage"));
export const SignupPage = lazy(() => import("~/pages/SignupPage"));
export const VerifyPage = lazy(() => import("~/pages/VerifyPage"));
//

export const HomePage = lazy(() => import("~/pages/HomePage"));
export const DogPage = lazy(() => import("~/pages/DogPage"));
export const DogDetail = lazy(() => import("~/pages/DogDetail"));
export const ProductPage = lazy(() => import("~/pages/ProductPage"));
export const ProductDetail = lazy(() => import("~/pages/ProductDetail"));
export const CartPage = lazy(() => import("~/pages/CartPage"));
export const ProfilePage = lazy(() => import("~/pages/ProfilePage"));
export const OrderPage = lazy(() => import("~/pages/OrderPage"));
export const CheckoutPage = lazy(() => import("~/pages/CheckoutPage"));
export const PageNotFound = lazy(() => import("~/pages/Page404"));
export const PurchasedPage = lazy(() => import("~/pages/PurchasedPage"));
export const PurchasedDetail = lazy(() => import("~/sections/purchased/PurchasedDetail"));
export const ProfilePetPage = lazy(() => import("~/pages/ProfilePetPage"));
export const ContactPage = lazy(() => import("~/pages/ContactPage"));
export const VoucherPage = lazy(() => import("~/pages/VoucherPage"));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <Mainlayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </Mainlayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: "dog", element: <DogPage /> },
        { path: "dog/:id", element: <DogDetail /> },
        { path: "product", element: <ProductPage /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "cart", element: <ProtectPage> <CartPage /> </ProtectPage> },
        { path: "profile", element: <ProtectPage> <ProfilePage /> </ProtectPage> },
        { path: "order", element: <ProtectPage> <OrderPage /> </ProtectPage> },
        { path: "checkout/success", element: <ProtectPage> <CheckoutPage /> </ProtectPage> },
        { path: "purchased", element: <ProtectPage> <PurchasedPage /> </ProtectPage> },
        { path: "purchased/:id", element: <ProtectPage> <PurchasedDetail /> </ProtectPage> },
        { path: "profile-pet", element: <ProtectPage> <ProfilePetPage /> </ProtectPage> },
        { path: "contact", element: <ContactPage /> },
        { path: "voucher", element: <VoucherPage /> }
      ]
    },
    {
      path:"login",
      element: <LoginPage />
    },
    {
      path:"signup",
      element: <SignupPage />
    },
    {
      path:"verify",
      element: <VerifyPage />
    },
    {
      path:"reset-password",
      element: <ResetPage />
    },
    {
      path: "404",
      element: <PageNotFound />
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />
    }
  ]);

  return routes;
}