const Marcadores = require("./marcadores");

class Sockets {
  constructor(io){
    this.io = io;
    this.marcadores = new Marcadores();
    this.socketEvents();
  }
//comentario
  socketEvents(){
    //On connection
    this.io.on('connection', ( socket ) => {

      //Todo: cuando alguien se conecte enviamos marcadores activos

      socket.emit('marcadores-activos', this.marcadores.activos);

      //Todo marcador-nuevo

      socket.on('marcador-nuevo', (marcador)=>{
        this.marcadores.agregarMarcador(marcador);

        socket.broadcast.emit('marcador-nuevo', marcador);
      });


      //Todo:marcador actualizado
      socket.on('marcador-actualizado', (marcador)=>{
        this.marcadores.actualizarMarcador(marcador);
        socket.broadcast.emit('marcador-actualizado', marcador);
      });
    });
    
  }
}

module.exports = Sockets;