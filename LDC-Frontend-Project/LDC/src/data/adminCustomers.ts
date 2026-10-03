export type CustomerStatus = "Active" | "Blocked";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  balance: number;
  status: CustomerStatus;
  created: string;
};

export const adminCustomers: Customer[] = [
  {
    id: "1",
    name: "John Bushmill",
    email: "johnb@mail.com",
    phone: "078 5054 8877",
    orders: 124,
    balance: 121.0,
    status: "Blocked",
    created: "29 Dec 2022",
  },
  {
    id: "2",
    name: "Laura Prichet",
    email: "laura_prichet@mail.com",
    phone: "215 302 3376",
    orders: 45,
    balance: 590.0,
    status: "Active",
    created: "24 Dec 2022",
  },
  {
    id: "3",
    name: "Mohammad Karim",
    email: "m_karim@mail.com",
    phone: "050 414 8778",
    orders: 884,
    balance: 125.0,
    status: "Blocked",
    created: "12 Dec 2022",
  },
  {
    id: "4",
    name: "Josh Bill",
    email: "josh_bill@mail.com",
    phone: "216 75 812 706",
    orders: 99,
    balance: 348.0,
    status: "Blocked",
    created: "21 Oct 2022",
  },
  {
    id: "5",
    name: "Josh Adam",
    email: "josh_adam@mail.com",
    phone: "02 75 150 655",
    orders: 1540,
    balance: 607.0,
    status: "Active",
    created: "21 Oct 2022",
  },
  {
    id: "6",
    name: "Sin Tae",
    email: "sin_tae@mail.com",
    phone: "078 6013 3854",
    orders: 431,
    balance: 234.0,
    status: "Active",
    created: "21 Oct 2022",
  },
  {
    id: "7",
    name: "Rajesh Masvidal",
    email: "rajesh_m@mail.com",
    phone: "828 216 2190",
    orders: 38,
    balance: 760.0,
    status: "Blocked",
    created: "19 Sep 2022",
  },
  {
    id: "8",
    name: "Fajar Surya",
    email: "fsurya@mail.com",
    phone: "078 7173 9281",
    orders: 77,
    balance: 400.0,
    status: "Active",
    created: "19 Sep 2022",
  },
  {
    id: "9",
    name: "Lisa Greg",
    email: "lisag@mail.com",
    phone: "077 6157 4248",
    orders: 89,
    balance: 812.0,
    status: "Active",
    created: "19 Sep 2022",
  },
  {
    id: "10",
    name: "Linda Blair",
    email: "lindablair@mail.com",
    phone: "050 414 8778",
    orders: 1296,
    balance: 723.0,
    status: "Active",
    created: "10 Aug 2022",
  },
];
