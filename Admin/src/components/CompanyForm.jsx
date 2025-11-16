import { useState } from 'react';

// Iconos simples SVG
const Building2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const CompanyForm = ({ onAddCompany, onUpdateCompany, editingCompany, onCancel }) => {
  const [formData, setFormData] = useState({
    name: editingCompany?.name || '',
    ruc: editingCompany?.ruc || '',
    ciiu: editingCompany?.ciiu || '',
    address: editingCompany?.address || '',
    email: editingCompany?.email || '',
    type: editingCompany?.type || 'Minería',
    tipoActividad: editingCompany?.tipoActividad || 'Minería'
  });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(editingCompany?.logo || null);

  const companyTypes = ['Minería', 'Alimentos', 'Servicios', 'Educación', 'Otros'];
  const actividadesDisponibles = [
    'Minería',
    'Agricultura',
    'Avicultura',
    'Pesca',
    'Manufactura',
    'Construcción',
    'Transporte',
    'Salud',
    'Alimentación',
    'Otros',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(file);
      setLogoPreview(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.ruc && formData.email) {
      if (editingCompany) {
        // Modo edición
        const updatedCompany = {
          ...editingCompany,
          ...formData,
          logo: logoPreview || editingCompany.logo,
          logoFile: logo || editingCompany.logoFile
        };
        onUpdateCompany(updatedCompany);
      } else {
        // Modo creación
        const newCompany = {
          id: Date.now(),
          ...formData,
          logo: logoPreview,
          logoFile: logo,
          createdAt: new Date().toISOString().split('T')[0]
        };
        onAddCompany(newCompany);
        setFormData({
          name: '',
          ruc: '',
          ciiu: '',
          address: '',
          email: '',
          type: 'Minería',
          tipoActividad: 'Minería'
        });
        setLogo(null);
        setLogoPreview(null);
        // Reset file input
        const fileInput = document.getElementById('logo-upload');
        if (fileInput) fileInput.value = '';
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-gray-800">
          {editingCompany ? 'Editar Empresa' : 'Registrar Nueva Empresa'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Empresa *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RUC *
            </label>
            <input
              type="text"
              name="ruc"
              value={formData.ruc}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CIIU
            </label>
            <input
              type="text"
              name="ciiu"
              value={formData.ciiu}
              onChange={handleChange}
              placeholder="Código CIIU"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Empresa *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {companyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Actividad *
            </label>
            <select
              name="tipoActividad"
              value={formData.tipoActividad}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {actividadesDisponibles.map(actividad => (
                <option key={actividad} value={actividad}>{actividad}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo de la Empresa
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {logoPreview && (
              <div className="mt-2">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-24 h-24 object-contain border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-5 h-5" />
            {editingCompany ? 'Actualizar Empresa' : 'Registrar Empresa'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;

