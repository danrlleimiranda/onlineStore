import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductResultType } from '../types/queryTypes';

type ProductDetailsProps = {
  handleProductDetails: (product: ProductResultType) => void;
};

function ProductDetails({ handleProductDetails }: ProductDetailsProps) {
  const initialState = {
    id: '',
    title: '',
    thumbnail: '',
    price: 0,
    quantidade: 1,
    available_quantity: 1,
    shipping: { free_shipping: false },
  };
  const [productDetails, setProductDetails] = useState<ProductResultType>(initialState);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getProductById(id);
        setProductDetails(data);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>

      <div data-testid="product">

        <h2 data-testid="product-detail-name">{productDetails?.title}</h2>
        <img
          src={ productDetails.thumbnail }
          alt={ productDetails.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">
          {`R$ ${productDetails.price.toFixed(2)}`}

        </p>
        {productDetails.shipping.free_shipping
        && <p data-testid="free-shipping">Frete Grátis!</p>}
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => handleProductDetails(productDetails) }
        >
          Adicionar ao carrinho

        </button>

      </div>
    </div>
  );
}

export default ProductDetails;
