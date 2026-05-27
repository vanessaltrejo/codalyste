"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, Check, ChevronDown } from "lucide-react";

interface ProjectFormModalProps {
  onClose?: () => void;
}

export function ProjectFormModal({ onClose }: ProjectFormModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    service: [] as string[],
    investment: "",
  });

  const [selectedCountry, setSelectedCountry] = useState({ name: "México", code: "+52", flag: "🇲🇽" });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [otherServiceText, setOtherServiceText] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);


  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [currentStep]);


  useEffect(() => {
    if (currentStep === 8) {
      const mappedServices = formData.service.map(s => s === "Otro" ? `Otro (${otherServiceText})` : s);
      const completePhone = `${selectedCountry.code} ${formData.phone}`;
      const payload = {
        ...formData,
        phone: completePhone,
        service: mappedServices.join(", "),
      };


      import("@/lib/firebase")
        .then(({ saveLeadToFirestore }) => {
          saveLeadToFirestore(payload).catch((err: Error) => {
            console.warn("Firestore auto-save prepared, waiting for environment variables:", err.message);
          });
        })
        .catch((err: Error) => {
          console.warn("Firebase module not loaded yet:", err.message);
        });


      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch(err => console.error("Error sending email:", err));
    }
  }, [currentStep, formData, selectedCountry, otherServiceText]);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1 && !formData.name.trim()) {
      newErrors.name = "Por favor, escribe tu nombre.";
    }
    if (currentStep === 2) {
      if (!formData.email.trim()) {
        newErrors.email = "Por favor, escribe tu correo electrónico.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Por favor, ingresa un correo electrónico válido.";
      }
    }
    if (currentStep === 3 && !formData.phone.trim()) {
      newErrors.phone = "Por favor, escribe tu número de teléfono.";
    }
    if (currentStep === 6) {
      if (formData.service.length === 0) {
        newErrors.service = "Por favor, selecciona al menos un servicio (máximo 2).";
      } else if (formData.service.includes("Otro") && !otherServiceText.trim()) {
        newErrors.service = "Por favor, especifica qué otro servicio necesitas.";
      }
    }
    if (currentStep === 7 && !formData.investment) {
      newErrors.investment = "Por favor, selecciona un rango de inversión.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentStep > 0 && currentStep < 6) {
      e.preventDefault();
      handleNext();
    }
  };

  const selectOption = (field: "investment", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));

    setTimeout(() => {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }, 450);
  };

  const toggleService = (svc: string) => {
    setFormData((prev) => {
      const isSelected = prev.service.includes(svc);
      if (isSelected) {
        return { ...prev, service: prev.service.filter((s) => s !== svc) };
      }
      if (prev.service.length >= 2) {
        return prev;
      }
      return { ...prev, service: [...prev.service, svc] };
    });
    setErrors((prev) => ({ ...prev, service: "" }));
  };

  const countries = [
    { name: "México", code: "+52", flag: "🇲🇽" },
    { name: "Estados Unidos", code: "+1", flag: "🇺🇸" },
    { name: "España", code: "+34", flag: "🇪🇸" },
    { name: "Colombia", code: "+57", flag: "🇨🇴" },
    { name: "Argentina", code: "+54", flag: "🇦🇷" },
    { name: "Chile", code: "+56", flag: "🇨🇱" },
    { name: "Perú", code: "+51", flag: "🇵🇪" },
    { name: "Ecuador", code: "+593", flag: "🇪🇨" },
    { name: "Venezuela", code: "+58", flag: "🇻🇪" },
    { name: "Guatemala", code: "+502", flag: "🇬🇹" },
    { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
    { name: "Panamá", code: "+507", flag: "🇵🇦" },
    { name: "República Dominicana", code: "+1", flag: "🇩🇴" },
    { name: "Bolivia", code: "+591", flag: "🇧🇴" },
    { name: "Uruguay", code: "+598", flag: "🇺🇾" },
    { name: "Paraguay", code: "+595", flag: "🇵🇾" },
    { name: "El Salvador", code: "+503", flag: "🇸🇻" },
    { name: "Honduras", code: "+504", flag: "🇭🇳" },
    { name: "Nicaragua", code: "+505", flag: "🇳🇮" },
    { name: "Brasil", code: "+55", flag: "🇧🇷" },
    { name: "Canadá", code: "+1", flag: "🇨🇦" },
    { name: "Reino Unido", code: "+44", flag: "🇬🇧" },
    { name: "Alemania", code: "+49", flag: "🇩🇪" },
    { name: "Francia", code: "+33", flag: "🇫🇷" },
    { name: "Italia", code: "+39", flag: "🇮🇹" },
    { name: "Lituania", code: "+370", flag: "🇱🇹" },
    { name: "Luxemburgo", code: "+352", flag: "🇱🇺" },
    { name: "Macedonia del Norte", code: "+389", flag: "🇲🇰" },
    { name: "Madagascar", code: "+261", flag: "🇲🇬" },
  ];

  const services = [
    "Landing Page",
    "One-Page",
    "Multi-Page",
    "Order Tracker",
    "Control de Gastos",
    "Booking",
    "Otro",
  ];

  const investments = [
    "Menos de $15,000 MXN",
    "$15,000 - $30,000 MXN",
    "$30,000 - $60,000 MXN",
    "Más de $60,000 MXN",
  ];


  const progressPercentage = currentStep === 0 ? 0 : (currentStep / 7) * 100;


  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  return (
    <div className="fixed top-20 bottom-0 left-0 right-0 bg-background text-foreground flex flex-col font-sans w-full overflow-hidden">
      {/* Dynamic Progress Bar */}
      {currentStep > 0 && currentStep < 8 && (
        <div className="w-full h-1 bg-surface-2 relative shrink-0">
          <motion.div
            layoutId="progressBar"
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Invisible backdrop to close the country selector dropdown when clicking outside */}
      {showCountryDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setShowCountryDropdown(false)}
        />
      )}

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center max-w-3xl w-full mx-auto px-6 py-12 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          {/* WELCOME SCREEN */}
          {currentStep === 0 && (
            <motion.div
              key="welcome"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center space-y-8 w-full"
            >
              <h1 className="text-3xl md:text-4xl font-serif italic text-foreground leading-[1.15] max-w-2xl mx-auto">
                Hola, queremos <br />
                conocer tu negocio.
              </h1>
              <p className="text-secondary-text text-base md:text-lg font-normal leading-relaxed max-w-lg mx-auto font-sans">
                Te llevará menos de 3 minutos.
              </p>
              <button
                onClick={() => {
                  setDirection(1);
                  setCurrentStep(1);
                }}
                className="bg-primary text-white font-bold text-base md:text-lg px-10 py-3.5 hover:bg-primary-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(0,51,255,0.15)] cursor-pointer tracking-wide border-none outline-none"
              >
                Comenzar
              </button>
            </motion.div>
          )}

          {/* STEP 1: NAME */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 w-full text-left"
            >
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold font-serif leading-tight text-foreground tracking-wide">
                  ¿Cómo te llamas? <span className="text-primary">*</span>
                </h2>
              </div>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Escribe tu nombre..."
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-b border-border focus:border-primary text-lg md:text-xl py-2.5 outline-none text-foreground transition-all duration-300 placeholder:text-placeholder"
                />
                {errors.name && (
                  <span className="text-error text-sm mt-2 block font-medium font-sans">{errors.name}</span>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={handleNext}
                  className="bg-primary text-white font-bold text-sm md:text-base px-8 py-3.5 hover:bg-primary-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(0,51,255,0.15)] flex items-center gap-2 group cursor-pointer border-none outline-none"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-hint text-sm font-sans hidden md:inline">o presiona ENTER</span>
              </div>
            </motion.div>
          )}

          {/* STEP 2: EMAIL */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 w-full text-left"
            >
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold font-serif leading-tight text-foreground tracking-wide">
                  Tu correo electrónico <span className="text-primary">*</span>
                </h2>
              </div>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-b border-border focus:border-primary text-lg md:text-xl py-2.5 outline-none text-foreground transition-all duration-300 placeholder:text-placeholder"
                />
                {errors.email && (
                  <span className="text-error text-sm mt-2 block font-medium font-sans">{errors.email}</span>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={handlePrev}
                  className="text-hint hover:text-black transition-colors py-3 px-4 font-bold flex items-center gap-1.5 cursor-pointer border-none outline-none bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-primary text-white font-bold text-sm md:text-base px-8 py-3.5 hover:bg-primary-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(0,51,255,0.15)] flex items-center gap-2 group cursor-pointer border-none outline-none"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-hint text-sm font-sans hidden md:inline">o presiona ENTER</span>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PHONE */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 w-full text-left"
            >
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold font-serif leading-tight text-foreground tracking-wide">
                  Tu número de teléfono <span className="text-primary">*</span>
                </h2>
              </div>
              <div className="relative flex items-center border-b border-border focus-within:border-primary transition-all duration-300">
                {/* Customizable Country Dropdown Selector */}
                <div className="relative z-50 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="text-lg md:text-xl py-2.5 pr-3 text-foreground font-light flex items-center gap-1.5 shrink-0 select-none hover:bg-black/[0.03] transition-colors border-none outline-none bg-transparent cursor-pointer"
                  >
                    <span>{selectedCountry.flag}</span>
                    <span>{selectedCountry.code}</span>
                    <ChevronDown className="w-4 h-4 text-hint" />
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute left-0 top-full mt-2 w-[280px] max-h-[300px] overflow-y-auto bg-background border border-border shadow-2xl z-50 p-2 flex flex-col gap-1">
                      <input
                        type="text"
                        placeholder="Buscar..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="bg-surface-2 border border-border focus:border-primary text-sm p-2 text-foreground w-full outline-none placeholder:text-placeholder font-sans font-normal mb-1 shrink-0"
                      />
                      <div className="overflow-y-auto flex-1 flex flex-col divide-y divide-border-light">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((c) => (
                            <button
                              key={c.name + c.code}
                              onClick={() => {
                                setSelectedCountry(c);
                                setShowCountryDropdown(false);
                                setCountrySearch("");
                              }}
                              className={`w-full text-left p-2.5 flex items-center justify-between hover:bg-surface-2 transition-colors border-none outline-none bg-transparent cursor-pointer font-sans ${
                                selectedCountry.code === c.code && selectedCountry.flag === c.flag
                                  ? "bg-primary/5 text-primary font-bold animate-fade-in"
                                  : "text-foreground"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{c.flag}</span>
                                <span className="text-sm font-normal truncate max-w-[150px]">{c.name}</span>
                              </div>
                              <span className="text-sm text-secondary-text font-bold">{c.code}</span>
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-center text-sm text-placeholder font-sans">
                            No se encontraron resultados
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={inputRef}
                  type="tel"
                  placeholder="81 2600 1588"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, phone: e.target.value }));
                    setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent py-2.5 outline-none text-lg md:text-xl text-foreground placeholder:text-placeholder"
                />
              </div>
              {errors.phone && (
                <span className="text-error text-sm mt-2 block font-medium font-sans">{errors.phone}</span>
              )}
              <div className="flex gap-4 items-center pt-2">
                <button
                  onClick={handlePrev}
                  className="text-hint hover:text-black transition-colors py-3 px-4 font-bold flex items-center gap-1.5 cursor-pointer border-none outline-none bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-primary text-white font-bold text-sm md:text-base px-8 py-3.5 hover:bg-primary-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(0,51,255,0.15)] flex items-center gap-2 group cursor-pointer border-none outline-none"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-hint text-sm font-sans hidden md:inline">o presiona ENTER</span>
              </div>
            </motion.div>
          )}

          {/* STEP 4: COMPANY */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 w-full text-left"
            >
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold font-serif leading-tight text-foreground tracking-wide">
                  Nombre de tu empresa
                </h2>
              </div>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Escribe el nombre de tu negocio o marca..."
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-b border-border focus:border-primary text-lg md:text-xl py-2.5 outline-none text-foreground transition-all duration-300 placeholder:text-placeholder"
                />
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={handlePrev}
                  className="text-hint hover:text-black transition-colors py-3 px-4 font-bold flex items-center gap-1.5 cursor-pointer border-none outline-none bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-primary text-white font-bold text-sm md:text-base px-8 py-3.5 hover:bg-primary-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(0,51,255,0.15)] flex items-center gap-2 group cursor-pointer border-none outline-none"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-hint text-sm font-sans hidden md:inline">o presiona ENTER</span>
              </div>
            </motion.div>
          )}

          {/* STEP 5: WEBSITE */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 w-full text-left"
            >
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold font-serif leading-tight text-foreground tracking-wide">
                  Sitio web actual <span className="text-secondary-text text-sm font-light block mt-1">(Si no tienes, puedes dejarlo en blanco)</span>
                </h2>
              </div>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="url"
                  placeholder="www.tuempresa.com"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-b border-border focus:border-primary text-lg md:text-xl py-2.5 outline-none text-foreground transition-all duration-300 placeholder:text-placeholder"
                />
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={handlePrev}
                  className="text-hint hover:text-black transition-colors py-3 px-4 font-bold flex items-center gap-1.5 cursor-pointer border-none outline-none bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-primary text-white font-bold text-sm md:text-base px-8 py-3.5 hover:bg-primary-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(0,51,255,0.15)] flex items-center gap-2 group cursor-pointer border-none outline-none"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-hint text-sm font-sans hidden md:inline">o presiona ENTER</span>
              </div>
            </motion.div>
          )}

          {/* STEP 6: SERVICE */}
          {currentStep === 6 && (
            <motion.div
              key="step6"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 w-full text-left"
            >
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold font-serif leading-tight text-foreground tracking-wide">
                  ¿Qué tipo de servicio necesitas? <span className="text-primary">*</span>
                  <span className="block text-sm font-sans font-normal text-secondary-text mt-1.5">Selecciona hasta 2 opciones.</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {services.map((svc) => {
                  const isSelected = formData.service.includes(svc);
                  const isMaxReached = formData.service.length >= 2 && !isSelected;
                  return (
                    <button
                      key={svc}
                      onClick={() => toggleService(svc)}
                      disabled={isMaxReached}
                      className={`text-left p-3.5 border text-sm md:text-base transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary shadow-[0_0_15px_rgba(0,51,255,0.08)] font-sans font-bold"
                          : isMaxReached
                          ? "border-border bg-surface text-placeholder cursor-not-allowed font-sans"
                          : "border-border bg-surface-2 hover:border-border-hover hover:bg-surface-2 text-foreground font-sans font-bold"
                      }`}
                    >
                      <span>{svc}</span>
                      {isSelected && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  );
                })}
              </div>

              {formData.service.includes("Otro") && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-2"
                >
                  <label className="block text-sm font-bold font-sans text-secondary-text">
                    ¿Qué otro servicio necesitas? <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. App móvil, Software ERP, CRM a la medida..."
                    value={otherServiceText}
                    onChange={(e) => {
                      setOtherServiceText(e.target.value);
                      if (errors.service) {
                        setErrors((prev) => ({ ...prev, service: "" }));
                      }
                    }}
                    className="w-full bg-transparent border-b border-border focus:border-primary text-base py-2.5 outline-none text-foreground transition-all duration-300 placeholder:text-placeholder"
                  />
                </motion.div>
              )}

              {errors.service && (
                <span className="text-error text-sm mt-2 block font-medium font-sans">{errors.service}</span>
              )}

              <div className="flex gap-4 items-center pt-2">
                <button
                  onClick={handlePrev}
                  className="text-hint hover:text-black transition-colors py-3 px-4 font-bold flex items-center gap-1.5 cursor-pointer border-none outline-none bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-primary text-white font-bold text-sm md:text-base px-8 py-3.5 hover:bg-primary-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(0,51,255,0.15)] flex items-center gap-2 group cursor-pointer border-none outline-none"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 7: INVESTMENT */}
          {currentStep === 7 && (
            <motion.div
              key="step7"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 w-full text-left"
            >
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold font-serif leading-tight text-foreground tracking-wide">
                  ¿Cuál es el rango de inversión estimado? <span className="text-primary">*</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {investments.map((inv) => {
                  const isSelected = formData.investment === inv;
                  return (
                    <button
                      key={inv}
                      onClick={() => selectOption("investment", inv)}
                      className={`text-left p-3.5 border text-sm md:text-base transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary shadow-[0_0_15px_rgba(0,51,255,0.08)] font-sans font-bold"
                          : "border-border bg-surface-2 hover:border-border-hover hover:bg-surface-2 text-foreground font-sans font-bold"
                      }`}
                    >
                      <span>{inv}</span>
                      {isSelected && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  );
                })}
              </div>
              {errors.investment && (
                <span className="text-error text-sm mt-2 block font-medium font-sans">{errors.investment}</span>
              )}

              <div className="flex gap-4 items-center pt-2">
                <button
                  onClick={handlePrev}
                  className="text-hint hover:text-black transition-colors py-3 px-4 font-bold flex items-center gap-1.5 cursor-pointer border-none outline-none bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Atrás</span>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-primary text-white font-bold text-sm md:text-base px-8 py-3.5 hover:bg-primary-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(0,51,255,0.15)] flex items-center gap-2 group cursor-pointer border-none outline-none"
                >
                  <span>Finalizar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 8: SUCCESS / SUBMISSION OPTIONS */}
          {currentStep === 8 && (
            <motion.div
              key="step8"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center space-y-10 w-full max-w-xl mx-auto"
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 animate-pulse">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-sans text-foreground font-bold tracking-wide">
                  ¡Se han enviado tus datos correctamente!
                </h2>
                <p className="text-secondary-text text-sm md:text-base font-light leading-relaxed max-w-md mx-auto">
                  Gracias por tu interés, {formData.name.split(" ")[0]}. Nos pondremos en contacto contigo a la brevedad.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="text-hint hover:text-black transition-colors font-medium hover:underline text-sm cursor-pointer border-none outline-none bg-transparent"
                >
                  Volver al sitio web
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
