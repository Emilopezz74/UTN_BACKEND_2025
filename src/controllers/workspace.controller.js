class WorkspaceController{
    
    static  async post (request, response)  {
    try{
        
        //request.body es donde esta la carga util enviada por el cliente
        //si aplicamos express.json() en nuestra app body siempre sera de tipo objeto
        const name = request.body.name
        const image = request.body.image
        //Validar que name este y que sea valido (por ejemplo un string no VACIO de no mas de 30 caracteres)
        if(!name || typeof(name) !== 'string' || name.length > 30){

            throw new ServerError(
                400, 
                "El campo `name` debe tener un string de menos de 30 caracteres "
            )
        }
        else if(!image || typeof(image) !== 'string' ){

            throw new ServerError(
                400, 
                "El campo `image` debe tener un string de menos de 30 caracteres "
            )

        }
        else{
            //Creamos el workspace con el repository
            await WorkspacesRepository.createWorkspace(name, image)
            //Si todo salio bien respondemos con {ok: true, message: 'Workspace creado con exito'}
            return response.status(201).json({
                ok: true,
                status: 201,
                message: 'Workspace creado con exito'
            })
        }
    }
    catch(error){
        console.log(error)
        if(error.status){
            return response.status(error.status).json({
        ok: false,
        status: error.status,
        message: error.message
            }
        )
    }
    else
        return response.status(500).json(
            {
                ok: false,
                status: 500,
                message: 'Error interno del servidor'
            }
        )
    }

}

static async getAll  (request, response) {
    try{
        const workspaces = await WorkspacesRepository.getAll()
        response.json(
            {
                status: 'OK',
                message: 'Lista de espacios de trabajo obtenida correctamente',
                data: {
                    workspaces: workspaces
                }
            }
        )

    }

    catch(error){
        console.log(error)
        if(error.status){
            return response.status(error.status).json({
        ok: false,
        status: error.status,
        message: error.message
            }
        )
    }
    else
        return response.status(500).json(
            {
                ok: false,
                status: 500,
                message: 'Error interno del servidor'
            }
        )
    }
}
    static async getById(request, response) {
        try {
            const workspace_id = request.params.workspace_id

            if (validarId(workspace_id)) {
                const workspace = await WorkspacesRepository.getById(workspace_id)

                if (!workspace) {

                    throw new ServerError(
                        400,
                        `Workspace con id ${workspace_id} no encontrado`
                    )
                }
                else {

                    return response.json(
                        {
                            ok: true,
                            message: `Workspace con id ${workspace._id} obtenido`,
                            data: {
                                workspace: workspace
                            }
                        }
                    )
                }
            }
            else {
                throw new ServerError(
                    400,
                    'el workspace_id debe ser un id valido'
                )
            }
        }
        catch (error) {
            console.log(error)
            //Evaluamos si es un error que nosotros definimos
            if (error.status) {
                return response.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                return response.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: 'Error interno del servidor'
                    }
                )
            }
        }


}
}

export default WorkspaceController