const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  descripcion: { 
    type: String 
  },
  tipo: {
    type: String, 
    required: true 
  },
  datos: {

    type: Object,
    required: true
  },
 createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Actividadd = mongoose.model('actividad', actividadSchema);


module.exports = Actividadd;
