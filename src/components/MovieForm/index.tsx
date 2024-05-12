
import React, { ChangeEvent, FormEvent,useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

interface CastMember {
  name: string;
  role: string;
  description: string;
}

interface MovieFormProps {
  formData: {
    title: string;
    overview: string;
    genres: string;
    releaseDate: string;
    runtime: string;
    productionCompanies: string;
    cast: CastMember[];
    poster: File | null;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCastChange: (index: number, field: keyof CastMember, value: string) => void;
  handleAddCastMember: () => void;
  handleRemoveCastMember: (index: number) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handlePosterChange: (file: File | null) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({
  formData,
  handleChange,
  handleCastChange,
  handleAddCastMember,
  handleRemoveCastMember,
  handleSubmit,
  handlePosterChange,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSnackbarClose = () => {
    setShowSuccessMessage(false);
  };
  return (
    <form onSubmit={(e) => {handleSubmit(e); setShowSuccessMessage(true)}} style={{ width: "70%", margin: "0 auto" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          label="Overview"
          variant="outlined"
          multiline
          rows={4}
          name="overview"
          value={formData.overview}
          onChange={handleChange}
        />
        <TextField
          label="Genres"
          variant="outlined"
          name="genres"
          value={formData.genres}
          onChange={handleChange}
        />
        <TextField
          label="Release Date"
          variant="outlined"
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Runtime"
          variant="outlined"
          name="runtime"
          value={formData.runtime}
          onChange={handleChange}
        />
        <TextField
          label="Production Companies"
          variant="outlined"
          name="productionCompanies"
          value={formData.productionCompanies}
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {formData.cast.map((castMember, index) => (
            <Box key={index}>
              <TextField
                label="Name"
                variant="outlined"
                value={castMember.name}
                onChange={(e) => handleCastChange(index, "name", e.target.value)}
              />
              <TextField
                label="Role"
                variant="outlined"
                value={castMember.role}
                onChange={(e) => handleCastChange(index, "role", e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                value={castMember.description}
                onChange={(e) => handleCastChange(index, "description", e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={() => handleRemoveCastMember(index)}>
                Remove Cast Member
              </Button>
            </Box>
          ))}
          <Button variant="contained" onClick={handleAddCastMember}>
            Add Cast Member
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "20px" }}>
  <input type="file" onChange={(e) => handlePosterChange(e.target.files?.[0] || null)} accept="image/*" />
  {formData.poster && (
    <img src={URL.createObjectURL(formData.poster)} alt="Uploaded Poster" style={{ maxWidth: "50%" }} />
  )}
  <Button variant="contained" color="primary" type="submit">
    Submit
  </Button>
</Box>
      </Box>
      {/* Success Snackbar */}
      <Snackbar open={showSuccessMessage} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Movie submitted successfully!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default MovieForm;
