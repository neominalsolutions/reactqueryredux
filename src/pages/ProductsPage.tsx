import React, { useState } from 'react';
import { fetchProducts } from './api/ProductApi';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { Product } from './models/Product';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Grid,
	Typography,
} from '@mui/material';

const queryClient = new QueryClient();

function ProductsPage() {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['products'], // unique bir key bu key cache için önemli eğer cache bozup bir daha fetch edecek isek bu durumda queryClient üzerinden bir invalidQueryKey() methodu çağırırız.
		cacheTime: 3600000, // 1 saat cache çalış // default 5 dk
		queryFn: async () => {
			return await fetchProducts();
		},
		onSuccess: (data: Product[]) => {
			console.log('data', data);
		},
		onError: (error: any) => {
			console.log('error', error);
		},
		// refetchInterval: 3000, // 3saniye 1 refleshle pooling işlemi
	});

	if (isLoading)
		return (
			<>
				<div style={{ marginTop: '2rem' }}>... Loading</div>
			</>
		);

	if (data)
		return (
			<>
				<Container maxWidth="xl">
					<Button
						sx={{
							marginTop: '2rem',
						}}
						onClick={() => {
							queryClient.invalidateQueries({ queryKey: ['products'] });
						}}
					>
						Invalidate Cache
					</Button>
					<Button
						sx={{
							marginTop: '2rem',
						}}
						onClick={() => {
							refetch();
						}}
					>
						Manuel Refetch
					</Button>
					<Grid
						display={'flex'}
						rowGap={2}
						columnGap={2}
						justifyContent={'space-between'}
						alignItems={'center'}
						flexWrap={'wrap'}
					>
						{data.map((item) => {
							return (
								<Card
									key={item.ProductID}
									sx={{ minWidth: 400, minHeight: 300 }}
								>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{item.ProductName}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Stock: {item.UnitsInStock} Price: {item.UnitPrice}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small">Sepete Ekle</Button>
									</CardActions>
								</Card>
							);
						})}
					</Grid>
				</Container>
			</>
		);
	else return <></>;
}

export default ProductsPage;
