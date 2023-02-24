import React, { useState, useEffect } from "react";
import DashboardHeader from "../DashboardHeader";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import axios from "axios";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import "./ListOrderComponent.css";

async function fetchOrders() {
  const { data } = await axios.get("http://localhost:3000/api/order/find-all");
  return data;
}

const ListOrderComponent = () => {
  const [orders, setOrders] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  const { data } = useQuery("orders", fetchOrders);

  useEffect(() => {
    setOrders(data);
    setPagination(calculateRange(data, 5));
    setOrders(sliceData(data, page, 5));
  }, []);

  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = orders.filter(
        (item) =>
          item.quantity
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item.price.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setOrders(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  const __handleChangePage = (new_page) => {
    axios.get("http://localhost:3000/api/order/find-all").then((res) => {
      setOrders(res.data);
      setPagination(calculateRange(res.data, 5));

      setOrders(sliceData(res.data, new_page, 5));
    });
    setPage(new_page);

    setOrders(sliceData(orders, new_page, 5));
  };

  const deleteOrder = useMutation(async (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (isConfirm) {
      await axios
        .delete(`http://localhost:3000/api/order/${id}`)
        .then((res) => {
          console.log(res.data);
          setOrders(orders.filter((order) => order._id !== id));
        });
    }

    window.location.reload();
    window.location.href = "/order";
  });



  return (
    <div className="dashboard-content">
      <>
        <Container className="mt-2">
          <Row>
            <Col className="col-md-4 offset-md-4">
              <DashboardHeader
                btnText="Add Order"
                onClick={() => {
                  window.location.href = "/add-insurance";
                }}
              />
            </Col>
          </Row>
          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <h2>Order List</h2>
              <div className="dashboard-content-search">
                <input
                  type="text"
                  value={search}
                  placeholder="Search.."
                  className="dashboard-content-input"
                  onChange={(e) => __handleSearch(e)}
                />
              </div>
            </div>
            <Table striped bordered hover>
              <thead>
                <th style={{ wdti: "15%" }}>PRICE</th>
                <th style={{ width: "15%" }}> QUANTITY</th>
                <th style={{ width: "20%" }}> DISCOUNT</th>
                <th style={{ width: "20%" }}> TOLAL</th>
                <th style={{ width: "25%" }}>DutyFreeTotal</th>

                <th>ACTIONS</th>
              </thead>
              {orders.length !== 0 ? (
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.price}</td>
                      <td>{order.quantity}</td>
                      <td>{order.discount}</td>
                      <td>{order.total}</td>
                      <td>{order.dutyFreeTotal}</td>
                      <td>
                        <Button
                          variant="primary"
                          type="button"
                          onClick={() => {
                            window.location.href = `/edit-insurance/{insurance.id}`;
                          }}
                        >
                          Edit
                        </Button>{" "}
                        |
                        <Button
                          variant="danger"
                          type="button"
                          onClick={() => {
                            deleteOrder.mutate(order.id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : null}
            </Table>
            {orders.length !== 0 ? (
              <div className="dashboard-content-footer">
                {pagination.map((item, index) => (
                  <span
                    key={index}
                    className={
                      item === page ? "active-pagination" : "pagination"
                    }
                    onClick={() => __handleChangePage(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <div className="dashboard-content-footer">
                <span className="empty-table">No data</span>
              </div>
            )}
          </div>
        </Container>
      </>
    </div>
  );
};

export default ListOrderComponent;
