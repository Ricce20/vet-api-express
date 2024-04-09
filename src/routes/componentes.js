const express = require("express")
const ComponenteModel  = require("../models/componente.model");
const router = express.Router()

router.get('/api/componentes/:componente_id', (req, res) => {
    const Id = req.params.componente_id;
    ComponenteModel 
    .findOne({componente_id:Id},req.body)
    .then((componente)=>res.json(componente))
    .catch((error)=>res.json({message:error}));
  })
  
  router.get('/api/componentes/temperatura', (req, res) => {
    
    const Id = "dht11"; // Establecer el ID del componente de manera estática
    ComponenteModel 
      .findOne({ componente_id: Id })
      .then(componente => {
        if (componente) {
          res.json(componente);
        } else {
          res.status(404).json({ message: "Componente no encontrado" });
        }
      })
      .catch(error => {
        console.error(error); // Registrar el error en la consola
        res.status(500).json({ message: error });
      });
  });
  
  
  router.get('/api/componentes', (req, res) => {
      ComponenteModel 
      .find()
      .then((componente)=>res.json(componente))
      .catch((error)=>res.json({message:error}));
  })
  
  router.post('/api/componentes/nuevoComponente', (req, res) => {
      const componente  = ComponenteModel (req.body);
      componente .save()
      .then((nuevoComponente)=>res.json(nuevoComponente))
      .catch((error)=>res.json({message:error}));
  })
  
  router.put('/api/componentes/:componente_id', async(req, res) => {
      try{
        const Id = req.params.componente_id;
        const componente  =
        await ComponenteModel.findOneAndReplace({componente_id:Id},req.body, {new:true});
        console.log(componente);
        res.json({componente});
      }
      catch(e){
       console.log(e.message);
       res.status(500).json({message:error});
      }
    
    });
  
    router.delete('/api/componentes/:componente_id', async (req, res) => {
      try {
        const nombre = req.params.componente_id;
        const componente = await ComponenteModel.findOneAndDelete({ componente_id: nombre });
        if (componente) {
          console.log('Componente eliminado:', componente);
          res.json({ message: 'Componente eliminado correctamente', componente });
        } else {
          res.status(404).json({ message: 'Componente no encontrado' });
        }
      } catch (error) {
        console.error('Error al eliminar componente:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    });
  
  router.patch('/api/componentes/:componente_id', (req, res) => {
      const { componente_id } = req.params;
      const { descripcion, ubicacion, activo, tipo, valor, medicion } = req.body;
      ComponenteModel
      .findOneAndUpdate({componente_id:componente_id }, { $set: { descripcion, ubicacion, activo, tipo, valor } }, { new: true })
      .then((componenteActualizado) => res.json(componenteActualizado))
      .catch((error) => res.json({ message: error }));
  });
  
  router.patch('/api/componentes/apagarAlimentador/:componente_id', (req, res) => {
    const { componente_id } = req.params;
    const { descripcion, ubicacion, activo, tipo, valor, medicion } = req.body;
  
    ComponenteModel.findOneAndUpdate(
      { componente_id: componente_id },
      { $set: { descripcion: "LOW" } },
      { new: true }
    )
    .then((componenteActualizado) => {
      if (componenteActualizado) {
        res.json(componenteActualizado);
      } else {
        res.status(404).json({ message: "Componente no encontrado" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
  });
  
  router.patch('/api/componentes/encenderAlimentador/:componente_id', (req, res) => {
    const { componente_id } = req.params;
    const { descripcion, ubicacion, activo, tipo, valor, medicion } = req.body;
  
    ComponenteModel.findOneAndUpdate(
      { componente_id: componente_id },
      { $set: { descripcion: "HIGH" } },
      { new: true }
    )
    .then((componenteActualizado) => {
      if (componenteActualizado) {
        res.json(componenteActualizado);
      } else {
        res.status(404).json({ message: "Componente no encontrado" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
  });
  
  router.patch('/api/componentes/enAlimentador/:componente_id', (req, res) => {
    const { componente_id } = req.params;
    const { descripcion, ubicacion, activo, tipo, valor, medicion } = req.body;
  
    ComponenteModel.findOneAndUpdate(
      { componente_id: componente_id },
      { $set: { ubicacion: "HIGH" } },
      { new: true }
    )
    .then((componenteActualizado) => {
      if (componenteActualizado) {
        res.json(componenteActualizado);
      } else {
        res.status(404).json({ message: "Componente no encontrado" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
  });
  
  router.patch('/api/componentes/apaAlimentador/:componente_id', (req, res) => {
    const { componente_id } = req.params;
    const { descripcion, ubicacion, activo, tipo, valor, medicion } = req.body;
  
    ComponenteModel.findOneAndUpdate(
      { componente_id: componente_id },
      { $set: { ubicacion: "LOW" } },
      { new: true }
    )
    .then((componenteActualizado) => {
      if (componenteActualizado) {
        res.json(componenteActualizado);
      } else {
        res.status(404).json({ message: "Componente no encontrado" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
  });
  
  
  module.exports = router