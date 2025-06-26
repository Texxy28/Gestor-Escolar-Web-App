const LoadingSpinner = ({ mensaje = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
      <p className="text-gray-700 text-lg">{mensaje}</p>
    </div>
  );
}

export default LoadingSpinner