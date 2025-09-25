import { useEffect, useState } from "react";

type Order = {
  id: number;
  total: string;
  currency: string;
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - {order.total} {order.currency}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
