const a=[1000,60,60,24,30.43685,12]
const b=['s','m','h','d','months','y']

function timeDiff(ms){
    if(ms<1000) return '0s'
    let i=0;
    for(;i<a.length;i++) {
        if((ms/a[i]|0)==0) break
        ms/=a[i];
    }
    return parseFloat(ms.toFixed(i==6))+''+b[i-1]
}

export default timeDiff