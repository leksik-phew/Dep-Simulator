const fruits = ['🍎', '🍊', '🍇', '🍒', '🍌',
                '🍐', '🥥', '🫐', '🍈', '🍉',
                '🍋', '🍋‍🟩', '🍍', '🍏', '🍑',
                '🍓', '🥝', '🥕', '🧀', '🥦'];
let isSpinning = false;

function startSpin() {
    if(isSpinning) return;
    isSpinning = true;
    
    const slots = document.querySelectorAll('.slot');
    const results = [];
    const button_text = document.getElementById("dep_button");
    button_text.textContent = 'Do-Dep!';
    
    slots.forEach((slot, index) => {
        const start = Date.now();
        const duration = 2000 + index * 200;
        
        function update() {
            const progress = Date.now() - start;
            const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
            slot.querySelector('span').textContent = randomFruit;
            
            if(progress < duration) {
                requestAnimationFrame(update);
            } else {
                const finalFruit = fruits[Math.floor(Math.random() * fruits.length)];
                results[index] = finalFruit;
                slot.querySelector('span').textContent = finalFruit;
                
                if(index === slots.length - 1) {
                    isSpinning = false;
                    showResult(results);
                }
            }
        }
        
        requestAnimationFrame(update);
    });
}

function showResult(results) {
    const counts = {};
    results.forEach(fruit => counts[fruit] = (counts[fruit] || 0) + 1);
    const maxCount = Math.max(...Object.values(counts));
    const resultCount = maxCount === 1 ? 0 : maxCount;

    const messages = {
        0: {
            title: "LMAO, STUPID LOSER!",
            text: "DO YOU HAVE MONEY FOR DO-DEP???",
            image: "https://example.com/sad.png"
        },
        2: {
            title: "LOL, ONLY TWO!",
            text: "DO SMTH COOL, MAYBE YOU'D WON NEXT TIME",
            image: "https://example.com/meh.png"
        },
        3: {
            title: "THREE! IT'S NEAR, BUT NOT TOO NEAR!",
            text: "NOT BAD, BUT SWAGA HAS ALMOST DROWN!",
            image: "https://example.com/neutral.png"
        },
        4: {
            title: "OH MY, FOUR! GOOD BOY!",
            text: "HAVE YOU USED LUCKY CHANCE FROM LADY BAG?",
            image: "https://example.com/good.png"
        },
        5: {
            title: "JACKPOT!",
            text: "OH? YOU REALLY WON! PASHA M. APPROVED!",
            image: "https://example.com/jackpot.png"
        }
    };

    const result = messages[resultCount] || messages[0];
    const features = 'width=350,height=300,resizable=no,scrollbars=no,status=no,toolbar=no';
    const resultWindow = window.open('', 'DEP RESULT', features);
    resultWindow.document.write(`
        <html>
            <head>
                <title>DEP RESULT - ${result.title}</title>
                <link rel="stylesheet" href="styles.css">
                <style>
                    body {
                        background: #f100a1;
                        text-align: center;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                    }
                    img {
                        max-width: 300px;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <h1>${result.title}</h1>
                <p>${result.text}</p>
                
                <p>YOUR COMBINATION: ${results.join(' ')}</p>
            </body>
        </html>
    `);
}