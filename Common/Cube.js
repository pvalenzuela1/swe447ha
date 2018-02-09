function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";


    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
	  -0.5, -0.5, 0.5,//Left, Down, Forward//FRONT FACE
	   0.5, -0.5, 0.5,//Right, Down, Forward//FRONT FACE
	   0.5, 0.5, 0.5,//Right, Up, Forward//FRONT FACE
	  -0.5, 0.5, 0.5, //Left, Up, Forward //FRONT FACE
	   
	  -0.5, -0.5, -0.5,//Left, Down, Back//BACK FACE
	  -0.5, 0.5, -0.5,//Left, Up, Back//BACK FACE
	   0.5, 0.5, -0.5,//Right, Up, Back//BACK FACE
           0.5, -0.5, -0.5,//Right, Down, Back//BACK FACE
	  
	  -0.5, 0.5, -0.5,//Left, Up, Back//TOP FACE
	  -0.5, 0.5, 0.5,//Left, Up, Forward//TOP FACE
           0.5, 0.5, 0.5,//Right, Up, Forward//TOP FACE
	   0.5, 0.5, -0.5,//Right, Up, Back//TOP FACE
	
	  -0.5, -0.5, -0.5,//Left, Down, Back //BOTTOM FACE
	   0.5, -0.5, -0.5, //Right, Down, Back //BOTTOM FACE
	   0.5, -0.5, 0.5, //Right, Down, Forward //BOTTOM FACE
	  -0.5, -0.5, 0.5, //Left, Down, Forward //BOTTOM FACE	
		
           0.5, -0.5, -0.5,  // Right, Down, Back //RIGHT FACE
	   0.5, 0.5, -0.5, // Right, Up, Back //RIGHT FACE
	   0.5, 0.5, 0.5, //Right, Up, Forward   //RIGHT FACE
	   0.5, -0.5, 0.5,//Right, Down, Forward //RIGHT FACE
		
	  -0.5, -0.5, -0.5, // Left, Down, Back //LEFT FACE
	  -0.5, -0.5, 0.5, //Left, Down, Forward //LEFT FACE
	  -0.5, 0.5, 0.5,   //Left, Up, Forward //LEFT FACE
	  -0.5, 0.5, -0.5  //Left, Up, Back //LEFT FACE
            ]),
        numComponents : 3
    };
        this.colors = {
        values : new Float32Array([
		//FRONT FACE
	  	0.9,  0.5,  0.2,
   		0.9,  0.3,  0.3,
   		0.7,  0.5,  0.4,
   		0.9,  0.2,  0.5,
  
 	 	// BACK FACE
  		0.75, 0.2, 0.5,
  		0.5, 0.3, 0.3,
  		0.75, 0.4, 0.5,
  		0.4, 0.5, 0.5,
  
 	 	// TOP FACE
  		0.5,  0.2, 0.2,
  		0.5,  0.3, 0.2,
  		0.5,  0.4, 0.2,
  		0.5,  0.5, 0.2,
  
 	 	// BOTTOM FACE
  		0.2, 0.0, 0.75,
  		0.3, 0.0, 0.7,
  		0.4, 0.0,  0.65,
  		0.5, 0.0,  0.55,
  
 	 	// RIGHT FACE
   		0.3,  0.8,  0.0,
   		0.3,  0.5,  0.3,
   		0.2,  0.8,  0.0,
   		0.3,  0.9,  0.6,
  
  		// LEFT FACE
   		0.2,  0.8, 0.2,
   		0.3,  0.8, 0.2,
   		0.2,  0.8, 0.5,
   		0.2,  0.8, 0.2
        ]),
        numComponents : 3 
    };
	
	
 this.indices = { 
        values : new Uint16Array([
        0,  2,  1,      0,  3,  2,    // FRONT FACE
    	4,  6,  5,      4,  7,  6,    // BACK FACE
    	8,  10,  9,     8,  11, 10,   // TOP FACE
    	12, 14, 13,     12, 15, 14,   //BOTTOM FACE
    	16, 18, 17,     16, 19, 18,   // RIGHT FACE
    	20, 22, 21,     20, 23, 22   // LEFT FACE
        ])
    };
    this.indices.count = this.indices.values.length;

    
    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
	
    this.colors.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colors.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW);
   
	
    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );
	
    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );
    this.colors.attributeLoc = gl.getAttribLocation( this.program, "vColor");
    gl.enableVertexAttribArray( this.colors.attributeLoc);

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents, gl.FLOAT, gl.FALSE, 0, 0 );
 
	 gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    	gl.vertexAttribPointer( this.colors.attributeLoc, this.colors.numComponents, gl.FLOAT, gl.FALSE, 0, 0 );
	    
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
	    
        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );
        // Draw the cube's base
	gl.drawElements(gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0);
    }
};
