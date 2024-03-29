export type Query = {
  'site_id': string,
  'country_default_time_zone': 'GMT-03:00',
  'query': string,
  'paging': {
    'total': number,
    'primary_results': number,
    'offset': number,
    'limit': number
  },
  'results': [

  ],
  'sort': {
    'id': string,
    'name': string
  },
  'available_sorts': [
    {
      'id': string,
      'name': string
    },
    {
      'id': string,
      'name': string
    },
  ],
  'filters': [
  ],
  'available_filters': [
  ]
};

export type CategoryType = {
  id: string
  name: string
};

export type ProductResultType = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  quantidade: number;
  available_quantity: number;
  shipping: { free_shipping: boolean };
};

export type ProductDetailsType = {
  base_price: number,
  available_quantity: number,
  title: string,
  thumbnail: string,
};

export type Products = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  attributes: [{
    id: string;
    name: string;
    value_name: string;
  }]
};
