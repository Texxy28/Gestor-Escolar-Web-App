import { useUser } from "../context/UserContext"

export default function Dashboard () {

    const { user } = useUser();

    return (

        <div>Bienvenido {user?.nombre || "Invitado"}</div>

    )

}