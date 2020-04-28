cc.Class({
    extends: cc.Component,

    properties: {
        stick:{
            type: cc.Node,
            default: null,
        },
        max_r : 120,
        min_r : 60,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 初始化設置
        this.dir = -1;
        this.radius = 0;
        
    },

    start () {

    },

    // update (dt) {},
});
