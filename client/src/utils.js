const a=[1000,60,60,24,30.43685,12]
const b=['s','m','h','d','mo','y']

function timeDiff(ms){
    if(ms<60*1000) return '<1m'
    let i=0;
    for(;i<a.length;i++) {
        if((ms/a[i]|0)==0) break
        ms/=a[i];
    }
    return parseFloat(ms.toFixed(i==6))+''+b[i-1]
}

const fileTypes = {
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'svg': 'image',
    'webp': 'image',
    'apng': 'image',
    'pdf': 'pdf',
    'doc': 'document',
    'docx': 'document',
    'txt': 'text',
    'mp3': 'audio',
    'wav': 'audio',
    'mp4': 'video',
    'mkv': 'video',
    'avi': 'video',
};

function getFileType(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    if (fileTypes[ext]) {
        return fileTypes[ext];
    } else {
        return 'unknown';
    }
}

export {timeDiff,getFileType}