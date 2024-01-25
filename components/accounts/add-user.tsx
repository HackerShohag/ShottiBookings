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

interface AddUserProps {
  userType?: string;
  handleSubmit?: () => void;
}

export const AddUser: React.FC<AddUserProps> = (props) => {

  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen, onOpenChange: onErrorOpenChange, onClose: onErrorClose } = useDisclosure();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [fullNameFocusChanged, setFullNameFocusChanged] = useState(false);
  const [emailFocusChanged, setEmailFocusChanged] = useState(false);
  const [phoneNumberFocusChanged, setPhoneNumberFocusChanged] = useState(false);
  const [genderFocusChanged, setGenderFocusChanged] = useState(false);
  const [passwordFocusChanged, setPasswordFocusChanged] = useState(false);
  const [confirmPasswordFocusChanged, setConfirmPasswordFocusChanged] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const user = {
    admins: "admin",
    operators: "operator",
    drivers: "driver",
    customers: "customer",
  }[props.userType || ''] || "customer";

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

    if (phoneNumberFocusChanged) {
      if (phoneNumber.trim() === "") {
        setPhoneNumberError("Please enter your contact number");
        isValid = false;
      } else if (!phoneRegex.test(phoneNumber)) {
        setPhoneNumberError("Please enter a valid phone number");
        isValid = false;
      } else {
        setPhoneNumberError("");
      }
    }

    if (genderFocusChanged) {
      if (gender.trim() === "") {
        setGenderError("Please select your gender");
        isValid = false;
      } else {
        setGenderError("");
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
  }, [
    fullName,
    email,
    phoneNumber,
    gender,
    password,
    confirmPassword,
    fullNameFocusChanged,
    emailFocusChanged,
    phoneNumberFocusChanged,
    genderFocusChanged,
    passwordFocusChanged,
    confirmPasswordFocusChanged,
  ]);

  const handleAddUser = () => {
    setErrorMessage('');

    if (
      fullNameError !== "" ||
      emailError !== "" ||
      phoneNumberError !== "" ||
      genderError !== "" ||
      passwordError !== "" ||
      confirmPasswordError !== ""
    ) {
      onErrorOpen();
      return;
    }

    interface MemberType {
      password: string;
      user: {
        name: string;
        email: string;
        contactNo: string;
        gender: string;
        password: string;
      };
    }

    const userData: MemberType = {
      password: password,
      user: {
        name: fullName,
        email: email,
        contactNo: phoneNumber,
        gender: gender,
        password: password,
      },
    };

    setProcessing(true);
    const response = fetch(siteConfig.backendServer.address + '/user/create-' + user, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "" + session?.accessToken
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        if (data?.ok) {
          setSuccess(true);
          setErrorMessage('');
          onClose();
        } else {
          setErrorMessage('Unknown Error Occured!');
        }
        setProcessing(false);
        return true;
      })
      .catch(err => {
        setErrorMessage('Unknown Error Occured!');
        setProcessing(false);
        return false;
      })
    return false;
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add {props.userType ? props.userType : "User"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (

            processing ? <Spinner className="w-full h-full p-20" /> :
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add {props.userType ? props.userType : "User"}
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Full Name"
                    variant="bordered"
                    value={fullName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setFullName(e.target.value);
                    }}
                    errorMessage={fullNameError}
                    onFocus={() => setFullNameFocusChanged(true)}
                  />
                  <Input
                    label="Email"
                    variant="bordered"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                    errorMessage={emailError}
                    onFocus={() => setEmailFocusChanged(true)}
                  />
                  <Input
                    label="Phone Number"
                    variant="bordered"
                    value={phoneNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPhoneNumber(e.target.value);
                    }}
                    errorMessage={phoneNumberError}
                    onFocus={() => setPhoneNumberFocusChanged(true)}
                  />
                  <Select
                    label="Gender"
                    variant="bordered"
                    value={gender}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setGender(e.target.value);
                    }}
                    errorMessage={genderError}
                    onFocus={() => setGenderFocusChanged(true)}
                  >
                    <SelectItem key="male">Male</SelectItem>
                    <SelectItem key="female">Female</SelectItem>
                    <SelectItem key="others">Others</SelectItem>
                  </Select>

                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="bordered"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                    errorMessage={passwordError}
                    endContent={<ShowHidePassword onClick={setShowPassword} />}
                    onFocus={() => setPasswordFocusChanged(true)}
                  />
                  <Input
                    label="Confirm Password"
                    type={showConfirmPass ? "text" : "password"}
                    variant="bordered"
                    value={confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setConfirmPassword(e.target.value);
                    }}
                    errorMessage={confirmPasswordError}
                    endContent={<ShowHidePassword onClick={setShowConfirmPass} />}
                    onFocus={() => setConfirmPasswordFocusChanged(true)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => { handleAddUser() }}>
                    Add {props.userType ? props.userType : "User"}
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
    </>
  );
};
