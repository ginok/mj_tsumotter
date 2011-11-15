var Point = function(agari){

    Point.MANGANSTR={
        '0':'',
        '1':'満貫',
        '1.5':'跳満',
        '2':'倍満',
        '3':'三倍満',
        '4':'役満',
        '8':'ダブル役満',
        '12':'トリプル役満'
    };

    this.agari = agari;


    this.toHtml = function () {
        var html = "";
        var doraCount =0;
        if(this.agari.status_code == 200){
            var isFuro = this.agari.is_furo;
            
            //役リスト
            html += "<table>";
            $.each(this.agari.yaku_list, function () {
                       if(this.name == "dora"){
                           doraCount += 1;
                       }else{
                           html += "<tr>";
                           html += "<td>" + this.name_kanji + "<\/td>";
                           if(isFuro){
                               html += "<td>" + this.naki_han_num + "飜<\/td>";
                           }else{
                               html += "<td>" + this.han_num + "飜<\/td>";
                           }
                           html += "<\/tr>";
                       }
                   });
            if(doraCount != 0){
                //ドラはまとめる
                html += "<tr>"
                    + "<td>ドラ" + doraCount + "<\/td>"
                    + "<td>" + doraCount + "飜<\/td>"
                    + "<\/tr>";
            }     

            html += "<\/table>";

            //譜と翻
            html += "<p>";
            html += this.agari.total_fu_num + "符"
                + this.agari.total_han_num + "飜";
            html += "</p>";

            //満貫
            if(this.agari.mangan_scale != 0){
                html += "<p>";
                html += Point.MANGANSTR[this.agari.mangan_scale];
                html += "</p>";            
            }
            
            //点数
            if (this.agari.is_tsumo){
                if (this.agari.is_parent) {
                    //親のツモアガリ
                    html += this.agari.child_point + "点オール";
                } else {
                    //子のツモアガリ
                    html += "子" + this.agari.child_point + "点/"
                        + "親" + this.agari.parent_point + "点";
                }
            }else{
                //ロンアガリ
                html += this.agari.ron_point + "点";
            }

            dbgmsg("Point.toHtml",html);
            return html;

        }else{
            return "<b>画像解析に失敗しました。</b><br>写真を変えるか、解析結果を訂正して再度得点計算してください。";
        }
    };
};



