type Eventtype =
  | "create_order"
  | "delete_order"
  | "user_balance"
  | "add_balance"
  | "index_price"
  | "create_market";

type add_balance = {
  userid: string;
  balance: string;
};

type create_market = {
  slug: string;
  imageUrl: string;
};

type delete_order = {
  userid: string;
  orderid: string;
};

type user_balance = {
  userid: string;
  balance: string;
};

type create_order = {
  userId: string;
  marketId: string;
  quantity: string;
  price: string;
  side: string;
  ordertype: string;
};

type data =
| add_balance
| create_order
| delete_order
| user_balance
| create_market;

type payload = {
  type: Eventtype;
  data: data;
  loopbackid?: string;
};

export type {payload}  