export const formatLongDate = (date: string) => {
    const d = new Date(date.split("-").toReversed().join("-")+'T00:00:00');
    return d.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
