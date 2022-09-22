import express from "express";
import { conectar } from "../modelo/db_conectar.js";
var crud_clientes=({})
crud_clientes.leer = (req,res) =>{
    conectar.query('select e.id_estudiante, e.carne, e.nombres, e.apellidos, e.direccion, e.telefono,e.genero, e.email,  date_format(e.fecha_nacimiento,"%d/%m/%Y") as fecha_nacimiento,  date_format(e.fecha_nacimiento,"%Y-%m-%d") as fecha_aux '+
    'from estudiantes e ',(error, result) =>{
        if(error){
            throw error;
        }else{
            
            let genero = ['F','M']
            res.render('estudiantes/index',{resultado:result, generos:genero})

            
        }
        
    });
};

crud_clientes.cud = (req,res) =>{
    let btn_crear = req.body.btn_crear;
    let btn_actualizar = req.body.btn_actualizar;
    let btn_eliminar = req.body.btn_eliminar;

    let id_estudiante = req.body.text_id;
    let carne= req.body.text_carne;
    let nombres= req.body.text_nombres;
    let apellidos= req.body.text_apellidos;
    let direccion= req.body.text_direccion;
    let telefono= req.body.text_telefono;
    let email= req.body.txt_email;
    let genero= req.body.genero;
    let fecha_nacimiento= req.body.text_fecha;
    console.log(email)
    if(btn_crear){
        conectar.query('insert into estudiantes set ?',{carne:carne,nombres:nombres,
                                                        apellidos:apellidos,direccion:direccion,
                                                        telefono:telefono,email:email,
                                                        genero:genero,
                                                        fecha_nacimiento:fecha_nacimiento},(error, result)=>{
            if(error){
                console.log(error)
            }else{
                console.log(result)
                res.redirect('/')
            }
        })
    }
    if(btn_actualizar){
        conectar.query('update estudiantes set ? where id_estudiante = ?',[{carne:carne,nombres:nombres,
            apellidos:apellidos,direccion:direccion,
            telefono:telefono,email:email,
            genero:genero,
            fecha_nacimiento:fecha_nacimiento},id_estudiante],(error, result)=>{
            if(error){
            console.log(error)
            }else{
            console.log(result)
            res.redirect('/')
            }
            })
    }
    if(btn_eliminar){
        conectar.query('delete from estudiantes where id_estudiante = ?',id_estudiante,(error, result)=>{
            if(error){
            console.log(error)
            }else{
            console.log(result)
            res.redirect('/')
            }
            })
    }
};

export{crud_clientes}