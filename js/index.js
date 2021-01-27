let token = "";
let list = [];
let i=0;
let j=0;
let times = 8300 + 2800 * 120;
let times2 = times + 33450 + 5000;
let speed = 1000;
// let times = 1700 * (getList.length+1);
let div = document.getElementsByClassName('card-box')[0];
const player = new MarsPlayer({container:document.getElementById('cvs')});
let flyArr=[1,2,3,4,5,6,7,8,7,7,7];
function init(){
    login();
    setTimeout(()=>{
        $(".body-box").addClass("cover");
        $(".circle1").addClass("active");
        $(".circle2").addClass("active");
    },500);
    setTimeout(()=>{
        $(".circle1").addClass("active");
        $(".circle2").addClass("active");
    },1000);
    setTimeout(()=>{
        $(".circle3").addClass("active");
    },1100);
    setTimeout(()=>{
        $(".circle4").addClass("active");
    },1700);
    setTimeout(()=>{
        $(".circle5").addClass("active");
    },2300);
    setTimeout(()=>{
        $(".flower").addClass("active");
    },2900);
    setTimeout(()=>{
        $(".tower1").addClass("active");
    },3200);
    setTimeout(()=>{
        $(".right3").addClass("active");
    },3500);
    setTimeout(()=>{
        $(".left2").addClass("active");
    },3800);
    setTimeout(()=>{
        $(".right2").addClass("active");
    },4100);
    setTimeout(()=>{
        $(".left1").addClass("active");
    },4400);
    setTimeout(()=>{
        $(".right1").addClass("active");
    },4700);
    setTimeout(()=>{
        $(".center").addClass("active");
    },5000);
    setTimeout(()=>{
        $(".cloud-l").addClass("active");
        $(".cloud-r").addClass("active");
        $(".zfb").addClass("active");
        $(".title").addClass("active");
    },5500);
    setTimeout(()=>{
        $(".body-box2").addClass("active");
        $(".seal").addClass("active");
        $(".poster").addClass("active");
        $(".zfb").addClass("active");
        $(".title").addClass("active");
    },7000);
    setTimeout(()=>{
        sendCard();
        // createCard();
    },8300)
    setTimeout(()=>{
        createCard();
    },times)
};
function login(){
    $.ajax({
        type:"POST",
        contentType:"application/json;charset=UTF-8",
        url:"https://macao.iuctrip.com/api/screen/login",
        data:JSON.stringify({
            username:'macao20',
            password:'2019@macaof1.',
        }),
        success:(res)=> {
            console.log(res);
            token = res.data;
            getList();
        },
        error:(err)=>{
            console.log(err.status);
            console.log(err.responseText);
        }
    });
};
function getList(){
    $.ajax({
        type:"GET",
        contentType:"application/json;charset=UTF-8",
        url:"https://macao.iuctrip.com/api/screen/display_bless",
        beforeSend: function(request) {
            request.setRequestHeader("token", token);
        },
        success:(res)=> {
            console.log(res);
            let getLists = res.data;
            getLists = getLists.map((item)=>{
                if(!item.customize_card_bless_id && item.customize_card_bless_id !== 0){
                    switch (item.default_card_tmpl_id) {
                        case 1:
                            item.customize_card_bless_id = 1;
                            item.customize_card_stamp_id = 2;
                            break;
                        case 2:
                            item.customize_card_bless_id = 3;
                            item.customize_card_stamp_id = 1;
                            break;
                        case 3:
                            item.customize_card_bless_id = 11;
                            item.customize_card_stamp_id = 7;
                            break;
                        case 4:
                            item.customize_card_bless_id = 10;
                            item.customize_card_stamp_id = 4;
                            break;
                        case 5:
                            item.customize_card_bless_id = 9;
                            item.customize_card_stamp_id = 3;
                            break;
                        default:
                            item.customize_card_bless_id = 5;
                            item.customize_card_stamp_id = 5;
                    }
                }
                return item;
            })
            list = list.concat(getLists);
            console.log(list.length);
            if(list.length < 120){
                getList();
            }
        },
        error:(e)=>{
            console.log(e.status);
            console.log(e.responseText);
        }
    });
};
function shuffle(a) {
   return a[Math.floor((Math.random()*a.length))]
};
function sendCard(){
    let num = shuffle(flyArr);
    console.log(num)
    setTimeout(()=>{
        $(".bless-img").attr("src","https://oss.iuctrip.com/prod/tesla/aomen/bless/bless" + list[i].customize_card_bless_id + ".png");
        $(".stamp-img").attr("src","https://oss.iuctrip.com/prod/tesla/aomen/stamp/stamp" + list[i].customize_card_stamp_id + ".png");
        $(".from").text(list[i].province + "的" + list[i].user_name);
        $(".card").addClass("active" + num);
    },100);
    setTimeout(()=>{
        $(".seal").addClass("seal-move");
    },1200)
    setTimeout(()=>{
        $(".poster-mark").addClass("active");
    },1650)
    setTimeout(()=>{
        $(".card").addClass("card-fly");
        $(".seal").removeClass("seal-move");
        $(".poster-top").removeClass("active");
    },2000)
    setTimeout(()=>{
        $(".poster-top").addClass("active");
        player.loadSceneAsync('https://gw.alipayobjects.com/os/gltf-asset/mars-item/UQRYWQXIFBPC/firework-d4363.json').then(scene=>player.play(scene));
    },2400)
    setTimeout(()=>{
        $(".card").removeClass("card-fly").removeClass("active" + num);
        $(".poster-mark").removeClass("active");
        if(i<list.length-1){
            i++;
            sendCard();
        }
    },2800)
};
function createCard(){
    let left = 0;
    let top = 0;
    let rotate = 0;
    rotate = Math.random()*(Math.random()>0.5?1:-1)*45;
    left = Math.random()*876;//水平方向随机距离
    top = Math.random()*540;//竖直方向随机距离
    let cardLi = document.createElement('div');
    cardLi.className = "card-li";
    cardLi.style.left = left < 438 ? "-500px":"1176px";
    cardLi.style.top = top < 270 ? "-400px":"840px";
    cardLi.innerHTML =  '<img src="https://oss.iuctrip.com/prod/tesla/aomen/bless/bless' + list[j].customize_card_bless_id + '.png" class="bless-img">' + 
                        '<img src="https://oss.iuctrip.com/prod/tesla/aomen/stamp/stamp' + list[j].customize_card_stamp_id + '.png" class="stamp-img">' +
                        '<img src="./img/poster_mark.png" class="poster-mark" id="mark">' +
                        '<div class="user-info">' +
                            '<p class="from">' + list[j].province + '的' + list[j].user_name + '</p>' +
                            '<p class="name">发来的祝福</p>' +
                        '</div>';
    cardLi.style.transform = "rotate(0deg) scale(0,0) skew(-90deg,90deg)";
    div.appendChild(cardLi); 
    $(".card-box").children(".card-li").eq(j).animate({

    },"1200","swing",function(){
        $(".card-box").children(".card-li").eq(j).css({
            'left':left + "px",
            'top':top + "px",
            'transform':"rotate(" + rotate + "deg) scale(1,1) skew(0deg,0deg)",
        })
    });
    if(j<list.length-1){
        j++; 
        if(speed>15){
            speed = speed - 15; 
        }      
        if(j<60){
            setTimeout(()=>{
                createCard();
            },speed)
        }  
    }     
};
setTimeout(()=>{
    $(document.body).animate({
        'opacity':0
    },"2000","swing")
    location.reload();
},times2)

