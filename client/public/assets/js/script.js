
// var MenuItems = document.getElementById("MenuItems");
// MenuItems.style.maxHeight = "0px";
// function menutoggle() {
//     if (MenuItems.style.maxHeight == "0px") {
//         MenuItems.style.maxHeight = "200px";
//     } else {
//         MenuItems.style.maxHeight = "0px";
//     }
// }

// var hiddenBox = $("#banner-message");
// $("#button-container button").on("click", function (event) {
//     hiddenBox.show();
// });
// (document).ready(() => {
//     $("#menu-icon").click(function () {
//         console.log("hello");
//     });
// })

// $('.menu-icon').on('click', function () {
//     $(".menu-items").toggleClass('width');
// });




// window.addEventListener("scroll", function () {
//     var header = document.querySelector("header");
//     header.classList.toggle("sticky", window.scrollY > 0);
//     MenuItems.style.maxHeight = "0px";
// })

// var ProductImg = document.getElementById("productImg");
// var SmallImg = document.getElementsByClassName("small-img");
// if (ProductImg) {
//     SmallImg[0].onclick = function () {
//         ProductImg.src = SmallImg[0].src;
//     }
//     SmallImg[1].onclick = function () {
//         ProductImg.src = SmallImg[1].src;
//     }
//     SmallImg[2].onclick = function () {
//         ProductImg.src = SmallImg[2].src;
//     }
//     SmallImg[3].onclick = function () {
//         ProductImg.src = SmallImg[3].src;
//     }
// }


$(document).ready(function () {
    $("#menu-icon").click(function () {
        $(".menu-items").toggleClass("width");
    });

    $('.firstLine').slick({
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2200,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })

    $(".nav").on("click", "a", function () {
        $(".active").removeClass("active");
        $(this).addClass("active");
    })

    // $("#regTab").click(function () {
    //     $("#regForm").css({ 'transform': 'translateX(0px)' })
    //     $("#loginForm").css({ 'transform': 'translateX(0px)' })
    // })

    // $("#loginTab").click(function () {
    //     $("#regForm").css({ 'transform': 'translateX(300px)' })
    //     $("#loginForm").css({ 'transform': 'translateX(300px)' })
    // })


    // jQuery methods go here...

});

// $(document).on()

window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
    // MenuItems.style.maxHeight = "0px";
    $(".menu-items").removeClass("width");
})

// var ProductImg = document.getElementById("productImg");
// var SmallImg = document.getElementsByClassName("small-img");
// if (ProductImg) {
//     SmallImg[0].onclick = function () {
//         ProductImg.src = SmallImg[0].src;
//     }
//     SmallImg[1].onclick = function () {
//         ProductImg.src = SmallImg[1].src;
//     }
//     SmallImg[2].onclick = function () {
//         ProductImg.src = SmallImg[2].src;
//     }
//     SmallImg[3].onclick = function () {
//         ProductImg.src = SmallImg[3].src;
//     }
// }

// var loginForm = document.getElementById("loginForm");
// var regForm = document.getElementById("regForm");
// var indicator = document.getElementById("indicator");

// function register() {
//     console.log('register');
//     regForm.style.transform = "translateX(0px)";
//     loginForm.style.transform = "translateX(0px)";
//     indicator.style.transform = "translateX(100px)";
// }

// function login() {
//     regForm.style.transform = "translateX(300px)";
//     loginForm.style.transform = "translateX(300px)";
//     indicator.style.transform = "translateX(0px)";
// }