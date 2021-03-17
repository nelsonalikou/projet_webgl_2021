var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

light = new THREE.DirectionalLight( 0xdddddd, 1.5 );
light.position.set( -80, 80, 80 );
light.angle = Math.PI / 5;
light.penumbra = 0;
scene.add( light );

//Mise en place de l'orbite
//controls = new THREE.OrbitControls( camera );

//const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//Texture mapping
var loader = new THREE.TextureLoader();
var texture = loader.load("../images/texture_terre.jpg");

const geometry = new THREE.SphereGeometry();
var material = new THREE.MeshPhongMaterial({
color: 0xaaaaaa,
specular: 0x333333,
shininess: 15,
map: texture,//colorMap,
});
const earth = new THREE.Mesh( geometry, material );
//deplacement de la terre vers la droite
//earth.position.x = -100;
scene.add( earth );
camera.position.x = 1;
camera.position.z = 5;


var render = function () {
requestAnimationFrame( render );
earth.rotation.y += 0.05;
//controls.update();
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

