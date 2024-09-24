import { Route } from "react-router-dom"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/ui/admin-view/layout"
import AdminDashboard from "./pages/auth/admin-view/dashboard"
import AdminProducts from "./pages/auth/admin-view/products"
import AdminOrders from "./pages/auth/admin-view/orders"
import AdminFeatures from "./pages/auth/admin-view/features"
import ShoppingLayout from "./components/ui/shopping-view/layout"
import NotFound from "./pages/auth/not-found"



function App() {
  

  return (
    <div className="flex flex-col overflow-hidden bg-white">

      <Routes>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<AuthLogin/>} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="/products" element={<AdminProducts/>}/>
            <Route path="orders" element={<AdminOrders/>}/>
            <Route path="features" element={<AdminFeatures/>}/>
          </Route>
          <Route path="/shop" element={<ShoppingLayout/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
      </Routes>

    </div>
  )
}

export default App
