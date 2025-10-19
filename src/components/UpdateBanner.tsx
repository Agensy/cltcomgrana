import { useMemo } from "react";

const UpdateBanner = () => {
  const timestamp = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
    } catch {
      return new Date().toLocaleString("pt-BR");
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 text-white text-sm md:text-base py-2 px-4 text-center backdrop-blur-sm border-b border-gray-700">
      Atualização — {timestamp}
    </div>
  );
};

export default UpdateBanner;