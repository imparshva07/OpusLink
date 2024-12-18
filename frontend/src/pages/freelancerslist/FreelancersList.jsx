/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FreelancerList.css";

function FreelancersList() {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFreelancers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/users/freelancers`);
                setFreelancers(response.data);
            } catch (err) {
                setError(err.message || "Failed to fetch freelancers.");
            } finally {
                setLoading(false);
            }
        };

        fetchFreelancers();
    },[]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="projects">
            <div className="projects-container">
                <div className="projects-header">
                    <h1>Freelancers</h1>
                </div>
                <table className="projects-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Bio</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {freelancers.map((freelancer) => (
                            <tr key={freelancer._id}>
                                <td>
                                    <img
                                        className="project-image"
                                        src={
                                            freelancer.img ||
                                            "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                        }
                                        alt={freelancer.name}
                                    />
                                </td>
                                <td>
                                    {freelancer.name}
                                </td>
                                <td>{freelancer.email}</td>
                                <td>{freelancer.bio}</td>
                                <td>
                                    <button>
                                        Message
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FreelancersList;
