"use strict";

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = location.search.substr(1).match(reg);

  if (r != null) {
    return decodeURIComponent(r[2]);
  }

  return null;
}

var count = 72;
var click = false;
var type;

for (var i = 0; i < count; i++) {
  var li = "<div class=\"lottery-unit lottery-unit-".concat(i, "\">\n        <img class=\"active1\" src=\"./img/lucky_draw/4.png\">\n        <div class=\"lottery-unit-mark\"></div>\n      </div>");
  $("#lottery").append(li);
}

var lottery = {
  index: -1,
  //当前转动到哪个位置，起点位置
  count: 0,
  //总共有多少个位置
  timer: 0,
  //setTimeout的ID，用clearTimeout清除
  speed: 20,
  //初始转动速度
  times: 0,
  //转动次数
  cycle: 0,
  //转动基本次数：即至少需要转动多少次再进入抽奖环节
  prize: -1,
  //中奖位置
  number: 0,
  //中奖次数
  timersList: [],
  //中奖次数
  init: function init(id) {
    if ($("#" + id).find(".lottery-unit").length > 0) {
      $lottery = $("#" + id);
      $units = $lottery.find(".lottery-unit");
      this.obj = $lottery;
      this.count = $units.length;
      $lottery.find(".lottery-unit-" + this.index).addClass("active");
    }

    ;
    $("#lottery").find(".lottery-unit").removeClass("active-index");
  },
  roll: function roll() {
    var index = this.index;
    var count = this.count;
    var lottery = this.obj;
    $(lottery).find(".lottery-unit-" + index).removeClass("active");
    index += 1;

    if (index > count - 1) {
      index = 0;
    }

    ;
    $(lottery).find(".lottery-unit-" + index).addClass("active");
    this.index = index;
    return false;
  },
  stop: function stop(index) {
    this.prize = index;
    return false;
  }
};
var v = type == '1' ? 15 : 10;
var isEnd = true;

function roll() {
  lottery.times += 1;
  lottery.roll(); // console.log(lottery.times, lottery.cycle-10 , lottery.prize, lottery.index)

  if (lottery.times > lottery.cycle - 10 && lottery.prize == lottery.index) {
    $("#lottery").find(".lottery-unit-" + lottery.prize).addClass("active-index");
    lottery.timersList.push(lottery.prize);
    lottery.times = 0;
    lottery.prize = -1;
    console.log('stop');
    $('#myModal').reveal($(this).data());
    click = false;
    clearTimeout(lottery.timer);
  } else {
    if (lottery.times < lottery.cycle) {
      lottery.speed -= 20;
    } else if (lottery.times == lottery.cycle) {
      var index = Math.random() * lottery.count | 0; // lottery.prize = 1;

      lottery.prize = index;
    } else {
      if (lottery.times >= lottery.cycle + 10 && (Math.abs(lottery.prize - lottery.index) < v || lottery.prize + (70 - lottery.index) < v)) {
        lottery.speed += 60;
      } else {
        lottery.speed -= 20;
      }
    }

    if (lottery.speed < 40) {
      lottery.speed = 40;
    }

    ;
    if (type != 1) lottery.speed = 10;
    lottery.timer = setTimeout(roll, lottery.speed);
  }

  return false;
}

$("#myModal .close-reveal-modal").click(function (e) {
  if (click) {
    return false;
  }

  if (lottery.timersList.length < +lottery.number) {
    lottery.speed = 100;
    roll();

    if (lottery.timersList.length + 1 > +lottery.number) {
      if (type == '3') {
        $('.btns-img img4').addClass('disabled');
        $('.btns-img img2').removeClass('disabled');
      }

      if (type == '2') {
        $('.btns-img img2').addClass('disabled');
        $('.btns-img img1').removeClass('disabled');
      }

      if (type == '1') {
        $('.btns-img img1').addClass('disabled');
      }
    }
  }
});
var arr = [];

window.onload = function () {
  lottery.init('lottery');
  $(".btns-img").click(function (e) {
    if (click || e.currentTarget.className.includes('disabled')) {
      return false;
    } else {
      click = true;
      lottery.init('lottery');
      var number = e.currentTarget.dataset.number;
      type = e.currentTarget.dataset.type;

      if (arr.includes(type)) {
        alert('当前中奖名额已满！');
        return;
      }

      arr.push(type);
      $('.lottery-unit-mark').addClass("ranking-".concat(type));
      var length = $("#lottery").find(".lottery-unit").length;
      lottery.number = number;
      lottery.cycle = length * 1.25;
      lottery.timersList = [];
      lottery.speed = 100;
      roll();
      return false;
    }
  });
};