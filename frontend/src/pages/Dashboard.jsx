import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import CursoDialog from "../components/CursoDialog";

export default function Dashboard() {
  const [cursos, setCursos] = useState([]);

  const { user, token } = useUser();

  useEffect(() => {
    if (!user || !token) return;

    const fetchCursos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cursos/${user.id}`,
          { headers: { Authorization: `${token}` } }
        );

        setCursos(res.data);
      } catch (error) {
        console.error("Error al obtener cursos", error);
      }
    };

    fetchCursos();
  }, [user, token]);

  return (
    <div>
        <h2>Bienvenido {user?.nombre || "Invitado"}</h2>
        <section>
            {cursos.map((curso) => (
                <CursoDialog key={curso.curso_id} curso={curso}/>
            ))}
        </section>
    </div>
    );
}
