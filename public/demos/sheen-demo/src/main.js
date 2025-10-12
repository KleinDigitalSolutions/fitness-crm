import * as BG from './modules/background.js';
import * as CLOTH from './modules/cloth.js';
import * as FBO from './modules/fbo.js';
import * as PRE from './modules/pre.js';
import * as LIGHTS from './modules/lights.js';
import * as MOUSE from './modules/mouse.js';

let
renderer, camera, scene, lastOrientation;

function init() {

	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.gammaOutput = true;
	renderer.physicallyCorrectLights = true;

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;

	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onResize );

	// scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x0a0a0a );

	// camera
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 4000 );
	camera.position.set( 0, - 0.5, - 3.5 );
	camera.lookAt( new THREE.Vector3() );

	// pre-calculate geometry information
	PRE.calculate();

	// initialization block;
	BG.init( scene );
	CLOTH.init( scene );

	MOUSE.init( camera, renderer.domElement );
	FBO.init( renderer );

	// dispose of calculation data
	PRE.dispose();

	// initialize light
	LIGHTS.init( scene );

	// Color switcher functionality
	setupColorSwitcher();

	// start program
	animate();

}

function setupColorSwitcher() {
	const colorButtons = document.querySelectorAll('.color-btn');
	let gradientTexture = null;

	// Set first button as active
	colorButtons[0].classList.add('active');

	colorButtons.forEach(button => {
		button.addEventListener('click', () => {
			// Remove active class from all buttons
			colorButtons.forEach(btn => btn.classList.remove('active'));

			// Add active class to clicked button
			button.classList.add('active');

			// Check if it's a gradient button
			const gradientType = button.getAttribute('data-gradient');

			if (gradientType && CLOTH.mesh && CLOTH.mesh.material) {
				// Create gradient texture with higher resolution
				const canvas = document.createElement('canvas');
				canvas.width = 2048;
				canvas.height = 2048;
				const ctx = canvas.getContext('2d');

				// Define gradients
				let gradient;
				switch(gradientType) {
					case 'sunset':
						gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
						gradient.addColorStop(0, '#ff6b6b');
						gradient.addColorStop(0.5, '#ff8e53');
						gradient.addColorStop(1, '#ffe66d');
						break;
					case 'ocean':
						gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
						gradient.addColorStop(0, '#4ecdc4');
						gradient.addColorStop(0.5, '#52aad5');
						gradient.addColorStop(1, '#556ee6');
						break;
					case 'candy':
						gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
						gradient.addColorStop(0, '#f38181');
						gradient.addColorStop(0.5, '#cdb4b8');
						gradient.addColorStop(1, '#a8e6cf');
						break;
				}

				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				// Create texture from canvas
				const texture = new THREE.CanvasTexture(canvas);
				texture.wrapS = THREE.ClampToEdgeWrapping;
				texture.wrapT = THREE.ClampToEdgeWrapping;
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.repeat.set(1, 1);

				// Apply to material
				CLOTH.mesh.material.map = texture;
				CLOTH.mesh.material.color.setHex(0xffffff);
				CLOTH.mesh.material.needsUpdate = true;

			} else {
				// Solid color
				const colorHex = button.getAttribute('data-color');
				const colorValue = parseInt(colorHex, 16);

				// Update cloth color
				if (CLOTH.mesh && CLOTH.mesh.material) {
					CLOTH.mesh.material.map = null;
					CLOTH.mesh.material.color.setHex(colorValue);
					CLOTH.mesh.material.needsUpdate = true;
				}
			}
		});
	});
}

function animate() {

	if ( window.orientation != lastOrientation ) {

		lastOrientation = window.orientation;
		onResize();

	}

	LIGHTS.update();
	FBO.update();

	renderer.setRenderTarget( null );
	renderer.render( scene, camera );

	requestAnimationFrame( animate );

}

function onResize() {

	const w = window.innerWidth;
	const h = window.innerHeight;

	camera.aspect = w / h;
	camera.updateProjectionMatrix();

	renderer.setSize( w, h );

};

init();
