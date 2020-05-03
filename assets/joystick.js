cc.Class({
    extends: cc.Component,

    properties: {
        stick:{
            type: cc.Node,
            default: null,
        },
        max_r : 50,
        min_r : 10,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 初始化設置
        this.dir = -1;
        this.radius = 0;


        this.stick.on(cc.Node.EventType.TOUCH_MOVE,function (e) {
            // console.log('touch');
            var w_pos = e.getLocation();//获取触摸坐标
            var pos = this.node.convertToNodeSpaceAR(w_pos);//坐标转换
            // 设置摇杆区域
            var len = pos.mag();
            if(len > this.max_r){
                pos.x = pos.x * this.max_r / len;
                pos.y = pos.y * this.max_r / len;
            }

            // console.log(pos.x,pos.y);
            this.stick.setPosition(pos);
            // 获取摇杆转变角度,对外提供摇杆方向
            if(len < this.min_r){
                return ;
            }
            this.dir = -1;
            var r = Math.atan2(pos.y,pos.x);
            if(r >= -8 * Math.PI / 8 && r < -7 * Math.PI / 8){
                this.dir = 2;
            }else if (r >= -7 * Math.PI / 8 && r < -5 * Math.PI / 8){
                this.dir = 6;
            }else if (r >= -5 * Math.PI / 8 && r < -3 * Math.PI / 8){
                this.dir = 1;
            }else if (r >= -3 * Math.PI / 8 && r < -1 * Math.PI / 8){
                this.dir = 7;
            }else if (r >= -1 * Math.PI / 8 && r <  Math.PI / 8){
                this.dir = 3;
            }else if (r >= Math.PI / 8 && r < 3 * Math.PI / 8){
                this.dir = 4;
            }else if (r >= 3 * Math.PI / 8 && r < 5 * Math.PI / 8){
                this.dir = 0;
            }else if (r >= 5 * Math.PI / 8 && r < 7 * Math.PI / 8){
                this.dir = 5;
            }else if (r >= 7 * Math.PI / 8 && r < 8 * Math.PI / 8){
                this.dir = 2;
            }
            this.radius = r;
            // console.log(r,this.dir);
        },this);

        // 重置,监听触摸事件结束
        this.stick.on(cc.Node.EventType.TOUCH_END,function (e) {
            this.stick.setPosition(cc.v2(0, 0));
            this.dir = -1;
        },this);
        // 监听触摸取消事件
        this.stick.on(cc.Node.EventType.TOUCH_CANCEL,function (e) {
            this.stick.setPosition(cc.v2(0, 0));
            this.dir = -1;
        },this);



    },

    start () {

    },

    // update (dt) {},
});
