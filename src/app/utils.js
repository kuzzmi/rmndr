export const bind = ( context, fnName ) => context[fnName] = context[fnName].bind(context);

export const nextId = () => `${ Date.now() }`;
