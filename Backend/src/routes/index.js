const { Router, request, response } = require('express');
const router = Router();
const cors = require('cors');
var bodyParser = require('body-parser');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
router.use(cors(corsOptions));
router.use(bodyParser.json({ limit: '100mb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

var AWS = require('aws-sdk');
const aws_keys = require('./cred');
const ddb = new AWS.DynamoDB(aws_keys.dynamodb);

router.get('/hola', 
    (req,res) => res.json
    (
        {msg: 'bye :D'}
    )
);

router.get('/allStudent', function (req, res) {

    var params = {
        Key: { "carnet": { S: "201602870"/*req.body.username*/ }
        }, 
        TableName: "estudiantes"
    };
    ddb.getItem(params, function(err, data) {
        if (err){
          console.log(err, err.stack); 
        }
        else{
          const dataaux = data;
          if(JSON.stringify(dataaux) == "{}"){
            res.send({ 'msg': 'estudiante no existe' });
          }
          else{
            res.send({ 'msg': data });
          }
        }             
    });
});

//------------------------------------------

// Creación de nuevos estudiantes
router.post('/newStudent', function (req, res) {

    ddb.putItem({
        TableName: "estudiantes",
        Item: {
          "carnet": { S: req.body.carnet },
          "CUI": { S: req.body.CUI },
          "nombre": { S: req.body.nombre },
          "fechanac": { S: req.body.fechanac },
          "email": { S: req.body.email }
        }
      }, function (err, data) {
        if (err) {
            res.json
            (
                { msg: err }
            );
        } else {
            res.json
            (
                { msg: 'Estudiante ingreso con exito' }
            );
        }
      });
});    

//  Creación de nuevos cursos
router.post('/newCourse', function (req, res) {
    
    ddb.putItem({
        TableName: "cursos",
        Item: {
          "codigo": { S: req.body.codigo },
          "nombre": { S: req.body.nombre },
          "creditos_necesarios": { S: req.body.creditos_necesarios },
          "creditos_otorgados": { S: req.body.creditos_otorgados }
        }
      }, function (err, data) {
        if (err) {
            res.json
            (
                { msg: err }
            );
        } else {
            res.json
            (
                { msg: 'Estudiante ingreso con exito' }
            );
        }
      });
}); 

//  Registro de actividades
router.post('/newActiviy', function (req, res) {

    ddb.putItem({
        TableName: "actividades",
        Item: {
          "tipo": { S: req.body.tipo },
          "fecha_inicio": { S: req.body.fecha_inicio },
          "fecha_fin": { S: req.body.fecha_fin }
        }
      }, function (err, data) {
        if (err) {
            res.json
            (
                { msg: err }
            );
        } else {
            res.json
            (
                { msg: 'Estudiante ingreso con exito' }
            );
        }
      });
});

//  Asignación de cursos por estudiante
router.post('/newAssignation', function (req, res) {

  var indiceAleatorio = parseInt(Math.random() * (10952 - 1) + 1);

    ddb.putItem({
        TableName: "Assignation",
        Item: {
          "codigo": { S: String(indiceAleatorio) },
          "carnet": { S: req.body.carnet },
          "curso": { S: req.body.curso },
          "periodo": { S: req.body.periodo }
        }
      }, function (err, data) {
        if (err) {
            res.json
            (
                { msg: err }
            );
        } else {
            res.json
            (
                { msg: 'Assignation success' }
            );
        }
      });
}); 

//  Ingreso de notas por actividad
router.post('/newNota', function (req, res) {

  var indiceAleatorio = parseInt(Math.random() * (10952 - 1) + 1);

    ddb.putItem({
        TableName: "notas",
        Item: {
          "codigo": { S: String(indiceAleatorio) },
          "carnet": { S: req.body.carnet },
          "tipo": { S: req.body.tipo },
          "nota": { S: req.body.nota }
        }
      }, function (err, data) {
        if (err) {
            res.json
            (
                { msg: err }
            );
        } else {
            res.json
            (
                { msg: 'notas success' }
            );
        }
      });
}); 

//  Visualizar los estudiantes asignados por curso

router.post('/viewAssignation', function (req, res) {

  /**
   * let aux = {
            "nombre_curso" : String(dataaux.Item.nombre.S),
            "carnet" : String(asignacion.carnet.S),
            "periodo" : String(asignacion.periodo.S)
          }
          asignaciones_limpias.push(aux)
   */

  var params_ = {
    Key: { "codigo": { S: String(req.body.curso) }
    }, 
    TableName: "cursos"
  };
  ddb.getItem(params_, function(err, data_) {
      if (err){
        console.log(err, err.stack); 
      }
      else{
        const dataaux = data_;
        if(JSON.stringify(dataaux) == "{}"){
          res.send({ 'msg': 'estudiante no existe' });
        }
        else{
          // "nombre_curso" : String(dataaux.Item.nombre.S)

          const params = 
          {
            // Specify which items in the results are returned.
            FilterExpression: "curso = :topic",
            // Define the expression attribute value, which are substitutes for the values you want to compare.
            ExpressionAttributeValues: {
              ":topic": {S: String(req.body.curso)}
            },
            // Set the projection expression, which are the attributes that you want.
            //ProjectionExpression: "Season, Episode, Title, Subtitle",
            TableName: "Assignation",
          };
        
          ddb.scan(params, function (err, data) 
          {
            if (err) {
              console.log("Error", err);
            } else {
              console.log("Success", data);
              let asignaciones = []
              data.Items.forEach(function (element, index, array) {
                asignaciones.push(element)
              });
        
              let asignaciones_limpias = []
              asignaciones.forEach(function(asignacion, indice, array) {
                
                let aux = {
                  "nombre_curso" : String(dataaux.Item.nombre.S),
                  "carnet" : String(asignacion.carnet.S),
                  "periodo" : String(asignacion.periodo.S)
                }
                asignaciones_limpias.push(aux)
        
              })
        
              res.json
              (
                  { asignacionees: asignaciones_limpias  }
              );
              
            }
          });


        }
      }             
  });

  

}); 

//  Visualizar notas por actividad

router.post('/viewNotas', function (req, res) {

  const params = 
  {
    // Specify which items in the results are returned.
    FilterExpression: "tipo = :topic",
    // Define the expression attribute value, which are substitutes for the values you want to compare.
    ExpressionAttributeValues: {
      ":topic": {S: String(req.body.tipo)}
    },
    // Set the projection expression, which are the attributes that you want.
    //ProjectionExpression: "Season, Episode, Title, Subtitle",
    TableName: "notas",
  };

  ddb.scan(params, function (err, data) 
  {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
      let asignaciones = []
      data.Items.forEach(function (element, index, array) {
        asignaciones.push(element)
      });

      let asignaciones_limpias = []
      asignaciones.forEach(function(asignacion, indice, array) {
        
        let aux = {
          "actividad" : String(req.body.tipo),
          "carnet" : String(asignacion.carnet.S),
          "nota" : String(asignacion.nota.S)
        }
        asignaciones_limpias.push(aux)

      })

      res.json
      (
          { asignacionees: asignaciones_limpias  }
      );
      
    }
  });

}); 

module.exports = router;