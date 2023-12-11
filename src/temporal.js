/*
// Cookies
app.get('/setCookie', (req, res) => {
    res.cookie('CoderCookie', 'Esta es una cookie muy poderosa', { maxAge: 100000, signed: true }).send("Cookie");
})
app.get('/getCookies', (req, res) => {
    res.send(req.signedCookies);
})
app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CoderCookie').send('Cookie Borrada');
})

// Sesiones
app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`);
    }
    else {
        req.session.counter = 1;
        res.send('¡Bienvenido!');
    }
})
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send('Logout ok!');
        else res.send({ status: 'Logout ERROR', body: err });
    })
})
app.get('/login', (req, res) => {
    const { username, password } = req.query;
    if (username !== 'pepe' || password !== 'pepepass') {
        return res.send('login failed');
    }
    req.session.user = username;
    req.session.admin = true;
    res.send('login success!');
})

function auth(req, res, next) {
    if (req.session?.user === 'pepe' && req.session?.admin) {
        return next();
    }
    return res.status(401).send('error de autorización');
}

app.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!');
})
*/