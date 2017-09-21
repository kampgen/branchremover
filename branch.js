var { exec } = require('child_process')
var { execSync } = require('child_process')


//branchs do diretório
let oldbranch = []
oldbranch = execSync('git branch --merged').toString().split(/\s+/).filter(b => { if (b != '' && b != '*' && b != 'master') return b })

//branchs que não poderão ser excluídas
let newbranch = [
    "NOMEBRANCH",
    "NOMEBRANCH",
    "NOMEBRANCH"
]

let todelete = []

exec('git status', (error,stdout, stderr) => {
    let teste = stdout.split(/\s+/)
    if (teste[2] != 'master') {
        execSync('git checkout master')
        console.log("Você foi transferido para a branch master")
    }

    oldbranch.forEach(branch => {
        if (newbranch.find(b => branch.indexOf(b) != -1)) console.log("Não será excluída: ", branch)
        else todelete.push(branch)
    })

    if (todelete.length > 0) {
        console.log("Essas branchs serão excluídas: " + todelete)
    } else {
        console.log("Nenhuma branch será excluída.");
    }

    todelete.forEach(b => {
        if (b == 'master') return
        exec('git branch -d ' + b, function(error, stdout, stderr){
            console.log(stdout);
        })
    })
})
