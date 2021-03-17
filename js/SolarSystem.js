

var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const controls = new THREE.OrbitControls( camera, renderer.domElement );

//AmbientLight
/*const ambientLight = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
scene.add( ambientLight );*/






/*light = new THREE.DirectionalLight( 0xdddddd, 1.5 );
light.position.set( -80, 80, 80 );
light.angle = Math.PI / 5;
light.penumbra = 0;
scene.add( light );*/


//Texture mapping
var loader = new THREE.TextureLoader();
var texture = loader.load("../images/texture_terre.jpg");


/**** Terre  *****/
const geometry = new THREE.SphereGeometry(7,50,50);
var material = new THREE.MeshPhongMaterial({
color: 0xaaaaaa,
specular: 0x333333,
shininess: 15,
map: texture,//colorMap,
});
const earth = new THREE.Mesh( geometry, material );
scene.add( earth );

/**** Lune  *****/
texture = loader.load("../images/texture_lune.jpg");
const geometry2 = new THREE.SphereGeometry(2,50,50);
var material2 = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 15,
    map: texture,//colorMap,
});
const moon = new THREE.Mesh( geometry2, material2 );
scene.add( moon );


//Spot Light
const spotLight = new THREE.SpotLight( 0x00ff00 );
spotLight.position.set( 100, 1000, 100 );
/*spotLight.position.x = moon.position.x;
spotLight.position.y = moon.position.y;
spotLight.position.z = moon.position.z;*/
spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );


/**** Soleil  *****/
texture = loader.load("../images/texture_soleil.jpg");
const geometry3 = new THREE.SphereGeometry(50,50,50);
var material2 = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 15,
    map: texture,//colorMap,
});
const sun = new THREE.Mesh( geometry3, material2 );
//-moon_position;
sun.position.x = 0; //1495
sun.position.y = 0;
scene.add( sun );


//Point Light
const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 0;
//pointLight.position.set( 50, 50, 50 );
scene.add( pointLight );


camera.position.x = 1;
camera.position.y = 5;
camera.position.z = 5;
/*
rotationTerre = function(x0,y0,z0,x,y,z){
    if(x >= (2*x0) && y >= (2*y0) && z >= (2*z0)){
        var cpt = 0;
        while(cpt < 10){
            x = 0;
            y = 0;
            z = 0;
        }
    }else{
        x += 1;
        y += 1;
        z += 1;
    }
    return [x,y,z];
}*/
var angleTerre = 0;
var angleLune = 0;
var render = function () {
requestAnimationFrame( render );
earth.rotation.y += 0.05;
//THREE.Math.degToRad(45)
console.log(earth.position.x);

//Rotation de la lune autour de la terre
moon.position.x = earth.position.x + 10* Math.cos(THREE.Math.degToRad(angleLune));
moon.position.z = earth.position.z + 10* Math.sin(THREE.Math.degToRad(angleLune));
//Rotation de la terre autour du soleil
earth.position.x = 100 * Math.cos(THREE.Math.degToRad(angleTerre));
earth.position.z = 100 * Math.sin(THREE.Math.degToRad(angleTerre));

angleTerre += 0.5;
angleLune += 1;


controls.update();
renderer.render( scene, camera );
};

/* //AJout de groupes d'objets
var group = new THREE.Group();
scene.add( group );

group.add( mesh1 );
group.add( mesh2 );

mesh2.visible = false;
group.remove( mesh2 );

group.children // mesh1
group.parent // scene
*/


render();

