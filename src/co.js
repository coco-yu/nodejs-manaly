function co(it) {
    return new Promise((resolve, reject) => {
        function next(v) {
            const { value, done } = it.next(v);
            if (done) {
                resolve(value);
            } else {
                Promise.resolve(value).then(data => {
                    next(data);
                })
            }
        }

        next();
    })
}