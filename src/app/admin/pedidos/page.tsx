"use client";

import { useState } from "react";
import { 
  Plus, 
  ArrowLeft, 
  ArrowRight, 
  Edit2, 
  Trash2, 
  User, 
  TrendingUp, 
  Calendar,
  X,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type OrderStatus = 'lead' | 'desarrollo' | 'pruebas' | 'entregado';

interface Order {
  id: string;
  clientName: string;
  projectName: string;
  progress: number;
  status: OrderStatus;
  updatedAt: string;
}

const COLUMN_NAMES: Record<OrderStatus, { title: string; color: string; bg: string }> = {
  lead: { title: "Requerimientos / Leads", color: "text-amber-700 border-amber-200", bg: "bg-amber-50/50" },
  desarrollo: { title: "En Desarrollo", color: "text-blue-700 border-blue-200", bg: "bg-blue-50/30" },
  pruebas: { title: "Fase de Pruebas", color: "text-indigo-700 border-indigo-200", bg: "bg-indigo-50/30" },
  entregado: { title: "Entregado", color: "text-emerald-700 border-emerald-200", bg: "bg-emerald-50/30" }
};

const INITIAL_ORDERS: Order[] = [
  {
    id: "COD-123",
    clientName: "Aura Cosmetics",
    projectName: "Plataforma E-commerce Premium",
    progress: 60,
    status: "desarrollo",
    updatedAt: "27 de mayo de 2026"
  },
  {
    id: "COD-456",
    clientName: "Logística Monterrey",
    projectName: "Aplicación Móvil de Entregas",
    progress: 85,
    status: "pruebas",
    updatedAt: "26 de mayo de 2026"
  },
  {
    id: "COD-789",
    clientName: "Inmobiliaria Regia",
    projectName: "Sitio Web Corporativo",
    progress: 15,
    status: "lead",
    updatedAt: "25 de mayo de 2026"
  },
  {
    id: "COD-101",
    clientName: "Grupo Alimentos del Norte",
    projectName: "Sistema ERP Interno",
    progress: 100,
    status: "entregado",
    updatedAt: "20 de mayo de 2026"
  }
];

export default function KanbanPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  // Form states
  const [formId, setFormId] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formProject, setFormProject] = useState("");
  const [formProgress, setFormProgress] = useState(0);
  const [formStatus, setFormStatus] = useState<OrderStatus>("lead");

  const openCreateModal = () => {
    // Generar un ID único autoincremental estimado
    const nextNum = Math.floor(Math.random() * 900) + 100;
    setFormId(`COD-${nextNum}`);
    setFormClient("");
    setFormProject("");
    setFormProgress(0);
    setFormStatus("lead");
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const openEditModal = (order: Order) => {
    setEditingOrder(order);
    setFormId(order.id);
    setFormClient(order.clientName);
    setFormProject(order.projectName);
    setFormProgress(order.progress);
    setFormStatus(order.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClient.trim() || !formProject.trim()) return;

    const formattedDate = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (editingOrder) {
      // Edit
      setOrders(prev => prev.map(o => o.id === editingOrder.id ? {
        ...o,
        clientName: formClient,
        projectName: formProject,
        progress: Number(formProgress),
        status: formStatus,
        updatedAt: formattedDate
      } : o));
    } else {
      // Create new
      const newOrder: Order = {
        id: formId,
        clientName: formClient,
        projectName: formProject,
        progress: Number(formProgress),
        status: formStatus,
        updatedAt: formattedDate
      };
      setOrders(prev => [...prev, newOrder]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(`¿Estás seguro de eliminar el pedido ${id}?`)) {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  const moveStatus = (order: Order, direction: 'left' | 'right') => {
    const statuses: OrderStatus[] = ['lead', 'desarrollo', 'pruebas', 'entregado'];
    const currIdx = statuses.indexOf(order.status);
    let nextIdx = currIdx;

    if (direction === 'left' && currIdx > 0) nextIdx -= 1;
    if (direction === 'right' && currIdx < statuses.length - 1) nextIdx += 1;

    if (nextIdx !== currIdx) {
      const nextStatus = statuses[nextIdx];
      // Si pasa a entregado, automáticamente subimos progreso a 100
      const nextProgress = nextStatus === 'entregado' ? 100 : (nextStatus === 'lead' && order.progress === 100 ? 0 : order.progress);
      
      const formattedDate = new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      setOrders(prev => prev.map(o => o.id === order.id ? {
        ...o,
        status: nextStatus,
        progress: nextProgress,
        updatedAt: formattedDate
      } : o));
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header section with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-sans font-bold text-foreground">Tablero Kanban</h1>
          <p className="text-secondary-text text-sm md:text-base">Mapea y gestiona el flujo de trabajo de cada desarrollo.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 font-bold text-sm transition-all hover:-translate-y-0.5 shadow-sm flex items-center gap-2 cursor-pointer border-none outline-none shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nuevo Pedido</span>
        </button>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {(['lead', 'desarrollo', 'pruebas', 'entregado'] as OrderStatus[]).map(colKey => {
          const colData = COLUMN_NAMES[colKey];
          const colOrders = orders.filter(o => o.status === colKey);

          return (
            <div 
              key={colKey}
              className={`border border-border-light/80 p-4 space-y-4 min-h-[500px] flex flex-col ${colData.bg}`}
            >
              {/* Column Header */}
              <div className="flex justify-between items-center pb-2 border-b border-border-light/50">
                <span className={`text-sm font-bold uppercase tracking-wider ${colData.color}`}>
                  {colData.title}
                </span>
                <span className="bg-surface-2 text-secondary-text text-xs font-bold px-2 py-0.5 rounded-full">
                  {colOrders.length}
                </span>
              </div>

              {/* Cards list */}
              <div className="flex-1 space-y-4">
                <AnimatePresence initial={false}>
                  {colOrders.map(order => (
                    <motion.div
                      key={order.id}
                      layoutId={`card-${order.id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="bg-background border border-border-light hover:border-border transition-all duration-300 p-5 space-y-4 group shadow-sm hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] relative"
                    >
                      {/* ID and date */}
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-primary tracking-wider uppercase">{order.id}</span>
                        <div className="flex items-center gap-1 text-hint">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{order.updatedAt}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="space-y-1">
                        <h3 className="font-sans font-bold text-base text-foreground leading-snug group-hover:text-primary transition-colors">
                          {order.projectName}
                        </h3>
                        <div className="flex items-center gap-1.5 text-secondary-text text-xs">
                          <User className="w-3.5 h-3.5" />
                          <span>{order.clientName}</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs text-secondary-text">
                          <div className="flex items-center gap-1 font-medium">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Progreso</span>
                          </div>
                          <span className="font-bold">{order.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-2 overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Interactive Controls */}
                      <div className="flex justify-between items-center pt-3 border-t border-border-light/30">
                        {/* Shifting layout controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveStatus(order, 'left')}
                            disabled={order.status === 'lead'}
                            className="p-1.5 text-secondary-text hover:text-primary hover:bg-surface-2 disabled:text-hint/40 disabled:hover:bg-transparent transition-colors border-none outline-none bg-transparent cursor-pointer"
                            title="Mover columna a la izquierda"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveStatus(order, 'right')}
                            disabled={order.status === 'entregado'}
                            className="p-1.5 text-secondary-text hover:text-primary hover:bg-surface-2 disabled:text-hint/40 disabled:hover:bg-transparent transition-colors border-none outline-none bg-transparent cursor-pointer"
                            title="Mover columna a la derecha"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Edit and Delete */}
                        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(order)}
                            className="p-1.5 text-secondary-text hover:text-primary hover:bg-surface-2 transition-colors border-none outline-none bg-transparent cursor-pointer"
                            title="Editar pedido"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors border-none outline-none bg-transparent cursor-pointer"
                            title="Eliminar pedido"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {colOrders.length === 0 && (
                  <div className="h-32 border border-dashed border-border-light/50 flex items-center justify-center text-center p-4">
                    <span className="text-xs text-hint font-medium">Sin pedidos en esta fase</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Creation/Editing Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-background border border-border max-w-lg w-full p-8 shadow-2xl relative z-10 space-y-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-border-light">
                <h2 className="text-xl font-bold font-sans text-foreground">
                  {editingOrder ? `Editar Pedido: ${editingOrder.id}` : "Registrar Nuevo Pedido"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-secondary-text hover:text-foreground border-none outline-none bg-transparent cursor-pointer p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                {/* ID (Read-only if editing) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-secondary-text block">ID de Pedido</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingOrder}
                    placeholder="Ej: COD-123"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value.toUpperCase())}
                    className="bg-surface-2 border border-border focus:border-primary disabled:opacity-50 text-foreground text-sm p-3 w-full outline-none font-sans"
                  />
                </div>

                {/* Client Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-secondary-text block">Cliente / Empresa</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Aura Cosmetics"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    className="bg-surface-2 border border-border focus:border-primary text-foreground text-sm p-3 w-full outline-none font-sans"
                  />
                </div>

                {/* Project Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-secondary-text block">Título del Desarrollo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Plataforma E-commerce Premium"
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    className="bg-surface-2 border border-border focus:border-primary text-foreground text-sm p-3 w-full outline-none font-sans"
                  />
                </div>

                {/* Two Column details: Status and Progress */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Status */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text block">Columna / Estado</label>
                    <select
                      value={formStatus}
                      onChange={(e) => {
                        const val = e.target.value as OrderStatus;
                        setFormStatus(val);
                        if (val === 'entregado') setFormProgress(100);
                      }}
                      className="bg-surface-2 border border-border focus:border-primary text-foreground text-sm p-3 w-full outline-none font-sans"
                    >
                      <option value="lead">Requerimientos / Lead</option>
                      <option value="desarrollo">En Desarrollo</option>
                      <option value="pruebas">Fase de Pruebas</option>
                      <option value="entregado">Entregado</option>
                    </select>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary-text block">Avance: {formProgress}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={formProgress}
                      disabled={formStatus === 'entregado'}
                      onChange={(e) => setFormProgress(Number(e.target.value))}
                      className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-primary mt-4"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-border-light flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="border border-border hover:bg-surface-light text-secondary-text px-5 py-2.5 font-bold text-sm bg-transparent cursor-pointer transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 font-bold text-sm shadow-sm cursor-pointer border-none outline-none flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
