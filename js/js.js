var baseurl = "https://london.siggraph.org/model/";

if (Modernizr.webgl) {

  if ($(window).width() > 768) {
    // console.log("screen larger than 768");
  } else {
    jQuery('body').removeClass('half');
    jQuery('body').addClass('hide_menu');
    console.log("screen smaller than 768");
  }

  var blendMesh;
  var blendMesh_wireframe;
  var guardMesh;
  var guardMesh_wireframe;
  var isPlaying = 0;
  var modelfile = "";
  var guardfile = "";
  var wgl_el = document.getElementById('WebGL-output');

  /* Navigation Toggle */
  function toggle_wireframecheck() {

    if (this.checked) {

      if (totalm == 4) {
        for (var i = 0; i < blendMesh.material.materials.length; i++) {
          //make the original model visible false
          blendMesh.material.materials[i].visible = false;
        }
        //blendmesh_wireframe: wireframe model
        blendMesh_wireframe.material.opacity = 1;

      } else {
        blendMesh.material.wireframe = true;
        var color = new THREE.Color(0xff0000);
        blendMesh.material.color = color;
      }

      for (var i = 0; i < guardMesh.material.materials.length; i++) {
        guardMesh.material.materials[i].visible = false;
      }

      guardMesh_wireframe.material.opacity = 1;
      //guardMesh.material.opacity = 0;

    } else {

      if (totalm == 4) {
        for (var i = 0; i < blendMesh.material.materials.length; i++) {
          blendMesh.material.materials[i].visible = true;
        }
        blendMesh_wireframe.material.opacity = 0;
      } else {
        blendMesh.material.wireframe = false;
        var color = new THREE.Color(0xfabdb0);
        blendMesh.material.color = color;
      }

      for (var i = 0; i < guardMesh.material.materials.length; i++) {
        guardMesh.material.materials[i].visible = true;
      }
      guardMesh_wireframe.material.opacity = 0;
      //guardMesh.material.opacity = 1;
    }
  }

  var timescale = 2.2;

  function onSlowAnimation() {
    document.getElementById("slow").style.fontWeight = "800";
    document.getElementById("fast").style.fontWeight = "700";
    document.getElementById("medium").style.fontWeight = "700";
    setTimeScale(0.5);
  }

  function onMediumAnimation() {
    document.getElementById("medium").style.fontWeight = "800";
    document.getElementById("fast").style.fontWeight = "700";
    document.getElementById("slow").style.fontWeight = "700";
    setTimeScale(0.7);
  }

  function onFastAnimation() {
    document.getElementById("fast").style.fontWeight = "800";
    document.getElementById("medium").style.fontWeight = "700";
    document.getElementById("slow").style.fontWeight = "700";
    setTimeScale(2.2);
  }

  var getTimeScale = function() {
    return timescale;
  };

  function setTimeScale(scale) {
    timescale = scale;
  }

  function onStopAnimation() {
    blendMesh.stopAll();
  }

  function onPauseAnimation() {
    (isFrameStepping) ? blendMesh.unPauseAll(): blendMesh.pauseAll();
    isFrameStepping = false;
    isPlaying = 0;
  }

  function toggleInfo() {
    jQuery('#responsive-menu-icon > a').toggleClass('show').toggleClass(
      'no-show');
    if (jQuery('body').hasClass('show_overlay')) {
      jQuery('body').removeClass('show_overlay');
      jQuery('body').addClass('hide_overlay');
    } else {
      jQuery('body').removeClass('hide_overlay');
      jQuery('body').addClass('show_overlay');
    }
  }

  function toggleSubscription() {
    if (jQuery('body').hasClass('show_subscription')) {
      jQuery('body').removeClass('show_subscription');
      jQuery('body').addClass('hide_subscription');
    } else {
      jQuery('body').removeClass('hide_subscription');
      jQuery('body').addClass('show_subscription');
      jQuery('input[name="email"]').focus();
    }
  }

  jQuery(function() {
    jQuery('#ocm-toggle-icon > a').click(function() {
      toggleNav();
    });
  });

  jQuery(function() {
    jQuery('#info > a').click(function() {
      toggleInfo();
    });
  });

  jQuery(function() {
    jQuery('#subscribe > a').click(function() {
      toggleSubscription();
    });
  });

  jQuery(function() {
    jQuery('.signup > a').click(function() {
      toggleSubscription();
    });
  });

  jQuery(function() {
    jQuery('.popupBtn > a').click(function() {
      toggleInfo();
    });
  });

  //when mouse on canvas, enable zoom
  var zoomEnabled = false;

  jQuery(function() {
    $("#mycanvas")
      .mouseenter(function() {
        zoomEnabled = true;
      })
      .mouseover(function() {
        zoomEnabled = true;
      })
      .mouseout(function() {
        zoomEnabled = false;
      });
  })

  var isFrameStepping = true; //original it is static, the update is the counting
  var timeToStep = 0;
  //three js
  if (!Detector.webgl) Detector.addGetWebGLMessage();

  var clock = new THREE.Clock();
  var targetRotationX = 0;
  var targetRotationOnMouseDownX = 0;
  var targetRotationY = 0;
  var targetRotationOnMouseDownY = 0;
  var mouseX = 0;
  var mouseXOnMouseDown = 0;
  var mouseY = 0;
  var mouseYOnMouseDown = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  var group;
  var scene;
  var camera;
  var renderTarget;
  var webGLRenderer;
  var fov = 120;
  var nfov = 45;
  var guardMeshLoaded;
  var guardMesh_wireframeLoaded;
  var blendMeshLoaded;
  var blendMesh_wireframeLoaded;
  var cliplength;

  var canvas;

  var bar = 250;
  var totalm = 0;
  var loadedm = 0;

  function init(posx, posy, posz, cliptime, totalM) {

    totalm = totalM;

    document.getElementById("choosescene").style.display = "none";
    document.getElementById("loading-background").style.display = "inline";
    document.getElementById("WebGL-output").style.display = "block";
    document.getElementById("loading-background").style.display = "inline";
    document.getElementById("navbar-webglscene").style.display = "inline";
    // document.getElementById("right-half").style.display = "inline";
    document.getElementById("webglscene").style.display = "inline";
    document.getElementById("ui").style.display = "block";

    var stats = initStats();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,
      0.1, 10000);
    canvas = document.getElementById("mycanvas");
    // create a render and set the size
    webGLRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      canvas: canvas
    });
    webGLRenderer.setPixelRatio(window.devicePixelRatio);

    // webGLRenderer.setClearColor(0xD3D3D3);
    webGLRenderer.setClearColor(0xffffff);
    //
    // webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    // to antialias the shadow
    webGLRenderer.shadowMap.enabled = true;
    webGLRenderer.autoClear = false;

    // position and point the camera to the center of the scene
    camera.position.z = 500;

    //light 1
    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 4, 10);
    dirLight.position.multiplyScalar(50);
    scene.add(dirLight);
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;
    var d = 400;
    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;
    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.0001;
    dirLight.shadowDarkness = 0.55;
    //show direction of the light
    //helper
    //scene.add( new THREE.DirectionalLightHelper(dirLight, 0.2) );

    //dir light3
    dirLight3 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight3.position.set(-2, 4, -10);
    dirLight3.position.multiplyScalar(50);

    scene.add(dirLight3);
    var d3 = 400;
    // scene.add(new THREE.DirectionalLightHelper(dirLight3, 0.2));

    group = new THREE.Object3D();
    if ($(".half")[0]) {
      group.position.x = posx;
      group.position.y = posy;
      group.position.z = posz - 100;
    } else {
      group.position.x = posx;
      group.position.y = posy;
      group.position.z = posz;
    }
    scene.add(group);
    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);
    blendMesh = new THREE.BlendCharacter();
    blendMesh_wireframe = new THREE.BlendCharacter();
    guardMesh = new THREE.BlendCharacter();
    guardMesh_wireframe = new THREE.BlendCharacter();
    //	this.load = function(url, materialtype, animationExist, character, onLoad) --> 1:url, 2:materialtype(1,normal; 2,plain; 3, wireframe), 3:mesh with animation or without, 4:callback)
    if (totalm == 4) {
      guardMesh.load(guardfile, 1, 1, 2, startfourmodels);
      guardMesh_wireframe.load(guardfile, 3, 1, 2, startfourmodels);
      blendMesh.load(modelfile, 1, 1, 1, startfourmodels);
      blendMesh_wireframe.load(modelfile, 3, 1, 1, startfourmodels);
    } else if (totalm == 3) {
      guardMesh.load(guardfile, 1, 1, 2, start);
      guardMesh_wireframe.load(guardfile, 3, 1, 2, start);
      blendMesh.load(modelfile, 2, 1, 1, start);
    }
    // GROUND
    var FLOOR = 0;
    var geometry = new THREE.PlaneBufferGeometry(16000, 16000);
    var material = new THREE.MeshPhongMaterial({
      emissive: 0x888888
    });
    var ground = new THREE.Mesh(geometry, material);
    ground.position.set(0, FLOOR, 0);
    ground.rotation.x = -Math.PI / 2;
    group.add(ground);
    ground.receiveShadow = true;

    // Add TrackballControls for zoom only
    controls = new THREE.TrackballControls(camera);
    controls.target.set(0, 100, 0);
    controls.noRotate = true;
    controls.noPan = true;
    controls.noZoom = false;
    controls.dynamicDampingFactor = 0.3;
    controls.staticMoving = false;
    wgl_el.addEventListener('mousedown', onDocumentMouseDown, false);
    wgl_el.addEventListener('touchstart', onDocumentTouchStart, false);
    wgl_el.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);

    //update half size when class half exist
    updateSize();

    if ($(".ismobile")[0]) {
      if ($(".half")[0]) {
        zoomEnabled = false;
      } else {
        zoomEnabled = true;
      }
    }
    //render();
    if (cliptime) {
      initSliders(cliptime);
    }
  }

  function start() {

    if ((guardMeshLoaded == true) && (guardMesh_wireframeLoaded == true) && (
        blendMeshLoaded == true)) {
      group.add(guardMesh);
      group.add(guardMesh_wireframe);
      group.add(blendMesh);
      document.getElementById("message").style.display = "none";
      document.getElementById("progressbar").style.display = "none";
      document.getElementById("progress").style.display = "none";
      document.getElementById("loading-background").style.display = "none";
      animate();
    }

  }

  function startfourmodels() {

    if ((guardMeshLoaded == true) && (guardMesh_wireframeLoaded == true) && (
        blendMeshLoaded == true) && (blendMesh_wireframeLoaded == true)) {
      group.add(guardMesh);
      group.add(guardMesh_wireframe);
      group.add(blendMesh);
      group.add(blendMesh_wireframe);
      document.getElementById("message").style.display = "none";
      document.getElementById("progressbar").style.display = "none";
      document.getElementById("progress").style.display = "none";
      document.getElementById("loading-background").style.display = "none";
      animate();
    }
  }

  function updateSize() {
    if ($(".half")[0]) {
      camera.aspect = (window.innerWidth / 2) / window.innerHeight;
      camera.updateProjectionMatrix();
      webGLRenderer.setSize((window.innerWidth / 2), window.innerHeight);
    } else {
      camera.aspect = (window.innerWidth) / window.innerHeight;
      camera.updateProjectionMatrix();
      webGLRenderer.setSize((window.innerWidth), window.innerHeight);
    }
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  function initStats() {
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("Stats-output").appendChild(stats.domElement);
    return stats;
  }

  function onDocumentMouseDown(event) {
    //console.log(event);
    wgl_el.addEventListener('mousemove', onDocumentMouseMove, false);
    wgl_el.addEventListener('mouseup', onDocumentMouseUp, false);
    wgl_el.addEventListener('mouseout', onDocumentMouseOut, false);
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDownX = targetRotationX;
    //disable the Y control
    // mouseYOnMouseDown = event.clientY - windowHalfY;
    // targetRotationOnMouseDownY = targetRotationY;
  }

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    //mouseY = event.clientY - windowHalfY;
    //  disable the Y control
    // targetRotationY = targetRotationOnMouseDownY + (mouseY -
    //   mouseYOnMouseDown) * 0.02;
    targetRotationX = targetRotationOnMouseDownX + (mouseX -
        mouseXOnMouseDown) *
      0.02;
  }

  function onDocumentMouseUp(event) {
    wgl_el.removeEventListener('mousemove', onDocumentMouseMove, false);
    wgl_el.removeEventListener('mouseup', onDocumentMouseUp, false);
    wgl_el.removeEventListener('mouseout', onDocumentMouseOut, false);
  }

  function onDocumentMouseOut(event) {
    wgl_el.removeEventListener('mousemove', onDocumentMouseMove, false);
    wgl_el.removeEventListener('mouseup', onDocumentMouseUp, false);
    wgl_el.removeEventListener('mouseout', onDocumentMouseOut, false);
  }

  function onDocumentTouchStart(event) {
    if (event.touches.length == 1) {
      //event.preventDefault();
      mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
      targetRotationOnMouseDownX = targetRotationX;
      //disable Y
      // mouseYOnMouseDown = event.touches[0].pageY - windowHalfY;
      // targetRotationOnMouseDownY = targetRotationY;
    }
  }

  function onDocumentTouchMove(event) {
    if (event.touches.length == 1) {
      //event.preventDefault();
      mouseX = event.touches[0].pageX - windowHalfX;
      targetRotationX = targetRotationOnMouseDownX + (mouseX -
        mouseXOnMouseDown) * 0.05;
      // mouseY = event.touches[0].pageY - windowHalfY;
      // targetRotationY = targetRotationOnMouseDownY + (mouseY -
      //   mouseYOnMouseDown) * 0.05;
    }
  }

  var values = [];
  var currentSlide = 0;
  var playInterval;
  var slideDuration; // in milliseconds
  var autoRewind = true;

  function initSliders(cliptime) {
    //console.log("cliptime" + cliptime);
    $(function() {
      $("#slider").slider({
        value: 0,
        min: 0,
        max: cliptime,
        step: 0.25,
        animate: "fast",
        stop: function(event, ui) {
          //blendMesh.mixer.time = ui.value;
          console.log("stop");
          //when playing, slide to step, slide stop to play again
          if (isPlaying == true) {
            isFrameStepping = false;
          }
        },
        slide: function(event, ui) {
          //playing and continute to play after sliding
          if (isPlaying == true) {
            isFrameStepping = true;
            // console.log(ui.value); //ui.value is 0-1
            var previousVal = $(this).slider("value");
            if (previousVal > ui.value) {
              guardMesh.playback("frame_", 1, ui.value, timescale);
              guardMesh_wireframe.playback_wireframe("frame_", 1,
                ui.value, timescale);
              if (totalm == 4) {
                blendMesh.playback("frame_", 1, ui.value, timescale);
                blendMesh_wireframe.playback_wireframe("frame_", 1,
                  ui.value, timescale);
              } else {
                blendMesh.playback_2("frame_", 1, ui.value,
                  timescale);
              }
            } else {
              guardMesh.play("frame_", 1, ui.value, timescale);
              guardMesh_wireframe.play_wireframe("frame_", 1, ui.value,
                timescale);
              if (totalm == 4) {
                blendMesh.play("frame_", 1, ui.value, timescale);
                blendMesh_wireframe.play_wireframe("frame_", 1, ui.value,
                  timescale);
              } else {
                blendMesh.play_2("frame_", 1, ui.value, timescale);
              }
            }
          }
          //not playing and pause to slider value
          //console.log("isPlaying: " + isPlaying);
          if (isPlaying == false) {
            isFrameStepping = true;
            var previousVal = $(this).slider("value");
            if (previousVal > ui.value) {
              // value decreased
              guardMesh.playback("frame_", 1, ui.value, timescale);
              guardMesh_wireframe.playback_wireframe("frame_", 1,
                ui.value,
                timescale);
              if (totalm == 4) {
                blendMesh.playback("frame_", 1, ui.value, timescale);
              } else {
                blendMesh.playback_2("frame_", 1, ui.value,
                  timescale);
              }
              if (totalm == 4) {
                blendMesh_wireframe.playback_wireframe("frame_", 1,
                  ui.value,
                  timescale);
              }
            } else {
              // value increased
              guardMesh.play("frame_", 1, ui.value, timescale);
              guardMesh_wireframe.play_wireframe("frame_", 1, ui.value,
                timescale);
              if (totalm == 4) {
                blendMesh.play("frame_", 1, ui.value, timescale);
              } else {
                blendMesh.play_2("frame_", 1, ui.value, timescale);
              }
              if (totalm == 4) {
                blendMesh_wireframe.play_wireframe("frame_", 1, ui.value,
                  timescale);
              }
            }
          }
        }
      });

      $(".play").click(function() {
        //fade inout button
        if (playInterval != undefined) {
          clearInterval(playInterval);
          playInterval = undefined;
          //pausing
          onPauseAnimation.call(this);
          isPlaying == false;
          isFrameStepping = true;
          document.getElementsByClassName('pause-alt')[0].style.display =
            'none';
          $(".play-alt").fadeIn();
          return;
        }
        isFrameStepping = false;
        //play slide and animation
        playSlide();
        isPlaying = true;
      });
    });

    function playSlide() {
      //get button style underline
      switch (getTimeScale()) {
        case 1:
          onFastAnimation();
          break;
        case 0.7:
          onMediumAnimation();
          break;
        case 0.5:
          onSlowAnimation();
          break;
        default:
          onFastAnimation();
      }
      //animation play depends on whcih animation to play
      blendMesh.stopAll();
      if (totalm == 4) {
        blendMesh_wireframe.stopAll();
      }
      guardMesh.play("frame_", 1, ui.value,
        timescale);
      guardMesh_wireframe.play_wireframe("frame_", 1, ui.value,
        timescale);
      if (totalm == 4) {
        blendMesh.play("frame_", 1, ui.value,
          timescale);
        blendMesh_wireframe.play_wireframe("frame_", 1, ui.value,
          timescale);
      } else {
        blendMesh.play_2("frame_", 1, ui.value,
          timescale);
      }
      //the slide value --> play the slide
      document.getElementsByClassName('play-alt')[0].style.display = 'none';
      $(".pause-alt").fadeIn();
      isPlaying == true;
      slideDuration = cliptime;
      //setInterval, set timer to run the slider (setinterval--> do something every "slideDuration--in millisecond")
      playInterval = setInterval(function() {
        currentSlide = currentSlide + 0.25;
        //console.log("currentSlide " + currentSlide);
        if (currentSlide > values.length) {
          if (autoRewind) {
            currentSlide = 0;
          } else {
            clearInterval(playInterval);
            return;
          }
        }
        setSlide();
      }, 1);
      // console.log(playInterval);
    }

    function setSlide() {
      //slide position
      //when the animation played to 20, start from zero again so the slide position can be back to start point.
      if (guardMesh.mixer.time > cliptime) {
        guardMesh.mixer.time = 0;
      }
      if (guardMesh_wireframe.mixer_wireframe.time > cliptime) {
        guardMesh_wireframe.mixer_wireframe.time = 0;
      }
      if (totalm == 4) {
        if (blendMesh.mixer.time > cliptime) {
          blendMesh.mixer.time = 0;
        }
        if (blendMesh_wireframe.mixer_wireframe.time > cliptime) {
          blendMesh_wireframe.mixer_wireframe.time = 0;
        }
      } else {
        if (blendMesh.mixer_2.time > cliptime) {
          blendMesh.mixer_2.time = 0;
        }
      }
      //set the slider position with the animation's time
      $("#slider").slider("value", guardMesh.mixer.time);
      if (totalm == 4) {
        $("#slider").slider("value", blendMesh.mixer.time);
      } else {
        $("#slider").slider("value", blendMesh.mixer_2.time);
      }
    }
  }

  function animate() {
    //zoom in at the beginning
    fov += (nfov - fov) * .1;
    camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight,
      0.1, 10000);
    group.rotation.y += (targetRotationX - group.rotation.y) * 0.1;
    //vertical rotation
    finalRotationY = (targetRotationY - group.rotation.x);
    if (group.rotation.x <= 1 && group.rotation.x >= -1) {
      group.rotation.x += finalRotationY * 0.1;
    }
    if (group.rotation.x > 1) {
      group.rotation.x = 1
    }
    if (group.rotation.x < -1) {
      group.rotation.x = -1
    }
    requestAnimationFrame(animate, webGLRenderer.domElement);
    render();
  }

  function render() {
    //update half size when class half exist
    updateSize();
    var delta = clock.getDelta();
    var timescale = getTimeScale();
    webGLRenderer.setRenderTarget(null);
    webGLRenderer.clear();
    var stepSize = (!isFrameStepping) ? delta * timescale : timeToStep;
    guardMesh.material.needsUpdate = true;
    blendMesh.material.needsUpdate = true;
    //neccessary for wireframe settings
    group.children[0].material.needsUpdate = true;
    group.children[1].material.needsUpdate = true;
    group.children[2].material.needsUpdate = true;
    guardMesh.update(stepSize);
    guardMesh_wireframe.update_wireframe(stepSize);
    if (totalm == 4) {
      blendMesh.update(stepSize);
      blendMesh_wireframe.update_wireframe(stepSize);
    } else {
      blendMesh.update_2(stepSize);
    }
    //disable controls on model to enale focus on form
    if (jQuery('body').hasClass('show_subscription')) {
      controls.enabled = false;
    } else {
      controls.enabled = true;
    }
    if (zoomEnabled === false) {
      controls.enabled = false;
    } else {
      controls.enabled = true;
    }
    controls.minDistance = 200;
    controls.maxDistance = 1500;
    controls.update();
    webGLRenderer.render(scene, camera);
    timeToStep = 0;
    if ($(".ismobile")[0]) {
      zoomEnabled = true;
      if ($(".half")[0]) {
        zoomEnabled = false;
      } else {
        zoomEnabled = true;
      }
    }
  }

  jQuery('#viewModelBtn').on('click', function() {
    window.location.href = baseurl;
  })

  var modelsArray = {
    scene1: "models/ugg.js",
    scene2: "models/marv.js",
    scene3: "models/oldman.js",
    scene4: "models/jack.js",
    scene5: "models/ellies.js",
    scene6: "models/oldguysecondani.js",
    scene7: "models/joe4.js",
    scene8: "models/omid7.js"
  };

  var guardArray = {
    scene1: "models/guardgun1.js",
    scene2: "models/guardgun1.js",
    scene3: "models/guardgun1.js",
    scene4: "models/guntest3.js",
    scene5: "models/guardgun1.js",
    scene6: "models/guardgun1.js",
    scene7: "models/guardgun1.js",
    scene8: "models/omidguard.js"
  };

  // init(posx, posy, posz, cliptime, totalM)
  var initArray = {
    scene1: [0, -10, 0, 15.4, 3],
    scene2: [0, -10, -500, 15, 3],
    scene3: [100, -10, -100, 19.6, 3],
    scene4: [0, -10, 0, 22.9, 3],
    scene5: [0, -10, 0, 19.9, 4],
    scene6: [0, -10, 0, 14.5, 3],
    scene7: [0, -10, 0, 19.9, 4],
    scene8: [0, -10, -500, 22.9, 4]
  };

  var url = window.location.href;
  var name = url.split('/').pop();
  //track if it is archive page or scene page
  if (name != "") {
    //scene page
    document.getElementById("choosescene").style.display = "none";
    document.getElementById("WebGL-output").style.display = "none";
    document.getElementById("navbar-webglscene").style.display = "none";
    document.getElementById("webglscene").style.display = "inline";
    document.getElementById("ui").style.display = "none";
    document.getElementById("message").style.display = "inline";
    document.getElementById("progressbar").style.display = "block";
    document.getElementById("progress").style.display = "inline";
    document.getElementById("loading-background").style.display = "inline";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent)) {
      /* close the mobile messgage when user close it */

      jQuery('#inmobile-message > a').click(function() {
        document.getElementById("inmobile").style.display = "none";
        intoscene(name);
      });
    } else {
      intoscene(name);
    }
  } else {
    //archive page
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent)) {
      jQuery(function() {
        jQuery('#inmobile-message > a').click(function() {
          document.getElementById("inmobile").style.display = "none";
          document.getElementById("loading-background").style.display =
            "none";
          document.getElementById("choosescene").style.display =
            "inline";
          document.getElementById("webglscene").style.display = "none";
        });
      });
    } else {
      document.getElementById("loading-background").style.display = "none";
      document.getElementById("choosescene").style.display = "inline";
      document.getElementById("webglscene").style.display = "none";
    }
  }
  // this hack resolves https://github.com/visionmedia/page.js/issues/213
  if (document.readyState !== 'complete') {
    // load event has not fired
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.addEventListener('popstate', onpopstate, false);
      }, 0);
    }, false);
  } else {
    // load event has fired
    window.addEventListener('popstate', onpopstate, false);
  }

  function onpopstate() {
    window.location.href = baseurl;
  }
  jQuery('.model-selection').on('click', function() {
    var id = $(this).attr('id');
    intoscene(id);
    //add url after click
    var currentUrl = window.location.href;
    var newUrl = id;
    history.pushState(null, null, currentUrl);
    history.replaceState(null, null, newUrl);
  });
  // supported
  console.log("webgl supported");
  webglchecked = true;
} else {
  // not-supported
  console.log("webgl not supported");
  webglchecked = true;
}

/*toggle menu*/
function toggleNav() {
  jQuery('#responsive-menu-icon > a').toggleClass('show').toggleClass(
    'no-show');
  if (jQuery('body').hasClass('half')) {
    // Do things on Nav Close
    jQuery('body').removeClass('half');
    jQuery('body').addClass('hide_menu');
    // document.getElementById("right-half").style.display = "none";
    console.log("addclass hide menu");
  } else {
    // Do things on Nav Open
    jQuery('body').removeClass('hide_menu');
    jQuery('body').addClass('half');
    // document.getElementById("right-half").style.display = "inline";
    console.log("addclass half");
  }
}

jQuery(function() {
  jQuery('#new-toggle-icon > a').click(function() {
    // Calling a function in case you want to expand upon this.
    toggleNav();
  });
});

/* Popup modal */
function setCookies() {
  jQuery(function() {
    if (document.cookie.indexOf("visited") > -1) {
      // They've been here before. Do not open the modal popup
    } else {
      // set a new cookie and open the modal popup
      document.cookie = "visited=true; max-age=" + 60 * 60 * 24 * 30; // 60 seconds to a minute, 60 minutes to an hour, 24 hours to a day, and 10 days.
      toggleSubscription();
    }
  });
}
/* End Popup modal */

/* Either click or with url end with scene */
function intoscene(name) {
  if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent))) {
    setCookies();
  }
  var id = name;
  modelfile = modelsArray[id];
  guardfile = guardArray[id];
  init(initArray[id][0], initArray[id][1], initArray[id][2], initArray[
      id]
    [3], initArray[id][4]);

  var aboutArray = {
    aboutText: {
      'scene1': "This shot was animated by <a href='mailto:chriswrightdigital@gmail.com'>Chris Wright</a> and is part of the <a target='blank' href='https://london.siggraph.org/byoazed-2014/'>BYOA@ZED</a>  event. Models and rigs by <a href='http://artofjoe.blogspot.co.uk/' target='blank'>Joe Daniels</a>",
      'scene2': "This shot was animated by <a href='mailto:martinrossic@gmail.com'>Martin Rossi</a> and is part of the <a target='blank' href='https://london.siggraph.org/byoazed-2014/'>BYOA@ZED</a>  event. Models and rigs by <a href='http://artofjoe.blogspot.co.uk/' target='blank'>Joe Daniels</a>",
      'scene3': "This shot was animated by <a href='mailto:Owenfern3d@gmail.com'>Owen Fern</a> and is part of the <a target='blank' href='https://london.siggraph.org/byoazed-2014/'>BYOA@ZED</a>  event. Models and rigs by <a href='http://artofjoe.blogspot.co.uk/' target='blank'>Joe Daniels</a>",
      'scene4': "This shot was animated by <a href='mailto:ed.swain@gmail.com'>Eward Swain</a> and is part of the <a target='blank' href='https://london.siggraph.org/byoazed-2014/'>BYOA@ZED</a>  event. Models and rigs by <a href='http://artofjoe.blogspot.co.uk/' target='blank'>Joe Daniels</a>",
      'scene5': "This shot was animated by <a href='mailto:jamesbown@hotmail.co.uk'>James Bown</a> and is part of the <a target='blank' href='https://london.siggraph.org/byoazed-2014/'>BYOA@ZED</a>  event. Models and rigs by <a href='http://artofjoe.blogspot.co.uk/' target='blank'>Joe Daniels</a>",
      'scene6': "This shot was animated by <a href='mailto:cioffidavide@gmail.com'>Davide Cioffi</a> and is part of the <a target='blank' href='https://london.siggraph.org/byoazed-2014/'>BYOA@ZED</a>  event. Models and rigs by <a href='http://artofjoe.blogspot.co.uk/' target='blank'>Joe Daniels</a>",
      'scene7': "This shot was animated by <a href='mailto:joe5d2@hotmail.com'>Joe Darko</a> and is part of the <a target='blank' href='https://london.siggraph.org/byoazed-2014/'>BYOA@ZED</a> event. Models and rigs by <a href='http://artofjoe.blogspot.co.uk/' target='blank'>Joe Daniels</a>",
      'scene8': "This shot was animated by <a href='mailto:orajabalipour@gmail.com'>Omid Rajabalipour</a> and is part of the <a target='blank' href='https://london.siggraph.org/byoazed-2014/'>BYOA@ZED</a> event. Models and rigs by <a href='http://artofjoe.blogspot.co.uk/' target='blank'>Joe Daniels</a>"
    },
    aboutFacebookLink: {
      'scene1': 'https://www.facebook.com/dialog/share?app_id=873945512734422&display=popup&href=https%3A%2F%2Flondon.siggraph.org%2model%2Fscene1&mobile_iframe=true',
      'scene2': 'https://www.facebook.com/dialog/share?app_id=873945512734422&display=popup&href=https%3A%2F%2Flondon.siggraph.org%2model%2Fscene1&mobile_iframe=true',
      'scene3': 'https://www.facebook.com/dialog/share?app_id=873945512734422&display=popup&href=https%3A%2F%2Flondon.siggraph.org%2model%2Fscene1&mobile_iframe=true',
      'scene4': 'https://www.facebook.com/dialog/share?app_id=873945512734422&display=popup&href=https%3A%2F%2Flondon.siggraph.org%2model%2Fscene1&mobile_iframe=true',
      'scene5': 'https://www.facebook.com/dialog/share?app_id=873945512734422&display=popup&href=https%3A%2F%2Flondon.siggraph.org%2model%2Fscene1&mobile_iframe=true',
      'scene6': 'https://www.facebook.com/dialog/share?app_id=873945512734422&display=popup&href=https%3A%2F%2Flondon.siggraph.org%2model%2Fscene1&mobile_iframe=true',
      'scene7': 'https://www.facebook.com/dialog/share?app_id=873945512734422&display=popup&href=https%3A%2F%2Flondon.siggraph.org%2model%2Fscene1&mobile_iframe=true',
      'scene8': 'https://www.facebook.com/dialog/share?app_id=873945512734422&display=popup&href=https%3A%2F%2Flondon.siggraph.org%2model%2Fscene1&mobile_iframe=true'
    },
    aboutTwitterLink: {
      'scene1': 'https://twitter.com/intent/tweet?text=How%20To%20Annoy%20A%20Guard%20@londonSIGGRAPH%20%23webGL%23interactive%23animation&url=http://london.siggraph.org/model/scene1',
      'scene2': 'https://twitter.com/intent/tweet?text=How%20To%20Annoy%20A%20Guard%20@londonSIGGRAPH%20%23webGL%23interactive%23animation&url=http://london.siggraph.org/model/scene2',
      'scene3': 'https://twitter.com/intent/tweet?text=How%20To%20Annoy%20A%20Guard%20@londonSIGGRAPH%20%23webGL%23interactive%23animation&url=http://london.siggraph.org/model/scene3',
      'scene4': 'https://twitter.com/intent/tweet?text=How%20To%20Annoy%20A%20Guard%20@londonSIGGRAPH%20%23webGL%23interactive%23animation&url=http://london.siggraph.org/model/scene4',
      'scene5': 'https://twitter.com/intent/tweet?text=How%20To%20Annoy%20A%20Guard%20@londonSIGGRAPH%20%23webGL%23interactive%23animation&url=http://london.siggraph.org/model/scene5',
      'scene6': 'https://twitter.com/intent/tweet?text=How%20To%20Annoy%20A%20Guard%20@londonSIGGRAPH%20%23webGL%23interactive%23animation&url=http://london.siggraph.org/model/scene6',
      'scene7': 'https://twitter.com/intent/tweet?text=How%20To%20Annoy%20A%20Guard%20@londonSIGGRAPH%20%23webGL%23interactive%23animation&url=http://london.siggraph.org/model/scene7',
      'scene8': 'https://twitter.com/intent/tweet?text=How%20To%20Annoy%20A%20Guard%20@londonSIGGRAPH%20%23webGL%23interactive%23animation&url=http://london.siggraph.org/model/scene8'
    },
    showreelLink: {
      'scene1': "<a target='blank' href='https://vimeo.com/100931104'><img src='image/link-icon.svg' alt='showreel' width='15px;'>Showreel</a>",
      'scene2': "<a target='blank' href='https://vimeo.com/87578032'><img src='image/link-icon.svg' alt='showreel' width='15px;'>Showreel</a>",
      'scene3': "<a target='blank' href='https://vimeo.com/112739823'><img src='image/link-icon.svg' alt='showreel' width='15px;'>Showreel</a>",
      'scene4': "<a target='blank' href='https://vimeo.com/171136061'><img src='image/link-icon.svg' alt='showreel' width='15px;'>Showreel</a>",
      'scene5': "<a target='blank' href='https://vimeo.com/56030518'><img src='image/link-icon.svg' alt='showreel' width='15px;'>Showreel</a>",
      'scene6': "<a target='blank' href='https://vimeo.com/157373933'><img src='image/link-icon.svg' alt='showreel' width='15px;'>Showreel</a>",
      'scene7': "<a target='blank' href='https://vimeo.com/146131978'><img src='image/link-icon.svg' alt='showreel' width='15px;'>Showreel</a>",
      'scene8': "<a target='blank' href='https://vimeo.com/141325724'><img src='image/link-icon.svg' alt='showreel' width='15px;'>Showreel</a>"
    },
    websiteLink: {
      'scene1': "",
      'scene2': "",
      'scene3': "<a target='blank' href='http://owenfern.com/'><img src='image/link-icon.svg' alt='weblink' width='15px;'>Website</a>",
      'scene4': "<a target='blank' href='http://www.edwardswain.com'><img src='image/link-icon.svg' alt='weblink' width='15px;'>Website</a>",
      'scene5': "",
      'scene6': "",
      'scene7': "",
      'scene8': ""
    },
    linkedinLink: {
      'scene1': "<a target='blank' href='http://uk.linkedin.com/pub/chris-wright/92/65/161/'><img src='image/link-icon.svg' alt='linkedinlink' width='15px;'>Linkedin</a>",
      'scene2': "<a target='blank' href='https://www.linkedin.com/in/martinrossianimation'><img src='image/link-icon.svg' alt='linkedinlink' width='15px;'>Linkedin</a>",
      'scene3': "<a target='blank' href='https://www.linkedin.com/profile/view?id=237100563'><img src='image/link-icon.svg' alt='linkedinlink' width='15px;'>Linkedin</a>",
      'scene4': "<a target='blank' href='https://uk.linkedin.com/in/ed-swain-455b7231'><img src='image/link-icon.svg' alt='linkedinlink' width='15px;'>Linkedin</a>",
      'scene5': "<a target='blank' href='https://www.linkedin.com/pub/james-bown/22/88b/ab7'><img src='image/link-icon.svg' alt='linkedinlink' width='15px;'>Linkedin</a>",
      'scene6': "<a target='blank' href='https://www.linkedin.com/in/davide-cioffi-0a2b9822?trk=hp-identity-name'><img src='image/link-icon.svg' alt='linkedinlink' width='15px;'>Linkedin</a>",
      'scene7': "<a target='blank' href='https://www.linkedin.com/in/joedarko'><img src='image/link-icon.svg' alt='linkedinlink' width='15px;'>Linkedin</a>",
      'scene8': "<a target='blank' href='https://www.linkedin.com/profile/view?trk=nav_responsive_tab_profile&id=327927695'><img src='image/link-icon.svg' alt='linkedinlink' width='15px;'>Linkedin</a>"
    }
  }

  var aboutText = aboutArray['aboutText'][String(id)];
  var aboutFacebookLink = aboutArray['aboutFacebookLink'][String(id)];
  var aboutTwitterLink = aboutArray['aboutTwitterLink'][String(id)];
  var showreelLink = aboutArray['showreelLink'][String(id)];
  var websiteLink = aboutArray['websiteLink'][String(id)];
  var linkedinLink = aboutArray['linkedinLink'][String(id)];

  jQuery('.animator-name').html(
    aboutText
  );

  jQuery('.twitter-link').html(
    "<a href='" + aboutTwitterLink +
    "'><i class='fa fa-twitter'></i></a>"
  );

  jQuery('.facebook-link').html(
    "<div class='facebook-link-info-" + id +
    "'><i class='fa fa-facebook'></i></div>"
  );

  jQuery('.in-showreel-link').html(
    showreelLink
  );

  jQuery('.in-website-link').html(
    websiteLink
  );

  jQuery('.in-linkedin-link').html(
    linkedinLink
  );

  // facebook thumbnail,  different share button with different thumbnail
  jQuery('.facebook-link-info-scene1').click(function() {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: baseurl + 'scene1',
      title: 'How To Annoy A Guard 3D Model Viewer',
      picture: baseurl + 'shareimg/share1.png',
    }, function(response) {});
  });

  jQuery('.facebook-link-info-scene2').click(function() {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: baseurl + 'scene2',
      title: 'How To Annoy A Guard 3D Model Viewer',
      picture: baseurl + 'shareimg/share2.png',
    }, function(response) {});
  });

  jQuery('.facebook-link-info-scene3').click(function() {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: baseurl + 'scene3',
      title: 'How To Annoy A Guard 3D Model Viewer',
      picture: baseurl + 'shareimg/share3.png',
    }, function(response) {});
  });

  jQuery('.facebook-link-info-scene4').click(function() {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: baseurl + 'scene4',
      title: 'How To Annoy A Guard 3D Model Viewer',
      picture: baseurl + 'shareimg/share4.png',
    }, function(response) {});
  });

  jQuery('.facebook-link-info-scene5').click(function() {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: baseurl + 'scene5',
      title: 'How To Annoy A Guard 3D Model Viewer',
      picture: baseurl + 'shareimg/share5.png',
    }, function(response) {});
  });

  jQuery('.facebook-link-info-scene6').click(function() {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: baseurl + 'scene6',
      title: 'How To Annoy A Guard 3D Model Viewer',
      picture: baseurl + 'shareimg/share6.png',
    }, function(response) {});
  });

  jQuery('.facebook-link-info-scene7').click(function() {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: baseurl + 'scene7',
      title: 'How To Annoy A Guard 3D Model Viewer',
      picture: baseurl + 'shareimg/share7.png',
    }, function(response) {});
  });

  jQuery('.facebook-link-info-scene8').click(function() {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: baseurl + 'scene8',
      title: 'How To Annoy A Guard 3D Model Viewer',
      picture: baseurl + 'shareimg/share8.png',
    }, function(response) {});
  });

}
