"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./realForm.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import phoneCountryCodes from "./phoneCountryCodes.json";
import { FaWhatsapp } from "react-icons/fa";

const ThankYou = ({ ticket, selectedTicket, ticketInfomration, ticketLoading }) => (
    <div className={styles.thankYou}>
        <h2>Thank You for Registering!</h2>
        {selectedTicket === "Stalls" || selectedTicket === "Product Demo + Stall" ? (
            <p>Your registration of interest is successful. Our team will contact you shortly.</p>
        ) : (
            <>
                <p>Your registration is successful. Your ticket is ready to download.</p>
                {ticketInfomration.image && !ticketLoading && (
                    <div className={styles.ticket}>
                        <img
                            src={ticketInfomration.image}
                            className={styles.ticketImage}
                            alt="Ticket"
                        />

                        <button
                            onClick={async () => {
                                try {
                                    const response = await fetch(ticketInfomration.image);
                                    const blob = await response.blob();

                                    const link = document.createElement("a");
                                    link.href = URL.createObjectURL(blob);
                                    link.setAttribute("download", "ticket.png");

                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);

                                    URL.revokeObjectURL(link.href);
                                } catch (error) {
                                    toast.error("Failed to download ticket");
                                }
                            }}
                        >
                            Download Ticket
                        </button>

                        <a
                            className={`${styles.joinWhatsapp}`}
                            href="https://chat.whatsapp.com/BquBgUoRT9fB682F3c6Zu6"
                        >
                            <span className={styles.border}></span>
                            <FaWhatsapp size={30} className={styles.icon} />
                            <p>Join our WhatsApp group and stay updated</p>
                        </a>

                        <p className={styles.noteText}>
                            Your ticket is always available at{" "}
                            <a
                                href="http://makemypass.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                makemypass.com
                            </a>
                            . Kindly, Log in with same registered email address to view it.
                        </p>
                    </div>
                )}

                <div className={styles.loaderContainer}>
                    {ticketLoading && (
                        <>
                            <BeatLoader size={15} color="#7570fd" />
                            <p className={styles.ticketFetchingHelperText}>
                                Getting your ticket ready. Please wait...
                            </p>
                        </>
                    )}
                </div>
            </>
        )}
    </div>
);

const ScaleupForm = ({ selectedTicket }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ticketDetails, setTicketDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ticketInformation, setTicketInformation] = useState({
        image: "",
        ticket_code: "",
    });
    const [ticketLoading, setTicketLoading] = useState(false);

    let eventId;
    if (selectedTicket === "General Ticket" || selectedTicket === "VIP Ticket") {
        eventId = "95585c57-9c47-4808-a57b-b2867b89c1f4";
    } else if (selectedTicket === "Stalls" || selectedTicket === "Product Demo + Stall") {
        eventId = "d959821a-d64a-4962-a17e-ebf34f22d755";
    }

    useEffect(() => {
        window.fbq("track", "CompleteRegistration", {
            content_name: selectedTicket,
        });

        if (
            isSubmitted &&
            (selectedTicket === "General Ticket" || selectedTicket === "VIP Ticket")
        ) {
            setTicketLoading(true);
            axios
                .get(
                    `https://api.buildnship.in/makemypass/manage-guest/${eventId}/guest/${ticketDetails?.event_register_id}/download-ticket/`
                )
                .then((response) => {
                    console.log(response.data.response);
                    setTicketInformation(response.data.response);
                })
                .catch((error) => {
                    toast.error("Failed to fetch ticket information. Please try again.");
                })
                .finally(() => {
                    setTicketLoading(false);
                });
        }
    }, [isSubmitted]);

    const onSubmit = async (data) => {
        // Map form data to the API's expected structure
        const payload = {
            name: data.name,
            phone: `${data.countryCode}${data.phone}`,
            email: data.email,
            district: data.district,
            organization: data.institution,
            category: data.category,
            did_you_attend_the_previous_scaleup_conclave_2024: data.attendedPrevious,
            tickets: [
                {
                    ticket_id: "3b7e4d8d-4462-47ac-8d1e-4a7f0592f085",
                    count: 1,
                    my_ticket: true,
                },
                {
                    ticket_id: "0eb4c20a-2de2-42dc-b792-c609e8eb63c6",
                    count: 1,
                    my_ticket: true,
                },
                {
                    ticket_id: "f3acf45a-f23e-41c8-9e1a-26417da55fdf",
                    count: 1,
                    my_ticket: true,
                },
                {
                    ticket_id: "062fbabb-6242-4adc-84c4-e6e20f9434c5",
                    count: 1,
                    my_ticket: true,
                },
            ],
            utm: {
                source: null,
                medium: null,
                campaign: null,
                term: null,
                content: null,
            },
        };

        const payloadFormData = new FormData();
        if (data.name) payloadFormData.append("name", data.name);
        if (data.countryCode && data.phone)
            payloadFormData.append("phone", `${data.countryCode}${data.phone}`);
        if (data.email) payloadFormData.append("email", data.email);
        if (data.district) payloadFormData.append("district", data.district);
        if (data.institution) payloadFormData.append("organization", data.institution);
        if (data.category) payloadFormData.append("category", data.category);
        if (data.designation) payloadFormData.append("designation", data.designation);
        if (data.organization) payloadFormData.append("organization", data.organization);
        if (data.other_state) payloadFormData.append("other_state", data.other_state);
        if (data.other_category) payloadFormData.append("other_category", data.other_category);
        if(data.stall_type) payloadFormData.append("stall_type", data.stall_type);
        payloadFormData.append(
            "did_you_attend_the_previous_scaleup_conclave_2024",
            data.attendedPrevious
        );

        if (selectedTicket === "General Ticket") {
            payloadFormData.append("__tickets[]", JSON.stringify(payload.tickets[0]));
        } else if (selectedTicket === "VIP Ticket") {
            payloadFormData.append("__tickets[]", JSON.stringify(payload.tickets[1]));
        } else if (selectedTicket === "Stalls") {
            payloadFormData.append("__tickets[]", JSON.stringify(payload.tickets[2]));
        } else if (selectedTicket === "Product Demo + Stall") {
            payloadFormData.append("__tickets[]", JSON.stringify(payload.tickets[3]));
        }

        payloadFormData.append("utm", JSON.stringify(payload.utm));
        setIsLoading(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        axios
            .post(
                `https://api.buildnship.in/makemypass/public-form/${eventId}/submit/`,
                payloadFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.response.gateway_type) {
                        const paymentId = response.data.response.id;
                        const paymentAmount = response.data.response.amount;

                        const options = {
                            key_id: response.data.response.gateway_key,
                            amount: paymentAmount,
                            currency: response.data.response.currency,
                            name: "Scaleup Conclave 2025",
                            description: `MMP - scaleup-2025`,
                            image: "/rpay.webp",
                            order_id: paymentId,
                            handler: function (response) {
                                axios
                                    .post(
                                        "https://api.buildnship.in/makemypass/public-form/validate-payment/",
                                        {
                                            order_id: response.razorpay_order_id,
                                            payment_id: response.razorpay_payment_id,
                                        }
                                    )
                                    .then((response) => {
                                        setTicketDetails(response.data.response); // Store the ticket details
                                        setIsSubmitted(true); // Show the ThankYou component
                                    })
                                    .catch((error) => {
                                        toast.error("Payment failed. Please try again.");
                                    });
                            },
                            theme: {
                                color: "#7570FD",
                            },
                        };

                        const rzp1 = new window.Razorpay(options);
                        rzp1.open();
                    } else {
                        setTicketDetails(response.data.response); // Store the ticket details
                        setIsSubmitted(true); // Show the ThankYou component
                    }
                } else {
                    toast.error("Submission failed. Please try again.");
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const apiErrors = error.response.data.message;

                    // Map the API errors to the form state
                    Object.keys(apiErrors).forEach((field) => {
                        setError(field, {
                            type: "api",
                            message: apiErrors[field].join(", "),
                        });
                    });
                } else {
                    toast.error("Submission failed. Please try again.");
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const districtsInKerala = [
        "Thiruvananthapuram",
        "Kollam",
        "Pathanamthitta",
        "Alappuzha",
        "Kottayam",
        "Idukki",
        "Ernakulam",
        "Thrissur",
        "Palakkad",
        "Malappuram",
        "Kozhikode",
        "Wayanad",
        "Kannur",
        "Kasaragod",
        "Outside Kerala",
    ];

    const categories = [
        "Startups",
        "Working Professionals",
        "Students",
        "Bussiness Owners",
        "NRI / Gulf Retunees",
        "Government Officials",
        "Educators / Teachers",
        "Others",
    ];

    return (
        <div className={styles.realForm}>
            {!isSubmitted ? (
                <div className={styles.head}>
                    <h1>
                        {selectedTicket === "Stalls" || selectedTicket === "Product Demo + Stall"
                            ? "Book"
                            : "Register"}{" "}
                        {selectedTicket}!
                    </h1>
                    <p>
                        {selectedTicket === "Stalls" || selectedTicket === "Product Demo + Stall"
                            ? "Fill in the form details and get your stall to the much awaited event."
                            : "Fill in the form details and get your entry to the much awaited event."}
                    </p>
                </div>
            ) : (
                <ThankYou
                    ticket={ticketDetails}
                    selectedTicket={selectedTicket}
                    ticketInfomration={ticketInformation}
                    ticketLoading={ticketLoading}
                />
            )}

            {!isSubmitted && (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.innerBox}>
                        {(selectedTicket == "Stalls" ||
                            selectedTicket === "Product Demo + Stall") && (
                            <div>
                                <label>
                                    Company Name<span>*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("organization", {
                                        required: "Company Name is required",
                                    })}
                                    placeholder="Enter Company Name"
                                />
                                {errors.organization && (
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        {errors.organization.message}
                                    </p>
                                )}
                            </div>
                        )}
                        {/* Name Field */}
                        <div>
                            <label>
                                Name of Person
                                <span>*</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                placeholder="Enter your name"
                            />
                            {errors.name && (
                                <p style={{ color: "red", fontSize: "0.9rem" }}>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        {(selectedTicket === "Stalls" ||
                            selectedTicket === "Product Demo + Stall") && (
                            <div>
                                <label>
                                    Designation<span>*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("designation", {
                                        required: "Designation is required",
                                    })}
                                    placeholder="Enter designation"
                                />
                                {errors.designation && (
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        {errors.designation.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Phone Field */}
                        <div>
                            <label>
                                Phone Number<span>*</span>
                            </label>
                            <div style={{ display: "flex", gap: "5px" }}>
                                <select
                                    defaultValue={"+91"}
                                    {...register("countryCode", {
                                        required: "Country code is required",
                                    })}
                                >
                                    {phoneCountryCodes.map((countryCode) => (
                                        <option
                                            key={countryCode.code}
                                            value={countryCode.dial_code}
                                        >
                                            {countryCode.dial_code}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Invalid phone number",
                                        },
                                    })}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            {errors.phone && (
                                <p style={{ color: "red", fontSize: "0.9rem" }}>
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label>
                                Email<span>*</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p style={{ color: "red", fontSize: "0.9rem" }}>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label>
                                District<span>*</span>
                            </label>
                            <select
                                {...register("district", {
                                    required: "District is required",
                                })}
                            >
                                <option value="">Select your district</option>
                                {districtsInKerala.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                            {errors.district && (
                                <p
                                    style={{
                                        color: "red",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {errors.district.message}
                                </p>
                            )}
                        </div>

                        {watch("district") === "Outside Kerala" && (
                            <div>
                                <label>
                                    Enter Your State<span>*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("other_state", {
                                        required: "State is required",
                                    })}
                                    placeholder="Enter your state"
                                />
                                {errors.other_state && (
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        {errors.other_state.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {selectedTicket !== "Stalls" &&
                            selectedTicket !== "Product Demo + Stall" && (
                                <>
                                    <div>
                                        <label>
                                            Category<span>*</span>
                                        </label>
                                        <select
                                            {...register("category", {
                                                required: "Category is required",
                                            })}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <p
                                                style={{
                                                    color: "red",
                                                    fontSize: "0.9rem",
                                                }}
                                            >
                                                {errors.category.message}
                                            </p>
                                        )}
                                    </div>

                                    {watch("category") === "Others" && (
                                        <div>
                                            <label>
                                                Please specify Category
                                                <span>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                {...register("other_category", {
                                                    required: "This field is required",
                                                })}
                                                placeholder="Enter your category"
                                            />
                                            {errors.other_category && (
                                                <p
                                                    style={{
                                                        color: "red",
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    {errors.other_category.message}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div>
                                        <label>
                                            Company / Organization Name<span>*</span>
                                            {/* <span>*</span> */}
                                        </label>
                                        <input
                                            type="text"
                                            {...register("organization", {
                                                // required: "Institution name is required",
                                            })}
                                            placeholder="Enter your Company / Organization name"
                                            required
                                        />
                                        {/* {errors.institution && (
                                            <p
                                                style={{
                                                    color: "red",
                                                    fontSize: "0.9rem",
                                                }}
                                            >
                                                {errors.institution.message}
                                            </p>
                                        )} */}

                                        {errors.organization && (
                                            <p
                                                style={{
                                                    color: "red",
                                                    fontSize: "0.9rem",
                                                }}
                                            >
                                                {errors.organization.message}
                                            </p>
                                        )}
                                    </div>

                                    {selectedTicket !== "Product Demo + Stall" && (
                                        <div>
                                            <label>
                                                Did you attend the previous Scaleup Conclave (Feb
                                                2024)?
                                                <span>*</span>
                                            </label>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                }}
                                            >
                                                <label className={styles.radio}>
                                                    <input
                                                        type="radio"
                                                        value="Yes"
                                                        {...register("attendedPrevious", {
                                                            required: "This field is required",
                                                        })}
                                                    />
                                                    Yes
                                                </label>
                                                <label className={styles.radio}>
                                                    <input
                                                        type="radio"
                                                        value="No"
                                                        {...register("attendedPrevious", {
                                                            required: "This field is required",
                                                        })}
                                                    />
                                                    No
                                                </label>
                                            </div>
                                            {errors.attendedPrevious && (
                                                <p
                                                    style={{
                                                        color: "red",
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    {errors.attendedPrevious.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}

                        {selectedTicket === "Stalls" && (
                            <div>
                                <label>
                                    Stall Type<span>*</span>
                                </label>
                                <select
                                    {...register("stall_type", {
                                        required: "Stall type is required",
                                    })}
                                >
                                    <option value="">Select a Stall Type</option>
                                    <option value="Premium Stall">₹61,000 - Premium Stall</option>
                                    <option value="Normal Stall">₹48,000 - Normal Stall</option>
                                </select>
                                {errors.stall_type && (
                                    <p style={{ color: "red", fontSize: "0.9rem" }}>
                                        {errors.stall_type.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={styles.submit}>
                        <button type="submit">
                            {isLoading ? <BeatLoader size={8} color="white" /> : "Submit"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ScaleupForm;
