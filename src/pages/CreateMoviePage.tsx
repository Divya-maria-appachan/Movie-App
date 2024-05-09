
import React, { useState, ChangeEvent, FormEvent } from "react";
import MovieForm from "../components/MovieForm";

interface CastMember {
  name: string;
  role: string;
  description: string;
}

const CreateMoviePage: React.FC = () => {
  const [formData, setFormData] = useState<{
    title: string;
    overview: string;
    genres: string;
    releaseDate: string;
    runtime: string;
    productionCompanies: string;
    cast: CastMember[];
    poster: File | null;
  }>({
    title: "",
    overview: "",
    genres: "",
    releaseDate: "",
    runtime: "",
    productionCompanies: "",
    cast: [],
    poster: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form data
    // Send data to backend
    // Provide feedback to the user
  };

  const handleCastChange = (index: number, field: keyof CastMember, value: string) => {
    setFormData((prevData) => {
      const updatedCast = [...prevData.cast];
      updatedCast[index] = {
        ...updatedCast[index],
        [field]: value,
      };
      return {
        ...prevData,
        cast: updatedCast,
      };
    });
  };

  const handleAddCastMember = () => {
    setFormData((prevData) => ({
      ...prevData,
      cast: [...prevData.cast, { name: "", role: "", description: "" }],
    }));
  };

  const handleRemoveCastMember = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      cast: prevData.cast.filter((_, i) => i !== index),
    }));
  };

  const handlePosterChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      poster: file,
    }));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My fantasy movie</h1>

      <MovieForm
        formData={formData}
        handleChange={handleChange}
        handleCastChange={handleCastChange}
        handleAddCastMember={handleAddCastMember}
        handleRemoveCastMember={handleRemoveCastMember}
        handleSubmit={handleSubmit}
        handlePosterChange={handlePosterChange}
      />
    </div>
  );
};

export default CreateMoviePage;

