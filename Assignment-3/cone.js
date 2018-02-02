ar cone = null;
var gl = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.45, 0.25, 0.45, 1.0 );

	cone = new Cone (100)
    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	cone.render();
}

window.onload = init;
