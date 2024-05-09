import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getTvActors } from "../../api/tmdb-api";
import { TvT, TvCredit } from "../../types/interfaces";

const styles = {
    table: {
        minWidth: 550,
    },
};

const TvCredits: React.FC<TvT> = (props) => {
    const [credits, setCredits] = useState<TvCredit[]>([]);

    const tv = props;

    useEffect(() => {
        getTvActors(tv.id).then((credits) => {
            setCredits(credits.cast);
        });
    }, [tv.id]);

    return (
        <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="credits table">
                <TableHead>
                    <TableRow>
                        <TableCell>Actor</TableCell>
                        <TableCell align="center">Character</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {credits.map((credit: TvCredit) => (
                        <TableRow key={credit.id}>
                            <TableCell component="th" scope="row">
                                {credit.name}
                            </TableCell>
                            <TableCell align="center">{credit.character}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TvCredits;



                 
