class person{
  constructor(){
    this.el={ //存放标签
      tank:document.querySelector(".tank"),
      tube:document.querySelector(".tube"),
      background:document.querySelector(".background"),
      enemyArr:[]
    },
    this.timeID={ //计时器
      walkId:0,
      launchId:0,
      EMId:0,
      EMPId:0
    },
    this.condition={ //判断条件 
      direction:"ArrowUp",
      Level:0,
      enemyDirection:"ArrowUp"
    }
  }
  css(el,c1,c2){ //元素、属性、属性值
    el.style[c1]=c2;
    return this;
  }
  show(el){
    el.style.display="block"
    return this
  }
  hide(el){
    el.style.display="none"
    return this
  }
};
const TankBattle = new person(); //构造实例

const data={
  ArrowUp:{
    name:"上",
    rotate:"rotate(0)", //旋转
    cannonball:{ //位置
      left:'(left+(width/2-4))+"px"',
      top:'(top-5) +"px"'
    }
  },
  ArrowDown:{
    name:"下",
    rotate:"rotate(180deg)",
    cannonball:{
      left:'(left+(width/2)-5)+"px"',
      top:'top+height +"px"'
    }
  },
  ArrowLeft:{
    name:"左",
    rotate:"rotate(270deg)",
    cannonball:{
      left:'left+"px"',
      top:'(top+(height/2-5))+"px"'
    }
  },
  ArrowRight:{
    name:"右",
    rotate:"rotate(90deg)",
    cannonball:{
      left:'(left+(width))+"px"',
      top:'(top+(height/2)-5) +"px"'
    }
  },
  Wall:[
    [
       "                         ",
       "                         ",
       "       o         o       ",
       "oooooooo         oooooooo",
       "                         ",
       "         ooooooo         ",
       "    o               o    ", 
       "    o               o    ",
       "    ooooooooooooooooo    ",
       "            o            ",
       "            o            ",
       "            o            ",
       "oooooooo    o    oooooooo",
       "            o            ",
       "            o            ", 
       "        o   o    o       ",
       "   oo   oooooooooo   oo  ",
       "                         ",
       "                         ",
       "                         ",
       "                         ",
    ]
  ]
}

person.prototype.walk=function(){ //移动、事件
  let count=0, //计数，长按无效
  tank=this.el.tank,
  down=e=>{
    count++
    if(count>1) return;
    e.key===" "?this.cannonball(tank,this.direction):false
    for(k in data){
      if(k===e.key){ //判断上下左右
        this.setInter(tank,data[k].name,5);
        this.css(tank,"transform",data[k].rotate);
        this.direction=data[k]
      }
    }
  },
  up=e=>{
    count=0;
    clearInterval(this.timeID.walkId)
  };
  document.onkeydown = down; //键盘按下
  document.onkeyup = up; //键盘抬起
};

person.prototype.setInter=function(el,post,dalay){ //移动、执行
  let {top,left,width,height}=this.position(el),
  body=this.position(document.body),
  falg=false,
  count=0;
  this.timeID.walkId=setInterval(() => {
    this.collisionWall(top,left,height,width,()=>{
      count++
      falg=true;
      if(count==1){ //每当符合条件的时候就让相应的方向-2像素，并且只减一次,防止卡死
        if(post==="上"|| post==="下"){
          post==="上"? top+=1:false;
          post==="下"? top-=2:false;
          this.css(el,"top",top+"px");
        }else{
          post==="左"? left+=1:false;
          post==="右"? left-=2:false;
          this.css(el,"left",left+"px");
        };
      };
    });
    if(falg) return ;
    if(post==="上"|| post==="下"){
      post==="上" && top>0 ? top-=1:false;
      post==="下" && top<(body.height-height) ? top+=1:false;
      this.css(el,"top",top+"px");
    }else{
      post==="左" && left>0 ? left-=1:false;
      post==="右" && left<(body.width-width) ? left+=1:false;
      this.css(el,"left",left+"px");
    };
  }, dalay);
};

person.prototype.cannonball=function(el,post){ //生成炮弹
  let {top,left,width,height}=this.position(el);
  let cannonball=this.create("div",document.body,"cannonball");
  this.css(cannonball,"top",eval(post.cannonball.top));
  this.css(cannonball,"left",eval(post.cannonball.left));

  this.launch(cannonball,post.name);
};

person.prototype.launch=function(el,direction){ //炮弹发射
  let {top,left}=this.position(el),
  {width,height}=this.position(document.body);
  this.launchId=setInterval(() => {
    direction==="上"?top-=3.2:false;
    direction==="下"?top+=3.2:false;
    direction==="左"?left-=3.2:false;
    direction==="右"?left+=3.2:false;
    top>height || top<0 || left>width || left<0?el.remove():false; //删除出界的炮弹
    direction==="右" || direction==="左"?el.style.left=left + "px":el.style.top=top + "px";
    this.destroy(el);
    document.querySelectorAll(".cannonball").length===0?clearInterval(this.launchId):false; //如果场上没有炮弹就清除计时器
  }, 1);
}; 

person.prototype.createWall=function(){ //创建、墙
  let back=this.el.background,
    Level=this.condition.Level;
  data.Wall[Level].forEach((val,ind) => { //遍历数组
    let tr=this.create("tr",back);
    for (let char of val) { //遍历字符串
      if(char==="o"){
        td=this.create("td",tr,"wall")
      }else{
        td=this.create("td",tr)
      };
    };
  });
};

person.prototype.create=function(CreateEl,insertEl,Class){ //添加元素  创建的元素、插入的元素、类名
  let el=document.createElement(CreateEl);
  typeof Class!=="undefined"?el.className=Class:false; //如果有类名就加类名，如果没有就不加
  insertEl.appendChild(el);
  return el;
};

person.prototype.collisionWall=function(top,left,height,width,callback){ //碰撞检测、墙
  document.querySelectorAll(".wall").forEach(val=>{
    if(top<val.offsetTop+val.offsetHeight&&
      top+height>val.offsetTop &&
      left+width>val.offsetLeft &&
      left<val.offsetLeft+val.offsetWidth){
        callback(val);
    };
  });
};

person.prototype.destroy=function(el){ // 摧毁
  let {left,top,width,height}=this.position(el);
  this.collisionWall(top,left,height,width,function(val){
    val.classList.remove("wall");
    el.remove();
  });
};

person.prototype.position=function(el){ //获取四维
  return {
    top:parseInt(window.getComputedStyle(el).top),
    left:parseInt(window.getComputedStyle(el).left),
    width:parseInt(window.getComputedStyle(el).width),
    height:parseInt(window.getComputedStyle(el).height)
  }
};

person.prototype.enemy=function(){ //敌人
  let enemy,
  arrDirection=["ArrowUp","ArrowDown","ArrowLeft","ArrowDown","ArrowRight","ArrowDown"];
  setInterval(() => {
    if(document.querySelectorAll(".enemy").length<2){
      enemy=this.create("div",document.body,"enemy")
      this.create("div",enemy,"enemy-tube")
    }
  }, 2000);
   
  this.EMPId=setInterval(() => {
    this.el.enemyArr=[]
    document.querySelectorAll(".enemy").forEach(el=>{
      let ran=Math.floor(Math.random()*arrDirection.length);
      for(let k in data){
        let arrRan=arrDirection[ran];
        if(k===arrRan){
          let {width,height,left,top}=this.position(el);
          this.css(el,"transform",data[k].rotate);
          this.enemyDirection=data[k];
          this.cannonball(el,this.enemyDirection)
          this.el.enemyArr.push({el:el,post:data[k].name,width,height,left,top,enemyFalg:false})
        }
      }
    })
  }, 2000);
  this.enemyMove(10)
};

person.prototype.enemyMove=function(dalay){  //敌人移动
  let body=this.position(document.body),
  count=0;
  setInterval(() => {
    this.el.enemyArr.forEach(val=>{
      this.collisionWall(val.top,val.left,val.height,val.width,()=>{
        val.enemyFalg=true
        count++
        if(count==1){
          if(val.post==="上"|| val.post==="下"){
            val.post==="上"? val.top+=1:false;
            val.post==="下"? val.top-=2:false;
            this.css(val.el,"top",val.top+"px");
          }else{
            val.post==="左"? val.left+=1:false;
            val.post==="右"? val.left-=2:false;
            this.css(val.el,"left",val.left+"px");
          };
        };
      });
      if(val.enemyFalg) return;
      if(val.post==="上"|| val.post==="下"){
        val.post==="上" && val.top>0 ? val.top-=1:false;
        val.post==="下" && val.top<(body.height-val.height) ? val.top+=1:false;
        console.log(body.height);
        this.css(val.el,"top",val.top+"px");
      }else{
        val.post==="左" && val.left>0 ? val.left-=1:false;
        val.post==="右" && val.left<(body.width-val.width) ? val.left+=1:false;
        this.css(val.el,"left",val.left+"px");
      }
    })
  }, dalay);
};

TankBattle.enemy()
TankBattle.createWall();
TankBattle.walk();
