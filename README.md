# Expresso Coutinho - Projeto PAW

## Credenciais

### Clientes

|      Nome      |          Email         | Password |
|:--------------:|:----------------------:|:--------:|
| Diogo Carvalho |     diogo@gmail.com    |   diogo  |
|  Miguel Silva  | miguel.silva@gmail.com |  miguel  |
|   Ana Ribeiro  |     ana@outlook.pt     |    ana   |

### Admin

| Username | Password |
|:--------:|:--------:|
|   diogo  |   admin  |

## Rotas

```
routes
├── admin
│  ├── clients.js
│  ├── index.js
│  ├── login.js
│  ├── menu.js
│  └── reservations.js
├── auth
│  ├── login.js
│  ├── logout.js
│  └── register.js
├── about.js
├── home.js
├── menu.js
├── reservations.js
└── users.js
```

### Gerais

```javascript
// authentication
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
// general routes
app.use('/', homeRouter);
app.use('/menu', menuRouter);
app.use('/about', aboutRouter);
```

### Específicas para Clientes

```javascript
// metodo de autenticação
function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = "Por favor faça login novamente."
        res.redirect('/login');
    }
}
// client routes
app.use('/reservations', restrict, reservationsRouter);
```

### Específicas para Admins

```javascript
/*** app.js ***/
// admin routes
app.use('/admin', adminRouter);

/*** routes/admin/index.js ***/
// metodo de autenticação
function restrict(req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        req.session.error = "Por favor faça login novamente."
        res.redirect('/admin/login');
    }
}

router.use('/login', loginRouter);
router.use('/menu', restrict, menuRouter);
router.use('/clients', restrict, clientRouter);
router.use('/reservations', restrict, reservationsRouter);
```

## Identificação  e  caracterização  do  projeto

...

## Especificação geral  do  software  a  desenvolver

...

## Análise dos principais pontos do trabalho

...
