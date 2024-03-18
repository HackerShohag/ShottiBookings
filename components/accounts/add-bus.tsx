import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import ShowHidePassword from "../ShowHidePassword";
import { siteConfig } from "@/config/site";
import { useSession } from "next-auth/react";

interface AddBusProps {
  handleSubmit?: () => void;
}

export const AddBus: React.FC<AddBusProps> = (props) => {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isSuccessOpen, onOpen: onSuccessOpen, onOpenChange: onSuccessOpenChange, onClose: onSuccessClose } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen, onOpenChange: onErrorOpenChange, onClose: onErrorClose } = useDisclosure();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [routeFrom, setRouteFrom] = useState("");
  const [routeTo, setRouteTo] = useState("");
  const [capacity, setCapacity] = useState(0);

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [busNumberError, setBusNumberError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [routeFromError, setRouteFromError] = useState("");
  const [routeToError, setRouteToError] = useState("");
  const [capacityError, setCapacityError] = useState("");

  const [fullNameFocusChanged, setFullNameFocusChanged] = useState(false);
  const [emailFocusChanged, setEmailFocusChanged] = useState(false);
  const [busNumberFocusChanged, setBusNumberFocusChanged] = useState(false);
  const [categoryFocusChanged, setCategoryFocusChanged] = useState(false);
  const [passwordFocusChanged, setPasswordFocusChanged] = useState(false);
  const [confirmPasswordFocusChanged, setConfirmPasswordFocusChanged] = useState(false);
  const [companyNameFocusChanged, setCompanyNameFocusChanged] = useState(false);
  const [routeFromFocusChanged, setRouteFromFocusChanged] = useState(false);
  const [routeToFocusChanged, setRouteToFocusChanged] = useState(false);
  const [capacityFocusChanged, setCapacityFocusChanged] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const user = 'bus'

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01\d{9}$/;
    let isValid = true;

    if (fullNameFocusChanged) {
      if (fullName.trim() === "") {
        setFullNameError("Please enter your name");
        isValid = false;
      } else {
        setFullNameError("");
      }
    }

    if (emailFocusChanged) {
      if (email.trim() === "") {
        setEmailError("Please enter your email");
        isValid = false;
      } else if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address");
        isValid = false;
      } else {
        setEmailError("");
      }
    }

    if (busNumberFocusChanged) { // Changed state name to busNumberFocusChanged
      if (busNumber.trim() === "") { // Changed state name to busNumber
        setBusNumberError("Please enter the bus number"); // Changed state name to busNumberError
        isValid = false;
      } else {
        setBusNumberError(""); // Changed state name to busNumberError
      }
    }

    if (categoryFocusChanged) {
      if (category.trim() === "") {
        setCategoryError("Please select your category");
        isValid = false;
      } else {
        setCategoryError("");
      }
    }

    if (passwordFocusChanged) {
      if (password.trim() === "") {
        setPasswordError("Please enter your password");
        isValid = false;
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
        isValid = false;
      } else if (!/\d/.test(password)) {
        setPasswordError("Password must contain at least one digit");
        isValid = false;
      } else if (!/[a-z]/.test(password)) {
        setPasswordError("Password must contain at least one lowercase letter");
        isValid = false;
      } else if (!/[A-Z]/.test(password)) {
        setPasswordError("Password must contain at least one uppercase letter");
        isValid = false;
      } else {
        setPasswordError("");
      }
    }

    if (confirmPasswordFocusChanged) {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      } else {
        setConfirmPasswordError("");
      }
    }

    if (routeFromFocusChanged) { // Added validation for routeFrom
      if (routeFrom.trim() === "") {
        setRouteFromError("Please enter the route from");
        isValid = false;
      } else {
        setRouteFromError("");
      }
    }

    if (routeToFocusChanged) { // Added validation for routeTo
      if (routeTo.trim() === "") {
        setRouteToError("Please enter the route to");
        isValid = false;
      } else {
        setRouteToError("");
      }
    }

  }, [fullName, email, busNumber, category, password, confirmPassword, companyName, routeFrom, routeTo, fullNameFocusChanged, emailFocusChanged, busNumberFocusChanged, categoryFocusChanged, passwordFocusChanged, confirmPasswordFocusChanged, companyNameFocusChanged, routeFromFocusChanged, routeToFocusChanged, user]);

  const handleAddBus = () => {
    setErrorMessage('');

    if (
      fullNameError !== "" ||
      emailError !== "" ||
      busNumberError !== "" || // Changed state name to busNumberError
      categoryError !== "" ||
      passwordError !== "" ||
      confirmPasswordError !== "" ||
      companyNameError !== "" || // Added companyNameError to the condition
      routeFromError !== "" || // Added routeFromError to the condition
      routeToError !== "" // Added routeToError to the condition
    ) {
      onErrorOpen();
      return;
    }

    interface route {
      from: string;
      to: string;
    }

    interface BusType {
      companyName: string;
      no: string;
      capacity: number;
      category: string;
      slot: string[];
    }

    const busData: BusType = {
      companyName: fullName,
      no: busNumber,
      capacity: capacity,
      category: category,
      slot: []
    };

    setProcessing(true);
    const response = fetch(siteConfig.backendServer.address + '/bus/create-' + user, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "" + session?.accessToken
      },
      body: JSON.stringify(busData)
    })
      .then(response => response.json())
      .then(data => {
        if (data?.ok) {
          setSuccess(true);
          setErrorMessage('');
          onClose();
          return true;
        } else {
          setErrorMessage('Unknown Error Occured!');
        }
        setProcessing(false);
        return false;
      })
      .catch(err => {
        setErrorMessage('Unknown Error Occured!');
        setProcessing(false);
        return false;
      })
    if (success) {
      onClose();
    }
    onSuccessOpen();
    setSuccessMessage('');
    setSuccessMessage(user + " Creation Successful!")

    return false;
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add {user ? user : "User"}
      </Button>
      <Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (

            processing ? <Spinner className="w-full h-full p-20" /> :
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add {user ? user : "User"}
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Company Name"
                    variant="bordered"
                    value={fullName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setFullName(e.target.value);
                    }}
                    errorMessage={fullNameError}
                    onFocus={() => setFullNameFocusChanged(true)}
                  />
                  <Input
                    label="Bus Number"
                    variant="bordered"
                    value={busNumber} // Changed state name to busNumber
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setBusNumber(e.target.value); // Changed state name to busNumber
                    }}
                    errorMessage={busNumberError} // Changed state name to busNumberError
                    onFocus={() => setBusNumberFocusChanged(true)} // Changed state name to busNumberFocusChanged
                  />
                  <Input
                    label="Capacity"
                    variant="bordered"
                    type="numeric"
                    value={capacity.toString()}
                    errorMessage={capacityError}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setCapacity(parseInt(e.target.value));
                    }}
                    onFocus={() => setBusNumberFocusChanged(true)}
                  />
                  <Select
                    label="Category"
                    variant="bordered"
                    value={category}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setCategory(e.target.value);
                    }}
                    errorMessage={categoryError}
                    onFocus={() => setCategoryFocusChanged(true)}
                  >
                    <SelectItem key="AC">AC</SelectItem>
                    <SelectItem key="Non-AC">Non-AC</SelectItem>
                  </Select>

                  <Input
                    label="Route From"
                    variant="bordered"
                    value={routeFrom}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setRouteFrom(e.target.value);
                    }}
                    errorMessage={routeFromError}
                    onFocus={() => setRouteFromFocusChanged(true)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => { if (handleAddBus()) { onClose() } }}>
                    Add {user ? user : "User"}
                  </Button>
                </ModalFooter>
              </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isErrorOpen} onOpenChange={onErrorOpenChange} placement="top-center">
        <ModalContent>
          <ModalBody>
            {errorMessage ? errorMessage : "Please fill up all the fields."}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onErrorClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isSuccessOpen} onOpenChange={onSuccessOpenChange} placement="top-center">
        <ModalContent>
          <ModalBody>
            {successMessage ? successMessage : "User Creation Failed!"}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onSuccessClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
