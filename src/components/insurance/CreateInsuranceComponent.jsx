import React, { useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";

const CreateInsuranceComponent = () => {
  const name = useRef("");
  const email = useRef("");
  const siret = useRef("");
  const requirements = useRef("");
  const taxIntra = useRef("");
  const type = useRef("");
  const accountNumber = useRef("");
  const address = useRef({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const insurer = useRef({
    fullName: "",
    insurerAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",

      country: "",
    },
  });

  const addInsurance = () => {
    var payload = {
      name: name.current.value,
      email: email.current.value,
      siret: siret.current.value,
      requirements: requirements.current.value,
      taxIntra: taxIntra.current.value,
      type: type.current.value,
      accountNumber: accountNumber.current.value,
      address: {
        street: address.current.street.value,
        city: address.current.city.value,
        state: address.current.state.value,
        zipCode: address.current.zipCode.value,
        country: address.current.country.value,
      },
      insurer: {
        fullName: insurer.current.fullName.value,
        insurerAddress: {
          street: insurer.current.insurerAddress.street.value,
          city: insurer.current.insurerAddress.city.value,
          state: insurer.current.insurerAddress.state.value,
          zipCode: insurer.current.insurerAddress.zipCode.value,
          country: insurer.current.insurerAddress.country.value,
        },
      },
    };

    axios.post("http://localhost:3000/api/insurance", payload).then((res) => {
      console.log(res);
      window.location.reload();
      window.location.href = "/";
    });
  };

  return (
    <>
      <div className="card m-3">
        <h5 className="card-header">Add Insurance</h5>
        <div className="card-body">
          <Container className="mt-2">
            <div className="container">
              <Row>
                <Col className="col-md-6 offset-md-3">
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      ref={name}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      ref={email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSiret">
                    <Form.Label>Siret</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Siret"
                      ref={siret}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formRequirements">
                    <Form.Label>Requirements</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Requirements"
                      ref={requirements}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formTaxIntra">
                    <Form.Label>TaxIntra</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter TaxIntra"
                      ref={taxIntra}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Type"
                      ref={type}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formAccountNumber">
                    <Form.Label>AccountNumber</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter AccountNumber"
                      ref={accountNumber}
                    />
                  </Form.Group>
                  <h5 className="card-header">Address</h5>
                  <div className="row">
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Street"
                          ref={(node) => (address.current.street = node)}
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter City"
                          ref={(node) => (address.current.city = node)}
                        />
                      </Form.Group>
                    </div>

                    <div className="form-group col-4">
                      {" "}
                      <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter State"
                          ref={(node) => (address.current.state = node)}
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formZipCode">
                        <Form.Label>ZipCode</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter ZipCode"
                          ref={(node) => (address.current.zipCode = node)}
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Country"
                          ref={(node) => (address.current.country = node)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <h5 className="card-header">Insurer</h5>
                  <div className="row">
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label>FullName</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter FullName"
                          ref={(node) => (insurer.current.fullName = node)}
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Street"
                          ref={(node) =>
                            (insurer.current.insurerAddress.street = node)
                          }
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter City"
                          ref={(node) =>
                            (insurer.current.insurerAddress.city = node)
                          }
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter State"
                          ref={(node) =>
                            (insurer.current.insurerAddress.state = node)
                          }
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formZipCode">
                        <Form.Label>ZipCode</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter ZipCode"
                          ref={(node) =>
                            (insurer.current.insurerAddress.zipCode = node)
                          }
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-4">
                      <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Country"
                          ref={(node) =>
                            (insurer.current.insurerAddress.country = node)
                          }
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <button className="btn btn-primary" onClick={addInsurance}>
                    Add Insurance
                  </button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default CreateInsuranceComponent;
