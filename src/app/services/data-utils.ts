

export function createCompte2(vars,dataset,no_na)  {
    

    let charts = []

    console.log(vars,dataset)
    console.log(vars["0"],vars["1"])
    let n1 = dataset[0].indexOf(vars["0"])
    let n2 = dataset[0].indexOf(vars["1"])
    console.log(n1,n2)
    /*
    if(arr[1].split(" ")[0].split("-").length > 2 ){
      arr = arr.map(x=>x.split(" ")[0])

    }
    */
    let varNamesD1 = []
    let varNamesD2 = []
    for (var i = 1; i < dataset.length; i++) {

      varNamesD1[dataset[i][n1]] = 1
      varNamesD2[dataset[i][n2]] = 1
    }
    let varNames1 = Object.keys(varNamesD1)
    let varNames2 = Object.keys(varNamesD2)

    if(varNames1.length + varNames2.length > 30){
      return []
    }

    var counts = {};
    for (var i = 1; i < dataset.length; i++) {
      if(! (dataset[i][n1] in counts)){
        counts[dataset[i][n1]] = {}
        for(let e of varNames2){
          counts[dataset[i][n1]][e] = 0
        }
      }
      
        counts[dataset[i][n1]][dataset[i][n2]] = 1 + (counts[dataset[i][n1]][dataset[i][n2]])
      
     }

     if(no_na){
      delete counts["NA"]
      Object.keys(counts).map((k)=>{
        console.log(counts[k])
        delete counts[k]["NA"]
      })
     }

     const result = []

console.log("counts")
console.log(counts)
     for (let k of Object.keys(counts)){
       let e = counts[k]
      console.log(e)

      let d:any = {}
      d.varNames = Object.keys(e)
      d.title = k

       d["data"] = Object.keys(e).filter((x)=>x != 'NA' && x != '').map((x)=>{
        return [x,e[x]]
        })
        charts.push(d)
    
      }
    return charts
}
