

(function () {

    //creation of   app container
    (function () {
        var appContainer = document.getElementById('appContainer');
        appContainer.style.position = 'relative';
        appContainer.style.height = '100%';
        appContainer.style.width = '100%';
        
    }());



   //generates random Values
   
    function getRandomValues(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    

    // BOX Class
    
    function Box(x, y, boxWidth, boxHeight, speed, parentElement) {
        this.x = x;
        this.y = y;
        this.boxWidth = boxWidth ;
        this.boxHeight = boxHeight ;

        this.speed = speed ;

        this.boxElement = null;
        //horizontal move is true for left to right direction and false for right to left
        this.horizontalMove = true;
        //vertical move is true for top to bottom and false for bottom to top
         this.verticalMove = true;


        
            //Initialization of box
         
        this.init = function () {
            this.boxElement = document.createElement('div');
            this.boxElement.style.backgroundColor = `rgb(${getRandomValues(0, 255)}, ${getRandomValues(0, 255)}, ${getRandomValues(0, 255)})`;
            this.boxElement.style.height = this.boxHeight + 'px';
            this.boxElement.style.width = this.boxWidth + 'px';
            this.boxElement.style.borderRadius = '50%';
            this.boxElement.style.position = 'absolute';
            parentElement && parentElement.appendChild(this.boxElement);

        };

        //drawing the box with co ordinates
        this.draw = function () {
            this.boxElement.style.top = this.y + 'px';
            this.boxElement.style.left = this.x + 'px';
        };

        //moving the balls in the axes
        this.move = function () {
            if (this.horizontalMove === true && this.verticalMove === true) {
                this.x += this.speed;
                this.y += this.speed;
            }

            if (this.horizontalMove === false && this.verticalMove === true) {
                this.x -= this.speed;
                this.y += this.speed;
            }

            if (this.horizontalMove === true && this.verticalMove === false) {
                this.x += this.speed;
                this.y -= this.speed;
            }

            if (this.horizontalMove === false && this.verticalMove === false) {
                this.x -= this.speed;
                this.y -= this.speed;
            }
            this.draw();
        };

        // get the four side coordinates of the box
        this.getBoxTop = function () { return this.y; };
        this.getBoxBottom = function () { return this.y + this.boxHeight; };
        this.getBoxLeft = function () { return this.x; };
        this.getBoxRight = function () { return this.x + this.boxWidth; };
    }

    function GameAnimation(ballNumbers, fps, parentElement) {
        var boxes = [];
        fps = fps ;
        

        this.init = function () {
            var parentHeight = parentElement.clientHeight;
            var parentWidth = parentElement.clientWidth;

            for (var i = 0; i < ballNumbers; i++) {
                var size = getRandomValues(20, 30);
                var speed = getRandomValues(3, 8);
                var x = getRandomValues(0, parentWidth-5);
                var y = getRandomValues(0, parentHeight - 5);
                // create the box inside the parent
                var box = new Box(x, y, size, size, speed, parentElement);
                box.onclick=function()
                {
                  box.remove();

                }

                box.init();
                box.draw();
                boxes.push(box);
            }
            window.requestAnimationFrame(this.animate.bind(this));
        };

        this.animate = function (timestamp) {
            
                var parentHeight = parentElement.clientHeight;
                var parentWidth = parentElement.clientWidth;

                for (var i = 0; i < ballNumbers; i++) {
                    var box = boxes[i];
                    this.CollisionDetection(box, parentWidth, parentHeight);
                }
             
            window.requestAnimationFrame(this.animate.bind(this));
        };

        this.CollisionDetection = function (box, parentWidth, parentHeight) {
            this.CollisionDetectionWithOtherMovingObjects(box);
            this.collissionDetectionWithParentContainer(box, parentWidth, parentHeight);
            box.move();
        };

        this.collissionDetectionWithParentContainer = function (box, parentWidth, parentHeight) {
            if (box.getBoxRight() >= parentWidth) {
                box.horizontalMove = false;
            }
            if (box.getBoxLeft() <= 0) {
                box.horizontalMove = true;
            }

            if (box.getBoxBottom() >= parentHeight) {
                box.verticalMove = false;
            }
            if (box.getBoxTop() <= 0) {
                box.verticalMove = true;
            }
        };

        this.CollisionDetectionWithOtherMovingObjects = function (box) {
            var currentIndex = boxes.indexOf(box);

            for (var i = 0; i < boxes.length; i++) {
                if (i != currentIndex) {
                    if (box.getBoxLeft() < boxes[i].getBoxRight() &&
                        box.getBoxRight() > boxes[i].getBoxLeft() &&
                        box.getBoxTop() < boxes[i].getBoxBottom() &&
                        box.getBoxBottom() > boxes[i].getBoxTop()) {
                        if (box.x > boxes[i].x) {
                            box.horizontalMove = true;
                            boxes[i].horizontalMove = false;
                        }
                        else {
                            box.horizontalMove = false;
                            boxes[i].horizontalMove = true;
                        }

                        if (box.y > boxes[i].y) {
                            box.verticalMove = true;
                            boxes[i].verticalMove = false;
                        }
                        else {
                            box.verticalMove = false;
                            boxes[i].verticalMove = true;
                        }
                    }
                }
            }
        };
    }

    var parentElement = document.getElementById('appContainer');

    
    var gameAnimation = new GameAnimation(50, 20, parentElement);


    gameAnimation.init();
})();