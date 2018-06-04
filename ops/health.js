// TODO: figure out better way to do this health check
setInterval(function() {
    db.query('SELECT 1');
}, 5000);
