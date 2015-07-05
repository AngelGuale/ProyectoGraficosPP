var render, camara, escenario, figura, controls;
var ancho=window.innerWidth-10;
var alto=window.innerHeight-50;
var angulo=70;
var aspecto=ancho/alto;
var cerca=0.1;
var lejos=10000;
//ancho=800;
//alto=600;
var textura_all=new THREE.ImageUtils.loadTexture("textura/madera.jpg");
textura_all.wrapS=textura_all.wrapT=THREE.RepeatWrapping;
textura_all.repeat.set(0.05,0.05);
var mallaCubo;
var activeGeometry;
var activeMesh;
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
        camara.position.z=90;
        camara.position.y=20;
				camara.position.x=0;
        escenario.add(camara);

        render.render(escenario,camara);
        //crear_cubo();
        crear_plano();
        //cargarMario1();
				//descomenta la siguiente linea para habilitar el movimiento de la camara
				//controls=new THREE.OrbitControls(camara, render.domElement);

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
       var size = 10; 
    geometria_cubo=new THREE.CubeGeometry(size, size, size);
    material_cubo=new THREE.MeshBasicMaterial({map:textura_all, side:THREE.DoubleSide, wireframe:false});

    mallaCubo=new THREE.Mesh(geometria_cubo, material_cubo);

    //Colocar encima del plano
    mallaCubo.position.y = size/2;
    escenario.add(mallaCubo);
    activeGeometry = geometria_cubo;
    activeMesh = mallaCubo;	

}

 $('#cubo').click(function(){
	 crear_cubo();
 	 removeMenu($("#figuras"));
	setMenu($("#transformaciones"));
});

function crear_piramide(){
    var height = 20; 
    geometria_cy=new THREE.CylinderGeometry(0.01, height	, height, 4);
    material_cy=new THREE.MeshBasicMaterial({map:textura_all, side:THREE.DoubleSide, wireframe:false});

    mallaCy=new THREE.Mesh(geometria_cy, material_cy);
    mallaCy.position.y = height/2;
        escenario.add(mallaCy);
    activeGeometry = geometria_cy;
    activeMesh = mallaCy;	
}

 $('#piramide').click(function(){
	 crear_piramide();
 	 removeMenu($("#figuras"));
	setMenu($("#transformaciones"));
});


function crear_esfera(){
		var radio = 10, segments = 50;  
    geometria_cy=new THREE.SphereGeometry(radio,segments,segments);
    material_cy=new THREE.MeshBasicMaterial({map:textura_all, side:THREE.DoubleSide, wireframe:false});
		
    mallaCy=new THREE.Mesh(geometria_cy, material_cy);
		mallaCy.position.y = radio;
        escenario.add(mallaCy);
	 activeGeometry = geometria_cy;
 	 activeMesh = mallaCy;

}

 $('#esfera').click(function(){
	 crear_esfera()
	 removeMenu($("#figuras"));
	setMenu($("#transformaciones"));
;});

function crear_dona(){
	var radius = 10;
  var tubeRadius = 3;
  var radialSegments = 8 * 10;
  var tubularSegments = 6 * 15;
  var arc = Math.PI * 2;
  var geometry = new THREE.TorusGeometry( radius, tubeRadius, radialSegments, tubularSegments, arc );
  var material_cy=new THREE.MeshBasicMaterial({map:textura_all, side:THREE.DoubleSide, wireframe:false});
    
  for ( var i = 0; i < 1; i ++ ) {
    var mesh = new THREE.Mesh( geometry, material_cy );
		mesh.position.y = radius + tubeRadius;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    escenario.add( mesh );
  }
  activeGeometry = geometry;
  activeMesh = mesh;
}

//Esta funcion modifica cualquier figura con la matriz que quieras
function alterGeometry(geo, matrix){
	var size = geo.vertices.length;
	var i;
	for(i = 0; i < size; i++){
		var vertex = geo.vertices[i];
		var newValues = applyTransformation(matrix, vectorToArray(vertex));
		vertex.set(newValues[0], newValues[1], newValues[2]);
	}
	geo.verticesNeedUpdate = true;
}	
 
//Esta funcion modifica cualquier figura con la matriz que quieras usando coordenadas absoultas
function alterGeometryAbsolute(geo, matrix, position){
	var size = geo.vertices.length;
	var i;
	for(i = 0; i < size; i++){
		var vertex = geo.vertices[i];
		//transformar a absoultas
		vertex.set(vertex.x + position.x, vertex.y + position.y, vertex.z + position.z)
		var newValues = applyTransformation(matrix, vectorToArray(vertex));
		//colocar resultado regresando a relativas
		vertex.set(newValues[0] - position.x, newValues[1] - position.y, newValues[2] - position.z);
	}
	geo.verticesNeedUpdate = true;
}
//Esta funcion puede trasladar cualquier figura
function translateGeometry(geo, vector){
	var matrix = createTranslateMatrix(vector.x, vector.y, vector.z);
	alterGeometry(geo, matrix);
}

//Esta funcion puede hacer scaling cualquier figura
function scaleGeometry(geo, vector, position){
	var matrix = createScalingMatrix(vector.x, vector.y, vector.z);
	alterGeometryAbsolute(geo, matrix, position);
}
//Esta funcion puede rotar cualquier figura en el eje Y
function rotateYGeometry(geo, deg, position){
	var matrix = createYRotationMatrix(deg);
	alterGeometryAbsolute(geo, matrix, position);
}
//Esta funcion puede rotar cualquier figura en el eje X
function rotateXGeometry(geo, deg, position){
	var matrix = createXRotationMatrix(deg);
	alterGeometryAbsolute(geo, matrix, position);
}
//Esta funcion puede rotar cualquier figura en el eje Z
function rotateZGeometry(geo, deg, position){
	var matrix = createZRotationMatrix(deg);
	alterGeometryAbsolute(geo, matrix, position);
}
function removeMenu(menu){
	menu.removeClass("buttons-active");
	menu.addClass("buttons-inactive");
}

function setMenu(menu){
	menu.removeClass("buttons-inactive");
	menu.addClass("buttons-active");
}

 $('#dona').click(function(){
	crear_dona();
	removeMenu($("#figuras"));
	setMenu($("#transformaciones"));
 });

$('#traslacion').click(function(){
	removeMenu($("#transformaciones"));
	setMenu($("#tras-menu"));
 });

$('#tras-back').click(function(){
	removeMenu($("#tras-menu"));
	setMenu($("#transformaciones"));
});

 $('#tras-ok').click(function(){
	 var vector = [];
	 vector.x = $("#inputX").val();
	 vector.y = $("#inputY").val();
	 vector.z = $("#inputZ").val();
	translateGeometry(activeGeometry,vector);
 });

$('#rotacion').click(function(){
	removeMenu($("#transformaciones"));
	setMenu($("#rot-menu"));
 });

$('#rot-back').click(function(){
	removeMenu($("#rot-menu"));
	setMenu($("#transformaciones"));
});

 $('#rot-ok').click(function(){
	 var vector = [];
	 var deg = $("#inputDeg").val() * Math.PI;
	 var eje = $("#rot-eje").val();
	 if(eje == "X")
		rotateXGeometry(activeGeometry, deg, activeMesh.position);
 	else if(eje == "Y")
		rotateYGeometry(activeGeometry, deg, activeMesh.position);
 	else if(eje == "Z")
		rotateZGeometry(activeGeometry, deg, activeMesh.position);

 });

$('#escalamiento').click(function(){
	removeMenu($("#transformaciones"));
	setMenu($("#sca-menu"));
 });

$('#sca-back').click(function(){
	removeMenu($("#sca-menu"));
	setMenu($("#transformaciones"));
});

 $('#sca-ok').click(function(){
	 var vector = [];
	 vector.x = $("#scaX").val();
	 vector.y = $("#scaY").val();
	 vector.z = $("#scaZ").val();
	 scaleGeometry(activeGeometry,vector, activeMesh.position);
 });


 function animacion(){

requestAnimationFrame(animacion);

render_modelo();

tiempo=0.0001;
distancia=100;
recorrido=distancia*tiempo;



 }
