
//#TODO GameModeRuleType,GameModeRuleClassのデータ型interfaceとそのラッパーオブジェクトをつくる。
//#TODO コンストラクタで求められる情報量の違いを吸収するような関数Aをここでまとめ、それをfunction/list/getListとかで使用する。
    //#NOTE Aの型は(...:string[]) => IFirestoreCollectionControllerの部分型である。それぞれで分岐してやれば、あとは、結果で統一してその返り値のgetメソッドやらを呼べばいい。