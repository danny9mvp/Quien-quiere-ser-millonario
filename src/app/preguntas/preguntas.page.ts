import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Grupo } from '../model/grupo';
import { Pregunta } from '../model/pregunta';
import { Opcion } from '../model/opcion';
import { ModalPerdioPage } from '../modal-perdio/modal-perdio.page';
import { ModalGanadorPage } from '../modal-ganador/modal-ganador.page';
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  private contadorPreguntas:number;
  private contadorPreguntasAcertadas:number;
  private contadorGrupos:number;  
  private preguntasChimbasElegidas=[];
  private preguntasNormalesElegidas=[];
  private preguntasImposiblesElegidas=[];
  private grupos:Grupo[];
  private premios:number[];
  private premioActual:number;
  private premioAsegurado:number;
  private ganador:boolean;   

  private esconderOpcionA:boolean; 
  private esconderOpcionB:boolean;
  private esconderOpcionC:boolean;
  private esconderOpcionD:boolean;

  private ayudaCincuentaCincuentaFueUsada:boolean;
  private ayudaLlamadaAmigoFueUsada:boolean;
  private ayudaPublicoFueUsada:boolean;

  private opcionAporcentaje:number;
  private opcionBporcentaje:number;
  private opcionCporcentaje:number;
  private opcionDporcentaje:number;

  constructor(public modalController: ModalController) {
  	this.contadorPreguntas=1;
  	this.contadorGrupos=1;
    this.premios=[100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,1000000];    
    this.contadorPreguntasAcertadas=0;
    this.premioActual=100;
    this.premioAsegurado=0;
    this.ganador=false;
    this.esconderOpcionA = false;
    this.esconderOpcionB = false;
    this.esconderOpcionC = false;
    this.esconderOpcionD = false;
    this.ayudaCincuentaCincuentaFueUsada = false;
    this.ayudaLlamadaAmigoFueUsada = false;
    this.ayudaPublicoFueUsada = false;
    this.opcionAporcentaje = 0;
    this.opcionBporcentaje = 0;
    this.opcionCporcentaje = 0;
    this.opcionDporcentaje = 0;
  }

  ngOnInit() {
  	this.inicializarPreguntas();
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
  async modalPerdio(){    
    const modal = await this.modalController.create({
      component: ModalPerdioPage,
      componentProps: {
        premio: this.premioAsegurado
      },      
      backdropDismiss:false
    });
    await modal.present();
    this.inicializarPreguntas();
    this.reiniciarVariables();
  }
  async modalGanador(){    
    const modal = await this.modalController.create({
      component: ModalGanadorPage,
      componentProps: {
        premio: 1000000
      },      
      backdropDismiss:false
    });
    await modal.present();
    this.inicializarPreguntas();
    this.reiniciarVariables();
  }
  ayudaCincuentaCincuenta(){    
    let gruposTemp=[...this.grupos];
    var opcionesProbables;    
    for(let g of gruposTemp){
      if(g.getId() == this.contadorGrupos){
        for(let p of g.getListaPreguntas()){
          if(p.getId() == this.contadorPreguntas){            
            opcionesProbables = [...p.getOpciones()].sort(function(o1,o2){
              return o2.getProbabilidadCorrecta() - o1.getProbabilidadCorrecta();
            });           
          }
        }
      }
    }
    let opcion1 = opcionesProbables[0];
            let opcion2 = opcionesProbables[1];
            if(opcion1.getId()==1 && opcion2.getId()==2){
              this.esconderOpcionC=true;
              this.esconderOpcionD=true;
            }
            if(opcion1.getId()==1 && opcion2.getId()==3){
              this.esconderOpcionB=true;
              this.esconderOpcionD=true;
            }
            if(opcion1.getId()==1 && opcion2.getId()==4){
              this.esconderOpcionB=true;
              this.esconderOpcionC=true;
            }
            if(opcion1.getId()==2 && opcion2.getId()==1){
              this.esconderOpcionC=true;
              this.esconderOpcionD=true;
            }
            if(opcion1.getId()==2 && opcion2.getId()==3){
              this.esconderOpcionA=true;
              this.esconderOpcionD=true;
            }
            if(opcion1.getId()==2 && opcion2.getId()==4){
              this.esconderOpcionA=true;
              this.esconderOpcionC=true;
            }
            if(opcion1.getId()==3 && opcion2.getId()==1){
              this.esconderOpcionD=true;
              this.esconderOpcionB=true;
            }
            if(opcion1.getId()==3 && opcion2.getId()==2){
              this.esconderOpcionD=true;
              this.esconderOpcionA=true;
            }
            if(opcion1.getId()==3 && opcion2.getId()==4){
              this.esconderOpcionA=true;
              this.esconderOpcionB=true;
            }
            this.ayudaCincuentaCincuentaFueUsada=true;
  }
  ayudaLlamadaAmigo(){    
    let gruposTemp=[...this.grupos];
    var respuesta;    
    for(let g of gruposTemp){
      if(g.getId() == this.contadorGrupos){
        for(let p of g.getListaPreguntas()){
          if(p.getId() == this.contadorPreguntas){            
            var opcionesProbables = [...p.getOpciones()];
            respuesta = opcionesProbables.find(x => x.getEsCorrecta() === true).getId();
          }
        }
      }     
    }
     if(respuesta == 1){
        this.esconderOpcionB=true;
        this.esconderOpcionC=true;
        this.esconderOpcionD=true;
      }
      if(respuesta == 2){
        this.esconderOpcionA=true;
        this.esconderOpcionC=true;
        this.esconderOpcionD=true;
      }
      if(respuesta == 3){
        this.esconderOpcionA=true;
        this.esconderOpcionB=true;
        this.esconderOpcionD=true;
      }
      if(respuesta == 4){
        this.esconderOpcionA=true;
        this.esconderOpcionB=true;
        this.esconderOpcionC=true;
      }
    this.ayudaLlamadaAmigoFueUsada = true;
  }
  ayudaPublico(){
    let gruposTemp=[...this.grupos];
    for(let g of gruposTemp){
      if(g.getId() == this.contadorGrupos){
        for(let p of g.getListaPreguntas()){
          if(p.getId() == this.contadorPreguntas){            
            var opcionesProbables = [...p.getOpciones()];            
          }
        }
      }     
    }
    this.opcionAporcentaje = opcionesProbables[0].getProbabilidadCorrecta();
    this.opcionBporcentaje = opcionesProbables[1].getProbabilidadCorrecta();
    this.opcionCporcentaje = opcionesProbables[2].getProbabilidadCorrecta();
    this.opcionDporcentaje = opcionesProbables[3].getProbabilidadCorrecta();
    this.ayudaPublicoFueUsada = true;
  }
  clickeado(idOpcion:number){       
  	switch (this.contadorGrupos) {
      case 1:
        console.log("Grupo A");
        for (var i = 0; i < 5; i++) {          
          {if(this.grupos[0].getId() == this.contadorGrupos && this.grupos[0].getListaPreguntas()[i].getId() == this.contadorPreguntas){
                      for(var j = 0; j < 4 ; j++){
                        if(this.grupos[0].getListaPreguntas()[i].getOpciones()[j].getId() == idOpcion){
                          if(this.grupos[0].getListaPreguntas()[i].getOpciones()[j].getEsCorrecta() == true){                  
                            this.premioActual = this.premios[this.contadorPreguntasAcertadas+1];                            
                            this.contadorPreguntasAcertadas++;                                             
                            this.contadorPreguntas++;
                            console.log("¡Genial! La respuesta es correcta. Ganaste $"+this.premioActual);
                            if(this.contadorPreguntas > 5){
                              this.contadorGrupos++;                    
                              this.contadorPreguntas = 1;
                              this.premioAsegurado=this.premios[this.contadorPreguntasAcertadas-1];
                            }
                            break;                
                          }
                          else{
                            console.log("Que pena, la respuesta no es correcta, mejor suerte a la próxima");                            
                            this.modalPerdio();
                            //this.reiniciarVariables();
                            break;
                          }
                        }
                      }
                      break;
                    }}
        }
        break;

      case 2:
        console.log("Grupo B");
        for (var i = 0; i < 5; i++) {
          if(this.grupos[1].getId() == this.contadorGrupos && this.grupos[1].getListaPreguntas()[i].getId() == this.contadorPreguntas){
            for(var j = 0; j < 4 ; j++){
            if(this.grupos[1].getListaPreguntas()[i].getOpciones()[j].getId() == idOpcion){
              if(this.grupos[1].getListaPreguntas()[i].getOpciones()[j].getEsCorrecta() == true){                
                this.premioActual = this.premios[this.contadorPreguntasAcertadas+1];                            
                this.contadorPreguntasAcertadas++;                                             
                this.contadorPreguntas++;
                console.log("¡Genial! La respuesta es correcta. Ganaste $"+this.premioActual);
                if(this.contadorPreguntas > 5){
                  this.contadorGrupos++;
                  this.contadorPreguntas = 1;
                  this.premioAsegurado=this.premios[this.contadorPreguntasAcertadas-1];
                }
                break;
              }
              else{
                console.log("Que pena, la respuesta no es correcta, mejor suerte a la próxima");                
                this.modalPerdio();
                //this.reiniciarVariables();
                break;
              }
            }
           }
           break;
          }
        }
        break;
      case 3:
        console.log("Grupo C");
        for (var i = 0; i < 5; i++) {
          if(this.grupos[2].getId() == this.contadorGrupos && this.grupos[2].getListaPreguntas()[i].getId() == this.contadorPreguntas){
            for(var j = 0; j < 4 ; j++){
            if(this.grupos[2].getListaPreguntas()[i].getOpciones()[j].getId() == idOpcion){
             if(this.grupos[2].getListaPreguntas()[i].getOpciones()[j].getEsCorrecta() == true){                
                this.premioActual = this.premios[this.contadorPreguntasAcertadas+1];                            
                this.contadorPreguntasAcertadas++;                                             
                this.contadorPreguntas++;
                console.log("¡Genial! La respuesta es correcta. Ganaste $"+this.premioActual);
                if(this.contadorPreguntas > 5){
                  this.ganador=true;
                  this.modalGanador();
                }
                break;
              }
              else{
                console.log("Que pena, la respuesta no es correcta, mejor suerte a la próxima");                
                this.modalPerdio();
                //this.reiniciarVariables();
                break;
              }
            }
           }
           break;
          }
        }
        break;

      default:
        // code...
        break;
    }
    this.esconderOpcionA=false;
    this.esconderOpcionB=false;
    this.esconderOpcionC=false;
    this.esconderOpcionD=false;
    this.opcionAporcentaje=0;
    this.opcionBporcentaje=0;
    this.opcionCporcentaje=0;
    this.opcionDporcentaje=0;
  }

  inicializarPreguntas(){
    //Preguntas el Grupo A "Preguntas Chimbas"
    var opcionesChimbas1 = [new Opcion(1,"África",false,0),new Opcion(2,"Europa",false,15),new Opcion(3,"Ámérica",true,70),new Opcion(4,"Asia",false,15)];
    var opcionesChimbas2 = [new Opcion(1,"Verde, blanco, negro",false,35),new Opcion(2,"Amarillo, azul, rojo",true,50),new Opcion(3,"Morado, marrón",false,7.5),new Opcion(4,"Dorado,plateado,bronce",false,7.5)];
    var opcionesChimbas3 = [new Opcion(1,"Ornitorrinco",false,20),new Opcion(2,"Dragón de Komodo",true,40),new Opcion(3,"Manatí",false,20),new Opcion(4,"Delfín",false,20)];
    var opcionesChimbas4 = [new Opcion(1,"Marte",false,40),new Opcion(2,"Urano",false,10),new Opcion(3,"Saturno",true,40),new Opcion(4,"Júpiter",false,10)];
    var opcionesChimbas5 = [new Opcion(1,"Marlboro",false,12.5),new Opcion(2,"Redbull",false,12.5),new Opcion(3,"Hot wheels",false,37.5),new Opcion(4,"Mitsubishi",true,37.5)];
    var opcionesChimbas6 = [new Opcion(1,"Washington D.C",true,44),new Opcion(2,"Nueva York",false,44),new Opcion(3,"Los Ángeles",false,6),new Opcion(4,"Miami",false,12)];
    var opcionesChimbas7 = [new Opcion(1,"Los hijos de Uribe",false,35),new Opcion(2,"Un perro y un gato",false,15),new Opcion(3,"Un gato y un ratón",true,35),new Opcion(4,"Dos jugadores del Barcelona",false,15)];
    var opcionesChimbas8 = [new Opcion(1,"Piscis",false,20),new Opcion(2,"Cáncer",false,20),new Opcion(3,"Acuario",false,30),new Opcion(4,"Tauro",true,30)];
    var opcionesChimbas9 = [new Opcion(1,"Albert Einstein",false,10),new Opcion(2,"Alan Turing",true,40),new Opcion(3,"Bill Gates",false,30),new Opcion(4,"John Carmack",false,20)];
    var opcionesChimbas10 = [new Opcion(1,"Peter, Lois, Chris, Meg, Stewie y Brian",false,22),new Opcion(2,"Pikachu, Raichu, Pichu",false,28),new Opcion(3,"Homero, Marge, Bart, Lisa, Maggie",true,28),new Opcion(4,"Agumon, Greymon, MetalGreymon",false,22)];
    var preguntasChimbas = [new Pregunta(1,"¿En qué continente está Ecuador?","Preguntas chimbas", opcionesChimbas1), new Pregunta(2,"¿Cuáles son los colores primarios?","Preguntas chimbas", opcionesChimbas2)
    , new Pregunta(3,"¿Cuál de estos animales no es un mamífero?","Preguntas chimbas", opcionesChimbas3), new Pregunta(4,"El sexto planeta del Sistema Solar es:","Preguntas chimbas", opcionesChimbas4)
    , new Pregunta(5,"¿Cuál de estas es una marca de automóviles?","Preguntas chimbas", opcionesChimbas5), new Pregunta(6,"La capital de Estados Unidos es:","Preguntas chimbas", opcionesChimbas6)
    , new Pregunta(7,"Tom y Jerry es una serie animada que tiene como protagonistas a:","Preguntas chimbas", opcionesChimbas7), new Pregunta(8,"La segunda constelación zodiacal es:","Preguntas chimbas", opcionesChimbas8)
    , new Pregunta(9,"El creador de la primera computadora fue:","Preguntas chimbas", opcionesChimbas9), new Pregunta(10,"Los personajes principales de una serie animada de piel amarilla son:","Preguntas chimbas", opcionesChimbas10)]    
    //////////////////////////////////////////
    //Preguntas el Grupo B "Preguntas Normales"
    var opcionesNormales1 = [new Opcion(1,"Xbox, Play Station 2, PC",false,40),new Opcion(2,"Xbox, PC",true,40),new Opcion(3,"Xbox, Nintendo Gamecube y Play Station 2",false,10),new Opcion(4,"Sólo para Xbox",false,10)];
    var opcionesNormales2 = [new Opcion(1,"Independiente de Argentina",false,16),new Opcion(2,"Peñarol de Uruguay",false,8),new Opcion(3,"Olimpia de Paraguay",true,44),new Opcion(4,"Libertad de Paraguay",false,32)];
    var opcionesNormales3 = [new Opcion(1,"T-34 soviético",true,51),new Opcion(2,"M4 Sherman estadounidense",false,46),new Opcion(3,"Panzer IV alemán",false,2),new Opcion(4,"Cromwell británico",false,1)];
    var opcionesNormales4 = [new Opcion(1,"2-0 ganó Alemania",false,15),new Opcion(2,"2-0 ganó Argentina",false,1),new Opcion(3,"1-0 Ganó Argentina",false,27),new Opcion(4,"1-0 ganó Alemania",true,57)];
    var opcionesNormales5 = [new Opcion(1,"Bichos",false,39),new Opcion(2,"Monsters Inc.",false,7),new Opcion(3,"Buscando a Nemo",false,2),new Opcion(4,"Toy Story",true,52)];
    var opcionesNormales6 = [new Opcion(1,"Subotai",false,39),new Opcion(2,"Genghis Khan",true,40),new Opcion(3,"Kushluk",false,9),new Opcion(4,"Tamerlán",false,12)];
    var opcionesNormales7 = [new Opcion(1,"Los españoles en el año 1494 D.C",false,54),new Opcion(2,"Los caucásicos en la Edad de Piedra",false,11),new Opcion(3,"Los escandinavos alrededor del año 900 D.C",true,33),new Opcion(4,"Los primeros habitantes esquimales en el año 244 D.C",false,2)];
    var opcionesNormales8 = [new Opcion(1,"Composición narrativa breve que proporciona una enseñanza.",true,63),new Opcion(2,"Narración popular que cuenta un hecho real o fabuloso adornado con elementos fantásticos.",false,27),new Opcion(3,"Discurso o composición literaria en que se critican agudamente las costumbres o vicios de alguien de forma burlesca.",false,5),new Opcion(4,"Una narración en prosa, generalmente extensa, que cuenta una historia de ficción.",false,5)];
    var opcionesNormales9 = [new Opcion(1,"Francia",false,35),new Opcion(2,"España",false,25),new Opcion(3,"Italia",true,38),new Opcion(4,"Portugal",false,2)];
    var opcionesNormales10 = [new Opcion(1,"Federación Internacional de Fútbol Amateur",true,41),new Opcion(2,"Federación Internacional de Fútbol Asociada",false,41),new Opcion(3,"Federación Internacional de Fútbol Anónima",false,8),new Opcion(4,"Federación Internacional de Fútbol Abierta",false,10)];
    var preguntasNormales = [new Pregunta(1,"Halo Combat Evolved es un videojuego que fue lanzado para las plataformas:","Preguntas normales", opcionesNormales1),new Pregunta(2,"Atlético Nacional ganó su primera Copa Libertadores enfrentando en la final a:","Preguntas normales",opcionesNormales2)
    ,new Pregunta(3,"El tanque de guerra más fabricado durante la Segunda Guerra Mundial fue:","Preguntas normales",opcionesNormales3),new Pregunta(4,"La final de la Copa Mundo de Italia 1990 entre Argentina y Alemania se terminó con un marcador:","Preguntas normales",opcionesNormales4)
    ,new Pregunta(5,"La primera película animada producida por el estudio Pixar fue:","Preguntas normales", opcionesNormales5),new Pregunta(6,"El líder proclamado del Imperio Mongol fue:","Preguntas normales",opcionesNormales6)
    ,new Pregunta(7,"Los primeros extranjeros en pisar América fueron:","Preguntas normales",opcionesNormales7),new Pregunta(8,"¿Qué es una fábula?","Preguntas normales",opcionesNormales8)
    ,new Pregunta(9,"¿En qué país se encuentra la torre de Pisa?","Preguntas normales",opcionesNormales9),new Pregunta(10,"¿Qué significa FIFA?","Preguntas normales",opcionesNormales10)];    
    //////////////////////////////////////////
    //Preguntas el Grupo C "Preguntas Imposibles"
    var opcionesImposibles1 = [new Opcion(1,"Tres cuartas partes",false,27),new Opcion(2,"Cuatro terceras partes",false,35),new Opcion(3,"Una octava parte",false,18),new Opcion(4,"Una doceava parte",true,20)];
    var opcionesImposibles2 = [new Opcion(1,"Leucocitos",false,25),new Opcion(2,"Macrófagos",true,28),new Opcion(3,"Linfocitos",false,27),new Opcion(4,"Células dendríticas",false,20)];
    var opcionesImposibles3 = [new Opcion(1,"Pong!",false,38),new Opcion(2,"Spacewar!",false,25),new Opcion(3,"Tennis for two",true,31),new Opcion(4,"Super Mario Bros",false,6)];
    var opcionesImposibles4 = [new Opcion(1,"6.3 segundos",true,25),new Opcion(2,"6.2 segundos",false,25),new Opcion(3,"6.83 segundos",false,26),new Opcion(4,"6.4 segundos",false,24)];
    var opcionesImposibles5 = [new Opcion(1,"Dao De Jing",false,22),new Opcion(2,"Shi Jing",false,23),new Opcion(3,"Sun Tzu",true,30),new Opcion(4,"Confucio",false,25)];
    var opcionesImposibles6 = [new Opcion(1,"Stalingrado",false,24),new Opcion(2,"Petrogrado",false,29),new Opcion(3,"Trotskygrado",false,14),new Opcion(4,"Leningrado",true,33)];
    var opcionesImposibles7 = [new Opcion(1,"Luis XII de Francia",false,24),new Opcion(2,"Felipe I de Francia",false,29),new Opcion(3,"Carlos IX de Francia",false,14),new Opcion(4,"Luis XIV de Francia",true,33)];
    var opcionesImposibles8 = [new Opcion(1,"Agrio, dulce, salado, ácido e insaboro",false,22),new Opcion(2,"Agrio, dulce, salado, ácido y picante",false,23),new Opcion(3,"Agrio, dulce, salado, ácido y umami",true,30),new Opcion(4,"Agrio, dulce, salado, ácido y viscoso",false,25)];
    var opcionesImposibles9 = [new Opcion(1,"Pripyat",false,25),new Opcion(2,"Pristina",true,28),new Opcion(3,"Skopie",false,27),new Opcion(4,"Belgrado",false,20)];
    var opcionesImposibles10 = [new Opcion(1,"Cubierta de bambú",false,24),new Opcion(2,"Tejido de hongos ",false,29),new Opcion(3,"Corteza de madera",false,14),new Opcion(4,"Tejido animal",true,33)];
    var preguntasImposibles = [new Pregunta(1,"¿Cuánto es la cuarta parte de la tercera parte?","Preguntas imposibles", opcionesImposibles1),new Pregunta(2,"En el sistema inmunitario humano las células que se encargan de devorar cuerpos extraños son:","Preguntas imposibles",opcionesImposibles2)
    ,new Pregunta(3,"El primer videojuego de la historia fue:","Preguntas imposibles",opcionesImposibles3),new Pregunta(4,"¿Cuánto tiempo aproximado le tomaría llegar a una partícula que parte de la tierra y viaja a 1/3 de la velocidad de la luz si su destino es la luna Europa que se encuentra a 628.3 millones de km?","Preguntas imposibles",opcionesImposibles4)
    ,new Pregunta(5,"¿Quién escribió 'El Arte de la guerra'?","Preguntas imposibles", opcionesImposibles5),new Pregunta(6,"¿Cuál fue el nombre inmediatamente anterior que tuvo la ciudad de San Petersburgo?","Preguntas imposibles",opcionesImposibles6)
    ,new Pregunta(7,"¿Quién fue el llamado 'Rey del Sol' al que se le atribuye la frase 'El Estado soy yo'?","Preguntas imposibles",opcionesImposibles7),new Pregunta(8,"¿Cuáles son los cinco tipos de sabores primarios?","Preguntas imposibles",opcionesImposibles8)
    ,new Pregunta(9,"¿Cuál es la capital de Kosovo?","Preguntas imposibles",opcionesImposibles9),new Pregunta(10,"¿Con qué material se fabricaba el pergamino?","Preguntas imposibles",opcionesImposibles10)];    
    //////////////////////////////////////////    
    for (var i = 0; i < 5; i++) {
    	let aleatorio = Math.floor(Math.random()*preguntasChimbas.length);
    	let preguntaElegida = preguntasChimbas[aleatorio];
    	this.preguntasChimbasElegidas.push(preguntaElegida);
    	this.preguntasChimbasElegidas[i].id=i+1;
    	preguntasChimbas = preguntasChimbas.filter(pc => pc !== preguntaElegida);
    }
    for (var i = 0; i < 5; i++) {
    	let aleatorio = Math.floor(Math.random()*preguntasNormales.length);
    	let preguntaElegida = preguntasNormales[aleatorio];
    	this.preguntasNormalesElegidas.push(preguntaElegida);
    	this.preguntasNormalesElegidas[i].id=i+1;
    	preguntasNormales = preguntasNormales.filter(pn => pn !== preguntaElegida);
    }
    for (var i = 0; i < 5; i++) {
    	let aleatorio = Math.floor(Math.random()*preguntasImposibles.length);
    	let preguntaElegida = preguntasImposibles[aleatorio];
    	this.preguntasImposiblesElegidas.push(preguntaElegida);
    	this.preguntasImposiblesElegidas[i].id=i+1;
    	preguntasImposibles = preguntasImposibles.filter(pi => pi !== preguntaElegida);
    }    
    this.grupos=[new Grupo(1, this.preguntasChimbasElegidas),new Grupo(2, this.preguntasNormalesElegidas)
    ,new Grupo(3, this.preguntasImposiblesElegidas)];    
  }

  reiniciarVariables(){
    this.premioActual=0;
    this.contadorPreguntas=1;
    this.contadorPreguntasAcertadas=0;
    this.contadorGrupos=1;
    this.ganador=false;
  }  

}
