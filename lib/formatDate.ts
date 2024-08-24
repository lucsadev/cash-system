export const formatLongDate = (date: string) => {
    //const d = new Date(date.split("-").toReversed().join("-")+'T00:00:00');
    const d = date.split("-").length > 1 ? date.split("-") : date.split("/");
    const newDate = new Date( d.toReversed().join("-")+'T00:00:00');    
    return newDate.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        //dateStyle: "full"        
    });
}

export const formatShortDate = (date: string) => {
    const d = date.split("-").length > 1 ? date.split("-") : date.split("/");
    const newDate = new Date( d.toReversed().join("-")+'T00:00:00');    
    return newDate.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replaceAll("/", "-");
}
