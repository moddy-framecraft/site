"use strict";

const orders = [
  ["MD-1048", "Midnight Eau de Parfum", "24 Nov 2026", "Processing", 4800],
  ["MD-1047", "Studio Headphones", "24 Nov 2026", "Shipped", 8900],
  ["MD-1046", "Butter Cream Suede Sneakers", "23 Nov 2026", "Delivered", 9600],
  ["MD-1045", "Flat White Ceramic Cup", "23 Nov 2026", "Processing", 1650],
  ["MD-1044", "Orange & Cardamom Candle", "22 Nov 2026", "Delivered", 2400],
  ["MD-1043", "Flat White Ceramic Cup", "22 Nov 2026", "Shipped", 1650],
];

const byId = id => document.getElementById(id);
const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
const price = pence => gbp.format(pence / 100);

byId("total").textContent = orders.length;
byId("pending").textContent = orders.filter(order => order[3] === "Processing").length;
byId("value").textContent = price(orders.reduce((sum, order) => sum + order[4], 0));

function renderOrders() {
  const query = byId("search").value.trim().toLowerCase();
  const status = byId("status").value;
  const matching = orders.filter(([id, product, , state]) =>
    (id.toLowerCase().includes(query) || product.toLowerCase().includes(query)) &&
    (status === "All statuses" || state === status)
  );

  const rows = matching.map(([id, product, date, state, pence]) => {
    const row = document.createElement("tr");
    for (const value of [id, product, date, state, price(pence)]) {
      const cell = row.insertCell();
      cell.textContent = value;
    }
    row.cells[3].classList.add(state.toLowerCase());
    return row;
  });
  byId("orders").replaceChildren(...rows);
  byId("empty").hidden = matching.length > 0;
}

byId("search").addEventListener("input", renderOrders);
byId("status").addEventListener("change", renderOrders);
renderOrders();
