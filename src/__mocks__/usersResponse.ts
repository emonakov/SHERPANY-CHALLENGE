import { UsersQueryResult } from '../StateInterface';

export const getResults = (nat: string, index: number): UsersQueryResult => {
  const results: Record<string, UsersQueryResult[]> = {
    GB: [
      {
        results: [
          {
            name: {
              title: 'Miss',
              first: 'Susie',
              last: 'Garcia',
            },
            location: {
              street: {
                number: 7820,
                name: 'Church Lane',
              },
              city: 'Cambridge',
              state: 'Shropshire',
              country: 'United Kingdom',
              postcode: 'IO59 6LJ',
            },
            email: 'susie.garcia@example.com',
            login: {
              username: 'redgoose675',
            },
            phone: '017684 53197',
            cell: '0717-555-193',
            id: {
              name: 'NINO',
              value: 'PK 74 63 64 W',
            },
            picture: {
              large: 'https://randomuser.me/api/portraits/women/19.jpg',
              medium: 'https://randomuser.me/api/portraits/med/women/19.jpg',
              thumbnail:
                'https://randomuser.me/api/portraits/thumb/women/19.jpg',
            },
            nat: 'GB',
          },
          {
            name: {
              title: 'Miss',
              first: 'Abigail',
              last: 'Knight',
            },
            location: {
              street: {
                number: 2408,
                name: 'York Road',
              },
              city: 'City of London',
              state: 'West Glamorgan',
              country: 'United Kingdom',
              postcode: 'L75 8RB',
            },
            email: 'abigail.knight@example.com',
            login: {
              username: 'goldenmeercat958',
            },
            phone: '028 3015 8730',
            cell: '0760-193-423',
            id: {
              name: 'NINO',
              value: 'BH 78 34 19 Y',
            },
            picture: {
              large: 'https://randomuser.me/api/portraits/women/65.jpg',
              medium: 'https://randomuser.me/api/portraits/med/women/65.jpg',
              thumbnail:
                'https://randomuser.me/api/portraits/thumb/women/65.jpg',
            },
            nat: 'GB',
          },
        ],
        info: {
          results: 2,
          page: 1,
        },
      },
    ],
    ES: [
      {
        results: [
          {
            name: {
              title: 'Mr',
              first: 'Hector',
              last: 'Gomez',
            },
            location: {
              street: {
                number: 9949,
                name: 'Avenida de Salamanca',
              },
              city: 'Zaragoza',
              state: 'Galicia',
              country: 'Spain',
              postcode: 30840,
            },
            email: 'hector.gomez@example.com',
            login: {
              username: 'purplefish555',
            },
            phone: '911-897-490',
            cell: '608-986-691',
            id: {
              name: 'DNI',
              value: '79281554-L',
            },
            picture: {
              large: 'https://randomuser.me/api/portraits/men/83.jpg',
              medium: 'https://randomuser.me/api/portraits/med/men/83.jpg',
              thumbnail: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
            },
            nat: 'ES',
          },
          {
            name: {
              title: 'Miss',
              first: 'Isabel',
              last: 'Campos',
            },
            location: {
              street: {
                number: 9093,
                name: 'Avenida de La Albufera',
              },
              city: 'Orense',
              state: 'Aragón',
              country: 'Spain',
              postcode: 27966,
            },
            email: 'isabel.campos@example.com',
            login: {
              username: 'angryfish131',
            },
            phone: '949-565-538',
            cell: '612-896-722',
            id: {
              name: 'DNI',
              value: '70207129-L',
            },
            picture: {
              large: 'https://randomuser.me/api/portraits/women/11.jpg',
              medium: 'https://randomuser.me/api/portraits/med/women/11.jpg',
              thumbnail:
                'https://randomuser.me/api/portraits/thumb/women/11.jpg',
            },
            nat: 'ES',
          },
        ],
        info: {
          results: 2,
          page: 1,
        },
      },
      {
        results: [
          {
            name: {
              title: 'Mrs',
              first: 'Emilia',
              last: 'Arias',
            },
            location: {
              street: {
                number: 5926,
                name: 'Calle de Pedro Bosch',
              },
              city: 'Gijón',
              state: 'Comunidad de Madrid',
              country: 'Spain',
              postcode: 76954,
            },
            email: 'emilia.arias@example.com',
            login: {
              username: 'smallwolf146',
            },
            phone: '923-217-242',
            cell: '648-443-087',
            id: {
              name: 'DNI',
              value: '03074124-K',
            },
            picture: {
              large: 'https://randomuser.me/api/portraits/women/71.jpg',
              medium: 'https://randomuser.me/api/portraits/med/women/71.jpg',
              thumbnail:
                'https://randomuser.me/api/portraits/thumb/women/71.jpg',
            },
            nat: 'ES',
          },
          {
            name: {
              title: 'Miss',
              first: 'Celia',
              last: 'Mora',
            },
            location: {
              street: {
                number: 2020,
                name: 'Avenida de Burgos',
              },
              city: 'Torrejón de Ardoz',
              state: 'Islas Baleares',
              country: 'Spain',
              postcode: 77990,
            },
            email: 'celia.mora@example.com',
            login: {
              username: 'lazymeercat535',
            },
            phone: '978-565-074',
            cell: '675-415-665',
            id: {
              name: 'DNI',
              value: '49769047-G',
            },
            picture: {
              large: 'https://randomuser.me/api/portraits/women/43.jpg',
              medium: 'https://randomuser.me/api/portraits/med/women/43.jpg',
              thumbnail:
                'https://randomuser.me/api/portraits/thumb/women/43.jpg',
            },
            nat: 'ES',
          },
        ],
        info: {
          results: 2,
          page: 2,
        },
      },
    ],
  };

  return results[nat][index];
};
