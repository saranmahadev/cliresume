var lines = [];        
var index = -1;        

function generateId() {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return uniqid
}

function generateLine() {
    var div = document.createElement("div");
    var label = document.createElement("label");        
    var input = document.createElement("input");
    
    input.type = "text";
    input.id = generateId();   
    if (index == -1) {
        input.placeholder = "dev help"                
    }

    label.setAttribute("for", input.id)
    label.innerHTML = "$ >"
    
    div.className = `line-${input.id}`;            
    div.appendChild(label);
    div.appendChild(input);
    

    document.getElementById("commandLine").appendChild(div);              
    lines.push(input);            
    input.focus();       
    index += 1   
}

function generateResponse(res) {
    document.getElementsByClassName(`line-${lines[index].id}`)[0].innerHTML = res;
    generateLine();
}

function clearAll() {
    lines.forEach(line => {
        document.getElementsByClassName(`line-${line.id}`)[0].remove();                                             
    });                    
    lines = [];                   
    index = -1;  
    generateLine();  
}

document.getElementById("bg").addEventListener("change", function (e){
    e.preventDefault();
    document.styleSheets[0].cssRules[0].style.background = this.value;
})
document.getElementById("words").addEventListener("change", function (e){
    e.preventDefault();
    document.styleSheets[0].cssRules[0].style.color = this.value;
})

document.onkeydown = function (e) {   
    console.log(e);
    
    if (e.ctrlKey && e.key == "m") {
        clearAll();
    }
    if (e.ctrlKey && e.key == "\\") {
        lines[index].focus();
    }

    if (e.key === "Enter") {
        //  Generates newLine
        generateLine();    
        
        var previousLine = lines[index-1];
        var currentLine = lines[index];
        
        try {
            // Parses the Command
            var allCommand = previousLine.value.split(" ");                
            var prefix = allCommand[0].toLowerCase();
            var command = allCommand[1].toLowerCase();  
            var args = previousLine.value.match(/--+[a-z]*/g);
        } catch (error) {}
        

        if (prefix == "dev") {                    
            if (command == "clear") {
                clearAll();                         
            }            
            else if (command=="contact") {
                var contact = {
                    "web": "https://www.saranmahadev.in",
                    "email": "mailto:sarandevnet@gmail.com",
                    "phone": "tel:+919360644776"
                }

                if (args != null) {
                    args.forEach(argument => {
                        if (argument == "--web") {
                            window.location.replace(contact.web);
                        } else if (argument == "--email") {
                            window.location.replace(contact.email);
                        } else if (argument == "--phone"){
                            window.location.replace(contact.phone)
                        } 
                    });
                } else{
                    generateResponse(`
                        <span class="response">
                            Web: <a target="_blank" href="${contact.web}"> ╮ Click Here ╭ </a><br>
                            Email: <a target="_blank" href="${contact.email}"> ╮ Click Here ╭ </a><br>
                            Phone: <a target="_blank" href="${contact.phone}"> ╮ Click Here ╭ </a>
                        </span>
                    `);                                        
                }
            }
            else if (command=="education") {
                if (args != null) {
                    args.forEach(argument => {
                        if (argument == "--school") {
                            generateResponse(
                                `
                                <span>                                    
                                    <p>
                                    🎒 Y.R.T.V Matriculation Higher Secondary School, Sivkasi<br>
                                    Higher Secondary I & II<br>
                                    2017 - 2019
                                    <p>
                                </span>
                                `
                            )
                        } else if (argument == "--college") {
                            generateResponse(
                                `
                                <span>
                                    <p>
                                    🎓 Government College of Engineering Srirangam, Trichy<br>
                                    BE (Computer Science and Engineering)<br>
                                    2019-2023
                                    </p>
                                </span>
                                `
                            )
                        } else {
                            generateResponse(
                                `
                                <span>
                                    Invalid Arguments
                                </span>
                                `
                            )
                        } 
                    });
                } else{
                    generateResponse(
                        `
                        <span>
                            <p>
                            🎓 Government College of Engineering Srirangam, Trichy<br>
                            BE (Computer Science and Engineering)<br>
                            2019-2023
                            </p>
                            <p>
                            🎒 Y.R.T.V Matriculation Higher Secondary School, Sivkasi<br>
                            Higher Secondary I & II<br>
                            2017 - 2019
                            </p>
                        </span>
                        `
                    )
                }                
            } 
            else if (command == "quote") {
                fetch('./data/quotes.json')
                .then((response) => response.json())
                .then((data) => {     
                    var x = document.getElementById("snackbar");
                    var quote = data.quotes[Math.floor(Math.random() * 103)];
                    x.innerHTML = `${quote.quote} - ${quote.author}`;
                    x.className = "show";                     
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4500);                  
                });                
            }              
            else if (command == "help") {
                fetch('./data/usage.json')
                .then((response) => response.json())
                .then((data) => {
                    var rows = '';
                    data.commands.forEach(command => {
                        rows+= `
                            <tr>                                
                                <td>
                                    ${command.command}
                                </td>
                                <td>
                                    ${command.args}
                                </td>
                                <td>
                                    ${command.usage}
                                </td>
                            </tr>
                        `
                    });

                    generateResponse(`
                        <span class="response">
                            <u class="response">Usage:</u><br>
                            $ dev command args<br>
                            <u class="response">Commands:</u>
                            <table>
                                <tr>                                    
                                    <td>Command</td>
                                    <td>Args</td>
                                    <td>Usage</td>
                                </tr>
                                ${rows}                        
                            </table>        
                        </span>
                    <br>`); 
                });                                                                                  
            }            
        } else if (prefix == "clear") {
            clearAll();
        }
        
        // Disables the previousLine
        var element = previousLine.setAttribute("disabled","");                            
    }           
};        


window.onload = function (e) {
    generateLine();
}
