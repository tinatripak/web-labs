function Formdata(data){
    let isNotValid = false;
    let sendForm = [];

    /* ПІБ */
    
    const fullNameRegex = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]\.[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]\./;

    if (data.fullName == null || data.fullName.value.length < 6 ||  !fullNameRegex.test(data.fullName.value)) {
        if (!isNotValid) {
            alert('"ПІБ" вказано невірно');
        }
        data.fullName.style.border = '1px solid red';
        isNotValid = true;
    } else {
        data.fullName.style.border = '1px solid green';
        sendForm.push('right');
    }
    
    /* Варіант */
    if (data.variant == null || data.variant.value <= 0 || data.variant.value > 10) {
        if (!isNotValid) {
            alert('"Варіант" вказано невірно');
        }
        data.variant.style.border = '1px solid red';
        isNotValid = true;
    } else {
        data.variant.style.border = '1px solid green';
        sendForm.push('right');
    }
       
    /* Телефон */
    
    const phoneRegex = /^\((\d{3})\)-\d{3}-\d{2}-\d{2}/;

    if(data.phone == null || data.phone.value.length == 0 || !phoneRegex.test(data.phone.value)) {
        if (!isNotValid) {
            alert('"Контактний телефон" вказано невірно');
        }
        data.phone.style.border = '1px solid red';
        isNotValid = true;
    } else {
        data.phone.style.border = '1px solid green';
        sendForm.push('right');
    }
    
    /* Факультет */

    const facultyRegex = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+/;

    if(data.faculty == null || data.faculty.value.length < 3 || data.faculty.value.length > 5 || !facultyRegex.test(data.faculty.value)) {
        if (!isNotValid) {
            alert('"Факультет" вказано невірно');
        }
        data.faculty.style.border = '1px solid red';
        isNotValid = true;
    } else {
        data.faculty.style.border = '1px solid green';
        sendForm.push('right');
    }
    
    /* Адрес */

    const addressRegex = /^м. [а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+/;

    if(data.address == null || data.address.value.length == 0 || !addressRegex.test(data.address.value)) {
        if (!isNotValid) {
            alert('"Адрес" вказано невірно');
        }
        data.address.style.border = '1px solid red';
        isNotValid = true;
    } else {
        data.address.style.border = '1px solid green';
        sendForm.push('right');
    }

    document.getElementById('name-value').innerHTML = data.fullName.value;
    document.getElementById('variant-value').innerHTML = data.variant.value;
    document.getElementById('phone-value').innerHTML = data.phone.value;
    document.getElementById('faculty-value').innerHTML = data.faculty.value;
    document.getElementById('address-value').innerHTML = data.address.value;


    const appearingBlock = document.getElementById('appearing-block');
    if(sendForm.length == 5){
        appearingBlock.style.display = 'block';
    }
    return false;
}

function generateTable() {
    let count = 1;
    const tbl = document.getElementById("changing-table");
    const tblBody = document.createElement("tbody");
  
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
  
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(count);
            cell.appendChild(cellText);
            row.appendChild(cell);
            count++;
        }
  
        tblBody.appendChild(row);
    }
  
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "1");
}

generateTable();

function changeColorOnRandom(){
    let randomColor;
    let palitColor;
    let table = document.getElementById("changing-table");
    for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            if(table.rows[r].cells[c].innerHTML == '7'){
                table.rows[r].cells[c].onmouseover=function(){
                    this.style.backgroundColor=`#${Math.floor(Math.random()*16777215).toString(16)}`;
                    randomColor = this.style.backgroundColor;
                    if(table.rows[5].style.backgroundColor != randomColor){
                        for (let i=0; i<6; i++){
                            table.rows[i].style.backgroundColor ='#ffff';
                        }
                    }
                }
    
                table.rows[r].cells[c].onmouseout=function(){
                    if(this.style.backgroundColor != palitColor)
                    {
                        this.style.backgroundColor='#ffff';
                    }
                }
    
                table.rows[r].cells[c].onclick=function(){
                    const valueofPalit = document.getElementById('palit');
                    this.style.backgroundColor = valueofPalit.value;
                    palitColor = this.style.backgroundColor;
                }
                
                table.rows[r].cells[c].ondblclick=function(){
                    const valueofPalit = document.getElementById('palit');
                    table.rows[1].style.backgroundColor = valueofPalit.value;
                    table.rows[3].style.backgroundColor = valueofPalit.value;
                    table.rows[5].style.backgroundColor = valueofPalit.value;
                    palitColor = this.style.backgroundColor;
                }
            }
        }
    }
}
changeColorOnRandom();