import { tokens } from "../../theme";


export const mockDataCategory = [
  {
    id: 1,
    categoryname: "Electronic & Gadgets",
    description: "Explore the latest in cutting-edge technology",
  },
  {
    id: 2,
    categoryname: "Fashion & Appareal",
    description: "Discover trendy and timeless fashion pieces.",
  },
  {
    id: 3,
    categoryname: "Toys",
    description: "Foster creativity and fun for all ages with an extensive collection of toys, games, and educational activities that entertain and inspire."
  },
  {
    id: 4,
    categoryname: "Sport & Outdoors",
    description: "Elevate your active lifestyle with high-quality sports gear, fitness equipment, and outdoor essentials for enthusiasts and adventurers alike."
  },
  {
    id: 5,
    categoryname: "Beauty & Personal Care",
    description: "Unleash your beauty potential with a range of skincare, cosmetics, and grooming products that enhance your natural radiance."
  },
];

export const mockDataSeller = [
  {
    id: 1,
    firstname: "Switch",
    lastname: "Official Store",
    email: "jonsnow@gmail.com",
    phone: "(665)121-5454",
    status: "Active",
  },
  {
    id: 2,
    firstname: "Nike",
    lastname: "Official Store",
    email: "jonsnow@gmail.com",
    phone: "(665)121-5454",
    status: "Active",
  },
  {
    id: 3,
    firstname: "Sony",
    lastname: "Official Store",
    email: "jonsnow@gmail.com",
    phone: "(665)121-5454",
    status: "Deactivated",
  },
];

export const mockDataAllProducts = [
  {
    id: 1,
    productimage: "iphone.jpeg",
    productname: "Iphone 15 Pro",
    description: "This is Iphone 15 Pro",
    category: "Electronic & Gadgets",
    quantity: 1,
    price: "RM" + 4900.00,
    seller: "Apple",
  }
]

export const mockDataAllOrders = [
  {
    id: 1,
    orderId: "ABCDEF",
    productname: "Iphone 15 Pro",
    productimage: "iphone.jpeg",
    category: "Electronic & Gadgets",
    seller: "Apple",
    price: "RM" + 4900.00,
    quantity: 1,
    ordertime: "11/10/2023:10:30am",
    status: "Pending"
  },
  {
    id: 2,
    orderId: "FSDFGSGR",
    productname: "Iphone 15 Pro",
    productimage: "iphone.jpeg",
    category: "Electronic & Gadgets",
    seller: "Apple",
    price: "RM" + 4900.00,
    quantity: 1,
    ordertime: "11/11/2023:10:30am",
    status: "Completed"
  },
  {
    id: 3,
    orderId: "QWERTY",
    productname: "Iphone 15 Pro",
    productimage: "iphone.jpeg",
    category: "Electronic & Gadgets",
    seller: "Apple",
    price: "RM" + 4900.00,
    quantity: 1,
    ordertime: "11/09/2023:10:30am",
    status: "Cancelled"
  }
]

export const mockBarData = [
  {
    country: "JHR",
    Sneakers: 137,
    SneakersColor: "hsl(229, 70%, 50%)",
    Sandals: 96,
    SandalsColor: "hsl(296, 70%, 50%)",
    Heels: 72,
    HeelsColor: "hsl(97, 70%, 50%)",
    Sports: 140,
    SportsColor: "hsl(340, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "KDH",
    Sneakers: 200,
    SneakersColor: "hsl(307, 70%, 50%)",
    Sandals: 28,
    SandalsColor: "hsl(111, 70%, 50%)",
    Heels: 58,
    HeelsColor: "hsl(273, 70%, 50%)",
    Sports: 29,
    SportsColor: "hsl(275, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "KTN",
    Sneakers: 109,
    SneakersColor: "hsl(72, 70%, 50%)",
    Sandals: 23,
    SandalsColor: "hsl(96, 70%, 50%)",
    Heels: 34,
    HeelsColor: "hsl(106, 70%, 50%)",
    Sports: 152,
    SportsColor: "hsl(256, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "KUL",
    Sneakers: 133,
    SneakersColor: "hsl(257, 70%, 50%)",
    Sandals: 52,
    SandalsColor: "hsl(326, 70%, 50%)",
    Heels: 43,
    HeelsColor: "hsl(110, 70%, 50%)",
    Sports: 83,
    SportsColor: "hsl(9, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "MLK",
    Sneakers: 81,
    SneakersColor: "hsl(190, 70%, 50%)",
    Sandals: 80,
    SandalsColor: "hsl(325, 70%, 50%)",
    Heels: 112,
    HeelsColor: "hsl(54, 70%, 50%)",
    Sports: 35,
    SportsColor: "hsl(285, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "NSN",
    Sneakers: 81,
    SneakersColor: "hsl(190, 70%, 50%)",
    Sandals: 80,
    SandalsColor: "hsl(325, 70%, 50%)",
    Heels: 112,
    HeelsColor: "hsl(54, 70%, 50%)",
    Sports: 35,
    SportsColor: "hsl(285, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "PHG",
    Sneakers: 81,
    SneakersColor: "hsl(190, 70%, 50%)",
    Sandals: 80,
    SandalsColor: "hsl(325, 70%, 50%)",
    Heels: 112,
    HeelsColor: "hsl(54, 70%, 50%)",
    Sports: 35,
    SportsColor: "hsl(285, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "PNG",
    Sneakers: 66,
    SneakersColor: "hsl(208, 70%, 50%)",
    Sandals: 111,
    SandalsColor: "hsl(334, 70%, 50%)",
    Heels: 167,
    HeelsColor: "hsl(182, 70%, 50%)",
    Sports: 18,
    SportsColor: "hsl(76, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "PRK",
    Sneakers: 66,
    SneakersColor: "hsl(208, 70%, 50%)",
    Sandals: 111,
    SandalsColor: "hsl(334, 70%, 50%)",
    Heels: 167,
    HeelsColor: "hsl(182, 70%, 50%)",
    Sports: 18,
    SportsColor: "hsl(76, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "PLS",
    Sneakers: 66,
    SneakersColor: "hsl(208, 70%, 50%)",
    Sandals: 111,
    SandalsColor: "hsl(334, 70%, 50%)",
    Heels: 167,
    HeelsColor: "hsl(182, 70%, 50%)",
    Sports: 18,
    SportsColor: "hsl(76, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "PJY",
    Sneakers: 66,
    SneakersColor: "hsl(208, 70%, 50%)",
    Sandals: 111,
    SandalsColor: "hsl(334, 70%, 50%)",
    Heels: 167,
    HeelsColor: "hsl(182, 70%, 50%)",
    Sports: 18,
    SportsColor: "hsl(76, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "SGR",
    Sneakers: 66,
    SneakersColor: "hsl(208, 70%, 50%)",
    Sandals: 111,
    SandalsColor: "hsl(334, 70%, 50%)",
    Heels: 167,
    HeelsColor: "hsl(182, 70%, 50%)",
    Sports: 18,
    SportsColor: "hsl(76, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "TRG",
    Sneakers: 66,
    SneakersColor: "hsl(208, 70%, 50%)",
    Sandals: 111,
    SandalsColor: "hsl(334, 70%, 50%)",
    Heels: 167,
    HeelsColor: "hsl(182, 70%, 50%)",
    Sports: 18,
    SportsColor: "hsl(76, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
  {
    country: "East",
    Sneakers: 80,
    SneakersColor: "hsl(87, 70%, 50%)",
    Sandals: 47,
    SandalsColor: "hsl(141, 70%, 50%)",
    Heels: 158,
    HeelsColor: "hsl(224, 70%, 50%)",
    Sports: 49,
    SportsColor: "hsl(274, 70%, 50%)",
    Womens: 78,
    WomensColor: "hsl(245, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "japan",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "Jan",
        y: 101,
      },
      {
        x: "Feb",
        y: 75,
      },
      {
        x: "Mac",
        y: 36,
      },
      {
        x: "Apr",
        y: 216,
      },
      {
        x: "May",
        y: 35,
      },
      {
        x: "Jun",
        y: 236,
      },
      {
        x: "Jul",
        y: 88,
      },
      {
        x: "Aug",
        y: 232,
      },
      {
        x: "Sep",
        y: 281,
      },
      {
        x: "Oct",
        y: 1,
      },
      {
        x: "Nov",
        y: 35,
      },
      {
        x: "Dec",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "Jan",
        y: 212,
      },
      {
        x: "Feb",
        y: 190,
      },
      {
        x: "Mac",
        y: 270,
      },
      {
        x: "Apr",
        y: 9,
      },
      {
        x: "May",
        y: 75,
      },
      {
        x: "Jun",
        y: 175,
      },
      {
        x: "Jul",
        y: 33,
      },
      {
        x: "Aug",
        y: 189,
      },
      {
        x: "Sep",
        y: 97,
      },
      {
        x: "Oct",
        y: 87,
      },
      {
        x: "Nov",
        y: 299,
      },
      {
        x: "Dec",
        y: 251,
      },
    ],
  },
  {
    id: "us",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "Jan",
        y: 191,
      },
      {
        x: "Feb",
        y: 136,
      },
      {
        x: "Mac",
        y: 91,
      },
      {
        x: "Apr",
        y: 190,
      },
      {
        x: "May",
        y: 211,
      },
      {
        x: "Jun",
        y: 152,
      },
      {
        x: "Jul",
        y: 189,
      },
      {
        x: "Aug",
        y: 152,
      },
      {
        x: "Sep",
        y: 8,
      },
      {
        x: "Oct",
        y: 197,
      },
      {
        x: "Nov",
        y: 107,
      },
      {
        x: "Dec",
        y: 170,
      },
    ],
  },
];


