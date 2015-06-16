var render, camara, escenario, figura, controls;
var ancho=window.innerWidth-10;
var alto=window.innerHeight-50;
var angulo=45;
var aspecto=ancho/alto;
var cerca=0.1;
var lejos=10000;
//ancho=800;
//alto=600;
var textura_all=new THREE.ImageUtils.loadTexture("textura/madera.jpg");
textura_all.wrapS=textura_all.wrapT=THREE.RepeatWrapping;
textura_all.repeat.set(0.05,0.05);
var mallaCubo;

    init();
    animacion();


    function init(){
        //render
        render=new THREE.WebGLRenderer();
        render.setSize(ancho,alto);
        document.getElementById('render').appendChild(render.domElement);
        //escenario
        escenario=new THREE.Scene();


        camara=new THREE.PerspectiveCamera(angulo, aspecto, cerca, lejos);
        camara.position.z=50;
        camara.position.y=10;
        escenario.add(camara);

        render.render(escenario,camara);
        //crear_cubo();
        crear_plano();
        //cargarMario1();
        controls=new THREE.OrbitControls(camara, render.domElement);

    }
    function crear_plano(){
        geometria_plano=new THREE.PlaneGeometry(100,100,10,10);
        textura_plano=new THREE.ImageUtils.loadTexture("textura/ajedrez1.jpg");
        textura_plano.wrapS=textura_plano.wrapT=THREE.RepeatWrapping;
        textura_plano.repeat.set(1,1);

        console.log("crear_plano");
        material_plano=new THREE.MeshBasicMaterial({map:textura_plano, side:THREE.DoubleSide});
        territorio=new THREE.Mesh(geometria_plano, material_plano);
        //territorio.rotation.y=-0.5;
        territorio.rotation.x=Math.PI/2;
        escenario.add(territorio);

    }
    $('#plano').click(function(){crear_plano();});
    /*
    function animacion(){
        requestAnimationFrame(animacion)
        render_modelo();

    }
*/
    function render_modelo(){
       // figura.rotation.y=figura.rotation.y+0.021;
        render.render(escenario, camara);


    }
function crear_figura(){

        //geometria
        geometria=new THREE.Geometry();
/*
        var vertices=[[2,7,0],[7,2,0],[12,7,0],[12,17,0],[7,12,0],[2,17,0],[2,7,0],
         [2,7,5],[7,2,5],[12,7,5],[12,17,5],[7,12,5],[2,17,5],[2,7,5]];
       */
        var vertices=[[2,7,0],[7,2,0],[12,7,0],[12,17,0],[7,12,0],[2,17,0],[2,7,0]];
        var long_vert=vertices.length;
        var array_extrude=[];
        for(i=0;i<long_vert;i++){
            x=vertices[i][0];
            y=vertices[i][1];
            z=vertices[i][2];
            thisvector=new THREE.Vector3(x,y,z);
            geometria.vertices.push(thisvector);
            array_extrude.push(thisvector);

        }
        var forma_figura=new THREE.Shape(array_extrude);
        var datos_extrusion={

            amount: 10,
            bevelEnabled:false,
            bevelSegments:1,
            steps:10,
            bevelThickness:100

        };

        var extrude_geometria=new THREE.ExtrudeGeometry(forma_figura, datos_extrusion);
        var textura_figura=new THREE.ImageUtils.loadTexture("textura/madera.jpg");
        textura_figura.wrapS=textura_figura.wrapT=THREE.RepeatWrapping;
        textura_figura.repeat.set(0.05,0.05);


        material_figura=new THREE.MeshBasicMaterial({map:textura_figura, side:THREE.DoubleSide, wireframe:false});
        var malla_Extrusion=new THREE.Mesh(extrude_geometria, material_figura);
        
       // elvector=new THREE.Vector3(10,0,0);
        //geometria.vertices.push(elvector);
        //agregar al escenario
        material=new THREE.ParticleBasicMaterial({color:0xff0000});
        figura=new THREE.Line(geometria, material);

        escenario.add(figura);

        escenario.add(malla_Extrusion);


}
    $('#figura').click(function(){crear_figura();});
function crear_cubo(){
  
geometria_cubo=new THREE.CubeGeometry(10, 10,10);
material_cubo=new THREE.MeshBasicMaterial({map:textura_all, side:THREE.DoubleSide, wireframe:false});

mallaCubo=new THREE.Mesh(geometria_cubo, material_cubo);

        escenario.add(mallaCubo);

}

 $('#cubo').click(function(){crear_cubo();});

 function crear_cilindro(){
  
geometria_cy=new THREE.CylinderGeometry(10, 10,20,50,50,false);
material_cy=new THREE.MeshBasicMaterial({map:textura_all, side:THREE.DoubleSide, wireframe:false});

mallaCy=new THREE.Mesh(geometria_cy, material_cy);

        escenario.add(mallaCy);

}

 $('#cilindro').click(function(){crear_cilindro();});


 function crear_esfera(){
  
geometria_cy=new THREE.SphereGeometry(10,50,50);
material_cy=new THREE.MeshBasicMaterial({map:textura_all, side:THREE.DoubleSide, wireframe:false});

mallaCy=new THREE.Mesh(geometria_cy, material_cy);

        escenario.add(mallaCy);

}

 $('#esfera').click(function(){crear_esfera();});


 function animacion(){

requestAnimationFrame(animacion);

render_modelo();

tiempo=0.0001;
distancia=100;
recorrido=distancia*tiempo;



 }
