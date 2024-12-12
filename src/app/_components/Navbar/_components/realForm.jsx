"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./realForm.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import phoneCountryCodes from "./phoneCountryCodes.json";

const ThankYou = ({ ticket, selectedTicket }) => (
    <div className={styles.thankYou}>
        <h2>Thank You for Registering!</h2>
        {selectedTicket === "Stalls" ? (
            <p>
                Your registration of interest is successful. Our team will
                contact you shortly.
            </p>
        ) : (
            <>
                <p>Kindly, click the below button to view your ticket.</p>
                <button
                    onClick={() =>
                        window.open(
                            `https://makemypass.com/scaleup-2025/view-ticket/${ticket?.event_register_id}`,
                            "_blank"
                        )
                    }
                >
                    View Ticket
                </button>
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

    let eventId;
    if (
        selectedTicket === "General Ticket" ||
        selectedTicket === "VIP Ticket"
    ) {
        eventId = "95585c57-9c47-4808-a57b-b2867b89c1f4";
    } else if (selectedTicket === "Stalls") {
        eventId = "d959821a-d64a-4962-a17e-ebf34f22d755";
    }

    const onSubmit = async (data) => {
        // Map form data to the API's expected structure
        const payload = {
            name: data.name,
            phone: `${data.countryCode}${data.phone}`,
            email: data.email,
            district: data.district,
            organization: data.institution,
            category: data.category,
            did_you_attend_the_previous_scaleup_conclave_2024:
                data.attendedPrevious,
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
        payloadFormData.append("name", data.name);
        payloadFormData.append("phone", `${data.countryCode}${data.phone}`);
        payloadFormData.append("email", data.email);
        payloadFormData.append("district", data.district);
        payloadFormData.append("organization", data.institution);
        payloadFormData.append("category", data.category);
        payloadFormData.append(
            "did_you_attend_the_previous_scaleup_conclave_2024",
            data.attendedPrevious
        );

        if (selectedTicket === "General Ticket") {
            payloadFormData.append(
                "tickets[]",
                JSON.stringify(payload.tickets[0])
            );
        } else if (selectedTicket === "VIP Ticket") {
            payloadFormData.append(
                "tickets[]",
                JSON.stringify(payload.tickets[1])
            );
        } else if (selectedTicket === "Stalls") {
            payloadFormData.append(
                "tickets[]",
                JSON.stringify(payload.tickets[2])
            );
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
                            name: "MakeMyPass",
                            description: `MMP - scaleup-2025`,
                            image: "/pwa/maskable.webp",
                            order_id: paymentId,
                            handler: function (response) {
                                axios
                                    .post(
                                        "https://api.buildnship.in/makemypass/public-form/validate-payment/",
                                        {
                                            order_id:
                                                response.razorpay_order_id,
                                            payment_id:
                                                response.razorpay_payment_id,
                                        }
                                    )
                                    .then((response) => {
                                        setTicketDetails(
                                            response.data.response
                                        ); // Store the ticket details
                                        setIsSubmitted(true); // Show the ThankYou component
                                    })
                                    .catch((error) => {
                                        toast.error(
                                            "Payment failed. Please try again."
                                        );
                                    });
                            },
                            theme: {
                                color: "#00FF82",
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
    ];

    const categories = ["Student", "Professional", "Entrepreneur", "Other"];

    // Watch all form fields
    const watchedFields = watch();

    // Determine if the form is incomplete
    const isFormIncomplete = !(
        watchedFields.name &&
        watchedFields.phone &&
        watchedFields.email &&
        watchedFields.district &&
        watchedFields.category &&
        watchedFields.institution &&
        watchedFields.attendedPrevious
    );

    return (
        <div
            className={`
                ${styles.realForm} 
                ${isFormIncomplete && !isSubmitted ? styles.incomplete : ""}
                `}
        >
            {!isSubmitted ? (
                <div className={styles.head}>
                    <h1>Register {selectedTicket}!</h1>
                    <p>
                        Fill the form details and get your entry to the much
                        awaited event.
                    </p>
                </div>
            ) : (
                <ThankYou
                    ticket={ticketDetails}
                    selectedTicket={selectedTicket}
                />
            )}

            {
                !isSubmitted && (
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        {/* Name Field */}
                        <div>
                            <label>
                                Name<span>*</span>
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
                                <p style={{ color: "red", fontSize: "0.9rem" }}>
                                    {errors.district.message}
                                </p>
                            )}
                        </div>

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
                                <p style={{ color: "red", fontSize: "0.9rem" }}>
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label>
                                Institution Name<span>*</span>
                            </label>
                            <input
                                type="text"
                                {...register("institution", {
                                    required: "Institution name is required",
                                })}
                                placeholder="Enter your institution name"
                            />
                            {errors.institution && (
                                <p style={{ color: "red", fontSize: "0.9rem" }}>
                                    {errors.institution.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label>
                                Did you attend the previous Scaleup Conclave?
                                <span>*</span>
                            </label>
                            <div style={{ display: "flex", gap: "10px" }}>
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
                                <p style={{ color: "red", fontSize: "0.9rem" }}>
                                    {errors.attendedPrevious.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className={styles.submit}>
                            <button type="submit">
                                {isLoading ? (
                                    <BeatLoader size={8} color="white" />
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                )
            }
        </div >
    );
};

export default ScaleupForm;
