/**
 * @author Michael Guerrero / http://realitymeltdown.com
 */

var bar = 250,
	totalm = 3,
	loadedm = 0;

THREE.BlendCharacter = function() {

	this.animations = {};
	this.animations_wireframe = {};

	var action = {};
	var action_wireframe = {};

	this.mixer = this.mixer;
	this.mixer_wireframe = this.mixer_wireframe;

	this.load = function(url, materialtype, animationExist, character, onLoad) {

		var scope = this;

		var manager = new THREE.LoadingManager();

		manager.onProgress = function(item, loaded, total) {

			// console.log(item, loaded, total);
			loadedm = loadedm + 1;
			/*original bar length 250*/
			bar = 250 * loadedm / totalm;
			document.getElementById("bar").style.width = bar + "px";
			//number of model loaded
			// console.log(loadedm);
		};

		var loader = new THREE.JSONLoader(manager);

		loader.load(url, function(geometry, materials) {

			//materialtype1 original material
			if (materialtype == 1) {

				for (var i = 0; i < materials.length; i++) {
					var m = materials[i];
					//name of the geometry
					//console.log(m.name);
					if (m.name.indexOf("workscene_ChrisWright_v001_0007:dex_rig:RedBlinn") !==
						-1) {
						var mm = new THREE.MeshPhongMaterial({
							map: m.map,
							reflectivity: 0.05
						});
						mm.color = new THREE.Color(0xff3737);
						materials[i] = mm;
					}

					if (m.name.indexOf(
							"workscene_ChrisWright_v001_0007:dex_rig:BlackBlinn") !==
						-1) {
						var mm = new THREE.MeshPhongMaterial({
							map: m.map,
							reflectivity: 0.15
						}); //adding reflectivity
						//var mm =  new THREE.MeshPhongMaterial({map:m.map,ambient: 0xffff00,specular: 0xffff00, shininess: 5});
						mm.color = new THREE.Color(0x393838);
						materials[i] = mm;
					}

					if (m.name.indexOf(
							"workscene_ChrisWright_v001_0007:dex_rig:main_shader") !== -1) {
						var mm = new THREE.MeshPhongMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0,
							shininess: 0
						}); //adding reflectivity
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}

					if (m.name.indexOf(
							"workscene_ChrisWright_v001_0007:ugg_rig:main_shader1") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}

					//body of fat guy
					if (m.name.indexOf("marv_rig:main_shader") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							color: 0xff0000,
							morphTargets: true,
							// wireframe: true,
							transparent: true,
							opacity: 1
						}); //adding reflectivity

						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}

					if (m.name.indexOf("marv_rig:cloth_shader") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}

					if (m.name.indexOf("lambert2") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}

					if (m.name.indexOf("fred_rig:main_shader") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}

					if (m.name.indexOf("jack_rig:main_shader") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}

					//Ellies materials
					if (m.name.indexOf("ellie_rig:main_shader") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}

					if (m.name.indexOf("lambert4") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xf45cff);
						materials[i] = mm;
					}

					if (m.name.indexOf("lambert5") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0x6b66ff);
						materials[i] = mm;
					}

					if (m.name.indexOf("lambert3") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xffeb66);
						materials[i] = mm;
					}

					if (m.name.indexOf("lambert6") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xffffff);
						materials[i] = mm;
					}
					//Ellies materials end

					//Joes's Ellies materials
					//base shape mat
					if (m.name.indexOf("baseshapeellies") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}
					//pony tail
					if (m.name.indexOf("phong1") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xffeb66);
						materials[i] = mm;
					}

					//upper body
					if (m.name.indexOf("phong2") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xf45cff);
						materials[i] = mm;
					}
					//shoes
					if (m.name.indexOf("phong3") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xffffff);
						materials[i] = mm;
					}
					//trousers
					if (m.name.indexOf("trousers") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						}); //adding reflectivity
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0x6b66ff);
						materials[i] = mm;
					}
					//joe3 material end

					//animated guard material
					//upper body
					if (m.name.indexOf("dex_rig:RedBlinn") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 1
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xff3737);
						materials[i] = mm;
					}

					if (m.name.indexOf("dex_rig:main_shader") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 1
						}); //adding reflectivity
						//var mm =  new THREE.MeshPhongMaterial({map:m.map,ambient: 0xffff00,specular: 0xffff00, shininess: 5});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}

					if (m.name.indexOf("dex_rig:Hat_Blinn") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 1
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0x000000);
						materials[i] = mm;
					}

					if (m.name.indexOf("dex_rig:BlackBlinn") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 1
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0x393838);
						materials[i] = mm;
					}

					//gun
					if (m.name.indexOf("lambert1") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 1
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0x808080);
						materials[i] = mm;
					}

					//stella guard material
					if (m.name.indexOf("stellaguardhat") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 1
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0x000000);
						materials[i] = mm;
					}

					if (m.name.indexOf("stellaguardbase") !== -1) {
						var mm = new THREE.MeshPhongMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0,
							shininess: 0
						}); //adding reflectivity
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}
					if (m.name.indexOf("stellatop") !== -1) {
						var mm = new THREE.MeshPhongMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0,
							shininess: 0
						});
						mm.color = new THREE.Color(0xff3737);
						materials[i] = mm;
					}

					if (m.name.indexOf("stellabottom") !== -1) {
						var mm = new THREE.MeshPhongMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0,
							shininess: 0
						});
						mm.color = new THREE.Color(0x393838);
						materials[i] = mm;
					}

					if (m.name.indexOf("stellaguardgun") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 1
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0x808080);
						materials[i] = mm;
					}
					//end stella guard material
					if (m.name.indexOf("stellastellatop") !== -1) {
						var mm = new THREE.MeshPhongMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0,
							shininess: 0
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xffffff);
						materials[i] = mm;
					}

					if (m.name.indexOf("stellastellabottom") !== -1) {
						var mm = new THREE.MeshPhongMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0,
							shininess: 0
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0x3E3F40);
						materials[i] = mm;
					}
					if (m.name.indexOf("stellastellabase") !== -1) {
						var mm = new THREE.MeshLambertMaterial({
							map: m.map,
							reflectivity: 0,
							opacity: 0
						});
						mm.refractionRatio = 1;
						mm.morphTargets = true;
						mm.color = new THREE.Color(0xfabdb0);
						materials[i] = mm;
					}
				}

				THREE.Mesh.call(scope, geometry, new THREE.MeshFaceMaterial(materials));
				scope.castShadow = true;
				scope.receiveShadow = true;
				//set the position of the mesh, if it's not at the center of the scene
				scope.position.set(-100, 0, -120);

				if (animationExist == 1) {
					scope.mixer = new THREE.AnimationMixer(scope);
					//Create the animations
					for (var i = 0; i < geometry.animations.length; ++i) {
						var animName = geometry.animations[i].name;
						scope.animations[animName] = geometry.animations[i];
					}
					//warpToDuration( 5 ) --> make the animation quicker
					if (geometry.animations[1]) {
						action = new THREE.AnimationAction(geometry.animations[1]);
					} else {
						action = new THREE.AnimationAction(geometry.animations[0]);
					}
					action.timeScale = 1;
					scope.mixer.addAction(action);
					action.weight = 0;
					if (character == 1) {
						blendMeshLoaded = true;
					} else if (character == 2) {
						guardMeshLoaded = true;
					}
				}
				// Loading is complete, fire the callback
				if (onLoad !== undefined) onLoad();
			}
			//materialtype2 plain material
			else if (materialtype == 2) {
				THREE.Mesh.call(scope, geometry, new THREE.MeshLambertMaterial({
					morphTargets: true,
					color: 0xfabdb0,
					transparent: true,
					opacity: 1
				}));
				scope.castShadow = true;
				scope.receiveShadow = true;
				scope.position.set(-100, 0, -120);
				if (animationExist == 1) {
					scope.mixer_2 = new THREE.AnimationMixer(scope);
					//Create the animations
					for (var i = 0; i < geometry.animations.length; ++i) {
						var animName = geometry.animations[i].name;
						scope.animations[animName] = geometry.animations[i];
						//console.log(geometry.animations[i].name);
					}
					//warpToDuration( 5 ) --> make the animation quicker
					if (geometry.animations[1]) {
						action = new THREE.AnimationAction(geometry.animations[1]);
					} else {
						action = new THREE.AnimationAction(geometry.animations[0]);
					}
					action.timeScale = 1;
					scope.mixer_2.addAction(action);
					action.weight = 0;
				}
				blendMeshLoaded = true;
				if (onLoad !== undefined) onLoad();
			}
			//materialtype3 wireframe material
			else if (materialtype == 3) {
				THREE.Mesh.call(scope, geometry, new THREE.MeshLambertMaterial({
					color: 0xff0000,
					morphTargets: true,
					wireframe: true,
					transparent: true,
					opacity: 0
				}));
				scope.position.set(-100, 0, -120);
				if (animationExist == 1) {
					scope.mixer_wireframe = new THREE.AnimationMixer(scope);
					for (var i = 0; i < geometry.animations.length; ++i) {
						var animName = geometry.animations[i].name;
						scope.mixer_wireframe[animName] = geometry.animations[i];
					}
					if (geometry.animations[1]) {
						action_wireframe = new THREE.AnimationAction(geometry.animations[1]);
					} else {
						action_wireframe = new THREE.AnimationAction(geometry.animations[0]);
					}
					action_wireframe.timeScale = 1;
					scope.mixer_wireframe.addAction(action_wireframe);
					action_wireframe.weight = 0;
					// Loading is complete, fire the callback
					if (character == 1) {
						blendMesh_wireframeLoaded = true;
					} else if (character == 2) {
						guardMesh_wireframeLoaded = true;
					}
				}
				if (onLoad !== undefined) onLoad();
			}
		});
	};
	this.update = function(dt) {
		if (this.mixer) {
			this.mixer.update(dt);
		}
	};

	this.update_2 = function(dt) {
		if (this.mixer_2) {
			this.mixer_2.update(dt);
		}
	};

	this.update_wireframe = function(dt) {
		if (this.mixer_wireframe) {
			this.mixer_wireframe.update(dt);
		}
	};

	this.play = function(animName, weight, time, timescale) {
		action.weight = 1;
		if (time) {
			this.mixer.time = time;
			//actionTime --> play at the time where ths timeline stay
			action.actionTime = time;
		}
		action.timescale = 1 * timescale;
	};

	this.play_2 = function(animName, weight, time, timescale) {
		action.weight = 1;
		if (time) {
			this.mixer_2.time = time;
			//actionTime --> play at the time where ths timeline stay
			action.actionTime = time;
		}
		action.timescale = 1 * timescale;
	};


	this.play_wireframe = function(animName, weight, time, timescale) {
		action_wireframe.weight = 1;
		if (time) {
			this.mixer_wireframe.time = time;
			//actionTime --> play at the time where ths timeline stay
			action_wireframe.actionTime = time;
		}
		action_wireframe.timescale = 1 * timescale;
	};

	this.playback = function(animName, weight, time, timescale) {
		action.weight = 1;
		if (time) {
			this.mixer.time = time;
			action.actionTime = time;
		}
		action.timescale = 1 * timescale;
	};

	this.playback_2 = function(animName, weight, time, timescale) {
		action.weight = 1;
		if (time) {
			this.mixer_2.time = time;
			action.actionTime = time;
		}
		action.timescale = 1 * timescale;
	};

	this.playback_wireframe = function(animName, weight, time, timescale) {
		action_wireframe.weight = 1;
		if (time) {
			this.mixer_wireframe.time = time;
			action_wireframe.actionTime = time;
		}
		action_wireframe.timescale = 1 * timescale;
	};

	this.pauseAll = function() {
		for (var a in this.animations) {
			if (this.animations[a].isPlaying) {
				//this.animations[a].stop();
				this.mixer.timeScale = 0;
				//this.mixer_wireframe.timeScale = 0;
			}
		}
	};

	this.pauseAt = function(time) {
		for (var a in this.animations) {
			if (this.animations[a].isPlaying) {
				// this.animations[a].update(time);
				this.mixer.timeScale = 0;
				//this.mixer_wireframe.timeScale = 0;
			}
		}
	};

	this.unPauseAll = function() {
		for (var a in this.animations) {
			if (this.animations[a].isPlaying && this.animations[a].isPaused) {
				this.animations[a].pause();
			}
		}
	};

	this.stopAll = function() {
		for (a in this.animations) {
			if (this.animations[a].isPlaying) {
				//this.animations[a].stop(0);
				this.mixer.timeScale = 0;
				//this.mixer_wireframe.timeScale = 0;
			}
			this.animations[a].weight = 0;
		}
	}
};

//THREE.BlendCharacter.prototype = Object.create(THREE.SkinnedMesh.prototype);
THREE.BlendCharacter.prototype = Object.create(THREE.Mesh.prototype);
THREE.BlendCharacter.prototype.constructor = THREE.BlendCharacter;
THREE.BlendCharacter.prototype.getForward = function() {

	var forward = new THREE.Vector3();
	return function() {
		// pull the character's forward basis vector out of the matrix
		forward.set(this.matrix.elements[8], this.matrix.elements[9], this.matrix
			.elements[10]
		);
		return forward;
	}
}
