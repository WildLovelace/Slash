btn1 = document.createElement('BUTTON');
btn2 = document.createElement('BUTTON');

btn1.id = 'btn1';  
btn2.id = 'btn2';   

btn1.textContent = 'Предыдущая'; 
btn2.textContent = 'Следующая';

document.body.appendChild(btn1);
document.body.appendChild(btn2);

let arrphoto =["P.png","PUG2.png","pug3.png","pug4.png","pug5.png","pug6.png","pug7.png"];
for (let i in arrphoto ){ arrphoto[i] = arrphoto[i].toLowerCase() }

function btn1_onclick(){
    let img = document.querySelector("img[name='myimg']");
    let imgsrc = img.src.split('/');
    let file = imgsrc[imgsrc.length-1].toLowerCase();
    index = arrphoto.indexOf(file);
    if(index > 0){img.src= arrphoto[index-1]}

}

function btn2_onclick(){
    let img = document.querySelector("img[name='myimg']");
    let imgsrc = img.src.split('/');
    let file= imgsrc[imgsrc.length-1].toLowerCase();
    index = arrphoto.indexOf(file);
    if(index < arrphoto.length-1) img.src= arrphoto[index+1];
}
btn1.onclick = btn1_onclick;
btn2.onclick = btn2_onclick;