import React, { useState, useEffect } from "react";
import DashboardHeader from "../DashboardHeader";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import axios from "axios";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useQuery } from "react-query";

async function fetchItems() {
  const { data } = await axios.get("http://localhost:3000/api/item/find-all");
  return data;
}
const ListItemComponent = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  const { data } = useQuery("items", fetchItems);
  useEffect(() => {
    setItems(data);
    setPagination(calculateRange(data, 5));
    setItems(sliceData(data, page, 5));

  }, []);

  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = items.filter(
        (item) =>
          item.label.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.description.toLowerCase().includes(event.target.value.toLowerCase()) 
      );
      setItems(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  const __handleChangePage = (new_page) => {
    axios.get("http://localhost:3000/api/item/find-all").then((res) => {
      setItems(res.data);
      setPagination(calculateRange(res.data, 5));

      setItems(sliceData(res.data, new_page, 5));
    });
    setPage(new_page);

    setItems(sliceData(items, new_page, 5));
  };

  const deleteItem = async (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirm) {
      await axios
        .delete(`http://localhost:3000/api/item/${id}`)
        .then((res) => {
          console.log(res.data);
          setItems(items.filter((item) => item._id !== id));
        });

      window.location.reload();
      window.location.href = "/items";
    }
  };

  return (
    <div className="dashboard-content">
      <>
        <Container className="mt-2">
          <Row>
            <Col className="col-md-4 offset-md-4">
              <DashboardHeader
                btnText="Add Item"
                onClick={() => {
                  window.location.href = "/add-item";
                }}
              />
            </Col>
          </Row>
          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <h2>Item List</h2>
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
                <th style={{ width: "15%" }}> LABEL</th>
                <th style={{ width: "25%" }}> DESCRIPTION</th>
                <th style={{ width: "10%" }}>PriceDutyFree</th>
                <th style={{ width: "10%" }}>TAX</th>
                <th style={{ width: "15%" }}>TYPE</th>
                <th style={{ width: "15%" }}>REFERENCE</th>
              

                <th>ACTIONS</th>
              </thead>
              {items.length !== 0 ? (
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.label}</td>
                      <td>{item.description}</td>
                      <td>{item.priceDutyFree}</td>
                      <td>{item.tax}</td>
                      <td>{item.type}</td>
                      <td>{item.reference}</td>
          

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
                            deleteItem(item.id);
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
            {items.length !== 0 ? (
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

export default ListItemComponent;
