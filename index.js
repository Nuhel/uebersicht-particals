command:"date +%A,%B,%e,%Y",
refreshFrequency: 30000,




style: `
    width: 100%;
    
    justify-content: center;
    align-items: center;
    #particles-js {
        position:fixed;
        width:100%;
        height:100%;
        left:0;
        top:0;
    }

    #time-wraper{
        width: 100%;
        text-align: center;
        height: 100vh;
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

render: function() {

    var p = {
          "particles": {
            "number": {
              "value": 43,
              "density": {
                "enable": true,
                "value_area": 1499.4041841268327
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        };
    var interval = setInterval(function() {
        if (window.particlesJS) {
            particlesJS("particles-js", p);
            clearInterval(interval)
        }
    },100)
    return `<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.js"></script>
    
    <div id="particles-js"></div>
    <div id='time-wraper'>
        <div id="time"></div>
        <div>
            <span id ="day"></span>
        </div>
      <div id="secondary"></div>
    </div>`
},

suffix: function(date){


    if(date == 1 || date == 21 || date ==31){
        return 'ST';
    }

    if(date == 2 || date == 22){
        return "ND";
    }

    if(date == 3 || date == 23){
        return "RD";
    }

    return "TH";


},

update: function(output,domEl){

    dateInfo = output.split(',')

    console.log(dateInfo);
      day = dateInfo[0]
      month = dateInfo[1]
      numDate = parseInt(dateInfo[2])
      year = dateInfo[3]
      secondDigit = numDate%10


        date = new Date()
        hours = date.getHours()
        minutes = date.getMinutes()
        if (minutes < 10){
            minutes  = "0" + minutes
        }

    var one = hours + ":" + minutes
    var two = day
    var three = numDate+ ' '+this.suffix(numDate) + " " + month.toUpperCase() + " " + year

    $('#time').text(one);
      $('#day').text(two);
      $('#secondary').text(three);
}