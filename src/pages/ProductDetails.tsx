import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {getProductById} from '../services/api';
import {ProductResultType} from '../types/queryTypes';

type ProductDetailsProps = {
    handleProductDetails: (product: ProductResultType) => void
};

function ProductDetails({handleProductDetails}: ProductDetailsProps) {
    const cartProducts = localStorage.getItem('cartProducts')
        ? JSON.parse(localStorage.getItem('cartProducts') as string)
        : [];

    const calculateCartQuantity = () => {
        return cartProducts.reduce((totalQuantity: number, product: any): any | number => {
            if (product.quantidade) return totalQuantity + product.quantidade;
            return totalQuantity + 1;
        }, 0);
    };

    const shoppingCartLength = calculateCartQuantity();

    const initialState = {
        id: '',
        title: '',
        thumbnail: '',
        price: 0,
        quantidade: 1,
        avaiable_quantity: 1,
    };
    const [productDetails, setProductDetails] = useState<ProductResultType>(initialState);
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const data = await getProductById(id);
                console.log(data);
                setProductDetails(data);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <div>
                <Link to="/shopping-cart" data-testid="shopping-cart-button">
                    Ir para o Carrinho
                </Link>
            </div>
            <span data-testid="shopping-cart-size">{shoppingCartLength}</span>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div data-testid="product">

                <h2 data-testid="product-detail-name">{productDetails?.title}</h2>
                <img
                    src={productDetails?.thumbnail}
                    alt={productDetails?.title}
                    data-testid="product-detail-image"
                />
                <p data-testid="product-detail-price">
                    {`R$ ${productDetails?.price.toFixed(2)}`}

                </p>
                <button
                    data-testid="product-detail-add-to-cart"
                    onClick={() => handleProductDetails(productDetails)}
                >
                    Adicionar ao carrinho

                </button>

            </div>
        </div>
    );
}

export default ProductDetails;
