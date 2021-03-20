// WebGL - ALIKOU DONGMO NELSON
//import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import * as THREE from '../js/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/FilmPass.js';
import { BloomPass } from 'https://unpkg.com/three@0.126.1/examples/jsm/postprocessing/BloomPass.js';
//import * as THREEx from '../js/threex.domevents.js';

class SolarSystem
{

/** @constructor */
    constructor ()
    {
        //const container = document.getElementById( 'container' );

        var scene = new THREE.Scene();
        var aspect = window.innerWidth / window.innerHeight;
        var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
        //controls.update() must be called after any manual changes to the camera's transform
        //zoom de la camera au début
        camera.position.set( 40, 20, 1 );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        //renderer.setPixelRatio( window.devicePixelRatio );
        //container.appendChild( renderer.domElement );
        //renderer.autoClear = false;
        document.body.appendChild( renderer.domElement );


        const controls = new OrbitControls( camera, renderer.domElement );

        //AmbientLight
        const ambientLight = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
        scene.add( ambientLight );

        /*light = new THREE.DirectionalLight( 0xdddddd, 1.5 );
        light.position.set( -80, 80, 80 );
        light.angle = Math.PI / 5;
        light.penumbra = 0;
        scene.add( light );*/

        
        
        


        /**** Terre  *****/
        const earth = this.createStar(2,50,50,"terre");
        scene.add( earth );

        /**** Lune  *****/
        const moon = this.createStar(1,50,50,"lune");
        scene.add( moon );


        //Spot Light
        const spotLight = new THREE.SpotLight( 0x00ff00 );
        spotLight.position.set( 10, 10, 10 );
        scene.add( spotLight );
        
        /*const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        scene.add( spotLightHelper );*/


        /**** Soleil  *****/
        const sun = this.createStar(8,50,50,"soleil");
        scene.add( sun );
        /*Pour le soleil*/

            /*    Soleil   */
            /*let clock = new THREE.Clock();

            const textureLoader = new THREE.TextureLoader();

            let uniforms = {

                "fogDensity": { value: 0.45 },
                "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
                "time": { value: 1.0 },
                "uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
                "texture1": { value: textureLoader.load( '../images/cloud.png' ) },
                "texture2": { value: textureLoader.load( '../images/lavatile.jpg' ) }

            };

            uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
            uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;

            const size = 8;

            const material = new THREE.ShaderMaterial( {

                uniforms: uniforms,
                vertexShader: document.getElementById( 'vertexShader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentShader' ).textContent

            } );

            let sun = new THREE.Mesh( new THREE.SphereGeometry( size, 50, 50 ), material );
            sun.rotation.x = 0.3;
            scene.add( sun );

            const renderModel = new RenderPass( scene, camera );
            const effectBloom = new BloomPass( 1.25 );
            const effectFilm = new FilmPass( 0.35, 0.95, 2048, false );

            let composer = new EffectComposer( renderer );

            composer.addPass( renderModel );
            composer.addPass( effectBloom );
            composer.addPass( effectFilm );

            //

            onWindowResize();

            window.addEventListener( 'resize', onWindowResize );

        

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
            composer.setSize( window.innerWidth, window.innerHeight );

        }*/



        //Point Light
        const pointLight = new THREE.PointLight( 0xffff00, 2, 300,2 );
        pointLight.position.set( sun.position.x, sun.position.y, sun.position.z );
        pointLight.penumbra = 0.8
        scene.add( pointLight );

        /*const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        scene.add( pointLightHelper );*/


        

        //Scene
        var loader = new THREE.TextureLoader();
        var texture = loader.load("../images/texture_galaxie.jpg");
        scene.background = texture;


        let mouse = new THREE.Vector2();
        let raycaster = new THREE.Raycaster();
        let objects = [sun, earth, moon];
        let focus = sun;

        // ciblage des objets
        document.addEventListener("click", (event) => {
            let rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / (rect.width - rect.left)) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            let intersects = raycaster.intersectObjects(objects);
            if (intersects.length > 0) {
                focus = intersects[0].object;
            }
        })

        


        /*var focus = this.center(sun);focus
        controls.target.set(focus[0],focus[1],focus[2]);*/

        var pause = false;
        
        var angleTerre = 0;
        var angleLune = 0;
        

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
        window.onkeydown = function(e) {
            switch (e.keyCode) {
              case 32:
                pause = !pause;
              break;
            }
        };


           
        /*function animate() {

            requestAnimationFrame( animate );

            render();

        }*/



        let system = this;
        let comete = system.etoileFilante();
        scene.add( comete );

        /*let cometes = system.createStar(2,50,50,"comete");
        cometes.position.x =  0;
        cometes.position.y =  15;
        cometes.position.z =  -30;*/

        scene.add( cometes );

        var render = function () {
            var id = requestAnimationFrame( render );
            
            if(!pause){
                //Rotation de la Terre sur elle meme
                system.starRotation(earth,0.05);
        
                //Rotation de la lune autour de la terre
                system.starTranslation(moon,earth,5,angleLune);

                //Rotation de la terre autour du soleil
                system.starTranslation(earth,sun,20,angleTerre);

                angleTerre -= 0.5;
                angleLune -= 1;

                spotLight.position.set( moon.position.x, moon.position.y, moon.position.z );

                //Mise du changement de position de la camera
                controls.target.set(focus.position.x,focus.position.y,focus.position.z);

                //Mise en place de la pause
                //cancelAnimationFrame( id );
                var chance = Math.floor(Math.random() * 10) + 1;
                console.log(chance);
                if(chance % 2 == 0){
                    //déplacment de la comete
                    comete.position.z += 0.5;
                }
                /*const delta = 5 * clock.getDelta();

                uniforms[ 'time' ].value += 0.2 * delta;

                sun.rotation.y += 0.0125 * delta;
                sun.rotation.x += 0.05 * delta;

                renderer.clear();
                composer.render( 0.01 );*/
            }
            

            
            controls.update();
            renderer.render( scene, camera );
        };

        render();
    }




    /**Mouvement de rotation d'une étoile autour d'elle meme */
    starRotation(firstStar,speed){
        firstStar.rotation.y += speed;
    }


    /**Mouvement de rotation d'une étoile autour d'une autre */
    starTranslation(firstStar, secondStar, distanceBetweenTheTwo, angle){
        firstStar.position.x = secondStar.position.x + distanceBetweenTheTwo * Math.cos(THREE.Math.degToRad(angle));
        firstStar.position.z = secondStar.position.z + distanceBetweenTheTwo * Math.sin(THREE.Math.degToRad(angle));
    }


    /**Fonction de cration d'une étoile ou planete. Retourne la planet ainsi crée */
    createStar(radius,width,height,starName){
        //Texture mapping
        var loader = new THREE.TextureLoader();
        var texture = loader.load("../images/texture_"+starName+".jpg");

        //Géométrie
        const geometry = new THREE.SphereGeometry(radius,width,height);
        var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: texture,//colorMap,
        });
        return new THREE.Mesh( geometry, material );
    }

    etoileFilante(){
        let comete = this.createStar(0.5, 50,50, "comete");
        comete.position.x = 0;
        comete.position.y = (Math.floor(Math.random() * 100) + 15);
        comete.position.z = -(Math.floor(Math.random() * 100) + 70);
        //comete.position.set(100,0,0);
        return comete;
    }
}

export default SolarSystem;