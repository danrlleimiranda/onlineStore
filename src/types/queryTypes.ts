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
