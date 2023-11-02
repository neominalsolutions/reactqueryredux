export interface Cart {
	items: CartItem[];
}

export interface CartItem {
	ProductID: number;
	Quantity: number;
	ListPrice: number;
}
