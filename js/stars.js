let constellationIndex = 0; // 현재 양자리에서 몇 번째 별인지 추적
let nowStar = 0;
let resizeTimeout; // 창 크기 변경 딜레이

// 별자리 보정값
let AquariusX = -0.03, AquariusY = -0.1;  
let PiscesX = 0.04, PiscesY = -0.22;
let AriesX = -0.24, AriesY = 0.35;
let TaurusX = 0.4, TaurusY = 0;
let GeminiX = -0.45, GeminiY = 0.07;
let CancerX = 0.24, CancerY = -0.1;
let LeoX = -0.14, LeoY = -0.37;
let VirgoX = 0.03, VirgoY = 0.24;
let LibraX = -0.02, LibraY = 0.14;
let ScorpioX = 0.02, ScorpioY = 0.03;

const constellations = [
    // 물병자리 Aquarius (11개, 1 - 11)
    { x: 0.17 + AquariusX, y: 0.19 + AquariusY }, { x: 0.12 + AquariusX, y: 0.26 + AquariusY }, { x: 0.14 + AquariusX, y: 0.30 + AquariusY }, { x: 0.17 + AquariusX, y: 0.27 + AquariusY }, { x: 0.11 + AquariusX, y: 0.32 + AquariusY },
    { x: 0.09 + AquariusX, y: 0.31 + AquariusY }, { x: 0.085 + AquariusX, y: 0.35 + AquariusY }, { x: 0.11 + AquariusX, y: 0.45 + AquariusY }, { x: 0.13 + AquariusX, y: 0.41 + AquariusY }, { x: 0.16 + AquariusX, y: 0.412 + AquariusY }, 
    { x: 0.19 + AquariusX, y: 0.45 + AquariusY },

    // 물고기자리 Pisces (12개, 12 - 23)
    { x: 0.50 + PiscesX, y: 0.28 + PiscesY }, { x: 0.485 + PiscesX, y: 0.29 + PiscesY }, { x: 0.49 + PiscesX, y: 0.32 + PiscesY }, { x: 0.48 + PiscesX, y: 0.43 + PiscesY }, { x: 0.455 + PiscesX, y: 0.485 + PiscesY },
    { x: 0.52 + PiscesX, y: 0.47 + PiscesY }, { x: 0.55 + PiscesX, y: 0.48 + PiscesY }, { x: 0.60 + PiscesX, y: 0.47 + PiscesY }, { x: 0.616 + PiscesX, y: 0.45 + PiscesY }, { x: 0.632 + PiscesX, y: 0.47 + PiscesY },
    { x: 0.622 + PiscesX, y: 0.50 + PiscesY }, { x: 0.60 + PiscesX, y: 0.50 + PiscesY },

    // 양자리 Aries (4개, 24 - 27)
    { x: 0.4 + AriesX, y: 0.53 + AriesY }, { x: 0.47 + AriesX, y: 0.50 + AriesY }, { x: 0.51 + AriesX, y: 0.52 + AriesY }, { x: 0.515 + AriesX, y: 0.56 + AriesY },

    // 황소자리 Taurus (11개, 28 - 38)
    { x: 0.494 + TaurusX, y: 0.9 + TaurusY }, { x: 0.516 + TaurusX, y: 0.8 + TaurusY }, { x: 0.522 + TaurusX, y: 0.76 + TaurusY }, { x: 0.52 + TaurusX, y: 0.73 + TaurusY }, { x: 0.535 + TaurusX, y: 0.67 + TaurusY },
    { x: 0.54 + TaurusX, y: 0.60 + TaurusY }, { x: 0.5 + TaurusX, y: 0.73 + TaurusY }, { x: 0.502 + TaurusX, y: 0.758 + TaurusY }, { x: 0.49 + TaurusX, y: 0.77 + TaurusY }, { x: 0.47 + TaurusX, y: 0.80 + TaurusY },
    { x: 0.43 + TaurusX, y: 0.87 + TaurusY },

    // 쌍둥이자리 Gemini (16개, 39 - 54)
    { x: 0.5 + GeminiX, y: 0.5 + GeminiY }, { x: 0.505 + GeminiX, y: 0.53 + GeminiY }, { x: 0.507 + GeminiX, y: 0.61 + GeminiY }, { x: 0.52 + GeminiX, y: 0.65 + GeminiY }, { x: 0.54 + GeminiX, y: 0.74 + GeminiY },
    { x: 0.495 + GeminiX, y: 0.666 + GeminiY }, { x: 0.505 + GeminiX, y: 0.74 + GeminiY }, { x: 0.49 + GeminiX, y: 0.545 + GeminiY }, { x: 0.524 + GeminiX, y: 0.546 + GeminiY }, { x: 0.548 + GeminiX, y: 0.548 + GeminiY },
    { x: 0.576 + GeminiX, y: 0.541 + GeminiY }, { x: 0.535 + GeminiX, y: 0.494 + GeminiY }, { x: 0.56 + GeminiX, y: 0.643 + GeminiY }, { x: 0.58 + GeminiX, y: 0.692 + GeminiY }, { x: 0.596 + GeminiX, y: 0.699 + GeminiY },
    { x: 0.56 + GeminiX, y: 0.725 + GeminiY },

    // 게자리 Cancer (7개, 55 - 61)
    { x: 0.503 + CancerX, y: 0.487 + CancerY }, { x: 0.493 + CancerX, y: 0.525 + CancerY }, { x: 0.51 + CancerX, y: 0.54 + CancerY }, { x: 0.513 + CancerX, y: 0.512 + CancerY }, { x: 0.513 + CancerX, y: 0.395 + CancerY },
    { x: 0.463 + CancerX, y: 0.59 + CancerY }, { x: 0.515 + CancerX, y: 0.65 + CancerY },

    // 사자자리 Leo (9개, 62 - 70)
    { x: 0.5 + LeoX, y: 0.5 + LeoY }, { x: 0.444 + LeoX, y: 0.51 + LeoY }, { x: 0.4 + LeoX, y: 0.58 + LeoY }, { x: 0.444 + LeoX, y: 0.565 + LeoY }, { x: 0.52 + LeoX, y: 0.57 + LeoY },
    { x: 0.518 + LeoX, y: 0.532 + LeoY }, { x: 0.5 + LeoX, y: 0.46 + LeoY }, { x: 0.522 + LeoX, y: 0.43 + LeoY }, { x: 0.53 + LeoX, y: 0.45 + LeoY },

    // 처녀자리 Virgo (13개, 71 - 83)
    { x: 0.406 + VirgoX, y: 0.613 + VirgoY }, { x: 0.422 + VirgoX, y: 0.605 + VirgoY }, { x: 0.428 + VirgoX, y: 0.623 + VirgoY }, { x: 0.45 + VirgoX, y: 0.617 + VirgoY }, { x: 0.463 + VirgoX, y: 0.59 + VirgoY },
    { x: 0.49 + VirgoX, y: 0.576 + VirgoY }, { x: 0.51 + VirgoX, y: 0.582 + VirgoY }, { x: 0.536 + VirgoX, y: 0.57 + VirgoY }, { x: 0.482 + VirgoX, y: 0.54 + VirgoY }, { x: 0.485 + VirgoX, y: 0.48 + VirgoY },
    { x: 0.447 + VirgoX, y: 0.56 + VirgoY }, { x: 0.43 + VirgoX, y: 0.547 + VirgoY }, { x: 0.398 + VirgoX, y: 0.558 + VirgoY },

    // 천칭자리 Libra (8개, 84 - 91)
    { x: 0.308 + LibraX, y: 0.51 + LibraY }, { x: 0.314 + LibraX, y: 0.535 + LibraY }, { x: 0.34 + LibraX, y: 0.52 + LibraY }, { x: 0.37 + LibraX, y: 0.47 + LibraY }, { x: 0.40 + LibraX, y: 0.52 + LibraY },
    { x: 0.383 + LibraX, y: 0.61 + LibraY }, { x: 0.335 + LibraX, y: 0.65 + LibraY }, { x: 0.333 + LibraX, y: 0.67 + LibraY },

    // 전갈자리 Scorpio (15개, 92 - 106)
    { x: 0.2 + ScorpioX, y: 0.385 + ScorpioY }, { x: 0.215 + ScorpioX, y: 0.41 + ScorpioY }, { x: 0.195 + ScorpioX, y: 0.42 + ScorpioY }, { x: 0.2 + ScorpioX, y: 0.46 + ScorpioY }, { x: 0.226 + ScorpioX, y: 0.48 + ScorpioY },
    { x: 0.243 + ScorpioX, y: 0.483 + ScorpioY }, { x: 0.253 + ScorpioX, y: 0.45 + ScorpioY }, { x: 0.258 + ScorpioX, y: 0.42 + ScorpioY }, { x: 0.287 + ScorpioX, y: 0.376 + ScorpioY }, { x: 0.313 + ScorpioX, y: 0.363 + ScorpioY },
    { x: 0.343 + ScorpioX, y: 0.36 + ScorpioY }, { x: 0.342 + ScorpioX, y: 0.32 + ScorpioY }, { x: 0.333 + ScorpioX, y: 0.3 + ScorpioY }, { x: 0.337 + ScorpioX, y: 0.4 + ScorpioY }, { x: 0.33 + ScorpioX, y: 0.432 + ScorpioY },
];

// 별자리 연결 코드 
function getConnectionsForNewStar(newStarIndex) {
    const connections = [];
    newStarIndex++;

    // 물병자리
    if (newStarIndex === 5) { 
        connections.push([2, 5]);
    } 
    // 물고기자리
    else if (newStarIndex === 12) { 
        connections.push([12, 12]);
    } else if (newStarIndex === 14) {
        connections.push([13, 14]);
        connections.push([12, 14]);
    } else if (newStarIndex === 23) {
        connections.push([22, 23]);
        connections.push([23, 19]);
    } 
    // 양자리
    else if (newStarIndex === 24) {
        connections.push([24, 24]);
    }
    // 황소자리
    else if (newStarIndex === 28) {
        connections.push([28, 28]);
    } else if (newStarIndex === 34) {
        connections.push([31, 34]);
    }
    // 쌍둥이자리
    else if (newStarIndex === 39) {
        connections.push([39, 39]);
    } else if (newStarIndex === 44) {
        connections.push([41, 44]);
    } else if (newStarIndex === 46) {
        connections.push([40, 46]);
    } else if (newStarIndex === 47) {
        connections.push([40, 47]);
    } else if (newStarIndex === 50) {
        connections.push([48, 50]);
    } else if (newStarIndex === 51) {
        connections.push([48, 51]);
    } else if (newStarIndex === 54) {
        connections.push([51, 54]);
    }
    // 게자리
    else if (newStarIndex === 55) {
        connections.push([55, 55]);
    } else if (newStarIndex === 58) {
        connections.push([57, 58]);
        connections.push([58, 55]);
    } else if (newStarIndex === 59) {
        connections.push([55, 59]);
    } else if (newStarIndex === 60) {
        connections.push([56, 60]);
    } else if (newStarIndex === 61) {
        connections.push([57, 61]);
    }
    // 사자자리
    else if (newStarIndex === 62) {
        connections.push([62, 62]);
    } else if (newStarIndex === 65) {
        connections.push([64, 65]);
        connections.push([63, 65]);
    } else if (newStarIndex === 67) {
        connections.push([66, 67]);
        connections.push([67, 62]);
    } else if (newStarIndex === 68) {
        connections.push([62, 68]);
    } 
    // 처녀자리
    else if (newStarIndex === 71) {
        connections.push([71, 71]);
    } else if (newStarIndex === 79) {
        connections.push([76, 79]);
    } else if (newStarIndex === 81) {
        connections.push([79, 81]);
        connections.push([74, 81]);
    }
    // 천칭자리
    else if (newStarIndex === 84) {
        connections.push([84, 84]);
    } else if (newStarIndex === 89) {
        connections.push([88, 89]);
        connections.push([87, 89]);
    } 
    // 전갈자리
    else if (newStarIndex === 92) {
        connections.push([92, 92]);
    } else if (newStarIndex === 105) {
        connections.push([102, 105]);
    }
    // 기본 연결 
    else {
        connections.push([newStarIndex - 1, newStarIndex]);
    }
    return connections;
}

function addStars(starCount) {
    const sky = document.querySelector('.sky'); // 밤하늘 영역
    const skyWidth = sky.offsetWidth;
    const skyHeight = sky.offsetHeight;

    if (starCount >= 5) {
        // ⭐ 큰 별 1개 추가 (5개를 채웠을 때)
        const bigStar = document.createElement('div');
        bigStar.classList.add('big-star');
        bigStar.style.position = 'absolute';

        // 처음엔 가운데 위치
        bigStar.style.left = `${skyWidth / 2 - 10}px`;
        bigStar.style.top = `${skyHeight / 2 - 10}px`;

        // 큰 별 스타일
        bigStar.style.width = '8px'; // 더 큼
        bigStar.style.height = '8px';
        bigStar.style.backgroundColor = 'white';
        bigStar.style.borderRadius = '50%';

        // ✨ 밝은 효과를 위한 box-shadow 추가
        bigStar.style.boxShadow = '0 0 15px 3px rgba(255, 255, 255, 0.8)'; // 흰색 발광 효과

        // 부드러운 이동을 위한 transition
        bigStar.style.transition = 'left 1s ease-out, top 1s ease-out';

        // 밤하늘에 추가
        sky.appendChild(bigStar);

        // 0.5초 후 랜덤 위치로 이동
        setTimeout(() => {
            const position = constellations[constellationIndex++];

            // 별을 해당 좌표로 이동
            const newX = position.x * skyWidth;
            const newY = position.y * skyHeight;

            bigStar.style.left = `${newX}px`;
            bigStar.style.top = `${newY}px`;

            setTimeout(drawOneLineBetweenStars, 1000);

        }, 500);

        // 작은 별 개수는 (starCount - 1)
        starCount -= 1;
    
    }

    // ✨ 작은 별 추가 (남은 개수만큼)
    for (let i = 0; i < starCount; i++) {
        if (nowStar > 1000) break;
        nowStar++;
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.position = 'absolute';

        // 처음엔 가운데 위치
        star.style.left = `${skyWidth / 2 - 10}px`;
        star.style.top = `${skyHeight / 2 - 10}px`;

        // 작은 별 스타일 설정
        const starSize = Math.random() * 3 + 1; // 2px ~ 5px 크기
        star.style.width = `${starSize}px`;
        star.style.height = `${starSize}px`;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';

        // 부드러운 이동을 위한 transition
        star.style.transition = 'left 1s ease-out, top 1s ease-out';

        // 밤하늘에 추가
        sky.appendChild(star);

        // 0.5초 후 랜덤 위치로 이동
        setTimeout(() => {
            const randomX = Math.random() * skyWidth;
            const randomY = Math.random() * skyHeight;

            star.style.left = `${randomX}px`;
            star.style.top = `${randomY}px`;

            // 3초 ~ 10초 랜덤 애니메이션 지속 시간 적용
            const randomDuration = Math.random() * 7 + 3;
            star.style.animationDuration = `${randomDuration}s`;

        }, 500);
    }
}

// 창 크기 변경 시 별들의 위치 업데이트
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout); // 이전 타임아웃을 지우고
    resizeTimeout = setTimeout(() => {
        const sky = document.querySelector('.sky');
        const skyWidth = sky.offsetWidth;
        const skyHeight = sky.offsetHeight;

        // 큰 별들의 위치 업데이트
        const bigStars = document.querySelectorAll('.big-star');
        bigStars.forEach((bigStar, index) => {
            const position = constellations[index % constellations.length];
            const newX = position.x * skyWidth;
            const newY = position.y * skyHeight;

            bigStar.style.left = `${newX}px`;
            bigStar.style.top = `${newY}px`;
        });

        // 작은 별들의 위치 업데이트 (옵션에 따라 필요 시 구현)
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const randomX = Math.random() * skyWidth;
            const randomY = Math.random() * skyHeight;
            
            star.style.left = `${randomX}px`;
            star.style.top = `${randomY}px`;
        });

        // 기존 선 삭제
        const lines = document.querySelectorAll('.constellation-line');
        lines.forEach(line => {
            line.remove();
        });

        // 선 다시 그리기 (setTimeout을 통해 일정 시간 후 실행)
        setTimeout(drawLinesBetweenStars, 1000);
    }, 200); // 200ms 후에 한 번만 실행되도록 설정
});

// 큰 별 생성시 연결
function drawOneLineBetweenStars() {
    const sky = document.querySelector('.sky');
    if (constellationIndex < 2) return;

    const stars = document.querySelectorAll('.big-star');
    const newStarIndex = stars.length - 1; // 마지막 별이 새로 추가된 별
    const connections = getConnectionsForNewStar(newStarIndex); // 연결할 별들을 가져옴

    // 연결된 별들끼리 선을 그림
    connections.forEach(connection => {
        const startStarIndex = connection[0]; // 연결할 첫 번째 별 인덱스
        const endStarIndex = connection[1];   // 연결할 두 번째 별 인덱스

        const startStar = stars[startStarIndex - 1]; // 인덱스는 1부터 시작하므로 -1
        const endStar = stars[endStarIndex - 1];     // 동일

        // 유효한 별이 있을 경우 선을 그리도록
        if (startStar && endStar) {
            const line = document.createElement('div');
            line.classList.add('constellation-line');
            line.style.position = 'absolute';
            line.style.backgroundColor = 'rgba(255, 255, 255, 0.28)';
            line.style.height = '2px';
            line.style.transformOrigin = 'left center';

            const x1 = parseFloat(startStar.style.left) + 4;
            const y1 = parseFloat(startStar.style.top) + 4;
            const x2 = parseFloat(endStar.style.left) + 4;
            const y2 = parseFloat(endStar.style.top) + 4;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            line.style.width = `0px`; // 처음엔 0px
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transition = 'width 1s ease-out'; // 선이 천천히 그려짐

            sky.appendChild(line);

            // 0.1초 후 선이 부드럽게 나타나도록 길이 조절
            setTimeout(() => {
                line.style.width = `${distance}px`;
            }, 100);
        }
    });
}

// 창 크기 변경 시 별들 다시 연결
function drawLinesBetweenStars() {
    const sky = document.querySelector('.sky');
    const stars = document.querySelectorAll('.big-star');
    const connections = [];  // 새로 연결할 별들 저장

    // 모든 별들에 대해 연결을 처리
    for (let i = 0; i < stars.length; i++) {
        const newConnections = getConnectionsForNewStar(i); // 연결할 별들을 가져옴
        connections.push(...newConnections);  // 연결 추가
    }

    // 연결된 별들끼리 선을 그림
    connections.forEach(connection => {
        const startStarIndex = connection[0]; // 연결할 첫 번째 별 인덱스
        const endStarIndex = connection[1];   // 연결할 두 번째 별 인덱스

        const startStar = stars[startStarIndex - 1]; // 0부터 시작하는 인덱스를 사용
        const endStar = stars[endStarIndex - 1];     // 동일

        // 유효한 별이 있을 경우 선을 그리도록
        if (startStar && endStar) {
            const line = document.createElement('div');
            line.classList.add('constellation-line');
            line.style.position = 'absolute';
            line.style.backgroundColor = 'rgba(255, 255, 255, 0.28)';
            line.style.height = '2px';
            line.style.transformOrigin = 'left center';

            const x1 = parseFloat(startStar.style.left) + 4;
            const y1 = parseFloat(startStar.style.top) + 4;
            const x2 = parseFloat(endStar.style.left) + 4;
            const y2 = parseFloat(endStar.style.top) + 4;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            line.style.width = `0px`; // 처음엔 0px
            line.style.left = `${x1}px`;
            line.style.top = `${y1}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.transition = 'width 1s ease-out'; // 선이 천천히 그려짐

            sky.appendChild(line);

            // 0.1초 후 선이 부드럽게 나타나도록 길이 조절
            setTimeout(() => {
                line.style.width = `${distance}px`;
            }, 100);
        }
    });
}