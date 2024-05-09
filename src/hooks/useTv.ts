import { useEffect, useState } from "react";
import { getTv } from '../api/tmdb-api'
import { TvT } from '../types/interfaces'

const useTv = (id: string) => {
    const [tv, setTv] = useState<TvT>();
    useEffect(() => {
        getTv(id).then(tv => {
            setTv(tv);
        });
    }, [id]);
    return [tv, setTv];
};

export default useTv