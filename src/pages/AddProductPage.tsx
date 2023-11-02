import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { postProduct } from './api/ProductApi';
import { Product } from './models/Product';
import { Button } from '@mui/material';

function AddProductPage() {
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const addProductMutuation = useMutation({
		mutationFn: async (formValue: Product) => {
			// axios get,post,put,delete sarmalladık.
			return await postProduct(formValue);
		},
		onSuccess: (data: any, formData: Product) => {
			console.log('onSuccess', data, formData);

			navigate('/');
		},
		onError: (result: any) => {
			console.log('onError', result);
			// queryClient.invalidateQueries({ queryKey: ['products'] });
		},
		onSettled(data, error, variables, context) {
			// işlem stabil hale geldiğinde
			// error veya success yerine kullanılabilir
			// success yada error alsak dahi buraya düşecektir.
			console.log('onSettled', variables, data, error, context);
			//queryClient.invalidateQueries({ queryKey: ['products'] });
		},
		async onMutate(formData: Product) {
			// Post, Put, Delete işlemleri yaptıktan sonra invalid query tag yapabilir veya optimistik update yapabiliriz.

			// kayıt işlemi sonrası products tag güncelleme
			// optimistic update işlemi
			// kayıt sonrası işlemde hata olma durumuna veya başarı durumuna bağlı olarak cachlenen verinin tekrardan güncellenmesi sağlanabilir.
			queryClient.setQueryData(['products'], []);
			console.log('onMutate', formData);
		},
	});

	return (
		<div>
			<Button
				color="primary"
				onClick={() => {
					const product: Product = {
						ProductName: 'Product-1',
						UnitPrice: 100,
						UnitsInStock: 10,
					};
					addProductMutuation.mutateAsync(product); //
				}}
			>
				Save
			</Button>
		</div>
	);
}

export default AddProductPage;
