var gl = null;
var cone = null;

function init() {

    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    try
    {
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    //cone = initShaders(cone, "Cone-vertex-shader", "Cone-fragment-shader"); //not working for me
    cone = new Cone(100);
    render();
    }
    catch(e)
    {
        alert(e.message);
    }
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    cone.render();
}

window.onload = init;
