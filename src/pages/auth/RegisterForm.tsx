import L from "leaflet";
import Layout from "../../components/Layout";
import { useState } from "react";
import { Form, Button, Container, Row, Col, ProgressBar, Alert } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { jwtDecode } from "jwt-decode";


interface UserToken {
    user_token: string;
}
interface FormUsername {
    username: string;
}
const RegisterForm: React.FC = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [alerts, setAlerts] = useState<{
        id: number;
        variant: string;
        message: string;
        show: boolean;
    }[]>([]);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [formUsername, setFormUsername] = useState<FormUsername>({
        username: '',
    });

const [step, setStep] = useState(1);

const handleShowAlert = (variant: string, message: string) => {
    const newAlert = {
        id: Date.now(),
        variant,
        message,
        show: true,
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    // esconde la alert luego de 5 segundos
    setTimeout(() => {
        setAlerts((prevAlerts) =>
            prevAlerts.map((alert) =>
                alert.id === newAlert.id ? { ...alert, show: false } : alert
            )
        );
    }, 5000); // 5000 ms = 5 segundos
};
    
    const handleHideAlert = (id: number) => {
    setAlerts((prevAlerts) =>
        prevAlerts.map((alert) => (alert.id === id ? { ...alert, show: false } : alert))
    );
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormUsername({ ...formUsername, [name]: value });
    };

const nextStep = async () => {
    // register user
    if(step === 1){
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
            handleShowAlert('warning', 'warning_all_fields_required');
            return;
        }
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });
    
            const data = await response.json()
    
            if (!response.ok) {
                handleShowAlert('danger', data.message);
            } else {
                //handleShowAlert('success', data.message);
                setStep(step + 1);
            }
        } catch (error) {
            console.log(error)
            handleShowAlert('danger', 'Network error. Please try again later.');
        }
    }else if(step === 2){
        /// register location. puede ser omitido
        if (!position) {
            setStep(3)
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/users/auth/validate", {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            
            if (response.ok) {
                // decodifica la cookie
                const user_token_cookie = jwtDecode<UserToken>(data.token);        
                try {

                    // registra la ubicacion
                    const locationResponse = await fetch(import.meta.env.VITE_API_URL + "/locations/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            user_token: user_token_cookie.user_token,
                            latitude: position[0],
                            longitude: position[1]
                        })
                    });
        
                    const locationData = await locationResponse.json();

                    if (!locationResponse.ok) {
                        if (locationData.message === "error_location_already_registered") {
                            handleShowAlert('warning', locationData.message);
                        } else {
                            handleShowAlert('danger', locationData.message);
                        }
                    } else {
                        // sigueinte paso si se registra correctamente
                        setStep(3);

                    }
                } catch (error) {
                    console.error('Error:', error);
                    handleShowAlert('danger', 'Network error. Please try again later.');
                }
            } else {
                // recargar la pagina sino redirige a login
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
        }
            
        
    }else if(step === 3){
        if(!formUsername.username.trim()){
            handleShowAlert('warning', 'warning_all_fields_required');
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/users/auth/validate", {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            
            if (response.ok) {
                // decodifica la cookie
                const user_token_cookie = jwtDecode<UserToken>(data.token);   
                try {
                    const response = await fetch(import.meta.env.VITE_API_URL + "/users/update-username", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            user_token: user_token_cookie,
                            username: formUsername.username
                        }),
                    });
        
                    const data = await response.json();
                    if(!response.ok){
                        handleShowAlert("danger", data.message)
                        return;
                    }else{
                        window.location.href = import.meta.env.VITE_APP_URL + "/map"
                    }
                } catch (error) {
                    console.log(error)
                    handleShowAlert('danger', 'Network error. Please try again later.');
                }


            } else {
                // recargar la pagina sino redirige a login
                window.location.href = import.meta.env.VITE_APP_URL + "/map";
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
};

const skipStep = () => {
    if (step === 2) {
        setStep(3);
    }else if (step === 3) {
        setStep(3);
    }
    

    setStep(step + 1)
};
const prevStep = () => setStep(step - 1);

    // Leaflet Config
    const MapClickHandler = () => {
        useMapEvents({
            click: (event) => {
                const { lat, lng } = event.latlng;
                setPosition([lat, lng]);
            },
        });
        return null;
    };

    const handleMarkerDrag = (event: L.DragEndEvent) => {
        const marker = event.target as L.Marker;
        const { lat, lng } = marker.getLatLng();
        setPosition([lat, lng]);
    };

    const customIcon = new L.Icon({
        iconUrl: import.meta.env.VITE_APP_URL + "/images/marker.png",
        iconSize: [28, 38],
    });

    return (
        <Layout title="Register">
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <ProgressBar now={(step / 3) * 100} label={`${step}/3 Steps`} className="mb-4" />
                            {alerts.map((alert) =>
                                alert.show ? (
                                <Alert key={alert.id} variant={alert.variant} onClose={() => handleHideAlert(alert.id)} dismissible>
                                    {alert.message}
                                </Alert>
                                ) : null
                            )}
                        {step === 1 && (
                            <>
                                <h1 className="text-center">Signup to Furmap</h1>
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

                                <Button variant="secondary" disabled={step === 2 ? true : false} onClick={prevStep} className="me-2">
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
                                <Form>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your username"
                                            name="username"
                                            value={formUsername.username}
                                            onChange={handleSelectUsername}
                                        />
                                    </Form.Group>

                                    <Button variant="secondary" disabled={step === 3 ? true : false} onClick={prevStep} className="me-2">
                                        Back
                                    </Button>
                                    <Button variant="success" onClick={nextStep}>
                                        Finish Registration
                                    </Button>
                                </Form>
                                
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default RegisterForm;
