
// 为什么要这样?没理解
var joystick = require("joystick");

cc.Class({
    extends: cc.Component,

    properties: {
        stick: {
            type: joystick,
            default: null,
        },
        FIXED_TIME : 0.03, // FIXED_TIEM机制?
        ITEM_DISTANCE: 25, // 每节蛇之间的距离
        speed: 100, // 移动速度

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this: 当前组件实例
        // this.node: 当前组件实例所在节点
        // console.log(this.node);
        this.fixed_time = 0;
        this.pos_set = [];// 从蛇尾蠕动到蛇头经过的所有位置
        var len = this.ITEM_DISTANCE * (this.node.children.length - 1); // 从蛇尾走道蛇头的距离
        var total_time = len / this.speed; // 从蛇尾走到蛇头所用时间
        var frame_time = this.FIXED_TIME; // 每帧用fixedupdate模拟???
        var block = this.speed * frame_time;//每次刷新蠕动距离
        var now_len = 0;
        var xpos = len;
        while(now_len < len){
            this.pos_set.push(cc.v2(xpos,0));//把坐标保存到数组cc.p和cc.v2相同
            now_len += block;
            xpos -= block;
        }

        this.pos_set.push(cc.v2(0,0));
        var block_num = 0;
        for(var i = this.node.children.length -1;i >= 0; i--){
            var now_index = Math.floor((block_num * this.ITEM_DISTANCE) / block);
            this.node.children[i].end_cur_index = now_index;
            this.node.children[i].setPosition(this.pos_set[now_index]);
            block_num++;
        }
    },
    fixed_update(dt){
        if(this.stick.dir === -1){
            return ;//摇杆停止运动,没有摇杆消息
        }
        // 摇杆放小角度,即弧度?
        var r = this.stick.radius;
        // console.log(r);
        //距离: 蛇头x时间x速度
        var head = this.node.children[0];
        var s = this.speed * dt;
        var sx = s * Math.cos(r);
        var sy = s * Math.sin(r);
        head.x += sx;
        head.y += sy;
        this.pos_set.push(head.getPosition());
        // 蛇转向角度
        var degree = r * 180 / Math.PI;//将弧度转为度
        degree = 360 - degree;
        // head.rotation = degree; // 这个似乎已经弃用
        head.angle = - degree;
        //贪吃蛇每节都要跟着头动
        for (var i=1;i < this.node.childrenCount;i++){
            var item = this.node.children[i];
            var src = item.getPosition();
            //每节位置调整
            item.end_cur_index++;
            item.setPosition(this.pos_set[item.end_cur_index]);
            //每节蛇神角度调整
            var dst = item.getPosition();
            var dir = dst.sub(src);
            r = Math.atan2(dir.y,dir.x);
            degree = r * 180 / Math.PI;
            degree = 360 - degree;
            // item.rotation = degree;
            item.angle = degree;
        }

    },

    update (dt) {
        // FIXED_TIME机制任何时候都能调用,保证Dt是固定值
        this.fixed_time += dt;
        while (this.fixed_time > this.FIXED_TIME){
            this.fixed_update(this.FIXED_TIME);
            this.fixed_time -= this.FIXED_TIME;
        }
    },
});
