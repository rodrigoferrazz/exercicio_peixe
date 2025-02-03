var config = { 
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
          } 
    };

    var game = new Phaser.Game(config);
    
    var crust;
    var polvo;

    let targetX = 400;
    let targetY = 300;

    const delay = 0.05;
    const distanciaMinima = 25;

    function preload() {
        this.load.image('bg', 'assets/bg_azul-escuro.png');
        this.load.image('logo', 'assets/logo-inteli_branco.png');
        this.load.image('crt', 'assets/peixes/crustaceo.png');
        this.load.image('polvo', 'assets/peixes/polvo.png');
        this.load.image('polvofeliz', 'assets/peixes/polvofeliz.webp')
    }
    
    function create() {
        this.add.image(400, 300, 'bg');
        this.add.image(400, 525, 'logo').setScale(0.5);

        crust = this.add.image(400, 300, 'crt');
        crust.setFlip(true, false);
        
        polvo = this.add.image(400, 300, 'polvo');
        polvo.setFlip(true, false);
        polvo.setScale(0.4);
    }
    function update(time, delta) {
        crust.x = this.input.x;
        crust.y = this.input.y;

        targetX = Phaser.Math.Linear(targetX, this.input.x, delay);
        targetY = Phaser.Math.Linear(targetY, this.input.y, delay);
        polvo.x = targetX;
        polvo.y = targetY;
        const distancia = Phaser.Math.Distance.Between(this.input.x, this.input.y, polvo.x, polvo.y);

    if (distancia < distanciaMinima) {
        polvo.setTexture('polvofeliz');
        crust.setVisible(false);
    } else {
        polvo.setTexture('polvo');
        crust.setVisible(true);
    }
    }