const { Router } = require("express");
require("dotenv").config();

const {
    Admin,
    Chat,
    User,
    Message,
    Op
  } = require("../db.js");
  
  const router = Router();

  const getUsers = async () => {

    const info = await User.findAll({
      include: [
        
        { model: Chat, as: "Host" },
        { model: Chat, as : "Guest"},
        { model: Message, as: "Emitter" },
       
      
       
      ],
    });
    
    const dataUser = info?.map((u) => {
      return {
        id: u.ID,
        name: u.name,
        lastName: u.lastName,
        isDeleted: u.isDeleted,
        isOnline: u.isOnline,
        isAdmin: u.isAdmin,
        img: u.img,
        email: u.email,
        password: u.password,
        Chats: u.Chats,
        address: u.address,
        street: u.street,
        city: u.city,
        coordinates: u.coordinates,
      };
    });
    return dataUser;
  };


  const filterItems = function (user, name) {
    return user.filter((u) => {
      return u.name.toLowerCase().includes(name.toLowerCase());
    });
  };
  
  router.get("/", async (req, res, next) => {
    const { name } = req.query;
    const users = await getUsers();
    try {
      if (!name) {
        res.send(users);
      } else {
        const userName = filterItems(users, name);
        userName.length > 0
          ? res.status(200).send(userName)
          : res.status(404).send({ message: "El usuario no existe" }); // aca deberia mandar
      }
    } catch (error) {
      res.status(500).send("entro al catch");
    }
  });
  router.put("/:id", async (req, res, next) => {
    const info = req.body;
  
    const { id } = req.params;
    try {
  
      const updatedUser = await User.findOne({ where: { ID: id } });
   
      info.name
        ? await updatedUser.update({
            name: info.name,
          })
        : "no updatie el name";
      info.lastName
        ? await updatedUser.update({
            lastName: info.lastName,
          })
        : "no updatie el lastName";
      info.img
        ? await updatedUser.update({
            img: info.img,
  
          })
        : "no updatie el img";
      info.isOnline
        ? await updatedUser.update({
            isOnline: info.isOnline,
          })
        : await updatedUser.update({
            isOnline: info.isOnline,
          });
      info.isAdmin
        ? await updatedUser.update({
            isAdmin: info.isAdmin,
          })
        : "no updatie el admin";
      info.street
        ? await updatedUser.update({
            street: info.street,
          })
        : "no updatie el admin";
      info.address
        ? await updatedUser.update({
            address: info.address,
          })
        : "no updatie el admin";
      info.city
        ? await updatedUser.update({
            city: info.city,
          })
        : "no updatie el admin";
      info.coordinates
        ? await updatedUser.update({
            coordinates: info.coordinates,
          })
        : "no updatie el admin";
      res.status(200).json(updatedUser);
    } catch (error) {
      res.send(error);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    const {deleted} = req.query
    const {id} = req.params
    try {
      await User.update ({
        isDeleted : deleted
      },{
        where: {ID: id}
      })
      res.send("cambio")
    } catch (error) {
      res.send(error)
  
    }
  })
  
  
  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const users = await getUsers();
    try {
      if (id) {
        let user = users.find((u) => u.id === id);
        if (user) { 
          const chats = await Chat.findAll({where : {[Op.or]:[{GuestID:id},{HostID:id}]},include:{model:Message}})
          user.chats = chats

          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "no existe el user" });
        }
      }
    } catch (error) {
      next(error);
    }
  });
  
  router.post("/", async (req, res, next) => {
    const { ID, email, img } = req.body;
    try {
      let user = await User.create({
        ID,
        email,
        img,
      });
      res.status(200).json(user); // para agarrar el id de usuario al crearlo
    } catch (error) {
      next(error);
    }
  });
  



  module.exports = router;