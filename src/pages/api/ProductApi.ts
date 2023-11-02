import axios from 'axios';
import { Product } from '../models/Product';

export const fetchProducts = async () => {
	return await axios
		.get<Product[]>(
			'https://services.odata.org/northwind/northwind.svc/Products?$format=json'
		)
		.then((data: any) => data.data.value);
};

export const postProduct = async (data: Product) => {
	return await axios
		.post('https://services.odata.org/northwind/northwind.svc/Products', data, {
			headers: { 'Content-Type': 'application/json' },
		})
		.then((data) => data)
		.catch((err) => {
			console.log('error', err);
		});
};
