#version 330 core

// pipeline-ból bejövõ per-fragment attribútumok
in vec3 vs_out_pos;
in vec3 vs_out_norm;
in vec2 vs_out_tex;

out vec4 fs_out_col;

// irány fényforrás: fény iránya
uniform vec3 light_dir = vec3(-1,-1,-1);

// fénytulajdonságok: ambiens, diffúz, ...
uniform vec3 La = vec3(0.4, 0.4, 0.4);
uniform vec3 Ld = vec3(0.6, 0.6, 0.6);

uniform sampler2D texImage;

uniform vec3 cameraDir = vec3(1.0f, 0.0f, 0.0f);
uniform float cameraSize = 0.3f;

void main()
{

	vec3 ambient = La;

	vec3 normal = normalize(vs_out_norm);
	vec3 to_light = normalize(-light_dir);
	
	float cosa = clamp(dot(normal, to_light), 0, 1);

	vec3 diffuse = cosa*Ld;

	float alpha = acos(dot(cameraDir, vs_out_pos) / length(cameraDir) / length(vs_out_pos));
	if (alpha < cameraSize)
	{
		fs_out_col = vec4(255.0f, 204.0f, 0.0f, 255.0f) / 255.0f;
		return;
	} 

	fs_out_col = vec4(ambient + diffuse, 1) * texture(texImage, vs_out_tex);
}