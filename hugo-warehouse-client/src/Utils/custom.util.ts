export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const regex = /^[a-zA-ZñÑ0-9\u00E0-\u00FC\s]*$/

export const listErrorMessage = 'Error al requerir las entidades, contacte al administrador';
export const updateErrorMessage = 'Error al actualizar la entidad, contacte al administrador';
export const addErrorMessage = 'Error al agregar la entidad, contacte al administrador';
export const deleteErrorMessage = 'Error al borrar la entidad, contacte al administrador';
