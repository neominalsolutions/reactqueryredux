import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Outlet, useRoutes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartSummaryPage from './pages/CartSummaryPage';
import AddProductPage from './pages/AddProductPage';

function App() {
	const routes = useRoutes([
		{
			path: '',
			element: (
				<>
					<Link to="/products">Products</Link>{' '}
					<Link to="/cartSummary">Cart Summary</Link>{' '}
					<Link to="/addProduct">New Product</Link>
					<Outlet />
				</>
			),
			children: [
				{
					path: '/products',
					Component: ProductsPage,
				},
				{
					path: '/cartSummary',
					Component: CartSummaryPage,
				},
				{
					path: '/addProduct',
					Component: AddProductPage,
				},
			],
		},
	]);

	return routes;
}

export default App;
