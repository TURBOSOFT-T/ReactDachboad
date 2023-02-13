import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { calculateRange, sliceData } from "../../utils/table-pagination";
import axios from "axios";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const ListInsuranceComponent = () => {
  const [insurances, setInsurances] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/insurance/find-all").then((res) => {
      setInsurances(res.data);
      setPagination(calculateRange(res.data, 5));
      setInsurances(sliceData(res.data, page, 5));
    });
  }, []);

  const __handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let search_results = insurances.filter(
        (item) =>
          item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setInsurances(search_results);
    } else {
      __handleChangePage(1);
    }
  };

  const __handleChangePage = (new_page) => {
    axios.get("http://localhost:3000/api/insurance/find-all").then((res) => {
      setInsurances(res.data);
      setPagination(calculateRange(res.data, 5));

      setInsurances(sliceData(res.data, new_page, 5));
    });
    setPage(new_page);

    setInsurances(sliceData(insurances, new_page, 5));
  };

  const deleteInsurance = async (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this insurance?"
    );
    if (isConfirm) {
      await axios
        .delete(`http://localhost:3000/api/insurance/${id}`)
        .then((res) => {
          console.log(res.data);
          setInsurances(insurances.filter((insurance) => insurance._id !== id));
        });

      window.location.reload();
      window.location.href = "/insurances";
    }
  };

  return (
    <div className="dashboard-content">
      <>
        <Container className="mt-2">
          <Row>
            <Col className="col-md-4 offset-md-4">
              <DashboardHeader
                btnText="Add Insurance"
                onClick={() => {
                  window.location.href = "/add-insurance";
                }}
              />
            </Col>
          </Row>
          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <h2>Insurance List</h2>
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
                <th style={{ width: "15%" }}> NAME</th>
                <th style={{ width: "20%" }}> EMAIL</th>
                <th style={{ width: "25%" }}>ADDRESS</th>
                <th style={{ width: "25%" }}>INSURER</th>
                <th>ACTIONS</th>
              </thead>
              {insurances.length !== 0 ? (
                <tbody>
                  {insurances.map((insurance) => (
                    <tr key={insurance.id}>
                      <td>{insurance.name}</td>
                      <td>{insurance.email}</td>

                      <td>
                        <ul>
                          <li key={insurance.address.id}>
                            Street: {insurance.address.street}
                          </li>
                          <li key={insurance.address.id}>
                            City: {insurance.address.city}
                          </li>
                          <li key={insurance.address.id}>
                            City: {insurance.address.city}
                          </li>

                          <li key={insurance.address.id}>
                            ZipCode: {insurance.address.zipCode}
                          </li>
                          <li key={insurance.address.id}>
                            Country: {insurance.address.country}
                          </li>
                        </ul>
                      </td>
                      <td>
                        <li key={insurance.insurer.id}>
                          FullName: {insurance.insurer.fullName}
                        </li>
                        <li key={insurance.insurer.insurerAddress.id}>
                          Street: {insurance.insurer.insurerAddress.street}
                        </li>
                        <li key={insurance.insurer.insurerAddress.id}>
                          City: {insurance.insurer.insurerAddress.city}
                        </li>
                        <li key={insurance.insurer.insurerAddress.id}>
                          City: {insurance.insurer.insurerAddress.city}
                        </li>

                        <li key={insurance.insurer.insurerAddress.id}>
                          ZipCode: {insurance.insurer.insurerAddress.zipCode}
                        </li>
                        <li key={insurance.insurer.insurerAddress.id}>
                          Country: {insurance.insurer.insurerAddress.country}
                        </li>
                      </td>
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
                            deleteInsurance(insurance.id);
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
            {insurances.length !== 0 ? (
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

export default ListInsuranceComponent;
