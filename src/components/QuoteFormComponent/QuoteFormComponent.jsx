import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import {
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { mixed, object, string } from "yup";
import { BASE_URL } from "../../helpers/general";

// Redux

// i18next
import { useTranslation } from "react-i18next";

// Styles
import "./QuoteFormComponent.styles.css";

// Components
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const QuoteFormComponent = () => {
  // i18next
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(lang ?? "ar");
    // eslint-disable-next-line
  }, [lang]);

  const FILE_SIZE = 5120 * 1024; // 5120 KB = 5 MB
  const SUPPORTED_FORMATS = [
    // .pdf
    "application/pdf",
    // .doc
    "application/msword",
    // .docx
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // .ppt
    "application/vnd.ms-powerpoint",
    // pptx
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    // .xls
    "application/vnd.ms-excel",
    // .xlsx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // .txt
    "text/plain",
  ];

  // Refs
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);
  const fileRef = useRef(null);
  const fileNameRef = useRef(null);
  const fileInputGroupRef = useRef(null);

  // Schema
  const quoteSchema = object().shape({
    fname: string()
      .min(2, t("validations:firstName.min", { min: 2 }))
      .max(100, t("validations:firstName.max", { max: 100 }))
      .required(t("validations:firstName.required")),
    lname: string()
      .min(2, t("validations:lastName.min", { min: 2 }))
      .max(100, t("validations:lastName.max", { max: 100 }))
      .required(t("validations:lastName.required")),
    email: string()
      .email(t("validations:email.format"))
      .required(t("validations:email.required")),
    phone: string()
      .min(6, t("validations:phone.min", { min: 6 }))
      .matches(/^[0-9+]+/, t("validations:phone.format"))
      .required(t("validations:phone.required")),
    message: string()
      .min(2, t("validations:message.min", { min: 2 }))
      .max(500, t("validations:message.max", { max: 500 }))
      .required(t("validations:message.required")),
    file: mixed()
      .nullable()
      .notRequired()
      .test(
        "fileFormat",
        t("validations:file.type"),
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
      )
      .test(
        "fileSize",
        t("validations:file.size"),
        (value) => !value || (value && value.size <= FILE_SIZE)
      ),
  });

  // Handle Form Errors
  const displayErrors = (fieldName) => {
    switch (fieldName) {
      case "fname":
        firstNameRef.current.classList.add("is-invalid");
        break;

      case "lname":
        lastNameRef.current.classList.add("is-invalid");
        break;

      case "email":
        emailRef.current.classList.add("is-invalid");
        break;

      case "phone":
        phoneRef.current.classList.add("is-invalid");
        break;

      case "message":
        messageRef.current.classList.add("is-invalid");
        break;

      case "file":
        fileRef.current.classList.add("is-invalid");
        fileInputGroupRef.current.classList.add("is-invalid");
        break;

      default:
        break;
    }
  };

  // Display Form Errors
  const displayToast = (statusCode, message) => {
    switch (statusCode) {
      case 200:
        toast.success(message, {
          toastId: message,
        });
        break;
      case 400:
        toast.error(message, {
          toastId: message,
        });
        break;
      default:
        toast.error(t("sentences:errors.default"));
        break;
    }
  };

  const submitQuoteForm = async (
    values,
    setSubmitting,
    resetForm,
    language = "ar"
  ) => {
    console.log(values);
    axios({
      method: "POST",
      baseURL: BASE_URL.demo,
      url: "/request_quote",
      data: {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        phone: values.phone,
        message: values.message,
        file: values.file,
      },
      headers: { locale: language, "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        // reset form fields
        resetForm(true);

        displayToast(response.status, response.data.message);
      })
      .catch((error) => {
        if (error.response.data.data !== {}) {
          Object.keys(error.response.data.data).forEach((key) => {
            displayErrors(key);
            displayToast(
              error.response.status,
              error.response.data.data[key][0]
            );
          });
        } else {
          displayToast(error.response.status, error.response.data.message);
        }
      })
      .finally(() => {
        // reset submitting
        setSubmitting(false);
      });
  };

  return (
    <Container
      fluid
      lang={lang ?? "ar"}
      dir={lang === "en" ? "ltr" : "rtl"}
      className="quote-form-component px-0"
    >
      <Row xs={1}>
        <Col className="d-flex justify-content-center align-items-center">
          <Formik
            initialValues={{
              fname: "",
              lname: "",
              email: "",
              phone: "",
              message: "",
              file: null,
              filename: "",
            }}
            validationSchema={quoteSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              submitQuoteForm(values, setSubmitting, resetForm, lang);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                <Row xs={1} sm={2} md={1} lg={2} className="overflow-hidden">
                  {/* First Name */}
                  <Fade direction={lang === "en" ? "left" : "right"} delay={20}>
                    <FormGroup as={Col} className="mb-3">
                      <FormLabel
                        htmlFor="first_name"
                        className="text-capitalize"
                      >
                        {t("words:labels.firstName")}
                      </FormLabel>
                      <Field
                        id="first_name"
                        type="text"
                        innerRef={firstNameRef}
                        placeholder={t("words:placeholders.firstName")}
                        autoComplete="off"
                        name="fname"
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        onBlur={handleBlur}
                        value={values.fname}
                        className={`form-control text-capitalize ${
                          touched.fname && errors.fname ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component={FormControl.Feedback}
                        name="fname"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </Fade>

                  {/* Last Name */}
                  <Fade direction={lang === "en" ? "right" : "left"} delay={20}>
                    <FormGroup as={Col} className="mb-3">
                      <FormLabel
                        htmlFor="last_name"
                        className="text-capitalize"
                      >
                        {t("words:labels.lastName")}
                      </FormLabel>
                      <Field
                        id="last_name"
                        type="text"
                        innerRef={lastNameRef}
                        placeholder={t("words:placeholders.lastName")}
                        autoComplete="off"
                        name="lname"
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        onBlur={handleBlur}
                        value={values.lname}
                        className={`form-control text-capitalize ${
                          touched.lname && errors.lname ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component={FormControl.Feedback}
                        name="lname"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </Fade>

                  {/* Email */}
                  <Fade direction={lang === "en" ? "left" : "right"} delay={40}>
                    <FormGroup as={Col} className="mb-3">
                      <FormLabel htmlFor="email" className="text-capitalize">
                        {t("words:labels.email")}
                      </FormLabel>
                      <Field
                        id="email"
                        type="email"
                        innerRef={emailRef}
                        placeholder="mail@domain.com"
                        autoComplete="off"
                        name="email"
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component={FormControl.Feedback}
                        name="email"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </Fade>

                  {/* Mobile Number */}
                  <Fade direction={lang === "en" ? "right" : "left"} delay={40}>
                    <FormGroup as={Col} className="mb-3">
                      <FormLabel htmlFor="phone" className="text-capitalize">
                        {t("words:labels.phone")}
                      </FormLabel>
                      <Field name="phone" innerRef={phoneRef}>
                        {(field, form, meta) => (
                          <>
                            <PhoneInput
                              {...field}
                              id="phone"
                              dir="ltr"
                              ref={phoneRef}
                              placeholder="56 123 0620"
                              defaultCountry="SA"
                              autoComplete="off"
                              onChange={(event) => {
                                setFieldValue("phone", event);
                              }}
                              onBlur={handleBlur}
                              value={values.phone}
                              className={`${
                                field.meta.touched && field.meta.error
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            {field.meta.error && (
                              <FormControl.Feedback className="invalid-feedback p-0">
                                {field.meta.error}
                              </FormControl.Feedback>
                            )}
                          </>
                        )}
                      </Field>
                    </FormGroup>
                  </Fade>
                </Row>

                <Row xs={1} className="overflow-hidden">
                  {/* File */}
                  <Fade direction="down" delay={60}>
                    <FormGroup as={Col} className="mb-3">
                      <FormLabel className="text-capitalize">
                        {t("words:labels.file")}
                      </FormLabel>
                      <InputGroup
                        ref={fileInputGroupRef}
                        className={`${errors.file ? "is-invalid" : ""}`}
                      >
                        <InputGroup.Text
                          id="file-label"
                          className="text-capitalize"
                          onClick={() => fileRef.current.click()}
                        >
                          {t("words:labels.fileInput")}
                        </InputGroup.Text>

                        {/* File Name */}
                        <Field
                          readOnly
                          id="filename"
                          type="text"
                          aria-label="Choose File"
                          aria-describedby="file-label"
                          innerRef={fileNameRef}
                          placeholder={t("words:placeholders.fileName")}
                          autoComplete="off"
                          name="filename"
                          onChange={(event) => {
                            handleChange(event);
                          }}
                          onBlur={handleBlur}
                          onClick={() => fileRef.current.click()}
                          value={values.filename}
                          className={`form-control ${
                            touched.filename && errors.filename
                              ? "is-invalid"
                              : ""
                          }`}
                        />

                        {/* Actual Hidden File */}
                        <Field
                          hidden
                          id="file"
                          type="file"
                          aria-label="Choose File"
                          aria-describedby="file-label"
                          accept="application/*"
                          innerRef={fileRef}
                          placeholder={t("words:placeholders.file")}
                          autoComplete="off"
                          name="file"
                          onChange={(event) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                            setFieldValue(
                              "filename",
                              event.currentTarget.files[0].name
                            );
                          }}
                          onBlur={handleBlur}
                          value={""}
                          className={`form-control ${
                            touched.file && errors.file ? "is-invalid" : ""
                          }`}
                        />
                      </InputGroup>

                      {/* File Hints */}
                      <FormText className="d-block text-muted">
                        {t("words:hints.file.size", {
                          max: new Intl.NumberFormat(
                            lang === "en" ? "en-US" : "ar-EG",
                            {}
                          ).format(FILE_SIZE / 1024 / 1024),
                        })}
                      </FormText>
                      <FormText className="text-muted d-flex align-items-center">
                        <div>{t("words:hints.file.type")}</div>
                        <div
                          className={`${lang === "en" ? "ms-1" : "me-1"}`}
                          style={{ direction: "ltr" }}
                        >
                          {".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt"}
                        </div>
                      </FormText>

                      {errors.file && (
                        <FormControl.Feedback className="invalid-feedback p-0 d-block">
                          {errors.file}
                        </FormControl.Feedback>
                      )}
                    </FormGroup>
                  </Fade>
                </Row>

                <Row xs={1} className="overflow-hidden">
                  {/* Message */}
                  <Fade direction="down" delay={70}>
                    <FormGroup as={Col} className=" mb-3 position-relative">
                      <FormLabel htmlFor="message" className="text-capitalize">
                        {t("words:labels.message")}
                      </FormLabel>
                      <Field
                        id="message"
                        as="textarea"
                        innerRef={messageRef}
                        rows={8}
                        style={{
                          resize: "none",
                        }}
                        placeholder={t("words:placeholders.message")}
                        autoComplete="off"
                        name="message"
                        onChange={(event) => {
                          handleChange(event);
                        }}
                        onBlur={handleBlur}
                        value={values.message}
                        className={`form-control text-capitalize ${
                          touched.message && errors.message ? "is-invalid" : ""
                        }`}
                      />
                      <FormText className="text-muted">
                        <span className={`${lang === "en" ? "me-1" : "ms-1"}`}>
                          {new Intl.NumberFormat(
                            lang === "en" ? "en-US" : "ar-EG",
                            {}
                          ).format(values.message.length)}
                        </span>
                        <span>
                          {t("words:hints.message.length", {
                            max: new Intl.NumberFormat(
                              lang === "en" ? "en-US" : "ar-EG",
                              {}
                            ).format(500),
                          })}
                        </span>
                      </FormText>
                      <ErrorMessage
                        component={FormControl.Feedback}
                        name="message"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </Fade>
                </Row>

                {/* Submit Form */}
                <Zoom delay={80}>
                  <FormGroup className="d-flex justify-content-center mt-3">
                    <ButtonComponent
                      text={
                        isSubmitting
                          ? t("words:buttons.sending")
                          : t("words:buttons.submitMessage")
                      }
                      icon={
                        isSubmitting ? (
                          <Spinner
                            animation="grow"
                            variant="dark"
                            size="sm"
                            className={`${lang === "en" ? "me-2" : "ms-2"}`}
                          />
                        ) : (
                          <></>
                        )
                      }
                      type="submit"
                      disabled={isSubmitting ? true : false}
                    />
                  </FormGroup>
                </Zoom>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default QuoteFormComponent;
