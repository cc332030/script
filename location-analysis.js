const fs = require('fs/promises');

const file = 'D:\\file\\_test\\txt\\test.txt'

function main() {

    let sql = `insert into\n  location(code, p_code, name) \nvalues\n`;

    fs.readFile(file, {encoding: 'utf8'})
        .then(text => {
            const valueSql = text.split('\n')
                .filter(e => !!e)
                .map(e => e.split(' '))
                .filter(arr => {
                    return arr.length === 2 && arr[0]
                })
                .map(arr => {

                    let code = arr[0]
                    let name = arr[1]

                    while (code.endsWith('00')) {
                        code = code.substring(0, code.length - 2);
                    }

                    const pCode = code.length === 2
                        ? null
                        : code.substring(0, code.length - 2)

                    return `  (${code}, ${pCode}, '${name}')`;
                }).join(',\n');
            sql += valueSql + '\n;';

            fs.writeFile(`location.sql`, sql)

            console.debug('success')
        })
        .catch(err => console.debug('err', err))

}

main()
