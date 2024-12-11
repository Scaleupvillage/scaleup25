"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./realForm.module.css";
import axios from "axios";

const ThankYou = ({ ticket }) => (
    <div className={styles.thankYou}>
        <h2>Thank You for Registering!</h2>
        <p>Your ticket details:</p>
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
    </div>
);

const ScaleupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ticketDetails, setTicketDetails] = useState(null);

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
        payload.tickets.forEach((ticket) => {
            payloadFormData.append("tickets[]", JSON.stringify(ticket));
        });
        payloadFormData.append("utm", JSON.stringify(payload.utm));

        try {
            const response = await axios.post(
                "https://api.buildnship.in/makemypass/public-form/95585c57-9c47-4808-a57b-b2867b89c1f4/submit/",
                payloadFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                setTicketDetails(response.data.response); // Store the ticket details
                setIsSubmitted(true); // Show the ThankYou component
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
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
                console.error("Submission error:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
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

    return (
        <div className={styles.realForm}>
            <div className={styles.head}>
                <h1>Register Now!</h1>
                <p>
                    Fill the form details and get yopur entry to the much
                    awaited event and we shall add here upto 2 line text if
                    needed
                </p>
            </div>
            {!isSubmitted ? (
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
                            <p style={{ color: "red" }}>
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
                                {...register("countryCode", {
                                    required: "Country code is required",
                                })}
                            >
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+61">+61</option>
                                {/* Add more country codes here */}
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
                            <p style={{ color: "red" }}>
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
                            <p style={{ color: "red" }}>
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
                            <p style={{ color: "red" }}>
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
                            <p style={{ color: "red" }}>
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
                            <p style={{ color: "red" }}>
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
                            <label
                                style={{
                                    display: "flex",
                                    gap: ".25rem",
                                    alignItems: "center",
                                }}
                            >
                                <input
                                    type="radio"
                                    value="Yes"
                                    {...register("attendedPrevious", {
                                        required: "This field is required",
                                    })}
                                />
                                Yes
                            </label>
                            <label
                                style={{
                                    display: "flex",
                                    gap: ".25rem",
                                    alignItems: "center",
                                }}
                            >
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
                            <p style={{ color: "red" }}>
                                {errors.attendedPrevious.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className={styles.submit}>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            ) : (
                <ThankYou ticket={ticketDetails} />
            )}
        </div>
    );
};

export default ScaleupForm;
