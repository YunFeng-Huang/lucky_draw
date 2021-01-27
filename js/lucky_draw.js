
var count = 72 //数量
var type; //等级
var click = false;
let isOne = true;




var lottery = {
  index: -1, //当前转动到哪个位置，起点位置
  count: 0, //总共有多少个位置
  timer: 0, //setTimeout的ID，用clearTimeout清除
  speed: 20, //初始转动速度
  times: 0, //转动次数
  cycle: 0, //转动基本次数：即至少需要转动多少次再进入抽奖环节
  prize: -1, //中奖位置
  number: 0, //中奖次数
  timersList: [], //中奖次数
  init: function (id) {
    if ($("#" + id).find(".lottery-unit").length > 0) {
      $lottery = $("#" + id);
      $units = $lottery.find(".lottery-unit");
      this.obj = $lottery;
      this.count = $units.length;
      $lottery.find(".lottery-unit-" + this.index).addClass("active");
    };
    $("#lottery").find(".lottery-unit").removeClass("active-index");
  },
  roll: function () {
    var index = this.index;
    var count = this.count;
    var lottery = this.obj;
    $(lottery).find(".lottery-unit-" + index).removeClass("active");
    index += 1;
    if (index > count - 1) {
      index = 0;
    };
    $(lottery).find(".lottery-unit-" + index).addClass("active");
    this.index = index;
    return false;
  },
  stop: function (index) {
    this.prize = index;
    return false;
  }
};
var v = isOne ? 15 : 10;
var isEnd = true;
var a = 0;
var winning;

function _log() {
  $("#myModal .ul").html('');
  let len = isOne ? 1 : 5;
  for (var i = 0; i < len; i++) {
    let html = `<div class="li li-${type}">
          <img src="${winning[i].avatar}" width="220px" height="220px">
          <div class="lottery-unit-mark"></div>
        </div>`
    $("#myModal .ul").append(html);
  }
  if (isOne) $("#myModal .ul").css('justify-content', 'center')
  $("#myModal").attr('class', `reveal-modal log-${type}`);
  $('#myModal').reveal($(this).data());
}
function roll() {
  lottery.times += 1;
  lottery.roll();
  // console.log(lottery.times, lottery.cycle-10 , lottery.prize, lottery.index)
  if (lottery.times > lottery.cycle - 10 && lottery.prize == lottery.index) {
    $("#lottery").find(".lottery-unit-" + lottery.prize).addClass("active-index");

    lottery.times = 0;
    lottery.prize = -1;
    console.log('stop');
    if (isOne) {
      lottery.timersList.push(lottery.prize);
      _log()
      click = false;
      clearTimeout(lottery.timer);
    } else {
      if (a < 4) {
        a++;
        console.log(a)
        lottery.speed = 100;
        roll();
      } else {
        lottery.timersList.push(lottery.prize);
        _log()
        clearTimeout(lottery.timer);
      }
    }

  } else {
    if (lottery.times < lottery.cycle) {
      lottery.speed -= 20;
    } else if (lottery.times == lottery.cycle) {
      // var index = Math.random() * (lottery.count) | 0;
      // lottery.prize = 1;
      lottery.prize = winning[a].id;
    } else {
      if (lottery.times >= lottery.cycle + 10 && (Math.abs(lottery.prize - lottery.index) < v || lottery.prize + (70 - lottery.index) < v)) {
        lottery.speed += 60;
      } else {
        lottery.speed -= 20;
      }
    }

    if (lottery.speed < 40) {
      lottery.speed = 40;
    };
    if (type != 1) lottery.speed = 20;
    lottery.timer = setTimeout(roll, lottery.speed);
  }
  return false;
}

$("#myModal .close-reveal-modal").click(function (e) {

  console.log(lottery.timersList.length + 1, +lottery.number, type);
  if (lottery.timersList.length + 1 > +lottery.number) {
    if (type == '3') {
      $('.btns-img.img4').addClass('disabled')
      $('.btns-img.img2').removeClass('disabled')
    }
    if (type == '2') {
      $('.btns-img.img2').addClass('disabled')
      $('.btns-img.img1').removeClass('disabled')
    }
    if (isOne) {
      $('.btns-img.img1').addClass('disabled')
    }
    click = false;

  } else {
    if (lottery.timersList.length < +lottery.number) {
      a = 0;
      lottery.speed = 100;
      post();
      roll()
    }
  }
});

let arr = [];
window.onload = function () {
  lottery.init('lottery');
  $(".btns-img").click(function (e) {
    if (window.timer) {
      clearInterval(window.timer);
    }
    if (click || e.currentTarget.className.includes('disabled')) {
      return false;
    } else {
      post();
      click = true;
      lottery.init('lottery');
      let number = e.currentTarget.dataset.number;
      type = e.currentTarget.dataset.type;
      isOne = type == '1';
      if (arr.includes(type)) {
        alert('当前中奖名额已满！');
        return;
      }
      arr.push(type);
      $('.lottery-unit-mark').addClass(`ranking-${type}`)
      let length = $("#lottery").find(".lottery-unit").length;
      lottery.number = number;
      lottery.cycle = length * 1.25;
      lottery.timersList = [];
      lottery.speed = 100;
      roll();
      return false;
    }
  });
};


