//マウスストーカー
  (() => {
    // スマホなら動かさない
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    document.addEventListener('DOMContentLoaded', () => {
        const stalker = document.querySelector('.mouse-stalker-item');
        const circle = document.querySelector('.mouse-stalker-item-circle');
        
        // 最初は隠しておく
        stalker.style.opacity = "0";

        // 全てのリンク・ボタンを取得
        const targets = document.querySelectorAll('a, button, .mouse-stalker-hover');

        // ホバー時の処理
        targets.forEach(target => {
            target.addEventListener('mouseenter', () => circle.classList.add('active'));
            target.addEventListener('mouseleave', () => circle.classList.remove('active'));
        });

        // マウス位置に同期（遅延なし）
        document.addEventListener('mousemove', (e) => {
            stalker.style.opacity = "1";
            stalker.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
        
        // 画面外に出た時に隠す
        document.addEventListener('mouseleave', () => {
            stalker.style.opacity = "0";
        });
    });
})();



//スライダー(フェードイン・フェードアウト)
$(function () {
  const item = $(".js-slider-fade div ul li"); // スライダーの画像一枚ずつのHTML要素

  const showClass = "js-slider-fade-show"; // 表示状態の時に付与するクラス名
  const hideClass = "js-slider-fade-hide"; // 非表示状態の時に付与するクラス名

  let length = item.length; // スライダーの画像の枚数
  let current = 0; // 現在表示中の画像の番号 (jsでは0から数えるので初期値は0)

  function init() {
    // 現在の画像を0番目(一番最初の画像)に設定
    current = 0;
    // 全ての画像要素に非表示にするクラスを追加
    item.addClass(hideClass);
    // 現在の画像に表示するクラスを追加
    item.eq(current).addClass(showClass);
    // 現在の画像から非表示にするクラスを削除
    item.eq(current).removeClass(hideClass);
  }

  function change() {
    // 現在の画像が全ての画像の量より少ないならifの処理を実行
    if (current < length - 1) {
      // 現在の画像をプラス1して次の画像に設定する
      current += 1;
      // 一つ前の画像に非表示にするクラスを追加
      item.eq(current - 1).addClass(hideClass);
      // 一つ前の画像から表示するクラスを削除
      item.eq(current - 1).removeClass(showClass);
      // 現在の画像に表示するクラスを追加
      item.eq(current).addClass(showClass);
      // 現在の画像から非表示にするクラスを削除
      item.eq(current).removeClass(hideClass);
    }
    // 現在の画像が全ての画像の量より少なくないならelseの処理を実行
    else {
      // 現在の画像を0(一番最初の画像)に設定する
      current = 0;
      // 現在の画像が0となった時、一つ前の画像は最後の画像になります。
      // 一つ前の画像に非表示にするクラスを追加
      item.eq(length - 1).addClass(hideClass);
      // 一つ前の画像から表示するクラスを削除
      item.eq(length - 1).removeClass(showClass);
      // 現在の画像に表示するクラスを追加
      item.eq(current).addClass(showClass);
      // 現在の画像から非表示にするクラスを削除
      item.eq(current).removeClass(hideClass);
    }
  }

  // 初期化の処理
  init();
  // // setIntervalは、一定時間ごとに設定した処理を行う関数です。
  // // 今回の場合は、3000ms(3秒)ごとにchange関数を呼び出します。
  setInterval(() => {
    change();
  }, 5000);
});
  
  

//ハンバーガーメニュー
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-overlay');
  const nav = document.querySelector('.nav-overlay');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');

    const isOpen = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    nav.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // ESCキーでメニューを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      toggleMenu();
    }
  });

  // メニューリンクをクリックした時にもメニューを閉じる
  const menuLinks = document.querySelectorAll('.nav-overlay__link');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-image');
  const closeBtn = document.querySelector('.close');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  let currentIndex = 0;
  let fullImageUrls = [];

  // 初期化：拡大画像URLのリスト作成
  thumbnails.forEach((thumb, index) => {
    fullImageUrls.push(thumb.getAttribute('data-full'));

    thumb.addEventListener('click', () => {
      currentIndex = index;
      showImage();
    });
  });

  function showImage() {
    modalImg.src = fullImageUrls[currentIndex];
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % fullImageUrls.length;
    showImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + fullImageUrls.length) % fullImageUrls.length;
    showImage();
  }

  // ボタンイベント
  closeBtn.addEventListener('click', closeModal);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // 背景クリックで閉じる
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESCキーでも閉じる
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === "block") {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
  });
});



const background = document.getElementById('background');
const images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
const sections = document.querySelectorAll('.section');

function updateBackground() {
  const scrollY = window.scrollY;
  const sectionHeight = window.innerHeight;
  const index = Math.floor(scrollY / sectionHeight);
  background.style.backgroundImage = `url('${images[index] || images[images.length - 1]}')`;
}

window.addEventListener('scroll', updateBackground);
window.addEventListener('load', updateBackground);







// スクロールして表示
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});







// --- 省略（既存のロゴ・文字アニメ処理） ---

// 背景フェードアウト（ここを修正）
setTimeout(() => {
  start.style.transition = "opacity 0.5s ease";
  start.style.opacity = 0;
  
  // ★ ここでメイン画面のピロピロを開始させる関数を呼ぶ！
  startMainTextAnimation();

  setTimeout(() => start.style.display = "none", 500);
}, 3500);





// 画像を開く
function openLightbox(src) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // スクロール停止
}

// 画像を閉じる
function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // スクロール再開
}

// --- スクロールアニメーション用（is-visibleを付ける） ---
window.addEventListener('scroll', function() {
    var cards = document.querySelectorAll('.gallery-card');
    for (var i = 0; i < cards.length; i++) {
        var rect = cards[i].getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            cards[i].classList.add('is-visible');
        }
    }
});
// 読み込み時にも一度実行
window.dispatchEvent(new Event('scroll'));








document.addEventListener('DOMContentLoaded', () => {
    const lb = document.getElementById('pfolio-lightbox');
    const img = document.getElementById('pfolio-lightbox-img');

    // 画像を開く
    window.pfolioOpen = function(e, src) {
        e.preventDefault();
        if (lb && img) {
            img.src = src;
            lb.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // 画像を閉じる
    window.pfolioClose = function() {
        if (lb) {
            lb.style.display = 'none';
            document.body.style.overflow = '';
            img.src = '';
        }
    };

    // スクロール監視
    const cards = document.querySelectorAll('.pfolio-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('pf-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -15% 0px' });

    cards.forEach(card => observer.observe(card));
});









document.addEventListener('DOMContentLoaded', () => {
    // ギャラリーカードだけでなく、js-fadeがついたもの全てを対象にする
    const targets = document.querySelectorAll('.js-fade');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // 画面の下から10%の位置で発火
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一度表示したら監視終了
            }
        });
    }, observerOptions);

    targets.forEach(target => {
        observer.observe(target);
    });
});











/*moziアニメーション*/
document.addEventListener('DOMContentLoaded', () => {
    const piroTexts = document.querySelectorAll('.js-piro');
    
    piroTexts.forEach(text => {
        const nodes = [...text.childNodes];
        let newHTML = '';
        let charCounter = 0; // 全体を通した文字カウンター

        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const chars = [...node.textContent];
                chars.forEach(char => {
                    // スペースなどはそのまま、文字だけspanで囲む
                    if (char.trim() === "") {
                        newHTML += char;
                    } else {
                        newHTML += `<span style="transition-delay: ${charCounter * 0.015}s">${char}</span>`;
                        charCounter++; // ここでカウントを増やし続ける
                    }
                });
            } else {
                // <br>などはそのまま入れる
                newHTML += node.outerHTML || '';
            }
        });
        text.innerHTML = newHTML;
    });

    // 監視の処理（前と同じ）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.js-fade, .js-piro').forEach(t => observer.observe(t));
});









/* =================================================
  Text Animation Logic (Hero Section)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const heroTexts = document.querySelectorAll('.js-hero-appear');

  heroTexts.forEach(text => {
    // 準備：文字をspanに分解（ここは即座に実行）
    const nodes = [...text.childNodes];
    let newHTML = '';
    let charCounter = 0;

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        [...node.textContent].forEach(char => {
          if (char.trim() === "") {
            newHTML += char;
          } else {
            newHTML += `<span style="transition-delay: ${charCounter * 0.07}s">${char}</span>`;
            charCounter++;
          }
        });
      } else {
        newHTML += node.outerHTML || '';
      }
    });
    text.innerHTML = newHTML;

    // 本番：オープニングの完了通知が来たらクラスを付与
    window.addEventListener('openingFinished', () => {
      text.classList.add('is-active');
    });
  });
});












document.addEventListener('DOMContentLoaded', () => {

    // 「初回訪問フラグ」をチェック
    const isFirstVisit = !sessionStorage.getItem('pfolio_visited');

    if (isFirstVisit) {
        // --- 初回訪問時のみ実行 ---
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'; // 自動復元をオフに
        }
        window.scrollTo(0, 0); // 強制トップ移動
        
        // 2回目以降のためにフラグを立てる
        sessionStorage.setItem('pfolio_visited', 'true');
    } else {
        // --- 2回目以降（リロードなど） ---
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'auto'; // ブラウザの標準機能に任せる
        }
    }

    // --- 既存のスクロール監視（Observer）などはここから ---
    const cards = document.querySelectorAll('.gallery-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px' });

    cards.forEach(card => observer.observe(card));
});