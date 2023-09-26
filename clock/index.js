
userc : "whoami",

datec: "date +%A,%B,%e,%Y",
command: "whoami;date +%A,%B,%e,%Y;"+`pmset -g batt | grep -oE \"[0-9]*%|'{1}[A-Za-z ]*'|[0-9]*:[[:digit:]]{2}[ ]{1}[a-z]*|no[ ]{1}[a-z]*\";`,
refreshFrequency:10000,

style:`

    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    
    #time-wraper{
        pointer-events: none;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
    }


    primaryColor = rgba(255,255,255,0.99);
  secondaryColor = rgba(255,255,255,0.50);

  #day{
    color: rgba(255,255,255,0.99);
    font-size: 100px;
    font-family: 'la Compagnie des Ombres';
  }

  #secondary{
    font-family: 'Steelfish'
    font-size: 40px
    color: rgba(255,255,255,0.50);
  }
    
        
  #time{
    font-family: 'Steelfish'
    font-size: 120px
    color: rgba(255,255,255,0.50);
  }
`,

    render
:

function () {
    setTimeout( () => {
        const element = document.getElementById("clock")
        const parentElement = element.parentElement;
        this.dragElement(parentElement);
    }, 100)

    

    return `

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css" />
    

    <div id='clock' style=" display: flex; justify-content: center; align-items: start; cursor:grab; ">
        <div style="position: relative; padding: 16px; min-width: 400px; height: 300px; ">
           <div style="position: absolute; top: 0;left: 0; width: 100%; height: 100%; background: black;opacity: .4; border-radius: 10px"></div>
           <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;display: flex; flex-direction: column; align-items: center;">
                <div id="time"></div>
                <div><span id ="day"></span></div>
                <div id="secondary"></div>
        </div>
            <div style="position:absolute; height:13px; width:35px; border:1px solid white; border-radius: 5px; padding: 1px; right:15px">
                <div id='battery-percent' style="display:flex; gap: 2px; justify-content:center; align-items:center; color:black; font-size:14px; position:relative; height:100%; box-sizing:border-box; width:1%; background:red; border-radius: 4px;">
                    <span style='font-size: 10px' id='charging-status'></span>
                    <i id='charging-indicator' style='font-size: 10px' class="las la-bolt"></i>
                </div>
                <div style='position:absolute; width:2px; height:10px; background:white; top:4px; right:-4px; border-top-right-radius: 1px;border-bottom-right-radius: 1px'>
                </div>
            </div>
        </div>
    </div>`
},

suffix: function (date) {


    if (date == 1 || date == 21 || date == 31) {
        return 'ST';
    }

    if (date == 2 || date == 22) {
        return "ND";
    }

    if (date == 3 || date == 23) {
        return "RD";
    }

    return "TH";


},


dragElement: function (elmnt) {

    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
        
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
  },

update: function (output, domEl) {
    data = output.split('\n')

    
    

    dateInfo = data[1].split(',')
    day = dateInfo[0]
    month = dateInfo[1]
    numDate = parseInt(dateInfo[2])
    year = dateInfo[3]
    secondDigit = numDate % 10

    date = new Date()
    hours = date.getHours()
    minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }

    var one = hours + ":" + minutes
    var two = day
    var three = numDate + ' ' + this.suffix(numDate) + " " + month.toUpperCase() + " " + year

    $('#time').text(one);
    $('#day').text(two);
    $('#secondary').text(three);
    

    let brightness = 10
    let charge = data[3].replace("%", '')
    let col ='';
    let colshadow ='';


    if(charge > 40){
        col = "rgb(5, 250, 111)"
        colshadow = "0 0 #{brightness}px rgba(5, 250, 111, 0.6)"
    }
    
    else if( charge > 20 && charge <= 40){
        col = "rgb(255, 230, 0)"
        colshadow = "0 0 #{brightness}px rgba(255, 230, 0, 0.6)"
    }
      
    else{
        col = "rgb(255, 0, 0)"
        colshadow = "0 0 #{brightness}px rgba(255, 0, 0, 0.6)"
    }
     
    $('#battery-percent').css("width", data[3]);
    $('#charging-status').text(data[3])
    
    $('#battery-percent').css("background",col);


    if(data[2] === "'Battery Power'"){
        $('#charging-indicator').hide();
    }else{
        $('#charging-indicator').show();
    }
    
}