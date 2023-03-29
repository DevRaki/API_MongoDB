const comprasRouter = require('./comprasRouter');
const ventasRouter = require('./ventasRouter');
const proveedoresRouter = require('./proveedroesRouter');


function routerApi(app){
    app.use('/compras', comprasRouter);
    app.use('/ventas', ventasRouter);
    app.use('/proveedores', proveedoresRouter);
}

module.exports = routerApi;