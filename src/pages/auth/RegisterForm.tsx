import L from "leaflet";
import Layout from "../../components/Layout";
import { useState } from "react";
import { Form, Button, Container, Row, Col, ProgressBar, Alert } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

const RegisterForm: React.FC = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [step, setStep] = useState<number>(1);
    const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        password: string;
    }>({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const nextStep = async () => {
        // VERIFICA SI LOS CAMPOS ESTAN VACIOS  
        if (!formData.name || !formData.email || !formData.password) {
            setShowAlert(true);
            return;
        }
    // TODO: VERIFICAR SI EL NOMBRE DE USUARIO YA ESTA REGISTRADO O NO
        /* try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/auth/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: formData.email }),
            });
    
            if (!response.ok) {
                throw new Error("El correo ya está registrado.");
            }
    
            setShowAlert(false);
            setStep(step + 1);
        } catch (error) {
            console.error(error);
            alert("Hubo un problema con la validación.");
        } */
        setShowAlert(false);
        setStep(step + 1);
    };

    const skipStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Form submitted:", formData, position);
    };

    // Leaflet Config
    const MapClickHandler = () => {
        useMapEvents({
            click: (event) => {
                const { lat, lng } = event.latlng;
                setPosition([lat, lng]);
                console.log(`Marker position: ${lat}, ${lng}`);
            },
        });
        return null;
    };

    const handleMarkerDrag = (event: L.DragEndEvent) => {
        const marker = event.target as L.Marker;
        const { lat, lng } = marker.getLatLng();
        setPosition([lat, lng]);
        console.log(`Marker position: ${lat}, ${lng}`);
    };

    const customIcon = new L.Icon({
        iconUrl: import.meta.env.VITE_APP_URL + "/images/marker.png",
        iconSize: [28, 38],
    });

    return (
        <Layout title="Login">
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <ProgressBar now={(step / 3) * 100} label={`${step}/3 Steps`} className="mb-4" />
                        {step === 1 && (
                            <>
                                <h1 className="text-center">Signup to Furmap</h1>
                                
                                {showAlert && (
                                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                                        error_all_fields_requierd
                                    </Alert>
                                )}
                                
                                <Form>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" onClick={nextStep}>
                                        Next
                                    </Button>
                                </Form>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h1 className="text-center">Add your location</h1>
                                <div className="mb-3">
                                    <MapContainer
                                        center={[30.0, 0]}
                                        zoom={2}
                                        style={{ height: '400px', width: '100%', borderRadius: "1rem" }}
                                        maxBounds={[
                                            [-90, -180],
                                            [90, 180],
                                        ]}
                                        maxBoundsViscosity={1.0}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <MapClickHandler />
                                        {position && (
                                            <Marker
                                                position={position}
                                                draggable={true}
                                                eventHandlers={{
                                                    dragend: handleMarkerDrag,
                                                }}
                                                icon={customIcon}
                                            >
                                                <Popup>
                                                    Drag this marker to change its position.
                                                </Popup>
                                            </Marker>
                                        )}
                                    </MapContainer>
                                    <small className="text-muted">Your location doesn't need to be exact; it will be adjusted to a maximum of 1 km.</small>
                                </div>

                                <Button variant="secondary" onClick={prevStep} className="me-2">
                                    Back
                                </Button>
                                <Button variant="warning" onClick={skipStep} className="me-2">
                                    Skip
                                </Button>
                                <Button variant="primary" onClick={nextStep}>
                                    Next
                                </Button>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <h1 className="text-center">Select your username</h1>

                                <Button variant="secondary" onClick={prevStep} className="me-2">
                                    Back
                                </Button>
                                <Button variant="success" onClick={handleSubmit}>
                                    Register
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default RegisterForm;
