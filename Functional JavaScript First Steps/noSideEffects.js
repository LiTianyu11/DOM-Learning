
function rename(old, newName){
    return{
        name: newName,
        date: old.date
    }
}

demo1 = {name:'litianyu' , date:1999}
let demo2 = rename(demo1 , 'Litianyu')
console.log(demo2)



//???
function computeTruthTable(operator) {
    const truthValues = [true, false];
    const table = [];
    for (const A of truthValues) {
      for (const B of truthValues) {
        const value = operator(A, B);
        table.push({ A, B, value });
      }
    }
    return table;
}

