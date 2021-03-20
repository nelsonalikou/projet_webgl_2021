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
        const ambientLight = new THREE.AmbientLight( 0xFFFFFF,0.2 ); // soft white light
        //scene.add( ambientLight );

        /*light = new THREE.DirectionalLight( 0xdddddd, 1.5 );
        light.position.set( -80, 80, 80 );
        light.angle = Math.PI / 5;
        light.penumbra = 0;
        scene.add( light );*/

        
        
        


        /**** Terre  *****/
        const earth = this.createStar(2,50,50,"terre");
        earth.receiveShadow = true;
        earth.castShadow = true;
        //scene.add( earth );

        /**** Lune  *****/
        const moon = this.createStar(1,50,50,"lune");
        moon.receiveShadow = true;
        moon.castShadow = true;
        //scene.add( moon );


        //Spot Light
        const spotLight = new THREE.SpotLight( 0x00ff00 );
        spotLight.position.set( 10, 10, 10 );
        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        //scene.add( spotLight );
        
        /*const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        scene.add( spotLightHelper );*/


        /**** Soleil  *****/
        const sun = this.createStar(8,50,50,"soleil");
        sun.castShadow = true; //default is false
        sun.receiveShadow = false; //default
        //scene.add( sun );
        /*Pour le soleil*/



        //Point Light
        const pointLight = new THREE.PointLight( 0xffff00, 5, 300,2 );
        //pointLight.position.set( sun.position.x, sun.position.y, sun.position.z );
        pointLight.position.set( 0, 0, 0 );
        pointLight.castShadow = true;
        //pointLight.penumbra = 0.8;
        //scene.add( pointLight );


        //Set up shadow properties for the light
        pointLight.shadow.mapSize.width = 1024; // default
        pointLight.shadow.mapSize.height = 1024; // default
        pointLight.shadow.camera.near = 0.5; // default
        pointLight.shadow.camera.far = 500; // default

        /*const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        scene.add( pointLightHelper );*/


        //space
        const space = this.createStar(40,50,50,"galaxie");
        //scene.add(space);
        
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
        
        window.onkeydown = function(e) {
            switch (e.keyCode) {
              case 32:
                pause = !pause;
              break;
            }
        };

        let system = this;
        let comete = system.etoileFilante();
        //scene.add( comete );

        /*let cometes = system.createStar(2,50,50,"comete");
        cometes.position.x =  0;
        cometes.position.y =  15;
        cometes.position.z =  -30;

        scene.add( cometes );*/

        /**les étoiles */
        var stars = new THREE.Group();
        //scene.add( stars );
        stars.add( sun );
        stars.add( moon );
        stars.add( earth );
        stars.add( comete );

        /**les lumières */
        var lights = new THREE.Group();
        //scene.add( lights );
        lights.add(spotLight);
        lights.add(ambientLight);
        lights.add(pointLight);


        var galaxie = new THREE.Group();
        scene.add( galaxie );
        galaxie.add(space);
        galaxie.add(stars);
        galaxie.add(lights);


        var render = function () {
            var id = requestAnimationFrame( render );
            system.Panel('stop','Paused',"0px");
            if(!pause){

                system.Panel('stop','continue',"0px");
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

                system.Panel('terre','Coordonnées Terre en X : '+ Math.round(earth.position.x*100)/100 + ', Y : ' + Math.round(earth.position.y*100)/100 + ', Z : ' + Math.round(earth.position.z*100)/100, "40px");
                system.Panel('lune','Coordonnées Lune en X : '+ Math.round(moon.position.x*100)/100 + ', Y : ' + Math.round(moon.position.y*100)/100 + ', Z : ' + Math.round(moon.position.z*100)/100, "80px");
                system.Panel('soleil','Coordonnées Soleil en X : '+ Math.round(sun.position.x*100)/100 + ', Y : ' + Math.round(sun.position.y*100)/100 + ', Z : ' + Math.round(sun.position.z*100)/100, "120px");

                //Mise en place de la pause
                //cancelAnimationFrame( id );
                var chance = Math.floor(Math.random() * 10) + 1;
                if(chance % 2 == 0){
                    //déplacment de la comete
                    comete.position.z += 1;
                }

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
        comete.position.y = (Math.floor(Math.random() * 100));
        comete.position.z = -(Math.floor(Math.random() * 100) + 50);
        //comete.position.set(100,0,0);
        return comete;
    }

    /**
     * Pour l'affichage
     */
    Panel(id,innerHTML,top) {
        var popUpDiv = document.getElementById(id);
        popUpDiv.style.width = "350px";
        //popUpDiv.style.margin = "auto";
        popUpDiv.style.top = top;
        popUpDiv.innerHTML = innerHTML;
        
    };
}

export default SolarSystem;