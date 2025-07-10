import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AsistenciaFechaPicker = ({ cursoId, token, onFechaSeleccionada }) => {
  const [diasClase, setDiasClase] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchDias = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cursos/${cursoId}/horarios`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setDiasClase(res.data); // Ej: ["lunes", "miércoles"]
      } catch (error) {
        console.error("Error al obtener horarios:", error);
      }
    };
    fetchDias();
  }, [cursoId, token]);

  useEffect(() => {
    if (diasClase.length === 0) return;

    const hoy = new Date();
    const opciones = { weekday: "long" };
    const diaHoy = hoy.toLocaleDateString("es-PE", opciones).toLowerCase();

    let fechaInicial = null;

    if (diasClase.includes(diaHoy)) {
      fechaInicial = hoy;
    } else {
      let proximaFecha = new Date(hoy);
      for (let i = 1; i <= 7; i++) {
        proximaFecha.setDate(proximaFecha.getDate() + 1);
        const dia = proximaFecha
          .toLocaleDateString("es-PE", opciones)
          .toLowerCase();
        if (diasClase.includes(dia)) {
          fechaInicial = new Date(proximaFecha);
          break;
        }
      }
    }

    if (fechaInicial) {
      setFechaSeleccionada(fechaInicial);
      onFechaSeleccionada(fechaInicial);
    }

    // ✅ Solo corre cuando diasClase cambia
  }, [diasClase, onFechaSeleccionada]);

  const filtrarDias = (date) => {
    const dia = date.toLocaleString("es-PE", { weekday: "long" }).toLowerCase();
    return diasClase.includes(dia);
  };

  return (
    <DatePicker
      selected={fechaSeleccionada}
      onChange={(date) => {
        setFechaSeleccionada(date);
        onFechaSeleccionada(date);
      }}
      filterDate={filtrarDias}
      placeholderText="Selecciona fecha"
      dateFormat="yyyy-MM-dd"
      className="border border-gray-400 px-2 py-1 rounded text-sm"
    />
  );
};

export default AsistenciaFechaPicker;
